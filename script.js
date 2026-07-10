// ============================================
//   Kathi Varshith – Portfolio Scripts
//   Add new JS interactions here
// ============================================

document.querySelectorAll('a[href^="mailto:"]').forEach(function(a){
  a.addEventListener("click",function(e){
    e.preventDefault();
    window.open(a.href,"_blank");
  });
});

// ── Smooth active nav highlight ──
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute("id");
  });
  navLinks.forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + current);
  });
});

// ── Scroll progress bar ──
const scrollProgress = document.getElementById("scrollProgress");
window.addEventListener("scroll", () => {
  if (!scrollProgress) return;
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  scrollProgress.style.width = scrolled + "%";
});

// ── Mobile nav toggle ──
(function () {
  const toggle = document.getElementById("navToggle");
  const panel = document.getElementById("navMobilePanel");
  if (!toggle || !panel) return;
  toggle.addEventListener("click", () => {
    const isOpen = panel.classList.toggle("open");
    toggle.classList.toggle("active", isOpen);
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    document.body.style.overflow = isOpen ? "hidden" : "";
  });
  panel.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      panel.classList.remove("open");
      toggle.classList.remove("active");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });
})();

// ── Fade-in on scroll ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = "1";
      e.target.style.transform = "translateY(0)";
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(".skill-card, .project-card, .exp-card, .cert-card, .stat-box").forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  observer.observe(el);
});

// ── Certificate lightbox ──
(function () {
  const lightbox = document.getElementById("certLightbox");
  const lightboxImg = document.getElementById("certLightboxImg");
  const lightboxCaption = document.getElementById("certLightboxCaption");
  const closeBtn = document.getElementById("certLightboxClose");
  if (!lightbox) return;

  function openLightbox(src, name) {
    lightboxImg.src = src;
    lightboxImg.alt = name || "Certificate";
    lightboxCaption.textContent = name || "";
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".cert-view-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".cert-card");
      if (!card) return;
      openLightbox(card.getAttribute("data-cert"), card.getAttribute("data-name"));
    });
  });

  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
})();
