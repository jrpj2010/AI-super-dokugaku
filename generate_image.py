#!/usr/bin/env python3
"""
象とキリンが戦っている画像を生成するPythonスクリプト
"""

import requests
import json
import base64
from datetime import datetime

def generate_image_with_imagen3():
    """Google Imagen 3を使用して画像を生成"""
    url = "https://mcp-unified-server-820994673238.us-central1.run.app/t2i/google/imagen/3/generate-002"
    
    # 日本語と英語の両方でプロンプトを作成
    prompt = """
    象とキリンが戦っている迫力のあるシーン。
    アフリカのサバンナで、巨大な象と背の高いキリンが対峙している。
    夕日を背景に、砂埃が舞い上がる中での壮大な戦い。
    リアルで詳細な動物の描写、ドラマチックな構図と照明。
    
    Epic battle scene between an elephant and a giraffe.
    In the African savanna, a massive elephant confronts a tall giraffe.
    Dramatic fight with dust clouds against a sunset backdrop.
    Realistic and detailed animal portrayal, dramatic composition and lighting.
    """
    
    payload = {
        "jsonrpc": "2.0",
        "method": "generate_image",
        "params": {
            "prompt": prompt.strip(),
            "width": 1024,
            "height": 1024,
            "num_images": 1
        },
        "id": 1
    }
    
    headers = {
        "Content-Type": "application/json"
    }
    
    try:
        print("画像生成リクエストを送信中...")
        response = requests.post(url, json=payload, headers=headers, timeout=60)
        
        if response.status_code == 200:
            result = response.json()
            print(f"レスポンス: {json.dumps(result, indent=2, ensure_ascii=False)}")
            
            # 画像データが含まれている場合は保存
            if "result" in result and "image" in result["result"]:
                image_data = result["result"]["image"]
                # base64デコードして保存
                image_bytes = base64.b64decode(image_data)
                filename = f"elephant_vs_giraffe_{datetime.now().strftime('%Y%m%d_%H%M%S')}.png"
                with open(filename, "wb") as f:
                    f.write(image_bytes)
                print(f"画像を {filename} として保存しました。")
            else:
                print("画像データが見つかりませんでした。")
        else:
            print(f"エラー: ステータスコード {response.status_code}")
            print(f"レスポンス: {response.text}")
            
    except Exception as e:
        print(f"エラーが発生しました: {str(e)}")

if __name__ == "__main__":
    generate_image_with_imagen3()