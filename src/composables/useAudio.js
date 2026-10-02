import { ref } from 'vue';

const CHIME_FREQUENCIES = [
  [523.25, 1046.50, 1567.98], // C5 chord - Lavender
  [587.33, 1174.66, 1760.00], // D5 chord - Sage
  [659.25, 1318.51, 1975.53], // E5 chord - Emerald
  [783.99, 1567.98, 2349.32]  // G5 chord - Golden Matcha
];

export function useAudio() {
  const isMuted = ref(true);
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function toggleAudio() {
    isMuted.value = !isMuted.value;
    initAudio();
    return isMuted.value;
  }

  function playChime(stateIndex) {
    if (isMuted.value || !audioCtx) return;

    try {
      const freqs = CHIME_FREQUENCIES[stateIndex % CHIME_FREQUENCIES.length];
      const now = audioCtx.currentTime;

      freqs.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = idx === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);

        // Soft bell envelope
        gain.gain.setValueAtTime(0.001, now + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.08 / (idx + 1), now + idx * 0.04 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.04 + 1.8);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(now + idx * 0.04);
        osc.stop(now + idx * 0.04 + 1.85);
      });
    } catch (e) {
      // Audio quiet fallback
    }
  }

  return {
    isMuted,
    toggleAudio,
    playChime,
    initAudio
  };
}
