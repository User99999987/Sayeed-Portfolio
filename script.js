const logoAssets = [
  "assets/logo.webp"
];

const portfolioAssets = [
  {
    title: "1",
    src: "assets/portfolio/work-01.webp",
    thumb: "assets/portfolio/work-01-thumb.webp",
    original: "Examples/198ef9c8-b79c-4fea-9261-ba391d242577.jpg",
    type: "image",
    category: "Graphics",
    width: 1280,
    height: 720
  },
  {
    title: "2",
    src: "assets/portfolio/work-02.webp",
    thumb: "assets/portfolio/work-02-thumb.webp",
    original: "Examples/8657599.jpg",
    type: "image",
    category: "Artwork",
    width: 2560,
    height: 1440
  },
  {
    title: "3",
    src: "assets/portfolio/work-03.webp",
    thumb: "assets/portfolio/work-03-thumb.webp",
    original: "Examples/Anime-banner.jpg",
    type: "image",
    category: "Banners",
    width: 3000,
    height: 1000
  },
  {
    title: "4",
    src: "assets/portfolio/work-04.webp",
    thumb: "assets/portfolio/work-04-thumb.webp",
    original: "Examples/drdf4ll.jpg",
    type: "image",
    category: "Banners",
    width: 3000,
    height: 1000
  },
  {
    title: "5",
    src: "assets/portfolio/work-05.webp",
    thumb: "assets/portfolio/work-05-thumb.webp",
    original: "Examples/Eazy-Header.jpg",
    type: "image",
    category: "Banners",
    width: 3000,
    height: 1000
  },
  {
    title: "6",
    src: "assets/portfolio/work-06.webp",
    thumb: "assets/portfolio/work-06-thumb.webp",
    original: "Examples/EMINEMHEADER.jpg",
    type: "image",
    category: "Banners",
    width: 6000,
    height: 2000
  },
  {
    title: "7",
    src: "assets/portfolio/work-07.webp",
    thumb: "assets/portfolio/work-07-thumb.webp",
    original: "Examples/fortnite thumbnail.jpg",
    type: "image",
    category: "Graphics",
    width: 1920,
    height: 1080
  },
  {
    title: "8",
    src: "assets/portfolio/work-08.webp",
    thumb: "assets/portfolio/work-08-thumb.webp",
    original: "Examples/LILTJAYHEADER.jpg",
    type: "image",
    category: "Banners",
    width: 6000,
    height: 2000
  },
  {
    title: "9",
    src: "assets/portfolio/work-09.webp",
    thumb: "assets/portfolio/work-09-thumb.webp",
    original: "Examples/Nike Hoodie Banner.jpg",
    type: "image",
    category: "Banners",
    width: 1366,
    height: 768
  },
  {
    title: "10",
    src: "assets/portfolio/work-10.webp",
    thumb: "assets/portfolio/work-10-thumb.webp",
    original: "Examples/Podcast thumbnail.jpg",
    type: "image",
    category: "Graphics",
    width: 1920,
    height: 1080
  },
  {
    title: "11",
    src: "assets/portfolio/work-11.webp",
    thumb: "assets/portfolio/work-11-thumb.webp",
    original: "Examples/Web Banner.jpg",
    type: "image",
    category: "Banners",
    width: 1920,
    height: 720
  }
];

const filters = ["All", "Banners", "Artwork", "Graphics"];
const services = [
  "Banner Design",
  "Logo Design",
  "Artwork Creation",
  "Thumbnail Design",
  "Header Design",
  "Poster Design",
  "Social Media Graphics",
  "Brand Identity"
];
const skills = [
  ["Photoshop", 95],
  ["GFX Artist", 96],
  ["Banner Design", 94],
  ["Logo Design", 88],
  ["Thumbnail Design", 92],
  ["Artwork Creation", 90],
  ["Social Media Graphics", 91],
  ["Branding", 86]
];
const socials = [
  ["Guns", "target", "https://guns.lol/drdfull"],
  ["Roblox", "cube", "https://www.roblox.com/users/5259060734/profile"],
  ["Twitch", "screen", "https://www.twitch.tv/arxluci"],
  ["Patreon", "spark", "https://www.patreon.com/cw/drdfull"],
  ["Tellonym", "chat", "https://tellonym.me/drdfull/anythingu"],
  ["Discord", "wave", "http://discord.com/users/646834375144505364"]
];

let activeFilter = "All";
let visibleItems = [...portfolioAssets];
let lightboxIndex = 0;

const bestLogo = logoAssets[0];
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function qs(selector, scope = document) {
  return scope.querySelector(selector);
}

function qsa(selector, scope = document) {
  return [...scope.querySelectorAll(selector)];
}

function setLogos() {
  ["loaderLogo", "navLogo", "heroLogo", "footerLogo"].forEach((id) => {
    const element = document.getElementById(id);
    if (element) element.src = bestLogo;
  });
}

function titleFromCategory(category) {
  if (category === "Banners") return "Banner";
  if (category === "Graphics") return "Graphic";
  if (category === "Logos") return "Logo";
  return category;
}

function renderServices() {
  const grid = qs("#servicesGrid");
  grid.innerHTML = services.map((service, index) => `
    <article class="service-card reveal spotlight-card">
      <span class="service-icon">${String(index + 1).padStart(2, "0")}</span>
      <h3>${service}</h3>
      <p>Clean composition, sharp detail, and premium GFX presentation.</p>
    </article>
  `).join("");
}

function renderFilters() {
  qs("#filterBar").innerHTML = filters.map((filter) => `
    <button class="filter-btn magnetic ${filter === activeFilter ? "active" : ""}" type="button" data-filter="${filter}">${filter}</button>
  `).join("");

  qsa(".filter-btn").forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      qsa(".filter-btn").forEach((btn) => btn.classList.toggle("active", btn === button));
      renderPortfolio();
    });
  });
}

function itemMatchesFilter(item) {
  if (activeFilter === "All") return true;
  return item.category === activeFilter;
}

function renderPortfolio() {
  const grid = qs("#portfolioGrid");
  visibleItems = portfolioAssets.filter(itemMatchesFilter);
  qs("#emptyState").classList.toggle("visible", visibleItems.length === 0);

  grid.innerHTML = visibleItems.map((item, index) => `
    <article class="portfolio-card spotlight-card" data-index="${index}" tabindex="0" role="button" aria-label="Open artwork ${item.title}">
      <div class="portfolio-button">
        <div class="portfolio-media">
          <img src="${item.thumb}" alt="Artwork ${item.title}" loading="lazy" width="${item.width}" height="${item.height}">
        </div>
        <div class="portfolio-info">
          <h3>${item.title}</h3>
          <span>${item.category}</span>
        </div>
      </div>
    </article>
  `).join("");

  qsa(".portfolio-card", grid).forEach((card) => {
    card.addEventListener("click", () => openLightbox(Number(card.dataset.index)));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(Number(card.dataset.index));
      }
    });
  });

  requestAnimationFrame(() => {
    qsa(".portfolio-card", grid).forEach((card, index) => {
      setTimeout(() => card.classList.add("show"), index * 55);
    });
  });

  attachSpotlights();
  attachDepthEffects();
}

function renderFeatured() {
  const featured = [...portfolioAssets]
    .sort((a, b) => (b.width * b.height) - (a.width * a.height))
    .slice(0, 4);

  qs("#featuredGrid").innerHTML = featured.map((item) => `
    <article class="featured-card spotlight-card">
      <img src="${item.src}" alt="Featured artwork ${item.title}" loading="lazy">
      <div class="featured-overlay">
        <h3>${item.title}</h3>
        <p>${titleFromCategory(item.category)} showcase</p>
      </div>
    </article>
  `).join("");
}

function renderSkills() {
  qs("#skillsGrid").innerHTML = skills.map(([name, value]) => `
    <article class="skill-card spotlight-card">
      <div class="skill-head">
        <strong>${name}</strong>
        <span>${value}%</span>
      </div>
      <div class="skill-track">
        <div class="skill-fill" data-width="${value}"></div>
      </div>
    </article>
  `).join("");
}

function renderSocials() {
  qs("#socialGrid").innerHTML = socials.map(([name, icon, url]) => `
    <a class="social-link magnetic" href="${url}" target="_blank" rel="noopener noreferrer">
      <span class="social-icon">${getIcon(icon)}</span>
      <span>${name}</span>
    </a>
  `).join("");
}

function getIcon(name) {
  const icons = {
    target: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"></circle><circle cx="12" cy="12" r="3"></circle><path d="M12 2v3M12 19v3M2 12h3M19 12h3"></path></svg>`,
    cube: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z"></path><path d="M12 12l8-4.5M12 12v9M12 12L4 7.5"></path></svg>`,
    screen: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="12" rx="2"></rect><path d="M9 21h6M12 17v4"></path></svg>`,
    spark: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2.2 7.1L21 12l-6.8 2.9L12 22l-2.2-7.1L3 12l6.8-2.9L12 2z"></path></svg>`,
    chat: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v11H8l-4 4V5z"></path><path d="M8 9h8M8 13h5"></path></svg>`,
    wave: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 14c2.2-5.4 5.1-5.4 7.2 0 1.3 3.2 3.3 3.2 4.6 0 1.2-3 2.6-4.4 4.2-4.2"></path><path d="M5 18c2.2 2 5.1 2 7.1 0 1.7-1.7 3.9-1.7 5.9 0"></path></svg>`
  };

  return icons[name] || icons.spark;
}

function openLightbox(index) {
  if (!visibleItems.length) return;
  lightboxIndex = index;
  const item = visibleItems[lightboxIndex];
  const media = `<img src="${item.src}" alt="Artwork ${item.title}">`;

  qs("#lightboxContent").innerHTML = `${media}<div class="lightbox-caption">${item.title}</div>`;
  const lightbox = qs("#lightbox");
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  lightbox.scrollTop = 0;
  document.body.classList.add("lightbox-open");
}

function closeLightbox() {
  qs("#lightbox").classList.remove("open");
  qs("#lightbox").setAttribute("aria-hidden", "true");
  qs("#lightboxContent").innerHTML = "";
  document.body.classList.remove("lightbox-open");
}

function moveLightbox(direction) {
  if (!visibleItems.length) return;
  lightboxIndex = (lightboxIndex + direction + visibleItems.length) % visibleItems.length;
  openLightbox(lightboxIndex);
}

function setupLightbox() {
  qs("#lightboxClose").addEventListener("click", closeLightbox);
  qs("#lightboxPrev").addEventListener("click", () => moveLightbox(-1));
  qs("#lightboxNext").addEventListener("click", () => moveLightbox(1));
  qs("#lightbox").addEventListener("click", (event) => {
    if (event.target.id === "lightbox") closeLightbox();
  });

  window.addEventListener("keydown", (event) => {
    if (!qs("#lightbox").classList.contains("open")) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") moveLightbox(-1);
    if (event.key === "ArrowRight") moveLightbox(1);
  });
}

function setupReveals() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");

      if (entry.target.id === "skillsGrid" || entry.target.closest("#skills")) {
        qsa(".skill-fill").forEach((fill) => {
          fill.style.width = `${fill.dataset.width}%`;
        });
      }

      observer.unobserve(entry.target);
    });
  }, { threshold: 0.16 });

  qsa(".reveal").forEach((element) => observer.observe(element));
}

function setupCounters() {
  const counters = qsa("[data-count]");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const counter = entry.target;
      const target = Number(counter.dataset.count);
      const duration = prefersReducedMotion ? 1 : 1400;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = `${Math.round(target * eased)}+`;
        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
      observer.unobserve(counter);
    });
  }, { threshold: 0.7 });

  counters.forEach((counter) => observer.observe(counter));
}

function setupProgress() {
  const progress = qs(".scroll-progress");
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = max <= 0 ? "0%" : `${(window.scrollY / max) * 100}%`;
  };
  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
}

function attachSpotlights() {
  qsa(".spotlight-card").forEach((card) => {
    if (card.dataset.spotlightReady === "true") return;
    card.dataset.spotlightReady = "true";

    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
      card.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
    });
  });
}

function attachDepthEffects() {
  if (prefersReducedMotion || !window.matchMedia("(pointer: fine)").matches) return;

  const tiltSelector = ".spotlight-card:not(.portfolio-card)";
  const clickSelector = ".spotlight-card, .btn, .filter-btn, .social-link";

  qsa(tiltSelector).forEach((card) => {
    if (card.dataset.depthReady === "true") return;
    card.dataset.depthReady = "true";
    card.classList.add("tilt-card");

    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty("--tilt-x", `${(-y * 8).toFixed(2)}deg`);
      card.style.setProperty("--tilt-y", `${(x * 10).toFixed(2)}deg`);
      card.classList.add("is-tilting");
    });

    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
      card.classList.remove("is-tilting");
    });
  });

  qsa(clickSelector).forEach((element) => {
    if (element.dataset.clickReady === "true") return;
    element.dataset.clickReady = "true";

    element.addEventListener("pointerdown", (event) => {
      const rect = element.getBoundingClientRect();
      element.style.setProperty("--ripple-x", `${event.clientX - rect.left}px`);
      element.style.setProperty("--ripple-y", `${event.clientY - rect.top}px`);
      element.classList.remove("is-clicking");
      void element.offsetWidth;
      element.classList.add("is-clicking");
      window.setTimeout(() => element.classList.remove("is-clicking"), 650);
    });
  });
}

function setupMenu() {
  const toggle = qs("#menuToggle");
  toggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("menu-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  qsa(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("menu-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setupLoader() {
  window.addEventListener("load", () => {
    setTimeout(() => qs("#loader").classList.add("hidden"), 520);
  });
}

function verifyAssetLoading() {
  [...logoAssets, ...portfolioAssets.slice(0, 4).map((item) => item.thumb)].forEach((src) => {
    const probe = document.createElement("link");
    probe.rel = "preload";
    probe.as = "image";
    probe.href = src;
    document.head.appendChild(probe);
  });
}

function init() {
  setLogos();
  renderServices();
  renderFilters();
  renderPortfolio();
  renderFeatured();
  renderSkills();
  renderSocials();
  setupLightbox();
  setupReveals();
  setupCounters();
  setupProgress();
  setupMenu();
  setupLoader();
  verifyAssetLoading();
  attachSpotlights();
  attachDepthEffects();
  qs("#year").textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", init);
