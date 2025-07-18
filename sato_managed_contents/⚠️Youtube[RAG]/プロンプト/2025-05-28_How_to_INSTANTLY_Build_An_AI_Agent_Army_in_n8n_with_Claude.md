# How to INSTANTLY Build An AI Agent Army in n8n with Claude

**チャンネル:** Mark Kashef
**公開日:** 2025-05-27
**URL:** https://www.youtube.com/watch?v=u2NluvotA80

## 説明

🚀 Gumroad Link to Assets in the Video: https://bit.ly/3Z5NlQB
🤖 Join My Community for Exclusive Content ➡ https://bit.ly/3ZMWJIb
 📅 Book a Meeting with Our Team: https://bit.ly/3Ml5AKW
 🌐 Visit Our Website: https://bit.ly/4cD9jhG

Imagine spinning up an entire fleet of specialized AI agents with just a single natural-language prompt. In this deep-dive, step-by-step tutorial, I show exactly how to build your own "Agent Army" using Claude Opus 4 and n8n’s powerful Tools-Agent nodes—no coding required. Follow along as we craft a master Orchestrator agent and specialized sub-agents designed to seamlessly handle tasks like trip planning, real-time condition updates, sustainability tracking, lodge coordination, and booking management. You'll watch me generate fully importable JSON workflows, connect them to robust live APIs (OpenAI, Anthropic, SerpAPI, OpenWeatherMap, payment gateways, Google Sheets), and implement sophisticated elements such as memory management, error-handling logic, and success callbacks, all effortlessly.

Throughout this tutorial, you'll learn essential AI automation concepts including design patterns for effectively chaining AI models to deterministic services, best practices for managing rate limits, and my personal technique for rapidly regenerating broken workflow nodes. See firsthand how a single chat message can cascade through multiple agents in seconds, dynamically returning detailed itineraries, safety alerts, carbon-footprint analyses, and real-time booking confirmations. By the end of this video, you'll walk away with downloadable workflows, a versatile and reusable prompt template, and a clear roadmap for leveraging large-language models to build revenue-generating automations—perfect for entrepreneurs, agencies, or enterprise teams eager to scale operations effortlessly.

⏳ TIMESTAMPS:
 
00:00 - Opening: Building Agent Army from One Prompt
00:40 - Two Methods: Claude Project vs Direct Chat
00:56 - Live Demo Proof of Concept
01:23 - Claude 4 Opus + Extended Thinking + Web Search
01:40 - 5-10 Minute Generation Process
02:09 - Copy-Paste Import into n8n
02:45 - Creating Specialized Subworkflows
03:22 - Multi-Level Agent Architecture
03:38 - Dynamic Model Selection
04:02 - Why This Works: Claude 4 Capabilities
04:31 - n8n Workflows Background
05:10 - AI Agent Module: LangChain Framework
06:08 - Tool Restrictions: What AI Agents Can/Cannot Use
06:52 - Claude's Tool Understanding Limitations
07:26 - Core Challenge: Creating Compatible Tools
08:18 - Master Prompt Breakdown
08:55 - 100% Valid JSON Requirement
09:33 - Two-Stage Process Explained
10:03 - Tool Verification: Real APIs Only
10:22 - Avoiding Fictional API Problem
10:55 - Why Start with Three Agents
11:54 - 2-3 Tools Maximum per Agent
12:07 - Success/Error Handling Setup
12:49 - Prompt Engineering Strategy
13:37 - Three Business Examples Introduction
13:45 - Flexiflow Studios: TikTok Agency
14:19 - Claude Project Components
14:30 - agents_tools.json: The Golden Nugget
15:26 - The Cheat Code Concept
15:30 - Asana Example: Tool Limitations
16:28 - Real Business Tools vs Limited Options
16:56 - Creating Custom Knowledge Base
18:02 - Flexiflow Studios Implementation
18:40 - Three Generated Agents Demo
19:00 - Import Process Walkthrough
20:20 - Pet Pal Concierge Example
20:34 - Emergency Care & Provider Management
22:00 - Chaos Coffee Co: 15 Coffee Shops
22:25 - Inventory & Recipe Innovation Agents
23:29 - Wrap-up: 0 to 80% Creation
23:42 - Resource Access Information
24:04 - Community Exclusive Content

#AIautomation #ClaudeOpus4 #n8n #WorkflowAutomation #AgentArmy #PromptEngineering #AIforBusiness #OpenAI #Anthropic #APIAutomation #NoCodeAI #TravelAutomation #BusinessEfficiency #AIintegration #AgentSystems

## 字幕

[00:00 - 00:04]
Imagine building an entire army of

[00:02 - 00:06]
agents from just one prompt. In this

[00:04 - 00:09]
video, I'm going to show you exactly how

[00:06 - 00:11]
to use the new Cloud 4 Opus to instantly

[00:09 - 00:13]
generate an entire set of workflows.

[00:11 - 00:16]
You'll see firsthand how easy it is to

[00:13 - 00:18]
spin up a master orchestrating agent

[00:16 - 00:21]
create specialized subworkflows that

[00:18 - 00:24]
report to that agent, and lastly, adding

[00:21 - 00:25]
tools dynamically to those sub agents

[00:24 - 00:27]
without you writing a line of code

[00:25 - 00:30]
yourself. And here's the craziest part.

[00:27 - 00:32]
This entire process will only take

[00:30 - 00:34]
minutes from start to finish. I'm going

[00:32 - 00:36]
to walk you through step by step on the

[00:34 - 00:38]
fastest way to build sophisticated agent

[00:36 - 00:40]
systems, even if you're completely new

[00:38 - 00:41]
to automation. Let's dive in. All right

[00:40 - 00:44]
so we're going to tackle two different

[00:41 - 00:47]
ways to assemble your agent army. Both

[00:44 - 00:48]
involve only one prompt each, but one of

[00:47 - 00:49]
them is going to use a cloud project

[00:48 - 00:52]
and one of them we're going to just send

[00:49 - 00:53]
a straight chat message. And before I

[00:52 - 00:55]
show you how this prompt works and how

[00:53 - 00:58]
this entire system works, let's just

[00:55 - 01:00]
prove that it does work. Now if you send

[00:58 - 01:03]
this entire prompt we have here along

[01:00 - 01:06]
with a series of files these are all

[01:03 - 01:09]
JSON files with one master agent right

[01:06 - 01:11]
here called retrofure master assistant

[01:09 - 01:14]
then you have all these subworkflows

[01:11 - 01:16]
that report to this orchestrating agent.

[01:14 - 01:19]
So pretty much we're using Cloud4 opus

[01:16 - 01:22]
and the power of extended thinking and

[01:19 - 01:24]
web search to be able to look at these

[01:22 - 01:26]
files, get a handle for how to create

[01:24 - 01:28]
the AI agent module, how they connect

[01:26 - 01:31]
together, what kind of tools can be

[01:28 - 01:33]
attached, and if we need to supplement

[01:31 - 01:35]
this information with additional

[01:33 - 01:37]
information not in Claude's training, we

[01:35 - 01:38]
can use web search, which is a newer

[01:37 - 01:40]
feature in the past couple months. And

[01:38 - 01:43]
if we're using Opus, all we have to do

[01:40 - 01:45]
is wait around five to 10 minutes for it

[01:43 - 01:48]
to run through this entire workflow. And

[01:45 - 01:50]
you'll see it first drafts multiple sets

[01:48 - 01:52]
of agents that it could put together.

[01:50 - 01:54]
And then if I ask it for just a sample

[01:52 - 01:57]
of three of these agents and after 5 to

[01:54 - 01:59]
10 minutes, Claude 4 Opus uses all its

[01:57 - 02:02]
tools at its disposal to come up with

[01:59 - 02:05]
not just a draft of different agents

[02:02 - 02:06]
but it will create a draft of the first

[02:05 - 02:09]
three agents. And if you want, you can

[02:06 - 02:11]
keep going and say create the rest. And

[02:09 - 02:13]
the result is you get a series of JSON

[02:11 - 02:15]
files like this one. And you can click

[02:13 - 02:17]
on the little drop down here. You'll see

[02:15 - 02:19]
we've put together all of these

[02:17 - 02:23]
different agents with one single prompt.

[02:19 - 02:26]
And then we can just go here, copy, and

[02:23 - 02:29]
seamlessly go into NANE, paste this, and

[02:26 - 02:31]
now you have an agent that isn't just an

[02:29 - 02:34]
empty agent. You can double click and

[02:31 - 02:36]
you'll see that an entire prompt on how

[02:34 - 02:38]
the agent works and how it should use

[02:36 - 02:41]
all of its sub tools is set up for you

[02:38 - 02:43]
literally in minutes and ready to go.

[02:41 - 02:44]
And if you click out, you'll see all the

[02:43 - 02:46]
different sub workflows that it's come

[02:44 - 02:49]
up with that it thinks would be suitable

[02:46 - 02:51]
for this kind of business or this kind

[02:49 - 02:53]
of task they're trying to accomplish.

[02:51 - 02:55]
But wait, there's more. We don't just

[02:53 - 02:57]
create these subworkflow drafts. It

[02:55 - 02:59]
actually can create the subworkflows

[02:57 - 03:02]
themselves. So if we click from tab to

[02:59 - 03:04]
tab here, this is the first workflow put

[03:02 - 03:06]
together which is called the

[03:04 - 03:08]
sustainability impact agent where it has

[03:06 - 03:11]
access to different tools that it has

[03:08 - 03:14]
decided make the most sense given this

[03:11 - 03:16]
agents ambitions. And once again all of

[03:14 - 03:18]
these sub agents have instructions of

[03:16 - 03:21]
their own with a reference material on

[03:18 - 03:22]
how to call their subtools as well. So

[03:21 - 03:25]
now we basically are creating agent

[03:22 - 03:27]
section where each agent has another

[03:25 - 03:28]
agent and both of them have instructions

[03:27 - 03:30]
on how they should operate. If we keep

[03:28 - 03:32]
going, you'll see all the different

[03:30 - 03:35]
agents here from the lodge coordination

[03:32 - 03:37]
agent to the real-time conditions agent

[03:35 - 03:39]
each with not only its own set of tools

[03:37 - 03:41]
but it's smart enough to decide whether

[03:39 - 03:44]
or not it should use maybe chat GBT

[03:41 - 03:46]
OpenAI or anthropics model for the given

[03:44 - 03:49]
task as well. So, we have that dynamic

[03:46 - 03:51]
nature there. And then you have your

[03:49 - 03:53]
entire set of agents with different

[03:51 - 03:55]
tools with different functionalities and

[03:53 - 03:57]
ambitions all reporting to the central

[03:55 - 03:59]
agent itself. Now, before we get into

[03:57 - 04:01]
the nitty-gritty of the prompt itself, I

[03:59 - 04:03]
want to walk you through the logic of

[04:01 - 04:05]
how this works and why this works. So

[04:03 - 04:07]
not too long ago, we were all blessed

[04:05 - 04:09]
with yet another model. In this case, we

[04:07 - 04:12]
got the Cloud 4 model where we have

[04:09 - 04:15]
Claude 4 sonnet and Cloud4 opus. Not

[04:12 - 04:17]
only that, when you combine Claude 4

[04:15 - 04:19]
with extended thinking, a feature

[04:17 - 04:21]
available to all, as well as web search

[04:19 - 04:24]
something also newly available in the

[04:21 - 04:27]
past month or so, it becomes a trifecta.

[04:24 - 04:30]
this perfect marriage of intelligence

[04:27 - 04:31]
with the ability to search as well as an

[04:30 - 04:33]
extension of reflection over time. If

[04:31 - 04:35]
you've watched my past video, you

[04:33 - 04:37]
already know that it's possible to

[04:35 - 04:40]
create out of the box and end workflows

[04:37 - 04:42]
just using claude. And previously, I had

[04:40 - 04:43]
to supplement it with a cheat sheet, a

[04:42 - 04:45]
series of nodes for it to understand.

[04:43 - 04:48]
But now that we have web search at our

[04:45 - 04:50]
disposal and extended thinking together

[04:48 - 04:52]
we can not only use the power of claude

[04:50 - 04:54]
that natively is decent at any

[04:52 - 04:56]
workflows, but now we can really

[04:54 - 04:58]
supercharge it with examples of these

[04:56 - 05:02]
agents and just allow it to do a monkey

[04:58 - 05:04]
see monkey do understand the structure

[05:02 - 05:06]
understand how these tools are attached

[05:04 - 05:08]
and understand the relationship of

[05:06 - 05:10]
subworkflows to different types of

[05:08 - 05:13]
agents. Now the most central concept

[05:10 - 05:15]
here is the AI agent module in NAIDEN.

[05:13 - 05:17]
And this module is based on something

[05:15 - 05:19]
called Langchain which is a framework

[05:17 - 05:22]
that really changed the entire course of

[05:19 - 05:23]
the NAN community where now you have

[05:22 - 05:25]
some central agent that takes in a

[05:23 - 05:28]
prompt that can speak to different

[05:25 - 05:30]
tools, can use a language model and can

[05:28 - 05:32]
use an internal memory. And overall

[05:30 - 05:35]
NADN, like every other automation tool

[05:32 - 05:38]
uses JSON, which stands for JavaScript

[05:35 - 05:40]
object notation to denote and be able to

[05:38 - 05:41]
bring these workflows to life the way

[05:40 - 05:44]
you see them visually. The fact that

[05:41 - 05:47]
they're all based on JSON, allows us to

[05:44 - 05:48]
manipulate and generate these JSONs

[05:47 - 05:50]
using a language model like Cloudfar

[05:48 - 05:52]
Opus to be able to basically be able to

[05:50 - 05:55]
create the JSON itself, the entire

[05:52 - 05:57]
schema, and import it into any. But

[05:55 - 05:59]
unlike typical workflows they would have

[05:57 - 06:02]
seen my tutorial and probably tons of

[05:59 - 06:04]
other tutorials coming out on this AI

[06:02 - 06:06]
agent tool is special not just in the

[06:04 - 06:08]
sense of what it can do but how it

[06:06 - 06:11]
operates. So if we take a look at the

[06:08 - 06:13]
tools here you can't just use any tool

[06:11 - 06:15]
from a specific provider. There are

[06:13 - 06:18]
different functionalities or methods

[06:15 - 06:20]
available to the AI agent that aren't

[06:18 - 06:21]
necessarily the only functionalities you

[06:20 - 06:24]
can have. For example, you might have a

[06:21 - 06:26]
node that allows you to watch new rows

[06:24 - 06:28]
being added to a Google sheet, right?

[06:26 - 06:31]
And every time you watch a new row come

[06:28 - 06:32]
in, that triggers an entire workflow.

[06:31 - 06:34]
Technically, with an AI agent, they

[06:32 - 06:37]
wouldn't really play very well. An AI

[06:34 - 06:39]
agent would want some form of very

[06:37 - 06:40]
specific action to occur that's

[06:39 - 06:42]
triggered externally from the agent

[06:40 - 06:44]
itself. So taking the Google Sheets

[06:42 - 06:47]
example, it would be able to add a new

[06:44 - 06:48]
row, receive new rows, search new rows

[06:47 - 06:52]
something that's very functional and

[06:48 - 06:53]
isn't necessarily triggerbased.

[06:52 - 06:56]
So, keeping that in mind, if you were

[06:53 - 06:58]
just to ask Claude out of the box, build

[06:56 - 07:00]
me an AI agent workflow, you could get

[06:58 - 07:02]
some results that are decent, but it

[07:00 - 07:05]
will basically struggle with

[07:02 - 07:06]
understanding what tools it can use, but

[07:05 - 07:09]
most likely it will struggle to

[07:06 - 07:11]
delineate between what tools can it use

[07:09 - 07:14]
what are the nodes that I can write JSON

[07:11 - 07:15]
for to visualize those tools, and most

[07:14 - 07:17]
importantly, what are the different

[07:15 - 07:20]
tiers of methods that I can have access

[07:17 - 07:21]
to as an AI agent, which is different

[07:20 - 07:23]
from a standard workflow you put

[07:21 - 07:24]
together and edit it in. And I'm not

[07:23 - 07:26]
spoiling the rest of the video by

[07:24 - 07:29]
telling you that the crux of being able

[07:26 - 07:31]
to do this entire process relies on the

[07:29 - 07:34]
ability to create these tools reliably

[07:31 - 07:36]
in the exact way that the AI agent node

[07:34 - 07:39]
expects. So the overall goal is that

[07:36 - 07:42]
we're able to create a series of JSONs.

[07:39 - 07:44]
One that acts as our orchestrator and

[07:42 - 07:46]
the others that act as our sub aents.

[07:44 - 07:48]
All of which ideally don't have their

[07:46 - 07:50]
own subworkflows because then you'll

[07:48 - 07:52]
have agents with subworkflows with

[07:50 - 07:54]
subworkflows and this entire chain can

[07:52 - 07:57]
keep going on. Now you can totally do

[07:54 - 07:59]
that if you wish but for simplicity sake

[07:57 - 08:01]
I ideally wanted to just go from

[07:59 - 08:03]
orchestrating agent to sub workflows

[08:01 - 08:04]
that all have tools. So that's the

[08:03 - 08:06]
general structure that we're going for

[08:04 - 08:08]
at least with our approach. So now that

[08:06 - 08:10]
we have that background, we're safe to

[08:08 - 08:12]
dive straight into this prompt. And just

[08:10 - 08:14]
for the pure comprehension of every

[08:12 - 08:16]
part, I will read through it and

[08:14 - 08:17]
basically give a voice over for the

[08:16 - 08:19]
parts you should really care about.

[08:17 - 08:22]
Okay, so let's give it a read. You are

[08:19 - 08:25]
an expert NAND workflow architect and

[08:22 - 08:27]
systems designer. Your primary mission

[08:25 - 08:30]
is to generate a comprehensive

[08:27 - 08:32]
functional and importable NAN AI agent

[08:30 - 08:35]
system based on the provided business

[08:32 - 08:36]
description strictly emulating the

[08:35 - 08:38]
structural patterns, node types and

[08:36 - 08:40]
connection methods. So in this case, I'm

[08:38 - 08:42]
just giving it a series of examples

[08:40 - 08:45]
here. So especially for the AI agent

[08:42 - 08:47]
nodes and their tools via AI tool. So

[08:45 - 08:50]
this here is a part of the underlying

[08:47 - 08:52]
JSON that basically denotes to the agent

[08:50 - 08:54]
what is attached to that agent and

[08:52 - 08:55]
that's where the attachment of the tools

[08:54 - 08:57]
comes into play. We then say your

[08:55 - 09:00]
paramount goals are to ensure all

[08:57 - 09:01]
generated N&N workflow JSON is 100%

[09:00 - 09:04]
valid meaning it's not corrupt

[09:01 - 09:06]
importable and entirely free of property

[09:04 - 09:08]
value errors. Now what are property

[09:06 - 09:10]
value errors? These errors pop up quite

[09:08 - 09:12]
a bit when the JSON is generated by some

[09:10 - 09:14]
form of language model, but it's missing

[09:12 - 09:17]
key parameters or key components that

[09:14 - 09:18]
any is expecting because it's expecting

[09:17 - 09:20]
those and it needs those to be able to

[09:18 - 09:22]
visualize it the way you see it on a

[09:20 - 09:24]
screen. It's not able to actually import

[09:22 - 09:26]
it. So, I'm trying to have it reflect

[09:24 - 09:28]
using that extended thinking function

[09:26 - 09:30]
and make sure that before we import it

[09:28 - 09:32]
into NADN, there's a very high

[09:30 - 09:33]
likelihood that it's going to actually

[09:32 - 09:36]
work. Next, I instructed that there's

[09:33 - 09:38]
going to be two distinct stages. First

[09:36 - 09:40]
after analyzing the business description

[09:38 - 09:42]
provided at the end of this message, you

[09:40 - 09:44]
must conceptualize and list directly in

[09:42 - 09:46]
the chat six to eight potential

[09:44 - 09:48]
specialized AI agent names. So, in this

[09:46 - 09:51]
case, I'm saying I want you to come up

[09:48 - 09:53]
with six to eight ideas. Brainstorm on

[09:51 - 09:54]
the types of agents we want to create.

[09:53 - 09:57]
This gives us a baseline to actually

[09:54 - 09:58]
work from. Now the next part is for each

[09:57 - 10:01]
of the conceptual agents provide a

[09:58 - 10:01]
concise

[10:03 - 10:09]
one-sensit nodes or verifiable public

[10:06 - 10:11]
APIs that your web search for tools not

[10:09 - 10:12]
covered in provided examples indicates

[10:11 - 10:14]
would be the most appropriate for these

[10:12 - 10:17]
tasks. Do not proceed with any

[10:14 - 10:19]
unverified or hallucinated tools or

[10:17 - 10:22]
APIs. Now what is this last part about

[10:19 - 10:24]
here? Hallucinated tools or APIs. Once

[10:22 - 10:27]
in a while, even using Opus, it will

[10:24 - 10:31]
create a tool that is a fictional

[10:27 - 10:33]
non-existent API specific to company X.

[10:31 - 10:35]
So imagine you said company X has these

[10:33 - 10:37]
services, they have this stack. It might

[10:35 - 10:41]
accidentally create an HTTP request

[10:37 - 10:43]
which is a request to an API and call it

[10:41 - 10:45]
company.x.api and basically make it out

[10:43 - 10:47]
of thin air, which is not what we want.

[10:45 - 10:49]
We want our tools to have a high

[10:47 - 10:51]
likelihood of being grounded and being

[10:49 - 10:53]
actually functional. And from these six

[10:51 - 10:54]
to eight ideas we come up with, we

[10:53 - 10:57]
actually just want to start with

[10:54 - 10:58]
creating three of the most impactful of

[10:57 - 10:59]
these workflows. Now, there's two

[10:58 - 11:02]
different reasons why I'm saying three

[10:59 - 11:04]
here. First of all, if you let it create

[11:02 - 11:07]
six to eight workflows in one shot and

[11:04 - 11:09]
you're just on the Claude Pro plan using

[11:07 - 11:12]
Cloud Opus and extended thinking, you

[11:09 - 11:14]
might completely use all your credits in

[11:12 - 11:16]
one shot. So when I say three, it just

[11:14 - 11:18]
gives you the ability to quickly audit

[11:16 - 11:20]
whether or not it's working, whether or

[11:18 - 11:23]
not it's adding the tools you'd expect

[11:20 - 11:25]
before you commit and donate all your

[11:23 - 11:27]
credits for the next 6 to 7 hours to

[11:25 - 11:28]
Anthropic. And the second reason is

[11:27 - 11:30]
obviously time because this will take at

[11:28 - 11:32]
least 5 to 10 minutes to put together

[11:30 - 11:34]
and you don't want to wait half an hour

[11:32 - 11:36]
all to find out that seven of your

[11:34 - 11:38]
workflows are completely not usable.

[11:36 - 11:40]
Now, this second stage is completely

[11:38 - 11:42]
optional. And if you want to move ahead

[11:40 - 11:43]
and complete the remaining of the

[11:42 - 11:45]
initial draft of agents they came up

[11:43 - 11:47]
with, then you can just say, "Cool, you

[11:45 - 11:48]
did a great job. Let's finish off with

[11:47 - 11:50]
the rest of the agents." And then with

[11:48 - 11:52]
this instruction, it should know exactly

[11:50 - 11:54]
what it next step should be. Now, if we

[11:52 - 11:56]
scroll down, I want to focus on this

[11:54 - 11:58]
specific instruction here that says

[11:56 - 12:01]
"These specialized agents should utilize

[11:58 - 12:04]
two to three with an absolute maximum of

[12:01 - 12:07]
five, if genuinely distinct, critical

[12:04 - 12:09]
and verifiable, real tools, and must

[12:07 - 12:11]
have correctly connected response and

[12:09 - 12:13]
try again set nodes wired to the

[12:11 - 12:14]
respective AI agent node success and

[12:13 - 12:17]
error outputs." And what does that mean

[12:14 - 12:19]
in plain English? If we pop over to the

[12:17 - 12:21]
second tab here, all we're asking is

[12:19 - 12:22]
that whatever tools you choose, make

[12:21 - 12:26]
sure they're legit tools. They're not

[12:22 - 12:29]
made up. And number two, connect a set

[12:26 - 12:31]
response and a try again step for the AI

[12:29 - 12:32]
agent in case something goes wrong, it

[12:31 - 12:35]
can try again in case there's some form

[12:32 - 12:38]
of temporary error. And with that, if we

[12:35 - 12:40]
go back, we just finish off by adding

[12:38 - 12:41]
the business description of the

[12:40 - 12:44]
underlying business. And this is what

[12:41 - 12:45]
makes this so powerful that you can use

[12:44 - 12:47]
this entire prompt and you just change

[12:45 - 12:49]
the very bottom. And the reason why I

[12:47 - 12:51]
added this business at the very bottom

[12:49 - 12:53]
is when it comes to prompt engineering

[12:51 - 12:55]
at least for now, a prompt will

[12:53 - 12:57]
typically be paid attention to at the

[12:55 - 12:59]
very beginning and the very end of the

[12:57 - 13:01]
prompt. So we want to make sure that the

[12:59 - 13:02]
business and the underlying mechanisms

[13:01 - 13:04]
of that business are really paid

[13:02 - 13:06]
attention to by the language model. In

[13:04 - 13:08]
this case, I won't read all of this, but

[13:06 - 13:10]
pretty much it goes through this fake

[13:08 - 13:12]
business that I came up with that has a

[13:10 - 13:14]
series of different operations, and

[13:12 - 13:15]
we're just trying to find ways to

[13:14 - 13:17]
optimize for those operations. Now

[13:15 - 13:19]
where this becomes super exciting is

[13:17 - 13:22]
when we add specifications for what kind

[13:19 - 13:24]
of tools are using, and we find a way to

[13:22 - 13:26]
create a cloud project to make a much

[13:24 - 13:27]
more sophisticated version of this

[13:26 - 13:29]
prompt. But just in case you missed

[13:27 - 13:31]
something on this prompt, I'll be making

[13:29 - 13:33]
this available in the description below

[13:31 - 13:34]
so you can go through it, change it, and

[13:33 - 13:37]
do whatever you want to your heart's

[13:34 - 13:38]
content to optimize it for your oneshot

[13:37 - 13:40]
workflow. Now, for our next three

[13:38 - 13:42]
samples we're going to take a look at

[13:40 - 13:45]
we're going to analyze three completely

[13:42 - 13:47]
hypothetical businesses. One is called

[13:45 - 13:49]
Flexiflow Studios. That's a Tik Tok

[13:47 - 13:52]
agency. We're going to look at a dessert

[13:49 - 13:54]
place called Unicorn Milkshake. And then

[13:52 - 13:57]
we're going to look at Chaos Coffee.

[13:54 - 13:59]
Each of them uses different tools but

[13:57 - 14:01]
they have some similarities. So

[13:59 - 14:04]
Flexiflow uses things like ClickUp, Air

[14:01 - 14:07]
Table and Slack and Google. And then

[14:04 - 14:10]
Unicorn Milkshake uses Zoom as well as

[14:07 - 14:12]
those tools as well and monday.com. And

[14:10 - 14:14]
then Chaos Coffee uses a mixture of what

[14:12 - 14:16]
both of these use. Now this is a

[14:14 - 14:18]
purposeful example because of the big

[14:16 - 14:20]
trick and the big nugget I'm about to

[14:18 - 14:22]
show you next. If we pop into our Cloud

[14:20 - 14:24]
project, we have quite a few different

[14:22 - 14:26]
things going on here. We have a cheat

[14:24 - 14:30]
sheet guide that we put together. We

[14:26 - 14:32]
also have a special file here called

[14:30 - 14:33]
agents_tools.json. And this is going to

[14:32 - 14:35]
be the golden nugget you're going to

[14:33 - 14:37]
learn from this video. And then we have

[14:35 - 14:39]
just another set of workflows that have

[14:37 - 14:42]
some form of master orchestrating agent

[14:39 - 14:43]
and sub aents. And what I'll do is along

[14:42 - 14:45]
with that prompt I provided you

[14:43 - 14:47]
initially, I'll also provide you with a

[14:45 - 14:50]
series of files that you can use as well

[14:47 - 14:51]
to add to a project or use in a prompt.

[14:50 - 14:53]
So you can use this as well without

[14:51 - 14:54]
having to build that initial workflow

[14:53 - 14:56]
yourself. Now for this prompt, it took

[14:54 - 14:59]
so much time that I refused for it to be

[14:56 - 15:01]
copycatted all over YouTube. So this

[14:59 - 15:03]
prompt will be available to my early AI

[15:01 - 15:05]
adopters community members exclusively

[15:03 - 15:07]
in the community. But for the rest, I

[15:05 - 15:10]
will walk you through how this agent

[15:07 - 15:12]
tools file works because this will open

[15:10 - 15:14]
so many doors for you. If we go into

[15:12 - 15:18]
this agent tools aen, you'll think that

[15:14 - 15:22]
I'm a madman for putting one AI agent

[15:18 - 15:25]
with multiple many tools. Now, do I

[15:22 - 15:27]
intend on ever running this workflow?

[15:25 - 15:30]
No. What I'm doing is a bit of a cheat

[15:27 - 15:32]
code. If you remember before, if you go

[15:30 - 15:34]
to something like, let's say, Asana

[15:32 - 15:35]
which is a project management tool, and

[15:34 - 15:37]
you go under

[15:35 - 15:41]
options, while you can use all of these

[15:37 - 15:42]
in any, the AI agent module, like I said

[15:41 - 15:45]
before, can't necessarily use all of

[15:42 - 15:47]
these tools. It can use a subset of

[15:45 - 15:49]
these different methods. So, if I had

[15:47 - 15:51]
some form of trigger action, let's go

[15:49 - 15:53]
here on a new asana event. Let's just

[15:51 - 15:55]
bring this to the board because this is

[15:53 - 15:57]
the easiest way for you to understand

[15:55 - 15:59]
what's happening. I physically can't

[15:57 - 16:01]
connect this as a tool. It will not

[15:59 - 16:03]
accept it because this is a trigger.

[16:01 - 16:05]
It's not something that the agent module

[16:03 - 16:08]
can actually play nice with. Which is

[16:05 - 16:10]
why you'll see that when you add a tool

[16:08 - 16:14]
to the agent module and you click on

[16:10 - 16:16]
asauna, we won't have as many options as

[16:14 - 16:19]
we saw before. I think we had 22 options

[16:16 - 16:22]
before, but now we can only do these

[16:19 - 16:23]
operations using the agent module, which

[16:22 - 16:26]
is where this complexity comes in.

[16:23 - 16:28]
that's made me spend hours trying to

[16:26 - 16:30]
figure this out. And knowing that a lot

[16:28 - 16:32]
of these different services like Zoho

[16:30 - 16:34]
like Monday, like ClickUp, which are

[16:32 - 16:36]
actual services that most businesses

[16:34 - 16:38]
use, not all businesses use Air Table

[16:36 - 16:39]
and not all businesses use Google

[16:38 - 16:42]
Sheets. So what happens if you have

[16:39 - 16:46]
these kinds of tools in your toolbox?

[16:42 - 16:48]
Well, if we can't use web search

[16:46 - 16:50]
reliably to understand how to attach

[16:48 - 16:52]
these to the agent, and if we don't have

[16:50 - 16:54]
a knowledge base we want to constantly

[16:52 - 16:57]
feed of examples of workflows with these

[16:54 - 16:59]
exact tools, what we could do is just

[16:57 - 17:01]
put all of the tools that we care about

[16:59 - 17:05]
attach it to one agent, and then

[17:01 - 17:06]
download that as a JSON, and technically

[17:05 - 17:10]
we can use that as our mini knowledge

[17:06 - 17:12]
base now to pseudo fine-tune our agent

[17:10 - 17:15]
in Claude to understand how to put

[17:12 - 17:17]
together a Slack connection to an agent.

[17:15 - 17:19]
How to put together an ASA connection to

[17:17 - 17:21]
an agent. Same with Monday, same with

[17:19 - 17:22]
Zoho. So, this becomes your cheat code

[17:21 - 17:25]
where you can use whatever you want

[17:22 - 17:27]
depending on your particular business or

[17:25 - 17:29]
service you're offering. You can add

[17:27 - 17:32]
whatever node you wish. Let's say a

[17:29 - 17:34]
quadrant node or let's say an airtop

[17:32 - 17:36]
tool node. And then you can just hook up

[17:34 - 17:37]
all the different functionalities you

[17:36 - 17:40]
think you'd want to use and then use

[17:37 - 17:42]
that JSON as a part of your knowledge

[17:40 - 17:44]
base to allow Claw to have a better

[17:42 - 17:46]
understanding of how to put everything

[17:44 - 17:48]
together when it comes to the AI agent

[17:46 - 17:49]
module. Once you have that put together

[17:48 - 17:52]
along with the cheat sheet, you now have

[17:49 - 17:53]
something super potent that you only

[17:52 - 17:55]
have to just provide a description of a

[17:53 - 17:57]
business as well as the tools used in

[17:55 - 18:00]
that business and you can crank out

[17:57 - 18:01]
these workflows fairly reliably over and

[18:00 - 18:04]
over again. And for our first example

[18:01 - 18:06]
we have Flexiflow Studios, which is a

[18:04 - 18:08]
beautiful name. Now, all we have as an

[18:06 - 18:11]
instruction is build an agent army for

[18:08 - 18:14]
this business. We describe the business

[18:11 - 18:16]
itself and all we do is we just drop in

[18:14 - 18:19]
the names of the tools. So, we're using

[18:16 - 18:21]
Zoom, ClickUp, we're using Slack, some

[18:19 - 18:23]
Google Sheets, some Air Table, and then

[18:21 - 18:25]
we basically contextualize it in one big

[18:23 - 18:27]
paragraph. And with our supercharged

[18:25 - 18:30]
prompt I put together specifically for

[18:27 - 18:33]
this claude project, this just takes

[18:30 - 18:35]
this specific snippet and then creates a

[18:33 - 18:37]
list of hypothetical agents that it

[18:35 - 18:40]
could put together. And then it creates

[18:37 - 18:43]
a short list of three agents, a client

[18:40 - 18:45]
request handler agent, a project setup

[18:43 - 18:48]
agent, and a team coordination agent.

[18:45 - 18:50]
And then after some contemplation, it

[18:48 - 18:53]
puts together the JSON for the master

[18:50 - 18:55]
coordinator, the request handler and the

[18:53 - 18:59]
rest. And all you have to do is either

[18:55 - 19:01]
download the actual text file or you can

[18:59 - 19:04]
copy it and import it directly into any.

[19:01 - 19:06]
And what you get is the following where

[19:04 - 19:08]
you have the Flexiflow master AI

[19:06 - 19:11]
coordinator with all the subworkflows.

[19:08 - 19:12]
it's drafted and then you have a draft

[19:11 - 19:16]
of those subworkflows where you have

[19:12 - 19:18]
things like Air Table, you have Slack

[19:16 - 19:19]
and notice how they're not invalid.

[19:18 - 19:22]
They're all valid. We now have

[19:19 - 19:24]
monday.com, we have Slack again, and

[19:22 - 19:26]
they're not broken because it had that

[19:24 - 19:27]
additional training data, that cheat

[19:26 - 19:30]
sheet of the different nodes that it

[19:27 - 19:32]
could use and repurpose from. And then

[19:30 - 19:34]
if we take a look at the final one here

[19:32 - 19:37]
we now have, you can see here, ClickUp

[19:34 - 19:39]
as well as Zoom. And all of these are

[19:37 - 19:42]
logical. So this one, a team

[19:39 - 19:43]
coordination AI agent has something for

[19:42 - 19:46]
scheduling Zoom meetings, team

[19:43 - 19:48]
availability checks by sending messages

[19:46 - 19:50]
and then creating tasks for that team.

[19:48 - 19:52]
And if you so wanted to add more tools

[19:50 - 19:54]
you could just change the underlying

[19:52 - 19:56]
prompt and tell it, you know what, draft

[19:54 - 19:58]
five tools for each thing. Now, as you

[19:56 - 20:01]
add more tools, you might add some more

[19:58 - 20:03]
bloat, some unnecessary tooling, but the

[20:01 - 20:05]
whole point of this exercise is to get

[20:03 - 20:08]
you started, getting you from zero to

[20:05 - 20:09]
80%. Is this going to be perfect out of

[20:08 - 20:11]
the box? Is this going to run on its

[20:09 - 20:14]
first try? No. But being able to set the

[20:11 - 20:16]
foundation with this head start will

[20:14 - 20:18]
help you speed things up and also help

[20:16 - 20:20]
you brainstorm in a short amount of time

[20:18 - 20:22]
what could be possible. For the second

[20:20 - 20:24]
business, we have Pet Pal concurge which

[20:22 - 20:27]
is the Uber for pet care connecting busy

[20:24 - 20:28]
pet parents with trusted local sitters.

[20:27 - 20:32]
In this case, we seem to also be using

[20:28 - 20:35]
Air Table, Slack, Zoom, um, and in this

[20:32 - 20:37]
time ASA right here. And then we get the

[20:35 - 20:40]
following workflows where we have the

[20:37 - 20:42]
master agent with a series of different

[20:40 - 20:44]
nodes. We have the emergency care

[20:42 - 20:46]
coordinator, the provider management

[20:44 - 20:48]
agent, the booking and scheduling agent

[20:46 - 20:50]
and then something like the photo update

[20:48 - 20:52]
agent. I would imagine the photos of the

[20:50 - 20:54]
pets themselves, maybe their profiles on

[20:52 - 20:57]
some form of portal or website. And in

[20:54 - 20:59]
terms of the subworkflows, we have the

[20:57 - 21:01]
emergency care AI agent that has access

[20:59 - 21:04]
to air table to search available

[21:01 - 21:06]
providers for a given dog's doctors. And

[21:04 - 21:09]
then we have Slack to alert nearby

[21:06 - 21:11]
providers. And then for ASA, now we have

[21:09 - 21:13]
create urgent task if needed. So it's

[21:11 - 21:15]
trying to come up and rationalize

[21:13 - 21:18]
through different workflows. And like I

[21:15 - 21:19]
said before, each one has a starter

[21:18 - 21:21]
prompt that you can use that's already

[21:19 - 21:23]
pretty sophisticated out of the box. And

[21:21 - 21:26]
all you can do is kind of just fine-tune

[21:23 - 21:28]
it for your specific use case. We also

[21:26 - 21:31]
have a provider management AI agent that

[21:28 - 21:33]
uses in this case money.com, airtable

[21:31 - 21:34]
and Gmail. And then we have one more

[21:33 - 21:37]
which is the booking scheduling that

[21:34 - 21:39]
uses a combination of Google Sheets, ASA

[21:37 - 21:41]
and scheduling a consultation using

[21:39 - 21:43]
Zoom. So now that we have all the puzzle

[21:41 - 21:45]
pieces set up, so it can just pick and

[21:43 - 21:46]
choose these different nodes and we

[21:45 - 21:48]
don't have to obsess over the

[21:46 - 21:50]
functionality, the fact that these nodes

[21:48 - 21:53]
are connecting properly to the agent. It

[21:50 - 21:55]
can now also focus on the higher level

[21:53 - 21:57]
business decisions on what is practical.

[21:55 - 21:59]
What kind of agents make the most sense

[21:57 - 22:01]
for this kind of business given the

[21:59 - 22:04]
profile. And last but not least, we have

[22:01 - 22:06]
Chaos Coffee Co. that runs 15 quirky

[22:04 - 22:09]
coffee shops known for their organized

[22:06 - 22:11]
chaos. And in this case, we mention once

[22:09 - 22:12]
again Google Sheets, Air Table, and

[22:11 - 22:14]
ClickUp. Obviously, I could have added

[22:12 - 22:15]
more. I just wanted to be able to use

[22:14 - 22:18]
that one file for all of these use

[22:15 - 22:19]
cases. So, just bear with me. And in

[22:18 - 22:22]
this case, yet again, we're able to

[22:19 - 22:25]
crank out this operator agent here that

[22:22 - 22:27]
has its set of instructions. And then we

[22:25 - 22:29]
have subworkflows like inventory

[22:27 - 22:32]
ingredient discovery, a recipe

[22:29 - 22:34]
innovation agent, and a quality control

[22:32 - 22:36]
agent as well as a financial analytics

[22:34 - 22:38]
agent as well. So, it's very dynamic to

[22:36 - 22:41]
the specific business we have. And if we

[22:38 - 22:43]
pop into the subworkflows, we have an

[22:41 - 22:45]
interlocation coordinator AI that has

[22:43 - 22:48]
access to track deliveries via

[22:45 - 22:49]
monday.com, send coordination alerts in

[22:48 - 22:53]
Slack, and then create a coordination

[22:49 - 22:55]
task in ClickUp. We have an inventory

[22:53 - 22:57]
discovery agent that also has the

[22:55 - 22:59]
ability to, in this case, also update

[22:57 - 23:01]
ingredients in the database in Air

[22:59 - 23:04]
Table, update inventory board in

[23:01 - 23:05]
money.com, and yet again create a task.

[23:04 - 23:07]
And last but not least, we have my

[23:05 - 23:10]
favorite, which is the recipe innovation

[23:07 - 23:12]
agent that has access to schedule

[23:10 - 23:14]
tasting sessions with Zoom. Document

[23:12 - 23:17]
recipes in Google Sheets and announce

[23:14 - 23:18]
any big recipes to the whole crew. I

[23:17 - 23:20]
think there's 15 locations in this

[23:18 - 23:22]
hypothetical company. So, this would be

[23:20 - 23:24]
the final result here. And then you have

[23:22 - 23:26]
once again yet another prompt

[23:24 - 23:28]
orchestrating these agents. You can see

[23:26 - 23:29]
it's pretty consistent from workflow to

[23:28 - 23:31]
workflow. And that's pretty much it. So

[23:29 - 23:33]
hopefully you found this as cool as I

[23:31 - 23:35]
did building it and this will be

[23:33 - 23:38]
something useful to you to create your

[23:35 - 23:39]
own drafts of AI agent networks to get

[23:38 - 23:42]
you off the ground and get you from 0 to

[23:39 - 23:43]
80 as quickly as possible. Once again

[23:42 - 23:45]
if you want access to the very first

[23:43 - 23:47]
prompt along with a sample agent network

[23:45 - 23:49]
that you can use to try to repurpose

[23:47 - 23:50]
this, then I'll make that available in

[23:49 - 23:51]
the first link in the description below.

[23:50 - 23:53]
But if you want access to the

[23:51 - 23:55]
supercharged prompt along with the

[23:53 - 23:57]
underlying cheat sheet guide for the

[23:55 - 23:58]
Claude project, then that will be in my

[23:57 - 24:00]
community in the second link in the

[23:58 - 24:02]
description below where you'll have

[24:00 - 24:04]
access to more mad scientist experiments

[24:02 - 24:05]
than you can imagine and exclusive

[24:04 - 24:07]
content that you'll never see on

[24:05 - 24:09]
YouTube. Enjoy building and I'll see you

[24:07 - 24:09]
in the next

## コメント

### 1. @Mark_Kashef (👍 3)
👉🏼Join the Early AI-dopters Community: https://bit.ly/3ZMWJIb
📅 Book a Meeting with Our Team: https://bit.ly/3Ml5AKW
🌐 Visit My Agency Website: https://bit.ly/4cD9jhG

### 2. @ANewEarthInANewEnergy (👍 2)
This has got to be the single best and most useful AI training video ever! I've seen MANY, but this one is by far the most useful ever.

> **@Mark_Kashef** (👍 0): Glad you found it so helpful! 🦾

### 3. @riverdaleai (👍 7)
The jump from prompt to fully importable workflow is what really hooked most viewers here. From scanning the thread, about two-thirds of the comments are pure excitement, but the loudest friction points cluster around three areas: 1) missing assets/cheat-sheet, 2) Claude token costs once the context window maxes out, and 3) confusion over when to reach for MCP versus n8n. A quick pinned FAQ covering those would likely neutralize most of the negatives and keep the momentum positive. Thanks for pushing the envelope on agent orchestration! 🔍

> **@Mark_Kashef** (👍 3): thanks

### 4. @AI.cafe.calories (👍 11)
Gotta admit I've to keep saying ‘Amazing’ every time I watch your videos but I’ll never get tired of it 😊 
Your videos just keep delivering more value every time, and I’m already gathering gems to riff on for my own channel…but you’ll always be the master 👑

> **@Mark_Kashef** (👍 2): Thanks, I appreciate the kind words! 

Keep at it - it's a marathon, not a sprint 🦾

### 5. @RuneX_ai (👍 9)
Very very good video, my n8n account has been silent for 3-4 months, lack of time and knowledge but this makes me eager to try again

> **@Mark_Kashef** (👍 5): Thank you!! 

Honestly n8n can be very daunting and steep if you don’t have a development background — but after with quite a few folks in the community, you can make a lot of progress in a short amount of time if you just sit down for a day or two and learn about all the foundational building blocks (as well learning basics about HTTP and JSON)

### 6. @AgenticPersonnel (👍 9)
Absolutely AMAZING ❤
This guy never stops buildings incredibly intuitive tools and workflows I love it!

> **@Mark_Kashef** (👍 2): Thanks, appreciate that! I'm just trying to share what I've learned 🦾

### 7. @robkennedy5906 (👍 2)
What AI has come to be is amazing. This is a great video.

> **@Mark_Kashef** (👍 0): Glad you enjoyed the video and agree with where things are headed! 🦾

### 8. @salomeirene854 (👍 1)
Loved the clarity here! On the testing side, Recall’s running a live comp to measure how agents trade across different environments. It’s been interesting to follow both the design and performance angles.

> **@Mark_Kashef** (👍 1): Awesome to hear and thanks for sharing that info!

### 9. @HamzaEl-vt1bv (👍 1)
00:04 - Build an AI agent army in minutes using Claude 4 Opus.
02:06 - Quickly generate a functional AI agent army using n8n.
06:08 - Building an AI agent workflow requires structured understanding of tools and methods.
08:06 - Creating a valid AI agent system in n8n using predefined structures.
11:58 - Build AI agents with verified tools and robust error handling.
13:52 - Comparing tools used by Unicorn Milkshake and Chaos Coffee.
17:42 - Use JSON for enhanced AI agent understanding in n8n.
19:34 - Building a team coordination AI agent for scheduling and task management.
23:04 - Creating an AI agent network for efficient recipe management.

### 10. @swanidhi (👍 1)
Love your content! Breaks barrier to adopting new tools. Thank you!

> **@Mark_Kashef** (👍 1): Glad it helped, always aiming to make it easier to build awesome things! 🦾

### 11. @erickathomas9472 (👍 1)
I never comment on videos but this was very good. Thank you!

> **@Mark_Kashef** (👍 0): I appreciate it Ericka; thank you thank you

### 12. @MarwanKingAIDev (👍 13)
Bro, this is insane! 🔥

> **@Mark_Kashef** (👍 0): Appreciate you as usual sir 🦾🫡

### 13. @davidcollins_highvaluemale6585 (👍 4)
One thing I trust you is you are ahead of the curve.

Most of these other YouTubers copy you. Kudos!

> **@Mark_Kashef** (👍 1): Thank you David!! It’s a blessing and a curse; on my last version of this video, it was very much a curse

> **@getme.global** (👍 0): Why so? I think the default mindset of innovators should be: Yes its working, why because they copy me all over the place. 

Once one manages to be there you can start thinking of 4D chess moves. But until then modt people waste time rather than hone the skill of being constantly ahead.

### 14. @williamguidry-EntreNovaAI (👍 6)
Hey Mark, great vid!  👍Q: would this be like a more extensible MCP server?  Seems like the first check could be to see if there is an available MCP and connect that.  If not, use this method.  Your thoughts?

> **@chimpyfil** (👍 1): Lol, was striking me the same😂

> **@Mark_Kashef** (👍 1): hey William! You could totally setup an MCP server to help with this; just might be a few extra steps instead of using an out-of-the-box prompt and knowledge base

I try to skew as much as my content to a series of clicks and drag /drops; although this fancier solution with MCP could be more elegant (although I find that MCPs still do bug out on Claude Desktop from time to time)

### 15. @fullcholas (👍 1)
This is amazing Mark thanks for sharing. Now what you explained looks very similar to what I saw in a video about MCPs. Aren`t MCPs similar to what you`re explaining here? Hey by the way  went and enrolled in your skool community right after watching this video.

### 16. @kaoeuchseifeddine9098 (👍 1)
Great job! Really appreciate the awesome video and all the work you put into it.

> **@Mark_Kashef** (👍 0): Thanks so much, appreciate the recognition sir 🫡🦾

### 17. @rozhensky (👍 1)
Great video! 🙏 What tool do you use to record this screencast and to add these arrows in real time?

> **@Mark_Kashef** (👍 0): thank you! Screen Studio + Demo Pro

### 18. @wcockle (👍 3)
I like Claude, it aeems to be the best option for no code (me) on n8n. Ive found that you still need to give it a lot of guidance to make sure it's going in the right direction.

> **@Mark_Kashef** (👍 1): Extended thinking really helps lower the back and fourth quite a bit!

> **@mas5867** (👍 0): I have queried Wiki for stats many times with chatgpt and copilot.  They have been wrong almost every time.  Claude was very impressive the first time I used it.

> **@straighttothepointfishing** (👍 0): No ones out of a job yet. It's very nice for getting the structure laid out.

### 19. @winx910 (👍 1)
Great delivery of a complex topic, Mark!

> **@Mark_Kashef** (👍 0): thanks so much for the kind words. I really appreciate you, and I'm so happy it benefited you! 🦾

### 20. @badrmourad8293 (👍 3)
Simply the goat of ai agents

> **@Mark_Kashef** (👍 2): you're too kind Badr, thank you sir 🦾

