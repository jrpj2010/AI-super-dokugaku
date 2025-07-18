# Building AI Agents In 44 Minutes

**チャンネル:** Tina Huang
**公開日:** 2025-04-21
**URL:** https://www.youtube.com/watch?v=_Udb5NC6vTI

## 説明

Leverage AI agents with the FREE Master AI Agents Playbook: https://clickhubspot.com/7002aa

Want to get ahead in your career using AI? Join the waitlist for my AI Agent Bootcamp: https://www.lonelyoctopus.com/ai-agent-bootcamp

🤝 Business Inquiries: https://tally.so/r/mRDV99

🖱️Links mentioned in video
========================
OpenAI components: https://platform.openai.com/docs/guides/agents
Anthropic's building AI agents article: https://www.anthropic.com/engineering/building-effective-agents
financial agent: https://github.com/hellotinah/financial_agent
Y Combinator YT channel: https://www.youtube.com/@ycombinator

🔗Affiliates
========================
My SQL for data science interviews course (10 full interviews):
https://365datascience.com/learn-sql-for-data-science-interviews/ 

365 Data Science: 
https://365datascience.pxf.io/WD0za3 (link for 57% discount for their complete data science training)

Check out StrataScratch for data science interview prep: 
https://stratascratch.com/?via=tina

🎥 My filming setup 
========================
📷 camera: https://amzn.to/3LHbi7N
🎤 mic: https://amzn.to/3LqoFJb
🔭 tripod: https://amzn.to/3DkjGHe
💡 lights: https://amzn.to/3LmOhqk

⏰Timestamps
========================
00:00 — Intro
00:41 — Video structure
01:36 — AI agent definition & use cases
04:23 — AI agent components
13:28 — Quiz 1
14:25 — AI agent workflows & implementation 
23:17 — Prompt engineering for AI agents
26:58 — Quiz 2
27:21 — Demo 1: Customer Support AI Agent using n8n
29:19 — Demo 2: News Aggregator AI Agent using n8n
31:06 — Demo 3: Daily Expenses Tracker AI Agent using n8n
32:54 — Demo 4: Financial Research AI Agent using OpenAI Agents SDK
38:10 — AI agents bootcamp
38:33 — How to decide what AI agent to build

📲Socials 
========================
instagram: https://www.instagram.com/hellotinah/
linkedin: https://www.linkedin.com/in/tinaw-h/ 
discord: https://discord.gg/5mMAtprshX

🎥Other videos you might be interested in
========================
How I consistently study with a full time job:
https://www.youtube.com/watch?v=INymz5VwLmk

How I would learn to code (if I could start over): 
https://www.youtube.com/watch?v=MHPGeQD8TvI&t=84s

🐈‍⬛🐈‍⬛About me 
========================
Hi, my name is Tina and I'm an ex-Meta data scientist turned internet person! 

📧Contact
========================
youtube: youtube comments are by far the best way to get a response from me! 
linkedin: https://www.linkedin.com/in/tinaw-h/ 
email for business inquiries only: hellotinah@gmail.com 

========================
Some links are affiliate links and I may receive a small portion of sales price at no cost to you. I really appreciate your support in helping improve this channel! :)

## 字幕

[00:00 - 00:04]
I learned how to build AI agents for

[00:02 - 00:06]
you. I have spent hundreds of hours

[00:04 - 00:08]
building AI agents and I actually run a

[00:06 - 00:09]
program called Lonely Octopus where we

[00:08 - 00:11]
teach people AI skills and give them the

[00:09 - 00:13]
opportunity to build AI agents for

[00:11 - 00:14]
companies as well. So, in this video

[00:13 - 00:16]
I'm going to attempt to distill down

[00:14 - 00:18]
everything that I've learned to give you

[00:16 - 00:20]
that comprehensive guide with frameworks

[00:18 - 00:22]
and a variety of different tools to

[00:20 - 00:24]
build any type of agent you want.

[00:22 - 00:25]
Whether you're someone who doesn't know

[00:24 - 00:26]
how to code and wants to stick with no

[00:25 - 00:28]
code tools, or if you're a seasoned

[00:26 - 00:30]
software engineer looking to build your

[00:28 - 00:32]
next AI startup, I'll also be walking

[00:30 - 00:33]
through real examples of AI agents built

[00:32 - 00:34]
using different tools. As per usual

[00:33 - 00:36]
there'll be little assessments

[00:34 - 00:38]
throughout this video to help you retain

[00:36 - 00:40]
the information as we go through things.

[00:38 - 00:41]
Now, without further ado, let's get

[00:40 - 00:43]
started. A portion of this video is

[00:41 - 00:44]
sponsored by HubSpot. Here's the exact

[00:43 - 00:46]
structure of the video. First, I'm going

[00:44 - 00:48]
to introduce the crucial components that

[00:46 - 00:50]
make up an AI agent. Talk about what

[00:48 - 00:52]
they are, some of the tools for each

[00:50 - 00:54]
category, and how to choose which tool

[00:52 - 00:55]
you want to be using for each category.

[00:54 - 00:56]
Next, we're going to go into the

[00:55 - 00:58]
nitty-gritty and talk about some of the

[00:56 - 01:00]
common agentic workflows that people are

[00:58 - 01:02]
using today. I'll also be including a

[01:00 - 01:04]
crash course on prompt engineering for

[01:02 - 01:05]
agents specifically because the prompt

[01:04 - 01:07]
is literally the thing that's going to

[01:05 - 01:09]
make or break your agent. I'll then walk

[01:07 - 01:11]
you through full examples of AI agents

[01:09 - 01:13]
implemented using both no code tools as

[01:11 - 01:15]
well as full code. But what is the use

[01:13 - 01:17]
of building these AI agents if they

[01:15 - 01:18]
don't actually serve a purpose? That's

[01:17 - 01:20]
why I'll also be covering how to figure

[01:18 - 01:22]
out what kinds of AI agents, what kind

[01:20 - 01:24]
of AI startups or businesses that you

[01:22 - 01:26]
should be building as well as tech

[01:24 - 01:28]
enabled specific suggestions for what to

[01:26 - 01:30]
build. The progress made in voice

[01:28 - 01:33]
video, and image agents has enabled so

[01:30 - 01:36]
many cool use cases. Agents are coming.

[01:33 - 01:38]
Agents, hi you fellas.

[01:36 - 01:41]
Let's first define what is an AI agent.

[01:38 - 01:43]
An AI agent is a system that perceives

[01:41 - 01:45]
its environment, processes information

[01:43 - 01:47]
and autonomously takes actions to

[01:45 - 01:50]
achieve specific goals. Now, from a more

[01:47 - 01:52]
human perspective, often times we tend

[01:50 - 01:54]
to think about AI agents as an AI

[01:52 - 01:56]
counterpart to a human role or a task

[01:54 - 01:58]
that a human performs. That's why you

[01:56 - 02:01]
often hear about AI agents in the

[01:58 - 02:03]
context of a coding AI agent like cursor

[02:01 - 02:05]
or windsurf which are AI powered code

[02:03 - 02:08]
editors that have a agent mode that can

[02:05 - 02:11]
autonomously perform coding tasks either

[02:08 - 02:13]
with claude sonnet 3.7 or Gemini 2.5

[02:11 - 02:16]
pro. Another very common AI agent use

[02:13 - 02:17]
case are customer service chat bots.

[02:16 - 02:19]
Many companies are now experimenting

[02:17 - 02:21]
with customer service agents that are

[02:19 - 02:23]
able to do things like handle inquiries

[02:21 - 02:24]
communicate with the customer, file a

[02:23 - 02:26]
complaint for them or to resolve

[02:24 - 02:28]
specific issues. Now, this is the

[02:26 - 02:29]
definition and the experience of an AI

[02:28 - 02:31]
agent. But when it comes to

[02:29 - 02:32]
implementation, there's actually a lot

[02:31 - 02:34]
of different ways to implement these

[02:32 - 02:35]
agents, and there's a lot of nuance to

[02:34 - 02:37]
it. I'll give you a little preview about

[02:35 - 02:38]
what I mean by this. Now, I'll be going

[02:37 - 02:40]
into a lot more detail about this when

[02:38 - 02:42]
I'm going to be covering the exact

[02:40 - 02:43]
implementation of different agents. But

[02:42 - 02:45]
for now, I just want you to note that

[02:43 - 02:47]
when we say like AI agent, we're not

[02:45 - 02:49]
just talking about, you know, an AI just

[02:47 - 02:51]
sitting there doing its AI agent things

[02:49 - 02:53]
by itself. It's oftentimes a bunch of

[02:51 - 02:55]
sub aents that do specific things and

[02:53 - 02:58]
ultimately come together in multi- aent

[02:55 - 03:00]
systems to form what we perceive as the

[02:58 - 03:02]
actual like complete agent. For example

[03:00 - 03:04]
a classic implementation of a customer

[03:02 - 03:06]
service agent is oftentimes split into

[03:04 - 03:08]
first a sub aent that handles the

[03:06 - 03:10]
customer queries like interacts with the

[03:08 - 03:13]
customer, figures out what an issue is

[03:10 - 03:15]
and then tags it to be passed along to a

[03:13 - 03:17]
more specialized sub aent like for

[03:15 - 03:19]
example my recent phone billing payment

[03:17 - 03:22]
issue. This would be tagged as a billing

[03:19 - 03:23]
and payments issue and passed along to

[03:22 - 03:25]
another sub agent that will be

[03:23 - 03:26]
specialized in dealing with billing and

[03:25 - 03:29]
payments. There would also be other sub

[03:26 - 03:31]
aents specialized in IT and sales and

[03:29 - 03:33]
other things that customer service in

[03:31 - 03:34]
phone companies do. By the way, this

[03:33 - 03:36]
type of agentic workflow is called

[03:34 - 03:38]
routing and it's proven to be very very

[03:36 - 03:40]
effective at this type of problem.

[03:38 - 03:42]
Anyways, we'll go into more detail about

[03:40 - 03:43]
routing and other types of agentic

[03:42 - 03:45]
workflows in a bit. But yes, I hope this

[03:43 - 03:48]
gives you a little bit of understanding

[03:45 - 03:50]
about how agents actually work under the

[03:48 - 03:51]
hood, which is very important to know as

[03:50 - 03:52]
we build them. Also, just to answer this

[03:51 - 03:55]
question, which you might be thinking

[03:52 - 03:56]
of, why is it that we have to have these

[03:55 - 03:58]
multi- aent systems, these different

[03:56 - 03:59]
types of implementations? And the reason

[03:58 - 04:01]
for this is actually quite intuitive. If

[03:59 - 04:03]
you think about agents the same way that

[04:01 - 04:04]
you think about humans in a company

[04:03 - 04:06]
humans have different roles. You don't

[04:04 - 04:08]
have just one human that is trying to do

[04:06 - 04:10]
everything at the same time. that human

[04:08 - 04:11]
will get very confused and not be able

[04:10 - 04:13]
to prioritize what they're supposed to

[04:11 - 04:15]
do and not be very good at any specific

[04:13 - 04:16]
thing. And it's the same for agents.

[04:15 - 04:17]
When we have different agents that are

[04:16 - 04:19]
specializ in different things, the

[04:17 - 04:21]
results of it all coming together is

[04:19 - 04:23]
going to be far better than just having

[04:21 - 04:24]
a single AI agent try to do everything.

[04:23 - 04:26]
All right, so now I want to take a step

[04:24 - 04:29]
back and give you a framework for

[04:26 - 04:30]
understanding the components of AI

[04:29 - 04:32]
agents. Sort of like say if you're

[04:30 - 04:34]
making a burger, a burger is made out of

[04:32 - 04:36]
different components. There's a bun, a

[04:34 - 04:38]
patty, vegetables, and condiments. You

[04:36 - 04:40]
could switch out the type of bun, the

[04:38 - 04:42]
type of vegetables, the type of patty

[04:40 - 04:44]
and the type of condiments. But you do

[04:42 - 04:46]
need to have all these components for

[04:44 - 04:48]
your burger to function as a burger as

[04:46 - 04:50]
opposed to a weird sandwich or a hot

[04:48 - 04:51]
dog. Same thing for agents. There are

[04:50 - 04:52]
different components and you can switch

[04:51 - 04:54]
out the different components for

[04:52 - 04:55]
different things, but ultimately you

[04:54 - 04:57]
need to have these components for it to

[04:55 - 04:59]
be an agent. Now, unlike the components

[04:57 - 05:01]
of a burger that have been long

[04:59 - 05:04]
established, the components that make up

[05:01 - 05:05]
an AI agent is still relatively new. So

[05:04 - 05:07]
people kind of have like varying

[05:05 - 05:10]
different definitions, but the most

[05:07 - 05:11]
comprehensive and well- definfined one

[05:10 - 05:13]
comes from OpenAI. As they explain

[05:11 - 05:15]
building agents involves assembling

[05:13 - 05:17]
components across several domains such

[05:15 - 05:19]
as models, tools, knowledge and memory

[05:17 - 05:21]
audio and speech, guardrails, and

[05:19 - 05:23]
orchestration. And OpenAI provides

[05:21 - 05:24]
composible primitives for each. Yeah

[05:23 - 05:26]
you know, obviously OpenAI is going to

[05:24 - 05:27]
list its own things there first, but for

[05:26 - 05:28]
each of these components, there are

[05:27 - 05:30]
actually a lot of other tools that are

[05:28 - 05:31]
available out there as well. Depending

[05:30 - 05:33]
on the type of agent that you want to

[05:31 - 05:35]
build, some are better than others. And

[05:33 - 05:36]
I will go into more detail about each of

[05:35 - 05:38]
these components. But first, I just want

[05:36 - 05:39]
to make a note that if you ever feel

[05:38 - 05:41]
super overwhelmed because there's just

[05:39 - 05:43]
like a new tool or new technology that's

[05:41 - 05:44]
coming out like every single day, do not

[05:43 - 05:46]
panic. Don't feel overwhelmed. It's okay

[05:44 - 05:49]
because whatever this new like

[05:46 - 05:51]
innovation or tool thing is that is

[05:49 - 05:52]
revolutionizing AI agents, just realize

[05:51 - 05:54]
that it's still going to be part of this

[05:52 - 05:56]
framework. It's like a new type of

[05:54 - 05:57]
condiment in the condiments category

[05:56 - 06:00]
that just happens to be a little bit

[05:57 - 06:02]
more spicy or something. I hope that

[06:00 - 06:03]
makes sense. I hope you get what I mean

[06:02 - 06:05]
by that. Anyways, let's now actually

[06:03 - 06:07]
move on to each of these different

[06:05 - 06:09]
components. OpenAI has this handy dandy

[06:07 - 06:11]
little table. So, first you have the

[06:09 - 06:13]
models component. These are your AI

[06:11 - 06:15]
models, your large language models that

[06:13 - 06:16]
are the core intelligence capable of

[06:15 - 06:18]
reasoning, making decisions and

[06:16 - 06:20]
processing different modalities. Of

[06:18 - 06:24]
course, the examples that Open Eye gives

[06:20 - 06:26]
us are the 01, 03 mini, GPD 4.5, GPD 40

[06:24 - 06:27]
etc. Now, depending on the specific type

[06:26 - 06:29]
of agent that you're building, you want

[06:27 - 06:31]
to choose a different type of model

[06:29 - 06:33]
within the OpenAI ecosystem. GPD 40 is

[06:31 - 06:35]
your flagship model. It's a thinking

[06:33 - 06:37]
model that's really great at reasoning

[06:35 - 06:39]
multi-step problem solving, and complex

[06:37 - 06:40]
decision-m, great at answering most

[06:39 - 06:42]
questions. Now, if you want something

[06:40 - 06:43]
that is more intensive, the trade-off is

[06:42 - 06:46]
that it's going to be slower and more

[06:43 - 06:48]
expensive. You have GPT 4.5. It's good

[06:46 - 06:49]
for writing and exploring new ideas, you

[06:48 - 06:51]
also have 03 mini that has advanced

[06:49 - 06:53]
reasoning capabilities, but it's also

[06:51 - 06:55]
faster. And 03 Mini High that is

[06:53 - 06:57]
particularly good for coding and logic.

[06:55 - 06:59]
Outside of the OpenAI ecosystem, Claw

[06:57 - 07:01]
3.7 Sonnet is usually the go-to model

[06:59 - 07:03]
for people who do a lot of coding and

[07:01 - 07:05]
reasoning and STEM subject based stuff.

[07:03 - 07:08]
Although Gemini 2.5 Pro is challenging

[07:05 - 07:09]
this right now, but honestly like in a

[07:08 - 07:11]
month or whatever it is that you watch

[07:09 - 07:12]
this video, probably the rankings have

[07:11 - 07:14]
all shifted anyway. But overall

[07:12 - 07:16]
speaking, if you care the most about

[07:14 - 07:17]
things being cheap, then you probably

[07:16 - 07:19]
want to go with an open- source model

[07:17 - 07:20]
and host it yourself. And if you want to

[07:19 - 07:22]
go with things being fast, you want to

[07:20 - 07:24]
go for smaller models. And most Google

[07:22 - 07:27]
models, at least as of the time of this

[07:24 - 07:29]
filming, also has longer context windows

[07:27 - 07:31]
if you care a lot about maintaining a

[07:29 - 07:32]
high context window. Anyways, there are

[07:31 - 07:33]
a lot of websites out there that

[07:32 - 07:36]
actually rank these different model

[07:33 - 07:36]
performances like Vim for example. I

[07:36 - 07:38]
don't know if that's how you pronounce

[07:36 - 07:40]
it, Vellum. So depending on what your

[07:38 - 07:41]
use case is, you can actually just check

[07:40 - 07:43]
out the rankings and see which model

[07:41 - 07:45]
suits your needs the best. Next up is

[07:43 - 07:47]
the tools category. Now, do not

[07:45 - 07:49]
underestimate the importance of tools.

[07:47 - 07:51]
Your model is simply your base model.

[07:49 - 07:53]
But what really starts making models

[07:51 - 07:55]
powerful is adding on different

[07:53 - 07:57]
capabilities like the ability of using

[07:55 - 07:59]
tools. Tools allow agents to interface

[07:57 - 08:01]
with the world. Like being able to

[07:59 - 08:03]
search the web, for example, and all of

[08:01 - 08:05]
the different applications that you see

[08:03 - 08:07]
out there, these can potentially be

[08:05 - 08:09]
turned into tools for the AI. Like you

[08:07 - 08:10]
can give it access to Google products

[08:09 - 08:12]
like your Gmail, your calendar. You can

[08:10 - 08:14]
give it access to the things that are in

[08:12 - 08:16]
your hard drive. You can give it access

[08:14 - 08:18]
to what's happening on your screen. You

[08:16 - 08:20]
can give it access to your favorite apps

[08:18 - 08:22]
like Slack or Discord, YouTube

[08:20 - 08:24]
Salesforce, Zapier, whatever. You can

[08:22 - 08:26]
also build your own custom tools that

[08:24 - 08:28]
you can give to the AI agent as well. If

[08:26 - 08:30]
you use Open AI's agents SDK, uh you do

[08:28 - 08:31]
need to know how to code to be able to

[08:30 - 08:33]
use this. They give you the ability of

[08:31 - 08:35]
defining your own tools as well as some

[08:33 - 08:37]
built-in tools like web search, file

[08:35 - 08:39]
search, and computer use. You may have

[08:37 - 08:41]
also heard of something called MCP

[08:39 - 08:43]
which is kind of all the rage these days

[08:41 - 08:45]
that was built by Anthropic. It stands

[08:43 - 08:47]
for model context protocol and it's a

[08:45 - 08:49]
protocol that standardizes the way that

[08:47 - 08:51]
you can provide things like tools to

[08:49 - 08:52]
your large language model. This is quite

[08:51 - 08:54]
a leap forward because previously it's

[08:52 - 08:56]
quite difficult for developers to

[08:54 - 08:57]
provide their agents with different

[08:56 - 08:58]
tools because different softwares

[08:57 - 09:00]
configure their services in different

[08:58 - 09:01]
ways. So as a developer you kind of had

[09:00 - 09:03]
to like figure it out and piece it

[09:01 - 09:05]
together. But basically MCP has made it

[09:03 - 09:07]
a lot easier. Now do not worry if you're

[09:05 - 09:10]
not a cody person. There's also a lot of

[09:07 - 09:12]
no code or low code tools that have

[09:10 - 09:13]
inbuilt within them the ability for you

[09:12 - 09:15]
to provide tools to your models. Some of

[09:13 - 09:17]
the examples I'll show you later like

[09:15 - 09:19]
N8N for example, it allows you to very

[09:17 - 09:20]
easily drag and drop different tools and

[09:19 - 09:22]
connect them to your large language

[09:20 - 09:24]
models. For example, if you're trying to

[09:22 - 09:25]
build a market research agent, it would

[09:24 - 09:27]
need to have a tool to be able to search

[09:25 - 09:29]
the internet, a tool to be able to

[09:27 - 09:30]
analyze the data that it gathers. And

[09:29 - 09:32]
maybe if you wanted to send a email

[09:30 - 09:34]
report to you also would need a tool to

[09:32 - 09:36]
be able to access your email. Now moving

[09:34 - 09:38]
on to knowledge and memory. So there's

[09:36 - 09:39]
two different types. The first one is

[09:38 - 09:41]
called the knowledge base or static

[09:39 - 09:44]
memory. This allows you to give your AI

[09:41 - 09:45]
model static facts, policies, documents

[09:44 - 09:47]
just information that I can reference

[09:45 - 09:48]
and access that remains relatively

[09:47 - 09:50]
static over time. This is important if

[09:48 - 09:52]
you're building something like an AI

[09:50 - 09:55]
agent that does legal tasks. It may need

[09:52 - 09:57]
to have specific legal documents for a

[09:55 - 09:58]
particular case for a particular company

[09:57 - 10:00]
and maybe like certain policies that are

[09:58 - 10:02]
relevant for that specific company as

[10:00 - 10:03]
well. The other type of memory is

[10:02 - 10:05]
persistent memory. So this is memory

[10:03 - 10:07]
that will allow an AI agent to be able

[10:05 - 10:09]
to track conversation histories or user

[10:07 - 10:11]
interactions past just a single session.

[10:09 - 10:13]
This is really important for a lot of

[10:11 - 10:15]
chatbot use cases like say if you have

[10:13 - 10:16]
an AI personal assistant, you want to

[10:15 - 10:18]
make sure that the personal assistant

[10:16 - 10:20]
will still remember what happened like

[10:18 - 10:21]
yesterday. Again, OpenAI provides its

[10:20 - 10:23]
own hosted services like vector stores

[10:21 - 10:25]
file search and embeddings. There's also

[10:23 - 10:26]
open- source versions of this where you

[10:25 - 10:28]
can host your own databases and then you

[10:26 - 10:30]
can also perform different ways of doing

[10:28 - 10:31]
rag which is retrieval augmented

[10:30 - 10:33]
generation. Not going to go into way too

[10:31 - 10:35]
much detail about this. But some

[10:33 - 10:36]
solutions that people look into would be

[10:35 - 10:38]
Pine Cone, which is cloudnative and

[10:36 - 10:40]
optimized for vector search or Weeat

[10:38 - 10:41]
which is open source. Again, if you're

[10:40 - 10:42]
leaning more towards a no code solution

[10:41 - 10:45]
you don't really have to worry about

[10:42 - 10:47]
this is usually already taken care of by

[10:45 - 10:49]
that solution. Like N, for example

[10:47 - 10:50]
already allows you to deal with this

[10:49 - 10:53]
without you having to like figure out

[10:50 - 10:54]
all the complex cody stuff. Next up is

[10:53 - 10:56]
audio and speech. So, it's pretty

[10:54 - 10:58]
interesting because OpenAI does split

[10:56 - 11:00]
this into its own separate category

[10:58 - 11:02]
while many other kind of like frameworks

[11:00 - 11:03]
don't really include this one

[11:02 - 11:05]
specifically. And I think the reason

[11:03 - 11:08]
they do this is because there's just

[11:05 - 11:10]
been such innovations recently in audio

[11:08 - 11:11]
formats. But basically, giving your

[11:10 - 11:13]
agent ability to have audio and speech

[11:11 - 11:14]
allows it to interact with natural

[11:13 - 11:16]
language. This is really important for

[11:14 - 11:18]
chatbot AI agents because having that

[11:16 - 11:20]
ability to communicate directly using

[11:18 - 11:22]
natural language can be a much better

[11:20 - 11:24]
user experience. Within the OpenAI

[11:22 - 11:25]
ecosystem, they have their own ways of

[11:24 - 11:27]
implementing this. While outside of that

[11:25 - 11:29]
ecosystem, what people seem to use a

[11:27 - 11:31]
lot, at least right now, is 11 Labs

[11:29 - 11:32]
which is used for voice cloning and

[11:31 - 11:34]
generation. Oh, and for audio

[11:32 - 11:36]
transcription, like audio to text

[11:34 - 11:38]
people do stick with whisper, which is

[11:36 - 11:39]
an open AAI model. As of right now, like

[11:38 - 11:41]
I said, these things change a lot. It's

[11:39 - 11:43]
more important for you to understand

[11:41 - 11:44]
kind of like the general category, the

[11:43 - 11:46]
general component as opposed to the

[11:44 - 11:48]
specific tools within it. Next component

[11:46 - 11:49]
is guard rails. So guards are really

[11:48 - 11:52]
important in order to prevent

[11:49 - 11:54]
irrelevant, harmful, or undesirable

[11:52 - 11:55]
behavior. You know, once you create this

[11:54 - 11:56]
agent, you got to make sure that it's

[11:55 - 11:58]
actually doing what it's supposed to be

[11:56 - 12:00]
doing and not doing something else. If

[11:58 - 12:01]
you have a customer service agent, you

[12:00 - 12:03]
want to make sure that it is in fact

[12:01 - 12:05]
talking about customer service stuff and

[12:03 - 12:07]
not giving you like haikus or something

[12:05 - 12:09]
like that. Outside of the OpenAI

[12:07 - 12:11]
ecosystem, what's popular right now is

[12:09 - 12:12]
guardrails AI and lang chain guardrails.

[12:11 - 12:14]
There's honestly a lot of different

[12:12 - 12:16]
options in this category. But again, if

[12:14 - 12:17]
you are using no code tools, I think

[12:16 - 12:19]
it's important for you to understand

[12:17 - 12:21]
this category, these component, but a

[12:19 - 12:22]
lot of no code tools already have

[12:21 - 12:24]
solutions built into their platform.

[12:22 - 12:25]
Finally, there is orchestration. And

[12:24 - 12:26]
this is something that's super

[12:25 - 12:28]
overlooked. Remember how we were talking

[12:26 - 12:29]
about different sub aents, like how it

[12:28 - 12:31]
is that you're chaining together

[12:29 - 12:33]
different sub agents in order to come up

[12:31 - 12:35]
with a final result for something. It

[12:33 - 12:36]
also involves deploying like so it's

[12:35 - 12:38]
able to do its thing in production

[12:36 - 12:39]
monitoring it, and improving the agent.

[12:38 - 12:41]
Like once you deploy the agent, you

[12:39 - 12:43]
don't just run away and then just like

[12:41 - 12:45]
not look at it again, right? Like over

[12:43 - 12:47]
time the models keep changing. A lot of

[12:45 - 12:48]
these technologies thoughts change as

[12:47 - 12:50]
well like data keeps changing. So you

[12:48 - 12:51]
need to keep monitoring and making sure

[12:50 - 12:53]
that your agent is behaving the way

[12:51 - 12:54]
that's supposed to be behaving. There's

[12:53 - 12:56]
also a lot of different tools in this

[12:54 - 12:58]
category. Oftent times there's usually

[12:56 - 12:59]
like a framework and then the

[12:58 - 13:01]
orchestration part of it is built into

[12:59 - 13:03]
that framework. Like OpenAI has its own

[13:01 - 13:05]
system. There's also crew AI which is

[13:03 - 13:07]
another framework for implementing

[13:05 - 13:08]
multi- aent systems. It also has its own

[13:07 - 13:10]
kind of system for orchestrating and

[13:08 - 13:11]
finally deploying it. Lang chain is also

[13:10 - 13:14]
very popular for managing different

[13:11 - 13:15]
agent interactions and deploying it as

[13:14 - 13:17]
well as llama index which is

[13:15 - 13:19]
particularly useful if you creating an

[13:17 - 13:20]
AI agent that has a lot to do with

[13:19 - 13:23]
documents and static memory and

[13:20 - 13:24]
knowledge bases. Here is also a little

[13:23 - 13:27]
pneummonic for you to remember the

[13:24 - 13:29]
different components that make up an AI

[13:27 - 13:31]
agent which is going to be immediately

[13:29 - 13:33]
useful because right now we are going to

[13:31 - 13:34]
do our first little assessment. I'm

[13:33 - 13:36]
going to put on screen out some of the

[13:34 - 13:38]
questions. Comment below your answers to

[13:36 - 13:39]
make sure that you just retain all the

[13:38 - 13:41]
information that we went through. Okay

[13:39 - 13:44]
so this is a very practical guide to

[13:41 - 13:46]
building AI agents. HubSpots offers us a

[13:44 - 13:48]
very practical free guide to building AI

[13:46 - 13:49]
agents from a business perspective. I

[13:48 - 13:50]
think this free resource is a really

[13:49 - 13:52]
great compliment to everything we're

[13:50 - 13:54]
covering today because it goes in depth

[13:52 - 13:55]
on how to now take these AI agents and

[13:54 - 13:57]
make sure they're driving maximum

[13:55 - 13:58]
business success. The playbook explains

[13:57 - 14:00]
how AI agents are being used in

[13:58 - 14:02]
businesses today with actual examples

[14:00 - 14:03]
and use cases, common pitfalls, and also

[14:02 - 14:05]
discusses the future of work. It

[14:03 - 14:06]
includes a checklist that helps your

[14:05 - 14:08]
organization think through each phase of

[14:06 - 14:10]
implementing AI agents from identifying

[14:08 - 14:12]
the highest return on investment

[14:10 - 14:14]
opportunities to defining success

[14:12 - 14:15]
metrics as well as integration and

[14:14 - 14:17]
scaling. I highly recommend that you

[14:15 - 14:18]
check it out at this link over here also

[14:17 - 14:20]
linked in description. Thank you so much

[14:18 - 14:21]
HubSpot for creating these free

[14:20 - 14:23]
practical resources and for sponsoring

[14:21 - 14:24]
this portion of the video. Now back to

[14:23 - 14:26]
the

[14:24 - 14:28]
video. All right, now that we know the

[14:26 - 14:31]
components that make up AI agents, let's

[14:28 - 14:32]
now move on to the implementations. If

[14:31 - 14:34]
you remember what I said a bit earlier

[14:32 - 14:36]
AI agents are often times not just like

[14:34 - 14:38]
a singular entity. They're actually

[14:36 - 14:40]
broken down into different sub agents

[14:38 - 14:41]
that are interacting with each other. My

[14:40 - 14:43]
favorite resource that covers these

[14:41 - 14:45]
common agentic workflows and agent

[14:43 - 14:47]
systems is the building effective agents

[14:45 - 14:48]
guide from anthropic. So let's go

[14:47 - 14:50]
through it first. First of all, you have

[14:48 - 14:52]
the basic building block of agentic

[14:50 - 14:55]
systems. This is what Anthropic calls

[14:52 - 14:56]
the augmented LLM. From this image, you

[14:55 - 14:59]
can see that you have an input, you have

[14:56 - 15:00]
the LM, and you have the output. NDLM is

[14:59 - 15:02]
able to generate their own search

[15:00 - 15:03]
queries, select appropriate tools, and

[15:02 - 15:05]
determine what information needs to

[15:03 - 15:06]
retain through memory. If you were

[15:05 - 15:08]
paying attention earlier, you'll see

[15:06 - 15:10]
that there are overlaps between the

[15:08 - 15:12]
components in this augmented LLM and

[15:10 - 15:13]
OpenAI's components. This version is a

[15:12 - 15:15]
little bit more bare bones, like it

[15:13 - 15:17]
doesn't address things like guardrails

[15:15 - 15:18]
or orchestration, but you can see that

[15:17 - 15:19]
there is definitely overlap. That's

[15:18 - 15:21]
okay. When it comes to things like

[15:19 - 15:23]
testing and deployment, just remember

[15:21 - 15:25]
the OpenAI components for those specific

[15:23 - 15:27]
things. Just FYI, in terms, these

[15:25 - 15:29]
augmented LM building blocks are often

[15:27 - 15:31]
called sub agents as well. So now let's

[15:29 - 15:32]
actually see how these building blocks

[15:31 - 15:34]
these sub aents fit into each other and

[15:32 - 15:36]
work with each other to form your bigger

[15:34 - 15:38]
AI agent. We're going to be starting

[15:36 - 15:39]
with the simplest agentic workflows all

[15:38 - 15:40]
the way to the more complex and the

[15:39 - 15:43]
truly autonomous. All right, so the

[15:40 - 15:44]
simplest common agentic workflow is

[15:43 - 15:47]
called prompt chaining. Prompt chaining

[15:44 - 15:49]
decomposes a task into a sequence of

[15:47 - 15:51]
steps where each sub aent processes the

[15:49 - 15:52]
output of the previous one. In its

[15:51 - 15:54]
simplest form, this is just like an

[15:52 - 15:55]
assembly line, but you can also add in

[15:54 - 15:57]
little gates where you can split it off

[15:55 - 15:58]
into different things, but the logic is

[15:57 - 16:00]
the same. You'll have an input, a sub

[15:58 - 16:02]
agent does something with that input

[16:00 - 16:03]
passes along to another sub agent who

[16:02 - 16:04]
does something else, and maybe to

[16:03 - 16:06]
another one, etc., etc., until you

[16:04 - 16:08]
finally get a output. This kind of

[16:06 - 16:10]
implementation is the most ideal for

[16:08 - 16:12]
situations where the task can be easily

[16:10 - 16:13]
broken down into subtasks and

[16:12 - 16:15]
decomposed. An example for when prompt

[16:13 - 16:17]
chaining could be useful is if you want

[16:15 - 16:19]
your AI agent to be generating a report.

[16:17 - 16:21]
The input could be the description of

[16:19 - 16:22]
what the user wants and then the sub

[16:21 - 16:24]
agent will take that maybe generate an

[16:22 - 16:26]
outline, pass it along to another sub

[16:24 - 16:28]
agent who may check the outline for like

[16:26 - 16:29]
specific criteria and then pass it along

[16:28 - 16:30]
to a writer sub agent that would

[16:29 - 16:32]
actually write the report and then maybe

[16:30 - 16:34]
to an editor sub aent that would

[16:32 - 16:36]
actually edit the report. And the final

[16:34 - 16:38]
output would be the report that follows

[16:36 - 16:39]
the criteria that was specified. Routing

[16:38 - 16:41]
is another type of workflow where you

[16:39 - 16:43]
would have an input coming in and you

[16:41 - 16:45]
have a sub agent that is dedicated to

[16:43 - 16:47]
directing that specific input into a

[16:45 - 16:48]
specific follow-up task. And each of

[16:47 - 16:50]
these tasks is governed by a sub aent

[16:48 - 16:52]
that is specific to that task. Then

[16:50 - 16:53]
finally you get the output after the

[16:52 - 16:55]
processing. Routing works really well

[16:53 - 16:56]
for complex tasks where there are

[16:55 - 16:58]
distinct categories that are better

[16:56 - 17:00]
handled separately. A classic example

[16:58 - 17:02]
when routing is useful is if you have a

[17:00 - 17:04]
customer service bot. You have a

[17:02 - 17:05]
customer service bot that will be

[17:04 - 17:07]
getting different types of queries that

[17:05 - 17:09]
could be like general questions, refund

[17:07 - 17:10]
requests, technical support, whatever it

[17:09 - 17:12]
is that people ask customer service.

[17:10 - 17:14]
Based on the nature of the query, the

[17:12 - 17:16]
first sub agent should be able to route

[17:14 - 17:18]
the most relevant task to the sub agent

[17:16 - 17:19]
that is specialized for that task. Like

[17:18 - 17:21]
if it's a refund request, then it would

[17:19 - 17:23]
be routed to the specialist sub agent

[17:21 - 17:25]
for refunds. Like if it's a technical

[17:23 - 17:28]
support query, then it would be routed

[17:25 - 17:29]
to the AI sub agent that is a specialist

[17:28 - 17:31]
for handling technical support

[17:29 - 17:33]
questions. Another common use case is by

[17:31 - 17:35]
routing different questions to different

[17:33 - 17:37]
types of models. Some models are better

[17:35 - 17:38]
at doing certain things than others.

[17:37 - 17:40]
Like if it's a difficult STEM related

[17:38 - 17:42]
question, you might be routing it to

[17:40 - 17:44]
Claude Sonnet 3.7. Or if it's an easy

[17:42 - 17:46]
question where you value speed, you

[17:44 - 17:48]
might be routing it to Gemini Flash.

[17:46 - 17:50]
Next workflow is parallelization.

[17:48 - 17:52]
Paralleliz Oh god, I can't pronounce

[17:50 - 17:55]
this. Specific agentic workflow usually

[17:52 - 17:56]
has two key variations. This is when you

[17:55 - 17:58]
have sub agents that are working

[17:56 - 18:00]
simultaneously on a task and then have

[17:58 - 18:02]
all of its outputs then aggregated

[18:00 - 18:04]
together. The first one is sectioning

[18:02 - 18:05]
which is breaking a task into

[18:04 - 18:07]
independent subtasks that are run in

[18:05 - 18:09]
parallel, or voting, which is running

[18:07 - 18:11]
the same task multiple times using

[18:09 - 18:12]
different sub aents to get different

[18:11 - 18:14]
diverse outputs that you aggregate

[18:12 - 18:16]
together. An example of sectioning is if

[18:14 - 18:19]
you're trying to evaluate how good the

[18:16 - 18:21]
performance of a new model is for a

[18:19 - 18:22]
given prompt. Each sub agent could be

[18:21 - 18:24]
evaluating a different aspect of the

[18:22 - 18:25]
model's performance. Like one of them

[18:24 - 18:28]
could be evaluating speed and one of

[18:25 - 18:30]
them is evaluating accuracy, etc., etc.

[18:28 - 18:32]
An example of voting is reviewing a

[18:30 - 18:33]
piece of code for vulnerabilities. You

[18:32 - 18:34]
have different sub aents that are

[18:33 - 18:36]
evaluating the code and ultimately you

[18:34 - 18:38]
aggregate together to vote to decide if

[18:36 - 18:39]
this is in fact a vulnerability or not.

[18:38 - 18:41]
Next workflow and we're getting

[18:39 - 18:43]
increasingly more complex is the

[18:41 - 18:45]
orchestrator workers. The orchestrator

[18:43 - 18:47]
worker actually looks pretty similar to

[18:45 - 18:49]
parallelization, but what's different

[18:47 - 18:51]
about it is that you don't have a

[18:49 - 18:53]
predetermined list of subtasks that will

[18:51 - 18:55]
be done. So this is especially useful

[18:53 - 18:57]
for more complex problems where you

[18:55 - 18:59]
can't actually exactly predict what are

[18:57 - 19:00]
the subtasks that are going to be needed

[18:59 - 19:02]
ultimately. Like for example, if you're

[19:00 - 19:04]
building agents that involve coding

[19:02 - 19:06]
often times you don't know the exact

[19:04 - 19:08]
number of files that need to be changed

[19:06 - 19:10]
and the exact nature of the change

[19:08 - 19:11]
itself. So you need to be dynamically

[19:10 - 19:13]
making changes to multiple different

[19:11 - 19:15]
files. Another example are search tasks.

[19:13 - 19:17]
Like if you have a research assistant

[19:15 - 19:19]
agent, this would involve gathering and

[19:17 - 19:20]
analyzing a lot of different types of

[19:19 - 19:22]
information from a lot of different

[19:20 - 19:24]
sources which cannot be predetermined

[19:22 - 19:27]
ahead of time. Even more complex is the

[19:24 - 19:29]
evaluator optimizer workflow. This is

[19:27 - 19:30]
approaching more autonomous situations

[19:29 - 19:33]
where you're giving the sub agent, the

[19:30 - 19:34]
AI agent a lot more autonomy and freedom

[19:33 - 19:36]
in determining what it is that it should

[19:34 - 19:37]
be doing. You have some sort of input

[19:36 - 19:39]
and the first sub agent would generate

[19:37 - 19:42]
something a solution based upon that and

[19:39 - 19:44]
pass it along to an evaluator sub aent.

[19:42 - 19:45]
The evaluator sub agent would evaluate

[19:44 - 19:47]
it and if it's accepted then that will

[19:45 - 19:48]
be the output. Or if it feels like it's

[19:47 - 19:50]
not good enough, it would send it back

[19:48 - 19:51]
to the first sub agent telling it's

[19:50 - 19:53]
rejected and some feedback to improve.

[19:51 - 19:55]
And this is like a circular loop that

[19:53 - 19:57]
you would keep doing until the evaluator

[19:55 - 19:59]
sub agent thinks that the solution is

[19:57 - 20:01]
good enough and pass it along to output.

[19:59 - 20:03]
This workflow is particularly useful if

[20:01 - 20:04]
there's a clear evaluation criteria and

[20:03 - 20:06]
when you can see iterative refinement

[20:04 - 20:08]
and improvement over time. An example

[20:06 - 20:10]
where the evaluator optimizer workflow

[20:08 - 20:12]
is useful is if say that you're doing

[20:10 - 20:14]
some sort of literary translation for

[20:12 - 20:17]
something. There may be nuances that the

[20:14 - 20:19]
translator sub agent cannot capture the

[20:17 - 20:21]
first time around. So the evaluator sub

[20:19 - 20:22]
aent would be sending it feedback and

[20:21 - 20:24]
telling it to keep doing it until it's

[20:22 - 20:26]
able to capture all the nuances in the

[20:24 - 20:28]
language. Another example is if you're

[20:26 - 20:29]
having a complex search task that you're

[20:28 - 20:32]
trying to aggregate together into like

[20:29 - 20:33]
some form of ultimate report. You might

[20:32 - 20:35]
be doing research and the eval sub agent

[20:33 - 20:36]
would be like it feels like it's not

[20:35 - 20:38]
deep enough research is like keep doing

[20:36 - 20:40]
that keep doing it keep doing it until

[20:38 - 20:42]
you're able to gather all the necessary

[20:40 - 20:44]
information that it feels like it's able

[20:42 - 20:46]
to capture you know your super complex

[20:44 - 20:49]
report fully. And finally we have the

[20:46 - 20:52]
truly autonomous agent implementation.

[20:49 - 20:54]
So this one is tricky because it is

[20:52 - 20:56]
actually the simplest implementation

[20:54 - 20:58]
wise but it can result in very different

[20:56 - 21:00]
types and very complex potentially

[20:58 - 21:02]
solutions. The agent will begin his work

[21:00 - 21:05]
with some form of human interaction. And

[21:02 - 21:07]
once that task is clear, the agent will

[21:05 - 21:09]
be completely independent. It will

[21:07 - 21:12]
perform some sort of action or actions

[21:09 - 21:13]
that will have some form of reaction to

[21:12 - 21:15]
the environment. And the agent has to

[21:13 - 21:18]
somehow figure out itself from the

[21:15 - 21:19]
environment what is considered to be the

[21:18 - 21:21]
result of what it's doing. Like for

[21:19 - 21:23]
example, if it decides to use a tool

[21:21 - 21:25]
where it decides to execute some code

[21:23 - 21:28]
it needs to figure out itself if it's

[21:25 - 21:29]
making progress towards the ultimate

[21:28 - 21:31]
completion of task or not and it's going

[21:29 - 21:32]
to keep doing that getting the feedback

[21:31 - 21:34]
from the environment judging how it's

[21:32 - 21:36]
progressing until ultimately it feels

[21:34 - 21:37]
like it has completed the task that it

[21:36 - 21:39]
was assigned. This kind of

[21:37 - 21:41]
implementation, the very autonomous

[21:39 - 21:43]
freedom giving type of agent

[21:41 - 21:45]
implementation is usually used for very

[21:43 - 21:46]
open-ended problems where it's very

[21:45 - 21:49]
difficult to predict the number of steps

[21:46 - 21:50]
that it should take or the exact path to

[21:49 - 21:52]
get to the final result. You're

[21:50 - 21:53]
basically just telling an agent, hey

[21:52 - 21:56]
like do this thing and it just kind of

[21:53 - 21:57]
has to figure out itself how to do the

[21:56 - 21:59]
thing like what are the task involved

[21:57 - 22:01]
whether it's making progress or not

[21:59 - 22:02]
towards the thing and then at some point

[22:01 - 22:04]
deciding that it has in fact completed

[22:02 - 22:07]
the thing and comes back to you. You can

[22:04 - 22:09]
get like really crazy good results from

[22:07 - 22:11]
this, but sometimes often times you also

[22:09 - 22:12]
get some really crazy in general

[22:11 - 22:14]
that can come from this. Some examples

[22:12 - 22:16]
from the anthropic article include a

[22:14 - 22:17]
coding agent that's able to resolve

[22:16 - 22:19]
different software engineering bench

[22:17 - 22:21]
tasks which involves editing like a lot

[22:19 - 22:23]
of different files on a task description

[22:21 - 22:25]
or their computer use implementation

[22:23 - 22:26]
where Claude was able to use a computer

[22:25 - 22:28]
have access to all of the different

[22:26 - 22:30]
functionalities of this very complex

[22:28 - 22:32]
computer machine to accomplish specific

[22:30 - 22:34]
tasks. Here's a diagram that illustrates

[22:32 - 22:36]
the path that a coding AI agent took in

[22:34 - 22:37]
order to complete its task. You can see

[22:36 - 22:39]
that there's a lot of different back and

[22:37 - 22:40]
forths interactions in environments

[22:39 - 22:42]
coming back and refining and everything

[22:40 - 22:44]
like that before going back to a human.

[22:42 - 22:46]
As the article suggests, this kind of

[22:44 - 22:48]
truly autonomous implementation is not

[22:46 - 22:49]
something that you generally want to do

[22:48 - 22:51]
because in most situations, you can

[22:49 - 22:53]
actually go with a more predetermined

[22:51 - 22:55]
agentic workflow and it would yield more

[22:53 - 22:57]
predictable results and be a lot

[22:55 - 23:00]
cheaper. This article keeps saying like

[22:57 - 23:02]
repeatedly that you should always go

[23:00 - 23:03]
with the simplest implementation

[23:02 - 23:05]
possible. Like if you can achieve your

[23:03 - 23:07]
AI agent goals through prompt chaining

[23:05 - 23:09]
or routing, don't be doing things that

[23:07 - 23:10]
are more complex. Just a general rule of

[23:09 - 23:12]
thumb when you're building your AI

[23:10 - 23:14]
agents and actually just engineering and

[23:12 - 23:15]
building things in general. Don't

[23:14 - 23:18]
overengineer. Okay, so we've covered all

[23:15 - 23:20]
the different workflows. Now I want to

[23:18 - 23:22]
first do a quick little crash course on

[23:20 - 23:23]
prompt engineering for AI agents from a

[23:22 - 23:25]
practical perspective for these AI

[23:23 - 23:27]
agents. the prompt engineering, the

[23:25 - 23:29]
prompts matter so much. It's really what

[23:27 - 23:30]
holds everything together. Like you can

[23:29 - 23:32]
have your agents and it has all these

[23:30 - 23:33]
tools and has access to all these really

[23:32 - 23:34]
cool things, but if you don't have a

[23:33 - 23:36]
good prompt, you're not able to pull all

[23:34 - 23:37]
this together. So that's why I'm going

[23:36 - 23:39]
to emphasize this part. When you're

[23:37 - 23:41]
prompting for an AI agent, you need to

[23:39 - 23:43]
have the full prompt, all of it just

[23:41 - 23:45]
there. Like you can't interactively

[23:43 - 23:46]
correct it and add more information

[23:45 - 23:48]
throughout the process. So there are six

[23:46 - 23:50]
components that you should consider

[23:48 - 23:52]
putting into your AI agent prompt. The

[23:50 - 23:53]
first thing to specify is the role. So

[23:52 - 23:55]
this is where you tell it that it's an

[23:53 - 23:57]
AI research assistant, but you also want

[23:55 - 23:58]
to include things like the tone and how

[23:57 - 24:00]
it is that it should be behaving. So for

[23:58 - 24:01]
example, you could write you are an AI

[24:00 - 24:03]
research assistant task with summarizing

[24:01 - 24:05]
the latest news in artificial

[24:03 - 24:06]
intelligence. Your style is succinct

[24:05 - 24:08]
direct, and focus on essential

[24:06 - 24:10]
information. Next up is a task and you

[24:08 - 24:12]
can write given a search term related to

[24:10 - 24:14]
AI news, produce a concise summary of

[24:12 - 24:16]
the key points. Then we have input. This

[24:14 - 24:18]
is where you can specify what it is that

[24:16 - 24:19]
the AI research assistant will be

[24:18 - 24:21]
receiving. In this case, you can just

[24:19 - 24:22]
write that the input is a specified AI

[24:21 - 24:24]
related search term provided by the

[24:22 - 24:25]
user. But you can imagine that there

[24:24 - 24:26]
could be other inputs that the AI

[24:25 - 24:28]
research assistant could be receiving

[24:26 - 24:30]
like certain graphs and different

[24:28 - 24:32]
documents. You want to specify and let

[24:30 - 24:34]
the AI assistant know exactly what it is

[24:32 - 24:36]
that will be receiving. Fourth is the

[24:34 - 24:37]
output. This is where you want to go

[24:36 - 24:39]
into detail about what it is that you

[24:37 - 24:41]
want the AI research assistant to come

[24:39 - 24:42]
up with. What is it supposed to

[24:41 - 24:44]
ultimately look like? What's the final

[24:42 - 24:47]
deliverable? In this case, you can write

[24:44 - 24:48]
provide only a succinct information

[24:47 - 24:51]
dense summary capturing the essence of

[24:48 - 24:53]
recent AI related news relevant to the

[24:51 - 24:54]
search term. The summary must be

[24:53 - 24:56]
concise. Approximately two to three

[24:54 - 24:58]
short paragraphs totaling no more than

[24:56 - 24:59]
300 words. It exactly knows what it's

[24:58 - 25:02]
supposed to output. Now, fifth step of

[24:59 - 25:04]
the framework is constraint. This is a

[25:02 - 25:06]
really, really, really important part

[25:04 - 25:07]
that you want to be including in your

[25:06 - 25:09]
prompt. Not just what it's supposed to

[25:07 - 25:10]
do, but also what it is that it should

[25:09 - 25:12]
not be doing. You could write, "Focus on

[25:10 - 25:14]
capturing the main point succinctly.

[25:12 - 25:16]
Complete sentences and perfect grammar

[25:14 - 25:18]
are not necessary. Ignore fluff

[25:16 - 25:19]
background information, and commentary.

[25:18 - 25:21]
Do not include your own analysis or

[25:19 - 25:23]
opinions. We don't care about the AI

[25:21 - 25:25]
agents. We only want to focus on the

[25:23 - 25:27]
facts. Finally, you have capabilities

[25:25 - 25:29]
and reminders. This is where you want to

[25:27 - 25:31]
tell the AI what it has access to, like

[25:29 - 25:33]
certain tools that it may have, as well

[25:31 - 25:34]
as provide reminders for things that it

[25:33 - 25:35]
should really, really, really keep top

[25:34 - 25:38]
of mind, things that are really

[25:35 - 25:40]
important. In this example, we gave the

[25:38 - 25:42]
AI agent the ability to do web search.

[25:40 - 25:44]
So, we can tell it you have access to

[25:42 - 25:46]
the web search tool to find and retrieve

[25:44 - 25:48]
recent news articles relevant to the

[25:46 - 25:50]
search term. Also, we want to remind it

[25:48 - 25:52]
that it needs to be very aware of the

[25:50 - 25:55]
current date. A common issue that a lot

[25:52 - 25:57]
of LMS have is that it's not really

[25:55 - 25:59]
aware of what date or time it currently

[25:57 - 26:01]
is. So, since we're only interested in

[25:59 - 26:02]
searching for things that are relevant

[26:01 - 26:04]
right now, we want to make sure that

[26:02 - 26:06]
it's aware of what time it is and what's

[26:04 - 26:08]
the search window. So we might write you

[26:06 - 26:10]
must be deeply aware of the current date

[26:08 - 26:12]
to ensure the relevance of news

[26:10 - 26:14]
summarizing only information published

[26:12 - 26:16]
within the past seven days. A general

[26:14 - 26:19]
tip is that the more important something

[26:16 - 26:20]
is the lower down on the prompt it is

[26:19 - 26:22]
that you want to remind you. It's just

[26:20 - 26:24]
the way that the AI is able to process

[26:22 - 26:26]
that information. It has a bias towards

[26:24 - 26:29]
the most recent things first. That was

[26:26 - 26:30]
the crash course on AI agent prompt

[26:29 - 26:32]
engineering. I hope you guys are also

[26:30 - 26:34]
not mad at me for making you actually

[26:32 - 26:36]
learn the foundations first because I do

[26:34 - 26:37]
find that a lot of people who are doing

[26:36 - 26:39]
vibe coding these days who don't

[26:37 - 26:40]
actually know the foundations, you end

[26:39 - 26:42]
up, you know, having you building

[26:40 - 26:44]
something and it's just, you know, not

[26:42 - 26:45]
that great. It's kind of just like

[26:44 - 26:47]
Or if it's something that you want to

[26:45 - 26:48]
tweak slightly, you end up, you know

[26:47 - 26:50]
making a lot of stupid mistakes because

[26:48 - 26:52]
you don't understand the foundations. So

[26:50 - 26:54]
now you're equipped with the information

[26:52 - 26:56]
to actually go build something with the

[26:54 - 26:58]
knowledge and the confidence that it is

[26:56 - 27:00]
in fact the best implementation to do

[26:58 - 27:02]
so. Here's now. Alo now a little quiz

[27:00 - 27:03]
that I will now put on screen. Please

[27:02 - 27:04]
answer these questions in the comment

[27:03 - 27:07]
section to make sure that you're

[27:04 - 27:09]
retaining all of this information that I

[27:07 - 27:10]
am presenting. Now the next section I'm

[27:09 - 27:13]
going to be showing you the actual

[27:10 - 27:16]
implementations of AI agents. I have

[27:13 - 27:18]
included some no code low code examples

[27:16 - 27:19]
as well as fully coded examples as well.

[27:18 - 27:21]
So there should be something for

[27:19 - 27:24]
everybody

[27:21 - 27:27]
here. This is a customer support AI

[27:24 - 27:29]
agent and we implemented this using N8N.

[27:27 - 27:31]
So this was NAN. It's a platform. It's a

[27:29 - 27:32]
no code, low code platform that is super

[27:31 - 27:34]
easy to use that you can use it to

[27:32 - 27:36]
create different AI agents. In this

[27:34 - 27:38]
case, we implemented this AI agent using

[27:36 - 27:40]
a multi- aent system that follows the

[27:38 - 27:42]
routing agentic pattern which we talked

[27:40 - 27:44]
about earlier. The way it works is that

[27:42 - 27:46]
a customer will send an email inquiry

[27:44 - 27:47]
and then we have a text classifier which

[27:46 - 27:50]
is powered in this case by an open AI

[27:47 - 27:52]
model that's able to route the inquiry

[27:50 - 27:54]
as technical support, billing or general

[27:52 - 27:56]
inquiry. And each of these have their

[27:54 - 27:58]
own specific workflows after that. Let

[27:56 - 28:00]
us see actually how it works. Let's go

[27:58 - 28:02]
to my email over here and I'm going to

[28:00 - 28:04]
write an email to customer support. This

[28:02 - 28:06]
case is going to go to

[28:04 - 28:10]
cloud@lontopus.com. I'm going to say

[28:06 - 28:13]
refund because I am angry. Hello, I want

[28:10 - 28:15]
a refund. Yes. Click send. You can see

[28:13 - 28:17]
that the emails here. It classifies it

[28:15 - 28:20]
as a billing situation. We have the AI

[28:17 - 28:22]
agent and the AI agent is able to use

[28:20 - 28:24]
the email to respond back to the

[28:22 - 28:26]
inquiry. And if we check our email

[28:24 - 28:27]
again, we saw the agent has responded to

[28:26 - 28:29]
us. Hello, thank you for reaching out

[28:27 - 28:31]
regarding a request for a refund to

[28:29 - 28:32]
assist you effectively. Blah blah blah

[28:31 - 28:34]
you know, give all these information and

[28:32 - 28:36]
then you can go ahead and send that

[28:34 - 28:37]
information to the agent for you to

[28:36 - 28:39]
process your refund. If it's classified

[28:37 - 28:41]
as technical support, it also has this

[28:39 - 28:42]
workflow. If it decides that it can

[28:41 - 28:44]
answer your technical support question

[28:42 - 28:46]
directly using documentation, it can

[28:44 - 28:48]
directly email you back the response as

[28:46 - 28:50]
well. But here we also have an option

[28:48 - 28:51]
where if they can't figure out how to

[28:50 - 28:53]
support you from a technical support

[28:51 - 28:55]
perspective, it would actually escalate

[28:53 - 28:57]
this and send it on Discord like this.

[28:55 - 28:59]
Hello team, customer needs help. Please

[28:57 - 29:01]
investigate further. The email ID is

[28:59 - 29:03]
this ID over here. So a real agent would

[29:01 - 29:05]
be able to jump in and start helping the

[29:03 - 29:06]
customer in this case. Really important

[29:05 - 29:08]
to actually have this here because you

[29:06 - 29:09]
always want to have some way in your AI

[29:08 - 29:10]
agent to be able to escalate to an

[29:09 - 29:12]
actual human. And of course, if it's a

[29:10 - 29:14]
general inquiry, it would route to this

[29:12 - 29:18]
branch over here, and then it would send

[29:14 - 29:18]
a general email asking for additional

[29:18 - 29:22]
information. This is another AI agent.

[29:20 - 29:25]
It is a AI news aggregator agent. The

[29:22 - 29:27]
way it works is that it's scheduled at

[29:25 - 29:29]
7:00 a.m. every day, and it's going to

[29:27 - 29:31]
go and gather information, gather news

[29:29 - 29:33]
from different newsletters as well as

[29:31 - 29:34]
Reddit. Then it will aggregate all of

[29:33 - 29:37]
that information together, and

[29:34 - 29:39]
ultimately come up with a summary that

[29:37 - 29:41]
it's going to send to me on WhatsApp.

[29:39 - 29:43]
This is an example of a

[29:41 - 29:45]
parallelization workflow pattern. So

[29:43 - 29:47]
it's not 7 am, but I'm just going to

[29:45 - 29:48]
trigger the workflow right now and have

[29:47 - 29:50]
it do its thing. It's going to be

[29:48 - 29:52]
running everything over here. So, I want

[29:50 - 29:53]
to actually make a note that even though

[29:52 - 29:56]
it is a parallelization workflow, the

[29:53 - 29:57]
limitation of NATO is that it actually

[29:56 - 29:59]
still runs sequentially. If you

[29:57 - 30:01]
implement this using a coded tool like

[29:59 - 30:03]
OpenAI's agents SDK for example, which I

[30:01 - 30:04]
will show you an example of in just a

[30:03 - 30:06]
little bit, it would actually run in

[30:04 - 30:07]
parallel. But yeah, in this case just

[30:06 - 30:10]
kind of let you know technically it is

[30:07 - 30:12]
parallelization but it isn't able to do

[30:10 - 30:13]
that because of the platform limitations

[30:12 - 30:15]
itself. Okay. So after running it's

[30:13 - 30:17]
going to send me a notification on

[30:15 - 30:19]
WhatsApp where it gives me an aggregated

[30:17 - 30:21]
information from all of the different

[30:19 - 30:23]
news sources. So open AI launches GP5

[30:21 - 30:25]
alpha AI ethics Google's AI ethics

[30:23 - 30:26]
regulatory developments blah blah blah

[30:25 - 30:28]
like all these different things that are

[30:26 - 30:29]
happening over here. And in the prompt I

[30:28 - 30:31]
specified to make sure that it cites the

[30:29 - 30:33]
sources. So, if I wanted to actually go

[30:31 - 30:35]
in and learn more about each of these

[30:33 - 30:37]
different news reports, I could actually

[30:35 - 30:40]
just click in and be able to look at the

[30:37 - 30:42]
actual source itself. This is actually a

[30:40 - 30:44]
really helpful AI agent to have cuz in

[30:42 - 30:46]
this prompt over here, you can see that

[30:44 - 30:48]
I can like exactly specify what it is

[30:46 - 30:50]
I'm interested in like AI related search

[30:48 - 30:51]
term provided by the newsletter mind for

[30:50 - 30:53]
example, right? Where like whatever it

[30:51 - 30:55]
is I want, how I want it to be

[30:53 - 30:56]
summarized, how I want everything to be

[30:55 - 30:58]
aggregated together. So, it's a really

[30:56 - 31:00]
handy little tool. think it would be

[30:58 - 31:02]
really useful for you as well if you are

[31:00 - 31:05]
someone who also has to just like go

[31:02 - 31:08]
through a lot of information every

[31:05 - 31:11]
day. Final NAN example. This is a

[31:08 - 31:13]
multi-input daily expenses tracker AI

[31:11 - 31:14]
agent. That is such a mouthful. So the

[31:13 - 31:16]
way it works that you interact with it

[31:14 - 31:17]
using WhatsApp. You can send it pictures

[31:16 - 31:19]
or receipts of whatever it is that

[31:17 - 31:21]
you've spent. You can send it text as

[31:19 - 31:23]
well. Like if you spend like $10, you

[31:21 - 31:25]
can tell it that you spent $10 as well.

[31:23 - 31:26]
is able to take all of that information

[31:25 - 31:29]
and ultimately aggregate everything

[31:26 - 31:31]
together to give you a final expenses

[31:29 - 31:33]
track report every single day. It also

[31:31 - 31:34]
stores it in memory on Google Sheets and

[31:33 - 31:36]
it will also give you that report and

[31:34 - 31:39]
send it to you on WhatsApp as well. And

[31:36 - 31:41]
finally, at 9:00 p.m. every single day

[31:39 - 31:43]
it would then on WhatsApp send you a

[31:41 - 31:45]
summary of how much money that you've

[31:43 - 31:48]
spent. For example, here I said that I

[31:45 - 31:50]
spent $10 on a potato. I don't know why

[31:48 - 31:52]
it's like $10 on potato is very

[31:50 - 31:55]
expensive. Then it would be able to put

[31:52 - 31:56]
this on my expense tracker. So potato

[31:55 - 31:58]
over here, $10 a potato. Here's like all

[31:56 - 32:00]
the other things that I've bought. See

[31:58 - 32:04]
that I've bought a lot of things these

[32:00 - 32:05]
days. And at night, it tells me that my

[32:04 - 32:07]
consumption has focused on living

[32:05 - 32:09]
expenses specifically with the purchase

[32:07 - 32:11]
of potatoes totally $10. This indicates

[32:09 - 32:12]
a straightforward and essential spending

[32:11 - 32:14]
pattern with no other itemized purchase

[32:12 - 32:16]
recorded for the day. On some of my

[32:14 - 32:18]
previous days when I bought more than

[32:16 - 32:20]
just the one potato, it says here like

[32:18 - 32:21]
on April 7, 2025, the spending now

[32:20 - 32:23]
showed a significant emphasis on food

[32:21 - 32:26]
with large purchases like steak and

[32:23 - 32:27]
chocolate totaling $4,000 making food

[32:26 - 32:29]
the most dominant category. Minor

[32:27 - 32:31]
expenses, living expenses was also

[32:29 - 32:33]
recorded with the purchase of peanuts.

[32:31 - 32:34]
Okay, that is not exactly correct as you

[32:33 - 32:35]
can see. Maybe we still need to modify

[32:34 - 32:38]
this prompt a little bit. Um, but yeah

[32:35 - 32:40]
this is an example of how it is that you

[32:38 - 32:43]
can track your expenses based upon my

[32:40 - 32:45]
explanation of how this works. What a

[32:43 - 32:47]
gentic workflow design pattern do you

[32:45 - 32:50]
think the multi-inputs daily expenses

[32:47 - 32:53]
tracker AI agent is implemented with?

[32:50 - 32:53]
Put that in the

[32:54 - 32:58]
comments. I wanted to show you an

[32:56 - 33:00]
example that is implemented using code.

[32:58 - 33:02]
Now specifically this was implemented

[33:00 - 33:04]
using OpenAI's agents SDK. It's done

[33:02 - 33:06]
using Python and what it is is a

[33:04 - 33:08]
financial research assistant that is

[33:06 - 33:10]
able to take in an inquiry and is able

[33:08 - 33:11]
to search the internet, gather

[33:10 - 33:13]
information about it, aggregate it and

[33:11 - 33:15]
it also has voice functionalities and

[33:13 - 33:16]
also like language and translation

[33:15 - 33:18]
functionalities as well. And this

[33:16 - 33:20]
follows the routing agentic design

[33:18 - 33:22]
workflow pattern where we have a main

[33:20 - 33:24]
manager. And actually instead of me just

[33:22 - 33:25]
like showing you the code to explain

[33:24 - 33:27]
this to you, I'm actually going to use

[33:25 - 33:29]
cursor to show you how the AI agent

[33:27 - 33:31]
works and also to run it as well. just a

[33:29 - 33:33]
little preview to my vibe coding video

[33:31 - 33:35]
that's going to be happening maybe in

[33:33 - 33:37]
like two weeks. So stay tuned for that.

[33:35 - 33:41]
Okay. So I'm going to say, could you

[33:37 - 33:45]
please explain the way that the

[33:41 - 33:47]
financial research assistant agent

[33:45 - 33:49]
works? So we have a main orchestrator

[33:47 - 33:51]
which is the financial research manager

[33:49 - 33:53]
and the core workflow steps is that it

[33:51 - 33:55]
plans searches, perform searches, write

[33:53 - 33:57]
reports and verifies the report. The way

[33:55 - 33:59]
it does this is that after the manager

[33:57 - 34:01]
kicks off the program, it would pass it

[33:59 - 34:03]
on to a planner agent. So it uses a

[34:01 - 34:05]
planner agent to break down the user's

[34:03 - 34:07]
query into specific search terms. Each

[34:05 - 34:09]
search term contains a query and reason

[34:07 - 34:11]
for searching and it returns a financial

[34:09 - 34:13]
search plan with multiple search items.

[34:11 - 34:15]
So then it passes along the search terms

[34:13 - 34:16]
to a search agent which then performs

[34:15 - 34:18]
each of these searches and which then

[34:16 - 34:20]
collects and aggregates all the search

[34:18 - 34:21]
results. Then we go on to the analysis

[34:20 - 34:23]
phase. It uses specialized agents for

[34:21 - 34:25]
different aspects. So we have two agents

[34:23 - 34:26]
that's going to be over here. First one

[34:25 - 34:28]
it passes to the financials agents that

[34:26 - 34:30]
would analyze key financial metrics as

[34:28 - 34:32]
well as the risk agent that identifies

[34:30 - 34:34]
potential red flags. And both agents

[34:32 - 34:35]
will return analysis summaries. Then

[34:34 - 34:38]
they would pass along all of these

[34:35 - 34:40]
analysis summaries to the report writing

[34:38 - 34:42]
phase where you have a writer agent

[34:40 - 34:43]
that's able to synthesize all that

[34:42 - 34:44]
information together, combines the

[34:43 - 34:46]
together search terms with financial and

[34:44 - 34:48]
risk analysis, and generates a

[34:46 - 34:49]
structured report using markdown, short

[34:48 - 34:51]
summary, and follow-up questions. Then

[34:49 - 34:53]
we have a verifier agent, which then

[34:51 - 34:55]
goes through the report's accuracy and

[34:53 - 34:57]
completeness. We also included a voice

[34:55 - 34:58]
interaction functionality that's so

[34:57 - 35:00]
you're able to communicate and ask it

[34:58 - 35:01]
questions based upon the report that is

[35:00 - 35:03]
generated using audio. And finally

[35:01 - 35:05]
you'll get your output and your results

[35:03 - 35:07]
for your financial report. You can see

[35:05 - 35:09]
that it's implemented based upon the

[35:07 - 35:11]
prompt chaining agentic workflow where

[35:09 - 35:13]
the main orchestrator manager kicks off

[35:11 - 35:15]
the query and it passes along to the

[35:13 - 35:17]
planner agent, the search agent, and

[35:15 - 35:20]
many other agents until finally you're

[35:17 - 35:22]
able to get a financial report.txt with

[35:20 - 35:24]
with all that result contained within

[35:22 - 35:27]
the financial report.tx. txt. Let's

[35:24 - 35:30]
actually run this now. Let's run the

[35:27 - 35:31]
financial research agent, whatever. I

[35:30 - 35:34]
can't spell. It's fine. By the way, if

[35:31 - 35:36]
you've never seen AI coding agent

[35:34 - 35:37]
coding editor at work before, this is

[35:36 - 35:39]
kind of what it's like. Honestly, like

[35:37 - 35:41]
after I started using cursor, windsurf

[35:39 - 35:44]
and just like AI coding agents in

[35:41 - 35:46]
general. It has been a huge game changer

[35:44 - 35:48]
for how people code and run code as

[35:46 - 35:49]
well. So, all right, we will let it do

[35:48 - 35:51]
its thing. It says at first help you run

[35:49 - 35:52]
a financial research agent first. Let me

[35:51 - 35:54]
check the workspace rush to ensure we

[35:52 - 35:56]
have everything we need. Blah blah blah.

[35:54 - 35:58]
So let it do that. Okay. It's telling me

[35:56 - 35:59]
that I need to install some things. So

[35:58 - 36:03]
we'll just do that. Installing

[35:59 - 36:05]
dependencies. Running into errors. Okay.

[36:03 - 36:08]
Run more things.

[36:05 - 36:11]
Five minutes later. Okay. After running

[36:08 - 36:13]
all of the these dependencies, it says

[36:11 - 36:15]
that we have the server running. Let's

[36:13 - 36:18]
now run the financial research agent.

[36:15 - 36:21]
I'm just going to write what are the key

[36:18 - 36:24]
financial metrics for Tesla. So, we're

[36:21 - 36:27]
going to run this. Oh no, it didn't

[36:24 - 36:29]
work. Honestly, a lot of Vibe coding is

[36:27 - 36:31]
just running things and then letting it

[36:29 - 36:33]
install stuff and fix its own problems.

[36:31 - 36:34]
So, we're going to patiently wait for it

[36:33 - 36:36]
to

[36:34 - 36:39]
work. Okay, it says enter a financial

[36:36 - 36:41]
research query. Enter. Oh, looks like we

[36:39 - 36:45]
don't have an open AI key. Let me put

[36:41 - 36:47]
that in the key metrics for Tesla. It is

[36:45 - 36:49]
starting financial research and starting

[36:47 - 36:51]
to do its thing. We'll perform seven

[36:49 - 36:54]
searches searching planning report

[36:51 - 36:56]
structure. And there we go. It looks

[36:54 - 36:59]
like we have the report. All right. The

[36:56 - 37:00]
financial agent has gener successfully

[36:59 - 37:03]
generated comprehensive report and we

[37:00 - 37:06]
can actually find that report over here.

[37:03 - 37:08]
So instead of actually having to read

[37:06 - 37:10]
through everything, I'm going to use the

[37:08 - 37:13]
voice functionality that has been

[37:10 - 37:15]
implemented. So run the voice

[37:13 - 37:17]
functionality. Tell me about the key

[37:15 - 37:19]
metrics in the report. Sure. Here are

[37:17 - 37:22]
the key financial metrics mentioned in

[37:19 - 37:25]
the report. One, revenues. Tesla

[37:22 - 37:27]
recorded revenues of $24.93 billion. The

[37:25 - 37:29]
substantial revenue figure is largely

[37:27 - 37:33]
attributed to the successful sales of

[37:29 - 37:35]
their Model 3 and Model Y vehicles as

[37:33 - 37:38]
well as strategic expansions in Berlin

[37:35 - 37:40]
and Texas factories. Two, so you can

[37:38 - 37:42]
communicate directly using voice. And

[37:40 - 37:46]
finally, I want to show you guys how you

[37:42 - 37:48]
can translate your report into Spanish.

[37:46 - 37:51]
So this uses MCP. So which allows it to

[37:48 - 37:54]
have access to a tool that can translate

[37:51 - 37:56]
the report into Spanish which it did

[37:54 - 37:58]
over here. So this is an example of a

[37:56 - 38:00]
coded implementation and if you want to

[37:58 - 38:01]
check out the code I'll actually link in

[38:00 - 38:02]
the description so you can check it out

[38:01 - 38:04]
and play around with it yourself too.

[38:02 - 38:05]
Remember that there's actually a lot of

[38:04 - 38:07]
different ways that you can use to

[38:05 - 38:08]
implement an AI agent. Choose what makes

[38:07 - 38:10]
the most sense for the AI agent that

[38:08 - 38:12]
you're building as well as your own

[38:10 - 38:13]
skill level. By the way, if you are

[38:12 - 38:15]
interested in learning more about AI

[38:13 - 38:16]
agents and how to build AI agents, I

[38:15 - 38:18]
wanted to let you know that I'll be

[38:16 - 38:19]
launching an AI agents boot camp in the

[38:18 - 38:21]
next few weeks. It's a four-week long

[38:19 - 38:22]
program that is really hands-on where

[38:21 - 38:24]
you're going to be building your own AI

[38:22 - 38:25]
agents like the ones that you see in

[38:24 - 38:26]
this video, as well as ones that are

[38:25 - 38:28]
going to be more advanced and more

[38:26 - 38:30]
custom towards specific use cases. So

[38:28 - 38:32]
if you interested, please do check out

[38:30 - 38:34]
the link over here, also linked in

[38:32 - 38:35]
description. Instead of just ending the

[38:34 - 38:37]
video right now and being like, "All

[38:35 - 38:38]
right, guys, go build your AI agents." I

[38:37 - 38:40]
actually want to include this final

[38:38 - 38:42]
section where I want to share with you

[38:40 - 38:44]
how it is that you should be thinking

[38:42 - 38:45]
about what kind of AI agents that you

[38:44 - 38:46]
want to be building in the first place

[38:45 - 38:49]
because ultimately speaking we're trying

[38:46 - 38:50]
to build AI agents not just for funsies

[38:49 - 38:52]
hopefully or maybe it is I don't know

[38:50 - 38:54]
then that's fine but for a lot of us

[38:52 - 38:56]
we're trying to build AI agents so that

[38:54 - 38:58]
they can be useful for us useful for a

[38:56 - 38:59]
business useful for enterprise whatever

[38:58 - 39:01]
right maybe some of you guys also want

[38:59 - 39:02]
to be starting your own AI agent

[39:01 - 39:04]
businesses or startups by the way if you

[39:02 - 39:06]
haven't already please do check out the

[39:04 - 39:08]
Y combinator YouTube channel I have

[39:06 - 39:09]
learned learned so much in terms of

[39:08 - 39:11]
figuring out what kind of AI agents to

[39:09 - 39:13]
build, kind of startups to be doing

[39:11 - 39:15]
what kind of things to be aware of while

[39:13 - 39:16]
playing around in the AI space and their

[39:15 - 39:17]
videos are really, really worth

[39:16 - 39:19]
watching. But I'm going to share with

[39:17 - 39:20]
you the major insight that I got from

[39:19 - 39:22]
watching this video, which is how to

[39:20 - 39:25]
find your AI startup ideas. The easiest

[39:22 - 39:27]
way of figuring out a useful AI agent to

[39:25 - 39:29]
build is by starting with yourself

[39:27 - 39:31]
first. What is it that you're currently

[39:29 - 39:33]
doing that if you were to offload to an

[39:31 - 39:34]
AI agent would make your life so much

[39:33 - 39:36]
easier? Again, don't worry about what

[39:34 - 39:37]
kind of tools and frameworks and tech

[39:36 - 39:39]
stack it is right now, okay? Just think

[39:37 - 39:41]
about what is it that if you did would

[39:39 - 39:43]
just make your life so much easier. For

[39:41 - 39:45]
example, I work with a very lovely team

[39:43 - 39:47]
and agency that takes care of the

[39:45 - 39:48]
sponsorships that I do. And one of the

[39:47 - 39:50]
people on the team actually messaged me

[39:48 - 39:53]
on Slack saying that she wanted to build

[39:50 - 39:55]
an AI agent that is able to access her

[39:53 - 39:56]
emails and be able to screen like what

[39:55 - 39:59]
are considered good leads versus bad

[39:56 - 40:00]
leads and only respond to emails that

[39:59 - 40:01]
are considered to be good leads. I

[40:00 - 40:03]
thought that this was a great idea and I

[40:01 - 40:04]
was like, "Yes, you should totally do

[40:03 - 40:06]
this." And you can totally do this

[40:04 - 40:07]
through no code using nan as well. You

[40:06 - 40:09]
can use the prompt I shared earlier to

[40:07 - 40:10]
figure out what is the agentic workflow

[40:09 - 40:12]
that is the most applicable in this

[40:10 - 40:14]
specific situation. And then you can go

[40:12 - 40:15]
build it using a no code tool. But what

[40:14 - 40:17]
if you're someone who is not currently

[40:15 - 40:19]
working and solving problems every day?

[40:17 - 40:20]
Like maybe you have just graduated where

[40:19 - 40:22]
you're currently still a student. Don't

[40:20 - 40:24]
worry, YC also has really great advice

[40:22 - 40:26]
for this. In this case, what you want to

[40:24 - 40:28]
do is go undercover. Seeing as you

[40:26 - 40:30]
yourself don't have the experience to

[40:28 - 40:31]
understand what can be automated instead

[40:30 - 40:33]
of just thinking of something in your

[40:31 - 40:36]
head. The best approach to doing this is

[40:33 - 40:37]
to go and meet up with someone who is in

[40:36 - 40:39]
fact working like someone who either

[40:37 - 40:40]
owns their own business or has a job or

[40:39 - 40:42]
something like that. Just ask if you can

[40:40 - 40:44]
shadow them. Try to figure out their

[40:42 - 40:46]
problems. The thing is often times they

[40:44 - 40:48]
might not even know their own problems

[40:46 - 40:50]
because they're so deeply entrenched in

[40:48 - 40:51]
whatever it is that they're doing on a

[40:50 - 40:52]
day-to-day basis. They don't even

[40:51 - 40:54]
realize there could be ways of doing

[40:52 - 40:56]
things that is so much easier and so

[40:54 - 40:58]
much better if they incorporated AI into

[40:56 - 41:00]
their workflow. But you, you're coming

[40:58 - 41:02]
in with a fresh pair of eyes. So look at

[41:00 - 41:04]
what they're doing and try to identify

[41:02 - 41:06]
where it is that you can build an AI

[41:04 - 41:08]
agent and offload some of their tasks

[41:06 - 41:09]
automate some of what they're doing so

[41:08 - 41:11]
that they're able to accomplish their

[41:09 - 41:12]
goals even better. Once you start doing

[41:11 - 41:13]
that and developing that, you often

[41:12 - 41:15]
times start to realize that whatever

[41:13 - 41:17]
issue it is that you had or you know

[41:15 - 41:19]
somebody else had is something that many

[41:17 - 41:20]
many people have. And there you go.

[41:19 - 41:21]
That's how you can start working on

[41:20 - 41:23]
something that could eventually turn

[41:21 - 41:25]
into a business or a startup as well.

[41:23 - 41:27]
And finally, if you just want some like

[41:25 - 41:29]
highlevel guidance, the absolute goal

[41:27 - 41:31]
that I got from one of the YC videos as

[41:29 - 41:33]
well, is that for every SAS company that

[41:31 - 41:34]
you see out there, software as a service

[41:33 - 41:37]
company that you see out there, there

[41:34 - 41:39]
will be an AI agent equivalent of that.

[41:37 - 41:42]
Literally, every company that is a SAS

[41:39 - 41:44]
unicorn, you could imagine there's a

[41:42 - 41:46]
vertical AI unicorn equivalent. So there

[41:44 - 41:48]
you go. That is literally like such

[41:46 - 41:50]
clear overarching guidance. Look at all

[41:48 - 41:52]
the SAS companies that are available

[41:50 - 41:54]
right now. Think about what is the AI

[41:52 - 41:56]
agent equivalent to that company and

[41:54 - 41:59]
create

[41:56 - 42:01]
that. Finally, I want to talk about the

[41:59 - 42:02]
specific tech enabled innovations that

[42:01 - 42:04]
you can be working on right now. As

[42:02 - 42:06]
always, the AI industry is just moving

[42:04 - 42:07]
so quickly and there's so many new

[42:06 - 42:09]
technologies that are being developed

[42:07 - 42:11]
every day. But the major like

[42:09 - 42:13]
fundamental developments that we can see

[42:11 - 42:15]
right now in 2025 is that there's huge

[42:13 - 42:17]
leaps forwards in terms of voice and

[42:15 - 42:19]
audio. Audio generation is just freaking

[42:17 - 42:21]
unreal right now. Here's a little

[42:19 - 42:22]
excerpt for me to show you what I mean

[42:21 - 42:24]
from Sesame. This is actually from a

[42:22 - 42:25]
friend who showed me this and I was just

[42:24 - 42:29]
freaking like mind

[42:25 - 42:31]
blown. Hobbies to meet people. Well

[42:29 - 42:33]
joining a club or online community can

[42:31 - 42:35]
be really fun, especially if you're into

[42:33 - 42:37]
gaming or crafting. Volunteering is also

[42:35 - 42:39]
a great way to connect with awesome

[42:37 - 42:40]
people who care about the same things as

[42:39 - 42:42]
you. And hey, if you're watching this

[42:40 - 42:44]
don't forget to subscribe to Tina's

[42:42 - 42:46]
channel for more awesome tips. This is

[42:44 - 42:49]
also why OpenAI itself and its SDK has a

[42:46 - 42:50]
whole category dedicated to voice agents

[42:49 - 42:52]
because it is just so many use cases

[42:50 - 42:54]
that are enabled from that. There's also

[42:52 - 42:56]
massive developments in image models

[42:54 - 42:58]
like Rev, Gemini Flash image generation

[42:56 - 43:00]
as well as GPD40 image generation as

[42:58 - 43:02]
well. And there's also video models like

[43:00 - 43:04]
Sora. So, anything related to image and

[43:02 - 43:06]
video. These are all things that are

[43:04 - 43:09]
also ripe for

[43:06 - 43:12]
disruption. Now, ending this video with

[43:09 - 43:13]
a final general piece of advice. There's

[43:12 - 43:15]
always so much stuff that is happening

[43:13 - 43:17]
in his industry. If you ever feel

[43:15 - 43:19]
overwhelmed by what is happening, try to

[43:17 - 43:21]
relax, calm down, and think back to

[43:19 - 43:24]
these frameworks and components that I

[43:21 - 43:26]
presented today. There's a reason why I

[43:24 - 43:27]
created this video where I'm not just

[43:26 - 43:29]
showing you tutorials of things and just

[43:27 - 43:30]
telling you about the new like things

[43:29 - 43:31]
that people are building and the new

[43:30 - 43:33]
agents that people are building as well.

[43:31 - 43:35]
It's because like with all of this

[43:33 - 43:37]
that's going on, if you just focus on

[43:35 - 43:39]
understanding the fundamental

[43:37 - 43:40]
components, the fundamental frameworks

[43:39 - 43:42]
and the fundamental technologies

[43:40 - 43:43]
everything that comes on top of that

[43:42 - 43:45]
you're able to categorize in your mind

[43:43 - 43:47]
as it being actually important for you

[43:45 - 43:49]
to learn about or not important. So

[43:47 - 43:50]
keep up with the actual big innovation

[43:49 - 43:53]
in this category. Things like actual

[43:50 - 43:56]
model innovations. Gemini 2.5 Pro

[43:53 - 43:58]
recently came out, for example, MCP that

[43:56 - 43:59]
enables better tool use and a lot of the

[43:58 - 44:01]
other stuff. You don't really need to

[43:59 - 44:02]
pay so much attention to that hype. Keep

[44:01 - 44:04]
learning. Keep doing your own projects.

[44:02 - 44:06]
Build out your own AI agents. And when

[44:04 - 44:08]
the time comes, when the opportunity

[44:06 - 44:10]
comes where your skill set and your

[44:08 - 44:12]
interest, they align together with what

[44:10 - 44:13]
is in demand in the world right now.

[44:12 - 44:16]
You'll be off building a successful AI

[44:13 - 44:17]
agent business or startup or just side

[44:16 - 44:19]
hustle or fun project as well. Be

[44:17 - 44:21]
patient, my friend. All right, as

[44:19 - 44:23]
promised, here is the final little

[44:21 - 44:25]
assessment. Please write in the comments

[44:23 - 44:27]
your answers for these. Now, thank you

[44:25 - 44:29]
so much for watching to the end of this

[44:27 - 44:30]
very long, very intensive video. And I

[44:29 - 44:32]
really hope that it has been helpful and

[44:30 - 44:35]
I will see you guys in next video or

[44:32 - 44:35]
live stream.

## コメント

### 1. @TinaHuang1 (👍 38)
Leverage AI agents with the FREE Master AI Agents Playbook: https://clickhubspot.com/7002aa

> **@AlphaVideoEdit** (👍 0): Hey, I’m a pro video editor with 200+ 5-star reviews. I’d love to help polish your videos. Want a free test edit?

> **@BillionaireMoves-1** (👍 0): Brilliantly explained. You connected the dots in a way most don’t even attempt. If someone wants to understand AI agents, this is the video I’m pointing them to from now on.

### 2. @SinghBoys123 (👍 5)
This is the most comprehensive video I've seen on AI Agents. You're clearly knowledgeable and passionate, and it shines through. Sending this to everyone I know who's even remotely interested in AI agents.

### 3. @Sule-HeartEngineer (👍 33)
This video is the #1 BEST video on Youtube right now teaching AI agents. Great work, thank you so much Tina!!!

### 4. @DrCedrickInTech (👍 4)
Really appreciate how you demystify the AI agent-building process. It’s not just about automation, it’s about creating tools that extend what humans can do. This kind of practical depth is exactly what leaders need to shift from hype to hands-on results

### 5. @CharlieVinciTeam (👍 2)
this is honestly one of the best, most genuinely helpful videos I have ever watched. So impressed. Nice job Tina. Thank you.

### 6. @JoshGonsalves (👍 99)
This is the most comprehensive video I've seen on AI Agents. You're clearly knowledgeable and passionate, and it shines through. Sending this to everyone I know who's even remotely interested in AI agents.

> **@TinaHuang1** (👍 9): Thank you so much 🙏  I'm glad you found it helpful!

> **@linda_sue** (👍 0): Agreed!

> **@hugekins** (👍 1): It's fun technology to play with!  Now if can get the agents to battle each other, or decide on best interest of humans, aka Game Theory, that could be an option down the road.

### 7. @BillionaireMoves-1 (👍 1)
Hands down the clearest breakdown of AI agents I’ve come across. Your depth and clarity are unmatched. Sharing this with my entire team — this needs to be seen.

### 8. @BarieAI (👍 1)
Love how you make building AI agents seem like a skill anyone can master, not just rocket science or complex charts that overwhelm beginners. Always appreciate your calm and clear communication.

### 9. @renannoval (👍 0)
This was an absolutely fantastic video! Thank you so much for breaking down how to build AI agents in such a clear and easy-to-understand way. I've been wanting to get into this, and your 44-minute guide was the perfect starting point. Seriously grateful for this! Thanks Tina.

### 10. @cat-i4w1s (👍 103)
I kept seeing people online talking about Escape The Financial Matrix by Vince Drellar—saying it felt illegal to read, like it exposed secrets no one’s supposed to know. Curiosity got the best of me, so I checked it out. Now I understand why everyone was losing their minds. Escape The Financial Matrix by Vince Drellar really does feel like a cheat code.

> **@jethim007** (👍 0): Wait, is this an actual publicity from the author? Lol, weird place to put it

### 11. @lastochkoff (👍 465)
Building such AI agents is a game changer! I was able to build an agent for my startup AICarma

> **@BrianGiggs-g9w** (👍 0): Sounds cool man. Generally what does you AI agent do in your startup?

> **@nm3547** (👍 0): Did you have coding experience?

> **@palawirl** (👍 0): U doing ads in comments section? I just saw u in another similar video

### 12. @__mads__ (👍 0)
This channel is fantastic and every video tickles my cortex in just the right way, but I keep watching this one mostly because I love the thumbnail.

### 13. @johnorourke9860 (👍 1)
Excellent job, very concise and clear. Love the fact you are a visual person, giving rapid fire explanations!

### 14. @ericak5165 (👍 10)
I'm loving this video!! To answer your first knowledge checkpoint: 
Multi-agents (aka sub agents to the main agent) to act as specialist across our workflow framework.
 It's important to know the model components so that our use case is fully aligned with our MTKAGO (Model, Tools, Knowledge/memory, Audio/speech, Guardrails and Orchestration) to build our agents with confidence and accuracy (i.e. highly regulatory environment would benefit from an agent built with a static vs persistent memory more aligned with customer service chatbots)🤓

### 15. @BarieAI (👍 0)
Great video, Tina! It’s the clearest and most comprehensive breakdown of AI agents I’ve seen. Love how you made it beginner-friendly while covering all the essential details.

### 16. @AdswithTats (👍 14)
BANGER.

So refreshing to find someone with real technical knowledge and skills teaching this stuff. Can tell you worked at Meta. Thank you so much!

> **@deepsea1329** (👍 0): This is so useful for someone just getting started on AI agents.  Tysm

### 17. @TinaWalt-u7l (👍 2)
Tina, this is the best information I have studied from the web on AI. I have spent hundreds of hours watching Youtube videos, taking tutorials, experimenting and I always come back to you. What can I say? Another awesome "Tina". I put myself on your waitlist for the Bootcamp

### 18. @stephanieoloko7916 (👍 0)
The part I find most important is your advice because it can really be overwhelming. Thanks for this video. I learnt a lot. I'm off to build my own ai agent 😊

### 19. @Tibeaugosse_is_Making_Money (👍 15)
13:37 -


1. We have multi-AI agents to get a better results. If you give a complex tasks to one agent only it won't do a great job but with one agent for each tasks, three output will be much better.

2. Knowing the components of AI agents of a valuable asset to have. I like to think of it like Lego, if you know what each piece does, you can build a solid castle or a performing car. 

3. The memotechnique stands for : Models, Tools, Knowledge&memory, Audio&speech, Guardrails, Orchestration.


Thanks for easing the learning process for your viewer, you're one step ahead of everyone💪👌

### 20. @m1-6599 (👍 1)
Great video. Thanks!

Assessment on workflows and AI agent prompting:
How should you choose an agentic workflow pattern: Choose the simplest implementation for your use case. Do not overengineer.
What is an example of a routing use case: A customer service chatbot, directing requests to agents specialized on the topic the user request refers to.
What are the 6 components to include in an AI agent prompt: Role with tone and style - Task - Input - Output - Constraints - Capabilities and Reminders. In general you cannot evaluate and iterate over the prompt, so it must be as precise as possible.

