# 🌌 Leo.AlgoViz | 資料結構與演算法視覺化

> **看懂演算法，不只是背公式。**

AlgoViz 是一個純前端打造的互動式學習平台，旨在將枯燥的資料結構與演算法，轉化為直覺、動態且充滿樂趣的視覺化體驗。無論是初學者想要理解基礎概念，還是老手想要複習邏輯，都能在這裡找到最沉浸的學習方式。

🔗 **線上預覽 (Live Demo)**: `[這裡填寫你的 Vercel 或 GitHub Pages 網址]`

---

## ✨ 核心特色 (Features)

* 🎮 **動態視覺化展示**：實時呈現演算法的執行步驟（比較、交換、寫入），並支援自由調整播放速度。
* 🎵 **沉浸式療癒音效**：內建基於 `Web Audio API` 開發的合成音效。數值越高音調越高，交換與比較皆有專屬音效，完成時更有專屬的大調琶音慶祝效果！
* ⚡ **極速搜尋與動態切換**：支援以中文、英文或分類關鍵字進行即時搜尋，點擊後平滑捲動並無縫切換演算法邏輯。
* 📊 **深度理論解析**：每個演算法皆附帶最佳/平均/最差的「時間複雜度」、「空間複雜度」以及同類型演算法的比較表格。
* 🎨 **賽博龐克極簡美學**：採用深色模式 (Dark Mode)、毛玻璃特效 (Glassmorphism) 以及 Canvas 粒子動畫作為主視覺，提供極佳的 UI/UX 體驗。

---

## 🧮 目前支援的演算法 (Supported Algorithms)

**首波主打：完整排序演算法 (Sorting Algorithms)**
* ⇅ **泡沫排序 (Bubble Sort)** - O(n²)
* ⇅ **選擇排序 (Selection Sort)** - O(n²)
* ⇅ **插入排序 (Insertion Sort)** - O(n²)
* ⇅ **快速排序 (Quick Sort)** - O(n log n)
* ⇅ **合併排序 (Merge Sort)** - O(n log n)
* ⇅ **堆積排序 (Heap Sort)** - O(n log n)

*(圖論、樹狀結構、動態規劃等更多視覺化模組持續開發中...)*

---

## 🛠️ 技術棧 (Tech Stack)

本專案堅持使用純粹的 Web 技術打造，零依賴第三方大型框架，展現極致的效能與輕量化：

* **HTML5** (語意化標籤)
* **CSS3** (CSS Variables, Flexbox/Grid, 響應式設計)
* **Vanilla JavaScript (ES6+)** (DOM 操作, 演算法邏輯工廠)
* **HTML Canvas API** (首頁背景粒子連線動畫)
* **Web Audio API** (無需載入外部音檔的即時波形合成)

---

## 🚀 快速開始 (Getting Started)

由於這是一個純前端的靜態網站，你不需要安裝任何 Node.js 模組或打包工具。

1. **Clone 專案**
   ```bash
   git clone [https://github.com/你的帳號/algoviz.git](https://github.com/你的帳號/algoviz.git)
