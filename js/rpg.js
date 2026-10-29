/* ==========================================================
   米格尔街 · 极乐迪斯科 RPG 核心机制引擎 (js/rpg.js)
   - 思维内阁 (The Thought Cabinet): 10大原著文学思潮、研究进度、临时惩罚、永久质变
   - 士气与心力系统 (Morale & Volition): 心理创伤扣除、绝望倒计时危机、加勒比风物平复
   - 白检定与红检定 (White Checks & Red Checks): 白检定失败锁定与升级/线索解锁、红检定绝路决断
   - 情境修正值账本 (Check Modifiers Ledger): 动态计算原著经历、思维加成、心理状态
   - 顿悟与内心加点 (Insight & Voice Level-up): 升级5大核心特质、实时重新激活白检定
   ========================================================== */

const RPG = (() => {
  // 10 大植根于奈保尔《米格尔街》原著哲学的大脑思维 (Thoughts)
  const THOUGHTS = {
    unnamed_object: {
      id: 'unnamed_object',
      name: '未完成的物件',
      nameEn: 'The Thing Without a Name',
      icon: '🔨',
      source: '波普的木工房',
      sourceEn: "Popo's Workshop",
      time: 12, // 需要推进的对白/交互步数
      desc: '波普总在刨花堆里打造那件没有名字的东西。外人说那是疯狂，但在米格尔街，只有没有用处、没有名字的东西才最纯粹。',
      descEn: 'Popo is always hammering a thing without a name. Outsiders call it madness; on Miguel Street, only useless things are pure.',
      temp: '满脑子琢磨没用的木雕：【街头智慧】-1，【想象力】+1',
      tempEn: 'Distracted by useless carpentry: -1 Street Smarts, +1 Imagination',
      tempStats: { street: -1, imagine: 1 },
      solution: '理解了失败之美与纯粹劳作的尊严。所有工匠与劳作检定获得 +2 修正；面对挫折时士气免受任何伤害；解锁【无名之物的纯粹】对白。',
      solutionEn: 'Dignity in pure craft. +2 to all craft/labor checks; immune to morale loss on failures; unlocks [Purity of the Nameless] choices.',
      bonusStats: { imagine: 1 },
      modifierDesc: '思维《未完成的物件》: 领悟了纯粹造物的超脱'
    },
    bogart_pose: {
      id: 'bogart_pose',
      name: '假装鲍嘉',
      nameEn: "Bogart's Pose",
      icon: '🚬',
      source: '鲍嘉的裁缝门槛',
      sourceEn: "Bogart's Doorstep",
      time: 14,
      desc: '世界上最省力的体面就是闭嘴。只要嘴里叼着香烟、眯起眼睛看人，无论对方说什么只从喉咙深处“哼”一声，就没人知道你在害怕什么。',
      descEn: 'The cheapest dignity is silence. Squint with a cigarette, grunt softly, and no one will ever know you are terrified.',
      temp: '面部僵硬、拒绝交流：【同情能力】-1，【胆量】+1',
      tempEn: 'Stiff face and curt grunts: -1 Empathy, +1 Nerve',
      tempStats: { empathy: -1, nerve: 1 },
      solution: '获得好莱坞黑色电影般的冷硬气场。红检定即使失败也不会被对方看轻；所有面对威胁与威压的检定 +2；解锁【硬汉沉默】选项。',
      solutionEn: 'Hollywood noir composure. Never humiliated on Red Check failures; +2 vs threats; unlocks [Tough Guy Silence].',
      bonusStats: { nerve: 1 },
      modifierDesc: '思维《假装鲍嘉》: 冷酷不苟言笑的硬汉气场'
    },
    spot_the_ball: {
      id: 'spot_the_ball',
      name: '失踪的球与暴富梦',
      nameEn: 'The Spot-the-Ball Mania',
      icon: '📰',
      source: '特立尼达卫报与博勒',
      sourceEn: 'Trinidad Guardian & Bolo',
      time: 10,
      desc: '报纸上那张把足球擦掉的赛场照片是西班牙港最狂热的宗教。每个人都用红铅笔画叉，相信自己的铅笔尖能戳中改变命运的头奖。',
      descEn: 'The blurred newspaper photo without the ball is Port of Spain\'s religion. Everyone marks an X, betting their life on pencil lead.',
      temp: '满脑子红铅笔和头条暴富梦：【记忆】-1，【街头智慧】+1',
      tempEn: 'Obsessed with red pencils and lotteries: -1 Memory, +1 Street Smarts',
      tempStats: { memory: -1, street: 1 },
      solution: '洞悉底层加勒比人的博彩执念与虚幻现实。所有金钱交易、打赌与欺诈检定 +3 修正；博勒撕报纸章节解锁特殊选项。',
      solutionEn: 'Sees through colonial lottery illusions. +3 to money, betting, and deception checks; unlocks special Bolo interactions.',
      bonusStats: { street: 1 },
      modifierDesc: '思维《失踪的球》: 谙熟底层博彩幻想与欺诈陷阱'
    },
    quarter_of_four_cents: {
      id: 'quarter_of_four_cents',
      name: '四便士的四分之一',
      nameEn: 'A Quarter of Four Cents',
      icon: '🌸',
      source: 'B.华兹华斯的芒果树下',
      sourceEn: "Under B. Wordsworth's Mango Tree",
      time: 16,
      desc: '世界上最伟大的十四行诗一个月只写一句。他用四便士买下一整座院子里的清风与黄昏，教你倾听蜜蜂交谈，教你仰望星空并为自己的存在而哭泣。',
      descEn: 'The greatest poem in the world grows by one line a month. He bought the wind for four cents, teaching you to weep at stars.',
      temp: '多愁善感、容易心碎：【胆量】-1，【同情能力】+2',
      tempEn: 'Vulnerable and tearful: -1 Nerve, +2 Empathy',
      tempStats: { nerve: -1, empathy: 2 },
      solution: '你获得了一颗真正的诗人灵魂。士气上限永久 +2；所有自然、艺术、离别检定大成功几率翻倍；在结局获得【诗人的告别】。',
      solutionEn: 'A true poet\'s soul. Max Morale permanently +2; doubles critical success on nature/art/farewell checks; unlocks [Poet\'s Farewell].',
      bonusStats: { empathy: 1 },
      modifierDesc: '思维《四便士的四分之一》: 诗性共情与世界的深邃'
    },
    raf_spitfire: {
      id: 'raf_spitfire',
      name: '喷火战机与英格兰',
      nameEn: 'RAF Spitfire Dreams',
      icon: '✈️',
      source: '爱德华的美军涂鸦',
      sourceEn: "Edward's Yankee Doodles",
      time: 12,
      desc: '美军基地带来了可口可乐和尼龙丝袜，但爱德华只想去伦敦驾驶皇家空军的战斗机。加勒比海的潮水拍打着殖民地，每个人都想跨越大洋。',
      descEn: 'Yankee bases brought Coca-Cola, but Edward dreamed of British Spitfires over London. The ocean always whispered of flight.',
      temp: '目光总望着天际线：【街头智慧】-1，【记忆】+1',
      tempEn: 'Eyes glued to the distant clouds: -1 Street Smarts, +1 Memory',
      tempStats: { street: -1, memory: 1 },
      solution: '跨越大洋的从容与抱负。面对白人官僚、英国留学校长、海关审查官时检定 +2；终章争取伦敦奖学金获得决定性说服力。',
      solutionEn: 'Oceanic ambition. +2 vs colonial officials, British tutors, customs officers; decisive advantage in scholarship negotiations.',
      bonusStats: { memory: 1 },
      modifierDesc: '思维《喷火战机与英格兰》: 宗主国眼界与跨洋渴望'
    },
    garbage_aristocracy: {
      id: 'garbage_aristocracy',
      name: '垃圾堆里的贵族',
      nameEn: 'The Sanitation Aristocracy',
      icon: '🗑️',
      source: '埃多斯的清洁手推车',
      sourceEn: "Eddoes' Cart",
      time: 10,
      desc: '埃多斯穿得像个总督去开垃圾车。他说美国大兵随手扔在垃圾桶里的半瓶威士忌、镀金钢笔和破手表，比总督府的客厅还体面。',
      descEn: 'Eddoes drove his cart like a viceroy. He knew Yankee garbage held gold pens, half-bottles of rum, and aristocratic castaways.',
      temp: '对路边杂物充满好奇：暂无属性惩罚',
      tempEn: 'Fascinated by junk heaps: No stat penalties',
      tempStats: {},
      solution: '发现被遗弃之物的价值。在街道探索中可搜寻到隐藏补给品（芒果干、薄荷硬糖）；士气自愈速度提升。',
      solutionEn: 'Finds value in discard. Scavenges provisions on the street (Dried Mango, Peppermint drops); faster morale recovery.',
      bonusStats: { street: 1 },
      modifierDesc: '思维《垃圾堆里的贵族》: 识货眼光与废物美学'
    },
    paradox_of_tears: {
      id: 'paradox_of_tears',
      name: '大脚的眼泪悖论',
      nameEn: 'The Paradox of Tears',
      icon: '🥊',
      source: '大脚比佛的拳击台',
      sourceEn: "Big Foot's Boxing Ring",
      time: 12,
      desc: '全西班牙港最凶残可怖的巨汉拳击手，居然会在黑暗中因为踩到一只跛脚小黄狗而嚎啕大哭。暴力往往只是极度脆弱的假面具。',
      descEn: 'The fiercest boxer wept like a toddler in the dark over a limping stray dog. Violence is just a brittle mask for terror.',
      temp: '怀疑强者的力量：暂无属性惩罚',
      tempEn: 'Questioning strength: No stat penalties',
      tempStats: {},
      solution: '洞察暴力的本质。面对任何身体恐吓、恶霸威压或成人暴力时，绝对免疫一切士气伤害；【胆量】对抗检定 +3 修正。',
      solutionEn: 'Dissects the myth of violence. Complete immunity to morale damage from bullying or intimidation; +3 to Nerve confrontational checks.',
      bonusStats: { nerve: 1 },
      modifierDesc: '思维《大脚的眼泪悖论》: 识破狂暴外壳下的恐惧'
    },
    street_messiah: {
      id: 'street_messiah',
      name: '受洗的疯子救世主',
      nameEn: 'The Backyard Messiah',
      icon: '⛪',
      source: '曼曼的石子受难日',
      sourceEn: "Man-man's Crucifixion",
      time: 14,
      desc: '曼曼把自己绑在木架上自称耶稣，让信徒用石子洗涤他的罪。直到有人扔来一块拳头大的真石头，他暴跳如雷喊着要下十字架杀人。',
      descEn: 'Man-man declared himself Jesus and demanded stones, until a real cobblestone flew and he swore he would smash their heads.',
      temp: '思绪变得古怪跳跃：【士气】-1（精神受惊）',
      tempEn: 'Erratic and startled thoughts: -1 Morale',
      tempStats: {},
      solution: '获得看穿崇高谎言与荒唐表演的毒辣眼光。识破一切伪善言辞；探索中激活【直觉感知光球】，能看见隐藏的街头暗流。',
      solutionEn: 'Immune to solemn hypocrisy and grand illusions; unlocks [Intuitive Perception Orbs] on the pavement revealing secret currents.',
      bonusStats: { memory: 1, street: 1 },
      modifierDesc: '思维《受洗的疯子救世主》: 荒诞直觉与解构崇高'
    },
    broom_and_pitcher: {
      id: 'broom_and_pitcher',
      name: '扫帚与泼翻的牛奶',
      nameEn: 'The Broom and Spilled Milk',
      icon: '🥛',
      source: '母亲严酷的庭院',
      sourceEn: "Mother's Stern Yard",
      time: 12,
      desc: '母亲打烂了你无数条短裤，却在送行时把纯铜牛奶壶撞翻在厨房石阶上。那是她这辈子唯一一次失魂落魄。',
      descEn: 'Your mother beat you with brooms, yet wept when the copper milk pitcher spilled on departure morning. Severe love made of brass.',
      temp: '总觉得母亲的戒尺在头顶：暂无惩罚',
      tempEn: 'Guilt and stern discipline: No stat penalties',
      tempStats: {},
      solution: '严酷母爱锻造的心灵铠甲。受到任何心理创伤时，士气损失强制减半（最少为 1）；终章海关饮酒时意志坚定。',
      solutionEn: 'Armor of severe maternal love. All morale damage taken is halved (min 1); unshakeable volition at the finale departure.',
      bonusStats: { memory: 1, nerve: 1 },
      modifierDesc: '思维《扫帚与泼翻的牛奶》: 严母烙印形成的心理铠甲'
    },
    dancing_dwarf: {
      id: 'dancing_dwarf',
      name: '跑道上的跳舞小矮人',
      nameEn: 'Dancing Dwarf on the Runway',
      icon: '🕺',
      source: '皮亚尔科机场跑道',
      sourceEn: 'Piarco Airport Tarmac',
      time: 8,
      desc: '走向飞机舷梯时，晨光把你的影子拉得又矮又滑稽，像一个在跑道上跳舞的侏儒。你没有回头。那一刻你不再是受害者，你成了观察者。',
      descEn: 'The morning sun stretched your shadow into a dancing dwarf upon the tarmac. You didn\'t look back. You became the chronicler.',
      temp: '离别的眩晕：无',
      tempEn: 'Dizziness of farewell: None',
      tempStats: {},
      solution: '终极小说家之顿悟。全特质永久 +1；米格尔街的所有故事被你永远定格在艺术之中；获得传奇史诗结局。',
      solutionEn: 'The Chronicler\'s Apotheosis. +1 to ALL stats permanently; enshrines Miguel Street in eternal literature; legendary ending.',
      bonusStats: { memory: 1, imagine: 1, empathy: 1, street: 1, nerve: 1 },
      modifierDesc: '思维《跳舞的小矮人》: 永恒小说家的超然顿悟'
    }
  };

  // 恢复士气的心灵风物道具 (Morale Consumables)
  const ITEMS = {
    mango: {
      id: 'mango',
      name: '加勒比晒干芒果片',
      nameEn: 'Sun-dried Caribbean Mango',
      icon: '🥭',
      desc: '甜酸浓郁的热带果肉，咬下去的一瞬间能冲淡被母亲责骂或被街头嘲弄的委屈。',
      descEn: 'Tart sweet tropical slice that washes away humiliation and adult cruelty.',
      heal: 1,
      count: 2
    },
    peppermint: {
      id: 'peppermint',
      name: '总督府清凉薄荷硬糖',
      nameEn: 'Colonial Peppermint Drops',
      icon: '🍬',
      desc: '辛辣清凉的薄荷劲头直冲颅顶，让少年在窘迫与心慌中迅速重拾尊严。',
      descEn: 'Sharp, freezing peppermint shock that restores your battered teenage dignity.',
      heal: 1,
      count: 2
    },
    cat_puff: {
      id: 'cat_puff',
      name: '黑猫香烟的余温',
      nameEn: 'Stolen Puff of Black Cat Cigarette',
      icon: '🚬',
      desc: '哈特留在木板上的半根烟头。偷偷吸一口辛辣的烟雾，体会成年人无所谓的叹息。',
      descEn: 'Half-smoked stub left by Hat. A clandestine puff that gives adult indifference.',
      heal: 2,
      count: 1
    }
  };

  // 状态初始化与存储绑定
  let stateRef = null;
  let onMoraleChangeCallback = null;
  let onInsightChangeCallback = null;
  let breakdownTimer = null;
  let breakdownSecondsLeft = 0;

  function showToast(html, duration = 3400) {
    if (typeof window !== 'undefined' && window.showToast) {
      window.showToast(html, duration);
      return;
    }
    const t = document.getElementById('toast');
    if (!t) return;
    t.innerHTML = html;
    t.classList.remove('hidden');
    clearTimeout(t._tm);
    t._tm = setTimeout(() => t.classList.add('hidden'), duration);
  }

  function init(sharedState, onMoraleChange, onInsightChange) {
    stateRef = sharedState;
    onMoraleChangeCallback = onMoraleChange;
    onInsightChangeCallback = onInsightChange;

    // 默认值补充
    if (stateRef.morale === undefined) stateRef.morale = 3;
    if (stateRef.maxMorale === undefined) stateRef.maxMorale = 3;
    if (stateRef.insight === undefined) stateRef.insight = 1; // 初始赠送 1 点顿悟
    if (!stateRef.inventory) stateRef.inventory = { ...ITEMS };
    if (!stateRef.cabinet) {
      stateRef.cabinet = {
        maxSlots: 3,
        researching: null, // { id: 'unnamed_object', progress: 0 }
        internalized: [],  // ['bogart_pose']
        discovered: ['unnamed_object', 'bogart_pose'] // 已触发的思维
      };
    }
    if (!stateRef.lockedChecks) stateRef.lockedChecks = {}; // { checkId: { failedAtStat: 2, voice: 'street' } }

    applyThoughtModifiersToStats();
  }

  /* ---- 1. 思维内阁逻辑 (Thought Cabinet) ---- */
  function discoverThought(thoughtId) {
    if (!stateRef || !THOUGHTS[thoughtId]) return;
    if (!stateRef.cabinet.discovered.includes(thoughtId)) {
      stateRef.cabinet.discovered.push(thoughtId);
      const isEn = stateRef.lang === 'EN';
      const th = THOUGHTS[thoughtId];
      showToast(isEn ?
        `【NEW THOUGHT EMBRYO】<br><b>${th.nameEn}</b><br><small>Opened in Thought Cabinet [T]</small>` :
        `【新思绪萌发】<br><b>《${th.name}》</b><br><small>已存入思维内阁 [T]</small>`);
      SoundScape.sfx('page');
      renderCabinet();
      updateCabinetBadge();
    }
  }

  function startResearchThought(thoughtId) {
    if (!stateRef || !THOUGHTS[thoughtId]) return;
    const cab = stateRef.cabinet;
    if (cab.internalized.includes(thoughtId)) return;
    if (cab.internalized.length >= cab.maxSlots) {
      showToast(stateRef.lang === 'EN' ? 'Thought slots full! Unlock more slots with Insight.' : '思维槽位已满！请消耗顿悟点数扩充槽位。');
      return;
    }
    cab.researching = { id: thoughtId, progress: 0 };
    applyThoughtModifiersToStats();
    showToast(stateRef.lang === 'EN' ?
      `Began internalizing 《${THOUGHTS[thoughtId].nameEn}》...` :
      `开始在脑海中推演《${THOUGHTS[thoughtId].name}》...`);
    SoundScape.sfx('collect');
    renderCabinet();
    updateCabinetBadge();
  }

  function advanceThoughtResearch(ticks = 1) {
    if (!stateRef || !stateRef.cabinet || !stateRef.cabinet.researching) return;
    const res = stateRef.cabinet.researching;
    const th = THOUGHTS[res.id];
    if (!th) return;

    res.progress += ticks;
    if (res.progress >= th.time) {
      // 完成内在化！
      stateRef.cabinet.internalized.push(res.id);
      stateRef.cabinet.researching = null;
      applyThoughtModifiersToStats();

      // 特殊奖励处理
      if (th.id === 'quarter_of_four_cents') {
        stateRef.maxMorale += 2;
        stateRef.morale = Math.min(stateRef.maxMorale, stateRef.morale + 2);
        if (onMoraleChangeCallback) onMoraleChangeCallback();
      }

      const isEn = stateRef.lang === 'EN';
      showToast(isEn ?
        `★【THOUGHT INTERNALIZED】★<br><b>《${th.nameEn}》</b><br><small>${th.solutionEn}</small>` :
        `★【思维内在化完成】★<br><b>《${th.name}》</b><br><small>${th.solution}</small>`, 5000);
      SoundScape.sfx('collect');
      unlockChecksByThought(th.id);
    }
    renderCabinet();
    updateCabinetBadge();
  }

  function applyThoughtModifiersToStats() {
    // 依据已内在化和正在研究的思维，动态修正属性上限与临时效果
    // 基础属性保持在 stateRef.baseStats
    if (!stateRef.baseStats) {
      stateRef.baseStats = { ...stateRef.stats };
    }
    const current = { ...stateRef.baseStats };

    // 正在研究的惩罚/加成
    if (stateRef.cabinet && stateRef.cabinet.researching) {
      const th = THOUGHTS[stateRef.cabinet.researching.id];
      if (th && th.tempStats) {
        for (const [k, v] of Object.entries(th.tempStats)) {
          current[k] = Math.max(1, (current[k] || 1) + v);
        }
      }
    }
    // 已内在化的永久加成
    if (stateRef.cabinet && stateRef.cabinet.internalized) {
      for (const tId of stateRef.cabinet.internalized) {
        const th = THOUGHTS[tId];
        if (th && th.bonusStats) {
          for (const [k, v] of Object.entries(th.bonusStats)) {
            current[k] = Math.max(1, (current[k] || 1) + v);
          }
        }
      }
    }
    stateRef.stats = current;
  }

  /* ---- 2. 士气与心力系统 (Morale & Volition) ---- */
  function damageMorale(amount = 1, reason = '成人世界的冷酷打击') {
    if (!stateRef) return;
    // 检查是否有减伤思维
    if (stateRef.cabinet && stateRef.cabinet.internalized.includes('broom_and_pitcher')) {
      amount = Math.max(1, Math.floor(amount / 2));
    }
    if (stateRef.cabinet && stateRef.cabinet.internalized.includes('paradox_of_tears') && reason.includes('恐吓')) {
      showToast(stateRef.lang === 'EN' ? '【Nerve Immunity】Big Foot\'s Paradox absorbs the intimidation!' : '【胆量豁免】《大脚的眼泪悖论》看破了虚张声势，士气未受损伤！');
      return;
    }

    stateRef.morale = Math.max(0, stateRef.morale - amount);
    spawnFloatingDamage(`-${amount} 士气`, reason);
    SoundScape.sfx('fizz');

    if (onMoraleChangeCallback) onMoraleChangeCallback();

    if (stateRef.morale <= 0) {
      triggerMoraleCrisis();
    }
  }

  function healMorale(amount = 1, itemName = '') {
    if (!stateRef) return;
    stateRef.morale = Math.min(stateRef.maxMorale, stateRef.morale + amount);
    spawnFloatingHeal(`+${amount} 士气`, itemName);
    SoundScape.sfx('collect');
    if (breakdownTimer) {
      clearInterval(breakdownTimer);
      breakdownTimer = null;
      hideBreakdownCrisis();
    }
    if (onMoraleChangeCallback) onMoraleChangeCallback();
  }

  function useItem(itemId) {
    if (!stateRef || !stateRef.inventory || !stateRef.inventory[itemId]) return;
    const it = stateRef.inventory[itemId];
    if (it.count <= 0) {
      showToast(stateRef.lang === 'EN' ? 'None left!' : '已经没有剩余了！');
      return;
    }
    it.count--;
    healMorale(it.heal, stateRef.lang === 'EN' ? it.nameEn : it.name);
    renderCabinet();
  }

  function triggerMoraleCrisis() {
    const isEn = stateRef.lang === 'EN';
    const crisisEl = document.getElementById('morale-crisis');
    if (!crisisEl) return;

    crisisEl.classList.remove('hidden');
    breakdownSecondsLeft = 14;
    document.getElementById('crisis-timer').textContent = `${breakdownSecondsLeft}s`;

    if (breakdownTimer) clearInterval(breakdownTimer);
    breakdownTimer = setInterval(() => {
      breakdownSecondsLeft--;
      document.getElementById('crisis-timer').textContent = `${breakdownSecondsLeft}s`;
      SoundScape.sfx('step');
      if (breakdownSecondsLeft <= 0) {
        clearInterval(breakdownTimer);
        breakdownTimer = null;
        // 崩溃软复活
        crisisEl.classList.add('hidden');
        stateRef.morale = 1;
        showToast(isEn ?
          'You collapsed on the pavement in tears. Hat poured cold well water on your head: "Shake it off, boy."' :
          '你倒在路边嚎啕大哭。哈特端来一瓢清凉的井水浇在你头上：“清醒点，小子。明天还得过日子。”', 6000);
        if (onMoraleChangeCallback) onMoraleChangeCallback();
      }
    }, 1000);
  }

  function hideBreakdownCrisis() {
    const crisisEl = document.getElementById('morale-crisis');
    if (crisisEl) crisisEl.classList.add('hidden');
  }

  /* ---- 3. 白检定锁定与修正值账本 (Check Modifiers & Locks) ---- */
  function computeModifiers(check) {
    // 动态计算该检定的情境加成账本
    const ledger = [];
    const statVal = stateRef.stats[check.v] || 0;
    const isEn = stateRef.lang === 'EN';

    ledger.push({
      name: isEn ? `Base [${VOICES[check.v].en}]` : `基础【${VOICES[check.v].name}】`,
      val: statVal,
      type: 'stat'
    });

    // 检查已内在化思维的加成
    if (stateRef.cabinet && stateRef.cabinet.internalized) {
      for (const tId of stateRef.cabinet.internalized) {
        const th = THOUGHTS[tId];
        if (th) {
          if (tId === 'bogart_pose' && (check.v === 'nerve' || check.id?.includes('bogart'))) {
            ledger.push({ name: isEn ? th.nameEn : `思维《${th.name}》`, val: 2, type: 'thought' });
          } else if (tId === 'unnamed_object' && (check.v === 'imagine' || check.id?.includes('popo'))) {
            ledger.push({ name: isEn ? th.nameEn : `思维《${th.name}》`, val: 2, type: 'thought' });
          } else if (tId === 'spot_the_ball' && (check.v === 'street' || check.id?.includes('bet') || check.id?.includes('bolo'))) {
            ledger.push({ name: isEn ? th.nameEn : `思维《${th.name}》`, val: 3, type: 'thought' });
          } else if (tId === 'quarter_of_four_cents' && check.v === 'empathy') {
            ledger.push({ name: isEn ? th.nameEn : `思维《${th.name}》`, val: 2, type: 'thought' });
          } else if (tId === 'raf_spitfire' && (check.id?.includes('edward') || check.id?.includes('scholarship'))) {
            ledger.push({ name: isEn ? th.nameEn : `思维《${th.name}》`, val: 2, type: 'thought' });
          } else if (tId === 'paradox_of_tears' && (check.id?.includes('bigfoot') || check.v === 'nerve')) {
            ledger.push({ name: isEn ? th.nameEn : `思维《${th.name}》`, val: 3, type: 'thought' });
          }
        }
      }
    }

    // 专属对白情境修饰符 (来自 check.modifiers)
    if (check.modifiers && Array.isArray(check.modifiers)) {
      for (const mod of check.modifiers) {
        let active = false;
        try {
          // 安全的简单逻辑断言评估
          if (mod.collected && stateRef.collected.includes(mod.collected)) active = true;
          if (mod.statGte && (stateRef.stats[mod.statGte.v] || 0) >= mod.statGte.val) active = true;
          if (mod.moraleIsLow && stateRef.morale === 1) active = true;
        } catch (e) {}
        if (active) {
          ledger.push({
            name: isEn ? (mod.textEn || mod.text) : mod.text,
            val: mod.val,
            type: mod.val >= 0 ? 'bonus' : 'malus'
          });
        }
      }
    }

    // 士气低落微弱惩罚
    if (stateRef.morale === 1 && !ledger.some(l => l.name.includes('士气'))) {
      ledger.push({
        name: isEn ? 'Low Morale (Heartbroken)' : '士气低落 (心力憔悴)',
        val: -1,
        type: 'malus'
      });
    }

    const totalMod = ledger.reduce((acc, item) => acc + item.val, 0);
    return { ledger, totalMod };
  }

  function isCheckLocked(check) {
    if (!check || !check.id) return false;
    const lock = stateRef.lockedChecks[check.id];
    if (!lock) return false;
    if (lock.permanent) return true; // 红检定永久关闭

    // 白检定：若当前属性高于失败时的属性，则已解锁！
    const currentStat = stateRef.stats[lock.voice] || 0;
    if (currentStat > lock.failedAtStat) {
      delete stateRef.lockedChecks[check.id];
      return false;
    }
    return true;
  }

  function recordCheckResult(check, passed) {
    if (!check || !check.id) return;
    if (passed) {
      delete stateRef.lockedChecks[check.id];
      // 成功检定奖励 1 点顿悟！
      gainInsight(1, stateRef.lang === 'EN' ? `Passed [${VOICES[check.v].en}] Check` : `通过【${VOICES[check.v].name}】检定`);
    } else {
      if (check.type === 'red') {
        stateRef.lockedChecks[check.id] = { permanent: true, voice: check.v };
        // 红检定失败造成士气打击！
        damageMorale(1, stateRef.lang === 'EN' ? 'Critical Red Check Failure' : '关键红检定大失败，自尊受挫');
      } else {
        // 白检定锁定，待加点后重试
        stateRef.lockedChecks[check.id] = {
          failedAtStat: stateRef.stats[check.v] || 0,
          voice: check.v
        };
        SoundScape.sfx('fizz');
      }
    }
  }

  function unlockChecksByVoice(voiceKey) {
    if (!stateRef || !stateRef.lockedChecks) return;
    let count = 0;
    for (const [id, lock] of Object.entries(stateRef.lockedChecks)) {
      if (!lock.permanent && lock.voice === voiceKey) {
        delete stateRef.lockedChecks[id];
        count++;
      }
    }
    if (count > 0) {
      showToast(stateRef.lang === 'EN' ?
        `【WHITE CHECKS UNLOCKED】${count} failed checks can now be retried!` :
        `【白检定已重新激活】有 ${count} 个先前失败的检定如今可以再次尝试！`);
    }
  }

  function unlockChecksByThought(thoughtId) {
    if (!stateRef || !stateRef.lockedChecks) return;
    // 解锁与该思维相关的白检定
    let count = 0;
    for (const [id, lock] of Object.entries(stateRef.lockedChecks)) {
      if (!lock.permanent && (id.includes(thoughtId) || (thoughtId === 'bogart_pose' && lock.voice === 'nerve'))) {
        delete stateRef.lockedChecks[id];
        count++;
      }
    }
    if (count > 0) {
      showToast(stateRef.lang === 'EN' ?
        `Thought 《${THOUGHTS[thoughtId].nameEn}》 unlocked ${count} narrative checks!` :
        `思维《${THOUGHTS[thoughtId].name}》解锁了 ${count} 条新的故事检定！`);
    }
  }

  /* ---- 4. 顿悟点数与特质升级 (Insight & Level-Up) ---- */
  function gainInsight(amount = 1, reason = '顿悟') {
    if (!stateRef) return;
    stateRef.insight = (stateRef.insight || 0) + amount;
    showToast(stateRef.lang === 'EN' ? `+${amount} Insight Point (${reason})` : `+${amount} 点顿悟值 (${reason})`);
    SoundScape.sfx('collect');
    if (onInsightChangeCallback) onInsightChangeCallback();
    updateInsightDisplay();
  }

  function levelUpVoice(voiceKey) {
    if (!stateRef) return;
    if ((stateRef.insight || 0) < 1) {
      showToast(stateRef.lang === 'EN' ? 'Need 1 Insight Point to upgrade skill!' : '需要 1 点顿悟值才能提升内心声音等级！');
      return;
    }
    const currentBase = stateRef.baseStats ? stateRef.baseStats[voiceKey] : (stateRef.stats[voiceKey] || 1);
    if (currentBase >= 6) {
      showToast(stateRef.lang === 'EN' ? 'Skill at maximum level (6)!' : '该声音已达到最高上限（6级）！');
      return;
    }

    stateRef.insight--;
    if (!stateRef.baseStats) stateRef.baseStats = { ...stateRef.stats };
    stateRef.baseStats[voiceKey]++;
    applyThoughtModifiersToStats();

    const isEn = stateRef.lang === 'EN';
    showToast(isEn ?
      `【LEVEL UP】[${VOICES[voiceKey].en}] is now Level ${stateRef.stats[voiceKey]}!` :
      `【特质觉醒】内心声音【${VOICES[voiceKey].name}】提升至 ${stateRef.stats[voiceKey]} 级！`);
    SoundScape.sfx('collect');

    // 升级立刻解锁对应的白检定！
    unlockChecksByVoice(voiceKey);

    if (onInsightChangeCallback) onInsightChangeCallback();
    updateInsightDisplay();
  }

  function unlockThoughtSlot() {
    if (!stateRef) return;
    if ((stateRef.insight || 0) < 2) {
      showToast(stateRef.lang === 'EN' ? 'Need 2 Insight Points to unlock a slot!' : '需要 2 点顿悟值才能扩充思维插槽！');
      return;
    }
    if (stateRef.cabinet.maxSlots >= 5) {
      showToast(stateRef.lang === 'EN' ? 'Maximum slots reached (5)!' : '思维槽位已扩充至极限（5槽）！');
      return;
    }

    stateRef.insight -= 2;
    stateRef.cabinet.maxSlots++;
    showToast(stateRef.lang === 'EN' ? 'Unlocked a new Thought Slot!' : '思维内阁扩充了一个新的思维槽位！');
    SoundScape.sfx('collect');
    renderCabinet();
    updateInsightDisplay();
  }

  /* ---- 5. 浮动数字与视觉特效 (Visual Floaters) ---- */
  function spawnFloatingDamage(text, reason) {
    const el = document.createElement('div');
    el.className = 'de-damage-floater';
    el.innerHTML = `<b>${text}</b><small>${reason}</small>`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2600);
  }

  function spawnFloatingHeal(text, reason) {
    const el = document.createElement('div');
    el.className = 'de-heal-floater';
    el.innerHTML = `<b>${text}</b><small>${reason}</small>`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2600);
  }

  /* ---- 6. UI 渲染与更新 (Render Methods) ---- */
  function updateInsightDisplay() {
    const insEl = document.getElementById('insight-count');
    if (insEl && stateRef) insEl.textContent = stateRef.insight || 0;
  }

  function updateCabinetBadge() {
    const badge = document.getElementById('cabinet-badge');
    if (badge && stateRef && stateRef.cabinet) {
      const active = stateRef.cabinet.internalized.length + (stateRef.cabinet.researching ? 1 : 0);
      badge.textContent = `${active}/${stateRef.cabinet.maxSlots}`;
    }
  }

  function renderCabinet() {
    const slotsEl = document.getElementById('cabinet-slots');
    const gridEl = document.getElementById('thought-grid');
    const slotCountEl = document.getElementById('cab-slot-count');
    if (!slotsEl || !gridEl || !stateRef) return;

    const isEn = stateRef.lang === 'EN';
    const cab = stateRef.cabinet;
    if (slotCountEl) slotCountEl.textContent = `${cab.internalized.length}/${cab.maxSlots}`;

    // 渲染槽位
    slotsEl.innerHTML = '';
    for (let i = 0; i < cab.maxSlots; i++) {
      const sDiv = document.createElement('div');
      sDiv.className = 'cabinet-slot-card';

      if (i < cab.internalized.length) {
        const th = THOUGHTS[cab.internalized[i]];
        sDiv.classList.add('internalized');
        sDiv.innerHTML = `
          <div class="slot-badge">已顿悟 · INTERNALIZED</div>
          <div class="th-icon">${th.icon}</div>
          <h4>${isEn ? th.nameEn : th.name}</h4>
          <p class="th-effect">${isEn ? th.solutionEn : th.solution}</p>
        `;
      } else if (i === cab.internalized.length && cab.researching) {
        const th = THOUGHTS[cab.researching.id];
        const pct = Math.floor((cab.researching.progress / th.time) * 100);
        sDiv.classList.add('researching');
        sDiv.innerHTML = `
          <div class="slot-badge pulse">思索中 · ${pct}%</div>
          <div class="th-icon">${th.icon}</div>
          <h4>${isEn ? th.nameEn : th.name}</h4>
          <div class="th-prog-bar"><div class="th-prog-fill" style="width:${pct}%"></div></div>
          <p class="th-temp">${isEn ? th.tempEn : th.temp}</p>
        `;
      } else {
        sDiv.classList.add('empty');
        sDiv.innerHTML = `
          <div class="slot-badge">空置思维槽 · EMPTY</div>
          <div class="empty-icon">+</div>
          <p>${isEn ? 'Select a discovered thought below to internalize.' : '从下方选择已萌发的思潮放入推演。'}</p>
        `;
      }
      slotsEl.appendChild(sDiv);
    }

    // 渲染已萌发的思潮库
    gridEl.innerHTML = '';
    cab.discovered.forEach(tId => {
      const th = THOUGHTS[tId];
      if (!th) return;
      const isInternalized = cab.internalized.includes(tId);
      const isResearching = cab.researching && cab.researching.id === tId;

      const card = document.createElement('div');
      card.className = `thought-library-card ${isInternalized ? 'done' : ''} ${isResearching ? 'active' : ''}`;
      card.innerHTML = `
        <div class="th-lib-head">
          <span class="th-lib-icon">${th.icon}</span>
          <span class="th-lib-source">${isEn ? th.sourceEn : th.source}</span>
        </div>
        <h4>${isEn ? th.nameEn : th.name}</h4>
        <p class="th-lib-desc">${isEn ? th.descEn : th.desc}</p>
        <div class="th-lib-foot">
          ${isInternalized ? `<span class="tag-done">已彻底内在化</span>` :
            (isResearching ? `<span class="tag-active">正在推演中...</span>` :
              `<button class="de-btn de-sm btn-internalize" data-id="${th.id}">在脑海中研思</button>`)}
        </div>
      `;
      gridEl.appendChild(card);
    });

    // 绑定“在脑海中研思”按钮
    gridEl.querySelectorAll('.btn-internalize').forEach(btn => {
      btn.addEventListener('click', e => {
        const id = e.target.getAttribute('data-id');
        startResearchThought(id);
      });
    });
  }

  function openCabinetModal() {
    const modal = document.getElementById('cabinet');
    if (modal) {
      renderCabinet();
      modal.classList.remove('hidden');
    }
  }

  function closeCabinetModal() {
    const modal = document.getElementById('cabinet');
    if (modal) modal.classList.add('hidden');
  }

  return {
    THOUGHTS,
    ITEMS,
    init,
    discoverThought,
    startResearchThought,
    advanceThoughtResearch,
    damageMorale,
    healMorale,
    useItem,
    gainInsight,
    levelUpVoice,
    unlockThoughtSlot,
    computeModifiers,
    isCheckLocked,
    recordCheckResult,
    unlockChecksByVoice,
    openCabinetModal,
    closeCabinetModal,
    renderCabinet,
    updateCabinetBadge,
    updateInsightDisplay,
    applyThoughtModifiersToStats
  };
})();
