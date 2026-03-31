// Project detail page interactions
document.addEventListener('DOMContentLoaded', function() {
  const viewMoreBtn = document.getElementById('viewMoreBtn');
  const seeOtherBtn = document.getElementById('seeOtherBtn');
  const projectDetails = document.getElementById('projectDetails');
  const projectModal = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');

  // View More button - toggle details
  if (viewMoreBtn && projectDetails) {
    viewMoreBtn.addEventListener('click', function() {
      if (projectDetails.style.display === 'none') {
        projectDetails.style.display = 'block';
        projectDetails.style.animation = 'fadeIn 0.5s ease';
        viewMoreBtn.textContent = viewMoreBtn.getAttribute('data-en') === 'View More' ? 'Hide Details' : '隐藏详情';
        viewMoreBtn.setAttribute('data-en', viewMoreBtn.getAttribute('data-en') === 'View More' ? 'Hide Details' : 'View More');
        viewMoreBtn.setAttribute('data-zh', viewMoreBtn.getAttribute('data-zh') === '查看详情' ? '隐藏详情' : '查看详情');

        // Smooth scroll to details
        setTimeout(() => {
          projectDetails.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      } else {
        projectDetails.style.display = 'none';
        viewMoreBtn.textContent = getCurrentLang() === 'en' ? 'View More' : '查看详情';
        viewMoreBtn.setAttribute('data-en', 'View More');
        viewMoreBtn.setAttribute('data-zh', '查看详情');
      }
    });
  }

  // See Other Projects button - open modal
  if (seeOtherBtn && projectModal) {
    seeOtherBtn.addEventListener('click', function() {
      projectModal.style.display = 'block';
      projectModal.style.animation = 'fadeIn 0.3s ease';
    });
  }

  // Close modal
  if (modalClose && projectModal) {
    modalClose.addEventListener('click', function() {
      projectModal.style.display = 'none';
    });
  }

  // Close modal when clicking outside
  if (projectModal) {
    window.addEventListener('click', function(event) {
      if (event.target === projectModal) {
        projectModal.style.display = 'none';
      }
    });
  }

  // Helper function to get current language
  function getCurrentLang() {
    return localStorage.getItem('language') || 'en';
  }
});

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);
