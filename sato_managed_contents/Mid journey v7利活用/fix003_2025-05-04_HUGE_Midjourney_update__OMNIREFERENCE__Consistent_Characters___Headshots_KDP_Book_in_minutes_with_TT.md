# Midjourneyの大型アップデート！**Omni Reference**で一貫性のあるキャラクターやヘッドショットを作成、**Tangent Templates**で数分で書籍を出版

## 概要
Midjourney V7に待望の大型アップデート、**Omni Reference**が登場しました。これは従来のキャラクター参照を改良した機能で、人物やキャラクター、オブジェクトの一貫性を高めることができます。特に人物のヘッドショットやキャラクターの継続性に威力を発揮します。新パラメーター**Omni Reference Weight (ow)**で参照画像の強調度を調整可能。この機能を活用し、**ChatGPT**でキャプション、Midjourneyで画像を準備し、**Tangent Templates**のPicturebookとTT Turbo機能を使うことで、数分で絵本を作成するワークフローも紹介されています。

## 主要なポイント
- Midjourney V7の**Omni Reference**は、人物やキャラクター、オブジェクトの一貫性を保持するための強力な機能です。
- **Omni Reference Weight (ow)** パラメーター（0〜1000）で、参照画像の影響度を細かく調整できます。
- 個人の写真からリアルなヘッドショットや様々なスタイルの画像を簡単に生成できます。
- 複数のキャラクターが登場するシーンでも、ある程度の一貫性を保つことが可能になりました。
- **Midjourney**で生成した画像と**ChatGPT**で作成したキャプションを使い、**Tangent Templates**のツールで迅速に書籍を作成する手順が解説されています。

## 詳細内容
### Midjourney V7の**Omni Reference**機能 [00:00:00]
Midjourney V7の最新アップデートとして、待望の**Omni Reference**機能がリリースされました。これは以前のキャラクター参照機能の改良版であり、人間、非人間キャラクター、オブジェクトなど、あらゆる要素の一貫性を高めるために使用できます。特に人物のヘッドショットや、様々な状況でのキャラクターの維持に非常に効果的です。オブジェクトに対する効果はまだ改善の余地があるとのことです。(Katharyne [00:00:00])

#### **Omni Reference Weight (ow)** パラメーター [00:41:16]
**Omni Reference**の重要な要素として、**Omni Reference Weight (ow)** パラメーターがあります。これは0から1000までの数値で指定でき、デフォルト値は100です。この数値が高いほど、生成される画像が参照画像に強く影響され、似たものになります。低い場合はプロンプトの記述がより重視されます。Midjourneyは通常400以上を推奨しないとしていますが、話者の経験では、自身のような顔立ち（一般的基準から少し外れる場合）では200〜300、場合によっては600〜800といった高い数値でないと、参照画像に似た画像が生成されにくいと感じています。顔を似せたい場合は、より高いow値が有効です。(Katharyne [00:41:16])

#### 人物写真での活用例 [01:15:15]
自身の写真を使って、プロンプトと**Omni Reference Weight**を調整することで、様々なスタイルのヘッドショットや全身画像を生成するデモンストレーションが行われました。TEDスピーカー風、華やかなドレス姿、アニメ風など、多様なシーンやスタイルでの自身の画像を、元の写真の顔立ちを保ちながら生成できる様子が示されました。プロンプトに年齢や「young」「pretty」「smooth skin」などの記述を加えることで、生成結果を調整するテクニックも紹介されています。最も良い結果を得るには、参照画像として最も質の良い自身の写真を使用することが推奨されます。また、生成されたAI画像をさらに参照画像として使う（AI画像の再利用）と、不自然さや「プラスチックのような」見た目になりやすい可能性があるという経験談も共有されました。(Katharyne [01:15:15])

#### Midjourneyへの感謝 [11:17:21]
Midjourneyは話者と提携関係にありませんが、話者をトップユーザーの一人として認識し、美しい作品集を献本してくれたことへの感謝が述べられました。話者はMidjourneyを強く信頼しており、その継続的な開発努力と将来の展望に期待を寄せています。(Katharyne [11:17:21])

### キャラクターの一貫性 [12:14:18]
**Omni Reference**は人間以外のキャラクターにも有効です。可愛らしいカモメのキャラクターを例に、そのキャラクターを維持したまま様々な状況（車を運転する、スーパーマーケットにいる、椅子に座っているなど）で画像を生成するデモンストレーションが行われました。ow値を高くするとキャラクターの特徴が強く出ますが、プロンプトの指示（例: 車に乗っている）よりも参照画像のポーズに引っ張られる場合があるため、詳細なプロンプト記述が重要になることが示唆されました。(Katharyne [12:14:18])

#### 実験的パラメーター`--exp` [12:29:27]
新しい実験的パラメーター`--exp`についても簡単に触れられました。これは画像の美学を向上させるためのパラメーターであり、0から100までの数値で指定できます。(Katharyne [12:29:27])

#### 複数のキャラクターの継続性 [16:11:15]
**Omni Reference**の特にエキサイティングな可能性として、複数のキャラクターの一貫性が挙げられます。参照画像に二人以上のキャラクターがいる場合、または複数のキャラクターの参照画像を組み合わせることで、それらのキャラクターを維持したまま新しいシーンを作成できる可能性があります。Midjourney自身はまだ「やや未テスト」としていますが、既に一貫性のある二人のキャラクター（同じ靴、リュックサックなど）が登場する画像が生成できる例が示されました。(Katharyne [16:11:15])

### **Omni Reference**を活用した書籍作成ワークフロー [16:50:07]
この一貫性機能を活用することで、ストーリーブックの作成が非常に容易になります。話者が提供する子供向け書籍作成の無料コース「Alphabet」と、その中で推奨される**Tangent Templates**のPicturebookおよびTT Turbo機能を使った書籍作成ワークフローが紹介されました。(Katharyne [16:50:07])

#### 無料コース「Alphabet」と**Tangent Templates**の紹介 [16:53:53]
子供向け書籍作成の無料コース「Alphabet」では、書籍作成を支援するGPTも提供されており、ストーリー作成に役立ちます。また、書籍の迅速な作成には**Tangent Templates**が推奨されます。特にPicturebook機能とTT Turbo機能は、このプロセスを大幅に効率化します。(Katharyne [16:53:53])

#### 書籍作成デモンストレーション [17:30:34]
実際の書籍作成手順として、以下のステップがデモンストレーションされました。
1.  **ChatGPT**に画像リスト（Midjourneyで作成済み、アップスケール推奨）を渡し、それに基づいたキャプションを作成してもらう。キャプションはTT Turboで読み込めるよう、CSV形式（コンマ区切り）で出力させると便利です。(Katharyne [17:37:42])
2.  **Tangent Templates**のデザイナーで書籍のサイズ（例: 7x10インチ）を設定し、出血（Bleed）を「はい」に設定する。Midjourneyでの画像生成時に、書籍の縦横比（例: `--ar 7:10`）に合わせて画像を準備しておくのが理想的です。(Katharyne [18:18:24])
3.  準備した画像を**Tangent Templates**にアップロードし、Picturebook機能を使ってページに配置する。画像は自動的に右ページ（または左ページ）に配置され、間に空白ページが挿入されます。(Katharyne [20:15:12])
4.  空白ページに dedicaton などの前書きを追加します。(Katharyne [21:33:31])
5.  TT Turbo機能を開き、**ChatGPT**からコピーしたキャプションのCSVデータをリストとして貼り付ける。データが正しく読み込まれたことを確認し、このキャプションを空白ページ（右側のみなど）に自動的に挿入するように設定します。(Katharyne [21:58:03])
6.  設定を実行すると、キャプションが書籍全体に自動的に配置されます。フォントサイズや位置を調整し、必要に応じて装飾（小さな画像など）を追加することも可能です。(Katharyne [23:10:55])
この手順により、Midjourneyで生成した画像と**ChatGPT**で作成したストーリーを使って、非常に迅速に書籍の内部ページを作成できることが示されました。(Katharyne [24:43:49])
書籍カバーの作成には、Midjourneyでカバー画像を生成し、**ChatGPT**でタイトルなどのテキストを作成・配置する方法も紹介されました。(Katharyne [24:58:02])

## 結論
Midjourneyの**Omni Reference**アップデートは、一貫性のある画像生成、特に人物やキャラクターの再現において大きな進歩をもたらしました。**Omni Reference Weight**パラメーターの調整や詳細なプロンプトの使用、質の高い参照画像の選択が成功の鍵となります。この機能を**ChatGPT**や**Tangent Templates**のようなツールと組み合わせることで、個人でも短時間でプロフェッショナルな書籍（特に絵本）を作成することが可能になりました。Midjourney V7の高速モードなど、今後のアップデートにも期待が寄せられています。視聴者には、Facebookグループへの参加や、動画への高評価・チャンネル登録が推奨されています。(Katharyne [25:26:31])

---

# HUGE Midjourney update! OMNIREFERENCE! Consistent Characters & Headshots.KDP Book in minutes with TT

**チャンネル:** Katharyne Shelton - Tangent Templates - AI & KDP
**公開日:** 2025-05-03
**URL:** https://www.youtube.com/watch?v=b9nTU4hFvSg

## 説明

WOW!  Midjourney have been teasing us with the Omni-Reference update forever.  Now it's finally here and it feels like Christmas! 

0:00:00 Omni Reference
0:12:13 Characters
0:16:03 Human Character
0:17:31 A book in minutes


Omni-reference replaces character references and it works like a charm. 

Now you can create stunning headshots with no faceswapping required.  AND YES!  You can make consistent characters, even with two separate characters in a scene!  

And watch how easy it is to create a gorgeous children's book in a few minutes with TT Turbo and Picturebook features in Tangent Templates!

#### Links

AlphaBet free course for creating children's books
https://alphabet.tangent.rocks

Tangent Templates:
https://templates.tangent.rocks/

Book Cover Tutorial
https://youtu.be/Rb7nfklPzhc

Imagine Coloring Book Course with Tangent Crystal:
https://imagine.tangent.rocks/

My Style Reference Book (Free)
https://katharyne.gumroad.com/l/midjourneyrefs

Join our Facebook groups!
AI Adventure for ChatGPT, Midjourney & AI: https://facebook.com/groups/AIAdventure

KDP Self Publishing: 
https://facebook.com/groups/amazoncreatespace

## 字幕

[00:00 - 00:06]
Hey guys, how are you doing? It&#39;s

[00:03 - 00:09]
Katherine and I have some really

[00:06 - 00:12]
exciting midJourney news. They have been

[00:09 - 00:16]
releasing update after update since V7

[00:12 - 00:18]
came out a few weeks ago, but today they

[00:16 - 00:21]
made the update that we have all been

[00:18 - 00:25]
waiting for. Omni reference. Omni

[00:21 - 00:27]
reference is V7&#39;s answer to character

[00:25 - 00:30]
references. So, it&#39;s a much better

[00:27 - 00:33]
version of character references. It can

[00:30 - 00:36]
create head shot for you. It can create

[00:33 - 00:39]
consistent characters. It can create

[00:36 - 00:41]
anime versions of you and so on. It is

[00:39 - 00:44]
really awesome. And it&#39;s called Omni

[00:41 - 00:46]
Reference because now it applies to

[00:44 - 00:50]
everything. It applies to humans,

[00:46 - 00:52]
nonhuman characters, and also objects.

[00:50 - 00:54]
Now, I&#39;m finding at the moment objects

[00:52 - 00:57]
don&#39;t work quite as well as I wish they

[00:54 - 00:59]
would. So, as I say, I&#39;m going to focus

[00:57 - 01:01]
more on people for now, but I have a

[00:59 - 01:04]
feeling they&#39;re working on it, and I

[01:01 - 01:06]
will be posting updates either here or

[01:04 - 01:09]
in my Facebook group when I see some

[01:06 - 01:10]
improvement in those or perhaps when I

[01:09 - 01:13]
figure out how to use it better. It

[01:10 - 01:15]
could be a user error on my end, but we

[01:13 - 01:18]
will see. In the meantime, let&#39;s talk

[01:15 - 01:20]
about people because I think this is

[01:18 - 01:22]
awesome. I am absolutely blown away by

[01:20 - 01:25]
what it can do. And I think this is

[01:22 - 01:27]
where there is huge value in omni

[01:25 - 01:29]
reference because you can use this for

[01:27 - 01:31]
things like head shots. That&#39;s me

[01:29 - 01:33]
looking glamorous apparently in a

[01:31 - 01:35]
bathroom. I&#39;m not quite sure why. And

[01:33 - 01:37]
there&#39;s another one. I look like I&#39;m in

[01:35 - 01:41]
an elevator perhaps. Me in my very

[01:37 - 01:45]
attractive Chanel dress looking slaying

[01:41 - 01:48]
there. Absolutely. Red

[01:45 - 01:50]
dress. None of these images are real.

[01:48 - 01:52]
These are all created with omni

[01:50 - 01:54]
reference. And I did Isaac&#39;s TED talk. I

[01:52 - 01:56]
thought this was rather fabulous. I feel

[01:54 - 01:59]
like Isaac should really do a TED talk.

[01:56 - 02:02]
And these actually blew me away. And I

[01:59 - 02:04]
felt so bad because I posted these on

[02:02 - 02:06]
Facebook and said, &quot;Nice TED talk,

[02:04 - 02:08]
Isaac.&quot; And everyone started liking

[02:06 - 02:11]
them. So I was like, &quot;Oh, I better say

[02:08 - 02:13]
that these aren&#39;t real.&quot; Because I think

[02:11 - 02:16]
they looked so convincing that a lot of

[02:13 - 02:19]
people were like, &quot;Wow, Isaac did a TED

[02:16 - 02:22]
talk. I never knew.&quot; And all I did, I

[02:19 - 02:24]
gave it this picture of Isaac that I

[02:22 - 02:26]
chopped out. So that was the starter

[02:24 - 02:29]
picture. And I gave it this prompt. I

[02:26 - 02:32]
said 30-year-old motivational speaker in

[02:29 - 02:35]
a colorful he&#39;s not 30 obviously but

[02:32 - 02:38]
what I have found and this seems to vary

[02:35 - 02:42]
depending on what you look like your

[02:38 - 02:44]
real age gender possibly race a lot of

[02:42 - 02:46]
things seem to come into this but what I

[02:44 - 02:49]
have found is that for me personally

[02:46 - 02:51]
midjourney tends to make me look old and

[02:49 - 02:53]
I guess I lost quite a bit of weight

[02:51 - 02:55]
recently because of the whole diabetes

[02:53 - 02:58]
thing so I kind of have more skin in my

[02:55 - 03:00]
face and in my neck. And I think mid

[02:58 - 03:03]
Journey really picks up on that and

[03:00 - 03:06]
tends to age me. So I tend to counter

[03:03 - 03:09]
that by cheating in the prompts and

[03:06 - 03:12]
putting things like young and pretty

[03:09 - 03:14]
30year-old. I mean this is the hyper

[03:12 - 03:16]
real world anyway, right? So it doesn&#39;t

[03:14 - 03:18]
really matter what you put in a prompt,

[03:16 - 03:21]
but it tends to help if you use your

[03:18 - 03:23]
prompt to counter things you don&#39;t like

[03:21 - 03:26]
in an image. You can also put things

[03:23 - 03:29]
like smooth skin or smooth neck, smooth

[03:26 - 03:32]
face, glowing skin, good lighting. You

[03:29 - 03:34]
can use a lot of those kind of terms in

[03:32 - 03:36]
your prompt to get better effects. So,

[03:34 - 03:39]
those are the Isaac pictures looking

[03:36 - 03:41]
great. Here&#39;s a few more of me. And you

[03:39 - 03:44]
can see there&#39;s various results. Some of

[03:41 - 03:46]
them are more convincing than others. I

[03:44 - 03:49]
like that one. I think that looks like

[03:46 - 03:51]
me. And yes, you can do anime pictures.

[03:49 - 03:54]
So, in this one, I said Gibli anime

[03:51 - 03:56]
style cartoon image character,

[03:54 - 04:00]
25year-old woman. I&#39;m really pushing it

[03:56 - 04:02]
now. Looking beautiful and powerful in a

[04:00 - 04:06]
city. This one, this is definitely one

[04:02 - 04:07]
for my politics career. Wearing a suit.

[04:06 - 04:10]
I&#39;m not sure you&#39;ll ever see me in a

[04:07 - 04:11]
suit, but there we go. That looks like

[04:10 - 04:14]
me. That&#39;s a pretty natural looking

[04:11 - 04:16]
picture of me. So here&#39;s the thing that

[04:14 - 04:19]
makes the big difference with omni

[04:16 - 04:22]
reference and it is called

[04:19 - 04:24]
omniwe and if you look at the updates

[04:22 - 04:26]
you can find the updates by pressing

[04:24 - 04:28]
this little bell down here in midjourney

[04:26 - 04:33]
and they have a parameter now that is

[04:28 - 04:36]
called omniweight or ow. So you can use

[04:33 - 04:39]
this by doing hyphen ow but actually

[04:36 - 04:42]
it&#39;s really easy to use. Omni weight is

[04:39 - 04:46]
just a number that goes from 0 to a

[04:42 - 04:49]
th00and and it defaults to 100. So let&#39;s

[04:46 - 04:51]
look at how that works. So I&#39;m going to

[04:49 - 04:53]
start with this picture of myself. It&#39;s

[04:51 - 04:55]
not the best picture in the world, but

[04:53 - 04:58]
it will do. It&#39;s fairly representative.

[04:55 - 05:00]
And what you do is you just drag that

[04:58 - 05:03]
picture. And you&#39;ll see now that the

[05:00 - 05:05]
interface when you drag an image, see if

[05:03 - 05:07]
I take that away, it goes away. When I

[05:05 - 05:09]
drag the image here, you have these

[05:07 - 05:11]
different spaces that you can drop it

[05:09 - 05:13]
into. So, the first one is image

[05:11 - 05:15]
prompts. That&#39;s the same as it used to

[05:13 - 05:18]
be that it will create something that

[05:15 - 05:19]
looks like this image. It has style

[05:18 - 05:22]
references. If you just want to change

[05:19 - 05:23]
the style of an image. So, for example,

[05:22 - 05:25]
if you wanted to create watercolor

[05:23 - 05:28]
pictures, you would drop a watercolor

[05:25 - 05:30]
picture into the style reference. Or if

[05:28 - 05:32]
you want to create like street art, you

[05:30 - 05:34]
would probably drop a picture of

[05:32 - 05:36]
graffiti into the star reference. Oh,

[05:34 - 05:38]
and there&#39;s also this panel at the

[05:36 - 05:40]
bottom which says drop image to

[05:38 - 05:42]
describe. If you drop your image in

[05:40 - 05:45]
there, it will give you four

[05:42 - 05:48]
descriptions of the image. So, it will

[05:45 - 05:50]
basically reverse engineer the image and

[05:48 - 05:52]
tell you what you would prompt if you

[05:50 - 05:55]
wanted to create that image. So, that&#39;s

[05:52 - 05:57]
what the bottom panel is for. So, yeah,

[05:55 - 06:00]
you&#39;ve got four places you can drop your

[05:57 - 06:03]
image. Image prompts, starre, omni

[06:00 - 06:05]
reference, and the describe panel. So,

[06:03 - 06:08]
we&#39;re going to drop this into omni

[06:05 - 06:10]
reference. And it takes a moment. And

[06:08 - 06:13]
what you will see is this little red

[06:10 - 06:16]
bar, and you&#39;re going to click this. And

[06:13 - 06:17]
it says omni strength. I love that. It

[06:16 - 06:18]
sounds like something in a Saturday

[06:17 - 06:21]
morning cartoon, right? When you&#39;re

[06:18 - 06:25]
like, go, go, go. Omni strength. Now,

[06:21 - 06:26]
midjourney defaults to 100. So, if you

[06:25 - 06:29]
don&#39;t select anything here and you just

[06:26 - 06:32]
drop in an image, it will give you omni

[06:29 - 06:35]
strength 100. Now what omnire strength

[06:32 - 06:37]
is is basically how much weight this

[06:35 - 06:42]
image has on the picture. So if you go

[06:37 - 06:44]
down to say 25 or 10, the image isn&#39;t

[06:42 - 06:46]
going to be very strong in the picture.

[06:44 - 06:49]
So it will look more at the prompt that

[06:46 - 06:51]
you give it and less at this image that

[06:49 - 06:54]
you&#39;ve given it as a reference. If you

[06:51 - 06:57]
start turning this up to 200, 300, and

[06:54 - 07:00]
even more, the picture that you get back

[06:57 - 07:02]
will look more like the picture you gave

[07:00 - 07:04]
it. So, in the example that we&#39;re

[07:02 - 07:07]
looking at on my screen here, you can

[07:04 - 07:10]
see that the omni weight was 800, which

[07:07 - 07:12]
is really, really high. So, that is why

[07:10 - 07:14]
it looks so much like me and like the

[07:12 - 07:17]
original image because I used this very,

[07:14 - 07:19]
very high omni weighting. So, it really

[07:17 - 07:22]
kept my face. It kept my hair. Even put

[07:19 - 07:24]
me in black as I am in the original

[07:22 - 07:26]
picture. Now, it&#39;s interesting because

[07:24 - 07:29]
midJourney say you shouldn&#39;t go over

[07:26 - 07:32]
omniweight 400 unless you&#39;re using very

[07:29 - 07:34]
high levels of either the stylize or the

[07:32 - 07:36]
new experimental parameter. If you don&#39;t

[07:34 - 07:38]
know what those are, don&#39;t worry about

[07:36 - 07:41]
it too much. They basically just add

[07:38 - 07:43]
styling to your image. And they&#39;re worth

[07:41 - 07:45]
a try. There&#39;s nothing particularly

[07:43 - 07:47]
complicated about them. You just put

[07:45 - 07:51]
stylize and then a number or you put

[07:47 - 07:53]
exp, which is their new experimental

[07:51 - 07:55]
aesthetic parameter. It it tries a

[07:53 - 07:57]
different aesthetic. It tries to make

[07:55 - 07:58]
your image more beautiful. So, play

[07:57 - 08:00]
around with those. You can experiment

[07:58 - 08:02]
with those, but don&#39;t worry about them

[08:00 - 08:04]
too much for the purposes of this video.

[08:02 - 08:06]
Basically, what they&#39;re saying, if

[08:04 - 08:09]
you&#39;re not using those features, you

[08:06 - 08:12]
generally don&#39;t need to go over the omni

[08:09 - 08:14]
weight of 400. However, I don&#39;t think I

[08:12 - 08:17]
agree with this because what I found is

[08:14 - 08:20]
when I used low omni weights, especially

[08:17 - 08:22]
if I went under 100, the images didn&#39;t

[08:20 - 08:25]
look like me at all. I found that I

[08:22 - 08:30]
needed to be at sort of 200, 300. I even

[08:25 - 08:32]
tried 600, 800 to get a good image that

[08:30 - 08:35]
looked like me. So, as you can see, this

[08:32 - 08:38]
one is actually Omniweight 800, which is

[08:35 - 08:41]
definitely on the high side, but I think

[08:38 - 08:43]
it actually made a pretty decent image.

[08:41 - 08:45]
So, the rule of thumb seems to be that

[08:43 - 08:48]
the closer you want your picture to be

[08:45 - 08:50]
to the original image, the higher the

[08:48 - 08:54]
omni weight you should apply. So, in

[08:50 - 08:58]
these images of Isaac, I used very high

[08:54 - 09:02]
omni weights. Again, I put 600, 500,

[08:58 - 09:04]
500. in this one of me. This was only

[09:02 - 09:07]
300, but I&#39;m not sure it looks that much

[09:04 - 09:10]
like me. This one was 600. This one was

[09:07 - 09:12]
250. So, that was kind of low. And then

[09:10 - 09:14]
these were some images that I tried

[09:12 - 09:16]
yesterday with different outfits and

[09:14 - 09:19]
different settings. So, this was only

[09:16 - 09:21]
200. It worked well. 200. I really loved

[09:19 - 09:22]
this image. I thought this was really

[09:21 - 09:25]
pretty. Now, this one I used a much

[09:22 - 09:27]
higher omni weight. So, I used 600 for

[09:25 - 09:30]
this. And I think facially this looks

[09:27 - 09:33]
quite a lot like me. And the same with

[09:30 - 09:35]
that one. So those were with 600. If

[09:33 - 09:38]
Katherine worked in a flower shop, uh, I

[09:35 - 09:41]
would have omni weight 300 there. And

[09:38 - 09:43]
that one was 600. It stays a lot closer

[09:41 - 09:46]
to the original image. You can use your

[09:43 - 09:49]
prompts to turn yourself into a rock

[09:46 - 09:51]
star, a motivational speaker, a model, a

[09:49 - 09:54]
movie star. Put yourself on the cover of

[09:51 - 09:56]
a magazine. I would definitely recommend

[09:54 - 09:58]
using the best image you have of

[09:56 - 10:01]
yourself. Another thing that&#39;s quite

[09:58 - 10:03]
helpful is using variations. So when you

[10:01 - 10:07]
click on a picture, you have this option

[10:03 - 10:09]
of very subtle and very strong. And this

[10:07 - 10:11]
is an example where I used variations.

[10:09 - 10:14]
So you can see there&#39;s four slight

[10:11 - 10:17]
variations on this picture. So if you

[10:14 - 10:19]
generate a picture that you like, try

[10:17 - 10:22]
creating some variations on that. And

[10:19 - 10:25]
one other tip that I found, I don&#39;t

[10:22 - 10:28]
think using a fake of a fake works very

[10:25 - 10:30]
well. So, I generated this image. Now,

[10:28 - 10:32]
you can tell this is a little bit AI. My

[10:30 - 10:35]
skin looks a little bit unrealistic and

[10:32 - 10:37]
a little bit airbrushed, but I thought

[10:35 - 10:39]
it was a decent picture. So, I tried

[10:37 - 10:42]
using that to create some more pictures.

[10:39 - 10:44]
And these two rows kind of show you what

[10:42 - 10:47]
happened. And I think I look a little

[10:44 - 10:49]
bit plasticky in these pictures. So, I

[10:47 - 10:51]
think it starts getting a little bit too

[10:49 - 10:54]
fake when you do that. But, who knows?

[10:51 - 10:56]
This is very new, very experimental. And

[10:54 - 10:57]
I do think that different people are

[10:56 - 11:00]
going to see different results from

[10:57 - 11:02]
this. If you have a conventionally

[11:00 - 11:04]
attractive look, you&#39;re probably not

[11:02 - 11:06]
going to need a very high omni weight.

[11:04 - 11:07]
If you have a slightly more unusual

[11:06 - 11:09]
look, you look a little bit different

[11:07 - 11:12]
from the conventional standards of

[11:09 - 11:14]
beauty, then you might want to turn that

[11:12 - 11:17]
omni weight up a little bit and see how

[11:14 - 11:19]
that looks. Oh, I did want to take a

[11:17 - 11:21]
moment to thank Midjourney. Now, I am

[11:19 - 11:23]
not an affiliate. I have no relationship

[11:21 - 11:26]
with MidJourney. I just think they&#39;re

[11:23 - 11:29]
awesome and I&#39;m a huge fan girl. But

[11:26 - 11:31]
they reached out and sent me this

[11:29 - 11:34]
fabulous book. It&#39;s a beautiful

[11:31 - 11:38]
clothbound hardcover book that is full

[11:34 - 11:40]
of gorgeous midjourney images. They said

[11:38 - 11:42]
I was one of their top users and they

[11:40 - 11:44]
reached out and sent me this book for

[11:42 - 11:47]
free which was really really kind of

[11:44 - 11:49]
them. It is a beautiful book. So thank

[11:47 - 11:51]
you midjourney. I love using the system.

[11:49 - 11:53]
It is really fabulous. You know, I

[11:51 - 11:56]
really believe in Mid Journey. I think

[11:53 - 11:58]
they&#39;ve worked really hard on this tool

[11:56 - 12:00]
since the very beginning. And while

[11:58 - 12:02]
other tools keep coming out and adding

[12:00 - 12:04]
new features, I think MidJourney is

[12:02 - 12:06]
really in it for the long haul. So, I&#39;m

[12:04 - 12:09]
very excited to see this big update and

[12:06 - 12:11]
I&#39;m really excited to see where they are

[12:09 - 12:14]
going in future because version 7 has

[12:11 - 12:16]
really, really impressed me. So, now

[12:14 - 12:18]
let&#39;s look at characters. And first, I

[12:16 - 12:21]
want to share this little chap with you.

[12:18 - 12:22]
So this was a style reference here that

[12:21 - 12:24]
I shared in my Facebook group and I

[12:22 - 12:27]
thought it was super cute. I made this

[12:24 - 12:29]
little seagull from it. So just after I

[12:27 - 12:32]
talked about this style reference,

[12:29 - 12:35]
Midenny launched their new experimental

[12:32 - 12:39]
parameter. So to use the experimental

[12:35 - 12:41]
parameter, all you do is add hyphen exp

[12:39 - 12:44]
and then a number to the end of your

[12:41 - 12:47]
prompt. And the numbers just go from 0

[12:44 - 12:49]
to 100. But what it does is maybe make

[12:47 - 12:51]
your images a little bit more

[12:49 - 12:53]
aesthetically pleasing. They haven&#39;t

[12:51 - 12:56]
said exactly what it does. It&#39;s just a

[12:53 - 12:58]
way of styling your images, but it&#39;s fun

[12:56 - 13:00]
to play with. So, I made this little

[12:58 - 13:04]
chart that just shows the different

[13:00 - 13:07]
levels of experimental parameter on your

[13:04 - 13:10]
images. So, that was the original 10 25

[13:07 - 13:13]
all the way up to 100. So, you can see

[13:10 - 13:15]
the evolution of the pictures. So, I

[13:13 - 13:17]
really like this chap here. I thought he

[13:15 - 13:20]
was so cute. So I decided to use him as

[13:17 - 13:23]
an omni reference. So what you do is

[13:20 - 13:26]
just go to use and you can click image

[13:23 - 13:28]
and then just drag it over into omni

[13:26 - 13:31]
reference there. So now you have that

[13:28 - 13:36]
image as an omni reference and then what

[13:31 - 13:40]
you can say is seagull driving a car and

[13:36 - 13:43]
you can change this parameter here. So

[13:40 - 13:45]
you can make it stronger or weaker. So,

[13:43 - 13:47]
if you want the car to be more

[13:45 - 13:49]
important, you want the prompt, the car

[13:47 - 13:52]
to be more important, I would recommend

[13:49 - 13:55]
going lower. I would recommend going to

[13:52 - 13:57]
100 to maybe 200. If you want the

[13:55 - 13:59]
seagull to be important and to be

[13:57 - 14:02]
consistent, then you probably want to

[13:59 - 14:05]
turn this higher. So, the

[14:02 - 14:07]
omniresents of this particular picture,

[14:05 - 14:09]
this particular character. And then once

[14:07 - 14:12]
you&#39;ve got that, you can just say go

[14:09 - 14:14]
submit that. And I ended up with some

[14:12 - 14:16]
really cute images. There&#39;s one. Isn&#39;t

[14:14 - 14:18]
that sweet? So that was that little

[14:16 - 14:21]
character and I just used the default

[14:18 - 14:24]
omni reference of 100. So then I went

[14:21 - 14:26]
back to my characters and I picked out

[14:24 - 14:29]
this image here. So let&#39;s take a look at

[14:26 - 14:31]
this image. So I thought this seagull

[14:29 - 14:33]
was really really cute. I loved his

[14:31 - 14:36]
wings and the fluffy look of it all and

[14:33 - 14:39]
I loved the colors. So, I used him as a

[14:36 - 14:41]
reference and I turned that omni weight,

[14:39 - 14:44]
which is like the character weight. I

[14:41 - 14:46]
turned that up to 400, which is

[14:44 - 14:48]
relatively high. And I did little

[14:46 - 14:50]
seagull driving a car. And it&#39;s

[14:48 - 14:52]
interesting because I think the omni

[14:50 - 14:55]
weight was high at 400. It didn&#39;t

[14:52 - 14:57]
actually put him in a car. And I think

[14:55 - 15:00]
that&#39;s because it was staying faithful

[14:57 - 15:03]
to the pose of the seagull. So, I tried

[15:00 - 15:06]
two things. I tried it with a lower omni

[15:03 - 15:08]
weight. And I also tried it with a more

[15:06 - 15:10]
detailed prompt. And I think that

[15:08 - 15:12]
actually the more detailed prompt helped

[15:10 - 15:15]
because now look, we&#39;ve got this little

[15:12 - 15:17]
seagull driving a car. And it&#39;s so

[15:15 - 15:20]
sweet. It says little seagull driving a

[15:17 - 15:22]
pink car sitting at the wheel wearing a

[15:20 - 15:24]
driver scarf. And these were the

[15:22 - 15:26]
results. And it actually worked at all

[15:24 - 15:29]
the different omni weights. So I did

[15:26 - 15:30]
everything from 100 and this one came

[15:29 - 15:35]
out well.

[15:30 - 15:37]
200, 400, 600. So, it actually worked at

[15:35 - 15:39]
pretty much all of the weights. I think

[15:37 - 15:41]
the difference was having a slightly

[15:39 - 15:44]
more detailed prompt for that. And then

[15:41 - 15:47]
I went through and put this seagull in

[15:44 - 15:49]
lots of different situations at the busy

[15:47 - 15:52]
grocery market buying a cake. I wanted

[15:49 - 15:53]
him to be at Whole Foods. I prompted for

[15:52 - 15:56]
Whole Foods. It didn&#39;t look like Whole

[15:53 - 15:58]
Foods, so I added a grocery picture. And

[15:56 - 16:00]
now it looks a little bit more like

[15:58 - 16:02]
Whole Foods. So, I thought that was kind

[16:00 - 16:04]
of cute and it also works well with

[16:02 - 16:07]
different poses. So, I put him in his

[16:04 - 16:09]
recliner watching television and in bed

[16:07 - 16:11]
reading a story. And I&#39;m going to show

[16:09 - 16:13]
you another example with a human

[16:11 - 16:15]
character. Now, do you notice what&#39;s

[16:13 - 16:19]
really exciting about these images?

[16:15 - 16:21]
There are two characters. So, if we go

[16:19 - 16:24]
and look at MidJourney&#39;s update, they

[16:21 - 16:26]
say it&#39;s somewhat untested, but if you

[16:24 - 16:28]
have two characters in your omni

[16:26 - 16:30]
reference image, either in the same

[16:28 - 16:33]
image or just in two images side by

[16:30 - 16:35]
side, and you refer to them both in your

[16:33 - 16:38]
prompt, it can often get those two

[16:35 - 16:39]
characters in your resulting image, too.

[16:38 - 16:42]
So, they&#39;re saying it may, it may not

[16:39 - 16:43]
work. So, if you look at these, they are

[16:42 - 16:47]
fairly consistent. and they have the

[16:43 - 16:50]
same shoes, same backpack, even riding

[16:47 - 16:53]
on a motorbike. So, what does this mean?

[16:50 - 16:55]
This means you can create a story book.

[16:53 - 16:58]
If you haven&#39;t checked it out yet, do

[16:55 - 17:00]
take a look at my free alphabet course,

[16:58 - 17:02]
which is a course on making children&#39;s

[17:00 - 17:04]
books. And it&#39;s absolutely free. You can

[17:02 - 17:06]
sign up at

[17:04 - 17:08]
alphabet.tangent.rocks. It&#39;s a full

[17:06 - 17:11]
course with a little book and a GPT to

[17:08 - 17:14]
go with it. So, it&#39;s pretty awesome. and

[17:11 - 17:16]
you can use that to create a book. We

[17:14 - 17:18]
recommend using Tangent templates to

[17:16 - 17:20]
create your book because it&#39;s super

[17:18 - 17:23]
easy. It&#39;s super fast and we have put

[17:20 - 17:26]
some special tools in there to help you

[17:23 - 17:28]
do that. Picture book and TT Turbo. So,

[17:26 - 17:30]
you can actually generate a book in a

[17:28 - 17:32]
couple of minutes. And in fact, I&#39;m

[17:30 - 17:34]
going to show you how to do that. So, I

[17:32 - 17:37]
already had some pictures generated and

[17:34 - 17:39]
I wanted to create a story for them. So,

[17:37 - 17:42]
I actually asked ChatGpt to do it for

[17:39 - 17:44]
me. I gave it a list of the images that

[17:42 - 17:47]
I had and I said, &quot;Can you just write a

[17:44 - 17:49]
story that makes sense for me?&quot; So, it

[17:47 - 17:52]
created a little story. I didn&#39;t want

[17:49 - 17:54]
that one to seven. So, I asked it to

[17:52 - 17:58]
give me the captions without those

[17:54 - 18:00]
numbers. And I asked for it in a CSV

[17:58 - 18:03]
format. So, a CSV just means

[18:00 - 18:05]
commaepparated. So, each line is

[18:03 - 18:08]
separated by a comma as you can see

[18:05 - 18:10]
there. And this is important if you&#39;re

[18:08 - 18:12]
using TT Turbo to make your book. And

[18:10 - 18:15]
I&#39;m going to show you how easy that

[18:12 - 18:18]
process is. So what you do is you go to

[18:15 - 18:20]
the tangent designer and you say

[18:18 - 18:24]
interior pages and we&#39;re going to make a

[18:20 - 18:26]
book that&#39;s 7x10. So ideally when you&#39;re

[18:24 - 18:28]
working in midjourney, what you will do

[18:26 - 18:32]
is actually prompt for a picture that&#39;s

[18:28 - 18:35]
in the aspect ratio 7x10. So you would

[18:32 - 18:36]
say which riding broomstick and you&#39;ll

[18:35 - 18:41]
give it your picture prompt and then

[18:36 - 18:44]
you&#39;ll do hyphen AR7 to 10 and that will

[18:41 - 18:47]
give you the ratio 7 to 10 which will

[18:44 - 18:49]
fit perfectly into these pages. And then

[18:47 - 18:51]
we&#39;re going to say yes to bleed because

[18:49 - 18:53]
our images are going to go all the way

[18:51 - 18:55]
to the edge of the page. And there&#39;s a

[18:53 - 18:58]
little image reference here to remind

[18:55 - 19:00]
you. So, if you say no to bleed, it

[18:58 - 19:02]
expects you to leave a white space

[19:00 - 19:05]
around the edge of your content. If you

[19:02 - 19:07]
say yes to bleed, it expects the images

[19:05 - 19:09]
to go all the way to the edges. So,

[19:07 - 19:13]
we&#39;re going to say yes to bleed. And our

[19:09 - 19:15]
book is under 151 pages. So, we&#39;ll say

[19:13 - 19:18]
begin. And first, we&#39;re going to add our

[19:15 - 19:22]
images. So, we&#39;re going to go to

[19:18 - 19:24]
uploads and say upload images. Now, I

[19:22 - 19:26]
have a little folder that has all my

[19:24 - 19:28]
images in here.

[19:26 - 19:33]
And I&#39;ve put them in order. So I have 1

[19:28 - 19:36]
2 3 4 5 6 7. And as a reminder, upscale

[19:33 - 19:38]
your images in midjourney before you

[19:36 - 19:40]
save them because you will get much

[19:38 - 19:42]
better quality if you have upscaled

[19:40 - 19:45]
images. They will look so much better at

[19:42 - 19:48]
KDP. So we have our images there. So

[19:45 - 19:51]
just as a reminder, we did upload images

[19:48 - 19:53]
and I navigated to my witch folder. And

[19:51 - 19:56]
I&#39;m just going to select those

[19:53 - 19:59]
images and upload them to Tangent

[19:56 - 20:01]
Templates. Great. Let&#39;s put them in a

[19:59 - 20:03]
folder here. So, we can check that.

[20:01 - 20:04]
Great. We&#39;ve got all seven images there.

[20:03 - 20:06]
And of course, if you&#39;re making a full

[20:04 - 20:09]
book, you&#39;re probably going to want more

[20:06 - 20:12]
like 15 to 20 images, but this is just a

[20:09 - 20:15]
little demo. So, I&#39;m going to go back

[20:12 - 20:17]
now and we&#39;re going to go to picture

[20:15 - 20:19]
book on Tangent Template. So, you see

[20:17 - 20:21]
where it says picture book? We&#39;re just

[20:19 - 20:23]
going to click there and we&#39;re going to

[20:21 - 20:26]
select that new folder that we just

[20:23 - 20:29]
uploaded. So, it&#39;s defaulted to TT

[20:26 - 20:30]
bundles 16. You can change the name of

[20:29 - 20:33]
that. You can rename it if you want to

[20:30 - 20:35]
call it witch pictures. And I&#39;m going to

[20:33 - 20:38]
turn the margins off because I want my

[20:35 - 20:40]
pictures to fill the whole page. I don&#39;t

[20:38 - 20:41]
want them to stop at the margin. And I

[20:40 - 20:43]
don&#39;t need a background color because my

[20:41 - 20:46]
images are going to go across the whole

[20:43 - 20:47]
page. I do want blank pages because the

[20:46 - 20:49]
images are going to be on alternate

[20:47 - 20:52]
pages. So we can have the story in

[20:49 - 20:54]
between those. And I&#39;m going to select

[20:52 - 20:58]
scale to fit page. So that will make the

[20:54 - 21:00]
images big enough to fit the whole page.

[20:58 - 21:02]
And I don&#39;t want to shuffle the images.

[21:00 - 21:04]
I want them to go on in the order that

[21:02 - 21:07]
I&#39;ve set them there. So now we say

[21:04 - 21:11]
import images. And this just takes a

[21:07 - 21:11]
moment to run through that folder of

[21:13 - 21:19]
images. And bingo. Look at that. We have

[21:16 - 21:21]
the pictures on all the right- hand

[21:19 - 21:23]
pages of the book. So, it has filled

[21:21 - 21:26]
them out and it&#39;s left a blank space

[21:23 - 21:28]
between each one. Now, I actually want

[21:26 - 21:31]
the pictures on the left hand side. So,

[21:28 - 21:33]
it&#39;s easy to fix. All you do is just

[21:31 - 21:36]
delete the first page there. So, we have

[21:33 - 21:37]
page one is a blank page. And here you

[21:36 - 21:39]
can put a dedication. You can put

[21:37 - 21:42]
whatever you like in there. So, you can

[21:39 - 21:46]
be like this is dedicated

[21:42 - 21:49]
to to my family, etc. So you can put

[21:46 - 21:51]
whatever you want to on this page like

[21:49 - 21:53]
add notes, images, copyright, whatever

[21:51 - 21:56]
you want to put on there. But now we

[21:53 - 21:58]
want to fill in the rest of the book. So

[21:56 - 22:01]
what we&#39;re going to do is use a tool

[21:58 - 22:03]
called TT Turbo. So I&#39;m back in chat GPT

[22:01 - 22:06]
and we&#39;re going to copy that

[22:03 - 22:09]
commaepparated file. And if you use my

[22:06 - 22:11]
storybook GPT, which is free in

[22:09 - 22:14]
alphabet, if you use that, it will help

[22:11 - 22:16]
you write your story in this format. And

[22:14 - 22:18]
it will also give you some image ideas

[22:16 - 22:21]
as well. So you can create a story book

[22:18 - 22:25]
very very quickly using the storybook

[22:21 - 22:26]
GPT. So we go back to Tangent Templates.

[22:25 - 22:29]
I&#39;m going to go to the first page of our

[22:26 - 22:32]
story here, page three, and I&#39;m going to

[22:29 - 22:35]
open TT Turbo. And because our story

[22:32 - 22:37]
just has one field, which is one caption

[22:35 - 22:40]
for each page, I&#39;m going to do it as a

[22:37 - 22:43]
list. So I&#39;m going to say insert list,

[22:40 - 22:46]
and I&#39;m going to call it story. And I&#39;m

[22:43 - 22:48]
going to paste my list in there. So this

[22:46 - 22:50]
is super simple. You&#39;re just pasting

[22:48 - 22:53]
that commaepparated file. You&#39;re just

[22:50 - 22:56]
going to paste that from chat GPT. So we

[22:53 - 22:59]
click copy and chat GPT. Paste it

[22:56 - 23:02]
straight into TT Turbo. And then we say

[22:59 - 23:05]
enter. And you want to check here that

[23:02 - 23:07]
this data looks right. So yes, we&#39;ve got

[23:05 - 23:10]
seven captions here. So now we&#39;re going

[23:07 - 23:13]
to say continue. And what it has done,

[23:10 - 23:16]
it has pasted this field story onto the

[23:13 - 23:18]
page. So that&#39;s the title that we set

[23:16 - 23:21]
for the captions there. We called it

[23:18 - 23:23]
story. So now you can move this around

[23:21 - 23:28]
the page. So what you probably want to

[23:23 - 23:30]
do is go to the type tab and central

[23:28 - 23:33]
align that. And because the captions are

[23:30 - 23:36]
very short, I&#39;m going to put these lower

[23:33 - 23:38]
down on the page here. So I&#39;m just going

[23:36 - 23:41]
to put that there. And you can change

[23:38 - 23:43]
the font here. You can make it bigger if

[23:41 - 23:45]
it&#39;s for little kids. And you can also

[23:43 - 23:48]
put a little image or a motif here. If

[23:45 - 23:51]
we go over to TT images, uh you could

[23:48 - 23:54]
pick, for example, I don&#39;t know, a

[23:51 - 23:56]
picture of a little cupcake. Put that

[23:54 - 23:58]
down at the bottom. So, you can have fun

[23:56 - 24:00]
with this. You can add whatever you

[23:58 - 24:02]
want. So, when you&#39;re happy with your

[24:00 - 24:04]
page, you&#39;ve finished setting that up,

[24:02 - 24:06]
you&#39;re going to go and save your

[24:04 - 24:08]
project. Always a good idea to save your

[24:06 - 24:12]
project. And then we&#39;re going to go back

[24:08 - 24:14]
into TT Turbo and just check these

[24:12 - 24:17]
fields here because we just want to put

[24:14 - 24:20]
the story on the right hand side. So

[24:17 - 24:23]
we&#39;re going to say right side only. And

[24:20 - 24:25]
it says what to add fields and content

[24:23 - 24:28]
from page three. So that&#39;s going to copy

[24:25 - 24:30]
everything from page three which we just

[24:28 - 24:32]
set up and it&#39;s going to put that

[24:30 - 24:34]
through all the right sides in the book.

[24:32 - 24:37]
So let&#39;s do it.

[24:34 - 24:40]
And there it is. That looks absolutely

[24:37 - 24:43]
amazing. You see that? It has filled the

[24:40 - 24:46]
story through the book. And that is how

[24:43 - 24:49]
quickly you can build a story book using

[24:46 - 24:51]
picture book and then TT Turbo. So you

[24:49 - 24:53]
can get Chad GBT to write the captions

[24:51 - 24:56]
for you. You can get MidJourney to

[24:53 - 24:58]
create the images and boom, you are

[24:56 - 25:00]
done. And when you&#39;re ready to create

[24:58 - 25:02]
the cover, you can do that in Tangent

[25:00 - 25:05]
Templates as well. Go and watch my

[25:02 - 25:08]
video. I have a chat GPT video about

[25:05 - 25:10]
book covers and in it what I do is I use

[25:08 - 25:14]
midjourney to create the cover image and

[25:10 - 25:16]
then I make the typography in chat GPT

[25:14 - 25:19]
and add that on the top. So I find chat

[25:16 - 25:22]
GBT and MidJourney to be an amazing

[25:19 - 25:24]
combination for designing books. So I

[25:22 - 25:26]
hope you&#39;ve enjoyed watching this video.

[25:24 - 25:29]
I know we&#39;ve covered a lot of ground in

[25:26 - 25:31]
it, but I think the Omni reference is

[25:29 - 25:33]
incredibly exciting. Mid Jenny have also

[25:31 - 25:36]
just announced a new fast mode for

[25:33 - 25:39]
version 7, so images can run quickly now

[25:36 - 25:41]
and a little bit more cheaply. But I

[25:39 - 25:43]
think these are some fantastic updates

[25:41 - 25:44]
and I can&#39;t wait to see what you guys do

[25:43 - 25:46]
with them. I hope you&#39;ll share them. I

[25:44 - 25:49]
hope you come and join us in our

[25:46 - 25:52]
Facebook groups. We have one for AI and

[25:49 - 25:54]
we have one for KDP. If you&#39;ve enjoyed

[25:52 - 25:56]
watching this video, please don&#39;t forget

[25:54 - 25:59]
to like it and subscribe so you don&#39;t

[25:56 - 26:02]
miss any more updates from us. All

[25:59 - 26:02]
right, guys. Have a good one.

## コメント

### 1. @84leese (👍 3)
Thanks Katharyne! You make absorbing this tidal wave of information so much more manageable. 💜💜

> **@katharynetreasure** (👍 0): Thank you so much for watching <3

### 2. @murraymorison3924 (👍 2)
Useful review … not too rushed and clear step by step. Thank you

> **@katharynetreasure** (👍 0): Thank you for watching :)

### 3. @bosslifebeauty (👍 2)
Love all you do! Learned so much, so helpful. Tangent templates is awesome, thank you!

> **@katharynetreasure** (👍 0): Thank you so much, you just made our day 💕

### 4. @SheriDeeStudios (👍 2)
Thank you for being up todate with all the crazy updates in the space.    I love our group so much. I have been following you for awhile now and each time I think I thought I knew how to do something you showcase an even easier way to stream line my workflow.  BRAVO! Thank you!

> **@katharynetreasure** (👍 1): Aww thank you Sheri.  It’s always good to catch up with you.  I love what you’re doing with video! 💕

### 5. @Kate_Pilgrim (👍 0)
Thank you for the tutorial! ❤

> **@katharynetreasure** (👍 0): Thank you for watching, Kate! :)

### 6. @thewebstylist (👍 2)
MidJourney absolutely ages me also and too funny as I had been using ‘handsome 30 year old model’ to try to take off the 10-15 years it depressingly kept adding to my photos!

> **@katharynetreasure** (👍 2): Oh nooooo!  But yep, that’s the way to do it.  I think one thing we’re seeing with LLMs is that it’s very difficult to actually describe the nuances of a human face.  When you use the ‘describe’ feature on a person, the results are very reductive, with clumsy subjective words like ‘unattractive’  or ‘handsome’ - I think there’s opportunity for more research in this area.

### 7. @starburst62 (👍 0)
Outstanding! Thanks and congrats on getting the MJ book🎉🎉🎉

> **@katharynetreasure** (👍 1): Thank you so much for watching!  Yes, it was such a nice surprise - the book is beautiful 😊💕

### 8. @JakeBigLight (👍 0)
Katharyne, I bought your Tangent Templates a while ago and got distracted by other things, but now I have been experimenting recently with what it can do. I'm still learning, and so when you make videos like this one where you demonstrate how to use all the newer features in Designer and Builder, it is so helpful. Please keep up with your wonderful videos! And I hope you are fully and completely recovered from the health concerns at year end?

> **@katharynetreasure** (👍 1): Thank you for watching, and thank you for such a kind message!  I'm doing very well now :)

Let us know if you need any help with TT and do join our KDP group if you're on Facebook - facebook.com/groups/amazoncreatespace - Isaac's been posting tips there regularly!

### 9. @Knotfather (👍 0)
Hello Catherine, I wanted to ask you something. I was about to subscribe to MJ but stopped at one point and couldn't find an answer. When creating a design on MJ, whether it's a cover or internal content, should it be edited afterward or can I use it as is?

> **@katharynetreasure** (👍 1): You can use them as is, but we recommend upscaling the images so they are high resolution for print.  Topaz Gigapixel is amazing for this but expensive, but there’s a free alternative called Upscayl.

### 10. @Knotfather (👍 0)
Hi kathy  Just have a q , can i use free ai to creat interior 4 coloring book

> **@katharynetreasure** (👍 1): Thank you for watching!  If the terms of use of the tool you are using allow for commercial use, then you probably can.  However, quality may be an issue with some free AI tools.  If you're publishing your book on Amazon, you really want your images to look as good as possible.

