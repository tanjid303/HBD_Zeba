<template>
  <section class="section-finale" id="finale-section">
    <div class="finale-container">
      
      <!-- Portrait Frame of Zeba -->
      <div class="finale-portrait-card reveal-on-scroll">
        <div class="finale-img-wrapper">
          <img 
            src="/cake-pic/zeba2.png" 
            alt="Zeba - Forever" 
            class="finale-img"
            loading="lazy"
          />
          <div class="finale-img-sheen"></div>
        </div>
      </div>

      <!-- Quiet Words -->
      <div class="finale-text-content reveal-on-scroll">
        <h2 class="finale-title">Happy Birthday, Zeba.</h2>
        <p class="finale-subtitle">Always stay happy.</p>
        <div class="finale-symbol">✦</div>
      </div>

      <!-- Revisit Bar -->
      <div class="revisit-bar">
        <button class="revisit-btn" @click="$emit('revisit-start')">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8">
            <line x1="12" y1="19" x2="12" y2="5"></line>
            <polyline points="5 12 12 5 19 12"></polyline>
          </svg>
          <span>back to the start</span>
        </button>
      </div>

    </div>
  </section>
</template>

<script setup>
defineEmits(['revisit-start']);
</script>
