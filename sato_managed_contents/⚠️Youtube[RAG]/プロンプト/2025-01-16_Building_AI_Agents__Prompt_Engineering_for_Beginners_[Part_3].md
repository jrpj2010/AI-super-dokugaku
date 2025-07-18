# Building AI Agents: Prompt Engineering for Beginners [Part 3]

**チャンネル:** n8n
**公開日:** 2025-01-16
**URL:** https://www.youtube.com/watch?v=77Z07QnLlB8

## 説明

Watch Part 1: https://www.youtube.com/watch?v=yzvLfHb0nqE
Follow Max on LinkedIn: https://www.linkedin.com/in/maxtkacz/

In Part 3 of our Building AI Agents series, we focus on the essentials of prompt engineering—specifically for single-task agents in n8n.

Chapters
00:00 - Intro
01:14 - What is Prompt Engineering?
03:05 - 3 Layer of Prompting
03:49 - System Layer: Role Prompting
07:50 - System Layer: Task Instructions
14:32 - System Layer: Defining Rules
16:40 - System Layer: Few-shot Prompting
23:47 - System Layer: Additional Context
26:22 - System Layer: Reducing Hallucinations
29:08 - Input Layer (aka user message)
33:27 - Action Layer: defining tools
39:14 - Using AI tools to improve prompting
41:02 - Wrap up & inspirational pep talk

💬 What kind of AI Agents would you like to create? Share your ideas in the comments!

🔗 Links and Resources:
- Sign up at www.n8n.io and get 50% off for 12 months with coupon code MAX50 (apply the code after your free trial)!
- docs.n8n.io for documentation
- community.n8n.io for help whilst building

#aiagents

## 字幕

[00:01 - 00:05]
hey welcome to part three of the

[00:03 - 00:08]
building AI agents tutorial Series in

[00:05 - 00:10]
part one we covered Basics like what AI

[00:08 - 00:12]
agents are how to use tools and memory

[00:10 - 00:14]
and if you don't know what I'm talking

[00:12 - 00:16]
about go watch part 1 and two then come

[00:14 - 00:18]
right back here in this video we're

[00:16 - 00:22]
going to focus on prompt engineering

[00:18 - 00:22]
specifically for single task AI

[00:24 - 00:29]
agents so an AI agent is software that

[00:26 - 00:31]
can autonomously complete tasks on your

[00:29 - 00:33]
behalf now some people say they're all

[00:31 - 00:35]
hype and not production ready While

[00:33 - 00:37]
others are seeing success by using them

[00:35 - 00:40]
because they're deploying agentic use

[00:37 - 00:41]
cases where they have well-defined tasks

[00:40 - 00:43]
with well-defined scope there are

[00:41 - 00:45]
countless well-defined tasks out there

[00:43 - 00:48]
from booking an appointment to working

[00:45 - 00:49]
inside of a CRM on the specific task

[00:48 - 00:52]
plus it's fairly easy to add some sort

[00:49 - 00:54]
of intent routing before your agentic

[00:52 - 00:56]
steps in your workflows so that's why

[00:54 - 00:58]
we're going to focus on single task so

[00:56 - 01:00]
you can learn the best practices around

[00:58 - 01:02]
getting a task done which you then can

[01:00 - 01:04]
apply to having a multitask agent but I

[01:02 - 01:05]
highly highly advise especially if

[01:04 - 01:07]
you're getting started out focus on

[01:05 - 01:09]
having your AI agent do one thing well

[01:07 - 01:10]
and then expand from there with various

[01:09 - 01:12]
different strategies that we can get

[01:10 - 01:14]
into in follow-up videos so do drop a

[01:12 - 01:16]
comment if you'd like me to get into

[01:14 - 01:18]
that after watching this the biggest

[01:16 - 01:20]
lever you have in driving the success

[01:18 - 01:22]
outcomes of an agentic solution that

[01:20 - 01:23]
you're working on is impr prompt

[01:22 - 01:26]
engineering there's other things like

[01:23 - 01:28]
tool calling and even fine-tuning and

[01:26 - 01:29]
Distilling of llm models that you can do

[01:28 - 01:31]
but prompt engineering is going to have

[01:29 - 01:32]
the high highest effort to impact ratio

[01:31 - 01:34]
so how I like to think of prompt

[01:32 - 01:36]
engineering is it's essentially an

[01:34 - 01:38]
instruction manual that you're giving to

[01:36 - 01:39]
an intern and you work at a company that

[01:38 - 01:41]
has async work culture you're the

[01:39 - 01:43]
manager and your job is to onboard this

[01:41 - 01:45]
person have them complete tasks and

[01:43 - 01:47]
create business value by only handing

[01:45 - 01:48]
them off this manual and you're not

[01:47 - 01:51]
allowed to talk to them so you might be

[01:48 - 01:53]
able to update that manual over time but

[01:51 - 01:55]
the success of your employee that's been

[01:53 - 01:57]
assigned to you is wholly predicated on

[01:55 - 01:59]
you handing them off a manual that is

[01:57 - 02:01]
self-evident clear and has the relevant

[01:59 - 02:03]
context to teaches them how to use tools

[02:01 - 02:05]
that they might need to get tasks done

[02:03 - 02:06]
teaches them the order of those tasks

[02:05 - 02:08]
and perhaps gives them relevant examples

[02:06 - 02:10]
of how that task is done so prompt

[02:08 - 02:12]
engineering is the handbook you give

[02:10 - 02:14]
that intern that's going to be true

[02:12 - 02:17]
today and over the next few years even

[02:14 - 02:19]
as the AI landscape evolves that intern

[02:17 - 02:20]
may become a junior that intern may even

[02:19 - 02:22]
become a senior with some of the model

[02:20 - 02:24]
Evolution that we're seeing right now

[02:22 - 02:25]
either way you're still for the

[02:24 - 02:28]
foreseeable future going to need to be

[02:25 - 02:30]
able to instruct them precisely on how

[02:28 - 02:31]
to do the things that you want to draw

[02:30 - 02:33]
the outcomes that you need for yourself

[02:31 - 02:35]
or your business I'll also call out that

[02:33 - 02:37]
this is going to be specific guidance

[02:35 - 02:39]
for AI agent prompt engineering when I

[02:37 - 02:41]
was doing my research I actually saw a

[02:39 - 02:43]
lot of guidance that wasn't particularly

[02:41 - 02:45]
relevant in AI agents those tutorials

[02:43 - 02:47]
we're assuming that you're working with

[02:45 - 02:49]
just raw LMS so everything you're going

[02:47 - 02:51]
to learn here is specifically for how to

[02:49 - 02:53]
build AI agents and throughout this

[02:51 - 02:54]
series we're using n8n a work for

[02:53 - 02:56]
automation tool with some pretty

[02:54 - 02:58]
Kick-Ass AI agent building features in

[02:56 - 03:00]
them if you want to follow along on our

[02:58 - 03:02]
Cloud product make sure should use my

[03:00 - 03:05]
coupon code Max 50 to get 50% off for 12

[03:02 - 03:08]
months you can also self-host all right

[03:05 - 03:08]
without further Ado let's jump

[03:08 - 03:14]
in I like to think of prompting

[03:11 - 03:16]
occurring on three distinct different

[03:14 - 03:18]
layers within an agentic system the

[03:16 - 03:20]
first layer is the system layer and this

[03:18 - 03:22]
is where you're specifying the role of

[03:20 - 03:24]
the AI agent its rules how to complete

[03:22 - 03:26]
the task and certain types of context

[03:24 - 03:28]
then in Layer Two we'll have a look at

[03:26 - 03:30]
the input layer a gentic system expected

[03:28 - 03:33]
input this is the Quest the task and

[03:30 - 03:35]
then they output based on that task and

[03:33 - 03:37]
then thirdly there's the action layer so

[03:35 - 03:38]
there's various tools and functions that

[03:37 - 03:41]
AI agents can leverage and those tools

[03:38 - 03:43]
need descriptions and definitions so the

[03:41 - 03:44]
AI agent can use those successfully so

[03:43 - 03:47]
that all happens in layer three the

[03:44 - 03:51]
action layer so let's jump into n8n and

[03:47 - 03:51]
have a look at layer one the system

[03:51 - 03:57]
layer so I'm in the work for canvas in

[03:54 - 03:59]
NN and I've got a basic AI agent in here

[03:57 - 04:01]
so I've got a chat trigger connected to

[03:59 - 04:03]
my AI agent and I'm using a Google

[04:01 - 04:04]
Gemini model here but again you could

[04:03 - 04:06]
use a different chat model in this

[04:04 - 04:08]
system layer we're going to go over a

[04:06 - 04:10]
few different aspects to build out that

[04:08 - 04:12]
system layer that system prompt and the

[04:10 - 04:15]
first one is role prompting so role

[04:12 - 04:17]
prompting is explaining to the AI agent

[04:15 - 04:18]
what their role is who they are not

[04:17 - 04:20]
necessarily what they're doing although

[04:18 - 04:22]
there the elements of that but it's the

[04:20 - 04:24]
who they are so I like to think of this

[04:22 - 04:25]
as the first couple sentences in a job

[04:24 - 04:27]
description and the reason roles can be

[04:25 - 04:29]
helpful is as you see here we're going

[04:27 - 04:31]
to add instructions we're going to add

[04:29 - 04:33]
rules we're going to give it quite some

[04:31 - 04:35]
guidance on how to do its things but by

[04:33 - 04:38]
defining a role we give it this you know

[04:35 - 04:40]
50,000 foot view of context when there's

[04:38 - 04:42]
ambiguous situations so that's why role

[04:40 - 04:44]
prompting is a good first thing to do

[04:42 - 04:46]
because it sets the frame of who the AI

[04:44 - 04:48]
agent is and what they'll be doing let's

[04:46 - 04:50]
open up my AI agent and Define that role

[04:48 - 04:51]
prompt now as I teach all these

[04:50 - 04:54]
different skills in this video we're

[04:51 - 04:55]
going to do it by building a booking

[04:54 - 04:56]
assistant for a beauty salon now I just

[04:55 - 04:58]
picked a beauty salon so there's

[04:56 - 05:00]
something specific and concrete and you

[04:58 - 05:02]
can see how that informs the words that

[05:00 - 05:04]
I basically pick that go into my prompts

[05:02 - 05:07]
but this can be applied to any use case

[05:04 - 05:09]
okay let's open up the AI agent and the

[05:07 - 05:10]
role prompt and all everything you're

[05:09 - 05:12]
going to see in the system layer is

[05:10 - 05:15]
defined in the system message so to add

[05:12 - 05:17]
one we click in options here and we add

[05:15 - 05:19]
a system message there is a default

[05:17 - 05:22]
system message added here we can see it

[05:19 - 05:24]
saying you are a helpful assistant that

[05:22 - 05:25]
is role prompting it's really basic

[05:24 - 05:28]
really simple rle prompt but that's rle

[05:25 - 05:29]
prompting let's clear that however and

[05:28 - 05:31]
write our own before I do that have a

[05:29 - 05:33]
bit more working room let's just expand

[05:31 - 05:34]
our parameter pane here and actually

[05:33 - 05:37]
some users don't know about that so yeah

[05:34 - 05:38]
you can expand that and move it about

[05:37 - 05:39]
which is helpful I'm going to paste it

[05:38 - 05:42]
in but then we'll walk through it you

[05:39 - 05:43]
are a scheduling assistant working for a

[05:42 - 05:45]
beauty salon Your Role is to help

[05:43 - 05:47]
customers schedule an appointment in the

[05:45 - 05:50]
beauty salon's calendar okay what am I

[05:47 - 05:52]
doing at a very high level my roles

[05:50 - 05:58]
typically have a format of UR dot dot

[05:52 - 06:00]
dot your role is dot dot dot the UR does

[05:58 - 06:03]
not define their type task it doesn't

[06:00 - 06:05]
mention it defines who they are you're a

[06:03 - 06:06]
scheduling assistant working for a

[06:05 - 06:08]
beauty salon I see a lot of folks

[06:06 - 06:10]
perhaps at this stage they would say

[06:08 - 06:12]
you're a Google Calendar assistant that

[06:10 - 06:14]
actually doesn't provide a lot of

[06:12 - 06:15]
context to the a agent on what they're

[06:14 - 06:17]
supposed to do how they're supposed to

[06:15 - 06:19]
interact perhaps a Google Calendar

[06:17 - 06:21]
assistant could be a virtual assistant

[06:19 - 06:22]
whose job is to make sure that things

[06:21 - 06:23]
are booked really close to each other so

[06:22 - 06:25]
they're super efficient versus a

[06:23 - 06:26]
customer service that might not be as

[06:25 - 06:28]
important to you making the customer

[06:26 - 06:30]
happy might be so role provides that

[06:28 - 06:33]
very high level context to guide it

[06:30 - 06:34]
you're a scheduling assistant this would

[06:33 - 06:36]
make sense if it was a person as well

[06:34 - 06:38]
and your role is to help customers

[06:36 - 06:40]
schedule an appointment in the beauty

[06:38 - 06:42]
salon's calendar so few points to point

[06:40 - 06:45]
out I mentioned beauty salon here and I

[06:42 - 06:47]
use the exact same words here so AI

[06:45 - 06:48]
models are able to understand semantic

[06:47 - 06:51]
similarity between things so if I just

[06:48 - 06:53]
wrote Salon that would still work but

[06:51 - 06:55]
it's a better practice to use the exact

[06:53 - 06:57]
same word because it's going to be a

[06:55 - 07:00]
stronger match and then in this role I

[06:57 - 07:02]
am lightly giving content to what it

[07:00 - 07:04]
will be doing in terms of a task but I'm

[07:02 - 07:06]
not specifically defining it right I'm

[07:04 - 07:08]
not saying Google Calendar here if you

[07:06 - 07:09]
did it probably wouldn't be an issue but

[07:08 - 07:12]
that's one thing is trying to separate

[07:09 - 07:14]
concerns so we'll Define in the tool

[07:12 - 07:15]
that we use the Google Calendar tools

[07:14 - 07:17]
we'll Define that it's Google Calendar

[07:15 - 07:18]
at this stage it's better to separate

[07:17 - 07:19]
that out because what if we switch

[07:18 - 07:21]
calendars in future you might have an

[07:19 - 07:23]
issue because you're saying Google in

[07:21 - 07:25]
your role prompt so you keep it high

[07:23 - 07:27]
level here this is a sufficient rle

[07:25 - 07:28]
prompt for the scope of our agent and

[07:27 - 07:30]
since we're going to be adding other

[07:28 - 07:32]
sections we're going to actually use a

[07:30 - 07:35]
markdown format here so this is a H1

[07:32 - 07:38]
title and just write roll here if you're

[07:35 - 07:40]
writing short system messages you don't

[07:38 - 07:42]
really need this it's firstly helpful

[07:40 - 07:44]
for yourself and then when your system

[07:42 - 07:46]
messages get larger it can be helpful

[07:44 - 07:49]
for the AI agent although I expect that

[07:46 - 07:51]
its efficacy will reduce over time as AI

[07:49 - 07:53]
models get smarter with the role

[07:51 - 07:55]
prompting done let's define the list of

[07:53 - 07:57]
instructions the AI agent should follow

[07:55 - 07:59]
when completing the task now this is a

[07:57 - 08:01]
balancing act because if we're too

[07:59 - 08:02]
prescriptive in the steps and end up

[08:01 - 08:05]
defining a workflow we lose the

[08:02 - 08:07]
autonomous benefits of an AI agent so

[08:05 - 08:09]
this is giving it the highlevel steps

[08:07 - 08:11]
kind of like if you were completing a

[08:09 - 08:12]
task you might think of it at a very

[08:11 - 08:14]
high level before you go do that task

[08:12 - 08:17]
which might help you improve how you do

[08:14 - 08:21]
that task same thing here let's open up

[08:17 - 08:25]
the AI agent and let's add a instruction

[08:21 - 08:26]
section now what's going to happen next

[08:25 - 08:28]
is we're going to have a list of

[08:26 - 08:30]
instructions like number one number two

[08:28 - 08:32]
it's going to be a number list since

[08:30 - 08:34]
this is an instruction manual to an AI

[08:32 - 08:36]
agent in sort of a first-person voice

[08:34 - 08:38]
what we can do to improve this list

[08:36 - 08:41]
before we add those numbered steps is

[08:38 - 08:43]
preface it follow the following steps to

[08:41 - 08:44]
book an appointment for the user and

[08:43 - 08:46]
then the list of steps if this was a

[08:44 - 08:48]
copyrighting class follow the following

[08:46 - 08:50]
steps doesn't sound very good but the AI

[08:48 - 08:53]
agent isn't going to be judging you on

[08:50 - 08:55]
your copyrighting in that regard what I

[08:53 - 08:57]
encourage you to do before you write out

[08:55 - 09:00]
AI steps is have a quick think like as a

[08:57 - 09:02]
human what you would do so we're a

[09:00 - 09:04]
booking assistant for a salon right so

[09:02 - 09:06]
someone calls what happens first thing

[09:04 - 09:08]
is the assistant says well which day

[09:06 - 09:09]
would you like an appointment and then

[09:08 - 09:11]
it takes the user's day and it checks

[09:09 - 09:12]
for that day there's going to be

[09:11 - 09:13]
availabilities or there's not so either

[09:12 - 09:15]
it's going to have to ask the user hey

[09:13 - 09:17]
that day is not available is there

[09:15 - 09:19]
another day and then it'll find some

[09:17 - 09:22]
availabilities for a day and then it'll

[09:19 - 09:24]
ask the user hey here's availabilities

[09:22 - 09:25]
which would you like the user will say

[09:24 - 09:27]
and then it will attempt to book it

[09:25 - 09:28]
before that it needs to make sure it has

[09:27 - 09:30]
all the information needs from the user

[09:28 - 09:31]
their name their email right to book

[09:30 - 09:33]
that and then it books that that is

[09:31 - 09:36]
successful or not and then it replies to

[09:33 - 09:37]
the user so quite a few cases that could

[09:36 - 09:39]
happen quite a few situations I mean the

[09:37 - 09:40]
user might say hey what about Sunday

[09:39 - 09:42]
they're not open on Sunday right there's

[09:40 - 09:44]
all these details here but let's break

[09:42 - 09:46]
this down into the key parts and then

[09:44 - 09:49]
allow our AI agent to make decisions

[09:46 - 09:51]
within those steps so for step one we

[09:49 - 09:53]
want to ask the user for their preferred

[09:51 - 09:55]
appointment Day first person voice nice

[09:53 - 09:57]
and clear and again here we're saying

[09:55 - 09:58]
appointment because here we said

[09:57 - 09:59]
appointment and here we're saying

[09:58 - 10:02]
appointment using the same ter um

[09:59 - 10:05]
throughout these for consistency so next

[10:02 - 10:07]
now that we have the users preferred day

[10:05 - 10:08]
we need to go check the calendar and see

[10:07 - 10:11]
if there's any availability for that day

[10:08 - 10:13]
so use the check calendar availability

[10:11 - 10:15]
tool to identify free time slots for the

[10:13 - 10:17]
user specified day this tool doesn't

[10:15 - 10:19]
exist yet but when we do we're going to

[10:17 - 10:20]
name it exactly this and every time we

[10:19 - 10:22]
refer to that tool in roll prompting

[10:20 - 10:24]
we're always going to use exactly that

[10:22 - 10:26]
name that is a best practice now one

[10:24 - 10:30]
thing you're going to notice here I'm

[10:26 - 10:32]
saying the user the user the user why

[10:30 - 10:35]
here you'll notice I said customer this

[10:32 - 10:36]
is because in the role it is helping

[10:35 - 10:38]
customers and how one might interact

[10:36 - 10:39]
with customers could be very different

[10:38 - 10:41]
to how you interact with a vendor for

[10:39 - 10:43]
example now you might be polite in both

[10:41 - 10:44]
cases but again there's a lot of nuance

[10:43 - 10:47]
in how you might interact in that social

[10:44 - 10:49]
interpersonal interaction thing is when

[10:47 - 10:52]
it comes to instructions here the

[10:49 - 10:55]
instructions are interacting with things

[10:52 - 10:57]
the user will write and that is the user

[10:55 - 10:58]
message that's the entity through which

[10:57 - 11:00]
the user on the input layer is

[10:58 - 11:03]
delivering this that's what the llm the

[11:00 - 11:04]
the AI model understands it as there's

[11:03 - 11:06]
user messages and there's system

[11:04 - 11:09]
messages under the hood to the llm model

[11:06 - 11:11]
so by saying the user that's going to be

[11:09 - 11:14]
much stronger connotation with like the

[11:11 - 11:16]
other input I'm receiving from an actor

[11:14 - 11:18]
from an entity that I know as the user

[11:16 - 11:19]
so that's why you say the user here when

[11:18 - 11:21]
it's like Specific Instructions that

[11:19 - 11:23]
interacting with the inputs from the

[11:21 - 11:25]
user one thing to note when we actually

[11:23 - 11:27]
use that tool what we're actually going

[11:25 - 11:30]
to have to do is for a day Define

[11:27 - 11:32]
midnight of that day till 1159 of that

[11:30 - 11:34]
day pull the all the actual events and

[11:32 - 11:36]
then find the space in between and

[11:34 - 11:37]
that's what the availability is but

[11:36 - 11:39]
we're not defining that here that is

[11:37 - 11:40]
something we'll Define at the tool level

[11:39 - 11:42]
because that's how Gmail is going to

[11:40 - 11:44]
work but if we swap it in future we

[11:42 - 11:46]
Define it here and there it's all messy

[11:44 - 11:48]
so we're separating those concerns so

[11:46 - 11:50]
here the step is to identify free time

[11:48 - 11:53]
slot the tool that helps you do that

[11:50 - 11:55]
will Define how to do that specifically

[11:53 - 11:57]
next we need to show the user these

[11:55 - 11:59]
slots and capture their preference so

[11:57 - 12:01]
show the US available time slots for the

[11:59 - 12:02]
preferred day and get from user the time

[12:01 - 12:04]
slot they would like to book an

[12:02 - 12:06]
appointment for if there are no

[12:04 - 12:07]
available slots for the day start from

[12:06 - 12:09]
step one again and ask the user for a

[12:07 - 12:11]
new day preference few things to point

[12:09 - 12:12]
out reference steps you have numbered

[12:11 - 12:14]
steps you can reference them that's why

[12:12 - 12:17]
I use number steps not bullet points

[12:14 - 12:18]
next the English here is not so good

[12:17 - 12:20]
right like my English teacher would be

[12:18 - 12:23]
very upset that I'm ending on a four

[12:20 - 12:25]
here but it is specific and it's like

[12:23 - 12:27]
verbose to where it would be bad if I

[12:25 - 12:29]
was writing this as an article but it's

[12:27 - 12:32]
clear it just might not be very elegant

[12:29 - 12:34]
that's okay so next we've gotten a

[12:32 - 12:37]
preference from the user for time slot

[12:34 - 12:39]
that is available and now we need to ask

[12:37 - 12:40]
the user for the information you require

[12:39 - 12:42]
to book the calendar appointment in

[12:40 - 12:44]
order to book the appointment you need

[12:42 - 12:46]
the user's full name and email so

[12:44 - 12:48]
interesting pattern I've chosen here is

[12:46 - 12:50]
I'm asking it to get information from

[12:48 - 12:53]
the user and then afterwards I'm giving

[12:50 - 12:55]
it some context on what it needs now

[12:53 - 12:57]
here I didn't say it only needs that by

[12:55 - 13:00]
saying ask the user for the information

[12:57 - 13:02]
you require you give agency to your AI

[13:00 - 13:04]
agent what I mean by that is if the tool

[13:02 - 13:06]
to book the calendar appointment

[13:04 - 13:09]
requires a phone number or in future has

[13:06 - 13:11]
optional things and whatnot that is

[13:09 - 13:13]
going to look like a form for the AIG to

[13:11 - 13:14]
fill out imagine this was a real person

[13:13 - 13:16]
and you're like hey look this is the app

[13:14 - 13:17]
that you used to book in Google Calendar

[13:16 - 13:19]
they're going to see a form of stuff to

[13:17 - 13:21]
fill out that human would infer okay I

[13:19 - 13:22]
need to capture this information to book

[13:21 - 13:23]
the appointment because I can't click

[13:22 - 13:25]
the button until I fill it out that's

[13:23 - 13:27]
the same thing the AI agent is going to

[13:25 - 13:28]
be thinking when it looks at your tool

[13:27 - 13:30]
so by saying ask the user for the

[13:28 - 13:31]
information you requireed to book the

[13:30 - 13:33]
calendar appointment you're giving it

[13:31 - 13:34]
some agency but then also some God rails

[13:33 - 13:36]
because you know it's going to need name

[13:34 - 13:38]
an email then in the tool itself you

[13:36 - 13:40]
will be defining all the other things it

[13:38 - 13:43]
might need as well so it's a bit of a

[13:40 - 13:44]
hybrid here removing this could also be

[13:43 - 13:46]
acceptable if you want to completely

[13:44 - 13:48]
separate concerns and have that only

[13:46 - 13:51]
defined in the tool all right Next Step

[13:48 - 13:53]
use the create calendar appointment tool

[13:51 - 13:55]
again we haven't created that yet to

[13:53 - 13:57]
book the appointment for the user using

[13:55 - 13:58]
details captured from step five okay so

[13:57 - 14:01]
the agent's going to try and use that

[13:58 - 14:03]
tool that's going to work or not work

[14:01 - 14:06]
right tools can fail every system can

[14:03 - 14:07]
fail so once the appointment is booked

[14:06 - 14:09]
notify the user with relevant details

[14:07 - 14:10]
for their appointment notify user if it

[14:09 - 14:12]
was not possible to create the

[14:10 - 14:13]
appointment I'm defining what it should

[14:12 - 14:15]
do here I'm not going into too much

[14:13 - 14:17]
detail the reason is notify the user

[14:15 - 14:19]
with relevant details I could explain a

[14:17 - 14:21]
lot on what that is but because we're

[14:19 - 14:24]
going to later show F shot prompting

[14:21 - 14:26]
which is providing examples showing it

[14:24 - 14:27]
how you would like to show the

[14:26 - 14:29]
information for successful booking is

[14:27 - 14:30]
going to be a lot easier to show be an

[14:29 - 14:32]
example so that's what I'm going to do

[14:30 - 14:34]
there we've got instructions booked

[14:32 - 14:36]
what's next now that we've added Ro

[14:34 - 14:39]
prompting and some instructions the next

[14:36 - 14:41]
thing is to Define rules now rules is

[14:39 - 14:43]
basically a list of that went wrong

[14:41 - 14:44]
while you were building or when you were

[14:43 - 14:46]
in prod and you're kind of reverse

[14:44 - 14:49]
engineering how to fix that case that's

[14:46 - 14:50]
usually what my rules list looks like I

[14:49 - 14:52]
might have one or two preemptive ones

[14:50 - 14:54]
that are really important for the use

[14:52 - 14:56]
case going in but this is a really quick

[14:54 - 14:58]
section so I'll open up my AI agent here

[14:56 - 14:59]
in the system message we've got the role

[14:58 - 15:03]
we got the instructions let's add

[14:59 - 15:05]
another section called rules so in here

[15:03 - 15:07]
for my use case I've got two preemptive

[15:05 - 15:08]
rules but again from testing if you need

[15:07 - 15:11]
to add stuff this is where I would add

[15:08 - 15:13]
it always use

[15:11 - 15:16]
utc+1 time zone when using tools or

[15:13 - 15:17]
their outputs so I wanted to use UTC

[15:16 - 15:19]
plus1 because my beauty salon is in

[15:17 - 15:21]
Berlin and it would be kind of weird if

[15:19 - 15:22]
it's like you call somewhere or you're

[15:21 - 15:24]
texting somewhere local like in your

[15:22 - 15:26]
town it's like dealing with time zone

[15:24 - 15:29]
stuff so just assume UTC plus1 now

[15:26 - 15:31]
that's a rule it could also be a context

[15:29 - 15:33]
like later along we might say hey the

[15:31 - 15:35]
beauty salon is in Berlin but it's a

[15:33 - 15:37]
rule that it should always use UTC plus1

[15:35 - 15:39]
so separate from the context right even

[15:37 - 15:41]
though you might want to reiterate in

[15:39 - 15:43]
that context that they operate in a UTC

[15:41 - 15:45]
plus next don't make things up ask the

[15:43 - 15:46]
user a clarifying question if you need

[15:45 - 15:48]
additional information to complete your

[15:46 - 15:50]
task so while I've placed this in the

[15:48 - 15:52]
rule section this is an example of a few

[15:50 - 15:53]
things actually so don't make things up

[15:52 - 15:56]
is you're telling it don't hallucinate

[15:53 - 15:57]
that's a very simple strategy for having

[15:56 - 15:59]
it not hallucinate not making things up

[15:57 - 16:01]
there are more complicated ones but so

[15:59 - 16:02]
we sew that and we say to ask the user

[16:01 - 16:04]
clarifying questions if you need

[16:02 - 16:06]
additional information to complete your

[16:04 - 16:08]
task it's usually a good one you give

[16:06 - 16:11]
the AI agent an exit hatch or a way to

[16:08 - 16:13]
kind of like get more context from the

[16:11 - 16:15]
human which is arguably maybe the best

[16:13 - 16:16]
tool it has for helping with its task

[16:15 - 16:19]
because here we're being very

[16:16 - 16:21]
prescriptive on what it should do so we

[16:19 - 16:22]
give it this now again only two rules

[16:21 - 16:24]
here as we build this we might add one

[16:22 - 16:26]
or two here if we were testing it or

[16:24 - 16:28]
once it's live for example a rule might

[16:26 - 16:29]
be always talk in English because even

[16:28 - 16:31]
though they AI agent can talk 12

[16:29 - 16:32]
different languages actually that causes

[16:31 - 16:35]
problems for our Ops because then people

[16:32 - 16:36]
think they can talk with the people in

[16:35 - 16:38]
Ukrainian or something right so that

[16:36 - 16:40]
that could mess it up so this is where

[16:38 - 16:43]
we would add those all right so that's

[16:40 - 16:45]
rules now let's look at F shot prompting

[16:43 - 16:47]
before we get into fuse shot prompting

[16:45 - 16:49]
let's talk about what a shot is so this

[16:47 - 16:52]
is different from shots fired right this

[16:49 - 16:53]
is shots in the context of an llm model

[16:52 - 16:56]
and think of it is basically just an

[16:53 - 16:58]
example so if someone said that my AI

[16:56 - 17:00]
agent has a one shot prompt that means

[16:58 - 17:02]
they give it one example perhaps it's an

[17:00 - 17:04]
example of the expected output or an

[17:02 - 17:06]
intermediary step and they expect that

[17:04 - 17:08]
the AI agent can complete the task based

[17:06 - 17:10]
on that one example if they provide

[17:08 - 17:13]
multiple examples this can be fuse shot

[17:10 - 17:15]
prompting multi-shot prompting or n shot

[17:13 - 17:16]
prompting if you got a bit of a math

[17:15 - 17:18]
background and you like to sound fancy

[17:16 - 17:19]
now as a human if you're given a couple

[17:18 - 17:21]
examples of things you're probably going

[17:19 - 17:24]
to have an easier time doing a task same

[17:21 - 17:27]
thing for an llm shots can be added at

[17:24 - 17:29]
different layers of our prompt

[17:27 - 17:31]
engineering system message is a Common

[17:29 - 17:33]
Place the user message can be a common

[17:31 - 17:35]
one but not for our use case where we

[17:33 - 17:36]
have a chat interaction that might be

[17:35 - 17:37]
the case more when you're having

[17:36 - 17:39]
something programmatic where again

[17:37 - 17:41]
you're using that user message and

[17:39 - 17:43]
creating that user message based on

[17:41 - 17:45]
static and and dynamic data and sending

[17:43 - 17:48]
it in and in and AI agents have this

[17:45 - 17:50]
concept of structured output so if I

[17:48 - 17:53]
check this to true I get the output

[17:50 - 17:55]
parser Branch here and I can add a

[17:53 - 17:58]
structured output parser this allows me

[17:55 - 18:01]
to define the format that I would like

[17:58 - 18:02]
the AI agent to Output its final step

[18:01 - 18:05]
now this is not as helpful when you're

[18:02 - 18:06]
using a chat trigger use case because

[18:05 - 18:08]
here we're expecting a text that comes

[18:06 - 18:09]
out that then gets served back to the

[18:08 - 18:11]
user the user chats with it sends back

[18:09 - 18:13]
and the loop continues but this could be

[18:11 - 18:15]
useful for programmatic use casee where

[18:13 - 18:16]
we need this to be a rather specific

[18:15 - 18:18]
jent object because we're

[18:16 - 18:20]
programmatically consuming it down the

[18:18 - 18:23]
line so if I provided a jent example in

[18:20 - 18:25]
here this would be a shot now you can

[18:23 - 18:27]
provide adjacent example or you can use

[18:25 - 18:29]
adjacent schema if you're not familiar

[18:27 - 18:31]
with adjacent schemas use chpt to help

[18:29 - 18:33]
you provide an example of the Json you

[18:31 - 18:35]
want say hey turn this into Json schema

[18:33 - 18:36]
cuz in Json schema you can set the type

[18:35 - 18:38]
if it's required and what there's quite

[18:36 - 18:40]
some flexibility there most of the time

[18:38 - 18:42]
I am providing an example but this is

[18:40 - 18:44]
only for the structured output of your

[18:42 - 18:46]
AI agent step what comes out at the end

[18:44 - 18:47]
so for our use case that's not as

[18:46 - 18:50]
relevant what I want to provide an

[18:47 - 18:52]
example of or a few shots of is how the

[18:50 - 18:54]
AI agent should communicate to the user

[18:52 - 18:56]
via chat when the booking is successful

[18:54 - 18:57]
and when a nice consistent message that

[18:56 - 18:59]
gives the user confidence that their

[18:57 - 19:02]
booking has been booked to do that let's

[18:59 - 19:04]
open up our AI agent and go into my

[19:02 - 19:06]
system message and then underneath rules

[19:04 - 19:09]
we're going to add another section and

[19:06 - 19:10]
call this examples now since I mentioned

[19:09 - 19:11]
that there could be a few different

[19:10 - 19:13]
types of example like we might provide

[19:11 - 19:15]
an example of what we want the success

[19:13 - 19:17]
booking to look like we might also say

[19:15 - 19:18]
hey look here's a three example threads

[19:17 - 19:21]
this is how we want your voice and tone

[19:18 - 19:24]
to sound like so again here underneath

[19:21 - 19:27]
examples we're going to employ these

[19:24 - 19:29]
prefaces before we add the examples so

[19:27 - 19:30]
for the first one use the the following

[19:29 - 19:31]
examples when notifying the user that

[19:30 - 19:33]
you've successfully booked their

[19:31 - 19:35]
appointment so these are examples just

[19:33 - 19:36]
for that message once the booking is

[19:35 - 19:38]
successful let me paste in my first

[19:36 - 19:39]
example let's have a look I have

[19:38 - 19:41]
successfully booked her appointment here

[19:39 - 19:42]
are the details we're using markdown

[19:41 - 19:44]
formatting so date and time and email

[19:42 - 19:46]
for booking will be bolded because of

[19:44 - 19:48]
these asterisks and here we have the

[19:46 - 19:51]
time and date the format we're saying

[19:48 - 19:53]
the date and time 24-hour clock on

[19:51 - 19:55]
Wednesday we mention the day and then

[19:53 - 19:57]
the month and year email for booking

[19:55 - 19:59]
Jane ato.com and then if you need to

[19:57 - 20:01]
cancel your appointment please call a

[19:59 - 20:03]
specific number so this is how we'd like

[20:01 - 20:04]
them generally to look like and we want

[20:03 - 20:06]
to provide an example instead of

[20:04 - 20:08]
defining every single rule of everything

[20:06 - 20:09]
like it should be in the 24-hour clock

[20:08 - 20:12]
and this and this because it's less

[20:09 - 20:13]
effort less tokens faster more efficient

[20:12 - 20:15]
and can provide some context maybe a

[20:13 - 20:17]
list of rules can't a few things we can

[20:15 - 20:18]
do to improve it the first thing is the

[20:17 - 20:19]
AI agent might not know where the

[20:18 - 20:21]
example starts and stops especially if

[20:19 - 20:24]
we got stuff after this so we can wrap

[20:21 - 20:28]
it in an example tag now this example

[20:24 - 20:30]
tag it's kind of like pseudo XML in here

[20:28 - 20:32]
I know that we're then mixing markdown

[20:30 - 20:34]
and XML for organizing my things the

[20:32 - 20:37]
reason I'm using XML here is because it

[20:34 - 20:39]
has a start and an end you could say the

[20:37 - 20:41]
same case for these examples these

[20:39 - 20:43]
themselves could also be XML at the end

[20:41 - 20:44]
of the day most Frontier models that I'm

[20:43 - 20:46]
using today these models were totally

[20:44 - 20:48]
fine with this mix and match and this is

[20:46 - 20:50]
what works best for me if you wanted to

[20:48 - 20:54]
use markdown in here for example

[20:50 - 20:56]
something like example one that probably

[20:54 - 20:58]
will also work so there is a preference

[20:56 - 20:59]
I will say that anthropic models were

[20:58 - 21:02]
trained trained more on XML data that

[20:59 - 21:04]
could change over time but they are used

[21:02 - 21:06]
to XML a bit more open AI models were

[21:04 - 21:07]
trained a bit more in markdown but again

[21:06 - 21:10]
this sophisticated models and this is

[21:07 - 21:12]
not very complicated XML or syntax so

[21:10 - 21:13]
again there is a bit of a preference to

[21:12 - 21:15]
it so I have my example this would be

[21:13 - 21:18]
technically a onshot example and with

[21:15 - 21:20]
only one example it's not really sure

[21:18 - 21:21]
what's placeholder and what needs to be

[21:20 - 21:23]
swapped out or not right so let's

[21:21 - 21:25]
strengthen it by adding another one if I

[21:23 - 21:28]
paste it in we'll notice some

[21:25 - 21:30]
differences and I thoughtfully chose and

[21:28 - 21:32]
created example to be a contrast to the

[21:30 - 21:34]
other example so the way I like to think

[21:32 - 21:35]
about examples is there's a canvas of

[21:34 - 21:38]
good that I'm trying to explain to the

[21:35 - 21:40]
AI agent if they paint here it's bad if

[21:38 - 21:43]
they paint here it's good when I pick my

[21:40 - 21:45]
examples I try to pick examples that are

[21:43 - 21:47]
kind of defining that box so it

[21:45 - 21:49]
understands the difference between the

[21:47 - 21:51]
examples and what's consistent between

[21:49 - 21:53]
the examples because those are both

[21:51 - 21:55]
different concepts and both useful to

[21:53 - 21:56]
helping the AI agent understand what

[21:55 - 21:59]
good looks like so you'll notice with a

[21:56 - 22:01]
24-hour cook I have one example that's

[21:59 - 22:03]
after 12 and one example before 12

[22:01 - 22:05]
that's rather clear it's a 24-hour clock

[22:03 - 22:08]
as soon as I've seen something above 12

[22:05 - 22:10]
the next thing is here I'm using a very

[22:08 - 22:12]
placeholder email now because again LM

[22:10 - 22:14]
are trained on millions and millions and

[22:12 - 22:16]
billions of characters out on the world

[22:14 - 22:19]
think in the states Jane Doe John Doe is

[22:16 - 22:20]
a very common way for placeholder names

[22:19 - 22:22]
so there's probably going to be a lot of

[22:20 - 22:24]
characters around like Mark and

[22:22 - 22:26]
placeholder and stuff if I only use Jane

[22:24 - 22:28]
Doe exclusively it might give too much

[22:26 - 22:31]
weight to Jane and doe which is why here

[22:28 - 22:33]
I'm using a fake email for our CEO so

[22:31 - 22:36]
don't email that email it doesn't exist

[22:33 - 22:38]
and so that's providing again different

[22:36 - 22:40]
points to paint that picture of of the

[22:38 - 22:42]
canvas of good that we want instruct it

[22:40 - 22:44]
to follow another thing we're doing is

[22:42 - 22:45]
this text is exactly the same and this

[22:44 - 22:47]
text is exactly the same so I don't have

[22:45 - 22:48]
to write this text should be exactly the

[22:47 - 22:50]
same I could separately add that as a

[22:48 - 22:51]
rule that you should always include the

[22:50 - 22:52]
phone number here and this is what the

[22:51 - 22:54]
phone number is if that's important or

[22:52 - 22:55]
if it's failing at that but I'm rather

[22:54 - 22:57]
confident but by providing two three

[22:55 - 22:59]
examples it will adhere to that two

[22:57 - 23:01]
examples is probably enough here again

[22:59 - 23:03]
you could add more especially if there's

[23:01 - 23:05]
more variability in those examples and

[23:03 - 23:06]
you need your AI to understand the minua

[23:05 - 23:08]
between those a bit more one thing we

[23:06 - 23:11]
could do to make this even stronger is

[23:08 - 23:14]
we have my example wrapped in tags let's

[23:11 - 23:15]
now take all of my examples and wrap it

[23:14 - 23:18]
in an

[23:15 - 23:22]
examples tag and also close

[23:18 - 23:23]
that okay this is good I don't feel like

[23:22 - 23:25]
I need to provide specific examples for

[23:23 - 23:26]
like the voice and tone and how it

[23:25 - 23:28]
should interact with the user like a

[23:26 - 23:30]
chat thread but if I wanted to I would

[23:28 - 23:33]
have a similar preface for here are some

[23:30 - 23:35]
examples of the tone of the interactions

[23:33 - 23:38]
with users I use those as inspiration or

[23:35 - 23:39]
abide by them and then similarly I might

[23:38 - 23:41]
have a little chat thread in here

[23:39 - 23:42]
wrapped in example and multiple chat

[23:41 - 23:45]
threads wrapped in examples all

[23:42 - 23:47]
underneath the examples section all

[23:45 - 23:49]
right let's continue so far throughout

[23:47 - 23:51]
the system layer we've been adding a

[23:49 - 23:53]
bunch of contexts we've been telling it

[23:51 - 23:55]
who it is rules how to complete tasks

[23:53 - 23:57]
but additional context I like to think

[23:55 - 24:00]
of this as the sort of environmental

[23:57 - 24:01]
context so your employee if they came in

[24:00 - 24:03]
on a Wednesday they'd know it's a

[24:01 - 24:05]
Wednesday they'd know what day it is the

[24:03 - 24:07]
llm model doesn't know what day it is

[24:05 - 24:08]
today that's an example of additional

[24:07 - 24:11]
context so let's set that up I'll open

[24:08 - 24:13]
up my AI agent and then in the system

[24:11 - 24:15]
message we're going to be piping in some

[24:13 - 24:16]
Dynamic dot now so that's going to be

[24:15 - 24:18]
the time to do that we're going to need

[24:16 - 24:21]
to use Expressions so let's turn this

[24:18 - 24:23]
into an expression and let's open this

[24:21 - 24:29]
up so we have more room to work with and

[24:23 - 24:29]
let's add the additional context section

[24:30 - 24:33]
okay so in here we can add this just

[24:32 - 24:35]
through bullet points because there's

[24:33 - 24:37]
just going to be a few of them if there

[24:35 - 24:38]
was a lot of context and that context

[24:37 - 24:40]
itself had syntax like if your

[24:38 - 24:42]
additional context was for some reason

[24:40 - 24:45]
in HTML or something you may want to

[24:42 - 24:46]
delineate it with something like this uh

[24:45 - 24:48]
XML format but in this case we'll just

[24:46 - 24:50]
have some simple ones so the additional

[24:48 - 24:52]
context we want to let it know what date

[24:50 - 24:56]
and time it is because that's relevant

[24:52 - 24:59]
for this use case the date and time

[24:56 - 25:01]
right now is so since we want this to be

[24:59 - 25:04]
live that's where we're going to use

[25:01 - 25:07]
Expressions so open

[25:04 - 25:09]
bracket and this opens up the auto

[25:07 - 25:11]
complete here and we can actually select

[25:09 - 25:14]
this dollar now

[25:11 - 25:17]
method and if I look in the result here

[25:14 - 25:19]
that's rendering to a date time object

[25:17 - 25:22]
now what we could do is we could format

[25:19 - 25:24]
that there's various methods and stuff

[25:22 - 25:27]
that help me do that for example that

[25:24 - 25:29]
but since the LM is a computer system

[25:27 - 25:31]
and it output puts by default this

[25:29 - 25:33]
datetime object that's totally fine for

[25:31 - 25:35]
it to understand so what the LM is going

[25:33 - 25:39]
to see is the date and time right now is

[25:35 - 25:41]
date time 2025 da da d d perfect now

[25:39 - 25:45]
let's also add some quick context about

[25:41 - 25:48]
the business so the beauty salon is

[25:45 - 25:51]
called Max's gorgeous looks best place

[25:48 - 25:57]
to get a blowout in bin and well

[25:51 - 26:01]
actually best blowouts Berlin and the

[25:57 - 26:04]
beauty salon's phone number is so this

[26:01 - 26:05]
is a good example where we've mentioned

[26:04 - 26:07]
the phone number multiple times in the

[26:05 - 26:09]
examples but we've also said these are

[26:07 - 26:11]
examples and we're expecting it to fill

[26:09 - 26:13]
some stuff in and out so let's make it

[26:11 - 26:14]
extra clear to the llm that this is our

[26:13 - 26:16]
phone number because we're mentioning

[26:14 - 26:17]
that in two different places now again

[26:16 - 26:19]
we could add a bunch of additional stuff

[26:17 - 26:21]
like this but you get the idea you can

[26:19 - 26:23]
add your bullet points all right that's

[26:21 - 26:25]
additional context all right last

[26:23 - 26:26]
section for the system layer and we're

[26:25 - 26:28]
going to talk about some strategies on

[26:26 - 26:29]
reducing hallucinations so

[26:28 - 26:31]
hallucinations is coming up with stuff

[26:29 - 26:34]
that doesn't exist and telling the user

[26:31 - 26:35]
pcup pi and all lies when I came up with

[26:34 - 26:37]
the curriculum for the system layer I

[26:35 - 26:38]
did have to cut some stuff so if you're

[26:37 - 26:40]
familiar with prompt engineering you're

[26:38 - 26:41]
going to say Max what about Chain of

[26:40 - 26:43]
Thought and all these other things yes I

[26:41 - 26:45]
did have to cut some stuff but the

[26:43 - 26:47]
reason hallucinations is making the cut

[26:45 - 26:48]
is most people think it's pretty bad

[26:47 - 26:50]
when your AI is starting to make stuff

[26:48 - 26:53]
up and and obviously that's not good for

[26:50 - 26:54]
for your use case I will preface that I

[26:53 - 26:56]
am not an expert on reducing

[26:54 - 26:58]
hallucinations and there probably prompt

[26:56 - 27:01]
Engineers working on fintech stuff that

[26:58 - 27:03]
have a lot of deep thinking on this if

[27:01 - 27:04]
reducing hallucinations is something

[27:03 - 27:06]
you're running into or generally you

[27:04 - 27:08]
want to school up on it the first thing

[27:06 - 27:10]
I would recommend you to do is go to

[27:08 - 27:12]
Google and search anthropic reducing

[27:10 - 27:14]
hallucinations and read anthropics

[27:12 - 27:15]
article on reducing hallucinations I'm

[27:14 - 27:17]
going to go on some of the things

[27:15 - 27:19]
through this and and give a bit of voice

[27:17 - 27:21]
over but that's my advice okay the first

[27:19 - 27:24]
thing that you're going to want to let

[27:21 - 27:27]
the AI agent do is allow it to say I

[27:24 - 27:28]
don't know give it an escape hatch

[27:27 - 27:29]
otherwise if you're saying you're

[27:28 - 27:30]
helpful you're an assistant it's going

[27:29 - 27:32]
to try to keep helping even though it

[27:30 - 27:34]
doesn't have the tools or the context in

[27:32 - 27:35]
order to do that we've kind of already

[27:34 - 27:38]
addressed that so let's take a look if

[27:35 - 27:40]
we look in the rules we say don't make

[27:38 - 27:41]
things up and ask the user for

[27:40 - 27:43]
clarifying questions if you need

[27:41 - 27:45]
additional information to complete your

[27:43 - 27:48]
task so that's kind of an escape hatch

[27:45 - 27:49]
it's not exactly like anthropics example

[27:48 - 27:50]
but that's sort of I think their

[27:49 - 27:53]
guidance applied to this we could

[27:50 - 27:55]
strengthen it with their guidance so

[27:53 - 28:00]
don't make things up ask clarifing

[27:55 - 28:06]
questions if you're asked a question to

[28:00 - 28:09]
which you don't know the answer say so

[28:06 - 28:12]
now the next guidance isn't as relevant

[28:09 - 28:14]
for us at this stage but when you're

[28:12 - 28:17]
extracting lots of information for

[28:14 - 28:19]
example with tools it's going to be

[28:17 - 28:21]
helpful to instruct the AI agent to

[28:19 - 28:24]
Output quotes from those tools relevant

[28:21 - 28:26]
quotes because if the AI agent doesn't

[28:24 - 28:28]
output text like when you're looking

[28:26 - 28:30]
through its logs if it's not outputting

[28:28 - 28:31]
Ting it it didn't think it so you have

[28:30 - 28:32]
it output the things that are going to

[28:31 - 28:34]
be relevant is going to use the next

[28:32 - 28:37]
step because then it thought about it

[28:34 - 28:39]
Etc if you're interested in reducing

[28:37 - 28:41]
hallucinations in a sort of MVP low

[28:39 - 28:43]
effort way again do read this article

[28:41 - 28:46]
but the tldr if you don't want to do

[28:43 - 28:48]
that is have some kind of rule or

[28:46 - 28:51]
sentence like this don't make things up

[28:48 - 28:54]
give it away to to exit and ask the user

[28:51 - 28:56]
for a clarifying question and tell it to

[28:54 - 28:57]
that if it's asked a specific question

[28:56 - 28:59]
it doesn't know the answer to to not try

[28:57 - 29:01]
to be help in that case so drop a

[28:59 - 29:02]
comment if you think there's things I'm

[29:01 - 29:03]
missing here there's things you've heard

[29:02 - 29:05]
about or there's challenges that you're

[29:03 - 29:09]
having you and you would like to know

[29:05 - 29:09]
how to address those with

[29:10 - 29:13]
prompting there was a ton of information

[29:12 - 29:15]
packed into the system lay if you're

[29:13 - 29:17]
still watching you're doing great we got

[29:15 - 29:19]
two more smaller sections because most

[29:17 - 29:21]
of the magic happens in the system layer

[29:19 - 29:22]
but there's some key things to keep in

[29:21 - 29:25]
mind in the input layer and the action

[29:22 - 29:27]
layer so let's continue okay the input

[29:25 - 29:29]
layer is where the actual user request

[29:27 - 29:31]
is made now the important Point here is

[29:29 - 29:33]
the user might not always be a human so

[29:31 - 29:35]
in a chat use case the user is typically

[29:33 - 29:37]
going to be human but there is some

[29:35 - 29:39]
modifications or injections you could be

[29:37 - 29:40]
making to their actual request that gets

[29:39 - 29:43]
sent in their actual message but then

[29:40 - 29:45]
you also have programmatic use cases so

[29:43 - 29:47]
this is where the user of your AI agent

[29:45 - 29:49]
is another system very often API

[29:47 - 29:52]
endpoint or something like that so let's

[29:49 - 29:55]
take a look at these two cases and how

[29:52 - 29:57]
we would basically set up the input or

[29:55 - 29:59]
the user message to get that request

[29:57 - 30:02]
done let's send a message so that we

[29:59 - 30:02]
have some populated

[30:05 - 30:09]
data okay can I make an appointment

[30:07 - 30:10]
tomorrow now the reply isn't going to

[30:09 - 30:12]
matter as much because we haven't set up

[30:10 - 30:14]
tools and stuff what happens is if I

[30:12 - 30:16]
look in my chat trigger here we can see

[30:14 - 30:18]
it's outputed a payload of data and it

[30:16 - 30:20]
has this variable called chat input and

[30:18 - 30:22]
here's that message that we sent so

[30:20 - 30:23]
basically what's happening is this

[30:22 - 30:26]
payload of data is being routed we see

[30:23 - 30:28]
one item of data into the AI agent and

[30:26 - 30:31]
then here we can see in the use a

[30:28 - 30:33]
message it's being fed in and this is

[30:31 - 30:34]
what the llm the AI agent receives

[30:33 - 30:36]
that's the task the thing that's

[30:34 - 30:38]
supposed to do the reason this is grayed

[30:36 - 30:39]
out is because the source for prompt the

[30:38 - 30:41]
source for user message is set to

[30:39 - 30:43]
connect a chat trigger node this is the

[30:41 - 30:46]
default if you're using the NN chat

[30:43 - 30:48]
trigger now if you're using a different

[30:46 - 30:50]
type of app for example telegram or

[30:48 - 30:52]
Whatsapp two different things you could

[30:50 - 30:54]
do you could either Define below and

[30:52 - 30:57]
drag and drop whatever that message is

[30:54 - 30:59]
from the user in the incoming node in

[30:57 - 31:03]
here for examp example or you can make

[30:59 - 31:05]
sure if you're set to the default mode

[31:03 - 31:08]
that the text containing that user

[31:05 - 31:11]
message is set to chat input by default

[31:08 - 31:13]
for programmatic use cases this is where

[31:11 - 31:15]
you're going to be using the defined

[31:13 - 31:16]
below format because basically you're

[31:15 - 31:18]
going to have probably multiple

[31:16 - 31:21]
variables of data that you're

[31:18 - 31:23]
interspacing with a static prompt uh and

[31:21 - 31:25]
it's going to look kind of like a mail

[31:23 - 31:26]
merged email if you've ever done or seen

[31:25 - 31:29]
sort of marketing emails where you do

[31:26 - 31:32]
personalizations basically personalizing

[31:29 - 31:33]
a static prompt with Dynamic data from

[31:32 - 31:35]
the task that actually needs to be done

[31:33 - 31:38]
let's take a really quick look at that

[31:35 - 31:39]
with a basic web hook based example so

[31:38 - 31:42]
let's say in this example I have an AI

[31:39 - 31:44]
agent that is doing something with user

[31:42 - 31:45]
accounts maybe I have accounts in my

[31:44 - 31:47]
system and I want it to check in on the

[31:45 - 31:48]
health of the account maybe that

[31:47 - 31:51]
requires like using multiple tools

[31:48 - 31:52]
getting multiple analyses and then sort

[31:51 - 31:54]
of digesting that and giving a verdict

[31:52 - 31:55]
on something right so that's something

[31:54 - 31:57]
that's rather fuzzy that's something AI

[31:55 - 31:59]
agents are good at so let's say we sent

[31:57 - 32:01]
it this account username uh I'm using

[31:59 - 32:02]
pin data right now but let's say this

[32:01 - 32:05]
was being sent in every time I'm running

[32:02 - 32:07]
the web hook we will then pipe that into

[32:05 - 32:10]
the AI agent open it up and with a

[32:07 - 32:11]
source for prompt set to Define below we

[32:10 - 32:15]
would make the static portion of the

[32:11 - 32:19]
request so for example the form an

[32:15 - 32:21]
analysis on the following

[32:19 - 32:25]
username and then we drag the username

[32:21 - 32:27]
and pop it in now this is a really

[32:25 - 32:29]
simple task right it might be a bit more

[32:27 - 32:31]
Vose or if you've defined discretely

[32:29 - 32:33]
what analysis means in your system

[32:31 - 32:35]
message and whatnot again this could be

[32:33 - 32:36]
rather simple that's the basic premise

[32:35 - 32:39]
of it obviously what happens in here

[32:36 - 32:42]
depends on the task specifically and you

[32:39 - 32:43]
can merge multiple bits of data that

[32:42 - 32:44]
could be coming from that trigger or

[32:43 - 32:46]
could be coming from multiple

[32:44 - 32:49]
intermediary steps before fetching from

[32:46 - 32:51]
a CRM and your sales CRM and support

[32:49 - 32:54]
getting all this data about the user and

[32:51 - 32:57]
then piping that in as context if you

[32:54 - 32:58]
have context from the user especially in

[32:57 - 33:01]
a programmatic case that doesn't make

[32:58 - 33:03]
sense for the actual task itself you can

[33:01 - 33:06]
use the same concept of an expression

[33:03 - 33:08]
and piping that into the uh instructions

[33:06 - 33:09]
as well so if you're making a personal

[33:08 - 33:11]
assistant you know here we have

[33:09 - 33:14]
additional context about the beauty

[33:11 - 33:15]
salon that's static but if you had a

[33:14 - 33:17]
personal assistant here you might have

[33:15 - 33:19]
things like the person's name is Max to

[33:17 - 33:22]
catch they're

[33:19 - 33:24]
30 etc etc right yep that's the input

[33:22 - 33:26]
layer again nothing too fancy but just

[33:24 - 33:28]
for completeness all right let's move on

[33:26 - 33:30]
to the action layer

[33:28 - 33:33]
[Music]

[33:30 - 33:35]
the action layer is where we Define the

[33:33 - 33:37]
tools that the a agent can use such that

[33:35 - 33:38]
it can understand how to use them

[33:37 - 33:40]
properly so tools are super useful

[33:38 - 33:41]
because they let it interact with the

[33:40 - 33:43]
digital and potentially even physical

[33:41 - 33:45]
world so we want to make sure that it

[33:43 - 33:47]
knows how to leverage those correctly

[33:45 - 33:48]
especially cuz tools are more and more

[33:47 - 33:50]
are going to start having destructive

[33:48 - 33:51]
actions they might be a tool for

[33:50 - 33:53]
deleting an email so you want to make

[33:51 - 33:55]
sure it's doing that exactly how you

[33:53 - 33:57]
expected to and not for example deleting

[33:55 - 33:58]
your whole inbox let's take a look so

[33:57 - 34:01]
I've already added a basic check

[33:58 - 34:03]
calendar availability tool since this

[34:01 - 34:04]
tutorial doesn't focus on building tools

[34:03 - 34:06]
themselves I'm just going to focus on

[34:04 - 34:08]
the prompting inside the tool itself so

[34:06 - 34:10]
let's open it up and the first most

[34:08 - 34:12]
important thing with prompting for tools

[34:10 - 34:15]
is giving them a consistent name so here

[34:12 - 34:17]
in the name of the node I can see I've

[34:15 - 34:19]
called it check calendar availability

[34:17 - 34:21]
I'm not using spaces you don't have to

[34:19 - 34:24]
use this sort of underscore format you

[34:21 - 34:25]
could use camel case or Kebab case the

[34:24 - 34:27]
most important advice I could give you

[34:25 - 34:30]
here is just don't use spaces because

[34:27 - 34:33]
this is far more specific and its

[34:30 - 34:35]
incidence in the training data right is

[34:33 - 34:37]
is far less likely because it's almost

[34:35 - 34:39]
like a very very proper noun because

[34:37 - 34:41]
it's very specific so just use whatever

[34:39 - 34:42]
format you're you're familiar with there

[34:41 - 34:44]
and if you're not again it could be

[34:42 - 34:45]
dashes underscores you could be

[34:44 - 34:47]
capitalizing each first letter that

[34:45 - 34:49]
doesn't matter just remember whatever

[34:47 - 34:51]
name you pick here use that exact name

[34:49 - 34:53]
when you're referencing the tool so what

[34:51 - 34:54]
I mean by that is again in the system

[34:53 - 34:57]
message or anywhere else where you

[34:54 - 34:59]
defining prompts make sure that you're

[34:57 - 35:01]
referencing that tool precisely like you

[34:59 - 35:03]
wrote it in the tool name okay back in

[35:01 - 35:04]
the tool the next thing that happens

[35:03 - 35:05]
when you're defining a tool is there's

[35:04 - 35:07]
usually various parameters that you want

[35:05 - 35:09]
it to control that's the case in the

[35:07 - 35:10]
check calendar availability tool in fact

[35:09 - 35:12]
in this tool we have to define the after

[35:10 - 35:14]
and before time so it's a date time and

[35:12 - 35:16]
a date time that defines a window with

[35:14 - 35:18]
which we want to fetch events within

[35:16 - 35:20]
that window so we're using the from AI

[35:18 - 35:23]
method that I went over in the last

[35:20 - 35:25]
video and here the name is events after

[35:23 - 35:27]
so often my guidance is use the exact

[35:25 - 35:28]
same name here but if that doesn't feel

[35:27 - 35:31]
descriptive enough add to that so I did

[35:28 - 35:32]
it's events after and events before and

[35:31 - 35:35]
then I did choose to have a description

[35:32 - 35:38]
here and I basically said rever returns

[35:35 - 35:40]
events after this time use this format

[35:38 - 35:43]
and so by doing the use this format I

[35:40 - 35:45]
did not have to include a type Etc

[35:43 - 35:46]
because some of the formats that you

[35:45 - 35:48]
have this is in a string format

[35:46 - 35:50]
potentially so you can't Define that by

[35:48 - 35:53]
a type so you show it as an example in

[35:50 - 35:55]
the description now uh a little learning

[35:53 - 35:56]
when you're working in Ann is you're

[35:55 - 35:58]
going to come up to this case often

[35:56 - 35:59]
let's say this is this is this is how

[35:58 - 36:01]
this parameter looks by default I might

[35:59 - 36:03]
not know when what format I need to

[36:01 - 36:05]
specify it if you ever have a situation

[36:03 - 36:08]
like that in NN in the fixed mode pick a

[36:05 - 36:10]
value then go to expression and it'll

[36:08 - 36:11]
convert that value to the plain text

[36:10 - 36:14]
form it expected in then you can just

[36:11 - 36:16]
copy that and use that in here uh in

[36:14 - 36:20]
your format all right let's reset this

[36:16 - 36:23]
and continue so the last step basically

[36:20 - 36:24]
in defining your tool is the description

[36:23 - 36:27]
of the tool the description can be

[36:24 - 36:29]
simple like use this tool to da da da

[36:27 - 36:31]
and it can also include some of the

[36:29 - 36:32]
instructions and those sorts of things

[36:31 - 36:35]
that we were seeing in the system

[36:32 - 36:36]
message but scoped for the tool itself

[36:35 - 36:38]
you going to see a lot of people putting

[36:36 - 36:39]
that kind of stuff right in the system

[36:38 - 36:41]
message right in the system layer and

[36:39 - 36:43]
just shipping it that's fine and that's

[36:41 - 36:44]
also fine if you're creating a little AI

[36:43 - 36:47]
agent just for yourself but when you

[36:44 - 36:48]
think of teams or you think of iteration

[36:47 - 36:50]
and and doing things well there's a

[36:48 - 36:52]
concept of separation of concerns now

[36:50 - 36:54]
again if you're have an engineering

[36:52 - 36:56]
background you're well aware of this but

[36:54 - 36:58]
the the tldr is if the prompting relates

[36:56 - 37:00]
to defining the tool keep that in the

[36:58 - 37:02]
tool because then you can copy and paste

[37:00 - 37:03]
that tool you could swap that tool maybe

[37:02 - 37:05]
tomorrow we're not going to use Google

[37:03 - 37:07]
Calendar right maybe management says hey

[37:05 - 37:09]
we're switching to Outlook oh no I think

[37:07 - 37:11]
that's their email app actually I'm very

[37:09 - 37:13]
not familiar with Microsoft's ecosystem

[37:11 - 37:15]
and so you want to separate the concerns

[37:13 - 37:17]
so this is an app tool it does have a

[37:15 - 37:20]
tool description by default in this case

[37:17 - 37:21]
since our tool has to go get the actual

[37:20 - 37:24]
events that exist for that period and

[37:21 - 37:25]
then determine the space in between

[37:24 - 37:26]
we're going to need to have a bit more

[37:25 - 37:28]
description so you're probably not going

[37:26 - 37:30]
to need to do the step if it's just like

[37:28 - 37:32]
a create lead action because n 's going

[37:30 - 37:34]
to preset a description for it and for

[37:32 - 37:35]
something like create lead if you added

[37:34 - 37:36]
an action it's to create a lead that

[37:35 - 37:37]
that that's enough information for that

[37:36 - 37:40]
so we're going to change this to set

[37:37 - 37:42]
manually now here there is a placeholder

[37:40 - 37:45]
this placeholder is not what's sent

[37:42 - 37:48]
along with sent automatically it would

[37:45 - 37:50]
in fact pass along the the resource and

[37:48 - 37:52]
the operation that's happening as well

[37:50 - 37:54]
but in this case let's set a description

[37:52 - 37:56]
that allows it to actually get

[37:54 - 37:58]
availability and describe what that is

[37:56 - 38:00]
because it's a multi-step process the

[37:58 - 38:02]
first thing we want to do is tell the AI

[38:00 - 38:05]
agent when it should use this tool use

[38:02 - 38:07]
this check calendar availability tool

[38:05 - 38:09]
using the same name as in here to fetch

[38:07 - 38:11]
existing appointments for a specified

[38:09 - 38:12]
period and determine when there are

[38:11 - 38:14]
available time slots that can

[38:12 - 38:16]
accommodate a new appointment again most

[38:14 - 38:20]
high level and I almost always have this

[38:16 - 38:22]
format use this da da da tool to da da

[38:20 - 38:24]
da da da right just like if you were

[38:22 - 38:25]
talking to a human about this and since

[38:24 - 38:27]
this tool every time you use it there

[38:25 - 38:29]
basically it's going to return some data

[38:27 - 38:30]
and a few specific steps it has to think

[38:29 - 38:32]
through to get the thing that it

[38:30 - 38:34]
actually needs this is a great case

[38:32 - 38:36]
where you can have instructions just for

[38:34 - 38:38]
when it uses this tool so once again

[38:36 - 38:40]
we'll add a section okay for the first

[38:38 - 38:42]
point it needs to specify the date and

[38:40 - 38:44]
range to fetch events are a specified

[38:42 - 38:47]
set this this and this and this and this

[38:44 - 38:49]
right we might not need this step but

[38:47 - 38:50]
I'm showing that I know I need that to

[38:49 - 38:53]
happen every time so I would like to

[38:50 - 38:54]
Define that for my AI agent I don't want

[38:53 - 38:57]
variability on this because I don't

[38:54 - 38:58]
think my use case needs it okay next

[38:57 - 39:00]
step retrieve existing appointments the

[38:58 - 39:02]
tool will return all booked appointments

[39:00 - 39:05]
within the specified date time and range

[39:02 - 39:06]
three calculate available slots once you

[39:05 - 39:08]
have the existing appointments calculate

[39:06 - 39:10]
the gaps between them to find potential

[39:08 - 39:12]
availability ensure each Gap is at least

[39:10 - 39:14]
as long as the required appointment

[39:12 - 39:15]
length do not allow any overlap with

[39:14 - 39:19]
existing appointments it's nice and

[39:15 - 39:21]
clear now here's a life hack my original

[39:19 - 39:24]
bullet points here or steps were a

[39:21 - 39:26]
little bit crappy I used chat GPT to

[39:24 - 39:27]
make them better The Prompt that I used

[39:26 - 39:29]
was very simple was basically you are an

[39:27 - 39:32]
AI prompt writing expert improve these

[39:29 - 39:34]
prompt Snippets for Tool snippet not the

[39:32 - 39:35]
entire prompt if you're giving it a part

[39:34 - 39:36]
of a prompt and it thinks it's a whole

[39:35 - 39:39]
wi prompt is going to give you a whole

[39:36 - 39:41]
lot and then I extracted the things that

[39:39 - 39:44]
were clear to me if I had to do the task

[39:41 - 39:46]
and took those so that's my PSA to you

[39:44 - 39:48]
you can use gpts there's various prompt

[39:46 - 39:49]
helping tools that lots of people online

[39:48 - 39:51]
are talking about so I'm not going to

[39:49 - 39:53]
spend too much time on talking about

[39:51 - 39:55]
that but learn these Basics learn these

[39:53 - 39:56]
skills so you can audit the work of your

[39:55 - 39:59]
AIS otherwise you'll have no idea if

[39:56 - 40:01]
they're giving you BS or actually useful

[39:59 - 40:03]
prompting okay so I've got these steps

[40:01 - 40:05]
now one thing we can do here is after

[40:03 - 40:06]
you have some instructions like this

[40:05 - 40:08]
reaffirm by following these steps you

[40:06 - 40:10]
can accurately find valid appointment

[40:08 - 40:12]
Windows based on the ready booked events

[40:10 - 40:13]
this is not a really a scientific thing

[40:12 - 40:15]
but I've been hearing from some folks

[40:13 - 40:17]
that basically after you have a step of

[40:15 - 40:19]
instructions some syntax or some words

[40:17 - 40:22]
to this effect can improve results

[40:19 - 40:24]
basically all right that's well defined

[40:22 - 40:25]
let's check calendar availability I'm

[40:24 - 40:26]
not going to build the other tool

[40:25 - 40:28]
because it's going to be the exact same

[40:26 - 40:30]
principle and this is not a tutorial

[40:28 - 40:33]
about tool building but let's show this

[40:30 - 40:33]
working

[40:38 - 40:45]
so okay that is correct and if we look

[40:43 - 40:48]
here we call the model

[40:45 - 40:51]
first and then it used the availability

[40:48 - 40:54]
tool it correctly set events before and

[40:51 - 40:57]
after returned back the events that we

[40:54 - 40:59]
have it did some thinking and then it

[40:57 - 41:03]
out puted the time

[40:59 - 41:05]
slots action layer

[41:03 - 41:07]
check if you're watching this you just

[41:05 - 41:08]
got through the three layers of AI

[41:07 - 41:11]
prompting all skipped through a bunch of

[41:08 - 41:13]
it so congrats to the first half and the

[41:11 - 41:15]
second half go back and watch it no

[41:13 - 41:16]
seriously this was uh probably the most

[41:15 - 41:20]
in-depth video I've done today and it's

[41:16 - 41:23]
a lot harder to have nice continuity and

[41:20 - 41:25]
Clarity across a 40 plus minute tutorial

[41:23 - 41:27]
so thank you very much for supporting me

[41:25 - 41:28]
as I figure this out and please please

[41:27 - 41:30]
to let me know what you think about

[41:28 - 41:31]
structuring it into these three layers

[41:30 - 41:33]
that's a concept I came up with I

[41:31 - 41:34]
basically did a bunch of research took

[41:33 - 41:36]
my own experience took some of the

[41:34 - 41:38]
experience of some folks that know a lot

[41:36 - 41:40]
about this and try to put it into

[41:38 - 41:42]
something that digestible right you see

[41:40 - 41:43]
these videos telling you the ultimate

[41:42 - 41:46]
tutorial everything you need to know

[41:43 - 41:48]
about prompt engineering like 45 minutes

[41:46 - 41:50]
it's not possible to fit everything that

[41:48 - 41:52]
people know about prompt Engineering in

[41:50 - 41:54]
45 minutes these are like professions

[41:52 - 41:56]
and if you're good at it professions

[41:54 - 41:59]
that pay you a shitload of cash so

[41:56 - 42:01]
clearly you can't teach someone a 350k

[41:59 - 42:03]
job in 30 minutes but I hope the

[42:01 - 42:06]
concepts I've taught you here Empower

[42:03 - 42:08]
you to build more with AI to roll your

[42:06 - 42:10]
sleeves up and to build something that

[42:08 - 42:12]
you can own and that you can improve

[42:10 - 42:15]
over time and so that you feel that

[42:12 - 42:17]
magical wow feeling when you see AI

[42:15 - 42:19]
automate some drudgery or do something

[42:17 - 42:21]
that you've been doing manually and

[42:19 - 42:23]
gives you time for the human things in

[42:21 - 42:26]
your life this tutorial series is part

[42:23 - 42:29]
of my work at the studio at nadn where

[42:26 - 42:32]
we build Ai and automation use cases and

[42:29 - 42:34]
also share those with our Global NN

[42:32 - 42:37]
community so I'll catch you on the next

[42:34 - 42:57]
one and happy flamming

[42:37 - 42:57]
[Music]

[42:57 - 43:01]
a

[42:58 - 43:01]
[Music]

## コメント

### 1. @Study-David (👍 0)
Part 4 till 200 please, it is sooo good how you explain it all. Thanks for that.

### 2. @petrkadlec6060 (👍 30)
I just binge-watched all 3 parts in your "yet-to-become-a-huge" series and it's hands-down one of the best structures of the video covering a theory and practice on any topic I've seen. 3-level prompting for AI Agents is awesome, I'm building a multi-step automation for a client running a bunch of dental clinics, so very useful to get some inspiration. Thank you. As for next topics - multi level workflows - storing things in the database, retrieving, db memory for the agent, using output in multiple steps of the workflow.... I do have basics, but I feel I can learn a bit here and there anyway. Thank you and keep up with the great work!

### 3. @davidtalturejman9185 (👍 3)
This is the best video I have seen yet about prompt engineering! Thank you. May God bless you!

### 4. @amerrashed6287 (👍 18)
the most important lesson for all n8n tutorials on YT. it should be pinned forever in n8n page :). thanks Max.

> **@theflowgrammer** (👍 2): Thank you very much for the lovely feedback, put a smile on my face :)

> **@pieter-jandeboeck5928** (👍 2): And it IS! that's how i found this series! through the n8n documentation

### 5. @jorgecantero7101 (👍 5)
Hey Max, thank you so much for the videos you create. They are super illustrative with the use cases for agents. It's great how you separate the system layer, the user message layer, and the action layer. This works fabulously well for agents with reduced tasks, but when we are building a multi-agent structure where there's an orchestrator agent managing area director agents, who in turn manage sub-area managers, and they, in turn, oversee micro-agents performing tasks—creating a team of over a hundred agents arranged in a pyramid—I have many questions about the best way to approach tasks like this regarding the inputs and outputs of the different agents, which become tools for higher-level orchestrator agents. If you could explain or make a video about this, it would be fantastic.

### 6. @requesttruth505 (👍 3)
You do a really good job of teaching this material. I find it easy to implement and understand. Thanks.

### 7. @stefanminnaar2003 (👍 2)
Just finished this series - great stuff Max! cool vibe too :)

### 8. @JuanIFrancisco-z3c (👍 1)
Thank you for your detailed explanation along these three videos. You always reinforce the concept of being tidy and respect the place each thing belongs to .. that's an added value for sure! Cheers.

### 9. @aftabdx (👍 2)
Thank you, Max. Love the way you structure your prompt. Look forward to your next series!

### 10. @EricMooney (👍 2)
Awesome instructional video, thank you so much. I'm experiencing that Rules section now and my first attempt, I entered all my rules at the beginning and the tools were not being called and wasn't getting the desired output. So I did the opposite on my second attempt and started with just the connections to the tools and the date of today. Then one by one, I started writing in the Rules of the workflow and I felt like I had much more control doing it that way. Thanks again and keep the videos coming!

### 11. @BertKim-m7v (👍 3)
Great video for teaching to create workflow on n8n. Thanks from China.

### 12. @DresElMagnifico (👍 2)
Great work, Max! Just stumble on your tutorial series, and they are exceptional. 👏👏

### 13. @KapitanOppa (👍 2)
Awesome. Would love to see a tutorial how to pus and  pull data from database, create a json structure and use it to other nodes

### 14. @AlfredNutile (👍 3)
Thanks I was really stuck at the calendar tool and not sure how to limit the date range!

### 15. @sebastiancamacho8275 (👍 1)
This is great! Great explanation. I'm not an expert on ai agents so I don't know if the 3 steps are THE WAY to create them, but it served very well to understand the parts of it! When I was testing I was hoping for creating events but then I realized this bot just searches for events and available time 🤣 so I'll try to create this step myself.

### 16. @JeanCharlesChabot (👍 2)
I was looking for N8N tutorial videos and I saw his friendly face at the beginning, telling myself he looked like a good guy with a good heart, who likes to give and help. And then I thought of looking first at the comment before watching the videos. 

My God, I can't wait to watch the series, I rarely see such unanymous high praising of someone's videos. 
So congrats Max in advance, and I can't wait to start watching ! 😇

### 17. @AustinTerry-h8u (👍 1)
You're a beast bro, just went from part 1 to 3 and took copious notes the past few hours. Thank you for teaching us how to properly utilize this revolutionary tech!

> **@theflowgrammer** (👍 0): Legend! So glad to hear you found it useful to the extent where you're taking notes. I'm curious, what would you want covered in a pt 4?

> **@hunkargulumser4566** (👍 1): @@theflowgrammer Hello Max. Can you improve the workflow in the 3rd video? Actually, there are some things that I and many of your followers would like to learn. For example: can we provide data for the workflow in this video with a pdf file that includes some information about the beauty salon, photos and price information of some products (this information may vary)? can we provide the answers that our model will give to benefit from this pdf file? and then can we package this workflow and publish it on a web address? These questions are on everyone's mind and we cannot find a complete explanatory data. We are waiting for your help on this issue.

### 18. @youtubeccia9276 (👍 11)
Max for AI President <3

### 19. @ThomasMock-c5n (👍 2)
Great video! Looking forward to the next in the series!

### 20. @joeymuller4842 (👍 0)
Pure gold. Now I gotta go back and watch parts 1 and 2.

> **@theflowgrammer** (👍 0): Let me know what questions you still have about building AI Agents after watching parts 1-3. Trying to figure out what folks want to see for Pt 4.

