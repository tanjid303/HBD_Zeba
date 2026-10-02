<template>
  <section class="section-cake" id="cake-section">
    <div class="cake-container">
      
      <!-- Atmosphere Header -->
      <div class="cake-header reveal-on-scroll">
        <div class="cake-meta-badge">
          <span class="pulse-dot"></span>
          <span>interactive centerpiece</span>
        </div>
        <h2 class="cake-title">Make a wish.</h2>
        <p class="cake-instruction">{{ isFinalState ? 'wish complete' : 'tap the cake' }}</p>
      </div>

      <!-- Interactive Cake Stage -->
      <div class="cake-stage-wrapper">
        
        <!-- Ambient Radial Glow Halo -->
        <div class="cake-halo" aria-hidden="true"></div>
        
        <!-- Particle Canvas for Gentle Starlight & Tap Motes -->
        <canvas ref="particleCanvasRef" class="cake-particle-canvas" aria-hidden="true"></canvas>

        <!-- Interactive Cake Element -->
        <div 
          class="cake-stage" 
          role="button" 
          tabindex="0"
          aria-label="Interactive birthday cake. Tap to transform state."
          @click="handleCakeTap"
          @keydown.enter.prevent="handleCakeTap"
          @keydown.space.prevent="handleCakeTap"
        >
          <!-- Tap Ripple -->
          <div ref="rippleRef" class="cake-ripple"></div>

          <!-- Cake Images Stack (Crossfade + Scale + Blur) -->
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

          <!-- Ambient Floating Stardust Motes -->
          <div class="ambient-stardust" aria-hidden="true">
            <span class="stardust-mote mote-1">✦</span>
            <span class="stardust-mote mote-2">✧</span>
            <span class="stardust-mote mote-3">✦</span>
            <span class="stardust-mote mote-4">✧</span>
          </div>
        </div>

        <!-- Cake State Card (Progress & Details) -->
        <div class="cake-state-card">
          <div class="cake-state-indicators">
            <button 
              v-for="(cake, index) in cakeList"
              :key="cake.id"
              class="state-step-dot"
              :class="{ active: index === currentState }"
              :aria-label="'Switch to cake ' + (index + 1)"
              @click.stop="handleDirectSelect(index)"
            ></button>
          </div>
          
          <div class="cake-state-details">
            <span class="state-step-num">STATE 0{{ currentState + 1 }} / 04</span>
            <h3 class="state-step-name">{{ currentCake.name }}</h3>
            <p class="state-step-desc">{{ currentCake.description }}</p>
          </div>
        </div>

        <!-- Fourth Cake: Unlocked Prompt -->
        <div class="final-cake-unlock" :class="{ visible: isFinalState }">
          <div class="unlock-inner">
            <span class="unlock-sparkle">✦</span>
            <p class="unlock-cue">One more thing…</p>
            <button class="continue-action-btn" @click="$emit('continue')">
              <span>continue</span>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
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

const emit = defineEmits(['next-cake', 'select-cake', 'continue', 'cake-tapped']);

const particleCanvasRef = ref(null);
const rippleRef = ref(null);
const { init: initParticles, spawnBurst, destroy: destroyParticles } = useParticles();

const currentCake = computed(() => props.cakeList[props.currentState] || props.cakeList[0]);
const isFinalState = computed(() => props.currentState === 3);

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
  void rippleRef.value.offsetWidth; // Force reflow
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
