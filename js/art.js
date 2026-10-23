/* ==========================================================
   米格尔街 · 水彩 SVG 绘制工具
   所有图形都套用 #wc 滤镜，获得手绘抖动的边缘。
   ========================================================== */
const Art = (() => {
  /* 颜色明暗调整 */
  function shade(hex, amt) {
    const n = parseInt(hex.slice(1), 16);
    let r = (n >> 16) + amt, g = ((n >> 8) & 255) + amt, b = (n & 255) + amt;
    r = Math.max(0, Math.min(255, r)); g = Math.max(0, Math.min(255, g)); b = Math.max(0, Math.min(255, b));
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
  const rnd = (seed => () => (seed = (seed * 16807) % 2147483647) / 2147483647)(42);

  /* ---------------- 人物 ---------------- */
  function figure(L, opt = {}) {
    const sk = L.skin, sx = L.slim ? 0.84 : L.wide ? 1.2 : 1;
    const ink = '#3a2a1e';
    let parts = '';
    // 腿
    if (L.dress) {
      parts += `<rect x="39" y="168" width="8" height="44" rx="3" fill="${sk}"/><rect x="53" y="168" width="8" height="44" rx="3" fill="${sk}"/>`;
    } else if (L.shorts) {
      parts += `<rect x="38" y="128" width="11" height="36" fill="${L.pants}"/><rect x="51" y="128" width="11" height="36" fill="${L.pants}"/>`;
      parts += `<rect x="40" y="162" width="8" height="50" rx="3" fill="${sk}"/><rect x="52" y="162" width="8" height="50" rx="3" fill="${sk}"/>`;
    } else {
      parts += `<path d="M${50 - 17 * sx},128 L${50 - 15 * sx},212 L49,212 L50,140 L51,212 L${50 + 15 * sx},212 L${50 + 17 * sx},128Z" fill="${L.pants}" stroke="${shade(L.pants, -30)}" stroke-width="1"/>`;
    }
    parts += `<ellipse cx="42" cy="214" rx="9" ry="4" fill="${ink}"/><ellipse cx="58" cy="214" rx="9" ry="4" fill="${ink}"/>`;
    // 身体
    const top = L.dress || L.shirt;
    if (L.dress) {
      parts += `<path d="M${50 - 20 * sx},70 Q50,62 ${50 + 20 * sx},70 L${50 + 34 * sx},172 Q50,180 ${50 - 34 * sx},172Z" fill="${L.dress}" stroke="${shade(L.dress, -40)}" stroke-width="1.2"/>`;
      parts += `<path d="M${50 - 28 * sx},140 Q50,148 ${50 + 28 * sx},140" stroke="${shade(L.dress, -35)}" stroke-width="2" fill="none" opacity=".6"/>`;
    } else {
      parts += `<path d="M${50 - 20 * sx},70 Q50,62 ${50 + 20 * sx},70 L${50 + 18 * sx},134 L${50 - 18 * sx},134Z" fill="${L.shirt}" stroke="${shade(L.shirt, -40)}" stroke-width="1.2"/>`;
      parts += `<path d="M44,70 L50,82 L56,70" stroke="${shade(L.shirt, -45)}" stroke-width="1.5" fill="none"/>`;
    }
    // 手臂
    const lx = 50 - 21 * sx, rx = 50 + 21 * sx;
    parts += `<path d="M${lx},76 Q${lx - 9},104 ${lx - 5},136" stroke="${top}" stroke-width="10" stroke-linecap="round" fill="none"/>`;
    parts += `<path d="M${rx},76 Q${rx + 9},104 ${rx + 5},136" stroke="${top}" stroke-width="10" stroke-linecap="round" fill="none"/>`;
    parts += `<circle cx="${lx - 5}" cy="139" r="5.5" fill="${sk}"/><circle cx="${rx + 5}" cy="139" r="5.5" fill="${sk}"/>`;
    // 道具
    const hx = rx + 5;
    if (L.prop === 'plane') parts += `<rect x="${hx - 6}" y="132" width="26" height="11" rx="2" fill="#b07a45" stroke="${ink}" stroke-width="1"/><rect x="${hx + 4}" y="127" width="5" height="6" fill="#6b3e26"/>`;
    if (L.prop === 'paper') parts += `<rect x="${hx - 4}" y="118" width="18" height="24" fill="#fffbe8" stroke="${ink}" stroke-width="1" transform="rotate(12 ${hx} 130)"/><line x1="${hx}" y1="126" x2="${hx + 10}" y2="128" stroke="${ink}" stroke-width="1"/>`;
    if (L.prop === 'rocket') parts += `<line x1="${hx}" y1="150" x2="${hx + 6}" y2="80" stroke="#8a6a4a" stroke-width="2"/><rect x="${hx + 2}" y="76" width="9" height="26" rx="2" fill="#d95b72" stroke="${ink}" stroke-width="1" transform="rotate(5 ${hx + 6} 88)"/><path d="M${hx + 3},76 L${hx + 7},66 L${hx + 11},76Z" fill="#e8c547"/>`;
    if (L.prop === 'paperroll') parts += `<rect x="${hx - 6}" y="128" width="24" height="10" rx="4" fill="#efe9d8" stroke="${ink}" stroke-width="1" transform="rotate(-18 ${hx} 133)"/>`;
    // 脖子、头
    parts += `<rect x="45" y="52" width="10" height="14" fill="${sk}"/>`;
    parts += `<circle cx="50" cy="40" r="17" fill="${sk}" stroke="${shade(sk, -25)}" stroke-width="1"/>`;
    if (!L.hat && !L.wrap) parts += `<path d="M33,38 Q34,20 50,21 Q66,20 67,38 Q60,28 50,29 Q40,28 33,38Z" fill="#1f1610"/>`;
    // 脸
    parts += `<circle cx="44" cy="41" r="1.8" fill="${ink}"/><circle cx="56" cy="41" r="1.8" fill="${ink}"/>`;
    parts += opt.sad
      ? `<path d="M45,50 Q50,47 55,50" stroke="${ink}" stroke-width="1.4" fill="none"/>`
      : `<path d="M45,48 Q50,52 55,48" stroke="${ink}" stroke-width="1.4" fill="none"/>`;
    if (L.cig) parts += `<line x1="55" y1="49" x2="66" y2="51" stroke="#fffbe8" stroke-width="2.2"/><circle cx="66.5" cy="51" r="1.4" fill="#e85a2a"/>`;
    // 帽子 / 头巾
    if (L.hat === 'fedora') parts += `<ellipse cx="50" cy="27" rx="27" ry="5" fill="${L.hatColor}"/><path d="M36,27 Q36,10 50,11 Q64,10 64,27Z" fill="${L.hatColor}"/><rect x="36" y="22" width="28" height="4" fill="#1a1a1a"/>`;
    if (L.hat === 'felt') parts += `<ellipse cx="50" cy="28" rx="25" ry="6" fill="${L.hatColor}"/><path d="M35,28 Q34,8 50,9 Q66,8 65,28Z" fill="${L.hatColor}"/><path d="M38,24 Q50,20 62,24" stroke="${shade(L.hatColor, -40)}" stroke-width="3" fill="none"/>`;
    if (L.wrap) parts += `<path d="M31,38 Q30,14 50,16 Q72,14 69,38 Q62,26 50,27 Q38,26 31,38Z" fill="${L.wrap}"/><circle cx="66" cy="20" r="6" fill="${L.wrap}"/>`;

    const s = L.scale || 1;
    return `<svg viewBox="0 0 100 222" width="${(opt.h || 200) * 0.45 * s}" height="${(opt.h || 200) * s}" preserveAspectRatio="xMidYMax meet"><g filter="url(#wc)">${parts}</g></svg>`;
  }

  /* ---------------- 树 ---------------- */
  function mango(x, gy, s = 1) {
    let g = `<path d="M${x - 8 * s},${gy} Q${x - 4 * s},${gy - 70 * s} ${x - 10 * s},${gy - 110 * s} L${x + 8 * s},${gy - 110 * s} Q${x + 4 * s},${gy - 60 * s} ${x + 10 * s},${gy}Z" fill="#6b4a32"/>`;
    const greens = ['#3f6b45', '#4a7c59', '#5c8f5a', '#35603d', '#6a9a5f'];
    for (let i = 0; i < 11; i++) {
      const a = (i / 11) * Math.PI * 2, r = (30 + rnd() * 26) * s;
      g += `<circle cx="${x + Math.cos(a) * 48 * s}" cy="${gy - 140 * s + Math.sin(a) * 30 * s}" r="${r}" fill="${greens[i % 5]}" opacity=".92"/>`;
    }
    g += `<circle cx="${x}" cy="${gy - 145 * s}" r="${44 * s}" fill="#4a7c59"/>`;
    for (let i = 0; i < 7; i++) g += `<ellipse cx="${x - 50 * s + rnd() * 100 * s}" cy="${gy - 160 * s + rnd() * 60 * s}" rx="${4 * s}" ry="${5.5 * s}" fill="${i % 2 ? '#e8a547' : '#d9a03c'}"/>`;
    return `<g class="sway">${g}</g>`;
  }
  function palm(x, gy, h = 220, lean = 20) {
    const tx = x + lean, ty = gy - h;
    let g = `<path d="M${x - 6},${gy} Q${x + lean * 0.2},${gy - h * 0.5} ${tx - 3},${ty} L${tx + 3},${ty} Q${x + lean * 0.3 + 6},${gy - h * 0.5} ${x + 6},${gy}Z" fill="#8a6a4a"/>`;
    for (let i = 0; i < 8; i++) g += `<line x1="${x - 4 + (lean * i) / 9}" y1="${gy - (h * i) / 8}" x2="${x + 4 + (lean * i) / 9}" y2="${gy - (h * i) / 8 - 3}" stroke="#6b4a32" stroke-width="1.5"/>`;
    const fr = [[-80, 30], [-55, -10], [-20, -30], [25, -32], [60, -8], [85, 30], [-40, 45], [45, 45]];
    fr.forEach(([dx, dy]) => {
      g += `<path d="M${tx},${ty} Q${tx + dx * 0.5},${ty + dy - 30} ${tx + dx},${ty + dy + 20}" stroke="#4a7c59" stroke-width="9" fill="none" stroke-linecap="round"/>`;
      g += `<path d="M${tx},${ty} Q${tx + dx * 0.5},${ty + dy - 30} ${tx + dx},${ty + dy + 20}" stroke="#6a9a5f" stroke-width="3" fill="none" stroke-dasharray="4 5"/>`;
    });
    g += `<circle cx="${tx - 5}" cy="${ty + 6}" r="6" fill="#7a5a2a"/><circle cx="${tx + 6}" cy="${ty + 8}" r="6" fill="#6b4a22"/>`;
    return `<g class="sway">${g}</g>`;
  }
  function bush(x, gy, w = 60, c = '#4a7c59', flowers = '#d95b72') {
    let g = '';
    for (let i = 0; i < 5; i++) g += `<circle cx="${x - w / 2 + (w * i) / 4}" cy="${gy - 12 - rnd() * 10}" r="${w / 4 + rnd() * 6}" fill="${i % 2 ? c : shade(c, 18)}"/>`;
    if (flowers) for (let i = 0; i < 5; i++) g += `<circle cx="${x - w / 2 + rnd() * w}" cy="${gy - 10 - rnd() * 24}" r="3.5" fill="${flowers}"/>`;
    return g;
  }

  /* ---------------- 房屋 ---------------- */
  function windowEl(x, y, w, h, frame = '#f4ecd8') {
    let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#3e3a36" stroke="${frame}" stroke-width="4"/>`;
    s += `<rect class="win-glow" x="${x}" y="${y}" width="${w}" height="${h}" fill="#ffd77a" opacity="0" style="transition:opacity 1.6s"/>`;
    for (let i = 1; i < h / 7; i++) s += `<line x1="${x}" y1="${y + i * 7}" x2="${x + w}" y2="${y + i * 7}" stroke="${shade(frame, -40)}" stroke-width="2.2"/>`;
    return s;
  }
  function house(o) {
    const pad = 70, w = o.w || 220, h = o.h || 160, roofH = 66, stilt = 18;
    const W = w + pad * 2, H = roofH + h + stilt;
    const x0 = pad, yW = roofH, gy = H;
    const wall = o.wall, roof = o.roof || '#8a8f93';
    let back = '', g = '', front = '';

    // 背景树
    if (o.tree === 'mango') back += mango(x0 - 10, gy, 0.95);
    if (o.tree === 'jungle') back += palm(x0 + w * 0.15, gy, 250, -30) + mango(x0 + w + 20, gy, 0.9) + palm(x0 + w * 0.8, gy, 280, 25);

    // 墙
    g += `<rect x="${x0}" y="${yW}" width="${w}" height="${h}" fill="${wall}" stroke="${shade(wall, -50)}" stroke-width="1.5"/>`;
    if (o.kind === 'workshop' || o.kind === 'shack' || o.kind === 'garage') {
      for (let i = 1; i < w / 18; i++) g += `<line x1="${x0 + i * 18}" y1="${yW}" x2="${x0 + i * 18}" y2="${yW + h}" stroke="${shade(wall, -28)}" stroke-width="1.2"/>`;
    }
    // 高脚
    for (let i = 0; i <= 4; i++) g += `<rect x="${x0 + 6 + ((w - 18) * i) / 4}" y="${yW + h}" width="6" height="${stilt}" fill="${shade(wall, -70)}"/>`;
    // 屋顶（波纹铁皮）
    g += `<path d="M${x0 - 16},${yW + 6} L${x0 + w * 0.16},${8} L${x0 + w * 0.84},${8} L${x0 + w + 16},${yW + 6}Z" fill="${roof}" stroke="${shade(roof, -45)}" stroke-width="1.5"/>`;
    for (let i = 1; i < w / 11; i++) {
      const px = x0 + w * 0.16 + ((w * 0.68) * i) / (w / 11), bx = x0 - 16 + ((w + 32) * i) / (w / 11);
      g += `<line x1="${px}" y1="10" x2="${bx}" y2="${yW + 4}" stroke="${shade(roof, -22)}" stroke-width="1.3"/>`;
    }
    g += `<path d="M${x0 + w * 0.3},20 l18,0 l3,${yW - 18}" stroke="${shade(roof, 25)}" stroke-width="5" fill="none" opacity=".35"/>`; // 锈迹高光

    // 门窗
    const dw = 40, dh = Math.min(92, h - 30), dx = x0 + w / 2 - dw / 2, dy = yW + h - dh;
    if (o.kind === 'workshop') {
      g += `<rect x="${x0 + 24}" y="${yW + 34}" width="${w - 48}" height="${h - 34}" fill="#3a2a1e"/>`;
      g += `<rect class="win-glow" x="${x0 + 24}" y="${yW + 34}" width="${w - 48}" height="${h - 34}" fill="#f2b65a" opacity="0" style="transition:opacity 1.6s"/>`;
      g += `<rect x="${x0 + 40}" y="${yW + h - 36}" width="${w - 80}" height="10" fill="#b07a45"/><rect x="${x0 + 48}" y="${yW + h - 26}" width="6" height="26" fill="#6b3e26"/><rect x="${x0 + w - 54}" y="${yW + h - 26}" width="6" height="26" fill="#6b3e26"/>`;
      for (let i = 0; i < 6; i++) front += `<path d="M${x0 + 30 + rnd() * (w - 20)},${gy - 2} q4,-6 8,0 q-4,4 -8,0" stroke="#e8c58a" stroke-width="2" fill="none"/>`;
    } else if (o.kind === 'garage') {
      g += `<rect x="${x0 + 20}" y="${yW + 30}" width="${w - 40}" height="${h - 30}" fill="#2f2a26"/>`;
      front += `<circle cx="${x0 + w * 0.35}" cy="${gy - 14}" r="14" fill="#2a2a2a" stroke="#666" stroke-width="3"/><rect x="${x0 + w * 0.5}" y="${gy - 16}" width="30" height="14" fill="#7a7a7a"/><path d="M${x0 + w * 0.7},${gy - 4} l14,-10 l6,4" stroke="#9a9a9a" stroke-width="3" fill="none"/>`;
    } else {
      g += `<rect x="${dx}" y="${dy}" width="${dw}" height="${dh}" fill="${o.door || '#6b3e26'}" stroke="${shade(o.door || '#6b3e26', -30)}" stroke-width="2"/>`;
      g += `<circle cx="${dx + dw - 8}" cy="${dy + dh / 2}" r="2.4" fill="#e8c547"/>`;
      const ww = Math.min(46, (w - dw) / 2 - 30);
      g += windowEl(x0 + (w / 2 - dw / 2) / 2 - ww / 2, yW + 28, ww, 44);
      g += windowEl(x0 + w - (w / 2 - dw / 2) / 2 - ww / 2, yW + 28, ww, 44);
      // 台阶
      g += `<rect x="${dx - 8}" y="${gy - stilt}" width="${dw + 16}" height="6" fill="#a89a84"/><rect x="${dx - 14}" y="${gy - stilt + 6}" width="${dw + 28}" height="6" fill="#968872"/><rect x="${dx - 20}" y="${gy - 6}" width="${dw + 40}" height="6" fill="#857761"/>`;
    }

    // 各家特色
    if (o.sign) {
      g += `<g transform="rotate(-4 ${x0 + w / 2} ${yW + 14})"><rect x="${x0 + w / 2 - 44}" y="${yW + 4}" width="88" height="22" fill="#f8f0d8" stroke="#3a2a1e" stroke-width="1.5"/><text x="${x0 + w / 2}" y="${yW + 20}" text-anchor="middle" font-family="Georgia,serif" font-size="13" font-weight="700" fill="#3a2a1e" letter-spacing="2">${o.sign}</text></g>`;
    }
    if (o.fireworks) {
      const cs = ['#d95b72', '#e8c547', '#2b6e82', '#4a7c59'];
      for (let i = 0; i < 6; i++) {
        const fx = x0 + 10 + i * 13;
        front += `<g transform="rotate(${-8 + i * 4} ${fx} ${gy})"><rect x="${fx}" y="${gy - 46 - (i % 3) * 8}" width="9" height="${40 + (i % 3) * 8}" fill="${cs[i % 4]}" stroke="#3a2a1e" stroke-width="1"/><line x1="${fx + 4.5}" y1="${gy - 46 - (i % 3) * 8}" x2="${fx + 7}" y2="${gy - 56 - (i % 3) * 8}" stroke="#3a2a1e" stroke-width="1"/></g>`;
      }
      front += `<rect x="${x0 + w - 70}" y="${gy - 24}" width="40" height="22" fill="#8a6a4a" stroke="#3a2a1e"/><text x="${x0 + w - 50}" y="${gy - 9}" text-anchor="middle" font-size="9" font-family="Georgia" fill="#fff4d0">BANG!</text>`;
    }
    if (o.washing) {
      const lx1 = x0 - 50, lx2 = x0 + 6, ly = yW + h - 50;
      front += `<line x1="${lx1}" y1="${gy}" x2="${lx1}" y2="${ly - 10}" stroke="#6b4a32" stroke-width="4"/>`;
      front += `<path d="M${lx1},${ly - 8} Q${(lx1 + lx2) / 2},${ly + 6} ${lx2},${ly - 8}" stroke="#555" stroke-width="1.2" fill="none"/>`;
      const cl = ['#d95b72', '#f4ecd8', '#2b6e82', '#e8c547'];
      for (let i = 0; i < 4; i++) front += `<rect x="${lx1 + 4 + i * 13}" y="${ly - 2 + (i === 1 || i === 2 ? 4 : 0)}" width="10" height="${16 + (i % 2) * 6}" fill="${cl[i]}" class="sway"/>`;
      // 栅栏
      for (let i = 0; i < 16; i++) front += `<path d="M${x0 - 60 + i * ((w + 120) / 16)},${gy} l0,-34 l4,-6 l4,6 l0,34Z" fill="#f2ead6" stroke="#9a8a70" stroke-width="1"/>`;
      front += `<rect x="${x0 - 60}" y="${gy - 26}" width="${w + 120}" height="4" fill="#e2d8c0"/>`;
    }
    if (o.bench) {
      // 门廊
      g += `<rect x="${x0 - 30}" y="${yW + 20}" width="${w + 60}" height="10" fill="${shade(roof, 10)}"/>`;
      g += `<rect x="${x0 - 26}" y="${yW + 30}" width="6" height="${h + stilt - 30}" fill="#f2ead6"/><rect x="${x0 + w + 20}" y="${yW + 30}" width="6" height="${h + stilt - 30}" fill="#f2ead6"/>`;
      front += `<rect x="${x0 + 10}" y="${gy - 22}" width="70" height="6" fill="#8a6a4a"/><rect x="${x0 + 14}" y="${gy - 16}" width="4" height="16" fill="#6b4a32"/><rect x="${x0 + 72}" y="${gy - 16}" width="4" height="16" fill="#6b4a32"/>`;
      front += bush(x0 + w - 10, gy, 50, '#4a7c59', '#e8c547');
    }
    if (o.kind === 'school') {
      g += `<rect x="${x0 + w / 2 - 66}" y="${yW + 6}" width="132" height="20" fill="#fffbe8" stroke="#3a2a1e"/><text x="${x0 + w / 2}" y="${yW + 20}" text-anchor="middle" font-family="Georgia" font-size="11" fill="#3a2a1e">TITUS HOYT, I.A. (London)</text>`;
    }
    if (o.kind === 'pink') front += bush(x0 + 20, gy, 60, '#4a7c59', '#d95b72') + bush(x0 + w - 20, gy, 50, '#3f6b45', '#f4ecd8');
    if (o.kind === 'garden') front += bush(x0 + w / 2 - 50, gy, 70, '#3f6b45', '#e8c547') + bush(x0 + w / 2 + 60, gy, 80, '#4a7c59', '#d95b72');
    if (o.kind === 'servant') front += bush(x0 + w + 20, gy, 40, '#5c8f5a', '#f4ecd8');

    return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" overflow="visible"><g filter="url(#wc)">${back}${g}${front}</g></svg>`;
  }

  function cart() {
    return `<svg width="190" height="120" viewBox="0 0 190 120"><g filter="url(#wc)">
      <rect x="20" y="30" width="130" height="60" rx="4" fill="#2b6e82" stroke="#1d4b59" stroke-width="2"/>
      <rect x="28" y="38" width="114" height="16" fill="#3f8aa0"/>
      <text x="85" y="76" text-anchor="middle" font-family="Georgia" font-size="12" fill="#f4ecd8">CITY COUNCIL</text>
      <line x1="150" y1="60" x2="186" y2="52" stroke="#6b4a32" stroke-width="5"/>
      <circle cx="50" cy="96" r="20" fill="none" stroke="#3a2a1e" stroke-width="6"/><circle cx="120" cy="96" r="20" fill="none" stroke="#3a2a1e" stroke-width="6"/>
      <circle cx="50" cy="96" r="4" fill="#3a2a1e"/><circle cx="120" cy="96" r="4" fill="#3a2a1e"/>
      <path d="M30,30 q10,-16 24,-4 q8,-14 22,-2 q12,-12 22,2 q14,-10 24,4" fill="#8a7a5a"/></g></svg>`;
  }

  function signpost() {
    return `<svg width="220" height="230" viewBox="0 0 220 230"><g filter="url(#wc)">
      ${palm(170, 230, 210, 10)}
      <rect x="66" y="40" width="8" height="190" fill="#6b4a32"/>
      <path d="M74,50 L170,50 L186,64 L170,78 L74,78Z" fill="#f4ecd8" stroke="#3a2a1e" stroke-width="2"/>
      <text x="126" y="69" text-anchor="middle" font-family="Georgia" font-size="13" font-weight="700" fill="#3a2a1e">PIARCO ✈</text>
      <path d="M66,92 L10,92 L-4,106 L10,120 L66,120Z" fill="#e8c547" stroke="#3a2a1e" stroke-width="2"/>
      <text x="32" y="111" text-anchor="middle" font-family="Georgia" font-size="11" fill="#3a2a1e">MIGUEL ST.</text>
      <rect x="90" y="196" width="48" height="32" rx="3" fill="#8a4a2a" stroke="#3a2a1e" stroke-width="2"/><path d="M104,196 q10,-12 20,0" stroke="#3a2a1e" stroke-width="3" fill="none"/>
    </g></svg>`;
  }

  /* ---------------- 远景与前景 ---------------- */
  function farLayer(width, vh) {
    const h = vh * 0.75;
    let d = `M0,${h}`;
    for (let x = 0; x <= width; x += 120) d += ` Q${x + 60},${h - 120 - Math.sin(x / 400) * 70 - rnd() * 40} ${x + 120},${h - 80 - Math.cos(x / 300) * 30}`;
    d += ` L${width},${vh} L0,${vh}Z`;
    let roofs = '';
    for (let x = 30; x < width; x += 70 + rnd() * 60) {
      const rh = 26 + rnd() * 26, rw = 40 + rnd() * 40, y = h - 10;
      roofs += `<rect x="${x}" y="${y - rh}" width="${rw}" height="${rh + 40}" fill="${['#c9a98a', '#b8a28c', '#d4b48c', '#a8b0a0'][Math.floor(rnd() * 4)]}" opacity=".7"/><path d="M${x - 4},${y - rh} L${x + rw / 2},${y - rh - 14} L${x + rw + 4},${y - rh}Z" fill="#8f7c6c" opacity=".7"/>`;
    }
    return `<svg width="${width}" height="${vh}" viewBox="0 0 ${width} ${vh}" style="position:absolute;left:0;top:0"><g filter="url(#wc-soft)">
      <path d="${d}" fill="#8fae9a" opacity=".55"/>
      <path d="${d}" transform="translate(-80,40)" fill="#7a9a86" opacity=".5"/></g><g filter="url(#wc)">${roofs}</g></svg>`;
  }

  function frontLayer(width, vh) {
    let g = '';
    const gy = vh;
    for (let x = 80; x < width; x += 260 + rnd() * 200) {
      const t = rnd();
      if (t < 0.35) g += bush(x, gy, 70 + rnd() * 40, rnd() > .5 ? '#3f6b45' : '#4a7c59', ['#d95b72', '#e8c547', '#f4ecd8'][Math.floor(rnd() * 3)]);
      else if (t < 0.55) g += `<ellipse cx="${x}" cy="${gy - 6}" rx="12" ry="8" fill="#7a5a2a"/><ellipse cx="${x + 18}" cy="${gy - 5}" rx="10" ry="7" fill="#6b4a22"/>`;
      else if (t < 0.75) {
        g += `<rect x="${x}" y="${gy - 220}" width="6" height="220" fill="#4a4a4a"/><path d="M${x + 3},${gy - 220} q30,-10 40,6" stroke="#4a4a4a" stroke-width="5" fill="none"/><rect x="${x + 36}" y="${gy - 214}" width="14" height="10" fill="#3a3a3a"/>`;
        g += `<circle class="lamp-glow" cx="${x + 43}" cy="${gy - 200}" r="40" fill="url(#lampGrad)" opacity="0" style="transition:opacity 1.6s"/>`;
      } else g += `<path d="M${x},${gy} q-6,-40 -24,-60 M${x},${gy} q4,-46 14,-70 M${x},${gy} q10,-30 30,-44" stroke="#5c8f5a" stroke-width="4" fill="none" class="sway"/>`;
    }
    // 小狗
    g += `<g transform="translate(${width * 0.42},${gy - 34})"><ellipse cx="20" cy="18" rx="20" ry="10" fill="#c9a46b"/><circle cx="40" cy="10" r="9" fill="#c9a46b"/><path d="M44,4 l6,-6 l0,10Z" fill="#8a6a4a"/><rect x="6" y="24" width="4" height="10" fill="#8a6a4a"/><rect x="30" y="24" width="4" height="10" fill="#8a6a4a"/><path d="M0,14 q-10,-8 -6,-16" stroke="#c9a46b" stroke-width="4" fill="none"/></g>`;
    return `<svg width="${width}" height="${vh}" viewBox="0 0 ${width} ${vh}" style="position:absolute;left:0;top:0;pointer-events:none">
      <defs><radialGradient id="lampGrad"><stop offset="0" stop-color="#ffe7a0" stop-opacity=".9"/><stop offset="1" stop-color="#ffe7a0" stop-opacity="0"/></radialGradient></defs>
      <g filter="url(#wc)">${g}</g></svg>`;
  }

  const TINTS = {
    day:   'linear-gradient(#a9d6df 0%, #f6e6bf 64%, #d8c39c 64%, #c4ab80 100%)',
    dusk:  'linear-gradient(#f3b36b 0%, #d77a6a 38%, #7a4e7a 64%, #6b5a5a 64%, #4e3f3f 100%)',
    night: 'linear-gradient(#0b1530 0%, #24345e 64%, #2b2a3a 64%, #1c1b26 100%)',
    blue:  'linear-gradient(#9fb3c0 0%, #c7d0cf 64%, #8a9496 64%, #6f797b 100%)',
    fire:  'linear-gradient(#1a0b10 0%, #4a1616 45%, #b8452a 64%, #2a1a14 64%, #120a08 100%)',
    dawn:  'linear-gradient(#f9d0a0 0%, #f6efe0 62%, #bfb6a6 62%, #9f9688 100%)',
  };

  return { figure, house, cart, signpost, farLayer, frontLayer, mango, palm, TINTS, shade };
})();
