"use strict";
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const fine = matchMedia("(hover:hover) and (pointer:fine)").matches;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ===== EDIT YOUR CONTENT HERE ===== */
const SKILLS = [
  { name: "Frontend", icon: "M4 6h16M4 12h10M4 18h16", items: ["HTML", "CSS", "JavaScript", "React"] },
  { name: "Backend", icon: "M4 5h16v5H4zM4 14h16v5H4z", items: ["Node.js", "Express.js", "MongoDB"] },
  { name: "Programming", icon: "M8 8l-4 4 4 4M16 8l4 4-4 4", items: ["Python", "C/C++"] },
  { name: "Tools", icon: "M14 6l4 4-8 8H6v-4z", items: ["Git", "GitHub", "VS Code"] },
  { name: "Cybersecurity", icon: "M12 3l8 3v6c0 5-3.5 8-8 9-4.500-1-8-4-8-9V6z", items: ["Web Security", "Networking", "Ethical Hacking", "CTF learning"] },
  { name: "AI", icon: "M12 4v4M12 16v4M4 12h4M16 12h4M9 9h6v6H9z", items: ["AI", "Machine Learning"], soon: ["Future AI/ML projects"] }
];
// Add your links/images: github, demo (leave "" to show "Coming soon"), and image (path such as "assets/p1.png")
const PROJECTS = [
  { name: "HackCBS Project", short: "Our HackCBS 9.0 build with team ZERO TRACE.", stack: ["JavaScript", "React", "Node.js"],
    github: "", demo: "", image: "assets/project1.png",
    study: { Problem: "Describe the problem you are solving.", Idea: "Describe the core idea.", Solution: "Explain what you built.",
      Architecture: "Frontend → API → Database. Update with your real design.", "Key features": "List 3 to 4 real features.",
      Challenges: "What was hard during the hackathon?", "What I learned": "Add your real takeaways." } },
  { name: "Cybersecurity Tool", short: "A security learning project built in Python.", stack: ["Python", "Security", "Networking"],
    github: "", demo: "", image: "",
    study: { Problem: "Describe the security concept you explored.", Idea: "Describe the approach.", Solution: "Explain what the tool does.",
      Architecture: "Describe how the pieces connect.", "Key features": "List real features.",
      Challenges: "Add real challenges.", "What I learned": "Add real takeaways." } },
  { name: "Full-Stack Application", short: "A web app with frontend, backend, database and authentication.", stack: ["React", "Express", "MongoDB"],
    github: "", demo: "", image: "",
    study: { Problem: "Describe the user problem.", Idea: "Describe the idea.", Solution: "Explain the app.",
      Architecture: "React client → Express API → MongoDB.", "Key features": "List real features.",
      Challenges: "Add real challenges.", "What I learned": "Add real takeaways." } }
];
const HERO_LINES = [
  ["c", "$ whoami"], ["", "makarab-hussain-shah"], ["c", "$ cat stack.txt"], ["", "react · node · express · mongodb · python"],
  ["c", "$ focus --now"], ["ok", "full-stack · cybersecurity · ai/ml"], ["c", "$ team"], ["ok", "ZERO TRACE @ HackCBS 9.0"]
];
const SEC_LINES = [
  ["c", "$ learn --topic web-security"], ["", "owasp top 10, input validation, auth"], ["c", "$ practice --scope owned-labs"],
  ["", "ctf challenges, permitted targets only"], ["c", "$ study networking"], ["", "http, dns, tls, ports"], ["ok", "status: learning, ethically"]
];

/* ===== RENDER ===== */
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const chips = list => list.map(t => `<span>${esc(t)}</span>`).join("");

$("#skillGrid").innerHTML = SKILLS.map(s => `
  <article class="sk glass rv" data-tilt>
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="${s.icon}"/></svg>
    <h3>${esc(s.name)}</h3>
    <div class="chips">${chips(s.items)}${(s.soon || []).map(t => `<span class="soon">${esc(t)}</span>`).join("")}</div>
  </article>`).join("");

$("#projectGrid").innerHTML = PROJECTS.map((p, i) => `
  <button class="pj glass rv" data-tilt data-i="${i}" aria-haspopup="dialog">
    <div class="pv" ${p.image ? `style="background:url('${esc(p.image)}') center/cover"` : ""}><span>${p.image ? "" : "preview coming soon"}</span></div>
    <div class="pb"><h3>${esc(p.name)}</h3><p>${esc(p.short)}</p><div class="chips">${chips(p.stack)}</div><span class="more">Open case study</span></div>
  </button>`).join("");

const modal = $("#modal");
const linkBtn = (label, url, cls) => url
  ? `<a class="btn ${cls}" href="${esc(url)}" target="_blank" rel="noopener">${label}</a>`
  : `<span class="btn g" aria-disabled="true" style="opacity:.5">${label}: coming soon</span>`;

$("#projectGrid").addEventListener("click", e => {
  const card = e.target.closest(".pj");
  if (!card) return;
  const p = PROJECTS[card.dataset.i];
  const rows = Object.entries(p.study).map(([k, v]) => `<div><h4>${esc(k)}</h4><p>${esc(v)}</p></div>`).join("");
  modal.innerHTML = `
    <div class="mh"><h3 id="mTitle">${esc(p.name)}</h3><button class="x" aria-label="Close case study">✕</button></div>
    <div class="cs"><div><h4>Technology</h4><div class="chips">${chips(p.stack)}</div></div>${rows}</div>
    <div class="mf">${linkBtn("GitHub", p.github, "s")}${linkBtn("Live demo", p.demo, "p")}</div>`;
  modal.showModal();
});
modal.addEventListener("click", e => { if (e.target === modal || e.target.closest(".x")) modal.close(); });

/* ===== TERMINAL TYPING ===== */
function typeLines(el, lines, speed = 22) {
  const out = lines.map(([c, t]) => `<span class="${c}">${esc(t)}</span>`);
  if (reduced) { el.innerHTML = out.join("\n"); return; }
  let li = 0, ci = 0, html = "";
  (function tick() {
    if (li >= lines.length) return;
    const [c, t] = lines[li];
    ci++;
    el.innerHTML = html + `<span class="${c}">${esc(t.slice(0, ci))}</span>`;
    if (ci >= t.length) { html += out[li] + "\n"; li++; ci = 0; setTimeout(tick, 260); }
    else setTimeout(tick, speed);
  })();
}
$("#heroTerm").classList.remove("caret");
const secTerm = $("#secTerm");
new IntersectionObserver((en, ob) => { if (en[0].isIntersecting) { typeLines(secTerm, SEC_LINES); ob.disconnect(); } }, { threshold: .4 }).observe(secTerm);

/* ===== LOADER, REVEAL, NAV ===== */
addEventListener("load", () => setTimeout(() => {
  $("#loader").classList.add("done");
  typeLines($("#heroTerm"), HERO_LINES);
}, reduced ? 0 : 900));

const revealer = new IntersectionObserver(en => en.forEach(x => { if (x.isIntersecting) { x.target.classList.add("in"); revealer.unobserve(x.target); } }), { threshold: .12 });
$$(".rv").forEach(el => revealer.observe(el));

const links = $$("nav a");
const spy = new IntersectionObserver(en => en.forEach(x => {
  if (!x.isIntersecting) return;
  links.forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + x.target.id));
}), { rootMargin: "-45% 0px -50% 0px" });
$$("main section[id]").forEach(s => spy.observe(s));

const burger = $(".burger"), menu = $("#menu");
const setMenu = open => { menu.classList.toggle("open", open); burger.setAttribute("aria-expanded", open); };
burger.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
links.forEach(a => a.addEventListener("click", () => setMenu(false)));
addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });

/* ===== PLACEHOLDER LINKS ===== */
$$("[data-todo]").forEach(a => a.addEventListener("click", e => e.preventDefault()));

/* ===== CONTACT FORM (opens the visitor's email app; swap for Formspree if you want) ===== */
$("#form").addEventListener("submit", e => {
  e.preventDefault();
  const f = new FormData(e.target);
  const body = `${f.get("msg")}\n\nFrom: ${f.get("name")} (${f.get("email")})`;
  location.href = `mailto:sayedbukhari511@gmail.com?subject=${encodeURIComponent("Portfolio message from " + f.get("name"))}&body=${encodeURIComponent(body)}`;
});

/* ===== 3D TILT + MAGNETIC BUTTONS + CURSOR (desktop only) ===== */
if (fine && !reduced) {
  document.body.classList.add("has-cur");
  $$("[data-tilt]").forEach(el => {
    el.addEventListener("pointermove", e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      el.style.transform = `perspective(800px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateY(-4px)`;
    });
    el.addEventListener("pointerleave", () => { el.style.transform = ""; });
  });
  $$(".btn").forEach(b => {
    b.addEventListener("pointermove", e => {
      const r = b.getBoundingClientRect();
      b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .25}px,${(e.clientY - r.top - r.height / 2) * .35}px)`;
    });
    b.addEventListener("pointerleave", () => { b.style.transform = ""; });
  });
  const ring = $(".cur"), dot = $(".cur-dot");
  let mx = 0, my = 0, rx = 0, ry = 0;
  addEventListener("pointermove", e => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate(${mx}px,${my}px)`; });
  (function follow() { rx += (mx - rx) * .16; ry += (my - ry) * .16; ring.style.transform = `translate(${rx}px,${ry}px)`; requestAnimationFrame(follow); })();
  document.addEventListener("pointerover", e => ring.classList.toggle("big", !!e.target.closest("a,button,[data-tilt],input,textarea")));
}

/* ===== 3D PARTICLE FIELD (canvas, pauses when tab is hidden) ===== */
(function particles() {
  const cv = $("#bg"), ctx = cv.getContext("2d");
  const DEPTH = 1000, COUNT = innerWidth < 700 ? 90 : 220;
  let w, h, dpr, px = 0, py = 0, tx = 0, ty = 0, raf;
  const pts = Array.from({ length: COUNT }, () => ({ x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, z: Math.random() * DEPTH, s: Math.random() * 1.4 + .4 }));
  function size() { dpr = Math.min(devicePixelRatio || 1, 2); w = cv.width = innerWidth * dpr; h = cv.height = innerHeight * dpr; }
  size(); addEventListener("resize", size);
  addEventListener("pointermove", e => { tx = e.clientX / innerWidth - .5; ty = e.clientY / innerHeight - .5; });
  function frame() {
    px += (tx - px) * .05; py += (ty - py) * .05;
    ctx.clearRect(0, 0, w, h);
    for (const p of pts) {
      if (!reduced) p.z -= p.s * .8;
      if (p.z < 1) { p.z = DEPTH; p.x = Math.random() * 2 - 1; p.y = Math.random() * 2 - 1; }
      const k = DEPTH / (DEPTH * 1.6 - p.z + 200);
      const x = w / 2 + (p.x * w * .6 - px * 160) * k * 1.6, y = h / 2 + (p.y * h * .6 - py * 160) * k * 1.6;
      ctx.globalAlpha = Math.min(1, (1 - p.z / DEPTH) * 1.2 + .1) * .7;
      ctx.fillStyle = p.s > 1.4 ? "#00e5ff" : "#7fb2ff";
      ctx.beginPath(); ctx.arc(x, y, p.s * k * 2 * dpr, 0, 6.283); ctx.fill();
    }
    raf = requestAnimationFrame(frame);
  }
  frame();
  document.addEventListener("visibilitychange", () => { cancelAnimationFrame(raf); if (!document.hidden) frame(); });
})();
