const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const searchForm = document.querySelector('.product-search');
const searchInput = document.querySelector('#product-search-input');
const productCards = [...document.querySelectorAll('.product-card')];
const searchFeedback = document.querySelector('.search-feedback');
const quickTags = [...document.querySelectorAll('.quick-tags button')];
const solutionCards = [...document.querySelectorAll('.solution-card[data-query]')];

function normalize(value = '') {
  return value
    .toLocaleLowerCase('pt-BR')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function runSearch(term) {
  const query = normalize(term);
  let visible = 0;

  productCards.forEach((card) => {
    const haystack = normalize(card.dataset.search || card.textContent);
    const match = !query || haystack.includes(query);
    card.classList.toggle('is-hidden', !match);
    if (match) visible += 1;
  });

  if (!searchFeedback) return;

  if (!query) {
    searchFeedback.textContent = '';
  } else if (visible > 0) {
    searchFeedback.textContent = `${visible} item(ns) de demonstração encontrado(s) para “${term}”.`;
  } else {
    searchFeedback.textContent = `Ainda não há item de demonstração para “${term}”. Na versão final, a busca consultará o catálogo completo.`;
  }
}

if (searchForm && searchInput) {
  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    runSearch(searchInput.value);
    document.querySelector('#produtos')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

quickTags.forEach((button) => {
  button.addEventListener('click', () => {
    if (searchInput) searchInput.value = button.textContent.trim();
    runSearch(button.textContent.trim());
    document.querySelector('#produtos')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

solutionCards.forEach((card) => {
  card.addEventListener('click', () => {
    const term = card.dataset.query || '';
    if (searchInput) searchInput.value = term;
    setTimeout(() => runSearch(term), 250);
  });
});
