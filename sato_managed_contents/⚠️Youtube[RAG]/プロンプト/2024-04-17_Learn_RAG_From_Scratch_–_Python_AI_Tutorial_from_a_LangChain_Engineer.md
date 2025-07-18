# Learn RAG From Scratch – Python AI Tutorial from a LangChain Engineer

**チャンネル:** freeCodeCamp.org
**公開日:** 2024-04-17
**URL:** https://www.youtube.com/watch?v=sVcwVQRHIc8

## 説明

Learn how to implement RAG (Retrieval Augmented Generation) from scratch, straight from a LangChain software engineer. This Python course teaches you how to use RAG to combine your own custom data with the power of Large Language Models (LLMs).

💻 Code: https://github.com/langchain-ai/rag-from-scratch

If you're completely new to LangChain and want to learn about some fundamentals, check out our guide for beginners: https://www.freecodecamp.org/news/beginners-guide-to-langchain/

✏️ Course created by Lance Martin, PhD.
Lance on X: https://twitter.com/rlancemartin

❤️ Try interactive AI courses we love, right in your browser: https://scrimba.com/freeCodeCamp-AI (Made possible by a grant from our friends at Scrimba)

⭐️ Course Contents ⭐️
⌨️ (0:00:00) Overview
⌨️ (0:05:53) Indexing
⌨️ (0:10:40) Retrieval
⌨️ (0:15:52) Generation
⌨️ (0:22:14) Query Translation (Multi-Query)
⌨️ (0:28:20) Query Translation (RAG Fusion)
⌨️ (0:33:57) Query Translation (Decomposition)
⌨️ (0:40:31) Query Translation (Step Back)
⌨️ (0:47:24) Query Translation (HyDE)
⌨️ (0:52:07) Routing
⌨️ (0:59:08) Query Construction
⌨️ (1:05:05) Indexing (Multi Representation)
⌨️ (1:11:39) Indexing (RAPTOR)
⌨️ (1:19:19) Indexing (ColBERT)
⌨️ (1:26:32) CRAG
⌨️ (1:44:09) Adaptive RAG
⌨️ (2:12:02) The future of RAG

🎉 Thanks to our Champion and Sponsor supporters:
👾 davthecoder
👾 jedi-or-sith
👾 南宮千影
👾 Agustín Kussrow
👾 Nattira Maneerat
👾 Heather Wcislo
👾 Serhiy Kalinets
👾 Justin Hual
👾 Otis Morgan 
👾 Oscar Rahnama

--

Learn to code for free and get a developer job: https://www.freecodecamp.org

Read hundreds of articles on programming: https://freecodecamp.org/news

## 字幕

[00:00 - 00:06]
in this course Lance Martin will teach

[00:02 - 00:08]
you how to implement rag from scratch

[00:06 - 00:10]
Lance is a software engineer at Lang

[00:08 - 00:14]
chain and Lang chain is one of the most

[00:10 - 00:16]
common ways to implement rag Lance will

[00:14 - 00:19]
help you understand how to use rag to

[00:16 - 00:21]
combine custom data with llms hi this is

[00:19 - 00:23]
Lance Martin I'm a software engineer at

[00:21 - 00:26]
Lang chain I'm going to be giving a

[00:23 - 00:28]
short course focused on rag or retrieval

[00:26 - 00:30]
augmented generation which is one of the

[00:28 - 00:32]
most popular kind of ideas and

[00:30 - 00:34]
in llms

[00:32 - 00:37]
today so really the motivation for this

[00:34 - 00:41]
is that most of the world's data is

[00:37 - 00:43]
private um whereas llms are trained on

[00:41 - 00:45]
publicly available data so you can kind

[00:43 - 00:47]
of see on the bottom on the x-axis the

[00:45 - 00:50]
number of tokens using pre-training

[00:47 - 00:52]
various llms so it kind of varies from

[00:50 - 00:54]
say 1.5 trillion tokens in the case of

[00:52 - 00:56]
smaller models like

[00:54 - 00:58]
52 out to some very large number that we

[00:56 - 01:00]
actually don't know for proprietary

[00:58 - 01:03]
models like GPT 4 CLA

[01:00 - 01:06]
three but what's really interesting is

[01:03 - 01:08]
that the context window or the ability

[01:06 - 01:11]
to feed external information into these

[01:08 - 01:13]
LMS is actually getting larger so about

[01:11 - 01:16]
a year ago context windows were between

[01:13 - 01:18]
4 and 8,000 tokens you know that's like

[01:16 - 01:20]
maybe a dozen pages of text we've

[01:18 - 01:22]
recently seen models all the way out to

[01:20 - 01:24]
a million tokens which is thousands of

[01:22 - 01:28]
pages of text so while these llms are

[01:24 - 01:30]
trained on large scale public data it's

[01:28 - 01:33]
increasingly feasible to feed them

[01:30 - 01:35]
this huge mass of private data that

[01:33 - 01:37]
they've never seen that private data can

[01:35 - 01:40]
be your kind of personal data it can be

[01:37 - 01:42]
corporate data or you know other

[01:40 - 01:45]
information that you want to pass to an

[01:42 - 01:48]
LM that's not natively in his training

[01:45 - 01:52]
set and so this is kind of the main

[01:48 - 01:54]
motivation for rag it's really the idea

[01:52 - 01:56]
that llms one are kind of the the center

[01:54 - 01:59]
of a new kind of operating

[01:56 - 02:01]
system and two it's increasingly

[01:59 - 02:04]
critical to be able to feed information

[02:01 - 02:07]
from external sources such as private

[02:04 - 02:10]
data into llms for processing so that's

[02:07 - 02:13]
kind of the overarching motivation for

[02:10 - 02:14]
Rag and now rag refers to retrieval

[02:13 - 02:17]
augmented generation and you can think

[02:14 - 02:19]
of it in three very general steps

[02:17 - 02:22]
there's a process of indexing of

[02:19 - 02:24]
external data so you can think about

[02:22 - 02:27]
this as you know building a database for

[02:24 - 02:29]
example um many companies already have

[02:27 - 02:32]
large scale databases in different forms

[02:29 - 02:35]
they could be SQL DBS relational DBS um

[02:32 - 02:38]
they could be Vector Stores um or

[02:35 - 02:40]
otherwise but the point is that

[02:38 - 02:43]
documents are indexed such that they can

[02:40 - 02:45]
be retrieved based upon some heuristics

[02:43 - 02:47]
relative to an input like a question and

[02:45 - 02:50]
those relevant documents can be passed

[02:47 - 02:52]
to an llm and the llm can produce

[02:50 - 02:54]
answers that are grounded in that

[02:52 - 02:56]
retrieved information so that's kind of

[02:54 - 02:58]
the centerpiece or central idea behind

[02:56 - 03:01]
Rag and why it's really powerful

[02:58 - 03:03]
technology because it's really uniting

[03:01 - 03:06]
the the knowledge and processing

[03:03 - 03:09]
capacity of llms with large scale

[03:06 - 03:11]
private external data source for which

[03:09 - 03:13]
most of the important data in the world

[03:11 - 03:16]
still

[03:13 - 03:17]
lives and in the following short videos

[03:16 - 03:20]
we're going to kind of build up a

[03:17 - 03:22]
complete understanding of the rag

[03:20 - 03:24]
landscape and we're going to be covering

[03:22 - 03:25]
a bunch of interesting papers and

[03:24 - 03:28]
techniques that explain kind of how to

[03:25 - 03:30]
do rag and I've really broken it down

[03:28 - 03:32]
into a few different sections

[03:30 - 03:35]
so starting with a question on the left

[03:32 - 03:37]
the first kind of section is what I call

[03:35 - 03:39]
query trans translation so this captures

[03:37 - 03:42]
a bunch of different methods to take a

[03:39 - 03:44]
question from a user and modify it in

[03:42 - 03:45]
some way to make it better suited for

[03:44 - 03:47]
retrieval from you know one of these

[03:45 - 03:50]
indexes we've talked

[03:47 - 03:52]
about that can use methods like query

[03:50 - 03:55]
writing it can be decomposing the query

[03:52 - 03:57]
into you know constituent sub

[03:55 - 04:00]
questions then there's a question of

[03:57 - 04:02]
routing so taking that decomposed a

[04:00 - 04:03]
Rewritten question and routing it to the

[04:02 - 04:06]
right place you might have multiple

[04:03 - 04:08]
Vector stores a relational DB graph DB

[04:06 - 04:10]
and a vector store so it's the challenge

[04:08 - 04:12]
of getting a question to the right

[04:10 - 04:15]
Source then there's a there's kind of

[04:12 - 04:16]
the challenge of query construction

[04:15 - 04:19]
which is basically taking natural

[04:16 - 04:21]
language and converting it into the DSL

[04:19 - 04:23]
necessary for whatever data source you

[04:21 - 04:25]
want to work with a classic example here

[04:23 - 04:28]
is text a SQL which is kind of a very

[04:25 - 04:31]
kind of well studied process but text a

[04:28 - 04:34]
cipher for graph DV is very interesting

[04:31 - 04:36]
text to metadata filters for Vector DBS

[04:34 - 04:40]
is also a very big area of

[04:36 - 04:42]
study um then there's indexing so that's

[04:40 - 04:44]
the process of taking your documents and

[04:42 - 04:46]
processing them in some way so they can

[04:44 - 04:47]
be easily retrieved and there's a bunch

[04:46 - 04:48]
of techniques for that we'll talk

[04:47 - 04:50]
through we'll talk through different

[04:48 - 04:51]
embedding methods we'll talk about

[04:50 - 04:53]
different indexing

[04:51 - 04:56]
strategies after

[04:53 - 04:59]
retrieval there are different techniques

[04:56 - 05:00]
to rerank or filter retrieve documents

[04:59 - 05:02]
um and then finally we'll talk about

[05:00 - 05:05]
generation and kind of an interesting

[05:02 - 05:08]
new set of methods to do what we might

[05:05 - 05:12]
call as active rag so in that retrieval

[05:08 - 05:15]
or generation stage grade documents

[05:12 - 05:18]
grade answers um grade for relevance to

[05:15 - 05:19]
the question grade for faithfulness to

[05:18 - 05:22]
the documents I.E check for

[05:19 - 05:25]
hallucinations and if either fail

[05:22 - 05:28]
feedback uh re- retrieve or rewrite the

[05:25 - 05:30]
question uh regenerate the qu regenerate

[05:28 - 05:31]
the answer and so forth so there's a

[05:30 - 05:33]
really interesting set of methods we're

[05:31 - 05:37]
going to talk through that cover that

[05:33 - 05:39]
like retrieval and generation with

[05:37 - 05:41]
feedback and you know in terms of

[05:39 - 05:43]
General outline we'll cover the basics

[05:41 - 05:44]
first it'll go through indexing

[05:43 - 05:47]
retrieval and generation kind of in the

[05:44 - 05:48]
Bare Bones and then we'll talk through

[05:47 - 05:50]
more advanced techniques that we just

[05:48 - 05:52]
saw on the prior slide career

[05:50 - 05:55]
Transformations routing uh construction

[05:52 - 05:57]
and so forth hi this is Lance from Lang

[05:55 - 05:59]
chain this the second video in our

[05:57 - 06:01]
series rack from scratch focused on

[05:59 - 06:04]
indexing

[06:01 - 06:06]
so in the past video you saw the main

[06:04 - 06:09]
kind of overall components of rag

[06:06 - 06:10]
pipelines indexing retrieval and

[06:09 - 06:13]
generation and here we're going to kind

[06:10 - 06:16]
of Deep dive on indexing and give like

[06:13 - 06:18]
just a quick overview of it so the first

[06:16 - 06:20]
aspect of indexing is we have some

[06:18 - 06:22]
external documents that we actually want

[06:20 - 06:25]
to load and put into what we're trying

[06:22 - 06:27]
to call Retriever and the goal of this

[06:25 - 06:30]
retriever is simply given an input

[06:27 - 06:32]
question I want to fish out doents that

[06:30 - 06:35]
are related to my question in some

[06:32 - 06:37]
way now the way to establish that

[06:35 - 06:39]
relationship or relevance or similarity

[06:37 - 06:42]
is typically done using some kind of

[06:39 - 06:44]
numerical representation of documents

[06:42 - 06:47]
and the reason is that it's very easy to

[06:44 - 06:50]
compare vectors for example of numbers

[06:47 - 06:53]
uh relative to you know just free form

[06:50 - 06:56]
text and so a lot of approaches have

[06:53 - 06:58]
been a developed over the years to take

[06:56 - 07:01]
text documents and compress them down

[06:58 - 07:03]
into a numerical rep presentation that

[07:01 - 07:06]
then can be very easily

[07:03 - 07:08]
searched now there's a few ways to do

[07:06 - 07:11]
that so Google and others came up with

[07:08 - 07:13]
many interesting statistical methods

[07:11 - 07:15]
where you take a document you look at

[07:13 - 07:18]
the frequency of words and you build

[07:15 - 07:20]
what they call sparse vectors such that

[07:18 - 07:23]
the vector locations are you know a

[07:20 - 07:24]
large vocabulary of possible words each

[07:23 - 07:27]
value represents the number of

[07:24 - 07:28]
occurrences of that particular word and

[07:27 - 07:31]
it's sparse because there's of course

[07:28 - 07:32]
many zeros it's a very large vocabulary

[07:31 - 07:34]
relative to what's present in the

[07:32 - 07:37]
document and there's very good search

[07:34 - 07:40]
methods over this this type of numerical

[07:37 - 07:41]
representation now a bit more recently

[07:40 - 07:43]
uh embedding methods that are machine

[07:41 - 07:45]
learned so you take a document and you

[07:43 - 07:47]
build a compressed fixed length

[07:45 - 07:51]
representation of that

[07:47 - 07:53]
document um have been developed with

[07:51 - 07:54]
correspondingly very strong search

[07:53 - 07:59]
methods over

[07:54 - 08:01]
embeddings um so the intuition here is

[07:59 - 08:04]
that we take documents and we typically

[08:01 - 08:07]
split them because embedding models

[08:04 - 08:09]
actually have limited context windows so

[08:07 - 08:12]
you know on the order of maybe 512

[08:09 - 08:14]
tokens up to 8,000 tokens or Beyond but

[08:12 - 08:16]
they're not infinitely large so

[08:14 - 08:20]
documents are split and each document is

[08:16 - 08:22]
compressed into a vector and that Vector

[08:20 - 08:25]
captures a semantic meaning of the

[08:22 - 08:27]
document itself the vectors are indexed

[08:25 - 08:30]
questions can be embedded in the exactly

[08:27 - 08:33]
same way and then numerical kind of

[08:30 - 08:34]
comparison in some form you know using

[08:33 - 08:37]
very different types of methods can be

[08:34 - 08:41]
performed on these vectors to fish out

[08:37 - 08:43]
relevant documents relative to my

[08:41 - 08:46]
question um and let's just do a quick

[08:43 - 08:51]
code walk through on some of these

[08:46 - 08:55]
points so I have my notebook here I've

[08:51 - 08:58]
installed here um now I've set a few API

[08:55 - 09:00]
keys for lsmith which are very useful

[08:58 - 09:03]
for tracing which we'll see

[09:00 - 09:04]
shortly um previously I walked through

[09:03 - 09:07]
this this kind of quick start that just

[09:04 - 09:09]
showed overall how to lay out these rag

[09:07 - 09:11]
pipelines and here what I'll do is I'll

[09:09 - 09:13]
Deep dive a little bit more on indexing

[09:11 - 09:16]
and I'm going to take a question and a

[09:13 - 09:18]
document and first I'm just going to

[09:16 - 09:19]
compute the number of tokens in for

[09:18 - 09:22]
example the question and this is

[09:19 - 09:24]
interesting because embedding models in

[09:22 - 09:27]
llms more generally operate on tokens

[09:24 - 09:28]
and so it's kind of nice to understand

[09:27 - 09:30]
how large the documents are that I'm

[09:28 - 09:33]
trying to feed in in this case it's

[09:30 - 09:35]
obviously a very small in this case

[09:33 - 09:38]
question now I'm going to specify open

[09:35 - 09:40]
eye embeddings I specify an embedding

[09:38 - 09:43]
model here and I just say embed embed

[09:40 - 09:47]
query I can pass my question my document

[09:43 - 09:49]
and what you can see here is that runs

[09:47 - 09:53]
and this is mapped to now a vector of

[09:49 - 09:56]
length 1536 and that fixed length Vector

[09:53 - 09:58]
representation will be computed for both

[09:56 - 10:00]
documents and really for any document so

[09:58 - 10:02]
you're always is kind of computing this

[10:00 - 10:05]
fix length Vector that encodes the

[10:02 - 10:06]
semantics of the text that you've passed

[10:05 - 10:08]
now I can do things like cosine

[10:06 - 10:13]
similarity to compare

[10:08 - 10:16]
them and as we'll see here I can load

[10:13 - 10:18]
some documents this is just like we saw

[10:16 - 10:22]
previously I can split

[10:18 - 10:23]
them and I can index them here just like

[10:22 - 10:25]
we did before but we can see under the

[10:23 - 10:27]
hood really what we're doing is we're

[10:25 - 10:29]
taking each split we're embedding it

[10:27 - 10:31]
using open eye embeddings into this this

[10:29 - 10:33]
kind of this Vector representation and

[10:31 - 10:36]
that's stored with a link to the rod

[10:33 - 10:38]
document itself in our Vector store and

[10:36 - 10:41]
next we'll see how to actually do

[10:38 - 10:43]
retrieval using this Vector store hi

[10:41 - 10:45]
this is Lance from Lang chain and this

[10:43 - 10:47]
is the third video in our series rag

[10:45 - 10:50]
from scratch building up a lot of the

[10:47 - 10:51]
motivations for rag uh from the very

[10:50 - 10:54]
basic

[10:51 - 10:56]
components um so we're going to be

[10:54 - 10:59]
talking about retrieval today in the

[10:56 - 11:01]
last two uh short videos I outlined

[10:59 - 11:04]
indexing and gave kind of an overview of

[11:01 - 11:06]
this flow which starts with indexing of

[11:04 - 11:07]
our documents retrieval of documents

[11:06 - 11:09]
relevant to our question and then

[11:07 - 11:11]
generation of answers based on the

[11:09 - 11:13]
retriev

[11:11 - 11:15]
documents and so we saw that the

[11:13 - 11:18]
indexing process basically makes

[11:15 - 11:20]
documents easy to retrieve and it goes

[11:18 - 11:22]
through a flow that basically looks like

[11:20 - 11:25]
you take our documents you split them in

[11:22 - 11:28]
some way into these smaller chunks that

[11:25 - 11:30]
can be easily embedded um those

[11:28 - 11:31]
embeddings are then numerical

[11:30 - 11:32]
representations of those documents that

[11:31 - 11:35]
are easily

[11:32 - 11:38]
searchable and they're stored in an

[11:35 - 11:41]
index when given a question that's also

[11:38 - 11:43]
embedded the index performs a similarity

[11:41 - 11:45]
search and returns splits that are

[11:43 - 11:47]
relevant to the

[11:45 - 11:49]
question now if we dig a little bit more

[11:47 - 11:52]
under the hood we can think about it

[11:49 - 11:54]
like this if we take a document and

[11:52 - 11:56]
embed it let's imagine that embedding

[11:54 - 11:58]
just had three dimensions so you know

[11:56 - 12:00]
each document is projected into some

[11:58 - 12:03]
point in this 3D

[12:00 - 12:06]
space now the point is that the location

[12:03 - 12:09]
in space is determined by the semantic

[12:06 - 12:12]
meaning or content in that document so

[12:09 - 12:15]
to follow that then documents in similar

[12:12 - 12:17]
locations in space contain similar

[12:15 - 12:19]
semantic information and this very

[12:17 - 12:21]
simple idea is really the Cornerstone

[12:19 - 12:22]
for a lot of search and retrieval

[12:21 - 12:25]
methods that you'll see with modern

[12:22 - 12:27]
Vector stores so in particular we take

[12:25 - 12:30]
our documents we embed them into this in

[12:27 - 12:32]
this case a toy 3D space

[12:30 - 12:35]
we take our question do the

[12:32 - 12:37]
same we can then do a search like a

[12:35 - 12:39]
local neighborhood search you can think

[12:37 - 12:42]
about in this 3D space around our

[12:39 - 12:45]
question to say hey what documents are

[12:42 - 12:47]
nearby and these nearby neighbors are

[12:45 - 12:50]
then retrieved because they can they

[12:47 - 12:53]
have similar semantics relative to our

[12:50 - 12:56]
question and that's really what's going

[12:53 - 12:58]
on here so again we took our documents

[12:56 - 13:00]
we split them we embed them and now they

[12:58 - 13:02]
exist in this high dimensional space

[13:00 - 13:04]
we've taken our question embedded it

[13:02 - 13:07]
projected in that same space and we just

[13:04 - 13:09]
do a search around the question from

[13:07 - 13:12]
nearby documents and grab ones that are

[13:09 - 13:14]
close and we can pick some number we can

[13:12 - 13:17]
say we want one or two or three or n

[13:14 - 13:19]
documents close to my question in this

[13:17 - 13:20]
embedding space and there's a lot of

[13:19 - 13:22]
really interesting methods that

[13:20 - 13:24]
implement this very effectively I I link

[13:22 - 13:28]
one

[13:24 - 13:30]
here um and we have a lot of really nice

[13:28 - 13:32]
uh Integrations to play with this

[13:30 - 13:35]
general idea so many different embedding

[13:32 - 13:37]
models many different indexes lots of

[13:35 - 13:39]
document loaders um and lots of

[13:37 - 13:41]
Splitters that can be kind of recombined

[13:39 - 13:43]
to test different ways of doing this

[13:41 - 13:45]
kind of indexing or

[13:43 - 13:50]
retrieval um so now I'll show a bit of a

[13:45 - 13:52]
code walkth through so here we defined

[13:50 - 13:54]
um we kind of had walked through this

[13:52 - 13:57]
previously this is our notebook we've

[13:54 - 14:00]
installed a few packages we've set a few

[13:57 - 14:02]
environment variables using lsmith

[14:00 - 14:04]
and we showed this previously this is

[14:02 - 14:07]
just an overview showing how to run rag

[14:04 - 14:09]
like kind of end to end in the last uh

[14:07 - 14:11]
short talk we went through

[14:09 - 14:14]
indexing um and what I'm going to do

[14:11 - 14:15]
very simply is I'm just going to reload

[14:14 - 14:19]
our

[14:15 - 14:21]
documents so now I have our documents

[14:19 - 14:23]
I'm going to resplit

[14:21 - 14:24]
them and we saw before how we can build

[14:23 - 14:27]
our

[14:24 - 14:29]
index now here let's actually do the

[14:27 - 14:31]
same thing but in the slide we actually

[14:29 - 14:33]
showed kind of that notion of search in

[14:31 - 14:35]
that 3D

[14:33 - 14:38]
space and a nice parameter to think

[14:35 - 14:41]
about in building your your retriever is

[14:38 - 14:42]
K so K tells you the number of nearby

[14:41 - 14:44]
neighbors to fetch when you do that

[14:42 - 14:47]
retrieval process and we talked about

[14:44 - 14:49]
you know in that 3D space do I want one

[14:47 - 14:53]
nearby neighbor or two or three so here

[14:49 - 14:54]
we can specify k equals 1 for example

[14:53 - 14:57]
now we're building our index so we're

[14:54 - 14:59]
taking every split embedding it storing

[14:57 - 15:01]
it now what's nice is I asked a a

[14:59 - 15:03]
question what is Task decomposition this

[15:01 - 15:05]
is related to the blog post and I'm

[15:03 - 15:08]
going to run get relevant documents so I

[15:05 - 15:10]
run that and now how many documents do I

[15:08 - 15:12]
get back I get one as expected based

[15:10 - 15:14]
upon k equals 1 so this retrieve

[15:12 - 15:17]
document should be related to my

[15:14 - 15:19]
question now I can go to lsmith and we

[15:17 - 15:21]
can open it up and we can look at our

[15:19 - 15:23]
Retriever and we can see here was our

[15:21 - 15:27]
question here's the one document we got

[15:23 - 15:29]
back and okay so that makes sense this

[15:27 - 15:31]
document pertains to task ke

[15:29 - 15:33]
decomposition in particular and it kind

[15:31 - 15:35]
of lays out a number of different

[15:33 - 15:37]
approaches that can be used to do that

[15:35 - 15:38]
this all kind of makes sense and this

[15:37 - 15:42]
shows kind of in practice how you can

[15:38 - 15:45]
implement this this NE this kind of KNN

[15:42 - 15:48]
or k nearest neighbor search uh really

[15:45 - 15:50]
easily uh just using a few lines of code

[15:48 - 15:52]
and next we're going to talk about

[15:50 - 15:55]
generation

[15:52 - 15:57]
thanks hey this is Lance from Lang chain

[15:55 - 15:59]
this is the fourth uh short video in our

[15:57 - 16:01]
rack from scratch series

[15:59 - 16:04]
that's going to be focused on

[16:01 - 16:07]
generation now in the past few videos we

[16:04 - 16:10]
walked through the general flow uh for

[16:07 - 16:11]
kind of basic rag starting with indexing

[16:10 - 16:13]
Fall by

[16:11 - 16:15]
retrieval then

[16:13 - 16:17]
generation of an answer based upon the

[16:15 - 16:19]
documents that we retrieved that are

[16:17 - 16:21]
relevant to our question this is kind of

[16:19 - 16:25]
the the very basic

[16:21 - 16:28]
flow now an important consideration in

[16:25 - 16:30]
generation is really what's happening is

[16:28 - 16:32]
we're taking the documents you retrieve

[16:30 - 16:34]
and we're stuffing them into the llm

[16:32 - 16:37]
context window so if we kind of walk

[16:34 - 16:39]
back through the process we take

[16:37 - 16:43]
documents we split them for convenience

[16:39 - 16:45]
or embedding we then embed each split

[16:43 - 16:47]
and we store that in a vector store as

[16:45 - 16:50]
this kind of easily searchable numerical

[16:47 - 16:52]
representation or vector and we take a

[16:50 - 16:55]
question embed it to produce a similar

[16:52 - 16:57]
kind of numerical representation we can

[16:55 - 17:00]
then search for example using something

[16:57 - 17:02]
like KN andn in this kind of dimensional

[17:00 - 17:05]
space for documents that are similar to

[17:02 - 17:07]
our question based on their proximity or

[17:05 - 17:10]
location in this space in this case you

[17:07 - 17:12]
can see 3D is a toy kind of toy

[17:10 - 17:15]
example now we've recovered relevant

[17:12 - 17:17]
splits to our question we pack those

[17:15 - 17:19]
into the context window and we produce

[17:17 - 17:22]
our

[17:19 - 17:25]
answer now this introduces the notion of

[17:22 - 17:27]
a prompt so the prompt is kind of a you

[17:25 - 17:30]
can think have a placeholder that has

[17:27 - 17:33]
for example you know in our case B keys

[17:30 - 17:35]
so those keys can be like context and

[17:33 - 17:37]
question so they basically are like

[17:35 - 17:40]
buckets that we're going to take those

[17:37 - 17:41]
retrieve documents and Slot them in

[17:40 - 17:44]
we're going to take our question and

[17:41 - 17:45]
also slot it in and if you kind of walk

[17:44 - 17:48]
through this flow you can kind of see

[17:45 - 17:50]
that we can build like a dictionary from

[17:48 - 17:52]
our retrieve documents and from our

[17:50 - 17:54]
question and then we can basically

[17:52 - 17:57]
populate our prompt template with the

[17:54 - 17:59]
values from the dict and then becomes a

[17:57 - 18:01]
prompt value which can be passed to llm

[17:59 - 18:03]
like a chat model resulting in chat

[18:01 - 18:06]
messages which we then parse into a

[18:03 - 18:07]
string and get our answer so that's like

[18:06 - 18:09]
the basic workflow that we're going to

[18:07 - 18:11]
see and let's just walk through that in

[18:09 - 18:14]
code very quickly to kind of give you

[18:11 - 18:16]
like a Hands-On intuition so we had our

[18:14 - 18:19]
notebook we walk through previously

[18:16 - 18:21]
install a few packages I'm setting a few

[18:19 - 18:23]
lsmith environment variables we'll see

[18:21 - 18:25]
it's it's nice for uh kind of observing

[18:23 - 18:27]
and debugging our

[18:25 - 18:30]
traces um previously we did this quick

[18:27 - 18:33]
start we're going to skip that over

[18:30 - 18:36]
um and what I will do is I'm going to

[18:33 - 18:38]
build our retriever so again I'm going

[18:36 - 18:40]
to take documents and load them uh and

[18:38 - 18:42]
then I'm going to split them here we've

[18:40 - 18:43]
kind of done this previously so I'll go

[18:42 - 18:45]
through this kind of quickly and then

[18:43 - 18:47]
we're going to embed them and store them

[18:45 - 18:50]
in our index so now we have this

[18:47 - 18:51]
retriever object here now I'm going to

[18:50 - 18:54]
jump down here now here's where it's

[18:51 - 18:55]
kind of fun this is the generation bit

[18:54 - 18:58]
and you can see here I'm defining

[18:55 - 18:59]
something new this is a prompt template

[18:58 - 19:00]
and what my prompt template is something

[18:59 - 19:02]
really simple it's just going to say

[19:00 - 19:04]
answer the following question based on

[19:02 - 19:06]
this context it's going to have this

[19:04 - 19:08]
context variable and a question so now

[19:06 - 19:11]
I'm building my prompt so great now I

[19:08 - 19:12]
have this prompt let's define an llm

[19:11 - 19:15]
I'll choose

[19:12 - 19:17]
35 now this introdu the notion of a

[19:15 - 19:20]
chain so in Lang chain we have an

[19:17 - 19:22]
expression language called L Cel Lang

[19:20 - 19:24]
chain expression language which lets you

[19:22 - 19:27]
really easily compose things like

[19:24 - 19:30]
prompts LMS parsers retrievers and other

[19:27 - 19:32]
things but the very simple kind of you

[19:30 - 19:33]
know example here is just let's just

[19:32 - 19:35]
take our prompt which you defined right

[19:33 - 19:37]
here and connect it to an LM which you

[19:35 - 19:39]
defined right here into this chain so

[19:37 - 19:42]
there's our chain now all we're doing is

[19:39 - 19:44]
we're invoking that chain so every L

[19:42 - 19:47]
expression language chain has a few

[19:44 - 19:50]
common methods like invoke bat stream in

[19:47 - 19:54]
this case we just invoke it with a dict

[19:50 - 19:58]
so context and question that maps to the

[19:54 - 20:01]
expected Keys here in our template

[19:58 - 20:02]
and so if we run invoke what we see is

[20:01 - 20:05]
it's just going to execute that chain

[20:02 - 20:07]
and we get our answer now if we zoom

[20:05 - 20:09]
over to Langs Smith we should see that

[20:07 - 20:11]
it's been populated so yeah we see a

[20:09 - 20:14]
very simple runable

[20:11 - 20:18]
sequence here was our

[20:14 - 20:21]
document um and here's our output and

[20:18 - 20:24]
here is our prompt answer the following

[20:21 - 20:26]
question based on the context here's the

[20:24 - 20:28]
document we passed in here is the

[20:26 - 20:32]
question and then we get our answer so

[20:28 - 20:34]
that's pretty nice um now there's a lot

[20:32 - 20:36]
of other options for rag prompts I'll

[20:34 - 20:39]
pull one in from our prompt tub this

[20:36 - 20:41]
one's like kind of a popular prompt so

[20:39 - 20:43]
it just like has a little bit more

[20:41 - 20:47]
detail but you know it's the main the

[20:43 - 20:48]
main intuition is the same um you're

[20:47 - 20:50]
passing in documents you're asking them

[20:48 - 20:53]
to reason about the documents given a

[20:50 - 20:55]
question produce an answer and now here

[20:53 - 20:57]
I'm going to find a rag chain which will

[20:55 - 20:59]
automatically do the retrieval for us

[20:57 - 21:01]
and all I have to do is specify here's

[20:59 - 21:03]
my retriever which we defined

[21:01 - 21:06]
before here's our question we which we

[21:03 - 21:10]
invoke with the question gets passed

[21:06 - 21:12]
through to the key question in our dict

[21:10 - 21:14]
and it automatically will trigger the

[21:12 - 21:16]
retriever which will return documents

[21:14 - 21:18]
which get passed into our context so

[21:16 - 21:20]
it's exactly what we did up here except

[21:18 - 21:22]
before we did this

[21:20 - 21:25]
manually and

[21:22 - 21:28]
now um this is all kind of automated for

[21:25 - 21:29]
us we pass that dick which is autop

[21:28 - 21:31]
populated

[21:29 - 21:34]
into our prompt llm out to parser now

[21:31 - 21:37]
let invoke it and that should all just

[21:34 - 21:39]
run and great we get an answer and we

[21:37 - 21:41]
can look at the

[21:39 - 21:44]
trace and we can see everything that

[21:41 - 21:46]
happened so we can see our retriever was

[21:44 - 21:49]
run these documents were

[21:46 - 21:53]
retrieved they get passed into our

[21:49 - 21:56]
LM and we get our final answer so this

[21:53 - 21:58]
kind of the end of our overview um where

[21:56 - 22:00]
we talked about I'll go back to the

[21:58 - 22:02]
slide here quickly we talked about

[22:00 - 22:04]
indexing retrieval and now

[22:02 - 22:06]
generation and follow-up short videos

[22:04 - 22:09]
we'll kind of dig into some of the more

[22:06 - 22:11]
com complex or detailed themes that

[22:09 - 22:14]
address some limitations that can arise

[22:11 - 22:17]
in this very simple pipeline

[22:14 - 22:18]
thanks hi my from Lang chain over the

[22:17 - 22:20]
next few videos we're going to be

[22:18 - 22:23]
talking about career

[22:20 - 22:24]
translation um and in this first video

[22:23 - 22:26]
we're going to cover the topic of

[22:24 - 22:29]
multi-query

[22:26 - 22:34]
so query translation sits kind of at the

[22:29 - 22:36]
first stage of an advanced rag Pipeline

[22:34 - 22:39]
and the goal of career translation is

[22:36 - 22:42]
really to take an input user question

[22:39 - 22:44]
and to translate in some way in order to

[22:42 - 22:47]
improve

[22:44 - 22:51]
retrieval so the problem statement is

[22:47 - 22:53]
pretty intuitive user queries um can be

[22:51 - 22:56]
ambiguous and if the query is poorly

[22:53 - 22:57]
written because we're typically doing

[22:56 - 23:01]
some kind of semantic similarity search

[22:57 - 23:02]
between the query and our documents if

[23:01 - 23:05]
the query is poorly written or ill

[23:02 - 23:07]
opposed we won't retrieve the proper

[23:05 - 23:10]
documents from our

[23:07 - 23:13]
index so there's a few approaches to

[23:10 - 23:15]
attack this problem and you can kind of

[23:13 - 23:17]
group them in a few different ways so

[23:15 - 23:19]
here's one way I like to think about it

[23:17 - 23:22]
a few approaches has involveed query

[23:19 - 23:23]
rewriting so taking a query and

[23:22 - 23:26]
reframing it like writing from a

[23:23 - 23:27]
different perspective um and that's what

[23:26 - 23:29]
we're going to talk about a little bit

[23:27 - 23:32]
here in depth using approaches like

[23:29 - 23:34]
multi-query or rag Fusion which we'll

[23:32 - 23:36]
talk about in the next video you can

[23:34 - 23:38]
also do things like take a question and

[23:36 - 23:40]
break it down to make it less abstract

[23:38 - 23:42]
like into sub questions and there's a

[23:40 - 23:44]
bunch of interesting papers focused on

[23:42 - 23:46]
that like least to most from

[23:44 - 23:48]
Google you can also take the opposite

[23:46 - 23:50]
approach of take a question to make it

[23:48 - 23:51]
more abstract uh and there's actually

[23:50 - 23:53]
approach we're going to talk about later

[23:51 - 23:56]
in a future video called stepback

[23:53 - 23:59]
prompting that focuses on like kind of

[23:56 - 24:03]
higher a higher level question from the

[23:59 - 24:05]
input so the intuition though for this

[24:03 - 24:06]
multier approach is we're taking a

[24:05 - 24:08]
question and we're going to break it

[24:06 - 24:10]
down into a few differently worded

[24:08 - 24:13]
questions uh from different

[24:10 - 24:17]
perspectives and the intuition here is

[24:13 - 24:21]
simply that um it is possible that the

[24:17 - 24:24]
way a question is initially worded once

[24:21 - 24:26]
embedded it is not well aligned or in

[24:24 - 24:27]
close proximity in this High dimensional

[24:26 - 24:30]
embedding space to a document that we

[24:27 - 24:32]
want to R that's actually related so the

[24:30 - 24:34]
thinking is that by kind of rewriting it

[24:32 - 24:36]
in a few different ways you actually

[24:34 - 24:37]
increase the likel of actually

[24:36 - 24:41]
retrieving the document that you really

[24:37 - 24:43]
want to um because of nuances in the way

[24:41 - 24:46]
that documents and questions are

[24:43 - 24:47]
embedded this kind of more shotgun

[24:46 - 24:50]
approach of taking a question Fanning it

[24:47 - 24:51]
out into a few different perspectives

[24:50 - 24:54]
May improve and increase the reliability

[24:51 - 24:56]
of retrieval that's like the intuition

[24:54 - 24:59]
really um and of course we can com

[24:56 - 25:01]
combine this with retrieval so we can

[24:59 - 25:03]
take our our kind of fan out questions

[25:01 - 25:06]
do retrieval on each one and combine

[25:03 - 25:07]
them in some way and perform rag so

[25:06 - 25:11]
that's kind of the overview and now

[25:07 - 25:13]
let's what let's go over to um our code

[25:11 - 25:14]
so this is a notebook and we're going to

[25:13 - 25:18]
share all

[25:14 - 25:21]
this um we're just installing a few

[25:18 - 25:22]
packages we're setting a lsmith API Keys

[25:21 - 25:25]
which we'll see why that's quite useful

[25:22 - 25:27]
here shortly there's our diagram now

[25:25 - 25:31]
first I'm going to Index this blog post

[25:27 - 25:32]
on agents I'm going to split it um well

[25:31 - 25:34]
I'm going to load it I'm going to split

[25:32 - 25:37]
it and then I'm going to index it in

[25:34 - 25:38]
chroma locally so this is a vector store

[25:37 - 25:41]
we've done this previously so now I have

[25:38 - 25:44]
my index defined so here is where I'm

[25:41 - 25:47]
defining my prompt for multiquery which

[25:44 - 25:48]
is your your assistant your task is to

[25:47 - 25:50]
basically reframe this question into a

[25:48 - 25:53]
few different sub

[25:50 - 25:56]
questions um so there's our

[25:53 - 26:01]
prompt um right here we'll pass that to

[25:56 - 26:02]
an llm part it um into a string and then

[26:01 - 26:04]
split the string by new lines and so

[26:02 - 26:06]
we'll get a list of questions out of

[26:04 - 26:09]
this chain that's really all we're doing

[26:06 - 26:11]
here now all we're doing is here's a

[26:09 - 26:13]
sample input question there's our

[26:11 - 26:15]
generate queries chain which we defined

[26:13 - 26:19]
we're going to take that list and then

[26:15 - 26:21]
simply apply each question to retriever

[26:19 - 26:22]
so we'll do retrieval per question and

[26:21 - 26:25]
this little function here is just going

[26:22 - 26:27]
to take the unique Union of documents uh

[26:25 - 26:29]
across all those retrievals so let's run

[26:27 - 26:32]
this and see what happens so we're going

[26:29 - 26:36]
to run this and we're going to get some

[26:32 - 26:37]
set of questions uh or documents back so

[26:36 - 26:39]
let's go to Langs Smith now we can

[26:37 - 26:42]
actually see what happened under the

[26:39 - 26:44]
hood so here's the key

[26:42 - 26:48]
point we ran our initial chain to

[26:44 - 26:51]
generate a set of of reframed questions

[26:48 - 26:52]
from our input and here was that prompt

[26:51 - 26:55]
and here is that set of questions that

[26:52 - 26:57]
we generated now what happened is for

[26:55 - 26:58]
every one of those questions we did an

[26:57 - 27:00]
independent retrieval that's what we're

[26:58 - 27:03]
showing here so that's kind of the first

[27:00 - 27:05]
step which is great now I can go back to

[27:03 - 27:07]
the notebook and we can show this

[27:05 - 27:09]
working end to end so now we're going to

[27:07 - 27:12]
take that retrieval chain we'll pass it

[27:09 - 27:14]
into context of our final rag prompt

[27:12 - 27:16]
we'll also pass through the question

[27:14 - 27:19]
we'll pass that to our rag prompt here

[27:16 - 27:21]
pass it to an LM and then Pary output

[27:19 - 27:24]
now let's let's kind of see how that

[27:21 - 27:26]
works so again that's okay there it is

[27:24 - 27:28]
so let's actually go into langth and see

[27:26 - 27:31]
what happened under the hood so this was

[27:28 - 27:33]
our final chain so this is great we took

[27:31 - 27:36]
our input question we broke it out to

[27:33 - 27:38]
these like five rephrase questions for

[27:36 - 27:41]
every one of those we did a retrieval

[27:38 - 27:42]
that's all great we then took the unique

[27:41 - 27:45]
Union of documents and you can see in

[27:42 - 27:46]
our final llm prompt answer the

[27:45 - 27:50]
following cont following question based

[27:46 - 27:52]
on the context this is the final set of

[27:50 - 27:54]
unique documents that we retrieved from

[27:52 - 27:57]
all of our sub

[27:54 - 27:59]
questions um here's our initial question

[27:57 - 28:00]
there's our answer so that kind of shows

[27:59 - 28:02]
you how you can set this up really

[28:00 - 28:04]
easily how you can use l Smith to kind

[28:02 - 28:06]
of investigate what's going on and in

[28:04 - 28:08]
particular use l Smith to investigate

[28:06 - 28:11]
those intermediate questions that you

[28:08 - 28:13]
generate in that like kind of question

[28:11 - 28:15]
generation phase and in a future talks

[28:13 - 28:17]
we're going to go through um some of

[28:15 - 28:18]
these other methods that we kind of

[28:17 - 28:20]
introduced at the start of this one

[28:18 - 28:23]
thank

[28:20 - 28:25]
you last L chain this is the second

[28:23 - 28:27]
video of our Deep dive on query

[28:25 - 28:30]
translation in our rag from scratch

[28:27 - 28:33]
series focused on a method called rag

[28:30 - 28:35]
Fusion so as we kind of showed before

[28:33 - 28:38]
career translation you can think of as

[28:35 - 28:40]
the first stage in an advanced rag

[28:38 - 28:42]
pipeline we're taking an input user

[28:40 - 28:44]
question and We're translating it some

[28:42 - 28:48]
way in order to improve

[28:44 - 28:50]
retrievable now we showed this General

[28:48 - 28:52]
mapping of approaches previously so

[28:50 - 28:54]
again you have kind of like rewriting so

[28:52 - 28:58]
you can take a question and like kind of

[28:54 - 29:00]
break it down into uh differently worded

[28:58 - 29:02]
are different different perspectives of

[29:00 - 29:04]
the same question so that's kind of

[29:02 - 29:06]
rewriting there's sub questions where

[29:04 - 29:08]
you take a question break it down into

[29:06 - 29:10]
smaller problems solve each one

[29:08 - 29:11]
independently and then there step back

[29:10 - 29:14]
where you take a question and kind of go

[29:11 - 29:16]
more abstract where you kind of ask a

[29:14 - 29:18]
higher level question as a precondition

[29:16 - 29:20]
to answer the user question so those are

[29:18 - 29:22]
the approaches and we're going to dig

[29:20 - 29:25]
into one of the particular approaches

[29:22 - 29:27]
for rewriting called rat Fusion now this

[29:25 - 29:28]
is really similar to what we just saw

[29:27 - 29:31]
with multiquery

[29:28 - 29:33]
the difference being we actually apply a

[29:31 - 29:36]
a kind of a clever rank ranking step of

[29:33 - 29:38]
our retriev documents um which you call

[29:36 - 29:41]
reciprocal rank Fusion that's really the

[29:38 - 29:44]
only difference the the input stage of

[29:41 - 29:47]
taking a question breaking it out into a

[29:44 - 29:50]
few kind of differently worded questions

[29:47 - 29:51]
retrieval on each one is all the same

[29:50 - 29:54]
and we're going to see that in the code

[29:51 - 29:56]
here shortly so let's just hop over

[29:54 - 29:59]
there and then look at this so again

[29:56 - 30:01]
here is a notebook that we introduced

[29:59 - 30:04]
previously here's the packages we've

[30:01 - 30:07]
installed we've set a few API keys for

[30:04 - 30:11]
lsmith which we see why is quite

[30:07 - 30:13]
useful um and you can kind of go down

[30:11 - 30:16]
here to a rag Fusion

[30:13 - 30:18]
section and the first thing you'll note

[30:16 - 30:19]
is what our prompt is so it looks really

[30:18 - 30:22]
similar to The Prompt we just saw with

[30:19 - 30:23]
multiquery and simply your helpful

[30:22 - 30:26]
assistant that generates multiple search

[30:23 - 30:30]
queries based upon user input and here's

[30:26 - 30:33]
the question output for queries so let's

[30:30 - 30:34]
define our prompt and here was our query

[30:33 - 30:37]
Generation chain again this looks a lot

[30:34 - 30:39]
like we just saw we take our prompt Plum

[30:37 - 30:42]
that into an llm and then basically

[30:39 - 30:46]
parse by new lines and that'll basically

[30:42 - 30:47]
split out these questions into a list

[30:46 - 30:51]
that's all it's going to happen here so

[30:47 - 30:52]
that's cool now here's where the novelty

[30:51 - 30:56]
comes

[30:52 - 30:58]
in each time we do retrieval from one of

[30:56 - 31:01]
those questions we're going to get back

[30:58 - 31:03]
a list of documents from our Retriever

[31:01 - 31:06]
and so we do it over that we generate

[31:03 - 31:07]
four questions here based on our prompt

[31:06 - 31:09]
we do the over four questions well like

[31:07 - 31:12]
a list of lists

[31:09 - 31:13]
basically now reciprocal rank Fusion is

[31:12 - 31:15]
really well suited for this exact

[31:13 - 31:17]
problem we want to take this list to

[31:15 - 31:20]
list and build a single Consolidated

[31:17 - 31:22]
list and really all that's going on is

[31:20 - 31:24]
it's looking at the documents in each

[31:22 - 31:28]
list and kind of aggregating them into a

[31:24 - 31:29]
final output ranking um and that's

[31:28 - 31:32]
really the intuition around what's

[31:29 - 31:32]
happening

[31:33 - 31:38]
here um so let's go ahead

[31:39 - 31:43]
and so

[31:46 - 31:53]
let's so let's go ahead and look at that

[31:49 - 31:55]
in some detail so we can see we

[31:53 - 31:57]
run

[31:55 - 32:00]
retrieval that's great now let's go over

[31:57 - 32:05]
to Lang Smith and have a look at what's

[32:00 - 32:06]
going on here so we can see that here

[32:05 - 32:08]
was our prompt to your helpful assistant

[32:06 - 32:10]
that generates multiple search queries

[32:08 - 32:14]
based on a single input and here is our

[32:10 - 32:16]
search queries and then here are our

[32:14 - 32:19]
four retrievals so that's that's really

[32:16 - 32:23]
good so we know that all is

[32:19 - 32:25]
working um and then those retrievals

[32:23 - 32:29]
simply went into this rank

[32:25 - 32:31]
function and our correspondingly ranked

[32:29 - 32:34]
to a final list of six unique rank

[32:31 - 32:37]
documents that's really all we

[32:34 - 32:41]
did so let's actually put that all

[32:37 - 32:43]
together into an a full rag chain that's

[32:41 - 32:47]
going to run

[32:43 - 32:50]
retrieval return that final list of rank

[32:47 - 32:53]
documents and pass it to our context

[32:50 - 32:56]
pass through our question send that to a

[32:53 - 32:58]
rag prompt pass it to an LM parse it to

[32:56 - 33:01]
an output and let's run all that

[32:58 - 33:05]
together and see that

[33:01 - 33:05]
working cool so there's our final

[33:07 - 33:13]
answer now let's have a look in lsmith

[33:10 - 33:15]
we can see here was our four questions

[33:13 - 33:18]
here's our retrievals and then our final

[33:15 - 33:22]
rag prompt plumed through the final list

[33:18 - 33:25]
of ranked six questions which we can see

[33:22 - 33:26]
laid out here and our final answer so

[33:25 - 33:29]
this can be really convenient

[33:26 - 33:32]
particularly if we're operating across

[33:29 - 33:34]
like maybe different Vector stores uh or

[33:32 - 33:36]
we want to do like retrieval across a

[33:34 - 33:38]
large number of of kind of differently

[33:36 - 33:41]
worded questions this reciprocal rank

[33:38 - 33:43]
Fusion step is really nice um for

[33:41 - 33:46]
example if we wanted to only take the

[33:43 - 33:47]
top three documents or something um it

[33:46 - 33:49]
can be really nice to build that

[33:47 - 33:52]
Consolidated ranking across all these

[33:49 - 33:54]
independent retrievals then pass that to

[33:52 - 33:55]
for the final generation so that's

[33:54 - 33:58]
really the intuition about what's

[33:55 - 34:00]
happening here thanks

[33:58 - 34:02]
hi this is Lance from Lang chain this is

[34:00 - 34:04]
our third video focused on query

[34:02 - 34:06]
translation in the rag from scratch

[34:04 - 34:07]
series and we're going to be talking

[34:06 - 34:09]
about

[34:07 - 34:11]
decomposition so query translation in

[34:09 - 34:13]
general is a set of approaches that sits

[34:11 - 34:16]
kind of towards the front of this

[34:13 - 34:18]
overall rag Pipeline and the objective

[34:16 - 34:21]
is to modify or rewrite or otherwise

[34:18 - 34:24]
decompose an input question from a user

[34:21 - 34:26]
in order improve

[34:24 - 34:28]
retrieval so we can talk through some of

[34:26 - 34:30]
these approaches previously in

[34:28 - 34:32]
particular various ways to do query

[34:30 - 34:34]
writing like rag fusion and multiquery

[34:32 - 34:35]
there's a separate set of techniques

[34:34 - 34:37]
that become pretty popular and are

[34:35 - 34:39]
really interesting for certain problems

[34:37 - 34:41]
which we might call like kind of

[34:39 - 34:43]
breaking down or decomposing an input

[34:41 - 34:46]
question into a set of sub

[34:43 - 34:49]
questions um so some of the papers here

[34:46 - 34:50]
that are are pretty cool are for example

[34:49 - 34:54]
this work from

[34:50 - 34:57]
Google um and the objective really is

[34:54 - 35:00]
first to take an input question and

[34:57 - 35:02]
decompose it into a set of sub problems

[35:00 - 35:07]
so this particular example from the

[35:02 - 35:10]
paper was the problem of um last letter

[35:07 - 35:13]
concatenation and so it took the inut

[35:10 - 35:15]
question of three words think machine

[35:13 - 35:17]
learning and broke it down into three

[35:15 - 35:19]
sub problems think think machine think

[35:17 - 35:20]
machine learning as the third sub

[35:19 - 35:23]
problem and then you can see in this

[35:20 - 35:25]
bottom panel it solves each one

[35:23 - 35:28]
individually so it shows for example in

[35:25 - 35:30]
green solving the problem think machine

[35:28 - 35:32]
where you can catenate the last letter

[35:30 - 35:36]
of k with the last letter of machine or

[35:32 - 35:39]
last letter think K less machine e can

[35:36 - 35:43]
concatenate those to K and then for the

[35:39 - 35:45]
overall problem taking that solution and

[35:43 - 35:47]
then and basically building on it to get

[35:45 - 35:50]
the overall solution of keg so that's

[35:47 - 35:52]
kind of one concept of decomposing into

[35:50 - 35:55]
sub problems solving them

[35:52 - 35:58]
sequentially now a related work called

[35:55 - 36:01]
IRC or in leap retrieval combines

[35:58 - 36:03]
retrieval with Chain of Thought

[36:01 - 36:05]
reasoning and so you can kind of put

[36:03 - 36:08]
these together into one approach which

[36:05 - 36:11]
you can think of as kind of dynamically

[36:08 - 36:13]
retrieval um to solve a set of sub

[36:11 - 36:15]
problems kind of that retrieval kind of

[36:13 - 36:19]
interleaving with Chain of Thought as

[36:15 - 36:21]
noted in the second paper and a set of

[36:19 - 36:23]
decomposed questions based on your

[36:21 - 36:25]
initial question from the first work

[36:23 - 36:28]
from Google so really the idea here is

[36:25 - 36:29]
we're taking one sub question we're

[36:28 - 36:31]
answering it we're taking that answer

[36:29 - 36:34]
and using it to help answer the second

[36:31 - 36:35]
sub question and so forth so let's

[36:34 - 36:37]
actually just walk through this in code

[36:35 - 36:40]
to show how this might

[36:37 - 36:42]
work so this is The Notebook we've been

[36:40 - 36:43]
working with from some of the other uh

[36:42 - 36:47]
videos you can see we already have a

[36:43 - 36:49]
retriever to find uh up here at the top

[36:47 - 36:52]
and what we're going to do

[36:49 - 36:54]
is we're first going to find a prompt

[36:52 - 36:57]
that's basically going to say given an

[36:54 - 36:59]
input question let's break it down to

[36:57 - 37:01]
set of sub problems or sub question

[36:59 - 37:03]
which can be solved individually so we

[37:01 - 37:05]
can do that and this blog post is

[37:03 - 37:06]
focused on agents so let's ask a

[37:05 - 37:08]
question about what are the main

[37:06 - 37:13]
components of an LM powerered autonomous

[37:08 - 37:16]
agent system so let's run this and

[37:13 - 37:18]
see what the decomposed questions are so

[37:16 - 37:21]
you can see the decomposed questions are

[37:18 - 37:23]
what is LM technology how does it work

[37:21 - 37:25]
um what are components and then how the

[37:23 - 37:27]
components interact so it's kind of a

[37:25 - 37:28]
sane way to kind of break down this

[37:27 - 37:32]
problem into a few sub problems which

[37:28 - 37:35]
you might attack individually now here's

[37:32 - 37:38]
where um we Define a prompt that very

[37:35 - 37:40]
simply is going to take our question

[37:38 - 37:42]
we'll take any prior questions we've

[37:40 - 37:45]
answered and we'll take our retrieval

[37:42 - 37:47]
and basically just combine them and we

[37:45 - 37:49]
can Define this very simple

[37:47 - 37:52]
chain um actually let's go back and make

[37:49 - 37:56]
sure retriever is defined up at the

[37:52 - 37:59]
top so now we are building our

[37:56 - 38:02]
retriever good we have that now so we

[37:59 - 38:03]
can go back down here and let's run this

[38:02 - 38:06]
so

[38:03 - 38:10]
now we are

[38:06 - 38:12]
running and what's happening is we're

[38:10 - 38:15]
trying to solve each of these questions

[38:12 - 38:18]
individually using retrieval and using

[38:15 - 38:20]
any prior question answers so okay very

[38:18 - 38:23]
good looks like that's been done and we

[38:20 - 38:25]
can see here's our answer now let's go

[38:23 - 38:27]
over to langth and actually see what

[38:25 - 38:28]
happened under the hood so here's what's

[38:27 - 38:31]
kind of of interesting and helpful to

[38:28 - 38:33]
see for the first question so here's our

[38:31 - 38:36]
first one it looks like it just does

[38:33 - 38:37]
retrieval which is we expect and then it

[38:36 - 38:40]
uses that to answer this initial

[38:37 - 38:42]
question now for the second question

[38:40 - 38:44]
should be a little bit more interesting

[38:42 - 38:47]
because if you look at our prompt here's

[38:44 - 38:49]
our question now here is our background

[38:47 - 38:51]
available question answer pair so this

[38:49 - 38:52]
was the answer question answer pair from

[38:51 - 38:55]
the first question which we add to our

[38:52 - 38:56]
prompt and then here's the retrieval for

[38:55 - 38:58]
this particular question so we're kind

[38:56 - 39:00]
of building up up the solution because

[38:58 - 39:03]
we're pending the question answer pair

[39:00 - 39:05]
from question one and then likewise with

[39:03 - 39:08]
question three it should combine all of

[39:05 - 39:10]
that so we can look at here here's our

[39:08 - 39:14]
question here's question one here's

[39:10 - 39:16]
question two great now here's additional

[39:14 - 39:18]
retrieval related to this particular

[39:16 - 39:20]
question and we get our final answer so

[39:18 - 39:23]
that's like a really nice way you can

[39:20 - 39:24]
kind of build up Solutions um using this

[39:23 - 39:26]
kind of

[39:24 - 39:29]
interleaved uh retrieval and

[39:26 - 39:31]
concatenating question answer pairs I do

[39:29 - 39:33]
want to mention very briefly that we can

[39:31 - 39:36]
also take a different approach where we

[39:33 - 39:37]
can just answer these all individually

[39:36 - 39:39]
and then just concatenate all those

[39:37 - 39:43]
answers to produce a final answer and

[39:39 - 39:44]
I'll show that really quickly here um

[39:43 - 39:46]
it's like a little bit less interesting

[39:44 - 39:50]
maybe because you're not using answers

[39:46 - 39:51]
from each uh question to inform the next

[39:50 - 39:53]
one you're just answering them all in

[39:51 - 39:55]
parallel this might be better for cases

[39:53 - 39:57]
where it's not really like a sub

[39:55 - 40:00]
question decomposition but maybe it's

[39:57 - 40:02]
like like a set of set of several in

[40:00 - 40:04]
independent questions whose answers

[40:02 - 40:05]
don't depend on each other that might be

[40:04 - 40:08]
relevant for some

[40:05 - 40:11]
problems um and we can go ahead and run

[40:08 - 40:12]
okay so this ran as well we can look at

[40:11 - 40:14]
our

[40:12 - 40:16]
trace and in this

[40:14 - 40:19]
case um yeah we can see that this

[40:16 - 40:22]
actually just kind of concatenates all

[40:19 - 40:24]
of our QA pairs to produce the final

[40:22 - 40:27]
answer so this gives you a sense for how

[40:24 - 40:28]
you can use quer decomposition employ

[40:27 - 40:32]
IDE IDE from uh from two different

[40:28 - 40:34]
papers that are pretty cool thanks hi

[40:32 - 40:37]
this is Lance from Lang chain this is

[40:34 - 40:39]
the fourth video uh in our Deep dive on

[40:37 - 40:40]
queer translation in the rag from

[40:39 - 40:42]
scratch series and we're going to be

[40:40 - 40:45]
focused on step back

[40:42 - 40:48]
prompting so queer translation as we

[40:45 - 40:51]
said in some of the prior videos kind of

[40:48 - 40:56]
sits at the the kind of first stage of

[40:51 - 40:58]
kind of a a a rag pipeline or flow and

[40:56 - 41:00]
the main aim is to take an question and

[40:58 - 41:02]
to translate it or modify in such a way

[41:00 - 41:04]
that it improves

[41:02 - 41:07]
retrieval now we talked through a few

[41:04 - 41:08]
different ways to approach this problem

[41:07 - 41:10]
so one General approach involves

[41:08 - 41:12]
rewriting a question and we talk about

[41:10 - 41:14]
two ways to do that rag fusion

[41:12 - 41:16]
multiquery and again this is this is

[41:14 - 41:19]
really about taking a question and

[41:16 - 41:21]
modifying it to capture a few different

[41:19 - 41:22]
perspectives um which may improve the

[41:21 - 41:25]
retrieval

[41:22 - 41:26]
process now another approach is to take

[41:25 - 41:29]
a question and kind of make it less

[41:26 - 41:31]
abstract like break it down into sub

[41:29 - 41:32]
questions um and then solve each of

[41:31 - 41:35]
those independently so that's what we

[41:32 - 41:37]
saw with like least to most prompting um

[41:35 - 41:42]
and a bunch of other variants kind of in

[41:37 - 41:44]
that in that vein of sub problem solving

[41:42 - 41:45]
and then consolidating those Solutions

[41:44 - 41:48]
into a final

[41:45 - 41:52]
answer now a different approach

[41:48 - 41:55]
presented um by again Google as well is

[41:52 - 41:57]
stepback prompting so stepback prompting

[41:55 - 42:00]
kind of takes the the the opposite

[41:57 - 42:04]
approach where it tries to ask a more

[42:00 - 42:05]
abstract question so the paper talks a

[42:04 - 42:09]
lot

[42:05 - 42:12]
about um using F shot

[42:09 - 42:15]
prompting to produce what they call the

[42:12 - 42:17]
stepback or more abstract questions and

[42:15 - 42:19]
the way it does it is it provides a

[42:17 - 42:22]
number of

[42:19 - 42:24]
examples of stepb back questions given

[42:22 - 42:26]
your original question so like this is

[42:24 - 42:27]
like this is for example they like for

[42:26 - 42:29]
prompt temp

[42:27 - 42:30]
you're an expert World Knowledge I asked

[42:29 - 42:32]
you a question your response should be

[42:30 - 42:35]
comprehensive not contradict with the

[42:32 - 42:38]
following um and this is kind of where

[42:35 - 42:43]
you provide your like original and then

[42:38 - 42:46]
step back so here's like some example um

[42:43 - 42:50]
questions so like um

[42:46 - 42:53]
like uh at year saw the creation of the

[42:50 - 42:54]
region where the country is located

[42:53 - 42:58]
which region of the

[42:54 - 43:01]
country um is the county of of herir

[42:58 - 43:04]
related um Janell was born in what

[43:01 - 43:05]
country what is janell's personal

[43:04 - 43:07]
history so that that's maybe a more

[43:05 - 43:09]
intuitive example so it's like you ask a

[43:07 - 43:11]
very specific question about like the

[43:09 - 43:12]
country someone's born the more abstract

[43:11 - 43:14]
question is like just give me the

[43:12 - 43:16]
general history of this individual

[43:14 - 43:21]
without worrying about that particular

[43:16 - 43:22]
um more specific question um so let's

[43:21 - 43:25]
actually just walk through how this can

[43:22 - 43:28]
be done in practice um so again here's

[43:25 - 43:31]
kind of like a a diagram of uh the

[43:28 - 43:32]
various approaches um from less

[43:31 - 43:35]
abstraction to more

[43:32 - 43:38]
abstraction now here is where we're

[43:35 - 43:40]
formulating our prompt using a few of

[43:38 - 43:45]
the few shot examples from the

[43:40 - 43:46]
paper um so again like input um yeah

[43:45 - 43:48]
something about like the police perform

[43:46 - 43:51]
wful arrests and what what camp members

[43:48 - 43:54]
of the police do so like it it basically

[43:51 - 43:56]
gives the model a few examples um we

[43:54 - 43:58]
basically formulate this into a prompt

[43:56 - 44:02]
that's really all going on here again we

[43:58 - 44:04]
we repeat um this overall prompt which

[44:02 - 44:06]
we saw from the paper your expert World

[44:04 - 44:08]
Knowledge your test is to step back and

[44:06 - 44:10]
paraphrase a question generate more a

[44:08 - 44:12]
generic step back question which is

[44:10 - 44:16]
easier to answer here are some examples

[44:12 - 44:18]
so it's like a very intuitive prompt so

[44:16 - 44:21]
okay let's start with the question what

[44:18 - 44:23]
is Task composition for llm agents and

[44:21 - 44:24]
we're going to say generate stack

[44:23 - 44:26]
question okay so this is pretty

[44:24 - 44:28]
intuitive right what is a process of

[44:26 - 44:30]
task compos I so like not worrying as

[44:28 - 44:33]
much about agents but what is that

[44:30 - 44:36]
process of task composition in general

[44:33 - 44:39]
and then hopefully that can be

[44:36 - 44:41]
independently um retrieved we we can

[44:39 - 44:43]
independently retrieve documents related

[44:41 - 44:45]
to the stepb back question and in

[44:43 - 44:47]
addition retrieve documents related to

[44:45 - 44:49]
the the actual question and combine

[44:47 - 44:52]
those to produce kind of final answer so

[44:49 - 44:53]
that's really all that's going on um and

[44:52 - 44:57]
here's the response template where we're

[44:53 - 45:00]
Plumbing in the stepback context and our

[44:57 - 45:01]
question context and so what we're going

[45:00 - 45:04]
to do here is we're going to take our

[45:01 - 45:06]
input question and perform retrieval on

[45:04 - 45:07]
that we're also going to generate our

[45:06 - 45:10]
stepb back question and perform

[45:07 - 45:13]
retrieval on that we're going to plumb

[45:10 - 45:15]
those into the prompt as here's our very

[45:13 - 45:19]
here's our basically uh our prompt Keys

[45:15 - 45:21]
normal question step back question um

[45:19 - 45:23]
and our overall question again we

[45:21 - 45:29]
formulate those as a dict we Plum those

[45:23 - 45:31]
into our response prompt um and then we

[45:29 - 45:33]
go ahead and attempt to answer our

[45:31 - 45:35]
overall question so we're going to run

[45:33 - 45:38]
that that's

[45:35 - 45:41]
running and okay we have our answer now

[45:38 - 45:45]
I want to hop over to Langs Smith and

[45:41 - 45:48]
attempt to show you um kind of what that

[45:45 - 45:51]
looked like under the hood so let's see

[45:48 - 45:53]
let's like go into each of these steps

[45:51 - 45:55]
so here was our prompt right you're an

[45:53 - 45:58]
expert World Knowledge your test to to

[45:55 - 46:03]
step back and paraph as a question

[45:58 - 46:06]
um so um here were our few shot prompts

[46:03 - 46:08]
and this was our this was our uh stepb

[46:06 - 46:12]
question so what is the process of task

[46:08 - 46:14]
composition um good from the input what

[46:12 - 46:16]
is Tas composition for LM agents we

[46:14 - 46:17]
perform retrieval on both what is

[46:16 - 46:20]
process

[46:17 - 46:23]
composition uh and what is for LM agents

[46:20 - 46:27]
we perform both retrievals we then

[46:23 - 46:29]
populate our prompt with both

[46:27 - 46:31]
uh original question answer and then

[46:29 - 46:33]
here's the context retrieve from both

[46:31 - 46:35]
the question and the stepb back question

[46:33 - 46:38]
here was our final answer so again this

[46:35 - 46:41]
is kind of a nice technique um probably

[46:38 - 46:43]
depends on a lot of the types of like

[46:41 - 46:47]
the type of domain you want to perform

[46:43 - 46:48]
retrieval on um but in some domains

[46:47 - 46:52]
where for example there's a lot of kind

[46:48 - 46:54]
of conceptual knowledge that underpins

[46:52 - 46:55]
questions you expect users to ask this

[46:54 - 46:59]
stepback approach could be really

[46:55 - 47:02]
convenient to automatically formulate a

[46:59 - 47:04]
higher level question um to for example

[47:02 - 47:05]
try to improve retrieval I can imagine

[47:04 - 47:07]
if you're working with like kind of

[47:05 - 47:10]
textbooks or like technical

[47:07 - 47:12]
documentation where you make independent

[47:10 - 47:15]
chapters focused on more highlevel kind

[47:12 - 47:18]
of like Concepts and then other chapters

[47:15 - 47:19]
on like more detailed uh like

[47:18 - 47:22]
implementations this kind of like stepb

[47:19 - 47:25]
back approach and independent retrieval

[47:22 - 47:27]
could be really helpful thanks hi this

[47:25 - 47:29]
is Lance from Lang chain

[47:27 - 47:31]
this is the fifth video focused on queer

[47:29 - 47:33]
translation in our rack from scratch

[47:31 - 47:34]
series we're going to be talking about a

[47:33 - 47:37]
technique called

[47:34 - 47:39]
hide so again queer translation sits

[47:37 - 47:41]
kind of at the front of the overall rag

[47:39 - 47:43]
flow um and the objective is to take an

[47:41 - 47:46]
input question and translate it in some

[47:43 - 47:49]
way that improves

[47:46 - 47:51]
retrieval now hide is an interesting

[47:49 - 47:55]
approach that takes advantage of a very

[47:51 - 47:57]
simple idea the basic rag flow takes a

[47:55 - 48:00]
question and embeds it takes a document

[47:57 - 48:02]
and embeds it and looks for similarity

[48:00 - 48:04]
between an embedded document and

[48:02 - 48:06]
embedded question but questions and

[48:04 - 48:08]
documents are very different text

[48:06 - 48:11]
objects so documents can be like very

[48:08 - 48:14]
large chunks taken from dense um

[48:11 - 48:16]
Publications or other sources whereas

[48:14 - 48:19]
questions are short kind of tur

[48:16 - 48:22]
potentially ill worded from users and

[48:19 - 48:25]
the intuition behind hide is take

[48:22 - 48:28]
questions and map them into document

[48:25 - 48:31]
space using a hypothetical document or

[48:28 - 48:34]
by generating a hypothetical document um

[48:31 - 48:36]
that's the basic intuition and the idea

[48:34 - 48:38]
kind of shown here visually is that in

[48:36 - 48:41]
principle for certain cases a

[48:38 - 48:42]
hypothetical document is closer to a

[48:41 - 48:45]
desired document you actually want to

[48:42 - 48:47]
retrieve in this you know High

[48:45 - 48:50]
dimensional embedding space than the

[48:47 - 48:52]
sparse raw input question itself so

[48:50 - 48:54]
again it's just kind of means of trans

[48:52 - 48:57]
translating raw questions into these

[48:54 - 48:58]
hypothetical documents that are better

[48:57 - 49:00]
suited for

[48:58 - 49:02]
retrieval so let's actually do a Code

[49:00 - 49:04]
walkthrough to see how this works and

[49:02 - 49:06]
it's actually pretty easy to implement

[49:04 - 49:08]
which is really nice so first we're just

[49:06 - 49:09]
starting with a prompt and we're using

[49:08 - 49:12]
the same notebook that we've used for

[49:09 - 49:15]
prior videos we have a blog post on

[49:12 - 49:17]
agents r index um so what we're going to

[49:15 - 49:19]
do is Define a prompt to generate a

[49:17 - 49:22]
hypothetical documents in this case

[49:19 - 49:25]
we'll say write a write a paper passage

[49:22 - 49:26]
uh to answer a given question so let's

[49:25 - 49:29]
just run this and see what happens again

[49:26 - 49:32]
we're taking our prompt piping it to to

[49:29 - 49:34]
open Ai chck gpte and then using string

[49:32 - 49:38]
Opa parer and so here's a hypothetical

[49:34 - 49:40]
document section related to our question

[49:38 - 49:43]
okay and this is derived of course lm's

[49:40 - 49:45]
kind of embedded uh kind of World

[49:43 - 49:48]
Knowledge which is you know a sane place

[49:45 - 49:50]
to generate hypothetical documents now

[49:48 - 49:52]
let's now take that hypothetical

[49:50 - 49:54]
document and basically we're going to

[49:52 - 49:56]
pipe that into a retriever so this means

[49:54 - 49:59]
we're going to fetch documents from our

[49:56 - 50:01]
index related to this hypothetical

[49:59 - 50:04]
document that's been embedded and you

[50:01 - 50:08]
can see we get a few qu a few retrieved

[50:04 - 50:11]
uh chunks that are related to uh this

[50:08 - 50:15]
hypothetical document that's all we've

[50:11 - 50:17]
done um and then let's take the final

[50:15 - 50:19]
step where we take those retrieve

[50:17 - 50:22]
documents here which we

[50:19 - 50:25]
defined and our question we're going to

[50:22 - 50:27]
pipe that into this rag prompt and then

[50:25 - 50:29]
we're going to run our kind of rag chain

[50:27 - 50:32]
right here which you've seen before and

[50:29 - 50:33]
we get our answer so that's really it we

[50:32 - 50:37]
can go to lsmith and we can actually

[50:33 - 50:43]
look at what happened um so here for

[50:37 - 50:44]
example this was our final um rag prompt

[50:43 - 50:47]
answer the following question based on

[50:44 - 50:48]
this context and here is the retrieve

[50:47 - 50:50]
documents that we passed in so that

[50:48 - 50:55]
part's kind of straightforward we can

[50:50 - 50:57]
also look at um okay this is our

[50:55 - 51:01]
retrieval okay now this is this is

[50:57 - 51:05]
actually what we we generated a

[51:01 - 51:08]
hypothetical document here um okay so

[51:05 - 51:10]
this is our hypothetical document so

[51:08 - 51:12]
we've run chat open AI we generated this

[51:10 - 51:13]
passage with our hypothetical document

[51:12 - 51:15]
and then we've run

[51:13 - 51:17]
retrieval here so this is basically

[51:15 - 51:21]
showing hypothetical document generation

[51:17 - 51:24]
followed by retrieval um so again here

[51:21 - 51:25]
was our passage which we passed in and

[51:24 - 51:27]
then here's our retrieve documents from

[51:25 - 51:30]
the retriever which are related to the

[51:27 - 51:32]
passage content so again in this

[51:30 - 51:34]
particular index case it's possible that

[51:32 - 51:36]
the input question was sufficient to

[51:34 - 51:38]
retrieve these documents in fact given

[51:36 - 51:39]
prior examples uh I know that some of

[51:38 - 51:42]
these same documents are indeed

[51:39 - 51:44]
retrieved just from the raw question but

[51:42 - 51:46]
in other context it may not be the case

[51:44 - 51:49]
so folks have reported nice performance

[51:46 - 51:52]
using Hyde uh for certain domains and

[51:49 - 51:55]
the Really convenient thing is that you

[51:52 - 51:57]
can take this this document generation

[51:55 - 51:59]
prompt you can tune this arbitrarily for

[51:57 - 52:01]
your domain of Interest so it's

[51:59 - 52:03]
absolutely worth experimenting with it's

[52:01 - 52:04]
a it's a need approach uh that can

[52:03 - 52:08]
overcome some of the challenges with

[52:04 - 52:10]
retrieval uh thanks very much hi this is

[52:08 - 52:12]
Lance from Lang chain this is the 10th

[52:10 - 52:13]
video in our rack from scratch series

[52:12 - 52:16]
focused on

[52:13 - 52:17]
routing so we talk through query

[52:16 - 52:19]
translation which is the process of

[52:17 - 52:21]
taking a question and translating in

[52:19 - 52:24]
some way it could be decomposing it

[52:21 - 52:26]
using stepback prompting or otherwise

[52:24 - 52:27]
but the idea here was take our question

[52:26 - 52:30]
change it into a form that's better

[52:27 - 52:32]
suited for retrieval now routing is the

[52:30 - 52:35]
next step which is basically routing

[52:32 - 52:37]
that potentially decomposed question to

[52:35 - 52:38]
the right source and in many cases that

[52:37 - 52:40]
could be a different database so let's

[52:38 - 52:43]
say in this toy example we have a vector

[52:40 - 52:45]
store a relational DB and a graph DB the

[52:43 - 52:47]
what we redo with routing is we simply

[52:45 - 52:50]
route the question based upon the cont

[52:47 - 52:52]
of the question to the relevant data

[52:50 - 52:54]
source so there's a few different ways

[52:52 - 52:56]
to do that one is what we call logical

[52:54 - 52:59]
routing in this case we basically give

[52:56 - 53:02]
an llm knowledge of the various data

[52:59 - 53:04]
sources that we have at our disposal and

[53:02 - 53:07]
we let the llm kind of Reason about

[53:04 - 53:09]
which one to apply the question to so

[53:07 - 53:11]
it's kind of like the the LM is applying

[53:09 - 53:13]
some logic to determine you which which

[53:11 - 53:15]
data sour for example to to use

[53:13 - 53:17]
alternatively you can use semantic

[53:15 - 53:19]
routing which is where we take a

[53:17 - 53:22]
question we embed it and for example we

[53:19 - 53:24]
embed prompts we then compute the

[53:22 - 53:27]
similarity between our question and

[53:24 - 53:29]
those prompts and then we choose a

[53:27 - 53:31]
prompt based upon the similarity so the

[53:29 - 53:33]
general idea is in our diagram we talk

[53:31 - 53:35]
about routing to for example a different

[53:33 - 53:37]
database but it can be very general can

[53:35 - 53:40]
be routing to different prompt it can be

[53:37 - 53:41]
you know really arbitrarily taking this

[53:40 - 53:43]
question and sending it at different

[53:41 - 53:44]
places be at different prompts be at

[53:43 - 53:46]
different Vector

[53:44 - 53:48]
stores so let's walk through the code a

[53:46 - 53:51]
little bit so you can see just like

[53:48 - 53:54]
before we've done a few pip installs we

[53:51 - 53:57]
set up lsmith and let's talk through uh

[53:54 - 54:00]
logical routing first so so in this toy

[53:57 - 54:02]
example let's say we had for example uh

[54:00 - 54:05]
three different docs like we had python

[54:02 - 54:07]
docs we had JS docs we had goang docs

[54:05 - 54:10]
what we want to do is take a question

[54:07 - 54:11]
route it to one of those three so what

[54:10 - 54:15]
we're actually doing is we're setting up

[54:11 - 54:19]
a data model which is basically going to

[54:15 - 54:23]
U be bound to our llm and allow the llm

[54:19 - 54:26]
to Output one of these three options as

[54:23 - 54:27]
a structured object so you really think

[54:26 - 54:29]
about this as like

[54:27 - 54:31]
classification classification plus

[54:29 - 54:33]
function calling to produce a structured

[54:31 - 54:34]
output which is constrained to these

[54:33 - 54:37]
three

[54:34 - 54:39]
possibilities so the way we do that is

[54:37 - 54:41]
let's just zoom in here a little bit we

[54:39 - 54:44]
can Define like a structured object that

[54:41 - 54:46]
we want to get out from our llm like in

[54:44 - 54:49]
this case we want for example you know

[54:46 - 54:52]
one of these three data sources to be

[54:49 - 54:54]
output we can take this and we can

[54:52 - 54:57]
actually convert it into open like open

[54:54 - 54:58]
for example function schema

[54:57 - 55:01]
and then we actually pass that in and

[54:58 - 55:04]
bind it to our llm so what happens is we

[55:01 - 55:07]
ask a question our llm invokes this

[55:04 - 55:09]
function on the output to produce an

[55:07 - 55:12]
output that adheres to the schema that

[55:09 - 55:15]
we specify so in this case for example

[55:12 - 55:17]
um we output like you know in this toy

[55:15 - 55:19]
example let's say we wanted like you

[55:17 - 55:22]
know an output to be data source Vector

[55:19 - 55:23]
store or SQL database the output will

[55:22 - 55:25]
contain a data source object and it'll

[55:23 - 55:28]
be you know one of the options we

[55:25 - 55:32]
specify as a Json string we also

[55:28 - 55:35]
instantiate a parser from this object to

[55:32 - 55:37]
parse that Json string to an output like

[55:35 - 55:39]
a pantic object for example so that's

[55:37 - 55:41]
just one toy example and let's show one

[55:39 - 55:46]
up here so in this case again we had our

[55:41 - 55:49]
three doc sources um we bind that to our

[55:46 - 55:51]
llm so you can see we do with structured

[55:49 - 55:54]
output basically under the hood that's

[55:51 - 55:55]
taking that object definition turning

[55:54 - 55:58]
into function schema and binding that

[55:55 - 56:00]
function schema to our llm and we call

[55:58 - 56:03]
our prompt you're an expert at routing a

[56:00 - 56:05]
user question based on you know

[56:03 - 56:08]
programming language um that user

[56:05 - 56:10]
referring to so let's define our router

[56:08 - 56:14]
here now what we're going to do is we'll

[56:10 - 56:16]
ask a question that is python code so

[56:14 - 56:18]
we'll call that and now it's done and

[56:16 - 56:20]
you see the object we get out is indeed

[56:18 - 56:22]
it's a route query object so it's

[56:20 - 56:26]
exactly it aderes to this data model

[56:22 - 56:27]
we've set up and in this case it's it's

[56:26 - 56:29]
it's correct so it's calling this python

[56:27 - 56:33]
doc so you can we can extract that right

[56:29 - 56:35]
here as a string now once we have this

[56:33 - 56:37]
you can really easily set up like a

[56:35 - 56:39]
route so this could be like our full

[56:37 - 56:41]
chain where we take this router we

[56:39 - 56:44]
should defined here and then this choose

[56:41 - 56:46]
route function can basically take that

[56:44 - 56:49]
output and do something with it so for

[56:46 - 56:51]
example if python docs this could then

[56:49 - 56:55]
apply the question to like a retriever

[56:51 - 56:57]
full of python information uh or JS same

[56:55 - 56:59]
thing so this is where you would hook

[56:57 - 57:02]
basically that question up to different

[56:59 - 57:04]
chains that are like you know retriever

[57:02 - 57:06]
chain one for python retriever chain two

[57:04 - 57:08]
for JS and so forth so this is kind of

[57:06 - 57:10]
like the routing mechanism but this is

[57:08 - 57:12]
really doing the heavy lifting of taking

[57:10 - 57:14]
an input question and turning into a

[57:12 - 57:18]
structured object that restricts the

[57:14 - 57:20]
output to one of a few output types that

[57:18 - 57:22]
we care about in our like routing

[57:20 - 57:23]
problem so that's really kind of the way

[57:22 - 57:26]
this all hooks

[57:23 - 57:27]
together now semantic outing is actually

[57:26 - 57:29]
maybe even a little bit more

[57:27 - 57:32]
straightforward based on what we've seen

[57:29 - 57:33]
previously so in that case let's say we

[57:32 - 57:35]
have two prompts we have a physics

[57:33 - 57:38]
prompt we have a math

[57:35 - 57:41]
prompt we can embed those prompts no

[57:38 - 57:43]
problem we do that here now let's say we

[57:41 - 57:45]
have an input question from a user like

[57:43 - 57:47]
in this case what is a black hole we

[57:45 - 57:49]
pass that through we then apply this

[57:47 - 57:51]
runnable Lambda function which is

[57:49 - 57:53]
defined right here what we're doing here

[57:51 - 57:54]
is we're embedding the question we're

[57:53 - 57:57]
Computing similarity between the

[57:54 - 58:00]
question and the prompts uh we're taking

[57:57 - 58:02]
the most similar and then we're

[58:00 - 58:03]
basically choosing the prompt based on

[58:02 - 58:05]
that similarity and you can see let's

[58:03 - 58:07]
run that and try it

[58:05 - 58:09]
out and we're using the physics prompt

[58:07 - 58:11]
and there we go black holes region and

[58:09 - 58:15]
space so that just shows you kind of how

[58:11 - 58:17]
you can use semantic routing uh to

[58:15 - 58:19]
basically embed a question embed for

[58:17 - 58:22]
example various prompts pick the prompt

[58:19 - 58:23]
based on sematic similarity so that

[58:22 - 58:25]
really gives you just two ways to do

[58:23 - 58:27]
routing one is logical routing with

[58:25 - 58:29]
function in uh can be used very

[58:27 - 58:31]
generally in this case we applied it to

[58:29 - 58:33]
like different coding languages but

[58:31 - 58:36]
imagine these could be swapped out for

[58:33 - 58:38]
like you know my python uh my like

[58:36 - 58:42]
vector store versus My Graph DB versus

[58:38 - 58:43]
my relational DB and you could just very

[58:42 - 58:46]
simply have some description of what

[58:43 - 58:49]
each is and you know then not only will

[58:46 - 58:52]
the llm do reasoning but it'll also

[58:49 - 58:54]
return an object uh that can be parsed

[58:52 - 58:56]
very cleanly to produce like one of a

[58:54 - 58:59]
few very specific types which then you

[58:56 - 59:01]
can reason over like we did here in your

[58:59 - 59:02]
routing function so that kind of gives

[59:01 - 59:05]
you the general idea and these are

[59:02 - 59:07]
really very useful tools and I encourage

[59:05 - 59:10]
you to experiment with them

[59:07 - 59:12]
thanks hi this is Lance from Lang chain

[59:10 - 59:15]
this is the 11th part of our rag from

[59:12 - 59:17]
scratch video series focused on query

[59:15 - 59:19]
construction so we previously talked

[59:17 - 59:21]
through uh query translation which is

[59:19 - 59:24]
the process of taking a question and

[59:21 - 59:25]
converting it or translating it into a

[59:24 - 59:27]
question that's better optimized for

[59:25 - 59:29]
retrieval then we talked about routing

[59:27 - 59:30]
which is the process of going taking

[59:29 - 59:33]
that question routing it to the right

[59:30 - 59:37]
Source be it a given Vector store graph

[59:33 - 59:38]
DB um or SQL DB for example now we're

[59:37 - 59:40]
going to talk about the process of query

[59:38 - 59:42]
construction which is basically taking

[59:40 - 59:45]
natural language and converting it into

[59:42 - 59:47]
particular domain specific language uh

[59:45 - 59:49]
for one of these sources now we're going

[59:47 - 59:52]
to talk specifically about the process

[59:49 - 59:54]
of going from natural language to uh

[59:52 - 59:56]
meditated filters for Vector

[59:54 - 59:58]
Stores um the problem statement is

[59:56 - 01:00:01]
basically this let's imagine we had an

[59:58 - 01:00:04]
index of Lang Chain video transcripts um

[01:00:01 - 01:00:06]
you might want to ask a question give me

[01:00:04 - 01:00:09]
you know or find find me videos on chat

[01:00:06 - 01:00:13]
Lang chain published after 2024 for

[01:00:09 - 01:00:15]
example um the the process of query

[01:00:13 - 01:00:17]
structuring basically converts this

[01:00:15 - 01:00:19]
natural language question into a

[01:00:17 - 01:00:22]
structured query that can be applied to

[01:00:19 - 01:00:24]
the metadata uh filters on your vector

[01:00:22 - 01:00:26]
store so most Vector stores will have

[01:00:24 - 01:00:29]
some kind of meditative filters that can

[01:00:26 - 01:00:32]
do kind of structur querying on top of

[01:00:29 - 01:00:34]
uh the chunks that are indexed um so for

[01:00:32 - 01:00:36]
example this type of query will retrieve

[01:00:34 - 01:00:39]
all chunks uh that talk about the topic

[01:00:36 - 01:00:41]
of chat Lang chain uh published after

[01:00:39 - 01:00:43]
the date 2024 that's kind of the problem

[01:00:41 - 01:00:46]
statement and to do this we're going to

[01:00:43 - 01:00:48]
use function calling um in this case you

[01:00:46 - 01:00:50]
can use for example open AI or other

[01:00:48 - 01:00:53]
providers to do that and we're going to

[01:00:50 - 01:00:55]
do is at a high level take the metadata

[01:00:53 - 01:00:57]
fields that are present in our Vector

[01:00:55 - 01:01:00]
store and divide them to the model as

[01:00:57 - 01:01:03]
kind of information and the model then

[01:01:00 - 01:01:06]
can take those and produce queries that

[01:01:03 - 01:01:07]
adhere to the schema provided um and

[01:01:06 - 01:01:10]
then we can parse those out to a

[01:01:07 - 01:01:12]
structured object like a identic object

[01:01:10 - 01:01:14]
which again which can then be used in

[01:01:12 - 01:01:15]
search so that's kind of the problem

[01:01:14 - 01:01:17]
statement and let's actually walk

[01:01:15 - 01:01:20]
through

[01:01:17 - 01:01:22]
code um so here's our notebook which

[01:01:20 - 01:01:24]
we've kind of gone through previously

[01:01:22 - 01:01:26]
and I'll just show you as an example

[01:01:24 - 01:01:28]
let's take a example YouTube video and

[01:01:26 - 01:01:30]
let's look at the metadata that you get

[01:01:28 - 01:01:34]
with the transcript so you can see you

[01:01:30 - 01:01:36]
get stuff like description uh URL um

[01:01:34 - 01:01:39]
yeah publish date length things like

[01:01:36 - 01:01:42]
that now let's say we had an index that

[01:01:39 - 01:01:46]
had um basically a that had a number of

[01:01:42 - 01:01:47]
different metadata fields and filters uh

[01:01:46 - 01:01:49]
that allowed us to do range filtering on

[01:01:47 - 01:01:52]
like view count publication date the

[01:01:49 - 01:01:54]
video length um or unstructured search

[01:01:52 - 01:01:56]
on contents and title so those are kind

[01:01:54 - 01:02:00]
of like the imagine we had an index that

[01:01:56 - 01:02:03]
had uh those kind of filters available

[01:02:00 - 01:02:05]
to us what we can do is capture that

[01:02:03 - 01:02:06]
information about the available filters

[01:02:05 - 01:02:08]
in an object so we're calling that this

[01:02:06 - 01:02:10]
tutorial search object kind of

[01:02:08 - 01:02:12]
encapsulates that information about the

[01:02:10 - 01:02:14]
available searches that we can do and so

[01:02:12 - 01:02:15]
we basically enumerate it here content

[01:02:14 - 01:02:19]
search and title search or semantic

[01:02:15 - 01:02:22]
searches that can be done over those

[01:02:19 - 01:02:24]
fields um and then these filters then

[01:02:22 - 01:02:28]
are various types of structure searches

[01:02:24 - 01:02:30]
we can do on like the length um The View

[01:02:28 - 01:02:33]
count and so forth and so we can just

[01:02:30 - 01:02:35]
kind of build that object now we can set

[01:02:33 - 01:02:36]
this up really easily with a basic

[01:02:35 - 01:02:38]
simple prompt that says you know you're

[01:02:36 - 01:02:40]
an expert can bring natural language

[01:02:38 - 01:02:43]
into database queries you have access to

[01:02:40 - 01:02:44]
the database tutorial videos um given a

[01:02:43 - 01:02:47]
question return a database query

[01:02:44 - 01:02:49]
optimize retrieval so that's kind of it

[01:02:47 - 01:02:51]
now here's the key point though when you

[01:02:49 - 01:02:53]
call this LM with structured output

[01:02:51 - 01:02:55]
you're binding this pantic object which

[01:02:53 - 01:02:58]
contains all the information about our

[01:02:55 - 01:03:00]
index to the llm which is exactly what

[01:02:58 - 01:03:02]
we talked about previously it's really

[01:03:00 - 01:03:04]
this process right here you're taking

[01:03:02 - 01:03:05]
this object you're converting it to a

[01:03:04 - 01:03:07]
function schema for example open AI

[01:03:05 - 01:03:10]
you're binding that to your model and

[01:03:07 - 01:03:13]
then you're going to be able to get um

[01:03:10 - 01:03:15]
structured object out versus a Json

[01:03:13 - 01:03:18]
string from a natural language question

[01:03:15 - 01:03:19]
which can then be parsed into a pantic

[01:03:18 - 01:03:21]
object which you get out so that's

[01:03:19 - 01:03:23]
really the flow and it's taking

[01:03:21 - 01:03:26]
advantage of function calling as we said

[01:03:23 - 01:03:28]
so if we go back down we set up our

[01:03:26 - 01:03:30]
query analyzer chain right here now

[01:03:28 - 01:03:32]
let's try to run that just on a on a

[01:03:30 - 01:03:35]
purely semantic input so rag from

[01:03:32 - 01:03:36]
scratch let's run that and you can see

[01:03:35 - 01:03:38]
this just does like a Content search and

[01:03:36 - 01:03:41]
a title search that's exactly what you

[01:03:38 - 01:03:43]
would expect now if we pass a question

[01:03:41 - 01:03:45]
that includes like a date filter let's

[01:03:43 - 01:03:48]
just see if that would work

[01:03:45 - 01:03:52]
and there we go so you kind of still get

[01:03:48 - 01:03:54]
that semantic search um but you also get

[01:03:52 - 01:03:56]
um search over for example publish date

[01:03:54 - 01:03:58]
earliest and latest publish date kind of

[01:03:56 - 01:04:01]
as as you would expect let's try another

[01:03:58 - 01:04:02]
one here so videos focus on the topic of

[01:04:01 - 01:04:04]
chat Lang chain they're published before

[01:04:02 - 01:04:06]
2024 this is just kind of a rewrite of

[01:04:04 - 01:04:08]
this question in slightly different way

[01:04:06 - 01:04:10]
using a different date filter and then

[01:04:08 - 01:04:12]
you can see we can get we get content

[01:04:10 - 01:04:14]
search title search and then we can get

[01:04:12 - 01:04:16]
kind of a date search so this is a very

[01:04:14 - 01:04:19]
general strategy that can be applied

[01:04:16 - 01:04:21]
kind of broadly to um different kinds of

[01:04:19 - 01:04:23]
querying you want to do it's really the

[01:04:21 - 01:04:26]
process of going from an unstructured

[01:04:23 - 01:04:29]
input to a structured query object out

[01:04:26 - 01:04:32]
following an arbitrary schema that you

[01:04:29 - 01:04:33]
provide and so as noted really this

[01:04:32 - 01:04:35]
whole thing we created here this

[01:04:33 - 01:04:37]
tutorial search is based upon the

[01:04:35 - 01:04:39]
specifics of our Vector store of

[01:04:37 - 01:04:41]
interest and if you want to learn more

[01:04:39 - 01:04:44]
about this I link to some documentation

[01:04:41 - 01:04:46]
here that talks a lot about different uh

[01:04:44 - 01:04:47]
types of of Integrations we have with

[01:04:46 - 01:04:50]
different Vector store providers to do

[01:04:47 - 01:04:54]
exactly this so it's a very useful trick

[01:04:50 - 01:04:56]
um it allows you to do kind of query uh

[01:04:54 - 01:04:58]
uh say metadata filter filtering on the

[01:04:56 - 01:05:01]
fly from a natural language question

[01:04:58 - 01:05:03]
it's a very convenient trick uh that

[01:05:01 - 01:05:06]
works with many different Vector DBS so

[01:05:03 - 01:05:09]
encourage you to play with it

[01:05:06 - 01:05:11]
thanks this is Lance from Lang chain I'm

[01:05:09 - 01:05:14]
going to talk about indexing uh and

[01:05:11 - 01:05:17]
mulation indexing in particular for the

[01:05:14 - 01:05:20]
12th part of our rag from scratch series

[01:05:17 - 01:05:22]
here so we previously talked about a few

[01:05:20 - 01:05:24]
different major areas we talk about

[01:05:22 - 01:05:26]
query translation which takes a question

[01:05:24 - 01:05:28]
and translates it in some way to

[01:05:26 - 01:05:30]
optimize for retrieval we talk about

[01:05:28 - 01:05:32]
routing which is the process of taking a

[01:05:30 - 01:05:35]
question routing it to the right data

[01:05:32 - 01:05:37]
source be it a vector store graph DB uh

[01:05:35 - 01:05:39]
SQL DB we talked about queer

[01:05:37 - 01:05:41]
construction we dug into uh basically

[01:05:39 - 01:05:44]
queer construction for Vector stores but

[01:05:41 - 01:05:46]
of course there's also text SQL text to

[01:05:44 - 01:05:48]
Cipher um so now we're going to talk

[01:05:46 - 01:05:50]
about indexing a bit in particular we're

[01:05:48 - 01:05:53]
going to talk about indexing indexing

[01:05:50 - 01:05:54]
techniques for Vector Stores um and I

[01:05:53 - 01:05:57]
want to highlight one particular method

[01:05:54 - 01:06:01]
today called multi-representation

[01:05:57 - 01:06:03]
indexing so the high LEL idea here is

[01:06:01 - 01:06:05]
derived a bit from a paper called

[01:06:03 - 01:06:06]
proposition indexing which kind of makes

[01:06:05 - 01:06:10]
a simple

[01:06:06 - 01:06:13]
observation you can think about

[01:06:10 - 01:06:15]
decoupling raw documents and the unit

[01:06:13 - 01:06:18]
you use for

[01:06:15 - 01:06:21]
retrieval so in the typical case you

[01:06:18 - 01:06:24]
take a document you split it up in some

[01:06:21 - 01:06:26]
way to index it and then you embed the

[01:06:24 - 01:06:29]
split directly

[01:06:26 - 01:06:32]
um this paper talks about actually

[01:06:29 - 01:06:35]
taking a document splitting it in some

[01:06:32 - 01:06:37]
way but then using an llm to produce

[01:06:35 - 01:06:38]
what they call a proposition which you

[01:06:37 - 01:06:41]
can think of as like kind of a

[01:06:38 - 01:06:43]
distillation of that split so it's kind

[01:06:41 - 01:06:45]
of like using an llm to modify that

[01:06:43 - 01:06:49]
split in some way to distill it or make

[01:06:45 - 01:06:51]
it like a crisper uh like summary so to

[01:06:49 - 01:06:52]
speak that's better optimized for

[01:06:51 - 01:06:55]
retrieval so that's kind of one

[01:06:52 - 01:06:57]
highlight one piece of intuition so we

[01:06:55 - 01:06:59]
actually taken that idea and we've kind

[01:06:57 - 01:07:01]
of built on it a bit in kind of a really

[01:06:59 - 01:07:04]
nice way that I think is very well

[01:07:01 - 01:07:07]
suited actually for long context llms so

[01:07:04 - 01:07:10]
the idea is pretty simple you take a

[01:07:07 - 01:07:11]
document and you you actually distill it

[01:07:10 - 01:07:14]
or create a proposition like they show

[01:07:11 - 01:07:16]
in the prior paper I kind of typically

[01:07:14 - 01:07:18]
think of this as just produce a summary

[01:07:16 - 01:07:21]
of the document and you embed that

[01:07:18 - 01:07:23]
summary so that summary is meant to be

[01:07:21 - 01:07:25]
optimized for retrieval so might contain

[01:07:23 - 01:07:26]
a bunch of keywords from the document or

[01:07:25 - 01:07:29]
like the big

[01:07:26 - 01:07:31]
ideas such that when you embed the

[01:07:29 - 01:07:34]
summary you embed a question you do

[01:07:31 - 01:07:35]
search you basically can find that

[01:07:34 - 01:07:38]
document based upon this highly

[01:07:35 - 01:07:39]
optimized summary for retrieval so

[01:07:38 - 01:07:42]
that's kind of represented here in your

[01:07:39 - 01:07:44]
vector store but here's the catch you

[01:07:42 - 01:07:47]
independently store the raw document in

[01:07:44 - 01:07:50]
a dock store and when you when you

[01:07:47 - 01:07:52]
basically retrieve the summary in the

[01:07:50 - 01:07:54]
vector store you return the full

[01:07:52 - 01:07:56]
document for the llm to perform

[01:07:54 - 01:07:59]
generation and this is a nice trick

[01:07:56 - 01:08:02]
because at generation time now with long

[01:07:59 - 01:08:03]
condex LMS for example the LM can handle

[01:08:02 - 01:08:05]
that entire document you don't need to

[01:08:03 - 01:08:08]
worry about splitting it or anything you

[01:08:05 - 01:08:10]
just simply use the summary to prod like

[01:08:08 - 01:08:13]
to create a really nice representation

[01:08:10 - 01:08:14]
for fishing out that full dock use that

[01:08:13 - 01:08:16]
full dock in generation there might be a

[01:08:14 - 01:08:17]
lot of reasons you want to do that you

[01:08:16 - 01:08:19]
want to make sure the LM has the full

[01:08:17 - 01:08:22]
context to actually answer the question

[01:08:19 - 01:08:23]
so that's the big idea it's a nice trick

[01:08:22 - 01:08:26]
and let's walk through some code

[01:08:23 - 01:08:28]
here we have a notebook all set up uh

[01:08:26 - 01:08:32]
just like before we done some pip

[01:08:28 - 01:08:35]
installs um set to maybe I Keys here for

[01:08:32 - 01:08:37]
lsmith um kind of here's a diagram now

[01:08:35 - 01:08:39]
let me show an example let's just load

[01:08:37 - 01:08:41]
two different uh blog posts uh one is

[01:08:39 - 01:08:45]
about agents one is about uh you know

[01:08:41 - 01:08:46]
human data quality um and what we're

[01:08:45 - 01:08:48]
going to do is let's create a summary of

[01:08:46 - 01:08:50]
each of those so this is kind of the

[01:08:48 - 01:08:51]
first step of that process where we're

[01:08:50 - 01:08:53]
going from like the raw documents to

[01:08:51 - 01:08:57]
summaries let's just have a look and

[01:08:53 - 01:08:58]
make sure those ran So Okay cool so the

[01:08:57 - 01:09:00]
first DOC discusses you know building

[01:08:58 - 01:09:01]
autonomous agents the second doc

[01:09:00 - 01:09:03]
contains the importance of high quality

[01:09:01 - 01:09:06]
human data and training okay so that's

[01:09:03 - 01:09:07]
pretty nice we have our summaries now

[01:09:06 - 01:09:08]
we're going to go through a process

[01:09:07 - 01:09:10]
that's pretty

[01:09:08 - 01:09:12]
simple first we Define a vector store

[01:09:10 - 01:09:14]
that's going to index those

[01:09:12 - 01:09:16]
summaries now we're going to Define what

[01:09:14 - 01:09:19]
we call like our our document storage is

[01:09:16 - 01:09:21]
going to store the full documents okay

[01:09:19 - 01:09:23]
so this multiv Vector retriever kind of

[01:09:21 - 01:09:25]
just pulls those two things together we

[01:09:23 - 01:09:28]
basically add our Dock Store we had this

[01:09:25 - 01:09:30]
bite store is basically the the the full

[01:09:28 - 01:09:32]
document store uh the vector store is

[01:09:30 - 01:09:34]
our Vector store um and now this ID is

[01:09:32 - 01:09:37]
what we're going to use to reference

[01:09:34 - 01:09:40]
between the chunks or the summaries and

[01:09:37 - 01:09:42]
the full documents that's really it so

[01:09:40 - 01:09:44]
now for every document we'll Define a

[01:09:42 - 01:09:47]
new Doc ID um and then we're basically

[01:09:44 - 01:09:51]
going to like take our summary documents

[01:09:47 - 01:09:53]
um and we're going to extract um for

[01:09:51 - 01:09:58]
each of our summaries we're going to get

[01:09:53 - 01:10:01]
the associated doc ID so we go um so

[01:09:58 - 01:10:03]
let's go ahead and do that so we have

[01:10:01 - 01:10:06]
our summary docs which we add to the

[01:10:03 - 01:10:08]
vector store we have our full documents

[01:10:06 - 01:10:10]
uh our doc IDs and the full raw

[01:10:08 - 01:10:12]
documents which are added to our doc

[01:10:10 - 01:10:14]
store and then let's just do a query

[01:10:12 - 01:10:16]
Vector store like a similarity search on

[01:10:14 - 01:10:19]
our Vector store so memory and agents

[01:10:16 - 01:10:22]
and we can see okay so we can extract

[01:10:19 - 01:10:24]
you know from the summaries we can get

[01:10:22 - 01:10:27]
for example the summary that pertains to

[01:10:24 - 01:10:30]
um a agents so that's a good thing now

[01:10:27 - 01:10:32]
let's go ahead and run a query get

[01:10:30 - 01:10:35]
relevant documents on our retriever

[01:10:32 - 01:10:38]
which basically combines the summaries

[01:10:35 - 01:10:40]
uh which we use for retrieval then the

[01:10:38 - 01:10:42]
doc store which we use to get the full

[01:10:40 - 01:10:45]
doc back so we're going to apply our

[01:10:42 - 01:10:48]
query we're going to basically run this

[01:10:45 - 01:10:49]
and here's the key Point we've gotten

[01:10:48 - 01:10:53]
back the entire

[01:10:49 - 01:10:55]
article um and we can actually if you

[01:10:53 - 01:10:58]
want to look at the whole thing we we

[01:10:55 - 01:10:59]
can just go ahead and do this here we go

[01:10:58 - 01:11:02]
so this is the entire article that we

[01:10:59 - 01:11:04]
get back from that search so it's a

[01:11:02 - 01:11:07]
pretty nice trick again we query with

[01:11:04 - 01:11:09]
just memory and agents um and we can

[01:11:07 - 01:11:11]
kind of go back to our diagram here we

[01:11:09 - 01:11:13]
quered for memory and agents it started

[01:11:11 - 01:11:15]
our summaries it found the summary

[01:11:13 - 01:11:17]
related to memory and agents it uses

[01:11:15 - 01:11:19]
that doc ID to reference between the

[01:11:17 - 01:11:21]
vector store and the doc store it fishes

[01:11:19 - 01:11:23]
out the right full doc returns us the

[01:11:21 - 01:11:27]
full document in this case the full web

[01:11:23 - 01:11:30]
page that's really it simple idea nice

[01:11:27 - 01:11:32]
way to go from basically like nice

[01:11:30 - 01:11:34]
simple proposition style or summary

[01:11:32 - 01:11:36]
style indexing to full document

[01:11:34 - 01:11:40]
retrieval which is very useful

[01:11:36 - 01:11:40]
especially with long contact LMS thank

[01:11:40 - 01:11:45]
you hi this is Lance from Lang chain

[01:11:43 - 01:11:47]
this is the 13th part of our rag from

[01:11:45 - 01:11:48]
scratch series focused on a technique

[01:11:47 - 01:11:51]
called

[01:11:48 - 01:11:54]
Raptor so Raptor sits within kind of an

[01:11:51 - 01:11:57]
array of different indexing techniques

[01:11:54 - 01:11:58]
that can be applied on Vector Stores um

[01:11:57 - 01:12:01]
we just talked about

[01:11:58 - 01:12:04]
multi-representation indexing um we I

[01:12:01 - 01:12:05]
priv a link to a video that's very good

[01:12:04 - 01:12:06]
talking about the different means of

[01:12:05 - 01:12:09]
chunking so I encourage you to look at

[01:12:06 - 01:12:10]
that and we're going to talk today about

[01:12:09 - 01:12:12]
a technique called Raptor which you can

[01:12:10 - 01:12:14]
kind of think of it as a technique for

[01:12:12 - 01:12:17]
hierarchical

[01:12:14 - 01:12:20]
indexing so the highle intuition is

[01:12:17 - 01:12:23]
this some questions require very

[01:12:20 - 01:12:25]
detailed information from a corpus to

[01:12:23 - 01:12:28]
answer like pertain to a single document

[01:12:25 - 01:12:29]
or single chunk so like we can call

[01:12:28 - 01:12:31]
those low-level

[01:12:29 - 01:12:34]
questions some questions require

[01:12:31 - 01:12:37]
consolidation across kind broad swast of

[01:12:34 - 01:12:39]
a document so across like many documents

[01:12:37 - 01:12:41]
or many chunks within a document and you

[01:12:39 - 01:12:44]
can call those like higher level

[01:12:41 - 01:12:46]
questions and so there's kind of this

[01:12:44 - 01:12:48]
challenge in retrieval and that

[01:12:46 - 01:12:50]
typically we do like K nearest neighbors

[01:12:48 - 01:12:53]
retrieval like we've been talking about

[01:12:50 - 01:12:55]
you're fishing out some number of chunks

[01:12:53 - 01:12:57]
but what if you have a question that

[01:12:55 - 01:12:59]
requires information across like five

[01:12:57 - 01:13:02]
six you know or a number of different

[01:12:59 - 01:13:04]
chunks which may exceed you know the K

[01:13:02 - 01:13:06]
parameter in your retrieval so again

[01:13:04 - 01:13:08]
when you typically do retrieval you

[01:13:06 - 01:13:10]
might set a k parameter of three which

[01:13:08 - 01:13:12]
means you're retrieving three chunks

[01:13:10 - 01:13:14]
from your vector store um and maybe you

[01:13:12 - 01:13:16]
have a high very high level question

[01:13:14 - 01:13:18]
that could benefit from infation across

[01:13:16 - 01:13:21]
more than three so this technique called

[01:13:18 - 01:13:25]
raptor is basically a way to build a

[01:13:21 - 01:13:27]
hierarchical index of document summaries

[01:13:25 - 01:13:30]
and the intuition is this you start with

[01:13:27 - 01:13:33]
a set of documents as your Leafs here on

[01:13:30 - 01:13:36]
the left you cluster them and then you

[01:13:33 - 01:13:39]
Summarize each cluster so each cluster

[01:13:36 - 01:13:42]
of similar documents um will consult

[01:13:39 - 01:13:44]
information from across your context

[01:13:42 - 01:13:45]
which is you know your context could be

[01:13:44 - 01:13:47]
a bunch of different splits or could

[01:13:45 - 01:13:49]
even be across a bunch of different

[01:13:47 - 01:13:51]
documents you're basically capturing

[01:13:49 - 01:13:53]
similar ones and you're consolidating

[01:13:51 - 01:13:54]
the information across them in a summary

[01:13:53 - 01:13:55]
and here's the interesting thing you do

[01:13:54 - 01:13:57]
that

[01:13:55 - 01:13:59]
recursively until either you hit like a

[01:13:57 - 01:14:01]
limit or you end up with one single

[01:13:59 - 01:14:03]
cluster that's a kind of very high level

[01:14:01 - 01:14:05]
summary of all of your

[01:14:03 - 01:14:08]
documents and what the paper shows is

[01:14:05 - 01:14:10]
that if you basically just collapse all

[01:14:08 - 01:14:12]
these and index them together as a big

[01:14:10 - 01:14:15]
pool you end up with a really nice array

[01:14:12 - 01:14:17]
of chunks that span the abstraction

[01:14:15 - 01:14:19]
hierarchy like you have a bunch of

[01:14:17 - 01:14:21]
chunks from Individual documents that

[01:14:19 - 01:14:23]
are just like more detailed chunks

[01:14:21 - 01:14:25]
pertaining to that you know single

[01:14:23 - 01:14:27]
document but you also have chunks from

[01:14:25 - 01:14:29]
these summaries or I would say like you

[01:14:27 - 01:14:31]
know maybe not chunks but in this case

[01:14:29 - 01:14:33]
the summary is like a distillation so

[01:14:31 - 01:14:35]
you know raw chunks on the left that

[01:14:33 - 01:14:37]
represent your leavs are kind of like

[01:14:35 - 01:14:40]
the rawest form of information either

[01:14:37 - 01:14:42]
raw chunks or raw documents and then you

[01:14:40 - 01:14:44]
have these higher level summaries which

[01:14:42 - 01:14:46]
are all indexed together so if you have

[01:14:44 - 01:14:49]
higher level questions they should

[01:14:46 - 01:14:50]
basically be more similar uh in sematic

[01:14:49 - 01:14:53]
search for example to these higher level

[01:14:50 - 01:14:55]
summary chunks if you have lower level

[01:14:53 - 01:14:56]
questions then they'll retrieve these

[01:14:55 - 01:14:59]
more lower level chunks and so you have

[01:14:56 - 01:15:01]
better semantic coverage across like the

[01:14:59 - 01:15:02]
abstraction hierarchy of question types

[01:15:01 - 01:15:04]
that's the intuition they do a bunch of

[01:15:02 - 01:15:07]
nice studies to show that this works

[01:15:04 - 01:15:09]
pretty well um I actually did a deep

[01:15:07 - 01:15:12]
dive video just on this which I link

[01:15:09 - 01:15:15]
below um I did want to cover it briefly

[01:15:12 - 01:15:17]
just at a very high level um so let's

[01:15:15 - 01:15:19]
actually just do kind of a code walkr

[01:15:17 - 01:15:21]
and I've added it to this rack from

[01:15:19 - 01:15:23]
scratch course notebook but I link over

[01:15:21 - 01:15:27]
to my deep dive video as well as the

[01:15:23 - 01:15:28]
paper and the the full code notebook

[01:15:27 - 01:15:31]
which is already checked in is discussed

[01:15:28 - 01:15:33]
at more length in the Deep dive the

[01:15:31 - 01:15:35]
technique is a little bit detailed so I

[01:15:33 - 01:15:37]
only want to give you very high levels

[01:15:35 - 01:15:39]
kind of overview here and you can look

[01:15:37 - 01:15:41]
at the Deep dive video if you want to go

[01:15:39 - 01:15:43]
in more depth again we talked through

[01:15:41 - 01:15:46]
this abstraction

[01:15:43 - 01:15:49]
hierarchy um I applied this to a large

[01:15:46 - 01:15:51]
set of Lang chain documents um so this

[01:15:49 - 01:15:53]
is me loading basically all of our Lang

[01:15:51 - 01:15:55]
chain expression language docs so this

[01:15:53 - 01:15:57]
is on the order of 30 documents you can

[01:15:55 - 01:16:00]
see I do a histogram here of the token

[01:15:57 - 01:16:02]
counts per document some are pretty big

[01:16:00 - 01:16:05]
most are fairly small less than you know

[01:16:02 - 01:16:09]
4,000 tokens um and what I did is I

[01:16:05 - 01:16:11]
indexed all of them um individually so

[01:16:09 - 01:16:14]
the all those raw documents you can kind

[01:16:11 - 01:16:18]
of Imagine are here on the left and then

[01:16:14 - 01:16:21]
I do um I do embedding I do clustering

[01:16:18 - 01:16:24]
summarization and I do that recursively

[01:16:21 - 01:16:27]
um until I end up with in this case I

[01:16:24 - 01:16:29]
believe I only set like three levels of

[01:16:27 - 01:16:31]
recursion and then I save them all my

[01:16:29 - 01:16:33]
Vector store so that's like the highle

[01:16:31 - 01:16:36]
idea I'm applying this Raptor technique

[01:16:33 - 01:16:38]
to a whole bunch of Lang chain documents

[01:16:36 - 01:16:45]
um that have fairly large number of

[01:16:38 - 01:16:48]
tokens um so I do that um and yeah I use

[01:16:45 - 01:16:50]
actually use both CLA as well as open AI

[01:16:48 - 01:16:52]
here um this talks through the

[01:16:50 - 01:16:54]
clustering method which they that they

[01:16:52 - 01:16:55]
use which is pretty interesting you can

[01:16:54 - 01:16:58]
kind of dig into that on your own if if

[01:16:55 - 01:17:00]
you're really um interested this is a

[01:16:58 - 01:17:02]
lot of their code um which I cite

[01:17:00 - 01:17:03]
accordingly um this is basically

[01:17:02 - 01:17:08]
implementing the clustering method that

[01:17:03 - 01:17:12]
they use um and this is just simply the

[01:17:08 - 01:17:15]
document embedding stage um this is like

[01:17:12 - 01:17:19]
basically embedding uh and clustering

[01:17:15 - 01:17:22]
that's really it uh some text formatting

[01:17:19 - 01:17:24]
um summarizing of the clusters right

[01:17:22 - 01:17:26]
here um and then this is just running

[01:17:24 - 01:17:30]
that whole process recursively that's

[01:17:26 - 01:17:33]
really it um this is tree building so

[01:17:30 - 01:17:35]
basically I have the RO the rod docs

[01:17:33 - 01:17:37]
let's just go back and look at Doc texts

[01:17:35 - 01:17:39]
so this should be all my raw documents

[01:17:37 - 01:17:41]
uh so that's right you can see it here

[01:17:39 - 01:17:43]
doc text is basically just the text in

[01:17:41 - 01:17:45]
all those Lang chain documents that I

[01:17:43 - 01:17:49]
pulled

[01:17:45 - 01:17:50]
um and so I run this process on them

[01:17:49 - 01:17:52]
right

[01:17:50 - 01:17:54]
here uh so this is that recursive

[01:17:52 - 01:17:57]
embedding cluster basically runs and

[01:17:54 - 01:17:59]
produces is that tree here's the results

[01:17:57 - 01:18:02]
um this is me just going through the

[01:17:59 - 01:18:07]
results and basically adding the result

[01:18:02 - 01:18:09]
text to this list of uh texts um oh okay

[01:18:07 - 01:18:12]
so here's what I do this Leaf text is

[01:18:09 - 01:18:14]
all the raw documents and I'm appending

[01:18:12 - 01:18:16]
to that all the summaries that's all

[01:18:14 - 01:18:19]
it's going on and then I'm indexing them

[01:18:16 - 01:18:21]
all together that's the key Point rag

[01:18:19 - 01:18:23]
chain and there you have it that's

[01:18:21 - 01:18:24]
really all you do um so anyway I

[01:18:23 - 01:18:26]
encourage you to look at this in depth

[01:18:24 - 01:18:29]
it's a pretty interesting technique it

[01:18:26 - 01:18:30]
works well long with long contexts so

[01:18:29 - 01:18:32]
for example one of the arguments I made

[01:18:30 - 01:18:35]
is that it's kind of a nice approach to

[01:18:32 - 01:18:36]
consult information across like a span

[01:18:35 - 01:18:38]
of large

[01:18:36 - 01:18:40]
documents like in this particular case

[01:18:38 - 01:18:42]
my individual documents were lch

[01:18:40 - 01:18:44]
expression language docs uh each each

[01:18:42 - 01:18:46]
being somewhere in the order of you know

[01:18:44 - 01:18:48]
in this case like you know most of them

[01:18:46 - 01:18:51]
are less than 4,000 tokens some pretty

[01:18:48 - 01:18:54]
big but I index them all I cluster them

[01:18:51 - 01:18:56]
without any splits uh embed them cluster

[01:18:54 - 01:18:58]
them build this tree um and go from

[01:18:56 - 01:19:01]
there and it all works because we now

[01:18:58 - 01:19:03]
have llms that can go out to you know

[01:19:01 - 01:19:05]
100 or 200,000 up to million tokens and

[01:19:03 - 01:19:08]
Contex so you can actually just do this

[01:19:05 - 01:19:10]
process for big swats of documents in

[01:19:08 - 01:19:12]
place without any without any splitting

[01:19:10 - 01:19:13]
uh it's a pretty nice approach so I

[01:19:12 - 01:19:14]
encourage you to think about it look at

[01:19:13 - 01:19:19]
it watch the deep that video If you

[01:19:14 - 01:19:19]
really want to go deeper on this um

[01:19:20 - 01:19:24]
thanks hi this is Lance from Lang chain

[01:19:22 - 01:19:26]
this is the 14th part of our rag from

[01:19:24 - 01:19:28]
scratch series we're going to I'm going

[01:19:26 - 01:19:29]
to be talking about an approach called

[01:19:28 - 01:19:34]
cold

[01:19:29 - 01:19:37]
bear um so we've talked about a few

[01:19:34 - 01:19:38]
different approaches for indexing and

[01:19:37 - 01:19:41]
just as kind of a refresher indexing

[01:19:38 - 01:19:43]
Falls uh kind of right down here in our

[01:19:41 - 01:19:45]
flow we started initially with career

[01:19:43 - 01:19:47]
translation taking a question

[01:19:45 - 01:19:49]
translating it in some way to optimize

[01:19:47 - 01:19:51]
retrieval we talked about routing it to

[01:19:49 - 01:19:53]
a particular database we then talked

[01:19:51 - 01:19:56]
about query construction so going from

[01:19:53 - 01:19:59]
natural language to the DSL or domain

[01:19:56 - 01:20:01]
specific language for E any of the

[01:19:59 - 01:20:02]
databases that you want to work with

[01:20:01 - 01:20:05]
those are you know metadata filters for

[01:20:02 - 01:20:09]
Vector stores or Cipher

[01:20:05 - 01:20:10]
for graph DB or SQL for relational DB so

[01:20:09 - 01:20:12]
that's kind of the flow we talked about

[01:20:10 - 01:20:14]
today we talked about some indexing

[01:20:12 - 01:20:16]
approaches like multi-representation

[01:20:14 - 01:20:19]
indexing we gave a small shout out to

[01:20:16 - 01:20:22]
greet camer in the series on chunking uh

[01:20:19 - 01:20:24]
we talked about hierarchical indexing

[01:20:22 - 01:20:26]
and I want to include one Advanced kind

[01:20:24 - 01:20:28]
embedding approach so we talked a lot

[01:20:26 - 01:20:31]
about embeddings are obviously very

[01:20:28 - 01:20:32]
Central to semantic similarity search um

[01:20:31 - 01:20:35]
and

[01:20:32 - 01:20:38]
retrieval so one of the interesting

[01:20:35 - 01:20:39]
points that's been brought up is that

[01:20:38 - 01:20:42]
embedding models of course take a

[01:20:39 - 01:20:45]
document you can see here on the top and

[01:20:42 - 01:20:48]
embed it basically compress it to a

[01:20:45 - 01:20:49]
vector so it's kind of a compression

[01:20:48 - 01:20:51]
process you representing all the

[01:20:49 - 01:20:53]
semantics of that document in a single

[01:20:51 - 01:20:55]
Vector you're doing the same to your

[01:20:53 - 01:20:57]
question you're doing similarity search

[01:20:55 - 01:20:59]
between the question embedding and the

[01:20:57 - 01:21:01]
document embedding um in order to

[01:20:59 - 01:21:05]
perform retrieval you're typically

[01:21:01 - 01:21:07]
taking the you know K most similar um

[01:21:05 - 01:21:10]
document abetting is given a question

[01:21:07 - 01:21:12]
and that's really how you're doing it

[01:21:10 - 01:21:13]
now a lot of people said well hey the

[01:21:12 - 01:21:15]
compressing a full document with all

[01:21:13 - 01:21:18]
this Nuance to single Vector seems a

[01:21:15 - 01:21:21]
little bit um overly restrictive right

[01:21:18 - 01:21:22]
and this is a fair question to ask um

[01:21:21 - 01:21:24]
there's been some interesting approaches

[01:21:22 - 01:21:28]
to try to address that and one is this

[01:21:24 - 01:21:30]
this this approach method called Co bear

[01:21:28 - 01:21:31]
so the intuition is actually pretty

[01:21:30 - 01:21:33]
straightforward there's a bunch of good

[01:21:31 - 01:21:35]
articles I link down here this is my

[01:21:33 - 01:21:37]
little cartoon to explain it which I

[01:21:35 - 01:21:39]
think is hopefully kind of helpful but

[01:21:37 - 01:21:41]
here's the main idea instead of just

[01:21:39 - 01:21:44]
taking a document and compressing it

[01:21:41 - 01:21:46]
down to a single Vector basically single

[01:21:44 - 01:21:49]
uh what we might call embedding Vector

[01:21:46 - 01:21:51]
we take the document we break it up into

[01:21:49 - 01:21:54]
tokens so tokens are just like you know

[01:21:51 - 01:21:56]
units of of content it depends on the

[01:21:54 - 01:21:59]
token areas you use we talked about this

[01:21:56 - 01:22:01]
earlier so you basically tokenize it and

[01:21:59 - 01:22:03]
you produce basically an embedding or

[01:22:01 - 01:22:05]
vector for every token and there's some

[01:22:03 - 01:22:08]
kind of positional uh waiting that

[01:22:05 - 01:22:09]
occurs when you do this process so you

[01:22:08 - 01:22:10]
obviously you look to look at the

[01:22:09 - 01:22:12]
implementation understand the details

[01:22:10 - 01:22:14]
but the intuition is that you're

[01:22:12 - 01:22:17]
producing some kind of representation

[01:22:14 - 01:22:19]
for every token okay and you're doing

[01:22:17 - 01:22:20]
the same thing for your question so

[01:22:19 - 01:22:22]
you're taking your question you're

[01:22:20 - 01:22:25]
breaking into a tokens and you have some

[01:22:22 - 01:22:27]
representation or vector per token

[01:22:25 - 01:22:29]
and then what you're doing is for every

[01:22:27 - 01:22:33]
token in the question you're Computing

[01:22:29 - 01:22:36]
the similarity across all the tokens in

[01:22:33 - 01:22:38]
the document and you're finding the max

[01:22:36 - 01:22:42]
you're taking the max you're storing

[01:22:38 - 01:22:45]
that and you're doing that process for

[01:22:42 - 01:22:48]
all the tokens in the question so again

[01:22:45 - 01:22:51]
token two you compare it to every token

[01:22:48 - 01:22:54]
in the in the document compute the

[01:22:51 - 01:22:57]
Max and then the final score is in this

[01:22:54 - 01:23:00]
case the sum of the max similarities uh

[01:22:57 - 01:23:03]
between every question token and any

[01:23:00 - 01:23:06]
document token so it's an interesting

[01:23:03 - 01:23:08]
approach uh it reports very strong

[01:23:06 - 01:23:11]
performance latency is definitely a

[01:23:08 - 01:23:12]
question um so kind of production

[01:23:11 - 01:23:14]
Readiness is something you should look

[01:23:12 - 01:23:16]
into but it's a it's an approach that's

[01:23:14 - 01:23:18]
worth mentioning here uh because it's

[01:23:16 - 01:23:20]
pretty

[01:23:18 - 01:23:21]
interesting um and let's walk through

[01:23:20 - 01:23:22]
the

[01:23:21 - 01:23:25]
code

[01:23:22 - 01:23:27]
so there's actually nice Library called

[01:23:25 - 01:23:30]
rouille which makes it very easy to play

[01:23:27 - 01:23:33]
with Co bear um she's pip install it

[01:23:30 - 01:23:35]
here I've already done that and we can

[01:23:33 - 01:23:36]
use one of their pre-train models to

[01:23:35 - 01:23:38]
mediate this process so I'm basically

[01:23:36 - 01:23:40]
following their documentation this is

[01:23:38 - 01:23:41]
kind of what they recommended um so I'm

[01:23:40 - 01:23:43]
running this

[01:23:41 - 01:23:45]
now hopefully this runs somewhat quickly

[01:23:43 - 01:23:47]
I'm not sure I I previously have loaded

[01:23:45 - 01:23:48]
this model so hopefully it won't take

[01:23:47 - 01:23:51]
too long and yeah you can see it's

[01:23:48 - 01:23:54]
pretty quick uh I'm on a Mac M2 with 32

[01:23:51 - 01:23:56]
gigs um so just as like a context in

[01:23:54 - 01:23:57]
terms of my my system um this is from

[01:23:56 - 01:23:59]
their documentation we're just grabbing

[01:23:57 - 01:24:03]
a Wikipedia page this is getting a full

[01:23:59 - 01:24:05]
document on Miyazaki so that's cool

[01:24:03 - 01:24:06]
we're going to grab that now this is

[01:24:05 - 01:24:09]
just from their docs this is basically

[01:24:06 - 01:24:11]
how we create an index so we provide the

[01:24:09 - 01:24:13]
you know some index name the collection

[01:24:11 - 01:24:15]
um the max document length and yeah you

[01:24:13 - 01:24:16]
should look at their documentation for

[01:24:15 - 01:24:19]
these flags these are just the defaults

[01:24:16 - 01:24:21]
so I'm going to create my index um so I

[01:24:19 - 01:24:24]
get some logging here so it it's working

[01:24:21 - 01:24:26]
under the hood um and by the way I

[01:24:24 - 01:24:30]
actually have their documentation open

[01:24:26 - 01:24:31]
so you can kind of follow along um

[01:24:30 - 01:24:35]
so

[01:24:31 - 01:24:36]
um let's see yeah right about here so

[01:24:35 - 01:24:37]
you can kind of follow this indexing

[01:24:36 - 01:24:41]
process to create an index you need to

[01:24:37 - 01:24:42]
load a train uh a trained model this can

[01:24:41 - 01:24:44]
be either your own pre-train model or

[01:24:42 - 01:24:45]
one of ours from The Hub um and this is

[01:24:44 - 01:24:48]
kind of the process we're doing right

[01:24:45 - 01:24:49]
now create index is just a few lines of

[01:24:48 - 01:24:52]
code and this is exactly what we're

[01:24:49 - 01:24:54]
doing um so this is the you know my

[01:24:52 - 01:24:56]
documents and this is the indexing step

[01:24:54 - 01:24:58]
that we just we just kind of walk

[01:24:56 - 01:25:00]
through and it looks like it's done um

[01:24:58 - 01:25:02]
so you get a bunch of logging here

[01:25:00 - 01:25:04]
that's fine um now let's actually see if

[01:25:02 - 01:25:06]
this works so we're going to run drag

[01:25:04 - 01:25:09]
search what an emotion Studio did Miaki

[01:25:06 - 01:25:13]
found set our K parameter and we get

[01:25:09 - 01:25:15]
some results okay so it's running and

[01:25:13 - 01:25:17]
cool we get some documents out so you

[01:25:15 - 01:25:18]
know it seems to work now what's nice is

[01:25:17 - 01:25:20]
you can run this within lighting chain

[01:25:18 - 01:25:22]
as a liting chain retriever so that

[01:25:20 - 01:25:24]
basically wraps this as a lighting chain

[01:25:22 - 01:25:25]
Retriever and then you can use it freely

[01:25:24 - 01:25:27]
as a retriever within Lang chain it

[01:25:25 - 01:25:28]
works with all the other different LMS

[01:25:27 - 01:25:30]
and all the other components like

[01:25:28 - 01:25:32]
rankers and so forth that we talk

[01:25:30 - 01:25:35]
through so you can use this directly as

[01:25:32 - 01:25:38]
a retriever let's try this out and boom

[01:25:35 - 01:25:40]
nice and fast um and we get our

[01:25:38 - 01:25:42]
documents again this is a super simple

[01:25:40 - 01:25:44]
test example you should run this maybe

[01:25:42 - 01:25:45]
on more complex cases but it's pretty

[01:25:44 - 01:25:47]
pretty easy spin up it's a really

[01:25:45 - 01:25:49]
interesting alternative indexing

[01:25:47 - 01:25:53]
approach um using again like we talked

[01:25:49 - 01:25:55]
through um a very different algorithm

[01:25:53 - 01:25:57]
for computing do similarity that may

[01:25:55 - 01:25:59]
work better I think an interesting

[01:25:57 - 01:26:02]
regime to consider this would be longer

[01:25:59 - 01:26:04]
documents so if you want like longer um

[01:26:02 - 01:26:06]
yeah if if you basically want kind of

[01:26:04 - 01:26:09]
long context embedding I think you

[01:26:06 - 01:26:11]
should look into for example the uh Max

[01:26:09 - 01:26:13]
token limits for this approach because

[01:26:11 - 01:26:16]
it partitions the document into into

[01:26:13 - 01:26:18]
each token um I would be curious to dig

[01:26:16 - 01:26:21]
into kind of what the overall context

[01:26:18 - 01:26:22]
limits are for this approach of coar but

[01:26:21 - 01:26:24]
it's really interesting to consider and

[01:26:22 - 01:26:26]
it reports very strong performance so

[01:26:24 - 01:26:27]
again I encourage you to play with it

[01:26:26 - 01:26:29]
and this is just kind of an intro to how

[01:26:27 - 01:26:32]
to get set up and to start experimenting

[01:26:29 - 01:26:32]
with it really quickly

[01:26:32 - 01:26:36]
thanks hi this is Lance from Lang chain

[01:26:35 - 01:26:39]
I'm going to be talking about using

[01:26:36 - 01:26:40]
langra to build a diverse and

[01:26:39 - 01:26:44]
sophisticated rag

[01:26:40 - 01:26:47]
flows so just to set the stage the basic

[01:26:44 - 01:26:49]
rag flow you can see here starts with a

[01:26:47 - 01:26:52]
question retrieval of relevant documents

[01:26:49 - 01:26:54]
from an index which are passed into the

[01:26:52 - 01:26:57]
context window of an llm for generation

[01:26:54 - 01:26:59]
of an answer ground in your documents

[01:26:57 - 01:27:01]
that's kind of the basic

[01:26:59 - 01:27:02]
outline and we can see it's like a very

[01:27:01 - 01:27:06]
linear

[01:27:02 - 01:27:08]
path um in practice though you often

[01:27:06 - 01:27:10]
encounter a few different types of

[01:27:08 - 01:27:11]
questions like when do we actually want

[01:27:10 - 01:27:13]
to

[01:27:11 - 01:27:16]
retrieve based upon the context of the

[01:27:13 - 01:27:18]
question um are the retrieve documents

[01:27:16 - 01:27:21]
actually good or not and if they're not

[01:27:18 - 01:27:23]
good should we discard them and then how

[01:27:21 - 01:27:25]
do we loot back and retry retrieval with

[01:27:23 - 01:27:29]
for example and improved

[01:27:25 - 01:27:32]
question so these types of questions

[01:27:29 - 01:27:34]
motivate an idea of active rag which is

[01:27:32 - 01:27:36]
a process where an llm actually decides

[01:27:34 - 01:27:37]
when and where to retrieve based upon

[01:27:36 - 01:27:40]
like existing

[01:27:37 - 01:27:43]
retrievals or existing

[01:27:40 - 01:27:45]
Generations now when you think about

[01:27:43 - 01:27:48]
this there's a few different levels of

[01:27:45 - 01:27:49]
control that you have over an llm in a

[01:27:48 - 01:27:52]
rag

[01:27:49 - 01:27:55]
application the base case like we saw

[01:27:52 - 01:27:58]
with our chain is just use an llm to

[01:27:55 - 01:28:00]
choose a single steps output so for

[01:27:58 - 01:28:04]
example in traditional rag you feed it

[01:28:00 - 01:28:07]
documents and it decides to generation

[01:28:04 - 01:28:09]
so it's just kind of one step now a lot

[01:28:07 - 01:28:12]
of rag workflows will use the idea of

[01:28:09 - 01:28:16]
routing so like given a question should

[01:28:12 - 01:28:20]
I route it to a vector store or a graph

[01:28:16 - 01:28:23]
DB um and we have seen this quite a

[01:28:20 - 01:28:24]
bit now this newer idea that I want to

[01:28:23 - 01:28:28]
introduce

[01:28:24 - 01:28:29]
is how do we build more sophisticated

[01:28:28 - 01:28:32]
logical

[01:28:29 - 01:28:36]
flows um in a rag

[01:28:32 - 01:28:41]
pipeline um that you let the llm choose

[01:28:36 - 01:28:43]
between different steps but specify all

[01:28:41 - 01:28:45]
the transitions that are

[01:28:43 - 01:28:46]
available and this is known as we call a

[01:28:45 - 01:28:50]
state

[01:28:46 - 01:28:53]
machine now there's a few different

[01:28:50 - 01:28:54]
architectures that have emerged uh to

[01:28:53 - 01:28:58]
build different types of rag

[01:28:54 - 01:28:59]
chains and of course chains are

[01:28:58 - 01:29:02]
traditionally used just for like very

[01:28:59 - 01:29:06]
basic rag but this notion of State

[01:29:02 - 01:29:07]
machine is a bit newer and Lang graph

[01:29:06 - 01:29:10]
which we recently released provides a

[01:29:07 - 01:29:13]
really nice way to build State machines

[01:29:10 - 01:29:16]
for Rag and for other

[01:29:13 - 01:29:18]
things and the general idea here is that

[01:29:16 - 01:29:20]
you can lay out more diverse and

[01:29:18 - 01:29:24]
complicated rag

[01:29:20 - 01:29:26]
flows and then Implement them as graphs

[01:29:24 - 01:29:28]
and it kind of motivates this more broad

[01:29:26 - 01:29:30]
idea of of like flow engineering and

[01:29:28 - 01:29:32]
thinking through the actual like

[01:29:30 - 01:29:35]
workflow that you want and then

[01:29:32 - 01:29:39]
implementing it um and we're gonna

[01:29:35 - 01:29:42]
actually do that right now so I'm GNA Pi

[01:29:39 - 01:29:46]
a recent paper called CAG corrective rag

[01:29:42 - 01:29:48]
which is really a nice method um for

[01:29:46 - 01:29:50]
active rag that incorporates a few

[01:29:48 - 01:29:54]
different

[01:29:50 - 01:29:55]
ideas um so first you retrieve documents

[01:29:54 - 01:29:59]
and then you grade

[01:29:55 - 01:30:01]
them now if at least one document

[01:29:59 - 01:30:04]
exceeds the threshold for

[01:30:01 - 01:30:06]
relevance you go to generation you

[01:30:04 - 01:30:10]
generate your

[01:30:06 - 01:30:13]
answer um and it does this knowledge

[01:30:10 - 01:30:15]
refinement stage after that but let's

[01:30:13 - 01:30:16]
not worry about that for right now it's

[01:30:15 - 01:30:20]
kind of not essential for understanding

[01:30:16 - 01:30:23]
the basic flow here so again you do a

[01:30:20 - 01:30:25]
grade for relevance for every document

[01:30:23 - 01:30:29]
if any is relevant you

[01:30:25 - 01:30:31]
generate now if they're all ambiguous or

[01:30:29 - 01:30:34]
incorrect based upon your

[01:30:31 - 01:30:36]
grader you retrieve from an external

[01:30:34 - 01:30:39]
Source they use web

[01:30:36 - 01:30:42]
search and then they pass that as their

[01:30:39 - 01:30:44]
context for answer

[01:30:42 - 01:30:46]
generation so it's a really neat

[01:30:44 - 01:30:48]
workflow where you're doing retrieval

[01:30:46 - 01:30:50]
just like with basic rag but then you're

[01:30:48 - 01:30:53]
reasoning about the documents if they're

[01:30:50 - 01:30:54]
relevant go ahead and at least one is

[01:30:53 - 01:30:57]
relevant go ahead and generate if

[01:30:54 - 01:30:59]
they're not retrieve from alternative

[01:30:57 - 01:31:02]
source and then pack that into the

[01:30:59 - 01:31:04]
context and generate your

[01:31:02 - 01:31:09]
answer so let's see how we would

[01:31:04 - 01:31:10]
implement this as a estate machine using

[01:31:09 - 01:31:13]
Lang

[01:31:10 - 01:31:15]
graph um we'll make a few

[01:31:13 - 01:31:19]
simplifications

[01:31:15 - 01:31:22]
um we're going to first decide if any

[01:31:19 - 01:31:25]
documents are relevant we'll go ahead

[01:31:22 - 01:31:28]
and do the the web search

[01:31:25 - 01:31:29]
um to supplement the output so that's

[01:31:28 - 01:31:32]
just like kind of one minor

[01:31:29 - 01:31:35]
modification um we'll use tab search for

[01:31:32 - 01:31:38]
web search um we use Query writing to

[01:31:35 - 01:31:40]
optimize the search for uh to optimize

[01:31:38 - 01:31:44]
the web search but it follows a lot of

[01:31:40 - 01:31:48]
the the intuitions of the main paper uh

[01:31:44 - 01:31:50]
small note here we set the Tav API key

[01:31:48 - 01:31:54]
and another small mode I've already set

[01:31:50 - 01:31:57]
my lsmith API key um with which we'll

[01:31:54 - 01:31:59]
see is useful a bit later for observing

[01:31:57 - 01:32:02]
the resulting

[01:31:59 - 01:32:03]
traces now I'm going to index three blog

[01:32:02 - 01:32:06]
posts that I

[01:32:03 - 01:32:09]
like um I'm going to use chroma DB I'm G

[01:32:06 - 01:32:11]
use open ey embeddings I'm going to run

[01:32:09 - 01:32:15]
this right now this will create a vector

[01:32:11 - 01:32:19]
store for me from these three blog

[01:32:15 - 01:32:20]
posts and then what I'm going to do is

[01:32:19 - 01:32:23]
Define

[01:32:20 - 01:32:25]
State now this is kind of the core

[01:32:23 - 01:32:27]
object that going to be passed around my

[01:32:25 - 01:32:29]
graph that I'm going to

[01:32:27 - 01:32:32]
modify and right here is where I Define

[01:32:29 - 01:32:35]
it and the key point to note right now

[01:32:32 - 01:32:37]
is it's just a dictionary and it can

[01:32:35 - 01:32:40]
contain things that are relevant for rag

[01:32:37 - 01:32:42]
like question documents generation and

[01:32:40 - 01:32:44]
we'll see how we update that in in in a

[01:32:42 - 01:32:47]
little bit but the first thing to note

[01:32:44 - 01:32:49]
is we Define our state and this is

[01:32:47 - 01:32:50]
what's going to be modified in every Noe

[01:32:49 - 01:32:53]
of our

[01:32:50 - 01:32:54]
graph now here's really the Crux of it

[01:32:53 - 01:32:58]
and this is the thing I want to zoom in

[01:32:54 - 01:33:00]
on a little bit um

[01:32:58 - 01:33:02]
so when you kind of move from just

[01:33:00 - 01:33:05]
thinking about promps to thinking about

[01:33:02 - 01:33:07]
overall flows it it's like kind of a fun

[01:33:05 - 01:33:09]
and interesting exercise I kind of think

[01:33:07 - 01:33:12]
about this as it's been mentioned on

[01:33:09 - 01:33:15]
Twitter a little bit more like flow

[01:33:12 - 01:33:19]
engineering so let's think through what

[01:33:15 - 01:33:21]
was actually done in the paper and what

[01:33:19 - 01:33:24]
modifications to our state are going to

[01:33:21 - 01:33:25]
happen in each stage so we start with a

[01:33:24 - 01:33:28]
question you can see that on the far

[01:33:25 - 01:33:29]
left and this kind of state is represent

[01:33:28 - 01:33:31]
as a dictionary like we have we start

[01:33:29 - 01:33:33]
with a question we perform retrieval

[01:33:31 - 01:33:35]
from our Vector store which we just

[01:33:33 - 01:33:38]
created that's going to give us

[01:33:35 - 01:33:41]
documents so that's one node we made an

[01:33:38 - 01:33:43]
an adjustment to our state by adding

[01:33:41 - 01:33:45]
documents that's step

[01:33:43 - 01:33:48]
one now we have a second node where

[01:33:45 - 01:33:50]
we're going to grade the documents and

[01:33:48 - 01:33:52]
in this node we might filter some out so

[01:33:50 - 01:33:54]
we are making a modification to state

[01:33:52 - 01:33:55]
which is why it's a node so we're going

[01:33:54 - 01:33:58]
to have a

[01:33:55 - 01:34:00]
greater then we're going to have what

[01:33:58 - 01:34:02]
we're going to call a conditional Edge

[01:34:00 - 01:34:05]
so we saw we went from question to

[01:34:02 - 01:34:07]
retrieval retrieval always goes to

[01:34:05 - 01:34:10]
grading and now we have a

[01:34:07 - 01:34:14]
decision if any document is

[01:34:10 - 01:34:15]
irrelevant we're going to go ahead and

[01:34:14 - 01:34:17]
do web search to

[01:34:15 - 01:34:20]
supplement and if they're all relevant

[01:34:17 - 01:34:23]
will go to generation it's a minor kind

[01:34:20 - 01:34:25]
of a minor kind of logical uh decision

[01:34:23 - 01:34:28]
ision that we're going to

[01:34:25 - 01:34:31]
make um if any are not relevant we'll

[01:34:28 - 01:34:33]
transform the query and we'll do web

[01:34:31 - 01:34:35]
search and we'll use that for Generation

[01:34:33 - 01:34:37]
so that's really it and that's how we

[01:34:35 - 01:34:39]
can kind of think about our flow and how

[01:34:37 - 01:34:40]
our States can be modified throughout

[01:34:39 - 01:34:44]
this

[01:34:40 - 01:34:46]
flow now all we then need to do and I I

[01:34:44 - 01:34:48]
kind of found

[01:34:46 - 01:34:50]
spending 10 minutes thinking carefully

[01:34:48 - 01:34:52]
through your flow

[01:34:50 - 01:34:55]
engineering is really valuable because

[01:34:52 - 01:34:58]
from here it's really implementation

[01:34:55 - 01:35:02]
details um and it's pretty easy as

[01:34:58 - 01:35:03]
you'll see so basically I'm going to run

[01:35:02 - 01:35:04]
this code block but then we can like

[01:35:03 - 01:35:06]
walk through some of it I won't show you

[01:35:04 - 01:35:09]
everything so it'll get a little bit

[01:35:06 - 01:35:12]
boring but really all we're doing is

[01:35:09 - 01:35:15]
we're finding functions for every node

[01:35:12 - 01:35:17]
that take in the state and modify in

[01:35:15 - 01:35:19]
some way that's all it's going on so

[01:35:17 - 01:35:22]
think about retrieval we run retrieval

[01:35:19 - 01:35:24]
we take in state remember it's a dict we

[01:35:22 - 01:35:26]
get our state dick like this

[01:35:24 - 01:35:29]
we extract one keyy question from our

[01:35:26 - 01:35:32]
dick we pass that to a retriever we get

[01:35:29 - 01:35:36]
documents and we write back out State

[01:35:32 - 01:35:39]
now with documents key added that's

[01:35:36 - 01:35:41]
all generate going to be similar we take

[01:35:39 - 01:35:44]
in state now we have our question and

[01:35:41 - 01:35:47]
documents we pull in a prompt we Define

[01:35:44 - 01:35:49]
an llm we do minor post processing on

[01:35:47 - 01:35:51]
documents we set up a chain for

[01:35:49 - 01:35:52]
retrieval uh or sorry for Generation

[01:35:51 - 01:35:55]
which is just going to be take our

[01:35:52 - 01:35:57]
prompt pump Plum that to an llm

[01:35:55 - 01:36:01]
partially output a string and we run it

[01:35:57 - 01:36:04]
right here invoking our documents in our

[01:36:01 - 01:36:06]
question to get our answer we write that

[01:36:04 - 01:36:09]
back to State that's

[01:36:06 - 01:36:12]
it and you can kind of follow here for

[01:36:09 - 01:36:13]
every node we just Define a function

[01:36:12 - 01:36:15]
that performs the state modification

[01:36:13 - 01:36:17]
that we want to do on that

[01:36:15 - 01:36:21]
node grading documents is going to be

[01:36:17 - 01:36:23]
the same um in this case I do a little

[01:36:21 - 01:36:25]
thing extra here because I actually

[01:36:23 - 01:36:28]
Define a identic data model for my

[01:36:25 - 01:36:31]
grader so that the output of that

[01:36:28 - 01:36:33]
particular grading chain is a binary yes

[01:36:31 - 01:36:36]
or no you can look at the code make sure

[01:36:33 - 01:36:38]
it's all shared um and that just makes

[01:36:36 - 01:36:41]
sure that our output is is very

[01:36:38 - 01:36:45]
deterministic so that we then can down

[01:36:41 - 01:36:49]
here perform logical filtering so what

[01:36:45 - 01:36:53]
you can see here is um we Define this

[01:36:49 - 01:36:56]
search value no and we iterate through

[01:36:53 - 01:37:00]
our documents we grade them if any

[01:36:56 - 01:37:04]
document uh is graded as not relevant we

[01:37:00 - 01:37:06]
flag this search thing to yes that means

[01:37:04 - 01:37:08]
we're going to perform web search we

[01:37:06 - 01:37:10]
then add that to our state dict at the

[01:37:08 - 01:37:12]
end so run web search now that value is

[01:37:10 - 01:37:14]
true that's

[01:37:12 - 01:37:16]
it and you can kind of see we go through

[01:37:14 - 01:37:20]
some other nodes here there's web search

[01:37:16 - 01:37:23]
node um now here is where our one

[01:37:20 - 01:37:24]
conditional Edge we Define right here

[01:37:23 - 01:37:27]
this is where where we decide to

[01:37:24 - 01:37:30]
generate or not based on that search key

[01:37:27 - 01:37:32]
so we again get our state let's extract

[01:37:30 - 01:37:37]
the various values so we have this

[01:37:32 - 01:37:40]
search value now if search is yes we

[01:37:37 - 01:37:42]
return the next no that we want to go to

[01:37:40 - 01:37:46]
so in this case it'll be transform query

[01:37:42 - 01:37:47]
which will then go to web search else we

[01:37:46 - 01:37:51]
go to

[01:37:47 - 01:37:53]
generate so what we can see is we laid

[01:37:51 - 01:37:55]
out our graph which you can kind of see

[01:37:53 - 01:37:57]
up

[01:37:55 - 01:38:01]
here and now we Define functions for all

[01:37:57 - 01:38:05]
those nodes as well as the conditional

[01:38:01 - 01:38:08]
Edge and now we scroll down all we have

[01:38:05 - 01:38:10]
to do is just lay that out here again as

[01:38:08 - 01:38:11]
our flow and this is kind of what you

[01:38:10 - 01:38:13]
might think of as like kind of flow

[01:38:11 - 01:38:17]
engineering where you're just laying out

[01:38:13 - 01:38:19]
the graph as you drew it where we have

[01:38:17 - 01:38:21]
set our entry point as retrieve we're

[01:38:19 - 01:38:23]
adding an edge between retrieve and

[01:38:21 - 01:38:25]
grade documents so we went retrieval

[01:38:23 - 01:38:28]
grade documents we add our conditional

[01:38:25 - 01:38:31]
Edge depending on the grade either

[01:38:28 - 01:38:34]
transform the query go to web search or

[01:38:31 - 01:38:35]
just go to generate we create an edge

[01:38:34 - 01:38:38]
between transform the query and web

[01:38:35 - 01:38:40]
search then web search to generate and

[01:38:38 - 01:38:42]
then we also have an edge generate to

[01:38:40 - 01:38:44]
end and that's our whole graph that's it

[01:38:42 - 01:38:47]
so we can just run

[01:38:44 - 01:38:51]
this and now I'm going to ask a question

[01:38:47 - 01:38:53]
so let's just say um how does agent

[01:38:51 - 01:38:55]
memory work for example let's just try

[01:38:53 - 01:38:58]
that and what this is going to do is

[01:38:55 - 01:39:01]
going to print out what's going on as we

[01:38:58 - 01:39:03]
run through this graph so um first we

[01:39:01 - 01:39:05]
going to see output from

[01:39:03 - 01:39:07]
retrieve this is going to be all of our

[01:39:05 - 01:39:08]
documents that we retrieved so that's

[01:39:07 - 01:39:11]
that's fine this just from our our

[01:39:08 - 01:39:13]
retriever then you can see that we're

[01:39:11 - 01:39:15]
doing a relevance check across our

[01:39:13 - 01:39:17]
documents and this is kind of

[01:39:15 - 01:39:20]
interesting right you can see we grading

[01:39:17 - 01:39:23]
them here one is grade as not

[01:39:20 - 01:39:24]
relevant um and okay you can see the

[01:39:23 - 01:39:26]
documents are now filtered because we

[01:39:24 - 01:39:29]
removed the one that's not relevant and

[01:39:26 - 01:39:31]
because one is not relevant we decide

[01:39:29 - 01:39:33]
okay we're going to just transform the

[01:39:31 - 01:39:37]
query and run web

[01:39:33 - 01:39:39]
search and um you can see after query

[01:39:37 - 01:39:42]
transformation we rewrite the question

[01:39:39 - 01:39:44]
slightly we then run web

[01:39:42 - 01:39:47]
search um and you can see from web

[01:39:44 - 01:39:50]
search it searched from some additional

[01:39:47 - 01:39:51]
sources um which you can actually see

[01:39:50 - 01:39:55]
here it's

[01:39:51 - 01:39:57]
appended as a so here it is so here it's

[01:39:55 - 01:39:59]
a new document appended from web search

[01:39:57 - 01:40:01]
which is from memory knowledge

[01:39:59 - 01:40:03]
requirements so it it basically looked

[01:40:01 - 01:40:06]
up some AI architecture related to

[01:40:03 - 01:40:08]
memory uh web results so that's fine

[01:40:06 - 01:40:11]
that's exactly what we want to

[01:40:08 - 01:40:14]
do and then um we generate a

[01:40:11 - 01:40:15]
response so that's great and this is

[01:40:14 - 01:40:18]
just showing you everything in kind of

[01:40:15 - 01:40:19]
gory detail but I'm going to show you

[01:40:18 - 01:40:24]
one other thing that's that's really

[01:40:19 - 01:40:24]
nice about this if I go to lsmith

[01:40:24 - 01:40:29]
I have my AP I ke set so all my

[01:40:26 - 01:40:33]
Generations are just logged to to lsmith

[01:40:29 - 01:40:36]
and I can see my Lang graph run here now

[01:40:33 - 01:40:42]
what's really cool is this shows me all

[01:40:36 - 01:40:45]
of my nodes so remember we had retrieve

[01:40:42 - 01:40:47]
grade we evaluated the grade because one

[01:40:45 - 01:40:50]
was irrelevant we then went ahead and

[01:40:47 - 01:40:52]
transformed the query we did a web

[01:40:50 - 01:40:54]
search we pended that to our context you

[01:40:52 - 01:40:56]
can see all those steps are laid out

[01:40:54 - 01:40:59]
here in fact you can even look at every

[01:40:56 - 01:41:01]
single uh grader and its output I will

[01:40:59 - 01:41:04]
move this up

[01:41:01 - 01:41:06]
slightly um so you can see the the

[01:41:04 - 01:41:09]
different scores for grades okay so this

[01:41:06 - 01:41:11]
particular retrieval was graded as as

[01:41:09 - 01:41:15]
not relevant so that's fine that that

[01:41:11 - 01:41:18]
can happen in some cases and because of

[01:41:15 - 01:41:21]
that um we did a query transformation so

[01:41:18 - 01:41:23]
we modified the question slightly how

[01:41:21 - 01:41:25]
does memory how does the memory system

[01:41:23 - 01:41:27]
an artificial agents function so it's

[01:41:25 - 01:41:30]
just a minor rephrasing of the question

[01:41:27 - 01:41:33]
we did this Tav web search this is where

[01:41:30 - 01:41:35]
it queried from this particular blog

[01:41:33 - 01:41:37]
post from medium so it's like a sing web

[01:41:35 - 01:41:39]
query we can like sanity check it and

[01:41:37 - 01:41:41]
then what's need is we can go to our

[01:41:39 - 01:41:43]
generate step look at open Ai and here's

[01:41:41 - 01:41:46]
our full prompt how does the memory

[01:41:43 - 01:41:49]
system in our official agents function

[01:41:46 - 01:41:51]
and then here's all of our documents so

[01:41:49 - 01:41:54]
this is the this is the web search as

[01:41:51 - 01:41:57]
well as we still have the Rel chunks

[01:41:54 - 01:42:01]
that were retrieved from our blog posts

[01:41:57 - 01:42:05]
um and then here's our answer so that's

[01:42:01 - 01:42:09]
really it you can see how um really

[01:42:05 - 01:42:12]
moving from the notion of just like I'll

[01:42:09 - 01:42:14]
actually go back to the original um

[01:42:12 - 01:42:17]
moving

[01:42:14 - 01:42:18]
from uh I will try to open this up a

[01:42:17 - 01:42:22]
little

[01:42:18 - 01:42:22]
bit um

[01:42:24 - 01:42:33]
yeah I can see my face

[01:42:26 - 01:42:35]
still um the transition from laying out

[01:42:33 - 01:42:38]
simple

[01:42:35 - 01:42:40]
chains to

[01:42:38 - 01:42:42]
flows is a really interesting and

[01:42:40 - 01:42:45]
helpful way of thinking about why graphs

[01:42:42 - 01:42:48]
are really interesting because you can

[01:42:45 - 01:42:49]
encode more sophisticated logical

[01:42:48 - 01:42:51]
reasoning

[01:42:49 - 01:42:56]
workflows but in a

[01:42:51 - 01:42:58]
very like clean and well-engineered way

[01:42:56 - 01:43:00]
where you can specify all the

[01:42:58 - 01:43:01]
transitions that you actually want to

[01:43:00 - 01:43:05]
have

[01:43:01 - 01:43:08]
executed um and I actually find this way

[01:43:05 - 01:43:10]
of thinking and building kind of logical

[01:43:08 - 01:43:13]
uh like workflows really

[01:43:10 - 01:43:17]
intuitive um we have a blog post coming

[01:43:13 - 01:43:20]
out uh tomorrow that discusses both

[01:43:17 - 01:43:22]
implementing self rag as well as C rag

[01:43:20 - 01:43:25]
for two different active rag approaches

[01:43:22 - 01:43:28]
using using uh this idea of of State

[01:43:25 - 01:43:31]
machines and Lang graph um so I

[01:43:28 - 01:43:35]
encourage you to play with it uh I found

[01:43:31 - 01:43:38]
it really uh intuitive to work with um I

[01:43:35 - 01:43:43]
also found uh inspection of traces to be

[01:43:38 - 01:43:46]
quite intuitive using Lang graph because

[01:43:43 - 01:43:48]
every node is enumerated pretty clearly

[01:43:46 - 01:43:50]
for you which is not always the case

[01:43:48 - 01:43:52]
when you're using other types of of more

[01:43:50 - 01:43:56]
complex reasoning approaches for example

[01:43:52 - 01:43:58]
like agents so in any case um I hope

[01:43:56 - 01:44:00]
this was helpful and I definitely

[01:43:58 - 01:44:02]
encourage you to check out um kind of

[01:44:00 - 01:44:04]
this notion of like flow engineering

[01:44:02 - 01:44:06]
using Lang graph and in the context of

[01:44:04 - 01:44:09]
rag it can be really powerful hopefully

[01:44:06 - 01:44:12]
as you've seen here thank

[01:44:09 - 01:44:14]
you hey this is Lance from Lang chain I

[01:44:12 - 01:44:16]
want to talk to a recent paper that I

[01:44:14 - 01:44:17]
saw called adaptive rag which brings

[01:44:16 - 01:44:18]
together some interesting ideas that

[01:44:17 - 01:44:21]
have kind of been covered in other

[01:44:18 - 01:44:23]
videos but this actually ties them all

[01:44:21 - 01:44:27]
together in kind of a fun way so the the

[01:44:23 - 01:44:30]
two big ideas to talk about here are one

[01:44:27 - 01:44:31]
of query analysis so we've actually done

[01:44:30 - 01:44:32]
kind of a whole rag from scratch series

[01:44:31 - 01:44:35]
that walks through each of these things

[01:44:32 - 01:44:37]
in detail but this is a very nice

[01:44:35 - 01:44:39]
example of how this comes together um

[01:44:37 - 01:44:41]
with some other ideas we've been talking

[01:44:39 - 01:44:44]
about so query analysis is typically the

[01:44:41 - 01:44:46]
process of taking an input question and

[01:44:44 - 01:44:48]
modifying in some way uh to better

[01:44:46 - 01:44:50]
optimize retrieval there's a bunch of

[01:44:48 - 01:44:52]
different methods for this it could be

[01:44:50 - 01:44:54]
decomposing it into sub questions it

[01:44:52 - 01:44:57]
could be using some clever techniques

[01:44:54 - 01:44:59]
like stepb back prompting um but that's

[01:44:57 - 01:45:01]
kind of like the first stage of query

[01:44:59 - 01:45:03]
analysis then typically you can do

[01:45:01 - 01:45:05]
routing so you route a question to one

[01:45:03 - 01:45:08]
of multiple potential sources it could

[01:45:05 - 01:45:10]
be one or two different Vector stores it

[01:45:08 - 01:45:12]
could be relational DB versus Vector

[01:45:10 - 01:45:15]
store it could be web search it could

[01:45:12 - 01:45:17]
just be like an llm fallback right so

[01:45:15 - 01:45:18]
this is like one kind of big idea query

[01:45:17 - 01:45:20]
analysis right it's kind of like the

[01:45:18 - 01:45:22]
front end of your rag pipeline it's

[01:45:20 - 01:45:24]
taking your question it's modifying it

[01:45:22 - 01:45:26]
in some way it's sending it to the right

[01:45:24 - 01:45:29]
place be it a web search be it a vector

[01:45:26 - 01:45:32]
store be it a relational DB so that's

[01:45:29 - 01:45:34]
kind of topic one now topic two is

[01:45:32 - 01:45:36]
something that's been brought up in a

[01:45:34 - 01:45:40]
few other videos um of what I kind of

[01:45:36 - 01:45:43]
call Flow engineering or adaptive rag

[01:45:40 - 01:45:45]
which is the idea of doing tests in your

[01:45:43 - 01:45:47]
rag pipeline or in your rag inference

[01:45:45 - 01:45:51]
flow uh to do things like check

[01:45:47 - 01:45:53]
relevance documents um check whether or

[01:45:51 - 01:45:55]
not the answer contains hallucinations

[01:45:53 - 01:45:58]
so this recent blog post from Hamil

[01:45:55 - 01:46:00]
Hussein actually covers evaluation in in

[01:45:58 - 01:46:01]
some really nice detail and one of the

[01:46:00 - 01:46:04]
things he highlighted

[01:46:01 - 01:46:06]
explicitly is actually this topic so he

[01:46:04 - 01:46:08]
talks about unit tests and in particular

[01:46:06 - 01:46:09]
he says something really interesting

[01:46:08 - 01:46:11]
here he says you know unlike typical

[01:46:09 - 01:46:14]
unit tests you want to organize these

[01:46:11 - 01:46:17]
assertions in places Beyond typical unit

[01:46:14 - 01:46:19]
testing such as data cleaning and here's

[01:46:17 - 01:46:21]
the key Point automatic retries during

[01:46:19 - 01:46:23]
model inference that's the key thing I

[01:46:21 - 01:46:25]
want to like draw your attention to to

[01:46:23 - 01:46:26]
it's a really nice approach we've talked

[01:46:25 - 01:46:28]
about some other papers that do that

[01:46:26 - 01:46:30]
like corrective rag self rag but it's

[01:46:28 - 01:46:33]
also cool to see it here and kind of

[01:46:30 - 01:46:34]
encapsulated in this way the main idea

[01:46:33 - 01:46:38]
is that you're using kind of unit tests

[01:46:34 - 01:46:39]
in your flow to make Corrections like if

[01:46:38 - 01:46:41]
your retrieval is bad you can correct

[01:46:39 - 01:46:43]
from that if your generation has

[01:46:41 - 01:46:45]
hallucinations you can correct from that

[01:46:43 - 01:46:47]
so I'm going to kind of draw out like a

[01:46:45 - 01:46:50]
cartoon diagram of what we're going to

[01:46:47 - 01:46:52]
do here and you can kind of see it here

[01:46:50 - 01:46:53]
we're starting with a question we talked

[01:46:52 - 01:46:55]
about query analysis we're going to take

[01:46:53 - 01:46:57]
our question and we're going to decide

[01:46:55 - 01:46:59]
where it needs to go and for this

[01:46:57 - 01:47:01]
particular toy example I'm going to say

[01:46:59 - 01:47:03]
either send it to a vector store send it

[01:47:01 - 01:47:05]
to web search or just have the llm

[01:47:03 - 01:47:06]
answer it right so that's like kind of

[01:47:05 - 01:47:08]
my fallback

[01:47:06 - 01:47:10]
Behavior then we're going to bring in

[01:47:08 - 01:47:13]
that idea of kind of online flow

[01:47:10 - 01:47:15]
engineering or unit testing where I'm

[01:47:13 - 01:47:17]
going to have my retrieval either from

[01:47:15 - 01:47:19]
the VOR store or web search I'm then

[01:47:17 - 01:47:21]
going to ask is this actually relevant

[01:47:19 - 01:47:23]
to the question if it isn't I'm actually

[01:47:21 - 01:47:24]
going to kick back to web sech so this

[01:47:23 - 01:47:27]
is a little bit more relevant in the

[01:47:24 - 01:47:29]
case if I've routed to to the vector

[01:47:27 - 01:47:32]
store done retrieval documents aren't

[01:47:29 - 01:47:34]
relevant I'll have a fallback

[01:47:32 - 01:47:36]
mechanism um then I'm going to generate

[01:47:34 - 01:47:39]
I check for hallucinations in my

[01:47:36 - 01:47:41]
generation and then I check for um for

[01:47:39 - 01:47:42]
whether or not the the generation

[01:47:41 - 01:47:44]
actually answers the question then I

[01:47:42 - 01:47:47]
return my answer so again we're tying

[01:47:44 - 01:47:49]
together two ideas one is query analysis

[01:47:47 - 01:47:51]
like basically taking a question routing

[01:47:49 - 01:47:54]
it to the right place modifying it as

[01:47:51 - 01:47:56]
needed and then kind of online unit

[01:47:54 - 01:48:00]
testing and iterative flow

[01:47:56 - 01:48:02]
feedback so to do this I've actually

[01:48:00 - 01:48:04]
heard a lot of people talk online about

[01:48:02 - 01:48:07]
command r a new model release from gooh

[01:48:04 - 01:48:08]
here it has some pretty nice properties

[01:48:07 - 01:48:11]
that I was kind of reading about

[01:48:08 - 01:48:14]
recently so one it has nice support for

[01:48:11 - 01:48:18]
Tool use and it does support query

[01:48:14 - 01:48:20]
writing in the context of tool use uh so

[01:48:18 - 01:48:22]
this all rolls up in really nice

[01:48:20 - 01:48:26]
capabilities for routing it's kind of

[01:48:22 - 01:48:28]
one now two it's small it's 35 billion

[01:48:26 - 01:48:30]
parameter uh it's actually open weight

[01:48:28 - 01:48:31]
so you can actually run this locally and

[01:48:30 - 01:48:34]
I've tried that we can we can talk about

[01:48:31 - 01:48:36]
that later uh so and it's also fast

[01:48:34 - 01:48:39]
served via the API so it's kind of a

[01:48:36 - 01:48:40]
small model and it's well tuned for rag

[01:48:39 - 01:48:43]
so I heard a lot of people talking about

[01:48:40 - 01:48:45]
using coher for Rag and it has a large

[01:48:43 - 01:48:47]
context 120,000 tokens so this like a

[01:48:45 - 01:48:49]
nice combination of properties it

[01:48:47 - 01:48:51]
supports to and routing it's small and

[01:48:49 - 01:48:54]
fast so it's like quick for grading and

[01:48:51 - 01:48:55]
it's well tuned for rag so it's actually

[01:48:54 - 01:48:57]
a really nice fit for this particular

[01:48:55 - 01:48:59]
workflow where I want to do query

[01:48:57 - 01:49:02]
analysis and routing and I want to do

[01:48:59 - 01:49:05]
kind of online checking uh and rag so

[01:49:02 - 01:49:07]
kind of there you go now let's just get

[01:49:05 - 01:49:09]
to the coding bit so I have a notebook

[01:49:07 - 01:49:11]
kind of like usual I've done a few pip

[01:49:09 - 01:49:13]
installs you can see it's nothing exotic

[01:49:11 - 01:49:16]
I'm bringing Lang chain coh here I set

[01:49:13 - 01:49:18]
my coher API key now I'm just going to

[01:49:16 - 01:49:20]
set this Lang chain project within

[01:49:18 - 01:49:23]
lsmith so all my traces for this go to

[01:49:20 - 01:49:25]
that project and I have enabled tracing

[01:49:23 - 01:49:27]
so I'm using Langs Smith here so we're

[01:49:25 - 01:49:28]
going to walk through this flow and

[01:49:27 - 01:49:30]
let's do the first thing let's just

[01:49:28 - 01:49:32]
build a vector store so I'm going to

[01:49:30 - 01:49:34]
build a vector store using coherent

[01:49:32 - 01:49:37]
beddings with chroma open source Vector

[01:49:34 - 01:49:39]
DB runs locally from three different web

[01:49:37 - 01:49:41]
pages on blog post that I like so it

[01:49:39 - 01:49:43]
pertains to agents prompt engineering

[01:49:41 - 01:49:46]
and adversarial attacks so now I have a

[01:49:43 - 01:49:48]
retriever I can run retriever invoke and

[01:49:46 - 01:49:50]
I can ask a question about you know

[01:49:48 - 01:49:53]
agent

[01:49:50 - 01:49:56]
memory agent

[01:49:53 - 01:49:58]
memory and there we go so we get

[01:49:56 - 01:50:01]
documents back so there we go we have a

[01:49:58 - 01:50:03]
retriever now now here's where I'm going

[01:50:01 - 01:50:06]
to bring in coh here I also want a

[01:50:03 - 01:50:08]
router so you look at our flow the first

[01:50:06 - 01:50:10]
step is this routing stage right so what

[01:50:08 - 01:50:14]
I'm going to do is I'm guess we going to

[01:50:10 - 01:50:17]
find two tools a web search tool and a

[01:50:14 - 01:50:18]
vector store tool okay in my Preamble is

[01:50:17 - 01:50:20]
just going to say you're an expert

[01:50:18 - 01:50:23]
routing user questions to Vector store

[01:50:20 - 01:50:25]
web search now here's the key I tell it

[01:50:23 - 01:50:28]
what the vector store has so again my

[01:50:25 - 01:50:30]
index my Vector store has agents prompt

[01:50:28 - 01:50:32]
engineering adial tax I just repeat that

[01:50:30 - 01:50:35]
here agents prompt adversarial tax so it

[01:50:32 - 01:50:36]
knows what's in the vector store um so

[01:50:35 - 01:50:40]
use it for questions on these topics

[01:50:36 - 01:50:42]
otherwise use web search so that's it I

[01:50:40 - 01:50:44]
use command R here now I'm going to bind

[01:50:42 - 01:50:47]
these tools to the model and attach the

[01:50:44 - 01:50:49]
Preamble and I have a structured LM

[01:50:47 - 01:50:51]
router so let's give it a let's give

[01:50:49 - 01:50:53]
this a few tests just to like kind of

[01:50:51 - 01:50:55]
sandbox this a little bit

[01:50:53 - 01:50:56]
so I can inval here's my chain I have a

[01:50:55 - 01:50:58]
router prompt I pass that to the

[01:50:56 - 01:51:01]
structured LM router which I defined

[01:50:58 - 01:51:02]
right here and um let's ask a few

[01:51:01 - 01:51:05]
different questions like who will the

[01:51:02 - 01:51:08]
Bears draft in the NFL draft with types

[01:51:05 - 01:51:10]
of agent memory and Hi how are you so

[01:51:08 - 01:51:13]
I'm going to kick that off and you can

[01:51:10 - 01:51:14]
see you know it does web search it does

[01:51:13 - 01:51:16]
it goes to Vector store and then

[01:51:14 - 01:51:19]
actually returns this false so that's

[01:51:16 - 01:51:20]
kind of interesting um this is actually

[01:51:19 - 01:51:23]
just

[01:51:20 - 01:51:26]
saying if it does not use either tool so

[01:51:23 - 01:51:28]
for that particular query web search or

[01:51:26 - 01:51:30]
the vector store was inappropriate it'll

[01:51:28 - 01:51:31]
just say hey I didn't call one of those

[01:51:30 - 01:51:35]
tools so that's interesting we'll use

[01:51:31 - 01:51:38]
that later so that's my router tool now

[01:51:35 - 01:51:40]
the second thing is my grader and here's

[01:51:38 - 01:51:43]
where I want to show you something

[01:51:40 - 01:51:45]
really nice that is generally useful uh

[01:51:43 - 01:51:48]
for many different problems you might

[01:51:45 - 01:51:51]
encounter so here's what I'm doing I'm

[01:51:48 - 01:51:54]
defining a data model uh for My Grade so

[01:51:51 - 01:51:57]
basically grade documents it's going to

[01:51:54 - 01:52:00]
have this is a pantic object it is just

[01:51:57 - 01:52:03]
basically a binary score here um field

[01:52:00 - 01:52:05]
specified here uh documents are relevant

[01:52:03 - 01:52:06]
to the question yes no I have a preamble

[01:52:05 - 01:52:09]
your grer assessing relevance of

[01:52:06 - 01:52:11]
retrieve documents to a user question um

[01:52:09 - 01:52:13]
blah blah blah so you know and then

[01:52:11 - 01:52:16]
basically give it a b score yes no I'm

[01:52:13 - 01:52:18]
using command R but here's the catch I'm

[01:52:16 - 01:52:21]
using this wi structured outputs thing

[01:52:18 - 01:52:23]
and I'm passing my grade documents uh

[01:52:21 - 01:52:26]
data model to that that so this is the

[01:52:23 - 01:52:29]
key thing we can test this right now as

[01:52:26 - 01:52:31]
well it's going to return an object

[01:52:29 - 01:52:33]
based on the schema I give it which is

[01:52:31 - 01:52:36]
extremely useful for all sorts of use

[01:52:33 - 01:52:39]
cases and let's actually Zoom back up so

[01:52:36 - 01:52:41]
we're actually right here so this

[01:52:39 - 01:52:43]
greater stage right I want to constrain

[01:52:41 - 01:52:45]
the output to yes no I don't want any

[01:52:43 - 01:52:48]
preambles I want anything because the

[01:52:45 - 01:52:50]
logic I'm going to build in this graph

[01:52:48 - 01:52:52]
is going to require a yes no binary

[01:52:50 - 01:52:53]
response from this particular Edge in

[01:52:52 - 01:52:55]
our graph

[01:52:53 - 01:52:56]
so that's why this greater tool is

[01:52:55 - 01:52:59]
really

[01:52:56 - 01:53:01]
useful and I'm asking like a mock

[01:52:59 - 01:53:03]
question types of agent memory I do a

[01:53:01 - 01:53:05]
retriever I do a retrieval from our

[01:53:03 - 01:53:08]
Vector store I get the tuck and I test

[01:53:05 - 01:53:11]
it um I invoke our greater retrieval

[01:53:08 - 01:53:13]
grater chain with the question the doc

[01:53:11 - 01:53:16]
text and it's relevant as we would

[01:53:13 - 01:53:17]
expect so that's good but again let's

[01:53:16 - 01:53:19]
just kind of look at that a little bit

[01:53:17 - 01:53:21]
more closely what's actually happening

[01:53:19 - 01:53:23]
under the hood here here's the pantic

[01:53:21 - 01:53:24]
object we passed

[01:53:23 - 01:53:26]
here's the document in question I'm

[01:53:24 - 01:53:29]
providing basically it's converting this

[01:53:26 - 01:53:31]
object into coher function schema it's

[01:53:29 - 01:53:34]
binding that to the

[01:53:31 - 01:53:37]
llm we pass in the document question it

[01:53:34 - 01:53:41]
returns an object basic a Json string

[01:53:37 - 01:53:42]
per our pantic schema that's it and then

[01:53:41 - 01:53:44]
it's just going to like parse that into

[01:53:42 - 01:53:45]
a pantic object which we get at the end

[01:53:44 - 01:53:47]
of the day so that's what's happening

[01:53:45 - 01:53:49]
under the hood with this with structured

[01:53:47 - 01:53:50]
output thing but it's extremely useful

[01:53:49 - 01:53:53]
and you'll see we're going to use that a

[01:53:50 - 01:53:57]
few different places um um because we

[01:53:53 - 01:53:58]
want to ensure that in our in our flow

[01:53:57 - 01:54:00]
here we have three different grading

[01:53:58 - 01:54:02]
steps and each time we want to constrain

[01:54:00 - 01:54:04]
the output to yes no we're going to use

[01:54:02 - 01:54:07]
that structured output more than

[01:54:04 - 01:54:09]
once um this is just my generation so

[01:54:07 - 01:54:12]
this is good Old Rag let's just make

[01:54:09 - 01:54:15]
sure that works um I'm using rag chain

[01:54:12 - 01:54:19]
typical rag prompt again I'm using

[01:54:15 - 01:54:21]
cohere for rag pretty easy and yeah so

[01:54:19 - 01:54:24]
the rag piece works that's totally fine

[01:54:21 - 01:54:27]
nothing to it crazy there um I'm going

[01:54:24 - 01:54:31]
to find this llm fallback so this is

[01:54:27 - 01:54:33]
basically if you saw a router chain if

[01:54:31 - 01:54:35]
it doesn't use a tool I want to fall

[01:54:33 - 01:54:37]
back and just fall back to the llm so

[01:54:35 - 01:54:39]
I'm going to kind of build that as a

[01:54:37 - 01:54:42]
little chain here so okay this is just a

[01:54:39 - 01:54:43]
fallback I have my Preamble just you're

[01:54:42 - 01:54:46]
you're an assistant answer the question

[01:54:43 - 01:54:48]
based upon your internal knowledge so

[01:54:46 - 01:54:51]
again that fallback behavior is what we

[01:54:48 - 01:54:53]
have here so what we've done already is

[01:54:51 - 01:54:56]
we defined our router piece we've

[01:54:53 - 01:54:58]
defined our our basic retrieval our

[01:54:56 - 01:55:01]
Vector store we already have here um

[01:54:58 - 01:55:04]
we've defined our first logic or like

[01:55:01 - 01:55:05]
grade check and we defined our fallback

[01:55:04 - 01:55:08]
and we're just kind of roll through the

[01:55:05 - 01:55:10]
parts of our graph and Define each piece

[01:55:08 - 01:55:11]
um so I'm going to have two other

[01:55:10 - 01:55:14]
graders and they're going to use the

[01:55:11 - 01:55:16]
same thing we just talked about slightly

[01:55:14 - 01:55:19]
different data model I mean same output

[01:55:16 - 01:55:22]
but actually just slightly different uh

[01:55:19 - 01:55:24]
prompt um and you know descript destion

[01:55:22 - 01:55:25]
this in this case is the aners grounded

[01:55:24 - 01:55:26]
the facts yes no this is my

[01:55:25 - 01:55:28]
hallucination

[01:55:26 - 01:55:31]
grater uh and then I have an answer

[01:55:28 - 01:55:32]
grader as well and I've also run a test

[01:55:31 - 01:55:35]
on each one and you can see I'm getting

[01:55:32 - 01:55:38]
binary this this these objects out have

[01:55:35 - 01:55:39]
a binary score so this a pantic object

[01:55:38 - 01:55:43]
with a binary score uh and that's

[01:55:39 - 01:55:46]
exactly what we want cool

[01:55:43 - 01:55:48]
and I have a Search tool so that's

[01:55:46 - 01:55:50]
really nice we've actually gone through

[01:55:48 - 01:55:51]
and we've kind of laid out I have like a

[01:55:50 - 01:55:54]
router I've tested it we have a vector

[01:55:51 - 01:55:55]
story tested we've tested each of our

[01:55:54 - 01:55:58]
graders here we've also tested

[01:55:55 - 01:56:00]
generation of just doing rag so we have

[01:55:58 - 01:56:02]
a bunch of pieces built here we have a

[01:56:00 - 01:56:04]
fallback piece we have web search now

[01:56:02 - 01:56:06]
the question is how do I Stitch these

[01:56:04 - 01:56:09]
together into this kind of flow and for

[01:56:06 - 01:56:10]
that I I like to use Lang graph we'll

[01:56:09 - 01:56:12]
talk a little about Lang graph versus

[01:56:10 - 01:56:14]
agents a bit later but I want to show

[01:56:12 - 01:56:17]
you why this is really easy to do using

[01:56:14 - 01:56:19]
Lang graph so what's kind of nice is

[01:56:17 - 01:56:21]
I've kind of laid out all my logic here

[01:56:19 - 01:56:22]
we've tested individually and now all

[01:56:21 - 01:56:25]
I'm going to do

[01:56:22 - 01:56:27]
is I'm going to first lay out uh the

[01:56:25 - 01:56:30]
parts of my graph so what you're going

[01:56:27 - 01:56:32]
to notice here is first there's a graph

[01:56:30 - 01:56:35]
state so this state represents kind of

[01:56:32 - 01:56:36]
the key parts of the graph or the key

[01:56:35 - 01:56:38]
kind of objects within the graph that

[01:56:36 - 01:56:40]
we're going to be modifying so this is

[01:56:38 - 01:56:42]
basically a graph centered around rag

[01:56:40 - 01:56:44]
we're going to have question generation

[01:56:42 - 01:56:45]
and documents that's really kind of the

[01:56:44 - 01:56:46]
main things we're going to be working

[01:56:45 - 01:56:49]
with in our

[01:56:46 - 01:56:51]
graph so then you're going to see

[01:56:49 - 01:56:53]
something that's pretty intuitive I

[01:56:51 - 01:56:55]
think what you're going to see is we're

[01:56:53 - 01:56:57]
going to basically walk through this

[01:56:55 - 01:56:58]
flow and for each of these little

[01:56:57 - 01:57:02]
circles we're just going to find a

[01:56:58 - 01:57:04]
function and these uh little squares or

[01:57:02 - 01:57:06]
these these you can think about every

[01:57:04 - 01:57:08]
Circle as a node and every kind of

[01:57:06 - 01:57:10]
diamond here as as an edge or

[01:57:08 - 01:57:11]
conditional Edge so that's actually what

[01:57:10 - 01:57:14]
we're going to do right now we're going

[01:57:11 - 01:57:15]
to lay out all of our nodes and edges

[01:57:14 - 01:57:16]
and each one of them are just going to

[01:57:15 - 01:57:20]
be a function and you're going to see

[01:57:16 - 01:57:22]
how we do that right now so I'm going to

[01:57:20 - 01:57:23]
go down here I def find my graph state

[01:57:22 - 01:57:24]
so this is what's going to be kind of

[01:57:23 - 01:57:27]
modified and propagated throughout my

[01:57:24 - 01:57:29]
graph now all I'm going to do is I'm

[01:57:27 - 01:57:32]
just going to find a function uh for

[01:57:29 - 01:57:33]
each of those nodes so let me kind of go

[01:57:32 - 01:57:35]
side by side and show you the diagram

[01:57:33 - 01:57:38]
and then like kind of show the nodes

[01:57:35 - 01:57:42]
next to it so here's the

[01:57:38 - 01:57:43]
diagram so we have uh a retrieve node so

[01:57:42 - 01:57:46]
that kind of represents our Vector store

[01:57:43 - 01:57:49]
we have a fallback node that's this

[01:57:46 - 01:57:51]
piece we have a generate node so that's

[01:57:49 - 01:57:54]
basically going to do our rag you can

[01:57:51 - 01:57:55]
see there we have a grade documents node

[01:57:54 - 01:57:58]
kind of right

[01:57:55 - 01:58:02]
here um and we have a web search node so

[01:57:58 - 01:58:04]
that's right here cool now here's where

[01:58:02 - 01:58:05]
we're actually to find the edges so you

[01:58:04 - 01:58:06]
can see our edges are the pieces of the

[01:58:05 - 01:58:09]
graph that are kind of making different

[01:58:06 - 01:58:12]
decisions so this route question Edge

[01:58:09 - 01:58:14]
basic conditional Edge is basically

[01:58:12 - 01:58:15]
going to take an input question and

[01:58:14 - 01:58:18]
decide where it needs to go and that's

[01:58:15 - 01:58:20]
all we're doing down here it kind of

[01:58:18 - 01:58:23]
follows what we did up at the top where

[01:58:20 - 01:58:24]
we tested this individually so recall we

[01:58:23 - 01:58:27]
basically just invoke that question

[01:58:24 - 01:58:30]
router returns our source now remember

[01:58:27 - 01:58:32]
if tool calls were not in the source we

[01:58:30 - 01:58:34]
do our fall back so we show actually

[01:58:32 - 01:58:36]
showed that all the way up here remember

[01:58:34 - 01:58:38]
this if tool calls is not in the

[01:58:36 - 01:58:39]
response this thing will just be false

[01:58:38 - 01:58:43]
so that means we didn't either we didn't

[01:58:39 - 01:58:45]
call web search and we didn't call uh

[01:58:43 - 01:58:46]
our retriever tool so then we're just

[01:58:45 - 01:58:48]
going to fall

[01:58:46 - 01:58:53]
back

[01:58:48 - 01:58:54]
um yep right here and this is just like

[01:58:53 - 01:58:57]
uh you know a catch just in case a tool

[01:58:54 - 01:58:59]
could make a decision but most

[01:58:57 - 01:59:02]
interestingly here's where we choose a

[01:58:59 - 01:59:05]
data source basically so um this is the

[01:59:02 - 01:59:08]
output of our tool call we're just going

[01:59:05 - 01:59:10]
to fish out the name of the tool so

[01:59:08 - 01:59:12]
that's data source and then here we go

[01:59:10 - 01:59:14]
if the data source is web search I'm

[01:59:12 - 01:59:18]
returning web search as basically the

[01:59:14 - 01:59:19]
next node to go to um otherwise if it's

[01:59:18 - 01:59:22]
Vector store we return Vector store as

[01:59:19 - 01:59:24]
the next node to go to so what's this

[01:59:22 - 01:59:27]
search thing well remember we right up

[01:59:24 - 01:59:30]
here Define this node web search that's

[01:59:27 - 01:59:32]
it we're just going to go to that node

[01:59:30 - 01:59:35]
um what's this Vector store um you'll

[01:59:32 - 01:59:36]
see below how we can kind of tie these

[01:59:35 - 01:59:38]
strings that we returned from the

[01:59:36 - 01:59:42]
conditional Edge to the node we want to

[01:59:38 - 01:59:44]
go to that's really it um same kind of

[01:59:42 - 01:59:46]
thing here decide to generate that's

[01:59:44 - 01:59:49]
going to roll in these two conditional

[01:59:46 - 01:59:51]
edges into one um and basically it's

[01:59:49 - 01:59:54]
going to do if there's no documents so

[01:59:51 - 01:59:56]
basic basically if we filtered out all

[01:59:54 - 02:00:01]
of our documents from this first test

[01:59:56 - 02:00:02]
here um then what we're going to do is

[02:00:01 - 02:00:04]
we've decided all documents are not

[02:00:02 - 02:00:06]
relevant to the question and we're going

[02:00:04 - 02:00:09]
to kick back to web search exactly as we

[02:00:06 - 02:00:11]
show here so that's this piece um

[02:00:09 - 02:00:14]
otherwise we're going to go to generate

[02:00:11 - 02:00:15]
so that's this piece so again in these

[02:00:14 - 02:00:17]
conditional edges you're basically

[02:00:15 - 02:00:19]
implementing the logic that you see in

[02:00:17 - 02:00:23]
our diagram right here that's all that's

[02:00:19 - 02:00:25]
going on um and again this is just

[02:00:23 - 02:00:27]
implementing the final two checks uh for

[02:00:25 - 02:00:30]
hallucinations and and answer

[02:00:27 - 02:00:34]
relevance um

[02:00:30 - 02:00:38]
and um yep so here's our hallucination

[02:00:34 - 02:00:39]
grader we then extract the grade if the

[02:00:38 - 02:00:42]
if basically there are

[02:00:39 - 02:00:45]
hallucinations um oh sorry in this case

[02:00:42 - 02:00:48]
the grade actually yes means that the

[02:00:45 - 02:00:50]
answer is grounded so we say answer is

[02:00:48 - 02:00:52]
actually grounded and then we go to the

[02:00:50 - 02:00:53]
next step we go to the next test that's

[02:00:52 - 02:00:55]
all this is doing it's just basically

[02:00:53 - 02:00:57]
wrapping this logic that we're

[02:00:55 - 02:00:59]
implementing here in our graph so that's

[02:00:57 - 02:01:02]
all that's going on and let's go ahead

[02:00:59 - 02:01:05]
and Define all those things so nice we

[02:01:02 - 02:01:09]
have all that um now we can actually go

[02:01:05 - 02:01:12]
down a little bit and we can pull

[02:01:09 - 02:01:13]
um this is actually where we stitch

[02:01:12 - 02:01:16]
together everything so all it's

[02:01:13 - 02:01:18]
happening here is you see we defined all

[02:01:16 - 02:01:21]
these functions up here we just add them

[02:01:18 - 02:01:24]
as nodes in our graph here and then we

[02:01:21 - 02:01:26]
build our graph here basically by by

[02:01:24 - 02:01:29]
basically laying out the flow or the

[02:01:26 - 02:01:30]
connectivity between our nodes and edges

[02:01:29 - 02:01:31]
so you know you can look at this

[02:01:30 - 02:01:33]
notebook to kind of study in a bit of

[02:01:31 - 02:01:36]
detail what's going on but frankly what

[02:01:33 - 02:01:38]
I like to do here typically just draw

[02:01:36 - 02:01:42]
out a graph kind of like we did up

[02:01:38 - 02:01:45]
here and then Implement uh the Lo

[02:01:42 - 02:01:47]
logical flow here in your graph as nodes

[02:01:45 - 02:01:49]
and edges just like we're doing here

[02:01:47 - 02:01:51]
that's all that's happening uh so again

[02:01:49 - 02:01:52]
we have like our entry point is the

[02:01:51 - 02:01:55]
router

[02:01:52 - 02:01:57]
um this is like the output is this is

[02:01:55 - 02:02:00]
basically directing like here's what the

[02:01:57 - 02:02:03]
router is outputting and here's the next

[02:02:00 - 02:02:05]
node to go to so that's it um and then

[02:02:03 - 02:02:06]
for each node we're kind of applying

[02:02:05 - 02:02:09]
like we're saying like what's what's the

[02:02:06 - 02:02:12]
flow so web search goes to generate

[02:02:09 - 02:02:16]
after um and retrieve goes to grade

[02:02:12 - 02:02:18]
documents grade documents um kind of is

[02:02:16 - 02:02:19]
is like is a conditional Edge um

[02:02:18 - 02:02:21]
depending on the results we either do

[02:02:19 - 02:02:25]
web search or generate and then our

[02:02:21 - 02:02:27]
second one we go from generate to uh

[02:02:25 - 02:02:29]
basically this grade uh generation

[02:02:27 - 02:02:31]
versus documents in question based on

[02:02:29 - 02:02:34]
the output of that we either have

[02:02:31 - 02:02:36]
hallucinations we regenerate uh we found

[02:02:34 - 02:02:39]
that the answer is not useful we kick

[02:02:36 - 02:02:41]
back to web search or we end um finally

[02:02:39 - 02:02:44]
we have that llm fallback and that's

[02:02:41 - 02:02:46]
also if we go to the fallback we end so

[02:02:44 - 02:02:49]
what you're seeing here is actually the

[02:02:46 - 02:02:52]
the logic flow we're laying out in this

[02:02:49 - 02:02:54]
graph matches the diagram

[02:02:52 - 02:02:56]
that we laid out up top I'm just going

[02:02:54 - 02:02:57]
to copy these over and I'll actually go

[02:02:56 - 02:03:01]
then back to the diagram and and kind of

[02:02:57 - 02:03:03]
underscore that a little bit more so

[02:03:01 - 02:03:05]
here is the flow we've laid out again

[02:03:03 - 02:03:07]
here is our diagram and you can kind of

[02:03:05 - 02:03:10]
look at them side by side and see how

[02:03:07 - 02:03:12]
they basically match up so here's kind

[02:03:10 - 02:03:15]
of our flow diagram going from basically

[02:03:12 - 02:03:18]
query analysis that's this thing this

[02:03:15 - 02:03:20]
route question and you can see web

[02:03:18 - 02:03:22]
search Vector store LM fallback LM

[02:03:20 - 02:03:23]
fallback web search vector store so

[02:03:22 - 02:03:26]
those are like the three options that

[02:03:23 - 02:03:27]
can come out of this conditional Edge

[02:03:26 - 02:03:30]
and then here's where we connect so if

[02:03:27 - 02:03:31]
we go to web search then basically we

[02:03:30 - 02:03:34]
next go to

[02:03:31 - 02:03:38]
generate so that's kind of this whole

[02:03:34 - 02:03:41]
flow um now if we go to

[02:03:38 - 02:03:42]
retrieve um then we're going to grade so

[02:03:41 - 02:03:46]
that's

[02:03:42 - 02:03:49]
it um and you know it follows kind of as

[02:03:46 - 02:03:51]
you can see here that's really it uh so

[02:03:49 - 02:03:54]
it's just nice to draw the these

[02:03:51 - 02:03:56]
diagrams out first and then it's pretty

[02:03:54 - 02:03:59]
quick to implement each node and each

[02:03:56 - 02:04:00]
Edge just as a function and then stitch

[02:03:59 - 02:04:01]
them together in a graph just like I

[02:04:00 - 02:04:03]
show here and of course we'll make sure

[02:04:01 - 02:04:07]
this code's publ so you can use it as a

[02:04:03 - 02:04:10]
reference um so there we go now let's

[02:04:07 - 02:04:12]
try a few a few different test questions

[02:04:10 - 02:04:14]
so like what player the Bears to draft

[02:04:12 - 02:04:16]
and NFL draft right let's have a look at

[02:04:14 - 02:04:19]
that and they should print everything

[02:04:16 - 02:04:21]
it's doing as we go so okay this is

[02:04:19 - 02:04:23]
important route question it just decides

[02:04:21 - 02:04:24]
to route to web search that's good it

[02:04:23 - 02:04:26]
doesn't go to our Vector store this is a

[02:04:24 - 02:04:29]
current event not related to our Vector

[02:04:26 - 02:04:30]
store at all it goes to web search um

[02:04:29 - 02:04:32]
and then it goes to generate so that's

[02:04:30 - 02:04:35]
what we'd expect so basically web search

[02:04:32 - 02:04:38]
goes through to generate

[02:04:35 - 02:04:40]
um and we check hallucinations

[02:04:38 - 02:04:42]
Generations ground the documents we

[02:04:40 - 02:04:43]
check generation versus question the

[02:04:42 - 02:04:45]
generation addresses the question the

[02:04:43 - 02:04:48]
Chicago Bears expected to draft Caleb

[02:04:45 - 02:04:50]
Williams that's right that's that's the

[02:04:48 - 02:04:52]
consensus so cool that works now let's

[02:04:50 - 02:04:54]
ask a question related to our Vector

[02:04:52 - 02:04:56]
store what are the types of agent memory

[02:04:54 - 02:04:58]
we'll kick this off so we're routing

[02:04:56 - 02:05:01]
okay we're routing to rag now look how

[02:04:58 - 02:05:03]
fast this is that's really fast so we

[02:05:01 - 02:05:06]
basically whip through that document

[02:05:03 - 02:05:07]
grading determine they're all relevant

[02:05:06 - 02:05:10]
uh we go to decision to

[02:05:07 - 02:05:13]
generate um we check hallucinations we

[02:05:10 - 02:05:15]
check answer versus question and there

[02:05:13 - 02:05:16]
are several types of memory stored in

[02:05:15 - 02:05:19]
the human brain memory can also be

[02:05:16 - 02:05:20]
stored in G of Agents you have LM agents

[02:05:19 - 02:05:22]
memory stream retrieval model and and

[02:05:20 - 02:05:23]
reflection mechanism so it's

[02:05:22 - 02:05:25]
representing what's captured on the blog

[02:05:23 - 02:05:27]
post pretty reasonably now let me show

[02:05:25 - 02:05:29]
you something else is kind of nice I can

[02:05:27 - 02:05:31]
go to Langs Smith and I can go to my

[02:05:29 - 02:05:33]
projects we create this new project

[02:05:31 - 02:05:35]
coher adaptive rag at the start and

[02:05:33 - 02:05:37]
everything is actually logged there

[02:05:35 - 02:05:40]
everything we just did so I can open

[02:05:37 - 02:05:42]
this up and I can actually just kind of

[02:05:40 - 02:05:45]
look through all the stages of my Lang

[02:05:42 - 02:05:47]
graph to here's my retrieval stage um

[02:05:45 - 02:05:49]
here's my grade document stage and we

[02:05:47 - 02:05:51]
can kind of audit the grading itself we

[02:05:49 - 02:05:53]
kind of looked at this one by one

[02:05:51 - 02:05:54]
previously but it's actually pretty nice

[02:05:53 - 02:05:56]
we can actually audit every single

[02:05:54 - 02:06:00]
individual document grade to see what's

[02:05:56 - 02:06:02]
happening um we can basically go through

[02:06:00 - 02:06:05]
um to this is going to be one of the

[02:06:02 - 02:06:09]
other graders here

[02:06:05 - 02:06:12]
um yep so this is actually going to be

[02:06:09 - 02:06:13]
the hallucination grading right here uh

[02:06:12 - 02:06:15]
and then this is going to be the answer

[02:06:13 - 02:06:16]
grading right here so that's really it

[02:06:15 - 02:06:18]
you can kind of walk through the entire

[02:06:16 - 02:06:20]
graph you can you can kind of study

[02:06:18 - 02:06:23]
what's going on um which is actually

[02:06:20 - 02:06:25]
very useful so it looks like this worked

[02:06:23 - 02:06:27]
pretty well um and finally let's just

[02:06:25 - 02:06:30]
ask a question that should go to that

[02:06:27 - 02:06:32]
fallback uh path down at the bottom like

[02:06:30 - 02:06:34]
not related at all to our Vector store

[02:06:32 - 02:06:36]
current events and yeah hello I'm doing

[02:06:34 - 02:06:38]
well so it's pretty neat we've seen in

[02:06:36 - 02:06:40]
maybe 15 minutes we've from scratch

[02:06:38 - 02:06:42]
built basically a semi- sophisticated

[02:06:40 - 02:06:44]
rag system that has agentic properties

[02:06:42 - 02:06:46]
we've done in Lang graph we've done with

[02:06:44 - 02:06:48]
coher uh command R you can see it's

[02:06:46 - 02:06:50]
pretty darn fast in fact we can go to

[02:06:48 - 02:06:54]
Langs Smith and look at so this whole

[02:06:50 - 02:06:56]
thing took 7 seconds uh that is not bad

[02:06:54 - 02:06:58]
let's look at the most recent one so

[02:06:56 - 02:07:01]
this takes one second so the fallback

[02:06:58 - 02:07:04]
mechanism to the LM is like 1 second um

[02:07:01 - 02:07:08]
the let's just look here so 6 seconds

[02:07:04 - 02:07:10]
for the initial uh land graph so this is

[02:07:08 - 02:07:12]
not bad at all it's quite fast it done

[02:07:10 - 02:07:15]
it does quite a few different checks we

[02:07:12 - 02:07:17]
do routing uh and then we have kind of a

[02:07:15 - 02:07:20]
bunch of nice fallback behavior and

[02:07:17 - 02:07:23]
inline checking uh for both relevance

[02:07:20 - 02:07:27]
hallucinations and and answer uh kind of

[02:07:23 - 02:07:28]
groundedness or answer usefulness so you

[02:07:27 - 02:07:30]
know this is pretty nice I definitely

[02:07:28 - 02:07:31]
encourage you to play with a notebook

[02:07:30 - 02:07:33]
command R is a really nice option for

[02:07:31 - 02:07:36]
this due to the fact that is tool use

[02:07:33 - 02:07:38]
routing uh small and quite fast and it's

[02:07:36 - 02:07:41]
really good for Rags it's a very nice

[02:07:38 - 02:07:43]
kind of uh a very nice option for

[02:07:41 - 02:07:44]
workflows like this and I think you're

[02:07:43 - 02:07:47]
going to see more and more of this kind

[02:07:44 - 02:07:50]
of like uh adaptive or self-reflective

[02:07:47 - 02:07:53]
rag um just because this is something

[02:07:50 - 02:07:55]
that a lot systems can benefit from like

[02:07:53 - 02:07:57]
a a lot of production rack systems kind

[02:07:55 - 02:08:00]
of don't necessarily have

[02:07:57 - 02:08:03]
fallbacks uh depending on for example

[02:08:00 - 02:08:05]
like um you know if the documents

[02:08:03 - 02:08:07]
retrieved are not relevant uh if the

[02:08:05 - 02:08:09]
answer contains hallucinations and so

[02:08:07 - 02:08:11]
forth so this opportunity to apply

[02:08:09 - 02:08:13]
inline checking along with rag is like a

[02:08:11 - 02:08:15]
really nice theme I think we're going to

[02:08:13 - 02:08:17]
see more and more of especially as model

[02:08:15 - 02:08:18]
inference gets faster and faster and

[02:08:17 - 02:08:22]
these checks get cheaper and cheaper to

[02:08:18 - 02:08:23]
do kind of in the inference Loop

[02:08:22 - 02:08:25]
now as a final thing I do want to bring

[02:08:23 - 02:08:27]
up the a point about you know we've

[02:08:25 - 02:08:28]
shown this Lang graph stuff what about

[02:08:27 - 02:08:30]
agents you know how do you think about

[02:08:28 - 02:08:33]
agents versus Lang graph right and and I

[02:08:30 - 02:08:37]
think the way I like to frame this is

[02:08:33 - 02:08:41]
that um Lang graph is really good

[02:08:37 - 02:08:43]
for um flows that you have kind of very

[02:08:41 - 02:08:45]
clearly defined that don't have like

[02:08:43 - 02:08:47]
kind of open-endedness but like in this

[02:08:45 - 02:08:49]
case we know the steps we want to take

[02:08:47 - 02:08:51]
every time we want to do um basically

[02:08:49 - 02:08:53]
query analysis routing and then we want

[02:08:51 - 02:08:56]
to do a three grading steps and that's

[02:08:53 - 02:08:58]
it um Lang graph is really good for

[02:08:56 - 02:09:00]
building very reliable flows uh it's

[02:08:58 - 02:09:04]
kind of like putting an agent on guard

[02:09:00 - 02:09:07]
rails and it's really nice uh it's less

[02:09:04 - 02:09:08]
flexible but highly reliable and so you

[02:09:07 - 02:09:10]
can actually use smaller faster models

[02:09:08 - 02:09:12]
with langra so that's the thing I like

[02:09:10 - 02:09:14]
about we saw here command R 35 billion

[02:09:12 - 02:09:16]
parameter model works really well with

[02:09:14 - 02:09:18]
langra quite quick we' were able to

[02:09:16 - 02:09:21]
implement a pretty sophisticated rag

[02:09:18 - 02:09:23]
flow really quickly 15 minutes um in

[02:09:21 - 02:09:25]
time is on the order of like less than

[02:09:23 - 02:09:28]
you know around 5 to 6 seconds so so

[02:09:25 - 02:09:30]
pretty good right now what about agents

[02:09:28 - 02:09:32]
right so I think Agents come into play

[02:09:30 - 02:09:34]
when you want more flexible workflows

[02:09:32 - 02:09:36]
you don't want to necessarily follow a

[02:09:34 - 02:09:38]
defined pattern a priori you want an

[02:09:36 - 02:09:40]
agent to be able to kind of reason and

[02:09:38 - 02:09:41]
make of open-end decisions which is

[02:09:40 - 02:09:43]
interesting for certain like long

[02:09:41 - 02:09:44]
Horizon planning problems you know

[02:09:43 - 02:09:46]
agents are really

[02:09:44 - 02:09:48]
interesting the catch is that

[02:09:46 - 02:09:50]
reliability is a bit worse with agents

[02:09:48 - 02:09:52]
and so you know that's a big question a

[02:09:50 - 02:09:53]
lot of people bring up and that's kind

[02:09:52 - 02:09:55]
of where larger LMS kind of come into

[02:09:53 - 02:09:57]
play with a you know there's been a lot

[02:09:55 - 02:09:59]
of questions about using small LMS even

[02:09:57 - 02:10:01]
open source models with agents and

[02:09:59 - 02:10:03]
reliabilities kind of continuously being

[02:10:01 - 02:10:06]
an issue whereas I've been able to run

[02:10:03 - 02:10:09]
these types of land graphs with um with

[02:10:06 - 02:10:10]
uh like mraw or you know command R

[02:10:09 - 02:10:12]
actually is open weights you can run it

[02:10:10 - 02:10:14]
locally um I've been able to run them

[02:10:12 - 02:10:17]
very reproducibly with open source

[02:10:14 - 02:10:20]
models on my laptop um so you know I

[02:10:17 - 02:10:21]
think there's a tradeoff and Comm

[02:10:20 - 02:10:25]
actually there's a new coher model

[02:10:21 - 02:10:27]
coming out uh believe command R plus

[02:10:25 - 02:10:29]
which uh is a larger model so it's

[02:10:27 - 02:10:32]
probably more suitable for kind of more

[02:10:29 - 02:10:33]
open-ended agentic use cases and there's

[02:10:32 - 02:10:36]
actually a new integration with Lang

[02:10:33 - 02:10:38]
chain that support uh coher agents um

[02:10:36 - 02:10:40]
which is quite nice so I think it's it's

[02:10:38 - 02:10:42]
worth experimenting for certain problems

[02:10:40 - 02:10:43]
in workflows you may need more

[02:10:42 - 02:10:46]
open-ended reasoning in which case use

[02:10:43 - 02:10:49]
an agent with a larger model otherwise

[02:10:46 - 02:10:51]
you can use like Lang graph for more uh

[02:10:49 - 02:10:53]
a more reliable potential

[02:10:51 - 02:10:56]
but con strain flow and it can also use

[02:10:53 - 02:10:57]
smaller models faster LMS so those are

[02:10:56 - 02:10:59]
some of the trade-offs to keep in mind

[02:10:57 - 02:11:01]
but anyway encourage you play with a

[02:10:59 - 02:11:03]
notebook explore for yourself I think

[02:11:01 - 02:11:04]
command R is a really nice model um I've

[02:11:03 - 02:11:07]
also been experimenting with running it

[02:11:04 - 02:11:09]
locally with AMA uh currently the

[02:11:07 - 02:11:14]
quantise model is like uh two bit

[02:11:09 - 02:11:17]
quantise is like 13 billion uh or so uh

[02:11:14 - 02:11:22]
yeah 13 gigs it's it's a little bit too

[02:11:17 - 02:11:25]
large to run quickly locally for me

[02:11:22 - 02:11:27]
um inference for things like rag we're

[02:11:25 - 02:11:29]
on the order of 30 seconds so again it's

[02:11:27 - 02:11:30]
not great for a live demo but it does

[02:11:29 - 02:11:32]
work it is available on a llama so I

[02:11:30 - 02:11:35]
encourage you to play with that I have a

[02:11:32 - 02:11:36]
Mac M2 32 gig um so you know if I if

[02:11:35 - 02:11:38]
you're a larger machine then it

[02:11:36 - 02:11:40]
absolutely could be worth working with

[02:11:38 - 02:11:41]
locally so encourage you to play with

[02:11:40 - 02:11:43]
that anyway hopefully this was useful

[02:11:41 - 02:11:46]
and interesting I think this is a cool

[02:11:43 - 02:11:48]
paper cool flow um coher command R is a

[02:11:46 - 02:11:52]
nice option for these types of like

[02:11:48 - 02:11:55]
routing uh it's quick good with Lang

[02:11:52 - 02:11:57]
graph good for rag good for Tool use so

[02:11:55 - 02:12:00]
you know have a have a look and uh you

[02:11:57 - 02:12:03]
know reply anything uh any feedback in

[02:12:00 - 02:12:03]
the comments

[02:12:06 - 02:12:10]
thanks hi this is Lance from Lang chain

[02:12:09 - 02:12:13]
this is a talk I gave at two recent

[02:12:10 - 02:12:16]
meetups in San Francisco called is rag

[02:12:13 - 02:12:17]
really dead um and I figured since you

[02:12:16 - 02:12:19]
know a lot of people actually weren't

[02:12:17 - 02:12:21]
able to make those meetups uh I just

[02:12:19 - 02:12:24]
record this and put this on YouTube and

[02:12:21 - 02:12:26]
see if this is of interest to folks um

[02:12:24 - 02:12:29]
so we all kind of recognize that Contex

[02:12:26 - 02:12:31]
windows are getting larger for llms so

[02:12:29 - 02:12:33]
on the x-axis you can see the tokens

[02:12:31 - 02:12:35]
used in pre-training that's of course

[02:12:33 - 02:12:37]
you know getting larger as well um

[02:12:35 - 02:12:39]
proprietary models are somewhere over

[02:12:37 - 02:12:41]
the two trillion token regime we don't

[02:12:39 - 02:12:43]
quite know where they sit uh and we've

[02:12:41 - 02:12:46]
all the way down to smaller models like

[02:12:43 - 02:12:49]
52 trained on far fewer tokens um but

[02:12:46 - 02:12:52]
what's really notable is on the y axis

[02:12:49 - 02:12:54]
you can see about a year ago da the art

[02:12:52 - 02:12:56]
models were on the order of 4,000 to

[02:12:54 - 02:12:59]
8,000 tokens and that's you know dozens

[02:12:56 - 02:13:02]
of pages um we saw Claude 2 come out

[02:12:59 - 02:13:06]
with the 200,000 token model earlier I

[02:13:02 - 02:13:09]
think it was last year um gbd4 128,000

[02:13:06 - 02:13:11]
tokens now that's hundreds of pages and

[02:13:09 - 02:13:13]
now we're seeing Claud 3 and Gemini come

[02:13:11 - 02:13:16]
out with million token models so this is

[02:13:13 - 02:13:17]
hundreds to thousands of pages so

[02:13:16 - 02:13:19]
because of this phenomenon people have

[02:13:17 - 02:13:22]
been kind of wondering is rag dead if

[02:13:19 - 02:13:24]
you can stuff you know many thousands of

[02:13:22 - 02:13:27]
pages into the context window llm why do

[02:13:24 - 02:13:29]
you need a reteval system um it's a good

[02:13:27 - 02:13:32]
question spoke sparked a lot of

[02:13:29 - 02:13:33]
interesting debate on Twitter um and

[02:13:32 - 02:13:35]
it's maybe first just kind of grounding

[02:13:33 - 02:13:37]
on what is rag so rag is really the

[02:13:35 - 02:13:40]
process of reasoning and retrieval over

[02:13:37 - 02:13:42]
chunks of of information that have been

[02:13:40 - 02:13:45]
retrieved um it's starting with you know

[02:13:42 - 02:13:47]
documents that are indexed um they're

[02:13:45 - 02:13:48]
retrievable through some mechanism

[02:13:47 - 02:13:50]
typically some kind of semantic

[02:13:48 - 02:13:51]
similarity search or keyword search

[02:13:50 - 02:13:54]
other mechanisms

[02:13:51 - 02:13:56]
retriev docs should then pass to an llm

[02:13:54 - 02:13:58]
and the llm reasons about them to ground

[02:13:56 - 02:14:00]
response to the question in the retrieve

[02:13:58 - 02:14:02]
document so that's kind of the overall

[02:14:00 - 02:14:04]
flow but the important point to make is

[02:14:02 - 02:14:06]
that typically it's multiple documents

[02:14:04 - 02:14:08]
and involve some form of

[02:14:06 - 02:14:10]
reasoning so one of the questions I

[02:14:08 - 02:14:12]
asked recently is you know if long

[02:14:10 - 02:14:15]
condex llms can replace rag it should be

[02:14:12 - 02:14:16]
able to perform you know multia

[02:14:15 - 02:14:19]
retrieval and reasoning from its own

[02:14:16 - 02:14:21]
context really effectively so I teamed

[02:14:19 - 02:14:23]
up with Greg Cameron uh to kind of

[02:14:21 - 02:14:25]
pressure test this and he had done some

[02:14:23 - 02:14:28]
really nice needle the Haack analyses

[02:14:25 - 02:14:31]
already focused on kind of single facts

[02:14:28 - 02:14:33]
called needles placed in a Hy stack of

[02:14:31 - 02:14:36]
Paul Graham essays um so I kind of

[02:14:33 - 02:14:39]
extended that to kind of mirror the rag

[02:14:36 - 02:14:41]
use case or kind of the rag context uh

[02:14:39 - 02:14:45]
where I took multiple facts so I call it

[02:14:41 - 02:14:46]
multi needle um I buil on a funny needle

[02:14:45 - 02:14:48]
in the HTO challenge published by

[02:14:46 - 02:14:51]
anthropic where they add they basically

[02:14:48 - 02:14:53]
placed Pizza ingredients in the context

[02:14:51 - 02:14:56]
uh and asked the LM to retrieve this

[02:14:53 - 02:14:58]
combination of pizza ingredients I did I

[02:14:56 - 02:14:59]
kind of Rift on that and I basically

[02:14:58 - 02:15:01]
split the pizza ingredients up into

[02:14:59 - 02:15:03]
three different needles and place those

[02:15:01 - 02:15:06]
three ingredients in different places in

[02:15:03 - 02:15:09]
the context and then ask the um to

[02:15:06 - 02:15:12]
recover those three ingredients um from

[02:15:09 - 02:15:13]
the context so again the setup is the

[02:15:12 - 02:15:15]
question is what the secret ingredients

[02:15:13 - 02:15:17]
need to build a perfect Pizza the

[02:15:15 - 02:15:21]
needles are the ingredients figs Pudo

[02:15:17 - 02:15:23]
goat cheese um I place them in the

[02:15:21 - 02:15:25]
context at some specified intervals the

[02:15:23 - 02:15:28]
way this test works is you can basically

[02:15:25 - 02:15:30]
set the percent of context you want to

[02:15:28 - 02:15:31]
place the first needle and the remaining

[02:15:30 - 02:15:33]
two are placed at roughly equal

[02:15:31 - 02:15:35]
intervals in the remaining context after

[02:15:33 - 02:15:36]
the first so that's kind of the way the

[02:15:35 - 02:15:39]
test is set up now it's all open source

[02:15:36 - 02:15:42]
by the way the link is below so needs

[02:15:39 - 02:15:45]
are placed um you ask a question you

[02:15:42 - 02:15:47]
promp L them with with kind of um with

[02:15:45 - 02:15:48]
this context and the question and then

[02:15:47 - 02:15:51]
produces the answer and now the the

[02:15:48 - 02:15:55]
framework will grade the response

[02:15:51 - 02:15:56]
both one are you know all are all the

[02:15:55 - 02:16:00]
the specified ingredients present in the

[02:15:56 - 02:16:03]
answer and two if not which ones are

[02:16:00 - 02:16:05]
missing so I ran a bunch of analysis on

[02:16:03 - 02:16:07]
this with GPD 4 and came kind of came up

[02:16:05 - 02:16:09]
with some with some fun results um so

[02:16:07 - 02:16:11]
you can see on the left here what this

[02:16:09 - 02:16:14]
is looking at is different numbers of

[02:16:11 - 02:16:15]
needles placed in 120,000 token context

[02:16:14 - 02:16:20]
window for

[02:16:15 - 02:16:24]
gbd4 and I'm asking um gbd4 to retrieve

[02:16:20 - 02:16:26]
either one three or 10 needles now I'm

[02:16:24 - 02:16:28]
also asking it to do reasoning on those

[02:16:26 - 02:16:30]
needles that's what you can see in those

[02:16:28 - 02:16:32]
red bars so green is just retrieve the

[02:16:30 - 02:16:34]
ingredients red is reasoning and the

[02:16:32 - 02:16:37]
reasoning challenge here is just return

[02:16:34 - 02:16:39]
the first letter of each ingredient so

[02:16:37 - 02:16:42]
we find is basically two things the

[02:16:39 - 02:16:44]
performance or the percentage of needles

[02:16:42 - 02:16:45]
retrieved drops with respect to the

[02:16:44 - 02:16:48]
number of needles that's kind of

[02:16:45 - 02:16:50]
intuitive you place more facts

[02:16:48 - 02:16:53]
performance gets worse but also it gets

[02:16:50 - 02:16:56]
worse if you ask it to reason so if you

[02:16:53 - 02:16:58]
say um just return the needles it does a

[02:16:56 - 02:17:00]
little bit better than if you say return

[02:16:58 - 02:17:02]
the needles and tell me the first letter

[02:17:00 - 02:17:06]
so you overlay reasoning so this is the

[02:17:02 - 02:17:09]
first observation more facts is harder

[02:17:06 - 02:17:11]
uh and reasoning is harder uh than just

[02:17:09 - 02:17:12]
retrieval now the second question we ask

[02:17:11 - 02:17:14]
is where are these needles actually

[02:17:12 - 02:17:18]
present in the context that we're

[02:17:14 - 02:17:23]
missing right so we know for example um

[02:17:18 - 02:17:26]
retrieval of um 10 needles is around 60%

[02:17:23 - 02:17:28]
so where are the missing needles in the

[02:17:26 - 02:17:30]
context so on the right you can see

[02:17:28 - 02:17:33]
results telling us actually which

[02:17:30 - 02:17:36]
specific needles uh are are the model

[02:17:33 - 02:17:39]
fails to retrieve so what we can see is

[02:17:36 - 02:17:42]
as you go from a th000 tokens up to

[02:17:39 - 02:17:44]
120,000 tokens on the X here and you

[02:17:42 - 02:17:46]
look at needle one place at the start of

[02:17:44 - 02:17:49]
the document to needle 10 placed at the

[02:17:46 - 02:17:52]
end at a th000 token context link you

[02:17:49 - 02:17:54]
can retrieve them all so again kind of

[02:17:52 - 02:17:56]
match what we see over here small well

[02:17:54 - 02:17:59]
actually sorry over here everything I'm

[02:17:56 - 02:18:01]
looking at is 120,000 tokens so that's

[02:17:59 - 02:18:04]
really not the point uh the point is

[02:18:01 - 02:18:08]
actually smaller context uh better

[02:18:04 - 02:18:10]
retrieval so that's kind of point one um

[02:18:08 - 02:18:14]
as I increase the context window I

[02:18:10 - 02:18:15]
actually see that uh there is increased

[02:18:14 - 02:18:18]
failure to retrieve needles which you

[02:18:15 - 02:18:19]
see can see in red here towards the

[02:18:18 - 02:18:21]
start of the

[02:18:19 - 02:18:23]
document um and so this is an

[02:18:21 - 02:18:25]
interesting result um and it actually

[02:18:23 - 02:18:27]
matches what Greg saw with single needle

[02:18:25 - 02:18:31]
case as well so the way to think about

[02:18:27 - 02:18:33]
it is it appears that um you know if you

[02:18:31 - 02:18:34]
for example read a book and I asked you

[02:18:33 - 02:18:36]
a question about the first chapter you

[02:18:34 - 02:18:38]
might have forgotten it same kind of

[02:18:36 - 02:18:40]
phenomenon appears to happen here with

[02:18:38 - 02:18:42]
retrieval where needles towards the

[02:18:40 - 02:18:45]
start of the context are are kind of

[02:18:42 - 02:18:47]
Forgotten or are not well retrieved

[02:18:45 - 02:18:49]
relative to those of the end so this is

[02:18:47 - 02:18:51]
an effect we see with gbd4 it's been

[02:18:49 - 02:18:53]
reproduced quite a bit so ran nine

[02:18:51 - 02:18:55]
different trials here Greg's also seen

[02:18:53 - 02:18:57]
this repeatedly with single needle so it

[02:18:55 - 02:18:59]
seems like a pretty consistent

[02:18:57 - 02:19:00]
result and there's an interesting point

[02:18:59 - 02:19:03]
I put this on Twitter and a number of

[02:19:00 - 02:19:04]
folks um you know replied and someone

[02:19:03 - 02:19:07]
sent me this paper which is pretty

[02:19:04 - 02:19:09]
interesting and it mentions recency bias

[02:19:07 - 02:19:10]
is one possible reason so the most

[02:19:09 - 02:19:14]
informative tokens for predicting the

[02:19:10 - 02:19:17]
next token uh you know are are are

[02:19:14 - 02:19:18]
present close to or recent to kind of

[02:19:17 - 02:19:20]
where you're doing your generation and

[02:19:18 - 02:19:23]
so there's a bias to attend to recent

[02:19:20 - 02:19:26]
tokens which is obviously not great for

[02:19:23 - 02:19:30]
the retrieval problem as we saw here so

[02:19:26 - 02:19:32]
again the results show us that um

[02:19:30 - 02:19:34]
reasoning is a bit harder than retrieval

[02:19:32 - 02:19:36]
more needles is more difficult and

[02:19:34 - 02:19:38]
needles towards the start of your

[02:19:36 - 02:19:40]
context are harder to retrieve than

[02:19:38 - 02:19:42]
towards the end those are three main

[02:19:40 - 02:19:45]
observations from this and it maybe

[02:19:42 - 02:19:47]
indeed due to this recency bias so

[02:19:45 - 02:19:49]
overall what this kind of tells you is

[02:19:47 - 02:19:51]
be wary of just context stuffing in

[02:19:49 - 02:19:52]
large long context

[02:19:51 - 02:19:55]
there are no retrieval

[02:19:52 - 02:19:56]
guarantees and also there's some recent

[02:19:55 - 02:19:58]
results that came out actually just

[02:19:56 - 02:20:02]
today suggesting that single needle may

[02:19:58 - 02:20:04]
be misleadingly easy um you know there's

[02:20:02 - 02:20:08]
no reasoning it's retrieving a single

[02:20:04 - 02:20:12]
needle um and also these guys I'm I

[02:20:08 - 02:20:13]
showed this tweet here show that um the

[02:20:12 - 02:20:16]
in a lot of these needle and Haack

[02:20:13 - 02:20:20]
challenges including mine the facts that

[02:20:16 - 02:20:21]
we look for are very different than um

[02:20:20 - 02:20:23]
the background kind of Hy stack of Paul

[02:20:21 - 02:20:25]
Graham essays and so that may be kind of

[02:20:23 - 02:20:28]
an interesting artifact they note that

[02:20:25 - 02:20:31]
indeed if the needle is more subtle

[02:20:28 - 02:20:33]
retrievals is worse so I think basically

[02:20:31 - 02:20:35]
when you see these really strong

[02:20:33 - 02:20:37]
performing needle and hyack analyses put

[02:20:35 - 02:20:39]
up by model providers you should be

[02:20:37 - 02:20:40]
skeptical um you shouldn't necessarily

[02:20:39 - 02:20:41]
assume that you're going to get high

[02:20:40 - 02:20:45]
quality retrieval from these long

[02:20:41 - 02:20:46]
contact LMS uh for numerous reasons you

[02:20:45 - 02:20:48]
need to think about retrieval of

[02:20:46 - 02:20:50]
multiple facts um you need to think

[02:20:48 - 02:20:52]
about reasoning on top of retrieval you

[02:20:50 - 02:20:54]
need need to think about the subtlety of

[02:20:52 - 02:20:56]
the retrieval relative to the background

[02:20:54 - 02:20:57]
context because for many of these needle

[02:20:56 - 02:21:00]
and the Haack challenges it's a single

[02:20:57 - 02:21:01]
needle no reasoning and the needle

[02:21:00 - 02:21:03]
itself is very different from the

[02:21:01 - 02:21:05]
background so anyway those may all make

[02:21:03 - 02:21:07]
the challenge a bit easier than a real

[02:21:05 - 02:21:09]
world scenario of fact retrieval so I

[02:21:07 - 02:21:13]
just want to like kind of lay out that

[02:21:09 - 02:21:14]
those cautionary notes but you know I

[02:21:13 - 02:21:17]
think it is fair to say this will

[02:21:14 - 02:21:19]
certainly get better and I think it's

[02:21:17 - 02:21:21]
also fair to say that rag will change

[02:21:19 - 02:21:24]
and this is just like a nearly not a

[02:21:21 - 02:21:26]
great joke but Frank zap a musician made

[02:21:24 - 02:21:28]
the point Jazz isn't dead it just smells

[02:21:26 - 02:21:30]
funny you know I think same for rag rag

[02:21:28 - 02:21:32]
is not dead but it will change I think

[02:21:30 - 02:21:35]
that's like kind of the key Point here

[02:21:32 - 02:21:37]
um so just as a followup on that rag

[02:21:35 - 02:21:39]
today's focus on precise retrieval of

[02:21:37 - 02:21:42]
relevant doc chunks so it's very focused

[02:21:39 - 02:21:44]
on typically taking documents chunking

[02:21:42 - 02:21:46]
them in some particular way often using

[02:21:44 - 02:21:48]
very OS syncratic chunking methods

[02:21:46 - 02:21:50]
things like chunk size are kind of

[02:21:48 - 02:21:52]
picked almost arbitrarily embeding them

[02:21:50 - 02:21:55]
storing them in an index taking a

[02:21:52 - 02:21:57]
question embedding it doing K&N uh

[02:21:55 - 02:21:59]
similarity search to retrieve relevant

[02:21:57 - 02:22:00]
chunks you're often setting a k

[02:21:59 - 02:22:02]
parameter which is the number of chunks

[02:22:00 - 02:22:04]
you retrieve you often will do some kind

[02:22:02 - 02:22:06]
of filtering or Pro processing on the

[02:22:04 - 02:22:08]
retrieve chunks and then ground your

[02:22:06 - 02:22:10]
answer in those retrieved chunks so it's

[02:22:08 - 02:22:14]
very focused on precise retrieval of

[02:22:10 - 02:22:16]
just the right chunks now in a world

[02:22:14 - 02:22:18]
where you have very long context models

[02:22:16 - 02:22:20]
I think there's a fair question to ask

[02:22:18 - 02:22:22]
is is this really kind of the most most

[02:22:20 - 02:22:25]
reasonable approach so kind of on the

[02:22:22 - 02:22:27]
left here you can kind of see this

[02:22:25 - 02:22:29]
notion closer to today of I need the

[02:22:27 - 02:22:31]
exact relevant chunk you can risk over

[02:22:29 - 02:22:33]
engineering you can have you know higher

[02:22:31 - 02:22:36]
complexity sensitivity to these odd

[02:22:33 - 02:22:38]
parameters like chunk size k um and you

[02:22:36 - 02:22:40]
can indeed suffer lower recall because

[02:22:38 - 02:22:41]
you're really only picking very precise

[02:22:40 - 02:22:44]
chunks you're beholden to very

[02:22:41 - 02:22:46]
particular embedding models so you know

[02:22:44 - 02:22:48]
I think going forward as long context

[02:22:46 - 02:22:50]
models get better and better there are

[02:22:48 - 02:22:52]
definitely question you should certainly

[02:22:50 - 02:22:54]
question the current kind of very

[02:22:52 - 02:22:56]
precise chunking rag Paradigm but on the

[02:22:54 - 02:22:59]
flip side I think just throwing all your

[02:22:56 - 02:23:01]
docs into context probably will also not

[02:22:59 - 02:23:03]
be the preferred approach you'll suffer

[02:23:01 - 02:23:06]
higher latency higher token usage I

[02:23:03 - 02:23:09]
should note that today 100,000 token GPD

[02:23:06 - 02:23:11]
4 is like $1 per generation I spent a

[02:23:09 - 02:23:13]
lot of money on Lang Chain's account uh

[02:23:11 - 02:23:16]
on that multile analysis I don't want to

[02:23:13 - 02:23:18]
tell Harrison how much I spent uh so

[02:23:16 - 02:23:21]
it's it's you know it's not good right

[02:23:18 - 02:23:23]
um You Can't audit retrieve

[02:23:21 - 02:23:25]
um and security and and authentication

[02:23:23 - 02:23:26]
are issues if for example you need

[02:23:25 - 02:23:28]
different users different different

[02:23:26 - 02:23:30]
access to certain kind of retriev

[02:23:28 - 02:23:32]
documents or chunks in the Contex

[02:23:30 - 02:23:33]
stuffing case you you kind of can't

[02:23:32 - 02:23:35]
manage security as easily so there's

[02:23:33 - 02:23:39]
probably some predo optimal regime kind

[02:23:35 - 02:23:40]
of here in the middle and um you know I

[02:23:39 - 02:23:42]
I put this out on Twitter I think

[02:23:40 - 02:23:44]
there's some reasonable points raised I

[02:23:42 - 02:23:46]
think you know this inclusion at the

[02:23:44 - 02:23:48]
document level is probably pretty sane

[02:23:46 - 02:23:51]
documents are self-contained chunks of

[02:23:48 - 02:23:54]
context um so you know what about

[02:23:51 - 02:23:56]
document Centric rag so no chunking uh

[02:23:54 - 02:23:59]
but just like operate on the context of

[02:23:56 - 02:24:01]
full documents so you know if you think

[02:23:59 - 02:24:03]
forward to the rag Paradigm that's

[02:24:01 - 02:24:05]
document Centric you still have the

[02:24:03 - 02:24:07]
problem of taking an input question

[02:24:05 - 02:24:09]
routing it to the right document um this

[02:24:07 - 02:24:11]
doesn't change so I think a lot of

[02:24:09 - 02:24:14]
methods that we think about for kind of

[02:24:11 - 02:24:16]
query analysis um taking an input

[02:24:14 - 02:24:18]
question rewriting it in a certain way

[02:24:16 - 02:24:20]
to optimize retrieval things like

[02:24:18 - 02:24:22]
routing taking a question routing to the

[02:24:20 - 02:24:25]
right database be it a relational

[02:24:22 - 02:24:27]
database graph database Vector store um

[02:24:25 - 02:24:30]
and quer construction methods so for

[02:24:27 - 02:24:32]
example text to SQL text to Cipher for

[02:24:30 - 02:24:35]
graphs um or text to even like metadata

[02:24:32 - 02:24:37]
filters for for Vector stores those are

[02:24:35 - 02:24:40]
all still relevant in the world that you

[02:24:37 - 02:24:42]
have long Contex llms um you're probably

[02:24:40 - 02:24:43]
not going to dump your entire SQL DB and

[02:24:42 - 02:24:45]
feed that to the llm you're still going

[02:24:43 - 02:24:48]
to have SQL queries you're still going

[02:24:45 - 02:24:50]
to have graph queries um you may be more

[02:24:48 - 02:24:52]
permissive with what you extract but it

[02:24:50 - 02:24:53]
still is very reasonable to store the

[02:24:52 - 02:24:55]
majority of your structured data in

[02:24:53 - 02:24:58]
these in these forms likewise with

[02:24:55 - 02:25:00]
unstructured data like documents like we

[02:24:58 - 02:25:02]
said before it still probably makes

[02:25:00 - 02:25:04]
sense to ENC to you know store documents

[02:25:02 - 02:25:05]
independently but just simply aim to

[02:25:04 - 02:25:07]
retrieve full documents rather than

[02:25:05 - 02:25:10]
worrying about these idiosyncratic

[02:25:07 - 02:25:12]
parameters like like chunk size um and

[02:25:10 - 02:25:14]
along those lines there's a lot of

[02:25:12 - 02:25:16]
methods out there we've we've done a few

[02:25:14 - 02:25:18]
of these that are kind of well optimized

[02:25:16 - 02:25:20]
for document retrieval so one I want a

[02:25:18 - 02:25:21]
flag is what we call multi repesent

[02:25:20 - 02:25:23]
presentation indexing and there's

[02:25:21 - 02:25:25]
actually a really nice paper on this

[02:25:23 - 02:25:27]
called dense X retriever or proposition

[02:25:25 - 02:25:29]
indexing but the main point is simply

[02:25:27 - 02:25:31]
this would you do is you take your OD

[02:25:29 - 02:25:33]
document you produce a representation

[02:25:31 - 02:25:37]
like a summary of that document you

[02:25:33 - 02:25:39]
index that summary right and then um at

[02:25:37 - 02:25:41]
retrieval time you ask your question you

[02:25:39 - 02:25:43]
embed your question and you simply use a

[02:25:41 - 02:25:45]
highle summary to just retrieve the

[02:25:43 - 02:25:48]
right document you pass the full

[02:25:45 - 02:25:51]
document to the LM for a kind of final

[02:25:48 - 02:25:52]
generation so it's kind of a trick where

[02:25:51 - 02:25:54]
you don't have to worry about embedding

[02:25:52 - 02:25:56]
full documents in this particular case

[02:25:54 - 02:25:58]
you can use kind of very nice

[02:25:56 - 02:26:00]
descriptive summarization prompts to

[02:25:58 - 02:26:02]
build descriptive summaries and the

[02:26:00 - 02:26:04]
problem you're solving here is just get

[02:26:02 - 02:26:06]
me the right document it's an easier

[02:26:04 - 02:26:08]
problem than get me the right chunk so

[02:26:06 - 02:26:10]
this is kind of a nice approach it

[02:26:08 - 02:26:11]
there's also different variants of it

[02:26:10 - 02:26:13]
which I share below one is called parent

[02:26:11 - 02:26:15]
document retriever where you could use

[02:26:13 - 02:26:17]
in principle if you wanted smaller

[02:26:15 - 02:26:19]
chunks but then just return full

[02:26:17 - 02:26:21]
documents but anyway the point is

[02:26:19 - 02:26:23]
preserving full documents for Generation

[02:26:21 - 02:26:25]
but using representations like summaries

[02:26:23 - 02:26:27]
or chunks for retrieval so that's kind

[02:26:25 - 02:26:30]
of like approach one that I think is

[02:26:27 - 02:26:32]
really interesting approach two is this

[02:26:30 - 02:26:34]
idea of raptor is a cool paper came out

[02:26:32 - 02:26:36]
of Stamper somewhat recently and this

[02:26:34 - 02:26:38]
solves the problem of what if for

[02:26:36 - 02:26:41]
certain questions I need to integrate

[02:26:38 - 02:26:42]
information across many documents so

[02:26:41 - 02:26:45]
what this approach does is it takes

[02:26:42 - 02:26:47]
documents and it it embeds them and

[02:26:45 - 02:26:49]
clusters them and then it summarizes

[02:26:47 - 02:26:51]
each cluster um and it does this

[02:26:49 - 02:26:53]
recursively in up with only one very

[02:26:51 - 02:26:55]
high level summary for the entire Corpus

[02:26:53 - 02:26:57]
of documents and what they do is they

[02:26:55 - 02:26:59]
take this kind of this abstraction

[02:26:57 - 02:27:01]
hierarchy so to speak of different

[02:26:59 - 02:27:03]
document summarizations and they just

[02:27:01 - 02:27:05]
index all of it and they use this in

[02:27:03 - 02:27:07]
retrieval and so basically if you have a

[02:27:05 - 02:27:09]
question that draws an information

[02:27:07 - 02:27:12]
across numerous documents you probably

[02:27:09 - 02:27:15]
have a summary present and and indexed

[02:27:12 - 02:27:16]
that kind of has that answer captured so

[02:27:15 - 02:27:19]
it's a nice trick to consolidate

[02:27:16 - 02:27:22]
information across documents um they

[02:27:19 - 02:27:23]
they paper actually reports you know

[02:27:22 - 02:27:25]
these documents in their case or the

[02:27:23 - 02:27:28]
leavs are actually document chunks or

[02:27:25 - 02:27:29]
slices but I actually showed I have a

[02:27:28 - 02:27:33]
video on it and a notebook that this

[02:27:29 - 02:27:36]
works across full documents as well um

[02:27:33 - 02:27:37]
and this and I segue into to do this you

[02:27:36 - 02:27:38]
do need to think about long context

[02:27:37 - 02:27:40]
embedding models because you're

[02:27:38 - 02:27:43]
embedding full documents and that's a

[02:27:40 - 02:27:45]
really interesting thing to track um the

[02:27:43 - 02:27:48]
you know hazy research uh put out a

[02:27:45 - 02:27:50]
really nice um uh blog post on this

[02:27:48 - 02:27:53]
using uh what the Monch mixer so it's

[02:27:50 - 02:27:56]
kind of a new architecture that tends to

[02:27:53 - 02:27:58]
longer context they have a 32,000 token

[02:27:56 - 02:27:59]
embedding model that's pres that's

[02:27:58 - 02:28:01]
available on together AI absolutely

[02:27:59 - 02:28:03]
worth experimenting with I think this is

[02:28:01 - 02:28:05]
really interesting Trend so long long

[02:28:03 - 02:28:07]
Contex and beddings kind of play really

[02:28:05 - 02:28:09]
well with this kind of idea you take

[02:28:07 - 02:28:11]
full documents embed them using for

[02:28:09 - 02:28:12]
example long Contex embedding models and

[02:28:11 - 02:28:14]
you can kind of build these document

[02:28:12 - 02:28:16]
summarization trees um really

[02:28:14 - 02:28:19]
effectively so I think this another nice

[02:28:16 - 02:28:23]
trick for working with full documents in

[02:28:19 - 02:28:25]
the long context kind of llm regime um

[02:28:23 - 02:28:27]
one other thing I'll note I think

[02:28:25 - 02:28:29]
there's also going to Mo be move away

[02:28:27 - 02:28:31]
from kind of single shot rag well

[02:28:29 - 02:28:34]
today's rag we typically you know we

[02:28:31 - 02:28:36]
chunk documents uh uh embed them store

[02:28:34 - 02:28:38]
them in an index you know do retrieval

[02:28:36 - 02:28:40]
and then do generation but there's no

[02:28:38 - 02:28:42]
reason why you shouldn't kind of do

[02:28:40 - 02:28:44]
reasoning on top of the generation or

[02:28:42 - 02:28:46]
reasoning on top of the retrieval and

[02:28:44 - 02:28:49]
feedback if there are errors so there's

[02:28:46 - 02:28:50]
a really nice paper called selfrag um

[02:28:49 - 02:28:53]
that kind of reports this we implemented

[02:28:50 - 02:28:55]
this using Lang graph works really well

[02:28:53 - 02:28:57]
and the simp the idea is simply to you

[02:28:55 - 02:28:59]
know grade the relevance of your

[02:28:57 - 02:29:01]
documents relative to your question

[02:28:59 - 02:29:02]
first if they're not relevant you

[02:29:01 - 02:29:04]
rewrite the question you can do you can

[02:29:02 - 02:29:06]
do many things in this case we do

[02:29:04 - 02:29:09]
question rewriting and try again um we

[02:29:06 - 02:29:11]
also grade for hallucinations we grade

[02:29:09 - 02:29:12]
for answer relevance but anyway it kind

[02:29:11 - 02:29:16]
of moves rag from like a single shot

[02:29:12 - 02:29:17]
Paradigm to a kind of a cyclic flow uh

[02:29:16 - 02:29:19]
in which you actually do various

[02:29:17 - 02:29:22]
gradings Downstream and this is all

[02:29:19 - 02:29:24]
relev in the long context llm regime as

[02:29:22 - 02:29:27]
well in fact you know it you you

[02:29:24 - 02:29:30]
absolutely should take advantage of of

[02:29:27 - 02:29:33]
for example increasingly fast and

[02:29:30 - 02:29:35]
Performing LMS to do this grading um

[02:29:33 - 02:29:37]
Frameworks like langra allow you to

[02:29:35 - 02:29:38]
build these kind of these flows which

[02:29:37 - 02:29:42]
build which allows you to kind of have a

[02:29:38 - 02:29:44]
more performant uh kind of kind of

[02:29:42 - 02:29:46]
self-reflective rag pipeline now I did

[02:29:44 - 02:29:47]
get a lot of questions about latency

[02:29:46 - 02:29:49]
here and I completely agree there's a

[02:29:47 - 02:29:51]
trade-off between kind of performance

[02:29:49 - 02:29:54]
accuracy and latency that's present here

[02:29:51 - 02:29:57]
I think the real answer is you can opt

[02:29:54 - 02:30:00]
to use very fast uh for example models

[02:29:57 - 02:30:03]
like grock where seeing um you know gp35

[02:30:00 - 02:30:05]
turbos very fast these are fairly easy

[02:30:03 - 02:30:07]
grading challenges so you can use very

[02:30:05 - 02:30:11]
very fast LMS to do the grading and for

[02:30:07 - 02:30:13]
example um you you can also restrict

[02:30:11 - 02:30:14]
this to only do one turn of of kind of

[02:30:13 - 02:30:16]
cyclic iteration so you can kind of

[02:30:14 - 02:30:18]
restrict the latency in that way as well

[02:30:16 - 02:30:20]
so anyway I think it's a really cool

[02:30:18 - 02:30:22]
approach still relevant in the world as

[02:30:20 - 02:30:23]
we move towards longer context so it's

[02:30:22 - 02:30:28]
kind of like building reasoning on top

[02:30:23 - 02:30:30]
of rag um in the uh generation and

[02:30:28 - 02:30:33]
retrieval stages and a related point one

[02:30:30 - 02:30:36]
of the challenges with rag is that your

[02:30:33 - 02:30:38]
index for example you you may have a

[02:30:36 - 02:30:39]
question that is that asks something

[02:30:38 - 02:30:41]
that's outside the scope of your index

[02:30:39 - 02:30:44]
and this is kind of always a problem so

[02:30:41 - 02:30:45]
a really cool paper called c c rag or

[02:30:44 - 02:30:47]
corrective rag came out you know a

[02:30:45 - 02:30:50]
couple months ago that basically does

[02:30:47 - 02:30:51]
grading just like we talked about before

[02:30:50 - 02:30:53]
and then if the documents are not

[02:30:51 - 02:30:55]
relevant you kick off and do a web

[02:30:53 - 02:30:57]
search and basically return the search

[02:30:55 - 02:31:00]
results to the LM for final generation

[02:30:57 - 02:31:02]
so it's a nice fallback in cases where

[02:31:00 - 02:31:04]
um your you the questions out of the

[02:31:02 - 02:31:07]
domain of your retriever so you know

[02:31:04 - 02:31:09]
again nice trick overlaying reasoning on

[02:31:07 - 02:31:12]
top of rag I think this trend you know

[02:31:09 - 02:31:14]
continues um because you know it it just

[02:31:12 - 02:31:18]
it makes rag systems you know more

[02:31:14 - 02:31:19]
performant uh and less brittle to

[02:31:18 - 02:31:21]
questions that are out of domain so you

[02:31:19 - 02:31:23]
know you know that's another kind of

[02:31:21 - 02:31:25]
nice idea this particular approach also

[02:31:23 - 02:31:27]
we showed works really well with with uh

[02:31:25 - 02:31:29]
with open source models so I ran this

[02:31:27 - 02:31:32]
with mraw 7B it can run locally on my

[02:31:29 - 02:31:33]
laptop using a llama so again really

[02:31:32 - 02:31:35]
nice approach I encourage you to look

[02:31:33 - 02:31:37]
into this um and this is all kind of

[02:31:35 - 02:31:40]
independent of the llm kind of context

[02:31:37 - 02:31:42]
length these are reasoning you can add

[02:31:40 - 02:31:45]
on top of the retrieval stage that that

[02:31:42 - 02:31:47]
can kind of improve overall performance

[02:31:45 - 02:31:49]
and so the overall picture kind of looks

[02:31:47 - 02:31:52]
like this where you know I think that

[02:31:49 - 02:31:54]
the the the the problem of routing your

[02:31:52 - 02:31:56]
question to the right database Andor to

[02:31:54 - 02:31:58]
the right document kind of remains in

[02:31:56 - 02:32:00]
place query analysis is still quite

[02:31:58 - 02:32:02]
relevant routing is still relevant query

[02:32:00 - 02:32:04]
construction is still relevant um in the

[02:32:02 - 02:32:07]
long Contex regime I think there is less

[02:32:04 - 02:32:08]
of an emphasis on document chunking

[02:32:07 - 02:32:11]
working with full documents is probably

[02:32:08 - 02:32:13]
kind of more parto optimal so to speak

[02:32:11 - 02:32:15]
um there's some some clever tricks for

[02:32:13 - 02:32:16]
IND indexing of documents like the

[02:32:15 - 02:32:19]
multi-representation indexing we talked

[02:32:16 - 02:32:20]
about the hierarchical indexing using

[02:32:19 - 02:32:22]
Raptor that we talked about as well are

[02:32:20 - 02:32:25]
two interesting ideas for document

[02:32:22 - 02:32:28]
Centric indexing um and then kind of

[02:32:25 - 02:32:30]
reasoning in generation post retrieval

[02:32:28 - 02:32:32]
on retrieval itself tog grade on the

[02:32:30 - 02:32:34]
generations themselves checking for

[02:32:32 - 02:32:36]
hallucinations those are all kind of

[02:32:34 - 02:32:38]
interesting and relevant parts of a rag

[02:32:36 - 02:32:40]
system that I think we'll probably will

[02:32:38 - 02:32:42]
see more and more of as we move more

[02:32:40 - 02:32:44]
away from like a more naive prompt

[02:32:42 - 02:32:45]
response Paradigm more to like a flow

[02:32:44 - 02:32:47]
Paradigm we're seeing that actually

[02:32:45 - 02:32:49]
already in codenation it's probably

[02:32:47 - 02:32:51]
going to carry over to rag as well where

[02:32:49 - 02:32:53]
we kind of build rag systems that have

[02:32:51 - 02:32:55]
kind of a cyclic flow to them operate on

[02:32:53 - 02:32:57]
documents use longc Comics llms um and

[02:32:55 - 02:32:59]
still use kind of routing and query

[02:32:57 - 02:33:01]
analysis so reasoning pre- retrieval

[02:32:59 - 02:33:04]
reasoning post- retrieval so anyway that

[02:33:01 - 02:33:05]
was kind of my talk um and yeah feel

[02:33:04 - 02:33:07]
free to leave any comments on the video

[02:33:05 - 02:33:09]
and I'll try to answer any questions but

[02:33:07 - 02:33:12]
um yeah that's that's probably about it

[02:33:09 - 02:33:12]
thank you

## コメント

### 1. @chrislearnlog (👍 65)
Thank you for this video.

I have spent two weeks going through the video and coding along. Its really amazing.

> **@ASHAYJPATEL** (👍 0): Hey! I am starting to learn RAG from today. I know basics of coding. But I have never built anything this big. Not even a project. I am 20, and I want to start this project. Since you have already gone through this video, I seek your advice. What are the prerequisites? And Can you share your project insights with me? If you can share your project files (non-editable files would do too! I want to build to learn) that will be very helpful. And lastly Chris, can we connect through google meet or something so you can see and guide me directly? That will be very helpful. Thank you!!

### 2. @AD-np2sh (👍 58)
I rarely say that a tutorial is good - but this is an amazing tutorial, extremely underrated!!!

> **@wanderingtravellerAB99** (👍 1): Underrated by who?

> **@lakshay1168** (👍 1): is there is line by line explaination of full code ?

> **@AD-np2sh** (👍 1): @@wanderingtravellerAB99 Relative engagement

> **@engenglish610** (👍 0): Is it more easy to do this with n8n ?

### 3. @jplkid14 (👍 98)
The complete happenstance of the phrase "do rag" sounding like "durag" coming from this video was awesome.  Sorry, totally unrelated...but it made me chuckle.

> **@bhavyajain7403** (👍 10): durag activity

> **@tomasalmeida5306** (👍 1): lol i noticed that as well

### 4. @danishafzalkhan (👍 49)
Lance is the man! Love his content

### 5. @YourMateNate3 (👍 3)
Such a good video that YouTube deciding to play this while I was sleeping. Woke up and was actually interested in staying up and watching this

### 6. @bhavyajain7403 (👍 48)
This felt like a semester condensed in a few hours. This dude reads a lot. I learned about so many of interesting things.

> **@lakshay1168** (👍 2): is there line by line explaination of full code ?

> **@noname13345** (👍 1): ​@@lakshay1168 Ask an LLM to do it 😉

> **@pranav_at_yt** (👍 0): How u got open api key for doing this?

### 7. @BlakeGallagher-i8h (👍 158)
🎯 Key points for quick navigation:

00:00 *📚 Introduction to RAG by Lance Martin, a LangChain engineer.*
00:14 *💡 Explanation of how RAG combines custom data with LLMs.*
00:28 *🔍 Motivation: Most data is private, but LLMs are trained on public data.*
01:08 *🗃️ Context windows in LLMs are growing, allowing more private data to be input.*
01:48 *⚙️ Overview of RAG: Indexing, retrieval, and generation stages.*
02:54 *📊 RAG unites LLMs' processing with large-scale private data.*
03:24 *🧠 Breakdown of RAG components: Query translation, routing, construction, and more.*
04:46 *⭐ Methods for document retrieval and reranking in RAG.*
05:55 *💾 Indexing external documents and converting them to numerical representations.*
08:25 *🧩 Splitting documents for embedding due to context window limits.*
10:00 *🖥️ Computing fixed-length vectors for documents using embeddings.*
12:45 *🔍 Using k-nearest neighbors to find similar documents.*
15:59 *📝 Generating answers based on retrieved documents in RAG.*
17:07 *📝 Prompt templates for generating answers in LLMs.*
19:02 *🔗 Combining prompts, LLMs, and retrievers into chains.*
22:14 *🚀 Introduction to advanced query translation in RAG.*
23:07 *✔️ Importance of rewriting queries for effective retrieval.*
24:05 *🌐 Multi-query approach: Rewriting questions from different perspectives.*
25:38 *🚀 Indexed a blog post on agents in a vector store.*
26:19 *🔍 Split question into sub-questions and retrieve relevant documents.*
28:08 *🔧 Used LangSmith to trace intermediate and final steps.*
30:42 *🗂️ Built a consolidated list from multiple retrievals.*
35:02 *🧩 Discussed sub-question decomposition retrieval.*
36:23 *🔄 Combined answers to iterative sub-questions for final answer.*
38:18 *🔗 Connected question-answer pairs sequentially in prompts.*
41:02 *📚 Stepback prompting for generating more abstract questions.*
43:02 *🪜 Generated more generic questions to enhance context for retrieval.*
44:45 *🔄 Retrieval performed on both original and stepback questions.*
48:50 *🌐 HYDE involves converting questions into hypothetical documents for better alignment with document embeddings.*
49:43 *🔎 Generated hypothetical documents based on questions for more effective retrieval.*
51:15 *📝 Hypothetical Document: Demonstrated hypothetical document generation and retrieval process.*
51:44 *🌟 Performance: Using hypothetical document generation can improve retrieval performance.*
52:13 *🚦 Routing: Involves translating a query and routing it to appropriate data sources.*
53:48 *🔍 Semantic Routing: Embeds and compares questions to prompts for routing.*
56:08 *🔗 Routing Mechanism: Connects the intended data source to specific retriever chains.*
58:11 *🚀 Semantic Routing Example: Demonstrates choosing a prompt based on semantic similarity.*
59:47 *💬 Query Construction: Transforms natural language queries to structured queries for metadata filters.*
01:00:15 *🗓️ Example Query: Converts natural questions into structured queries with date filters and metadata.*
01:04:26 *📚 Query Optimization: Optimizes retrieval by translating natural language into data-querying domain-specific languages.*
01:11:48 *🗄️ Hierarchical Indexing: Raptor technique deals with questions needing detailed and broader information.*
01:12:57 *🧩 Hierarchical indexing helps in retrieving more relevant document chunks by clustering and summarizing documents recursively.*
01:14:08 *🤏 Summaries provide high-level semantic representations, while raw chunks offer detailed, document-specific insights.*
01:15:04 *🧪 Comprehensive studies indicate that hierarchical indexing enhances semantic search by offering better coverage across different question types.*
01:17:19 *📇 Process involved embedding, clustering, and recursive summarization to build a tree structure of document information.*
01:20:09 *🛠️ Code demonstration included creating a vector store, embedding documents, clustering, summarizing, and managing tokens.*
01:22:22 *🔍 CoBER method enhances semantic search by generating embeddings for every token and computing maximum similarities between questions and documents.*
01:24:57 *🧑‍💻 RoBERTA library facilitates playing with CoBER, which showcases good performance but requires evaluating production readiness due to possible latency issues.*
01:26:40 *🌐 CoBER demonstrated through LangChain retriever integration, offering an efficient and unique indexing approach.*
01:28:10 *🗺️ Langraph released for building more complex state machines and diverse logical flows in RAG applications.*
01:33:05 *🔍 Corrective RAG workflow improved retrieval by re-assessing document relevance and performing web searches for ambiguous results.*
01:35:06 *🧩 Functions for state modification in Langraph illustrated how each state (node) in the flow modifies the document retrieval process.*
01:37:08 *🔍 Logical filtering: Use a grading chain to mark documents as relevant or not and perform actions based on the results.*
01:37:32 *🚦 Conditional routing: Based on the 'search' value, route the workflow to either transform the query for a web search or proceed to generate a response.*
01:39:13 *📑 Document relevance check: Filter documents for relevance before transforming the query and performing a web search.*
01:39:55 *🔄 Query transformation: Adjust the query based on information retrieved from a web search to improve relevance.*
01:40:52 *📊 Detailed node inspection: Use tools like LangSmith to inspect each node's output to ensure the logical flow is correct.*
01:42:26 *🚀 Moving from chains to flows: Transitioning from simple chains to complex flows offers cleaner and more sophisticated workflows.*
01:44:06 *🔧 Flow engineering: Flow engineering with Lang graph is intuitive and allows for sophisticated logical reasoning workflows.*
01:45:03 *🧩 Integrating ideas: Combining query analysis and adaptive flow engineering improves your RAG pipeline's efficiency.*
01:46:14 *📚 Corrective workflows: Use unit tests to ensure smooth corrective workflows during model inference.*
01:48:34 *💡 Command R: Uses Command R model with structured output, enabling binary yes/no responses for easier logical flow control.*
01:56:21 *⚙️ Binding functions to nodes: Bind each node in your graph to a specific function to handle different logical decisions and flows.*
01:58:24 *🔄 If tool calls are not in the response, a fallback mechanism is triggered to choose the next data source.*
01:59:18 *🔍 Different data sources (web search vs. Vector store) are used, and their outputs determine the subsequent nodes in the graph.*
02:00:25 *🧾 Conditional edges in the graph handle logic such as document relevance and hallucination checks.*
02:01:05 *📊 Functions are defined as nodes and edges in the graph, following a flow that matches a predefined diagram for logic.*
02:03:18 *🗂️ The flow diagram for the graph aligns with the logic drawn out earlier, ensuring consistent data routing and processing.*
02:05:10 *⏱️ The implemented RAG system processes questions quickly, demonstrating efficient retrieval and generation handling.*
02:07:15 *⚡ Command R model shows rapid performance and effective handling of relevance, hallucination, and answer usefulness checks within the RAG system.*
02:08:55 *🧠 Lang graph provides a reliable, less flexible solution compared to agents, suitable for defined flows and faster implementation.*
02:10:51 *🧩 Agents offer more flexibility for open-ended workflows at the cost of reliability, especially when working with smaller LLMs.*
02:11:46 *💻 Open-source models like Command R can be run locally, enabling fast inference and practical use for online applications.*
02:12:46 *🔧 Practical implementation of RAG systems combines Lang graph with Command R for a fast, reliable solution adaptable for various workflows.*
02:17:09 *📉 Tested GPT-4's ability to retrieve and reason over multiple facts within a large context window, showing degradation in performance as complexity and context length increase.*
02:18:27 *🧩 Observations included the difficulty of retrieving facts placed at the beginning of a large context window, potentially due to a recency bias.*
02:19:10 *🔄 Confirmed that adding reasoning tasks exacerbates retrieval difficulty, highlighting limits within LLMs without a retrieval augmentation system.*
02:19:52 *🚩 Be skeptical of single-needle retrievals as they often oversimplify the retrieval problem.*
02:21:00 *🎯 Focus on the retrieval of precise document chunks, but be cautious of over-engineering.*
02:22:48 *🏗️ Consider document-centric RAG over chunking to simplify retrieval and reduce complexity.*
02:26:30 *🧩 Clustering documents and summarizing clusters help to handle queries requiring multiple pieces of information.*
02:28:07 *🔍 Use long-context embedding models to embed full documents effectively.*
02:31:33 *🖥️ Using open-source models can make RAG systems more accessible and efficient, even on local machines.*

Made with HARPA AI

> **@letsplay0711** (👍 0): 🎉

> **@carlosgsouza** (👍 0): Awesome summary! Thanks!

> **@nick1752** (👍 0): stop with these emojis

### 8. @shrivatsavans1209 (👍 1)
Wow, this was a really good video on rags. You managed to explain the concepts clearly and in an easy to understand way. Thank you.

### 9. @patilashish (👍 2)
This video is so jam packed. Needs efforts to practice whats taught. Pause, tech notes, perplexity for examples, find more info, implement, go to next point. Gold mine

### 10. @faisalmushtaq2287 (👍 23)
I was waiting for this particular course. Thanks

> **@iqtech6065** (👍 1): Assala mu alaikum brother

> **@pranav_at_yt** (👍 0): So u will follow and do this without open api key which is not free?

### 11. @claudiodisalvo9925 (👍 12)
This is great content. Speaking of that 95% of private data I guess a lot of practitioner are finding it hard to convince business people to share their data with an LLM provider. And of course concerns are very much understandable. I guess people would feel more comfortable if a RAG application would be able to clearly define a partition of data that it can work on for the benefit of the tool, and a partition that can be either used as obfuscated or simply never shared, not even by chance.

> **@Kalmaos** (👍 6): Maybe the solution would be running the model locally?

> **@juanpablopenaloza5093** (👍 0): NVDIA CHATRTX might just do the job

> **@pranav_at_yt** (👍 0): He used open api key in this which is not free, then how to follow and do this

### 12. @nawaz_haider (👍 526)
Udemy created 50 accounts to dislike this video

> **@vishwanathnb128** (👍 14): 😂😂😂

> **@zaidnadeem4918** (👍 38): I will create 50 accounts to like your comment 😂

> **@GratefulJoss** (👍 5): Yeah, as the Good Book says  the love of money is the root of all evil 😂😂😂😂

> **@skash55** (👍 2): Haha 😄

> **@vibe-coder-telugu** (👍 0): They increase by 100 more bots.😁

### 13. @Sss-zl8qj (👍 6)
Thanks a lot! Really helpful!

### 14. @simrangupta7689 (👍 19)
🎯 Key points for quick navigation:

02:21:13 *🔄 RAG Evolution*
02:22:20 *❓ Reconsider Chunking*
02:23:42 *📑 Document-Centric RAG*
02:25:20 *🔄 Multi-rep Indexing*
02:26:30 *📊 Utilize Raptor*
02:28:34 *🔄 Beyond Single-Shot*
02:30:23 *🧠 Enhance with Reasoning*
02:30:38 *🎯 Out-of-Scope Queries*

Made with HARPA AI

### 15. @Sk__1276 (👍 90)
Include more of langchain, llms, industry level based tutorials

> **@NicolasRicaurte-l1g** (👍 0): if you found something like this tell us please!!!!!!!!!!!!!

> **@matkarharsh881** (👍 0): @@NicolasRicaurte-l1g if you found something like this tell us please!!!!!!!!!!!!!

> **@zangoz_2693** (👍 0): ​@@matkarharsh881  if you found something like this tell us please!!!!!!!!!!!!!

### 16. @CookingWithGunnar (👍 12)
Love the teaching style! at 9:00 you mention that you've walked through the code previously. Is there another video to go with this one or did I miss something?

> **@KOTAGIRISIVAKUMAR** (👍 0): those are shorts videos and they combined them to form an long single video.
when lance referring previous video means not another video.

> **@shraeychikker694** (👍 6): I think this is the playlist from the videos are taken:
https://www.youtube.com/playlist?list=PLfaIDFEXuae2LXbO1_PKyVJiQ23ZztA0x

> **@CookingWithGunnar** (👍 2): @@shraeychikker694 Nice one - many thanks :)

### 17. @bhuvanbharath03 (👍 2)
love from India, keep doing the great work, Lance <3

### 18. @yu-linyang1310 (👍 2)
1:04:09 shouldn't the output of block [16] be "latest_publish_date" instead of "earliest_publish_date"?  Since the question asked for questions *before* 2024.

### 19. @arthursiriaco6771 (👍 0)
Thank you for the video. This is way better than the vast majority of paid courses.

### 20. @jasonmuscat534 (👍 6)
Lance thank you for sharing your deep insights on the subject of RAG and taking the time to share this with the community. 

Just a question, at 1:04:00 into the overall video concerning the subject of Query Construction.  For the question:
"videos that are focused on the topic of chat langchain that are published before 2024"
Should the result have been?:
latest_publish_date: 2024-01-01 as opposed to earliest_publish_date: 2024-01-01

This would be more inline with question:
"videos on chat langchain published in 2023"
where the results where:
earliest_publish_date: 2023-01-01
latest_publish_date: 2024-01-01

Thank you

