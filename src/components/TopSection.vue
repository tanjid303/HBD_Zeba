<template>
  <section class="section-top-experience" id="top-experience">
    <div class="top-container">
      
      <!-- 1. Top Title & Greeting -->
      <div class="top-intro-block fade-in-up" data-delay="100">
        <p class="hero-eyebrow">For Zeba</p>
        <h1 class="hero-headline">
          Happy Birthday, <em>Zeba.</em>
        </h1>
        <p class="hero-subtext">tap the cake to explore</p>
      </div>

      <!-- 2. SIDE BY SIDE: Cake + Her Picture (Appears Side by Side on Mobile & Desktop) -->
      <div class="duo-stage-container">
        
        <!-- Column 1: The Interactive Birthday Cake -->
        <div class="duo-card cake-duo-card">
          <div class="duo-badge">
            <span class="pulse-dot"></span>
            <span>Cake 0{{ currentState + 1 }}</span>
          </div>

          <div class="cake-stage-wrapper">
            <div class="cake-halo" aria-hidden="true"></div>
            <canvas ref="particleCanvasRef" class="cake-particle-canvas" aria-hidden="true"></canvas>

            <div 
              class="cake-stage" 
              role="button" 
              tabindex="0"
              aria-label="Interactive birthday cake. Tap to transform cake, photo, and theme."
              @click="handleCakeTap"
              @keydown.enter.prevent="handleCakeTap"
              @keydown.space.prevent="handleCakeTap"
            >
              <!-- Ripple Effect -->
              <div ref="rippleRef" class="cake-ripple"></div>

              <!-- Cake Media Stack -->
              <div class="cake-media-stack">
                <img 
                  v-for="(cake, index) in cakeList"
                  :key="cake.id"
                  :src="cake.imageSrc" 
                  :alt="'Birthday Cake - ' + cake.name" 
                  class="cake-layer" 
                  :class="{ active: index === currentState }"
                />
              </div>

              <!-- Stardust Motes -->
              <div class="ambient-stardust" aria-hidden="true">
                <span class="stardust-mote mote-1">✦</span>
                <span class="stardust-mote mote-2">✧</span>
              </div>
            </div>
          </div>

          <div class="duo-caption">
            <p class="duo-title">{{ currentCake.name }}</p>
            <span class="duo-tap-hint">tap cake 👆</span>
          </div>
        </div>

        <!-- Column 2: Her Photo (Changes Simultaneously with Each Tap) -->
        <div 
          class="duo-card zeba-duo-card clickable-card"
          role="button"
          tabindex="0"
          aria-label="Tap to view next photo and cake"
          @click="handleCakeTap"
          @keydown.enter.prevent="handleCakeTap"
          @keydown.space.prevent="handleCakeTap"
        >
          <div class="duo-badge photo-duo-badge">
            <span>{{ currentPhoto.tag }}</span>
          </div>

          <div class="zeba-photo-wrapper">
            <Transition name="photo-crossfade" mode="out-in">
              <img 
                :key="currentPhoto.src"
                :src="currentPhoto.src" 
                :alt="currentPhoto.caption" 
                class="zeba-duo-img"
                loading="eager"
              />
            </Transition>
            <div class="photo-lens-sheen"></div>
          </div>

          <div class="duo-caption">
            <p class="duo-title">“{{ currentPhoto.caption }}”</p>
            <span class="duo-sub-hint">{{ currentPhoto.sub }}</span>
          </div>
        </div>

      </div>

      <!-- 3. Progress Dots & Instructions -->
      <div class="cake-state-card">
        <div class="cake-state-indicators">
          <button 
            v-for="(cake, index) in cakeList"
            :key="cake.id"
            class="state-step-dot"
            :class="{ active: index === currentState }"
            :aria-label="'Switch to state ' + (index + 1)"
            @click.stop="handleDirectSelect(index)"
          ></button>
        </div>
        <p class="state-step-desc">
          Tap the cake or photo to transform the cake, Zeba's picture, and the atmosphere.
        </p>
      </div>

      <!-- 4. Scroll Cue to Letter -->
      <div class="scroll-cue">
        <span class="scroll-cue-text">scroll down for your birthday letter</span>
        <div class="scroll-cue-track">
          <div class="scroll-cue-thumb"></div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useParticles } from '../composables/useParticles';

const props = defineProps({
  currentState: {
    type: Number,
    default: 0
  },
  cakeList: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['next-cake', 'select-cake', 'cake-tapped']);

const particleCanvasRef = ref(null);
const rippleRef = ref(null);
const { init: initParticles, spawnBurst, destroy: destroyParticles } = useParticles();

// Available Photos of Zeba (synchronized with each cake state)
const zebaPhotos = [
  {
    id: 1,
    src: '/cake-pic/zeba1.png',
    tag: 'PORTRAIT · 01',
    caption: 'one of my favorite humans.',
    sub: 'moment one'
  },
  {
    id: 2,
    src: '/cake-pic/zeba2.png',
    tag: 'PORTRAIT · 02',
    caption: 'serene, quiet elegance.',
    sub: 'moment two'
  },
  {
    id: 3,
    src: '/cake-pic/zeba3.png',
    tag: 'PORTRAIT · 03',
    caption: 'unfiltered, radiant, authentic.',
    sub: 'moment three'
  },
  {
    id: 4,
    src: '/cake-pic/zeba1.png',
    tag: 'PORTRAIT · 04',
    caption: 'always stay happy.',
    sub: 'wishing you the best'
  }
];

const currentCake = computed(() => props.cakeList[props.currentState] || props.cakeList[0]);
const currentPhoto = computed(() => zebaPhotos[props.currentState % zebaPhotos.length]);

function handleCakeTap() {
  triggerRipple();
  spawnBurst();
  emit('cake-tapped', props.currentState);
  emit('next-cake');
}

function handleDirectSelect(index) {
  triggerRipple();
  spawnBurst();
  emit('cake-tapped', index);
  emit('select-cake', index);
}

function triggerRipple() {
  if (!rippleRef.value) return;
  rippleRef.value.classList.remove('animate');
  void rippleRef.value.offsetWidth;
  rippleRef.value.classList.add('animate');
}

onMounted(() => {
  if (particleCanvasRef.value) {
    initParticles(particleCanvasRef.value);
  }
});

onUnmounted(() => {
  destroyParticles();
});
</script>

<style scoped>
.clickable-card {
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.photo-crossfade-enter-active,
.photo-crossfade-leave-active {
  transition: opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1), transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
}

.photo-crossfade-enter-from {
  opacity: 0;
  transform: scale(0.94);
}

.photo-crossfade-leave-to {
  opacity: 0;
  transform: scale(1.04);
}
</style>
