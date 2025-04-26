import gsap from 'https://unpkg.com/gsap@3/dist/gsap.min.js';
import { ScrollTrigger } from 'https://unpkg.com/gsap@3/dist/ScrollTrigger.min.js';
import Swiper from 'https://unpkg.com/swiper/swiper-bundle.esm.browser.min.js';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  // Header scroll effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Section fade-in
  document.querySelectorAll('section').forEach(sec => {
    gsap.from(sec, {
      opacity: 0,
      y: 60,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: { trigger: sec, start: 'top 80%' }
    });
  });

  // Swiper instances
  new Swiper('.properties .swiper-container', {
    loop: true,
    spaceBetween: 30,
    slidesPerView: 1,
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
  });

  new Swiper('.testimonials .swiper-container', {
    loop: true,
    pagination: { el: '.swiper-pagination', clickable: true },
    autoplay: { delay: 6000 }
  });

  // Contact form
  const form = document.getElementById('contact-form');
  const resp = document.getElementById('form-response');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      resp.textContent = json.message;
      form.reset();
    } catch {
      resp.textContent = 'Submission failed. Try again later.';
    }
  });
});