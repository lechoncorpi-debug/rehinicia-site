// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('navLinks');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}

// Footer year
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Smooth scroll offset for sticky header
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href');
    if (id === '#' || !id) return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// Scroll reveal
const revealEls = document.querySelectorAll('section, .service, .stat, .testimonial, .process-step');
revealEls.forEach(el => el.classList.add('reveal'));
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => io.observe(el));

// Service modal
const modal = document.getElementById('serviceModal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalIndex = document.getElementById('modalIndex');

function openModal(card) {
  if (!modal) return;
  modalIndex.textContent = card.querySelector('.service-index')?.textContent || '';
  modalTitle.textContent = card.dataset.title || '';
  modalDesc.textContent = card.dataset.desc || '';
  modalImg.onerror = () => { modalImg.onerror = null; modalImg.src = 'logo-main.jpg'; };
  modalImg.src = card.dataset.img || 'logo-main.jpg';
  modalImg.alt = card.dataset.title || '';
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}
function closeModal() {
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}
document.querySelectorAll('.service').forEach(card => {
  card.addEventListener('click', () => openModal(card));
});
modal?.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeModal));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
