// Set skill bar widths from data-width attribute
document.querySelectorAll('.skill-bar').forEach(bar => {
    const width = bar.getAttribute('data-width') + '%';
    bar.style.setProperty('--skill-width', width);
    bar.style.width = width; // fallback
});

// starfield theme
(() => {
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  let width, height, particles;

  function init() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      alpha: Math.random() * 0.5 + 0.3
    }));
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (const p of particles) {
      p.x += p.speedX;
      p.y += p.speedY;
      if (p.x > width) p.x = 0;
      else if (p.x < 0) p.x = width;
      if (p.y > height) p.y = 0;
      else if (p.y < 0) p.y = height;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 215, 0, ${p.alpha})`; // golden particles
      ctx.fill();
    }
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', init);
  init();
  animate();
})();

// ===== Mortal Kombat Easter Egg =====
(function() {
  const overlay = document.getElementById('mk-overlay');
  const closeBtn = document.getElementById('mk-close');
  const iconEl = document.getElementById('mk-icon');
  const titleEl = document.getElementById('mk-title');
  const subEl = document.getElementById('mk-sub');

  if (!overlay || !closeBtn) return;

  // Map of key sequences to phrases
  const phraseMap = {
    'mk': { icon: '🐉', title: 'FINISH HIM!', sub: 'Flawless Victory' },
    'sc': { icon: '🦂', title: 'GET OVER HERE!', sub: 'Scorpion wins' },
    'fa': { icon: '💀', title: 'FATALITY!', sub: 'Fatality' },
    'br': { icon: '🩸', title: 'BRUTALITY!', sub: 'Brutality' },
    'fv': { icon: '🏆', title: 'FLAWLESS VICTORY!', sub: 'Perfect' }
  };

  let keyBuffer = []; // stores last two lowercase keys

  document.addEventListener('keydown', function(e) {
    const key = e.key.toLowerCase();
    keyBuffer.push(key);
    if (keyBuffer.length > 2) keyBuffer.shift(); // keep only last 2

    const code = keyBuffer.join('');
    if (phraseMap[code]) {
      const { icon, title, sub } = phraseMap[code];
      iconEl.textContent = icon;
      titleEl.textContent = title;
      subEl.textContent = sub;
      overlay.classList.add('active');
      keyBuffer = []; // reset buffer
      // Optional: play a sound effect
      // new Audio('mk-toasty.mp3').play();
    }
  });

  closeBtn.addEventListener('click', () => {
    overlay.classList.remove('active');
  });

  // Click outside content to close
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('active');
    }
  });
})();