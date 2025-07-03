#!/usr/bin/env python3
"""
PILを使用して象とキリンの戦闘シーンを描画
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_battle_scene():
    """シンプルな象とキリンの戦闘シーンを作成"""
    
    # キャンバスサイズ
    width, height = 1024, 768
    
    # 背景色（サバンナの夕焼け）
    background_color = (255, 200, 150)
    
    # 画像を作成
    img = Image.new('RGB', (width, height), background_color)
    draw = ImageDraw.Draw(img)
    
    # 地面を描画
    ground_color = (180, 140, 100)
    draw.rectangle([(0, height * 0.7), (width, height)], fill=ground_color)
    
    # 太陽を描画
    sun_color = (255, 180, 100)
    sun_x, sun_y = width * 0.8, height * 0.2
    sun_radius = 60
    draw.ellipse([(sun_x - sun_radius, sun_y - sun_radius), 
                  (sun_x + sun_radius, sun_y + sun_radius)], fill=sun_color)
    
    # 象を描画（左側）
    elephant_color = (100, 100, 100)
    # 胴体
    elephant_body_x = width * 0.25
    elephant_body_y = height * 0.6
    draw.ellipse([(elephant_body_x - 120, elephant_body_y - 80), 
                  (elephant_body_x + 120, elephant_body_y + 80)], fill=elephant_color)
    
    # 頭
    draw.ellipse([(elephant_body_x - 150, elephant_body_y - 100), 
                  (elephant_body_x - 50, elephant_body_y)], fill=elephant_color)
    
    # 鼻
    nose_points = [
        (elephant_body_x - 150, elephant_body_y - 50),
        (elephant_body_x - 180, elephant_body_y + 50),
        (elephant_body_x - 170, elephant_body_y + 80),
        (elephant_body_x - 140, elephant_body_y + 60),
        (elephant_body_x - 130, elephant_body_y - 30)
    ]
    draw.polygon(nose_points, fill=elephant_color)
    
    # 足
    for i in range(4):
        leg_x = elephant_body_x - 80 + i * 40
        draw.rectangle([(leg_x - 15, elephant_body_y + 60), 
                       (leg_x + 15, elephant_body_y + 120)], fill=elephant_color)
    
    # 耳
    draw.ellipse([(elephant_body_x - 130, elephant_body_y - 120), 
                  (elephant_body_x - 70, elephant_body_y - 20)], fill=(120, 120, 120))
    
    # キリンを描画（右側）
    giraffe_color = (255, 200, 100)
    giraffe_spots = (180, 120, 60)
    
    # 胴体
    giraffe_body_x = width * 0.75
    giraffe_body_y = height * 0.55
    draw.ellipse([(giraffe_body_x - 60, giraffe_body_y - 50), 
                  (giraffe_body_x + 60, giraffe_body_y + 80)], fill=giraffe_color)
    
    # 首
    neck_points = [
        (giraffe_body_x - 20, giraffe_body_y - 40),
        (giraffe_body_x + 20, giraffe_body_y - 40),
        (giraffe_body_x + 30, giraffe_body_y - 200),
        (giraffe_body_x - 10, giraffe_body_y - 200)
    ]
    draw.polygon(neck_points, fill=giraffe_color)
    
    # 頭
    draw.ellipse([(giraffe_body_x - 30, giraffe_body_y - 230), 
                  (giraffe_body_x + 30, giraffe_body_y - 180)], fill=giraffe_color)
    
    # 角
    draw.line([(giraffe_body_x - 10, giraffe_body_y - 230), 
               (giraffe_body_x - 10, giraffe_body_y - 250)], fill=(100, 80, 60), width=5)
    draw.line([(giraffe_body_x + 10, giraffe_body_y - 230), 
               (giraffe_body_x + 10, giraffe_body_y - 250)], fill=(100, 80, 60), width=5)
    
    # 足
    for i in range(4):
        leg_x = giraffe_body_x - 40 + i * 25
        draw.rectangle([(leg_x - 8, giraffe_body_y + 60), 
                       (leg_x + 8, giraffe_body_y + 150)], fill=giraffe_color)
    
    # キリンの模様
    for i in range(15):
        spot_x = giraffe_body_x - 50 + (i % 3) * 40
        spot_y = giraffe_body_y - 150 + (i // 3) * 40
        draw.ellipse([(spot_x - 15, spot_y - 15), 
                     (spot_x + 15, spot_y + 15)], fill=giraffe_spots)
    
    # 砂埃エフェクト
    dust_color = (200, 180, 150, 100)
    for i in range(20):
        dust_x = width * 0.5 + (i - 10) * 30
        dust_y = height * 0.75 + (i % 3) * 20
        dust_size = 20 + (i % 4) * 10
        draw.ellipse([(dust_x - dust_size, dust_y - dust_size/2), 
                     (dust_x + dust_size, dust_y + dust_size/2)], 
                     fill=(200, 180, 150))
    
    # タイトルを追加
    title_text = "象 vs キリン - サバンナの決闘"
    draw.text((width // 2 - 150, 30), title_text, fill=(50, 30, 20))
    
    # 画像を保存
    filename = "elephant_vs_giraffe_battle.png"
    img.save(filename)
    print(f"画像を {filename} として保存しました。")
    
    # 画像サイズを表示
    file_size = os.path.getsize(filename) / 1024
    print(f"ファイルサイズ: {file_size:.1f} KB")
    print(f"画像サイズ: {width} x {height} ピクセル")

if __name__ == "__main__":
    create_battle_scene()