/* ==========================================================
   米格尔街 · 沉浸式第一人称街景控制器 (streetview.js)
   - 360° / 超宽全景视口鼠标拖拽与惯性滑动物理
   - 1940年代加勒比手绘小地图与动态视场角(FOV)动态罗盘
   - 4大街景漫步节点步进推进 (Step Forward / Back)
   - 空间定位 POI 悬浮门牌与极乐迪斯科叙事卡
   - 完整继承原版对话系统、属性检定、中英双语与速写簿存档
   ========================================================== */

(() => {
  const $ = s => document.querySelector(s);
  const $$ = s => document.querySelectorAll(s);

  const KEY = 'miguel-disco.v3';
  let state = {
    collected: [],
    ended: false,
    archetype: 'dreamer',
    lang: 'CN',
    stats: { memory: 3, imagine: 5, empathy: 3, street: 1, nerve: 2 }
  };

  const save = () => {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
  };

  function updateMoraleDom() {
    const pipsBox = $('#morale-pips');
    if (!pipsBox) return;
    const max = state.maxMorale || 3;
    const cur = state.morale !== undefined ? state.morale : 3;
    pipsBox.innerHTML = '';
    for (let i = 1; i <= max; i++) {
      const span = document.createElement('span');
      span.className = `pip ${i <= cur ? 'on' : ''}`;
      pipsBox.appendChild(span);
    }
    save();
  }

  function updateInsightDom() {
    const el = $('#insight-count');
    if (el) el.textContent = state.insight !== undefined ? state.insight : 1;
    if (typeof RPG !== 'undefined') {
      RPG.updateInsightDisplay();
      RPG.updateCabinetBadge();
    }
    save();
  }

  try {
    const saved = JSON.parse(localStorage.getItem(KEY));
    if (saved) state = { ...state, ...saved };
  } catch (e) {}

  if (typeof RPG !== 'undefined') {
    RPG.init(state, updateMoraleDom, updateInsightDom);
  }

  const isDone = id => state.collected.includes(id);

  /* ================= 1. 街景节点数据架构 ================= */
  const SV_NODES = [
    {
      id: 0,
      name: '街头南端 · 裁缝招牌与木匠棚',
      nameEn: 'South Entrance · Tailor & Carpenter Shed',
      coord: 'POS: 01/04',
      mapPos: { x: 30, y: 70 },
      viewAngle: 0, // 朝向角度
      img: 'assets/streetview/node1.jpg',
      defaultPan: 0.5,
      hotspots: [
        {
          id: 'bogart',
          type: 'chapter',
          no: 'I',
          title: '鲍嘉 · 裁缝的招牌',
          sub: 'I · BOGART',
          xPct: 28,
          yPct: 52
        },
        {
          id: 'popo',
          type: 'chapter',
          no: 'II',
          title: '波普 · 没有名字的东西',
          sub: 'II · POPO',
          xPct: 74,
          yPct: 54
        },
        {
          id: 'eddoes',
          type: 'chapter',
          no: 'XI',
          title: '埃多斯 · 蓝色垃圾车',
          sub: 'XI · EDDOES',
          xPct: 50,
          yPct: 62
        }
      ],
      next: 1,
      prev: null
    },
    {
      id: 1,
      name: '街中腹地 · 荒草与粉红房子',
      nameEn: 'Mid-Street · Wild Garden & Pink House',
      coord: 'POS: 02/04',
      mapPos: { x: 80, y: 55 },
      viewAngle: 25,
      img: 'assets/streetview/node2.jpg',
      defaultPan: 0.5,
      hotspots: [
        {
          id: 'words',
          type: 'chapter',
          no: 'VI',
          title: 'B.华兹华斯 · 密林庭院',
          sub: 'VI · B. WORDSWORTH',
          xPct: 22,
          yPct: 48
        },
        {
          id: 'george',
          type: 'chapter',
          no: 'III',
          title: '乔治 · 粉红房子',
          sub: 'III · GEORGE',
          xPct: 80,
          yPct: 46
        },
        {
          id: 'manman',
          type: 'chapter',
          no: 'V',
          title: '曼曼 · 街头先知与粉笔',
          sub: 'V · MAN-MAN',
          xPct: 54,
          yPct: 68
        },
        {
          id: 'bigfoot',
          type: 'chapter',
          no: 'VII',
          title: '大脚 · 铁拳与恐惧',
          sub: 'VII · BIG FOOT',
          xPct: 36,
          yPct: 58
        }
      ],
      next: 2,
      prev: 0
    },
    {
      id: 2,
      name: '街北门廊 · 烟火与笑声',
      nameEn: 'North-Central · Fireworks & Yard',
      coord: 'POS: 03/04',
      mapPos: { x: 140, y: 40 },
      viewAngle: 45,
      img: 'assets/streetview/node3.jpg',
      defaultPan: 0.5,
      hotspots: [
        {
          id: 'morgan',
          type: 'chapter',
          no: 'VIII',
          title: '摩根 · 烟火师',
          sub: 'VIII · MORGAN',
          xPct: 22,
          yPct: 46
        },
        {
          id: 'laura',
          type: 'chapter',
          no: 'X',
          title: '劳拉 · 母性本能',
          sub: 'X · LAURA',
          xPct: 78,
          yPct: 48
        },
        {
          id: 'elias',
          type: 'chapter',
          no: 'IV',
          title: '伊莱亚斯 · 清洁车与课本',
          sub: 'IV · ELIAS',
          xPct: 38,
          yPct: 56
        },
        {
          id: 'titushoyt',
          type: 'chapter',
          no: 'IX',
          title: '泰特斯·霍伊特 · 文科硕士',
          sub: 'IX · TITUS HOYT, I.A.',
          xPct: 58,
          yPct: 48
        },
        {
          id: 'toni',
          type: 'chapter',
          no: 'XII',
          title: '赫瑞拉太太 · 只是为了，爱，爱，爱',
          sub: 'XII · MRS. HEREIRA',
          xPct: 66,
          yPct: 60
        },
        {
          id: 'bhakcu',
          type: 'chapter',
          no: 'XIII',
          title: '巴库 · 机械天才',
          sub: 'XIII · BHAKCU',
          xPct: 82,
          yPct: 66
        }
      ],
      next: 3,
      prev: 1
    },
    {
      id: 3,
      name: '街尾转角 · 门廊与远方之路',
      nameEn: 'North Corner · Hat\'s Verandah & Horizon',
      coord: 'POS: 04/04',
      mapPos: { x: 200, y: 25 },
      viewAngle: 65,
      img: 'assets/streetview/node4.jpg',
      defaultPan: 0.5,
      hotspots: [
        {
          id: 'bolo',
          type: 'chapter',
          no: 'XIV',
          title: '博勒 · 谨慎',
          sub: 'XIV · BOLO',
          xPct: 18,
          yPct: 54
        },
        {
          id: 'edward',
          type: 'chapter',
          no: 'XV',
          title: '爱德华 · 直到来了大兵',
          sub: 'XV · UNTIL THE SOLDIERS CAME',
          xPct: 46,
          yPct: 56
        },
        {
          id: 'hat',
          type: 'chapter',
          no: 'XVI',
          title: '哈特 · 街头哲学家',
          sub: 'XVI · HAT',
          xPct: 76,
          yPct: 50
        },
        {
          id: 'dog',
          type: 'encounter',
          glyph: '🐾',
          title: '睡在阴凉处的野狗',
          sub: 'STREET MONGREL',
          voice: 'empathy',
          xPct: 60,
          yPct: 76
        },
        {
          id: 'finale',
          type: 'finale',
          no: 'XVII',
          title: '离开米格尔街 · 机场路标',
          sub: 'XVII · DEPARTURE',
          xPct: 32,
          yPct: 52
        }
      ],
      next: null,
      prev: 2
    }
  ];

  /* ================= 2. 街景控制器状态 ================= */
  let currentNodeIndex = 0;
  let panX = 0;          // 当前水平滚动像素
  let targetPanX = 0;
  let panVx = 0;         // 惯性速度
  let isDragging = false;
  let startX = 0;
  let startPanX = 0;
  let movedDist = 0;
  const keysDown = {};

  const runtime = {
    mode: 'street', // 'street' | 'dialogue' | 'sheet' | 'book'
    typing: null,
    advanceResolver: null,
    activeChapter: null
  };

  /* ================= 3. 视口初始化与拖拽物理 ================= */
  function initStreetView() {
    const vp = $('#sv-viewport');
    const wrap = $('#sv-panorama-wrap');

    // 初始位置居中
    panX = targetPanX = (2800 - window.innerWidth) * 0.5;
    applyPanTransform();

    vp.addEventListener('pointerdown', e => {
      if (runtime.mode !== 'street') return;
      isDragging = true;
      startX = e.clientX;
      startPanX = panX;
      movedDist = 0;
      panVx = 0;
      vp.classList.add('dragging');
    });

    window.addEventListener('pointermove', e => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      movedDist += Math.abs(dx);
      targetPanX = startPanX - dx;
      panVx = -dx * 0.12;
      startX = e.clientX;
      startPanX = targetPanX;
    });

    window.addEventListener('pointerup', () => {
      if (!isDragging) return;
      isDragging = false;
      vp.classList.remove('dragging');
    });

    // 路面透视点击漫步向前 (Diegetic Road Pavement Stepping)
    function spawnSvRipple(x, y) {
      const r = document.createElement('div');
      r.className = 'sv-road-ripple';
      r.style.left = `${x}px`;
      r.style.top = `${y}px`;
      document.body.appendChild(r);
      setTimeout(() => r.remove(), 750);
    }

    vp.addEventListener('click', e => {
      const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
      const clickDistLimit = isTouch ? 16 : 10;
      if (runtime.mode !== 'street' || movedDist > clickDistLimit) return;
      if (e.target.closest('.sv-hotspot, .sv-arrow, #sv-minimap-card, #hud, #intro, .overlay')) return;
      const yRatio = e.clientY / window.innerHeight;
      if (yRatio > 0.54) {
        spawnSvRipple(e.clientX, e.clientY);
        stepNode(1);
      }
    });

    // 滚轮微调
    window.addEventListener('wheel', e => {
      if (runtime.mode !== 'street') return;
      const delta = (Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY);
      targetPanX += delta * 1.5;
      clampPan();
    }, { passive: true });

    // 键盘支持
    window.addEventListener('keydown', e => {
      keysDown[e.code] = true;
      if (runtime.mode === 'street') {
        if (e.code === 'KeyW' || e.code === 'ArrowUp') {
          e.preventDefault();
          stepNode(1);
        } else if (e.code === 'KeyS' || e.code === 'ArrowDown') {
          e.preventDefault();
          stepNode(-1);
        } else if (e.code === 'KeyC') {
          toggleSheet();
        } else if (e.code === 'KeyB') {
          toggleBook();
        } else if (e.code === 'KeyT') {
          toggleCabinet();
        }
      } else if (runtime.mode === 'dialogue') {
        if (e.code === 'Space' || e.code === 'Enter') {
          e.preventDefault();
          advanceDialogue();
        } else if (e.code === 'Escape') {
          exitDialogue();
        } else if (e.code === 'KeyT') {
          toggleCabinet();
        }
      } else if (runtime.mode === 'sheet' || runtime.mode === 'book' || runtime.mode === 'cabinet') {
        if (e.code === 'Escape') {
          closeModals();
        }
      }
    });

    window.addEventListener('keyup', e => {
      delete keysDown[e.code];
    });

    // 路面推进箭头点击
    $('#arrow-fwd').addEventListener('click', () => stepNode(1));
    $('#arrow-bwd').addEventListener('click', () => stepNode(-1));

    // 心跳渲染循环
    let lastTime = performance.now();
    function tick(now) {
      const dt = Math.min(0.06, (now - lastTime) / 1000);
      lastTime = now;

      if (runtime.mode === 'street') {
        // A/D 键平滑全景旋转
        if (keysDown['KeyA'] || keysDown['ArrowLeft']) {
          targetPanX -= dt * 750;
        } else if (keysDown['KeyD'] || keysDown['ArrowRight']) {
          targetPanX += dt * 750;
        }

        // 惯性阻尼
        if (!isDragging) {
          panVx *= 0.92;
          targetPanX += panVx;
        }

        clampPan();
        // 平滑弹簧追赶
        panX += (targetPanX - panX) * Math.min(1, dt * 16);
        applyPanTransform();

        renderMinimap();
      }

      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    // 加载初始节点
    loadNode(0, true);
    updateLanguage();
    const h = location.hash;
    if (h.includes('hover') || h.includes('choices')) {
      document.documentElement.classList.add('noanim');
      document.body.classList.add('noanim');
    }
    if (h.includes('street') || h.includes('open=') || h.includes('hover')) {
      const intro = $('#intro');
      if (intro) intro.classList.add('hidden');
    } else {
      initIntro();
    }
    if (h.includes('hover')) {
      setTimeout(() => {
        const tag = document.querySelector('.sv-hotspot .sv-tag');
        if (tag) { tag.style.opacity = '1'; tag.style.transform = 'translateX(-50%) translateY(-6px)'; }
      }, 300);
    }
    const om = h.match(/open=(\w+)/);
    if (om) {
      const ch = CHAPTERS.find(c => c.id === om[1]);
      if (ch) setTimeout(() => triggerChapter(ch), 400);
    }
    SoundScape.setOn(true);
    SoundScape.setMode('calypso');
  }

  function clampPan() {
    const maxPan = Math.max(0, 2800 - window.innerWidth);
    if (targetPanX < 0) targetPanX = 0;
    if (targetPanX > maxPan) targetPanX = maxPan;
  }

  function applyPanTransform() {
    const wrap = $('#sv-panorama-wrap');
    if (wrap) wrap.style.transform = `translate3d(${-panX}px, 0, 0)`;
  }

  /* ================= 4. 节点切换与平滑漫步过场 ================= */
  function stepNode(dir) {
    const node = SV_NODES[currentNodeIndex];
    if (dir > 0 && node.next !== null) {
      loadNode(node.next);
      if (typeof RPG !== 'undefined') RPG.advanceThoughtResearch(1);
    } else if (dir < 0 && node.prev !== null) {
      loadNode(node.prev);
      if (typeof RPG !== 'undefined') RPG.advanceThoughtResearch(1);
    }
  }

  let isNodeTransitioning = false;
  function loadNode(idx, instant = false) {
    if (isNodeTransitioning) return;
    const oldIdx = currentNodeIndex;
    const isFwd = idx >= oldIdx;
    currentNodeIndex = idx;
    const node = SV_NODES[idx];
    const isEn = state.lang === 'EN';

    const layerBack = $('#sv-layer-back');
    const layerFront = $('#sv-layer-front');
    const wrap = $('#sv-panorama-wrap');
    const hBox = $('#sv-hotspots');

    // 更新路面推进箭头可见性
    const fwd = $('#arrow-fwd');
    const bwd = $('#arrow-bwd');
    if (fwd) fwd.style.display = node.next !== null ? 'flex' : 'none';
    if (bwd) bwd.style.display = node.prev !== null ? 'flex' : 'none';

    // 更新节点位置与状态文字
    const locEl = $('#sv-cur-loc');
    if (locEl) locEl.textContent = isEn ?
      `Miguel St. · ${node.nameEn} · ${node.coord}` :
      `米格尔街 · ${node.name} · ${node.coord}`;
    const titleEl = $('#sv-node-title');
    const coordsEl = $('#sv-node-coords');
    if (titleEl) titleEl.textContent = isEn ? node.nameEn : node.name;
    if (coordsEl) coordsEl.textContent = node.coord;

    if (instant || !layerFront || !layerBack) {
      if (layerFront) layerFront.style.backgroundImage = `url(${node.img})`;
      renderHotspots(node);
      renderMinimap();
      return;
    }

    isNodeTransitioning = true;
    if (hBox) hBox.classList.add('sv-fading');

    // 复制当前图层底版并准备推进过场
    layerBack.style.backgroundImage = layerFront.style.backgroundImage;
    layerFront.style.backgroundImage = `url(${node.img})`;

    const transClass = isFwd ? 'sv-transition-fwd' : 'sv-transition-bwd';
    wrap.classList.remove('sv-transition-fwd', 'sv-transition-bwd');
    void wrap.offsetWidth;
    wrap.classList.add(transClass);

    SoundScape.sfx('step');

    // 适度向当前节点的道路透视方向平滑过渡视线
    const maxPan = Math.max(0, 2800 - window.innerWidth);
    targetPanX = maxPan * (node.defaultPan || 0.5);

    setTimeout(() => {
      renderHotspots(node);
      renderMinimap();
      if (hBox) hBox.classList.remove('sv-fading');
    }, 300);

    setTimeout(() => {
      wrap.classList.remove('sv-transition-fwd', 'sv-transition-bwd');
      layerBack.style.backgroundImage = 'none';
      isNodeTransitioning = false;
    }, 720);
  }

  /* ================= 5. 空间热点与门牌渲染 ================= */
  function renderHotspots(node) {
    const box = $('#sv-hotspots');
    if (!box) return;
    box.innerHTML = '';
    const isEn = state.lang === 'EN';
    const wrapW = 2800;

    node.hotspots.forEach(hp => {
      const el = document.createElement('div');
      el.className = 'sv-hotspot';
      const done = hp.type === 'chapter' ? isDone(hp.id) : false;
      if (done) el.classList.add('done');

      // 计算在 2800px 全景容器内的实际像素位置
      const posX = (hp.xPct / 100) * wrapW;
      const posY = (hp.yPct / 100) * window.innerHeight;

      el.style.left = `${posX}px`;
      el.style.top = `${posY}px`;

      // 提取章节文学数据
      let tagContent = '';
      if (hp.type === 'chapter') {
        const ch = CHAPTERS.find(c => c.id === hp.id);
        if (ch) {
          const tipData = (done && ch.tipAfter) ? ch.tipAfter : ch.tip;
          const v = tipData ? VOICES[tipData.v] : null;
          const vName = v ? (isEn ? v.en : v.name) : '';
          const vColor = v ? v.color : 'var(--ochre)';
          const tipText = tipData ? (isEn ? (tipData.en || tipData.x) : tipData.x) : '';

          tagContent = `
            <div class="sv-tag">
              <div style="font:700 13px var(--serif); color:var(--bone); letter-spacing:.12em; margin-bottom:4px;">
                ${isEn ? ch.sub : ch.title} <small style="color:var(--dim); font-size:11px;">${isEn ? ch.title : ch.sub}</small>
                ${done ? `<span style="color:#8cd4a8; font-size:11px; margin-left:6px;">✓ ${isEn ? 'Recorded' : '已留存'}</span>` : ''}
              </div>
              <div style="font-size:12px; line-height:1.6; color:#bcb2a2; border-top:1px solid rgba(255,255,255,0.08); padding-top:4px;">
                <span style="color:${vColor}; font-weight:700;">[${vName}]</span> ${tipText}
              </div>
            </div>
          `;
        }
      }

      el.innerHTML = `
        <div class="sv-badge">
          ${hp.glyph ? `<span style="color:var(--ochre); font-size:12px;">${hp.glyph}</span>` : `<span class="sv-no">${hp.no || '•'}</span>`}
          <span class="sv-title">${isEn ? hp.sub : hp.title}</span>
          ${done ? '<span class="sv-check">✓</span>' : ''}
        </div>
        <div class="sv-stem"></div>
        <div class="sv-anchor"></div>
        ${tagContent}
      `;

      el.addEventListener('click', e => {
        if (movedDist > 10) return;
        e.stopPropagation();
        handleHotspotClick(hp);
      });

      box.appendChild(el);
    });
  }

  function handleHotspotClick(hp) {
    if (hp.type === 'chapter') {
      const ch = CHAPTERS.find(c => c.id === hp.id);
      if (ch) triggerChapter(ch);
    } else if (hp.type === 'encounter') {
      const enc = STREET_ENCOUNTERS.find(e => e.id === hp.id);
      if (enc) {
        const isEn = state.lang === 'EN';
        const v = VOICES[enc.voice];
        const text = isEn ? enc.textEn : enc.text;
        const name = isEn ? enc.sub : enc.name;
        SoundScape.sfx('collect');
        showToast(`<b>${name}</b><br><span style="color:${v.color}">[${isEn ? v.en : v.name}]</span> ${text}`);
      }
    } else if (hp.type === 'finale') {
      const fin = FINALE;
      const isReady = state.collected.length === CHAPTERS.length;
      const isEn = state.lang === 'EN';
      if (!isReady) {
        const rem = CHAPTERS.length - state.collected.length;
        showToast(isEn ?
          `The road leads to Piarco Airport.<br>You still have <b>${rem}</b> neighbour stories left unremembered.` :
          `路标指向皮亚科机场。<br>但你还有 <b>${rem}</b> 位邻居的故事未曾听闻。`);
      } else {
        triggerChapter(fin, true);
      }
    }
  }

  /* ================= 6. 手绘小地图与动态罗盘绘制 ================= */
  function renderMinimap() {
    const canvas = $('#sv-map-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    // 绘制米格尔街主干道底图
    ctx.strokeStyle = '#2d241d';
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(25, 75);
    ctx.quadraticCurveTo(110, 50, 215, 20);
    ctx.stroke();

    // 绘制道路中心线
    ctx.strokeStyle = '#4a3c30';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(25, 75);
    ctx.quadraticCurveTo(110, 50, 215, 20);
    ctx.stroke();
    ctx.setLineDash([]);

    // 绘制所有节点点位
    SV_NODES.forEach((n, idx) => {
      const isCur = idx === currentNodeIndex;
      ctx.fillStyle = isCur ? '#d9a441' : '#5a4635';
      ctx.beginPath();
      ctx.arc(n.mapPos.x, n.mapPos.y, isCur ? 5 : 3.5, 0, Math.PI * 2);
      ctx.fill();

      if (isCur) {
        ctx.strokeStyle = 'rgba(217, 164, 65, 0.4)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(n.mapPos.x, n.mapPos.y, 9, 0, Math.PI * 2);
        ctx.stroke();
      }
    });

    // 计算当前相机的全景偏转角度 (0 ~ 360)
    const curNode = SV_NODES[currentNodeIndex];
    const maxPan = Math.max(1, 2800 - window.innerWidth);
    const panRatio = panX / maxPan; // 0.0 ~ 1.0
    // 基础道路朝向 + 视线平移角度
    const baseAngle = (curNode.viewAngle - 90) * (Math.PI / 180);
    const lookAngle = baseAngle + (panRatio - 0.5) * (Math.PI * 0.7);

    // 绘制动态视场角 (FOV Vision Cone)
    const coneRadius = 32;
    const fovHalf = 0.42; // ~48度视场
    const curX = curNode.mapPos.x;
    const curY = curNode.mapPos.y;

    const grad = ctx.createRadialGradient(curX, curY, 2, curX, curY, coneRadius);
    grad.addColorStop(0, 'rgba(217, 164, 65, 0.65)');
    grad.addColorStop(0.6, 'rgba(217, 164, 65, 0.25)');
    grad.addColorStop(1, 'rgba(217, 164, 65, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(curX, curY);
    ctx.arc(curX, curY, coneRadius, lookAngle - fovHalf, lookAngle + fovHalf);
    ctx.closePath();
    ctx.fill();

    // 视线中心指针
    ctx.strokeStyle = 'rgba(255, 230, 160, 0.85)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(curX, curY);
    ctx.lineTo(curX + Math.cos(lookAngle) * coneRadius, curY + Math.sin(lookAngle) * coneRadius);
    ctx.stroke();
  }

  // 小地图点击快速漫步传送（若存在）
  const mapCanvas = $('#sv-map-canvas');
  if (mapCanvas) {
    mapCanvas.addEventListener('click', e => {
      const rect = e.target.getBoundingClientRect();
      const clickX = ((e.clientX - rect.left) / rect.width) * 240;
      const clickY = ((e.clientY - rect.top) / rect.height) * 90;

      // 寻找最近的节点
      let closestNode = null;
      let minDist = 999;
      SV_NODES.forEach(n => {
        const d = Math.hypot(n.mapPos.x - clickX, n.mapPos.y - clickY);
        if (d < minDist) {
          minDist = d;
          closestNode = n;
        }
      });

      if (closestNode && minDist < 30 && closestNode.id !== currentNodeIndex) {
        loadNode(closestNode.id);
        SoundScape.sfx('step');
      }
    });
  }

  /* ================= 7. 完整继承极乐迪斯科对话流系统 ================= */
  async function triggerChapter(ch, isFinale = false) {
    runtime.mode = 'dialogue';
    runtime.activeChapter = ch;
    document.body.classList.add('in-scene');

    const bgUrl = SCENES[ch.id] || 'assets/street.jpg';
    const sceneEl = $('#scene');
    const sceneBg = $('#scene-bg');
    if (sceneBg) sceneBg.style.backgroundImage = `url(${bgUrl})`;
    if (sceneEl) sceneEl.classList.remove('hidden');

    const panel = $('#panel');
    panel.classList.remove('hidden');
    $('#log').innerHTML = '';
    $('#options').innerHTML = '';

    updatePortrait(ch.portrait || ch.id);
    SoundScape.sfx('page');

    const finished = await runStepSequence(ch.steps, ch);

    if (finished) {
      if (isFinale) {
        $('#curtain').classList.remove('hidden');
      } else {
        if (!isDone(ch.id)) {
          state.collected.push(ch.id);
          save();
          const isEn = state.lang === 'EN';
          const itemName = isEn ? (ch.item.nameEn || ch.item.name) : ch.item.name;
          const itemDesc = isEn ? (ch.item.descEn || ch.item.desc) : ch.item.desc;
          showToast(`【${isEn ? 'SKETCHBOOK ENTRY' : '速写簿新记录'}】<br><b>${itemName}</b><br><small>${itemDesc}</small>`);
        }
        updateBookCounter();
        renderHotspots(SV_NODES[currentNodeIndex]);
      }
    }
  }

  function exitDialogue() {
    if (typeof Fx !== 'undefined') Fx.abort();
    $('#panel').classList.add('hidden');
    if ($('#scene')) $('#scene').classList.add('hidden');
    document.body.classList.remove('in-scene');
    runtime.mode = 'street';
  }
  $('#btn-leave').addEventListener('click', exitDialogue);

  function updatePortrait(speakerKey) {
    const pEl = $('#portrait');
    const nameEl = $('#portrait-name');
    const sp = SPEAKERS[speakerKey];
    const isEn = state.lang === 'EN';

    if (!sp || !sp.portrait) {
      pEl.classList.add('empty');
      nameEl.innerHTML = '';
      return;
    }
    pEl.classList.remove('empty');

    const portImg = PORTRAITS[sp.portrait];
    if (portImg) {
      pEl.style.backgroundImage = `url(${portImg})`;
      pEl.style.backgroundPosition = 'center';
    }
    nameEl.innerHTML = `${isEn ? sp.en : sp.name}<small>${isEn ? sp.name : sp.en}</small>`;
  }

  async function runStepSequence(steps, ch) {
    for (const step of steps) {
      if (runtime.mode !== 'dialogue') return false;

      if (step.music) SoundScape.setMode(step.music);

      if (step.fx && typeof Fx !== 'undefined') {
        await Fx.run(step.fx, step.tip);
      }

      if (step.s && SPEAKERS[step.s] && SPEAKERS[step.s].portrait) {
        updatePortrait(step.s);
      }

      if (step.v) {
        const vInfo = VOICES[step.v];
        const isEn = state.lang === 'EN';
        const statVal = state.stats[step.v] || 0;
        if (statVal >= (step.lvl || 1)) {
          const vName = isEn ? vInfo.en : vInfo.name;
          const text = isEn ? (step.en || step.x) : step.x;
          const passTag = isEn ? `[PASSED: ${statVal} ≥ ${step.lvl || 1}]` : `[通过: ${statVal} ≥ ${step.lvl || 1}]`;
          await typeLine({ who: `[${vName}]`, role: 'voice', text, color: vInfo.color, tag: passTag });
        }
      }

      if (!step.v && (step.x || step.en)) {
        const who = SPEAKERS[step.s] || SPEAKERS.narr;
        const isEn = state.lang === 'EN';
        const speakerName = (!step.s || step.s === 'narr') ? '' : (isEn ? who.en : who.name);
        const text = isEn ? (step.en || step.x) : step.x;
        await typeLine({ who: speakerName, role: step.s || 'narr', text });
      }

      // 极乐迪斯科 RPG 机制：思维萌发、士气创伤/恢复、推演步进
      if (step.thought && typeof RPG !== 'undefined') {
        RPG.discoverThought(step.thought);
      }
      if (step.damage && typeof RPG !== 'undefined') {
        const isEn = state.lang === 'EN';
        const reason = isEn ? (step.damage.reasonEn || step.damage.reason) : (step.damage.reason || '心理受挫');
        RPG.damageMorale(step.damage.amount || 1, reason);
      }
      if (step.heal && typeof RPG !== 'undefined') {
        const isEn = state.lang === 'EN';
        const reason = isEn ? (step.heal.reasonEn || step.heal.reason) : (step.heal.reason || '心灵抚慰');
        RPG.healMorale(step.heal.amount || 1, reason);
      }
      if (typeof RPG !== 'undefined') {
        RPG.advanceThoughtResearch(1);
      }

      if (step.choice) {
        const chosen = await presentChoices(step.choice);
        if (chosen.then) {
          const subOk = await runStepSequence(chosen.then, ch);
          if (!subOk) return false;
        }
      }
    }
    return true;
  }

  function typeLine({ who, role, text, color, tag }) {
    return new Promise(resolve => {
      const log = $('#log');
      const p = document.createElement('p');
      p.className = `ln ${role}`;
      if (color) {
        p.style.setProperty('--voice-accent', color);
      }

      if (who) {
        const whoSpan = document.createElement('span');
        whoSpan.className = 'who';
        if (color) whoSpan.style.color = color;
        whoSpan.textContent = who;
        p.appendChild(whoSpan);
      }
      if (tag) {
        const chkSpan = document.createElement('span');
        chkSpan.className = 'chk';
        chkSpan.textContent = tag;
        p.appendChild(chkSpan);
      }

      const textSpan = document.createElement('span');
      textSpan.className = 'txt';
      p.appendChild(textSpan);
      log.appendChild(p);
      log.scrollTop = log.scrollHeight;

      const plain = (text || '').replace(/<[^>]+>/g, '');

      const finishTyping = () => {
        clearInterval(t);
        runtime.typing = null;
        textSpan.innerHTML = text;
        log.scrollTop = log.scrollHeight;
        waitForContinue(resolve);
      };

      runtime.typing = finishTyping;

      if (location.hash.includes('choices')) {
        textSpan.innerHTML = text;
        log.scrollTop = log.scrollHeight;
        resolve();
        return;
      }

      let i = 0;
      const speed = 16;
      const t = setInterval(() => {
        i += 2;
        if (i < plain.length) {
          textSpan.textContent = plain.slice(0, i);
          log.scrollTop = log.scrollHeight;
        } else {
          finishTyping();
        }
      }, speed);
    });
  }

  function waitForContinue(resolve) {
    const btn = $('#btn-continue');
    btn.classList.remove('hidden');
    runtime.advanceResolver = () => {
      btn.classList.add('hidden');
      runtime.advanceResolver = null;
      resolve();
    };
    btn.onclick = () => {
      if (runtime.typing) {
        runtime.typing();
        return;
      }
      if (runtime.advanceResolver) runtime.advanceResolver();
    };
  }

  function advanceDialogue() {
    if (runtime.typing) {
      runtime.typing();
      return;
    }
    if (runtime.advanceResolver) runtime.advanceResolver();
  }

  function presentChoices(options) {
    return new Promise(resolve => {
      const optBox = $('#options');
      optBox.innerHTML = '';
      $('#btn-continue').classList.add('hidden');
      const isEn = state.lang === 'EN';

      options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        let checkTag = '';
        let oddsTag = '';
        let isLocked = false;

        if (opt.check) {
          const check = opt.check;
          const isRed = check.type === 'red';
          const vInfo = VOICES[check.v];
          const vName = isEn ? vInfo.en : vInfo.name;

          isLocked = typeof RPG !== 'undefined' ? RPG.isCheckLocked(check) : false;

          if (isLocked) {
            btn.classList.add('locked-check');
            btn.disabled = true;
            if (isRed) {
              checkTag = `<span class="ck" style="color:#d63820;">[${isEn ? 'FAILED RED CHECK · IRREVOCABLE' : '红检定 · 机会已逝'}]</span>`;
            } else {
              checkTag = `<span class="ck" style="color:#e0d6c3;">[${isEn ? `LOCKED WHITE CHECK · UPGRADE [${vName}]` : `白检定锁定 · 提升【${vName}】重试`}]</span>`;
            }
          } else {
            const { totalMod } = typeof RPG !== 'undefined' ? RPG.computeModifiers(check) : { totalMod: state.stats[check.v] || 0 };
            const diff = check.dc - totalMod;
            const odds = isEn ?
              (diff <= 3 ? 'Almost Certain' : (diff <= 5 ? 'High' : (diff <= 7 ? 'Medium' : (diff <= 9 ? 'Challenging' : 'Very Low')))) :
              (diff <= 3 ? '几乎笃定' : (diff <= 5 ? '较高' : (diff <= 7 ? '中等' : (diff <= 9 ? '艰难' : '渺茫'))));

            if (isRed) {
              btn.classList.add('red-check');
              checkTag = `<span class="ck" style="color:#ff5240;">[${isEn ? 'RED CHECK · ONE CHANCE' : '红检定 · 仅此一次'}] [${vName}]</span>`;
            } else {
              btn.classList.add('white-check');
              checkTag = `<span class="ck" style="color:${vInfo.color}">[${isEn ? 'WHITE CHECK' : '白检定'}] [${vName}]</span>`;
            }
            oddsTag = `<span class="odds">(${odds})</span>`;
          }
        }

        const rawText = isEn ? (opt.labelEn || opt.label) : opt.label;
        const text = opt.check ? rawText.replace(/^\[[^\]]+\]\s*/, '') : rawText;
        btn.innerHTML = `<span class="num">${idx + 1}.</span>${checkTag}${text} ${oddsTag}`;

        if (!isLocked) {
          btn.onclick = async () => {
            optBox.innerHTML = '';
            const chosenP = document.createElement('p');
            chosenP.className = 'ln picked';
            chosenP.textContent = text;
            $('#log').appendChild(chosenP);

            if (opt.check) {
              const pass = await performDiceRoll(opt.check);
              const branch = pass ? opt.pass : opt.fail;
              if (branch) {
                await runStepSequence(branch, runtime.activeChapter);
              }
            } else if (opt.then) {
              await runStepSequence(opt.then, runtime.activeChapter);
            }
            resolve(opt);
          };
        }
        optBox.appendChild(btn);
      });
    });
  }

  /* ================= 8. 掷骰、内心声音与速写簿 ================= */
  async function performDiceRoll(check) {
    const dBox = $('#dice');
    dBox.classList.remove('hidden');
    const isEn = state.lang === 'EN';
    const isRed = check.type === 'red';
    const vInfo = VOICES[check.v];
    const vName = isEn ? vInfo.en : vInfo.name;

    const { ledger, totalMod } = typeof RPG !== 'undefined' ?
      RPG.computeModifiers(check) :
      { ledger: [{ name: isEn ? 'Base' : '基础', val: state.stats[check.v] || 0 }], totalMod: state.stats[check.v] || 0 };

    $('#dice-skill').innerHTML = `
      <span style="color:${isRed ? '#ff5240' : vInfo.color}">[${isRed ? (isEn ? 'RED CHECK' : '红检定 · 机会仅此一次') : (isEn ? 'WHITE CHECK' : '白检定')}]</span>
      ${vName} · ${isEn ? 'DC' : '难度'} ${check.dc}
    `;

    const ledgerBox = $('#dice-ledger');
    if (ledgerBox) {
      ledgerBox.className = 'dice-modifiers-box';
      ledgerBox.innerHTML = `
        <div class="dice-modifiers-title">${isEn ? 'MODIFIERS LEDGER' : '情境修正值清单'}</div>
        ${ledger.map(item => `
          <div class="dice-mod-item ${item.val >= 0 ? 'bonus' : 'malus'}">
            <span>${item.name}</span>
            <span>${item.val >= 0 ? '+' : ''}${item.val}</span>
          </div>
        `).join('')}
        <div class="dice-mod-item" style="border-top:1px dashed rgba(217,164,65,0.4); margin-top:5px; padding-top:4px; font-weight:700;">
          <span>${isEn ? 'Total Modifier' : '总计修正加成'}</span>
          <span style="color:var(--ochre);">${totalMod >= 0 ? '+' : ''}${totalMod}</span>
        </div>
      `;
    }

    $('#dice-sum').textContent = isEn ? `Total Modifier: ${totalMod >= 0 ? '+' : ''}${totalMod}` : `总计修正值: ${totalMod >= 0 ? '+' : ''}${totalMod}`;
    $('#dice-result').textContent = '';

    SoundScape.sfx('dice');

    // 骰子摇晃过场
    for (let i = 0; i < 7; i++) {
      $('#die1').textContent = Math.floor(Math.random() * 6) + 1;
      $('#die2').textContent = Math.floor(Math.random() * 6) + 1;
      await new Promise(r => setTimeout(r, 80));
    }

    const die1 = Math.floor(Math.random() * 6) + 1;
    const die2 = Math.floor(Math.random() * 6) + 1;
    $('#die1').textContent = die1;
    $('#die2').textContent = die2;

    const isCritSuccess = (die1 === 6 && die2 === 6);
    const isCritFailure = (die1 === 1 && die2 === 1);
    const total = die1 + die2 + totalMod;
    const pass = isCritSuccess || (total >= check.dc && !isCritFailure);

    $('#dice-sum').textContent = `${die1} + ${die2} + ${isEn ? 'Mod' : '修正'}(${totalMod >= 0 ? '+' : ''}${totalMod}) = ${total} (${isEn ? 'DC' : '难度'}: ${check.dc})`;

    if (isCritSuccess) {
      $('#dice-result').innerHTML = `<b style="color:#8cd4a8;">${isEn ? 'CRITICAL SUCCESS!' : 'CRITICAL SUCCESS / 绝妙大成功!'}</b>`;
      SoundScape.sfx('collect');
    } else if (isCritFailure) {
      $('#dice-result').innerHTML = `<b style="color:var(--rust-hi);">${isEn ? 'CRITICAL FAILURE!' : 'CRITICAL FAILURE / 双一惨败!'}</b>`;
      SoundScape.sfx('fizz');
    } else if (pass) {
      $('#dice-result').innerHTML = `<b style="color:#8cd4a8;">${isEn ? 'CHECK SUCCESS' : '检定通过'}</b>`;
      SoundScape.sfx('collect');
    } else {
      $('#dice-result').innerHTML = `<b style="color:var(--rust);">${isEn ? 'CHECK FAILURE' : '检定未通过'}</b>`;
      SoundScape.sfx('fizz');
    }

    // 记录检定结果（白检定锁定/红检定惩罚/顿悟奖励）
    if (typeof RPG !== 'undefined') {
      RPG.recordCheckResult(check, pass);
      RPG.advanceThoughtResearch(2);
    }

    await new Promise(r => setTimeout(r, 1600));
    dBox.classList.add('hidden');
    return pass;
  }

  function toggleSheet() {
    const s = $('#sheet');
    if (s.classList.contains('hidden')) {
      renderSheet();
      s.classList.remove('hidden');
      runtime.mode = 'sheet';
    } else {
      closeModals();
    }
  }

  function toggleBook() {
    const b = $('#book');
    if (b.classList.contains('hidden')) {
      renderBook();
      b.classList.remove('hidden');
      runtime.mode = 'book';
    } else {
      closeModals();
    }
  }

  function toggleCabinet() {
    const c = $('#cabinet');
    if (!c) return;
    if (c.classList.contains('hidden')) {
      closeModals();
      if (typeof RPG !== 'undefined') RPG.openCabinetModal();
      runtime.mode = 'cabinet';
    } else {
      closeModals();
    }
  }

  function closeModals() {
    $('#sheet').classList.add('hidden');
    $('#book').classList.add('hidden');
    if (typeof RPG !== 'undefined') RPG.closeCabinetModal();
    runtime.mode = 'street';
  }

  $$('.sheet-close').forEach(btn => btn.addEventListener('click', closeModals));
  $('#btn-sheet').addEventListener('click', toggleSheet);
  $('#btn-book').addEventListener('click', toggleBook);
  $('#btn-cabinet').addEventListener('click', toggleCabinet);

  const cabClose = $('#cabinet-close');
  if (cabClose) cabClose.addEventListener('click', () => { if (typeof RPG !== 'undefined') RPG.closeCabinetModal(); });
  const cabUnlock = $('#btn-unlock-slot');
  if (cabUnlock) cabUnlock.addEventListener('click', () => { if (typeof RPG !== 'undefined') RPG.unlockThoughtSlot(); });

  function renderSheet() {
    const list = $('#sheet-list');
    const isEn = state.lang === 'EN';
    list.innerHTML = Object.entries(VOICES).map(([k, v]) => {
      const val = state.stats[k] || 0;
      const canUp = (state.insight || 0) > 0 && val < 6;
      return `
        <div class="skill" style="color:${v.color}">
          <div class="nm">
            ${isEn ? v.en : v.name}<small>${isEn ? v.name : v.en}</small>
            ${canUp ? `<button class="btn-voice-up" data-voice="${k}">+ ${isEn ? 'Level Up' : '升级'}</button>` : ''}
          </div>
          <div>
            <div class="pips">${[1, 2, 3, 4, 5, 6].map(i => `<i class="${i <= val ? 'on' : ''}"></i>`).join('')}</div>
            <div class="ds">${v.desc}</div>
          </div>
        </div>
      `;
    }).join('');

    list.querySelectorAll('.btn-voice-up').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const vKey = btn.getAttribute('data-voice');
        if (typeof RPG !== 'undefined') {
          RPG.levelUpVoice(vKey);
          renderSheet();
        }
      });
    });
  }

  function renderBook() {
    const grid = $('#book-grid');
    const isEn = state.lang === 'EN';
    grid.innerHTML = CHAPTERS.map(ch => {
      const done = isDone(ch.id);
      const portUrl = PORTRAITS[ch.portrait || ch.id] || 'assets/title.jpg';
      const title = done ? (isEn ? ch.sub : ch.title) : '？？？';
      const itemName = isEn ? (ch.item.nameEn || ch.item.name) : ch.item.name;
      const itemDesc = isEn ? (ch.item.descEn || ch.item.desc) : ch.item.desc;
      const noteText = isEn ? (ch.noteEn || ch.note) : ch.note;

      return `
        <article class="entry ${done ? '' : 'locked'}">
          <div class="pic" style="background-image:url(${portUrl});"></div>
          <div>
            <h3>${title}</h3>
            ${done ? `
              <div class="it"><b>${itemName}</b> · ${itemDesc}</div>
              <div class="nt">“${noteText}”</div>
            ` : `<div class="it" style="color:var(--dim);">${isEn ? 'Unremembered neighbour' : '未曾探访的街坊'}</div>`}
          </div>
        </article>
      `;
    }).join('');
  }

  function updateBookCounter() {
    const el = $('#book-count');
    if (el) el.textContent = `${state.collected.length}/${CHAPTERS.length}`;
  }

  function showToast(html, duration = 3600) {
    const t = $('#toast');
    t.innerHTML = html;
    t.classList.remove('hidden');
    clearTimeout(t._tm);
    t._tm = setTimeout(() => t.classList.add('hidden'), duration);
  }

  /* ================= 9. 语言切换与音量控制 ================= */
  $('#btn-lang').addEventListener('click', () => {
    state.lang = state.lang === 'CN' ? 'EN' : 'CN';
    save();
    updateLanguage();
  });

  function updateLanguage() {
    const isEn = state.lang === 'EN';
    $('#lang-val').textContent = isEn ? 'EN' : '中文';
    const node = SV_NODES[currentNodeIndex];
    if ($('#sv-node-title')) $('#sv-node-title').textContent = isEn ? node.nameEn : node.name;

    const cabBadge = state.cabinet ? `${state.cabinet.internalized.length + (state.cabinet.researching ? 1 : 0)}/${state.cabinet.maxSlots}` : '0/3';
    $('#btn-cabinet').innerHTML = `🧠 ${isEn ? 'Cabinet' : '思维阁'} <b id="cabinet-badge">${cabBadge}</b> <kbd>T</kbd>`;

    const mLabel = $('#hud-morale .vital-label');
    if (mLabel) mLabel.textContent = isEn ? 'MORALE' : '士气';
    const iLabel = $('#hud-insight .vital-label');
    if (iLabel) iLabel.textContent = isEn ? 'INSIGHT' : '顿悟';

    updateMoraleDom();
    updateInsightDom();

    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    const hintEl = $('#sv-hint-bar');
    if (hintEl) {
      hintEl.textContent = isTouch ?
        (isEn ? '← Drag to Look Around · Tap Road or Arrows to Move Forward →' : '← 单指滑动环视街景 · 点击路面或箭头纵深推进 →') :
        (isEn ? '← Drag Mouse to Look Around · Click Road / W-S to Step · A-D to Rotate →' : '← 按住鼠标拖拽环顾街景 · 点击路面 / W/S 键沿街纵深步进 · A/D 键全景转动 →');
    }
    const fwdTxt = $('#arrow-fwd .sv-arrow-text');
    if (fwdTxt) fwdTxt.innerHTML = `${isEn ? 'Step Forward' : '向前推进'}<kbd>W</kbd>`;
    const bwdTxt = $('#arrow-bwd .sv-arrow-text');
    if (bwdTxt) bwdTxt.innerHTML = `${isEn ? 'Step Back' : '向后退回'}<kbd>S</kbd>`;
    renderHotspots(node);
    updateBookCounter();
    if ($('#archetypes') && !$('#intro').classList.contains('hidden')) {
      renderIntroArchetypes();
    }
  }

  /* ================= 独立开场 / 人物原型构建 ================= */
  function initIntro() {
    const intro = $('#intro');
    if (!intro) return;
    if (state.introDone) {
      intro.classList.add('hidden');
      return;
    }
    intro.classList.remove('hidden');
    renderIntroArchetypes();

    const startBtn = $('#btn-start');
    if (startBtn) {
      startBtn.onclick = () => {
        SoundScape.setOn(true);
        SoundScape.setMode('calypso');
        intro.classList.add('hidden');
        state.introDone = true;
        save();
      };
    }
  }

  function renderIntroArchetypes() {
    const box = $('#archetypes');
    if (!box) return;
    const isEn = state.lang === 'EN';

    box.innerHTML = ARCHETYPES.map(a => `
      <div class="arche ${state.archetype === a.id ? 'sel' : ''}" data-id="${a.id}">
        <b>${isEn ? (a.en || a.name) : a.name}</b>
        <p>${isEn ? (a.descEn || a.desc) : a.desc}</p>
        <div class="bars">
          ${Object.entries(a.stats).map(([k, v]) => `
            <div class="stat-row">
              <span class="stat-name" style="color:${VOICES[k].color}">${isEn ? VOICES[k].en : VOICES[k].name}</span>
              <div class="stat-pips">
                ${[1, 2, 3, 4, 5].map(i => `<span class="pip ${i <= v ? 'on' : ''}" style="${i <= v ? `--pip-color:${VOICES[k].color}` : ''}"></span>`).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');

    $$('.arche').forEach(el => {
      el.addEventListener('click', () => {
        $$('.arche').forEach(a => a.classList.remove('sel'));
        el.classList.add('sel');
        const arch = ARCHETYPES.find(a => a.id === el.dataset.id);
        if (arch) {
          state.archetype = arch.id;
          state.stats = { ...arch.stats };
          save();
        }
        if (typeof SoundScape !== 'undefined') SoundScape.sfx('collect');
      });
    });

    const startBtn = $('#btn-start');
    if (startBtn) {
      startBtn.textContent = isEn ? 'Step onto Miguel Street' : '步入第一人称街景';
    }
  }

  $('#btn-sound').addEventListener('click', () => {
    SoundScape.setOn(!SoundScape.on);
    $('#btn-sound').textContent = SoundScape.on ? '声音 · 开' : '声音 · 关';
  });

  // 卡里普索留声机切歌
  const gramoBtn = $('#btn-gramophone');
  if (gramoBtn) {
    gramoBtn.addEventListener('click', () => {
      const trk = SoundScape.nextTrack();
      const isEn = state.lang === 'EN';
      const span = $('#gramophone-track');
      if (span) span.textContent = isEn ? trk.name : trk.nameZh;
      $('#btn-sound').textContent = SoundScape.on ? (isEn ? 'Sound · ON' : '声音 · 开') : (isEn ? 'Sound · OFF' : '声音 · 关');
      if (runtime.mode === 'dialogue') {
        appendLine('voice', isEn ? '[GRAMOPHONE]' : '[留声机]', `${isEn ? 'Now Playing: ' : '正在播放: '} ${isEn ? trk.name : trk.nameZh} (${trk.artist})`, '#d9a441');
      }
    });
  }

  // 终章重新开始
  $('#curtain-restart').addEventListener('click', () => {
    state.collected = [];
    save();
    location.reload();
  });

  // 启动
  window.addEventListener('DOMContentLoaded', initStreetView);
})();
