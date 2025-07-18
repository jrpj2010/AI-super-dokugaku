# Master Prompt Engineering – Build Smarter AI Apps with Lovable!

**チャンネル:** Lovable
**公開日:** 2025-02-18
**URL:** https://www.youtube.com/watch?v=IqWfKj4mUIo

## 説明

🚀 Want to craft better AI prompts and automate your workflow? Join this Lovable Livestreams session as we deep-dive into AI-powered app development, prompt engineering, and workflow automation with special guest @Mark_Kashef !

Topics Covered in This Session:
✅ Understanding effective AI prompting 🤖
✅ The four tiers of prompt engineering 🎯
✅ Meta prompting techniques & best practices 📝
✅ Debugging strategies for AI workflows 🔧
✅ Building an AI app using Lovable & Make.com 🔗
✅ Integrating Visual Edits & Tailwind CSS for UI design 🎨

💡 Whether you're a developer, AI enthusiast, or no-code beginner, this session will help you build smarter, faster, and more efficiently with AI!

📌 Resources & Links Mentioned:
👉 Join the Lovable Discord Community → https://discord.com/invite/rPw2rSFE2K
👉 Explore Chat Mode & Visual Edits in Lovable → https://docs.lovable.dev/features/labs
👉 Mark Kasaf’s YouTube Channel (Prompt Engineering & AI Tips) → https://www.youtube.com/@Mark_Kashef
👉 Lovable Support & Docs → https://lovable.dev/support
👉 Sign up for Free on Lovable → https://lovable.dev/
👉 Lovable GPTs Available:
🔹 Lovable Visual Editor GPT
🔹 Lovable AI Builder GPT

🔔 Subscribe & Stay Updated! Don’t miss our next Livestream session on design & UI improvements with Visual Edits! Hit the 🔔 Notification Bell to stay in the loop.

Timestamps for Easy Navigation
00:00 – Introduction of Team & Lovable’s Mission
02:09 – Recent Product Updates & Migration to Go
03:52 – Understanding the Importance of Effective Prompting
06:40 – Four Tiers of Prompting Explained
12:17 – Meta Prompting Techniques & Best Practices
37:55 – Debugging Strategies & Error Handling
45:00 – Building a Practical Example Application
49:53 – Integrating Make.com with Lovable
58:31 – Visual Editing Features & Tailwind CSS
01:03:42 – Wrap-Up & Additional Resources

💬 What’s your biggest challenge with prompt engineering? Drop a comment below!

#Lovable #PromptEngineering #AIApps #NoCode #ChatGPT #Automation #makeautomation #n8n #Supabase

## 字幕

[00:00 - 00:05]
are we live can people hear you if you

[00:03 - 00:07]
hear us if you can do a type one or

[00:05 - 00:07]
something in the

[00:08 - 00:12]
chat give a couple more seconds for the

[00:11 - 00:14]
people

[00:12 - 00:16]
to log

[00:14 - 00:21]
in nice and also yeah feel free to drop

[00:16 - 00:21]
also where you're you're connecting

[00:22 - 00:29]
from cool all right uh looks like we are

[00:26 - 00:32]
live I'm seeing the first ones coming in

[00:29 - 00:34]
the Stream um so with the team at

[00:32 - 00:36]
lovable um you probably know what we're

[00:34 - 00:39]
doing but we basically want to enable

[00:36 - 00:41]
anyone to transform their ideas into

[00:39 - 00:43]
working software that that's sort of our

[00:41 - 00:45]
mission so instead instead of hiring or

[00:43 - 00:47]
needing needing to hire a software

[00:45 - 00:50]
engineer that is often costly and slow

[00:47 - 00:52]
you simply ask in AI in plain English

[00:50 - 00:56]
what you want and you get a working app

[00:52 - 00:57]
or website out of it um I'm joined here

[00:56 - 01:00]
by a number of people we'll do a quick

[00:57 - 01:01]
round of intros I'll start before I hand

[01:00 - 01:05]
it over my name is Christian I'm part of

[01:01 - 01:06]
the product team here at lovable um and

[01:05 - 01:08]
I have Nicholas with me Nicholas you

[01:06 - 01:10]
want to go

[01:08 - 01:12]
next yeah I'm a software engineer here

[01:10 - 01:14]
at loveable um doing all kinds of stuff

[01:12 - 01:18]
mostly focusing on front end right now

[01:14 - 01:21]
bringing out some nice better ux yeah

[01:18 - 01:25]
cool and we also have a very special

[01:21 - 01:27]
guest uh Mark Mark over to you yeah for

[01:25 - 01:28]
sure yeah my name is Mark um I run a

[01:27 - 01:31]
company called prompt advisors where we

[01:28 - 01:33]
help businesses use and generate um use

[01:31 - 01:35]
AI in their workflows and yeah I have a

[01:33 - 01:36]
YouTube channel where I go pretty mad

[01:35 - 01:40]
scientist on all things prompt

[01:36 - 01:42]
engineering and and gen in general cool

[01:40 - 01:44]
and then we also have Stefan Manning and

[01:42 - 01:46]
producing the event he's leading our

[01:44 - 01:49]
community today you probably know him

[01:46 - 01:52]
from from Discord um but yeah maybe

[01:49 - 01:53]
before we go into like the focus of

[01:52 - 01:55]
today's session which I think a lot of

[01:53 - 01:58]
you are very excited about we can do

[01:55 - 02:00]
some basic housekeeping uh we skipped

[01:58 - 02:03]
the office hours last week there been a

[02:00 - 02:05]
bit of a gap on on coms so do we have

[02:03 - 02:07]
anything interesting we should be uh

[02:05 - 02:09]
yeah shouting out this time nichas yeah

[02:07 - 02:10]
there's a lot of things to look forward

[02:09 - 02:13]
to but I'm just going to recap what we

[02:10 - 02:15]
have done in the past weeks first so as

[02:13 - 02:18]
many of you might have know we migrated

[02:15 - 02:20]
our back end from python to go overall

[02:18 - 02:21]
it's been very successful I see a lot of

[02:20 - 02:23]
improvements especially for us

[02:21 - 02:25]
developers but there are still some

[02:23 - 02:27]
issues and we are aware of them and

[02:25 - 02:30]
we're trying to do our best to like

[02:27 - 02:32]
hatch this out and fix it uh but if you

[02:30 - 02:35]
still have issues after this migration

[02:32 - 02:36]
from python to go please reach out to us

[02:35 - 02:39]
uh but to more exciting news as a part

[02:36 - 02:41]
of the go migration we're much more

[02:39 - 02:43]
quicker on iterating of things so last

[02:41 - 02:46]
week you might have noticed that we H

[02:43 - 02:49]
released our visual edit

[02:46 - 02:50]
function uh and yeah I hope you're

[02:49 - 02:53]
enjoying it if there's any feedback on

[02:50 - 02:56]
it we're happy to take it so we can keep

[02:53 - 02:58]
on going H and lastly we also have

[02:56 - 03:01]
office hours on Thursday I think Chris

[02:58 - 03:03]
can update you on what the topic is and

[03:01 - 03:05]
I'm also going to plug just quick quick

[03:03 - 03:07]
one here that we are going to do one

[03:05 - 03:08]
with super base in the coming weeks so

[03:07 - 03:12]
stay tuned for

[03:08 - 03:13]
that yeah don't you Chris yes so the the

[03:12 - 03:17]
one on Thursday is going to be focusing

[03:13 - 03:19]
on using visual edits uh tips and tricks

[03:17 - 03:21]
we're gonna have NAD who's our head of

[03:19 - 03:22]
design and Harry join us for that one so

[03:21 - 03:24]
I think it's going to be a good session

[03:22 - 03:27]
and then as Nicholas say we'll have one

[03:24 - 03:28]
with the super based team uh covering um

[03:27 - 03:31]
whatever you guys think is most

[03:28 - 03:34]
important uh so we'll be maybe asking

[03:31 - 03:37]
for you guys input on what to focus on

[03:34 - 03:40]
um but yeah back to today's session so

[03:37 - 03:44]
typically these sessions are very

[03:40 - 03:45]
focused on building we we build live uh

[03:44 - 03:47]
you know taking into account the risk

[03:45 - 03:49]
that you know doing live Devils implies

[03:47 - 03:52]
but today is going to be a bit of a mix

[03:49 - 03:54]
uh it's going to be some expertise uh

[03:52 - 03:55]
and good prompting can in my experience

[03:54 - 03:58]
Mark the difference between you having a

[03:55 - 04:00]
super great ride with tools like lovable

[03:58 - 04:01]
and you know digging yourself into a

[04:00 - 04:03]
deep deep hole and there's a lot of

[04:01 - 04:05]
tricks that normally come with practice

[04:03 - 04:07]
and iterating so we want to make like

[04:05 - 04:09]
sort of speedrun you into into getting

[04:07 - 04:10]
all that knowledge without having to go

[04:09 - 04:14]
through the through the grueling pains

[04:10 - 04:17]
um so having said that I think I'll hand

[04:14 - 04:19]
it over to you mark you're the expert uh

[04:17 - 04:22]
and to sort of do a deep dive into the

[04:19 - 04:25]
art of H prompting I guess perfect thank

[04:22 - 04:27]
you so much Christian so uh my goal is

[04:25 - 04:29]
to go through some slides just to show

[04:27 - 04:31]
you just general concepts that not

[04:29 - 04:33]
everyone might be aware of and I'm just

[04:31 - 04:34]
going to share them right now just going

[04:33 - 04:37]
to go

[04:34 - 04:40]
here just let me know in the chat if you

[04:37 - 04:44]
can see my screen you should see a

[04:40 - 04:46]
heart yes we see it perfect all right so

[04:44 - 04:49]
um big picture why prompting is so

[04:46 - 04:50]
important is it not only sets the tone

[04:49 - 04:53]
for how your lovable apps going to be

[04:50 - 04:56]
built but when you run into errors there

[04:53 - 04:58]
are some cheat codes that myself and my

[04:56 - 05:00]
team have figured out that help you get

[04:58 - 05:03]
out of jail in level or any other

[05:00 - 05:05]
similar function that it really helps

[05:03 - 05:07]
you expedite things and understand where

[05:05 - 05:09]
things went wrong because sometimes you

[05:07 - 05:11]
get stuck on an error and you just spin

[05:09 - 05:14]
forever once you understand what's

[05:11 - 05:16]
happening and what the error is that

[05:14 - 05:18]
unlocks learning and for you to start

[05:16 - 05:20]
the next lovable app with the best foot

[05:18 - 05:22]
forward so we're not going to spend too

[05:20 - 05:25]
much in lecture land here but just some

[05:22 - 05:27]
reminders that are super helpful because

[05:25 - 05:29]
none of this stuff is Magic It's a

[05:27 - 05:32]
combination of a lot of engineering from

[05:29 - 05:34]
the lovable side and predictive prompts

[05:32 - 05:37]
meaning there's a prediction based on

[05:34 - 05:39]
your prompt your goal with a prompt is

[05:37 - 05:42]
to give enough information or enough

[05:39 - 05:44]
hints that the model can predict what

[05:42 - 05:46]
you want as an output there's no quote

[05:44 - 05:48]
unquote understanding yet in these

[05:46 - 05:50]
models you have an input and you get an

[05:48 - 05:52]
output and when you keep things

[05:50 - 05:54]
non-emotional like that knowing that

[05:52 - 05:57]
it's not magic when things go wrong it's

[05:54 - 05:59]
usually a combination of a prompt where

[05:57 - 06:00]
you weren't able to articulate what you

[05:59 - 06:03]
wanted to articul in the way it was

[06:00 - 06:06]
expecting or there's a mismatch in terms

[06:03 - 06:08]
of what it's expecting as an input so

[06:06 - 06:10]
real quick because they're all

[06:08 - 06:14]
probability based the more you can load

[06:10 - 06:16]
a prompt with either examples or the

[06:14 - 06:18]
words it understands are knows so for

[06:16 - 06:21]
example let's say you're implementing an

[06:18 - 06:22]
edge function using superbase and you

[06:21 - 06:24]
know that you not only want to send a

[06:22 - 06:27]
request but you want to receive a

[06:24 - 06:29]
request from another service or

[06:27 - 06:31]
microservice even just going the next

[06:29 - 06:33]
step and telling it you know what we

[06:31 - 06:37]
want you to handle the response in XYZ

[06:33 - 06:38]
way is helpful to know back and forth

[06:37 - 06:40]
what the input is and what the expected

[06:38 - 06:43]
output

[06:40 - 06:46]
is in general I go through four main

[06:43 - 06:48]
tiers of prompting one of them or maybe

[06:46 - 06:50]
two of them the majority of you will be

[06:48 - 06:52]
aware of the last two the majority of

[06:50 - 06:55]
people that we work with and I meet are

[06:52 - 06:56]
less aware of so the training wheels

[06:55 - 06:59]
method and I'm not just going to be

[06:56 - 07:02]
yapping here I'll pull up um an example

[06:59 - 07:05]
little screen here on chat gbt the

[07:02 - 07:06]
standard method you probably learned is

[07:05 - 07:09]
you use a combination of what's called

[07:06 - 07:11]
markdown where one hashtag is supposed

[07:09 - 07:13]
to denote a header which is like the

[07:11 - 07:16]
most important part of the prompt a

[07:13 - 07:18]
double hashtag is something like a

[07:16 - 07:22]
subtitle triple hashtag is even a

[07:18 - 07:24]
smaller subtitle where asterisks become

[07:22 - 07:27]
a bold so now typically you would have

[07:24 - 07:29]
seen something like you have a context

[07:27 - 07:30]
and then you have a task then you have

[07:29 - 07:32]
some form of of

[07:30 - 07:35]
guidelines and then you have

[07:32 - 07:37]
constraints and then you use these

[07:35 - 07:40]
hashtags as a way to tell the model hey

[07:37 - 07:42]
this is a proxy for a new section or

[07:40 - 07:44]
importance so this is typically what you

[07:42 - 07:45]
would start with and this is the

[07:44 - 07:48]
training wheels method where you're

[07:45 - 07:52]
still understanding that for most models

[07:48 - 07:54]
let's say Claude 3.5 Sonet gbt 40 and

[07:52 - 07:56]
all kinds of models they care about

[07:54 - 07:58]
what's at the very beginning and the

[07:56 - 08:01]
very end of a prompt there's recency

[07:58 - 08:02]
bias there not great right now at

[08:01 - 08:04]
something called Lost in the middle

[08:02 - 08:07]
logic where some portions of the body of

[08:04 - 08:10]
your prompt are not forgotten about but

[08:07 - 08:12]
it's paid attention paid attention to

[08:10 - 08:13]
less we have more and more models right

[08:12 - 08:15]
now like Gemini flash that are coming

[08:13 - 08:18]
out that are better at this but knowing

[08:15 - 08:21]
that there are these biases should push

[08:18 - 08:24]
you to make as concise but high value

[08:21 - 08:26]
per token prompts as possible so this is

[08:24 - 08:30]
the typical training wheel method where

[08:26 - 08:32]
you have these different headers the I'm

[08:30 - 08:34]
interject and ask you here I saw in the

[08:32 - 08:36]
chat that there's one person asking for

[08:34 - 08:39]
sheet sheet to download will you post

[08:36 - 08:41]
one of that and also someone is asking

[08:39 - 08:44]
what's the optimal number of words in a

[08:41 - 08:47]
prompt if there is one yeah so first one

[08:44 - 08:49]
uh I can put together something for you

[08:47 - 08:50]
to distribute to the community here so

[08:49 - 08:53]
I'll take care of that in terms of

[08:50 - 08:55]
number of words there is no magic number

[08:53 - 08:58]
of words the Nuance with prompting is

[08:55 - 09:00]
not just at the conceptual level every

[08:58 - 09:03]
model should be promp prompted slightly

[09:00 - 09:05]
differently um so claw 3.5 Sonet has a

[09:03 - 09:07]
different personality with prompting

[09:05 - 09:09]
than gbt 40 and reasoning models

[09:07 - 09:12]
obviously they're not unlovable yet but

[09:09 - 09:14]
in the future like 01 or uh deep seek

[09:12 - 09:17]
the way you prompt those is wildly

[09:14 - 09:19]
different those want way less input and

[09:17 - 09:23]
very targeted sentences whereas with

[09:19 - 09:27]
foro or Sonet sometimes more is better

[09:23 - 09:30]
and uh if it's not as detailed less is

[09:27 - 09:32]
more makes sense

[09:30 - 09:34]
cool so that's the training wheels the

[09:32 - 09:36]
no training wheels is when you start

[09:34 - 09:38]
using this framework of the context and

[09:36 - 09:40]
the guidelines Etc without actually

[09:38 - 09:42]
calling it out it's a part of your

[09:40 - 09:44]
actual workflow the part here that

[09:42 - 09:46]
should help many of you and if anyone's

[09:44 - 09:49]
here watch my channel on lovable I use

[09:46 - 09:51]
this as my get out of jail card to be

[09:49 - 09:55]
not only lazy but also be much better at

[09:51 - 09:58]
explaining things so myself I am a data

[09:55 - 10:00]
scientist full stacked of data scientist

[09:58 - 10:01]
by trade not a soft Ware engineer so

[10:00 - 10:04]
when it comes to implementing things I

[10:01 - 10:06]
don't necessarily have the words to

[10:04 - 10:08]
describe things that a season software

[10:06 - 10:10]
engineer would be able to do so one of

[10:08 - 10:12]
my get out of jail free cards is

[10:10 - 10:16]
creating a prompt that's similar to this

[10:12 - 10:18]
where I assign whatever language model

[10:16 - 10:20]
the role of a prompt engineer so I say

[10:18 - 10:23]
something like and I'll be extra lazy

[10:20 - 10:25]
here by using my voice you are a world

[10:23 - 10:28]
class prompt engineer you put together

[10:25 - 10:30]
very detailed prompts that are concise

[10:28 - 10:32]
but detailed enough that I can get my

[10:30 - 10:35]
desired output when I ask you for a

[10:32 - 10:37]
prompt I want you to put together the

[10:35 - 10:40]
prompt in markdown in a code block so I

[10:37 - 10:41]
can easily copy it and then I'll say

[10:40 - 10:43]
what I actually let me just stop that

[10:41 - 10:47]
there and then I'll say what I actually

[10:43 - 10:53]
want so write me a prompt that will

[10:47 - 10:55]
generate a full stack app that will take

[10:53 - 10:57]
an input of let's

[10:55 - 11:02]
say

[10:57 - 11:05]
someone's name number and Company and

[11:02 - 11:08]
generate a

[11:05 - 11:10]
report about their company and let's

[11:08 - 11:12]
just do that as a as a draft here what

[11:10 - 11:14]
the actual output is is not much of a

[11:12 - 11:16]
concern but typically I'll ask a

[11:14 - 11:18]
reasoning model to make these prompts

[11:16 - 11:20]
now because they're really good at

[11:18 - 11:22]
prompt engineering and you might not

[11:20 - 11:24]
think about it because not intuitive but

[11:22 - 11:26]
the best prompt prompt Engineers on

[11:24 - 11:28]
Earth are the language models themselves

[11:26 - 11:30]
who better to ask how to talk to

[11:28 - 11:32]
something than a member of that

[11:30 - 11:34]
Community itself yeah for someone for

[11:32 - 11:37]
someone new to to the like types of

[11:34 - 11:38]
models like can you give a quick like

[11:37 - 11:41]
one line like one sentence explanation

[11:38 - 11:43]
on what a reasoning model is versus a

[11:41 - 11:45]
non- reasoning model U that we might be

[11:43 - 11:47]
more used to uh yeah great question so

[11:45 - 11:50]
the I like to call it Old World versus

[11:47 - 11:53]
New World old world is gbg 40 3.5 Sonet

[11:50 - 11:55]
and everything before that those models

[11:53 - 11:58]
take in input and directly predict an

[11:55 - 12:01]
output and spit that back out a

[11:58 - 12:05]
reasoning model will take either one to

[12:01 - 12:07]
n number of steps to Output its result

[12:05 - 12:09]
then it checks that result against your

[12:07 - 12:11]
prompt again and double checks did I

[12:09 - 12:13]
fulfill Christian's request or not and

[12:11 - 12:16]
then it goes back again and depending on

[12:13 - 12:18]
how much thinking or reasoning it needs

[12:16 - 12:20]
to do it keeps going that Loop to check

[12:18 - 12:22]
its own work so whereas with 40 or

[12:20 - 12:25]
anything else you only worry about

[12:22 - 12:26]
oneway traffic with reasoning models

[12:25 - 12:28]
there's two-way traffic because there's

[12:26 - 12:30]
actual back and forth makes sense makes

[12:28 - 12:31]
sense and then more importantly maybe

[12:30 - 12:34]
what what did you use to record your

[12:31 - 12:36]
voice there on chat gbt yeah so it's

[12:34 - 12:37]
it's a free extension it's called voice

[12:36 - 12:40]
control for chat gbt it's a Chrome

[12:37 - 12:44]
extension and it'll work automatically

[12:40 - 12:46]
as soon as you upload it nice ni cool so

[12:44 - 12:49]
you can see here um it's smart enough to

[12:46 - 12:51]
even understand the Dynamics of what I

[12:49 - 12:54]
showed you manually so it says you are

[12:51 - 12:55]
an expert full stack engineer create a

[12:54 - 12:56]
full complete production ready web app

[12:55 - 12:59]
and then it goes through all the

[12:56 - 13:02]
different things here and notice how it

[12:59 - 13:04]
produces markdown itself it's very

[13:02 - 13:06]
concise so even if you have a prompt you

[13:04 - 13:09]
want to start with lovable I would ask

[13:06 - 13:11]
AI just to double check it lean it down

[13:09 - 13:14]
compress it so that it's as valuable as

[13:11 - 13:17]
possible without being confusing so

[13:14 - 13:19]
that's one tier of meta prompting the

[13:17 - 13:22]
cheat code is when you're getting

[13:19 - 13:23]
outputs that are not expected instead of

[13:22 - 13:26]
going back into a fresh new chat you can

[13:23 - 13:26]
say I tested this and let me just zoom

[13:26 - 13:29]
in

[13:26 - 13:32]
here and it's using

[13:29 - 13:36]
um I don't know

[13:32 - 13:39]
typescript but it should be in node.js

[13:36 - 13:41]
right so in in this case we don't care

[13:39 - 13:42]
about the actual languages it's more so

[13:41 - 13:44]
the fact that you can now have your own

[13:42 - 13:46]
mini prompt engineer chat that you go

[13:44 - 13:47]
back and forth with until you get the

[13:46 - 13:49]
prompt that gets you to the outcome

[13:47 - 13:50]
you're looking for so now even when it

[13:49 - 13:53]
comes to like what do I do with my

[13:50 - 13:56]
prompt just ask the AI and give it that

[13:53 - 13:58]
criticism of what went wrong okay um

[13:56 - 13:59]
this this for me like for me to

[13:58 - 14:02]
understand this is basically if you

[13:59 - 14:03]
notice the prompt they created is like

[14:02 - 14:05]
not really using the Technologies you

[14:03 - 14:08]
know lovable uses in our case it's like

[14:05 - 14:10]
react and and super base you can kind of

[14:08 - 14:12]
like correct it and say like no actually

[14:10 - 14:14]
use this instead exactly exactly so you

[14:12 - 14:17]
can course correct the

[14:14 - 14:19]
prompt makes sense now this is the part

[14:17 - 14:21]
where I want as many people to focus on

[14:19 - 14:25]
as possible because this is the most

[14:21 - 14:28]
tangible part to um building things on

[14:25 - 14:30]
lovable so when it's not just about meta

[14:28 - 14:32]
prompting you can do something called

[14:30 - 14:35]
reverse meta prompting now what that

[14:32 - 14:37]
means is you had a back and forth with

[14:35 - 14:39]
lovable let's say you had tons of Errors

[14:37 - 14:41]
which will happen to the best of us no

[14:39 - 14:43]
matter how well you prompt because some

[14:41 - 14:45]
things are in predictable so I'm going

[14:43 - 14:48]
to show you an example of an app here

[14:45 - 14:50]
that I put together so this app

[14:48 - 14:52]
transparently even with good prompt

[14:50 - 14:54]
engineering took me around an hour and a

[14:52 - 14:56]
bit to get through the books and its

[14:54 - 14:59]
function is pretty straightforward I

[14:56 - 15:02]
upload a PDF that PDF PF should get

[14:59 - 15:04]
stored in super based storage and then I

[15:02 - 15:06]
should be able to parse that PDF by

[15:04 - 15:09]
clicking on extract text and then it

[15:06 - 15:12]
should show me that text now the entire

[15:09 - 15:15]
chat we got hung up on things like

[15:12 - 15:18]
authentication the security of the

[15:15 - 15:21]
actual PDF and you'll see here we got

[15:18 - 15:24]
tons of Errors uh post requests were not

[15:21 - 15:26]
going properly there's a function issue

[15:24 - 15:28]
with the storage uh security again so at

[15:26 - 15:31]
the end of this I'm like I don't want to

[15:28 - 15:34]
go through this ever again so reverse

[15:31 - 15:36]
meta prompting is when I I end the chat

[15:34 - 15:39]
with something very important so let me

[15:36 - 15:43]
just go back here let me go

[15:39 - 15:46]
into uh this here I'll just zoom

[15:43 - 15:48]
in all right so you can see here at the

[15:46 - 15:50]
very end of the chat once I figured it

[15:48 - 15:52]
out I say now put together a detailed

[15:50 - 15:55]
instructive prompt end to end I can

[15:52 - 15:57]
provide from the beginning next time

[15:55 - 16:00]
that captures all of this and one thing

[15:57 - 16:01]
before I said that was I said said this

[16:00 - 16:03]
is a good start can you give detailed

[16:01 - 16:05]
why information from some of our

[16:03 - 16:07]
requirements was not fully understood

[16:05 - 16:09]
and can you summarize all the errors I

[16:07 - 16:12]
went through so that the next time I do

[16:09 - 16:15]
this I don't have to start from scratch

[16:12 - 16:18]
and the output is something like this

[16:15 - 16:23]
which is let me go down to the bottom

[16:18 - 16:25]
here there we go cool let's zoom in so

[16:23 - 16:27]
now it created its own prompt that I can

[16:25 - 16:29]
use in lovable next time it says create

[16:27 - 16:31]
a full stack PDF processing and

[16:29 - 16:33]
summarization system with the following

[16:31 - 16:36]
specifications uh super based project

[16:33 - 16:38]
with these requirements it even

[16:36 - 16:40]
summarized what SQL request I should

[16:38 - 16:43]
have given to increase the likelihood

[16:40 - 16:45]
that it will understand the next thing

[16:43 - 16:47]
is um Edge function like basically what

[16:45 - 16:49]
kind of edge functions should we use and

[16:47 - 16:51]
how should they be used it gives it a

[16:49 - 16:54]
cheat sheet for the security stuff that

[16:51 - 16:55]
I ran into this one component here is

[16:54 - 16:58]
what I spent four chats going back and

[16:55 - 17:00]
forth with now again it's aware of it it

[16:58 - 17:02]
doesn't mean that it won't make that

[17:00 - 17:03]
same mistake again but the fact that

[17:02 - 17:06]
it's in the context window will give it

[17:03 - 17:09]
an easy hint or a cheat sheet that you

[17:06 - 17:11]
know what this is probably the error and

[17:09 - 17:12]
then as you go down here it says

[17:11 - 17:14]
different things to look out for so

[17:12 - 17:16]
empty PDFs I uploaded a PDF that was

[17:14 - 17:18]
empty and didn't know how to handle it

[17:16 - 17:19]
so now it's trying to look out for it

[17:18 - 17:22]
and then you can go down here it'll give

[17:19 - 17:24]
more and more requirements um looking

[17:22 - 17:26]
out for certain errors and this is a

[17:24 - 17:27]
better prompt than I could ever put

[17:26 - 17:30]
together because it's using the software

[17:27 - 17:32]
engineer sorry software engineer words

[17:30 - 17:34]
that I might not have yeah so this is

[17:32 - 17:36]
basically you saying I've gone through

[17:34 - 17:38]
all this pain I finally got it working

[17:36 - 17:39]
next time I do this I just want to save

[17:38 - 17:41]
a bunch of time so I'm just gonna tell

[17:39 - 17:43]
it to tell me exactly what it did and

[17:41 - 17:45]
then I can just sort of like store this

[17:43 - 17:47]
somewhere and reuse it in a in a in a

[17:45 - 17:49]
yeah in the next project I do basically

[17:47 - 17:50]
okay makes a lot sense and and can I ask

[17:49 - 17:52]
you mark did you use out of curiosity

[17:50 - 17:54]
are you using chat mode for this or for

[17:52 - 17:56]
any like are you a big user of chat mode

[17:54 - 17:58]
and do you use chat mode particularly

[17:56 - 17:59]
for this uh reverse engineering

[17:58 - 18:01]
technique or

[17:59 - 18:04]
yes yes so for this final technique I go

[18:01 - 18:06]
full chat mode and I go back and forth

[18:04 - 18:07]
until I'm happy with it and yes I'm GNA

[18:06 - 18:08]
actually go through chat mode very

[18:07 - 18:10]
shortly right now okay so I I won't

[18:08 - 18:15]
Spill the Beans then you're good you're

[18:10 - 18:17]
good cool um I'll just go back here so

[18:15 - 18:18]
with lovable prompting so now hopefully

[18:17 - 18:20]
we should understand you know we have

[18:18 - 18:23]
four tiers of prompting telling the AI

[18:20 - 18:26]
to write prompts for you is a cheat code

[18:23 - 18:28]
now when it comes to lovable itself it's

[18:26 - 18:30]
also about foreshadowing and if that

[18:28 - 18:33]
work doesn't make much sense in your

[18:30 - 18:35]
first prompt you shouldn't just tell it

[18:33 - 18:37]
the functions you want to do that should

[18:35 - 18:40]
typically be sent at the second or third

[18:37 - 18:41]
prompt once you have superbase hooked up

[18:40 - 18:44]
because without superbase you're not

[18:41 - 18:46]
going to be able to really integrate and

[18:44 - 18:49]
build those Edge functions so your first

[18:46 - 18:51]
prompt should give a preview to The

[18:49 - 18:53]
Prompt of what the goal is what are we

[18:51 - 18:55]
trying to build what are the

[18:53 - 18:57]
functionalities you want the user to

[18:55 - 18:59]
have at a very high level meaning I want

[18:57 - 19:01]
the user to be able to upload X

[18:59 - 19:03]
and get y as a result that's the dream

[19:01 - 19:05]
vision and the UI should look like I

[19:03 - 19:07]
don't know you can come up with an idea

[19:05 - 19:09]
or you can upload a screenshot of some

[19:07 - 19:12]
inspiration UI you want that should be

[19:09 - 19:14]
your first prompt once all this is taken

[19:12 - 19:17]
care of and now you've hooked up to

[19:14 - 19:22]
superbase my next cheat code for you is

[19:17 - 19:25]
I spend now 70% of my lovable sessions

[19:22 - 19:27]
in chat mode and the reason why is

[19:25 - 19:30]
sometimes again you're unclear on what

[19:27 - 19:32]
your requirements are so how do you

[19:30 - 19:34]
expect an llm to understand what you

[19:32 - 19:37]
want if we go back to the premise that

[19:34 - 19:38]
this is not magic an input and output

[19:37 - 19:41]
are the same meaning garbage in garbage

[19:38 - 19:43]
out when you go on sheat chat mode I

[19:41 - 19:44]
like to ask it hey here's my vision

[19:43 - 19:47]
here's the functionality I want to

[19:44 - 19:49]
integrate um does this make sense to you

[19:47 - 19:50]
and if it makes sense to you play it

[19:49 - 19:52]
back to me what you think I want to

[19:50 - 19:54]
implement not only

[19:52 - 19:57]
that if I go to here I'm just going to

[19:54 - 19:59]
jump ahead for two seconds so um I have

[19:57 - 20:03]
one little hack here

[19:59 - 20:05]
llms like 3.5 Sonet 40 always remember

[20:03 - 20:07]
the old world of models so if you ask it

[20:05 - 20:09]
hey can you integrate open AI it will

[20:07 - 20:12]
default saying okay oh yeah I know what

[20:09 - 20:14]
gbt 4 is I know what 3.5 turbo is and

[20:12 - 20:16]
then you run into errors from the get-go

[20:14 - 20:19]
that you could avoid by me telling it in

[20:16 - 20:21]
chat only mode hey I want to implement

[20:19 - 20:24]
gbt 40 do you know how to implement gb40

[20:21 - 20:25]
yes or no like if if so show me the code

[20:24 - 20:28]
block of how you're going to implement

[20:25 - 20:30]
it and if it shows me gbd4 then I'm like

[20:28 - 20:32]
nope let me go to the documentation copy

[20:30 - 20:34]
paste the code block this is how we're

[20:32 - 20:36]
going to implement it forget all your

[20:34 - 20:39]
training on how you implemented gbd4

[20:36 - 20:41]
before this is how we do it and now I'm

[20:39 - 20:44]
dealing with this in chat mode I'm not

[20:41 - 20:46]
going through pain and suffering and

[20:44 - 20:48]
wondering what of my five

[20:46 - 20:50]
functionalities is not working I know

[20:48 - 20:52]
from the get-go you're not using the

[20:50 - 20:53]
right model so we're Bound for issues

[20:52 - 20:55]
later

[20:53 - 20:59]
on I'm just going to pause there in case

[20:55 - 20:59]
there are any questions from the chat

[21:00 - 21:04]
let's see here there's a couple

[21:01 - 21:08]
questions here maybe we can find

[21:04 - 21:11]
um Nicholas you have anything on your

[21:08 - 21:13]
side no but let's give people the time

[21:11 - 21:15]
to ask some questions before we continue

[21:13 - 21:16]
yeah that's a good point if you have a

[21:15 - 21:19]
question now's the Now's the Time I have

[21:16 - 21:21]
maybe one here which is um have you

[21:19 - 21:24]
found reasoning models to be good at

[21:21 - 21:26]
debugging as well or most or you use

[21:24 - 21:29]
them mostly to craft prompts no that's a

[21:26 - 21:31]
fantastic question so I'll jump ahead

[21:29 - 21:32]
here for the sake of that question what

[21:31 - 21:34]
I like to do with reasoning models is

[21:32 - 21:36]
sometimes you'll get an error in lovable

[21:34 - 21:38]
that just says error right and it's not

[21:36 - 21:40]
very explanatory even when you go to the

[21:38 - 21:41]
logs it'll look like some super based

[21:40 - 21:43]
posting error but it doesn't actually

[21:41 - 21:46]
tell you what's really happening I like

[21:43 - 21:50]
to open this in a new tab so that I can

[21:46 - 21:51]
then get access to uh in Google Chrome

[21:50 - 21:54]
there's every single browser has one of

[21:51 - 21:55]
these developer tools and when something

[21:54 - 21:58]
goes wrong this is something that just

[21:55 - 21:59]
went wrong like an hour ago um I didn't

[21:58 - 22:02]
get this error in lovable but I

[21:59 - 22:03]
screenshot this error and say hey like

[22:02 - 22:05]
whenever I deal with this issue with

[22:03 - 22:09]
let's say super base what's the best way

[22:05 - 22:10]
to go about asking to to fix it so this

[22:09 - 22:13]
helps a lot and this tells me that

[22:10 - 22:15]
there's a role security issue with

[22:13 - 22:17]
superbase so then I start to learn

[22:15 - 22:20]
myself as well so now the next time I

[22:17 - 22:22]
write I know that road level security

[22:20 - 22:25]
cores Security in general is a problem

[22:22 - 22:27]
so I like to use reasoning models a lot

[22:25 - 22:28]
because they're smarter at debugging

[22:27 - 22:31]
what might go wrong just off of a very

[22:28 - 22:33]
very basic error yeah makes sense

[22:31 - 22:35]
there's another one here I think sorry

[22:33 - 22:36]
go ahead Nicholas also saying I'm seeing

[22:35 - 22:38]
some more questions in the chat

[22:36 - 22:41]
regarding RLS policies Road level

[22:38 - 22:43]
security and superbase and getting that

[22:41 - 22:48]
right you could just give a quick

[22:43 - 22:51]
overview on that sure yeah so um on road

[22:48 - 22:54]
level security typically again as you

[22:51 - 22:56]
fail and learn from implementing certain

[22:54 - 22:57]
things you'll know when security is

[22:56 - 22:58]
going to be a problem so now like I'm

[22:57 - 23:00]
pretty familiar with when security is

[22:58 - 23:02]
going to be a problem I'll give you one

[23:00 - 23:04]
example right away that I know for a

[23:02 - 23:07]
fact in my prompt somewhere I have to

[23:04 - 23:09]
disable security so let's say you wanted

[23:07 - 23:12]
to build a matchmaking app and it was

[23:09 - 23:13]
matchmaking for AI tools so you enter

[23:12 - 23:15]
your AI tools you get matched with

[23:13 - 23:18]
someone else who has AI tools that are

[23:15 - 23:20]
same as yours the fact that that

[23:18 - 23:22]
information from every user has to be

[23:20 - 23:24]
shared immediately tells me you're gonna

[23:22 - 23:27]
have issues with Road level security

[23:24 - 23:29]
because by default every user's input

[23:27 - 23:31]
and profile and everything they do

[23:29 - 23:33]
activity-wise is hidden to be able to

[23:31 - 23:36]
enable that functionality you have to

[23:33 - 23:38]
disable that or disable portions of that

[23:36 - 23:40]
so that they can talk and see other

[23:38 - 23:43]
people's activity and

[23:40 - 23:45]
responses so that's one example there um

[23:43 - 23:48]
other times with security is when you

[23:45 - 23:50]
upload a document let's say that PDF

[23:48 - 23:52]
example I just showed you my main error

[23:50 - 23:54]
there was I was able to upload a

[23:52 - 23:57]
document but on the UI it didn't let me

[23:54 - 24:00]
see it let alone view it because it was

[23:57 - 24:04]
protecting in the storage so with

[24:00 - 24:06]
superbase always assume that it's hiding

[24:04 - 24:07]
things for your own good and if you need

[24:06 - 24:09]
to unhide them you have to be explicit

[24:07 - 24:12]
about telling it

[24:09 - 24:14]
that makes sense I want to highlight

[24:12 - 24:16]
another question SL comment here so

[24:14 - 24:17]
there's somebody saying hers I here from

[24:16 - 24:19]
Twitter saying for Vibe coding impr

[24:17 - 24:21]
prompting I still get confused which use

[24:19 - 24:24]
for what switching from Chach PT to

[24:21 - 24:26]
figma lovable to n8n which is like an

[24:24 - 24:29]
integration platform and that causes a

[24:26 - 24:32]
lot of friction so I think currently

[24:29 - 24:35]
today you might uh benefit from like

[24:32 - 24:37]
bringing in other tools outside lovable

[24:35 - 24:39]
obviously our vision with the product is

[24:37 - 24:41]
to make it so that you can stay in

[24:39 - 24:43]
lovable without having to go to these

[24:41 - 24:45]
external tools as much as possible so we

[24:43 - 24:47]
we we will likely integrate reasoning

[24:45 - 24:49]
models in the future uh in in the sort

[24:47 - 24:53]
of very in the midterm short term we

[24:49 - 24:55]
will H you know improve um how we uh

[24:53 - 24:56]
like create the prompts internally maybe

[24:55 - 24:57]
so that all these things that you

[24:56 - 25:00]
currently have to go through external

[24:57 - 25:02]
tools are just not required and and

[25:00 - 25:06]
something critical about um about

[25:02 - 25:09]
prompting is that context is key and if

[25:06 - 25:10]
you if you do most of your work H and

[25:09 - 25:13]
and let lovable help you create your

[25:10 - 25:14]
prompts then lovable is the best is the

[25:13 - 25:15]
best person to do this because they

[25:14 - 25:17]
lovable has entire context it knows the

[25:15 - 25:19]
codebase it knows the history it has

[25:17 - 25:22]
some some degree of memory so you're

[25:19 - 25:25]
never going to get that level of H

[25:22 - 25:27]
detailed context anywhere else any other

[25:25 - 25:28]
external platform right unless you copy

[25:27 - 25:31]
everything which is uh super super super

[25:28 - 25:35]
hard so so the goal is that Lov just

[25:31 - 25:36]
becomes the best unbeatable expert at

[25:35 - 25:38]
understanding your requests because

[25:36 - 25:40]
we're just the ones that are equipped

[25:38 - 25:43]
with all the necessary ingredients for

[25:40 - 25:44]
that um but but I still think that it's

[25:43 - 25:46]
interesting to see what people can do

[25:44 - 25:47]
now in in in the shortterm midterm by

[25:46 - 25:49]
using these third party third party

[25:47 - 25:53]
tools

[25:49 - 25:56]
um cool um keep going yeah let's go and

[25:53 - 25:57]
I just uh we're at almost half an hour

[25:56 - 25:59]
so let's make sure we have some time for

[25:57 - 26:01]
building as well

[25:59 - 26:05]
sounds good let's actually just jump

[26:01 - 26:08]
into building then um cool so we'll try

[26:05 - 26:10]
something that is error prone um I tried

[26:08 - 26:13]
to dabble this morning didn't have too

[26:10 - 26:15]
much time but let's uh you can use

[26:13 - 26:17]
either n8n or make.com I'm going to use

[26:15 - 26:18]
make because for most beginners it's

[26:17 - 26:21]
more approachable less of a steep

[26:18 - 26:23]
learning curve but let's build two

[26:21 - 26:25]
applications one is super simple and

[26:23 - 26:27]
there's a reason why I want to do it

[26:25 - 26:31]
simple and one is more complex but both

[26:27 - 26:33]
use the same ation so let's uh with make

[26:31 - 26:35]
that anyone's not familiar make is a

[26:33 - 26:37]
workflow automation tool you can build

[26:35 - 26:39]
all kinds of what are called scenarios

[26:37 - 26:42]
where you receive a request or some

[26:39 - 26:45]
input of data and then you go and take

[26:42 - 26:47]
care of a bunch of modules or tasks that

[26:45 - 26:50]
are automated as a part of that flow and

[26:47 - 26:51]
then you return some form of response so

[26:50 - 26:54]
it it'll make more sense if you haven't

[26:51 - 26:56]
seen it before while I build things but

[26:54 - 26:58]
if I have never built something before

[26:56 - 27:00]
and I'm looking for a key functionality

[26:58 - 27:02]
here here what I like to do is I build a

[27:00 - 27:05]
small proof of concept for myself that's

[27:02 - 27:07]
super simple where I just double check

[27:05 - 27:10]
that the function is working properly so

[27:07 - 27:14]
in this case I'm just going to say um

[27:10 - 27:17]
can uh let's start off and say build

[27:14 - 27:20]
a user interface and I'll zoom in here

[27:17 - 27:25]
for everybody on the stream build a user

[27:20 - 27:29]
interface that has a shiny red button

[27:25 - 27:35]
and a text box right above it

[27:29 - 27:35]
the goal is that when I hit the

[27:36 - 27:45]
button it'll send the

[27:40 - 27:47]
request um web hook to an Automation and

[27:45 - 27:50]
come back with a

[27:47 - 27:55]
response for now just

[27:50 - 27:58]
worry about creating a simple

[27:55 - 28:02]
minimalistic UI

[27:58 - 28:03]
with a clickable red button now one

[28:02 - 28:05]
thing here you'll notice is I'm I'm

[28:03 - 28:07]
giving it that goal this is not a very

[28:05 - 28:08]
sophisticated prompt but I'm just at

[28:07 - 28:10]
least telling it where I want to go So

[28:08 - 28:11]
eventually we want to build in a way

[28:10 - 28:14]
that we want to embed what's called a

[28:11 - 28:17]
web hook so while this loads just going

[28:14 - 28:19]
to zoom out we're going to set up this

[28:17 - 28:21]
web hook inm make.com and again if you

[28:19 - 28:24]
don't know what a web Hook is imagine

[28:21 - 28:27]
you have an ear that's listening for

[28:24 - 28:29]
some data that ear we have to activate

[28:27 - 28:31]
that ear so that they can listen in to

[28:29 - 28:35]
The Lovable UI and execute that workflow

[28:31 - 28:39]
we build based on that input so let's

[28:35 - 28:43]
Okay I Goa let me see

[28:39 - 28:46]
here Christian I think are things uh

[28:43 - 28:49]
operational see I think you might have

[28:46 - 28:52]
hit the

[28:49 - 28:54]
curse there was something that did not

[28:52 - 29:00]
work properly there

[28:54 - 29:00]
so maybe hit a refresh Mark done

[29:02 - 29:06]
yeah perfect the curse of doing live

[29:04 - 29:08]
streaming hey it wouldn't be it wouldn't

[29:06 - 29:10]
be a good live stream if there's no bugs

[29:08 - 29:12]
so cool so we have our box and we have

[29:10 - 29:14]
our button and again if you're saying oh

[29:12 - 29:15]
this is such a simple example yes that's

[29:14 - 29:17]
the whole point I want to make sure I

[29:15 - 29:21]
can do this before I actually do it in

[29:17 - 29:23]
an app that I want to ship so in make

[29:21 - 29:25]
what I'm going to do is I'm going to

[29:23 - 29:26]
click here I'm going to create our ear

[29:25 - 29:29]
to listen in for the data by clicking

[29:26 - 29:32]
web hook and then I'm going to go into

[29:29 - 29:35]
custom web hook we'll set up our ear I'm

[29:32 - 29:38]
literally going to call it lovable

[29:35 - 29:40]
ear and we'll click save and when it

[29:38 - 29:44]
saves it's going to generate this little

[29:40 - 29:46]
key here this URL that I can use to talk

[29:44 - 29:49]
to the app so I'm going to copy the

[29:46 - 29:52]
address and that is going to be what we

[29:49 - 29:54]
want this button to process now let's

[29:52 - 29:57]
just uh ask it

[29:54 - 30:00]
something um I'm going to go back to my

[29:57 - 30:03]
reverse verse prompt so this prompt I

[30:00 - 30:05]
ended a chat not having this make

[30:03 - 30:06]
automation work and I tried to ask it

[30:05 - 30:07]
what could I have done to increase the

[30:06 - 30:10]
likelihood this will this will work next

[30:07 - 30:14]
time so what I'm going to do is I'm

[30:10 - 30:17]
going to just go back here and say um

[30:14 - 30:19]
here's the web hook let me zoom in

[30:17 - 30:23]
here's the web

[30:19 - 30:27]
hook okay and then I'm just going

[30:23 - 30:30]
to try to be extra lazy and then go into

[30:27 - 30:33]
chat you be real quick and I was going

[30:30 - 30:33]
to say

[30:35 - 30:40]
uh what's in this image just so I don't

[30:38 - 30:43]
have to take out of presenter mode it'll

[30:40 - 30:46]
just copy paste it in case I want to

[30:43 - 30:50]
change it too it'll be easy to change

[30:46 - 30:53]
okay there we go so this is what lovable

[30:50 - 30:55]
told me was what I needed to explain to

[30:53 - 30:57]
it to understand how to put this web

[30:55 - 30:59]
hook and get a response back it was easy

[30:57 - 31:02]
to send request but not get one back so

[30:59 - 31:05]
I'm just going to go here and then go

[31:02 - 31:09]
back to lovable and then zoom out just a

[31:05 - 31:15]
tad say uh we want to send

[31:09 - 31:17]
whatever is in the text box to the let

[31:15 - 31:22]
me just correct that spelling for my

[31:17 - 31:28]
OCD to the uh web hook

[31:22 - 31:34]
below and expect a response later not

[31:28 - 31:40]
now for now just send whatever I submit

[31:34 - 31:43]
to the web hook um here's some pointers

[31:40 - 31:46]
to help and this is where I'll paste

[31:43 - 31:48]
that little tidbit of that Json

[31:46 - 31:52]
basically telling it post Json text

[31:48 - 31:54]
input value which is this to insert web

[31:52 - 31:58]
hook so in this case I'm going to just

[31:54 - 32:01]
say to web hook below okay can I ask you

[31:58 - 32:02]
mark what point would you use chat mode

[32:01 - 32:04]
in the process right now you sent a

[32:02 - 32:06]
default mode

[32:04 - 32:07]
prompt yeah so in this case it's because

[32:06 - 32:09]
I went through the chat mode in another

[32:07 - 32:11]
chat um to understand what I could have

[32:09 - 32:13]
done better to explain to it what the

[32:11 - 32:15]
goal is so if I want to go into

[32:13 - 32:17]
uncharted waters that's where I

[32:15 - 32:19]
immediately I go to chat chat mode so

[32:17 - 32:21]
I'll go here go to chat mode and then if

[32:19 - 32:23]
I want to change something functionally

[32:21 - 32:24]
that I've never done before I'll go back

[32:23 - 32:25]
and forth and make sure it understands

[32:24 - 32:27]
my

[32:25 - 32:29]
request maybe a question on like just

[32:27 - 32:32]
clarifying again what what a web Hook is

[32:29 - 32:34]
and what make is just to make sure so a

[32:32 - 32:36]
web Hook is basically can can you is

[32:34 - 32:37]
this a correct explanation mark make

[32:36 - 32:39]
sure I'm not saying something that is

[32:37 - 32:40]
not true but you pick an endpoint you're

[32:39 - 32:42]
sending a request to and then that

[32:40 - 32:44]
triggers a workflow which you've defined

[32:42 - 32:46]
a make and then it sends the the the

[32:44 - 32:48]
results of that workflow back to lovable

[32:46 - 32:49]
right that's basically that that's

[32:48 - 32:51]
basically what you're doing yeah yeah so

[32:49 - 32:53]
Step One is can we leave lovable with

[32:51 - 32:56]
some data and the step two is can we

[32:53 - 32:57]
come back to lovable with the response

[32:56 - 32:58]
and make just allows you to create all

[32:57 - 33:00]
these workflows and I guess make

[32:58 - 33:01]
integrates with a bunch of different

[33:00 - 33:04]
platforms to create these sort of

[33:01 - 33:06]
automations right uh exactly so you can

[33:04 - 33:09]
think of it as let's say um lovables

[33:06 - 33:10]
back end is not familiar with your CRM

[33:09 - 33:13]
that only you and a handful of companies

[33:10 - 33:15]
use but make.com has that native

[33:13 - 33:17]
integration you can use a make web hook

[33:15 - 33:20]
as a cheat code to not have to go back

[33:17 - 33:22]
and forth with superbase feeding it docs

[33:20 - 33:23]
you can just use the modules set up the

[33:22 - 33:26]
workflow and just worry about the back

[33:23 - 33:28]
and forth response so in this case I'm

[33:26 - 33:31]
going to now it says it's up the code so

[33:28 - 33:34]
what I'll do is I'm going to go back to

[33:31 - 33:36]
make and then right now if we receive a

[33:34 - 33:38]
response to this endpoint this will stop

[33:36 - 33:40]
running because it'll have some data so

[33:38 - 33:43]
in this case let's go back to lovable

[33:40 - 33:46]
I'll put it side by side I'll say I love

[33:43 - 33:48]
lovable okay let's just click process

[33:46 - 33:51]
okay so it says accepted um what I need

[33:48 - 33:53]
to see is on make that that spinny thing

[33:51 - 33:56]
stop spinning so it says successfully

[33:53 - 33:59]
determined that means we've sent data

[33:56 - 34:01]
from lovable to here here now to see

[33:59 - 34:03]
what data we got I'm going to run this

[34:01 - 34:06]
module on its own again and I'm going to

[34:03 - 34:08]
write this again okay so it says

[34:06 - 34:11]
accepted now you can see we got that

[34:08 - 34:15]
text from the UI that says I love

[34:11 - 34:16]
lovable right so now with this input I

[34:15 - 34:20]
can now start a whole workflow

[34:16 - 34:24]
automation so if I could wanted to add a

[34:20 - 34:26]
node here okay um and I say let's do

[34:24 - 34:29]
something very basic just so that you

[34:26 - 34:33]
can understand uh let's do GPT

[34:29 - 34:34]
40 or let's do mini just so it's faster

[34:33 - 34:36]
let's do

[34:34 - 34:38]
mini and what you would have had to do

[34:36 - 34:40]
if you've never used make.com is just

[34:38 - 34:43]
authenticate yourself and you do that by

[34:40 - 34:45]
clicking add and then it'll pop up with

[34:43 - 34:48]
um the name of the connection you want

[34:45 - 34:50]
to establish and then you'll put the API

[34:48 - 34:53]
key for your openai in here and once

[34:50 - 34:55]
that's figured out you can click on ADD

[34:53 - 34:56]
message and I'll click on user here I'm

[34:55 - 34:58]
sending a user prompt and I'm just going

[34:56 - 34:59]
to say

[34:58 - 35:02]
um

[34:59 - 35:07]
create a poem or let say a

[35:02 - 35:08]
Hau for whatever you see in and then

[35:07 - 35:12]
I'll insert the variable from our first

[35:08 - 35:16]
node text okay so this should just

[35:12 - 35:17]
create a poem and if I test it out here

[35:16 - 35:20]
we'll send this again what I'll do is

[35:17 - 35:24]
I'll click on set so that it runs

[35:20 - 35:27]
automatically and then I'll click save

[35:24 - 35:30]
so now if we send this web hook um I

[35:27 - 35:32]
don't know let's talk about web apps as

[35:30 - 35:36]
our core thing

[35:32 - 35:38]
here it now heard that question it now

[35:36 - 35:40]
created that poem okay so now we know

[35:38 - 35:42]
that it got that data we were able to

[35:40 - 35:45]
process it now the second part here is

[35:42 - 35:47]
how do we get data back to lovable this

[35:45 - 35:50]
is the next part so we need some form of

[35:47 - 35:53]
feedback loop so we'll add another web

[35:50 - 35:56]
hook that says web hook

[35:53 - 35:57]
response and um yeah and for the comment

[35:56 - 35:59]
that I just saw now you can totally do

[35:57 - 36:01]
this in lovable the idea is this is just

[35:59 - 36:03]
to show you what you can do from the

[36:01 - 36:05]
response standpoint and then we can do

[36:03 - 36:06]
something more advanced we can click on

[36:05 - 36:09]
uh the body here we're just going to

[36:06 - 36:13]
respond back with whatever chat gbt

[36:09 - 36:15]
responded with and we'll click save so

[36:13 - 36:18]
now we'll go back to lovable I'll go

[36:15 - 36:21]
back to uh let's go back sorry here I'll

[36:18 - 36:23]
go back to chat mode and I'll say we

[36:21 - 36:26]
have a few questions in the chat by the

[36:23 - 36:28]
way Mark how do I find chat mode like

[36:26 - 36:30]
it's not there for me so sound good so

[36:28 - 36:32]
let me go into different thing so I

[36:30 - 36:36]
don't uh lose my track here so if you go

[36:32 - 36:39]
to uh settings and you go to account

[36:36 - 36:41]
settings I believe you'll see Labs here

[36:39 - 36:42]
you'll see chat mode it'll be default to

[36:41 - 36:45]
off I believe and then you have to

[36:42 - 36:47]
toggle it back on yeah yeah and I can

[36:45 - 36:49]
add to that it's still an experimental

[36:47 - 36:51]
feature some of it we are rapidly

[36:49 - 36:54]
changing it so it might have a different

[36:51 - 36:57]
Behavior tomorrow should still be great

[36:54 - 37:00]
and I can also add that this togle is on

[36:57 - 37:02]
stored in local your browser's local

[37:00 - 37:04]
storage so if you switch devices or

[37:02 - 37:07]
browsers it will not be there

[37:04 - 37:09]
anymore you might change that later but

[37:07 - 37:10]
that's how it is for now yeah and the

[37:09 - 37:12]
last thing is if you come up with a plan

[37:10 - 37:14]
with chat mode and you implement the

[37:12 - 37:15]
plan it goes back to default so if you

[37:14 - 37:18]
want to keep going in chat you want to

[37:15 - 37:20]
make sure you go back to chat mode um so

[37:18 - 37:25]
now let's go back to chat mode here I'm

[37:20 - 37:28]
going to ask it I now built a

[37:25 - 37:29]
portion let's zoom in it a portion of

[37:28 - 37:33]
the

[37:29 - 37:36]
automation that sends back a response

[37:33 - 37:40]
with the poem that's

[37:36 - 37:42]
generated um do you know how to handle

[37:40 - 37:44]
this

[37:42 - 37:46]
response and I'll sometimes I'll just

[37:44 - 37:48]
ask it Point Blank like are you are you

[37:46 - 37:51]
cool with this are you ready to to

[37:48 - 37:52]
handle this and then it'll go through

[37:51 - 37:54]
let's say we have a response State

[37:52 - 37:56]
variable to store the response we

[37:54 - 37:58]
capture the response text correctly then

[37:56 - 38:01]
we display the response nicely formatted

[37:58 - 38:04]
a container below that all sounds good

[38:01 - 38:06]
to me and if it says uh would you like

[38:04 - 38:10]
to test it out I'll

[38:06 - 38:10]
say yes let's

[38:10 - 38:16]
Implement so instead of having a head

[38:13 - 38:18]
to-head with lovable I am giving love

[38:16 - 38:20]
and trying to get back love by just

[38:18 - 38:23]
asking for some preparation

[38:20 - 38:25]
yeah I I think you might have to change

[38:23 - 38:28]
to default yeah so this is probably a

[38:25 - 38:30]
little bug it should for you when you

[38:28 - 38:33]
said yes but

[38:30 - 38:33]
yeah

[38:33 - 38:38]
cool and while we're doing that now like

[38:36 - 38:40]
just to show the new feature visible

[38:38 - 38:42]
edits while it's actually loading if I

[38:40 - 38:44]
want to just quickly change this without

[38:42 - 38:46]
going into a battle saying no the button

[38:44 - 38:49]
the button or change it this color I can

[38:46 - 38:51]
click on edit and then I can select the

[38:49 - 38:55]
element I want to change so I could make

[38:51 - 38:56]
this theoretically any color I want um

[38:55 - 38:59]
without having to prompt it so while

[38:56 - 39:00]
that's loading up that's a beautiful

[38:59 - 39:04]
little nugget I think you guys are going

[39:00 - 39:04]
to show later on right

[39:04 - 39:11]
yeah all right so uh let me see here

[39:08 - 39:14]
refresh let's try this again let's talk

[39:11 - 39:16]
about uh web apps and click

[39:14 - 39:18]
process all right so you can see here I

[39:16 - 39:21]
can look at the automation if I go back

[39:18 - 39:24]
out here I can look at the execution we

[39:21 - 39:27]
were able to go from a response from an

[39:24 - 39:29]
inquiry from lovable from a response

[39:27 - 39:31]
back back from this workflow Automation

[39:29 - 39:34]
and then we now have the poem displayed

[39:31 - 39:39]
here so to me the most important thing

[39:34 - 39:41]
is now we go back to chat mode is if you

[39:39 - 39:46]
had to

[39:41 - 39:50]
implement this again in one shot

[39:46 - 39:54]
prompt how would you

[39:50 - 39:58]
structure The Prompt so that all the

[39:54 - 39:58]
details are captured

[39:59 - 40:06]
um I'll say act as a prompt engineer and

[40:02 - 40:10]
output a detailed yet concise prompt I

[40:06 - 40:12]
can use for next time and I'll make sure

[40:10 - 40:15]
chat only is on so I don't cause any

[40:12 - 40:16]
chaos and then it should come up pretty

[40:15 - 40:19]
quickly with a response to

[40:16 - 40:20]
that there we go so you can see here

[40:19 - 40:22]
create a modern web interface with the

[40:20 - 40:26]
following components UI elements a

[40:22 - 40:28]
sender text box a shiny red button uh

[40:26 - 40:30]
with core functional it so it says here

[40:28 - 40:32]
send post requests to this web hook now

[40:30 - 40:34]
obviously this will change over time but

[40:32 - 40:37]
now if I want to do this again which we

[40:34 - 40:38]
will right now I now have a head start

[40:37 - 40:41]
as to like how I should actually

[40:38 - 40:42]
communicate with this yeah maybe ju just

[40:41 - 40:44]
a question that is not entirely related

[40:42 - 40:47]
to what you were just talking about Mark

[40:44 - 40:49]
but I think is a good question so how

[40:47 - 40:51]
can I what are Best Practices to prevent

[40:49 - 40:55]
unexpected regressions when validating

[40:51 - 40:57]
code or Futures and how to basically

[40:55 - 40:59]
avoid these happening as your project

[40:57 - 41:03]
gross larger and larger so this is this

[40:59 - 41:04]
is a known a known issue uh and we we we

[41:03 - 41:06]
we think about this problem a lot and

[41:04 - 41:08]
we're constantly think about ways to

[41:06 - 41:10]
make it um less likely for these things

[41:08 - 41:12]
to happen as the project grows it

[41:10 - 41:15]
becomes more complex since our agent

[41:12 - 41:17]
needs to sort of think about uh more

[41:15 - 41:19]
files and more and a larger context but

[41:17 - 41:21]
we're doing things and uh we shipped

[41:19 - 41:24]
something actually earlier this week

[41:21 - 41:27]
which um basically will uh be like the

[41:24 - 41:29]
agent will be better at ignoring um

[41:27 - 41:33]
duplicate files uh often when you add

[41:29 - 41:34]
futures or when you move a future from

[41:33 - 41:37]
uh like when you change this the like

[41:34 - 41:39]
where feutures located in your app uh

[41:37 - 41:41]
the AI for like creates the new like

[41:39 - 41:43]
creates a new feature but like forgets

[41:41 - 41:45]
to clean up after itself so to speak so

[41:43 - 41:47]
you end up having two files maybe that

[41:45 - 41:49]
do the same thing and the problem is

[41:47 - 41:51]
that as as as you when you then try to

[41:49 - 41:53]
kind of add something to that same

[41:51 - 41:55]
fature it will edit the wrong file

[41:53 - 41:56]
because it's confused and doesn't know

[41:55 - 41:58]
exactly which of those two files has

[41:56 - 42:01]
been used H so you often will see an

[41:58 - 42:04]
error called could not be applied or um

[42:01 - 42:06]
I think it's uh changes already like

[42:04 - 42:08]
changes already in place so the edit

[42:06 - 42:10]
will fail so we've just actually shipped

[42:08 - 42:12]
something that will make that much less

[42:10 - 42:13]
likely to happen because the AI Now sort

[42:12 - 42:17]
of takes into account what is being used

[42:13 - 42:19]
and what's not been used um I can also

[42:17 - 42:21]
add one more pointer here and when

[42:19 - 42:23]
migrating from the go API or python API

[42:21 - 42:25]
to to go API we talked about this

[42:23 - 42:26]
earlier this stream you just made a big

[42:25 - 42:29]
change and switched programming

[42:26 - 42:31]
languages for our own back end we also

[42:29 - 42:34]
revealed a bug that we had since before

[42:31 - 42:37]
where the AI somewhere or the agent some

[42:34 - 42:39]
sometimes just went crazy and edited

[42:37 - 42:43]
files that they did not have context on

[42:39 - 42:45]
yep H and that's of course going to make

[42:43 - 42:47]
the rewrite terrible because it didn't

[42:45 - 42:48]
know what was there before and so

[42:47 - 42:50]
hopefully we're going to solve this

[42:48 - 42:53]
better and better now because we know

[42:50 - 42:55]
this is an issue yeah so just to address

[42:53 - 42:57]
the question myself um what I like to do

[42:55 - 42:59]
is whenever there's a suggestion to

[42:57 - 43:01]
refactor my code which is one of the

[42:59 - 43:03]
Holy actions of a developer um I asked

[43:01 - 43:06]
it in chat mode what were you thinking

[43:03 - 43:08]
of cleaning up or refactoring and how

[43:06 - 43:09]
are you planning on doing that and

[43:08 - 43:12]
usually immediately even without being a

[43:09 - 43:13]
developer or technical it'll tell you

[43:12 - 43:15]
I'm going to edit this part and this

[43:13 - 43:18]
part or this function and I can smell

[43:15 - 43:20]
that there's something off here so if

[43:18 - 43:22]
anything chat mode can help you decide

[43:20 - 43:24]
you know what it sounds nice to refactor

[43:22 - 43:26]
but based on what I think your plan is

[43:24 - 43:29]
either here's the rule moving forward

[43:26 - 43:30]
never refactor anything that's not X so

[43:29 - 43:33]
now you've made a temporary rule in the

[43:30 - 43:35]
context of the chat or you just ignore

[43:33 - 43:36]
it entirely and you keep going unless

[43:35 - 43:38]
you are genuinely getting to thousands

[43:36 - 43:40]
and thousands of lines that are just

[43:38 - 43:43]
things are not working right at that

[43:40 - 43:44]
point um which is what I would do there

[43:43 - 43:46]
so Mark we have a lot of non-technical

[43:44 - 43:49]
user what is a refactor let's just

[43:46 - 43:51]
address that really quickly as well cool

[43:49 - 43:54]
so let's let's say I wrote a 100 page

[43:51 - 43:56]
essay uh the word refactor would be the

[43:54 - 43:57]
equivalent of me trying to compress that

[43:56 - 43:59]
to 10 pages

[43:57 - 44:01]
but unlike an essay well actually

[43:59 - 44:03]
similar to an essay if you compress from

[44:01 - 44:06]
100 to 10 you might lose a lot of

[44:03 - 44:08]
meaning and context and information in

[44:06 - 44:11]
code that's more drastic when you

[44:08 - 44:12]
refactor code that's hundreds or

[44:11 - 44:15]
thousands of lines and you try to make

[44:12 - 44:17]
it more lean in the process you might

[44:15 - 44:20]
shortcut functions that depend on other

[44:17 - 44:22]
functions that lead to clashes uh

[44:20 - 44:23]
conflicts which is literally one

[44:22 - 44:25]
function trying to accomplish something

[44:23 - 44:27]
that the other function is trying to do

[44:25 - 44:30]
or they're mistimed so it leads to a lot

[44:27 - 44:32]
of issues that are hard to resolve

[44:30 - 44:35]
because if you're non-technical you'll

[44:32 - 44:37]
never understand what has changed that's

[44:35 - 44:40]
caused all these

[44:37 - 44:42]
issues so yeah like um refactoring is

[44:40 - 44:43]
like not the last thing you want to do

[44:42 - 44:45]
but you want to make sure you're fully

[44:43 - 44:48]
informed on what the plan is before you

[44:45 - 44:50]
even think about doing it y cool it's a

[44:48 - 44:53]
beautiful

[44:50 - 44:55]
metaphor good um any other questions you

[44:53 - 44:58]
want me to go through before I keep

[44:55 - 45:00]
ripping I think you can continue you

[44:58 - 45:03]
cool yeah all right so now we know how

[45:00 - 45:06]
to deal with this function here so let

[45:03 - 45:11]
us open a new

[45:06 - 45:13]
chat in here okay so in this case let's

[45:11 - 45:16]
do something that is not a basic red

[45:13 - 45:18]
button okay so let's do

[45:16 - 45:21]
um you know what let's let's have ai

[45:18 - 45:22]
help me so one thing I'll give to you

[45:21 - 45:24]
guys to provide the community is my

[45:22 - 45:27]
little prompt helper for lovable I like

[45:24 - 45:30]
to use this to help me get things off

[45:27 - 45:32]
the ground so I'll say there we go it'll

[45:30 - 45:33]
just give you some guidelines as to what

[45:32 - 45:37]
you can

[45:33 - 45:40]
use okay so I just want to build a web

[45:37 - 45:43]
page that's kind of a landing page for a

[45:40 - 45:45]
dentist company where you have a button

[45:43 - 45:47]
that opens up a form and you can collect

[45:45 - 45:49]
some basic information about what I'm

[45:47 - 45:52]
trying to do and then we're going to

[45:49 - 45:54]
send that information to um a web hook

[45:52 - 45:56]
in make.com but we just want to worry

[45:54 - 46:00]
about building the main landing page in

[45:56 - 46:01]
Shell ideally I want the design to be

[46:00 - 46:04]
minimalistic but look like something

[46:01 - 46:06]
that a dentist company would own and

[46:04 - 46:08]
make the prompt as concise as possible

[46:06 - 46:11]
don't write me essays don't write me a

[46:08 - 46:14]
bunch of bullets uh be very succinct so

[46:11 - 46:16]
in this case I just oh there we go

[46:14 - 46:18]
instructed that let

[46:16 - 46:21]
just I think I got to re refresh that

[46:18 - 46:21]
give me a second

[46:22 - 46:28]
here let me just regenerate that real

[46:25 - 46:28]
quick

[46:31 - 46:38]
Murphy's Law all right

[46:34 - 46:40]
boom open a eyes down yeah if open a

[46:38 - 46:42]
down there's bigger

[46:40 - 46:44]
problems cool so this is going to

[46:42 - 46:46]
generate hopefully it's not gonna be too

[46:44 - 46:51]
much yeah I like this this is a nice

[46:46 - 46:54]
clean start so we'll go here we'll send

[46:51 - 46:55]
that and then this should start us on

[46:54 - 46:57]
our way the most important thing I want

[46:55 - 46:59]
is I want a button that opens up some

[46:57 - 47:02]
form it could be even in the browser

[46:59 - 47:04]
itself and then we want to send those

[47:02 - 47:08]
components to make and then ideally do

[47:04 - 47:10]
some research on uh the condition and

[47:08 - 47:12]
see if our dentist company can actually

[47:10 - 47:14]
handle

[47:12 - 47:16]
it yeah there's a question here maybe we

[47:14 - 47:19]
can just uh answer real quick but I

[47:16 - 47:21]
think Sam is asking can we make an

[47:19 - 47:23]
example something more complex like user

[47:21 - 47:26]
logins and wres and I think my

[47:23 - 47:29]
suggestion we're doing these quite often

[47:26 - 47:31]
uh this this like current office hours

[47:29 - 47:33]
was mostly focusing on prompting so we

[47:31 - 47:35]
we're not going too deep and building

[47:33 - 47:37]
something super complex but we do these

[47:35 - 47:38]
every week at least once and in the

[47:37 - 47:41]
other sessions we're really building for

[47:38 - 47:43]
the entire session or actually building

[47:41 - 47:45]
an app throughout more than one session

[47:43 - 47:46]
uh so we have the zero to launch series

[47:45 - 47:48]
that we're building as something that

[47:46 - 47:50]
we're actually going to launch so I I

[47:48 - 47:51]
suggest you you subscribe and I'm sure

[47:50 - 47:53]
you get notified next time we have them

[47:51 - 47:55]
and I think those there you'll get a bit

[47:53 - 47:57]
more of this um sort of advanced app use

[47:55 - 47:59]
case

[47:57 - 48:01]
yeah we could definitely go there but I

[47:59 - 48:04]
think yeah you'll see many opportunities

[48:01 - 48:08]
for those authentication

[48:04 - 48:10]
things all right and while this is

[48:08 - 48:13]
loading I think just to finish off I

[48:10 - 48:16]
think I had a couple more notes here

[48:13 - 48:18]
um I mentioned the opening your tab to

[48:16 - 48:20]
get more meaningful errors and the last

[48:18 - 48:22]
thing is just very important when you

[48:20 - 48:25]
resolve things in lovable Beyond just

[48:22 - 48:27]
reverse prompting at the very end try

[48:25 - 48:29]
and see what it actually said was the

[48:27 - 48:31]
resolution to the problem because then

[48:29 - 48:33]
you'll start to understand patterns of

[48:31 - 48:35]
what does it usually fall on what issues

[48:33 - 48:37]
pop up so that's one last thing here

[48:35 - 48:38]
that you'll see typically when you

[48:37 - 48:40]
resolve it it'll give you a summary of

[48:38 - 48:43]
what it resolved or what it fixed and

[48:40 - 48:45]
then it's easier to go back so uh go

[48:43 - 48:48]
book consultation here all right so we

[48:45 - 48:52]
get these three

[48:48 - 48:57]
components I want to say um can we add

[48:52 - 49:00]
an open text field where the user can

[48:57 - 49:02]
explain what they're suffering from

[49:00 - 49:05]
specifically in their own words so we're

[49:02 - 49:07]
going to use this so that we can do some

[49:05 - 49:08]
research on it and see if it's something

[49:07 - 49:11]
that we can handle or if we have to pass

[49:08 - 49:13]
it on to a specialist for

[49:11 - 49:18]
example and while this is setting up we

[49:13 - 49:20]
can create a fresh new scenario in make

[49:18 - 49:23]
so we're going to need that ear or web

[49:20 - 49:27]
hook or that endpoint once again so let

[49:23 - 49:27]
me just refresh here

[49:27 - 49:31]
so let's set this up we're going do

[49:29 - 49:33]
custom web hook we're going to add

[49:31 - 49:34]
another one we're going to call it

[49:33 - 49:36]
lovable

[49:34 - 49:40]
dentist

[49:36 - 49:42]
endpoint and then we'll click save so

[49:40 - 49:44]
this is ready to go I'll copy this to

[49:42 - 49:45]
the clipboard and let's make sure that

[49:44 - 49:48]
we actually got what we wanted so let's

[49:45 - 49:53]
click on book of consultation perfect so

[49:48 - 49:55]
we have email name we have this so now I

[49:53 - 49:59]
can

[49:55 - 50:05]
say in chat mode all right

[49:59 - 50:10]
so I want to send a post Json request of

[50:05 - 50:13]
all the user inputs to a web hook in

[50:10 - 50:18]
make you'll see

[50:13 - 50:22]
below okay um I want to return a

[50:18 - 50:24]
response as to whether or not we can

[50:22 - 50:24]
help the

[50:25 - 50:34]
patient or if they need to see another

[50:30 - 50:36]
Specialist or doctor all right and then

[50:34 - 50:42]
here's the web

[50:36 - 50:46]
hook can you confirm that you'll be able

[50:42 - 50:46]
to send all this information

[50:46 - 50:52]
cleanly to this web

[50:50 - 50:56]
hook and just

[50:52 - 50:59]
know that uh will'll needs you to handle

[50:56 - 51:02]
the responses as well need you to handle

[50:59 - 51:04]
the response as well okay so that's an

[51:02 - 51:05]
example of what I like to call like a

[51:04 - 51:07]
very clear prompt where I'm

[51:05 - 51:10]
foreshadowing The Next Step so I'm not

[51:07 - 51:12]
saying worry about the response yet I'm

[51:10 - 51:15]
worried about just integrating this and

[51:12 - 51:16]
sending this cleanly as strings and yeah

[51:15 - 51:19]
as text

[51:16 - 51:22]
information so now that it's saying okay

[51:19 - 51:24]
it's clear on that it's clear on how

[51:22 - 51:28]
it's going to handle the

[51:24 - 51:28]
response I'll click on Implement plan

[51:28 - 51:32]
and then we'll be able to test whether

[51:29 - 51:33]
or not it works pretty quickly and then

[51:32 - 51:37]
in the actual make automation We'll add

[51:33 - 51:40]
a couple extra steps than before and

[51:37 - 51:40]
there we

[51:44 - 51:49]
go well this loads Mark can I ask you a

[51:47 - 51:54]
question do you have a horis for when

[51:49 - 51:56]
you use make to build automations versus

[51:54 - 51:57]
using something like an edge function in

[51:56 - 52:01]
super base we lovable is writing the

[51:57 - 52:02]
code for the actual Logic for sure okay

[52:01 - 52:05]
let's let's delineate between three of

[52:02 - 52:08]
them um Edge function make or n8n which

[52:05 - 52:11]
is super trendy right now

[52:08 - 52:13]
so make I'll use when there are

[52:11 - 52:15]
Integrations that are hard to accomplish

[52:13 - 52:17]
with a standard Edge function where

[52:15 - 52:20]
there's typically tons of documentation

[52:17 - 52:22]
that the mo let's say 3.5 Sonet might

[52:20 - 52:24]
not be aware of but the integration

[52:22 - 52:26]
exists off the shelf and make so to me

[52:24 - 52:28]
that's a cheat code to replicate that

[52:26 - 52:30]
function ity without going through the

[52:28 - 52:33]
pain of educating in chat mode hey

[52:30 - 52:34]
here's the API here's the docs so that's

[52:33 - 52:38]
the difference between let's say make

[52:34 - 52:40]
and an edge function nadn compared to

[52:38 - 52:44]
make is much more flexible meaning you

[52:40 - 52:46]
can use custom code steps in n8n um you

[52:44 - 52:47]
can have multi-agents they have

[52:46 - 52:50]
something called an agent module where

[52:47 - 52:52]
you can make basically do tool calls to

[52:50 - 52:54]
different agents in one workflow and

[52:52 - 52:56]
come back with a response and one thing

[52:54 - 52:59]
with NN as well is um at scale I find

[52:56 - 53:02]
that n8n is better it's less expensive

[52:59 - 53:04]
with make.com you pay per operation and

[53:02 - 53:07]
one operation is literally one module

[53:04 - 53:09]
running at a time whereas an NN these

[53:07 - 53:12]
scale a lot easier and last thing is

[53:09 - 53:14]
obviously with NN you can also um self

[53:12 - 53:15]
host and you can do all kinds of custom

[53:14 - 53:16]
stuff or flexible things you can't do

[53:15 - 53:19]
with

[53:16 - 53:22]
make.com makes sense

[53:19 - 53:23]
cool all right so now that we have this

[53:22 - 53:27]
all set up I'm just going to send a test

[53:23 - 53:29]
here I'm going to send a test here

[53:27 - 53:33]
and then we'll click on something I have

[53:29 - 53:35]
a serious infection all my teeth fell

[53:33 - 53:38]
out all right let's just copy that to

[53:35 - 53:40]
clipboard so we have an error here and

[53:38 - 53:44]
look this is good um I don't know what

[53:40 - 53:47]
the error is so I'm going to go into a

[53:44 - 53:50]
new tab and do that

[53:47 - 53:52]
again okay and this time when we get an

[53:50 - 53:54]
error I want to open developer tab

[53:52 - 53:57]
because I want to know what went wrong

[53:54 - 54:00]
so let's go to more tools developer

[53:57 - 54:03]
tools and I can see all kinds of Errors

[54:00 - 54:05]
so dialogue content requires this this

[54:03 - 54:08]
this okay so there's something on

[54:05 - 54:11]
probably yeah the UI side that's not

[54:08 - 54:13]
working so we have another thing here

[54:11 - 54:16]
listener indicated an asynchronous

[54:13 - 54:19]
response so I don't think make got some

[54:16 - 54:21]
form of response interestingly but um

[54:19 - 54:23]
according to our feedback loop it didn't

[54:21 - 54:26]
go through so I like to just screenshot

[54:23 - 54:30]
this puppy copy this

[54:26 - 54:34]
go into here um please see and resolve

[54:30 - 54:36]
the following errors that are

[54:34 - 54:39]
happening and just that this is super

[54:36 - 54:42]
good timing we will we are working on

[54:39 - 54:44]
something very very soon that will

[54:42 - 54:48]
basically automate this debuging step so

[54:44 - 54:50]
lovable will automatically know uh what

[54:48 - 54:52]
network errors all these logs that Mark

[54:50 - 54:55]
just showed and it will basically pull

[54:52 - 54:57]
them so that they are in the context uh

[54:55 - 54:58]
when debuging something in lovable so

[54:57 - 55:01]
you won't have to do this step very very

[54:58 - 55:03]
soon um but I think it's good that you

[55:01 - 55:06]
you show the the current alternative um

[55:03 - 55:07]
in the mean time yeah and someone did

[55:06 - 55:09]
mention right now that edge functions

[55:07 - 55:11]
are better to use because there's logs

[55:09 - 55:13]
which is true so if you were to use an

[55:11 - 55:14]
edge function you could trace exactly

[55:13 - 55:17]
what the error is if you go to super

[55:14 - 55:18]
base um but obviously it's better to

[55:17 - 55:20]
have it here for anyone that's not

[55:18 - 55:22]
technical because going that extra step

[55:20 - 55:24]
is typically tricky for most people yeah

[55:22 - 55:26]
it can add as well since our go

[55:24 - 55:29]
migration or since we started since we

[55:26 - 55:31]
rewrote our API like a few weeks back we

[55:29 - 55:32]
are actually ingesting Edge function

[55:31 - 55:35]
logs

[55:32 - 55:37]
automatically uh so whenever an endpoint

[55:35 - 55:40]
or a Web book fails the agent will have

[55:37 - 55:43]
context on it which is

[55:40 - 55:45]
awesome yeah gotcha that's perfect so

[55:43 - 55:47]
you can see here we have some okay so

[55:45 - 55:49]
this might be on the make side so let me

[55:47 - 55:51]
make sure that make is listening for the

[55:49 - 55:54]
request to begin with before I fix it

[55:51 - 55:57]
let me just make sure that we have a

[55:54 - 56:00]
problem okay so it looks like yeah we

[55:57 - 56:02]
still have the problem here ideally want

[56:00 - 56:05]
to know what's remaining as the problem

[56:02 - 56:08]
so let's refresh this

[56:05 - 56:12]
here

[56:08 - 56:14]
and book now my biggest thing is if I'm

[56:12 - 56:16]
getting the same exact errors in the

[56:14 - 56:18]
same quantity over and over again that's

[56:16 - 56:21]
when I know there's something that is

[56:18 - 56:24]
not great so in this case seems like we

[56:21 - 56:27]
have less errors that's better and on

[56:24 - 56:29]
the make side let's see here we still we

[56:27 - 56:31]
are still receiving the response so I'm

[56:29 - 56:33]
going to tell it something that's going

[56:31 - 56:36]
to be more meaningful I'm going to write

[56:33 - 56:40]
this in chat mode actually and say so

[56:36 - 56:44]
make is actually receiving the

[56:40 - 56:46]
information but the uy seems to think

[56:44 - 56:49]
it's not sending it

[56:46 - 56:52]
properly and I'll also send a screenshot

[56:49 - 56:54]
of it working in make.com because I'm

[56:52 - 56:56]
getting the functionality I need I don't

[56:54 - 56:59]
think it knows that it's doing it

[56:56 - 56:59]
properly so that's the feedback loop

[57:00 - 57:06]
there and I think this is a great

[57:02 - 57:08]
example where our current uh Labs

[57:06 - 57:11]
feature chat mode can be a good use case

[57:08 - 57:13]
right you you want you want the model to

[57:11 - 57:16]
not jump into coding immediately you

[57:13 - 57:17]
wanted to think you wanted to look at uh

[57:16 - 57:19]
the the code it's written before

[57:17 - 57:20]
actually suggesting something so by by

[57:19 - 57:22]
choosing chat mode you're basically

[57:20 - 57:24]
telling it hey don't worry about

[57:22 - 57:26]
implementing focus on like debugging and

[57:24 - 57:28]
then maybe I'm happy with the plan and

[57:26 - 57:30]
I'll tell you to to implement it exactly

[57:28 - 57:32]
exactly especially when you're going

[57:30 - 57:34]
down uncharted waters again uh when we

[57:32 - 57:36]
mentioned the refactoring thing you

[57:34 - 57:38]
won't run into that refactoring problem

[57:36 - 57:39]
if you're not spinning on changing the

[57:38 - 57:42]
code constantly so that'll help you

[57:39 - 57:45]
there as well yeah I've seen a few

[57:42 - 57:48]
questions in the chat about uh lovable

[57:45 - 57:50]
prompt helper you had one GPT or

[57:48 - 57:52]
something in chat GPT right yeah yeah

[57:50 - 57:54]
yeah for sure I have two actually so

[57:52 - 57:58]
there's one for the new uh visual edit

[57:54 - 58:00]
mode and there's one for General yeah

[57:58 - 58:02]
are these public in the GPT store uh

[58:00 - 58:03]
they're not in the store but they're I'm

[58:02 - 58:05]
happy to share the links with anyone

[58:03 - 58:07]
here to help out so uh where's the best

[58:05 - 58:09]
place I can throw them in if you pop

[58:07 - 58:11]
them in the private chat here we can put

[58:09 - 58:15]
them in the in

[58:11 - 58:19]
the this is Numero Uno and then let me

[58:15 - 58:21]
see the second one if I have it for

[58:19 - 58:25]
you we'll make sure to post this on our

[58:21 - 58:27]
Discord okay sounds good sounds good let

[58:25 - 58:31]
me post the second one to so this would

[58:27 - 58:32]
help here while I'm I'm doing this I'll

[58:31 - 58:34]
just show you how to use the second one

[58:32 - 58:37]
so that you leave this call with that in

[58:34 - 58:40]
mind so in visual edit mode you can

[58:37 - 58:43]
click on things to edit right the the

[58:40 - 58:45]
manual way I like to be lazy so I just

[58:43 - 58:48]
put up a GPT that when you click on

[58:45 - 58:50]
Advanced here this code basically

[58:48 - 58:54]
denotes what changes you want to make

[58:50 - 58:56]
here so for me I just like to copy this

[58:54 - 58:59]
into this other lovable so I'm going to

[58:56 - 59:02]
write uh write my single string um

[58:59 - 59:05]
here's my current and I'll screenshot my

[59:02 - 59:10]
UI and I'll say

[59:05 - 59:16]
um whatever I want to uh paste this

[59:10 - 59:19]
here I want the button to be a super

[59:16 - 59:22]
purple a super light purple okay so in

[59:19 - 59:25]
this case I'll just let it come up with

[59:22 - 59:27]
the uh actual string I'll copy that

[59:25 - 59:30]
string so I don't have to go back and

[59:27 - 59:33]
forth and edit and look for uh the color

[59:30 - 59:35]
hex myself I'll just go back here and

[59:33 - 59:36]
then paste it and then this case I was

[59:35 - 59:38]
clicking on these bad boys not the

[59:36 - 59:39]
button but you'll see here it made the

[59:38 - 59:41]
change

[59:39 - 59:43]
without without me actually writing it

[59:41 - 59:46]
so I like to be lazy that's my it's my

[59:43 - 59:47]
go-to so now it saves and you're good

[59:46 - 59:50]
there so I'll paste that in the chat as

[59:47 - 59:52]
well let me paste that for you and for

[59:50 - 59:55]
reference to you guys in the chat this

[59:52 - 59:56]
is the CSS class names and we are using

[59:55 - 01:00:00]
something called called Tailwind so

[59:56 - 01:00:03]
these are Tailwind classes yeah exactly

[01:00:00 - 01:00:06]
so when you denote any one of these you

[01:00:03 - 01:00:08]
can see here it labels it as div section

[01:00:06 - 01:00:10]
button these are all in CSS world how

[01:00:08 - 01:00:12]
you refer to these components on the

[01:00:10 - 01:00:14]
page so this is just like your cheat

[01:00:12 - 01:00:16]
code to saying for this thing I want to

[01:00:14 - 01:00:16]
make this

[01:00:17 - 01:00:22]
change cool how are we doing for time

[01:00:19 - 01:00:25]
just I'm I'm cognizant of that we're

[01:00:22 - 01:00:28]
hitting the end now okay we'll give this

[01:00:25 - 01:00:31]
a shot works then it works let's see

[01:00:28 - 01:00:31]
here

[01:00:32 - 01:00:36]
uh

[01:00:33 - 01:00:39]
oh let's see let me just run that again

[01:00:36 - 01:00:42]
let me just do immediately as arrives

[01:00:39 - 01:00:46]
delete all data let's do

[01:00:42 - 01:00:48]
this um and let's go back out here okay

[01:00:46 - 01:00:50]
so this is let's just make sure that

[01:00:48 - 01:00:54]
this worked

[01:00:50 - 01:00:54]
Mark okay

[01:00:56 - 01:01:01]
so that's recent Okay cool so now the UI

[01:00:59 - 01:01:04]
knows that the back end has received

[01:01:01 - 01:01:06]
this request and now um with the little

[01:01:04 - 01:01:08]
minute time I have what you could do

[01:01:06 - 01:01:10]
next is literally go on and add a perple

[01:01:08 - 01:01:12]
perplexity step which is the ability to

[01:01:10 - 01:01:14]
go search the web live through an API

[01:01:12 - 01:01:17]
and I could say you know what can um

[01:01:14 - 01:01:23]
let's go to this model let's add a uh

[01:01:17 - 01:01:26]
user prompt can you search the um

[01:01:23 - 01:01:31]
patient condition

[01:01:26 - 01:01:31]
description and see if it's

[01:01:31 - 01:01:38]
serious or can be

[01:01:35 - 01:01:40]
handled by a dentist right then You' put

[01:01:38 - 01:01:42]
the variable description here and then

[01:01:40 - 01:01:44]
where you could go next is you know what

[01:01:42 - 01:01:46]
maybe for our Dentistry we only do

[01:01:44 - 01:01:50]
certain types of surgeries and

[01:01:46 - 01:01:53]
procedures so you add now a j a GPT step

[01:01:50 - 01:01:56]
you say completion here and then maybe

[01:01:53 - 01:01:57]
you want to use a a reasoning model so

[01:01:56 - 01:01:59]
reasoning model is a bit smarter it's

[01:01:57 - 01:02:02]
more thoughtful so let's use let's say

[01:01:59 - 01:02:05]
an 03 mini to be like you know what

[01:02:02 - 01:02:07]
based on this condition and based on the

[01:02:05 - 01:02:09]
research that we got from the last step

[01:02:07 - 01:02:10]
let's determine whether or not this is

[01:02:09 - 01:02:13]
something eligible and then just like we

[01:02:10 - 01:02:16]
did the first MVP we'd add one more

[01:02:13 - 01:02:18]
little web hook response here that would

[01:02:16 - 01:02:20]
respond back with hey yeah we're we're

[01:02:18 - 01:02:23]
eligible to see you here's our link to

[01:02:20 - 01:02:24]
go book or you know what so sorry we we

[01:02:23 - 01:02:26]
can't do this but here's someone else

[01:02:24 - 01:02:27]
that can help you so that's example how

[01:02:26 - 01:02:30]
you could make this bit more

[01:02:27 - 01:02:31]
sophisticated and troubleshoot what we

[01:02:30 - 01:02:33]
just went through at the same time so I

[01:02:31 - 01:02:37]
think let we can call it there if that

[01:02:33 - 01:02:39]
makes sense super all right this was a

[01:02:37 - 01:02:40]
very very cool I think that last example

[01:02:39 - 01:02:44]
you showed really

[01:02:40 - 01:02:47]
showcases maybe the pros of using

[01:02:44 - 01:02:49]
something like make or n81 versus Edge

[01:02:47 - 01:02:50]
functions like it seems like the logic

[01:02:49 - 01:02:52]
is very

[01:02:50 - 01:02:55]
much you can see it it's very visual you

[01:02:52 - 01:02:56]
can build up on it um which is very

[01:02:55 - 01:02:58]
helpful especially if you're if you're

[01:02:56 - 01:02:59]
non- Technical and and you can't

[01:02:58 - 01:03:02]
necessarily read the the code that

[01:02:59 - 01:03:03]
lovable is writing for the edge function

[01:03:02 - 01:03:05]
um so so I think I think we'll do for

[01:03:03 - 01:03:07]
sure some sessions in the future

[01:03:05 - 01:03:08]
focusing on integrating lovable with

[01:03:07 - 01:03:10]
these sort of automation platforms I

[01:03:08 - 01:03:12]
think that that will benefit um many of

[01:03:10 - 01:03:15]
you in the yeah looking at looking at

[01:03:12 - 01:03:18]
the session and one one last nugget one

[01:03:15 - 01:03:20]
last nugget is um you can go from one to

[01:03:18 - 01:03:21]
the other so let's say you built an

[01:03:20 - 01:03:23]
Automation and make and that one's

[01:03:21 - 01:03:26]
working you could theoretically

[01:03:23 - 01:03:29]
screenshot the automation flow feed that

[01:03:26 - 01:03:30]
as an input to a prompt to say hey this

[01:03:29 - 01:03:31]
is what I'm trying to replicate as an

[01:03:30 - 01:03:33]
edge function so then you're giving it a

[01:03:31 - 01:03:36]
cheat sheet of how the flow should go

[01:03:33 - 01:03:36]
but anyway I want to just throw that

[01:03:36 - 01:03:45]
in um cool so I think we we can wrap it

[01:03:42 - 01:03:48]
up uh there's a couple maybe shoutouts

[01:03:45 - 01:03:51]
before calling it so you can go to your

[01:03:48 - 01:03:54]
YouTube and you'll find a bunch of uh

[01:03:51 - 01:03:56]
previous recorded um office hour

[01:03:54 - 01:03:58]
sessions as Nicholas said the beginning

[01:03:56 - 01:03:59]
we're going to be doing another session

[01:03:58 - 01:04:02]
on Thursday that is going to be mostly

[01:03:59 - 01:04:04]
focusing on design using visual edits

[01:04:02 - 01:04:06]
our new future that we just shipped and

[01:04:04 - 01:04:09]
natad is going to be joining us our sort

[01:04:06 - 01:04:10]
of design lead here also Harry which is

[01:04:09 - 01:04:12]
a very experienced user that some of you

[01:04:10 - 01:04:15]
might already know so I really recommend

[01:04:12 - 01:04:19]
you signing up for that one um what else

[01:04:15 - 01:04:21]
we have Discord um uh so I would really

[01:04:19 - 01:04:24]
really recommend you guys to go to the

[01:04:21 - 01:04:26]
community Talisha is in in the comments

[01:04:24 - 01:04:28]
uh uh

[01:04:26 - 01:04:29]
basically invited you to to go and and

[01:04:28 - 01:04:30]
and ask questions there's a lot of help

[01:04:29 - 01:04:33]
a lot of knowledgeable people that are

[01:04:30 - 01:04:36]
extremely like experienced with lovable

[01:04:33 - 01:04:39]
and I'm sure they'll um yeah basically

[01:04:36 - 01:04:42]
give you a helping hand um and what else

[01:04:39 - 01:04:44]
also as usual you can always go to L.D

[01:04:42 - 01:04:47]
support to see all the sort of different

[01:04:44 - 01:04:49]
support channels we um we have and I

[01:04:47 - 01:04:51]
think I would at least try to spend the

[01:04:49 - 01:04:53]
next half an hour I'll be available in

[01:04:51 - 01:04:55]
Discord as well if there's any questions

[01:04:53 - 01:04:56]
about anything that we've been uh

[01:04:55 - 01:04:58]
discussing

[01:04:56 - 01:05:00]
uh in the session anything else I'm

[01:04:58 - 01:05:01]
forgetting Nicholas or Stan yeah this

[01:05:00 - 01:05:03]
session will be uploaded immediately to

[01:05:01 - 01:05:06]
our YouTube channel so if you miss the

[01:05:03 - 01:05:08]
beginning or something just go back uh I

[01:05:06 - 01:05:10]
think the chat will be replay there as

[01:05:08 - 01:05:12]
well so if you missed some of the links

[01:05:10 - 01:05:14]
to the GPT for example it will be there

[01:05:12 - 01:05:16]
but I hope we'll chrisan you you'll make

[01:05:14 - 01:05:17]
sure to post it on Discord perhaps to

[01:05:16 - 01:05:20]
the

[01:05:17 - 01:05:22]
gpts and thank you for joining us Mark

[01:05:20 - 01:05:23]
do you want like where do you share tips

[01:05:22 - 01:05:26]
and tricks for these things where can we

[01:05:23 - 01:05:27]
direct our viewers yeah yeah for sure no

[01:05:26 - 01:05:30]
first of all thanks for everyone

[01:05:27 - 01:05:32]
watching um love doing this I love The

[01:05:30 - 01:05:34]
Lovable team um if you want to follow

[01:05:32 - 01:05:36]
for more mad scientist stuff more prompt

[01:05:34 - 01:05:38]
engineering tips for every modality you

[01:05:36 - 01:05:41]
can think of markor casf is my YouTube

[01:05:38 - 01:05:44]
handle so if this was interesting to you

[01:05:41 - 01:05:47]
I'd love to see you there as well cool

[01:05:44 - 01:05:52]
awesome all right see you guys next time

[01:05:47 - 01:05:52]
have a good one bye bye bye-bye

## コメント

### 1. @Shawnn-m7j (👍 0)
THANKS TO THESE LOVBLE GENTLEMEN IM FEELING MORE KNOWLEDGEABLE  AND CONFIDENT.

### 2. @carlosenriquecastanedaguti8130 (👍 9)
I would suggest the posibility to pay for credits with limit settings. For example I run out of credits, and I don't want to wait until the next cycle to continue to work. Would be cool to pay for credits under demand.

### 3. @crsmoore (👍 6)
This was a great session! Very helpful. 

I hope you guys have consulted with Mark in more detail privately (and ongoing). A lot of this genius should be further built into the app itself. 

More practical trainings like these please!

### 4. @TheNamesJT (👍 4)
I have tried 3 projects for the same idea I have, using the prompting 101 and templates guides loveable provides and I keep having issues after getting my project functional. Once I try and immplement stripe as per their prompting templates with modifications. I run into errors, and have came across loveable just repeating the same fixes in a loop. I'm at the point of giving up, loveable could be so good. But, even when using the prompting templates and trying to be as descriptive as you can in errors, and debugging errors. If it gets stuck on an issue that it hasn't solved within 3 tries it just doesn't try new fixes even if you ask it to. Then hallusionations happen where it then doesn't use the exact properties inside objects and uses incorrect functions that it has made previously. IDK

### 5. @RalfTenbrink (👍 7)
I was not able to watch live. Thanks for posting it afterwards.

### 6. @avaquest (👍 2)
legit a few of my favorite channels on youtube right now collaborating lol .. about to watch this over the next few days

### 7. @newunderthesun7353 (👍 1)
Great stuff. Best tool of the year so far.

### 8. @DailyDoseNoFilter (👍 0)
Great session! I really appreciate a company digging this deep into the user experience and how to get the most out of their platform. You are onto something big for the industry. Well done.

### 9. @gangcheng6316 (👍 4)
LLM based AI coding is to use existing feature/code pattern to map with your request. If you break down your apps into very small modules then it will be able to find a similar existing pattern and “write” code for you. If your feature is kind of new and complicated/cross-linked, then it will get lost in the woods. That is why you will have a happy beginning when Lovable sets a framework, then feel frustrated later when it goes deeper and tries to implement details… your credits will burn crazily through these errors and fixes.

### 10. @vossenjonk3448 (👍 0)
Loving Lovable! Big thx guys!

### 11. @bjoernzosel (👍 2)
Wow, extremely valuable insights!

### 12. @MrDerekCrager (👍 2)
Hi, thanks! What's the two GPT URLs you shared during the end of today's recording?

### 13. @Hajbibi (👍 0)
Thank you for putting out such quality content!

### 14. @kareemarafat362 (👍 0)
This is such an insightful video. Thank you.

### 15. @varunvikramsingh (👍 2)
Lovable should learn from common exceptions and internally train the model to bypass those issues

### 16. @mo.dia97 (👍 30)
I spent 50$ monthly prompt to solve 1 bug and that's the only problem of lovable

> **@nw4009** (👍 13): I’m currently burning through my monthly subscription right now for the same thing. Highly considering canceling my subscription till they get things more straightened out.

> **@JonathanBuckland** (👍 8): I agree. The number of prompts is way to low for building a full featured complex product. I'm building a solution for the company I'm working at using Bubble. In love your product but it's just not possible especially when you hit a bug that the AI has caused.

> **@gangcheng6316** (👍 5): If you met the death loop of error, you may need to restore back to previous version and restart.

> **@JonathanBuckland** (👍 4): I have to say this video showed me I have to have a different mindset to developing. Very interesting

> **@StephenG007** (👍 0): Please explain your thought process ​@@JonathanBuckland

### 17. @markweyman (👍 1)
I noticed the GPTs links are both the same, they link to the Visual Editor but two x GPTs were demo'd during the session. Can you mention me when you update the second link?

### 18. @aurelioschmid1924 (👍 0)
Congrats - great job!

### 19. @RalfTenbrink (👍 1)
This was very very helpful. Thanks

> **@lovable-labs** (👍 0): Glad it was helpful. Thanks Ralf!

### 20. @AlexanderElguren (👍 0)
Hi! Connecting from Portland, Oregon

