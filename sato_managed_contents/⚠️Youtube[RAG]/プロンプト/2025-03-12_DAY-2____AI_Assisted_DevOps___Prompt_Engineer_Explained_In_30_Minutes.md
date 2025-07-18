# DAY-2 |  AI Assisted DevOps | Prompt Engineer Explained In 30 Minutes

**チャンネル:** Abhishek.Veeramalla
**公開日:** 2025-03-11
**URL:** https://www.youtube.com/watch?v=jTW4QPE4ARc

## 説明

Udemy Course (End to End DevOps Project)
https://www.udemy.com/course/ultimate-devops-project-with-resume-preparation/?referralCode=9F588E43854814744430

Join us on Discord for Help(clearing doubts) while learning.
www.youtube.com/abhishekveeramalla/join

Telegram Channel : https://t.me/abhishekveeramalla

GitHub Repo for the course
https://github.com/iam-veeramalla/ai-assisted-devops

Free Course on the channel
==============================
- Free DevOps Playlist: https://www.youtube.com/playlist?list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa
- AWS Zero to Hero Playlist: https://www.youtube.com/playlist?list=PLdpzxOOAlwvLNOxX0RfndiYSt1Le9azze
- Azure Zero to Hero Playlist: https://www.youtube.com/playlist?list=PLdpzxOOAlwvIcxgCUyBHVOcWs0Krjx9xR
- Terraform Zero to Hero Playlist: https://www.youtube.com/playlist?list=PLdpzxOOAlwvI0O4PeKVV1-yJoX2AqIWuf
- Python for DevOps Playlist: https://www.youtube.com/playlist?list=PLdpzxOOAlwvKwTyYNJCUwGPvql0TrsPgv

About me:
========
Instagram: https://www.instagram.com/abhishekveeramalla_official/
Telegram Channel : https://t.me/abhishekveeramalla
LinkedIn: https://www.linkedin.com/in/abhishek-veeramalla
GitHub: https://github.com/iam-veeramalla
Medium: https://abhishekveeramalla-av.medium.com/

Disclaimer: Unauthorized copying, reproduction, or distribution of this video content, in whole or in part, is strictly prohibited. Any attempt to upload, share, or use this content for commercial or non-commercial purposes without explicit permission from the owner will be subject to legal action. All rights reserved.

## 字幕

[00:00 - 00:06]
hello everyone my name is abishek and

[00:03 - 00:10]
welcome back to my Channel today is

[00:06 - 00:14]
episode two of AI assisted devops Zero

[00:10 - 00:17]
to Hero series and in this episode we

[00:14 - 00:20]
will focus on prompt

[00:17 - 00:23]
engineering so prompt engineering is a

[00:20 - 00:27]
very important skill when it comes to

[00:23 - 00:31]
geni and it's also super simple that's

[00:27 - 00:36]
why in today's video we will start with

[00:31 - 00:39]
learning the fundamentals of prompt

[00:36 - 00:42]
engineering then we will learn various

[00:39 - 00:47]
prompt engineering techniques or types

[00:42 - 00:50]
such as zero short prompting few short

[00:47 - 00:52]
prompting multi-shot prompting and chain

[00:50 - 00:55]
of

[00:52 - 00:58]
thoughts out of Which F short prompting

[00:55 - 01:00]
is very popular it is highly recommended

[00:58 - 01:05]
as well that's why

[01:00 - 01:08]
in today's video I will also do a

[01:05 - 01:11]
demonstration of few short prompting

[01:08 - 01:14]
where I will show you how in real time

[01:11 - 01:18]
devops Engineers can make use of few

[01:14 - 01:22]
short prompting to get desired output

[01:18 - 01:25]
according to their organizational

[01:22 - 01:28]
requirements overall it's going to be a

[01:25 - 01:31]
very interesting session so make sure

[01:28 - 01:34]
you watch it till the

[01:31 - 01:38]
end let's get

[01:34 - 01:39]
started first things first what is

[01:38 - 01:42]
prompt

[01:39 - 01:46]
Engineering in a lay and

[01:42 - 01:50]
terminology let's say there is a AI

[01:46 - 01:56]
model maybe a large language

[01:50 - 01:59]
model so usually user provides

[01:56 - 02:02]
input to the large language model and

[01:59 - 02:05]
depending upon the input it generates

[02:02 - 02:09]
the output for

[02:05 - 02:13]
you now the input that is provided by

[02:09 - 02:17]
the user is called as

[02:13 - 02:18]
prompt and the way to enhance the

[02:17 - 02:23]
users's

[02:18 - 02:27]
input to let AI model generate the

[02:23 - 02:30]
desired output or the expected output is

[02:27 - 02:34]
called as prompt ins saring so prompt

[02:30 - 02:38]
engineering is a way of enhancing the

[02:34 - 02:42]
users prompt or writing better prompts

[02:38 - 02:46]
to let AI models generate output that is

[02:42 - 02:50]
expected let me show you with an

[02:46 - 02:54]
example let's go to chat gbt

[02:50 - 02:57]
and assume my requirement is to get a

[02:54 - 03:01]
kubernetes deployment manifest

[02:57 - 03:07]
deployment yl file so I'll just say

[03:01 - 03:10]
generate a kubernetes manifest for

[03:07 - 03:13]
deployment

[03:10 - 03:16]
resource I mean on the first side it

[03:13 - 03:19]
looks very good like the input looks to

[03:16 - 03:23]
be accurate let's try to give this input

[03:19 - 03:26]
or the prompt and let's see if chat GPT

[03:23 - 03:29]
responds with expected

[03:26 - 03:33]
output it's good that it provided the

[03:29 - 03:37]
deployment yaml file however if you

[03:33 - 03:38]
notice it provided this description

[03:37 - 03:41]
which is not something that I'm

[03:38 - 03:44]
interested it provided the explanation

[03:41 - 03:46]
again something that I'm not interested

[03:44 - 03:49]
steps to apply the Manifest check the

[03:46 - 03:52]
deployment status and a suggestion as

[03:49 - 03:57]
well which I am not at all interested

[03:52 - 04:00]
in so how do I make this output better

[03:57 - 04:02]
or something according to my requirement

[04:00 - 04:05]
so I should enhance the

[04:02 - 04:09]
prompt so I should basically write a

[04:05 - 04:12]
better prompt which I will do by

[04:09 - 04:14]
modifying the a character here and

[04:12 - 04:18]
replacing it with

[04:14 - 04:20]
only so generate only kubernetes

[04:18 - 04:22]
manifest for deployment resource let's

[04:20 - 04:26]
see if it

[04:22 - 04:28]
works perfect so I got the expected yaml

[04:26 - 04:30]
manifest so what is the simple technique

[04:28 - 04:35]
that I used here

[04:30 - 04:39]
I just made my prompt more specific by

[04:35 - 04:42]
replacing the a keyword a character and

[04:39 - 04:45]
placing only word so this is called as

[04:42 - 04:48]
direct prompt or zero shot prompting

[04:45 - 04:52]
where I try to be more

[04:48 - 04:54]
specific so this is a basic example of

[04:52 - 04:56]
prompt engineering where you can get

[04:54 - 05:00]
output exactly what you

[04:56 - 05:02]
need now before we head towards learning

[05:00 - 05:05]
other types of prompt engineering or

[05:02 - 05:09]
other techniques you might ask me

[05:05 - 05:09]
abishek is this the only advantage of

[05:09 - 05:13]
prompt

[05:09 - 05:16]
engineering no this is another

[05:13 - 05:19]
significant advantage of prompt

[05:16 - 05:23]
engineering that is

[05:19 - 05:24]
costing a good prompt can significantly

[05:23 - 05:27]
reduce the cost for the

[05:24 - 05:30]
organizations let me explain

[05:27 - 05:33]
how so we will take

[05:30 - 05:36]
a realtime use case where a devops

[05:33 - 05:40]
engineer is assigned with a task to

[05:36 - 05:42]
automate this that is any developer if

[05:40 - 05:46]
provides an

[05:42 - 05:50]
input similar to this or let me explain

[05:46 - 05:52]
it here so let's say as a devops

[05:50 - 05:55]
engineer you are expected to write a

[05:52 - 05:59]
python script

[05:55 - 06:00]
where the python script reads single

[05:59 - 06:02]
input

[06:00 - 06:07]
from the

[06:02 - 06:09]
user if the user inputs

[06:07 - 06:13]
kubernetes kind as

[06:09 - 06:15]
deployment then the Python program

[06:13 - 06:17]
should

[06:15 - 06:20]
generate listen to the problem statement

[06:17 - 06:24]
carefully I said it should generate

[06:20 - 06:26]
Equus deployment

[06:24 - 06:27]
manifest if

[06:26 - 06:30]
users

[06:27 - 06:34]
input is

[06:30 - 06:38]
service then the python script should

[06:34 - 06:42]
generate kubernetes service yaml file or

[06:38 - 06:45]
the Manifest file similarly the Python

[06:42 - 06:48]
program should support all the native

[06:45 - 06:51]
kubernetes resources secret config map

[06:48 - 06:52]
service account everything now how do

[06:51 - 06:54]
you write

[06:52 - 06:56]
this if you listen to the problem

[06:54 - 06:59]
statement I use the word generate that

[06:56 - 07:02]
means basically you should be looking at

[06:59 - 07:04]
Large language models because they are

[07:02 - 07:07]
good at generating the

[07:04 - 07:10]
output now okay you might use large

[07:07 - 07:12]
language model but how do you actually

[07:10 - 07:15]
prepare this python script how do you

[07:12 - 07:20]
automate this process you can do it in

[07:15 - 07:21]
two steps right step one you can prepare

[07:20 - 07:25]
the

[07:21 - 07:27]
prompt just like how we prepared in the

[07:25 - 07:29]
previous example for the deployment

[07:27 - 07:32]
manifest you can either prepare this

[07:29 - 07:36]
prompt or you can prepare this

[07:32 - 07:41]
prompt then once the prompt is

[07:36 - 07:44]
prepared you will make an API call to

[07:41 - 07:48]
the large language model because that

[07:44 - 07:51]
can generate things for you now you

[07:48 - 07:54]
cannot make API call to chat GPT because

[07:51 - 07:58]
it's just a chat bot it is just for your

[07:54 - 08:00]
learning purpose what you need to do is

[07:58 - 08:03]
you should be using large language

[08:00 - 08:05]
models posted by

[08:03 - 08:08]
maybe open

[08:05 - 08:11]
AI or deep

[08:08 - 08:14]
seek or other equivalent things you

[08:11 - 08:16]
might ask abishek how about local large

[08:14 - 08:20]
language models I'll come to that point

[08:16 - 08:23]
for now let's focus on this so step one

[08:20 - 08:26]
is to prepare the prompt step two is to

[08:23 - 08:29]
make API call to the large language

[08:26 - 08:31]
models either hosted by open aai or

[08:29 - 08:33]
deeps or

[08:31 - 08:37]
equivalent now the big problem here is

[08:33 - 08:43]
that the API calls are not

[08:37 - 08:46]
free why because either open AI or deep

[08:43 - 08:48]
seek or any equivalent company what they

[08:46 - 08:50]
need to do is they need to set up the

[08:48 - 08:53]
infrastructure they need to set up the

[08:50 - 08:56]
hardware they need to buy the gpus on

[08:53 - 08:58]
top of that they will run these large

[08:56 - 09:02]
language models so when you make the API

[08:58 - 09:04]
call to the open AI end point we will

[09:02 - 09:06]
learn all of it how to do it how to

[09:04 - 09:08]
write the python script in lecture

[09:06 - 09:10]
number three for now just understand the

[09:08 - 09:14]
theory

[09:10 - 09:16]
part so when you make API call then the

[09:14 - 09:20]
request goes to open AI infrastructure

[09:16 - 09:22]
which is running somewhere and the gpus

[09:20 - 09:25]
process your request llms process your

[09:22 - 09:29]
request and they send the output back

[09:25 - 09:32]
but for this entire thing open AI will

[09:29 - 09:35]
charge you now this is where a good

[09:32 - 09:37]
prompt and a bad prompt can make a

[09:35 - 09:40]
difference if you writing a better

[09:37 - 09:44]
prompt the one that you see here is

[09:40 - 09:47]
better prompt because it generates less

[09:44 - 09:51]
text it generates the text exactly what

[09:47 - 09:54]
you need whereas this is a bad prompt

[09:51 - 09:57]
because it generates more text abishek

[09:54 - 10:02]
what happens with text so what if I'm

[09:57 - 10:05]
writing a bad prompt and it more text so

[10:02 - 10:08]
the concept of API requests the costing

[10:05 - 10:10]
of API request is based on something

[10:08 - 10:13]
called as

[10:10 - 10:16]
tokens more the number of tokens more is

[10:13 - 10:19]
the cost of your API

[10:16 - 10:21]
request and tokens are directly or

[10:19 - 10:26]
indirectly related to the wordss for

[10:21 - 10:31]
example if you take Gemini model as

[10:26 - 10:31]
example for every 100 words

[10:32 - 10:40]
it is roughly 60 to 80

[10:36 - 10:42]
tokens that means in this case there are

[10:40 - 10:45]
more number of tokens because there are

[10:42 - 10:47]
more number of wordss whereas in the

[10:45 - 10:49]
second prompt that we provided there are

[10:47 - 10:51]
less number of wordss that means less

[10:49 - 10:53]
number of tokens so less is the cost

[10:51 - 10:56]
abishek would that matter that much for

[10:53 - 10:58]
a single API request obviously for

[10:56 - 11:01]
single API request it doesn't matter

[10:58 - 11:04]
that much but when you are doing it

[11:01 - 11:07]
scale when you are sharing it with your

[11:04 - 11:09]
organization every day 100 developers

[11:07 - 11:12]
might request it overall throughout a

[11:09 - 11:13]
year there can be thousands of requests

[11:12 - 11:16]
or there can be millions of requests to

[11:13 - 11:18]
this python script so that will make

[11:16 - 11:22]
difference between the bad prompt and

[11:18 - 11:23]
good prompt abishek I want to understand

[11:22 - 11:27]
more about

[11:23 - 11:30]
tokens let's try that so basically you

[11:27 - 11:33]
can go to Google AI

[11:30 - 11:35]
studio so just go to Google AI Studio

[11:33 - 11:39]
you can create a free account and let's

[11:35 - 11:41]
try the same thing to understand how

[11:39 - 11:44]
many number of tokens the bad prompt

[11:41 - 11:46]
generated and how many number of Tokens

[11:44 - 11:49]
The Good prompt

[11:46 - 11:51]
generated okay generate a kubernetes

[11:49 - 11:53]
manifest for deployment resource let's

[11:51 - 11:57]
run

[11:53 - 12:01]
it so you can see here the tokens number

[11:57 - 12:01]
once the prompt is complete

[12:03 - 12:08]
okay it's still

[12:05 - 12:12]
generating and the tokens you can see

[12:08 - 12:15]
the refresh token count here it is

[12:12 - 12:18]
2,473 for the bad prompt because there

[12:15 - 12:20]
is a lot of useless information that is

[12:18 - 12:23]
generated now let's look at the good

[12:20 - 12:25]
request

[12:23 - 12:29]
where I will copy

[12:25 - 12:31]
this and we can refresh just remember

[12:29 - 12:35]
remember it is roughly 2500 now the

[12:31 - 12:37]
token count is zero let's put it here

[12:35 - 12:39]
and try to

[12:37 - 12:42]
see what is the token count so it is

[12:39 - 12:42]
just

[12:42 - 12:49]
179 previously it was 2500 and now it

[12:45 - 12:51]
came down to 179 or roughly 150 so you

[12:49 - 12:54]
can see the difference in the number of

[12:51 - 12:57]
tokens right for 1 million token there

[12:54 - 12:59]
will be a pricing or let's say for 1,000

[12:57 - 13:02]
token there is a pricing reason why I'm

[12:59 - 13:04]
not talking about the pricing is because

[13:02 - 13:07]
different AI models have different

[13:04 - 13:10]
pricing at this point of time so just

[13:07 - 13:13]
remember that as the tokens go up the

[13:10 - 13:16]
price for the API request also go up

[13:13 - 13:18]
tomorrow's video when we talk more

[13:16 - 13:21]
specific about the API requests when we

[13:18 - 13:23]
look at open AI deep seek uh API

[13:21 - 13:26]
requests then you will come to know how

[13:23 - 13:29]
much tokens are costed so this is how

[13:26 - 13:32]
prompt engineering can affect the

[13:29 - 13:35]
costing as well overall we learned

[13:32 - 13:38]
prompt engineering can help you with

[13:35 - 13:42]
generating the desired output and it can

[13:38 - 13:44]
also help you with respect to cost

[13:42 - 13:50]
optimization perfect I hope this is

[13:44 - 13:52]
clear so now let's move ahead to

[13:50 - 13:54]
understanding zero short

[13:52 - 13:56]
prompting few short

[13:54 - 14:00]
prompting multi-shot

[13:56 - 14:02]
prompting and chain off

[14:00 - 14:05]
thoughts basically they are very very

[14:02 - 14:07]
simple to understand it's you know it's

[14:05 - 14:10]
something that you should develop as a

[14:07 - 14:12]
practice but they are very easy to

[14:10 - 14:15]
understand when it comes to zero short

[14:12 - 14:19]
prompting this means you provide a

[14:15 - 14:23]
prompt without any

[14:19 - 14:26]
example till now whatever we did as part

[14:23 - 14:29]
of this video is zero short

[14:26 - 14:32]
prompting we asked chat G

[14:29 - 14:35]
or Google AI Studio to generate a

[14:32 - 14:37]
kubernetes deployment manifest but we

[14:35 - 14:39]
did not provide any example to it

[14:37 - 14:41]
because

[14:39 - 14:44]
kubernetes deployment manifest is

[14:41 - 14:47]
something I'm sure the AA model should

[14:44 - 14:50]
be trained with and I'm sure it can

[14:47 - 14:51]
generate the output that's why I did not

[14:50 - 14:54]
provide any

[14:51 - 14:57]
example so direct prompting zero shot

[14:54 - 15:01]
prompting is also called as direct

[14:57 - 15:05]
prompting this is useful when you are

[15:01 - 15:07]
going with popular or familiar use cases

[15:05 - 15:09]
and it works absolutely fine you don't

[15:07 - 15:14]
have to provide an

[15:09 - 15:19]
example whereas few short prompting is

[15:14 - 15:25]
something where you first provide some

[15:19 - 15:28]
examples right and then you provide the

[15:25 - 15:31]
prompt first let's take a generic

[15:28 - 15:32]
example then let me explain from devops

[15:31 - 15:36]
point of

[15:32 - 15:38]
view so again if you go back to chat

[15:36 - 15:41]
GPT if you

[15:38 - 15:45]
ask

[15:41 - 15:52]
create a random name

[15:45 - 15:55]
which starts with a so what CH does is

[15:52 - 15:59]
you know it just provides a name right

[15:55 - 16:01]
now what if I want chat GP

[15:59 - 16:04]
to provide the name or to provide the

[16:01 - 16:06]
output in a particular

[16:04 - 16:09]
format so what I'm going to do is I'm

[16:06 - 16:11]
going to provide some examples so I will

[16:09 - 16:15]
say first

[16:11 - 16:19]
example create a name that starts with

[16:15 - 16:22]
B chat GPT your answer should

[16:19 - 16:24]
be random

[16:22 - 16:29]
name

[16:24 - 16:31]
for alphabet B is Batman

[16:29 - 16:33]
then I'll provide another example

[16:31 - 16:38]
basically we are training it with our

[16:33 - 16:43]
use case create a random name which

[16:38 - 16:46]
starts with s random name for alphabet

[16:43 - 16:49]
s is

[16:46 - 16:52]
Superman now when I ask the same thing

[16:49 - 16:54]
create a random name which starts with a

[16:52 - 16:57]
you will see that the output is not

[16:54 - 17:00]
generated in this format but it will be

[16:57 - 17:02]
generated in the form format that we are

[17:00 - 17:02]
looking

[17:02 - 17:09]
for perfect so it said random name for

[17:06 - 17:12]
alphabet a is Aquaman so for B I said

[17:09 - 17:15]
Batman S for Superman and for a it said

[17:12 - 17:17]
Aquaman I did not provide any

[17:15 - 17:21]
description to it I just use the same

[17:17 - 17:24]
prompt but what I did is I provided

[17:21 - 17:27]
examples because we provide few examples

[17:24 - 17:29]
this type of prompting is called as few

[17:27 - 17:31]
short prompting

[17:29 - 17:34]
abishek please explain me from devops

[17:31 - 17:37]
point of view I understand that is very

[17:34 - 17:39]
important so let's try to learn from

[17:37 - 17:42]
devops point of

[17:39 - 17:45]
view it's a very very important use case

[17:42 - 17:49]
because a lot of times you can go to

[17:45 - 17:52]
chat GPT and you can ask chat GPT to

[17:49 - 17:55]
generate a shell script and what chat

[17:52 - 17:59]
GPT does is it generates the shell

[17:55 - 18:03]
script which is very ideal but but it

[17:59 - 18:06]
might not be something that is according

[18:03 - 18:09]
to the standards of your

[18:06 - 18:12]
organization please understand this

[18:09 - 18:15]
every organization has a coding

[18:12 - 18:18]
style maybe in your organization you

[18:15 - 18:20]
have a coding style where whenever

[18:18 - 18:22]
someone writes the shell script in your

[18:20 - 18:24]
organization they provide the author

[18:22 - 18:25]
name they provide the version they

[18:24 - 18:28]
provide the date and only then they

[18:25 - 18:32]
write the script and maybe in your or

[18:28 - 18:35]
organization you avoid certain kind of

[18:32 - 18:37]
keywords or maybe you always declare

[18:35 - 18:40]
variables in a particular

[18:37 - 18:43]
format now chat GPT definitely is not

[18:40 - 18:46]
aware of it or large language models are

[18:43 - 18:51]
definitely not aware of

[18:46 - 18:54]
it so how do you tell chat GPT or large

[18:51 - 18:57]
language models to generate the script

[18:54 - 18:58]
according to the format or style of your

[18:57 - 19:01]
organization

[18:58 - 19:06]
this is where few short prompting comes

[19:01 - 19:09]
handy so what we will do is let's say

[19:06 - 19:12]
you want to ask llm to generate a shell

[19:09 - 19:14]
script for you so before generating the

[19:12 - 19:16]
shell script you provide some examples

[19:14 - 19:19]
to it where I will

[19:16 - 19:19]
say

[19:21 - 19:29]
example let's say uh the shell script is

[19:25 - 19:29]
to print

[19:33 - 19:39]
the or let's say fetch

[19:36 - 19:43]
the docker version

[19:39 - 19:46]
and answer where I am trying to this is

[19:43 - 19:49]
a question for the uh example and this

[19:46 - 19:51]
is the sample answer where we are just

[19:49 - 19:53]
trying to train the large language model

[19:51 - 19:55]
with our requirement not exactly

[19:53 - 20:00]
training but we are trying to explain

[19:55 - 20:00]
the format that we need so here I'll say

[20:01 - 20:07]
shebang slash bin

[20:04 - 20:07]
bash

[20:08 - 20:16]
then I will say

[20:12 - 20:16]
author abishek

[20:16 - 20:20]
mirala

[20:18 - 20:23]
version

[20:20 - 20:26]
B1 then I'll

[20:23 - 20:26]
say

[20:26 - 20:34]
date close the comms and only then the

[20:31 - 20:36]
actual script starts let's say this is

[20:34 - 20:39]
the format of your organization where

[20:36 - 20:42]
for Docker version let's say you have

[20:39 - 20:45]
Docker hyphen hyphen version similarly

[20:42 - 20:50]
let's provide another example for

[20:45 - 20:53]
terraform fetch the terraform

[20:50 - 20:55]
version and here I'll mention terraform

[20:53 - 20:59]
hyphen hyphen

[20:55 - 21:06]
version now I will ask

[20:59 - 21:08]
chat gbt to fetch the versions of all

[21:06 - 21:14]
the

[21:08 - 21:16]
services that are installed on a virtual

[21:14 - 21:20]
machine or all

[21:16 - 21:20]
the processes let's

[21:20 - 21:26]
say let's see if it can generate

[21:23 - 21:29]
according to your organization Style See

[21:26 - 21:31]
first it started with shebang author

[21:29 - 21:34]
version date and then it generated the

[21:31 - 21:37]
complicated scripting for us what's

[21:34 - 21:40]
important you need to note that you

[21:37 - 21:41]
provided it with a particular format or

[21:40 - 21:43]
a

[21:41 - 21:47]
style or the desired output that you

[21:43 - 21:49]
want and it generated exactly the same

[21:47 - 21:53]
this style of prompting is called as few

[21:49 - 21:56]
short prompting and it is the most

[21:53 - 22:00]
recommended prompting style even I would

[21:56 - 22:04]
recommend it because a lot of times

[22:00 - 22:07]
large language models do not have the

[22:04 - 22:09]
context right they know the ideal answer

[22:07 - 22:11]
but they don't know the context they

[22:09 - 22:13]
don't know what exactly is your

[22:11 - 22:16]
requirement they don't know anything

[22:13 - 22:17]
about your company you might be running

[22:16 - 22:20]
large language model locally you might

[22:17 - 22:23]
be running it externally it always gives

[22:20 - 22:27]
you the ideal output to make it give the

[22:23 - 22:29]
output that you need always provide some

[22:27 - 22:32]
examples okay that is is always try to

[22:29 - 22:34]
provide the

[22:32 - 22:36]
context you will learn more examples of

[22:34 - 22:39]
few short prompting as we proceed with

[22:36 - 22:41]
this series throughout the series but

[22:39 - 22:43]
the next seven eight episodes we will

[22:41 - 22:45]
definitely use prompt engineering and

[22:43 - 22:47]
every time I use prompt engineering I

[22:45 - 22:50]
will try to share some

[22:47 - 22:52]
insights now multi-shot prompting is

[22:50 - 22:55]
let's say you're working on even

[22:52 - 22:57]
complicated use case

[22:55 - 23:00]
then not two examples but you can

[22:57 - 23:02]
provide more examples so multi-shot

[23:00 - 23:05]
prompting is just similar to few short

[23:02 - 23:08]
prompting but you provide more number of

[23:05 - 23:11]
examples right you provide more context

[23:08 - 23:13]
to it more examples things like that

[23:11 - 23:16]
finally chain of

[23:13 - 23:19]
thoughts chain of thoughts is a

[23:16 - 23:22]
prompting style that actually enhances

[23:19 - 23:25]
the performance of large language model

[23:22 - 23:29]
so basically your large language model

[23:25 - 23:33]
can perform better if you use chain of

[23:29 - 23:35]
thoughts prompting style because it

[23:33 - 23:38]
basically encourages the large language

[23:35 - 23:41]
models to use its reasoning capabilities

[23:38 - 23:44]
so if your llm has re reasoning

[23:41 - 23:48]
capabilities using chain of thoughts you

[23:44 - 23:51]
can actually derive best output from the

[23:48 - 23:54]
models however at this point of time it

[23:51 - 23:56]
becomes too much for the beginners so we

[23:54 - 23:59]
will learn more about chain of thoughts

[23:56 - 24:04]
as we proceed with the next videos of

[23:59 - 24:06]
this series and as we talk about AI

[24:04 - 24:08]
agents for now I hope you understood

[24:06 - 24:12]
zero short prompting few short prompting

[24:08 - 24:14]
multi-shot prompting and why and how

[24:12 - 24:17]
prompt engineering is

[24:14 - 24:20]
useful one final thing I would like to

[24:17 - 24:23]
say before concluding this

[24:20 - 24:26]
video better than writing these kind of

[24:23 - 24:28]
prompts right all the prompts that I

[24:26 - 24:31]
have written here are for the purpose of

[24:28 - 24:35]
video always try to write more

[24:31 - 24:37]
elaborated input and make sure the

[24:35 - 24:41]
output that is provided by the large

[24:37 - 24:44]
language model is concised Right always

[24:41 - 24:47]
you should make sure that input is as

[24:44 - 24:49]
clear as possible but the output

[24:47 - 24:53]
provided by the large language models is

[24:49 - 24:57]
only what you require so for that always

[24:53 - 25:00]
try to follow a strategy starting with

[24:57 - 25:00]
provide

[25:01 - 25:05]
context like you can explain that you

[25:03 - 25:07]
know I'm a devops engineer or I'm

[25:05 - 25:10]
currently working on a particular

[25:07 - 25:12]
project so that your llm gets context of

[25:10 - 25:18]
what you are

[25:12 - 25:18]
doing then you should be providing the

[25:18 - 25:22]
instruction you should provide

[25:23 - 25:28]
examples that is you should be using few

[25:26 - 25:30]
short prompting as much as possible at

[25:28 - 25:32]
least that is something that I would

[25:30 - 25:35]
recommend so that you get the better

[25:32 - 25:37]
performance from the model and you

[25:35 - 25:40]
should be also defining the output

[25:37 - 25:43]
format let's say you want the output in

[25:40 - 25:47]
the MD format or you want output in the

[25:43 - 25:49]
Json format so you can just tell know

[25:47 - 25:51]
whenever you provide this input you can

[25:49 - 25:51]
just

[25:52 - 26:01]
say here please provide the output in MD

[25:59 - 26:03]
file

[26:01 - 26:06]
format and you will get the output in

[26:03 - 26:10]
the MD file

[26:06 - 26:12]
format so it is currently analyzing and

[26:10 - 26:15]
it should generate the output for us in

[26:12 - 26:17]
the MD file

[26:15 - 26:20]
format see it generated the MD file

[26:17 - 26:23]
which you can download so always try to

[26:20 - 26:27]
provide the MD file format sorry the

[26:23 - 26:28]
formatting style of the output so this

[26:27 - 26:31]
is something that I would recommend

[26:28 - 26:33]
instead of just writing a prompt provide

[26:31 - 26:36]
the context provide the instruction

[26:33 - 26:37]
provide the examples and output format

[26:36 - 26:41]
that you

[26:37 - 26:42]
need I hope you got a clear

[26:41 - 26:45]
understanding from this video let me

[26:42 - 26:47]
know in the comment section if you have

[26:45 - 26:53]
any questions I will see you all in the

[26:47 - 26:53]
next video take care everyone bye-bye

## コメント

### 1. @AbhishekVeeramalla (👍 8)
Useful Resource:
https://developers.google.com/machine-learning/resources/prompt-eng

### 2. @omkalabhairavaya1261 (👍 4)
Thank you for your wonderful session

Whenever I feel stressed, your video makes me feel confident

> **@AbhishekVeeramalla** (👍 0): My pleasure 😊

### 3. @sharifshaik1471 (👍 3)
Thank you so much abhi. lots of blessings to you. You been as my mentor for many years so far thanks a lot for everything. Keep shining
Lots of love and respect to you dude. 🔥🤝

> **@AbhishekVeeramalla** (👍 0): Thanks a ton

### 4. @ROHITHsai-jl1gb (👍 5)
awesome explanation, this was the best youtube channel for devops in the world.

> **@AbhishekVeeramalla** (👍 2): Thank you so much! 😀

> **@ROHITHsai-jl1gb** (👍 0): @@AbhishekVeeramalla you are always blessed from god abhishek,you are helping many of us.

### 5. @ananthalakshmi4188 (👍 1)
Wonderful Abhishek....kudos to your explanation pace and teaching style...

> **@AbhishekVeeramalla** (👍 0): 😍😍

### 6. @ROHITHsai-jl1gb (👍 12)
abhishek complete ansible,waiting for that.

> **@Jalal921** (👍 0): Yes I think it has few videos left

> **@raviteja3486** (👍 0): Pls complete it

> **@arshsingal65** (👍 0): Ansible tower video pending

### 7. @bhagavanj (👍 0)
Very good information. I learned something new. Thank you

### 8. @sainikhil331 (👍 2)
Hi Abhishek, I have a content request, could you please make video on problem solving skills in general at work place irrespective of technical skill. How important it is to be a problem solver, good analytical skills to resolve any problem. Thank you.

### 9. @abhishekjoshi4091 (👍 0)
Thanks abhishek for this wonderful video😇

### 10. @bharathanishetty (👍 1)
As usual Superrr  Explanation and content from you! 👌

> **@AbhishekVeeramalla** (👍 0): ❤️

### 11. @vijayalakshmiyarra-w2r (👍 0)
Thanks Abhishek, this was very helpful.

### 12. @br4676 (👍 1)
Best video and superb way of teaching

> **@AbhishekVeeramalla** (👍 0): Thanks for the feedback! 😀

### 13. @haidersyed6554 (👍 0)
LLMs have custom settings where you can define your organization's format and standards

### 14. @bestmovies7107 (👍 3)
Hello Abhishek, 

Can you pls include azure devops ci/cd on day 7 atleast on high level adding to github actions. A 2 min insights can help us here. 

Thank you

### 15. @thirupathisalveru5411 (👍 0)
Thank you for your wonderful session

### 16. @pavantej9666 (👍 0)
Very explained bro. ❤

### 17. @indianpoliticalsystem1949 (👍 1)
Hi Abhishek sir,
I want to learn Devops from zero.
I should first learn from your old devops zero to Hero course or from this course?
Your suggestion and guidance is valuable.

### 18. @tejusnaik (👍 0)
Hi Abhishek, please make a video on Atlassian Software in Kubernetes like Jira, Confluence, BitBucket

### 19. @muniperumal (👍 0)
Hi abhishek, Thanks for creating good content in devops area, i have small doubt on deployment file , we have to create separate hpa,configmap,secret yaml files or we can include in deployment yaml file, which one is used in real world .

### 20. @VishwasSunkari (👍 1)
Very insightful!!

> **@AbhishekVeeramalla** (👍 0): Glad you found it helpful!

