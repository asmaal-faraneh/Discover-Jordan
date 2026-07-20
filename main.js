window.addEventListener('load', () => {
  setTimeout(() => {
    const l = document.getElementById('loader');
    if (l) l.classList.add('hide');
  }, 1900);
});

(function () {
  const btn  = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');
  const root = document.documentElement;
  const saved = localStorage.getItem('jh-theme') || 'light';
  root.setAttribute('data-theme', saved);
  setIcon(saved);
  if (btn) btn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('jh-theme', next);
    setIcon(next);
  });
  function setIcon(t) { if (icon) icon.className = t === 'dark' ? 'fas fa-sun' : 'fas fa-moon'; }
})();

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
  const btt = document.getElementById('btt');
  if (btt) btt.classList.toggle('show', window.scrollY > 400);
});

const ham = document.getElementById('hamburger');
const mNav = document.getElementById('mobile-nav');
if (ham && mNav) {
  ham.addEventListener('click', () => {
    ham.classList.toggle('open');
    mNav.classList.toggle('open');
  });
  document.addEventListener('click', e => {
    if (!ham.contains(e.target) && !mNav.contains(e.target)) {
      ham.classList.remove('open');
      mNav.classList.remove('open');
    }
  });
}


const btt = document.getElementById('btt');
if (btt) btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));


(function () {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, #mobile-nav a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
})();


const searchData = [
  { title: 'Petra — The Rose City',        url: 'petra.html',        desc: 'Ancient Nabataean city carved in rose-red rock' },
  { title: 'Wadi Rum — Valley of the Moon', url: 'wadirum.html',      desc: 'Stunning desert landscape with red sand dunes' },
  { title: 'Dead Sea',                      url: 'destinations.html', desc: 'Lowest point on Earth — float effortlessly' },
  { title: 'Jerash — Roman City',           url: 'destinations.html', desc: 'Best preserved Roman city outside Italy' },
  { title: 'Aqaba — Red Sea',               url: 'destinations.html', desc: 'Diving, snorkeling and beach resort city' },
  { title: 'Dana Biosphere Reserve',        url: 'nature.html',       desc: "Jordan's largest nature reserve" },
  { title: 'Restaurants in Jordan',         url: 'restaurants.html',  desc: 'Best Jordanian cuisine and dining' },
  { title: 'Hotels in Jordan',              url: 'hotels.html',       desc: 'Luxury and boutique hotels across Jordan' },
  { title: 'Shopping in Jordan',            url: 'shopping.html',     desc: 'Souvenirs, crafts and local markets' },
  { title: 'Travel Tips',                   url: 'tips.html',         desc: 'Essential tips for visiting Jordan' },
  { title: 'Contact Us',                    url: 'contact.html',      desc: 'Get in touch with Jordan Horizon' },
  { title: 'All Destinations',              url: 'destinations.html', desc: 'Browse every destination in Jordan' },
];

const searchOverlay = document.getElementById('search-overlay');
const searchInput   = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

document.getElementById('search-btn')?.addEventListener('click', () => {
  searchOverlay?.classList.add('open');
  setTimeout(() => searchInput?.focus(), 80);
});
document.getElementById('search-x')?.addEventListener('click', () => searchOverlay?.classList.remove('open'));
searchOverlay?.addEventListener('click', e => { if (e.target === searchOverlay) searchOverlay.classList.remove('open'); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') searchOverlay?.classList.remove('open'); });

searchInput?.addEventListener('input', () => {
  const q = searchInput.value.toLowerCase().trim();
  if (!searchResults) return;
  if (!q) { searchResults.innerHTML = ''; return; }
  const hits = searchData.filter(d => d.title.toLowerCase().includes(q) || d.desc.toLowerCase().includes(q));
  searchResults.innerHTML = hits.length
    ? hits.map(h => `<a href="${h.url}" class="s-result"><div class="s-result-title">${h.title}</div><div class="s-result-desc">${h.desc}</div></a>`).join('')
    : '<div class="s-result"><div class="s-result-desc">No results found.</div></div>';
});


document.querySelectorAll('.acc-head').forEach(h => {
  h.addEventListener('click', () => {
    const item = h.closest('.acc-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.acc-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});


document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const wrap = btn.closest('[data-tabs]') || document;
    wrap.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    wrap.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    wrap.querySelector(`[data-tab="${btn.dataset.tab}"]`)?.classList.add('active');
  });
});


(function () {
  const lb    = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  if (!lb || !lbImg) return;
  const items  = [...document.querySelectorAll('.g-item')];
  const images = items.map(i => i.querySelector('img')?.src).filter(Boolean);
  let cur = 0;

  items.forEach((item, i) => item.addEventListener('click', () => open(i)));
  document.getElementById('lb-close')?.addEventListener('click', close);
  document.getElementById('lb-prev')?.addEventListener('click', () => open((cur - 1 + images.length) % images.length));
  document.getElementById('lb-next')?.addEventListener('click', () => open((cur + 1) % images.length));
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft')  open((cur - 1 + images.length) % images.length);
    if (e.key === 'ArrowRight') open((cur + 1) % images.length);
  });

  function open(i) { cur = i; lbImg.src = images[i]; lb.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function close()  { lb.classList.remove('open'); document.body.style.overflow = ''; }
})();


const plannerForm = document.getElementById('planner-form');
if (plannerForm) {
  plannerForm.addEventListener('submit', e => {
    e.preventDefault();
    const budget = document.getElementById('p-budget')?.value || 'mid';
    const days   = parseInt(document.getElementById('p-days')?.value) || 3;
    const type   = document.getElementById('p-type')?.value || 'cultural';
    const result = document.getElementById('planner-result');
    if (!result) return;

    const plan = buildPlan(budget, days, type);
    result.innerHTML = `
      <h3 style="color:var(--gold);font-family:Poppins,sans-serif;font-size:1.15rem;margin-bottom:1.4rem;">
        <i class="fas fa-route"></i> Your ${days}-Day Jordan Itinerary
      </h3>
      ${plan.map((d, i) => `
        <div class="itin-day">
          <div class="itin-label">Day ${i + 1} — ${d.title}</div>
          <div class="itin-acts">${d.acts}</div>
        </div>`).join('')}
      <div style="margin-top:1.4rem;padding-top:1.4rem;border-top:1px solid rgba(212,175,55,.15);">
        <span style="color:rgba(255,255,255,.55);font-size:.83rem;">Estimated budget: </span>
        <span style="color:var(--gold);font-weight:700;">${budgetRange(budget, days)}</span>
      </div>`;
    result.classList.add('show');
    result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}

function buildPlan(budget, days, type) {
  const db = {
    cultural: [
      { title: 'Amman Heritage',       acts: '🏛️ Jordan Museum • 🕌 King Abdullah I Mosque • 🏰 Amman Citadel • 🎭 Roman Theatre • 🛍️ Downtown souks' },
      { title: 'Petra Ancient City',   acts: '🌹 Treasury (Al-Khazneh) • 🏛️ Royal Tombs • ⛪ Byzantine Church • 🏺 Petra Museum • 🌙 Petra by Night' },
      { title: 'Jerash & Umm Qais',    acts: '🏛️ Jerash Roman city • 🎭 Oval Plaza & Cardo • 🏺 Umm Qais ruins • 🌊 Sea of Galilee views' },
      { title: 'Madaba & Mount Nebo',  acts: '🗺️ Madaba mosaic map • ⛪ St. George Church • ⛰️ Mount Nebo • 🌅 Jordan Valley panorama' },
      { title: 'Karak & King\'s Hwy',  acts: '🏰 Karak Crusader Castle • 🏰 Shobak Castle • 🌄 King\'s Highway drive • 🍽️ Local Mansaf lunch' },
      { title: 'Aqaba History',        acts: '🏰 Aqaba Fort • 🏛️ Aqaba Museum • 🌊 Red Sea coast • 🐠 Glass-bottom boat tour' },
      { title: 'Wadi Rum & Bedouin',   acts: '🏜️ Bedouin camp experience • ☕ Traditional tea • 🐪 Camel ride • 🌟 Desert storytelling' },
    ],
    adventure: [
      { title: 'Wadi Rum Desert',      acts: '🌅 Sunrise jeep tour • 🧗 Rock climbing at Jebel Rum • 🏕️ Bedouin camp overnight • 🌠 Stargazing' },
      { title: 'Petra Exploration',    acts: '🏛️ Enter through the Siq • 🌹 Treasury visit • 🥾 Hike to the Monastery • 🌄 High Place of Sacrifice' },
      { title: 'Dead Sea & Aqaba',     acts: '🌊 Float in the Dead Sea • 💆 Mineral mud treatment • 🤿 Snorkeling in Aqaba • 🐠 Coral reef diving' },
      { title: 'Dana & Wadi Mujib',    acts: '🦅 Dana Reserve hike • 🌊 Wadi Mujib gorge walk • 🏞️ Siq Trail adventure • 🌿 Wildlife spotting' },
      { title: 'Jerash & Ajloun',      acts: '🏛️ Roman ruins of Jerash • 🏰 Ajloun Castle • 🌲 Ajloun Forest Reserve • 🦌 Nature walk' },
      { title: 'Azraq & Desert',       acts: '🏰 Azraq Wetland Reserve • 🦩 Bird watching • 🏜️ Desert castles tour • 🌅 Desert sunset' },
      { title: 'Amman City',           acts: '🏛️ Citadel & Roman Theatre • 🕌 King Abdullah Mosque • 🛍️ Rainbow Street • 🍽️ Mansaf dinner' },
    ],
    relaxation: [
      { title: 'Dead Sea Wellness',    acts: '🌊 Dead Sea float • 💆 Spa & mud treatment • 🏨 Luxury resort pool • 🌅 Sunset by the sea • 🍽️ Fine dining' },
      { title: 'Aqaba Beach',          acts: '🏖️ Red Sea beach day • 🤿 Snorkeling • 🛥️ Boat cruise • 🦞 Seafood dinner • 🌃 Aqaba waterfront' },
      { title: 'Amman Luxury',         acts: '🛍️ Abdali Boulevard • ☕ Specialty coffee in Jabal Amman • 💆 Hotel spa • 🍽️ Rooftop restaurant' },
      { title: 'Petra Leisurely',      acts: '🌹 Petra morning walk • 🏺 Petra Museum • 🍽️ Lunch at Basin Restaurant • 🌙 Petra by Night' },
      { title: 'Wadi Rum Glamping',    acts: '🏕️ Luxury desert camp • 🌅 Sunrise hot air balloon • 🐪 Camel ride • 🌠 Stargazing • 🍖 BBQ dinner' },
      { title: 'Dana Nature Retreat',  acts: '🌿 Dana village walk • 🦅 Bird watching • 🌄 Valley views • 🏡 Eco-lodge stay • 🌙 Peaceful evening' },
      { title: 'Ajloun Forest',        acts: '🌲 Forest walk • 🏰 Ajloun Castle • 🌿 Herbal tea • 🦌 Wildlife spotting • 🌅 Mountain sunset' },
    ],
  };
  return (db[type] || db.cultural).slice(0, Math.min(days, 7));
}

function budgetRange(b, d) {
  const r = { budget: [35, 55], mid: [80, 130], luxury: [200, 400] }[b] || [80, 130];
  return `${d * r[0]}–${d * r[1]} JOD`;
}


function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const isFloat = target % 1 !== 0;
    const dur = 2000, step = target / (dur / 16);
    let cur = 0;
    const t = setInterval(() => {
      cur += step;
      if (cur >= target) { cur = target; clearInterval(t); }
      el.textContent = (isFloat ? cur.toFixed(1) : Math.floor(cur).toLocaleString()) + suffix;
    }, 16);
  });
}
const statsEl = document.querySelector('.hero-stats');
if (statsEl) {
  new IntersectionObserver((entries, obs) => {
    if (entries[0].isIntersecting) { animateCounters(); obs.disconnect(); }
  }, { threshold: 0.5 }).observe(statsEl);
}


const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('[type="submit"]');
    btn.textContent = '✓ Message Sent!';
    btn.style.background = 'var(--teal)';
    btn.disabled = true;
    setTimeout(() => { btn.textContent = 'Send Message'; btn.style.background = ''; btn.disabled = false; contactForm.reset(); }, 3500);
  });
}
