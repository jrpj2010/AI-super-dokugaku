# Building AI Agents: Chat Trigger, Memory, and System/User Messages Explained [Part 1]

**チャンネル:** n8n
**公開日:** 2024-11-29
**URL:** https://www.youtube.com/watch?v=yzvLfHb0nqE

## 説明

Watch Part 2: https://www.youtube.com/watch?v=lkudvrC3AOU

Welcome to Part 1 of the "Building AI Agents" tutorial series! In this video, Max walks you through everything you need to know to get started with AI Agents in n8n, the powerful workflow automation tool.

Here's what you'll learn:
✨ What is an AI Agent? Understand the difference between AI Agents and Large Language Models (LLMs).
💡 Building Your First Agent: Create an interactive chat-based AI Agent using n8n's Chat Trigger and AI nodes.
🧠 Memory and Context: Configure memory to maintain context across multiple messages in a conversation.
🛠️ Prompt Engineering Basics: Best practices for crafting User and System messages to optimize your AI Agent's responses.
🚀 Publishing Your Agent: Learn how to activate and share your AI Agent via n8n's chat UI.

Chapters
00:00
01:27 - Key concepts: AI Agents vs. LLMs
02:25 - What is n8n
03:30 - Build an AI Agent
05:55 - Add chat model
07:16 - Run the AI Agent
08:10 - AI Agent settings
09:54 - System messages
14:19 - Adding memory
17:16 - Activating workflow, Chat trigger
18:38 - Iterating & troubleshooting once live
19:30 - Wrap up

💬 What kind of AI Agents would you like to create? Share your ideas in the comments!

🌟 See you in Part 2, where we'll dive into integrating tools and services with your AI Agents to supercharge their capabilities!

🔗 Links and Resources:
- Sign up at n8n.io and get 50% off for 12 months with coupon code MAX50 (apply the code after your free trial)!
- docs.n8n.io for documentation
- community.n8n.io for help whilst building

## 字幕

[00:00 - 00:05]
hey everyone Max here welcome to the

[00:02 - 00:06]
building AI agents tutorial series over

[00:05 - 00:09]
the next couple videos we're going to

[00:06 - 00:12]
Deep dive into what AI agents are how

[00:09 - 00:13]
you can build them using n8n a powerful

[00:12 - 00:15]
work for automation

[00:13 - 00:17]
[Music]

[00:15 - 00:19]
tool by the end of this video you're

[00:17 - 00:21]
going to know what an AI agent is and

[00:19 - 00:23]
you'll have built a simple AI agent in

[00:21 - 00:25]
Ann which means that you'll know how to

[00:23 - 00:27]
use the chat trigger which is going to

[00:25 - 00:29]
allow you to send messages through UI

[00:27 - 00:31]
and send it to an AI agent you'll know

[00:29 - 00:33]
how to configure the chat model for that

[00:31 - 00:36]
AI agent you'll know how to configure

[00:33 - 00:38]
memory so that your AI agent understands

[00:36 - 00:40]
the context of a single Conversation

[00:38 - 00:42]
Over multiple messages and we'll also

[00:40 - 00:44]
touch on user messages and system

[00:42 - 00:46]
messages and some best practices around

[00:44 - 00:48]
those because a lot of the success of an

[00:46 - 00:49]
AI agent solution comes down to the

[00:48 - 00:51]
prompting this is going to be primarily

[00:49 - 00:54]
a Hands-On course we're going to be in N

[00:51 - 00:55]
end building out AI agents but just to

[00:54 - 00:58]
contextualize all this we are going to

[00:55 - 01:01]
do a quick few definitions and context

[00:58 - 01:02]
for newcomers so if you're familiar with

[01:01 - 01:04]
AI agents and have built them in a

[01:02 - 01:06]
different tool or perhaps coded them out

[01:04 - 01:08]
yourself and you're looking to just

[01:06 - 01:09]
understand how to do it in an ATN you

[01:08 - 01:11]
can skip this section but we should be

[01:09 - 01:14]
quick I'll also call out that I expect

[01:11 - 01:17]
that you have some very basic technical

[01:14 - 01:18]
understanding so you know what an API is

[01:17 - 01:20]
you know what a variable is but you

[01:18 - 01:22]
don't have to be an expert coder I most

[01:20 - 01:24]
certainly am not and I almost never

[01:22 - 01:26]
write lines of code GPT does that for me

[01:24 - 01:27]
these

[01:26 - 01:30]
[Music]

[01:27 - 01:32]
days to frame what we're doing let's

[01:30 - 01:34]
first Define what an AI agent is and to

[01:32 - 01:36]
do that let's quickly Define what a

[01:34 - 01:39]
large language model is right so a large

[01:36 - 01:41]
language model generates text based on

[01:39 - 01:44]
input text it's basically trying to

[01:41 - 01:46]
guess what the next word is based on

[01:44 - 01:48]
what you input so it's a function right

[01:46 - 01:50]
input comes in output comes out an AI

[01:48 - 01:52]
agent on the other hand Builds on top of

[01:50 - 01:54]
what an llm can do by adding goal

[01:52 - 01:56]
oriented functionality that's that task

[01:54 - 01:58]
completion that we were talking about it

[01:56 - 02:00]
also has the ability to leverage tools

[01:58 - 02:02]
and other such dependencies in short an

[02:00 - 02:04]
llm model just take some input text and

[02:02 - 02:07]
output text versus an agent can take

[02:04 - 02:10]
your input text feed that into an llm

[02:07 - 02:12]
make multiple thoughts under the hood

[02:10 - 02:14]
those thoughts can decide to use a tool

[02:12 - 02:17]
it could use that tool it can ingest the

[02:14 - 02:19]
output of that tool back into the llm

[02:17 - 02:22]
and decide what that next step is and

[02:19 - 02:24]
then finally decide in those many steps

[02:22 - 02:26]
once it has the final answer once it has

[02:24 - 02:28]
completed your task and output that now

[02:26 - 02:30]
there's dozens and probably at this

[02:28 - 02:32]
point hundreds of different tool tools

[02:30 - 02:34]
and Frameworks and systems that help you

[02:32 - 02:38]
build AI agents we're going to focus on

[02:34 - 02:41]
using NN to build our AI agents and in

[02:38 - 02:43]
short NN is a workflow automation tool

[02:41 - 02:45]
where you can build workflows with

[02:43 - 02:48]
multiple steps we call them nodes and

[02:45 - 02:50]
some of those steps can be AI agents now

[02:48 - 02:52]
the really neat thing about NN workflows

[02:50 - 02:55]
is not every step of a use case needs to

[02:52 - 02:56]
be solved by an AI agent if the first

[02:55 - 02:59]
step in your workflow is to receive an

[02:56 - 03:00]
email and check if it's valid there's

[02:59 - 03:02]
probably a really simple Le reject

[03:00 - 03:05]
function you could run to check if it

[03:02 - 03:06]
meets a certain set of rules relatively

[03:05 - 03:08]
speaking it's going to be a lot more

[03:06 - 03:09]
expensive and laggy to try and use an AI

[03:08 - 03:11]
agent for that job so the nice thing

[03:09 - 03:13]
about using a Kul like NN is we have the

[03:11 - 03:15]
flexibility to combine these

[03:13 - 03:17]
deterministic steps the things we do

[03:15 - 03:20]
with traditional programming with the

[03:17 - 03:22]
power of LMS to process things like

[03:20 - 03:25]
natural language and also multimodal use

[03:22 - 03:26]
cases right so images audio video that

[03:25 - 03:28]
sort of thing now that we've got the

[03:26 - 03:31]
definitions out of way let's open up n

[03:28 - 03:34]
ATN and build our first AI agent so I'm

[03:31 - 03:36]
here in my n account and I'm currently

[03:34 - 03:38]
inside a project but if you're in your

[03:36 - 03:39]
home section this view is going to look

[03:38 - 03:41]
very similar what we're going to want to

[03:39 - 03:43]
do is to create a new workflow so we'll

[03:41 - 03:45]
do that now in my blank workflow there's

[03:43 - 03:47]
this add First Step action that I'm

[03:45 - 03:49]
going to click and this is going to open

[03:47 - 03:50]
up what we call the nodes panel the

[03:49 - 03:52]
nodes panel is where you access all the

[03:50 - 03:54]
different nodes in NM that you can use

[03:52 - 03:56]
to build your workflow so think of a

[03:54 - 03:59]
node as a step in your flow the first

[03:56 - 04:00]
option here that we need to decide on is

[03:59 - 04:02]
how we trigger the work for how it runs

[04:00 - 04:04]
for this example we're going to build a

[04:02 - 04:06]
classic chat assistant so the user is

[04:04 - 04:08]
going to type something in the AI

[04:06 - 04:09]
agent's going to take that perform its

[04:08 - 04:12]
task on that message and send back a

[04:09 - 04:14]
response so to do that let's pick this

[04:12 - 04:16]
on chat message option which is going to

[04:14 - 04:19]
add the chat trigger to the niden canvas

[04:16 - 04:20]
this is just one way to start an AI

[04:19 - 04:22]
agentic workflow you could use a web

[04:20 - 04:24]
hawk or hundreds of different triggers

[04:22 - 04:26]
but this is a great way to get started

[04:24 - 04:28]
because this chat trigger is integrated

[04:26 - 04:30]
with nit 's chat UI so we can actually

[04:28 - 04:32]
test it in line and once it's ready to

[04:30 - 04:33]
go we can also publish that and then

[04:32 - 04:35]
once we're ready to activate this

[04:33 - 04:38]
workflow we'll be able to access a

[04:35 - 04:40]
public version of this UI so basically

[04:38 - 04:41]
creating your own chat GPT this trigger

[04:40 - 04:44]
node's job is essentially to collect the

[04:41 - 04:45]
user input and send it along to the next

[04:44 - 04:47]
step so let's click this plus button

[04:45 - 04:49]
here and again we're going to open up

[04:47 - 04:50]
the nodes panel for most of this

[04:49 - 04:53]
tutorial series we're going to be

[04:50 - 04:54]
hanging out in the advanced AI section

[04:53 - 04:56]
but there's hundreds of other nodes for

[04:54 - 04:59]
example if you want to fetch something

[04:56 - 05:01]
from an app before the AI step or do

[04:59 - 05:02]
various conditional logic and whatnot

[05:01 - 05:04]
and it then has all those sort of Key

[05:02 - 05:05]
Parts ready for you when you need to

[05:04 - 05:07]
build that out so let's go into the

[05:05 - 05:10]
advanced AI section and we're going to

[05:07 - 05:12]
want to add an AI agent there's various

[05:10 - 05:13]
other options here for really specific

[05:12 - 05:16]
use cases for example if you need to

[05:13 - 05:19]
extract information from a certain input

[05:16 - 05:21]
or analyze sentiment most of these you

[05:19 - 05:22]
could achieve with an AI agent these are

[05:21 - 05:24]
just more opinionated if you're doing

[05:22 - 05:26]
that specific use case so let's go ahead

[05:24 - 05:28]
and click the AI agent to add it to my

[05:26 - 05:29]
workflow once I add the AI agent there's

[05:28 - 05:31]
going to be a few things that we need to

[05:29 - 05:34]
set up before we can run and test this

[05:31 - 05:35]
so the way AI agent nodes work in N ATN

[05:34 - 05:37]
is they have one or more dependencies

[05:35 - 05:40]
that they need to run the chat model is

[05:37 - 05:42]
always required this is the llm that's

[05:40 - 05:44]
going to use under the hood to process

[05:42 - 05:46]
semantic text and to think so to speak

[05:44 - 05:48]
and then there's various other options

[05:46 - 05:50]
that we can also add since the chat

[05:48 - 05:51]
model is required let's set that up

[05:50 - 05:53]
first but throughout this series we'll

[05:51 - 05:56]
get into all the different dependencies

[05:53 - 05:57]
and options available for AI agents so

[05:56 - 05:59]
to add a chat model let's click this

[05:57 - 06:01]
plus here now there's various different

[05:59 - 06:03]
models that you can connect if you'd

[06:01 - 06:05]
like to self-host llms olama is going to

[06:03 - 06:07]
be a great way to go and it then has a

[06:05 - 06:08]
self-hosted AI State you could leverage

[06:07 - 06:10]
for that and that's going to let you

[06:08 - 06:12]
leverage dozens of Open Source models

[06:10 - 06:14]
that you can run on your own Hardware or

[06:12 - 06:16]
on your own bare metal since I already

[06:14 - 06:19]
have an open AI API key I'm going to go

[06:16 - 06:21]
ahead and add the open AI chat model

[06:19 - 06:22]
because I'd like to use some of their

[06:21 - 06:24]
models so let's click on that the first

[06:22 - 06:27]
thing you're going to want to do is to

[06:24 - 06:28]
add your credential now in N credentials

[06:27 - 06:30]
are separated from workflow so you can

[06:28 - 06:32]
have credentials in one spot for example

[06:30 - 06:34]
here I've got my open AI account that

[06:32 - 06:36]
I'm leveraging in each one of my

[06:34 - 06:37]
workflows that needs this chat model but

[06:36 - 06:39]
if you're opening this up for the first

[06:37 - 06:40]
time when you click this drop down

[06:39 - 06:41]
there's going to be the create new

[06:40 - 06:43]
credential button you're going to click

[06:41 - 06:45]
that in here you're going to have to add

[06:43 - 06:47]
your open AI API key that's out of scope

[06:45 - 06:48]
of this video but if you're not sure how

[06:47 - 06:51]
to do that a quick Google search uh

[06:48 - 06:53]
should help you there and you only need

[06:51 - 06:54]
an organization ID if you belong to

[06:53 - 06:56]
various organizations so for most folks

[06:54 - 06:58]
you won't have to fill this in so once

[06:56 - 07:00]
you have that API key hit save and you

[06:58 - 07:02]
should be good to go and then most chat

[07:00 - 07:03]
model nodes you will select the specific

[07:02 - 07:06]
model that you want to use so here we

[07:03 - 07:08]
could use GPT 40 for example and then

[07:06 - 07:10]
there's also options here now I'm not

[07:08 - 07:12]
going to go into every single option but

[07:10 - 07:14]
if you're ever reading an article on how

[07:12 - 07:16]
to tweak some settings in an llm to get

[07:14 - 07:18]
the results that you want those are

[07:16 - 07:19]
usually going to be found here in the

[07:18 - 07:22]
options so now that we have our chat

[07:19 - 07:24]
model set up we can test our AI agent

[07:22 - 07:25]
using the chat button because we're

[07:24 - 07:27]
using a chat trigger here so if I click

[07:25 - 07:30]
this let's just write

[07:27 - 07:32]
hello and we can see it's running

[07:30 - 07:33]
and let's have a look at these logs so

[07:32 - 07:35]
what's happened is we can see we got a

[07:33 - 07:38]
response from our AI agent hello how can

[07:35 - 07:40]
I assist you today if we open up my AI

[07:38 - 07:42]
agent what we can see is we've got some

[07:40 - 07:44]
input data this is from our chat trigger

[07:42 - 07:45]
here we can see it sent along a session

[07:44 - 07:47]
ID that's going to be great in future

[07:45 - 07:49]
when we're setting up some memory the

[07:47 - 07:50]
action so this was a send message and

[07:49 - 07:52]
then the chat input that's the message

[07:50 - 07:54]
that we just wrote and then we have some

[07:52 - 07:55]
of the settings for our AI agent here

[07:54 - 07:57]
that we're going to configure in a sec

[07:55 - 07:59]
and we can see the output this is the

[07:57 - 08:00]
message that it outputed there so inside

[07:59 - 08:03]
of as you can see we've got the input

[08:00 - 08:04]
data that comes into a node we can set

[08:03 - 08:06]
up the settings of that node to

[08:04 - 08:09]
configure how we want it to complete its

[08:06 - 08:11]
step you can reference input data to do

[08:09 - 08:12]
that to give it context and then it

[08:11 - 08:14]
outputs something so let's have a look

[08:12 - 08:15]
at the important parameters when setting

[08:14 - 08:17]
up the AI agent so there's the agent

[08:15 - 08:19]
type this is the first option here its

[08:17 - 08:21]
default is the tools agent and we're

[08:19 - 08:23]
going to focus on the tools agent

[08:21 - 08:26]
throughout this tutorial series because

[08:23 - 08:28]
it's the most advanced and comprehensive

[08:26 - 08:30]
NN AI agent available today there are a

[08:28 - 08:32]
few others but with the tools agent you

[08:30 - 08:34]
can basically achieve a lot of what

[08:32 - 08:35]
these other ones are doing I recommend

[08:34 - 08:36]
for most folks unless you really know

[08:35 - 08:38]
what you're doing just stick to this as

[08:36 - 08:39]
your default the first option here is

[08:38 - 08:41]
the prompt Source you can think of this

[08:39 - 08:42]
as the user message and if you don't

[08:41 - 08:44]
know what that is we'll explain in a

[08:42 - 08:46]
moment but this is basically the task

[08:44 - 08:48]
that we're asking the AI agent to

[08:46 - 08:50]
complete so AI agents take a task a

[08:48 - 08:51]
question then they try to answer they

[08:50 - 08:53]
try to complete the thing they were

[08:51 - 08:55]
asked to do in here the default is take

[08:53 - 08:58]
from previous node automatically so what

[08:55 - 09:00]
this does is it expects in its input

[08:58 - 09:02]
some input data with the key of chat

[09:00 - 09:05]
input so if I go over to Json view here

[09:02 - 09:06]
we can see this is actually how the data

[09:05 - 09:08]
that's coming into this node is

[09:06 - 09:10]
represented so we've got one item of

[09:08 - 09:12]
data coming in and it's got this chat

[09:10 - 09:14]
input top level text variable here

[09:12 - 09:16]
that's set to hello so as we can see

[09:14 - 09:18]
that's what it's referencing here now I

[09:16 - 09:20]
could overwrite that I could click on

[09:18 - 09:22]
prompt source and change it to Define

[09:20 - 09:26]
below and then here I could type out

[09:22 - 09:31]
static text so I could say here is my

[09:26 - 09:32]
Tusk right and now if I run this

[09:31 - 09:33]
of course please go ahead and let me

[09:32 - 09:36]
know what task you'd like assistance

[09:33 - 09:38]
with it's responding to this text here

[09:36 - 09:40]
in short be it using the chat trigger

[09:38 - 09:41]
and automatically piping that in through

[09:40 - 09:43]
the taken from previous nodes

[09:41 - 09:45]
automatically option or through defined

[09:43 - 09:47]
below it's in this text or this text

[09:45 - 09:49]
from previous node where you're defining

[09:47 - 09:50]
the task the thing that you want your AI

[09:49 - 09:52]
agent to accomplish now there's a few

[09:50 - 09:55]
other parameters that you can use to

[09:52 - 09:57]
control how your AI agent completes your

[09:55 - 09:59]
task but one of the most important ways

[09:57 - 10:02]
to control the results and the output

[09:59 - 10:04]
and basically the efficacy of an AI

[10:02 - 10:06]
agentic workflow is with what is called

[10:04 - 10:08]
the system message which you can add

[10:06 - 10:09]
from the options in here so if I click

[10:08 - 10:12]
to add that you can see it does have a

[10:09 - 10:13]
default message which is you are a

[10:12 - 10:16]
helpful assistant so we're going to

[10:13 - 10:17]
cover a few best practices for system

[10:16 - 10:19]
messages but I could do a whole

[10:17 - 10:21]
multi-part tutorial series on system

[10:19 - 10:23]
messages themselves so know that this is

[10:21 - 10:25]
General guidance and it will depend on

[10:23 - 10:27]
your specific use case nonetheless there

[10:25 - 10:28]
are some best practices that you can

[10:27 - 10:30]
abide by before we get into those you

[10:28 - 10:32]
can see already we've got two basically

[10:30 - 10:35]
places where we're providing text to our

[10:32 - 10:36]
AI agent to modulate or to inform how

[10:35 - 10:38]
it's going to complete the task right so

[10:36 - 10:40]
we have the prompt Source or the user

[10:38 - 10:43]
message as it's called in some of the

[10:40 - 10:44]
docs you might read for AI models and

[10:43 - 10:45]
then we have the system message so

[10:44 - 10:47]
what's the difference between the two so

[10:45 - 10:49]
in the user message goes the actual task

[10:47 - 10:51]
the instruction for the thing that you

[10:49 - 10:54]
want done and then the system message

[10:51 - 10:55]
defines the context behavior and rules

[10:54 - 10:57]
for how that task should be completed

[10:55 - 10:59]
think of the system message as an

[10:57 - 11:02]
instruction manual on the tone

[10:59 - 11:04]
perspective and functionality of how

[11:02 - 11:06]
basically your AI agent completes the

[11:04 - 11:09]
tasks it's asked to do crafting your

[11:06 - 11:11]
user messages and system messages are

[11:09 - 11:13]
what's collectively known as prompt

[11:11 - 11:15]
engineering now again that could be a

[11:13 - 11:17]
whole tutorial series and in fact it is

[11:15 - 11:19]
an entire profession so let's cover a

[11:17 - 11:21]
few Basics right now to get you started

[11:19 - 11:23]
but we will do more of a deep dive

[11:21 - 11:25]
throughout this tutorial Series so my

[11:23 - 11:27]
bare bones checklist when I'm creating

[11:25 - 11:29]
system messages is it should define the

[11:27 - 11:32]
role of your AI

[11:29 - 11:34]
this can be a direct voice like you are

[11:32 - 11:35]
a helpful assistant for example this is

[11:34 - 11:37]
the default message here it's defining

[11:35 - 11:40]
the role of the assistant the next thing

[11:37 - 11:43]
I typically like to provide is the style

[11:40 - 11:46]
so this is the tone a great example

[11:43 - 11:48]
might be be concise and avoid jargon

[11:46 - 11:50]
that's telling it how the output should

[11:48 - 11:52]
sound what words it should gravitate

[11:50 - 11:54]
towards what length of the text it

[11:52 - 11:56]
should be outputting and then the last

[11:54 - 11:58]
part of my simple checklist is to make

[11:56 - 11:59]
sure that you're adding boundaries to

[11:58 - 12:01]
the task now obviously that can look

[11:59 - 12:04]
different from task to task but a great

[12:01 - 12:05]
example of boundaries would be don't

[12:04 - 12:07]
hallucinate that's something if you've

[12:05 - 12:08]
been in the AI space for a little bit

[12:07 - 12:10]
you've definitely heard these prompting

[12:08 - 12:13]
hacks like don't hallucinate which

[12:10 - 12:15]
improve results of these L agents a more

[12:13 - 12:17]
tangible example of that could be

[12:15 - 12:19]
something like ask clarifying questions

[12:17 - 12:21]
if you're not sure what the user wants

[12:19 - 12:24]
to ask or don't make assumptions the

[12:21 - 12:26]
system message is a great place also to

[12:24 - 12:28]
include static context especially with

[12:26 - 12:31]
these newer AI models that have very

[12:28 - 12:33]
large context windows so an example of a

[12:31 - 12:35]
static context could be the time right

[12:33 - 12:37]
now the GPT model that we're using right

[12:35 - 12:39]
now does not know what time it is right

[12:37 - 12:40]
now in the system message this is a

[12:39 - 12:43]
great place where we could add that kind

[12:40 - 12:45]
of static context static in the sense of

[12:43 - 12:48]
it's not something AI agents using as a

[12:45 - 12:49]
tool at runtime so to add this context

[12:48 - 12:52]
we can actually use inid in Expressions

[12:49 - 12:53]
so I'll switch this to an expression and

[12:52 - 12:55]
what this is going to let me do is

[12:53 - 12:57]
basically combine JavaScript with my

[12:55 - 12:59]
static text very similar to how a mail

[12:57 - 13:02]
merge might work in a email marketing

[12:59 - 13:04]
program to do that I'll hit open

[13:02 - 13:07]
parenthesis and we see Ed 's auto

[13:04 - 13:09]
complete here and I can use the now

[13:07 - 13:11]
variable here and I'll add that and this

[13:09 - 13:13]
is including the date time stamp here

[13:11 - 13:15]
now we can see it's including this date

[13:13 - 13:18]
time here I could write something like

[13:15 - 13:20]
today is and now we have the date and

[13:18 - 13:22]
the time and even the time zone so if we

[13:20 - 13:26]
run this

[13:22 - 13:26]
again what date is it

[13:26 - 13:31]
today we can see that today is November

[13:29 - 13:33]
26th and that is correct that's when I'm

[13:31 - 13:35]
shooting this video so that's a very

[13:33 - 13:37]
simple example but it shows how we can

[13:35 - 13:40]
add context as a system message how we

[13:37 - 13:43]
can modulate its response another great

[13:40 - 13:48]
example could be output in German so now

[13:43 - 13:48]
when you ask what date is it

[13:49 - 13:54]
today

[13:51 - 13:57]
is of November my German's not that good

[13:54 - 13:59]
and as you saw I'm just writing these in

[13:57 - 14:01]
sentences here grouping this by sections

[13:59 - 14:03]
and different syntax around prompt

[14:01 - 14:05]
writing is definitely helpful here's a

[14:03 - 14:06]
quick example template you can borrow

[14:05 - 14:09]
already

[14:06 - 14:11]
today but we'll get into the details in

[14:09 - 14:14]
in future videos here we've added a chat

[14:11 - 14:16]
model we're sending in the user message

[14:14 - 14:18]
and we're also feeding in context in the

[14:16 - 14:20]
system prompt and modulating the tone or

[14:18 - 14:22]
the output so that it's in German now

[14:20 - 14:23]
that we've got the basics working let's

[14:22 - 14:25]
have a look at these other dependencies

[14:23 - 14:28]
and see how we can leverage those in our

[14:25 - 14:30]
AI workflows so memory gives your AI

[14:28 - 14:32]
agents state fness so the way a chat

[14:30 - 14:35]
model works today is if I send in a

[14:32 - 14:36]
message its job is to predict how to

[14:35 - 14:39]
complete the output it's a function

[14:36 - 14:41]
right I send in some text it will output

[14:39 - 14:43]
some text it does not remember memory in

[14:41 - 14:45]
context and when you use tools for

[14:43 - 14:47]
example like chat gbt it's actually

[14:45 - 14:49]
using a memory functionality under the

[14:47 - 14:50]
hood and remembering your messages

[14:49 - 14:53]
together and then when it sends it to

[14:50 - 14:55]
their jpt model it sends a stack of

[14:53 - 14:57]
those messages so that it has the extra

[14:55 - 14:58]
context that's what n atn's memory

[14:57 - 15:00]
feature does as well here so you don't

[14:58 - 15:02]
have to m manage that stack to highlight

[15:00 - 15:05]
this let's try to have it remember some

[15:02 - 15:07]
stuff between these executions and we'll

[15:05 - 15:08]
see that it's not able to do that so

[15:07 - 15:11]
let's change this back to English so I

[15:08 - 15:13]
can communicate with it and let's give

[15:11 - 15:16]
it something that it has to remember so

[15:13 - 15:19]
the number is three what is the number

[15:16 - 15:23]
so it should reply with three okay the

[15:19 - 15:25]
number is three now if I ask what is the

[15:23 - 15:27]
number it's not going to know what I'm

[15:25 - 15:29]
talking about because it does not know

[15:27 - 15:31]
that this happened so let's change that

[15:29 - 15:33]
by adding some memory I'll click the

[15:31 - 15:35]
plus here we have a few different memory

[15:33 - 15:37]
options so the easiest one as it's

[15:35 - 15:40]
labeled here is the window buffer memory

[15:37 - 15:42]
let's click the window buffer memory now

[15:40 - 15:44]
how memory works at a high level is it

[15:42 - 15:46]
expects a session ID every time you

[15:44 - 15:48]
reference the same session ID it finds

[15:46 - 15:50]
that session and it'll append that

[15:48 - 15:51]
latest message to that session creating

[15:50 - 15:53]
basically an array of messages or a

[15:51 - 15:55]
stack of messages the way it works in N

[15:53 - 15:56]
ATN if you're using the chat trigger is

[15:55 - 15:58]
there's really nothing to set up by

[15:56 - 16:00]
default it's taking the session ID from

[15:58 - 16:03]
the prev node where Auto piping in that

[16:00 - 16:05]
session ID you could however Define that

[16:03 - 16:06]
below but let's keep it on the default

[16:05 - 16:08]
now and then the default context window

[16:06 - 16:10]
length is five this means it's only

[16:08 - 16:11]
going to get the last five messages

[16:10 - 16:12]
which for now is fine but if you're

[16:11 - 16:14]
doing a chat based use case you're

[16:12 - 16:15]
probably going to want to bump that up

[16:14 - 16:18]
so now that we've attached some memory

[16:15 - 16:24]
let's try that example again so let's

[16:18 - 16:24]
say the number is five what is the

[16:24 - 16:29]
number we can see we've run the memory

[16:27 - 16:33]
as well so we check that okay okay the

[16:29 - 16:33]
number is five great what is the

[16:34 - 16:38]
number the number is five so now that

[16:36 - 16:40]
we've run something with multiple

[16:38 - 16:42]
dependencies we can see how the logs

[16:40 - 16:45]
could be useful here here we see the

[16:42 - 16:47]
order in which the AI called its various

[16:45 - 16:51]
dependencies so we can see at first it

[16:47 - 16:53]
used the window buffer memory and added

[16:51 - 16:54]
this message to the buffer under the

[16:53 - 16:56]
hood it also checked if if there was any

[16:54 - 16:59]
messages previously there wasn't because

[16:56 - 17:01]
we had just added it right and then made

[16:59 - 17:04]
the call to the open aai chat model and

[17:01 - 17:07]
then to the window buffer again now we

[17:04 - 17:11]
have an AI agent that can respond to

[17:07 - 17:13]
your task using a chat model and it has

[17:11 - 17:16]
statefulness which means it can remember

[17:13 - 17:18]
a chat session and multiple messages so

[17:16 - 17:20]
has that context as well let's say we've

[17:18 - 17:21]
tested my AI agent and it's ready to go

[17:20 - 17:23]
admittedly this is not the most

[17:21 - 17:25]
sophisticated example but let's say we

[17:23 - 17:28]
built it out and we want to publish it

[17:25 - 17:30]
we want to use it in prod so to speak

[17:28 - 17:33]
what we could is double click on the

[17:30 - 17:36]
chat trigger and make the chat publicly

[17:33 - 17:38]
available and we can copy this

[17:36 - 17:41]
URL and then what we're going to want to

[17:38 - 17:43]
do is save the workflow and activate it

[17:41 - 17:46]
this is going to make sure that that

[17:43 - 17:49]
public URL we just copied is live so now

[17:46 - 17:50]
if we go to a new tab and enter that URL

[17:49 - 17:54]
we can see this chat UI which is being

[17:50 - 17:59]
served by my edn workflow and so here I

[17:54 - 18:01]
could ask what is the time right now and

[17:59 - 18:04]
because we're feeding that in as context

[18:01 - 18:06]
we can see it's giving the right time

[18:04 - 18:08]
now there's some defaults in here like

[18:06 - 18:10]
the text and whatnot those can be

[18:08 - 18:12]
customized in the chat trigger you can

[18:10 - 18:13]
also attach some authentication at top

[18:12 - 18:16]
so you can ask someone to have to enter

[18:13 - 18:19]
a username and password before they use

[18:16 - 18:20]
this form which is super useful if your

[18:19 - 18:22]
AI agent can interact with your

[18:20 - 18:23]
proprietary systems which we'll cover in

[18:22 - 18:25]
the next video when we get into the

[18:23 - 18:27]
tools that the AI agents can do and

[18:25 - 18:28]
Ned's chat trigger can also handle

[18:27 - 18:30]
various options like allowing the US to

[18:28 - 18:31]
upload files and whatnot so there's

[18:30 - 18:33]
options for all those sorts of things as

[18:31 - 18:35]
well these aren't complicated settings

[18:33 - 18:37]
and there's documentation for this stuff

[18:35 - 18:38]
as well so just go check that out if

[18:37 - 18:40]
you're curious on on any of those

[18:38 - 18:43]
details now that the workflow is active

[18:40 - 18:45]
if we go over to the executions tab here

[18:43 - 18:47]
we can see the various executions of

[18:45 - 18:49]
this workflow if there's a beaker icon

[18:47 - 18:51]
next to it it means it was a test

[18:49 - 18:53]
execution which means that we ran it in

[18:51 - 18:55]
this editor otherwise if there isn't one

[18:53 - 18:57]
it means it was a production execution

[18:55 - 18:59]
which in this case means it was run

[18:57 - 19:00]
through this uh web U right here there's

[18:59 - 19:02]
a super useful feature that I'm going to

[19:00 - 19:04]
call out when you're inspecting your

[19:02 - 19:07]
production runs and you want to perhaps

[19:04 - 19:08]
iterate on your AI agent or troubleshoot

[19:07 - 19:11]
an edge case when you have your

[19:08 - 19:13]
execution open this is true for an error

[19:11 - 19:16]
execution or successful execution is you

[19:13 - 19:18]
can copy the data of this workflow run

[19:16 - 19:21]
to the editor so if I copy to editor I

[19:18 - 19:24]
can now open up my AI agent and I can

[19:21 - 19:26]
see the state of its data when it ran I

[19:24 - 19:28]
can see the logs from when it ran as

[19:26 - 19:30]
well it's useful for troubleshooting and

[19:28 - 19:32]
iterating once you published your AI

[19:30 - 19:35]
agent that's all for part one of the

[19:32 - 19:37]
intro to AI agents tutorial Series in

[19:35 - 19:39]
part two we'll explore setting up tools

[19:37 - 19:41]
for your AI agents so they can interact

[19:39 - 19:43]
with apps Services databases and even

[19:41 - 19:45]
perform mathematical operations this

[19:43 - 19:47]
series is part of my work at NN Studio

[19:45 - 19:49]
where we build Ai and automation

[19:47 - 19:51]
projects in public so make sure to

[19:49 - 19:52]
subscribe to catch part two of the

[19:51 - 19:55]
series when it comes out and for updates

[19:52 - 19:58]
on future projects I'm Max catch you in

[19:55 - 19:58]
part two

[20:00 - 20:17]
[Music]

[20:14 - 20:17]
now

## コメント

### 1. @alexanderpopov3587 (👍 21)
After spending two days in other guides for n8n I ended up here and everything is so clear and to the point! Thank you!

> **@johns.3166** (👍 1): Same, so much better than all the trendy accounts

> **@Effycte** (👍 0): @@johns.3166 Yeah! 90% of the YouTube videos leave things out so you have to join their skool group to learn it. Even then my thing is, I want to see some vids that explain real life usage scenarios for small businesses. Hopefully these courses will shed light on how to actually use these AI tools in real life

> **@noshintonny4040** (👍 0): same!!

### 2. @hsirbrmsmxbj (👍 0)
Thanks for the great breakdown! I found that using n8n with Genum really helps — prompt validation, versioning, and token tracking make it much easier to keep AI agents stable and scalable

### 3. @FPV_Luke (👍 3)
By far this is the best, well spoken and clear presentation of N8N and AI agents

> **@theflowgrammer** (👍 1): thank you so much, appreciate that!

### 4. @jimihendrix-x4r (👍 8)
I find the overview definitions of n8n so helpful,  even after using for 9  months I still struggle to explain what n8n can do.  This is brilliant thanks!

### 5. @geoxcoelho (👍 2)
This might be the best software tutorial I've ever seen. Clear, helpful - the UX has changed slightly, and yet it's still clear what to do. Well done, guys.

> **@theflowgrammer** (👍 0): thank you so much for the kind words!

### 6. @shaun8626 (👍 6)
To the point!!!
 Wasted so much time without looking at n8n's tutorials.

> **@theflowgrammer** (👍 0): Don't forget to share the good word with a friend (or 10) 😁

### 7. @maridhasanduraivelu1339 (👍 1)
Thank you for the explanation :) . You kept it clear and concise , at the same time explained all the important basic stuff. I recommend the same for your future videos, within 20 to 30 minues, so that a lunch break would be spent productively :D.

> **@theflowgrammer** (👍 0): Thanks a lot for the lovely feedback and I love "fits in a lunchbreak" as a guideline 🙏

### 8. @tahreersquare (👍 10)
We are all waiting for Part 2 bro. Thank you in advance.

> **@n8n-io** (👍 2): It's out: https://www.youtube.com/watch?v=lkudvrC3AOU

### 9. @kenzabrahimi5499 (👍 2)
Great practical video ! Thank you !

### 10. @ReputationVideos (👍 10)
Great video, I have watched and implemented quite a few n8n videos. I really like your format and the way you explain things. Just this basic video filled in a few missing gaps. Please continue to explain/show the things like json, variables, keys, java script. It is very beneficial to us that don't have any background in programing language, syntax etc.
*
Well done can't wait for your next ones! ✅☑💛

> **@ePreneurs** (👍 1): published already?

> **@cesarocamporico3152** (👍 0): Could you share your channel, any info anout n8n is gold for me, zero knowledge

### 11. @DQ940 (👍 2)
Your teaching style is excellent. Clear, concise, and high quality.

n8n is very powerful, but it is such a shame that it doesn't support streaming.  Enabling this would be a gamchanger.

> **@n8n-io** (👍 1): (Max here) Great feedback, I'm hearing this a bit about streaming and overstand how useful it would be. Have shared with the AI squad :)

### 12. @МикитаЛиходій (👍 2)
Fabulous video❤.  Canna wait to get started😎.  Thank you Max & N8N🎉

### 13. @etcheverrypablol (👍 1)
Amazing video! It's great that you create tutorial to use your tool, this will help a lot the community. Thank you.

> **@theflowgrammer** (👍 0): Thanks so much!

### 14. @p21-z8s (👍 2)
your teaching is UNPARALLEL! omg

> **@theflowgrammer** (👍 0): Thank you so much!!

### 15. @oumnyaa (👍 2)
Great video max!

### 16. @npx1989 (👍 3)
Great video, thanks! How do you create a sessionId when using the Telegram trigger node instead of the chat node?

> **@n8n-io** (👍 0): Quick idea (max here): Check if first message in thread, if yes then use the execution id using {{ $execution.id }} expression; or generate it using Crypto node (can generate a UUID there). Not a total answer, but community.n8n.io is great for such asks!

### 17. @pushingpandas6479 (👍 2)
Fecking awesome MAX!

### 18. @lofigamervibes (👍 1)
This was very, very helpful.  Thank you.

### 19. @syedabuetayebal-zeyed9423 (👍 0)
Thanks for explaining. I have seen some templates which are not connected to the nodes in a single workflow. Could you explain such a template?

### 20. @nicolasdoffay4653 (👍 0)
Very clear !!

