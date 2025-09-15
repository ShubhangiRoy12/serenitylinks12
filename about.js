const themeToggle = document.getElementById('themeToggle');
const themeSelector = document.getElementById('themeSelector');
const themeBtns = document.querySelectorAll('[data-theme]');
const themeCards = document.querySelectorAll('.theme-card');

themeToggle.onclick = () => {
  themeSelector.classList.toggle('hidden');
};

themeBtns.forEach(btn => {
  btn.onclick = () => {
    setTheme(btn.dataset.theme);
    themeSelector.classList.add('hidden');
  };
});
themeCards.forEach(card => {
  card.onclick = () => {
    setTheme(card.dataset.theme);
  };
});

function setTheme(theme) {
  document.body.className = `theme-${theme}`;
  themeCards.forEach(card => card.removeAttribute('data-selected'));
  document.querySelector(`.theme-card[data-theme=\"${theme}\"]`).setAttribute('data-selected','');
}
