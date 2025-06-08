# Midjourney v7 Just Leveled up with Omnireference (vs Runway Reference)

## 概要
本動画では、Midjourney v7の新しい**Omnireference**機能とRunwayのReference機能を比較検証します。**Omnireference**は従来のキャラクター参照に加え、オブジェクトやスタイルなど画像全体の要素を参照できる点が特徴です。両プラットフォームで実際に画像を生成し、クリエイティブなコントロール、視覚的な一貫性、実用性について評価します。Midjourneyは静止画生成の品質が高い一方、Runwayは動画生成が可能であるというそれぞれの強みが明らかになり、理想的なワークフローについても言及されます。

## 主要なポイント
- Midjourney v7の**Omnireference**は、キャラクターだけでなく、スタイルやオブジェクトなど画像全体を参照可能になった。
- Midjourneyの**Omnireference Weight (--ow)** パラメータで参照画像の反映度を調整できる。
- RunwayのReference機能（Gen 4 Reference）は複数の参照画像をタグ付けして使用できる。
- 自身の写真を使った比較では、Midjourneyの**Omnireference**は顔の再現性に課題が見られる場合があった。
- Runwayの複数参照機能は、意図した複数の要素をうまく組み合わせられない場合があった。
- Midjourneyは静止画の品質が高いが、Runwayは動画生成が可能である点で優位性がある。
- Midjourneyで画像を生成し、Runwayで動画化するのが効果的なワークフローである。

## 詳細内容
### Midjourney v7 **Omnireference**の紹介と機能説明 [00:00:04]
チャンネル登録者向けの動画として、MichaelがMidjourney v7の新しい**Omnireference**機能とRunwayのReference機能を比較する目的を説明します。
Michael from Brainy Face [00:00:04]

#### **Omnireference**の進化 [00:00:16]
Midjourneyには以前、特定の人物やキャラクターを他のアートワークに挿入できるCharacter Reference機能と、その影響度を調整するCharacter Weight機能がありました。v7で導入された**Omnireference**は、「Omni（全て）」の名前の通り、人物だけでなくオブジェクトやスタイルなど画像全体の要素を参照できる機能です。より細かくコントロールできるようになりました。
Michael from Brainy Face [00:00:16]

#### Midjourney Webインターフェースでの操作とパラメータ [01:44:00]
MidjourneyのWebサイトを使用し、プロンプトバーへの画像ドラッグ＆ドロップによる**Omnireference**とStyle Referenceの使用方法を説明します。
パラメータ設定では、画像サイズ、Aesthetics（**Stylization**, **Weirdness**）、そして重要な**Omnireference**パネルにある**Omni Strength**（**--ow**）について解説します。**Omni Strength**は1から1000まで調整可能で、デフォルトは100、Michaelは700程度を推奨しています。また、必ずバージョン7を選択する必要があることを強調します。
Michael from Brainy Face [01:44:00]

### Midjourney v7 **Omnireference**の試用結果（初期の試行） [06:10:00]
自身の顔写真とスタイルの参照画像を組み合わせて、「ビンテージパブでエールを飲む男性」というプロンプトで画像を生成します。生成中に、過去に**ChatGPT 4o**で生成したDiet Cokeの画像や、Shaun of the Deadのキャラクター参照など、他の試行例を紹介します。これらの初期の試行では、Diet Cokeのロゴが小さくしか反映されない、自身の顔が似ていない、品質が低いといった失敗が多く、Michaelは期待外れだったと述べます。特に、自身の写真を使った生成で顔が大きく崩れたり、似ていなかったりする結果に失望を示します。
Michael from Brainy Face [06:10:00]

### Midjourney v7 **Omnireference**の試用結果（再試行と改善） [11:33:00]
最初の「ビンテージパブ」の生成結果を確認します。これはMichaelの期待を上回る良い結果でした。参照した自身の顔写真の特徴（髪型、眼鏡など）とスタイルの雰囲気がうまく組み合わされています。**Omni Reference Weight**を700、**Stylization**を550に設定したことが功を奏したようです。特に、バーの雰囲気や照明、眼鏡（ジョン・レノンのようなスタイル）などが気に入ったと述べ、この画像をアップスケールしたいと話します。別の生成結果では、Volkswagen Vanが追加されるなど、予期せぬ要素も生成されることがあります。
Michael from Brainy Face [11:33:00]

#### **Omnireference Weight**による結果の変化 [20:44:00]
Androidガールとアートスタイルの参照画像を使った別の生成例で、**Omni Reference Weight**を825に設定した結果は、画像がプラスチックのように見えたり、硬いコントラストになったりしました。そこで**Omni Reference Weight**を250に下げて再生成したところ、キャラクターとスタイルの組み合わせが改善され、赤レンガやグラフィティのテクスチャも追加されました。これは、**Omni Reference Weight**の調整が結果に大きく影響することを示しています。ただし、Midjourneyのテキスト生成は依然として課題であり、意図しないテキストが生成されることが多い点を指摘します。
Michael from Brainy Face [20:44:00]

#### Shaun of the DeadとHR Guygerスタイル参照 [25:51:00]
Shaun of the DeadのキャラクターとHR Guygerスタイルの参照画像を組み合わせて、「エイリアンの洞窟でゼノモーフに追われる男」というプロンプトで生成を試みます。Midjourneyはアーティストスタイルの参照に比較的寛容である一方、Runwayは制限があることに言及します。この試行では、HR Guyger風の雰囲気と構成は良く再現されましたが、Shaunの顔の再現性は完璧ではありませんでした。それでも構図などが素晴らしいと評価し、アップスケールしてRunwayで動画化することを考えます。
Michael from Brainy Face [25:51:00]

### Runway Reference機能の説明と試用 [13:14:00]
RunwayのGen 4 Reference機能を紹介します。Midjourneyとは異なり、Runwayでは複数の参照画像をドラッグ＆ドロップでき、それぞれに名前（タグ）を付けることができる点が特徴です。最大3つまで参照画像を登録できます。
Michael from Brainy Face [13:14:00]

#### 複数参照による試用と結果 [15:11:00]
自身の顔写真（Michael）、サイケデリックなスタイル画像（Wonderland）、カエル海賊のキャラクター画像（pirate）の3つを参照画像として使用し、「@Michaelと@pirateが不思議なサイケデリックな世界で剣で戦う」というプロンプトで画像を生成します。生成された画像は、MichaelとMichaelが戦っているような構図になり、意図したカエル海賊のキャラクターがうまく反映されませんでした。複数の参照画像を組み合わせるのが難しい場合があることを示しています。
Michael from Brainway Face [18:08:00]

#### 単一参照による試用と結果 [19:19:00]
前の試行からMichaelの参照を削除し、カエル海賊の参照のみを残して「大きな漫画風のハンドルバーの髭を生やした@pirateがサイケデリックな世界でカメラを見つめている」というプロンプトで再生成します。この試行では、カエル海賊がサイケデリックな背景の中にうまく配置され、期待に近い結果が得られました。Runwayは単一の参照画像を使う場合に、より良い結果が得られる可能性があることを示唆しています。
Michael from Brainy Face [21:40:00]

### MidjourneyとRunwayの比較とワークフロー [27:59:00]
画像生成の品質という点では、MichaelはMidjourneyの方が優れていると考えています。Runwayで生成した画像は品質がMidjourneyに劣ることが多いと述べます。
Michael from Brainy Face [28:02:00]

Runwayの最大の強みは、現時点でMidjourneyにはない動画生成機能です。RunwayのReference機能は、動画生成時にキャラクターの一貫性を保つのに役立ちます。
Michael from Brainy Face [28:20:00]

Michaelの推奨ワークフローは、Midjourneyで高品質な静止画を生成し（必要に応じてSeedとPromptを記録）、その画像をRunwayに持ってきてアニメーション化することです。
Michael from Brainy Face [28:08:00]

### その他の気づきと課題 [24:54:00]
Midjourneyのもう一つの課題として、テキスト生成の弱さを挙げます。たとえプロンプトでテキストを指示していなくても、画像中にAI生成らしい崩れたテキストがしばしば含まれてしまう点を指摘します。Midjourneyチームはこの機能を検討中ですが、現時点では優先度が低いようです。また、MidjourneyもRunwayも、アーティスト名や著作物の参照に関してはコミュニティガイドラインにより制限がかかる場合があることに言及します。
Michael from Brainy Face [24:54:00]

## 結論
Midjourney v7の**Omnireference**は、キャラクターだけでなく様々な要素を参照できる強力な機能ですが、特に人物の再現性にはまだ課題が見られます。**Omni Reference Weight**などのパラメータ調整が重要です。RunwayのReference機能は複数の参照が可能ですが、複数の要素を組み合わせるには課題があり、画像品質もMidjourneyに劣る傾向があります。しかし、Runwayは動画生成が可能である点が大きな強みです。現時点での最適な活用法は、Midjourneyで素晴らしい画像を生成し、Runwayでそれを動画にするワークフローであると考えられます。これらのツールは進化し続けており、今後も改善が期待されます。
Michael from Brainy Face [30:01:00]

---

# Midjourney v7 Just Leveled up with Omnireference (vs Runway Reference)

**チャンネル:** brainyfaceproject
**公開日:** 2025-05-05
**URL:** https://www.youtube.com/watch?v=oVTdBliB1JQ

## 説明

Midjourney v7’s new Omnireference feature is here—and it might just redefine how we approach AI image generation. In this video, I compare Midjourney’s Omnireference side-by-side with Runway's Reference feature to see how both platforms stack up when it comes to creative control, visual consistency, and real-world use cases.

You'll see:
How Omnireference works in Midjourney v7
A breakdown of Runway’s Reference tool
Pros and cons of each platform

Videos of images created using Runway (something Midjourney can't do!)

Whether you're a designer, content creator, or just exploring AI art tools, this comparison will give you a perspective on how the tools compare between the two platforms.

👉 If you enjoy this video, hit Like and Subscribe for more deep dives into the latest AI tools and creative technologies.

#Midjourney #RunwayML #Omnireference #AIArt #MidjourneyV7 #RunwayReference #AIImageGeneration #CreativeTools

## 字幕

[00:00 - 00:04]
Hi, this is Michael from Brainy Face

[00:01 - 00:07]
Project. Today I want to do a quick

[00:04 - 00:10]
video for you comparing MidJourney's new

[00:07 - 00:12]
Omni reference feature to runways

[00:10 - 00:16]
reference feature. So today's all about

[00:12 - 00:19]
reference features. And the reason why

[00:16 - 00:21]
I'm excited about this is Midjourney had

[00:19 - 00:24]
a feature called character reference.

[00:21 - 00:26]
And character reference was used to

[00:24 - 00:29]
allow you to take a person or a

[00:26 - 00:31]
character and you could insert them into

[00:29 - 00:34]
some of your other artwork. And it

[00:31 - 00:36]
worked really well. And along with that

[00:34 - 00:38]
character reference, you also had

[00:36 - 00:40]
something called character weight. So

[00:38 - 00:44]
you could essentially scale how much of

[00:40 - 00:46]
that particular individual or person you

[00:44 - 00:48]
wanted. But with MidJourney 7 having

[00:46 - 00:50]
come out, the team has been working

[00:48 - 00:53]
really hard on creating something called

[00:50 - 00:55]
omnireence. And the difference with omni

[00:53 - 00:58]
reference to character reference is omni

[00:55 - 01:01]
means everything. So it's not just about

[00:58 - 01:03]
people, it's about objects, it's about

[01:01 - 01:06]
styles. And you have a lot of granular

[01:03 - 01:09]
control now to be able to bring certain

[01:06 - 01:11]
people into your images. But along the

[01:09 - 01:14]
way, I also wanted to compare it to

[01:11 - 01:16]
runway and see how they compare against

[01:14 - 01:18]
each other as well. So, this is just

[01:16 - 01:20]
going to be a real time video. I have

[01:18 - 01:22]
been playing around with both of them,

[01:20 - 01:24]
so I didn't look like a total idiot.

[01:22 - 01:27]
I'll probably still be figuring stuff

[01:24 - 01:29]
out as I go along here in the interface.

[01:27 - 01:32]
But if you're interested in seeing a

[01:29 - 01:35]
comparison between midjourney omnireence

[01:32 - 01:37]
and runway reference, this is a good

[01:35 - 01:39]
video for you because I'm going to play

[01:37 - 01:41]
around with some images right now. So

[01:39 - 01:44]
I'll go ahead and turn off the camera so

[01:41 - 01:47]
I can focus on this here. Now in

[01:44 - 01:51]
Midjourney, I'm using the website and

[01:47 - 01:53]
the website allows you to use a prompt

[01:51 - 01:55]
bar up at the top. There are some

[01:53 - 01:58]
parameter settings that can be modified

[01:55 - 02:02]
as well. I'm not going into the Discord.

[01:58 - 02:04]
You do have the ability to use an

[02:02 - 02:07]
omniwe or it's an omni reference weight

[02:04 - 02:09]
and an omni reference in discord as

[02:07 - 02:11]
well. But just for the sake of

[02:09 - 02:13]
simplicity, I'm going to stick here to

[02:11 - 02:16]
the web interface today. And what I want

[02:13 - 02:20]
to do here is pull up a folder that has

[02:16 - 02:20]
some images in

[02:21 - 02:25]
them here in the folder. And I just

[02:23 - 02:27]
grabbed a bunch of images. These are

[02:25 - 02:29]
from a lot of the videos that I've

[02:27 - 02:31]
created here on the Brainy Face Project

[02:29 - 02:33]
channel. And I've got a head shot of me

[02:31 - 02:36]
in here. I thought it would be fun just

[02:33 - 02:37]
to start to see what I could do with a

[02:36 - 02:39]
headsh shot with me. And then I'm going

[02:37 - 02:41]
to take some of these other images that

[02:39 - 02:44]
I had used in the past and I'm going to

[02:41 - 02:45]
see what I can do with those. So, with

[02:44 - 02:49]
this up on my screen, I'm simply going

[02:45 - 02:52]
to click and drag the icon for that item

[02:49 - 02:54]
up here into the bar. Before I let go of

[02:52 - 02:56]
the mouse button, notice that as I hold

[02:54 - 02:58]
the mouse button down, I have three

[02:56 - 03:01]
different panels that appear underneath

[02:58 - 03:04]
it. I have image prompts, I have style

[03:01 - 03:05]
references, and I have omni reference.

[03:04 - 03:08]
And you can read the descriptions

[03:05 - 03:09]
underneath. You can use elements of an

[03:08 - 03:11]
image if you want to go into image

[03:09 - 03:13]
prompts, but today I'm going to be

[03:11 - 03:16]
focusing on the omni reference. I'm

[03:13 - 03:18]
going to drop the headshot of myself

[03:16 - 03:21]
onto that. And then I also have the

[03:18 - 03:23]
ability to use style references as well.

[03:21 - 03:25]
So I'm just going to open this back up

[03:23 - 03:28]
again. I'll choose I'll just grab one of

[03:25 - 03:31]
these at random. I like the way this

[03:28 - 03:34]
particular image looks. I had created

[03:31 - 03:36]
another image in in midjourney a couple

[03:34 - 03:38]
months ago and I like the look of it. So

[03:36 - 03:41]
I want to see what I can do with that.

[03:38 - 03:44]
So now I just wanted to review quickly

[03:41 - 03:46]
here a couple of parameter settings for

[03:44 - 03:49]
Omni Reference. It has its own unique

[03:46 - 03:52]
panel right up here. But if I go into

[03:49 - 03:54]
the general settings for the prompt bar,

[03:52 - 03:56]
I have the ability to go in and choose

[03:54 - 03:58]
my image size. I can also change

[03:56 - 04:01]
aesthetics. This is where I spend a lot

[03:58 - 04:02]
more of my time in modifying the way

[04:01 - 04:04]
that the image actually looks because

[04:02 - 04:06]
you have stylization where you can go in

[04:04 - 04:08]
and you can influence the aesthetic

[04:06 - 04:10]
that's applied. And as it says, low

[04:08 - 04:12]
stylization values produce images that

[04:10 - 04:15]
closely match the prompt but are less

[04:12 - 04:17]
artistic. High stylization requires that

[04:15 - 04:20]
you move the slider over in the other

[04:17 - 04:23]
direction. Now, MidJourney 7 just came

[04:20 - 04:25]
out a few weeks ago now, and when it

[04:23 - 04:27]
first came out, the weirdness setting

[04:25 - 04:29]
was not available, but you do have a

[04:27 - 04:31]
weirdness setting now. So, if you want a

[04:29 - 04:33]
little bit of quirkiness in there, you

[04:31 - 04:35]
can click and drag that slider over, and

[04:33 - 04:38]
that will apply. And then, obviously, if

[04:35 - 04:40]
you wanted to go in and choose a variety

[04:38 - 04:43]
to change your uh variations, you can do

[04:40 - 04:45]
that as well. So, I'm going to just kind

[04:43 - 04:46]
of put the slider here in the middle for

[04:45 - 04:49]
these. I'm going to leave the weirdness

[04:46 - 04:51]
down to zero. It is important to note

[04:49 - 04:55]
that for midjourney 7 that you select

[04:51 - 04:58]
this version 7 over here. If it defaults

[04:55 - 05:00]
to 6.1 for you, make sure that you

[04:58 - 05:02]
change that by clicking again on

[05:00 - 05:03]
settings and choose seven. And then I'm

[05:02 - 05:06]
just going to keep the rest of the

[05:03 - 05:08]
parameters here the same. Now, the thing

[05:06 - 05:11]
about this is with Omni Reference, you

[05:08 - 05:13]
can control control the scalability of

[05:11 - 05:15]
how much it adheres to the image that

[05:13 - 05:17]
you uploaded, but they don't put it in

[05:15 - 05:19]
the panel settings here. They just have

[05:17 - 05:21]
this little slider. It would be easy to

[05:19 - 05:23]
miss. If you move your pointer over

[05:21 - 05:25]
this, it doesn't even give me a tool tip

[05:23 - 05:28]
or a screen tip here. But if I click on

[05:25 - 05:30]
it, notice that it has omni strength.

[05:28 - 05:32]
This is configurable. You can move it

[05:30 - 05:36]
all the way from one on the left hand

[05:32 - 05:38]
side and the dial goes way past 11. If

[05:36 - 05:41]
you want to turn it up to 11, you can,

[05:38 - 05:43]
but it actually goes up to 1,000. The

[05:41 - 05:46]
default value here, notice how it locks

[05:43 - 05:49]
in at white to 100. And that's just kind

[05:46 - 05:51]
of a general adherence to the image that

[05:49 - 05:53]
you're uploading. But if you want it to

[05:51 - 05:56]
lock in, like really just give it all

[05:53 - 05:57]
the strength in the world for that, you

[05:56 - 05:59]
want to go all the way up. And I've been

[05:57 - 06:01]
playing around with this and I find that

[05:59 - 06:04]
a general setting for me of about 700 is

[06:01 - 06:06]
a good place to start. I like to start

[06:04 - 06:08]
there and then I I move the dial up or

[06:06 - 06:10]
down either direction depending on if I

[06:08 - 06:12]
want more or less. So now I've got this

[06:10 - 06:18]
style and I'm just going to say here I

[06:12 - 06:22]
want a man sitting in a uh vintage pub

[06:18 - 06:27]
drinking a pint of ale wearing

[06:22 - 06:30]
sunglasses and staring down um his brow

[06:27 - 06:33]
at the viewer. And then I just use the

[06:30 - 06:35]
prompts here. I I'm so used to using the

[06:33 - 06:37]
Discord interface. When you do a dash

[06:35 - 06:39]
dash and then AR, that indicates the

[06:37 - 06:42]
aspect ratio. And I'm just going to do

[06:39 - 06:44]
an aspect ratio of 16 to9. So that's

[06:42 - 06:46]
like a wide screen that's going to fill

[06:44 - 06:50]
up the screen. And I'm going to click

[06:46 - 06:52]
submit here. Now I will just scroll here

[06:50 - 06:54]
through here as that image is generating

[06:52 - 06:58]
and show you some of the other things

[06:54 - 07:01]
that I did. I had created a video where

[06:58 - 07:04]
I had kind of a fun product. It was a

[07:01 - 07:07]
diet coke that was I think I've got it

[07:04 - 07:09]
in here right here. Yeah.

[07:07 - 07:13]
And that was kind of fun, you know, just

[07:09 - 07:14]
to do a product uh video um or product

[07:13 - 07:18]
placement. And I used mid, not

[07:14 - 07:20]
midjourney, but I used chat gpt 40 to

[07:18 - 07:23]
create that image. And when I tried to

[07:20 - 07:25]
bring that into midjourney today, it

[07:23 - 07:28]
failed miserably. Like I had actually

[07:25 - 07:30]
brought in a character. I did a

[07:28 - 07:32]
character reference sheet for Shauna of

[07:30 - 07:34]
the Dead, one of my favorite movies, and

[07:32 - 07:37]
I had tried to bring that in along with

[07:34 - 07:39]
an HR Guyger style background after

[07:37 - 07:41]
getting slapped on the wrist saying that

[07:39 - 07:43]
it couldn't do it because of community

[07:41 - 07:45]
guideline warnings. Oh my gosh, that's

[07:43 - 07:47]
so frustrating when you go in and try to

[07:45 - 07:49]
create something cool and it stops you.

[07:47 - 07:51]
Um, I did finally get an image, but

[07:49 - 07:54]
look, it it only put in a teeny little

[07:51 - 07:56]
bit of the logo right there and the Diet

[07:54 - 07:58]
Coke. Otherwise, it went with a standard

[07:56 - 08:00]
Coke can. And so I was very underwhelmed

[07:58 - 08:02]
by that. And with a lot of the other

[08:00 - 08:05]
ones that I did, I tried to put myself

[08:02 - 08:07]
into some pictures. Everybody's talking

[08:05 - 08:09]
about how cool this is. And maybe it's

[08:07 - 08:11]
just user error on my part because I

[08:09 - 08:13]
haven't played around with it a lot yet,

[08:11 - 08:16]
but I really wasn't impressed. I mean,

[08:13 - 08:18]
my beard, I kind of look like Awan Watts

[08:16 - 08:20]
there, I guess, in that one photo. Um,

[08:18 - 08:22]
but I, you know, I was trying to bring

[08:20 - 08:24]
in kind of a graveyard graveyard image

[08:22 - 08:27]
along with a picture of me, some

[08:24 - 08:30]
guitars, and I I'm not really impressed

[08:27 - 08:32]
by any of these. The quality doesn't

[08:30 - 08:35]
look good. And remember the days when

[08:32 - 08:37]
like Dolly 2 came out and the images

[08:35 - 08:39]
looked kind of wonky. Some of the

[08:37 - 08:41]
elements look okay, but others don't.

[08:39 - 08:43]
Now, I did do some upscaling on some

[08:41 - 08:46]
other images where I'd taken other

[08:43 - 08:48]
midjourney images and combined them in

[08:46 - 08:50]
together, and these actually turned out

[08:48 - 08:52]
pretty well. So, I I did have some good

[08:50 - 08:56]
results there. Um, some of these were

[08:52 - 08:58]
actually pretty impressive. Look at um

[08:56 - 09:01]
like this one right here. Thought the

[08:58 - 09:04]
quality was really nice. And I upscaled

[09:01 - 09:07]
that. And some of these others look

[09:04 - 09:09]
good. I did have fun combining a swamp

[09:07 - 09:12]
image with an alien image that I had

[09:09 - 09:15]
created. So, I took a swamp image. Where

[09:12 - 09:17]
was that one? Um, I think it was this

[09:15 - 09:20]
one right here. I had combined that

[09:17 - 09:24]
swamp image with an alien that I had

[09:20 - 09:26]
created in my journey previously. And

[09:24 - 09:30]
so, I brought them both in. I brought in

[09:26 - 09:32]
a style and the character and I ended up

[09:30 - 09:34]
with this image. And that was really

[09:32 - 09:36]
cool. and then I actually brought it

[09:34 - 09:38]
over to runway. That's one of the

[09:36 - 09:40]
limitations with Midjourney is they

[09:38 - 09:42]
don't yet have video available during

[09:40 - 09:45]
their weekly office hours that they do

[09:42 - 09:47]
on Wednesday afternoons at 12:00 Pacific

[09:45 - 09:49]
time, 3:00 Eastern time. They've been

[09:47 - 09:52]
talking about maybe doing video, but it

[09:49 - 09:54]
would definitely be an upcharge for them

[09:52 - 09:57]
um for users to use that. So, what I

[09:54 - 09:59]
tend to do is take my images and I will

[09:57 - 10:03]
bring them over to runway and animate

[09:59 - 10:04]
them from there. And so yeah, these

[10:03 - 10:07]
images look pretty good. I got some

[10:04 - 10:09]
interesting styles by going around and

[10:07 - 10:11]
playing around with those. Uh took one

[10:09 - 10:14]
of the other characters I had created

[10:11 - 10:17]
for one of my midjourney uh version

[10:14 - 10:18]
seven videos and I had dropped that in

[10:17 - 10:20]
and that looked pretty good. Combined

[10:18 - 10:23]
that with a castle in the background.

[10:20 - 10:25]
And then I actually did uh a few of the

[10:23 - 10:27]
Shaun of the Dead. These were some of

[10:25 - 10:30]
the placements where I tried to put

[10:27 - 10:32]
myself in. These were look terrible. And

[10:30 - 10:34]
I had basically just taken a picture of

[10:32 - 10:37]
myself with my iPhone. And when I

[10:34 - 10:39]
brought that in here to MidJourney, I

[10:37 - 10:42]
was extremely disappointed in the

[10:39 - 10:44]
quality that I got. And these looked

[10:42 - 10:46]
really wonky, too. Doesn't even look

[10:44 - 10:48]
like me in some of the photos. Same

[10:46 - 10:50]
photo. Sometimes it hits, sometimes it

[10:48 - 10:53]
misses. You can see that I had my Omni

[10:50 - 10:55]
reference weight there at 640, so it was

[10:53 - 10:58]
turned up quite a bit. I did some space

[10:55 - 11:00]
images as well. There's one that looks

[10:58 - 11:03]
kind of cool and scary, but man, I look

[11:00 - 11:06]
like a freak in that image, you know? It

[11:03 - 11:08]
looks like I haven't slept in weeks, and

[11:06 - 11:11]
it just it doesn't look like me. It was

[11:08 - 11:15]
really disappointing. Um, this is when I

[11:11 - 11:18]
had the weight, the what is it? The Omni

[11:15 - 11:21]
reference weight set to 200. It doesn't

[11:18 - 11:25]
even look like me at all. And then when

[11:21 - 11:27]
I failed to do the omni weight, uh if I

[11:25 - 11:29]
I didn't even change the settings at

[11:27 - 11:30]
all. Um you can see I didn't have any

[11:29 - 11:33]
omni weight. It didn't even put me in

[11:30 - 11:35]
the image. So anyway, let's go back up

[11:33 - 11:38]
to the top and see what we've got for

[11:35 - 11:41]
that. All right. So, okay. This is

[11:38 - 11:45]
actually the first time I'm seeing this.

[11:41 - 11:45]
Um combining those two images

[11:45 - 11:50]
together, that looks actually kind of

[11:48 - 11:53]
cool. That looks a little bit more like

[11:50 - 11:56]
me. A rough and ragged version of me. I

[11:53 - 11:57]
like the hoodie. I like the bar. That's

[11:56 - 11:58]
really

[11:57 - 12:02]
cool.

[11:58 - 12:04]
Um, I said sunglasses or I think I said

[12:02 - 12:06]
Ray-B band. I didn't say what color.

[12:04 - 12:09]
Okay, this kind of nailed it actually.

[12:06 - 12:11]
I'm glad I am in here doing this live

[12:09 - 12:13]
because these results actually look

[12:11 - 12:16]
pretty good. And what did I set for my

[12:13 - 12:19]
Omni reference weight? I set 700 and I

[12:16 - 12:21]
did set the stylization up to 550. That

[12:19 - 12:24]
looks pretty good. I like the dark

[12:21 - 12:28]
lighting in there. That's good. This is

[12:24 - 12:30]
really wicked. This one, I like this. I

[12:28 - 12:32]
could actually put this as a wallpaper.

[12:30 - 12:34]
I love the John Lennin glasses there. I

[12:32 - 12:37]
didn't tell it to do that. Um, but that

[12:34 - 12:39]
looked good. And I might need to bring

[12:37 - 12:41]
this picture to my hair stylist next

[12:39 - 12:44]
time and say, "This is the do that I

[12:41 - 12:45]
want. Can you do this?" Um, so this this

[12:44 - 12:47]
is actually pretty cool. I think I'm

[12:45 - 12:49]
gonna upscale this image. I might use

[12:47 - 12:52]
that

[12:49 - 12:55]
later. Um, and then here's one it threw

[12:52 - 12:58]
in a Volkswagen van. Um, I like the

[12:55 - 13:01]
leather in the background there. Um,

[12:58 - 13:04]
that's This is actually really cool. I

[13:01 - 13:06]
think I might just go ahead and say very

[13:04 - 13:09]
strong on this one and see what kind of

[13:06 - 13:12]
results we get. All right. So,

[13:09 - 13:14]
midjourney looking pretty good. Now,

[13:12 - 13:18]
while that one is rendering out, I'm

[13:14 - 13:20]
going to jump over here to runway. And

[13:18 - 13:23]
in runway, it's a little bit different.

[13:20 - 13:26]
Now, they've got their Gen 4, which is

[13:23 - 13:28]
uh the newest generation, and they just

[13:26 - 13:30]
introduced this feature called Gen 4

[13:28 - 13:32]
reference for consistent subjects and

[13:30 - 13:36]
scenes. So, what I'm going to do here is

[13:32 - 13:39]
I'm going to go back over here to

[13:36 - 13:41]
my It's actually crazy. I'm thinking

[13:39 - 13:43]
about like the midjourney. Actually,

[13:41 - 13:45]
that looked really good. I took this

[13:43 - 13:48]
basic picture of me and I'm going to

[13:45 - 13:50]
drag this over here um for reference.

[13:48 - 13:52]
I'm just going to drag this

[13:50 - 13:54]
in. Oh, let me see. I got to click on

[13:52 - 13:57]
Gen 4 references. That's what I need to

[13:54 - 14:01]
do. Okay. So, describe your shot or add

[13:57 - 14:02]
a reference to begin. And so I'm just

[14:01 - 14:06]
going to see if I can drag this

[14:02 - 14:09]
reference over. So drop image to use as

[14:06 - 14:13]
a reference. That looks

[14:09 - 14:15]
good. And what I realized after messing

[14:13 - 14:17]
around with this before is runway

[14:15 - 14:19]
actually has a really nice feature here.

[14:17 - 14:21]
You can bring in multiple reference

[14:19 - 14:23]
images. So it looks like I can bring in

[14:21 - 14:25]
three. I've got little placeholders for

[14:23 - 14:28]
three different thumbnails. But if I go

[14:25 - 14:31]
in and I move my pointer up here over

[14:28 - 14:34]
image one, I can actually name this. So

[14:31 - 14:36]
now I've got it called Michael and I'll

[14:34 - 14:38]
use that in a second. But you can tag

[14:36 - 14:40]
the image just like you can tag people

[14:38 - 14:43]
when you're doing chat with them. You

[14:40 - 14:44]
can actually tag them. So I'm going to

[14:43 - 14:47]
do that in a second. But let's see what

[14:44 - 14:48]
else do I want here. Which style do I

[14:47 - 14:51]
think I want to use? I like this

[14:48 - 14:53]
psychedelic one. So I'm going to drop

[14:51 - 14:57]
that

[14:53 - 15:00]
in. And I think I'm going to call that

[14:57 - 15:01]
Wonderland. It's not really Wonderland,

[15:00 - 15:04]
but it's got the mushrooms and stuff in

[15:01 - 15:07]
there. And then why not bring in one

[15:04 - 15:11]
additional? So, I think I'll just bring

[15:07 - 15:11]
in this little dude right

[15:12 - 15:18]
here kind of a little pirate frog. So,

[15:16 - 15:22]
I'm just going to call him pirate. Okay.

[15:18 - 15:24]
And now I will do at Michael and at

[15:22 - 15:27]
pirate

[15:24 - 15:32]
um fighting

[15:27 - 15:35]
with swords in a

[15:32 - 15:38]
mysterious

[15:35 - 15:41]
psychedelic and we'll do

[15:38 - 15:44]
wonderland. And then I have the ability

[15:41 - 15:46]
here in runway to choose from a couple

[15:44 - 15:48]
different options down here. Here I can

[15:46 - 15:50]
just click which makes it easy. If I

[15:48 - 15:53]
want to change the aspect ratio, I will

[15:50 - 15:54]
preserve this at 16 to9. And then I

[15:53 - 15:57]
think the only value I can change under

[15:54 - 15:59]
settings is the seed. Yeah. So if you

[15:57 - 16:01]
want to change the randomize seed and

[15:59 - 16:03]
you wanted to keep it consistent, you

[16:01 - 16:05]
could reuse a seed to get similar

[16:03 - 16:07]
results. So if you find something you

[16:05 - 16:09]
like or you want to use the same seed,

[16:07 - 16:11]
you can do that. But I'm all about the

[16:09 - 16:15]
randomization right here. So let me go

[16:11 - 16:18]
ahead and click generate. and we'll get

[16:15 - 16:21]
runway generating some images over here.

[16:18 - 16:24]
And let's pop back over to midjourney.

[16:21 - 16:26]
And just take a look at these

[16:24 - 16:30]
variations.

[16:26 - 16:33]
Um, I love the tats on the fingers

[16:30 - 16:35]
there. This is actually pretty cool. I

[16:33 - 16:38]
think it's really about finding

[16:35 - 16:40]
different styles that work well together

[16:38 - 16:42]
because it did. It took the picture of

[16:40 - 16:45]
me and it combined it with that that

[16:42 - 16:47]
style really well. It put the VW like

[16:45 - 16:50]
inside the bar

[16:47 - 16:53]
there. And I'm doing kind of a duck face

[16:50 - 16:56]
there. That's kind of weird, but um

[16:53 - 16:59]
yeah, definitely I like it. This is

[16:56 - 17:00]
really cool. Okay, let's go in and just

[16:59 - 17:03]
mess around. I'm going to grab a couple

[17:00 - 17:05]
more. Going to do a fresh image. Let's

[17:03 - 17:09]
take this

[17:05 - 17:11]
one. And let's see. I'm going to take

[17:09 - 17:14]
this girl here. I'm going to drop her

[17:11 - 17:17]
into the omni reference. And if I want,

[17:14 - 17:19]
I can kind of lock this as well. So, if

[17:17 - 17:21]
I want to keep the image prompts, I can

[17:19 - 17:24]
do that by clicking on the little lock.

[17:21 - 17:28]
And for the style reference, let me

[17:24 - 17:31]
choose a different version here. I don't

[17:28 - 17:32]
have too many styles in here. Maybe I

[17:31 - 17:34]
just go ahead and drop in this art

[17:32 - 17:37]
style. I kind of like that style. Let's

[17:34 - 17:40]
see what it does with that.

[17:37 - 17:45]
And so we'll just type in a prompt here.

[17:40 - 17:49]
An Android girl plays guitar in a

[17:45 - 17:53]
vintage music shop. And we'll do aspect

[17:49 - 17:56]
ratio of 16-9. The omni reference, I'm

[17:53 - 18:00]
going to go ahead and drag that up to

[17:56 - 18:03]
825. And we'll go ahead here and click

[18:00 - 18:07]
submit and let that work while we go

[18:03 - 18:08]
back and forth here. So, runway is still

[18:07 - 18:09]
working. Oh, that was actually pretty

[18:08 - 18:13]
good

[18:09 - 18:15]
timing. Uh, it didn't do what I wanted

[18:13 - 18:18]
it to do. Not in all of them. Oh, let's

[18:15 - 18:21]
pop these up and take a look. All right.

[18:18 - 18:23]
So, it's got like a version of me

[18:21 - 18:25]
against another version of me. This is

[18:23 - 18:29]
like a multiverse fight. I guess this

[18:25 - 18:33]
psychedelic land is where we we met. And

[18:29 - 18:35]
go on to the next one. Um that that

[18:33 - 18:39]
actually kind of looks cool, but you can

[18:35 - 18:41]
see like all the different artifacts and

[18:39 - 18:44]
it got a lot of the psychedelic effects

[18:41 - 18:46]
really well. It nailed that. But as far

[18:44 - 18:48]
as the character in the background, not

[18:46 - 18:50]
so much. I mean, I don't hate this, but

[18:48 - 18:54]
it's not it's not as good as I want it

[18:50 - 18:55]
to be. This is me against me. It didn't

[18:54 - 18:59]
do the little

[18:55 - 19:01]
creature. And again, um it's got me

[18:59 - 19:03]
against me. what I was really trying to

[19:01 - 19:05]
do and I thought I did it in the prompt

[19:03 - 19:08]
at Michael and at pirate fighting with

[19:05 - 19:11]
swords in a mysterious dot dot dot. So,

[19:08 - 19:14]
it didn't really accomplish what I

[19:11 - 19:16]
wanted to over here in runway. Um, with

[19:14 - 19:19]
one subject though, I think it probably

[19:16 - 19:21]
would have done a little bit better job.

[19:19 - 19:24]
So, let's just go ahead here. I'm going

[19:21 - 19:26]
to delete the pirate. Actually, let

[19:24 - 19:29]
let's leave the pirate. We don't need to

[19:26 - 19:32]
see me. And what I'll do here is I'll

[19:29 - 19:35]
just say at

[19:32 - 19:39]
pirate and we'll

[19:35 - 19:42]
do staring at the

[19:39 - 19:44]
camera. Um, with

[19:42 - 19:49]
a Let's see. What should we do here?

[19:44 - 19:51]
With a large cartoon

[19:49 - 19:55]
handlebar,

[19:51 - 19:58]
mustache in a

[19:55 - 20:01]
psychedelic wonderland. And we'll click

[19:58 - 20:04]
generate on that and see if it can move

[20:01 - 20:07]
just that little pirate frog into the

[20:04 - 20:09]
psychedelic land.

[20:07 - 20:12]
And then we'll go back over here to

[20:09 - 20:14]
create on the midjourney page. That one

[20:12 - 20:16]
turned into like almost a doll. That

[20:14 - 20:17]
looks a little bit

[20:16 - 20:20]
plasticky.

[20:17 - 20:24]
So, not loving that

[20:20 - 20:27]
one. That one looks a little bit better.

[20:24 - 20:30]
You can see it's definitely kind of got

[20:27 - 20:32]
hard edges and contrast. I wonder if

[20:30 - 20:34]
that's because the omniweight is turned

[20:32 - 20:37]
up so much. The omniweight reference is

[20:34 - 20:39]
turned up pretty high. That one looks

[20:37 - 20:42]
pretty cool. I like that

[20:39 - 20:44]
one. And that one looks good, too. I

[20:42 - 20:46]
think this is worth a roll here. What

[20:44 - 20:51]
I'm going to do is I'm going to go back

[20:46 - 20:53]
here and I'm going to change the slider

[20:51 - 20:55]
here. And I'm going to drop that down.

[20:53 - 20:58]
We're going to go down to a little bit

[20:55 - 21:02]
closer. I'll just go up to like 250 on

[20:58 - 21:04]
this one. And we'll reuse the text. So,

[21:02 - 21:06]
if I go over the text here, I can just

[21:04 - 21:08]
click use text and then it pops it up

[21:06 - 21:11]
into the bar here. I want to preserve

[21:08 - 21:14]
the aspect ratio again at

[21:11 - 21:16]
16-9. And it said vintage music shop.

[21:14 - 21:19]
So, it added the records there. I like

[21:16 - 21:23]
the stone in the background. So, I think

[21:19 - 21:25]
I'm going to go with red brick wall and

[21:23 - 21:29]
graffiti. And just see what it does

[21:25 - 21:32]
there with the lower omni reference.

[21:29 - 21:36]
See if runway is still churning on this.

[21:32 - 21:40]
It looks like it's at what? 60 70. Oh,

[21:36 - 21:42]
here we go. Perfect timing

[21:40 - 21:45]
again. That's actually pretty good. All

[21:42 - 21:48]
right. So, I had my pirate and I wanted

[21:45 - 21:49]
to stick him in Wonderland. And so, I've

[21:48 - 21:52]
got kind of he's it's like he's coming

[21:49 - 21:54]
up from the countryside

[21:52 - 21:56]
there. His mustache doesn't look super

[21:54 - 21:59]
realistic.

[21:56 - 22:04]
kind of a red handlebar mustache

[21:59 - 22:06]
there. A floating head in the

[22:04 - 22:08]
sky. That would be the effect of the

[22:06 - 22:10]
psychedelic mushrooms

[22:08 - 22:13]
perhaps. And there we go. That's our

[22:10 - 22:15]
winner right there. I like this one. I

[22:13 - 22:17]
actually like it a

[22:15 - 22:19]
lot. Wow, that is like my spirit animal

[22:17 - 22:21]
there. I'm going to go ahead here. Oh,

[22:19 - 22:24]
and I'm in runway, so I can't really

[22:21 - 22:28]
upres this one. But you know what I can

[22:24 - 22:30]
do while I'm in runway here and this is

[22:28 - 22:34]
a great advantage of runway is I can

[22:30 - 22:38]
turn it into a video. So I can say use

[22:34 - 22:40]
and now what I can do is under video

[22:38 - 22:43]
I've got different options. Um I've got

[22:40 - 22:45]
Gen 4 and Gen 4 Turbo. I'm just going to

[22:43 - 22:47]
go with the Gen 4. It's going to take a

[22:45 - 22:50]
little bit longer probably to generate

[22:47 - 22:52]
this but I can do a 10-second video. I

[22:50 - 22:54]
mean what the heck? Why not do the 10

[22:52 - 22:57]
seconds because I'll probably have more

[22:54 - 22:58]
usable frames if I do that. And I'm just

[22:57 - 23:02]
going to say a

[22:58 - 23:03]
humongous pirate frog

[23:02 - 23:05]
[Music]

[23:03 - 23:10]
um

[23:05 - 23:13]
meditating hovers in the sky as the

[23:10 - 23:18]
camera slowly let's see what's to the

[23:13 - 23:23]
left. pans to the left with swirling

[23:18 - 23:25]
clouds and a rotating planet. And we'll

[23:23 - 23:27]
see if we can get the mushrooms to

[23:25 - 23:32]
dance. Mushrooms

[23:27 - 23:34]
sway in the wind and dance. And I'll go

[23:32 - 23:36]
ahead and click generate on

[23:34 - 23:38]
that. And you know what I'm going to do

[23:36 - 23:42]
as well is I'm just going to go ahead

[23:38 - 23:45]
and do a quick roll here and generate.

[23:42 - 23:49]
So in the unlimited plan that I have

[23:45 - 23:52]
here, it does limit me to basically two

[23:49 - 23:55]
concurrent processes. So I can only do

[23:52 - 23:57]
two right now. And I'll come back to

[23:55 - 23:59]
this in a minute and we'll see what we

[23:57 - 24:01]
end up with there. Let's see what's

[23:59 - 24:03]
happening over here in

[24:01 - 24:07]
Midjourney. All right. So what we tried

[24:03 - 24:10]
to do here is change the settings so we

[24:07 - 24:13]
could see that we had uh Yep. The omni

[24:10 - 24:15]
weight was too high before where it got

[24:13 - 24:18]
all contrasty and I had really hard

[24:15 - 24:20]
edges before. I don't have that. I

[24:18 - 24:22]
really like this image actually. So I

[24:20 - 24:24]
was able to take my original image that

[24:22 - 24:27]
I had done in MidJourney. I brought it

[24:24 - 24:30]
back in. But I had a style that I wanted

[24:27 - 24:32]
to use. So I dropped that style in and I

[24:30 - 24:33]
got a lot of that artwork style. The

[24:32 - 24:35]
graffiti almost looks like that artwork

[24:33 - 24:38]
in the background. And then I have

[24:35 - 24:41]
elements of guitars. So definitely like

[24:38 - 24:42]
that one. I might come back and upscale

[24:41 - 24:45]
that. Let's see what else we got,

[24:42 - 24:48]
though. Um, it almost looks like a 60s

[24:45 - 24:52]
or 70s version. She's missing a finger

[24:48 - 24:54]
there. So, I kind of like the the knit

[24:52 - 24:57]
sweater and everything. Midjourney still

[24:54 - 24:59]
sucks for text. That's that's something

[24:57 - 25:00]
I know the team is considering it and

[24:59 - 25:03]
they're looking to the community for

[25:00 - 25:04]
MidJourney to see if they want it. I

[25:03 - 25:07]
hear a lot of people, including myself,

[25:04 - 25:09]
saying, "Yes, we want it. We want it."

[25:07 - 25:11]
but they're prioritizing other features

[25:09 - 25:13]
for the time being. So, we still don't

[25:11 - 25:16]
have good text. And what annoys me about

[25:13 - 25:18]
it is I'm not indicating that I want any

[25:16 - 25:21]
text. I did say graffiti, but it tries

[25:18 - 25:23]
to throw text in all the time and it

[25:21 - 25:25]
just makes it look very AI generated.

[25:23 - 25:27]
This one didn't turn out as well. I

[25:25 - 25:30]
still have a lot of the hard contrast

[25:27 - 25:32]
edges. Um, this one I lost. It turned

[25:30 - 25:34]
her from a blonde to a brunette, which I

[25:32 - 25:36]
don't hate. But, um, that one's okay.

[25:34 - 25:39]
But I'm going to go back here and I

[25:36 - 25:42]
think I'll upscale that

[25:39 - 25:45]
one. All right. So, that's pretty good.

[25:42 - 25:46]
Let me just before I pop on over here

[25:45 - 25:48]
because I don't want this to take

[25:46 - 25:51]
forever. This is a lot of fun, but I

[25:48 - 25:54]
think I'm just going to do one more and

[25:51 - 25:55]
I'm going to go back to my images here

[25:54 - 25:58]
and I'm going to see if I can do

[25:55 - 26:00]
something with Shawn of the Dead. Um,

[25:58 - 26:03]
I'm going to drag Shaun of the Dead up

[26:00 - 26:05]
here. He's going to be my omni

[26:03 - 26:07]
reference. Notice I had one in there.

[26:05 - 26:10]
You can only do one subject when you're

[26:07 - 26:12]
doing your omni reference, but I can do

[26:10 - 26:15]
another style. So, I'm going to go back

[26:12 - 26:19]
here to my styles and I'm just going to

[26:15 - 26:22]
drag and try to get like this HR guy

[26:19 - 26:25]
style. I've learned my lesson though,

[26:22 - 26:27]
especially in runway, it seems to be a

[26:25 - 26:30]
little bit more restrictive. If I

[26:27 - 26:31]
mention certain artists, it will stop

[26:30 - 26:34]
and tell me that it can't do it because

[26:31 - 26:38]
of their community guidelines. But if

[26:34 - 26:40]
you just drop in the image, then it

[26:38 - 26:42]
tends to to be okay here in Midjourney.

[26:40 - 26:43]
And Midjourney is a lot more forgiving

[26:42 - 26:45]
when you reference different artist

[26:43 - 26:47]
styles as well. I'm going to get rid of

[26:45 - 26:53]
the robot. I don't want that. But I'm

[26:47 - 26:56]
just going to say here, uh, man is being

[26:53 - 27:00]
chased by a

[26:56 - 27:05]
xenomorph through a series of alien

[27:00 - 27:08]
caverns in the style of HR Guyger. And

[27:05 - 27:11]
we'll see if it will do

[27:08 - 27:13]
that. For the Omni reference, I think I

[27:11 - 27:14]
want to actually kick this up. I want

[27:13 - 27:16]
this to

[27:14 - 27:20]
be a little bit higher. We'll see what

[27:16 - 27:22]
Shawn ends up as there. Everything else

[27:20 - 27:24]
looks good. So, let's click. And as

[27:22 - 27:26]
that's processing, we'll go back over

[27:24 - 27:29]
here to

[27:26 - 27:33]
runway. I will pull up a couple more

[27:29 - 27:36]
videos. This is about 93% here. Um, and

[27:33 - 27:38]
this is my current session, but let me

[27:36 - 27:41]
just go in and see if I can find these

[27:38 - 27:43]
real quick. It's a little

[27:41 - 27:47]
choppy. I don't even think I've watched

[27:43 - 27:49]
this video yet, actually.

[27:47 - 27:49]
What's this one

[27:54 - 27:58]
like? Not too

[27:59 - 28:05]
shabby. And I did images here in runway

[28:02 - 28:08]
as well, but they just don't turn out as

[28:05 - 28:09]
well as midjourney.

[28:08 - 28:11]
The best thing if you're working with

[28:09 - 28:14]
both of the platforms, I think, is to do

[28:11 - 28:16]
the image in Mjourney and then bring it

[28:14 - 28:18]
over to

[28:16 - 28:20]
runway. Yeah, these didn't look very

[28:18 - 28:22]
good. But when it came to the videos,

[28:20 - 28:25]
let's see. This is this is the one that

[28:22 - 28:25]
I did

[28:28 - 28:32]
before. That's kind of cool. I mean, the

[28:31 - 28:34]
ability to take one of your favorite

[28:32 - 28:37]
characters cartoon version out of a

[28:34 - 28:41]
movie, which I did that in chat.

[28:37 - 28:42]
GPT40 and then I brought in an HRGER

[28:41 - 28:45]
style image that I had done in

[28:42 - 28:48]
midjourney and I brought it into runway

[28:45 - 28:50]
and animated it. Um, so alien runs after

[28:48 - 28:53]
man, man sprints away from alien and

[28:50 - 28:58]
then camera pans

[28:53 - 29:01]
out. Okay, so we are back here to

[28:58 - 29:06]
midjourney

[29:01 - 29:09]
and this is awesome.

[29:06 - 29:11]
This is actually really

[29:09 - 29:15]
[Laughter]

[29:11 - 29:17]
good. Oh my gosh. If he looked a little

[29:15 - 29:19]
bit more like Shawn, I I would think

[29:17 - 29:21]
this would be the winner. I love the

[29:19 - 29:23]
perspective on that shot. And this one,

[29:21 - 29:27]
we've got kind of a half

[29:23 - 29:31]
torso. Um, this is really good,

[29:27 - 29:34]
though. Even without the alien in there,

[29:31 - 29:36]
I think this is really good. I need to

[29:34 - 29:39]
upscale this

[29:36 - 29:41]
one. And then once this is upscaled, I'm

[29:39 - 29:43]
going to download it and then the video

[29:41 - 29:45]
is going to end. And I'll just end on

[29:43 - 29:48]
that note because what I'm going to do

[29:45 - 29:51]
is take this image that I generated from

[29:48 - 29:53]
an omni reference which is the new

[29:51 - 29:55]
feature here in Midjourney 7. I brought

[29:53 - 29:57]
in a style which was an HR Geiger style

[29:55 - 30:01]
image I had created previously in

[29:57 - 30:04]
MidJourney. I brought them together and

[30:01 - 30:08]
I'm going to take the resulting image

[30:04 - 30:12]
and bring it into runway and basically

[30:08 - 30:14]
render a video and then upscale it to 4K

[30:12 - 30:16]
and that's going to be it. So anyway, u

[30:14 - 30:18]
I hope you enjoyed this video. It was a

[30:16 - 30:20]
lot of fun playing around with these new

[30:18 - 30:22]
tools. They're changing all the time. If

[30:20 - 30:24]
you enjoyed this, please like and

[30:22 - 30:26]
subscribe. And if you have ideas, let me

[30:24 - 30:28]
know, too. Please leave comments below

[30:26 - 30:30]
and let me know if you have any ideas of

[30:28 - 30:32]
things you want me to try to do. All

[30:30 - 30:35]
right, thanks for watching. Take care.

[30:32 - 30:35]
Bye.

## コメント

### 1. @santosfaab (👍 0)
I loved your comparisons, dude! If you can do, I'd like to see more realistic character on Midjourney Omnireference and Runway References as well. PS: your video would be more interesting as if it's edited too <3

> **@brainyfaceproject** (👍 0): Cool & thanks! I like doing the comparisons, so more to come—realistic characters are definitely on the hit list. And yeah... this one was a little “unedited director’s cut”. I spent **hours** working on a video that was heavily edited and added sound effects recently and it got hardly any views ( https://youtu.be/xKDclRQT8qs), so I swung the pendulum in the other direction and just did a straight raw take that I could bang out quickly. I think there's probably a sweet spot in there...

### 2. @yrv2016 (👍 0)
I want to use image and video creations tools for stories where character consistency is of utmost importance. expecially the realisitic historical characters. Can you please suggest me the best tool for this ?

> **@brainyfaceproject** (👍 0): There are many tools for this and I don't have experience with *all* of them, but I find that Midjourney v6.1 with their character reference (--cref) and character weight (--cw) produce pretty good results. The new Midjourney v7 introduced a feature called Omnireference, which allows you to drag and drop a reference image and use the omnireference feature to include the image in your images. It uses an omnireference weight attribute (--ow) that can be dialed in between 1-1000. Best results with that for me are usually around 600-700 for the omnireference weight. ChatGPT 4o is pretty amazing, though. I have been extremely impressed by its ability to accept an upload of a character and then use it in your output. It's kind of crazy how good the results have been for me with ChatGPT 4o, but prompting is a different beast/style with ChatGPT. The natural language provides a lot of flexibility but can introduce inconsistencies. There are ways around that, but that's a lot to get in to here. For image-to-text (once you have your image), Runway is my #1 choice right now. Veo2 presently has limitations about using people, and OpenAI's SORA is decent, but limited. Runway is cool because they introduced a new 'reference' feature for your videos where you can tag character's and then reference them in your prompt when creating videos. My workflow is usually to generate images in Midjourney, make sure you capture the seeds and prompts for future reference, then use Runway to output the video from the image.

### 3. @thewebstylist (👍 0)
Bro same issues here! Makes me look older and beat down much of the time and maybe 10% of Omni rolls are useable 
Really hoping MJ improves the character recreation and consistency

> **@brainyfaceproject** (👍 0): Totally... some of those Omni rolls had me questioning my life choices and whether I should have worn more sunscreen in my youth. The first several images I created I kept thinking "what am I doing wrong", but you're right--when you hit (about 10% or so) it does give you something really cool.  but yeah, consistency still feels like a work in progress. Hoping MJ dials it in soon. Seems like we're going to see *some* enhancements on v7 over the next few weeks, but the MJ team is already talking about moving on to V8. I want Omnireference to really get dialed in first.

