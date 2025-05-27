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
    raise RuntimeError("ANTHROPIC_API_KEY not set")

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/wysiwyg")
def wysiwyg():
    """WYSIWYG エディターページのルート"""
    return render_template("wysiwyg.html")

@app.route("/manual")
def manual():
    """マニュアルページのルート"""
    return render_template("manual.html")

@app.route("/generate", methods=["POST"])
def generate():
    """Claude APIを呼び出してHTMLを生成するエンドポイント"""
    data = request.get_json()
    system_prompt = data['system_prompt']
    user_prompt = data['user_prompt']
    use_thinking = data.get('use_thinking', False)
    use_web_search = data.get('use_web_search', False)

    try:
        # Anthropic Client の初期化
        client = anthropic.Anthropic(api_key=API_KEY)

        # メッセージの準備
        messages = [
            {"role": "user", "content": [{"type": "text", "text": f"{system_prompt}\n{user_prompt}"}]}
        ]

        # API呼び出しのパラメータを設定
        create_kwargs = {
            "model": "claude-3-5-sonnet-20241022",  # Cloud Run版のモデル
            "max_tokens": 4096,
            "messages": messages,
            "temperature": 0
        }

        # API呼び出し
        response = client.messages.create(**create_kwargs)
        
        # レスポンスを返す
        return jsonify({
            "success": True,
            "html": response.content[0].text
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=False)