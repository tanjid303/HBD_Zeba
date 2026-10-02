<template>
  <section class="section-story" id="story">
    <div class="story-container">
      
      <!-- Story Chapter Tag -->
      <div class="story-chapter-tag reveal-on-scroll">
        <span class="chapter-num">01</span>
        <span class="chapter-line"></span>
        <span class="chapter-title">visual story</span>
      </div>

      <!-- Composition A: Asymmetric Floating Portrait -->
      <div class="editorial-block block-offset-right reveal-on-scroll">
        <div class="editorial-card card-zeba-2">
          <div class="card-media-wrap parallax-element" data-speed="0.05">
            <img 
              src="/cake-pic/zeba2.png" 
              alt="Zeba portrait" 
              class="editorial-img"
              loading="lazy"
            />
            <div class="editorial-vignette"></div>
          </div>
          <div class="card-caption">
            <p class="caption-serif">“one of my favorite humans.”</p>
            <span class="caption-sub">captured in light</span>
          </div>
        </div>
      </div>

      <!-- Composition B: Minimal Dialogue & Whitespace -->
      <div class="editorial-block block-offset-left reveal-on-scroll">
        <div class="story-dialogue-box">
          <span class="dialogue-mark">—</span>
          <p class="dialogue-text">
            Some people enter our lives quietly,<br>
            and transform the cadence of everyday conversations.
          </p>
          <div class="story-signature">
            <span class="sig-name">Zeba.</span>
            <span class="sig-dash"></span>
            <span class="sig-year">2026</span>
          </div>
        </div>
      </div>

      <!-- Composition C: Overlapping editorial juxtaposition -->
      <div class="editorial-overlap-showcase reveal-on-scroll">
        <div class="overlap-photo-main parallax-element" data-speed="0.04">
          <img 
            src="/cake-pic/zeba1.png" 
            alt="Zeba editorial" 
            class="overlap-img"
            loading="lazy"
          />
          <div class="overlap-badge">
            <span>serenity</span>
          </div>
        </div>
        <div class="overlap-caption-card">
          <p class="overlap-title">a gentle presence.</p>
          <p class="overlap-desc">
            Unfiltered, authentic, and carrying an effortless warmth.
          </p>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
// Photo Story Component
</script>
