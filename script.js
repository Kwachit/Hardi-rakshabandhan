const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

const progress = $(".progress-thread span");
window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.height = `${Math.min(100, (scrollY / max) * 100)}%`;
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("visible");
  });
}, {threshold: .12});
$$(".reveal").forEach(el => observer.observe(el));

const envelope = $("#envelope");
envelope.addEventListener("click", () => {
  envelope.classList.toggle("open");
  $("#letterContent").classList.toggle("show", envelope.classList.contains("open"));
});

const tieBtn = $("#tieBtn");
tieBtn.addEventListener("click", () => {
  const stage = $("#rakhiStage");
  stage.classList.add("tied");
  $("#successMessage").classList.add("show");
  tieBtn.textContent = "❤️ Hardi tied it!";
  tieBtn.disabled = true;

  for (let i = 0; i < 28; i++) {
    const s = document.createElement("span");
    s.className = "spark";
    s.textContent = i % 3 === 0 ? "✦" : "•";
    s.style.left = "50%";
    s.style.top = "50%";
    s.style.setProperty("--x", `${Math.cos(i / 28 * Math.PI * 2) * (80 + Math.random()*100)}px`);
    s.style.setProperty("--y", `${Math.sin(i / 28 * Math.PI * 2) * (50 + Math.random()*80)}px`);
    stage.querySelector(".sparkles").appendChild(s);
    setTimeout(() => s.remove(), 1300);
  }
});

const giftBox = $("#giftBox");
giftBox.addEventListener("click", () => {
  giftBox.style.transform = "translateY(-8px) scale(.8)";
  $("#giftReveal").classList.add("show");
  setTimeout(() => giftBox.style.display = "none", 400);
});

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting || entry.target.dataset.done) return;
    entry.target.dataset.done = "1";
    const el = entry.target.querySelector("strong");
    const target = el.dataset.count;
    if (target === "∞") {
      el.textContent = "∞";
      return;
    }
    let n = 0;
    const end = Number(target);
    const step = Math.max(1, Math.ceil(end / 40));
    const timer = setInterval(() => {
      n = Math.min(end, n + step);
      el.textContent = n;
      if (n >= end) clearInterval(timer);
    }, 25);
  });
}, {threshold: .5});
$$(".stat").forEach(el => statObserver.observe(el));
