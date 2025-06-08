# Midjourney V7 プロンプト戦略と高度なテクニック

## 概要
この動画は、最新のMidjourney V7における効果的なプロンプト戦略とパワーユーザー向けテクニックについて解説しています。オープンエンド、ヴァイブ、インストラクショナルの3つの主要なプロンプト方法を具体例とともに紹介し、さらに自然言語の活用、V7の理解度向上、Style Raw、多言語、Style Reference、Remix、Draft Modeなど、画像を思い通りに生成するための8つの高度なテクニックを詳しく説明します。V7の新しい機能を最大限に活用し、創造性を高めるための実践的なガイドです。

## 主要なポイント
- Midjourney V7にはオープンエンド、ヴァイブ、インストラクショナルの3つの異なるプロンプト戦略がある。
- V7は自然言語や複雑な指示の理解度が大幅に向上している。
- **Style Raw**や低いStylized値はプロンプトへの忠実性を高めるのに役立つ。
- 多言語プロンプトは文化的なニュアンスを画像に反映させることができる。
- **Style Reference**やパーソナライゼーションは画像のスタイルに一貫性をもたらす。
- **Remix**や**Draft Mode**はワークフローを効率化し、迅速なイテレーションを可能にする。

## 詳細内容

### Midjourney V7の基本 [00:38]
Midjourney V7は現在アルファ版だが、V6に比べて複雑なプロンプトの理解度など、すでに大幅な改善が見られる。プロンプト戦略は、探索的なものから精密なものまで、3つのレベルに分けられる。話者 [00:38]

#### 3つのプロンプト戦略 [01:01]
画像生成の目的や欲しい画像のコントロールレベルに応じて、以下の3つの戦略を使い分ける。話者 [01:01]

##### 戦略1: Open-Ended Prompts（オープンエンドプロンプト） [01:32]
- **特徴:** カジュアルな探求に最適。シンプルなコンセプトや強力な形容詞（例: elegant, futuristic）を与え、AIに自由に解釈させる。
- **使い方:** 少ない単語でイメージを喚起する。
- **ヒント:** Describe機能を使って既存の画像からプロンプトを生成したり、新しい**Draft Mode**と組み合わせて迅速なイテレーションを行うのに向いている。ただし、Conversational Modeではプロンプトが絞り込まれ、Vibe Promptsに近くなる傾向がある。
- **例:** "a cool penguin", "The perfect breakfast", "forgotten technology"話者 [01:32]

##### 戦略2: Vibe Prompts（ヴァイブプロンプト） [03:37]
- **特徴:** 基本的なシーンを設定し、コンマ区切りの記述子を追加することでムードや雰囲気を伝える。V4/V5ユーザーには馴染み深い形式。
- **使い方:** "被写体/シーン, 特性, 雰囲気, 感情"のように要素を並べる。各要素は同等に扱われ、AIによってブレンドされる。
- **ヒント:** 重要な単語はプロンプトの前に配置する。記述子をより具体的にする（例: "vintage Polaroid with faded colors"）。Stylized値を下げる（50-100推奨）と、Midjourneyのデフォルトの美学よりもプロンプトに忠実になる。重要な単語を繰り返す（例: "neon neon glow"）と強調効果が得られる。迅速なイテレーションに適している。
- **例:** "A night in shining armor, Vogue front page, magazine cover, celestial glow, fierce overcast"話者 [03:37]

##### 戦略3: Instructional Prompts（インストラクショナルプロンプト） [06:08]
- **特徴:** 完全な文章と具体的な詳細を用いて、クリスタルクリアなビジョンを忠実に再現したい場合に使う。最も高い精度が得られる。
- **使い方:** 完全な文章を使用し、各文章が主語（固有名詞）に言及するようにする。位置、素材、照明など、具体的な詳細を記述する。
- **ヒント:** 242フォーミュラ（主語と設定2文、詳細4文、雰囲気/ムード/スタイル2文）が効果的。画像内の要素の位置を具体的に指定することで、構図をコントロールしやすい。
- **例:** "A knight in shining armor poses for a magazine cover. The knight is standing in the middle of a wheat field. The knight is wearing obsidian colored armor..."話者 [06:08]

#### 戦略の組み合わせ [09:06]
ヴァイブプロンプトでアイデアを探索し、気に入った結果をDescribe機能で分析、それを元にインストラクショナルプロンプトを作成するというワークフローが効果的。ヴァイブプロンプトの自発性とインストラクショナルプロンプトの精度を両立できる。話者 [09:06]

### 8つのパワーユーザー向けテクニック [09:54]

#### 1. 自然言語構造のマスター [10:00]
Midjourney V7は適切な文法や句読点を含む自然言語を好む。キーワードの羅列よりも、構造化された文章の方が理解しやすい。簡単な構造として、「主語とアクション」→「場所と環境」→「スタイル詳細」の順で記述する方法がある。話者 [10:00]

#### 2. V7の理解度の活用 [11:16]
V7は様々なスタイル、アーティスト、表情、構図に関する専門用語の理解度が向上している。これにより、より直接的なプロンプトで質の高い結果が得られるようになった。
- **具体例:** "CCTV footage"はカメラではなく「映像そのもの」を生成する、"Diesel Punk"やHenri Roussoのようなアーティストスタイルを正確に再現する。
- **構図:** "full body"で全身ショットが容易になった。「standing on the ground」や靴などの衣類の言及が効果を高める。2/3ボディショットも可能になった（ただし精度はフルボディより低い）。話者 [11:16]

#### 3. 複雑な構図の分解 [13:12]
複雑なシーンや構図は、要素をセクションやレイヤーに分解して記述することでコントロールしやすくなる。「over-the-shoulder shot」のように曖昧な用語を使うのではなく、前景・後景の人物の位置や見える範囲を具体的に記述する。
- **応用:** ダブルエクスポージャー効果（bottom layer/top layer）、複数キャラクターの配置指定などに有効。話者 [13:12]

#### 4. **Style Raw**の使用 [14:36]
通常、Midjourneyは画像を美しく生成しようとするが、**Style Raw**モード（`--style raw`）は、プロンプトへの忠実性を高める。標準バージョンがMidjourney独自の美学を適用するのに対し、**Style Raw**バージョンは指示をより文字通りに実行する。プロンプトが意図した通りにならない場合の突破口になり得る。低いStylized値（--s 50-100）との組み合わせも試す価値がある。話者 [14:36]

#### 5. 多言語対応の活用 [15:30]
V7は異なる言語のプロンプトを理解するだけでなく、その言語が話されている地域の文化的な背景を画像に反映させる。これにより、よりオーセンティックな表現が可能になる。
- **具体例:** 日本語プロンプトはアニメ風、イタリア語は地中海風、ヒンディー語は南アジア風の表現に影響を与える。話者 [15:30]

#### 6. パーソナライゼーションの影響把握 [16:38]
パーソナライゼーションコードは生成画像にユーザーの好みを反映させるが、具体的にどのように影響するかは分かりにくい。Permutation Prompts（波括弧 `{}` とコンマ `,` を使用して複数のプロンプトを同時に実行する機能）を使うことで、パーソナライゼーションが異なる主題にどのように影響するかを直接比較できる。パーソナライズタブでの選択は、客観的な良さより個人的な好みを優先することが重要。話者 [16:38]

#### 7. **Style Reference**の活用 [17:28]
V7での**Style Reference**（`--sref`）の使用は進化中だが、V6の**SRF**コードを効果的に使うための方法がある。
1.  Stylized値を上げる（Midjourneyが参照スタイルをよりよく解釈・適用し、視覚的な一貫性が生まれる）。
2.  V7のパーソナライゼーションコードと**SRF**を併用する（審美的な好みを維持しながら**SRF**を活用できる。色の統一に有効）。
3.  複数の**SRF**コードをブレンドする（個別の参照よりも優れたカスタムスタイルを生み出すことができる）。話者 [17:28]

#### 8. **Remix** & **Draft Mode**によるワークフロー高速化 [18:41]
- **Remix Mode:** 既存画像のバリエーションを生成する際に、プロンプトやパラメーターを変更できる。特にV6で作成した画像をV7の性能でアップデートする際に有効（VaryではなくRemix Strongを使用）。
- **Draft Mode:** 低品質ながら高速な画像生成モード。アイデアを素早くテストするのに最適。稲妻アイコンで有効化。
- **Conversational Mode:** **Draft Mode**内で、コマンド形式で指示を入力すると、Midjourneyが自動でプロンプトを選定し、画像を生成する。複数のプロンプトを一度に実行することも可能。Draft Modeで気に入った画像ができたら、Enhanceをクリックして高品質版を生成できる。話者 [18:41]

## 結論 [20:02]
Midjourney V7は、オープンエンド、ヴァイブ、インストラクショナルという多様なプロンプト戦略と、自然言語、Style Raw、多言語、Style Reference、Remix、Draft Modeなどの高度なテクニックを組み合わせることで、これまで以上に意図した画像を生成できるようになりました。特にV7の理解度向上と新しいワークフロー機能は、創造性と効率を大幅に向上させます。プロンプトは具体的であればあるほど、Midjourneyはあなたのビジョンを実現に近づけてくれます。話者 [20:02]

---

# Midjourney V7 TUTORIAL| Prompt Strategies, Draft Mode, Conversational, SREF & More

**チャンネル:** AV - AI Agent
**公開日:** 2025-05-13
**URL:** https://www.youtube.com/watch?v=FnhYiZB5Szs

## 説明

Midjourney V7 TUTORIAL| Prompt Strategies, Draft Mode, Conversational, SREF & More
#MidjourneyV7 #AIArt #PromptEngineering

Master Midjourney V7 with my comprehensive guide based on weeks of hands-on testing! 
WHAT YOU'LL LEARN:
- 3 Powerful Prompting Strategies: Open-ended, Vibe, and Instructional approaches
- 8 Advanced Techniques to elevate your creations
- Step-by-step examples with real results

🎯 SPECIAL DISCOUNT: Try KlingAI and get 50% Bonus Credits in your first month: https://klingai.com/h5-app/invitation?code=7BVGMKWAZXQ3

🎁 FREE RESOURCES:
https://www.midjourney.com/explore?tab=random

⏱️ Timestamps:
0:00 - Intro
0:37 - The Basics of Prompting Strategies in V7
    1:32 - Strategy #1: Open-Ended Prompts 
    3:37 - Strategy #2: Vibe Prompts 
    6:08 - Strategy #3: Instructional Prompts
9:54 - 8 Power-User Tips for Midjourney V7 
    10:00 - Mastering Natural Language Structure
    11:16 - Leveraging V7's Improved Understanding
    13:12 - Breaking Down Complex Compositions 
    14:36 - Using Style Raw for Maximum Prompt Control 
    15:30 - Tapping Into V7's Multilingual Superpowers 
    16:38 - Revealing Your Personalization's True Colors
    17:28 - Maximizing Style Reference in V7 
    18:41 - Speeding Up Your Workflow with Remix & Draft Modes 
-----
Welcome to AV-AI Agent - Your AI Creation Companion!

Learn from AV's real experience using AI tools in content creation. No fluff, just practical tips and actionable strategies. From video production to automation, discover how to create BETTER content FASTER.

🎯 What You'll Find Here:
- Latest AI Tools & Updates
- Step-by-Step AI Tutorials
- Free AI Tools Guide
- AI Video Creation Tips
- ChatGPT & AI Agents Mastery
- AI Animation Secrets
- Content Automation Hacks

Join our growing community of AI creators! Hit Subscribe 🔔 and never miss the latest AI tools and tricks!

Channel subscription link: https://www.youtube.com/@Av-ai-agent?sub_confirmation=1

Video source: A source compiled under the fair use law of YouTube is used.

## 字幕

[00:01 - 00:13]
[Music]

[00:10 - 00:14]
So, Midjourney V7 has been out for a few

[00:13 - 00:17]
weeks now, and let me tell you, this

[00:14 - 00:19]
update is revolutionary. I've been

[00:17 - 00:21]
experimenting like crazy, testing every

[00:19 - 00:23]
approach I could think of to figure out

[00:21 - 00:25]
what works best. And today, I'm pumped

[00:23 - 00:27]
to share all my discoveries with you.

[00:25 - 00:29]
Whether you're just starting out or

[00:27 - 00:31]
you're a seasoned pro, the next 20

[00:29 - 00:34]
minutes will completely change how you

[00:31 - 00:36]
create. And don't click away early. I've

[00:34 - 00:38]
saved the most powerful techniques for

[00:36 - 00:40]
the very end. To begin, let's discuss

[00:38 - 00:43]
the basics of prompting strategies in

[00:40 - 00:45]
V7. You might wonder what makes V7

[00:43 - 00:47]
special. Well, this model is currently

[00:45 - 00:49]
in alpha, which means it's still being

[00:47 - 00:52]
refined and will continue to improve in

[00:49 - 00:53]
the coming weeks. But even in the early

[00:52 - 00:56]
stage, it's showing some serious

[00:53 - 00:59]
improvements over V6, especially when it

[00:56 - 01:01]
comes to understanding complex prompts.

[00:59 - 01:03]
Here's the deal. We have three prompting

[01:01 - 01:06]
strategies you can use with midjourney

[01:03 - 01:08]
V7 from casual to hardcore. They are

[01:06 - 01:10]
open-ended prompts, vibe prompts, and

[01:08 - 01:12]
instructional prompts. Think of these as

[01:10 - 01:14]
different gears in your car. Sometimes

[01:12 - 01:16]
you want to cruise and explore. That's

[01:14 - 01:18]
when open-ended prompts work great. When

[01:16 - 01:20]
you want more control, but still keep

[01:18 - 01:21]
things flowing, vibe prompts are your

[01:20 - 01:23]
friend. And when you need precision and

[01:21 - 01:25]
consistency, that's when you shift into

[01:23 - 01:28]
instructional prompting. Of course, I'll

[01:25 - 01:30]
show you tons of real examples so you

[01:28 - 01:32]
can see exactly how they work. Let's

[01:30 - 01:34]
start with the most beginnerfriendly

[01:32 - 01:36]
approach. Strategy number one,

[01:34 - 01:38]
open-ended prompts. Open-ended prompts

[01:36 - 01:41]
are perfect when you're feeling casual

[01:38 - 01:43]
or just want to explore. The idea is

[01:41 - 01:45]
simple. You give midjourney a simple

[01:43 - 01:47]
concept and let the AI interpret it

[01:45 - 01:49]
however it wants. The beauty of this

[01:47 - 01:51]
method is how little you need to say to

[01:49 - 01:53]
get impressive results. Instead of

[01:51 - 01:55]
meticulously describing every detail,

[01:53 - 01:58]
you can simply use powerful descriptive

[01:55 - 02:00]
words like elegant or futuristic and let

[01:58 - 02:03]
midjourney fill in the blanks. For

[02:00 - 02:05]
example, try typing a cool penguin. Just

[02:03 - 02:07]
those three words. See, you're implying

[02:05 - 02:08]
what you want rather than spelling it

[02:07 - 02:11]
out. Check these out. What does

[02:08 - 02:13]
midjourney think cool means? We've got a

[02:11 - 02:15]
portrait with this uh vigorous pose, one

[02:13 - 02:17]
with a hat, and one chilling on the

[02:15 - 02:18]
beach. Let's try another one. The

[02:17 - 02:21]
perfect breakfast. We are seeing

[02:18 - 02:24]
Midjourney's concept of perfect. It

[02:21 - 02:25]
might be colorful and extravagant or

[02:24 - 02:27]
just a comfortable dish of English

[02:25 - 02:30]
breakfast. All of these results are

[02:27 - 02:32]
beautifully demonstrated. This approach

[02:30 - 02:34]
is super fun for exploration. Here are

[02:32 - 02:36]
some more open-ended prompts you can

[02:34 - 02:39]
try. Forgotten technology, a mystic

[02:36 - 02:41]
animal, cyberpunk meal, and nostalgic

[02:39 - 02:44]
summer. This works especially well with

[02:41 - 02:46]
art styles, too. Just typing cubism or

[02:44 - 02:48]
photo realism will immediately transform

[02:46 - 02:49]
your image without having to explain

[02:48 - 02:51]
what they look like. That's why this

[02:49 - 02:53]
prompting method is perfect for sparking

[02:51 - 02:55]
inspiration. You can start here, see

[02:53 - 02:57]
what midJourney comes up with, and then

[02:55 - 02:59]
refine based on what you like. And

[02:57 - 03:01]
here's a pro tip. I often use the

[02:59 - 03:03]
describe feature to help with this

[03:01 - 03:05]
process. Just rightclick on any image

[03:03 - 03:07]
you like on the create page, click

[03:05 - 03:09]
describe, and boom, MidJourney will

[03:07 - 03:10]
generate four potential prompts based on

[03:09 - 03:12]
that image. It's like reverse

[03:10 - 03:14]
engineering the prompt. One more thing

[03:12 - 03:16]
about open-ended prompts, they're

[03:14 - 03:17]
perfect for the new draft mode, which

[03:16 - 03:19]
we'll talk about later. They let you

[03:17 - 03:22]
iterate quickly and explore different

[03:19 - 03:24]
directions before committing to a high

[03:22 - 03:26]
quality render. They can do great in

[03:24 - 03:28]
conversational mode, too. But there's an

[03:26 - 03:30]
interesting trade-off. Sure, it's more

[03:28 - 03:32]
intuitive, but you'll notice your

[03:30 - 03:34]
results become more narrowly focused as

[03:32 - 03:37]
your prompt expands, often shifting

[03:34 - 03:39]
toward what I call vibe prompts.

[03:37 - 03:42]
Strategy number two, vibe prompts. Vibe

[03:39 - 03:44]
prompting takes things up a notch. This

[03:42 - 03:46]
approach is all about establishing a

[03:44 - 03:48]
basic scene, then adding a bunch of

[03:46 - 03:50]
comma-epparated descriptors. Think of it

[03:48 - 03:52]
like creating a mood board with words.

[03:50 - 03:54]
It might give you an example. A night in

[03:52 - 03:57]
shining armor, Vogue front page,

[03:54 - 04:00]
magazine cover, celestial glow, fierce

[03:57 - 04:02]
overcast. See how different this is from

[04:00 - 04:04]
a simple open-ended prompt. We're giving

[04:02 - 04:05]
midjourney more direction, but still

[04:04 - 04:08]
keeping things loose enough for it to

[04:05 - 04:10]
interpret creatively. Take a look at the

[04:08 - 04:12]
core of the structure. Start with your

[04:10 - 04:15]
subject scene, a night in shining armor.

[04:12 - 04:17]
Add key attributes. Vogue, magazine,

[04:15 - 04:20]
cover. Include atmosphere elements,

[04:17 - 04:22]
celestial glow, overcast. Maybe throw in

[04:20 - 04:25]
emotions or moods, fierce. I like to

[04:22 - 04:27]
think about vibe prompting this way.

[04:25 - 04:29]
Imagine someone seeing the final image

[04:27 - 04:31]
and describing it to a friend. What

[04:29 - 04:33]
words would they use? Those are the

[04:31 - 04:35]
kinds of descriptors you want to

[04:33 - 04:37]
include. Let's try another example. A

[04:35 - 04:39]
duck dejing on stage at a music

[04:37 - 04:41]
festival. Neon, neon glow, rave,

[04:39 - 04:43]
amigurroomi. Pretty cool, right? The

[04:41 - 04:45]
commaepparated format gives each element

[04:43 - 04:48]
equal weight and lets midjourney blend

[04:45 - 04:50]
them together. If you used midjourney V4

[04:48 - 04:52]
or V5, this prompting style might feel

[04:50 - 04:54]
familiar. It's similar to how those

[04:52 - 04:56]
models worked best. So, if you've been

[04:54 - 04:58]
around a while, this should be like

[04:56 - 05:01]
muscle memory. Even in V7, sometimes

[04:58 - 05:03]
Midjourney still seems to ignore certain

[05:01 - 05:05]
elements in your vibe prompt. I've got a

[05:03 - 05:07]
trick for you. Move important words to

[05:05 - 05:09]
the front of your prompt. For example,

[05:07 - 05:12]
if Polaroid isn't having enough effect

[05:09 - 05:14]
in a duck DJing on stage at a music

[05:12 - 05:16]
festival, Polaroid, try this instead.

[05:14 - 05:19]
Polaroid of a duck djing on stage at a

[05:16 - 05:20]
music festival. You can also be more

[05:19 - 05:23]
descriptive, like instead of just

[05:20 - 05:26]
Polaroid, try vintage Polaroid with

[05:23 - 05:28]
faded colors. See how it goes? Another

[05:26 - 05:30]
tried and tested method is to lower the

[05:28 - 05:32]
stylized value. This helps midjourney

[05:30 - 05:34]
follow your prompt more literally and

[05:32 - 05:37]
reduces its tendency to apply its

[05:34 - 05:38]
default aesthetic. Finally, perhaps you

[05:37 - 05:41]
didn't think of this method, but

[05:38 - 05:43]
doubling up on important words can do

[05:41 - 05:46]
wonders. Did you feel it weird that I

[05:43 - 05:48]
typed neon neon glow? It really

[05:46 - 05:50]
emphasizes that neon effect. One of the

[05:48 - 05:52]
big advantages of VIP prompting is how

[05:50 - 05:54]
quickly you can iterate. You can easily

[05:52 - 05:56]
swap out or add descriptors to change

[05:54 - 05:58]
your results. That's why it shines best

[05:56 - 06:00]
when you're in that middle ground. You

[05:58 - 06:02]
have a general idea of what you want,

[06:00 - 06:04]
but you're open to midjourneys

[06:02 - 06:06]
interpretation and artistic choices. But

[06:04 - 06:08]
I want to get even more precise, you

[06:06 - 06:10]
say. Let's move on to our most advanced

[06:08 - 06:11]
strategy. Strategy number three,

[06:10 - 06:13]
instructional prompts. Our third

[06:11 - 06:15]
approach uses complete sentences and

[06:13 - 06:17]
specific details. It's awesome when you

[06:15 - 06:19]
have a crystal clear vision and want

[06:17 - 06:22]
midjourney to follow your instructions

[06:19 - 06:24]
to a t. Remember our vibe prompt from

[06:22 - 06:26]
earlier? A night in shining armor, Vogue

[06:24 - 06:28]
magazine cover, celestial glow, fierce

[06:26 - 06:30]
overcast. I will transform this into an

[06:28 - 06:33]
instructional prompt. A knight in

[06:30 - 06:35]
shining armor poses for a magazine

[06:33 - 06:37]
cover. The knight is standing in the

[06:35 - 06:39]
middle of a wheat field. The knight is

[06:37 - 06:42]
wearing obsidian colored armor. There is

[06:39 - 06:44]
a celestial glow surrounding the night.

[06:42 - 06:46]
The night has a fierce expression. The

[06:44 - 06:48]
weather is overcast. Holy moly, check

[06:46 - 06:50]
out that difference. It's like night and

[06:48 - 06:53]
day. The instructional prompt gives us

[06:50 - 06:55]
so much more control over exactly what

[06:53 - 06:57]
shows up in our image. So, what makes

[06:55 - 06:59]
this approach so effective? Firstly,

[06:57 - 07:01]
we're using complete sentences. Instead

[06:59 - 07:03]
of just throwing comma-epparated words

[07:01 - 07:06]
at midjourney, second, each sentence

[07:03 - 07:08]
refers back to our main subject. We also

[07:06 - 07:10]
use proper nouns repeatedly instead of

[07:08 - 07:12]
pronouns like saying the night instead

[07:10 - 07:14]
of he and we get super specific about

[07:12 - 07:17]
positioning. Finally, the materials are

[07:14 - 07:19]
clearly described. This clarity helps

[07:17 - 07:21]
Midjourney understand precisely what you

[07:19 - 07:23]
want. It's like giving your GPS exact

[07:21 - 07:25]
coordinates instead of just saying

[07:23 - 07:27]
somewhere downtown. Here's another

[07:25 - 07:29]
example. A man and his dog are standing

[07:27 - 07:32]
together. The man is wearing a teal

[07:29 - 07:34]
outfit. The man is wearing yellow shoes.

[07:32 - 07:36]
The dog is wearing a yellow collar. The

[07:34 - 07:38]
background is a red brick wall. The man

[07:36 - 07:40]
is wearing yellow sunglasses. There is

[07:38 - 07:43]
an ominous animated cartoon raincloud

[07:40 - 07:45]
superimposed at the top of the frame.

[07:43 - 07:47]
Talk about specific. Getting this level

[07:45 - 07:48]
of detail with vibe prompting would be

[07:47 - 07:50]
like trying to thread a needle while

[07:48 - 07:53]
riding a roller coaster. Does it take

[07:50 - 07:55]
more effort to write prompts this way?

[07:53 - 07:57]
Absolutely. But when precision matters,

[07:55 - 08:00]
this approach delivers the goods. A pro

[07:57 - 08:02]
tip for you. The 242 formula works

[08:00 - 08:04]
brilliantly for structuring

[08:02 - 08:07]
instructional prompts in V7. What's

[08:04 - 08:09]
that, you ask? Well, it consists of two

[08:07 - 08:11]
sentences establishing subject and

[08:09 - 08:14]
setting, four sentences adding juicy

[08:11 - 08:17]
details, two sentences for atmosphere,

[08:14 - 08:19]
mood, or style. Not easy to imagine,

[08:17 - 08:21]
right? Here's how it sounds in action. 1

[08:19 - 08:23]
to two. A wizard is working in his

[08:21 - 08:26]
laboratory. The laboratory is filled

[08:23 - 08:28]
with glowing potions. 3 to six. The

[08:26 - 08:30]
wizard has a long white beard. The

[08:28 - 08:32]
wizard is wearing blue robes. A black

[08:30 - 08:35]
cat is sitting on the table. Ancient

[08:32 - 08:38]
books are scattered across the room. 7

[08:35 - 08:40]
to 8. The scene is illuminated by candle

[08:38 - 08:42]
light. The atmosphere is mysterious and

[08:40 - 08:44]
magical. Instructional prompting also

[08:42 - 08:47]
makes it a lot easier to control your

[08:44 - 08:49]
image composition. You can literally map

[08:47 - 08:51]
out where everything should go. A red

[08:49 - 08:53]
apple is on the left side of the frame.

[08:51 - 08:56]
A blue pear is on the right side of the

[08:53 - 08:58]
frame. The background is pure white.

[08:56 - 09:00]
Let's keep it real. Writing prompts this

[08:58 - 09:02]
way can feel like doing your taxes. But

[09:00 - 09:04]
the results incredible, especially when

[09:02 - 09:06]
you've got something specific in mind.

[09:04 - 09:08]
And here's the good news. You don't have

[09:06 - 09:10]
to choose between vibes and

[09:08 - 09:12]
instructions. You can have your AI cake

[09:10 - 09:14]
and eat it too. After playing with Mid

[09:12 - 09:16]
Journey for a while, I have crafted a

[09:14 - 09:18]
convenient workflow. Start with a quick

[09:16 - 09:20]
vibe prompt to get the creative juices

[09:18 - 09:21]
flowing. Then use the describe feature

[09:20 - 09:24]
on your favorite result. This is like

[09:21 - 09:25]
getting a cheat code. Dry it off by

[09:24 - 09:27]
converting those comma-epparated

[09:25 - 09:29]
descriptions into complete sentences.

[09:27 - 09:31]
Add your specific details about

[09:29 - 09:33]
positioning, materials, lighting, etc.,

[09:31 - 09:35]
and generate your final masterpiece.

[09:33 - 09:38]
This combined approach gives you the

[09:35 - 09:39]
spontaneity of vibe prompting with the

[09:38 - 09:42]
laser precision of instructional

[09:39 - 09:44]
prompting. The best of both worlds.

[09:42 - 09:46]
Remember, when in doubt, spell it out.

[09:44 - 09:48]
The more specific your instructions, the

[09:46 - 09:51]
closer midjourney gets to making your

[09:48 - 09:53]
vision a reality. And that's it. The

[09:51 - 09:55]
basics done. But of course, we are not

[09:53 - 09:56]
going to stop here. I'm turning to some

[09:55 - 09:58]
advanced techniques that help you

[09:56 - 10:01]
squeeze every ounce of creative

[09:58 - 10:03]
potential from V7. Number one, mastering

[10:01 - 10:05]
natural language structure. Midjourney

[10:03 - 10:08]
V7 loves natural language, proper

[10:05 - 10:10]
grammar, punctuation, the whole English

[10:08 - 10:12]
class package. Unlike earlier versions

[10:10 - 10:15]
that worked with keyword soup, V7

[10:12 - 10:16]
thrives on well ststructured sentences.

[10:15 - 10:18]
If you want to jump straight to

[10:16 - 10:20]
instructional prompts, but feel like the

[10:18 - 10:22]
242 formula is too complex, this

[10:20 - 10:24]
shortcut is for you. Start with a clear

[10:22 - 10:26]
subject and action. Add specific

[10:24 - 10:28]
sentences about location and

[10:26 - 10:31]
environment. Finish with style details

[10:28 - 10:33]
like this. A Jedi Knight lightsaber in

[10:31 - 10:36]
hand standing on the edge of a starship.

[10:33 - 10:37]
A galaxy of stars and distant planets

[10:36 - 10:40]
fills the background. The image is in

[10:37 - 10:42]
the style of epic space fantasy with

[10:40 - 10:43]
striking lighting and a sense of heroic

[10:42 - 10:46]
grandeur. This structure helps

[10:43 - 10:48]
Midjourney process each sentence as its

[10:46 - 10:50]
own unit, creating clearer boundaries

[10:48 - 10:53]
between concepts. It's like giving the

[10:50 - 10:55]
AI clean, organized instructions instead

[10:53 - 10:57]
of throwing everything into a blender.

[10:55 - 11:00]
Remember, while V7 can handle longer

[10:57 - 11:03]
prompts than V6, clarity still rules the

[11:00 - 11:05]
roost. Unless you use my open-ended

[11:03 - 11:07]
prompting method to get all creative,

[11:05 - 11:10]
you might want to be specific. For

[11:07 - 11:12]
example, ask for 1970s animated cartoon

[11:10 - 11:14]
style instead of cartoon style because

[11:12 - 11:17]
there are tons of different cartoon

[11:14 - 11:19]
styles. Number two, leveraging V7's

[11:17 - 11:21]
improved understanding. You probably

[11:19 - 11:25]
noticed how V7 has done a good job with

[11:21 - 11:26]
the 1970s cartoon style. Yes, MidJourney

[11:25 - 11:29]
seriously stepped up its game in

[11:26 - 11:30]
understanding different styles, artists,

[11:29 - 11:32]
expressions, and composition

[11:30 - 11:34]
terminology. This means we can now be

[11:32 - 11:36]
much more direct with our prompts and

[11:34 - 11:39]
get dramatically better results compared

[11:36 - 11:41]
to what we could achieve in V6. When I

[11:39 - 11:43]
test prompts across both versions, the

[11:41 - 11:46]
differences are sometimes striking. For

[11:43 - 11:49]
instance, when I prompt for CCTV footage

[11:46 - 11:51]
in V6, I mostly get images of the actual

[11:49 - 11:53]
security cameras themselves. Not very

[11:51 - 11:56]
useful if you're trying to create

[11:53 - 11:58]
surveillance style imagery, but V7

[11:56 - 12:00]
understands what we want here. It shows

[11:58 - 12:02]
the footage itself rather than just the

[12:00 - 12:05]
camera equipment. Diesel Punk is another

[12:02 - 12:07]
great example. V7 creates images that

[12:05 - 12:09]
are much more accurate and true to this

[12:07 - 12:11]
distinctive aesthetic. Actually, a

[12:09 - 12:14]
fellow MidJourney user pointed this out

[12:11 - 12:16]
on Reddit. Thanks for that insight. I've

[12:14 - 12:19]
been testing V7 with styles from artists

[12:16 - 12:21]
like Henri Rouso's Naive Art Approach, a

[12:19 - 12:23]
personal favorite of mine. The

[12:21 - 12:25]
difference is pretty remarkable. As you

[12:23 - 12:27]
see here, V7 absolutely nails those

[12:25 - 12:29]
signature color palettes and childlike

[12:27 - 12:32]
qualities that make naive art so

[12:29 - 12:33]
distinctive. It gets what makes the

[12:32 - 12:36]
style unique instead of just

[12:33 - 12:38]
approximating it. This opens up so many

[12:36 - 12:40]
creative doors for exploring artistic

[12:38 - 12:42]
influences beyond the mainstream.

[12:40 - 12:45]
Getting full body shots has become much

[12:42 - 12:47]
easier in V72. Now you can include full

[12:45 - 12:49]
body in your prompt and it works

[12:47 - 12:51]
beautifully even with wide aspect

[12:49 - 12:53]
ratios. That approach occasionally

[12:51 - 12:55]
misses the mark, but adding clothing

[12:53 - 12:57]
descriptions mentioning shoes or simply

[12:55 - 12:59]
saying standing on the ground helps

[12:57 - 13:02]
tremendously. For those portrait shots

[12:59 - 13:04]
from the hips up, try including 2/3

[13:02 - 13:06]
body. This is less stable than full

[13:04 - 13:08]
body. As you can see, the third image

[13:06 - 13:10]
totally misses the point. Still, we do

[13:08 - 13:12]
get beautiful shots like this one and

[13:10 - 13:15]
this one. Number three, breaking down

[13:12 - 13:17]
complex compositions. One game-changing

[13:15 - 13:19]
approach is breaking compositions into

[13:17 - 13:21]
sections or layers. This works well for

[13:19 - 13:23]
complex scene setups. Let me show you

[13:21 - 13:25]
what I mean with the classic

[13:23 - 13:27]
over-the-shoulder shot. When I typed

[13:25 - 13:28]
over-the-shoulder shot in my prompts, I

[13:27 - 13:30]
didn't get what I want because

[13:28 - 13:32]
MidJourney interprets this term in

[13:30 - 13:34]
multiple ways. So, I started breaking

[13:32 - 13:37]
down what makes this shot work visually.

[13:34 - 13:39]
A gorgeous woman with blonde hair is on

[13:37 - 13:41]
the right side of the frame. She has a

[13:39 - 13:43]
serious expression on her face. A person

[13:41 - 13:44]
is standing on the left side in the

[13:43 - 13:47]
foreground. Only the back of the

[13:44 - 13:49]
person's head and shoulders are visible.

[13:47 - 13:51]
The results were incredible by

[13:49 - 13:53]
describing each element's position and

[13:51 - 13:55]
characteristics separately. Midjourney

[13:53 - 13:57]
finally understood what I wanted. This

[13:55 - 13:59]
approach works well for both wide and

[13:57 - 14:02]
tall aspect ratios, giving you

[13:59 - 14:04]
consistent compositions regardless of

[14:02 - 14:06]
your canvas dimensions. This layering

[14:04 - 14:07]
technique opens up some creative

[14:06 - 14:09]
possibilities. I've been experimenting

[14:07 - 14:12]
with double exposure effects by

[14:09 - 14:14]
explicitly describing bottom and top

[14:12 - 14:16]
layers. A layered double exposure style

[14:14 - 14:18]
image where the bottom layer is a

[14:16 - 14:21]
close-up portrait of a man with green

[14:18 - 14:24]
eyes. The top layer is a cityscape at

[14:21 - 14:26]
night with neon lights. The top layer is

[14:24 - 14:28]
50% transparent. When working with

[14:26 - 14:30]
multiple characters, mapping out

[14:28 - 14:32]
everyone's position rather than just

[14:30 - 14:34]
saying two people talking gives you much

[14:32 - 14:36]
more control. It's like being a film

[14:34 - 14:39]
director setting up each shot. Number

[14:36 - 14:41]
four, using Style Raw for maximum prompt

[14:39 - 14:42]
control. Normally, MidJourney tries to

[14:41 - 14:44]
make everything look beautiful,

[14:42 - 14:47]
sometimes at the expense of following

[14:44 - 14:49]
your prompt. Style Raw tips that balance

[14:47 - 14:51]
toward precision. I ran a series of

[14:49 - 14:53]
comparison tests using identical prompts

[14:51 - 14:56]
with and without Style Raw. The

[14:53 - 14:58]
differences were striking. The style raw

[14:56 - 15:00]
versions follow instructions much more

[14:58 - 15:02]
literally, while standard versions have

[15:00 - 15:04]
that signature midjourney aesthetic

[15:02 - 15:06]
baked in. If you're hitting roadblocks

[15:04 - 15:08]
with a prompt that won't generate what

[15:06 - 15:11]
you need, adding style raw can be the

[15:08 - 15:13]
breakthrough you've been looking for. I

[15:11 - 15:16]
recommend testing it alongside lower

[15:13 - 15:18]
stylized values. Try 50 to 100. Turning

[15:16 - 15:21]
off personalization temporarily,

[15:18 - 15:23]
simplifying your prompt to essentials.

[15:21 - 15:25]
The combinations can yield surprisingly

[15:23 - 15:27]
different results. It's worth

[15:25 - 15:29]
experimenting to find the perfect

[15:27 - 15:32]
balance for your specific vision. Number

[15:29 - 15:35]
five, tapping into V7's multilingual

[15:32 - 15:36]
superpowers. V7 understands prompts in

[15:35 - 15:38]
different languages. But it doesn't stop

[15:36 - 15:41]
there. The most fascinating thing is how

[15:38 - 15:43]
the model tailors the visual results to

[15:41 - 15:45]
reflect cultural backgrounds associated

[15:43 - 15:47]
with those languages. Unbelievable,

[15:45 - 15:49]
right? Emma showing you. We got a simple

[15:47 - 15:52]
English prompt, a photo of a smiling

[15:49 - 15:54]
woman wearing a red shirt. Then I used

[15:52 - 15:57]
Google Translate to convert this prompt

[15:54 - 15:59]
into several different languages, making

[15:57 - 16:02]
sure to use the same seed number across

[15:59 - 16:05]
all versions to maintain a fair

[16:02 - 16:07]
comparison. The results blew me away.

[16:05 - 16:08]
Each language produced images that

[16:07 - 16:10]
subtly reflected cultural

[16:08 - 16:13]
characteristics of regions where that

[16:10 - 16:15]
language is commonly spoken. It wasn't

[16:13 - 16:18]
just different faces. The styling,

[16:15 - 16:20]
environments, and overall aesthetic

[16:18 - 16:22]
shifted in culturally relevant ways.

[16:20 - 16:24]
This technique has become my go-to

[16:22 - 16:26]
approach when I need authentic

[16:24 - 16:29]
representation in my images. I've been

[16:26 - 16:31]
especially impressed with Japanese

[16:29 - 16:33]
prompts for anime inspired characters,

[16:31 - 16:35]
Italian for Mediterranean scenes and

[16:33 - 16:38]
aesthetics, Hindi for more authentic

[16:35 - 16:40]
South Asian representation. Number six,

[16:38 - 16:42]
revealing your personalization's true

[16:40 - 16:44]
colors. Your personalization code makes

[16:42 - 16:47]
all your prompts look better and more

[16:44 - 16:49]
tailored to your taste. But do you know

[16:47 - 16:51]
exactly how it affects your images?

[16:49 - 16:54]
Let's crack that mystery with

[16:51 - 16:56]
permutation prompts. Permutation prompts

[16:54 - 16:58]
use curly brackets and comma-epparated

[16:56 - 17:00]
options to run multiple prompts

[16:58 - 17:02]
simultaneously. Now you can directly

[17:00 - 17:04]
compare how your personalization affects

[17:02 - 17:06]
different subjects. Maybe it adds

[17:04 - 17:09]
certain colors or textures. Or perhaps

[17:06 - 17:11]
it emphasizes specific compositional

[17:09 - 17:13]
elements. Perhaps this will work for you

[17:11 - 17:16]
as it works for me. When picking between

[17:13 - 17:18]
image pairs in the personalized tab,

[17:16 - 17:21]
don't choose what's objectively better.

[17:18 - 17:22]
Pick what you genuinely like more. I

[17:21 - 17:24]
look at one image, then the other

[17:22 - 17:26]
without looking back at the first to

[17:24 - 17:29]
decide which one resonates with my

[17:26 - 17:31]
personal taste. Number seven, maximizing

[17:29 - 17:33]
style reference in V7. The style

[17:31 - 17:35]
reference feature in V7 is still

[17:33 - 17:38]
evolving, but I found some effective

[17:35 - 17:40]
workarounds for using V6 SRF codes in

[17:38 - 17:42]
the new model. You can try three

[17:40 - 17:44]
approaches that consistently improve

[17:42 - 17:46]
results. First, try increasing your

[17:44 - 17:48]
stylized value. This might seem

[17:46 - 17:50]
counterintuitive since it can

[17:48 - 17:52]
potentially reduce prompt adherence, but

[17:50 - 17:54]
I found it often creates more visually

[17:52 - 17:56]
cohesive images when working with style

[17:54 - 17:59]
references. The higher stylized value

[17:56 - 18:01]
seems to help V7 better interpret and

[17:59 - 18:04]
apply the reference styles. Second,

[18:01 - 18:06]
incorporate your V7 personalization code

[18:04 - 18:08]
alongside your style references. This

[18:06 - 18:10]
combination helps maintain your

[18:08 - 18:12]
aesthetic preferences while still

[18:10 - 18:14]
leveraging the style reference. I found

[18:12 - 18:16]
this particularly effective for

[18:14 - 18:18]
maintaining color consistency across

[18:16 - 18:20]
different prompts. My absolute favorite

[18:18 - 18:22]
approach, though, has been blending

[18:20 - 18:25]
multiple complimentary SRF codes

[18:22 - 18:27]
together. I've built up a collection of

[18:25 - 18:29]
my favorite codes, like a chef horde

[18:27 - 18:31]
secret recipes, and I'm still testing

[18:29 - 18:34]
combinations from my style reference

[18:31 - 18:36]
collection. The blended results often

[18:34 - 18:38]
surpass what either reference could

[18:36 - 18:41]
achieve individually. It's like creating

[18:38 - 18:43]
your own custom artistic styles. Number

[18:41 - 18:45]
eight, speeding up your workflow with

[18:43 - 18:47]
remix and draft modes. I appreciate that

[18:45 - 18:49]
V7 introduces some seriously cool

[18:47 - 18:51]
features that can turbocharge your

[18:49 - 18:53]
workflow. Remix mode is one of them.

[18:51 - 18:55]
This mode lets you create variations on

[18:53 - 18:57]
an image while changing the prompt text

[18:55 - 18:59]
and parameters. It will be your savior

[18:57 - 19:03]
when you want to breathe new life into

[18:59 - 19:05]
your favorite V6 images using V7's

[19:03 - 19:07]
capabilities. Instead of clicking vary,

[19:05 - 19:10]
which would give you subtle variations

[19:07 - 19:12]
using the V6 model, click remix strong.

[19:10 - 19:14]
Now you can change the prompt, switch to

[19:12 - 19:16]
the V7 model, or update your

[19:14 - 19:19]
personalization code. Now, let's talk

[19:16 - 19:21]
about draft mode. Honestly, one of my

[19:19 - 19:23]
absolute favorite new features. Yeah, I

[19:21 - 19:25]
did mention it briefly, but you will

[19:23 - 19:27]
want to dig deeper. It's a lower quality

[19:25 - 19:30]
mode that's perfect for quickly testing

[19:27 - 19:32]
ideas before committing to a highquality

[19:30 - 19:34]
render. To activate it, just click the

[19:32 - 19:36]
lightning bolt icon. You can type a

[19:34 - 19:37]
prompt directly or activate

[19:36 - 19:39]
conversational mode for an even more

[19:37 - 19:41]
fascinating experience. In

[19:39 - 19:43]
conversational mode, you're giving

[19:41 - 19:45]
Midjourney commands, not prompts.

[19:43 - 19:47]
Midjourney chooses a prompt for you

[19:45 - 19:49]
based on your instructions. You can even

[19:47 - 19:52]
run multiple prompts at once. I want to

[19:49 - 19:54]
see a grumpy cat in five different

[19:52 - 19:56]
cartoon styles. Once you get an image

[19:54 - 19:58]
you like in draft mode, clicking enhance

[19:56 - 20:00]
gives you a higher quality version with

[19:58 - 20:02]
minimal variation. It's like having a

[20:00 - 20:04]
sketch phase before committing to the

[20:02 - 20:07]
final artwork. And that wraps up our

[20:04 - 20:08]
deep dive into MidJourney V7. Whether

[20:07 - 20:11]
you're exploring with open-ended

[20:08 - 20:13]
prompts, vibing with comma-epparated

[20:11 - 20:15]
phrases, or getting precise with

[20:13 - 20:18]
instructional sentences, you're now

[20:15 - 20:20]
equipped to create amazing images. Want

[20:18 - 20:23]
to try these amazing AI yourself? All

[20:20 - 20:25]
links and resources are awaiting you in

[20:23 - 20:27]
the description. If you found this video

[20:25 - 20:31]
helpful, please like and subscribe.

[20:27 - 20:31]
Thanks for watching. Bye.

## コメント

### 1. @thewebstylist (👍 0)
Just SO disappointed in the over hyped Omni ref. Character recreations look nothing like me. Great vid highlights

> **@Av-ai-agent** (👍 0): Totally get that — appreciate you checking it out though! Hopefully the tech keeps improving. Glad you liked the highlights at least

