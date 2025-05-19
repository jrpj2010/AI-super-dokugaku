import os
from flask import Flask, request, jsonify, render_template
import requests
import json
import anthropic
from dotenv import load_dotenv

# 環境変数の読み込み
load_dotenv()
API_KEY = os.getenv("ANTHROPIC_API_KEY")
if not API_KEY:
    raise RuntimeError("ANTHROPIC_API_KEY not set in .env")

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/wysiwyg")
def wysiwyg():
    """WYSIWYG エディターページのルート"""
    return render_template("wysiwyg.html")

@app.route("/generate", methods=["POST"])
def generate():
    """Claude APIを呼び出してHTMLを生成するエンドポイント"""
    data = request.get_json()
    system_prompt = data['system_prompt']
    user_prompt = data['user_prompt']
    use_thinking = data.get('use_thinking', False)
    use_web_search = data.get('use_web_search', False)
    
    try:
        # Anthropic Client の初期化（問題のあるproxiesパラメータを削除）
        client = anthropic.Anthropic(api_key=API_KEY)
        
        # メッセージの準備
        messages = [
            {"role": "user", "content": [{"type": "text", "text": f"{system_prompt}\n{user_prompt}"}]}
        ]
        
        # API呼び出しのパラメータを設定
        create_kwargs = {
            "model": "claude-3-7-sonnet-20250219",
            "max_tokens": 4096,
            "temperature": 0.25,
            "messages": messages
        }
        
        # Thinkingモードが有効な場合
        if use_thinking:
            thinking_budget = 16000
            create_kwargs["max_tokens"] = thinking_budget + 4000  # thinking_budgetより多めにトークンを確保
            create_kwargs["temperature"] = 1.0  # Thinking有効時には温度を1.0に設定
            create_kwargs["thinking"] = {
                "type": "enabled",
                "budget_tokens": thinking_budget
            }
        
        # Web検索モードが有効な場合
        if use_web_search:
            web_search_instruction = """
            You have access to a web search tool. When you need up-to-date information or specific facts that you're unsure about, use the web search tool.
            
            To search the web, use the following format:
            <search>your search query here</search>
            
            After searching, incorporate the information into your response. Always cite your sources at the end of your answer.
            """
            # システムプロンプトにWeb検索用の指示を追加
            create_kwargs["system"] = f"{web_search_instruction}\n{system_prompt}"
            
            # Web検索ツールを追加
            tools = [{
                "type": "web_search_20250305",      # SDK 0.50+ は type も必須
                "name": "web_search",
                "description": (
                    "Run a web search and return a JSON array of objects "
                    "with 'title', 'url', and 'snippet'."
                ),
                "input_schema": {
                    "type": "object",
                    "properties": {
                        "query": {"type": "string", "description": "検索キーワード"},
                        "num_results": {
                            "type": "integer", "minimum": 1, "maximum": 10,
                            "description": "取得件数", "default": 5
                        }
                    },
                    "required": ["query"]
                }
            }]
            # 不要なら tool_choice は丸ごと削除か {"type": "auto"} に
        else:
            # 通常のシステムプロンプト
            create_kwargs["system"] = system_prompt
        
        # APIコール（デバッグ情報を追加）
        print(f"Anthropic SDK Version: {anthropic.__version__}")
        print(f"API Key format check: {API_KEY[:7]}...{API_KEY[-4:] if len(API_KEY) > 10 else '***'}")
        print(f"API Parameters: {json.dumps({k: v for k, v in create_kwargs.items() if k != 'messages'})}")
        
        response = client.messages.create(**create_kwargs)
        
        # レスポンスからテキスト内容を取得
        html = ""
        thinking_output = None
        
        # テキスト内容を取得
        if response.content and len(response.content) > 0:
            for content_block in response.content:
                if content_block.type == "text":
                    html = content_block.text
        
        # Thinkingモードが有効な場合、thinking出力を取得
        if use_thinking and hasattr(response, "thinking"):
            thinking_output = response.thinking
        
        # レスポンスの構築
        result = {"html": html}
        if thinking_output:
            result["thinking"] = thinking_output
        
        return jsonify(result)
    
    except Exception as e:
        # 詳細なエラー情報をログに残す
        import traceback
        print(f"Error calling Anthropic API: {str(e)}")
        print(traceback.format_exc())
        return jsonify({"error": str(e)}), 500

# セキュリティヘッダーの追加
# -------------------------------------------------------------
#  CSP ヘッダーを付与／更新
#  Font Awesome（cdnjs）と Google Fonts のフォントを許可する
# -------------------------------------------------------------
@app.after_request
def add_security_headers(response):
    response.headers["Content-Security-Policy"] = (
        "default-src 'self'; "
        # JS は従来どおり
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' "
        "https://cdn.jsdelivr.net https://fonts.googleapis.com "
        "https://cdn.tailwindcss.com https://cdn.jsdelivr.net/npm/; "
        # style-src に必要なドメインを追加
        "style-src 'self' 'unsafe-inline' "
        "https://cdn.jsdelivr.net https://fonts.googleapis.com "
        "https://cdn.tailwindcss.com https://cdnjs.cloudflare.com; "
        # font-src に全てのフォントソースを追加
        "font-src 'self' https://cdnjs.cloudflare.com https://fonts.gstatic.com "
        "https://cdn.jsdelivr.net/npm/ data:; "
        # 画像／iframe
        "img-src 'self' data: https://via.placeholder.com; "
        "frame-src 'self';"
    )
    return response


if __name__ == "__main__":
    app.run(debug=True)