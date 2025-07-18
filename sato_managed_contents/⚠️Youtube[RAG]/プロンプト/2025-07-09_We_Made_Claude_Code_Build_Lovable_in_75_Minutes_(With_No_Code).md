# We Made Claude Code Build Lovable in 75 Minutes (With No Code)

**チャンネル:** Riley Brown
**公開日:** 2025-07-09
**URL:** https://www.youtube.com/watch?v=_GMtx9EsIKU

## 説明

Want to build your version? Download VibeCode here: https://vibecode.go.link/86Ibo

Can Claude Code actually beat Cursor?

In this video, I sit down with AI engineer Kehan Zhang to test if Claude Code can build a real app — fast. The goal? A Lovable clone. Built in one session that was less than 90 minutes. No shortcuts.

We cover:
-How Claude Code SDK actually works
-Building in isolated sandboxes with Daytona
-Real time app generation with Claude
-Fixing permissions, logs, and memory issues

Where you can find more of us:
Follow me on X: https://x.com/rileybrown_ai
Follow Kehan on X: https://x.com/kehanisvibing

Link to the GitHub Repo we used in this video: https://github.com/kehanzhang/lovable-clone

As always, thank you very much for supporting my channel by watching this video.  If you liked this video, please subscribe to my channel and check out our other videos - and if there's any specific tutorials or ideas you have for future videos, please let me know below in the comments. 
-Riley 

TIME STAMPS:
00:00 Introduction & Setup
00:31 Explaining Claude Code and SDK
02:11 Starting the Lovable Clone Build
04:04 Memory and Configuration Setup
05:51 Using Plan Mode and SDK Docs
07:00 Generating a Simple Function
09:00 Executing with Claude Code
11:00 Building a Tic Tac Toe Game
16:33 Front-End UI Build for Lovable Clone
21:24 Connecting Front-End with Backend Function
26:01 Scaling & Issues with Local Code Writes
30:04 Creating Isolated Bubbles with Daytona
34:24 Debugging & Testing Bubbles
42:48 Test Execution in Daytona Sandbox
52:32 All Components Working Together
54:17 The Big Reveal & Testing

 Listen to the audio-only version of this podcast: https://rss.com/podcasts/a-new-vibe/

## 字幕

[00:00 - 00:04]
Many people think that claude code is

[00:02 - 00:07]
better than cursor. So I brought on an

[00:04 - 00:10]
AI coding legend, Khan Zang, to see if

[00:07 - 00:12]
Claude code can actually vibe code full

[00:10 - 00:14]
application. And so to test this in one

[00:12 - 00:17]
sitting, Khan is going to try and build

[00:14 - 00:19]
lovable with Claude Code. In this video,

[00:17 - 00:21]
we show you how to set up Claude Code.

[00:19 - 00:24]
We talk about how you can build Claude

[00:21 - 00:26]
Code wrappers with their SDK. And by the

[00:24 - 00:28]
end of the video, you will see if we're

[00:26 - 00:30]
successful in building lovable with

[00:28 - 00:33]
Claude Code. And this thing also just

[00:30 - 00:35]
finished generating a website. Bro, ours

[00:33 - 00:36]
looks better. So cool. I'm super

[00:35 - 00:40]
excited.

[00:36 - 00:42]
This was a fun one. Let's dive in. So,

[00:40 - 00:44]
Khan, what are we doing today?

[00:42 - 00:47]
Today, we're going to be building a

[00:44 - 00:51]
website that builds websites with Claude

[00:47 - 00:53]
Code SDK using Cloud Code.

[00:51 - 00:54]
So,

[00:53 - 00:56]
it's tough to wrap my head around this.

[00:54 - 00:58]
Do you want to like maybe break that

[00:56 - 01:00]
down just a little bit for those who are

[00:58 - 01:04]
like vibe coder native?

[01:00 - 01:05]
Yeah, sure. So, claude code is a tool

[01:04 - 01:08]
that lives in your command line

[01:05 - 01:10]
interface also known as CLI. It's this

[01:08 - 01:12]
big scary black box normally near the

[01:10 - 01:14]
bottom of cursor and it also exists

[01:12 - 01:16]
separately as like a terminal. It's the

[01:14 - 01:17]
same thing and it lives in the terminal

[01:16 - 01:19]
basically. And so this is a software

[01:17 - 01:22]
that Anthropic has released that uses

[01:19 - 01:23]
cloud to help you develop software like

[01:22 - 01:25]
kind of like cursor

[01:23 - 01:27]
like cursor and wind surf except it

[01:25 - 01:27]
lives in your terminal which makes it

[01:27 - 01:29]
different.

[01:27 - 01:31]
Yeah, it's a little more technical but I

[01:29 - 01:33]
also think it's a little more powerful

[01:31 - 01:35]
and the cool thing about it right like

[01:33 - 01:37]
anthropic released it for you to use as

[01:35 - 01:39]
a tool as a general consumer but they

[01:37 - 01:42]
also used it for you to use as a

[01:39 - 01:45]
developer. So I can develop tools that

[01:42 - 01:47]
use it as well. So like similar to the

[01:45 - 01:49]
way people are making money with chat

[01:47 - 01:52]
GBT rappers or like replicate rappers,

[01:49 - 01:54]
you can create a claude code wrapper

[01:52 - 01:56]
with something called an SDK.

[01:54 - 01:58]
Yeah. And so the way that kind of works

[01:56 - 02:01]
is like chat GPT is a very generalist

[01:58 - 02:03]
LLM like it can answer and do a variety

[02:01 - 02:05]
of things. Cloud code is definitely like

[02:03 - 02:06]
he's the nerd in the class. He's like,

[02:05 - 02:07]
"Oh, I'm only good at coding. I don't

[02:06 - 02:09]
care about anything else." but he does

[02:07 - 02:11]
coding really well you know and so you

[02:09 - 02:12]
can definitely build rappers around

[02:11 - 02:15]
cloud code but you'll definitely be in

[02:12 - 02:16]
the industry of like vibe code lovable

[02:15 - 02:18]
bault replet like you're going to be

[02:16 - 02:20]
building a codegen tool so if you wrap

[02:18 - 02:22]
cloud code it has great capabilities of

[02:20 - 02:24]
writing code but just know that the

[02:22 - 02:25]
products that you can make are kind of

[02:24 - 02:26]
limited in the scope that you're

[02:25 - 02:27]
probably going to be using it to write

[02:26 - 02:28]
code

[02:27 - 02:30]
right right I mean it is called cloud

[02:28 - 02:32]
code yeah yeah so today what you're

[02:30 - 02:36]
saying is we are going to use this new

[02:32 - 02:39]
tool cloud code to use the SDK of cloud

[02:36 - 02:40]
code which will power the app that we

[02:39 - 02:42]
create called Lovable. We're going to

[02:40 - 02:42]
create a Lovable clone powered by the

[02:42 - 02:44]
SDK.

[02:42 - 02:45]
Yeah. Yeah. Yeah. A really a really

[02:44 - 02:47]
basic one. Yeah.

[02:45 - 02:48]
Let's do it. How do we get started? In

[02:47 - 02:50]
our last episode that I did with Mickey

[02:48 - 02:52]
where he broke down cloud code, he says

[02:50 - 02:53]
he uses it in cursor and so you do the

[02:52 - 02:55]
same usually, right?

[02:53 - 02:57]
Yeah. So, here's my experiment actually,

[02:55 - 02:58]
but we can just create straight up a new

[02:57 - 03:00]
one.

[02:58 - 03:01]
So, we're starting a new fresh project

[03:00 - 03:02]
in cursor.

[03:01 - 03:06]
We're going to go ahead and create a

[03:02 - 03:08]
folder called lovable clone. Amazing.

[03:06 - 03:10]
Yeah, we're just going to go ahead and

[03:08 - 03:13]
open it. So now this is by the books a

[03:10 - 03:16]
very standard, you know, cursor code

[03:13 - 03:18]
development environment. I can create a

[03:16 - 03:21]
terminal by either doing this or using

[03:18 - 03:23]
the shortcut. And so I have a terminal

[03:21 - 03:26]
now and I can go ahead and run cloud

[03:23 - 03:29]
code like I did before in the terminal.

[03:26 - 03:31]
And it's asking to like read your stuff.

[03:29 - 03:33]
Sure, go ahead. And we can actually

[03:31 - 03:35]
configure this to do a lot of things

[03:33 - 03:37]
without asking. Normally you'll see

[03:35 - 03:39]
that. Oh, okay. No, I actually don't

[03:37 - 03:41]
want you to do anything. So, it's

[03:39 - 03:42]
already like trying to start coding. I

[03:41 - 03:43]
can tell it to stop.

[03:42 - 03:44]
It's eager.

[03:43 - 03:47]
Yeah, it found out that I wanted to make

[03:44 - 03:49]
a lovable clone because I named the

[03:47 - 03:49]
It just looked at the name of your file.

[03:49 - 03:50]
That's crazy.

[03:49 - 03:52]
And it started like telling you like,

[03:50 - 03:54]
"Oh, I'm going to set up a next.js

[03:52 - 03:55]
project with TypeScript. I'm going to

[03:54 - 03:56]
create a landing page. I'm going to

[03:55 - 03:57]
implement."

[03:56 - 03:58]
Cloud's like, "I don't need you."

[03:57 - 04:00]
Just gonna go through everything.

[03:58 - 04:02]
Honestly, it would be a super fun

[04:00 - 04:04]
experience to kind of see if it can do

[04:02 - 04:06]
it just right off the bat by itself. But

[04:04 - 04:10]
we have some custom demands. We want to

[04:06 - 04:12]
use cloud code SDK to go ahead and build

[04:10 - 04:14]
this whole thing. So there are a few

[04:12 - 04:17]
things that I guess I could show you

[04:14 - 04:20]
first. So like a shortcut that you can

[04:17 - 04:22]
do is you can actually do looking for it

[04:20 - 04:24]
on the keyboard.

[04:22 - 04:27]
This pound sign allows you to kind of

[04:24 - 04:29]
create like cloud MD files which access

[04:27 - 04:32]
persistent memory for your cla code

[04:29 - 04:37]
session. So I can say like I am building

[04:32 - 04:39]
a lovable clone but I want to use the

[04:37 - 04:41]
claude

[04:39 - 04:43]
code SDK

[04:41 - 04:46]
and I can create that and it'll ask me

[04:43 - 04:48]
okay do I want it in my user memory or

[04:46 - 04:51]
my project memory. Well, user memory

[04:48 - 04:52]
would mean for every single instance I

[04:51 - 04:54]
use cloud code, it will try to think

[04:52 - 04:56]
that I'm building lovable, which is not

[04:54 - 04:57]
like the right thing. Yeah, that would

[04:56 - 04:59]
probably be more something like my name

[04:57 - 05:00]
is Khan, I could save that forever as my

[04:59 - 05:02]
user memory.

[05:00 - 05:04]
Project memory, this is where it belongs

[05:02 - 05:05]
because I am building a vibe coding a

[05:04 - 05:05]
lovable clone right now. So, I'll go

[05:05 - 05:07]
ahead and

[05:05 - 05:09]
So, I guess I guess if for those of who

[05:07 - 05:12]
have used cursor one, the bottom one

[05:09 - 05:13]
would have been like your cursor rules

[05:12 - 05:15]
and then the top one would be like a

[05:13 - 05:16]
readme file in that project.

[05:15 - 05:18]
Yeah. And as you can see, it's actually

[05:16 - 05:21]
very similar. Like Claude literally just

[05:18 - 05:23]
spun up a readme. Basically, an MD file

[05:21 - 05:25]
is a markdown file and it's basically an

[05:23 - 05:28]
upgraded txt file. So this is basically

[05:25 - 05:30]
a readme. And so it's it noted down. I'm

[05:28 - 05:31]
building a lovable clone. And so that's

[05:30 - 05:34]
really cool. Another quick feature I

[05:31 - 05:37]
wanted to showcase before we dive into

[05:34 - 05:40]
using it is you can shift tab to kind of

[05:37 - 05:42]
show autoedits on. So this is really

[05:40 - 05:44]
cool. And I can also shift tab again to

[05:42 - 05:46]
show plan mode. So, I guess I would

[05:44 - 05:48]
actually begin by saying I like do some

[05:46 - 05:50]
research on it because that's what I'm

[05:48 - 05:53]
going to do. And one really interesting

[05:50 - 05:55]
trick about Enthropics Cloud Code is

[05:53 - 05:57]
that it uses the web and it does a lot

[05:55 - 05:59]
of research, but you kind of have to

[05:57 - 06:02]
push it in the right direction. So, here

[05:59 - 06:06]
I have the Cloud Code SDK documentation.

[06:02 - 06:08]
I found it by saying Cloud Code SDK and

[06:06 - 06:09]
then if you go to Google, it's the first

[06:08 - 06:11]
link. So, I'm going to go ahead and grab

[06:09 - 06:14]
this link and I'm going just give it to

[06:11 - 06:15]
Claude on plan mode and be like, "Okay,

[06:14 - 06:17]
look." So, it has the memory that I'm

[06:15 - 06:19]
building a lovable clone, but I want to

[06:17 - 06:24]
use the cloud SDK. Let's just tell it

[06:19 - 06:29]
like, let's focus on using the Claude

[06:24 - 06:32]
code SDK to power my code

[06:29 - 06:36]
gen agent capabilities, codegen features

[06:32 - 06:41]
for my lovable clone.

[06:36 - 06:43]
Lovable clone. For now, let's scope

[06:41 - 06:45]
things down.

[06:43 - 06:47]
So, Lovable is a website that builds

[06:45 - 06:49]
websites. For now, I'm going to build My

[06:47 - 06:49]
background is mainly in backend

[06:49 - 06:51]
engineering right?

[06:49 - 06:53]
I'm definitely more on the

[06:51 - 06:55]
infrastructure and backend side of

[06:53 - 06:56]
things. So, we're going to stick to that

[06:55 - 06:57]
since this project is pretty orientated

[06:56 - 06:59]
around that. And we're just going to go

[06:57 - 07:02]
ahead and ask it, you know, I want a

[06:59 - 07:03]
function that builds something for me.

[07:02 - 07:04]
And that something is going to be what

[07:03 - 07:06]
should translate. function that you need

[07:04 - 07:08]
to execute. For those of you who aren't

[07:06 - 07:11]
as technical, you want to create a place

[07:08 - 07:14]
that you can type your app idea and it

[07:11 - 07:15]
will execute it or do it and create the

[07:14 - 07:16]
code for that project.

[07:15 - 07:18]
Exactly.

[07:16 - 07:20]
Exactly. So, we're going to go ahead and

[07:18 - 07:22]
tell that we just want the raw

[07:20 - 07:24]
piece of code that you can execute that

[07:22 - 07:25]
will build something for me. And so, I'm

[07:24 - 07:27]
going to translate that a little bit

[07:25 - 07:31]
more tech lingo. Let's scope things

[07:27 - 07:33]
down. I want a function that lets me

[07:31 - 07:38]
input a prompt

[07:33 - 07:41]
and uses claude code to build

[07:38 - 07:43]
it. Let's just see what it does, you

[07:41 - 07:44]
know. Amazing. And so I have it on plan

[07:43 - 07:45]
mode. I don't need to tell it

[07:44 - 07:47]
specifically like, hey, I don't want you

[07:45 - 07:49]
to edit code. I just want you to come up

[07:47 - 07:50]
with a plan. It's currently asking, can

[07:49 - 07:52]
I read this?

[07:50 - 07:54]
Yes, you can. And the cool thing about

[07:52 - 07:56]
this now I can take this time to explain

[07:54 - 07:59]
to you that cloud code will generate

[07:56 - 08:01]
this directory called cloud. Inside of

[07:59 - 08:02]
it it has settings and it just keeps

[08:01 - 08:04]
track of things that you allow and

[08:02 - 08:06]
disallow. And so we have to configure

[08:04 - 08:09]
this when we build software that uses

[08:06 - 08:11]
cloud code to make sure that the SDK

[08:09 - 08:13]
cloud code must also have the correct

[08:11 - 08:15]
permissions so that it can write and

[08:13 - 08:16]
read and do things that you know we kind

[08:15 - 08:18]
of wanted to do.

[08:16 - 08:20]
Let's pause there for a sec. So the same

[08:18 - 08:22]
way that cloud code asks you permission,

[08:20 - 08:24]
right? We are building an app that uses

[08:22 - 08:26]
cloud code. So we need to basically

[08:24 - 08:28]
enable the app that we create to do the

[08:26 - 08:30]
same thing to have the same permissions

[08:28 - 08:32]
that we're granting as we build. Okay.

[08:30 - 08:34]
Exactly. Exactly.

[08:32 - 08:36]
And so it's giving me a lot of things.

[08:34 - 08:38]
Once again, it's giving me like build

[08:36 - 08:40]
simple UI build with next project

[08:38 - 08:42]
implement service class. Like all of

[08:40 - 08:44]
this, you know, we're trying to scope

[08:42 - 08:46]
down. This is probably a good

[08:44 - 08:48]
engineering practice. We should be

[08:46 - 08:50]
having service classes. We should have

[08:48 - 08:52]
simple UI. Pretty simple. But yeah, like

[08:50 - 08:53]
we're going to just say no.

[08:52 - 08:58]
Yeah. Yeah. I like it. I like it.

[08:53 - 09:01]
I just want a simple TypeScript function

[08:58 - 09:07]
that

[09:01 - 09:07]
takes in a prompt and tries to build it

[09:07 - 09:16]
with Claude code. Don't worry about the

[09:12 - 09:21]
website yet. We want to prove to

[09:16 - 09:26]
ourselves that we can accomplish

[09:21 - 09:28]
the main functionality first. And so,

[09:26 - 09:34]
show me

[09:28 - 09:36]
pseudo code make sure that the clawed

[09:34 - 09:40]
code SDK is configured

[09:36 - 09:43]
to have the right permissions to read

[09:40 - 09:45]
and write automatically. So, yeah. And

[09:43 - 09:47]
what's cool is we're using the SDK of

[09:45 - 09:48]
the tool we're using. So it probably has

[09:47 - 09:50]
good knowledge of the SDK.

[09:48 - 09:51]
You'd think so, but I don't think it

[09:50 - 09:53]
actually does. See, once again, it's

[09:51 - 09:55]
going ahead to like go read about

[09:53 - 09:58]
itself, which is really interesting

[09:55 - 10:00]
because I think the way that this works

[09:58 - 10:02]
is that cloud releases. I think cloud

[10:00 - 10:04]
code came out before four, but four

[10:02 - 10:06]
might have some documentation on cloud

[10:04 - 10:09]
code, but obviously they're probably

[10:06 - 10:11]
they might have even trained cloud 4 on

[10:09 - 10:12]
the implementation of cloud code, but

[10:11 - 10:13]
they definitely don't they're keeping

[10:12 - 10:15]
that closed source.

[10:13 - 10:17]
So its knowledge isn't that great.

[10:15 - 10:18]
It's also like a needle in the haststack

[10:17 - 10:20]
one part of its training data and it's

[10:18 - 10:22]
not going to like know exactly how it's

[10:20 - 10:23]
implemented and be able to remember that

[10:22 - 10:25]
from its training set and just know

[10:23 - 10:27]
about instantly. And also this way it

[10:25 - 10:29]
kind of has a better control of like

[10:27 - 10:31]
what is released to the public and so

[10:29 - 10:32]
whatever it finds online it can know

[10:31 - 10:34]
that like okay I can like definitely use

[10:32 - 10:36]
this. So that's probably all baked into

[10:34 - 10:39]
like the model that they trained itself.

[10:36 - 10:41]
But let's see it kind of has us given me

[10:39 - 10:43]
some pseudo code about you know looks

[10:41 - 10:46]
this looks like okay it's giving itself

[10:43 - 10:48]
tools to use max turns 10. I'll get more

[10:46 - 10:50]
into that later but it kind of looks

[10:48 - 10:52]
like you know it's looping through some

[10:50 - 10:54]
messages and it's looks like a function

[10:52 - 10:57]
to extract code from messages. That's

[10:54 - 10:58]
interesting. It seems like this could

[10:57 - 11:01]
work. So, I'm just going to go ahead get

[10:58 - 11:04]
off of plan mode and get on auto accept

[11:01 - 11:07]
edits mode and say, "Okay, implement

[11:04 - 11:12]
this feature and I want you to test it.

[11:07 - 11:16]
Try and make a simple ticktactoe

[11:12 - 11:18]
game using the function that calls

[11:16 - 11:20]
Claude code SDK.

[11:18 - 11:26]
Let's go, baby.

[11:20 - 11:28]
Make this in HTML for now." And so HTML

[11:26 - 11:29]
is kind of like super bare bones. I

[11:28 - 11:31]
don't need any setup around it. I can

[11:29 - 11:33]
just open it in a browser. And so that's

[11:31 - 11:35]
why we're asking it to build an HTML

[11:33 - 11:39]
first. Later, we can change that to a

[11:35 - 11:41]
next or like a React Native website. So,

[11:39 - 11:43]
okay. Well, sure. Never mind. It wants

[11:41 - 11:44]
to build a website. Why not? It will go

[11:43 - 11:46]
ahead. I'll just let this thing run for

[11:44 - 11:49]
a sec. And so, this thing will always

[11:46 - 11:50]
ask you. There's a way to make this not

[11:49 - 11:52]
ask you, actually,

[11:50 - 11:55]
like similar to yolo mode on cursor.

[11:52 - 11:56]
Yeah. And I can talk about that a little

[11:55 - 11:58]
bit more in a second because if we want

[11:56 - 12:00]
to take this to the next level, we're

[11:58 - 12:01]
actually going to have to make it such

[12:00 - 12:04]
that currently it's going to just write

[12:01 - 12:05]
code. Claude Code, which I'm using right

[12:04 - 12:09]
now, is going to just write code in my

[12:05 - 12:11]
workspace. When we want Claude Code SDK,

[12:09 - 12:13]
which is our lovable coding agent to

[12:11 - 12:15]
write code, we're going to want that to

[12:13 - 12:18]
happen in an isolated environment where

[12:15 - 12:20]
we can let it do whatever it wants.

[12:18 - 12:21]
We're just going to like put it in a

[12:20 - 12:23]
bubble and whatever happens in that

[12:21 - 12:24]
bubble is fine. It can blow up. It can

[12:23 - 12:25]
break. It can like do anything.

[12:24 - 12:28]
It won't affect the main

[12:25 - 12:30]
and it won't affect like my Yeah. The

[12:28 - 12:32]
damage will be contained is that that is

[12:30 - 12:33]
the point. Yeah. And so

[12:32 - 12:35]
if we have time, we can get to that. But

[12:33 - 12:36]
for now, we're going to scale things

[12:35 - 12:40]
down. We're going to let Cloud Code

[12:36 - 12:42]
write something that writes code on my

[12:40 - 12:43]
local machine, which probably isn't like

[12:42 - 12:45]
too good either. Honestly, I should just

[12:43 - 12:49]
spin up a Docker instance. But okay,

[12:45 - 12:52]
simplifying down. Let's see. We have a

[12:49 - 12:55]
main function that wraps Cloud Code SDK

[12:52 - 12:56]
and a test script that uses the generate

[12:55 - 13:00]
how to test it. First, use your

[12:56 - 13:02]
anthropic key in myv file and then run

[13:00 - 13:03]
it. I'm going to go ahead and put a key

[13:02 - 13:05]
here and we're going to make sure you

[13:03 - 13:07]
don't steal that key because this key is

[13:05 - 13:10]
very important. Okay, so I just put the

[13:07 - 13:11]
key in myv file. I've closed it and I

[13:10 - 13:14]
will never open it again because I don't

[13:11 - 13:16]
want you to have my secrets. But it's

[13:14 - 13:20]
telling me I can just, you know, run

[13:16 - 13:21]
this after I put my key in. Let's see if

[13:20 - 13:22]
it works.

[13:21 - 13:23]
So you can just run it in a new

[13:22 - 13:25]
terminal.

[13:23 - 13:27]
Yeah. So this terminal is housing closet

[13:25 - 13:29]
code. So it's busy. This one is a new

[13:27 - 13:32]
terminal. I'm in the same directory.

[13:29 - 13:34]
Just going to try this. Okay. Let's see.

[13:32 - 13:36]
It's planning right now. So we can kind

[13:34 - 13:38]
of see that this is a system message

[13:36 - 13:41]
from Cloud Code. We told it to generate

[13:38 - 13:43]
me a tic-tac-toe game. Cloud Code is

[13:41 - 13:46]
able to use these tools. It's thinking,

[13:43 - 13:47]
I guess. Okay, it's using Opus. Wow,

[13:46 - 13:48]
that's really cool.

[13:47 - 13:50]
Opus 4.

[13:48 - 13:52]
Claude is going to run up my bill with

[13:50 - 13:54]
Claude. So, that's cool. We're gonna

[13:52 - 13:56]
see. So, now what we had is if you

[13:54 - 13:57]
notice, I actually had to run a script.

[13:56 - 14:00]
This is the function that I was talking

[13:57 - 14:01]
about the super bare bones like I just

[14:00 - 14:03]
want a piece of code that uses cloud

[14:01 - 14:05]
code to write code. So, I executed that

[14:03 - 14:07]
piece of code and now cloud code is

[14:05 - 14:09]
writing code. So all these green and

[14:07 - 14:11]
blue and yellow and complicated system

[14:09 - 14:13]
messages, assistant messages are

[14:11 - 14:14]
actually is Claude trying to write code

[14:13 - 14:15]
right now because we ran the code,

[14:14 - 14:17]
right?

[14:15 - 14:19]
So let's kind of see if it ever creates

[14:17 - 14:22]
me anything useful. All I really needed

[14:19 - 14:24]
it to do is write me an HTML file. I can

[14:22 - 14:26]
tell that it's still thinking. Honestly,

[14:24 - 14:28]
that's a little concerning because it

[14:26 - 14:31]
shouldn't think too hard. Code generated

[14:28 - 14:34]
successfully. I need permission to write

[14:31 - 14:35]
this file. So we can see that it doesn't

[14:34 - 14:38]
have permission to write files. And so

[14:35 - 14:39]
I'm gonna go ahead and flame club code

[14:38 - 14:43]
because I explicitly told it to give it

[14:39 - 14:45]
permissions. As you can see,

[14:43 - 14:48]
the function

[14:45 - 14:52]
you wrote does not

[14:48 - 14:56]
allow Claude code to write. Please make

[14:52 - 15:00]
sure all permissions

[14:56 - 15:04]
are granted to the claude

[15:00 - 15:10]
code SDK such that it writes files.

[15:04 - 15:13]
Okay, here are the docs. Again,

[15:10 - 15:15]
just make it work. I'm going to tell it

[15:13 - 15:17]
to fix itself because we've identified

[15:15 - 15:20]
the issue. The issue is

[15:17 - 15:21]
that it basically gave it not enough

[15:20 - 15:22]
permissions to do what it's doing.

[15:21 - 15:24]
That's probably why it thought for

[15:22 - 15:26]
longer than you were comfortable with.

[15:24 - 15:28]
Yeah. Let's see if the test that cloud

[15:26 - 15:31]
code wrote to test this on code is

[15:28 - 15:34]
working. I think in this case it's

[15:31 - 15:36]
actually better than cursor because it's

[15:34 - 15:39]
really annoying to use the terminal that

[15:36 - 15:42]
cursors agent uses, right? But it's

[15:39 - 15:44]
pretty easy to see what the terminal is

[15:42 - 15:46]
doing here because I can click control R

[15:44 - 15:46]
and I can see everything that's going

[15:46 - 15:48]
on.

[15:46 - 15:50]
I definitely get confused using cursors

[15:48 - 15:53]
terminal thing.

[15:50 - 15:57]
Yeah. And what's amazing is we actually

[15:53 - 15:58]
already have I see here tic tactoe.html.

[15:57 - 15:59]
So it built it and put it in the

[15:58 - 16:01]
codebase.

[15:59 - 16:04]
Yeah. And so we can go ahead and open

[16:01 - 16:06]
tic-tac-toe and it open tic tac-toe.

[16:04 - 16:08]
There it is. So our lovable clone which

[16:06 - 16:08]
we haven't built a front end for yet.

[16:08 - 16:11]
Yeah. Yeah. Yeah.

[16:08 - 16:11]
Built this tic-tac-toe game. You want to

[16:11 - 16:12]
let me play you?

[16:11 - 16:13]
Yeah. Yeah. You want to play?

[16:12 - 16:16]
Yeah, let's play.

[16:13 - 16:19]
Make sure this thing works.

[16:16 - 16:19]
Okay. Wow.

[16:19 - 16:22]
I let you win. [ __ ] What are you doing?

[16:21 - 16:24]
What do you mean?

[16:22 - 16:26]
You could have gone there and won.

[16:24 - 16:28]
Oh my god.

[16:26 - 16:28]
I told you to let me win and I let you

[16:28 - 16:29]
win bro.

[16:28 - 16:30]
And then nobody won.

[16:29 - 16:32]
Let's see what happens. Is there an

[16:30 - 16:32]
animation?

[16:32 - 16:34]
It's a draw.

[16:32 - 16:37]
It's a draw. Okay. Okay. Pretty basic,

[16:34 - 16:40]
but yeah, it is. We now have a function

[16:37 - 16:43]
that writes code specifically HTML code.

[16:40 - 16:44]
And so let's talk about what we must do

[16:43 - 16:46]
now and kind of reason through it

[16:44 - 16:48]
actually with cloud. So this is actually

[16:46 - 16:50]
one of the best parts. We have a proof

[16:48 - 16:54]
of concept working as in we are now able

[16:50 - 16:55]
to use AI to write code for us.

[16:54 - 16:56]
Mhm.

[16:55 - 16:58]
There's a few things once as you

[16:56 - 16:59]
mentioned that differentiate this from

[16:58 - 17:01]
lovable. First of all, we don't have a

[16:59 - 17:02]
landing page, a real website that houses

[17:01 - 17:04]
this,

[17:02 - 17:06]
right? And second of all, Lovable can

[17:04 - 17:07]
make cooler things than a single HTML

[17:06 - 17:08]
script file.

[17:07 - 17:10]
So, what do you want to start with?

[17:08 - 17:11]
And so, there's a few ways we can

[17:10 - 17:13]
upgrade this to become more like

[17:11 - 17:15]
Lovable. We can build a website around

[17:13 - 17:17]
it. We can make this such that the user

[17:15 - 17:19]
can type in whatever prompt they want

[17:17 - 17:22]
and it'll try to build it instead of

[17:19 - 17:24]
hard coding a tic-tac-toe simple game in

[17:22 - 17:24]
a single HTML file prompt. Right?

[17:24 - 17:26]
Cool.

[17:24 - 17:30]
We can do that. We can build a website

[17:26 - 17:32]
around it. Or we can take this, we can

[17:30 - 17:34]
start containerizing things and making

[17:32 - 17:36]
the back end more power.

[17:34 - 17:38]
So if you don't mind, since I love the

[17:36 - 17:39]
front end, I think Vibe coders love

[17:38 - 17:40]
making sure the front end actually looks

[17:39 - 17:41]
like a wrapper.

[17:40 - 17:42]
We can take a screenshot.

[17:41 - 17:44]
Wait, can you throw it on dark mode at

[17:42 - 17:45]
least? I think the dark mode version of

[17:44 - 17:48]
their site is better.

[17:45 - 17:50]
Oh, there we go. Okay, great. You want

[17:48 - 17:51]
the dark mode clone? We got the dark

[17:50 - 17:55]
mode clone. What I was saying was you

[17:51 - 17:56]
can grab the screenshot. It can actually

[17:55 - 17:58]
digest images as well. If we want to

[17:56 - 18:01]
clone the dark mode of lovable, we can

[17:58 - 18:06]
go ahead and screenshot this and we can

[18:01 - 18:08]
go ahead and copy this screenshot

[18:06 - 18:10]
and go back to cloud code and we can

[18:08 - 18:13]
just paste it in. And so we can say

[18:10 - 18:18]
something like let's continue our

[18:13 - 18:22]
project by building out the UI. We have

[18:18 - 18:26]
tested it and our function works for

[18:22 - 18:30]
now. Let's focus on building a website

[18:26 - 18:36]
that mirrors the current lovable

[18:30 - 18:38]
website. I want the soft gradients and a

[18:36 - 18:40]
text input. I notice that, you know,

[18:38 - 18:42]
there's a lot of like buttons and tabs

[18:40 - 18:46]
here. I don't really care about this. I

[18:42 - 18:50]
just want this to work like the nav bar

[18:46 - 18:51]
on top, the hero of the website. So,

[18:50 - 18:53]
let's kind of see what it does. There's

[18:51 - 18:54]
a few ways it can take this approach. It

[18:53 - 18:56]
can build a next project. It can build a

[18:54 - 18:58]
React project. I've seen it. Yeah, it

[18:56 - 18:59]
likes to default to next. I'll just let

[18:58 - 19:01]
it do its thing. I'm not a really good

[18:59 - 19:03]
front-end engineer, so I have some idea

[19:01 - 19:05]
of what's going on. For the most part,

[19:03 - 19:07]
I'm kind of like fumbling through the

[19:05 - 19:10]
dark, too. I noticed it ran the project

[19:07 - 19:12]
starter script, which will give me a lot

[19:10 - 19:14]
of uh

[19:12 - 19:16]
oh, lovable UI title. Lovable clone.

[19:14 - 19:17]
Okay, so it's like laying out the

[19:16 - 19:19]
websites. Websites have metadata.

[19:17 - 19:20]
Honestly, this is taking it a little too

[19:19 - 19:23]
far. like I don't really need this

[19:20 - 19:25]
stuff. Okay, but it seems like it's

[19:23 - 19:27]
running things fast enough. It's telling

[19:25 - 19:29]
me to change directories and run the dev

[19:27 - 19:32]
server. It's figuring it out. I need to

[19:29 - 19:35]
go into this directory and run the dev

[19:32 - 19:36]
server to see it. So, I can go ahead and

[19:35 - 19:37]
run this. It tells me it's running.

[19:36 - 19:40]
Click on local host.

[19:37 - 19:43]
And now local host will be here.

[19:40 - 19:45]
Oh, okay. All right. It's kind of there.

[19:43 - 19:46]
Like I don't have the gradient. Um

[19:45 - 19:49]
that's why I wanted to snag the

[19:46 - 19:50]
gradient. I don't have the logo.

[19:49 - 19:52]
I mean I mean I didn't expect it to

[19:50 - 19:55]
build the logo, but you want to test it.

[19:52 - 20:00]
We can try giving it a better prompt.

[19:55 - 20:03]
I don't see the gradient. I would like a

[20:00 - 20:07]
gradient similar to lovables

[20:03 - 20:08]
as in an orange circle

[20:07 - 20:09]
uh

[20:08 - 20:11]
into pink circle

[20:09 - 20:12]
into pink

[20:11 - 20:13]
into

[20:12 - 20:16]
into black.

[20:13 - 20:18]
Black. Give that a try. And then I think

[20:16 - 20:23]
you should do one other thing which is

[20:18 - 20:24]
um make the input area by default three

[20:23 - 20:26]
um

[20:24 - 20:26]
by default three lines high. You like

[20:26 - 20:32]
lovables

[20:26 - 20:35]
also the input area is a little small.

[20:32 - 20:36]
Lovables is around uh

[20:35 - 20:39]
three lines high by default.

[20:36 - 20:42]
Three lines height

[20:39 - 20:43]
by default. Ours is one. And then also,

[20:42 - 20:45]
yeah,

[20:43 - 20:47]
make the generate button an up arrow

[20:45 - 20:51]
instead of the generate thing.

[20:47 - 20:56]
Oh yeah, sure. Also make the generate

[20:51 - 21:01]
button and up arrow instead of the color

[20:56 - 21:03]
full button has right now.

[21:01 - 21:04]
I think we just give it the photo again.

[21:03 - 21:07]
Okay. Okay.

[21:04 - 21:08]
Yeah,

[21:07 - 21:10]
I dig it.

[21:08 - 21:13]
I dig it. I dig it. So now let's talk

[21:10 - 21:14]
about some more problems that we're

[21:13 - 21:18]
going to face kind of immediately down

[21:14 - 21:20]
the line. Uh number one is we have a few

[21:18 - 21:22]
options. We can either allow it to

[21:20 - 21:25]
continue writing directly to our local

[21:22 - 21:28]
machine and by that I mean it's just

[21:25 - 21:31]
going to write like a folder in here or

[21:28 - 21:33]
something with like let's project one,

[21:31 - 21:36]
right? or I guess currently it just kind

[21:33 - 21:38]
of like writes HTML files in my root

[21:36 - 21:40]
directory which isn't exactly how we

[21:38 - 21:42]
want things to go and isn't very easily

[21:40 - 21:44]
like productizable or scalable at all

[21:42 - 21:46]
either and that plays a issue when you

[21:44 - 21:48]
try to route into the results. We can

[21:46 - 21:51]
try to get that but there's going to be

[21:48 - 21:54]
some clunkiness in like getting the

[21:51 - 21:56]
website to open the website it just

[21:54 - 21:58]
built. That's going to be one issue that

[21:56 - 22:00]
we can solve pretty easily actually. So

[21:58 - 22:04]
we'll we'll probably tackle that next.

[22:00 - 22:08]
Can you hook it up such that the prompt

[22:04 - 22:13]
inside the text input is sent to the

[22:08 - 22:15]
function we wrote that uses claude code

[22:13 - 22:17]
SDK to generate code.

[22:15 - 22:18]
So yeah, let's go ahead and tell it to

[22:17 - 22:20]
hook everything up. Make sure

[22:18 - 22:22]
amazing because before it tested itself,

[22:20 - 22:24]
it made tic-tac-toe and it worked. And

[22:22 - 22:25]
we also created this front end. The

[22:24 - 22:27]
problem is that they're not connected

[22:25 - 22:28]
and we need it to be connected. So the

[22:27 - 22:30]
function that we made is a standalone

[22:28 - 22:31]
function that lives right here. It's

[22:30 - 22:34]
going to go ahead and move that into our

[22:31 - 22:36]
website which I see it doing right now.

[22:34 - 22:39]
And then that way when the website sends

[22:36 - 22:42]
that it will be able to make an API call

[22:39 - 22:44]
to that. Yeah. So update the front end

[22:42 - 22:46]
to call API to display messages add

[22:44 - 22:47]
message display component. So yeah it's

[22:46 - 22:49]
got a few things to build out. This is

[22:47 - 22:52]
actually it's going to earlier into this

[22:49 - 22:54]
session we saw all of these. It's going

[22:52 - 22:56]
to try to parse these and render these

[22:54 - 22:59]
as well as something ideally more

[22:56 - 23:00]
readable than this. This is pretty ugly.

[22:59 - 23:02]
So I kind of gave it that task to kind

[23:00 - 23:03]
of hook up the first thing that we built

[23:02 - 23:05]
which was the function that you know

[23:03 - 23:07]
we've tested and proved can build

[23:05 - 23:09]
tic-tac-toe and hook that up to the

[23:07 - 23:09]
button inside of here.

[23:09 - 23:10]
Right.

[23:09 - 23:11]
Yeah.

[23:10 - 23:13]
Amazing.

[23:11 - 23:15]
And then so what I understand is this

[23:13 - 23:16]
becomes like chat on the left and then

[23:15 - 23:16]
it becomes the website preview on the

[23:16 - 23:17]
right.

[23:16 - 23:19]
Correct.

[23:17 - 23:22]
Okay. Great. Yeah. We can tell it to do

[23:19 - 23:24]
that too after this. That is so cool.

[23:22 - 23:26]
So once again, it was trying to go into

[23:24 - 23:28]
the website and run the dev server. And

[23:26 - 23:30]
once again, that has an issue because

[23:28 - 23:32]
its terminal is shorter lived than

[23:30 - 23:34]
itself. So every time it tries I try to

[23:32 - 23:35]
open it after it runs it, it's not

[23:34 - 23:37]
actually open.

[23:35 - 23:38]
Could you put like a rule in for your

[23:37 - 23:41]
like whatever the longer memory is

[23:38 - 23:42]
called? So that says like always just

[23:41 - 23:43]
tell me when to run the dev server

[23:42 - 23:44]
instead of doing it.

[23:43 - 23:46]
Yeah. Yeah, that would probably This is

[23:44 - 23:48]
a great example of something that would

[23:46 - 23:50]
actually belong in like the long-term

[23:48 - 23:51]
memory. Okay, I could definitely save

[23:50 - 23:53]
that to user memory. You're right. I'll

[23:51 - 23:54]
just save that to longterm memory. Good

[23:53 - 23:56]
to know. Great. Thanks. I'm going to

[23:54 - 23:59]
restart this dev server. I don't think

[23:56 - 24:00]
it needs to, but we're just gonna see if

[23:59 - 24:01]
this is still

[24:00 - 24:03]
It's done.

[24:01 - 24:06]
So, it it was trying to start it

[24:03 - 24:08]
earlier. So, make me connect 4. Let's

[24:06 - 24:10]
see what it does. It's currently

[24:08 - 24:12]
loading. I'm expecting like some user

[24:10 - 24:15]
messages or, you know, at least some

[24:12 - 24:16]
logs on the back end. Generating code

[24:15 - 24:19]
for prompt make me connect 4.

[24:16 - 24:21]
Amazing. We are seeing some indication

[24:19 - 24:21]
of life.

[24:21 - 24:23]
Okay. Um,

[24:21 - 24:24]
and it's not immediately failing. So,

[24:23 - 24:25]
that's good.

[24:24 - 24:29]
It's not immediately failing. I have a

[24:25 - 24:32]
theory that it will just make me another

[24:29 - 24:35]
HTML file. We could probably embed HTML

[24:32 - 24:38]
as an iframe, but what we truly want is

[24:35 - 24:42]
like probably for it to go and write its

[24:38 - 24:46]
own next website. Oh, no way. Let's go.

[24:42 - 24:48]
Okay. So, it actually did run and it has

[24:46 - 24:49]
its whole like thought process here.

[24:48 - 24:51]
Now,

[24:49 - 24:53]
let's kind of digest what it's given us.

[24:51 - 24:55]
So, it's given us, you know, it's

[24:53 - 24:57]
calling tools like reading files. It's

[24:55 - 24:58]
reading a bunch of stuff that it

[24:57 - 25:00]
shouldn't be reading, right? So, for

[24:58 - 25:03]
example, it's reading all of the code

[25:00 - 25:07]
for the website when instead I asked it

[25:03 - 25:09]
to make me connect 4. And then it I've

[25:07 - 25:12]
created a connect four for you, but

[25:09 - 25:14]
where? So, let's see. Let's look through

[25:12 - 25:18]
the code again. Do you have Connect 4

[25:14 - 25:21]
anywhere? Uh let's see. Connect 4. We do

[25:18 - 25:24]
have a page with connect 4. Now it's

[25:21 - 25:26]
inside of my lovable UI app. And so this

[25:24 - 25:28]
is kind of what I was mentioning before.

[25:26 - 25:30]
It's about where the code that is being

[25:28 - 25:32]
generated lives. This is about like this

[25:30 - 25:36]
becomes a question about scalability

[25:32 - 25:38]
environments and where you want to run

[25:36 - 25:40]
code, where you want the code to be

[25:38 - 25:42]
created to be housed and how can you

[25:40 - 25:44]
orchestrate everything such that it

[25:42 - 25:46]
comes back and shows up on your website.

[25:44 - 25:48]
This is actually like great and all

[25:46 - 25:50]
because I'm pretty sure that we can

[25:48 - 25:51]
access this connect for website that we

[25:50 - 25:54]
just generated by

[25:51 - 25:56]
could you just go to localhost

[25:54 - 25:56]
slash 3000 or connect 4 maybe or

[25:56 - 25:59]
something?

[25:56 - 26:02]
I think so. Literally. Yes, probably.

[25:59 - 26:05]
Let's try that. Slash connect four. And

[26:02 - 26:05]
we have four. That's absolutely correct.

[26:05 - 26:07]
It did just

[26:05 - 26:08]
Can you try and put a little guy in

[26:07 - 26:09]
there or uh place a piece?

[26:08 - 26:11]
Oh, yeah. Sure.

[26:09 - 26:13]
Nice. Place another one. Nice. Can you

[26:11 - 26:15]
make one of them win? I just want to see

[26:13 - 26:16]
what happens. That's cool. Let's go.

[26:15 - 26:18]
Ah, yellow wins.

[26:16 - 26:20]
Player two wins. Let's go. All right.

[26:18 - 26:22]
So, it works. It just doesn't And it's

[26:20 - 26:24]
just basically it creates a new file in

[26:22 - 26:26]
your actual codebase, which is not what

[26:24 - 26:28]
you think we should do. that's really

[26:26 - 26:31]
bad on multiple fronts. You know, I can

[26:28 - 26:33]
make it such that some bad code, I can

[26:31 - 26:36]
make it say not nice things and it would

[26:33 - 26:37]
just be on my website as a URL. I think

[26:36 - 26:39]
there's a lot of other improvements we

[26:37 - 26:41]
can make on the middle ground as well,

[26:39 - 26:44]
such as telling it, hey, I want real

[26:41 - 26:44]
time messages to be like shown cuz you

[26:44 - 26:47]
know

[26:44 - 26:48]
what we saw was after its whole thought

[26:47 - 26:50]
process, it showed all of its thought

[26:48 - 26:52]
process. We want this in real time. We

[26:50 - 26:54]
could say something like that. All the

[26:52 - 26:56]
messages shown to us were computer

[26:54 - 26:57]
speak. We can make it not computer speak

[26:56 - 26:58]
or like

[26:57 - 27:00]
more friendly. We can render more

[26:58 - 27:03]
friendly text or only strip out the

[27:00 - 27:06]
important parts. We can also make it

[27:03 - 27:08]
open the page that it made after.

[27:06 - 27:10]
We can do all of that or we can start

[27:08 - 27:12]
putting things into Docker images and

[27:10 - 27:12]
hosting isolated environments. Where do

[27:12 - 27:15]
you want to think?

[27:12 - 27:16]
I don't have an idea of how long either

[27:15 - 27:18]
of those would take. I think I would

[27:16 - 27:21]
defer to you. We should make this as

[27:18 - 27:23]
close to lovable as we can in the next

[27:21 - 27:26]
hour and under that frame you decide.

[27:23 - 27:28]
Cool. I'm going to go ahead and I really

[27:26 - 27:29]
hated the process of not knowing what's

[27:28 - 27:30]
going on. So, I'm going to do a little

[27:29 - 27:31]
bit of house cleaning with this code

[27:30 - 27:33]
base.

[27:31 - 27:35]
And so, a lot of what that means is

[27:33 - 27:37]
okay, great job. Cloud code is a little

[27:35 - 27:39]
child. You got to tell it good boy all

[27:37 - 27:41]
the time. Great job. It actually does, I

[27:39 - 27:43]
think, respond better because you

[27:41 - 27:45]
positively enforce that what it has done

[27:43 - 27:46]
is in the right direction. So, as long

[27:45 - 27:47]
as whatever it's doing is in the right

[27:46 - 27:50]
direction, you want to generally follow

[27:47 - 27:51]
it up with something to indicate to the

[27:50 - 27:52]
LLM that whatever it did was in the

[27:51 - 27:54]
right direction of what you're trying to

[27:52 - 27:56]
build. And so, that's why I kind of

[27:54 - 27:58]
begin this with great job and I'll say

[27:56 - 28:03]
exactly what it did, right? In this

[27:58 - 28:07]
case, you made it such that the website

[28:03 - 28:10]
builds a page

[28:07 - 28:13]
builds a page within itself

[28:10 - 28:17]
based on the prompt. And we notice that

[28:13 - 28:19]
because uh when we go to slashconnect 4,

[28:17 - 28:21]
it will it's in it's within itself.

[28:19 - 28:23]
Yeah. So we're gonna reiterate to itself

[28:21 - 28:25]
what it did. This is in the right

[28:23 - 28:29]
direction. There are a few problems

[28:25 - 28:32]
though. There are no logs in the back

[28:29 - 28:37]
end except until it successfully

[28:32 - 28:39]
finishes and when it begins. I want more

[28:37 - 28:45]
logs throughout

[28:39 - 28:49]
the code gen code generation process.

[28:45 - 28:53]
Similarly, the messages don't show up

[28:49 - 28:57]
until the whole conversation is

[28:53 - 29:00]
complete. I would like these I would

[28:57 - 29:03]
like real-time logs.

[29:00 - 29:06]
Ideally,

[29:03 - 29:10]
you should just display

[29:06 - 29:13]
the user agent message, assistant

[29:10 - 29:15]
message, assistant message, and maybe

[29:13 - 29:17]
tool call names. Make sure not

[29:15 - 29:20]
everything comes at the end. Also, I

[29:17 - 29:23]
would like you to try and open the

[29:20 - 29:25]
website that was created from the

[29:23 - 29:29]
prompt. Not I guess not the website, but

[29:25 - 29:31]
the the page that was created from the

[29:29 - 29:35]
prompt.

[29:31 - 29:38]
I.e. last time we asked it to make

[29:35 - 29:42]
connect for

[29:38 - 29:44]
I created a git repo. I want you to

[29:42 - 29:45]
create this as a PR. Now we can run

[29:44 - 29:46]
this.

[29:45 - 29:48]
We'll see if it cooks.

[29:46 - 29:50]
And then after that we get into some

[29:48 - 29:52]
more really nitty-gritty technical

[29:50 - 29:54]
things like we're going to find a way to

[29:52 - 29:56]
create an isolated environment. We can

[29:54 - 29:59]
do that locally first on our machine

[29:56 - 30:00]
with Docker to create this little bubble

[29:59 - 30:03]
where all the damage inside can be

[30:00 - 30:05]
contained and then we can run a bunch of

[30:03 - 30:06]
things in that bubble and then we can

[30:05 - 30:09]
put that bubble on someone else's

[30:06 - 30:11]
computer using putting it basic that's

[30:09 - 30:13]
like putting it on the server putting on

[30:11 - 30:15]
and then we can run this on the cloud

[30:13 - 30:17]
and then the good thing about that is

[30:15 - 30:20]
now if you imagine this bubble as a

[30:17 - 30:23]
separate new nex.js JS project. That way

[30:20 - 30:25]
it's a full standalone website instead

[30:23 - 30:27]
of a page inside of my website.

[30:25 - 30:28]
Makes sense. And you can add many files

[30:27 - 30:30]
to it in theory.

[30:28 - 30:31]
I mean, I think you could technically

[30:30 - 30:33]
nest a bunch of

[30:31 - 30:35]
that would that would be insane.

[30:33 - 30:37]
It would be bloating my website. I don't

[30:35 - 30:38]
actually want the lovable website to be

[30:37 - 30:40]
changed every time someone comes on and

[30:38 - 30:41]
writes a prompt. That's a terrible

[30:40 - 30:42]
design pattern. We'll try to vive code

[30:41 - 30:42]
it all, but

[30:42 - 30:44]
we're going to v code it.

[30:42 - 30:47]
It's currently doing some git stuff,

[30:44 - 30:49]
making me a git ignore. But definitely

[30:47 - 30:51]
this is more of the since we're live on

[30:49 - 30:52]
podcast and I have previous experience I

[30:51 - 30:54]
don't need to do research but this would

[30:52 - 30:57]
be a deep question that I would research

[30:54 - 30:59]
like how do I make it stop editing my

[30:57 - 31:01]
codebase directly and go create another

[30:59 - 31:03]
codebase where does that codebase live

[31:01 - 31:07]
and how do I port it into yeah so off

[31:03 - 31:10]
the top of my head I know there are many

[31:07 - 31:12]
software companies that provide isolated

[31:10 - 31:13]
environments I think they're that's a

[31:12 - 31:15]
pretty hot space they're like the people

[31:13 - 31:17]
selling shovels to companies like us who

[31:15 - 31:19]
want to build AI agents that run codegen

[31:17 - 31:21]
because it is a problem that we need to

[31:19 - 31:22]
solve. That's definitely like another

[31:21 - 31:23]
software

[31:22 - 31:25]
E2B or

[31:23 - 31:27]
E2B is a great example. Daytona is

[31:25 - 31:29]
another one. They're both kind of built

[31:27 - 31:31]
around giving you this bubble that you

[31:29 - 31:34]
can do whatever you want in and then

[31:31 - 31:36]
letting you also peek into that bubble

[31:34 - 31:37]
and see the code output of the agent.

[31:36 - 31:38]
And so that's kind of what we're going

[31:37 - 31:40]
to do next. We're going to go and spawn

[31:38 - 31:43]
a little bubble using one of these

[31:40 - 31:45]
isolated environment providers and we're

[31:43 - 31:46]
going to go and tell cloud code to write

[31:45 - 31:48]
the stuff in there and then show me

[31:46 - 31:51]
what's in there instead of directly

[31:48 - 31:54]
editing my website. Run the npm rundev.

[31:51 - 31:56]
Okay, let's see if it has real time

[31:54 - 31:58]
better messaging now.

[31:56 - 31:59]
So, back to UI.

[31:58 - 32:02]
Amazing.

[31:59 - 32:03]
Make me I want this to like run for as

[32:02 - 32:05]
minimal time as possible and get into

[32:03 - 32:08]
like the like bubbling stuff. So I'm

[32:05 - 32:11]
just going to say make me a screen that

[32:08 - 32:12]
says hello world. Very basic. Okay. So

[32:11 - 32:14]
we're seeing like

[32:12 - 32:15]
my assistants doing some

[32:14 - 32:19]
a lot of things already. Okay. Yeah. So

[32:15 - 32:21]
as you can see it's already like so this

[32:19 - 32:24]
is a lot better display. Let me check if

[32:21 - 32:25]
the existing project. Okay. So once

[32:24 - 32:27]
again

[32:25 - 32:29]
it told me that it's going to check the

[32:27 - 32:31]
existing structure of your project my

[32:29 - 32:33]
project to understand. Now it's going to

[32:31 - 32:35]
go and read through all this junk. I

[32:33 - 32:37]
mean, by this junk, I mean like this

[32:35 - 32:39]
website itself, which is the exact

[32:37 - 32:41]
problem that I don't want it to have,

[32:39 - 32:43]
which is why I have no doubt that it's

[32:41 - 32:45]
going to go and make me a screen that

[32:43 - 32:47]
says hello world. But I'm going to go

[32:45 - 32:50]
and make it such that instead of on my

[32:47 - 32:52]
website, it goes and opens a bubble in

[32:50 - 32:54]
the cloud and writes it there instead.

[32:52 - 32:55]
And so to do that, I'm going to go and

[32:54 - 32:57]
yeah, you can see that it's talking to

[32:55 - 32:58]
itself, but we have an animation. We

[32:57 - 33:00]
have some sort of indication that

[32:58 - 33:03]
something's going on. I'm gonna go do a

[33:00 - 33:05]
little bit of research on E2B's docs.

[33:03 - 33:09]
E2B.dev.

[33:05 - 33:11]
I think I do have an account here.

[33:09 - 33:14]
Okay, we used to use E2B for our Vibe

[33:11 - 33:16]
Code, but not anymore. I will have to

[33:14 - 33:19]
build a new template for it with Docker

[33:16 - 33:22]
and everything. Let's go to docs for E2B

[33:19 - 33:24]
docs. And then I have a rough idea of

[33:22 - 33:26]
how this works, but I'm going to like

[33:24 - 33:28]
try to pretend like I don't. And I'm

[33:26 - 33:29]
going to just go and tell cloud code to

[33:28 - 33:32]
research this.

[33:29 - 33:34]
So once again, the big idea is we need

[33:32 - 33:36]
to create these bubbles such that

[33:34 - 33:38]
whatever is created there is

[33:36 - 33:40]
isolated. It also can peak into it. We

[33:38 - 33:42]
can see it happen on our on our end.

[33:40 - 33:44]
It's exploring. Sometimes it's like

[33:42 - 33:46]
cloud code really likes to explore a

[33:44 - 33:48]
bunch of stuff and oh look as we can see

[33:46 - 33:50]
it just made hello world which is this

[33:48 - 33:51]
cloud code over here actually just made

[33:50 - 33:53]
that.

[33:51 - 33:55]
Oh. So now if you just do go to

[33:53 - 33:58]
localhost/hello world probably

[33:55 - 33:59]
it told us this right now. If you can

[33:58 - 34:03]
you can start the dev server and

[33:59 - 34:05]
navigate to localhost 3000/hello world.

[34:03 - 34:08]
If we do that wow they gave us a

[34:05 - 34:10]
gradient. The point is once like it's

[34:08 - 34:12]
pretty good because it actually went

[34:10 - 34:14]
ahead and told us which website to go

[34:12 - 34:16]
to. And so that's a super small change

[34:14 - 34:17]
from it telling us which website to go

[34:16 - 34:20]
to to just making it a link that's

[34:17 - 34:21]
clickable. But this is something else.

[34:20 - 34:24]
Cloud code likes to do a lot of

[34:21 - 34:26]
dillydally searching. It makes it very

[34:24 - 34:28]
powerful, but I don't want to wait for

[34:26 - 34:29]
all this junk to happen. I'm just going

[34:28 - 34:31]
to tell it what to do differently, and

[34:29 - 34:33]
I'm going to tell it what I need it to

[34:31 - 34:35]
do. So, it was trying to gain some

[34:33 - 34:37]
context on what this project was. I can

[34:35 - 34:40]
go ahead and tell it or I can just put

[34:37 - 34:42]
it into my cloud. MD file. It should

[34:40 - 34:44]
have this. It knows that I'm a lovable

[34:42 - 34:45]
clone. Okay, I'll just go ahead and

[34:44 - 34:48]
actually save this to memory so it

[34:45 - 34:50]
doesn't need a search too much. We have

[34:48 - 34:55]
so far

[34:50 - 34:59]
a website that takes in a prompt uses

[34:55 - 35:00]
claude code SDK to write code

[34:59 - 35:01]
but currently it stores it in our

[35:00 - 35:04]
codebase

[35:01 - 35:09]
but currently

[35:04 - 35:12]
it directly modifies my website's code

[35:09 - 35:17]
by adding it as a page

[35:12 - 35:21]
page. The next task

[35:17 - 35:27]
we are going to work on going to work on

[35:21 - 35:33]
is making the code gen happen in an

[35:27 - 35:35]
isolated environment and opening the dev

[35:33 - 35:37]
server there. We're going to keep this

[35:35 - 35:40]
in local. So now we're going to tell it

[35:37 - 35:41]
E2B or we can use Daytona as well.

[35:40 - 35:43]
Honestly, that would be probably pretty

[35:41 - 35:46]
interesting because I've used E2B

[35:43 - 35:47]
before. Let's just do a fresh like

[35:46 - 35:48]
use something you've never used.

[35:47 - 35:49]
Use something I've never used. Just

[35:48 - 35:51]
purely vibe code this thing.

[35:49 - 35:51]
All right, let's purely vibe code it.

[35:51 - 35:53]
Purely vibe.

[35:51 - 35:55]
So, we're going to be using Daytona to

[35:53 - 35:58]
create these little bubbles that

[35:55 - 36:00]
people's code will be created and run

[35:58 - 36:00]
and that is the code that we will show

[36:00 - 36:03]
on the site.

[36:00 - 36:04]
Yeah, exactly. And so, oh crap, I need

[36:03 - 36:06]
to get an API key. So,

[36:04 - 36:08]
let's get an API key.

[36:06 - 36:10]
So, I just put Daytona in my ENV key in

[36:08 - 36:11]
my environmental firewall. So, I'm going

[36:10 - 36:14]
to tell it. Let's talk a little bit

[36:11 - 36:16]
about how I arrived here. To reiterate,

[36:14 - 36:17]
the main problem was that we have an

[36:16 - 36:19]
agent that writes code, but it writes

[36:17 - 36:20]
code directly on our website. Instead,

[36:19 - 36:22]
we want that code to be somewhere else,

[36:20 - 36:23]
and we want our website to be able to

[36:22 - 36:26]
show that code

[36:23 - 36:28]
some written and housed somewhere else.

[36:26 - 36:30]
And so, the way that we need this is we

[36:28 - 36:31]
need someone else to house the code that

[36:30 - 36:33]
our agent writes.

[36:31 - 36:34]
And so,

[36:33 - 36:36]
we're using Daytona.

[36:34 - 36:38]
Daytona is a provider of these little

[36:36 - 36:42]
bubbles. and we're going to so I'm going

[36:38 - 36:44]
to go ahead and tell it I want to

[36:42 - 36:51]
instead

[36:44 - 36:53]
make the code gen happen in an isolated

[36:51 - 36:59]
environment.

[36:53 - 37:00]
I have made I have given you a Daytona

[36:59 - 37:05]
key

[37:00 - 37:10]
inside thev file. I want you to read the

[37:05 - 37:14]
docs on daytona.

[37:10 - 37:19]
Verify that it can do what we want. And

[37:14 - 37:22]
the end goal is to have the clawed

[37:19 - 37:28]
code SDK

[37:22 - 37:30]
create a new React Nex.js Nex.js website

[37:28 - 37:35]
inside of the isolated environment.

[37:30 - 37:40]
Don't worry about connecting the text

[37:35 - 37:46]
input for now. I just want to validate

[37:40 - 37:49]
that we can run the at@ generate cloud

[37:46 - 37:51]
generate with cloud code function or

[37:49 - 37:54]
something similar

[37:51 - 37:56]
in a Daytona

[37:54 - 37:57]
sandbox. I've been saying isolated

[37:56 - 37:58]
environment. I'm going to feed it to

[37:57 - 37:59]
docs now. You should have docs

[37:58 - 38:02]
somewhere, right? So just like cursor,

[37:59 - 38:03]
you can paste links to docs and cloud

[38:02 - 38:05]
code comes equipped with the tool of

[38:03 - 38:05]
being able to search the web and do

[38:05 - 38:07]
research.

[38:05 - 38:09]
Yeah. And it should ideally be able to

[38:07 - 38:11]
continue searching down sublinks. So I

[38:09 - 38:12]
gave it a pretty broad link the whole

[38:11 - 38:14]
documentation link.

[38:12 - 38:16]
But it'll search and find which part of

[38:14 - 38:17]
the docs it needs. Navigate to that and

[38:16 - 38:18]
then search that one.

[38:17 - 38:19]
Yeah, I'll just turn on plan mode and

[38:18 - 38:22]
see what it says.

[38:19 - 38:23]
All right. It's a big prompt, big task.

[38:22 - 38:24]
At least

[38:23 - 38:26]
a lot of buzzwords have been going

[38:24 - 38:27]
around about prompt engineering. I think

[38:26 - 38:30]
a lot of prompt engineering is being

[38:27 - 38:33]
clear about the end goal, what to focus

[38:30 - 38:34]
on now, and all the things you need to

[38:33 - 38:36]
get to the current goal of what you're

[38:34 - 38:38]
focusing on now. I think it's good to

[38:36 - 38:40]
give some indication of the direction of

[38:38 - 38:42]
the end state. But it's most important

[38:40 - 38:46]
to frame and iterate to the agent that

[38:42 - 38:48]
we're working on a smaller chunk, but to

[38:46 - 38:48]
still have its eyes set on the end goal.

[38:48 - 38:50]
M

[38:48 - 38:51]
so because you see a lot of times when

[38:50 - 38:53]
you tell cursor to do something that's

[38:51 - 38:56]
apparently obvious in your brain and it

[38:53 - 38:58]
does it completely wrong it's because it

[38:56 - 38:59]
doesn't share the same end goal as you

[38:58 - 39:01]
and so that's why I like to always give

[38:59 - 39:03]
it a little peak of what the final goal

[39:01 - 39:06]
is but I like to if you give it like too

[39:03 - 39:07]
much to work on it'll obviously get lost

[39:06 - 39:08]
in the sauce and

[39:07 - 39:10]
there's also a difference between final

[39:08 - 39:12]
end goal and then the iteration end goal

[39:10 - 39:14]
or the current task end goal.

[39:12 - 39:16]
Yes. I want instead I want to instead

[39:14 - 39:18]
make the cogen happen in an isolated

[39:16 - 39:20]
environment. This is the end result or I

[39:18 - 39:22]
guess this is actually to create a

[39:20 - 39:23]
Nex.js inside of the isolated

[39:22 - 39:25]
environment. Don't worry about

[39:23 - 39:27]
connecting the input for now. Just I

[39:25 - 39:30]
want to validate we can run. So this is

[39:27 - 39:32]
what I mean by scoping down. The end

[39:30 - 39:34]
goal is to have the whole Nex.js website

[39:32 - 39:37]
inside the isolated environment be spun

[39:34 - 39:39]
up by cloud code. I told it instead just

[39:37 - 39:40]
work on being able to run cloud code

[39:39 - 39:43]
inside of the isolated environment

[39:40 - 39:46]
first. Okay, it gave me a plan. Let's

[39:43 - 39:49]
see. It's telling me to install the SDK.

[39:46 - 39:51]
Create an integration. Integrate with

[39:49 - 39:53]
initialize the client with API key.

[39:51 - 39:56]
Yeah, we gave it the API key. Implement

[39:53 - 39:57]
Nex.js project creation in sandbox.

[39:56 - 39:58]
Create a new sandbox generation

[39:57 - 40:00]
function. That's true. We're going to

[39:58 - 40:03]
need that. Update the API routes. Test

[40:00 - 40:05]
the script. And see, once again, it's

[40:03 - 40:06]
telling me to do this is the end result,

[40:05 - 40:08]
right? This is actually really good.

[40:06 - 40:11]
Test validation. create a simple test

[40:08 - 40:13]
that creates a Daytona sandbox, runs a

[40:11 - 40:15]
modified version, and creates a basic

[40:13 - 40:17]
Nex.js app. Yeah. And return to preview

[40:15 - 40:19]
your app. This is perfect. So, we're

[40:17 - 40:24]
going to go ahead and say the plan is

[40:19 - 40:27]
great. I want you to go ahead

[40:24 - 40:32]
and focus only on the test validation

[40:27 - 40:36]
for now. I also did some research and

[40:32 - 40:40]
found out that you probably want a

[40:36 - 40:44]
custom Docker image so that Claude code

[40:40 - 40:48]
can run inside the isolated environment.

[40:44 - 40:51]
Have you taken this into account? Plan

[40:48 - 40:56]
out the test script

[40:51 - 40:58]
in more detail. Show pseudo/real

[40:56 - 41:00]
code. And so this way it's doing another

[40:58 - 41:01]
plan session. I told it to be a little

[41:00 - 41:04]
bit more detailed about what it's

[41:01 - 41:05]
planning. Show me the code, how

[41:04 - 41:08]
everything's going to come together and

[41:05 - 41:10]
also consider the fact that we need a

[41:08 - 41:13]
template for how to make these bubbles,

[41:10 - 41:15]
how to make these isolated environments,

[41:13 - 41:17]
which more technically takes the form of

[41:15 - 41:18]
a docker file. So I kind of gave it some

[41:17 - 41:20]
direction. I said, "Hey, look into this

[41:18 - 41:22]
docker file thing for me. This is what

[41:20 - 41:24]
cloud is telling me that it needs to run

[41:22 - 41:26]
cloud code. You should probably like

[41:24 - 41:28]
think about that a little at least. And

[41:26 - 41:30]
I want you to start showing me your

[41:28 - 41:32]
thought process in code. Whenever it's

[41:30 - 41:33]
coding, I'm reviewing what is coding. If

[41:32 - 41:35]
I see it's going off track, I'll stop

[41:33 - 41:37]
it. And at the same time, I'll myself as

[41:35 - 41:37]
a human gain more context on the code

[41:37 - 41:39]
base.

[41:37 - 41:41]
And this is also another reason why

[41:39 - 41:43]
being technical is an advantage is

[41:41 - 41:44]
because you can run a prompt like this.

[41:43 - 41:46]
I can't run a prompt like this and look

[41:44 - 41:47]
at the code and be like, that's good. We

[41:46 - 41:50]
agree on good code. I don't know what

[41:47 - 41:51]
that is. But the powerful, as I

[41:50 - 41:57]
mentioned before, I've never used

[41:51 - 41:58]
Daytona before, but I background

[41:57 - 42:01]
and if something looks outrageously

[41:58 - 42:05]
wrong, I can stop it. So, I see it, you

[42:01 - 42:08]
know, creating a sandbox in JavaScript.

[42:05 - 42:11]
I see it passing down some variables.

[42:08 - 42:14]
I see it starting the sandbox.

[42:11 - 42:16]
I see it testing if cloud code exists in

[42:14 - 42:18]
there. I see it trying to make a

[42:16 - 42:22]
directory for the generated app and then

[42:18 - 42:24]
I see it writing exactly the first thing

[42:22 - 42:26]
that we have written which is the first

[42:24 - 42:27]
thing we did was make it run write a

[42:26 - 42:30]
single piece of code that can generate

[42:27 - 42:32]
code so it actually copies that straight

[42:30 - 42:34]
into the sandbox and tries to execute it

[42:32 - 42:36]
which is what I see here and it's

[42:34 - 42:38]
starting to generate a welcome page yeah

[42:36 - 42:40]
so it basically creates a script that

[42:38 - 42:42]
says generate me a nextjs great

[42:40 - 42:44]
that says hello world and then it'll

[42:42 - 42:47]
generate it and then let's see Check

[42:44 - 42:49]
what was created. This is pretty good.

[42:47 - 42:52]
Would you like to proceed? Yes, let's

[42:49 - 42:54]
just do it. I want ideally it's doing

[42:52 - 42:56]
both of these because I do want I think

[42:54 - 42:57]
both approaches could work. And this is

[42:56 - 42:59]
another good thing. It came to me with

[42:57 - 43:02]
two things. Test the script directory.

[42:59 - 43:04]
Create the test Daytona integration

[43:02 - 43:06]
script. Run the test scripts to validate

[43:04 - 43:08]
Daytona verify. Great. Yeah, pretty

[43:06 - 43:09]
excited actually because this is getting

[43:08 - 43:10]
into like

[43:09 - 43:12]
this is really cool. This is getting

[43:10 - 43:14]
into like some like senior architect

[43:12 - 43:15]
like senior engineer like system design

[43:14 - 43:17]
architecting.

[43:15 - 43:17]
So did you want to try with cursor real

[43:17 - 43:20]
quick

[43:17 - 43:22]
the screenshot? Yeah. Let's give it this

[43:20 - 43:24]
copy. I just want to make sure that this

[43:22 - 43:28]
is actually the page that I wanted to

[43:24 - 43:30]
edit. Yeah. Handle generate. I want you

[43:28 - 43:35]
to

[43:30 - 43:38]
make this landing page look more like

[43:35 - 43:41]
Lovable's actual landing page. And so

[43:38 - 43:43]
let's just give it a real landing page.

[43:41 - 43:46]
I see that it is having difficulties

[43:43 - 43:48]
with Daytona. We could intervene here

[43:46 - 43:50]
and tell it to scope down even more. I

[43:48 - 43:51]
see it failed to start a sandbox. So we

[43:50 - 43:53]
could say, "Hey, I want you to just

[43:51 - 43:55]
focus on starting a sandbox." Should be

[43:53 - 43:58]
pretty easy. We'll see if it continues

[43:55 - 44:00]
to fail. You know, it said the test

[43:58 - 44:03]
failed. It sent three agents in parallel

[44:00 - 44:06]
to use a bunch of my money to go and

[44:03 - 44:09]
figure out the issue. And then now it's

[44:06 - 44:11]
removed my friendly comment. Fine,

[44:09 - 44:13]
whatever. And then it's adding some more

[44:11 - 44:15]
code. So great, it's finally getting

[44:13 - 44:18]
back to work after making me wait for a

[44:15 - 44:20]
good 5 minutes. Meanwhile, 03 has also

[44:18 - 44:22]
promised me that we have a better

[44:20 - 44:24]
landing page now. So I'm just going to

[44:22 - 44:27]
go accept all on here, close this thing

[44:24 - 44:28]
again, and then actually see if we do

[44:27 - 44:29]
have a better landing page. Where are

[44:28 - 44:30]
you, local host?

[44:29 - 44:33]
What the

[44:30 - 44:37]
Oh my god. First of all, this is a war

[44:33 - 44:41]
crime to have this emoji here.

[44:37 - 44:44]
Okay, thank you. Center thumb below the

[44:41 - 44:44]
text input.

[44:44 - 44:47]
Okay,

[44:45 - 44:51]
I like it. And then can you make the you

[44:47 - 44:52]
just make the other one tiny like 1x?

[44:51 - 44:54]
Which one?

[44:52 - 44:57]
Very small on the actual site. So it's

[44:54 - 45:00]
telling me that

[44:57 - 45:02]
time that the core functionality works

[45:00 - 45:09]
generated a sandbox with this.

[45:02 - 45:13]
So tell me how I can preview

[45:09 - 45:15]
the dev project inside the sandbox with

[45:13 - 45:19]
the ID.

[45:15 - 45:21]
Oh, not lovable. Sorry. With this ID.

[45:19 - 45:24]
Cool. And let's just accept all of 03's

[45:21 - 45:25]
changes again. be optimistic. Okay.

[45:24 - 45:28]
Like, yeah, it just needs to be like 10

[45:25 - 45:30]
times larger, but we Okay, we're getting

[45:28 - 45:32]
there. Good job. Lovable's design is

[45:30 - 45:34]
actually pretty nice. This is just very

[45:32 - 45:36]
depressing. But we got the gradient.

[45:34 - 45:38]
Actually, the gradient is the same. It's

[45:36 - 45:39]
just so small and there's just random

[45:38 - 45:43]
gradient here and here. It's trying to

[45:39 - 45:46]
run it and it is failing. But let's see.

[45:43 - 45:49]
So, it's telling me it worked, but I

[45:46 - 45:51]
have no way to confirm. And this is

[45:49 - 45:53]
apparently cloud code is telling us that

[45:51 - 45:55]
we have a bubble and inside of that

[45:53 - 45:57]
bubble we do have a next.js project. The

[45:55 - 45:59]
only thing is I can't view inside of

[45:57 - 46:01]
that bubble. And so now we're trying to

[45:59 - 46:03]
figure out how to view inside of that

[46:01 - 46:04]
bubble. So currently we're debugging a

[46:03 - 46:07]
lot of things about does the bubble

[46:04 - 46:09]
actually get spawned? Is there a nextjs

[46:07 - 46:11]
project in there? And how can I look at

[46:09 - 46:12]
that nextjs project? After we get that

[46:11 - 46:14]
sorted out, we're going to go back,

[46:12 - 46:16]
inject our agent again, which is

[46:14 - 46:19]
actually just cloud code SDK, and tell

[46:16 - 46:21]
it to build it what website we want.

[46:19 - 46:23]
And then after that, we're going to hook

[46:21 - 46:24]
it back up to our website. And then

[46:23 - 46:26]
we're going to have a website that

[46:24 - 46:28]
creates a bubble with cloud code inside

[46:26 - 46:30]
of it. And cloud code can go crazy and

[46:28 - 46:32]
code up our website. It will expose that

[46:30 - 46:34]
website so that people can see it from

[46:32 - 46:35]
the outside. And then we'll be able to

[46:34 - 46:36]
see the issue.

[46:35 - 46:36]
Amazing.

[46:36 - 46:39]
Oh, not the issue. The

[46:36 - 46:41]
Do you want to check your texts? I sent

[46:39 - 46:42]
you a gradient that you can use as the

[46:41 - 46:45]
background. I think it'll look really

[46:42 - 46:47]
good. Can you please make this image the

[46:45 - 46:49]
background of the web app that we've

[46:47 - 46:52]
created? This is going to be behind the

[46:49 - 46:54]
text input field. And then for the text

[46:52 - 46:56]
input field, keep it exactly the same. I

[46:54 - 46:58]
just want you to make it really dark,

[46:56 - 47:00]
like almost black, so that you can

[46:58 - 47:03]
hardly see through it. So this image

[47:00 - 47:06]
should be the background and then yeah,

[47:03 - 47:08]
make it darker behind the input field

[47:06 - 47:11]
with white text as you type.

[47:08 - 47:12]
Nice. So, we'll let 03 cook on that. But

[47:11 - 47:14]
let's get back to the main project. I

[47:12 - 47:15]
see it and this is an issue that it

[47:14 - 47:18]
continues to like to do where it tries

[47:15 - 47:20]
to run it, but obviously it's shell

[47:18 - 47:22]
inside of itself is, you know, like

[47:20 - 47:24]
doesn't live long. So, I'm going to tell

[47:22 - 47:27]
it to stop and I'm just going to run it

[47:24 - 47:30]
myself. And then, okay, it failed

[47:27 - 47:34]
because it cannot find it. So, where is

[47:30 - 47:36]
this npxtx scripts scripts? Where is the

[47:34 - 47:39]
script?

[47:36 - 47:42]
So I actually have to CD into lovable UI

[47:39 - 47:44]
and then run this. And so it's created a

[47:42 - 47:45]
sandbox. Okay, great. It's creating an

[47:44 - 47:48]
next.js project. Let's see if it

[47:45 - 47:50]
actually does that. And so I'm running

[47:48 - 47:53]
the script that Cloud Code wrote me to

[47:50 - 47:56]
see. We can look for public. Create

[47:53 - 48:01]
sandbox preview. I think it does have

[47:56 - 48:02]
public true. Yeah, it does. Create next

[48:01 - 48:05]
dayu.work.

[48:02 - 48:09]
So, I mean, this actually does look

[48:05 - 48:11]
pretty much like, let's see. This is

[48:09 - 48:15]
saying, and I'm going to use this as a

[48:11 - 48:18]
text input, but let's see. It's saying,

[48:15 - 48:21]
what is our sandbox ID? Important

[48:18 - 48:24]
sandbox ID is this thing. So, sandbox,

[48:21 - 48:27]
that doesn't look like a sandbox ID.

[48:24 - 48:30]
Sandbox ID. Okay, maybe it is. Is there

[48:27 - 48:33]
any way I can SSH into this sandbox? So

[48:30 - 48:36]
to do some more complicated debugging.

[48:33 - 48:39]
So we have a bubble now.

[48:36 - 48:41]
Okay. Okay. Okay. It does seem like we

[48:39 - 48:44]
are spinning up these bubbles. Inside of

[48:41 - 48:46]
the bubbles there do seem to be some

[48:44 - 48:48]
resemblance of a website. I'm not very

[48:46 - 48:50]
familiar with Nex.js. I guess we can see

[48:48 - 48:52]
the app and see like what's in here.

[48:50 - 48:53]
Okay. We have page.tsx.

[48:52 - 48:55]
Yeah.

[48:53 - 48:57]
Okay. Yeah. I think there is indeed a

[48:55 - 48:59]
website on the bubble inside of the

[48:57 - 49:00]
Daytona server. But the problem is we're

[48:59 - 49:02]
struggling peeking into it.

[49:00 - 49:05]
Yeah. Okay. So this is the sandbox

[49:02 - 49:08]
running. This is now

[49:05 - 49:10]
we want to peek into this bubble. So we

[49:08 - 49:13]
do have confirmation that there is you

[49:10 - 49:14]
know. Okay. I still can't open the

[49:13 - 49:17]
websites.

[49:14 - 49:21]
I am getting 503

[49:17 - 49:26]
service temp unavailable.

[49:21 - 49:32]
Can you do some deep research

[49:26 - 49:34]
on why this is the case? I am running

[49:32 - 49:38]
what script am I running? Test Daytona

[49:34 - 49:41]
simple. Daytona simple.

[49:38 - 49:43]
I noticed that

[49:41 - 49:46]
inside what did I notice? I noticed this

[49:43 - 49:50]
the sandbox ID seems to be different

[49:46 - 49:53]
from the ones we are getting. For

[49:50 - 49:57]
example, on this website, the sandbox

[49:53 - 50:02]
says that this is the ID which the ID

[49:57 - 50:08]
seems to be something like this from the

[50:02 - 50:10]
docs. But we are getting UYU ids like

[50:08 - 50:13]
what am I getting? I'm getting something

[50:10 - 50:14]
like this. Oh, wait. Yeah.

[50:13 - 50:19]
So, yeah, that was an observation I

[50:14 - 50:22]
made. Please search the web think. Oh,

[50:19 - 50:24]
yeah. Cloud code has specific reserved

[50:22 - 50:26]
key terms for how hard you want it to

[50:24 - 50:28]
think. I'm pretty sure the the highest

[50:26 - 50:29]
level of thinking is literally ultra

[50:28 - 50:32]
think. I don't know. Maybe they were

[50:29 - 50:35]
just like having fun. I'm pretty sure

[50:32 - 50:37]
clad code ultra think. Yeah. Yeah. It's

[50:35 - 50:39]
actually like the way to tell it to use

[50:37 - 50:39]
the most juice. So, I'm just going to

[50:39 - 50:40]
tell

[50:39 - 50:42]
So, this be $10.

[50:40 - 50:45]
Yeah. Basically, it'll just use

[50:42 - 50:47]
as much tokens as it can possibly use

[50:45 - 50:50]
basically and try to figure out the

[50:47 - 50:51]
issue. So, if Daytona's documentation is

[50:50 - 50:54]
right,

[50:51 - 50:56]
this indeed should be something that

[50:54 - 50:58]
gives us a URL that we should be able to

[50:56 - 50:59]
see inside the bubble. So, we were able

[50:58 - 51:02]
to confirm that a bubble was created,

[50:59 - 51:03]
code was being written there, but we

[51:02 - 51:06]
can't see inside the bubble. And that

[51:03 - 51:08]
was because cloud code did not read

[51:06 - 51:09]
enough documentation just like the

[51:08 - 51:10]
average engineer.

[51:09 - 51:13]
Right. Right. Right. Right. Right.

[51:10 - 51:15]
So I had to read some documentation

[51:13 - 51:18]
myself and I found out that

[51:15 - 51:20]
it's not using the preview link.

[51:18 - 51:23]
It is not using get preview link which

[51:20 - 51:26]
conveniently returns to you a URL and

[51:23 - 51:29]
the token to access it. Let's run that

[51:26 - 51:30]
test preview URLs. Okay. Now it likes to

[51:29 - 51:33]
break things down. It broke itself down

[51:30 - 51:34]
into smaller tests. So now it's creating

[51:33 - 51:37]
another test to test if this previewed

[51:34 - 51:40]
URL thing works as it promises.

[51:37 - 51:43]
Right. But once again, it's running this

[51:40 - 51:46]
thing inside of the bash of itself. I'm

[51:43 - 51:49]
gonna run the script myself.

[51:46 - 51:50]
Creating sandbox creating next.js app.

[51:49 - 51:52]
Okay.

[51:50 - 51:53]
Then let's just read what the script

[51:52 - 51:55]
does.

[51:53 - 51:56]
So now we created another bubble. The

[51:55 - 51:58]
sandbox is the bubble that we were

[51:56 - 52:00]
talking about, the isolated environment.

[51:58 - 52:03]
And then we're going to have it create

[52:00 - 52:04]
me a next.js app inside of the app.

[52:03 - 52:06]
It's going to go and create a custom

[52:04 - 52:07]
page at preview. It's going to install

[52:06 - 52:09]
dependencies. And then it's going to

[52:07 - 52:10]
start the dev server, which is what

[52:09 - 52:11]
we're trying to peek into,

[52:10 - 52:12]
right?

[52:11 - 52:12]
Amazing.

[52:12 - 52:14]
So um

[52:12 - 52:15]
and then we'll get the preview link to

[52:14 - 52:15]
that server.

[52:15 - 52:16]
Yes.

[52:15 - 52:18]
And that's what we'll be able to see.

[52:16 - 52:20]
And ideally, we could render that in the

[52:18 - 52:21]
site itself in the front end of the

[52:20 - 52:22]
lovable site.

[52:21 - 52:23]
Yes.

[52:22 - 52:25]
Okay. Amazing. And that's probably like

[52:23 - 52:26]
something similar to what how they do

[52:25 - 52:28]
it.

[52:26 - 52:30]
I mean, I don't know how they do it, but

[52:28 - 52:30]
Oh, it's here.

[52:30 - 52:32]
No,

[52:30 - 52:34]
this is the website. Hey.

[52:32 - 52:38]
And so they're telling me that this dash

[52:34 - 52:39]
preview is a website that it built.

[52:38 - 52:40]
Preview works.

[52:39 - 52:43]
Let's go.

[52:40 - 52:45]
Okay. So now we can finally look into

[52:43 - 52:48]
the sandbox. So we have all of our

[52:45 - 52:50]
pieces together. Now we have a way to

[52:48 - 52:52]
create bubbles on someone else's cloud.

[52:50 - 52:54]
We have a way to

[52:52 - 52:57]
write code inside of that cloud. And we

[52:54 - 52:59]
have a way to trigger it through our

[52:57 - 53:03]
website. So let's just ask cloud code to

[52:59 - 53:06]
put it all together. And so we have

[53:03 - 53:09]
great this one did indeed work. So we're

[53:06 - 53:12]
just going to go ahead and say

[53:09 - 53:14]
wonderful job.

[53:12 - 53:16]
You sounded white when you said that.

[53:14 - 53:18]
Wonderful job. Sorry.

[53:16 - 53:22]
Wonderful job. No, it did a great job.

[53:18 - 53:24]
Wonderful job, Claude. We now can

[53:22 - 53:27]
successfully

[53:24 - 53:30]
look at the NextJS

[53:27 - 53:34]
project. And so actually, hold on. Okay.

[53:30 - 53:36]
Well, anyways, so to reiterate what just

[53:34 - 53:38]
happened, we finally were able to peek

[53:36 - 53:39]
into the sandboxes, which is the bubbles

[53:38 - 53:40]
that we were talking about this whole

[53:39 - 53:41]
time.

[53:40 - 53:43]
And you blamed Atono when it was

[53:41 - 53:44]
probably Cloud Code's fault, maybe.

[53:43 - 53:46]
Yeah. Yeah. Yeah, it was probably Claude

[53:44 - 53:48]
Code's fault. Daytona actually had

[53:46 - 53:49]
decent documentation. I found it pretty

[53:48 - 53:51]
quick. There was a function that Claude

[53:49 - 53:53]
Code refused to use, probably because it

[53:51 - 53:55]
did not find the right thing to read.

[53:53 - 53:57]
So, once again, that's, you know, a

[53:55 - 53:59]
context management mistake on my end to

[53:57 - 54:01]
be honest. So, we found that though. We

[53:59 - 54:03]
did some digging. We gave Claude the

[54:01 - 54:06]
context and it fixed it immediately with

[54:03 - 54:08]
the last script that it ran which was

[54:06 - 54:11]
what was the script? Oops. The script

[54:08 - 54:14]
was mpxtscripts.

[54:11 - 54:17]
Preview. So I'm going to I'm currently

[54:14 - 54:19]
updating the markdown of cloud.md.

[54:17 - 54:22]
Remember this is the kind of memory that

[54:19 - 54:25]
it has attached to every prompt that it

[54:22 - 54:26]
kind of gives it like structure. And

[54:25 - 54:28]
this is, you know, how earlier we were

[54:26 - 54:32]
mentioning how it's good to give the

[54:28 - 54:33]
agent like a picture of the final output

[54:32 - 54:35]
and kind of like what has happened so

[54:33 - 54:37]
far. This is kind of like a conversation

[54:35 - 54:39]
history. I'm updating it a little bit so

[54:37 - 54:41]
that we can type less every time we

[54:39 - 54:43]
submit a prompt. So I said, you know,

[54:41 - 54:45]
the goal is to make a lovable clone. We

[54:43 - 54:47]
want to use cloud code SDK. We have a

[54:45 - 54:48]
website that takes in a prompt. It uses

[54:47 - 54:50]
cloud code SDK to write code, but

[54:48 - 54:52]
currently it modifies the website by

[54:50 - 54:55]
adding it as a page. We want to make

[54:52 - 54:57]
this happen in an isolated environment.

[54:55 - 54:59]
So now we have created a way to create

[54:57 - 55:01]
sandboxes which is the bubble using

[54:59 - 55:04]
Daytona to preview them and preview

[55:01 - 55:05]
them. Get preview what is it called? Get

[55:04 - 55:06]
preview.

[55:05 - 55:10]
You have it on your clipboard too.

[55:06 - 55:14]
Yeah. Using the get preview link

[55:10 - 55:17]
function. The script confirms this.

[55:14 - 55:19]
Okay. So this is our progress so far.

[55:17 - 55:21]
I'm going to save it to its memory. I'm

[55:19 - 55:24]
going to go back to good old cloud code

[55:21 - 55:26]
and I'm going to say wonderful job. We

[55:24 - 55:28]
now have a successful We can now

[55:26 - 55:32]
successfully look at the next.js

[55:28 - 55:35]
project. It does have a preview page.

[55:32 - 55:39]
Scripts.js worked perfectly. Oh yeah,

[55:35 - 55:41]
and this is another thing we kept on

[55:39 - 55:44]
noticing that it tries to run the script

[55:41 - 55:49]
but it can't like do anything. So don't

[55:44 - 55:53]
try to run the script with your own bash

[55:49 - 55:55]
tool. Write the scripts

[55:53 - 55:58]
going forward. And this is probably like

[55:55 - 56:00]
project like let's see like what is this

[55:58 - 56:02]
preferences.

[56:00 - 56:05]
Don't try to run the script on your own

[56:02 - 56:10]
pouch. Write the script and tell me how

[56:05 - 56:14]
to execute it asking me for its outputs

[56:10 - 56:18]
instead. So let's just leave that there.

[56:14 - 56:22]
It does have a preview page scripts. The

[56:18 - 56:26]
script worked perfectly. Now I want you

[56:22 - 56:32]
to go back and make it such

[56:26 - 56:36]
that I can create a Daytona sandbox and

[56:32 - 56:41]
using cloud code SDK

[56:36 - 56:45]
build a custom website based on a prompt

[56:41 - 56:50]
that I pass in this. Let's keep this as

[56:45 - 56:54]
a script for now, but we will implement

[56:50 - 56:56]
it into our website as soon as we

[56:54 - 56:57]
confirm that it works.

[56:56 - 56:58]
Amazing.

[56:57 - 57:01]
Great. It's created a script that

[56:58 - 57:04]
creates a Daytona sandbox, installs

[57:01 - 57:06]
Cloud Code, generates a website,

[57:04 - 57:10]
installs the dependencies, and gives me

[57:06 - 57:12]
the preview link. That sounds perfect.

[57:10 - 57:14]
That supports Markdown support and dark

[57:12 - 57:16]
theme. You know, that's a great idea.

[57:14 - 57:18]
Let's just do this

[57:16 - 57:20]
basic usage. And then notice that it

[57:18 - 57:22]
wants me I told it that I want to run

[57:20 - 57:23]
the script myself. So, it gave me some

[57:22 - 57:25]
options to run the script. And that's a

[57:23 - 57:27]
great idea. Thank you Claude Code for

[57:25 - 57:28]
that. I will go ahead and do that.

[57:27 - 57:30]
Okay.

[57:28 - 57:32]
Create a blog website with markdown

[57:30 - 57:35]
support and a dark command is required.

[57:32 - 57:38]
Let's see. Cloud code running cloud code

[57:35 - 57:41]
command is required. Sandbox is still

[57:38 - 57:45]
running for debugging. This is going to

[57:41 - 57:47]
be a hassle to debug because oops.

[57:45 - 57:50]
Wait, is that permissions issue or no?

[57:47 - 57:52]
So, we don't know cuz this is uh the

[57:50 - 57:55]
only error that is thrown command is

[57:52 - 57:58]
required. We can go ahead and run this.

[57:55 - 58:02]
I have a good feeling that we can get

[57:58 - 58:08]
through this though. So I tried to run

[58:02 - 58:13]
the script asking it to build me a what

[58:08 - 58:16]
did I ask it to build? Uh blog website.

[58:13 - 58:22]
This is the output.

[58:16 - 58:25]
How can we debug the issue? Remember the

[58:22 - 58:30]
sandbox which is the bubble is still

[58:25 - 58:31]
alive and I can SSH into it with a

[58:30 - 58:34]
terminal.

[58:31 - 58:37]
Oops, pasted that in. Okay, so now it

[58:34 - 58:39]
has the error. It will either give me

[58:37 - 58:41]
directions to debug or it will try and

[58:39 - 58:43]
solve the issue. So the error is command

[58:41 - 58:45]
is required suggest there's an issue

[58:43 - 58:47]
with how we're executing the command.

[58:45 - 58:50]
Let me do a debugging script. Okay, I

[58:47 - 58:52]
think I know the issue. Once again, I

[58:50 - 58:55]
might have to pass down this to claude

[58:52 - 58:56]
code. Let's actually just tell it.

[58:55 - 59:00]
I don't think you

[58:56 - 59:04]
need to debugging script first. I want

[59:00 - 59:08]
you to read this documentation and make

[59:04 - 59:10]
sure you are using Daytona properly. And

[59:08 - 59:14]
so this is actually a common issue with

[59:10 - 59:17]
the fact that the LLM can browse the

[59:14 - 59:20]
web. But since Daytona and all these new

[59:17 - 59:23]
companies are writing things that are

[59:20 - 59:25]
often changing and since they're so new,

[59:23 - 59:27]
you know, Daytona,

[59:25 - 59:29]
if they don't follow strict industry

[59:27 - 59:32]
standards or like whatever the training

[59:29 - 59:34]
data that cloud code is on, it might

[59:32 - 59:37]
have like enthropic or cloud code might

[59:34 - 59:39]
default to like what it thinks is right

[59:37 - 59:41]
oftent times. and just go back to like

[59:39 - 59:43]
writing broken code because it thinks

[59:41 - 59:46]
that's what it should look like and

[59:43 - 59:48]
Daytona is not following that or

[59:46 - 59:50]
something. So yeah, we found the issue

[59:48 - 59:52]
already. We our hypothesis was correct.

[59:50 - 59:55]
It was not doing execute command

[59:52 - 59:56]
properly which makes sense because our

[59:55 - 59:58]
error was actually something like

[59:56 - 01:00:00]
command is required. So hopefully this

[59:58 - 01:00:03]
will fix it and we can run this again.

[01:00:00 - 01:00:05]
We can check on the design now. accept

[01:00:03 - 01:00:09]
these changes instantly.

[01:00:05 - 01:00:14]
And drum roll, please. Oh. Oh, god.

[01:00:09 - 01:00:16]
Nope. 404 gradient.png. Can you please

[01:00:14 - 01:00:20]
Let's see if it's telling me to do

[01:00:16 - 01:00:23]
anything. Do I need to restart you?

[01:00:20 - 01:00:24]
No. No. No. Because serves everything in

[01:00:23 - 01:00:26]
public. The background should not

[01:00:24 - 01:00:28]
automatically load once it's there.

[01:00:26 - 01:00:31]
Create a public folder. Okay. It doesn't

[01:00:28 - 01:00:33]
exist already. Drop the provided image.

[01:00:31 - 01:00:37]
Okay. So, it's telling me to create a

[01:00:33 - 01:00:40]
public folder in here. New folder.

[01:00:37 - 01:00:42]
Public. And then move this into here.

[01:00:40 - 01:00:46]
Okay.

[01:00:42 - 01:00:50]
Now, will you work? No. Okay. At drop

[01:00:46 - 01:00:51]
the provided image because the next js

[01:00:50 - 01:00:52]
serves everything in public on the site

[01:00:51 - 01:00:54]
folder, the background will now load

[01:00:52 - 01:00:56]
automatically.

[01:00:54 - 01:00:56]
It's not.

[01:00:56 - 01:01:00]
Oh,

[01:00:56 - 01:01:02]
it is not. Oh, wait. Gradient is in

[01:01:00 - 01:01:06]
public. Yeah.

[01:01:02 - 01:01:11]
I still don't see it. Slashpublic at

[01:01:06 - 01:01:12]
slashpublic. I put the image in.

[01:01:11 - 01:01:13]
Yeah. Yeah, I really don't see it. Okay,

[01:01:12 - 01:01:15]
let's see.

[01:01:13 - 01:01:16]
Maybe the gradient design is over the

[01:01:15 - 01:01:17]
image.

[01:01:16 - 01:01:19]
Oh yeah.

[01:01:17 - 01:01:22]
I'm not sure. Maybe that is a good idea.

[01:01:19 - 01:01:25]
But back to this exciting thing. It says

[01:01:22 - 01:01:27]
that the air messages will be more

[01:01:25 - 01:01:29]
explicit. Great. Cloud code installation

[01:01:27 - 01:01:33]
before running. Great. And then it will

[01:01:29 - 01:01:34]
run. So let's try to run this thing

[01:01:33 - 01:01:35]
again. Let's go.

[01:01:34 - 01:01:37]
Come on.

[01:01:35 - 01:01:39]
Yeah. Come on. Come on.

[01:01:37 - 01:01:43]
So ideally, oh website generation

[01:01:39 - 01:01:45]
failed. Cannot find package import from.

[01:01:43 - 01:01:47]
Okay. So that means let's see. It says

[01:01:45 - 01:01:50]
running cloud code to generate but it

[01:01:47 - 01:01:53]
says installing cloud code SDK. Let's

[01:01:50 - 01:01:56]
see exactly how it is installing cloud

[01:01:53 - 01:01:58]
code SDK because something is definitely

[01:01:56 - 01:02:01]
not installed properly. Generate website

[01:01:58 - 01:02:03]
simple and generate website in sandbox.

[01:02:01 - 01:02:05]
Which one am I running? Generate website

[01:02:03 - 01:02:07]
in sandbox

[01:02:05 - 01:02:09]
undefined. It definitely failed to

[01:02:07 - 01:02:11]
install this somehow.

[01:02:09 - 01:02:12]
Install

[01:02:11 - 01:02:13]
cloud code.

[01:02:12 - 01:02:13]
Yeah.

[01:02:13 - 01:02:16]
Interesting.

[01:02:13 - 01:02:18]
So let's see. This is one way we can

[01:02:16 - 01:02:21]
debug this quite simply by going into

[01:02:18 - 01:02:25]
here. Oops. I mean I guess Okay. Let's

[01:02:21 - 01:02:28]
see. Sandbox ID is this one. We can go

[01:02:25 - 01:02:30]
ahead actually and go into Daytona.

[01:02:28 - 01:02:34]
Sandbox started with F9, right? Nope.

[01:02:30 - 01:02:36]
F5. So, we can just go connect here and

[01:02:34 - 01:02:38]
we can see what happens when we try to

[01:02:36 - 01:02:40]
run the command that failed, which is

[01:02:38 - 01:02:43]
sandbox.

[01:02:40 - 01:02:45]
Oops. No, it's going to be here. Let's

[01:02:43 - 01:02:46]
see if this works. Okay, I'm on the

[01:02:45 - 01:02:49]
sandbox. I'm in the bubble right now. I

[01:02:46 - 01:02:51]
only have a terminal. And I'm gonna go

[01:02:49 - 01:02:53]
ahead and feed cloud code some more

[01:02:51 - 01:02:55]
context on what exists inside of the

[01:02:53 - 01:02:56]
bubble to helpfully help it debug what

[01:02:55 - 01:02:57]
is going on.

[01:02:56 - 01:02:59]
Amazing.

[01:02:57 - 01:03:01]
Okay, I'm just gonna go and take all

[01:02:59 - 01:03:05]
this stuff and give it the cloud code as

[01:03:01 - 01:03:09]
well. This is the error. It seems like

[01:03:05 - 01:03:13]
cloud code is not being imported or

[01:03:09 - 01:03:18]
downloaded properly. I also sshed into

[01:03:13 - 01:03:23]
the sandbox and did some snooping.

[01:03:18 - 01:03:25]
This is some more context to help you

[01:03:23 - 01:03:27]
debug. So, this is telling cloud code

[01:03:25 - 01:03:29]
that there's more information available.

[01:03:27 - 01:03:31]
It got a little further, right?

[01:03:29 - 01:03:34]
Uh, no. I still think it's the same

[01:03:31 - 01:03:36]
cloud code. Okay. No, no, no. We now

[01:03:34 - 01:03:39]
have cloud code process exited. So, we

[01:03:36 - 01:03:42]
have cloud code now. I think this might

[01:03:39 - 01:03:44]
be because it's sandbox is blocking out

[01:03:42 - 01:03:48]
perhaps. I think there's something we

[01:03:44 - 01:03:52]
can do to debug this. How do can I

[01:03:48 - 01:03:54]
easily check if a sandbox has access to

[01:03:52 - 01:03:57]
the internet? Well, I can just ping

[01:03:54 - 01:03:59]
Google. Oh, no. It does have internet

[01:03:57 - 01:04:01]
access. Okay. So, my initial thought was

[01:03:59 - 01:04:02]
that maybe the bubble doesn't have

[01:04:01 - 01:04:04]
internet access. It needs internet

[01:04:02 - 01:04:07]
access if you want to run cloud code.

[01:04:04 - 01:04:11]
You ping Google and it does have access.

[01:04:07 - 01:04:11]
Yeah, I can also ping api.anthropic.com

[01:04:11 - 01:04:14]
and see if this one Yeah, this one is

[01:04:13 - 01:04:16]
getting a response.

[01:04:14 - 01:04:16]
What does ping? Ping means just like

[01:04:16 - 01:04:18]
check if it's

[01:04:16 - 01:04:20]
Yeah, it just pokes the website and sees

[01:04:18 - 01:04:24]
if it like gets a response. Cloud code

[01:04:20 - 01:04:28]
exited with bear one and let's see.

[01:04:24 - 01:04:31]
Nope. Wow. I now so this is the drawback

[01:04:28 - 01:04:34]
of getting AI to do everything for you.

[01:04:31 - 01:04:36]
I have no idea what is wrong or I can

[01:04:34 - 01:04:37]
only like believe that

[01:04:36 - 01:04:39]
only context manage.

[01:04:37 - 01:04:42]
I can't create my own context. I told it

[01:04:39 - 01:04:44]
look use the right documentation and

[01:04:42 - 01:04:46]
it's reading the web again. So hopefully

[01:04:44 - 01:04:49]
this time it'll figure something out

[01:04:46 - 01:04:51]
that actually works and we can have

[01:04:49 - 01:04:53]
lovable clone. Cloud code has actually

[01:04:51 - 01:04:55]
used 70% of its context. I'm going to go

[01:04:53 - 01:04:59]
ahead and compact this since I don't

[01:04:55 - 01:05:02]
care about the specifics because if you

[01:04:59 - 01:05:05]
remember we are trying to create a proof

[01:05:02 - 01:05:09]
of concept script that uses Daytona to

[01:05:05 - 01:05:11]
spin up an isolated environment where we

[01:05:09 - 01:05:13]
want to run cloud code to create a

[01:05:11 - 01:05:15]
next.js website.

[01:05:13 - 01:05:17]
So this is a broadstroke. Currently

[01:05:15 - 01:05:20]
we've been failing and a lot of the time

[01:05:17 - 01:05:22]
is because we are not implementing code

[01:05:20 - 01:05:26]
execution

[01:05:22 - 01:05:28]
properly inside the sandbox properly

[01:05:26 - 01:05:30]
with Daytona's

[01:05:28 - 01:05:32]
SDK.

[01:05:30 - 01:05:35]
Let's create another script. But going

[01:05:32 - 01:05:38]
forward, I want you to

[01:05:35 - 01:05:41]
create the script inside of Daytona and

[01:05:38 - 01:05:44]
I want you to execute it. And I also

[01:05:41 - 01:05:48]
want you to

[01:05:44 - 01:05:52]
install and log if you installed it by

[01:05:48 - 01:05:55]
checking using ls in terms of where it

[01:05:52 - 01:05:57]
should be installed and do not install

[01:05:55 - 01:05:59]
dependencies globally.

[01:05:57 - 01:06:02]
Also, I want the script to be able to

[01:05:59 - 01:06:04]
take in a sandbox ID. So, if it's

[01:06:02 - 01:06:06]
already spinning up a sandbox that

[01:06:04 - 01:06:09]
exists, don't create a new one. Just use

[01:06:06 - 01:06:11]
the sandbox that we already have. And so

[01:06:09 - 01:06:14]
I'm going to go ahead and once again

[01:06:11 - 01:06:16]
feed it some Daytona Docs process

[01:06:14 - 01:06:18]
execution. Running commands. Yeah,

[01:06:16 - 01:06:21]
running commands and code execution.

[01:06:18 - 01:06:23]
Let's see. Run code.

[01:06:21 - 01:06:26]
Run commands.

[01:06:23 - 01:06:29]
I am going to feed it these docs. And

[01:06:26 - 01:06:31]
I'm going to say

[01:06:29 - 01:06:34]
I want you to actually create the file

[01:06:31 - 01:06:38]
inside of Daytona

[01:06:34 - 01:06:41]
and not just pass in the whole JS as

[01:06:38 - 01:06:43]
code to execute.

[01:06:41 - 01:06:45]
Okay, let's see if this would be a bit

[01:06:43 - 01:06:48]
better. So now I'm just going to try

[01:06:45 - 01:06:50]
again and I want you to make what's a

[01:06:48 - 01:06:54]
good website idea? website idea. Please

[01:06:50 - 01:06:58]
make a site that lets me upload an image

[01:06:54 - 01:06:59]
and I can resize it or crop it by

[01:06:58 - 01:07:01]
adjusting a slider or some [ __ ]

[01:06:59 - 01:07:03]
Let's do it. Make me a site that lets me

[01:07:01 - 01:07:07]
upload an image and allows me to resize

[01:07:03 - 01:07:09]
it. And so great. Currently, we have a

[01:07:07 - 01:07:11]
script that

[01:07:09 - 01:07:13]
runs generate website. And now it's

[01:07:11 - 01:07:15]
going to try to generate that website.

[01:07:13 - 01:07:16]
So this is super exciting. Once we

[01:07:15 - 01:07:18]
confirm that this works, we're just

[01:07:16 - 01:07:20]
going to hook it up so that our lovable

[01:07:18 - 01:07:21]
clone website runs. This

[01:07:20 - 01:07:23]
will look like Lovable.

[01:07:21 - 01:07:24]
Yeah. Yeah. Where's our Lovable website

[01:07:23 - 01:07:27]
clone? We haven't seen this in a while.

[01:07:24 - 01:07:28]
This bad boy that we spent two hours on.

[01:07:27 - 01:07:29]
We're good, dude. We're hitting the home

[01:07:28 - 01:07:32]
stretch here.

[01:07:29 - 01:07:37]
That's I currently don't see the

[01:07:32 - 01:07:42]
background image. I think this might be

[01:07:37 - 01:07:44]
because you are covering it with other

[01:07:42 - 01:07:45]
stuff. the image is replacing that other

[01:07:44 - 01:07:49]
stuff.

[01:07:45 - 01:07:52]
Yeah. Make sure that the image is shown

[01:07:49 - 01:07:54]
and nothing is on top of

[01:07:52 - 01:07:56]
besides the UI of the

[01:07:54 - 01:07:57]
beside

[01:07:56 - 01:08:01]
the text input field, right?

[01:07:57 - 01:08:01]
The text input field.

[01:08:01 - 01:08:06]
Amazing. Okay. Great. And this thing

[01:08:03 - 01:08:09]
also just finished generating a website.

[01:08:06 - 01:08:10]
And so now it's creating some link here.

[01:08:09 - 01:08:11]
Ideally.

[01:08:10 - 01:08:11]
Yeah. Yeah. Yeah.

[01:08:11 - 01:08:13]
Amazing.

[01:08:11 - 01:08:16]
Ideally, ideally. Yeah, installing

[01:08:13 - 01:08:16]
dependencies. After that, it should spit

[01:08:16 - 01:08:18]
out a link.

[01:08:16 - 01:08:19]
This is crazy, bro. This is actually

[01:08:18 - 01:08:21]
insane.

[01:08:19 - 01:08:23]
Oh, man. Once again, I think it's caught

[01:08:21 - 01:08:26]
on the server, so it never fixed the

[01:08:23 - 01:08:28]
issue. But we do conveniently have a

[01:08:26 - 01:08:31]
script to just solve that issue right

[01:08:28 - 01:08:32]
here. Oh, no. No, it did. Amazing.

[01:08:31 - 01:08:33]
Let's go.

[01:08:32 - 01:08:33]
Good job.

[01:08:33 - 01:08:34]
All right.

[01:08:33 - 01:08:36]
So, now this is

[01:08:34 - 01:08:39]
No way. Let's go. Let's go.

[01:08:36 - 01:08:40]
We can go and resize this image.

[01:08:39 - 01:08:43]
So, you can gradient.

[01:08:40 - 01:08:44]
Oh my god. It just works.

[01:08:43 - 01:08:45]
Wait, wait, wait. What happened?

[01:08:44 - 01:08:47]
I'm resizing the image.

[01:08:45 - 01:08:50]
Oh, I see. I see. I see. Let's go.

[01:08:47 - 01:08:52]
Oh, okay. I can make this like I don't

[01:08:50 - 01:08:53]
know like what was the original image

[01:08:52 - 01:08:54]
size? But yeah, no, we have an image

[01:08:53 - 01:08:57]
resizer website now.

[01:08:54 - 01:08:58]
Let's go. Let's go. Okay. So, now the

[01:08:57 - 01:09:00]
main functionality works. We just need

[01:08:58 - 01:09:00]
to put it on our app.

[01:09:00 - 01:09:02]
Yeah.

[01:09:00 - 01:09:03]
Go see if the styling worked.

[01:09:02 - 01:09:05]
Local host.

[01:09:03 - 01:09:06]
Oh, yeah. Yeah. Yeah. Okay. True. Let's

[01:09:05 - 01:09:07]
try this thing.

[01:09:06 - 01:09:09]
Accept. Right.

[01:09:07 - 01:09:10]
Let's see. Switch the background div to

[01:09:09 - 01:09:12]
be in line. Yeah. the only element

[01:09:10 - 01:09:14]
layered above. Do I need to accept you

[01:09:12 - 01:09:16]
or anything?

[01:09:14 - 01:09:18]
Maybe. Cool.

[01:09:16 - 01:09:21]
Ain't no way. That's our website.

[01:09:18 - 01:09:21]
No, it's not. Oh, that's ours. Let's go.

[01:09:21 - 01:09:22]
Okay.

[01:09:21 - 01:09:23]
Yeah, it is.

[01:09:22 - 01:09:25]
All right. All right. All right. Can you

[01:09:23 - 01:09:26]
Can we Let's do one more styling prompt.

[01:09:25 - 01:09:27]
We need to get rid of that weird thing

[01:09:26 - 01:09:28]
on the left there.

[01:09:27 - 01:09:29]
What? This thing? This?

[01:09:28 - 01:09:29]
Yeah, that thing's nasty. Just get rid

[01:09:29 - 01:09:31]
of it.

[01:09:29 - 01:09:35]
The public

[01:09:31 - 01:09:36]
plus and public button on the left of

[01:09:35 - 01:09:39]
the text input.

[01:09:36 - 01:09:41]
Yeah. And then make the background of

[01:09:39 - 01:09:42]
the text input black. Just make it fully

[01:09:41 - 01:09:46]
black.

[01:09:42 - 01:09:48]
Make the text input

[01:09:46 - 01:09:49]
background fully black.

[01:09:48 - 01:09:52]
Yeah,

[01:09:49 - 01:09:53]
like opacity zero. I mean like what?

[01:09:52 - 01:09:55]
Opacity.

[01:09:53 - 01:09:58]
Go switch. Open up lovable. It's down

[01:09:55 - 01:09:59]
below. Bro, ours looks better. Oh, they

[01:09:58 - 01:10:00]
have the like the nice typing. That's

[01:09:59 - 01:10:03]
okay. We don't need to edit that now.

[01:10:00 - 01:10:03]
But like all right, come on, son. Yeah,

[01:10:03 - 01:10:06]
this is

[01:10:03 - 01:10:07]
and you asked Claude to connect it to

[01:10:06 - 01:10:08]
the front end. So like in theory it

[01:10:07 - 01:10:10]
might work, right?

[01:10:08 - 01:10:14]
I've not asked it to the front end yet.

[01:10:10 - 01:10:18]
So let's go and see that this script was

[01:10:14 - 01:10:20]
generate in Daytona.ts. So now we have a

[01:10:18 - 01:10:23]
script which is the piece of code that

[01:10:20 - 01:10:26]
we can run that spins up an isolated

[01:10:23 - 01:10:29]
sandbox, isolated environment or sandbox

[01:10:26 - 01:10:30]
or bubble whatever we want to call it.

[01:10:29 - 01:10:33]
And then inside of that bubble, cloud

[01:10:30 - 01:10:36]
code SDK will go and create a Nex.js

[01:10:33 - 01:10:38]
website. And then that website we can

[01:10:36 - 01:10:42]
peek at using the link that we get from

[01:10:38 - 01:10:43]
here. Preview URL. Great. This script is

[01:10:42 - 01:10:45]
working great. As you can see, if we

[01:10:43 - 01:10:48]
open the script, we actually have the

[01:10:45 - 01:10:49]
image resizer that works. We can give it

[01:10:48 - 01:10:51]
like

[01:10:49 - 01:10:52]
a graphic. It's a little ugly, but it's

[01:10:51 - 01:10:53]
an MVP.

[01:10:52 - 01:10:55]
We just wanted something to work.

[01:10:53 - 01:10:57]
We have something working now. We have

[01:10:55 - 01:11:00]
this script. Now we can go back to clot

[01:10:57 - 01:11:04]
and we can say great job.

[01:11:00 - 01:11:10]
This script successfully

[01:11:04 - 01:11:16]
ran a function that generated a nextjs

[01:11:10 - 01:11:19]
website and returned the preview URL

[01:11:16 - 01:11:22]
after starting the dev server. I want

[01:11:19 - 01:11:25]
you to make the button,

[01:11:22 - 01:11:31]
make the text input,

[01:11:25 - 01:11:35]
submit the prompt, and hook it up to our

[01:11:31 - 01:11:38]
lovable clone. After the generation is

[01:11:35 - 01:11:42]
complete, I want you to

[01:11:38 - 01:11:44]
display the preview URL.

[01:11:42 - 01:11:45]
Wait, shouldn't we specify where? Or

[01:11:44 - 01:11:47]
actually, it doesn't matter. We can

[01:11:45 - 01:11:49]
resize it later. We can just say like

[01:11:47 - 01:11:50]
open the preview URL for now and then we

[01:11:49 - 01:11:52]
can

[01:11:50 - 01:11:53]
Okay. And then we can further later.

[01:11:52 - 01:11:54]
Yeah, we can definitely try to do that

[01:11:53 - 01:11:56]
too.

[01:11:54 - 01:11:58]
Now let's update the front end to use

[01:11:56 - 01:12:01]
the new API to handle the preview URL.

[01:11:58 - 01:12:04]
Great. Now let's update the page to use

[01:12:01 - 01:12:07]
the new Daytona API to handle it. Okay,

[01:12:04 - 01:12:09]
great. So cool. I'm super excited. This

[01:12:07 - 01:12:11]
is honestly a pretty challenging task.

[01:12:09 - 01:12:13]
Cloud code did stumble along the way. I

[01:12:11 - 01:12:15]
think there's a lot of factors that went

[01:12:13 - 01:12:18]
into it. We did manage to course correct

[01:12:15 - 01:12:23]
it. But Daytona is super new technology.

[01:12:18 - 01:12:25]
Test the full integration. No, stop.

[01:12:23 - 01:12:28]
I'mma just stop it. Don't test that. I

[01:12:25 - 01:12:30]
want to test it myself. Okay. So, this

[01:12:28 - 01:12:30]
is the real lovable. This is our

[01:12:30 - 01:12:32]
lovable.

[01:12:30 - 01:12:34]
Wait, so it's ready to test?

[01:12:32 - 01:12:35]
Yeah. Yeah. Make me a blog. Make me a

[01:12:34 - 01:12:37]
modern blog website that supports

[01:12:35 - 01:12:38]
markdown support.

[01:12:37 - 01:12:41]
Oh wow.

[01:12:38 - 01:12:42]
Let's go. Let's go. Okay. All right. All

[01:12:41 - 01:12:45]
right. Let's go.

[01:12:42 - 01:12:48]
Please. It's verifying. It's generation

[01:12:45 - 01:12:51]
script. Generation script verified.

[01:12:48 - 01:12:53]
Create a modern website that a website

[01:12:51 - 01:12:55]
with markdown support. So, this may take

[01:12:53 - 01:12:57]
several minutes. Oh, running cloud code.

[01:12:55 - 01:12:59]
So, yeah, now it's running cloud code

[01:12:57 - 01:13:01]
generation. Waiting for a server to

[01:12:59 - 01:13:04]
start. I think we're actually really

[01:13:01 - 01:13:06]
close. Oh, look. Now it opened. Oh, it

[01:13:04 - 01:13:06]
failed to do a prompt.

[01:13:06 - 01:13:07]
All right. That's all right. That's all

[01:13:06 - 01:13:10]
right.

[01:13:07 - 01:13:13]
Auto prefixer. Okay. It definitely

[01:13:10 - 01:13:14]
failed but the idea is there where we

[01:13:13 - 01:13:16]
have a

[01:13:14 - 01:13:18]
cuz if it's a preview I mean think about

[01:13:16 - 01:13:19]
how many times when you use these vibe

[01:13:18 - 01:13:20]
coding tools where you ask it to make

[01:13:19 - 01:13:22]
something and then that is the view on

[01:13:20 - 01:13:23]
the right side of the screen which is

[01:13:22 - 01:13:24]
that preview error that happens all the

[01:13:23 - 01:13:26]
time.

[01:13:24 - 01:13:29]
That is true. You know we can ask it for

[01:13:26 - 01:13:30]
something simpler maybe like make me

[01:13:29 - 01:13:34]
a landing page. Just make me a landing

[01:13:30 - 01:13:38]
page for my banana company. a landing

[01:13:34 - 01:13:42]
page for a company

[01:13:38 - 01:13:45]
that sells bananas.

[01:13:42 - 01:13:49]
Okay. I would like to see the

[01:13:45 - 01:13:51]
claw code agent trajectory. I'd like to

[01:13:49 - 01:13:54]
see the cloud code agent trajectory.

[01:13:51 - 01:13:59]
Currently, it just says

[01:13:54 - 01:14:00]
this may take a few minutes and goes

[01:13:59 - 01:14:05]
silent.

[01:14:00 - 01:14:08]
I would like to see which tool calls

[01:14:05 - 01:14:11]
are being used.

[01:14:08 - 01:14:14]
And here is an image. Oops. Yeah, I'll

[01:14:11 - 01:14:14]
just give you them all actually.

[01:14:14 - 01:14:16]
All right.

[01:14:14 - 01:14:20]
Yeah. Yeah. Okay. Yeah, that works.

[01:14:16 - 01:14:23]
Go cook. So now that guy is cooking. Now

[01:14:20 - 01:14:24]
at the same time, we are also cooking

[01:14:23 - 01:14:27]
here.

[01:14:24 - 01:14:28]
I see. Oh, see. Look. Oh, world's

[01:14:27 - 01:14:30]
All right. Making progress. Let's go.

[01:14:28 - 01:14:33]
The world's finest bananas. You know

[01:14:30 - 01:14:37]
why? We sell the classic yellow bananas

[01:14:33 - 01:14:39]
for $5 a pound, the platinum premium for

[01:14:37 - 01:14:42]
$4 a pound. Why does that get cheaper?

[01:14:39 - 01:14:46]
Okay, interesting. 100% organic, fast

[01:14:42 - 01:14:48]
delivery, sustainably sourced. Wow. You

[01:14:46 - 01:14:51]
know, I'd like more graphics, but that's

[01:14:48 - 01:14:52]
fine. Honestly, this looks like not a

[01:14:51 - 01:14:54]
not a terrible landing page.

[01:14:52 - 01:14:56]
I mean, it's a pretty bad landing page,

[01:14:54 - 01:14:58]
but at least it's a landing page. It's a

[01:14:56 - 01:15:00]
pretty bad landing page, but it's pretty

[01:14:58 - 01:15:01]
impressive that, you know, we did it.

[01:15:00 - 01:15:03]
Okay, let's see.

[01:15:01 - 01:15:06]
Do the image resizer one, but like make

[01:15:03 - 01:15:10]
it like adding border around the image

[01:15:06 - 01:15:12]
website that allows me to upload an

[01:15:10 - 01:15:14]
image and it adds a border to

[01:15:12 - 01:15:18]
and I can change the thickness of the

[01:15:14 - 01:15:21]
border. I should be able to change the

[01:15:18 - 01:15:24]
thickness of the

[01:15:21 - 01:15:26]
and the um the rounded edges.

[01:15:24 - 01:15:27]
Rounded edges.

[01:15:26 - 01:15:31]
Corners. Corners.

[01:15:27 - 01:15:33]
Rounded corners and the color. Okay.

[01:15:31 - 01:15:35]
Oh,

[01:15:33 - 01:15:38]
no way, bro. That's crazy. All right.

[01:15:35 - 01:15:38]
It's it

[01:15:38 - 01:15:41]
go.

[01:15:38 - 01:15:42]
Yeah. Yeah. Yeah. So definitely like a

[01:15:41 - 01:15:46]
little janky like super

[01:15:42 - 01:15:49]
Yeah. Yeah. Yeah. Like what the hell?

[01:15:46 - 01:15:51]
That is awesome. Let's go.

[01:15:49 - 01:15:52]
Yeah. You can see exactly what the agent

[01:15:51 - 01:15:54]
is thinking now. You know, it's Oh,

[01:15:52 - 01:15:56]
actually, no. No. This is the prompt.

[01:15:54 - 01:15:58]
Okay. It goes silent again. But this is

[01:15:56 - 01:16:00]
kind of the prompt. Make me a website

[01:15:58 - 01:16:02]
that allows me to upload an image and

[01:16:00 - 01:16:04]
adds border to it. I should be able to

[01:16:02 - 01:16:06]
change the prompt. I don't know if it

[01:16:04 - 01:16:08]
managed to successfully catch like the

[01:16:06 - 01:16:10]
messages that are being

[01:16:08 - 01:16:11]
That's okay. Hey, that's okay. If it

[01:16:10 - 01:16:12]
renders on the side, I'll be like super

[01:16:11 - 01:16:13]
hyped.

[01:16:12 - 01:16:14]
Yeah, I definitely know.

[01:16:13 - 01:16:16]
What does it go? Wait, scroll up slowly

[01:16:14 - 01:16:17]
on the right side. Yeah. Yeah, right

[01:16:16 - 01:16:19]
there. What is that? Oh,

[01:16:17 - 01:16:21]
spinning up preview. It's just centered

[01:16:19 - 01:16:23]
in the whole thing. Yeah, we definitely

[01:16:21 - 01:16:23]
need to tell it to like keep this max

[01:16:23 - 01:16:27]
height.

[01:16:23 - 01:16:30]
We can't fix that.

[01:16:27 - 01:16:32]
It's still working.

[01:16:30 - 01:16:34]
And then, oh, it should automatically

[01:16:32 - 01:16:39]
render in the right side. Ideally

[01:16:34 - 01:16:43]
the chat should take up like 30%.

[01:16:39 - 01:16:46]
And the website preview should so please

[01:16:43 - 01:16:49]
also fix that.

[01:16:46 - 01:16:50]
After these fixes we can generate a cool

[01:16:49 - 01:16:51]
website on

[01:16:50 - 01:16:53]
cool website little app.

[01:16:51 - 01:16:56]
Think of a little fun website.

[01:16:53 - 01:16:58]
Fun app that will render on the screen.

[01:16:56 - 01:17:01]
It looks pretty good and it is stored

[01:16:58 - 01:17:04]
not in your own codebase. stored in a

[01:17:01 - 01:17:05]
container or a isolated environment.

[01:17:04 - 01:17:06]
Let's see if it works.

[01:17:05 - 01:17:07]
Yeah. What would you want to generate?

[01:17:06 - 01:17:08]
Let's generate something really cool.

[01:17:07 - 01:17:11]
So, let's build something with our

[01:17:08 - 01:17:13]
lovable clone that we created with cloud

[01:17:11 - 01:17:14]
code that uses cloud code.

[01:17:13 - 01:17:15]
Should we tell it to generate create

[01:17:14 - 01:17:17]
lovable?

[01:17:15 - 01:17:19]
Build.

[01:17:17 - 01:17:22]
Let's tell it to do exactly what we did

[01:17:19 - 01:17:24]
today. Build something with lovable.

[01:17:22 - 01:17:26]
Built with clawed code.

[01:17:24 - 01:17:28]
All right. Build something with lovable.

[01:17:26 - 01:17:30]
Wait, can you put that in the subtitle?

[01:17:28 - 01:17:33]
And we should we can move this down into

[01:17:30 - 01:17:36]
like H3s. H3

[01:17:33 - 01:17:37]
built with build a website.

[01:17:36 - 01:17:38]
We can think about this.

[01:17:37 - 01:17:42]
Flappy bird.

[01:17:38 - 01:17:43]
A pomodoro timer.

[01:17:42 - 01:17:44]
What about

[01:17:43 - 01:17:45]
a link tree?

[01:17:44 - 01:17:46]
Yeah. Link tree.

[01:17:45 - 01:17:47]
I like it. I like it.

[01:17:46 - 01:17:48]
Yeah. Yeah. Yeah.

[01:17:47 - 01:17:49]
All right. All right. Let's do that.

[01:17:48 - 01:17:53]
Okay. So,

[01:17:49 - 01:17:54]
build me a personal link tree. personal

[01:17:53 - 01:17:57]
link tree

[01:17:54 - 01:18:00]
that allows me to upload my links

[01:17:57 - 01:18:06]
with name and I can name each link

[01:18:00 - 01:18:07]
and name each link make it sleek sleek

[01:18:06 - 01:18:09]
make it sleek

[01:18:07 - 01:18:12]
modern

[01:18:09 - 01:18:13]
and beautiful

[01:18:12 - 01:18:16]
my personal link tree that allows me to

[01:18:13 - 01:18:17]
upload my links and name each link make

[01:18:16 - 01:18:18]
it sleek modern beautiful

[01:18:17 - 01:18:19]
amazing let's try it

[01:18:18 - 01:18:21]
let's run it

[01:18:19 - 01:18:24]
all right our lovable clone is going to

[01:18:21 - 01:18:26]
work nice work. Good job. There it is.

[01:18:24 - 01:18:28]
And so, can you scroll on the left side?

[01:18:26 - 01:18:30]
Right. That's how it should work. Yeah.

[01:18:28 - 01:18:32]
So, cool. Build me a personal link tree

[01:18:30 - 01:18:34]
that allows me to upload my link and

[01:18:32 - 01:18:35]
name each linking computer.

[01:18:34 - 01:18:37]
And this is

[01:18:35 - 01:18:39]
Wait, wait. Run it on lovable. Run the

[01:18:37 - 01:18:40]
same copy the prompt. Run the same pro.

[01:18:39 - 01:18:41]
Oh, you probably don't have a lovable

[01:18:40 - 01:18:43]
account.

[01:18:41 - 01:18:44]
I don't, but I mean, do do I do I have

[01:18:43 - 01:18:45]
to pay? Do I not get a

[01:18:44 - 01:18:48]
Yeah, just you get you get a free one.

[01:18:45 - 01:18:48]
There you go. Basic.

[01:18:48 - 01:18:50]
Great.

[01:18:48 - 01:18:52]
Okay, so we're running it on Levelable.

[01:18:50 - 01:18:56]
Now, go back to our other one. So, this

[01:18:52 - 01:18:57]
is the lovable that we made. You know,

[01:18:56 - 01:18:59]
similar

[01:18:57 - 01:19:00]
pretty similar. I'm surprised they chose

[01:18:59 - 01:19:00]
such a

[01:19:00 - 01:19:02]
gray.

[01:19:00 - 01:19:03]
Gray. Yeah. Like

[01:19:02 - 01:19:06]
maybe there's something there though,

[01:19:03 - 01:19:08]
like they want you to like get bored by

[01:19:06 - 01:19:09]
it and then like your site captivates

[01:19:08 - 01:19:11]
you.

[01:19:09 - 01:19:13]
Maybe something like that.

[01:19:11 - 01:19:15]
Yeah. I do have to say

[01:19:13 - 01:19:17]
ours is better. Yeah.

[01:19:15 - 01:19:17]
No, I like a lot of what Lovable has

[01:19:17 - 01:19:19]
done.

[01:19:17 - 01:19:21]
Me, too. It doesn't feel very crowded

[01:19:19 - 01:19:23]
given how many I know they have a lot of

[01:19:21 - 01:19:25]
features though like oh okay these are

[01:19:23 - 01:19:28]
cool these are cool quality of life

[01:19:25 - 01:19:30]
things we failed to get our agent to

[01:19:28 - 01:19:32]
properly speak to us that was something

[01:19:30 - 01:19:36]
it's not too difficult but I don't feel

[01:19:32 - 01:19:37]
like reading any more Daytona docs today

[01:19:36 - 01:19:38]
this is cool

[01:19:37 - 01:19:39]
let's go back to ours and wait for it to

[01:19:38 - 01:19:41]
load

[01:19:39 - 01:19:43]
our project is nearly done

[01:19:41 - 01:19:43]
okay

[01:19:46 - 01:19:51]
Oh.

[01:19:47 - 01:19:53]
Oh. Okay. So, we have these links. You

[01:19:51 - 01:19:55]
can paste a link here.

[01:19:53 - 01:19:57]
You can manage links.

[01:19:55 - 01:19:57]
Yeah. So, wait. Can you paste? Can you

[01:19:57 - 01:19:58]
add one

[01:19:57 - 01:20:00]
like manage links?

[01:19:58 - 01:20:02]
Oh, what does this point me to?

[01:20:00 - 01:20:03]
Oh, it took you to the link.

[01:20:02 - 01:20:04]
How did it know what my

[01:20:03 - 01:20:05]
No, no, there's a manage link button on

[01:20:04 - 01:20:06]
it. So, hit

[01:20:05 - 01:20:09]
manage links.

[01:20:06 - 01:20:11]
Okay. So, you can manage the link and

[01:20:09 - 01:20:14]
No, this is pretty cool. We can edit our

[01:20:11 - 01:20:15]
own links. So, I can go ahead and grab

[01:20:14 - 01:20:16]
my GitHub, actually. Yeah, just grab

[01:20:15 - 01:20:17]
anything.

[01:20:16 - 01:20:19]
Let's grab this.

[01:20:17 - 01:20:21]
Young Khan. So,

[01:20:19 - 01:20:22]
this is Lovables and this is ours.

[01:20:21 - 01:20:23]
All right. You know what?

[01:20:22 - 01:20:25]
They look

[01:20:23 - 01:20:26]
I mean, the gradient's like somewhat

[01:20:25 - 01:20:29]
better. I mean, fine. You know, it's

[01:20:26 - 01:20:31]
harder to read their text, but I add in

[01:20:29 - 01:20:32]
one manage one of the links here.

[01:20:31 - 01:20:34]
I mean, I'm just genuinely shocked at

[01:20:32 - 01:20:37]
like how similar they are.

[01:20:34 - 01:20:38]
Yeah. I mean, we've only been working on

[01:20:37 - 01:20:41]
this for two hours. So,

[01:20:38 - 01:20:43]
yeah, I know. I mean, crap. Is this

[01:20:41 - 01:20:44]
Lovables? Oh, this is love voice. Yeah.

[01:20:43 - 01:20:45]
GitHub link.

[01:20:44 - 01:20:47]
Yeah.

[01:20:45 - 01:20:48]
Paste the URL.

[01:20:47 - 01:20:49]
Oh, I mean I mean that's it, I guess.

[01:20:48 - 01:20:50]
That's

[01:20:49 - 01:20:52]
You know what? They're similar. They're

[01:20:50 - 01:20:55]
similar. But the point is in two hours

[01:20:52 - 01:20:57]
we created like a respectable clone. I

[01:20:55 - 01:20:58]
mean go if you want to go over to ours.

[01:20:57 - 01:20:59]
Hit add link.

[01:20:58 - 01:21:01]
Oh yeah.

[01:20:59 - 01:21:02]
Wait, how do you reset it so it doesn't

[01:21:01 - 01:21:03]
look

[01:21:02 - 01:21:04]
Oh, yeah. Yeah. Back

[01:21:03 - 01:21:05]
back to links.

[01:21:04 - 01:21:07]
Yeah. Yeah. Yeah. So I mean yeah, we

[01:21:05 - 01:21:09]
created this link tree. Uh we also

[01:21:07 - 01:21:10]
created on lovable. It takes you to the

[01:21:09 - 01:21:12]
link. Let's go.

[01:21:10 - 01:21:15]
Very neat. Let's see if Lovables takes

[01:21:12 - 01:21:16]
us to the lake. Yeah, it does. Cool.

[01:21:15 - 01:21:17]
Cool.

[01:21:16 - 01:21:20]
Amazing.

[01:21:17 - 01:21:23]
Yeah. And yeah, that's what we created

[01:21:20 - 01:21:26]
in about two hours using claude code. So

[01:21:23 - 01:21:28]
in summary, within cursor, we ran cloud

[01:21:26 - 01:21:32]
code. Like we used cloud code in cursor

[01:21:28 - 01:21:34]
and we used claude code to build a

[01:21:32 - 01:21:37]
lovable clone that used the cloud code

[01:21:34 - 01:21:39]
SDK. So cloud code built cloud code

[01:21:37 - 01:21:41]
which we wrapped and called it lovable

[01:21:39 - 01:21:42]
clone. And then we used lovable clone to

[01:21:41 - 01:21:43]
build an app.

[01:21:42 - 01:21:44]
Build a link tree app.

[01:21:43 - 01:21:46]
That's what we did.

[01:21:44 - 01:21:48]
I didn't write a single line of code. If

[01:21:46 - 01:21:49]
you think about it, I just vive coded

[01:21:48 - 01:21:51]
this whole thing.

[01:21:49 - 01:21:52]
Yeah, you did vive code. I mean, there

[01:21:51 - 01:21:55]
was there was invest. You looked through

[01:21:52 - 01:21:58]
code in documentation, but like

[01:21:55 - 01:22:00]
soon basically the limitation was cloud

[01:21:58 - 01:22:02]
code not looking through the docs well

[01:22:00 - 01:22:05]
enough. And as soon as that gets better,

[01:22:02 - 01:22:07]
it probably would have cut a lot of time

[01:22:05 - 01:22:09]
out of this. I think honestly this

[01:22:07 - 01:22:10]
project and you know I kind of did say

[01:22:09 - 01:22:14]
this going forward that it is a little

[01:22:10 - 01:22:16]
bit more complicated to have separate

[01:22:14 - 01:22:19]
systems and spin up your own isolated

[01:22:16 - 01:22:20]
environment and have code development be

[01:22:19 - 01:22:22]
done there and then port that over to

[01:22:20 - 01:22:24]
our website. That is definitely more

[01:22:22 - 01:22:26]
complicated. It is like a pretty

[01:22:24 - 01:22:29]
powerful thing that we managed to

[01:22:26 - 01:22:30]
accomplish without me writing a single

[01:22:29 - 01:22:33]
line of code. I think you're absolutely

[01:22:30 - 01:22:34]
right about how once you know these

[01:22:33 - 01:22:37]
models are going to be better at

[01:22:34 - 01:22:38]
searching for docs online themselves,

[01:22:37 - 01:22:40]
this could definitely be a problem that

[01:22:38 - 01:22:44]
it's solved. Currently, I always do

[01:22:40 - 01:22:45]
think the skill of navigating the LLMs

[01:22:44 - 01:22:47]
to go in the right direction will be a

[01:22:45 - 01:22:50]
persistent skill as well as finding

[01:22:47 - 01:22:52]
projects that people would actually like

[01:22:50 - 01:22:53]
users would actually want. If we clean

[01:22:52 - 01:22:55]
this project up, we will actually throw

[01:22:53 - 01:22:57]
the link on GitHub. We'll put it in the

[01:22:55 - 01:22:58]
description down below if you want to

[01:22:57 - 01:23:01]
like test it out yourself. And uh yeah,

[01:22:58 - 01:23:01]
we'll see you in the next

## コメント

### 1. @rileybrownai (👍 51)
By the way Kehan is my cofounder at the Vibe Code App. He built the best AI coding agent for mobile apps in the world so if you're not at his level don't feel bad. You can test the agent he built here for free. https://vibecode.go.link/86Ibo

> **@Zero-tic** (👍 2): Been a dev for 8 years and would struggle to even know where to begin to create this and ya'll did an MVP in 75 minutes. Crazy.

> **@KelvinLeeIO** (👍 1): You Hit the niche right here bro

> **@bloimlala42** (👍 1): lol you have a MacBook and still writing with hand rather than speaking to Cloud code???

> **@victoradatsi256** (👍 2): When is the android version arriving

> **@YusufEbr** (👍 0): a laptop with no buttons. Just a screen. That's needed here right ​@@bloimlala42

### 2. @SalimMalibari_Comments (👍 181)
The main issue with the whole vibe coding is no body showing the full process ... it would be cool if you made a series from start to end with full backend , payment gate, etc and maybe let people pay to see the whole backbone somehow ... but these has soo much techinicality that no body can fix it so at end you will pay developer to fix all issues

> **@kehanzhang9140** (👍 60): I’ll get Riley to post the whole process 😊 we have it all

> **@jitingambhirofficial** (👍 0): @@kehanzhang9140 Appreciate that!

> **@rileybrownai** (👍 30): Good idea

> **@b326yr** (👍 0): @@kehanzhang9140 Looking fwd.

> **@AlanDevOps** (👍 64): Honestly, just start asking Claude questions. Don’t expect perfection out of the gate, iteration is the game. Build, break, refine. Ask when you get stuck. I’m a DevOps Engineer, and here’s a truth most won’t tell you: a lot of the code I see in the real world isn’t perfect, it’s just good enough to ship. That’s how software gets made. Don’t aim for perfection. Aim to build. That’s how you get better. I might even put together a course on Claude Code soon, there’s a lot to share.

### 3. @ajinkyanarke (👍 42)
Patience is essential in vibe coding; solve problems step-by-step. Avoid expecting a full-stack app from a single prompt. Thanks great video by the way

> **@Culturelens** (👍 3): You are wrong. you need to get a much as possible done in  Single prompt with much control. if you do step by step , you will end up wasting tokens excessively and still not achieve tangiblity

> **@kelvink5560** (👍 0): What's your recommendation to do it step by steps? What are the steps? ​@@Culturelens

> **@Culturelens** (👍 0): ​@@kelvink5560Step by step in this instance means means getting as much as possible done. First you need to understand a little jargon of web and it's development so that you can structure your prompt accurately. Also be aware of contest window limitations ( some solutions are already coming to the rescue tho) 

This idea is to prompt taking into congnisance the project you want to work on, your design system spelt out in normal conversational language, don't forget tech stack (this is really important; you need to understand what you want the AI to do... Keep your stack simple and powerful not convoluted else e.g you can start running into 'Prisma orm schema errors'... this is just Prisma not copulating your database properly.

Also do not forget best practices for development development for branching, tree shaking and all other necessary nonsense. Do not forget security enhancements, do not forget to implement a debug panel (not necessarily sentry... but something to robust.   

Then get your prompt decisively handling all these, so all left to do later are bits here and bits there! 

My one cent to you is to get a checklist just like pilots do! 

I hope I have not confused you and sorry for late reply!

> **@AndreCarvalho-z5o** (👍 0): ​@@Culturelens if you do that on one go you will have a mess app with lots of bugs and after that the agent will just allucinate 😅

> **@Culturelens** (👍 0): ​@@AndreCarvalho-z5oGet a grip of context before you just jump on threads you know nothing about. what I stated before this was a total overview on how to to approach it. I didn't say do it in one go. what you have to do in go is your total idea as much as possible. Every other thing is the bits here and there that I mentioned. Are you still feeling smart?

### 4. @mulderbm (👍 8)
Great to see others do the same and sharing it without the learning curve 😊 this is decentralized IT arrived. The buy or build equation becomes a lot better in favor of the latter after decades of centralization

### 5. @sebastienverite2958 (👍 1)
this is amazing ! congrats guys, love this kind of videos !

### 6. @whyneil (👍 13)
Just amazing, it also requires a lot of engineering knowledge to know how to scale and containerize the app too. Waiting for the link!

> **@lukidoescode** (👍 0): Yup, it will make a lot of things a lot easier. A lot of vibe coders complain that they have degrading coding performance over time. As an Engineer, if I step in every step along the way when it does dumb stuff from an engineering perspective (which happens A LOT), then there is no degradation. All it takes is not zoning out, never auto accept and doing the thinking while letting the AI do the acting.

It also helps a lot to just ask the AI to work on advanced concepts that just an engineer with XP would know about, like adding proper git hooks that support the AI in not committing bs.

### 7. @amentor-u7w (👍 3)
this was such a fun and practical test seeing claude code take on a real app build in one session was impressive I’ve been experimenting with similar agentic coding flows and using genum ai for prompt validation token tracking and versioning has been key for keeping these fast iteration setups stable and predictable

> **@hsirbrmsmxbj** (👍 0): Totally agree — Genum’s been essential for keeping fast-paced agentic builds from falling apart

### 8. @omcomp2342 (👍 8)
What a gem. Great work guys  keep up with the series and make a full stack like next.js, supabase , stripe , and full backend implementation with fully deploy on cloud (vercel, railway,nelify,VPS) would be amazing.

> **@rileybrownai** (👍 13): Haha we didn't have a whole day. But we basically built lovable for mobile apps already haha. Would you watch a part 2 if we did that?

> **@Historiaparajuristas** (👍 1): @@rileybrownai Yes! i would love to see like all complete it

> **@b326yr** (👍 0): @@rileybrownai Yes

> **@jitingambhirofficial** (👍 1): @@rileybrownai for sure. Would love that. Let's do it with React Native CLI instead of expo.

> **@omcomp2342** (👍 2): ​@rileybrownai, absolutely, I would like to watch something from scratch to actual complete SaaS. love to see the challenges you are dealing with and the way to overcome the issues by iterate and the thinking behind the process.

### 9. @dinoanastasopoulos8511 (👍 0)
This is so so so impressive. Big ups to you guys, you've inspired me! (and gained a new subscriber)

### 10. @JuliusDegesys (👍 20)
LOL! It started coding right away because "claude" is all you need to start claude code. Kehan started it with "claude code", which is the same as opening claude code, and then sending it the prompt "code"

> **@memecoinmafia2732** (👍 0): 😋

### 11. @Cartermanlyx (👍 0)
Super impressive how far Claude Code has come, seeing it build a real app in under 90 minutes is wild. I’ve been experimenting with similar workflows at Builds AI, where you can create AI apps in about 10 minutes. Exciting times for developers.

### 12. @wazzuppoo (👍 0)
really cool session!! more stuff like this please

### 13. @SuvodeepPyne (👍 5)
Great video! Thanks Riley and Kehan!
super small nit: "pseudo code" vs "sudo code"

> **@rileybrownai** (👍 1): :( we know now

### 14. @tradingdigits5694 (👍 6)
I would love to see the best security practices 🔐for these websites!

### 15. @arlandopowell8090 (👍 3)
“You sounded white when you said that” is wild! 🤣😂🤣 53:13

### 16. @nicolasdelgado7195 (👍 36)
I imported this video to Notebook LM and asked it to create a prompt for Claude Code to build this. Then I took that prompt and took it to Claude and asked it to refine the prompt. I pasted that into Claude Code, and now Claude Code is building this. I didn't have to watch the whole video.

> **@Shiv19790416** (👍 0): 😂 sleek!

> **@JohnKean** (👍 1): Love Notebook LM - great reminders!

> **@IncognitoWealthPreneur** (👍 6): 😂😂😂 only God knows how deep this can go!!

> **@Shiv19790416** (👍 3): @@IncognitoWealthPreneurwelcome to matrix and inception!

> **@IncognitoWealthPreneur** (👍 0): @@Shiv19790416brooo! to think some people have no clue this is even going on. Imma live on this side of vibe coding for a loooooong time! What a time to be alive 😂😂😂

### 17. @tonyK_72 (👍 1)
Amazing. Thank you so much for this. Kehan is a boss!

> **@rileybrownai** (👍 1): Yes he is

### 18. @somebodyoncetoldmeeee (👍 0)
This is getting so good right now !!

### 19. @smanqele (👍 0)
Very cool to maintain that layered design type of thinking even as you "vibe" with tools like these

### 20. @mandateonmandalay7632 (👍 2)
For every wrappers, all you need is just well design Big O system prompt. Rest are the same or similar to each other.

