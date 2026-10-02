<template>
  <section class="section-top-experience" id="top-experience">
    <div class="top-container">
      
      <!-- 1. Top Title & Greeting -->
      <div class="top-intro-block fade-in-up" data-delay="100">
        <h1 class="hero-headline">
          Happy Birthday, <em>Zeba.</em>
        </h1>
        <p class="hero-subtext">tap the cake ✨</p>
      </div>

      <!-- 2. SIDE BY SIDE: Cake + Her Picture (Side by Side on Mobile & Desktop) -->
      <div class="duo-stage-container">
        
        <!-- Column 1: The Interactive Birthday Cake -->
        <div 
          class="duo-card cake-duo-card clickable-card"
          role="button" 
          tabindex="0"
          aria-label="Interactive birthday cake. Tap to transform cake, photo, and theme."
          @click="handleCakeTap"
          @keydown.enter.prevent="handleCakeTap"
          @keydown.space.prevent="handleCakeTap"
        >
          <div class="cake-stage-wrapper">
            <div class="cake-halo" aria-hidden="true"></div>
            <canvas ref="particleCanvasRef" class="cake-particle-canvas" aria-hidden="true"></canvas>

            <div class="cake-stage">
              <!-- Ripple Effect -->
              <div ref="rippleRef" class="cake-ripple"></div>

              <!-- Cake Media Stack -->
              <div class="cake-media-stack">
                <img 
                  v-for="(cake, index) in cakeList"
                  :key="cake.id"
                  :src="cake.imageSrc" 
                  :alt="'Birthday Cake ' + (index + 1)" 
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
          <div class="zeba-photo-wrapper">
            <Transition name="photo-crossfade" mode="out-in">
              <img 
                :key="currentPhoto.src"
                :src="currentPhoto.src" 
                alt="Zeba" 
                class="zeba-duo-img"
                loading="eager"
              />
            </Transition>
            <div class="photo-lens-sheen"></div>
          </div>
        </div>

      </div>

      <!-- 3. Minimal State Dots Indicator -->
      <div class="state-dots-container">
        <button 
          v-for="(cake, index) in cakeList"
          :key="cake.id"
          class="state-step-dot"
          :class="{ active: index === currentState }"
          :aria-label="'Switch to state ' + (index + 1)"
          @click.stop="handleDirectSelect(index)"
        ></button>
      </div>

      <!-- 4. Minimal Scroll Cue -->
      <div class="scroll-cue">
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
  { id: 1, src: '/cake-pic/zeba1.png' },
  { id: 2, src: '/cake-pic/zeba2.png' },
  { id: 3, src: '/cake-pic/zeba3.png' },
  { id: 4, src: '/cake-pic/zeba1.png' }
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
