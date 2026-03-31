class Particle {
  constructor(canvas, fromBottomRight = false) {
    this.canvas = canvas;
    this.fromBottomRight = fromBottomRight;
    this.reset();
  }

  reset() {
    if (this.fromBottomRight) {
      this.x = this.canvas.width * (0.7 + Math.random() * 0.3);
      this.y = this.canvas.height * (0.7 + Math.random() * 0.3);
    } else {
      this.x = Math.random() * this.canvas.width;
      this.y = Math.random() * this.canvas.height;
    }
    this.vx = (Math.random() - 0.5) * 1.5;
    this.vy = (Math.random() - 0.5) * 1.5;
    this.size = Math.random() * 2 + 1;
    this.opacity = Math.random() * 0.35 + 0.15;
  }

  update(mouseX, mouseY) {
    this.x += this.vx;
    this.y += this.vy;

    if (mouseX !== null && mouseY !== null) {
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150) {
        this.x += dx * 0.015;
        this.y += dy * 0.015;
      }
    }

    if (this.x < 0 || this.x > this.canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1;
  }

  draw(ctx) {
    ctx.fillStyle = `rgba(200, 200, 200, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

class ParticleSystem {
  constructor() {
    this.canvas = document.getElementById('particleCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouseX = null;
    this.mouseY = null;
    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });
    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    const count = window.innerWidth < 768 ? 250 : 500;
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push(new Particle(this.canvas, i < count / 2));
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.particles.forEach(p => {
      p.update(this.mouseX, this.mouseY);
      p.draw(this.ctx);
    });
    requestAnimationFrame(() => this.animate());
  }
}

new ParticleSystem();
