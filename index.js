document.addEventListener('DOMContentLoaded', () => {
  // Carousel functionality
  const track = document.querySelector('.carousel-track');
  const panels = document.querySelectorAll('.panel');
  const indicatorsContainer = document.querySelector('.carousel-indicators');
  let currentIndex = 0;

  // Create indicators
  panels.forEach((_, index) => {
    const button = document.createElement('button');
    button.setAttribute('aria-label', `Go to slide ${index + 1}`);
    if (index === 0) button.classList.add('active');
    indicatorsContainer.appendChild(button);
  });

  const indicators = document.querySelectorAll('.carousel-indicators button');

  // Update carousel position
  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    indicators.forEach((btn, idx) => {
      btn.classList.toggle('active', idx === currentIndex);
    });
  }

  // Auto-scroll every 5 seconds
  function autoScroll() {
    currentIndex = (currentIndex + 1) % panels.length;
    updateCarousel();
  }

  // Click indicators to navigate
  indicators.forEach((button, index) => {
    button.addEventListener('click', () => {
      currentIndex = index;
      updateCarousel();
    });
  });

  // Start auto-scroll
  setInterval(autoScroll, 5000);

  // Ensure game names are displayed correctly
  const gameCards = document.querySelectorAll('.game-card');
  gameCards.forEach(card => {
    const img = card.querySelector('.game-logo');
    const nameSpan = card.querySelector('.game-name');
    if (img && nameSpan) {
      nameSpan.textContent = img.alt;
    }
  });

  // Ensure icon links have correct titles
  const iconLinks = document.querySelectorAll('.icon-link');
  iconLinks.forEach(link => {
    const img = link.querySelector('.icon-image');
    if (img) {
      img.setAttribute('alt', link.getAttribute('title') + ' Icon');
    }
  });

  // Search functionality
  const searchInput = document.querySelector('#search');
  const searchBtn = document.querySelector('.search-btn');
  const gameGrid = document.querySelector('.game-grid');

  function filterGames() {
    const query = searchInput.value.trim().toLowerCase();
    gameCards.forEach(card => {
      const name = card.querySelector('.game-name').textContent.toLowerCase();
      card.style.display = name.includes(query) ? 'block' : 'none';
    });
  }

  // Trigger search on input change and button click
  searchInput.addEventListener('input', filterGames);
  searchBtn.addEventListener('click', filterGames);
  // Trigger search on Enter key
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      filterGames();
    }
  });
});
