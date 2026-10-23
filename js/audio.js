/* ==========================================================
   米格尔街 · 声景与卡里普索留声机（Web Audio 实时合成，无需音频文件）
   - 卡里普索留声机（Calypso Gramophone）：
     1. Lord Invader · Rum and Coca-Cola (经典加勒比欢快节奏)
     2. Lord Caresser · Love, Love, Love Alone (深情小调加勒比风)
     3. Trinidad Carnival · Road March (狂欢节钢鼓敲击旋律)
     4. Savannah Midnight Jazz (大草原萨瓦纳星空柔和夜曲)
   - 环境音：波普木工房刨削、B.华兹华斯院中蜜蜂、火药爆燃、打翻牛奶等
   ========================================================== */
const SoundScape = (() => {
  let ctx, master, music, ambBus, on = false, mode = 'calypso';
  let nextTime = 0, step = 0, timer = null, noiseBuf;
  const prox = { popo: 0, words: 0 };
  let bees = null, hammerAt = 0;
  let currentTrackIdx = 0;

  const NOTE = n => 440 * Math.pow(2, (n - 69) / 12);

  // 4 大真实加勒比经典留声机乐曲
  const TRACKS = [
    {
      id: 'rum',
      name: 'Rum and Coca-Cola',
      nameZh: '朗姆与可口可乐',
      artist: 'Lord Invader · 1943',
      tempo: 114,
      chords: [[60, 64, 67, 72], [65, 69, 72, 77], [67, 71, 74, 77], [60, 64, 67, 72]],
      bass: [36, 41, 43, 36],
      melody: [
        [72, null, null, 76, null, null, 79, null, 76, null, null, 72, null, 74, null, null],
        [77, null, null, 76, null, null, 74, null, 72, null, null, 69, null, 72, null, null],
        [74, null, null, 77, null, null, 79, null, 77, null, 76, null, 74, null, 71, null],
        [72, null, 67, null, 72, null, null, 76, null, null, 79, null, 76, null, null, null],
      ]
    },
    {
      id: 'love',
      name: 'Love, Love, Love Alone',
      nameZh: '只是为了，爱，爱，爱',
      artist: 'Lord Caresser · 1937',
      tempo: 98,
      chords: [[57, 60, 64, 69], [53, 57, 60, 65], [52, 55, 59, 64], [57, 60, 64, 69]],
      bass: [33, 41, 40, 33],
      melody: [
        [69, null, 72, null, 76, null, 74, null, 72, null, null, 69, null, 71, null, null],
        [72, null, 71, null, 69, null, 67, null, 65, null, null, 67, null, 69, null, null],
        [67, null, 65, null, 64, null, 62, null, 64, null, null, 67, null, 65, null, null],
        [64, null, 60, null, 64, null, 67, null, 69, null, null, null, null, null, null, null],
      ]
    },
    {
      id: 'carnival',
      name: 'Carnival Road March',
      nameZh: '狂欢节街头进行曲',
      artist: 'Trinidad All-Stars Steel Orchestra',
      tempo: 122,
      chords: [[60, 64, 67, 72], [60, 64, 67, 72], [65, 69, 72, 77], [67, 71, 74, 77]],
      bass: [36, 36, 41, 43],
      melody: [
        [72, 72, null, 76, 76, null, 79, 79, 76, null, 72, null, 74, 74, null, null],
        [79, 79, null, 76, 76, null, 72, 72, 67, null, 72, null, 76, 76, null, null],
        [77, 77, null, 76, 76, null, 74, 74, 72, null, 69, null, 72, 72, null, null],
        [74, null, 77, null, 79, null, 81, null, 79, null, 76, null, 72, null, null, null],
      ]
    },
    {
      id: 'savannah',
      name: 'Savannah Midnight Jazz',
      nameZh: '萨瓦纳午夜星空蓝调',
      artist: 'Port of Spain Nocturne',
      tempo: 84,
      chords: [[53, 57, 60, 64], [55, 59, 62, 65], [52, 55, 59, 62], [57, 60, 64, 67]],
      bass: [29, 31, 28, 33],
      melody: [
        [64, null, null, null, 67, null, null, null, 71, null, null, null, 69, null, null, null],
        [67, null, null, null, 65, null, null, null, 62, null, null, null, 64, null, null, null],
        [62, null, null, null, 60, null, null, null, 59, null, null, null, 62, null, null, null],
        [60, null, null, null, 64, null, null, null, 67, null, null, null, 69, null, null, null],
      ]
    }
  ];

  const SAD_CHORDS = [[57, 60, 64], [53, 57, 60], [48, 52, 55], [55, 59, 62]];

  function init() {
    if (ctx) return;
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createGain(); master.gain.value = 0; master.connect(ctx.destination);
    const comp = ctx.createDynamicsCompressor(); comp.connect(master);
    music = ctx.createGain(); music.gain.value = 0.32; music.connect(comp);
    ambBus = ctx.createGain(); ambBus.gain.value = 0.5; ambBus.connect(comp);
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 1, ctx.sampleRate);
    const d = noiseBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    // 蜜蜂嗡鸣
    const o = ctx.createOscillator(); o.type = 'sawtooth'; o.frequency.value = 210;
    const lfo = ctx.createOscillator(); lfo.frequency.value = 7; const lg = ctx.createGain(); lg.gain.value = 18; lfo.connect(lg).connect(o.frequency);
    const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 600; f.Q.value = 3;
    const g = ctx.createGain(); g.gain.value = 0;
    o.connect(f).connect(g).connect(ambBus); o.start(); lfo.start();
    bees = g;
  }

  /* ---- 乐器合成 ---- */
  function steelpan(freq, t, vol = 0.2, dur = 0.9) {
    const g = ctx.createGain(); g.connect(music);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.006); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    [[1, 1], [2.0, 0.35], [3.01, 0.12], [0.5, 0.15]].forEach(([m, a]) => {
      const o = ctx.createOscillator(), og = ctx.createGain(); o.type = 'sine'; o.frequency.value = freq * m; og.gain.value = a;
      o.connect(og).connect(g); o.start(t); o.stop(t + dur + .05);
    });
  }
  function pluck(freq, t, vol = 0.18, dur = 1.8) {
    const o = ctx.createOscillator(), f = ctx.createBiquadFilter(), g = ctx.createGain();
    o.type = 'triangle'; o.frequency.value = freq; f.type = 'lowpass'; f.frequency.setValueAtTime(2400, t); f.frequency.exponentialRampToValueAtTime(400, t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.004); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(f).connect(g).connect(music); o.start(t); o.stop(t + dur + .05);
  }
  function bass(freq, t, dur = 0.35) {
    const o = ctx.createOscillator(), f = ctx.createBiquadFilter(), g = ctx.createGain();
    o.type = 'triangle'; o.frequency.value = freq; f.type = 'lowpass'; f.frequency.value = 500;
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.4, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(f).connect(g).connect(music); o.start(t); o.stop(t + dur + .05);
  }
  function noise(t, dur, freq, vol, type = 'bandpass', dest) {
    const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
    s.buffer = noiseBuf; f.type = type; f.frequency.value = freq; f.Q.value = 1.2;
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f).connect(g).connect(dest || music); s.start(t, Math.random() * 0.5); s.stop(t + dur + .05);
  }

  /* ---- 调度循环 ---- */
  function schedule() {
    const trk = TRACKS[currentTrackIdx];
    const tempo = mode === 'sad' ? 70 : mode === 'night' ? trk.tempo * 0.85 : trk.tempo;
    const sx = 60 / tempo / 4;
    while (nextTime < ctx.currentTime + 0.15) {
      const bar = Math.floor(step / 16) % 4, s = step % 16, t = nextTime;
      if (mode === 'calypso' || mode === 'night') {
        const soft = mode === 'night' ? 0.65 : 1;
        const m = trk.melody[bar][s]; if (m) steelpan(NOTE(m), t, 0.18 * soft);
        if ([2, 6, 10, 14].includes(s)) trk.chords[bar].slice(0, 3).forEach(n => steelpan(NOTE(n - 12), t, 0.05 * soft, 0.35));
        if ([0, 3, 8, 11].includes(s)) bass(NOTE(trk.bass[bar] + (s === 8 || s === 11 ? 7 : 0)), t);
        if (s % 2 === 0) noise(t, 0.05, 7500, s % 4 === 0 ? 0.06 : 0.03, 'highpass');
      } else if (mode === 'sad') {
        if (s === 0 || s === 6 || s === 10) {
          const c = SAD_CHORDS[bar]; c.forEach((n, i) => pluck(NOTE(n), t + i * 0.06, 0.1));
        }
        if (s === 14 && bar % 2) pluck(NOTE(SAD_CHORDS[bar][2] + 12), t, 0.06, 2.4);
      }
      // 环境：波普的刨木 / 锤子
      if (prox.popo > 0.05 && t > hammerAt) {
        noise(t, 0.08, 1800, 0.25 * prox.popo, 'bandpass', ambBus);
        noise(t + 0.02, 0.15, 400, 0.15 * prox.popo, 'lowpass', ambBus);
        hammerAt = t + 0.6 + Math.random() * 0.9;
      }
      nextTime += sx; step++;
    }
    if (bees) bees.gain.setTargetAtTime(0.03 * prox.words, ctx.currentTime, 0.3);
  }

  function setOn(v) {
    init();
    on = v;
    if (ctx.state === 'suspended') ctx.resume();
    master.gain.setTargetAtTime(on ? 0.75 : 0, ctx.currentTime, 0.4);
    if (on && !timer) { nextTime = ctx.currentTime + 0.1; timer = setInterval(schedule, 40); }
  }
  function setMode(m) {
    if (!m || m === mode) return;
    mode = m;
    if (!ctx) return;
    music.gain.setTargetAtTime(m === 'off' ? 0 : 0.32, ctx.currentTime, 0.6);
  }
  function setProximity(p) { Object.assign(prox, p); }

  /* 留声机切歌 API */
  function nextTrack() {
    init();
    if (!on) setOn(true);
    currentTrackIdx = (currentTrackIdx + 1) % TRACKS.length;
    step = 0; // 从头起拍
    sfx('flip');
    return TRACKS[currentTrackIdx];
  }
  function setTrack(idx) {
    init();
    if (idx >= 0 && idx < TRACKS.length) {
      currentTrackIdx = idx;
      step = 0;
      if (!on) setOn(true);
      return TRACKS[currentTrackIdx];
    }
  }
  function getTrackInfo() {
    return TRACKS[currentTrackIdx];
  }

  function sfx(name) {
    if (!ctx || !on) return;
    const t = ctx.currentTime;
    switch (name) {
      case 'shave': noise(t, 0.12, 2500 + Math.random() * 1500, 0.18, 'bandpass', ambBus); break;
      case 'flip': noise(t, 0.06, 3000, 0.2, 'highpass', ambBus); break;
      case 'star': steelpan(NOTE(84 + [0, 2, 4, 7, 9, 12, 14][Math.floor(Math.random() * 7)]), t, 0.12, 1.4); break;
      case 'chalk': noise(t, 0.08, 4200, 0.12, 'highpass', ambBus); break;
      case 'stamp': noise(t, 0.15, 300, 0.35, 'lowpass', ambBus); break;
      case 'fizz': noise(t, 0.6, 5000, 0.15, 'highpass', ambBus); noise(t + .3, 0.2, 300, 0.2, 'lowpass', ambBus); break;
      case 'launch': noise(t, 0.5, 3000, 0.08, 'bandpass', ambBus); break;
      case 'boom': noise(t, 1.2, 120, 0.7, 'lowpass', ambBus); noise(t, 0.5, 2000, 0.15, 'bandpass', ambBus); break;
      case 'page': noise(t, 0.25, 2200, 0.08, 'bandpass', ambBus); break;
      case 'collect': [72, 76, 79, 84].forEach((n, i) => steelpan(NOTE(n), t + i * 0.09, 0.14, 1.2)); break;
      case 'step': noise(t, 0.05, 800, 0.05, 'lowpass', ambBus); break;
    }
  }

  function toggle() {
    setOn(!on);
    return on;
  }

  return {
    init, setOn, toggle, setMode, music: setMode, setProximity, sfx,
    nextTrack, setTrack, getTrackInfo,
    get on() { return on; }
  };
})();
