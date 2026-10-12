const languageButtons = document.querySelectorAll('[data-language]');
const translated = [...document.querySelectorAll('[data-zh]')];
translated.forEach(element => { element.dataset.en = element.textContent; });
function setLanguage(language) {
  const zh = language === 'zh';
  document.documentElement.lang = zh ? 'zh-CN' : 'en';
  translated.forEach(element => { element.textContent = element.dataset[zh ? 'zh' : 'en']; });
  languageButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.language === language)));
  document.querySelector('nav').setAttribute('aria-label', zh ? '主导航' : 'Main navigation');
  document.querySelector('.portrait img').alt = zh ? '胡梦锴个人照片' : 'Portrait of Mengkai Hu';
  document.title = zh ? 'M / FIELD — 胡梦锴' : 'M / FIELD — Mengkai Hu';
  try { localStorage.setItem('homepage-language', language); } catch { /* Default language works without storage. */ }
}
languageButtons.forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.language)));
try { if (localStorage.getItem('homepage-language') === 'zh') setLanguage('zh'); } catch { /* Default to English. */ }
const navLinks = [...document.querySelectorAll('.nav-links a')];
function updateActiveSection() {
  let active = 'home';
  for (const section of document.querySelectorAll('main > section')) {
    if (section.getBoundingClientRect().top <= 150) active = section.id;
  }
  navLinks.forEach(link => {
    const selected = link.hash === '#' + active;
    link.classList.toggle('active', selected);
    if (selected) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
let scheduled = false;
window.addEventListener('scroll', () => {
  if (!scheduled) requestAnimationFrame(() => { updateActiveSection(); scheduled = false; });
  scheduled = true;
}, { passive: true });
updateActiveSection();
