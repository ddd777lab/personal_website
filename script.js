// ═══════════════════════════════════════════════════════════════════════
// Language Toggle System (Global)
// ═══════════════════════════════════════════════════════════════════════

let currentLang = localStorage.getItem('lang') || 'en';

function switchLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);

  // Update button states
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Update all elements with data-en and data-zh
  document.querySelectorAll('[data-en][data-zh]').forEach(el => {
    const text = lang === 'en' ? el.dataset.en : el.dataset.zh;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.value = text;
    } else {
      el.textContent = text;
    }
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Set initial language
  switchLanguage(currentLang);

  // Attach event listeners
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => switchLanguage(btn.dataset.lang));
  });

  // Scroll fade-in animation
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all cards
  document.querySelectorAll('.card, .nav-card, .project-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
  });
});
