const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const navToggle = document.querySelector('.nav-toggle');
const primaryNav = document.querySelector('.primary-nav');
const siteHeader = document.querySelector('.site-header');

if (navToggle && primaryNav) {
  navToggle.addEventListener('click', () => {
    const open = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!open));
    primaryNav.classList.toggle('is-open', !open);
  });

  primaryNav.addEventListener('click', (event) => {
    if (event.target.closest('a, button')) {
      navToggle.setAttribute('aria-expanded', 'false');
      primaryNav.classList.remove('is-open');
    }
  });
}

const descriptions = [
  {
    title: '工业数据集质量评测',
    body: '接入与解析标准化、数据质量评测、标注评测、统计分析、评分报告与数据卡。问题清单关联具体文件、行号或样本标识；涉敏问题交由安全平台作出安全判定。'
  },
  {
    title: '工业大模型可靠性评测',
    body: '评测集与资料管理、模型接入、输出与证据核查、抗干扰与一致性测试、越权诱导测试、性能压测及评分报告。以“结论、证据、置信度”三件套统一记录模型输出。'
  },
  {
    title: '工业智能体测试',
    body: '任务与判据管理、批量执行、业务结果核验、多智能体协同评测及过程报告。支持结构化匹配、数值容差、业务状态检查与人工量表，核验实际业务效果。'
  },
  {
    title: 'AI 应用安全评测',
    body: '覆盖数据安全、模型输入输出安全、智能体执行安全及跨平台交接。按 S1 至 S5 分项报告，输出绑定对象、版本、任务范围和规则版本的安全门控 G_safe；未判定时不放行。'
  }
];

const dialog = document.querySelector('#detail-dialog');
const dialogTitle = document.querySelector('#dialog-title');
const dialogBody = document.querySelector('#dialog-body');

function openDialog(title, body) {
  if (!dialog || !dialogTitle || !dialogBody) return;
  dialogTitle.textContent = title;
  dialogBody.textContent = body;
  if (typeof dialog.showModal === 'function') dialog.showModal();
}

document.querySelectorAll('[data-detail-index]').forEach((button) => {
  button.addEventListener('click', () => {
    const item = descriptions[Number(button.dataset.detailIndex)];
    if (item) openDialog(item.title, item.body);
  });
});



const drawer = document.querySelector('#platform-drawer');
const drawerToggle = document.querySelector('.drawer-toggle');
const drawerLabel = drawerToggle?.querySelector('.visually-hidden');

function setDrawerOpen(open) {
  if (!drawer || !drawerToggle) return;
  drawer.dataset.open = String(open);
  drawer.setAttribute('aria-hidden', String(!open));
  drawer.inert = !open;
  drawerToggle.setAttribute('aria-expanded', String(open));
  if (drawerLabel) drawerLabel.textContent = open ? '收起平台列表' : '展开平台列表';
}

if (drawer && drawerToggle) {
  setDrawerOpen(true);
  drawerToggle.addEventListener('click', () => {
    setDrawerOpen(drawer.dataset.open !== 'true');
  });
}

if (dialog) {
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
}

const title = document.querySelector('.type-title');
const typedText = document.querySelector('.typed-text');
const typingToggle = document.querySelector('.typing-toggle');
const firstLine = '让工业智能的每一步，';
const secondLine = '都有据可验。';
const fullTitle = firstLine + secondLine;
let titleLength = fullTitle.length;
let deleting = false;
let paused = false;
let typingTimer;

function renderTitle(length) {
  if (!typedText) return;
  if (length <= firstLine.length) {
    typedText.textContent = firstLine.slice(0, length);
    return;
  }
  typedText.innerHTML = `${firstLine}<br>${secondLine.slice(0, length - firstLine.length)}`;
}

function scheduleTitle(delay) {
  window.clearTimeout(typingTimer);
  if (paused || reducedMotion.matches) return;
  typingTimer = window.setTimeout(typeTick, delay);
}

function typeTick() {
  if (paused || reducedMotion.matches) return;
  if (!deleting) {
    if (titleLength < fullTitle.length) {
      titleLength += 1;
      renderTitle(titleLength);
      scheduleTitle(72);
      return;
    }
    deleting = true;
    scheduleTitle(1800);
    return;
  }
  if (titleLength > 0) {
    titleLength -= 1;
    renderTitle(titleLength);
    scheduleTitle(38);
    return;
  }
  deleting = false;
  scheduleTitle(520);
}

if (title && typedText && typingToggle) {
  if (reducedMotion.matches) {
    typedText.innerHTML = `${firstLine}<br>${secondLine}`;
    titleLength = fullTitle.length;
    typingToggle.hidden = true;
  } else {
    typedText.textContent = '';
    renderTitle(0);
    scheduleTitle(700);
    typingToggle.addEventListener('click', () => {
      paused = !paused;
      typingToggle.setAttribute('aria-pressed', String(paused));
      typingToggle.textContent = paused ? '继续标题' : '暂停标题';
      title.classList.toggle('is-paused', paused);
      if (paused) window.clearTimeout(typingTimer);
      else scheduleTitle(120);
    });
  }
}

const pointerSurfaces = document.querySelectorAll('[data-glass], [data-spotlight]');
pointerSurfaces.forEach((surface) => {
  surface.addEventListener('pointermove', (event) => {
    const rect = surface.getBoundingClientRect();
    surface.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`);
    surface.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`);
  });
  surface.addEventListener('pointerleave', () => {
    surface.style.removeProperty('--pointer-x');
    surface.style.removeProperty('--pointer-y');
  });
});

const snapSections = [...document.querySelectorAll('[data-snap-section]')];
const snapEnabled = window.matchMedia('(min-width: 60rem) and (pointer: fine)');
const headerOffset = () => (siteHeader ? siteHeader.offsetHeight : 0) + 16;
let lastScrollY = window.scrollY;
let transitioning = false;
let wheelLockedUntil = 0;
let scrollFrame = 0;
let scrollDirection = 0;
let fadeTimer = 0;

function setHeaderHidden(hidden) {
  if (!siteHeader) return;
  if (!hidden || window.scrollY < 72 || primaryNav?.classList.contains('is-open')) {
    siteHeader.classList.remove('is-hidden');
  } else {
    siteHeader.classList.add('is-hidden');
  }
}

function snapPlan() {
  const viewport = window.innerHeight;
  const offset = headerOffset();
  const plan = [];
  snapSections.forEach((section, index) => {
    const top = section.getBoundingClientRect().top + window.scrollY;
    const height = section.offsetHeight;
    plan.push({ top: index === 0 ? 0 : Math.max(0, top - offset), section });
    if (height > viewport * 0.9) {
      const step = Math.round(viewport * 0.72);
      for (let y = top + step; y < top + height - viewport * 0.28; y += step) {
        plan.push({ top: Math.max(0, y - offset), section });
      }
    }
  });
  const maxScroll = Math.max(0, document.documentElement.scrollHeight - viewport);
  if (snapSections.length) plan.push({ top: maxScroll, section: snapSections[snapSections.length - 1] });
  const sorted = plan.sort((a, b) => a.top - b.top);
  const unique = [];
  sorted.forEach((item) => {
    const duplicate = unique.find((existing) => Math.abs(existing.top - item.top) < 2);
    if (!duplicate) unique.push({ ...item, top: Math.max(0, Math.min(item.top, maxScroll)) });
  });
  return unique;
}

function currentSection() {
  const threshold = window.scrollY + headerOffset() + 20;
  let current = snapSections[0];
  snapSections.forEach((section) => {
    const top = section.getBoundingClientRect().top + window.scrollY;
    if (top <= threshold) current = section;
  });
  return current;
}

const easeInOutCubic = (progress) => progress < 0.5
  ? 4 * progress * progress * progress
  : 1 - Math.pow(-2 * progress + 2, 3) / 2;

function easeScrollTo(target, onComplete) {
  cancelAnimationFrame(scrollFrame);
  const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const destination = Math.min(Math.max(0, target), maxScroll);
  const start = window.scrollY;
  const distance = destination - start;
  const direction = Math.sign(distance);
  if (Math.abs(distance) < 1) {
    setHeaderHidden(false);
    if (onComplete) onComplete();
    return;
  }
  const duration = Math.min(620, Math.max(320, Math.abs(distance) * 0.42));
  const startTime = performance.now();
  transitioning = true;
  scrollDirection = direction;

  const step = (now) => {
    const progress = Math.min(1, (now - startTime) / duration);
    window.scrollTo(0, start + distance * easeInOutCubic(progress));
    if (progress < 1) {
      scrollFrame = requestAnimationFrame(step);
      return;
    }
    window.scrollTo(0, destination);
    transitioning = false;
    scrollDirection = 0;
    setHeaderHidden(direction > 0 && destination > 72);
    if (onComplete) onComplete();
  };
  scrollFrame = requestAnimationFrame(step);
}

function clearSectionFades() {
  window.clearTimeout(fadeTimer);
  document.querySelectorAll('[data-snap-section].is-fading-out, [data-snap-section].is-fading-in').forEach((section) => {
    section.classList.remove('is-fading-out', 'is-fading-in');
  });
}

function crossfadeTo(targetSection, target) {
  const from = currentSection();
  if (!from || !targetSection || from === targetSection || reducedMotion.matches) {
    easeScrollTo(target);
    return;
  }
  from.classList.add('is-fading-out');
  targetSection.classList.add('is-fading-in');
  easeScrollTo(target, () => {
    requestAnimationFrame(() => {
      targetSection.classList.remove('is-fading-in');
      from.classList.remove('is-fading-out');
    });
  });
  fadeTimer = window.setTimeout(() => {
    targetSection.classList.remove('is-fading-in');
  }, 180);
}
function snapBy(direction, force = false) {
  if ((!force && !snapEnabled.matches) || reducedMotion.matches || transitioning || Date.now() < wheelLockedUntil) return false;
  const plan = snapPlan();
  const current = window.scrollY;
  let currentIndex = plan.findLastIndex((item) => item.top <= current + 24);
  if (currentIndex < 0) currentIndex = 0;
  const targetIndex = Math.max(0, Math.min(plan.length - 1, currentIndex + (direction > 0 ? 1 : -1)));
  const item = plan[targetIndex];
  if (!item || Math.abs(item.top - current) < 2) return false;
  wheelLockedUntil = Date.now() + 420;
  crossfadeTo(item.section, item.top);
  return true;
}

window.addEventListener('wheel', (event) => {
  if (event.ctrlKey || Math.abs(event.deltaY) < 2) return;
  if (dialog?.open || primaryNav?.classList.contains('is-open')) return;
  if (!snapEnabled.matches || reducedMotion.matches) return;
  const direction = event.deltaY > 0 ? 1 : -1;
  if (transitioning) {
    event.preventDefault();
    if (scrollDirection && direction !== scrollDirection) {
      cancelAnimationFrame(scrollFrame);
      transitioning = false;
      scrollDirection = 0;
      wheelLockedUntil = 0;
      clearSectionFades();
      snapBy(direction, true);
    }
    return;
  }
  event.preventDefault();
  snapBy(direction);
}, { passive: false });

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const hash = link.getAttribute('href');
    if (!hash || hash === '#') return;
    const target = document.querySelector(hash);
    if (!target) return;
    event.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - headerOffset();
    wheelLockedUntil = Date.now() + 420;
    crossfadeTo(target.closest('[data-snap-section]') || target, Math.max(0, top));
    history.replaceState(null, '', hash);
  });
});


document.querySelectorAll('[data-scroll-top]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    wheelLockedUntil = Date.now() + 420;
    crossfadeTo(snapSections[0], 0);
    history.replaceState(null, '', `${location.pathname}${location.search}`);
  });
});

window.addEventListener('scroll', () => {
  const current = window.scrollY;
  if (current < 72 || current < lastScrollY - 4) setHeaderHidden(false);
  else if (current > lastScrollY + 4) setHeaderHidden(true);
  lastScrollY = current;
}, { passive: true });

if (reducedMotion.matches) {
  document.documentElement.classList.remove('snap-enabled');
} else if (snapEnabled.matches) {
  document.documentElement.classList.add('snap-enabled');
}

snapEnabled.addEventListener?.('change', () => {
  document.documentElement.classList.toggle('snap-enabled', snapEnabled.matches && !reducedMotion.matches);
});
let touchStartX = 0;
let touchStartY = 0;
let touchTracking = false;

window.addEventListener('touchstart', (event) => {
  if (event.touches.length !== 1 || dialog?.open || primaryNav?.classList.contains('is-open')) return;
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
  touchTracking = true;
}, { passive: true });

window.addEventListener('touchmove', (event) => {
  if (!touchTracking || event.touches.length !== 1) return;
  const deltaX = event.touches[0].clientX - touchStartX;
  const deltaY = event.touches[0].clientY - touchStartY;
  if (Math.abs(deltaY) < 34 || Math.abs(deltaY) < Math.abs(deltaX) * 1.25) return;
  touchTracking = false;
  if (snapBy(deltaY < 0 ? 1 : -1, true)) event.preventDefault();
}, { passive: false });

window.addEventListener('touchend', () => {
  touchTracking = false;
}, { passive: true });
