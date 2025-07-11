from PIL import Image, ImageDraw, ImageFont
import os

# 512x512のアイコンを作成
size = 512
img = Image.new('RGB', (size, size), color='white')
draw = ImageDraw.Draw(img)

# 背景の青い四角形
margin = 50
draw.rectangle([margin, margin, size-margin, size-margin], fill='#2196f3')

# 中央に白いMを描画
try:
    # システムフォントを使用
    font = ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', 300)
except:
    # フォントが見つからない場合はデフォルトフォント
    font = ImageFont.load_default()

text = "M"
bbox = draw.textbbox((0, 0), text, font=font)
text_width = bbox[2] - bbox[0]
text_height = bbox[3] - bbox[1]
position = ((size - text_width) // 2, (size - text_height) // 2)
draw.text(position, text, fill='white', font=font)

# アイコンを保存
os.makedirs('icons', exist_ok=True)
img.save('icons/icon.png')

# 必要なサイズのアイコンも生成
sizes = [32, 128, 256]
for s in sizes:
    resized = img.resize((s, s), Image.Resampling.LANCZOS)
    resized.save(f'icons/{s}x{s}.png')

print("アイコンが作成されました")