// ===== Mobile menu toggle =====
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mnav');
if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => {
    const open = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!open));
    navToggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
    mobileMenu.toggleAttribute('hidden');
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.setAttribute('hidden', '');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open menu');
    });
  });
}

// ===== Enhanced Services content =====
const services = [
  {title:'Signature Cut',desc:'Tailored cuts for every hair type, designed to suit your style.', tag:'Most Booked', premium:false, icon:'scissors',
    img: 'riviera-hairstylists-inc-2/downloadgram.org_448560690_484522707290779_4583650680328841838_n.jpg'
  },
  {title:'Color & Highlights',desc:'Multi-dimensional color for a radiant, textured look.', tag:'Premium', premium:true, icon:'palette',
    img: 'riviera-hairstylists-inc-2/downloadgram.org_491440536_18386288275116684_3385721160669919189_n.jpg'
  },
  {title:'Perm',desc:'Long-lasting curls with volume and texture.', tag:'Most Booked', premium:false, icon:'wind',
    img: 'riviera-hairstylists-inc-2/downloadgram.org_505450850_18393260821116684_8928344615978124115_n.jpg'
  },
  {title:'Keratin Smoothing',desc:'Frizz control, smooth texture & long-lasting shine.', tag:'Premium', premium:true, icon:'sparkles',
    img: 'riviera-hairstylists-inc-2/downloadgram.org_502972980_18391448260116684_2488806066083202790_n.jpg'
  },
  {title:'Balayage Highlights',desc:'Hand-painted highlights for a natural, sun-kissed effect.', tag:'Most Booked', premium:false, icon:'highlighter',
    img: 'riviera-hairstylists-inc-2/downloadgram.org_348606129_1450095029154670_214379485749734583_n.jpg'
  },
  {title:'Bridal Updo',desc:'Picture-perfect event hair, crafted to perfection.', tag:'Premium', premium:true, icon:'star',
    img: 'riviera-hairstylists-inc-2/downloadgram.org_470039474_1260865821814412_2611470358304961714_n.jpg'
  },
];

function iconSvg(name){
  switch(name){
    case 'scissors': return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.12 15.88"/><path d="M14.47 14.48 20 20"/></svg>';
    case 'palette': return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22a10 10 0 1 1 10-10c0 3-2 3-4 3h-1a2 2 0 0 0-2 2v1c0 2-1 4-3 4Z"/><circle cx="7.5" cy="10.5" r="1.5"/><circle cx="12" cy="7.5" r="1.5"/><circle cx="16.5" cy="10.5" r="1.5"/></svg>';
    case 'wind': return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h13a3 3 0 1 0-3-3"/><path d="M5 18h8a3 3 0 1 1-3 3"/><path d="M4 6h10"/></svg>';
    case 'sparkles': return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v4M12 17v4M3 12h4M17 12h4"/><path d="M5 5l3 3M16 16l3 3M5 19l3-3M16 8l3-3"/></svg>';
    case 'highlighter': return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 11-6 6v3h3l6-6"/><path d="m22 7-5-5-5 5 5 5 5-5z"/></svg>';
    case 'star': return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 17.27 6.18 3.73-1.64-7.03L21 9.24l-7.19-.62L12 2 10.19 8.62 3 9.24l4.46 4.73L5.82 21z"/></svg>';
    default: return '<svg width="18" height="18"></svg>';
  }
}

const grid = document.getElementById('servicesGrid');
if (grid) {
  grid.classList.add('cols-3');
  services.forEach(s => {
    const el = document.createElement('article');
    el.className = 'card service';
    const tag = `
      <span class="s-kicker${s.tag ? '' : ' s-kicker--blank'}">
        ${s.tag ? `<span class="dot ${s.premium ? 'dot-gold' : ''}"></span>${s.tag}` : '&nbsp;'}
      </span>
    `;
    el.innerHTML = `
      <div class="service-head">
        <div class="s-head-left">
          <div class="s-icon">${iconSvg(s.icon)}</div>
          <div>
            <h3 class="service-title">${s.title}</h3>
            ${tag}
          </div>
        </div>
      </div>
      <p class="service-desc">${s.desc}</p>
      
      <div class="service-img">
        <img src="${s.img || 'https://placehold.co/600x340?text=Service+Image'}" 
             alt="${s.title}" loading="lazy">
      </div>

      <div class="s-cta">
        <button class="btn btn-fill">Book</button>
      </div>
    `;
    grid.appendChild(el);
  });
}

// ===== Footer year =====
const y = document.getElementById('year');
if (y) y.textContent = String(new Date().getFullYear());

// ===== Scroll reveal (stagger) =====
const io = new IntersectionObserver(
  (entries) => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  }),
  { threshold: 0.18 }
);
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${Math.min(i*60, 360)}ms`;
  io.observe(el);
});

// ===== Reviews (manual, 7 hard-coded) + Carousel =====

// If you want the "Leave a review" button to link somewhere, set it here:
const LEAVE_REVIEW_URL = window.GREV_LINK || "https://share.google/b4jH2t3uJFJJdnE4m";
const leaveBtn = document.getElementById('leaveReviewBtn');
if (leaveBtn && LEAVE_REVIEW_URL) leaveBtn.href = LEAVE_REVIEW_URL;

// ---- 7 manual reviews (edit these anytime)
const REVIEWS = [
  { author_name: "Indu Rana", rating: 5, text: "I can’t say enough good things about Lori, the best hairstylist! She truly understands hair and takes the time to make sure every detail is perfect. My hair feels soft, healthy, and looks amazing after every visit. She’s not just a stylist, she’s an artist with a warm heart. Highly recommend her to anyone who wants a transformation that feels both beautiful and natural!" },
  { author_name: "Laurie Guzzo",   rating: 5, text: "Laurie did my hair and it is amazing. My hair hasn't looked this good in years. Not to mention that this is one of the most friendly salons I have ever been to. I will definitely be returning!❤️" },
  { author_name: "ThomJamEm Sarabura",  rating: 5, text: "I had Emilio, who only works on Thursday and Friday, and he was awesome! Gave me a great haircut and was truly a mastermind. All the people there were so nice. 11/10 would recommend!!!" },
  { author_name: "Dora Sanabria.", rating: 5, text: "I’m very happy with my stylist Lori, she did for me the highlights and I loved it. Lori did a great job, she is very professional in her career, she always takes her time to make sure the client is satisfied, using quality products and listens to the clients concerns, she has a charisma that makes you feel like family. The service is excellent, all the staff is very welcoming and friendly. I highly recommend Riviera Hairstylists Inc." },
  { author_name: "Kim G.",  rating: 5, text: "I always get my hair coloured here, and it's amazing every time! Lori is so sweet and incredibly talented. The colour always turns out vibrant and healthy, and the whole experience is very relaxing. Highly recommend!" },
  { author_name: "Nancy Fornasiero",    rating: 5, text: "I’ve been having my hair cut and coloured by Lori at Riviera for 10 years now. She is amazing! I get asked all the time “who does your hair”? The whole staff is so welcoming and friendly- it’s a pleasure to be there. Convenient location too. Highly recommend." },
  { author_name: "Evon Shaba",   rating: 5, text: "over 20 years that I know such a beautiful person Lori , I couldn’t say enough how much amazing stylists she is , welcoming and caring and friendly, I am so glad to have her doing a beautiful job every single time when I see her , Highly recommend her ❤️" },
];

// ---- Carousel elements
const rcTrack   = document.getElementById('rcTrack');
const rcViewport= document.getElementById('rcViewport');
const rcPrev    = document.getElementById('rcPrev');
const rcNext    = document.getElementById('rcNext');
const rcDots    = document.getElementById('rcDots');

function starRow(rating=5){ return '★★★★★'.slice(0, Math.round(rating)).padEnd(5,'☆'); }
function initialsFrom(name=''){ return (name.trim().split(/\s+/).map(w=>w[0]).join('').slice(0,2) || 'R').toUpperCase(); }
function makeAvatar(initials='R'){
  return `<div class="avatar" style="display:grid;place-items:center;background:#f2efe7;color:#736640;font-weight:800;border:1px solid rgba(0,0,0,.08);width:44px;height:44px;border-radius:50%">${initials}</div>`;
}

function makeSlide({ author_name, rating=5, text='' }) {
  const slide = document.createElement('div');
  slide.className = 'rc-slide';
  slide.innerHTML = `
    <blockquote class="rc-card">
      <div class="q-head">
        <div style="display:flex; align-items:center; gap:.6rem;">
          ${makeAvatar(initialsFrom(author_name))}
          <strong>${author_name}</strong>
        </div>
        <span class="pill pill-gold badge">Google Review</span>
      </div>
      <div class="stars" aria-hidden="true">${starRow(rating)}</div>
      <p class="review-text">${text}</p>
    </blockquote>
  `;
  return slide;
}

function injectSlides(items) {
  rcTrack.innerHTML = '';
  items.forEach(r => rcTrack.appendChild(makeSlide(r)));
  setupCarousel(true);
}

// ---- Carousel logic
function slidesPerView() {
  const vw = rcViewport?.clientWidth || window.innerWidth;
  if (vw >= 1024) return 3;
  if (vw >= 700)  return 2;
  return 1;
}

let rcIndex = 0;
let autoplayTimer = null;

function maxIndex() {
  const total = rcTrack?.children.length || 0;
  const spv = slidesPerView();
  return Math.max(0, total - spv);
}
function goTo(i) {
  if (!rcTrack) return;
  rcIndex = Math.max(0, Math.min(i, maxIndex()));
  const card = rcTrack.querySelector('.rc-slide');
  if (!card) return;
  const gap = parseFloat(getComputedStyle(rcTrack).gap) || 0;
  const w = card.getBoundingClientRect().width + gap;
  rcTrack.style.transform = `translateX(${-rcIndex * w}px)`;
  updateDots();
}
function next(){ goTo(rcIndex + 1); }
function prev(){ goTo(rcIndex - 1); }

function buildDots() {
  if (!rcDots) return;
  rcDots.innerHTML = '';
  const pages = maxIndex() + 1;
  for (let i=0;i<pages;i++){
    const b = document.createElement('button');
    b.className = 'rc-dot';
    b.setAttribute('role','tab');
    b.setAttribute('aria-selected', i===rcIndex ? 'true' : 'false');
    b.addEventListener('click', () => goTo(i));
    rcDots.appendChild(b);
  }
}
function updateDots() {
  if (!rcDots) return;
  const dots = rcDots.querySelectorAll('.rc-dot');
  dots.forEach((d, i) => d.setAttribute('aria-selected', i===rcIndex ? 'true' : 'false'));
}

function startAutoplay(){
  stopAutoplay();
  const delay = 2800;
  autoplayTimer = setInterval(() => {
    if (rcIndex >= maxIndex()) rcIndex = -1;
    next();
  }, delay);
}
function stopAutoplay(){ if (autoplayTimer) { clearInterval(autoplayTimer); autoplayTimer = null; } }

function setupCarousel(resetIndex=false) {
  if (!rcTrack) return;
  if (resetIndex) rcIndex = 0;
  buildDots();
  goTo(rcIndex);
  startAutoplay();
}

if (rcPrev && rcNext) {
  rcPrev.addEventListener('click', () => { prev(); startAutoplay(); });
  rcNext.addEventListener('click', () => { next(); startAutoplay(); });
}

if (rcViewport) {
  ['mouseenter','focusin'].forEach(evt => rcViewport.addEventListener(evt, stopAutoplay));
  ['mouseleave','focusout'].forEach(evt => rcViewport.addEventListener(evt, startAutoplay));
  let touchStartX = null;
  rcViewport.addEventListener('touchstart', (e)=>{ touchStartX = e.touches[0].clientX; stopAutoplay(); }, {passive:true});
  rcViewport.addEventListener('touchend', startAutoplay, {passive:true});
  rcViewport.addEventListener('touchmove', (e)=>{
    if (touchStartX == null) return;
    const dx = e.touches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40){ dx<0 ? next() : prev(); touchStartX = null; }
  },{passive:true});
  window.addEventListener('resize', () => { buildDots(); goTo(rcIndex); });
}

// Init manual reviews
injectSlides(REVIEWS);

// ===== Contact form demo =====
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
if (contactForm && formNote){
  contactForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    formNote.textContent = 'Thanks! We’ll get back to you soon.';
    contactForm.reset();
  });
}

// ===== Lightweight sanity checks =====
try {
  const expected = ['Home','About','Services','Reviews','Team','Contact'];
  const actual = Array.from(document.querySelectorAll('.nav-links .nav-link')).map(a => a.textContent.trim());
  console.assert(JSON.stringify(expected) === JSON.stringify(actual), 'Nav items/order mismatch', { expected, actual });

  const svcCount = document.querySelectorAll('#servicesGrid .service').length;
  console.assert(svcCount === 6, 'Expected 6 service cards', { svcCount });

  console.assert(!!document.querySelector('.hero-title'), 'Hero title missing');
  console.assert(!!document.getElementById('gmap'), 'Map iframe missing');
} catch (e) { /* silent in production */ }




// ===== Lightbox Carousel for .gallery =====
(() => {
  const gallery = document.querySelector('.gallery');
  if (!gallery) return;

  // Cache DOM
  const lb = document.getElementById('lightbox');
  const imgEl = document.getElementById('lbImg');
  const captionEl = document.getElementById('lbCaption');  // we will show "i / total" here
  const counterEl = document.getElementById('lbCounter');   // keep top-right counter in sync
  const prevBtn = document.getElementById('lbPrev');
  const nextBtn = document.getElementById('lbNext');
  const closeBtn = document.getElementById('lbClose');

  // Build image list from gallery <img>
  const thumbs = Array.from(gallery.querySelectorAll('img'));
  const items = thumbs.map(t => ({
    src: t.getAttribute('src'),
    alt: t.getAttribute('alt') || '',
  }));

  let i = 0;
  let touchStartX = null;

  function setCounterText(idx){
    const text = `${idx + 1} / ${items.length}`;
    if (captionEl) captionEl.textContent = text;  // ← replace "Gallery Photo" with the number
    if (counterEl) counterEl.textContent = text;  // keep the top-right badge in sync
  }

  function show(index){
    if (!items.length) return;
    i = (index + items.length) % items.length; // wrap
    const { src, alt } = items[i];
    imgEl.src = src;
    imgEl.alt = alt;
    setCounterText(i);
  }

  function openAt(index){
    document.body.classList.add('lb-open');
    lb.hidden = false;
    show(index);
    nextBtn?.focus({ preventScroll: true });
    document.addEventListener('keydown', onKeys);
  }

window.openAt = openAt;

  function close(){
    document.body.classList.remove('lb-open');
    lb.hidden = true;
    document.removeEventListener('keydown', onKeys);
    thumbs[i]?.focus?.();
  }

  function onKeys(e){
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(i - 1);
    else if (e.key === 'ArrowRight') show(i + 1);
  }

  // Open from gallery
  gallery.addEventListener('click', (e) => {
    const img = e.target.closest('img');
    if (!img) return;
    const idx = thumbs.indexOf(img);
    openAt(idx >= 0 ? idx : 0);
  });

  // ---- IMPORTANT: fix “skips every second picture” ----
  // Use backdrop-only click to close; do NOT delegate prev/next on the container.
lb.addEventListener('click', (e) => {
  const isImage = e.target.classList.contains('lb-img');
  const isButton = e.target.classList.contains('lb-btn') || e.target.closest('.lb-btn');

  // close if clicked *anywhere except* the image or navigation buttons
  if (!isImage && !isButton) {
    close();
  }
});


  // Button handlers (stop bubbling so lb's click handler doesn't also run)
  closeBtn?.addEventListener('click', (e) => { e.stopPropagation(); close(); });
  prevBtn?.addEventListener('click', (e) => { e.stopPropagation(); show(i - 1); });
  nextBtn?.addEventListener('click', (e) => { e.stopPropagation(); show(i + 1); });

  // Touch swipe
  lb.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive:true });
  lb.addEventListener('touchend', (e) => {
    if (touchStartX == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) dx > 0 ? show(i - 1) : show(i + 1);
    touchStartX = null;
  }, { passive:true });
})();

document.addEventListener("click", (e) => {
  const moreTile = e.target.closest("[data-open-gallery]");
  if (!moreTile) return;

  e.stopPropagation();

  // ✅ open first image
  openAt(0);
});
