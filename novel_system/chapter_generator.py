"""
章生成エンジン - chapter_generator.py

2万文字以上のライトノベル風章を自動生成するモジュール
"""

import random
import re
from typing import Dict, List, Any, Tuple
from dataclasses import dataclass
import json
from plot_manager import PlotManager, Character, PlotChapter


@dataclass
class GenerationConfig:
    """章生成の設定を管理するデータクラス"""
    target_chars: int = 20000  # 目標文字数
    max_chars: int = 50000     # 最大文字数
    dialogue_ratio: float = 0.45  # セリフの比率（目標45%）
    sections_per_chapter: int = 4  # 章あたりの節数
    paragraphs_per_section: int = 8  # 節あたりの段落数
    style: str = "light_novel"  # 文体スタイル


class ChapterGenerator:
    """章生成エンジンのメインクラス"""
    
    def __init__(self, plot_manager: PlotManager):
        self.plot_manager = plot_manager
        self.config = GenerationConfig()
        
        # 文体パターンと表現辞書
        self._init_style_patterns()
        self._init_expression_dict()
    
    def _init_style_patterns(self):
        """ライトノベル風文体パターンを初期化"""
        self.narrative_patterns = [
            "〜していた。",
            "〜という状況だった。",
            "〜という光景が広がっていた。",
            "〜のだった。",
            "〜というわけだ。",
            "〜という具合だった。"
        ]
        
        self.dialogue_transitions = [
            "と言って、",
            "と呟くと、",
            "と答えながら、",
            "と説明した。",
            "と続けた。",
            "と微笑んで、",
            "と真剣な表情で言った。",
            "と少し困った様子で答えた。"
        ]
        
        self.scene_transitions = [
            "その時、",
            "すると、",
            "やがて、",
            "しばらくして、",
            "ふと、",
            "突然、",
            "同じ頃、",
            "一方で、"
        ]
    
    def _init_expression_dict(self):
        """感情・動作表現辞書を初期化"""
        self.emotions = {
            'joy': ['嬉しそうに', '明るく', '楽しげに', '晴れやかに'],
            'sadness': ['悲しそうに', '沈んだ声で', '寂しげに', '涙を浮かべて'],
            'anger': ['怒ったように', '強い口調で', 'イライラと', '憤慨して'],
            'surprise': ['驚いて', 'びっくりして', '目を丸くして', '息を呑んで'],
            'worry': ['心配そうに', '不安げに', '眉をひそめて', '困った様子で'],
            'determination': ['決意を込めて', '強い意志で', '毅然として', '力強く']
        }
        
        self.actions = {
            'mechanical': ['調整する', '修理する', '組み立てる', '設計図を描く', 'エンジンを調べる'],
            'magical': ['詠唱する', '光を放つ', '植物と交流する', '古代語を話す', '治癒する'],
            'combat': ['操縦する', '攻撃する', '回避する', '指揮する', '戦術を練る'],
            'social': ['話し合う', '相談する', '協力する', '説得する', '励ます']
        }
    
    def generate_chapter(self, chapter_num: int, custom_config: Dict[str, Any] = None) -> str:
        """指定された章を生成"""
        # 設定をカスタマイズ
        if custom_config:
            for key, value in custom_config.items():
                if hasattr(self.config, key):
                    setattr(self.config, key, value)
        
        # コンテキスト取得
        context = self.plot_manager.get_chapter_context(chapter_num)
        chapter = context['chapter']
        characters = context['characters']
        
        print(f"第{chapter_num}章「{chapter.title}」の生成を開始...")
        
        # 章構造を計画
        chapter_plan = self._plan_chapter_structure(chapter, characters)
        
        # 各節を生成
        sections = []
        total_chars = 0
        
        for i, section_plan in enumerate(chapter_plan['sections'], 1):
            section_title = f"第{i}節　{section_plan['title']}"
            section_content = self._generate_section(section_plan, characters, context)
            
            sections.append(f"## {section_title}\n\n{section_content}")
            total_chars += len(section_content)
            
            print(f"  {section_title} 完成 ({len(section_content):,}文字)")
            
            # 目標文字数に達したかチェック
            if total_chars >= self.config.target_chars:
                break
        
        # 章全体を組み立て
        chapter_content = self._assemble_chapter(chapter, sections)
        
        # 最終調整
        if len(chapter_content) < self.config.target_chars:
            chapter_content = self._expand_content(chapter_content, chapter, characters)
        
        print(f"第{chapter_num}章生成完了: {len(chapter_content):,}文字")
        return chapter_content
    
    def _plan_chapter_structure(self, chapter: PlotChapter, characters: Dict[str, Character]) -> Dict[str, Any]:
        """章の構造を計画"""
        # 主要イベントを節に分割
        events = chapter.key_events
        char_names = list(characters.keys())
        
        # 節タイトルと内容を計画
        sections = []
        
        # 基本的な4節構造
        section_templates = [
            {"title": "導入", "focus": "setting_establishment", "events": events[:1]},
            {"title": "展開", "focus": "character_interaction", "events": events[1:2] if len(events) > 1 else []},
            {"title": "転回", "focus": "conflict_escalation", "events": events[2:3] if len(events) > 2 else []},
            {"title": "結末", "focus": "resolution", "events": events[-1:]}
        ]
        
        for i, template in enumerate(section_templates):
            section = {
                'number': i + 1,
                'title': template['title'],
                'focus': template['focus'],
                'events': template['events'],
                'main_characters': char_names[:2],  # 主要キャラ2人に焦点
                'target_chars': self.config.target_chars // len(section_templates)
            }
            sections.append(section)
        
        return {
            'title': chapter.title,
            'summary': chapter.summary,
            'sections': sections,
            'total_target_chars': self.config.target_chars
        }
    
    def _generate_section(self, section_plan: Dict[str, Any], characters: Dict[str, Character], context: Dict[str, Any]) -> str:
        """節の内容を生成"""
        focus = section_plan['focus']
        events = section_plan['events']
        main_chars = section_plan['main_characters']
        target_chars = section_plan['target_chars']
        
        # 節の内容生成
        if focus == "setting_establishment":
            content = self._generate_setting_section(events, characters, context)
        elif focus == "character_interaction":
            content = self._generate_interaction_section(events, main_chars, characters, context)
        elif focus == "conflict_escalation":
            content = self._generate_conflict_section(events, main_chars, characters, context)
        else:  # resolution
            content = self._generate_resolution_section(events, main_chars, characters, context)
        
        # 目標文字数に調整
        if len(content) < target_chars * 0.8:
            content = self._expand_section_content(content, section_plan, characters)
        
        return content
    
    def _generate_setting_section(self, events: List[str], characters: Dict[str, Character], context: Dict[str, Any]) -> str:
        """導入部分を生成"""
        world_settings = context['world_settings']
        
        # 環境描写から開始
        content = f"　空には薄雲が浮かび、{world_settings.get('main_location', 'アルカディア')}の美しい風景が広がっていた。"
        content += "空中に浮かぶ島々の間を、小さな飛行船がゆっくりと航行している。\n\n"
        
        # キャラクター登場
        main_char = list(characters.values())[0] if characters else None
        if main_char:
            content += self._generate_character_introduction(main_char)
            content += "\n\n"
        
        # イベント導入
        if events:
            event_desc = self._expand_event_description(events[0], characters)
            content += event_desc
        
        # セリフを追加してライトノベル感を出す
        if main_char:
            dialogue = self._generate_character_dialogue(main_char, "contemplation")
            content += f"\n\n{dialogue}"
        
        return content
    
    def _generate_interaction_section(self, events: List[str], main_chars: List[str], characters: Dict[str, Character], context: Dict[str, Any]) -> str:
        """キャラクター交流部分を生成"""
        content = ""
        
        # キャラクター間の会話
        if len(main_chars) >= 2:
            char1_name = main_chars[0]
            char2_name = main_chars[1]
            char1 = characters.get(char1_name)
            char2 = characters.get(char2_name)
            
            if char1 and char2:
                conversation = self._generate_conversation(char1, char2, context)
                content += conversation
        
        # イベント展開
        if events:
            for event in events:
                event_desc = self._expand_event_description(event, characters)
                content += f"\n\n　{event_desc}"
        
        # 感情描写を追加
        if main_chars and characters:
            char = characters.get(main_chars[0])
            if char:
                emotion_desc = self._generate_emotion_description(char, "determination")
                content += f"\n\n{emotion_desc}"
        
        return content
    
    def _generate_conflict_section(self, events: List[str], main_chars: List[str], characters: Dict[str, Character], context: Dict[str, Any]) -> str:
        """葛藤・緊張部分を生成"""
        content = "　状況は次第に緊迫したものになっていった。"
        
        # 緊張感のある環境描写
        content += "空の色が変わり始め、どこか不穏な空気が漂っている。\n\n"
        
        # キャラクターの内面描写
        if main_chars and characters:
            char = characters.get(main_chars[0])
            if char:
                internal_monologue = self._generate_internal_monologue(char, "conflict")
                content += internal_monologue + "\n\n"
        
        # イベント展開
        if events:
            for event in events:
                event_desc = self._expand_event_description(event, characters)
                content += f"　{event_desc}\n\n"
        
        # 決意のセリフ
        if main_chars and characters:
            char = characters.get(main_chars[0])
            if char:
                dialogue = self._generate_character_dialogue(char, "determination")
                content += dialogue
        
        return content
    
    def _generate_resolution_section(self, events: List[str], main_chars: List[str], characters: Dict[str, Character], context: Dict[str, Any]) -> str:
        """結末部分を生成"""
        content = "　そして、ついにその時が来た。"
        
        # クライマックス的な描写
        if events:
            for event in events:
                event_desc = self._expand_event_description(event, characters)
                content += f"\n\n　{event_desc}"
        
        # キャラクター全員の協力
        if len(main_chars) >= 2 and characters:
            cooperation_scene = self._generate_cooperation_scene(main_chars, characters)
            content += f"\n\n{cooperation_scene}"
        
        # 希望的な結末
        content += "\n\n　やがて空は再び穏やかな青色を取り戻し、すべてが平和な状態に戻った。"
        content += "この経験を通じて、皆がより深い絆で結ばれたことは確かだった。"
        
        return content
    
    def _generate_character_introduction(self, character: Character) -> str:
        """キャラクター紹介文を生成"""
        age_desc = f"{character.age}歳の" if character.age else ""
        
        intro = f"　{age_desc}{character.name}は、{character.role}として"
        
        if character.appearance.get('hair'):
            intro += f"{character.appearance['hair']}を揺らしながら、"
        
        if character.personality.get('core'):
            intro += f"{character.personality['core']}性格で知られている。"
        else:
            intro += "日々を過ごしていた。"
        
        if character.abilities:
            ability = character.abilities[0]
            intro += f"特に{ability}の分野では、他の追随を許さない実力を持っている。"
        
        return intro
    
    def _generate_conversation(self, char1: Character, char2: Character, context: Dict[str, Any]) -> str:
        """キャラクター間の会話を生成"""
        conversation = f"　{char1.name}と{char2.name}は、向かい合って話していた。\n\n"
        
        # char1のセリフ
        char1_topic = self._get_character_topic(char1, context)
        conversation += f"「{char1_topic}」\n\n"
        conversation += f"　{char1.name}が{random.choice(self.dialogue_transitions)}\n\n"
        
        # char2の返答
        char2_response = self._generate_response(char2, char1_topic)
        conversation += f"「{char2_response}」\n\n"
        conversation += f"　{char2.name}は{random.choice(['うなずきながら', '考え込むように', '真剣な表情で'])}答えた。"
        
        return conversation
    
    def _get_character_topic(self, character: Character, context: Dict[str, Any]) -> str:
        """キャラクターらしい話題を生成"""
        if "リン" in character.name:
            return "この機械の構造、すごく興味深いね。もっと効率的に動かせるかもしれない"
        elif "ソラ" in character.name:
            return "自然の声が聞こえます。何か大きな変化が起ころうとしているようですね"
        elif "ローズ" in character.name:
            return "こんなこともあろうかと思って、準備しておいたんだよ"
        elif "グレイソン" in character.name:
            return "計画は順調に進んでいる。古代の技術は我々のものとなるだろう"
        elif "アルテミス" in character.name:
            return "理解できません。なぜ人間はそのような選択をするのですか"
        else:
            return "これからどうしたらいいでしょうか"
    
    def _generate_response(self, character: Character, topic: str) -> str:
        """キャラクターの返答を生成"""
        if "リン" in character.name:
            return "そうだね！一緒に研究してみよう。きっと新しい発見があるはずだよ"
        elif "ソラ" in character.name:
            return "そうですね。私たちにできることを、精一杯やってみましょう"
        elif "ローズ" in character.name:
            return "まったく、若い子たちは元気だねぇ。でも、その気持ちは大切だよ"
        elif "グレイソン" in character.name:
            return "愚かな。感情に流されていては、真の進歩は望めない"
        elif "アルテミス" in character.name:
            return "分からないけれど...あなたたちと一緒にいると、何かが変わるような気がします"
        else:
            return "はい、そうですね"
    
    def _generate_character_dialogue(self, character: Character, emotion_type: str) -> str:
        """キャラクターのセリフを生成"""
        dialogue_content = self._get_character_topic(character, {})
        emotion_desc = random.choice(self.emotions.get(emotion_type, ['']))
        
        dialogue = f"「{dialogue_content}」\n\n"
        dialogue += f"　{character.name}は{emotion_desc}言った。"
        
        return dialogue
    
    def _generate_internal_monologue(self, character: Character, situation: str) -> str:
        """キャラクターの内面描写を生成"""
        monologue = f"　{character.name}は考えていた。"
        
        if "リン" in character.name:
            monologue += "（この技術を使えば、きっと皆を助けることができる。父さんが教えてくれたことを信じて、やってみよう）"
        elif "ソラ" in character.name:
            monologue += "（故郷のために、私にできることは何だろう。皆と力を合わせれば、きっと道は見つかるはずだ）"
        elif "ローズ" in character.name:
            monologue += "（若い子たちを守るのが、私の役目だ。経験を活かして、最善の判断をしなければ）"
        else:
            monologue += "（これからどうなるのだろうか。でも、一人じゃない。みんながいる）"
        
        return monologue
    
    def _generate_emotion_description(self, character: Character, emotion: str) -> str:
        """感情描写を生成"""
        emotion_words = self.emotions.get(emotion, [''])
        emotion_desc = random.choice(emotion_words) if emotion_words else ''
        
        description = f"　{character.name}の表情が{emotion_desc}変わった。"
        
        if character.appearance.get('eyes'):
            description += f"{character.appearance['eyes']}が、内なる想いを映し出している。"
        
        return description
    
    def _generate_cooperation_scene(self, char_names: List[str], characters: Dict[str, Character]) -> str:
        """協力シーンを生成"""
        scene = "　そして皆が力を合わせた。"
        
        for name in char_names:
            char = characters.get(name)
            if char:
                if char.abilities:
                    ability = char.abilities[0]
                    scene += f"{name}は{ability}の技術を駆使し、"
                else:
                    scene += f"{name}は持てる力すべてを発揮し、"
        
        scene += "一つの目標に向かって協力した。それは美しい光景だった。"
        
        return scene
    
    def _expand_event_description(self, event: str, characters: Dict[str, Character]) -> str:
        """イベント説明を詳細に展開"""
        expanded = event
        
        # 文章を詳細化
        if len(expanded) < 100:
            expanded += "その瞬間、周囲の空気が変わり、誰もが息を呑んだ。"
            expanded += "これまでに経験したことのない、不思議な感覚が皆を包み込んでいた。"
        
        # キャラクターの反応を追加
        if characters:
            char_name = list(characters.keys())[0]
            expanded += f"{char_name}は、この状況に対して真剣に向き合おうとしていた。"
        
        return expanded
    
    def _expand_section_content(self, content: str, section_plan: Dict[str, Any], characters: Dict[str, Character]) -> str:
        """節の内容を拡張"""
        # 追加の描写を挿入
        additional_content = []
        
        # 環境描写を追加
        additional_content.append("　風が優しく吹き抜け、葉っぱがさらさらと音を立てている。")
        additional_content.append("遠くには雲海が広がり、幻想的な景色を作り出していた。")
        
        # キャラクターの動作描写を追加
        if characters:
            char = list(characters.values())[0]
            if char.abilities:
                ability = char.abilities[0]
                additional_content.append(f"{char.name}は{ability}の技術を使って、状況を改善しようと試みていた。")
        
        # 内容を結合
        paragraphs = content.split('\n\n')
        expanded_paragraphs = []
        
        for i, paragraph in enumerate(paragraphs):
            expanded_paragraphs.append(paragraph)
            if i < len(additional_content):
                expanded_paragraphs.append(additional_content[i])
        
        return '\n\n'.join(expanded_paragraphs)
    
    def _expand_content(self, content: str, chapter: PlotChapter, characters: Dict[str, Character]) -> str:
        """章全体の内容を目標文字数まで拡張"""
        current_length = len(content)
        target_length = self.config.target_chars
        
        if current_length >= target_length:
            return content
        
        # 追加コンテンツを生成
        additional_sections = []
        
        # エピローグ的な節を追加
        epilogue = self._generate_epilogue_section(chapter, characters)
        additional_sections.append("## エピローグ\n\n" + epilogue)
        
        # 必要に応じてさらに追加
        while len('\n\n'.join([content] + additional_sections)) < target_length:
            # キャラクター個別の場面を追加
            if characters:
                char_name = random.choice(list(characters.keys()))
                char = characters[char_name]
                individual_scene = self._generate_individual_character_scene(char)
                additional_sections.append(f"## {char_name}の想い\n\n{individual_scene}")
            
            # 十分な長さになったら終了
            if len(additional_sections) >= 3:
                break
        
        return content + '\n\n' + '\n\n'.join(additional_sections)
    
    def _generate_epilogue_section(self, chapter: PlotChapter, characters: Dict[str, Character]) -> str:
        """エピローグ節を生成"""
        epilogue = "　すべてが終わった後、静寂が戻った。"
        epilogue += "それぞれが今回の経験を振り返り、新たな決意を固めていた。\n\n"
        
        # キャラクターごとの感想
        for char_name, char in characters.items():
            epilogue += f"　{char_name}は、"
            if char.personality.get('core'):
                epilogue += f"自分の{char.personality['core']}性格が、"
            epilogue += "今回の出来事でさらに成長したことを実感していた。\n\n"
        
        epilogue += "　そして皆が理解していた。これは終わりではなく、新しい始まりなのだということを。"
        epilogue += "空には無限の可能性が広がっている。"
        
        return epilogue
    
    def _generate_individual_character_scene(self, character: Character) -> str:
        """個別キャラクターシーンを生成"""
        scene = f"　{character.name}は一人、静かに考えていた。\n\n"
        
        # キャラクターの専門分野に関する描写
        if character.abilities:
            ability = character.abilities[0]
            scene += f"　{ability}の技術について、新しいアイデアが浮かんでいる。"
            scene += "これまでの経験を活かして、さらに素晴らしいものを作り出せるかもしれない。\n\n"
        
        # 人間関係についての思い
        if character.relationships:
            rel_name = list(character.relationships.keys())[0]
            scene += f"　{rel_name}との関係についても考えていた。"
            scene += "お互いを理解し合うことの大切さを、改めて実感している。\n\n"
        
        # 未来への希望
        scene += f"　{character.name}の心には、明るい希望が宿っていた。"
        scene += "これからも仲間たちと共に、素晴らしい冒険を続けていくことだろう。"
        
        return scene
    
    def _assemble_chapter(self, chapter: PlotChapter, sections: List[str]) -> str:
        """章全体を組み立て"""
        # 章タイトル
        chapter_header = f"# 第{chapter.number}章　{chapter.title}\n\n"
        
        # 章の導入文
        intro = f"　{chapter.summary[:100]}...\n\n"
        
        # 各節を結合
        chapter_content = chapter_header + intro + '\n\n'.join(sections)
        
        return chapter_content
    
    def get_generation_stats(self, content: str) -> Dict[str, Any]:
        """生成された内容の統計情報を取得"""
        total_chars = len(content)
        
        # セリフ文字数を計算
        dialogue_chars = 0
        lines = content.split('\n')
        for line in lines:
            if '「' in line and '」' in line:
                # セリフ部分を抽出
                dialogue_parts = re.findall(r'「([^」]*)」', line)
                dialogue_chars += sum(len(part) for part in dialogue_parts)
        
        dialogue_ratio = dialogue_chars / total_chars if total_chars > 0 else 0
        
        # 段落数
        paragraphs = len([p for p in content.split('\n\n') if p.strip()])
        
        return {
            'total_characters': total_chars,
            'dialogue_characters': dialogue_chars,
            'dialogue_ratio': dialogue_ratio,
            'paragraphs': paragraphs,
            'sections': content.count('##'),
            'target_achieved': total_chars >= self.config.target_chars
        }


# モジュールテスト用の関数
def test_chapter_generator():
    """chapter_generator.pyの動作テスト"""
    try:
        from plot_manager import PlotManager
        
        print("=== ChapterGenerator テスト ===")
        
        # PlotManagerを初期化
        pm = PlotManager()
        generator = ChapterGenerator(pm)
        
        # 第1章を生成（短いテスト版）
        test_config = {
            'target_chars': 1000,  # テスト用に短く
            'sections_per_chapter': 2
        }
        
        chapter_content = generator.generate_chapter(1, test_config)
        stats = generator.get_generation_stats(chapter_content)
        
        print(f"生成結果:")
        print(f"  文字数: {stats['total_characters']:,}")
        print(f"  セリフ比率: {stats['dialogue_ratio']:.1%}")
        print(f"  段落数: {stats['paragraphs']}")
        print(f"  節数: {stats['sections']}")
        
        # 内容の一部を表示
        print(f"\n生成内容（先頭200文字）:")
        print(chapter_content[:200] + "...")
        
        print("\n✅ ChapterGenerator テスト完了")
        return True
        
    except Exception as e:
        print(f"❌ ChapterGenerator テストエラー: {e}")
        return False


if __name__ == "__main__":
    test_chapter_generator()