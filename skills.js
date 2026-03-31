let currentIndex = 0;
const cards = document.querySelectorAll('.skill-card');
const track = document.querySelector('.carousel-track');
const dots = document.querySelectorAll('.dot');
const leftArrow = document.querySelector('.carousel-arrow.left');
const rightArrow = document.querySelector('.carousel-arrow.right');

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    const currentLang = localStorage.getItem('lang') || 'zh';

    // Update all text elements
    document.querySelectorAll('[data-en][data-zh]').forEach(el => {
        const text = currentLang === 'en' ? el.dataset.en : el.dataset.zh;
        el.textContent = text;
    });

    // Update button states
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });

    // Add click listeners to language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            localStorage.setItem('lang', lang);

            document.querySelectorAll('[data-en][data-zh]').forEach(el => {
                const text = lang === 'en' ? el.dataset.en : el.dataset.zh;
                el.textContent = text;
            });

            document.querySelectorAll('.lang-btn').forEach(b => {
                b.classList.toggle('active', b.dataset.lang === lang);
            });
        });
    });
});

// Card flip
cards.forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });
});

// Carousel navigation
function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

leftArrow.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCarousel();
});

rightArrow.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel();
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCarousel();
    } else if (e.key === 'ArrowRight') {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarousel();
    }
});

// Touch/drag support
let startX = 0;
let isDragging = false;

track.addEventListener('mousedown', (e) => {
    startX = e.clientX;
    isDragging = true;
});

track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
});

track.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    const diff = startX - e.clientX;
    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            currentIndex = (currentIndex + 1) % cards.length;
        } else {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        }
        updateCarousel();
    }
    isDragging = false;
});

track.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            currentIndex = (currentIndex + 1) % cards.length;
        } else {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        }
        updateCarousel();
    }
    isDragging = false;
});
