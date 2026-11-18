// Small progressive enhancements. Without scripts every block is readable as plain content.
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Re-trigger a short enter transition (opacity + 8px) on a panel that was just shown.
function enter(el: HTMLElement) {
  if (reduce) return;
  el.classList.add("is-entering");
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.remove("is-entering")));
}

/* Mobile menu: full screen, closes by link, button or Esc; focus returns to the opener */
const menu = document.querySelector<HTMLElement>("[data-menu]");
const opener = document.querySelector<HTMLButtonElement>("[data-menu-open]");
if (menu && opener) {
  const closeBtn = menu.querySelector<HTMLButtonElement>("[data-menu-close]");
  const open = () => {
    menu.hidden = false;
    opener.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    enter(menu);
    menu.querySelector<HTMLElement>("a, button")?.focus();
  };
  const close = (returnFocus = true) => {
    menu.hidden = true;
    opener.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    if (returnFocus) opener.focus();
  };
  opener.addEventListener("click", open);
  closeBtn?.addEventListener("click", () => close());
  menu.querySelectorAll("[data-menu-link]").forEach((a) => a.addEventListener("click", () => close(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !menu.hidden) close();
  });
  menu.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;
    const items = [...menu.querySelectorAll<HTMLElement>('a[href], button, [tabindex="0"]')].filter((n) => n.offsetParent !== null);
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  window.matchMedia("(min-width: 76rem)").addEventListener("change", (m) => {
    if (m.matches && !menu.hidden) close(false);
  });
}

/* Directions: accordion on phones, list + one open panel on desktop */
const dirs = document.querySelector<HTMLElement>("[data-dirs]");
if (dirs) {
  const btns = [...dirs.querySelectorAll<HTMLButtonElement>("[data-dir-btn]")];
  const desktop = window.matchMedia("(min-width: 64rem)");
  const panelOf = (b: HTMLButtonElement) => document.getElementById(b.getAttribute("aria-controls") || "") as HTMLElement;
  const show = (target: HTMLButtonElement, toggle: boolean) => {
    const wasOpen = target.getAttribute("aria-expanded") === "true";
    btns.forEach((b) => {
      const on = b === target ? (toggle ? !wasOpen : true) : false;
      b.setAttribute("aria-expanded", String(on));
      const p = panelOf(b);
      const was = !p.hidden;
      p.hidden = !on;
      if (on && !was) enter(p);
    });
  };
  btns.forEach((b, i) => {
    panelOf(b).hidden = i !== 0;
    b.addEventListener("click", () => show(b, !desktop.matches));
    b.addEventListener("keydown", (e) => {
      if (!desktop.matches) return;
      const k = e.key;
      if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(k)) return;
      e.preventDefault();
      const n = k === "Home" ? 0 : k === "End" ? btns.length - 1 : (i + (k === "ArrowDown" ? 1 : -1) + btns.length) % btns.length;
      btns[n].focus();
      show(btns[n], false);
    });
  });
  desktop.addEventListener("change", (m) => {
    if (m.matches && !btns.some((b) => b.getAttribute("aria-expanded") === "true")) show(btns[0], false);
  });
}

/* Reviews: tabs by city */
const tablist = document.querySelector<HTMLElement>("[data-tabs]");
if (tablist) {
  const tabs = [...tablist.querySelectorAll<HTMLButtonElement>("[data-tab]")];
  const panels = tabs.map((t) => document.getElementById(t.getAttribute("aria-controls") || "") as HTMLElement);
  panels[0]?.parentElement?.classList.add("is-tabbed");
  tablist.hidden = false;
  const select = (i: number, focus = false) => {
    tabs.forEach((t, j) => {
      const on = j === i;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      const was = !panels[j].hidden;
      panels[j].hidden = !on;
      if (on && !was) enter(panels[j]);
    });
    if (focus) tabs[i].focus();
  };
  select(0);
  tabs.forEach((t, i) => {
    t.addEventListener("click", () => select(i));
    t.addEventListener("keydown", (e) => {
      const next = ["ArrowRight", "ArrowDown"].includes(e.key) ? 1 : ["ArrowLeft", "ArrowUp"].includes(e.key) ? -1 : 0;
      if (next) { e.preventDefault(); select((i + next + tabs.length) % tabs.length, true); }
      if (e.key === "Home") { e.preventDefault(); select(0, true); }
      if (e.key === "End") { e.preventDefault(); select(tabs.length - 1, true); }
    });
  });
}

/* Works: back / next buttons scroll the strip by one portrait */
const strip = document.querySelector<HTMLElement>("[data-works-strip]");
const controls = document.querySelector<HTMLElement>("[data-works-controls]");
if (strip && controls) {
  const back = controls.querySelector<HTMLButtonElement>("[data-works-back]");
  const next = controls.querySelector<HTMLButtonElement>("[data-works-next]");
  if (back && next) {
    const update = () => {
      back.disabled = strip.scrollLeft <= 4;
      next.disabled = strip.scrollLeft + strip.clientWidth >= strip.scrollWidth - 4;
    };
    const step = () => (strip.querySelector<HTMLElement>("li")?.offsetWidth || 300) + 24;
    back.addEventListener("click", () => strip.scrollBy({ left: -step(), behavior: reduce ? "auto" : "smooth" }));
    next.addEventListener("click", () => strip.scrollBy({ left: step(), behavior: reduce ? "auto" : "smooth" }));
    strip.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    controls.hidden = false;
    update();
  }
}

/* FutureLink on touch and keyboard: Enter or a tap shows the note for a moment */
document.querySelectorAll<HTMLElement>(".future-link").forEach((el) => {
  const flash = () => {
    el.classList.add("is-tapped");
    window.setTimeout(() => el.classList.remove("is-tapped"), 1800);
  };
  el.addEventListener("click", flash);
  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flash(); }
  });
});

/* Phone call bar: shows once the first screen has left the view */
const bar = document.querySelector<HTMLElement>("[data-callbar]");
const hero = document.getElementById("hero");
if (bar && hero && "IntersectionObserver" in window) {
  new IntersectionObserver(([e]) => bar.classList.toggle("is-hidden", e.isIntersecting), { threshold: 0 }).observe(hero);
}

/* Header: mark the anchor of the section in view */
const links = [...document.querySelectorAll<HTMLAnchorElement>(".site-header .nav a")];
if (links.length && "IntersectionObserver" in window) {
  const byId = new Map(links.map((a) => [a.hash.slice(1), a]));
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      links.forEach((a) => { a.classList.remove("is-current"); a.removeAttribute("aria-current"); });
      const a = byId.get(e.target.id);
      if (a) { a.classList.add("is-current"); a.setAttribute("aria-current", "location"); }
    }
  }, { rootMargin: "-45% 0px -50% 0px" });
  byId.forEach((_, id) => {
    const s = document.getElementById(id);
    if (s) io.observe(s);
  });
}
