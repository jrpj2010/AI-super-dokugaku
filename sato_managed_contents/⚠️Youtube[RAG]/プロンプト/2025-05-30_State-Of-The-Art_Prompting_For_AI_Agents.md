# State-Of-The-Art Prompting For AI Agents

**チャンネル:** Y Combinator
**公開日:** 2025-05-30
**URL:** https://www.youtube.com/watch?v=DL82mGde6wo

## 説明

At first, prompting seemed to be a temporary workaround for getting the most out of large language models. But over time, it's become critical to the way we interact with AI.

On the Lightcone, Garry, Harj, Diana, and Jared break down what they've learned from working with hundreds of founders building with LLMs: why prompting still matters, where it breaks down, and how teams are making it more reliable in production.

They share real examples of prompts that failed, how companies are testing for quality, and what the best teams are doing to make LLM outputs useful and predictable.

The prompt from Parahelp (S24) discussed in the episode: https://parahelp.com/blog/prompt-design

Apply to Y Combinator: https://ycombinator.com/apply
Work at a startup: https://workatastartup.com

Chapters (Powered by https://chapterme.co/) -
0:00 Intro
0:58 Parahelp’s prompt example
4:59 Different types of prompts
6:51 Metaprompting 
7:58 Using examples
12:10 Some tricks for longer prompts
14:18 Findings on evals
17:25 Every founder has become a forward deployed engineer (FDE)
23:18 Vertical AI agents are closing big deals with the FDE model 
26:13 The personalities of the different LLMs
27:26 Lessons from rubrics
29:47 Kaizen and the art of communication
31:00 Outro

## 字幕

[00:00 - 00:03]
Metarprompting is turning out to be a

[00:02 - 00:05]
very very powerful tool that everyone's

[00:03 - 00:09]
using now. It kind of actually feels

[00:05 - 00:11]
like coding in you know 1995 like the

[00:09 - 00:13]
tools are not all the way there. We're

[00:11 - 00:15]
you know in this new frontier. But

[00:13 - 00:17]
personally it also kind of feels like

[00:15 - 00:20]
learning how to manage a person where

[00:17 - 00:22]
it's like how do I actually communicate

[00:20 - 00:26]
uh you know the things that they need to

[00:22 - 00:32]
know in order to make a good decision.

[00:26 - 00:32]
[Music]

[00:32 - 00:36]
Welcome back to another episode of the

[00:34 - 00:39]
light cone. Today we're pulling back the

[00:36 - 00:42]
curtain on what is actually happening

[00:39 - 00:44]
inside the best AI startups when it

[00:42 - 00:47]
comes to prompt engineering. We surveyed

[00:44 - 00:50]
more than a dozen companies and got

[00:47 - 00:53]
their take right from the frontier of

[00:50 - 00:55]
building this stuff, the practical tips.

[00:53 - 00:57]
Jared, why don't we start with an

[00:55 - 00:59]
example from one of your best AI

[00:57 - 01:02]
startups? I managed to get an example

[00:59 - 01:04]
from a company called Parahelp. Parahelp

[01:02 - 01:05]
does AI customer support. There are a

[01:04 - 01:06]
bunch of companies who who are doing

[01:05 - 01:08]
this, but Parhel is doing it really

[01:06 - 01:11]
really well. They're actually powering

[01:08 - 01:13]
the customer support for Perplexity and

[01:11 - 01:15]
Replet and Bolt and a bunch of other

[01:13 - 01:16]
like top AI companies now. So, if you if

[01:15 - 01:18]
you go and you like email a customer

[01:16 - 01:20]
support ticket into Perplexity, what's

[01:18 - 01:21]
actually responding is like their AI

[01:20 - 01:23]
agent. The cool thing is that the

[01:21 - 01:26]
Powerhel guys very graciously agreed to

[01:23 - 01:28]
show us the actual prompt that is

[01:26 - 01:29]
powering this agent um and to put it on

[01:28 - 01:32]
screen on YouTube for the entire world

[01:29 - 01:33]
to see. Um it's like relatively hard to

[01:32 - 01:35]
get these prompts for vertical AI agents

[01:33 - 01:37]
because they're kind of like the crown

[01:35 - 01:38]
jewels of the IP of these companies and

[01:37 - 01:40]
so very grateful to the Powerhel guys

[01:38 - 01:42]
for agreeing to basically like open

[01:40 - 01:44]
source this prompt. Diana, can you walk

[01:42 - 01:46]
us through this very detailed prompt?

[01:44 - 01:48]
It's super interesting and it's very

[01:46 - 01:49]
rare to get a chance to see this in

[01:48 - 01:51]
action. So the interesting thing about

[01:49 - 01:53]
this prompt is actually first it's

[01:51 - 01:55]
really long. It's very detailed in this

[01:53 - 01:57]
document you can see is like six pages

[01:55 - 01:59]
long just scrolling through it. The big

[01:57 - 02:02]
thing that a lot of the best prompts

[01:59 - 02:05]
start with is this concept of uh setting

[02:02 - 02:07]
up the role of the LLM. You're a manager

[02:05 - 02:09]
of a customer service agent and it

[02:07 - 02:11]
breaks down into bullet points what it

[02:09 - 02:14]
needs to do. Then the big thing is

[02:11 - 02:16]
telling the the task which is to approve

[02:14 - 02:18]
or reject a tool call because it's

[02:16 - 02:21]
orchestrating agent calls from all these

[02:18 - 02:23]
other ones. And then it gives it a bit

[02:21 - 02:25]
of the highle plan. It breaks it down

[02:23 - 02:28]
step by step. You see steps one, two

[02:25 - 02:30]
three, four, five. And then it gives

[02:28 - 02:34]
some of the important things to keep in

[02:30 - 02:36]
mind that it should not kind of go weird

[02:34 - 02:38]
into calling different kinds of tools.

[02:36 - 02:40]
It tells them how to structure the

[02:38 - 02:42]
output because a lot of things with

[02:40 - 02:44]
agents is you need them to integrate

[02:42 - 02:47]
with other agents. So almost like gluing

[02:44 - 02:50]
the API call. So the is important to

[02:47 - 02:52]
specify that it's going to give certain

[02:50 - 02:53]
uh output of accepting or rejecting and

[02:52 - 02:56]
in this format. Then this is sort of the

[02:53 - 02:58]
highle section and one thing that the

[02:56 - 03:01]
best prompts do they break it down sort

[02:58 - 03:02]
of in this markdown type of style uh

[03:01 - 03:05]
formatting. So you have sort of the

[03:02 - 03:07]
heading here and then later on it goes

[03:05 - 03:09]
into more details on how to do the

[03:07 - 03:11]
planning and you see this is like a sub

[03:09 - 03:14]
bullet part of it and as part of the

[03:11 - 03:16]
plan there's actually three big sections

[03:14 - 03:19]
is how to plan and then how to create

[03:16 - 03:21]
each of the steps in the plan and then

[03:19 - 03:24]
the highle example of the plan. One big

[03:21 - 03:27]
thing about the best prompts is they

[03:24 - 03:29]
outline how to reason about the task and

[03:27 - 03:31]
then a big thing is giving it giving it

[03:29 - 03:34]
an example and this is what it does. And

[03:31 - 03:36]
one thing that's interesting about this

[03:34 - 03:38]
it it looks more like programming than

[03:36 - 03:42]
writing English because it has this uh

[03:38 - 03:44]
XML tag kind of format to specify sort

[03:42 - 03:47]
of the plan. We found that it makes it a

[03:44 - 03:50]
lot easier for LMS to follow because a

[03:47 - 03:53]
lot of LMS were post-trained in LHF with

[03:50 - 03:55]
kind of XML type of input and it turns

[03:53 - 03:57]
out to produce better results. Yeah. One

[03:55 - 03:59]
thing I'm surprised that isn't in here

[03:57 - 04:01]
or maybe this is just the version that

[03:59 - 04:04]
they released. What I almost expect is

[04:01 - 04:07]
there to be a section where it describes

[04:04 - 04:10]
a particular scenario and uh actually

[04:07 - 04:12]
gives example output for that scenario.

[04:10 - 04:15]
That's in like the next stage of the

[04:12 - 04:17]
pipeline. Yeah. Oh, really? Okay. Yeah.

[04:15 - 04:18]
Because it's customer specific, right?

[04:17 - 04:20]
Because like every customer has their

[04:18 - 04:22]
own like flavor of how to respond to

[04:20 - 04:23]
these support tickets. And so their

[04:22 - 04:25]
challenge like a lot of these agent

[04:23 - 04:28]
companies is like how do you build a

[04:25 - 04:30]
general purpose product when every

[04:28 - 04:32]
customer like wants you know has like

[04:30 - 04:34]
slightly different workflows and like

[04:32 - 04:36]
preferences. has a really interesting

[04:34 - 04:38]
thing that I see the vertical AI agent

[04:36 - 04:39]
companies talking about a lot which is

[04:38 - 04:41]
like how do you have enough flexibility

[04:39 - 04:42]
to make special purpose logic without

[04:41 - 04:44]
turning into a consulting company where

[04:42 - 04:46]
you're building like a new prompt for

[04:44 - 04:48]
for for every customer. I actually think

[04:46 - 04:51]
this like concept of like forking and

[04:48 - 04:52]
merging prompts across customers and

[04:51 - 04:54]
which part of the prompt is customer

[04:52 - 04:57]
specific versus like companywide is like

[04:54 - 04:58]
a like a really interesting thing that

[04:57 - 04:59]
the world is only just beginning to

[04:58 - 05:02]
explore. Yeah, that's a very good point

[04:59 - 05:05]
Jared. So this is concept of uh defining

[05:02 - 05:07]
the prompt in the system prompt. Then

[05:05 - 05:10]
there's a de developer prompt and then

[05:07 - 05:12]
there's a user prompt. So what this mean

[05:10 - 05:15]
is uh the system prompt is basically

[05:12 - 05:17]
almost like defining uh sort of the

[05:15 - 05:19]
highle API of how your company operates.

[05:17 - 05:20]
In this case the example of parhel is

[05:19 - 05:22]
very much a system prompt. There's

[05:20 - 05:24]
nothing specific about the customer. And

[05:22 - 05:26]
then as they add specific instances of

[05:24 - 05:29]
that API and calling it then they stuff

[05:26 - 05:31]
all that in into more the developer

[05:29 - 05:33]
prompt which is not shown here and

[05:31 - 05:34]
that's adds all the context of let's say

[05:33 - 05:37]
working with perplexity there's certain

[05:34 - 05:39]
ways of how you handle rack questions as

[05:37 - 05:41]
opposed to working with bold is very

[05:39 - 05:44]
different right and then I don't think

[05:41 - 05:46]
parhelp has a user prompt because their

[05:44 - 05:48]
product is not consumed directly by an

[05:46 - 05:52]
end user but a end user prompt could be

[05:48 - 05:54]
more like replet or a zero right where

[05:52 - 05:56]
users need to type is like generate me a

[05:54 - 05:58]
site that that has these buttons this

[05:56 - 06:00]
and that that goes all in the user

[05:58 - 06:02]
prompt. So that's sort of the

[06:00 - 06:03]
architecture that's sort of emerging.

[06:02 - 06:06]
And to your point about avoiding

[06:03 - 06:08]
becoming a consulting company, I think

[06:06 - 06:11]
um there's so many startup opportunities

[06:08 - 06:13]
and building the tooling around all of

[06:11 - 06:14]
this stuff like for example like um

[06:13 - 06:17]
anyone who's done prompt engineering

[06:14 - 06:18]
knows that the examples and worked

[06:17 - 06:20]
examples are really important to

[06:18 - 06:22]
improving the quality of the output. And

[06:20 - 06:25]
so then if you take like power as an

[06:22 - 06:27]
example, they really want good worked

[06:25 - 06:30]
examples that are specific to each

[06:27 - 06:32]
company. And so you can imagine that as

[06:30 - 06:33]
they scale, you almost want that done

[06:32 - 06:35]
automatically. Like in your dream world

[06:33 - 06:37]
what you want is just like a an agent

[06:35 - 06:39]
itself that can pluck out the best

[06:37 - 06:41]
examples from like the customer data set

[06:39 - 06:44]
and then software that just like ingests

[06:41 - 06:45]
that straight into like wherever it

[06:44 - 06:47]
should belong in the pipeline without

[06:45 - 06:49]
you having to manually go out and plug

[06:47 - 06:50]
that all and ingest it in all of

[06:49 - 06:52]
yourself. That's probably a great segue

[06:50 - 06:53]
into metaparrompting which is one of the

[06:52 - 06:55]
things we want to talk about because

[06:53 - 06:57]
that's that's a consistent theme that

[06:55 - 06:59]
keeps coming up when we talk to our AI

[06:57 - 07:01]
startups. Yeah, Tropier is uh one of the

[06:59 - 07:03]
startups I'm working with in the current

[07:01 - 07:07]
YC batch and they've really helped

[07:03 - 07:09]
people like YC company Ducky do really

[07:07 - 07:13]
in-depth understanding and debugging of

[07:09 - 07:15]
the prompts and the return values from a

[07:13 - 07:16]
multi-stage workflow. And one of the

[07:15 - 07:18]
things they figured out is prompt

[07:16 - 07:21]
folding. So you know basically one

[07:18 - 07:23]
prompt can dynamically generate better

[07:21 - 07:24]
versions of itself. So a good example of

[07:23 - 07:27]
that is a classifier prompt that

[07:24 - 07:28]
generates a specialized prompt based on

[07:27 - 07:31]
the previous query. And so you can

[07:28 - 07:34]
actually go in take uh the existing

[07:31 - 07:37]
prompt that you have and actually feed

[07:34 - 07:38]
it more examples where maybe the prompt

[07:37 - 07:40]
failed or didn't quite do what you

[07:38 - 07:43]
wanted and you can actually instead of

[07:40 - 07:46]
you having to go and rewrite the prompt

[07:43 - 07:49]
you just put it into um you know the raw

[07:46 - 07:51]
LLM and say help me make this prompt

[07:49 - 07:54]
better. And because it knows itself so

[07:51 - 07:56]
well, strangely um metaprompting is

[07:54 - 07:58]
turning out to be a very very powerful

[07:56 - 08:00]
tool that everyone's using now. And the

[07:58 - 08:03]
next step after uh you do sort of prompt

[08:00 - 08:05]
folding if the task is very complex

[08:03 - 08:08]
there's this concept of uh using

[08:05 - 08:10]
examples and this is what Jasberry does

[08:08 - 08:12]
is one of the companies I'm working with

[08:10 - 08:14]
this batch they basically build

[08:12 - 08:17]
automatic bug finding in code which is a

[08:14 - 08:19]
lot harder and the way they do it is

[08:17 - 08:21]
they feed a bunch of really hard

[08:19 - 08:22]
examples that only expert programmers

[08:21 - 08:25]
could do let's say if you want to find

[08:22 - 08:27]
an N plus1 query it's actually hard for

[08:25 - 08:29]
today for even like the best LMS to find

[08:27 - 08:32]
those and the way to do those is they

[08:29 - 08:34]
find parts of the code then they add

[08:32 - 08:36]
those into the prompt a meta prompt

[08:34 - 08:39]
that's like hey this is an example of n

[08:36 - 08:40]
plus1 type of error and then that works

[08:39 - 08:43]
it out and I think this pattern of

[08:40 - 08:46]
sometimes when it's too hard to even

[08:43 - 08:47]
kind of write a pros around it let's

[08:46 - 08:50]
just give you an example that turns out

[08:47 - 08:53]
to work really well because it helps LM

[08:50 - 08:55]
to reason around complicated tasks and

[08:53 - 08:57]
steer it better because you can't quite

[08:55 - 09:00]
kind of put exact act parameters and

[08:57 - 09:01]
it's almost like um unit testing

[09:00 - 09:04]
programming in a sense like test-driven

[09:01 - 09:06]
development is sort of the LLM v version

[09:04 - 09:08]
of that. Yeah. Another thing that trope

[09:06 - 09:10]
uh sort of talks about is you know the

[09:08 - 09:13]
the model really wants to actually help

[09:10 - 09:15]
you so much that if you just tell it

[09:13 - 09:18]
give me back output in this particular

[09:15 - 09:21]
format even if it doesn't quite have the

[09:18 - 09:23]
information it needs it'll actually just

[09:21 - 09:25]
tell you what it thinks you want to hear

[09:23 - 09:27]
and it's literally a hallucination. So

[09:25 - 09:29]
one thing they discovered is that you

[09:27 - 09:31]
actually have to give the LLM's a real

[09:29 - 09:34]
escape hatch. You need to tell it if you

[09:31 - 09:38]
do not have enough information to say

[09:34 - 09:41]
yes or no or make a determination, don't

[09:38 - 09:42]
just make it up. Stop and ask me. And

[09:41 - 09:44]
that's a very different way to think

[09:42 - 09:46]
about it. That's actually something we

[09:44 - 09:48]
learned at some of the internal work

[09:46 - 09:51]
that we've done with agents at YC where

[09:48 - 09:54]
Jared came up with a really inventive

[09:51 - 09:56]
way to give the LLM escape patch. Did

[09:54 - 09:58]
you want to talk about that? Yeah. So

[09:56 - 10:00]
the trope approach is one way to give

[09:58 - 10:02]
the LM an escape patch. We came up with

[10:00 - 10:04]
a different way which is in the response

[10:02 - 10:07]
format to give it the ability to have

[10:04 - 10:10]
part of the response be essentially a

[10:07 - 10:12]
complaint to you the developer that like

[10:10 - 10:13]
you have given it confusing or

[10:12 - 10:16]
underspecified information and it

[10:13 - 10:18]
doesn't know what to do. And then the

[10:16 - 10:20]
nice thing about that is that we just

[10:18 - 10:22]
run your LLM like in production with

[10:20 - 10:25]
real hoser data and then you can go back

[10:22 - 10:26]
and you can look at the outputs that it

[10:25 - 10:29]
has given you in that like output

[10:26 - 10:31]
parameter. Um we we call it debug info

[10:29 - 10:32]
internally. So like we have this like

[10:31 - 10:35]
debug info parameter where it's

[10:32 - 10:37]
basically reporting to us things that we

[10:35 - 10:39]
need to fix about it and it literally

[10:37 - 10:41]
ends up being like a to-do list that you

[10:39 - 10:43]
the agent developer has to do. It's like

[10:41 - 10:44]
really kind of mind-blowing stuff. Yeah.

[10:43 - 10:46]
Yeah, I mean just even for hobbyists or

[10:44 - 10:47]
people who are interested in playing

[10:46 - 10:49]
around for this for personal projects.

[10:47 - 10:51]
Like a very simple way to get started

[10:49 - 10:52]
with meta prompting is to follow the

[10:51 - 10:54]
same structure of the prompt is give it

[10:52 - 10:56]
a role and make the role be like you

[10:54 - 10:58]
know you're a expert prompt engineer who

[10:56 - 11:00]
gives really like detailed um great

[10:58 - 11:03]
critiques and advice on how to um

[11:00 - 11:05]
improve prompts and give it the prompt

[11:03 - 11:08]
that you had in mind and it will spit

[11:05 - 11:09]
you back a much a more expanded better

[11:08 - 11:11]
prompt and so you can just keep running

[11:09 - 11:13]
that loop for a while. Works

[11:11 - 11:15]
surprisingly well. I think it's a common

[11:13 - 11:17]
pattern sometimes for companies when

[11:15 - 11:19]
they need to get um responses from

[11:17 - 11:21]
element elements in their product a lot

[11:19 - 11:24]
quicker. They do the meta prompting with

[11:21 - 11:25]
a bigger beefier model any of the I

[11:24 - 11:27]
don't know hundreds of billions of

[11:25 - 11:34]
parameter plus models like uh I guess

[11:27 - 11:36]
cloud 4 3.7 or your uh GPD 03 and they

[11:34 - 11:38]
do this meta prompting and then they

[11:36 - 11:40]
have a very good working one that then

[11:38 - 11:43]
they use into the distilled model. So

[11:40 - 11:46]
they use it on uh for example an FRO and

[11:43 - 11:48]
it ends up working pretty well

[11:46 - 11:51]
specifically sometimes for uh voice AI

[11:48 - 11:54]
agents companies because uh latency is

[11:51 - 11:57]
very important to uh get this whole

[11:54 - 11:59]
touring test to pass because if you have

[11:57 - 12:01]
too much pause be before the agent

[11:59 - 12:03]
responds I think humans can detect

[12:01 - 12:05]
something is off. So they use a faster

[12:03 - 12:08]
model but with a bigger better prompt

[12:05 - 12:09]
that was refined from the bigger models.

[12:08 - 12:12]
So that's like a common pattern as well.

[12:09 - 12:15]
Another again less sophisticated maybe

[12:12 - 12:17]
but um like as the prompt gets longer

[12:15 - 12:19]
and longer like it becomes a a large

[12:17 - 12:21]
working doc um one thing I found useful

[12:19 - 12:24]
is as you're using it if you just note

[12:21 - 12:28]
down in a Google doc things that you're

[12:24 - 12:30]
seeing just um the outputs not being how

[12:28 - 12:31]
you want or not ways that you can think

[12:30 - 12:35]
of to improve it. you can just write

[12:31 - 12:37]
those in note form and then give Gemini

[12:35 - 12:39]
Pro like your notes plus the original

[12:37 - 12:42]
prompt and ask it to suggest a bunch of

[12:39 - 12:43]
edits to the prompt um to incorporate

[12:42 - 12:46]
these in well and it does that quite

[12:43 - 12:49]
well. The other trick is uh in uh Gemini

[12:46 - 12:53]
2.5 Pro if you look at the thinking

[12:49 - 12:55]
traces as is uh parsing through uh

[12:53 - 12:57]
evaluation you could actually learn a

[12:55 - 12:59]
lot about all those misses as well.

[12:57 - 13:00]
We've done that internal as well, right?

[12:59 - 13:03]
As this is critical because if you're

[13:00 - 13:04]
just using Gemini via the API until

[13:03 - 13:06]
recently, you did not get the thinking

[13:04 - 13:08]
traces and like the thinking traces are

[13:06 - 13:10]
like the critical debug information to

[13:08 - 13:12]
like understand like what's wrong with

[13:10 - 13:15]
your prompt. They just added it to the

[13:12 - 13:17]
API. So you can now actually like pipe

[13:15 - 13:19]
that back into your developer tools and

[13:17 - 13:22]
workflows. Yeah, I think it's an

[13:19 - 13:24]
underrated um consequence of Gemini Pro

[13:22 - 13:27]
having such long context windows is you

[13:24 - 13:28]
can effectively use it like a a ripple.

[13:27 - 13:30]
Go sort of like one by one like put your

[13:28 - 13:32]
prompt on like one example then

[13:30 - 13:35]
literally watch the reasoning trace in

[13:32 - 13:36]
real time to figure out like how you can

[13:35 - 13:38]
steer it in the direction you want.

[13:36 - 13:41]
Jared and the software team at YC has

[13:38 - 13:43]
actually built this um you know various

[13:41 - 13:45]
forms of workbenches that allow us to

[13:43 - 13:48]
like do debug and things like that. But

[13:45 - 13:49]
to your point like sometimes it's better

[13:48 - 13:52]
just to use

[13:49 - 13:55]
gemini.google.com directly and then drag

[13:52 - 13:57]
and drop you know literally JSON files

[13:55 - 14:00]
and uh you know you don't have to do it

[13:57 - 14:02]
in some sort of special container like

[14:00 - 14:05]
it you know seems to be totally

[14:02 - 14:07]
something that works even directly in

[14:05 - 14:09]
you know chat GPT itself. Yeah, this is

[14:07 - 14:12]
all stuff. Um, I would give a shout out

[14:09 - 14:14]
to YC's head of data, Eric Bacon, who's

[14:12 - 14:16]
um, helped us all a lot a lot of this

[14:14 - 14:18]
metaparrotting and using Gemini Pro 2.5

[14:16 - 14:21]
as a effectively a ripple. What about

[14:18 - 14:24]
evals? I mean, we've uh, talked about

[14:21 - 14:26]
evals for going on a year now. Um, what

[14:24 - 14:27]
are some of the things that founders are

[14:26 - 14:29]
discovering? Even though we've been

[14:27 - 14:31]
saying this for a year or more now

[14:29 - 14:35]
Gary, I think it's still the case that

[14:31 - 14:37]
like evals are the true crown jewel like

[14:35 - 14:39]
data asset for all of these companies.

[14:37 - 14:41]
Like one one reason that Powerhel was

[14:39 - 14:43]
willing to open source the prompt is

[14:41 - 14:45]
they told me that they actually don't

[14:43 - 14:47]
consider the prompts to be the crown

[14:45 - 14:49]
jewels like the evals are the crown

[14:47 - 14:51]
jewels because without the evals you

[14:49 - 14:54]
don't know why the prompt was written

[14:51 - 14:56]
the way that it was. Um and it's very

[14:54 - 14:58]
hard to improve it. Yeah. And I I think

[14:56 - 15:00]
in abstraction you can think about you

[14:58 - 15:02]
know YC funds a lot of companies

[15:00 - 15:05]
especially in vertical AI and SAS and

[15:02 - 15:07]
then you can't get the eval unless you

[15:05 - 15:10]
sitting literally side by side with

[15:07 - 15:12]
people who are doing X Y or Z knowledge

[15:10 - 15:15]
work. you know, you need to sit next to

[15:12 - 15:17]
the tractor sales regional manager and

[15:15 - 15:19]
understand, well, you know, this person

[15:17 - 15:21]
cares, you know, this is how they get

[15:19 - 15:23]
promoted. This is what they care about.

[15:21 - 15:25]
This is that person's reward function.

[15:23 - 15:27]
And then you know what you're doing is

[15:25 - 15:29]
taking these in-person interactions

[15:27 - 15:32]
sitting next to someone in Nebraska and

[15:29 - 15:35]
then going back to your computer and

[15:32 - 15:38]
codifying it into uh very specific evals

[15:35 - 15:40]
like this particular user wants this

[15:38 - 15:42]
outcome after they you know after this

[15:40 - 15:44]
invoice comes in we have to decide

[15:42 - 15:46]
whether we're going to honor the you the

[15:44 - 15:49]
warranty on this tractor. Like just to

[15:46 - 15:51]
take one of one example that's the true

[15:49 - 15:56]
value right like you everyone's really

[15:51 - 15:57]
worried about um are we just rappers and

[15:56 - 15:59]
you know what is going to happen to

[15:57 - 16:02]
startups and I think this is literally

[15:59 - 16:04]
where the rubber meets the road where um

[16:02 - 16:07]
if you you know if you are out there in

[16:04 - 16:09]
particular places understanding that

[16:07 - 16:12]
user better than anyone else and having

[16:09 - 16:14]
the software actually work for those

[16:12 - 16:16]
people that's the moat is that is like

[16:14 - 16:19]
such a perfect depiction of like what is

[16:16 - 16:20]
the core competency required of founders

[16:19 - 16:22]
today? Like literally like the thing

[16:20 - 16:24]
that you just said like that's your job

[16:22 - 16:27]
as a founder of a company like this is

[16:24 - 16:29]
to be really good at that thing and like

[16:27 - 16:30]
maniacally obsessed with like the

[16:29 - 16:32]
details of the regional tractor sales

[16:30 - 16:35]
manager workflow. Yeah. And then the

[16:32 - 16:36]
wild thing is it's very hard to do like

[16:35 - 16:39]
you know how you have you even been to

[16:36 - 16:40]
Nebraska you know the classic view is

[16:39 - 16:43]
that uh the best founders in the world

[16:40 - 16:46]
they're you know sort of really great

[16:43 - 16:48]
cracked engineers and technologists and

[16:46 - 16:50]
uh just really brilliant and then at the

[16:48 - 16:52]
same time they have to understand some

[16:50 - 16:54]
part of the world that very few people

[16:52 - 16:57]
understand and then there's this little

[16:54 - 17:00]
sliver that is you know uh the founder

[16:57 - 17:01]
of a multi-billion dollar startup you

[17:00 - 17:04]
know I think of Ryan Peterson from

[17:01 - 17:06]
Flexport, you know, really really great

[17:04 - 17:08]
person who understands how software is

[17:06 - 17:12]
built, but then also I think he was the

[17:08 - 17:14]
third biggest uh importer of medical hot

[17:12 - 17:17]
tubs for an entire year like you know a

[17:14 - 17:19]
decade ago. So you know the weirder that

[17:17 - 17:20]
is the more of the world that you've

[17:19 - 17:23]
seen that nobody else who's a

[17:20 - 17:25]
technologist has seen uh the greater the

[17:23 - 17:27]
opportunity actually. I think you've put

[17:25 - 17:28]
this in a really interesting way before

[17:27 - 17:29]
Gary where you're sort of saying that

[17:28 - 17:31]
every founder's become a forward

[17:29 - 17:33]
deployed engineer. That's like a term

[17:31 - 17:35]
that traces back to Palunteer and since

[17:33 - 17:37]
you were early at Palanteer maybe tell

[17:35 - 17:38]
us a little bit about how did forward

[17:37 - 17:40]
deployed engineer become a thing at

[17:38 - 17:41]
Palunteer and and what can founders

[17:40 - 17:43]
learn from it now? I mean I think the

[17:41 - 17:46]
whole thesis of Palunteer at some level

[17:43 - 17:49]
was that um if you look at Meta back

[17:46 - 17:52]
then it was called Facebook or Google or

[17:49 - 17:54]
any of the top software startups that

[17:52 - 17:57]
everyone sort of knew back then. One of

[17:54 - 18:00]
the key recognitions that Peter Teal and

[17:57 - 18:01]
Alex Karp and Stefan Cohen and Joe

[18:00 - 18:04]
Lansdale, Nathan Gettings, like the

[18:01 - 18:07]
original founders of Palunteer had was

[18:04 - 18:11]
that uh go into anywhere in the Fortune

[18:07 - 18:13]
500, go into any government agency in

[18:11 - 18:16]
the world, including the United States

[18:13 - 18:19]
and nobody who understands computer

[18:16 - 18:21]
science and technology at the level that

[18:19 - 18:23]
you at the highest possible level would

[18:21 - 18:26]
ever even be in that room. And so

[18:23 - 18:28]
Palenteer's sort of really really big

[18:26 - 18:30]
idea that they discovered very early was

[18:28 - 18:33]
that uh the problems that those places

[18:30 - 18:35]
face they're actually multi-billion

[18:33 - 18:37]
dollar sometimes trillion dollar

[18:35 - 18:40]
problems and yet uh this was well before

[18:37 - 18:41]
AI became a thing you know I mean people

[18:40 - 18:43]
were sort of talking about machine

[18:41 - 18:45]
learning but you know back then they

[18:43 - 18:47]
called it data mining you know the world

[18:45 - 18:49]
is a wash in data these you know giant

[18:47 - 18:52]
databases of people and things and

[18:49 - 18:54]
transactions and we have no idea what to

[18:52 - 18:57]
do with it. That's what Palanteer was

[18:54 - 19:00]
is and still is. That um you can go and

[18:57 - 19:03]
find the world's best technologists who

[19:00 - 19:05]
know how to write software to actually

[19:03 - 19:07]
make sense of the world. You know, you

[19:05 - 19:09]
have these pabytes of data and you don't

[19:07 - 19:11]
know how do you find the needle in the

[19:09 - 19:14]
haststack. Um and you know the wild

[19:11 - 19:17]
thing is going on uh something like 20

[19:14 - 19:20]
22 years later it's only become more

[19:17 - 19:21]
true that we have more and more data and

[19:20 - 19:24]
we have less and less of an

[19:21 - 19:26]
understanding of what's going on and uh

[19:24 - 19:29]
it's no mistake that actually now that

[19:26 - 19:31]
we have LLMs like we actually it is

[19:29 - 19:33]
becoming much more tractable and then

[19:31 - 19:35]
the forward deployed engineer title was

[19:33 - 19:39]
specifically how do you sit next to

[19:35 - 19:41]
literally the FBI agent who's um

[19:39 - 19:43]
investigating domestic terrorism. How do

[19:41 - 19:45]
you sit right next to them in their

[19:43 - 19:47]
actual office and see what does the case

[19:45 - 19:50]
coming in look like? What are all the

[19:47 - 19:52]
steps? Uh when you actually need to go

[19:50 - 19:54]
to the federal prosecutor, what are the

[19:52 - 19:56]
things that they're sending? Is it I

[19:54 - 19:58]
mean what's funny is like literally it's

[19:56 - 20:00]
like word documents and Excel

[19:58 - 20:02]
spreadsheets, right? And um what you do

[20:00 - 20:05]
as a forward deployed engineer is take

[20:02 - 20:07]
these sort of you know file cabinet and

[20:05 - 20:10]
fax machine things that people have to

[20:07 - 20:13]
do and then convert it into really clean

[20:10 - 20:15]
software. So you know the classic view

[20:13 - 20:18]
is that it should be as easy to actually

[20:15 - 20:20]
do uh an investigation at a threeletter

[20:18 - 20:22]
agency as going and taking a photo of

[20:20 - 20:23]
your lunch on Instagram and posting it

[20:22 - 20:25]
to all your friends. Like that's you

[20:23 - 20:27]
know kind of the funniest part of it.

[20:25 - 20:30]
And so you I think it's no mistake today

[20:27 - 20:31]
that four deployed engineers who came up

[20:30 - 20:33]
through that system at Palanteer now

[20:31 - 20:35]
they're turning out to be some of the

[20:33 - 20:37]
best founders at YC actually. Yeah. I

[20:35 - 20:38]
mean produced this incredible an

[20:37 - 20:40]
incredible number of startup founders

[20:38 - 20:42]
cuz yeah like the training to be a fore

[20:40 - 20:43]
deployed engineer that's exactly the

[20:42 - 20:45]
right training to be a founder of these

[20:43 - 20:46]
companies. Now the the other interesting

[20:45 - 20:48]
thing about Palunteer is like other

[20:46 - 20:50]
companies would send like a salesperson

[20:48 - 20:52]
to go and sit with the FBI agent and

[20:50 - 20:54]
like Palunteer sent engineers to go and

[20:52 - 20:56]
do that. I think Palenter was probably

[20:54 - 20:58]
the first company to really like

[20:56 - 21:00]
institutionalize that and scale that as

[20:58 - 21:02]
a process, right? Yeah. I mean, I think

[21:00 - 21:03]
what happened there, the reason why they

[21:02 - 21:05]
were able to get these sort of seven and

[21:03 - 21:08]
eight and now nine figure contracts very

[21:05 - 21:09]
consistently is that uh instead of

[21:08 - 21:11]
sending someone who's like hair and

[21:09 - 21:13]
teeth and they're in there and you know

[21:11 - 21:15]
let's go to the let's go to the uh

[21:13 - 21:17]
steakhouse. You know, it's all like

[21:15 - 21:19]
relationship. and you'd have one meeting

[21:17 - 21:21]
uh they would really like the

[21:19 - 21:23]
salesperson and then through sheer force

[21:21 - 21:25]
of personality you'd try to get them to

[21:23 - 21:27]
give you a seven-figure contract and

[21:25 - 21:30]
like the time scales on this would be

[21:27 - 21:32]
you know 6 weeks 10 weeks 12 weeks like

[21:30 - 21:34]
5 years I don't know it's like and the

[21:32 - 21:36]
software would never work uh whereas if

[21:34 - 21:39]
you put an engineer in there and you

[21:36 - 21:40]
give them uh you know Palunteer Foundry

[21:39 - 21:44]
which is what they now call sort of

[21:40 - 21:46]
their core uh data viz and data mining

[21:44 - 21:49]
suites instead of the next meeting being

[21:46 - 21:52]
reviewing 50 pages of you know sort of

[21:49 - 21:53]
sales documentation or a contract or a

[21:52 - 21:56]
spec or anything like that. It's

[21:53 - 21:58]
literally like, "Okay, we built it." And

[21:56 - 22:01]
then you're getting like real live

[21:58 - 22:03]
feedback within days. And I mean, that's

[22:01 - 22:05]
honestly the biggest opportunity for

[22:03 - 22:07]
startup founders. If startup founders

[22:05 - 22:09]
can do that and uh that's what forward

[22:07 - 22:11]
deployed engineers are sort of used to

[22:09 - 22:14]
doing that's how you could beat a

[22:11 - 22:16]
Salesforce or an Oracle or you know a

[22:14 - 22:19]
Booze Allen or literally any company out

[22:16 - 22:21]
there that has a big office and a big

[22:19 - 22:23]
fancy you know you have big fancy

[22:21 - 22:25]
salespeople with big strong handshakes

[22:23 - 22:27]
and it's like how does a really good

[22:25 - 22:29]
engineer with a weak handshake go in

[22:27 - 22:30]
there and beat them? It's actually you

[22:29 - 22:33]
show them something that they've never

[22:30 - 22:35]
seen before and like make them feel

[22:33 - 22:36]
super heard. You have to be super

[22:35 - 22:38]
empathetic about it. Like you actually

[22:36 - 22:41]
have to be a great designer and product

[22:38 - 22:43]
person and then you know come back and

[22:41 - 22:46]
you can just blow them away. Like the

[22:43 - 22:47]
software is so powerful that you know

[22:46 - 22:50]
the second you see something that you

[22:47 - 22:51]
know makes you feel seen you want to buy

[22:50 - 22:52]
it on the spot. Is a good way of

[22:51 - 22:54]
thinking about it that founders should

[22:52 - 22:56]
think about themselves as being the four

[22:54 - 22:58]
deployed engineers of their own company.

[22:56 - 23:00]
Absolutely. Yeah. Like you definitely

[22:58 - 23:02]
can't farm this out. Like literally the

[23:00 - 23:04]
founders themselves, they're technical.

[23:02 - 23:05]
They have to be the great product

[23:04 - 23:07]
people. They have to be the

[23:05 - 23:10]
ethnographer. They have to be the

[23:07 - 23:11]
designer. You want the person on the

[23:10 - 23:13]
second meeting to see the demo you put

[23:11 - 23:15]
together based on the stuff you heard.

[23:13 - 23:17]
And you want them to say, "Wow, I've

[23:15 - 23:19]
never seen anything like that." And take

[23:17 - 23:21]
my money. I think the incredible thing

[23:19 - 23:23]
about this model is this is why we're

[23:21 - 23:27]
seeing a lot of the vertical AI agents

[23:23 - 23:30]
take off is precisely this because they

[23:27 - 23:32]
can have these meetings with the end

[23:30 - 23:35]
buyer and champion at these big

[23:32 - 23:37]
enterprises. They take that context and

[23:35 - 23:39]
then they stuff it basically in the

[23:37 - 23:41]
prompt and then they can quickly come

[23:39 - 23:42]
back in a meeting like just the next day

[23:41 - 23:44]
maybe with Palunteer would have taken a

[23:42 - 23:47]
bit longer and a team of engineers here.

[23:44 - 23:49]
It could be just the two founders go in

[23:47 - 23:51]
and then they would close this six

[23:49 - 23:54]
seven figure deals which we've seen and

[23:51 - 23:56]
with large enterprises which has never

[23:54 - 23:59]
been done before and it's just possible

[23:56 - 24:02]
with this new model of forward deploy

[23:59 - 24:04]
engineer plus AI is just on

[24:02 - 24:05]
accelerating. It just reminds me of a

[24:04 - 24:07]
company I mentioned before on the

[24:05 - 24:09]
podcast like Giger ML who do customer

[24:07 - 24:12]
another customer support and especially

[24:09 - 24:15]
a lot of voice support and it's just

[24:12 - 24:17]
classic case of two extremely um

[24:15 - 24:19]
talented software engineers not natural

[24:17 - 24:21]
sales people but they force themselves

[24:19 - 24:23]
to be essentially forward deployed

[24:21 - 24:25]
engineers and they closed a huge deal

[24:23 - 24:27]
with Zeppto and then a couple of other

[24:25 - 24:28]
companies they can't announce yet but do

[24:27 - 24:30]
they physically go on site like the

[24:28 - 24:32]
palentier model? Yes. So they did so

[24:30 - 24:34]
they they did all of that where once

[24:32 - 24:35]
they close the deal they go on site and

[24:34 - 24:37]
they sit there with all the customer

[24:35 - 24:39]
support people and figuring out how to

[24:37 - 24:41]
keep tuning and getting the software or

[24:39 - 24:44]
the LM to work even better. But before

[24:41 - 24:46]
that even to win the deal what they

[24:44 - 24:47]
found is that they can they can win by

[24:46 - 24:50]
just having the most impressive demo.

[24:47 - 24:53]
And in their case they've um innovated a

[24:50 - 24:55]
bit on the rag pipeline so that they can

[24:53 - 24:57]
um have their voice responses be both

[24:55 - 24:59]
accurate and very low latency. sort of

[24:57 - 25:02]
like a technically challenging thing to

[24:59 - 25:03]
do, but I just feel like in the like pre

[25:02 - 25:05]
sort of the current LLM rise, you

[25:03 - 25:07]
couldn't necessarily differentiate

[25:05 - 25:09]
enough in the demo phase of sales to

[25:07 - 25:11]
beat out incumbent. So, you can really

[25:09 - 25:14]
beat Salesforce by having a slightly

[25:11 - 25:15]
better CRM with a better UI. But now

[25:14 - 25:17]
because the technology evolves so fast

[25:15 - 25:20]
and it's so hard to get this like last

[25:17 - 25:22]
five 10 five to 10% correct, you can

[25:20 - 25:24]
actually if you're a forward deployed

[25:22 - 25:26]
engineer go in do the first meeting

[25:24 - 25:28]
tweak it so that it works really well

[25:26 - 25:30]
for that customer. Go back with the demo

[25:28 - 25:31]
and just get that oh wow like we've not

[25:30 - 25:34]
seen anyone else pull this off before

[25:31 - 25:36]
experience and close huge deals. And

[25:34 - 25:39]
that was the exact same case with Happy

[25:36 - 25:42]
Robot who has sold seven figure

[25:39 - 25:44]
contracts to the top three largest

[25:42 - 25:47]
logistic brokers in the world. They

[25:44 - 25:48]
build AI voice agents for that. They are

[25:47 - 25:50]
the ones doing the forward deploy

[25:48 - 25:53]
engineer model and talking to like the

[25:50 - 25:56]
CIOS of these companies and quickly

[25:53 - 25:57]
shipping a lot of product like very very

[25:56 - 25:59]
quick turnaround. And it's been

[25:57 - 26:00]
incredible to see that take off right

[25:59 - 26:03]
now. And it started from six figure

[26:00 - 26:05]
deals now doing closing and seven figure

[26:03 - 26:06]
deals which is crazy. This is just a

[26:05 - 26:09]
couple months after. So that's the kind

[26:06 - 26:11]
of stuff that you can do with uh I mean

[26:09 - 26:13]
unbelievably very very smart prompt

[26:11 - 26:16]
engineering actually. Well, one of the

[26:13 - 26:18]
things that's kind of interesting about

[26:16 - 26:21]
uh each model is that they each seem to

[26:18 - 26:23]
have their own personality. And one of

[26:21 - 26:25]
the things the founders are really

[26:23 - 26:26]
realizing is that you're going to go to

[26:25 - 26:29]
different people for different things.

[26:26 - 26:31]
Actually, one of the things that's known

[26:29 - 26:35]
a lot is Claude is sort of the more

[26:31 - 26:40]
happy and more human steerable model.

[26:35 - 26:42]
And the uh other one is Lama 4 is one

[26:40 - 26:43]
that needs a lot more steering. It's

[26:42 - 26:45]
almost like talking to a developer and

[26:43 - 26:49]
part of it could be an artifact of not

[26:45 - 26:51]
having done as much RL RHF on top of it.

[26:49 - 26:54]
So is a bit more rough to work with, but

[26:51 - 26:55]
you could actually steer it very well if

[26:54 - 26:58]
you

[26:55 - 27:00]
actually are good at actually doing a

[26:58 - 27:02]
lot of prompting and almost doing a bit

[27:00 - 27:03]
more RLHF, but it's a bit harder to work

[27:02 - 27:06]
with actually. Well, one of the things

[27:03 - 27:08]
we've been using uh LLMs for internally

[27:06 - 27:11]
is actually helping founders figure out

[27:08 - 27:13]
who they should take money from. And so

[27:11 - 27:16]
in that case, sometimes you need a very

[27:13 - 27:18]
straightforward rubric, a zero to 100.

[27:16 - 27:21]
zero being never ever take their money

[27:18 - 27:22]
and 100 being take their money right

[27:21 - 27:24]
away. Like they actually help you so

[27:22 - 27:27]
much that you'd be crazy not to take

[27:24 - 27:29]
their money. Harj, we've been working on

[27:27 - 27:30]
uh some scoring rubrics around that

[27:29 - 27:32]
using prompts. What What are some of the

[27:30 - 27:36]
things we've learned? So, it's certainly

[27:32 - 27:37]
best practice to give um LLM's rubrics

[27:36 - 27:39]
especially if you want to get a

[27:37 - 27:40]
numerical score as the output. You want

[27:39 - 27:41]
to give it a rubric to help it

[27:40 - 27:43]
understand like how should I think

[27:41 - 27:45]
through and what's like a 80 versus a

[27:43 - 27:47]
90. But these rubrics are never perfect.

[27:45 - 27:51]
there's often always exceptions and you

[27:47 - 27:53]
tried it with uh 03 versus Gemini 2.5

[27:51 - 27:54]
and you found this this is what we found

[27:53 - 27:56]
really interesting is that um you can

[27:54 - 27:58]
give the same rubric to two different

[27:56 - 28:01]
models and in our in our specific case

[27:58 - 28:03]
what we found is that um 03 was very

[28:01 - 28:06]
rigid actually like it really sticks to

[28:03 - 28:07]
the rubric it's heavily penalizes for

[28:06 - 28:08]
anything that doesn't fit like the

[28:07 - 28:11]
rubric that you've given it whereas

[28:08 - 28:14]
Gemini 2.5 Pro was actually quite good

[28:11 - 28:16]
at being flexible in that it would apply

[28:14 - 28:18]
the rubric but it could also sort of

[28:16 - 28:20]
almost reason through why someone might

[28:18 - 28:22]
be like an exception or why you might

[28:20 - 28:24]
want to um push something up more

[28:22 - 28:26]
positively or negatively than the rubric

[28:24 - 28:28]
might suggest, which I just thought was

[28:26 - 28:30]
really interesting cuz that it's just

[28:28 - 28:32]
like when you're training a person

[28:30 - 28:33]
you're trying to you give them a rubric

[28:32 - 28:35]
like you want them to use a rubric as a

[28:33 - 28:37]
guide, but there are always these sort

[28:35 - 28:39]
of edge cases where you need to sort of

[28:37 - 28:40]
think a little bit more deeply. Um, and

[28:39 - 28:43]
I just thought it was interesting that

[28:40 - 28:44]
the models themselves will handle that

[28:43 - 28:45]
differently, which means they sort of

[28:44 - 28:48]
have different personalities, right?

[28:45 - 28:49]
Like 03 felt a little bit more like the

[28:48 - 28:50]
soldier sort of like, okay, I'm

[28:49 - 28:53]
definitely like check, check, check

[28:50 - 28:54]
check, check. Um, and Gemini Pro 2.5

[28:53 - 28:56]
felt a little bit more like a a high

[28:54 - 28:57]
agency sort of employee was like, "Oh

[28:56 - 28:59]
okay. I think this makes sense, but this

[28:57 - 29:01]
might be an exception in this case,"

[28:59 - 29:02]
which was um just really interesting to

[29:01 - 29:04]
see. Yeah, it's funny to see that for

[29:02 - 29:06]
investors. You know, sometimes you have

[29:04 - 29:07]
investors like a Benchmark or a Thrive

[29:06 - 29:10]
it's like "Yeah, take their money right

[29:07 - 29:12]
away. Their process is immaculate. They

[29:10 - 29:14]
never ghost anyone. They answer their

[29:12 - 29:16]
emails faster than most founders. It's

[29:14 - 29:18]
you know, very impressive. And then, uh

[29:16 - 29:19]
one example here might be, you know

[29:18 - 29:21]
there are plenty of investors who are

[29:19 - 29:24]
just overwhelmed and maybe they're just

[29:21 - 29:25]
not that good at managing their time.

[29:24 - 29:27]
And so, they might be really great

[29:25 - 29:29]
investors and their track record bears

[29:27 - 29:31]
that out, but they're sort of slow to

[29:29 - 29:33]
get back. They seem overwhelmed all the

[29:31 - 29:36]
time. They accidentally, probably not

[29:33 - 29:38]
intentionally ghost people. And so this

[29:36 - 29:41]
is legitimately exactly what an LLM is

[29:38 - 29:43]
for. Like the debug info on some of

[29:41 - 29:46]
these are very interesting to see like

[29:43 - 29:48]
you know maybe it's a 91 instead of like

[29:46 - 29:49]
an 89. We'll see. I guess one of the

[29:48 - 29:51]
things that's been really surprising to

[29:49 - 29:53]
me as you know we ourselves are playing

[29:51 - 29:56]
with it and we spend you know maybe 80

[29:53 - 29:58]
to 90% of our time with founders who are

[29:56 - 30:00]
all the way out on the edge is uh you

[29:58 - 30:03]
know on the one hand the analogies I

[30:00 - 30:04]
think even we use to discuss this is uh

[30:03 - 30:07]
it's kind of like coding. It kind of

[30:04 - 30:10]
actually feels like coding in, you know

[30:07 - 30:11]
1995. Like the tools are not all the way

[30:10 - 30:14]
there. There's a lot of stuff that's

[30:11 - 30:16]
unspecified. We're, you know, in this

[30:14 - 30:18]
new frontier. But personally, it also

[30:16 - 30:21]
kind of feels like learning how to

[30:18 - 30:23]
manage a person where it's like, how do

[30:21 - 30:26]
I actually communicate uh, you know, the

[30:23 - 30:28]
things that they need to know in order

[30:26 - 30:30]
to make a good decision? And how do I

[30:28 - 30:32]
make sure that they know um, you know

[30:30 - 30:35]
how I'm going to evaluate and score

[30:32 - 30:38]
them? And uh not only that, like there's

[30:35 - 30:40]
this aspect of Kaizen, you know, this um

[30:38 - 30:41]
this manufacturing technique that

[30:40 - 30:44]
created really really good cars for

[30:41 - 30:47]
Japan in the '90s. Uh and that principle

[30:44 - 30:48]
actually says that the people who are

[30:47 - 30:50]
the absolute best at improving the

[30:48 - 30:53]
process are the people actually doing

[30:50 - 30:55]
it. That's literally why uh Japanese

[30:53 - 30:57]
cars got so good in the '90s. And that's

[30:55 - 30:59]
metaprompting to me. So, I don't know.

[30:57 - 31:02]
It's a brave new world. We're sort of in

[30:59 - 31:04]
this new moment. So, with that, we're

[31:02 - 31:06]
out of time. But can't wait to see what

[31:04 - 31:08]
kind of prompts you guys come up with.

[31:06 - 31:18]
And we'll see you next time.

[31:08 - 31:18]
[Music]

## コメント

### 1. @chapterme (👍 36)
Chapters (Powered by ChapterMe) -
0:00 Intro
0:58 Parahelp’s prompt example
4:59 Different types of prompts
6:51 Metaprompting 
7:58 Using examples
12:10 Some tricks for longer prompts
14:18 Findings on evals
17:25 Every founder has become a forward deployed engineer (FDE)
23:18 Vertical AI agents are closing big deals with the FDE model 
26:13 The personalities of the different LLMs
27:26 Lessons from rubrics
29:47 Kaizen and the art of communication
31:00 Outro

> **@antonio_carvalho** (👍 3): @@RaysNewLife It's a trend. Watch Open AI videos and you'll see they dumb it down too much, as if everyone who's talking is a person they grabbed from the street, knows nothing about how AI works and is marveled at the whole thing.

### 2. @filipealvarenga4322 (👍 26)
thank you for the content you guys are putting out! listening all the podcasts as they come up and adopting your advices in the product I'm building in real time

> **@ycombinator** (👍 3): We are glad you are finding it useful!

### 3. @davidwoodworth8858 (👍 98)
I like using o3 to rate my prompts with: “Evaluate this prompt using clarity, specificity, and output quality (1–5 each). Give one improvement suggestion.” Super helpful for improving my prompts.

> **@DobladorR** (👍 10): I suppose it depends on the case but in my experience specially for simple agents / models with specific tasks the prompts provided by other LLMs are most of the time more complex and produce worse results

> **@davidwoodworth8858** (👍 3): ​@@DobladorR, You make a good point. Either having the target model evaluate the prompt or adding more tailored context for a weaker model might lead to better results. You don’t always need to update the prompt based on the feedback, but it’s helpful to know where things might break.

I tested this prompt on o3 and found it gives solid feedback:

Act as a prompt coach. 
The following prompt will be run on **GPT-4o-mini** (limited context, weaker reasoning).
Evaluate the prompt for clarity, specificity, and expected output quality (1–5 each).  
Highlight any issues that may trip up GPT-4o-mini and give one concrete improvement suggestion.

> **@paulcalebcoding** (👍 3): That's really smart. Thanks for sharing this

> **@hawaiitcb** (👍 3): @@DobladorR I’ve seen this as well, almost like llm generated prompts are too specific and miss a lot of the edge cases. The prompts I write are worse on the surface but allow the llm enough room to make assumptions by not spelling everything out. Might be something there.

> **@volcaphft** (👍 0): good luck vibe prompting in prod

### 4. @Tim-again (👍 25)
What I love about ALL your videos, is that you guys are personable, down-to-earth but relentlessly pragmatic about your advice. No fluff, no PR, just solid insights from one of the most innovative tech incubators on the planet (not trying to be a Stan here, just giving props).  Most Silicon Valley VCs on YT have this Ivory Tower , "greater than thou" , elitist vibe and you guys broke that. I'm a native SF dude, and I feel you tap into the O.G.spirit of SF, which was community, connection and a collaborative culture. All of which has been eroded over the years last 10+ years due to transplants and  tech-bro reconstruction. Thank you. Respect.🙏

> **@Grifffffith** (👍 7): Ai generated comment

> **@Tim-again** (👍 1): ​@@Grifffffith 🤣🤣that's a good one

### 5. @hnbergeron (👍 30)
The trick I use is I've built a windsurf project that updates my Idea doc markdown automatically, and I've got my memory instructions for each of my projects to always check my markdown document from this master windsurf idea project. I always have this project open and speak my idea and get it to generate not just my idea but enough details so it understand my idea when it is read. All this is done automatically within one windsurf project.

> **@belalchaudhary736** (👍 1): Can you… share more details? 👀 I’m just learning / figuring this all out as a very basic Python coder

> **@nm3547** (👍 0): Do you have to know how to code to use windsurf, or can I get started w the help of multiple LLms as a newb?

> **@rahulkaid** (👍 0): What do you mean updates idea markdown automatically? How does the input of the idea happen?

### 6. @WorldKingLive (👍 1)
Thanks for your videos & knowledge!!

### 7. @JeremyDevz (👍 4)
One of your best episodes yet! Love hearing all your insights. Keep the value coming! 👏🏽👏🏽

### 8. @is.saac77 (👍 24)
omg finally a yc video thats not an elongated ad of a company and actually provides value

> **@fake_tourist** (👍 1): all the companies they are talking about, YC has invested in them. It is an ad.

> **@subversionz4919** (👍 0): lol sarcasm?

> **@akraticus** (👍 0): Palantir to the moon 🚀

### 9. @PromptDrop-u6t (👍 1)
Love the discussion about LLM personalities at 26:13. We need more research on how different models develop distinct 'characters' that affect outputs. This could revolutionize how we design AI systems for specific use cases.

### 10. @khusansaidvaliev177 (👍 1)
Thanks a lot for your updates, it's like a breath of fresh air to see that other founders face the same problems and find similar solutions. It reassures me that I'm on the right path.

### 11. @karanbaweja7938 (👍 36)
Here's a structured summary of the key insights from the transcript, organised by category with explanations and examples:

### **I. Prompt Structure & Components**
1. **Role Definition**  
   - *What*: Explicitly define the LLM's role/task.  
   - *Example*: Parahelp’s prompt: "You are a manager of a customer service agent" with bullet-point responsibilities.  

2. **Task Breakdown**  
   - *What*: Step-by-step instructions for complex tasks.  
   - *Example*: Parahelp’s 5-step plan for approving/rejecting tool calls.  

3. **Output Formatting**  
   - *What*: Enforce strict output structures for API integration.  
   - *Example*: XML-like tags in Parahelp’s prompt to ensure parsable responses (e.g., `<accept_tool_call>...</accept_tool_call>`).  

4. **Markdown Organization**  
   - *What*: Use headings, bullet points, and sections for readability.  
   - *Insight*: Mimics programming logic, improving LLM comprehension.  

---

### **II. Types of Prompts in Production Systems**
1. **System Prompt**  
   - *What*: Core "API" defining company-wide logic (e.g., Parahelp’s 6-page prompt).  
   - *Example*: Rules for handling generic customer support workflows.  

2. **Developer Prompt**  
   - *What*: Customer-specific logic injected into the system prompt.  
   - *Example*: Perplexity vs. Bolt needing distinct support policies.  

3. **User Prompt**  
   - *What*: End-user instructions (e.g., Replit’s "Generate a site with these buttons").  
   - *Insight*: Rare in B2B agents (like Parahelp) but common in user-facing tools.  

---

### **III. Metaprompting Techniques**
1. **Self-Improvement**  
   - *What*: Use LLMs to refine their own prompts.  
   - *Example*:  
     - Input: "You’re an expert prompt engineer. Critique this prompt: [original prompt]."  
     - Output: Enhanced prompt with clearer instructions.  

2. **Prompt Folding**  
   - *What*: Dynamically generate specialized sub-prompts.  
   - *Example*: Trope’s classifier that creates custom prompts per query type.  

3. **Escape Hatches**  
   - *What*: Allow LLMs to flag underspecified inputs.  
   - *Example*: YC’s "debug_info" parameter where LLMs report confusing requirements.  

4. **Model Distillation**  
   - *What*: Use larger models (GPT-4, Gemini 1.5) to design prompts for smaller, faster models (e.g., Mistral).  
   - *Use Case*: Voice AI agents needing low-latency responses.  

---

### **IV. Critical Tools & Practices**
1. **Examples as Fuel**  
   - *What*: Feed hard examples to guide reasoning.  
   - *Example*: Jasperberry automates code bug-finding by injecting expert-level examples (e.g., N+1 query errors).  

2. **Evaluations (Evals)**  
   - *What*: Test suites to measure prompt performance.  
   - *Insight*: Parahelp considers evals their "crown jewel" (not the prompt itself).  
   - *Real-World Case*: Vertical AI startups (e.g., tractor warranty bots) build evals by shadowing end-users.  

3. **Reasoning Traces**  
   - *What*: Debug LLM step-by-step thinking (e.g., Gemini 1.5’s trace output).  
   - *Use*: Identify prompt flaws by analyzing failures.  

---

### **V. Founder Insights: The "Forward-Deployed Engineer" (FDE) Model**
- **What**: Founders must deeply understand user workflows *and* tech.  
- **Why**: AI vertical agents win by embedding niche domain knowledge.  
- **Examples**:  
  - **Giger ML**: Engineers sat with support teams to optimize voice-response latency.  
  - **Happy Robot**: Founders closed 7-figure logistics deals by customizing prompts for brokers.  
- **Tactics**:  
  - Attend user meetings → tweak prompts → demo improvements → close deals.  
  - *"Blow them away with something they’ve never seen."*  

---

### **VI. LLM Personalities & Rubrics**
- **GPT-3.5/4**: "Soldier" – rigidly follows rubrics (e.g., investor scoring).  
- **Gemini 1.5**: "High-agency employee" – flexibly adapts to edge cases.  
- **Rubric Tip**: Balance structure with flexibility (e.g., "Score 0–100, but flag exceptions").  

---

### **Key Takeaways**
1. **Prompts ≈ Code**: Treat prompts as living docs optimized via iteration.  
2. **Evals > Prompts**: Quality tests trump prompt design.  
3. **Founder as FDE**: Technical founders must embed with users to build defensible AI.  
4. **Metaprompting = Kaizen**: Continuously self-improve prompts using LLMs.  

> 💡 **Starter Template for Metaprompting**:  
> *"You are an expert prompt engineer. Critique this prompt for ambiguity, structural flaws, and missed edge cases. Then, rewrite it for maximum clarity and reliability: [Your Prompt Here]"*

> **@KendallMatthews** (👍 0): 

> **@ngoclam9592** (👍 0): Hope you have a great day! Tks for ur contributions!

### 12. @pigreatlor (👍 186)
gonna use ai to summarize this podcast

> **@carloslfu** (👍 38): That’s too beta. Use it to build a YouTube video summarizing app.

> **@isaiahheyward1488** (👍 8): @@carloslfu thats actually isnt a bad idea with the amout of content i watchc lmao

> **@messenger_144** (👍 12): Seriously. Thy talk for 30 min non-stop they said nothing.  That’s because the don’t talk to the audience but they talk at them. Also they actually didn’t say anything. No need to run it thru AI. It’s quite sad. They think they had a productive discussion

> **@9642779810** (👍 0): Chuck the summary here

> **@DIZZLEBOI44** (👍 0): Hahaa which one please 😂😂

### 13. @juliebutler-f4o (👍 1)
Excellent conversation! Founders becoming Forward Deployed Engineers is an exciting metaphor. Designers and engineers are the kings/queens of this new Ai kingdom!

### 14. @OmarIbannez (👍 1)
4:40 What I have been doing is small DSLs per project and a jinja render/parser to build the customer specific prompts

### 15. @sweetytripathi4254 (👍 15)
I just pause the video and took a notebook and pen to write all the  ideas there is so much useful information in this, just by listening you can’t absorb all😅

> **@damnjjwtf** (👍 3): copy and paste the transcript into ur AI. 🤖

> **@user-ko6el4ju2l** (👍 0): Me too. I feel writing it down helps with retention.

> **@kmitchll9** (👍 0): You can also tell Google's Gemini to summarize a video for you by typing "@youtube summarize <link to the youtube video>"

### 16. @nkpSK8ER (👍 1)
Super intriguing video! One thing I need to spend a little bit more time on is developing evals for my own systems! Apparently that's the gold nugget!

### 17. @deboraledasouza (👍 1)
When I am working I really like to use the "Be Hyper-Specific & Detailed", after doing so I get a very specified agent for my projects only prompting and guiding the LLM.

### 18. @iainmackenzieUK (👍 3)
SO Engaging - powerful and inspiring info - 
Even though you are all way above me in this field, I feel you are promoting understanding and access - Thanks again !

### 19. @banyt9245 (👍 0)
An irony in the age of AI, lot of people don't take time to explain how the team understands it and ruin their time and many of these people don't even want to communicate to fellow human team whom they have hired after assessing their skill, but here we are, with these same people now taking their time to type out and experiment prompts and trying to explain as if they were training their fellow human team and even take the pain to type the prompt as if they are teaching kids, simplifying the prompt, being precise, all of these where are the basics of communication which they never bothered to try with the human team. Hats off to these guys to replace fellow humans because they weren't efficient.

### 20. @amentor-u7w (👍 0)
This was such a good watch. I’ve been playing a lot with AI agents lately and yeah… keeping prompts clean and consistent is a real pain once flows start growing. I recently started using a tool called GENUM (no links, easy to find) and it honestly saved me a ton of headaches. It validates prompts automatically, shows exactly how much tokens each run eats up, and even has dev-friendly stuff like versioning and testing built in. Feels like I finally have some control instead of hoping the model doesn’t drift mid-flow.

> **@efimfime6674** (👍 0): sounds like cicd for prompting

