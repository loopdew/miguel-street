/* ==========================================================
   米格尔街 · 章节微玩法（Canvas）
   每个小游戏返回 Promise，完成后剧情继续。
   ========================================================== */
const Minigames = (() => {
  const canvas = () => document.getElementById('mini');
  const tipEl = () => document.getElementById('mini-tip');
  const doneEl = () => document.getElementById('mini-done');
  let current = null;

  function run(name, tip) {
    return new Promise(resolve => {
      const cv = canvas();
      cv.classList.add('on');
      const r = cv.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      cv.width = r.width * dpr; cv.height = r.height * dpr;
      const c = cv.getContext('2d'); c.setTransform(dpr, 0, 0, dpr, 0, 0);
      const listeners = []; let raf = 0, alive = true;
      const api = {
        c, W: r.width, H: r.height, cv,
        tip(t) { const el = tipEl(); el.textContent = t; el.classList.toggle('hidden', !t); },
        on(target, ev, fn) { target.addEventListener(ev, fn); listeners.push([target, ev, fn]); },
        pos(e) { const b = cv.getBoundingClientRect(); return { x: e.clientX - b.left, y: e.clientY - b.top }; },
        loop(fn) { let last = performance.now(); const f = now => { if (!alive) return; fn(Math.min(0.05, (now - last) / 1000), now / 1000); last = now; raf = requestAnimationFrame(f); }; raf = requestAnimationFrame(f); },
        showDone(label = '继续 →') { const b = doneEl(); b.textContent = label; b.classList.remove('hidden'); b.onclick = e => { e.stopPropagation(); finish(); }; },
      };
      function finish() {
        if (!alive) return; alive = false; current = null;
        cancelAnimationFrame(raf);
        listeners.forEach(([t, ev, fn]) => t.removeEventListener(ev, fn));
        cv.classList.remove('on'); tipEl().classList.add('hidden'); doneEl().classList.add('hidden');
        resolve();
      }
      current = finish;
      api.tip(tip);
      GAMES[name](api, finish);
    });
  }

  /* ---------------- 工具 ---------------- */
  const rand = (a, b) => a + Math.random() * (b - a);
  function grad(c, W, H, stops) { const g = c.createLinearGradient(0, 0, 0, H); stops.forEach(([o, col]) => g.addColorStop(o, col)); c.fillStyle = g; c.fillRect(0, 0, W, H); }
  function drawBoy(c, x, y, s, t, walking) {
    const bob = walking ? Math.abs(Math.sin(t * 9)) * 3 : 0, leg = walking ? Math.sin(t * 9) * 8 : 0;
    c.save(); c.translate(x, y - bob); c.scale(s, s);
    c.strokeStyle = '#7a5235'; c.lineWidth = 6; c.lineCap = 'round';
    c.beginPath(); c.moveTo(-4, -40); c.lineTo(-4 + leg, 0); c.moveTo(4, -40); c.lineTo(4 - leg, 0); c.stroke();
    c.fillStyle = '#2b6e82'; c.fillRect(-10, -52, 20, 16);
    c.fillStyle = '#f4ecd8'; c.beginPath(); c.moveTo(-12, -90); c.lineTo(12, -90); c.lineTo(11, -50); c.lineTo(-11, -50); c.fill();
    c.fillStyle = '#7a5235'; c.beginPath(); c.arc(0, -102, 12, 0, 7); c.fill();
    c.fillStyle = '#1f1610'; c.beginPath(); c.arc(0, -106, 12, Math.PI, 0); c.fill();
    // 行李箱
    c.fillStyle = '#8a4a2a'; c.fillRect(13, -50, 18, 14); c.strokeStyle = '#3a2a1e'; c.lineWidth = 2; c.strokeRect(13, -50, 18, 14);
    c.restore();
  }

  /* ================= 游戏定义 ================= */
  const GAMES = {
    /* ---- 波普：刨木头 ---- */
    plane(api, finish) {
      const { c, W, H } = api;
      const px = W * 0.12, pw = W * 0.76, py = H * 0.46, ph = Math.max(46, H * 0.15);
      const grain = Array.from({ length: 14 }, () => ({ y: rand(0.08, 0.92), a: rand(0, 6), f: rand(0.004, 0.012) }));
      const shavings = []; let p = 0, down = false, last = null, acc = 0, done = false, mx = W / 2, my = py;
      api.on(api.cv, 'pointerdown', e => { down = true; last = api.pos(e); api.cv.setPointerCapture(e.pointerId); });
      api.on(api.cv, 'pointerup', () => { down = false; last = null; });
      api.on(api.cv, 'pointermove', e => {
        const q = api.pos(e); mx = q.x; my = q.y;
        if (!down || done || !last) return;
        const dx = Math.abs(q.x - last.x);
        if (q.y > py - 60 && q.y < py + ph + 60 && q.x > px && q.x < px + pw) {
          p = Math.min(1, p + dx / (pw * 5)); acc += dx;
          if (acc > 16) {
            acc = 0; SoundScape.sfx('shave');
            shavings.push({ x: q.x, y: py, vx: rand(-60, 60), vy: rand(-180, -60), r: rand(5, 11), rot: rand(0, 6), vr: rand(-6, 6), life: 1.6 });
          }
        }
        last = q;
      });
      api.loop((dt, t) => {
        grad(c, W, H, [[0, '#f3dcaa'], [0.62, '#e2bf84'], [0.62, '#9c7a52'], [1, '#7a5c3c']]);
        // 芒果树影
        c.fillStyle = 'rgba(60,90,60,.18)';
        for (let i = 0; i < 6; i++) { c.beginPath(); c.ellipse(W * (0.1 + i * 0.17), H * 0.1 + Math.sin(t + i) * 4, 90, 50, 0, 0, 7); c.fill(); }
        // 工作台
        c.fillStyle = '#6b3e26'; c.fillRect(px - 20, py + ph, pw + 40, 16); c.fillRect(px, py + ph + 16, 14, H); c.fillRect(px + pw - 14, py + ph + 16, 14, H);
        // 木板
        c.fillStyle = '#c8935a'; c.fillRect(px, py, pw, ph);
        c.strokeStyle = 'rgba(110,62,30,.45)'; c.lineWidth = 1.4;
        grain.forEach(g => { c.beginPath(); for (let x = 0; x <= pw; x += 10) { const y = py + g.y * ph + Math.sin(x * g.f + g.a) * 4; x ? c.lineTo(px + x, y) : c.moveTo(px, y); } c.stroke(); });
        c.fillStyle = `rgba(250,228,180,${p * 0.75})`; c.fillRect(px, py, pw, ph);
        c.strokeStyle = '#5b3a20'; c.lineWidth = 2; c.strokeRect(px, py, pw, ph);
        // 刨花
        shavings.forEach(s => {
          s.vy += 420 * dt; s.x += s.vx * dt; s.y += s.vy * dt; s.rot += s.vr * dt; s.life -= dt;
          if (s.y > H * 0.9) { s.y = H * 0.9; s.vy = 0; s.vx *= 0.8; s.vr = 0; }
          c.save(); c.translate(s.x, s.y); c.rotate(s.rot); c.strokeStyle = `rgba(232,197,138,${Math.min(1, s.life + 0.4)})`; c.lineWidth = 3;
          c.beginPath(); c.arc(0, 0, s.r, 0, Math.PI * 1.6); c.stroke(); c.restore();
        });
        while (shavings.length > 160) shavings.shift();
        // 刨子
        if (!done) {
          c.save(); c.translate(mx, Math.min(Math.max(my, py - 10), py + ph - 10)); c.fillStyle = '#b07a45'; c.strokeStyle = '#3a2a1e'; c.lineWidth = 2;
          c.fillRect(-36, -18, 72, 22); c.strokeRect(-36, -18, 72, 22); c.fillStyle = '#6b3e26'; c.fillRect(-8, -32, 16, 14); c.restore();
        }
        // 进度
        c.fillStyle = 'rgba(58,42,30,.25)'; c.fillRect(W * 0.3, H - 26, W * 0.4, 8); c.fillStyle = '#4a7c59'; c.fillRect(W * 0.3, H - 26, W * 0.4 * p, 8);
        if (p >= 1 && !done) { done = true; api.tip('木板刨得又光又平。它还是没有名字。'); setTimeout(finish, 1600); }
      });
    },

    /* ---- B.华兹华斯：连星 ---- */
    stars(api, finish) {
      const { c, W, H } = api;
      const bg = Array.from({ length: 220 }, () => ({ x: rand(0, W), y: rand(0, H * 0.78), r: rand(0.4, 1.4), p: rand(0, 6) }));
      const shape = [[.18, .32], [.29, .24], [.41, .28], [.52, .36], [.6, .52], [.75, .55], [.79, .37]];
      const targets = shape.map(([x, y]) => ({ x: x * W, y: y * H, found: false }));
      const order = []; let done = false, doneAt = 0;
      api.on(api.cv, 'pointerdown', e => {
        if (done) return;
        const q = api.pos(e);
        const t = targets.find(s => !s.found && Math.hypot(s.x - q.x, s.y - q.y) < 30);
        if (t) { t.found = true; order.push(t); SoundScape.sfx('star'); }
        if (order.length === targets.length) { done = true; doneAt = performance.now() / 1000; api.tip(''); }
      });
      api.loop((dt, t) => {
        grad(c, W, H, [[0, '#070f24'], [0.7, '#1c2b52'], [1, '#2a3550']]);
        bg.forEach(s => { c.fillStyle = `rgba(255,251,232,${0.35 + Math.sin(t * 2 + s.p) * 0.25})`; c.beginPath(); c.arc(s.x, s.y, s.r, 0, 7); c.fill(); });
        // 连线
        if (order.length > 1) {
          c.strokeStyle = 'rgba(232,197,71,.75)'; c.lineWidth = 1.6; c.setLineDash([5, 6]); c.beginPath();
          order.forEach((s, i) => (i ? c.lineTo(s.x, s.y) : c.moveTo(s.x, s.y))); c.stroke(); c.setLineDash([]);
        }
        targets.forEach((s, i) => {
          const pulse = 1 + Math.sin(t * 3 + i) * 0.4;
          if (s.found) { const g = c.createRadialGradient(s.x, s.y, 0, s.x, s.y, 18); g.addColorStop(0, 'rgba(255,240,180,1)'); g.addColorStop(1, 'rgba(255,240,180,0)'); c.fillStyle = g; c.beginPath(); c.arc(s.x, s.y, 18, 0, 7); c.fill(); }
          c.fillStyle = s.found ? '#fff6c9' : 'rgba(255,251,232,.85)'; c.beginPath(); c.arc(s.x, s.y, (s.found ? 3.5 : 2.1) * pulse, 0, 7); c.fill();
        });
        // 草地与两个躺着的人
        c.fillStyle = '#0e1a14'; c.beginPath(); c.moveTo(0, H); c.lineTo(0, H * 0.84);
        for (let x = 0; x <= W; x += 6) c.lineTo(x, H * 0.84 - Math.abs(Math.sin(x * 0.37)) * 10 - Math.sin(x * 0.05 + t) * 2);
        c.lineTo(W, H); c.fill();
        c.fillStyle = '#1c2b22'; c.beginPath(); c.ellipse(W * 0.38, H * 0.9, 50, 8, 0, 0, 7); c.fill(); c.beginPath(); c.arc(W * 0.33, H * 0.885, 8, 0, 7); c.fill();
        c.beginPath(); c.ellipse(W * 0.55, H * 0.9, 34, 6, 0, 0, 7); c.fill(); c.beginPath(); c.arc(W * 0.515, H * 0.888, 6, 0, 7); c.fill();
        if (done) {
          const a = Math.min(1, (t - doneAt) / 2);
          c.fillStyle = `rgba(255,248,220,${a})`; c.font = `italic ${Math.max(22, W * 0.04)}px Georgia, serif`; c.textAlign = 'center';
          c.fillText('The past is deep.', W / 2, H * 0.7);
          if (a >= 1 && !api._shown) { api._shown = true; api.showDone(); }
        }
      });
    },

    /* ---- 摩根：哑火 ---- */
    fizzle(api, finish) {
      const { c, W, H } = api;
      const rockets = [], sparks = [], puffs = []; let tries = 0, done = false;
      api.on(api.cv, 'pointerdown', e => {
        if (done || rockets.some(r => r.alive)) return;
        const q = api.pos(e); tries++; SoundScape.sfx('launch');
        rockets.push({ x: W * 0.5, y: H * 0.86, tx: q.x, ty: Math.max(q.y, H * 0.45), alive: true, t: 0, peak: rand(0.45, 0.7) });
      });
      api.loop((dt, t) => {
        grad(c, W, H, [[0, '#0b1530'], [0.8, '#24345e'], [0.8, '#2b2a3a'], [1, '#1c1b26']]);
        // 摩根家剪影与人群
        c.fillStyle = '#141220'; c.fillRect(W * 0.62, H * 0.5, W * 0.26, H * 0.3); c.beginPath(); c.moveTo(W * 0.6, H * 0.5); c.lineTo(W * 0.75, H * 0.38); c.lineTo(W * 0.9, H * 0.5); c.fill();
        for (let i = 0; i < 12; i++) { const x = W * (0.05 + i * 0.045); c.beginPath(); c.arc(x, H * 0.8 - 30, 7, 0, 7); c.fill(); c.fillRect(x - 7, H * 0.8 - 24, 14, 24); }
        c.fillStyle = '#8a6a4a'; c.fillRect(W * 0.5 - 3, H * 0.8, 6, H * 0.06);
        rockets.forEach(r => {
          if (!r.alive) return;
          r.t += dt * 1.6; const k = Math.min(r.t, r.peak);
          r.cx = W * 0.5 + (r.tx - W * 0.5) * k * 0.4; r.cy = H * 0.86 - (H * 0.86 - r.ty) * k;
          c.fillStyle = '#ffcf6a'; c.beginPath(); c.arc(r.cx, r.cy, 3, 0, 7); c.fill();
          if (r.t >= r.peak) {
            r.alive = false; SoundScape.sfx('fizz');
            for (let i = 0; i < 9; i++) sparks.push({ x: r.cx, y: r.cy, vx: rand(-30, 30), vy: rand(-40, 10), life: rand(0.4, 0.9) });
            puffs.push({ x: r.cx, y: r.cy, life: 1.8 });
            if (tries >= 3) { done = true; setTimeout(() => { api.tip('……又失败了。街上的人笑成一片。'); setTimeout(finish, 1800); }, 600); }
            else api.tip(['噗……只冒了一股烟。再试一次？', '嘶——哑火了。最后一次！'][tries - 1]);
          }
        });
        sparks.forEach(s => { s.vy += 90 * dt; s.x += s.vx * dt; s.y += s.vy * dt; s.life -= dt; if (s.life > 0) { c.fillStyle = `rgba(200,190,170,${s.life})`; c.fillRect(s.x, s.y, 2, 2); } });
        puffs.forEach(p => {
          p.life -= dt * 0.6; if (p.life <= 0) return; p.y -= dt * 12;
          c.fillStyle = `rgba(160,160,170,${p.life * 0.3})`; c.beginPath(); c.arc(p.x, p.y, 20 + (1.8 - p.life) * 18, 0, 7); c.fill();
          c.fillStyle = `rgba(255,251,232,${p.life * 0.6})`; c.font = 'italic 18px Georgia, serif'; c.textAlign = 'center'; c.fillText('pff…', p.x, p.y - 34);
        });
      });
    },

    /* ---- 摩根：大火与最美的烟火 ---- */
    blaze(api, finish) {
      const { c, W, H } = api;
      const parts = []; const t0 = performance.now() / 1000; let nextAuto = 0;
      const colors = ['#ff5a6e', '#ffd65a', '#5ad1ff', '#7dff9a', '#ff9a3c', '#e8a0ff', '#ffffff'];
      function burst(x, y) {
        SoundScape.sfx('boom');
        const col = colors[Math.floor(Math.random() * colors.length)], col2 = colors[Math.floor(Math.random() * colors.length)];
        const n = 70 + Math.floor(Math.random() * 40), sp = rand(120, 220);
        for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2, v = sp * rand(0.6, 1); parts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: rand(1.2, 2), col: i % 3 ? col : col2 }); }
      }
      api.on(api.cv, 'pointerdown', e => { const q = api.pos(e); burst(q.x, Math.min(q.y, H * 0.6)); });
      api.loop((dt, t) => {
        c.fillStyle = 'rgba(18,8,10,.28)'; c.fillRect(0, 0, W, H);
        // 火光
        const g = c.createRadialGradient(W / 2, H, 10, W / 2, H, H * 0.9); g.addColorStop(0, 'rgba(255,120,40,.35)'); g.addColorStop(1, 'rgba(255,120,40,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H);
        // 燃烧的房子
        c.fillStyle = '#1a0c08'; c.fillRect(W * 0.38, H * 0.66, W * 0.24, H * 0.34); c.beginPath(); c.moveTo(W * 0.36, H * 0.66); c.lineTo(W * 0.5, H * 0.54); c.lineTo(W * 0.64, H * 0.66); c.fill();
        for (let i = 0; i < 18; i++) {
          const fx = W * 0.37 + (i / 17) * W * 0.26, fh = 30 + Math.abs(Math.sin(t * 7 + i * 1.7)) * 50 + (i % 3) * 10;
          c.fillStyle = i % 2 ? 'rgba(255,170,60,.85)' : 'rgba(255,90,40,.8)';
          c.beginPath(); c.moveTo(fx - 12, H * 0.68); c.quadraticCurveTo(fx + Math.sin(t * 9 + i) * 8, H * 0.66 - fh, fx + 12, H * 0.68); c.fill();
        }
        if (t > nextAuto) { nextAuto = t + rand(0.35, 0.8); burst(rand(W * 0.15, W * 0.85), rand(H * 0.12, H * 0.45)); }
        parts.forEach(p => {
          p.vy += 70 * dt; p.vx *= 0.985; p.vy *= 0.985; p.x += p.vx * dt; p.y += p.vy * dt; p.life -= dt;
          if (p.life > 0) { c.globalAlpha = Math.min(1, p.life); c.fillStyle = p.col; c.beginPath(); c.arc(p.x, p.y, 2.1, 0, 7); c.fill(); }
        });
        c.globalAlpha = 1;
        for (let i = parts.length - 1; i >= 0; i--) if (parts[i].life <= 0) parts.splice(i, 1);
        // 围观人群剪影
        c.fillStyle = '#0a0506';
        for (let i = 0; i < 22; i++) { const x = W * (0.02 + i * 0.046), y = H - 4; if (x > W * 0.36 && x < W * 0.64) continue; c.beginPath(); c.arc(x, y - 44, 9, 0, 7); c.fill(); c.fillRect(x - 9, y - 36, 18, 40); }
        if (t - t0 > 6 && !api._shown) { api._shown = true; api.showDone(); }
      });
      c.fillStyle = '#12080a'; c.fillRect(0, 0, W, H);
    },

    /* ---- 鲍嘉：单人纸牌 ---- */
    cards(api, finish) {
      const { c, W, H } = api;
      const suits = ['♠', '♥', '♦', '♣'], vals = ['2', '3', '5', '7', '9', 'J', 'Q', 'K'];
      const n = 7, cw = Math.min(80, (W - 60) / n - 10), ch = cw * 1.45;
      const cards = Array.from({ length: n }, (_, i) => ({
        x: W / 2 - ((n - 1) / 2) * (cw + 12) + i * (cw + 12), y: H * 0.5, flip: 0, target: 0,
        v: i === 3 ? 'A' : vals[Math.floor(Math.random() * vals.length)], s: i === 3 ? '♠' : suits[Math.floor(Math.random() * 4)],
      }));
      let done = false;
      api.on(api.cv, 'pointerdown', e => {
        const q = api.pos(e);
        const k = cards.find(k => k.target === 0 && Math.abs(q.x - k.x) < cw / 2 && Math.abs(q.y - k.y) < ch / 2);
        if (k) { k.target = 1; SoundScape.sfx('flip'); }
        if (!done && cards.every(k => k.target === 1)) { done = true; setTimeout(() => { api.tip('一局又一局。鲍嘉从来不说自己赢没赢。'); setTimeout(finish, 2000); }, 500); }
      });
      api.loop((dt, t) => {
        grad(c, W, H, [[0, '#2a1c14'], [1, '#4a3424']]);
        const g = c.createRadialGradient(W / 2, H * 0.2, 10, W / 2, H * 0.5, W * 0.6); g.addColorStop(0, 'rgba(255,215,140,.35)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H);
        // 桌布
        c.fillStyle = '#3f6b45'; c.beginPath(); c.ellipse(W / 2, H * 0.55, W * 0.46, H * 0.32, 0, 0, 7); c.fill();
        // 烟
        c.strokeStyle = 'rgba(230,230,230,.18)'; c.lineWidth = 3; c.beginPath();
        for (let y = 0; y < 80; y += 4) c.lineTo(W * 0.86 + Math.sin(t * 1.5 + y * 0.08) * 10, H * 0.3 - y); c.stroke();
        cards.forEach(k => {
          k.flip += (k.target - k.flip) * Math.min(1, dt * 10);
          const sx = Math.abs(Math.cos(k.flip * Math.PI)), face = k.flip > 0.5;
          c.save(); c.translate(k.x, k.y); c.scale(Math.max(0.02, sx), 1);
          c.fillStyle = face ? '#fbf5e6' : '#8a2a2a'; c.strokeStyle = '#2a1c14'; c.lineWidth = 2;
          c.beginPath(); c.roundRect ? c.roundRect(-cw / 2, -ch / 2, cw, ch, 6) : c.rect(-cw / 2, -ch / 2, cw, ch); c.fill(); c.stroke();
          if (face) {
            c.fillStyle = k.s === '♥' || k.s === '♦' ? '#c0392b' : '#2a1c14'; c.textAlign = 'center'; c.textBaseline = 'middle';
            c.font = `bold ${cw * 0.32}px Georgia`; c.fillText(k.v, -cw * 0.25, -ch * 0.32);
            c.font = `${cw * 0.55}px Georgia`; c.fillText(k.s, 0, ch * 0.05);
          } else {
            c.strokeStyle = 'rgba(232,197,71,.6)'; c.strokeRect(-cw / 2 + 6, -ch / 2 + 6, cw - 12, ch - 12);
          }
          c.restore();
        });
      });
    },

    /* ---- 终章：走向飞机 ---- */
    shadow(api, finish) {
      const { c, W, H } = api;
      let x = W * 0.12, holding = false, done = false, fade = 0;
      const planeX = W * 0.86, gy = H * 0.82;
      const press = () => { holding = true; }, release = () => { holding = false; };
      api.on(api.cv, 'pointerdown', press); api.on(window, 'pointerup', release);
      const kd = e => { if (e.code === 'Space') { e.preventDefault(); e.stopPropagation(); holding = true; } };
      const ku = e => { if (e.code === 'Space') holding = false; };
      api.on(window, 'keydown', kd); api.on(window, 'keyup', ku);
      api.loop((dt, t) => {
        if (holding && !done) { x += dt * W * 0.09; if (Math.random() < dt * 4) SoundScape.sfx('step'); }
        grad(c, W, H, [[0, '#f9c58f'], [0.45, '#f6e6c8'], [0.7, '#e8dcc4'], [0.7, '#9f9688'], [1, '#7f776a']]);
        // 太阳（身后）
        const g = c.createRadialGradient(W * 0.04, H * 0.62, 5, W * 0.04, H * 0.62, H * 0.5); g.addColorStop(0, 'rgba(255,230,160,.95)'); g.addColorStop(1, 'rgba(255,230,160,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H);
        // 跑道线
        c.strokeStyle = 'rgba(255,255,255,.55)'; c.lineWidth = 4; c.setLineDash([40, 30]); c.beginPath(); c.moveTo(0, H * 0.9); c.lineTo(W, H * 0.9); c.stroke(); c.setLineDash([]);
        // 飞机
        c.save(); c.translate(planeX, gy - 40); c.fillStyle = '#d8d4cc'; c.strokeStyle = '#5a5650'; c.lineWidth = 2;
        c.beginPath(); c.ellipse(0, 0, 110, 20, 0, 0, 7); c.fill(); c.stroke();
        c.beginPath(); c.moveTo(-20, 0); c.lineTo(10, 50); c.lineTo(30, 50); c.lineTo(20, 0); c.fill(); c.stroke();
        c.beginPath(); c.moveTo(80, -6); c.lineTo(108, -46); c.lineTo(116, -46); c.lineTo(106, -4); c.fill(); c.stroke();
        c.fillStyle = '#2b6e82'; for (let i = 0; i < 7; i++) c.fillRect(-70 + i * 18, -8, 9, 7);
        c.fillStyle = '#5a5650'; c.fillRect(-90, 10, 4, 34); c.fillRect(-94, 44, 30, 4);
        c.restore();
        // 影子 —— 在前方地上跳舞的小矮人
        const walking = holding && !done;
        c.save(); c.translate(x + 30, gy); c.transform(1, 0, -1.6, 0.28, 0, 0);
        c.fillStyle = 'rgba(58,42,30,.35)'; c.scale(1 + (walking ? Math.sin(t * 9) * 0.06 : 0), 1);
        c.beginPath(); c.ellipse(0, -55, 11, 50, walking ? Math.sin(t * 9) * 0.15 : 0, 0, 7); c.fill(); c.beginPath(); c.arc(0, -112, 11, 0, 7); c.fill();
        c.restore();
        drawBoy(c, x, gy, Math.max(0.7, H / 420), t, walking);
        if (x > planeX - 140 && !done) { done = true; api.tip(''); }
        if (done) {
          fade = Math.min(1, fade + dt * 0.5);
          c.fillStyle = `rgba(251,245,230,${fade})`; c.fillRect(0, 0, W, H);
          if (fade >= 1) finish();
        }
      });
    },
  };

  return { run, abort() { if (current) current(); }, get active() { return !!current; } };
})();
