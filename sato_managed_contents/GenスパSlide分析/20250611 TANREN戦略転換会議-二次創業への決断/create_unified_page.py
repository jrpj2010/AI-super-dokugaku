#!/usr/bin/env python3
import os
import re

def extract_slide_content(file_path):
    """HTMLファイルからスライドコンテンツを抽出（正規表現使用）"""
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # タイトルを抽出
    title_match = re.search(r'<title>(.*?)</title>', content, re.DOTALL)
    title = title_match.group(1).strip() if title_match else f"スライド {os.path.basename(file_path)}"
    
    # スタイルを抽出
    style_match = re.search(r'<style[^>]*>(.*?)</style>', content, re.DOTALL)
    styles = style_match.group(1).strip() if style_match else ""
    
    # slide-container内のコンテンツを抽出
    slide_container_match = re.search(r'<div class="slide-container"[^>]*>(.*?)</div>\s*</body>', content, re.DOTALL)
    if slide_container_match:
        slide_content = slide_container_match.group(1).strip()
        
        return {
            'title': title,
            'content': slide_content,
            'styles': styles
        }
    
    return None

def create_unified_page():
    """全スライドを統合した縦長ページを作成"""
    
    # HTMLファイルを番号順で取得
    html_files = [f for f in os.listdir('.') if f.endswith('.html') and f.replace('.html', '').isdigit()]
    html_files.sort(key=lambda x: int(x.replace('.html', '')))
    
    print(f"🔍 {len(html_files)}個のスライドを統合中...")
    
    # 統合HTMLの基本構造
    unified_html = '''<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TANREN戦略転換会議 - 二次創業への決断 (統合版)</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;700;900&display=swap" rel="stylesheet">
    <style>
        /* 全体のスタイル */
        body {
            margin: 0;
            padding: 0;
            font-family: 'Noto Sans JP', sans-serif;
            background: #1a1a1a;
            line-height: 1.6;
        }
        
        /* 統合されたスライドセクション */
        .slide-section {
            width: 100%;
            min-height: 100vh;
            max-width: 1280px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            padding: 40px 20px;
            box-sizing: border-box;
            scroll-margin-top: 80px;
        }
        
        /* ナビゲーションバー */
        .navigation {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(10px);
            z-index: 1000;
            padding: 10px 20px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }
        
        .nav-content {
            max-width: 1280px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .nav-title {
            color: white;
            font-size: 1.2rem;
            font-weight: bold;
        }
        
        .nav-menu {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }
        
        .nav-item {
            background: rgba(255, 255, 255, 0.1);
            color: white;
            padding: 5px 12px;
            border-radius: 20px;
            text-decoration: none;
            font-size: 0.8rem;
            transition: all 0.3s ease;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .nav-item:hover, .nav-item.active {
            background: rgba(255, 64, 129, 0.8);
            transform: translateY(-1px);
        }
        
        /* セクション区切り */
        .section-divider {
            height: 2px;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            margin: 20px 0;
        }
        
        /* セクション番号 */
        .section-number {
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(255, 64, 129, 0.8);
            color: white;
            padding: 10px 15px;
            border-radius: 50%;
            font-weight: bold;
            font-size: 1.2rem;
            min-width: 50px;
            text-align: center;
        }
        
        /* スムーススクロール */
        html {
            scroll-behavior: smooth;
        }
        
        /* レスポンシブ対応 */
        @media (max-width: 768px) {
            .nav-menu {
                max-height: 200px;
                overflow-y: auto;
            }
            
            .nav-item {
                font-size: 0.7rem;
                padding: 4px 8px;
            }
            
            .slide-section {
                padding: 80px 10px 40px;
            }
        }
        
        /* 既存のスライドスタイルを統合用に調整 */
        .slide-section .slide-container {
            width: 100%;
            height: auto;
            min-height: auto;
            margin: 0;
            padding: 0;
            position: static;
        }
        
        /* スクロール進捗バー */
        .progress-bar {
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #FF4081, #32CD32);
            z-index: 1001;
            transition: width 0.1s ease;
        }
    </style>
</head>
<body>
    <!-- プログレスバー -->
    <div class="progress-bar" id="progressBar"></div>
    
    <!-- ナビゲーション -->
    <nav class="navigation">
        <div class="nav-content">
            <div class="nav-title">TANREN戦略転換会議 - 二次創業への決断</div>
            <div class="nav-menu" id="navMenu">
                <!-- ナビゲーション項目は動的生成 -->
            </div>
        </div>
    </nav>
    
    <!-- メインコンテンツ -->
    <main id="mainContent">
'''
    
    # 各スライドのコンテンツとスタイルを抽出・統合
    all_styles = []
    slide_contents = []
    nav_items = []
    
    for i, html_file in enumerate(html_files, 1):
        slide_data = extract_slide_content(html_file)
        if slide_data:
            # スタイルを収集（重複除去のため）
            if slide_data['styles']:
                all_styles.append(f"/* {slide_data['title']} のスタイル */\n{slide_data['styles']}")
            
            # ナビゲーション項目を生成
            nav_items.append(f'<a href="#slide-{html_file.replace(".html", "")}" class="nav-item">{i}. {slide_data["title"][:20]}...</a>')
            
            # スライドコンテンツを追加
            slide_content = f'''
        <!-- スライド {i}: {slide_data['title']} -->
        <section class="slide-section" id="slide-{html_file.replace('.html', '')}">
            <div class="section-number">{i}</div>
            <div class="slide-content">
                {slide_data['content']}
            </div>
        </section>
        {'' if i == len(html_files) else '<div class="section-divider"></div>'}
'''
            slide_contents.append(slide_content)
            print(f"✅ 統合完了: {slide_data['title']}")
    
    # 統合されたスタイルを追加
    if all_styles:
        unified_html = unified_html.replace('</style>', '\n\n' + '\n\n'.join(all_styles) + '\n    </style>')
    
    # スライドコンテンツを追加
    unified_html += '\n'.join(slide_contents)
    
    # 終了タグとJavaScript
    unified_html += '''
    </main>
    
    <script>
        // ナビゲーション項目を動的生成
        document.getElementById('navMenu').innerHTML = `''' + '\\n'.join(nav_items) + '''`;
        
        // スクロール進捗バー
        window.addEventListener('scroll', function() {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            document.getElementById('progressBar').style.width = scrolled + '%';
        });
        
        // アクティブナビゲーション項目のハイライト
        window.addEventListener('scroll', function() {
            const sections = document.querySelectorAll('.slide-section');
            const navItems = document.querySelectorAll('.nav-item');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= (sectionTop - 100)) {
                    current = section.getAttribute('id');
                }
            });
            
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === '#' + current) {
                    item.classList.add('active');
                }
            });
        });
        
        // キーボードナビゲーション
        document.addEventListener('keydown', function(e) {
            const sections = document.querySelectorAll('.slide-section');
            const currentSection = Array.from(sections).find(section => {
                const rect = section.getBoundingClientRect();
                return rect.top <= 100 && rect.bottom > 100;
            });
            
            if (currentSection) {
                const currentIndex = Array.from(sections).indexOf(currentSection);
                
                if (e.key === 'ArrowDown' || e.key === 'PageDown') {
                    e.preventDefault();
                    if (currentIndex < sections.length - 1) {
                        sections[currentIndex + 1].scrollIntoView({ behavior: 'smooth' });
                    }
                } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                    e.preventDefault();
                    if (currentIndex > 0) {
                        sections[currentIndex - 1].scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }
        });
        
        // タッチスワイプ対応（モバイル）
        let startY = 0;
        document.addEventListener('touchstart', function(e) {
            startY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchend', function(e) {
            const endY = e.changedTouches[0].clientY;
            const diff = startY - endY;
            
            if (Math.abs(diff) > 50) { // 50px以上のスワイプ
                const sections = document.querySelectorAll('.slide-section');
                const currentSection = Array.from(sections).find(section => {
                    const rect = section.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom > 100;
                });
                
                if (currentSection) {
                    const currentIndex = Array.from(sections).indexOf(currentSection);
                    
                    if (diff > 0 && currentIndex < sections.length - 1) {
                        // 上スワイプ：次のセクション
                        sections[currentIndex + 1].scrollIntoView({ behavior: 'smooth' });
                    } else if (diff < 0 && currentIndex > 0) {
                        // 下スワイプ：前のセクション
                        sections[currentIndex - 1].scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }
        });
    </script>
</body>
</html>'''
    
    # ファイルに保存
    output_file = 'unified_presentation.html'
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(unified_html)
    
    print(f"\n✨ 統合完了!")
    print(f"📄 ファイル: {output_file}")
    print(f"📊 統合されたスライド数: {len(slide_contents)}")
    print(f"🎯 機能:")
    print(f"   • 縦スクロール式プレゼンテーション")
    print(f"   • 固定ナビゲーションバー")
    print(f"   • スクロール進捗表示")
    print(f"   • キーボード操作対応 (↑↓/PageUp/PageDown)")
    print(f"   • タッチスワイプ対応 (モバイル)")
    print(f"   • レスポンシブデザイン")

if __name__ == "__main__":
    create_unified_page()