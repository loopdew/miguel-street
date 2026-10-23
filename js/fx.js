/* ==========================================================
   米格尔街 · 极乐迪斯科质感交互动效与微交互 (Canvas FX)
   - 消除任何残留视觉假象（严格的画布复位与全屏擦除）
   - 大幅优化触控与点击判定，杜绝卡关
   - 全微交互配备优雅的快速跳过 / 继续按钮
   ========================================================== */
const Fx = (() => {
  const cv = () => document.getElementById('fx');
  const tipEl = () => document.getElementById('fx-tip');
  const doneEl = () => document.getElementById('fx-done');

  let currentAbort = null;

  function run(name, tip) {
    return new Promise(resolve => {
      const cEl = cv();
      if (!cEl) { resolve(); return; }

      cEl.classList.add('on');
      const r = cEl.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      cEl.width = r.width * dpr;
      cEl.height = r.height * dpr;
      const c = cEl.getContext('2d');
      c.setTransform(dpr, 0, 0, dpr, 0, 0);

      const listeners = [];
      let raf = 0, alive = true;

      function wipeCanvas() {
        if (!c) return;
        c.save();
        c.setTransform(1, 0, 0, 1, 0, 0);
        c.clearRect(0, 0, cEl.width, cEl.height);
        c.restore();
      }

      const api = {
        c, W: r.width, H: r.height, cv: cEl,
        tip(t) {
          const el = tipEl();
          if (!el) return;
          el.innerHTML = t;
          el.classList.toggle('hidden', !t);
        },
        on(target, ev, fn) {
          target.addEventListener(ev, fn);
          listeners.push([target, ev, fn]);
        },
        pos(e) {
          const b = cEl.getBoundingClientRect();
          return { x: e.clientX - b.left, y: e.clientY - b.top };
        },
        loop(fn) {
          let last = performance.now();
          const f = now => {
            if (!alive) return;
            fn(Math.min(0.05, (now - last) / 1000), now / 1000);
            last = now;
            raf = requestAnimationFrame(f);
          };
          raf = requestAnimationFrame(f);
        },
        showDone(label = '继续') {
          const b = doneEl();
          if (!b) return;
          b.innerHTML = `${label} <kbd>→</kbd>`;
          b.classList.remove('hidden');
          b.onclick = e => {
            e.stopPropagation();
            finish();
          };
        }
      };

      function finish() {
        if (!alive) return;
        alive = false;
        currentAbort = null;
        cancelAnimationFrame(raf);
        listeners.forEach(([t, ev, fn]) => {
          try { t.removeEventListener(ev, fn); } catch (e) {}
        });
        wipeCanvas();
        cEl.classList.remove('on');
        const tEl = tipEl(); if (tEl) tEl.classList.add('hidden');
        const dEl = doneEl(); if (dEl) dEl.classList.add('hidden');
        resolve();
      }

      currentAbort = finish;
      api.tip(tip);

      wipeCanvas();
      if (FX_ROUTINES[name]) {
        FX_ROUTINES[name](api, finish);
      } else {
        finish();
      }
    });
  }

  const rand = (min, max) => min + Math.random() * (max - min);

  const FX_ROUTINES = {
    // ----------------------------------------------------
    // 1. 波普的木工房：打磨没有名字的东西
    // ----------------------------------------------------
    plane(api, finish) {
      const { c, W, H } = api;
      const px = W * 0.12, pw = W * 0.42, py = H * 0.52, ph = 46;
      let shavings = [];
      let progress = 0, down = false, last = null, acc = 0, done = false;
      let mx = px + pw / 2, my = py;

      // 3秒后提供直接继续按钮
      setTimeout(() => { if (!done) api.showDone('收起刨子 · 继续'); }, 2500);

      api.on(api.cv, 'pointerdown', e => {
        down = true;
        last = api.pos(e);
        api.cv.setPointerCapture(e.pointerId);
      });
      api.on(api.cv, 'pointerup', () => { down = false; last = null; });
      api.on(api.cv, 'pointermove', e => {
        const q = api.pos(e);
        mx = q.x; my = q.y;
        if (!down || done || !last) return;
        const dx = Math.abs(q.x - last.x) + Math.abs(q.y - last.y);
        if (q.x > px - 40 && q.x < px + pw + 40 && Math.abs(q.y - py) < 100) {
          progress = Math.min(1, progress + dx / (pw * 3.2));
          acc += dx;
          if (acc > 14) {
            acc = 0;
            if (typeof SoundScape !== 'undefined') SoundScape.sfx('shave');
            for (let i = 0; i < 2; i++) {
              shavings.push({
                x: q.x + rand(-10, 10), y: py + rand(-5, 5),
                vx: rand(-60, 60), vy: rand(-140, -60),
                r: rand(5, 11), rot: rand(0, 6), vr: rand(-4, 4), life: 1.3
              });
            }
          }
        }
        last = q;
      });

      api.loop((dt, t) => {
        c.clearRect(0, 0, W, H);

        // 柔和的油画木纹光晕，与背景自然融合，无违和硬边
        c.save();
        const grad = c.createLinearGradient(px, py, px + pw, py);
        grad.addColorStop(0, 'rgba(120, 80, 50, 0.35)');
        grad.addColorStop(progress, 'rgba(235, 185, 110, 0.65)');
        grad.addColorStop(Math.min(1, progress + 0.1), 'rgba(120, 80, 50, 0.35)');
        grad.addColorStop(1, 'rgba(90, 60, 40, 0.3)');

        c.fillStyle = grad;
        c.beginPath();
        c.roundRect ? c.roundRect(px, py - ph / 2, pw, ph, 8) : c.rect(px, py - ph / 2, pw, ph);
        c.fill();

        // 金色微光外框
        c.strokeStyle = 'rgba(217, 164, 65, 0.45)';
        c.lineWidth = 1.5;
        c.stroke();

        // 刨花散落
        shavings = shavings.filter(s => s.life > 0);
        shavings.forEach(s => {
          s.vy += 320 * dt;
          s.x += s.vx * dt;
          s.y += s.vy * dt;
          s.rot += s.vr * dt;
          s.life -= dt;
          c.save();
          c.translate(s.x, s.y);
          c.rotate(s.rot);
          c.strokeStyle = `rgba(245, 205, 140, ${Math.min(1, s.life * 1.2)})`;
          c.lineWidth = 2.2;
          c.beginPath();
          c.arc(0, 0, s.r, 0, Math.PI * 1.4);
          c.stroke();
          c.restore();
        });

        // 准星手感
        if (!done) {
          c.save();
          c.translate(mx, py);
          c.fillStyle = 'rgba(217, 164, 65, 0.8)';
          c.beginPath();
          c.arc(0, 0, 7, 0, Math.PI * 2);
          c.fill();
          c.restore();
        }
        c.restore();

        if (progress >= 1 && !done) {
          done = true;
          api.tip('木头被刨得温润光滑。它依然没有名字。');
          setTimeout(finish, 1200);
        }
      });
    },

    // ----------------------------------------------------
    // 2. 鲍嘉的单人纸牌
    // ----------------------------------------------------
    cards(api, finish) {
      const { c, W, H } = api;
      const count = 7;
      const maxArea = Math.min(W * 0.48, 520);
      const cw = Math.min(62, maxArea / count - 8);
      const ch = cw * 1.48;
      const cx0 = W * 0.08;
      const cy = H * 0.54;

      const cards = Array.from({ length: count }, (_, i) => ({
        x: cx0 + i * (cw + 10), y: cy,
        val: i === 3 ? 'A' : ['2', '7', 'J', 'Q', 'K'][i % 5],
        suit: i === 3 ? '♠' : ['♠', '♥', '♦', '♣'][i % 4],
        flipped: false, progress: 0
      }));

      let done = false;
      setTimeout(() => { if (!done) api.showDone('收起纸牌 · 继续'); }, 2500);

      api.on(api.cv, 'pointerdown', e => {
        const q = api.pos(e);
        // 放大点击容差半径（+25px），保证手指或光标无论如何都能精准点中
        const card = cards.find(k => !k.flipped && Math.abs(q.x - (k.x + cw / 2)) < (cw / 2 + 25) && Math.abs(q.y - (k.y + ch / 2)) < (ch / 2 + 25));
        if (card) {
          card.flipped = true;
          if (typeof SoundScape !== 'undefined') SoundScape.sfx('flip');
          const flippedCount = cards.filter(k => k.flipped).length;
          api.tip(`翻开纸牌 (${flippedCount}/${count})`);
          if (cards.every(k => k.flipped) && !done) {
            done = true;
            setTimeout(() => {
              api.tip('单人纸牌翻完，依然只有不可更改的宿命。');
              setTimeout(finish, 1300);
            }, 600);
          }
        }
      });

      api.loop((dt) => {
        c.clearRect(0, 0, W, H);
        cards.forEach(k => {
          if (k.flipped && k.progress < 1) {
            k.progress = Math.min(1, k.progress + dt * 6.5);
          }
          const scaleX = Math.abs(Math.cos(k.progress * Math.PI));
          const face = k.progress > 0.5;

          c.save();
          c.translate(k.x + cw / 2, k.y + ch / 2);
          c.scale(scaleX, 1);
          c.fillStyle = face ? '#efe6d2' : '#2b211a';
          c.strokeStyle = k.flipped ? '#d9a441' : '#c8553a';
          c.lineWidth = 1.8;
          c.shadowColor = 'rgba(0,0,0,0.55)';
          c.shadowBlur = 10;
          c.beginPath();
          c.roundRect ? c.roundRect(-cw / 2, -ch / 2, cw, ch, 4) : c.rect(-cw / 2, -ch / 2, cw, ch);
          c.fill();
          c.stroke();
          c.shadowBlur = 0;

          if (face) {
            c.fillStyle = (k.suit === '♥' || k.suit === '♦') ? '#c8553a' : '#14110f';
            c.font = `bold ${Math.round(cw * 0.36)}px Georgia`;
            c.textAlign = 'center';
            c.fillText(k.val, -cw * 0.22, -ch * 0.22);
            c.fillText(k.suit, 0, ch * 0.15);
          } else {
            // 背面暗色复古花纹
            c.strokeStyle = 'rgba(217, 164, 65, 0.25)';
            c.lineWidth = 1;
            c.strokeRect(-cw * 0.35, -ch * 0.35, cw * 0.7, ch * 0.7);
          }
          c.restore();
        });
      });
    },

    // ----------------------------------------------------
    // 3. 华兹华斯夜空连星（全屏宽容热区 + 双向连线 + 防卡死）
    // ----------------------------------------------------
    stars(api, finish) {
      const { c, W, H } = api;
      // 位于视野开阔的夜空部分
      const points = [
        { px: 0.10, py: 0.30, label: 'I' },
        { px: 0.18, py: 0.20, label: 'II' },
        { px: 0.28, py: 0.22, label: 'III' },
        { px: 0.38, py: 0.30, label: 'IV' },
        { px: 0.44, py: 0.42, label: 'V' },
        { px: 0.35, py: 0.52, label: 'VI' },
        { px: 0.20, py: 0.48, label: 'VII' }
      ].map(pt => ({
        x: pt.px * W, y: pt.py * H, label: pt.label, lit: false
      }));

      const connected = [];
      let done = false;

      // 只要过 2.5 秒，立即呈现“连缀星空 (继续)”按钮，永远不让玩家受阻
      setTimeout(() => { if (!done) api.showDone('仰望星空 · 继续'); }, 2500);

      api.on(api.cv, 'pointerdown', e => {
        if (done) return;
        const q = api.pos(e);
        // 超大判定半径 65px，只要点在星光大致范围内立即触发
        const p = points.find(pt => !pt.lit && Math.hypot(pt.x - q.x, pt.y - q.y) < 65);
        if (p) {
          p.lit = true;
          connected.push(p);
          if (typeof SoundScape !== 'undefined') SoundScape.sfx('star');
          api.tip(`已连接星辰 (${connected.length}/${points.length}) · “The past is deep”`);
          if (connected.length === points.length) {
            done = true;
            api.tip('“The past is deep.” —— 往事深邃。');
            setTimeout(finish, 1500);
          }
        }
      });

      api.loop((dt, t) => {
        c.clearRect(0, 0, W, H);

        // 连线
        if (connected.length > 1) {
          c.save();
          c.strokeStyle = 'rgba(217, 164, 65, 0.85)';
          c.lineWidth = 2.2;
          c.setLineDash([5, 5]);
          c.beginPath();
          connected.forEach((p, idx) => idx ? c.lineTo(p.x, p.y) : c.moveTo(p.x, p.y));
          c.stroke();
          c.restore();
        }

        // 星辰绘制
        points.forEach((p, i) => {
          c.save();
          const pulse = 1 + Math.sin(t * 3.5 + i * 1.2) * 0.35;
          if (!p.lit) {
            // 未点亮星：明显的呼吸光环与金色指引
            c.strokeStyle = 'rgba(217, 164, 65, 0.55)';
            c.lineWidth = 1.8;
            c.beginPath();
            c.arc(p.x, p.y, 20 * pulse, 0, Math.PI * 2);
            c.stroke();

            c.fillStyle = '#ffeed0';
            c.beginPath();
            c.arc(p.x, p.y, 5, 0, Math.PI * 2);
            c.fill();

            // 罗马数字标识
            c.fillStyle = 'rgba(235, 215, 175, 0.75)';
            c.font = '11px Georgia';
            c.textAlign = 'center';
            c.fillText(p.label, p.x, p.y - 24);
          } else {
            // 点亮星：星芒辉映
            c.fillStyle = '#ffffff';
            c.shadowColor = '#ffd23f';
            c.shadowBlur = 18;
            c.beginPath();
            c.arc(p.x, p.y, 7 * pulse, 0, Math.PI * 2);
            c.fill();
            c.shadowBlur = 0;
          }
          c.restore();
        });
      });
    },

    // ----------------------------------------------------
    // 4. 摩根的哑火试放（彻底修复点击锁死 bug）
    // ----------------------------------------------------
    fizzle(api, finish) {
      const { c, W, H } = api;
      let count = 0, done = false;
      let sparks = [];

      // 永远保障能够继续
      setTimeout(() => { if (!done) api.showDone('忍俊不禁 · 继续'); }, 2200);

      api.on(api.cv, 'pointerdown', e => {
        if (done) return;
        const q = api.pos(e);
        count++;
        if (typeof SoundScape !== 'undefined') SoundScape.sfx('fizz');

        // 生成活泼喷射火花与白烟
        for (let i = 0; i < 22; i++) {
          sparks.push({
            x: q.x, y: q.y,
            vx: rand(-60, 60), vy: rand(-110, 30),
            life: rand(0.4, 0.9), maxLife: 0.9,
            col: ['#ff6b35', '#f7c59f', '#efefd0', '#ffd23f'][Math.floor(Math.random() * 4)]
          });
        }

        if (count >= 3) {
          done = true;
          api.tip('嘶——轻微的响动，一缕青烟。街上的人全笑了。');
          setTimeout(finish, 1400);
        } else {
          api.tip(`试放引信 (${count}/3 次) · 烟花哑火，只冒出一缕青烟`);
        }
      });

      api.loop((dt) => {
        c.clearRect(0, 0, W, H);
        sparks = sparks.filter(s => s.life > 0);
        sparks.forEach(s => {
          s.x += s.vx * dt;
          s.y += s.vy * dt;
          s.vy += 80 * dt; // 重力微弱坠落
          s.life -= dt;
          if (s.life > 0) {
            c.fillStyle = s.col;
            c.globalAlpha = Math.min(1, s.life / s.maxLife);
            c.fillRect(s.x, s.y, 3, 3);
          }
        });
        c.globalAlpha = 1;
      });
    },

    // ----------------------------------------------------
    // 5. 摩根的狂暴烈焰与焰火（全街最壮丽的大火）
    // ----------------------------------------------------
    blaze(api, finish) {
      const { c, W, H } = api;
      let particles = [];
      let nextAuto = 0;
      const t0 = performance.now() / 1000;

      function burst(x, y) {
        if (typeof SoundScape !== 'undefined') SoundScape.sfx('boom');
        const hues = ['#ff5a36', '#ffd23f', '#06d6a0', '#118ab2', '#f72585', '#ffeaa7'];
        const col = hues[Math.floor(Math.random() * hues.length)];
        for (let i = 0; i < 65; i++) {
          const ang = rand(0, Math.PI * 2);
          const spd = rand(60, 240);
          particles.push({
            x, y,
            vx: Math.cos(ang) * spd, vy: Math.sin(ang) * spd,
            life: rand(0.8, 1.6), color: col
          });
        }
      }

      api.on(api.cv, 'pointerdown', e => {
        const q = api.pos(e);
        burst(q.x, Math.min(q.y, H * 0.65));
      });

      api.loop((dt, t) => {
        c.clearRect(0, 0, W, H);

        if (t > nextAuto) {
          nextAuto = t + rand(0.4, 0.9);
          burst(rand(W * 0.1, W * 0.55), rand(H * 0.15, H * 0.5));
        }

        particles = particles.filter(p => p.life > 0);
        particles.forEach(p => {
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.vy += 50 * dt;
          p.life -= dt;
          if (p.life > 0) {
            c.fillStyle = p.color;
            c.globalAlpha = Math.min(1, p.life);
            c.fillRect(p.x, p.y, 2.8, 2.8);
          }
        });
        c.globalAlpha = 1;

        if (t - t0 > 2.2 && !api._shown) {
          api._shown = true;
          api.showDone('见证最美的烟火 · 继续');
        }
      });
    },

    // ----------------------------------------------------
    // 6. 鲍嘉的裁缝招牌：粉笔涂鸦 (Chalk Sign)
    // ----------------------------------------------------
    chalk_sign(api, finish) {
      const { c, W, H } = api;
      const bx = W * 0.10, bw = Math.min(600, W * 0.8), by = H * 0.22, bh = Math.min(320, H * 0.54);
      let strokes = [], particles = [], down = false, last = null, totalLen = 0, done = false;

      setTimeout(() => { if (!done) api.showDone('挂起招牌 · 继续'); }, 2500);

      api.on(api.cv, 'pointerdown', e => {
        down = true; last = api.pos(e); api.cv.setPointerCapture(e.pointerId);
      });
      api.on(api.cv, 'pointerup', () => { down = false; last = null; });
      api.on(api.cv, 'pointercancel', () => { down = false; last = null; });
      api.on(api.cv, 'pointermove', e => {
        if (!down) return;
        const q = api.pos(e);
        if (q.x >= bx && q.x <= bx + bw && q.y >= by && q.y <= by + bh) {
          if (last) {
            const d = Math.hypot(q.x - last.x, q.y - last.y);
            totalLen += d;
            strokes.push({ x1: last.x, y1: last.y, x2: q.x, y2: q.y, w: rand(2.5, 5.5) });
            if (typeof SoundScape !== 'undefined' && Math.random() < 0.25) SoundScape.sfx('chalk');
            for (let i = 0; i < 2; i++) {
              particles.push({
                x: q.x + rand(-4, 4), y: q.y + rand(-4, 4),
                vx: rand(-10, 10), vy: rand(20, 60), life: rand(0.4, 0.9)
              });
            }
          }
          last = q;
          if (totalLen > 350 && !done) {
            done = true;
            api.tip('招牌落成：“本店专事裁缝 · 价格公道”');
            api.showDone('挂起招牌 · 继续');
          }
        }
      });

      api.loop((dt, t) => {
        c.clearRect(0, 0, W, H);

        // 木板黑底
        c.save();
        c.fillStyle = '#1c1c20';
        c.fillRect(bx, by, bw, bh);
        c.strokeStyle = '#6b4f2c';
        c.lineWidth = 8;
        c.strokeRect(bx, by, bw, bh);

        // 浅淡木纹底痕
        c.strokeStyle = 'rgba(255, 255, 255, 0.04)';
        c.lineWidth = 1;
        for (let y = by + 20; y < by + bh; y += 35) {
          c.beginPath(); c.moveTo(bx + 10, y); c.lineTo(bx + bw - 10, y); c.stroke();
        }

        // 模板参考虚线字
        c.font = 'bold 22px serif';
        c.fillStyle = 'rgba(217, 164, 65, 0.35)';
        c.textAlign = 'center';
        c.fillText('BOGART · TAILOR', bx + bw / 2, by + bh * 0.38);
        c.font = '16px serif';
        c.fillText('本店专事裁缝 · 定做西服 · 价格公道', bx + bw / 2, by + bh * 0.62);

        // 玩家粉笔笔触
        c.strokeStyle = 'rgba(255, 250, 235, 0.88)';
        c.lineCap = 'round';
        strokes.forEach(s => {
          c.lineWidth = s.w;
          c.beginPath(); c.moveTo(s.x1, s.y1); c.lineTo(s.x2, s.y2); c.stroke();
        });

        // 飘落粉笔灰
        particles = particles.filter(p => p.life > 0);
        particles.forEach(p => {
          p.x += p.vx * dt; p.y += p.vy * dt; p.life -= dt;
          c.fillStyle = 'rgba(255, 250, 235, 0.6)';
          c.fillRect(p.x, p.y, 2, 2);
        });

        c.restore();
      });
    },

    // ----------------------------------------------------
    // 7. 大脚的秘密与下注单 (The Boxing Wager & Dog Phobia)
    // ----------------------------------------------------
    boxing_bet(api, finish) {
      const { c, W, H } = api;
      const tx = W * 0.12, tw = Math.min(540, W * 0.76), ty = H * 0.20, th = Math.min(360, H * 0.58);
      let stamped = false, stampText = '', stampColor = '#c8553a';

      setTimeout(() => { if (!stamped) api.showDone('收起赛单 · 走向擂台'); }, 3000);

      api.on(api.cv, 'pointerdown', e => {
        if (stamped) return;
        const q = api.pos(e);
        // 区域 A: 押注大脚 (左半部按钮)
        const btnLeft = { x: tx + 30, y: ty + th - 80, w: tw * 0.42, h: 50 };
        // 区域 B: 调查阴影中的流浪狗 (右半部按钮)
        const btnRight = { x: tx + tw * 0.52, y: ty + th - 80, w: tw * 0.42, h: 50 };

        if (q.x >= btnLeft.x && q.x <= btnLeft.x + btnLeft.w && q.y >= btnLeft.y && q.y <= btnLeft.y + btnLeft.h) {
          stamped = true;
          stampText = '下注确认: 20便士押巨汉获胜';
          stampColor = 'var(--ochre, #d9a441)';
          if (typeof SoundScape !== 'undefined') SoundScape.sfx('stamp');
          api.tip('哈特拍手叫好：“有种，小子！咱们米格尔街全指望他了！”');
          api.showDone('收起赛单 · 走向擂台');
        } else if (q.x >= btnRight.x && q.x <= btnRight.x + btnRight.w && q.y >= btnRight.y && q.y <= btnRight.y + btnRight.h) {
          stamped = true;
          stampText = '察觉创伤: 巨汉极度恐惧犬吠与黑暗';
          stampColor = '#c8553a';
          if (typeof SoundScape !== 'undefined') SoundScape.sfx('stamp');
          api.tip('你发现大脚路过野狗时双拳颤抖。凶神恶煞原来只是易碎的铠甲。');
          api.showDone('收起赛单 · 走向擂台');
        }
      });

      api.loop((dt, t) => {
        c.clearRect(0, 0, W, H);
        c.save();

        // 泛黄赛单票据
        c.fillStyle = '#f0e6cf';
        c.fillRect(tx, ty, tw, th);
        c.strokeStyle = '#5a3d28';
        c.lineWidth = 4;
        c.strokeRect(tx, ty, tw, th);

        // 标题与赛事印字
        c.fillStyle = '#2b2118';
        c.font = 'bold 18px serif';
        c.textAlign = 'center';
        c.fillText('PRINCES BUILDING BOXING ARENA', tx + tw / 2, ty + 38);
        c.font = '13px sans-serif';
        c.fillStyle = '#7a5a3a';
        c.fillText('特立尼达轻重量级冠军决战 · 西班牙港', tx + tw / 2, ty + 62);

        c.strokeStyle = '#ab8e6a';
        c.lineWidth = 1;
        c.beginPath(); c.moveTo(tx + 25, ty + 75); c.lineTo(tx + tw - 25, ty + 75); c.stroke();

        c.fillStyle = '#1f1a14';
        c.font = 'bold 15px serif';
        c.textAlign = 'left';
        c.fillText('主赛对决: “大脚”比佛 VS 英国皇家空军巴斯特', tx + 30, ty + 115);
        c.font = '14px sans-serif';
        c.fillStyle = '#554230';
        c.fillText('哈特给出的街头盘口: 20 : 5 (巨汉被全城狂热押注)', tx + 30, ty + 145);
        c.fillText('场边暗影: 一只瘦骨嶙峋的野狗正缩在帆布角柱旁呜咽', tx + 30, ty + 175);

        // 两个交互决策按钮
        // 按钮 1
        c.fillStyle = '#3a2818';
        c.fillRect(tx + 30, ty + th - 80, tw * 0.42, 50);
        c.fillStyle = '#ffeed0';
        c.font = 'bold 13px sans-serif';
        c.textAlign = 'center';
        c.fillText('① 押注大脚 (20:5)', tx + 30 + tw * 0.21, ty + th - 50);

        // 按钮 2
        c.fillStyle = '#61251e';
        c.fillRect(tx + tw * 0.52, ty + th - 80, tw * 0.42, 50);
        c.fillStyle = '#ffeed0';
        c.fillText('② 洞察恐惧 (野狗暗影)', tx + tw * 0.52 + tw * 0.21, ty + th - 50);

        // 印章印痕
        if (stamped) {
          c.save();
          c.translate(tx + tw / 2, ty + 140);
          c.rotate(-0.08);
          c.strokeStyle = stampColor;
          c.lineWidth = 3.5;
          c.strokeRect(-160, -22, 320, 44);
          c.fillStyle = stampColor;
          c.font = 'bold 15px sans-serif';
          c.textAlign = 'center';
          c.fillText(stampText, 0, 6);
          c.restore();
        }

        c.restore();
      });
    },

    // ----------------------------------------------------
    // 8. 博勒的报纸彩票打叉谜题 (Bolo's Spot the Ball)
    // ----------------------------------------------------
    spot_ball(api, finish) {
      const { c, W, H } = api;
      const nx = W * 0.12, nw = Math.min(520, W * 0.76), ny = H * 0.18, nh = Math.min(380, H * 0.62);
      let marked = false, mx = 0, my = 0;

      setTimeout(() => { if (!marked) api.showDone('撕碎报纸 · 继续'); }, 3000);

      api.on(api.cv, 'pointerdown', e => {
        if (marked) return;
        const q = api.pos(e);
        if (q.x >= nx + 30 && q.x <= nx + nw - 30 && q.y >= ny + 90 && q.y <= ny + nh - 70) {
          marked = true;
          mx = q.x; my = q.y;
          if (typeof SoundScape !== 'undefined') SoundScape.sfx('stamp');
          api.tip('红笔狠狠打叉！博勒冷笑：“全特立尼达都没人能领到这笔钱！”');
          api.showDone('撕碎报纸 · 继续');
        }
      });

      api.loop((dt, t) => {
        c.clearRect(0, 0, W, H);
        c.save();

        // 1940 年代特立尼达卫报版面
        c.fillStyle = '#eae2cf';
        c.fillRect(nx, ny, nw, nh);
        c.strokeStyle = '#3d3222';
        c.lineWidth = 3;
        c.strokeRect(nx, ny, nw, nh);

        // 报头
        c.fillStyle = '#1a1610';
        c.font = 'bold 22px serif';
        c.textAlign = 'center';
        c.fillText('THE TRINIDAD GUARDIAN', nx + nw / 2, ny + 34);
        c.font = '11px sans-serif';
        c.fillStyle = '#614e36';
        c.fillText('1947年 · 殖民地每周福利大奖竞猜 · 头奖 100 英镑', nx + nw / 2, ny + 54);

        c.strokeStyle = '#222';
        c.lineWidth = 1;
        c.beginPath(); c.moveTo(nx + 15, ny + 64); c.lineTo(nx + nw - 15, ny + 64); c.stroke();

        // 绿茵足球场坐标框
        const px = nx + 30, py = ny + 85, pw = nw - 60, ph = nh - 155;
        c.fillStyle = '#4a5b41';
        c.fillRect(px, py, pw, ph);
        c.strokeStyle = '#fff';
        c.lineWidth = 1.5;
        c.strokeRect(px, py, pw, ph);

        // 球场中线与球门线
        c.beginPath(); c.arc(px + pw / 2, py + ph / 2, 28, 0, Math.PI * 2); c.stroke();
        c.beginPath(); c.moveTo(px + pw / 2, py); c.lineTo(px + pw / 2, py + ph); c.stroke();

        // 提示字
        c.fillStyle = '#ffeed0';
        c.font = '13px sans-serif';
        c.textAlign = 'center';
        c.fillText('【点击球场任何位置，用红铅笔画 X 标出失踪的足球】', nx + nw / 2, py + 22);

        // 球员剪影
        c.fillStyle = '#111';
        c.fillRect(px + pw * 0.35, py + ph * 0.45, 12, 24);
        c.fillRect(px + pw * 0.62, py + ph * 0.40, 14, 26);

        // 底部博勒的警告
        c.fillStyle = '#2b2118';
        c.font = 'italic 12px serif';
        c.fillText('博勒注记：“这是一场彻头彻尾的骗局。球在出厂印刷时就被他们抹掉了。”', nx + nw / 2, ny + nh - 35);

        // 玩家红叉
        if (marked) {
          c.strokeStyle = '#c8553a';
          c.lineWidth = 4.5;
          c.beginPath();
          c.moveTo(mx - 15, my - 15); c.lineTo(mx + 15, my + 15);
          c.moveTo(mx + 15, my - 15); c.lineTo(mx - 15, my + 15);
          c.stroke();

          // 官方驳回红印
          c.save();
          c.translate(nx + nw / 2, ny + nh / 2);
          c.rotate(-0.12);
          c.strokeStyle = '#c8553a';
          c.lineWidth = 3;
          c.strokeRect(-140, -22, 280, 44);
          c.fillStyle = '#c8553a';
          c.font = 'bold 15px sans-serif';
          c.fillText('REJECTED · 未命中 (奖金: 0便士)', 0, 6);
          c.restore();
        }

        c.restore();
      });
    },

    // ----------------------------------------------------
    // 9. 终章漫步：离开米格尔街走向飞机
    // ----------------------------------------------------
    walk(api, finish) {
      const { c, W, H } = api;
      let walkDist = 0, holding = false, done = false;

      const press = () => { holding = true; };
      const release = () => { holding = false; };
      api.on(api.cv, 'pointerdown', press);
      api.on(window, 'pointerup', release);

      // 也允许按住任意按键漫步
      const kd = e => {
        if (e.code === 'Space' || e.code === 'ArrowRight' || e.code === 'KeyD') {
          e.preventDefault();
          holding = true;
        }
      };
      const ku = () => { holding = false; };
      api.on(window, 'keydown', kd);
      api.on(window, 'keyup', ku);

      setTimeout(() => { if (!done) api.showDone('快步登机 · 永不回头'); }, 3000);

      api.loop((dt) => {
        c.clearRect(0, 0, W, H);
        if (holding && !done) {
          walkDist += dt * 0.35;
          if (Math.random() < dt * 4.5 && typeof SoundScape !== 'undefined') SoundScape.sfx('step');
          if (walkDist >= 1) {
            done = true;
            api.tip('没有回头。');
            setTimeout(finish, 1400);
          }
        }

        // 典雅的进度指示
        c.save();
        c.strokeStyle = 'rgba(217, 164, 65, 0.5)';
        c.lineWidth = 2.5;
        c.strokeRect(W * 0.12, H * 0.86, W * 0.38, 7);
        c.fillStyle = '#c8553a';
        c.fillRect(W * 0.12, H * 0.86, W * 0.38 * Math.min(1, walkDist), 7);
        c.restore();
      });
    }
  };

  return {
    run,
    abort() { if (currentAbort) currentAbort(); },
    get active() { return !!currentAbort; }
  };
})();