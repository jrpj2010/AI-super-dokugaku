#!/usr/bin/env python3
import os
import re

def fix_responsive_css(file_path):
    """HTMLファイルのslide-containerをレスポンシブ対応にする"""
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 固定幅のslide-containerパターンを検索
    old_pattern = r'\.slide-container\s*\{[^}]*width:\s*1280px;[^}]*height:\s*720px;[^}]*\}'
    
    # 新しいレスポンシブCSSに置換
    new_css = '''.slide-container {
            width: 100%;
            min-height: 100vh;
            max-width: 1280px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
            background: linear-gradient(135deg, #2c1810 0%, #3d2914 50%, #FF6B6B 100%);
            font-family: 'Noto Sans JP', sans-serif;
            padding: 20px;
            box-sizing: border-box;
        }
        
        @media (max-width: 1300px) {
            .slide-container {
                padding: 15px;
            }
        }
        
        @media (max-width: 768px) {
            .slide-container {
                padding: 10px;
            }
            
            .title {
                font-size: 2.5rem !important;
            }
            
            .action-box, .efficiency-box, .phase-card, .timeline-box {
                padding: 1rem;
                margin: 0.5rem;
            }
            
            .team-member, .metric-item {
                padding: 1rem;
            }
            
            .productivity-metrics, .timeline-grid {
                grid-template-columns: 1fr;
                gap: 1rem;
            }
        }'''
    
    # パターンマッチと置換
    if re.search(old_pattern, content, re.DOTALL):
        content = re.sub(old_pattern, new_css, content, flags=re.DOTALL)
        
        # grid-cols-2をレスポンシブ対応に変更
        content = re.sub(r'grid grid-cols-2', 'grid grid-cols-1 lg:grid-cols-2', content)
        content = re.sub(r'grid-cols-3', 'grid-cols-1 md:grid-cols-3', content)
        
        # ファイルを書き戻し
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✅ 修正完了: {os.path.basename(file_path)}")
        return True
    else:
        print(f"⏭️  スキップ: {os.path.basename(file_path)} (パターンが見つかりません)")
        return False

def main():
    """ディレクトリ内のすべてのHTMLファイルを修正"""
    
    # 現在のディレクトリ内のHTMLファイルを取得
    html_files = [f for f in os.listdir('.') if f.endswith('.html') and f.replace('.html', '').isdigit()]
    
    if not html_files:
        print("❌ HTMLファイルが見つかりません")
        return
    
    print(f"🔍 {len(html_files)}個のHTMLファイルを処理中...")
    
    fixed_count = 0
    for html_file in sorted(html_files, key=lambda x: int(x.replace('.html', ''))):
        if fix_responsive_css(html_file):
            fixed_count += 1
    
    print(f"\n✨ 完了: {fixed_count}/{len(html_files)}個のファイルを修正しました")

if __name__ == "__main__":
    main()