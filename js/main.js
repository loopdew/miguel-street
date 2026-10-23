/* ==========================================================
   米格尔街 · 极乐迪斯科质感控制器 (main.js)
   - 角色街头走动漫步 / 镜头平滑追踪 / 点击波纹
   - 极乐迪斯科式思绪光球 (Thought Orbs) / 街头互动遭遇
   - 极乐迪斯科 2d6 掷骰检定 / 内心声音插话 / 8大完整章节
   - 中英双语一键无缝切换（尊重原著文学性）
   ========================================================== */
(() => {
  const $ = s => document.querySelector(s);
  const $$ = s => document.querySelectorAll(s);

  const KEY = 'miguel-disco.v3';
  let state = {
    collected: [],
    ended: false,
    archetype: 'dreamer',
    lang: 'CN', // 'CN' | 'EN'
    stats: { memory: 3, imagine: 5, empathy: 3, street: 1, nerve: 2 }
  };

  try {
    const saved = JSON.parse(localStorage.getItem(KEY));
    if (saved) state = { ...state, ...saved };
  } catch (e) {}

  const save = () => {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
  };

  const isDone = id => state.collected.includes(id);

  // 漫步主角系统 (Avatar 2.5D 深度视差与物理行走系统)
  const avatar = {
    x: 8,       // 街道X百分比 0 ~ 100%
    y: 72,      // 街道Y路面深度百分比 63% (路牙) ~ 81% (近景柏油路)
    targetX: 8,
    targetY: 72,
    vx: 0,      // X方向速度
    vy: 0,      // Y方向速度
    dir: 1,     // 朝向 1: 向右, -1: 向左
    facingScaleX: 1, // 平滑插值转身系数
    scale: 1,   // 深度透视缩放比例
    walking: false,
    stridePhase: 0,  // 步态周期相位
    lastStepSign: 0, // 脚步落地检测
    onArrival: null,
    activeThought: null,
  };

  // 运行时上下文
  const runtime = {
    mode: 'intro', // 'intro' | 'street' | 'scene' | 'dialogue' | 'sheet' | 'book'
    camX: 0,
    targetCamX: 0,
    activeChapter: null,
    typing: null,
    advanceResolver: null,
    rolling: false,
  };

  /* ================= 1. 初始化人物特质与角色选择 ================= */
  function initIntro() {
    renderIntroArchetypes();

    $('#btn-start').disabled = false;
    $('#btn-start').addEventListener('click', () => {
      $('#intro').classList.add('hidden');
      enterStreet();
    });
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
        $('#btn-start').disabled = false;
        if (typeof SoundScape !== 'undefined') SoundScape.sfx('collect');
      });
    });

    $('#btn-start').textContent = isEn ? 'Step onto Miguel Street' : '走上米格尔街';
  }

  /* ================= 2. 街道漫步、角色移动与视差系统 ================= */
  let movedDistance = 0;
  const keysDown = {};

  function initStreet() {
    const street = $('#street');
    const inner = $('#street-inner');
    const img = $('#street-img');

    img.onload = () => { layoutHotspots(); updateAvatarDom(); };
    if (img.complete) { layoutHotspots(); updateAvatarDom(); }

    // 拖拽与路面点击移动
    let isPointerDown = false;
    let startX = 0;
    let startCam = 0;
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    const dragThreshold = isTouchDevice ? 12 : 6;

    street.addEventListener('pointerdown', e => {
      if (runtime.mode !== 'street') return;
      isPointerDown = true;
      startX = e.clientX;
      startCam = runtime.camX;
      movedDistance = 0;
    });

    window.addEventListener('pointermove', e => {
      if (!isPointerDown) return;
      const dx = e.clientX - startX;
      movedDistance += Math.abs(dx);
      if (movedDistance > dragThreshold) {
        street.classList.add('dragging');
        setCam(startCam - dx);
      }
    });

    window.addEventListener('pointerup', e => {
      if (!isPointerDown) return;
      isPointerDown = false;
      street.classList.remove('dragging');

      // 如果位移很小，判定为点击路面：主角走向该位置
      if (movedDistance <= dragThreshold) {
        const rect = inner.getBoundingClientRect();
        const clickPx = e.clientX - rect.left;
        const clickPy = e.clientY - rect.top;
        const totalW = inner.scrollWidth || 2400;
        const clickPctX = Math.max(1, Math.min(99, (clickPx / totalW) * 100));
        const clickPctY = (clickPy / rect.height) * 100;

        // 仅当点击在路面区域（y > 42%）时触发地面罗盘光圈与漫步
        if (clickPctY > 42) {
          spawnRipple(clickPx, clickPy);
          const targetY = Math.max(63, Math.min(81, clickPctY));
          walkAvatarTo(clickPctX, targetY);
        }
      }
    });

    // 滚轮漫游
    window.addEventListener('wheel', e => {
      if (runtime.mode !== 'street') return;
      setCam(runtime.camX + (Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY) * 1.5);
    }, { passive: true });

    // 键盘移动 (A / D / W / S / 方向键)
    window.addEventListener('keydown', e => {
      if (runtime.mode === 'street') {
        keysDown[e.code] = true;
        if (e.code === 'KeyC') toggleSheet();
        if (e.code === 'KeyB') toggleBook();
        if (e.code === 'Space') {
          // 若有思绪光球激活，按空格直接倾听思绪
          if (avatar.activeThought) {
            e.preventDefault();
            triggerThoughtOrb(avatar.activeThought);
          }
        }
      } else if (runtime.mode === 'dialogue') {
        if (e.code === 'Space' || e.code === 'Enter') {
          e.preventDefault();
          advanceDialogue();
        }
        if (e.code === 'Escape') {
          exitToStreet();
        }
      } else if (runtime.mode === 'sheet' || runtime.mode === 'book') {
        if (e.code === 'Escape') {
          closeModals();
        }
      }
    });

    window.addEventListener('keyup', e => {
      delete keysDown[e.code];
    });

    // 核心心跳循环：更新主角行走与镜头跟踪
    let lastTime = performance.now();
    function tick(now) {
      const dt = Math.min(0.06, (now - lastTime) / 1000);
      lastTime = now;

      if (runtime.mode === 'street') {
        // 键盘移动控制 (A/D/Left/Right 左右走，W/S/Up/Down 纵深走)
        let moveX = 0;
        let moveY = 0;
        if (keysDown['KeyA'] || keysDown['ArrowLeft']) moveX -= 1;
        if (keysDown['KeyD'] || keysDown['ArrowRight']) moveX += 1;
        if (keysDown['KeyW'] || keysDown['ArrowUp']) moveY -= 1;
        if (keysDown['KeyS'] || keysDown['ArrowDown']) moveY += 1;

        if (moveX !== 0 || moveY !== 0) {
          walkAvatarTo(
            Math.max(1, Math.min(99, avatar.x + moveX * dt * 16)),
            Math.max(63, Math.min(81, avatar.y + moveY * dt * 9))
          );
        }

        updateAvatarMovement(dt);
        checkThoughtOrbs();
      }

      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    function setCam(x) {
      const maxScroll = Math.max(0, inner.scrollWidth - window.innerWidth);
      runtime.camX = Math.max(0, Math.min(maxScroll, x));
      inner.style.transform = `translate3d(${-runtime.camX}px, 0, 0)`;
    }
    runtime.setCam = setCam;
  }

  function spawnRipple(x, y) {
    const inner = $('#street-inner');
    const rip = document.createElement('div');
    rip.className = 'click-ripple';
    rip.style.left = `${x}px`;
    rip.style.top = `${y}px`;
    inner.appendChild(rip);
    setTimeout(() => rip.remove(), 600);
    if (typeof SoundScape !== 'undefined') SoundScape.sfx('step');
  }

  function walkAvatarTo(targetX, targetY, onArrival = null) {
    if (typeof targetY === 'function') {
      onArrival = targetY;
      targetY = avatar.y;
    }
    avatar.targetX = Math.max(1, Math.min(99, targetX));
    avatar.targetY = Math.max(63, Math.min(81, targetY !== undefined ? targetY : avatar.y));
    avatar.onArrival = onArrival;
    const dx = avatar.targetX - avatar.x;
    const dy = avatar.targetY - avatar.y;
    if (Math.hypot(dx, dy) > 0.25) {
      if (Math.abs(dx) > 0.2) {
        avatar.dir = dx > 0 ? 1 : -1;
      }
      avatar.walking = true;
    }
  }

  function updateAvatarMovement(dt) {
    const avEl = $('#avatar');
    if (!avEl) return;
    const spriteEl = avEl.querySelector('.avatar-sprite');
    const shadowEl = avEl.querySelector('.avatar-shadow');
    const inner = $('#street-inner');
    const totalW = inner.scrollWidth || 2400;
    const totalH = inner.clientHeight || 800;

    const dx = avatar.targetX - avatar.x;
    const dy = avatar.targetY - avatar.y;
    const dist = Math.hypot(dx, dy);

    if (dist > 0.25) {
      avatar.walking = true;
      if (Math.abs(dx) > 0.25) {
        avatar.dir = dx > 0 ? 1 : -1;
      }

      // 物理缓动与接近阻尼减速（消灭卡顿与突兀骤停）
      const maxSpeed = 16.5; // %/秒
      const desiredSpeed = Math.min(maxSpeed, Math.max(2.2, dist * 3.6));
      const targetVx = (dx / dist) * desiredSpeed;
      const targetVy = (dy / dist) * desiredSpeed * 0.55;

      const accel = Math.min(1, dt * 9.0);
      avatar.vx += (targetVx - avatar.vx) * accel;
      avatar.vy += (targetVy - avatar.vy) * accel;

      avatar.x += avatar.vx * dt;
      avatar.y += avatar.vy * dt;

      // 步态相位与脚印落地/音效同步
      const currentSpeed = Math.hypot(avatar.vx, avatar.vy);
      avatar.stridePhase += dt * currentSpeed * 0.85;

      const currentStepSign = Math.sin(avatar.stridePhase) > 0 ? 1 : -1;
      if (avatar.lastStepSign !== 0 && currentStepSign !== avatar.lastStepSign) {
        const footX = (avatar.x / 100) * totalW - avatar.dir * 8;
        const footY = (avatar.y / 100) * totalH + 2;
        spawnDustPuff(footX, footY);
        if (typeof SoundScape !== 'undefined') SoundScape.sfx('step');
      }
      avatar.lastStepSign = currentStepSign;

      // 有机步态起伏与身体重心倾斜
      if (spriteEl) {
        const bobY = -Math.abs(Math.sin(avatar.stridePhase)) * 5.5;
        const sway = Math.sin(avatar.stridePhase) * 2.5 * avatar.dir;
        const lean = (avatar.vx / maxSpeed) * 4.5;
        spriteEl.style.transform = `translateY(${bobY}px) rotate(${sway + lean}deg)`;
      }
      if (shadowEl) {
        const bobY = -Math.abs(Math.sin(avatar.stridePhase)) * 5.5;
        const shadowScale = 1 - Math.abs(bobY) / 24;
        shadowEl.style.transform = `translateX(-40%) scale(${shadowScale}, ${shadowScale * 0.88}) rotate(-3deg)`;
        shadowEl.style.opacity = (0.72 + shadowScale * 0.28).toFixed(2);
      }

      // 镜头平滑居中跟随主角
      const avatarPx = (avatar.x / 100) * totalW;
      const targetCam = avatarPx - window.innerWidth * 0.48;
      runtime.camX += (targetCam - runtime.camX) * Math.min(1, dt * 4.5);
      runtime.setCam(runtime.camX);
    } else {
      avatar.vx *= 0.65;
      avatar.vy *= 0.65;
      if (Math.hypot(avatar.vx, avatar.vy) < 0.15) {
        avatar.vx = 0;
        avatar.vy = 0;
        if (avatar.walking) {
          avatar.walking = false;
          avatar.lastStepSign = 0;
          if (spriteEl) spriteEl.style.transform = '';
          if (shadowEl) {
            shadowEl.style.transform = 'translateX(-40%) rotate(-4deg)';
            shadowEl.style.opacity = '1';
          }
          if (avatar.onArrival) {
            const fn = avatar.onArrival;
            avatar.onArrival = null;
            fn();
          }
        }
      }
    }

    // 平滑转身角度过渡 (避免瞬间突变反向)
    avatar.facingScaleX += (avatar.dir - avatar.facingScaleX) * Math.min(1, dt * 14);

    // 视差深度缩放：路牙处(63%)为0.88倍，近处柏油路(81%)为1.10倍
    const depthFactor = (avatar.y - 63) / 18;
    avatar.scale = 0.88 + Math.max(0, Math.min(1, depthFactor)) * 0.22;

    updateAvatarDom();
  }

  function spawnDustPuff(x, y) {
    const inner = $('#street-inner');
    const d = document.createElement('div');
    d.className = 'dust-puff';
    d.style.left = `${x}px`;
    d.style.top = `${y}px`;
    inner.appendChild(d);
    setTimeout(() => d.remove(), 650);
  }

  function updateAvatarDom() {
    const avEl = $('#avatar');
    if (!avEl) return;
    avEl.style.left = `${avatar.x}%`;
    avEl.style.top = `${avatar.y}%`;
    avEl.style.transform = `translate(-50%, -100%) scale(${avatar.scale.toFixed(3)}) scaleX(${avatar.facingScaleX.toFixed(3)})`;
    avEl.style.zIndex = Math.round(avatar.y * 10);
  }

  /* ================= 3. 思绪光球与街头遭遇 ================= */
  function checkThoughtOrbs() {
    const orbEl = $('#thought-orb');
    if (!orbEl) return;
    const isEn = state.lang === 'EN';

    // 寻找距离主角在 3.5% 范围内的思绪
    const match = THOUGHT_ORBS.find(t => Math.abs(t.atX - avatar.x) < 3.8);
    if (match) {
      if (avatar.activeThought !== match) {
        avatar.activeThought = match;
        const vInfo = VOICES[match.voice];
        const vTitle = isEn ? match.textEn : match.text;
        const vVoice = isEn ? vInfo.en : vInfo.name;

        orbEl.style.setProperty('--voice-accent', vInfo.color);
        orbEl.style.borderColor = vInfo.color;
        orbEl.querySelector('.orb-icon').style.color = vInfo.color;
        orbEl.querySelector('.orb-text').innerHTML = `[${vVoice}] ${vTitle}`;
        orbEl.classList.remove('hidden');

        orbEl.onclick = e => {
          e.stopPropagation();
          triggerThoughtOrb(match);
        };
      }
    } else {
      if (avatar.activeThought) {
        avatar.activeThought = null;
        orbEl.classList.add('hidden');
      }
    }
  }

  function triggerThoughtOrb(t) {
    const isEn = state.lang === 'EN';
    const vInfo = VOICES[t.voice];
    const text = isEn ? t.en : t.x;
    const title = isEn ? t.textEn : t.text;
    const vName = isEn ? vInfo.en : vInfo.name;

    SoundScape.sfx('star');
    showToast(`
      <div style="color:${vInfo.color}; font-weight:700; letter-spacing:.2em; font-size:12px;">[${vName}] ${title}</div>
      <div style="margin-top:4px;">${text}</div>
    `, 4200);
  }

  /* ================= 4. 热点排布与街头场景 ================= */
  function layoutHotspots() {
    const hBox = $('#hotspots');
    if (!hBox) return;
    hBox.innerHTML = '';
    const isEn = state.lang === 'EN';
    const inner = $('#street-inner');
    const totalW = inner ? (inner.scrollWidth || 2400) : 2400;

    // 8大章节房屋热点 (极乐迪斯科风 建筑门牌与门阶暖光)
    CHAPTERS.forEach(ch => {
      const el = document.createElement('div');
      el.className = `hot ${isDone(ch.id) ? 'done' : ''}`;
      el.style.left = `${ch.hot.x}%`;
      el.style.top = `${ch.hot.y}%`;
      el.style.width = `${ch.hot.w}%`;
      el.style.height = `${ch.hot.h}%`;
      el.dataset.id = ch.id;

      const plaqueLeft = ch.hot.pin ? ((ch.hot.pin[0] - ch.hot.x) / ch.hot.w) * 100 : 50;
      const plaqueTop = ch.hot.pin ? ((ch.hot.pin[1] - ch.hot.y) / ch.hot.h) * 100 : 65;
      const isTopNear = (ch.hot.pin ? ch.hot.pin[1] : ch.hot.y) < 32;

      // 门前石阶Y坐标 (在房屋底沿稍下侧路面)
      const glowTop = 96;

      const tipData = (isDone(ch.id) && ch.tipAfter) ? ch.tipAfter : ch.tip;
      const tipVoice = tipData ? VOICES[tipData.v] : null;
      const tipText = tipData ? (isEn ? (tipData.en || tipData.x) : tipData.x) : '';
      const voiceName = tipVoice ? (isEn ? tipVoice.en : tipVoice.name) : '';
      const voiceColor = tipVoice ? tipVoice.color : 'var(--ochre)';

      el.innerHTML = `
        <div class="doorstep-glow" style="left:${plaqueLeft}%; top:${glowTop}%;"></div>
        <div class="street-plaque" style="left:${plaqueLeft}%; top:${plaqueTop}%;">
          <span class="plaque-gem"></span>
          <span class="plaque-roman">${ch.no}</span>
          <span class="plaque-title">${isEn ? ch.sub : ch.title}</span>
          ${isDone(ch.id) ? '<span class="plaque-check">✓</span>' : ''}
        </div>
        <div class="tag ${isTopNear ? 'tag-down' : ''}" style="left:${plaqueLeft}%; top:${plaqueTop}%;">
          <div class="tag-header">
            <span class="tag-roman">${ch.no}</span>
            <span class="tag-title">${isEn ? ch.sub : ch.title}</span>
            ${isDone(ch.id) ? `<span class="tag-done">✓ ${isEn ? 'Recorded' : '记忆已留存'}</span>` : ''}
          </div>
          <div class="tag-sub">${isEn ? ch.title : ch.sub}</div>
          <div class="tag-lore"><span style="color:${voiceColor}; font-weight:700; font-size:11px;">[${voiceName}]</span> ${tipText}</div>
        </div>
      `;

      el.addEventListener('click', (e) => {
        if (movedDistance > 8) return;
        e.stopPropagation();
        // 主角漫步走向房屋门前石阶处，抵达后切入剧情
        const doorstepX = ch.hot.pin ? ch.hot.pin[0] : (ch.hot.x + ch.hot.w / 2);
        const doorstepY = Math.max(64, Math.min(73, (ch.hot.y + ch.hot.h) + 2));

        const rect = inner.getBoundingClientRect();
        spawnRipple((doorstepX / 100) * totalW, (doorstepY / 100) * rect.height);
        walkAvatarTo(doorstepX, doorstepY, () => triggerChapter(ch));
      });
      hBox.appendChild(el);
    });

    // 街头遭遇点 (曼曼的粉笔字、巴库的破车、流浪狗)
    STREET_ENCOUNTERS.forEach(enc => {
      const el = document.createElement('div');
      el.className = 'encounter-marker';
      el.style.left = `${enc.x}%`;
      el.style.top = `${enc.y}%`;

      let glyph = '✦';
      if (enc.id === 'manman') glyph = '✎';
      else if (enc.id === 'bhakcu') glyph = '⚙';
      else if (enc.id === 'dog') glyph = '🐾';

      const v = VOICES[enc.voice];
      const vColor = v ? v.color : 'var(--ochre)';

      el.innerHTML = `
        <div class="enc-badge" style="--voice-color: ${vColor};">
          <span class="enc-glyph">${glyph}</span>
          <span class="enc-name">${isEn ? enc.sub : enc.name}</span>
        </div>
      `;
      el.addEventListener('click', e => {
        if (movedDistance > 8) return;
        e.stopPropagation();
        const rect = inner.getBoundingClientRect();
        const encY = Math.max(64, Math.min(80, enc.y));
        spawnRipple((enc.x / 100) * totalW, (encY / 100) * rect.height);
        walkAvatarTo(enc.x, encY, () => {
          const text = isEn ? enc.textEn : enc.text;
          const name = isEn ? enc.sub : enc.name;
          SoundScape.sfx('collect');
          showToast(`<b>${name}</b><br><span style="color:${v.color}">[${isEn ? v.en : v.name}]</span> ${text}`);
        });
      });
      hBox.appendChild(el);
    });

    // 终章热点：离开米格尔街
    const fin = FINALE;
    const fEl = document.createElement('div');
    const isReady = state.collected.length === CHAPTERS.length;
    fEl.className = `hot ${isReady ? '' : 'locked'}`;
    fEl.style.left = `${fin.hot.x}%`;
    fEl.style.top = `${fin.hot.y}%`;
    fEl.style.width = `${fin.hot.w}%`;
    fEl.style.height = `${fin.hot.h}%`;
    fEl.dataset.id = 'finale';

    const finPlaqueLeft = fin.hot.pin ? ((fin.hot.pin[0] - fin.hot.x) / fin.hot.w) * 100 : 50;
    const finPlaqueTop = fin.hot.pin ? ((fin.hot.pin[1] - fin.hot.y) / fin.hot.h) * 100 : 60;

    fEl.innerHTML = `
      <div class="doorstep-glow" style="left:${finPlaqueLeft}%; top:${fin.hot.h + 6}%;"></div>
      <div class="street-plaque" style="left:${finPlaqueLeft}%; top:${finPlaqueTop}%;">
        <span class="plaque-gem" style="background:${isReady ? 'var(--ochre)' : '#777'};"></span>
        <span class="plaque-roman">${fin.no}</span>
        <span class="plaque-title">${isEn ? fin.sub : fin.title}</span>
        ${isReady ? '<span class="plaque-check">✈</span>' : '<span style="font-size:10px; opacity:.7;">🔒</span>'}
      </div>
      <div class="tag" style="left:${finPlaqueLeft}%; top:${finPlaqueTop}%;">
        <div class="tag-header">
          <span class="tag-roman">${fin.no}</span>
          <span class="tag-title">${isEn ? fin.sub : fin.title}</span>
        </div>
        <div class="tag-sub">${isEn ? fin.title : fin.sub}</div>
        <div class="tag-lore">${isEn ? fin.tip.en : fin.tip.x}</div>
        ${!isReady ? `<div class="tag-lock">${isEn ? `Requires all 8 chapters (${state.collected.length}/8)` : `需走访全部8位街坊 (${state.collected.length}/8)`}</div>` : ''}
      </div>
    `;
    fEl.addEventListener('click', (e) => {
      if (movedDistance > 8) return;
      e.stopPropagation();
      if (!isReady) {
        const remaining = CHAPTERS.length - state.collected.length;
        showToast(isEn ?
          `The road leads to Piarco Airport.<br>You still have <b>${remaining}</b> neighbour stories left unremembered.` :
          `路标指向皮亚科机场。<br>但你还有 <b>${remaining}</b> 位邻居的故事未曾听闻。`);
      } else {
        const rect = inner.getBoundingClientRect();
        spawnRipple((96 / 100) * totalW, (74 / 100) * rect.height);
        walkAvatarTo(96, 74, () => triggerChapter(fin, true));
      }
    });
    hBox.appendChild(fEl);

    updateBookCounter();
  }

  function showTooltip(e, data) {
    const tt = $('#tooltip');
    const isEn = state.lang === 'EN';
    const tipData = (isDone(data.id) && data.tipAfter) ? data.tipAfter : data.tip;
    if (!tipData) return;
    const voice = VOICES[tipData.v];
    const tipText = isEn ? (tipData.en || tipData.x) : tipData.x;
    const voiceName = isEn ? voice.en : voice.name;

    tt.innerHTML = `
      <div class="vname" style="color:${voice.color}">[${voiceName}]</div>
      <div>${tipText}</div>
    `;
    tt.classList.remove('hidden');

    const rect = e.target.getBoundingClientRect();
    let topPos = rect.top - 95;
    if (topPos < 80) topPos = rect.bottom + 14;

    tt.style.left = `${Math.min(window.innerWidth - 390, Math.max(20, rect.left + rect.width / 2 - 180))}px`;
    tt.style.top = `${topPos}px`;
  }

  function hideTooltip() {
    $('#tooltip').classList.add('hidden');
  }

  function enterStreet() {
    runtime.mode = 'street';
    document.body.className = 'g-dusk';
    $('#scene').classList.add('hidden');
    $('#panel').classList.add('hidden');
    layoutHotspots();
    updateAvatarDom();
    const inner = $('#street-inner');
    if (inner) {
      const totalW = inner.scrollWidth || 2400;
      const avatarPx = (avatar.x / 100) * totalW;
      runtime.setCam(avatarPx - window.innerWidth * 0.48);
    }
    SoundScape.setOn(true);
    SoundScape.setMode('calypso');
  }

  /* ================= 5. 对话流与极乐迪斯科式心理机制 ================= */
  async function triggerChapter(ch, isFinale = false) {
    hideTooltip();
    runtime.mode = 'dialogue';
    runtime.activeChapter = ch;
    document.body.classList.add('in-scene');

    wipeCanvasNow();

    const bgName = ch.id;
    const bgUrl = SCENES[bgName] || SCENES.street;
    const sceneEl = $('#scene');
    const sceneBg = $('#scene-bg');
    sceneBg.style.backgroundImage = `url(${bgUrl})`;
    sceneEl.classList.remove('hidden');

    const panel = $('#panel');
    panel.classList.remove('hidden');
    $('#log').innerHTML = '';
    $('#options').innerHTML = '';

    updatePortrait(ch.portrait || ch.id);

    SoundScape.sfx('page');
    const finished = await runStepSequence(ch.steps, ch);

    if (finished) {
      if (isFinale) {
        showCurtain();
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
        const h = $(`.hot[data-id="${ch.id}"]`);
        if (h) h.classList.add('done');
      }
    }
  }

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
    } else if (PORTRAIT_FALLBACK[sp.portrait]) {
      const [fImg, fPos] = PORTRAIT_FALLBACK[sp.portrait];
      pEl.style.backgroundImage = `url(${fImg})`;
      pEl.style.backgroundPosition = fPos;
    }

    if (isEn) {
      nameEl.innerHTML = `${sp.en || sp.name}`;
    } else {
      nameEl.innerHTML = `${sp.name} <small>${sp.en || ''}</small>`;
    }
  }

  async function runStepSequence(steps, ch) {
    const isEn = state.lang === 'EN';
    for (let i = 0; i < steps.length; i++) {
      if (runtime.mode !== 'dialogue') return false;
      const st = steps[i];

      if (st.g) document.body.className = `in-scene g-${st.g}`;
      if (st.music) SoundScape.setMode(st.music);

      if (st.bg && SCENES[st.bg]) {
        $('#scene-bg').style.backgroundImage = `url(${SCENES[st.bg]})`;
      }

      if (st.s && SPEAKERS[st.s] && SPEAKERS[st.s].portrait) updatePortrait(st.s);

      // 内心声音插话
      if (st.v) {
        const vInfo = VOICES[st.v];
        const statVal = state.stats[st.v] || 0;
        if (statVal >= (st.lvl || 1)) {
          const vName = isEn ? vInfo.en : vInfo.name;
          const voiceText = isEn ? (st.en || st.x) : st.x;
          const passTag = isEn ? `[PASSED: ${statVal} ≥ ${st.lvl || 1}]` : `[通过: ${statVal} ≥ ${st.lvl || 1}]`;
          appendLine('voice', `[${vName}]`, voiceText, vInfo.color, passTag);
        }
      }

      // 微交互
      if (st.fx) {
        await Fx.run(st.fx, st.tip);
      }

      // 对话渲染
      if (!st.v && (st.x || st.en)) {
        const lineText = isEn ? (st.en || st.x) : st.x;
        await typeDialogue(st.s, lineText);
      }

      // 选项分支
      if (st.choice) {
        const branchSteps = await presentChoices(st.choice);
        if (branchSteps && branchSteps.length > 0) {
          const subDone = await runStepSequence(branchSteps, ch);
          if (!subDone) return false;
        }
      }
    }
    return true;
  }

  function appendLine(type, who, text, whoColor = null, tag = '') {
    const log = $('#log');
    const ln = document.createElement('div');
    ln.className = `ln ${type}`;
    if (whoColor) {
      ln.style.setProperty('--voice-accent', whoColor);
    }

    let whoHtml = '';
    if (who) {
      whoHtml = `<span class="who" ${whoColor ? `style="color:${whoColor}"` : ''}>${who}</span>`;
    }
    let tagHtml = tag ? `<span class="chk">${tag}</span>` : '';

    ln.innerHTML = `${whoHtml}${tagHtml}${text}`;
    log.appendChild(ln);
    log.scrollTop = log.scrollHeight;
    return ln;
  }

  function typeDialogue(speakerKey, html) {
    return new Promise(resolve => {
      const btnCont = $('#btn-continue');
      btnCont.classList.remove('hidden');

      const isEn = state.lang === 'EN';
      const sp = SPEAKERS[speakerKey] || SPEAKERS.narr;
      const type = (speakerKey === 'narr' || !speakerKey) ? 'narr' : (speakerKey === 'me' ? 'me' : 'npc');
      const who = isEn ? (sp.en || sp.name) : sp.name;

      const plain = html.replace(/<[^>]+>/g, '');
      const ln = appendLine(type, who, '');

      let idx = 0;
      let interval = null;

      const finish = () => {
        clearInterval(interval);
        runtime.typing = null;
        runtime.advanceResolver = null;
        ln.innerHTML = (who ? `<span class="who">${who}</span>` : '') + html;
        btnCont.classList.add('hidden');
        resolve();
      };

      runtime.typing = finish;
      runtime.advanceResolver = finish;

      if (location.hash.includes('choices')) {
        finish();
        return;
      }

      btnCont.onclick = (e) => {
        e.stopPropagation();
        if (runtime.typing) finish();
      };

      interval = setInterval(() => {
        idx += 3;
        ln.innerHTML = (who ? `<span class="who">${who}</span>` : '') + plain.slice(0, idx);
        $('#log').scrollTop = $('#log').scrollHeight;
        if (idx >= plain.length) {
          clearInterval(interval);
          runtime.typing = null;
        }
      }, 20);
    });
  }

  function advanceDialogue() {
    if (runtime.advanceResolver) {
      runtime.advanceResolver();
    }
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

        if (opt.check) {
          const vInfo = VOICES[opt.check.v];
          const stat = state.stats[opt.check.v] || 0;
          const diff = opt.check.dc - stat;
          const odds = isEn ?
            (diff <= 4 ? 'Very High' : (diff <= 6 ? 'High' : (diff <= 8 ? 'Medium' : 'Challenging'))) :
            (diff <= 4 ? '极高' : (diff <= 6 ? '较高' : (diff <= 8 ? '中等' : '艰难')));
          const vName = isEn ? vInfo.en : vInfo.name;
          checkTag = `<span class="ck" style="color:${vInfo.color}">[${vName} ${isEn ? 'CHECK' : '检定'}]</span>`;
          oddsTag = `<span class="odds">(${odds})</span>`;
        }

        const rawLabel = isEn ? (opt.labelEn || opt.label) : opt.label;
        const labelText = opt.check ? rawLabel.replace(/^\[[^\]]+\]\s*/, '') : rawLabel;
        btn.innerHTML = `<span class="num">${idx + 1}.</span>${checkTag}${labelText} ${oddsTag}`;

        btn.addEventListener('click', async () => {
          optBox.innerHTML = '';
          appendLine('picked', '', labelText);

          if (opt.check) {
            const pass = await performDiceRoll(opt.check);
            if (pass) {
              resolve(opt.pass || []);
            } else {
              resolve(opt.fail || []);
            }
          } else {
            resolve(opt.then || []);
          }
        });

        optBox.appendChild(btn);
      });
    });
  }

  // 极乐迪斯科式 2d6 掷骰动画
  function performDiceRoll(check) {
    return new Promise(resolve => {
      runtime.rolling = true;
      const isEn = state.lang === 'EN';
      const diceBox = $('#dice');
      const skillEl = $('#dice-skill');
      const die1 = $('#die1');
      const die2 = $('#die2');
      const sumEl = $('#dice-sum');
      const resEl = $('#dice-result');

      const vInfo = VOICES[check.v];
      const statVal = state.stats[check.v] || 0;
      const vName = isEn ? vInfo.en : vInfo.name;

      skillEl.textContent = `${vName} · ${isEn ? 'DC' : '难度'} ${check.dc}`;
      skillEl.style.color = vInfo.color;
      die1.textContent = '?';
      die2.textContent = '?';
      sumEl.textContent = isEn ? `Base Attribute: +${statVal}` : `基础属性: +${statVal}`;
      resEl.textContent = '';
      resEl.className = 'dice-result';

      die1.classList.add('roll');
      die2.classList.add('roll');
      diceBox.classList.remove('hidden');

      setTimeout(() => {
        die1.classList.remove('roll');
        die2.classList.remove('roll');

        const d1 = Math.floor(Math.random() * 6) + 1;
        const d2 = Math.floor(Math.random() * 6) + 1;
        die1.textContent = d1;
        die2.textContent = d2;

        const total = d1 + d2 + statVal;
        const success = (d1 === 6 && d2 === 6) || (total >= check.dc && !(d1 === 1 && d2 === 1));

        sumEl.textContent = `${d1} + ${d2} + ${isEn ? 'Stat' : '属性'}(${statVal}) = ${total} (${isEn ? 'DC' : '难度'}: ${check.dc})`;

        if (success) {
          resEl.textContent = isEn ? 'CHECK SUCCESS' : 'CHECK SUCCESS / 成功';
          resEl.classList.add('ok');
          SoundScape.sfx('collect');
        } else {
          resEl.textContent = isEn ? 'CHECK FAILURE' : 'CHECK FAILURE / 失败';
          resEl.classList.add('bad');
          SoundScape.sfx('fizz');
        }

        setTimeout(() => {
          diceBox.classList.add('hidden');
          runtime.rolling = false;
          resolve(success);
        }, 1500);
      }, 850);
    });
  }

  function wipeCanvasNow() {
    const cEl = $('#fx');
    if (cEl) {
      const ctx = cEl.getContext('2d');
      if (ctx) {
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, cEl.width, cEl.height);
        ctx.restore();
      }
      cEl.classList.remove('on');
    }
  }

  function exitToStreet() {
    Fx.abort();
    wipeCanvasNow();
    $('#panel').classList.add('hidden');
    $('#scene').classList.add('hidden');
    document.body.classList.remove('in-scene');
    enterStreet();
  }

  $('#btn-leave').addEventListener('click', exitToStreet);

  /* ================= 6. 语言切换机制 (CN / EN) ================= */
  function updateLanguageDisplay() {
    const isEn = state.lang === 'EN';
    $('#lang-val').textContent = state.lang;
    $('#btn-sound').textContent = SoundScape.on ?
      (isEn ? 'Audio · On' : '声音 · 开') :
      (isEn ? 'Audio · Off' : '声音 · 关');

    $('#btn-sheet').innerHTML = `${isEn ? 'Mind' : '内心'} <kbd>C</kbd>`;
    $('#btn-book').innerHTML = `${isEn ? 'Sketchbook' : '速写簿'} <b id="book-count">${state.collected.length}/${CHAPTERS.length}</b> <kbd>B</kbd>`;
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    $('#pan-hint').textContent = isTouch ?
      (isEn ? '← Swipe to Explore · Tap Road to Walk · Tap Sign to Enter →' : '← 单指滑动漫游街道 · 点击路面漫步 · 点击门牌开启故事 →') :
      (isEn ? '← Click Road to Walk / A-D to Move / Drag or Scroll Street →' : '← 点击路面漫步 / A-D键行走 / 滚轮探索米格尔街 →');

    const trk = SoundScape.getTrackInfo();
    const gSpan = $('#gramophone-track');
    if (gSpan && trk) {
      gSpan.textContent = isEn ? trk.name : trk.nameZh;
    }

    layoutHotspots();
    renderIntroArchetypes();
    if (!$("#sheet").classList.contains('hidden')) renderSheet();
    if (!$("#book").classList.contains('hidden')) renderBook();

    if (runtime.activeChapter) {
      updatePortrait(runtime.activeChapter.id);
    }
  }

  $('#btn-lang').addEventListener('click', () => {
    state.lang = state.lang === 'CN' ? 'EN' : 'CN';
    save();
    updateLanguageDisplay();
    showToast(state.lang === 'EN' ?
      '<b>Language Switched to English</b><br><small>Faithful excerpts from V.S. Naipaul\'s original 1959 prose.</small>' :
      '<b>语言已切换至中文</b><br><small>根据 V.S. 奈保尔原著精校文学汉化</small>', 2000);
  });

  /* ================= 7. 内心声音面板与速写簿 ================= */
  function toggleSheet() {
    const s = $('#sheet');
    if (s.classList.contains('hidden')) {
      renderSheet();
      s.classList.remove('hidden');
    } else {
      s.classList.add('hidden');
    }
  }

  function renderSheet() {
    const list = $('#sheet-list');
    const isEn = state.lang === 'EN';
    list.innerHTML = Object.entries(VOICES).map(([k, v]) => {
      const val = state.stats[k] || 0;
      return `
        <div class="skill" style="color:${v.color}">
          <div class="nm">${isEn ? v.en : v.name}<small>${isEn ? v.name : v.en}</small></div>
          <div>
            <div class="pips">
              ${[1, 2, 3, 4, 5, 6].map(i => `<i class="${i <= val ? 'on' : ''}"></i>`).join('')}
            </div>
            <div class="ds">${v.desc}</div>
          </div>
        </div>
      `;
    }).join('');
  }

  function toggleBook() {
    const b = $('#book');
    if (b.classList.contains('hidden')) {
      renderBook();
      b.classList.remove('hidden');
    } else {
      b.classList.add('hidden');
    }
  }

  function renderBook() {
    const grid = $('#book-grid');
    const isEn = state.lang === 'EN';
    grid.innerHTML = CHAPTERS.map(ch => {
      const done = isDone(ch.id);
      const portUrl = PORTRAITS[ch.portrait || ch.id] || (PORTRAIT_FALLBACK[ch.id] ? PORTRAIT_FALLBACK[ch.id][0] : 'assets/title.jpg');
      const title = done ? (isEn ? ch.sub : ch.title) : '？？？';
      const sub = isEn ? ch.title : ch.sub;
      const itemName = isEn ? (ch.item.nameEn || ch.item.name) : ch.item.name;
      const itemDesc = isEn ? (ch.item.descEn || ch.item.desc) : ch.item.desc;
      const tipText = isEn ? (ch.tip.en || ch.tip.x) : ch.tip.x;
      const noteText = isEn ? (ch.noteEn || ch.note) : ch.note;

      return `
        <article class="entry ${done ? '' : 'locked'}">
          <div class="pic" style="background-image:url(${portUrl});"></div>
          <div>
            <h3>${title}</h3>
            <div class="ch">${ch.no} · ${sub}</div>
            <div class="item">
              ${done ? `${isEn ? 'Relic' : '信物'}：<b>${itemName}</b><br><small>${itemDesc}</small>` : `<small>${tipText}</small>`}
            </div>
            ${done ? `<div class="note">${noteText}</div>` : ''}
          </div>
        </article>
      `;
    }).join('');

    $('#book-progress').textContent = isEn ?
      `Collected ${state.collected.length} / ${CHAPTERS.length} Soul Fragments` :
      `已收集 ${state.collected.length} / ${CHAPTERS.length} 个灵魂切片`;
  }

  function updateBookCounter() {
    $('#book-count').textContent = `${state.collected.length}/${CHAPTERS.length}`;
  }

  function closeModals() {
    $('#sheet').classList.add('hidden');
    $('#book').classList.add('hidden');
  }

  $$('.sheet-close').forEach(b => b.addEventListener('click', closeModals));

  $('#btn-sheet').addEventListener('click', toggleSheet);
  $('#btn-book').addEventListener('click', toggleBook);
  $('#book-reset').addEventListener('click', () => {
    if (confirm(state.lang === 'EN' ? 'Clear all collected memories and start anew?' : '确认清空所有速写与回忆？')) {
      state.collected = [];
      state.ended = false;
      save();
      updateBookCounter();
      renderBook();
      exitToStreet();
    }
  });

  /* ================= 8. 提示框与落幕 ================= */
  let toastTimer = null;
  function showToast(html, duration = 3400) {
    const t = $('#toast');
    t.innerHTML = html;
    t.classList.remove('hidden');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.add('hidden'), duration);
  }

  function showCurtain() {
    const c = $('#curtain');
    const isEn = state.lang === 'EN';
    c.innerHTML = `
      <h2>MIGUEL STREET</h2>
      <p>${isEn ?
        'I left them all. I walked briskly across the tarmac towards the waiting plane.<br>I didn\'t look back. I looked only at my shadow,<br>which was like a dancing dwarf upon the runway.' :
        '我离开了他们，快步走向飞机。<br>我没有回头，只看着自己的影子——<br>一个在特立尼达跑道上跳舞的小矮人。'}</p>
      <div class="row">
        <button class="de-continue big" id="curtain-restart">${isEn ? 'Return to Miguel Street' : '重返米格尔街'}</button>
        <button class="de-btn" id="curtain-book">${isEn ? 'Review Sketchbook' : '回顾速写簿'}</button>
      </div>
    `;
    c.classList.remove('hidden');
    $('#curtain-restart').onclick = () => {
      c.classList.add('hidden');
      exitToStreet();
    };
    $('#curtain-book').onclick = () => {
      c.classList.add('hidden');
      toggleBook();
    };
  }

  // 声音开关
  $('#btn-sound').addEventListener('click', () => {
    SoundScape.setOn(!SoundScape.on);
    updateLanguageDisplay();
  });

  // 卡里普索留声机切歌
  const gramoBtn = $('#btn-gramophone');
  if (gramoBtn) {
    gramoBtn.addEventListener('click', () => {
      const trk = SoundScape.nextTrack();
      const isEn = state.lang === 'EN';
      const span = $('#gramophone-track');
      if (span) span.textContent = isEn ? trk.name : trk.nameZh;
      updateLanguageDisplay();
      if (runtime.mode === 'dialogue') {
        appendLine('voice', isEn ? '[GRAMOPHONE]' : '[留声机]', `${isEn ? 'Now Playing: ' : '正在播放: '} ${isEn ? trk.name : trk.nameZh} (${trk.artist})`, '#d9a441');
      }
    });
  }

  // 启动初始化
  initStreet();
  const hash = location.hash;
  if (hash.includes('hover') || hash.includes('choices')) {
    document.documentElement.classList.add('noanim');
    document.body.classList.add('noanim');
  }
  if (hash.includes('street') || hash.includes('open=')) {
    $('#intro').classList.add('hidden');
    enterStreet();
  } else {
    initIntro();
  }
  updateLanguageDisplay();

  const o = hash.match(/open=(\w+)/);
  if (o) {
    const ch = CHAPTERS.find(c => c.id === o[1]);
    if (ch) setTimeout(() => triggerChapter(ch), 300);
  }
  if (hash.includes('hover')) {
    setTimeout(() => {
      const h = document.querySelectorAll('.hot')[1];
      if (h) h.classList.add('focus');
      const orb = document.querySelector('#thought-orb');
      if (orb) {
        orb.classList.remove('hidden');
        orb.querySelector('.orb-text').textContent = '[街头] “裁缝”的伪装';
      }
    }, 300);
  }
})();