import os

def convert_files_to_sjis_crlf(directory):
    """
    指定されたディレクトリ内のすべての.mdファイルを読み込み、
    Shift-JISエンコーディングとCRLF改行コードに変換して上書き保存する。
    """
    try:
        files = [f for f in os.listdir(directory) if f.endswith('.md')]
        if not files:
            print(f"変換対象のファイルが見つかりません。ディレクトリ: {directory}")
            return

        print(f"{len(files)}個のファイルを変換します...")

        for filename in files:
            filepath = os.path.join(directory, filename)
            
            # UTF-8でファイルを読み込む
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
            except Exception as e:
                print(f"ファイル '{filename}' の読み込み中にエラーが発生しました: {e}")
                continue

            # Shift-JISで書き��える
            try:
                with open(filepath, 'w', encoding='shift_jis', newline='\r\n') as f:
                    f.write(content)
                print(f"  - '{filename}' をShift-JIS, CRLFに変換しました。")
            except Exception as e:
                print(f"ファイル '{filename}' の書き込み中にエラーが発生しました: {e}")
                # 変換に失敗した場合は、元の内容を復元しようと試みる
                try:
                    with open(filepath, 'w', encoding='utf-8', newline='\n') as f:
                        f.write(content)
                    print(f"    - '{filename}' をUTF-8に復元しました。")
                except Exception as restore_e:
                    print(f"    - 復元に失敗しました: {restore_e}")

        print("\nすべてのファイルの変換処理が完了しました。")

    except FileNotFoundError:
        print(f"エラー: ディレクトリが見つかりません - {directory}")
    except Exception as e:
        print(f"予期せぬエラーが発生しました: {e}")

if __name__ == "__main__":
    target_directory = "/Users/jrpj2010/vibe-coding/sato_managed_contents/商談管理/SBクリエイティブ株式会社様/20250630最終原稿："
    convert_files_to_sjis_crlf(target_directory)
