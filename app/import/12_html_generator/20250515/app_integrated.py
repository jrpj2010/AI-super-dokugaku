"""
HTML Generator App - 統合版
Cloud Runで実績のある安定性とローカル版の新機能を統合
"""
import os
from flask import Flask, request, jsonify, render_template
import requests
import json
import anthropic
from dotenv import load_dotenv

# 環境変数の読み込み
load_dotenv()

# 環境変数から設定を取得
API_KEY = os.getenv("ANTHROPIC_API_KEY")
if not API_KEY:
    raise RuntimeError("ANTHROPIC_API_KEY not set in environment")

# モデル設定（環境変数でオーバーライド可能）
DEFAULT_MODEL = os.getenv("CLAUDE_MODEL", "claude-3-5-sonnet-20241022")
THINKING_MODEL = os.getenv("CLAUDE_THINKING_MODEL", "claude-3-7-sonnet-20250219")

# Flask設定
app = Flask(__name__)
app.config['ENV'] = os.getenv('FLASK_ENV', 'production')
app.config['DEBUG'] = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'


@app.route("/")
def index():
    """メインページ"""
    return render_template("index.html")


@app.route("/wysiwyg")
def wysiwyg():
    """WYSIWYG エディターページ"""
    return render_template("wysiwyg.html")


@app.route("/manual")
def manual():
    """マニュアルページ"""
    return render_template("manual.html")


@app.route("/health")
def health():
    """ヘルスチェックエンドポイント（Cloud Run用）"""
    return jsonify({"status": "healthy", "service": "html-generator-app"})


@app.route("/generate", methods=["POST"])
def generate():
    """Claude APIを呼び出してHTMLを生成するエンドポイント"""
    try:
        # リクエストデータの取得
        data = request.get_json()
        if not data:
            return jsonify({
                "success": False,
                "error": "No JSON data provided"
            }), 400
        
        # 必須パラメータのチェック
        if 'system_prompt' not in data or 'user_prompt' not in data:
            return jsonify({
                "success": False,
                "error": "Missing required parameters: system_prompt and user_prompt"
            }), 400
        
        system_prompt = data['system_prompt']
        user_prompt = data['user_prompt']
        use_thinking = data.get('use_thinking', False)
        use_web_search = data.get('use_web_search', False)

        # Anthropic Client の初期化
        client = anthropic.Anthropic(api_key=API_KEY)

        # メッセージの準備
        messages = [
            {"role": "user", "content": [{"type": "text", "text": f"{system_prompt}\n{user_prompt}"}]}
        ]

        # API呼び出しのパラメータを設定
        # 使用するモデルを決定（Thinkingモードの場合は専用モデルを使用）
        model = THINKING_MODEL if use_thinking else DEFAULT_MODEL
        
        create_kwargs = {
            "model": model,
            "max_tokens": 4096,
            "temperature": 0.25,
            "messages": messages
        }

        # Thinkingモードが有効な場合
        if use_thinking:
            thinking_budget = 16000
            create_kwargs["max_tokens"] = thinking_budget + 4000
            create_kwargs["temperature"] = 1.0
            create_kwargs["thinking"] = {
                "type": "enabled",
                "budget_tokens": thinking_budget
            }

        # Web検索モードが有効な場合（将来的な拡張用）
        if use_web_search:
            web_search_instruction = """
            You have access to a web search tool. When you need up-to-date information or specific facts that you're unsure about, use the web search tool.

            To search the web, use the following format:
            <search>query goes here</search>

            After getting the search results, continue with your response based on the information found.
            """
            # システムプロンプトに検索指示を追加
            messages[0]["content"][0]["text"] = f"{system_prompt}\n\n{web_search_instruction}\n\n{user_prompt}"

        # API呼び出し
        response = client.messages.create(**create_kwargs)
        
        # レスポンスの処理
        generated_html = response.content[0].text
        
        # レスポンスを返す
        return jsonify({
            "success": True,
            "html": generated_html,
            "model_used": model,
            "thinking_enabled": use_thinking,
            "web_search_enabled": use_web_search
        })

    except anthropic.APIError as e:
        # Anthropic APIエラーの詳細なハンドリング
        error_message = str(e)
        status_code = getattr(e, 'status_code', 500)
        
        app.logger.error(f"Anthropic API error: {error_message}")
        
        return jsonify({
            "success": False,
            "error": f"API Error: {error_message}",
            "error_type": "api_error"
        }), status_code
        
    except Exception as e:
        # その他のエラー
        app.logger.error(f"Unexpected error: {str(e)}")
        
        return jsonify({
            "success": False,
            "error": f"Unexpected error: {str(e)}",
            "error_type": "server_error"
        }), 500


@app.errorhandler(404)
def not_found(error):
    """404エラーハンドラー"""
    return jsonify({
        "success": False,
        "error": "Endpoint not found",
        "error_type": "not_found"
    }), 404


@app.errorhandler(405)
def method_not_allowed(error):
    """405エラーハンドラー"""
    return jsonify({
        "success": False,
        "error": "Method not allowed",
        "error_type": "method_not_allowed"
    }), 405


if __name__ == "__main__":
    # ポート設定（環境変数から取得、デフォルトは8080）
    port = int(os.getenv("PORT", 8080))
    
    # 開発環境では0.0.0.0でリッスン
    app.run(host="0.0.0.0", port=port)