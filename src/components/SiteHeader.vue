<template>
  <header class="site-header">
    <div class="header-inner">
      <!-- Monogram -->
      <div class="brand-monogram">
        <span class="mono-letter">Z.</span>
      </div>
      
      <!-- Interactive Controls -->
      <div class="header-controls">
        <!-- Cake Stepper Dots Pill -->
        <div class="cake-stepper-pill" :title="'Cake ' + (currentState + 1) + ' of 4'">
          <span 
            v-for="step in 4" 
            :key="step"
            class="stepper-dot"
            :class="{ active: (step - 1) === currentState }"
          ></span>
        </div>

        <!-- Audio Atmosphere Toggle -->
        <button 
          class="sound-toggle" 
          @click="$emit('toggle-sound')" 
          :aria-label="isMuted ? 'Unmute music' : 'Mute music'"
          :title="isMuted ? 'Sound muted (click to play)' : 'Sound active'"
        >
          <!-- Muted Icon -->
          <svg v-if="isMuted" class="sound-icon icon-muted" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M11 5L6 9H2v6h4l5 4V5z"/>
            <line x1="23" y1="9" x2="17" y2="15"/>
            <line x1="17" y1="9" x2="23" y2="15"/>
          </svg>
          <!-- Active Icon -->
          <svg v-else class="sound-icon icon-active" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M11 5L6 9H2v6h4l5 4V5z"/>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
defineProps({
  currentState: {
    type: Number,
    default: 0
  },
  isMuted: {
    type: Boolean,
    default: true
  }
});

defineEmits(['toggle-sound']);
</script>
