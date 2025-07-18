# AI Agents Fundamentals In 21 Minutes

**チャンネル:** Tina Huang
**公開日:** 2025-02-16
**URL:** https://www.youtube.com/watch?v=qU3fmidNbJE

## 説明

Improve your AI skills with the FREE Prompting QuickStart Guide I made in collaboration with Hubspot: https://clickhubspot.com/1gg9

Want to get ahead in your career using AI? Join the waitlist for my AI Agent Bootcamp: https://www.lonelyoctopus.com/ai-agent-bootcamp

🤝 Business Inquiries: https://tally.so/r/mRDV99

🖱️Links mentioned in video
========================

A few notebooks to try out from crewAI & Autogen that are easy to follow and get started. All credit goes to these companies and Deep Learning AI. Please make a copy: 

https://drive.google.com/file/d/1mtv-gdKV9HMsGvGIqZZ9tSdW-nXq6kEf/view?usp=sharing

https://drive.google.com/file/d/1u9gGPqWSJ4_Pa_cLNWbUWPhSvxen3Bvx/view?usp=sharing

https://drive.google.com/file/d/1T07WHydxBN-T-kcgi6qme-j1T94efBYf/view?usp=sharing

https://drive.google.com/file/d/1vPWpYvcHPROMC3BOEK3alT1QFSIvgA8P/view?usp=sharing

Resources I consulted in making this video:

crewAI course: https://www.deeplearning.ai/short-courses/multi-ai-agent-systems-with-crewai/

Autogen course: https://www.deeplearning.ai/short-courses/ai-agentic-design-patterns-with-autogen/

LangGraph course: https://www.deeplearning.ai/short-courses/ai-agents-in-langgraph/

David Ondrej n8n tutorial: https://youtu.be/XVO3zsHdvio?si=AQcMnYn8kJOogqLr

Andrew Ng Snowflake agentic design patterns: https://youtu.be/KrRD7r7y7NY?si=tFtd6wJKB6idtfKb

Andrew Ng Sequoia agentic design patterns: https://youtu.be/sal78ACtGTc?si=2i8Wyy57n8m6TbBK

YC business advice: https://youtu.be/ASABxNenD_U?si=k19a310Tj3USuKNe

🐙 Lonely Octopus: https://www.lonelyoctopus.com/
Check it out if you're interested in learning AI & data skill, then applying them to real freelance projects! 

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
00:38 — Video overview
01:13 — AI agents definition
03:45 — Agentic design patterns
09:24 — Multi-agent design patterns
17:04 — Building a no code agent in n8n
19:46 — Ways to use AI agents
21:05 — Quiz

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
I learned about AI agents for you so

[00:02 - 00:07]
here's the cliffnotes version to save

[00:04 - 00:08]
you weeks of me learning about this

[00:07 - 00:11]
there's not actually one course that

[00:08 - 00:13]
just fully nicely covers everything so I

[00:11 - 00:15]
did three courses wrote a bunch of

[00:13 - 00:17]
papers and watch a lot of YouTube videos

[00:15 - 00:19]
as well and of course actually made my

[00:17 - 00:22]
own agents too my notes themselves are

[00:19 - 00:24]
over 200 pages long but as per usual it

[00:22 - 00:25]
is not enough just to listen to me talk

[00:24 - 00:27]
about stuff so at the end of the video

[00:25 - 00:29]
there is a little assessment which if

[00:27 - 00:31]
you can answer these questions then

[00:29 - 00:34]
congratulations you are now educated

[00:31 - 00:36]
about AI agents now without further Ado

[00:34 - 00:38]
let's get going a portion of this video

[00:36 - 00:40]
is sponsored by HubSpot here's the

[00:38 - 00:42]
outline first we're going to talk about

[00:40 - 00:44]
what even are AI agents it is such a

[00:42 - 00:47]
hyped up term now then we'll do a crash

[00:44 - 00:49]
course on specifically multi-agent

[00:47 - 00:50]
architectures it's really interesting

[00:49 - 00:52]
developing field to make this actually

[00:50 - 00:55]
all practical I'm going to then show you

[00:52 - 00:57]
how to create an AI agent workflow which

[00:55 - 01:00]
does not require any code I was honestly

[00:57 - 01:01]
so shocked by how powerful and easy to

[01:00 - 01:02]
use as well these workflows are then

[01:01 - 01:04]
finally for those of you who are

[01:02 - 01:06]
interested in getting into the field or

[01:04 - 01:08]
even building your own AI agents for

[01:06 - 01:09]
your businesses I will leave you with a

[01:08 - 01:12]
piece of advice that when I heard it I

[01:09 - 01:15]
was like holy so stay tuned for

[01:12 - 01:17]
that at the end all right so let's first

[01:15 - 01:18]
Define agents okay so believe it or not

[01:17 - 01:21]
one of the most difficult things from

[01:18 - 01:23]
this entire Deep dive into AI agents for

[01:21 - 01:25]
me was just the actual definition of an

[01:23 - 01:27]
AI agent probably because it's just such

[01:25 - 01:29]
a new field and people are still trying

[01:27 - 01:31]
to figure out what even it is and like

[01:29 - 01:33]
how it works works so before watching

[01:31 - 01:35]
this video if you were also confused I

[01:33 - 01:36]
promise you it is not you let me walk

[01:35 - 01:38]
you through this the easiest way to

[01:36 - 01:41]
First Define ai agents is the given

[01:38 - 01:43]
example of what is not an AI agent what

[01:41 - 01:46]
is definitely not an AI agent is if you

[01:43 - 01:48]
just ask an AI to do something for you

[01:46 - 01:49]
otherwise known as one-hot prompting by

[01:48 - 01:51]
the way if you're interested in leveling

[01:49 - 01:53]
up your prompt engineering skills I did

[01:51 - 01:55]
a video over here where I distilled down

[01:53 - 01:57]
Google's 9-hour prompt engineering

[01:55 - 01:59]
course into only 20 minutes so check it

[01:57 - 02:02]
out anyways okay so what is definitely

[01:59 - 02:04]
not an AI agent is if you're just asking

[02:02 - 02:06]
AI to do something directly for example

[02:04 - 02:07]
if you just go to chat gbt and write

[02:06 - 02:09]
please write out an essay on topic X

[02:07 - 02:11]
from start to finish in one go you'll

[02:09 - 02:13]
still get a response and it'll still be

[02:11 - 02:16]
like coherent and on topic but it'll

[02:13 - 02:17]
probably also be quite vague and

[02:16 - 02:19]
probably not what you were looking for

[02:17 - 02:21]
on the other hand if you use an agentic

[02:19 - 02:23]
workflow that will significantly improve

[02:21 - 02:25]
your results and what that would look

[02:23 - 02:27]
like is to break down that overarching

[02:25 - 02:29]
task into different steps like first

[02:27 - 02:30]
maybe writing an outline for the topic

[02:29 - 02:32]
consider if you may need to do some web

[02:30 - 02:34]
research then you might write your first

[02:32 - 02:36]
draft consider what part of that draft

[02:34 - 02:38]
may need more revision or more research

[02:36 - 02:41]
revise your Draft before ultimately

[02:38 - 02:43]
coming up with the essay a non- agentic

[02:41 - 02:44]
workflow is just from start to finish

[02:43 - 02:47]
and you're done while an agentic

[02:44 - 02:49]
workflow is more a circular iterative

[02:47 - 02:50]
process you think and you do research

[02:49 - 02:52]
come up with an output and then you

[02:50 - 02:53]
revise that and then you think and you

[02:52 - 02:55]
do some more research come up with an

[02:53 - 02:57]
output and you keep doing that until you

[02:55 - 02:59]
get to your final result non agentic

[02:57 - 03:00]
workflow straight up and down a gentic

[02:59 - 03:02]
workflow

[03:00 - 03:04]
circular okay so now let's add in a

[03:02 - 03:05]
little bit of complexity you got your

[03:04 - 03:08]
non- agentic workflow then you got your

[03:05 - 03:10]
agentic workflow then you have a third

[03:08 - 03:12]
level which is a truly autonomous AI

[03:10 - 03:15]
agent this is when an AI can completely

[03:12 - 03:16]
independently figure out the exact steps

[03:15 - 03:18]
which tools to use go through that

[03:16 - 03:21]
circular process of revising things by

[03:18 - 03:22]
itself to finally come up with an output

[03:21 - 03:25]
this is the level that we want our AI

[03:22 - 03:27]
agents to become but currently as of the

[03:25 - 03:30]
time of this filming at least we are not

[03:27 - 03:32]
quite there yet we're still focusing on

[03:30 - 03:34]
this second level of agentic workflows

[03:32 - 03:36]
where there's certain agentic components

[03:34 - 03:38]
to it but it's not fully autonomous yet

[03:36 - 03:39]
but honestly with speeda AI is

[03:38 - 03:41]
developing who knows maybe in like 2

[03:39 - 03:44]
months that's going to happen we'll see

[03:41 - 03:46]
Jarvis you there that's your

[03:44 - 03:48]
Serv according to anging who's kind of

[03:46 - 03:50]
like the Superstar of the AI World there

[03:48 - 03:52]
are four massivly accepted agentic

[03:50 - 03:53]
design patterns the first and simplest

[03:52 - 03:56]
pattern is called reflection where

[03:53 - 03:58]
you're simply asking an AI to more

[03:56 - 03:59]
carefully look through its own results

[03:58 - 04:02]
for example you might ask an AI to

[03:59 - 04:04]
please write the code in order to

[04:02 - 04:05]
complete you know a specific task and

[04:04 - 04:07]
the AI is going to Output some code but

[04:05 - 04:09]
you're not going to stop there you're

[04:07 - 04:11]
going to ask the AI to please now check

[04:09 - 04:13]
the code carefully for correctness style

[04:11 - 04:15]
and efficiency and give constructive

[04:13 - 04:16]
criticism for how to improve it the AI

[04:15 - 04:19]
could look over its own code and then

[04:16 - 04:21]
maybe find out that it made it a mistake

[04:19 - 04:22]
on line five and in which case they can

[04:21 - 04:24]
actually fix that line of code and

[04:22 - 04:26]
continue improving its own output you're

[04:24 - 04:29]
sort of helping that ai go through that

[04:26 - 04:31]
circular agentic process to improve its

[04:29 - 04:34]
output a very simple extension of this

[04:31 - 04:36]
is instead of you being the one to help

[04:34 - 04:39]
the AI figure this out you can actually

[04:36 - 04:41]
create another Ai and have the other AI

[04:39 - 04:43]
prompt the original AI to go through its

[04:41 - 04:45]
own code and go through the reflection

[04:43 - 04:47]
process so this is called a multi-agent

[04:45 - 04:48]
framework and that's something that we

[04:47 - 04:50]
will talk about a little bit later in

[04:48 - 04:52]
the video and it's like a really really

[04:50 - 04:55]
interesting field next up is tool use by

[04:52 - 04:57]
giving an AI the ability to use tools

[04:55 - 04:59]
you can help the AI better break down

[04:57 - 05:01]
task and execute specific parts of the

[04:59 - 05:03]
task for example if you're interested in

[05:01 - 05:05]
buying a new coffee machine you can ask

[05:03 - 05:07]
Nai what is the best coffee maker

[05:05 - 05:09]
according to reviewers now if you give

[05:07 - 05:11]
your AI the ability to search the

[05:09 - 05:13]
internet like a web search tool you're

[05:11 - 05:14]
allowing it to add in the steps of

[05:13 - 05:17]
actually searching different reviews on

[05:14 - 05:19]
the internet compiling them together

[05:17 - 05:20]
before summarizing its findings which

[05:19 - 05:22]
you would get a much better result than

[05:20 - 05:24]
if you just ask it to directly come up

[05:22 - 05:27]
with an answer another powerful commonly

[05:24 - 05:29]
used tool is the code execution tool

[05:27 - 05:30]
this allows your AI to actually create

[05:29 - 05:32]
and to build build things like build out

[05:30 - 05:34]
a website or calculate things things

[05:32 - 05:36]
that involve numbers and math for

[05:34 - 05:39]
example you can ask the AI if I invest

[05:36 - 05:42]
$100 at compound 7% interest for 12

[05:39 - 05:44]
years what do I have at the end your AI

[05:42 - 05:45]
then can use this code execution tool to

[05:44 - 05:47]
come up with the answer for you there

[05:45 - 05:49]
are lots and lots of different tools

[05:47 - 05:51]
that you can equip your AI with

[05:49 - 05:53]
including object detection web

[05:51 - 05:55]
generation ability to access your emails

[05:53 - 05:57]
and your calendars to schedule events

[05:55 - 05:59]
for you tool use is a very powerful

[05:57 - 06:01]
agentic design pattern next up is

[05:59 - 06:04]
planning and reasoning this is when you

[06:01 - 06:06]
can give an AI a certain task that you

[06:04 - 06:09]
want done and it's able to figure out

[06:06 - 06:11]
what are the exact steps to accomplish

[06:09 - 06:13]
these and what are the necessary tools

[06:11 - 06:15]
that it needs in order to accomplish

[06:13 - 06:17]
these steps for example you can ask an

[06:15 - 06:19]
AI please generate an image where a girl

[06:17 - 06:21]
is reading a book and her pose is the

[06:19 - 06:23]
same as the boy in the image example.

[06:21 - 06:25]
JPEG then please describe the new image

[06:23 - 06:27]
with your voice with this agentic

[06:25 - 06:29]
framework it's able to First Look at the

[06:27 - 06:31]
image access a specific model to

[06:29 - 06:33]
determine the pose of the boy in the

[06:31 - 06:35]
image use another model to convert that

[06:33 - 06:38]
specific pose to an image of a girl and

[06:35 - 06:40]
another model to translate the image to

[06:38 - 06:43]
text and finally a text to speech model

[06:40 - 06:46]
to describe in audio what it is that the

[06:43 - 06:48]
girl is doing a girl is sitting on a bed

[06:46 - 06:50]
reading a book now finally we have

[06:48 - 06:52]
multi-agent systems this is when instead

[06:50 - 06:55]
of just having a single large language

[06:52 - 06:57]
model a single AI do a certain thing you

[06:55 - 07:00]
actually want to prompt different large

[06:57 - 07:01]
language models to have different rules

[07:00 - 07:03]
so the question you might have is like

[07:01 - 07:05]
why can't you just have one Ai and just

[07:03 - 07:07]
tell it to do everything right and the

[07:05 - 07:08]
reason for this is that AI in this sense

[07:07 - 07:10]
is actually quite similar to humans just

[07:08 - 07:12]
like if you're trying to complete a

[07:10 - 07:13]
project it's better to have a team of

[07:12 - 07:15]
humans that all have their own

[07:13 - 07:17]
specialized rules to come together to

[07:15 - 07:19]
complete the project as opposed to just

[07:17 - 07:21]
have like one person trying to juggle

[07:19 - 07:22]
and handle everything same thing for AI

[07:21 - 07:25]
there's research that shows by having

[07:22 - 07:26]
this multi-agent workflow the results of

[07:25 - 07:29]
the final product is generally better

[07:26 - 07:30]
than just asking one AI to do all of it

[07:29 - 07:32]
okay so here's a pneumonic in case you

[07:30 - 07:34]
can't remember what the four agentic

[07:32 - 07:37]
design patterns are just think about red

[07:34 - 07:41]
turtles paint murals reflection tool use

[07:37 - 07:42]
planning and multi-agents hint this will

[07:41 - 07:44]
help in the little assessment at the end

[07:42 - 07:46]
of this video okay so to make this all a

[07:44 - 07:48]
little bit more concrete anding also

[07:46 - 07:49]
showed us some tasks like some really

[07:48 - 07:51]
cool tasks that were able to be

[07:49 - 07:53]
accomplished by using these agentic

[07:51 - 07:55]
design patterns for example like with

[07:53 - 07:57]
this tool that has a agentic workflow

[07:55 - 07:59]
built into it you can take an image of

[07:57 - 08:01]
this soccer game and be able to identify

[07:59 - 08:03]
Y and count number of players on the

[08:01 - 08:05]
field you can also do stuff with video

[08:03 - 08:08]
by prompting it given a video split the

[08:05 - 08:09]
video into clips of 5 Seconds and find a

[08:08 - 08:11]
clip where the goal is being scored

[08:09 - 08:13]
display the frames associated with the

[08:11 - 08:15]
goal that is pretty cool just thinking

[08:13 - 08:17]
about the use cases you can do with so

[08:15 - 08:19]
much video and image data that is

[08:17 - 08:21]
currently untapped some other examples

[08:19 - 08:23]
of a gentic systems that have produced

[08:21 - 08:25]
really good results include AI powered

[08:23 - 08:27]
research assistants that's able to

[08:25 - 08:29]
research specific topics AI writers that

[08:27 - 08:31]
can then write down these topics coders

[08:29 - 08:33]
who can create software and personal

[08:31 - 08:35]
assistance which I will actually show

[08:33 - 08:37]
you how to build one later in the video

[08:35 - 08:40]
as we see today AI agents and agentic

[08:37 - 08:42]
workflows just like any other AI tool

[08:40 - 08:44]
has a large component of prompt

[08:42 - 08:45]
engineering it just shows that prompt

[08:44 - 08:47]
engineering really is one of the highest

[08:45 - 08:49]
Roi skills that you can learn today so

[08:47 - 08:50]
if you're interested in leveling up your

[08:49 - 08:52]
prompting skills I highly recommend that

[08:50 - 08:53]
you check out this free prompt

[08:52 - 08:56]
engineering Quickstar guide that I made

[08:53 - 08:57]
with HubSpot it includes a step-by-step

[08:56 - 08:59]
guide for creating great prompts and

[08:57 - 09:01]
also tips to get better results my

[08:59 - 09:03]
favorite part is that for all the

[09:01 - 09:05]
examples there's a flow from bad to good

[09:03 - 09:07]
to Great prompts to show how you can

[09:05 - 09:08]
improve a prompt if you're able to go

[09:07 - 09:10]
through this process and create great

[09:08 - 09:12]
prompts you would just become so much

[09:10 - 09:14]
more productive and get so much more out

[09:12 - 09:15]
of AI so if you're interested do check

[09:14 - 09:17]
it out at this link over here also

[09:15 - 09:18]
linked in description thank you so much

[09:17 - 09:20]
Hobs spa for creating this free resource

[09:18 - 09:22]
with me and for sponsoring this portion

[09:20 - 09:22]
of the

[09:23 - 09:28]
video next up I want to do a quick crash

[09:25 - 09:29]
course on multi-agent design patterns

[09:28 - 09:31]
specifically this is where the 's a lot

[09:29 - 09:33]
of focus and really cool breakthroughs

[09:31 - 09:34]
that are happening I did a couple

[09:33 - 09:36]
courses the best course that I found

[09:34 - 09:38]
specifically for this topic was one by

[09:36 - 09:40]
crew AI in collaboration with deep

[09:38 - 09:42]
learning AI this course by crew AI gives

[09:40 - 09:45]
a really good introduction to different

[09:42 - 09:47]
types of multi-agent design patterns

[09:45 - 09:49]
which I'm going to Now cover the first

[09:47 - 09:52]
building block is a single AI agent and

[09:49 - 09:55]
a single AI agent has four components it

[09:52 - 09:56]
needs to have a specific task and answer

[09:55 - 09:59]
what it's supposed to give you the model

[09:56 - 10:01]
itself and tools that it has access to a

[09:59 - 10:04]
nice little pneumonic here is tired

[10:01 - 10:06]
alpaca's mix te task answers models

[10:04 - 10:09]
tools for example you can have a travel

[10:06 - 10:12]
planner AI agent its task is to plan a

[10:09 - 10:14]
3-day trip to Tokyo on a budget the

[10:12 - 10:17]
answer that you want is a detailed itery

[10:14 - 10:19]
with locations and cost as well as hotel

[10:17 - 10:21]
bookings and any tickets the AI model

[10:19 - 10:23]
could be anthropic CLA for example

[10:21 - 10:25]
although you can switch that out for any

[10:23 - 10:27]
other models that you like as well the

[10:25 - 10:29]
tools that it needs include Google Maps

[10:27 - 10:30]
Skyscanner for figuring out what the ti

[10:29 - 10:33]
tickets are how much they cost

[10:30 - 10:35]
booking.com for Logistics and your saved

[10:33 - 10:37]
credit card informations so that you can

[10:35 - 10:40]
actually place these bookings task

[10:37 - 10:42]
answer model tools tired alpaca's mix te

[10:40 - 10:45]
okay so we have our first singular unit

[10:42 - 10:47]
of an agent and the simplest multi- aai

[10:45 - 10:49]
agent would just be have two AI agents

[10:47 - 10:51]
that work together on something each AI

[10:49 - 10:53]
agent has its own programming but

[10:51 - 10:55]
they're working together towards

[10:53 - 10:56]
something an example of this would be a

[10:55 - 10:59]
writer agent who is meant to write a

[10:56 - 11:02]
blog article and an editor agent who is

[10:59 - 11:03]
providing feedback for the writer even

[11:02 - 11:05]
say with just two agents there's a

[11:03 - 11:07]
couple interesting points here an agent

[11:05 - 11:09]
can have its own task but an agent can

[11:07 - 11:11]
also be working with another agent on a

[11:09 - 11:13]
task while having its own task as well

[11:11 - 11:15]
so there could be a lot of crisscross

[11:13 - 11:18]
that's happening and for tools agents

[11:15 - 11:21]
can have their own separate tools but a

[11:18 - 11:22]
task can also have a tool which is

[11:21 - 11:25]
really interesting you can actually

[11:22 - 11:27]
program a task to have a specific tool

[11:25 - 11:30]
so that an agent can only have access to

[11:27 - 11:32]
it for that task and if you have more

[11:30 - 11:35]
than one agent then you have a crew

[11:32 - 11:37]
hence the name crew AI now when you add

[11:35 - 11:39]
in additional agents there is even more

[11:37 - 11:41]
complexity and it becomes really really

[11:39 - 11:43]
interesting on how agents are

[11:41 - 11:44]
interacting with each other I can go on

[11:43 - 11:46]
for ages about all the different

[11:44 - 11:48]
configurations of Agents working

[11:46 - 11:50]
together and the tools that they're

[11:48 - 11:52]
using but this course does give us a

[11:50 - 11:53]
really nice kind of overview of the

[11:52 - 11:55]
different design patterns that people

[11:53 - 11:57]
have used and seem to be really helpful

[11:55 - 11:59]
the first one is the sequential pattern

[11:57 - 12:00]
this is the simplest when you just have

[11:59 - 12:02]
one One agent do something and then it

[12:00 - 12:03]
passes it on to another agent that does

[12:02 - 12:05]
something else and another agent that

[12:03 - 12:06]
does something else sort of like an

[12:05 - 12:09]
assembly line an example it has would be

[12:06 - 12:11]
AI powered document processing you can

[12:09 - 12:13]
have your first agent which extracts

[12:11 - 12:15]
text from scan documents that it passes

[12:13 - 12:18]
on to another agent who summarizes the

[12:15 - 12:19]
text then passes on to the next agent

[12:18 - 12:21]
who then extracts action items and puts

[12:19 - 12:24]
it into a summary and finally to a

[12:21 - 12:28]
fourth agent that saves the data into a

[12:24 - 12:31]
database a higher article higher AR a

[12:28 - 12:34]
higher AR h two hours later higher

[12:31 - 12:36]
article agent system would have a leader

[12:34 - 12:38]
or manager agent that supervised

[12:36 - 12:40]
multiple agents that have their own

[12:38 - 12:41]
specific task these sub agents will

[12:40 - 12:43]
complete their task and Report their

[12:41 - 12:45]
results back to the manager agent who

[12:43 - 12:47]
then compiles it all together an example

[12:45 - 12:48]
of this would be writing a report for

[12:47 - 12:51]
business decision-making you have your

[12:48 - 12:53]
manager AI agent that receives this task

[12:51 - 12:55]
and then delegates it to different sub

[12:53 - 12:57]
agents sub agent one monitors and

[12:55 - 12:59]
reports back market trends and it would

[12:57 - 13:01]
have specialized tools for looking into

[12:59 - 13:04]
these markets sub agent 2 could be

[13:01 - 13:06]
monitoring internal customer sentiment

[13:04 - 13:08]
so has access to the internal databases

[13:06 - 13:10]
to see what kind of feedback customers

[13:08 - 13:13]
are giving while sub agent 3 tracks

[13:10 - 13:15]
internal metrics across the company so

[13:13 - 13:17]
it's understanding how this specific

[13:15 - 13:19]
product is interplaying with other

[13:17 - 13:20]
products within the company now after

[13:19 - 13:22]
all these agents do their job they would

[13:20 - 13:24]
all report back to the manager agent

[13:22 - 13:26]
who's able to combine everything

[13:24 - 13:28]
together and it might actually pass this

[13:26 - 13:30]
along to another agent say like a

[13:28 - 13:32]
decision making agent who may aggregate

[13:30 - 13:34]
different insights and professionally

[13:32 - 13:36]
put it into a report and come up with a

[13:34 - 13:38]
ultimate business decision next up is

[13:36 - 13:41]
the hybrid system this combines

[13:38 - 13:42]
different sequential and hierarchical

[13:41 - 13:44]
structures together agents can

[13:42 - 13:46]
collaborate top down as well as

[13:44 - 13:48]
sequentially an example of this would be

[13:46 - 13:50]
in autonomous vehicles at the top level

[13:48 - 13:52]
you might have a AI agent that plans the

[13:50 - 13:54]
overall route and traffic strategy for

[13:52 - 13:56]
an autonomous vehicle then you have the

[13:54 - 13:58]
sub agents that handle things like

[13:56 - 13:59]
real-time Sensor Fusion collision

[13:58 - 14:01]
avoidance

[13:59 - 14:03]
and road condition analysis but it's not

[14:01 - 14:04]
enough just to aggregate this

[14:03 - 14:06]
information together and then just give

[14:04 - 14:08]
it to the top level AI because you need

[14:06 - 14:10]
to have a continuous feedback loop as

[14:08 - 14:12]
the vehicle itself is moving and the

[14:10 - 14:13]
road conditions and everything around it

[14:12 - 14:15]
internally and externally is all

[14:13 - 14:17]
changing as well you need to have lots

[14:15 - 14:18]
of different little feedback loops

[14:17 - 14:21]
between these different agents and then

[14:18 - 14:22]
communicating continuously with the top

[14:21 - 14:25]
level agent as well this design pattern

[14:22 - 14:27]
is really common in things like robotics

[14:25 - 14:29]
navigation systems and adaptive AI

[14:27 - 14:31]
systems basically like in places where

[14:29 - 14:33]
there's lots of moving Parts there are

[14:31 - 14:35]
also parallel agent Design Systems this

[14:33 - 14:36]
is when you have agents working on

[14:35 - 14:38]
different work streams independently

[14:36 - 14:40]
agents would be handling different parts

[14:38 - 14:42]
of a task simultaneously often to speed

[14:40 - 14:45]
up processing an example of this would

[14:42 - 14:47]
be like AI for large scale data analysis

[14:45 - 14:49]
this is a very common structure the very

[14:47 - 14:51]
large analysis involves different

[14:49 - 14:53]
components and agents will take chunks

[14:51 - 14:55]
of that data and process them separately

[14:53 - 14:56]
ultimately at the end merging everything

[14:55 - 14:59]
together and finally there's

[14:56 - 15:01]
asynchronous multi-agent systems this is

[14:59 - 15:03]
when agents execute tax independently

[15:01 - 15:05]
and at different times this is a system

[15:03 - 15:07]
that's proven to handle uncertain

[15:05 - 15:09]
conditions better than sequential or

[15:07 - 15:11]
parallel approaches an example of this

[15:09 - 15:13]
would be something like an AI powered

[15:11 - 15:15]
cyber security threat detection you got

[15:13 - 15:17]
agent one that's monitoring Network

[15:15 - 15:19]
traffic in real time agent two that's

[15:17 - 15:20]
monitoring suspicious usage patterns and

[15:19 - 15:22]
agent three that's just randomly

[15:20 - 15:24]
sampling and testing out different use

[15:22 - 15:26]
cases when any of these agents picked up

[15:24 - 15:27]
something anomalous they would flag it

[15:26 - 15:29]
and then other things would happen after

[15:27 - 15:31]
that this type of AC synchronous design

[15:29 - 15:33]
pattern is especially helpful for

[15:31 - 15:35]
anything that requires real-time

[15:33 - 15:37]
monitoring or self-healing systems and

[15:35 - 15:39]
finally to put them all together you can

[15:37 - 15:41]
actually have these different systems

[15:39 - 15:43]
and then link up these systems

[15:41 - 15:45]
themselves and this is called a float

[15:43 - 15:47]
this can result in really complex and

[15:45 - 15:50]
interesting processing and results but

[15:47 - 15:52]
the note to make here is that as you

[15:50 - 15:54]
increase the complexity of these systems

[15:52 - 15:56]
you're also basically increasing the

[15:54 - 15:58]
amount of chaos that's within it as well

[15:56 - 16:01]
since you don't actually have like

[15:58 - 16:02]
Direct access to these agents right like

[16:01 - 16:04]
you can provide them with feedback and

[16:02 - 16:06]
there's ways of doing that but as you

[16:04 - 16:08]
add on more and more complexity there's

[16:06 - 16:09]
more things and more moving parts that

[16:08 - 16:11]
are kind of just like interacting with

[16:09 - 16:13]
each other it's actually pretty similar

[16:11 - 16:15]
to how human companies work right the

[16:13 - 16:17]
bigger your company becomes the more

[16:15 - 16:18]
chaotic it starts becoming as well and

[16:17 - 16:20]
the more emphasis you need to place on

[16:18 - 16:22]
like hierarchies and different you know

[16:20 - 16:25]
organization structures I don't know

[16:22 - 16:27]
this for sure but if I were to bet I do

[16:25 - 16:29]
think a lot of research that people do

[16:27 - 16:31]
into systems like human systems and

[16:29 - 16:34]
companies probably also comes into play

[16:31 - 16:35]
for multi-agent AI systems too for the

[16:34 - 16:36]
rest of the course they basically go

[16:35 - 16:38]
through different implementations and

[16:36 - 16:39]
examples for these different multi- aai

[16:38 - 16:41]
agent systems so instead of going

[16:39 - 16:42]
through all of these examples I'm just

[16:41 - 16:44]
going to link in the description some of

[16:42 - 16:47]
these notebooks where you can use code

[16:44 - 16:48]
to implement these systems using crew AI

[16:47 - 16:49]
but do not worry if you're not a coder

[16:48 - 16:51]
where you're just not interested in

[16:49 - 16:54]
coding I'm actually going to now show

[16:51 - 16:56]
you a way of creating these multi- aai

[16:54 - 16:59]
agent systems completely with a no code

[16:56 - 17:01]
tool called n8n robot building sequence

[16:59 - 17:03]
activated I'm so glad we tried out our

[17:01 - 17:05]
new Android building device instead of

[17:03 - 17:08]
using that old dinosaur some of you guys

[17:05 - 17:10]
may have heard of make.com which people

[17:08 - 17:12]
also use to make these multi- aai agent

[17:10 - 17:14]
systems um but na an is actually better

[17:12 - 17:16]
for doing this specifically credit here

[17:14 - 17:18]
to David Andre's 40-minute tutorial

[17:16 - 17:20]
which is what I follow and adapted to

[17:18 - 17:23]
create my own AI assistant this is a

[17:20 - 17:25]
telegram based AI assistant that's able

[17:23 - 17:26]
to communicate with you and help you

[17:25 - 17:28]
prioritize your task by accessing your

[17:26 - 17:30]
Google calendars and it can also create

[17:28 - 17:32]
calendar events for you so you can go on

[17:30 - 17:34]
Telegram and talk to Inky bot which is

[17:32 - 17:36]
the assistant's name and say what do I

[17:34 - 17:39]
need to do today and it tells me that

[17:36 - 17:42]
today is February 5th 2025 and I have to

[17:39 - 17:44]
film this video and the time is from

[17:42 - 17:46]
12:00 p.m. until 400 p.m. in Hong Kong

[17:44 - 17:48]
and it also asked me to list what are my

[17:46 - 17:50]
other priorities for today so that it

[17:48 - 17:53]
can come up with a list of tasks and

[17:50 - 17:54]
prioritize it for me so I'm just telling

[17:53 - 17:56]
that filming is my greatest priority and

[17:54 - 17:58]
have these other things so it's able to

[17:56 - 17:59]
prioritize and put in sequence my other

[17:58 - 18:02]
tasks as as well as actually schedule

[17:59 - 18:04]
calendar events corresponding to these

[18:02 - 18:06]
specific task okay so the way that this

[18:04 - 18:08]
flow works is first you have the

[18:06 - 18:10]
telegram trigger so this is when I send

[18:08 - 18:12]
a message to Inky bot and from there

[18:10 - 18:15]
there's a switch um this is because it

[18:12 - 18:17]
can take both text and voice input so if

[18:15 - 18:18]
it's text input you would just directly

[18:17 - 18:21]
take that information and feed it into

[18:18 - 18:23]
the AI agent but if it's voice input we

[18:21 - 18:26]
first get telegram to get the file send

[18:23 - 18:28]
it to open AI to transcribe the file and

[18:26 - 18:30]
then send the text information to the AI

[18:28 - 18:32]
agent as well now the AI agent here is

[18:30 - 18:35]
the interesting part remember tired

[18:32 - 18:37]
alpacas make tea the task is taking the

[18:35 - 18:39]
user's query asking about what needs to

[18:37 - 18:42]
be done for today the answer is a

[18:39 - 18:44]
prioritized to-do list as well as

[18:42 - 18:45]
scheduled events into Google Calendar if

[18:44 - 18:48]
needed the model we're using here is

[18:45 - 18:50]
open AI GPT 40 mini but you can also

[18:48 - 18:52]
change that out for whatever other model

[18:50 - 18:54]
that you want as well like Claud Gemini

[18:52 - 18:56]
llama deep seek whatever you like and

[18:54 - 18:58]
finally it has two different tools the

[18:56 - 19:00]
first tool is the get calendar events so

[18:58 - 19:02]
it's able to read the Google calendar

[19:00 - 19:05]
and see what events there are for the

[19:02 - 19:06]
day it can also create calendar events

[19:05 - 19:09]
so when the user wants to add other

[19:06 - 19:11]
events into the list it can then go and

[19:09 - 19:13]
actually create these events on the

[19:11 - 19:15]
Google Calendar yeah and then it would

[19:13 - 19:18]
be able to communicate through telegram

[19:15 - 19:20]
with the user until it comes up with a

[19:18 - 19:21]
list that the user is happy about they

[19:20 - 19:24]
can also do things like check off the

[19:21 - 19:26]
list plan ahead look at what happened in

[19:24 - 19:27]
the past a lot of other things as well

[19:26 - 19:29]
as you can see just the single agent the

[19:27 - 19:31]
super simple work flow can already

[19:29 - 19:34]
produce really cool results so think

[19:31 - 19:36]
about adding other agents there other

[19:34 - 19:38]
functionalities it's really really cool

[19:36 - 19:41]
what you can do with this and it's

[19:38 - 19:41]
totally no code which is

[19:45 - 19:50]
crazy all right final section is on the

[19:47 - 19:52]
opportunities for AI agents I watched a

[19:50 - 19:55]
lot of YouTube videos and read a lot of

[19:52 - 19:56]
Articles mostly for this section and the

[19:55 - 19:58]
biggest takeaway that I got from this

[19:56 - 20:00]
like assuming you want to be building

[19:58 - 20:01]
something thing using AI agents

[20:00 - 20:03]
something that is useful for other

[20:01 - 20:05]
people you're building up a business is

[20:03 - 20:07]
from this why combinator video where

[20:05 - 20:10]
they say that for every SAS or software

[20:07 - 20:12]
as a service company there will be a

[20:10 - 20:14]
corresponding AI agent company let me

[20:12 - 20:15]
just like repeat that because this is

[20:14 - 20:18]
like huge guidance in terms of what to

[20:15 - 20:19]
build for every software as a service

[20:18 - 20:21]
company like all the software service

[20:19 - 20:23]
companies that we see today there will

[20:21 - 20:26]
be a corresponding AI agent version of

[20:23 - 20:27]
that so if you don't know what to build

[20:26 - 20:30]
or what to do right now and you want to

[20:27 - 20:32]
play around with a agents just literally

[20:30 - 20:34]
take a SAS company and then think about

[20:32 - 20:36]
how do I make that into an AI agent

[20:34 - 20:39]
company just ask chachu BT what are some

[20:36 - 20:43]
top SAS companies says Adobe Microsoft

[20:39 - 20:45]
Salesforce Shopify link tree canva

[20:43 - 20:47]
Squarespace and on and on and on and on

[20:45 - 20:49]
there are so many literally every

[20:47 - 20:52]
company that is a sass unicorn you could

[20:49 - 20:54]
imagine there's a vertical AI unicorn

[20:52 - 20:56]
equivalent I really think that piece of

[20:54 - 20:58]
advice is literal gold let me know in

[20:56 - 20:59]
the comments if there's a specific AI

[20:58 - 21:02]
agent that you're interested in building

[20:59 - 21:04]
or an AI agent business all right we

[21:02 - 21:05]
have come to the end of this video thank

[21:04 - 21:07]
you so much for watching through it as

[21:05 - 21:10]
promised here is a little assessment if

[21:07 - 21:11]
you can answer all these questions then

[21:10 - 21:14]
congratulations you can consider

[21:11 - 21:15]
yourself educated on AI agents let me

[21:14 - 21:17]
know in the comments what other topics

[21:15 - 21:19]
whether that's like AI topics or other

[21:17 - 21:22]
topics is fine as well that you want me

[21:19 - 21:23]
to do a deep dive into all right thank

[21:22 - 21:25]
you all so much for watching and I will

[21:23 - 21:28]
see you guys in the next video where

[21:25 - 21:28]
live stream

## コメント

### 1. @TinaHuang1 (👍 193)
Improve your AI skills with the FREE Prompting QuickStart Guide I made in collaboration with Hubspot: https://clickhubspot.com/1gg9

> **@12567NoYouCannot** (👍 12): Your Creative and Excellent Skills Expand to VIDEO MAKING!! Amazing Job with this Video!!

> **@stevenbraun918** (👍 4): Link is not working for me :(

> **@krox477** (👍 3): I would have signed up but it wants my phone number not really secure

> **@erkinalp** (👍 2): Chinese version?

> **@rambokanambo2974** (👍 4): I am impressed. One of the best videos on the subject. Watching for the second time

### 2. @wp1300 (👍 220)
3:52 Reflection
4:52 Tool Use
6:00 Planning & Reasoning
9:28 Multi-Agent Architectures Crash Course
11:57 Sequential Pattern
12:27 Hierarchical 😄
13:36 Hybrid
14:33 Parallel Agent Design System
14:58 Asynchronous Multi-Agent Systems
15:40 Flow
17:11 n8n

> **@patmclaughlin107** (👍 4): Thank you, sir/madam!

> **@jmas2312** (👍 1): Helping each other is an awesome thing. Thank you

> **@txoricin** (👍 0): Legend

> **@mrsimo7144** (👍 1): Legend. Thank you.

### 3. @Somi-x4n3v (👍 44)
Wow . I have been building these for about a month but how you explained I couldn't have . You simply gave out. 3-6 months of research, finding, deciding, understanding, planing in 20mins.

### 4. @Thomas_automations (👍 38)
This AI Agent guide really includes everything. There is definitely a massive opportunity with it.

### 5. @RhodaMayG (👍 157)
Your prep for this video is so freaking impressive, I almost did not care what ai agents are. I subscribed just from her effort alone. ❤❤

> **@TinaHuang1** (👍 19): Awww I feel so appreciated 🤗

> **@RhodaMayG** (👍 7): @ you deserve it and more!! ❤️🙏🏼

> **@RealBasementCouch** (👍 3): Agreed! Thank you- I just subscribed too! 😊

> **@chrisdavisunofficial** (👍 3): Haha, I came to the comments to say the same thing.

> **@joel230182** (👍 0): wao q lambona

### 6. @MrMiscellaneousOG (👍 371)
This shit is revolutionary, whoever is watching this right now is ahead of 99% of the masses

> **@sinzianaacatrinei1549** (👍 10): Agreed

> **@awadkhank** (👍 10): It's old and secondly you can't beat Saas companies 😂 so it's good as for as you built it for yourself or for your website.....but no one will pay you if you create an AI agent

> **@raghavkhulbe4493** (👍 17): @@awadkhank im already running a pretty good ai agent agency so idk what you are talking about lad. Just be good and everything will work

> **@kspov8590** (👍 1): @@awadkhanksays the anon ignoramus

> **@amoeintdigitalaccess719** (👍 0): ​@@awadkhankBut I'm been paid to set up n8n AI agent like this for sales companies and business consultants in Fiverr ..

Using Go high level

### 7. @AndreBellCopywriter (👍 51)
It took me a couple of years to work up the nerve to create an AI Agent. The whole idea felt way over my head. But after months of mapping out exactly what I wanted mine to do, YouTube (thankfully) put your videos in front of me. I watched, I learned. And after weeks of fighting ChatGPT to stay in the lanes I set… I finally have a working AI Agent. Not easy. Honestly, it was brutal. But it works. Very well. It’s going to save me thousands of hours of manual work which I would probably not accomplish otherwise. Or, not as well.
Just wanted to say thank you for making these AI videos and for not quitting when you said you had been thinking of doing so. They (you) made a real difference.

> **@Marmur21** (👍 3): Well done and congratulations on your perseverance! I'm entirely new to the subject and trying to wrap my head around it. What does your AI Agent do, if you don't mind sharing??

> **@AndreBellCopywriter** (👍 2): ​ @Marmur21  Thank you. I really appreciate that. I'd love to share what my AI Agent does but I want to respect Tina Huang's space and not promote my own work on her channel without permission. I’m glad you asked though. If she ever gives the green light I’ll be happy to share exactly what it does bc am so wanting even more folks to test it before I spend time creating a more involved 'pro' version. Otherwise I'll stop with this version.

> **@FindYourFlock** (👍 2): @@AndreBellCopywriter please bro tell us what it does

> **@carolc9654** (👍 1): I hope Tina will greenlight this, I'd love to know as well. Congrats on your success!

> **@AndreBellCopywriter** (👍 1): I hope she does *not*. My agent isn't directly relevant to the material in her video. Her material sums up in minutes several hours of content found in the actual training materials. And she makes understanding new concepts that much easier. My Ai agent is of no use to anyone looking to learn to create AI agents. Instead watch her videos then go through the full training so you do not miss anything she felt might have felt wasn't relevant, but might be relevant to you. Thx tho for the encouragement.

### 8. @goblin1871 (👍 13)
Extremely well done. Tina sets a high bar for YouTube content. The video is quick, concise, and dense with information. The links are great for additional research. Great work, Tina!

### 9. @MANJOTDHAONOA (👍 311)
If you're reading this right now, I just want to say; I'm rooting for you. We’re strangers, but that doesn’t mean I don’t care. I know what it’s like to feel like you're pushing a boulder uphill. I felt that way until I picked up Manifest and Receive by Eva Hartley I can’t explain it perfectly, but it changed my whole perspective. After checking it out on youtube and reading it things have been flowing—money, peace, confidence. maybe this is your moment too. Stay open. Wishing you more than you ever imagined✨

> **@niani-unas6151** (👍 0): I needed that , thank you 🙏🏽

### 10. @CuriousWRLDs (👍 167)
This is so amazing, I am 23 yo and working in financial industry right now. I can say this is so new and still developing that a lot of companies do not utilize this. This is going to change the world.

> **@etcetc3800** (👍 17): Lol it's gonna take millions of jobs

> **@CuriousWRLDs** (👍 17): @ it will take humans to develop the completed autonomous programs that will take certain percentage of jobs. It has ability to create some jobs too. But this is a dilemma I think about creating these Ai agents. Is it doing more harm than good. But If I don’t do this, someone else will.

> **@etcetc3800** (👍 6): @@CuriousWRLDs it depends on who is in power and which side they're on. Are they truly working for the people or working for billionaire oligarchy. Refer to the great depression as to what might happen but this time there's no wartime production that will save anyone. There isn't a single job that's safe from AI and robotics.

> **@EnigmaticRealms1** (👍 2): Nothing amazing about losing everyone their jobs. Including you

> **@maxpons1722** (👍 0): @@etcetc3800All new technologies create more jobs than the jobs that disappear because of its implementation

### 11. @aerozg (👍 6)
Yup, this is the right way of using agents - as assistants - not completely generate everything from scratch, at least for me. My use case is that i am curious, and in the past i liked to pick a topic, research it for weeks or months, and then do an essay on it. I still do it, and just use AI agents to help me pin-point and sift through the research to filter the exact information i am looking for. After that i still do all these steps to granularly refine all the parts of my essay until i am satisfied and can put it in my publishing queue. I love it!

### 12. @lastochkoff (👍 880)
You have a talent for teaching! Finally a video that makes sense. I was able to build my AICarma! Thank you!

### 13. @omegoa (👍 0)
Hey Tina, thanks for doing all that legwork and sifting out the important parts. We all know there's tons of detail, but this is super helpful.

### 14. @ATL_Immigration_Lawyer (👍 14)
This is very well made. A rare high-quality video about AI on YouTube. Easy follow. Keep up the good work!

### 15. @maxtheseira8702 (👍 0)
Very accessible introduction to AI Agents. You did some good research and presented your findings in a very easy to understand and instructional way. Well done on the instructional design of this and many of your other videos. You manage to condense a lot into a short time  without loosing too much depth on the topic. The format seems to work well and providing the links enables the viewer to dig deeper. Kudos to you.

### 16. @Bye.felicia-icecube (👍 7)
Thank u for taking your time to make this video to help people that want to know about this

### 17. @SonicPlanet-Inc (👍 20)
Just the hierarchical Agent tongue-tied let me subscribed 😀 . You did such a fantastic job explaining each component. A teacher with humor makes the best teacher. Keep up the good work, and i will see you in the next class.

### 18. @soldbyauthor (👍 51)
I'm only 55 seconds in and WAY impressed already! What a work ethic you have!! Amazing!

### 19. @Seevawonderloaf (👍 0)
I'm so impressed by the amount of research you did - 3 courses, 200 pages of notes...etc. Wow. I am subscribed now!

### 20. @TylerJamesPhillips_ROSSI (👍 21)
One of the best channels on YouTube you and Alex Sheppe are my favorite channels right now.

> **@lucface** (👍 1): I know. Love it. I come here for my reinforcements for my learning. I’m starting my YouTube channel and it will have lots of similarities for sure. The summarizing and breaking down your learnings is so cool especially how it helps you learn. Perfect.

