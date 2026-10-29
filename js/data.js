/* ==========================================================
   米格尔街 · 剧本数据 (Data & Dialogue)
   - 基于 V.S. 奈保尔 1959 年同名小说《米格尔街》
   - 极乐迪斯科式心理机制（内心声音插话 + 检定 + 属性）
   - 中英双语完整对应（原著地道英文摘句 + 极具质感的中文文学重构）
   ========================================================== */

const VOICES = {
  memory:  { name: '记忆', en: 'MEMORY',        color: 'var(--v-memory)',  desc: '你记得一切。尤其是那些大人以为你早已遗忘的事。' },
  imagine: { name: '想象', en: 'IMAGINATION',   color: 'var(--v-imagine)', desc: '一块刨花可以是一首诗，一个流浪汉可以是一位永恒的星空观测者。' },
  empathy: { name: '同情', en: 'EMPATHY',       color: 'var(--v-empathy)', desc: '你能听见加勒比海笑声底下的悲鸣。这让你比同龄人更早地心碎。' },
  street:  { name: '街头', en: 'STREET SMARTS', color: 'var(--v-street)',  desc: '谁在吹牛，谁在挨打，谁在伪装体面——整条街道都在向你低语。' },
  nerve:   { name: '胆量', en: 'NERVE',         color: 'var(--v-nerve)',   desc: '敢开口，敢靠近男人们的台阶，敢直视生活最残酷的裂痕。' },
};

const ARCHETYPES = [
  { id: 'dreamer', name: '诗人的学徒', en: 'The Poet\'s Apprentice',
    desc: '你总是在人行道上发呆，相信热带雨林和破木棚里都藏着一首未写完的长诗。',
    descEn: 'You linger on the curb, believing every rusty shack hides an unwritten epic.',
    stats: { memory: 3, imagine: 5, empathy: 3, street: 1, nerve: 2 } },
  { id: 'street', name: '街头的浪儿', en: 'The Pavement Child',
    desc: '你在男人们的朗姆酒与纸牌闲聊中长大，精通他们的粗话、玩笑与不动声色的谎言。',
    descEn: 'Raised on rum jokes and cricket banter, you know the code of the gutter.',
    stats: { memory: 2, imagine: 1, empathy: 2, street: 5, nerve: 4 } },
  { id: 'watcher', name: '母亲的儿子', en: 'The Mother\'s Son',
    desc: '母亲严厉的目光塑造了你。你比任何人都更渴望看清这条街上的宿命与逃离之路。',
    descEn: 'Sharpened under your mother\'s fierce gaze, you seek a way beyond the street.',
    stats: { memory: 4, imagine: 2, empathy: 5, street: 2, nerve: 1 } },
];

const SPEAKERS = {
  narr: { name: '', en: '' },
  me: { name: '你', en: 'YOU' },
  mom: { name: '母亲', en: 'YOUR MOTHER', portrait: 'mother' },
  mother: { name: '母亲', en: 'YOUR MOTHER', portrait: 'mother' },
  ganesh: { name: '格涅沙·庞迪特', en: 'GANESH RAMSUMAIR, M.L.C.', portrait: 'titushoyt' },
  boyee: { name: '博伊', en: 'BOYEE' },
  mrs_bhakcu: { name: '巴库太太', en: 'MRS. BHAKCU' },
  mrs_morgan: { name: '摩根太太', en: 'MRS. MORGAN' },
  nathaniel: { name: '内森尼尔', en: 'NATHANIEL' },
  hereira: { name: '赫瑞拉太太', en: 'MRS. HEREIRA', portrait: 'angela' },
  bogart: { name: '鲍嘉', en: 'BOGART', portrait: 'bogart' },
  popo: { name: '波普', en: 'POPO · CARPENTER', portrait: 'popo' },
  george: { name: '乔治', en: 'GEORGE', portrait: 'george' },
  elias: { name: '伊莱亚斯', en: 'ELIAS', portrait: 'elias' },
  words: { name: 'B.华兹华斯', en: 'B. WORDSWORTH', portrait: 'words' },
  morgan: { name: '摩根', en: 'MORGAN', portrait: 'morgan' },
  laura: { name: '劳拉', en: 'LAURA', portrait: 'laura' },
  hat: { name: '哈特', en: 'HAT', portrait: 'hat' },
  manman: { name: '曼曼', en: 'MAN-MAN', portrait: 'manman' },
  titushoyt: { name: '泰特斯·霍伊特', en: 'TITUS HOYT, I.A.', portrait: 'titushoyt' },
  bigfoot: { name: '“大脚”比佛', en: 'BIG FOOT (BEAVER)', portrait: 'bigfoot' },
  eddoes: { name: '埃多斯', en: 'EDDOES', portrait: 'eddoes' },
  toni: { name: '赫瑞拉太太（安吉拉）', en: 'MRS. HEREIRA (ANGELA)', portrait: 'angela' },
  angela: { name: '赫瑞拉太太（安吉拉）', en: 'MRS. HEREIRA (ANGELA)', portrait: 'angela' },
  toni_char: { name: '托尼', en: 'TONI', portrait: 'toni' },
  bhakcu: { name: '巴库', en: 'BHAKCU', portrait: 'bhakcu' },
  bolo: { name: '博勒', en: 'BOLO', portrait: 'bolo' },
  edward: { name: '爱德华', en: 'EDWARD', portrait: 'edward' },
};

const PORTRAITS = {
  bogart: 'assets/portraits/bogart.jpg',
  popo: 'assets/portraits/popo.jpg',
  george: 'assets/portraits/george.jpg',
  elias: 'assets/portraits/elias.jpg',
  words: 'assets/portraits/words.jpg',
  morgan: 'assets/portraits/morgan.jpg',
  laura: 'assets/portraits/laura.jpg',
  hat: 'assets/portraits/hat.jpg',
  manman: 'assets/portraits/manman.jpg',
  titushoyt: 'assets/portraits/titushoyt.jpg',
  bigfoot: 'assets/portraits/bigfoot.jpg',
  eddoes: 'assets/portraits/eddoes.jpg',
  toni: 'assets/portraits/toni.jpg',
  angela: 'assets/portraits/angela.jpg',
  bhakcu: 'assets/portraits/bhakcu.jpg',
  bolo: 'assets/portraits/bolo.jpg',
  edward: 'assets/portraits/edward.jpg',
  mother: 'assets/portraits/mother.jpg',
};
const PORTRAIT_FALLBACK = {};

const SCENES = {
  title: 'assets/title.jpg',
  street: 'assets/street.jpg',
  bogart: 'assets/scenes/bogart.jpg',
  popo: 'assets/scenes/popo.jpg',
  george: 'assets/scenes/george.jpg',
  elias: 'assets/scenes/elias.jpg',
  words: 'assets/scenes/words.jpg',
  morgan: 'assets/scenes/morgan.jpg',
  laura: 'assets/scenes/laura.jpg',
  hat: 'assets/scenes/hat.jpg',
  finale: 'assets/scenes/finale.jpg',
  manman: 'assets/streetview/node2.jpg',
  bigfoot: 'assets/streetview/node2.jpg',
  titushoyt: 'assets/streetview/node3.jpg',
  eddoes: 'assets/streetview/node1.jpg',
  toni: 'assets/streetview/node3.jpg',
  bhakcu: 'assets/streetview/node3.jpg',
  bolo: 'assets/streetview/node4.jpg',
  edward: 'assets/streetview/node4.jpg',
  mother: 'assets/streetview/node4.jpg',
};

const CHAPTERS = [
  {
    "id": "bogart",
    "no": "I",
    "title": "鲍嘉",
    "sub": "BOGART",
    "hot": {
      "x": 0.5,
      "y": 44,
      "w": 13,
      "h": 42,
      "pin": [
        7,
        54
      ]
    },
    "tip": {
      "v": "street",
      "x": "门上挂着“本店专事裁缝”的招牌。整条街都知道，他一辈子没裁过一件像样的衣服。",
      "en": "A sign on the door says \"TAILORING\". The whole street knows he has never made a suit."
    },
    "tipAfter": {
      "v": "memory",
      "x": "招牌还挂着。那个为了在哥们里做条汉子而亡命天涯的人，终究被警车带走了。",
      "en": "The sign remains. The man who tried to be a man among men was taken away in the police van."
    },
    "item": {
      "name": "一张发白的黑桃 A",
      "nameEn": "A Faded Ace of Spades",
      "desc": "鲍嘉在昏暗的仆人房里独自玩了一万局佩兴斯。他把纸牌两张三张地抛落，动作慢得像一头热带的困兽。",
      "descEn": "Bogart played thousands of games of patience. He dropped the cards in twos and threes with slow, idle grace."
    },
    "note": "“为了做条汉子，和咱哥们在一起。”哈特道破了鲍嘉所有漫游、重婚与硬汉伪装的秘密：在这条街上，懦弱是唯一的死罪。",
    "noteEn": "“To be a man, among we men.” Hart laid bare the secret of Bogart's wanders, his bigamy, and his hard-boiled mask: on Miguel Street, weakness is the only mortal sin.",
    "steps": [
      {
        "g": "day",
        "music": "calypso",
        "s": "narr",
        "x": "每天早上，哈特起床后，总要坐到屋后阳台的栏杆上，扯大嗓门朝对面喊：“有什么事吗，鲍嘉？”",
        "en": "Every morning when he got up Hat would sit on the banister of his back verandah and shout across, 'What happening there, Bogart?'"
      },
      {
        "s": "bogart",
        "x": "鲍嘉总会在床上慢吞吞翻个身，用谁也听不见的声音咕哝道：“有什么事吗，哈特？”",
        "en": "Bogart would turn in his bed and mumble softly, so that no one heard, 'What happening there, Hat?'"
      },
      {
        "v": "street",
        "lvl": 2,
        "x": "大伙儿为什么叫他鲍嘉可是个谜；不过我猜是哈特给他起的。那年电影《卡萨布兰卡》上映，鲍嘉的名字红遍了整个西班牙港，小伙子们纷纷开始仿效他那种冷硬孤傲的姿态。",
        "en": "It was something of a mystery why he was called Bogart; but I suspect it was Hat who gave him the name. That was the year the film Casablanca was made, and Bogart's fame spread like fire through Port of Spain. Young men began adopting the hard-boiled Bogartian attitude."
      },
      {
        "s": "narr",
        "x": "在大伙儿叫他鲍嘉以前，大家都管他叫“佩兴斯”——因为他从早到晚总在玩单人纸牌。其实他并不喜欢打牌。无论你什么时候走进他的小仆人房，总看见他坐在床上，面前一张小桌，摆着七行纸牌。",
        "en": "Before they called him Bogart they called him Patience, because he played that game from morn till night. Yet he never really liked cards. Whenever you went into his little servant-room you found him sitting on his bed with the cards in seven lines on a small table."
      },
      {
        "s": "bogart",
        "x": "“伙计，有什么事吗？”他轻声招呼一句，然后就彻底沉默了，一沉默就是十或十五分钟。他眼睛小，睡意蒙眬，做什么事都不慌不忙，甚至洗牌时舔一下大拇指的动作也十分优雅。",
        "en": "'What happening there, man?' he would ask quietly, and then he would say nothing for ten or fifteen minutes. His eyes were small and sleepy. Nothing hurried him; he had a slow, idle grace even when he licked his thumb to turn up a card."
      },
      {
        "s": "narr",
        "x": "鲍嘉假装要开缝纫店谋生，甚至还付钱让我替他写了一块招牌：【本店专事裁缝 · 定做各种西服 · 价格低廉公道】。他买了一台缝纫机，还有一些蓝、白、棕色的粉笔。但他连一件西服也没做过。",
        "en": "He pretended to be a tailor, and even paid me to make a sign for him: 'TAILORING / SUITS MADE TO ORDER / CHEAP AND ATTRACTIVE'. He bought a sewing machine and boxes of blue, white, and brown chalks. Yet I cannot remember him ever making a suit."
      },
      {
        "choice": [
          {
            "label": "“鲍嘉，你答应给我裁的卡其布短裤，什么时候能裁好呀？”",
            "labelEn": "\"Bogart, when are you going to finish the khaki shorts you promised me?\"",
            "then": [
              {
                "s": "bogart",
                "x": "鲍嘉缓缓剥开一根香蕉塞进嘴里，眼皮都没抬一下：“急什么，小鬼？急躁是庸才的毛病。好裁缝得等布料自己呼吸。”",
                "en": "Bogart peeled a banana and chewed slowly, without looking up: 'What the hurry, boy? Hurry is for fools. A tailor waits for the cloth to breathe.'"
              },
              {
                "v": "imagine",
                "lvl": 2,
                "x": "他每天就躺在床上吃香蕉，把香蕉皮扔进铁桶里。招牌是他唯一的体面屏障。",
                "en": "He spent his days lying on his back eating bananas and tossing skins into a tin. The sign was his only flimsy shield of dignity."
              },
              {
                "fx": "chalk_sign",
                "tip": "用粉笔写下裁缝铺招牌 / Chalk the sign for Bogart's shop"
              }
            ]
          },
          {
            "label": "[街头智慧] 坐在小板凳上，看他桌面上的七行单人纸牌阵局",
            "labelEn": "[Street Smarts] Sit on the stool and inspect his seven-line patience layout",
            "check": {
              "id": "bogart_cards",
              "type": "white",
              "v": "street",
              "dc": 6,
              "modifiers": [
                { "text": "看透单人纸牌的死局", "textEn": "Patience layout insight", "statGte": { "v": "street", "val": 3 }, "val": 1 }
              ]
            },
            "pass": [
              {
                "fx": "cards",
                "tip": "翻开桌面上扣着的底牌 / Turn over the hidden card on the baize"
              },
              {
                "s": "me",
                "x": "“黑桃Q压在红桃K下面了，鲍嘉。只要把方块挪开，这一列就解开了。”",
                "en": "\"The Queen of Spades is trapped under the King of Hearts, Bogart. Move the Diamond, and the whole row opens up.\""
              },
              {
                "s": "bogart",
                "x": "鲍嘉肥厚的手指顿在半空，嘴角泛起一丝冷淡的讥诮：“算你眼尖，小子。但我并不喜欢赢。赢了又得重新洗牌，怪麻烦的。”",
                "en": "His thick fingers paused over the cards. A faint, dry smirk twitched his lips: 'Sharp eyes, boy. But I don't care about winning. Winning means shuffling again, and that is too much trouble.'"
              }
            ],
            "fail": [
              {
                "s": "bogart",
                "x": "鲍嘉连眼皮都没眨一下，只是把两张牌若无其事地覆在排尾，任由死局沉睡。",
                "en": "Bogart didn't even blink. He slid two cards carelessly over the row, letting the dead hand sleep."
              }
            ]
          }
        ]
      },
      {
        "s": "narr",
        "x": "像鲍嘉这样百无聊赖的人居然也有许多朋友，有时还是街上最受欢迎的人。他蹲在人行道上，听哈特、爱德华和埃多斯高谈阔论，自己眼皮朝下，手指在地上画圈圈。他笑时不出声，从不讲故事，但聚会时大家总说：“得请鲍嘉来，那家伙鬼着呢。”",
        "en": "It was a marvel that a man so bored had so many friends. He sat on the curb while Hart, Edward, and Eddoes talked, his eyes lowered, drawing circles in the dirt with a finger. He never laughed out loud, never told stories, but the men always said: 'We must have Bogart. That man is deep.'"
      },
      {
        "s": "narr",
        "x": "但有天早上，哈特在后廊喊过之后，屋里没有任何回应。过去那种似乎不可改变的日常突然碎了——鲍嘉不见了。他一句话都没留就离开了米格尔街。",
        "en": "But one morning, when Hat shouted from his verandah, nobody answered. The unchanging routine was shattered—Bogart was gone. He had vanished without a word."
      },
      {
        "s": "narr",
        "x": "整整两个月，街上的伙计们都闷闷不乐。哈特拿起桌上落灰的纸牌，若有所思地两张三张抛落下来。后来，大伙儿索性把鲍嘉的空房间当成了聚会俱乐部，在那儿打牌、喝朗姆酒，直到引来警察。就好像鲍嘉从没来过米格尔街一样。",
        "en": "For two months the boys were gloomy. Hat picked up the dusty cards, dropping them in twos and threes. Soon the men turned Bogart's room into a club, drinking rum and gambling until the police raided them. It was as if Bogart had never lived on Miguel Street at all."
      },
      {
        "g": "day",
        "s": "narr",
        "x": "直到秋天的一个正午，一辆黑色出租车猛地停在街口。车门推开，一个穿着昂贵双排扣毛料西服、头戴软呢帽的男人跨了下来——是鲍嘉！他嘴里叼着香烟，两只大拇指插在腰带里，身子微微后仰。",
        "en": "Then one autumn noon, a taxi pulled up at the corner. Out stepped a man in an expensive double-breasted suit and a fedora—it was Bogart! A cigarette hung from his lip, his thumbs hooked in his belt, body slouching back like a screen gangster."
      },
      {
        "s": "hat",
        "x": "哈特手里的牌差点掉在地上：“有什么事吗，鲍嘉？”",
        "en": "Hat nearly dropped his cards: 'What happening there, Bogart?'"
      },
      {
        "s": "bogart",
        "x": "鲍嘉咧开嘴，用纯正刺耳的美国腔慢吞吞地说：“有什么事吗，哈特？”他抓起桌上的马德拉斯朗姆酒，仰头一口接着一口，转眼灌光了整瓶：“不要紧，我再去买一瓶。”",
        "en": "Bogart grinned with a strange, hard American drawl: 'What happening there, Hat?' He seized the bottle of Madras rum, swallowing gulp after gulp until it was empty: 'Don't worry. I go buy another bottle.'"
      },
      {
        "s": "narr",
        "x": "他点了一支烟，烟熏得他眯起了眼睛。他慢条斯理地讲起他在英属圭亚那鲁普努尼当牛仔、向巴西走私货物的经历；讲他在乔治敦开了一家最红火的高档妓院，里面全是法官、医生和市政要员，直到黑心的警察把他抓了。",
        "en": "Smoke made him squint. He drawled out tales of being a cowboy in the Rupununi in British Guiana, smuggling into Brazil, and running the finest brothel in Georgetown—catered only to judges, doctors, and councillors—until the corrupt police double-crossed him."
      },
      {
        "s": "eddoes",
        "x": "埃多斯忍不住问：“然后呢？进了监狱？”哈特立刻骂道：“你怎么这么蠢！要那样他怎么还会在这儿？干吗不让他讲下去！”可鲍嘉生气了，咬紧牙关，拒绝再说一个字。",
        "en": "Eddoes blurted out: 'And then? You went to jail?' Hat snapped: 'How you could be so stupid! You think the man would be here if he was in jail? Why you don't shut up and let him talk?' But Bogart took offense, clamped his lips, and refused to say another word."
      },
      {
        "choice": [
          {
            "label": "[胆量检定] 走上前直视鲍嘉压得低低的帽檐，问他是不是真成了杀手",
            "labelEn": "[Nerve] Walk up and look beneath Bogart's tilted fedora, asking if he has killed a man",
            "check": {
              "id": "bogart_confront_red",
              "type": "red",
              "v": "nerve",
              "dc": 7,
              "modifiers": [
                { "text": "熟悉好莱坞黑色电影", "textEn": "Familiar with Hollywood Noir", "statGte": { "v": "imagine", "val": 3 }, "val": 1 },
                { "text": "街头浪儿的狡黠胆量", "textEn": "Pavement child audacity", "statGte": { "v": "street", "val": 3 }, "val": 1 }
              ]
            },
            "pass": [
              {
                "thought": "bogart_pose",
                "s": "bogart",
                "x": "鲍嘉冷冷吐出一口青烟，眼神像刀子一样扫过你的脸：“小子，在男人的世界里，知道太多的人活不长。”",
                "en": "Bogart blew a stream of smoke, eyes cutting like glass: 'Listen, boy. In a man's game, a guy who knows too much don't live long.'"
              },
              {
                "v": "street",
                "lvl": 2,
                "x": "他学得太像了。不仅口音美国化了，连步态和眼神都在刻意模仿电影里的亡命之徒。一幅名为《假装鲍嘉》的硬汉姿态在你脑海中萌发了。",
                "en": "The mimicry was uncanny. Not only the American accent, but the slouch, the squint, the menace—all lifted straight from Hollywood celluloid. The posture of Bogart has taken root in your mind."
              }
            ],
            "fail": [
              {
                "damage": { "amount": 1, "reason": "鲍嘉残酷好莱坞式的冷蔑扫视，自尊受挫" },
                "s": "bogart",
                "x": "鲍嘉轻蔑地哼了一声，转过脸去：“小崽子，滚一边喝奶去。”",
                "en": "Bogart scoffed, turning away: 'Run along, kid. Go drink milk with the women.'"
              }
            ]
          },
          {
            "label": "[共情体悟] 观察他靠在水泥高墙上的姿态与神情",
            "labelEn": "[Empathy] Watch him leaning against the high concrete wall, reading his posture",
            "check": {
              "v": "empathy",
              "dc": 6
            },
            "pass": [
              {
                "v": "empathy",
                "lvl": 2,
                "x": "他一只脚抵着墙，帽子遮住半张脸，烟卷在手指间颤抖。在那些吹嘘与凶狠底下，藏着一种无法言说的惶恐与孤独。",
                "en": "One foot propped against the high wall, his hat shadowing his face, his cigarette trembled slightly. Beneath the swagger lay an unspeakable dread, a profound loneliness."
              },
              {
                "s": "me",
                "x": "“鲍嘉，你其实很想念米格尔街，对吧？”",
                "en": "\"Bogart, you really missed Miguel Street, didn't you?\""
              },
              {
                "s": "bogart",
                "x": "鲍嘉猛地掐灭了烟头，别过脸粗暴地咕哝：“闭嘴，小鬼。”",
                "en": "Bogart crushed his cigarette against the concrete and muttered harshly: 'Shut up, boy.'"
              }
            ],
            "fail": [
              {
                "s": "bogart",
                "x": "鲍嘉拉低了帽檐，沉默地注视着阴沟里流淌的浑水。",
                "en": "Bogart pulled his hat lower, staring silently at the muddy water trickling in the ditch."
              }
            ]
          }
        ]
      },
      {
        "s": "narr",
        "x": "从那时起，大家的相处全变了。早晨的问候变成了：“鲍嘉！”“住嘴，哈特！”鲍嘉成了街上最让人害怕的硬汉，连“大脚”比佛都怕他。后来他又消失了四个月，推脱说“去上趟厕所”。第三次回来时，他突然变得极其阔绰，给街上的所有孩子买可乐、巧克力，办了一场盛大的派对。",
        "en": "From then on, relations changed. The morning call became: 'Bogart!' 'Shut your mouth, Hat!' Bogart became the most feared tough man on the street; even Big Foot avoided him. Then he vanished again for four months, muttering 'I go toilet.' When he returned the third time, he threw a grand party for all the children with crates of Coca-Cola and cakes."
      },
      {
        "g": "night",
        "music": "sad",
        "s": "narr",
        "x": "就在那天，住在米格尔街四十五号的查尔斯警官走了进来：“别胡来，鲍嘉。”鲍嘉愣住了：“怎么回事，伙计？我可什么也没做呀。”查尔斯警官当着所有孩子的面，给鲍嘉戴上了冰冷的手铐——罪名是重婚罪。",
        "en": "That very day, PC Charles from No. 45 Miguel Street walked in: 'Don't make no trouble, Bogart.' Bogart stared: 'What happening there, man? I ain't do nothing.' PC Charles handcuffed him right before the children—the charge was bigamy."
      },
      {
        "g": "dusk",
        "music": "sad",
        "s": "hat",
        "x": "那天晚上，哈特蹲在人行道上抽着烟，叹息道：“那老兄当年离开了图那普纳的老婆，因为生不出孩子。他在这儿一直觉得很伤心、很压抑。后来他又去了卡罗尼，让一个姑娘怀了孕。卡罗尼人不含糊，逼他结了婚。”",
        "en": "That night, Hat sat on the pavement, smoking pensively: 'The man left his first wife in Tunapuna because they couldn't make babies. He was sad and miserable here. Then he went to Caroni, got a girl in trouble, and the Caroni people made him marry her.'"
      },
      {
        "s": "eddoes",
        "x": "埃多斯问：“可他为什么又离开了她跑回来？”哈特掐灭了烟头，轻声说：“为了做条汉子，和咱哥们在一起。”",
        "en": "Eddoes asked: 'Then why he leave her to come back here?' Hat dropped his cigarette: 'To be a man, among we men.'"
      },
      {
        "v": "memory",
        "lvl": 1,
        "x": "所有的沉默、无休止的佩兴斯纸牌、生硬的美国腔与圭亚那的冒险吹嘘……这一切，不过是为了在男人们中间做一条像样的汉子。",
        "en": "The infinite games of patience, the silence, the Hollywood swagger and Rupununi cowboy fables... all of it, just to be a man among men."
      }
    ]
  },
  {
    "id": "popo",
    "no": "II",
    "title": "没有名字的东西",
    "sub": "THE THING WITHOUT A NAME",
    "hot": {
      "x": 14,
      "y": 44,
      "w": 16,
      "h": 38,
      "pin": [
        22,
        54
      ]
    },
    "tip": {
      "v": "imagine",
      "x": "芒果树下的白铁皮工棚。刨花卷得像金色的问号，他在做一样没有名字的东西。",
      "en": "Under the mango tree, wood shavings curl like question marks. He is making the thing without a name."
    },
    "tipAfter": {
      "v": "memory",
      "x": "房子刷成了刺眼的红与绿。体面能挣钱的木匠波普诞生了，那个做没有名字的东西的诗人死去了。",
      "en": "The house was painted in bright commercial red and green. Popo the respectable carpenter arrived; the poet was dead."
    },
    "item": {
      "name": "一卷芒果树下的刨花",
      "nameEn": "A Curl of Wood Shaving",
      "desc": "散发着雪松与香树的幽香，卷曲得像一个未曾解答的谜题。那是波普为一件没有名字的东西刨下来的。",
      "descEn": "Smelling faintly of cedar and cypre, curled like an unanswered riddle, planed for a thing without a name."
    },
    "note": "出狱后的波普终于学会了做莫利斯椅子和衣柜，街坊夸他浪子回头成了真汉子。可我只怀念那个终日敲打着没有名字的东西、清晨用手指蘸朗姆酒的波普。",
    "noteEn": "Out of prison, Popo made Morris chairs and wardrobes; the street praised him as a reformed real man. But I mourned the carpenter who hammered away at the thing without a name.",
    "steps": [
      {
        "g": "day",
        "music": "calypso",
        "s": "narr",
        "x": "波普自称是个木匠，可他做的唯一的东西就是自家后院芒果树下那个马口铁的小工棚。就是这么个工棚他也没盖完，屋顶只压了几块大石头。一刮大风，铁皮就发出乒乒乓乓的可怕巨响，随时可能飞走。",
        "en": "The only thing that Popo, who called himself a carpenter, ever built was the little galvanised-iron workshop under the mango tree at the back of his yard. And even that he didn't quite finish. He weighted the roof sheets with big stones; whenever high winds blew, the roof rattled with a terrifying clatter, ready to take flight."
      },
      {
        "s": "narr",
        "x": "不过波普从不闲着。他总是在锤呀、锯呀、刨呀，忙得不亦乐乎。我喜欢看他干活，喜欢乔木、香树和蟾蜍树的香味，喜欢那些木屑的颜色，也喜欢锯末像粉一样落在波普鬈曲的头发上。",
        "en": "Popo was never idle. He was always busy hammering, sawing, and planing. I loved watching him work. I loved the scent of timber—cyp and cedar and crapaud. I loved the colour of the shavings and the way sawdust powdered Popo's curly hair."
      },
      {
        "s": "me",
        "x": "“你在做什么呀，波普先生？”",
        "en": "\"What you making, Mr Popo?\""
      },
      {
        "s": "popo",
        "x": "波普总是停下刨子，抬起头神秘地笑起来：“哈，孩子！这个问题提得好。我在做一样没有名字的东西。”",
        "en": "Popo would stop his plane and laugh: \"Ha, boy! That's the question. I making the thing without a name.\""
      },
      {
        "choice": [
          {
            "label": "“波普先生，教教我怎么用刨子做东西吧。”",
            "labelEn": "\"Mr Popo, teach me how to use the plane.\"",
            "then": [
              {
                "s": "popo",
                "x": "波普把刨子递过来，粗糙的大手覆在你的手背上：“来，顺着木纹走。别用力硬压。听听木头在刀刃底下轻轻叹气。”",
                "en": "Popo handed over the plane, his rough palm over yours: 'Come, boy. Follow the grain. Don't force it. Listen to the wood sigh under the iron.'"
              },
              {
                "fx": "plane",
                "tip": "顺着木纹推动刨子，刨出清香的薄片 / Stroke the plane along the grain"
              },
              {
                "v": "imagine",
                "lvl": 2,
                "x": "我照着他的样子做了一个放鸡蛋的架子送给母亲。母亲用了一个星期，后来又把鸡蛋放回了碗里。我告诉波普，波普大笑：“孩子，要做东西，就要做没有名字的。”",
                "en": "I made an egg-rack for my mother. She used it for a week, then went back to putting eggs in a bowl. When I told Popo, he laughed: 'Boy, if you make something, make the thing without a name.'"
              }
            ]
          },
          {
            "label": "[想象检定] 替波普琢磨一块气派的招牌",
            "labelEn": "[Imagination] Design a grand signboard for Popo's shop",
            "check": {
              "id": "popo_signboard",
              "type": "white",
              "v": "imagine",
              "dc": 6,
              "modifiers": [
                { "text": "凝视刨花堆里的静谧造物", "textEn": "Purity of useless craft in shavings", "statGte": { "v": "imagine", "val": 3 }, "val": 1 }
              ]
            },
            "pass": [
              {
                "thought": "unnamed_object",
                "s": "narr",
                "x": "波普想称自己为“建筑师”，但我劝住了他，因为他的拼写老没个准儿。最后由我执笔写成了：【建造师及承包人 · 木匠 · 家具师】，并在右下方签上了我自己的名字。《未完成的物件》思潮在你脑海中萌发。",
                "en": "Popo wanted to call himself an architect, but his spelling was shaky. I wrote it for him: 'BUILDER AND CONTRACTOR / Carpenter / And / Cabinet Maker', signing my name in the corner. The thought 'The Thing Without a Name' takes root."
              },
              {
                "s": "popo",
                "x": "波普站在招牌前，两手叉腰，满意地连连点头：“小子，这就是艺术。”",
                "en": "Popo stood before the sign with his hands on his hips, nodding with immense satisfaction: 'Boy, that is art.'"
              }
            ],
            "fail": [
              {
                "s": "popo",
                "x": "波普咬着那截红铅笔头，嘟囔了半天也没想好该把自己的名字摆在哪儿。",
                "en": "Popo chewed his stub of red pencil, unable to decide where his grand titles ought to go."
              }
            ]
          }
        ]
      },
      {
        "s": "narr",
        "x": "波普喜欢站在招牌前。不过，一旦有生人前来咨询业务，他总会突然紧张起来，扯着嗓子对人家说：“那个木匠伙计？他搬走了。”",
        "en": "Popo loved standing by his sign. But whenever a stranger came to inquire about work, Popo would get nervous and shout: 'That carpenter fellow? He moved.'"
      },
      {
        "s": "narr",
        "x": "波普有个习惯，每天早上总拿着一杯朗姆酒站在人行道上。他从不喝杯里的酒，只是见有熟人，就用中指蘸蘸酒，再舔舔手指，然后朝熟人挥挥手。哈特常说：“我们也买得起朗姆酒，但我们不像波普这样炫耀。”",
        "en": "Popo had a habit: every morning he stood on the pavement with a glass of rum. He never drank it; whenever a friend passed, he dipped his middle finger in the rum, licked it, and waved. Hart said: 'We can afford rum too, but we don't show off like Popo.'"
      },
      {
        "s": "popo",
        "x": "波普对我说：“孩子，早晨太阳刚出来，天还有点凉，要是知道你一起床就能出去走走，一边晒太阳，一边喝点朗姆酒，你会觉得很舒服。”",
        "en": "Popo told me: 'Boy, in the morning when the sun just coming up and the air sweet and cool, to know you can walk out in the sun and taste a little rum—it make you feel good.'"
      },
      {
        "s": "narr",
        "x": "波普从不挣钱，都是妻子伊梅尔达在学校附近一户大富人家做厨娘挣钱养家。波普常说：“女人爱干活就让她们干吧，反正男人生来不是干活的。”哈特却在背后啐唾沫：“波普是个娘娘腔，不是条好汉。”",
        "en": "Popo never earned money; his wife Emelda worked as a cook for a rich family near my school. Popo said: 'Women like work; let them work. Man not made for work.' Hat grumbled: 'Popo is a woman-man, not a proper fellow.'"
      },
      {
        "s": "narr",
        "x": "我常去那家的大厨房看望伊梅尔达阿姨，顺便认识了英俊的花匠。他总是把修剪下的青草装在小袋里送给我喂鸡。可突然有一天，伊梅尔达阿姨没有等我；第二天早上，波普也没有站在路沿上舔朗姆酒。",
        "en": "I often visited Aunt Emelda in her kitchen, and met the handsome gardener who gave me bags of fresh grass cuttings for our hens. But one afternoon Emelda wasn't there; next morning, Popo didn't appear on the pavement with his rum."
      },
      {
        "s": "popo",
        "x": "那天晚上，我看见波普孤零零坐在工棚的木板上，两手搓着发黑的木屑：“你阿姨走了，孩子。”我问：“去哪儿了，波普先生？”他眼神发直：“哈，孩子！这个问题提得好。”",
        "en": "That evening I found Popo alone in his shed, rubbing sawdust between his palms: 'Your aunt gone, boy.' 'Where she gone, Mr Popo?' His eyes were dull: 'Ha, boy! That's the question.'"
      },
      {
        "choice": [
          {
            "label": "[街头智慧] 向街上的男人们打听伊梅尔达阿姨的去向",
            "labelEn": "[Street Smarts] Ask the street veterans where Aunt Emelda went",
            "check": {
              "v": "street",
              "dc": 6
            },
            "pass": [
              {
                "s": "hat",
                "x": "哈特凑近低语：“那个送你青草的花匠把她拐到阿里马去了！瞧瞧吧，波普天天端着酒杯装神仙，老婆早跟干粗活的汉子跑了！”",
                "en": "Hat whispered: 'That gardener fellow who gave you grass ran off with her to Arima! See? Popo stood around licking rum, and another man stole his woman!'"
              },
              {
                "v": "street",
                "lvl": 2,
                "x": "消息传开后，男人们突然同情起波普来，天天聚在工棚里谈板球和电影，绝口不提女人。工棚里不再有刨花声，木屑变得黑臭如烂泥。",
                "en": "The news spread, and suddenly Popo was popular. The men gathered in his shed talking cricket and movies, avoiding the word woman. The planes fell silent, and the shavings rotted black like mud."
              }
            ],
            "fail": [
              {
                "s": "hat",
                "x": "哈特不耐烦地挥手：“大人的事，小孩子别瞎打听。”",
                "en": "Hat waved his hand: 'Big people business, boy. Mind your own nose.'"
              }
            ]
          },
          {
            "label": "[共情体悟] 默默坐在波普身边，看着他满手的老茧",
            "labelEn": "[Empathy] Sit quietly beside Popo, looking at his calloused knuckles",
            "check": {
              "v": "empathy",
              "dc": 6
            },
            "pass": [
              {
                "v": "empathy",
                "lvl": 2,
                "x": "他不再笑了。工棚里的木头失去了新鲜的油脂香，像墓穴里的枯骨。",
                "en": "The laughter had drained out of him. The timber in the shed had lost its resin sweetness, dry and dead as graveyard bones."
              }
            ],
            "fail": [
              {
                "s": "popo",
                "x": "波普只是木然地揉搓着木屑，任凭热带暴雨把工棚顶砸得震天响。",
                "en": "Popo only stared blankly at his knuckles while the squall battered the tin roof."
              }
            ]
          }
        ]
      },
      {
        "s": "narr",
        "x": "后来波普孤身去了阿里马，打伤了那个花匠，被法官罚了款，警告他不准再去骚扰妻子。有人甚至就此编了一首卡里普索小调，安德鲁斯姐妹乐队把它灌成了唱片：【有个木匠伙计去了阿里马 / 为寻一个名叫伊梅尔达的小活宝】。波普顿时成了整条街的名人！",
        "en": "Then Popo went to Arima, beat up the gardener, got fined by the magistrate, and was warned to keep away. A calypso was composed about him, recorded by the Andrews Sisters: 'A carpenter being in the news / Was looking for a woman named Emelda...' Popo was suddenly a legend!"
      },
      {
        "s": "narr",
        "x": "波普回来后完全换了个人。他往工棚里拉了电灯，开始日夜拼命干活。他把房子刷得鲜亮：墙面刷成亮绿，屋顶刷成大红！哈特说：“这家伙准疯了，就像他又要做新郎官一样。”",
        "en": "Popo returned completely transformed. He ran an electric line into the shed and worked furiously night and day. He painted his shack bright green with a roof of screaming red! Hat chuckled: 'The man crazy. Like he going to be a bridegroom again.'"
      },
      {
        "s": "narr",
        "x": "哈特说得没错。两星期后，伊梅尔达回来了。哈特讽刺道：“女人就是这副德行，喜欢的是新房子和新家具。”然而我又能在早上看见波普擎着朗姆酒蘸手指了，我又听见他神气地大笑：“我在做一样没有名字的东西！”",
        "en": "Hart was right. Two weeks later, Aunt Emelda was back. Hart mocked: 'Women love a newly painted house and new furniture.' But I was overjoyed—Popo was back on the pavement with his rum, laughing proudly: 'I making the thing without a name!'"
      },
      {
        "g": "day",
        "music": "tense",
        "s": "hat",
        "x": "可好景不长。一天早晨，哈特拿着报纸狂叫起来：“快看！【小调里唱的木匠入狱】！上帝啊，波普那些精美的新家具全是他偷来的！他从别人家偷了东西，运回来重新组装上漆！”",
        "en": "But the joy was brief. One morning Hat shouted from the paper: 'Look at this! CALYPSO CARPENTER JAILED! God Almighty, all that grand furniture was stolen! He stole things, planed them down, and repainted them!'"
      },
      {
        "s": "narr",
        "x": "波普被判了一年苦役。哈特断言伊梅尔达顶多守三个月妇道就会改嫁，可阿姨始终守在米格尔街，替人洗衣服、熨衣服，苦苦等着波普出狱。",
        "en": "Popo was sentenced to a year of hard labour. Hart bet that Emelda wouldn't stay faithful for three months, but Aunt Emelda never left. She washed and ironed clothes for people, waiting faithfully for Popo's return."
      },
      {
        "s": "narr",
        "x": "一年后波普重返米格尔街，成了大英雄，人人都向他致敬。哈特赞许道：“波普现在是纯爷们儿了。他挨了拳头，蹲了苦牢，像个男人了。”",
        "en": "Popo returned after a year, a bona fide hero. Everyone tipped their hats to him. Hart declared: 'Popo is a man-man now. He took his blows, did his time, and came out like a man.'"
      },
      {
        "s": "narr",
        "x": "可是对我来说，他彻底变了。他开始规规矩矩地为别人批量制作普通的莫利斯椅子、方桌和衣柜。当我满怀期待地问他：“波普先生，你什么时候再做没有名字的东西呀？”",
        "en": "But for me, he was ruined. He began churning out sensible, ordinary Morris chairs, tables, and wardrobes for customers. When I asked him with longing: 'Mr Popo, when you going to make the thing without a name again?'"
      },
      {
        "s": "popo",
        "x": "波普猛地放下锯子，凶狠地臭骂道：“你他妈的真烦人！快滚开，否则我非狠揍你的屁股不可！”",
        "en": "Popo slammed down his saw and snarled: 'You too blast fast! You keep your tail quiet, you hear, before I brush it for you!'"
      },
      {
        "v": "memory",
        "lvl": 1,
        "x": "街坊们都说波普浪子回头，成了成功的体面木匠。可我知道，米格尔街上最珍贵的那道诗意被彻底杀死了。他再也不会去做没有名字的东西了。",
        "en": "The neighbours praised Popo as a reformed, respectable artisan. But I knew the rarest poetry on Miguel Street was dead. He would never again make the thing without a name."
      }
    ]
  },
  {
    "id": "george",
    "no": "III",
    "title": "乔治与粉红屋",
    "sub": "GEORGE AND THE PINK HOUSE",
    "hot": {
      "x": 44.5,
      "y": 28,
      "w": 12,
      "h": 38,
      "pin": [
        50.5,
        42
      ]
    },
    "tip": {
      "v": "empathy",
      "x": "破败的粉红木屋。粉红色刷得越刺眼，屋里的阴暗与毒打就越沉重。",
      "en": "A ramshackle house painted bright pink. The louder the pink, the darker the blows within."
    },
    "tipAfter": {
      "v": "memory",
      "x": "美军吉普车和水兵的喧嚣散尽，粉红屋只剩下一具空壳，和一个孤独死去的衰老背影。",
      "en": "When the jeeps and sailors vanished, only an empty shell remained, and an old man dying alone."
    },
    "item": {
      "name": "一条浸过牛棚水的旧皮带",
      "nameEn": "A Battered Leather Strap",
      "desc": "表面干裂褪色。乔治曾用它在自家牛棚的臭水里浸湿，用来抽打妻子、女儿多莉和儿子伊莱亚斯。",
      "descEn": "Dry and cracked, soaked in cowshed water by George to thrash his wife, Dolly, and Elias."
    },
    "note": "粉红屋的油漆越艳丽，屋里的黑暗越深沉。乔治毒打至亲，死时满面冷笑；多莉在婚礼狂欢中失声痛哭；最终水兵与美钞散尽，只剩下一个孤独衰死的老人。",
    "noteEn": "The brighter the pink paint, the deeper the cruelty within. George thrashed his blood, Dolly wept at her own wedding, and when the soldiers vanished, an old tyrant died alone in the dust.",
    "steps": [
      {
        "bg": "george",
        "g": "dusk",
        "music": "sad",
        "s": "narr",
        "x": "我怕“大脚”比佛，但更怕乔治，尽管“大脚”比佛是这条街上块头和力气最大的人。乔治又矮又胖，蓄着一撮灰色小胡子，肚子特别大。他就像他家院前拴着的那头老驴，又灰又老，除了偶尔嘶叫一番，平时就像个哑巴。",
        "en": "I was much more afraid of George than of Big Foot, although Big Foot was the biggest and strongest man on the street. George was short and fat, with a grey moustache and a big belly. He was like the donkey tied in his yard—grey, old, dumb, never seeming to care about anything."
      },
      {
        "s": "narr",
        "x": "乔治的房子也让我害怕。那是座破烂不堪的木屋，外面刷成了艳丽的粉红色，马口铁屋顶上布满了黑锈。房子右边的那扇门总是敞开着，内墙灰黑灰黑的，角落里只有一张极脏的床、一张小桌和一个凳子，没有窗帘，没有壁画。",
        "en": "George's house scared me too. It was a ramshackle shack painted bright pink, with a rusted corrugated roof. The door on the right stood permanently open. The walls inside were unpainted, greasy grey-black. In one corner sat a filthy bed, in another a bare table and stool. No curtains, no pictures."
      },
      {
        "s": "narr",
        "x": "乔治家养了几头牛，牛棚里淌出的脏水弄得门前阴沟臭气熏天。我们在人行道上打板球时，球常常掉进臭沟里。可乔治从不下牛棚干活，他总是搬个凳子坐在水泥台阶上，让妻子在牛粪里忙碌。",
        "en": "George kept cows, and the filthy water from the shed made the gutter stink. When we played cricket, the ball constantly fell into the ditch. George never worked in the cow-pen; he sat on the concrete steps while his wife toiled in the dung."
      },
      {
        "s": "narr",
        "x": "乔治有妻子、女儿多莉和儿子伊莱亚斯。他一个接一个地打他们。做母亲的越挨打越瘦弱，终日缩在牛棚里像个幽灵；可女儿多莉却越打越胖，挨完揍反而咯咯咯笑得更响。儿子伊莱亚斯越变越严肃，但从没跟父亲顶过一句嘴。",
        "en": "George had a wife, a daughter Dolly, and a son Elias. He beat them all systematically. The mother grew thinner and thinner, shrinking into the cowshed like a ghost; but Dolly grew fatter and giggled louder with every beating. Elias grew solemn and manly, but never answered back."
      },
      {
        "s": "narr",
        "x": "自打乔治买了两条凶猛的阿尔萨斯狼狗并拴在台阶旁的木桩上，我就更怕他了。每天我从他门前经过，他总是朝狗大喊一声：“扑过去！”两条恶犬便狂吠扑起，绳子扯得笔直，我吓得魂飞魄散，却只能硬着头皮慢慢走，生怕跑起来狗会挣脱绳子咬我。",
        "en": "When George bought two Alsatian dogs, I was terrified. Every time I passed, George shouted to the dogs: 'Sank!' The beasts lunged and snarled, the rope straining tight. My heart pounded, but I forced myself to walk slowly, remembering Hat's rule: never run from a dog."
      },
      {
        "s": "narr",
        "x": "后来乔治开始站在人行道上对着我咕哝：“马脸！怎么住在这地方的人都长着副马脸？”有时又咕哝：“小屁股！怎么世界上有屁股这么小的人？”我假装没听见，可一个星期后，我委屈得几乎要掉下眼泪来。",
        "en": "Then George took to muttering at me from the sidewalk: 'Horse-face! How everybody living in this place got horse-face?' Or: 'Little bottom! How anybody could have a bottom so small?' I pretended not to hear, but after a week of it, I was near crying."
      },
      {
        "choice": [
          {
            "label": "板球赛后，找伊莱亚斯打听他父亲为什么总找我麻烦",
            "labelEn": "After cricket, ask Elias why his father is always picking on you",
            "then": [
              {
                "s": "me",
                "x": "“伊莱亚斯，你爸爸为什么老是跟我过不去？他为什么总笑话我是马脸？”",
                "en": "\"Elias, why your father always picking on me? Why he always calling me horse-face?\""
              },
              {
                "s": "elias",
                "x": "伊莱亚斯停下球棒，一本正经地说：“伙计，我爸这人爱开玩笑。但你得原谅他。他说什么就由他说去。他老了，活得不容易。他不像我们这些人受过教育，可他的心眼并不坏。”",
                "en": "Elias stopped his bat, speaking with immense solemnity: 'Man, my father like to make joke. You got to forgive him. He old, he ain't have it easy. He ain't educated like we, but his heart ain't bad.'"
              },
              {
                "v": "empathy",
                "lvl": 2,
                "x": "看着伊莱亚斯那张真诚而严肃的脸，我默默告诫自己：“我应该原谅他。他不知道自己在做什么。”",
                "en": "Looking at Elias's earnest face, I told myself: 'I should forgive him. He knows not what he does.'"
              }
            ]
          },
          {
            "label": "[胆量红检定] 昂首挺胸走过乔治的台阶，直视他的眼睛",
            "labelEn": "[Red Check · Nerve] Walk tall past George's verandah, staring straight into his eyes",
            "check": {
              "id": "george_hounds_red",
              "type": "red",
              "v": "nerve",
              "dc": 7,
              "modifiers": [
                { "text": "直面暴力的狂悖", "textEn": "Confronting senseless brutality", "statGte": { "v": "nerve", "val": 3 }, "val": 1 }
              ]
            },
            "pass": [
              {
                "s": "narr",
                "x": "你强压下双腿的颤抖，直视着乔治肿胀泛红的眼泡。乔治愣了片刻，吐了一口浓痰，咕哝着转过头去。恶犬伏在地上低低呜咽。",
                "en": "Fighting down your shaking knees, you stared straight into George's puffy, bloodshot eyes. He blinked, spat into the gutter, and muttered away. The dogs slumped to the dirt with a whimper."
              }
            ],
            "fail": [
              {
                "damage": { "amount": 1, "reason": "乔治纵犬扑咬的恶毒恐吓" },
                "s": "narr",
                "x": "乔治猛地大喝：“扑过去！”恶犬狂暴腾起，恶臭的犬吻几乎蹭到你的膝盖，你吓得差点摔倒在臭水沟里，心跳剧烈得几乎呕吐。",
                "en": "George barked: 'Sank!' The hound leaped, snapping inches from your shins, and you nearly tumbled headlong into the sewage, heart pounding in nauseating terror."
              }
            ]
          }
        ]
      },
      {
        "s": "narr",
        "x": "后来，乔治的妻子死了。街上没有眼泪，也没有人为此哭泣。送葬那天，乔治穿戴着崭新的黑衣礼帽，在拉佩鲁斯公墓看着棺木下葬，竟然当着所有人的面发出嘿嘿嘿的怪笑。哈特冷冷地说：“他从没当众笑过，可看他老婆下葬时他笑得多欢。”",
        "en": "Then George's wife died. No tears, nobody wept. On burial day, George wore a clean black suit to Lapeyrouse cemetery. Watching the earth fall on the coffin, he chuckled: 'Heh, heh, heh!' Hat said: 'The man never laughed in public before, but look how merry he is putting his wife in the dirt.'"
      },
      {
        "s": "narr",
        "x": "乔治很快从乡下娶了个新老婆，可三天后就把她狠揍了一顿。两个星期不到，新老婆就卷铺盖跑了。哈特叹道：“等他把手头的积蓄折腾光，看他拿什么过活。”",
        "en": "George soon fetched a new wife from the country, but beat her after three days. Within two weeks she packed up and ran away. Hart sighed: 'Wait until his money runs dry, then we see how he eats.'"
      },
      {
        "g": "night",
        "music": "tense",
        "s": "narr",
        "x": "紧接着，美国大兵进驻了特立尼达。成群结队的水兵带着大把美钞涌入，粉红木屋一夜之间变成了整条街最喧闹的招待所。每天深夜，吉普车停在屋外，打扮艳俗的流莺进进出出，尖叫与狂笑打破了夜色。哈特痛骂：“乔治把整条街的名声都搞臭了！”",
        "en": "Then the Americans arrived. GIs and sailors flooded the town with US dollars, and the pink house became a crowded, roaring brothel overnight. Jeeps idled outside, loose women laughed brassily, and vulgar screams echoed through the dark. Hart fumed: 'George dragging the street's name through the gutter!'"
      },
      {
        "s": "narr",
        "x": "乔治发了大财，穿上了体面的毛料西装，戴上了领带，用大把美钞贿赂警察。奇怪的是，那些陌生女人对乔治不仅不怕，反而十分客气体贴。鲍嘉一星期总有两三晚泡在粉红屋里，多莉在里面给所有人做饭、打扫。而伊莱亚斯缩在自己的隔间里日夜苦读，准备着重要考试，对屋里的乌烟瘴气充耳不闻。",
        "en": "George grew wealthy, sporting a necktie and bribery dollars for the police. Oddly, the women were fond of him and treated him with respect. Bogart spent two or three nights a week there, Dolly cooked and swept for everyone, while Elias locked himself in his corner room, cramming for exams and ignoring the bedlam."
      },
      {
        "s": "george",
        "x": "一天，乔治当众宣布：“多莉现在没妈了，我得又当爹又当妈。我看多莉该嫁人了。”他选中了一个名叫“剃刀”雷泽的家伙——一个矮小精瘦、裤缝熨得笔挺、兜里随时揣着弹簧折刀的危险赌徒。",
        "en": "One day George announced: 'Dolly ain't got no mother now, so I got to be mother and father. Time for Dolly to marry.' He picked a fellow called Razor—a dapper, wiry man with knife-creased trousers and a razor tucked inside his pocket."
      },
      {
        "s": "narr",
        "x": "婚礼招待宴就在粉红屋里举行。打扮入时的女人们、醉醺醺的美国水兵挤满了院子。大家唱着《甜蜜十六岁》和《时光流逝》，起哄让新郎新娘亲嘴。多莉一直站在一旁咯咯咯地傻笑。哈特看着多莉，突然低声对我说：“你们知道吗，她不是在笑，是在哭呢。”",
        "en": "The wedding reception was held in the pink house. Fashionable girls and drunken sailors crowded the yard, singing 'Sweet Sixteen' and 'As Time Goes By', cheering for the couple to kiss. Dolly giggled without stopping. Hart watched her and muttered to me: 'You know what? She ain't laughing. She crying.'"
      },
      {
        "choice": [
          {
            "label": "[街头智慧] 挤上前听乔治在婚礼上的致辞",
            "labelEn": "[Street Smarts] Squeeze forward to hear George's toast to the bride",
            "check": {
              "v": "street",
              "dc": 6
            },
            "pass": [
              {
                "s": "narr",
                "x": "客人们拍手起哄：“新娘说话！老丈人说话！”乔治摇摇晃晃站起来，咧嘴大笑：“多莉，你结婚了，没错。可别以为你长大了我就治不了你——老子一样可以把你按在大腿上狠抽屁股！”",
                "en": "Guests cheered: 'Speech! Speech!' George swayed to his feet with a grin: 'Dolly, you married, yes. But don't think you too big for me to put you over my knee and thrash your backside!'"
              },
              {
                "s": "narr",
                "x": "客人们轰堂大笑。一个醉醺醺的美国水兵扯着嗓子喊：“乔治，你可以放这女孩去干点更好的事嘛！”",
                "en": "The crowd roared. A drunken American sailor yelled across the room: 'George, you could find something better to do to the girl than that!'"
              }
            ],
            "fail": [
              {
                "s": "narr",
                "x": "狂躁的音乐和尖叫声盖过了一切，只看得见乔治挥舞着酒杯，露出枯黄的牙齿。",
                "en": "The rowdy music drowned the speech; you could only see George waving his rum glass, flashing yellow teeth."
              }
            ]
          },
          {
            "label": "[共情体悟] 穿过起哄的人群，注视新娘多莉的眼睛",
            "labelEn": "[Empathy] Look past the drunken cheers into Dolly's eyes",
            "check": {
              "v": "empathy",
              "dc": 6
            },
            "pass": [
              {
                "v": "empathy",
                "lvl": 3,
                "x": "多莉脸上的笑容突然像摔碎的瓷器一样僵住了。她看着周围那些狂笑的醉汉与水兵，眼神里涌出一股濒死的绝望。",
                "en": "Dolly's smile froze like shattered porcelain. Surrounded by drunken leering faces, a look of mortal terror and despair flooded her eyes."
              }
            ],
            "fail": [
              {
                "s": "narr",
                "x": "多莉只是继续咯咯地笑着，直到眼眶通红。",
                "en": "Dolly just kept on giggling, though her eyes were raw and bloodshot."
              }
            ]
          }
        ]
      },
      {
        "s": "narr",
        "x": "多莉猛地抓起地上一把石子，发疯似地朝那个取笑的水兵砸去！但石子还没扔出，她突然扔下石头，捂着脸哇地一声放声痛哭。满院子的大兵和女人们却以为是闹剧，爆发出更热烈的欢呼与怪叫。",
        "en": "Dolly grabbed a handful of gravel to fling at the sailor! But her hand dropped, and she collapsed into violent, racking sobs. The sailors thought it was part of the show and cheered even louder."
      },
      {
        "g": "dusk",
        "music": "sad",
        "s": "narr",
        "x": "婚后多莉离开了米格尔街，再也没有回来。有人说她在桑格雷格朗德，有人说在集市上见过她。随着战争结束，城里的去处多了起来，粉红屋门外的吉普车越来越少，流莺们也纷纷散去。哈特说：“乔治太笨，成不了大器。”",
        "en": "Dolly left Miguel Street forever. Some said she was in Sangre Grande; others said she sold plantains in the market. As the war ended, competition grew, the jeeps disappeared, and the women vanished. Hart said: 'George was too stupid to keep big business going.'"
      },
      {
        "s": "narr",
        "x": "不到半年，粉红屋里只剩下乔治一个人。他又坐在门前的台阶上，头发全白了，显得又老又疲倦。他再也不咕哝“马脸”了，也不再朝狗喊“扑过去”。他只是木然地看着门前的阴沟。",
        "en": "Within six months, only George remained in the pink house. He sat on his steps, grey-haired, old, tired, and sad. He never shouted 'Horse-face' again; he never said 'Sank' to the dogs. He just sat staring blankly into the ditch."
      },
      {
        "s": "narr",
        "x": "不久后乔治就死了。哈特和几个兄弟凑了点钱，把他葬在了拉佩鲁斯公墓妻子躺着的土地旁。伊莱亚斯也赶来参加了葬礼，神情冷峻得像一尊石雕。",
        "en": "Not long after, George died. Hart and the boys pooled pennies to bury him at Lapeyrouse cemetery, near his wife's plot. Elias attended the funeral, his face solemn and unreadable as carved stone."
      },
      {
        "v": "memory",
        "lvl": 1,
        "x": "那栋曾装满皮带抽打声、水兵喧嚣与多莉眼泪的粉红房子，终于沉寂在加勒比海风中，成为街头一具苍凉的空壳。",
        "en": "The pink shack that once held drunken songs, the crack of the strap, and Dolly's desperate tears, stood silent at last under the Caribbean sun—an empty, weathered monument to pain."
      }
    ]
  },
  {
    "id": "elias",
    "no": "IV",
    "title": "自择的职业",
    "sub": "HIS CHOSEN CALLING",
    "hot": {
      "x": 74,
      "y": 35,
      "w": 9,
      "h": 32,
      "pin": [
        78.5,
        48
      ]
    },
    "tip": {
      "v": "street",
      "x": "清晨的市政清洁马车。伊莱亚斯曾发誓要当医生，如今他握着赶马的皮鞭。",
      "en": "A municipal scavenger cart on the curb. Elias swore he would be a doctor; now he holds the whip."
    },
    "tipAfter": {
      "v": "memory",
      "x": "落笔成字，永世长存。剑桥的梦想化为了泡影，但伊莱亚斯在垃圾堆上找到了平静的尊严。",
      "en": "'Litera scripta manet.' The Cambridge dream dissolved, but Elias found peace upon the rubbish heap."
    },
    "item": {
      "name": "一本翻烂的《剑桥中学会考指南》",
      "nameEn": "A Dog-Eared Cambridge Guide",
      "desc": "扉页上用蓝墨水端正写着：落笔成字，永世长存（Litera scripta manet）。那是少年时代不可动摇的雄心。",
      "descEn": "Inscribed in neat blue ink: Litera scripta manet — what is written remains. A boy's unshakeable ambition."
    },
    "note": "“这里没有道理可讲，面对现实吧。”从立志行医，到三次折戟剑桥、三次折戟卫生院，伊莱亚斯最终站在高高的蓝色垃圾车上，握紧皮鞭，找到了最平静的男子汉尊严。",
    "noteEn": "“There is no reasoning here. Face facts.” From dreams of medicine to thrice-failed exams in Cambridge and sanitation, Elias stood atop the blue refuse cart, whip in hand, claiming his own quiet pride.",
    "steps": [
      {
        "bg": "elias",
        "g": "day",
        "music": "calypso",
        "s": "narr",
        "x": "午夜过后，街上会定时传来两种声音。大约两点钟光景，是扫路人的沙沙竹扫帚声；黎明前夕，市政清洁马车轰隆隆驶来，车夫们把堆成堆的垃圾装上车斗。街上的男孩没人想当扫地的，但若问谁将来想干什么，准保回答：“我想做个清洁车夫。”",
        "en": "After midnight there were two regular noises in the street: at about two o'clock the sweepers with bamboo brooms; and just before dawn, the blue scavenging-carts scraping up the rubbish heaps. No boy wanted to be a sweeper, but every boy wanted to be a cart-driver."
      },
      {
        "s": "narr",
        "x": "驾蓝色马车可是件令人羡慕的美差。那些人简直是街头的贵族：只在清早干两三个钟头活，其余时间全闲着喝酒高谈阔论。他们动辄罢工：为了一天多要一分钱罢工，战争爆发了罢工，甘地死了也罢工。埃多斯就是个车夫，整条街的孩子都崇拜他。",
        "en": "Driving those blue carts was grand work—they were the aristocrats of the pavement. They worked only in the fresh dawn and had the rest of the day free. They went on strike for a penny raise, struck when war broke out, struck when Gandhi died. Eddoes was a driver, and every boy envied him."
      },
      {
        "s": "narr",
        "x": "一天我在清扫门前的人行道，埃多斯夺过扫帚：“小家伙，你懂多少扫地？这是我的行当，我有经验，等你长到我这么大再说吧。”这让我难过了好一阵子，觉得自己永远也长不到埃多斯那么大，更加渴望能当个驾马车的贵族。",
        "en": "One day Eddoes took my broom as I swept the pavement: 'What you know about sweeping, little man? This is my work. I got experience. Wait till you big as me.' I felt sad for weeks, believing I would never have experience, wanting more than ever to drive a scavenger cart."
      },
      {
        "s": "narr",
        "x": "可伊莱亚斯绝不是普通的男孩。当我们蹲在路沿上像大人们那样闲扯板球时，我对伊莱亚斯说：“你不想当车夫？那你想干什么？做个扫马路的？”伊莱亚斯朝阴沟里吐了一口唾沫，低头看了看，极其认真地说：“我想做一名医生。”",
        "en": "But Elias was different. When we squatted by the ditch talking cricket, I asked: 'You ain't want to drive cart? What you want to do then? Sweep road?' Elias spat neatly into the gutter, looked down, and said with immense gravity: 'I want to be a doctor.'"
      },
      {
        "s": "narr",
        "x": "要是这话出自博伊或埃罗尔之口，大家准会笑掉大牙。可我们知道伊莱亚斯与众不同，他极有头脑。虽然他父亲乔治经常用牛棚臭水浸湿的皮绳狠抽他，但他从不哭，也从不顶嘴。",
        "en": "If Boy or Errol had said that, we would have roared with laughter. But Elias had brains. Though his father George tied him up and whipped him with ropes soaked in cowshed water, Elias never cried and never talked back."
      },
      {
        "s": "me",
        "x": "“伊莱亚斯，等真当上了大医生，你准会把我们全给忘了。”",
        "en": "\"Elias, when you become a big doctor, you going to forget all about we.\""
      },
      {
        "s": "elias",
        "x": "伊莱亚斯嘴角浮现出一丝温暖的微笑，挥动着瘦小的双手：“不会的，伙计！我绝不会那样。我会给你、博伊还有大伙儿好多好多钱，给每个人都买一辆漂亮的自行车。”",
        "en": "Elias smiled faintly, waving his thin hands: 'No, man! I wouldn't do that. I going to give you, Boy, and all the rest heaps of money, and buy brand-new bicycles for everybody.'"
      },
      {
        "s": "narr",
        "x": "伊莱亚斯开始去米格尔街头泰特斯·霍伊特办的学校上学。门外挂着招牌：【泰特斯·霍伊特，中级文学学士（伦敦大学函授教育）· 保证获得剑桥中学文凭】。连乔治都骄傲地吹嘘：“这孩子学问大着呢，能读能写西班牙语、法语和拉丁语。”",
        "en": "Elias attended Titus Hoyt's school down the street, which bore a sign: 'TITUS HOYT, I.A. (Pass) · CAMBRIDGE SCHOOL CERTIFICATE GUARANTEED'. Even George boasted: 'The boy have big head—he can read and write Spanish, French, and Latin.'"
      },
      {
        "choice": [
          {
            "label": "考前替伊莱亚斯打气，向霍伊特老师讨教必胜秘诀",
            "labelEn": "Cheer Elias on before the exam and ask Mr Hoyt for the secret to victory",
            "then": [
              {
                "s": "titushoyt",
                "x": "霍伊特老师挥舞着教鞭，满面红光地宣读：“拉丁目客：Litera scripta manet——落笔成字，永世长存！伊莱亚斯写在考卷上的每一个字，都会被装进铁皮箱寄往英国剑桥大学！大英帝国的考官必须向他的才华脱帽！”",
                "en": "Titus Hoyt flourished his cane: 'Latin dictum: Litera scripta manet—what is written remains! Every word Elias writes will be sealed in tin trunks and shipped to Cambridge University in England! The London examiners will tip their hats to him!'"
              },
              {
                "v": "imagine",
                "lvl": 2,
                "x": "我们全街的伙伴都屏息凝神，目送伊莱亚斯穿着崭新雪白的卡其衬衫走进考场，仿佛看着一位远征伦敦的少年将军。",
                "en": "The whole street watched in awe as Elias marched to the exam room in spotless khaki trousers and a starched white shirt, like a young general marching on London."
              }
            ]
          },
          {
            "label": "[胆量检定] 问伊莱亚斯紧不紧张",
            "labelEn": "[Nerve] Ask Elias if he is nervous before the examination",
            "check": {
              "v": "nerve",
              "dc": 6
            },
            "pass": [
              {
                "s": "elias",
                "x": "伊莱亚斯深吸了一口气，整了整领扣：“我有泰特斯·霍伊特老师的拉丁文真传，就算总督坐在主考席上，我也答得出来。”",
                "en": "Elias straightened his collar with steady calm: 'I got Titus Hoyt's Latin behind me. Even if the Governor himself sat in the exam chair, I could answer him.'"
              }
            ],
            "fail": [
              {
                "s": "elias",
                "x": "伊莱亚斯掌心全是冷汗，只是默默地摸了摸铅笔盒，快步走进了考场。",
                "en": "Elias's palms were dripping with sweat; he clutched his pencil box and hurried inside without a word."
              }
            ]
          }
        ]
      },
      {
        "s": "narr",
        "x": "放榜的那天下午，大伙儿全围聚在哈特的后廊。《特立尼达卫报》送来了。哈特用手指顺着及格名单一行行往下划。一等没有伊莱亚斯，二等没有伊莱亚斯，最后在三等名单的靠后位置找到了他：“伊莱亚斯·乔治——西班牙语、法语、数学优异”。",
        "en": "Results day in January. We crowded around Hat's verandah. The Trinidad Guardian arrived. Hat ran his thumb down the lists. Grade One: no Elias. Grade Two: no Elias. Near the tail of Grade Three: 'Elias George—credit in Spanish, French, maths'."
      },
      {
        "s": "titushoyt",
        "x": "泰特斯·霍伊特擦着额头的汗水强颜欢笑：“及格就是及格！落笔成字，永世长存！虽然三等读不了医学院，但他已经是咱们街第一位剑桥学者了！”",
        "en": "Titus Hoyt mopped his brow with a nervous grin: 'A pass is a pass! Litera scripta manet! Third Grade cannot do medicine, but he is still the first Cambridge scholar on our street!'"
      },
      {
        "s": "elias",
        "x": "但伊莱亚斯并不认输。他咬牙道：“我要自己去趟剑桥……我要看看他们凭什么给我三等。明年我还要再考一次。”",
        "en": "But Elias refused to give up. He gritted his teeth: 'I going to Cambridge myself... see what they mean by giving me a third grade. I sitting again next year.'"
      },
      {
        "s": "narr",
        "x": "第二年，伊莱亚斯名落孙山。他神情落寞地对我们解释：“最让我头疼的是英语和温学（文学）。”哈特问：“你是说你要读很多雌歌（诗歌）吗？”伊莱亚斯点了点头。从伊莱亚斯嘴里说出的“温学”听起来像巧克力一样好吃，我觉得让这么小的孩子学温学和雌歌实在太残忍了。",
        "en": "The second year, Elias failed completely. He confessed sadly: 'The English and the litritcher was the trouble.' Hat asked: 'You mean you had to read a lot of poultry?' Elias nodded. 'Litritcher' sounded as delicious as chocolate from his mouth, and it seemed unfair that a boy had to suffer poultry so young."
      },
      {
        "s": "narr",
        "x": "乔治死后，伊莱亚斯搬回了粉红屋。他成了整条街最干净端正的青年：每天洗两次澡、刷两次牙，把屋子打扫得一尘不染，还在霍伊特的学校当老师，每月挣四十元。母亲总骂我：“你为什么不能学学伊莱亚斯？”可第三年考试放榜，伊莱亚斯再次落榜。老实说，我心里竟掠过一丝幸灾乐祸。",
        "en": "Elias moved back to the pink house after George died. He became the cleanest boy in Port of Spain: bathed twice a day, brushed his teeth twice at the standpipe, and taught at Hoyt's school for forty dollars a month. When he failed the third time, I felt, to tell the truth, a slight gleeful relief."
      },
      {
        "s": "elias",
        "x": "哈特叹道：“英国佬从来不愿给咱们穷孩子高分。”伊莱亚斯吐了一口气，平静下来说：“没关系，我改变主意了。我想当卫生检查员。戴卡其帽，带小笔记本，挨家挨户检查院子。我确实喜欢这行。”",
        "en": "Hart swore: 'Them Englishmen don't like giving we high marks.' Elias took a deep breath: 'Never mind. I change my mind. I want to be a sanitary inspector. Khaki helmet, little notebook, inspecting yards. I really like that work.'"
      },
      {
        "s": "hat",
        "x": "哈特盘算起来：“这行油水大着呢！乔治为了堵卫生检查员的嘴，每月要送五块钱。要是管八到十家，八五四十，十乘五五十，白捡四五十块外快！”博伊插嘴：“我还以为你想当医生呢？”哈特立刻骂道：“博伊，闭上你的臭嘴，否则我割断你的小尾巴！”",
        "en": "Hart calculated: 'Good money in that! George used to give five dollars a month to shut the inspector's mouth. Ten houses make fifty dollars extra!' Boy piped up: 'I thought you wanted to be a doctor?' Hat snapped: 'Shut your mouth, Boy, before I cut your tail!'"
      },
      {
        "s": "narr",
        "x": "然而特立尼达的卫生检查员考试更黑。伊莱亚斯连考了三年，年年落榜。他苦笑道：“在特立尼达你还能指望什么呢？就是请人剪个脚趾甲也得行贿。”",
        "en": "But the Sanitary Inspector exam in Trinidad was even more corrupt. Elias sat for it three years running, failing every time. He sighed: 'What you expect in Trinidad? You have to bribe to cut a toenail in this place.'"
      },
      {
        "choice": [
          {
            "label": "[街头智慧] 听哈特替伊莱亚斯策划去外岛碰运气",
            "labelEn": "[Street Smarts] Listen to Hat plotting exam trips to other Caribbean islands",
            "check": {
              "v": "street",
              "dc": 6
            },
            "pass": [
              {
                "s": "narr",
                "x": "哈特劝他去英属圭亚那，说那里的考试容易。伊莱亚斯坐飞机去了圭亚那，落榜飞了回来；哈特又劝他去巴巴多斯，他又飞去巴巴多斯，再次落榜飞回。当哈特又说“那天我碰到一个格林纳达人……”时，伊莱亚斯猛地站起身吼道：“闭上你的臭嘴，哈特，不然我跟你没完！”",
                "en": "Hat told him to fly to British Guiana where the exam was easy. Elias flew, failed, and flew back. Hat told him to fly to Barbados; Elias flew, failed, and flew back. When Hat began, 'I meet a Grenadian man the other day...' Elias stood up and shouted: 'Shut your mouth, Hat, before I hit you!'"
              }
            ],
            "fail": [
              {
                "s": "narr",
                "x": "旅费花光了，伊莱亚斯默默地把准考证撕成碎片扔进了阴沟。",
                "en": "His savings exhausted, Elias quietly ripped up his exam slips and let the ditch water carry them off."
              }
            ]
          },
          {
            "label": "[共情体悟] 看着伊莱亚斯那叠翻烂的卫生防疫法规",
            "labelEn": "[Empathy] Watch Elias thumbing through his dog-eared sanitary codes",
            "check": {
              "v": "empathy",
              "dc": 6
            },
            "pass": [
              {
                "v": "empathy",
                "lvl": 3,
                "x": "那个曾经梦想当医生的少年，在一次又一次的制度嘲弄中耗尽了青春。他的卡其衬衫洗得发白，但脊梁依然挺得笔直。",
                "en": "The boy who dreamed of being a doctor had spent his youth against a brick wall of colonial indifference. His khaki shirt was frayed, but his spine remained unbroken."
              }
            ],
            "fail": [
              {
                "s": "narr",
                "x": "伊莱亚斯把那本厚厚的法规塞回抽屉，一整天没有说一句话。",
                "en": "Elias shoved the battered health code into his drawer, silent for the rest of the day."
              }
            ]
          }
        ]
      },
      {
        "s": "narr",
        "x": "几年后我也参加了剑桥考试，侥幸拿了二等，很快被海关录用，领到了一套带黄铜纽扣的漂亮卡其制服和制服帽。第一天穿上制服走在街上，正好撞见伊莱亚斯。伊莱亚斯嫉妒得脸色铁青，冲我咆哮：“你妈为给你弄到这份肥差，到底给当官的送了什么好处？！”我气得要跟他拼命，被埃多斯一把拽住：“别动手，孩子。他只是伤心和嫉妒，没有坏心。”",
        "en": "Years later I sat the Cambridge exam, scraped a Second Grade, and got a job in Customs, receiving a khaki uniform with brass buttons and a cap. When Elias saw me in uniform, his face turned livid with jealous fury: 'What your mother do to get you that job?!' I lunged to fight him, but Eddoes pulled me back: 'Leave him alone, boy. He only sad and jealous, that's all.'"
      },
      {
        "s": "narr",
        "x": "后来，伊莱亚斯终于也穿上了工作装——他成为了米格尔街上最荣耀的贵族之一，驾起了那辆高高的蓝色市政清洁马车。清晨时分，他端坐在马车的高座上，手里熟练地挥舞着赶马的皮鞭，神情安详而威严。",
        "en": "Later, Elias found his place among the street's true aristocracy: he became a driver of the blue municipal scavenging carts. At dawn he sat high on the bench, cracking his leather whip with effortless mastery, dignified and serene."
      },
      {
        "s": "elias",
        "x": "当我站在路沿上向他招手时，伊莱亚斯勒住马绳，朝路面啐了一口唾沫，平静地对我说：“这世上没有道理可讲，伙计。面对现实吧。我真的喜欢我现在干的工作。”",
        "en": "When I waved from the curb, Elias pulled the reins, spat cleanly into the gutter, and said with absolute peace: 'There is no reasoning here, man. Face facts. I really like the work I doing now.'"
      },
      {
        "v": "memory",
        "lvl": 1,
        "x": "剑桥的考卷化为了废纸，医生的美梦碎在了泥潭。但在黎明破晓的灰尘与马蹄声中，伊莱亚斯在垃圾堆的最高处赢回了属于他自己的男子汉尊严。",
        "en": "The Cambridge papers had turned to ash, the dream of medicine drowned in the ditch. But amidst the morning dust and clattering hooves, Elias sat high upon the refuse cart, possessing an unassailable dignity all his own."
      }
    ]
  },
  {
    "id": "manman",
    "no": "V",
    "title": "曼曼",
    "sub": "MAN-MAN",
    "hot": {
      "x": 31,
      "y": 38,
      "w": 11,
      "h": 36,
      "pin": [
        36.5,
        52
      ]
    },
    "tip": {
      "v": "imagine",
      "x": "沥青路面上残留着雪白的粉笔灰。曼曼蹲在地上，正专注地描绘着世上最圆的字母。",
      "en": "White chalk dust on the asphalt. Man-man kneels, tracing the roundest letters in the world."
    },
    "tipAfter": {
      "v": "memory",
      "x": "布鲁盆地的十字架空了。当真正的乱石砸来时，新救世主终于用市井脏话叫了警察。",
      "en": "The cross at Blue Basin stands abandoned. When real stones pelted down, the Messiah called for the police in furious patois."
    },
    "item": {
      "name": "一截磨圆的白色大理石粉笔",
      "nameEn": "A Stump of White Chalk",
      "desc": "曼曼曾用它在人行道上工工整整写下'SEE'与一个个巨大的'O'，直到拼出完整的'SCHOOL'。",
      "descEn": "Used by Man-man to trace gigantic, immaculate letters on the pavement: 'SEE' and endless 'O's."
    },
    "note": "曼曼疯没疯，我说不准。在米格尔街，大家都以为自己清醒，只有曼曼认真地把发疯当成了全职工作。",
    "noteEn": "Whether Man-man was mad or not, I could never tell. He was the only man on Miguel Street who took his madness as serious, dignified employment.",
    "steps": [
      {
        "bg": "manman",
        "g": "day",
        "music": "calypso",
        "s": "narr",
        "x": "米格尔街上的所有人都说曼曼是个疯子，所以大家都离他远远的。曼曼疯没疯，我说不准，不过倒是能想出许多比曼曼疯得多的人。反正他看上去并不疯。中等身材，体形瘦弱，相貌也不差。他从不像疯子那样斜着眼看你。如果你闭上眼睛听他说话，准会以为他是个一口纯正牛津腔的英国上流绅士，尽管这位绅士说话时不那么讲究语法。",
        "en": "Everybody in Miguel Street said that Man-man was mad, and so they left him alone. But I am not so sure that he was mad, and I can think of many people who were much madder than Man-man. He didn't look mad. He was of medium height, slim, not bad-looking, and he never stared at you wildly. If you shut your eyes and listened to him, you would swear he was an English gentleman speaking immaculate Oxford English, even if the gentleman didn't mind his grammar."
      },
      {
        "s": "narr",
        "x": "不过他也确实有些怪癖。每逢市镇议会或立法机构选举，他必定参加，总要在选区各处贴满考究的海报，上头工整地印着他的照片和大字“投票给曼曼”。每次开票，他不多不少永远正好得三张票。就算曼曼投了自己一票，另外两票究竟是谁投的？哈特常说：“伙计，我也说不清。也许是两个爱开玩笑的人，想必他们也像曼曼一样疯了。”这个问题困扰了我许多年。",
        "en": "He had his little eccentricities, of course. At every election, municipal or legislative, he was a candidate, plastering the ward with handsome printed placards bearing his portrait and the words: 'VOTE FOR MAN-MAN'. At every count he polled exactly three votes. Even if Man-man voted for himself, who gave him the other two? Hat used to say: 'Man, that is a mystery. Maybe two jokers as mad as Man-man.' The mystery of those two voters worried me for years."
      },
      {
        "s": "narr",
        "x": "曼曼从不干活，可他也从没闲着。他对写在地上的字格外着迷。一天早上我在米格尔街拐角碰见他。“小家伙，你去哪儿？”曼曼板着脸用纯正的英国腔问我。“我去上学。”我说，不自觉地学起他的绅士口音。曼曼自言自语：“这么说，小家伙是去上学喽。”说完他掏出一长截白粉笔，跪在炙热的沥青路上，在地上画了一个巨大的S轮廓，慢慢填满，接着写了C、H，然后写了一长串O，沿着法国街一路写下去。",
        "en": "Man-man never worked, but he was never idle. He was fascinated by the written word. One morning at the corner of Miguel Street he asked me: 'So, you going to school?' in his faultless English accent. 'Yes,' I said, unconsciously mimicking him. 'So, the little man is going to school,' he murmured, pulling out a long stick of chalk. Kneeling on the hot asphalt, he drew a giant outline of an 'S', filled it in, then 'C', 'H', and an endless string of 'O's down French Street."
      },
      {
        "choice": [
          {
            "label": "[街头智慧] 下午放学换上便服，回到人行道看曼曼如何给单词收尾",
            "labelEn": "[Street Smarts] Change into home clothes in the afternoon and see how Man-man finishes his word",
            "check": {
              "v": "street",
              "dc": 6
            },
            "pass": [
              {
                "s": "narr",
                "x": "下午我换了便服出来，曼曼已经绕着街区转了一圈，正在米格尔街中段擦掉写错的粉笔灰。他直了直腰问：“小家伙今天已经上过学了？”我说：“是的。”他又蹲下，在地上画了一个巨大的“L”轮廓，聚精会神地填满：“你的活儿干完了，我的活儿也干完了。”（S-C-H-O-O-L！）如果你对他说你要去打板球，他就会写下“CRICK”，然后全神贯注地写上一整天的“E”，直到你回来！",
                "en": "In the afternoon, I came out in ordinary clothes. Man-man had circled the block and was midway down Miguel Street, rubbing out chalk with a rag. 'So, the little man has been to school today?' 'Yes,' I said. He bent down and drew a gigantic 'L' and filled it in carefully: 'Your work finish, my work finish.' (S-C-H-O-O-L!) If you told him you were going to cricket, he would write 'CRICK' and then endless 'E's until you returned!"
              },
              {
                "v": "street",
                "lvl": 1,
                "x": "在百无聊赖的殖民地街头，曼曼比任何拿着公俸的督学都要守时与严谨。",
                "en": "On the sluggish colonial pavement, Man-man was more punctual and solemn than any salaried school inspector."
              }
            ],
            "fail": [
              {
                "s": "manman",
                "x": "曼曼冷冷地白了我一眼，用那口标准的伦敦腔说道：“走开，小伙子。神圣的字词经不起凡俗目光的无端打扰。”",
                "en": "Man-man gave me a cool, aristocratic stare, speaking in clipped Oxford tones: 'Be off, young fellow. The sanctity of language requires undistracted concentration.'"
              }
            ]
          },
          {
            "label": "[荒诞洞察] 观察他在柏油路上写下巨大的花体“SEE”",
            "labelEn": "[Deadpan Vision] Observe him chalking gigantic letters of 'SEE' on the asphalt",
            "check": {
              "v": "imagine",
              "dc": 6
            },
            "pass": [
              {
                "s": "narr",
                "x": "有时他在地上只写一个词：“SEE”。他工工整整写了又擦，擦了又写，直到整个人行道都布满了巨大的“看”字。他指着头顶盘旋的秃鹰，又指着排水沟里泛着油光的污水，自言自语：“看哪，看哪。”米格尔街的人脚步匆匆地踩过这些字，谁也不曾停下来看上一眼。",
                "en": "At times he wrote just one word: 'SEE'. He wrote it, rubbed it out, and wrote it again until the pavement was covered in gigantic capitals. He pointed to the corbeaux overhead, then to the green slime in the gutter, muttering: 'See. See.' People hurried past, stepping right over the letters, never looking at all."
              },
              {
                "v": "imagine",
                "lvl": 2,
                "x": "疯子在地上写下了指令，而清醒的人全都是盲目的。",
                "en": "The madman chalked the commandment, and the sane walked by blind."
              }
            ],
            "fail": [
              {
                "s": "narr",
                "x": "曼曼擦了擦额头的汗，用袖口用力抹去多余的笔画，仿佛一个字若是没写圆，整个世界的秩序就会坍塌。",
                "en": "Man-man wiped his brow, buffing away an imperfect chalk curve with his sleeve as though an irregular letter would collapse the universe."
              }
            ]
          }
        ]
      },
      {
        "s": "narr",
        "x": "真正让大家疏远曼曼的，是米格尔街头大咖啡馆的那桩公案。店老板是个身材高大、手背长满浓密黑毛的葡萄牙人。一天曼曼在店里朝顾客大呼小叫，好像他是条恶犬。店老板将他粗暴地扔出了门外。哈特当时就告诫：“千万别得罪曼曼，他可记仇了。”",
        "en": "What really made people keep their distance was the feud at the big cafe. The proprietor was a tall Portuguese with thick dark hair on the back of his hands. One morning Man-man barked at customers like a dog, and the Portuguese threw him out into the gutter. Hat warned: 'Never get Man-man vexed. He has a long memory.'"
      },
      {
        "s": "narr",
        "x": "第二天清晨，老板发现有人夜里潜入咖啡馆打开了所有的门，却什么也没少；第三天清晨，所有的大门又被敞开着；到了第四天夜里，咖啡馆再次被潜入——这一回，在每张凳子的中央、所有桌子的台面正中，都端端正正排着一小团一小团的新鲜狗屎！柜台上也整齐地排了一长串！一连好几个星期，咖啡馆老板成了全街的笑柄，过了很久才有人敢重新进去喝咖啡。",
        "en": "The next morning, the proprietor found someone had broken into the cafe at night and opened every single door. Nothing was stolen. The next night, all doors opened again. On the third night, it was entered once more—this time, a neat little mound of dog faeces was deposited right in the center of every stool, on every table, and a tidy row along the counter! For weeks the Portuguese was the laughingstock of the street, and it was a long time before anyone ventured in for coffee."
      },
      {
        "s": "hat",
        "x": "哈特摇头叹道：“心眼坏着呢，生来就如此。”曼曼唯一的伙伴是一条白耳朵上带黑斑的杂种狗。这狗也很怪，从不乱叫，也从不盯着你看，更不与其他狗往来。而且曼曼似乎一手控制了狗的拉撒。每天早晨女人们把刚洗好的雪白床单晒在草地上，曼曼就领着狗在衣服旁吹口哨，狗一摆出下蹲的架势，女人们便吓得尖叫着扔出六便士：“拿去！快把你的狗牵走！”曼曼脱帽致意，收下银币慢悠悠地离开。",
        "en": "Hat shook his head: 'Bad mind, born so.' Man-man's only friend was a little mongrel with black spots on its white ears. The dog was eccentric like Man-man: never barked, never stared, and ignored other dogs with cold contempt. Man-man seemed to have trained the dog's bowels. When women spread freshly washed white linen to bleach on the grass, Man-man strolled by, whistling softly as the dog squatted. Screaming women hurled sixpences from verandahs: 'Take it! Call off your dog!' Man-man tipped his hat, pocketed the coin, and ambled on."
      },
      {
        "g": "dusk",
        "music": "sad",
        "s": "narr",
        "x": "曼曼爱他的狗，狗也爱曼曼，他们俩谁也离不开谁。然而一天下午，一辆英国大兵的重型卡车在拐角处疾驰而过，把小狗当场轧死了。曼曼没有大喊大叫，也没有哭。他默默抱起小狗软绵绵的尸体走回屋子。米格尔街的人第一次觉得曼曼挺可怜的。",
        "en": "Man-man loved his dog, and the dog loved Man-man. But one afternoon, an army truck came roaring round the corner and ran over the little mongrel. Man-man didn't yell or weep. He silently lifted the limp body against his chest and walked inside. For the first time, Miguel Street felt sorry for Man-man."
      },
      {
        "g": "night",
        "music": "tense",
        "s": "narr",
        "x": "从那以后，曼曼完全变了。他蓄起浓密的长胡子，穿上一袭纯白的长袍，怀里抱一本《圣经》。每逢周六夜晚，他在街角向人群大声布道：“这几天我一直在和上帝交谈。政客们都在谈论如何使本岛自给自足。上帝昨晚对我说：‘曼曼，过来看看这些人吧！’他让我看到丈夫吃妻子，妻子吃丈夫，父亲吃儿子，兄弟吃姐妹！这就是政客们口中的自给自足！”",
        "en": "After that, Man-man transformed. He grew a long dark beard, clothed himself in a flowing white gown, and carried a Bible. On Saturday nights he preached on the street corner: 'I been talking with God these few days. The politicians talk about making the island self-sufficient. God said to me last night: \"Man-man, come and look at these people!\" He show me husband eating wife, wife eating husband, father eating son! That is what self-sufficiency mean!'"
      },
      {
        "s": "narr",
        "x": "每周六晚听完他的布道我都要做噩梦。可奇怪的是，他越是把大家吓得半死，大家越是挤破头去听，募捐锡罐里落下的硬币也越来越多。他四处讨饭，说自己奉了耶稣之命，散尽了一切家财。大家私下里安慰自己说曼曼确实疯了，但谁心里也吃不准他究竟疯了没有。",
        "en": "I had nightmares every Saturday after hearing him. Yet the more he terrified the crowd, the thicker they gathered, showering coins into his collection tin. He begged for food, claiming Jesus commanded him to give away all worldly possessions. People comforted themselves by saying Man-man was truly mad, though down inside they were never entirely certain."
      },
      {
        "s": "hat",
        "x": "不久，曼曼宣布他是新的救世主。一天哈特气喘吁吁地跑来：“伙计们，听说了吗？曼曼说他这两天要把自己送上十字架！就在布鲁盆地，让人用石头砸他！”埃罗尔忍不住笑了笑，见没人跟着笑，又悻悻地闭上了嘴。除了忧虑，我们心里居然还有点为曼曼感到骄傲——他毕竟是我们米格尔街走出来的救世主。",
        "en": "Soon Man-man proclaimed himself the new Messiah. One day Hat came over: 'You hear the news? Man-man say he going to be crucified at Blue Basin! He going to tie himself to a cross and let people stone him!' Errol started to giggle, but seeing nobody join in, shut his mouth. Mixed with worry, we felt an odd pride: after all, he was our own Miguel Street Messiah."
      },
      {
        "g": "dawn",
        "s": "narr",
        "x": "受难日当天大清早，电车还没营运，米格尔街拐角已挤满了人群。男人们身穿黑衣，穿白衣的妇女们唱着圣歌，还有二十来名面色严肃的警察。一辆载着巨大木十字架的货车轰鸣着开来。哈特穿着整齐的哔叽西服，打量着十字架，很失望地咕哝：“他们告诉我，十字架是用做火柴的软木料拼的，轻得很。”",
        "en": "Early on Good Friday, before the trams were running, a massive crowd jammed the corner. Men in black, women in white singing hymns, and twenty stony-faced policemen. A lorry arrived carrying a gigantic wooden cross. Hat, in a crisp serge suit, inspected the cross with mild disgust: 'They tell me the cross make out of matchwood. Light as a feather.'"
      },
      {
        "choice": [
          {
            "label": "[朝圣同行] 随大队人马步行两小时，翻山前往布鲁盆地瀑布",
            "labelEn": "[Pilgrimage] March two hours into the northwestern hills to Blue Basin waterfall",
            "check": {
              "v": "nerve",
              "dc": 6
            },
            "pass": [
              {
                "s": "narr",
                "x": "曼曼那天早晨的英国口音让所有人肃然起敬：“不是在这，放到布鲁盆地那儿！”我们顶着烈日徒步两个多小时，翻过西班牙港西北面的崎岖山峦，一直下到乱石嶙峋的盆地边。瀑布轰鸣，几名壮汉竖起十字架，用粗绳将曼曼牢牢绑了上去。",
                "en": "Man-man's British diction that morning commanded absolute awe: 'Not here! Take it to Blue Basin!' We marched two hours in blazing sun over the northwestern hills down to the stony waterfall gorge. Men raised the cross upright and bound Man-man firmly with heavy cords."
              },
              {
                "v": "nerve",
                "lvl": 1,
                "x": "圣歌在山谷间回荡，宛如一场真正的加勒比受难记。",
                "en": "Hymns echoed off the wet limestone, a true Caribbean passion play."
              }
            ],
            "fail": [
              {
                "s": "narr",
                "x": "山路险峻泥泞，哈特擦着汗抱怨：“这个曼曼，连挑个殉道的地方都要把全城的人累断腿。”",
                "en": "The mountain trail was steep and muddy; Hat mopped his brow: 'This Man-man, choosing a crucifixion spot that breaks everyone's shins.'"
              }
            ]
          },
          {
            "label": "[受刑见证] 凝视十字架上的曼曼，倾听他最后的布道",
            "labelEn": "[The Passion] Watch Man-man on the cross and hear his solemn proclamation",
            "then": [
              {
                "s": "manman",
                "x": "曼曼在日光下昂起头，用纯正宏亮的英国腔向四周高呼：“用石头砸我吧，兄弟们！天父啊，宽恕他们，因为他们不知道自己在做什么！”",
                "en": "Man-man raised his head against the sky, chanting in ringing English: 'Stone me, brethren! Father, forgive them, for they know not what they do!'"
              }
            ]
          }
        ]
      },
      {
        "s": "narr",
        "x": "女人们哭着将细沙和小碎石朝他的脚下抛去。曼曼虔诚地闭着眼睛呻吟：“砸我呀，兄弟们！我会宽恕你们的。”爱德华在人群后低声赞叹：“这家伙真勇敢。”然而，不知是哪个调皮的泥水匠突然抓起一块鸡蛋大的卵石，呼的一声正中曼曼的胸口！",
        "en": "Women wept, tossing sand and tiny pebbles gently at his bare feet. Man-man groaned with saintly piety: 'Stone me, brethren! I forgive you!' Edward whispered from the ranks: 'The man brave, yes.' Then, a rough mason threw an egg-sized cobblestone. Whack! It struck Man-man square in the chest."
      },
      {
        "s": "manman",
        "x": "曼曼猛地睁开眼，表情剧痛而惊愕：“这究竟是怎么了？你们知道你们在做什么吗？听着，快把我从这东西上放下来！我要找那个朝我扔石头的狗杂种算账！”",
        "en": "Man-man's eyes snapped open in startled agony: 'What the hell is this? You know what you doing? Look, untie me quick! Let me down from this thing! I want to find the son-of-a-bitch who threw that rock!'"
      },
      {
        "s": "narr",
        "x": "爱德华和哈特站立的人群中爆发出不可遏止的哄笑与怒吼，紧接着，更多拳头大的石块和碎石雨点般砸向十字架！曼曼用纯正的三流市井俚语破口大骂：“别做蠢事了！住手，你们听见没有！听着，这个狗屁玩笑该结束了！操你们全家！警察！救命啊！”",
        "en": "A roar rose from where Hat and Edward stood. Instantly, real fist-sized rocks pelted the cross! The Messiah vanished. In frantic Trinidad slang Man-man shrieked: 'Stop this damn foolishness! Look, stop pelting, you bastards! The joke finish! Police! Untie me quick! Save me!'"
      },
      {
        "thought": "street_messiah",
        "v": "street",
        "lvl": 2,
        "s": "narr",
        "x": "警察挥舞警棍冲上前，把浑身青肿的曼曼从十字架上解下，直接押上了救护车。当局把他关进了疯人院，永远地关了起来。米格尔街上再也没有人见过他。哈特在回城的路上抽着烟：“在特立尼达，你可以当任何角色，直到你真把玩笑当成了真理。”思潮《受洗的疯子救世主》在你脑海中萌发。",
        "en": "The police charged in, untied the bruised prophet, and bundled him into the ambulance van. The authorities locked him up in the lunatic asylum, locked him up for good. Nobody in Miguel Street ever saw Man-man again. Hat lit a cigarette on the road back: 'In Trinidad, you can play at anything, until you make the mistake of believing your own joke.' The thought 'The Backyard Messiah' takes root."
      }
    ]
  },
  {
    "id": "words",
    "no": "VI",
    "title": "B.华兹华斯",
    "sub": "B. WORDSWORTH",
    "hot": {
      "x": 58.5,
      "y": 15,
      "w": 10,
      "h": 42,
      "pin": [
        64,
        30
      ]
    },
    "tip": {
      "v": "imagine",
      "x": "阿尔贝托街的荒野木屋，四棵高大的棕榈树与结满红芒果的老树。诗人在此凝视星空。",
      "en": "A one-room hut on Alberto Street amidst wild mango and coconut trees, where a poet gazes at the stars."
    },
    "tipAfter": {
      "v": "memory",
      "x": "荒野木屋被推倒，芒果树与椰子树被砍光，只剩下冰冷的水泥砖房。仿佛世上从未有过B.华兹华斯。",
      "en": "The hut pulled down, trees felled for a two-storey concrete block. Just as though B. Wordsworth had never been."
    },
    "item": {
      "name": "一张折叠发脆的四行诗纸条",
      "nameEn": "A Crisp Folded Slip of Verse",
      "desc": "上面写着世界上最伟大的诗篇的第一行：'往昔是幽深的。'",
      "descEn": "The solitary line of the greatest poem in the world: 'The past is deep.'"
    },
    "note": "二十二年写一首唱进全人类心里的诗，一月一行。在他弥留之际，他用一个残酷的谎言，换回了我一生的眼泪与清醒。",
    "noteEn": "One line a month for twenty-two years. On his deathbed, he told a cruel, loving lie to set a young poet free.",
    "steps": [
      {
        "bg": "words",
        "g": "day",
        "music": "calypso",
        "s": "narr",
        "x": "在米格尔街，每天都有三个乞丐准时来到热情友好的人家门前。大约十点，会出现一个身缠腰带、外穿白夹克的印度人，我们会把一罐米放进他背后的口袋里。十二点会过来一个叼烟袋的老妇人，她会得到一分钱。下午两点是一个孩子领着个盲人来讨钱。有时我们也会向流浪汉施舍一顿饱饭和一支烟。",
        "en": "Three beggars called punctually every day at the hospitable houses in Miguel Street. At about ten an Indian dressed in dhotis and a white jacket came, and we placed a tin of rice into the bag on his back. At twelve came an old woman smoking a pipe, receiving a cent. At two a blind man led by a boy. Sometimes we fed a hungry drifter with food and a cigarette."
      },
      {
        "s": "narr",
        "x": "有天下午四点左右，来了一个特别奇怪的人。当时我已经放学换上便服。那人身材矮小，穿戴得极整洁，头戴礼帽，身着白衬衣和黑裤子。他脱下帽子，礼貌地问我：“孩子，我可以进你家院子吗？我想看看你们家的蜜蜂。”我家院子里有四棵美洲棕榈王，上面聚满了成群的蜜蜂。",
        "en": "But one afternoon around four, a very strange caller arrived. I had come home from school in ordinary clothes. The man was small and tidy, wearing a hat, a clean white shirt, and black trousers. He took off his hat and asked with sweet politeness: 'Son, may I come into your yard to look at your bees?' We had four royal palms crowded with bees."
      },
      {
        "s": "mother",
        "x": "母亲走出来，不太友好地打量着他：“你要干吗？”那人说：“我想看看你们的蜜蜂。”他的英文流利文雅，几乎可以说做作。母亲有些顾虑，转头叮嘱我：“待在这儿，他看蜜蜂时，你给我看着点他。”那人脱帽致谢：“谢谢您，太太。您今天行了善。”他说话极慢，字正腔圆，就好像每说一个字都要花他钱似的。",
        "en": "My mother came out and asked inhospitably: 'What you want?' 'I want to watch your bees.' His English was fluent and polished, almost affected. Mother hesitated, warning me: 'Stay here and watch him while he watch the bee.' The man bowed: 'Thank you, lady. You have done a good deed today.' He spoke with majestic slowness, as though every syllable cost him hard cash."
      },
      {
        "s": "narr",
        "x": "我们蹲在棕榈树下看蜜蜂进出，足足看了一个小时。“我喜欢看蜜蜂。孩子，你喜欢看吗？”“我没这闲工夫。”我说。他沮丧地摇头：“我就爱干这个，就是看。我能整天看蚂蚁，你看过蚂蚁吗？还有蝎子、蜈蚣和两栖鲵，你看过吗？”我摇了摇头。“你是做什么的，先生？”他站起来骄傲地说：“我是诗人。世界上最伟大的诗人。”",
        "en": "We squatted under the royal palms for an hour. 'I like watching bees. You like watching, boy?' 'I ain't have the time,' I said. He shook his head sadly: 'That's what I do. Just watch. I could watch ants all day. You ever watch ants? And scorpions, centipedes, and congorees?' I shook my head. 'What you do, mister?' He stood up proudly: 'I am a poet. The greatest poet in the world.'"
      },
      {
        "s": "words",
        "x": "“我叫B.华兹华斯。B是布莱克（Black），怀特（White）·华兹华斯是我哥哥，我们两兄弟心灵相通。就连看见牵牛花那样的小花，我都会哭。”“为什么哭？”“等你长大就明白了。你也会成为一个诗人，懂吗？当你做了诗人后，你就会为任何一件事哭泣。”",
        "en": "B. Wordsworth. B for Black. White Wordsworth was my brother; we share one heart. I can cry at the sight of a tiny morning-glory.' 'Why?' 'When you're a poet you can cry for everything. You will understand when you grow older. You will be a poet, too.'"
      },
      {
        "choice": [
          {
            "label": "[推销绝作] 听他从裤兜里掏出那张四分钱的纸片",
            "labelEn": "[Buy the Verse] Listen to him offer the four-cent poem about mother",
            "check": {
              "v": "street",
              "dc": 6
            },
            "pass": [
              {
                "s": "words",
                "x": "“这张纸上有一首最伟大的写母亲的诗，我打算便宜点卖给你，四分钱。”我跑进屋问：“妈，你想用四分钱买一首诗吗？”母亲在厨房大吼：“赶快叫那该死的家伙夹着尾巴滚出我的院子！”我跑出去告诉他，B.华兹华斯平静地把纸片收回兜里：“这就是诗人的不幸。”",
                "en": "This slip has the greatest poem about mothers. I will let you have it cheap, for four cents.' I ran in: 'Ma, you want to buy a poem for four cents?' Mother shouted from the kitchen: 'Tell that scamp to take his tail out of my yard!' I ran back and told him. B. Wordsworth tucked the slip into his pocket without taking offense: 'This is the tragedy of poets.'"
              },
              {
                "v": "street",
                "lvl": 1,
                "x": "在米格尔街，只有唱卡里普索小调的流浪汉才卖唱，而纯诗歌在西印度群岛一文不值。",
                "en": "On Miguel Street, only calypsonians sold lyrics; pure verse wasn't worth four copper cents."
              }
            ],
            "fail": [
              {
                "s": "words",
                "x": "B.华兹华斯叹了口气：“世人总是行色匆匆，不知美为何物。”",
                "en": "B. Wordsworth sighed gently: 'Men rush blindly through life, never tasting beauty.'"
              }
            ]
          },
          {
            "label": "[知己相认] 问他走遍大街却从没卖出过一首诗，为何还要转悠",
            "labelEn": "[Kindred Soul] Ask why he still wanders when nobody has ever bought a poem",
            "check": {
              "v": "imagine",
              "dc": 6
            },
            "pass": [
              {
                "s": "words",
                "x": "“没有一个人买过。”他说，“但我能看到许多事情，我一直希望能遇见诗人。你也是个诗人，和我一样好的诗人。”他向我告别，我心中默默祈祷着能再次见到他。",
                "en": "Nobody has ever bought one,' he said. 'But in this way I see many things, and I always hope to meet a poet. You are a poet, too, boy. As good a poet as I am.' He smiled and left, and I prayed I would see him again."
              },
              {
                "v": "imagine",
                "lvl": 2,
                "x": "少年贫瘠的心灵里，第一次被播下了一颗名为“诗人”的种子。",
                "en": "In a poor boy's heart, the first secret seed of poetry had been planted."
              }
            ],
            "fail": [
              {
                "s": "words",
                "x": "他轻轻拍了拍少年的肩膀，微笑着走入烈日下的街角。",
                "en": "He patted the boy's shoulder gently and stepped into the shimmering heat."
              }
            ]
          }
        ]
      },
      {
        "g": "day",
        "s": "narr",
        "x": "一周后放学，我们在拐角又碰到了。“我等你好久了，”他说，“我的院子里有棵西班牙港最好的芒果树，芒果熟了，又红又甜又多汁，我特意等在这儿请你去吃。”他住在阿尔贝托街正中心的一间单间小屋里。院子里荒草丛生，长着高大的芒果树、椰子树和李子树，宛如闹市中的荒野。",
        "en": "A week later after school, I met him at the corner. 'I have been waiting for you,' he said. 'In my yard I have the best mango tree in Port of Spain. The mangoes are ripe, red and sweet and juicy. I waited to invite you.' He lived in a one-room hut on Alberto Street. The yard was an overgrown wilderness with a tall mango tree, a coconut palm, and a wild plum, like the deep bush set inside town."
      },
      {
        "s": "narr",
        "x": "芒果甜美多汁，我坐在树下一连痛吃了六个！黄色的果汁顺着我的胳膊肘流下来，染透了我的白衬衫。回到家，母亲怒不可遏：“去给我折根鞭子来！”她狠狠地抽打我。我哭着冲出家门，鼻子流着血，发誓再也不回去了。我一路狂奔来到B.华兹华斯家。",
        "en": "The mangoes were juicy and sweet; I sat on the roots and ate six without stopping! The golden juice ran down to my elbows and stained my white shirt. At home, Mother barked: 'Where you been? Go cut a switch for me!' She whipped me savagely. Bleeding at the nose, sobbing with rage, I ran out swearing never to return, heading straight for B. Wordsworth's hut."
      },
      {
        "g": "dusk",
        "music": "sad",
        "s": "narr",
        "x": "B.华兹华斯看着我流血的鼻子，没有说一句责备的话。他只是平静地说：“别哭了，我们出去走走。”我们沿着圣克莱尔大道漫步，穿过大草原公园，一直走到赛马场中央那片浩瀚无垠的青草地上。",
        "en": "B. Wordsworth looked at my bloody nose and said not a word of blame. He simply said: 'Stop crying, and we will go for a walk.' We walked down St. Clair Avenue into the vast Queen's Park Savannah, strolling across the grass to the silent racecourse rail."
      },
      {
        "fx": "stars",
        "tip": "连接萨瓦纳大草原的星轨 / Connect the Savannah Constellations"
      },
      {
        "s": "words",
        "x": "“现在，让我们躺在草地上，仰望天空。我要你想想，星星离我们究竟有多远？”我们在草地上躺了很久。我看着深邃无底的夜空，世界变得浩瀚而宁静，我忘记了母亲的皮鞭，忘记了流血与愤怒，心里只有无尽的奇迹。",
        "en": "Now, let us lie down on the grass and look up at the sky. I want you to think how far the stars are from us.' We lay in the moist grass for hours. Gazing into the star-strewn blackness, my anger and the cowhide whip were completely forgotten. The universe was immense, cold, and full of wonder."
      },
      {
        "s": "narr",
        "x": "他向我讲述了那个故事：曾经有一个年轻的男诗人和女诗人相爱结了婚。女诗人很喜欢花园，他们在院子里种下草木花卉。后来姑娘死了，肚子里未出生的小诗人也随她而去。姑娘的丈夫悲痛欲绝，发誓再也不碰花园里的任何东西，任由草木自生自灭。我看着B.华兹华斯苍老的面庞，我听懂了他的故事。",
        "en": "He told me the story: Once a boy poet and a girl poet fell in love and married. The girl loved flowers, and together they made a wild garden. Then the girl died, and the little unborn poet died inside her. The husband was heartbroken, vowing never to touch a blade of grass in her garden, letting it grow wild forever. Looking at B. Wordsworth's withered face, I understood his tale."
      },
      {
        "choice": [
          {
            "label": "[万物皆诗] 随他爬上大臣山俯瞰港口，在防波堤旁见证落水的铁钉",
            "labelEn": "[The Great Poem] Climb Chancellor Hill and watch the nail drop at the wharf",
            "check": {
              "id": "words_great_poem",
              "type": "white",
              "v": "imagine",
              "dc": 7,
              "modifiers": [
                { "text": "萨瓦纳草原仰望星轨的触动", "textEn": "Savannah star-gazing epiphany", "val": 2 },
                { "text": "诗人的学徒同情共鸣", "textEn": "Poet apprentice resonance", "statGte": { "v": "empathy", "val": 3 }, "val": 1 }
              ]
            },
            "pass": [
              {
                "thought": "quarter_of_four_cents",
                "heal": { "amount": 2, "reason": "十四行诗与深邃星空抚平了所有母爱皮鞭的创伤" },
                "s": "narr",
                "x": "他做任何事都像参加神圣的教堂仪式。在码头防波堤边，我问：“如果我把这枚钉子扔进水里，能浮起来吗？”他说：“这是个奇妙的世界，扔下去试试看。”钉子沉入大海。我问起他那首举世无双的诗篇。他告诉我，他每个月写一行，已经写了五年，还要写二十二年：“上个月的一行是——‘往昔是幽深的。’二十二年后，它将唱进全人类的心里。”",
                "en": "He did everything as though it were a sacred ritual in church. On the wharf wall I asked: 'If I drop this nail in the water, it will float?' He smiled: 'It is a strange world. Drop it and see.' The nail sank. I asked about his world masterpiece. He told me he wrote one line a month, five years done, twenty-two more to go: 'The line for last month was—\"The past is deep.\" In twenty-two years, it will sing to all humanity.'"
              },
              {
                "v": "imagine",
                "lvl": 2,
                "x": "少年在加勒比的大海前，默默记住了这句照亮孤寂岁月的诗行。",
                "en": "Beside the Caribbean tide, the boy memorized the line that illuminated a lifetime."
              }
            ],
            "fail": [
              {
                "s": "words",
                "x": "B.华兹华斯望着海面喃喃道：“快写成了……你知道，马上就要成了。”",
                "en": "B. Wordsworth murmured over the waves: 'It is coming along, boy. Just coming along.'"
              }
            ]
          },
          {
            "label": "[探问生计] 询问他平日里靠什么谋生",
            "labelEn": "[Calypso Season] Ask how he earns his living through the year",
            "then": [
              {
                "s": "words",
                "x": "“每年在卡里普索的季节，我都要去唱小调。挣来的钱足够我维持一整年的清苦开支。”他狡黠地一笑。",
                "en": "In the calypso season I sing calypsos. That is enough to keep me for the year.' He gave a mischievous wink."
              }
            ]
          }
        ]
      },
      {
        "g": "dusk",
        "music": "sad",
        "s": "narr",
        "x": "几年过去，老人迅速衰老了。有一天我推开阿尔贝托街小屋的门，发现他虚弱地躺在小床上，眼神涣散：“诗写得不太顺利……二十岁时，我感觉浑身都是力量。可那……那是很久以前的事了。”死神已经爬上了他布满皱纹的面孔，任何人都能一眼看出来。我坐在他的床边，泪水夺眶而出。",
        "en": "Years slipped by, and he aged rapidly. One afternoon I opened the wooden door and found him lying helpless on his narrow cot, staring past me: 'The poem isn't going well... When I was twenty, I felt the power within me. But that... that was long ago.' Death had settled upon his wrinkled face, unmistakable. Sitting upon his knees, tears filled my eyes."
      },
      {
        "s": "words",
        "x": "他把我搂进单薄的胸膛，努力挤出一丝微笑：“哦，你也能看见了，我就知道你有诗人的眼光。你想听我讲个好玩的故事吗？但你必须答应我，听完后立刻离开，再也不要回来看我。”我哭着点了点头。老人深情而残忍地轻声说：“听着。关于那个男诗人和女诗人的故事，是我瞎编的。所有写诗的事，还有那首世界上最伟大的诗，全都是我编的谎话。这是不是你听过最好玩的故事呀？”",
        "en": "He pulled me against his frail chest, smiling to cheer me: 'You can see it too. I always knew you had the poet's eye. You want to hear a funny story? But you must promise to leave as soon as I finish, and never come back. Promise?' I nodded through my tears. The old man whispered with tender cruelty: 'Listen. That story about the boy poet and girl poet—it wasn't true. I made it up. And all that talk about poetry and the greatest poem in the world—it was all a lie. Isn't that the funniest story you ever heard?'"
      },
      {
        "g": "day",
        "music": "guitar",
        "s": "narr",
        "x": "老人的声音哽咽中断了。我哭着跑出了屋子，跑回家里，像个真正的诗人一样，看见任何东西都忍不住流泪。一年后，我重走阿尔贝托街，小屋已经荡然无存。野草、椰子树、芒果树全被推倒铲平，取而代之的是一栋冰冷的两层混凝土砖房。砖块与水泥封死了一切。就好像B.华兹华斯先生从未在这个世上存在过。",
        "en": "His voice broke. I fled the hut sobbing, running home like a true poet, crying for everything. A year later, walking down Alberto Street, not a trace of the hut remained. The mango, plum, and coconut trees were axed and cleared, replaced by a squat, cold two-storey concrete block. Only brick and mortar. Just as though B. Wordsworth had never been."
      },
      {
        "v": "memory",
        "lvl": 3,
        "s": "narr",
        "x": "他在弥留之际撕碎了自己的神话，只为了不让一个崇拜他的少年在虚妄的泥淖里沉沦。那是一生中最残忍、也最慈悲的诗篇。",
        "en": "On his deathbed, he tore his own myth to shreds so that a boy would not drown in colonial illusions. It was the cruelest, and most merciful, poem he ever made."
      }
    ]
  },
  {
    "id": "bigfoot",
    "no": "VII",
    "title": "懦夫",
    "sub": "THE COWARD · BIG FOOT",
    "hot": {
      "x": 26,
      "y": 30,
      "w": 10,
      "h": 40,
      "pin": [
        31,
        44
      ]
    },
    "tip": {
      "v": "nerve",
      "x": "高大漆黑的阴影笼罩着人行道。米格尔街人人都怕比佛，却没人知道他的秘密。",
      "en": "A huge, dark shadow across the pavement. Everyone feared Big Foot, yet none knew his secret."
    },
    "tipAfter": {
      "v": "memory",
      "x": "王子大厦的看台上充斥着哄笑。小丑拳击手终于泪洒擂台，流浪去拉文蒂尔采石场凿石头。",
      "en": "The arena echoed with jeers. The clown boxer wept on the canvas and drifted off to Laventille quarry."
    },
    "item": {
      "name": "一副沾着血渍的磨损拳击手套",
      "nameEn": "A Pair of Worn, Blood-Stained Gloves",
      "desc": "在王子大厦的拳台上，那个让全街闻风丧胆的巨汉丢下它，在角落里痛哭如孩童。",
      "descEn": "Dropped on the canvas at Princes Building, where the town's most terrifying giant wept like a child."
    },
    "note": "比佛的凶狠与沉默，不过是一副抵御恐惧的笨拙铠甲。一旦被真正剥开，里面只有一个被打碎了胆子的可怜孩子。",
    "noteEn": "Big Foot's menacing silence was merely an armor against terror. Beneath it was a boy trembling from childhood beatings.",
    "steps": [
      {
        "bg": "bigfoot",
        "g": "day",
        "music": "calypso",
        "s": "narr",
        "x": "“大脚”比佛长得真大、真黑，米格尔街上人人都怕他。倒不是因为他的个头与肤色，周围比他更大更黑的人也有的是。大家怕他是因为他极少说话，总是绷着阴沉沉的凶脸，像一条从不乱叫却随时会咬人的恶犬。在学校，我常吓唬同学：“比佛就住在我家那条街上，你们谁敢惹我，我就去叫比佛。”其实我连一个字都没跟他说过。",
        "en": "Big Foot was really big and really black, and everybody in Miguel Street was afraid of him. Not because of his size and color; there were bigger and blacker men around. People feared him because he hardly ever spoke, brooding with a sinister scowl like a vicious dog that never barks. At school I used to brag: 'Big Foot lives on my street. If any of you touch me, I'll tell Big Foot.' In truth, I had never spoken a single word to him."
      },
      {
        "s": "narr",
        "x": "比佛在西班牙港是个家喻户晓的传奇人物。有一回他朝特立尼达广播电台大楼扔了块大石头，砸碎了一扇窗玻璃。当法官严肃地问他为什么砸窗时，比佛竟粗声答道：“为了叫醒他们。”一位好心人为他交了罚款。后来他当公共汽车司机，把满车乘客拉到城外五英里的海滩，逼所有乘客下车游泳，自己在岸边看笑话。",
        "en": "Big Foot was something of a famous character in Port of Spain. Once he threw a stone through a window of Radio Trinidad. When the magistrate asked his motive, Big Foot grunted: 'To wake them up.' A gentleman paid his fine. Later he got a job driving a bus; he drove it five miles out to Carenage, ordered all passengers off to bathe in the sea, and stood watching them like a circus."
      },
      {
        "s": "narr",
        "x": "随后他又当上了邮递员，信件老是送错。一天有人在码头看见他把半包邮件扔在地上，自己坐在栈桥上把那双硕大无朋的大脚泡在帕里亚湾的海水里乘凉：“伙计，送信累着呢，你说得倒轻巧。”米格尔街看电影时，我们在前排说说笑笑，比佛在后面掏出一把弹簧折刀，“咔哒”一声刺进我的椅背，冷冷地说：“说吧。”两个小时全场死一般寂静。",
        "en": "Then he took a job as a postman and constantly misdelivered letters. One afternoon someone spotted him by the wharf, dumping half his sack of mail while soaking his gigantic bare feet in the cool Gulf of Paria: 'Man, you talk easy, but walking about delivering letters is hard work.' At the cinema, we were laughing in our seats until a spring-knife snapped into the timber of my backrest: 'Talk!' Big Foot whispered. For two hours, none of us breathed a word."
      },
      {
        "s": "hat",
        "x": "哈特跟我们讲过比佛的身世：“比佛是个老警察的儿子。那老东西每天都要痛揍比佛，就像吃药一样，一日三顿，饭后必揍！比佛小时候常发誓：‘等我长大了有了孩子，我也揍他们，往死里揍！’一九三七年油田工人闹暴动，他当差的爹逞英雄，被暴民当场打死了，比佛这才没被打死。”",
        "en": "Hat told us of Big Foot's upbringing: 'Big Foot's father was a policeman who beat him like medicine—three times a day after meals. Big Foot used to swear: \"When I grow up and have children, I go beat them till they dead!\" In the 1937 oilfield riots, his father tried to be a hero and the crowd killed him. That was the only reason Big Foot survived.'"
      },
      {
        "choice": [
          {
            "label": "[乞讨险遇] 回忆向驻岛美国水兵讨口香糖时，比佛的意外庇护",
            "labelEn": "[American GI] Recall begging a drunken sailor for chewing gum under the afternoon sun",
            "check": {
              "v": "nerve",
              "dc": 6
            },
            "pass": [
              {
                "s": "narr",
                "x": "美军驻扎特立尼达时，我们几个小孩到处讨口香糖赚零花钱。一天下午两点街上空无一人，我冲上去向一个醉醺醺的美国兵要糖。大兵骂了句“小叫花子”，扬起巴掌就要抽我！突然街角传来一个沙哑可怖的低吼：“喂，别碰那小家伙，听见没有。”是比佛！那个美国兵吓得浑身一哆嗦，灰溜溜地溜走了。比佛连看都没看我一眼，大踏步走过。",
                "en": "When the Americans arrived, we begged chewing gum to earn pennies. One scorching afternoon at two, I ran up to a drunken GI asking for gum. The GI muttered an oath, raising his fist to slap me down! Suddenly a gravel roar shook the air: 'Leave that boy alone, you hear.' It was Big Foot! The white soldier turned white as chalk and hurried away. Big Foot didn't even glance at me as he strode past."
              },
              {
                "v": "nerve",
                "lvl": 1,
                "x": "尽管比佛救了我，可我发现自己反而比以前更怕他了。",
                "en": "Although Big Foot saved me, I realized I was even more terrified of him than before."
              }
            ],
            "fail": [
              {
                "s": "narr",
                "x": "美国兵挥舞着拳头，我吓得一头钻进了排水沟，膝盖擦得全是血。",
                "en": "The soldier cursed, and I scrambled into the open gutter in blind fright."
              }
            ]
          },
          {
            "label": "[昔日旧账] 追问哈特他们当年在学校是如何捉弄弱小的比佛",
            "labelEn": "[Schoolyard Secret] Ask Hat how the boys used to tease skinny little Big Foot",
            "check": {
              "v": "street",
              "dc": 6
            },
            "pass": [
              {
                "s": "hat",
                "x": "“其实以前我们总追着他到处打，真是好玩极了。他小时候瘦得皮包骨，根本跑不动。可后来在校运动会上，他一百码跑了十秒四！打那以后我们都很想和他交朋友，可他再也不理人了。”",
                "en": "We used to chase him all over the place; it was good fun. He was skinny as a reed and couldn't run. But at the school sports he ran the hundred yards in ten-point-four seconds! After that we all wanted to be his friend, but he wouldn't speak a word.'"
              },
              {
                "v": "street",
                "lvl": 1,
                "x": "伤口早已结痂，但长大的比佛用高大的身躯筑起了生人勿近的高墙。",
                "en": "The scars had healed into granite; adult Big Foot walled himself away behind menacing silence."
              }
            ],
            "fail": [
              {
                "s": "hat",
                "x": "哈特啐了一口烟沫：“小孩子别打听这么多，小心比佛拔了你的舌头。”",
                "en": "Hat spat on the curb: 'Mind your business, boy, before Big Foot cuts your tongue out.'"
              }
            ]
          }
        ]
      },
      {
        "g": "dusk",
        "s": "narr",
        "x": "后来比佛在特立尼达做起了泥瓦匠。一天他来我家院子铺地，他甚至把那双硕大无朋的脚掌当泥刀使。下午四点干完活，他突然粗声粗气地对我说：“小家伙，出去走走吧！太热了，去吹吹海风。”我心里害怕极了，却不敢拒绝。我们默默走到了码头附近寂静黝黑的海堤上。",
        "en": "Big Foot turned into a mason. One day he came to pave our yard, using his huge feet like trowels to level the mortar. At four he grunted: 'Little fellow, come for a walk. I hot, want some sea breeze.' I was scared out of my wits, but dared not refuse. We walked together in silence to the dark, deserted sea-wall near the docks."
      },
      {
        "choice": [
          {
            "label": "[海堤惊魂] 黑暗中突然传来一声尖叫与水花声",
            "labelEn": "[Terror in the Dark] A sharp shriek breaks the silence by the splashing water",
            "check": {
              "v": "nerve",
              "dc": 6
            },
            "pass": [
              {
                "s": "narr",
                "x": "夜幕低垂，海面一片漆黑。猛然间，废墟后传来一声刺耳的怪叫！一只浑身湿淋淋的黑白花小狗欢叫着向我们扑来，溅得我满身是水！我回头去找比佛，却惊骇地发现——这个铁塔般的巨汉竟然发出杀猪般的尖叫，在黑暗中疯了一样狂奔出二十多码！",
                "en": "Darkness fell over the water. Suddenly, a weird shriek pierced the silence! A wet black-and-white puppy bounded from the dark, wagging its tail and splashing water on my trousers. I looked for Big Foot, and saw an astounding sight—the terrifying mountain of a man was screaming in wild terror, bolting twenty yards into the dark!"
              },
              {
                "v": "nerve",
                "lvl": 2,
                "x": "恶魔在黑夜里露出了他最隐秘的破绽。",
                "en": "In the shadows, the monster's deepest, trembling secret was laid bare."
              }
            ],
            "fail": [
              {
                "s": "narr",
                "x": "突如其来的怪叫把我也吓得瘫坐在地上，半天喘不上气。",
                "en": "The sudden yowl gave me such a fright that my knees buckled onto the wet stone."
              }
            ]
          },
          {
            "label": "[小狗狂欢] 跑上前查看比佛为何在乱石堆中嚎叫",
            "labelEn": "[The Cut Foot] Run up to see why Big Foot is howling in the gravel",
            "then": [
              {
                "s": "bigfoot",
                "x": "“天哪！我要死了，我要死了！我的脚被玻璃瓶割破了！”比佛瘫倒在碎石堆里杀猪般惨嚎。",
                "en": "Oh God, I going dead, I going dead! My foot cut on a big bottle!' Big Foot wailed on the stones."
              }
            ]
          }
        ]
      },
      {
        "thought": "paradox_of_tears",
        "s": "narr",
        "x": "当那只湿漉漉的小狗摇着尾巴凑过去时，比佛竟然瞬间忘了流血的脚。他伸开两只粗壮的胳膊一把将小狗抱进怀里，笑得像个死里逃生的天真孩子。那一刻，我彻底掌握了比佛的全部秘密：他怕黑！他怕小狗！他所有的残暴与威严全是一场虚张声势！《大脚的眼泪悖论》思潮在你脑海中萌发。",
        "en": "When the wet puppy trotted over, Big Foot instantly forgot his bleeding foot. He wrapped his massive arms around the dog, petting it and laughing with childlike joy. At that instant, I held Big Foot's greatest secret: he was terrified of the dark! Terrified of dogs! His whole menacing dread was a pathetic bluff. The thought 'The Paradox of Tears' emerges in your mind."
      },
      {
        "g": "day",
        "s": "narr",
        "x": "二战期间，街坊们聚在马路牙子上争论战局。博伊说：“德国人厉害着呢，牙齿能咬断铁钉，每个人都像比佛一样又高又壮，比比佛还勇敢。”比佛正好走过，眼神里满是可怜的乞求。我把目光移开了，守口如瓶。不久，哈特在报纸上读到大新闻：“比佛学拳击了！报纸管他叫‘小丑成了拳击手’！”比佛在擂台上连胜几名业余选手，穿着栗色短裤在街上昂首阔步。",
        "en": "During the war, Boyee argued on the pavement: 'Germans strong, bite nails in two with their teeth. Big like Big Foot, and braver.' Big Foot passed by, shooting me a pathetic, pleading look. I kept silent. Soon Hat shouted over the morning paper: 'Big Foot learning to box! Look at the headline: \"CLOWN TURNS BOXER\"!' He knocked out local amateurs, strutting Miguel Street in silly maroon shorts."
      },
      {
        "s": "hat",
        "x": "一名英国皇家空军退役白人拳手来到特立尼达，在报纸上赤膊摆出姿态挑衅：“谁敢向此人挑战？”全特立尼达高呼：“比佛敢！”决战定在西班牙港王子大厦。哈特兴奋得像发了疯，在街上到处拉人打赌，挥舞着钞票开出四赔一的高额盘口。",
        "en": "An Englishman arrived, boasting he was an RAF champion. The papers printed him posing in black trunks: 'WHO DARES CHALLENGE THIS MAN?' Trinidad shouted: 'Big Foot!' The match was set for Princes Building. Hat went wild, waving twenty-dollar bills on the pavement, laying bets at four to one."
      },
      {
        "fx": "boxing_bet",
        "tip": "在王子大厦拳赛单上下注 / Inspect Odds & Wager at Princes Building"
      },
      {
        "choice": [
          {
            "label": "[冷面下注 · 红检定] 拿出兜里仅有的六分钱，跟博伊打赌比佛会输",
            "labelEn": "[Red Check · Deadpan Bet] Put down your solitary six cents with Boyee, betting Big Foot will lose",
            "check": {
              "id": "bigfoot_boxing_bet_red",
              "type": "red",
              "v": "street",
              "dc": 7,
              "modifiers": [
                { "text": "洞悉暴力的脆弱本质", "textEn": "Dissected the brittle myth of violence", "statGte": { "v": "street", "val": 3 }, "val": 2 }
              ]
            },
            "pass": [
              {
                "s": "me",
                "x": "“我出六分钱，赌比佛输。”博伊嘲笑我发疯了。但在全场歇斯底里的欢呼声中，只有我知道比佛内心藏着怎样的懦夫。",
                "en": "'Six cents Big Foot lose,' I told Boyee. Boyee laughed at my insanity. But amid the cheering mob, I alone knew what trembling coward lived inside that giant."
              },
              {
                "v": "street",
                "lvl": 1,
                "x": "少年用知晓秘密的沉着，押上了自己全部的家当。",
                "en": "Armed with the secret, the boy wagered his fortune on cold reality."
              }
            ],
            "fail": [
              {
                "damage": { "amount": 1, "reason": "全场球迷的哄笑与输光全部零钱的窘迫" },
                "s": "boyee",
                "x": "博伊冷笑：“六分钱？你输定了，等着明天乖乖交钱吧！”",
                "en": "Boyee sneered: 'Six cents? You giving away free money, man!'"
              }
            ]
          },
          {
            "label": "[赛场冷眼] 观察观众席上那个嚼着花生的金发白人女人",
            "labelEn": "[The Peanut Eater] Observe the straw-haired white woman chewing peanuts in the crowd",
            "then": [
              {
                "s": "narr",
                "x": "人群中唯一坐着一个金发美国女人，自始至终狠狠嚼着花生。台上每落下一记重拳，她就狠抿一下嘴唇，仿佛那一拳是她打在比佛脸上的，接着继续无情地嚼花生。",
                "en": "The only woman present was a straw-haired American, ruthlessly chewing peanuts. Every time a blow landed, she curled her lip as if she had delivered the punch herself, and chewed with cold malice."
              }
            ]
          }
        ]
      },
      {
        "g": "night",
        "music": "tense",
        "s": "narr",
        "x": "比赛惨不忍睹。英国老手身形敏捷，一记又一记凶狠的左刺拳狠狠砸在比佛脸上，打得鲜血飞溅！哈特急得嗓子都哑了，声嘶力竭地狂吼：“比佛！使劲打呀！想一想你爸！想一想你爸打你的滋味！”可比佛的招架越来越无力，最终以点数惨败。",
        "en": "The fight was brutal. The agile Englishman peppered Big Foot's nose with sharp straight lefts, spraying blood. Hat screamed until hoarse: 'Big Foot! Hit him, man! Think about your dad! Think how he used to lash you!' But Big Foot was hopelessly battered, losing heavily on points."
      },
      {
        "s": "hat",
        "x": "哈特在五分钟内输掉了整整一百块钱！他面如死灰地瘫在凳子上：“完了，我得把乔治那头黑白花奶牛卖了还债。”我转身向博伊要那六分钱，博伊推托说明天给。“明天给？你把我当百万富翁了？现在就给，听见没有！”博伊只得乖乖掏出六分钱。",
        "en": "Hat lost nearly a hundred dollars in five minutes! He groaned: 'Now I have to sell that black-and-white cow I bought from George.' I turned on Boyee for my six cents; Boyee stalled: 'Tomorrow.' 'Tomorrow? You think I'm a millionaire? Give me the money now!' Boyee reluctantly parted with six cents."
      },
      {
        "s": "bigfoot",
        "x": "突然，看台上爆发出震耳欲聋的哄笑。我朝拳台看去——只见比佛蹲在围绳角落里，两只拳套捂着脸，像个挨了打的孩子一样，嚎啕大哭！声音越来越大，无比凄惨。哈特也跟着笑翻了天：“嘿！快瞧这大个子，他居然哭了！”全场笑成一片。只有我没有笑，我摸着口袋里赢来的六分钱，心里涌上一股深沉的羞愧。",
        "en": "Suddenly the hall erupted into massive mockery. I looked at the ring: Big Foot sat crumpled in the corner ropes, gloves covering his face, weeping like a beaten child! He made loud, heartbreak noises. Hat laughed aloud: 'Look at the giant! He crying!' Everyone laughed. Only I did not laugh. Fingering the six cents in my pocket, I felt deeply ashamed."
      },
      {
        "v": "street",
        "lvl": 2,
        "s": "narr",
        "x": "第二天报纸头条写道：《拳击手泪洒擂台》。米格尔街再也见不到比佛的身影，听说他搬去拉文蒂尔采石场凿石头去了。半年后丑闻爆出：那个白人拳手根本就没参加过皇家空军，是个彻头彻尾的骗子。哈特在人行道上抽着烟：“在我们这地方，这又有什么好大惊小怪的呢？”",
        "en": "Next day's headline ran: 'BOXER WEEPS IN RING.' Big Foot left Miguel Street, drifting off to break stone at Laventille quarry. Six months later a scandal broke: the RAF champion was a complete fraud who had never been in the air force. Hat blew smoke from the curb: 'In a place like this, what is there to get excited about?'"
      }
    ]
  },
  {
    "id": "morgan",
    "no": "VIII",
    "title": "花炮师",
    "sub": "THE PYROTECHNICIST",
    "hot": {
      "x": 57.5,
      "y": 10,
      "w": 11,
      "h": 48,
      "pin": [
        63,
        28
      ]
    },
    "tip": {
      "v": "nerve",
      "x": "院门边堆着各色火药纸筒。摩根毕生只想做两件事：放出最美的烟火，让所有人笑。",
      "en": "Gunpowder tubes lean by his door. Morgan wanted only two things: to make the grandest fireworks, and to make men laugh."
    },
    "tipAfter": {
      "v": "memory",
      "x": "那一夜的大火照亮了半个西班牙港。烧焦的地基上，荒草丛生。",
      "en": "The fire lit up half of Port of Spain. On the charred foundation, wild weeds grow."
    },
    "item": {
      "name": "一截烧焦的自制礼花纸筒",
      "nameEn": "A Charred Firework Casing",
      "desc": "散发着刺鼻的硫磺味。它见证了米格尔街有史以来最狂暴的辉煌。",
      "descEn": "Smelling of sulphur, a relic of the most magnificent night on Miguel Street."
    },
    "note": "他终于让全街的人都捧腹大笑，也放出了最壮丽的烟火。但没有一件是以他希望的方式实现的。",
    "noteEn": "He made everyone laugh, and made the greatest fireworks. Neither in the way he wished.",
    "steps": [
      {
        "bg": "morgan",
        "g": "day",
        "music": "calypso",
        "s": "narr",
        "x": "外人开车经过米格尔街肯定只会说：“贫民窟！”因为他看不见别的。但是在我们这些生活在这儿的人眼里，它是一个大千世界，每个人都独一无二：曼曼是个疯子，乔治是个笨蛋，比佛是个懦夫，哈特是个冒险家，波普是个哲学家，而摩根则是我们的小丑。",
        "en": "A stranger could drive through Miguel Street and just say 'Slum!' because he could see no more. But to us who lived there it was an entire world where everybody was different: Man-man was mad, George stupid, Big Foot a coward, Hat an adventurer, Popo a philosopher, and Morgan was our clown."
      },
      {
        "s": "narr",
        "x": "摩根是个干瘪瘦小的花炮师，长着鸟一样细长灵活的脖子，两只手腕是整条街最细最小的。他毕生追求两件事：让所有人发笑，以及制造出最壮丽的花炮。可他极不擅长幽默。他发明的把戏，比如把一根火柴塞进嘴里再用香烟点燃，一旦做了一次，就会没完没了地一遍遍重复，逗得大家直发腻。",
        "en": "Morgan was a wiry little pyrotechnicist with a bird-like neck and the smallest wrists on Miguel Street. He wanted two things: to make people laugh, and to make magnificent fireworks. But he lacked real wit. Once he invented a joke—like putting a match in his mouth and lighting it from a cigarette—he repeated it relentlessly until everyone groaned in boredom."
      },
      {
        "s": "narr",
        "x": "摩根是我这辈子碰到的第一个艺术家。他整天在棚屋里捣鼓火药试验，嘴里满是“太空舞”、“生命之舞”之类的高深词汇。可特立尼达没人买他的花炮。每逢重大节日，大草原上升起对手的礼花引来全城欢呼时，摩根便怒气冲冲跑回家，痛揍自己的孩子。他有十个孩子。他妻子身高六英尺出头，块头像个举重的西班牙悍妇，摩根根本不敢碰她。",
        "en": "Morgan was the first artist I ever met. He tinkered in his shed, lecturing on 'The Cosmic Dance' and 'Dance of Life'. But nobody bought his fireworks. On festival nights, when rival rockets burst over the Savannah to cheers, Morgan rushed home in fury to whip his children. He had ten children. His wife was over six feet tall and built like a Spanish weightlifter, so he couldn't touch her."
      },
      {
        "s": "mrs_bhakcu",
        "x": "每到晚上十一点，摩根就产生幻觉，以为隔壁开修车铺的巴库要来打他。他照着马口铁栅栏又踢又打：“巴库！你这个大肚子饭桶，有种出来打一架！”巴库只是趴在床上用低沉悦耳的声音念着《罗摩衍那》。巴库太太（身高四英尺、宽三英尺、厚三英尺）冲出后院与六英尺高的摩根太太隔墙对骂！",
        "en": "Around eleven at night, Morgan was seized by delirium that Uncle Bhakcu was coming to beat him. He battered the galvanized iron fence: 'Bhakcu, you big-bellied swine, come out and fight!' Bhakcu merely lay in drawers chanting the Ramayana in melodious peace. Mrs. Bhakcu (four feet tall, three feet wide, three feet thick) traded blistering insults with six-foot Mrs. Morgan over the corrugated iron fence!"
      },
      {
        "s": "morgan",
        "x": "摩根这时就会跑到人行道上，装模作样地哈哈大笑，喝几口朗姆酒唱起卡里普索小调：“他们越是对我使坏，我在特立尼达就越是活得自在！明年这个时候，英国国王和美国国王都要付我几百万买我的花炮，谁都没见过的最漂亮的花炮！”",
        "en": "Morgan would dash onto the sidewalk, laughing artificial cackles, swigging rum and singing the calypso: 'The more they try to do me bad, / The better I live in Trinidad! By this time next year, the King of England and King of America will pay me millions for my fireworks, prettiest firework anybody ever see!'"
      },
      {
        "fx": "fizzle",
        "tip": "试放引信 · 烟花哑火，只冒出一缕青烟"
      },
      {
        "choice": [
          {
            "label": "[家法审判] 去摩根家客厅见识那场向街坊公开的“模拟法庭”",
            "labelEn": "[Domestic Tribunal] Attend the bizarre Sunday mock court Morgan holds in his parlour",
            "check": {
              "v": "imagine",
              "dc": 6
            },
            "pass": [
              {
                "s": "narr",
                "x": "摩根四儿子克里斯偷偷拿出一张《罪与罚》家规：在家打架五鞭，在街上打架七鞭，和街上小痞子讲话四鞭。周日客厅里摆满椅子，大儿子充当法警高喊“起立！”摩根像法官一样微笑入席，对孩子们逐一宣判：“安德鲁·摩根，你被控用石头打多萝西家的罗望果树、偷扯别人纽扣买弹珠，认罪吗？依法办事，罚十二鞭！”",
                "en": "Chris sneakily showed the penal code: Fighting at home: 5 lashes; fighting in street: 7 lashes; talking to street rascals: 4 lashes. On Sunday chairs were lined in the parlour. The eldest son barked 'Stand up!' and Morgan entered smiling like a judge, sentencing each child: 'Andrew Morgan, charged with stoning Miss Dorothy's tamarind tree and stealing buttons for marbles. Plead guilty? Twelve lashes!'"
              },
              {
                "v": "imagine",
                "lvl": 1,
                "x": "摩根把虐待自己的骨肉包装成幽默戏剧，试图用残酷换取邻里的欢笑。",
                "en": "Morgan packaged child-beating as comic theater, attempting to buy neighborly laughter with cruelty."
              }
            ],
            "fail": [
              {
                "s": "narr",
                "x": "摩根挥舞着牛皮带宣称要将判决在下午严格执行，屋里的气氛诡异得令人毛骨悚然。",
                "en": "Morgan cracked his leather belt, announcing executions for the afternoon, casting a sinister chill over the room."
              }
            ]
          },
          {
            "label": "[街头冷遇] 观察男人们在人行道上对摩根法庭笑话的残酷沉默",
            "labelEn": "[The Cold Curb] Watch the men on the curb refuse to laugh at his domestic farce",
            "check": {
              "v": "street",
              "dc": 6
            },
            "pass": [
              {
                "s": "hat",
                "x": "这个玩笑彻底适得其反。当晚摩根满脸堆笑走在街上，却没有一个人笑，没有一个人同他讲一句话。哈特在路沿上抽着烟：“哪有拿自己骨肉开这种玩笑的？这家伙不是疯了，就是心底被一个小恶魔用叉子戳着。”",
                "en": "The joke flopped completely. That evening Morgan strode smiling onto the pavement, but nobody laughed, nobody said a single word to him. Hat smoked on the curb: 'Nobody makes a joke out of whipping his own flesh and blood for the street. The man has an evil imp poking him inside.'"
              },
              {
                "v": "street",
                "lvl": 1,
                "x": "沉默是对一个小丑最残酷的凌迟。",
                "en": "Total silence was the most merciless execution a clown could suffer."
              }
            ],
            "fail": [
              {
                "s": "hat",
                "x": "哈特吐了一口唾沫：“这蠢货迟早要引火烧身。”",
                "en": "Hat spat into the gravel: 'The fool will burn his own fingers sooner or later.'"
              }
            ]
          }
        ]
      },
      {
        "s": "narr",
        "x": "没人发笑彻底击垮了摩根。那天夜里他喝得烂醉，像头疯牛一样撞击栅栏嚎叫：“你们以为我不是条汉子？我爸生了八个，我生了十个！”不久，摩根太太带着十个孩子回了乡下娘家。后院的小屋沉寂了，只偶尔冒出一两股彩色烟雾。",
        "en": "The lack of laughter broke him. That night he got roaring drunk, battering the fence like a maddened bull: 'You don't think I'm a man? My father had eight, I have ten!' Soon Mrs. Morgan took all ten children to the country. The shed fell quiet, with only odd puffs of colored smoke rising into the dusk."
      },
      {
        "g": "night",
        "music": "sad",
        "s": "narr",
        "x": "随后那个周日夜晚下起了滂沱暴雨，街上寂静无声。十一点，一声短促凄厉的女人尖叫打破了深夜！我睡觉从来不穿睡衣（我不属于那个阶层），光着脚第一个冲上了雨水倒映的马路。在摩根家漆黑的后院里，只见一个叫特雷莎·布莱克的女人慌慌张张从屋里溜出，逃向下水道！",
        "en": "The next Sunday brought a torrential downpour, silencing the street. At eleven, a sharp female screech ripped through the dark! I never slept in pyjamas (I was not of that class) and dashed barefoot into the rain-slicked road. In Morgan's pitch-black yard, I glimpsed the shadow of Teresa Black fleeing from the house toward the open drain!"
      },
      {
        "s": "mrs_morgan",
        "x": "摩根太太突然不知从哪儿冒了出来，房间里的灯亮了，又灭了！摩根太太雷鸣般的怒吼响彻夜空：“特雷莎·布莱克！你和我男人在干什么？……你干吗怕开灯？把灯打开！让大家都来看看你这个大英雄！让整条街都来看看男人是个什么东西！”",
        "en": "Mrs. Morgan materialized out of the dark. Inside, the lights snapped on, then off! Her booming roar shook the rafters: 'Teresa Black! What you doing with my man?... Why you afraid to turn on the light? Put on the light! Let the whole street see what a big hero you are! Let everybody see what kind of creature a man is!'"
      },
      {
        "s": "mrs_morgan",
        "x": "灯灭了，然后又亮了！传出摩根苦苦哀求的声音。摩根太太厉声大骂：“你不是总爱逗人笑吗？你不是个小丑吗？你要是敢再关灯，我就像掰火柴棍一样掰断你那根细小的尾巴！”紧接着，前门被猛地推开——",
        "en": "The light flashed off, then on again! Morgan's whimpering pleas drifted out. Mrs. Morgan bellowed: 'Ain't you always want to make people laugh? Ain't you a clown? If you turn off that light again, I break your little tail like a matchstick, hear?' Then the front door flew open—"
      },
      {
        "s": "narr",
        "x": "我们看见了一切：摩根太太拦腰抱着摩根。他几乎一丝不挂，瘦骨嶙峋得像个长着老头面孔的猴子，拼命挣扎却动弹不得。摩根太太仰天发出刺耳的狂笑：“这就是我的大男人？这就是我伺候了一辈子的男人？好了，你们笑吧！他不就是希望大家笑话他吗！”",
        "en": "We saw everything: Mrs. Morgan held Morgan around the waist. He was practically naked, scrawny as a monkey with an old man's face, writhing helpless in her grip. Mrs. Morgan gave a harsh, raspy laugh: 'This is my big hero? The man I cooked and slaved for all my life? Go on, laugh! He don't mind. He always want people to laugh at him!'"
      },
      {
        "s": "narr",
        "x": "一个瘦小的干瘪男人被高大壮硕的妻子如此悬空提在半空，场面实在太滑稽了。街坊们先是暗笑，紧接着爆发出一阵震耳欲聋的狂笑！摩根来到米格尔街后，大家这还是第一次真正被他逗笑了——然而这彻底粉碎了他最后的一丝尊严。",
        "en": "A skinny little man hoisted into midair by a towering woman was too comic to resist. The crowd began with chuckles, then erupted into deafening, helpless roars of laughter! For the first time since coming to Miguel Street, Morgan had genuinely made people laugh—and it completely crushed his soul."
      },
      {
        "g": "night",
        "music": "tense",
        "s": "narr",
        "x": "第二天大家在路沿上等着笑他，摩根整天没有露面。深夜，凄厉的消防警报声将我惊醒。我推开窗，外面天光血红，浓烟滚滚——摩根家失火了！",
        "en": "The next day men waited on the curb to laugh, but Morgan never stepped out. That night, piercing fire sirens jolted me awake. I threw open the window: the sky was blood-red, crimson smoke billowing high. Morgan's house was on fire!"
      },
      {
        "fx": "blaze",
        "tip": "点燃划破西班牙港夜空的绝美花炮 / The Most Magnificent Fire in Port of Spain"
      },
      {
        "s": "narr",
        "x": "好一场大火！这是西班牙港自一九三三年国库被焚毁以来最壮丽的一场火灾！摩根后院积攒的所有火药、火箭、罗马烛光和旋转花炮在大火中全部轰然燃响！红的、绿的、金色的万千流光撕裂了半个西班牙港的夜空！报社记者爬上隔壁屋顶抓拍，第二天晨报的头版照片右上角甚至拍到了我的身影！",
        "en": "What a fire! The most glorious blaze in Port of Spain since the Treasury burned down in 1933! Every rocket, roman candle, Catherine wheel, and powder keg Morgan had stockpiled exploded into the sky in a blinding crescendo of emerald, crimson, and gold! Newspaper photographers climbed neighbouring roofs, and next morning's front page carried a picture with me in the top right corner!"
      },
      {
        "s": "hat",
        "x": "摩根因涉嫌纵火骗保被起诉至法庭，记者们拿“花炮师被控为纵火狂”大开玩笑，但他最终被判无罪释放。摩根从此消失了，有人说他去了委内瑞拉，有人说他在哥伦比亚当了赛马骑师。哈特坐在灰烬前叹道：“男人想要什么，拼命争取，可一旦得到了，也就不喜欢了。摩根的两大志向都实现了：人们终于笑话了他，他也造出了绝世花炮——只是没有一样是他原本希望的方式。”",
        "en": "Morgan was tried for arson and fraud; reporters joked about 'The Pyrotechnicist accused of Pyromania', but he was acquitted. He vanished forever; some said Venezuela, some said Colombia as a jockey. Hat sighed over the charred ruins: 'A man wants something, he fights for it. When he gets it, he don't like it. Morgan's two ambitions came true: people laughed at him, and he made the prettiest fireworks—neither in the way he wished.'"
      },
      {
        "v": "memory",
        "lvl": 3,
        "s": "narr",
        "x": "焦黑的地基上，热带野草疯狂地蔓延滋长。小丑放出了照亮全岛的绝唱，然后把沉默留给了世间。",
        "en": "Over the blackened foundation, wild tropical bush spread rapidly. The clown had ignited his blazing swan song, leaving only silence behind."
      }
    ]
  },
  {
    "id": "titushoyt",
    "no": "IX",
    "title": "泰特斯·霍伊特，中级文学学士",
    "sub": "TITUS HOYT, I.A.",
    "hot": {
      "x": 38,
      "y": 15,
      "w": 10,
      "h": 42,
      "pin": [
        43,
        28
      ]
    },
    "tip": {
      "v": "street",
      "x": "手持教鞭的街头学者。泰特斯·霍伊特坚信，拉丁文和绅士品格能拯救这片荒芜的海岛。",
      "en": "The street scholar with a cane. Titus Hoyt believed Latin declensions and gentlemanly conduct would redeem the colony."
    },
    "tipAfter": {
      "v": "memory",
      "x": "乔治堡的远征早已散场。但他用粉笔写在路边的拉丁格言，依然在热带的风中久久回响。",
      "en": "The march to Fort George is long over. But his chalked Latin maxims linger in the tropical wind."
    },
    "item": {
      "name": "一枚印着“I.A.”的自制名片",
      "nameEn": "A Visiting Card Inscribed 'I.A.'",
      "desc": "“泰特斯·霍伊特，伦敦大学中级文学学士”。在这个连面包都要靠抢的街区，他孤独守护着文明的火种。",
      "descEn": "'TITUS HOYT, I.A. (LONDON)'. In a slum scraping for bread, he guarded the flame of learning with Quixotic nobility."
    },
    "note": "他是整条街上唯一的堂吉诃德。尽管名头不过是函授肄业，但他用可笑的虚荣心，给贫民窟的孩子撑起了一片星空。",
    "noteEn": "The Don Quixote of the curb. Though his degree was merely correspondence work, his vanity gave slum children a glimpse of the stars.",
    "steps": [
      {
        "bg": "titushoyt",
        "g": "day",
        "music": "calypso",
        "s": "narr",
        "x": "这个男人生来就注定是国内地方街道委员会活跃而重要的成员。是残酷的命运将他安排到了这个城市。他是天生的导游，哲学家，可以和任何驻足聆听他的人做朋友。战前一两年，我来到西班牙港后，遇到的第一个男人就是泰特斯·霍伊特。",
        "en": "This man was born to be an active and important member of a local road board in the country. An unkind fate had placed him in the city. He was a natural guide, philosopher and friend to anyone who stopped to listen. Titus Hoyt was the first man I met when I came to Port of Spain, a year or two before the war."
      },
      {
        "s": "narr",
        "x": "父亲去世后，母亲把我从查瓜纳斯接过来。那是我平生第一次坐城里的公共汽车，我兴奋地对母亲喊：“妈，你看，他们忘了按铃了！”母亲咬牙切齿：“该死的你要是敢按铃，就给我下车走回家去！”过了一会儿我又大喊：“妈，看，大海！”全车人哄堂大笑，母亲羞怒得几乎要杀了我。",
        "en": "After my father died, Mother fetched me from Chaguanas. It was the first time I had travelled in a city bus. I said, 'Ma, look, they forget to ring the bell here.' Mother whispered savagely, 'If you ring the bell you damn well going to get off and walk home by yourself, you hear.' A little later I yelled, 'Ma, look, the sea!' The whole bus roared with laughter. Mother was furious."
      },
      {
        "s": "narr",
        "x": "第二天一早，母亲给我四分钱，叫我去街角买两块一分钱的面包和一分钱的红咸黄油。然而在六条交错的陌生街道间，我彻底迷了路。我在人行道上坐下来放声大哭，新鞋子在脏水沟里浸得透湿。几个女孩子围过来看我哭，一个穿粉红外衣的姑娘安慰我。就在这时，泰特斯·霍伊特先生大步走了过来。",
        "en": "Next morning Mother gave me four cents to buy two hops bread and a penny salty red butter. But among six crisscrossing alleys, I got hopelessly lost. I sat on the curb weeping loudly, soaking my shoes in the gutter water. Girls gathered to watch; a girl in a pink coat comforted me. Just then, Mr. Titus Hoyt strode up."
      },
      {
        "s": "narr",
        "x": "他穿着滑稽的白色短裤和白衬衫，声音粗哑而有力：“他为什么哭？”姑娘解释后，霍伊特先生说：“我带他回家吧。”姑娘顺从地说：“好吧，泰特斯·霍伊特先生。”那是关于他的第一件趣事：整条街没有任何人叫他“泰特斯”或“霍伊特先生”，每个人都尊称他为完整的“泰特斯·霍伊特先生”。",
        "en": "He wore comical white shorts and a white shirt. 'Why he crying?' he asked in a gravelly voice. The girl explained. 'I go take him home,' he said. The girl replied, 'All right, Mr. Titus Hoyt.' That was the first curious thing: nobody ever called him 'Titus' or 'Mr. Hoyt'. Everyone addressed him with full dignity as 'Mr. Titus Hoyt'."
      },
      {
        "s": "titushoyt",
        "x": "到了我家，他上下打量着我：“他看起来像个挺聪明的孩子。”母亲没好气地冷笑：“像他死去的父亲。”霍伊特先生立刻考我：“喂，年轻人，如果买一条半鲱鱼要花一分半，那买三条鲱鱼需要多少钱？”我脱口而出：“三分。”",
        "en": "At my gate, he looked at me: 'He look like a bright boy.' Mother sneered sarcastically, 'Like his father.' Titus Hoyt instantly quizzed me: 'Look, young man, if a herring and a half cost a cent and a half, how much for three herrings?' I shot back at once: 'Three cents.'"
      },
      {
        "s": "titushoyt",
        "x": "泰特斯·霍伊特吃惊地瞪大了眼，脱帽向母亲致敬：“这孩子冰雪聪明，太太！您一定要给他喝牛奶，牛奶对大脑大有好处！好让他好好学习。保重！”母亲狠狠揍了我一顿——不是因为我迷路，而是因为我弄湿了新鞋。那天下午，我绕着院子一边跑一边学他的腔调喊：“保重！保重！”",
        "en": "Titus Hoyt stared in amazement and tipped his hat: 'This boy bright, ma'am! You must give him milk—milk is good for the brain! Take care!' Mother whipped me soundly—not for getting lost, but for wetting my shoes in the ditch. That afternoon I ran around the yard mimicking his booming tone: 'Take care! Take care!'"
      },
      {
        "g": "dusk",
        "s": "narr",
        "x": "那天夜里，霍伊特先生又来了，拿着我母亲抽屉里的钢笔和抄写本，要我替他代笔给《特立尼达卫报》写信。他一字一句念道：“……这是我第一次在这个大都市里徜徉——拼作 p-e-r-e-g-r-i-n-a-t-i-o-n……在这种绝望的情形之下，我被一位米格尔街的泰特斯·霍伊特先生所救……这证明人类的善良尚未泯灭（e-x-t-i-n-c-t）。”",
        "en": "That night Titus Hoyt returned, demanding pen and copybook to write to the Trinidad Guardian. He dictated: '... it was my first peregrination—spell it p-e-r-e-g-r-i-n-a-t-i-o-n—in this metropolis... In this desperate circumstance I was rescued by a Mr. Titus Hoyt of Miguel Street... kindness is a human quality which is not yet extinct.'"
      },
      {
        "choice": [
          {
            "label": "[街头智慧] 顺从他的大学问，一笔一画拼出信中最冗长晦涩的词汇",
            "labelEn": "[Street Smarts] Neatly transcribe his extravagant, high-sounding vocabulary",
            "check": {
              "v": "street",
              "dc": 6
            },
            "pass": [
              {
                "s": "me",
                "x": "“泰特斯·霍伊特先生，您确信这些长词没有拼错吗？”霍伊特先生得意地抚掌大笑：“我花了一整下午构思这封信！孩子，这就是教育的力量，要让全特立尼达的编辑都大吃一惊！”",
                "en": "'Mr. Titus Hoyt, you sure all these big words spelt right?' Titus Hoyt laughed proudly: 'I spend a whole afternoon making up that letter! Boy, that is education—we go make the Guardian editor jump!'"
              },
              {
                "v": "imagine",
                "lvl": 2,
                "x": "虽然《卫报》最终并未发表这封信，但在煤油灯昏黄的光芒下，那些荒谬的大词仿佛赋予了贫民窟某种神秘的庄严。",
                "en": "Though the Guardian never published it, under the kerosene lamp those grandiose words gave our muddy alley a strange, comic majesty."
              }
            ],
            "fail": [
              {
                "s": "titushoyt",
                "x": "霍伊特先生卡住了，掏出厚手帕擦汗：“呃……大词是思想的重武器，孩子！记下，拼错了不要紧，声势最重要！”",
                "en": "Titus Hoyt paused, wiping sweat with a handkerchief: 'Er... big words are intellectual ammunition, boy! Never mind spelling, sound is what counts!'"
              }
            ]
          },
          {
            "label": "[纯真质疑] 询问他为什么必须给《卫报》写信，普通人不能直接跟邻居说话吗？",
            "labelEn": "[Innocent Skepticism] Ask why he must write to the papers instead of speaking like normal men",
            "then": [
              {
                "s": "titushoyt",
                "x": "霍伊特正色道：“报纸是大英帝国的议会！我们要让总督和编辑们关注我说的每一个字！等着瞧吧，总有一天，我要让他们刮目相看！”",
                "en": "Titus Hoyt grew grave: 'The press is the parliament of the Empire! I go make them listen to every word I say. One day, boy, they go see!'"
              }
            ]
          }
        ]
      },
      {
        "g": "day",
        "s": "narr",
        "x": "后来博伊教我骑自行车，我摔断了小腿胫骨。母亲用蘸了朗姆酒的烟熏蜘蛛网给我敷伤口，霍伊特先生撞见后惊骇大叫：“您知道自己在干什么吗！这是谋杀！”母亲怒吼：“管好你自己的事！等你有了自己的孩子再来教训我！”霍伊特先生第二天便报名了红十字会急救班，此后一个月，全街每天早上九点都能准时听到我被他换药时的惨叫。",
        "en": "Later Boyee taught me cycling and I smashed my shin. Mother treated the wound with cobwebs soaked in rum. Titus Hoyt was horrified: 'Do you know what you are doing! Take the boy to a doctor!' Mother snapped: 'Mind your own business till you have children!' Hoyt joined a Red Cross course, and for a month the street heard my punctual 9am screams as he bandaged my leg."
      },
      {
        "s": "narr",
        "x": "接着，泰特斯·霍伊特开始了伟大的教育事业。他报考了伦敦大学函授中级文学学位，自学拉丁语，并立刻召集我们在他养着鸡、臭气熏天的后阳台上授课。然而到第四种变格时，课堂彻底失控了。博伊质疑道：“泰特斯·霍伊特先生，我看这全是有人坐着瞎编出来折磨人的。”",
        "en": "Next, Titus Hoyt embarked on grand pedagogical ambitions. Preparing for the London University Inter-Arts correspondence exam, he taught us Latin on his chicken-stinking back verandah. By the fourth declension, the class fell apart. Boyee challenged him: 'Mr. Titus Hoyt, I think you making up all this as you go along to torment people.'"
      },
      {
        "s": "titushoyt",
        "x": "霍伊特先生涨红了脸转向我：“那你说，bellum 这个词的宾格单数是什么？”我感到很内疚，因为我也要背叛他了：“泰特斯·霍伊特先生，在您像我这么大的时候，如果有人问您这个问题，您心里会好受吗？”博伊又追问：“夺格到底是什么意思？”拉丁语课就这样在哄笑中彻底夭折了。",
        "en": "Flushed, Titus Hoyt turned to me: 'What is the accusative singular of bellum?' I felt wicked for betraying him: 'Mr. Titus Hoyt, when you was as small as me, how you would have feel if somebody ask you that?' Boyee added: 'What the ablative mean?' The Latin class collapsed in laughter."
      },
      {
        "v": "street",
        "lvl": 2,
        "s": "narr",
        "x": "但男人们从不嘲笑霍伊特先生是个有学问的人。哈特常说：“那个男人是个思想家。”一天霍伊特冲到街沿喊道：“安静！我一直在思考这场战争该怎么结束！如果欧洲沉陷五分钟，所有德国人不就淹死了吗？”埃多斯冷冷接了一句：“可英国人也会被淹死。”霍伊特悲伤地愣住了：“……我昏头了，伙计，我昏头了。”",
        "en": "Yet the men never doubted his intellect. Hat said, 'That man is a thinker.' One day Hoyt rushed up: 'Silence! I been thinking how this war could end. If Europe could sink for five minutes all the Germans go drown!' Eddoes retorted coldly, 'But England go drown too.' Hoyt paused in tragic sorrow: 'I lose my head, man. I lose my head.'"
      },
      {
        "s": "narr",
        "x": "特立尼达板球队输球时，他又跑来灌输唯心论哲学：“弟兄们，你们难道从没想过，整个世界根本是不存在的？全宇宙只有我们的头脑是真的，其他一切不过是我们的幻觉！”接着，他成立了“米格尔街文学和社会青年俱乐部”，墙上贴着严格的作息表：五点半起床读希腊哲学，洗澡锻炼十五分钟，读晨报五分钟，十分钟早餐……",
        "en": "When Trinidad was losing at cricket, he proposed solipsism: 'Boys, it ever strike you that the world not real at all? We have the only mind in the world and everything else is just thought up!' He organized the Miguel Street Literary and Youth Club, pasting a rigid timetable: 5:30 Greek philosophy, 15m exercise, 5m paper, 10m breakfast... 'In four years I go be a man of culture!'"
      },
      {
        "choice": [
          {
            "label": "[远征乔治堡] 顶着加勒比酷暑，跟随霍伊特老师攀登乔治堡古炮台",
            "labelEn": "[March to Fort George] Ascend Fort George hill under blistering sun under Hoyt's lead",
            "check": {
              "v": "nerve",
              "dc": 6
            },
            "pass": [
              {
                "s": "narr",
                "x": "为了拯救濒临解散的俱乐部，霍伊特带我们远足乔治堡。在电车上他耍滑头只付半票：“伙计，票我们不要了！”我们顶着烈日爬上红土山顶，抚摸1803年抗击法国侵略遗留的生锈加农炮和炮弹堆。俯瞰帕里亚湾浩瀚蔚蓝的波涛，他庄严宣告：“今天的男女孩童，就是明天的世界栋梁！”",
                "en": "To salvage the club, Hoyt led us up Fort George. On the trolley bus he paid half-fare: 'We don't want tickets, man!' We trudged up baking red dirt, touching rusted British cannons from 1803. Gazing at the azure Gulf of Paria, he declared: 'The boys and girls of today are the men and women of tomorrow!'"
              },
              {
                "v": "memory",
                "lvl": 2,
                "x": "在这贫瘠荒芜的殖民地，那一刻他的大话竟激荡着某种令人眼眶发酸的英雄主义。",
                "en": "In this stagnant colony, his preposterous rhetoric momentarily carried a heartbreaking heroism."
              }
            ],
            "fail": [
              {
                "s": "narr",
                "x": "博伊热得把皮鞋全脱了，双脚磨出血泡。大家汗流浃背，咒骂连连，霍伊特老师满头大汗地挥舞手帕鼓劲：“坚持！思想健康才能身体健康！”",
                "en": "Boyee took off his shoes, feet blistered. Drenched in sweat, boys cursed the slope while Hoyt flapped his handkerchief: 'Persevere! Healthy mind in healthy body!'"
              }
            ]
          },
          {
            "label": "[寻找清泉] 追问他承诺过的“如水晶般清凉甘甜的洗澡山溪”在哪里",
            "labelEn": "[The Promised Stream] Inquire about the crystal-clear cool stream promised for a bath",
            "then": [
              {
                "s": "narr",
                "x": "山顶上根本没有溪流，只有一座荒凉的英国老兵墓地！博伊愤怒地大喊：“他是个天生的骗子！”霍伊特尴尬地擦汗：“我小时候明明在这儿洗过澡……看来是干涸了。”为了谢罪，他下山请我们所有人喝了冰镇汽水，并在我中暑晕眩时温柔地喂我喝水。",
                "en": "There was no stream, only barren soldiers' graves! Boyee raged: 'He is a born liar!' Hoyt stammered: 'I bathe here as a boy... it must have dried up.' In penance, he treated us to cold sodas at the foot of the hill, tenderly nursing me when I grew faint from heat."
              }
            ]
          }
        ]
      },
      {
        "g": "night",
        "music": "sad",
        "s": "narr",
        "x": "多年后，米格尔街每个少年都在他的辅导下备战剑桥证书。某个星期天的《特立尼达卫报》上，赫然登出了一封读者来信：“亲爱的霍伊特先生：我只有八岁，是守望者联盟的成员。我从您的教导中明白了仁慈的美德。我只有六分钱，但像《圣经》里的寡妇奉献小钱一样，我将它托付给您捐给贫困救济基金……您的一名匿名学生。”",
        "en": "Years later, every boy was coached by him for the Cambridge Certificate. One Sunday, the Trinidad Guardian featured a letter: 'Dear Mr. Hoyt: I am only eight... You have always extolled charity. I offer a mere six cents—the widow's mite—for the Neediest Cases Fund... One of Your Pupils.' Below it was a large photo of Titus Hoyt, smiling pop-eyed in the flashbulb."
      },
      {
        "v": "memory",
        "lvl": 3,
        "x": "整条街上的人都知道那封信是他自己编造并寄给报社的。但没有一个人去当面拆穿他。在苦难深重的米格尔街，泰特斯·霍伊特用那张印着“伦敦大学中级文学学士”的名片和滑稽的虚荣，为卑微的人们撑起了一小片有尊严的天空。",
        "en": "Everyone on Miguel Street knew Titus Hoyt had written the letter himself. But not a single soul laughed in his face. In our bruised alley, Titus Hoyt, with his calling card 'TITUS HOYT, I.A.' and foolish vanity, held up a small, fragile patch of human dignity."
      }
    ]
  },
  {
    "id": "laura",
    "no": "X",
    "title": "母性的本能",
    "sub": "THE MATERNAL INSTINCT",
    "hot": {
      "x": 67.5,
      "y": 32,
      "w": 10,
      "h": 40,
      "pin": [
        72.5,
        46
      ]
    },
    "tip": {
      "v": "empathy",
      "x": "院落里晾晒着五颜六色的童装。劳拉用最泼辣的笑声，对抗着命运对女人的诅咒。",
      "en": "Colorful children's clothes fluttering on lines. Laura fought the curse of womanhood with ferocious laughter."
    },
    "tipAfter": {
      "v": "memory",
      "x": "当大女儿洛娜怀上孩子沉入大海，劳拉的笑声永远熄灭了。哭泣成了加勒比母亲最后的语言。",
      "en": "When Lorna drowned in the bay, Laura's laughter died forever. Weeping became the final tongue of Caribbean mothers."
    },
    "item": {
      "name": "一根开裂发黑的实木擀面杖",
      "nameEn": "A Cracked Hardwood Rolling Pin",
      "desc": "劳拉曾挥舞着它，把吹牛吃软饭的恶霸内森尼尔一路打得只穿短裤跳过白栅栏抱头鼠窜。",
      "descEn": "Wielded by Laura to chase the bragging Nathaniel over the picket fence in his underpants."
    },
    "note": "米格尔街最坚韧、最快活的母亲。她扛住了八个孩子的饥饿与男人的背叛，却扛不住命运轮回的冰冷刀锋。",
    "noteEn": "The fiercest, most joyful mother on the street, who survived eight hungry mouths and faithless men, only to break before destiny.",
    "steps": [
      {
        "bg": "laura",
        "g": "day",
        "music": "calypso",
        "s": "narr",
        "x": "我猜劳拉保持了一项世界纪录。劳拉有八个孩子。这倒没什么好奇怪的。八个孩子属于七个不同的父亲——这才叫要命！正是劳拉给我上了生平第一堂生物课。她刚好住在我家隔壁，所以我能近距离观察这一奇迹。",
        "en": "I suppose Laura holds a world record. Laura had eight children. There is nothing surprising in that. These eight children had seven fathers. Beat that! It was Laura who gave me my first lesson in biology. She lived next door, so I observed her closely."
      },
      {
        "s": "narr",
        "x": "我注意到她的肚子几个月内便鼓胀起来，然后她会从街上消失几天。等再见到她时，肚子又完全平坦了。接着几个月内，发酵膨胀的过程会再次重演。她对发生的一切极其乐观，常常指着大肚子笑道：“这鬼事又来了！经历过三四回你就习惯了，虽然真是件该死的麻烦事。”",
        "en": "I noticed her belly rising for months, then she vanished for a brief spell. Next time I saw her she was quite flat. Within months the leavening process began again. She herself was gay about it, patting her stomach: 'This thing happening again, but you get used to it after three four times. Is a damn nuisance, though.'"
      },
      {
        "s": "narr",
        "x": "她常常抱怨上帝的不公，数落男人的丑恶。她的前六个孩子就出自六个不同的男人。哈特常抽着烟说：“有些人真难伺候。”但劳拉绝不是那种成天自怨自艾的女人。如果鲍嘉是米格尔街最百无聊赖的人，那么劳拉就是整条街上最快活的太阳。她永远在大笑，而且特别喜欢我。",
        "en": "She blamed God and spoke of the wickedness of men. Her first six children came from six different men. Hat said, 'Some people hard to please.' But Laura never pitied herself. If Bogart was the most bored man on Miguel Street, Laura was the gayest. She was always laughing, and she was very fond of me."
      },
      {
        "s": "narr",
        "x": "每当树上有芒果李子，或者做了甜甜的糖饼，她总会塞几个给我。我母亲极讨厌别人嘲笑我，却也忍不住说：“我不明白劳拉为什么这么喜欢你，好像她自己的娃娃还不够操心似的。”但像劳拉这样的女人，孩子再多她也嫌不够。她深爱她的每一个孩子——尽管她管教他们时的泼辣粗话足以让莎士比亚自愧弗如。",
        "en": "Whenever she had plums or made sugar-cakes, she slipped some to me. Mother remarked: 'I don't know why Laura so fond of you, as if she ain't have enough children to worry about.' But Laura loved all her children, though her abusive shouting would put Shakespeare to shame."
      },
      {
        "v": "street",
        "lvl": 1,
        "s": "narr",
        "x": "劳拉常隔着院子扯着嗓子大吼：“奥文！你这倒霉爹留下的黑眼圈畜生，给我滚过来！”或者：“加文！你要是再不回来，老娘一把火烧了你的屁股，听见没有！”还有：“洛娜！你这罗圈腿黑母猪，你为什么不睁大狗眼瞧瞧自己都干了些什么！”整条街每天都回荡着她狂暴而充满母爱的咆哮。",
        "en": "Laura would scream across the yard: 'Orvin, you father's black eye, come here!' Or: 'Gavin, if you don't come quick I bring fire on your tail, you hear!' Or: 'Lorna, you bow-foot black sow, why you don't look what you doing!' The whole street daily echoed with her fierce maternal roars."
      },
      {
        "s": "narr",
        "x": "没人知道劳拉靠什么养活这么一大家子。深夜常有男人骑着自行车慢悠悠来到她门前吹口哨，但我母亲狠狠扇了我一个耳光：“小兔崽子少打听！”哈特告诉我，她在菜市场有几个卖菜的朋友，常常免费送她木薯和碎肉；前三个孩子的父亲偶尔也给点糊口的小钱。劳拉那张脸长得像电车车头的电瓶盖，可她身上有一股原始的母性热力。",
        "en": "Nobody knew how Laura fed the brood. Men rode up on bicycles at night whistling, but Mother slapped me: 'Mind your own business!' Hat told me vegetable sellers at the market gave her free yams and meat scraps, and the first three fathers gave pennies. Laura's face was like the cap of an electric tram, yet she radiated an unstoppable life force."
      },
      {
        "g": "dusk",
        "s": "narr",
        "x": "接着，哈特宣布：“劳拉有新男人了，而且同居了。”那男人叫内森尼尔，来自西班牙港东区干河一带。他身材矮小，面相凶恶，到处吹嘘自己是皮卡迪利街的地痞，打架让几个人破了相。更让人厌恶的是他对女人的蔑视——他动辄把路过的体面女人唤作“大母牛”，嘴里整天哼着卡里普索小调：【不时地把她们打翻在地，不时地把她们揍得满脸乌青，她们才会爱你爱到断气】。",
        "en": "Then Hat announced: 'Laura have a new man, living with she.' His name was Nathaniel, from East Dry River. A short bully boasting of razor brawls in Piccadilly Street. He despised women, calling passersby 'cows' and humming calypso: 'Every now and then knock them down, Every now and then black their eye, They love you true, they love you till they die.'"
      },
      {
        "choice": [
          {
            "label": "[街头窥秘] 尾随内森尼尔到哈特家后院，揭穿恶霸的真面目",
            "labelEn": "[Street Perception] Tail Nathaniel to Hat's back steps to uncover the truth",
            "check": {
              "v": "street",
              "dc": 6
            },
            "pass": [
              {
                "s": "narr",
                "x": "每天黄昏，内森尼尔借口出来抽烟，其实是躲在哈特后院呜呜咽咽地哭泣！借着微光，只见他两腮全是抓痕。他抽抽搭搭向哈特告状：“那个母夜叉……她拿擀面杖和垃圾桶盖打我！天哪，女人怎么能这么凶暴？！”",
                "en": "Every twilight, Nathaniel snuck to Hat's back steps to weep! In the dim light his cheeks were lacerated with claw marks. He blubbered to Hat: 'That woman... she beat me with a rolling pin and dustbin lid! God, how could a woman be so cruel?!'"
              },
              {
                "s": "hat",
                "x": "哈特吐掉烟头，嘲弄地冷笑：“内森尼尔，女人打你十下没事，男人还一下就要出人命。要是你打不过劳拉，我劝你趁早夹着尾巴滚蛋。”",
                "en": "Hat spat his cigarette end, laughing coldly: 'Nathaniel, a woman could hit you ten times, but a man only have to hit once. If you can't beat Laura, run for your life, boy.'"
              }
            ],
            "fail": [
              {
                "s": "nathaniel",
                "x": "内森尼尔恶狠狠地瞪着你，试图摆出拳击手的硬汉架势，但肿胀发黑的右眼圈和颤抖的膝盖出卖了他。",
                "en": "Nathaniel glared at you, squaring up like a prizefighter, but his swollen black eye and shivering knees gave the game away."
              }
            ]
          },
          {
            "label": "[纯真旁观] 听哈特分析劳拉与内森尼尔的家庭宿命",
            "labelEn": "[Street Wisdom] Listen to Hat dissect Laura and Nathaniel's domestic battle",
            "then": [
              {
                "s": "hat",
                "x": "哈特摇了摇头：“劳拉只是想留住一个男人。但等她哪天彻底烦透了内森尼尔，那小子连内裤都保不住。”",
                "en": "Hat shook his head: 'Laura just trying not to beat him too bad to keep him around. But the day she get tired of him, Nathaniel better run.'"
              }
            ]
          }
        ]
      },
      {
        "s": "narr",
        "x": "决裂在某个星期六暴烈降临。内森尼尔不知吃了什么豹子胆，竟试图向劳拉动手。劳拉像一头被激怒的母狮般暴怒反击！她抄起一把沉重的铁扫帚和实木擀面杖，劈头盖脸朝他砸去。内森尼尔连裤子都没穿好，只套着大裤衩连滚带爬翻过白木栅栏，惨叫着一路逃向圣詹姆斯大街，再也没敢在米格尔街露面！",
        "en": "The final explosion came on a Saturday. Nathaniel dared raise a fist at Laura. Laura erupted like a tigress! Grabbing a heavy iron broom and a hardwood rolling pin, she rained blows upon him. Nathaniel scrambled over the picket fence in his drawers, screaming for mercy, fleeing down St. James never to be seen again!"
      },
      {
        "s": "narr",
        "x": "那天早上八点，劳拉在屋里生下了她的第八个孩子。仅仅两小时后，十点整，劳拉就已经靠在院子栅栏边朝我母亲兴高采烈地大喊：“是个大胖小子！模样长得像他那个混账老子，不过谢天谢地，性子一点也不随他！”埃多斯吹起口哨：“七个不同的男人生了八个娃，真正的世界纪录！”",
        "en": "At eight that very morning, Laura gave birth to baby number eight. Two hours later, at ten o'clock, she leaned over the fence shouting cheerily to Mother: 'It's a boy! Look like his father, but thank God he ain't have his father character!' Eddoes whistled: 'Eight children from seven men—a real world record!'"
      },
      {
        "s": "narr",
        "x": "劳拉一如既往地快活。她搬出大木盆，用自己那双粗糙强壮的手在搓衣板上揉搓大堆衣服，肥皂沫飞溅。五颜六色的童装在热带的海风中猎猎作响，像一面面不向苦难低头的凯旋旗。她的大女儿洛娜渐渐长大了。洛娜身材修长纤细，长着一双忧郁美丽的大眼睛，是整条街最安静乖巧的姑娘，劳拉视她为唯一的掌上明珠。",
        "en": "Laura remained as gay as ever. Suds flying, she scrubbed endless piles of laundry with bare hands. Rows of bright clothes fluttered like battle flags. Her eldest daughter Lorna grew into a slender girl with quiet, sorrowful eyes. She was the gentlest girl in the street, the apple of Laura's eye."
      },
      {
        "g": "night",
        "music": "sad",
        "s": "narr",
        "x": "然而，加勒比海贫民窟的残酷宿命，像幽灵一样无情地降临了。几个月后，街上悄悄传开流言：未婚的洛娜怀孕了。消息传到劳拉耳朵里的那个傍晚，米格尔街经历了一场撕心裂肺的巨震。",
        "en": "Yet the merciless curse of the colony descended. Whispers rippled down the curb: unmarried Lorna was pregnant. The evening the truth reached Laura, Miguel Street was shaken to its core."
      },
      {
        "v": "empathy",
        "lvl": 2,
        "s": "narr",
        "x": "院子里传出了劳拉生平第一次的痛哭——不是谩骂，不是大笑，而是像被活活剥皮般的悲号！劳拉一边发疯似地用皮带抽打洛娜，一边瘫倒在泥地上捶胸顿足，哭得撕心裂肺：“老天爷啊！世上还有比一个未婚姑娘大肚子更惨的事吗？！看看我！看看你妈这一辈子！你为什么要走我的老路啊！！”",
        "en": "From the yard rose Laura's first bitter weeping—not shouting, but agony as if flayed alive! Whipping Lorna in wild grief, Laura collapsed in the mud, wailing heartbrokenly: 'Oh God! It have nothing worse than a girl having baby outside! Look at me! Look at your mother's whole life! Why you had to go and do what I did?!'"
      },
      {
        "choice": [
          {
            "label": "[同理心震颤] 隔着木篱笆凝视劳拉跪地痛哭的背影，感受两代母亲的绝望",
            "labelEn": "[Shattered Empathy] Watch Laura weeping in the dust, tasting the generational despair",
            "check": {
              "v": "empathy",
              "dc": 6
            },
            "pass": [
              {
                "s": "narr",
                "x": "那一刻我们才懂得，劳拉往日所有的泼辣与狂笑，全都是咬紧牙关撑起的铠甲。她用自己的血肉供养了八个孩子，原本把逃离深渊的所有希望寄托在洛娜身上，如今轮回的巨轮却冷酷地将女儿卷入了同样的泥潭。",
                "en": "In that agonizing hour we realized Laura's laughter had been her sole armour against despair. She had slaved to give Lorna a chance to escape; now the cruel cycle crushed the daughter into the same colonial quagmire."
              },
              {
                "v": "memory",
                "lvl": 3,
                "x": "在加勒比海的黄昏里，一个女人的狂笑有多响亮，她心底被生活碾碎的啼哭就有多深。",
                "en": "Under the tropical twilight, the louder a slum woman's laughter had been, the deeper the tears life had ground into her bones."
              }
            ],
            "fail": [
              {
                "s": "narr",
                "x": "母亲叹息着拉上窗帘，紧紧搂住我，喃喃道：“造孽啊……加勒比海的女人，命就跟路边的野草一样贱。”",
                "en": "Mother drew the curtains, holding me tight: 'Lord have mercy... a poor island woman's life is cheap as roadside grass.'"
              }
            ]
          },
          {
            "label": "[市井叹息] 听哈特在路沿上低头点烟",
            "labelEn": "[Street Sigh] Watch Hat silently flick a match on the curb",
            "then": [
              {
                "s": "hat",
                "x": "哈特手指颤抖地掐灭火柴，声音沙哑：“这回劳拉是真的伤透心了。她一生从没求过谁，可命运从不讲理。”",
                "en": "Hat flicked the burnt match with shaking fingers: 'Laura heart really break this time. She never beg nobody, but life don't play fair.'"
              }
            ]
          }
        ]
      },
      {
        "s": "narr",
        "x": "洛娜生下了一个小女婴。仅仅几周之后，悲剧以最决绝的方式落幕：洛娜去卡勒纳奇海湾洗澡游泳，在汹涌的浪潮中溺水身亡。噩耗传回米格尔街，邻居们屏住呼吸等待着劳拉家爆发灭顶的狂风暴雨。",
        "en": "Lorna gave birth to a baby girl. Weeks later, tragedy struck its final blow: Lorna went swimming at Carenage bay and drowned in the surf. When word reached Miguel Street, neighbours held their breath for an unbearable storm of grief."
      },
      {
        "s": "narr",
        "x": "然而，没有尖叫，也没有哭泣。劳拉神色木然地走出房门，把婴儿的尿布默默夹在晾衣绳上。她的脸颊深陷，眼睛里再也没有了一丝光彩与快活。她抬起头望着灰蒙蒙的天空，用低得几乎听不见的声音平静地自言自语：“死了好。死了好。上帝知道什么才是最好的。”",
        "en": "Yet there was neither screaming nor weeping. Laura walked into the yard with dead calm, pinning baby diapers onto the line. Her cheeks were hollow, her eyes extinguished. She looked up at the grey sky and whispered in quiet resignation: 'It good. It good. God know best.'"
      },
      {
        "v": "memory",
        "lvl": 3,
        "x": "劳拉的笑声永远熄灭了。那个曾以粗野的生命力对抗全宇宙的泼辣母亲，终于被加勒比的命运彻底驯服。她重新变回了泥土，平静，沉默，永不再笑。",
        "en": "Laura's laughter died forever. The fierce mother who defied the universe with ribald joy was broken by island fate. She returned to silence and dust, never to laugh again."
      }
    ]
  },
  {
    "id": "eddoes",
    "no": "XI",
    "title": "蓝色马车",
    "sub": "THE BLUE CART",
    "hot": {
      "x": 78,
      "y": 12,
      "w": 9,
      "h": 40,
      "pin": [
        82.5,
        26
      ]
    },
    "tip": {
      "v": "street",
      "x": "垃圾堆里的鉴赏家。埃多斯视垃圾为至宝，在富人废弃的碎屑中构筑他的贵族梦。",
      "en": "The aristocrat of refuse. Eddoes turned garbage collection into high connoisseurship."
    },
    "tipAfter": {
      "v": "memory",
      "x": "木箱里的女婴“乐乐”。血统与谎言交织在一起，成了米格尔街最荒唐而温暖的父爱。",
      "en": "Baby Pleasure in a kerosene box: blood and falsehood braided into the sweetest paternity."
    },
    "item": {
      "name": "一只绘着维多利亚金边的碎瓷杯",
      "nameEn": "A Gilt-Rimmed Victorian Teacup",
      "desc": "手柄已经断了，但埃多斯每天清晨必用它喝茶，傲然宣称这是总督官邸的御用之物。",
      "descEn": "Handle broken, yet Eddoes drank from it daily, swearing it came from the Governor's pantry."
    },
    "note": "当世界只把垃圾留给你，最彻底的救赎，便是将垃圾奉为神圣的战利品与父爱的摇篮。",
    "noteEn": "When the world bequeaths you only refuse, redemption lies in treating garbage as imperial booty and a cradle for love.",
    "steps": [
      {
        "bg": "eddoes",
        "g": "day",
        "music": "calypso",
        "s": "narr",
        "x": "我希望长大后能成为埃多斯那样的人，原因当然很多。首先，他是我们这条街上的大贵族之一，整天驾着属于市政清洁队的蓝色垃圾马车，而且只在清爽的早晨干活。其次，正像大家赞誉的那样，埃多斯是个名副其实的“花花公子”——一个悠闲自得、穿着考究、深得女人欢心的传奇人物。",
        "en": "I wished I could grow up to be like Eddoes, for many reasons. First, he was one of the street's aristocrats, driving the City Council's blue refuse cart, working only in cool mornings. Second, Eddoes was a playboy—an easygoing dandy who dressed impeccably and knew his way with women."
      },
      {
        "s": "narr",
        "x": "哈特常说：“听着，埃多斯太爱干净了，简直不像个拉垃圾车的。”埃多斯有洁癖，一刷牙就是几小时。只要跟外人提起“嘴里总是含着根牙刷的小个子”，大家立刻心领神会。我特别羡慕他这一点，中午嘴里含着牙刷在院子里踱步，母亲骂道：“你搞什么名堂？怎么不撒泡尿玩？”但这没能阻挡我含着牙刷去上学。",
        "en": "Hat often remarked: 'Eddoes too clean for a scavenger.' Eddoes had a mania for hygiene. He brushed his teeth for hours, strolling with a toothbrush clamped in his jaws. I admired this so much that I strutted around with a toothbrush, until Mother barked: 'Why you don't pee and play with it?' Still, I took it to school anyway."
      },
      {
        "s": "narr",
        "x": "埃多斯永远穿得笔挺体面。卡其裤烫得能割破手指，皮鞋擦得锃亮照人。衬衫纽扣永远敞开三颗，露出浓密毛糙的胸脯；袖口正好卷在手腕上方，让你一眼就能瞥见他戴的那块闪闪发光的金表。即便穿上厚大衣，他也巧妙地把手腕露出来，仿佛全世界都必须敬仰这块大金表。",
        "en": "Eddoes dressed immaculately. Knife-creased khaki trousers, mirror-shined shoes, three shirt buttons undone to reveal a hairy chest, and sleeves rolled precisely above his gleaming gold wristwatch. Even wearing an overcoat, his wrist rested carelessly so nobody could miss the gold timepiece."
      },
      {
        "s": "narr",
        "x": "埃多斯的后院简直就是一座帝国博物馆。他负责的清洁线路是富人聚居的圣克莱尔高级住宅区，总督和英国种植园主们废弃的“战利品”源源不断被他拉回米格尔街：烫金书脊的狄更斯全集、断了把手的维多利亚碎瓷杯、瑞士八音钟、甚至还有一座风琴！全街人都从他手里买旧货，霍伊特和哈特都成了他的忠实主顾。",
        "en": "Eddoes' yard was a museum of colonial treasures. His cart route covered aristocratic St. Clair. Discarded riches of planters and governors flowed into his shed: gilt-edged Dickens sets, broken Victorian cups, a Swiss clock, even a harmonium! Titus Hoyt and Hat bought salvaged books; the slum took pride in his aristocratic junk."
      },
      {
        "s": "narr",
        "x": "一天埃多斯运来两幅完好装裱的欧洲油画风景画，我母亲掏出整整十二分钱买下一幅挂在客厅，高兴得在围裙上擦手。埃多斯靠垃圾给贫民窟带来了上流社会的风雅。然而好景不长，一天清晨，埃多斯像法官一样面色严峻地坐上路沿，嘴里的牙刷也不动了。他说：“伙计们，我遇到大麻烦了。”",
        "en": "One day he brought two framed landscape paintings; Mother wiped her hands on her apron and paid twelve cents for one. Refuse brought high culture to our curb. But the golden days faltered. One morning Eddoes sat like a stern judge, toothbrush motionless: 'Boys, I in trouble.'"
      },
      {
        "s": "narr",
        "x": "哈特打趣道：“怎么，你偷英国人的古董被警察抓了？”埃多斯摇头叹道：“我把一个姑娘的肚子搞大了。”哈特吐出烟圈：“嗨，多大点事，谁没在外面留过种？”埃多斯愁眉苦脸：“她以前就给别人生过娃。最要命的是，她说如果我不认领这个孩子，她就找关系把我调出圣克莱尔，发配到东区干河去拉垃圾！”",
        "en": "Hat laughed: 'What, caught stealing planters' clocks?' Eddoes sighed: 'I make a girl pregnant.' Hat shrugged: 'A common accident, man.' Eddoes groaned: 'She had children for other men before. The worst is, she say if I don't take the baby, she go get me moved from St. Clair to East Dry River!'"
      },
      {
        "s": "eddoes",
        "x": "“弟兄们！干河那鬼地方住的全是穷光蛋，他们连吃剩的鱼骨头都舍不得扔！去了干河，我哪还能捡到半件像样的材料啊？！”埃多斯抱头痛哭，仿佛面临世间最残酷的流放。",
        "en": "'Boys! Dry River people so poor they don't even throw away fish bones! In Dry River I would never pick up a single piece of good material!' Eddoes wept into his hands as if sentenced to the salt mines."
      },
      {
        "choice": [
          {
            "label": "[街头老练] 分析贫民窟女人的算计，劝埃多斯权衡利弊",
            "labelEn": "[Street Wisdom] Weigh the aristocratic garbage route against an unwanted paternity",
            "check": {
              "id": "eddoes_aristocracy",
              "type": "white",
              "v": "street",
              "dc": 6,
              "modifiers": [
                { "text": "圣克莱尔富人区的垃圾油水", "textEn": "Sanitation spoils of St. Clair", "val": 2 }
              ]
            },
            "pass": [
              {
                "thought": "garbage_aristocracy",
                "heal": { "amount": 1, "reason": "埃多斯从垃圾车里搜得的薄荷硬糖" },
                "s": "hat",
                "x": "哈特冷笑一声：“俗话说，男人是蜈蚣心肠，女人比蜈蚣心肠还要毒！有些女人专门靠生孩子敲诈男人的血汗钱，自己落得一身轻。但听着，埃多斯，圣克莱尔的肥差绝对不能丢。等孩子满一岁，把她接回米格尔街，咱们自己养！”《垃圾堆里的贵族》思潮在你脑海中萌发。",
                "en": "Hat spat: 'A man is a centipede, but a woman is worse than a centipede! Some women live off father-child money without raising a finger. But listen, Eddoes: never surrender St. Clair. When the baby turns one, bring her home—we raise she here!' The thought 'The Sanitation Aristocracy' takes root."
              },
              {
                "v": "street",
                "lvl": 2,
                "x": "在加勒比底层的生存算盘里，一份体面的垃圾工作比任何道德名节都要珍贵一千倍。",
                "en": "On the colonial curb, an aristocratic garbage route was worth a thousand times more than moral puritanism."
              }
            ],
            "fail": [
              {
                "s": "eddoes",
                "x": "埃多斯整天失魂落魄，连金表都塞进裤裆，头发凌乱，宛如一只被拔了毛的孔雀。",
                "en": "Eddoes moped in squalor, shoving his gold watch out of sight, unkempt like a plucked peacock."
              }
            ]
          },
          {
            "label": "[纯真安慰] 替埃多斯给未来的小女婴起名字",
            "labelEn": "[Innocent Hope] Suggest names for the unborn child to lift Eddoes' spirits",
            "then": [
              {
                "s": "hat",
                "x": "哈特拍了拍埃多斯：“别愁眉苦脸的，孩子还没来，我先替你取好名了——就叫‘乐乐’！让这小丫头给你带来一辈子的快活！”",
                "en": "Hat slapped his back: 'Cheer up! I name the baby already—Pleasure! Let that little girl bring you joy all your days!'"
              }
            ]
          }
        ]
      },
      {
        "s": "narr",
        "x": "几个月后，小女婴出生了。为了保住圣克莱尔大道的黄金垃圾线，埃多斯咬牙答应抚养她。一个雷雨交加的傍晚，女婴的生母乘出租车来到了米格尔街。那是一个神情野性、皮肤略显西班牙混血风韵的女人。她将一个装着婴儿的煤油木箱往埃多斯怀里一塞，头也不回地上车绝尘而去。",
        "en": "Months passed; the girl was born. To safeguard his St. Clair route, Eddoes agreed to father her. One stormy evening, the mother arrived in a taxi. A fierce, wild-looking Spanish woman, she thrust a kerosene box containing the infant into Eddoes' arms, jumped back into the cab, and vanished into the rain."
      },
      {
        "g": "night",
        "s": "narr",
        "x": "男人们全围了上来，凑在煤油灯下一看，整条街瞬间陷入了死寂。煤油箱里躺着的小女婴皮肤雪白细腻，泛着红苹果般的光泽，甚至长着一撮金黄色的绒毛！——只要有两只眼睛的人都能一眼看出：这百分之百是个白人大兵的种，跟黝黑矮小的埃多斯没有半点血缘关系！",
        "en": "The men crowded around the kerosene lamp, and dead silence fell. In the crate lay a fair, golden-haired baby with flushed cheeks. Anyone with two eyes could see instantly: this child was fathered by a white soldier. She had not an ounce of Eddoes' blood."
      },
      {
        "s": "narr",
        "x": "博伊再也忍不住了，嬉皮笑脸地拍手唱起卡里普索小调：“中国孩子叫我爸爸！我皮肤黑得像煤炭，我老婆黑得像沥青，可是中国孩子叫我爸爸！上帝啊，谁在我的咖啡里兑了牛奶？！”",
        "en": "Boyee couldn't contain himself, clapping and singing calypso: 'Chinese children calling me Daddy! Me black like coal, my wife black like pitch, but Chinese children calling me Daddy! Oh Lord, somebody put milk in my coffee!'"
      },
      {
        "v": "empathy",
        "lvl": 2,
        "s": "narr",
        "x": "哈特猛地一把狠狠掐住博伊的胳膊，把他推到一边。哈特走上前，无比郑重地拍着埃多斯的肩膀：“埃多斯，这孩子长得多俊啊！瞧瞧这眉眼，这脸蛋，简直就是你的翻版！男子汉在外面留了后代，带回家养大，光宗耀祖，有什么好害臊的！”",
        "en": "Hat pinched Boyee's arm viciously, shoving him aside. Stepping forward, Hat clapped Eddoes' shoulder with solemn dignity: 'Eddoes, she look just like you! A sweet little girl, the spitting image of her handsome father! Bring them all home and raise them, man—nothing to shame about!'"
      },
      {
        "s": "eddoes",
        "x": "埃多斯呆立在原地，眼泪在眼眶里打转，颤声问道：“哈特……你……你真觉得她像我吗？”哈特斩钉截铁：“绝对像你，伙计！一模一样！”埃多斯突然像孩子一样狂喜地破涕为笑，甚至手舞足蹈起来：“哈特！我在圣克莱尔捡了一个绝顶漂亮的雕花鸟笼，明天一早我就送给你！”",
        "en": "Eddoes stood frozen, tears welling in his eyes: 'Hat... you really think she take after me?' Hat said firmly: 'Yes, man! Spitting image!' Eddoes burst into wild, joyful laughter, weeping with pride: 'Hat! I pick up a grand birdcage long ago—tomorrow morning I bring it for you!'"
      },
      {
        "g": "day",
        "music": "calypso",
        "s": "narr",
        "x": "埃多斯彻底重获新生。他不仅重新成了那个趾高气扬的花花公子，更成了一个骄傲的父亲。他用圣克莱尔捡来的顶级红木废料亲手为女婴打造了一张雕花婴儿床，用捡来的维多利亚纯银小勺给她喂高档克宁奶粉。“乐乐”成了整条街的小公主，我母亲、劳拉、巴库太太和摩根太太全来帮忙照料她。",
        "en": "Eddoes was reborn. He became not just the street dandy, but a doting father. He carved a mahogany crib from salvaged planters' beds and fed her imported milk with a silver spoon. 'Pleasure' became the street princess; Mother, Laura, Mrs. Bhakcu and Mrs. Morgan took turns tending her."
      },
      {
        "s": "narr",
        "x": "米格尔街再也没有任何人敢嘲笑埃多斯。一年后，全特立尼达举行“英格兰考与盖特健康少儿大赛”。全街集资给乐乐穿上最华丽的蕾丝裙，乐乐一举荣获全岛一等奖！当头版新闻刊登出她粉雕玉琢的玉照时，埃多斯戴着金表、嘴里咬着牙刷，雄赳赳气昂昂地走在街上，昂首睥睨着整个西班牙港！",
        "en": "Nobody on Miguel Street ever laughed at Eddoes again. A year later, Trinidad held the prestigious Cow and Gate Baby Competition. Dressed in lace, Pleasure won First Prize! When her picture covered the front page, Eddoes strode through Port of Spain with gold watch flashing and toothbrush clamped high, the proudest father in the British West Indies!"
      },
      {
        "v": "memory",
        "lvl": 3,
        "x": "垃圾车夫在别人的遗弃物中，拼凑出了一个神圣的家庭。在这个虚情假意的殖民世界上，唯有这谎言包裹的父爱，纯洁得毫无瑕疵。",
        "en": "From the cast-offs of the wealthy, a scavenger pieced together a consecrated home. In a world of imperial pretense, this fatherly love built upon a lie was purest and absolute."
      }
    ]
  },
  {
    "id": "toni",
    "no": "XII",
    "title": "只是为了，爱，爱，爱",
    "sub": "LOVE, LOVE, LOVE ALONE",
    "portrait": "angela",
    "hot": {
      "x": 70,
      "y": 15,
      "w": 10,
      "h": 42,
      "pin": [
        75,
        28
      ]
    },
    "tip": {
      "v": "empathy",
      "x": "希尔顿小姐的旧宅。赫瑞拉太太为了狂暴的爱情抛弃了豪门，跌入贫民窟的深渊。",
      "en": "Miss Hilton's old cottage. Mrs. Hereira abandoned luxury for violent love, falling into slum despair."
    },
    "tipAfter": {
      "v": "memory",
      "x": "爱情烧成了灰烬。安吉拉整理好破碎的丝绸衣裳，默默登上了返回圣费尔南多的客车。",
      "en": "Passion burnt to cinders. Angela smoothed her torn silk dress and boarded the coach back to high society."
    },
    "item": {
      "name": "一枚染着血迹的珍珠发夹",
      "nameEn": "A Blood-Stained Pearl Hairpin",
      "desc": "曾属于圣费尔南多名门贵妇安吉拉·克里斯蒂安尼。托尼在醉酒狂暴中摔碎了它。",
      "descEn": "Belonged to Angela Christiani of high society. Crushed underfoot by Toni during a drunken midnight frenzy."
    },
    "note": "她将一切献给了所谓崇高的激情，却不知在加勒比海的贫瘠泥潭里，盲目的爱往往与毁灭同义。",
    "noteEn": "She sacrificed all for romantic passion, discovering that in Caribbean poverty, blind love means ruin.",
    "steps": [
      {
        "bg": "toni",
        "g": "day",
        "music": "sad",
        "s": "narr",
        "x": "一天早晨九点光景，一辆灵车和一辆轿车在希尔顿小姐屋前停下。轿车上下来一男一女，身着黑衣，姿态端庄而克制。希尔顿小姐的丧事在米格尔街最为简便，不像隔壁大善人理考德小姐出殡时有整整七十九辆汽车和一辆自行车。中午男女回来，在院里点起火堆，床垫被褥烧成灰烬，门前挂上了牌子：此屋待售。",
        "en": "Around nine one morning, a hearse and a motor-car stopped outside Miss Hilton's house. A couple in black stepped out, weeping with controlled decorum. Miss Hilton got the swiftest funeral, nothing like social worker Miss Ricaud's seventy-nine cars and a bicycle. By noon, mattresses and sheets were burned in a bonfire, and a sign went up: FOR SALE."
      },
      {
        "s": "narr",
        "x": "新租客搬进来的那天，全街都惊呆了。来的女人高贵端庄、艳丽非凡；而身边的男人托尼却丑陋干瘪，浑身散发着发酸的廉价朗姆酒恶臭。他们甚至牵着一条公羊般巨大、恶犬般凶残的猛犬。更怪异的是，除了那台震耳欲聋的高档收音机，整栋空屋里竟连一件像样的家具都没有。",
        "en": "The street gasped when the new tenants arrived. The lady was stunningly beautiful and refined; but the man, Toni, was hideous and scrawny, reeking of sour rum. They brought a vicious dog big as a ram and fierce as a bull. Stranger still: except for an expensive radio blaring day and night, they moved in not a single piece of furniture."
      },
      {
        "s": "narr",
        "x": "那女人自称“赫瑞拉太太”。博伊低声对哈特说：“我在穆库拉普高级住宅区送牛奶时见过她！她原本应该在庄园花园里穿丝绸短裙，身后跟着穿制服的黑人仆人，怎么会流落到咱们这贫民窟买平价大米？”而那个托尼则是个十足的恶棍，左眼皮上有块被开水烫伤般的粉红肉疤，整天满嘴脏话，恶毒地诅咒每一个路人。",
        "en": "She called herself Mrs. Hereira. Boyee whispered: 'I seen her when delivering milk in posh Mucurapo! She belongs in a mansion garden with uniformed servants, not lining up in our slum for rationed rice!' While Toni was a hopeless brute with a scalded pink scar over his left eye, snarling vile curses at anyone who walked by."
      },
      {
        "g": "night",
        "music": "sad",
        "s": "narr",
        "x": "可奇怪的是，当你避开托尼狰狞的醉脸，只端详他垂在身侧的那两只手时——那是一双又细又皱、颤抖无助的手，脆弱得像生了重病的小孩。我想，赫瑞拉太太或许就是被这双手彻底俘虏的。然而地狱很快降临，夜复一夜，收音机的狂响中夹杂着酒瓶砸碎在墙上的脆响、男人的咆哮和女人的哀鸣。",
        "en": "Yet looking away from Toni's hideous face at his hands—they were thin, wrinkled, trembling like a sick child's. I thought Mrs. Hereira saw only those hands. But hell descended nightly: over the blaring radio came splintering rum bottles against walls, wild curses, and muffled screams of a woman being beaten."
      },
      {
        "s": "narr",
        "x": "凌晨两点，我家的厨房木门被急促撞开！赫瑞拉太太跌跌撞撞扑倒在地，下嘴唇被打破，鲜血正一滴滴滴在冰凉的木地板上。她浑身发抖，散落的秀发遮住了淤青的眼眶。母亲慌忙扶起她，给她倒了一杯热茶。",
        "en": "At 2am, our kitchen door was flung open! Mrs. Hereira collapsed inside, her lower lip split and dripping crimson onto the bare boards. Shivering violently, bruised and dishevelled, she wept. Mother rushed to lift her, pressing a hot mug of tea into her trembling fingers."
      },
      {
        "s": "narr",
        "x": "起初母亲还字斟句酌地拿腔拿调，但来过两三次后，母亲撕下了全部文雅伪装，狠狠一拍桌子：“赫瑞拉太太！你到底图什么？！你为什么不甩了这个猪狗不如的无赖？！”赫瑞拉太太含泪低语：“我知道这听上去很傻……但我爱托尼。他在海上当水手，挨过两次鱼雷，他只有夜里喝醉了才发疯，早上他比谁都温柔……”",
        "en": "Mother tried refined polite speech at first, but after a few nights dropped all pretension, slamming the table: 'Mrs. Hereira! What you doing with this good-for-nothing brute?! Why you don't leave him?!' Mrs. Hereira sobbed: 'I know it sounds stupid... but I love Toni. He was a seaman, torpedoed twice. He is only wild at night; in mornings he has a good heart...'"
      },
      {
        "s": "narr",
        "x": "母亲冷笑道：“他该挨第三记鱼雷！全是我多管闲事，谁叫我掺和白人的破事！你听过那首卡里普索吗：【只是为了，爱，爱，爱，英王爱德华把王位抛开】。可我明白告诉你，你不是爱德华国王！回你的混账情人身边去挨揍吧！”赫瑞拉太太哭着夺门而出，可第二天深夜，她又带着新伤回来了。",
        "en": "Mother mocked: 'He should get torpedoed a third time! My fault for meddling in white people's business! You know that calypso: 'Love, love, love alone, caused King Edward to leave the throne.' Well, let me tell you, you ain't King Edward! Go back to your wonderful lover!' She fled weeping, yet returned next midnight with fresh bruises."
      },
      {
        "choice": [
          {
            "label": "[心碎同理] 凝视赫瑞拉太太脸上的伤口，体察她自毁式的深情",
            "labelEn": "[Shattered Empathy] Gaze at her bruised face, fathoming her fatal passion",
            "check": {
              "v": "empathy",
              "dc": 6
            },
            "pass": [
              {
                "s": "narr",
                "x": "看着她绝望的眼泪，你恍然领悟：安吉拉在豪门的无菌生活中快要窒息了，托尼身上的野性、堕落与病态，成了她对抗空虚生命的唯一毒品。她宁愿被毒打致死，也不愿回到那座冰冷华丽的坟墓。",
                "en": "Looking into her weeping eyes, you sensed the truth: Angela had suffocated under the sterile respectability of wealth. Toni's rot, sea-scars and madness were her tragic heroin. She would rather be beaten to death than return to a gilded mausoleum."
              },
              {
                "v": "empathy",
                "lvl": 2,
                "x": "爱在热带贫民窟不是救赎，而是一场向深渊狂奔的自焚。",
                "en": "Love in a colonial slum was not redemption; it was an act of immolation sprinting toward the abyss."
              }
            ],
            "fail": [
              {
                "s": "hereira",
                "x": "赫瑞拉太太痛苦地捂住脸：“别用那种眼神看着我……你们什么都不懂。托尼是需要我的，离开我他会死在臭水沟里。”",
                "en": "Mrs. Hereira covered her face: 'Don't look at me like that... You don't understand. Toni needs me. Without me he go die like a stray dog.'"
              }
            ]
          },
          {
            "label": "[街头冷眼] 旁观哈特与街坊男人们出手教训烂醉的托尼",
            "labelEn": "[Street Retribution] Watch Hat and the men give Toni a street thrashing",
            "then": [
              {
                "s": "narr",
                "x": "哈特终于忍无可忍，领着几个男人在巷口拦住托尼狠狠痛揍。然而托尼没有还手，没有呼救，甚至没有恐惧。他像具没有灵魂的僵尸任由拳头砸在脸上，眼中空无一物。哈特打完后反倒冷汗淋漓：“这家伙根本不是人……他骨头里只有烂醉的虚无。”",
                "en": "Hat finally cornered Toni in the alley, beating him mercilessly. But Toni neither flinched, struck back, nor pleaded. He stood blankly taking blows like a dead puppet. Hat stepped back shivering with cold dread: 'He ain't a man... he has nothing inside but rot and void.'"
              }
            ]
          }
        ]
      },
      {
        "g": "day",
        "s": "narr",
        "x": "秘密在一个清晨被《特立尼达卫报》彻底引爆。报纸中缝登出一则法律通告：【圣费尔南多名医亨利·克里斯蒂安尼郑重声明：本人概不负责其妻安吉拉·玛丽·克里斯蒂安尼在离家出走期间所欠下的任何债务】。整个米格尔街瞬间哗然！",
        "en": "The truth exploded one morning in the Trinidad Guardian. A legal notice read: 'I will not be responsible for any debts contracted in my name by my wife, Angela Mary Christiani...' The whole street gasped! The mysterious Mrs. Hereira was Angela Christiani, wife of the island's wealthiest surgeon!"
      },
      {
        "s": "narr",
        "x": "安吉拉向母亲吐露了真相：“亨利太干净了，他身上永远有一股医院苏打水和来苏水的味道，干净得让我喘不过气。托尼原本是亨利带回家医治的病患……我却跟他逃到了这里。”母亲叹道：“如果你十五岁就嫁给我死去的丈夫，你绝不会有闲工夫搞这些‘爱不爱’的胡扯！”安吉拉掩面痛哭。",
        "en": "Angela confessed to Mother: 'Henry was too clean. He smelled of doctor's carbolic soap and disinfectant; it suffocated me. Toni was Henry's patient... and I threw away everything to run with him.' Mother said: 'If you had married at fifteen like me, you wouldn't have this nonsense about love.' Angela wept bitterly."
      },
      {
        "g": "night",
        "music": "sad",
        "s": "narr",
        "x": "然而，托尼跨越了最后的人伦底线。在一个暴雨如注的深夜，完全被酒精烧坏脑子的托尼，竟然解开铁链，唆使那头猛犬去撕咬安吉拉！在恶犬狂吠与獠牙撕咬下，安吉拉拼死逃出了木屋。",
        "en": "Yet Toni crossed the final line of madness. One stormy night, delirious with rum, Toni unchained his savage hound and commanded the beast to tear into Angela! Trapped against the wall with snapping fangs, Angela fought through blood and rain to escape."
      },
      {
        "s": "narr",
        "x": "次日清晨，安吉拉换上了一身素雅的黑衣裳，平静地来到我家道别。她没有哭泣，神情如静止的深潭：“我决定离开托尼。他昨晚放狗咬我，如果我再不走，他真的会杀了我。我已经给他留了够吃一个星期的食物。”",
        "en": "Next morning, Angela arrived in a dignified black dress to say goodbye. She wept no more, her gaze cool as deep water: 'I am leaving Toni. Last night he set the dog on me. If I don't go, he will kill me. I left enough food for him for a week.'"
      },
      {
        "s": "narr",
        "x": "一辆来自圣费尔南多的崭新黑色豪车无声地滑停在街角。穿白制服的黑人司机恭敬地为她拉开车门。安吉拉整理好黑裙，最后看了一眼破败的木屋，毅然跨上车。轿车驶过泥泞的米格尔街，将荒谬的贫民窟恋梦永远碾碎在车轮之下。",
        "en": "A gleaming black motor-car from San Fernando slid to the curb. A uniformed chauffeur bowed and opened the door. Angela smoothed her black dress, looked back one last time at the rotting cottage, and stepped inside. The limousine glided away, crushing her slum fever dream forever beneath its tyres."
      },
      {
        "g": "dusk",
        "s": "narr",
        "x": "发现安吉拉离去后，托尼彻底疯了。他在街上像狗一样狂吠，又像婴儿般抱头号哭。他烂醉了整整一周，甚至忘了喂狗。饥饿狂躁的猛犬猛然挣断铁链，扑上来咬伤了他的胳膊，狂奔逃向荒野！托尼跌跌撞撞追到街心，瘫倒在泥水里吹口哨想要唤回猛犬，可恶犬头也不回地消失在了暴风雨中。",
        "en": "Finding her gone, Toni went mad. He howled like an animal, then blubbered like an infant, staying dead drunk for a week and starving the dog. Maddened by hunger, the beast broke its chain, bit Toni's arm, and bolted! Toni collapsed in the gutter whistling drunkenly to coax it back, but the dog vanished into the rain forever."
      },
      {
        "s": "narr",
        "x": "男人们推开木屋，托尼烂醉如泥地趴在发霉的褥垫上，满地尽是摔碎的朗姆酒瓶和烟头。屋门前再次钉上了“此屋待售”的木牌。两个月后，托尼彻底从米格尔街消失了。",
        "en": "Men pushed open the door: Toni lay collapsed on a mildewed mattress amid hundreds of broken rum bottles and butts. Miss Hilton's mango tree bore the 'FOR SALE' sign once more. Within two months, Toni vanished from Miguel Street for good."
      },
      {
        "g": "day",
        "music": "calypso",
        "s": "narr",
        "x": "多年后，我乘车去阿里马，在拉芬蒂勒采石场附近瞥见托尼开着一辆破旧的运石碎屑卡车，嘴里叼着烟卷，那双瘦弱见骨的干瘪手臂依然在颠簸中握着方向盘。而在一个晴朗的星期天，我骑车经过卡勒纳奇高级富人区，看到了克里斯蒂安尼医生的临海豪宅。",
        "en": "Years later, travelling to Arima near the Laventille quarry, I glimpsed Toni driving a gravel lorry, cigarette dangling from chapped lips, steering with those same thin, wrinkled arms. While on a sunny Sunday cycling past Carenage, I rode by Dr. Christiani's seaside villa."
      },
      {
        "v": "memory",
        "lvl": 3,
        "x": "花园草坪的安乐椅上，克里斯蒂安尼夫人身着时髦短衫，优雅地翻阅着晨报。敞开的大门里，制服仆人们正摆设银质餐具；车库里停着崭新的黑色轿车。只是为了，爱，爱，爱——热带的暴风雨洗净了泥淖，阶级的鸿沟如同大海，平静而森严。",
        "en": "In an armchair on the lawn sat Mrs. Christiani in fashionable shorts, serenely reading the paper. Uniformed servants set silver cutlery through open doors; a luxury black limousine gleamed in the garage. Love, love, love alone—the storm had passed, leaving class chasms vast and immutable as the sea."
      }
    ]
  },
  {
    "id": "bhakcu",
    "no": "XIII",
    "title": "机械天才",
    "sub": "THE MECHANICAL GENIUS",
    "hot": {
      "x": 61,
      "y": 35,
      "w": 9,
      "h": 32,
      "pin": [
        65.5,
        48
      ]
    },
    "tip": {
      "v": "imagine",
      "x": "永远大修中的汽车底盘。巴库叔叔一边用扳手拆卸活塞，一边高唱印度史诗。",
      "en": "A car chassis permanently stripped down. Uncle Bhakcu tinkered with spanners while chanting Vedic hymns."
    },
    "tipAfter": {
      "v": "memory",
      "x": "妻子挥舞板球棒的重击声，终究没能让他把汽车组装回去。但他在机器的残骸里找到了无上的宁静。",
      "en": "His wife's cricket bat never helped him rebuild the engine. But among metal scrap, he attained pure bliss."
    },
    "item": {
      "name": "一枚满是机油黑垢的火花塞",
      "nameEn": "An Oil-Caked Spark Plug",
      "desc": "巴库叔叔曾向全街宣称：只要清洗好这枚插头，他的奥斯汀汽车就能开上云端。",
      "descEn": "Uncle Bhakcu swore that once cleansed, this plug would launch his Austin into the clouds."
    },
    "note": "他对现代机器的痴迷，宛如原始信徒对神坛的崇拜。拆解是他的信仰，哪怕他一生从未组装好任何零件。",
    "noteEn": "His mechanical mania resembled primitive idolatry: dismantling was sacred, even if he never rebuilt a thing.",
    "steps": [
      {
        "bg": "bhakcu",
        "g": "day",
        "music": "calypso",
        "s": "narr",
        "x": "我叔叔巴库可以称得上摆弄机械的天才。在我的记忆里，他院子里总停着那么一辆机动车什么的。但他并非总是认同汽车制造商的设计，因为他常常把发动机拆得一塌糊涂。泰特斯·霍伊特说这也是爱斯基摩人的习惯，是看一本地理书知道的。",
        "en": "My Uncle Bhakcu was very nearly a mechanical genius. I cannot remember a time when he was not the owner of a motor-vehicle. But he didn't always agree with the manufacturer's design, for he was always taking engines to pieces. Titus Hoyt said it was an Eskimo habit, from a geography book."
      },
      {
        "s": "narr",
        "x": "我所记得的巴库，并非他的相貌，而是他在车底下蠕动的那对脚板。他在车底下时我总是担心车会从千斤顶上滑下来砸在他身上，因为这好像随时都会发生。有一天，它终于发生了。",
        "en": "What I remember of Bhakcu was not his face, but his feet wriggling under the car. I always feared the car would slip off the jack and crush him, for it looked like happening any second. One day it finally happened."
      },
      {
        "s": "bhakcu",
        "x": "车底传出微弱沉闷的呻吟。巴库太太惊叫起来：“噢！天哪！我就知道会出事的！”她冲到车边轻声问：“男人，你怎么样？”巴库的呻吟更大了：“见鬼，我还能怎么样？你瞎了眼啦？没见到这么大辆车把我屁股都砸扁了！”",
        "en": "A muffled groan drifted from beneath the chassis. Mrs. Bhakcu shrieked: 'Oh, God! I know something happen to he!' She rushed to the running-board: 'Man, how you is?' His groans redoubled: 'What the hell you expect? You blind? You ain't see this big motor-car sitting down on me back?'"
      },
      {
        "s": "narr",
        "x": "巴库太太去喊哈特。哈特正在牛棚里扫粪，听见后大笑：“记得我怎么说的吗？干傻事迟早遭殃！这么崭新的车，谁叫他去瞎折腾！”巴库在车底下吼道：“哈特，等你把我拉出来，看我不拧断你的尾巴！”哈特顺手揪住偷偷抽烟的博伊和埃罗尔，罚他们互扇耳光，巴库还在车底吼着哈特别管教孩子。",
        "en": "Mrs. Bhakcu ran to summon Hat. Sweeping his cowpen, Hat chuckled: 'Remember what I tell you? Live in fire, die in fire. What he want with a good good new motor-car?' Bhakcu bellowed from underneath: 'Hat, when I get out from here, I go break your tail!' Hat casually caught Boyee and Errol smoking, ordering them to cuff each other, while Bhakcu roared from below to leave them alone."
      },
      {
        "s": "narr",
        "x": "幸好大轴只是砸在了一堆木墩上，千斤顶重新顶起，巴库毫发无损地爬了出来。他的卡其裤和背心被机油浸得又黑又硬。他对他老婆说：“它们现在真脏了，是不是？”巴库太太骄傲地回答：“是的，男人，它们真的脏了。”巴库开心地笑了。",
        "en": "Luckily the axle had dropped onto wood blocks. The jack was hoisted, and Bhakcu emerged unscathed, khaki trousers and vest black and stiff with oil. He asked his wife: 'They dirty now, eh?' She replied with pride: 'Yes, man. They dirty.' Bhakcu beamed."
      },
      {
        "choice": [
          {
            "label": "[街头智慧] 凑上前打量油垢斑斑的机盖，询问是不是挺杆松了",
            "labelEn": "[Street Smarts] Peer at the greasy engine and ask if the tappet is loose",
            "check": {
              "v": "street",
              "dc": 6
            },
            "pass": [
              {
                "s": "me",
                "x": "“巴库叔叔，是挺杆松了吗？”",
                "en": "'Uncle Bhakcu, is the tappet loose?'"
              },
              {
                "s": "bhakcu",
                "x": "巴库两眼猛地放出光芒，急切地迈步上前：“什么？你听到了？你听到它松了？我就知道你小子耳朵灵！特立尼达就没几个人懂车，全都在瞎开！”",
                "en": "Bhakcu's eyes blazed with delight: 'What? You hear it? You hear it loose? Boy, I know you got ears! Not three men in Trinidad understand a motor-car!'"
              },
              {
                "v": "street",
                "lvl": 2,
                "x": "在米格尔街，只要你能说出‘挺杆’和‘化油器’这两个词，大人们就会把你当成深不可测的技术专家。",
                "en": "On Miguel Street, knowing the words 'tappet' and 'carburettor' instantly qualified you as a master engineer."
              }
            ],
            "fail": [
              {
                "s": "bhakcu",
                "x": "巴库挥了挥沾满黑油的活扳手：“走开走开，乳臭未干的毛孩子！白人造的精密机器哪是你懂的？曲轴没事，是别的什么东西在搞鬼！”",
                "en": "Bhakcu waved a grime-blackened spanner: 'Get away, boy! What do you know about white men's machines? The crankshaft is good; is something else playing the fool!'"
              }
            ]
          },
          {
            "label": "[荒诞冥想] 凝视他用手捂住化油器孔的古怪启动仪式",
            "labelEn": "[Absurd Ritual] Watch his peculiar method of covering the carburettor intake",
            "then": [
              {
                "s": "narr",
                "x": "有时巴库发动引擎，我就用手死死捂住化油器孔，过一会儿再松开。巴库从没解释过为什么要这样做，我也从没问过。甚至我们用橡胶管从油罐吸出汽油倒进化油器，直到有一次发动机轰然起火，烧焦了我的袖口，巴库才大惑不解地挠着头作罢。",
                "en": "Whenever Bhakcu started the engine, I pressed my palm over the carburettor intake and let go on cue. He never explained why, and I never asked. We siphoned petrol through rubber tubes straight into the choke until the motor burst into flame, singeing my cuffs while Bhakcu scratched his oily head in solemn wonder."
              },
              {
                "v": "imagine",
                "lvl": 2,
                "x": "这不是机械维修，这是一场热带土著对着钢铁神明所作的虔诚降神巫术。",
                "en": "It was not mechanics; it was a pagan ritual performed before the iron deities of Detroit."
              }
            ]
          }
        ]
      },
      {
        "g": "dusk",
        "music": "calypso",
        "s": "narr",
        "x": "二战期间，巴库发了点小财，买下了一辆一九三六年的黑色二手奥斯汀轿车。他把整个发动机用粗铁链和滑轮吊在后院的大芒果树上，彻底大卸八块。院子里散落着齿轮、垫圈、活塞和螺栓，远远看去就像一片被炸碎的废铁岗。",
        "en": "During the war, Bhakcu made money and bought a secondhand black 1936 Austin. He hoisted the entire engine block up into the mango tree with chains and tackle, pulling it into hundreds of pieces. The yard was strewn with gears, washers, and pistons like an exploded scrap heap."
      },
      {
        "s": "narr",
        "x": "这辆奥斯汀从此再也没能装回去。整整好几个月，发动机悬挂在芒果树枝头随风晃荡，如同吊死在半空的黑色铁骷髅。巴库每天坐在树下，拿着浸满机油的抹布给每一个零件擦拭打磨，嘴里哼着印度小曲，眼里洋溢着创造者般的宁静。",
        "en": "The Austin was never assembled again. For months the engine swung from the mango branch like a hanged iron skeleton. Bhakcu sat beneath it every afternoon, polishing bolts with an oily rag, humming Indian songs with the serene peace of a creator."
      },
      {
        "s": "narr",
        "x": "早些年，巴库管教妻子用木棍；后来为了让她“更有感觉”，他特意去皇后公园球场的小摊上买了一根二手柳木板球棒。最奇怪的是，平时给这根板球棒涂亚麻籽油精心保养的，正是巴库太太本人。博伊好几次想借去打球，都被她严词拒绝了。",
        "en": "In earlier years, Bhakcu beat his wife with a stick; later, to 'make she feel', he bought a secondhand willow cricket bat from Queen's Park Oval. Curiously, Mrs. Bhakcu herself kept the bat lovingly oiled with linseed, flatly refusing whenever Boyee begged to borrow it for cricket."
      },
      {
        "choice": [
          {
            "label": "[权力反转] 窥视后院里风水轮流转的家庭惩诫",
            "labelEn": "[Role Reversal] Witness the domestic retribution when money ran dry",
            "check": {
              "v": "nerve",
              "dc": 6
            },
            "pass": [
              {
                "s": "narr",
                "x": "当巴库花光了家里所有积蓄买废铜烂铁时，攻守之势骤然逆转！巴库太太抄起那根沉重的柳木板球棒，像击球手一样狠狠朝巴库的后背和肩膀抽去！沉闷的‘嘭嘭’声响彻整条街！",
                "en": "When Bhakcu squandered the grocery money on junk parts, the domestic tide turned! Mrs. Bhakcu seized the willow bat, swinging it like an opening batsman across Bhakcu's fleshy shoulders! Dull, sickening thuds echoed down Miguel Street!"
              },
              {
                "s": "bhakcu",
                "x": "然而巴库既不躲避也不还手。他只穿着一条白短裤，双腿盘坐在地板上，双手合十，用洪亮而极其悦耳的梵文梵音，高声朗诵起《罗摩衍那》的古老对句！",
                "en": "Yet Bhakcu neither ran nor struck back. Stripped to his cotton drawers, he sat cross-legged on the floorboards with folded palms, bellowing melodious Sanskrit couplets from the Ramayana into the tropical heat!"
              }
            ],
            "fail": [
              {
                "s": "narr",
                "x": "隔壁院子里传来板球棒敲击骨肉的沉重钝响和巴库太太的尖叫：“你买！你再买废铁！老娘今天打断你的腰！”而巴库只是用低沉的声音唱着经文。",
                "en": "From next door came the thud of willow on flesh and Mrs. Bhakcu's shrieks: 'Junk! Buy more iron, man!' While Bhakcu simply chanted his holy verses through the storm."
              }
            ]
          }
        ]
      },
      {
        "s": "hat",
        "x": "哈特靠在街沿上，听着那伴随板球棒击打声的经文吟诵，敬佩地摇头：“巴库是个真正的圣人。老婆拿板球棒狠抽他，他却坐在那儿念《罗摩衍那》。整个特立尼达找不出第二个这么虔诚的男人。”",
        "en": "Hat leaned on the pavement curb, listening to the scripture punctuated by the crack of the bat, shaking his head in awe: 'Bhakcu is a real holy man. She beating him with a cricket bat and he just chanting the Ramayana. You won't find another man so holy in all Trinidad.'"
      },
      {
        "g": "dusk",
        "music": "calypso",
        "s": "narr",
        "x": "最终，巴库放下了扳手。他彻底抛弃了机械师的虚妄，在额头上抹了檀香灰，换上洁白的印度托蒂，成了一位受人尊敬的诵经庞迪特。有钱的印度人家出高价请他去主持婚礼与葬礼，只为听他用那副被机油熏过的洪亮嗓子念诵史诗。",
        "en": "In the end, Bhakcu laid down his wrenches. He shed the pretension of mechanics, smeared sacred sandalwood paste on his brow, donned a pure white dhoti, and became an esteemed Pandit. Wealthy Hindu families paid handsome fees for his chants at weddings and wakes, captivated by the booming voice once honed under motor chassis."
      },
      {
        "v": "memory",
        "lvl": 3,
        "x": "那辆黑色奥斯汀的锈铁壳依然搁在院角，发动机悬挂在芒果树上，被热带藤蔓慢慢吞噬。巴库从没修好过任何一台机器，但他却在金属的残骸与梵文的韵律里，修补好了自己在殖民地荒诞世道中的一生。",
        "en": "The rusted shell of the black Austin remained in the yard, its engine hanging in the mango tree, slowly swallowed by tropical creepers. Bhakcu never fixed a single engine, but between broken steel and Sanskrit meter, he patched together a flawless peace."
      }
    ]
  },
  {
    "id": "bolo",
    "no": "XIV",
    "title": "谨慎",
    "sub": "CAUTION",
    "hot": {
      "x": 55,
      "y": 38,
      "w": 9,
      "h": 32,
      "pin": [
        59.5,
        50
      ]
    },
    "tip": {
      "v": "nerve",
      "x": "理发椅上的偏执狂。博勒坚信全世界都是骗子，直到一张真正的中奖彩票被他撕碎。",
      "en": "Paranoia in the barber's chair. Bolo believed the entire universe was a fraud, until he tore up a fortune."
    },
    "tipAfter": {
      "v": "memory",
      "x": "他把彩票撕成雪片，冷笑着唾弃整个殖民地。他用最决绝的猜忌，守护着自己不被再次欺骗的尊严。",
      "en": "He shredded the sweepstake ticket into snow, defying the colony with ferocious, tragic cynicism."
    },
    "item": {
      "name": "一把磨损变薄的德国理发刮刀",
      "nameEn": "A Worn Solingen Straight Razor",
      "desc": "刀刃已经有些发钝，但博勒每天都要在牛皮荡刀布上来回刮擦数百遍。",
      "descEn": "Edge honed thin by Bolo, stropping it obsessively against oiled leather hundreds of times daily."
    },
    "note": "当一个被时代剥削得体无完肤的底层汉子不再相信任何希望，怀疑就成了他唯一的防护服。",
    "noteEn": "When an exploited man loses faith in all promises, rabid suspicion becomes his only armor against despair.",
    "steps": [
      {
        "bg": "bolo",
        "g": "day",
        "music": "calypso",
        "s": "narr",
        "x": "直到一九四七年，博勒才勉强相信战争已经结束。在那之前他总说：“那只是宣传，不过是用来愚弄黑人的谎言。”一九四七年，当美国兵开始拆除乔治五世公园里的兵营时，博勒一边给我剪发一边叹气，但他眼底依然闪烁着根深蒂固的怀疑。",
        "en": "It was not until 1947 that Bolo believed that the war was over. Up till then he used to say, 'Is only a lot of propaganda. Just a lot of lie to fool the black people.' In 1947, when the Americans began dismantling their barracks in King George V Park, Bolo trimmed my hair with a sigh, though deep suspicion lingered in his sunken eyes."
      },
      {
        "s": "narr",
        "x": "博勒活了六十岁，他从生活中总结出的唯一至理名言就是：绝不要相信报纸上的任何东西。他生来就是个悲伤的人，身材干瘦枯槁得像一块咸鳕鱼，嘴角耷拉，眉毛下垂，十一年间除了冷笑，我从未见他真正笑过。",
        "en": "Bolo was sixty, and the single truth he had distilled from life was: never believe a word printed in newspapers. He was built for sorrow, thin and dried like salted codfish, with sagging jowls and drooping brows; in eleven years, save for a contemptuous sneer, I never saw him smile."
      },
      {
        "s": "bolo",
        "x": "他曾是城里最成功的理发师，一手调教出了后来开豪车度假的名理发师塞缪尔。可博勒宁愿只在周日推着两轮小推车，坐在芒果树下的阴凉处给人理发：“我不相信我自己。当一个人坐在椅子上，你手里握着剃刀，心里又讨厌他时，什么可怕的事都干得出来。”",
        "en": "He had taught Samuel, now the wealthiest barber in town. Yet Bolo cut hair only on Sundays beneath the mango shade: 'Fact is, I don't trust myself. When a man sit in that chair, and you don't like him, and you got a razor in your hand, all kind of terrible things could happen.'"
      },
      {
        "g": "day",
        "music": "calypso",
        "s": "narr",
        "x": "战争初期，博勒也是最惊慌的人之一。他每天买全西班牙港仅有的三份报纸。后来《特立尼达卫报》举办了“失踪的球”竞猜游戏：报上印着激烈的足球赛照片，唯独把球抹去了，读者用红铅笔画‘X’标出球的位置，猜中者可赢巨额奖金。",
        "en": "Back in 1939, Bolo bought every paper in Port of Spain. Then the Trinidad Guardian launched the 'Missing the Ball' contest: football pictures printed with the ball painted out, offering cash to whoever marked an 'X' closest to the hidden sphere with a red pencil."
      },
      {
        "fx": "spot_ball",
        "tip": "在《特立尼达卫报》上寻找失踪的足球 / Mark the Missing Ball with red pencil"
      },
      {
        "thought": "spot_the_ball",
        "s": "narr",
        "x": "博勒为此着了魔。起初他每周寄一份，哈特打趣他中奖后会搬到圣克莱尔的大洋房，博勒冷冷地说他只想去美国。后来他寄两份、四份、六份，买了整沓坐标纸和圆规卡尺，却连一便士也没中过。他愤怒地摔了尺子：“全是骗局！办报纸的白人早就内定了分赃名单，专骗穷黑人的血汗钱！”《失踪的球与暴富梦》思潮在你脑海中萌发。",
        "en": "Bolo became possessed. At first he mailed one entry; Hat teased that he would buy a mansion in St. Clair, but Bolo sneered that he'd go to America. Soon he was sending two, four, six sheets, arming himself with graph paper and calipers, yet never won a penny. He flung the compass down: 'A giant racket! The white editors fixed the winners from day one just to rob poor black men!' The thought 'The Spot-the-Ball Mania' takes root."
      },
      {
        "choice": [
          {
            "label": "[租房受骗] 提及一九四三年科布伦茨大道的那桩租房惨案",
            "labelEn": "[Housing Fraud] Mention the 1943 Coblentz Avenue room rent swindle",
            "check": {
              "id": "bolo_swindle",
              "type": "white",
              "v": "empathy",
              "dc": 6,
              "modifiers": [
                { "text": "理解底层人的多疑创伤", "textEn": "Understanding scarred cynicism", "statGte": { "v": "empathy", "val": 3 }, "val": 1 }
              ]
            },
            "pass": [
              {
                "s": "bolo",
                "x": "博勒手里的剃刀微微发颤，脸色铁青：“那女人在报上登广告招租，收了我两个月预付租金整整六十块！等我推着行李上门，真正的房主却放狗来咬我！报纸白纸黑字印着啊！从那天起，印在纸上的字全他妈是毒药！”",
                "en": "Bolo's razor quivered in a white-knuckled grip: 'She advertised a room on Coblentz Avenue, took two months' advance—sixty hard dollars! When I arrived with my trunk, the real landlord sicced dogs on me! In black and white print! From that day on, printer's ink is pure poison!'"
              },
              {
                "v": "empathy",
                "lvl": 2,
                "x": "他的多疑不是疯癫，而是一个卑微穷人被屡屡剥皮后的本能防御。",
                "en": "His cynicism was no madness, but the scarred flesh of a pauper flayed too many times."
              }
            ],
            "fail": [
              {
                "s": "narr",
                "x": "博勒冷冰冰地别过脸去，手推车上的破铁皮被风吹得咔哒作响。任何提及往事的话语，只会引来他充满敌意的沉默。",
                "en": "Bolo turned his back in icy silence, the rusty sheet on his handcart rattling in the wind. Any reminder of the past met only hostile stonewalling."
              }
            ]
          }
        ]
      },
      {
        "s": "narr",
        "x": "他甚至曾绝望地打算偷渡去委内瑞拉。他把唯一的家当全送了人：推车送给埃多斯，油布送给我母亲。可一到码头就被水警以非法出境赶了回来。埃多斯把推车退给他，博勒却愤世嫉俗地念叨：“黑人就是这样，拿别人东西手快，还回去就心疼。”",
        "en": "He once planned to flee to Venezuela, giving away his few possessions: the handcart to Eddoes, linoleum to my mother. But water police turned him back at the pier for illegal passage. Eddoes returned the cart, and Bolo grumbled: 'Just like black people—swift to grab, bitter to return.'"
      },
      {
        "s": "narr",
        "x": "紧接着，博勒找上了我。他避开所有人，从兜里掏出一张皱巴巴的彩票：“你识字，孩子，你能替我保密吗？我买了一张彩票。等开奖了，你帮我看看中了没有。”整整三年，每个月我都替他悄悄核对号码，没有一次中奖。博勒每次都冷淡地吐一口唾沫：“正如我所料。”",
        "en": "Then Bolo came to me in secret, drawing a crumpled lottery ticket: 'You can read, boy. Can you keep a secret? I bought a sweepstake ticket. When the results come out, check it for me.' For three long years I checked the numbers every month; not once did he win. Bolo simply spat: 'Just as I expected.'"
      },
      {
        "g": "dusk",
        "music": "tense",
        "s": "narr",
        "x": "奇迹在一九四八年圣诞节前夕降临了！当我在《卫报》赛马彩票开奖版面反复核对后，我一路狂奔冲进博勒的木屋：“博勒先生！你中了！你中了整整三百块大奖！”",
        "en": "The miracle struck at Christmas, 1948! Staring at the Trinidad Turf Club sweepstake sheet, I sprinted straight to Bolo's shack: 'Mr. Bolo! You won! You won three hundred whole dollars!'"
      },
      {
        "s": "bolo",
        "x": "博勒非但没有狂喜，反而像被毒蛇咬了一口！他暴跳如雷，一把揪住我的衣领，唾沫星子喷在我脸上：“小杂种！你翅膀硬了敢来耍老子？我跟你说过多少次：绝不要相信报纸上的鬼话！那是政府的总督骗局！谁也别想把我当猴耍！”",
        "en": "Bolo didn't rejoice; he recoiled as if bitten by an adder! He seized my collar, spittle flying into my eyes: 'You little bastard! You get big enough to make sport of me? How many times I tell you: NEVER BELIEVE WHAT IN THE PAPERS! Is a governor's trap! Nobody makes a monkey out of Bolo!'"
      },
      {
        "s": "narr",
        "x": "当博伊在街角笑着向他祝贺时，博勒彻底发狂了。他认为整条街都在合谋嘲弄他。他拖出那辆两轮小推车，狠狠推到埃多斯门前，抄起一把锋利的砍刀，‘咔嚓咔嚓’将推车剁成了满地碎木屑！",
        "en": "When Boyee innocently called congratulations from the corner, Bolo went berserk, convinced the whole street was plotting his humiliation. He dragged his handcart to Eddoes' fence, snatched a razor-sharp cutlass, and hacked the wooden cart to splinters!"
      },
      {
        "s": "narr",
        "x": "随后，他当着惊呆的街坊的面，颤抖着掏出那张货真价实的中奖彩票，撕得粉碎，狠狠将碎纸片塞进我的衬衫口袋里：“人都以为我好愚弄！你们拿去分吧！拿去喂狗吧！”",
        "en": "Before our horrified eyes, he whipped out the genuine winning ticket, ripped it into tiny shreds, and jammed the confetti into my shirt pocket: 'People think they could fool me! Take it! Divide it among yourselves! Feed it to the dogs!'"
      },
      {
        "v": "memory",
        "lvl": 3,
        "x": "打那以后，博勒永远关上了他的百叶窗。他不再给人理发，不再同任何人说话，每月只在领取养老金的那一天拖着步子走出幽暗的木屋。米格尔街上最深重的悲剧，不是被骗，而是当真实的奇迹敲门时，你已经失去了相信它的勇气。",
        "en": "Thereafter, Bolo nailed his jalousies shut. He never cut hair again, spoke to no soul, venturing into the light only once a month to collect his pauper's pension. The bitterest tragedy of Miguel Street was not deceit, but that when grace finally knocked, a man had long murdered his own capacity to believe."
      }
    ]
  },
  {
    "id": "edward",
    "no": "XV",
    "title": "直到来了大兵",
    "sub": "UNTIL THE SOLDIERS CAME",
    "hot": {
      "x": 84.5,
      "y": 35,
      "w": 9,
      "h": 32,
      "pin": [
        89,
        48
      ]
    },
    "tip": {
      "v": "street",
      "x": "招牌画师的美国梦。爱德华用美式俚语和花衬衫包裹自己，直到美军撤离留下满地心碎。",
      "en": "The sign-painter's American dream. Edward draped himself in GI slang and floral shirts until heartbreak struck."
    },
    "tipAfter": {
      "v": "memory",
      "x": "画笔断了，女人跟美国水兵跑了。爱德华登上开往阿鲁巴炼油厂的货轮，永远告别了特立尼达。",
      "en": "The brushes broke; his bride fled with a sailor. Edward sailed for the Aruba refineries, leaving Trinidad forever."
    },
    "item": {
      "name": "一支沾满金粉的油漆画笔",
      "nameEn": "A Sign-Painter's Gilt Brush",
      "desc": "爱德华曾用它为美军俱乐部画满了妖娆的好莱坞女郎与星条旗。",
      "descEn": "Used by Edward to paint Hollywood pin-up girls and American eagles for GI officer clubs."
    },
    "note": "当一个殖民地青年彻底被异邦帝国的喧嚣与繁华俘虏，他所付出的代价，是整个故土根基的崩塌。",
    "noteEn": "When a colonial youth surrenders his soul to a foreign empire, the price is the total collapse of his heritage.",
    "steps": [
      {
        "bg": "edward",
        "g": "day",
        "music": "calypso",
        "s": "narr",
        "x": "爱德华是哈特的兄弟，多才又多艺。我刚认识他那会儿，他常帮哈特在牛棚干活，看上去沉稳又乐观。他说他再也不跟女人纠缠了，把精力全放在了板球、足球、拳击、赛马和斗鸡上。他总是崇拜地看着哈特：“哈特，你真是个天才。”",
        "en": "Edward, Hat's brother, was a man of many parts. When I first knew him, he helped Hat in the cowpen, contented and calm. He swore he was done with women, pouring his passions into cricket, football, boxing, horseracing, and fighting cocks. He looked at Hat in pure admiration: 'Hat, you is a genius.'"
      },
      {
        "s": "narr",
        "x": "爱德华是个极出色的招牌画师。他在白铁皮或雪松木板上画牛头、面包和裁缝剪刀，线条优美得像美术馆里的油画。哈特总自豪地向街坊吹嘘：“爱德华的手艺在全岛是数一数二的，要是生在英国，他早就是皇家画院的院士了。”",
        "en": "Edward was a gifted sign-painter. He painted bull heads, bakery loaves, and tailor's shears on tin and cedar with the precision of fine art. Hat bragged to everyone: 'Edward got genius in his fingers. If he was in England, he'd be in the Royal Academy by now.'"
      },
      {
        "s": "narr",
        "x": "紧接着，第二次世界大战打响了。美国人在查瓜拉马斯海湾修建了巨大的海军基地，成千上万腰缠美钞的美国大兵涌入了西班牙港。整个岛屿的节奏全乱了，到处是绿油油的美元、口香糖、吉普车和骆驼牌香烟。",
        "en": "Then came the war. The Americans built a colossal naval base at Chaguaramas, inundating Port of Spain with greenbacks, chewing gum, jeeps, and Lucky Strikes. The rhythm of the island fractured under a flood of American cash."
      },
      {
        "g": "day",
        "music": "calypso",
        "s": "narr",
        "x": "爱德华在美军基地找了一份油漆工的差事。不出三个月，那个温和质朴的招牌画师彻底消失了。爱德华换上了艳俗刺眼的夏威夷花衬衫，裤管改得极紧，嘴里嚼着口香糖，学会了用浓重的美国鼻音说话：“哟，伙计，最近咋样？算了吧，老兄！”",
        "en": "Edward got a painting job at the base. Within three months, the quiet craftsman vanished. Edward strutted in violent Hawaiian aloha shirts, peg-top trousers, chewing gum, drawling in a heavy Brooklyn twang: 'Yeah, buddy, what's cookin', pal? Forget it, jack!'"
      },
      {
        "choice": [
          {
            "label": "[画作审视] 走进爱德华的工作间，打量他那些风格突变的新作",
            "labelEn": "[Artistic Shift] Step into Edward's studio and inspect his Americanized canvases",
            "check": {
              "id": "edward_spitfire_dreams",
              "type": "white",
              "v": "imagine",
              "dc": 6,
              "modifiers": [
                { "text": "皇家画院与大洋彼岸的憧憬", "textEn": "Royal Academy & transatlantic longing", "statGte": { "v": "imagine", "val": 3 }, "val": 1 }
              ]
            },
            "pass": [
              {
                "thought": "raf_spitfire",
                "s": "edward",
                "x": "爱德华倚在美军军械箱上，吐着泡泡糖：“怎么样，小子？这才是现代艺术！白星条旗、展翅雄鹰、还有金发大胸脯的好莱坞宝贝！谁他妈还去画面包和肉铺招牌？但我心底真正想画的，是伦敦上空的喷火战斗机！”思潮《喷火战机与英格兰》在你脑海中萌发。",
                "en": "Edward lounged on an ammo crate, snapping his gum: 'How's that, kid? That's modern art! Stars and Stripes, bald eagles, and busty Hollywood blondes! But in my soul, what I truly want to paint is British Spitfires dogfighting over London!' The thought 'RAF Spitfire Dreams' takes root."
              },
              {
                "v": "imagine",
                "lvl": 2,
                "x": "殖民地的贫瘠土壤上，毫无防备的灵魂被异邦帝国的繁华消费主义轻易吞噬。",
                "en": "In colonial squalor, a naked soul was devoured whole by the neon glare of an imperial machine."
              }
            ],
            "fail": [
              {
                "s": "narr",
                "x": "画布上全是用油漆粗暴涂抹的金发女郎和美式口号。往日那些灵动的线条，变成了迎合美军军官粗俗品味的工业流水线行活。",
                "en": "The canvases were crude smears of blonde pinups and patriotic slogans. The delicate brushwork had degenerated into assembly-line kitsch for rowdy sailors."
              }
            ]
          }
        ]
      },
      {
        "s": "narr",
        "x": "爱德华赚到了大把美元。不久后，他带回了一个极其漂亮的浅肤色姑娘，宣称要迎娶她。哈特坐在台阶上冷眼旁观，神色复杂。爱德华挥金如土，在附近租了一栋体面的独立平房，买下全套崭新的红木家具、落地收音机和昂贵餐具，办了一场轰动街区的奢华美式婚礼。",
        "en": "Edward was flush with cash. Soon he brought home a dazzling, light-skinned girl, announcing their marriage. Hat sat on the pavement watching in troubled silence. Edward spared no expense, renting a detached cottage, buying mahogany furniture, a cabinet radio, fine chinaware, throwing a wedding that stunned the street."
      },
      {
        "s": "edward",
        "x": "婚后的爱德华像个大亨一样款待朋友。他给妻子买昂贵连衣裙、尼龙丝袜和金手镯。他骄傲地向哈特炫耀：“大兵们能给的，我爱德华全能给她！我们是特立尼达最幸福的一对。”",
        "en": "Married, Edward played the generous prince, buying his bride silk dresses, nylon stockings, and gold bangles. He boasted to Hat: 'Whatever a GI can give a woman, Edward gives better! We're the happiest pair on this island.'"
      },
      {
        "g": "dusk",
        "music": "tense",
        "s": "narr",
        "x": "可悲剧来得悄无声息。随着盟军在欧洲战场推进，驻扎的美军开始分批撤防回国。爱德华常常加班到深夜才回家。渐渐地，街坊们注意到，常有一辆挂着海军牌照的美军吉普车在爱德华家门前短暂停留。",
        "en": "The tragedy arrived without fanfare. As the war wound down in Europe, US troops prepared for withdrawal. Edward worked late shifts at the base; meanwhile, neighbors noticed an olive-drab Navy jeep lingering outside his cottage at odd hours."
      },
      {
        "s": "narr",
        "x": "终于，在某个暴雨如注的黄昏，爱德华提着工具箱推开家门。屋子里死一般寂静，甚至听不见冰箱的嗡鸣——客厅被彻底搬空了。收音机、银餐具、床单、窗帘、乃至挂在墙上的结婚相框全都不见了。他的新婚妻子跟着一个白人美国水兵私奔了。",
        "en": "On a sodden dusk, Edward pushed open his front door. The house was dead quiet. The parlour was gutted clean. The cabinet radio, silver forks, curtains, bedsheets, even the framed wedding portrait were gone. His bride had shipped out with a white American sailor."
      },
      {
        "s": "narr",
        "x": "哈特闻讯赶到时，爱德华只是呆坐在空无一物的木地板中央。他没有哭喊，没有砸东西，甚至没有骂一句脏话。他低头撕扯着身上那件浸透雨水的夏威夷衬衫，任由纽扣一颗颗蹦跳在冰冷的木板上。",
        "en": "When Hat arrived, Edward was sitting numb on the bare floorboards. No shouts, no tears, not a single curse. He merely clawed at the wet Hawaiian shirt, ripping buttons off one by one, watching them roll across the empty room."
      },
      {
        "s": "hat",
        "x": "哈特站在空荡荡的门槛边，眼圈发红，低声劝道：“算了吧，爱德华。大兵们带走了黄金，带走了女人，但他们带不走你的手艺。米格尔街还在呢。”",
        "en": "Hat stood in the doorway, eyes red, speaking low: 'Forget it, Edward. The soldiers come, they take the gold, they take the women. But they can't take your hands. Miguel Street is still here.'"
      },
      {
        "s": "narr",
        "x": "但爱德华回不来了。第二天拂晓，爱德华拎着一只破旧的旧手提箱，默默锁上了空屋的铁锁。他没有向街坊告别，只身登上了开往荷属阿鲁巴岛的货轮——去那里的荒凉炼油厂当一名不见天日的苦工。",
        "en": "But Edward was gone inside. At dawn he padlocked the empty shack with an old cardboard suitcase in hand. Without a farewell to the neighbours, he boarded a steamer for Aruba—to vanish into the searing glare of oil refineries."
      },
      {
        "v": "memory",
        "lvl": 3,
        "x": "战争结束了，美军基地被拆毁移平。大兵们丢下的口香糖包装纸被加勒比的海风吹得无影无踪，只在米格尔街的台阶上，留下了一群被抽空了灵魂与希望的年轻人。",
        "en": "The war ended, the bases were razed to dirt. Tropical breezes swept away the candy wrappers and cigarette butts, leaving behind on Miguel Street an exhausted generation with hollowed eyes."
      }
    ]
  },
  {
    "id": "hat",
    "no": "XVI",
    "title": "哈特",
    "sub": "HAT",
    "hot": {
      "x": 81.5,
      "y": 10,
      "w": 10.5,
      "h": 38,
      "pin": [
        87,
        24
      ]
    },
    "tip": {
      "v": "street",
      "x": "台阶上的哲人。男人们围聚在他身旁，从世界大战聊到板球与女人。",
      "en": "The street philosopher. The men gather around his front steps, debating cricket, war, and women."
    },
    "tipAfter": {
      "v": "memory",
      "x": "刑满出狱的哈特静静坐在台阶上。米格尔街的神圣时光，已随他的衰老而幻灭。",
      "en": "Released from prison, Hat sits quietly on the curb. The heroic age of Miguel Street has decayed."
    },
    "item": {
      "name": "一份折角泛黄的《特立尼达卫报》",
      "nameEn": "A Folded Trinidad Guardian",
      "desc": "板球比分那一栏，被哈特用铅笔狠狠圈了出来。",
      "descEn": "The West Indies cricket scores are heavily circled in blunt pencil."
    },
    "note": "童年时我以为，世界上最伟大体面的事，莫过于长大后成为人行道上那些高谈阔论的男人中的一个。",
    "noteEn": "As a child, I believed the grandest destiny was simply to grow up and sit on that pavement among them.",
    "steps": [
      {
        "bg": "hat",
        "g": "day",
        "music": "calypso",
        "s": "narr",
        "x": "哈特喜欢故弄玄虚，哪怕极小的事也是如此。就拿博伊和埃罗尔来说吧：他对生人说他们是他的私生子，有时又说他和爱德华曾同居过一个女人说不清生父是谁，有时又绘声绘色讲他们生母临终前在床头托孤的凄惨故事。你听了准会哭出来，可大家都知道那全是他编的。",
        "en": "Hat loved to make a mystery of the smallest things. Take Boyee and Errol: he told strangers they were his bastards, or that he and Edward had shared a woman, or spun tearful tales of their mother entrusting them on her deathbed. You'd weep hearing it, though everyone knew it was pure fiction."
      },
      {
        "s": "narr",
        "x": "哈特长得很像影星雷克斯·哈里森，深褐皮肤，罗圈腿，大平脚板。他从不上班，靠两头牛、房租和在赛马场、板球场下注为生。他是米格尔街的路沿之王，黄昏时男人们全聚在他身旁，听他挥舞着《卫报》裁决天下：从希特勒丘吉尔，到西印度群岛板球队的平均分。",
        "en": "Hat looked like Rex Harrison: dark brown skin, bow legs, and flat feet. He never held a job, living off two cows, rent, and turf wagers. He was the undisputed monarch of our pavement; at twilight the men gathered at his feet to hear him arbitrate the cosmos—from Churchill to West Indies cricket averages."
      },
      {
        "s": "narr",
        "x": "哈特养了一只极其温顺、甚至带着幽默感的阿尔萨斯狼狗，却又养了一群凶恶如泼妇的金刚鹦鹉，冷不防啄人的小腿。爱德华远走阿鲁巴后，哈特身上有些东西断了。他叹道：“所有人都长大了，然后甩头就走。”他开始频繁进出城里的地下夜店，寻找刺激。",
        "en": "Hat owned a gentle Alsatian with an absurd sense of humour, alongside squawking macaws that bit visitors' ankles. After Edward fled to Aruba, something broke in Hat. He sighed: 'Everybody get big, and everybody walk away.' He began haunting downtown clubs, chasing reckless kicks."
      },
      {
        "choice": [
          {
            "label": "[牛奶风波] 忆及哈特因牛奶掺水被法庭重罚两百元的滑稽官司",
            "labelEn": "[Watered Milk] Recall Hat's farcical trial and two-hundred-dollar fine for diluted milk",
            "check": {
              "v": "street",
              "dc": 6
            },
            "pass": [
              {
                "s": "hat",
                "x": "哈特气得扯开领带：“特立尼达的法律纯粹是狗屁！我把奶桶浸在水池里是为了降温，桶底有个小洞关我屁事？为了站在法庭听那个蠢法官训话，我还特意穿了西装打了领带！希特勒是对的，把所有法律书堆在大街上统统烧光！”",
                "en": "Hat loosened his collar in disgust: 'Trinidad law is pure nonsense! I soaked the milk churn in water to cool it down—how is a pinhole leak my fault? I bathed, put on a tie and polished shoes just to let an idiot judge scold me! Hitler was right: burn all the law books in a bonfire!'"
              },
              {
                "v": "street",
                "lvl": 2,
                "x": "街头哲人的尊严，在殖民地法庭荒诞冷酷的传票面前被剥得一干二净。",
                "en": "The street king's majesty looked utterly defenceless against the absurd summons of the magistrate."
              }
            ],
            "fail": [
              {
                "s": "narr",
                "x": "查尔斯警官提着两只大公鸡来替哈特说情，哈特却整整三个月没理他。在这个荒谬的街区，友谊往往比法律更难捉摸。",
                "en": "Sergeant Charles brought two fat cocks to make peace, yet Hat snubbed him for three unbroken months. In this strange quarter, camaraderie was far trickier than colonial statutes."
              }
            ]
          }
        ]
      },
      {
        "g": "dusk",
        "music": "calypso",
        "s": "narr",
        "x": "不久后，哈特带回了一个女人。她叫多莉，三十岁左右，微胖，皮肤浅褐，总穿着一身蓝衣服。她整天趴在百叶窗前茫然外望，从不和街坊搭话。男人们在街沿照常高谈阔论，哈特对多莉的催促置若罔闻，所有人都在假装一切都没改变。",
        "en": "Soon Hat brought home a woman named Dolly. Plump, light-brown, draped in perpetual blue. She leaned by the jalousies staring vacantly into the lane, speaking to no one. On the curb, the men babbled as always, Hat ignoring her calls, everyone pretending nothing had altered."
      },
      {
        "s": "narr",
        "x": "埃罗尔悄悄透露，哈特私下里对多莉言听计从，给她买了极昂贵的金项链和珠宝。埃多斯嘲讽地哼唱卡里普索小调：“马蒂尔达，你偷了我的钱跑去委内瑞拉！买珠宝！哈特这是老了、怕了，女人图他可不是图珠宝。”",
        "en": "Errol whispered that behind closed doors Hat obeyed Dolly's every whim, buying her costly bangles and necklaces. Eddoes sneered, singing the calypso: 'Matilda, she take me money and run Venezuela! Buying bangles! Hat is getting old and scared; women don't want old men for jewels.'"
      },
      {
        "g": "night",
        "music": "tense",
        "s": "narr",
        "x": "灾难骤然降临。多莉卷走了哈特买给她的全部金银珠宝，跟着另一个乡下男人逃跑了。哈特一路狂追，终于在乡下一间破木屋里撞破了两人。那个男人翻窗逃走，暴怒与羞辱撕碎了哈特的理智，他抓起一根铁棍狠狠砸了下去！",
        "en": "Disaster struck with violent suddenness. Dolly decamped with every bracelet and necklace, running off with a country fellow. Hat pursued them like a hound, cornering them in a rural shanty. The man plunged through a window, and blind fury overwhelmed Hat: he seized an iron bar and struck Dolly down!"
      },
      {
        "s": "narr",
        "x": "当天深夜，满脸泪痕的哈特跌跌撞撞走进警察局自首，号啕大哭：“我杀了一个女人。”多莉其实重伤未死。但消息传回米格尔街，如同晴天霹雳。电线杆下空无一人，板球赛停了，整个街区陷入了死一般的沉寂。",
        "en": "Late that night, weeping uncontrollably, Hat staggered into the police station: 'I kill a woman.' Dolly survived her injuries, yet the news struck Miguel Street like a thunderbolt. The lamp post was deserted, cricket died, and an eerie pall fell over the pavement."
      },
      {
        "s": "narr",
        "x": "在最高法院，哈特的辩护律师奇塔兰詹穿着那身发馊的旧棕色西装，滔滔不绝地背诵《威尼斯商人》里关于宽恕的说辞，大谈哈特为了爱抛弃自尊、宛如安东尼为了克利奥帕特拉放弃帝国。法官冷酷地敲击法槌：“奇塔兰詹先生，你讲得很有意思，但你在浪费法庭的时间。”哈特被判处四年苦役。",
        "en": "At the Supreme Court, lawyer Chittaranjan, draped in a smelly brown suit, rattled off Portia's speech on mercy, arguing Hat sacrificed his pride for passion like Antony renouncing an empire. The magistrate brought his gavel down: 'Mr. Chittaranjan, you are wasting the court's time.' Hat was sentenced to four years' hard labour."
      },
      {
        "s": "narr",
        "x": "我们去弗雷德里克街监狱探监。哈特穿着粗布囚服朝我们苦笑，随后被押往海岛上的卡雷拉监狱。三年里，每次我在库马纳角游泳，望着海湾对岸卡雷拉岛上的粉红房子，我都忍不住想：哈特在那边，我在这边，他知道我在想他吗？",
        "en": "We visited him at Frederick Street. In prison drab, Hat smiled faintly before his transfer to Carrera Island. For three years, swimming off Carenage, I stared across the green gulf at the pink cellblocks of Carrera, wondering: Hat is over there; does he know I am thinking of him?"
      },
      {
        "g": "dusk",
        "music": "sad",
        "s": "narr",
        "x": "三年后，哈特出狱归来。他头发全白了，身形消瘦佝偻，往日那种街头君王的锐气荡然无存。他挨家挨户走访街坊，像个落魄的说客一样吹嘘自己在牢里如何买通看守当上图书管理员：“那儿的图书馆藏书多极了，全是深奥大书，霍伊特老师准会乐疯！”",
        "en": "Three years later, Hat returned. His hair was snow-white, shoulders stooped, the swagger of the pavement king shattered. He drifted from door to door, bragging weakly about bribing guards to become prison librarian: 'Books upon books, boy! Heavy scholarship Titus Hoyt would die for!'"
      },
      {
        "s": "me",
        "x": "母亲给他端来红茶。我从口袋里掏出一支香烟递给他。哈特愣愣地接过去，忽然惊呼：“啊呀！你什么时候抽上烟了？我走的时候你还是个穿短裤的娃儿呢！”我平静地笑笑：“是的，哈特，我早就在海关上班了。”",
        "en": "Mother poured him tea. I pulled a cigarette from my pocket and offered it. Hat froze, staring: 'Good God! You smoking now? When I left you was just a little boy in shorts!' I smiled flatly: 'Yes, Hat. I work at Customs now.'"
      },
      {
        "v": "memory",
        "lvl": 3,
        "x": "曾经在少年时代，我认为世上最伟大的出路就是坐在这条街沿上和哈特高谈阔论；可现在，霍伊特显得庸俗，埃多斯显得猥琐，哈特变得苍老。自从哈特进了监狱，有一部分的我也随着死去了。",
        "en": "In my boyhood, I thought sitting on that curb with Hat was the grandest station in life; now Titus Hoyt seemed petty, Eddoes stunted, Hat broken. When Hat went to jail, part of me died."
      }
    ]
  }
];

/* ================================================== XVII. 终章：离开米格尔街 */
const FINALE = {
  "id": "finale",
  "no": "XVII",
  "title": "告别米格尔街",
  "sub": "HOW I LEFT MIGUEL STREET",
  "hot": {
    "x": 92,
    "y": 15,
    "w": 8,
    "h": 80,
    "pin": [
      96,
      50
    ]
  },
  "tip": {
    "v": "memory",
    "x": "皮亚科机场的漫长跑道。一架飞往伦敦的客机，带走一个不再回头的青年。",
    "en": "The tarmac of Piarco airport. A plane bound for London, carrying a youth who will not look back."
  },
  "steps": [
    {
      "bg": "finale",
      "g": "night",
      "music": "calypso",
      "s": "narr",
      "x": "我是在海关当临时办事员的时候学会喝酒的。在那儿，我们总能找出各种各样的理由把走私酒扣下来。起初我一闻到烈酒就恶心，但我对自己说：“必须熬过这一关，把它当药喝，捂上鼻子闭上眼睛。”这一招真奏效，很快我喝起朗姆酒来就像鱼喝水一样，成了个老练的酒徒。",
      "en": "I learned to drink when I was working at Customs. We confiscated rum on every pretext. At first raw puncheon turned my stomach, but I told myself: 'You must get through this. Take it like medicine—pinch your nostrils and shut your eyes.' It worked. Soon I drank like a fish, bearing the grim pride of a seasoned boozer."
    },
    {
      "s": "narr",
      "x": "博伊和埃罗尔带我见识了城里的地下俱乐部。在海滨广场附近的二楼小房间里，绿色的电灯光浓稠得像热带番石榴果冻，四处站着浓妆艳抹的女人，墙上却挂着‘严禁粗话’的滑稽木牌。我们带着朗姆酒在马拉加斯海湾通宵狂欢，直到一次大醉了整整两天两夜，吐得翻江倒海。",
      "en": "Boy and Errol introduced me to downtown night clubs. In upstairs rooms off Marine Square, green electric bulbs cast light thick as guava jelly over painted women in the shadows, beside a wooden placard declaring: NO SWEARING. We caroused with rum at Maracas Bay until a two-day binge left me puking my guts out on the floorboards."
    },
    {
      "s": "mother",
      "x": "母亲静静看着我，神情里没有往日的责骂，只有一种深深的忧惧：“你在这个地方变得太野了。再待下去，你迟早要进监狱。我想你该离开特立尼达了。”",
      "en": "My mother watched me in silence. No fury, no scolding—only profound, weary dread: 'You are getting too wild in this place. Stay here, and Carrera prison will swallow you. You must leave Trinidad.'"
    },
    {
      "s": "me",
      "x": "“去哪儿？委内瑞拉吗？”",
      "en": "'Where? Venezuela?'"
    },
    {
      "s": "mother",
      "x": "“不，委内瑞拉不行。我知道委内瑞拉，像你这号野小子一上岸就会被扔进大牢。下星期你跟我去拜访格涅沙·庞迪特。他是你父亲生前的朋友，现在在政府里当大部长呢。”",
      "en": "'No, not Venezuela. A wild boy like you would be clapped in irons the minute you stepped off the boat. Next week you are coming with me to see Pandit Ganesh. He was your father's friend, and now he sits as a powerful government minister.'"
    },
    {
      "g": "day",
      "music": "sad",
      "s": "narr",
      "x": "我们来到圣克莱尔大道格涅沙·庞迪特的气派官邸。当年那个在乡下缠着头巾、靠通灵推拿为生的江湖术士彻底不见了。眼前的格涅沙穿戴着昂贵挺括的英式三件套羊毛西装，手腕上戴着金表，据说正在积极角逐英王授予的大英帝国勋章（MBE）。",
      "en": "We visited Pandit Ganesh's grand residence on St. Clair Avenue. The country masseur who wore turbans was gone. Ganesh was draped in a bespoke three-piece English wool suit, gold watch gleaming, actively campaigning for an MBE from the Crown."
    },
    {
      "s": "ganesh",
      "x": "格涅沙热情地接待了母亲，微笑着问我：“有什么事尽管开口。你想到大英帝国留学学点什么呢？”我直截了当地回答：“我什么也不想学。我只想离开特立尼达，就这样。”",
      "en": "Ganesh welcomed mother warmly, turning to me with an expansive smile: 'Speak freely. What would you like to study in London?' I blurted: 'I don't want to study anything. I just want to leave here, that's all.'"
    },
    {
      "s": "ganesh",
      "x": "格涅沙哈哈大笑起来：“政府可不提供这种奖学金！只有我们当部长的才能这么做。不行，你必须挂个专业名头。工程学？法律？”我摇摇头，想起巴库永远拆碎的零件和奇塔兰詹发馊的棕色西装。格涅沙叹口气：“那只剩下药剂学了。”",
      "en": "Ganesh roared with laughter: 'The colonial government does not grant escape scholarships! Only cabinet ministers can do that. You must choose a subject. Engineering? Law?' I shuddered, remembering Bhakcu's ruined pistons and Chittaranjan's smelly suit. Ganesh sighed: 'Only pharmacy is left.'"
    },
    {
      "s": "me",
      "x": "“我可不想穿着白大褂向女人推销口红。”",
      "en": "'I don't want to wear a white coat selling lipstick to women.'"
    },
    {
      "s": "ganesh",
      "x": "格涅沙拍了拍我的肩膀，眼神里透出一丝历经世事的狡黠诱惑：“孩子，考虑一下吧。只要你学药剂学，你就能去伦敦！你能亲眼看见冬天的白雪，看见泰晤士河的倒影，看见大英帝国的国会大厦钟楼！”",
      "en": "Ganesh clapped my shoulder with worldly seduction: 'Think it over, son. Accept pharmacy, and you sail for London! You will see winter snow, the gray Thames, and Big Ben rising above the Parliament!'"
    },
    {
      "s": "narr",
      "x": "那一刻，我屈服了：“好吧，我就去学药剂学。”母亲激动得泪如雨下。她从怀里掏出积攒了半辈子的两百块美金塞到格涅沙手里。格涅沙满脸同情，两人相对抹泪，最后这位部长悄悄把一百块钱推回给母亲：“拿回去吧，孤儿寡母的不容易。”",
      "en": "I yielded: 'All right. I'll study pharmacy.' Mother burst into tears of gratitude, counting out two hundred dollars—her life's savings. Ganesh looked genuinely moved; both wept together, until the minister gently pressed a hundred dollars back: 'Keep it. A widow has enough burdens.'"
    },
    {
      "g": "dusk",
      "music": "calypso",
      "s": "narr",
      "x": "临行前夜，母亲在木屋里办了一场小型聚会。那场面悲伤得宛如一场葬礼上的守灵：劳拉亲吻了我的脸颊，把一枚圣克里斯托弗大勋章塞进我口袋；霍伊特老师送了我一套普及版丁尼生诗选；埃多斯送了一只崭新的皮夹；而哈特递给我一包香烟：“听说你戒了，拿着吧，说不定你会改变主意。”结果那一夜，我又重新抽上了烟。",
      "en": "On the farewell eve, mother held a small gathering like a funeral wake. Laura kissed my cheek, slipping a heavy St. Christopher medal into my pocket; Titus Hoyt presented Tennyson's Poems; Eddoes gave a crisp wallet; Hat handed me cigarettes: 'Heard you quit, but take them; you might change your mind.' That night, I smoked again."
    },
    {
      "s": "narr",
      "x": "第二天清晨，巴库叔叔为了送我去机场，躺在车底整整修了四个小时发动机，嘴里吹着《罗摩衍那》的梵文对句。十点钟，汽车终于奇迹般地点着了火。就在我跨出家门的那一瞬间，母亲神色庄重地把一个装满鲜牛奶的四英寸铜壶放在了门槛正中间。",
      "en": "At dawn, Uncle Bhakcu crawled under the Austin for four hours, whistling couplets from the Ramayana. By ten, the motor miraculously sparked. Just as I stepped toward the sun, mother set a brass pitcher of sweet milk squarely in the center of the doorway."
    },
    {
      "choice": [
        {
          "label": "[命运的失足] 侧身跨出门槛，却在无意间踢翻了那只铜壶",
          "labelEn": "[The Omen] Squeeze past the doorpost, accidentally kicking the pitcher",
          "then": [
            {
              "thought": "broom_and_pitcher",
              "damage": { "amount": 1, "reason": "铜牛奶壶打翻在门槛上，母亲绝望的眼泪" },
              "s": "narr",
              "x": "门框很宽，我明明贴着门边走，可不知为什么，脚尖还是‘哐当’一声碰翻了铜壶！白花花的鲜牛奶泼洒在灰黑色的地板缝隙里。母亲的脸色瞬间惨白，泪水再次涌出：“这是不祥之兆……我知道，我再也不会在米格尔街上看到你了。”《扫帚与泼翻的牛奶》思潮在你脑海中萌发。",
              "en": "The doorway was wide, yet my shoe clipped the brass rim with a sharp clang! White milk surged across the dark floorboards. Mother's face froze in dread, fresh tears spilling: 'An ill omen... I know it now: I will never see you walk down Miguel Street again.' The thought 'The Broom and Spilled Milk' takes root."
            },
            {
              "v": "memory",
              "lvl": 3,
              "x": "那一滩打翻的牛奶，宛如一道不可跨越的鸿沟，将童年与故土永久隔绝在身后。",
              "en": "That pool of spilled milk became an uncrossable boundary, severing youth and home forever."
            }
          ]
        }
      ]
    },
    {
      "g": "day",
      "music": "tense",
      "s": "narr",
      "x": "巴库叔叔的破车载着我们一路颠簸到了皮亚科机场。然而候机厅的大喇叭突然用西班牙语和英语广播：206次国际航班因故延误整整六个小时！我心头猛地一颤，对母亲说：“走吧，我们先回米格尔街吃午饭。”",
      "en": "Bhakcu's clattering van rattled us to Piarco Airport. But the lounge speaker crackled in Spanish and English: Flight 206 delayed six hours! My heart thumped: 'Let's go back to Miguel Street for lunch.'"
    },
    {
      "s": "narr",
      "x": "汽车开回米格尔街，我最先看见的就是哈特。他正拖着罗圈腿的步子从拐角咖啡馆慢悠悠走回来，胳膊下夹着一份刚印好的《卫报》。我探出车窗冲他大声招手，哈特只是冷淡而平淡地吐出一句：“我以为你这时已经在天上了呢。”",
      "en": "Back on Miguel Street, the first soul I saw was Hat, strolling flat-footedly from the corner café with the Guardian under his arm. I leaned out the window, waving frantically. Hat merely remarked with flat indifference: 'I thought you was in the air by this time.'"
    },
    {
      "damage": { "amount": 1, "reason": "哈特漫不经心的平淡：‘我以为你这时已经在天上了呢’" },
      "v": "street",
      "lvl": 3,
      "x": "一股彻骨的冰凉浇透了我的心。我曾以为我的离去会撕开街区的缺口；可现实是，米格尔街的生活照常运转，阳光依然炙热，男人们依然无所事事。我的离开对这片土地微不足道。",
      "en": "A chilling clarity pierced my chest. I had thought my departure would leave a gaping void; but Miguel Street rolled on as it always had. The sun beat down, the men sat idle. My disappearance changed nothing under the sky."
    },
    {
      "g": "dawn",
      "music": "sad",
      "s": "narr",
      "x": "黄昏时分，我们再次回到了皮亚科机场。海关官员是我当年的熟人，他甚至没有打开我的手提箱。我和母亲紧紧拥抱，巴库太太抹着泪水。",
      "en": "At dusk, we returned to Piarco. The customs inspector was an old comrade from my office; he chalked my suitcase without opening the clasps. I embraced my mother; Mrs. Bhakcu dabbed her eyes."
    },
    {
      "s": "me",
      "x": "我转过身对巴库叔叔轻声说：“巴库叔叔，我本来不想告诉你的，但我好像听见你车子的气门挺杆在敲击响动呢。”巴库那双浑浊的大眼睛猛然绽放出狂喜的神采。在这个离别的瞬间，他又变回了那个单纯快乐的少年。",
      "en": "I turned to Uncle Bhakcu, whispering: 'Uncle Bhak, I didn't want to tell you, but I think I hear your valve tappets knocking.' Bhakcu's weary eyes flashed with sudden, childish wonder. In that fleeting farewell, he was once again the mechanical dreamer of the yard."
    },
    {
      "fx": "walk",
      "tip": "走向跑道中央的客机 / Walk forward onto the tarmac"
    },
    {
      "choice": [
        {
          "label": "[终极红检定 · 永恒的观察者] 绝不回头，注视跑道晨曦下拉长的小矮人影子",
          "labelEn": "[Ultimate Red Check · The Chronicler] Do not look back; look only at your shadow on the runway",
          "check": {
            "id": "finale_dwarf_red",
            "type": "red",
            "v": "memory",
            "dc": 7,
            "modifiers": [
              { "text": "收集了米格尔街邻居们的全部灵魂碎片", "textEn": "All 16 Miguel Street soul fragments gathered", "statGte": { "v": "memory", "val": 3 }, "val": 2 },
              { "text": "超然与离别的心灵铠甲", "textEn": "Detached poetic armor", "statGte": { "v": "nerve", "val": 3 }, "val": 1 }
            ]
          },
          "pass": [
            {
              "thought": "dancing_dwarf",
              "s": "narr",
              "x": "广播里冷漠的女声催促着最后的登机。我转过身，快步穿过皮亚科机场空旷冰冷的柏油停机坪走向飞机。我没有回头，只看着前面自己的影子——一个在加勒比海热带晨曦下跳跃着的小矮人。那一刻，你不再是流落殖民地的受害者，你成为了这条街永恒的记录者与小说家。",
              "en": "The cool, detached loudspeaker announced the final boarding call. I turned away and walked briskly across the tarmac toward the plane. I did not look back. I looked only at my shadow before me, which was like a dancing dwarf upon the runway. You were no longer a helpless victim; you had become the immortal chronicler."
            }
          ],
          "fail": [
            {
              "s": "narr",
              "x": "广播里冷漠的女声催促着最后的登机。我转过身，快步穿过皮亚科机场空旷冰冷的柏油停机坪走向飞机。我忍不住最后回望了一眼那片在晨光中泛着热浪的特立尼达群山，泪水终于不可遏止地模糊了双眼。",
              "en": "The cool, detached loudspeaker announced the final boarding call. I turned away and walked across the tarmac toward the plane. I could not resist looking back one final time at the heat shimmering over the northern range, tears finally blinding my vision."
            }
          ]
        }
      ]
    }
  ]
};

/* ================================================== 街头漫游彩蛋与互动遭遇 */
const STREET_ENCOUNTERS = [
  {
    id: 'bhakcu',
    name: '巴库叔叔的破汽车', sub: 'XIII · BHAKCU\'S CAR',
    x: 65.5, y: 71,
    voice: 'imagine',
    text: '一辆永远拆开机盖的奥斯汀旧底盘。巴库叔叔一边用扳手敲打零件，一边高声诵念《罗摩衍那》。',
    textEn: 'An Austin car chassis with its bonnet permanently open. Uncle Bhakcu tinkers with a spanner while chanting Hindu epics.',
    interact: {
      s: 'narr',
      x: '巴库叔叔认为自己是机械奇才，尽管这辆车从没有哪怕一米能自己发动走动过。',
      en: 'Uncle Bhakcu considers himself a mechanical genius, though the car has never moved an inch under its own power.'
    }
  },
  {
    id: 'dog',
    name: '哈特台阶旁的流浪狗', sub: 'THE STREET MONGREL',
    x: 88.5, y: 75,
    voice: 'empathy',
    text: '一只瘦骨嶙峋的黄毛流浪狗，缩在哈特家台阶下的阴影里吐着舌头。它也是米格尔街的老街坊了。',
    textEn: 'A skinny yellow mongrel sleeping in the shade of Hat\'s pavement steps. A permanent citizen of Miguel Street.',
    interact: {
      s: 'narr',
      x: '你伸手轻轻抚摸了一下它的脑门。它抬起疲惫的眼皮看了你一眼，又放心地闭上了眼。',
      en: 'You pat its dusty head. It opens one weary, affectionate eye and goes back to sleep.'
    }
  }
];

/* 漫步街头时的内心低语光球（接近特定坐标触发） */
const THOUGHT_ORBS = [
  { atX: 7, voice: 'street', text: '“裁缝”的虚伪招牌', textEn: 'The Lying Tailor Sign',
    x: '一块招牌，一张纸牌。鲍嘉用这两样东西抵挡了整整二十年的虚无。',
    en: 'A sign and a deck of cards. Bogart used both to keep twenty years of void at bay.' },
  { atX: 22, voice: 'imagine', text: '没有名字的东西', textEn: 'The Thing Without a Name',
    x: '阳光透过芒果树叶，照在刨花上。这是米格尔街上唯一没有被标上价码的奇迹。',
    en: 'Sunlight filtering through mango leaves onto sawdust curls. The only unpriced miracle on this street.' },
  { atX: 37, voice: 'nerve', text: '沥青路上的先知', textEn: 'The Prophet on the Pitch',
    x: '曼曼的粉笔在马路上磨出了白灰。一个人到底要疯到什么地步，才敢在这条街上自称救世主？',
    en: 'Man-man\'s chalk wearing thin on the pitch. How mad must a man be to claim divinity on Miguel Street?' },
  { atX: 50, voice: 'empathy', text: '粉红百叶窗后的重击', textEn: 'Behind the Pink Shutters',
    x: '粉红色的木板隔绝了外面的阳光，也锁死了屋里的哀鸣。暴力是乔治唯一的语言。',
    en: 'Pink boards shutting out the tropical glare, sealing in the screams. Violence was George\'s only grammar.' },
  { atX: 63, voice: 'imagine', text: '硝烟与大笑', textEn: 'Soot and Laughter',
    x: '空气中依然残留着火药的微辛气味。摩根一生只想让人笑，而生活只把他当成了玩笑。',
    en: 'A faint whiff of sulphur lingers in the air. Morgan wanted men to laugh; life made him the joke.' },
  { atX: 74, voice: 'empathy', text: '风中的八色童衣', textEn: 'Eight Children in the Wind',
    x: '劳拉的粗话在风里回荡。那是用泼辣和凶悍铸就的一面盾牌，用来抵挡这个残酷的世界。',
    en: 'Laura\'s fierce shouts echo across the picket fence. A shield of vulgarity forged against a cruel world.' },
  { atX: 78, voice: 'street', text: '马车夫与文法书', textEn: 'The Cart and the Grammar Book',
    x: '伊莱亚斯挥动着皮鞭，车斗里装着一城的垃圾，脑海里却回荡着大英帝国的考卷。',
    en: 'Elias swinging his whip over council rubbish, with the Queen\'s English grammar still echoing in his mind.' },
  { atX: 87, voice: 'street', text: '男人们的台阶', textEn: 'The Men on the Pavement',
    x: '《特立尼达卫报》在男人们膝头翻动。只要坐在台阶上，他们就拥有整个世界的裁判权。',
    en: 'The Trinidad Guardian rustles on calloused knees. On this step, they ruled the universe.' },
];