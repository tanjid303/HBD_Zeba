<template>
  <Transition name="gate-fade">
    <div v-if="isOpen" class="age-gate-overlay">
      <!-- Ambient corner glow orbs -->
      <div class="gate-glow-top"></div>
      <div class="gate-glow-bottom"></div>

      <div class="age-gate-card" :class="{ 'shake-animation': isShaking }">
        
        <!-- Cat Picture (cat1.jpg) -->
        <div class="cat-image-wrapper">
          <img 
            src="/cake-pic/cat1.jpg" 
            alt="Curious Cat Gatekeeper" 
            class="cat-img"
          />
          <div class="cat-badge">
            <span>Security Gatekeeper 🐾</span>
          </div>
        </div>

        <!-- Question Title -->
        <div class="gate-text-block">
          <p class="gate-eyebrow">First verify your identity</p>
          <h2 class="gate-title">what's your age?</h2>
          <p class="gate-subtitle">tell me...</p>
        </div>

        <!-- Form Input (No options, just input and submit) -->
        <form @submit.prevent="handleSubmit" class="gate-form">
          <div class="input-wrapper" :class="{ 'error-border': errorMsg }">
            <input 
              ref="inputRef"
              v-model="ageInput" 
              type="text" 
              placeholder="Enter your age" 
              class="age-input"
              maxlength="20"
              required
              autofocus
              @input="errorMsg = ''"
            />
            <button 
              type="submit" 
              class="gate-submit-btn"
              :disabled="!ageInput.trim() || isSubmitting"
            >
              <span>{{ isSuccess ? 'welcome ✨' : 'enter' }}</span>
              <svg v-if="!isSuccess" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
              <span v-else class="check-icon">✓</span>
            </button>
          </div>

          <!-- Error / Feedback Message -->
          <Transition name="msg-fade">
            <p v-if="errorMsg" class="gate-error">{{ errorMsg }}</p>
            <p v-else-if="isSuccess" class="gate-success">Welcome, Zeba ✨ Opening your birthday celebration... 🎂</p>
          </Transition>
        </form>

      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const emit = defineEmits(['entered']);

const isOpen = ref(true);
const ageInput = ref('');
const errorMsg = ref('');
const isShaking = ref(false);
const isSuccess = ref(false);
const isSubmitting = ref(false);
const inputRef = ref(null);

const VALID_WORD_AGES = {
  'twenty two': 22,
  'twenty-two': 22,
  'twenty three': 23,
  'twenty-three': 23,
  'twenty four': 24,
  'twenty-four': 24,
  'twenty five': 25,
  'twenty-five': 25
};

function parseAge(val) {
  const clean = val.toLowerCase().trim();
  if (VALID_WORD_AGES[clean] !== undefined) {
    return VALID_WORD_AGES[clean];
  }
  const num = parseInt(clean, 10);
  return isNaN(num) ? null : num;
}

function handleSubmit() {
  const raw = ageInput.value.trim();
  if (!raw) {
    triggerError("wrong age");
    return;
  }

  const ageNum = parseAge(raw);

  // Requirement: if age is between 22-25 then give enter, otherwise say "wrong age"
  if (ageNum !== null && ageNum >= 22 && ageNum <= 25) {
    errorMsg.value = '';
    isSuccess.value = true;
    isSubmitting.value = true;

    setTimeout(() => {
      isOpen.value = false;
      emit('entered', ageNum);
    }, 650);
  } else {
    triggerError("wrong age");
  }
}

function triggerError(msg) {
  errorMsg.value = msg;
  isShaking.value = true;
  setTimeout(() => {
    isShaking.value = false;
  }, 600);
}

onMounted(() => {
  if (inputRef.value) {
    inputRef.value.focus();
  }
});
</script>

<style scoped>
.age-gate-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  background: rgba(18, 12, 28, 0.78);
  backdrop-filter: blur(28px);
  -webkit-backdrop-filter: blur(28px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  overflow: hidden;
}

.gate-glow-top {
  position: absolute;
  top: -10%;
  left: -10%;
  width: 50vw;
  height: 50vw;
  background: radial-gradient(circle, rgba(155, 99, 199, 0.35) 0%, transparent 70%);
  filter: blur(80px);
  pointer-events: none;
}

.gate-glow-bottom {
  position: absolute;
  bottom: -10%;
  right: -10%;
  width: 50vw;
  height: 50vw;
  background: radial-gradient(circle, rgba(124, 82, 149, 0.3) 0%, transparent 70%);
  filter: blur(80px);
  pointer-events: none;
}

.age-gate-card {
  position: relative;
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(20px);
  border-radius: 32px;
  padding: 3rem 2.5rem 3rem;
  max-width: 440px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 35px 80px -15px rgba(25, 10, 45, 0.28),
              0 0 0 1px rgba(255, 255, 255, 0.6) inset,
              0 0 30px rgba(155, 99, 199, 0.15);
  animation: cardFloatIn 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  z-index: 2;
}

@keyframes cardFloatIn {
  0% { opacity: 0; transform: translateY(40px) scale(0.94); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}

.shake-animation {
  animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

@keyframes shake {
  10%, 90% { transform: translate3d(-2px, 0, 0); }
  20%, 80% { transform: translate3d(4px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-6px, 0, 0); }
  40%, 60% { transform: translate3d(6px, 0, 0); }
}

.cat-image-wrapper {
  position: relative;
  width: 190px;
  height: 235px;
  border-radius: 22px;
  overflow: hidden;
  box-shadow: 0 20px 45px -10px rgba(40, 20, 60, 0.22),
              0 0 0 3px rgba(255, 255, 255, 0.8);
  margin-bottom: 1.75rem;
  background: #F4F0F8;
}

.cat-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}

.cat-image-wrapper:hover .cat-img {
  transform: scale(1.05);
}

.cat-badge {
  position: absolute;
  bottom: 0.75rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(8px);
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #4A2866;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.gate-text-block {
  margin-bottom: 1.75rem;
}

.gate-eyebrow {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #7C5295;
  font-weight: 600;
  margin-bottom: 0.4rem;
}

.gate-title {
  font-family: var(--font-serif);
  font-size: clamp(2.2rem, 5vw, 2.75rem);
  font-weight: 400;
  letter-spacing: -0.02em;
  color: #2A1D3B;
  line-height: 1.1;
  margin-bottom: 0.3rem;
}

.gate-subtitle {
  font-family: var(--font-serif);
  font-size: 1.25rem;
  font-style: italic;
  color: #74648A;
}

.gate-form {
  width: 100%;
}

.input-wrapper {
  display: flex;
  align-items: center;
  border-radius: 999px;
  background: #FAF7FD;
  border: 1.5px solid rgba(124, 82, 149, 0.22);
  padding: 0.35rem 0.35rem 0.35rem 1.25rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
  transition: all 0.3s ease;
}

.input-wrapper:focus-within {
  border-color: #9B63C7;
  box-shadow: 0 0 0 3px rgba(155, 99, 199, 0.2);
  background: #FFFFFF;
}

.input-wrapper.error-border {
  border-color: #D32F2F;
  box-shadow: 0 0 0 3px rgba(211, 47, 47, 0.15);
}

.age-input {
  flex: 1;
  border: none;
  background: transparent;
  font-family: var(--font-sans);
  font-size: 0.95rem;
  color: #2A1D3B;
  outline: none;
}

.age-input::placeholder {
  color: #A396B5;
}

.gate-submit-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.75rem 1.45rem;
  background: #2A1D3B;
  color: #FFFFFF;
  border: none;
  border-radius: 999px;
  font-family: var(--font-sans);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
}

.gate-submit-btn:hover:not(:disabled) {
  background: #7C5295;
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(124, 82, 149, 0.3);
}

.gate-submit-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.check-icon {
  font-size: 1rem;
}

.gate-error {
  margin-top: 0.85rem;
  font-size: 0.85rem;
  color: #D32F2F;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.gate-success {
  margin-top: 0.85rem;
  font-size: 0.85rem;
  color: #2E7D32;
  font-weight: 500;
}

/* Transitions */
.gate-fade-enter-active,
.gate-fade-leave-active {
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.gate-fade-leave-to {
  opacity: 0;
  transform: scale(1.05);
}

.msg-fade-enter-active,
.msg-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.msg-fade-enter-from {
  opacity: 0;
  transform: translateY(-6px);
}

.msg-fade-leave-to {
  opacity: 0;
}

@media (max-width: 480px) {
  .age-gate-overlay {
    padding: 1rem 0.75rem;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .age-gate-card {
    padding: 1.75rem 1.15rem 1.75rem;
    border-radius: 24px;
    max-height: 92vh;
    overflow-y: auto;
  }

  .cat-image-wrapper {
    width: 140px;
    height: 175px;
    margin-bottom: 1.15rem;
    border-radius: 18px;
  }

  .gate-text-block {
    margin-bottom: 1.25rem;
  }

  .gate-title {
    font-size: 1.85rem;
  }

  .gate-subtitle {
    font-size: 1.1rem;
  }

  .input-wrapper {
    padding: 0.25rem 0.25rem 0.25rem 1rem;
  }

  .age-input {
    font-size: 0.9rem;
    min-width: 0;
  }

  .gate-submit-btn {
    padding: 0.65rem 1.15rem;
    font-size: 0.75rem;
    white-space: nowrap;
  }
}

@media (max-height: 700px) {
  .age-gate-card {
    padding: 1.25rem 1rem;
    max-height: 95vh;
    overflow-y: auto;
  }

  .cat-image-wrapper {
    width: 120px;
    height: 145px;
    margin-bottom: 0.75rem;
  }

  .gate-text-block {
    margin-bottom: 0.85rem;
  }
}
</style>
