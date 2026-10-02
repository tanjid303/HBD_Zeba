export function useParticles() {
  let canvasRef = null;
  let ctx = null;
  let animId = null;
  const particles = [];
  const MAX_AMBIENT_PARTICLES = 16;

  class Particle {
    constructor(canvas, isBurst = false) {
      this.canvas = canvas;
      this.reset(isBurst);
    }

    reset(isBurst = false) {
      const cx = this.canvas.width / 2;
      const cy = this.canvas.height / 2;

      if (isBurst) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 80 + 30;
        this.x = cx + Math.cos(angle) * radius;
        this.y = cy + Math.sin(angle) * radius;
        const speed = Math.random() * 1.8 + 0.8;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed - 1.2;
        this.alpha = Math.random() * 0.7 + 0.3;
        this.life = Math.random() * 45 + 35;
        this.maxLife = this.life;
        this.size = Math.random() * 2.8 + 1.2;
        this.isBurst = true;
      } else {
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = -(Math.random() * 0.4 + 0.2);
        this.alpha = Math.random() * 0.4 + 0.1;
        this.life = Math.random() * 120 + 80;
        this.maxLife = this.life;
        this.size = Math.random() * 1.8 + 0.8;
        this.isBurst = false;
      }
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life--;

      if (this.isBurst) {
        this.alpha = (this.life / this.maxLife) * 0.8;
        this.vx *= 0.98;
        this.vy *= 0.98;
      } else {
        if (this.life <= 0 || this.y < 0) {
          this.reset(false);
          this.y = this.canvas.height + 10;
        }
      }
    }

    draw(context) {
      context.save();
      context.globalAlpha = Math.max(0, this.alpha);
      
      const glowColor = getComputedStyle(document.body).getPropertyValue('--accent-vivid').trim() || '#9B63C7';
      context.fillStyle = glowColor;
      context.shadowColor = glowColor;
      context.shadowBlur = 8;

      context.beginPath();
      context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      context.fill();

      context.restore();
    }
  }

  function init(canvas) {
    canvasRef = canvas;
    if (!canvasRef) return;
    ctx = canvasRef.getContext('2d');
    resize();

    particles.length = 0;
    for (let i = 0; i < MAX_AMBIENT_PARTICLES; i++) {
      particles.push(new Particle(canvasRef, false));
    }

    function animate() {
      if (!ctx || !canvasRef) return;
      ctx.clearRect(0, 0, canvasRef.width, canvasRef.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);

        if (p.isBurst && p.life <= 0) {
          particles.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(animate);
    }

    animId = requestAnimationFrame(animate);
    window.addEventListener('resize', resize);
  }

  function resize() {
    if (!canvasRef || !ctx) return;
    const rect = canvasRef.getBoundingClientRect();
    canvasRef.width = rect.width * (window.devicePixelRatio || 1);
    canvasRef.height = rect.height * (window.devicePixelRatio || 1);
    ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
  }

  function spawnBurst() {
    if (!canvasRef) return;
    for (let i = 0; i < 22; i++) {
      particles.push(new Particle(canvasRef, true));
    }
  }

  function destroy() {
    if (animId) cancelAnimationFrame(animId);
    window.removeEventListener('resize', resize);
  }

  return {
    init,
    spawnBurst,
    destroy
  };
}
