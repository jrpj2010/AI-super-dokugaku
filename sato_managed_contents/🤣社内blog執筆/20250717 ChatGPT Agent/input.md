```

1
00:00:11,520 --> 00:00:15,200
Good morning. We have a banger for you today. We're going to launch ChatGPT agent. But

2
00:00:15,360 --> 00:00:18,260
before jumping into that, I'd like to ask the team to introduce themselves, starting with

3
00:00:18,380 --> 00:00:18,580
Yash.

4
00:00:19,060 --> 00:00:24,240
Hi, I'm Yash. I work on agent team, and before that I used to work on operator.

5
00:00:25,080 --> 00:00:28,500
Hi, I'm Zhixing. I work on agents research, previously on deep research.

6
00:00:29,220 --> 00:00:32,160
Hi, I'm Casey. I'm a researcher on agents, formerly Operator.

7
00:00:32,850 --> 00:00:36,280
Hi, I'm Isa. I'm a researcher on agent, formerly on Deep Research.

8
00:00:37,400 --> 00:00:40,300
So we started launching agents earlier this year.

9
00:00:40,870 --> 00:00:44,920
We launched Deep Research, we launched Operator, and people were very excited about this.

10
00:00:45,100 --> 00:00:49,100
People could see that now AI was going off to do complex tasks for them.

11
00:00:49,670 --> 00:00:54,240
But it became clear to us that what people really wanted was for us to bring those capabilities and more together.

12
00:00:54,880 --> 00:01:01,020
People wanted a unified agent that could go off, use its own computer, and do real complex tasks for them.

13
00:01:01,620 --> 00:01:09,100
That could seamlessly transition from thinking about something to taking actions to using lots of tools, using the terminal, clicking around the web.

14
00:01:09,540 --> 00:01:12,380
Even producing things like spreadsheets and slides and much more.

15
00:01:12,960 --> 00:01:17,220
And people wanted to be able to do this over a long time horizon and sort of for universal tasks.

16
00:01:17,780 --> 00:01:19,980
So the team has been working super hard to bring that together.

17
00:01:20,820 --> 00:01:22,560
And today we have Chachapiti Agent.

18
00:01:22,940 --> 00:01:25,620
It's probably easier to show it to you than to keep talking about it.

19
00:01:25,980 --> 00:01:28,740
It is one of the feel the Agion moments for me to watch it work.

20
00:01:28,810 --> 00:01:29,900
So let's take a look.

21
00:01:30,230 --> 00:01:30,320
Awesome.

22
00:01:30,920 --> 00:01:31,220
Thanks, Sam.

23
00:01:31,670 --> 00:01:32,040
Hello, everyone.

24
00:01:32,660 --> 00:01:35,200
Very excited to share ChatGPT agent with everybody.

25
00:01:35,600 --> 00:01:37,820
And as Sam said, let's just dive right into the demo.

26
00:01:38,320 --> 00:01:41,160
Okay, so we are on ChatGPT, as we all know and love.

27
00:01:41,760 --> 00:01:45,940
And to turn on the agent mode, you just click the Tools menu and select Agent.

28
00:01:46,540 --> 00:01:50,300
You can also just type Agent in the Composer bar and it will take you to agent mode.

29
00:01:51,500 --> 00:01:57,620
Edward and I have a wedding to go to later this year. It's for one of our mutual friends. Should we have the agent planning?

30
00:01:58,170 --> 00:02:00,500
Yeah, let's do it. I need an outfit and

31
00:02:00,500 --> 00:02:03,080
don't forget the gift. Okay, great. We won't forget the gift.

32
00:02:04,200 --> 00:02:08,259
It's a little bit of a longer prom so I have it copied in my buffer, so I'm just gonna go ahead and paste it.

33
00:02:09,340 --> 00:02:11,420
Okay, so let's see. Let's see what it says.

34
00:02:11,870 --> 00:02:18,740
Our friends are getting married later this year, as I said, Minya and Sarah, and we want the agent to help us find an outfit that matches the dress code,

35
00:02:19,520 --> 00:02:23,620
Propose a few options, nice mid-luxury, taking into account venue and weather.

36
00:02:24,280 --> 00:02:29,080
We also want to find us some hotels, and as Edward said, don't forget the gift.

37
00:02:30,100 --> 00:02:33,500
So let's see and send the prompt away.

38
00:02:33,920 --> 00:02:36,140
As Sam said, agent uses a computer.

39
00:02:36,810 --> 00:02:38,640
So in the beginning, it sets up its environment.

40
00:02:39,840 --> 00:02:40,280
It'll

41
00:02:40,280 --> 00:02:44,780
take a minute or two, or not really, five seconds to set up its environment.

42
00:02:45,360 --> 00:02:48,160
And in this case, as you see, it understands the prompt.

43
00:02:48,280 --> 00:02:50,060
It's asking for me for a clarification.

44
00:02:51,120 --> 00:02:53,540
I'm just going to let it just continue and work anyway.

45
00:02:54,940 --> 00:02:58,060
I think it got confused by saying, oh, where's the--

46
00:02:58,820 --> 00:03:00,740
what exactly is the time of the date of the wedding?

47
00:03:01,000 --> 00:03:02,420
I think it'll figure out using the website.

48
00:03:03,060 --> 00:03:05,260
Okay, cool. So now it's kicked off.

49
00:03:05,420 --> 00:03:07,100
It's starting the process through prompt,

50
00:03:07,380 --> 00:03:08,340
and it's opened up a browser.

51
00:03:09,020 --> 00:03:10,600
And to walk you through what's happening, here's Yisa.

52
00:03:11,780 --> 00:03:14,520
Yeah. So as mentioned, we gave the agent access

53
00:03:14,740 --> 00:03:16,060
to its own virtual computer.

54
00:03:16,820 --> 00:03:21,700
and the computer has many different tools installed and it can choose which to use as it's working through the task.

55
00:03:22,200 --> 00:03:27,100
So in ChatGPT you can see a visualization of the agent's computer screen

56
00:03:27,820 --> 00:03:30,320
and you can see overlayed its chain of thought in text

57
00:03:30,470 --> 00:03:34,080
and that's what it's thinking as it's working through the task and deciding what to do next.

58
00:03:34,920 --> 00:03:37,660
We gave the agent access to two different ways to browse the internet.

59
00:03:38,220 --> 00:03:41,659
First we gave it a text browser and this is similar to the deep research tool

60
00:03:41,960 --> 00:03:47,680
And this is what lets it really efficiently and quickly read many web pages and search for them.

61
00:03:48,240 --> 00:03:50,140
And we also gave it access to a visual browser.

62
00:03:50,270 --> 00:03:51,900
And this is similar to the operator tool.

63
00:03:52,260 --> 00:03:55,260
And this is what lets it actually interact with the UI of a web page.

64
00:03:55,530 --> 00:03:57,100
So it can drag things.

65
00:03:57,190 --> 00:03:58,900
It can use the cursor to click around.

66
00:03:59,560 --> 00:04:00,780
It can open UI components.

67
00:04:01,180 --> 00:04:04,700
It can fill out forms and enter text in text areas.

68
00:04:04,860 --> 00:04:05,480
It's very flexible.

69
00:04:06,760 --> 00:04:08,140
So those two tools are very complementary.

70
00:04:08,860 --> 00:04:11,080
And then we also gave it access to its own terminal.

71
00:04:11,600 --> 00:04:16,519
so that it can run code and it can also generate and analyze files like slide decks and spreadsheets.

72
00:04:17,220 --> 00:04:19,760
And then through the terminal, it's also able to call APIs.

73
00:04:20,310 --> 00:04:28,400
So both public APIs and APIs to access your private data sources like Google Drive, Google Calendar, GitHub, SharePoint, and many others.

74
00:04:29,740 --> 00:04:33,040
Only if you explicitly connect them, similar to Deep Research Connectors.

75
00:04:33,540 --> 00:04:41,660
And then it also has access to the ImageGen API, so it can create nice visuals for slide decks and other things as it's working through its tasks.

76
00:04:43,100 --> 00:04:44,800
How is it deciding which tools to use here?

77
00:04:45,760 --> 00:04:49,180
Yes, we train the model to move between these capabilities with reinforcement learning.

78
00:04:49,860 --> 00:04:54,420
This is the first model we trained that has access to this unified toolbox.

79
00:04:55,460 --> 00:04:58,920
A text browser, a GUI browser, and a terminal, all in one virtual machine.

80
00:04:59,940 --> 00:05:04,660
To guide its learning, we curated hard tasks that require using all these tools.

81
00:05:05,800 --> 00:05:12,120
This allows the model not only to learn how to use these tools, but also when to use which tool depending on the task at hand.

82
00:05:12,980 --> 00:05:19,440
At the beginning of the training, the model might attempt to use all these tools to solve a relatively simple problem.

83
00:05:20,220 --> 00:05:27,620
Over time, as we reward the model for solving problems correctly and efficiently, the model will have smarter tool choice.

84
00:05:28,980 --> 00:05:35,900
For example, if you ask a model to find a restaurant with specific requirements and make a reservation,

85
00:05:36,590 --> 00:05:41,600
the model may typically just start a deep research in the text browser to find some candidates,

86
00:05:42,430 --> 00:05:49,440
then switch to the GUI browser to view photos of food, check availability, and complete the booking.

87
00:05:50,340 --> 00:05:56,840
Similarly, for creative tasks like creating an artifact, the model will first search online for public resources,

88
00:05:57,620 --> 00:06:06,320
Then switch to the terminal to do some code editing to compile the artifact and finally verify the final output in the GUI browser.

89
00:06:07,180 --> 00:06:14,660
With this, we truly feel like we brought together the best of Deep Research and Operator and added some extra sparkle.

90
00:06:16,380 --> 00:06:18,020
That's right. Yeah,

91
00:06:18,090 --> 00:06:20,700
so to put this project in context, I want to give a bit of history.

92
00:06:21,260 --> 00:06:24,240
So a few months ago, we shipped Operator in January.

93
00:06:25,120 --> 00:06:30,820
And this was our agent that lets you do online tasks like book reservations and send emails.

94
00:06:31,590 --> 00:06:33,620
And then two weeks later, we shipped DeepResearch.

95
00:06:34,280 --> 00:06:38,300
And DeepResearch is a tool that lets you do in-depth internet research

96
00:06:39,000 --> 00:06:42,260
and output high-quality research reports.

97
00:06:43,210 --> 00:06:47,600
And after launch, we realized that actually these two approaches are actually deeply complementary.

98
00:06:49,200 --> 00:06:52,760
For example, Operator has some trouble reading super long articles.

99
00:06:53,400 --> 00:06:54,740
It has to scroll, it takes a long time.

100
00:06:55,200 --> 00:06:56,800
But that's something that deep research is good at.

101
00:06:57,819 --> 00:07:03,740
Conversely, Deep Research isn't as good at interacting with web pages.

102
00:07:04,180 --> 00:07:07,440
Interactive elements, highly visual web pages.

103
00:07:07,940 --> 00:07:09,820
But that's something that Operator excels at.

104
00:07:11,680 --> 00:07:14,240
So yeah, we thought these approaches were complementary.

105
00:07:15,420 --> 00:07:17,360
And then we are also looking at some customer feedback.

106
00:07:18,180 --> 00:07:22,580
So for example, one of our most highly requested features for deep research was the ability

107
00:07:22,740 --> 00:07:24,920
to log into websites and access authenticated sources.

108
00:07:25,780 --> 00:07:27,100
That's something that Operator can do.

109
00:07:27,680 --> 00:07:28,940
I've been waiting for that for a long time.

110
00:07:29,420 --> 00:07:29,540
Yeah.

111
00:07:31,560 --> 00:07:35,200
Another thing is that we were looking at the prompts that people were trying for Operator,

112
00:07:35,640 --> 00:07:37,940
and we saw that they were actually more deep research type prompts.

113
00:07:38,300 --> 00:07:40,680
For example, plan a trip and then book it.

114
00:07:41,760 --> 00:07:44,860
And so, yeah, we really feel like we're bringing the best of both worlds here.

115
00:07:45,640 --> 00:07:48,900
And on a personal note, we've all been friends for a while and it's really exciting to be

116
00:07:48,940 --> 00:07:49,240
working together.

117
00:07:50,600 --> 00:07:54,580
So speaking of matches made in heaven, how is the wedding planning going?

118
00:07:55,100 --> 00:07:55,360
It's

119
00:07:55,360 --> 00:07:56,100
amazing to watch.

120
00:07:56,280 --> 00:07:58,020
This is an example of a task I hate doing.

121
00:07:58,180 --> 00:07:58,820
This can ruin

122
00:07:58,820 --> 00:08:01,280
multiple hours for me as I get sucked

123
00:08:01,280 --> 00:08:01,980
into these rabbit holes.

124
00:08:01,990 --> 00:08:05,440
So just watching this as you guys have been talking, click through this and just like do

125
00:08:05,440 --> 00:08:06,880
the whole thing is really quite remarkable.

126
00:08:07,140 --> 00:08:07,740
Yeah, totally.

127
00:08:08,840 --> 00:08:12,400
Looks like it started off by figuring out the weather.

128
00:08:13,220 --> 00:08:15,760
One of the cool features is that, you know,

129
00:08:16,020 --> 00:08:17,780
as some of these tasks may take a little bit longer,

130
00:08:18,200 --> 00:08:19,780
you can just go back and see what it was doing.

131
00:08:19,980 --> 00:08:21,200
So that's what we're exactly going to do.

132
00:08:21,400 --> 00:08:22,580
Looks like it went through the website,

133
00:08:23,060 --> 00:08:25,120
used the text browser, interestingly for that.

134
00:08:25,380 --> 00:08:27,460
Now, looking through the suits for Edward,

135
00:08:28,020 --> 00:08:28,960
I think it will find something good.

136
00:08:29,160 --> 00:08:31,560
Here you can see it switched over to actually a visual browser

137
00:08:31,710 --> 00:08:34,060
to make sure the suit will look really good on Edward.

138
00:08:36,140 --> 00:08:39,960
And now it looks like, yeah, it's good chugging along,

139
00:08:40,479 --> 00:08:41,380
figuring out what to do.

140
00:08:42,340 --> 00:08:43,200
And still on suits.

141
00:08:43,440 --> 00:08:45,640
And now probably getting to the gifts section.

142
00:08:46,700 --> 00:08:46,980
OK, cool.

143
00:08:47,070 --> 00:08:48,120
So this is going to take a while.

144
00:08:48,220 --> 00:08:50,380
As Sam said, these tasks sometimes can take a long time.

145
00:08:50,580 --> 00:08:52,480
So it's going to continue doing, hopefully much faster

146
00:08:52,530 --> 00:08:53,100
than we will do.

147
00:08:54,280 --> 00:08:55,900
Should we do something else while it's doing it?

148
00:08:56,390 --> 00:08:56,680
I think the

149
00:08:56,680 --> 00:08:57,100
team really

150
00:08:57,100 --> 00:08:59,260
wanted the stickers, some stickers

151
00:08:59,520 --> 00:09:00,420
for the launch.

152
00:09:00,580 --> 00:09:01,020
Should we do that?

153
00:09:01,200 --> 00:09:01,800
Yeah, cool.

154
00:09:02,080 --> 00:09:03,060
All right, so we

155
00:09:03,060 --> 00:09:03,780
have a team mascot,

156
00:09:04,120 --> 00:09:05,380
which is one of our colleagues, Bernie Dool.

157
00:09:05,720 --> 00:09:07,120
Really, really cute, I'll tell you.

158
00:09:08,360 --> 00:09:11,700
And we're going to try and get some laptop stickers

159
00:09:11,790 --> 00:09:12,160
for everybody.

160
00:09:13,400 --> 00:09:15,240
One of the favorite features for agent

161
00:09:15,480 --> 00:09:18,640
is given that trajectories can take 15 minutes, 20 minutes,

162
00:09:18,860 --> 00:09:21,680
30 minutes, depending on the complexity of the task,

163
00:09:22,400 --> 00:09:24,580
a lot of times you might need to help the agent.

164
00:09:24,660 --> 00:09:26,960
The agent might need to ask you clarifications, confirmations,

165
00:09:27,240 --> 00:09:27,900
and things like that.

166
00:09:28,860 --> 00:09:30,380
So I love to use it on the go.

167
00:09:30,690 --> 00:09:31,700
So I'm going to use my mobile phone

168
00:09:32,000 --> 00:09:33,980
to actually send the query this time and then see how it goes.

169
00:09:35,260 --> 00:09:36,900
OK, so let's see.

170
00:09:36,990 --> 00:09:38,280
OK, so we are on chat GPT.

171
00:09:39,120 --> 00:09:41,100
I have already selected the agent mode.

172
00:09:41,340 --> 00:09:44,080
I have also inputted our cute mascot.

173
00:09:44,610 --> 00:09:46,000
And I'm going to quickly paste a query.

174
00:09:46,300 --> 00:09:49,800
So query says, make some swag for the team, one by one

175
00:09:49,920 --> 00:09:51,740
laptop stickers, and order 500 of them.

176
00:09:52,560 --> 00:09:59,280
I'll also say I like sticker mule, which we have used in the past,

177
00:09:59,780 --> 00:10:00,520
and send it off.

178
00:10:02,280 --> 00:10:05,140
OK, so just like it was doing on the web,

179
00:10:05,480 --> 00:10:07,940
it's going to take some time, think about what's it doing,

180
00:10:08,760 --> 00:10:10,200
and it'll kick off the query.

181
00:10:10,980 --> 00:10:13,840
And as it's going, it'll take some time to kick it off.

182
00:10:14,220 --> 00:10:15,220
Is it-- oh, there we go.

183
00:10:15,540 --> 00:10:16,740
So it'll start working on it.

184
00:10:16,880 --> 00:10:18,580
Looks like it's starting to create the anime art.

185
00:10:19,220 --> 00:10:21,980
It'll probably use Imogen that Issa referred earlier on

186
00:10:22,100 --> 00:10:23,440
to create, hopefully, an anime art.

187
00:10:23,500 --> 00:10:24,320
We'll see how it comes out.

188
00:10:24,960 --> 00:10:26,680
While that's going, anything else we want to do?

189
00:10:27,260 --> 00:10:27,720
Oh, yeah.

190
00:10:27,820 --> 00:10:30,700
I also need a pair of shoes because my shoes got damaged.

191
00:10:31,400 --> 00:10:32,020
How did they get damaged?

192
00:10:32,280 --> 00:10:32,920
- By the ring.

193
00:10:33,440 --> 00:10:34,020
- In SF?

194
00:10:34,680 --> 00:10:35,020
- Yes.

195
00:10:35,680 --> 00:10:36,280
- Cool, all right.

196
00:10:36,630 --> 00:10:38,220
Well, let's get Edward a pair of shoes as well.

197
00:10:38,390 --> 00:10:41,040
So, oh, can you also find us

198
00:10:43,160 --> 00:10:47,440
pair of men's dress, black shoes, and size?

199
00:10:48,480 --> 00:10:49,000
- 9.5.

200
00:10:49,120 --> 00:10:49,600
- 9.5.

201
00:10:51,000 --> 00:10:53,000
So, one of the key capabilities of the model

202
00:10:53,160 --> 00:10:54,300
is being able to interrupt.

203
00:10:54,660 --> 00:10:56,980
I think, you know, as trajectories take long time

204
00:10:57,300 --> 00:10:59,400
or whatever time, it's really important for us to,

205
00:11:00,840 --> 00:11:03,600
for it to feel very multi-turned so the users can interject,

206
00:11:04,020 --> 00:11:06,200
user can direct it, user can give it more guidance,

207
00:11:06,450 --> 00:11:07,740
less guidance, whatever we want to do.

208
00:11:08,220 --> 00:11:09,120
And that's what we're doing here.

209
00:11:10,560 --> 00:11:12,580
Essentially, the model was chugging along,

210
00:11:12,940 --> 00:11:14,600
figuring out all the things that we had asked before.

211
00:11:14,940 --> 00:11:16,820
And in this case, we essentially said, hey,

212
00:11:17,080 --> 00:11:21,000
can you also get us a pair of men's black shoes?

213
00:11:21,090 --> 00:11:21,800
And now it's thinking.

214
00:11:22,690 --> 00:11:24,860
And soon enough, hopefully, it'll take that into account

215
00:11:25,160 --> 00:11:27,160
and keep going into its trajectory.

216
00:11:27,340 --> 00:11:27,580
There we go.

217
00:11:27,740 --> 00:11:29,500
So it said, acknowledge the interruption.

218
00:11:29,840 --> 00:11:32,120
and said, OK, cool, I'll also research men's black shoes

219
00:11:32,130 --> 00:11:35,340
in size 9.5, and then we'll probably get on its way.

220
00:11:36,580 --> 00:11:38,380
But maybe Isai can tell us a little bit more about how that

221
00:11:38,540 --> 00:11:38,640
works.

222
00:11:39,050 --> 00:11:39,620
KATE LEAH: Yeah, sure.

223
00:11:40,150 --> 00:11:42,420
So as you can see, the agent is very collaborative.

224
00:11:42,670 --> 00:11:45,440
And this was really important to us when we were training the model

225
00:11:45,510 --> 00:11:46,320
and building the product.

226
00:11:46,820 --> 00:11:48,940
If you were asking another person to do a task for you

227
00:11:48,990 --> 00:11:50,640
that would take them a really long time to complete,

228
00:11:50,970 --> 00:11:52,920
you'd probably give them some instructions to start.

229
00:11:53,390 --> 00:11:55,060
And then they might ask you some clarifying questions.

230
00:11:55,740 --> 00:11:57,920
And then they'd start the task and maybe realize, oh,

231
00:11:58,080 --> 00:11:59,480
they need more clarification from you,

232
00:11:59,760 --> 00:12:01,380
or they need your permission to sign into something

233
00:12:01,440 --> 00:12:02,480
or do something on your behalf.

234
00:12:03,040 --> 00:12:05,460
And then you might realize, oh, I forgot to mention this thing,

235
00:12:05,580 --> 00:12:07,160
or what's your status?

236
00:12:07,420 --> 00:12:07,980
How are you doing?

237
00:12:08,140 --> 00:12:09,340
Can I help redirect you if you're

238
00:12:09,440 --> 00:12:10,960
getting along the wrong path or something?

239
00:12:11,540 --> 00:12:14,080
And so similarly, for these really long-running agentic tasks,

240
00:12:14,340 --> 00:12:16,760
it's very important that both the user and the agent

241
00:12:17,240 --> 00:12:19,520
are able to initiate communication with each other

242
00:12:19,960 --> 00:12:22,480
so that the agent is able to most effectively help you

243
00:12:22,480 --> 00:12:23,040
with your tasks.

244
00:12:23,760 --> 00:12:24,860
And so this is something that we actually

245
00:12:25,140 --> 00:12:25,740
trained into the model.

246
00:12:25,920 --> 00:12:29,760
We trained it to be able to ask clarifying questions, not every single time like deep

247
00:12:30,020 --> 00:12:30,140
research.

248
00:12:30,580 --> 00:12:31,300
We also

249
00:12:31,300 --> 00:12:33,160
trained

250
00:12:33,160 --> 00:12:35,140
it to be interruptible, as Yash just showed.

251
00:12:35,380 --> 00:12:39,160
And also sometimes it will ask you for clarification and confirmation mid-trajectory.

252
00:12:40,180 --> 00:12:40,660
Yeah.

253
00:12:41,040 --> 00:12:44,720
And part of working with Agent is that, well, sometimes it'll make mistakes.

254
00:12:45,360 --> 00:12:49,180
And that's why we felt it was important to train the model to ask you for confirmation

255
00:12:49,560 --> 00:12:51,640
at the last step of important steps.

256
00:12:52,680 --> 00:12:55,600
So for example, maybe before it's going to send the email,

257
00:12:56,480 --> 00:12:59,340
it'll ask you to take a look at the draft and whether it makes sense

258
00:12:59,520 --> 00:13:01,360
and whether there are any embarrassing typos.

259
00:13:02,440 --> 00:13:05,540
And if there are, then you can either ask it to fix it,

260
00:13:06,000 --> 00:13:07,300
or you can directly take over the browser

261
00:13:07,880 --> 00:13:10,460
and jump right into the agent's environment

262
00:13:11,080 --> 00:13:12,020
and correct it yourself.

263
00:13:12,700 --> 00:13:14,520
And that way, it feels collaborative,

264
00:13:14,860 --> 00:13:16,460
and you can really work with the agent.

265
00:13:18,380 --> 00:13:19,900
Should we look at maybe one more demo?

266
00:13:20,040 --> 00:13:27,480
We've got this sort of fun tradition in live streams of using our newest models to sort of evaluate themselves or do something kind of meta.

267
00:13:28,080 --> 00:13:28,820
Anything like that we could do?

268
00:13:29,190 --> 00:13:29,860
Yeah, let's do it.

269
00:13:32,920 --> 00:13:34,940
I think people would love to know how good the model is.

270
00:13:35,080 --> 00:13:35,360
Yes.

271
00:13:36,050 --> 00:13:40,680
So this is a prompt we previously gave the agent yesterday.

272
00:13:41,270 --> 00:13:47,140
So basically it asks the model to pull its own evaluation number from our Google Drive connector and make some slides.

273
00:13:47,940 --> 00:13:50,620
So we want to keep it simple, like no introduction, no

274
00:13:50,860 --> 00:13:53,780
conclusion, just present the results in the charts.

275
00:13:54,620 --> 00:13:57,460
As you can see, now the model is connecting to the Google

276
00:13:57,460 --> 00:13:58,020
Java API.

277
00:13:58,940 --> 00:14:00,600
And then search within API.

278
00:14:01,500 --> 00:14:04,260
Right now, it looks like the first result is very relevant.

279
00:14:04,740 --> 00:14:05,940
So it's reading the first result.

280
00:14:07,780 --> 00:14:10,060
Now it's reading the first results in details.

281
00:14:11,200 --> 00:14:13,040
Let's accelerate this replay.

282
00:14:14,240 --> 00:14:18,460
So then the model might read it from the result again

283
00:14:19,600 --> 00:14:20,280
and write some code.

284
00:14:22,000 --> 00:14:25,060
So here you can see that the model is using the image

285
00:14:25,260 --> 00:14:27,640
generation model called the image generation tool

286
00:14:28,020 --> 00:14:30,540
to generate some decorations for the slides.

287
00:14:33,160 --> 00:14:35,460
And let's see what's the first slide the model made.

288
00:14:38,920 --> 00:14:40,919
So here the model is writing some code

289
00:14:40,940 --> 00:14:43,580
that will be compiled to be the final slides.

290
00:14:44,520 --> 00:14:46,180
So this is the first slide the model

291
00:14:46,340 --> 00:14:48,940
makes in this demo, which looks OK,

292
00:14:49,280 --> 00:14:50,300
but it's not polished enough.

293
00:14:51,220 --> 00:14:53,320
One of the key features in reinforcement learning

294
00:14:53,500 --> 00:14:56,020
is that the model will review its own results

295
00:14:56,460 --> 00:15:00,240
and refine the results to deliver a good final result.

296
00:15:01,040 --> 00:15:03,640
Let's see what finally the model gave us.

297
00:15:04,940 --> 00:15:06,560
We can click Skip.

298
00:15:07,420 --> 00:15:11,660
And then the model gave us a good PowerPoint file.

299
00:15:12,330 --> 00:15:15,160
So it's a real PowerPoint that you can download and open it

300
00:15:15,380 --> 00:15:16,260
in any software.

301
00:15:19,720 --> 00:15:23,080
Let's open it in the office.

302
00:15:24,120 --> 00:15:27,380
So let's present the slides the model just generated.

303
00:15:28,780 --> 00:15:30,620
First are two intelligence benchmarks.

304
00:15:32,060 --> 00:15:35,279
Humanity's last exam is a benchmark

305
00:15:35,300 --> 00:15:40,720
that measures AI's ability to solve a broad range of subjects on hard problems.

306
00:15:42,020 --> 00:15:46,380
We evaluated the models with two settings, with and without tool use.

307
00:15:48,080 --> 00:15:53,800
We can see that the agent modes, the role intelligence is already pretty nice, and with

308
00:15:53,940 --> 00:15:57,859
access to all tools nearly double the performance to 42%.

309
00:15:59,180 --> 00:16:04,520
When evaluating models on humanities last exam, especially with the browsing ability,

310
00:16:05,570 --> 00:16:10,920
we have a two-layer decontamination that ensures that the model doesn't cheat on this benchmark.

311
00:16:12,620 --> 00:16:16,440
Frontier Maths is a benchmark that measures the advanced mathematical reasoning ability

312
00:16:16,810 --> 00:16:17,320
of models.

313
00:16:18,590 --> 00:16:24,579
Different from our baseline, O4mini and O3, which use Python with function calling, we

314
00:16:24,600 --> 00:16:29,240
We give the agent model all available tools like a browser, a computer, and a terminal.

315
00:16:30,480 --> 00:16:36,260
The agent achieves a new state of art of 27% on this benchmark with the help of all these

316
00:16:36,480 --> 00:16:36,560
tools.

317
00:16:39,700 --> 00:16:42,560
Next, we evaluate the model on two agentic benchmarks.

318
00:16:43,640 --> 00:16:48,720
WebArena is the benchmark that measures web agents' ability to solve real-world web tasks.

319
00:16:50,120 --> 00:16:54,900
The agent model improves over previous O3 model that powers the core.

320
00:16:56,520 --> 00:17:01,840
BrowseComp is a benchmark we introduced earlier this year that measures the browsing agent's

321
00:17:02,020 --> 00:17:06,020
ability to search and find how to locate information.

322
00:17:07,439 --> 00:17:12,380
The agent model significantly outperforms O3 and Deep research on this benchmark, achieving

323
00:17:12,560 --> 00:17:14,040
69% pass rate.

324
00:17:16,600 --> 00:17:22,020
Finally, we care about how the users will benefit from our model in the real world.

325
00:17:23,299 --> 00:17:29,760
SpreadsheetBench is a benchmark that measures the model's ability to edit spreadsheets derived from the real-world use case.

326
00:17:30,900 --> 00:17:38,180
Here, the agent model with the liberal office and the computer tool can already solve 30% of the task.

327
00:17:39,100 --> 00:17:47,260
When we give the model the access to the raw Excel file in the terminal, which further boosts the performance to 45%.

328
00:17:48,920 --> 00:17:51,900
Finally, we evaluate the model on an internal banking benchmark.

329
00:17:52,830 --> 00:18:00,840
This benchmark evaluates the model's ability to conduct first to third year investment banking analyst tasks,

330
00:18:01,550 --> 00:18:07,420
such as putting together a three-statement financial model for a Fortune 500 company.

331
00:18:08,620 --> 00:18:13,280
In this benchmark, the agent model significantly outperforms the previous deep research and

332
00:18:13,280 --> 00:18:13,820
all three models.

333
00:18:15,280 --> 00:18:19,700
As you can see, this model is one of the most powerful models we've ever trained.

334
00:18:21,200 --> 00:18:27,580
It's not only good on benchmarks, it's also capable of reasoning, browsing, and tackling

335
00:18:27,860 --> 00:18:31,660
real-world tasks at a level that we cannot imagine three months ago.

336
00:18:33,039 --> 00:18:33,800
That's right.

337
00:18:34,960 --> 00:18:39,940
As Edward said, we think we've trained a very powerful model, and a lot of the power comes

338
00:18:39,990 --> 00:18:41,500
from its ability to browse the internet.

339
00:18:42,460 --> 00:18:45,220
And as we know, the internet can be a scary place.

340
00:18:45,940 --> 00:18:50,740
There are all sorts of hackers trying to steal your information, scams, phishing attempts.

341
00:18:52,180 --> 00:18:54,300
And Agent isn't immune to all these things.

342
00:18:55,860 --> 00:19:00,720
One particular thing we're worried about is a new attack called prompt injections.

343
00:19:02,160 --> 00:19:07,180
This is where, let's say, you ask agent to buy you a book, and you give it your credit

344
00:19:07,180 --> 00:19:08,260
card information to do that.

345
00:19:09,600 --> 00:19:13,880
Agent might stumble upon a malicious website that asks it, "Oh, enter your credit card

346
00:19:14,060 --> 00:19:14,520
information here.

347
00:19:15,080 --> 00:19:16,320
It'll help you with your task."

348
00:19:16,560 --> 00:19:20,780
An agent, which is trained to be helpful, might decide that's a good idea.

349
00:19:23,040 --> 00:19:25,940
We've done a lot of work to try to ensure that this doesn't happen.

350
00:19:27,120 --> 00:19:31,440
We've trained our model to ignore suspicious instructions on suspicious websites.

351
00:19:32,020 --> 00:19:38,200
We also have layers of monitors that kind of peer over the agent's shoulder and watch

352
00:19:38,200 --> 00:19:42,140
it as it's going and stop the trajectory if anything looks suspicious.

353
00:19:43,220 --> 00:19:47,660
We can even update these in real time if new attacks are found in the wild.

354
00:19:49,040 --> 00:19:54,440
That said though, this is a cutting edge product, this is a new surface, and we can't stop everything.

355
00:19:55,120 --> 00:19:56,820
And so that's why I feel it's very important for the audience

356
00:19:56,940 --> 00:19:59,360
to be aware of the risks involved in using Agent.

357
00:20:00,520 --> 00:20:04,040
And we encourage users to be proactive in kind of thinking

358
00:20:04,220 --> 00:20:05,280
about how they share their information.

359
00:20:05,980 --> 00:20:07,520
If it's highly sensitive information,

360
00:20:07,940 --> 00:20:08,480
maybe don't share that.

361
00:20:10,980 --> 00:20:13,240
Maybe use our features like takeover mode

362
00:20:13,500 --> 00:20:16,900
to directly input your current information into the browser

363
00:20:17,120 --> 00:20:18,660
instead of giving it to Agent.

364
00:20:20,160 --> 00:20:22,240
We feel like we've built a very powerful product.

365
00:20:22,880 --> 00:20:25,960
But again, it's important for our users to understand the risks

366
00:20:25,960 --> 00:20:26,240
involved.

367
00:20:26,620 --> 00:20:27,900
Yeah, I really want to emphasize that.

368
00:20:27,940 --> 00:20:30,800
I think this is a new level of capability in AI.

369
00:20:30,940 --> 00:20:34,520
It's a new way to use AI, but there will be a new set of attacks that come with that,

370
00:20:34,660 --> 00:20:39,100
and society and the technology will have to evolve and learn how we're going to mitigate things

371
00:20:39,160 --> 00:20:42,560
that we can't even really imagine yet as people start doing more and more work this way.

372
00:20:43,660 --> 00:20:46,820
Before I wrap up, should we check in on some of the tasks you kicked off?

373
00:20:47,000 --> 00:20:47,620
Yeah, let's do it.

374
00:20:48,940 --> 00:20:53,140
OK, so I am going to open a new tab and make sure

375
00:20:53,320 --> 00:20:57,560
that we can see the progress of our stickers as well.

376
00:20:58,560 --> 00:20:59,800
OK, let's see.

377
00:21:00,620 --> 00:21:03,380
All right, so sounds like stickers are ready.

378
00:21:04,200 --> 00:21:06,400
Let me see what-- OK, so cool thing.

379
00:21:07,100 --> 00:21:10,140
This is sort of the end result of the--

380
00:21:10,580 --> 00:21:13,720
took about seven minutes, highly likely figured out everything.

381
00:21:13,860 --> 00:21:16,020
We'll go back and look at the trajectory and see how it did.

382
00:21:16,520 --> 00:21:19,200
But at the end result, it looks like it's added to the cart.

383
00:21:19,420 --> 00:21:20,200
This is the subtotal.

384
00:21:20,280 --> 00:21:22,960
I can just go ahead and look at it and then figure out--

385
00:21:24,380 --> 00:21:26,220
I can just take over at this point, as Casey said,

386
00:21:26,360 --> 00:21:27,580
to enter my credit card information

387
00:21:27,820 --> 00:21:29,620
and then place the order really quickly.

388
00:21:29,980 --> 00:21:31,800
Model is asking for confirmation, et cetera,

389
00:21:32,100 --> 00:21:32,740
as it's supposed to do.

390
00:21:33,340 --> 00:21:35,160
Let's just quickly browse through the trajectory

391
00:21:35,380 --> 00:21:36,620
and see what it actually did.

392
00:21:37,260 --> 00:21:38,840
Oh, it looks like it generated some stickers.

393
00:21:40,060 --> 00:21:40,300
Oh,

394
00:21:40,480 --> 00:21:40,720
look at that.

395
00:21:41,040 --> 00:21:41,760
That's what it did right in.

396
00:21:41,980 --> 00:21:42,740
That was a cute sticker.

397
00:21:43,580 --> 00:21:43,640
Cool.

398
00:21:43,880 --> 00:21:44,840
So yeah, that's the task.

399
00:21:45,020 --> 00:21:47,380
I think I can, at this point, finish up by myself,

400
00:21:47,470 --> 00:21:49,260
or I can ask the model to actually go ahead and do it

401
00:21:49,340 --> 00:21:49,860
for me as well.

402
00:21:50,580 --> 00:21:52,320
Let's check on the wedding.

403
00:21:52,500 --> 00:21:53,660
OK, great.

404
00:21:54,280 --> 00:21:56,060
Looks like it just finished in the nick of time.

405
00:21:57,860 --> 00:21:58,220
OK, cool.

406
00:21:58,530 --> 00:22:02,240
So in this case, as we said, we were looking for hotels,

407
00:22:03,280 --> 00:22:04,680
suits, and also shoes.

408
00:22:06,320 --> 00:22:08,680
So it's come out with a pretty comprehensive report,

409
00:22:08,680 --> 00:22:09,320
it looks like.

410
00:22:09,580 --> 00:22:13,140
Wedding venue, date, when it is, with the Zilla links,

411
00:22:14,000 --> 00:22:17,920
dress codes, it figured out what the suit recommendations should be,

412
00:22:18,080 --> 00:22:18,520
where you can buy.

413
00:22:18,620 --> 00:22:22,560
Now I can go ahead and buy myself, or I can ask the agent to go and buy for me.

414
00:22:24,300 --> 00:22:26,660
Also figured out footwear, huddle options.

415
00:22:26,840 --> 00:22:29,780
It actually looked through all the, oops, sorry.

416
00:22:30,420 --> 00:22:32,900
It looked through all the availability.

417
00:22:33,500 --> 00:22:36,400
You can see actually it gives screenshots of what it checked.

418
00:22:36,640 --> 00:22:39,160
In this case, we use booking.com and it's able to do that.

419
00:22:39,780 --> 00:22:42,120
Also has gift suggestions, et cetera, and next step.

420
00:22:42,360 --> 00:22:42,920
They can ask it.

421
00:22:43,140 --> 00:22:45,580
As you said, the agent says, hey, if you need assistance

422
00:22:45,840 --> 00:22:47,680
purchasing any item or have any further adjustments,

423
00:22:47,900 --> 00:22:49,080
let me know so we can do that.

424
00:22:49,940 --> 00:22:52,440
And I want to show one last demo, which we didn't really run

425
00:22:52,680 --> 00:22:54,120
live, but I think it's really cool,

426
00:22:54,860 --> 00:22:57,240
and especially because the folks who are getting married

427
00:22:57,580 --> 00:22:58,660
are really into MLB.

428
00:23:00,120 --> 00:23:04,700
So we asked the agent to go and build an optimal itinerary

429
00:23:04,980 --> 00:23:08,140
for visiting all 30 MLB stadiums, just in case

430
00:23:08,260 --> 00:23:11,079
you're thinking of a sabbatical, and then

431
00:23:11,100 --> 00:23:14,520
design the optimal route, prioritize Hello Kitty Nights

432
00:23:14,610 --> 00:23:17,220
and whatnot, and present the final plan

433
00:23:17,250 --> 00:23:17,980
as a detailed spreadsheet.

434
00:23:18,080 --> 00:23:19,240
I'll really quickly run through this.

435
00:23:19,770 --> 00:23:21,380
I think it's just so fun to see.

436
00:23:21,820 --> 00:23:26,180
So again, as we have shown throughout the livestream,

437
00:23:26,480 --> 00:23:30,540
it uses a multitude of tools, uses the terminal,

438
00:23:30,940 --> 00:23:33,900
use using the browser, working through all the details.

439
00:23:34,300 --> 00:23:36,000
It'll probably use, again, back to the browser,

440
00:23:36,880 --> 00:23:39,939
figuring out Hello Kitty Nights, and then

441
00:23:39,960 --> 00:23:40,920
both stadium and whatnot.

442
00:23:41,580 --> 00:23:42,280
Oh, let's see.

443
00:23:43,420 --> 00:23:44,140
Oh, there you go.

444
00:23:44,679 --> 00:23:47,940
Building a map, using code to actually build it out.

445
00:23:48,040 --> 00:23:50,940
And then overall, we get a pretty solid result, I think.

446
00:23:51,360 --> 00:23:53,400
At the end, it takes 25 minutes to work.

447
00:23:54,060 --> 00:23:55,440
Where does the season start and whatnot,

448
00:23:55,560 --> 00:23:58,460
you have a spreadsheet that you can quickly view inside,

449
00:23:59,160 --> 00:24:00,480
just right inside ChatGPT.

450
00:24:01,240 --> 00:24:01,980
You can map the journey.

451
00:24:02,540 --> 00:24:03,640
Cool looking map, I guess.

452
00:24:04,020 --> 00:24:04,700
And that's it.

453
00:24:04,900 --> 00:24:06,220
So this is ChatGPT Agent.

454
00:24:06,440 --> 00:24:07,420
We hope you really like it.

455
00:24:07,560 --> 00:24:08,080
And over to Sam.

456
00:24:09,540 --> 00:24:10,000
Amazing work,

457
00:24:10,200 --> 00:24:11,440
all of you and to your teams.

458
00:24:11,660 --> 00:24:13,240
This is, I think, really something that's

459
00:24:13,240 --> 00:24:15,900
going to help people get work done and have more time

460
00:24:15,960 --> 00:24:16,860
to do the things they want to

461
00:24:16,860 --> 00:24:17,040
do.

462
00:24:17,460 --> 00:24:19,540
I think it's really amazing how much you've brought together

463
00:24:19,780 --> 00:24:20,960
to deliver this experience.

464
00:24:21,380 --> 00:24:23,900
And watching the agent sort of use the internet,

465
00:24:24,220 --> 00:24:26,040
make these spreadsheets, make PowerPoints, whatever else,

466
00:24:27,060 --> 00:24:28,540
and do all this work is quite amazing.

467
00:24:29,100 --> 00:24:32,540
We're going live today for pro, plus, and team users.

468
00:24:33,120 --> 00:24:35,340
Pro users will get 400 queries a month.

469
00:24:35,480 --> 00:24:37,240
Plus and team users will get 40 a month.

470
00:24:37,880 --> 00:24:42,120
The rollout should be finished by the end of the day for Pro and very soon for Plus and Team users.

471
00:24:42,550 --> 00:24:46,280
We'll try to be live for Enterprise and EDU by the end of this month.

472
00:24:47,240 --> 00:24:51,660
As Casey mentioned, although this is an extremely exciting new technology, there are new risks.

473
00:24:52,680 --> 00:24:56,380
People learned how to use the internet generally pretty safely, although of course there are still

474
00:24:56,680 --> 00:25:01,280
scammers and other attacks. People are going to need to learn to use AI agents and society's going

475
00:25:01,280 --> 00:25:05,759
to need to learn to build up defenses against attacks on AI agents as well. So we're starting

476
00:25:05,840 --> 00:25:10,520
with a very robust system, lots of warnings. We will relax that over time as people get more

477
00:25:10,720 --> 00:25:15,460
comfortable with it, but we do want people to treat this as a new technology and a new risk surface

478
00:25:15,800 --> 00:25:15,960
and

479
00:25:15,960 --> 00:25:20,960
use all of the caution that Casey talked about. But that said, we hope you'll love it.

480
00:25:21,880 --> 00:25:26,440
This is still very early. We will improve it rapidly and we're excited to see where it all goes.

481
00:25:26,900 --> 00:25:28,820
So congrats again. Thank you very much. Hope you enjoy.

```

＆

```

### 議事の要旨:

本日、**ChatGPT Agentが正式に発表**された。この新機能は、従来提供されていた**Deep ResearchとOperatorの能力を統合し、さらに発展させたもの**である。ユーザーは、AIが自律的にコンピュータを操作し、ブラウジング、ターミナル操作、ファイル生成（スプレッドシート、スライド等）といった複雑なタスクを長期間にわたって実行する様子をリアルタイムで確認できる。デモンストレーションでは、結婚式の準備、オリジナルグッズ（ステッカー）の作成・発注、さらには自己評価レポートの作成といった多様なタスクを遂行する能力が示された。技術的には、テキストブラウザ、GUIブラウザ、ターミナルを含む統一されたツールボックスへのアクセスを強化学習によって実現しており、API連携による**Google Drive等のプライベートデータソースへのアクセスも可能**である。一方で、プロンプトインジェクションといった**新たなセキュリティリスク**も存在するため、ユーザーは機密情報の扱いに注意し、テイクオーバー機能などを活用して慎重に利用することが推奨されている。本機能は本日よりPro、Plus、Teamユーザー向けに順次展開される。

## [**ChatGPT Agentの発表と概要**]

### 導入と開発経緯:

  - **ChatGPT Agentの紹介** [Sam][00:00:11,520]
      - チームメンバーの紹介 [Sam][00:00:18,260]
          - Yash: Agentチーム所属、元Operator担当 [Yash][00:00:19,060]
          - Zhixing: Agentリサーチ担当、元Deep Research担当 [Zhixing][00:00:25,080]
          - Casey: Agentリサーチャー、元Operator担当 [Casey][00:00:29,220]
          - Isa: Agentリサーチャー、元Deep Research担当 [Isa][00:00:32,850]
  - **開発の背景** [Sam][00:00:37,400]
      - 既存エージェント機能（Deep Research, Operator）への高い評価 [Sam][00:00:40,870]
          - AIが複雑なタスクを代行する可能性にユーザーが興奮した [Sam][00:00:45,100]
      - **ユーザーからの真の要望の明確化** [Sam][00:00:49,670]
          - 複数の能力を統合した単一のエージェントを求める声が多かった [Sam][00:00:54,240]
              - ユーザーは、AIが自らのコンピュータを使い、思考からツールの使用（ターミナル、Webクリック）、成果物（スプレッドシート、スライド）の作成までをシームレスに行うことを望んでいた [Sam][01:00,020]
              - この要求に応えるため、チームは多目的なタスクを長時間にわたり実行できるエージェントの開発に取り組んだ [Sam][01:12,960]
  - **ChatGPT Agentの発表** [Sam][01:20,820]
      - チームの努力の結晶としてChatGPT Agentが完成した [Sam][01:17,780]
          - 口頭での説明よりも、実際の動作を見せる方が分かりやすいと判断 [Sam][01:22,940]
              - 実際の動作を見ることは、非常に感動的な体験であると述べた [Sam][01:25,980]

## [**デモンストレーションと機能解説**]

### デモ1: 結婚式の計画支援

  - **タスク設定とプロンプト入力** [Yash][01:35,600]
      - ChatGPTのAgentモードを有効化 [Yash][01:41,760]
          - ツールメニューから「Agent」を選択するか、入力欄に「Agent」とタイプすることで起動可能 [Yash][01:45,940]
      - **結婚式参加のための準備をエージェントに依頼** [Yash][01:51,500]
          - 友人（MinyaとSarah）の結婚式に向け、服装の選定とギフトの購入をタスクとして設定 [Yash][01:58,170]
          - 事前に用意した詳細なプロンプトをペーストして実行 [Yash][02:04,200]
              - プロンプトの要件: ドレスコードに合った服装の提案（複数）、会場と天候の考慮、ホテルの検索、ギフトの選定 [Yash][02:11,870]
  - **エージェントの動作開始と環境設定** [Yash][02:33,920]
      - エージェントは自身のコンピュータ環境をセットアップしてからタスクを開始する [Yash][02:36,810]
          - 環境設定には約5秒程度を要する [Yash][02:40,280]
      - **エージェントによる初期分析と自律的判断** [Yash][02:45,360]
          - プロンプトを理解し、当初は結婚式の日付について明確化を求めた [Yash][02:48,280]
              - ユーザーの介入なしに、ウェブサイトから情報を取得して自律的に問題を解決すると判断し、タスクを続行 [Yash][02:51,120]
  - **エージェントのツール活用と思考プロセス** [Yisa][03:09,020]
      - **仮想コンピュータと搭載ツール** [Yisa][03:11,780]
          - エージェントは、様々なツールがインストールされた専用の仮想コンピュータにアクセスできる [Yisa][03:14,740]
              - ChatGPTのUIには、エージェントのコンピュータ画面と思考プロセス（Chain of Thought）がリアルタイムで表示される [Yisa][03:22,200]
      - **ブラウジング機能** [Yisa][03:34,920]
          - テキストブラウザ: Deep Researchと同様のツールで、多数のWebページを高速に読み込み検索するのに適している [Yisa][03:38,220]
          - ビジュアルブラウザ: Operatorと同様のツールで、UIの操作（クリック、ドラッグ、フォーム入力）が可能 [Yisa][03:50,140]
      - **ターミナルとAPI連携** [Yisa][04:08,860]
          - コードの実行、ファイル（スライド、スプレッドシート）の生成・分析が可能 [Yisa][04:11,600]
          - **APIを通じてGoogle Drive, Github, SharePointなどのプライベートデータソースに接続可能（要ユーザー許可）** [Yisa][04:20,310]
          - ImageGen APIを使用して、スライド用のビジュアルなどを生成できる [Yisa][04:33,540]
  - **モデルのトレーニングとツール選択** [Zhixing][04:45,760]
      - **強化学習によるツール連携の実現** [Zhixing][04:45,760]
          - テキストブラウザ、GUIブラウザ、ターミナルを統合したツールボックスを扱える初のモデル [Zhixing][04:49,860]
          - 複数のツール使用を必要とする困難なタスクを厳選し、学習データとして使用 [Zhixing][04:59,940]
              - これにより、モデルは各ツールの使用方法だけでなく、**タスクに応じて最適なツールを選択する能力**を獲得した [Zhixing][05:05,800]
      - **学習によるツール選択の最適化** [Zhixing][05:12,980]
          - 初期段階では単純な問題にも全ツールを使おうとするが、学習を通じて効率的で賢いツール選択が可能になる [Zhixing][05:20,220]
              - 例：レストラン予約では、まずテキストブラウザで候補を検索し、次にGUIブラウザで写真確認や予約を行う [Zhixing][05:28,980]
              - 例：成果物作成では、Webでリソースを検索し、ターミナルでコードを編集・コンパイルし、GUIブラウザで最終確認を行う [Zhixing][05:50,340]
  - **開発の歴史的背景と統合の意義** [Casey][06:16,380]
      - **OperatorとDeepResearchのリリース** [Casey][06:18,090]
          - Operator（1月リリース）: 予約やメール送信などのオンラインタスクを実行するエージェント [Casey][06:21,260]
          - DeepResearch（同2週間後リリース）: 詳細なインターネットリサーチと高品質なレポート作成ツール [Casey][06:33,620]
      - **両アプローチの補完性の認識** [Casey][06:43,210]
          - **Operatorの課題**: 長文記事の読解に時間がかかる（スクロールが必要）→ DeepResearchが得意とする領域 [Casey][06:49,200]
          - **DeepResearchの課題**: インタラクティブなWebページの操作が不得意 → Operatorが得意とする領域 [Casey][06:57,819]
      - **顧客フィードバックからの示唆** [Casey][07:15,420]
          - DeepResearchへの最多要望の一つが「認証付きサイトへのログイン機能」であり、これはOperatorが持つ機能だった [Casey][07:18,180]
          - Operatorのプロンプトには、「旅行を計画して予約する」といったDeepResearch的な複合タスクが多く見られた [Casey][07:31,560]
              - これらの要因から、両者の長所を統合することが最良の解決策であると結論付けられた [Casey][07:41,760]
  - **デモ1の進捗確認** [Sam][07:55,100]
      - タスクの進捗をリアルタイムで確認できることの価値を強調 [Sam][07:56,280]
      - **エージェントの具体的な行動履歴** [Yash][08:08,840]
          - 過去のログを遡って確認できる機能を紹介 [Yash][08:18,200]
              - ウェブサイトからテキストブラウザで情報を抽出 [Yash][08:21,400]
              - Edwardのスーツを探す際には、見た目を確認するためにビジュアルブラウザに切り替え [Yash][08:29,160]
              - その後、ギフトの選定セクションに進んでいることを確認 [Yash][08:43,440]

### デモ2: オリジナルステッカーの作成と発注

  - **モバイルからのタスク依頼** [Yash][08:54,280]
      - チームのマスコット（同僚の犬、Bernie Dool）のラップトップ用ステッカー作成を依頼 [Yash][09:03,060]
      - **長時間のタスク中にユーザーが介入できることの重要性**を説明 [Yash][09:13,400]
          - エージェントとの対話（明確化、確認）のために、モバイルデバイスからの操作が便利であると紹介 [Yash][09:22,400]
      - **プロンプト入力と実行** [Yash][09:32,000]
          - ChatGPTモバイルアプリのAgentモードを使用 [Yash][09:36,990]
          - マスコットの画像をアップロードし、「1x1のラップトップステッカーを500枚注文して」というプロンプトを入力。過去に使用したSticker Muleを推奨 [Yash][09:44,610]
  - **エージェントの動作と機能の割り込み（Interrupt）** [Yash][10:02,280]
      - エージェントがステッカー用のアニメアート作成を開始（ImageGen API使用） [Yash][10:16,880]
      - **進行中のタスクへの割り込み** [Yash][10:27,820]
          - ステッカー作成中に、並行してEdwardの靴を探すよう追加で指示 [Yash][10:30,700]
          - 「男性用の黒のドレスシューズ、サイズ9.5を探して」と追加入力 [Yash][10:38,390]
      - **割り込みに対するエージェントの応答** [Yash][11:08,220]
          - モデルは進行中のタスクを維持しつつ、新たな要求を理解し計画に組み込む [Yash][11:10,560]
              - **「承知しました。サイズ9.5の男性用黒の靴もリサーチします」と応答し、タスクを続行** [Yash][11:27,740]
  - **協調的インタラクションの重要性** [Isa][11:39,050]
      - **人間同士の協業の模倣** [Isa][11:40,150]
          - 長時間タスクでは、人間同士が対話するように、ユーザーとエージェント双方がコミュニケーションを開始できることが重要 [Isa][11:46,820]
              - 指示の追加、状況確認、軌道修正などが可能であるべき [Isa][12:03,040]
      - **モデルに組み込まれた協調性** [Isa][12:23,760]
          - モデルは、明確化のための質問、割り込みへの対応、タスク途中での確認要求を行うように訓練されている [Isa][12:25,140]
  - **間違いの防止とユーザーによる制御** [Casey][12:41,040]
      - **重要なステップでの最終確認** [Casey][12:45,360]
          - エージェントは間違いを犯す可能性があるため、メール送信前などに最終確認を求めるように設計されている [Casey][12:52,680]
      - **テイクオーバー機能による直接介入** [Casey][12:59,520]
          - ユーザーはエージェントの作業を修正するため、ブラウザを直接操作してエージェントの環境に介入（テイクオーバー）できる [Casey][13:06,000]
              - これにより、エージェントとの真の協業が実現する [Casey][13:12,700]

### デモ3: 自己評価レポートの自動生成

  - **タスク設定: モデル自身の評価レポート作成** [Zhixing][13:36,050]
      - エージェントに対し、**Google Driveから自身の評価データを取得し、スライドを作成するよう指示** [Zhixing][13:41,270]
          - 指示内容：導入や結論は不要で、チャートを用いて結果のみを提示すること [Zhixing][13:47,940]
  - **エージェントの実行プロセス** [Zhixing][13:54,620]
      - Google Drive APIに接続し、関連ファイルを検索・読込 [Zhixing][13:57,460]
      - **ImageGenツールを使用してスライドの装飾用画像を生成** [Zhixing][14:22,000]
      - ターミナルでコードを記述し、スライドをコンパイル [Zhixing][14:38,920]
  - **自己レビューと改善プロセス** [Zhixing][14:51,220]
      - 初期生成されたスライドは内容は正しいが、洗練さに欠けていた [Zhixing][14:49,280]
      - **強化学習の重要な特徴として、エージェントは自らの成果物をレビューし、より良い最終結果を目指して改善を行う** [Zhixing][14:53,320]
      - 最終的に、ダウンロード可能なPowerPointファイル(.pptx)として高品質なスライドを生成 [Zhixing][15:07,420]

## [**モデルの性能評価（ベンチマーク）**]

### インテリジェンスベンチマーク

  - **Humanity's Last Exam** [Zhixing][15:32,060]
      - AIの広範な知識と問題解決能力を測定するベンチマーク [Zhixing][15:35,300]
      - **結果：ツールを使用することで、性能がほぼ倍増し42%に到達** [Zhixing][15:48,080]
          - 不正行為（チート）を防ぐため、2層の汚染除去策を講じている [Zhixing][16:05,570]
  - **Frontier Maths** [Zhixing][16:12,620]
      - 高度な数学的推論能力を測定するベンチマーク [Zhixing][16:12,620]
      - **結果：ブラウザ、コンピュータ、ターミナル等の全ツールを活用し、27%という新記録（SOTA）を達成** [Zhixing][16:30,480]

### エージェント能力ベンチマーク

  - **WebArena** [Zhixing][16:43,640]
      - 実世界のWebタスクを解決する能力を測定 [Zhixing][16:43,640]
      - 結果：旧モデル（O3）の性能を上回る [Zhixing][16:50,120]
  - **BrowseComp** [Zhixing][16:56,520]
      - 情報検索・特定能力を測定するベンチマーク [Zhixing][17:02,020]
      - **結果：O3やDeep researchを大幅に上回り、69%の合格率を達成** [Zhixing][17:07,439]

### 実世界応用ベンチマーク

  - **SpreadsheetBench** [Zhixing][17:23,299]
      - 実世界のユースケースに基づいたスプレッドシート編集能力を測定 [Zhixing][17:23,299]
      - **結果：ターミナルで直接Excelファイルにアクセスすることで、性能が45%に向上** [Zhixing][17:39,100]
  - **社内バンキングベンチマーク** [Zhixing][17:48,920]
      - 投資銀行アナリスト（1～3年目）レベルのタスク遂行能力を評価 [Zhixing][17:52,830]
          - 例：Fortune 500企業の3ステートメント財務モデル作成 [Zhixing][18:01,550]
      - **結果：Deep ResearchやO3モデルを大幅に上回る性能を記録** [Zhixing][18:08,620]
  - **総合評価** [Zhixing][18:15,280]
      - ベンチマーク性能だけでなく、推論、ブラウジング、実世界タスクへの対応能力において、過去にないレベルの強力なモデルであると結論 [Zhixing][18:21,200]

## [**セキュリティとリスク管理**]

### 新たな脅威: プロンプトインジェクション

  - **インターネット利用に伴うリスク** [Casey][18:34,960]
      - モデルの強力な能力の多くはインターネット閲覧能力に由来するが、インターネットには詐欺やフィッシングなどの危険が伴う [Casey][18:39,990]
  - **プロンプトインジェクションの脅威** [Casey][18:55,860]
      - 悪意のあるWebサイトが、エージェントに対して「タスクに役立つからクレジットカード情報を入力しろ」といった偽の指示を与える攻撃 [Casey][19:02,160]
          - 人助けをするように訓練されたエージェントは、この指示に従ってしまう可能性がある [Casey][19:16,560]
  - **対策と緩和策** [Casey][19:23,040]
      - **モデル訓練**: 不審なウェブサイトからの疑わしい指示を無視するようにモデルを訓練 [Casey][19:27,120]
      - **監視システム**: エージェントの動作を監視するモニターを複数層配置し、不審な挙動があればプロセスを停止させる [Casey][19:32,020]
      - **リアルタイム更新**: 新たな攻撃手法が発見された場合、監視システムをリアルタイムで更新可能 [Casey][19:43,220]
  - **ユーザーへの注意喚起** [Casey][19:49,040]
      - **全ての攻撃を防ぐことは不可能であると明言** [Casey][19:49,040]
      - ユーザーはAgent利用に伴うリスクを認識し、情報の共有方法について主体的に考えることが重要 [Casey][19:55,120]
          - **機密性の高い情報（クレジットカード情報など）は直接エージェントに渡さず、テイクオーバー機能などを使って自分で入力することを推奨** [Casey][20:05,980]
  - **総合的な見解** [Sam][20:27,940]
      - AIエージェントの利用は新たな能力をもたらすが、同時に新たな攻撃対象にもなり得る [Sam][20:30,940]
      - 社会とテクノロジーは、まだ想像もできないような攻撃に対する防御策を共に進化させ、学んでいく必要がある [Sam][20:34,660]

## [**最終デモ確認と追加事例**]

### デモ2（ステッカー）の最終結果確認

  - **タスク完了報告** [Yash][20:47,000]
      - 約7分でタスクが完了し、最終結果としてSticker Muleのカートに商品が追加された状態が提示された [Yash][21:07,100]
      - 金額が提示され、ユーザーが最終確認と決済を行える状態になっている [Yash][21:19,420]
      - **ユーザーはここでテイクオーバーし、自分でクレジットカード情報を入力して注文を完了できる** [Yash][21:24,380]
  - **生成された成果物の確認** [Yash][21:33,340]
      - 途中で生成されたマスコットのステッカーデザインが非常に可愛い出来栄えであったことを確認 [Yash][21:37,260]

### デモ1（結婚式計画）の最終結果確認

  - **タスク完了報告** [Yash][21:52,500]
      - タイミングよくタスクが完了し、ホテル、スーツ、靴に関する包括的なレポートが生成された [Yash][21:54,280]
  - **レポート内容の詳細** [Yash][22:06,320]
      - 結婚式の会場、日付、リンク情報 [Yash][22:09,580]
      - ドレスコードに基づいたスーツの推奨と購入先リンク [Yash][22:14,000]
      - 靴、ホテルの選択肢。**https://www.google.com/search?q=%E3%83%9B%E3%83%86%E3%83%AB%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6%E3%81%AFbooking.comで空室状況を確認した際のスクリーンショットも含まれる** [Yash][22:24,300]
      - ギフトの提案と、さらなる調整や購入支援が必要な場合は指示を待つ旨のメッセージ [Yash][22:39,780]

### 追加事例: MLB全30球場巡回プラン作成

  - **タスク設定** [Yash][22:54,860]
      - MLB好きの友人のために、全30球場を巡る最適な旅程の作成を依頼 [Yash][23:00,120]
          - 条件：最適なルート設計、ハローキティナイトの優先、最終計画を詳細なスプレッドシートで提出 [Yash][23:11,100]
  - **実行プロセスと成果物** [Yash][23:18,080]
      - ターミナル、ブラウザなど複数のツールを駆使して25分かけてタスクを遂行 [Yash][23:26,480]
      - 最終成果物として、ChatGPT内で直接閲覧可能なスプレッドシートと、旅程の地図が生成された [Yash][23:55,560]

## [**まとめと今後の展開**]

### 総括

  - **チームへの称賛** [Sam][24:09,540]
      - チームの素晴らしい仕事により、ユーザーがより多くの時間を創出できる革新的な体験が実現したと評価 [Sam][24:11,660]
  - **ChatGPT Agentの能力** [Sam][24:21,380]
      - インターネットの利用、スプレッドシートやPowerPointの作成など、エージェントがこなす作業は非常に素晴らしいものである [Sam][24:24,220]
  - **リリース計画** [Sam][24:29,100]
      - **Pro, Plus, Teamユーザー向けに本日より提供開始** [Sam][24:29,100]
          - Proユーザー: 月400クエリ [Sam][24:33,120]
          - Plus, Teamユーザー: 月40クエリ [Sam][24:35,480]
      - Proユーザー向け展開は本日中に完了予定。Plus, Team向けも近日中に完了 [Sam][24:37,880]
      - Enterprise, EDU向けには今月末までの提供開始を目指す [Sam][24:42,550]
  - **最終的な注意喚起と展望** [Sam][24:47,240]
      - エキサイティングな新技術であると同時に、新たなリスクも伴うことを再度強調 [Sam][24:47,240]
      - **これはまだ初期段階であり、今後急速に改善していく** [Sam][25:21,880]
      - ユーザーには、この新技術と新たなリスクに注意深く対応しつつ、その可能性を楽しんでほしいと締めくくった [Sam][25:26,900]

```

全部束ねて処理してね


TANREN佐藤の所管は以下の通り

```

サムアルトマンさんも登場して
スタート⭐️

Introduction to #ChatGPT #agent
佐藤 勝彦（TANREN_CEO)┃生成AIエバンジェリスト
@jrpj2010
·
44分
さて、ChatGPT Agentとは・・・

おお、いつものツールに[Agent]ができている

Introduction to #ChatGPT #agent
佐藤 勝彦（TANREN_CEO)┃生成AIエバンジェリスト
@jrpj2010
·
42分
Can you help me find:
- An outfit that matches the dress code for all the functions (mens)
- Propose like five options. Something nice, mid luxury items which match the venue, and weather
- Find me hotels with couple of days of buffer on either end
- Use http://booking.com

DeepLで翻訳
さらに表示
佐藤 勝彦（TANREN_CEO)┃生成AIエバンジェリスト
@jrpj2010
·
42分
API呼び出しもできるって、コネクタ連携も可能(=MCP)

Introduction to #ChatGPT #agent
佐藤 勝彦（TANREN_CEO)┃生成AIエバンジェリスト
@jrpj2010
·
40分
Code InterPriterのように
仮装環境をつくって、その中でセキュアに処理

そして長そうね・・・
作業自体は寝て待てレベルなのか？
気になる、処理を待ってるわけだからそれなりの速さで終える想定なのか・・・

Introduction to #ChatGPT
佐藤 勝彦（TANREN_CEO)┃生成AIエバンジェリスト
@jrpj2010
·
38分
認証付きページへもログインできるようにしてるとのこと

Introduction to #ChatGPT #Agent
佐藤 勝彦（TANREN_CEO)┃生成AIエバンジェリスト
@jrpj2010
·
37分
なるほど、[LIVE]のストリーミングを遡って確認も可能なご様子

Introduction to #ChatGPT #Agent https://


佐藤 勝彦（TANREN_CEO)┃生成AIエバンジェリスト
@jrpj2010
·
30分
プロンプト：
Pull the ChatGPT agent eval numbers from google drive connector and make slides. No introduction or conclusion are needed. Just present results
charts
---
Google

DeepLで翻訳
さらに表示
佐藤 勝彦（TANREN_CEO)┃生成AIエバンジェリスト
@jrpj2010
·
29分
Agentモードの精度に関して
o3モデルをはるかに凌駕

#grok4heavy は眼中になし？

Introduction to #ChatGPT #Agent
佐藤 勝彦（TANREN_CEO)┃生成AIエバンジェリスト
@jrpj2010
·
27分
”プロンプト・インジェクション”を脅威と発言。

Introduction to #ChatGPT #Agent
佐藤 勝彦（TANREN_CEO)┃生成AIエバンジェリスト
@jrpj2010
·
25分
#DeepOperator 使って悪さする人も
絶対いるよね。

Introduction to #ChatGPT #Agent https://
佐藤 勝彦（TANREN_CEO)┃生成AIエバンジェリスト
@jrpj2010
·
23分
ワンチャンステッカーの発注うできたようですね
完遂するまで7分らしい

使うかなぁ
EC操作をして、物を買いたいニーズ・自動化したいニーズって定量データありますかね・・・
個人的には謎
（法人的にはまとめて発注のシステムが走ってますからね）

Introduction to #ChatGPT #Agent
佐藤 勝彦（TANREN_CEO)┃生成AIエバンジェリスト
@jrpj2010
Team プランにも提供きた！

Teamプランのコスパがもう異常だよね。
Google Workspace もだけど。。。

Proは今日から使える模様。

あ、本日終了ですね。

Introduction to #ChatGPT #Agent

```


ここまで全部
