from markitdown import MarkItDown

input_pdf = "/Users/jrpj2010/vibe-coding/sato_managed_contents/Gen-Spa2.0/20250705 AIスライド徹底解説/Felo Create マーケティングBriefアンバサダー用.pdf"
output_md = "/Users/jrpj2010/vibe-coding/sato_managed_contents/Gen-Spa2.0/20250705 AIスライド徹底解説/Felo Create マーケティングBriefアンバサダー用.md"

try:
    md = MarkItDown()
    result = md.convert(input_pdf)

    with open(output_md, "w", encoding="utf-8") as f:
        f.write(result.text_content)

    print(f"Successfully converted {input_pdf} to {output_md}")

except Exception as e:
    print(f"An error occurred: {e}")
    print("Please ensure that the 'pypdf' dependency is installed. You can install it with: python3 -m pip install pypdf")
