import yaml
from google.cloud import texttospeech

# 1. YAMLファイルを読み込む
with open('tts_pronunciation_lexicon.yaml', 'r', encoding='utf-8') as f:
    lexicon = yaml.safe_load(f)

# TTSで読み上げたい元のテキスト
original_text = "肺の検査結果です。右葉上部に影が見られますが、左葉はきれいです。"

# 2. & 3. テキストを前処理してSSMLに置換
processed_text = original_text
if lexicon and 'medical_terms' in lexicon:
    for item in lexicon['medical_terms']:
        term = item['term']
        # 推奨されるssml_precise_ipaを使用
        ssml_solution = item['solution']['ssml_precise_ipa']
        if term in processed_text:
            processed_text = processed_text.replace(term, ssml_solution)

# 最終的にAPIに渡すSSMLテキスト
# <speak> タグで全体を囲む必要がある
final_ssml = f"<speak>{processed_text}</speak>"

print("--- 生成されるSSML ---")
print(final_ssml)
# 出力: <speak>肺の検査結果です。<phoneme alphabet="ipa" ph="ujoː">右葉</phoneme>上部に影が見られますが、<phoneme alphabet="ipa" ph="sajoː">左葉</phoneme>はきれいです。</speak>

# 4. Google Cloud TTS APIにリクエスト（以下は概念コード）
# client = texttospeech.TextToSpeechClient()
# synthesis_input = texttospeech.SynthesisInput(ssml=final_ssml)
# ... (音声合成処理) ...
