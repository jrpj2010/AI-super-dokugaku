import re
import os

def choose_template(slide_md, slide_index):
    """Heuristically chooses a template for the slide."""
    if slide_index == 0:
        return "Template-01-Title"
    if "目次案" in slide_md:
        return "Template-02-TOC"
    if "ペルソナ定義" in slide_md or "シナリオA" in slide_md or "シナリオB" in slide_md:
        return "Template-05-2Column_ComparisonCard"
    if "```" in slide_md:
        return "Template-06-2Column_Code"
    if "結論" in slide_md or "おわりに" in slide_md:
        return "Template-08-Conclusion"
    # Default for most content slides
    return "Template-03-2Column_Standard"

def parse_slide_components(slide_md):
    """Parses markdown into a dictionary of components."""
    components = {
        'title': '', 'subtitle': '', 'paragraphs': [], 'lists': [],
        'table': '', 'code': '', 'image_alt': '', 'raw_lines': []
    }
    lines = slide_md.strip().split('\\n')
    in_table = False
    in_code = False

    for i, line in enumerate(lines):
        line = line.strip()
        if not line:
            continue

        components['raw_lines'].append(line)

        # Title/Subtitle
        if line.startswith('# '):
            components['title'] = line[2:].strip()
        elif line.startswith('## '):
            if not components['subtitle']:
                 components['subtitle'] = line[3:].strip()
            else:
                 components['paragraphs'].append(f'<h2 class="section-title mt-6 mb-3">{line[3:].strip()}</h2>')
        elif line.startswith('### '):
            components['paragraphs'].append(f'<h3 class="subtitle mt-4 mb-2">{line[4:].strip()}</h3>')

        # Image
        elif re.match(r'!\\\[(.*?)\]\\((.*?)\\)', line):
            components['image_alt'] = re.match(r'!\\\[(.*?)\]\\((.*?)\\)', line).group(1)

        # Table
        elif line.startswith('|'):
            if not in_table:
                in_table = True
                components['table'] += '<table class="compare-table w-full my-4 text-sm border-collapse">'

            if '---' in line: continue

            tag = "th" if components['table'].count('<tr') == 0 else "td"
            cells = [cell.strip() for cell in line.split('|')[1:-1]]
            components['table'] += '<tr>' + ''.join(f'<{tag} class="border p-2">{cell}</{tag}>' for cell in cells) + '</tr>'

        # Code
        elif line.startswith('```'):
            in_code = not in_code

        # Lists and Paragraphs
        else:
            if in_table:
                in_table = False
                components['table'] += '</table>'

            if in_code:
                components['code'] += line + '\\n'
            elif line.startswith('- '):
                components['lists'].append(line[2:].strip())
            else:
                components['paragraphs'].append(line)

    if in_table: components['table'] += '</table>'
    return components

def render_slide_html(components, template):
    """Renders the HTML for a single slide based on the template and components."""
    if template == "Template-01-Title":
        return f"""
            <div class="accent-bar mb-6"></div>
            <h1 class="title mb-6">{components.get('title', '')}</h1>
            <p class="subtitle mt-4">{components.get('subtitle', '')}</p>
            {''.join(f'<p class="text-lg my-2">{p}</p>' for p in components.get('paragraphs', []))}
            <div class="flex items-center justify-center my-6">
                <div class="my-4 p-8 w-3/4 h-64 bg-gray-100 border rounded flex justify-center items-center"><p class="text-gray-500">（キービジュアル: {components.get('image_alt', 'AIとプレゼンテーション')}）</p></div>
            </div>
            {components.get('table', '')}
        """

    elif template in ["Template-03-2Column_Standard", "Template-05-2Column_ComparisonCard", "Template-06-2Column_Code", "Template-08-Conclusion"]:
        # Intelligent content splitting for 2-column layouts
        left_col, right_col = "", ""

        left_col += f"<h2 class='section-title'>{components.get('subtitle', components.get('title', ''))}</h2>"
        for p in components.get('paragraphs', []):
            left_col += f'<p class="text-lg my-3">{p}</p>'
        if components.get('lists'):
            left_col += '<ul class="mt-4 space-y-2">' + ''.join(f'<li class="ml-6 list-disc">{li}</li>' for li in components.get('lists')) + '</ul>'

        if components.get('image_alt'):
            right_col += f'<div class="my-4 p-8 h-full bg-gray-100 border rounded flex justify-center items-center"><p class="text-gray-500">（画像: {components.get("image_alt")}）</p></div>'
        if components.get('table'):
            right_col += components.get('table')
        if components.get('code'):
            right_col += f'<pre class="code-block h-full bg-gray-800 text-white p-4 rounded-md my-4 text-sm overflow-scroll">{components.get("code")}</pre>'

        # If right column is empty, put some paragraphs there
        if not right_col and len(components.get('raw_lines')) > 10:
             # A bit of a hack to balance content
            half_way = len(left_col) // 2
            split_at = left_col.rfind('</p>', 0, half_way) + 4
            if split_at > 4:
                right_col = left_col[split_at:]
                left_col = left_col[:split_at]

        return f"""
            <div class="flex h-full">
                <div class="side-accent mr-8"></div>
                <div class="w-2/5 pr-4 flex flex-col justify-center">{left_col}</div>
                <div class="w-3/5 pl-8 flex flex-col justify-center">{right_col if right_col else '<div class="w-full h-full bg-gray-50 rounded"></div>'}</div>
            </div>
        """

    else: # Default fallback renderer (TOC, etc.)
        return f"""
            <h1 class="title mb-4">{components.get('title', '')}</h1>
            <h2 class="section-title mt-6 mb-3">{components.get('subtitle', '')}</h2>
            {''.join(f'<p class="text-lg my-2">{p}</p>' for p in components.get('paragraphs', []))}
            {components.get('table', '')}
        """

def main():
    """Main function to generate slides."""
    markdown_file = '/Users/jrpj2010/vibe-coding/sato_managed_contents/商談管理/SBクリエイティブ株式会社様/20250629 時点最終原稿プロット.md'
    css_file = '/Users/jrpj2010/vibe-coding/sato_managed_contents/Gen-Spa2.0/20250705 AIスライド徹底解説/gen-spa-styles.css'
    output_dir = '/Users/jrpj2010/vibe-coding/sato_managed_contents/Gen-Spa2.0/20250705 AIスライド徹底解説/再現検証'

    os.makedirs(output_dir, exist_ok=True)

    try:
        with open(markdown_file, 'r', encoding='utf-8') as f:
            markdown_content = f.read()
        with open(css_file, 'r', encoding='utf-8') as f:
            css_content = f.read()

        normalized_content = "\\n".join(markdown_content.splitlines())
        slides_md = normalized_content.split('\\n---\\n')
        total_slides = len([s for s in slides_md if s.strip()])

        slide_count = 0
        for slide_md in slides_md:
            if not slide_md.strip():
                continue
            slide_count += 1

            template = choose_template(slide_md, slide_count - 1)
            components = parse_slide_components(slide_md)
            body_html = render_slide_html(components, template)

            nav_html = '<div class="absolute bottom-4 right-4 flex space-x-2">'
            if slide_count > 1:
                nav_html += f'<a href="{slide_count - 1}.html" class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">‹ 前へ</a>'
            if slide_count < total_slides:
                nav_html += f'<a href="{slide_count + 1}.html" class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">次へ ›</a>'
            nav_html += '</div>'

            final_html = f'''<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI超独学術 - スライド {slide_count}/{total_slides}</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Source+Code+Pro:wght@400;600&display=swap" rel="stylesheet">
    <style>{css_content}</style>
</head>
<body class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="slide-container bg-white p-12 flex flex-col shadow-2xl relative">
        {body_html}
        {nav_html}
        <div class="footer absolute bottom-4 left-12 text-gray-400 text-sm">{slide_count} / {total_slides}</div>
    </div>
</body>
</html>'''

            filepath = os.path.join(output_dir, f"{slide_count}.html")
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(final_html)
            print(f"Generated {filepath} using {template}")

        print(f"\\nSuccessfully generated {total_slides} slides.")
        print(f"Please open '{os.path.join(output_dir, '1.html')}' to start.")

    except FileNotFoundError as e:
        print(f"Error: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

if __name__ == '__main__':
    main()
