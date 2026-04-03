const submissionStart = new Date('2026-04-06T00:00:00-12:00');
const submissionEnd = new Date('2026-05-11T23:59:59-12:00');
const countdown = document.getElementById('countdown');
const submissionStatus = document.getElementById('submission-status');
const submissionProgressFill = document.getElementById('submission-progress-fill');

function renderCountdown() {
  if (!countdown) {
    return;
  }
  const now = new Date();

  if (now < submissionStart) {
    const delta = submissionStart.getTime() - now.getTime();
    const days = Math.floor(delta / (1000 * 60 * 60 * 24));
    const hours = Math.floor((delta / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((delta / (1000 * 60)) % 60);
    countdown.textContent = `Submissions open in ${days}d ${hours}h ${minutes}m (AoE).`;
    if (submissionStatus) {
      submissionStatus.textContent = 'Submission window has not opened yet.';
    }
    if (submissionProgressFill) {
      submissionProgressFill.style.width = '0%';
    }
    return;
  }

  const delta = submissionEnd.getTime() - now.getTime();
  if (delta > 0) {
    const days = Math.floor(delta / (1000 * 60 * 60 * 24));
    const hours = Math.floor((delta / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((delta / (1000 * 60)) % 60);
    countdown.textContent = `${days}d ${hours}h ${minutes}m left until submission closes (AoE).`;
    const totalWindow = submissionEnd.getTime() - submissionStart.getTime();
    const elapsed = now.getTime() - submissionStart.getTime();
    const pct = Math.max(0, Math.min(100, (elapsed / totalWindow) * 100));
    if (submissionStatus) {
      submissionStatus.textContent = `Submission window is open (${Math.round(pct)}% elapsed).`;
    }
    if (submissionProgressFill) {
      submissionProgressFill.style.width = `${pct}%`;
    }
  } else {
    countdown.textContent = 'Submission deadline has passed. Update dates for the next cycle.';
    if (submissionStatus) {
      submissionStatus.textContent = 'Submission window is closed.';
    }
    if (submissionProgressFill) {
      submissionProgressFill.style.width = '100%';
    }
  }
}
renderCountdown();
setInterval(renderCountdown, 60 * 1000);

const revealObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    }
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.reveal').forEach((node) => revealObserver.observe(node));

const navLinks = Array.from(document.querySelectorAll('nav a'));
const sectionIds = navLinks.map((link) => link.getAttribute('href')).filter(Boolean);
const sections = sectionIds.map((id) => document.querySelector(id)).filter(Boolean);

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      navLinks.forEach((link) => link.classList.remove('is-active'));
      const active = document.querySelector(`nav a[href="#${entry.target.id}"]`);
      if (active) {
        active.classList.add('is-active');
      }
    });
  },
  {
    rootMargin: '-20% 0px -65% 0px',
    threshold: 0.05,
  }
);

sections.forEach((section) => sectionObserver.observe(section));

const filterButtons = Array.from(document.querySelectorAll('.track-filter'));
const trackCards = Array.from(document.querySelectorAll('.bento[data-track]'));

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const activeFilter = btn.dataset.filter;
    filterButtons.forEach((b) => b.classList.remove('is-active'));
    btn.classList.add('is-active');

    trackCards.forEach((card) => {
      const track = card.dataset.track;
      const matches = activeFilter === 'all' || activeFilter === track;
      card.classList.toggle('is-dim', !matches);
      card.classList.toggle('is-focus', matches);
    });
  });
});

const agendaTabs = Array.from(document.querySelectorAll('.agenda-tab'));
const agendaPanels = Array.from(document.querySelectorAll('.agenda-panel'));

agendaTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const mode = tab.dataset.agenda;
    agendaTabs.forEach((item) => item.classList.remove('is-active'));
    tab.classList.add('is-active');

    agendaPanels.forEach((panel) => {
      const panelMode = panel.dataset.agendaPanel;
      const shouldShow = mode === 'full' || mode === panelMode;
      panel.classList.toggle('is-hidden', !shouldShow);
      panel.classList.toggle('is-active', shouldShow);
    });
  });
});

const visualCards = Array.from(document.querySelectorAll('.visual-card'));

visualCards.forEach((card) => {
  card.addEventListener('mousemove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 6;
    const rotateX = ((0.5 - (y / rect.height)) * 6);
    card.style.transform = `translateY(-4px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
