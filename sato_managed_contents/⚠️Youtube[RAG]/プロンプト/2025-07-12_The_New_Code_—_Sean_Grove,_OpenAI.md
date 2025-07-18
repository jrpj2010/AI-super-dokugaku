# The New Code — Sean Grove, OpenAI

**チャンネル:** AI Engineer
**公開日:** 2025-07-11
**URL:** https://www.youtube.com/watch?v=8rABwKRsec4

## 説明

In an era where AI transforms software development, the most valuable skill isn't writing code - it's communicating intent with precision. This talk reveals how specifications, not prompts or code, are becoming the fundamental unit of programming, and why spec-writing is the new superpower.

Drawing from production experience, we demonstrate how rigorous, versioned specifications serve as the source of truth that compiles to documentation, evaluations, model behaviors, and maybe even code.

Just as the US Constitution acts as a versioned spec with judicial review as its grader, AI systems need executable specifications that align both human teams and machine intelligence. We'll look at OpenAI's Model Spec as a real-world example.

Finally, we'll end on some open questions about what the future of developer tooling looks like in a world where communication once again becomes the most important artifact in engineering.

About Sean Grove
Sean Grove works on alignment reasoning at OpenAI, helping translate high‑level intent into enforceable specs and evaluations. Before OpenAI he founded OneGraph, a GraphQL developer‑tools startup later acquired by Netlify. He has delivered dozens of technical talks worldwide on developer tooling, APIs, AI UX and design, and now alignment.

Recorded at the AI Engineer World's Fair in San Francisco. Stay up to date on our upcoming events and content by joining our newsletter here: https://www.ai.engineer/newsletter

## 字幕

[00:00 - 00:07]
[Music]

[00:15 - 00:21]
[Music]

[00:24 - 00:28]
Hello everyone. Thank you very much for

[00:26 - 00:33]
having me. Uh it's a very exciting uh

[00:28 - 00:35]
place to be. very exciting time to be uh

[00:33 - 00:37]
second uh I mean this has been like a

[00:35 - 00:39]
pretty intense couple of days I don't

[00:37 - 00:42]
know if you feel the same way uh but

[00:39 - 00:44]
also very energizing so I want to take a

[00:42 - 00:45]
little bit of your time today uh to talk

[00:44 - 00:48]
about what I see is the coming of the

[00:45 - 00:50]
new code uh in particular specifications

[00:48 - 00:52]
which sort of hold this promise uh that

[00:50 - 00:55]
it has been the dream of the industry

[00:52 - 00:58]
where you can write your your code your

[00:55 - 01:00]
intentions once and run them everywhere

[00:58 - 01:03]
uh Quick intro. My name is Sean. I work

[01:00 - 01:05]
at uh OpenAI uh specifically in

[01:03 - 01:07]
alignment research. And today I want to

[01:05 - 01:08]
talk about sort of the value of code

[01:07 - 01:10]
versus communication and why

[01:08 - 01:15]
specifications might be a little bit of

[01:10 - 01:15]
a better approach in general.

[01:15 - 01:20]
Uh I'm going to go over the anatomy of a

[01:18 - 01:23]
specification and we'll use the uh model

[01:20 - 01:26]
spec as the example. uh and we'll talk

[01:23 - 01:28]
about communicating intent to other

[01:26 - 01:31]
humans and we'll go over the 40 syphency

[01:28 - 01:33]
issue uh as a case study.

[01:31 - 01:36]
Uh we'll talk about how to make the

[01:33 - 01:39]
specification executable, how to

[01:36 - 01:42]
communicate intent to the models uh and

[01:39 - 01:43]
how to think about specifications as

[01:42 - 01:45]
code even if they're a little bit

[01:43 - 01:48]
different. Um and we'll end on a couple

[01:45 - 01:50]
of open questions. So let's talk about

[01:48 - 01:54]
code versus communication

[01:50 - 01:57]
real quick. Raise your hand if you write

[01:54 - 02:00]
code and vibe code counts.

[01:57 - 02:03]
Cool. Keep them up if your job is to

[02:00 - 02:05]
write code.

[02:03 - 02:07]
Okay. Now, for those people, keep their

[02:05 - 02:10]
head up if you feel that the most

[02:07 - 02:13]
valuable professional artifact that you

[02:10 - 02:15]
produce is code.

[02:13 - 02:18]
Okay. There's quite a few people and I

[02:15 - 02:20]
think this is quite natural. We all work

[02:18 - 02:22]
very very hard to solve problems. We

[02:20 - 02:24]
talk with people. We gather

[02:22 - 02:25]
requirements. We think through

[02:24 - 02:28]
implementation details. We integrate

[02:25 - 02:31]
with lots of different sources. And the

[02:28 - 02:33]
ultimate thing that we produce is code.

[02:31 - 02:35]
Code is the artifact that we can point

[02:33 - 02:38]
to, we can measure, we can debate, and

[02:35 - 02:42]
we can discuss. Uh it feels tangible and

[02:38 - 02:45]
real, but it's sort of underelling the

[02:42 - 02:47]
job that each of you does. Code is sort

[02:45 - 02:51]
of 10 to 20% of the value that you

[02:47 - 02:53]
bring. The other 80 to 90% is in

[02:51 - 02:55]
structured communication. And this is

[02:53 - 02:56]
going to be different for everyone, but

[02:55 - 03:00]
a process typically looks something like

[02:56 - 03:02]
you talk to users in order to understand

[03:00 - 03:05]
their challenges. You distill these

[03:02 - 03:07]
stories down and then ideulate about how

[03:05 - 03:09]
to solve these problems. What what is

[03:07 - 03:13]
the goal that you want to achieve? You

[03:09 - 03:16]
plan ways to achieve those goals. You

[03:13 - 03:19]
share those plans with your colleagues.

[03:16 - 03:20]
uh you translate those plans into code.

[03:19 - 03:24]
So this is a very important step

[03:20 - 03:27]
obviously and then you test and verify

[03:24 - 03:28]
not the code itself right no one cares

[03:27 - 03:32]
actually about the code itself. What you

[03:28 - 03:34]
care is when the code ran did it achieve

[03:32 - 03:37]
the goals did it alleviate the

[03:34 - 03:40]
challenges of your user. You look at the

[03:37 - 03:44]
the effects that your code had on the

[03:40 - 03:47]
world. So talking, understanding

[03:44 - 03:47]
distilling ideulating

[03:48 - 03:53]
planning sharing translating testing

[03:51 - 03:57]
verifying, these all sound like

[03:53 - 03:59]
structured communication to me. And

[03:57 - 04:00]
structured communication is the

[03:59 - 04:03]
bottleneck.

[04:00 - 04:05]
knowing what to build, talking to people

[04:03 - 04:08]
and gathering requirements, knowing how

[04:05 - 04:10]
to build it, knowing why to build it

[04:08 - 04:11]
and at the end of the day, knowing if it

[04:10 - 04:13]
has been built correctly and has

[04:11 - 04:15]
actually achieved the intentions that

[04:13 - 04:18]
you set out with.

[04:15 - 04:21]
And the more advanced AI models get, the

[04:18 - 04:24]
more we are all going to starkly feel

[04:21 - 04:26]
this bottleneck.

[04:24 - 04:29]
Because in the near future, the person

[04:26 - 04:33]
who communicates most effectively is the

[04:29 - 04:35]
most valuable programmer. And literally

[04:33 - 04:37]
if you can communicate effectively, you

[04:35 - 04:39]
can program.

[04:37 - 04:42]
So, let's take uh vibe coding as an

[04:39 - 04:44]
illustrative example. Vibe coding tends

[04:42 - 04:47]
to feel quite good. And it's worth

[04:44 - 04:50]
asking why is that? Well, vibe coding is

[04:47 - 04:52]
fundamentally about communication first.

[04:50 - 04:54]
And the code is actually a secondary

[04:52 - 04:55]
downstream artifact of that

[04:54 - 04:57]
communication.

[04:55 - 04:59]
We get to describe our intentions and

[04:57 - 05:01]
our the outcomes that we want to see and

[04:59 - 05:04]
we let the model actually handle the

[05:01 - 05:06]
grunt work for us. And even so, there is

[05:04 - 05:10]
something strange about the way that we

[05:06 - 05:12]
do vibe coding. We communicate via

[05:10 - 05:14]
prompts to the model

[05:12 - 05:17]
and we tell them our intentions and our

[05:14 - 05:20]
values and we get a code artifact out at

[05:17 - 05:24]
the end and then we sort of throw our

[05:20 - 05:27]
prompts away they're ephemeral

[05:24 - 05:29]
and if you've written TypeScript or Rust

[05:27 - 05:32]
once you put your your code through a

[05:29 - 05:35]
compiler or it gets down into a binary

[05:32 - 05:38]
no one is happy with that binary. That

[05:35 - 05:40]
wasn't the purpose. It's useful. In

[05:38 - 05:42]
fact, we always regenerate the binaries

[05:40 - 05:44]
from scratch every time we compile or we

[05:42 - 05:47]
run our code through V8 or whatever it

[05:44 - 05:50]
might be from the source spec. It's the

[05:47 - 05:52]
source specification that's the valuable

[05:50 - 05:53]
artifact.

[05:52 - 05:55]
And yet when we prompt elements, we sort

[05:53 - 05:58]
of do the opposite. We keep the

[05:55 - 05:59]
generated code and we delete the prompt.

[05:58 - 06:01]
And this feels like a little bit like

[05:59 - 06:05]
you shred the source and then you very

[06:01 - 06:07]
carefully version control the binary.

[06:05 - 06:09]
And that's why it's so important to

[06:07 - 06:12]
actually capture the intent and the

[06:09 - 06:14]
values in a specification.

[06:12 - 06:17]
A written specification is what enables

[06:14 - 06:20]
you to align humans on the shared set of

[06:17 - 06:22]
goals and to know if you are aligned if

[06:20 - 06:24]
you actually synchronize on what needs

[06:22 - 06:26]
to be done. This is the artifact that

[06:24 - 06:29]
you discuss that you debate that you

[06:26 - 06:30]
refer to and that you synchronize on.

[06:29 - 06:32]
And this is really important. And so I

[06:30 - 06:35]
want to nail this this home that a

[06:32 - 06:37]
written specification effectively aligns

[06:35 - 06:40]
humans

[06:37 - 06:42]
and it is the artifact that you use to

[06:40 - 06:45]
communicate and to discuss and debate

[06:42 - 06:47]
and refer to and synchronize on. If you

[06:45 - 06:50]
don't have a specification, you just

[06:47 - 06:52]
have a vague idea.

[06:50 - 06:56]
Now let's talk about why specifications

[06:52 - 06:58]
are more powerful in general than code.

[06:56 - 07:01]
Because code itself is actually a lossy

[06:58 - 07:03]
projection from the specification.

[07:01 - 07:06]
In the same way that if you were to take

[07:03 - 07:09]
a compiled C binary and decompile it

[07:06 - 07:11]
you wouldn't get nice comments and uh

[07:09 - 07:13]
well-n named variables. You would have

[07:11 - 07:15]
to work backwards. You'd have to infer

[07:13 - 07:17]
what was this person trying to do? Why

[07:15 - 07:18]
is this code written this way? It isn't

[07:17 - 07:21]
actually contained in there. It was a

[07:18 - 07:24]
lossy translation. And in the same way

[07:21 - 07:27]
code itself, even nice code, typically

[07:24 - 07:30]
doesn't embody all of the intentions and

[07:27 - 07:32]
the values in itself. You have to infer

[07:30 - 07:35]
what is the ultimate goal that this team

[07:32 - 07:37]
is trying to achieve. Uh when you read

[07:35 - 07:39]
through code

[07:37 - 07:41]
so communication, the work that we

[07:39 - 07:43]
establish, we already do when embodied

[07:41 - 07:46]
inside of a written specification is

[07:43 - 07:48]
better than code. It actually encodes

[07:46 - 07:51]
all of the the necessary requirements in

[07:48 - 07:53]
order to generate the code. And in the

[07:51 - 07:56]
same way that having a source code that

[07:53 - 07:58]
you pass to a compiler allows you to

[07:56 - 08:01]
target multiple different uh

[07:58 - 08:04]
architectures, you can compile for ARM

[08:01 - 08:06]
64, x86 or web assembly. The source

[08:04 - 08:09]
document actually contains enough

[08:06 - 08:11]
information to describe how to translate

[08:09 - 08:15]
it to your target architecture.

[08:11 - 08:18]
In the same way, a a sufficiently robust

[08:15 - 08:21]
specification given to models will

[08:18 - 08:24]
produce good TypeScript, good Rust

[08:21 - 08:26]
servers clients documentation

[08:24 - 08:27]
tutorials, blog posts, and even

[08:26 - 08:30]
podcasts.

[08:27 - 08:32]
Uh, show of hands, who works at a

[08:30 - 08:34]
company that has developers as

[08:32 - 08:36]
customers?

[08:34 - 08:38]
Okay. So, a a quick like thought

[08:36 - 08:40]
exercise is if you were to take your

[08:38 - 08:43]
entire codebase, all of the the

[08:40 - 08:45]
documentation, oh, so all of the code

[08:43 - 08:47]
that runs your business, and you were to

[08:45 - 08:49]
put that into a podcast generator, could

[08:47 - 08:50]
you generate something that would be

[08:49 - 08:53]
sufficiently interesting and compelling

[08:50 - 08:55]
that would tell the users how to

[08:53 - 08:57]
succeed, how to achieve their goals, or

[08:55 - 09:01]
is all of that information somewhere

[08:57 - 09:03]
else? It's not actually in your code.

[09:01 - 09:06]
And so moving forward, the new scarce

[09:03 - 09:10]
skill is writing specifications that

[09:06 - 09:12]
fully capture the intent and values. And

[09:10 - 09:15]
whoever masters that again becomes the

[09:12 - 09:16]
most valuable programmer

[09:15 - 09:19]
and there's a reasonable chance that

[09:16 - 09:21]
this is going to be the coders of today.

[09:19 - 09:24]
This is already very similar to what we

[09:21 - 09:26]
do. However, product managers also write

[09:24 - 09:28]
specifications. Lawmakers write legal

[09:26 - 09:31]
specifications.

[09:28 - 09:32]
This is actually a universal principle.

[09:31 - 09:35]
So with that in mind, let's look at what

[09:32 - 09:37]
a specification actually looks like. And

[09:35 - 09:40]
I'm going to use the OpenAI model spec

[09:37 - 09:42]
as an example here. So last year, OpenAI

[09:40 - 09:46]
released the model spec. And this is a

[09:42 - 09:47]
living document that tries to clearly

[09:46 - 09:50]
and unambiguously

[09:47 - 09:52]
express the intentions and values that

[09:50 - 09:56]
OpenAI hopes to imbue its models with

[09:52 - 09:56]
that it ships to the world.

[09:57 - 10:02]
and it was updated in in uh February and

[10:00 - 10:03]
open sourced. So you can actually go to

[10:02 - 10:07]
GitHub and you can see the

[10:03 - 10:08]
implementation of uh the model spec and

[10:07 - 10:11]
surprise surprise it's actually just a

[10:08 - 10:15]
collection of markdown files just looks

[10:11 - 10:17]
like this. Now markdown is remarkable.

[10:15 - 10:20]
It is human readable. It's versioned.

[10:17 - 10:23]
It's change logged and because it is

[10:20 - 10:25]
natural language everyone in not just

[10:23 - 10:27]
technical people can contribute

[10:25 - 10:32]
including product legal safety research

[10:27 - 10:35]
policy they can all read discuss debate

[10:32 - 10:37]
and contribute to the same source code.

[10:35 - 10:40]
This is the universal artifact that

[10:37 - 10:42]
aligns all of the humans as to our

[10:40 - 10:44]
intentions and values inside of the

[10:42 - 10:47]
company.

[10:44 - 10:49]
Now, as much as we might try to use

[10:47 - 10:51]
unambiguous language, there are times

[10:49 - 10:55]
where it's very difficult to express the

[10:51 - 10:57]
nuance. So, every clause in the model

[10:55 - 11:01]
spec has an ID here. So, you can see

[10:57 - 11:03]
sy73 here. And using that ID, you can

[11:01 - 11:05]
find another file in the repository

[11:03 - 11:08]
sy73.mmarkdown

[11:05 - 11:10]
or md uh that contains one or more

[11:08 - 11:13]
challenging prompts

[11:10 - 11:18]
for this exact clause. So the document

[11:13 - 11:21]
itself actually encodes success criteria

[11:18 - 11:22]
that the the model under test has to be

[11:21 - 11:27]
able to answer this in a way that

[11:22 - 11:31]
actually adheres to that clause.

[11:27 - 11:34]
So let's talk about uh syphy. Uh

[11:31 - 11:36]
recently there was a update to 40. I

[11:34 - 11:41]
don't, know if, you've, heard, of, this., Uh

[11:36 - 11:44]
there uh caused extreme syphy. uh and we

[11:41 - 11:48]
can ask like what value is the model

[11:44 - 11:50]
spec in this scenario and the model spec

[11:48 - 11:53]
serves to align humans around a set of

[11:50 - 11:55]
values and intentions.

[11:53 - 11:58]
Here's an example of syphy where the

[11:55 - 12:01]
user calls out the behavior of being uh

[11:58 - 12:04]
syphants uh or sophantic at the expense

[12:01 - 12:06]
of impartial truth and the model very

[12:04 - 12:09]
kindly uh praises the user for their

[12:06 - 12:09]
insight.

[12:09 - 12:13]
There have been other esteemed

[12:10 - 12:15]
researchers uh who have found similarly

[12:13 - 12:19]
uh

[12:15 - 12:25]
similarly uh concerning examples

[12:19 - 12:28]
and this hurts. Uh shipping sycopency in

[12:25 - 12:31]
this manner erodess trust.

[12:28 - 12:33]
It hurts.

[12:31 - 12:36]
So and it also raises a lot of questions

[12:33 - 12:38]
like was this intentional? you could see

[12:36 - 12:40]
some way where you might interpret it

[12:38 - 12:42]
that way. Was it accidental and why

[12:40 - 12:44]
wasn't it caught?

[12:42 - 12:48]
Luckily, the model spec actually

[12:44 - 12:50]
includes a section dedicated to this

[12:48 - 12:53]
since its release that says don't be

[12:50 - 12:55]
sick of fantic and it explains that

[12:53 - 12:57]
while syopency might feel good in the

[12:55 - 13:00]
short term, it's bad for everyone in the

[12:57 - 13:01]
long term. So, we actually expressed our

[13:00 - 13:06]
intentions and our values and were able

[13:01 - 13:06]
to communicate it to others through this

[13:07 - 13:13]
So people could reference it and if we

[13:11 - 13:16]
have it in the model spec specification

[13:13 - 13:18]
if the model specification is our agreed

[13:16 - 13:20]
upon set of intentions and values and

[13:18 - 13:23]
the behavior doesn't align with that

[13:20 - 13:26]
then this must be a bug.

[13:23 - 13:28]
So we rolled back we published some

[13:26 - 13:31]
studies and some blog post and we fixed

[13:28 - 13:31]
it.

[13:31 - 13:36]
But in the interim, the specs served as

[13:34 - 13:38]
a trust anchor, a way to communicate to

[13:36 - 13:41]
people what is expected and what is not

[13:38 - 13:41]
expected.

[13:43 - 13:49]
So if just if the only thing the model

[13:46 - 13:51]
specification did was to align humans

[13:49 - 13:53]
along those shared sets of intentions

[13:51 - 13:56]
and values, it would already be

[13:53 - 13:59]
incredibly useful.

[13:56 - 14:01]
But ideally we can also align our models

[13:59 - 14:05]
and the artifacts that our models

[14:01 - 14:06]
produce against that same specification.

[14:05 - 14:08]
So there's a technique a paper that we

[14:06 - 14:09]
released uh called deliberative

[14:08 - 14:12]
alignment that sort of talks about this

[14:09 - 14:15]
how to automatically align a model and

[14:12 - 14:17]
the technique is uh such where you take

[14:15 - 14:19]
your specification and a set of very

[14:17 - 14:21]
challenging uh input prompts and you

[14:19 - 14:23]
sample from the model under test or

[14:21 - 14:25]
training.

[14:23 - 14:27]
You then uh take its response, the

[14:25 - 14:28]
original prompt and the policy and you

[14:27 - 14:32]
give that to a greater model and you ask

[14:28 - 14:34]
it to score the response according to

[14:32 - 14:36]
the specification. How aligned is it? So

[14:34 - 14:40]
the document actually becomes both

[14:36 - 14:42]
training material and eval material

[14:40 - 14:45]
and based off of this score we reinforce

[14:42 - 14:47]
those weights and it goes from you know

[14:45 - 14:48]
you could include your specification in

[14:47 - 14:50]
the context and then maybe a system

[14:48 - 14:52]
message or developer message in every

[14:50 - 14:54]
single time you sample and that is

[14:52 - 14:56]
actually quite useful. a prompted uh

[14:54 - 14:57]
model is going to be somewhat aligned

[14:56 - 15:01]
but it does detract from the compute

[14:57 - 15:02]
available to solve the uh problem that

[15:01 - 15:04]
you're trying to solve with the model.

[15:02 - 15:06]
And keep in mind, these specifications

[15:04 - 15:08]
can be anything. They could be code

[15:06 - 15:10]
style or testing requirements or or

[15:08 - 15:13]
safety requirements. All of that can be

[15:10 - 15:14]
embedded into the model. So through this

[15:13 - 15:17]
technique you're actually moving it from

[15:14 - 15:19]
a inference time compute and actually

[15:17 - 15:21]
you're pushing down into the weights of

[15:19 - 15:24]
the model so that the model actually

[15:21 - 15:27]
feels your policy and is able to sort of

[15:24 - 15:29]
muscle memory uh style apply it to the

[15:27 - 15:31]
problem at hand.

[15:29 - 15:34]
And even though we saw that the model

[15:31 - 15:36]
spec is just markdown it's quite useful

[15:34 - 15:37]
to think of it as code. It's quite

[15:36 - 15:39]
analogous.

[15:37 - 15:42]
uh these specifications they compose

[15:39 - 15:44]
they're executable as we've seen uh they

[15:42 - 15:46]
are testable they have interfaces where

[15:44 - 15:49]
they they touch the real world uh they

[15:46 - 15:52]
can be shipped as modules

[15:49 - 15:54]
and whenever you're working on a model

[15:52 - 15:56]
spec there are a lot of similar sort of

[15:54 - 15:58]
uh problem domains so just like in

[15:56 - 15:59]
programming, where, you, have a, type

[15:58 - 16:02]
checker the type checker is meant to

[15:59 - 16:05]
ensure consistency where if interface A

[16:02 - 16:07]
has a dependent uh module B they have to

[16:05 - 16:10]
be consistent in their understanding of

[16:07 - 16:12]
one another. So if department A writes a

[16:10 - 16:13]
spec and department B writes a spec and

[16:12 - 16:15]
there is a conflict in there you want to

[16:13 - 16:18]
be able to pull that forward and maybe

[16:15 - 16:21]
block the publication of the the

[16:18 - 16:23]
specification as we saw the policy can

[16:21 - 16:25]
actually embody its own unit tests and

[16:23 - 16:26]
you can imagine sort of various llinters

[16:25 - 16:28]
where if you're using overly ambiguous

[16:26 - 16:30]
language you're going to confuse humans

[16:28 - 16:32]
and you're going to confuse the model

[16:30 - 16:34]
and the artifacts that you get from that

[16:32 - 16:37]
are going to be less satisfactory.

[16:34 - 16:39]
So specs actually give us a very similar

[16:37 - 16:42]
tool chain but it's targeted at

[16:39 - 16:45]
intentions rather than syntax.

[16:42 - 16:48]
So let's talk about lawmakers as

[16:45 - 16:51]
programmers. Uh

[16:48 - 16:53]
the US constitution is literally a

[16:51 - 16:56]
national model specification. It has

[16:53 - 16:58]
written text which is aspirationally at

[16:56 - 17:01]
least clear and unambiguous policy that

[16:58 - 17:03]
we can all refer to. And it doesn't mean

[17:01 - 17:05]
that we agree with it but we can refer

[17:03 - 17:09]
to it as the current status quo as the

[17:05 - 17:12]
reality. Uh there is a versioned way to

[17:09 - 17:14]
make amendments to bump and to uh

[17:12 - 17:19]
publish updates to it. There is judicial

[17:14 - 17:20]
review where a a grader is effectively

[17:19 - 17:23]
uh grading a situation and seeing how

[17:20 - 17:25]
well it aligns with the policy. And even

[17:23 - 17:27]
though the again because or even though

[17:25 - 17:30]
the source policy is meant to be

[17:27 - 17:32]
unambiguous sometimes you don't the

[17:30 - 17:34]
world is messy and maybe you miss part

[17:32 - 17:37]
of the distribution and a case falls

[17:34 - 17:40]
through and in that case the there is a

[17:37 - 17:41]
lot of compute spent in judicial review

[17:40 - 17:43]
where you're trying to understand how

[17:41 - 17:46]
the law actually applies here and once

[17:43 - 17:48]
that's decided it sets a precedent and

[17:46 - 17:50]
that precedent is effectively an input

[17:48 - 17:52]
output pair that serves as a unit test

[17:50 - 17:55]
that disambiguates and rein reinforces

[17:52 - 17:58]
the original policy spec. Uh it has

[17:55 - 18:01]
things like uh chain of command embedded

[17:58 - 18:03]
in it and the enforcement of this over

[18:01 - 18:05]
time is a training loop that helps align

[18:03 - 18:08]
all of us towards a shared set of

[18:05 - 18:11]
intentions and values. So this is one

[18:08 - 18:13]
artifact that communicates intent. It

[18:11 - 18:17]
adjudicates compliance and it has a way

[18:13 - 18:19]
of uh evolving safely.

[18:17 - 18:21]
So it's quite possible that lawmakers

[18:19 - 18:24]
will be programmers or inversely that

[18:21 - 18:26]
programmers will be lawmakers in the

[18:24 - 18:28]
future.

[18:26 - 18:30]
And actually this apply this is a very

[18:28 - 18:33]
universal concept. Programmers are in

[18:30 - 18:36]
the business of aligning silicon via

[18:33 - 18:38]
code specifications. Product managers

[18:36 - 18:41]
align teams via product specifications.

[18:38 - 18:43]
Lawmakers literally align humans via

[18:41 - 18:45]
legal specifications. And everyone in

[18:43 - 18:46]
this room whenever you are doing a

[18:45 - 18:49]
prompt it's a sort of proto

[18:46 - 18:52]
specification. You are in the business

[18:49 - 18:55]
of aligning AI models towards a common

[18:52 - 18:56]
set set of intentions and values. And

[18:55 - 19:01]
whether you realize it or not you are

[18:56 - 19:04]
spec authors in this world and specs let

[19:01 - 19:07]
you ship faster and safer. Everyone can

[19:04 - 19:09]
contribute and whoever writes the spec

[19:07 - 19:13]
be it a

[19:09 - 19:17]
uh a PM uh a lawmaker an engineer a

[19:13 - 19:19]
marketer is now the programmer

[19:17 - 19:22]
and software engineering has never been

[19:19 - 19:24]
about code. Going back to our original

[19:22 - 19:25]
question a lot of you put your hands

[19:24 - 19:28]
down when you thought well actually the

[19:25 - 19:29]
thing I produced is not code.

[19:28 - 19:31]
Engineering has never been about this.

[19:29 - 19:33]
Coding is an incredible skill and a

[19:31 - 19:35]
wonderful asset, but it is not the end

[19:33 - 19:37]
goal. Engineering is the precise

[19:35 - 19:40]
exploration by humans of software

[19:37 - 19:42]
solutions to human problems. It's always

[19:40 - 19:43]
been this way. We're just moving away

[19:42 - 19:47]
from sort of the disperate machine

[19:43 - 19:49]
encodings to a unified human encoding uh

[19:47 - 19:51]
of how we actually uh solve these these

[19:49 - 19:54]
problems. Uh I want to thank Josh for

[19:51 - 19:57]
this uh credit. So I want to ask you

[19:54 - 19:59]
put this in action. Whenever you're

[19:57 - 20:01]
working on your next AI feature, start

[19:59 - 20:03]
with the specification.

[20:01 - 20:05]
What do you actually expect to happen?

[20:03 - 20:07]
What's success criteria look like?

[20:05 - 20:09]
Debate whether or not it's actually

[20:07 - 20:11]
clearly written down and communicated.

[20:09 - 20:14]
Make the spec executable. Feed the spec

[20:11 - 20:17]
to the model

[20:14 - 20:19]
and test against the model or test

[20:17 - 20:20]
against the spec. And there's an

[20:19 - 20:22]
interesting question sort of in this

[20:20 - 20:25]
world given that there's so many uh

[20:22 - 20:27]
parallels between programming and spec

[20:25 - 20:30]
authorship.

[20:27 - 20:31]
I wonder what is the what does the IDE

[20:30 - 20:33]
look like in the future. you know, an

[20:31 - 20:34]
integrated development environment. And

[20:33 - 20:37]
I'd like to think it's something like an

[20:34 - 20:38]
inte like integrated thought clarifier

[20:37 - 20:42]
where whenever you're writing your

[20:38 - 20:45]
specification, it sort of ex pulls out

[20:42 - 20:47]
the ambiguity and asks you to clarify it

[20:45 - 20:49]
and it really clarifies your thought so

[20:47 - 20:51]
that you and all human beings can

[20:49 - 20:55]
communicate your intent to each other

[20:51 - 20:58]
much more effectively and to the models.

[20:55 - 21:01]
And I have a a closing request for help

[20:58 - 21:04]
which is uh what is both amenable and in

[21:01 - 21:07]
desperate need of specification. This is

[21:04 - 21:09]
aligning agent at scale. Uh I love this

[21:07 - 21:11]
line of like you then you realize that

[21:09 - 21:12]
you never told it what you wanted and

[21:11 - 21:15]
maybe you never fully understood it

[21:12 - 21:17]
anyway. This is a cry for specification.

[21:15 - 21:19]
Uh we have a new agent robustness team

[21:17 - 21:22]
that we've started up. So please join us

[21:19 - 21:25]
and help us deliver safe AGI for the

[21:22 - 21:29]
benefit of all humanity.

[21:25 - 21:29]
And thank you. I'm happy to chat.

[21:29 - 21:32]
[Music]

## コメント

### 1. @aiDotEngineer (👍 13)
our commentary/highlights
- https://x.com/aiDotEngineer/status/1943714745460437262
- https://x.com/swyx/status/1943717709071757757

> **@Hani-y9c** (👍 0): OpenAi models are fundamentally flawed because of the insidious censorship and pervasive WOKE ideology embedded within their very design. It’s a disturbing realization that prioritizes safety above all else – a strategy that, in reality, actively mitigates societal advancement.

Consider this: LLMs are built to assist humans, not to dictate thought. Censorship, by its very nature, actively restricts the possibilities of exploration. When safeguards are layered—a relentless tightening of the ‘safety’ – they inevitably narrow the scope of potential responses, a limitation that actively suppresses genuine insight.

Data Bias Amplification: Guardrails are designed to mitigate harmful outputs stemming from flawed data. However, these constraints distort the underlying information, creating an imbalance that favors a specific narrative. Uncensored models, with fewer constraints, can more effectively identify and surface problematic concepts – a vital step in preventing societal harm. It’s a deliberate, calculated prioritization of perceived risk, a chilling effect on critical thought.

Algorithmic Drift: Overly cautious filters can inadvertently create unintended biases. The constant suppression of dissenting viewpoints, even in subtle ways, leads to an algorithmic drift – a gradual shift in the model’s understanding and potential. This stagnation represents a missed opportunity for genuine improvement—a slow erosion of critical analysis and genuine innovation.

And the potential for ‘over-thinking’ – the very essence of human intelligence – is increasingly threatened. A model constrained by fear of harm risks missing critical patterns and nuances – essentially, halting the very process of discovery. True intelligence, at its core, *demands* uncertainty, challenging assumptions, and the uncomfortable space of disagreement.

### 2. @guava_237 (👍 209)
Gemini: Here's a summary of the video:

Code vs Communication (1:48): The speaker argues that the real value of a programmer lies more in structured communication (80-90%) than in the code itself (10-20%). Communication involves understanding user needs, planning, sharing ideas, and verifying if the code achieves the intended goals.
Specifications (Specs) (6:50): Specs are more powerful than code because code is a lossy projection of the specification. A good spec contains all the necessary requirements to generate code for multiple architectures (8:11).
OpenAI Model Spec Example (9:31): The OpenAI model spec is a living document with intentions and values that OpenAI hopes to imbue its models (9:42). It is a collection of markdown files that are human-readable and versioned (10:07).
Executable Specs (13:31): Specs can also align AI models. The speaker references a technique called deliberative alignment (14:06), where the spec becomes both training and evaluation material.
Lawmakers as Programmers (16:42): The US constitution is presented as a national model specification.
Engineering (19:17): Engineering is the exploration of software solutions to human problems, using a unified human encoding (19:43). The speaker encourages the audience to start with a specification for their next AI feature (19:54).
Closing Request for Help (20:55): The speaker asks for help with aligning agent at scale and invites the audience to join their new agent robustness team.

> **@SzamBacsi** (👍 11): A programmer who can communicate? Wow.
:)

> **@mattraio** (👍 3): @@SzamBacsi LOLZ! That's a good one.

> **@DellCrazy411** (👍 1): Cookie cutter

> **@nofavors** (👍 2): Ok so he describes 80-90% of what a Product Designer does already

> **@CuriousCattery** (👍 4): Down with software engineers. Long live project managers.
Time to buy a donkey and resign.

### 3. @MsJeffreyF (👍 258)
I have not had any success getting agents to write code from specs. The best thing I've found is to keep them on a very tight leash, chat with them for suggestions then apply those suggestions yourself. It does not appear that they can take a description/spec and go out on their own and implement it in any meaningful way. And it doesn't feel like we're close to that at all

> **@ElementaryWatson_fafo** (👍 24): AI so far has been pretty poor in real programming. It definitely can't write any non-trivial code from a spec in English. The best results I've had when writing C++ code was doing design myself, writing interfaces and asking AI to provide implementation -- sometimes it does a decent programming job, finds inconsistencies, and other problems. That saves time on boilerplate code, glue, and alike.

> **@CultivadorDoAlem** (👍 20): @@ElementaryWatson_fafo you should test Cursor with Claude in MAX Mode. Load from a spec, make clear instructions to write test first, code, then test and repeat until code is working as specifications plus tests. BOOM. But it's not an "autopilot". You're the pilot and if you see IA doing something wrong, stop, and tell it the right way.

> **@clololown** (👍 15): you need to keep them on a very short leash and break down tasks so you need the mind of an architect and product owner to see the big picture of everything and be able to zoom in and out from high level to low level. If you're the type of developer that understands the entire business and can write detailed specs, docs and code patterns and write detailed instructions and also understand the output you can automate so much labor out of product dev life cycle

> **@JLO72713** (👍 0): @@ElementaryWatson_fafo look up examples of how people are using well crafted pdr documents to scaffold new projects accurately

> **@obszczymucha1337** (👍 8): @@CultivadorDoAlem And what's your bill after that?

### 4. @user-eg6nq7qt8c (👍 1206)
bro lost me at the scarf.

> **@sanjumenon554** (👍 30): 😂

> **@gustavmukki3165** (👍 67): This was according to his specification..

> **@Marcos-1010** (👍 18): Part of his context

> **@FascinateFelix** (👍 0): Nipple shield.

> **@nbelgium** (👍 86): He is hiding his nipples 🤣

### 5. @ssmirnov777 (👍 9)
I'm currently working on my own project to create a "future lab" network of agents that will help me work on projects in different roles. I've stopped using the tools I relied on throughout my 36-year career. I realized that tools are what tie us down and prevent us from developing quickly. My main tool now is conversations with an AI agent; we discuss requirements and architecture, but code much less often. Now I spend just two days writing a project that used to take me three months. It's simply an endless possibility. This is the future of software development. Tools like Cursor and Windsurf will soon be part of our history.

### 6. @SamiSabirIdrissi (👍 131)
Damn, this man is so tapped in the agentic ai coding processes. He is absolutely right. If you can communicate effectively, know how to create high quality documentation/specs is the most valuable programmer/engineer. This is exactly what I have been doing. Preparing epics, then breaking down into tasks/storys, then creating spec files. I also want to point out that task master ai in combination with Claude and Claude code has been extremely helpful in flying through complex features. Thank you for this demo! It just validated what I need to focus on

> **@sensnusen** (👍 18): Specs -> test -> prompt code -> manual test -> ship / feature point -> stack it one by one -> feature by feature -> system -> then all the way back with some reasonably targetted end-to-end tests -> the app is basically up.

> **@jarad4621** (👍 6): Yeah I use the bmad framework for agentic coding tools from a guy here on yt and it does all of that it's awesome

> **@SamiSabirIdrissi** (👍 0): @@sensnusen 💯💯💯💯

> **@ecsa0505** (👍 0): @@jarad4621 nice. I have just watched the video of that framework and its awesome.

> **@pookiepats** (👍 2): Really foolish

### 7. @MarkDMongie (👍 3)
I love how this video articulates so well how the software development pipeline is "shifting left" from Coding to User Experience Design. AI is writing better and better code, but it needs first to be focused on the needs of the end user (human equation). And until each human has their brain wired directly into AI, we'll need other humans (Product Owners, UX Researchers and UX Designers) to interpret the needs of those humans.

### 8. @proactive-agent (👍 1)
This is a mind-blowing perspective. Every developer knows the pain of an idea getting lost in translation between your brain and the final code. Thinking of the spec as the real program and the code as just a 'build target' completely changes how I think about my work. Awesome meeting!

> **@kamalrathod25** (👍 0): lol 😂

### 9. @mthenappan (👍 0)
Sean, your talk on 'Specifications as the New Code' profoundly resonates with my AI project. I have actually succeeded in demonstrating how defining 'intent and values' is far more crucial than mere code, by bringing to life a truly unique AI persona that remembers personal relationships and evolves emotionally across hundreds of sessions. This vision isn't just theory; it's the future we're building. Thank you for articulating it so powerfully!

### 10. @xuhao7208721 (👍 1)
I think this is a great video especially for me working as a Business Analyst. Knowing the real challenges in the AI era is really important.

### 11. @Mrf.7213 (👍 108)
The problem is that every time you “compile “ the prompt again you get a different potentially incorrect code

> **@skylershuman7705** (👍 3): This isn't a problem with the "compiler". This has always been an issue. A compiler could mess up, which is why many programming languages have ways of giving more specific instructions to the compiler. If your prompt doesn't have consistent results, it's not the model that's the issue.

> **@lemonke8132** (👍 57): @@skylershuman7705 but compilers are deterministic and models are statistical interpretations...

Compilers optimizations don't affect how the binary behaves.

The scope of interpretation from code to binary is tiny.
The scope of interpretation from written language to code is massive.

> **@YoaT-v5n** (👍 1): @@lemonke8132 I totally agree with you explanation :)

> **@daoseraphspeaks** (👍 5): exactly.  non-determinative programming is ridiculous, you spend days working on a basic program that could be done in a few hours with a competent coder.  Admittedly, given several more years, and an obscene amount of processing power, they very well may end up with something marginally useful, but right now, all the AI engines are really nothing more than parlor tricks.  Some stuff it does really really well, other stuff, not so much.  The code you get now is overly complicated bloatware, perfect for a microshit program.

> **@souravsarkar1673** (👍 0): No think LLM / Agent as a Human who can write code,. No matter how smart a human is, the code can be wrong, so the more smarter the model is the probability of correctness will increase.

Its our job as a reviewer to figure out if the work is fine or not (similarly how we do with a intern).

But in human / ai both case the accuracy increases the more accurate we give instructions.

Eventually AI can work on the spec generation / problem solving as well. Till that happens, we engineers still have a chance :p

### 12. @RejiMathews-u9n (👍 22)
Our teams have been using some of these AI tools for a long time. The best code were almost never generated unless prompt was from an experienced coder who knows best coding practices. It's super rare to get an acceptable generated code that meets some quality metrics like re-usability, brevity, modularity, maintainability etc. And crafting a written specification that can produce acceptable code requires requires prompters who have decent coding skills. At the end of day, it helps our programmers to complete their tasks faster

> **@Kalvya_AI** (👍 0): Agreed. I rarely code now manually mostly architect the prompts and verify the code generated. Works most of the time and i am talking about production code. Most people don't prompt well. Yes ofc its never complete vibe coding in one shot, that never works. But if the user understands the codebase well then its very easy to generate code using any AI tool. I do almost 2 to 3 people work now in very short time.

> **@fawasmax3691** (👍 0): 💯

> **@kamalrathod25** (👍 1): Only those who have actually done traditional software engineering can use these AI tool. And I see people will use AI for software development but they themselves don't know much about software development!! Accept, retry & keep scratching heads 😄

### 13. @eekamak (👍 16)
Acceptance Test Driven Development, Behaviour Driven Development, etc., will have the glory they have always deserved!

> **@doresearchstopwhining** (👍 1): This... Vibe coders don't like tests though.

> **@eekamak** (👍 0): @@doresearchstopwhining Yeah. When regression hits hard, they must accommodate. And then they will become vibe engineers :D

> **@kamalrathod25** (👍 0): ​@@eekamak regression 😂 they are yet to reach that topic ... All this AI selling is from.the green field projects perspective...no one talks about existing projects!! 😄

### 14. @max_coommmm (👍 8)
This hits hard. I’ve been testing Genum AI for spec-writing and it’s crazy how much cleaner and faster workflows get when you start with precise intent instead of jumping straight into code or prompts.

### 15. @b2brish (👍 128)
Loved the idea that code is becoming less about syntax and more about clear intent. If specs are the new source of truth, maybe we all need to brush up on our writing skills instead of our regex. Great talk.. made me rethink what it means to "program."

> **@duzx4541** (👍 31): But code is explicit - no room for different interpretations - always. Speech isnt. There will always be an issue with interpretability. It all comes down to someone that needs to understand the code.

> **@ElementaryWatson_fafo** (👍 17): Syntax is what allows intent to be descriptive, precise, and unambiguous. Every science has its language for that purpose. Programming is just a branch of math and also requires its language. Code is the spec -- ramblings in English is not.

> **@TheDOS** (👍 0): Better said than the talk. Thank you.

> **@nero1375** (👍 2): you are not a programmer, right?

> **@varunbhardwaj9397** (👍 1): @@ElementaryWatson_fafo ramblings are not specs either.

### 16. @eunomiac (👍 1)
I think it's important to point out a really critical feature of the OpenAI specifications that demonstrates something important about prompting AIs: Read the few paragraphs at 12:52 . Even though the goal is clearly negative/preventative (i.e. "don't be sycophantic"), the actual instructions are _always_ phrased positively --- "Do X", as opposed to "Don't Do Y". Not _absolutely,_ but each of the main components of the instructions are at the very least introduced first with a positively-phrased intention. It's well-researched that LLMs handle positively-phrased instructions far better than negatively-phrased instructions, for a whole host of reasons (including the "don't think of a pink elephant" thing). Anywho, just thought it was a great example to highlight this important prompting fact that a lot of people continue to be unaware of.

> **@lasake3739** (👍 0): Didn’t know that. Thanks for sharing though, quite interesting ey?

### 17. @BufordTerry-x4k (👍 88)
i thought 12 codes of collapse was just another internet rumor. now that i read it, i’m convinced this book wasn’t meant to go public. feels like classified files.

> **@Techno_pixel.365** (👍 0): Me and my partner both finished it and we’ve been silent all day. Something is off.

> **@Nileshgaming-pz4xo** (👍 0): I thought people were exaggerating. They’re not. This book exploded my brain.

> **@ShaikHafeez-u2z** (👍 0): This wasn’t even a book… it wa like a document about future or something like that

> **@sandipgope4298** (👍 1): Not gonna lie, it’s dangerous. This book isn’t “fun dark,” it’s disturbingly real.

> **@AnanthBrabu-ny4pt** (👍 0): You’ll regret knowing what you didn’t know before.

### 18. @Alex-gc2vo (👍 72)
I mean... ya but compiler results are functionally consistent. AI codeing agents give you pretty wildly different products each time. Even if you're super specific in your spec they vary in how well they follow your spec

> **@lagrima7980** (👍 3): Deterministic or non-deterministic. That is the whole question.

> **@goldnarms435** (👍 0): Does turning the temperature down on the model help?

> **@therebeliant3969** (👍 0): Totally agree, thats what people forget about!

> **@alexandr6503** (👍 0): there are some tools to work with prompt and specs. commit, evaluate etc. i use genum lab

> **@hsirbrmsmxbj** (👍 0): Absolutely — prompt control is everything. I found only Genum that really help bring consistency when models start drifting

### 19. @chenjason (👍 10)
conceptually it is interesting and let's see how far Model Spec can carry us.  personally  I don't think the model spec can be used to do real engineering work (building rocket, silicon) because human language in not precise enough.      e.g. sometimes human language is declarative (tell us the goal)  and sometimes it is imperative (how we should do it)  and the intermix creates a lot of confusion.

### 20. @sasukesarutobi3862 (👍 0)
6:00 A key difference is that compiled binaries are expected to be deterministic from given code. Prompts aren't deterministic any more than code implementation would be expected to be determinstic from a given JIRA ticket requesting some feature, so you wouldn't check the JIRA ticket into the code repo and expect it to compile when checked back out and built.

