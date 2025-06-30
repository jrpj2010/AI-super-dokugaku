import os

def convert_files_to_utf8(directory):
    """
    指定されたディレクトリ内のすべての.mdファイルを読み込み、
    UTF-8エンコーディングとLF改行コードに変換して上書き保存する。
    エラーが発生した場合は、可能な限り処理を続ける。
    """
    try:
        files = [f for f in os.listdir(directory) if f.endswith('.md')]
        if not files:
            print(f"変換対象のファイルが見つかりません。ディレクトリ: {directory}")
            return

        print(f"{len(files)}個のファイルをUTF-8に復元します...")

        for filename in files:
            filepath = os.path.join(directory, filename)
            content = None
            
            # Shift-JISでファイルを読み込んでみる
            try:
                with open(filepath, 'r', encoding='shift_jis') as f:
                    content = f.read()
            except Exception as e:
                # Shift-JISで読めない場合は、UTF-8の可能性がある
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                except Exception as e_utf8:
                    print(f"  - '{filename}' の読み込みに失敗しました (Shift-JIS, UTF-8ともに): {e}, {e_utf8}")
                    continue
            
            if content is not None:
                # UTF-8で書き戻す
                try:
                    with open(filepath, 'w', encoding='utf-8', newline='\n') as f:
                        f.write(content)
                    print(f"  - '{filename}' をUTF-8, LFに変換しました。")
                except Exception as e:
                    print(f"  - '{filename}' のUTF-8への書き込み中にエラーが発生しました: {e}")

        print("\nすべてのファイルの復元処理が完了しました。")

    except FileNotFoundError:
        print(f"エラー: ディレクトリが見つかりません - {directory}")
    except Exception as e:
        print(f"予期せぬエラーが発生しました: {e}")

if __name__ == "__main__":
    target_directory = "/Users/jrpj2010/vibe-coding/sato_managed_contents/商談管理/SBクリエイティブ株式会社様/20250630最終原稿："
    convert_files_to_utf8(target_directory)
