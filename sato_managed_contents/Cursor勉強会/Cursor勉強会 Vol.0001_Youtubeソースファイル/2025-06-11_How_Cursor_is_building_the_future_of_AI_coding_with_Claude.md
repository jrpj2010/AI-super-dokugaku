# How Cursor is building the future of AI coding with Claude

**チャンネル:** Anthropic
**公開日:** 2025-06-10
**URL:** https://www.youtube.com/watch?v=BGgsoIgbT_Y

## 説明

Cursor’s Jacob Jackson, Lukas Möller and Aman Sanger join Anthropic's Alex Albert to talk about the changing landscape of software development. 

0:00 Introduction
0:34 Cursor’s growth
1:57 Progression of models
3:09 Building Cursor with Cursor
5:17 Spectrum of features
6:45 About Background Agent
8:23 Future bottlenecks
10:35 Challenge of large production codebases
15:32 How code could evolve
17:15 Preserving engineering skills and quality amid automation
19:57 Claude 4 models 
22:33 Anthropic model development
25:42 What the future could look like
29:44 Advice for engineers

## 字幕

[00:00 - 00:01]
- I think like every facet

[00:01 - 00:02]
of producing software

[00:02 - 00:04]
I think will be kind of changed

[00:04 - 00:06]
to use AI in some way.

[00:07 - 00:08]
- Very excited to have you guys out today.

[00:08 - 00:11]
Looking forward to this
conversation for a while.

[00:11 - 00:12]
As you know, I'm Alex.

[00:12 - 00:15]
I lead our Claude Relations
here at Anthropic.

[00:15 - 00:18]
- I'm Lukas, I work on
agentic systems at Cursor.

[00:18 - 00:19]
- I'm Aman.

[00:19 - 00:21]
I'm one of the founders and I work on ML

[00:21 - 00:24]
and retrieval at Cursor.

[00:24 - 00:25]
- My name's Jacob Jackson,

[00:25 - 00:27]
I work on ML at Cursor.

[00:27 - 00:28]
- I'm very, very excited
for this conversation

[00:28 - 00:30]
and to talk a little bit about Cursor,

[00:30 - 00:31]
what you guys are building

[00:31 - 00:33]
and also how you're using Claude.

[00:33 - 00:34]
It's been a big year for Cursor,

[00:34 - 00:36]
pretty obvious to anyone

[00:36 - 00:38]
that's been following
along the AI industry.

[00:38 - 00:40]
You guys have scaled now to
over $300 million revenue

[00:40 - 00:42]
in just over a year.

[00:42 - 00:43]
Pretty crazy millions of developers

[00:43 - 00:45]
are now using Cursor.

[00:45 - 00:47]
What's changed in your opinion

[00:47 - 00:50]
and how is today in the version

[00:50 - 00:53]
of Cursor today different
than it was a year ago?

[00:53 - 00:57]
- Yeah, I think there a few
big things that have changed.

[00:57 - 01:01]
I mean there's always been
this massive overhang in,

[01:01 - 01:05]
given the current level
of the language models,

[01:05 - 01:06]
how much you can do with them

[01:06 - 01:08]
and I think Cursor was probably

[01:08 - 01:10]
one of the first companies
at least in coding

[01:10 - 01:12]
to be able to close that gap a bit

[01:12 - 01:13]
with a number of different features.

[01:13 - 01:14]
And then in turn,

[01:14 - 01:15]
you've also seen these models get much,

[01:15 - 01:16]
much better at coding

[01:16 - 01:18]
and I think 3.5 Sonnet was like

[01:18 - 01:20]
the first clear example of this

[01:20 - 01:23]
or this kind of step function
better in programming.

[01:23 - 01:24]
And so before then,

[01:24 - 01:27]
Cursor is really useful at things like

[01:27 - 01:28]
tab completion, right,
predicting your next edit.

[01:28 - 01:29]
And that alone was,

[01:29 - 01:31]
you know, growing fairly quickly

[01:31 - 01:32]
and then editing within single files.

[01:32 - 01:33]
But we did see

[01:33 - 01:35]
that when you kind of mix the intelligence

[01:35 - 01:38]
of a model like 3.5
Sonnet with a few other

[01:38 - 01:40]
kind of custom models we use for retrieval

[01:40 - 01:42]
and then applying the edits
made by this larger model,

[01:42 - 01:43]
you now have the ability

[01:43 - 01:44]
to do kind of multi file edits.

[01:44 - 01:46]
I think that was kind of the step function

[01:46 - 01:48]
that resulted in mass adoption of Cursor

[01:48 - 01:50]
and since then it's been a mix

[01:50 - 01:51]
of the models getting
better than us trying

[01:51 - 01:55]
to under the hood get better

[01:55 - 01:57]
and better with like how far
we can push these models.

[01:57 - 01:59]
- And was that a natural progression,

[01:59 - 02:00]
something that kind of just arose

[02:00 - 02:04]
or did you guys notice when 3.5 Sonnet

[02:04 - 02:05]
that first one came out

[02:05 - 02:06]
that, holy cow, now we can all

[02:06 - 02:08]
of a sudden do all these different things

[02:08 - 02:10]
that weren't possible before?

[02:10 - 02:12]
What did that kind of look like?

[02:12 - 02:14]
- It did feel somewhat gradual.

[02:14 - 02:16]
Like there are these
steps in model quality,

[02:16 - 02:19]
but you saw hints of it with you know,

[02:19 - 02:20]
the prior state of the art model.

[02:20 - 02:23]
In fact, we've been notoriously bad

[02:23 - 02:25]
at taste testing these

[02:25 - 02:26]
models just because you know,

[02:26 - 02:28]
the way we use them is very different

[02:28 - 02:29]
than when you put it

[02:29 - 02:31]
out into the world to
see how others use it.

[02:31 - 02:32]
But there are just hints

[02:32 - 02:33]
of over time each kind of new model

[02:33 - 02:34]
that came out was better

[02:34 - 02:37]
and better at being able to reason,

[02:37 - 02:39]
do more agentic types of coding

[02:39 - 02:41]
and then it's a lot of tinkering

[02:41 - 02:43]
and trying lots of
things, seeing what works,

[02:43 - 02:44]
seeing what fails.

[02:44 - 02:47]
Yeah, I think Sonnet was
probably the first one

[02:47 - 02:48]
where we were able to make the multi-file

[02:48 - 02:50]
kinda interaction really work well.

[02:50 - 02:51]
And since then there's been a number

[02:51 - 02:54]
of step functions including
like tool use, right?

[02:54 - 02:54]
And then you can actually

[02:54 - 02:55]
have these models act like

[02:55 - 02:56]
real agents within the editor.

[02:56 - 02:57]
- Hmm, I see.

[02:57 - 02:59]
So the progression of the new models,

[02:59 - 03:02]
new capabilities over time kind of allows

[03:02 - 03:04]
for further tinkering, exploring,

[03:04 - 03:06]
which then rolls back
into your product in some

[03:06 - 03:08]
degree and allows you
to build new features.

[03:08 - 03:09]
- Yeah.

[03:09 - 03:10]
- That's interesting

[03:10 - 03:12]
and kind of parlays into
this next question I want

[03:12 - 03:14]
to hit at which is I've heard many stories

[03:14 - 03:18]
of how your team is using
Cursor to build Cursor,

[03:18 - 03:20]
it's in this like self-improving

[03:20 - 03:21]
recursive feedback loop.

[03:21 - 03:23]
First off, maybe you can dive

[03:23 - 03:23]
into a little bit of how

[03:23 - 03:25]
that looks and on a day-to-day,

[03:25 - 03:27]
what does that look like within Cursors

[03:27 - 03:28]
you guys are working on

[03:28 - 03:29]
building new features?

[03:29 - 03:30]
- Yeah, I think it very much depends

[03:30 - 03:32]
on the individual like

[03:32 - 03:33]
yeah use cases for each employee

[03:33 - 03:36]
and I think it also very
much depends on what part

[03:36 - 03:37]
of the product you might be working on

[03:37 - 03:40]
and what kind of stage that part is in.

[03:40 - 03:41]
So I think for like initially

[03:41 - 03:42]
laying out some code base,

[03:42 - 03:44]
some new feature, it's very, very useful

[03:44 - 03:46]
to just like use the Agent
feature to kind of get

[03:46 - 03:48]
that started and then to maybe use

[03:48 - 03:49]
the thinking models

[03:49 - 03:52]
to like look at individual
box that you might be facing

[03:52 - 03:54]
and then for making
like very precise edits,

[03:54 - 03:55]
I think that's,

[03:55 - 03:58]
it's a lot of tap also

[03:58 - 04:00]
and then when initially getting
started with a code base

[04:00 - 04:03]
that one might not be too
knowledgeable about that

[04:03 - 04:05]
using kind of the QA
features a lot using a lot

[04:05 - 04:07]
of search and I think
that's also something

[04:07 - 04:09]
that Claude 3.7

[04:09 - 04:12]
and 3.5 also has been excelling at

[04:12 - 04:13]
doing research in a code base

[04:13 - 04:14]
and figuring out how certain

[04:14 - 04:16]
things interact with each other.

[04:16 - 04:17]
- I see, so using these features

[04:17 - 04:19]
to explore your code bases makes

[04:19 - 04:20]
the process easier then you

[04:20 - 04:22]
learn as you're using these features

[04:22 - 04:24]
that oh there's a deficiency in this area,

[04:24 - 04:25]
we should go work on that.

[04:25 - 04:26]
- Yeah, easier I think Cursor's

[04:26 - 04:27]
it's very much driven by

[04:27 - 04:29]
kind of solving our own problems

[04:29 - 04:30]
and kind of figuring out

[04:30 - 04:32]
where we struggle solving problems

[04:32 - 04:33]
and making Cursor better

[04:33 - 04:35]
and then yeah, figuring
out what we can do there

[04:35 - 04:37]
and then experimenting a lot.

[04:37 - 04:38]
We very much have this philosophy

[04:38 - 04:41]
of like everybody can just try things

[04:41 - 04:44]
and try adding new features to the product

[04:44 - 04:46]
and then see internally how they are used

[04:46 - 04:48]
and what kind of feedback they gather.

[04:48 - 04:49]
- Do you think there on maybe

[04:49 - 04:51]
of a more meta level there's an advantage

[04:51 - 04:54]
to being your own best
customer internally?

[04:54 - 04:56]
- I think 100%.

[04:56 - 04:57]
I think that's how we're able

[04:57 - 04:59]
to move really quickly
in building new features

[04:59 - 05:02]
and then throwing away things
that clearly don't work

[05:02 - 05:04]
because we can be really
honest to ourselves

[05:04 - 05:06]
of whether we find it useful

[05:06 - 05:09]
and then not have to ship it
out to users, kind of track

[05:09 - 05:11]
how people use it before deciding

[05:11 - 05:12]
to go ahead with a feature

[05:12 - 05:14]
and I think it just speeds
up the iteration loop

[05:14 - 05:16]
for for building features.

[05:16 - 05:19]
Yeah, going back to overall
how we use AI to program,

[05:19 - 05:21]
it feels like, I mean there's a lot

[05:21 - 05:22]
of diversity within the company

[05:22 - 05:24]
and how different people use it.

[05:24 - 05:25]
I think it differs first in like

[05:25 - 05:27]
the kind of work you're doing.

[05:27 - 05:30]
So, you know, there are a
number of people that will

[05:30 - 05:32]
for example, be working in pieces

[05:32 - 05:34]
of the code base they're
really familiar with, right?

[05:34 - 05:37]
And at that point when you
have it all in your head,

[05:38 - 05:39]
it's often faster for you

[05:39 - 05:41]
to kind of convey intent just

[05:41 - 05:43]
by kind of typing code

[05:43 - 05:45]
and then for that Tab is really

[05:45 - 05:46]
useful 'cause kind of speeds you up there.

[05:46 - 05:47]
But then when you're in places

[05:47 - 05:49]
where you're less familiar

[05:49 - 05:51]
or you need to write out a lot of code,

[05:51 - 05:53]
you can kind offload a lot of that

[05:53 - 05:55]
and often some of the reasoning

[05:55 - 05:57]
to these models and then, you know,

[05:57 - 05:58]
as you got to places

[05:58 - 05:58]
where you're really unfamiliar

[05:58 - 06:00]
with Lukas is describing

[06:00 - 06:01]
and you're kind of coming
into a new code base,

[06:01 - 06:04]
it's just there's this
massive step function

[06:04 - 06:05]
that you get from using these models

[06:05 - 06:07]
and what we kind of see is over time

[06:07 - 06:08]
as the models get better is

[06:08 - 06:09]
and as Cursor gets better

[06:09 - 06:11]
using these models you do a better

[06:11 - 06:12]
and better job of when you're more

[06:12 - 06:13]
in flowing when you have

[06:13 - 06:14]
more knowledge of the code base.

[06:14 - 06:15]
- So there's a variation

[06:15 - 06:17]
in when a feature is most

[06:17 - 06:18]
applicable to like your use case

[06:18 - 06:19]
and it kinda is like almost

[06:19 - 06:21]
a spectrum to some degree.

[06:21 - 06:23]
- Yeah like the spectrum on one end is Tab

[06:23 - 06:25]
for when you're completely in control

[06:25 - 06:26]
and you know what you're doing

[06:26 - 06:27]
then it goes to Command K

[06:27 - 06:29]
where you're editing
a single given region,

[06:29 - 06:30]
maybe a whole file

[06:30 - 06:32]
and then at the other end you have Agent

[06:32 - 06:34]
which is quite good for, you know,

[06:34 - 06:36]
editing multiple files

[06:36 - 06:37]
and then at the very end you get

[06:37 - 06:38]
kind of have this background agent

[06:38 - 06:39]
which we've been working on

[06:39 - 06:44]
and that can be useful for
basically doing entire prs.

[06:44 - 06:45]
- You guys just released a preview

[06:45 - 06:46]
of background agent.

[06:46 - 06:47]
What is background agent?

[06:47 - 06:48]
- I think it's clear

[06:48 - 06:49]
that the models are getting better

[06:49 - 06:52]
and better at doing end-to-end tasks

[06:52 - 06:53]
but they're not quite at 100%

[06:53 - 06:55]
and I think it'll take a while

[06:55 - 06:56]
to get to 100%.

[06:56 - 06:58]
So the way you speed up developers,

[06:58 - 06:59]
right, is you let them do

[06:59 - 07:00]
these things in parallel but as opposed

[07:00 - 07:03]
to kind of letting it just go

[07:03 - 07:05]
in the background then spin up a PR

[07:05 - 07:07]
that you look at in
GitHub if it's only 90%

[07:07 - 07:08]
of the way there you want

[07:08 - 07:10]
to go in and then take control

[07:10 - 07:12]
and do the rest of it and
then you want to use you know,

[07:12 - 07:14]
the features of Cursor
in order to do that.

[07:14 - 07:16]
So really being able to quickly

[07:16 - 07:17]
move between the background

[07:17 - 07:20]
and the foreground is really important

[07:20 - 07:20]
and I think like, you know,

[07:20 - 07:23]
we're in the early innings of this feature

[07:23 - 07:27]
and I can imagine that there
are lots of interesting ways

[07:27 - 07:30]
of being able to operate
for example on three

[07:30 - 07:31]
or four changes at the same time

[07:31 - 07:32]
and then quickly kind of
popping them to the background

[07:32 - 07:35]
and then moving them into the foreground.

[07:35 - 07:37]
It'll be interesting
to see how this changes

[07:37 - 07:39]
how people use Cursor and just like

[07:39 - 07:41]
develop the software in general.

[07:41 - 07:42]
- I mean we see background
agents basically

[07:42 - 07:44]
as a new primitive that we can use in like

[07:44 - 07:46]
so many different places
and the current way

[07:46 - 07:48]
of exposing it is quite straightforward

[07:48 - 07:50]
where you can just get a prompt

[07:50 - 07:52]
and push it to the background

[07:52 - 07:54]
and then it independently
iterates on that.

[07:54 - 07:56]
But there can be like
many more integrations

[07:56 - 07:58]
how these things can be spawned off

[07:58 - 08:00]
and I think there's a lot of product

[08:00 - 08:02]
that you want can make from that.

[08:02 - 08:03]
- So is this taking your code base

[08:03 - 08:06]
and putting it in a virtual machine

[08:06 - 08:09]
or what exactly is that
transfer that's happening?

[08:09 - 08:10]
- Exactly, yeah.
- Okay.

[08:10 - 08:11]
- We have small enough
independent environments

[08:11 - 08:15]
that have all the developer
environment utilities

[08:15 - 08:16]
already installed

[08:16 - 08:18]
and then the agent can use those

[08:18 - 08:20]
and it has all the VS code extensions

[08:20 - 08:21]
that are available

[08:21 - 08:23]
and through that it can get et cetera.

[08:23 - 08:26]
- I know we're kind of
witnessing this trend

[08:26 - 08:27]
of asynchronous tasks,

[08:27 - 08:31]
background tasks across many
different things from coding

[08:31 - 08:33]
to like research, in your view,

[08:33 - 08:34]
what does that look like

[08:34 - 08:37]
as this progresses to where
we might have thousands

[08:37 - 08:39]
of these agents potentially going off

[08:39 - 08:41]
and you could see like whole teams

[08:41 - 08:43]
of agents attacking a problem
all in the background.

[08:43 - 08:45]
What does that future look like?

[08:45 - 08:47]
- I think the next bottleneck you'll run

[08:47 - 08:49]
into is verification of software,

[08:49 - 08:51]
verification of code,

[08:51 - 08:52]
models getting really,

[08:52 - 08:54]
really good at generating writing lots

[08:54 - 08:59]
of code but let's say developers spend,

[08:59 - 09:00]
I'll throwout some random-ish numbers,

[09:00 - 09:03]
but 30% of their time writing code

[09:03 - 09:04]
or 30% of their time reviewing code,

[09:04 - 09:06]
70% of their time writing code.

[09:06 - 09:08]
If you completely solve
writing code you still haven't

[09:08 - 09:10]
really sped up software engineering

[09:10 - 09:11]
by more than a factor of three.

[09:11 - 09:13]
Yeah, so I think we're going

[09:13 - 09:14]
to need to figure out how

[09:14 - 09:17]
to make it easier for
people to review code

[09:17 - 09:19]
and how to be confident

[09:19 - 09:20]
that the agent's making the changes

[09:20 - 09:22]
that are not just correct,
'cause correct can

[09:22 - 09:23]
be vague, right?

[09:23 - 09:25]
It may just be in the thing you specified,

[09:25 - 09:26]
it was under specified enough

[09:26 - 09:29]
that it actually did like
the best that was possible

[09:29 - 09:31]
for even you know, the best
human programmers to do

[09:31 - 09:33]
but what it actually

[09:33 - 09:35]
what you had in your mind's eye

[09:35 - 09:37]
and so making the process for you much,

[09:37 - 09:39]
much better I think will be
really, really important.

[09:39 - 09:40]
And it's something

[09:40 - 09:42]
that we're really interested in as well.

[09:42 - 09:44]
- Any early ideas there
on what that looks like?

[09:44 - 09:45]
- I think there are a few floating

[09:45 - 09:48]
around from various people at the company.

[09:48 - 09:51]
One that Michael, our CEO who really,

[09:51 - 09:53]
really likes is the idea

[09:53 - 09:55]
of operating in a different

[09:55 - 09:56]
representation of the code base.

[09:56 - 09:59]
So maybe it looks like pseudo code

[09:59 - 10:02]
and if you can represent changes

[10:02 - 10:04]
in this really concise way

[10:04 - 10:05]
and you have guarantees

[10:05 - 10:06]
that it maps cleanly

[10:06 - 10:08]
onto the actual changes made

[10:08 - 10:10]
in the real software,

[10:10 - 10:12]
that should shorten the
time of verification a ton.

[10:12 - 10:14]
But that's one possible route.

[10:14 - 10:16]
I think, so like the
reason why quote unquote

[10:16 - 10:17]
vibe coding works often

[10:17 - 10:19]
is because the process

[10:19 - 10:21]
of verification is like really easy

[10:21 - 10:22]
since all it is just

[10:22 - 10:24]
kind of playing with the software, right?

[10:24 - 10:26]
You make a change and you actually play

[10:26 - 10:28]
with whatever software you've built.

[10:28 - 10:31]
I think it's just gonna be
really hard to do for real

[10:31 - 10:32]
production code bases

[10:32 - 10:35]
and cracking that problem
is really important.

[10:35 - 10:37]
- That's a good question
around the difference

[10:37 - 10:40]
between like a standalone
thing they might be vibe coding

[10:40 - 10:44]
versus a production code
base that has millions

[10:44 - 10:46]
and millions of lines of files.

[10:46 - 10:47]
How do you guys see the difference

[10:47 - 10:47]
between those two in your

[10:47 - 10:50]
mind and where are we at in terms

[10:50 - 10:53]
of like working within
them with current models?

[10:53 - 10:54]
- I think that's something
we've thought about a lot

[10:54 - 10:56]
with background agent

[10:56 - 10:59]
because something that's really simple

[10:59 - 11:01]
and obviously should be very easy

[11:01 - 11:04]
with these models is
I have this test here,

[11:05 - 11:07]
the test is currently failing,

[11:07 - 11:09]
can you fix the code so that it passes

[11:09 - 11:12]
and it's like okay how
do we make that happen?

[11:12 - 11:14]
Well the model needs to
be able to run the test

[11:14 - 11:17]
and if you have a very simple repository,

[11:17 - 11:18]
that's very simple,

[11:18 - 11:19]
but when you start getting

[11:19 - 11:21]
to these larger enterprise code bases,

[11:21 - 11:22]
it can be complex

[11:22 - 11:26]
to get the dependencies set up properly so

[11:26 - 11:27]
that the model can run the tests.

[11:27 - 11:29]
But this is something we've thought about

[11:29 - 11:30]
with background agent a lot is

[11:30 - 11:34]
how do you make this
process straightforward

[11:34 - 11:36]
for the developer to
create this environment

[11:36 - 11:40]
where the agent can run the test

[11:40 - 11:42]
and then make it repeatable
so you can snapshot it

[11:42 - 11:43]
and you can quickly update it

[11:43 - 11:46]
when your code state changes

[11:46 - 11:48]
and this unlocks the ability to, you know,

[11:48 - 11:51]
spin off a VM in the background,

[11:51 - 11:53]
have the model make experiments, you know,

[11:53 - 11:55]
and some of them will make it pass

[11:55 - 11:56]
and some of them won't.

[11:56 - 11:58]
And then eventually you
as the developer only have

[11:58 - 12:00]
to worry about the case where it succeeded

[12:00 - 12:03]
and there's just a lot
of infrastructure there

[12:03 - 12:05]
and a lot of user experience

[12:05 - 12:06]
that is important to get right.

[12:06 - 12:07]
- Mm hmm, mm hmm.

[12:07 - 12:09]
- Yeah. And then I think there are other

[12:09 - 12:10]
fundamental problems.

[12:10 - 12:14]
So one way is you get the model to try

[12:14 - 12:15]
to pass the test, right?

[12:15 - 12:17]
That's how you can kind
of guarantee maybe,

[12:17 - 12:19]
some sort of correctness.

[12:19 - 12:21]
But with these large code bases,

[12:21 - 12:21]
you're often dealing

[12:21 - 12:24]
with things that almost
look like their own language

[12:24 - 12:26]
where they have these kind of DSLs

[12:26 - 12:27]
within some languages

[12:27 - 12:30]
and everything is done
in this particular way

[12:30 - 12:34]
and it's really sprawled out
across millions of files,

[12:34 - 12:35]
which is hundreds of millions

[12:35 - 12:37]
of tokens potentially maybe more.

[12:37 - 12:38]
We've done a number of things

[12:38 - 12:39]
to make this much better,

[12:39 - 12:41]
which include training retrieval models

[12:41 - 12:44]
and then integrating other
sources of context as well.

[12:44 - 12:46]
For example, you can imagine there's a lot

[12:46 - 12:48]
of richness in the recent changes

[12:48 - 12:50]
that you've made,

[12:50 - 12:51]
when editing your code
it kind of indicates

[12:51 - 12:52]
what you're working towards.

[12:52 - 12:54]
There could be richness in the changes

[12:54 - 12:56]
that other people on your team

[12:56 - 12:58]
have made in your code base,

[12:58 - 13:00]
especially recently and
using those as hints.

[13:00 - 13:03]
But I do think it's still
this really hard fundamental

[13:03 - 13:05]
problem of you know,

[13:05 - 13:06]
just giving the model access

[13:06 - 13:08]
to really good retrieval
feels insufficient

[13:08 - 13:12]
for having the model really
understand the code base.

[13:12 - 13:13]
I think it's a problem

[13:13 - 13:14]
we're really interested in solving.

[13:14 - 13:15]
- Mm hmm.

[13:15 - 13:17]
Probably through some combination

[13:17 - 13:20]
of like memory plus long context and.

[13:20 - 13:21]
- Yeah.
- Other things.

[13:21 - 13:24]
- I think memory is one interesting

[13:24 - 13:25]
approach people have taken

[13:25 - 13:27]
to get the model to kind of learn

[13:27 - 13:28]
from your usage of it

[13:28 - 13:30]
but it also feels like, you know,

[13:30 - 13:32]
it's a small boost in performance

[13:32 - 13:34]
and it feels fairly primitive relative

[13:34 - 13:35]
to like where we need to
be in order to get things

[13:35 - 13:38]
that are excellent at large code bases.

[13:38 - 13:39]
- Yeah and large code basis,

[13:39 - 13:40]
it's not only just about

[13:40 - 13:41]
getting the test to pass

[13:41 - 13:43]
but it also is about
doing it the right way.

[13:43 - 13:45]
Like looking at the existing code

[13:45 - 13:47]
and making that match the new code

[13:47 - 13:49]
and bringing it into the correct structure

[13:49 - 13:51]
and kind of using all
the guidelines correctly

[13:51 - 13:54]
and like we've been trying
very hard to kind of make

[13:54 - 13:56]
that happen through Cursor rules,

[13:56 - 13:58]
through integrating different
types of context, et cetera.

[13:58 - 13:59]
- Hmm.
- Yeah, like I could write

[13:59 - 14:01]
a deep bounce function from

[14:01 - 14:03]
scratch and just use that and
that would make the test pass

[14:03 - 14:04]
but that's not the right way to do it.

[14:04 - 14:06]
You should use one of the DeBounces

[14:06 - 14:07]
and maybe there's three

[14:07 - 14:09]
or four DeBounce functions
used across the code base.

[14:09 - 14:11]
How do you know what
the right one is to use?

[14:11 - 14:13]
Maybe the only reason
like someone knows is

[14:13 - 14:15]
because they message someone on

[14:15 - 14:16]
Slack that this is how you do it.

[14:16 - 14:20]
And so I think yeah it
gets really, really hard

[14:20 - 14:21]
to solve these problems

[14:21 - 14:23]
with extremely large code bases.

[14:23 - 14:25]
- That's interesting.

[14:25 - 14:26]
So there's also kind of an element

[14:26 - 14:30]
to the org knowledge that lives outside

[14:30 - 14:31]
of the code base itself

[14:31 - 14:33]
and that like plays a major
factor sometimes in some

[14:33 - 14:34]
of these decisions,

[14:34 - 14:36]
especially as you're operating on-

[14:36 - 14:37]
- Yeah.
- Large code bases.

[14:37 - 14:40]
- I don't think that's
the bottleneck today

[14:40 - 14:41]
but I think if you solve,

[14:41 - 14:44]
like if you made models like perfect

[14:44 - 14:45]
and kind of knowing the code base,

[14:45 - 14:46]
- Yeah.

[14:46 - 14:48]
- I think you'll immediately,
like you'll maybe get like a

[14:48 - 14:50]
5x maybe 10x improvement

[14:50 - 14:51]
but you can't get farther than that

[14:51 - 14:53]
because now it's
completely bottlenecked by,

[14:53 - 14:55]
how much does it know these things

[14:55 - 14:57]
that are never ever explicitly mentioned

[14:57 - 14:59]
or shown in like the PRs

[14:59 - 15:01]
and the actual state of the code.

[15:01 - 15:02]
- Mm hmm.

[15:02 - 15:04]
- And then there also
just outside concerns

[15:04 - 15:06]
from the business side
from sales, et cetera.

[15:06 - 15:07]
And those kind of have

[15:07 - 15:10]
to be brought into
Cursor to make that work.

[15:10 - 15:11]
- Right.

[15:11 - 15:13]
So some future version of Cursor then has

[15:13 - 15:15]
to plug into many more systems-

[15:15 - 15:16]
- Yeah.
- And things.

[15:16 - 15:17]
- To be clear I think like, you know,

[15:17 - 15:19]
that's like still some ways a way for

[15:19 - 15:21]
that to be like really, really

[15:21 - 15:22]
critical relative to the other things.

[15:22 - 15:25]
I think we have a long ways
to go still on just using

[15:25 - 15:27]
the interactions users have like details

[15:27 - 15:28]
of their code base

[15:28 - 15:29]
and commits made in order

[15:29 - 15:31]
to make Cursor much better.

[15:31 - 15:32]
- One interesting thing I've started

[15:32 - 15:35]
to notice at least with
like webpages and content,

[15:35 - 15:37]
is people trying to now think about how

[15:37 - 15:39]
to optimize the page

[15:39 - 15:42]
for an LLM reading and browsing it.

[15:42 - 15:44]
Do you think we're gonna
see something similar maybe

[15:44 - 15:47]
with code and in that code could transform

[15:47 - 15:48]
how it usually is written

[15:48 - 15:49]
and what it looks like if you're writing

[15:49 - 15:51]
for primarily human reviewers

[15:51 - 15:55]
and humans working within
a code base to models?

[15:56 - 15:58]
- I think that's totally the case already.

[15:58 - 16:01]
I mean API design is
already adjusting such

[16:01 - 16:02]
that LMS are more comfortable with that.

[16:02 - 16:05]
For example, changing not only

[16:05 - 16:06]
the version number internal

[16:06 - 16:08]
but making it like very
visible to the model

[16:08 - 16:10]
that this is a new version
of some software just

[16:10 - 16:13]
to make sure that the
API is used correctly.

[16:13 - 16:16]
And I think that the same also holds,

[16:16 - 16:18]
for like normal code basis

[16:18 - 16:19]
and internal libraries as well

[16:19 - 16:21]
where like structuring the code in a way

[16:21 - 16:24]
where one doesn't have to
go through like end level

[16:24 - 16:26]
of interactions but maybe
just through two levels

[16:26 - 16:29]
of interaction makes, yeah,

[16:29 - 16:30]
LLM models better

[16:30 - 16:32]
at working with that code base.

[16:32 - 16:33]
- Right.

[16:33 - 16:36]
- But I think ultimately the principles

[16:36 - 16:38]
of clean software are not

[16:38 - 16:40]
that different when you want it

[16:40 - 16:44]
to be read by people and by models.

[16:44 - 16:46]
You know, when you are trying

[16:46 - 16:47]
to write clean code you want to,

[16:47 - 16:48]
you know, not repeat yourself,

[16:48 - 16:52]
not make things more complicated
than they need to be.

[16:52 - 16:54]
And that is just important for models

[16:54 - 16:56]
as it is for people.

[16:56 - 16:59]
And I think taste in code

[16:59 - 17:01]
and what's a clean solution

[17:01 - 17:02]
that's not more complicated than it needs

[17:02 - 17:05]
to be is actually gonna
become even more important

[17:05 - 17:06]
as these models get better

[17:06 - 17:09]
because it will be easier
to write more and more code

[17:09 - 17:10]
and so it'll be more

[17:10 - 17:14]
and more important to
structure it in a tasteful way.

[17:14 - 17:17]
- That's a really good point on taste.

[17:17 - 17:18]
Taste is kind of this thing

[17:18 - 17:20]
that I feel like maybe
some people are born

[17:20 - 17:21]
with more taste than others,

[17:21 - 17:24]
but generally you kind of
develop taste through experience

[17:24 - 17:27]
and learning what works
and seeing failures

[17:27 - 17:29]
and seeing successes.

[17:29 - 17:33]
In a world where we're
having AI write more

[17:33 - 17:33]
and more of our code,

[17:33 - 17:35]
there's been real pushback against

[17:35 - 17:38]
some that say, oh you're
gonna make programmers lazy

[17:38 - 17:41]
or you're not gonna give
juniors a chance to learn

[17:41 - 17:42]
what it actually looks like

[17:42 - 17:45]
to work within a large code
base and do all these things.

[17:45 - 17:47]
How do you think about balancing

[17:47 - 17:49]
this sort of automation

[17:49 - 17:50]
or assistance in this case

[17:50 - 17:53]
with also preserving the
core engineering skills

[17:53 - 17:54]
that maybe a software
engineer has to go through,

[17:54 - 17:57]
those like trials and tribulations?

[17:57 - 18:01]
- I think these tools are
very good educationally

[18:01 - 18:04]
as well and they can help you
become a great programmer.

[18:04 - 18:05]
You know, if you have a question

[18:05 - 18:06]
about how something works,

[18:06 - 18:09]
if you want some concept explained to you,

[18:09 - 18:10]
now you can just,

[18:10 - 18:11]
you know, press command L

[18:11 - 18:13]
and ask Claude, you know, what is this?

[18:13 - 18:15]
How does it work? Can
you explain it to me?

[18:15 - 18:17]
And I think that's very valuable.

[18:17 - 18:20]
It does make it easier to write more code

[18:20 - 18:25]
and do more stuff and
that can result in higher

[18:25 - 18:27]
and lower quality code being out there.

[18:27 - 18:31]
That is true, but I think
in general it's a very,

[18:31 - 18:34]
very powerful tool that
will raise the bar.

[18:34 - 18:37]
- I think quality comes
very much from iterating

[18:37 - 18:39]
quickly, making mistakes,

[18:39 - 18:40]
figuring out why certain things fail.

[18:40 - 18:42]
And I think models vastly accelerate

[18:42 - 18:43]
this iteration process

[18:43 - 18:46]
and can actually through
that make you learn more

[18:46 - 18:47]
quickly what works and what doesn't.

[18:47 - 18:48]
So I think in the long term,

[18:48 - 18:51]
it's a super helpful tool for

[18:51 - 18:53]
developers just getting
started and working on bigger

[18:53 - 18:54]
and bigger projects

[18:54 - 18:56]
and figuring out what
works and what doesn't.

[18:56 - 18:59]
- Yeah, I think it'll be
really interesting to see

[18:59 - 19:01]
how programming evolves.

[19:01 - 19:04]
I think you'll still for
a very long time need

[19:04 - 19:07]
to have the engineers that
know the details right,

[19:07 - 19:09]
can go into the weeds.

[19:09 - 19:12]
I wonder how much you'll
start to see people

[19:12 - 19:15]
that are now learning
programming who don't know many

[19:15 - 19:17]
of the details but can
still be fairly effective.

[19:17 - 19:19]
I think today you still do

[19:19 - 19:20]
need to know a lot of the details.

[19:20 - 19:22]
I think over time you might have a class

[19:22 - 19:24]
of software engineers
that need to know very few

[19:24 - 19:25]
of like the low level details

[19:25 - 19:26]
and it still operate at a higher level

[19:26 - 19:28]
and maybe it looks a lot
more like kind of thinking

[19:28 - 19:30]
through like the taste is like more

[19:30 - 19:32]
in kind of UX taste, right?

[19:33 - 19:34]
Like let's say you're trying

[19:34 - 19:36]
to build something like a notion, right?

[19:36 - 19:37]
At the end of the day,

[19:37 - 19:38]
I don't think you can offload

[19:38 - 19:40]
that entire thing to the language model.

[19:41 - 19:42]
You need to kind of describe like,

[19:42 - 19:44]
okay when I do this type

[19:44 - 19:46]
of interaction then I expect it

[19:46 - 19:47]
to pop up in this particular way, right?

[19:47 - 19:49]
Maybe you don't have to get to the details

[19:49 - 19:51]
of writing pure software that does that,

[19:51 - 19:53]
but still describing those interactions,

[19:53 - 19:54]
describing the way

[19:54 - 19:55]
this thing roughly works.

[19:55 - 19:56]
That is a form of programming.

[19:56 - 19:59]
- Switching gears a little
bit on the topic of models,

[19:59 - 20:01]
so we just recently,

[20:01 - 20:02]
by the time this video comes out,

[20:02 - 20:04]
Claude Opus 4

[20:04 - 20:06]
and Claude Sonnet 4 will
be out into the world.

[20:06 - 20:09]
Love to hear your guys'
thoughts on the new models

[20:09 - 20:10]
and how you're starting to think about

[20:10 - 20:12]
integrating them within Cursor.

[20:12 - 20:15]
- I mean we've really
enjoyed the new models.

[20:15 - 20:18]
I think we were pretty shocked
trying out the new Sonnet

[20:18 - 20:21]
because I think 3.7 is a fantastic model.

[20:21 - 20:23]
It was better at agentic coating

[20:23 - 20:26]
but everyone knew it kind
of had these deficits right,

[20:26 - 20:28]
where it would maybe be a little bit

[20:28 - 20:30]
too overeager-
- Like to do a lot.

[20:30 - 20:32]
- Yeah it did.

[20:32 - 20:32]
Would like to change

[20:32 - 20:33]
the test sometimes,

[20:33 - 20:34]
that they passed.
- Yeah, yeah.

[20:34 - 20:39]
- We found that Sonnet
4 has effectively fixed

[20:39 - 20:40]
all those, it is much better

[20:40 - 20:41]
and then the intelligence

[20:41 - 20:42]
has also been a big step up

[20:42 - 20:45]
where you know, you've seen other models

[20:45 - 20:47]
that are kind of steps up in intelligence,

[20:47 - 20:49]
maybe not as like strong as

[20:49 - 20:51]
agentic coding but like you know,

[20:51 - 20:52]
O3 is an example

[20:52 - 20:53]
and we found it goes toe-to-toe with

[20:53 - 20:55]
that despite being you know,

[20:55 - 20:56]
a much cheaper model.

[20:56 - 20:58]
And so we're extremely excited for Opus

[20:58 - 21:01]
because we think it'll be a fantastic

[21:01 - 21:02]
agent to use in the background.

[21:02 - 21:06]
- Yeah, that's awesome
to hear the test writing

[21:06 - 21:07]
and overeagerness things

[21:07 - 21:08]
are things that we were trying

[21:08 - 21:10]
to tackle pretty intensely
with these models

[21:10 - 21:14]
and concept of like
reward hacking in which

[21:14 - 21:16]
the models will find some way

[21:16 - 21:18]
to basically take a shortcut

[21:18 - 21:20]
to get to the final reward in rl.

[21:20 - 21:22]
So we've done a lot of
work to cut that down.

[21:22 - 21:23]
I think we cut it down

[21:23 - 21:25]
to like 80% in these new models.

[21:25 - 21:26]
- I'm really curious to hear

[21:26 - 21:29]
how did 3.5 Sonnet come about,

[21:29 - 21:30]
'cause that felt like
the first kind of punch

[21:30 - 21:33]
of like this is like a really good coding

[21:33 - 21:34]
model for Anthropic.

[21:34 - 21:35]
- How did it come about?

[21:35 - 21:37]
We trained it.

[21:37 - 21:38]
Just, it was good.

[21:39 - 21:43]
Yeah, I think we have always
known for a while that,

[21:43 - 21:45]
I mean probably since the
genesis of the company

[21:45 - 21:47]
that we've wanted to make
models really good at coding,

[21:47 - 21:49]
it just seems important

[21:49 - 21:50]
for everything else that you do,

[21:50 - 21:53]
especially as you make more models.

[21:53 - 21:55]
3.5 Sonnet was,

[21:56 - 21:57]
I wouldn't, I mean I think 3-Opus

[21:57 - 21:58]
was a really good coding model

[21:58 - 22:00]
as well, especially for its time.

[22:00 - 22:02]
But 3.5 Sonnet was the first time

[22:02 - 22:04]
that we really put a
strong dedicated effort

[22:04 - 22:06]
to, hey, let's get these
models good at coding,

[22:06 - 22:07]
but not just specifically coding,

[22:07 - 22:11]
this sort of longer horizon
coding where it's having

[22:11 - 22:13]
to do these things like
you're mentioning earlier

[22:13 - 22:14]
in the conversation

[22:14 - 22:17]
around making edits on different files,

[22:17 - 22:19]
going off and like taking a command here,

[22:19 - 22:20]
calling a tool and then going

[22:20 - 22:22]
and making a change somewhere else.

[22:22 - 22:23]
That was the first model in which

[22:23 - 22:25]
we could kind of put all
these things together

[22:25 - 22:28]
and I think it just turned out really well

[22:28 - 22:29]
and kind of set the stage for what

[22:29 - 22:30]
our future models would be.

[22:30 - 22:32]
- And how do you guys think

[22:32 - 22:34]
about code versus other areas

[22:34 - 22:36]
where you want Sonnet to excel?

[22:36 - 22:37]
- Yeah

[22:37 - 22:37]
- And Opus to excel.

[22:39 - 22:41]
- I mean code is one of the primary areas,

[22:41 - 22:43]
but I think it's not the only area.

[22:43 - 22:45]
I think there is a good amount of transfer

[22:45 - 22:48]
that you see from models
getting really good at code

[22:48 - 22:49]
to them just getting better

[22:49 - 22:51]
at reasoning over taking many

[22:51 - 22:54]
actions and working in
this sort of agentic way.

[22:54 - 22:57]
And that carryover

[22:57 - 22:58]
is pretty nice as you're dealing

[22:58 - 23:01]
with applications that might mix in code

[23:01 - 23:03]
but also have to go retrieve
knowledge from other

[23:03 - 23:05]
places or do research.

[23:05 - 23:08]
Generally we're about just
pushing the frontier as much

[23:08 - 23:09]
as we can with our models.

[23:09 - 23:11]
Of course there is like
considerations that we make

[23:11 - 23:12]
around safety and making sure

[23:12 - 23:13]
that the models are in line

[23:13 - 23:15]
with what you as a user want

[23:15 - 23:18]
and also what we believe
the model should be doing.

[23:18 - 23:20]
But generally we want to keep pushing

[23:20 - 23:23]
the limits of what these models can do

[23:23 - 23:25]
and kind of show developers
in the world this is

[23:25 - 23:27]
what models are capable of.

[23:27 - 23:29]
So things like computer use,

[23:29 - 23:31]
when we unveiled that back in October,

[23:31 - 23:33]
that was like another
direction in which we're really

[23:33 - 23:34]
pushing forward in terms

[23:34 - 23:36]
of how can a model be good

[23:36 - 23:38]
at actually navigating something

[23:38 - 23:40]
that is a primarily a
human interface, right?

[23:40 - 23:42]
So it's not in the world of like APIs

[23:42 - 23:44]
or tool calls or anything like that.

[23:44 - 23:45]
It's literally just looking

[23:45 - 23:47]
at an image as a human would

[23:47 - 23:48]
and then having to direct

[23:48 - 23:50]
an action onto that screen.

[23:50 - 23:51]
There's also a strong part

[23:51 - 23:53]
to how we think about
these models character,

[23:53 - 23:55]
as it's known now, Amanda Askell

[23:55 - 23:57]
is one of our lead
researchers on this effort,

[23:57 - 23:59]
kind of crafting Claude's character

[23:59 - 23:59]
and we put a lot of thought

[23:59 - 24:01]
and consideration into what Claude

[24:01 - 24:03]
should feel like and sound like

[24:03 - 24:05]
and what does it mean for an AI

[24:05 - 24:08]
to play a really prominent
role in somebody's life.

[24:08 - 24:09]
Not as just a coding agent,

[24:09 - 24:12]
but as kind of like their
confidant in a sense

[24:12 - 24:13]
and an entity

[24:13 - 24:15]
that you're gonna be spending

[24:15 - 24:16]
a lot of time talking to.

[24:16 - 24:17]
So that's also really factored

[24:17 - 24:18]
into all the decisions we

[24:18 - 24:20]
make around these models
and how we train 'em.

[24:20 - 24:22]
- How does Anthropic
as a whole think about

[24:22 - 24:25]
where things are going both

[24:25 - 24:26]
in terms of software engineering

[24:26 - 24:28]
and then in terms of like research,

[24:28 - 24:30]
like in terms of how much

[24:30 - 24:33]
like these models will augment, replace,

[24:33 - 24:35]
do a lot of this work?

[24:35 - 24:36]
- Yeah, it can speak personally here.

[24:36 - 24:38]
So personally I think

[24:38 - 24:40]
that we're not gonna be replacing,

[24:40 - 24:42]
as we've been talked about earlier,

[24:42 - 24:45]
there's just like so
much more you can do now

[24:45 - 24:46]
that you have like models

[24:46 - 24:48]
that can do all this, you know,

[24:48 - 24:49]
nuts and bolts like typing

[24:49 - 24:51]
of the code basically for you.

[24:51 - 24:52]
I see this with myself too.

[24:52 - 24:55]
Like I studied computer science in college

[24:55 - 24:56]
and did software engineering

[24:56 - 24:58]
and now I feel like I'm at the point

[24:58 - 25:00]
where the models are like better

[25:00 - 25:01]
at producing code than I am,

[25:01 - 25:03]
like if I were to just like think

[25:03 - 25:04]
about doing like a lead

[25:04 - 25:06]
code problem or anything like that,

[25:06 - 25:07]
where it's like a contained environment

[25:07 - 25:09]
and the model has to write code,

[25:09 - 25:11]
it's gonna like beat me

[25:11 - 25:13]
and yet I feel like I
can do more than ever.

[25:13 - 25:15]
I can make prototypes of anything.

[25:15 - 25:16]
I can like spin up demos super,

[25:16 - 25:19]
super fast if I wanna like
show off a new concept.

[25:19 - 25:22]
It's felt very empowering
in that sense than like

[25:23 - 25:26]
taking away or dismissive
of what I've been doing.

[25:26 - 25:29]
And it is similar to
where I feel like just

[25:29 - 25:30]
because I have that knowledge

[25:30 - 25:32]
of software engineering from the past,

[25:32 - 25:34]
I can actually exploit it much better

[25:34 - 25:35]
and I can use the model,

[25:35 - 25:36]
I can push it farther

[25:36 - 25:38]
than if I just still didn't have any

[25:38 - 25:40]
idea about what code is.

[25:40 - 25:41]
Maybe on that getting more into like

[25:41 - 25:44]
the sort of fun future speculation I want

[25:44 - 25:46]
to ask like maybe a practical
question in a few years we can

[25:46 - 25:49]
come back to this one and
see how we turned out.

[25:49 - 25:51]
January 1st, 2027,

[25:51 - 25:55]
so what is that a little
less than two years from now?

[25:55 - 25:56]
What percentage of code

[25:56 - 25:59]
do you think will be AI generated

[25:59 - 26:01]
and following that, what
does the day in the life

[26:01 - 26:03]
of somebody that's
considering themselves a

[26:03 - 26:05]
developer now look like?

[26:05 - 26:08]
- I think it's similar to going back to,

[26:08 - 26:09]
let's say before I was born,

[26:09 - 26:11]
but you know, 1995

[26:11 - 26:16]
and asking a lawyer in
the future what percentage

[26:16 - 26:19]
of legal documents will be
word processor generated

[26:19 - 26:22]
and the answer is 100%

[26:22 - 26:24]
or you know, close to 100%

[26:24 - 26:27]
in that AI will be involved in almost all

[26:27 - 26:28]
of the code that gets written.

[26:28 - 26:32]
But still your role as a lawyer

[26:32 - 26:34]
or as a developer in understanding

[26:34 - 26:35]
what the code needs to do

[26:35 - 26:36]
and having taste

[26:36 - 26:39]
and guiding what is done
with the software is going

[26:39 - 26:41]
to be more important than ever.

[26:43 - 26:44]
- I mean already at Cursor

[26:44 - 26:46]
it's probably 90% plus,

[26:46 - 26:48]
but that's because a large fraction

[26:48 - 26:52]
of it is using more higher
level features like Agent.

[26:52 - 26:54]
- Yeah.
- And Command K and whatnot.

[26:54 - 26:55]
But then a lot of it is you're typing

[26:55 - 26:58]
and then Tab will as you type

[26:58 - 27:00]
do 70% of that.
- Right.

[27:00 - 27:02]
- So in the cases where
you're actually going in

[27:02 - 27:03]
and doing it manually yourself,

[27:03 - 27:05]
Tab is still doing most of those changes,

[27:05 - 27:09]
- Right, so the actual
letters typed is like a very,

[27:09 - 27:10]
very low percent.
- Yeah.

[27:10 - 27:11]
But I think like every facet

[27:11 - 27:14]
of producing software I
think will be kind of changed

[27:14 - 27:17]
to use AI in some way.
- Do you think we ever get

[27:17 - 27:18]
to a world in which you basically

[27:18 - 27:20]
have software on demand?

[27:21 - 27:22]
What does that look like?

[27:22 - 27:23]
- I think you're going

[27:23 - 27:27]
to see people building software,

[27:27 - 27:29]
people in organizational
functions, building software

[27:29 - 27:31]
who are not previously building software.

[27:31 - 27:33]
You know, like people in sales

[27:33 - 27:35]
who would not have built their own tools

[27:35 - 27:37]
before will now be building, for example,

[27:37 - 27:40]
dashboards to track
what's important to them.

[27:40 - 27:42]
And going back to how taste

[27:42 - 27:44]
becomes more important
than ever, you know,

[27:44 - 27:45]
now you can build the dashboard,

[27:45 - 27:47]
but you still need to decide

[27:47 - 27:50]
what metrics the dashboard is gonna show.

[27:50 - 27:53]
It doesn't prevent you
from having to decide that.

[27:53 - 27:57]
I think you're going
to see many more people

[27:58 - 28:00]
building their own software,

[28:00 - 28:03]
but it will be bottlenecked
on having a unique thing

[28:03 - 28:05]
that you want to do with the software

[28:05 - 28:08]
that isn't properly
served by existing needs.

[28:08 - 28:11]
- One example I like to
tell people is we've a guy,

[28:11 - 28:13]
our comms team who's actually

[28:13 - 28:16]
been like shipping bug fixes to Claude.ai,

[28:16 - 28:18]
which is just like absolutely insane.

[28:18 - 28:20]
Like he's in a completely
different part of the org,

[28:20 - 28:21]
he's not touching product at all

[28:21 - 28:23]
and yet he pops in with like a PR

[28:23 - 28:25]
and he's like asking for a stamp

[28:25 - 28:26]
and you're like, what are you doing?

[28:26 - 28:29]
And it's like, yeah, he's
using, you know, Claude code

[28:29 - 28:31]
or some coding tool with Claude

[28:31 - 28:32]
has the base model there

[28:32 - 28:36]
to like fix bugs in a
production code base.

[28:36 - 28:38]
I think that's amazing as well.

[28:38 - 28:40]
And it ties back into
this like general, hey,

[28:40 - 28:42]
if you have taste, if
you have good intuitions,

[28:42 - 28:44]
like you're just gonna
be able to do a lot.

[28:44 - 28:48]
That's kind of how I see the
world keeping progressing.

[28:48 - 28:49]
I think things will change

[28:49 - 28:51]
and like roles will look
much different in five years,

[28:51 - 28:54]
10 years, but generally

[28:54 - 28:55]
like I'm very much in favor of like,

[28:55 - 28:57]
if you can do more with these things,

[28:57 - 28:59]
like that's generally always
gonna be a good thing.

[28:59 - 29:01]
- Yeah, I feel like there are a lot

[29:01 - 29:02]
of interesting paths that this could take.

[29:02 - 29:05]
One is just completely

[29:05 - 29:06]
on the fly on demand software

[29:06 - 29:10]
where I am using my own version some app

[29:10 - 29:12]
and just like as I use it, you know,

[29:12 - 29:13]
this interaction I don't really like

[29:13 - 29:15]
and it just changes for me

[29:15 - 29:17]
that's one kind of crazy
future you could imagine

[29:17 - 29:19]
where it's not even you
kind of actively doing it,

[29:19 - 29:21]
but just based on your
interactions with it,

[29:21 - 29:22]
the software, whatever you're using,

[29:22 - 29:24]
changes to kind of fit you.

[29:24 - 29:26]
That's like a cool potential path forward

[29:26 - 29:28]
where I don't know if everyone

[29:28 - 29:30]
in the world is going to want

[29:30 - 29:33]
to like, I don't know if the
total size of like people

[29:33 - 29:34]
who want to kind of
build their own software

[29:34 - 29:35]
is like that large.
- Right.

[29:35 - 29:36]
- But I think the people

[29:36 - 29:37]
who could benefit from software

[29:37 - 29:40]
that kind of fits their needs

[29:40 - 29:41]
is potentially the entire world.

[29:41 - 29:43]
- All right, maybe one last thing to just

[29:43 - 29:45]
kind of close this off here.

[29:45 - 29:47]
For all the people watching this,

[29:47 - 29:50]
if you're a talented engineer out there,

[29:50 - 29:52]
and you're thinking about
making your next move

[29:52 - 29:54]
or you wanna get more
involved in the industry

[29:54 - 29:56]
and you're trying to
decide between maybe going

[29:56 - 29:57]
to a larger company or joining more

[29:57 - 30:00]
of a faster pace startup
like a Cursor or Anthropic,

[30:00 - 30:02]
what would you tell
someone in those shoes?

[30:02 - 30:03]
- Yeah, I think startups have

[30:03 - 30:05]
an advantage these days like

[30:05 - 30:07]
with Anthropic and with Cursor

[30:07 - 30:09]
and getting like really
excellent talent in a way

[30:09 - 30:10]
that like when you're at a bigger company,

[30:10 - 30:12]
a lot of people, you know,
a lot of the best people

[30:12 - 30:14]
in the world find that
less exciting, right?

[30:14 - 30:15]
And some people do,

[30:15 - 30:16]
and certainly like large companies have

[30:16 - 30:18]
great people, but the density of

[30:18 - 30:20]
that talent tends to be much lower.

[30:20 - 30:21]
And I get a startup,

[30:21 - 30:22]
you can get this really high talent

[30:22 - 30:24]
density and that makes it
really enjoyable to work

[30:24 - 30:26]
with a bunch of other
excellent colleagues.

[30:26 - 30:28]
You can work on really
impactful things in this

[30:28 - 30:29]
incredibly small team, right?

[30:29 - 30:31]
Building a product that kind of,

[30:31 - 30:33]
and building models that change the way

[30:33 - 30:35]
that the world writes software.

[30:35 - 30:37]
And you can be a one of like,

[30:37 - 30:38]
you know, tens, hundreds,

[30:38 - 30:40]
or thousands of people working on

[30:40 - 30:42]
that and that's really cool.

[30:42 - 30:43]
- Yeah.

[30:43 - 30:44]
That's great.

[30:44 - 30:44]
Well thank you guys.

[30:44 - 30:46]
This has been awesome conversation.

[30:46 - 30:47]
- Thank you.
- Thank you.

## コメント

### 1. @ehza (👍 84)
cursor and claude code are probably my favorite AI tools

### 2. @NazzarenoGiannelliCG (👍 71)
I like that each of them dressed for a different season of the year.

> **@dKause** (👍 0): yeah, thats very „taste“full

> **@AndresGarcia-so1hz** (👍 4): from left to right: fall, winter, spring, summer

> **@pviccci** (👍 0): it's an Agentic way of getting dressed))

> **@maybesomaybenot** (👍 0): hoodie with a puffy 🥵🥵

### 3. @jonnyeh (👍 18)
I keep switching between Cursor's Agent mode and Claude Code, both are awesome :D

### 4. @ShadowDoggie (👍 7)
what a timing! i just renewed my cursor subscription

### 5. @akialter (👍 28)
Cursor changed software engineer. All my colleagues and myself are using and agree it's game changing

> **@davidchristenes9062** (👍 5): literally bot account...

> **@BudetSvobodnoy** (👍 0): @@davidchristenes9062how do you know

### 6. @yusufnzm (👍 93)
Claude buying Cursor, OpenAI buying Windsurf.

> **@realharo** (👍 28): Would be a colossal waste of money, Anthropic doesn't need Cursor, their own agents are already better at coding, and the AI coding meta is moving away from traditional IDE form factor anyway.

> **@junaid1464** (👍 4): i don’t need cursor, just canceled sub in favour of claude code

> **@patrikkarlsson9523** (👍 0): So you have a Mac? Claude crashes on my PC almost daily. Wsl or Ubuntu​@@junaid1464

> **@ashleigh3021** (👍 1): Anthropic don’t have the money to buy Cursor

> **@unkim7085** (👍 0): Claude code works in cursor as good as in vs code or console ​@@junaid1464

### 7. @CJ-js7vx (👍 2)
that Sheldon like guy in green is very chill and rational, love it!

### 8. @skyecase (👍 25)
Claude has been my favorite company in artificial intelligence research. Others, like OpenAI, steal stuff from the internet and just respond with their fancy models.
Claude, on the other hand, publishes all its research on AI and teaches us about ML reasoning and other transformers. It's been great to see you guys working together to bring safe, secure, and good (not biased) transformers, reasoning models, and creations in artificial general intelligence.

> **@SR-ti6jj** (👍 5): Yeah, Anthropic would never steal from anyone. Especially not from Reddit

> **@JonathanWillis** (👍 0): My issue with Claude when I tried it last year was even with a paid subscription it stopped responding due to load, whilst ChatGPT moved to always responding even if it's a cheaper model

### 9. @z27-br8wb (👍 6)
Just copped claude code to test and I'm very amazed how it tackles some issues that cursor couldn't even in multiple prompts, they both have some pros and cons but yeah claude code is super cool too.

> **@danielyanezgarrido** (👍 1): can you give me an example ? im spending 3 times more in claude code to achieve the same in cursor...

### 10. @pviccci (👍 4)
main takeaways are at 27:21 and 30:02

### 11. @しげお-i1l (👍 1)
Great discussion, even better since it wasn't a one sided interview but more like a chat

### 12. @cryptocoach.no1 (👍 0)
This while conversation is really grounded. Really really good

### 13. @CollectiveInteligence (👍 1)
Allow enterprise customers to assign a profile type to users logged in profile (i.e., Junior Engineer, Senior Engineer, Lead Engineer, etc.), then adjust Cursor's system prompt to change its behaviour: acting as an educator for Junior Engineers, a pair programmer for Senior Engineers, and an executor for Lead Engineers.

### 14. @MacS7n (👍 7)
Claude Code + VS Code is the best duo

> **** (👍 0): It's good, zed is even nicer though.

> **@AL-wc8oy** (👍 1): Claude Code + Cursor (Claude 4& Agent) is the best for now 6/25

> **@Gorguruga** (👍 0): @@AL-wc8oy  I'm totally new to this. Just subbed to Claude on the pro plan. Is it already integrated in Cursor?

> **@AL-wc8oy** (👍 0): ​@@Gorgurugano, you can run claude code on any ide you choose. if you use windows you can install it via WSL. i just love leveraging the power of cursor and claude code

### 15. @learnbydoingwithsteven (👍 1)
Dudes are so chill that the self intro is super short.

### 16. @MrStupiuno (👍 15)
I don’t see the need for Cursor when Claude Code is so good

> **@danielyanezgarrido** (👍 2): this is a sincer question as some one who uses claude through cursos, what can you do in claude that yuo cant in cursor...ive tried claude code and i spend so much more money trying to do what i want vs cursor.

### 17. @M-to-the-B403 (👍 3)
I just started working with Cursor. I'm still pretty heavy with chatGPT but Claude is growing on me.. The Claude coding extension for Cursor that just recently dropped will likely transition me over fully, that on top of everything else with Claude that is a big winner amongst the major AI platforms right now, imo. Would love to hear people's favorite things they enjoy about Claude compared to other, more mainstream models?

> **@nm3547** (👍 0): Do you also work w Gemini pro?

> **@SimplyPhy** (👍 0): Model updates are transparent and never throttled.  The team seems a bit more transparent and somewhat less reliant on hyperbole than the other major players.  And most importantly, their products are awesome.

### 18. @SeyedMostafaMeshkati (👍 1)
Cursor is more usable and powerful when used with Claude models, best combination must of the times🔥

> **@nm3547** (👍 0): Do you feel a newbie can learn to use both?

### 19. @blkmrktrunner6524 (👍 3)
Funny that he used the lawyer example and the year 1995. In 1985 I was using a word processor in my second year of university to producing everything and then would have to get a typewriter out and copy it to submit

### 20. @nasif3089 (👍 1)
Sonnet4 x Cursor x Claude code has been amazing so far.. claude seems to be so much better than the other models..

> **@nm3547** (👍 0): What do you find different in connect 4 vs Claude?

