/* ── NAV ────────────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('open'));
document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', () => mobileMenu.classList.remove('open')));

/* ── ALGO DATABASE ──────────────────────────────── */
const ALGOS = [
  { name: '泡沫排序', en: 'Bubble Sort',    category: '排序', time: 'O(n²)',      space: 'O(1)' },
  { name: '快速排序', en: 'Quick Sort',     category: '排序', time: 'O(n log n)', space: 'O(log n)' },
  { name: '合併排序', en: 'Merge Sort',     category: '排序', time: 'O(n log n)', space: 'O(n)' },
  { name: '堆積排序', en: 'Heap Sort',      category: '排序', time: 'O(n log n)', space: 'O(1)' },
  { name: '插入排序', en: 'Insertion Sort', category: '排序', time: 'O(n²)',      space: 'O(1)' },
  { name: '選擇排序', en: 'Selection Sort', category: '排序', time: 'O(n²)',      space: 'O(1)' },
  { name: '二分搜尋', en: 'Binary Search',  category: '搜尋', time: 'O(log n)',   space: 'O(1)' },
  { name: '線性搜尋', en: 'Linear Search',  category: '搜尋', time: 'O(n)',       space: 'O(1)' },
  { name: '廣度優先搜尋', en: 'BFS',        category: '圖',   time: 'O(V+E)',     space: 'O(V)' },
  { name: '深度優先搜尋', en: 'DFS',        category: '圖',   time: 'O(V+E)',     space: 'O(V)' },
  { name: 'Dijkstra', en: 'Dijkstra',       category: '圖',   time: 'O((V+E)logV)',space:'O(V)' },
  { name: 'A* 演算法', en: 'A* Algorithm',  category: '圖',   time: 'O(E log V)', space: 'O(V)' },
  { name: 'Kruskal 最小生成樹', en: "Kruskal's MST", category: '圖', time: 'O(E log E)', space: 'O(V)' },
  { name: '二元搜尋樹', en: 'BST',          category: '樹',   time: 'O(log n)',   space: 'O(n)' },
  { name: 'AVL 樹',    en: 'AVL Tree',      category: '樹',   time: 'O(log n)',   space: 'O(n)' },
  { name: '費波那契 DP', en: 'Fibonacci DP',category: '動態規劃', time: 'O(n)',   space: 'O(n)' },
  { name: '0/1 背包問題', en: 'Knapsack',   category: '動態規劃', time: 'O(nW)',  space: 'O(nW)' },
  { name: '最長公共子序列', en: 'LCS',      category: '動態規劃', time: 'O(nm)',  space: 'O(nm)' },
  { name: '雜湊表',    en: 'Hash Table',    category: '資料結構', time: 'O(1)',   space: 'O(n)' },
  { name: '堆積 (Heap)', en: 'Heap',        category: '資料結構', time: 'O(log n)',space:'O(n)' },
];

const ALGO_DESCRIPTIONS = {
  '泡沫排序': '重複地走訪陣列，比較相鄰元素，若順序錯誤就交換。每輪結束後，最大值會「浮」到最右側。',
  '選擇排序': '每次從尚未排序的區間中尋找最小值，並將其與該區間的第一個元素交換。',
  '插入排序': '將未排序的元素逐一插入到已排序區間的適當位置，如同打撲克牌時理牌的過程。',
  '快速排序': '採用分治法，選擇一個基準 (Pivot)，將小於基準的放左邊，大於的放右邊，再遞迴處理左右兩側。',
  '合併排序': '採用分治法，將陣列切分到最小單位，再兩兩合併成已排序的陣列，此為模擬原地寫回的視覺化。',
  '堆積排序': '利用最大堆積 (Max Heap) 的特性，每次將根節點（最大值）與最後一個元素交換，並重新調整堆積。'
};

/* ── SEARCH & CATEGORY FILTER ───────────────────── */
const searchInput = document.getElementById('searchInput');
const searchClear = document.getElementById('searchClear');
const searchResults = document.getElementById('searchResults');

searchInput.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase();
  searchClear.classList.toggle('visible', q.length > 0);

  if (!q) { searchResults.classList.add('hidden'); return; }

  const hits = ALGOS.filter(a =>
    a.name.toLowerCase().includes(q) ||
    a.en.toLowerCase().includes(q) ||
    a.category.toLowerCase().includes(q)
  );

  searchResults.classList.remove('hidden');
  if (hits.length === 0) {
    searchResults.innerHTML = '<div class="result-empty">找不到相關演算法，試試其他關鍵字</div>';
    return;
  }
  searchResults.innerHTML = hits.map(a => `
    <div class="result-item" onclick="loadAlgorithm('${a.name}')">
      <div class="result-name">${a.name} <span style="color:var(--text-dim);font-size:12px;">${a.en}</span></div>
      <div class="result-meta">${a.category} · 時間 ${a.time} · 空間 ${a.space}</div>
    </div>
  `).join('');
});

searchClear.addEventListener('click', () => {
  searchInput.value = '';
  searchClear.classList.remove('visible');
  searchResults.classList.add('hidden');
  searchInput.focus();
});

document.querySelectorAll('.cat-card').forEach(card => {
  card.addEventListener('click', () => {
    const catMap = { 'sort': '排序', 'search': '搜尋', 'tree': '樹', 'graph': '圖', 'dp': '動態規劃', 'ds': '資料結構' };
    const query = catMap[card.dataset.category] || '';
    searchInput.value = query;
    searchInput.dispatchEvent(new Event('input'));
    document.getElementById('search').scrollIntoView({ behavior: 'smooth' });
  });
});

/* ── GRAPH CANVAS (hero) ────────────────────────── */
const canvas = document.getElementById('graphCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W, H, nodes, edges;

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    W = canvas.width  = rect.width  * devicePixelRatio;
    H = canvas.height = rect.height * devicePixelRatio;
    canvas.style.width  = rect.width  + 'px';
    canvas.style.height = rect.height + 'px';
    buildGraph();
  }

  function buildGraph() {
    nodes = Array.from({ length: 20 }, () => ({
      x: 0.1 * W + Math.random() * 0.8 * W,
      y: 0.1 * H + Math.random() * 0.8 * H,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: 3 + Math.random() * 3,
    }));
    edges = [];
    for (let i = 0; i < nodes.length; i++) {
      const k = 1 + Math.floor(Math.random() * 2);
      for (let c = 0; c < k; c++) {
        const j = Math.floor(Math.random() * nodes.length);
        if (j !== i) edges.push([i, j]);
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0.05*W || n.x > 0.95*W) n.vx *= -1;
      if (n.y < 0.05*H || n.y > 0.95*H) n.vy *= -1;
    });
    edges.forEach(([a, b]) => {
      const na = nodes[a], nb = nodes[b];
      const d = Math.hypot(na.x - nb.x, na.y - nb.y);
      const max = W * 0.38;
      if (d > max) return;
      ctx.beginPath();
      ctx.moveTo(na.x, na.y);
      ctx.lineTo(nb.x, nb.y);
      ctx.strokeStyle = `rgba(79,142,247,${(1 - d/max) * 0.22})`;
      ctx.lineWidth = devicePixelRatio;
      ctx.stroke();
    });
    nodes.forEach(n => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r * devicePixelRatio, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(79,142,247,0.45)';
      ctx.fill();
    });
    requestAnimationFrame(loop);
  }

  new ResizeObserver(resize).observe(canvas.parentElement);
  resize();
  loop();
}

/* ── AUDIO SYNTHESIZER ──────────────────────────── */
let audioCtx = null;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

// 單音效 (比較、交換)
function playNote(val, maxVal, type = 'sine') {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  const minFreq = 200, maxFreq = 800;
  const freq = minFreq + (val / maxVal) * (maxFreq - minFreq);
  
  osc.type = type; 
  osc.frequency.value = freq;
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  
  gain.gain.setValueAtTime(0, audioCtx.currentTime);
  gain.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
  osc.stop(audioCtx.currentTime + 0.15);
}

// 完成時的療癒魔法音效 (大調琶音)
function playSuccessSound() {
  if (!audioCtx) return;
  // A大調的頻率：A4, C#5, E5, A5
  const notes = [440, 554.37, 659.25, 880]; 
  const time = audioCtx.currentTime;
  
  notes.forEach((freq, i) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine'; // 使用乾淨的正弦波最療癒
    osc.frequency.value = freq;
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    // 每個音階延遲 0.1 秒播放，形成「叮-叮-叮-咚」的效果
    const startTime = time + i * 0.1;
    osc.start(startTime);
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.1, startTime + 0.05);
    
    // 最後一個音稍微拉長尾音
    const decayTime = (i === notes.length - 1) ? 0.8 : 0.3; 
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + decayTime);
    osc.stop(startTime + decayTime);
  });
}

/* ── ALGORITHM VISUALIZER SYSTEM ────────────────── */
const barStage = document.getElementById('barStage');
const stepLog  = document.getElementById('stepLog');
const btnPlay   = document.getElementById('btnPlay');
const btnPause  = document.getElementById('btnPause');
const btnReset  = document.getElementById('btnReset');
const btnGen    = document.getElementById('btnGenerate');
const speedSlider = document.getElementById('speedSlider');
const demoTitle = document.getElementById('demoTitle');
const algoInfoContainer = document.getElementById('algoInfoContainer');

let arr = [], bars = [], steps = [], stepIndex = 0, playing = false, timer = null;
let currentAlgoName = '泡沫排序';
let sortedSet = new Set();

function genArray(n = 24) {
  return Array.from({ length: n }, () => Math.floor(Math.random() * 90) + 10);
}

const ALGO_LOGIC = {
  '泡沫排序': function(a) {
    const s = [], A = [...a], n = A.length;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        s.push({ type: 'compare', j, k: j+1, msg: `比較 A[${j}]=${A[j]} 與 A[${j+1}]=${A[j+1]}` });
        if (A[j] > A[j+1]) {
          s.push({ type: 'swap', j, k: j+1, msg: `交換 A[${j}] ↔ A[${j+1}]` });
          [A[j], A[j+1]] = [A[j+1], A[j]];
        }
      }
      s.push({ type: 'sorted', idx: n - 1 - i, msg: `第 ${i+1} 輪結束，A[${n-1-i}] 就位` });
    }
    s.push({ type: 'done', msg: '排序完成！' });
    return s;
  },
  
  '選擇排序': function(a) {
    const s = [], A = [...a], n = A.length;
    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        s.push({ type: 'compare', j: minIdx, k: j, msg: `比較目前最小 A[${minIdx}]=${A[minIdx]} 與 A[${j}]` });
        if (A[j] < A[minIdx]) minIdx = j;
      }
      if (minIdx !== i) {
        s.push({ type: 'swap', j: i, k: minIdx, msg: `找到最小值 ${A[minIdx]}，與 A[${i}] 交換` });
        [A[i], A[minIdx]] = [A[minIdx], A[i]];
      }
      s.push({ type: 'sorted', idx: i, msg: `第 ${i+1} 輪結束，A[${i}] 就位` });
    }
    s.push({ type: 'sorted', idx: n-1, msg: '最後一個元素自動就位' });
    s.push({ type: 'done', msg: '排序完成！' });
    return s;
  },
  
  '插入排序': function(a) {
    const s = [], A = [...a], n = A.length;
    s.push({ type: 'sorted', idx: 0, msg: `A[0] 預設為已排序` });
    for (let i = 1; i < n; i++) {
      let key = A[i];
      let j = i - 1;
      s.push({ type: 'compare', j: i, k: i, msg: `取出 A[${i}]=${key} 準備插入` });
      while (j >= 0 && A[j] > key) {
        s.push({ type: 'compare', j: j, k: j+1, msg: `A[${j}] 大於 ${key}，向右移位` });
        s.push({ type: 'swap', j: j, k: j+1, msg: `移位中...` });
        A[j + 1] = A[j];
        A[j] = key; 
        j--;
      }
      A[j + 1] = key;
      s.push({ type: 'sorted_range', end: i, msg: `將 ${key} 插入完成` });
    }
    s.push({ type: 'done', msg: '排序完成！' });
    return s;
  },

  '快速排序': function(a) {
    const s = [], A = [...a];
    function partition(low, high) {
      let pivot = A[high];
      let i = low - 1;
      for (let j = low; j < high; j++) {
        s.push({ type: 'compare', j: j, k: high, msg: `與基準 Pivot (${pivot}) 比較` });
        if (A[j] < pivot) {
          i++;
          if (i !== j) {
            s.push({ type: 'swap', j: i, k: j, msg: `小於 Pivot，與 A[${i}] 交換` });
            [A[i], A[j]] = [A[j], A[i]];
          }
        }
      }
      if (i + 1 !== high) {
        s.push({ type: 'swap', j: i + 1, k: high, msg: `將 Pivot 換至最終位置 A[${i + 1}]` });
        [A[i + 1], A[high]] = [A[high], A[i + 1]];
      }
      return i + 1;
    }
    function qs(low, high) {
      if (low < high) {
        let pi = partition(low, high);
        s.push({ type: 'sorted', idx: pi, msg: `Pivot A[${pi}] 已就位` });
        qs(low, pi - 1);
        qs(pi + 1, high);
      } else if (low === high) {
        s.push({ type: 'sorted', idx: low, msg: `A[${low}] 已就位` });
      }
    }
    qs(0, A.length - 1);
    s.push({ type: 'done', msg: '排序完成！' });
    return s;
  },

  '合併排序': function(a) {
    const s = [], A = [...a];
    function merge(left, mid, right) {
      let n1 = mid - left + 1;
      let n2 = right - mid;
      let L = new Array(n1), R = new Array(n2);
      for (let i = 0; i < n1; i++) L[i] = A[left + i];
      for (let j = 0; j < n2; j++) R[j] = A[mid + 1 + j];
      let i = 0, j = 0, k = left;
      while (i < n1 && j < n2) {
        s.push({ type: 'compare', j: left + i, k: mid + 1 + j, msg: `合併區間: 比較左半 L[${i}] 與右半 R[${j}]` });
        if (L[i] <= R[j]) {
          s.push({ type: 'set', idx: k, val: L[i], msg: `寫入較小值 L[${i}]=${L[i]}` });
          A[k] = L[i]; i++;
        } else {
          s.push({ type: 'set', idx: k, val: R[j], msg: `寫入較小值 R[${j}]=${R[j]}` });
          A[k] = R[j]; j++;
        }
        k++;
      }
      while (i < n1) {
        s.push({ type: 'set', idx: k, val: L[i], msg: `補上左半剩餘元素 ${L[i]}` });
        A[k] = L[i]; i++; k++;
      }
      while (j < n2) {
        s.push({ type: 'set', idx: k, val: R[j], msg: `補上右半剩餘元素 ${R[j]}` });
        A[k] = R[j]; j++; k++;
      }
    }
    function ms(left, right) {
      if (left >= right) return;
      let mid = left + Math.floor((right - left) / 2);
      ms(left, mid);
      ms(mid + 1, right);
      merge(left, mid, right);
    }
    ms(0, A.length - 1);
    s.push({ type: 'done', msg: '排序完成！' });
    return s;
  },

  '堆積排序': function(a) {
    const s = [], A = [...a], n = A.length;
    function heapify(N, i) {
      let largest = i;
      let l = 2 * i + 1;
      let r = 2 * i + 2;
      if (l < N) {
        s.push({ type: 'compare', j: i, k: l, msg: `檢查左子節點 ${l}` });
        if (A[l] > A[largest]) largest = l;
      }
      if (r < N) {
        s.push({ type: 'compare', j: largest, k: r, msg: `檢查右子節點 ${r}` });
        if (A[r] > A[largest]) largest = r;
      }
      if (largest !== i) {
        s.push({ type: 'swap', j: i, k: largest, msg: `將較大值換上來` });
        [A[i], A[largest]] = [A[largest], A[i]];
        heapify(N, largest);
      }
    }
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(n, i);
    }
    for (let i = n - 1; i > 0; i--) {
      s.push({ type: 'swap', j: 0, k: i, msg: `取出當前最大值 A[0]，放至陣列尾端 A[${i}]` });
      [A[0], A[i]] = [A[i], A[0]];
      s.push({ type: 'sorted', idx: i, msg: `最大值已就位` });
      heapify(i, 0);
    }
    s.push({ type: 'sorted', idx: 0, msg: `A[0] 已就位` });
    s.push({ type: 'done', msg: '排序完成！' });
    return s;
  }
};

function renderBars(a, state = {}) {
  barStage.innerHTML = '';
  const max = Math.max(...a);
  bars = a.map((v, i) => {
    const b = document.createElement('div');
    b.className = 'bar';
    b.style.height = `${(v / max) * 100}%`;
    b.style.background = 'rgba(79,142,247,0.55)';
    
    if (state.comparing && (i === state.j || i === state.k)) b.classList.add('comparing');
    if (state.swapping  && (i === state.j || i === state.k)) b.classList.add('swapping');
    if (state.setting   && i === state.j) b.classList.add('swapping');
    
    if (sortedSet.has(i)) b.classList.add('sorted');
    
    barStage.appendChild(b);
    return b;
  });
}

function applyStep(idx) {
  if (idx >= steps.length) return;
  const st = steps[idx];
  const maxVal = Math.max(...arr) || 1;
  
  if (st.type === 'compare') {
    playNote(arr[st.j], maxVal, 'sine');
    renderBars(arr, { comparing: true, j: st.j, k: st.k });
  } else if (st.type === 'swap') {
    playNote(arr[st.j], maxVal, 'triangle');
    [arr[st.j], arr[st.k]] = [arr[st.k], arr[st.j]];
    renderBars(arr, { swapping: true, j: st.j, k: st.k });
  } else if (st.type === 'set') {
    playNote(st.val, maxVal, 'triangle');
    arr[st.idx] = st.val;
    renderBars(arr, { setting: true, j: st.idx });
  } else if (st.type === 'sorted') {
    playNote(arr[st.idx], maxVal, 'sine');
    sortedSet.add(st.idx);
    renderBars(arr, {});
  } else if (st.type === 'sorted_range') {
    for (let i = 0; i <= st.end; i++) sortedSet.add(i);
    renderBars(arr, {});
  } else if (st.type === 'done') {
    // 觸發完成魔法音效！
    playSuccessSound();
    for (let i = 0; i < arr.length; i++) {
      sortedSet.add(i);
    }
    renderBars(arr, {});
  }
  
  stepLog.textContent = st.msg;
}

function getDelay() {
  return [600, 350, 200, 100, 30][parseInt(speedSlider.value) - 1];
}

function initViz(n = 24, algoName = currentAlgoName) {
  clearTimeout(timer);
  playing = false;
  currentAlgoName = algoName;
  arr = genArray(n);
  sortedSet.clear();
  
  if (ALGO_LOGIC[algoName]) {
    steps = ALGO_LOGIC[algoName]([...arr]);
  } else {
    steps = []; 
  }
  
  stepIndex = 0;

  if (steps.length > 0) {
    renderBars(arr);
    stepLog.textContent = `按下「播放」開始視覺化 ${algoName}`;
    btnPlay.disabled  = false;
  } else {
    barStage.innerHTML = '<div style="color:var(--text-muted); width:100%; text-align:center; margin-top:2rem;">此演算法的視覺化尚在開發中</div>';
    stepLog.textContent = '敬請期待';
    btnPlay.disabled  = true;
  }
  btnPause.disabled = true;
}

function play() {
  initAudio(); 
  if (stepIndex >= steps.length) initViz(arr.length, currentAlgoName);
  playing = true;
  btnPlay.disabled  = true;
  btnPause.disabled = false;
  function tick() {
    if (!playing || stepIndex >= steps.length) {
      playing = false;
      btnPlay.disabled  = false;
      btnPause.disabled = true;
      return;
    }
    applyStep(stepIndex++);
    timer = setTimeout(tick, getDelay());
  }
  tick();
}

function pause() {
  playing = false;
  clearTimeout(timer);
  btnPlay.disabled  = false;
  btnPause.disabled = true;
}

btnPlay.addEventListener('click', play);
btnPause.addEventListener('click', pause);
btnReset.addEventListener('click', () => { stepIndex = 0; sortedSet.clear(); initViz(arr.length, currentAlgoName); });
btnGen.addEventListener('click', () => { initAudio(); initViz(24, currentAlgoName); });

window.loadAlgorithm = function(name) {
  const algoMeta = ALGOS.find(a => a.name === name);
  if(!algoMeta) return;
  
  demoTitle.textContent = `${algoMeta.name} ${algoMeta.en}`;
  
  searchResults.classList.add('hidden');
  searchInput.value = '';
  searchClear.classList.remove('visible');
  document.getElementById('featured').scrollIntoView({ behavior: 'smooth' });

  const desc = ALGO_DESCRIPTIONS[name] || '詳細說明建置中...';

  algoInfoContainer.innerHTML = `
    <div class="info-section">
      <div class="info-label">說明</div>
      <p>${desc}</p>
    </div>
    <div class="info-section">
      <div class="info-label">時間複雜度</div>
      <div class="formula-grid">
        <div class="formula-row"><span class="case">平均</span><code>${algoMeta.time}</code></div>
      </div>
    </div>
    <div class="info-section">
      <div class="info-label">空間複雜度</div>
      <div class="formula-grid">
        <div class="formula-row"><span class="case">空間</span><code>${algoMeta.space}</code></div>
      </div>
    </div>
  `;

  initViz(24, name);
};

initViz(24, '泡沫排序');

const fadeObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); fadeObs.unobserve(e.target); } });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.cat-card, .algo-viz, .algo-info').forEach(el => {
  el.classList.add('fade-in');
  fadeObs.observe(el);
});