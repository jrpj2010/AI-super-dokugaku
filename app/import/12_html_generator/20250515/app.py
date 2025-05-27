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

# アプリケーションバージョン情報
APP_VERSION = "1.1.0"
APP_VERSION_DATE = "2025年5月27日版"
APP_VERSION_FULL = f"v{APP_VERSION} - {APP_VERSION_DATE}"

# 環境変数の読み込み
load_dotenv()

# 環境変数から設定を取得（オプショナル - ユーザーが設定画面から入力可能）
API_KEY = os.getenv("ANTHROPIC_API_KEY")
# APIキーは必須ではない（ユーザーが後から設定可能）

# モデル設定（環境変数でオーバーライド可能）
# Claude Sonnet 4を使用（Opus 4は高コストのため除外）
DEFAULT_MODEL = os.getenv("CLAUDE_MODEL", "claude-sonnet-4-20250514")
THINKING_MODEL = os.getenv("CLAUDE_THINKING_MODEL", "claude-sonnet-4-20250514")

# Flask設定
app = Flask(__name__)
app.config['ENV'] = os.getenv('FLASK_ENV', 'production')
app.config['DEBUG'] = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'


@app.route("/")
def index():
    """メインページ"""
    return render_template("index.html")


@app.route("/settings")
def settings():
    """設定ページ"""
    return render_template("settings.html")


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
    return jsonify({
        "status": "healthy", 
        "service": "html-generator-app",
        "version": APP_VERSION,
        "version_date": APP_VERSION_DATE,
        "version_full": APP_VERSION_FULL
    })


@app.route("/version")
def version():
    """バージョン情報エンドポイント"""
    return jsonify({
        "service": "html-generator-app",
        "version": APP_VERSION,
        "version_date": APP_VERSION_DATE,
        "version_full": APP_VERSION_FULL,
        "models": {
            "default": DEFAULT_MODEL,
            "thinking": THINKING_MODEL
        }
    })


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
        
        # クライアントから送信されたAPIキーを取得（なければ環境変数から）
        user_api_key = data.get('api_key', API_KEY)
        
        # APIキーのチェック
        if not user_api_key:
            return jsonify({
                "success": False,
                "error": "APIキーが設定されていません。設定画面からAPIキーを入力してください。"
            }), 401

        # Anthropic Client の初期化
        client = anthropic.Anthropic(api_key=user_api_key)

        # メッセージの準備
        messages = [
            {"role": "user", "content": [{"type": "text", "text": user_prompt}]}
        ]
        
        # システムプロンプトを設定
        system_message = system_prompt

        # API呼び出しのパラメータを設定
        # 使用するモデルを決定（Thinkingモードの場合は専用モデルを使用）
        model = THINKING_MODEL if use_thinking else DEFAULT_MODEL
        
        create_kwargs = {
            "model": model,
            "max_tokens": 4096,
            "temperature": 0.25,
            "messages": messages,
            "system": system_message
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
        # Thinkingモードの場合、ThinkingBlockとTextBlockが含まれる可能性がある
        generated_html = ""
        print(f"Response content blocks count: {len(response.content)}")
        
        for i, content_block in enumerate(response.content):
            # デバッグ用：ブロックのタイプと属性を確認
            block_type = getattr(content_block, 'type', 'unknown')
            print(f"Block {i}: type={block_type}")
            print(f"Block {i} attributes: {dir(content_block)}")
            
            # TextBlockの場合のみテキストを抽出
            if hasattr(content_block, 'text'):
                text_content = content_block.text
                print(f"Block {i}: Found text attribute, length={len(text_content)}")
                generated_html += text_content
            elif hasattr(content_block, 'type') and content_block.type == 'text':
                # 代替アクセス方法
                if hasattr(content_block, '_text'):
                    text_content = content_block._text
                    print(f"Block {i}: Found _text attribute, length={len(text_content)}")
                    generated_html += text_content
                else:
                    print(f"Warning: Text block without accessible text attribute")
                    # 他の可能な属性を試す
                    for attr in ['content', 'data', 'value']:
                        if hasattr(content_block, attr):
                            print(f"Block {i}: Trying attribute '{attr}'")
                            try:
                                text_content = getattr(content_block, attr)
                                if isinstance(text_content, str):
                                    print(f"Block {i}: Found {attr} attribute, length={len(text_content)}")
                                    generated_html += text_content
                                    break
                            except:
                                pass
            # ThinkingBlockは無視（ユーザーには表示しない）
        
        # デバッグ：生成されたHTMLの長さを確認
        print(f"Generated HTML length: {len(generated_html)}")
        print(f"Generated HTML preview: {generated_html[:200]}..." if generated_html else "Generated HTML is empty!")
        
        # HTMLタグが含まれていない場合は、エラーとして扱う
        if generated_html and not any(tag in generated_html.lower() for tag in ['<html', '<!doctype', '<div', '<p', '<h1', '<h2', '<h3']):
            print("Warning: Response doesn't look like HTML")
            # システムプロンプトが正しく設定されていない可能性がある
            if "理解しました" in generated_html or "YES" in generated_html.upper():
                print("Error: Claude is responding with acknowledgment instead of HTML")
                generated_html = f"""<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>エラー: HTMLが生成されませんでした</title>
    <style>
        body {{
            font-family: sans-serif;
            padding: 20px;
            background-color: #f0f0f0;
        }}
        .error {{
            background-color: #ffe6e6;
            border: 2px solid #ff0000;
            padding: 20px;
            border-radius: 10px;
        }}
    </style>
</head>
<body>
    <div class="error">
        <h1>⚠️ HTMLが生成されませんでした</h1>
        <p>システムプロンプトが正しく設定されていない可能性があります。</p>
        <p>システムプロンプトに以下のような内容を設定してください：</p>
        <pre>あなたはHTMLコード生成の専門家です。ユーザーのリクエストに基づいて、完全で有効なHTMLコードを生成してください。必ず&lt;!DOCTYPE html&gt;から始まる完全なHTML文書を返してください。説明や追加のテキストは含めず、HTMLコードのみを返してください。</pre>
    </div>
</body>
</html>"""
        
        # レスポンスを返す
        return jsonify({
            "success": True,
            "html": generated_html,
            "model_used": model,
            "thinking_enabled": use_thinking,
            "web_search_enabled": use_web_search,
            "version": APP_VERSION_FULL
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
        
    except AttributeError as e:
        # ThinkingBlock関連のエラー
        app.logger.error(f"Attribute error (likely ThinkingBlock issue): {str(e)}")
        
        return jsonify({
            "success": False,
            "error": "API応答の処理中にエラーが発生しました。通常モードで再試行してください。",
            "error_type": "thinking_mode_error",
            "details": str(e)
        }), 500
        
    except Exception as e:
        # その他のエラー
        app.logger.error(f"Unexpected error: {str(e)}")
        app.logger.error(f"Error type: {type(e).__name__}")
        
        return jsonify({
            "success": False,
            "error": f"Unexpected error: {str(e)}",
            "error_type": "server_error"
        }), 500


@app.route("/validate-api-key", methods=["POST"])
def validate_api_key():
    """APIキーの有効性を検証するエンドポイント"""
    try:
        data = request.get_json()
        if not data or 'api_key' not in data:
            return jsonify({
                "success": False,
                "error": "APIキーが提供されていません"
            }), 400
        
        test_api_key = data['api_key']
        
        # APIキーの基本的な形式チェック
        if not test_api_key or not test_api_key.startswith('sk-'):
            return jsonify({
                "success": False,
                "error": "無効なAPIキー形式です"
            }), 400
        
        try:
            # 実際にAPIを呼び出してキーの有効性を確認
            client = anthropic.Anthropic(api_key=test_api_key)
            # 最小限のトークンで簡単なテストを実行
            response = client.messages.create(
                model="claude-3-haiku-20240307",  # 最も安価なモデルでテスト
                max_tokens=1,
                messages=[{"role": "user", "content": "test"}]
            )
            
            return jsonify({
                "success": True,
                "message": "APIキーは有効です"
            })
        except anthropic.AuthenticationError:
            return jsonify({
                "success": False,
                "error": "無効なAPIキーです"
            }), 401
        except Exception as e:
            return jsonify({
                "success": False,
                "error": f"APIキーの検証中にエラーが発生しました: {str(e)}"
            }), 500
            
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"リクエストの処理中にエラーが発生しました: {str(e)}"
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