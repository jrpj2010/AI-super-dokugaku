# The Science of Prompt Engineering | TrailblazerDX 2024

**チャンネル:** Salesforce Admins
**公開日:** 2024-03-14
**URL:** https://www.youtube.com/watch?v=eOfHD1ObOLQ

## 説明

Discover how Salesforce helps you optimize LLM outputs. Learn how to enrich prompts with dynamic grounding and embed prompts anywhere, including Copilot, to maximize productivity gains.

Website: https://admin.salesforce.com
LinkedIn: https://linkedin.com/showcase/salesforce-admins
Twitter: https://twitter.com/SalesforceAdmns
Subscribe to our Email List: https://www.salesforce.com/form/other/admin-digest/

## 字幕

[00:05 - 00:10]
all right I think we're going to go

[00:06 - 00:13]
ahead and jump in um and we're going to

[00:10 - 00:15]
talk about prompt engineering today so

[00:13 - 00:16]
uh there is very specifically a slide

[00:15 - 00:19]
I'm going to get to that there's a

[00:16 - 00:20]
camera on I highly recommend you take a

[00:19 - 00:22]
picture of that because it's going to

[00:20 - 00:24]
make you seem really smart when you get

[00:22 - 00:26]
back to the office because you can have

[00:24 - 00:27]
all the terms memorized or at least

[00:26 - 00:30]
you'll look like you did so I'll let you

[00:27 - 00:33]
know when we get to that slide um ucing

[00:30 - 00:35]
uh intruction to myself tion Krueger I

[00:33 - 00:37]
am a product manager at Salesforce I've

[00:35 - 00:40]
been working on building prompt Builder

[00:37 - 00:41]
um for the last here and uh if you've

[00:40 - 00:45]
been outside on the floor you've

[00:41 - 00:48]
probably seen it by now um I'm joined by

[00:45 - 00:50]
jasn Ren Paul and Marissa and I'm not

[00:48 - 00:54]
going to say your last name right scario

[00:50 - 00:55]
scario um who is one of the um pilot

[00:54 - 00:56]
customers that actually got to use promp

[00:55 - 00:58]
Builder we're going to talk to her a

[00:56 - 01:01]
little bit um to find out what we're

[00:58 - 01:03]
going to do normally we talk about a lot

[01:01 - 01:05]
of future facing things I think this

[01:03 - 01:08]
this deck is mostly what's currently in

[01:05 - 01:10]
GA but in case I do say something about

[01:08 - 01:12]
what's coming or future facing please

[01:10 - 01:15]
make your decisions based on what's

[01:12 - 01:18]
currently available not what's coming

[01:15 - 01:20]
tomorrow all right thank you for being

[01:18 - 01:22]
here I already said thank you once you

[01:20 - 01:24]
actually didn't go to true to the core

[01:22 - 01:26]
to come learn about prompt engineering

[01:24 - 01:27]
so you're all the smart people so I

[01:26 - 01:29]
really appreciate you being here but I

[01:27 - 01:31]
really appreciate you being Salesforce

[01:29 - 01:34]
customers I really appreciate you coming

[01:31 - 01:36]
and learning about generative Ai and the

[01:34 - 01:39]
incredible Revolution that is going on

[01:36 - 01:42]
inside of companies due to this

[01:39 - 01:44]
technology so who here has used GPT with

[01:42 - 01:46]
raise of

[01:44 - 01:47]
hands I think that's almost everybody I

[01:46 - 01:50]
think there's like three of you that

[01:47 - 01:52]
need to go do it this afternoon all

[01:50 - 01:54]
right so I highly recommend it play with

[01:52 - 01:55]
it learn find out what you can do with

[01:54 - 01:58]
it it's actually very amazing what it

[01:55 - 02:00]
can do um I'm curious just like you

[01:58 - 02:02]
don't have to use the microphone just um

[02:00 - 02:05]
just a like in a short sentence can

[02:02 - 02:08]
somebody Define what a prompt

[02:05 - 02:11]
is set of instructions some instructions

[02:08 - 02:13]
okay maybe one more contextual relevance

[02:11 - 02:15]
contextual relevance you look like you

[02:13 - 02:18]
had a qu you had you had an answer yeah

[02:15 - 02:19]
oh I said set of commands set of

[02:18 - 02:20]
commands set of commands Okay those are

[02:19 - 02:22]
pretty good those are pretty good and

[02:20 - 02:24]
actually some of those are in there so a

[02:22 - 02:28]
prompt is very simply a combination of

[02:24 - 02:31]
instructions which we had guidance and

[02:28 - 02:33]
requirements combined with data the data

[02:31 - 02:35]
is very important and we'll talk about

[02:33 - 02:38]
that that's going to be transformed by

[02:35 - 02:41]
an llm and just just as I was talking to

[02:38 - 02:44]
a customer earlier today it reminded me

[02:41 - 02:46]
that not everybody is up to all the

[02:44 - 02:49]
jargon that we love to just throw into

[02:46 - 02:51]
our slides so I figured I'll take just a

[02:49 - 02:54]
second to back back off a little bit and

[02:51 - 02:55]
say okay let's define what an llm is and

[02:54 - 02:58]
I'm sure some of you you're like okay

[02:55 - 02:59]
Yep this is I got this great if you're

[02:58 - 03:03]
it you can take a moment check your

[02:59 - 03:06]
email to everybody else and llm is a

[03:03 - 03:08]
very specific very specialized

[03:06 - 03:11]
pre-trained AI

[03:08 - 03:14]
model um I we live in a world where we

[03:11 - 03:16]
can actually now say old AI right

[03:14 - 03:18]
there's actually things now like yeah

[03:16 - 03:19]
you know you know predictive AI it's

[03:18 - 03:22]
been around a while now it's actually

[03:19 - 03:24]
been it's kind of old AI so we live in

[03:22 - 03:25]
this world generative AI is a new thing

[03:24 - 03:28]
that's you know come out over the last

[03:25 - 03:30]
year if you've watched the news but what

[03:28 - 03:33]
how do they compare specifically

[03:30 - 03:35]
predictive models are very specialized

[03:33 - 03:37]
they do a particular task they identify

[03:35 - 03:41]
images they identify particular records

[03:37 - 03:44]
They predict um certain rates llms are

[03:41 - 03:45]
General use if you want the predictive

[03:44 - 03:47]
model to work for you you have to train

[03:45 - 03:50]
it you have to actually feed it it's

[03:47 - 03:52]
like a brand new college grad they have

[03:50 - 03:54]
all the learnings but no knowledge and

[03:52 - 03:55]
so you have to teach them everything

[03:54 - 03:58]
before they can actually do something

[03:55 - 04:00]
useful a generative AI is like an

[03:58 - 04:02]
industry expert they know a lot of

[04:00 - 04:03]
things but when they come into your

[04:02 - 04:05]
company they know nothing about your

[04:03 - 04:07]
company so if you ask them a really good

[04:05 - 04:09]
question and you give them really good

[04:07 - 04:13]
context about your company they can give

[04:09 - 04:14]
you a really good answer okay tip that's

[04:13 - 04:18]
a prompt we're going to talk about that

[04:14 - 04:20]
some more predictive models predict

[04:18 - 04:24]
Things based on the data that you've

[04:20 - 04:25]
trained it with uh alms actually know

[04:24 - 04:28]
how to do

[04:25 - 04:30]
Transformations why am I going into that

[04:28 - 04:32]
specific detail if you are all looking

[04:30 - 04:35]
in your companies how do I bring

[04:32 - 04:36]
generative AI into my company it's very

[04:35 - 04:40]
very important to understand what

[04:36 - 04:42]
generative AI can do what is it good at

[04:40 - 04:44]
because if you understand what it's good

[04:42 - 04:45]
at you can identify the right use cases

[04:44 - 04:47]
and if you can identify the right use

[04:45 - 04:50]
cases you're going to have the best

[04:47 - 04:51]
success actually deploying it into your

[04:50 - 04:53]
company and actually providing great

[04:51 - 04:56]
return on investment for what you're

[04:53 - 04:58]
doing lastly and this is incredibly

[04:56 - 05:03]
important predictive models know your

[04:58 - 05:06]
data because you fed it your data llms

[05:03 - 05:09]
know nothing about you and know nothing

[05:06 - 05:12]
about your data which means it relies on

[05:09 - 05:14]
you to give it the context that you

[05:12 - 05:16]
actually want it to transform so you

[05:14 - 05:18]
have to do that hopefully that was

[05:16 - 05:19]
helpful if if you if you've known all

[05:18 - 05:23]
this great you can stop checking your

[05:19 - 05:25]
email now so most of you have used GPT

[05:23 - 05:26]
so this should be very familiar right

[05:25 - 05:28]
you type something in GPT does something

[05:26 - 05:29]
with it you go back and forth back and

[05:28 - 05:31]
forth back and forth and ultimately you

[05:29 - 05:34]
get what you're looking

[05:31 - 05:36]
for the difference between this and what

[05:34 - 05:38]
we're going to show you in a bit is that

[05:36 - 05:40]
the way GPT actually does grounding is

[05:38 - 05:42]
with iteration so you're you're

[05:40 - 05:43]
basically going back and forth back and

[05:42 - 05:45]
forth giving it a little bit more

[05:43 - 05:47]
details and kind of refining what you

[05:45 - 05:50]
get back the thing I'm going to show you

[05:47 - 05:52]
in a moment here is taking that and

[05:50 - 05:54]
generalizing it so that you can build if

[05:52 - 05:57]
you heard Clara talking in the keynote

[05:54 - 05:59]
about Golden prompts is this idea of you

[05:57 - 06:01]
kind of refine it so you get the

[05:59 - 06:03]
instructions and the data that can come

[06:01 - 06:06]
together to give you a repeatable good

[06:03 - 06:09]
result on the first try okay so you have

[06:06 - 06:11]
a prompt The Prompt goes off to your llm

[06:09 - 06:12]
or your external model you get a

[06:11 - 06:14]
response back that you get to use

[06:12 - 06:15]
somewhere what's all involved in a

[06:14 - 06:16]
prompt and by the way the next slide is

[06:15 - 06:17]
going to be the one that you're going to

[06:16 - 06:19]
want to take a picture of because I

[06:17 - 06:22]
actually Define what all of these boxes

[06:19 - 06:24]
mean so on the on the left hand side

[06:22 - 06:27]
there you have instructions policies and

[06:24 - 06:29]
examples right so this is telling the

[06:27 - 06:32]
llm what you wanted to do and what it

[06:29 - 06:34]
should look like in the middle we have

[06:32 - 06:38]
what's called prompt parameters local uh

[06:34 - 06:40]
local style tone what output format I

[06:38 - 06:43]
want Json I want HTML I want whatever

[06:40 - 06:45]
and then um in the interaction context

[06:43 - 06:47]
that you want to behave in and on the

[06:45 - 06:49]
right side you have hyper parameters

[06:47 - 06:51]
we'll talk about those in a moment your

[06:49 - 06:53]
model Choice which is like my favorite

[06:51 - 06:54]
feature we'll talk about that and then

[06:53 - 06:56]
grounded data which is the most

[06:54 - 06:58]
important thing that you possibly can

[06:56 - 07:02]
provide to your prompt okay here's your

[06:58 - 07:04]
slide take a picture of that so um each

[07:02 - 07:07]
one of these things are really important

[07:04 - 07:09]
and if you learn to actually use each of

[07:07 - 07:13]
these tools properly you're going to

[07:09 - 07:16]
build prompts that are accurate that are

[07:13 - 07:18]
repetitive that are in in a good way or

[07:16 - 07:20]
repeatable and that actually provide

[07:18 - 07:21]
really really good value so all right

[07:20 - 07:24]
let's take a look and make this

[07:21 - 07:25]
practical so there's our instructions

[07:24 - 07:28]
write me an introductory message

[07:25 - 07:30]
Introducing Me ton to a new team I'm

[07:28 - 07:32]
providing some parameters in the style

[07:30 - 07:35]
of Steve Jobs including my title product

[07:32 - 07:37]
manager that's grounding data and my

[07:35 - 07:39]
interest biking surfing and fishing I

[07:37 - 07:41]
don't serve this was somebody else's

[07:39 - 07:43]
slide all right examples and then you

[07:41 - 07:46]
can actually provide some examples of

[07:43 - 07:48]
emails Etc if we take this a step

[07:46 - 07:51]
further so this is a prompt but all the

[07:48 - 07:52]
data is hardcoded right so let's take it

[07:51 - 07:55]
a step further and say how do I turn

[07:52 - 07:58]
this into a template okay so now the

[07:55 - 08:00]
template has a couple of new um things

[07:58 - 08:02]
you have for instance Fields here that

[08:00 - 08:05]
can be substituted with data in your

[08:02 - 08:06]
instructions you have parameters that's

[08:05 - 08:09]
passed in those are familiar British

[08:06 - 08:10]
English formal style uh you have your

[08:09 - 08:12]
policies okay so what's a policy let's

[08:10 - 08:14]
talk about a policy just for a second if

[08:12 - 08:17]
you want the thing to do a particular

[08:14 - 08:19]
thing in a particular way that's a

[08:17 - 08:21]
policy okay it's not related to the the

[08:19 - 08:25]
specific response you want but it's the

[08:21 - 08:28]
don't don't um uh you know I'm trying to

[08:25 - 08:29]
think a good example there's a there's

[08:28 - 08:31]
actually there we go uh you have no

[08:29 - 08:32]
mention of a company name except mine

[08:31 - 08:34]
and my Prospect you know don't throw

[08:32 - 08:36]
another competitor in there do not

[08:34 - 08:39]
address the um contact by pronouns you

[08:36 - 08:42]
see how that's not part of the ask of

[08:39 - 08:45]
the prompt but it is guidance for it or

[08:42 - 08:47]
a policy that you want to apply okay and

[08:45 - 08:50]
then the examples now at the bottom

[08:47 - 08:52]
there you can see model selection so I

[08:50 - 08:54]
said this is really really important at

[08:52 - 08:56]
Salesforce we have an extensible model

[08:54 - 08:58]
selection what this means is we're

[08:56 - 09:01]
shipping a bunch of models if you've

[08:58 - 09:04]
seen the live demos on the floor gp35

[09:01 - 09:07]
gbd4 gbd4 with bigger and bigger and

[09:04 - 09:10]
bigger sizes uh capacities we also are

[09:07 - 09:13]
shipping um open air sorry um Azure

[09:10 - 09:14]
models the open AI models but we have

[09:13 - 09:17]
co- here coming in a bunch of other

[09:14 - 09:19]
models why are we doing this why are we

[09:17 - 09:21]
shipping a bunch of models because

[09:19 - 09:24]
different models have different

[09:21 - 09:26]
qualities they do different things well

[09:24 - 09:29]
and so we want you to be able to per

[09:26 - 09:32]
prompt say which bottle works the best

[09:29 - 09:34]
and as a result which prompt actually

[09:32 - 09:35]
works the best in that particular use

[09:34 - 09:38]
case and in fact you can even bring your

[09:35 - 09:40]
own model so that you can say for this

[09:38 - 09:42]
one prompt I want to use a particular

[09:40 - 09:45]
model so if you already are working with

[09:42 - 09:47]
Microsoft great bring them if you're

[09:45 - 09:48]
working with Google fantastic they're

[09:47 - 09:50]
going to be able to play if you build

[09:48 - 09:52]
your own model bring that too you can

[09:50 - 09:54]
use all of that hyperparameters last

[09:52 - 09:56]
piece it's a bit of a little more

[09:54 - 09:59]
technical but it's the ability for you

[09:56 - 10:00]
to say be less creative be more creative

[09:59 - 10:03]
which is called the temperature there

[10:00 - 10:06]
are also other parameters um where you

[10:03 - 10:07]
can actually play with the llm so what

[10:06 - 10:09]
does this look like when we put it

[10:07 - 10:11]
together we got a promp

[10:09 - 10:13]
template we add a bunch of data in the

[10:11 - 10:16]
llm will merge it or the system will

[10:13 - 10:19]
merge it in and voila we get a beautiful

[10:16 - 10:21]
generated email that actually produces

[10:19 - 10:24]
the data uses the data you produced

[10:21 - 10:27]
inside of the email now I said earlier

[10:24 - 10:28]
data is very very important the reason

[10:27 - 10:30]
data is important is if you heard if

[10:28 - 10:34]
you've read or spent much time talking

[10:30 - 10:38]
about llms or AIS you hear this term a

[10:34 - 10:40]
lot where the llm will

[10:38 - 10:42]
hallucinate and by the way if you think

[10:40 - 10:44]
do not hallucinate in your instructions

[10:42 - 10:46]
will stop it from hallucinating don't

[10:44 - 10:49]
you think open AI would have added that

[10:46 - 10:54]
so the way to get your prompts to not

[10:49 - 10:56]
hallucinate is feeded data if I ask L

[10:54 - 10:58]
the llm produce me a beautiful Airbnb

[10:56 - 11:00]
listing it'll produce me a beautiful

[10:58 - 11:02]
airbm be listing that's what I asked it

[11:00 - 11:03]
to do just like a human it wants to give

[11:02 - 11:05]
you an answer the problem is that it

[11:03 - 11:08]
it's going to make up the place the city

[11:05 - 11:10]
the house the rooms the everything right

[11:08 - 11:12]
because it has no grounding data so

[11:10 - 11:15]
grounding it with data is incredibly

[11:12 - 11:17]
important to get a good result so enter

[11:15 - 11:19]
prompt Builder the thing that me and my

[11:17 - 11:22]
team have spent the last year building

[11:19 - 11:24]
and why did we build it well people were

[11:22 - 11:27]
already playing with GPT like yourselves

[11:24 - 11:29]
but it's really difficult to take GPT

[11:27 - 11:33]
and integrate it into your existing

[11:29 - 11:35]
processes one two it's dangerous you may

[11:33 - 11:40]
be actually sending your data out of

[11:35 - 11:41]
your company to train GPT and lastly

[11:40 - 11:43]
taking that output and putting it back

[11:41 - 11:45]
into your processes are really hard and

[11:43 - 11:47]
we saw that and we said okay we got to

[11:45 - 11:48]
build something that makes it easier so

[11:47 - 11:50]
we built this product called promp

[11:48 - 11:53]
Builder and it is actually a very

[11:50 - 11:56]
simplistic product it's not magical it's

[11:53 - 11:58]
not incredibly complex it's very

[11:56 - 12:02]
practical but it means you can benefit

[11:58 - 12:04]
from it immediately you take your data

[12:02 - 12:07]
you take your instructions you bring

[12:04 - 12:08]
them together in a in a template and

[12:07 - 12:11]
then you pick which model to run it

[12:08 - 12:13]
against and once you have that you can

[12:11 - 12:15]
actually plug it into any process that

[12:13 - 12:17]
you have already it fits into processes

[12:15 - 12:18]
like flow you can use it from Apex you

[12:17 - 12:21]
can use it in all the different places

[12:18 - 12:22]
it's incredibly uh powerful and can be

[12:21 - 12:24]
used in all of these different places

[12:22 - 12:27]
where you already have your processes

[12:24 - 12:29]
defined it's generative AI in your

[12:27 - 12:32]
existing organization in your existing

[12:29 - 12:34]
processes easily quickly please be

[12:32 - 12:37]
careful as you build these things two

[12:34 - 12:40]
things I want to uh uh make you think

[12:37 - 12:42]
about one is human in the loop when you

[12:40 - 12:45]
generate the result don't just send it

[12:42 - 12:47]
off to a customer go check the news

[12:45 - 12:49]
somebody just had got their uh airline

[12:47 - 12:51]
tickets like for a particular amount

[12:49 - 12:53]
because the bot said that they can do it

[12:51 - 12:56]
Go congratulations company AI just made

[12:53 - 12:58]
up a policy for you check the result

[12:56 - 12:59]
before you send it to a customer always

[12:58 - 13:00]
keep a human in the loop Loop and as

[12:59 - 13:03]
you're designing as you're designing

[13:00 - 13:05]
these things always think about that you

[13:03 - 13:08]
need to have a human before it goes off

[13:05 - 13:10]
to a customer um the second thing is run

[13:08 - 13:13]
it repeatedly on different sets of

[13:10 - 13:14]
data once you build your prom template

[13:13 - 13:18]
and you run it and it gives you one good

[13:14 - 13:20]
result woohoo ship it don't please don't

[13:18 - 13:22]
run it on a bunch of different data run

[13:20 - 13:24]
it a bunch of different times make sure

[13:22 - 13:26]
that it's repeatedly coming back I'll

[13:24 - 13:28]
give you a great example I have one

[13:26 - 13:30]
example that I used a dream force and it

[13:28 - 13:33]
I Ed GPT 3.5 at that point and it would

[13:30 - 13:35]
always miscount the amount of cases in

[13:33 - 13:37]
the in the summary I was doing sometimes

[13:35 - 13:38]
so was six sometimes so was seven

[13:37 - 13:41]
sometimes it was eight sometimes it was

[13:38 - 13:43]
six now in the use case I used not the

[13:41 - 13:45]
most important thing but if you're doing

[13:43 - 13:47]
something that that that accuracy is

[13:45 - 13:49]
important you probably should pay

[13:47 - 13:51]
attention to that flip it to use GPD 4

[13:49 - 13:52]
which actually was more stable and

[13:51 - 13:56]
actually used a more consistent result

[13:52 - 13:58]
so testing testing testing okay we T

[13:56 - 14:00]
talked about data CRM data you can use

[13:58 - 14:02]
flow Builder to get to pretty much

[14:00 - 14:03]
anything and we're only going to make it

[14:02 - 14:04]
even more powerful there you go there's

[14:03 - 14:06]
your future facing statement we're going

[14:04 - 14:09]
to actually add more capabilities for

[14:06 - 14:11]
you to be able to get to Via flow so

[14:09 - 14:13]
prompt flows are awesome it enables so

[14:11 - 14:16]
much it allows you to get data Cloud we

[14:13 - 14:17]
actually have data Cloud via enrichments

[14:16 - 14:20]
and then of course all of your external

[14:17 - 14:22]
data can be pulled in as well we keep

[14:20 - 14:24]
all of that safe by the tools that's in

[14:22 - 14:25]
the trust layer I'm not going to get

[14:24 - 14:27]
into the trust layer deep here it was an

[14:25 - 14:29]
amazing session this morning and there

[14:27 - 14:32]
are amazing experts on the floor go look

[14:29 - 14:33]
at the demo ask them questions there's a

[14:32 - 14:35]
couple different things that's available

[14:33 - 14:38]
in G right now you can generate sales

[14:35 - 14:40]
emails you can uh do field generation

[14:38 - 14:42]
you can actually um see records record

[14:40 - 14:43]
summaries you can generate record

[14:42 - 14:46]
summaries and then the last one is

[14:43 - 14:48]
called Flex what the heck is a flex

[14:46 - 14:49]
template Flex template really means just

[14:48 - 14:51]
what it is it's a flexible template you

[14:49 - 14:53]
can actually Define what the data is

[14:51 - 14:55]
that's passed in and you can plug it

[14:53 - 14:56]
into any process in your system so if

[14:55 - 14:58]
you want to pass in an opportunity a

[14:56 - 15:00]
product and an asset and then you want

[14:58 - 15:02]
to do some transformation with the data

[15:00 - 15:05]
in it and then drop it in a screen flow

[15:02 - 15:08]
fantastic I can't wait to see what you

[15:05 - 15:11]
build all right so now Theory Jaz wonder

[15:08 - 15:13]
is going to actually show us a little

[15:11 - 15:15]
bit of prompt Builder that's scary

[15:13 - 15:18]
that's a hard act to follow after that

[15:15 - 15:20]
other way other way there we go that's

[15:18 - 15:22]
one thing j can't fix using somebody

[15:20 - 15:25]
else's laptop which has different

[15:22 - 15:27]
settings uh if some of you have used

[15:25 - 15:29]
Financial Services Cloud this is

[15:27 - 15:31]
financial services cloud

[15:29 - 15:33]
the idea with this demo is not to really

[15:31 - 15:36]
show how it works in financial Cloud but

[15:33 - 15:39]
give you an idea how you can think about

[15:36 - 15:41]
promps and how you can use them so

[15:39 - 15:44]
that's the thing when we say in every

[15:41 - 15:46]
business process we really mean it so we

[15:44 - 15:48]
have this kencing profile and there's a

[15:46 - 15:50]
lot of data there's data in Salesforce

[15:48 - 15:53]
there is data from data cloud in this

[15:50 - 15:56]
profile and that's a lot so I want to be

[15:53 - 15:58]
able to review this imagine me going

[15:56 - 16:01]
through related list and or building

[15:58 - 16:05]
something reports and figuring it out or

[16:01 - 16:08]
I can go in this tab and I

[16:05 - 16:11]
can go here and you can see sumary of

[16:08 - 16:13]
financial account is already there but

[16:11 - 16:15]
is it accurate uh because there was more

[16:13 - 16:18]
data remember I said data cloud data is

[16:15 - 16:20]
coming from everywhere all the time so

[16:18 - 16:23]
here I'm using what we call in those

[16:20 - 16:26]
examples field generation template and

[16:23 - 16:29]
when I run it and it's right now using

[16:26 - 16:31]
that prompt which I'll show you in a m

[16:29 - 16:33]
going to the llm with all the data that

[16:31 - 16:36]
is needed to generate a summary of

[16:33 - 16:40]
financial account and that's it it's so

[16:36 - 16:43]
simple to use I click that I come back I

[16:40 - 16:46]
save it now I have an updated summary

[16:43 - 16:47]
okay that's cool but do I have to do

[16:46 - 16:51]
that every time do I have to go field by

[16:47 - 16:54]
field not really and that's again all

[16:51 - 16:56]
about where you can use it I have a flow

[16:54 - 16:58]
uh I can click this flow and at this

[16:56 - 17:00]
point it's using another template

[16:58 - 17:02]
tempate for another field going to llm

[17:00 - 17:04]
with different sets of data where it's

[17:02 - 17:06]
sending all the cases and saying

[17:04 - 17:08]
generate the summary for me and it comes

[17:06 - 17:11]
back here is the priority for all the

[17:08 - 17:12]
cases and when I use that it's updating

[17:11 - 17:14]
the

[17:12 - 17:18]
field right

[17:14 - 17:20]
here this field here can I not do it

[17:18 - 17:22]
maybe I don't have to do one by one

[17:20 - 17:25]
create an action for this why not it's a

[17:22 - 17:27]
flow use it everywhere we have all of

[17:25 - 17:29]
the templates I showed you right here

[17:27 - 17:32]
now I want to generate the client

[17:29 - 17:34]
information a full summary of client and

[17:32 - 17:36]
I also want to generate a PDF file so

[17:34 - 17:38]
that I can send it to someone maybe an

[17:36 - 17:42]
executive says give me the summary of

[17:38 - 17:44]
that client today so here I'm generating

[17:42 - 17:47]
a lot of data so I was before I was

[17:44 - 17:49]
doing accounts or cases here I'm going

[17:47 - 17:51]
through everything all the data that

[17:49 - 17:53]
customer has and generating the list of

[17:51 - 17:56]
everything they have done interactions

[17:53 - 17:58]
and requests and what are the uh next

[17:56 - 18:00]
actions we can do Based on data remember

[17:58 - 18:02]
it's it's not predictive it's based on

[18:00 - 18:06]
the data we do and right there it

[18:02 - 18:08]
generated that summary for me and I also

[18:06 - 18:11]
uploaded this as a file now I'm showing

[18:08 - 18:13]
it to you that you can use it in a flow

[18:11 - 18:16]
but remember flow means you can automate

[18:13 - 18:18]
it too as long as you make sure to add a

[18:16 - 18:20]
human in the loop to review that and

[18:18 - 18:23]
this is what that flow looks like that

[18:20 - 18:25]
you just saw based on the selection I

[18:23 - 18:28]
say I want to use this template this is

[18:25 - 18:31]
the option I selected and here is the

[18:28 - 18:34]
Pro uh template I used for this

[18:31 - 18:37]
particular action this is the I I pass

[18:34 - 18:40]
it saying do this for this account I

[18:37 - 18:42]
didn't pass any more data that is very

[18:40 - 18:44]
important I didn't pass any more data I

[18:42 - 18:46]
just said account ID I will get the

[18:44 - 18:48]
response back here that we saw on the

[18:46 - 18:52]
screen and we saved the

[18:48 - 18:55]
record okay this is what that Pro uh

[18:52 - 18:57]
that uh template looks like here it's

[18:55 - 19:00]
full of instruction instructions I'm

[18:57 - 19:02]
you're a just zoom in a little bit to

[19:00 - 19:05]
control I don't remember control on my

[19:02 - 19:07]
laptop sorry uh I can barely read it so

[19:05 - 19:08]
I'm figuring I I know you all have 2020

[19:07 - 19:12]
Vision but I figured it'd be nice to

[19:08 - 19:14]
have it a little bigger right thank you

[19:12 - 19:16]
so you these are all the instructions

[19:14 - 19:18]
you are a wealth management adviser

[19:16 - 19:20]
really it's all about how you do these

[19:18 - 19:22]
instructions you are a wealth management

[19:20 - 19:25]
advisor that's what we're telling think

[19:22 - 19:27]
of you as that here is the account

[19:25 - 19:30]
information here are the

[19:27 - 19:31]
instructions where follow this precisely

[19:30 - 19:33]
don't add any more information

[19:31 - 19:35]
hallucination we talked about that do

[19:33 - 19:37]
not do this and here is all the

[19:35 - 19:40]
information here is a flow for financial

[19:37 - 19:42]
account here is this and all of this is

[19:40 - 19:44]
when we go here this is the resource

[19:42 - 19:46]
Baker where we can add all the flows

[19:44 - 19:49]
that we built for these template types

[19:46 - 19:51]
field generation or the account in this

[19:49 - 19:54]
case if I had anything Apex that would

[19:51 - 19:57]
also show up here so let's take a look

[19:54 - 19:58]
at this this

[19:57 - 20:03]
flow

[19:58 - 20:06]
which just uh I clicked back I should

[20:03 - 20:08]
have used my laptop for that the uh

[20:06 - 20:11]
different

[20:08 - 20:13]
shortcuts okay so uh this is the flow

[20:11 - 20:16]
and really I will repeat again the

[20:13 - 20:18]
moment we say flow everything you can do

[20:16 - 20:20]
with flow is possible we built it for

[20:18 - 20:23]
this template capability field

[20:20 - 20:25]
generation and we got to the cases what

[20:23 - 20:28]
that really means is anything you can

[20:25 - 20:30]
flow I know I'm repeating it but really

[20:28 - 20:33]
I talk to many customers and when they

[20:30 - 20:35]
really understand that flow means

[20:33 - 20:37]
everything that flow can do you can pull

[20:35 - 20:39]
it from data Cloud external sources you

[20:37 - 20:41]
can pull CRM data you can do

[20:39 - 20:44]
calculations you can do all of the

[20:41 - 20:45]
everything is possible so when I do that

[20:44 - 20:49]
there is this special thing it's a

[20:45 - 20:51]
prompt template I simply all I do is I

[20:49 - 20:53]
add all of this data here and when I

[20:51 - 20:58]
call that flow in my prompt template it

[20:53 - 21:01]
shows up so the art is in creating the

[20:58 - 21:03]
promt template how do you do it how do

[21:01 - 21:06]
you do the instructions and as you are

[21:03 - 21:08]
building them uh before you even use

[21:06 - 21:11]
them this is where uh we were talking

[21:08 - 21:13]
about this is where you can use it

[21:11 - 21:15]
rather than activating it before you can

[21:13 - 21:17]
preview it you can see how it does

[21:15 - 21:19]
rather than saying do it again and again

[21:17 - 21:22]
and again sometimes you'll find that you

[21:19 - 21:24]
may reduce data because it works better

[21:22 - 21:26]
that way or sometimes add more data so

[21:24 - 21:29]
that is what you have to figure out and

[21:26 - 21:30]
this here are all the models that we

[21:29 - 21:33]
were talking about these are out of the

[21:30 - 21:34]
box model this morning I was standing at

[21:33 - 21:37]
demo booth and a customer comes up

[21:34 - 21:39]
saying I really want to use it but I

[21:37 - 21:40]
don't know how to connect open AI I

[21:39 - 21:44]
don't know how to do my own model and

[21:40 - 21:46]
said oh we have out of the box models

[21:44 - 21:47]
and that's when the realization came in

[21:46 - 21:49]
oh so I don't have to do anything just

[21:47 - 21:52]
create a prompt template and I can just

[21:49 - 21:53]
use the models and don't do anything yes

[21:52 - 21:55]
that's what out of the box means you

[21:53 - 22:00]
don't have to do anything just start

[21:55 - 22:02]
using it today it's out of the

[22:00 - 22:04]
box so this is what this is when you

[22:02 - 22:06]
think about your use cases think about

[22:04 - 22:10]
the data think about instructions GPD

[22:06 - 22:12]
3.5 try it GPD 4 try it whichever works

[22:10 - 22:15]
better do it over and over and over then

[22:12 - 22:18]
think about using from Apex from flow in

[22:15 - 22:21]
lwcs in screen flows everywhere you can

[22:18 - 22:23]
use them you can automate them as long

[22:21 - 22:25]
as you have a process to review them

[22:23 - 22:28]
before you send it to your customers if

[22:25 - 22:30]
it's internal it's still okay but if you

[22:28 - 22:33]
are generating product description that

[22:30 - 22:36]
goes on a site out there you you better

[22:33 - 22:39]
be careful you should have a review

[22:36 - 22:42]
process that is prompt Builder easy to

[22:39 - 22:45]
use and you can just with few clicks get

[22:42 - 22:48]
all the data in there and start using

[22:45 - 22:48]
it all

[22:50 - 22:54]
right that's pretty good he I don't know

[22:52 - 22:55]
if the applause was because he used my

[22:54 - 22:57]
laptop and managed to make it through

[22:55 - 22:59]
his demo or because the demo was awesome

[22:57 - 23:02]
so we'll assume for for both I'll take

[22:59 - 23:03]
the second one second one fantastic it

[23:02 - 23:06]
was a really good demo thank you for

[23:03 - 23:09]
that jazz Wonder so come on come on come

[23:06 - 23:10]
on up we're going to uh introduce one of

[23:09 - 23:12]
our customers that got to be in our

[23:10 - 23:14]
pilot and actually got to put their

[23:12 - 23:16]
hands on promp Builder and actually is

[23:14 - 23:19]
going to share with you some of the

[23:16 - 23:20]
experiences that she's had Marissa you

[23:19 - 23:22]
want to tell us a little bit about

[23:20 - 23:25]
yourself yes so I am the Vice President

[23:22 - 23:27]
of Sales operations for carnegi learning

[23:25 - 23:30]
we are a leading provider of K12

[23:27 - 23:33]
education technology curriculum and

[23:30 - 23:35]
services uh learning Solutions and we

[23:33 - 23:37]
were founded actually 26 years ago out

[23:35 - 23:39]
of Carnegie melan University with a

[23:37 - 23:42]
product that's built on AI That's now

[23:39 - 23:44]
called matthia so we have been in the AI

[23:42 - 23:46]
game for a very long time and continue

[23:44 - 23:50]
to build products built on

[23:46 - 23:53]
AI um we are a company size about

[23:50 - 23:54]
660 which is crazy to me because I

[23:53 - 23:58]
started 12 years ago and I think I was

[23:54 - 24:01]
Employee 80 uh so we have grown

[23:58 - 24:04]
a ton since I started um now our sales

[24:01 - 24:06]
team is actually bigger than our inti uh

[24:04 - 24:09]
than the company was whenever I first

[24:06 - 24:10]
started and I first started in sales um

[24:09 - 24:14]
I

[24:10 - 24:15]
started uh using Salesforce in 2016

[24:14 - 24:18]
that's whenever we decided to implement

[24:15 - 24:20]
Salesforce and I was really excited

[24:18 - 24:23]
about a new tool that I could use as a

[24:20 - 24:24]
sales rep and I volunteered myself to

[24:23 - 24:26]
actually start helping with the

[24:24 - 24:28]
implementation so as a kind of a

[24:26 - 24:29]
part-time job for two years I helped

[24:28 - 24:32]
with the implementation from a sales

[24:29 - 24:35]
side and then the opportunity came up in

[24:32 - 24:37]
2018 to move on to um into sales

[24:35 - 24:40]
operations and I didn't hesitate and was

[24:37 - 24:42]
very excited so Salesforce kind of paved

[24:40 - 24:46]
my path into sales operations that's

[24:42 - 24:48]
awesome that's awesome so just like

[24:46 - 24:50]
every one of you had a story as to how

[24:48 - 24:53]
you got into Salesforce that's Marissa's

[24:50 - 24:55]
story so um talk so you said you've been

[24:53 - 24:58]
using AI for a long time but this was

[24:55 - 24:59]
your first toe dip into generative a

[24:58 - 25:02]
talk to us a little bit about like what

[24:59 - 25:03]
was your goals um using generative AI

[25:02 - 25:06]
when you started using prompt Builder so

[25:03 - 25:10]
I should say the company uses AI for a

[25:06 - 25:13]
really long time I am more new to AI um

[25:10 - 25:16]
but my biggest goal was really how to

[25:13 - 25:18]
can I incorporate AI into sales

[25:16 - 25:20]
processes so sales operations our entire

[25:18 - 25:22]
goal is to make the sales process and

[25:20 - 25:24]
sales reps more efficient um relieve

[25:22 - 25:27]
administrative burden so AI is going to

[25:24 - 25:28]
do all of that and make everybody more

[25:27 - 25:31]
efficient

[25:28 - 25:33]
so that was my goal um my secondary goal

[25:31 - 25:35]
was to learn how to build a prompt I've

[25:33 - 25:38]
never done that before so it really was

[25:35 - 25:40]
exciting to get into the pilot and

[25:38 - 25:44]
really start building prompts for the

[25:40 - 25:46]
first time um with that I mean the the

[25:44 - 25:48]
pieces that I really learned about

[25:46 - 25:50]
building a prompt was your first one's

[25:48 - 25:52]
not going to be great um you're going to

[25:50 - 25:54]
have to keep iterating because you're

[25:52 - 25:55]
going to learn like that slide that you

[25:54 - 25:57]
took a picture of you need a lot of

[25:55 - 26:00]
different pieces within your prompt to

[25:57 - 26:02]
really get what you want um but that was

[26:00 - 26:04]
kind of the best part of it was really

[26:02 - 26:06]
understanding how a prompt Works how do

[26:04 - 26:08]
you generate a prompt what can you do

[26:06 - 26:11]
and how can you then incorporate fields

[26:08 - 26:13]
and emails into that sales process

[26:11 - 26:17]
perfect have you seen an increased

[26:13 - 26:19]
amount of pressure or um guidance in

[26:17 - 26:21]
your industry and peers to try and get

[26:19 - 26:23]
generative AI filled put put into your

[26:21 - 26:25]
processes yes so in our industry

[26:23 - 26:27]
education I mean probably everybody's

[26:25 - 26:30]
industry at this point um AI is very

[26:27 - 26:32]
popular and where education is trying to

[26:30 - 26:34]
really improve teaching and learning so

[26:32 - 26:39]
for students and teachers really using

[26:34 - 26:40]
AI to help them learn any material so we

[26:39 - 26:43]
are using it at carneg learning again

[26:40 - 26:46]
for all a lot a lot of our products but

[26:43 - 26:48]
we also have a a team that we started

[26:46 - 26:51]
called CL next so Carnegie Learning CL

[26:48 - 26:53]
next um it's all about Innovation and

[26:51 - 26:55]
they have a project Drive which is

[26:53 - 26:57]
really exciting they've asked every

[26:55 - 27:00]
single Department to have somebody

[26:57 - 27:03]
volunteer and bring AI into their

[27:00 - 27:05]
department so it's really exciting and

[27:03 - 27:06]
I'm super excited this came out at the

[27:05 - 27:08]
same time because that's how I'm

[27:06 - 27:11]
bringing it into our sales team awesome

[27:08 - 27:14]
you get to be the hero fantastic so talk

[27:11 - 27:15]
about uh the pilot right so what was the

[27:14 - 27:17]
use case you tried to build with the

[27:15 - 27:19]
pilots yeah so I mean I as I said I

[27:17 - 27:21]
started as a sales rep so really trying

[27:19 - 27:23]
to use the sales emails first really

[27:21 - 27:25]
understanding how they work how they can

[27:23 - 27:27]
develop an email that a person would

[27:25 - 27:29]
actually create and send to their reps

[27:27 - 27:31]
so I just started playing around with

[27:29 - 27:34]
different tones with using different um

[27:31 - 27:35]
data and built some emails and started

[27:34 - 27:37]
realizing very quickly they were better

[27:35 - 27:39]
than the emails I used to send and are

[27:37 - 27:41]
still better than some of the emails

[27:39 - 27:44]
that some people still are sending so

[27:41 - 27:46]
have realized very quickly that it is

[27:44 - 27:48]
really powerful and it's going to save a

[27:46 - 27:50]
ton of time so I actually started

[27:48 - 27:52]
reaching out to some of our AES and to

[27:50 - 27:54]
ask them like well what would you want

[27:52 - 27:55]
to see if it could create an email or a

[27:54 - 27:57]
field summary and they started giving me

[27:55 - 28:00]
feedback and things to put in and they

[27:57 - 28:01]
are so excited with whatever came back

[28:00 - 28:03]
we went back and forth a little bit to

[28:01 - 28:05]
edit the content and they actually

[28:03 - 28:07]
started using some out of that pilot to

[28:05 - 28:09]
send to their customers so it's really

[28:07 - 28:10]
exciting that's awesome and you when we

[28:09 - 28:12]
were talking in the broadcast earlier

[28:10 - 28:13]
today you shared a really interesting

[28:12 - 28:16]
thing that I didn't even think about

[28:13 - 28:18]
which is you saw more consistency you're

[28:16 - 28:20]
expecting to see more consistency now

[28:18 - 28:22]
from different reps because there's an

[28:20 - 28:24]
actual core voice that's actually being

[28:22 - 28:25]
able to be introduced in their emails

[28:24 - 28:27]
something I didn't even think about it

[28:25 - 28:30]
which is pretty amazing um what are some

[28:27 - 28:31]
of the lessons learned that uh all of

[28:30 - 28:33]
these folks are going to go have to go

[28:31 - 28:37]
learn the hard way can you can you save

[28:33 - 28:38]
them some pain uh well first is practice

[28:37 - 28:41]
I mean definitely get out there and

[28:38 - 28:43]
start using Ai and figuring out ways to

[28:41 - 28:46]
incorporate it into whatever you're

[28:43 - 28:48]
doing uh so that's number one is just to

[28:46 - 28:50]
really practice use tools like this

[28:48 - 28:52]
picture that you took and use tools like

[28:50 - 28:55]
social media there's so much on there

[28:52 - 28:57]
that can help you understand how to

[28:55 - 28:59]
better build a prompt and really get

[28:57 - 29:03]
spefic specific and then also use flows

[28:59 - 29:04]
flows are like this makes this tool so

[29:03 - 29:06]
phenomenal because you can actually

[29:04 - 29:08]
build whatever you need to build so if

[29:06 - 29:11]
you have personas for instance on your

[29:08 - 29:13]
contacts or your leads you can really go

[29:11 - 29:15]
through and have a different prompt by

[29:13 - 29:18]
Persona so you can really get specific

[29:15 - 29:20]
and get really custom data and custom

[29:18 - 29:23]
emails and Fields specific to whatever

[29:20 - 29:25]
you need that's fantastic and and pro

[29:23 - 29:26]
tip if you're going to build a product

[29:25 - 29:28]
absolutely lean into 20-year-old

[29:26 - 29:30]
technology like FL it's incredibly

[29:28 - 29:32]
powerful it you can get to everything so

[29:30 - 29:35]
talking about getting to everything what

[29:32 - 29:38]
did you use for grounding oh so all of

[29:35 - 29:40]
our CRM data so we were trying to use

[29:38 - 29:43]
like of course the custom or the easy

[29:40 - 29:45]
title name email account all of those

[29:43 - 29:48]
for both the user and or the sender and

[29:45 - 29:50]
the receiver but I also brought in our

[29:48 - 29:52]
company website so brought in all of

[29:50 - 29:54]
that language of marketing worked so

[29:52 - 29:56]
hard on that went into all of our emails

[29:54 - 29:58]
if I was building an email for an event

[29:56 - 30:00]
brought in that um but then I started

[29:58 - 30:02]
thinking even though we don't have some

[30:00 - 30:04]
of the fields available really starting

[30:02 - 30:06]
to custom build Fields so that I can

[30:04 - 30:08]
bring it into a prompt Builder into into

[30:06 - 30:11]
flow so that it can then really be

[30:08 - 30:13]
powerful and remember you can use data

[30:11 - 30:14]
Cloud right data Cloud can ingest data

[30:13 - 30:17]
you can actually make it available in

[30:14 - 30:19]
various different ways as well so uh do

[30:17 - 30:21]
you actually see this impacting your

[30:19 - 30:23]
organization and your sales team and the

[30:21 - 30:24]
business value in general like what do

[30:23 - 30:25]
you what do you see as the business

[30:24 - 30:27]
value for your company uh absolutely I

[30:25 - 30:29]
mean I already immediately have already

[30:27 - 30:31]
seen some Roi so our rep's already used

[30:29 - 30:33]
some of the emails so we already have

[30:31 - 30:36]
some of that um but really I'm seeing it

[30:33 - 30:38]
impact just efficiencies impacting how

[30:36 - 30:41]
much productivity the sales team can

[30:38 - 30:43]
have and impacting the way that we're

[30:41 - 30:46]
doing business so really understanding

[30:43 - 30:49]
and being specific um with with how

[30:46 - 30:51]
we're using Ai and bringing it into an

[30:49 - 30:54]
entire flow we started really developing

[30:51 - 30:57]
a flow screen actually that will take in

[30:54 - 30:59]
a lot of this information it will help

[30:57 - 31:01]
um um on board reps faster so that field

[30:59 - 31:03]
summaries you can actually learn your

[31:01 - 31:04]
territory much quicker than you ever

[31:03 - 31:07]
could before you could learn what

[31:04 - 31:10]
opportunities you need to go after um I

[31:07 - 31:12]
mean the information that we're getting

[31:10 - 31:15]
is really going to provide that Roi to

[31:12 - 31:18]
prove how important that this is that's

[31:15 - 31:20]
awesome so very nice to call out to Roi

[31:18 - 31:23]
how are you going to track your

[31:20 - 31:25]
success great question um how am I going

[31:23 - 31:28]
to track it so the first is of course

[31:25 - 31:29]
figuring out how long these things take

[31:28 - 31:32]
right now so we actually have some

[31:29 - 31:34]
surveys out to our reps we do a survey

[31:32 - 31:36]
probably once a year just to kind of

[31:34 - 31:38]
figure out and understand what is taking

[31:36 - 31:40]
too long what they need help with but

[31:38 - 31:42]
this year we're really getting specific

[31:40 - 31:44]
with how much time do these tasks take

[31:42 - 31:47]
so that when we implement this we can

[31:44 - 31:51]
really see okay well we've been able to

[31:47 - 31:52]
generate 10 of these in today how much

[31:51 - 31:55]
does that mean so what is your salary

[31:52 - 31:57]
take that out take and you can kind of

[31:55 - 32:00]
extrapolate that into an entire Roi for

[31:57 - 32:02]
the entire sales team based on how much

[32:00 - 32:04]
time you're saving um how much onboard

[32:02 - 32:06]
time that or how how much you're

[32:04 - 32:09]
decreasing the onboard time for new

[32:06 - 32:12]
sales reps so there's a lot that we are

[32:09 - 32:14]
currently doing but my favorite success

[32:12 - 32:16]
is actually whenever uh reps come to me

[32:14 - 32:18]
and are happy about something so I

[32:16 - 32:20]
usually only hear from people whenever

[32:18 - 32:21]
things are broken or they have issues so

[32:20 - 32:24]
whenever I hear from reps and they're

[32:21 - 32:26]
excited and happy which they have been

[32:24 - 32:27]
during this pilot it's really exciting

[32:26 - 32:30]
you did share that some of your reps

[32:27 - 32:31]
were like can I have it right now

[32:30 - 32:33]
absolutely they are very excited to get

[32:31 - 32:35]
their hands on it that's awesome we'll

[32:33 - 32:38]
get you all straightened out so thank

[32:35 - 32:39]
you for coming to the session um we

[32:38 - 32:41]
really really really want you to give us

[32:39 - 32:42]
our Fe some feedback and we're going to

[32:41 - 32:44]
be able we have some time for questions

[32:42 - 32:45]
so see if you have questions feel free

[32:44 - 32:47]
to come to the microphone and we're

[32:45 - 32:50]
going to answer those but um I promise I

[32:47 - 32:53]
look at every single response that comes

[32:50 - 32:54]
in so if you like the session absolutely

[32:53 - 32:57]
let us know if you didn't like the

[32:54 - 32:59]
session let us know if you we could do

[32:57 - 33:01]
something better let us know as well I

[32:59 - 33:03]
really appreciate that so with that

[33:01 - 33:05]
being said I think that's it there's

[33:03 - 33:07]
lots of uh different things there's

[33:05 - 33:09]
hands on trail this is kind of cool

[33:07 - 33:11]
we're on day one normally all my

[33:09 - 33:13]
sessions are normally on day two so you

[33:11 - 33:16]
can go do an incredible amount of stuff

[33:13 - 33:18]
see demos ask questions um incredible

[33:16 - 33:20]
amount of things out there to work on so

[33:18 - 33:22]
I'm going to put it back on the feedback

[33:20 - 33:25]
um q and QR code so you can give us your

[33:22 - 33:29]
feedback but if you have any questions

[33:25 - 33:29]
we would love to answer any

[33:29 - 33:34]
[Music]

[33:37 - 33:40]
questions

## コメント

コメントは利用できないか、取得できませんでした。

