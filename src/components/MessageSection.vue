<template>
  <section class="section-message" id="message-section">
    <div class="message-container">
      
      <!-- Section Tag -->
      <div class="letter-top-cue reveal-on-scroll">
        <span class="letter-badge">handwritten note</span>
        <h2 class="letter-main-title">A Letter For You</h2>
      </div>

      <!-- Realistic Handwritten Letter Paper Container -->
      <div class="handwritten-paper-wrapper reveal-on-scroll">
        
        <!-- Washi Tape Pins on top corners -->
        <div class="washi-tape washi-tape-left" aria-hidden="true"></div>
        <div class="washi-tape washi-tape-right" aria-hidden="true"></div>

        <!-- The Ruled Stationery Sheet -->
        <article class="handwritten-sheet" id="letter-sheet">
          
          <!-- Margin Line -->
          <div class="paper-margin-line" aria-hidden="true"></div>

          <!-- Paper Header (Date & Note in Cursive) -->
          <div class="sheet-header">
            <span class="sheet-postmark">Birthday Note</span>
            <span class="sheet-date">October 2026 · late night</span>
          </div>

          <!-- Handwritten Letter Body -->
          <div class="sheet-body">
            
            <!-- Salutation -->
            <p class="ink-line line-salutation msg-paragraph" data-order="1">
              Happy Birthday Zeba.
            </p>

            <!-- Paragraph 2 -->
            <p class="ink-line msg-paragraph" data-order="2">
              শুরুতে যত rude ভাবছিলাম, একদমই ভুল prove করে দিছো।
            </p>

            <!-- Paragraph 3 -->
            <p class="ink-line msg-paragraph" data-order="3">
              Regular কথা বলা হবে এরকম আশা কখনোই ছিলো না।
            </p>

            <!-- Paragraph 4 -->
            <p class="ink-line msg-paragraph" data-order="4">
              সেইখান থেকে এখন এত freely connected হবার পর আরো বেশি surprised হয়েছি।
            </p>

            <!-- Paragraph 5 -->
            <p class="ink-line msg-paragraph" data-order="5">
              Last তোমার ২০২৫ এর birthday থেকেই এই 1 year regular কথা হয়।
            </p>

            <!-- Paragraph 6 -->
            <p class="ink-line msg-paragraph" data-order="6">
              Really, a very good soul you are.
            </p>

            <!-- Paragraph 7 -->
            <p class="ink-line msg-paragraph" data-order="7">
              হালকা একটু গাধা… but it’s okay.
            </p>

            <!-- Paragraph 8 -->
            <p class="ink-line msg-paragraph" data-order="8">
              Next year connected থাকবা কিনা জানি না…
            </p>

            <!-- Paragraph 9 -->
            <p class="ink-line msg-paragraph" data-order="9">
              But I love you.
            </p>

            <!-- Paragraph 10 -->
            <p class="ink-line msg-paragraph" data-order="10">
              And wishing again, happiest birthday.
            </p>

            <!-- Paragraph 11 (Benediction) -->
            <p class="ink-line line-benediction msg-paragraph" data-order="11">
              সবসময় happy থাকো।
            </p>

          </div>

          <!-- Letter Signature & Wax Stamp -->
          <div class="sheet-footer">
            <div class="wax-seal-badge">
              <span class="seal-letter">Z</span>
            </div>
            <div class="handwritten-sign">
              <span class="sign-line">— wishing you the best</span>
            </div>
          </div>

        </article>

      </div>

    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  const elements = document.querySelectorAll('.msg-paragraph');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const order = parseInt(entry.target.getAttribute('data-order') || '1', 10);
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, Math.min(order * 50, 350));
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -20px 0px'
  });

  elements.forEach((el) => observer.observe(el));
});
</script>

<style scoped>
.section-message {
  padding: 7rem 1.5rem 8rem;
  position: relative;
  display: flex;
  justify-content: center;
}

.message-container {
  max-width: 860px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.letter-top-cue {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 3.5rem;
  text-align: center;
}

.letter-badge {
  font-family: var(--font-sans);
  font-size: 0.72rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--accent-primary);
  font-weight: 600;
}

.letter-main-title {
  font-family: var(--font-serif);
  font-size: clamp(2.4rem, 4.5vw, 3.6rem);
  font-weight: 300;
  letter-spacing: -0.02em;
  color: var(--text-main);
}

/* Handwritten Paper Wrapper with soft tilt & shadow */
.handwritten-paper-wrapper {
  position: relative;
  width: 100%;
  max-width: 780px;
  perspective: 1000px;
}

/* Washi tape stickers at top corners */
.washi-tape {
  position: absolute;
  top: -14px;
  width: 100px;
  height: 28px;
  background: rgba(230, 215, 195, 0.75);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(4px);
  z-index: 10;
  border-left: 2px dashed rgba(200, 180, 160, 0.4);
  border-right: 2px dashed rgba(200, 180, 160, 0.4);
}

.washi-tape-left {
  left: 35px;
  transform: rotate(-3deg);
}

.washi-tape-right {
  right: 35px;
  transform: rotate(4deg);
}

/* The Paper Sheet */
.handwritten-sheet {
  position: relative;
  background-color: #FCF9F2;
  /* Authentic lined notebook rules */
  background-image: repeating-linear-gradient(
    to bottom,
    transparent 0px,
    transparent 37px,
    rgba(175, 195, 220, 0.28) 38px
  );
  padding: 4.5rem 4rem 4.5rem 5.5rem;
  border-radius: 6px;
  box-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.06),
    0 18px 45px -10px rgba(50, 30, 60, 0.14),
    0 40px 90px -25px rgba(30, 15, 45, 0.1),
    0 0 0 1px rgba(215, 200, 180, 0.45);
  transform: rotate(-0.4deg);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  overflow: hidden;
}

.handwritten-sheet:hover {
  transform: rotate(0deg);
  box-shadow: 
    0 2px 5px rgba(0, 0, 0, 0.08),
    0 25px 60px -10px rgba(50, 30, 60, 0.18),
    0 50px 100px -20px rgba(30, 15, 45, 0.12),
    0 0 0 1px rgba(215, 200, 180, 0.6);
}

/* Notebook margin */
.paper-margin-line {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 3.5rem;
  width: 1.5px;
  background: rgba(200, 140, 140, 0.35);
  pointer-events: none;
}

/* Sheet Header */
.sheet-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 2.2rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(175, 195, 220, 0.35);
}

.sheet-postmark {
  font-family: 'Caveat', 'Kalam', cursive;
  font-size: 1.15rem;
  color: #7A6588;
  letter-spacing: 0.04em;
}

.sheet-date {
  font-family: 'Caveat', 'Kalam', cursive;
  font-size: 1.15rem;
  color: #6C5E78;
}

/* Handwritten Text Body */
.sheet-body {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

.ink-line {
  font-family: 'Anek Bangla', 'Caveat', 'Kalam', 'Noto Serif Bengali', cursive, serif;
  font-size: clamp(1.22rem, 2.1vw, 1.45rem);
  line-height: 38px;
  color: #1A2338; /* Midnight navy ink */
  letter-spacing: 0.01em;
  opacity: 0;
  transform: translateY(16px);
  filter: blur(2px);
  transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.85s cubic-bezier(0.16, 1, 0.3, 1),
              filter 0.85s cubic-bezier(0.16, 1, 0.3, 1);
  margin: 0;
}

.ink-line.revealed {
  opacity: 0.95;
  transform: translateY(0);
  filter: blur(0);
}

.line-salutation {
  font-family: 'Caveat', 'Kalam', cursive;
  font-size: clamp(2rem, 3.8vw, 2.7rem);
  font-weight: 700;
  color: #121A2C;
  line-height: 42px;
  margin-bottom: 0.5rem;
}

.line-benediction {
  font-weight: 600;
  color: #14223A;
}

/* Sheet Footer: Wax seal & signature */
.sheet-footer {
  margin-top: 3.5rem;
  padding-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.wax-seal-badge {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #7C5295, #4A2B66);
  box-shadow: 
    0 4px 14px rgba(74, 43, 102, 0.35),
    0 0 0 2px rgba(255, 255, 255, 0.3) inset;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(-10deg);
}

.seal-letter {
  font-family: var(--font-serif);
  font-size: 1.45rem;
  font-weight: 700;
  color: #F6EDFC;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
}

.handwritten-sign {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Caveat', 'Kalam', cursive;
  font-size: 1.45rem;
  color: #1A2338;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .section-message {
    padding: 5rem 1rem 6rem;
  }

  .handwritten-sheet {
    padding: 3.5rem 1.75rem 3.5rem 3.25rem;
    border-radius: 4px;
    background-image: repeating-linear-gradient(
      to bottom,
      transparent 0px,
      transparent 35px,
      rgba(175, 195, 220, 0.28) 36px
    );
  }

  .paper-margin-line {
    left: 2rem;
  }

  .ink-line {
    font-size: 1.15rem;
    line-height: 36px;
  }

  .line-salutation {
    font-size: 1.85rem;
    line-height: 38px;
  }

  .washi-tape {
    width: 70px;
    height: 22px;
  }

  .washi-tape-left {
    left: 15px;
  }

  .washi-tape-right {
    right: 15px;
  }
}
</style>
