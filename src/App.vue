<template>
  <div class="app-root">
    <!-- Initial Visit Age Gate with Cat Picture (Ages 20-25 allowed) -->
    <AgeGateModal @entered="handleEnteredGate" />

    <!-- Ambient Depth Layer & Lighting with Twinkling Stars (Inspired by reference project) -->
    <div class="ambient-layer" aria-hidden="true">
      <div class="ambient-glow ambient-glow-1"></div>
      <div class="ambient-glow ambient-glow-2"></div>
      <div class="ambient-glow ambient-glow-3"></div>
      <div class="film-grain"></div>
      
      <!-- Ambient Stars Field -->
      <div class="stars-layer">
        <div 
          v-for="(star, index) in stars" 
          :key="index"
          class="ambient-star"
          :style="{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            animationDelay: star.delay
          }"
        ></div>
      </div>
    </div>

    <!-- Header Navigation -->
    <SiteHeader 
      :current-state="currentCakeIndex" 
      :is-muted="isMuted"
      @toggle-sound="toggleAudio"
    />

    <main>
      <!-- VERY TOP PART: The Cake Centerpiece, Greeting & Zeba's Photos -->
      <TopSection 
        :current-state="currentCakeIndex"
        :cake-list="cakeList"
        @next-cake="handleNextCake"
        @select-cake="handleSelectCake"
        @cake-tapped="handleCakeTapped"
      />

      <!-- THE MESSAGE: Personal Letter (No artificial lock gates) -->
      <MessageSection />

      <!-- FINAL MOMENT: Always Stay Happy -->
      <FinaleSection 
        @revisit-start="scrollToTop"
      />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import AgeGateModal from './components/AgeGateModal.vue';
import SiteHeader from './components/SiteHeader.vue';
import TopSection from './components/TopSection.vue';
import MessageSection from './components/MessageSection.vue';
import FinaleSection from './components/FinaleSection.vue';
import { useAudio } from './composables/useAudio';

// Cake Configuration & Thematic Palettes
const cakeList = [
  {
    id: 0,
    imageSrc: '/cake-pic/cake.png',
    name: 'I. Lavender Twilight',
    description: 'A serene violet dreamscape. Tap the cake to shift the atmosphere.',
    themeClass: 'theme-0'
  },
  {
    id: 1,
    imageSrc: '/cake-pic/cake2.png',
    name: 'II. Sage Solitude',
    description: 'Quiet meadow greens and soft morning dew. Photo 2 revealed.',
    themeClass: 'theme-1'
  },
  {
    id: 2,
    imageSrc: '/cake-pic/cake3.png',
    name: 'III. Emerald Reverie',
    description: 'Luminous viridian and crisp night air. Photo 3 revealed.',
    themeClass: 'theme-2'
  },
  {
    id: 3,
    imageSrc: '/cake-pic/cake4.png',
    name: 'IV. Golden Matcha',
    description: 'Warm champagne light and celebratory warmth. The wish is complete.',
    themeClass: 'theme-3'
  }
];

const currentCakeIndex = ref(0);
const userAge = ref('');
const stars = ref([]);

const { isMuted, toggleAudio, playChime } = useAudio();

// Watch state changes and update body class
watch(currentCakeIndex, (newIndex) => {
  const currentConfig = cakeList[newIndex];
  document.body.className = currentConfig.themeClass;
}, { immediate: true });

function handleEnteredGate(age) {
  userAge.value = age;
  // Play subtle welcoming chime
  playChime(0);
}

function handleNextCake() {
  let next = currentCakeIndex.value + 1;
  if (next >= cakeList.length) {
    next = 0;
  }
  currentCakeIndex.value = next;
}

function handleSelectCake(index) {
  currentCakeIndex.value = index;
}

function handleCakeTapped(stateIndex) {
  playChime(stateIndex);
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

onMounted(() => {
  // Generate 36 random twinkling stars across the page (inspired by reference UI)
  stars.value = Array.from({ length: 36 }).map(() => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 2.5 + 1.2}px`,
    delay: `${Math.random() * 4}s`
  }));

  // General scroll reveal observer
  const reveals = document.querySelectorAll('.reveal-on-scroll');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -30px 0px'
  });

  reveals.forEach((el) => observer.observe(el));

  // Dynamic color extraction on image load
  cakeList.forEach((cake, index) => {
    const img = new Image();
    img.src = cake.imageSrc;
    img.onload = () => {
      extractColor(img, index);
    };
  });
});

function extractColor(img, index) {
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 40;
    canvas.height = 40;
    ctx.drawImage(img, 0, 0, 40, 40);
    const data = ctx.getImageData(0, 0, 40, 40).data;

    let maxVibrant = { r: 120, g: 80, b: 140, sat: 0 };
    for (let i = 0; i < data.length; i += 4) {
      const a = data[i + 3];
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      if (a > 100 && (r > 35 || g > 35 || b > 35) && (r < 245 || g < 245 || b < 245)) {
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const sat = max === 0 ? 0 : (max - min) / max;
        if (sat > maxVibrant.sat) {
          maxVibrant = { r, g, b, sat };
        }
      }
    }

    if (maxVibrant.sat > 0.15) {
      cakeList[index].extracted = {
        accentVivid: `rgb(${maxVibrant.r}, ${maxVibrant.g}, ${maxVibrant.b})`,
        accentGlow: `rgba(${maxVibrant.r}, ${maxVibrant.g}, ${maxVibrant.b}, 0.28)`
      };
      if (currentCakeIndex.value === index) {
        document.body.style.setProperty('--accent-vivid', cakeList[index].extracted.accentVivid);
        document.body.style.setProperty('--accent-glow', cakeList[index].extracted.accentGlow);
      }
    }
  } catch (e) {
    // Curated fallback
  }
}
</script>
