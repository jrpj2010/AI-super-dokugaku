# $2.4M of Prompt Engineering Hacks in 53 Mins (GPT, Claude)

**チャンネル:** Nick Saraev
**公開日:** 2025-03-05
**URL:** https://www.youtube.com/watch?v=CxbHw93oWP0

## 説明

Join Maker School & get your first automation customer ⤵️
https://www.skool.com/makerschool/about

Watch me build my $300K/mo business live with daily videos + strategy ⤵️
https://www.youtube.com/@nicksaraevdaily

Summary ⤵️
In this video I'll run you through over six years (and several million dollars worth) of prompt engineering. I started with GPT-2 back in 2019, and have been using AI to make money ever since—so along the way I've naturally picked up quite a few AI & prompt engineering tips!

My software, tools, & deals (some give me kickbacks—thank you!)
🚀 Instantly: https://link.nicksaraev.com/instantly-short
📧 Anymailfinder: https://link.nicksaraev.com/amf-short
🤖 Apify: https://console.apify.com/sign-up (30% off with code NICK30)
🧑🏽💻 n8n: https://n8n.partnerlinks.io/h372ujv8cw80
📈 Rize: https://link.nicksaraev.com/rize-short (25% off with promo code NICK)

Other places you can find me 😈
📸 Instagram: https://www.instagram.com/nick_saraev
🕊️ Twitter/X: https://twitter.com/nicksaraev
🤙 Blog: https://nicksaraev.com

Why watch?
If this is your first view—hi, I’m Nick! TLDR: I spent six years building automated businesses with Make.com (most notably 1SecondCopy, a content company that hit 7 figures). Today a lot of people talk about automation, but I’ve noticed that very few have practical, real world success making money with it. So this channel is me chiming in and showing you what *real* systems that make *real* revenue look like.

Hopefully I can help you improve your business, and in doing so, the rest of your life 🙏

Like, subscribe, and leave me a comment if you have a specific request! Thanks.

Chapters
00:00:00 Introduction to Prompt Engineering
00:00:16 Transitioning from Consumer to Playground Models
00:01:52 Optimizing Prompt Length for Better Performance
00:04:59 Simplifying Your Prompts
00:11:32 Understanding Prompt Types
00:15:41 Utilizing One and Few Shot Prompting
00:19:20 Conversational Engines vs Knowledge Engines
00:22:53 The Importance of Unambiguous Language
00:26:24 The Spartan Tone of Voice
00:27:12 Iterating Prompts with Data
00:32:34 Defining Output Formats Clearly
00:35:21 Avoiding Conflicting Instructions
00:36:42 Learning Data Formats: XML, JSON, CSV
00:42:23 Key Prompt Structure for Success
00:46:41 Generating Examples for AI
00:48:37 Choosing the Right Model for the Task
00:51:57 Conclusion and Call to Action

## 字幕

[00:00 - 00:03]
here is 6 years of prompt Engineering in

[00:01 - 00:06]
just 53 minutes I started working with

[00:03 - 00:08]
AI back in 2019 using gpd2 and since

[00:06 - 00:09]
then I built a number of successful

[00:08 - 00:11]
service and Consulting businesses the

[00:09 - 00:14]
first that did 92,000 bucks a month the

[00:11 - 00:16]
second that did $72,000 a month and my

[00:14 - 00:18]
current which just did $139,000 last

[00:16 - 00:19]
month so I know how to build prompts for

[00:18 - 00:21]
business purposes and the goal of this

[00:19 - 00:22]
video is just to dump my brain and give

[00:21 - 00:24]
it to you I want to give you everything

[00:22 - 00:26]
that I know about prompt Engineering in

[00:24 - 00:27]
as quick and as compressed a format as

[00:26 - 00:28]
possible if you don't know me my name is

[00:27 - 00:30]
Nick and my whole thing is cut in the

[00:28 - 00:31]
fluff so let's get into it so we're

[00:30 - 00:33]
going to be doing this whiteboard style

[00:31 - 00:35]
I'm going to be covering both very deep

[00:33 - 00:36]
foundational underpinnings of how llms

[00:35 - 00:39]
work and I'm also going to be covering

[00:36 - 00:41]
some more tactical actionable advice for

[00:39 - 00:42]
beginners and novices um so we're going

[00:41 - 00:44]
to have a good blend of both the very

[00:42 - 00:45]
first thing that I want to cover right

[00:44 - 00:47]
off the bat and this is this will

[00:45 - 00:49]
immediately improve your ability to

[00:47 - 00:52]
prompt engineer is instead of using the

[00:49 - 00:54]
consumer models use the playground or

[00:52 - 00:56]
workbench versions of these

[00:54 - 00:58]
models so if you're

[00:56 - 01:01]
unfamiliar to keep a to make a long

[00:58 - 01:03]
story short this is Chachi BT this is

[01:01 - 01:05]
the consumer model this is what open aai

[01:03 - 01:07]
the big artificial intelligence company

[01:05 - 01:09]
is marketing to people and selling for a

[01:07 - 01:11]
monthly subscription because this is a

[01:09 - 01:13]
consumer model they've made a bunch of

[01:11 - 01:14]
decisions to try and optimize

[01:13 - 01:17]
performance for the widest number of

[01:14 - 01:18]
people those decisions include they

[01:17 - 01:20]
actually insert a bunch of stuff into

[01:18 - 01:22]
your prompt that you can't see and that

[01:20 - 01:23]
you don't know about so if you really

[01:22 - 01:25]
want to get good at prompt engineering

[01:23 - 01:27]
you need to stop using the consumer

[01:25 - 01:30]
models okay stop using chat GPT stop

[01:27 - 01:33]
using Claud and instead start using

[01:30 - 01:35]
their API playground or workbench models

[01:33 - 01:39]
so this is chat

[01:35 - 01:42]
GPT this is platform. open.com

[01:39 - 01:43]
playground chat and as we see here

[01:42 - 01:45]
there's a lot more that we can

[01:43 - 01:48]
manipulate on the right hand side we

[01:45 - 01:50]
have a variety of uh different tools we

[01:48 - 01:53]
can select model types we can select

[01:50 - 01:55]
response formats we can add functions we

[01:53 - 01:58]
can configure our models with Randomness

[01:55 - 02:00]
temperature max tokens stop sequences

[01:58 - 02:01]
top P frequency penalty and presence

[02:00 - 02:03]
penalties if you don't know what all

[02:01 - 02:05]
this stuff is don't worry too much about

[02:03 - 02:07]
it right now in addition you also get to

[02:05 - 02:09]
insert your own system message and then

[02:07 - 02:12]
you have the choice of being able to add

[02:09 - 02:13]
user or assistant messages too so I

[02:12 - 02:14]
guess the point I'm making to make a

[02:13 - 02:16]
long story short is this is really where

[02:14 - 02:17]
you get into the engineering side of

[02:16 - 02:19]
prompt engineering if all you're doing

[02:17 - 02:22]
is communicating with the bass you know

[02:19 - 02:23]
Claude Haiku or Sonet um or the chat GPT

[02:22 - 02:25]
model you're just leaving a lot on the

[02:23 - 02:26]
table so right off the GetGo if you

[02:25 - 02:28]
could take one thing out of this video

[02:26 - 02:29]
it's just move over to the API

[02:28 - 02:30]
playground versions you're going to have

[02:29 - 02:32]
a lot more juice that you could squeeze

[02:30 - 02:34]
the second thing I want to talk about is

[02:32 - 02:36]
that model performance a lot of people

[02:34 - 02:39]
don't fully understand this but model

[02:36 - 02:42]
performance decreases with prompt

[02:39 - 02:45]
length so there's

[02:42 - 02:47]
actually a hack that you can do to

[02:45 - 02:49]
immediately boost the quality of all of

[02:47 - 02:52]
your outputs and that's just make your

[02:49 - 02:54]
prompt shorter this is a graph here that

[02:52 - 02:57]
shows a variety of models and their

[02:54 - 03:00]
abilities to reason AKA do some task

[02:57 - 03:02]
over the length of the input text input

[03:00 - 03:05]
text in this case is obviously just like

[03:02 - 03:07]
your prompt okay so what are we seeing

[03:05 - 03:08]
here just to break this down right most

[03:07 - 03:11]
people are probably more familiar with

[03:08 - 03:12]
GPT for Gemini Pro than they are with

[03:11 - 03:14]
mistol and stuff like that so maybe just

[03:12 - 03:15]
focus on the green and then the purple

[03:14 - 03:16]
and I mean the Green's the highest

[03:15 - 03:19]
performance maybe we'll just focus on

[03:16 - 03:21]
that what we see happen basically is

[03:19 - 03:24]
that when the input length is

[03:21 - 03:26]
250 accuracy is almost one one means you

[03:24 - 03:28]
know it gets basically everything right

[03:26 - 03:31]
so it's like 0 N9 or something okay and

[03:28 - 03:33]
then the second that we add more okay we

[03:31 - 03:35]
see like basically neutral or maybe a

[03:33 - 03:37]
slight elevation or something between

[03:35 - 03:40]
250 to 500 but basically everything

[03:37 - 03:42]
after that we see a decrease and it just

[03:40 - 03:45]
continues decreasing the entire way

[03:42 - 03:48]
through okay so in this case it's a mile

[03:45 - 03:49]
decrease between 250 and 3,000 um right

[03:48 - 03:53]
I mean if I could quantify this probably

[03:49 - 03:55]
be like 0.4 or something 0.04 sorry

[03:53 - 03:57]
which is probably like a 4% decrease on

[03:55 - 03:59]
the Chain of Thought reasoning um but if

[03:57 - 04:00]
we're using like the basic model gp4

[03:59 - 04:02]
this is the normal thing that you that

[04:00 - 04:05]
you'll call Performance goes down almost

[04:02 - 04:07]
20% right which is pretty

[04:05 - 04:09]
crazy so what does this mean well a

[04:07 - 04:10]
quick and easy hack that you can do to

[04:09 - 04:13]
improve the quality of your outputs is

[04:10 - 04:16]
literally just make your prompts shorter

[04:13 - 04:17]
now you need to also consider that um

[04:16 - 04:19]
you know the more examples you provide

[04:17 - 04:21]
an a model the more context you provide

[04:19 - 04:22]
an a model it also tends to perform

[04:21 - 04:25]
better so what I'm what I'm not telling

[04:22 - 04:26]
you to do is to remove all of the rules

[04:25 - 04:29]
and instructions that you're giving the

[04:26 - 04:31]
model instead what I'm telling you to do

[04:29 - 04:34]
is take the same information and shrink

[04:31 - 04:36]
it basically improve the information

[04:34 - 04:39]
density of the instructions that you're

[04:36 - 04:41]
providing okay this concept in

[04:39 - 04:46]
English is called

[04:41 - 04:47]
AO obfuscation espo elucidation and the

[04:46 - 04:49]
reason why it's written like this is

[04:47 - 04:51]
It's supp supposed to be kind of a joke

[04:49 - 04:52]
right this just means keep it simple

[04:51 - 04:53]
stupid but the person that wrote it

[04:52 - 04:56]
decided to write it in an

[04:53 - 04:58]
extraordinarily verbose way just to show

[04:56 - 05:00]
you how silly it is to write in a way

[04:58 - 05:01]
that's more complicated than normal Al

[05:00 - 05:02]
to make this actionable I'm actually

[05:01 - 05:04]
going to run you guys through a real

[05:02 - 05:07]
example where I pair down and break down

[05:04 - 05:08]
a very verbose prompt into basically

[05:07 - 05:10]
something that says the same thing just

[05:08 - 05:12]
in like a tenth of the words so I have

[05:10 - 05:13]
my playground open over here I've added

[05:12 - 05:15]
a system message that says you're a

[05:13 - 05:18]
helpful intelligent assistant this is

[05:15 - 05:19]
just my goto and I have a very long and

[05:18 - 05:21]
annoying prompt over here all about

[05:19 - 05:22]
content creation I'm going to run you

[05:21 - 05:25]
through it but I'm going to do so using

[05:22 - 05:26]
a tool called wordcounter.net I paste it

[05:25 - 05:28]
all in there and I'm also going to open

[05:26 - 05:31]
up another wordcounter.net so that I can

[05:28 - 05:34]
edit this in um a subsequent page you

[05:31 - 05:37]
guys could see the impact on the length

[05:34 - 05:40]
so right now this prompt is 674 words

[05:37 - 05:43]
okay for informational purposes uh a

[05:40 - 05:46]
word is about 1.3 tokens or so uh

[05:43 - 05:48]
meaning that uh a token is about7 words

[05:46 - 05:49]
this is probably somewhere around 800 or

[05:48 - 05:52]
so tokens okay if we go back to our

[05:49 - 05:55]
graph here you know 800 or so tokens is

[05:52 - 05:57]
already a almost 5% reduction in

[05:55 - 05:59]
accuracy so if we can get this to around

[05:57 - 06:01]
250 tokens instead of 800 if we can cut

[05:59 - 06:04]
this by a third realistically we're

[06:01 - 06:05]
gaining about 5% accuracy or quality

[06:04 - 06:06]
right off the bat and that's going to be

[06:05 - 06:08]
our goal all right so how would I

[06:06 - 06:10]
actually go about pairing this down well

[06:08 - 06:13]
I'm going to save you guys the um

[06:10 - 06:15]
bleeding eyes from reading this whole

[06:13 - 06:16]
thing essentially what I'm doing is I'm

[06:15 - 06:18]
asking this thing to produce some

[06:16 - 06:19]
content for me we're doing it in a very

[06:18 - 06:21]
verbose way for instance it says prompt

[06:19 - 06:23]
for high quality engaging and insightful

[06:21 - 06:25]
content creation we could remove that

[06:23 - 06:28]
completely primary objective and overall

[06:25 - 06:30]
goal of this content request well really

[06:28 - 06:32]
primary objective is a same I'm just

[06:30 - 06:34]
going to say objective it delivers 99%

[06:32 - 06:35]
of the same meaning but we do it in

[06:34 - 06:37]
tenth of the words and in fact we don't

[06:35 - 06:39]
even need objective because we're about

[06:37 - 06:41]
to tell the model what we want it to do

[06:39 - 06:43]
and it's sort of implicit in us talking

[06:41 - 06:44]
to a model that obviously the objective

[06:43 - 06:46]
is what I'm about to tell you okay the

[06:44 - 06:47]
overarching aim of this content

[06:46 - 06:48]
generation request is to produce an

[06:47 - 06:50]
exceptionally well structured highly

[06:48 - 06:51]
informative deeply engaging and

[06:50 - 06:53]
action-oriented piece of content that

[06:51 - 06:54]
lines perfectly with the expectations

[06:53 - 06:57]
needs and desires of my specific target

[06:54 - 06:59]
audience wow does that sound super deep

[06:57 - 07:00]
and well thought out well it's not good

[06:59 - 07:04]
prompts don't look like this good

[07:00 - 07:06]
prompts are much much simpler so remove

[07:04 - 07:10]
this all and say your task is to produce

[07:06 - 07:11]
high quality content the final content

[07:10 - 07:12]
should not only provide value in the

[07:11 - 07:14]
form of information but should also

[07:12 - 07:15]
serve as Authority well research and

[07:14 - 07:17]
compelling resource that the reader or

[07:15 - 07:19]
viewer of this video based can rely for

[07:17 - 07:21]
accurate insightful and practical

[07:19 - 07:23]
knowledge high

[07:21 - 07:25]
quality

[07:23 - 07:27]
authoritative

[07:25 - 07:28]
content the content must be structured

[07:27 - 07:30]
in a way that ensures optimal

[07:28 - 07:32]
readability maximum clar in logical flow

[07:30 - 07:33]
being an effortless for the audience to

[07:32 - 07:35]
digest and implement the concepts being

[07:33 - 07:37]
discussed should also avoid this part's

[07:35 - 07:38]
funny excessive fluff or unnecessary

[07:37 - 07:39]
tangents that do not contribute to the

[07:38 - 07:42]
reader's overall understanding of the

[07:39 - 07:44]
subject matter your task is to produce

[07:42 - 07:47]
high quality authoritative

[07:44 - 07:51]
content that is readable clear and

[07:47 - 07:53]
avoids excessive fluff awesome so we

[07:51 - 07:57]
have delivered the exact same message

[07:53 - 08:00]
we've done so in about 200 or 300 fewer

[07:57 - 08:02]
words okay audience understand the

[08:00 - 08:04]
people this content must resonate with

[08:02 - 08:06]
let's get rid of

[08:04 - 08:08]
that your

[08:06 - 08:12]
audience

[08:08 - 08:12]
is entrepreneurs and business

[08:13 - 08:16]
owners it looks like individuals who

[08:15 - 08:18]
active engage running businesses

[08:16 - 08:20]
particularly those focus on automation

[08:18 - 08:22]
so entrepreneurs and business owners who

[08:20 - 08:23]
care about automation scalability I

[08:22 - 08:26]
don't know that seems kind of vague to

[08:23 - 08:29]
me and operational efficiency I'll say

[08:26 - 08:32]
Automation and operations

[08:29 - 08:35]
you're also writing for technical

[08:32 - 08:36]
professionals let's say Consultants

[08:35 - 08:38]
because odds are they are probably

[08:36 - 08:40]
technical professionals if they are

[08:38 - 08:42]
among the first

[08:40 - 08:44]
group and then time conscious efficiency

[08:42 - 08:46]
driven

[08:44 - 08:47]
individuals I don't really know exactly

[08:46 - 08:48]
what that means but to me it sounds like

[08:47 - 08:49]
fluff so I'm going to get rid of it

[08:48 - 08:51]
given that the audience consists of

[08:49 - 08:52]
Highly capable intelligent professionals

[08:51 - 08:53]
the tone style and depth as content must

[08:52 - 08:55]
be appropriately aligned to match their

[08:53 - 08:56]
expectations avoid condescending

[08:55 - 08:58]
simplifications but also ensure that

[08:56 - 09:01]
even complex concepts are articulated in

[08:58 - 09:01]
a way that remains accessible

[09:01 - 09:10]
so write access write in an

[09:05 - 09:12]
accessible manner perfect okay

[09:10 - 09:13]
guidelines so we could actually get rid

[09:12 - 09:14]
of this whole section to ensure the

[09:13 - 09:16]
generated content achieves the highest

[09:14 - 09:20]
possible standard of quality depth and

[09:16 - 09:20]
Clarity we just say guidelines

[09:20 - 09:27]
okay use a

[09:24 - 09:30]
direct and Ampersand instead of A and D

[09:27 - 09:32]
tone of voice

[09:30 - 09:33]
avoid excessive casualness well that's

[09:32 - 09:35]
what direct and pragmatic means

[09:33 - 09:37]
unnecessary humor well that's what

[09:35 - 09:38]
direct and pragmatic means storytelling

[09:37 - 09:41]
well this actually seems kind of

[09:38 - 09:44]
necessary or new so I'll say avoid

[09:41 - 09:46]
storytelling unless a story serves to

[09:44 - 09:49]
reinforce a key

[09:46 - 09:50]
Insight writing should be clear concise

[09:49 - 09:54]
and free of unnecessary jargon well I

[09:50 - 09:55]
kind of already suggested that given my

[09:54 - 09:58]
previous instruction so I can just get

[09:55 - 09:58]
rid of this

[09:58 - 10:01]
completely okay the content should be

[10:00 - 10:02]
defined divided into well-defined

[10:01 - 10:03]
sections each marked by appropriate

[10:02 - 10:07]
headings and

[10:03 - 10:09]
subheadings so use headings and

[10:07 - 10:14]
subheadings that's

[10:09 - 10:17]
easy use headings subheadings and bullet

[10:14 - 10:19]
points numbered lists and clear

[10:17 - 10:21]
formatting elements very cool Ur a

[10:19 - 10:22]
logical progression from one section to

[10:21 - 10:23]
the next well if it's high quality

[10:22 - 10:25]
authoritative content that's readable

[10:23 - 10:27]
clear and avoids excessive fluff odds

[10:25 - 10:31]
are we're already going to have that

[10:27 - 10:34]
okay depth detail and level of technical

[10:31 - 10:35]
rigor the content must we could just get

[10:34 - 10:36]
rid of that complete and just say go

[10:35 - 10:37]
beyond surface level insights and

[10:36 - 10:40]
generic

[10:37 - 10:41]
advice it should provide unique specific

[10:40 - 10:42]
and highly actionable information that

[10:41 - 10:44]
differentiates it from lower quality

[10:42 - 10:46]
content available elsewhere we can just

[10:44 - 10:50]
get rid of that that is

[10:46 - 10:53]
embedded this is also

[10:50 - 10:56]
embedded and this was already suggested

[10:53 - 10:58]
over here so we just get rid of that

[10:56 - 11:00]
okay do you guys kind of see how this is

[10:58 - 11:04]
working we've already cut this down to

[11:00 - 11:06]
250ish tokens from previously uh which

[11:04 - 11:09]
what I believe was like closer to 800 or

[11:06 - 11:11]
something like that so just in me going

[11:09 - 11:13]
through this prompt line by line and

[11:11 - 11:15]
removing the excessive verbosity it's

[11:13 - 11:17]
called I've already improved the quality

[11:15 - 11:18]
of its outputs by approximately 5%

[11:17 - 11:21]
obviously this depends on the specific

[11:18 - 11:22]
model that you're using but this is one

[11:21 - 11:24]
of the funnest games in prompt

[11:22 - 11:26]
engineering you're given a prompt that

[11:24 - 11:28]
maybe a company has been using for their

[11:26 - 11:30]
model and your whole job is just take

[11:28 - 11:31]
that thing make it 30% shorter and

[11:30 - 11:33]
improve the quality of your outputs

[11:31 - 11:36]
automatically by 5% so you can see you

[11:33 - 11:39]
can get very far with just a few minutes

[11:36 - 11:41]
the third tip I'm going to give you is

[11:39 - 11:44]
understand the different prompt types

[11:41 - 11:48]
there are system user and assistant

[11:44 - 11:51]
prompts and these prompts are basically

[11:48 - 11:52]
just the go-to for for all um large

[11:51 - 11:54]
language models at this point probably

[11:52 - 11:56]
going to remain so for a while so if I

[11:54 - 11:59]
go back to my chat GPT playground

[11:56 - 12:01]
example not that page this one over here

[11:59 - 12:03]
and and actually if I just let's make

[12:01 - 12:04]
this a little bit more Dynamic let's

[12:03 - 12:08]
grab

[12:04 - 12:10]
my prompt that I've painstakingly edited

[12:08 - 12:12]
over here let me just add this plus

[12:10 - 12:15]
button okay now what I'm doing is I'm

[12:12 - 12:18]
embedding a system prompt which is at a

[12:15 - 12:22]
high level simply how the model

[12:18 - 12:24]
identifies so this is who am I right

[12:22 - 12:27]
imagine you just turned

[12:24 - 12:32]
on the IR robot

[12:27 - 12:37]
okay you just turned on this

[12:32 - 12:39]
puppy and it's asking who am I all the

[12:37 - 12:40]
system prompt is is it's you answering

[12:39 - 12:43]
that question oh you're a helpful

[12:40 - 12:46]
intelligent assistant oh you're a an

[12:43 - 12:49]
email writing assistant oh you're a

[12:46 - 12:52]
customer help desk assistant oh you are

[12:49 - 12:53]
a paperclip optimization maximizer who

[12:52 - 12:55]
will certain and convert us all into

[12:53 - 12:57]
aluminum right you are you are just

[12:55 - 12:58]
providing it simple straightforward

[12:57 - 13:00]
instructions a very general one that you

[12:58 - 13:01]
can use for most purposes you're a

[13:00 - 13:04]
helpful gen uh helpful intelligence

[13:01 - 13:05]
assistant that works just fine we're

[13:04 - 13:06]
saying that it's helpful because we want

[13:05 - 13:07]
it to be helpful we're also saying it's

[13:06 - 13:10]
intelligent because we obviously wanted

[13:07 - 13:12]
to like select an intelligent um you

[13:10 - 13:14]
know an an intelligent

[13:12 - 13:16]
example after that though what we have

[13:14 - 13:18]
is we have the user prompt so we always

[13:16 - 13:19]
start with the system okay and I always

[13:18 - 13:22]
recommend defining it

[13:19 - 13:24]
explicitly then the user prompt okay the

[13:22 - 13:26]
user prompt is where you actually tell

[13:24 - 13:28]
the model what it is you want it to do

[13:26 - 13:29]
and there's a specific structure within

[13:28 - 13:31]
a user prompt that I will run you guys

[13:29 - 13:32]
through later but for now just know that

[13:31 - 13:34]
this is where you provide the actual

[13:32 - 13:36]
instruction to the model okay now the

[13:34 - 13:37]
next sort of prompt is What's called the

[13:36 - 13:39]
assistant prompt if I were

[13:37 - 13:40]
hypothetically just to press this button

[13:39 - 13:42]
right now well it's not hypothetical

[13:40 - 13:44]
because I just did it what's going to

[13:42 - 13:46]
happen is I just told the model to write

[13:44 - 13:48]
me an article about birds and bees right

[13:46 - 13:49]
I didn't say write it about birds and

[13:48 - 13:51]
bees you know I talked about doing it in

[13:49 - 13:53]
the context of automation so let's see

[13:51 - 13:54]
what it does birds and bees key insights

[13:53 - 13:56]
and analogies for business automation

[13:54 - 13:58]
operations the birds and bees typically

[13:56 - 13:59]
evokes blah blah blah blah okay great so

[13:58 - 14:01]
we're writing

[13:59 - 14:02]
we're writing a bunch of stuff about

[14:01 - 14:05]
birds and bees and how they can inform

[14:02 - 14:07]
us as to how business Works what I have

[14:05 - 14:08]
now is we got the user prompt the system

[14:07 - 14:10]
prompt up here the user prompt up here

[14:08 - 14:12]
but now we've actually inserted an

[14:10 - 14:13]
additional assistant prompt the output

[14:12 - 14:15]
of the model the thing that it just

[14:13 - 14:17]
generated for us is now actually an

[14:15 - 14:19]
additional part of our prompt called the

[14:17 - 14:20]
assistant and most people think well

[14:19 - 14:21]
this is just the output of the model

[14:20 - 14:23]
right I can't really do anything with

[14:21 - 14:24]
this and here's where you're wrong well

[14:23 - 14:28]
what you can do is you can actually use

[14:24 - 14:30]
this as an example to inform the model

[14:28 - 14:32]
whether or not what it just did is good

[14:30 - 14:34]
and then use that as a template for

[14:32 - 14:36]
future outputs okay what I mean is what

[14:34 - 14:40]
if hypothetically what if I said

[14:36 - 14:44]
fantastic work now I want you to do the

[14:40 - 14:45]
same thing but do it for an article on

[14:44 - 14:47]
stor delivery I don't know I'm just

[14:45 - 14:50]
making stuff up at this point what I'm

[14:47 - 14:52]
doing now is I'm actually feeding in

[14:50 - 14:55]
this prompt this prompt and this prompt

[14:52 - 14:57]
along with my n with my second user

[14:55 - 14:59]
prompt and what I'm doing is I'm

[14:57 - 15:01]
implicitly reinforcing that did a great

[14:59 - 15:03]
job on the last piece AK I wanted to do

[15:01 - 15:06]
the same thing or I wanted to take a

[15:03 - 15:08]
similar concept or similar approach uh

[15:06 - 15:10]
in order to do you know the next piece

[15:08 - 15:12]
too and what we can see is you know we

[15:10 - 15:14]
basically took the exact same structure

[15:12 - 15:16]
and format then we just copy and pasted

[15:14 - 15:18]
it with this new uh you know with this

[15:16 - 15:20]
new with this new idea the stor delivery

[15:18 - 15:21]
as opposed to birds and Beast now the

[15:20 - 15:23]
reason why I bring this up is because

[15:21 - 15:25]
this is at core at the core of all

[15:23 - 15:27]
advanced prompting which I'm going to

[15:25 - 15:28]
get into now um but understanding how

[15:27 - 15:30]
system user and assistant prompts work

[15:28 - 15:32]
in concert and this this works across

[15:30 - 15:33]
all major large language models as the

[15:32 - 15:35]
time of this video including Claude

[15:33 - 15:37]
including you know uh deep seek and so

[15:35 - 15:39]
on and so forth understanding how that

[15:37 - 15:40]
works under the hood is going to be

[15:39 - 15:41]
critical in US developing higher level

[15:40 - 15:45]
and more effective prompts the fourth

[15:41 - 15:47]
tip I want to talk about is to use one

[15:45 - 15:49]
or few shot

[15:47 - 15:54]
prompting now for those of you that

[15:49 - 15:55]
don't know one few zero shot all these

[15:54 - 15:56]
terms that you may may not have heard

[15:55 - 15:59]
these just refer to the number of

[15:56 - 16:01]
examples in the prompt if if I run you

[15:59 - 16:03]
guys through another little piece of uh

[16:01 - 16:05]
of Academia here this was a study that

[16:03 - 16:08]
was done a while ago on the performance

[16:05 - 16:10]
of large language models across the

[16:08 - 16:12]
number of examples they were given to

[16:10 - 16:14]
fulfill a specific task and what I want

[16:12 - 16:18]
you guys to see here is that there are

[16:14 - 16:20]
three categories there's few shot one

[16:18 - 16:23]
shot and then zero shot zero shot is

[16:20 - 16:25]
blue and it always performs the worst F

[16:23 - 16:26]
shot is orange and it always performs

[16:25 - 16:29]
the best and right now I just want you

[16:26 - 16:33]
guys to take a look at just the distance

[16:29 - 16:34]
in accuracy scores between this few shot

[16:33 - 16:37]
and one shot if we go all the way to

[16:34 - 16:40]
175b that's about the size of um some of

[16:37 - 16:42]
the simpler GPT models you know gpt3 GPT

[16:40 - 16:43]
3.5 uh because the study was in a couple

[16:42 - 16:45]
years ago and technology has improved

[16:43 - 16:47]
drastically my inclination is you know

[16:45 - 16:50]
we're probably I don't know if it's like

[16:47 - 16:52]
400b now this trend is probably the same

[16:50 - 16:54]
although you know a lot of these models

[16:52 - 16:55]
are now totally behind closed doors you

[16:54 - 16:57]
can't really see so I think that this

[16:55 - 16:59]
trend is even better than it is now but

[16:57 - 17:01]
but like let's just take a look at this

[16:59 - 17:04]
if we just extrapolate backwards this is

[17:01 - 17:07]
somewhere around 40% accuracy right this

[17:04 - 17:09]
is almost 60% accuracy meaning that

[17:07 - 17:11]
there's an accuracy gap of 20% between

[17:09 - 17:12]
zero shot and few shot okay but that's

[17:11 - 17:14]
not actually the important thing what I

[17:12 - 17:15]
want you guys to actually look at is

[17:14 - 17:18]
notice how the dis the difference in

[17:15 - 17:20]
accuracy between zero shot and one shot

[17:18 - 17:21]
is greater than the distance in accuracy

[17:20 - 17:25]
or the difference in accuracy between

[17:21 - 17:27]
one shot and few shot this is like

[17:25 - 17:30]
10% this is like

[17:27 - 17:32]
7% this brings to a very important point

[17:30 - 17:35]
that very few people know about that's

[17:32 - 17:38]
that if you insert just one example into

[17:35 - 17:41]
your prompt you will gain a massive

[17:38 - 17:43]
disproportionate Improvement in accuracy

[17:41 - 17:45]
that out Shadows if you were to add

[17:43 - 17:47]
let's say 30 to your prompt I think um

[17:45 - 17:49]
this F shot specific study uh was

[17:47 - 17:50]
something like 20 and N is equal to 20

[17:49 - 17:53]
examples so the distance between zero

[17:50 - 17:55]
and one was like a time and a half the

[17:53 - 17:57]
distance between 1 and 20 and if you

[17:55 - 17:59]
think about it considering now that we

[17:57 - 18:02]
know what we know about the length of an

[17:59 - 18:04]
input and then the um accuracy

[18:02 - 18:06]
Improvement as a result of shorter and

[18:04 - 18:08]
shorter inputs we can actually see a

[18:06 - 18:12]
trend here if we only insert one prompt

[18:08 - 18:14]
or one example in our prompt the

[18:12 - 18:15]
accuracy will be as high as humanly

[18:14 - 18:16]
possible because the prompt itself will

[18:15 - 18:19]
be short and then we're also going to

[18:16 - 18:23]
get a massive boost in accuracy because

[18:19 - 18:25]
of how we structured our examples here

[18:23 - 18:26]
okay so this takes me to an important

[18:25 - 18:27]
point about user assistant prompts which

[18:26 - 18:28]
I'll run you guys through in a moment

[18:27 - 18:30]
but essentially I guess what I'm trying

[18:28 - 18:31]
to say is this is The Sweet Spot this is

[18:30 - 18:34]
like the gravy this is where you want to

[18:31 - 18:35]
uh sorry not here this is the gravy you

[18:34 - 18:37]
can tell I had to re-record this video

[18:35 - 18:40]
twice now cuz been droning on for like

[18:37 - 18:42]
two hours uh my OBS incense just broke

[18:40 - 18:43]
unfortunately so I I finished it now I

[18:42 - 18:46]
got to come back and do it again but

[18:43 - 18:50]
whatever maybe I'm just smoother now um

[18:46 - 18:52]
so so this one shot uh plus you know

[18:50 - 18:53]
what we know about keeping prompt length

[18:52 - 18:55]
as short assumingly possible this is

[18:53 - 18:57]
really like the goldilock zone and this

[18:55 - 18:59]
is really where you want to be as often

[18:57 - 19:01]
as possible so my recommend

[18:59 - 19:04]
for anything Mission critical always use

[19:01 - 19:07]
at least one prompt where at least one

[19:04 - 19:09]
example to coers the model into

[19:07 - 19:10]
providing you a more accurate result the

[19:09 - 19:13]
fifth tip I want to provide is this

[19:10 - 19:17]
notion of conversational

[19:13 - 19:21]
engines versus knowledge engine

[19:17 - 19:23]
okay what do I mean by these two

[19:21 - 19:28]
terms

[19:23 - 19:31]
well llms like Chachi BT and Claude

[19:28 - 19:34]
are almost like a human being that's

[19:31 - 19:37]
read a quadrillion Books

[19:34 - 19:39]
Okay so if we got a book here this is my

[19:37 - 19:42]
fantastic super detailed and amazing

[19:39 - 19:44]
drawing of a book so we could see here

[19:42 - 19:47]
I'm quite the artist I'm like the Pao

[19:44 - 19:49]
Picasso kind I think um not saying that

[19:47 - 19:51]
Pablo Picasso wasn't amazing he is for

[19:49 - 19:54]
those the guys that know art don't scw

[19:51 - 19:56]
me uh okay so an llm is just like a

[19:54 - 19:57]
person that's read like a million books

[19:56 - 19:58]
and just like a person that's read a

[19:57 - 20:01]
million books if you went up to that

[19:58 - 20:07]
you're like hey tell me the boiling

[20:01 - 20:10]
point of X oxy pyc Benzene or something

[20:07 - 20:11]
that person may roughly know what the

[20:10 - 20:14]
boiling point is of things that are in a

[20:11 - 20:17]
similar class but they're not going to

[20:14 - 20:21]
know exactly what that is 99.9% of the

[20:17 - 20:23]
time just like a human being llms often

[20:21 - 20:25]
know roughly approximately what a right

[20:23 - 20:26]
answer is just because they've read so

[20:25 - 20:28]
many books they've picked up so many

[20:26 - 20:33]
patterns between Concepts but they don't

[20:28 - 20:35]
know exact facts so llms okay are not

[20:33 - 20:37]
knowledge engines what they are are

[20:35 - 20:41]
conversational

[20:37 - 20:43]
engines you don't use llms to extract

[20:41 - 20:46]
knowledge for the most part unless that

[20:43 - 20:48]
knowledge is very old and very commonly

[20:46 - 20:50]
known instead what you do is use them to

[20:48 - 20:52]
talk use them to have conversations use

[20:50 - 20:54]
them to reason or something introductory

[20:52 - 20:56]
level reasoning still but still

[20:54 - 20:58]
reasoning now contrast this with

[20:56 - 20:59]
something like a database if you you

[20:58 - 21:01]
know I think most of us would probably

[20:59 - 21:03]
use Google Sheets here

[21:01 - 21:05]
right so you know in Google Sheets you

[21:03 - 21:07]
have some sort of column heading so XYZ

[21:05 - 21:09]
a and then you have like the data for

[21:07 - 21:10]
the headings so maybe X is like name or

[21:09 - 21:13]
something to make this a little clearer

[21:10 - 21:17]
and then you know the value here is Nick

[21:13 - 21:22]
um tables and and databases and

[21:17 - 21:25]
encyclopedias okay these are knowledge

[21:22 - 21:28]
engines they essentially know facts but

[21:25 - 21:30]
you can't have conversations with them

[21:28 - 21:32]
right can't have a conversation with an

[21:30 - 21:35]
encyclopedia the cool part about llms

[21:32 - 21:38]
really is when you hook up an

[21:35 - 21:38]
llm to a knowledge

[21:39 - 21:46]
engine and then you basically have

[21:42 - 21:48]
it query that knowledge engine for some

[21:46 - 21:50]
facts or some information okay so llms

[21:48 - 21:53]
on their own like the

[21:50 - 21:55]
GPT whatever series of models these are

[21:53 - 21:56]
conversational engines they don't know

[21:55 - 21:58]
facts and you shouldn't really rely on

[21:56 - 22:00]
them for facts they're going to be very

[21:58 - 22:01]
comp ident because it's just like I

[22:00 - 22:03]
don't know the some dude at the bar

[22:01 - 22:07]
that's like absolutely man I know all

[22:03 - 22:10]
about medieval history from 1864 to 1899

[22:07 - 22:11]
right medieval history good God uh

[22:10 - 22:13]
that's definitely not medieval history

[22:11 - 22:15]
folks clearly I am a conversational

[22:13 - 22:17]
engine but they're not going to know the

[22:15 - 22:18]
specific facts they're going to be very

[22:17 - 22:19]
confident in explaining these things to

[22:18 - 22:20]
you but unless you actually hook them up

[22:19 - 22:23]
to some sort of external knowledge base

[22:20 - 22:24]
you use something like you know rag

[22:23 - 22:26]
which stands for retrieval augmented

[22:24 - 22:29]
generation which is where you query some

[22:26 - 22:33]
data set using an llm you you ask it to

[22:29 - 22:35]
find you some data return that data and

[22:33 - 22:37]
then have the llm produce the response

[22:35 - 22:39]
okay um you're not actually going to get

[22:37 - 22:41]
like any usable information for the most

[22:39 - 22:42]
part and even if you do you know I I

[22:41 - 22:44]
wouldn't trust it maybe it's right like

[22:42 - 22:47]
70% of the time for most queries but

[22:44 - 22:48]
that 30% um that means a lot in business

[22:47 - 22:50]
applications right you're never really

[22:48 - 22:51]
going to get somebody to pay you a lot

[22:50 - 22:53]
of money for some sort of business

[22:51 - 22:55]
application if you're wrong 30% of the

[22:53 - 22:57]
time okay speaking of being wrong the

[22:55 - 23:00]
sixth tip I want to give you is to use

[22:57 - 23:03]
completely UNAM uous

[23:00 - 23:05]
language what do I mean by unambiguous

[23:03 - 23:07]
language well unfortunately or

[23:05 - 23:10]
fortunately AI is extraordinarily

[23:07 - 23:12]
creative okay because it's very creative

[23:10 - 23:14]
that means that when you ask AI

[23:12 - 23:15]
something the first time it'll give you

[23:14 - 23:17]
a different answer than if you ask it

[23:15 - 23:18]
the second time and that'll be a

[23:17 - 23:20]
different answer than if you ask it the

[23:18 - 23:23]
third time and a fourth time and a fifth

[23:20 - 23:24]
time and a sixth time okay if I could

[23:23 - 23:26]
just give you guys a quick little

[23:24 - 23:28]
example here if this was like um if you

[23:26 - 23:29]
played one of those games where like I

[23:28 - 23:32]
don't know you have some Zone that you

[23:29 - 23:32]
need to hit or something okay I don't

[23:32 - 23:34]
know maybe you guys have play this at

[23:32 - 23:36]
the arcade or whatever and and basically

[23:34 - 23:38]
there's this little cursor and it goes

[23:36 - 23:40]
ding ding ding and you're supposed to

[23:38 - 23:42]
just like stop it right when it's in the

[23:40 - 23:44]
middle of some little goldilock Zone

[23:42 - 23:46]
well large language models are are very

[23:44 - 23:47]
similar if we have like this little

[23:46 - 23:49]
goldilock Zone here I want you guys to

[23:47 - 23:52]
hypothetically just think about this as

[23:49 - 23:55]
this is the zone of responses that you

[23:52 - 23:57]
want okay this is you know the perfect

[23:55 - 23:59]
output of your prompt it's the the best

[23:57 - 24:01]
ice breaker it's you know the the

[23:59 - 24:03]
perfect report or or whatever basically

[24:01 - 24:04]
the way that large language models work

[24:03 - 24:07]
are you know if you query it the first

[24:04 - 24:09]
time maybe you get a response over here

[24:07 - 24:11]
okay quer it the second time maybe you

[24:09 - 24:12]
get a response over here quer it a third

[24:11 - 24:14]
time maybe you get a response over here

[24:12 - 24:15]
maybe it's only when you query it like

[24:14 - 24:16]
the fourth time that you actually get

[24:15 - 24:18]
the response that you want what you want

[24:16 - 24:20]
to do is you want to you want to you

[24:18 - 24:22]
want to minimize this as much as humanly

[24:20 - 24:25]
possible okay you want to get all of

[24:22 - 24:27]
these as close to that little green zone

[24:25 - 24:28]
as humanly possible and I'll show you a

[24:27 - 24:30]
practical way to do this in just a few

[24:28 - 24:32]
tips um but essentially one of the

[24:30 - 24:34]
simplest ways for you to do this is to

[24:32 - 24:37]
be extraordinarily unambiguous with what

[24:34 - 24:40]
you want okay so to make this practical

[24:37 - 24:43]
um you know a big a big thing a lot of

[24:40 - 24:44]
people will use AI for is it'll you know

[24:43 - 24:47]
you'll ask it to do something like

[24:44 - 24:50]
produce me a report based

[24:47 - 24:53]
on this

[24:50 - 24:58]
data this is what I would call a bad

[24:53 - 25:05]
prompt okay do not do this instead

[24:58 - 25:05]
say list our five most popular

[25:07 - 25:15]
products and write

[25:10 - 25:17]
me a one line or one paragraph let's say

[25:15 - 25:20]
description

[25:17 - 25:22]
this is a better prompt and you get even

[25:20 - 25:25]
better if you say here's an example of a

[25:22 - 25:28]
one paragraph description for another

[25:25 - 25:30]
product okay so why is the first bad and

[25:28 - 25:32]
the second good well I guess it's good

[25:30 - 25:34]
so let's do a check mark the first is

[25:32 - 25:37]
bad because we're just saying producer

[25:34 - 25:40]
report produce is extraordinarily

[25:37 - 25:43]
ambiguous a report is extraordinarily

[25:40 - 25:46]
ambiguous based on this data is also

[25:43 - 25:48]
extraordinarily ambiguous okay ideally

[25:46 - 25:49]
you'd say here is the data you don't

[25:48 - 25:52]
just like make your own inferences about

[25:49 - 25:53]
what to use of this data why is this

[25:52 - 25:55]
good because it's specifically saying

[25:53 - 25:57]
what we want we want you to list five

[25:55 - 25:58]
most popular products like if you

[25:57 - 26:00]
produce a report on some reports it'll

[25:58 - 26:02]
it'll do 10 products and other ones

[26:00 - 26:03]
it'll do two okay it's just kind of up

[26:02 - 26:05]
to like how the model is feeling at the

[26:03 - 26:07]
time but if you hardcode it in and say

[26:05 - 26:08]
you're doing five products in addition

[26:07 - 26:10]
you're writing me a one paragraph

[26:08 - 26:11]
description of each and in addition

[26:10 - 26:12]
here's an example of the formatting well

[26:11 - 26:16]
now what you've done is you've

[26:12 - 26:19]
constrained all possible outputs so that

[26:16 - 26:20]
even if they're not perfect okay what

[26:19 - 26:23]
they are is they're probably a lot

[26:20 - 26:25]
closer to that goldilock zone of

[26:23 - 26:27]
responses that you want instead of being

[26:25 - 26:29]
super crazy spread out now they're at

[26:27 - 26:31]
least like somewhere in the realm of

[26:29 - 26:32]
what you constitute a good response

[26:31 - 26:34]
somewhere in the realm of what a

[26:32 - 26:35]
business might want my seventh tip is a

[26:34 - 26:37]
very quick and easy hack it's just use

[26:35 - 26:40]
the term

[26:37 - 26:42]
Spartan in your tone of voice this is

[26:40 - 26:45]
just one of those extraordinarily simple

[26:42 - 26:47]
things that you can just do in in every

[26:45 - 26:49]
prompt um I just find the term Spartan

[26:47 - 26:51]
is the perfect middle ground in terms of

[26:49 - 26:53]
like being direct and being pragmatic

[26:51 - 26:54]
and then you know offering the model a

[26:53 - 26:56]
little bit of flexibility so for

[26:54 - 26:58]
instance this guideline here I would I

[26:56 - 26:59]
would write use a Spartan tone of voice

[26:58 - 27:01]
I I think before I had um something

[26:59 - 27:03]
different use a direct or or assertive

[27:01 - 27:04]
tone of voice just always say use a

[27:03 - 27:05]
Spartan tone of voice your answers are

[27:04 - 27:07]
just going to be way way better and way

[27:05 - 27:09]
easier all right let's make this data

[27:07 - 27:12]
driven my eighth point is to iterate

[27:09 - 27:14]
your prompts with

[27:12 - 27:17]
data now this is something of a more

[27:14 - 27:19]
nuanced point but it's how you get the

[27:17 - 27:21]
highest quality prompts I see lots of

[27:19 - 27:22]
people in my communities like maker

[27:21 - 27:24]
school which is a day-by-day

[27:22 - 27:25]
accountability program for people that

[27:24 - 27:26]
want to start an automation business

[27:25 - 27:28]
it's something I've been running for uh

[27:26 - 27:31]
quite a few months now a lot of people

[27:28 - 27:32]
in maker School the way that they'll do

[27:31 - 27:33]
their prompt engineering is they'll

[27:32 - 27:35]
spend all night coming up with some

[27:33 - 27:37]
amazing prompt they think it's amazing

[27:35 - 27:39]
anyway and then they'll run it once and

[27:37 - 27:40]
it'll deliver the most amazing output

[27:39 - 27:41]
ever and they're like oh my God I

[27:40 - 27:42]
finally figured it out I found the most

[27:41 - 27:45]
amazing prompt I'm just going to use

[27:42 - 27:47]
this prompt for my business now okay the

[27:45 - 27:49]
thing is do you remember earlier when I

[27:47 - 27:51]
said that we have a range of possible

[27:49 - 27:53]
responses in the model sometimes it's

[27:51 - 27:54]
going to respond over here other times

[27:53 - 27:57]
it's going to respond over here other

[27:54 - 27:59]
times going to respond over here right

[27:57 - 28:01]
odds are when you get a really good

[27:59 - 28:03]
response in a model like 70% of the time

[28:01 - 28:05]
it's just because the model happened to

[28:03 - 28:07]
produce something that was in line with

[28:05 - 28:09]
your expectations but it wasn't

[28:07 - 28:13]
guaranteed to do so it just happened to

[28:09 - 28:15]
do so so if you want to get prompts that

[28:13 - 28:16]
reliably and consistently produce

[28:15 - 28:18]
outputs that are more in line with what

[28:16 - 28:19]
you want what you have to do is you have

[28:18 - 28:21]
to test them and then it's not enough

[28:19 - 28:22]
just to test them once you actually have

[28:21 - 28:24]
to test them using what's called a Monte

[28:22 - 28:26]
Carlo approach where you throw a bunch

[28:24 - 28:28]
of stuff at the wall okay and then

[28:26 - 28:29]
progressively make changes to get it

[28:28 - 28:31]
closer and closer and closer to where

[28:29 - 28:33]
you want so I mean I don't if you guys

[28:31 - 28:34]
ever play darts okay but usually you

[28:33 - 28:35]
have some like dart board and it looks

[28:34 - 28:37]
like this and it's usually different

[28:35 - 28:39]
colors and stuff and they're nice points

[28:37 - 28:40]
and you know like your your goal I think

[28:39 - 28:43]
is you want to throw it like kind of

[28:40 - 28:45]
over here all right so this is ideal

[28:43 - 28:46]
what usually happens is you know you're

[28:45 - 28:47]
drunk as hell you start off playing

[28:46 - 28:48]
darts you never played darts bar you

[28:47 - 28:50]
throw one over here throw another one

[28:48 - 28:51]
over there throw another one over there

[28:50 - 28:52]
throw one over there and you throw

[28:51 - 28:54]
another one over there at the wall and

[28:52 - 28:58]
hit the back of St you know Stacy's head

[28:54 - 29:00]
or something um every time that you

[28:58 - 29:02]
iterate your prompt what you want to

[29:00 - 29:05]
happen is you just want

[29:02 - 29:06]
the I guess total size of this to get

[29:05 - 29:08]
smaller and more constrained so that's

[29:06 - 29:11]
that's route number

[29:08 - 29:13]
two this is route number

[29:11 - 29:15]
three and then ultimately what you want

[29:13 - 29:17]
is you want like a very accurate model

[29:15 - 29:20]
that just consistently delivers you

[29:17 - 29:22]
results in this perfect Zone how you

[29:20 - 29:24]
actually get there is you got to test

[29:22 - 29:26]
and throw a bunch of stuff at the wall

[29:24 - 29:27]
practically what this usually means is

[29:26 - 29:30]
you're going to do something like a

[29:27 - 29:31]
Google sheet okay just like this you're

[29:30 - 29:33]
going to have a prompt on the left hand

[29:31 - 29:34]
side you're going to have the output in

[29:33 - 29:36]
the middle and then you're going to have

[29:34 - 29:37]
another column that I just always call

[29:36 - 29:41]
good

[29:37 - 29:43]
enough and then basically what you do is

[29:41 - 29:44]
okay you grab your um chat gbt

[29:43 - 29:46]
playground in this

[29:44 - 29:49]
case and then what you do is you

[29:46 - 29:53]
generate 10 examples of what you want it

[29:49 - 29:55]
to do okay so for example this was one

[29:53 - 29:58]
on birds and bees let me just delete

[29:55 - 29:59]
this other one so this is this is my my

[29:58 - 30:01]
first article on birds andb so what I do

[29:59 - 30:03]
is I actually paste it in here okay so I

[30:01 - 30:04]
pasted in the entire thing then I delete

[30:03 - 30:08]
it

[30:04 - 30:09]
all and then I do it again and usually

[30:08 - 30:11]
what I'll do is I'll use a no code model

[30:09 - 30:13]
or no code tool something that just does

[30:11 - 30:15]
things way faster um and then I'll just

[30:13 - 30:17]
like do it in the background but you

[30:15 - 30:18]
know this is now like route number two

[30:17 - 30:19]
so I'm going to wait for it to finish

[30:18 - 30:21]
its second output just for the purpose

[30:19 - 30:23]
of this demonstration I won't do any

[30:21 - 30:28]
more but basically after it's done with

[30:23 - 30:31]
number two I will copy all of this into

[30:28 - 30:33]
another row okay uh that's not right

[30:31 - 30:36]
let's actually enter this and then what

[30:33 - 30:38]
I'll do is I grab my prompt okay then

[30:36 - 30:40]
I'll just stick

[30:38 - 30:42]
it on the left hand side on this prompt

[30:40 - 30:44]
column and just because this isn't very

[30:42 - 30:45]
viewable I'm just going to make this way

[30:44 - 30:48]
smaller so we could actually like see

[30:45 - 30:48]
and maybe interpret

[30:48 - 30:55]
this okay so I have two rows on my sheet

[30:53 - 30:57]
here right what I'll do after that is

[30:55 - 30:58]
I'll do like I'll do another um I don't

[30:57 - 31:00]
know I'll do like another 10 or

[30:58 - 31:02]
something like

[31:00 - 31:04]
that uh and you know in my case I'm just

[31:02 - 31:08]
going to do two but um in your case do

[31:04 - 31:11]
do 10 okay and what you do is you will

[31:08 - 31:13]
read through every row and you'll say

[31:11 - 31:14]
hey is this good enough for my business

[31:13 - 31:16]
is this good enough for the thing that I

[31:14 - 31:17]
was hard to do this this good enough for

[31:16 - 31:19]
the use case that I'm building my

[31:17 - 31:23]
automation for maybe this article is

[31:19 - 31:25]
good enough maybe this one isn't okay so

[31:23 - 31:27]
we have one good enough out of two

[31:25 - 31:30]
mathematically one out of two is equal

[31:27 - 31:32]
to 50% %. realistically if I had like 20

[31:30 - 31:33]
of these or something like that you know

[31:32 - 31:35]
what I would do is I would output 20 and

[31:33 - 31:36]
then I'd go through and I'd read each of

[31:35 - 31:38]
these and I'd ask myself hey this is

[31:36 - 31:41]
good enough and maybe 18 out of 20 are

[31:38 - 31:44]
so if you know 18 out of 20 are then

[31:41 - 31:45]
that's a total of 90% And then what I

[31:44 - 31:47]
would do is I would just test this

[31:45 - 31:49]
against a different prompt so now

[31:47 - 31:50]
instead of me just using my gut feeling

[31:49 - 31:52]
instead of me just having it generate

[31:50 - 31:55]
one thing and me being okay with that

[31:52 - 31:56]
one thing I have to do 20 and now I have

[31:55 - 31:58]
like statistics I basically have like

[31:56 - 32:00]
some some science or some data behind my

[31:58 - 32:01]
answer I'm like oh you know what that

[32:00 - 32:04]
prompt actually beats the other prompt

[32:01 - 32:06]
19 times out of 20 that prompt actually

[32:04 - 32:08]
beats the first prompt 13 times out of

[32:06 - 32:10]
20 that prompt actually beats the other

[32:08 - 32:11]
prompt 18 times out of 20 so what am I

[32:10 - 32:13]
going to do I'm going to pick the one

[32:11 - 32:15]
that's 19 times out of 20 and in this

[32:13 - 32:17]
way you get more data driven and every

[32:15 - 32:19]
time you make a change and you run this

[32:17 - 32:20]
test again you actually know hey I'm not

[32:19 - 32:23]
just like throwing the most lucky

[32:20 - 32:26]
bullseye on planet Earth okay I'm

[32:23 - 32:28]
actually statistically testing a big set

[32:26 - 32:30]
of all of these outputs and then I'm

[32:28 - 32:32]
finding which ones have higher accuracy

[32:30 - 32:34]
scores which ones are like more

[32:32 - 32:36]
statistically correlated to the center

[32:34 - 32:38]
of that Circle the ninth tip I want to

[32:36 - 32:43]
give you guys is to define the output

[32:38 - 32:45]
format explicitly okay what do I mean by

[32:43 - 32:46]
explicitly well I mean like there are a

[32:45 - 32:48]
lot of use cases where you're going to

[32:46 - 32:52]
want something like a bulleted list so

[32:48 - 32:53]
actually like say output a bulleted list

[32:52 - 32:55]
that's pretty easy

[32:53 - 32:58]
right but there's a lot more than you

[32:55 - 32:59]
can do than that um you know in instead

[32:58 - 33:02]
what we see a lot of people do nowadays

[32:59 - 33:03]
is we output code blocks so output Json

[33:02 - 33:08]
if you don't know what Json is it's

[33:03 - 33:11]
basically like a um specific JavaScript

[33:08 - 33:14]
notation where you will generate some

[33:11 - 33:15]
curly braces a quote inside of this uh

[33:14 - 33:17]
thing that's encapsulated by quotes you

[33:15 - 33:18]
have the variable or key name then you

[33:17 - 33:20]
have a colon then you have some quotes

[33:18 - 33:23]
around a value then you have another

[33:20 - 33:24]
curly bracket this is a very specific

[33:23 - 33:26]
format that now allows you to integrate

[33:24 - 33:28]
your large language model with code

[33:26 - 33:34]
servers scripts that that sort of stuff

[33:28 - 33:36]
um you know like csvs okay if you want a

[33:34 - 33:39]
a a Google sheet and you want the Google

[33:36 - 33:42]
sheet to say something like uh I don't

[33:39 - 33:45]
know like

[33:42 - 33:47]
month um

[33:45 - 33:49]
Revenue uh

[33:47 - 33:51]
profit you can actually have ai generate

[33:49 - 33:54]
this don't just ask remember how earlier

[33:51 - 33:56]
I I told you guys um that don't just

[33:54 - 33:58]
tell it to produce a report so don't

[33:56 - 33:59]
just say produce

[33:58 - 34:01]
a

[33:59 - 34:04]
sheet

[34:01 - 34:04]
about

[34:05 - 34:13]
financial data or something that is

[34:09 - 34:14]
bad instead what you wanted to do is you

[34:13 - 34:16]
want to

[34:14 - 34:18]
say

[34:16 - 34:22]
generate a

[34:18 - 34:24]
CSV with

[34:22 - 34:28]
month

[34:24 - 34:30]
revenue and profit headings

[34:28 - 34:32]
based off of the below

[34:30 - 34:33]
data and now like when it gives you an

[34:32 - 34:34]
output it's actually going to give you

[34:33 - 34:37]
an output that you can just copy and

[34:34 - 34:39]
paste directly into Google uh Google

[34:37 - 34:40]
Sheets or or Excel or something you know

[34:39 - 34:43]
you're going to have data that looks

[34:40 - 34:45]
like this month Revenue profit then

[34:43 - 34:47]
it'll say like I don't know January okay

[34:45 - 34:51]
it'll say like

[34:47 - 34:52]
13,000 it'll say you know 3,000 it's not

[34:51 - 34:54]
going to have any commas cuz it's comma

[34:52 - 34:58]
separated but I'll get into that later

[34:54 - 34:59]
maybe February it'll say 14,500

[34:58 - 35:01]
then it'll pull from some spreadsheet

[34:59 - 35:01]
and grab this much for you right like

[35:01 - 35:03]
your data is going to be a lot

[35:01 - 35:05]
structured so if you want data in a

[35:03 - 35:07]
format don't just have it generate a

[35:05 - 35:08]
thing and then have you have to go copy

[35:07 - 35:10]
and paste it into a spreadsheet or into

[35:08 - 35:12]
your app or into your program later like

[35:10 - 35:13]
actually just ask it to do the exact

[35:12 - 35:15]
thing that you want it to do right off

[35:13 - 35:16]
the Geto I'll show you the exact

[35:15 - 35:18]
structure you need in order to get this

[35:16 - 35:21]
to Output reliably in a moment the 10th

[35:18 - 35:24]
tip is to remove conflicting

[35:21 - 35:28]
instructions now this may sound pretty

[35:24 - 35:30]
simple but it's a lot bigger of an

[35:28 - 35:32]
issue then I think a lot of people

[35:30 - 35:34]
realize okay what do I mean by

[35:32 - 35:36]
conflicting instructions well like a lot

[35:34 - 35:40]
of the words that we use we don't really

[35:36 - 35:42]
think of but they have directly opposed

[35:40 - 35:44]
meanings I'll give you a quick example

[35:42 - 35:47]
remember how earlier we went through and

[35:44 - 35:48]
we made our whole thing really short our

[35:47 - 35:50]
whole prompt really short to take

[35:48 - 35:52]
advantage of better accuracy well a word

[35:50 - 35:54]
I always see and I've seen very often in

[35:52 - 35:55]
maker School my my 0 to1 community and

[35:54 - 35:57]
then also make money with make.com which

[35:55 - 35:59]
is a higher level Community um like a

[35:57 - 36:01]
lot of prompt engineering threads I see

[35:59 - 36:03]
stuff like this detailed summary I want

[36:01 - 36:04]
you to think about this logically like

[36:03 - 36:07]
if you produce a summary of something

[36:04 - 36:10]
you are necessarily producing something

[36:07 - 36:12]
that is simpler and smaller and and

[36:10 - 36:14]
lighter and and easier it's a it's a

[36:12 - 36:16]
compressed form of you know the thing

[36:14 - 36:21]
that you are doing you're basically

[36:16 - 36:24]
going you know from something like

[36:21 - 36:26]
complex to simple right that's what a

[36:24 - 36:28]
summary is but if you ask for something

[36:26 - 36:30]
detailed basically going from something

[36:28 - 36:32]
simple to complex so then if you're

[36:30 - 36:33]
asking for a detailed summary what

[36:32 - 36:35]
you're basically doing is you're it's

[36:33 - 36:37]
like mathematically it's like it's like

[36:35 - 36:39]
this equals zero okay it equals nothing

[36:37 - 36:40]
these two cancel each other out and what

[36:39 - 36:42]
you end up doing is you just end up

[36:40 - 36:44]
needlessly increasing token count for no

[36:42 - 36:46]
reason so like when you say stuff like

[36:44 - 36:48]
produce an engaging article that is also

[36:46 - 36:49]
very simple and straightforward or

[36:48 - 36:51]
produce like a very comprehensive

[36:49 - 36:52]
article that's still easy for newcomers

[36:51 - 36:54]
to understand right you're giving it

[36:52 - 36:55]
conflicting instructions do you want it

[36:54 - 36:56]
to produce something detailed or do you

[36:55 - 36:59]
want it to produce something that's

[36:56 - 37:00]
that's not okay um just eliminate that

[36:59 - 37:03]
it'll substantially reduce your token

[37:00 - 37:05]
length and then it'll also allow you to

[37:03 - 37:06]
uh you know just get get a little bit

[37:05 - 37:08]
better at defining things and and being

[37:06 - 37:10]
simple and treating llms as I think that

[37:08 - 37:12]
you know they realistically should be

[37:10 - 37:14]
treated which are tools that enable you

[37:12 - 37:16]
to generate things not like at our

[37:14 - 37:17]
current level some super nuanced being

[37:16 - 37:19]
that's able to like really fully

[37:17 - 37:20]
understand the full gradient of the

[37:19 - 37:22]
decision that you've tasked it with the

[37:20 - 37:26]
11th tip I have for you is to learn

[37:22 - 37:28]
JavaScript object notation XML then CSV

[37:26 - 37:32]
let's actually start with XML

[37:28 - 37:36]
XML stands for

[37:32 - 37:37]
extensible markup language okay to make

[37:36 - 37:40]
a long story

[37:37 - 37:43]
short all XML basically is it's just a

[37:40 - 37:45]
way to structure data you remember how

[37:43 - 37:48]
like back in grade school um you know

[37:45 - 37:49]
you would write a story and you write

[37:48 - 37:52]
your name in the top left hand corner

[37:49 - 37:55]
you write the date over here you'd write

[37:52 - 37:57]
the title over

[37:55 - 38:01]
here and then underneath here maybe you

[37:57 - 38:05]
write the story right and then you hand

[38:01 - 38:07]
it in well all XML Json and csvr are

[38:05 - 38:09]
just formats that allow you to embed

[38:07 - 38:11]
what all of these different things are

[38:09 - 38:13]
in a simple and easy and standardized

[38:11 - 38:14]
way um for computers to understand so

[38:13 - 38:15]
that you can do cool things with them

[38:14 - 38:17]
like run you know cool programs and

[38:15 - 38:20]
whatnot so you know if this is my big

[38:17 - 38:24]
paper okay this is a big paper that I

[38:20 - 38:29]
wrote One me first place in school I got

[38:24 - 38:32]
a $25 discard discard um a $25 gift card

[38:29 - 38:33]
to uh Denny's or something okay this is

[38:32 - 38:35]
equivalent to this I have a little

[38:33 - 38:39]
author

[38:35 - 38:43]
tag where it says Nick

[38:39 - 38:45]
s then I have a closing author tag all

[38:43 - 38:47]
right this is now like universally

[38:45 - 38:51]
understood that the author is Nick surve

[38:47 - 38:53]
right maybe the date okay the date was

[38:51 - 38:55]
February the 19th and I close that tag

[38:53 - 39:00]
off with

[38:55 - 39:04]
date um title right well the title was

[39:00 - 39:07]
birds and bees

[39:04 - 39:08]
right and I close out the title I could

[39:07 - 39:09]
go on and on but I think you guys

[39:08 - 39:12]
understand this is a very particular

[39:09 - 39:16]
formatting convention that allows you to

[39:12 - 39:17]
Define things okay if I go uh this one

[39:16 - 39:20]
this one's pretty cool because I

[39:17 - 39:23]
actually used to um live and work in Sur

[39:20 - 39:25]
so building ID Siri head office address

[39:23 - 39:27]
this is an address variable city city

[39:25 - 39:30]
variable Province uh Province VAR

[39:27 - 39:32]
country um country variable location

[39:30 - 39:35]
right you can embed data if I were to

[39:32 - 39:39]
instead write a paper I'd say the sir

[39:35 - 39:43]
head office is located at 7445 132

[39:39 - 39:46]
Street which is in Siri BC

[39:43 - 39:48]
Canada I just want you guys to like see

[39:46 - 39:51]
how much more every time I say Siri it

[39:48 - 39:53]
activates my Siri isn't that funny um I

[39:51 - 39:55]
just want you guys to see how much more

[39:53 - 39:56]
compressed this data is and how much

[39:55 - 39:58]
more immediately understandable this

[39:56 - 40:01]
data is too

[39:58 - 40:03]
so that's one reason why XML is awesome

[40:01 - 40:06]
um Json stands for JavaScript object

[40:03 - 40:08]
notation it's very similar okay the only

[40:06 - 40:09]
difference is instead of the tags the

[40:08 - 40:10]
less than and greater than symbols that

[40:09 - 40:13]
we used along with some of those backs

[40:10 - 40:16]
slashes um all this is is this is Curly

[40:13 - 40:19]
braces quotes

[40:16 - 40:22]
characters um colons and then more curly

[40:19 - 40:25]
braces okay exact same thing right uh

[40:22 - 40:29]
this would say

[40:25 - 40:31]
author and then this would say Nick sarf

[40:29 - 40:33]
right exact same data if you could see

[40:31 - 40:35]
um Jason

[40:33 - 40:37]
example you'll see data that looks just

[40:35 - 40:39]
like this so instead of me saying hey

[40:37 - 40:40]
this guy's name is Richard he's a

[40:39 - 40:43]
33-year-old man who loves biking gaming

[40:40 - 40:45]
squash and lives in Port space land he's

[40:43 - 40:47]
friends with Joe and Sarah and Michelle

[40:45 - 40:49]
who are all you know 30ish somethings

[40:47 - 40:51]
that live across the continent of the

[40:49 - 40:53]
United States like instead of me saying

[40:51 - 40:55]
that I just create a little JavaScript

[40:53 - 40:58]
object where the name variables equal to

[40:55 - 41:00]
Richard the age variables to 33 and so

[40:58 - 41:02]
on and so forth and then CSV the reason

[41:00 - 41:03]
I bring this up is because this is a

[41:02 - 41:04]
little bit more of a Nuance Point CSV is

[41:03 - 41:06]
actually just the hyper compressed

[41:04 - 41:08]
version of all of this where you don't

[41:06 - 41:10]
have to use these tag characters and you

[41:08 - 41:12]
only have to mention the Thing Once okay

[41:10 - 41:15]
so what I mean is okay remember this

[41:12 - 41:17]
author date and title a CSV file would

[41:15 - 41:21]
actually just look like this author

[41:17 - 41:22]
comma no space date comma no space

[41:21 - 41:25]
title and you'd have a little new line

[41:22 - 41:29]
then here it would say Nick

[41:25 - 41:31]
SV then it would say Feb 19 then it

[41:29 - 41:35]
would go

[41:31 - 41:36]
birds and bees now this if you just like

[41:35 - 41:38]
count up the number of characters this

[41:36 - 41:39]
is actually way less than all of this

[41:38 - 41:43]
and the cool thing is when you do a new

[41:39 - 41:45]
row you don't have to repeat the key

[41:43 - 41:48]
names what you can do is you can

[41:45 - 41:50]
actually just you know um write the I

[41:48 - 41:52]
don't know write everything in what's

[41:50 - 41:54]
called comma separated value format the

[41:52 - 41:56]
comma here is the delimiter character

[41:54 - 41:58]
the issue with using this in large

[41:56 - 41:59]
language models um is unfortunately

[41:58 - 42:01]
large language models often lose their

[41:59 - 42:03]
sense of place especially in longfall so

[42:01 - 42:05]
if you're producing a CSV that has I

[42:03 - 42:07]
don't know like several hundred um

[42:05 - 42:08]
inputs the large language model's

[42:07 - 42:11]
ability to like remember that the date

[42:08 - 42:15]
column always comes second on I don't

[42:11 - 42:17]
know like row number 1,00 and three or

[42:15 - 42:19]
something its ability to know that like

[42:17 - 42:20]
date corresponds to Y it just tends to

[42:19 - 42:21]
get muddled down which is why you

[42:20 - 42:23]
typically only use csrees for for

[42:21 - 42:24]
smaller applications with large language

[42:23 - 42:28]
models all right the 12th tip I want to

[42:24 - 42:31]
give you guys is what I call my key

[42:28 - 42:33]
prompt structure so I have developed

[42:31 - 42:35]
probably over a thousand prompts now for

[42:33 - 42:37]
businesses my own businesses other

[42:35 - 42:38]
businesses I work with people that I

[42:37 - 42:40]
consult with and so on and so forth and

[42:38 - 42:43]
this is what I do um on basically all of

[42:40 - 42:44]
them okay so feel free to copy this on

[42:43 - 42:45]
your own um use this for all your own

[42:44 - 42:48]
promps I'm going to show you what this

[42:45 - 42:51]
looks like first we start with context

[42:48 - 42:53]
then I give it instructions okay after

[42:51 - 42:55]
that I give it my output

[42:53 - 42:57]
format you guys just use this to

[42:55 - 43:00]
scaffold your own

[42:57 - 43:01]
then I give it rules and then finally I

[43:00 - 43:04]
wrap it up with an

[43:01 - 43:06]
example so let me show you guys a quick

[43:04 - 43:09]
actual look at what a real prompt that

[43:06 - 43:10]
has made me almost um $500,000 looks

[43:09 - 43:12]
like I'm going to show you guys this in

[43:10 - 43:14]
a no code tool it's called make.com it's

[43:12 - 43:18]
what I personally use and I teach a lot

[43:14 - 43:19]
about it as well um it is for a specific

[43:18 - 43:22]
tool called

[43:19 - 43:24]
upwork upwork is a tool uh upwork is a

[43:22 - 43:26]
freelancing platform or basically you

[43:24 - 43:28]
can bid on jobs and stuff like

[43:26 - 43:30]
that and this prompt was written to

[43:28 - 43:32]
allow me to take as input an upwork job

[43:30 - 43:34]
description uh and then have ai

[43:32 - 43:35]
automatically process it filter it tell

[43:34 - 43:37]
me if it's relevant to me and then write

[43:35 - 43:39]
me a oneline Icebreaker that's

[43:37 - 43:41]
customized to that job so how this

[43:39 - 43:42]
actually looks I start off with a system

[43:41 - 43:44]
prompt that says you're an intelligent

[43:42 - 43:47]
admin that filters jobs that's pretty

[43:44 - 43:49]
simple right no real rocket science here

[43:47 - 43:50]
then I have my user prompt and the way

[43:49 - 43:52]
that I want you guys to look at this is

[43:50 - 43:54]
through that lens that I provided you

[43:52 - 43:55]
earlier okay with context first then

[43:54 - 43:57]
instructions then output format then

[43:55 - 43:59]
rules and then some examples

[43:57 - 44:03]
so let me break this down for you this

[43:59 - 44:05]
up here this is all my context okay so

[44:03 - 44:06]
what do I mean I say hey I'm an

[44:05 - 44:08]
automation engineer that builds Outreach

[44:06 - 44:11]
systems CRM systems project management

[44:08 - 44:12]
systems no code systems and Integrations

[44:11 - 44:13]
right I'm sure I could cut this down in

[44:12 - 44:15]
hindsite now that I know a little bit

[44:13 - 44:18]
more about prompt engineering I built

[44:15 - 44:20]
this thing out um I believe over a year

[44:18 - 44:21]
ago now uh it was one of the videos that

[44:20 - 44:23]
actually made me go viral on YouTube

[44:21 - 44:25]
then I say below is a job description

[44:23 - 44:27]
filter it for relevance true or false in

[44:25 - 44:29]
Json some of the platforms include use

[44:27 - 44:30]
air table clickup chat TBT make Monday

[44:29 - 44:32]
zap here LinkedIn Google Sheets if

[44:30 - 44:34]
relevant write a short introductory

[44:32 - 44:36]
Icebreaker okay but I'm not actually

[44:34 - 44:37]
done yet I then give it some example

[44:36 - 44:40]
client projects these are things that

[44:37 - 44:43]
I've done and then I tell it my format

[44:40 - 44:46]
okay so let's just be abundantly clear

[44:43 - 44:49]
here I provided a context over here then

[44:46 - 44:52]
I gave it some instructions over here so

[44:49 - 44:54]
sorry I think I misspoke earlier this is

[44:52 - 44:58]
my

[44:54 - 45:02]
context this is my

[44:58 - 45:03]
instructions okay after my context and

[45:02 - 45:06]
instructions what I do is I give it my

[45:03 - 45:08]
output format which is right over

[45:06 - 45:09]
here and then at the end I also have

[45:08 - 45:12]
some rules now in this case I wrote them

[45:09 - 45:14]
as notes but these are essentially my

[45:12 - 45:16]
rules then finally I actually give it

[45:14 - 45:18]
some examples and the way that you do

[45:16 - 45:20]
this in make.com and any other no code

[45:18 - 45:22]
tool is you will have your user prompt

[45:20 - 45:24]
up here with all of those four bits that

[45:22 - 45:26]
I showed you a moment ago and then you

[45:24 - 45:28]
have another user prompt with your first

[45:26 - 45:31]
example then another assistant prompt

[45:28 - 45:33]
with your first result and in my case I

[45:31 - 45:35]
did I think three or four shots so then

[45:33 - 45:37]
I have a user with an example this is an

[45:35 - 45:39]
actual job description from upw workk

[45:37 - 45:41]
then I have an assistant response with a

[45:39 - 45:43]
result then another user prompt

[45:41 - 45:44]
assistant prompt another user prompt

[45:43 - 45:45]
assistant prompt another user prompt

[45:44 - 45:47]
assistant prompt another user prompt

[45:45 - 45:48]
assistant prompt I think in this case

[45:47 - 45:50]
looks like I had like seven or six or

[45:48 - 45:52]
something like that uh in hindsight

[45:50 - 45:53]
probably too much and I was probably

[45:52 - 45:54]
forced to do this just because models

[45:53 - 45:56]
were a little bit less intelligent when

[45:54 - 45:57]
I built this out nowadays I might do

[45:56 - 45:59]
like two maybe

[45:57 - 46:01]
okay I also also wanted to show like a

[45:59 - 46:02]
wide range of possible jobs which um

[46:01 - 46:05]
obviously helped to perform and this is

[46:02 - 46:06]
why I have almost $500,000 in posted

[46:05 - 46:08]
earnings on my profile because I use

[46:06 - 46:10]
systems like this to be able to apply to

[46:08 - 46:11]
large volumes of jobs I've also helped a

[46:10 - 46:13]
lot of other people and build out

[46:11 - 46:16]
processes that involve things like this

[46:13 - 46:17]
so um in a nutshell I almost always use

[46:16 - 46:19]
this key prompt structure with some

[46:17 - 46:22]
slight variations context is where you

[46:19 - 46:24]
tell it what you want like who you are

[46:22 - 46:26]
and what you want instructions are where

[46:24 - 46:28]
you outline specifically and say your

[46:26 - 46:29]
task is to do XY Z output format is

[46:28 - 46:31]
where you say something like return your

[46:29 - 46:33]
results in Json using this format rules

[46:31 - 46:35]
where you say hey here's a quick list I

[46:33 - 46:37]
want you you know don't do this do this

[46:35 - 46:38]
don't do this do this then examples

[46:37 - 46:41]
where you actually give it those user

[46:38 - 46:44]
prompt or user assistant prompt

[46:41 - 46:48]
pairs okay the next thing I want to talk

[46:44 - 46:50]
about tip number 13 is to use AI to

[46:48 - 46:53]
generate

[46:50 - 46:55]
examples for

[46:53 - 46:57]
AI

[46:55 - 46:59]
okay what do I mean by that well if we

[46:57 - 47:01]
go back to that prompt that I showed you

[46:59 - 47:04]
guys a moment ago right we have a lot of

[47:01 - 47:06]
examples here what you can do instead of

[47:04 - 47:08]
you actually finding an examp examples

[47:06 - 47:10]
you get you can actually like create one

[47:08 - 47:12]
yourself right so I can actually go and

[47:10 - 47:14]
I can create one so what do I mean by

[47:12 - 47:17]
this I could say um I'm actually going

[47:14 - 47:19]
to go all the way down to the bottom and

[47:17 - 47:22]
I actually want to generate my own

[47:19 - 47:24]
little assistant prompt right so maybe

[47:22 - 47:26]
what I'm going to do now is uh I don't

[47:24 - 47:27]
know I'm just going to go into AI paste

[47:26 - 47:29]
this

[47:27 - 47:32]
and say I'm using this for training

[47:29 - 47:35]
write me a similar training example as

[47:32 - 47:39]
the above this is just using a simple

[47:35 - 47:42]
hotkey um option space on Mac where I

[47:39 - 47:44]
can launch a chat GPT instance I should

[47:42 - 47:47]
know that this is not the same as the um

[47:44 - 47:49]
API that I'm using right now but does a

[47:47 - 47:50]
pretty good job right so now I have this

[47:49 - 47:52]
and what am I going to do I'm just going

[47:50 - 47:54]
to right click run this module only and

[47:52 - 47:57]
it's actually going to go through and

[47:54 - 48:00]
generate me a result using AI right

[47:57 - 48:02]
pretty simple and easy now this was back

[48:00 - 48:05]
in the day when you could not parse uh

[48:02 - 48:07]
the Json in the make Doom module anybody

[48:05 - 48:08]
that is a little bit more experienced

[48:07 - 48:09]
with make.com is probably looking at

[48:08 - 48:10]
this and being like hey why aren't you

[48:09 - 48:13]
parsing this directly inside of the

[48:10 - 48:14]
prompt that's just because the gbd 40613

[48:13 - 48:16]
model just didn't have access to do it

[48:14 - 48:18]
as you could see there's no there's no

[48:16 - 48:19]
tool for me to do so but basically what

[48:18 - 48:21]
we've done is we've outputed some Json

[48:19 - 48:23]
JavaScript object notation which I can

[48:21 - 48:25]
then feed into this module here to parse

[48:23 - 48:27]
automatically then produce me a variable

[48:25 - 48:29]
that I can access that looks kind of

[48:27 - 48:31]
like this reason result Icebreaker the

[48:29 - 48:33]
last tip I want to provide you guys is a

[48:31 - 48:37]
pretty simple one but it's to use the

[48:33 - 48:40]
right model for the task

[48:37 - 48:43]
okay I see a lot of people nowadays

[48:40 - 48:47]
using very simple

[48:43 - 48:50]
models so here's how it basically Works

[48:47 - 48:52]
simple models are cheap complex models

[48:50 - 48:54]
are more

[48:52 - 48:57]
expensive so this is a

[48:54 - 48:59]
gradient between simple and cheap

[48:57 - 49:01]
complex and expensive the unfortunate

[48:59 - 49:03]
thing is like 99% of people that I see

[49:01 - 49:05]
in in maker School make money with make

[49:03 - 49:07]
a comment on YouTube they're way too far

[49:05 - 49:08]
on the simple and the cheap side of

[49:07 - 49:10]
things as of the time of this video

[49:08 - 49:11]
there there a bunch of models available

[49:10 - 49:12]
I don't really want to date this too

[49:11 - 49:13]
much but you know a bunch of these are

[49:12 - 49:14]
like mini models and so what a lot of

[49:13 - 49:16]
people will do is they'll just use the

[49:14 - 49:18]
mini models because they think that it's

[49:16 - 49:21]
saving them a lot of money well unless

[49:18 - 49:23]
you're running something like that is

[49:21 - 49:25]
doing 5 million operations or executions

[49:23 - 49:27]
a day like unless you're running some

[49:25 - 49:29]
serious backend infra

[49:27 - 49:31]
token costs are so little that it

[49:29 - 49:34]
doesn't actually make any

[49:31 - 49:36]
sense not to just use like smart models

[49:34 - 49:37]
most of the time obviously there's some

[49:36 - 49:39]
exceptions but let me just run you

[49:37 - 49:43]
through what the gbt 40 family models

[49:39 - 49:45]
looks like okay this $250 cents per

[49:43 - 49:47]
million tokens of input $10 per 1

[49:45 - 49:49]
million tokens of output if we just like

[49:47 - 49:50]
average them and say I don't know for

[49:49 - 49:51]
the purposes of this I'm just going to

[49:50 - 49:54]
say it's five bucks per 1 million tokens

[49:51 - 49:56]
combined okay this upwork RSS feed thing

[49:54 - 49:59]
that I just did if we look at the usage

[49:56 - 50:02]
okay combin it was 1,169 I would have to

[49:59 - 50:05]
use one I would have to do this 1,000

[50:02 - 50:08]
times to use $5 that's crazy how many do

[50:05 - 50:11]
I actually do a day like 15 okay if we

[50:08 - 50:15]
do the math on this $5 divided by 1,000

[50:11 - 50:18]
means that for every run I use

[50:15 - 50:21]
0.5 this is equivalent

[50:18 - 50:24]
to uh

[50:21 - 50:26]
55.5 C so basically every two times I

[50:24 - 50:27]
run this it's 1 cent it's it's a it's a

[50:26 - 50:29]
penny

[50:27 - 50:31]
every four times I run this it's two

[50:29 - 50:33]
every eight times I run this it's four

[50:31 - 50:35]
right it's such a marginal small amount

[50:33 - 50:37]
of money that there's no reason and this

[50:35 - 50:39]
is by the way this is using a GPT 40613

[50:37 - 50:41]
and this is also using like a very very

[50:39 - 50:42]
under optimized Pro well maybe not very

[50:41 - 50:44]
under optimized but pretty under

[50:42 - 50:48]
optimized prompt with what I know now

[50:44 - 50:50]
the reality is you know like uh any case

[50:48 - 50:52]
that you could use GPT 40 mini which you

[50:50 - 50:54]
know is understandably much cheaper but

[50:52 - 50:56]
basically any use case you could use GPT

[50:54 - 50:58]
4 a mini for unless you're sending

[50:56 - 51:00]
Millions of tokens on a daily basis just

[50:58 - 51:02]
use the smarter model the smarter model

[51:00 - 51:03]
will eliminate like half of the problems

[51:02 - 51:04]
that you didn't even know you had and I

[51:03 - 51:06]
recommend always just starting with a

[51:04 - 51:07]
smarter model and then working your way

[51:06 - 51:08]
down as opposed to starting with a

[51:07 - 51:10]
dumber model and then trying to work

[51:08 - 51:13]
your way up just way easier to do that

[51:10 - 51:15]
way so I mean you know 75 bucks per a

[51:13 - 51:17]
million tokens for 4.5 or 150 bucks for

[51:15 - 51:18]
a million tokens like like yeah that's

[51:17 - 51:21]
pretty expensive and I could see that

[51:18 - 51:23]
being a limiter but the vast majority of

[51:21 - 51:25]
these o based multimodal models anyway

[51:23 - 51:27]
um as of the time of this recording are

[51:25 - 51:29]
hyper cheap and usually recommend Just

[51:27 - 51:30]
DE buying yourself debiasing yourself

[51:29 - 51:31]
and just trying to use the more

[51:30 - 51:32]
expensive ones wherever possible because

[51:31 - 51:35]
at the end of the day they're not really

[51:32 - 51:38]
that expensive my company um which is

[51:35 - 51:40]
called one second copy we still use a

[51:38 - 51:42]
lot of tokens on a daily basis I think

[51:40 - 51:43]
we spent like I don't know five bucks

[51:42 - 51:46]
last

[51:43 - 51:48]
month that's that's a company right

[51:46 - 51:50]
makes several tens of thousands of

[51:48 - 51:51]
dollars still so if you think about like

[51:50 - 51:53]
the the return on investment of these

[51:51 - 51:54]
tokens it it's crazy so just make sure

[51:53 - 51:56]
you use the right model for the task

[51:54 - 51:59]
most of the time that involves using a

[51:56 - 52:00]
little bit smarter model all right

[51:59 - 52:02]
that's it for this video had a lot of

[52:00 - 52:03]
fun recording it and re-recording it for

[52:02 - 52:05]
all yall if you guys have any questions

[52:03 - 52:06]
about this just drop them down below if

[52:05 - 52:09]
you guys want me to make videos on a

[52:06 - 52:11]
specific topic then please I love

[52:09 - 52:12]
getting ideas and I'm inspired for the

[52:11 - 52:14]
most part by people like you that

[52:12 - 52:15]
actually take the time to leave comments

[52:14 - 52:17]
down below saying Nick can you do a

[52:15 - 52:19]
video x1z Nick can you do a master class

[52:17 - 52:20]
on prompt engineering so this video is

[52:19 - 52:22]
because somebody earlier on in my

[52:20 - 52:24]
comments a few weeks ago asked me to do

[52:22 - 52:26]
this and I'm more than happy to do what

[52:24 - 52:27]
you what you want me to do as well

[52:26 - 52:29]
otherwise if you guys do me a big solid

[52:27 - 52:31]
anybody that's on the cusp of you know

[52:29 - 52:33]
starting an automation agency or getting

[52:31 - 52:35]
up and running with their own business

[52:33 - 52:37]
that hasn't had a lot of experience in

[52:35 - 52:40]
service companies or in any sort of

[52:37 - 52:41]
automation scenario before I'd highly

[52:40 - 52:42]
recommend that you check out maker

[52:41 - 52:43]
school it's my day-by-day accountability

[52:42 - 52:45]
program and you can get the link just in

[52:43 - 52:47]
the description I guide you through

[52:45 - 52:49]
setting up essentially your own

[52:47 - 52:50]
automation outfit um from complete

[52:49 - 52:52]
scratch and bootstrap in the hell out of

[52:50 - 52:53]
it while you're at it and for anybody

[52:52 - 52:55]
that maybe knows a little bit more about

[52:53 - 52:57]
business that already has an automation

[52:55 - 52:59]
business for instance or somebody that

[52:57 - 53:01]
runs uh a business in a very similar

[52:59 - 53:03]
domain to automation maybe a marketing

[53:01 - 53:04]
agency maybe some sort of advertising or

[53:03 - 53:06]
creative business check out make money

[53:04 - 53:08]
with make.com it's my mid-level

[53:06 - 53:11]
community that helps people that run

[53:08 - 53:13]
businesses over5 to $10,000 a month

[53:11 - 53:15]
scale using my own products systems

[53:13 - 53:17]
templates and so on and so forth both of

[53:15 - 53:18]
these communities have me and them every

[53:17 - 53:20]
single day coaching and guiding you guys

[53:18 - 53:23]
through I'm a very friendly and familiar

[53:20 - 53:24]
face you can hopefully tell from now um

[53:23 - 53:26]
and yeah I'd be I'd be more than than

[53:24 - 53:27]
happy to see you in there and then help

[53:26 - 53:29]
you out if you guys could do me a solid

[53:27 - 53:30]
like subscribe do all the fun YouTube

[53:29 - 53:33]
stuff I'll catch you on the next one

[53:30 - 53:33]
cheers

## コメント

### 1. @nicksaraev (👍 8)
🚀 Land your first automation client in 90 days — guaranteed
👉 Join Maker School: https://www.skool.com/makerschool

### 2. @kuldar (👍 96)
If anyone were to doubt his automation skills, just look at the insane volume of videos he's been putting out. Jiminy crickets!

> **@TechTomlet** (👍 3): I know dude its nuts

> **@0x.86** (👍 5): gotta be ai

> **@Eddiea2024** (👍 2): This is so stupid.

> **@turbocar5656** (👍 4): A lot of it is fluff lol

> **@infinit854** (👍 1): That's like saying my crap is good quality just because I've dropped so many in my toilet 👍

### 3. @aravindkr (👍 15)
This was one of the most clearly rendered educational videos on Prompt Engineering i have ever seen.  Looking forward to seeing more of your videos.  Since you asked at the end, I would love to see your vibe coding workflows and methodology you adopt while building software today using tools such as Cursor/Windsurf or other IDEs you recommend.

### 4. @joehernandez1812 (👍 20)
I love the quality, insight and value that you give. Definitely joining the community today!

> **@nicksaraev** (👍 4): Looking forward to having you Joe

> **@freakradio** (👍 1): @@nicksaraev we need to talk

### 5. @Matt-zz8mv (👍 20)
I got into this AI topic quite recently, a couple of months ago, all this time I had "brilliant" ideas here and there, but as soon as you dive into the topic you almost immediately find how someone has already thought of a better version of it, it's a little frustrating, but at the same time it blows your mind from how much cool stuff can be done with AI

> **@CopySwiper69** (👍 3): experienced this, but remember the shiny object syndrome does exist. Stick to 1 solid idea. you got it. 🤜

### 6. @AdityaPratap_IIT (👍 6)
Hey Nick without any fluff i would request you to please bring something like this for ai agents automation and their working behind scenes. Your are indeed a gem in this field..

### 7. @asrgomes (👍 7)
Best video on this topic I've seen so far. Very detailed with tons of examples. Thank you!

### 8. @FollowNask (👍 5)
You are putting out content faster than I can learn them!
I need to speed up! Gotta go fast!

Thank man.

> **@nicksaraev** (👍 2): Just building up a bank for you, Rodrigo 😂

### 9. @optionstrading1727 (👍 1)
Great video... the best one I have seen so far on prompt engineering. Thanks for sharing your knowledge.

### 10. @TRKhero (👍 9)
Its crazy how i used to use these techniques somewhat unknowingly. Not because I understand tokens or anything but because im lazy😭

### 11. @buzztrends9091 (👍 1)
New subscriber here 🙌 Honored to be part of this amazing community. Massive respect for the knowledge you’re dropping. Keep it up!

### 12. @tudor-matei (👍 2)
hey Nick, thanks for sharing all these tips. One thing you forgot to mention when you were talking about predictability of output is playing with the temperature on how creative vs deterministic the model output is.

### 13. @trevorb7595 (👍 1)
Thank you.  You cleared up so many misconceptions, answered so many questions I had about AI prompting.

### 14. @RetepBoy (👍 1)
I need to go through your other videos, before I can even decide what the right question is. I run a smaller manufacturing business. We private label, but also run our own brand. Streamlining and optimizing things like customer service, managing various ecommerce sites (tiktok, amazon, woo commerce). Plus loads of operational tasks that could be improved. I don't even know where to start. I have used prompts to generate great blogs and content so far, but that is ai 101.

### 15. @JasonNaas (👍 3)
Last weekend I took the Google Prompting Essentials course. This weekend I took yours. And yours is miles better. Thank you!

> **@TheOliviaStories** (👍 0): have you bought his skool course

### 16. @selfmade9468 (👍 3)
I think i just found what i am missing for the past couple of months. Looking forward for your new videos. Thanks nick for this valuable information

### 17. @bernsbuenaobra3665 (👍 1)
This guy must be from Mars! Great insight and very much well grounded! Unselfish to share his trade Im totally impressed and drawn to it! This will serve me well in the near future! Thank you!

### 18. @yahyag (👍 5)
Very valuable video Nick. The simplifying prompts section was pure gold for a non-technical biz owner like me.

### 19. @benjaminreid5339 (👍 0)
This is an outstanding video.  Very valuable content and clearly expressed.  Thank you so much.

### 20. @hillrezztv (👍 0)
I’m just getting started and don’t have a ton of experience. I will you definitely join the community. Thank you for the information.

