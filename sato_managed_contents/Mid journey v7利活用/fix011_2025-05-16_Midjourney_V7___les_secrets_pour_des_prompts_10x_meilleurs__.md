```
# Midjourney V7 : les secrets pour des prompts 10x meilleurs !
## 概要
このビデオでは、**Midjourney V7**でより良い**prompt**を作成するための高度なテクニックを解説します。基本構造、**Midjourney**の「**archétype**（アーキタイプ）」の理解と扱い方、Botに正確に意図を伝えるための言葉選び、そして画像に欲しい要素を明確に記述することの重要性が中心です。句読点の影響についても触れられています。

## 主要なポイント
- **Prompt**は「主題」「状況（場所、アクション）」「スタイル」の構造で整理すると効果的。
- **Midjourney**には学習データに基づくデフォルトイメージ（**archétype**）があり、これを理解して利用または回避する必要がある。
- 抽象的・感覚的な言葉は避け、具体的で視覚的な言葉で記述することがBotへの伝わりやすさを高める。
- 画像に含めたい要素は具体的に要求し、Botが勝手に補完する「空虚」をなくすことが重要。
- **Prompt**内の句読点一つで画像の解釈が変わることがあるため注意が必要。

## 詳細内容
### Midjourney V7におけるプロンプトの基本構造 [00:39]
**Midjourney V7**で効果的な**prompt**を作成するための出発点として、基本的な構造が推奨されます。これは、まず画像に含めたい「主題」、次にその「状況」（場所やアクション）、そして最後に「スタイル」（テキスト、**SRF**、**moodboard**、参照画像など）を記述するという構成です。この構造は絶対ではありませんが、慣れると**prompt**作成が効率化されます。**Midjourney**は**prompt**の先頭に近い単語をより重視する傾向があるため、単語の順序も考慮に入れる価値があります。**V7**は以前のバージョンよりも**prompt**への追従性が向上しているため、ユーザー自身が画像をコントロールするための詳細な記述がより重要になっています。
解説者 [00:39]

### アーキタイプ的プロンプトの理解と対処 [03:29]
#### アーキタイプの定義と具体例 [03:31]
**Midjourney**は、その学習データに基づいて特定の概念に対する支配的なイメージ、すなわち「**archétype**（アーキタイプ）」を持っています。例えば、「**cowboy**」という単語は帽子をかぶったイメージ、「**docteur**」は聴診器や白衣を持ったイメージ、「**magicien**」は長い白い髭と髪（ガンダルフやダンブルドアのような）といったデフォルトの表現をトリガーします。
解説者 [03:31]

#### アーキタイプを回避し、意図した画像を生成する方法 [05:53]
**Midjourney**が生成するアーキタイプから外れた画像を生成したい場合は、そのアーキタイプをトリガーする問題のある単語（**token**）を特定し、それを使わずに詳細な描写で意図を伝える必要があります。例えば、帽子をかぶっていないカウボーイが欲しい場合、「**cowboy**」という単語を避け、ブーツやリボルバーといった特徴を具体的に記述します。このような代替表現を考える際には、**ChatGPT**のような言語モデルが役立ちます。また、`--no`パラメータ（**negative prompt**）も試すことができますが、アーキタイプが強い場合は完全に抑制できないことがあります。
解説者 [05:53]

#### アーキタイプの利点と活用 [09:29]
一方で、アーキタイプを意図的に利用することで、**prompt**を効率化することも可能です。「Lumberjack（木こり）」のように、一つの単語でひげ、チェックシャツ、斧、森といった多くの関連要素を含む画像を生成できます。**Midjourney**が処理できる**token**数には限りがあるため、アーキタイプを活用することで**prompt**を短く保ち、他の詳細を追加する余地を増やすことができます。アーキタイプを利用するか回避するかは、生成したい画像の具体的な要件に応じて使い分けることが重要です。
解説者 [09:29]

### Midjourney Botに正確に意図を伝える言葉選び [11:42]
#### 避けるべき言葉と理由 [14:40]
**Midjourney** Botは視覚的な情報を処理するため、Botにとって解釈が難しい抽象的・感覚的な言葉は避けるべきです。「lugubre（陰鬱な）」や「angoissant（不安な）」といった感情や雰囲気、「parfum（香水）」や「bourdonnement（ブンブンいう音）」といった感覚、そして接続詞や時間表現などは「chaotiques **token**」となり、意図した結果につながらない可能性が高いです。富を示す「richesse」のような概念も、「ネックレス」や「金の時計」といった具体的な視覚要素で記述する必要があります。また、無効または効果が薄いとされる技術的な品質用語（HD、4K、high quality）も避けるべきです。**Midjourney**は画像生成にかけられる時間に限りがあるため、無駄な**token**を省いて**prompt**を最適化することが推奨されます。
解説者 [14:40]

#### 効果的な言葉のカテゴリー [15:50]
**Midjourney**が理解しやすい、効果的な言葉のカテゴリーとして、質感、色、形、環境（天候など）、サイズ、芸術様式（例: キュビスム、印象派）、メディアの種類（漫画、写真）、写真スタイル（例: ポラロイド、魚眼レンズ）、アーティスト名（例: ピカソ、ゴッホ）、技法（例: 油絵、水彩）、そして時代などが挙げられます。これらの単語はBotが明確に理解し、画像に反映させやすい要素です。
解説者 [15:50]

### 欲しい要素を具体的に要求することの重要性 [16:45]
#### Midjourneyは「空虚」を補完する [16:51]
**Midjourney**は**prompt**に記述されていない要素があると、それを勝手に補完しようとします。これは、ユーザーが意図しない結果（例: 髪の色がランダムになる、背景の重要なオブジェクトが消える）を招く可能性があります。これを避けるためには、画像に含めたい要素を具体的に、詳細に記述する必要があります。Botに「空虚」を残さないように、コントロールしたい要素はすべて**prompt**で指示します。また、「〜なし」のように欲しくないものを指定するより、欲しいものを具体的に記述する方がはるかに効果的です。
解説者 [16:51]

#### 句読点の影響 [20:50]
自然言語で**prompt**を記述する際、句読点一つでBotの解釈が大きく変わる可能性があります。例えば、「A panda eats shoots and leaves」（パンダは竹の子と葉っぱを食べる）という**prompt**では文字通りの画像が生成されますが、「A panda, shoots and leaves」のように「panda」の後にカンマを入れると、「shoots」が「竹の子」ではなく「撃つ」と解釈され、パンダが銃や弓を持っている画像が生成されることがあります。意図した画像を正確に得るためには、**prompt**における句読点の使用にも注意が必要です。
解説者 [20:50]

## まとめと今後の学習リソース [22:36]
**Midjourney V7**で成功するためには、基本構造、アーキタイプの理解、具体的な言葉選び、そして明確な記述が不可欠です。解説者は、**Midjourney**初心者向けの有料講座「SpeedJourney」を宣伝し、期間限定の割引を提供しています。この講座には、今回のビデオの続きを含むより詳細なコンテンツが含まれます。また、**Omnireference**や**SRF**のような新機能に関するビデオは、これらの機能がより安定した段階で講座に追加される予定です。**Omnireference**については、別途無料のチュートリアルビデオが提供されています。
解説者 [22:36]
```

---

# Midjourney V7 : les secrets pour des prompts 10x meilleurs !

**チャンネル:** Les Tutos Midjourney
**公開日:** 2025-05-15
**URL:** https://www.youtube.com/watch?v=6iPcevODMIU

## 説明

Voici les techniques avancées pour bien construire un prompt sur la version 7 de Midjourney. Un guide dédié aussi bien aux débutants qu’aux utilisateurs avancés.

⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️

Bénéficiez de 30% de réduction sur SpeedJourney, la formation dédiée aux débutants sur Midjourney (⚠️ Offre valable jusqu'au 18 mai 2025 à minuit) : 

➡️ https://thibaultrabeux.podia.com/speedjourney-la-formation-acceleree-pour-midjourney?coupon=MAJV7 

⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️

Pour bien prompter sur la version 7 de Midjourney, il est essentiel de structurer ses requêtes autour de trois axes : le sujet, le contexte (lieu, action), et le style (texte, image, moodboard, SREF). Cette méthode permet de mieux contrôler l’image produite et d’éviter les interprétations automatiques du modèle.

Midjourney repose sur des archétypes visuels issus de ses données d’entraînement. Ainsi, certains mots-clés comme "cowboy" ou "wizard" déclenchent des représentations par défaut (chapeau, barbe, etc.). Pour s’en détacher, il faut contourner ces termes et décrire précisément l’apparence souhaitée. À l’inverse, exploiter volontairement l’archétype permet de simplifier un prompt et de gagner en efficacité.

Pour optimiser ses résultats, il est crucial de formuler des descriptions concrètes, visuelles et précises. Les termes ambigus, abstraits ou sensoriels (sons, odeurs, concepts flous) doivent être évités. Midjourney traite chaque mot comme une tâche à accomplir, donc plus un prompt est clair et épuré, plus le résultat sera fidèle.

Enfin, certains types de mots sont particulièrement efficaces dans un prompt : textures, couleurs, formes, environnements, styles artistiques ou photographiques, noms d’artistes, techniques, époques ou types d’œuvres. L’objectif est d’orienter l’IA visuellement, en se concentrant sur ce qui peut réellement apparaître dans une image.

0:00 – Introduction
00:39 – Structure de prompt
03:29 – Prompt archétypal
11:42 – Se faire comprendre du bot
16:45 – Demander ce qu’on veut
22:36 – Conclusion

## 字幕

[00:00 - 00:03]
Bon, alors aujourd'hui, on va voir

[00:01 - 00:05]
ensemble comment bien prompter avec la

[00:03 - 00:07]
version 7 de mid-journée. Cette vidéo

[00:05 - 00:09]
que vous allez voir, ça sera juste la

[00:07 - 00:12]
première partie d'une vidéo plus longue

[00:09 - 00:14]
que je vais publier dans ma formation

[00:12 - 00:15]
speed journée, donc dédiée aux débutants

[00:14 - 00:18]
sur mid-journée. C'est une formation

[00:15 - 00:19]
dont j'ai décidé de rouvrir les portes.

[00:18 - 00:20]
Donc pour celles et ceux que ça

[00:19 - 00:21]
intéresse, j'en reparlerai à la fin de

[00:20 - 00:23]
la vidéo puisqu'il y aura une offre

[00:21 - 00:24]
avantageuse pour vous. Et là donc ce que

[00:23 - 00:26]
je vais vous montrer gratuitement sur

[00:24 - 00:27]
YouTube, c'est donc la première partie.

[00:26 - 00:29]
Donc il y en a trois dans la vraie

[00:27 - 00:30]
vidéo, la vidéo complète, mais

[00:29 - 00:31]
rassurez-vous, vous allez quand même

[00:30 - 00:33]
apprendre beaucoup de choses juste avec

[00:31 - 00:35]
cette première partie de vidéo, que vous

[00:33 - 00:37]
soyez débutant ou avancé sur mi-journée

[00:35 - 00:39]
d'ailleurs. Donc c'est parti, on va voir

[00:37 - 00:41]
comment bien prompter avec la V7. On y

[00:39 - 00:44]
va. Bon, alors voyons ensemble comment

[00:41 - 00:45]
bien prompter avec la version 7 de

[00:44 - 00:46]
mid-journée. Euh pour se faire, bah il

[00:45 - 00:48]
faut déjà comprendre bien sûr le

[00:46 - 00:50]
fonctionnement de mi-journée et on va

[00:48 - 00:52]
repartir d'une structure simple qui

[00:50 - 00:53]
était déjà d'actualité sur la V6

[00:52 - 00:55]
d'ailleurs. Donc je vais vous montrer

[00:53 - 00:57]
ça. On peut très bien repartir de cette

[00:55 - 00:59]
structure là pour des promes qui soient

[00:57 - 01:01]
déjà simples, voire même un petit peu

[00:59 - 01:03]
élaboré. Donc dans un premier temps,

[01:01 - 01:04]
quel est le sujet de l'image ? Donc ça

[01:03 - 01:06]
ça peut être le premier segment de

[01:04 - 01:08]
phrase que vous allez mettre dans votre

[01:06 - 01:10]
promte. Ensuite deuxième segment, où

[01:08 - 01:11]
est-il ? Donc où est le sujet de votre

[01:10 - 01:13]
image ? Quelle est la situation ? Donc

[01:11 - 01:15]
le background, le contexte. Et enfin en

[01:13 - 01:17]
troisème partie, en troisème segment de

[01:15 - 01:18]
prom, vous pourriez mettre le style.

[01:17 - 01:21]
Donc là, soit vous le mettez via du

[01:18 - 01:23]
texte ou alors vous pourriez aussi le

[01:21 - 01:25]
mettre via un SRF ou un moodboard, voir

[01:23 - 01:26]
une image de référence. Et vous pouvez

[01:25 - 01:28]
également cumuler toutes ces

[01:26 - 01:29]
fonctionnalités. Donc on va voir ça avec

[01:28 - 01:32]
des exemples concrets, ça sera beaucoup

[01:29 - 01:33]
mieux. avec par exemple une image aussi

[01:32 - 01:36]
simple que ça. Donc le prompt vous

[01:33 - 01:40]
l'avez à droite ici. Donc un cowboy avec

[01:36 - 01:43]
un foulard rouge. Il marche à travers un

[01:40 - 01:46]
désert de cactus au Texas. Donc ça

[01:43 - 01:48]
cowboy bah c'est le sujet. Ensuite avec

[01:46 - 01:50]
le l'écharpe rouge et cetera, l'endroit

[01:48 - 01:53]
où il marche le contexte. Donc ça c'est

[01:50 - 01:54]
la deuxième partie du prompt. Et enfin

[01:53 - 01:56]
polaroïde photographie. Donc ça c'est

[01:54 - 01:58]
bien le style. Donc on revient à la

[01:56 - 02:00]
structure que je vous ai montré

[01:58 - 02:01]
précédemment. Et donc on a bien des

[02:00 - 02:02]
images très simples hein, pour

[02:01 - 02:05]
l'instant. On est sur des pompes assez

[02:02 - 02:07]
basiques avec un cowboy avec du coup son

[02:05 - 02:09]
foulard rouge qui marche dans le désert

[02:07 - 02:11]
avec les cactus et c'est bien en mode

[02:09 - 02:13]
polaroïde. Voilà, je vous montre la

[02:11 - 02:15]
grille des quatre images que j'ai obtenu

[02:13 - 02:16]
avec ce pontte assez simple. Après

[02:15 - 02:19]
voilà, la structure que je vous propose

[02:16 - 02:20]
là, elle est assez courante mais si vous

[02:19 - 02:22]
inversez, par exemple, si vous mettez le

[02:20 - 02:23]
style avant, écoutez, c'est pas très

[02:22 - 02:24]
grave. Vous allez aussi obtenir de bons

[02:23 - 02:26]
résultats. Ce que je veux dire, c'est

[02:24 - 02:28]
que c'est pas figé. Il y a pas une seule

[02:26 - 02:30]
façon de bien prompter sur mid-journée,

[02:28 - 02:31]
mais au bout d'un moment bah c'est bien

[02:30 - 02:33]
d'avoir des schémas comme ça vous savez

[02:31 - 02:34]
vous vous promptez un petit peu

[02:33 - 02:36]
naturellement, j'ai envie de dire avec

[02:34 - 02:37]
toujours la même structure dans votre

[02:36 - 02:38]
tête. Donc c'est pour ça que moi j'aime

[02:37 - 02:40]
bien avoir toujours la même structure en

[02:38 - 02:42]
tête et ça me permet d'aller assez vite.

[02:40 - 02:43]
Mais je veux dire, ne vous focalisez pas

[02:42 - 02:45]
exactement sur celle-là si vous voulez

[02:43 - 02:47]
inverser certaines choses. Si l'ordre

[02:45 - 02:48]
démo vous semble plus naturel en mettant

[02:47 - 02:50]
par exemple le style au début, bah

[02:48 - 02:52]
écoutez c'est possible. Sachez toutefois

[02:50 - 02:54]
que généralement les mots donc les

[02:52 - 02:56]
tokens qui sont placés le plus au début

[02:54 - 02:58]
du prompt auront un peu plus de poids.

[02:56 - 02:59]
Voilà, faut le savoir. Donc gardez ça en

[02:58 - 03:01]
tête lorsque vous structurez vos

[02:59 - 03:03]
promptes. Ce qu'il faut comprendre aussi

[03:01 - 03:04]
avec cette version 7, c'est que mine de

[03:03 - 03:05]
rien, elle a quand même une meilleure

[03:04 - 03:06]
adhérence aux promes, donc une meilleure

[03:05 - 03:08]
compréhension des promes que les

[03:06 - 03:10]
précédentes versions. Et donc, c'est

[03:08 - 03:12]
important que vous contrôliez bien votre

[03:10 - 03:13]
image. Qu'est-ce que j'entends par là ?

[03:12 - 03:15]
c'estd qu'il faut que vous décriviez

[03:13 - 03:18]
quand même un maximum ce que vous voulez

[03:15 - 03:20]
pour éviter à mi-journée de compléter

[03:18 - 03:22]
par lui-même. En fait, il faut pas que

[03:20 - 03:24]
vous laissiez trop de liberté au botes.

[03:22 - 03:26]
Autrement et ben écoutez, il va inventer

[03:24 - 03:27]
des choses. Donc vous devez contrôler

[03:26 - 03:29]
votre image. Et ça, ça passe par

[03:27 - 03:31]
l'écriture du prompt. Et c'est là qu'on

[03:29 - 03:33]
va introduire la notion de prompte

[03:31 - 03:35]
archétypale. C'estàdire que si notre

[03:33 - 03:37]
prompte ne décrit pas toute la scène,

[03:35 - 03:39]
mi-journée va compléter avec ce qui lui

[03:37 - 03:40]
semble le plus probable. Donc on va

[03:39 - 03:41]
reprendre notre exemple de cowboy. Je

[03:40 - 03:43]
vous ai préparé ici un exemple

[03:41 - 03:45]
photographie d'un cowboy. Vous avez le

[03:43 - 03:46]
prompt ici. Et donc ben je vais vous

[03:45 - 03:48]
montrer la grille de quatre images. Donc

[03:46 - 03:50]
vous avez celle-là, vous avez celle-là,

[03:48 - 03:52]
celle-là ou encore celle-ci. Voilà ce

[03:50 - 03:54]
que vous remarquez évidemment c'est que

[03:52 - 03:56]
le personnage donc le cowboy a toujours

[03:54 - 03:58]
un chapeau. Pourquoi ? Et bien parce que

[03:56 - 04:00]
ça fait partie, on va dire des biais des

[03:58 - 04:01]
stéréotypes qu'à mi-journée lorsque vous

[04:00 - 04:04]
lui donnez un concept. Donc là en

[04:01 - 04:06]
l'occurrence si c'est cowboy et ben pour

[04:04 - 04:07]
mi-journée un cowboy ça a toujours un

[04:06 - 04:10]
chapeau. Donc si vous ne précisez rien

[04:07 - 04:12]
et bien mi-journée va compléter avec ce

[04:10 - 04:14]
qui lui semble le plus probable ce qui

[04:12 - 04:15]
correspond le plus au concept qu'il a de

[04:14 - 04:16]
l'élément que vous lui avez donné. Je

[04:15 - 04:18]
vous avais donné dans une précédente

[04:16 - 04:20]
vidéo par exemple l'exemple avec le

[04:18 - 04:22]
docteur où je vous avais montré cette

[04:20 - 04:23]
grille d'image. Donc vous avez le prompt

[04:22 - 04:25]
un docteur et à chaque fois vous aviez

[04:23 - 04:27]
un stéthoscope. Donc je vous remontre la

[04:25 - 04:29]
grille et globalement stéthoscope avec

[04:27 - 04:31]
aussi une blouse blanche. Voilà ça c'est

[04:29 - 04:33]
un prompt archétypal. c'estd que

[04:31 - 04:35]
mid-journée va compléter avec en fait

[04:33 - 04:37]
les stéréotypes du sujet puisque du coup

[04:35 - 04:39]
si on devait définir vraiment

[04:37 - 04:40]
l'archétype, ça serait la représentation

[04:39 - 04:42]
dominante dans les données

[04:40 - 04:44]
d'entraînement du modèle. Donc c'est la

[04:42 - 04:46]
représentation dominante d'un concept,

[04:44 - 04:47]
l'idée par défaut de ce à quoi ça

[04:46 - 04:48]
devrait ressembler. Ça marche aussi he

[04:47 - 04:51]
pour les background hein. D'ailleurs, si

[04:48 - 04:52]
vous tapez par exemple teacher, donc une

[04:51 - 04:54]
professeur, un professeur, vous allez

[04:52 - 04:56]
globalement avoir bah quelqu'un dans une

[04:54 - 04:58]
salle de classe. Donc ça pareil, ça fait

[04:56 - 04:59]
partie du cliché. Et de la même manière

[04:58 - 05:02]
hein, si on teste par exemple un

[04:59 - 05:03]
portrait photoaliste d'un magicien, donc

[05:02 - 05:05]
on peut essayer de le lancer, on va voir

[05:03 - 05:06]
ce que ça donne. Donc là, on est en

[05:05 - 05:08]
turbo mode, donc ça devrait aller euh

[05:06 - 05:10]
assez vite. Et on va voir un petit peu

[05:08 - 05:12]
la représentation archétypale d'un

[05:10 - 05:14]
magicien. Et là, je pense que vous

[05:12 - 05:16]
commencez à voir apparaître le truc et

[05:14 - 05:17]
peut-être que ça vous dit euh quelque

[05:16 - 05:18]
chose ce personnage. Alors, faut pas que

[05:17 - 05:21]
je confonde les deux, faut pas que je

[05:18 - 05:23]
dise de bêtises. Mais moi, ça me fait

[05:21 - 05:25]
fortement penser à un personnage bien

[05:23 - 05:26]
connu d'un film. Donc là, on est

[05:25 - 05:29]
peut-être, je sais pas si c'est

[05:26 - 05:30]
Dumbledore ou si c'est Gandalf ou

[05:29 - 05:31]
peut-être un petit peu des deux, mais

[05:30 - 05:33]
vous voyez que du coup la

[05:31 - 05:35]
représentation, elle est ultra cliché et

[05:33 - 05:37]
globalement vous allez avoir un vieux

[05:35 - 05:39]
mage avec une longue barbe blanche, des

[05:37 - 05:40]
longs cheveux blancs et cetera et oui,

[05:39 - 05:41]
franchement là, on est soit dans Harry

[05:40 - 05:43]
Potter, soit dans le Seigneur des

[05:41 - 05:45]
Anneaux. Donc voilà, c'est ça le prompt

[05:43 - 05:46]
archétypal et donc ces promptes un petit

[05:45 - 05:48]
peu euh clichés, alors parfois ils

[05:46 - 05:49]
peuvent être bien pratiques, mais c'est

[05:48 - 05:52]
aussi un petit peu embêtant parfois

[05:49 - 05:53]
parce que ça vachement cadrer nos

[05:52 - 05:55]
images. Alors par exemple, on peut faire

[05:53 - 05:57]
un test comment obtenir un cowboy sans

[05:55 - 05:58]
chapeau ? Alors ça c'est un vrai défi.

[05:57 - 06:00]
Est-ce que par exemple si on écrit

[05:58 - 06:02]
photographie d'un cowboy chauve ? Donc

[06:00 - 06:04]
là par exemple, on forcerait mid-journée

[06:02 - 06:06]
à nous montrer un petit peu le crâne du

[06:04 - 06:07]
personnage, et bien bah je peux vous

[06:06 - 06:09]
montrer les résultats que j'ai obtenu

[06:07 - 06:11]
ici. Bah on a bien donc là sur la grille

[06:09 - 06:13]
de 4, on a bien un cowboy qui est

[06:11 - 06:14]
chauve. Donc on le voit bien notamment

[06:13 - 06:16]
sur le côté de son crâne, il n'a pas de

[06:14 - 06:18]
cheveux mais mid-journée nous a quand

[06:16 - 06:19]
même placé un chapeau. Donc ça euh c'est

[06:18 - 06:21]
loupé, c'était une bonne idée mais ça

[06:19 - 06:23]
n'a pas fonctionné. Ensuite, est-ce

[06:21 - 06:24]
qu'on mettrait photographie d'un cow-boy

[06:23 - 06:26]
avec le paramètre no ? Donc vous vous

[06:24 - 06:28]
souvenez des promptes négatifs et hâte,

[06:26 - 06:31]
donc pas de chapeau. Et vous voyez que

[06:28 - 06:32]
malheureusement la vision archétypale de

[06:31 - 06:34]
mid-journée fait en sorte que bah le

[06:32 - 06:36]
cowboy a quand même toujours un chapeau.

[06:34 - 06:38]
Donc là le paramètre négatif n'a pas

[06:36 - 06:41]
suffi. Est-ce qu'il faut faire une photo

[06:38 - 06:43]
d'un cowboy chauve avec une longue

[06:41 - 06:45]
cicatrice sur le crâne ? Bah écoutez,

[06:43 - 06:46]
non, toujours pas. Ça n'a pas très bien

[06:45 - 06:47]
marché. Cette image là, je la trouve

[06:46 - 06:50]
vraiment très drôle parce qu'on voit

[06:47 - 06:51]
bien la lutte de mi-journée avec ces

[06:50 - 06:53]
deux concepts. On lui a demandé un

[06:51 - 06:55]
cow-boy, donc pour lui un cow-boy ça un

[06:53 - 06:56]
chapeau, mais on lui a aussi demandé une

[06:55 - 06:58]
cicatrice sur le crâne. Donc il doit

[06:56 - 06:59]
montrer les deux et du coup il m'a fait

[06:58 - 07:01]
un chapeau qui n'est pas totalement

[06:59 - 07:03]
fini. Donc on voit bien un peu la lutte

[07:01 - 07:04]
demi-journée entre le côté archétypal et

[07:03 - 07:06]
le prompte, la commande. Donc ça je

[07:04 - 07:08]
trouve ça très marrant. Et bon, celle-là

[07:06 - 07:09]
n'a pas marché non plus. Et celle-là,

[07:08 - 07:10]
voilà, celle-là a plutôt bien

[07:09 - 07:12]
fonctionné. Donc vous voyez qu'on

[07:10 - 07:13]
commence à obtenir quelque chose en

[07:12 - 07:14]
ayant des astuces comme ça. Donc si on

[07:13 - 07:16]
veut pas de chapeau, peut-être qu'il

[07:14 - 07:19]
faut décrire quelque chose au niveau du

[07:16 - 07:20]
crâne pour forcer mid-journée à retirer

[07:19 - 07:22]
le chapeau. Bien sûr, peut-être que si

[07:20 - 07:23]
on faisait un cowboy chauve avec une

[07:22 - 07:25]
cicatrice sur le haut du crâne et qu'on

[07:23 - 07:27]
rajoutait le promptte négatif, ça

[07:25 - 07:28]
permettrait donc tous ces éléments

[07:27 - 07:30]
ensemble permettraient peut-être de

[07:28 - 07:31]
surpasser un peu ce stéréotype et

[07:30 - 07:33]
l'archétype. Donc voilà, il y a des

[07:31 - 07:34]
choses comme ça à savoir, mais c'est

[07:33 - 07:36]
vrai que dans ces cas-là, si jamais vous

[07:34 - 07:38]
voulez un cowboy sans chapeau, et bien

[07:36 - 07:40]
il faut comprendre pourquoi est-ce que

[07:38 - 07:41]
midjourné chapeau à chaque fois. Donc

[07:40 - 07:43]
ça, c'est ce que je vous ai expliqué,

[07:41 - 07:46]
c'est la représentation globale du

[07:43 - 07:48]
cowboy pour midjourné. Et donc le mot,

[07:46 - 07:49]
le token problématique, bah c'est bien

[07:48 - 07:51]
cowboy. Donc là, maintenant qu'on a

[07:49 - 07:53]
compris ça, le but ça va être de créer

[07:51 - 07:54]
un cowboy sans dire le mot cowboy. Et

[07:53 - 07:55]
oui, c'est comme ça. Donc dans ces

[07:54 - 07:57]
cas-là, peut-être que vous pouvez vous

[07:55 - 07:59]
aider de chat GPT. Vous pouvez lui faire

[07:57 - 08:00]
un prom du style. J'ai besoin d'écrire

[07:59 - 08:02]
un prom pour mi-journée. Je veux obtenir

[08:00 - 08:04]
une image d'un cowboy sans chapeau. Je

[08:02 - 08:05]
veux que tu rédiges un promete détaillé

[08:04 - 08:07]
pour obtenir une image photoréaliste

[08:05 - 08:08]
d'un cowboy sans chapeau. Marchant dans

[08:07 - 08:10]
le désert, tu dois décrire tous les

[08:08 - 08:12]
accessoires traditionnels du cowboy,

[08:10 - 08:14]
botine, revolver et cetera. Voici les

[08:12 - 08:15]
contraintes à respecter. Tu ne dois pas

[08:14 - 08:17]
mentionner le mot cowboy, tu ne dois pas

[08:15 - 08:19]
mentionner le mot chapeau. Oui, ça on le

[08:17 - 08:20]
verra plus tard. Si vous dites un cowboy

[08:19 - 08:21]
sans chapeau, vous aurez un chapeau.

[08:20 - 08:23]
Mais ça, on aura l'occasion d'en parler.

[08:21 - 08:24]
Voici la structure de promptte à

[08:23 - 08:25]
respecter. Donc ça, c'est la structure

[08:24 - 08:26]
que je vous ai donné tout à l'heure.

[08:25 - 08:28]
Quel est le sujet de l'image ? où est-il

[08:26 - 08:30]
? Quelle est la situation ? Et enfin le

[08:28 - 08:33]
style. J'ai dit je veux un prompt en

[08:30 - 08:36]
anglais. Et voilà ce qu'il m'a sorti.

[08:33 - 08:38]
Donc voilà le prompt en question. Et bah

[08:36 - 08:39]
vous verrez alors je vais pas tout vous

[08:38 - 08:41]
lire le promp là, vous pourrez faire

[08:39 - 08:43]
pause si vous voulez. Il y a évidemment

[08:41 - 08:45]
pas le mot cowboy et il y a pas le mot

[08:43 - 08:47]
chapeau, mais on va dire qu'il y a tous

[08:45 - 08:49]
les éléments. Donc là il y a le pistolet

[08:47 - 08:51]
ici, spurred boots. Ça, je crois que

[08:49 - 08:54]
c'est les bottes avec les éprons à

[08:51 - 08:55]
l'arrière. Il y a le désert, il y a le

[08:54 - 08:58]
le cheval et cetera. Bref, il y a pas

[08:55 - 09:00]
mal d'éléments qui font penser au euh

[08:58 - 09:01]
cowboy, mais il y a pas le mot cowboy et

[09:00 - 09:02]
il y a pas le mot chapeau. Et à ce

[09:01 - 09:04]
moment-là, alors on va retirer ça.

[09:02 - 09:06]
Voilà, comme ça, on verra mieux. Et bah

[09:04 - 09:08]
on a ce genre d'image et là vraiment

[09:06 - 09:10]
c'est du 100 % de réussite. Cette image-

[09:08 - 09:12]
là, elle est vraiment très cool et ça

[09:10 - 09:14]
fait totalement cowboy. Et donc on a

[09:12 - 09:17]
réussi à créer un cowboy sans chapeau

[09:14 - 09:19]
avec cette astuce puisqu'on a identifié

[09:17 - 09:22]
le token problématique qui était cowboy

[09:19 - 09:24]
et on a recréé le personnage sans bah

[09:22 - 09:25]
sans prononcer le mot maudit, on va

[09:24 - 09:26]
dire. Donc voilà, je vous montre

[09:25 - 09:29]
certaines images et vous voyez que c'est

[09:26 - 09:31]
très bien réussi. Après, concernant ce

[09:29 - 09:33]
prompting archétypal, c'est pas toujours

[09:31 - 09:34]
une mauvaise chose. Parfois, c'est vrai,

[09:33 - 09:36]
ça va vous casser la tête et vous allez

[09:34 - 09:38]
avoir des éléments qui vont revenir sans

[09:36 - 09:40]
cesse et ça peut être pénible. Mais à

[09:38 - 09:43]
côté de ça, par exemple, si je prends le

[09:40 - 09:44]
prom lumberjack, donc un bûcheron, et

[09:43 - 09:45]
bien vous allez avoir, vous voyez

[09:44 - 09:47]
globalement un peu toujours la même

[09:45 - 09:49]
chose. C'est souvent un homme barbu avec

[09:47 - 09:50]
assez souvent aussi une chemise à

[09:49 - 09:51]
carreaux. Tout le temps un bonnet,

[09:50 - 09:53]
quasiment souvent une tronçonneuse

[09:51 - 09:54]
aussi. Il sera évidemment souvent dans

[09:53 - 09:56]
la forêt avec du bois derrière. Je peux

[09:54 - 09:58]
vous montrer d'autres images. Voilà.

[09:56 - 10:00]
photographie d'un bûcheron. Donc vous

[09:58 - 10:01]
avez globalement ici pareil le cliché du

[10:00 - 10:03]
bûcheron. En fait, c'est ça. Vous avez

[10:01 - 10:05]
toujours un homme avec un couvre-chef,

[10:03 - 10:06]
souvent une tronçonneuse, la chemise à

[10:05 - 10:08]
carreau et cetera. Bref, ce que je viens

[10:06 - 10:10]
de vous dire, mais ça peut être assez

[10:08 - 10:12]
pratique de faire appel à l'archétype,

[10:10 - 10:14]
donc invoquer l'archétype puisque ça

[10:12 - 10:15]
permet d'obtenir plein d'éléments en un

[10:14 - 10:17]
seul mot. Alors que là tout à l'heure,

[10:15 - 10:19]
si je reviens sur mon histoire de

[10:17 - 10:20]
cowboy, là le prompt il est énorme. Donc

[10:19 - 10:22]
ça veut dire qu'il prend déjà beaucoup

[10:20 - 10:23]
de mémoire à mi-journée, hein. Vous

[10:22 - 10:25]
savez comment ça fonctionne. Si vous

[10:23 - 10:26]
donnez beaucoup d'éléments à mi-journée

[10:25 - 10:28]
dans un prompt, il va avoir beaucoup de

[10:26 - 10:29]
tokens à traiter, beaucoup d'éléments à

[10:28 - 10:32]
intégrer dans l'image et au bout d'un

[10:29 - 10:34]
moment, sa mémoire est limitée et donc

[10:32 - 10:35]
il ne va pas pouvoir tout traiter. Donc

[10:34 - 10:37]
ça peut être pratique ici là dans notre

[10:35 - 10:38]
histoire du cowboy sans chapeau. Oui,

[10:37 - 10:40]
c'est pratique d'utiliser cette

[10:38 - 10:41]
technique mais ça bourre complètement le

[10:40 - 10:42]
prom. C'est-à-dire que là, vous avez

[10:41 - 10:44]
quasiment avec tous ces éléments pris

[10:42 - 10:45]
toute la mémoire de mi-journée qui va

[10:44 - 10:47]
pas pouvoir faire beaucoup plus. Alors

[10:45 - 10:49]
que si vous invoquez l'archétype, et

[10:47 - 10:51]
bien vous avez déjà votre bûcheron et

[10:49 - 10:53]
donc vous n'avez pas besoin de dire par

[10:51 - 10:55]
exemple que le gars a une barbe, il a

[10:53 - 10:56]
une chemise à carreaux, il a une hache,

[10:55 - 10:58]
il est dans une forêt et cetera. Donc ça

[10:56 - 11:00]
limite énormément le prompt et ça vous

[10:58 - 11:02]
permet du coup d'avoir plein d'éléments

[11:00 - 11:04]
en un seul token. Donc ça c'est vraiment

[11:02 - 11:06]
chouette. Et donc, il faut savoir

[11:04 - 11:08]
utiliser, savoir jongler avec ces deux

[11:06 - 11:10]
techniques. Parfois, il va falloir euh

[11:08 - 11:11]
détruire un peu cet archétype parce

[11:10 - 11:12]
qu'il est embêtant et parfois, va

[11:11 - 11:14]
falloir l'invoquer parce que ça va être

[11:12 - 11:15]
bien pratique et ça va nous permettre

[11:14 - 11:17]
d'avoir des promptes euh plus longs et

[11:15 - 11:18]
de pouvoir ajouter d'autres éléments.

[11:17 - 11:20]
Donc voilà, c'est important que vous

[11:18 - 11:21]
compreniez cette nuance. Donc si je dois

[11:20 - 11:23]
faire un petit récap, soit on décrit ce

[11:21 - 11:25]
qu'on veut pour mieux contrôler le

[11:23 - 11:26]
résultat quand l'archétype prend trop

[11:25 - 11:28]
haut de place. Donc il faut décrire pour

[11:26 - 11:30]
éviter de nommer le sujet qui provoque

[11:28 - 11:32]
l'archétype, par exemple cowboy, docteur

[11:30 - 11:34]
et cetera. et cela passe par une phase

[11:32 - 11:36]
d'identification du token problématique

[11:34 - 11:38]
ou alors on invoque l'archétype, ça

[11:36 - 11:39]
permet de gagner de la mémoire et

[11:38 - 11:41]
mid-journée complète les détails pour

[11:39 - 11:43]
nous. Ça nous invite de devoir tout

[11:41 - 11:44]
écrire dans le prompt. Ensuite, je

[11:43 - 11:46]
voudrais qu'on parle un peu de la

[11:44 - 11:48]
compréhension au bot. Donc comment se

[11:46 - 11:49]
faire comprendre par le mid-journée bot

[11:48 - 11:51]
? Parce que oui, forcément, on s'adresse

[11:49 - 11:53]
pas à un humain, on s'adresse à un

[11:51 - 11:54]
robot. Donc, il faut être précis et

[11:53 - 11:55]
descriptif. Peut-être qu'il y a une

[11:54 - 11:57]
question que vous pouvez vous poser

[11:55 - 12:00]
lorsque vous utilisez un mot, c'est

[11:57 - 12:02]
est-ce que vous sauriez le décrire ? Si

[12:00 - 12:04]
oui, bah écoutez, décrivez-le. Si non,

[12:02 - 12:06]
bah écoutez, ne l'écrivez pas. Prenons

[12:04 - 12:09]
par exemple ce prompte photo d'une forêt

[12:06 - 12:11]
lugubre. Donc je vais vous montrer les

[12:09 - 12:14]
images. Et bon bah globalement c'est une

[12:11 - 12:16]
forêt. Ce sont des images de forêt. Je

[12:14 - 12:18]
veux dire, il y a pas grand-chose de

[12:16 - 12:21]
particulier et on remarque pas forcément

[12:18 - 12:24]
une forêt lugubre. Pourquoi ? parce que

[12:21 - 12:25]
lugubre pour midjournée bot, ça veut pas

[12:24 - 12:27]
dire grand-chose. Donc plutôt que

[12:25 - 12:29]
d'utiliser ce genre de token, il va

[12:27 - 12:30]
falloir utiliser des tokens un peu plus

[12:29 - 12:32]
descriptif. Donc si vous voulez une

[12:30 - 12:33]
forêt un petit peu angoissante, pareil

[12:32 - 12:35]
angoissant, je pense pas que ça soit un

[12:33 - 12:37]
bon mot pour décrire une forêt, en tout

[12:35 - 12:39]
cas pour un bot. Et bien, il va falloir

[12:37 - 12:40]
plutôt utiliser des tokens comme ceci.

[12:39 - 12:43]
Par exemple, je vous remontre. Voilà,

[12:40 - 12:45]
une forêt dense avec de grands arbres

[12:43 - 12:48]
sombres, dark trees. Donc ça ça marche

[12:45 - 12:50]
par exemple avec un brouillard flottant

[12:48 - 12:51]
dans l'air. Ça pareil, le brouillard

[12:50 - 12:53]
c'est quelque chose que midjournée sait

[12:51 - 12:55]
faire et comprend. Pareil ici hein, il y

[12:53 - 12:57]
a des ombres entre les arbres et là ça

[12:55 - 12:59]
donne des euh images qui sont un petit

[12:57 - 13:02]
peu plus angoissantes. Ici effectivement

[12:59 - 13:03]
on a une forêt qui serait un peu plus

[13:02 - 13:04]
lugubre. Donc ce qu'on avait tout à

[13:03 - 13:05]
l'heure est un petit peu plus

[13:04 - 13:07]
angoissante tout simplement. Sauf qu'on

[13:05 - 13:08]
l'a pas décrit en mode c'est angoissant,

[13:07 - 13:10]
c'est lugubre parce que ça ce sont des

[13:08 - 13:12]
concepts un petit peu abstraits pour un

[13:10 - 13:13]
bote, pas pour un humain. Donc il faut

[13:12 - 13:15]
décrire ce que veut dire lugubre.

[13:13 - 13:17]
Qu'est-ce qu'on entend par lugubre ? Et

[13:15 - 13:19]
je vais vous montrer d'autres exemples.

[13:17 - 13:22]
Par exemple, si je prends photography of

[13:19 - 13:24]
a dismolfield, donc photographie en fait

[13:22 - 13:26]
d'un champ de blé sombre, triste,

[13:24 - 13:28]
lugubre un dismol, ça veut dire ça ? Et

[13:26 - 13:30]
bien vous allez avoir ce genre d'image

[13:28 - 13:31]
là. Et euh bon ben voilà, c'est un champ

[13:30 - 13:33]
de blé, il y a pas grand-chose un peu de

[13:31 - 13:35]
lugubre, de triste, enfin on n' pas

[13:33 - 13:37]
vraiment ce sentiment-là parce que le

[13:35 - 13:39]
mot dismal est mal choisi pour le coup.

[13:37 - 13:41]
Idem pour celui-là photographie d'un

[13:39 - 13:43]
champ de blé euh unreing, donc non

[13:41 - 13:44]
rassurant, pas trop rassurant. Donc là

[13:43 - 13:46]
un humain évidemment ça voudrait dire

[13:44 - 13:48]
quelque chose, mais vous voyez bien que

[13:46 - 13:49]
les images, bon c'est pas forcément très

[13:48 - 13:50]
flippant, je veux dire ce que je suis en

[13:49 - 13:52]
train de vous montrer. Alors certes,

[13:50 - 13:53]
oui, il a un petit peu d'orage mais

[13:52 - 13:55]
voilà c'est pas ça va pas très loin.

[13:53 - 13:56]
Peut-être en revanche que vous devriez

[13:55 - 13:59]
utiliser des termes comme photography of

[13:56 - 14:02]
a fogyfield. Low light. Donc là

[13:59 - 14:03]
photographie d'un champ de blé brumeux,

[14:02 - 14:05]
donc avec de la brume, une faible

[14:03 - 14:06]
luminosité. Et là, je vais vous montrer

[14:05 - 14:08]
les images. Effectivement, c'est un

[14:06 - 14:10]
petit peu plus angoissant, notamment

[14:08 - 14:11]
cette image là. Vous comprenez bien que

[14:10 - 14:13]
celle-là, elle est un petit peu plus

[14:11 - 14:14]
angoissante. Idem pour celle-là. Là, il

[14:13 - 14:16]
y a un vrai sentiment qui se dégage.

[14:14 - 14:17]
Pourquoi ? Parce que Fogi, bah ce que je

[14:16 - 14:19]
vous ai dit tout à l'heure, ça c'est un

[14:17 - 14:21]
token qui est facile à analyser pour

[14:19 - 14:22]
mid-journée et surtout facile à

[14:21 - 14:23]
retranscrire. He, c'est de la brume.

[14:22 - 14:25]
Donc ça, mid-journée, c'est très bien le

[14:23 - 14:27]
faire et l'eau light, donc faible

[14:25 - 14:29]
luminosité pareil. Donc, ce sont ce

[14:27 - 14:30]
genre d'éléments que vous devez utiliser

[14:29 - 14:32]
pour décrire ce que vous voulez et donc

[14:30 - 14:34]
éviter les trucs du genre une forêt

[14:32 - 14:35]
mystérieuse ou des choses comme ça. Pour

[14:34 - 14:37]
nous, oui, évidemment ça va nous parler

[14:35 - 14:38]
mais pour un bot c'est autre chose. Donc

[14:37 - 14:40]
là, je peux vous en montrer un des

[14:38 - 14:42]
exemples de mots à éviter. Donc euh on

[14:40 - 14:44]
appelle ça des chaotiques token. Donc

[14:42 - 14:45]
par exemple odeur et son, donc parfum,

[14:44 - 14:47]
bourdonnement, crépitement et cetera.

[14:45 - 14:48]
Voilà, même s'ils enrichissent un texte,

[14:47 - 14:50]
ils ne répondent pas à la question

[14:48 - 14:51]
visuelle à quoi ça ressemble. Donc ça

[14:50 - 14:52]
c'est ce que je vous ai montré

[14:51 - 14:54]
précédemment. les concepts abstraits,

[14:52 - 14:55]
donc une personne affichant des signes

[14:54 - 14:57]
de richesse. Donc là pareil hein, pour

[14:55 - 14:58]
nous ça va nous parler mais pour un bot

[14:57 - 14:59]
c'est pas sûr. Je dis pas que ça

[14:58 - 15:01]
marchera jamais, je dis juste que vous

[14:59 - 15:03]
aurez plus de chance de d'obtenir ce que

[15:01 - 15:04]
vous voulez avec des descriptions. Par

[15:03 - 15:07]
exemple, un collier de perles, une

[15:04 - 15:08]
montre en or, un costume et cetera. Ça,

[15:07 - 15:09]
ce sont des signes de richesse que

[15:08 - 15:11]
midjournée va pouvoir refaire

[15:09 - 15:12]
facilement. Ensuite, les mots de liaison

[15:11 - 15:15]
donc maisou donc hornicar et cetera

[15:12 - 15:17]
éviter. Les mots temporels ensuite après

[15:15 - 15:19]
avant ça marche pas. Contrairement à

[15:17 - 15:20]
background, foreground et cetera, ça ça

[15:19 - 15:22]
fonctionne mais c'est autre chose. Les

[15:20 - 15:23]
mots négatifs 100 à la place de ne

[15:22 - 15:25]
contient pas. On va en parler après mais

[15:23 - 15:26]
ça paraît, ça ne marche pas. Demandez ce

[15:25 - 15:27]
que vous voulez, ne demandez pas ce que

[15:26 - 15:30]
vous ne voulez pas. Et les

[15:27 - 15:31]
spécifications techniques HD, 4K, high

[15:30 - 15:32]
quality et cetera. Ça ça fait longtemps

[15:31 - 15:33]
qu'on nous a dit que ça ne marchait pas

[15:32 - 15:35]
ou en tout cas que ça ne produisait pas

[15:33 - 15:37]
les résultats que vous attendez. Ça va

[15:35 - 15:39]
produire quelque chose mais ça sera pas

[15:37 - 15:41]
forcément de la 4K, de la HD et cetera.

[15:39 - 15:42]
Donc ça c'est à éviter, ça ne sert pas à

[15:41 - 15:44]
grand-chose. Et donc comme je vous l'ai

[15:42 - 15:46]
dit, voilà, mid-journée est limité en

[15:44 - 15:48]
temps sur chaque image. Donc il faut

[15:46 - 15:50]
optimiser les tokens et donc éviter ceux

[15:48 - 15:52]
qui sont inutiles. Ceux qui fonctionnent

[15:50 - 15:53]
plutôt bien, je peux vous en montrer une

[15:52 - 15:54]
partie. Ça peut être ce genre

[15:53 - 15:56]
d'éléments. Par exemple, les textures

[15:54 - 15:57]
lisses, rugueux et cetera. Les couleurs

[15:56 - 15:59]
bien entendu, ça ça marche très bien.

[15:57 - 16:01]
Bleu, rouge, turquoise. Forme carré,

[15:59 - 16:02]
rond, triangulaire, pareil, mis journée

[16:01 - 16:04]
c'est très bien le faire. Les

[16:02 - 16:06]
environnements plus vieux, ensoleillé,

[16:04 - 16:08]
brumeux. Je vous l'ai montré avec le

[16:06 - 16:10]
fogi là. Donc notre champ de blé brumeux

[16:08 - 16:12]
et notre forêt. Donc ça ça fonctionne.

[16:10 - 16:13]
La taille petit géant microscopique tout

[16:12 - 16:15]
ça ce sont des tokens que midjournée

[16:13 - 16:17]
c'est bien retranscrire. Les mouvements

[16:15 - 16:18]
artistiques, pareil, cubisme,

[16:17 - 16:21]
impressionnisme, tout ça. Type de média,

[16:18 - 16:22]
BD, manga, photographie, ça fonctionne.

[16:21 - 16:23]
Les styles de photographie, je vous l'ai

[16:22 - 16:25]
montré, c'est le premier exemple que je

[16:23 - 16:27]
vous ai montré en mode polaroïde par

[16:25 - 16:28]
exemple. Selfie fish eye, ça

[16:27 - 16:30]
mid-journée, c'est très bien le faire.

[16:28 - 16:32]
Les artistes bien entendu, bon ça vous

[16:30 - 16:33]
le savez très bien. Picasso Vang Gog,

[16:32 - 16:35]
technique peinture à l'huile, aquarelle,

[16:33 - 16:36]
dessin crayonné, ça fonctionne. Type

[16:35 - 16:38]
d'œuvre, studio Gibli et les époque

[16:36 - 16:40]
aussi, ça fonctionne année 30, année

[16:38 - 16:41]
2000. Donc ce genre de token, vous

[16:40 - 16:43]
pouvez y aller. Ce que je vous ai montré

[16:41 - 16:45]
précédemment, évitez, ils vont bourrer

[16:43 - 16:46]
votre pome pour pas grand-chose. Donc

[16:45 - 16:48]
comme je vous l'ai dit tout à l'heure,

[16:46 - 16:49]
il faut demander ce qu'on veut voir et

[16:48 - 16:51]
ne pas demander ce qu'on ne veut pas

[16:49 - 16:52]
voir. Donc on va en parler un petit peu.

[16:51 - 16:53]
Mournée, c'est vrai, à horreur du vide.

[16:52 - 16:55]
Je vais vous afficher à l'écran un

[16:53 - 16:56]
commentaire que j'ai reçu où on me

[16:55 - 16:58]
disait donc rétro chronique me disait la

[16:56 - 17:00]
version 7 de très belles images qui

[16:58 - 17:01]
n'ont rien à voir avec nos promptes.

[17:00 - 17:02]
Quand tu arrives à enlever la casquette

[17:01 - 17:04]
à ton personnage, il lui fait des

[17:02 - 17:05]
cheveux roses. L'équipe mid-journée se

[17:04 - 17:07]
marre à trôler ses utilisateurs. OK,

[17:05 - 17:08]
donc moi là ce que je lui ai répondu,

[17:07 - 17:10]
c'est que là pour le coup c'est un souci

[17:08 - 17:12]
de prompting. Mournée à horreur du vide.

[17:10 - 17:13]
Si vous ne voulez pas lui laisser de

[17:12 - 17:15]
liberté, vous devez lui dire ce qu'il

[17:13 - 17:17]
doit faire. Donc par exemple préciser la

[17:15 - 17:18]
couleur des cheveux ici dans son

[17:17 - 17:21]
exemple. Je vais vous montrer un exemple

[17:18 - 17:22]
avec cette image là. Donc là, ce que je

[17:21 - 17:23]
voulais faire, c'était un retexture

[17:22 - 17:24]
parce que le personnage que j'ai

[17:23 - 17:25]
incrusté ici, je crois que c'était un

[17:24 - 17:27]
montage. Donc vous voyez, il est pas

[17:25 - 17:29]
très très bien intégré. Et donc j'ai

[17:27 - 17:31]
fait un retexture. Et notez bien

[17:29 - 17:33]
derrière la baie vitrée, il y a bien des

[17:31 - 17:34]
buildings au fond. Et donc au départ, ce

[17:33 - 17:36]
que j'ai fait, alors évidemment les

[17:34 - 17:37]
images sont toutes petites parce que il

[17:36 - 17:39]
y a plein d'éléments. Bref, donc là ce

[17:37 - 17:41]
que j'ai mis, donc c'est une femme

[17:39 - 17:44]
blonde assise à un bar et cetera. Elle

[17:41 - 17:45]
est habillée avec une robe noire. Ses

[17:44 - 17:47]
bras sont posés sur le bar et cetera.

[17:45 - 17:48]
Bon ça on s'en fout un peu. Et le style.

[17:47 - 17:49]
Et là, malheureusement, ce que vous

[17:48 - 17:51]
constatez, alors je vais vous montrer

[17:49 - 17:52]
sur toutes les images et à chaque fois,

[17:51 - 17:53]
il va me rajouter ça. Donc c'est pas

[17:52 - 17:56]
grave. Vous voyez quand même que euh bah

[17:53 - 17:58]
les buildings ont disparu derrière ici

[17:56 - 17:59]
également. Et bah forcément, pourquoi

[17:58 - 18:01]
est-ce qu'ils ont disparu ? Bah

[17:59 - 18:02]
peut-être tout simplement parce que je

[18:01 - 18:04]
l'ai pas précisé dans mon prompt. Il

[18:02 - 18:06]
n'est pas question de building ici en

[18:04 - 18:08]
arrière-plan. Donc ça marche aussi avec

[18:06 - 18:09]
le retexture he bien entendu. Et donc

[18:08 - 18:11]
dès lors que j'ai repris exactement le

[18:09 - 18:14]
même prompt mais que j'ai rajouté in the

[18:11 - 18:15]
background, there is a large B window.

[18:14 - 18:18]
Donc dans le background, il y a une

[18:15 - 18:20]
large B vitrée à travers laquelle on

[18:18 - 18:21]
peut voir des buildings éclairés. Et là

[18:20 - 18:22]
donc vous le voyez bien, je vais

[18:21 - 18:24]
supprimer le prond pour que l'image

[18:22 - 18:26]
augmente. Voilà, vous voyez bien les

[18:24 - 18:27]
buildings derrière. Donc évidemment si

[18:26 - 18:29]
vous ne demandez pas ce que vous voulez,

[18:27 - 18:30]
vous n'allez pas l'obtenir. Et là

[18:29 - 18:31]
vraiment, j'ai eu des résultats qui

[18:30 - 18:32]
étaient tout de suite bien meilleur

[18:31 - 18:34]
parce que on a bien des buildings qui

[18:32 - 18:36]
sont revenus à chaque fois. Voilà, par

[18:34 - 18:37]
exemple, cette image là, elle est très

[18:36 - 18:38]
bien mais en fait suffit de le demander

[18:37 - 18:39]
hein, c'est aussi bête que ça. Donc

[18:38 - 18:41]
parfois quand vous n'obtenez pas ce que

[18:39 - 18:42]
vous voulez et bien c'est peut-être

[18:41 - 18:44]
juste que vous ne l'avez pas demandé.

[18:42 - 18:46]
aussi, j'ai reçu ce mail. Bah pareil un

[18:44 - 18:47]
rétrochonique décidément donc il me

[18:46 - 18:49]
disait que la censure tout ça c'était un

[18:47 - 18:51]
petit peu un petit peu chiant. Et voilà

[18:49 - 18:53]
le promp donc une femme attractive, un

[18:51 - 18:56]
attractive young woman. En fait le but

[18:53 - 18:57]
c'était d'avoir une femme en train de se

[18:56 - 18:59]
prendre en photo, faire un selfie avec

[18:57 - 19:01]
derrière Jésus-Christ qui était

[18:59 - 19:03]
crucifié. Et je vais vous montrer

[19:01 - 19:04]
l'image. Voilà. Alors là, je vais

[19:03 - 19:06]
flouter évidemment la partie gênante,

[19:04 - 19:09]
mais on a bien une femme qui est sainnue

[19:06 - 19:11]
et donc forcément c'est quelque chose

[19:09 - 19:13]
que l'utilisateur ne voulait pas et je

[19:11 - 19:14]
comprends que ça soit un peu dérangeant.

[19:13 - 19:15]
Donc dans ce cas-là, pourquoi est-ce

[19:14 - 19:18]
qu'il a obtenu ça ? Peut-être qu'il faut

[19:15 - 19:19]
se focaliser sur le prompt et repérer

[19:18 - 19:21]
les tokens qui sont problématiques.

[19:19 - 19:23]
Est-ce que c'est un attractive young

[19:21 - 19:25]
woman ? Est-ce que c'est le token

[19:23 - 19:27]
attractive qui fait ça ? Est-ce que

[19:25 - 19:28]
c'est le mot glamorous ici qui va

[19:27 - 19:31]
inciter midjournée à faire des

[19:28 - 19:32]
personnages glamour, donc peut-être nu ?

[19:31 - 19:34]
Est-ce que c'est parce que bah Jésus a

[19:32 - 19:37]
été crucifié, quasiment nu sur la croix.

[19:34 - 19:39]
Par conséquent et bien midjournée comme

[19:37 - 19:40]
il y a un personnage nu et bien faire

[19:39 - 19:42]
plusieurs nu autour de lui. Donc voilà,

[19:40 - 19:43]
il y a plusieurs choses comme ça à

[19:42 - 19:45]
tester. Est-ce qu'il faut supprimer

[19:43 - 19:46]
certains tokens ou alors tout simplement

[19:45 - 19:48]
est-ce qu'il faut pas dire que la femme

[19:46 - 19:50]
porte une robe ou est habillée d'une

[19:48 - 19:52]
certaine façon ? Comme ça, ça va éviter

[19:50 - 19:53]
qu'elle soit nue. Ça rejoint ce que je

[19:52 - 19:55]
vous dis tout à l'heure. Vous devez

[19:53 - 19:57]
maîtriser votre image. C'estàd que quand

[19:55 - 19:59]
vous avez quelque chose qui ne convient

[19:57 - 20:00]
pas et bien écrivez dans le prompte ce

[19:59 - 20:02]
que vous voulez à la place. laisser le

[20:00 - 20:05]
moins de liberté possible au bot. Donc

[20:02 - 20:07]
là, je pense que si l'utilisateur avait

[20:05 - 20:09]
écrit une attractive young woman dressed

[20:07 - 20:11]
with a dress ou quelque chose comme ça,

[20:09 - 20:12]
dressed with a t-shirt ou short ou je

[20:11 - 20:14]
sais pas quoi, et bien il n'aurait

[20:12 - 20:15]
jamais eu une femme nue. Voilà, c'est ça

[20:14 - 20:17]
que je voulais vous dire. Et donc quand

[20:15 - 20:18]
je vous disais ne dites pas ce que vous

[20:17 - 20:20]
ne voulez pas, dites ce que vous voulez.

[20:18 - 20:21]
Par exemple, si vous faites photographie

[20:20 - 20:23]
d'un homme qui n'a pas les cheveux

[20:21 - 20:25]
blonds et ben alors là, croyez-moi, vous

[20:23 - 20:28]
avez 90 % de chance d'avoir des hommes

[20:25 - 20:30]
blonds comme vous le voyez sur cette

[20:28 - 20:32]
grille d'image là. Donc évidemment, ne

[20:30 - 20:34]
faites pas ça. Demandez euh ce que vous

[20:32 - 20:36]
voulez tout simplement photographie d'un

[20:34 - 20:37]
homme rou. Vous avez ici euh de gris

[20:36 - 20:39]
d'imag et ben là vous allez avoir euh

[20:37 - 20:40]
des hommes roues tout simplement parce

[20:39 - 20:42]
que vous l'avez euh demandé. Donc voilà,

[20:40 - 20:43]
je vais le redire encore une fois. Ne

[20:42 - 20:45]
dites pas ce que vous ne voulez pas,

[20:43 - 20:47]
dites ce que vous voulez. Et alors un

[20:45 - 20:48]
petit dernier exemple qui est euh

[20:47 - 20:50]
intéressant avant de conclure cette

[20:48 - 20:52]
première partie de vidéo. Il faut que

[20:50 - 20:54]
vous structuriez correctement vos

[20:52 - 20:55]
phrases en langage naturel et il faut

[20:54 - 20:57]
que vous fassiez attention à la

[20:55 - 20:58]
ponctuation. Alors cet exemple-là, je

[20:57 - 20:59]
l'aime bien. Alors, j'avoue qu'il n'est

[20:58 - 21:00]
pas de moi, mais j'ai trouvé vraiment

[20:59 - 21:01]
très très cool. Donc, je me permets de

[21:00 - 21:04]
le reprendre. On a par exemple une

[21:01 - 21:06]
phrase : "A panda eats shoots and le

[21:04 - 21:08]
lives". Donc shoots en anglais, ce sont

[21:06 - 21:11]
des poces de bambou. Donc un panda mange

[21:08 - 21:13]
des pouss et des feuilles et vous allez

[21:11 - 21:14]
obtenir ce genre d'image là. Donc là,

[21:13 - 21:16]
pour le coup, c'est un prompte très

[21:14 - 21:18]
basique mais vous allez comprendre où je

[21:16 - 21:20]
veux en venir. Donc là, on a une seule

[21:18 - 21:21]
phrase, il y a pas de ponctuation. Et

[21:20 - 21:22]
j'ai refait la même chose. Vous voyez,

[21:21 - 21:23]
j'ai utilisé une side pour pouvoir faire

[21:22 - 21:25]
un un vrai test. Donc vous voyez les

[21:23 - 21:28]
deux images ici. Donc là le deuxième

[21:25 - 21:30]
prom que j'ai fait c'est a panda virgule

[21:28 - 21:32]
shoots and leaves. Et donc là c'est un

[21:30 - 21:33]
petit peu différent parce que autant le

[21:32 - 21:35]
premier prompte on avait un panda est en

[21:33 - 21:36]
train de manger des pouss de bambou et

[21:35 - 21:38]
des feuilles, autant ici on pourrait

[21:36 - 21:40]
l'interpréter en tout cas m journée

[21:38 - 21:42]
pourrait l'interpréter. Un panda mange

[21:40 - 21:43]
virgule shoots donc tire et part. En

[21:42 - 21:45]
fait ça pourrait être un petit peu ça.

[21:43 - 21:47]
Et regardez la différence cette fois-ci.

[21:45 - 21:48]
Donc on a toujours notre panda avec donc

[21:47 - 21:49]
en train de manger des pouss de bambou.

[21:48 - 21:51]
Mais c'est quoi ça ? Est-ce que ça

[21:49 - 21:53]
serait pas un fusil par hasard ? Donc

[21:51 - 21:55]
oui, c'est cette fois-ci une

[21:53 - 21:56]
interprétation différente à cause de la

[21:55 - 21:57]
virgule puisque shoots cette fois-ci

[21:56 - 21:59]
c'est plus forcément les pouces de

[21:57 - 22:01]
bambou, ça va être tiré. Et donc pour

[21:59 - 22:03]
tirer, bah midjournée lui a rajouté un

[22:01 - 22:05]
flingue, un fusil. C'est la même chose

[22:03 - 22:07]
ici. Donc ça c'est l'image avec le

[22:05 - 22:09]
prompt sans ponctuation. Et cette

[22:07 - 22:11]
fois-ci il nous a rajouté un arc et donc

[22:09 - 22:14]
ça peut correspondre aussi au shoot de

[22:11 - 22:16]
tirer. Cette fois-ci idem pour celle-là

[22:14 - 22:18]
où cette fois-ci on a aussi un fusil.

[22:16 - 22:18]
Donc c'est pour vous montrer vraiment la

[22:18 - 22:19]
différence. Celle-là, elle est vraiment

[22:18 - 22:22]
très bien parce que ce sont quasiment

[22:19 - 22:24]
les mêmes images. Ici, sans ponctuation,

[22:22 - 22:26]
donc aucun fusil à l'horizon ou alors

[22:24 - 22:27]
bien caché. Et cette fois-ci, avec

[22:26 - 22:29]
ponctuation. Donc, cette fois-ci,

[22:27 - 22:31]
l'interprétation, ça peut être tiré et

[22:29 - 22:33]
non plus pouce de bambou. Et on a bien

[22:31 - 22:35]
le fusil. Donc ça, je trouve ça très

[22:33 - 22:37]
intéressant pour illustrer l'importance

[22:35 - 22:39]
de la ponctuation. Bon, voilà, c'est

[22:37 - 22:41]
tout pour cette première partie de

[22:39 - 22:43]
vidéo. Vous me direz, c'est déjà pas

[22:41 - 22:44]
mal. Je pense que vous avez eu déjà pas

[22:43 - 22:45]
mal d'informations. Comme je vous l'ai

[22:44 - 22:47]
dit au début de vidéo pour celles et

[22:45 - 22:49]
ceux que ça intéresse, c'est j'ai

[22:47 - 22:50]
rouvert les portes de ma formation speed

[22:49 - 22:52]
journée, donc qui est dédié aux

[22:50 - 22:54]
débutants qui souhaitent progresser sur

[22:52 - 22:57]
mid-journée. À l'occasion de cette

[22:54 - 22:59]
réouverture, je fais une promotion de 30

[22:57 - 23:01]
% jusqu'au dimanche 18 mai à minuit.

[22:59 - 23:03]
Donc si ça vous intéresse, bah écoutez,

[23:01 - 23:04]
profitez-en. C'est le premier lien qui

[23:03 - 23:06]
se trouve dans la description de la

[23:04 - 23:07]
vidéo. Donc vous y retrouverez bah bien

[23:06 - 23:08]
sûr la première partie de la vidéo que

[23:07 - 23:09]
vous venez de voir gratuitement sur

[23:08 - 23:11]
YouTube. Cette vidéo en vrai, elle est

[23:09 - 23:12]
composée de trois parties, donc elle est

[23:11 - 23:14]
deux fois plus longue et vous avez

[23:12 - 23:16]
évidemment tous les autres modules. Donc

[23:14 - 23:18]
si ça vous intéresse de savoir tous les

[23:16 - 23:19]
modules qu'il y a, ils sont tous ici.

[23:18 - 23:22]
Voilà, donc tout est mis à jour,

[23:19 - 23:23]
notamment voilà cette mise à jour de mai

[23:22 - 23:25]
2025. Ben en fait c'est la vidéo que

[23:23 - 23:26]
vous avez vu, en tout cas la première

[23:25 - 23:28]
partie. Je tiens quand même à dire que

[23:26 - 23:30]
pour le moment, je n'ai pas rajouté de

[23:28 - 23:31]
vidéos sur l'Omnireférence et sur le SRF

[23:30 - 23:32]
parce que ce sont deux fonctionnalités.

[23:31 - 23:33]
Alors l'Omniiréférence qui vient de

[23:32 - 23:35]
sortir en tout cas au moment où je

[23:33 - 23:36]
tourne cette vidéo et donc je sais qu'il

[23:35 - 23:38]
va y avoir des améliorations très

[23:36 - 23:39]
prochainement avec notamment la

[23:38 - 23:41]
possibilité de mettre deux images en

[23:39 - 23:43]
Omniref et cetera. Donc je trouve pas ça

[23:41 - 23:44]
très pertinent de créer une vidéo qui

[23:43 - 23:46]
pourrait être obsolète dans 2 semaines

[23:44 - 23:48]
et SRF pareil normalement le système

[23:46 - 23:50]
devrait être revu prochainement. Donc

[23:48 - 23:52]
évidemment c'est un petit peu délicat

[23:50 - 23:54]
pour l'instant. Je rajouterai des vidéos

[23:52 - 23:56]
lorsque ces fonctionnalités seront un

[23:54 - 23:58]
petit peu plus stabilisées et à ce

[23:56 - 23:59]
moment-là, si vous avez la formation, de

[23:58 - 24:01]
toute façon, vous bénéficiez de toutes

[23:59 - 24:03]
les mises à jour gratuitement. Donc,

[24:01 - 24:04]
vous n'aurez rien à repayer. Voilà,

[24:03 - 24:06]
simplement je vous le dis, me dites pas,

[24:04 - 24:07]
il manque l'omnir référence et cetera.

[24:06 - 24:08]
Oui, mais c'est juste que la

[24:07 - 24:09]
fonctionnalité est pas encore totalement

[24:08 - 24:12]
stabilisée. Donc, je rajouterai une

[24:09 - 24:13]
vidéo certainement le mois prochain, je

[24:12 - 24:15]
pense. Donc voilà, si ça vous intéresse,

[24:13 - 24:17]
30 % de réduction jusqu'à dimanche

[24:15 - 24:18]
minuit. C'est le premier qui se trouve

[24:17 - 24:20]
en description de la vidéo. Et en

[24:18 - 24:22]
attendant, si jamais vous voulez en

[24:20 - 24:24]
savoir un peu plus sur l'omniférence, et

[24:22 - 24:26]
bien écoutez, j'aiécris un tuto complet

[24:24 - 24:27]
sur le sujet. C'est la vidéo qui

[24:26 - 24:28]
s'affiche en plein milieu de votre

[24:27 - 24:30]
écran. Donc si vous avez pas vu ce tuto,

[24:28 - 24:31]
je vous invite vivement à le regarder

[24:30 - 24:33]
puisque vous allez pouvoir recréer votre

[24:31 - 24:36]
visage et vous mettre un peu dans toutes

[24:33 - 24:36]
les situations que vous voulez.

## コメント

### 1. @tamalebarbu7488 (👍 0)
Une très bonne vidéo!
Tout est limpide, bien expliqué.
Super efficace

> **@lestutosmidjourney** (👍 0): Merci à toi 👍

### 2. @imfloob (👍 0)
Je viens de découvrir ta chaîne qui me semble parfaite pour me former à Midjourney ! Est-ce que tu as une vidéo qui présente les bases pour bien démarrer avec le site ? Merci !

> **@lestutosmidjourney** (👍 1): Hello, oui j'ai une vidéo de présentation du site, la voici : https://www.youtube.com/watch?v=fbwUKWOfS1k

### 3. @bensilicate (👍 0)
Félicitation pour ta pédagogie. C'est limpide. Ça me donne envie de m'y remettre, moi qui avait calqué la porte de Midjourney à l'époque où il était bête à bouffer du foin. Ceci dit il y a toujours ce souci de devoir lutter avec les prompts, mais c'est déjà bien plus gérable, et puis on peut s'aider d'autres IA pour cela.

> **@lestutosmidjourney** (👍 0): Voilà un message qui me fait très plaisir :-)

> **@dreamissito4662** (👍 0): je m'y suis remis aussi après 2 ans de pauses, (merci Lestutosmidjourney pour ton taff, ça permet de revenir sans trop se perdre car bcp de changement). Bref comme tu dis faut les combiner avec d'autres IA, j'utilise chatgpt en complément qui aide à la création de prompt, créer d'autres images de référence etc.

### 4. @Retro-Chronik (👍 0)
😂 j'ai adoré les exemples de cet utilisateur qui bataille avec MJ. 
J'ai créé un dossier WTF où j'ai mis quelques générations impubliables. Mais vraiment de grosses dingueries. Je vais les revoir avec l'angle de vue du prompt archétypal.

> **@lestutosmidjourney** (👍 0): Utilisateur très présent dans ma vidéo, j'avais même pas fait attention que c'était toi sur les deux exemples ahah !

### 5. @fraerithlelfe6027 (👍 0)
Très bons tips. J'ai déjà beaucoup appris. 👍

> **@lestutosmidjourney** (👍 0): Génial ! Merci :-)

### 6. @bensilicate (👍 0)
Excellente la miniature !

> **@lestutosmidjourney** (👍 0): Merci 😏

### 7. @jeremybaarsma9158 (👍 0)
Thank you so much for the dub! Is your course in English or PDF for to where I can translate?

> **@lestutosmidjourney** (👍 0): Hi, I'm sorry but the course is not available in PDF, I don't think you'll be able to translate it :-( This is the first time I've had this request, usually my videos are only viewed by French speakers.

> **@jeremybaarsma9158** (👍 0): No worries at all been following your content and love it!

### 8. @emm1924 (👍 0)
Au top comme d'hahitude merci

> **@lestutosmidjourney** (👍 0): Merci à toi 😊

### 9. @saint-jeanphilippe998 (👍 0)
Super Tuto

### 10. @saint-jeanphilippe998 (👍 0)
Intelligent la liste de mots à bannir

> **@lestutosmidjourney** (👍 0): Bien utile en effet ;-)

### 11. @alainbrus3037 (👍 1)
Très intéressant merci beaucoup. On retrouve dans d'autres domaine ce concept de phrases négatives qui sont contreproductives, dans le sport notamment. Le cerveau humain (comme le bot) ne peut pas visualiser une image négative, impossible.

> **@lestutosmidjourney** (👍 0): Intéressant, je ne savais pas que ça s'appliquait à d'autres domaines.

### 12. @cecilecadoret9075 (👍 0)
Intéressant de revoir les bases. J'ai un souci avec ce prompt : "A futuristic young woman , wearing an elegant brushed silver and graphite cybernetic suit" MJ veut absolument lui faire une énorme poitrine à la Lara Croft qu'il doit prendre comme archétype... Il faudrait donc que je spécifie silhouette filiforme si je me réfère à tes exemples. Merci Thibault 👍

> **@lestutosmidjourney** (👍 1): Ah curieux je viens de tester le prompt et j'obtiens des femmes avec des poitrines proportionnées, rien de choquant. J'étais en mode standard, stylize à 100. Mais autrement oui il faut surement rajouter ou enlever un token problématique.

> **@cecilecadoret9075** (👍 0): @@lestutosmidjourney J'ai relancé le prompt aujourd'hui  et c'est ok pas de proéminences exagérées en mode raw, ouf ! Merci de ton retour :)

### 13. @olivierh2193 (👍 1)
Le paramètre —no ne fonctionne pas en V7 car il n’y a pas de multiprompt et que no c’est un raccourci vers ::-0.5 il devrait renvoyer une erreur mais il ne le fait pas.

> **@lestutosmidjourney** (👍 0): J'ai vu ça dans le doc officielle c'est vrai, mais ça semble fonctionner dans certains cas :  The “`--no`” Parameter :
There was a silent release of `--no` shortly after the initial release of V7. It doesn’t work perfectly, because it’s shorthand for `::-0.5` and (see above) multiprompts aren’t implemented correctly in V7. (Or in v6. Last known good implementation was v5.2.)

Still, depending on what type of thing you’re trying to negate, it’s worth exploring."

### 14. @olivimitsu5863 (👍 0)
Bonjour . Je ni connais rien en generateur d'image,  et j'aimerais un avis , je cherche à générer une image de tatouage que j'aimerais faire ( cercle d'invocation de full metal alchemist ) en manchette sur l'avant bras complet mais le peu que j'ai vue en gratuit aucun ne s'en sort . Midjourney pourrait y arriver ?

> **@lestutosmidjourney** (👍 0): Bonjour, si vous n'êtes pas trop exigeant sur le motif exact que vous voulez, alors Midjourney pourra faire l'affaire car il est très créatif et vous trouverez des idées formidables sur cet outil.. Si en revanche vous avez une idée ultra précise de ce que vous voulez, au trait près, alors je ne vous recommande pas Midjourney. Peut-être devrez-vous vous tourner vers Chat GPT 4o pour générer des images précises.

> **@olivimitsu5863** (👍 0): ​@@lestutosmidjourney oui j'ai une idée bien précise du motif , merci

### 15. @pelendur5936 (👍 3)
J'aime bien midjourney, il est créatif, les rendus sont magnifiques, mais il est quasiment incapable de suivre un prompt précis. Je travail sur un livre d'illustrations pour un client, j'ai fini par passer sur Sora, c'est trop compliqué quand les clients ont des attentes précises. C'est dommage, pour moi c'est LE point faible de midjourney. Je ne doute pas qu'un jour il sera optimisé et fiable, mais pour une utilisation professionnelle dans l'immédiat, il vaut mieux éviter, sauf s'il y a possibilité d'avoir une grande liberté de créativité artistique.

> **@lestutosmidjourney** (👍 1): Je ne vais pas vous contredire, je suis assez d'accord avec le constat. Quand Midjourney aura la compréhension des prompts de Sora, alors nous aurons franchi un cap et les autres outils auront du souci à se faire !

> **@MaitreyaBuddhaTheOne** (👍 0): ​@@lestutosmidjourneyà quand MJ cross chatgpt ? ❤

### 16. @SERGE-n4m (👍 0)
Bonjour, je ne me sers quasiment pas de la v7 car j'ai toujours cette personnalisation sv4 qui vient s'ajouter aux prompts avec sref *********  et c'est mon mode de fonctionnement favori. J'ai beau désactiver la personnalisation le sv4 revient .......... je suis seul à me plaindre et donc je n'ai pas compris .....  ou c'est inévitable ce p..... de sv4 ? Merci de votre aide. Serge

> **@elgregho** (👍 0): C'est tout le temps le cas quand tu te sers des srefV6 avec la V7. J'ai fait pas mal d'essais de mes sref en v6 et v7(donc en sv4). il y a une vrai différence, des fois c'est mieux , des fois non! J'avoue qu'avec --q 4 , c'est quand même mieux. Je pense que le sv4 changera (ou disparaîtra)  avec l'arrivée des sref V7 , d'ici quelques jours (si j'ai bien compris les infos de Geniart! 😊) je ne sais pas si mes infos t'ont un peu aidé, et si je suis très clair dans mes tentatives d'explications

> **@lestutosmidjourney** (👍 0): Ce n'est pas grave d'avoir ce --sv 4 qui s'affiche car il était déjà présent sur la V6 sauf qu'il ne s'affichait pas. Je ne sais pas pourquoi il s'affiche maintenant, mais c'était déjà avant un paramètre présent par défaut, sauf qu'on ne le voyait pas. C'est comme si avec la V7, l'équipe de MJ avait décidé d'afficher --chaos 0 à chaque fin de prompt, ou --weird 0. C'est la valeur par défaut donc normalement ça ne devrait pas s'afficher, mais pour le --sref ils ont décidé de montrer le --sv 4, je ne sais pas pourquoi. Dans tous les cas le système de SREF devrait être revenu bientôt donc peut-être que ça disparaitra.

> **@SERGE-n4m** (👍 0): @@elgregho Merci beaucoup pour cette explication qui est claire, oui oui ! Je suis comme toi, un peu désarçonné par les écarts de résultats de la v7 suivant les prompts, peut-être que la meilleure adhérence promise provoque également de plus grands "errements" si le prompt n'est pas pile-poil . Je mettais ça un peu sur le compte de ce sv4 mais la réponse çi-dessous de Thibaut écarte cette éventualité. Peut-être aussi ne pas oublier que Midjourney a prévenu que c'était une version en cours de finalisation .... Merci encore. Cordialement. Serge

> **@SERGE-n4m** (👍 0): @@lestutosmidjourney Merci Thibaut de répondre en me permettant d'écarter définitivement ce supposé souci. C'est clair et net . Depuis presque 2 ans que j'utilise MJ j'ai constaté qu'à chaque grande nouveauté il y avait pendant un moment une espèce de "capillarité" entre les versions, le temps je pense que tout soit bien cadré. En ce moment par exemple quand j'utilise la 6.1 il arrive régulièrement (mais pas toujours ....) que la plateforme me dit que --cw doit être entre 0 et 100 alors qu'il est réglé sur 0 ..... mais que je l'ai mis à 400 par défaut sur la v7 .... c'est ce que j'appelle la "capillarité". Merci pour l'aide. Cordialement. Serge qui va s'accommoder du sv4 .

### 17. @ThomasAubrunATH (👍 1)
Perso, cela m'a bien fait rire d'obtenir parfois des images de femme nue sans le vouloir, alor que la modération nous tape dessus sans raison à bien des reprises.  😂

> **@lestutosmidjourney** (👍 0): C'est l'un des grands mystères de MJ en effet 😂

### 18. @ModulBeatAI (👍 0)
Je trouve cela vraiment abusé qu'en 2025, Midjourney, on doive faire tout ça pour réussir à lui enlever le chapeau d'un cowboy… Genre lui dire "un cowboy sans chapeau" ne fonctionne pas ? C'est quand même aberrant, je trouve lol. Quand tu sais que pour un autre concurrent, il suffit de lui demander simplement un cowboy sans chapeau pour avoir… un cowboy sans chapeau, ouah XD.

> **@lestutosmidjourney** (👍 0): Je comprends,  la compréhension des prompts reste le gros point faible de Midjourney. A côté de ça, les concurrents seront nettement moins bons sur d'autres sujets. C'est un peu le souci des IA génératives au global, aucun outil n'est parfait partout, et il faut parfois les cumuler pour arriver à nos fins.

