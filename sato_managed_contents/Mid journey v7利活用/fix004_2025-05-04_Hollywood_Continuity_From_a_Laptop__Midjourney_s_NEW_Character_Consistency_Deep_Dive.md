# Midjourney Omni Reference レビュー：キャラクター整合性と課題

## 概要
本動画は、**Midjourney**の新機能**Omni Reference**について、映画制作の観点から詳細なテスト結果をレビューするものです。キャラクターの顔の整合性向上には有効であることが示されましたが、参照画像に含まれるオブジェクトの整合性には問題があり、生成される画像の品質が低下するケースも見られました。また、過剰なモデレーションにより、**Midjourney**自身で作成した画像を参照として使用できないという課題も指摘されています。この機能が既存の**LoRA**のような技術を完全に置き換えるかについては疑問が呈されています。

## 主要なポイント
-   **Omni Reference**は、参照画像のキャラクターの顔の整合性を高めるが、ウェイト設定（特に1000）が重要。
-   参照画像に含まれるオブジェクト（ブラスター、剣など）は一貫して再現されず、形状が毎回異なる。
-   参照画像の背景や要素が生成結果に影響を与えることがあり、意図しないシーンになる場合がある。
-   **Omni Reference**の使用時に、生成される画像の品質が低下する（ノイズや未完成感）問題が発生する。
-   **Midjourney**内で生成された画像でも、モデレーションにより**Omni Reference**として使用できない場合がある。

## 詳細内容
### Midjourney Omni Reference の紹介と基本的な使い方 [00:00:00]
話者は、**Midjourney**の新機能**Omni Reference**についての詳細なレビューを開始します。AI映像制作の利点を紹介するチャンネルとして、ハイプだけでなく、良い点と悪い点の両方を伝える責任を強調します。**Omni Reference**はまだ実験的な機能であり、以前のキャラクター参照機能と同様に機能します。使い方は、参照画像をアップロードまたは既存の画像を選択し、コマンドボックスの**Omni Reference**セクションにドラッグ＆ドロップするというものです。話者 [00:00:00]

### キャラクター整合性のテスト（ウェイト別） [02:10:00]
**Freepic**で作成したキャラクター「Danny」の画像を使用して、**Omni Reference**のウェイト（強度）によるキャラクター整合性の違いをテストします。
-   **ウェイト100**: デフォルト設定でテスト。生成された画像は参照画像に「Danny風」ではあるが、完璧には似ていません。少し似せたい場合に適していると考えられます。話者 [02:10:00]
-   **ウェイト400**: **Midjourney**が推奨するウェイトでテスト。ウェイト100よりは参照画像に近づきましたが、**Midjourney**が修正したと発表したにも関わらず、手の不自然さが見られます。話者 [03:57:00]
-   **ウェイト1000**: 最大ウェイトでテスト。この設定で生成された画像は、キャラクターの顔が最も正確に再現されました。話者は自身のテストから、キャラクターの顔を正確に再現したい場合はウェイト1000が最適であると推奨します。ただし、スタイルや実験的設定のウェイトも**Omni Reference**のウェイトと競合するため、高ウェイトの場合は**Omni Reference**も高くする必要があることに言及しています。話者 [05:29:00]

### オブジェクト整合性の問題 [07:04:00]
**Omni Reference**がオブジェクトの整合性にも有効かテストします。**Craya**で作成した自身のアバターが未来的な**Blaster**を持つ画像（ウェイト1000）を使用。キャラクターの顔は正確に再現されましたが、生成された画像ごとに**Blaster**の形状が全く異なります。気に入った**Blaster**の画像を**Omni Reference**として使用しても、その特定の**Blaster**は再現されませんでした。話者 [07:04:00]
剣（Steampunkテーマ）の画像を使ったテストでも同様の問題が発生。剣の画像を**Omni Reference**にしましたが、生成されるキャラクターは毎回異なり、剣の形状も一貫しませんでした。キャラクターとオブジェクトの両方を同時に参照する機能（**Clling**のような）が**Midjourney**にも必要だと指摘します。話者 [11:08:00]

### 画像品質の低下と参照画像の影響 [13:30:00]
**Midjourney**で作成した宇宙船の画像を**Omni Reference**として使用し、宇宙空間を飛んでいるシーンを生成しようと試みます。参照画像に地上のような要素が含まれていたため、生成結果が地上近くや軌道上に見えるなど、意図しないシーンになることがあります。話者 [13:30:00]
また、これらの生成過程で、画像の品質が著しく低下する問題が発生しました（ノイズが多く、レンダリングが不完全に見える）。**Freepic**で画像をアップスケールして背景を除去したり、**Midjourney**内でアップスケールを試したりしても、品質低下は完全に解決されませんでした。話者 [17:36:00]

### 過剰なモデレーションの問題 [16:25:00]
Midjourneyのモデレーションに対する不満を述べます。Midjourneyはv7でモデレーションを緩和し、より多くの画像生成が可能になったと発表しましたが、**Omni Reference**として画像を使用する際には、依然として厳しい制限があることを指摘します。話者 [16:25:00]
以前**Midjourney**自身で作成した水着姿の女性の画像を**Omni Reference**として使用しようとしたところ、「コミュニティガイドラインに合わない」として拒否されました。**Midjourney**内で作成した画像でさえ参照として使えない状況に対し、X（旧Twitter）やDiscordでMidjourneyにフィードバックを送っていることに言及します。話者 [20:52:00]

## 結論 [21:28:00]
話者は、**Midjourney**の**Omni Reference**機能はキャラクターの顔の整合性には一定の効果がある（特にウェイト1000）と評価します。しかし、参照画像に含まれるオブジェクトの整合性が取れないこと、画像の品質が低下する場合があること、そして過剰なモデレーションが創造性を制限することを課題として挙げます。映画制作のように連続性が必要な用途には、オブジェクトの整合性がないため不十分であると結論付けます。この機能が現時点では**LoRA**の完全な代替となるかは疑問符をつけ、今後の改善に期待を寄せます。視聴者に対して、この機能が**LoRA**を不要にするかについて意見を求めて動画を締めくくります。話者 [21:28:00]

---

# Hollywood Continuity From a Laptop? Midjourney's NEW Character Consistency Deep Dive

**チャンネル:** The AI Filmmaking Advantage
**公開日:** 2025-05-03
**URL:** https://www.youtube.com/watch?v=gMPgFS4olcs

## 説明

Midjourney just dropped Omni Reference—a drag-and-drop trick that promises bulletproof character and prop consistency with one image and one slider. No training, no rerolls, no mercy for LoRAs. Sounds like filmmaker freedom in a box… or marketing smoke? 

In this breakdown, I pound the feature with real-world tests, expose the cracks, and share the quick wins you can swipe today. 

Does it actually do what it says it does? Let’s find out!

00:00  Intro – Why I Don’t Trust the Hype Train  
00:39  Quick Oref Jumpstart – Where to Click, What to Drag  
02:10  Weight-100 Test – “Danny-ish” Coffee Break  
03:57  Weight-400 Test – Closer, But Hands Still Weird  
05:29  Weight-1000 Test – Nailed the Face, Finally  
07:04  Avatar + Blaster – When Objects Go Rogue  
09:18  Consistency FAIL – Every Blaster Looks Different  
11:08  Sword Experiment – Single-Image Limit Hits Hard  
13:30  Spaceship Stress Test – Quality Nosedive & Fixes  
16:25  Over-Moderation Saga – My Image Gets Censored?!  
19:40  Work-arounds & Upscaling Tricks That Help  
21:28  Verdict – Is Oref a LoRA-Killer or Just Beta?  

💥 Midjourney Magic, Hollywood Style. Steal my $100M filmmaking playbook for AI images that wow. 🔥 Camera moves, lighting secrets, drop-dead gorgeous consistent characters, passive AI filmmaker income – it's ALL inside. Plus, my handcrafted viral AI film director prompts vault, FREE. Special beta-launch promo pricing ending soon! Enroll NOW → https://aifilmmakingadvantage.com/enroll-today


📌 Other resources and recommendations from Pauldonis and The AI Filmmaking Advantage:

✅ Want to level up your AI filmmaking game? Discover how ElevenLabs is revolutionizing the way we create content! With ultra-realistic AI voices and precise emotional control, you can bring your characters to life without breaking the bank.

Create professional-quality voiceovers, clone voices with just a few minutes of audio, and fine-tune every emotional nuance to match your scene perfectly. Whether you're crafting dramatic monologues or snappy dialogue, ElevenLabs gives you Hollywood-grade voice production at a fraction of the cost.

🎯 Perfect for:
• AI-generated films and animations
• Character dialogue and narration
• Professional voiceovers
• Quick prototyping and iterations

Ready to transform your AI filmmaking journey? Click my affiliate link below to get started with ElevenLabs and join thousands of creators who are already revolutionizing their production workflow!  https://try.elevenlabs.io/8an4hsq3v9mw

✅ Streamline your filmmaking workflow with Dzine.ai—your all-in-one creative powerhouse! Turn text descriptions into stunning images, transform static visuals into dynamic videos, and bring your written stories to life with seamless text-to-video features. All in one platform, at a fraction of what you'd spend on multiple subscriptions.

Whether you're crafting consistent character sheets, generating scenes, or producing social content, Dzine.ai helps you create professional-quality work without breaking the bank.

✨ Ready to simplify your creative process? Use my affiliate link below to support the channel at no additional cost to you! https://www.dzine.ai/?via=pauldonis

#AIFilmmaking #GenerativeAI #FilmProduction #IndieFilm #AICreator #DigitalCreator #Filmmaking#aifilmmaking   #hailuoai  #generativeaitools   #aivideo  #midjourney  #aicreator 

Disclaimer: All opinions are my own. Affiliate links support the channel. Sponsors are disclosed.

## 字幕

[00:00 - 00:03]
Hey, what&#39;s going on everyone? Paul

[00:01 - 00:05]
Donis Maximus here. Thanks for checking

[00:03 - 00:07]
out the AI filmmaking advantage where

[00:05 - 00:09]
here we talk about how to make and

[00:07 - 00:11]
monetize AI filmmaking. Okay guys, so

[00:09 - 00:15]
what I want to do is a quick deep dive

[00:11 - 00:16]
into the new omni reference feature from

[00:15 - 00:19]
Midjourney. If you take a look at their

[00:16 - 00:21]
discord server, they announced this not

[00:19 - 00:24]
too long ago and they talk about what it

[00:21 - 00:27]
does, how to use it, and they also give

[00:24 - 00:28]
some examples of it in action. And if

[00:27 - 00:30]
you look at the examples, they look

[00:28 - 00:32]
pretty straightforward, but in this

[00:30 - 00:34]
video, I&#39;m going to be walking you

[00:32 - 00:36]
through pretty much everything that I

[00:34 - 00:39]
found wrong with the feature. I know

[00:36 - 00:41]
there&#39;s going to be a lot of AI news

[00:39 - 00:43]
bros on the hype train talking about how

[00:41 - 00:45]
great it is. They&#39;re only going to tell

[00:43 - 00:46]
you all of the good stuff, but here on

[00:45 - 00:48]
this channel, we do things a bit

[00:46 - 00:50]
differently. I see it as my

[00:48 - 00:52]
responsibility to let you guys know both

[00:50 - 00:55]
the good and bad. Because yes, even

[00:52 - 00:57]
though I sell a midjourney training

[00:55 - 00:59]
course, which you can find out more in

[00:57 - 01:02]
the description below this video, I do

[00:59 - 01:04]
not cake nor shield for these AI

[01:02 - 01:06]
companies when they&#39;re screwing up. Now,

[01:04 - 01:08]
I&#39;m not going to be too harsh on the

[01:06 - 01:09]
omni reference feature because I know it

[01:08 - 01:11]
just came out and they&#39;re saying that

[01:09 - 01:15]
it&#39;s experimental. And to be honest with

[01:11 - 01:17]
you, so far it does what it says it does

[01:15 - 01:19]
for the most part. I&#39;ll get into where

[01:17 - 01:21]
it works and where it does not. and then

[01:19 - 01:23]
we&#39;ll talk about what needs to actually

[01:21 - 01:25]
happen in order for it actually to be

[01:23 - 01:27]
great. And from there, you guys can

[01:25 - 01:31]
decide if this is something worth your

[01:27 - 01:32]
while to use in your workflows. Now,

[01:31 - 01:35]
obviously, you should know by now that

[01:32 - 01:37]
MidJourney version 7 is out. I do need

[01:35 - 01:40]
to do a deep dive video on all of the

[01:37 - 01:42]
features and updates on that. And just

[01:40 - 01:44]
as a side note, the AI cinematographers

[01:42 - 01:46]
midjourney playbook, the course that I

[01:44 - 01:49]
have, is not about features. So, you

[01:46 - 01:51]
don&#39;t need to know MidJourney version 7

[01:49 - 01:53]
in order to follow along with everything

[01:51 - 01:55]
in that training course. I built it that

[01:53 - 01:58]
way because I wanted it to be evergreen

[01:55 - 02:00]
because the AI landscape is changing

[01:58 - 02:02]
literally almost weekly and I didn&#39;t

[02:00 - 02:04]
want things in that training to become

[02:02 - 02:06]
obsolete overnight. Now, let&#39;s get into

[02:04 - 02:08]
how this omni feature works. It&#39;s

[02:06 - 02:10]
basically like how the character

[02:08 - 02:12]
reference feature worked in the previous

[02:10 - 02:14]
MidJourney versions. And what you&#39;d do

[02:12 - 02:17]
is you&#39;d come up here and you&#39;d click on

[02:14 - 02:19]
add images and you&#39;d see this omni

[02:17 - 02:20]
reference box right here. Now, if for

[02:19 - 02:22]
some reason you come here and you don&#39;t

[02:20 - 02:25]
see this, you&#39;re going to need to clear

[02:22 - 02:27]
your browser cookies and cache and then

[02:25 - 02:29]
just sign back in. That&#39;s what happened

[02:27 - 02:30]
to me. I came here, didn&#39;t see it, and

[02:29 - 02:32]
then what I ended up just doing was

[02:30 - 02:34]
clearing all of my browser cache. It

[02:32 - 02:37]
logged me out. I logged back in and

[02:34 - 02:40]
voila, here it was. And what you&#39;d want

[02:37 - 02:41]
to do is if you already have some images

[02:40 - 02:44]
uploaded to MidJourney, you can use

[02:41 - 02:46]
those. However, there is a caveat that I

[02:44 - 02:49]
will get into later on in the video. But

[02:46 - 02:51]
what you could also do is find something

[02:49 - 02:53]
that you&#39;ve already used like this right

[02:51 - 02:55]
here. And then what you do is click on

[02:53 - 02:57]
image and you&#39;d see the image pop up

[02:55 - 02:59]
right here. And then you could just drag

[02:57 - 03:01]
it over here to Omni Reference and then

[02:59 - 03:02]
do your thing in terms of prompting. But

[03:01 - 03:04]
I&#39;m not going to do that because I want

[03:02 - 03:06]
to walk through the examples that I&#39;ve

[03:04 - 03:07]
already done just to show you some of

[03:06 - 03:11]
the differences. And with this image

[03:07 - 03:13]
right here, this is a photo of my

[03:11 - 03:15]
consistent character Danny that I

[03:13 - 03:16]
created within Freepic. If you guys need

[03:15 - 03:18]
to know how to make consistent

[03:16 - 03:19]
characters with Freepic or with Craya

[03:18 - 03:21]
because I&#39;m going to show you the image

[03:19 - 03:23]
that I made with Craya, you can check

[03:21 - 03:25]
out the playlist on my channel for those

[03:23 - 03:27]
particular examples. And this is how I

[03:25 - 03:30]
got started with these first few batches

[03:27 - 03:32]
of testing. So, I clicked in here and

[03:30 - 03:34]
then I selected this image of Danny

[03:32 - 03:36]
right here and I drag the image over to

[03:34 - 03:38]
Omni Reference. Now, the next thing you

[03:36 - 03:40]
need to be aware of is this. So, there&#39;s

[03:38 - 03:44]
a slider right here that gives you a

[03:40 - 03:46]
strength. The default is 100. And if we

[03:44 - 03:48]
go back to MidJourney&#39;s announcement on

[03:46 - 03:49]
their Discord server, they say if you

[03:48 - 03:51]
want to make a character&#39;s face

[03:49 - 03:54]
extremely visible, they recommend

[03:51 - 03:57]
something higher like 400. And you can

[03:54 - 03:59]
actually increase the omin strength to

[03:57 - 04:01]
1,000, which is what I recommend after

[03:59 - 04:03]
the testing that I&#39;ve done. And I&#39;m

[04:01 - 04:05]
going to show you what the differences

[04:03 - 04:07]
look like as we step through this. But

[04:05 - 04:10]
with this particular batch, I ran it on

[04:07 - 04:12]
100. And this is what I got. So, if you

[04:10 - 04:13]
look at the image that I dropped in and

[04:12 - 04:15]
then you look at this image that

[04:13 - 04:18]
MidJourney gave me, it does not look too

[04:15 - 04:21]
bad at all. It doesn&#39;t look exactly like

[04:18 - 04:23]
Danny, but it&#39;s pretty close. So, I

[04:21 - 04:26]
would say if you have an image that you

[04:23 - 04:29]
wanted to closely resemble but not

[04:26 - 04:31]
exactly, that is when you would use the

[04:29 - 04:34]
default 100 setting. And for this, I

[04:31 - 04:37]
just used a very simple prompt. It

[04:34 - 04:39]
simply says sipping a cup of coffee in a

[04:37 - 04:41]
cafe early morning. And we pretty much

[04:39 - 04:43]
got exactly that. And for some of you in

[04:41 - 04:45]
my AI cinematographers midjourney

[04:43 - 04:47]
playbook training, you&#39;ll notice that

[04:45 - 04:49]
I&#39;m not using the cinematic prompting

[04:47 - 04:51]
format here. And again, I just wanted to

[04:49 - 04:53]
keep it very simple just to quickly

[04:51 - 04:56]
demonstrate how this works. You will see

[04:53 - 04:58]
me use that prompting format as we

[04:56 - 05:00]
continue on. But again, I was just very

[04:58 - 05:02]
interested in seeing how it would

[05:00 - 05:04]
perform with very basic prompting. So to

[05:02 - 05:05]
all the knuckleheads who are going to

[05:04 - 05:07]
come in my comments section trying to

[05:05 - 05:09]
tell me that I don&#39;t know how to prompt.

[05:07 - 05:11]
For all of you, you can see that you

[05:09 - 05:14]
don&#39;t need anything super complicated to

[05:11 - 05:15]
get the type of images that you want.

[05:14 - 05:17]
And for those of you who want your

[05:15 - 05:20]
images to really pop and really get

[05:17 - 05:22]
jiggy with your midjourney prompting,

[05:20 - 05:24]
then definitely be sure to check out the

[05:22 - 05:26]
AI cinematographers midjourney playbook.

[05:24 - 05:29]
Now, with this next batch, it is the

[05:26 - 05:31]
exact same prompt. It is the exact same

[05:29 - 05:34]
image of Danny. And the only thing I did

[05:31 - 05:37]
was increase the omni reference weight

[05:34 - 05:38]
to 400 like mid Journey recommended. And

[05:37 - 05:40]
this is what we got this go around,

[05:38 - 05:43]
which I would say it&#39;s getting a little

[05:40 - 05:45]
bit closer to how Danny looks to the

[05:43 - 05:48]
reference image that I attached to

[05:45 - 05:50]
Midjourney. This is the second one. And

[05:48 - 05:52]
this is the third one. Now, one of the

[05:50 - 05:55]
things Midjourney recently said is that

[05:52 - 05:57]
they&#39;ve fixed the issues with fingers

[05:55 - 05:59]
and you obviously see that that is not

[05:57 - 06:01]
the case right here. I will say that in

[05:59 - 06:04]
my prompting I don&#39;t run into this issue

[06:01 - 06:06]
a lot. But just again so you don&#39;t think

[06:04 - 06:09]
that I&#39;m making this up. This was as of

[06:06 - 06:11]
April 30th. They say all images should

[06:09 - 06:14]
now have slightly improved image

[06:11 - 06:17]
quality, prompt accuracy, hand accuracy,

[06:14 - 06:19]
and body coherence. But as you all see,

[06:17 - 06:21]
still needs a bit of work. Now, this was

[06:19 - 06:24]
the third example that I ran with the

[06:21 - 06:26]
same image, same prompt, only increasing

[06:24 - 06:29]
the omni reference weight to its max of

[06:26 - 06:31]
1,000. And I would say this is the most

[06:29 - 06:34]
accurate look of Danny in these

[06:31 - 06:37]
particular images. And again, as I found

[06:34 - 06:40]
in my examples, especially of the ones

[06:37 - 06:42]
that I did of my own avatar, 1,00 seems

[06:40 - 06:44]
to be the sweet spot. If you have an

[06:42 - 06:46]
image that you have your heart set on

[06:44 - 06:48]
using that you want it to look exactly

[06:46 - 06:50]
the same and you&#39;re wanting to do

[06:48 - 06:52]
whatever you&#39;re wanting to do just

[06:50 - 06:54]
within MidJourney, then I recommend you

[06:52 - 06:57]
go ahead and increase the omni reference

[06:54 - 06:59]
to 10,00. But there is a caveat.

[06:57 - 07:02]
Midjourney says both the stylized and

[06:59 - 07:04]
the experimental tag also compete for

[07:02 - 07:05]
influence over the image with omni

[07:04 - 07:08]
reference. So if you have a high

[07:05 - 07:11]
stylized or experimental value, you

[07:08 - 07:13]
probably want to use a higher

[07:11 - 07:15]
corresponding omniweight value. So

[07:13 - 07:18]
basically, if you&#39;re maxing out the omni

[07:15 - 07:20]
weight value at 1,00 then it doesn&#39;t

[07:18 - 07:21]
really matter what your stylized or

[07:20 - 07:23]
experiment weight is going to be because

[07:21 - 07:26]
it&#39;s going to all line up. But if, say,

[07:23 - 07:28]
for instance, you had a stylized weight

[07:26 - 07:31]
of 1,000 and an experimental weight of

[07:28 - 07:33]
100 and a omni reference weight of 100,

[07:31 - 07:34]
then it&#39;s probably going to throw things

[07:33 - 07:36]
off. I didn&#39;t experiment with that

[07:34 - 07:38]
because again, I got it how I wanted it

[07:36 - 07:41]
to look. And for my intent and purposes,

[07:38 - 07:43]
I see 1,00 as being the sweet spot. And

[07:41 - 07:44]
basically what they&#39;re referring to

[07:43 - 07:46]
right here is if you click these

[07:44 - 07:49]
settings, you see stylization,

[07:46 - 07:51]
weirdness, variety, and these sliders

[07:49 - 07:53]
right here. Experimental is a new tag

[07:51 - 07:55]
that they&#39;ve just added, but that&#39;s what

[07:53 - 07:57]
they were also speaking about in their

[07:55 - 07:58]
Discord post that I just showed you. But

[07:57 - 08:01]
again, just to be on the safe side, go

[07:58 - 08:03]
ahead and max out that Omni strength to

[08:01 - 08:05]
1,000. Now, for those of you who have

[08:03 - 08:07]
interest in using your own avatars, this

[08:05 - 08:09]
is an avatar that I created within

[08:07 - 08:11]
Craya. And if you notice, this is the

[08:09 - 08:13]
exact same avatar that I use for my

[08:11 - 08:15]
channel and pretty much all of my social

[08:13 - 08:17]
media except this new addition right

[08:15 - 08:19]
here with the futuristic blaster. So,

[08:17 - 08:20]
I&#39;m going to show you what I did for

[08:19 - 08:22]
this. I&#39;m just going to delete that

[08:20 - 08:24]
right here. And I&#39;m going to click this.

[08:22 - 08:26]
And you&#39;ll see I added this image right

[08:24 - 08:28]
here. And I just drag it over right

[08:26 - 08:31]
there. And the prompt was very simple.

[08:28 - 08:33]
Holding a futuristic blaster. I didn&#39;t

[08:31 - 08:36]
change anything other than the Omni

[08:33 - 08:39]
reference weight to 1,00. And these were

[08:36 - 08:41]
the images that I got from that

[08:39 - 08:43]
generation that pretty much look

[08:41 - 08:46]
spot-on. I think these images look

[08:43 - 08:49]
fantastic. And what I would do next is

[08:46 - 08:53]
just take it over to some place like

[08:49 - 08:55]
Clling or Runway or Higsfield AI and

[08:53 - 08:57]
just turn them into videos. And for the

[08:55 - 08:59]
images here, I ran some variations on

[08:57 - 09:01]
the one that I really liked, which was

[08:59 - 09:03]
this image right here. And I just wanted

[09:01 - 09:05]
to see if I could get some even better

[09:03 - 09:07]
looking images because I didn&#39;t like how

[09:05 - 09:09]
this one is looking off in this

[09:07 - 09:11]
direction. Same here. I like these.

[09:09 - 09:13]
They&#39;re looking straight on. And I like

[09:11 - 09:15]
this one right here that it&#39;s looking

[09:13 - 09:16]
off camera, which is what you&#39;d want

[09:15 - 09:18]
your characters to be doing because

[09:16 - 09:20]
again, we want to think about cinematic

[09:18 - 09:22]
films. We&#39;re not doing photo shoots.

[09:20 - 09:24]
Now, these images would be great for

[09:22 - 09:26]
something like an avatar, but the off-

[09:24 - 09:28]
camerara look is something that&#39;s going

[09:26 - 09:30]
to work better for something you&#39;re

[09:28 - 09:32]
creating that&#39;s meant to be cinematic.

[09:30 - 09:35]
Now, here&#39;s where we get to problem

[09:32 - 09:38]
number one. Again, I think all of these

[09:35 - 09:41]
images came out pretty good, but as some

[09:38 - 09:44]
of you may have surmised, the obvious

[09:41 - 09:46]
problem is that all of these images of

[09:44 - 09:49]
this blaster are not the same. Pretty

[09:46 - 09:52]
much every single image, other than

[09:49 - 09:54]
maybe slight variations in the ones that

[09:52 - 09:56]
I ran as variations, have a very

[09:54 - 09:58]
different look. So, what does that

[09:56 - 10:01]
translate to? That means that every time

[09:58 - 10:03]
you run this image, it&#39;s going to give

[10:01 - 10:06]
you a different blaster. And maybe your

[10:03 - 10:07]
next question is this. Well, Paul Donis,

[10:06 - 10:10]
why don&#39;t you just take the image that

[10:07 - 10:13]
you like, use that as the omni

[10:10 - 10:15]
reference, and then maybe, just maybe,

[10:13 - 10:17]
all of the following images that you&#39;ll

[10:15 - 10:19]
generate will be with that same blaster,

[10:17 - 10:21]
right? Well, I&#39;ve already gotten ahead

[10:19 - 10:23]
of you in that thinking, and the answer

[10:21 - 10:25]
is a big fat no. So, check this out. And

[10:23 - 10:26]
so what I did is I took one of the

[10:25 - 10:29]
images that I really liked over to

[10:26 - 10:30]
Freepick and upscaled it and then

[10:29 - 10:32]
removed the background because in

[10:30 - 10:34]
another image that I&#39;ll show you in a

[10:32 - 10:36]
minute, Midourney was having issues with

[10:34 - 10:39]
what was already going on with the image

[10:36 - 10:40]
and making it do something completely

[10:39 - 10:41]
different. I&#39;ll explain in a minute. Let

[10:40 - 10:44]
me just go ahead and run through with

[10:41 - 10:46]
this. So to avoid any confusion, again,

[10:44 - 10:48]
I removed the background. I&#39;ve got the

[10:46 - 10:50]
blaster in my hand. It&#39;s the same exact

[10:48 - 10:52]
avatar that I used, the one that I

[10:50 - 10:54]
created in Craya. I then uploaded that

[10:52 - 10:57]
image, the one you see right here, which

[10:54 - 10:59]
by the way, it actually did work with

[10:57 - 11:01]
this image without the background

[10:59 - 11:03]
removed. But as I&#39;m going to show you in

[11:01 - 11:05]
this particular set right here, Mid

[11:03 - 11:07]
Journey was having problems trying to

[11:05 - 11:09]
get what I needed because of what was

[11:07 - 11:11]
already in the original image. So, I did

[11:09 - 11:12]
that a bit later. But yeah, let me go

[11:11 - 11:14]
ahead and just show you this right

[11:12 - 11:16]
quick. So, here&#39;s the blaster. It kind

[11:14 - 11:18]
of looks similar to the one that I

[11:16 - 11:20]
uploaded, but a lot of the images don&#39;t

[11:18 - 11:22]
turn out exactly the same. Like that

[11:20 - 11:25]
blaster right there does not look like

[11:22 - 11:28]
the one that I uploaded. So, the problem

[11:25 - 11:30]
is even if you take the image with you

[11:28 - 11:32]
holding the sword that you want or the

[11:30 - 11:35]
weapon that you want, it&#39;s likely not

[11:32 - 11:37]
going to generate the look exactly. And

[11:35 - 11:39]
I don&#39;t like any of these images at all.

[11:37 - 11:40]
And what I was starting to notice as I

[11:39 - 11:43]
was running through this testing is that

[11:40 - 11:44]
the image quality started to drop. And I

[11:43 - 11:46]
don&#39;t know if it&#39;s because a lot of

[11:44 - 11:48]
people are using midjourney at this

[11:46 - 11:50]
moment testing out the omniresence

[11:48 - 11:51]
feature, but I&#39;ll go up here and show

[11:50 - 11:54]
you the one that I did where I removed

[11:51 - 11:56]
the background and same prompt. He walks

[11:54 - 11:58]
through a massive brightly lit cargo bay

[11:56 - 12:01]
of a spaceship and it&#39;s not even

[11:58 - 12:03]
generating me holding the blaster. And

[12:01 - 12:05]
again, as you see, the image quality is

[12:03 - 12:07]
starting to drop. And I was noticing

[12:05 - 12:09]
this more as I was doing more of the

[12:07 - 12:11]
testing, but the blaster is not being

[12:09 - 12:13]
held across my chest. Same instance

[12:11 - 12:14]
right here with these images. Doesn&#39;t

[12:13 - 12:17]
look good. Doesn&#39;t look like the

[12:14 - 12:19]
blaster. Looks like a blaster, not the

[12:17 - 12:21]
blaster in the photo. And again, as you

[12:19 - 12:23]
can see that noise in the photo, the

[12:21 - 12:26]
image quality just started getting

[12:23 - 12:28]
ridiculous. So basically what needs to

[12:26 - 12:31]
happen is that there needs to be an

[12:28 - 12:34]
omniomni reference. basically something

[12:31 - 12:37]
like you could do with cling elements to

[12:34 - 12:39]
where you have your character and you

[12:37 - 12:41]
have an object and then you combine the

[12:39 - 12:43]
object and the character together. That

[12:41 - 12:46]
would be the most optimum solution for

[12:43 - 12:49]
this because once again, it&#39;s great that

[12:46 - 12:51]
you can get all of these cool photos of

[12:49 - 12:53]
you holding this blaster, but it&#39;s not

[12:51 - 12:55]
going to hold up in different scenes.

[12:53 - 12:57]
It&#39;s not going to make for something

[12:55 - 12:59]
that&#39;s consistent other than yourself. I

[12:57 - 13:01]
hope that makes sense. Another tip that

[12:59 - 13:04]
I will give you is that you want to make

[13:01 - 13:06]
sure that you have a very clean and

[13:04 - 13:08]
brightly lit image so that Midjourney

[13:06 - 13:10]
can see the face of the character

[13:08 - 13:12]
exactly. This was the particular image

[13:10 - 13:14]
that I was trying to use in the Omni

[13:12 - 13:17]
reference for what I was just showing

[13:14 - 13:19]
you. I mean honestly to me I can see the

[13:17 - 13:22]
face very clearly. Everything looks

[13:19 - 13:25]
pretty spot-on. But as you can see,

[13:22 - 13:28]
midjourney had some difficulty trying to

[13:25 - 13:30]
get the face exactly even with the omni

[13:28 - 13:34]
reference weight at 1,00. That still

[13:30 - 13:37]
needs some work. Also tried it by using

[13:34 - 13:38]
an aspect ratio of 2x3 and this is what

[13:37 - 13:41]
I got. I like that photo right there,

[13:38 - 13:43]
but again, it doesn&#39;t resemble the

[13:41 - 13:45]
reference image and they all just end up

[13:43 - 13:47]
looking pretty different. I would say

[13:45 - 13:49]
this image right here closely resembles

[13:47 - 13:51]
the image that I showed you. But the

[13:49 - 13:53]
face is too dark. You can&#39;t see the

[13:51 - 13:56]
features highlighted. So, it&#39;s pretty

[13:53 - 13:59]
unusable. And that was the final image

[13:56 - 14:01]
in that set. But you can see that it is

[13:59 - 14:02]
following the prompt which says walking

[14:01 - 14:04]
through the hallway of a futuristic

[14:02 - 14:06]
spaceship. So, we are moving in the

[14:04 - 14:08]
right direction. But again, still needs

[14:06 - 14:10]
work. Here&#39;s another example I want to

[14:08 - 14:12]
show you where I took two different

[14:10 - 14:14]
images and created this set right here.

[14:12 - 14:16]
And what I did was I used this

[14:14 - 14:19]
particular image that I had uploaded as

[14:16 - 14:22]
a style reference. So I moved that right

[14:19 - 14:24]
here. And then I took my character Danny

[14:22 - 14:27]
and used her in the omni reference slot.

[14:24 - 14:30]
And these were the images that I got.

[14:27 - 14:31]
Okay, this one has her mouth closed, but

[14:30 - 14:33]
I mean it&#39;s the same person just in case

[14:31 - 14:35]
anybody wants to point that out. But as

[14:33 - 14:37]
you can see, you can get some

[14:35 - 14:39]
interesting different looks going this

[14:37 - 14:41]
particular route. Now here&#39;s an example

[14:39 - 14:43]
of one where I used a weapon again. And

[14:41 - 14:45]
this one was the image reference of a

[14:43 - 14:47]
sword. This is what the sward looks

[14:45 - 14:50]
like. I actually created this sward with

[14:47 - 14:52]
Midjourney. It&#39;s got a steampunk theme

[14:50 - 14:55]
about it. And what I wanted to do is put

[14:52 - 14:57]
the sward in the hand of my character,

[14:55 - 15:00]
which is the next problem that we run

[14:57 - 15:01]
into with this omni reference feature.

[15:00 - 15:05]
Again, as we mentioned, you can

[15:01 - 15:07]
reference the sword, but the problem is

[15:05 - 15:09]
you cannot reference the character. So,

[15:07 - 15:11]
if you had an avatar of yourself that

[15:09 - 15:13]
you wanted to portray holding this

[15:11 - 15:16]
sword, since you don&#39;t have the option

[15:13 - 15:19]
to add multiple elements at this time,

[15:16 - 15:22]
you would not be able to do that. And

[15:19 - 15:24]
that in turn means that each image you

[15:22 - 15:27]
get is going to be of someone completely

[15:24 - 15:28]
different, but potentially holding the

[15:27 - 15:30]
sword that you want. Because, as you can

[15:28 - 15:32]
see, that looks close to the sword that

[15:30 - 15:34]
I uploaded. That looks close to it. It&#39;s

[15:32 - 15:37]
a little bit more overdone. That does

[15:34 - 15:40]
not. That does not. That looks like it

[15:37 - 15:42]
from somewhat of a perspective, but the

[15:40 - 15:44]
sword looks bent. But I&#39;ll show you the

[15:42 - 15:46]
ones that I thought came out really

[15:44 - 15:48]
well, like this one right here. Could

[15:46 - 15:51]
have been a great image to use. But

[15:48 - 15:54]
again, it&#39;s completely useless because I

[15:51 - 15:57]
can&#39;t use this same person in any other

[15:54 - 15:59]
image. And as I&#39;ve shown you, even if I

[15:57 - 16:01]
took this image, took it to Freepick,

[15:59 - 16:03]
removed the background, it&#39;s likely not

[16:01 - 16:05]
going to work. So that remains a huge

[16:03 - 16:07]
problem. And as you can see over here,

[16:05 - 16:09]
this is where I get into using the

[16:07 - 16:10]
prompt structure from the AI

[16:09 - 16:13]
cinematographers midjourney playbook.

[16:10 - 16:17]
This is a bit overkill because I also

[16:13 - 16:18]
used chat GBT and told my AI assistant

[16:17 - 16:20]
to give me a prompt. And this is

[16:18 - 16:24]
actually a prompt that I just rerolled

[16:20 - 16:26]
that I had in version 6.1 of Midjourney.

[16:24 - 16:28]
So, it looks completely different from

[16:26 - 16:30]
the image that I originally had, and it

[16:28 - 16:32]
actually looks a lot better. Here&#39;s

[16:30 - 16:35]
another example of a sword that closely

[16:32 - 16:37]
resembles the one that I&#39;m using as Omni

[16:35 - 16:39]
reference. But I would say this one

[16:37 - 16:41]
right here is an even better depiction.

[16:39 - 16:42]
But I know I&#39;m starting to sound

[16:41 - 16:44]
repetitive. That ain&#39;t the same dude

[16:42 - 16:47]
from the other photos. Okay, now to the

[16:44 - 16:49]
set where Midjourney was having problems

[16:47 - 16:51]
trying to give me exactly what I was

[16:49 - 16:54]
asking for. This is the image that I

[16:51 - 16:56]
used as the omni reference that I

[16:54 - 16:58]
actually created within MidJourney. The

[16:56 - 17:00]
only thing I did was download the image

[16:58 - 17:03]
and then upload it back to Midjourney

[17:00 - 17:05]
and then used it over here by dragging

[17:03 - 17:07]
it to the Omni reference. And this was

[17:05 - 17:08]
the first set I tested. The prompt was

[17:07 - 17:10]
very simple. It says flying through deep

[17:08 - 17:13]
space. I&#39;ve got the Omni reference

[17:10 - 17:15]
weight at 1,00. And as you can see, it&#39;s

[17:13 - 17:18]
mimicking that image that I added where

[17:15 - 17:20]
it&#39;s got the sand below as the aircraft

[17:18 - 17:23]
is flying above. And again, here&#39;s where

[17:20 - 17:25]
we got into the issue of the image

[17:23 - 17:27]
quality taking a hit. Same thing with

[17:25 - 17:29]
this one. It&#39;s like the images didn&#39;t

[17:27 - 17:31]
finish rendering. And again, maybe

[17:29 - 17:33]
MidJourney is having some issues going

[17:31 - 17:36]
on on their side. And same thing right

[17:33 - 17:38]
here. So, what I decided to do was take

[17:36 - 17:40]
the image, this one right here that I

[17:38 - 17:43]
just showed you over to Freepick and

[17:40 - 17:45]
upscale the image because I was thinking

[17:43 - 17:46]
that maybe if the image is sharper,

[17:45 - 17:48]
because I didn&#39;t upscale the image that

[17:46 - 17:50]
I added as an Omni reference. I just

[17:48 - 17:52]
downloaded it from Midjourney. Figured

[17:50 - 17:54]
that hey, maybe if I upscale it to 4K

[17:52 - 17:56]
that will help with that. And then I

[17:54 - 17:59]
also removed the background so that

[17:56 - 18:01]
midjourney doesn&#39;t get confused. So now

[17:59 - 18:02]
you see the aircraft only and there&#39;s no

[18:01 - 18:04]
sand beneath it. And I&#39;m going to show

[18:02 - 18:06]
you the one that I did where I removed

[18:04 - 18:08]
the background because as you can see

[18:06 - 18:10]
with these down here, I reran it and it

[18:08 - 18:13]
did a bit better when I changed the

[18:10 - 18:16]
prompt by saying flying through dark

[18:13 - 18:17]
deep space where only distant stars are

[18:16 - 18:20]
present. was a little bit better, but

[18:17 - 18:22]
you still see it kind of thinks that

[18:20 - 18:25]
it&#39;s close to the ground or in near

[18:22 - 18:27]
orbit. And you still have the quality

[18:25 - 18:29]
taking a hit on the image generations as

[18:27 - 18:31]
you can see right there. That just looks

[18:29 - 18:33]
terrible. So, this is the one that I did

[18:31 - 18:35]
where I removed the background. It

[18:33 - 18:37]
follows the prompt much better. Same

[18:35 - 18:39]
prompt, flying through dark, deep space

[18:37 - 18:41]
where only distant stars are present.

[18:39 - 18:44]
But you can see the image quality is

[18:41 - 18:46]
absolute [ __ ] No good. No good. No

[18:44 - 18:48]
good. Another thing that I tried is to

[18:46 - 18:50]
upscale the image within MidJourney.

[18:48 - 18:52]
That was somewhat better, but we know

[18:50 - 18:54]
those images aren&#39;t supposed to be

[18:52 - 18:56]
looking like that. Another thing I did

[18:54 - 18:58]
is took one of those images that looked

[18:56 - 19:00]
like crap and thought, &quot;Okay, well,

[18:58 - 19:03]
let&#39;s see what happens if we upscale it

[19:00 - 19:04]
to 4K in Freepick.&quot; No bueno. So, just

[19:03 - 19:06]
wanted to run through some things to

[19:04 - 19:07]
show you that, you know, if you were

[19:06 - 19:08]
thinking about doing some of the things

[19:07 - 19:10]
that I&#39;ve already shown you right here,

[19:08 - 19:12]
I&#39;m hoping to save you some time by

[19:10 - 19:13]
showing you that that [ __ ] wasn&#39;t going

[19:12 - 19:15]
to work. Now, this next thing that I&#39;m

[19:13 - 19:17]
going to show you is going to be a bit

[19:15 - 19:19]
of a disappointment. I took a screenshot

[19:17 - 19:21]
of this on X when someone made this

[19:19 - 19:24]
comment on MidJourney&#39;s account, and

[19:21 - 19:25]
this was April 10th. The guy says, &quot;You

[19:24 - 19:27]
guys need to ease up on your

[19:25 - 19:29]
restrictions. Some people are trying to

[19:27 - 19:30]
use AI to tell a story, and not all

[19:29 - 19:34]
stories are for the preschool age

[19:30 - 19:35]
range.&quot; I agree 110%. I keep getting

[19:34 - 19:38]
notifications about restrictions and

[19:35 - 19:40]
pop-ups warning me that you&#39;re trying to

[19:38 - 19:42]
keep it PG-13. Midjourney responded to

[19:40 - 19:45]
him by saying, &quot;We&#39;ve updated our

[19:42 - 19:48]
moderation with version 7 and it should

[19:45 - 19:51]
let 70% more things through now because

[19:48 - 19:53]
the model itself is much more safe.&quot;

[19:51 - 19:55]
Still more to come, but in the meantime,

[19:53 - 19:56]
if you can give us a list of prompts

[19:55 - 19:58]
you&#39;re having issues with, that&#39;ll help.

[19:56 - 20:01]
Thanks. And I actually posted that

[19:58 - 20:03]
update on my YouTube community feed

[20:01 - 20:05]
showing this example right here that

[20:03 - 20:07]
would have generally been censored by

[20:05 - 20:09]
MidJourney in the past. And if you guys

[20:07 - 20:12]
remember the Higsfield AI music video

[20:09 - 20:14]
that I did, this particular character,

[20:12 - 20:17]
which I upscaled and made look a lot

[20:14 - 20:20]
better in Freepic, as you can see right

[20:17 - 20:22]
here, that image is the exact same image

[20:20 - 20:24]
from MidJourney. I just brought it over

[20:22 - 20:27]
here and upscaled it. As I mentioned to

[20:24 - 20:28]
you guys, if you use Freepix&#39;s classic

[20:27 - 20:30]
upscaler, and I&#39;ll just show you this

[20:28 - 20:32]
right quick. So, if you click upscale

[20:30 - 20:35]
and you click the classic one and you do

[20:32 - 20:36]
a subtle or a wild upscale, it&#39;s nine

[20:35 - 20:38]
times out of 10 going to make your

[20:36 - 20:41]
midjourney characters look much more

[20:38 - 20:43]
attractive. Just FYI. But again, I

[20:41 - 20:45]
created something like this within

[20:43 - 20:47]
midjourney as well as something like

[20:45 - 20:50]
this in the past. And this was

[20:47 - 20:52]
Midjourney version 6.1. So, it was

[20:50 - 20:55]
before version 7. Here&#39;s where I&#39;m

[20:52 - 20:57]
going. So, I wanted to take this image

[20:55 - 21:00]
that I created within MidJourney, right?

[20:57 - 21:02]
First off, tried uploading the exact

[21:00 - 21:05]
same image that I downloaded from

[21:02 - 21:07]
MidJourney. No bueno. Our moderators

[21:05 - 21:09]
aren&#39;t sure this image fits with our

[21:07 - 21:11]
community guidelines. Okay. Well, let&#39;s

[21:09 - 21:13]
go with the workaround because again, we

[21:11 - 21:15]
created this image within MidJourney,

[21:13 - 21:17]
right? And as you guys can see where I&#39;m

[21:15 - 21:19]
already going with this because you

[21:17 - 21:23]
already see the censored messages right

[21:19 - 21:26]
here. I went to the image itself and the

[21:23 - 21:28]
only thing I did was say use image. The

[21:26 - 21:31]
image showed up right here and I drag it

[21:28 - 21:35]
over to omni reference and the only

[21:31 - 21:38]
thing I said was pull side and bam an

[21:35 - 21:40]
image in your prompt was denied. Please

[21:38 - 21:42]
try again with a different image. And as

[21:40 - 21:44]
you can see right here, that&#39;s what I

[21:42 - 21:46]
got. That&#39;s what happened right here.

[21:44 - 21:49]
And that&#39;s what happened with the exact

[21:46 - 21:50]
same process that I followed where I

[21:49 - 21:52]
went to the image that I already created

[21:50 - 21:55]
within MidJourney, clicked on it, said

[21:52 - 21:58]
use the image and I used a very simple

[21:55 - 22:00]
prompt that said poolside. And so what I

[21:58 - 22:03]
did was I went over to my X account. I

[22:00 - 22:05]
added Midjourney and I was like, hey,

[22:03 - 22:07]
what the hell? We can&#39;t even use the

[22:05 - 22:09]
images we created within MidJourney for

[22:07 - 22:11]
Omni Reference. I thought you guys said

[22:09 - 22:13]
you dialed back on the over moderation.

[22:11 - 22:15]
And I posted this photo and I posted

[22:13 - 22:17]
right here where the prompt wasn&#39;t

[22:15 - 22:19]
crazy. I&#39;m clearly showing that I made

[22:17 - 22:21]
the image within MidJourney and they&#39;re

[22:19 - 22:23]
denying the image. So, let&#39;s see if they

[22:21 - 22:25]
get back to me. Let&#39;s see if they do

[22:23 - 22:27]
something about this. I had an issue to

[22:25 - 22:30]
where I realized that I don&#39;t even have

[22:27 - 22:33]
permission to post in their MidJourney

[22:30 - 22:36]
Discord server despite being subscribed

[22:33 - 22:39]
to them way early in 2023. But I&#39;ve

[22:36 - 22:41]
never really used the Discord server for

[22:39 - 22:43]
posting anything. So, I didn&#39;t really

[22:41 - 22:45]
think about it until right now. So, now

[22:43 - 22:47]
that I actually have permission to post

[22:45 - 22:50]
in the servers, I&#39;m going to come to the

[22:47 - 22:52]
channel, post my gripe, see if they do

[22:50 - 22:54]
anything about it. So, essentially,

[22:52 - 22:57]
they&#39;ve eased up on the moderation on

[22:54 - 23:00]
the image creation side, but they also

[22:57 - 23:03]
need to chill on the moderation on the

[23:00 - 23:04]
omnire side. Hope that makes sense. So,

[23:03 - 23:06]
guys, what are your thoughts about this

[23:04 - 23:08]
new omni reference feature? Does this

[23:06 - 23:10]
essentially do away with Laura&#39;s? Let me

[23:08 - 23:13]
know your thoughts in the comments below

[23:10 - 23:15]
this video. And as always, if you found

[23:13 - 23:18]
this walkthrough, this review, this

[23:15 - 23:20]
tutorial helpful for you and your AILM

[23:18 - 23:22]
endeavors, then be sure to subscribe to

[23:20 - 23:25]
the channel and also click that thumbs

[23:22 - 23:27]
up button to let YouTube know that you

[23:25 - 23:30]
enjoy videos like this and you want to

[23:27 - 23:31]
be alerted about similar videos from

[23:30 - 23:33]
this channel in the future. So once

[23:31 - 23:35]
again, this is Paul Donis Maximus.

[23:33 - 23:38]
Thanks for checking out this video.

[23:35 - 23:38]
Please join me in the next

## コメント

### 1. @theaifilmmakingadvantage (👍 0)
💥 Midjourney Magic, Hollywood Style. Steal my $100M filmmaking playbook for AI images that wow. 🔥 Camera moves, lighting secrets, drop-dead gorgeous consistent characters, passive AI filmmaker income – it's ALL inside. Plus, my handcrafted viral AI film director prompts vault, FREE. Special beta-launch promo pricing ending soon! Enroll NOW → https://aifilmmakingadvantage.com/enroll-today

> **@marcozolo3536** (👍 2): Cool video. Btw Veo 3 just dropped. Cheers man.

### 2. @jaykaslo (👍 2)
Solid demo. Thanks for keeping it real.

> **@theaifilmmakingadvantage** (👍 1): @@jaykaslo appreciate the feedback! 

### 3. @Varchesis (👍 2)
I tried making a kids book with cartoon characters and it told me that the prompt was not allowed for moderation whenever I mentioned a young girl haha. The young boy was allowed every time. Really regret my last yearly sub to MJ with everything else moving so fast. Thanks for showing your results!

> **@theaifilmmakingadvantage** (👍 0): @@Varchesis give them that feedback in their #ai-mod-bugs Discord channel

> **@pinkyabuse** (👍 0): @@Varchesis If it makes you feel any better, I also got a yearly sub to Midjourney and regret it.

> **@theaifilmmakingadvantage** (👍 0): Man, I only pay for Midjourney on a monthly basis and have never canceled! Not sure what your use case is. But ChatGPT and Flux don’t even come close to

### 4. @ronpetersen2317 (👍 1)
I would love to see you tackle ChatGPT's new image generator. It seems to be able to do consistent characters and looks with out even trying. Some issues though are it doesn't seem to do 16:9 aspect ratio which is weird and I found in the same session it will bring in elements from previous generations even if you are not prompting for them to be there. The images are not quite as dramatic as midjourney but the consistency is effortless.

> **@theaifilmmakingadvantage** (👍 0): I don't know man, lol. You may want to take a look at this: "ChatGPT prompted 74 times. 'Create the exact replica of this image, do not change a thing.' This is why I say you need to start a new chat after each edit 🤣" https://x.com/AIWarper/status/1916932369376022597

> **@grilloyoo** (👍 0): China has a clone coming out soon ​@@theaifilmmakingadvantage

### 5. @KeltriusuniverseAI (👍 3)
Thank you again, brother 👍

> **@theaifilmmakingadvantage** (👍 0): @@KeltriusuniverseAI 

### 6. @theaifilmmakingadvantage (👍 0)
00:00  Intro – Why I Don’t Trust the Hype Train  
00:39  Quick Oref Jumpstart – Where to Click, What to Drag  
02:10  Weight-100 Test – “Danny-ish” Coffee Break  
03:57  Weight-400 Test – Closer, But Hands Still Weird  
05:29  Weight-1000 Test – Nailed the Face, Finally  
07:04  Avatar + Blaster – When Objects Go Rogue  
09:18  Consistency FAIL – Every Blaster Looks Different  
11:08  Sword Experiment – Single-Image Limit Hits Hard  
13:30  Spaceship Stress Test – Quality Nosedive & Fixes  
16:25  Over-Moderation Saga – My Image Gets Censored?!  
19:40  Work-arounds & Upscaling Tricks That Help  
21:28  Verdict – Is Oref a LoRA-Killer or Just Beta?

### 7. @jbpinvestigations (👍 1)
I understand that censorship can be a complete pain as I, myself, have had many things blocked/failed simply because of the word "Kill" when describing hair. The exact phrasing was "Killer Hair" (Not in Midjourney). I also understand that there are a lot of sick MF's in this world too. It's sad that those of us who are trying to do something honest are being denied because of those sick bastards. I only expect moderation to get worse IMO.

> **@theaifilmmakingadvantage** (👍 0): @@jbpinvestigations you can also use ChatGPT to help refine the prompt so that (if you a truly not trying to generate anything crazy) you can get past the AI mods while retaining the essence of your prompt

### 8. @94regnar (👍 1)
At this point, I've grown tired of the moderation, it's flagging everything, I could understand if I was uploading nudity or seductive poses, it's consistently flagging images that where created in Midjourney.  One thing that's always be funny, Midjourney is the one image creator that's heavily moderated but, it's the one that generates nudity when your not asking for it.

### 9. @paulcoonan (👍 2)
I haven't used Midjourney for a couple years. I've found content moderation to be a big issue. Anything over pg13 was brought up in this vid however I have the opposite issue and need to know, before I give money to MJ, if I will be able to do what I need to do. I'm creating children's stories. I have a character in 3d Disney/Pixar style who is the main character and she is about 7 years old. I've found too many closed AI platforms that freak out on anything that even resembles a child. Where is MJ now on this? Anyone?

> **@theaifilmmakingadvantage** (👍 0): @@paulcoonan hey, thanks for the comment. Someone mentioned something like this on a previous comment on this video. Please see that one, as well as my reply/recommendation 👌

### 10. @edwardferry8247 (👍 0)
Why are so many of these generators now making images that look like green screen cutouts, consistent character references are great but the lighting is utterly dreadful.

> **@theaifilmmakingadvantage** (👍 0): Find their Discord channels and give them this feedback. For now, it's what we've got 🤷🏾‍♂️

> **@edwardferry8247** (👍 0): @ Midjourney clearly state they aren’t a democracy, it’s in their main terms, they could care less, we all know that. I have used them for years and I enjoy the product within its limits. They are all rushing for character consistency but it relies upon vast quantities of training data to produce good standard images. Simple basic training of LORAs through something like Krea would do better than Midjourney ever could, it looks plastic because it’s short cutting the reality of what’s truly necessary for consistency, data.

### 11. @grilloyoo (👍 0)
Moderation errors galore, mediocre update

