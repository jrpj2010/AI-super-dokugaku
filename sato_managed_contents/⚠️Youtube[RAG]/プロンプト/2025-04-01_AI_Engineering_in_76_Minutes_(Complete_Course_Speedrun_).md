# AI Engineering in 76 Minutes (Complete Course/Speedrun!)

**チャンネル:** Marina Wyss - AI & Machine Learning
**公開日:** 2025-04-01
**URL:** https://www.youtube.com/watch?v=JV3pL1_mn2M

## 説明

Buy the AI Engineering book here to continue your learning! https://amzn.to/42kjXb2

All images are from the book AI Engineering unless otherwise credited.

⏰ Timestamps
00:00 What is AI Engineering?
01:49 Understanding Foundation Models
08:40 Evaluating AI Models
14:50 Model Selection
23:15 Prompt Engineering
30:20 RAG and Context Construction
36:56 Agents and Memory Systems
43:02 Finetuning
52:40 Dataset Engineering
59:45 Inference Optimization
01:09:01 Architecture and User Feedback
----------------------------------------
📝 Transcript of this video: https://medium.com/data-science-collective/ai-engineering-1-3-foundation-models-evaluation-and-model-selection-889afd06b0ba

📬 Sign up for my newsletter for access to a FREE 80+ page e-book on how to get your first data science job (learning resources, project ideas, LinkedIn checklist, and more!): https://www.gratitudedriven.com/subscribe

💬 Want to talk 1:1? Book time to chat with me here: https://topmate.io/marina_wyss

☕ If you'd like to support my work, you can buy me a coffee (thank you!): https://ko-fi.com/marinawyss 

And here’s that StatQuest transformers video I promised: https://www.youtube.com/watch?v=zxQyTK8quyY
----------------------------------------
🎥 Other videos you might like:

Doubting if You Can Become a Machine Learning Engineer or Data Scientist? The Honest Truth.
https://www.youtube.com/watch?v=kqkBO1cjBSw

I Analyzed 1,238 Machine Learning Job Postings to Find Out What Skills You REALLY Need to Get Hired
https://www.youtube.com/watch?v=0q_JKNDbEug&t=8s

Beginner to (Employed) Data Scientist in 2025: Complete Roadmap - Skills, Projects, CV, Interviews
https://www.youtube.com/watch?v=uakGF0DP-mk&t=16s
----------------------------------------
🦫 About me
I am an Applied Scientist (basically, a blend of Data Scientist/Machine Learning Engineer) at Twitch/Amazon. Outside of my full-time job I'm a technical mentor at a machine learning bootcamp, and a 1:1 career coach for people looking to break into the field, with a focus on those from non-traditional backgrounds. 

I’m also a Certified Personal Trainer, always busy with too many interests, and really, deeply happy with my life. I hope to be able to help others achieve these things, too. 

Instagram:   / gratitudedriven  
----------------------------------------
✉️ Contact
Leave me a comment here on YouTube!
Business email: business@gratitudedriven.com
----------------------------------------
⚖️ Disclaimer
The views and opinions expressed in this video are my own and do not reflect the official policy or position of Twitch/Amazon or any other company I have worked for. All advice and insights shared here are based on my personal experiences and should be considered as such.

Also, there may be affiliate links in this description. This means if you make a purchase I'll earn a small commission at no cost to you! Thank you for your support.

#aiengineering #ai #machinelearning

## 字幕

[00:00 - 00:04]
hey everyone today we're diving into the

[00:01 - 00:06]
book AI engineering by chip win 800

[00:04 - 00:08]
pages of really great content about this

[00:06 - 00:10]
in demand field that's offering salaries

[00:08 - 00:12]
of $300,000 or more in this video I'm

[00:10 - 00:13]
summarizing everything from the book to

[00:12 - 00:16]
help you get a highle overview of the

[00:13 - 00:18]
field we'll talk about Foundation models

[00:16 - 00:20]
prompt engineering rag fine tuning

[00:18 - 00:21]
agents how to build a system improving

[00:20 - 00:23]
inference and more I also want to

[00:21 - 00:25]
mention this is a super highlevel

[00:23 - 00:27]
overview of a very detailed technical

[00:25 - 00:29]
book don't expect to learn all the

[00:27 - 00:30]
details just from watching this video I

[00:29 - 00:32]
really recommend using this is a way to

[00:30 - 00:33]
get an overview of what the field looks

[00:32 - 00:36]
like and use it as a jumping off point

[00:33 - 00:38]
for your own research and exploration so

[00:36 - 00:39]
what exactly is AI engineering and how

[00:38 - 00:41]
is it different from traditional machine

[00:39 - 00:43]
learning let's break it down AI

[00:41 - 00:45]
engineering has exploded recently for

[00:43 - 00:47]
two simple reasons AI models have gotten

[00:45 - 00:49]
dramatically better at solving real

[00:47 - 00:51]
problems while the barrier to building

[00:49 - 00:52]
with them has gotten much lower this

[00:51 - 00:54]
perfect storm has created one of the

[00:52 - 00:56]
fastest growing engineering disciplines

[00:54 - 00:58]
today at its core AI engineering is

[00:56 - 01:00]
about building applications on top of

[00:58 - 01:02]
foundation models those massive AI

[01:00 - 01:04]
systems trained by companies like open

[01:02 - 01:06]
AI or Google unlike traditional machine

[01:04 - 01:08]
learning Engineers who build models from

[01:06 - 01:10]
scratch AI Engineers leverage existing

[01:08 - 01:12]
ones focusing Less on training and more

[01:10 - 01:14]
on adaptation these Foundation models

[01:12 - 01:15]
work through a process called

[01:14 - 01:18]
self-supervision instead of requiring

[01:15 - 01:19]
humans to painstakingly label data these

[01:18 - 01:21]
models can learn by predicting parts of

[01:19 - 01:23]
their input data this breakthrough

[01:21 - 01:25]
solved the data labeling bottleneck that

[01:23 - 01:27]
held back AI for years as these models

[01:25 - 01:28]
scaled up with more data and computing

[01:27 - 01:30]
power they evolved from simple language

[01:28 - 01:32]
models to what we now call large

[01:30 - 01:34]
language models or llms and they didn't

[01:32 - 01:35]
stop there they've expanded to handle

[01:34 - 01:37]
multiple types of data including images

[01:35 - 01:39]
and video often becoming large

[01:37 - 01:41]
multimodal models nowadays we're seeing

[01:39 - 01:43]
Foundation models power everything from

[01:41 - 01:45]
coding assistance like GitHub co-pilot

[01:43 - 01:47]
to image generation tools writing AIDS

[01:45 - 01:49]
customer support Bots and sophisticated

[01:47 - 01:51]
data analysis systems now that we've

[01:49 - 01:53]
covered what AI engineering is let's dig

[01:51 - 01:55]
deeper into Foundation models themselves

[01:53 - 01:56]
how they're trained how they work and

[01:55 - 01:58]
why understanding their architecture

[01:56 - 02:00]
matters for AI Engineers Foundation

[01:58 - 02:02]
models at their core can only know what

[02:00 - 02:04]
they've been trained on this might seem

[02:02 - 02:06]
obvious but it has profound implications

[02:04 - 02:07]
if a model hasn't seen examples of a

[02:06 - 02:09]
specific language or concept during

[02:07 - 02:10]
training it simply won't have that

[02:09 - 02:12]
knowledge most large Foundation models

[02:10 - 02:14]
are trained on web crawled data which

[02:12 - 02:16]
brings some inherent problems this data

[02:14 - 02:19]
often contains clickbait misinformation

[02:16 - 02:20]
toxic content and fake news to combat

[02:19 - 02:23]
this teams use various filtering

[02:20 - 02:24]
techniques for instance open AI only

[02:23 - 02:27]
used Reddit links with at least three

[02:24 - 02:29]
upvotes when training gpt2 the language

[02:27 - 02:31]
distribution in training data is also

[02:29 - 02:33]
heavily skewed about half of all crawled

[02:31 - 02:34]
data is in English which means languages

[02:33 - 02:36]
with millions of speakers are often

[02:34 - 02:38]
underrepresented this is why specialized

[02:36 - 02:39]
models for specific languages and

[02:38 - 02:41]
domains are becoming increasingly

[02:39 - 02:43]
important also the distribution of

[02:41 - 02:45]
domains in one of the main training data

[02:43 - 02:46]
sets leans heavily towards business Tech

[02:45 - 02:48]
news and art in terms of model

[02:46 - 02:50]
architecture most Foundation models use

[02:48 - 02:52]
Transformer architectures based on the

[02:50 - 02:53]
attention mechanism but to understand

[02:52 - 02:54]
why Transformers were such a

[02:53 - 02:56]
breakthrough we need to look at what

[02:54 - 02:58]
came before Transformers were invented

[02:56 - 03:00]
to solve the problems of sequence to

[02:58 - 03:01]
sequence models which used current

[03:00 - 03:03]
neural networks for tasks like

[03:01 - 03:05]
translation these had two main

[03:03 - 03:07]
components an encoder that processes

[03:05 - 03:10]
inputs and a decoder that generates

[03:07 - 03:12]
outputs both worked sequentially token

[03:10 - 03:14]
by token the problem is that the decoder

[03:12 - 03:16]
only has access to a compressed

[03:14 - 03:17]
representation of the entire input

[03:16 - 03:19]
imagine trying to answer detailed

[03:17 - 03:21]
questions about a book when all you have

[03:19 - 03:23]
is a brief summary also input processing

[03:21 - 03:24]
and output generation are done

[03:23 - 03:27]
sequentially so it's slow for long

[03:24 - 03:29]
sequences Transformers solved this with

[03:27 - 03:30]
the attention mechanism which allows the

[03:29 - 03:32]
model to waigh the importance of

[03:30 - 03:34]
different input tokens when generating

[03:32 - 03:36]
each output token it's like being able

[03:34 - 03:38]
to reference any page in the book while

[03:36 - 03:40]
answering questions plus Transformers

[03:38 - 03:41]
can process input tokens in parallel

[03:40 - 03:44]
making them much faster during inference

[03:41 - 03:46]
Transformers work in two steps first

[03:44 - 03:48]
pre-fill process all the input tokens in

[03:46 - 03:51]
parallel to create the intermediate

[03:48 - 03:52]
State and second decode generate one

[03:51 - 03:55]
output token at a time the attention

[03:52 - 03:58]
mechanism uses three types of vectors

[03:55 - 04:00]
first query vectors these represent what

[03:58 - 04:02]
information the model is looking for

[04:00 - 04:04]
next key vectors like indices of

[04:02 - 04:06]
previous tokens and finally value

[04:04 - 04:08]
vectors the actual content of the

[04:06 - 04:10]
previous tokens the model computes how

[04:08 - 04:13]
much attention to give each input token

[04:10 - 04:15]
by comparing the Q and K vectors A high

[04:13 - 04:17]
similarity score means that the tokens

[04:15 - 04:20]
content V will heavily influence the

[04:17 - 04:22]
output this is why longer context

[04:20 - 04:24]
windows are computationally expensive

[04:22 - 04:26]
more tokens mean more K and V vectors to

[04:24 - 04:28]
compute and store attention is almost

[04:26 - 04:30]
always multi-headed allowing the model

[04:28 - 04:33]
to focus on different groups of tokens

[04:30 - 04:34]
simultaneously in llama 27b there are 32

[04:33 - 04:36]
attention heads for example a complete

[04:34 - 04:38]
Transformer consists of multiple

[04:36 - 04:40]
Transformer blocks each containing an

[04:38 - 04:42]
attention module and a neural network

[04:40 - 04:44]
module the number of blocks is often

[04:42 - 04:45]
called the number of layers before and

[04:44 - 04:47]
after each block there's an embedding

[04:45 - 04:49]
module that converts tokens and their

[04:47 - 04:51]
positions into vectors and finally an

[04:49 - 04:53]
unembedded layer that Maps output

[04:51 - 04:55]
vectors to token probabilities so that's

[04:53 - 04:57]
a super high look at this I would really

[04:55 - 04:58]
recommend either reading the book or

[04:57 - 04:59]
check out stat quest for an awesome

[04:58 - 05:01]
overview of Transformers and the

[04:59 - 05:02]
attention mechanism I'll link that in

[05:01 - 05:03]
the description that's really how I

[05:02 - 05:05]
learned while Transformers dominate

[05:03 - 05:08]
they're not the only architecture models

[05:05 - 05:09]
like RW KV which combines RNN based

[05:08 - 05:11]
approaches with parallelization

[05:09 - 05:13]
capabilities are gaining traction for

[05:11 - 05:14]
certain applications in general larger

[05:13 - 05:16]
models with more parameters have greater

[05:14 - 05:18]
capacity to learn and perform better the

[05:16 - 05:19]
number of parameters helps us estimate

[05:18 - 05:21]
the compute resources needed for

[05:19 - 05:22]
training and inference as well however

[05:21 - 05:24]
note the parameter count can be

[05:22 - 05:26]
misleading with sparse models so those

[05:24 - 05:28]
with many zeros which can be more

[05:26 - 05:30]
efficient a large sparse model might

[05:28 - 05:32]
require less compute than a smaller

[05:30 - 05:34]
dense one when designing models compute

[05:32 - 05:35]
is often the limiting factor the

[05:34 - 05:38]
chinchilla scaling law helps calculate

[05:35 - 05:40]
the optimal model size and data size for

[05:38 - 05:41]
a given compute budget it suggests that

[05:40 - 05:43]
the number of training tokens should be

[05:41 - 05:45]
about 20 times the model size so a 3

[05:43 - 05:47]
billion parameter model needs about 60

[05:45 - 05:49]
billion training tokens while the cost

[05:47 - 05:51]
for achieving the same model performance

[05:49 - 05:53]
is decreasing over time the cost for

[05:51 - 05:55]
improvements remains High going from a

[05:53 - 05:58]
3% to a 2% error rate might require an

[05:55 - 06:00]
order of magnitude more data compute or

[05:58 - 06:01]
energy but even small performance

[06:00 - 06:03]
improvements can make a huge difference

[06:01 - 06:05]
for Downstream applications as we keep

[06:03 - 06:07]
scaling models we're approaching two

[06:05 - 06:09]
significant bottlenecks first training

[06:07 - 06:11]
data their's concern will run out of

[06:09 - 06:13]
highquality internet data in the next

[06:11 - 06:15]
few years forcing models to train on AI

[06:13 - 06:17]
generated content potentially causing

[06:15 - 06:19]
performance degradation or requiring

[06:17 - 06:21]
access to proprietary data like

[06:19 - 06:23]
copyrighted books and medical records

[06:21 - 06:25]
second electricity data centers already

[06:23 - 06:27]
consume 1 to 2% of global electricity

[06:25 - 06:29]
limiting how much larger they can grow

[06:27 - 06:31]
without significant energy breakthroughs

[06:29 - 06:33]
pre-trained Foundation models face two

[06:31 - 06:35]
main issues they're optimized for text

[06:33 - 06:37]
completion not conversation and their

[06:35 - 06:39]
outputs can be factually incorrect or

[06:37 - 06:41]
ethically problematic posttraining aims

[06:39 - 06:43]
to address these issues through two main

[06:41 - 06:45]
steps first supervised fine tuning

[06:43 - 06:47]
supervised fine tuning optimizes the

[06:45 - 06:49]
model for conversations instead of

[06:47 - 06:51]
completion this requires high quality

[06:49 - 06:52]
instruction data showing the kinds of

[06:51 - 06:54]
requests the model should handle and how

[06:52 - 06:56]
it should respond it's essentially

[06:54 - 06:58]
teaching the model what good responses

[06:56 - 07:00]
look like second preference fine tuning

[06:58 - 07:02]
preference fine tuning aligns the model

[07:00 - 07:03]
with human values using reinforcement

[07:02 - 07:05]
learning often called reinforcement

[07:03 - 07:07]
learning from Human feedback this

[07:05 - 07:08]
involves training a reward model that

[07:07 - 07:10]
scores outputs based on human

[07:08 - 07:12]
preferences and optimizing the

[07:10 - 07:14]
foundation model to generate responses

[07:12 - 07:15]
that maximize these scores while

[07:14 - 07:17]
reinforcement learning from Human

[07:15 - 07:19]
feedback has been the standard approach

[07:17 - 07:22]
newer methods like direct preference

[07:19 - 07:23]
optimization DPO are gaining traction

[07:22 - 07:25]
some companies even skip the

[07:23 - 07:27]
reinforcement learning step entirely

[07:25 - 07:28]
instead generating multiple outputs and

[07:27 - 07:30]
selecting those with high reward model

[07:28 - 07:32]
scores this is a strategy called best of

[07:30 - 07:35]
end Foundation models don't just produce

[07:32 - 07:37]
a single definitive answer they generate

[07:35 - 07:39]
probabilities for possible outputs how

[07:37 - 07:40]
we sample from these probabilities

[07:39 - 07:42]
dramatically affects the model's

[07:40 - 07:44]
responses the simplest approach is

[07:42 - 07:46]
greedy sampling always picking the

[07:44 - 07:48]
highest probability token but this leads

[07:46 - 07:50]
to repetitive predictable text to

[07:48 - 07:52]
introduce creativity we use sampling

[07:50 - 07:53]
techniques temperature controls how

[07:52 - 07:55]
confident the model is in its

[07:53 - 07:58]
predictions higher temperature values

[07:55 - 08:00]
like 0.7 to 1 make outputs more creative

[07:58 - 08:02]
but potentially less accurate while

[08:00 - 08:04]
lower temperatures close to zero make

[08:02 - 08:06]
outputs more deterministic and focused

[08:04 - 08:08]
top K sampling restricts the model to

[08:06 - 08:11]
choosing from only the K most likely

[08:08 - 08:13]
next tokens typically between 50 and 500

[08:11 - 08:15]
depending on how diverse you want the

[08:13 - 08:17]
responses to be top P sampling selects

[08:15 - 08:19]
the smallest set of tokens whose

[08:17 - 08:22]
cumulative probability exceeds a

[08:19 - 08:23]
threshold p a value of 0.9 means the

[08:22 - 08:26]
model will only consider tokens that

[08:23 - 08:28]
together make up 90% of the probability

[08:26 - 08:30]
Mass this probalistic nature explains

[08:28 - 08:32]
many of the behaviors we in Foundation

[08:30 - 08:34]
models like inconsistency with minor

[08:32 - 08:36]
input changes and hallucinations where

[08:34 - 08:37]
models confidently State incorrect

[08:36 - 08:39]
information now that we understand

[08:37 - 08:40]
Foundation models a little more let's

[08:39 - 08:42]
talk about one of the most crucial yet

[08:40 - 08:44]
underappreciated aspects of AI

[08:42 - 08:46]
engineering evaluation for some

[08:44 - 08:48]
applications figuring out evaluation can

[08:46 - 08:50]
consume the majority of your development

[08:48 - 08:52]
effort it's how you mitigate risks

[08:50 - 08:53]
uncover opportunities and gain

[08:52 - 08:55]
visibility into where your system is

[08:53 - 08:57]
failing evaluating AI systems is

[08:55 - 08:59]
significantly harder than traditional ml

[08:57 - 09:01]
models for several reasons first the

[08:59 - 09:03]
problems these models solve are often

[09:01 - 09:05]
inherently complex evaluating a

[09:03 - 09:07]
mathematical proof or the quality of a

[09:05 - 09:09]
summary requires deep expertise you

[09:07 - 09:11]
might need to read an entire book just

[09:09 - 09:13]
to judge if a summary captures the key

[09:11 - 09:15]
points correctly second tasks are

[09:13 - 09:17]
typically open-ended with many possible

[09:15 - 09:18]
correct responses unlike classification

[09:17 - 09:20]
where there's one right answer a

[09:18 - 09:23]
question like write me a poem about

[09:20 - 09:25]
resilience has countless valid responses

[09:23 - 09:27]
third Foundation models are black boxes

[09:25 - 09:29]
you can only evaluate them by observing

[09:27 - 09:31]
their outputs not by understanding their

[09:29 - 09:33]
internal workings fourth publicly

[09:31 - 09:35]
available evaluation benchmarks quickly

[09:33 - 09:38]
become saturated which is when the model

[09:35 - 09:40]
achieves perfect scores what was a

[09:38 - 09:42]
challenging test yesterday becomes an

[09:40 - 09:44]
easy exercise today and finally for

[09:42 - 09:46]
general purpose models you need to

[09:44 - 09:47]
evaluate not just known tasks but

[09:46 - 09:49]
discover new capabilities that might

[09:47 - 09:50]
extend beyond human abilities all of

[09:49 - 09:52]
this is made worse by a general

[09:50 - 09:54]
underinvestment in evaluation compared

[09:52 - 09:55]
to model development so let's start with

[09:54 - 09:57]
some fundamental metrics used to

[09:55 - 09:59]
evaluate language models during training

[09:57 - 10:01]
most autor regressive language models

[09:59 - 10:02]
are trained using cross entropy or its

[10:01 - 10:04]
relative perplexity these metrics

[10:02 - 10:06]
essentially measure how well the model

[10:04 - 10:08]
predicts the next token in a sequence

[10:06 - 10:10]
entropy measures how much information on

[10:08 - 10:12]
average a token carries the higher the

[10:10 - 10:14]
entropy the more information dense each

[10:12 - 10:15]
token is and the more unpredictable the

[10:14 - 10:17]
language if you can perfectly predict

[10:15 - 10:19]
what I'll say next what I say carries no

[10:17 - 10:21]
new information language models learn

[10:19 - 10:23]
the distribution of their training data

[10:21 - 10:24]
the better a model learns this

[10:23 - 10:26]
distribution the better it becomes at

[10:24 - 10:28]
predicting what comes next resulting in

[10:26 - 10:30]
lower cross entropy a perfectly trained

[10:28 - 10:31]
model would would achieve cross entropy

[10:30 - 10:34]
equal to the entropy of the training

[10:31 - 10:36]
data itself and the KL Divergence

[10:34 - 10:37]
between the two will be zero perplexity

[10:36 - 10:39]
is simply the exponential of cross

[10:37 - 10:41]
entropy it measures the amount of

[10:39 - 10:44]
uncertainty a model has when predicting

[10:41 - 10:45]
the next token higher perplexity means

[10:44 - 10:47]
that there are more possible options the

[10:45 - 10:50]
model is considering what counts as good

[10:47 - 10:52]
perplexity depends entirely on the data

[10:50 - 10:54]
more structured data has lower expected

[10:52 - 10:56]
perplexity because it's more predictable

[10:54 - 10:57]
the larger the vocabulary the higher the

[10:56 - 10:59]
perplexity because there are more

[10:57 - 11:01]
possible options and the long longer the

[10:59 - 11:03]
context length the lower the perplexity

[11:01 - 11:05]
tends to be while perplexity is useful

[11:03 - 11:07]
for guiding training and serves as a

[11:05 - 11:09]
proxy for a model's General capabilities

[11:07 - 11:10]
it becomes less reliable for models that

[11:09 - 11:14]
have undergone significant posttraining

[11:10 - 11:16]
with sft or rhf as models get better at

[11:14 - 11:17]
completing tasks they might actually get

[11:16 - 11:19]
worse at predicting the next token in a

[11:17 - 11:21]
statistical sense perplexity can also be

[11:19 - 11:22]
used to detect if a text was in a

[11:21 - 11:24]
model's training data because it would

[11:22 - 11:26]
be unusually good at predicting those

[11:24 - 11:28]
tokens and to identify nonsensical text

[11:26 - 11:30]
which would have abnormally High

[11:28 - 11:32]
perplexity for some tasks we can perform

[11:30 - 11:34]
exact evaluation where there's no

[11:32 - 11:36]
ambiguity about the correct answer like

[11:34 - 11:38]
multiple choice questions this is in

[11:36 - 11:40]
contrast to subjective evaluation like

[11:38 - 11:42]
grading an essay the gold standard here

[11:40 - 11:44]
is functional correctness evaluating

[11:42 - 11:46]
whether the system performs its intended

[11:44 - 11:48]
functionality for example if I ask a

[11:46 - 11:49]
model to book a restaurant reservation

[11:48 - 11:51]
did it make the correct reservation this

[11:49 - 11:52]
is the ultimate metric for any

[11:51 - 11:54]
application though it's not always clear

[11:52 - 11:56]
how to measure it in coding tasks

[11:54 - 11:58]
functional correctness translates to

[11:56 - 12:01]
execution accuracy does the code run and

[11:58 - 12:02]
produce the expected output for gaming

[12:01 - 12:04]
Bots we can measure objective

[12:02 - 12:05]
performance metrics like win rates when

[12:04 - 12:07]
reference data is available we can

[12:05 - 12:09]
evaluate outputs by comparing their

[12:07 - 12:10]
similarity to this ground truth this

[12:09 - 12:12]
approach is bottlenecked by how much and

[12:10 - 12:15]
how fast reference data can be generated

[12:12 - 12:16]
either by humans or AI there are three

[12:15 - 12:19]
main ways to compare outputs to

[12:16 - 12:21]
references first exact match a binary

[12:19 - 12:23]
measure that works for simple questions

[12:21 - 12:24]
with definitive answers like who was the

[12:23 - 12:27]
first woman to win the Nobel Prize

[12:24 - 12:29]
second lexical similarity a continuous

[12:27 - 12:31]
measure of how much the tokens over

[12:29 - 12:32]
overlap between the output and reference

[12:31 - 12:34]
this can use techniques like edit

[12:32 - 12:36]
distance how many changes are needed to

[12:34 - 12:38]
transform one text into another or

[12:36 - 12:40]
engram overlap metrics like blue and

[12:38 - 12:43]
Rouge the drawback is that you need a

[12:40 - 12:45]
comprehensive set of reference responses

[12:43 - 12:47]
and the references themselves can be

[12:45 - 12:48]
wrong plus higher lexical similarity

[12:47 - 12:50]
doesn't necessarily mean a better

[12:48 - 12:53]
response there are many ways to express

[12:50 - 12:54]
the same idea third semantic similarity

[12:53 - 12:56]
this is a continuous measure of whether

[12:54 - 12:59]
two texts have the same meaning

[12:56 - 13:00]
regardless of the specific words used

[12:59 - 13:02]
this is typically implemented by

[13:00 - 13:04]
comparing text embeddings using metrics

[13:02 - 13:06]
like cosine similarity the advantage is

[13:04 - 13:07]
that it doesn't require references but

[13:06 - 13:09]
it does depend on the quality of the

[13:07 - 13:11]
underlying embedding algorithm one of

[13:09 - 13:13]
the most powerful and common methods for

[13:11 - 13:15]
evaluating AI models in production is

[13:13 - 13:18]
using another AI model as a judge these

[13:15 - 13:19]
AI judges are fast easy to use and

[13:18 - 13:21]
relatively cheap compared to human

[13:19 - 13:23]
evaluators they can work without

[13:21 - 13:25]
reference data and can judge attributes

[13:23 - 13:26]
like correctness toxicity hallucinations

[13:25 - 13:28]
and more Studies have shown that AI

[13:26 - 13:30]
judges can correlate strongly with human

[13:28 - 13:32]
evaluators sometimes showing higher

[13:30 - 13:34]
agreement than between different human

[13:32 - 13:36]
judges they can also explain their

[13:34 - 13:38]
decisions which helps with transparency

[13:36 - 13:40]
you can use AI judges to score outputs

[13:38 - 13:42]
compare outputs to references or pick

[13:40 - 13:44]
the best of two responses since language

[13:42 - 13:46]
models are generally better with text

[13:44 - 13:47]
than numbers AI judges tend to perform

[13:46 - 13:49]
better with classification tasks than

[13:47 - 13:51]
numerical scoring when creating prompts

[13:49 - 13:53]
for AI judges you need to include the

[13:51 - 13:56]
evaluation task criteria and scoring

[13:53 - 13:58]
system few shot examples generally work

[13:56 - 13:59]
better than zero shot which we'll talk

[13:58 - 14:01]
about later in the prompt engering

[13:59 - 14:03]
section though longer prompts do

[14:01 - 14:05]
increase costs interestingly you don't

[14:03 - 14:07]
always need your strongest model as the

[14:05 - 14:08]
judge specialized smaller models can

[14:07 - 14:10]
often perform evaluation tasks

[14:08 - 14:13]
effectively which helps reduce costs and

[14:10 - 14:15]
latency however of course AI judges have

[14:13 - 14:17]
limitations like all AI applications

[14:15 - 14:19]
they're probalistic the same judge given

[14:17 - 14:21]
the same input can produce different

[14:19 - 14:23]
scores if prompted differently or simply

[14:21 - 14:25]
run twice this makes evaluation results

[14:23 - 14:27]
harder to reproduce or trust

[14:25 - 14:29]
additionally metrics aren't standardized

[14:27 - 14:30]
across different systems one system

[14:29 - 14:33]
system's definition of faithfulness

[14:30 - 14:35]
might differ from anothers Models also

[14:33 - 14:36]
exhibit biases they might prefer

[14:35 - 14:39]
responses from the same model this is

[14:36 - 14:41]
called Self Bias favor the first answer

[14:39 - 14:44]
in a comparison this is position bias or

[14:41 - 14:46]
prefer lengthier answers verbosity bias

[14:44 - 14:47]
you can mitigate these biases through

[14:46 - 14:50]
techniques like randomizing the order of

[14:47 - 14:52]
responses but this also increases costs

[14:50 - 14:53]
now that we understand evaluation let's

[14:52 - 14:56]
tackle one of the most crucial decisions

[14:53 - 14:57]
in AI engineering model selection with

[14:56 - 14:59]
the increasing number of readily

[14:57 - 15:01]
available Foundation models models the

[14:59 - 15:02]
challenge isn't developing models but

[15:01 - 15:04]
selecting the right one for your

[15:02 - 15:05]
application during application

[15:04 - 15:07]
development you'll go through model

[15:05 - 15:09]
selection multiple times as you progress

[15:07 - 15:10]
through different adaptation techniques

[15:09 - 15:12]
for instance when doing prompt

[15:10 - 15:13]
engineering you might start with the

[15:12 - 15:15]
strongest model to evaluate feasibility

[15:13 - 15:17]
then work backwards to see if smaller

[15:15 - 15:19]
models would suffice if you decide to

[15:17 - 15:20]
fine-tune you might start with a small

[15:19 - 15:22]
model to test your code before moving to

[15:20 - 15:24]
a larger one the selection process

[15:22 - 15:26]
typically involves two key steps first

[15:24 - 15:29]
finding the best achievable performance

[15:26 - 15:31]
on the task and then second mapping

[15:29 - 15:32]
models along a cost performance axis and

[15:31 - 15:34]
choosing the model that gives the best

[15:32 - 15:36]
performance for your budget your

[15:34 - 15:38]
criteria for evaluating a model can be

[15:36 - 15:40]
organized into four buckets first domain

[15:38 - 15:42]
specific capabilities how well does the

[15:40 - 15:44]
model understand your specific domain

[15:42 - 15:46]
for example if you're summarizing legal

[15:44 - 15:48]
documents how well does it understand

[15:46 - 15:51]
legal terminology second General

[15:48 - 15:52]
capabilities how coherent faithful or

[15:51 - 15:55]
factually consistent are the outputs

[15:52 - 15:56]
third instruction following capabilities

[15:55 - 15:58]
does the model follow the format and

[15:56 - 15:59]
structure you requested and fourth cost

[15:58 - 16:01]
and latency

[15:59 - 16:03]
how expensive is the model to run and

[16:01 - 16:05]
how quickly does it respond sometimes

[16:03 - 16:06]
rather than evaluating absolute quality

[16:05 - 16:08]
you just need to determine which model

[16:06 - 16:09]
is best for your use case this can be

[16:08 - 16:12]
done through point-wise evaluation so

[16:09 - 16:13]
you score each model independently or

[16:12 - 16:15]
comparative evaluation where you

[16:13 - 16:17]
directly compare outputs when evaluating

[16:15 - 16:18]
models you also need to differentiate

[16:17 - 16:20]
between hard attributes and soft

[16:18 - 16:22]
attributes hard attributes are

[16:20 - 16:24]
impossible or impractical to change

[16:22 - 16:27]
these include license restrictions

[16:24 - 16:29]
training data composition model size

[16:27 - 16:30]
privacy requirements and the level of

[16:29 - 16:31]
control you need these are often

[16:30 - 16:33]
determined by the model providers or

[16:31 - 16:35]
your own internal policies and they can

[16:33 - 16:37]
significantly limit your pool of options

[16:35 - 16:38]
soft attributes on the otherand can be

[16:37 - 16:40]
improved through adaptation techniques

[16:38 - 16:42]
like prompt engineering or fine-tuning

[16:40 - 16:44]
these include things like accuracy

[16:42 - 16:46]
toxicity and factual consistency a high

[16:44 - 16:48]
level workflow for model selection looks

[16:46 - 16:50]
like this filter out models whose hard

[16:48 - 16:51]
attributes don't work for you then use

[16:50 - 16:53]
publicly available information like

[16:51 - 16:55]
Benchmark performance to narrow down to

[16:53 - 16:56]
the most promising candidates third run

[16:55 - 16:58]
your own experiments to find the best

[16:56 - 17:00]
model given all of your objectives

[16:58 - 17:02]
fourth continually monitor your chosen

[17:00 - 17:03]
model in production to detect failures

[17:02 - 17:05]
and collect feedback most companies

[17:03 - 17:06]
won't build Foundation models from

[17:05 - 17:09]
scratch so another question is whether

[17:06 - 17:10]
to use commercial model apis or host an

[17:09 - 17:13]
open source model yourself let's clarify

[17:10 - 17:14]
some terminology first originally open

[17:13 - 17:16]
source meant any model you could

[17:14 - 17:18]
download and use but some argue that a

[17:16 - 17:20]
model should only be considered truly

[17:18 - 17:21]
open source if its training data is also

[17:20 - 17:23]
publicly available this allows for more

[17:21 - 17:25]
flexible usage like retraining from

[17:23 - 17:27]
scratch with modifications models with

[17:25 - 17:29]
open weights but closed training data

[17:27 - 17:30]
are sometimes called open weight models

[17:29 - 17:33]
while those with both open weights and

[17:30 - 17:34]
open data are open models so most

[17:33 - 17:36]
so-called open source models are

[17:34 - 17:37]
actually just open weight these models

[17:36 - 17:39]
also come with different licenses that

[17:37 - 17:40]
may restrict commercial use or limit how

[17:39 - 17:43]
you can use the model's outputs for

[17:40 - 17:45]
training other models for a model to be

[17:43 - 17:46]
accessible to users a machine needs to

[17:45 - 17:48]
host and run it the service that hosts

[17:46 - 17:49]
the model and handles queries is often

[17:48 - 17:51]
called the inference service while the

[17:49 - 17:53]
interface the users interact with is the

[17:51 - 17:55]
model API after creating a model

[17:53 - 17:58]
developers can choose to open source it

[17:55 - 17:59]
make it accessible via an API or both

[17:58 - 18:01]
typically model providers open source

[17:59 - 18:03]
their weaker models and keep their best

[18:01 - 18:05]
ones behind pay walls whether to host a

[18:03 - 18:07]
model yourself or use a model API

[18:05 - 18:09]
depends on several factors First Data

[18:07 - 18:11]
privacy if your company has strict data

[18:09 - 18:13]
privacy policies that prevent sending

[18:11 - 18:15]
data outside the organization externally

[18:13 - 18:17]
hosted model apis are not an option

[18:15 - 18:18]
there's also the risk that API providers

[18:17 - 18:21]
might use your data to train their

[18:18 - 18:23]
models next data lineage and copyright

[18:21 - 18:24]
most models aren't transparent about

[18:23 - 18:26]
their training data and intellectual

[18:24 - 18:28]
property laws around AI are still

[18:26 - 18:30]
evolving it's unclear whether using a

[18:28 - 18:32]
model train on copyrighted data could

[18:30 - 18:34]
create legal issues for your product

[18:32 - 18:36]
next performance the gap between open

[18:34 - 18:38]
sourced and proprietary models is

[18:36 - 18:39]
closing but the strongest models will

[18:38 - 18:41]
likely remain proprietary commercial

[18:39 - 18:43]
apis often provide additional

[18:41 - 18:45]
capabilities out of the box like

[18:43 - 18:48]
scalability function calling so

[18:45 - 18:49]
accessing external tools for example

[18:48 - 18:51]
structured outputs and output guard

[18:49 - 18:53]
rails these can be challenging to

[18:51 - 18:55]
implement yourself so many companies

[18:53 - 18:56]
turn to API providers however this means

[18:55 - 18:58]
you'll be restricted to their

[18:56 - 19:00]
functionality you might not be able to

[18:58 - 19:02]
fine-tune or access log probabilities

[19:00 - 19:04]
for example typically proprietary models

[19:02 - 19:06]
are easy to start with and scale but

[19:04 - 19:08]
they can become expensive with heavy

[19:06 - 19:10]
usage and offer less flexibility it's

[19:08 - 19:12]
wise to design your application with a

[19:10 - 19:14]
standard internal API so you can easily

[19:12 - 19:16]
swap between models if needed control is

[19:14 - 19:18]
another consideration what happens if

[19:16 - 19:20]
your API provider goes out of business

[19:18 - 19:22]
changes their terms of service or is

[19:20 - 19:24]
banned in certain regions and if you

[19:22 - 19:26]
want to run a model on device thirdparty

[19:24 - 19:28]
apis aren't an option there are numerous

[19:26 - 19:29]
benchmarks for different use cases and a

[19:28 - 19:31]
tool tool that helps you evaluate a

[19:29 - 19:33]
model on multiple benchmarks is called

[19:31 - 19:36]
an evaluation harness for example open

[19:33 - 19:38]
AI evals lets you run any of around 500

[19:36 - 19:40]
existing benchmarks to evaluate their

[19:38 - 19:42]
models when using public leaderboards

[19:40 - 19:43]
you need to consider which benchmarks to

[19:42 - 19:45]
include in your aggregated ranking how

[19:43 - 19:47]
to weigh different benchmarks and how to

[19:45 - 19:50]
handle benchmarks that use different

[19:47 - 19:51]
metrics like accuracy F1 blue Etc keep

[19:50 - 19:53]
in mind that the goal is to select a

[19:51 - 19:55]
small subset of models for more rigorous

[19:53 - 19:57]
testing with your own benchmarks and

[19:55 - 19:58]
metrics public benchmarks rarely

[19:57 - 20:00]
represent your applications need

[19:58 - 20:02]
perfectly and they may suffer from data

[20:00 - 20:03]
contamination which is when the models

[20:02 - 20:05]
were trained on the same data they're

[20:03 - 20:07]
being evaluated on to deal with

[20:05 - 20:09]
contamination you first need to detect

[20:07 - 20:11]
it using her istics like engram

[20:09 - 20:14]
overlapping and perplexity if perplexity

[20:11 - 20:15]
on the evaluation data is unusually low

[20:14 - 20:16]
it's possible the model has seen this

[20:15 - 20:18]
during training once you've narrowed

[20:16 - 20:20]
down your model candidates you need a

[20:18 - 20:23]
robust evaluation pipeline evaluate both

[20:20 - 20:25]
the endtoend output and each component

[20:23 - 20:26]
intermediate outputs independently you

[20:25 - 20:28]
can use something called turn-based

[20:26 - 20:31]
evaluation where you assess the quality

[20:28 - 20:32]
of each output and task-based evaluation

[20:31 - 20:34]
where you measure whether the system

[20:32 - 20:36]
completes a task and how many turns it

[20:34 - 20:39]
takes first think about what makes a

[20:36 - 20:41]
good response factors like relevance

[20:39 - 20:43]
factual consistency and safety then

[20:41 - 20:44]
create test queries and generate

[20:43 - 20:47]
multiple responses to see how models

[20:44 - 20:49]
perform develop detailed rubrics with

[20:47 - 20:51]
examples for your scoring system whether

[20:49 - 20:53]
you use binary scores continuous scales

[20:51 - 20:55]
or something else depends on your data

[20:53 - 20:57]
and your needs the key is to make your

[20:55 - 20:59]
rubric unambiguous so that human

[20:57 - 21:01]
evaluators can follow it consistently ly

[20:59 - 21:03]
most importantly tie your evaluation

[21:01 - 21:04]
metrics to business metrics if your

[21:03 - 21:07]
customer support chatbots factual

[21:04 - 21:08]
consistency is 80% what does that mean

[21:07 - 21:10]
for the business perhaps you can

[21:08 - 21:12]
automate 30% of customer support

[21:10 - 21:15]
requests at that level but at 90%

[21:12 - 21:16]
consistency you could automate 50% this

[21:15 - 21:18]
lets you quantify the business impact of

[21:16 - 21:20]
model improvements you'll also need to

[21:18 - 21:23]
establish a usefulness threshold for

[21:20 - 21:24]
instance your chat bot must be 90%

[21:23 - 21:26]
factually consistent to be viable in

[21:24 - 21:29]
production different criteria might

[21:26 - 21:31]
require different evaluation methods

[21:29 - 21:33]
you might use a specialized toxicity

[21:31 - 21:35]
classifier semantic similarity metrics

[21:33 - 21:38]
to measure relevance and an AI judge to

[21:35 - 21:39]
assess factual consistency you can even

[21:38 - 21:42]
mix and match evaluation methods for the

[21:39 - 21:44]
same criteria for example maybe use a

[21:42 - 21:47]
cheap classifier on all your data and an

[21:44 - 21:49]
expensive AI judge on just 1% for high

[21:47 - 21:51]
quality signals while automated metrics

[21:49 - 21:53]
are preferable for scale don't hesitate

[21:51 - 21:55]
to include human evaluation even in

[21:53 - 21:57]
production just do it on a subset of

[21:55 - 21:59]
data to keep costs manageable it's also

[21:57 - 22:01]
crucial to evaluate application on

[21:59 - 22:03]
different slices of data or users to

[22:01 - 22:06]
ensure it performs well across segments

[22:03 - 22:07]
and avoid biases this helps you identify

[22:06 - 22:10]
areas for improvement and prevent

[22:07 - 22:12]
Simpsons Paradox where a model performs

[22:10 - 22:14]
better on aggregate but worse on each

[22:12 - 22:15]
individual subset how much evaluation

[22:14 - 22:18]
data you need depends on your

[22:15 - 22:20]
application and methods generally you

[22:18 - 22:22]
want enough to be reliable but not so

[22:20 - 22:23]
much that costs become prohibitive a

[22:22 - 22:25]
good way to test reliability is to

[22:23 - 22:27]
create multiple bootstrap samples of

[22:25 - 22:29]
your evaluation set and see if they

[22:27 - 22:31]
yield similar results if you get 90% on

[22:29 - 22:33]
one bootstrap but 70% on another your

[22:31 - 22:35]
evaluation pipeline isn't trustworthy

[22:33 - 22:36]
finally evaluate the reliability of your

[22:35 - 22:38]
pipeline itself first is it getting

[22:36 - 22:41]
signals right do better responses indeed

[22:38 - 22:42]
get higher scores next do better

[22:41 - 22:44]
evaluation metrics lead to Better

[22:42 - 22:46]
Business outcomes third how reliable is

[22:44 - 22:48]
the pipeline if you run it twice do you

[22:46 - 22:50]
get the same results fourth how

[22:48 - 22:51]
correlated are your metrics you don't

[22:50 - 22:53]
need two metrics if they're perfectly

[22:51 - 22:55]
correlated but completely uncorrelated

[22:53 - 22:57]
metrics might indicate problems and

[22:55 - 22:58]
finally what cost and latency does your

[22:57 - 23:00]
evaluation pipeline add your your

[22:58 - 23:02]
application model selection remains one

[23:00 - 23:04]
of the hardest but most important topics

[23:02 - 23:06]
in AI engineering with the rapidly

[23:04 - 23:07]
growing number of foundation models

[23:06 - 23:09]
available your challenge isn't

[23:07 - 23:11]
developing models but selecting the

[23:09 - 23:13]
right one for your specific needs

[23:11 - 23:15]
balancing performance cost privacy and

[23:13 - 23:17]
control now let's dive into what might

[23:15 - 23:19]
be the most accessible yet surprisingly

[23:17 - 23:22]
nuanced aspect of AI engineering prompt

[23:19 - 23:23]
engineering if you've ever used chat GPT

[23:22 - 23:25]
you've already done some form of prompt

[23:23 - 23:27]
engineering but there's much more to it

[23:25 - 23:28]
than just typing questions prompt

[23:27 - 23:30]
engineering refers to the process of

[23:28 - 23:32]
crafting instructions that guide a model

[23:30 - 23:34]
to generate your desired outcome it's

[23:32 - 23:36]
the easiest and most common model

[23:34 - 23:38]
adaptation technique because unlike fine

[23:36 - 23:39]
tuning it doesn't change the model's

[23:38 - 23:41]
weights you're just telling the model

[23:39 - 23:43]
what you want it to do while it's the

[23:41 - 23:44]
most accessible entry point to AI

[23:43 - 23:46]
engineering don't be fooled into

[23:44 - 23:48]
thinking that it's simplistic effective

[23:46 - 23:50]
prompt engineering requires the same

[23:48 - 23:52]
experimental rigor as any machine

[23:50 - 23:54]
learning task you should extract maximum

[23:52 - 23:55]
value from prompting before moving to

[23:54 - 23:57]
more resource intensive techniques like

[23:55 - 23:58]
fine-tuning that said understanding

[23:57 - 24:00]
prompt engineering alone isn't enough

[23:58 - 24:02]
for production ready systems you'll

[24:00 - 24:03]
still need knowledge of Statistics

[24:02 - 24:05]
engineering and classical ml for

[24:03 - 24:07]
experiment tracking evaluation and data

[24:05 - 24:10]
set curation prompts typically consist

[24:07 - 24:12]
of one or more of these components first

[24:10 - 24:15]
the task description this includes the

[24:12 - 24:17]
model's role and expected output format

[24:15 - 24:18]
for example you are a helpful medical

[24:17 - 24:20]
assistant analyze the following symptoms

[24:18 - 24:22]
and suggest possible conditions listing

[24:20 - 24:24]
them in order of likelihood next

[24:22 - 24:26]
examples these show the model how to

[24:24 - 24:28]
perform the task for instance if you

[24:26 - 24:30]
want a model to classify text as toxic

[24:28 - 24:33]
or non-toxic you might include examples

[24:30 - 24:34]
of each third the concrete task this is

[24:33 - 24:36]
the specific job you want the model to

[24:34 - 24:37]
do like answering a question or

[24:36 - 24:38]
summarizing a book how much prompt

[24:37 - 24:40]
engineering you need depends on the

[24:38 - 24:42]
model's robustness to prompt

[24:40 - 24:43]
perturbation a robust model shouldn't

[24:42 - 24:45]
produce dramatically different outputs

[24:43 - 24:48]
if you write the number five versus

[24:45 - 24:50]
write it out FIV this robustness is

[24:48 - 24:51]
strongly correlated with a model's

[24:50 - 24:52]
overall capability it's also worth

[24:51 - 24:54]
noting that different models have

[24:52 - 24:56]
different preferred prompt structures

[24:54 - 24:58]
for example GPT 4 typically performs

[24:56 - 24:59]
better when the task description is at

[24:58 - 25:01]
the beginning of the prompt while llama

[24:59 - 25:03]
3 does better when the task appears at

[25:01 - 25:05]
the end teaching models what to do via

[25:03 - 25:07]
prompts is known as in context learning

[25:05 - 25:10]
each example in your prompt is called a

[25:07 - 25:12]
shot so we get the terms few shot zero

[25:10 - 25:13]
shot and one shot learning how many

[25:12 - 25:15]
examples you need depends on both the

[25:13 - 25:17]
model and your application so

[25:15 - 25:18]
experimentation is necessary the number

[25:17 - 25:20]
of examples you can include is limited

[25:18 - 25:23]
by the model's context length and for

[25:20 - 25:25]
API models your cost constraints many

[25:23 - 25:27]
modern models distinguish between system

[25:25 - 25:29]
and user prompts the system prompt

[25:27 - 25:30]
contains the Tas task description

[25:29 - 25:33]
telling the model what role to play its

[25:30 - 25:35]
goals and constraints the user prompt

[25:33 - 25:37]
contains the specific task or query

[25:35 - 25:38]
almost all applications like trpt have

[25:37 - 25:40]
system prompts usually created by the

[25:38 - 25:42]
application developers rather than end

[25:40 - 25:44]
users these system and user prompts are

[25:42 - 25:46]
combined using a template that can vary

[25:44 - 25:47]
between models and versions if you use

[25:46 - 25:50]
the wrong template you might experience

[25:47 - 25:51]
unexpected performance issues even small

[25:50 - 25:53]
mistakes like an extra new line can

[25:51 - 25:55]
cause problems when constructing inputs

[25:53 - 25:57]
make sure to follow the model's chat

[25:55 - 25:58]
template exactly this is especially

[25:57 - 26:00]
important if you're using using third

[25:58 - 26:03]
party tools to construct prompts as

[26:00 - 26:05]
template mismatches often lead to silent

[26:03 - 26:06]
failures models typically understand

[26:05 - 26:08]
instructions better when they appear at

[26:06 - 26:09]
the beginning or end of The Prompt

[26:08 - 26:11]
rather than buried in the middle let's

[26:09 - 26:13]
go through some key strategies for

[26:11 - 26:15]
Effective prompt engineering first write

[26:13 - 26:17]
clear and explicit instructions if you

[26:15 - 26:19]
want a model to score an essay explain

[26:17 - 26:21]
the scoring system you want it to use

[26:19 - 26:22]
should it allow fractional scores what

[26:21 - 26:25]
should it do if it can't determine an

[26:22 - 26:27]
answer be specific to reduce ambiguity

[26:25 - 26:29]
second ask the model to adopt a Persona

[26:27 - 26:30]
asking a model to respond as a

[26:29 - 26:32]
particular character or expert can

[26:30 - 26:35]
significantly change its output style

[26:32 - 26:37]
and focus for example respond as an

[26:35 - 26:39]
experienced pediatrician or answer as if

[26:37 - 26:41]
you were explaining it to a 10-year-old

[26:39 - 26:43]
third provide examples examples can

[26:41 - 26:45]
dramatically shift a model's response

[26:43 - 26:48]
style for instance asking will Santa

[26:45 - 26:50]
bring me presents without examples might

[26:48 - 26:52]
get a straight no Santa is fictional

[26:50 - 26:53]
response but if you provide an example

[26:52 - 26:55]
of a Whimsical answer about the Tooth

[26:53 - 26:58]
Fairy the model is more likely to play

[26:55 - 27:00]
along four specify the output format

[26:58 - 27:02]
tell the model exactly how you want the

[27:00 - 27:04]
response structured this might mean

[27:02 - 27:06]
requesting things like no preambles so

[27:04 - 27:08]
none of this based on the content of

[27:06 - 27:10]
this essay I'd give it a score of dot

[27:08 - 27:12]
dot dot you can also ask for specific

[27:10 - 27:15]
formats like Json or markdown and

[27:12 - 27:17]
particular sections or headings five

[27:15 - 27:19]
break complex tasks into simpler

[27:17 - 27:20]
subtasks this not only improves

[27:19 - 27:23]
performance but also makes monitoring

[27:20 - 27:24]
debugging and parallelization easier

[27:23 - 27:26]
however it can increase the latency

[27:24 - 27:28]
perceived by users if they don't see the

[27:26 - 27:29]
intermediate outputs you can also use

[27:28 - 27:32]
cheaper models for simpler steps to

[27:29 - 27:34]
reduce cost six give the model time to

[27:32 - 27:35]
think several techniques can improve

[27:34 - 27:37]
model reasoning Chain of Thought

[27:35 - 27:40]
prompting so think this through step by

[27:37 - 27:42]
step process instructions so something

[27:40 - 27:45]
like first analyze the key themes second

[27:42 - 27:47]
identify the author's perspective and so

[27:45 - 27:49]
on next self-critique ask the model to

[27:47 - 27:50]
check its own work these approaches

[27:49 - 27:53]
generally improve quality but increase

[27:50 - 27:56]
latency and token usage seven iterate

[27:53 - 27:57]
systematically this is so important

[27:56 - 27:59]
different techniques work better for

[27:57 - 28:01]
different models so experimentation is

[27:59 - 28:03]
crucial always version your prompts and

[28:01 - 28:05]
use an experiment tracking tool with

[28:03 - 28:08]
standardized evaluation metrics and data

[28:05 - 28:10]
also separate prompts from code store

[28:08 - 28:11]
them in configuration files rather than

[28:10 - 28:13]
hardcoding them this will make it way

[28:11 - 28:15]
easier to update various tools aim to

[28:13 - 28:17]
automate The Prompt engineering workflow

[28:15 - 28:19]
including open prompt and dspi these

[28:17 - 28:21]
tools let you specify input and output

[28:19 - 28:23]
formats evaluation metrics and

[28:21 - 28:25]
evaluation data then essentially they

[28:23 - 28:27]
perform automl to find the optimal

[28:25 - 28:29]
prompts however these tools can be

[28:27 - 28:31]
expensive if if they make many API calls

[28:29 - 28:32]
under the hood they also might produce

[28:31 - 28:34]
prompts with typos or other issues and

[28:32 - 28:36]
they may not keep up with changing model

[28:34 - 28:38]
requirements for these reasons it's best

[28:36 - 28:39]
to start with manual prompt engineering

[28:38 - 28:41]
before moving to automated tools you can

[28:39 - 28:43]
also use AI models themselves to write

[28:41 - 28:45]
and refine prompts once your application

[28:43 - 28:46]
is available to users it may face

[28:45 - 28:48]
attacks from malicious actors trying to

[28:46 - 28:50]
exploit it three main types of prompt

[28:48 - 28:52]
attacks include prompt extraction

[28:50 - 28:53]
attacks where attackers might try to

[28:52 - 28:56]
extract your system prompt to either

[28:53 - 28:58]
replicate or exploit your application

[28:56 - 28:59]
jailbreaking and prompt injection the

[28:58 - 29:01]
attacks attempt to subvert the model's

[28:59 - 29:03]
safety features or get it to perform

[29:01 - 29:05]
unauthorized actions like providing

[29:03 - 29:07]
instructions for harmful activities or

[29:05 - 29:09]
executing dangerous code and third

[29:07 - 29:10]
information extraction these attacks try

[29:09 - 29:12]
to get the model to reveal sensitive

[29:10 - 29:14]
information from its training data or

[29:12 - 29:16]
context to defend against these attacks

[29:14 - 29:18]
consider the following strategies use

[29:16 - 29:20]
benchmarks to evaluate safety against

[29:18 - 29:22]
adversarial attacks conduct security red

[29:20 - 29:24]
teaming to proactively find weaknesses

[29:22 - 29:26]
be explicit in your prompts about what

[29:24 - 29:28]
information the model should not return

[29:26 - 29:29]
repeat the system prompt before and

[29:28 - 29:31]
after user inputs to remind the model of

[29:29 - 29:33]
its constraints Design Systems with

[29:31 - 29:36]
safety boundaries like running generated

[29:33 - 29:37]
code only in isolated environments

[29:36 - 29:40]
require human approval for potentially

[29:37 - 29:42]
impactful actions define out of scope

[29:40 - 29:44]
topics for your application use anomaly

[29:42 - 29:46]
detection to identify unusual prompts

[29:44 - 29:48]
and Implement guardrails on both inputs

[29:46 - 29:50]
and outputs when evaluating your system

[29:48 - 29:53]
security track both the violation rate

[29:50 - 29:55]
so how often attack succeed and the

[29:53 - 29:57]
false refusal rate how often the model

[29:55 - 29:59]
incorrectly refuses legitimate requests

[29:57 - 30:00]
you need to balance these metrics

[29:59 - 30:02]
perfect security with too many false

[30:00 - 30:04]
refusals creates a really frustrating

[30:02 - 30:06]
user experience by approaching prompt

[30:04 - 30:08]
engineering with this combination of

[30:06 - 30:10]
creativity and riger you can extract

[30:08 - 30:11]
remarkable performance from Foundation

[30:10 - 30:13]
models without the complexity and

[30:11 - 30:15]
expense of fine-tuning remember that

[30:13 - 30:17]
small changes in your prompts can lead

[30:15 - 30:19]
to significant improvements in output

[30:17 - 30:21]
quality so experiment widely and measure

[30:19 - 30:22]
carefully now that we've covered prompt

[30:21 - 30:24]
engineering let's explore how to give

[30:22 - 30:26]
Foundation models access to information

[30:24 - 30:28]
beyond what they were trained on to

[30:26 - 30:30]
solve a task effectively a model needs

[30:28 - 30:31]
two things instructions on how to

[30:30 - 30:33]
perform the task and the necessary

[30:31 - 30:35]
information to complete it two dominant

[30:33 - 30:36]
patterns have emerged for providing

[30:35 - 30:38]
models with the information they need

[30:36 - 30:40]
retrieval augmented generation or rag

[30:38 - 30:42]
and the agentic pattern rag allows

[30:40 - 30:44]
models to retrieve relevant information

[30:42 - 30:46]
from external data sources while the

[30:44 - 30:48]
agentic pattern enables models to use

[30:46 - 30:50]
tools like web search and apis to gather

[30:48 - 30:53]
information actively while rag is

[30:50 - 30:54]
primarily used for context construction

[30:53 - 30:56]
the agentic pattern can do much more

[30:54 - 30:59]
let's start with rag first so what is

[30:56 - 31:00]
rag retrieval augmented generation is a

[30:59 - 31:02]
technique that enhances a model's

[31:00 - 31:04]
generation capabilities by retrieving

[31:02 - 31:06]
relevant information from external

[31:04 - 31:09]
memory sources these sources could be an

[31:06 - 31:10]
internal database a user's previous chat

[31:09 - 31:12]
sessions or even the internet you can

[31:10 - 31:14]
think of rag as a technique to construct

[31:12 - 31:15]
context specific to each query

[31:14 - 31:17]
connecting the model with information it

[31:15 - 31:19]
wasn't trained on or might have

[31:17 - 31:21]
forgotten a rag system consists of two

[31:19 - 31:23]
main components a retriever that fetches

[31:21 - 31:25]
the information from the external memory

[31:23 - 31:27]
source and a generator the foundation

[31:25 - 31:29]
model that produces a response based on

[31:27 - 31:30]
the retrieved information in today's rag

[31:29 - 31:32]
systems these components are often

[31:30 - 31:34]
trained separately with many teams using

[31:32 - 31:36]
off-the-shelf Retriever and models

[31:34 - 31:38]
however fine tuning the entire rag

[31:36 - 31:40]
system from end to end can significantly

[31:38 - 31:42]
improve performance the success of a rag

[31:40 - 31:44]
system heavily depends on its retriever

[31:42 - 31:46]
a retriever performs two main functions

[31:44 - 31:48]
indexing and querying indexing involves

[31:46 - 31:50]
processing data so that it can quickly

[31:48 - 31:51]
be retrieved later this is the

[31:50 - 31:53]
preparatory step where you organize your

[31:51 - 31:55]
knowledge base querying is the process

[31:53 - 31:57]
of sending a search query to retrieve

[31:55 - 31:58]
data relevant to it how you index your

[31:57 - 32:00]
data determines how you retrieve it

[31:58 - 32:01]
later let's walk through a simple

[32:00 - 32:03]
example imagine your external memory as

[32:01 - 32:05]
a database of documents like contracts

[32:03 - 32:07]
or meeting notes these documents can

[32:05 - 32:09]
range from 10 tokens to a million tokens

[32:07 - 32:10]
in length naively retrieving whole

[32:09 - 32:12]
documents would make your context

[32:10 - 32:14]
arbitrarily long potentially exceeding

[32:12 - 32:16]
the model's context window to avoid this

[32:14 - 32:18]
you typically split each document into

[32:16 - 32:20]
smaller chunks which we'll discuss later

[32:18 - 32:22]
for each user query your goal is to

[32:20 - 32:24]
retrieve the data chunks most relevant

[32:22 - 32:25]
to that query then with some

[32:24 - 32:28]
postprocessing to join the retrieved

[32:25 - 32:30]
chunks with the user's prompt you the

[32:28 - 32:31]
final prompt that goes to the model many

[32:30 - 32:34]
existing retrieval algorithms can be

[32:31 - 32:35]
used for rag retrieval works by ranking

[32:34 - 32:37]
documents based on their relevance to a

[32:35 - 32:39]
given query and algorithms differ in how

[32:37 - 32:41]
they compute these relevant scores first

[32:39 - 32:43]
term-based retrieval this is also called

[32:41 - 32:45]
lexical retrieval and this approach

[32:43 - 32:47]
finds relevant documents based on

[32:45 - 32:49]
keywords while this is straightforward

[32:47 - 32:51]
it has several limitations so many

[32:49 - 32:53]
documents might contain a term without

[32:51 - 32:55]
truly being about it and queries can be

[32:53 - 32:57]
long with many terms that aren't equally

[32:55 - 33:00]
important so tfidf can help address this

[32:57 - 33:02]
this also simple tokenization can miss

[33:00 - 33:03]
semantic relationships term-based

[33:02 - 33:05]
retrieval is generally faster than

[33:03 - 33:08]
embedding based approaches during both

[33:05 - 33:09]
indexing and querying it also works well

[33:08 - 33:11]
out of the box with existing systems

[33:09 - 33:13]
like elastic search embedding based

[33:11 - 33:15]
retrieval is another option this

[33:13 - 33:17]
approach computes relevance at the

[33:15 - 33:19]
semantic level rather than a lexical one

[33:17 - 33:21]
ranking documents based on how closely

[33:19 - 33:23]
their meaning aligns with the query the

[33:21 - 33:24]
process works like this convert your

[33:23 - 33:26]
original data to embeddings using an

[33:24 - 33:28]
embedding model store these embeddings

[33:26 - 33:30]
in a vector database when a query comes

[33:28 - 33:32]
in convert it to an embedding using the

[33:30 - 33:33]
same model fetch the K data chunks whose

[33:32 - 33:35]
embeddings are closest to the query

[33:33 - 33:37]
embedding and return them Vector search

[33:35 - 33:38]
is typically framed as a k nearest

[33:37 - 33:40]
neighbor search problem this can be

[33:38 - 33:42]
computationally expensive for large data

[33:40 - 33:43]
sets so approximate nearest neighbors

[33:42 - 33:45]
algorithms are often used instead in

[33:43 - 33:47]
practice most developers won't Implement

[33:45 - 33:48]
Vector search themselves but will use

[33:47 - 33:50]
existing Vector databases these

[33:48 - 33:53]
databases organize vectors into buckets

[33:50 - 33:54]
trees or graphs using various fistic to

[33:53 - 33:56]
increase the likelihood that similar

[33:54 - 33:57]
vectors are stored close to each other

[33:56 - 33:59]
embedding based retrieval can sign

[33:57 - 34:01]
significantly outperform term-based

[33:59 - 34:02]
retrieval over time especially if you

[34:01 - 34:05]
fine-tune your embedding model and

[34:02 - 34:06]
retriever but it has its downsides it

[34:05 - 34:08]
can make it harder to search for

[34:06 - 34:10]
specific names or error codes and

[34:08 - 34:12]
generating embeddings can be expensive

[34:10 - 34:13]
and introduce latency a production

[34:12 - 34:16]
retrieval system typically combines

[34:13 - 34:17]
several approaches for example a cheaper

[34:16 - 34:20]
less precise retriever like turn-based

[34:17 - 34:21]
search might first fetch candidates and

[34:20 - 34:23]
then a more precise but expensive

[34:21 - 34:25]
mechanism like KNN finds the best

[34:23 - 34:27]
options among those candidates depending

[34:25 - 34:28]
on your task certain tactics can

[34:27 - 34:30]
increase the chance of retrieving

[34:28 - 34:32]
relevant documents the simplest approach

[34:30 - 34:34]
is to divide documents into chunks of

[34:32 - 34:35]
equal length based on characters words

[34:34 - 34:37]
sentences or paragraphs overlapping

[34:35 - 34:39]
chunks can ensure that important

[34:37 - 34:41]
boundary information is included in at

[34:39 - 34:42]
least one chunk smaller chunk sizes

[34:41 - 34:44]
allow for more diverse information since

[34:42 - 34:46]
you can fit more chunks into the model's

[34:44 - 34:48]
context but this can also result in the

[34:46 - 34:50]
loss of important context smaller chunks

[34:48 - 34:52]
also increase computational overhead

[34:50 - 34:54]
especially for embedding based retrieval

[34:52 - 34:56]
there's no Universal best chunk size or

[34:54 - 34:57]
overlap percentage you just need to

[34:56 - 34:59]
experiment based on your specific data

[34:57 - 35:01]
and task the initial document rankings

[34:59 - 35:03]
generated by the retriever can be

[35:01 - 35:04]
further refined to be more accurate this

[35:03 - 35:06]
is especially useful when you need to

[35:04 - 35:08]
reduce the number of retrieve documents

[35:06 - 35:10]
due to context window limitations

[35:08 - 35:12]
documents could be reranked based on

[35:10 - 35:14]
various factors such as recency so maybe

[35:12 - 35:16]
you give more weight to newer data or

[35:14 - 35:19]
additional relevant signals next let's

[35:16 - 35:22]
talk about query rewriting also known as

[35:19 - 35:24]
query reformulation normalization or

[35:22 - 35:26]
expansion this technique involves

[35:24 - 35:28]
rewriting queries to include necessary

[35:26 - 35:31]
context for example if a user asks

[35:28 - 35:33]
what's its population after previously

[35:31 - 35:35]
asking about Paris the query might be

[35:33 - 35:38]
expanded to what's the population of

[35:35 - 35:40]
Paris each chunk can be augmented with

[35:38 - 35:41]
relevant context to make it easier to

[35:40 - 35:44]
retrieve this might include metadata

[35:41 - 35:45]
like tags and keywords or for e-commerce

[35:44 - 35:48]
products it could be information like

[35:45 - 35:49]
descriptions and reviews you can also

[35:48 - 35:51]
augment chunks with context from the

[35:49 - 35:53]
full document to help them retain more

[35:51 - 35:54]
of the original meaning for example

[35:53 - 35:56]
maybe a summary of the entire document

[35:54 - 35:58]
when choosing a retrieval solution

[35:56 - 36:00]
consider first first what retrieval

[35:58 - 36:03]
mechanisms it supports term-based

[36:00 - 36:05]
embedding based and or hybrid for Vector

[36:03 - 36:07]
databases what embedding models and

[36:05 - 36:09]
Vector search algorithms are supported

[36:07 - 36:11]
also consider scalability both for data

[36:09 - 36:13]
storage and query traffic you'll need to

[36:11 - 36:16]
think about indexing speed and batch

[36:13 - 36:17]
processing capabilities query latency

[36:16 - 36:19]
pricing structure and compliance

[36:17 - 36:21]
requirements as well it's also important

[36:19 - 36:23]
to note that rag isn't limited to just

[36:21 - 36:25]
text it can also be used with multimodal

[36:23 - 36:27]
and tabular data for instance if a user

[36:25 - 36:29]
asks what's the color of the house in

[36:27 - 36:31]
the Pixar movie up a multimodal rag

[36:29 - 36:32]
system might first retrieve an image of

[36:31 - 36:34]
the house to help the model answer

[36:32 - 36:37]
similarly rag can work with tabular data

[36:34 - 36:38]
using text to SQL conversations the

[36:37 - 36:40]
system can execute a query on a database

[36:38 - 36:42]
and then generate a response based on

[36:40 - 36:44]
the results for complex database schemas

[36:42 - 36:45]
you might need an intermediate step to

[36:44 - 36:47]
predict which table to use for each

[36:45 - 36:48]
query especially if there are too many

[36:47 - 36:50]
tables to fit all the schemas in the

[36:48 - 36:52]
context window in the next part we'll

[36:50 - 36:54]
explore the agentic pattern which goes

[36:52 - 36:56]
beyond passive retrieval to actively

[36:54 - 36:57]
interact with external tools and apis

[36:56 - 37:00]
the agentic pattern is a more active

[36:57 - 37:02]
approach to extending AI capabilities

[37:00 - 37:03]
this is a rapidly evolving field so

[37:02 - 37:05]
consider this section more experimental

[37:03 - 37:07]
than the others we've covered at its

[37:05 - 37:09]
broadest definition an agent is anything

[37:07 - 37:11]
that can perceive its environment and

[37:09 - 37:13]
act upon it for AI systems this means

[37:11 - 37:14]
that a model can observe its environment

[37:13 - 37:16]
make decisions based on those

[37:14 - 37:18]
observations take actions that affect

[37:16 - 37:19]
the environment and learn from the

[37:18 - 37:22]
outcomes of those actions the

[37:19 - 37:24]
environment is defined by the use case

[37:22 - 37:25]
for a game playing Agent the game is the

[37:24 - 37:27]
environment for a web scraping agent the

[37:25 - 37:29]
internet is the environment what makes

[37:27 - 37:31]
agents powerful is the set of tools they

[37:29 - 37:33]
have access to for example chat GPT is

[37:31 - 37:35]
an agent that can search the web execute

[37:33 - 37:37]
python code and generate images among

[37:35 - 37:39]
other capabilities remember our rag

[37:37 - 37:41]
example with tabular data that was

[37:39 - 37:43]
actually a simple agent with three

[37:41 - 37:45]
actions generating SQL queries executing

[37:43 - 37:47]
those queries and producing a response

[37:45 - 37:49]
let's see how this works in practice if

[37:47 - 37:52]
a user asks project the sales revenue

[37:49 - 37:54]
over the next 3 months the agent might

[37:52 - 37:57]
first reason about how to accomplish the

[37:54 - 37:58]
task then generate a SQL query to fetch

[37:57 - 38:00]
historical sales data next it would

[37:58 - 38:02]
execute that query against the database

[38:00 - 38:04]
analyze if the retrieved information is

[38:02 - 38:06]
sufficient possibly generate and execute

[38:04 - 38:08]
additional queries and then create a

[38:06 - 38:09]
projection based on the gathered data

[38:08 - 38:11]
finally it would conclude that the task

[38:09 - 38:13]
has been successfully completed compared

[38:11 - 38:15]
to simpler AI applications agents

[38:13 - 38:16]
require more powerful models because

[38:15 - 38:18]
they often need to perform multiple

[38:16 - 38:20]
steps to complete a task the overall

[38:18 - 38:22]
success rate decreases with each step

[38:20 - 38:23]
because of compounding errors and the

[38:22 - 38:25]
stakes are higher since agents have

[38:23 - 38:27]
access to potentially powerful tools

[38:25 - 38:29]
speaking of tools agents can be equipped

[38:27 - 38:31]
with various tools which fall into

[38:29 - 38:33]
several categories first knowledge

[38:31 - 38:35]
augmentation tools these could be things

[38:33 - 38:38]
like text or image retrievers as in rag

[38:35 - 38:40]
SQL executors for database access web

[38:38 - 38:43]
search capabilities apis for accessing

[38:40 - 38:44]
inventory systems email readers Etc and

[38:43 - 38:47]
web browsers for navigating online

[38:44 - 38:49]
content whether public or private next

[38:47 - 38:50]
we have capability extension tools like

[38:49 - 38:53]
calculators since AI models often

[38:50 - 38:55]
struggle with complex math time zone or

[38:53 - 38:57]
unit converters translation services and

[38:55 - 38:59]
code interpreters we also have WR action

[38:57 - 39:02]
tools so tools that enable the agent not

[38:59 - 39:04]
just to read but also write to systems

[39:02 - 39:06]
these can automate workflows but require

[39:04 - 39:08]
strong security protocols complex tasks

[39:06 - 39:10]
require planning and there are many

[39:08 - 39:12]
possible ways to decompose a task not

[39:10 - 39:13]
all approaches will be successful and

[39:12 - 39:15]
not all will be efficient to help with

[39:13 - 39:18]
debugging and to prevent cases where a

[39:15 - 39:19]
model executes unnecessary API calls

[39:18 - 39:21]
planning should be decoupled from

[39:19 - 39:23]
execution the process typically works

[39:21 - 39:26]
like this first ask the agent to

[39:23 - 39:28]
generate a plan then validate the plan

[39:26 - 39:30]
before execution and then only execute

[39:28 - 39:32]
once validated plans can be validated

[39:30 - 39:35]
using heris STS like removing plans with

[39:32 - 39:37]
invalid actions or too many steps or by

[39:35 - 39:39]
using another AI model as a judge you

[39:37 - 39:41]
can even generate several plans in

[39:39 - 39:42]
parallel and then ask an evaluator to

[39:41 - 39:44]
pick the most promising one for

[39:42 - 39:46]
particularly important or sensitive

[39:44 - 39:48]
tasks you might want a human in the loop

[39:46 - 39:50]
to review plans before execution while

[39:48 - 39:51]
Foundation model agents use the model

[39:50 - 39:53]
itself as the planner reinforcement

[39:51 - 39:54]
learning agents are trained using

[39:53 - 39:56]
reinforcement learning algorithms this

[39:54 - 39:57]
approach uses more resources than

[39:56 - 39:59]
Foundation models but could offer

[39:57 - 40:01]
performance improvements in the future

[39:59 - 40:02]
the simplest way to turn a model into a

[40:01 - 40:04]
plan generator is through prompt

[40:02 - 40:05]
engineering you tell the model what

[40:04 - 40:07]
functionality it has available and the

[40:05 - 40:09]
expected inputs and outputs for each

[40:07 - 40:10]
tool you can improve your prompts by

[40:09 - 40:13]
writing better system prompts with more

[40:10 - 40:14]
examples providing clearer descriptions

[40:13 - 40:16]
of tools and their parameters

[40:14 - 40:17]
simplifying functions as much as

[40:16 - 40:19]
possible using a stronger model or

[40:17 - 40:21]
fine-tuning a model specifically for

[40:19 - 40:23]
Plan Generation as a practical tip

[40:21 - 40:25]
always ask the system to report what

[40:23 - 40:27]
parameter values it uses for each

[40:25 - 40:28]
function call this provides a sanity

[40:27 - 40:30]
check check that can catch many issues

[40:28 - 40:32]
before execution another useful approach

[40:30 - 40:34]
is to generate plans in natural language

[40:32 - 40:36]
first then translate them to the exact

[40:34 - 40:38]
function calls in a second step this

[40:36 - 40:40]
helps if function names change over time

[40:38 - 40:42]
or if you find a model specifically for

[40:40 - 40:44]
plan creation the translation can often

[40:42 - 40:47]
be done by a smaller cheaper model

[40:44 - 40:48]
agents can fail in various ways so it's

[40:47 - 40:50]
important to have robust evaluation

[40:48 - 40:51]
methods there are lots of different

[40:50 - 40:53]
things that can go wrong so we could

[40:51 - 40:56]
have planning failures like using

[40:53 - 40:58]
invalid tools using valid tools but with

[40:56 - 41:00]
invalid parameters using valid tools

[40:58 - 41:01]
with incorrect parameter values or

[41:00 - 41:03]
failing to achieve the goal or satisfy

[41:01 - 41:05]
constraints to evaluate planning

[41:03 - 41:07]
capability create a data set where each

[41:05 - 41:09]
example is a tuple of task available

[41:07 - 41:11]
tools and constraints for each task use

[41:09 - 41:13]
the agent to generate multiple plans and

[41:11 - 41:15]
compute metrics like the percentage of

[41:13 - 41:17]
generated plans that are valid how many

[41:15 - 41:19]
attempts it takes to get a valid plan

[41:17 - 41:21]
percentage of tools called that are

[41:19 - 41:22]
valid and how often invalid tools are

[41:21 - 41:24]
called you could also have tool failures

[41:22 - 41:26]
so that could include things like bad

[41:24 - 41:27]
translation from high level plans to

[41:26 - 41:30]
specific function name

[41:27 - 41:31]
no access to the required tools or tools

[41:30 - 41:33]
giving incorrect outputs like poorly

[41:31 - 41:35]
generated SQL queries for this your

[41:33 - 41:37]
efficiency metrics might be how many

[41:35 - 41:39]
steps does the agent need on average to

[41:37 - 41:41]
complete a task what's the cost to

[41:39 - 41:42]
complete a task how long does each

[41:41 - 41:44]
action typically take are there

[41:42 - 41:46]
particularly slow or expensive actions

[41:44 - 41:47]
and how does the agent compare to

[41:46 - 41:50]
baselines which might be another agent

[41:47 - 41:51]
or a human one of the key challenges for

[41:50 - 41:53]
agents is remembering information over

[41:51 - 41:56]
time a memory system allows a model to

[41:53 - 41:58]
retain and utilize information across

[41:56 - 42:00]
interactions a a models typically have

[41:58 - 42:02]
three main memory mechanisms there's the

[42:00 - 42:03]
internal knowledge embedded in the model

[42:02 - 42:04]
itself through training there's the

[42:03 - 42:07]
context window which is kind of your

[42:04 - 42:09]
shortterm memory for immediate session

[42:07 - 42:10]
specific information and finally

[42:09 - 42:12]
external data sources like rag systems

[42:10 - 42:14]
this is kind of like your long-term

[42:12 - 42:16]
memory information that is essential to

[42:14 - 42:17]
all tasks should be incorporated via

[42:16 - 42:19]
training rarely needed information

[42:17 - 42:21]
should reside in long-term memory while

[42:19 - 42:23]
short-term memory is for immediate

[42:21 - 42:25]
context specific information benefits of

[42:23 - 42:27]
a well-designed memory management system

[42:25 - 42:29]
include storing information longer than

[42:27 - 42:31]
the context window allows persisting

[42:29 - 42:33]
information between sessions making a

[42:31 - 42:35]
model more consistent in its responses

[42:33 - 42:37]
and actions by combining rag for

[42:35 - 42:40]
information access tools for capability

[42:37 - 42:42]
extension planning for complex tasks and

[42:40 - 42:44]
memory systems for continuity agents can

[42:42 - 42:46]
tackle increasingly sophisticated

[42:44 - 42:48]
problems while this field is still

[42:46 - 42:49]
evolving rapidly it represents one of

[42:48 - 42:51]
the most promising Frontiers in AI

[42:49 - 42:53]
engineering as with all powerful

[42:51 - 42:55]
Technologies agent systems require

[42:53 - 42:57]
careful consideration of safety security

[42:55 - 42:59]
and ethical use the more capable able an

[42:57 - 43:00]
agent becomes the more critical it is to

[42:59 - 43:02]
ensure it operates within appropriate

[43:00 - 43:04]
boundaries and with proper oversight now

[43:02 - 43:06]
let's explore fine tuning the process of

[43:04 - 43:08]
adapting a model to a specific task by

[43:06 - 43:10]
further training it and adjusting its

[43:08 - 43:11]
weights while prompt engineering and rag

[43:10 - 43:14]
are relatively lightweight techniques

[43:11 - 43:15]
fine-tuning offers deeper customization

[43:14 - 43:18]
but requires more resources and

[43:15 - 43:20]
expertise so when to fine-tune fine

[43:18 - 43:22]
tuning can improve a model's performance

[43:20 - 43:24]
in two ways first by enhancing domain

[43:22 - 43:26]
specific capabilities like coding or

[43:24 - 43:28]
answering medical questions and second

[43:26 - 43:29]
improving instruction following

[43:28 - 43:31]
abilities like adhering to specific

[43:29 - 43:33]
output formats however fine tuning

[43:31 - 43:35]
requires significant upfront investment

[43:33 - 43:36]
it often needs more memory than what's

[43:35 - 43:38]
available on a single GPU making it

[43:36 - 43:40]
expensive this is why reducing memory

[43:38 - 43:41]
requirements has become a primary

[43:40 - 43:43]
motivation for many fine-tuning

[43:41 - 43:45]
techniques that we'll discuss later so

[43:43 - 43:46]
you should consider fine-tuning when

[43:45 - 43:48]
you've already exhausted what you can

[43:46 - 43:50]
achieve with prompt-based methods you

[43:48 - 43:52]
need to produce consistent structured

[43:50 - 43:54]
outputs and you're working with smaller

[43:52 - 43:56]
models that need to perform better on

[43:54 - 43:58]
specific tasks a common approach is

[43:56 - 43:59]
model distillation fine-tuning a small

[43:58 - 44:01]
model to imitate a larger model's

[43:59 - 44:04]
Behavior using data generated by the

[44:01 - 44:06]
large model on specific tasks a small

[44:04 - 44:08]
fine-tune model May outperform a larger

[44:06 - 44:10]
general purpose model on the other hand

[44:08 - 44:12]
you should avoid fine-tuning if you need

[44:10 - 44:14]
a general purpose model fine-tuning can

[44:12 - 44:17]
improve performance on specific tasks

[44:14 - 44:18]
but degrade performance on others or if

[44:17 - 44:20]
you're just starting to experiment with

[44:18 - 44:22]
a project many teams jump straight to

[44:20 - 44:24]
find tuning before thoroughly exploring

[44:22 - 44:26]
simpler approaches so what about

[44:24 - 44:28]
fine-tuning versus rag after you've

[44:26 - 44:29]
maximized performance gains from

[44:28 - 44:31]
prompting choosing between Rag and

[44:29 - 44:32]
fine-tuning depends on whether your

[44:31 - 44:34]
model's failures are information based

[44:32 - 44:36]
or behavior-based if the model fails

[44:34 - 44:38]
because it lacks information like

[44:36 - 44:40]
private company data or recent events

[44:38 - 44:41]
rag gives the model better access to

[44:40 - 44:43]
that information if the model has

[44:41 - 44:45]
behavioral issues which I think is very

[44:43 - 44:47]
funny to say like outputs that are

[44:45 - 44:48]
factually correct but irrelevant or

[44:47 - 44:50]
they're in the wrong format fine tuning

[44:48 - 44:52]
might help more if your model has both

[44:50 - 44:54]
issues start with rag because it's

[44:52 - 44:56]
easier begin with a simple term-based

[44:54 - 44:58]
solution and evolve from there in many

[44:56 - 44:59]
cases combining rag and fine tuning will

[44:58 - 45:01]
give you the biggest performance boost

[44:59 - 45:04]
so the workflow to adapt a model to a

[45:01 - 45:06]
task might be first design evaluation

[45:04 - 45:08]
criteria and an evaluation pipeline then

[45:06 - 45:09]
try to get the model to perform the task

[45:08 - 45:11]
with prompting alone add more examples

[45:09 - 45:12]
to the prompt from there at that point

[45:11 - 45:14]
if the model continues to have

[45:12 - 45:16]
information based failures try more

[45:14 - 45:17]
advanced rag like embedding based

[45:16 - 45:19]
retrieval if it continues to have

[45:17 - 45:21]
behavioral issues opt for fine-tuning

[45:19 - 45:23]
finally combine Rag and fine-tuning for

[45:21 - 45:25]
a bigger performance boost because of

[45:23 - 45:27]
the scale of foundation models memory is

[45:25 - 45:28]
a major bottleneck for both inference

[45:27 - 45:30]
and fine tuning the memory requirements

[45:28 - 45:31]
for fine-tuning are typically much

[45:30 - 45:33]
higher than for inference due to how

[45:31 - 45:34]
neural networks are trained neural

[45:33 - 45:36]
networks are typically trained using

[45:34 - 45:38]
back propagation each training step

[45:36 - 45:40]
consists of a forward pass where we

[45:38 - 45:41]
compute the output from the input and a

[45:40 - 45:43]
backwards pass where we update the

[45:41 - 45:45]
model's weights using signals from the

[45:43 - 45:47]
forward pass during inference only the

[45:45 - 45:49]
forward pass is executed during training

[45:47 - 45:51]
both passes are needed the key

[45:49 - 45:52]
contributors to a model's memory

[45:51 - 45:54]
footprint during fine tuning are the

[45:52 - 45:56]
total number of parameters the number of

[45:54 - 45:58]
trainable parameters and the numerical

[45:56 - 45:59]
representation of these parameters a

[45:58 - 46:01]
trainable parameter is one that can be

[45:59 - 46:03]
updated during fine tuning so during

[46:01 - 46:05]
pre-training all model parameters are

[46:03 - 46:08]
updated during inference no parameters

[46:05 - 46:10]
are updated and during fine-tuning some

[46:08 - 46:12]
or all of the parameters may be updated

[46:10 - 46:14]
parameters that remain unchanged are

[46:12 - 46:15]
called Frozen parameters one way to

[46:14 - 46:17]
reduce training memory is through

[46:15 - 46:19]
gradient checkpointing also called

[46:17 - 46:21]
activation recomputation where

[46:19 - 46:23]
activations aren't stored but recomputed

[46:21 - 46:24]
as needed this increases training time

[46:23 - 46:26]
but reduces memory requirements the key

[46:24 - 46:28]
Insight here is that the more trainable

[46:26 - 46:29]
parameters we have the higher the memory

[46:28 - 46:31]
footprint reducing the number of

[46:29 - 46:33]
trainable parameters reduces memory

[46:31 - 46:34]
requirements this is the motivation

[46:33 - 46:36]
behind parameter efficient fine-tuning

[46:34 - 46:37]
which we'll talk about in a bit another

[46:36 - 46:39]
way to reduce the memory footprint is

[46:37 - 46:41]
through quantization converting a model

[46:39 - 46:43]
from a format with more bits to one with

[46:41 - 46:45]
fewer bits for a 13 billion parameter

[46:43 - 46:48]
model using 32-bit floating Point each

[46:45 - 46:51]
parameter requires 4 bytes resulting in

[46:48 - 46:54]
52 GB total so if you reduce each value

[46:51 - 46:57]
to 16 bits the memory needed drops to 26

[46:54 - 46:59]
GB inference is typically done using as

[46:57 - 47:01]
few bits as possible 16 eight or even

[46:59 - 47:03]
four bits training is more sensitive to

[47:01 - 47:05]
numerical Precision so it's usually done

[47:03 - 47:07]
in mixed Precision with some operations

[47:05 - 47:09]
in higher Precision like 32bit and

[47:07 - 47:12]
others in lower Precision like 16 or

[47:09 - 47:14]
8bit different numerical formats balance

[47:12 - 47:16]
range so the span of values that can be

[47:14 - 47:17]
represented and precision how exactly a

[47:16 - 47:19]
number can be represented there are a

[47:17 - 47:21]
few different formats reducing Precision

[47:19 - 47:23]
can cause values to change or result in

[47:21 - 47:25]
errors so it's important to load models

[47:23 - 47:27]
in their intended format for example

[47:25 - 47:29]
when llama 2 is released its weights

[47:27 - 47:32]
optimized for bf16 causing significantly

[47:29 - 47:34]
worse quality when loaded with fp16 now

[47:32 - 47:36]
let's talk about PFT in the early days

[47:34 - 47:38]
of smaller models full fine-tuning so

[47:36 - 47:40]
updating all the model parameters was

[47:38 - 47:41]
common this required a lot of

[47:40 - 47:44]
highquality annotated data and

[47:41 - 47:46]
substantial computational resources as

[47:44 - 47:48]
models grew people started using partial

[47:46 - 47:50]
fine tuning focusing on specific layers

[47:48 - 47:51]
like only the last layer this reduces

[47:50 - 47:53]
memory acquirements but it isn't very

[47:51 - 47:55]
parameter efficient parameter efficient

[47:53 - 47:57]
fine-tuning techniques insert additional

[47:55 - 47:59]
parameters into strategic IC locations

[47:57 - 48:01]
in the model to achieve strong

[47:59 - 48:03]
fine-tuning performance with a small

[48:01 - 48:04]
number of trainable parameters while

[48:03 - 48:07]
this can increase inference latency

[48:04 - 48:09]
slightly as adapters add computational

[48:07 - 48:11]
steps PFT methods are generally not only

[48:09 - 48:13]
parameter efficient but also sample

[48:11 - 48:14]
efficient they can work with just a few

[48:13 - 48:16]
thousand examples compared to the

[48:14 - 48:18]
millions potentially needed for full

[48:16 - 48:20]
fine-tuning PFT methods fall into two

[48:18 - 48:22]
categories so we have adapter-based

[48:20 - 48:24]
methods this is also called additive

[48:22 - 48:26]
methods that add new model weights and

[48:24 - 48:28]
then we have soft prompt based methods

[48:26 - 48:31]
that introduce special trainable tokens

[48:28 - 48:33]
the most popular adapter-based method is

[48:31 - 48:35]
Laura low rank adaptation unlike

[48:33 - 48:37]
traditional adapters Laura incorporates

[48:35 - 48:39]
additional parameters without increasing

[48:37 - 48:41]
inference latency instead of adding new

[48:39 - 48:43]
layers Laura uses modules that can be

[48:41 - 48:45]
merged back into the original layers

[48:43 - 48:46]
Laura works by decomposing weight

[48:45 - 48:48]
matrices into products of smaller

[48:46 - 48:50]
matrices then updating only these

[48:48 - 48:52]
smaller matrices for a weight Matrix

[48:50 - 48:55]
with Dimensions n by m Laura first

[48:52 - 48:57]
chooses a smaller Dimension R the rank

[48:55 - 49:00]
then creates two matrices a which is n

[48:57 - 49:02]
by R and B which is R by m during

[49:00 - 49:04]
fine-tuning only A and B are updated

[49:02 - 49:06]
while the original weights remain Frozen

[49:04 - 49:07]
for inference A and B can be multiplied

[49:06 - 49:09]
together and added to the original

[49:07 - 49:10]
weights the efficiency of Laura depends

[49:09 - 49:13]
both on the chosen Rank and which

[49:10 - 49:14]
matrices it's applied to it's primarily

[49:13 - 49:15]
used for Transformer modules in the

[49:14 - 49:18]
attention modules if you want to

[49:15 - 49:20]
fine-tune a model for multiple tasks you

[49:18 - 49:22]
have several options first simultaneous

[49:20 - 49:24]
fine-tuning training on a data set with

[49:22 - 49:26]
examples from all tasks at once this is

[49:24 - 49:27]
harder and requires more data or you

[49:26 - 49:30]
could do sequen fine tuning where you

[49:27 - 49:31]
first train on task a and then on task B

[49:30 - 49:33]
but this can cause catastrophic

[49:31 - 49:35]
forgetting where the model loses its

[49:33 - 49:38]
ability on earlier tasks or you can try

[49:35 - 49:39]
model merging so there you fine-tune

[49:38 - 49:41]
different tasks separately then combine

[49:39 - 49:43]
the resulting models model merging

[49:41 - 49:45]
offers greater flexibility than fine

[49:43 - 49:46]
tuning alone if you have two models that

[49:45 - 49:48]
excel at different aspects of the same

[49:46 - 49:50]
task you can merge them into a single

[49:48 - 49:52]
model that outperforms both this

[49:50 - 49:54]
approach can be done without gpus it can

[49:52 - 49:55]
improve performance while reducing the

[49:54 - 49:58]
memory footprint it's an excellent

[49:55 - 49:59]
option for on deployment and it can

[49:58 - 50:01]
facilitate Federated learning where

[49:59 - 50:03]
multiple devices train using separate

[50:01 - 50:05]
data unlike ensembling which combines

[50:03 - 50:07]
the outputs of multiple models merging

[50:05 - 50:09]
combines the models themselves this

[50:07 - 50:10]
improves performance without the higher

[50:09 - 50:12]
inference cost of running multiple

[50:10 - 50:14]
models several merging approaches exist

[50:12 - 50:16]
so we have summing where we just add the

[50:14 - 50:17]
weight values of the constituent models

[50:16 - 50:19]
together this is the most common we

[50:17 - 50:20]
could have layer stacking so we take

[50:19 - 50:22]
different layers from different models

[50:20 - 50:24]
and stack them this is also called

[50:22 - 50:26]
Franken merging or concatenation where

[50:24 - 50:27]
we just combine the parameters this is

[50:26 - 50:28]
less recommended because it doesn't

[50:27 - 50:30]
reduce memory compared to separate

[50:28 - 50:32]
models so here's a practical fine-tuning

[50:30 - 50:34]
approach and what a typical development

[50:32 - 50:36]
path might look like first test your

[50:34 - 50:37]
fine-tuning code using the cheapest

[50:36 - 50:39]
fastest model you have and ensure it

[50:37 - 50:41]
works then test your data by fine-tuning

[50:39 - 50:43]
a midsize model if training loss doesn't

[50:41 - 50:45]
decrease with more data something might

[50:43 - 50:47]
be wrong after that run experiments with

[50:45 - 50:49]
your Target Model to see how far you can

[50:47 - 50:50]
push performance and then map the price

[50:49 - 50:52]
performance Frontier and select the

[50:50 - 50:54]
model that makes the most sense for your

[50:52 - 50:56]
use case alternatively a distillation

[50:54 - 50:58]
path looks like this start with a small

[50:56 - 51:00]
data set and the strongest model you can

[50:58 - 51:02]
afford then train the best possible

[51:00 - 51:04]
model with this small data set use this

[51:02 - 51:06]
fine-tune model to generate more

[51:04 - 51:08]
training data use the expanded data set

[51:06 - 51:09]
to train a cheaper model when choosing

[51:08 - 51:11]
fine-tuning methods here are some things

[51:09 - 51:13]
to consider so for beginners start with

[51:11 - 51:15]
adapter techniques like Laura before

[51:13 - 51:17]
attempting full fine tuning understand

[51:15 - 51:19]
that data volume matters full fine

[51:17 - 51:21]
tuning typically requires thousands to

[51:19 - 51:22]
millions of examples while PFT can work

[51:21 - 51:24]
with hundreds also you'll need to know

[51:22 - 51:26]
how many fine tune models you need

[51:24 - 51:27]
adapter methods let you serve multiple

[51:26 - 51:29]
variants that share a base model there

[51:27 - 51:31]
are also some key hyper parameters that

[51:29 - 51:33]
you should know these ones in particular

[51:31 - 51:34]
significantly impact fine-tuning results

[51:33 - 51:35]
so we have the learning rate just like

[51:34 - 51:37]
in machine learning if the loss curve

[51:35 - 51:39]
fluctuates the learning rate is likely

[51:37 - 51:41]
too high if it's stable but decreases

[51:39 - 51:43]
very slowly the rate's probably too low

[51:41 - 51:45]
generally start larger and decrease over

[51:43 - 51:47]
time we also have batch size larger

[51:45 - 51:49]
batches process training examples faster

[51:47 - 51:51]
but require more memory small batches

[51:49 - 51:52]
lead to more unstable training so to

[51:51 - 51:54]
address instability you can accumulate

[51:52 - 51:56]
gradiance across several batches we also

[51:54 - 51:58]
need to think about the number of epoch

[51:56 - 52:00]
smaller data sets typically need more

[51:58 - 52:03]
epochs than larger ones for millions of

[52:00 - 52:05]
examples one to two Epoch might suffice

[52:03 - 52:07]
for thousands of examples 4 to 10 may be

[52:05 - 52:09]
needed reduce Epoch if you see

[52:07 - 52:11]
overfitting we also have prompt loss

[52:09 - 52:12]
weight for instruction fine-tuning this

[52:11 - 52:14]
determines how much prompts should

[52:12 - 52:16]
contribute to the loss compared to the

[52:14 - 52:18]
responses if it's set to 100% prompts

[52:16 - 52:21]
and responses contribute equally if it's

[52:18 - 52:23]
0% the model learns only from responses

[52:21 - 52:24]
the default is typically 10% while the

[52:23 - 52:25]
technical process of fine-tuning has

[52:24 - 52:27]
been simplified by Frameworks that

[52:25 - 52:29]
handle the training process and suggest

[52:27 - 52:31]
sensible defaults the Strategic

[52:29 - 52:33]
decisions around fine-tuning remain

[52:31 - 52:35]
complex the key is knowing when to

[52:33 - 52:36]
fine-tune which technique to use and how

[52:35 - 52:38]
to balance the trade-offs between

[52:36 - 52:40]
performance resources and data

[52:38 - 52:41]
requirements While most companies can't

[52:40 - 52:43]
afford to train Foundation models from

[52:41 - 52:45]
scratch nearly all can differentiate

[52:43 - 52:47]
themselves through high quality data

[52:45 - 52:48]
sets for adaptation as the say goes

[52:47 - 52:50]
garbage in garbage out and nowhere is

[52:48 - 52:51]
this more true than in data set

[52:50 - 52:53]
engineering we're witnessing a shift

[52:51 - 52:55]
from model Centric to data Centric

[52:53 - 52:57]
approaches in AI development model

[52:55 - 52:58]
Centric AI tries to improve performance

[52:57 - 53:00]
by enhancing the models themselves so

[52:58 - 53:02]
designing new architectures increasing

[53:00 - 53:04]
model sizes or developing new training

[53:02 - 53:06]
techniques data Centric AI on the other

[53:04 - 53:07]
hand focuses on improving performance by

[53:06 - 53:09]
enhancing the data developing better

[53:07 - 53:10]
data processing techniques and creating

[53:09 - 53:12]
high quality data sets that allow

[53:10 - 53:14]
Superior models to be trained with fewer

[53:12 - 53:15]
resources for companies adapting

[53:14 - 53:17]
Foundation models rather than building

[53:15 - 53:19]
them from scratch the data Centric

[53:17 - 53:21]
approach offers the greatest competitive

[53:19 - 53:22]
Advantage the type of data you need

[53:21 - 53:24]
depends on your adaptation task for

[53:22 - 53:26]
self-supervised fine-tuning you need

[53:24 - 53:28]
sequences of relevant domain data for

[53:26 - 53:30]
instruction fine tuning you need data in

[53:28 - 53:31]
instruction response format for

[53:30 - 53:33]
preference fine tuning you need

[53:31 - 53:35]
instruction winning response losing

[53:33 - 53:37]
response format for reward modeling you

[53:35 - 53:38]
need either preference data or examples

[53:37 - 53:40]
with explicit scores your training data

[53:38 - 53:41]
should exhibit the behaviors you want

[53:40 - 53:43]
your model to learn this can be

[53:41 - 53:44]
particularly challenging for complex

[53:43 - 53:46]
behaviors like Chain of Thought

[53:44 - 53:47]
reasoning or tool use in agent workflows

[53:46 - 53:49]
When developing conversational

[53:47 - 53:50]
applications you need to consider

[53:49 - 53:53]
whether you require single turn data

[53:50 - 53:54]
multi-turn data or both single turn data

[53:53 - 53:56]
helps train a model to respond to

[53:54 - 53:57]
individual instructions while multi-turn

[53:56 - 53:59]
data data teaches the model how to solve

[53:57 - 54:01]
tasks through dialogue like clarifying

[53:59 - 54:03]
user intent before addressing the task

[54:01 - 54:04]
or incorporating Corrections a small

[54:03 - 54:06]
amount of high quality data can

[54:04 - 54:08]
outperform a large amount of noisy data

[54:06 - 54:10]
a principle confirmed by teams working

[54:08 - 54:11]
on models like llama 3 they found that

[54:10 - 54:13]
human generated data is often prone to

[54:11 - 54:16]
errors in inconsistencies particularly

[54:13 - 54:18]
for nuanced policies leading them to

[54:16 - 54:19]
develop AI assisted annotation tools to

[54:18 - 54:21]
ensure high quality which is interesting

[54:19 - 54:23]
to me but what makes data high quality

[54:21 - 54:25]
there are several factors to consider

[54:23 - 54:27]
first relevance the examples should be

[54:25 - 54:28]
relevant to your target task legal text

[54:27 - 54:30]
from the 19th century might not be

[54:28 - 54:31]
relevant for answering contemporary

[54:30 - 54:33]
legal questions you'll also need

[54:31 - 54:36]
alignment with task requirements if your

[54:33 - 54:38]
task focuses on factual consistency

[54:36 - 54:40]
annotations need to be factually correct

[54:38 - 54:41]
if it demands creativity annotations

[54:40 - 54:43]
should be creative we also need to think

[54:41 - 54:45]
about consistency annotations should be

[54:43 - 54:46]
consistent across examples and

[54:45 - 54:48]
annotators they need to be correctly

[54:46 - 54:50]
formatted so data should adhere to the

[54:48 - 54:52]
expected structure they need to be

[54:50 - 54:53]
sufficiently unique you want minimal

[54:52 - 54:55]
duplicates in your data set they need to

[54:53 - 54:57]
be compliant and follow internal and

[54:55 - 54:59]
external policies and you need coverage

[54:57 - 55:01]
your training data needs to cover the

[54:59 - 55:03]
range of possible problems you want to

[55:01 - 55:04]
solve requiring sufficient diversity

[55:03 - 55:06]
missing coverage in important areas will

[55:04 - 55:07]
result in poor performance for those

[55:06 - 55:09]
cases no matter how much data you have

[55:07 - 55:11]
overall but how much data do you need

[55:09 - 55:13]
asking how much data you need is kind of

[55:11 - 55:14]
like asking how much money you need the

[55:13 - 55:16]
answer varies widely depending on your

[55:14 - 55:18]
situation several factors influence data

[55:16 - 55:20]
requirements so if you're fine-tuning

[55:18 - 55:22]
then the fine-tuning technique matters

[55:20 - 55:23]
full fine tuning typically requires

[55:22 - 55:25]
orders of magnitude more data than

[55:23 - 55:27]
parameter efficient methods like Laura

[55:25 - 55:29]
with tens of thousands to millions of

[55:27 - 55:31]
examples full fine tuning might be

[55:29 - 55:33]
appropriate with just hundreds to a few

[55:31 - 55:35]
thousand examples PFT methods will

[55:33 - 55:37]
likely work better it also depends on

[55:35 - 55:39]
your task complexity a simple sentiment

[55:37 - 55:41]
classification task requires much less

[55:39 - 55:43]
data than complex question answering

[55:41 - 55:44]
about financial filings for example the

[55:43 - 55:46]
base model performance also makes a

[55:44 - 55:48]
difference so the closer the base model

[55:46 - 55:50]
is to your desired performance the fewer

[55:48 - 55:51]
examples you'll need larger more capable

[55:50 - 55:53]
base models generally require fewer

[55:51 - 55:55]
examples to fine-tune effectively open

[55:53 - 55:57]
ai's fine-tuning guide demonstrates that

[55:55 - 55:59]
with fewer examples around 100 more

[55:57 - 56:02]
advanced models give better fine-tuning

[55:59 - 56:05]
results however after fine-tuning on a

[56:02 - 56:07]
large data set around 550,000 examples

[56:05 - 56:09]
all models perform similarly regardless

[56:07 - 56:12]
of their initial capabilities so in

[56:09 - 56:14]
short with limited data use PFT methods

[56:12 - 56:16]
on more advanced models with abundant

[56:14 - 56:17]
data full fine tuning on smaller models

[56:16 - 56:19]
becomes viable before investing in a

[56:17 - 56:22]
large data set start with a small

[56:19 - 56:23]
well-crafted set of around 50 examples

[56:22 - 56:25]
to see if fine tuning improves your

[56:23 - 56:26]
model if you see clear improvements more

[56:25 - 56:28]
data will likely help further if you see

[56:26 - 56:30]
no improvement with a small data set a

[56:28 - 56:31]
larger one rarely solves the problem

[56:30 - 56:33]
though be careful to rule out other

[56:31 - 56:35]
issues like poor hyperparameters or data

[56:33 - 56:37]
quality first in most cases you should

[56:35 - 56:40]
see improvements after fine-tuning with

[56:37 - 56:41]
just 50 to 100 examples you can also

[56:40 - 56:43]
reduce the amount of high quality data

[56:41 - 56:45]
you need by first fine-tuning on more

[56:43 - 56:47]
accessible data so One path might be

[56:45 - 56:49]
self-supervised to supervised first

[56:47 - 56:51]
fine-tune on domain specific documents

[56:49 - 56:53]
then on targeted question answer pairs

[56:51 - 56:55]
or less relevant to more relevant data

[56:53 - 56:57]
first fine tune on adjacent domains with

[56:55 - 56:59]
abundant data then on your specific

[56:57 - 57:02]
domain or synthetic to real data first

[56:59 - 57:04]
find- tune on AI generated examples then

[57:02 - 57:06]
on limited real examples experimenting

[57:04 - 57:09]
with subsets of your current data set so

[57:06 - 57:11]
maybe 25 50 and 100% can help estimate

[57:09 - 57:12]
how much more data you'll need a steep

[57:11 - 57:14]
performance gain with increasing data

[57:12 - 57:16]
set size suggests significant

[57:14 - 57:18]
improvement from doubling your data a

[57:16 - 57:19]
plateau indicates diminishing returns so

[57:18 - 57:21]
let's say you need more data how can you

[57:19 - 57:22]
get it if you don't have enough for your

[57:21 - 57:24]
use case if possible you'll want to

[57:22 - 57:26]
create a data flywheel that leverages

[57:24 - 57:28]
user interactions to continue ually

[57:26 - 57:30]
improve your product this offers a

[57:28 - 57:31]
significant competitive advantage or you

[57:30 - 57:33]
could also just check available data

[57:31 - 57:35]
sets you can often mix and match

[57:33 - 57:37]
different sources though all data must

[57:35 - 57:38]
be thoroughly verified for quality and

[57:37 - 57:40]
appropriate licensing when annotating

[57:38 - 57:42]
your own data the challenge isn't just

[57:40 - 57:44]
The annotation process but creating

[57:42 - 57:46]
clear guidelines you need to explicitly

[57:44 - 57:48]
Define what makes a good response can a

[57:46 - 57:51]
response be correct but unhelpful what

[57:48 - 57:52]
distinguishes a score of three versus 4

[57:51 - 57:55]
these guidelines are crucial both for

[57:52 - 57:56]
human and AI powered annotations trust

[57:55 - 57:58]
me one of the hard machine learning

[57:56 - 58:00]
problems I've ever had to solve was an

[57:58 - 58:02]
issue with human labelers data

[58:00 - 58:04]
augmentation creates new examples from

[58:02 - 58:05]
existing data which is another option so

[58:04 - 58:06]
you could do things like flipping an

[58:05 - 58:09]
image to create a new variant or you

[58:06 - 58:11]
could use data synthesis this generates

[58:09 - 58:12]
artificial data that mimics real data

[58:11 - 58:14]
properties like simulating Mouse

[58:12 - 58:16]
movements on a web page the key

[58:14 - 58:18]
difference between augmented data and

[58:16 - 58:20]
synthetic data is that augmented data is

[58:18 - 58:22]
derived from real data while synthetic

[58:20 - 58:23]
data is Created from scratch data

[58:22 - 58:25]
synthesis therefore is particularly

[58:23 - 58:27]
valuable for addressing privacy concerns

[58:25 - 58:29]
when working with sensitive information

[58:27 - 58:30]
together some combination of these

[58:29 - 58:32]
techniques should allow you to produce

[58:30 - 58:34]
data at scale increase coverage across

[58:32 - 58:36]
your problem space and possibly improve

[58:34 - 58:38]
quality with AI generated data since

[58:36 - 58:39]
humans aren't always great at creating

[58:38 - 58:41]
consistent data but of course make sure

[58:39 - 58:42]
to measure the quality of your AI

[58:41 - 58:44]
generated data just like you would for

[58:42 - 58:46]
human generated data once you have your

[58:44 - 58:48]
data you need to process it data

[58:46 - 58:50]
processing can be timec consuming but it

[58:48 - 58:52]
is critical for Quality here are some

[58:50 - 58:54]
best practices start with filtering

[58:52 - 58:56]
tasks and test scripts before big runs

[58:54 - 58:58]
avoid changing data in place so you want

[58:56 - 59:00]
to make sure to keep the originals

[58:58 - 59:02]
perform exploratory data analysis on

[59:00 - 59:04]
distributions and outliers examine

[59:02 - 59:06]
interannotator disagreement and resolve

[59:04 - 59:08]
conflicts fact check and manually

[59:06 - 59:10]
inspect examples D duplicate data to

[59:08 - 59:13]
prevent over representation clean

[59:10 - 59:14]
formatting tokens like HTML and markdown

[59:13 - 59:17]
which can improve performance and reduce

[59:14 - 59:19]
input size remove non-compliant data so

[59:17 - 59:20]
anything like pii toxic material or

[59:19 - 59:22]
copyrighted content filter out

[59:20 - 59:24]
lowquality data identified during

[59:22 - 59:26]
verification if you have more data than

[59:24 - 59:27]
your compute budget allows use active

[59:26 - 59:29]
learning to select the most helpful

[59:27 - 59:31]
examples and ensure data is in the right

[59:29 - 59:33]
format for your model using the

[59:31 - 59:35]
appropriate tokenizer and chat template

[59:33 - 59:36]
while all these steps require a lot of

[59:35 - 59:38]
effort they're essential for creating

[59:36 - 59:40]
data sets that will help your model to

[59:38 - 59:42]
shine in the competitive landscape of AI

[59:40 - 59:43]
applications well-engineered data sets

[59:42 - 59:45]
often make the difference between

[59:43 - 59:46]
mediocre and exceptional performance now

[59:45 - 59:48]
let's dive into one of the most

[59:46 - 59:50]
practical aspects of AI engineering

[59:48 - 59:52]
inference optimization after all a

[59:50 - 59:55]
model's real world usefulness boils down

[59:52 - 59:57]
to two crucial factors how much it costs

[59:55 - 59:59]
to run and how quick quickly it responds

[59:57 - 01:00:01]
these characteristics inference cost and

[59:59 - 01:00:02]
latency ultimately determine which

[01:00:01 - 01:00:04]
applications can practically use Ai and

[01:00:02 - 01:00:05]
at what scale let's start by

[01:00:04 - 01:00:07]
understanding what we mean by inference

[01:00:05 - 01:00:10]
in the AI life cycle there are two

[01:00:07 - 01:00:11]
distinct phases in an AI model's Journey

[01:00:10 - 01:00:13]
training and inference training builds

[01:00:11 - 01:00:15]
the model while inference uses the model

[01:00:13 - 01:00:17]
to compute outputs for given inputs in a

[01:00:15 - 01:00:18]
production environment the component

[01:00:17 - 01:00:20]
responsible for running the model

[01:00:18 - 01:00:22]
inference is called an inference server

[01:00:20 - 01:00:24]
This Server hosts available models

[01:00:22 - 01:00:27]
allocates Hardware resources to execute

[01:00:24 - 01:00:28]
them and returns responses to users the

[01:00:27 - 01:00:30]
inference server is part of a broader

[01:00:28 - 01:00:32]
inference service that also handles

[01:00:30 - 01:00:34]
receiving routing and pre-processing

[01:00:32 - 01:00:36]
requests so what does this mean for you

[01:00:34 - 01:00:37]
well if you're using a model API like

[01:00:36 - 01:00:39]
those from open aai or Google you're

[01:00:37 - 01:00:41]
essentially Outsourcing this inference

[01:00:39 - 01:00:43]
service but if you decide to host models

[01:00:41 - 01:00:45]
yourself you'll need to build optimize

[01:00:43 - 01:00:47]
and maintain your own inference

[01:00:45 - 01:00:48]
infrastructure to optimize inference we

[01:00:47 - 01:00:51]
first need to understand what's slowing

[01:00:48 - 01:00:53]
things down generally speaking AI

[01:00:51 - 01:00:55]
workloads face two types of bottlenecks

[01:00:53 - 01:00:56]
compute bound bottlenecks occur when the

[01:00:55 - 01:00:59]
limiting factor is the computational

[01:00:56 - 01:01:00]
power available tasks requiring

[01:00:59 - 01:01:02]
intensive calculations like image

[01:01:00 - 01:01:04]
generation are typically compute bound

[01:01:02 - 01:01:06]
memory bandwidth bound bottlenecks occur

[01:01:04 - 01:01:07]
when the limiting factor is how quickly

[01:01:06 - 01:01:09]
data can move between memory and

[01:01:07 - 01:01:11]
processors autor regressive language

[01:01:09 - 01:01:13]
model inference is typically memory

[01:01:11 - 01:01:14]
bandwidth bound profiling tools like

[01:01:13 - 01:01:16]
Nvidia Insight can help determine which

[01:01:14 - 01:01:18]
bottleneck affects your workload through

[01:01:16 - 01:01:19]
something called a roofline chart what's

[01:01:18 - 01:01:20]
important to understand is that

[01:01:19 - 01:01:22]
different optimization Techniques

[01:01:20 - 01:01:24]
address different bottlenecks a compute

[01:01:22 - 01:01:26]
bound workload might benefit from more

[01:01:24 - 01:01:27]
powerful chips or Distributing work

[01:01:26 - 01:01:29]
across multiple chips meanwhile a memory

[01:01:27 - 01:01:30]
bandwidth bound workload might see

[01:01:29 - 01:01:32]
better results from chips with higher

[01:01:30 - 01:01:33]
memory bandwidth now that we understand

[01:01:32 - 01:01:36]
bottlenecks let's look at how inference

[01:01:33 - 01:01:38]
is actually served many providers often

[01:01:36 - 01:01:40]
two distinct types of inference apis

[01:01:38 - 01:01:42]
each optimized for different use cases

[01:01:40 - 01:01:43]
online apis optimize for Laten see

[01:01:42 - 01:01:46]
processing requests as soon as they

[01:01:43 - 01:01:48]
arrive chatbots typically use online

[01:01:46 - 01:01:50]
apis since users expect quick responses

[01:01:48 - 01:01:52]
batch apis on the other hand optimize

[01:01:50 - 01:01:53]
for cost processing multiple requests

[01:01:52 - 01:01:55]
together more efficiently but with

[01:01:53 - 01:01:56]
higher latency applications without

[01:01:55 - 01:01:58]
strict resp response time requirements

[01:01:56 - 01:02:00]
like periodic report generation or

[01:01:58 - 01:02:02]
synthetic data creation can benefit from

[01:02:00 - 01:02:04]
batch processing the key is matching

[01:02:02 - 01:02:06]
your inference type to your applications

[01:02:04 - 01:02:07]
needs so now how do we measure if our

[01:02:06 - 01:02:10]
inference is performing well that brings

[01:02:07 - 01:02:12]
us to our next section here are some key

[01:02:10 - 01:02:13]
inference performance metrics to

[01:02:12 - 01:02:15]
optimize effectively we need to know

[01:02:13 - 01:02:17]
what we're measuring several metrics

[01:02:15 - 01:02:18]
help us evaluate inference performance

[01:02:17 - 01:02:20]
the first and perhaps most notable

[01:02:18 - 01:02:22]
metric is latency the time from when

[01:02:20 - 01:02:24]
users send a query until they receive a

[01:02:22 - 01:02:26]
complete response for autor regressive

[01:02:24 - 01:02:28]
models like llms latency break down into

[01:02:26 - 01:02:31]
two components so we have the time to

[01:02:28 - 01:02:33]
First token ttft which is how quickly

[01:02:31 - 01:02:35]
the first token is generated after

[01:02:33 - 01:02:38]
receiving a query and then we have time

[01:02:35 - 01:02:41]
per output token tpot toot how long it

[01:02:38 - 01:02:44]
takes to generate each subsequent token

[01:02:41 - 01:02:46]
the total latency then equals ttft plus

[01:02:44 - 01:02:48]
toot time the number of output tokens

[01:02:46 - 01:02:51]
some teams also measure time to publish

[01:02:48 - 01:02:53]
TTP because the first generated token

[01:02:51 - 01:02:54]
isn't always immediately shown to users

[01:02:53 - 01:02:55]
especially when the model first

[01:02:54 - 01:02:57]
generates a plan or uses Chain of

[01:02:55 - 01:02:59]
Thought reasoning one important note

[01:02:57 - 01:03:01]
about latency since it varies across

[01:02:59 - 01:03:02]
requests looking at percentiles gives

[01:03:01 - 01:03:05]
you much more meaningful information

[01:03:02 - 01:03:07]
than simple averages Beyond latency we

[01:03:05 - 01:03:08]
also care about throughput which is the

[01:03:07 - 01:03:10]
number of output tokens per second an

[01:03:08 - 01:03:12]
inference service can generate across

[01:03:10 - 01:03:14]
all requests higher throughput typically

[01:03:12 - 01:03:16]
means lower cost which is why optimizing

[01:03:14 - 01:03:17]
for it matters for production systems

[01:03:16 - 01:03:19]
it's worth mentioning that most AI

[01:03:17 - 01:03:20]
applications face a fundamental latency

[01:03:19 - 01:03:22]
throughput tradeoff techniques like

[01:03:20 - 01:03:24]
batching can improve through put but may

[01:03:22 - 01:03:25]
increase latency for individual requests

[01:03:24 - 01:03:27]
your optimization strategy needs to

[01:03:25 - 01:03:29]
balance these competing priorities based

[01:03:27 - 01:03:31]
on your specific application needs

[01:03:29 - 01:03:33]
finally utilization metrics tell us how

[01:03:31 - 01:03:35]
efficiently we're using our resources we

[01:03:33 - 01:03:36]
have model flops per second utilization

[01:03:35 - 01:03:38]
which is the ratio of observed

[01:03:36 - 01:03:40]
throughput relative to the theoretical

[01:03:38 - 01:03:42]
maximum at Peak computing power model

[01:03:40 - 01:03:44]
bandwidth utilization which measures the

[01:03:42 - 01:03:45]
percentage of available memory bandwidth

[01:03:44 - 01:03:46]
being used now that we know what to

[01:03:45 - 01:03:48]
measure let's look at the hardware that

[01:03:46 - 01:03:50]
powers inference at the heart of

[01:03:48 - 01:03:52]
inference performance is specialized

[01:03:50 - 01:03:53]
Hardware an accelerator is a chip

[01:03:52 - 01:03:55]
designed to speed up specific types of

[01:03:53 - 01:03:58]
computation for AI workloads the

[01:03:55 - 01:03:59]
dominant accelerators are gpus those

[01:03:58 - 01:04:01]
specialized AI chips are growing in

[01:03:59 - 01:04:03]
popularity you might be wondering about

[01:04:01 - 01:04:05]
the difference between CPUs and gpus it

[01:04:03 - 01:04:07]
comes down to their architecture CPUs

[01:04:05 - 01:04:09]
have a few powerful cores typically up

[01:04:07 - 01:04:11]
to 64 for high-end machines which are

[01:04:09 - 01:04:13]
optimized for general purpose Computing

[01:04:11 - 01:04:15]
gpus on the other hand have thousands of

[01:04:13 - 01:04:17]
smaller cores optimized for parallel

[01:04:15 - 01:04:19]
processing this makes them ideal for

[01:04:17 - 01:04:21]
matrix multiplication operations that

[01:04:19 - 01:04:22]
dominate ml workloads interestingly

[01:04:21 - 01:04:24]
training and inference have different

[01:04:22 - 01:04:26]
Hardware requirements training demands

[01:04:24 - 01:04:28]
more memory due to back prop and is

[01:04:26 - 01:04:29]
generally more difficult to perform and

[01:04:28 - 01:04:31]
lower Precision inference often

[01:04:29 - 01:04:32]
emphasizes latency over throughput since

[01:04:31 - 01:04:34]
users are typically waiting for

[01:04:32 - 01:04:37]
responses when evaluating hardware for

[01:04:34 - 01:04:38]
inference consider three key questions

[01:04:37 - 01:04:40]
can it run your workloads how long does

[01:04:38 - 01:04:42]
it take to do so and how much does it

[01:04:40 - 01:04:44]
cost the specific Hardware

[01:04:42 - 01:04:46]
specifications to focus on include flops

[01:04:44 - 01:04:48]
computing power memory size and memory

[01:04:46 - 01:04:50]
bandwidth for compute bound workloads

[01:04:48 - 01:04:52]
prioritize chips with more flops for

[01:04:50 - 01:04:53]
memory bound workloads focus on higher

[01:04:52 - 01:04:55]
bandwidth and more memory with the

[01:04:53 - 01:04:56]
hardware foundations covered let's move

[01:04:55 - 01:04:58]
on to techniques for optimizing at the

[01:04:56 - 01:05:00]
model level now we're getting into the

[01:04:58 - 01:05:01]
real tactics for speeding up inference

[01:05:00 - 01:05:03]
let's start with model level

[01:05:01 - 01:05:05]
optimizations techniques that make the

[01:05:03 - 01:05:07]
models themselves more efficient model

[01:05:05 - 01:05:09]
compression reduces a model's size

[01:05:07 - 01:05:11]
potentially making it faster there are

[01:05:09 - 01:05:12]
several approaches here quantization

[01:05:11 - 01:05:15]
which we already discussed reduces

[01:05:12 - 01:05:16]
numerical Precision pruning removes less

[01:05:15 - 01:05:18]
important parameters or sets them to

[01:05:16 - 01:05:20]
zero and distillation which we also

[01:05:18 - 01:05:22]
already discussed trains a smaller model

[01:05:20 - 01:05:24]
to mimic a larger one among these

[01:05:22 - 01:05:25]
options weight only quantization is by

[01:05:24 - 01:05:27]
far the most popular because it's

[01:05:25 - 01:05:28]
relatively easy to implement works well

[01:05:27 - 01:05:30]
for many models out of the box and

[01:05:28 - 01:05:31]
delivers significant benefits without

[01:05:30 - 01:05:33]
that much effort another challenge

[01:05:31 - 01:05:34]
specific to language models is their

[01:05:33 - 01:05:37]
autor regressive nature they generate

[01:05:34 - 01:05:38]
text one token at a time which creates a

[01:05:37 - 01:05:40]
sequential bottleneck several Techniques

[01:05:38 - 01:05:42]
address this limitation speculative

[01:05:40 - 01:05:45]
decoding uses a faster but less powerful

[01:05:42 - 01:05:47]
model to generate candidate tokens which

[01:05:45 - 01:05:48]
are then verified by the Target Model

[01:05:47 - 01:05:50]
it's like having an assistant draft

[01:05:48 - 01:05:52]
responses and a manager quickly review

[01:05:50 - 01:05:53]
and approve inference with reference

[01:05:52 - 01:05:55]
copies tokens from the input when

[01:05:53 - 01:05:56]
appropriate for example when answering

[01:05:55 - 01:05:58]
questions about about a document rather

[01:05:56 - 01:06:00]
than generating them from scratch this

[01:05:58 - 01:06:02]
can significantly speed up responses for

[01:06:00 - 01:06:04]
document-based queries parallel decoding

[01:06:02 - 01:06:06]
aims to generate multiple tokens

[01:06:04 - 01:06:08]
simultaneously breaking the sequential

[01:06:06 - 01:06:09]
constraint additionally attention

[01:06:08 - 01:06:11]
mechanism optimization improves the

[01:06:09 - 01:06:13]
efficiency of Transformer models

[01:06:11 - 01:06:15]
attention calculations which can be

[01:06:13 - 01:06:17]
particularly memory intensive at an even

[01:06:15 - 01:06:19]
lower level kernels and compilers

[01:06:17 - 01:06:21]
optimize how models run on specific

[01:06:19 - 01:06:23]
Hardware kernels are specialized code

[01:06:21 - 01:06:25]
optimized for Hardware accelerators

[01:06:23 - 01:06:27]
common optimization techniques include

[01:06:25 - 01:06:29]
vectorization a parallelization loop

[01:06:27 - 01:06:31]
tiling and operator Fusion compilers

[01:06:29 - 01:06:33]
Bridge machine learning models and

[01:06:31 - 01:06:34]
Hardware converting model operations

[01:06:33 - 01:06:36]
into optimized code for specific

[01:06:34 - 01:06:38]
accelerators but optimization doesn't

[01:06:36 - 01:06:40]
stop at the model level let's look at

[01:06:38 - 01:06:42]
how we can optimize the entire inference

[01:06:40 - 01:06:43]
service we can achieve significant

[01:06:42 - 01:06:45]
performance gains by efficiently

[01:06:43 - 01:06:46]
managing resources across an entire

[01:06:45 - 01:06:48]
inference service one of the most

[01:06:46 - 01:06:50]
powerful techniques is batching which

[01:06:48 - 01:06:52]
combines multiple requests process

[01:06:50 - 01:06:53]
together batching can be implemented in

[01:06:52 - 01:06:55]
different ways so we have static

[01:06:53 - 01:06:58]
batching which groups a fixed number of

[01:06:55 - 01:06:59]
inputs but all requests must wait until

[01:06:58 - 01:07:01]
the batch is full this is simple but can

[01:06:59 - 01:07:03]
lead to inconsistent latency Dynamic

[01:07:01 - 01:07:05]
batching sets a maximum time window

[01:07:03 - 01:07:07]
processing the batch when either it's

[01:07:05 - 01:07:09]
full or the time limit has been reached

[01:07:07 - 01:07:11]
this provides more consistent latency

[01:07:09 - 01:07:13]
guarantees finally we have continuous

[01:07:11 - 01:07:14]
batching which allows responses to be

[01:07:13 - 01:07:16]
returned as soon as they're completed

[01:07:14 - 01:07:18]
with new requests added to maintain

[01:07:16 - 01:07:20]
batch size this provides the best user

[01:07:18 - 01:07:22]
experience but is more complex to

[01:07:20 - 01:07:24]
implement another powerful technique is

[01:07:22 - 01:07:25]
decoupled prefill and decode which

[01:07:24 - 01:07:27]
separates these two phases of of llm

[01:07:25 - 01:07:29]
inference since they have different

[01:07:27 - 01:07:30]
computational needs handling them

[01:07:29 - 01:07:32]
separately prevents resource competition

[01:07:30 - 01:07:34]
and improves overall efficiency for

[01:07:32 - 01:07:36]
applications with repetitive patterns

[01:07:34 - 01:07:38]
prompt caching stores overlapping text

[01:07:36 - 01:07:39]
segments like system prompts or

[01:07:38 - 01:07:41]
reference documents to avoid

[01:07:39 - 01:07:43]
reprocessing them with each query this

[01:07:41 - 01:07:44]
is particularly valuable for

[01:07:43 - 01:07:46]
applications with long conversations or

[01:07:44 - 01:07:48]
multiple queries about the same document

[01:07:46 - 01:07:50]
as models grow larger a single machine

[01:07:48 - 01:07:52]
may not be sufficient this is where

[01:07:50 - 01:07:54]
parallelism comes in distributing work

[01:07:52 - 01:07:56]
across multiple machines replica

[01:07:54 - 01:07:57]
parallelism creates m multiple copies of

[01:07:56 - 01:07:59]
the model each handling different

[01:07:57 - 01:08:00]
requests this is the simplest approach

[01:07:59 - 01:08:02]
and works well for high throughput

[01:08:00 - 01:08:04]
scenarios model parallelism splits a

[01:08:02 - 01:08:06]
single model across machines either

[01:08:04 - 01:08:08]
through tensor parallelism which is

[01:08:06 - 01:08:10]
breaking operations into smaller pieces

[01:08:08 - 01:08:12]
pipeline parallelism dividing the model

[01:08:10 - 01:08:14]
into sequential stages context

[01:08:12 - 01:08:17]
parallelism splitting input sequences

[01:08:14 - 01:08:18]
across devices or sequence parallelism

[01:08:17 - 01:08:20]
splitting different operations across

[01:08:18 - 01:08:22]
machines so what technique should you

[01:08:20 - 01:08:23]
implement we just talked about a lot the

[01:08:22 - 01:08:25]
optimal combination depends on your

[01:08:23 - 01:08:26]
specific workloads and performance

[01:08:25 - 01:08:28]
requir ments for applications

[01:08:26 - 01:08:30]
prioritizing low latency replica

[01:08:28 - 01:08:32]
parallelism may be best despite higher

[01:08:30 - 01:08:34]
costs for most use cases the most

[01:08:32 - 01:08:36]
impactful techniques are typically

[01:08:34 - 01:08:38]
quantization tensor parallelism replica

[01:08:36 - 01:08:40]
parallelism and attention mechanism

[01:08:38 - 01:08:42]
optimization by thoughtfully applying

[01:08:40 - 01:08:43]
these techniques you can dramatically

[01:08:42 - 01:08:45]
improve both the speed and cost

[01:08:43 - 01:08:46]
effectiveness of your AI applications

[01:08:45 - 01:08:48]
making them more responsive to users

[01:08:46 - 01:08:50]
while keeping your infrastructure cost

[01:08:48 - 01:08:52]
manageable in our next and final section

[01:08:50 - 01:08:53]
we'll see how all these components come

[01:08:52 - 01:08:55]
together in a complete AI application

[01:08:53 - 01:08:57]
architecture and how user your feedback

[01:08:55 - 01:08:59]
creates a virtuous cycle of continuous

[01:08:57 - 01:09:00]
Improvement now that we've explored all

[01:08:59 - 01:09:02]
the individual components of AI

[01:09:00 - 01:09:04]
engineering it's time to pull everything

[01:09:02 - 01:09:05]
together let's see how these pieces fit

[01:09:04 - 01:09:07]
into a complete architecture and how

[01:09:05 - 01:09:09]
user feedback creates a powerful Loop

[01:09:07 - 01:09:10]
that helps these systems improve over

[01:09:09 - 01:09:12]
time the simplest AI application

[01:09:10 - 01:09:14]
architecture looks like this your

[01:09:12 - 01:09:15]
application receives a query sends it to

[01:09:14 - 01:09:18]
a model either through a third party API

[01:09:15 - 01:09:19]
or self-hosted model and Returns the

[01:09:18 - 01:09:21]
response to the user no Bells no

[01:09:19 - 01:09:23]
whistles just direct input and output

[01:09:21 - 01:09:25]
but real world applications rarely stay

[01:09:23 - 01:09:27]
this simple let's walk through how these

[01:09:25 - 01:09:29]
architectures typically evolve as your

[01:09:27 - 01:09:31]
needs grow more sophisticated the first

[01:09:29 - 01:09:33]
enhancement most applications need is

[01:09:31 - 01:09:35]
better context construction giving the

[01:09:33 - 01:09:37]
model access to information required to

[01:09:35 - 01:09:38]
process useful outputs this is

[01:09:37 - 01:09:41]
essentially feature engineering for

[01:09:38 - 01:09:42]
foundation models so you might add rag

[01:09:41 - 01:09:44]
systems to search and retrieve

[01:09:42 - 01:09:45]
information from your knowledge base

[01:09:44 - 01:09:48]
agent capabilities to gather information

[01:09:45 - 01:09:49]
from external tools document uploading

[01:09:48 - 01:09:51]
functionality to analyze specific

[01:09:49 - 01:09:53]
content or more these additions ensure

[01:09:51 - 01:09:55]
the model has the necessary context to

[01:09:53 - 01:09:58]
provide accurate relevant responses step

[01:09:55 - 01:09:59]
two add guard rails for protection as

[01:09:58 - 01:10:01]
your application grows in capability

[01:09:59 - 01:10:03]
you'll need guard rails to protect both

[01:10:01 - 01:10:04]
your system and your users input guard

[01:10:03 - 01:10:07]
rails protect against leaking private

[01:10:04 - 01:10:08]
information to external apis and

[01:10:07 - 01:10:10]
malicious prompts that could compromise

[01:10:08 - 01:10:12]
your system output guard rails catch

[01:10:10 - 01:10:14]
different types of failures quality

[01:10:12 - 01:10:16]
failures like empty responses incorrect

[01:10:14 - 01:10:18]
formatting or factually incorrect

[01:10:16 - 01:10:20]
content or security failures like toxic

[01:10:18 - 01:10:22]
content pii exposure or unauthorized

[01:10:20 - 01:10:24]
actions the key again is balancing

[01:10:22 - 01:10:25]
protection with user experience overly

[01:10:24 - 01:10:27]
restrictive guardrails create

[01:10:25 - 01:10:29]
frustrating experiences while inadequate

[01:10:27 - 01:10:31]
ones could leave you vulnerable stage

[01:10:29 - 01:10:33]
three Implement model routing and

[01:10:31 - 01:10:35]
gateways as your application matures you

[01:10:33 - 01:10:37]
may discover that one model doesn't fit

[01:10:35 - 01:10:39]
all your needs different queries require

[01:10:37 - 01:10:41]
different approaches and this is where

[01:10:39 - 01:10:42]
model routing comes into play a model

[01:10:41 - 01:10:44]
router typically includes an intent

[01:10:42 - 01:10:46]
classifier that predicts what the user

[01:10:44 - 01:10:47]
is trying to do and then directs the

[01:10:46 - 01:10:49]
query to the appropriate model or

[01:10:47 - 01:10:51]
pipeline these routers should be fast

[01:10:49 - 01:10:52]
and inexpensive so you can use multiple

[01:10:51 - 01:10:54]
of them without adding significant

[01:10:52 - 01:10:57]
latency or cost along with routing

[01:10:54 - 01:10:59]
you'll need a model Gateway this is an

[01:10:57 - 01:11:01]
intermediate layer that provides a

[01:10:59 - 01:11:03]
unified interface to different models

[01:11:01 - 01:11:05]
both self-hosted and Commercial access

[01:11:03 - 01:11:07]
control and cost management fallback

[01:11:05 - 01:11:09]
policies to handle rate limits or API

[01:11:07 - 01:11:11]
failures and load balancing logging and

[01:11:09 - 01:11:13]
analytics the Gateway approach makes

[01:11:11 - 01:11:15]
your codebase much more maintainable if

[01:11:13 - 01:11:17]
a model API changes you only need to

[01:11:15 - 01:11:19]
update the Gateway not every application

[01:11:17 - 01:11:21]
that uses it it's a classic example of

[01:11:19 - 01:11:23]
separations of concerns in software

[01:11:21 - 01:11:25]
engineering next stage four optimize

[01:11:23 - 01:11:27]
with caching as your user based grow

[01:11:25 - 01:11:29]
performance and cost optimization become

[01:11:27 - 01:11:30]
increasingly important this is where

[01:11:29 - 01:11:32]
caching enters the picture inference

[01:11:30 - 01:11:34]
caching includes techniques like KV

[01:11:32 - 01:11:36]
caching to optimize the attention

[01:11:34 - 01:11:38]
mechanism and prompt caching to avoid

[01:11:36 - 01:11:40]
reprocessing identical prompt components

[01:11:38 - 01:11:41]
caching is particularly valuable for

[01:11:40 - 01:11:43]
multi-step processes like Chain of

[01:11:41 - 01:11:44]
Thought reasoning or queries requiring

[01:11:43 - 01:11:46]
timec consuming actions like retrieval

[01:11:44 - 01:11:48]
or web searches for implementation your

[01:11:46 - 01:11:50]
options range from in-memory storage

[01:11:48 - 01:11:52]
which is fast but has limited capacity

[01:11:50 - 01:11:54]
to databases like postgress SQL and

[01:11:52 - 01:11:57]
reddis you'll also need an eviction

[01:11:54 - 01:11:59]
policy like least recently used or least

[01:11:57 - 01:12:01]
frequently used to manage cache sizes as

[01:11:59 - 01:12:03]
you scale stage five add complex logic

[01:12:01 - 01:12:06]
and write actions this is the most

[01:12:03 - 01:12:08]
sophisticated AI applications go beyond

[01:12:06 - 01:12:10]
simple question answering to incorporate

[01:12:08 - 01:12:11]
complex multi-step reasoning flows

[01:12:10 - 01:12:13]
agentic patterns with loops and

[01:12:11 - 01:12:15]
decision-making and write actions that

[01:12:13 - 01:12:17]
make changes to the environment write

[01:12:15 - 01:12:19]
actions like sending emails placing

[01:12:17 - 01:12:21]
orders or initiating transfers

[01:12:19 - 01:12:22]
dramatically increase your system's

[01:12:21 - 01:12:24]
capabilities but also introduce

[01:12:22 - 01:12:25]
significant risks these should be

[01:12:24 - 01:12:27]
implemented with icient caution and

[01:12:25 - 01:12:29]
appropriate safeguards as your

[01:12:27 - 01:12:30]
architecture grows in complexity keeping

[01:12:29 - 01:12:32]
track of everything becomes increasingly

[01:12:30 - 01:12:34]
challenging this is where monitoring and

[01:12:32 - 01:12:36]
observability become critical while

[01:12:34 - 01:12:38]
related they serve slightly different

[01:12:36 - 01:12:39]
purposes monitoring tracks external

[01:12:38 - 01:12:41]
outputs to detect when something goes

[01:12:39 - 01:12:43]
wrong but doesn't necessarily help

[01:12:41 - 01:12:45]
identify the cause it's like knowing

[01:12:43 - 01:12:46]
your car broke down but not why

[01:12:45 - 01:12:48]
observability on the other hand ensures

[01:12:46 - 01:12:50]
that sufficient information about your

[01:12:48 - 01:12:51]
system's internal state is collected so

[01:12:50 - 01:12:53]
that when something goes wrong you can

[01:12:51 - 01:12:54]
diagnose the issue without deploying new

[01:12:53 - 01:12:56]
code it's like having sensors throughout

[01:12:54 - 01:12:58]
your car that can pinpoint exactly what

[01:12:56 - 01:13:00]
failed there are three key metrics that

[01:12:58 - 01:13:03]
can help you evaluate your observability

[01:13:00 - 01:13:06]
mttd or mean time to detection how long

[01:13:03 - 01:13:08]
it takes to detect an issue mttr

[01:13:06 - 01:13:10]
meantime to response and CFR change

[01:13:08 - 01:13:12]
failure rate which is the percentage of

[01:13:10 - 01:13:13]
deployments that result in failures each

[01:13:12 - 01:13:15]
component in your pipeline should have

[01:13:13 - 01:13:16]
its own metrics and you should

[01:13:15 - 01:13:18]
understand how these metrics correlate

[01:13:16 - 01:13:19]
to your business's Northstar metrics

[01:13:18 - 01:13:21]
remember the golden rule of

[01:13:19 - 01:13:23]
observability just log everything when

[01:13:21 - 01:13:25]
metrics indicate a problem detailed logs

[01:13:23 - 01:13:27]
help you identify exactly what went

[01:13:25 - 01:13:29]
wrong as your application evolves to

[01:13:27 - 01:13:31]
include multiple models data sources and

[01:13:29 - 01:13:32]
tools managing these interactions can

[01:13:31 - 01:13:34]
become increasingly complex this is

[01:13:32 - 01:13:36]
where an orchestrator becomes valuable

[01:13:34 - 01:13:38]
helping you specify how these components

[01:13:36 - 01:13:40]
work together AI orchestrator tools like

[01:13:38 - 01:13:42]
Lang chain llama index flow wise Lang

[01:13:40 - 01:13:45]
flow and hay stock help manage these

[01:13:42 - 01:13:46]
complex pipelines however it's often

[01:13:45 - 01:13:49]
wise to start building your application

[01:13:46 - 01:13:50]
without an orchestrator first to

[01:13:49 - 01:13:52]
understand the core mechanics before

[01:13:50 - 01:13:53]
adding another layer of abstraction now

[01:13:52 - 01:13:56]
let's talk about what might be the most

[01:13:53 - 01:13:57]
valuable asset in AI engineering user

[01:13:56 - 01:13:59]
feedback this feedback provides

[01:13:57 - 01:14:01]
proprietary data that can give you a

[01:13:59 - 01:14:02]
genuine competitive advantage while

[01:14:01 - 01:14:04]
everyone can access the same Foundation

[01:14:02 - 01:14:06]
models only you have access to how your

[01:14:04 - 01:14:09]
specific users interact with your system

[01:14:06 - 01:14:11]
user feedback comes in two main forms

[01:14:09 - 01:14:13]
explicit feedback is directly provided

[01:14:11 - 01:14:15]
by users this is things like Thumbs Up

[01:14:13 - 01:14:17]
and Down ratings star ratings or written

[01:14:15 - 01:14:18]
comments implicit feedback is inferred

[01:14:17 - 01:14:21]
from user Behavior this could be things

[01:14:18 - 01:14:23]
like early termination error Corrections

[01:14:21 - 01:14:25]
or question clarifications complaint

[01:14:23 - 01:14:27]
messages sentiment frequency of

[01:14:25 - 01:14:29]
regenerating responses and conversation

[01:14:27 - 01:14:31]
length when designing your feedback

[01:14:29 - 01:14:33]
systems consider carefully when to

[01:14:31 - 01:14:34]
request input you could ask for feedback

[01:14:33 - 01:14:35]
at the beginning of the experience like

[01:14:34 - 01:14:37]
like asking for skill level in a

[01:14:35 - 01:14:39]
language learning app or when something

[01:14:37 - 01:14:41]
unexpected happens like slow response

[01:14:39 - 01:14:42]
time or at natural decision points like

[01:14:41 - 01:14:45]
offering between two alternative

[01:14:42 - 01:14:46]
responses the goal is to gather valuable

[01:14:45 - 01:14:48]
insights without disrupting the user

[01:14:46 - 01:14:50]
experience remember that every request

[01:14:48 - 01:14:52]
for feedback creates friction so use

[01:14:50 - 01:14:53]
these opportunities wisely while we've

[01:14:52 - 01:14:56]
covered each component separately a

[01:14:53 - 01:14:58]
mature AI application integrates all

[01:14:56 - 01:15:00]
these elements into a cohesive system

[01:14:58 - 01:15:01]
the architecture you choose should align

[01:15:00 - 01:15:03]
with your specific use case technical

[01:15:01 - 01:15:04]
constraints and business objectives one

[01:15:03 - 01:15:06]
important thing to remember is that

[01:15:04 - 01:15:08]
complexity should serve a purpose only

[01:15:06 - 01:15:10]
add components that solve real problems

[01:15:08 - 01:15:12]
for your application sometimes a simpler

[01:15:10 - 01:15:14]
architecture with fewer moving Parts is

[01:15:12 - 01:15:15]
more reliable and easier to maintain

[01:15:14 - 01:15:17]
than a complex one with every Bell and

[01:15:15 - 01:15:19]
whistle the field of AI engineering is

[01:15:17 - 01:15:21]
still rapidly evolving with new

[01:15:19 - 01:15:23]
techniques and best practices emerging

[01:15:21 - 01:15:25]
daily the most successful AI Engineers

[01:15:23 - 01:15:26]
maintain flexibility in their

[01:15:25 - 01:15:28]
architecture allowing them to

[01:15:26 - 01:15:30]
incorporate new advances while providing

[01:15:28 - 01:15:31]
stable reliable experiences to their

[01:15:30 - 01:15:33]
users and that wraps up our journey

[01:15:31 - 01:15:35]
through AI engineering we've covered an

[01:15:33 - 01:15:36]
incredible amount of ground from

[01:15:35 - 01:15:38]
understanding Foundation models and

[01:15:36 - 01:15:40]
evaluation to mastering prompt

[01:15:38 - 01:15:42]
engineering rag agents fine-tuning data

[01:15:40 - 01:15:44]
set engineering and optimization

[01:15:42 - 01:15:46]
techniques of course this was a super

[01:15:44 - 01:15:48]
high Lev overview of a very detailed

[01:15:46 - 01:15:49]
book so I really recommend using this as

[01:15:48 - 01:15:51]
a starting point to check out the book

[01:15:49 - 01:15:52]
on your own I had a great time putting

[01:15:51 - 01:15:54]
this together and I plan to do more

[01:15:52 - 01:15:56]
videos covering technical content like

[01:15:54 - 01:15:57]
this in the future so let me know in the

[01:15:56 - 01:15:58]
comments which book you want me to

[01:15:57 - 01:15:59]
summarize next and don't forget to

[01:15:58 - 01:16:01]
subscribe so you don't miss it when the

[01:15:59 - 01:16:04]
next one comes out thanks so much for

[01:16:01 - 01:16:04]
watching and I'll see you next time

## コメント

### 1. @Gratitude.Driven (👍 193)
For those who are upset that I read a script for this video, my sincerest apologies that I cannot memorize 71 pages of notes from a technical book. 🙃

> **@orlandocastellanos9263** (👍 19): Wtf not need to explain or apologize good work thanks por the resume

> **@TheDarkSaberGod** (👍 10): Don’t even trip, this is about as through and high level of a summary for such a dense topic. 

You KILLED this and I’m only at 22:20

> **@JoeKme** (👍 5): My sincerest apologies for the dorks who will find *_something/anything_* to complain about.

> **@emreduygun** (👍 3): Done well 💪👌🙏👍, thank you

> **@HypnoGenX** (👍 3): Now now, don't sell yourself short. With enough dedication, you totally could've. Whether that kind of effort would've been WORTH it, though...  😉

### 2. @testme2026 (👍 26)
I don’t mind if you're reading from a script in fact i expect you to,  I actually appreciate the engagement. I already own this book, but I’m using your videos to help embed the content in my mind. Please continue doing this for all the top books,   your videos  are simply excellent. I am also thinking to put them on audio, i use this after reading the book.  all the best

### 3. @wertnerve (👍 4)
Your work is a Godsend, thank you for making your content! Outstanding work!

### 4. @Maxible (👍 5)
I bought the book and read it, but it's dense and there a ton of information. Your video is a great refesher, thank you!

### 5. @asaejapan7143 (👍 92)
This is the only book that has been repeatedly recommended on YouTube in the past 2 months by various YouTubers.

> **@pookiepats** (👍 0): @@asaejapan7143 this book and “sql for mere mortals” are incredibly supported amongst our peers.  Truly outstanding work.

> **@blackspitit** (👍 20): Maybe Orreilly is paying youtubers for that. This is a normal thing that companies do for marketing, nothing wrong with that, but it doesn't mean the book is any good.

> **@pookiepats** (👍 3): @ it is well written and information dense - it is in fact a good book, have a seat.

"err derr i was just pointing out..." whatever.

> **@blackspitit** (👍 0): @@pookiepats so O'Reilly is not paying anyone? You sure? 😊

> **@meassurendra** (👍 0): Paid promotion

### 6. @mcelroyian (👍 18)
I love that you promote gratitude in your channel. Also, I am learning a lot. Great job

### 7. @SpondonHaider (👍 22)
I really had to drop an appreciation for you here. Your pace, tone, everything is pretty clear and makes it easy to follow. I usually have problems wrapping my head around these sorts of videos, because of the pace or tone. Thank you for your refreshing style of content. I can see this channel booming! (Btw got my own copy of the book just a couple of days back, excited to dive into it)

> **@Lavendermc** (👍 0): I agree with this comment!! Thank you for making this content; it’s super fascinating and clear/approachable!!! Thank you!!! 🙏

### 8. @Jed_23_Blitzen (👍 7)
This was awesome. I listened to the whole thing. And as much as you did a great job of summarizing the book, it in fact encouraged me to go get the book for even more detail. I appreciate your video!

### 9. @Theguybieber (👍 4)
Thank you so much for creating this video.  I know this took considerable effort. Well done and thank you.

### 10. @harryarora6482 (👍 49)
It's the first time in my life that I want to slow down the speed of the video from the normal.

> **@philipgeorgiev** (👍 1): what i watch on 1.75 ???

### 11. @gary-s6t (👍 0)
Huch, so much compressed information. I wish I could overclock my brain to follow 😵‍💫… but I think I will just watch it twice and buy the book. Thanks, great Video!

### 12. @Souljacker7 (👍 4)
Thanks for the content, elvish-looking person (compliment)! Really appreciate it

### 13. @live4yourself_ (👍 1)
How you don't have 50k new subs from this video alone is wild. Greatly appreciate this free information.

### 14. @stuartross4540 (👍 4)
This is awesome! Very inspiring and gave me some great ideas. Thank you

### 15. @rajendraarya5564 (👍 16)
Finally gonna know what's inside this famous book! Thank you😍

### 16. @saulyarhi675 (👍 2)
This is seriously a great video. Thanks for your work, pattience and passion.

### 17. @CyberHAC100k (👍 1)
You are an amazing source of info! Subbed

### 18. @christopherhartline1863 (👍 0)
Thanks for the review. I'll be buying the book. One thing to consider - the fundamentals temain but the capabilities of the foundation models had increased SUBSTANTIALLY in the last eight months.

### 19. @SelfTaughtinTech (👍 2)
Excellent video, and fantastic job--love to see it! Subscribed 🍻

### 20. @kirilln289 (👍 1)
Really profound information straight on topic. I will need to slow down for my older brain though 😅😅😅 Thank you so much for taking your time for creating such a useful content ❤

