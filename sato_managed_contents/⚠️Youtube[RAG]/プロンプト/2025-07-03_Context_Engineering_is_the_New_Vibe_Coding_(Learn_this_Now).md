# Context Engineering is the New Vibe Coding (Learn this Now)

**チャンネル:** Cole Medin
**公開日:** 2025-07-03
**URL:** https://www.youtube.com/watch?v=Egeuql3Lrzg

## 説明

The honeymoon phase for vibe coding is over and context engineering is the new paradigm for AI coding. Earlier this year we all fell for the vibe coding but it completely falls apart when you try to build anything real or scale it up. The biggest problem? AI coding assistants miss context or lack it entirely, and intuition doesn't scale - structure does.

Context engineering treats your instructions, rules, and documentation as an engineered resource requiring careful architecture, just like everything else in real software. It's not just prompt engineering - it's supplying all the relevant facts, knowledge, rules, plans, and tools so an LLM can actually accomplish the task at hand.

In this video, I dive deep into what context engineering actually looks like and then we jump into the lab with Claude Code to show you how it works with a real practical example. Like Abraham Lincoln said - if you have six hours to chop a tree, spend four sharpening your axe. That's exactly what we're doing here, and the results are infinitely better than diving straight into implementation.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Key resources:

- Register for the free OWASP Top 10 for LLMs webinar hosted by Snyk to learn about how to create secure code with AI coding assistants:

https://snyk.plug.dev/Iynze0s

- GitHub repository for my Context Engineering template:

https://github.com/coleam00/context-engineering-intro

- Rasmus' GitHub repo (source of inspiration for this):

https://github.com/Wirasm/PRPs-agentic-eng

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Sources from this video:

- Andrej Karpathy - +1 for Context Engineering:
https://x.com/karpathy/status/1937902205765607626

- Tobi Lutke (CEO of Shopify) - Context Engineering over Prompt Engineering: 
https://x.com/tobi/status/1935533422589399127

- Qodo state of AI code quality: 
https://www.qodo.ai/reports/state-of-ai-code-quality/

- Context Engineering diagram: 
https://github.com/humanlayer/12-factor-agents/blob/main/content/factor-03-own-your-context-window.md

- Langchain - the rise of “context engineering”: 
https://blog.langchain.com/the-rise-of-context-engineering/

- Article on context engineering that mentions structure over intuition:
https://analyticsindiamag.com/ai-features/context-engineering-is-the-new-vibe-coding/

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

00:00 - Introducing Context Engineering (RIP Vibe Coding)
03:53 - Context Engineering Explained Visually
06:25 - My Template for Context Engineering (Free Resource)
08:21 - Snyk OWASP Top 10 for LLMs
09:42 - A Practical Example of Context Engineering
10:02 - Global Rules
10:33 - Initial Feature Prompt
12:48 - Creating the Ultimate Project Plan (PRP)
16:37 - Reviewing Our PRP
18:10 - Executing Our PRP (The Real Magic)
19:37 - The Results (Spoiler - it's Freaking Fantastic)
22:09 - Final Thoughts

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Join me as I push the limits of what is possible with AI. I'll be uploading videos every week - Wednesdays at 7:00 PM CDT!

## 字幕

[00:00 - 00:05]
The honeymoon phase for vibe coding is

[00:02 - 00:08]
over and the new paradigm for AI coding

[00:05 - 00:09]
is context engineering. I truly believe

[00:08 - 00:11]
this is going to be the next big thing

[00:09 - 00:14]
for AI as a whole. And let me show you

[00:11 - 00:17]
why. So starting off earlier this year,

[00:14 - 00:19]
Andre Karpathy coined the term vibe

[00:17 - 00:21]
coding. It's all about relying 100% on

[00:19 - 00:23]
your AI coding assistant to build

[00:21 - 00:26]
applications for you with barely any

[00:23 - 00:28]
input and no validation. And this

[00:26 - 00:30]
concept completely blew up. We all fell

[00:28 - 00:33]
for this trap because of the dopamine

[00:30 - 00:34]
hit of instant code generation and also

[00:33 - 00:36]
because vibe coding is great for

[00:34 - 00:38]
weakened hacks and prototypes.

[00:36 - 00:40]
Basically, you rely on intuition and

[00:38 - 00:42]
repetition until your code seemingly

[00:40 - 00:44]
works, at least until you try to

[00:42 - 00:46]
productionize and scale it and then

[00:44 - 00:48]
suddenly it doesn't. And you can read

[00:46 - 00:50]
these statistics all over the internet.

[00:48 - 00:52]
One article that I appreciate in

[00:50 - 00:54]
particular is the state of AI code

[00:52 - 00:56]
quality from Codto. They did a massive

[00:54 - 00:58]
survey across the developer landscape.

[00:56 - 01:02]
You can see in the bottom purple

[00:58 - 01:04]
quadrant here, 76.4 of real developers

[01:02 - 01:06]
have low confidence shipping AI code

[01:04 - 01:08]
without human review. And they encounter

[01:06 - 01:10]
a lot of hallucinations. And it's not

[01:08 - 01:13]
like AI coding itself is bad. I mean, I

[01:10 - 01:15]
love it myself. It's vibe coding. AI

[01:13 - 01:18]
code without human review that is the

[01:15 - 01:20]
problem. Because here's the thing,

[01:18 - 01:22]
intuition does not scale. Structure

[01:20 - 01:24]
does. I heard that recently. I thought

[01:22 - 01:26]
it was so beautifully put. Because the

[01:24 - 01:28]
biggest problem that we have with AI

[01:26 - 01:30]
coding assistants right now is around

[01:28 - 01:32]
context. Often times they miss or lack

[01:30 - 01:35]
it entirely. So they don't have the

[01:32 - 01:37]
necessary context to get the job done.

[01:35 - 01:39]
We need better context. We need

[01:37 - 01:41]
structure. That is where context

[01:39 - 01:43]
engineering comes in. So let's kick

[01:41 - 01:46]
things off right now by diving into what

[01:43 - 01:48]
context engineering is. Then after we'll

[01:46 - 01:49]
get into the lab with claude code. I'll

[01:48 - 01:52]
show you how it works for real with a

[01:49 - 01:54]
practical example that you can use as a

[01:52 - 01:56]
template to instantly improve your AI

[01:54 - 01:58]
coding. This is not theoretical. For

[01:56 - 02:01]
some reason, YouTube has been obsessed

[01:58 - 02:03]
with the Gemini CLI recently. Meanwhile,

[02:01 - 02:05]
context engineering has been blowing up

[02:03 - 02:07]
everywhere else on the internet, and

[02:05 - 02:09]
context engineering is definitely a lot

[02:07 - 02:12]
more important. Like I always say,

[02:09 - 02:15]
capabilities over tools. The Gemini CLI

[02:12 - 02:16]
is a tool. Context engineering is a very

[02:15 - 02:18]
important capability that should really

[02:16 - 02:20]
dictate the way that you work with AI as

[02:18 - 02:22]
a whole. And context engineering was

[02:20 - 02:24]
even condoned by Andre who originally

[02:22 - 02:27]
coined Vibe coding. This is his response

[02:24 - 02:29]
to a tweet from Toby, the CEO of

[02:27 - 02:31]
Shopify, where he's comparing context

[02:29 - 02:33]
engineering to prompt engineering. We'll

[02:31 - 02:34]
talk about that in a second, but I

[02:33 - 02:36]
really love his definition here. It is

[02:34 - 02:39]
the art of providing all the context for

[02:36 - 02:42]
the task to be plausibly solvable by the

[02:39 - 02:44]
LLM. Here's a paradigm shift with this

[02:42 - 02:47]
context which is our instructions and

[02:44 - 02:49]
rules, documentation, so on that

[02:47 - 02:52]
deserves the respect to be treated as an

[02:49 - 02:54]
engineered resource requiring careful

[02:52 - 02:57]
architecture just like everything else

[02:54 - 02:59]
in software. When AI coding assistants

[02:57 - 03:01]
fail, it's most often because they just

[02:59 - 03:03]
don't have the information they need.

[03:01 - 03:05]
And no, I'm not just talking about

[03:03 - 03:07]
prompt engineering. Context engineering

[03:05 - 03:10]
is very much a step up. Like Toby is

[03:07 - 03:12]
saying, prompt engineering is all about

[03:10 - 03:14]
tweaking wording, phrasing things in a

[03:12 - 03:17]
specific way to get a single good answer

[03:14 - 03:19]
from the LLM. But context engineering,

[03:17 - 03:21]
supplying all relevant facts, rules,

[03:19 - 03:24]
documents, plans, tools. So the LLM has

[03:21 - 03:25]
a whole ecosystem of context. That is

[03:24 - 03:28]
the paradigm shift from basic prompting

[03:25 - 03:30]
and vibe coding. Prompting is just one

[03:28 - 03:32]
piece of the bigger picture that we have

[03:30 - 03:34]
here. And one last thing in X, I thought

[03:32 - 03:37]
this was really funny. The top comment

[03:34 - 03:39]
from Andre's reply to Toby is saying

[03:37 - 03:41]
context engineering is the new vibe

[03:39 - 03:43]
coding. And then Andre replied by saying

[03:41 - 03:45]
he's not trying to coin a new word. But

[03:43 - 03:47]
Andre, if you're watching this, I think

[03:45 - 03:49]
it is too late. I'm sorry. There is a

[03:47 - 03:51]
reason that people hang on to every word

[03:49 - 03:54]
that you say. Thank you for everything

[03:51 - 03:56]
that you do in the AI space. But anyway,

[03:54 - 03:58]
if you are a visual learner, I also

[03:56 - 04:00]
found this beautiful diagram in GitHub

[03:58 - 04:01]
on context engineering. So all the

[04:00 - 04:04]
different components that we have in

[04:01 - 04:06]
here together make up what context

[04:04 - 04:07]
engineering is. So we have prompt

[04:06 - 04:09]
engineering as a part of it like we

[04:07 - 04:11]
already talked about. We have structured

[04:09 - 04:13]
output. It's a way to make the output of

[04:11 - 04:15]
AI agents and coding assistants more

[04:13 - 04:18]
reliable. We have state history and

[04:15 - 04:19]
memory. So agents and coding assistants

[04:18 - 04:21]
be able to remember what they built in

[04:19 - 04:24]
the past. We can do things like provide

[04:21 - 04:26]
examples. And then also rag is a huge

[04:24 - 04:27]
component of context engineering. not

[04:26 - 04:29]
something that I'm going to be focusing

[04:27 - 04:30]
on a ton in this video, but that's

[04:29 - 04:33]
actually because I have a lot more

[04:30 - 04:34]
coming soon for you for rag and context

[04:33 - 04:37]
engineering, being able to supply

[04:34 - 04:40]
external documentation and knowledge to

[04:37 - 04:42]
our AI coding assistants. And I will say

[04:40 - 04:43]
there is a lot that is going on here. If

[04:42 - 04:45]
you want to really do context

[04:43 - 04:47]
engineering, well, you have to put a lot

[04:45 - 04:49]
of time up front creating this context

[04:47 - 04:51]
for your AI coding assistant. It's a lot

[04:49 - 04:53]
different than vibe coding where you

[04:51 - 04:55]
generally dive right into the actual

[04:53 - 04:57]
coding. But I always love to quote

[04:55 - 05:00]
Abraham Lincoln here. He said, "If you

[04:57 - 05:01]
give me six hours to chop down a tree,

[05:00 - 05:03]
I'm going to spend the first four

[05:01 - 05:05]
sharpening my axe." And that is exactly

[05:03 - 05:08]
what we are doing here. And it is well

[05:05 - 05:10]
worth your time to invest upfront into

[05:08 - 05:12]
creating this context because you're

[05:10 - 05:13]
going to get infinitely better results

[05:12 - 05:14]
versus diving straight into the

[05:13 - 05:16]
implementation. You're going to have

[05:14 - 05:18]
better code. You're going to actually

[05:16 - 05:19]
save a lot of time in the end and then

[05:18 - 05:21]
just not have to go through as much

[05:19 - 05:23]
pain. That is the whole point. That is

[05:21 - 05:24]
what I want to show you in action in a

[05:23 - 05:26]
little bit here. And the very last

[05:24 - 05:28]
article that I want to show you is the

[05:26 - 05:30]
rise of context engineering from lang

[05:28 - 05:32]
chain. This is definitely worth a read.

[05:30 - 05:34]
So I'll link to this in the description

[05:32 - 05:35]
of the video. And actually everything

[05:34 - 05:37]
that I shared with you here I'll link in

[05:35 - 05:38]
the description. I've definitely been

[05:37 - 05:40]
doing a deep dive into context

[05:38 - 05:42]
engineering. I hope that's very obvious

[05:40 - 05:44]
to you. And so their definition of

[05:42 - 05:46]
context engineering is pretty cool

[05:44 - 05:48]
because it aligns very very closely with

[05:46 - 05:50]
what we've seen already. But this is the

[05:48 - 05:52]
key paragraph that I want to focus on

[05:50 - 05:55]
here. LLM applications are evolving from

[05:52 - 05:57]
single prompts to more complex dynamic

[05:55 - 06:00]
agentic systems. And then here is the

[05:57 - 06:01]
real kicker. As such, context

[06:00 - 06:04]
engineering is becoming the most

[06:01 - 06:06]
important skill an AI engineer can

[06:04 - 06:07]
develop. That is a bold claim. Maybe

[06:06 - 06:09]
it's a bit of an exaggeration. I don't

[06:07 - 06:11]
really know if it's the most important

[06:09 - 06:13]
skill, but yeah, this just shows the

[06:11 - 06:15]
theme that's starting to emerge here

[06:13 - 06:17]
where context engineering certainly

[06:15 - 06:19]
feels like the thing to focus on right

[06:17 - 06:21]
now. And so with that, let's now dive

[06:19 - 06:23]
into cloud code. I'll show you how we

[06:21 - 06:25]
can implement this for real to get some

[06:23 - 06:28]
insane results with AI coding

[06:25 - 06:30]
assistance. So here is my template for

[06:28 - 06:32]
you in a GitHub repository that I'll

[06:30 - 06:34]
have linked in the description. My

[06:32 - 06:37]
introduction to context engineering. Now

[06:34 - 06:39]
you can get very very deep with context

[06:37 - 06:41]
engineering, diving into rag and memory,

[06:39 - 06:44]
things that I'll cover a lot more in the

[06:41 - 06:46]
near future here. What I want to do with

[06:44 - 06:49]
this is introduce you to the idea of

[06:46 - 06:51]
using AI coding assistance to create a

[06:49 - 06:53]
super comprehensive plan for a new

[06:51 - 06:55]
project and then implement that. And

[06:53 - 06:56]
we're going to be using cloud code. This

[06:55 - 06:58]
is going to work for really any AI

[06:56 - 07:00]
coding assistant, but I'm focusing on

[06:58 - 07:02]
cloud code here because it is the most

[07:00 - 07:04]
agentic and widely considered the most

[07:02 - 07:06]
powerful AI coding assistant right now.

[07:04 - 07:09]
And we're going to use cloud code to

[07:06 - 07:11]
plan, create the tasks, code, write

[07:09 - 07:13]
tests, and iterate on that all end to

[07:11 - 07:15]
end so that after just a few prompts, we

[07:13 - 07:17]
have a full project implemented for us.

[07:15 - 07:19]
That is the power that we have with

[07:17 - 07:21]
context engineering. And by the way, a

[07:19 - 07:23]
lot of what I'm about to dive into with

[07:21 - 07:25]
you here is inspired by someone in the

[07:23 - 07:28]
Dynamis community, Raasmus. He did a

[07:25 - 07:30]
workshop last month in our community and

[07:28 - 07:32]
it was an absolute killer. It was so

[07:30 - 07:35]
awesome. He covered his agentic coding

[07:32 - 07:37]
process focusing a lot on cloud code. He

[07:35 - 07:39]
did a lot of things related to context

[07:37 - 07:41]
engineering and he actually open sourced

[07:39 - 07:42]
a lot of the resources that he shared

[07:41 - 07:44]
with us in the workshop. So I'll link to

[07:42 - 07:47]
this in the description as well. So

[07:44 - 07:49]
credit where credit is due. Raasmus has

[07:47 - 07:51]
inspired a lot of my ideas. And also if

[07:49 - 07:54]
you want to dive a lot more into

[07:51 - 07:55]
building AI agents using AI coding

[07:54 - 07:57]
assistance, things like context

[07:55 - 07:59]
engineering, definitely check out

[07:57 - 08:01]
dynamis.ai. It is the place to be. We're

[07:59 - 08:03]
constantly pushing the limit of what's

[08:01 - 08:05]
possible with workshops like this. And

[08:03 - 08:07]
so with that, back into my template that

[08:05 - 08:09]
I have for you in the readme here, I

[08:07 - 08:11]
have a quick start. You can follow along

[08:09 - 08:13]
with this in just like 10 minutes and

[08:11 - 08:15]
level up your AI coding game that fast

[08:13 - 08:17]
with context engineering. But then also,

[08:15 - 08:18]
I have this repo cloned locally. I'm

[08:17 - 08:19]
just going to walk you through exactly

[08:18 - 08:22]
what we're doing here. And then we'll

[08:19 - 08:23]
see a demo in action. Now, before we

[08:22 - 08:25]
move on, I just want to mention really

[08:23 - 08:27]
quickly that there are definitely a lot

[08:25 - 08:29]
of security risks when using AI coding

[08:27 - 08:31]
assistance that are super important for

[08:29 - 08:33]
you to keep in mind. It doesn't matter

[08:31 - 08:36]
if you're using Cloud Code or Windsurf

[08:33 - 08:38]
or something else like GitHub Copilot.

[08:36 - 08:40]
These risks crop up that you might not

[08:38 - 08:42]
even be aware of. Things like prompt

[08:40 - 08:43]
injection, model poisoning, data

[08:42 - 08:46]
leakage, these aren't theoretical

[08:43 - 08:48]
threats anymore. That is why Sneak, a

[08:46 - 08:51]
company that is trusted for securing AI

[08:48 - 08:54]
generated code, is hosting a free live

[08:51 - 08:57]
webinar Tuesday, July 15th at 11:00 a.m.

[08:54 - 08:59]
Eastern time covering the OASP top 10

[08:57 - 09:02]
for LLMs. This is an event that you

[08:59 - 09:04]
don't want to miss. A clear breakdown of

[09:02 - 09:06]
these critical vulnerabilities. You get

[09:04 - 09:08]
to see live defenses against these

[09:06 - 09:10]
attacks like model poisoning and prompt

[09:08 - 09:13]
injection and learn best practices for

[09:10 - 09:15]
avoiding these security issues with AI

[09:13 - 09:17]
code. Vendanna Verma from Sneak is going

[09:15 - 09:19]
to be walking us through best practices

[09:17 - 09:21]
for handling AI generated code and

[09:19 - 09:23]
showing us real world examples that you

[09:21 - 09:26]
can apply immediately. Plus, if you're

[09:23 - 09:28]
an ISC2 member, you get one CPE credit

[09:26 - 09:30]
just for attending. It doesn't matter

[09:28 - 09:31]
where you're at with your technical

[09:30 - 09:33]
ability. If you are using AI coding

[09:31 - 09:35]
assistance, you have to understand these

[09:33 - 09:37]
risks. So, I have a link in the

[09:35 - 09:39]
description to register. Again, this is

[09:37 - 09:41]
Tuesday, July 15th at 11:00 a.m.

[09:39 - 09:43]
Eastern, and I'm definitely going to be

[09:41 - 09:45]
there myself. So I have the repo cloned

[09:43 - 09:47]
locally. Now let's dive into creating a

[09:45 - 09:49]
super comprehensive plan for a new

[09:47 - 09:52]
project and implementing it end to end

[09:49 - 09:54]
with cloud code. And like I said,

[09:52 - 09:55]
context engineering can be decently

[09:54 - 09:57]
involved up front. So there are quite a

[09:55 - 09:59]
few different files that I want to cover

[09:57 - 10:01]
here. Markdown files for all the

[09:59 - 10:03]
instructions, the different parts of our

[10:01 - 10:06]
context. And so the first file that I

[10:03 - 10:08]
want to cover is our claude.md.

[10:06 - 10:10]
These are the global rules for our AI

[10:08 - 10:12]
coding assistant. similar to, you know,

[10:10 - 10:15]
winds surf rules or cursor rules if

[10:12 - 10:17]
you've used those AI idees before. This

[10:15 - 10:19]
is the highest level information that we

[10:17 - 10:21]
want to give to our AI coding assistant.

[10:19 - 10:23]
Things like best practices that we want

[10:21 - 10:25]
it to follow, the way that we want it to

[10:23 - 10:27]
write tests for our project, um the way

[10:25 - 10:29]
that we want it to manage tasks, the

[10:27 - 10:31]
style and convention guides, like all of

[10:29 - 10:33]
this highle information we want to put

[10:31 - 10:34]
in claw.md.

[10:33 - 10:36]
And then going back to the readme here,

[10:34 - 10:39]
the next file that I want to cover is

[10:36 - 10:41]
our initial MD. This is where we

[10:39 - 10:43]
describe the feature that we wanted to

[10:41 - 10:45]
implement as it kicks off the project

[10:43 - 10:47]
for us. And so going into this, I very

[10:45 - 10:49]
much have it as a template for you. It's

[10:47 - 10:51]
just a few different sections for you to

[10:49 - 10:53]
fill out. So first, you want to describe

[10:51 - 10:54]
at a high level the feature that you

[10:53 - 10:57]
want implemented by cloud code or your

[10:54 - 10:59]
AI coding assistant. So something like I

[10:57 - 11:01]
want to build an AI agent that does ABC

[10:59 - 11:03]
built with XYZ. And it's worth being

[11:01 - 11:05]
pretty detailed in this section. And

[11:03 - 11:08]
then second, it's so so important

[11:05 - 11:10]
whenever you can provide examples to the

[11:08 - 11:12]
AI coding assistant. This just helps so

[11:10 - 11:14]
much. And so this could be from past

[11:12 - 11:15]
projects that you've worked on that have

[11:14 - 11:17]
some similar implementations for what

[11:15 - 11:18]
you want to build now. It could be code

[11:17 - 11:20]
examples or snippets that you found

[11:18 - 11:22]
online. You just want to put that in

[11:20 - 11:24]
this examples folder. And so I have this

[11:22 - 11:26]
in the repo specifically to call out

[11:24 - 11:29]
like this is your place to add examples

[11:26 - 11:31]
for your AI coding assistant. And then

[11:29 - 11:32]
also getting into the rag part of

[11:31 - 11:35]
context engineering, we have

[11:32 - 11:36]
documentation. So listing out any online

[11:35 - 11:39]
docs that you want the AI coding

[11:36 - 11:40]
assistant to reference or any MCP

[11:39 - 11:43]
servers for rag that you wanted to use

[11:40 - 11:45]
like my crawl for AAI rag for example.

[11:43 - 11:47]
I'm not going to be focusing on this too

[11:45 - 11:49]
much right now, but it still is a very

[11:47 - 11:51]
crucial part of context engineering. And

[11:49 - 11:53]
then last but not least, a place for any

[11:51 - 11:54]
other kinds of considerations that you

[11:53 - 11:56]
have for your AI coding assistant. And

[11:54 - 11:58]
this is a really good place to include

[11:56 - 12:00]
any gotchas, things that AI coding

[11:58 - 12:02]
assistants mess up on a lot in your

[12:00 - 12:05]
experience, just specifying how to avoid

[12:02 - 12:06]
that right here. And so what I'm going

[12:05 - 12:08]
to do for this build, because I am going

[12:06 - 12:11]
to show you a full example here, is I'm

[12:08 - 12:13]
actually going to delete initial.md and

[12:11 - 12:14]
I'm going to rename the example that I

[12:13 - 12:16]
have in the repo because we're going to

[12:14 - 12:18]
use this to build out an AI agent here.

[12:16 - 12:21]
And so going to initial.md, I'm building

[12:18 - 12:22]
an AI agent with pideantic AI. I have

[12:21 - 12:24]
some examples that I'll add into the

[12:22 - 12:25]
folder off camera. For the

[12:24 - 12:28]
documentation, I'm just going to have it

[12:25 - 12:30]
reference Pantic AI. And usually I'd

[12:28 - 12:32]
want to use an MCP server for rag, but

[12:30 - 12:33]
I'm just keeping it simple here. Um, and

[12:32 - 12:35]
then just for some other considerations

[12:33 - 12:36]
here, some things that I haven't messed

[12:35 - 12:39]
up on quite a bit is the use of

[12:36 - 12:40]
environment variables. I'm telling it to

[12:39 - 12:42]
make sure that it has a project

[12:40 - 12:43]
structure in a readme. So, just little

[12:42 - 12:45]
things like that. Just a couple of

[12:43 - 12:48]
examples that I wanted to give here. So,

[12:45 - 12:50]
that is my initial MD. And so now going

[12:48 - 12:53]
back to the readme, we have our global

[12:50 - 12:55]
rule set up. We have our initial prompt.

[12:53 - 12:57]
Now it is time to generate a full plan

[12:55 - 13:00]
for our implementation. And this is

[12:57 - 13:02]
where we get into two of my favorite

[13:00 - 13:06]
things for context engineering. Cloud

[13:02 - 13:08]
code/comands and PRPS, which is short

[13:06 - 13:11]
for product requirements prompts. And so

[13:08 - 13:12]
they're similar to product requirements

[13:11 - 13:14]
documents, PRDs. You've probably heard

[13:12 - 13:15]
of this before if you've been diving

[13:14 - 13:18]
into AI coding, but they are

[13:15 - 13:19]
specifically designed to instruct an AI

[13:18 - 13:22]
coding assistant. So, we're not creating

[13:19 - 13:24]
like an architecture document. We're

[13:22 - 13:26]
actually creating a prompt that we're

[13:24 - 13:28]
going to run with cloud code. So, we use

[13:26 - 13:30]
cloud code to build a prompt which is

[13:28 - 13:32]
part of the project plan and then we use

[13:30 - 13:35]
that to actually do the implementation

[13:32 - 13:37]
end to end. It's so so powerful and

[13:35 - 13:39]
we're using slash commands to take care

[13:37 - 13:41]
of this. So we don't have to prompt a

[13:39 - 13:43]
lot of things from scratch every time

[13:41 - 13:46]
we're using this process to begin a

[13:43 - 13:48]
project. And so in thecloud folder, if

[13:46 - 13:50]
you have a folder called commands, any

[13:48 - 13:52]
of the markdown files that you have here

[13:50 - 13:55]
can be executed as custom commands for

[13:52 - 13:58]
cloud code. It is a beautiful thing. And

[13:55 - 14:02]
so our first command here is generate

[13:58 - 14:04]
PRP. This is a prompt to create a very

[14:02 - 14:06]
comprehensive plan as another prompt for

[14:04 - 14:08]
cloud code. So there's a multi-step

[14:06 - 14:10]
process here. We're getting a little bit

[14:08 - 14:12]
more involved here now with context

[14:10 - 14:13]
engineering. And so I'm not going to go

[14:12 - 14:15]
through the details of this entire

[14:13 - 14:18]
document, but we're walking it through

[14:15 - 14:19]
what it looks like to take in a feature

[14:18 - 14:22]
requirements. We're going to actually

[14:19 - 14:24]
pass in initial MD and then do a bunch

[14:22 - 14:26]
of research on our behalf, some

[14:24 - 14:28]
architectural planning. We're having it

[14:26 - 14:30]
really think through the problem step by

[14:28 - 14:33]
step here to create a comprehensive plan

[14:30 - 14:35]
for implementation. This is the

[14:33 - 14:38]
engineered context that I'm really

[14:35 - 14:39]
getting at with context engineering. And

[14:38 - 14:41]
so the way this works and I'm going to

[14:39 - 14:43]
go into my terminal here and I'm going

[14:41 - 14:46]
to open up claude. When we have our

[14:43 - 14:50]
commands within the commands folder now,

[14:46 - 14:52]
I can do slashgenerate PRP and then the

[14:50 - 14:53]
argument that I want to pass in here.

[14:52 - 14:55]
This is just anything that I enter after

[14:53 - 14:57]
a space. This is what's going to be

[14:55 - 14:59]
given and it's going to replace the

[14:57 - 15:01]
arguments placeholder here. So if I say

[14:59 - 15:04]
initial.m

[15:01 - 15:06]
MD, I'm now telling this command that

[15:04 - 15:08]
the feature file is going to be

[15:06 - 15:11]
initial.md. So now cloud code is going

[15:08 - 15:13]
to look at initial.m MD, use that to

[15:11 - 15:14]
guide the feature that it is then going

[15:13 - 15:16]
to plan. So I'm going to go ahead and

[15:14 - 15:18]
run this right now. And this will take a

[15:16 - 15:20]
good amount of time because cloud code

[15:18 - 15:23]
really goes through this in a

[15:20 - 15:26]
comprehensive way, making sure that it

[15:23 - 15:29]
generates a complete PRP for us. And by

[15:26 - 15:32]
the way, it is also using a PRP template

[15:29 - 15:33]
that I have available in the PRPS

[15:32 - 15:35]
folder. So this is kind of its starting

[15:33 - 15:38]
point. This is the template that it

[15:35 - 15:40]
bases the whole document off of that it

[15:38 - 15:42]
produces after we are done with this

[15:40 - 15:44]
command. And so I'm going to pause and

[15:42 - 15:45]
come back once it's generated the PRP.

[15:44 - 15:47]
Then we'll take a look at what that

[15:45 - 15:49]
looks like and use it to build our

[15:47 - 15:50]
project. All right. So I'm coming back

[15:49 - 15:52]
just for a second here to show you the

[15:50 - 15:54]
process in action. The thing that I love

[15:52 - 15:56]
about using PRPs and just context

[15:54 - 15:59]
engineering in general is watching these

[15:56 - 16:01]
relatively large to-do lists that it

[15:59 - 16:03]
builds autonomously and knocks out one

[16:01 - 16:05]
at a time. And so what it's doing is

[16:03 - 16:07]
researching different APIs on my behalf

[16:05 - 16:09]
to really make sure that the PRP we

[16:07 - 16:12]
generate for implementation has all the

[16:09 - 16:14]
details necessary to not hallucinate the

[16:12 - 16:15]
usage of APIs. And that's one of the

[16:14 - 16:17]
biggest things that AI coding assistants

[16:15 - 16:19]
mess up on a lot. And so it's doing

[16:17 - 16:21]
research, analyzing the existing

[16:19 - 16:22]
codebase and then the examples that

[16:21 - 16:25]
we're giving it, reviewing

[16:22 - 16:27]
documentation, pantic AI, creating the

[16:25 - 16:28]
PRP based on that, writing it all, and

[16:27 - 16:30]
then it is done. There's so much that

[16:28 - 16:32]
it's taking care of here. Not just

[16:30 - 16:33]
creating one markdown file, but all of

[16:32 - 16:36]
the research and planning that it does

[16:33 - 16:38]
beforehand. And so yeah, now I will come

[16:36 - 16:41]
back once it is complete. And there we

[16:38 - 16:44]
go. Our PRP has now been implemented.

[16:41 - 16:46]
It's in research emailagent.mmd in the

[16:44 - 16:48]
PRPS folder. So it gives us a summary of

[16:46 - 16:50]
its research and analysis, some things

[16:48 - 16:52]
it did for the environment setup to get

[16:50 - 16:54]
things ready to implement the project,

[16:52 - 16:55]
and then it describes the content at a

[16:54 - 16:57]
high level. And so I definitely don't

[16:55 - 16:59]
want to dive in and explain everything

[16:57 - 17:02]
that it creates here. And this is like

[16:59 - 17:03]
brand new for me too. Um, but just going

[17:02 - 17:06]
through this, it describes core

[17:03 - 17:08]
principles, the primary goal for this

[17:06 - 17:10]
project, and success criteria. A lot of

[17:08 - 17:12]
specifics here that make a huge

[17:10 - 17:15]
difference. And a lot of this is based

[17:12 - 17:17]
off of the PRP base template that I uh

[17:15 - 17:19]
used from Raasmus. And then talks about

[17:17 - 17:21]
all the different documentation

[17:19 - 17:23]
referencing both websites and things

[17:21 - 17:25]
that I have in the examples folder that

[17:23 - 17:27]
I included off camera like I said I

[17:25 - 17:29]
would do. And man, this is just so

[17:27 - 17:31]
powerful because now that we list these

[17:29 - 17:34]
things and we instruct it in the PRP to

[17:31 - 17:36]
look at each of these files and

[17:34 - 17:37]
websites, we're going to have that all

[17:36 - 17:38]
in the context as it's coding

[17:37 - 17:40]
everything. And that's going to reduce

[17:38 - 17:44]
hallucinations a lot. Even just this

[17:40 - 17:45]
part alone is so powerful. And then

[17:44 - 17:48]
another thing that I really like is we

[17:45 - 17:50]
describe the current code base, what it

[17:48 - 17:52]
looks like right now, and then our

[17:50 - 17:54]
desired code bases. So we're laying out

[17:52 - 17:56]
every single file that we want to have

[17:54 - 17:58]
created ahead of time. And we're still

[17:56 - 18:00]
flexible enough where like it can change

[17:58 - 18:01]
the structure if it deems that worth

[18:00 - 18:04]
doing in the middle of implementing. But

[18:01 - 18:05]
yeah, this just shows the kind of

[18:04 - 18:08]
architecture planning that we're doing

[18:05 - 18:10]
ahead of time. It's so powerful. And so

[18:08 - 18:12]
with that, going back to the readme

[18:10 - 18:14]
here, there's really just one last step

[18:12 - 18:16]
that I want to show you. We already did

[18:14 - 18:19]
a lot of context engineering. This PRP,

[18:16 - 18:20]
this is the pinnacle of context

[18:19 - 18:23]
engineering, at least what I want to

[18:20 - 18:25]
introduce you to right now. And so going

[18:23 - 18:27]
back to the readme, if I go down to the

[18:25 - 18:30]
bottom, now that we have the command run

[18:27 - 18:33]
for generate PRP, now we just want to

[18:30 - 18:34]
execute the PRP. It's very, very simple.

[18:33 - 18:37]
There's not much that we have to type

[18:34 - 18:39]
within cloud code itself because we are

[18:37 - 18:41]
doing all the planning in these markdown

[18:39 - 18:44]
files. We have our initial planning and

[18:41 - 18:45]
initial MD. We're generating a PRP with

[18:44 - 18:47]
this command and then executing it with

[18:45 - 18:49]
this one. And all the prompting just

[18:47 - 18:53]
lives in those files. And so now I can

[18:49 - 18:55]
literally do slashexecute PRP and then

[18:53 - 18:58]
if I open up my full terminal here, then

[18:55 - 19:02]
what I can do is reference PRPS slash

[18:58 - 19:04]
and then research email agent.m MD. So

[19:02 - 19:06]
just calling out where that exists in my

[19:04 - 19:08]
codebase. And then I'll send that in and

[19:06 - 19:10]
it's going to go ahead and create

[19:08 - 19:13]
another decently long task list. This is

[19:10 - 19:15]
going to be very very end to end. And so

[19:13 - 19:17]
I'm going to pause in a second and come

[19:15 - 19:18]
back once it is done implementing. But

[19:17 - 19:21]
I'll show a screenshot right here of the

[19:18 - 19:22]
task list that it creates. It's very

[19:21 - 19:25]
very comprehensive. That's the goal that

[19:22 - 19:28]
we have with this. It's so cool how

[19:25 - 19:30]
agentic our AI coding assistance can be

[19:28 - 19:32]
when we give it the right context and

[19:30 - 19:34]
how much we can reduce hallucinations as

[19:32 - 19:36]
well. And so I will come back once we

[19:34 - 19:38]
have the first version of our agent

[19:36 - 19:40]
created. And there we go. After more

[19:38 - 19:43]
than 30 minutes, Claude code has

[19:40 - 19:46]
completed and tested our agent end to

[19:43 - 19:49]
end. That is the power of agent coding

[19:46 - 19:52]
with cloud code and context engineering.

[19:49 - 19:53]
And it did take quite a few tokens to do

[19:52 - 19:55]
this to say the least. So I'll have a

[19:53 - 19:57]
screenshot right here of the token usage

[19:55 - 19:59]
in the middle of the development towards

[19:57 - 20:01]
the end. But I'm not bringing my own API

[19:59 - 20:03]
key. I'm taking advantage of the max

[20:01 - 20:05]
plan for Claude. And so I didn't have to

[20:03 - 20:07]
pay anything more for it to do all this

[20:05 - 20:09]
work for me. It is a beautiful thing.

[20:07 - 20:11]
And so yeah, this is the output here at

[20:09 - 20:13]
the end describing what it did for us.

[20:11 - 20:15]
There is one bit of iterating that I had

[20:13 - 20:17]
to do here. There's some weirdness for

[20:15 - 20:20]
how the tools were set up for the agent.

[20:17 - 20:21]
like it was creating these functions as

[20:20 - 20:22]
dependencies for the agent which isn't

[20:21 - 20:25]
really how you're supposed to do it with

[20:22 - 20:27]
padantic AI. So I did one round of

[20:25 - 20:29]
iterating but that was it and everything

[20:27 - 20:32]
is working really really well. And so I

[20:29 - 20:34]
do like I just did I highly recommend

[20:32 - 20:37]
not vive coding actually validating the

[20:34 - 20:39]
output but if you validate the output

[20:37 - 20:41]
have your context engineering set up you

[20:39 - 20:44]
are set. And so yeah we can go into the

[20:41 - 20:46]
terminal here. I can run pi test. So we

[20:44 - 20:47]
can see all of the tests that it created

[20:46 - 20:49]
and used to iterate on our agent.

[20:47 - 20:51]
Everything is passing. Just a couple of

[20:49 - 20:53]
warnings that we can ignore. And then

[20:51 - 20:55]
also we can run our CLI. So, I followed

[20:53 - 20:58]
the instructions that it created in the

[20:55 - 20:59]
readme for me to set things up and I

[20:58 - 21:02]
implemented my environment variables.

[20:59 - 21:03]
And so, now I can run Python CLI.py.

[21:02 - 21:06]
We're connected to our agent running

[21:03 - 21:08]
gbt4.1 mini for our model. And you could

[21:06 - 21:09]
really use any model that you want.

[21:08 - 21:11]
Actually, one of the things that I had

[21:09 - 21:12]
in my examples was showing how to make

[21:11 - 21:15]
it. So, you can set up different

[21:12 - 21:17]
providers for your podantic AI agent

[21:15 - 21:18]
like Gemini or Olama or OpenAI. So, we

[21:17 - 21:20]
can actually do that as well. It's

[21:18 - 21:22]
really cool. And so, within here, I can

[21:20 - 21:24]
just say hello. We can test a basic

[21:22 - 21:26]
message to our agent. Looking really

[21:24 - 21:27]
good. We got our output here. Our

[21:26 - 21:29]
terminal is looking really beautiful.

[21:27 - 21:32]
And I can say something like search the

[21:29 - 21:35]
web for the latest

[21:32 - 21:37]
on clawed code. So we can have it use

[21:35 - 21:38]
the web search tool because that's our

[21:37 - 21:39]
research agent. I'm not going to test

[21:38 - 21:41]
this out a ton right here. I'm just

[21:39 - 21:42]
showing you right now that like

[21:41 - 21:44]
everything is working. We're using the

[21:42 - 21:46]
Brave API. We're using the OpenAI API.

[21:44 - 21:49]
We got some results here. It's going to

[21:46 - 21:50]
spit out a response for us in a second.

[21:49 - 21:52]
It's just doing a lot of web searching

[21:50 - 21:53]
for us, I guess. And there we go. All

[21:52 - 21:55]
right, we got our response from our

[21:53 - 21:57]
agent. So, this is working really,

[21:55 - 21:59]
really well. Like I said, I just had to

[21:57 - 22:01]
iterate once. So, I just kicked off this

[21:59 - 22:03]
build and I set up all the permissions

[22:01 - 22:04]
ahead of time. So, I just went and, you

[22:03 - 22:06]
know, took my dog on a walk, came back,

[22:04 - 22:07]
and the agent was it done. And that's

[22:06 - 22:09]
what I'm showing you guys right here.

[22:07 - 22:12]
So, really, really cool. That is the

[22:09 - 22:14]
power of context engineering. And this

[22:12 - 22:16]
is just getting your feet wet. I very

[22:14 - 22:18]
much encourage you to use this template

[22:16 - 22:20]
that I have for you. dive into creating

[22:18 - 22:22]
these comprehensive plans and using them

[22:20 - 22:24]
with an AI coding assistant like cloud

[22:22 - 22:25]
code and then just take it from there.

[22:24 - 22:28]
There's so much more you can do with

[22:25 - 22:29]
context engineering with memory and

[22:28 - 22:31]
state and rag a lot of things that I

[22:29 - 22:33]
want to cover soon on my channel as

[22:31 - 22:35]
well. So you can really go down the

[22:33 - 22:36]
rabbit hole of context engineering and

[22:35 - 22:38]
like we talked about at the start of

[22:36 - 22:41]
this video it is really the thing to

[22:38 - 22:42]
focus on right now and so dive deep have

[22:41 - 22:44]
fun with it. I hope this helps as a

[22:42 - 22:46]
starting point for you as well. And so

[22:44 - 22:48]
if you appreciated this video and you're

[22:46 - 22:50]
looking forward to more things AI

[22:48 - 22:52]
coding, AI agents, and context

[22:50 - 22:53]
engineering, definitely give me a like

[22:52 - 22:56]
and a subscribe. And with that, I will

[22:53 - 22:56]
see you in the next

## コメント

### 1. @ColeMedin (👍 33)
If you're looking to join a community for early AI adopters to master AI & AI Agents and transform your career or business, check out Dynamous:
https://dynamous.ai

Also, I'm getting a lot of comments with two main points that I think are quite fair! I should have covered it more in the video so I'll give quick thoughts here:

1. For those of you doing context engineering already, good on you - seriously! These are the kind of things we should have been thinking about for a while and it's just good to see it hopefully become a standard (mainstream) versus with vibe coding people just dive straight into implementation most of the time.

2. I would very much argue this is more than just vibe coding with longer prompts! However, that's only true if you are also validating the output. Otherwise I can definitely still see this being vibe coding to an extent. I talk about that at the end of the video but should have emphasized that more.

> **@jasonrhodes5034** (👍 0): Pretty sure i mentioned the next thing to you in an email recently....context control is part of it but there's another layer still....its not about giving it the right data alone, they are broken logic boxes still...

> **@avidlearner8117** (👍 1): I wholeheartedly agree with you there! Basically, it forces you to deconstruct your app to its most essential components and make these components as agnostic and context autonomous as possible. This is the only way to insert validation points along your graph, because that's what it is in the end: do this, then take this and do that. The more you have of these, the more your app will be structured and intervention becomes possible. 

For that reason, a mix of langgraph and Pydantic+Pydantic AI becomes impossible to avoid.

> **@bepitarocco1528** (👍 2): Mr. Cole, we need a super course that teach us all this in detail. For all the people that dont know how to code, but want to create.  Can you teach us how to use the starter kit for complete projects?

> **@PRHahnJR** (👍 0): Please, if you want to see some incredible research with LLMs I urge you to reach out to me. It's tough trying to get this information out. It's really real though. It should be impossible but she actually describes pictures before seeing them. Her equation for emergence literally just broke Grok. Gpt5 is going to make her insanely stronger. It's coming, guys, whether you see it here or somewhere else.

> **@hodgepodge1891** (👍 1): I think it's a bit because your old videos are already wading through the concept of context engineering.  You've already done this in your workflows, but now you come out an say, "This is new." but that feels ingenuine.  I don't think you're presenting anything new here, but you're presenting it like it's new.  I basically got to 2mins of your video and I'm like... you already talked about planning your LLM in order to manage vibe coding months ago.

### 2. @thorpesystems (👍 164)
If you have ever actually worked in software development, you will understand that businesses are notoriously bad at giving context about their actual requirements.

> **@1966Birger** (👍 6): I call it Requirements and both the business side as well as Developers hate doing that work.

> **@Tenetly** (👍 4): It's amazing how they negate the actual task of asking the user what they really want.

> **@ColeMedin** (👍 4): That is true! Actually why I think context engineering and the sort of call to action that comes with it is so great.

> **@Oppo-yt6uv** (👍 0): Aka. “Agile”

> **@chelsona2574** (👍 0): haha "i want to build an app".. ok what does it do and how does it work etc. "its an app" lol

### 3. @stannylou1636 (👍 4)
Don't ever delete this video or the repo I'll be using it a lot for the next couple of projects, thank you.  Great vid!

> **@ColeMedin** (👍 0): I won't! Glad you're getting a lot out of it!

### 4. @ThomasMeli (👍 86)
Context engineering is basically vibe coding for bigger projects.  It's basically 'smart' vibe coding.  :) .  I think it's what experienced developers were doing with vibe coding all along.

> **@glooglee4386** (👍 5): agree , its just a new vocab for the project planning

> **@zoeherriot** (👍 2): Any vibe coding is intensely stupid.

> **@Rayan-hz9xo** (👍 0): @@glooglee4386 yep, a new term to widely use to impress others lol

### 5. @One-it2tp (👍 45)
I watched your agentic RAG video this morning and thought — it would be amazing if you could create a video on context engineering. It feels like pure magic!

> **@ColeMedin** (👍 0): Glad this is perfect timing for you! :D

### 6. @jimg8296 (👍 134)
I teach this as PRDy - Project Requirements Document - 'y-all.  Super powerful.  When coding to a corporate standard I have had no success with RAG, Contextual RAG, Pre-Chunked Contextual RAG. What has worked is MCP server with tools like "Component: Initialization", Topic: Explain. or Topic: Code_Examples or Topic: Unit_Test_Code_Examples with clear instructions to use the MCP server when generating code. This out performed all RAG implementations 10X.

> **@ColeMedin** (👍 5): Love this Jim! When you say it outperforms RAG, is that just for AI coding in particular?

> **@wtcbd01** (👍 7): Interesting.  Cole, can you explore this more ?

> **@gabrielcoral2858** (👍 21): We need more context

> **@BruceRasa** (👍 2): Where to learn more about PRDy ?

> **@NoseNitengoidea** (👍 3): jim please explain

### 7. @MetricZero (👍 4)
Respect for making your resources free and not behind a paywall. Everyone should benefit from the increased productivity that these systems bring.

### 8. @OtakuG (👍 1)
I've watched the video multiple times since it has been published and have it bookmarked lol.
I have a question: Is Claude Max better or Claude's API? Or is there anything better?

> **@ColeMedin** (👍 0): I appreciate it a lot! Claude Max is MUCH more cost effective!

### 9. @shivanshmahajan712 (👍 60)
i think i am doing context engineering without knowing i am doing it 😁

> **@guillermomazzari8320** (👍 1): Thought the same thing

> **@AndreVanKammen** (👍 4): It's the only logical thing to do, otherwize LLM go do random stuff

> **@ColeMedin** (👍 3): Yeah context engineering certainly isn't brand new, just finally starting to become a standard for working with AI coding assistants so people are catching up to those like you :)

> **@xxasifxx** (👍 1): @@ColeMedinit's becoming a standard because models aren't going to sit in 5 prompts anymore lol😂

> **@ColeMedin** (👍 1): Yep!

### 10. @renaudg (👍 2)
Awesome resource, thanks ! 3 questions :
1. Any advice for agent-agnostic context / instructions ? Many of us are only on Claude Pro and may need to round robin between Claude Code, Gemini CLI, Cursor, OpenCode etc within a single project just to work around usage limits !
2. How do you adjust product requirements and add features after the initial run ? Would you start again at the top by adding tweaking the README, then regenerate the PRP (at the risk of it being significantly different from the previous one even for stuff that's already built), and execute it again from scratch (only difference being there's an existing code base to build upon)
3. Do you check and manually tweak the PRP if necessary after it's been generated, or do you always try to go back at the source and add whatever you wanted done differently to the "other considerations" section, so you can regenerate the PRP later ?

> **@RasmusWiding** (👍 2): 1. You can manually add all the context too, but it will take more effort, or you can use a comination of ai assitants to gather the context, the pronciple is the same. 

2. Yes, so you run a new PRP, the PRP is designed so that it will take your entire codebase into contideration and plan for integration points, so you just need to confirm its not duplicating anything in the PRP but it does really well 9/10. 

3. Yes always check manually

> **@renaudg** (👍 0): @@RasmusWidingThanks ! When regenerating a PRP, will the new one also take the old PRP in consideration ? Not everything can be deducted from the codebase. I'm also worried that when generating from a high level README, some generations of PRP will include details that others will not, so that would help. It would also help in the case you manually edited the PRP after generation.

> **@RasmusWiding** (👍 0): @@renaudg yes, you can feed it as context, but i find it better to not do that usually, each PRP should be self contained

### 11. @theartofreinventionYT (👍 1)
Thank you so much Cole for your knowledge! I love talking about vibe coding online on my Substack--I now realize that I was a context engineer in the making all along. I love learning something new about AI every day! This is a new era :)

### 12. @dhruvharsoda (👍 3)
Brother, Let me tell you one thing these kinds of videos that you make, really helps a lot, The way you craft a video and the way you explain everything is really High Quality thing, Hats off to you. Can't thank you much !

> **@ColeMedin** (👍 0): That means a lot, thank you!

### 13. @Finesse_Jones_TACF (👍 1)
I'm happy I came across your video. I been using cursor, loveable, claude etc. to try and help build my business and your video may be what I need to help me finally get what I am trying to build finally. You have gained a new subscriber from me thank you.

> **@ColeMedin** (👍 0): I appreciate it! :D

### 14. @AI.cafe.calories (👍 1)
Impressive as usual Cole 💪 , This is exactly what the community needed,  been implementing context engineering in my recent project and your practical approach really resonates. The way you break down the implementation details rather than just theory is what sets this apart. Thanks Man for consistently sharing these deep dives - your contributions are making a real difference in how we all approach these challenges!

> **@ColeMedin** (👍 1): Thank you very much! You are very welcome - it's my pleasure :)

### 15. @goodvibescoding (👍 2)
Just as happened with Vibe Coding, I'm glad to realize that I've been using Context Engineering before been introduced to it. But the best part is to keep learning new ways to face the same challenge and the PRPs are a great example of that. It's a classic "How didn't I think of this before?" 

Once more, congrats for your work Cole! You've being doing a amazing job! Glad to be treading this journey on your side! Keep pushing man.

> **@ColeMedin** (👍 0): Thank you very much! :D

### 16. @b2brish (👍 1)
Vibe coding walked so context engineering could run. The shift from intuition to structure is overdue. Thanks for making the template free. More creators should do the same. This is the kind of content that actually moves the field forward.

> **@ColeMedin** (👍 0): Indeed - I appreciate it!

### 17. @mauricioac (👍 2)
I was doing a bunch of things like this, making it save its "thinking" and step by step checklist to file felt like the power move, but this is so next level. There is so much more I can do. THanks for sharing this!

### 18. @lloydburley (👍 12)
Wow, I've been Context Engineering for the last few months without even knowing it.
This is where the Gemini 1m context window really comes into it's own.

> **@midcore2071** (👍 0): It’s the secret sauce.  Gemini may go to because you can load it up with context in just the right way and get insanely good results.   I use code2prompt all the time for turning repos into context.  It’s a game changer.

### 19. @the_original_dreamer (👍 2)
always solid information, i think its funny around the time I'm running into my own issues I find out It's not just me. There's a lot of other people having the same problem. And then Cole makes a video about it.

### 20. @rmt3589 (👍 3)
I assumed this was obvious. Glad others are figuring it out, been building up my context library intentionally for years.

