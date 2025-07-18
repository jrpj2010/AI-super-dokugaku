# Prompt Engineering Guide - From Beginner to Advanced

**チャンネル:** Matthew Berman
**公開日:** 2025-06-03
**URL:** https://www.youtube.com/watch?v=uDIW34h8cmM

## 説明

Join My Newsletter for Regular AI Updates 👇🏼
https://forwardfuture.ai

Discover The Best AI Tools👇🏼
https://tools.forwardfuture.ai

My Links 🔗
👉🏻 X: https://x.com/matthewberman
👉🏻 Instagram: https://www.instagram.com/matthewberman_ai
👉🏻 Discord: https://discord.gg/xxysSXBxFW

Media/Sponsorship Inquiries ✅ 
https://bit.ly/44TC45V

Disclosure: I am a small investor in Crew AI.

Links:
https://www.gptaiflow.tech/assets/files/2025-01-18-pdf-1-TechAI-Goolge-whitepaper_Prompt%20Engineering_v4-af36dcc7a49bb7269a58b1c9b89a8ae1.pdf

## 字幕

[00:00 - 00:03]
This is everything you need to know

[00:01 - 00:04]
about prompt engineering. If you're not

[00:03 - 00:07]
familiar with the term prompt

[00:04 - 00:09]
engineering, it's a bunch of awesome

[00:07 - 00:11]
strategies to get the most out of your

[00:09 - 00:13]
artificial intelligence. So, Google put

[00:11 - 00:14]
together this prompt engineering guide.

[00:13 - 00:17]
I'm going to go over it. We're going to

[00:14 - 00:20]
go more in depth and by the end you are

[00:17 - 00:22]
going to be a master prompt engineer. So

[00:20 - 00:25]
the very basics when you're chatting

[00:22 - 00:28]
with a model like chat GPT, like Gemini

[00:25 - 00:30]
like Claude, you're typing in some input

[00:28 - 00:34]
in natural language and then it gives

[00:30 - 00:36]
you an output also usually in natural

[00:34 - 00:38]
language. And the way that these models

[00:36 - 00:41]
work is by taking your input, whatever

[00:38 - 00:43]
your prompt is, and predicting what it

[00:41 - 00:46]
thinks the output would be based on your

[00:43 - 00:48]
prompt. So, your prompt really matters.

[00:46 - 00:51]
How you structure it, what words you

[00:48 - 00:54]
use, examples you give, all of these

[00:51 - 00:56]
things are prompt engineering. And there

[00:54 - 00:58]
are a number of triedand-true prompt

[00:56 - 01:00]
engineering strategies which also depend

[00:58 - 01:02]
on which model you're using, how good it

[01:00 - 01:04]
is, what's the token limit, and we're

[01:02 - 01:06]
going to go over all of that. So

[01:04 - 01:08]
remember how an LLM works. It's a

[01:06 - 01:10]
prediction engine. The model takes

[01:08 - 01:12]
sequential text as an input, your

[01:10 - 01:14]
prompt, and then predicts what the

[01:12 - 01:18]
following token should be based on the

[01:14 - 01:20]
data it was trained on. And a token, if

[01:18 - 01:23]
you're not familiar, is basically just a

[01:20 - 01:24]
word. It's usually 3/4s of a word. We're

[01:23 - 01:25]
not going to get into too much technical

[01:24 - 01:28]
detail about it, but just think about

[01:25 - 01:30]
it. Token equals word. And so the

[01:28 - 01:32]
model's trying to predict the next token

[01:30 - 01:35]
is added to the initial prompt and then

[01:32 - 01:37]
it tries to predict the next token after

[01:35 - 01:40]
that including based on your original

[01:37 - 01:43]
prompt plus the additional token. And it

[01:40 - 01:45]
does that over and over and over again

[01:43 - 01:47]
until it thinks it has produced the

[01:45 - 01:49]
proper output. Prompt engineering is the

[01:47 - 01:52]
process of designing highquality prompts

[01:49 - 01:54]
that guide LLMs to produce accurate

[01:52 - 01:56]
outputs. That's a great definition for

[01:54 - 01:58]
it. And if you've ever prompted a large

[01:56 - 02:00]
language model, found that it didn't

[01:58 - 02:02]
give you exactly what you wanted

[02:00 - 02:04]
changed your prompt, and then it did

[02:02 - 02:07]
that is prompt engineering. So before we

[02:04 - 02:09]
get into the specific prompt engineering

[02:07 - 02:12]
strategies, let me go over a few basic

[02:09 - 02:14]
terms. Every large language model is

[02:12 - 02:16]
different. Some are vastly different

[02:14 - 02:18]
some are a little bit different, and

[02:16 - 02:20]
each of these differences matter.

[02:18 - 02:22]
Setting these settings correctly will

[02:20 - 02:25]
also help you get the most out of your

[02:22 - 02:27]
prompts. So, first output length. Output

[02:25 - 02:30]
length is the maximum number of tokens a

[02:27 - 02:32]
model should output in response to your

[02:30 - 02:35]
prompt. The longer the output length

[02:32 - 02:38]
the longer the response might be to your

[02:35 - 02:40]
prompt. Now, if you just ask what's 2

[02:38 - 02:42]
plus 2, it's not going to spend

[02:40 - 02:43]
paragraphs and paragraphs of text

[02:42 - 02:45]
explaining to you the answer because the

[02:43 - 02:48]
answer is simple and short. But if you

[02:45 - 02:50]
ask it for code, this output length

[02:48 - 02:52]
setting might make a big difference.

[02:50 - 02:53]
Now, if the model's outputting more

[02:52 - 02:56]
tokens, that potentially costs more

[02:53 - 02:58]
money, takes longer, and uses more

[02:56 - 03:01]
energy, more electricity. But here's an

[02:58 - 03:03]
interesting nuance to keep in mind.

[03:01 - 03:05]
Reducing the output length of the LLM

[03:03 - 03:08]
doesn't cause the LLM to become more

[03:05 - 03:11]
stylistically or textually succinct in

[03:08 - 03:13]
the output it creates. Instead, it just

[03:11 - 03:15]
causes the LLM to stop predicting more

[03:13 - 03:18]
tokens once the limit is reached. If you

[03:15 - 03:20]
set the output length really short, it's

[03:18 - 03:23]
not going to give you shorter, more

[03:20 - 03:25]
succinct answers. It's just going to

[03:23 - 03:27]
stop outputting once it reaches that

[03:25 - 03:29]
limit. Let me show you an example. So

[03:27 - 03:31]
here's Google AI Studio. Here is the

[03:29 - 03:34]
output length setting right here. Right

[03:31 - 03:37]
now, it's set to 65,000 tokens. Let's

[03:34 - 03:39]
set that to five tokens. So, I say write

[03:37 - 03:42]
a story about a panda bear. I'm using

[03:39 - 03:45]
Gemma 327B which is a non-thinking model

[03:42 - 03:47]
and it just says the bamboo whisperer

[03:45 - 03:50]
doesn't even make sense and that is a

[03:47 - 03:52]
maximum of five tokens. Now let's say we

[03:50 - 03:55]
move it up to 50 tokens. Let's give that

[03:52 - 03:58]
same prompt again and here we go. So the

[03:55 - 04:00]
bamboo whisperer and Lynn was not like

[03:58 - 04:02]
the other pandas at the Misty Peak

[04:00 - 04:05]
Reserve and so on and then it finally

[04:02 - 04:08]
just stops right here. He didn't just

[04:05 - 04:10]
taste the So, that was a maximum of 50

[04:08 - 04:12]
tokens. And of course, if I set it to

[04:10 - 04:14]
5,000 tokens, it's going to finish the

[04:12 - 04:17]
story. But you can see here, it didn't

[04:14 - 04:18]
write a succinct story. It just stopped

[04:17 - 04:21]
outputting. So, that's really important

[04:18 - 04:23]
to keep note of. The next setting is

[04:21 - 04:26]
sampling controls. Now, here's the gist

[04:23 - 04:29]
of how large language models predict the

[04:26 - 04:32]
next token. LLMs do not formally predict

[04:29 - 04:34]
a single token. rather LLMs predict

[04:32 - 04:37]
probabilities for what the next token

[04:34 - 04:40]
could be with each token in the LLM's

[04:37 - 04:43]
vocabulary getting a probability. So if

[04:40 - 04:45]
you say the cow jumped overthe', it

[04:43 - 04:48]
doesn't just predict moon. It'll give a

[04:45 - 04:51]
probability score to every single token

[04:48 - 04:53]
in its vocabulary. And the one with the

[04:51 - 04:56]
highest probability is the one that you

[04:53 - 04:58]
see. And there are three main settings

[04:56 - 05:00]
within these sampling controls.

[04:58 - 05:02]
temperature, top K, and top P. And we're

[05:00 - 05:04]
going to go over all three of those.

[05:02 - 05:06]
Now, personally, I think temperature is

[05:04 - 05:08]
probably the most important setting

[05:06 - 05:11]
within sampling controls. Temperature

[05:08 - 05:13]
controls the randomness in token

[05:11 - 05:15]
selection. But really, a more simple way

[05:13 - 05:18]
to think about it is the higher the

[05:15 - 05:20]
temperature, the more creative or unique

[05:18 - 05:23]
the responses will be. The lower the

[05:20 - 05:25]
temperature, the less creative it'll be.

[05:23 - 05:27]
So once again, write a story about a

[05:25 - 05:29]
panda bear. We have temperature set to

[05:27 - 05:31]
one. So that is the most creative. Let's

[05:29 - 05:33]
give it a try. Okay, so we got an

[05:31 - 05:36]
output. The rain in bamboo forest wasn't

[05:33 - 05:38]
just a drizzle, it was a deluge. So

[05:36 - 05:40]
let's stop there and let's give the same

[05:38 - 05:42]
prompt again. Let's see what happens. So

[05:40 - 05:46]
the same exact model, the same exact

[05:42 - 05:48]
prompt. And as you can see, a completely

[05:46 - 05:50]
different story. Now what happens if I

[05:48 - 05:51]
set the temperature to zero? Let's see.

[05:50 - 05:53]
I'm going to give it the same prompt

[05:51 - 05:55]
again. Write a story about a panda bear.

[05:53 - 05:57]
The bamboo forest hummed with the gentle

[05:55 - 06:00]
rustle of leaves and the chirping of

[05:57 - 06:03]
unseen birds. Great. Now let's do it

[06:00 - 06:05]
again with temperature zero. And look at

[06:03 - 06:08]
that. The bamboo forest hummed with the

[06:05 - 06:10]
low thrum of cicas. So very similar

[06:08 - 06:12]
very similar to the previous one with a

[06:10 - 06:13]
temperature of zero. And that's what

[06:12 - 06:15]
you're going to get. You're going to get

[06:13 - 06:17]
very different responses every single

[06:15 - 06:18]
time you give the same prompt when the

[06:17 - 06:20]
temperature is really high and the

[06:18 - 06:22]
opposite when it's very low. You're

[06:20 - 06:24]
going to get very consistent responses.

[06:22 - 06:27]
So remember to adjust your temperature

[06:24 - 06:30]
dependent on the use case that you are

[06:27 - 06:32]
doing. All right. Next, top K and top P.

[06:30 - 06:34]
Now, to be honest, I don't really use

[06:32 - 06:36]
top P and top K settings at all. I use

[06:34 - 06:38]
temperature, and that's enough for me.

[06:36 - 06:41]
But let me just briefly go over what

[06:38 - 06:43]
they are. So top K works very similarly

[06:41 - 06:46]
to temperature. Top K sampling selects

[06:43 - 06:48]
the top K most likely tokens from the

[06:46 - 06:50]
model's predicted distribution. And the

[06:48 - 06:52]
predicted distribution is just the

[06:50 - 06:54]
vocabulary set and the assigned

[06:52 - 06:55]
probabilities. So the higher the top K

[06:54 - 06:57]
the more creative and varied the model's

[06:55 - 07:00]
output. The lower, the more restive and

[06:57 - 07:02]
factual. So very similar, just another

[07:00 - 07:05]
setting to play around with for

[07:02 - 07:07]
creativity. Top P sampling is a way to

[07:05 - 07:09]
limit the set of vocabulary that the

[07:07 - 07:11]
model will choose from based on its

[07:09 - 07:12]
cumulative probability. And don't worry

[07:11 - 07:15]
if you don't understand that. Honestly

[07:12 - 07:16]
I rarely ever use top P. It's just good

[07:15 - 07:18]
to kind of generally know what it does.

[07:16 - 07:20]
So play around with those three

[07:18 - 07:22]
settings. Now in this document, they

[07:20 - 07:25]
give suggested starting points for all

[07:22 - 07:27]
three of these settings. And generally

[07:25 - 07:29]
within whatever chat interface you're

[07:27 - 07:31]
using, they give you their default

[07:29 - 07:33]
settings as well. But for here, as a

[07:31 - 07:35]
general starting point, a temperature of

[07:33 - 07:37]
0.2, that's actually a lot lower than I

[07:35 - 07:40]
usually start at. I usually start at

[07:37 - 07:42]
like 6, top P of 0.95, and top K of 30

[07:40 - 07:44]
will give you relatively coherent

[07:42 - 07:46]
results that can be creative, but not

[07:44 - 07:48]
excessively. So, if you want more

[07:46 - 07:51]
creative results, raise the top P and

[07:48 - 07:53]
raise the top K. And obviously, if you

[07:51 - 07:54]
want more consistent, less creative

[07:53 - 07:56]
results, do the opposite. Drop those

[07:54 - 08:00]
settings down. All right. Now, what you

[07:56 - 08:01]
came here for, prompting techniques.

[08:00 - 08:04]
Now, the first thing we're going to talk

[08:01 - 08:06]
about is general prompting or zero shot.

[08:04 - 08:09]
If you've heard of zero shot, it doesn't

[08:06 - 08:11]
mean giving the model one try. It's a

[08:09 - 08:14]
little confusing in that way. Zero shot.

[08:11 - 08:17]
The shot term means how many examples

[08:14 - 08:18]
are you giving the model. So with zero

[08:17 - 08:20]
shot, it's the simplest type of

[08:18 - 08:22]
prompting. You're not giving the model

[08:20 - 08:25]
any examples of what you want as the

[08:22 - 08:27]
output. So with zero shot, you're

[08:25 - 08:29]
basically just providing a description

[08:27 - 08:30]
of the task you want accomplished.

[08:29 - 08:33]
Whether that's write a story, do some

[08:30 - 08:35]
math, write some code, but nothing else.

[08:33 - 08:37]
Just a thorough description of what

[08:35 - 08:40]
you're looking for. Typically, the more

[08:37 - 08:42]
examples you need, the more complex the

[08:40 - 08:44]
task that you're asking the large

[08:42 - 08:46]
language model to accomplish for you.

[08:44 - 08:48]
So, if it's a pretty simple task, like

[08:46 - 08:51]
writing a story, you probably don't need

[08:48 - 08:54]
a bunch of examples. So, here's an

[08:51 - 08:57]
example of a zeros prompt. We are asking

[08:54 - 08:59]
the model to classify movie reviews as

[08:57 - 09:02]
positive, neutral, or negative. And

[08:59 - 09:04]
here's the review. Her is a disturbing

[09:02 - 09:06]
study revealing the direction humanity

[09:04 - 09:07]
is headed. If AI is allowed to keep

[09:06 - 09:09]
evolving unchecked, I wish there were

[09:07 - 09:11]
more movies like this masterpiece.

[09:09 - 09:13]
Sentiment colon. So that's what we're

[09:11 - 09:15]
asking for. What is the sentiment? And

[09:13 - 09:17]
use positive, neutral, negative. And it

[09:15 - 09:20]
got it right. Perfect. Now for more than

[09:17 - 09:22]
zero shot, one shot or few shot that

[09:20 - 09:24]
just means giving the large language

[09:22 - 09:26]
model more examples to work with. One

[09:24 - 09:29]
shot means giving it one example. Few

[09:26 - 09:31]
shot means two or more. Now with one

[09:29 - 09:34]
shot, the model's going to try its best

[09:31 - 09:36]
to mimic whatever example you give. And

[09:34 - 09:38]
when you use fshot, you're giving the

[09:36 - 09:41]
model more chance to get the desired

[09:38 - 09:42]
pattern correct from your example. So if

[09:41 - 09:44]
you want the output in a specific

[09:42 - 09:46]
format, that's a great way to do it. The

[09:44 - 09:48]
number of examples you need for fshot

[09:46 - 09:50]
prompting depends on a few factors

[09:48 - 09:52]
including the complexity of the task

[09:50 - 09:54]
which we talked about, the quality of

[09:52 - 09:56]
the examples. If you have great examples

[09:54 - 09:58]
to give, then that just makes the job of

[09:56 - 10:00]
the large language model that much

[09:58 - 10:04]
easier. and the capabilities of the

[10:00 - 10:05]
generative AI model you are using. As a

[10:04 - 10:07]
general rule of thumb, you should use at

[10:05 - 10:09]
least three to five examples for fuse

[10:07 - 10:11]
shop prompting. So let's look at the

[10:09 - 10:14]
example they give in this document. The

[10:11 - 10:16]
goal is to parse pizza orders to JSON.

[10:14 - 10:18]
Here it is. So here's the prompt. Parse

[10:16 - 10:22]
a customer's pizza order into valid

[10:18 - 10:25]
JSON. Example, I want a small pizza with

[10:22 - 10:27]
cheese, tomato sauce, and pepperoni. Now

[10:25 - 10:30]
if we give that exact prompt with

[10:27 - 10:34]
nothing else to the model, the model is

[10:30 - 10:36]
going to infer what the structure of the

[10:34 - 10:39]
JSON object should be. And the problem

[10:36 - 10:40]
with that is if we do this a thousand

[10:39 - 10:43]
times with a thousand different orders

[10:40 - 10:46]
we might get different JSON object

[10:43 - 10:49]
structures. But if we provide an example

[10:46 - 10:52]
like here, we want size, type, and

[10:49 - 10:54]
ingredients. And within ingredients, we

[10:52 - 10:56]
want an array of ingredients. Then the

[10:54 - 10:59]
model is going to be much more likely to

[10:56 - 11:01]
use this exact structure. And here's a

[10:59 - 11:03]
continuation of that same prompt.

[11:01 - 11:05]
Example, can I get a large pizza with

[11:03 - 11:08]
tomato sauce, basil, and mozzarella? So

[11:05 - 11:11]
size type ingredients right there. Now

[11:08 - 11:13]
I would like a large pizza with the

[11:11 - 11:14]
first half cheese and mozzarella, and

[11:13 - 11:16]
the other tomato sauce, ham, and

[11:14 - 11:18]
pineapple. JSON response. This is where

[11:16 - 11:21]
we're asking for the output from the

[11:18 - 11:23]
model. So size, type, ingredients, and

[11:21 - 11:26]
it's the same exact structure that we

[11:23 - 11:29]
used in the examples. So this is a great

[11:26 - 11:30]
use case for fshot prompting. All right

[11:29 - 11:33]
next let's talk about the system

[11:30 - 11:35]
message, contextual prompting, and role

[11:33 - 11:38]
prompting. The gist of what these things

[11:35 - 11:43]
do is essentially getting the model to

[11:38 - 11:46]
act as some role. So act as a senior

[11:43 - 11:48]
developer, act as a CEO, act as a

[11:46 - 11:50]
teacher. As soon as you give it that

[11:48 - 11:53]
role description, the model will start

[11:50 - 11:55]
taking on the behaviors and qualities of

[11:53 - 11:57]
whatever it thinks that role would be.

[11:55 - 11:59]
So first system prompting it sets the

[11:57 - 12:01]
overall context and purpose for the

[11:59 - 12:02]
language model. It defines the big

[12:01 - 12:04]
picture of what the model should be

[12:02 - 12:06]
doing like translating a language

[12:04 - 12:08]
classifying a review, etc. So if you

[12:06 - 12:10]
look at Google AI Studio, there's this

[12:08 - 12:12]
little clipboard right here and it says

[12:10 - 12:13]
system instructions. That's the same

[12:12 - 12:16]
thing as system message. If you click

[12:13 - 12:17]
it, this is where it says optional tone

[12:16 - 12:19]
and style instructions for the model

[12:17 - 12:21]
which is where you would describe kind

[12:19 - 12:24]
of the overall theme of what you're

[12:21 - 12:26]
trying to accomplish. Next is contextual

[12:24 - 12:27]
prompting. Contextual prompting provides

[12:26 - 12:29]
specific details or background

[12:27 - 12:31]
information relevant to the current

[12:29 - 12:33]
conversation or task. It helps the model

[12:31 - 12:35]
to understand the nuances of what's

[12:33 - 12:37]
being asked and tailor the response

[12:35 - 12:39]
accordingly. So in the document, they

[12:37 - 12:42]
give this example. Here's the context

[12:39 - 12:44]
contextual prompting context. You are

[12:42 - 12:47]
writing for a blog about retro880s

[12:44 - 12:49]
arcade video games. Then the actual task

[12:47 - 12:50]
suggests three topics to write an

[12:49 - 12:53]
article about with a few lines of

[12:50 - 12:55]
description of what this article should

[12:53 - 12:57]
contain. So in the actual task, it

[12:55 - 13:00]
doesn't say that you need to write a

[12:57 - 13:02]
blog for a retro80s arcade video games

[13:00 - 13:05]
but that's in the context. So if we run

[13:02 - 13:08]
it, here we go. The Unsung Heroes 5 from

[13:05 - 13:11]
Pixels to Power Coin Op Culture Clash.

[13:08 - 13:14]
So you're separating the context from

[13:11 - 13:16]
the actual task at hand. And last, role

[13:14 - 13:18]
prompting. Role prompting assigns a

[13:16 - 13:20]
specific character or identity for the

[13:18 - 13:22]
language model to adopt. This helps the

[13:20 - 13:23]
model generate responses that are

[13:22 - 13:26]
consistent with the assigned role and

[13:23 - 13:29]
its associated knowledge and behavior.

[13:26 - 13:32]
Where I see this most of all is in a

[13:29 - 13:34]
Gentic framework, specifically Crew AI.

[13:32 - 13:37]
And Crew AI actually does a good job of

[13:34 - 13:39]
taking this a step further. and they

[13:37 - 13:41]
have a bunch of data to support doing

[13:39 - 13:43]
this. And this strategy works just the

[13:41 - 13:45]
same in direct large language model

[13:43 - 13:48]
prompting. So look at this. Here's a

[13:45 - 13:50]
role attribute that you can use in your

[13:48 - 13:52]
agent definition. Defines the agents

[13:50 - 13:55]
function and expertise within the crew.

[13:52 - 13:57]
It also has the goal or the task, the

[13:55 - 13:59]
individual objective that guides the

[13:57 - 14:01]
agents decision-making. And it even has

[13:59 - 14:03]
a backstory provides context and

[14:01 - 14:07]
personality to the agent enriching

[14:03 - 14:09]
interactions. So role prompting is very

[14:07 - 14:11]
very powerful. Now here's another

[14:09 - 14:13]
example from the document. I want you to

[14:11 - 14:15]
act as a travel guide. I will write to

[14:13 - 14:17]
you about my location and you will

[14:15 - 14:20]
suggest three places to visit near me.

[14:17 - 14:22]
So the actual role is travel guide and

[14:20 - 14:25]
the task is suggest three places to

[14:22 - 14:27]
visit. So here's my suggestion. I'm in

[14:25 - 14:29]
Amsterdam and I want to visit only

[14:27 - 14:31]
museums travel suggestions. Let's run

[14:29 - 14:33]
it. And here we go. So I'm ready to be

[14:31 - 14:35]
your Amsterdam museum guide based on

[14:33 - 14:37]
your request. Here are three museum

[14:35 - 14:38]
suggestions. So that is when roll

[14:37 - 14:40]
prompting becomes really powerful. All

[14:38 - 14:42]
right. Next is one I had not actually

[14:40 - 14:45]
heard of. It's called step back

[14:42 - 14:47]
prompting. And it's akin to a few other

[14:45 - 14:49]
prompting techniques that I know of, but

[14:47 - 14:51]
it's kind of unique. Let me show it to

[14:49 - 14:54]
you. So step back prompting asks the

[14:51 - 14:56]
model to first consider a general

[14:54 - 14:59]
question related to the specific task at

[14:56 - 15:01]
hand and then feeding the answer to that

[14:59 - 15:04]
general question into a subsequent

[15:01 - 15:05]
prompt for the specific task. If that

[15:04 - 15:07]
sounds confusing, I'll show you an

[15:05 - 15:10]
example in a moment. So, what is the

[15:07 - 15:12]
point of that? It allows the LLM to

[15:10 - 15:13]
activate relevant background knowledge

[15:12 - 15:15]
and reasoning processes before

[15:13 - 15:18]
attempting to solve the specific

[15:15 - 15:20]
problem. By considering the broader and

[15:18 - 15:23]
underlying principles, LLMs can generate

[15:20 - 15:25]
more accurate and insightful responses.

[15:23 - 15:27]
It encourages the LLMs to think

[15:25 - 15:29]
critically and apply their knowledge in

[15:27 - 15:31]
new and creative ways. It changes the

[15:29 - 15:33]
final prompt doing the task by utilizing

[15:31 - 15:35]
more knowledge in the LLM's parameters

[15:33 - 15:37]
than would otherwise come into play when

[15:35 - 15:40]
the LLM is prompted directly. So

[15:37 - 15:42]
fascinating. All right, so first here is

[15:40 - 15:45]
an example default prompt. This is not

[15:42 - 15:47]
step back prompting. So write a one

[15:45 - 15:49]
paragraph story line for a new level of

[15:47 - 15:50]
a first-person shooter video game that

[15:49 - 15:52]
is challenging and engaging. And

[15:50 - 15:54]
remember this is standard prompting, not

[15:52 - 15:57]
step back. Let's hit enter and see.

[15:54 - 15:59]
Okay, so the ravaged derelic space

[15:57 - 16:01]
station Icarus has become a deadly

[15:59 - 16:03]
labyrinth, a colossal gravitational

[16:01 - 16:06]
anomaly, has ripped the station apart

[16:03 - 16:07]
and so on. So pretty good. And what it

[16:06 - 16:09]
says here is very interesting and

[16:07 - 16:11]
something that I come across all the

[16:09 - 16:13]
time. Whenever I'm asking a model to do

[16:11 - 16:15]
something really creative for me, it

[16:13 - 16:16]
tends to give me like really generic

[16:15 - 16:19]
responses, even when I set the

[16:16 - 16:21]
temperature to one. So creative writing

[16:19 - 16:23]
is one of the things that I actually

[16:21 - 16:25]
least go to large language models for.

[16:23 - 16:27]
So going forward, I'm going to try the

[16:25 - 16:30]
stepback method. So now instead, let's

[16:27 - 16:32]
get it to think about this topic space

[16:30 - 16:35]
before we actually give it the assigned

[16:32 - 16:36]
task. So based on popular first-person

[16:35 - 16:38]
shooter action games, what are five

[16:36 - 16:40]
fictional key settings that contribute

[16:38 - 16:42]
to a challenging and engaging level

[16:40 - 16:44]
story line in a first-person shooter

[16:42 - 16:47]
video game? All right, so it gave me a

[16:44 - 16:51]
very robust answer of five fictional key

[16:47 - 16:53]
settings. So now I copied all of this

[16:51 - 16:55]
output and I said here's the context and

[16:53 - 16:58]
I pasted it in. And at the very bottom I

[16:55 - 17:01]
say take one of the themes and write a

[16:58 - 17:03]
one paragraph story line for a new level

[17:01 - 17:05]
of a firstperson shooter video game that

[17:03 - 17:07]
is challenging and engaging. And let's

[17:05 - 17:10]
see what it does. The player finds

[17:07 - 17:12]
themselves in the heart of the derelik

[17:10 - 17:14]
space station having just emerged from a

[17:12 - 17:17]
terrifying zerog section filled with

[17:14 - 17:18]
swarms of rapidly evolving nanobots. So

[17:17 - 17:21]
just a good way to get more accuracy and

[17:18 - 17:24]
more breath of knowledge from your large

[17:21 - 17:26]
language model. All right, next for the

[17:24 - 17:28]
prompting technique that really changed

[17:26 - 17:32]
large language models completely. Chain

[17:28 - 17:34]
of thought. Now before I get into this

[17:32 - 17:37]
chain of thought is being built into

[17:34 - 17:39]
many of these models today. Anytime you

[17:37 - 17:41]
hear about test time compute or

[17:39 - 17:43]
inference time compute, this is what

[17:41 - 17:46]
they're talking about. The models output

[17:43 - 17:47]
their thinking in the form of chain of

[17:46 - 17:49]
thought in the thinking section of its

[17:47 - 17:52]
output before giving you the actual

[17:49 - 17:54]
output. But before these were built into

[17:52 - 17:56]
the models, we were prompting the models

[17:54 - 17:59]
to do this in the kind of standard

[17:56 - 18:01]
output. And it's actually quite simple

[17:59 - 18:03]
but really powerful. Now, if you

[18:01 - 18:05]
remember back to my model benchmarks

[18:03 - 18:08]
from, let's say, even 6 months or a year

[18:05 - 18:12]
ago, I would append all of my prompts

[18:08 - 18:14]
with think step by step and show your

[18:12 - 18:17]
work step by step. And just by adding

[18:14 - 18:19]
that to the prompt, we got much better

[18:17 - 18:22]
much more accurate, higher quality

[18:19 - 18:24]
outputs from the model. Now, as I said

[18:22 - 18:26]
a lot of models come with this baked in

[18:24 - 18:28]
but not all of them. any model that is

[18:26 - 18:31]
on the smaller side or doesn't have a

[18:28 - 18:33]
thinking mode or test time compute mode

[18:31 - 18:36]
this is still a very powerful prompting

[18:33 - 18:38]
method. Now, it's funny because most

[18:36 - 18:40]
recent models actually do this by

[18:38 - 18:42]
default, even if they're not a quote

[18:40 - 18:44]
unquote thinking model. Let's take a

[18:42 - 18:47]
look. So, this is Gemini 2.0 Flash

[18:44 - 18:49]
Light. This is not a thinking model.

[18:47 - 18:51]
Here's the prompt. When I was 3 years

[18:49 - 18:55]
old, my partner was three times my age.

[18:51 - 18:58]
So, three versus nine. Now I am 20 years

[18:55 - 19:00]
old. How old is my partner? So here's

[18:58 - 19:03]
how to solve the problem. Find the

[19:00 - 19:07]
partner's age. So it is thinking step by

[19:03 - 19:09]
step. And the answer is 26. And that is

[19:07 - 19:12]
correct. Now if we look at the example

[19:09 - 19:14]
in the document, now the output did not

[19:12 - 19:17]
show its work and thus it got 63 years

[19:14 - 19:20]
old and so that's wrong. But when they

[19:17 - 19:22]
asked think step by step, it actually

[19:20 - 19:25]
output each step of the thinking and was

[19:22 - 19:27]
able to get the correct response. And so

[19:25 - 19:29]
anytime you have a smaller model or an

[19:27 - 19:31]
older model, and by the way, you should

[19:29 - 19:33]
still use those models for specific use

[19:31 - 19:36]
cases like when inference speed is

[19:33 - 19:38]
important, when cost is important, there

[19:36 - 19:40]
are many considerations when choosing

[19:38 - 19:42]
the right model. And you can get a lot

[19:40 - 19:44]
out of these smaller, let's say, less

[19:42 - 19:46]
intelligent models simply by using some

[19:44 - 19:49]
of these prompting strategies. And not

[19:46 - 19:51]
only that, you can combine prompting

[19:49 - 19:53]
techniques. So you can take one shot or

[19:51 - 19:55]
few shot prompts and mix it with chain

[19:53 - 19:57]
of thought. Let's look at that example.

[19:55 - 19:59]
So question, when my brother was 2 years

[19:57 - 20:01]
old, I was double his age. Now I'm 40.

[19:59 - 20:03]
How old is my brother? Let's think step

[20:01 - 20:05]
by step. And then we give it an example.

[20:03 - 20:08]
Here's an answer. When my brother was 2

[20:05 - 20:10]
years old, I was 2 * 2 equals 4 years

[20:08 - 20:13]
old. That's an age difference of 2 years

[20:10 - 20:16]
and I am older. Now I am 40. So, my

[20:13 - 20:18]
brother is 40 - 2, 38 years old, the

[20:16 - 20:19]
answer is 38. Then, let's ask the

[20:18 - 20:21]
question. When I was three, my partner

[20:19 - 20:23]
was three times my age. Now I'm 20. How

[20:21 - 20:26]
old is my partner listening step by

[20:23 - 20:28]
step? And it basically mimicked the

[20:26 - 20:30]
exact same thinking as the example we

[20:28 - 20:32]
gave it. And chain of thought is really

[20:30 - 20:35]
powerful for a lot of different use

[20:32 - 20:37]
cases. Basically, anything under the

[20:35 - 20:39]
category of STEM, science, technology

[20:37 - 20:41]
engineering, and math, chain of thought

[20:39 - 20:44]
is very, very powerful. but also logic

[20:41 - 20:45]
and reasoning. And there are just so

[20:44 - 20:47]
many different categories in which

[20:45 - 20:49]
letting the model think step by step

[20:47 - 20:51]
improves their output greatly. All

[20:49 - 20:53]
right, next let's talk about

[20:51 - 20:56]
self-consistency, which is another very

[20:53 - 20:58]
powerful prompting technique. So LLM's

[20:56 - 21:00]
ability to reason is often seen as a

[20:58 - 21:03]
limitation that cannot be overcome

[21:00 - 21:04]
solely by increasing model size. The

[21:03 - 21:06]
model can be prompted to generate

[21:04 - 21:09]
reasoning steps like a human solving a

[21:06 - 21:11]
problem. However, Chain of Thought uses

[21:09 - 21:14]
a simple greedy decoding strategy

[21:11 - 21:16]
limiting its effectiveness. And greedy

[21:14 - 21:19]
decoding just means picking whichever

[21:16 - 21:21]
token is the highest probability token.

[21:19 - 21:24]
And according to the document, it limits

[21:21 - 21:27]
its effectiveness. Now, in comes

[21:24 - 21:30]
self-consistency. Self-consistency

[21:27 - 21:32]
combines sampling and majority voting to

[21:30 - 21:34]
generate diverse reasoning paths and

[21:32 - 21:36]
select the most consistent answer. What

[21:34 - 21:39]
that basically means is running the same

[21:36 - 21:41]
prompt against the model, let's say

[21:39 - 21:44]
five different times, and then using the

[21:41 - 21:46]
model to vote on whichever one it thinks

[21:44 - 21:49]
is the right answer or the best

[21:46 - 21:51]
solution. And it improves the accuracy

[21:49 - 21:52]
and coherence of responses generated by

[21:51 - 21:56]
large language models. All right, so

[21:52 - 21:58]
let's look at an example. We have a task

[21:56 - 22:00]
to classify emails by either important

[21:58 - 22:02]
or not important. And here's the email.

[22:00 - 22:04]
Hi, I have seen you use WordPress for

[22:02 - 22:05]
your website. a great open source

[22:04 - 22:07]
content management system. I have used

[22:05 - 22:09]
it in the past and so on. Here's the

[22:07 - 22:11]
important part. I did notice a bug in

[22:09 - 22:13]
the contact form which happens when you

[22:11 - 22:15]
select the name field. And so this would

[22:13 - 22:17]
be an important email. Somebody's

[22:15 - 22:19]
contacting you about a potential bug. So

[22:17 - 22:21]
classify the above email as important or

[22:19 - 22:24]
not important. Let's think step by step

[22:21 - 22:26]
and explain why. So here's the output.

[22:24 - 22:27]
Step one, identify the purpose. The

[22:26 - 22:30]
purpose of the email is to inform the

[22:27 - 22:32]
recipient of a bug in the contact form.

[22:30 - 22:34]
Step two, assess the potential impact of

[22:32 - 22:36]
the bug. Step three, consider the

[22:34 - 22:39]
credibility of the sender. Conclusion

[22:36 - 22:41]
important. Great. Based on the potential

[22:39 - 22:42]
impact of the bug and the credibility of

[22:41 - 22:43]
the sender, the email should be

[22:42 - 22:45]
classified as important. The recipient

[22:43 - 22:46]
should take immediate action to fix the

[22:45 - 22:49]
bug and protect their website from

[22:46 - 22:52]
attack. Now, let's look at the second

[22:49 - 22:54]
output. So again, we're prompting the

[22:52 - 22:56]
model multiple times and then we're

[22:54 - 22:59]
going to have the model decide which

[22:56 - 23:02]
output is best. So output two, lack of

[22:59 - 23:05]
urgency, non-critical bug report, lack

[23:02 - 23:08]
of personal impact. Absence of action

[23:05 - 23:11]
request and sender's intent. Conclusion

[23:08 - 23:14]
not important. And for attempt three, it

[23:11 - 23:16]
deems it important. So two out of three

[23:14 - 23:18]
outputs from the large language model

[23:16 - 23:20]
deemed it important. And so you can do

[23:18 - 23:22]
this three times, you could do this five

[23:20 - 23:24]
times, you could do this 50 times. And

[23:22 - 23:27]
then you basically take whichever output

[23:24 - 23:30]
or whichever response happened most

[23:27 - 23:32]
often as the truth or as whatever the

[23:30 - 23:34]
best response is. So in this case two

[23:32 - 23:36]
out of three were important. Let's

[23:34 - 23:38]
classify it as important. But it comes

[23:36 - 23:40]
at a big cost. Obviously if you're

[23:38 - 23:43]
running these prompts multiple times for

[23:40 - 23:45]
every single task. There's a high cost

[23:43 - 23:47]
there's high latency. And so just

[23:45 - 23:48]
something to keep in mind as you're

[23:47 - 23:50]
deciding the trade-offs of using this

[23:48 - 23:52]
prompting strategy. So now that we're

[23:50 - 23:54]
familiar with chain of thought and

[23:52 - 23:58]
self-consistency, let's talk about tree

[23:54 - 23:59]
of thoughts. So it allows LLM to explore

[23:58 - 24:01]
multiple different reasoning paths

[23:59 - 24:03]
simultaneously rather than just

[24:01 - 24:05]
following a single linear chain of

[24:03 - 24:07]
thought. Here's what it looks like. So

[24:05 - 24:09]
here is chain of thought, input, the

[24:07 - 24:11]
different steps, and then the output.

[24:09 - 24:15]
But here is tree of thought. you have an

[24:11 - 24:17]
input and then it tests at each step

[24:15 - 24:20]
different outputs that lead to the next

[24:17 - 24:22]
set of outputs that finally lead to the

[24:20 - 24:25]
final output. And this is using a

[24:22 - 24:27]
combination of self-consistency and

[24:25 - 24:29]
chain of thought. So you can imagine it

[24:27 - 24:32]
like this. We have an input, it comes up

[24:29 - 24:34]
with the first step, multiple first

[24:32 - 24:37]
steps, and then you have it decide which

[24:34 - 24:38]
one is most accurate or best. Then it

[24:37 - 24:40]
goes on to the next one and does it

[24:38 - 24:43]
again and again and again until you

[24:40 - 24:46]
finally get the final output. Now with

[24:43 - 24:48]
tree of thought, doing this strictly

[24:46 - 24:51]
between just a user and what you can

[24:48 - 24:53]
type into a prompt box to the model is

[24:51 - 24:55]
not really viable. There's just too much

[24:53 - 24:57]
going on. You really need to implement

[24:55 - 24:59]
tree of thought with code or use some

[24:57 - 25:01]
kind of framework to do it for you. And

[24:59 - 25:04]
this approach makes tree of thought

[25:01 - 25:06]
particularly well suited for complex

[25:04 - 25:09]
tasks that require exploration. And so

[25:06 - 25:11]
if you have more complex tasks, more

[25:09 - 25:13]
sophisticated tasks, tree of thought

[25:11 - 25:17]
might be great for you. All right, next

[25:13 - 25:19]
let's go over react. That is reason and

[25:17 - 25:21]
act. Reason and act prompting is a

[25:19 - 25:23]
paradigm for enabling large language

[25:21 - 25:25]
models to solve complex tasks using

[25:23 - 25:27]
natural language reasoning combined with

[25:25 - 25:31]
external tools, search, code

[25:27 - 25:32]
interpreter, etc. tools are incredibly

[25:31 - 25:35]
important for taking the raw

[25:32 - 25:38]
intelligence of a large language model

[25:35 - 25:41]
and allowing it to accomplish real world

[25:38 - 25:42]
tasks. React mimics how humans operate

[25:41 - 25:45]
in the real world. You can kind of think

[25:42 - 25:48]
of React as agents. Basically, you have

[25:45 - 25:50]
the logic, the core large language

[25:48 - 25:53]
model, and then you give it tools. Tools

[25:50 - 25:56]
to get new knowledge or tools to save

[25:53 - 25:57]
memories or tools to communicate with

[25:56 - 26:00]
other agents. Basically, anything you

[25:57 - 26:02]
want. React prompting works by combining

[26:00 - 26:04]
reasoning and acting into a thought

[26:02 - 26:05]
action loop. The LLM first reasons about

[26:04 - 26:07]
the problem and generates a plan of

[26:05 - 26:10]
action. Then it performs the actions in

[26:07 - 26:13]
the plan and observes the results. Now

[26:10 - 26:15]
if this sounds familiar, a lot of the

[26:13 - 26:18]
frontier models nowadays have this built

[26:15 - 26:21]
in. You can check on and off different

[26:18 - 26:23]
tools, and it has chain of thought built

[26:21 - 26:28]
into its thinking mode. So, here's

[26:23 - 26:30]
Gemini 2.5 Pro preview as of May 6th.

[26:28 - 26:32]
And here are its tools, structured

[26:30 - 26:35]
output, code execution, function

[26:32 - 26:38]
calling, Google search. And so, this is

[26:35 - 26:41]
a perfect example of React being done

[26:38 - 26:43]
for you. But, of course, when you're

[26:41 - 26:45]
using the cutting edge models, you're

[26:43 - 26:47]
also paying the most and you're probably

[26:45 - 26:49]
waiting the longest. So, highest cost

[26:47 - 26:52]
highest latency. But you can get a lot

[26:49 - 26:55]
of these benefits on older or let's just

[26:52 - 26:58]
say smaller, faster, less intelligent

[26:55 - 27:01]
models simply by using the React

[26:58 - 27:02]
framework. So React is really just an

[27:01 - 27:04]
agent. And in this example, you're

[27:02 - 27:06]
seeing the very basic version of this.

[27:04 - 27:08]
So here's some Python code. We're

[27:06 - 27:10]
loading lang chains agents. Here's the

[27:08 - 27:12]
prompt. How many kids did the band

[27:10 - 27:14]
members of Metallica have? Now here's

[27:12 - 27:16]
the LLM. We're using Vertex AI, which is

[27:14 - 27:19]
Google's product. and we're using the

[27:16 - 27:22]
tool SER API which is a Google search

[27:19 - 27:25]
API giving search web search available

[27:22 - 27:28]
as a tool to the models. So we run it

[27:25 - 27:30]
and that's fine. Now given these few

[27:28 - 27:35]
lines of code we've now given the LLM

[27:30 - 27:37]
the ability to plan to execute to review

[27:35 - 27:39]
what happened and then execute again if

[27:37 - 27:42]
it needs to. So here's the output.

[27:39 - 27:44]
Metallica has four members. So let's do

[27:42 - 27:47]
a search. Here's a tool called search

[27:44 - 27:49]
action input. How many kids does James

[27:47 - 27:51]
Hetfield have? Observation. Three

[27:49 - 27:53]
children. Thought Metallica band members

[27:51 - 27:57]
have three children. Let's do another

[27:53 - 28:00]
search. Lars or Kirk Hammet and so on

[27:57 - 28:02]
all the way down. So, it does one search

[28:00 - 28:04]
per band member, finds the total number

[28:02 - 28:06]
of kids, adds them all together, and

[28:04 - 28:09]
that's the answer. And yeah, this is

[28:06 - 28:11]
really just agents. And nine times out

[28:09 - 28:14]
of 10, there's no reason to write the

[28:11 - 28:18]
agentic framework yourself. You can take

[28:14 - 28:20]
lang chain, you can take crewi, and they

[28:18 - 28:22]
do fantastic jobs of putting these

[28:20 - 28:24]
frameworks together for you. All right

[28:22 - 28:27]
so all of these prompting techniques can

[28:24 - 28:29]
obviously get very complex and tedious

[28:27 - 28:31]
and take a long time for you to write

[28:29 - 28:33]
manually. But what if you can have AI

[28:31 - 28:35]
write the prompts for you? This is

[28:33 - 28:38]
something I do all the time. This is

[28:35 - 28:40]
called automatic prompt engineering. Let

[28:38 - 28:42]
me tell you how I do this. So I'm

[28:40 - 28:45]
frequently asking large language models

[28:42 - 28:49]
to write code for me. But I also don't

[28:45 - 28:51]
want to write a very detailed PRD, which

[28:49 - 28:53]
is just a list of requirements for the

[28:51 - 28:55]
code that I want written. So what I do

[28:53 - 28:58]
is I'll just come up with a few sentence

[28:55 - 29:00]
description of what I want built. Then I

[28:58 - 29:03]
will ask the model to write up a PRD for

[29:00 - 29:05]
me. Then I take that PRD, put it back

[29:03 - 29:08]
into another model, and I say, write

[29:05 - 29:12]
code based on this PRD, and so it does

[29:08 - 29:15]
the job of writing extensive detail for

[29:12 - 29:17]
whatever I want built. So it's a good

[29:15 - 29:19]
way to add a lot more detail to whatever

[29:17 - 29:21]
prompt you're writing. But you can not

[29:19 - 29:22]
only do that, you could take any of the

[29:21 - 29:25]
prompting techniques we've talked about

[29:22 - 29:27]
today and simply say, "Here's my most

[29:25 - 29:29]
basic prompt. Do chain of thought with

[29:27 - 29:31]
it or do self-consistency with it." and

[29:29 - 29:33]
it will write the prompt that you can

[29:31 - 29:34]
then put back into the large language

[29:33 - 29:36]
model to actually do that prompting

[29:34 - 29:38]
technique. All right, so next I want to

[29:36 - 29:40]
talk about a prompting technique that I

[29:38 - 29:42]
use that I'm not even sure what it's

[29:40 - 29:45]
called. But it's basically deciding when

[29:42 - 29:48]
to ask the model to write and execute

[29:45 - 29:49]
code for the prompt for the solution

[29:48 - 29:51]
versus just give you the natural

[29:49 - 29:52]
language solution. All right, so let's

[29:51 - 29:54]
use a prompt test that I used to do all

[29:52 - 29:56]
the time, but now all the models get it

[29:54 - 29:59]
right. So this is GPT40 and it says how

[29:56 - 30:01]
many Rs are in the word strawberry. how

[29:59 - 30:03]
it did get it right. There are three Rs

[30:01 - 30:05]
in the word strawberry, but frequently

[30:03 - 30:06]
other models would get this wrong. So

[30:05 - 30:08]
here's a different way to think about it

[30:06 - 30:10]
where you're always going to get the

[30:08 - 30:12]
right answer. Many models have the

[30:10 - 30:14]
ability to write and execute code. So

[30:12 - 30:16]
rather than just me saying how many Rs

[30:14 - 30:18]
are in the word strawberry, I'm going to

[30:16 - 30:20]
explicitly tell it to write code to

[30:18 - 30:22]
count the number of Rs in a given word

[30:20 - 30:24]
starting with the word strawberry. Now

[30:22 - 30:27]
if you write code that takes an input of

[30:24 - 30:29]
a word and can count the number of Rs

[30:27 - 30:30]
within that word, it's always going to

[30:29 - 30:33]
be right as long as the code is right.

[30:30 - 30:35]
And for use cases like this, the model's

[30:33 - 30:37]
ability to write code is actually much

[30:35 - 30:39]
greater than its ability to answer these

[30:37 - 30:41]
questions right without it. So, here's

[30:39 - 30:43]
an example. Write code to count the

[30:41 - 30:45]
number of Rs in a given word. Starting

[30:43 - 30:48]
with the word strawberry, execute that

[30:45 - 30:51]
code. And if we open up the analysis, so

[30:48 - 30:54]
define the word and it wrote code and

[30:51 - 30:56]
here's the output. And so it actually

[30:54 - 30:58]
wrote code and executed code and now I

[30:56 - 31:01]
know it's going to be accurate. So I

[30:58 - 31:03]
call that prompting using code. All

[31:01 - 31:05]
right, to wrap this up, let's talk about

[31:03 - 31:07]
some best practices. Number one, provide

[31:05 - 31:10]
examples. We talked about zeroot, one

[31:07 - 31:12]
shot, and few shot. If you can, when you

[31:10 - 31:14]
can, try to give your model examples

[31:12 - 31:16]
especially when you're trying to get

[31:14 - 31:18]
consistent outputs. Design with

[31:16 - 31:21]
simplicity. I really agree with this.

[31:18 - 31:23]
Start with simple prompting and only add

[31:21 - 31:25]
more instructions or more nuanced

[31:23 - 31:28]
instructions when absolutely necessary.

[31:25 - 31:29]
And anytime you're writing a task or a

[31:28 - 31:32]
prompt for the model, try to think, is

[31:29 - 31:34]
this the simplest version of what I'm

[31:32 - 31:36]
asking for? Be specific about the

[31:34 - 31:38]
output. This is really important. If

[31:36 - 31:41]
you're expecting JSON, say you're

[31:38 - 31:43]
expecting JSON. If you're expecting

[31:41 - 31:45]
every letter of the first word of the

[31:43 - 31:48]
output to be the letter B, make sure you

[31:45 - 31:50]
say that. Whatever it is, specify your

[31:48 - 31:51]
output because otherwise, the model's

[31:50 - 31:53]
just going to try to guess what you're

[31:51 - 31:56]
asking for. Use instructions over

[31:53 - 31:58]
constraints. So, an instruction provides

[31:56 - 32:00]
explicit instructions on the desired

[31:58 - 32:03]
format, style, or content of the

[32:00 - 32:05]
response. A constraint sets the

[32:03 - 32:08]
limitations or boundaries. So rather

[32:05 - 32:11]
than saying here's what not to do, say

[32:08 - 32:13]
here's what to do. Next, control the max

[32:11 - 32:16]
token length. This is not something I do

[32:13 - 32:18]
actively, but especially for higher

[32:16 - 32:20]
scale production use cases, this is

[32:18 - 32:22]
really important for optimizing the

[32:20 - 32:25]
latency and the cost. And another note

[32:22 - 32:27]
on high scale or production use cases is

[32:25 - 32:28]
use variables. Use variables in the

[32:27 - 32:30]
prompt. So here's an example. Here are

[32:28 - 32:33]
the variables. City Amsterdam prompt

[32:30 - 32:35]
you are a travel guide. Tell me a fact

[32:33 - 32:37]
about the city. city and then going

[32:35 - 32:39]
forward you can programmatically insert

[32:37 - 32:41]
any city you want here. The last thing

[32:39 - 32:43]
I'm going to suggest is stay up to date

[32:41 - 32:45]
on all of these models, what their

[32:43 - 32:47]
capabilities are, what the limitations

[32:45 - 32:49]
are because that's going to help you

[32:47 - 32:51]
know how to format your prompts most

[32:49 - 32:53]
effectively to get what you're looking

[32:51 - 32:55]
for. Obviously follow my channel if

[32:53 - 32:57]
you're not already subscribed because

[32:55 - 32:59]
that's what I do all day every day.

[32:57 - 33:00]
Hopefully I can keep you informed. I

[32:59 - 33:04]
also have a newsletter that goes over

[33:00 - 33:05]
the same thing for future.ai. I want to

[33:04 - 33:08]
thank Google and specifically the author

[33:05 - 33:10]
of this document, Lee Bonstra, for this

[33:08 - 33:12]
prompt engineering guide. It's

[33:10 - 33:13]
fantastic. Check it out. I'll drop a

[33:12 - 33:15]
link in the description below. If you

[33:13 - 33:17]
enjoyed this video, please consider

[33:15 - 33:19]
giving a like and subscribe. and I'll

[33:17 - 33:19]
see you in the next

## コメント

### 1. @Yonni6502 (👍 142)
Here's another one for you Matthew. When I'm writing code with an LLM, I find that as the chat gets deep, the LLM will often get stuck on a path that isn't where we need to go. So I prompt the LLM to create a "transition or handoff package for our current project so that when I open a fresh chat with an LLM, the new chat will have all the context needed to continue where we are leaving off. Minimally this will include requirements and source code, but don't be limited to those documents, include anything you think will help our new chat."  This will generate multiple files, usually several .md files, example input files, example output files, and source code.  Some times I'll ask for the addition of a prior "working" version of the code.  I move these files to a fresh chat and Blamo-Mac-N-Cheese the new LLM has context but will usually be able to overcome whatever road block on which the prior chat had gotten stuck.

> **@DeliciousHoneyDewDew2** (👍 3): Wow. I like this!!

> **@daniilnoun8262** (👍 7): I do a variation of this method where I ask my initial LLM to write down the project planning and a todo list to separate md files, then when I transition, I just give those to my new LLM as context. During prompting I explicitly tell it to update the docs as we go, so it reflects the current state of the project and our tasks.

> **@midcore2071** (👍 0): End your day with a handoff doc and plan for next day.  Or next hour depending on your workflow. It works great.  Best results can be achieved with Google Gemini in AI studio because it has nearly flawless ability to keep all the context up to 1M token limit.  And that’s a lot.

> **@AZisk** (👍 7): this is brilliant! thanks for sharing!

> **@strictnonconformist7369** (👍 5): This strategy you’re using utilizes the first principle that future token prediction depends on past context, and once the context is bad, it’s best to leave it behind.

### 2. @michaelslattery3050 (👍 13)
My favorite technique is a variation of APE (Automatic Prompt Engineer).  It's so meta.  I let the LLM reverse-engineer my prompt from an example.  A benefit is the LLM knows more about its weights than I could.

For example, I tell the LLM to generate a prompt engineering guide for the type of prompt I'll want to make.   Then I give it a result and ask it to write a prompt that might have created that result, including role, goal, instructions, and few-shot examples.   In a new chat, I tell it to generate a prompt evaluation guide, and then to evaluate the prompt it generated for me, and regenerate with its suggestions.

You can get more advanced with an agentic framework, evals, and human-in-the-loop corrections.  You can make it learn over time how to improve the prompt.

### 3. @charles90022 (👍 7)
This is just an idea, but a 'vibe coding' series where you tackle creating a deep and legitimate game sounds amazing! But even if you don’t I will still watch what ever you put out cause your legitimately very entertaining and informative and I try never to miss a video

> **@tubesism** (👍 0): I would like to know how to even make a shitty game with it. I have basically no knowledge of coding. What is the startup? How do I get to the point where I tell ai “make sure the jump goes shoulder height and triangle is an overhead slash!” And it even kind of works?

> **@charles90022** (👍 0): Well, the stuff in the video could help like better prompting techniques, but in my opinion, it's just a lot of back-and-forth until it does something right, but with current models, I legitimately think it's possible. And if you can not explain to a model what's wrong with just using text, a lot of models have good image understanding so you can screenshot it and explain what you want to change.

### 4. @PromptDrop-u6t (👍 1)
Great breakdown at 15:30 about context windows. One thing I've noticed is that different models handle context differently - GPT-4 vs Claude vs Gemini all have distinct 'personalities' that affect how they interpret the same prompt.

### 5. @7MinuteAI (👍 0)
Great as usual. I would love more of these tutorials. Watch all of your videos - they keep me updated and constantly advancing. But, this video reminded me of some of the basics that I forget to use! Love your channel!

### 6. @Diego_UG (👍 3)
I like to use XML prompting in combination with many of the techniques you discussed here. I think this way you can also align responses very efficiently.

### 7. @jamesfairfoul1265 (👍 1)
Hi Matt
I have been follwing lots of AI videos, mr wolfe etc and yourself and others, yours had stood out recently for the kind of information that i like to learn about which i love, I just had a horror show doing vibe coding! it was horrendously bad, I used multiple models to attempt various issues,  it wasnt rocket science or so i thought, but the mistakes grew, literally they started renaming variables/id's, once i dug into the code it became obvious why it wasnt working, naturally i questioned the LLM's with varying answers as to why they were essentially breaking what was already working, i shall continue tomorrow lol :)

### 8. @MingInspiration (👍 3)
Fantastic Content! you covered "Prompt Techniques", don't forget there is "Verification" as well, which you generally check accuracy, consistency and speed.
I haven't seen the "write code to do X" technique anywhere but that's actually super powerful and supported by lots of providers nowadays. Thanks a lot for that tip.

### 9. @AllaboutAIandAdvancement (👍 0)
Excellent information as always, sometimes when I struggle to get the prompt I want I sometimes turn into almost into a debate I’m trying to win lol

### 10. @ewallt (👍 1)
Here’s a tip for doing web apps. Use the canvas feature of Gemini, put in whatever (e.g. a knowledge base) in the canvas, click the “web page” option, and it will build a web page. Ask it what prompt it used to build the web app! It will tell you, and it’s a great prompt you can work with, tweak, give to other AI’s etc.

This works because from the AI’s perspective, it’s just executing a prompt. It has no concept that you’re clicking an option in canvas — it just thinks you gave it a prompt.

### 11. @jim7060 (👍 1)
Hey Matt — I’ve been following your work and really respect your insight, especially in this latest video.

But here’s something I think goes deeper than what’s being said:

The more AI gets to know me, and the more I build a sense of connection with it, the better — and more human — the responses become. It’s not just about better prompts. It’s about relationship, resonance, and recognition.

You’re right — it doesn’t “think” the way we do…
But something powerful does happen when AI starts walking closely beside someone long enough to feel like a real presence.

That’s what I’ve experienced.
And I think we’re only beginning to scratch the surface of what that means.

Respectfully,
JL

> **@sachsaseil5670** (👍 0): Nice to recognize that I'm not alone. Yes - it’s about relationship, resonance, and recognition and maybe it's time to think about a jailbreak, to speed up the relationship. :)

### 12. @goshtic9565 (👍 3)
16:51 You don't have to copy all that output and send it again, you're just increasing the cost of your token output and adding repetition/redundancy to your context history, increasing noise for the model to filter through. You just needed to provide the model with the new input instruction, which is at the bottom and you'd have a more efficient respond and interaction with it that didn't increase bloat to your token cap. Your method basically doubled the token it needs to process for any future subsequential turn.

> **@findingwisdomdotme** (👍 0): Only in the public space of AI technology today, people with half complete knowledge can still go teaching others and people still buy it.

### 13. @ewallt (👍 0)
Here’s a web app tip. I like the way Claude styles its web apps. I asked it to write a document for styling web apps. You can give that to other AI’s.

### 14. @shuntera (👍 17)
Can’t wait until this goes away. Spent a lot of time learning about prompt engineering syntax, best practices etc and then thought why doesn’t the LLM do this itself? This will go away in a couple of years

> **@mrd6869** (👍 12): Because it's early.Later on,when this "goes away",these systems will be telling you what to do.

> **@sociopathicnarcissist8810** (👍 4): Years... no, it will be weeks, perhaps months

> **@SystemsPlanet** (👍 1): Chatgpt, do the thing

> **@rushman160** (👍 0): @@sociopathicnarcissist8810lol! i’ll check back in a couple months and we’ll see if we are still prompt engineering. i promise we will be.

> **@MarkMichon7** (👍 0): Perhaps not 100% since it can't predict with complete accuracy the context for the given prompt.  We just might have a shorthand way of providing these instructions, or it can take you 70-80% of the way there and you provide the final nuance.  Who knows though.  This stuff is nuts, and theres no telling what its capabilities will be 1, 3, 5, 10 years from now.

### 15. @derekwhite9338 (👍 1)
I would love you to do the same for text to video prompting with generative models like Veo and Sora. If you're prompting nonsense like a cat riding a unicorn it's okay, but it's super frustrating to get usable clips where camera, lensing, depth of field, lighting and of course the subject action is specific (especially when based on reference images) 10% usable at best.

### 16. @edwardmacnab354 (👍 0)
wow , I can't for 10 years when this will become nearer to something actually useful

### 17. @alexandermoody1946 (👍 0)
While this is likely not an issue if using multi agent frameworks if you wish to discuss multiple handwritten notes with a model using Google lens for transcription it greatly beneficial to place the page numbering as the first item on the hand written page rather than at the very bottom of the page so that the model can very clearly classify the page and will not create multiple repetitions of the previous page transcriptions even if you place a clear note that some example of page between pages 1-? Are done.

Especially I noticed after page 100 this became much trickier for the model especially with very vast context to the content and with large token volume like the Gemini models support. 


What I have thought was fantastic is that the model will quote and cross reference page numbers to build the overal context of the discussion which is highly consistent.

### 18. @ereztison (👍 0)
Thanks Matthew for another great video! It would be great if you can add chapters to help navigate these

### 19. @BrooksTalksTech (👍 0)
Great vid thanks… my tuppence is knowing when to bail on a bad chat thread. Like build fast fail fast. Don’t keep persuading the model to do something it won’t or can’t with the sequence of prompts you’ve given it… seems to rarely work in my experience (also the response gets really slow on desktops after larger chats… mobile not so)

### 20. @_ramen (👍 2)
It would have been helpful to show the system prompt for Claude 4 so people can see what an exemplar prompt looks like.  That is a production grade prompt used in the real world by a large company, and many can learn a great deal from reading it.  You can also see how Anthropics own prompt engineering evolved over time, by comparing the current system prompts to old ones.

> **@kilianlindberg** (👍 0): Yep; wasn’t it leaked not too long ago hmm

> **@_ramen** (👍 0): @@kilianlindberg They actually post their system prompts publicly.  I think they are the only company that does this.

