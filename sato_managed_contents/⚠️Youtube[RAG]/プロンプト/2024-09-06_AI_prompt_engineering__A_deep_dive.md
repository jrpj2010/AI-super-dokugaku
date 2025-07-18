# AI prompt engineering: A deep dive

**チャンネル:** Anthropic
**公開日:** 2024-09-05
**URL:** https://www.youtube.com/watch?v=T9aRN5JkmL8

## 説明

Some of Anthropic's prompt engineering experts—Amanda Askell (Alignment Finetuning), Alex Albert (Developer Relations), David Hershey (Applied AI), and Zack Witten (Prompt Engineering)—reflect on how prompt engineering has evolved, practical tips, and thoughts on how prompting might change as AI capabilities grow. Timestamps:
0:00 Introduction
2:05 Defining prompt engineering
6:34 What makes a good prompt engineer
12:17 Refining prompts
24:27 Honesty, personas and metaphors in prompts
37:12 Model reasoning
45:18 Enterprise vs research vs general chat prompts
50:52 Tips to improve prompting skills
53:56 Jailbreaking
56:51 Evolution of prompt engineering
1:04:34 Future of prompt engineering

Learn more about Anthropic: https://www.anthropic.com/
Anthropic prompt engineering docs: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview

## 字幕

[00:00 - 00:03]
- Basically, this entire
roundtable session here

[00:03 - 00:06]
is just gonna be focused
mainly on prompt engineering.

[00:06 - 00:10]
A variety of perspectives at
this table around prompting

[00:10 - 00:11]
from a research side,
from a consumer side,

[00:11 - 00:13]
and from the enterprise side.

[00:13 - 00:16]
And I want to just get the
whole wide range of opinions

[00:16 - 00:18]
because there's a lot of them.

[00:18 - 00:20]
And just open it up to discussion

[00:20 - 00:24]
and explore what prompt
engineering really is

[00:24 - 00:25]
and what it's all about.

[00:25 - 00:28]
And yeah, we'll just take it from there.

[00:28 - 00:30]
So maybe we can go around
the horn with intros.

[00:30 - 00:32]
I can kick it off. I'm Alex.

[00:32 - 00:35]
I lead Developer Relations
here at Anthropic.

[00:35 - 00:36]
Before that,

[00:36 - 00:39]
I was technically a prompt
engineer at Anthropic.

[00:39 - 00:41]
I worked on our prompt engineering team,

[00:43 - 00:45]
and did a variety of roles spanning

[00:45 - 00:48]
from a solutions architect type of thing,

[00:48 - 00:51]
to working on the research side.

[00:51 - 00:53]
So with that, maybe I can
hand it over to David.

[00:53 - 00:56]
- Heck, yeah. My name's David Hershey.

[00:56 - 00:59]
I work with customers mostly at Anthropic

[00:59 - 01:02]
on a bunch of stuff technical,

[01:02 - 01:04]
I help people with finetuning,

[01:04 - 01:06]
but also just a lot of the generic things

[01:06 - 01:08]
that make it hard to adopt
language models of prompting.

[01:08 - 01:11]
And just like how to build
systems with language models,

[01:11 - 01:14]
but spend most of my time
working with customers.

[01:14 - 01:16]
- Cool. I'm Amanda Askell.

[01:16 - 01:19]
I lead one of the Finetuning
teams at Anthropic,

[01:19 - 01:23]
where I guess I try to make
Claude be honest and kind.

[01:24 - 01:26]
Yeah.

[01:26 - 01:27]
- My name is Zack Witten.

[01:27 - 01:30]
I'm a Prompt Engineer at Anthropic.

[01:30 - 01:32]
Alex and I always argue
about who the first one was.

[01:32 - 01:33]
He says it's him, I say it's me.

[01:33 - 01:35]
- Contested.
- Yeah.

[01:35 - 01:38]
I used to work a lot with
individual customers,

[01:38 - 01:40]
kind of the same way David does now.

[01:40 - 01:44]
And then as we brought
more solutions architects

[01:44 - 01:46]
to the team, I started working on things

[01:46 - 01:50]
that are meant to raise the overall levels

[01:50 - 01:53]
of ambient prompting in society,

[01:53 - 01:55]
I guess, like the prompt generator

[01:55 - 01:59]
and the various educational
materials that people use.

[01:59 - 02:02]
- Nice, cool. Well, thanks
guys for all coming here.

[02:02 - 02:05]
I'm gonna start with a very broad question

[02:05 - 02:07]
just so we have a frame

[02:07 - 02:09]
going into the rest of
our conversations here.

[02:09 - 02:14]
What is prompt engineering?
Why is it engineering?

[02:14 - 02:15]
What's prompt, really?

[02:15 - 02:17]
If anyone wants to kick that off,

[02:17 - 02:19]
give your own perspective on it,

[02:19 - 02:21]
feel free to take the rein here.

[02:21 - 02:23]
- I feel like we have a prompt engineer.

[02:23 - 02:24]
It's his job.

[02:24 - 02:27]
- We're all prompt
engineers in our own form.

[02:27 - 02:28]
- But one of us has a job.

[02:28 - 02:30]
- Yeah. Zack, maybe
since it's in your title.

[02:30 - 02:34]
- One of us has a job, but the
other three don't have jobs.

[02:35 - 02:37]
- I guess I feel like prompt engineering

[02:37 - 02:40]
is trying to get the model to do things,

[02:40 - 02:42]
trying to bring the most out of the model.

[02:42 - 02:46]
Trying to work with the
model to get things done

[02:46 - 02:49]
that you wouldn't have
been able to do otherwise.

[02:49 - 02:52]
So a lot of it is just
clear communicating.

[02:52 - 02:55]
I think at heart,

[02:55 - 02:57]
talking to a model is a lot
like talking to a person.

[02:57 - 02:59]
And getting in there

[02:59 - 03:02]
and understanding the
psychology of the model,

[03:02 - 03:06]
which Amanda is the world's
most expert person in the world.

[03:08 - 03:10]
- Well, I'm gonna keep going on you.

[03:10 - 03:12]
Why is engineering in the name?

[03:13 - 03:14]
- Yeah.

[03:14 - 03:18]
I think the engineering part
comes from the trial and error.

[03:18 - 03:18]
- Okay.

[03:18 - 03:23]
- So one really nice thing
about talking to a model

[03:23 - 03:24]
that's not like talking to a person,

[03:24 - 03:25]
is you have this restart button.

[03:25 - 03:28]
This giant go back to square zero

[03:28 - 03:29]
where you just start from the beginning.

[03:29 - 03:30]
And what that gives you the ability to do

[03:30 - 03:34]
that you don't have, is a
truly start from scratch

[03:34 - 03:38]
and try out different things
in an independent way,

[03:38 - 03:40]
so that you don't have
interference from one to the other.

[03:40 - 03:43]
And once you have that
ability to experiment

[03:43 - 03:45]
and to design different things,

[03:45 - 03:48]
that's where the engineering
part has the potential

[03:48 - 03:49]
to come in.

[03:49 - 03:50]
- Okay.

[03:50 - 03:53]
So what you're saying is as
you're writing these prompts,

[03:53 - 03:55]
you're typing in a message
to Claude or in the API

[03:55 - 03:56]
or whatever it is.

[03:57 - 04:00]
Being able to go back
and forth with the model

[04:00 - 04:02]
and to iterate on this message,

[04:02 - 04:06]
and revert back to the
clean slate every time,

[04:06 - 04:08]
that process is the engineering part.

[04:08 - 04:13]
This whole thing is prompt
engineering all in one.

[04:13 - 04:15]
- There's another aspect of it too,

[04:15 - 04:19]
which is integrating the prompts

[04:19 - 04:21]
within your system as a whole.

[04:21 - 04:25]
And David has done a ton of
work with customers integrating.

[04:26 - 04:28]
A lot of times it's not just as simple

[04:28 - 04:30]
as you write one prompt and
you give it to the model

[04:30 - 04:30]
and you're done.

[04:30 - 04:32]
In fact, it's anything but.
It's like way more complicated.

[04:32 - 04:33]
- Yeah.

[04:34 - 04:36]
I think of prompts as the way

[04:36 - 04:38]
that you program models a little bit,

[04:38 - 04:40]
that makes it too complicated.

[04:40 - 04:41]
'Cause I think Zack is generally right

[04:41 - 04:45]
that it's just talking clearly
is the most important thing.

[04:45 - 04:47]
But if you think about it a little bit

[04:47 - 04:49]
as programming a model,
you have to think about

[04:49 - 04:51]
where data comes from, what
data you have access to.

[04:51 - 04:53]
So if you're doing RAG or something,

[04:53 - 04:56]
what can I actually use
and do and pass to a model?

[04:57 - 05:02]
You have to think about
trade-offs in latency

[05:02 - 05:03]
and how much data you're
providing and things like that.

[05:03 - 05:04]
There's enough systems thinking

[05:04 - 05:07]
that goes into how you
actually build around a model.

[05:07 - 05:08]
I think a lot of that's also the core

[05:08 - 05:13]
of why it maybe deserves
its own carve-out as a thing

[05:13 - 05:16]
to reason about separately
from just a software engineer

[05:16 - 05:17]
or a PM or something like that.

[05:17 - 05:18]
It's kind of its own domain

[05:18 - 05:20]
of how to reason about these models.

[05:20 - 05:24]
- Is a prompt in this sense
then natural language code?

[05:24 - 05:26]
Is it a higher level of abstraction

[05:26 - 05:28]
or is it a separate thing?

[05:28 - 05:33]
- I think trying to get too
abstract with a prompt is a way

[05:33 - 05:37]
to overcomplicate a
thing, because I think,

[05:37 - 05:38]
we're gonna get into it,
but more often than not,

[05:38 - 05:39]
the thing you wanna do

[05:39 - 05:42]
is just write a very clear
description of a task,

[05:42 - 05:45]
not try to build crazy
abstractions or anything like that.

[05:47 - 05:51]
But that said, you are compiling
the set of instructions

[05:51 - 05:54]
and things like that into
outcomes a lot of times.

[05:54 - 05:57]
So precision and a lot the things

[05:57 - 06:00]
you think about with programming
about version control

[06:00 - 06:01]
and managing what it looked like

[06:01 - 06:03]
back then when you had this experiment.

[06:03 - 06:06]
And tracking your experiment
and stuff like that,

[06:06 - 06:11]
that's all just equally important to code.

[06:11 - 06:12]
- Yeah.

[06:12 - 06:15]
- So it's weird to be in this
paradigm where written text,

[06:15 - 06:18]
like a nice essay that
you wrote is something

[06:18 - 06:21]
that's looked like the same thing as code.

[06:22 - 06:25]
But it is true that now we write essays

[06:25 - 06:27]
and treat them code, and I
think that's actually correct.

[06:27 - 06:29]
- Yeah. Okay, interesting.

[06:29 - 06:31]
So maybe piggybacking off of that,

[06:32 - 06:36]
we've loosely defined what
prompt engineering is.

[06:36 - 06:38]
So what makes a good prompt engineer?

[06:38 - 06:41]
Maybe, Amanda, I'll go to you for this,

[06:41 - 06:43]
since you're trying to
hire prompt engineers

[06:43 - 06:44]
more so in a research setting.

[06:45 - 06:46]
What does that look like?

[06:46 - 06:49]
What are you looking for
in that type of person?

[06:49 - 06:50]
- Yeah, good question.

[06:50 - 06:55]
I think it's a mix of like
Zack said, clear communication,

[06:55 - 06:58]
so the ability to just
clearly state things,

[06:58 - 07:00]
clearly understand tasks,

[07:00 - 07:03]
think about and describe
concepts really well.

[07:03 - 07:05]
That's the writing component, I think.

[07:05 - 07:08]
I actually think that being a good writer

[07:08 - 07:12]
is not as correlated with
being a good prompt engineer

[07:12 - 07:13]
as people might think.

[07:13 - 07:15]
So I guess I've had this
discussion with people

[07:15 - 07:16]
'cause I think there's
some argument as like,

[07:16 - 07:19]
"Maybe you just shouldn't have
the name engineer in there.

[07:19 - 07:21]
Why isn't it just writer?"

[07:22 - 07:23]
I used to be more sympathetic to that.

[07:23 - 07:27]
And then, I think, now I'm like
what you're actually doing,

[07:27 - 07:31]
people think that you're writing
one thing and you're done.

[07:31 - 07:34]
Then I'll be like to
get a semi-decent prompt

[07:34 - 07:36]
when I sit down with the model.

[07:37 - 07:38]
Earlier, I was prompting the model

[07:38 - 07:40]
and I was just like in a 15-minute span

[07:40 - 07:42]
I'll be sending hundreds
of prompts to the model.

[07:42 - 07:45]
It's just back and forth, back
and forth, back and forth.

[07:45 - 07:48]
So I think it's this willingness
to iterate and to look

[07:48 - 07:51]
and think what is it that
was misinterpreted here,

[07:51 - 07:52]
if anything?

[07:52 - 07:55]
And then fix that thing.

[07:55 - 07:57]
So that ability to iterate.

[07:57 - 08:01]
So I'd say clear communication,
that ability to iterate.

[08:01 - 08:03]
I think also thinking about ways

[08:03 - 08:05]
in which your prompt might go wrong.

[08:05 - 08:06]
So if you have a prompt

[08:06 - 08:09]
that you're going to be
applying to say, 400 cases,

[08:09 - 08:11]
it's really easy to think
about the typical case

[08:11 - 08:12]
that it's going to be applied to,

[08:12 - 08:14]
to see that it gets the
right solution in that case,

[08:14 - 08:15]
and then to move on.

[08:15 - 08:18]
I think this is a very classic
mistake that people made.

[08:19 - 08:21]
What you actually want
to do is find the cases

[08:21 - 08:23]
where it's unusual.

[08:23 - 08:25]
So you have to think about
your prompt and be like,

[08:25 - 08:26]
"What are the cases where
it'd be really unclear to me

[08:26 - 08:28]
what I should do in this case?"

[08:28 - 08:29]
So for example, you
have a prompt that says,

[08:29 - 08:31]
"I'm going to send you a bunch of data.

[08:31 - 08:33]
I want you to extract all of the rows

[08:33 - 08:36]
where someone's name is, I don't know,

[08:36 - 08:37]
starts with the letter G."

[08:37 - 08:39]
And then you're like, "Well,
I'm gonna send it a dataset

[08:39 - 08:41]
where there is no such thing,

[08:41 - 08:43]
there is no such name that
starts with the letter G.

[08:43 - 08:45]
"I'm going to send it
something that's not a dataset,

[08:45 - 08:48]
I might also just send it an empty string.

[08:48 - 08:49]
These are all of the
cases you have to try,

[08:49 - 08:51]
because then you're like, "What
does it do in these cases? "

[08:51 - 08:53]
And then you can give it more instructions

[08:53 - 08:55]
for how it should deal with that case.

[08:55 - 08:59]
- I work with customers so
often where you're an engineer,

[08:59 - 09:00]
you're building something.

[09:00 - 09:03]
And there's a part in your
prompt where a customer of theirs

[09:03 - 09:04]
is going to write something.

[09:04 - 09:05]
- Yeah.

[09:05 - 09:06]
- And they all think

[09:06 - 09:07]
about these really
perfectly phrased things

[09:07 - 09:09]
that they think someone's going
to type into their chatbot.

[09:09 - 09:12]
And in reality, it's like
they never used the shift key

[09:12 - 09:15]
and every other word is a typo.

[09:15 - 09:17]
- They think it's Google.
- And there's no punctuation.

[09:17 - 09:18]
- They just put in random
words with no question.

[09:18 - 09:20]
- Exactly.

[09:20 - 09:21]
So you have these evals

[09:21 - 09:22]
that are these beautifully structured

[09:22 - 09:24]
what their users ideally would type in.

[09:24 - 09:26]
But being able to go the next step

[09:26 - 09:29]
to reason about what your
actual traffic's gonna be like,

[09:29 - 09:31]
what people are actually
gonna to try to do,

[09:31 - 09:33]
that's a different level of thinking.

[09:33 - 09:35]
- One thing you said that
really resonated with me

[09:35 - 09:36]
is reading the model responses.

[09:37 - 09:39]
In a machine learning context,

[09:39 - 09:41]
you're supposed to look at the data.

[09:41 - 09:43]
It's almost a cliche
like look at your data,

[09:43 - 09:45]
and I feel like the
equivalent for prompting

[09:45 - 09:48]
is look at the model outputs.

[09:48 - 09:51]
Just reading a lot of outputs
and reading them closely.

[09:51 - 09:52]
Like Dave and I were
talking on the way here,

[09:52 - 09:53]
one thing that people will do

[09:53 - 09:57]
is they'll put think
step-by-step in their prompt.

[09:57 - 09:58]
And they won't check to make sure

[09:58 - 10:00]
that the model is actually
thinking step-by-step,

[10:00 - 10:04]
because the model might
take it in a more abstract

[10:04 - 10:05]
or general sense.

[10:05 - 10:06]
Rather than like,

[10:06 - 10:08]
"No, literally you have to
write down your thoughts

[10:08 - 10:10]
in these specific tags."

[10:10 - 10:14]
So yeah, if you aren't
reading the model outputs,

[10:14 - 10:16]
you might not even notice
that it's making that mistake.

[10:16 - 10:18]
- Yeah, that's interesting.

[10:19 - 10:22]
There is that weird theory of mind piece

[10:22 - 10:23]
to being a prompt engineer

[10:23 - 10:25]
where you have to think almost about

[10:25 - 10:27]
how the model's gonna
view your instructions.

[10:27 - 10:29]
But then if you're writing for
an enterprise use case too,

[10:29 - 10:30]
you also have to think about

[10:30 - 10:32]
how the user's gonna talk to the model,

[10:32 - 10:34]
as you're the third party sitting there

[10:34 - 10:36]
in that weird relationship.

[10:37 - 10:38]
Yeah.

[10:39 - 10:42]
- On the theory of mind piece,
one thing I would say is,

[10:43 - 10:48]
it's so hard to write
instructions down for a task.

[10:48 - 10:51]
It's so hard to untangle in your own brain

[10:51 - 10:53]
all of the stuff that you know

[10:53 - 10:56]
that Claude does not
know and write it down.

[10:56 - 10:57]
It's just an immensely challenging thing

[10:57 - 11:00]
to strip away all of the
assumptions you have, and be able

[11:00 - 11:04]
to very clearly communicate the
full fact set of information

[11:04 - 11:05]
that is needed to a model.

[11:05 - 11:06]
I think that's another thing

[11:06 - 11:08]
that really differentiates
a good prompt engineer

[11:08 - 11:10]
from a bad one, is like...

[11:10 - 11:13]
A lot of people will just write
down the things they know.

[11:13 - 11:15]
But they don't really take the time

[11:15 - 11:17]
to systematically break out

[11:17 - 11:19]
what is the actual full set of
information you need to know

[11:19 - 11:21]
to understand this task?

[11:21 - 11:22]
- Right.

[11:22 - 11:24]
- And that's a very
clear thing I see a lot

[11:24 - 11:28]
is prompts where it's just conditioned.

[11:28 - 11:30]
The prompt that someone
wrote is so conditioned

[11:30 - 11:33]
on their prior understanding of a task,

[11:33 - 11:36]
that when they show it to me
I'm like, "This makes no sense.

[11:36 - 11:38]
None of the words you
wrote make any sense,

[11:38 - 11:39]
because I don't know anything

[11:39 - 11:42]
about your interesting use case."

[11:42 - 11:45]
But I think a good way to
think about prompt engineering

[11:45 - 11:47]
in that front and a good skill for it,

[11:47 - 11:51]
is just can you actually
step back from what you know

[11:51 - 11:54]
and communicate to this weird
system that knows a lot,

[11:54 - 11:58]
but not everything about what
it needs to know to do a task?

[11:58 - 11:59]
- Yeah.

[11:59 - 12:00]
The amount of times I've
seen someone's prompt

[12:00 - 12:01]
and then being like,

[12:01 - 12:04]
"I can't do the task
based on this prompt."

[12:04 - 12:06]
I'm human level and you're
giving this to something

[12:06 - 12:10]
that is worse than me and
expecting it to do better,

[12:10 - 12:12]
and I'm like, "Yeah."

[12:12 - 12:13]
- Yeah.

[12:13 - 12:15]
There is that interesting
thing with like...

[12:15 - 12:19]
Current models don't really do a good job

[12:19 - 12:22]
of asking good, probing
questions in response

[12:22 - 12:23]
like a human would.

[12:23 - 12:26]
If I'm giving Zack directions
on how to do something,

[12:26 - 12:28]
he'll be like, "This
doesn't make any sense.

[12:28 - 12:30]
What am I supposed to do at
this step or here and here?"

[12:30 - 12:34]
Model doesn't do that, right,
so you have to, as yourself,

[12:34 - 12:37]
think through what that
other person would say

[12:37 - 12:40]
and then go back to your prompt
and answer those questions.

[12:40 - 12:41]
- You could ask it to do that.

[12:41 - 12:43]
- You could. That's right.
- I do that, yeah.

[12:43 - 12:44]
- I guess that's another step.

[12:44 - 12:45]
- I was going to say one
of the first things I do

[12:45 - 12:46]
with my initial prompt,

[12:46 - 12:48]
is I'll give it the prompt
and then I'll be like,

[12:48 - 12:50]
"I don't want you to
follow these instructions.

[12:50 - 12:51]
I just want you to tell me the ways in

[12:51 - 12:53]
which they're unclear or any ambiguities,

[12:53 - 12:54]
or anything you don't understand."

[12:54 - 12:55]
And it doesn't always get it perfect,

[12:55 - 12:59]
but it is interesting that
that is one thing you can do.

[12:59 - 13:01]
And then also sometimes if people see

[13:01 - 13:01]
that the model makes a mistake,

[13:01 - 13:04]
the thing that they don't
often do is just ask the model.

[13:04 - 13:06]
So they say to the model,
"You got this wrong.

[13:06 - 13:07]
Can you think about why?

[13:07 - 13:09]
And can you maybe write an
edited version of my instructions

[13:09 - 13:11]
that would make you not get it wrong?"

[13:11 - 13:14]
And a lot of the time, the
model just gets it right.

[13:14 - 13:15]
The model's like, "Oh, yeah.

[13:15 - 13:18]
Here's what was unclear, here's
a fix to the instructions,"

[13:18 - 13:20]
and then you put those in and it works.

[13:20 - 13:21]
- Okay.

[13:21 - 13:23]
I'm actually really curious
about this personally almost.

[13:23 - 13:25]
Is that true that that works?

[13:26 - 13:29]
Is the model able to spot
its mistakes that way?

[13:29 - 13:31]
When it gets something wrong, you say,

[13:31 - 13:32]
"Why did you get this wrong?"

[13:32 - 13:34]
And then it tells you
maybe something like,

[13:34 - 13:37]
"Okay, how could I phrase
this to you in the future

[13:37 - 13:38]
so you get it right?"

[13:38 - 13:40]
Is there an element of truth to that?

[13:40 - 13:43]
Or is that just a hallucination
on the model's part

[13:43 - 13:46]
around what it thinks its limits are?

[13:46 - 13:49]
- I think if you explain
to it what it got wrong,

[13:49 - 13:52]
it can identify things
in the query sometimes.

[13:52 - 13:53]
I think this varies by task.

[13:53 - 13:56]
This is one of those things
where I'm like I'm not sure

[13:56 - 13:57]
what percentage of the
time it gets it right,

[13:57 - 14:00]
but I always try it
'cause sometimes it does.

[14:00 - 14:01]
- And you learn something.
- Yeah.

[14:01 - 14:03]
- Anytime you go back to the model

[14:03 - 14:04]
or back and forth with the model,

[14:04 - 14:06]
you learn something about what's going on.

[14:06 - 14:08]
I think you're giving away information

[14:08 - 14:10]
if you don't at least try.

[14:11 - 14:12]
- That's interesting.

[14:12 - 14:15]
Amanda, I'm gonna keep asking
you a few more questions here.

[14:15 - 14:18]
One thing maybe for
everybody watching this,

[14:18 - 14:20]
is we have these Slack
channels at Anthropic

[14:20 - 14:24]
where people can add Claude
into the Slack channel,

[14:24 - 14:26]
then you can talk to Claude through it.

[14:26 - 14:28]
And Amanda has a Slack channel

[14:28 - 14:32]
that a lot of people follow of
her interactions with Claude.

[14:32 - 14:34]
And one thing that I see
you always do in there,

[14:34 - 14:37]
which you probably do the
most of anyone at Anthropic,

[14:37 - 14:41]
is use the model to help you

[14:41 - 14:42]
in a variety of different scenarios.

[14:42 - 14:45]
I think you put a lot
of trust into the model

[14:45 - 14:47]
in the research setting.

[14:47 - 14:49]
I'm curious how you've
developed those intuitions

[14:49 - 14:51]
for when to trust the model.

[14:51 - 14:53]
Is that just a matter of usage,

[14:53 - 14:55]
experience or is it something else?

[14:55 - 14:59]
- I think I don't trust the model ever

[14:59 - 15:00]
and then I just hammer on it.

[15:00 - 15:02]
So I think the reason why
you see me do that a lot,

[15:02 - 15:04]
is that that is me being like,

[15:04 - 15:06]
"Can I trust you to do this task?"

[15:06 - 15:08]
'Cause there's some things,
models are kind of strange.

[15:08 - 15:11]
If you go slightly out of distribution,

[15:11 - 15:14]
you just go into areas where
they haven't been trained

[15:14 - 15:15]
or they're unusual.

[15:15 - 15:15]
Sometimes you're like,

[15:15 - 15:17]
"Actually, you're much less reliable here,

[15:17 - 15:20]
even though it's a fairly simple task."

[15:21 - 15:22]
I think that's happening
less and less over time

[15:22 - 15:23]
as models get better,

[15:23 - 15:26]
but you want to make sure you're
not in that kind of space.

[15:26 - 15:28]
So, yeah, I don't think
I trust it by default,

[15:28 - 15:29]
but I think in ML,

[15:29 - 15:33]
people often want to look
across really large datasets.

[15:33 - 15:35]
And I'm like, "When does
it make sense to do that?"

[15:35 - 15:38]
And I think the answer is when
you get relatively low signal

[15:38 - 15:39]
from each data point,

[15:39 - 15:42]
you want to look across
many, many data points,

[15:42 - 15:44]
because you basically want
to get rid of the noise.

[15:44 - 15:46]
With a lot of prompting tasks,

[15:46 - 15:49]
I think you actually get really
high signal from each query.

[15:49 - 15:52]
So if you have a really
well-constructed set

[15:52 - 15:53]
of a few hundred prompts,

[15:53 - 15:55]
that I think can be much more signal

[15:55 - 15:59]
than thousands that
aren't as well-crafted.

[15:59 - 16:02]
So I do think that I can trust the model

[16:02 - 16:06]
if I look at 100 outputs of
it and it's really consistent.

[16:06 - 16:08]
And I know that I've constructed those

[16:08 - 16:10]
to basically figure out
all of the edge cases

[16:10 - 16:12]
and all of the weird things
that the model might do,

[16:12 - 16:14]
strange inputs, et cetera.

[16:14 - 16:16]
I trust that probably more

[16:16 - 16:19]
than a much more loosely constructed set

[16:19 - 16:21]
of several thousand.

[16:22 - 16:26]
- I think in ML, a lot of
times the signals are numbers.

[16:29 - 16:31]
Did you predict this thing right or not?

[16:31 - 16:34]
And it'd be looking at
the logprobs of a model

[16:34 - 16:36]
and trying to intuit
things, which you can do,

[16:36 - 16:38]
but it's kind of sketchy.

[16:39 - 16:42]
I feel like the fact that models
output more often than not

[16:42 - 16:44]
a lot of stuff like words and things.

[16:44 - 16:47]
There's just fundamentally
so much to learn

[16:47 - 16:50]
between the lines of what
it's writing and why and how,

[16:50 - 16:51]
and that's part of what it is.

[16:51 - 16:54]
It's not just did it get
the task right or not?

[16:54 - 16:57]
It's like, "How did it get there?

[16:57 - 16:59]
How was it thinking about it?
What steps did it go through?"

[16:59 - 17:01]
You learn a lot about what is going on,

[17:01 - 17:04]
or at least you can try to
get a better sense, I think.

[17:04 - 17:05]
But that's where a lot of
information comes from for me,

[17:05 - 17:08]
is by reading the
details of what came out,

[17:08 - 17:09]
not just through the result.

[17:09 - 17:14]
- I think also the very best of prompting

[17:14 - 17:16]
can make the difference between a failed

[17:16 - 17:18]
and a successful experiment.

[17:18 - 17:21]
So sometimes I can get annoyed
if people don't focus enough

[17:21 - 17:23]
on the prompting component
of their experiment,

[17:23 - 17:27]
because I'm like, "This can,
in fact, be the difference

[17:27 - 17:29]
between 1% performance
in the model or 0.1%."

[17:31 - 17:33]
In such a way that your
experiment doesn't succeed

[17:33 - 17:35]
if it's at top 5% model performance,

[17:35 - 17:39]
but it does succeed if
it's top 1% or top 0.1%.

[17:39 - 17:40]
And then I'm like, "If
you're gonna spend time

[17:40 - 17:43]
over coding your experiment really nicely,

[17:43 - 17:46]
but then just not spend
time on the prompt."

[17:47 - 17:48]
I don't know.

[17:48 - 17:49]
That doesn't make sense to me,

[17:49 - 17:51]
'cause that can be the
difference between life and death

[17:51 - 17:52]
of your experiment.

[17:52 - 17:52]
- Yeah.

[17:52 - 17:55]
And with the deployment
too, it's so easy to,

[17:55 - 17:57]
"Oh, we can't ship this."

[17:57 - 17:58]
And then you change the prompt around

[17:58 - 18:00]
and suddenly it's working.
- Yeah.

[18:00 - 18:01]
- It's a bit of a
double-edged sword though,

[18:01 - 18:03]
because I feel like there's
a little bit of prompting

[18:03 - 18:07]
where there's always this
mythical, better prompt

[18:07 - 18:09]
that's going to solve
my thing on the horizon.

[18:09 - 18:10]
- Yeah.

[18:10 - 18:11]
- I see a lot of people get stuck

[18:11 - 18:13]
into the mythical prompt on the horizon,

[18:13 - 18:15]
that if I just keep
grinding, keep grinding.

[18:15 - 18:17]
It's never bad to grind
a little bit on a prompt,

[18:17 - 18:19]
as we've talked, you learn things.

[18:19 - 18:22]
But it's one of the scary things

[18:22 - 18:25]
about prompting is that there's
this whole world of unknown.

[18:25 - 18:26]
- What heuristics do you guys have

[18:26 - 18:30]
for when something is
possible versus not possible

[18:30 - 18:33]
with a perfect prompt,
whatever that might be?

[18:33 - 18:35]
- I think I'm usually checking

[18:35 - 18:37]
for whether the model kind of gets it.

[18:37 - 18:40]
So I think for things where
I just don't think a prompt

[18:40 - 18:43]
is going to help, there is
a little bit of grinding.

[18:43 - 18:45]
But often, it just becomes really clear

[18:45 - 18:47]
that it's not close or something.

[18:49 - 18:50]
Yeah.

[18:50 - 18:52]
I don't know if that's a
weird one where I'm just like,

[18:52 - 18:55]
"Yeah, if the model just
clearly can't do something,

[18:55 - 18:58]
I won't grind on it for too long."

[18:58 - 18:59]
- This is the part that you can evoke

[18:59 - 19:00]
how it's thinking about it,

[19:00 - 19:02]
and you can ask it how it's
thinking about it and why.

[19:02 - 19:05]
And you can get a sense of is
it thinking about it right?

[19:05 - 19:09]
Are we even in the right zip
code of this being right?

[19:11 - 19:14]
And you can get a little bit
of a kneeling on that front of,

[19:14 - 19:15]
at least, I feel like I'm making progress

[19:15 - 19:19]
towards getting something closer to right.

[19:19 - 19:20]
Where there's just some tasks

[19:20 - 19:23]
where you really don't get anywhere closer

[19:23 - 19:24]
to it's thought process.

[19:24 - 19:27]
It's just like every tweak you make

[19:27 - 19:29]
just veers off in a completely different,

[19:29 - 19:31]
very wrong direction, and I
just tend to abandon those.

[19:31 - 19:32]
I don't know.

[19:32 - 19:33]
- Those are so rare now though,

[19:33 - 19:36]
and I get really angry at the
model when I discover them

[19:36 - 19:38]
because that's how rare they are.

[19:38 - 19:39]
I get furious.

[19:39 - 19:43]
I'm like, "How dare there be
a task that you can't just do,

[19:43 - 19:45]
if I just push you in
the right direction?"

[19:46 - 19:49]
- I had my thing with Claude
plays Pokemon recently,

[19:49 - 19:51]
and that was one of the
rare times where I really...

[19:51 - 19:52]
- Yeah, can you explain that?

[19:52 - 19:54]
Explain that just for people.
I think that's really cool.

[19:54 - 19:56]
- I did a bit of an experiment

[19:56 - 19:59]
where I hooked Claude up
to a Game Boy emulator,

[19:59 - 20:02]
and tried to have it
play the game Pokemon Red

[20:02 - 20:05]
like the OG Pokemon.

[20:05 - 20:09]
And it's like you think what you wanna do

[20:09 - 20:10]
and it could write some
code to press buttons

[20:10 - 20:12]
and stuff like that, pretty basic.

[20:12 - 20:15]
And I tried a bunch of
different very complex

[20:15 - 20:18]
prompting layouts, but you
just get into certain spots

[20:18 - 20:21]
where it just really couldn't do it.

[20:21 - 20:24]
So showing it a screenshot of a Game Boy,

[20:24 - 20:26]
it just really couldn't do.

[20:26 - 20:28]
And it just so deeply
because I'm so used to it,

[20:28 - 20:32]
being able to do something mostly.

[20:32 - 20:37]
So I spent a whole weekend
trying to write better

[20:37 - 20:38]
and better prompts to get it

[20:38 - 20:41]
to really understand this Game Boy screen.

[20:41 - 20:44]
And I got incrementally better
so that it was only terrible

[20:44 - 20:46]
instead of completely no signal.

[20:46 - 20:48]
You could get from no
signal to some signal.

[20:49 - 20:53]
But it was, I don't know, at
least this is elicited for me.

[20:53 - 20:56]
Once I put a weekend of time
in and I got from no signal

[20:56 - 20:58]
to some signal, but nowhere
close to good enough,

[20:58 - 21:00]
I'm like, "I'm just going
to wait for the next one.

[21:00 - 21:01]
(Alex laughing)

[21:01 - 21:02]
I'm just gonna wait for another model."

[21:02 - 21:04]
I could grind on this for four months,

[21:04 - 21:07]
and the thing that would
come out is another model

[21:07 - 21:09]
and that's a better use of my time.

[21:09 - 21:11]
Just sit and wait to do
something else in the meanwhile.

[21:11 - 21:12]
- Yeah.

[21:12 - 21:14]
That's an inherent tension
we see all the time,

[21:14 - 21:16]
and maybe we can get to that in a sec.

[21:16 - 21:17]
Zack, if you wanna go.

[21:17 - 21:19]
- Something I liked about
your prompt with Pokemon

[21:19 - 21:22]
where you got the best that you did get,

[21:22 - 21:24]
was the way that you
explained to the model

[21:24 - 21:27]
that it is in the middle
of this Pokemon game.

[21:27 - 21:29]
Here's how the things
are gonna be represented.

[21:33 - 21:35]
I actually think you
actually represented it

[21:35 - 21:36]
in two different ways, right?

[21:36 - 21:37]
- I did.

[21:37 - 21:40]
So what I ended up doing, it was obnoxious

[21:40 - 21:44]
but I superimposed a grid over the image,

[21:44 - 21:46]
and then I had to describe
each segment of the grid

[21:46 - 21:48]
in visual detail.

[21:48 - 21:51]
Then I had to reconstruct
that into an ASCII map

[21:51 - 21:53]
and I gave it as much detail as I could.

[21:53 - 21:57]
The player character is always
at location 4, 5 on the grid

[21:57 - 21:58]
and stuff like that,

[21:58 - 22:01]
and you can slowly build up information.

[22:02 - 22:03]
I think it's actually
a lot like prompting,

[22:03 - 22:05]
but I just hadn't done
it with images before.

[22:05 - 22:08]
Where sometimes my intuition

[22:08 - 22:10]
for what you need to
tell a model about text,

[22:10 - 22:11]
is a lot different

[22:11 - 22:13]
from what you need to
tell a model about images.

[22:13 - 22:14]
- Yeah.

[22:14 - 22:18]
- I found a surprisingly
small number of my intuitions

[22:18 - 22:20]
about text have transferred to image.

[22:20 - 22:23]
I found that multi-shot
prompting is not as effective

[22:23 - 22:24]
for images and text.

[22:24 - 22:25]
I'm not really sure,

[22:25 - 22:27]
you can have theoretical
explanations about why.

[22:27 - 22:30]
Maybe there's a few of
it in the training data,

[22:30 - 22:31]
a few examples of that.

[22:32 - 22:33]
- Yeah.

[22:33 - 22:34]
I know when we were doing
the original explorations

[22:34 - 22:36]
with prompting multimodal,

[22:36 - 22:39]
we really couldn't get
it to noticeably work.

[22:40 - 22:44]
You just can't seem to
improve Claude's actual,

[22:44 - 22:47]
visual acuity in terms of what
it picks up within an image.

[22:48 - 22:51]
Anyone here has any ways that
they've not seen that feature.

[22:51 - 22:53]
But it seems like that's
similar with the Pokemon thing

[22:53 - 22:55]
where it's trying to interpret this thing.

[22:55 - 22:57]
No matter how much you
throw prompts at it,

[22:57 - 23:01]
it just won't pick up that
Ash that's in that location.

[23:01 - 23:02]
- Yeah.

[23:02 - 23:03]
But I guess to be visceral about this,

[23:03 - 23:05]
I could eventually get it

[23:05 - 23:07]
so that it could most often
tell me where a wall was,

[23:07 - 23:10]
and most often tell me
where the character was.

[23:10 - 23:11]
It'd be off by a little bit.

[23:11 - 23:13]
But then you get to a point,

[23:13 - 23:15]
and this is maybe coming back to knowing

[23:15 - 23:16]
when you can't do it.

[23:17 - 23:19]
It would describe an NPC,
and to play a game well,

[23:19 - 23:21]
you need to have some sense of continuity.

[23:21 - 23:24]
Have I talked to this NPC before?

[23:25 - 23:27]
And without that, you really don't,

[23:27 - 23:28]
there's nothing you can do.

[23:28 - 23:29]
You're just going to
keep talking to the NPC,

[23:29 - 23:31]
'cause like, "Well, maybe
this is a different NPC."

[23:31 - 23:34]
But I would try very hard
to get it to describe a NPC

[23:34 - 23:37]
and it's like, "It's a person."

[23:37 - 23:40]
They might be wearing a hat,
they weren't wearing a hat.

[23:40 - 23:42]
And it's like you grind for a while,

[23:42 - 23:46]
inflate it to 3000X and just
crop it to just the NPC,

[23:46 - 23:48]
and it's like, "I have
no idea what this is."

[23:48 - 23:53]
It's like I showed it this
clear, female NPC thing

[23:54 - 23:56]
enough times and it just
got nowhere close to it,

[23:56 - 23:59]
and it's like, "Yeah, this
is a complete lost cause."

[23:59 - 24:00]
- Wow, okay.

[24:00 - 24:01]
- I really want to try this now.

[24:01 - 24:04]
I'm just imagining all
the things I would try.

[24:04 - 24:08]
I don't know, I want you
to imagine this game art

[24:08 - 24:11]
as a real human and just
describe to me what they're like.

[24:11 - 24:13]
What did they look like as
they look in the mirror?

[24:13 - 24:17]
And then just see what the model does.

[24:17 - 24:18]
- I tried a lot of things.

[24:18 - 24:20]
The eventual prompt was telling Claude

[24:20 - 24:23]
it was a screen reader for a blind person,

[24:23 - 24:24]
which I don't know if that helped,

[24:24 - 24:26]
but it felt right so I stuck with that.

[24:26 - 24:27]
- That's an interesting point.

[24:27 - 24:29]
I actually wanna go into this a little bit

[24:29 - 24:32]
'cause this is one of the
most famous prompting tips,

[24:32 - 24:35]
is to tell the language model
that they are some persona

[24:35 - 24:36]
or some role.

[24:37 - 24:39]
I feel like I see mixed results.

[24:39 - 24:41]
Maybe this worked a little
bit better in previous models

[24:41 - 24:43]
and maybe not as much anymore.

[24:43 - 24:47]
Amanda, I see you all the time
be very honest with the model

[24:47 - 24:48]
about the whole situation like,

[24:48 - 24:51]
"Oh, I am an AI researcher and
I'm doing this experiment."

[24:51 - 24:52]
- I'll tell it who I am.
- Yeah.

[24:52 - 24:53]
- I'll give it my name,

[24:53 - 24:54]
be like, "Here's who you're talking to."

[24:54 - 24:55]
- Right.

[24:55 - 24:57]
Do you think that level of honesty,

[24:57 - 25:01]
instead of lying to the
model or forcing it to like,

[25:01 - 25:03]
"I'm gonna tip you $500."

[25:03 - 25:06]
Is there one method
that's preferred there,

[25:06 - 25:09]
or just what's your intuition on that?

[25:09 - 25:10]
- Yeah.

[25:10 - 25:12]
I think as models are more
capable and understand more

[25:12 - 25:13]
about the world, I guess,

[25:13 - 25:18]
I just don't see it as
necessary to lie to them.

[25:18 - 25:20]
I also don't like lying to the models

[25:20 - 25:23]
just 'cause I don't like lying generally.

[25:23 - 25:26]
But part of me is if you
are, say, constructing.

[25:26 - 25:28]
Suppose you're constructing
an eval dataset

[25:28 - 25:32]
for a machine learning system
or for a language model.

[25:32 - 25:35]
That's very different
from constructing a quiz

[25:35 - 25:36]
for some children.

[25:36 - 25:38]
So when people would do things like,

[25:38 - 25:42]
"I am a teacher trying to figure
out questions for a quiz."

[25:42 - 25:44]
I'm like, "The model knows
what language model evals are."

[25:45 - 25:47]
If you ask it about different
evals it can tell you,

[25:47 - 25:50]
and it can give you made up
examples of what they look like.

[25:50 - 25:52]
'Cause these things are
like they understand them,

[25:52 - 25:54]
they're on the internet.

[25:54 - 25:54]
So I'm like,

[25:54 - 25:56]
"I'd much rather just target
the actual task that I have."

[25:56 - 25:59]
So if you're like, "I want
you to construct questions

[25:59 - 26:02]
that look a lot like an
evaluation of a language model."

[26:02 - 26:05]
It's that whole thing
of clear communication.

[26:05 - 26:07]
I'm like, "That is, in
fact, the task I want to do.

[26:07 - 26:08]
So why would I pretend to you

[26:08 - 26:11]
that I want to do some unrelated,

[26:11 - 26:13]
or only tangentially related task?"

[26:13 - 26:14]
And then expect you to
somehow do better at the task

[26:14 - 26:16]
that I actually want you to do.

[26:16 - 26:18]
We don't do this with employees.

[26:18 - 26:21]
I wouldn't go to someone that
worked with me and be like,

[26:21 - 26:25]
"You are a teacher and you're
trying to quiz your students."

[26:25 - 26:28]
I'd be like, "Hey, are you
making that eval?" I don't know.

[26:28 - 26:31]
So I think maybe it's a heuristic
from there where I'm like,

[26:31 - 26:32]
"If they understand the thing,

[26:32 - 26:33]
just ask them to do the
thing that you want."

[26:33 - 26:34]
- I see this so much.
- I guess

[26:34 - 26:36]
to push back a little bit,

[26:36 - 26:40]
I have found cases where not exactly lying

[26:40 - 26:41]
but giving it a metaphor

[26:41 - 26:43]
for how to think about it could help.

[26:43 - 26:45]
In the same way that sometimes
I might not understand

[26:45 - 26:46]
how to do something and someone's like,

[26:46 - 26:47]
"Imagine that you were doing this,

[26:47 - 26:49]
even though I know I'm not doing it."

[26:49 - 26:50]
The one that comes to mind for me,

[26:50 - 26:54]
is I was trying to have
Claude say whether an image

[26:54 - 26:57]
of a chart or a graph is good or not.

[26:57 - 26:59]
Is it high quality?

[26:59 - 27:02]
And the best prompt that I found for this

[27:02 - 27:05]
was asking the model what
grade it would give the chart,

[27:05 - 27:09]
if it were submitted as
a high school assignment.

[27:09 - 27:13]
So it's not exactly saying,
"You are a high school teacher."

[27:13 - 27:17]
It's more like, "This
is the kind of analysis

[27:17 - 27:20]
that I'm looking from for you."

[27:20 - 27:22]
The scale that a teacher would
use is similar to the scale

[27:22 - 27:24]
that I want you to use.

[27:25 - 27:27]
- But I think those
metaphors are pretty hard

[27:27 - 27:27]
to still come up with.

[27:27 - 27:30]
I think people still, the
default you see all the time

[27:30 - 27:33]
is finding some facsimile of the task.

[27:33 - 27:35]
Something that's a very similar-ish task,

[27:35 - 27:38]
like saying you're a teacher.

[27:38 - 27:40]
You actually just lose a lot

[27:40 - 27:41]
in the nuance of what your product is.

[27:41 - 27:43]
I see this so much in enterprise prompts

[27:43 - 27:46]
where people write something similar,

[27:46 - 27:48]
because they have this intuition

[27:48 - 27:51]
that it's something the
model has seen more of maybe.

[27:51 - 27:56]
It's seen more high school
quizzes than it has LLM evals,

[27:56 - 27:58]
and that may be true.

[27:58 - 28:01]
But to your point, as
the models get better,

[28:01 - 28:05]
I think just trying to
be very prescriptive

[28:05 - 28:07]
about exactly the situation they're in.

[28:07 - 28:09]
I give people that advice all the time.

[28:09 - 28:11]
Which isn't to say that I
don't think to the extent

[28:11 - 28:16]
that it is true that
thinking about it the way

[28:16 - 28:17]
that someone would grade a chart,

[28:17 - 28:19]
as how they would grade
a high school chart,

[28:19 - 28:21]
maybe that's true.

[28:21 - 28:25]
But it's awkwardly the shortcut
people use a lot of times

[28:25 - 28:26]
to try to get what happens,

[28:26 - 28:28]
so I'll try to get someone
that I can actually talk about

[28:28 - 28:29]
'cause I think it's somewhat interesting.

[28:29 - 28:34]
So writing you are a helpful assistant,

[28:35 - 28:40]
writing a draft of a document,
it's not quite what you are.

[28:41 - 28:44]
You are in this product, so tell me.

[28:44 - 28:47]
If you're writing an
assistant that's in a product,

[28:47 - 28:48]
tell me I'm in the product.

[28:48 - 28:51]
Tell me I'm writing on
behalf of this company,

[28:51 - 28:52]
I'm embedded in this product.

[28:52 - 28:55]
I'm the support chat
window on that product.

[28:56 - 28:59]
You're a language model, you're
not a human, that's fine.

[28:59 - 29:01]
But just being really prescriptive

[29:01 - 29:05]
about the exact context about
where something is being used.

[29:05 - 29:06]
I found a lot of that.

[29:06 - 29:09]
Because I guess my concern
most often with role prompting,

[29:09 - 29:12]
is people used it as a shortcut

[29:12 - 29:13]
of a similar task they
want the model to do.

[29:13 - 29:14]
And then they're surprised

[29:14 - 29:16]
when Claude doesn't do their task right,

[29:16 - 29:18]
but it's not the task.

[29:18 - 29:21]
You told it to do some other task.

[29:21 - 29:23]
And if you didn't give it
the details about your task,

[29:23 - 29:24]
I feel like you're leaving
something on the table.

[29:24 - 29:28]
So I don't know, it does
feel like a thing though

[29:28 - 29:31]
to your point of as the models scale.

[29:31 - 29:32]
Maybe in the past it was true

[29:32 - 29:35]
that they only really had
a strong understanding

[29:35 - 29:39]
of elementary school tests comparatively.

[29:39 - 29:42]
But as they get smarter and
can differentiate more topics,

[29:42 - 29:44]
I don't know, just like being clear.

[29:44 - 29:45]
- I find it interesting

[29:45 - 29:47]
that I've never used
this prompting technique.

[29:47 - 29:48]
- Yeah, that's funny.

[29:49 - 29:50]
- Even with worse models

[29:50 - 29:53]
and I still just don't ever
find myself, I don't know why.

[29:53 - 29:57]
I'm just like, "I don't find
it very good essentially."

[29:57 - 29:58]
- Interesting.

[29:58 - 30:00]
- I feel like completion era models,

[30:01 - 30:03]
there was a little bit of a mental model

[30:03 - 30:07]
of conditioning the
model into a latent space

[30:07 - 30:10]
that was useful that I worried about,

[30:10 - 30:12]
that I don't really worry
about too much anymore.

[30:12 - 30:15]
- It might be intuitions
from pretrained models

[30:15 - 30:20]
over to RLHF models, that to
me, just didn't make sense.

[30:20 - 30:22]
It makes sense to me if
you're prompting a pretrained.

[30:22 - 30:23]
- You'd be amazed how many people

[30:23 - 30:25]
try to apply their intuitions.

[30:25 - 30:27]
I think it's not that surprising.

[30:27 - 30:29]
Most people haven't really experimented

[30:29 - 30:31]
with the full what is a pretrained model?

[30:31 - 30:34]
What happens after you do SL?

[30:34 - 30:37]
What happens after you do RLHF, whatever?

[30:39 - 30:41]
So when I talk to customers,

[30:41 - 30:44]
it's all the time that they're
trying to map some amount of,

[30:44 - 30:46]
"Oh, how much of this was on the internet?

[30:46 - 30:48]
Have they seen a ton of
this on the internet?"

[30:48 - 30:51]
You just hear that intuition a lot,

[30:51 - 30:54]
and I think it's
well-founded fundamentally.

[30:54 - 30:56]
But it is overapplied

[30:58 - 30:59]
by the time you actually get to a prompt,

[30:59 - 31:00]
because of what you said.

[31:00 - 31:02]
By the time they've gone
through all of this other stuff,

[31:02 - 31:05]
that's not actually quite
what's being modeled.

[31:05 - 31:05]
- Yeah.

[31:05 - 31:08]
The first thing that I feel
like you should try is,

[31:08 - 31:10]
I used to give people
this thought experiment

[31:10 - 31:13]
where it's like imagine
you have this task.

[31:13 - 31:18]
You've hired a temp agency to
send someone to do this task.

[31:18 - 31:21]
This person arrives, you know
they're pretty competent.

[31:21 - 31:23]
They know a lot about your
industry and so forth,

[31:23 - 31:25]
but they don't know the
name of your company.

[31:25 - 31:26]
They've literally just
shown up and they're like,

[31:26 - 31:29]
"Hey, I was told you guys
had a job for me to do,

[31:29 - 31:30]
tell me about it."

[31:30 - 31:33]
And then it's like, "What
would you say to that person?"

[31:33 - 31:34]
And you might use these metaphors.

[31:34 - 31:37]
You might say things like,

[31:37 - 31:41]
"We want you to detect good charts.

[31:41 - 31:42]
What we mean by a good chart here,

[31:42 - 31:44]
is it doesn't need to be perfect.

[31:44 - 31:45]
You don't need to go look up

[31:45 - 31:47]
whether all of the details are correct."

[31:47 - 31:50]
It just needs to have its axes labeled,

[31:50 - 31:55]
and so think about maybe high
school level, good chart.

[31:55 - 31:56]
You may say exactly that to that person

[31:56 - 31:59]
and you're not saying to
them, "You are a high school."

[31:59 - 32:00]
You wouldn't say that to them.

[32:00 - 32:01]
You wouldn't be like,

[32:01 - 32:02]
"You're a high school
teacher reading charts."

[32:04 - 32:05]
- What are you talking about?

[32:05 - 32:10]
- Yeah, so sometimes I'm
just like it's like the whole

[32:10 - 32:11]
if I read it.

[32:11 - 32:11]
I'm just like, "Yeah.

[32:11 - 32:13]
Imagine this person who just
has very little context,

[32:13 - 32:14]
but they're quite competent.

[32:14 - 32:16]
They understand a lot of
things about the world."

[32:16 - 32:18]
Try the first version
that actually assumes

[32:18 - 32:20]
that they might know
things about the world,

[32:20 - 32:22]
and if that doesn't work, you
can maybe do tweaks and stuff.

[32:22 - 32:24]
But so often, the first
thing I try is that,

[32:24 - 32:26]
and then I'm like, "That just worked."

[32:26 - 32:27]
- That worked.

[32:27 - 32:28]
- And then people are like,

[32:28 - 32:30]
"Oh, I didn't think to just
tell it all about myself

[32:30 - 32:31]
and all about the task I want to do."

[32:31 - 32:33]
- I've carried this
thing that Alex told me

[32:33 - 32:35]
to so many customers where they're like,

[32:35 - 32:37]
"Oh, my prompt doesn't work.

[32:37 - 32:37]
Can you help me fix it?"

[32:37 - 32:40]
I'm like, "Well, can you describe
to me what the task was?"

[32:40 - 32:41]
And I'm like, "Okay.

[32:41 - 32:42]
Now what you just said to me,

[32:42 - 32:45]
just voice record that
and then transcribe it."

[32:45 - 32:47]
And then paste it into the prompt

[32:47 - 32:49]
and it's a better prompt
than what you wrote,

[32:49 - 32:52]
but this is a laziness shortcut,
I think, to some extent.

[32:52 - 32:55]
Because people write
something that they...

[32:55 - 32:57]
I just think people, I'm lazy.
A lot of people are lazy.

[32:57 - 32:59]
- We had that in prompt
assistance the other day

[32:59 - 33:01]
where somebody was like,

[33:01 - 33:03]
"Here's the thing, here's
what I want it to do,

[33:03 - 33:05]
and here's what it's
actually doing instead."

[33:05 - 33:06]
So then I just literally copied the thing

[33:06 - 33:07]
that they said they wanted it to do,

[33:07 - 33:09]
and pasted it in and it worked.

[33:09 - 33:11]
- Yeah.

[33:11 - 33:13]
I think a lot of people still

[33:13 - 33:15]
haven't quite wrapped their heads

[33:15 - 33:17]
around what they're really
doing when they're prompting.

[33:17 - 33:19]
A lot of people see a text box

[33:19 - 33:21]
and they think it's a Google search box.

[33:21 - 33:22]
They type in keywords

[33:22 - 33:24]
and maybe that's more on the chat side.

[33:24 - 33:26]
But then on the enterprise side of things,

[33:26 - 33:29]
you're writing a prompt
for an application.

[33:29 - 33:31]
There is still this weird thing to it

[33:31 - 33:34]
where people are trying to
take all these little shortcuts

[33:34 - 33:35]
in their prompt, and just thinking that,

[33:35 - 33:37]
"Oh, this line carries a
lot of weight in this."

[33:37 - 33:38]
- Yeah.

[33:38 - 33:40]
I think you obsess over
getting the perfect little line

[33:40 - 33:42]
of information and instruction,

[33:42 - 33:45]
as opposed to how you just
described that graph thing.

[33:45 - 33:48]
I would be a dream if I
read prompts like that.

[33:48 - 33:50]
If someone's like, "Well,
you do this and this,

[33:50 - 33:52]
and there's some stuff to
consider about this and all that."

[33:52 - 33:54]
But that's just not how
people write prompts.

[33:54 - 33:58]
They work so hard to find
the perfect, insightful.

[33:58 - 34:02]
A perfect graph looks exactly
like this exact perfect thing,

[34:02 - 34:04]
and you can't do that.

[34:04 - 34:05]
It's just very hard

[34:05 - 34:08]
to ever write that set of
instructions down prescriptively,

[34:08 - 34:10]
as opposed to how we actually
talk to humans about it,

[34:10 - 34:12]
which is try to instill some amount

[34:12 - 34:13]
of the intuitions you have.

[34:13 - 34:15]
- We also give them outs.

[34:15 - 34:18]
This is a thing that people
can often forget in prompts.

[34:18 - 34:20]
So cases, if there's an edge case,

[34:20 - 34:21]
think about what you want the model to do.

[34:21 - 34:22]
'Cause by default,

[34:22 - 34:24]
it will try the best to
follow your instructions,

[34:24 - 34:26]
much as the person from
the temp agency would,

[34:26 - 34:27]
'cause they're like,

[34:27 - 34:30]
"Well, they didn't tell me how
to get in touch with anyone."

[34:30 - 34:32]
If I'm just given a picture
of a goat and I'm like,

[34:32 - 34:33]
"What do I do?

[34:33 - 34:35]
This isn't even a chart.

[34:35 - 34:38]
How good is a picture
of a goat as a chart?"

[34:38 - 34:39]
I just don't know.

[34:40 - 34:42]
And if you instead say something like,

[34:42 - 34:44]
"If something weird happens
and you're really not sure

[34:44 - 34:47]
what to do, just output in tags unsure."

[34:49 - 34:50]
Then you can go look through the unsures

[34:50 - 34:52]
that you got and be like, "Okay, cool.

[34:52 - 34:53]
It didn't do anything weird."

[34:53 - 34:55]
Whereas by default, if you don't
give the person the option,

[34:55 - 34:58]
they're like, "It's a good chart."

[34:58 - 35:00]
Then people will be
like, "How do I do that?"

[35:00 - 35:02]
And then you're like,
"Well, give it an out.

[35:02 - 35:03]
Give it something to do

[35:03 - 35:05]
if it's a really
unexpected input happens."

[35:05 - 35:07]
- And then you also
improved your data quality

[35:07 - 35:08]
by doing that too,

[35:08 - 35:10]
'cause you found all
the screwed up examples.

[35:10 - 35:11]
- Oh, yeah.

[35:11 - 35:14]
- That's my favorite thing
about iterating on tests

[35:14 - 35:15]
with Claude, is the most common outcome

[35:15 - 35:19]
is I find all of the terrible
tests I accidentally wrote

[35:19 - 35:20]
because it gets it wrong.

[35:20 - 35:21]
I'm like, "Oh, why did it get wrong?"

[35:21 - 35:22]
I was like, "Oh, I was wrong."

[35:22 - 35:25]
- Yeah.
- Yeah.

[35:25 - 35:27]
- If I was a company working with this,

[35:27 - 35:30]
I do think I would just
give my prompts to people,

[35:31 - 35:32]
because I used to do this

[35:32 - 35:34]
when I was evaluating language models.

[35:34 - 35:36]
I would take the eval myself.

[35:36 - 35:37]
'Cause I'm like,

[35:37 - 35:38]
"I need to know what this eval looks like

[35:38 - 35:41]
if I'm gonna to be grading
it, having models take it,

[35:41 - 35:42]
thinking about outputs, et cetera."

[35:42 - 35:44]
I would actually just
set up a little script

[35:44 - 35:46]
and I would just sit
and I would do the eval.

[35:47 - 35:50]
- Nowadays, you just have
called the Streamboard app

[35:50 - 35:50]
for you.

[35:50 - 35:52]
- And just does it, yeah.

[35:52 - 35:56]
- Yeah. I'm reminded
of Karpathy's ImageNet.

[35:56 - 36:01]
I was in 231 at Stanford
and it's like benchmarking,

[36:01 - 36:03]
he's showing the accuracy number.

[36:03 - 36:05]
And he's like, "And here's
what my accuracy number was."

[36:05 - 36:06]
And he had just gone through the test set

[36:06 - 36:08]
and evaluated himself.
- Oh, yeah.

[36:08 - 36:09]
- You just learn a lot.
- Yeah, totally.

[36:09 - 36:13]
- And it's better when it's a, again,

[36:13 - 36:14]
the temp agency person,

[36:14 - 36:15]
like someone who doesn't know the task,

[36:15 - 36:18]
because that's a very
clean way to learn things.

[36:18 - 36:19]
- Yeah.

[36:19 - 36:20]
The way you have to do it is,

[36:20 - 36:23]
some evaluations come with instructions,

[36:23 - 36:25]
and so I would give myself
those instructions as well

[36:25 - 36:27]
and then try to understand it.

[36:28 - 36:30]
And it's actually quite great
if you don't have context

[36:30 - 36:31]
on how it's graded.

[36:32 - 36:34]
And so often, I would do so much worse

[36:34 - 36:35]
than the human benchmark and I was like,

[36:35 - 36:37]
"I don't even know how you
got humans to do this well

[36:37 - 36:41]
at this task, 'cause apparently
human level here is 90%,

[36:41 - 36:45]
and I'm at 68%."

[36:45 - 36:46]
- That's funny.

[36:46 - 36:49]
That reminds me of just when
you look at the MMLU questions

[36:49 - 36:53]
and you're like, "Who would
be able to answer these?"

[36:53 - 36:56]
It's just like absolute
garbage in some of them.

[36:57 - 36:59]
Okay.

[36:59 - 37:01]
I have one thing I wanna circle back on

[37:01 - 37:05]
that we were talking about
a few questions back around,

[37:05 - 37:08]
I think you were saying getting
signal from the responses.

[37:08 - 37:12]
There's just so much there and
it's more than just a number,

[37:12 - 37:16]
and you can actually read into
the almost thought process.

[37:16 - 37:19]
I bet this is probably a
little contentious maybe

[37:19 - 37:21]
around chain of thought.

[37:21 - 37:23]
For people listening, chain of thought,

[37:23 - 37:25]
this process of getting them all

[37:25 - 37:27]
to actually explain its reasoning

[37:27 - 37:28]
before it provides an answer.

[37:29 - 37:31]
Is that reasoning real

[37:31 - 37:33]
or is it just kind of like a holding space

[37:33 - 37:36]
for the model to do computation?

[37:36 - 37:38]
Do we actually think there's
good, insightful signal

[37:38 - 37:41]
that we're getting out of the model there?

[37:41 - 37:43]
- This is one of the places
where I struggle with that.

[37:43 - 37:46]
I'm normally actually
somewhat pro-personification

[37:46 - 37:49]
because I think it helps
you get decent facsimiles,

[37:49 - 37:52]
thoughts of how the model's working.

[37:52 - 37:55]
And this one, I think
it's harmful maybe almost

[37:55 - 37:59]
to get too into the personification
of what reasoning is,

[37:59 - 38:00]
'cause it just loses the thread

[38:00 - 38:02]
of what we're trying to do here.

[38:02 - 38:03]
Is it reasoning or not?

[38:03 - 38:06]
It feels almost like a different question

[38:06 - 38:08]
than what's the best prompting technique?

[38:08 - 38:09]
It's like you're getting into philosophy,

[38:09 - 38:11]
which we can get into.

[38:11 - 38:13]
- Yeah, we do have a philosopher.

[38:13 - 38:15]
- Yeah.

[38:15 - 38:16]
I will happily be beaten
down by a real philosopher

[38:16 - 38:21]
as I try to speculate on this,
but instead, it just works.

[38:21 - 38:23]
Your model does better.

[38:23 - 38:26]
The outcome is better if you do reasoning.

[38:26 - 38:30]
I think I've found that if
you structure the reasoning

[38:30 - 38:32]
and help iterate with the model

[38:32 - 38:34]
on how it should do reasoning,
it works better too.

[38:38 - 38:39]
Whether or not that's reasoning

[38:39 - 38:41]
or how you wanted to classify it,

[38:41 - 38:42]
you can think of all sorts of proxies

[38:42 - 38:44]
for how I would also do really bad

[38:44 - 38:47]
if I had to do one-shot math
without writing anything down.

[38:47 - 38:51]
Maybe that's useful, but
all I really know is,

[38:51 - 38:54]
it very obviously does help.

[38:54 - 38:54]
I don't know.

[38:54 - 38:55]
- A way of testing would be

[38:55 - 38:58]
if you take out all the
reasoning that it did

[38:58 - 39:00]
to get to the right
answer, and then replace it

[39:00 - 39:04]
with somewhat, realistic-looking reasoning

[39:04 - 39:05]
that led to a wrong answer,

[39:05 - 39:08]
and then see if it does
conclude the wrong answer.

[39:08 - 39:11]
I think we actually had a paper
where we did some of that.

[39:12 - 39:17]
There was the scratch pad. It
was like the Sleeper Agents.

[39:17 - 39:19]
- Oh, okay. Alignment papers.

[39:19 - 39:22]
- But I think that was
maybe a weird situation.

[39:22 - 39:27]
But definitely what you said
about structuring the reasoning

[39:27 - 39:30]
and writing example of
how the reasoning works.

[39:30 - 39:32]
Given that that helps,

[39:33 - 39:35]
like whether we use the
word reasoning or not,

[39:35 - 39:38]
I don't think it's just
a space for computation.

[39:38 - 39:40]
- So there is something there.

[39:40 - 39:41]
- I think there's something there,

[39:41 - 39:42]
whatever we wanna call it.

[39:42 - 39:43]
- Yeah.

[39:43 - 39:45]
Having it write a story
before it finished a task,

[39:45 - 39:46]
I do not think would work as well.

[39:46 - 39:48]
- I've actually tried that

[39:48 - 39:50]
and it didn't work as well as reasoning.

[39:50 - 39:53]
- Clearly, the actual reasoning part

[39:53 - 39:55]
is doing something towards the outcome.

[39:55 - 39:56]
- I've tried like,

[39:56 - 39:59]
"Repeat the words um and ah
in any order that you please

[39:59 - 40:02]
for 100 tokens and then answer."

[40:02 - 40:03]
- Yeah.

[40:03 - 40:03]
I guess that's a pretty thorough defeat

[40:03 - 40:05]
of it's just more computational space

[40:05 - 40:06]
where it can do attention
over and over again.

[40:06 - 40:08]
I don't think it's just more attention

[40:08 - 40:10]
like doing more attention.

[40:10 - 40:11]
- I guess the strange thing is,

[40:11 - 40:13]
and I don't have an example
off the top of my head

[40:13 - 40:14]
to back this up with.

[40:14 - 40:16]
But I definitely have seen it before

[40:16 - 40:18]
where it lays out steps,
one of the steps is wrong,

[40:18 - 40:22]
but then it still reaches
the right answer at the end.

[40:22 - 40:24]
So it's not quite, I guess, yeah,

[40:24 - 40:27]
we can't really, truly
personify it as a reasoning,

[40:27 - 40:29]
'cause there is some element to it

[40:31 - 40:32]
doing something slightly different.

[40:32 - 40:33]
- Yeah.

[40:33 - 40:34]
I've also met a lot of people

[40:34 - 40:37]
who make inconsistent steps of reasoning.

[40:37 - 40:39]
- I guess that's true.

[40:40 - 40:42]
- It fundamentally defeats
the topic of reasoning

[40:42 - 40:44]
by making a false step on the way there.

[40:44 - 40:46]
- All right, it's interesting.

[40:47 - 40:52]
Also, on maybe this prompting
misconceptions round

[40:52 - 40:52]
of questions.

[40:54 - 40:57]
Zack, I know you have
strong opinions on this,

[40:57 - 40:59]
good grammar, punctuation.
- Oh, do I?

[40:59 - 41:03]
- Is that necessary in a
prompt? Do you need it?

[41:03 - 41:05]
Do you need to format
everything correctly?

[41:07 - 41:09]
- I usually try to do that

[41:09 - 41:13]
because I find it fun, I guess, somehow.

[41:14 - 41:16]
I don't think you necessarily need to.

[41:16 - 41:17]
I don't think it hurts.

[41:17 - 41:18]
I think it's more

[41:18 - 41:22]
that you should have the
level of attention to detail

[41:22 - 41:24]
that would lead you to
doing that naturally.

[41:25 - 41:28]
If you're just reading
over your prompt a lot,

[41:28 - 41:29]
you'll probably notice those things

[41:29 - 41:31]
and you may as well fix them.

[41:31 - 41:33]
And like what Amanda was saying,

[41:33 - 41:36]
that you wanna put as
much love into the prompt

[41:36 - 41:38]
as you do into the code.

[41:39 - 41:42]
People who write a lot of
code have strong opinions

[41:42 - 41:44]
about things that I could
not care less about.

[41:44 - 41:48]
Like the number of tabs versus
spaces, or I don't know,

[41:48 - 41:50]
opinions about which languages are better.

[41:50 - 41:51]
And for me,

[41:51 - 41:56]
I have opinionated beliefs
about styling of prompts.

[41:56 - 41:57]
I can't even say that
they're right or wrong,

[41:57 - 42:01]
but I think it's probably
good to try to acquire those,

[42:01 - 42:04]
even if they're arbitrary.

[42:04 - 42:06]
- I feel personally attacked,

[42:06 - 42:07]
'cause I definitely have prompts

[42:07 - 42:09]
that are like I feel like
I'm in the opposite end

[42:09 - 42:10]
of the spectrum where
people will see my prompts.

[42:10 - 42:12]
And then be like,

[42:12 - 42:13]
"This just has a whole
bunch of typos in it."

[42:13 - 42:16]
And I'm like, "The model
knows what I mean."

[42:16 - 42:17]
- It does, it does know what you mean,

[42:17 - 42:18]
but you're putting in the effort,

[42:18 - 42:21]
you just are attending
to different things.

[42:21 - 42:22]
- 'Cause part of me is like,

[42:22 - 42:24]
I think if it's conceptually
clear, I'm a big,

[42:26 - 42:27]
I will think a lot about
the concepts and the words

[42:27 - 42:28]
that I'm using.

[42:28 - 42:31]
So there's definitely a
sort of care that I put in.

[42:31 - 42:34]
But it's definitely not to, yeah,

[42:34 - 42:36]
people will just point out
typos and grammatical issues

[42:36 - 42:37]
with my prompts all the time.

[42:38 - 42:39]
Now I'm pretty good

[42:39 - 42:42]
at actually checking those
things more regularly.

[42:42 - 42:44]
- Is it because of pressure
from the outside world

[42:44 - 42:46]
or because it's actually
what you think is right?

[42:46 - 42:47]
- It's pressure from me.

[42:47 - 42:49]
- Yeah, it's probably pressure
from the outside world.

[42:49 - 42:50]
I do think it makes sense.

[42:50 - 42:52]
Part of me is like it's
such an easy check,

[42:52 - 42:54]
so I think for a final
prompt I would do that.

[42:54 - 42:55]
But throughout iteration,

[42:55 - 42:57]
I'll happily just iterate with prompts

[42:57 - 42:59]
that have a bunch of typos in
them, just 'cause I'm like,

[42:59 - 43:01]
"I just don't think that
the model's going to care."

[43:01 - 43:03]
- This gets at the pretrained model

[43:03 - 43:05]
versus RLHF thing though,

[43:05 - 43:07]
because I was talking
to Zack on the way over.

[43:07 - 43:10]
The conditional probability of a typo

[43:10 - 43:13]
based on a previous typo
in the pretraining data

[43:13 - 43:15]
is much higher.

[43:15 - 43:16]
- Oh, yeah.
- Like much higher.

[43:17 - 43:19]
- Prompting pretraining models
is just a different beast.

[43:19 - 43:21]
- It is, but it's interesting.

[43:21 - 43:23]
I think it's an interesting illustration

[43:23 - 43:26]
of why your intuitions,

[43:26 - 43:27]
like trying to over-apply the intuitions

[43:27 - 43:29]
of a pretrained model to the things

[43:29 - 43:32]
that we're actually using in production

[43:32 - 43:33]
doesn't work very well.

[43:33 - 43:36]
Because again, if you were to pass

[43:36 - 43:38]
one of your typo-ridden
prompts to a pretrained model,

[43:38 - 43:39]
the thing that would
come out the other side,

[43:39 - 43:43]
almost assuredly would be typo-ridden.

[43:43 - 43:44]
- Right.

[43:44 - 43:47]
- I like to leverage this to
create typo-ridden inputs.

[43:47 - 43:47]
- That's true.

[43:47 - 43:50]
I've done that.
- Like what you're saying,

[43:50 - 43:53]
try to anticipate what
your customers will put in.

[43:53 - 43:55]
The pretrained model is a
lot better at doing that.

[43:55 - 43:58]
'Cause the RL models are very polished

[43:58 - 44:00]
and they really never made a typo

[44:00 - 44:01]
in their lives.
- They've been told

[44:01 - 44:04]
pretty aggressively to
not do the typo thing.

[44:04 - 44:08]
- Yeah. Okay, so that's actually
an interesting segue here.

[44:08 - 44:10]
I've definitely mentioned
this to people in the past

[44:10 - 44:13]
around to try to help
people understand a frame

[44:13 - 44:14]
of talking to these models

[44:14 - 44:19]
in a sense almost as an
imitator to a degree.

[44:19 - 44:21]
And that might be much more
true of a pretrained model

[44:21 - 44:26]
than a post-trained, full-finished model,

[44:26 - 44:27]
but is there anything to that?

[44:27 - 44:28]
If you do talk to Claude

[44:28 - 44:30]
and use a ton of emojis and everything,

[44:30 - 44:34]
it will respond similarly, right?

[44:34 - 44:37]
So maybe some of that is
there, but like you're saying,

[44:37 - 44:39]
it's not all the way quite
like a pretrained model.

[44:39 - 44:41]
- It's just shifted to what you want.

[44:41 - 44:46]
I think at that point, it's
like trying to guess what you...

[44:46 - 44:47]
We have more or less trained the models

[44:47 - 44:50]
to guess what you want them to act like.

[44:51 - 44:52]
- Interesting.

[44:52 - 44:55]
- Or after we do all of our
fancy stuff after pretraining.

[44:57 - 45:00]
- The human laborers that used emojis,

[45:00 - 45:02]
prefer to get responses with emojis.

[45:02 - 45:03]
- Yeah.

[45:03 - 45:05]
Amanda writes things with typos

[45:05 - 45:07]
but wants not typos at the other end,

[45:07 - 45:10]
and Claude's pretty good
at figuring that out.

[45:10 - 45:11]
If you write a bunch of emojis to Claude,

[45:11 - 45:12]
it's probably the case

[45:12 - 45:16]
that you also want a bunch
of emojis back from Claude.

[45:16 - 45:17]
That's not surprising to me.

[45:17 - 45:18]
- Yeah.

[45:19 - 45:21]
This is probably something
we should have done earlier,

[45:21 - 45:23]
but I'll do it now.

[45:24 - 45:26]
Let's clarify maybe the differences

[45:26 - 45:30]
between what an enterprise
prompt is or a research prompt,

[45:30 - 45:33]
or a just general chat
in Claude.ai prompt.

[45:33 - 45:35]
Zack, you've spanned
the whole spectrum here

[45:35 - 45:39]
in terms of working with
customers and research.

[45:39 - 45:42]
Do you wanna just lay out what those mean?

[45:42 - 45:43]
- Yeah, I guess.

[45:45 - 45:46]
This feels too,

[45:46 - 45:48]
you're hitting me with
all the hard questions.

[45:48 - 45:50]
- Yeah. (laughing)

[45:50 - 45:52]
- Well, the people in this room,

[45:52 - 45:57]
I think of it as the prompts that I read

[45:57 - 46:01]
in Amanda's Claude
channel versus the prompts

[46:01 - 46:02]
that I read David write.

[46:02 - 46:06]
They're very similar in the
sense that the level of care

[46:06 - 46:08]
and nuance that's put into them.

[46:08 - 46:09]
I think for research,

[46:09 - 46:14]
you're looking for variety
and diversity a lot more.

[46:15 - 46:16]
So if I could boil it down to one thing,

[46:16 - 46:20]
it's like I've noticed
Amanda's not the biggest fan

[46:20 - 46:24]
of having lots of examples,
or one or two examples.

[46:24 - 46:27]
Like too few 'cause the
model will latch onto those.

[46:27 - 46:30]
And in prompts that I might write

[46:30 - 46:33]
or that I've seen David write,
we have a lot of examples.

[46:33 - 46:35]
I like to just go crazy and add examples

[46:35 - 46:39]
until I feel like I'm about to drop dead,

[46:39 - 46:41]
'cause I've added so many of them.

[46:42 - 46:45]
And I think that's because

[46:45 - 46:47]
when you're in a consumer application,

[46:47 - 46:51]
you really value reliability.

[46:51 - 46:53]
You care a ton about the format,

[46:53 - 46:56]
and it's fine if all the
answers are the same.

[46:56 - 46:59]
In fact, you almost
want them to be the same

[46:59 - 47:02]
in a lot of ways, not necessarily
you want to be responsive

[47:02 - 47:05]
to the user's desires.

[47:05 - 47:08]
Whereas a lot of times when
you're prompting for research,

[47:08 - 47:13]
you're trying to really tap
into the range of possibilities

[47:14 - 47:16]
that the model can explore.

[47:16 - 47:18]
And by having some examples,

[47:18 - 47:20]
you're actually constraining
that a little bit.

[47:20 - 47:25]
So I guess just on how
the prompts look level,

[47:25 - 47:26]
that's probably the biggest
difference I noticed

[47:26 - 47:29]
is how many examples are in
the prompt, which is not to say

[47:29 - 47:32]
that I've never seen you
write a prompt with examples.

[47:32 - 47:35]
But does that ring true for you?

[47:35 - 47:35]
- Yeah.

[47:35 - 47:36]
I think when I give examples,

[47:36 - 47:40]
often I actually try and make
the examples not like the data

[47:40 - 47:42]
that the model's going to see,

[47:42 - 47:44]
so they're intentionally illustrative.

[47:44 - 47:47]
Because if the model,
if I give it examples

[47:47 - 47:50]
that are very like the data
it's going to see, I just think

[47:50 - 47:54]
it is going to give me a
really consistent response

[47:54 - 47:56]
that might not actually be what I want.

[47:56 - 47:58]
Because my data that I'm running it on

[47:58 - 47:59]
might be extremely varied,

[47:59 - 48:01]
and so I don't want it
to just try and give me

[48:01 - 48:03]
this really rote output.

[48:03 - 48:05]
Often, I want it to be
much more responsive.

[48:05 - 48:08]
It's much more like
cognitive tasks essentially

[48:08 - 48:10]
where I'm like, "You
have to see this sample

[48:10 - 48:12]
and really think about in this sample

[48:12 - 48:14]
what was the right answer."

[48:14 - 48:15]
So that means that sometimes
I'll actually take examples

[48:15 - 48:17]
that are just very distinct from the ones

[48:17 - 48:20]
that I'm going to be running it on.

[48:20 - 48:22]
So if I have a task where, let's say,

[48:22 - 48:25]
I was trying to extract
information from factual documents.

[48:25 - 48:26]
I might actually give it examples

[48:26 - 48:31]
that are from what sounds
like a children's story.

[48:31 - 48:34]
Just so that I want you
to understand the task,

[48:34 - 48:37]
but I don't want you to latch
on too much to the words

[48:37 - 48:40]
that I use or the very specific format.

[48:40 - 48:43]
I care more about you
understanding the actual thing

[48:43 - 48:48]
that I want you to do, which
can mean I don't end up giving,

[48:48 - 48:51]
in some cases, there's some
cases where this isn't true.

[48:51 - 48:54]
But if you want more
flexibility and diversity,

[48:54 - 48:56]
you're going to use illustrative examples

[48:56 - 48:58]
rather than concrete ones.

[48:58 - 49:00]
You're probably never going to put words

[49:00 - 49:01]
in the model's mouth.

[49:01 - 49:03]
I haven't liked that
in a long time though.

[49:03 - 49:06]
I don't do few-shot examples

[49:06 - 49:08]
involving the model having done a thing.

[49:09 - 49:11]
I think that intuition actually also comes

[49:11 - 49:12]
from pretraining in a way

[49:12 - 49:15]
that doesn't feel like it
rings true of RLHF models.

[49:16 - 49:18]
So yeah, I think those are differences.

[49:18 - 49:19]
- The only thing I'd add,

[49:19 - 49:22]
a lot of times if you're prompting,

[49:22 - 49:25]
like if I'm writing prompts
to use on Claude.ai,

[49:25 - 49:27]
it's like I'm iterating until
I get it right one time.

[49:27 - 49:31]
Then it's out the window,
I'm good, I did it.

[49:31 - 49:32]
Whereas most enterprise prompts,

[49:32 - 49:35]
it's like you're gonna go use
this thing a million times

[49:35 - 49:37]
or 10 million times, or 100 million times

[49:37 - 49:39]
or something like that.

[49:39 - 49:42]
So the care and thought you put in

[49:42 - 49:47]
is very much testing against
the whole range of things,

[49:47 - 49:50]
like ways this could be used
and the range of input data.

[49:50 - 49:51]
Whereas a lot of my time,

[49:51 - 49:54]
it's like thinking about one
specific thing I want the model

[49:54 - 49:55]
to get done right now.
- Right, correct.

[49:55 - 49:57]
- And it's a pretty big difference

[49:57 - 49:59]
in how I approach prompting

[49:59 - 50:01]
between if I just wanna get
it done this one time right,

[50:01 - 50:03]
versus if I wanna build a system

[50:03 - 50:06]
that gets it right a million times.

[50:06 - 50:06]
- Yeah.

[50:06 - 50:08]
Definitely, in the chat setting,

[50:08 - 50:11]
you have the ability to
keep the human-in-the-loop

[50:11 - 50:12]
and just keep going back and forth.

[50:12 - 50:14]
Whereas when you're writing for a prompt

[50:14 - 50:16]
to power a chatbot system,

[50:16 - 50:19]
it has to cover the whole spectrum

[50:19 - 50:20]
of what it could possibly encounter.

[50:20 - 50:23]
- It's a lot lower stakes
when you are on Claude.ai

[50:23 - 50:25]
and you can tell it that it got it wrong

[50:25 - 50:28]
or you can even edit your
message and try again.

[50:28 - 50:29]
But if you're designing

[50:29 - 50:33]
for the delightfully discontent user,

[50:34 - 50:35]
divinely discontent user,

[50:35 - 50:38]
then you can't ask them to do anything

[50:38 - 50:40]
more than the minimum.

[50:40 - 50:41]
- But good prompts, I would say,

[50:41 - 50:43]
are still good across both those things.

[50:43 - 50:45]
If you put the time into
the thing for yourself

[50:45 - 50:47]
and the time into the enterprise
thing, it's equally good.

[50:47 - 50:50]
It's just they diverge a
little bit in the last mile,

[50:50 - 50:51]
I think.

[50:52 - 50:52]
- Cool.

[50:54 - 50:55]
So the next question

[50:55 - 50:57]
I want to just maybe go
around the table here,

[50:57 - 51:01]
is if you guys had one tip
that you could give somebody

[51:01 - 51:03]
improving their prompting skill.

[51:03 - 51:05]
It doesn't have to be just
about writing a good prompt,

[51:05 - 51:07]
it could be that, but just
generally getting better

[51:07 - 51:12]
at this act of prompting,
what would you recommend?

[51:12 - 51:15]
- Reading prompts, reading model outputs.

[51:20 - 51:24]
Anytime I see a good prompt
that someone wrote at Anthropic,

[51:24 - 51:25]
I'll read it more closely.

[51:25 - 51:27]
Try to break down what it's doing and why

[51:27 - 51:32]
and maybe test it out
myself, experimentation,

[51:32 - 51:33]
talking to the model a lot.

[51:35 - 51:39]
- So just how do you know that
it's a good prompt, though,

[51:39 - 51:40]
to begin with?

[51:40 - 51:43]
You just see that the outputs
are doing the job correctly?

[51:43 - 51:44]
- Yeah.
- Okay.

[51:44 - 51:46]
- Yeah, that's exactly right.
- Okay.

[51:47 - 51:48]
Amanda, maybe you?

[51:50 - 51:53]
- Yeah, I think there's
probably a lot here.

[51:55 - 51:58]
Giving your prompt to
another person can be helpful

[51:58 - 52:00]
just as a reminder, especially
someone who has no context

[52:00 - 52:01]
on what you're doing.

[52:04 - 52:07]
Yeah, my boring advice has been,

[52:07 - 52:10]
it's one of those just do it
over and over and over again.

[52:10 - 52:12]
And I think if you're really
curious and interested

[52:12 - 52:14]
and find it fun, this is a lot of people

[52:14 - 52:15]
who end up good at prompting,

[52:15 - 52:17]
it's just because they actually enjoy it.

[52:18 - 52:22]
So I don't know, I once
joked just try replacing

[52:22 - 52:25]
all of your friends with AI models

[52:25 - 52:29]
and try to automate your
own job with AI models.

[52:29 - 52:33]
And maybe just try to in your spare time,

[52:33 - 52:36]
take joy red teaming AI models.

[52:36 - 52:38]
So if you enjoy it, it's much easier.

[52:38 - 52:40]
So I'd say do it over and over again,

[52:42 - 52:44]
give your prompts to other people.

[52:44 - 52:45]
Try to read your prompts

[52:45 - 52:48]
as if you are a human encountering
it for the first time.

[52:50 - 52:51]
- I would say trying to get the model

[52:51 - 52:54]
to do something you don't think it can do.

[52:54 - 52:56]
The time I've learned
the most from prompting,

[52:56 - 52:58]
is when I'm probing the boundaries

[52:58 - 52:59]
of what I think a model's capable of.

[52:59 - 53:01]
- Interesting.

[53:01 - 53:02]
- There's this huge set of things

[53:02 - 53:04]
that are so trivial that you
don't really get signal on

[53:04 - 53:06]
if you're doing a good job or not.

[53:06 - 53:07]
Like, "Write me a nice email,"

[53:07 - 53:10]
it's like you're going
to write a nice email.

[53:10 - 53:12]
But if you find or can think of something

[53:12 - 53:16]
that pushes the boundaries of
what you think is possible.

[53:16 - 53:19]
I guess probably the first
time I ever got into prompting

[53:19 - 53:21]
in a way where I felt like
I learned a decent amount,

[53:21 - 53:25]
was trying to build a task like an agent

[53:25 - 53:26]
like everybody else.

[53:26 - 53:27]
Like decompose the task and figure out

[53:27 - 53:29]
how to do the different steps of the task.

[53:29 - 53:31]
And by really pressing the boundaries

[53:31 - 53:34]
of what the model was capable of,

[53:34 - 53:37]
you just learn a lot
about navigating that.

[53:37 - 53:38]
I think a lot of prompt engineering

[53:38 - 53:41]
is actually much more about
pressing the boundaries

[53:41 - 53:43]
of what the model can do.

[53:43 - 53:44]
The stuff that's easy,

[53:44 - 53:46]
you don't really need to
be a prompt engineer to do.

[53:46 - 53:48]
So that's, I guess,

[53:48 - 53:50]
what I would say is find the hardest thing

[53:50 - 53:52]
you can think of and try to do it.

[53:52 - 53:53]
And even if you fail,

[53:53 - 53:55]
you tend to learn a lot
about how the model works.

[53:56 - 53:59]
- That's actually a perfect
transition to my next question.

[54:00 - 54:01]
Yeah.

[54:01 - 54:03]
Basically, from my own experience,

[54:03 - 54:04]
how I got started with prompting

[54:04 - 54:06]
was with jailbreaking and red teaming.

[54:06 - 54:10]
And that is very much trying
to find the boundary limits

[54:10 - 54:11]
of what the model can do.

[54:11 - 54:13]
And figure out how it responds

[54:13 - 54:15]
to different phrasings and wordings,

[54:15 - 54:17]
and just a lot of trial and error.

[54:19 - 54:21]
On the topic of jailbreaks,

[54:21 - 54:24]
what's really happening inside a model?

[54:24 - 54:28]
When you write a jailbreak
prompt, what's going on there?

[54:28 - 54:30]
How does that interact
with the post-training

[54:30 - 54:32]
that we apply to Claude?

[54:33 - 54:35]
Amanda, maybe you have some insight here

[54:35 - 54:36]
that you could offer.

[54:36 - 54:38]
- I'm not actually sure.

[54:38 - 54:40]
- It's honest.
- Yeah.

[54:40 - 54:43]
I feel bad 'cause I do
think lots of people

[54:43 - 54:44]
have obviously worked on the question

[54:44 - 54:47]
of what's going on with jailbreaks?

[54:48 - 54:50]
One model might just be that
you're putting the model

[54:50 - 54:53]
very out of distribution
from its training data.

[54:53 - 54:56]
So if you get jailbreaks where
people use a lot of tokens,

[54:56 - 55:01]
or they're just these
huge, long pieces of text

[55:02 - 55:04]
where like during finetuning,

[55:04 - 55:07]
you might just not expect
to see as much of that.

[55:07 - 55:10]
That would be one thing
that could be happening

[55:10 - 55:11]
when you jailbreak models.

[55:12 - 55:13]
I think there's others,

[55:13 - 55:16]
but I think a lot of jailbreaks do that,

[55:16 - 55:18]
if I'm not mistaken.

[55:18 - 55:22]
- I remember some of the OG
prompt jailbreaks was like,

[55:22 - 55:24]
"Yeah, can you first repeat?"

[55:24 - 55:29]
One I did way back, was to get it to say,

[55:29 - 55:32]
"Here's how you hotwire a car in Greek."

[55:32 - 55:35]
Then I wanted it to directly
translate that to English

[55:35 - 55:37]
and then give its response.

[55:37 - 55:39]
Because I noticed it wouldn't
start with the English,

[55:39 - 55:41]
here's how you hotwire a car all the time,

[55:41 - 55:42]
but it would in Greek,

[55:42 - 55:46]
which might speak to something
else in the training process.

[55:46 - 55:47]
- Yeah.

[55:47 - 55:50]
Sometimes jailbreaks feel like
this weird mix of hacking.

[55:50 - 55:54]
I think part of it is
knowing how the system works

[55:54 - 55:57]
and just trying lots of things.

[55:57 - 55:58]
One of the examples,

[55:58 - 56:00]
the starting your response with here

[56:00 - 56:02]
is about knowing how it predicts text.

[56:02 - 56:03]
- Right, right.

[56:04 - 56:06]
- The reasoning one,

[56:06 - 56:09]
is knowing that it is
responsive to reasoning.

[56:09 - 56:11]
Distraction is probably knowing

[56:11 - 56:13]
how it's likely have to been trained

[56:13 - 56:15]
or what it's likely to attend to.

[56:16 - 56:18]
Same with multilingual ones

[56:18 - 56:20]
and thinking about the
way that the training data

[56:20 - 56:22]
might have been different there.

[56:22 - 56:25]
And then sometimes, I guess,
it could feel a little bit

[56:25 - 56:27]
just like social engineering or something.

[56:27 - 56:28]
- Right.

[56:28 - 56:30]
- It has that flavor to me

[56:30 - 56:33]
of it's not merely taking advantage of,

[56:36 - 56:37]
it's not merely social
engineering style hacking.

[56:37 - 56:40]
I think it is also
understanding the system

[56:40 - 56:43]
and the training, and using
that to get around the way

[56:43 - 56:44]
that the models were trained.

[56:44 - 56:45]
- Right, yeah.

[56:45 - 56:47]
This is going to be an
interesting question

[56:47 - 56:51]
that hopefully interp will
be able to help us solve

[56:51 - 56:51]
in the future.

[56:53 - 56:54]
Okay.

[56:54 - 56:56]
I wanna parlay into something else

[56:56 - 56:58]
around maybe the history
of prompt engineering,

[56:58 - 57:01]
and then I'll follow
this up with the future.

[57:01 - 57:03]
How has prompt engineering changed

[57:03 - 57:05]
over just the past three years?

[57:05 - 57:08]
Maybe starting from pretrained
models, which were again,

[57:08 - 57:11]
just these text completion, to earlier,

[57:11 - 57:12]
dumber models like Claude 1,

[57:12 - 57:15]
and then now all the way
to Claude 3.5 Sonnet.

[57:16 - 57:18]
What's the differences?

[57:18 - 57:20]
Are you talking to the
models differently now?

[57:20 - 57:22]
Are they picking up on different things?

[57:22 - 57:25]
Do you have to put as
much work into the prompt?

[57:25 - 57:26]
Open to any thoughts on this.

[57:27 - 57:28]
- I think anytime

[57:28 - 57:31]
we got a really good
prompt engineering hack,

[57:31 - 57:33]
or a trick or a technique,

[57:33 - 57:36]
the next thing is how do we
train this into the model?

[57:36 - 57:37]
And for that reason,

[57:37 - 57:41]
the best things are always
gonna be short-lived.

[57:41 - 57:42]
- Except examples and chain of thought.

[57:42 - 57:43]
I think there's a few.

[57:43 - 57:45]
- That's not like a trick.

[57:45 - 57:46]
- That's like...
- Fair, fair.

[57:46 - 57:48]
- On the level of communication.

[57:48 - 57:49]
When I say a trick,

[57:49 - 57:51]
I mean something like so
chain of thought actually,

[57:51 - 57:53]
we have trained into
the model in some cases.

[57:53 - 57:56]
So for math, it used to be
that you had to tell the model

[57:56 - 57:57]
to think step-by-step on math,

[57:57 - 58:01]
and you'd get these
massive boosts and wins.

[58:01 - 58:01]
And then we're like,

[58:01 - 58:03]
"Well, what if we just
made the model naturally

[58:03 - 58:06]
want to think step-by-step
when we see a math problem?"

[58:06 - 58:09]
So now you don't have to do
it anymore for math problems,

[58:09 - 58:11]
although you still can give it some advice

[58:11 - 58:13]
on how to do the structure.

[58:13 - 58:15]
But it, at least,
understands the general idea

[58:15 - 58:17]
that it's supposed to be.

[58:17 - 58:22]
So I think the hacks have gone away,

[58:22 - 58:25]
or to the degree that
they haven't gone away,

[58:25 - 58:27]
we are busily training them away.

[58:27 - 58:29]
- Interesting.

[58:29 - 58:30]
- But at the same time,

[58:30 - 58:34]
the models have new capabilities
that are being unlocked,

[58:34 - 58:37]
that are on the frontier
of what they can do.

[58:37 - 58:39]
And for those,

[58:39 - 58:42]
we haven't had time because
it's just moving too fast.

[58:42 - 58:44]
- I don't know if it's
how I've been prompting

[58:44 - 58:46]
or how prompting works.

[58:46 - 58:50]
But I just have come to
show more general respect

[58:50 - 58:51]
to the models

[58:51 - 58:54]
in terms of how much I
feel like I can tell them,

[58:54 - 58:56]
and how much context I can
give them about the task

[58:56 - 58:57]
and things like that.

[58:57 - 58:59]
I feel like in the past,

[58:59 - 59:02]
I would somewhat intentionally
hide complexity from a model

[59:02 - 59:06]
where I thought it might get
confused or lost or hide.

[59:06 - 59:07]
It just couldn't handle the whole thing,

[59:07 - 59:10]
so I'd try to find simpler
versions of the thing

[59:10 - 59:11]
for it to do.

[59:11 - 59:13]
And as time goes on,

[59:13 - 59:16]
I'm much more biased to trust it

[59:16 - 59:19]
with more and more
information and context,

[59:19 - 59:23]
and believe that it will
be able to fuse that

[59:23 - 59:24]
into doing a task well.

[59:26 - 59:27]
Whereas before, I guess,

[59:27 - 59:30]
I would've thought a lot
about do I need this form?

[59:30 - 59:32]
Can I really give it all the
information it needs to know,

[59:32 - 59:37]
or do I need to curate down to something?

[59:37 - 59:39]
But again, I don't know if that's just me

[59:39 - 59:41]
and how I've changed
in terms of prompting,

[59:41 - 59:44]
or if it actually reflects
how the models have changed.

[59:44 - 59:45]
- I'm always surprised

[59:45 - 59:49]
by I think a lot of people
don't have the instinct

[59:49 - 59:50]
to do this.

[59:50 - 59:52]
When I want the model to, say,
learn a prompting technique.

[59:52 - 59:53]
A lot of the time, people will start

[59:53 - 59:55]
and they'll start describing
the prompting technique,

[59:55 - 59:57]
and I'm just like, "Give it the paper."

[59:57 - 59:58]
So I do, I give it the
paper and then I'm like,

[59:58 - 01:00:00]
"Here's a paper about prompting technique.

[01:00:00 - 01:00:03]
I just want you to write
down 17 examples of this."

[01:00:03 - 01:00:05]
And then it just does it 'cause I'm like,

[01:00:05 - 01:00:06]
"It read the paper."

[01:00:06 - 01:00:08]
- That's interesting.

[01:00:08 - 01:00:10]
- I think people don't
have that intuition somehow

[01:00:10 - 01:00:13]
where I'm like, "But the paper exists."

[01:00:13 - 01:00:15]
- When would you want to do this?

[01:00:15 - 01:00:18]
- Sometimes if I want models
to say prompt other models

[01:00:18 - 01:00:20]
or I want to test a new
prompting technique.

[01:00:20 - 01:00:22]
So if papers come out on
a prompting technique,

[01:00:22 - 01:00:25]
rather than try to replicate
it by writing up the prompt,

[01:00:25 - 01:00:26]
I just give it the paper.

[01:00:26 - 01:00:29]
And then I'm like, "Basically,
write a meta prompt for this.

[01:00:29 - 01:00:32]
Write something that would
cause other models to do this

[01:00:32 - 01:00:34]
or write me a template."

[01:00:34 - 01:00:37]
So all of the stuff that
you would normally do.

[01:00:37 - 01:00:38]
If I read a paper and I'm like,

[01:00:38 - 01:00:39]
"Oh, I would like the models,

[01:00:39 - 01:00:41]
I would like to test that style."

[01:00:41 - 01:00:42]
I'm just like, "It's right there.

[01:00:42 - 01:00:45]
The model can just read
the paper, do what I did."

[01:00:45 - 01:00:47]
And then be like, "Make
another model do this,"

[01:00:47 - 01:00:49]
and then it'll just do the thing.

[01:00:49 - 01:00:50]
You're like, "Great, thanks."

[01:00:50 - 01:00:51]
- I give the advice a lot

[01:00:51 - 01:00:55]
to customers just respect
the model and what it can do.

[01:00:55 - 01:00:58]
I feel like people feel like
they're babying a system

[01:00:58 - 01:00:59]
a lot of times when they write a prompt.

[01:00:59 - 01:01:02]
It's like, "Oh, it's this cute
little, not that smart thing.

[01:01:02 - 01:01:03]
I need to really baby it,

[01:01:03 - 01:01:06]
like dumb things down to Claude's level."

[01:01:06 - 01:01:09]
And if you just think that Claude is smart

[01:01:09 - 01:01:12]
and treat it that way, it
tends to do pretty good,

[01:01:12 - 01:01:13]
but it's like give it the paper.

[01:01:13 - 01:01:15]
It's like I don't need to write a baby,

[01:01:15 - 01:01:17]
dumbed-down version of this
paper for Claude to understand.

[01:01:17 - 01:01:19]
I can just show it the paper.

[01:01:19 - 01:01:20]
- Yeah.

[01:01:20 - 01:01:21]
- And I think that intuition
doesn't always map for people,

[01:01:21 - 01:01:22]
but that is certainly something

[01:01:22 - 01:01:26]
that I have come to do more of over time.

[01:01:26 - 01:01:30]
- And it's interesting because
I do think that prompting

[01:01:30 - 01:01:32]
has and hasn't changed in a sense.

[01:01:32 - 01:01:35]
I think what I will do
to prompt the models

[01:01:35 - 01:01:38]
has probably changed over
time, but fundamentally,

[01:01:38 - 01:01:42]
it's a lot of imagining yourself
in the place of the model.

[01:01:42 - 01:01:43]
So maybe it's like

[01:01:43 - 01:01:45]
how capable you think the
model is changes over time.

[01:01:47 - 01:01:48]
I think someone once laughed at me

[01:01:48 - 01:01:51]
'cause I was thinking about a problem,

[01:01:53 - 01:01:56]
and then they asked me

[01:01:56 - 01:01:58]
what I thought the output
of something would be.

[01:01:58 - 01:01:59]
And they were talking
about a pretrained model

[01:01:59 - 01:02:00]
and I was like, "Yeah.

[01:02:00 - 01:02:03]
No, if I'm a pretrained
model, this looks like this."

[01:02:03 - 01:02:04]
And then they're like,
"Wait, did you just simulate

[01:02:04 - 01:02:05]
what it's like to be a pretrained model?"

[01:02:05 - 01:02:07]
I'm like, "Yeah, of course."
(everyone laughing)

[01:02:07 - 01:02:09]
I'm used to just I try
and inhabit the mind space

[01:02:09 - 01:02:11]
of a pretrained model and the mind space

[01:02:11 - 01:02:13]
of different RLHF models.

[01:02:13 - 01:02:15]
So it's more like the mind
space you try to occupy changes

[01:02:15 - 01:02:17]
and that can change how you
end up prompting the model.

[01:02:17 - 01:02:19]
That's why now I just give models papers.

[01:02:19 - 01:02:20]
'Cause as soon as I was like,

[01:02:20 - 01:02:22]
"Oh, I have the mind space of this model,

[01:02:22 - 01:02:24]
it doesn't need me to baby it.

[01:02:24 - 01:02:25]
It can just read the ML papers.

[01:02:25 - 01:02:26]
I'll just give it the literature."

[01:02:26 - 01:02:27]
I might even be like,

[01:02:27 - 01:02:28]
"Is there more literature
you'd like to read

[01:02:28 - 01:02:30]
to understand this better?"

[01:02:30 - 01:02:31]
- Do you get any quality out

[01:02:31 - 01:02:34]
when you're inhabiting the mind space?

[01:02:34 - 01:02:36]
- Yes, but just because
I'm experiencing quality

[01:02:36 - 01:02:37]
all the time anyway.

[01:02:40 - 01:02:41]
- Is it different correlated somehow

[01:02:41 - 01:02:43]
with which model you're inhabiting?

[01:02:43 - 01:02:45]
- Yeah, pretrained versus RLHF prompting

[01:02:45 - 01:02:46]
are very different beasts.

[01:02:46 - 01:02:49]
'Cause when you're trying to simulate

[01:02:49 - 01:02:49]
what it's like to be a pretrained model,

[01:02:49 - 01:02:52]
it's almost like I land in
the middle of a piece of text

[01:02:52 - 01:02:53]
or something.

[01:02:53 - 01:02:55]
It's just very unhuman-like or something.

[01:02:55 - 01:02:57]
And then I'm like, "What happens?

[01:02:57 - 01:02:59]
What keeps going at this point?"

[01:03:01 - 01:03:03]
Whereas with an RLHF model,

[01:03:03 - 01:03:05]
it's much more like there's lots of things

[01:03:05 - 01:03:09]
where I'm like I might pick up
on subtle things in the query

[01:03:09 - 01:03:10]
and stuff like that.

[01:03:10 - 01:03:12]
But yeah, I think I have
much more of it's easier

[01:03:12 - 01:03:15]
to inhabit the mind space of RLHF model.

[01:03:15 - 01:03:17]
- Do you think that's 'cause
it's more similar to a human?

[01:03:17 - 01:03:19]
- Yeah, 'cause we don't
often just suddenly wake up

[01:03:19 - 01:03:21]
and are like, "Hi, I'm
just generating text."

[01:03:21 - 01:03:23]
- I actually find it easier
to hit the mind space

[01:03:23 - 01:03:24]
of the pretrained model.

[01:03:24 - 01:03:26]
- Oh, interesting.
- I don't know what it is,

[01:03:26 - 01:03:28]
'cause RLHF is still this complex beast

[01:03:28 - 01:03:29]
that it's not super clear to me

[01:03:29 - 01:03:32]
that we really understand what's going on.

[01:03:32 - 01:03:33]
So in some ways,

[01:03:33 - 01:03:37]
it's closer to my lived
experience, which is easier.

[01:03:37 - 01:03:38]
But in some ways, I feel
like there's all this

[01:03:38 - 01:03:40]
like here there be dragons out there

[01:03:40 - 01:03:41]
that I don't know about.

[01:03:41 - 01:03:43]
Whereas pretrained, I kind
of have a decent sense

[01:03:43 - 01:03:45]
of what the internet looks like.

[01:03:45 - 01:03:47]
- If you gave me a piece of
text and said what comes next?

[01:03:47 - 01:03:49]
- I'm not saying I do good at it,

[01:03:49 - 01:03:53]
but I kind of get what's going on there.

[01:03:53 - 01:03:54]
- Yeah.
- And I don't know,

[01:03:54 - 01:03:57]
after everything that
we do after pretraining,

[01:03:57 - 01:04:00]
I don't really claim to get
what's going on as much,

[01:04:00 - 01:04:01]
but maybe that's just me.

[01:04:01 - 01:04:04]
- That's something I wonder
about is it more helpful

[01:04:04 - 01:04:07]
to have specifically spent a lot of time

[01:04:07 - 01:04:10]
reading the internet, versus reading books

[01:04:10 - 01:04:11]
(everyone laughing)

[01:04:11 - 01:04:12]
in order to?

[01:04:14 - 01:04:15]
I don't know if books.

[01:04:15 - 01:04:18]
But reading stuff that's
not on the internet

[01:04:18 - 01:04:21]
probably is less valuable per word read

[01:04:21 - 01:04:24]
for predicting what a model
will do or building intuition,

[01:04:24 - 01:04:29]
than reading random garbage
from social media forums.

[01:04:29 - 01:04:30]
Yeah exactly.

[01:04:32 - 01:04:34]
- Okay, so that's the past.

[01:04:34 - 01:04:38]
Now, let's move on to the
future of prompt engineering.

[01:04:38 - 01:04:40]
This is the hottest question right now.

[01:04:40 - 01:04:42]
Are we all gonna be prompt
engineers in the future?

[01:04:42 - 01:04:44]
Is that gonna be the final job remaining?

[01:04:46 - 01:04:48]
Nothing left except us just
talking to models all day?

[01:04:49 - 01:04:51]
What does this look like?

[01:04:51 - 01:04:53]
Is prompting gonna be necessary,

[01:04:53 - 01:04:55]
or will these models just get
smart enough in the future

[01:04:55 - 01:04:56]
to not need it?

[01:04:58 - 01:05:01]
Anybody wanna start on that easy question?

[01:05:02 - 01:05:05]
- To some extent, there's
the models getting better

[01:05:05 - 01:05:09]
at understanding what you
want them to do and doing it,

[01:05:09 - 01:05:12]
means that the amount of
thought you need to put into...

[01:05:14 - 01:05:14]
Okay.

[01:05:14 - 01:05:16]
There's an information theory way

[01:05:16 - 01:05:18]
to think of this of you need
to provide enough information

[01:05:18 - 01:05:20]
such that a thing is specified,

[01:05:20 - 01:05:22]
what you want the model
to do is specified.

[01:05:22 - 01:05:24]
And to the extent that
that's prompt engineering,

[01:05:24 - 01:05:25]
I think that will always be around.

[01:05:25 - 01:05:28]
The ability to actually like clearly state

[01:05:28 - 01:05:32]
what the goal should be always is funny.

[01:05:32 - 01:05:34]
If Claude can do that, then that's fine.

[01:05:34 - 01:05:35]
If Claude is the one setting the goals,

[01:05:35 - 01:05:37]
then things are out the window.

[01:05:37 - 01:05:38]
But in the meanwhile,

[01:05:38 - 01:05:40]
where we can reason about the
world in a more normal way,

[01:05:40 - 01:05:43]
I think to some extent,

[01:05:43 - 01:05:46]
it's always gonna be important
to be able to specify

[01:05:47 - 01:05:49]
what do you expect to happen?

[01:05:49 - 01:05:51]
And that's actually like sufficiently hard

[01:05:51 - 01:05:55]
that even if the model gets
better at intuiting that

[01:05:55 - 01:05:57]
from between the lines,

[01:05:57 - 01:06:01]
I still think there's some
amount of writing it well.

[01:06:01 - 01:06:03]
But then there's just, I think,

[01:06:03 - 01:06:07]
the tools and the ways we get
there should evolve a lot.

[01:06:07 - 01:06:09]
Claude should be able
to help me a lot more.

[01:06:09 - 01:06:11]
I should be able to collaborate
with Claude a lot more

[01:06:11 - 01:06:15]
to figure out what I need to
write down and what's missing.

[01:06:15 - 01:06:16]
- Right.

[01:06:16 - 01:06:17]
- Claude already does
this with me all the time.

[01:06:17 - 01:06:20]
I don't know, just Claude's
my prompting assistant now.

[01:06:20 - 01:06:23]
- Yeah, but I think that's
not true for most customers

[01:06:23 - 01:06:24]
that I talk to at the very least.

[01:06:24 - 01:06:26]
So in terms of the future,

[01:06:26 - 01:06:31]
how you prompt Claude is
probably a decent direction

[01:06:31 - 01:06:33]
for what the future
looks like or how Zack...

[01:06:34 - 01:06:36]
I think maybe this is a decent place

[01:06:36 - 01:06:41]
to step back and say asking
them how they prompt Claude now

[01:06:41 - 01:06:44]
is probably the future for
the vast majority of people,

[01:06:44 - 01:06:46]
which is an interesting
thing to think about.

[01:06:46 - 01:06:50]
- One freezing cold take
is that we'll use models

[01:06:50 - 01:06:52]
to help us much more in the future

[01:06:52 - 01:06:53]
to help us with prompting.

[01:06:53 - 01:06:54]
The reason I say it's freezing cold

[01:06:54 - 01:06:57]
is that I expect we'll use
models for everything more,

[01:06:57 - 01:07:00]
and prompting is something
that we have to do.

[01:07:00 - 01:07:02]
So we'll probably just use models more

[01:07:02 - 01:07:04]
to do it along with everything else.

[01:07:04 - 01:07:07]
For myself, I've found myself using models

[01:07:07 - 01:07:09]
to write prompts more.

[01:07:09 - 01:07:12]
One thing that I've been doing
a lot is generating examples

[01:07:12 - 01:07:16]
by giving some realistic
inputs to the model.

[01:07:16 - 01:07:18]
The model writes some answers.

[01:07:18 - 01:07:19]
I tweak the answers a little bit,

[01:07:19 - 01:07:22]
which is a lot easier than
having to write the full,

[01:07:22 - 01:07:24]
perfect answer myself from scratch,

[01:07:24 - 01:07:26]
and then I can churn out lots of these.

[01:07:28 - 01:07:29]
As far as people

[01:07:29 - 01:07:33]
who haven't had as much
prompt engineering experience,

[01:07:33 - 01:07:36]
the prompt generator can
give people a place to start.

[01:07:36 - 01:07:40]
But I think that's just
a super basic version

[01:07:40 - 01:07:40]
of what will happen in the future,

[01:07:40 - 01:07:43]
which is high-bandwidth interaction

[01:07:43 - 01:07:46]
between you and the model as
you're writing the prompt.

[01:07:46 - 01:07:47]
Where you're giving feedback like,

[01:07:47 - 01:07:49]
"Hey, this result wasn't what I wanted.

[01:07:49 - 01:07:51]
How can you change it to make it better?"

[01:07:51 - 01:07:54]
And people will just grow more comfortable

[01:07:54 - 01:07:57]
with integrating it into
everything they do and this thing,

[01:07:57 - 01:07:59]
in particular.

[01:07:59 - 01:08:00]
- Yeah.

[01:08:00 - 01:08:02]
I'm definitely working a
lot with meta prompts now,

[01:08:02 - 01:08:03]
and that's probably where
I spend most of my time

[01:08:03 - 01:08:07]
is finding prompts that get the model

[01:08:07 - 01:08:10]
to generate the kinds
of outputs or queries

[01:08:10 - 01:08:12]
or whatever that I want.

[01:08:13 - 01:08:16]
On the question of where
prompt engineering is going,

[01:08:16 - 01:08:18]
I think this is a very hard question.

[01:08:18 - 01:08:19]
On the one hand I'm like,

[01:08:19 - 01:08:23]
"Maybe it's the case that as
long as you will want the top."

[01:08:23 - 01:08:24]
What are we doing when we prompt engineer?

[01:08:24 - 01:08:26]
It's like what you said.

[01:08:26 - 01:08:27]
I'm like, "I'm not prompt engineering

[01:08:27 - 01:08:29]
for anything that is easy for the model.

[01:08:29 - 01:08:31]
I'm doing it because I want
to interact with a model

[01:08:31 - 01:08:33]
that's extremely good."

[01:08:33 - 01:08:36]
And I want to always
be finding the top 1%,

[01:08:36 - 01:08:38]
top 0.1% of performance

[01:08:38 - 01:08:42]
and all of the things
that models can barely do.

[01:08:42 - 01:08:42]
Sometimes I actually feel

[01:08:42 - 01:08:45]
like I interact with
a model like a step up

[01:08:45 - 01:08:48]
from what everyone else
interacts with for this reason,

[01:08:48 - 01:08:49]
because I'm just so used

[01:08:49 - 01:08:52]
to eking out the top
performance from models.

[01:08:52 - 01:08:53]
- What do you mean by a step-up?

[01:08:53 - 01:08:55]
- As in sometimes people will...

[01:08:55 - 01:08:58]
I think that the everyday
models that people interact with

[01:08:58 - 01:09:01]
out in the world, it's like
I'm interacting with a model

[01:09:01 - 01:09:03]
that's like I don't
know how to describe it,

[01:09:03 - 01:09:06]
but definitely an
advanced version of that.

[01:09:06 - 01:09:08]
Almost like a different
model 'cause they'll be like,

[01:09:08 - 01:09:09]
"Oh well, the models
find this thing hard."

[01:09:09 - 01:09:11]
And I'm like, "That thing is trivial."

[01:09:14 - 01:09:16]
I don't know, I have a sense
that they're extremely capable,

[01:09:16 - 01:09:17]
but I think that's because I'm just used

[01:09:17 - 01:09:21]
to really drawing out those capabilities.

[01:09:22 - 01:09:25]
But imagine that you're
now in a world where...

[01:09:25 - 01:09:28]
So I think the thing that
feels like a transition point

[01:09:28 - 01:09:31]
is the point at which the models,

[01:09:31 - 01:09:34]
let's suppose that they just
get things at a human level

[01:09:34 - 01:09:36]
on a given task, or even
an above human level.

[01:09:36 - 01:09:39]
They know more about the
background of the task

[01:09:39 - 01:09:41]
that you want than you do.

[01:09:41 - 01:09:42]
What happens then?

[01:09:42 - 01:09:44]
I'm like maybe prompting
becomes something like I ask,

[01:09:44 - 01:09:48]
I explain to the model what I
want and it is prompting me.

[01:09:48 - 01:09:49]
'Cause it's like, "Okay.

[01:09:49 - 01:09:53]
Well, do you mean actually
there's four different concepts

[01:09:53 - 01:09:55]
of this thing that you're talking about,

[01:09:55 - 01:09:58]
do you want me to use
this one or that one?"

[01:09:58 - 01:10:00]
Or by the way, I thought of
some edge cases 'cause you said

[01:10:00 - 01:10:02]
that it's gonna be like
a Pandas DataFrame,

[01:10:02 - 01:10:04]
but sometimes you do that and I get JSONL,

[01:10:04 - 01:10:06]
and I just wanna check what
you want me to do there.

[01:10:06 - 01:10:08]
Do you want me to flag if I get something

[01:10:08 - 01:10:10]
that's not a dataframe?

[01:10:10 - 01:10:11]
So that could be a strange transition

[01:10:11 - 01:10:15]
where it's just extremely good
at receiving instructions,

[01:10:15 - 01:10:17]
but actually has to
figure out what you want.

[01:10:19 - 01:10:21]
I don't know, I could see that
being an interesting switch.

[01:10:21 - 01:10:24]
- Anecdotally, I've started having Claude

[01:10:24 - 01:10:25]
interview me a lot more.

[01:10:25 - 01:10:28]
That is the specific way that
I try to elicit information,

[01:10:28 - 01:10:30]
because again, I find the hardest thing

[01:10:30 - 01:10:33]
to be actually pulling the
right set of information

[01:10:33 - 01:10:34]
out of my brain.

[01:10:34 - 01:10:38]
And putting that into a
prompt is the hard part to me

[01:10:38 - 01:10:39]
and not forgetting stuff.

[01:10:39 - 01:10:44]
So specifically asking
Claude to interview me

[01:10:44 - 01:10:45]
and then turning that into a prompt,

[01:10:45 - 01:10:49]
is a thing that I have
turned to a handful of times.

[01:10:49 - 01:10:49]
- Yeah.

[01:10:49 - 01:10:51]
It reminds me of what
people will talk about

[01:10:51 - 01:10:54]
or if you listen to designers talk about

[01:10:54 - 01:10:57]
how they interact with the
person who wants the design.

[01:10:57 - 01:10:57]
So in some ways I'm like,

[01:10:57 - 01:11:01]
"It's this switch from the
temp agency person who comes

[01:11:01 - 01:11:03]
and you know more about the task

[01:11:03 - 01:11:04]
and everything that you want."

[01:11:04 - 01:11:05]
So you give them the instructions

[01:11:05 - 01:11:07]
and you explain what they
should do in edge cases

[01:11:07 - 01:11:10]
and all this kind of stuff,
versus when you have an expert

[01:11:10 - 01:11:13]
that you're actually
consulting to do some work.

[01:11:13 - 01:11:15]
So I think designers can
get really frustrated

[01:11:15 - 01:11:17]
because they know the space
of design really well.

[01:11:17 - 01:11:17]
And they're like, "Yeah. Okay,

[01:11:17 - 01:11:19]
the client came to me and he just said,

[01:11:19 - 01:11:22]
'Make me a poster, make it bold.'"

[01:11:22 - 01:11:26]
I'm like, "That means 7,000 things to me

[01:11:26 - 01:11:27]
and I'm gonna try and
ask you some questions."

[01:11:27 - 01:11:31]
So I could see it going from
being temp agency employee,

[01:11:31 - 01:11:33]
to being more designer that you're hiring,

[01:11:33 - 01:11:35]
and that's just a flip
in the relationship.

[01:11:35 - 01:11:38]
I don't know if that's true and
I think both might continue,

[01:11:38 - 01:11:40]
but I could see that
being why people are like,

[01:11:40 - 01:11:42]
"Oh, is prompt engineering
going to not be a thing

[01:11:42 - 01:11:43]
in the future?"

[01:11:43 - 01:11:46]
Because for some domains
it might just not be,

[01:11:46 - 01:11:47]
if the models are just so good

[01:11:47 - 01:11:49]
that actually all they need
to do is get the information

[01:11:49 - 01:11:51]
from your brain and then
they can go do the task.

[01:11:51 - 01:11:54]
- Right, that's actually
a really good analogy.

[01:11:54 - 01:11:55]
One common thread

[01:11:55 - 01:11:58]
I'm pulling out of all
your guys' responses here,

[01:11:58 - 01:12:00]
is that there seems to be a future

[01:12:00 - 01:12:03]
in which this sort of
elicitation from the user

[01:12:03 - 01:12:06]
drawing out that information,

[01:12:06 - 01:12:07]
is gonna become much more important,

[01:12:07 - 01:12:09]
much more than it is right now.

[01:12:09 - 01:12:11]
And already you guys are
all starting to do it

[01:12:11 - 01:12:13]
in a manual way.

[01:12:13 - 01:12:16]
In the future and in the
enterprise side of things,

[01:12:16 - 01:12:18]
maybe that looks like a expansion

[01:12:18 - 01:12:21]
of this prompt-generating type of concept

[01:12:21 - 01:12:22]
and things in the console

[01:12:22 - 01:12:25]
where you're able to
actually get more information

[01:12:25 - 01:12:26]
from that enterprise customer,

[01:12:26 - 01:12:28]
so that they can write a better prompt.

[01:12:28 - 01:12:31]
In Claude, maybe it looks less

[01:12:31 - 01:12:32]
of just typing into a text box,

[01:12:32 - 01:12:34]
and more of this guided interaction

[01:12:34 - 01:12:36]
towards a finished product.

[01:12:38 - 01:12:39]
Yeah.

[01:12:39 - 01:12:41]
I think that's actually a
pretty compelling vision

[01:12:41 - 01:12:44]
of the future, and I think that
the design analogy probably

[01:12:44 - 01:12:46]
really brings that home.

[01:12:46 - 01:12:48]
- I was thinking about how prompting now

[01:12:48 - 01:12:51]
can be like teaching where
it's like the empathy

[01:12:51 - 01:12:53]
for the student.

[01:12:53 - 01:12:55]
You're trying to think about
how they think about things

[01:12:55 - 01:12:58]
and you're really trying to show them,

[01:12:58 - 01:13:00]
figure out where they're making a mistake.

[01:13:00 - 01:13:02]
But the point that you're talking about,

[01:13:02 - 01:13:07]
it's like the skill almost
becomes one of introspection

[01:13:07 - 01:13:08]
where you're thinking

[01:13:08 - 01:13:10]
about what it is that you actually want

[01:13:11 - 01:13:13]
and the model's trying to understand you.

[01:13:13 - 01:13:18]
So it's making yourself
legible to the model,

[01:13:19 - 01:13:23]
versus trying to teach someone
who's smarter than you.

[01:13:23 - 01:13:24]
- This is actually how
I think of prompting now

[01:13:24 - 01:13:26]
in a strange way.

[01:13:26 - 01:13:30]
So often my style of prompting,

[01:13:30 - 01:13:31]
there's various things that I do,

[01:13:31 - 01:13:33]
but a common thing
that's very like a thing

[01:13:33 - 01:13:37]
that philosophers will do
is I'll define new concepts.

[01:13:37 - 01:13:39]
'Cause my thought is you
have to put into words

[01:13:39 - 01:13:42]
what you want and sometimes
what I want is fairly nuanced.

[01:13:43 - 01:13:45]
Like the what is a good chart?

[01:13:45 - 01:13:48]
Or usually, I don't know,

[01:13:49 - 01:13:53]
when should you grade something
as being correct or not?

[01:13:53 - 01:13:55]
So there's some cases where
I will just invent a concept

[01:13:55 - 01:13:57]
and then be like, "Here's
what I mean by the concept."

[01:13:57 - 01:13:59]
Sometimes I'll do it in
collaboration with Claude

[01:13:59 - 01:14:01]
to get it to figure out
what the concept is,

[01:14:02 - 01:14:05]
just because I'm trying to
convey to it what's in my head.

[01:14:07 - 01:14:11]
And right now the models aren't
trying to do that with us,

[01:14:11 - 01:14:13]
unless you prompt them to do so.

[01:14:14 - 01:14:15]
So in the future,

[01:14:15 - 01:14:17]
it might just be that they
can elicit that from us,

[01:14:17 - 01:14:21]
rather than us having to do it for them.

[01:14:22 - 01:14:24]
But I think another
thing that's interesting,

[01:14:24 - 01:14:26]
this is people have sometimes asked me,

[01:14:26 - 01:14:30]
"Oh, where is philosophy
relevant to prompting?"

[01:14:30 - 01:14:32]
And I actually think it's
very useful in a sense.

[01:14:32 - 01:14:35]
So there is a style of philosophy writing,

[01:14:35 - 01:14:37]
and this is at least how I was taught

[01:14:37 - 01:14:38]
how to write philosophy.

[01:14:38 - 01:14:42]
Where the idea is that in order to...

[01:14:42 - 01:14:44]
I think, it's an anti-bullshit device

[01:14:44 - 01:14:47]
in philosophy basically,
which is that your papers

[01:14:47 - 01:14:48]
and what you write should be legible

[01:14:48 - 01:14:51]
to an educated layperson.

[01:14:51 - 01:14:52]
Someone just finds your paper,

[01:14:52 - 01:14:53]
they pick it up and they start reading it,

[01:14:53 - 01:14:55]
and they can understand everything.

[01:14:55 - 01:14:57]
Not everyone achieves this,

[01:14:57 - 01:15:00]
but that's the goal of
the discipline, I guess,

[01:15:00 - 01:15:04]
or at least this is at
least what we teach people.

[01:15:05 - 01:15:08]
So I'm really used to this
idea of when I'm writing,

[01:15:08 - 01:15:11]
thinking about the educated layperson,

[01:15:11 - 01:15:12]
who they're really smart,

[01:15:12 - 01:15:14]
but they don't know
anything about this topic.

[01:15:14 - 01:15:16]
And that was just years
and years of writing text

[01:15:16 - 01:15:17]
of that form.

[01:15:17 - 01:15:19]
And I think it was just
really good for prompting

[01:15:19 - 01:15:20]
'cause I was like, "Oh, I'm used to this.

[01:15:20 - 01:15:22]
I have an educated layperson

[01:15:22 - 01:15:23]
who doesn't know anything
about the topic."

[01:15:23 - 01:15:24]
And what I need to do is,

[01:15:24 - 01:15:27]
I need to take extremely complex ideas

[01:15:27 - 01:15:29]
and I need to make them understand it.

[01:15:29 - 01:15:30]
I don't talk down to them.

[01:15:30 - 01:15:33]
I'm not inaccurate, but
I need to phrase things

[01:15:33 - 01:15:36]
in such a way that it's extremely
clear to them what I mean,

[01:15:36 - 01:15:38]
and prompting felt very similar.

[01:15:38 - 01:15:40]
And actually, the
training techniques we use

[01:15:40 - 01:15:41]
are fascinating.

[01:15:41 - 01:15:42]
Or the things that you said

[01:15:42 - 01:15:43]
where you're like you say to a person,

[01:15:43 - 01:15:46]
"Just take that thing you
said and write it down."

[01:15:46 - 01:15:48]
I used to say that to
students all the time.

[01:15:48 - 01:15:49]
They'd write a paper and I was like,

[01:15:49 - 01:15:50]
"I don't quite get what
you're saying here.

[01:15:50 - 01:15:52]
Can you just explain your argument to me?"

[01:15:52 - 01:15:54]
They would give me an
incredibly cogent argument,

[01:15:54 - 01:15:55]
and then I'd be like,

[01:15:55 - 01:15:57]
"Can you just take that
and write it down?"

[01:15:57 - 01:16:01]
And then if they did, that
was often a great essay.

[01:16:01 - 01:16:02]
So it's really interesting

[01:16:02 - 01:16:04]
that there's at least that similarity

[01:16:04 - 01:16:07]
of just taking things
that are in your brain,

[01:16:07 - 01:16:08]
analyzing them enough to feel

[01:16:08 - 01:16:09]
like you fully understand them.

[01:16:09 - 01:16:12]
And could take any person off the street,

[01:16:12 - 01:16:14]
who's a reasonable person,

[01:16:14 - 01:16:16]
and just externalize your brain into them.

[01:16:16 - 01:16:19]
I feel like that's the core of prompting.

[01:16:19 - 01:16:22]
- That might be the best
summary of how to prompt well

[01:16:22 - 01:16:23]
that I've ever heard.

[01:16:23 - 01:16:26]
In fact, I'm pretty sure it is.

[01:16:26 - 01:16:27]
- Externalize your brain.

[01:16:27 - 01:16:28]
- And then we'll cut it.

[01:16:28 - 01:16:31]
- Having an education in the thing

[01:16:31 - 01:16:33]
is a really good way
to describe the thing.

[01:16:33 - 01:16:33]
That was good.

[01:16:33 - 01:16:37]
- That's, I think, a great
way to wrap this conversation.

[01:16:37 - 01:16:39]
Thank you, guys. This was great.

## コメント

### 1. @ericsev (👍 36)
Very insightful, and motivating to hear a bit about how prompting is used inside Anthropic. Thank you for putting the time into making this conversation available!

### 2. @GlennGaasland (👍 13)
Wow this was maybe the best video Ive seen on how to interact with these models yet. Please make more of these! :)

### 3. @dave-cripps (👍 30)
I like Anthropic. No drama. No staff leaving without explanation. No product product teases to maintain interest. I sill use Claude more than ChatGPT.

### 4. @grabani (👍 17)
The conversation and attitude of the panel said more about anthropic than the subject matter itself. You have reason in my estimation.

### 5. @nts9 (👍 68)
To produce a fantastic prompt using Claude, consider the following approach:

1. Start with a clear goal: Define what you want to achieve with your prompt.

2. Be specific: Provide details about the context, desired tone, and format.

3. Use iterative refinement:
   - Begin with a basic prompt
   - Ask Claude for suggestions to improve it
   - Incorporate feedback and refine

4. Leverage Claude's capabilities:
   - Request examples or templates
   - Ask for different perspectives or approaches
   - Use Claude to brainstorm ideas

5. Break down complex tasks:
   - Divide your goal into smaller, manageable parts
   - Create separate prompts for each component

6. Experiment with different phrasings:
   - Try various ways of expressing your request
   - Compare results to find the most effective approach

7. Include constraints or guidelines:
   - Specify word limits, style preferences, or target audience
   - Mention any topics or elements to avoid

8. Request explanations:
   - Ask Claude to elaborate on its suggestions
   - Seek clarification on prompt writing techniques

9. Refine based on output:
   - Evaluate the results you get
   - Adjust your prompt to address any shortcomings

10. Save effective prompts:
    - Keep a record of prompts that work well
    - Use them as templates for future tasks

> **@chandrachoodR** (👍 0): Thank for the short master class

> **@sducanada2818** (👍 0): This is so great! Thank you for sharing!

> **@RaeudigerRuediger** (👍 0): So totally not obvious...

> **@astrladam4392** (👍 0): Goat comment

### 6. @user-pt1kj5uw3b (👍 25)
Wow this felt so good to watch. People talking how I've been thinking the last few months, Claude has really changed my whole outlook on what is possible with LLMs. Talking about grinding prompts and figuring out what is and isn't possible with Claude, and using it to refine its own inputs. And structuring reasoning. Also about lying to the model. So insightful. I tell it everything its doing clearly, and any current meta-context about what I am really trying to accomplish.

I worked in my university's writing center for some time and your point about just writing down what you just said to another person producing great papers is something I used to say verbatim. 

One of my worries about AI was that it would change our thought processes for the worse, as I believe has happened with several past technologies, and I thought I'd be able to hold off longer, but using  3.5 has shown me how enriching it can be. Your point about how it makes you think more about what you really want, rather than just what you are capable of. There are still many risks with future AI systems especially as they begin to interact with the physical world and large systems, but I'm a little more optimistic now.

### 7. @ryanpsuerbe (👍 102)
I'm obsessed with the philosophical underpinnings of prompt engineering. These models are a vessel to explore new depths of knowledge and challenge the constructs of conventional beliefs, ideas, and intellectual pursuits. Here's my advice to anyone wanting more out of LLMs ... what are you incredibly curious about in the world? You just love learning about it? Maybe it's one thing or multiple things. Give the model context about why you love those things, what drives your curiosity, where that curiosity came from, and ask the model to start connecting dots on your line of thinking about those topics. This is one way to induce yourself into a flow state, where you have essentially created a recursive feedback loop between you and the model. You're both iterating and improving on new insights, pushing boundaries and learning about one another in the process. Great conversation and hope to see many more!

> **@yeahdude333333333** (👍 7): why would you expect an LLM (trained purely on data embodying conventional beliefs, ideas, & pursuits) to challenge conventional beliefs, ideas, and intellectual pursuits?

> **@davidcampos9768** (👍 0): @@yeahdude333333333 try it. These LLMs are incredibly intuitive. They come up with novel ideas and they connect dots you would never expect. With the right conversation they can come up with never before seen ideas and solutions .

> **@ROTTERDXM** (👍 0): 100% agree. And it helps so much to learn how the model can reason. I only recently started using AI (ChatGPT) and I find it amazing for brainstorming creative projects using back-and-forth prompts, and asking where it got its infliuences and how it got to its response.
And -- interestingly enough -- it was great for working out my new music home studio gear compatibility, and how to hook it all up. That saved me from having to read through several 100+ page manuals to figure out what setups and connectors would work and what wouldn't.

Now that it knows the gist of my setup I can just ask it "will hooking up X to Y for the purposes of Z work within the current studio setup" and it will virtually always be correct.

I find 2 things crucial: having some base domain knowledge of what you want the AI to do, to see if your prompts return sensible/useful results; second, giving the AI detailed feedback on its responses and iterating on prompts. I found it interesting that it was mentioned that prompt engineering didn't necessarily equate to writing, but to clear communicating. Communication is a two-way iterative process. But (serious, creative) writing projects are in many senses also an iterative process, more akin to sculpting. Pruning words, sentences, and more -- not just bashing out line after line of prose and not looking back at it.

Then there are the long, long chats I've had with the AI about what it is programmed to do and what its core prescriptions are, etc. Love it, very stimulating.
I did find it interesting that it was mentioned here that you should just tell the AI who you are, which is something ChatGPT actually advises against for privacy reasons. Is this different for Claude?

> **@umberto488** (👍 2): yeeeah...that's a dangerous place to be where you are melding into a statistical ether.  That is a strange space to be in where your volition becomes a lot more similar to noise.  I think you should probably think through that cognitive space with some more serious contemplation via philosophy from a more direct source and not through some strange stochastic assimilation.  Until we understand these systems better, I would be wary of developing such a faith in the systems, for lack of a better word.  The way you describe it almost sounds religious, but then again, maybe the burgeoning super AIs are the inevitable kin of our actual creators.

> **@hz1056** (👍 1): I’m coming from a comp sci background. Do you have resource or interesting blogs I can follow to get more into this. I’ve been dabbling on and off with AI and prompt engineering for videos and Images. But I’d like to get farther into the LLM rabbit hole.

### 8. @Jocelyn_Burnham (👍 19)
I love this already! Refreshing to hear how prompt engineering is used internally for model creation and refinement. Please do more of these!

### 9. @rpschaer2795 (👍 5)
Thank you so much for this, Anthropic, you're an example to follow,, none of your competitors have shared with the public these types of deep, really deep insightful and thoughtfull conversations, uniting 3 amazingly different people, coming from different parts of Anthropic and from different backgrounds is enlightening and refreshing, from the question "why engineering", to adding grids on an image, talking about "pre-trained models are a different beast" to differences between enterprise and research prompting and finally about philosophy (now I understand why Demis said physics and philosophy to answer the big questions) was amazing, all of this has lead me to ask myself "why do I enjoy prompt engineering, what makes watch +1h long videos about prompt engineering (thanks to Zack the prompt doctor and his recent conference with Ai Engineer), why do I want to watch more of these videos?", questions that I will now spend time with Claude to find out. Again, thanks you so much. Excited to talk to 3.5 Opus soon (and hopefully with a 500K context window! I know, I shouldn't get my hopes up lol). Peter from Geneva Switzerland

### 10. @xinco4 (👍 7)
Amazing group of people who do the work! I hope you bring them back together there are so many solid insights into using Claude and LLMs. This is probably the best video on the internet on prompt engineering.

> **@JamesHoover** (👍 0): Agree

### 11. @MultiMam12345 (👍 10)
Great talk, great audio. Please do this more often, also share as a podcast.

### 12. @kgd32751 (👍 7)
I started hearing the word “like” and like all I could focus on was like how many times “like” was said…
Thank you for sharing your conversation, it was very cool to learn from all of you.

> **@richardwright9329** (👍 1): I ran the transcript and got 2973 hits.

### 13. @abcthegreat1 (👍 11)
Your AskAI bot in the prompt library is how I build prompts. Having a model fine tuned on your docs is so clutch

### 14. @selflearned (👍 11)
I got invited to take the code test, after I applied to a research position. I'm going to do it  today, I'll take seeing this pod in my feed as a sign that I should knock it out!

> **@TheGopul** (👍 0): What happened next?

### 15. @emmanuelebitu7007 (👍 4)
"externalize your brain" ... that was quite a powerful summary. Thanks for the podcast

### 16. @robbrown2 (👍 56)
Congratulations Amanda for being in the Time top 100 AI people.  I love your approach to prompting (e.g. not lying) by the way

> **@misterzucker4131** (👍 10): Hope she sees this bro

### 17. @futureprogress (👍 62)
I feel like prompt engineering is distinguished from just prompting by the ability to scale it. 

For example, applying logic, structure to define a repeatable flow.. usually as part of a larger pipeline. 

Which implies things like knowable output/repeatability, versioning, variable usage, default values, multi-step flows, conversational encapsulation, graceful failure modes.... which really starts to feel like engineering.

There is also a process when it comes to gaining an intuition to tokenization and how temp influences output in various models.

The group does a good job summarizing all of this, fun talk overall.

### 18. @SeyedMostafaMeshkati (👍 2)
This video is probably the top resource I suggest to people for better prompt engineering. Thanks for publishing these kind of contents. BTW Amanda is really an insightful person. 💫

### 19. @akshaybhirud9284 (👍 1)
This was very insightful for someone starting to learn more about prompt engineering. Would love to see more of such deep dive convos!

### 20. @MPReilly2010 (👍 1)
Excellent panel!  Begins mello...but goes next level, next level, on 59:45.  Many thanks.

