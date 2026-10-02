# HBD_Zeba 🎂✨

A curated, luxury editorial birthday web experience created for **Zeba**. Built with Vue 3, Vite, and bespoke modern web aesthetics.

---

## ✨ Features

- 🐾 **Gatekeeper Verification Modal**: Minimal glassmorphic security check featuring `cat1.jpg` asking for age confirmation before entry (accepts ages 22–25).
- 🎂 **Interactive Duo Centerpiece**: The birthday cake and Zeba's photo sit **side-by-side** (fully responsive on mobile and desktop).
- 🔄 **Synchronized Duo Transformations**: Tapping the cake or photo smoothly transitions through each cake variation, simultaneous portraits of Zeba, stardust particle bursts, and dynamic background color themes:
  - `I. Lavender Twilight` (Theme 0)
  - `II. Sage Solitude` (Theme 1)
  - `III. Emerald Reverie` (Theme 2)
  - `IV. Golden Matcha` (Theme 3)
- 📜 **Handwritten Stationery Letter**: An authentic lined notebook paper sheet with washi tape pins, soft margin rule, wax seal, and midnight navy fountain ink. Reveals paragraph by paragraph on scroll.
- 🎵 **Web Audio API Chimes**: Gentle, ethereal bell chime soundscapes synthesized via the browser Web Audio API (with an ambient toggle switch).
- 📱 **Mobile First**: Pixel-perfect responsive design tailored for smartphones, ensuring side-by-side cake and portrait layout without horizontal scrolling.

---

## 🛠 Tech Stack

- **Framework**: [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`)
- **Bundler & Tooling**: [Vite](https://vitejs.dev/)
- **Styling**: Vanilla CSS (Custom Design System, Glassmorphism, CSS Grid & Flexbox)
- **Audio**: Web Audio API (Synthesized Bell Chimes)
- **Particles**: HTML5 Canvas Particle Engine

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/tanjid303/HBD_Zeba.git

# Navigate to project directory
cd HBD_Zeba

# Install dependencies
npm install

# Start local dev server
npm run dev
```

### Production Build

```bash
npm run build
```
The compiled production bundle will be in `dist/`.
