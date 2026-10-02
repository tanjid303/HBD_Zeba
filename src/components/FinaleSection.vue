<template>
  <section class="section-finale" id="finale-section">
    <div class="finale-container">
      
      <!-- Side by Side: Cat 2 & Lily Pic -->
      <div class="finale-duo-container reveal-on-scroll">
        <!-- Card 1: Cat 2 -->
        <div class="finale-duo-card cat-card">
          <div class="finale-card-media">
            <img 
              src="/cake-pic/cat2.jpg" 
              alt="Cute Cat" 
              class="finale-duo-img"
              loading="lazy"
            />
            <div class="finale-img-sheen"></div>
          </div>
        </div>

        <!-- Card 2: Lily Flower -->
        <div class="finale-duo-card lily-card">
          <div class="finale-card-media">
            <img 
              src="/cake-pic/lily.jpg" 
              alt="Lily Flower" 
              class="finale-duo-img"
              loading="lazy"
            />
            <div class="finale-img-sheen"></div>
          </div>
        </div>
      </div>

      <!-- Message: here is a lily for you -->
      <div class="finale-text-content reveal-on-scroll">
        <p class="lily-message">here is a lily for you</p>
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
