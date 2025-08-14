
// Connects to HTML elements and powers the carousel rotation and controls.
// - HTML classes used: .carousel, .carousel-track, .panel, .carousel-control, .carousel-indicators

document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    const track = carousel.querySelector('.carousel-track');
    const panels = Array.from(carousel.querySelectorAll('.panel'));
    const prevBtn = carousel.querySelector('.carousel-control.prev');
    const nextBtn = carousel.querySelector('.carousel-control.next');
    const indicatorsContainer = carousel.querySelector('.carousel-indicators');

    let current = 0;
    let autoplayInterval = 4000;
    let timer = null;
    let isPaused = false;

    // create indicators
    panels.forEach((p, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.dataset.index = i;
      if (i === 0) btn.classList.add('active');
      indicatorsContainer.appendChild(btn);
    });
    const indicators = Array.from(indicatorsContainer.children);

    function updateCarousel() {
      // move track
      track.style.transform = `translateX(-${current * 100}%)`;
      // update indicators
      indicators.forEach((b, i) => b.classList.toggle('active', i === current));
    }

    function goTo(index) {
      current = (index + panels.length) % panels.length;
      updateCarousel();
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    // event listeners
    nextBtn && nextBtn.addEventListener('click', () => { next(); resetTimer(); });
    prevBtn && prevBtn.addEventListener('click', () => { prev(); resetTimer(); });

    indicators.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.dataset.index, 10);
        goTo(idx);
        resetTimer();
      });
    });

    // autoplay
    function startTimer() {
      stopTimer();
      timer = setInterval(() => {
        if (!isPaused) next();
      }, autoplayInterval);
    }
    function stopTimer() {
      if (timer) { clearInterval(timer); timer = null; }
    }
    function resetTimer() { startTimer(); }

    // pause on hover/focus (accessible)
    carousel.addEventListener('mouseenter', () => isPaused = true);
    carousel.addEventListener('mouseleave', () => isPaused = false);
    carousel.addEventListener('focusin', () => isPaused = true);
    carousel.addEventListener('focusout', () => isPaused = false);

    // keyboard support: left/right
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { prev(); resetTimer(); }
      if (e.key === 'ArrowRight') { next(); resetTimer(); }
    });

    // init
    updateCarousel();
    startTimer();
  }
});
