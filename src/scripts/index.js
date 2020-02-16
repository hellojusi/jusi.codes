document.querySelector('.theme-toggle').addEventListener('click', () => {
  document.documentElement.classList.toggle('theme-alt');
  if (localStorage.getItem('theme-alt') === null) {
    localStorage.setItem('theme-alt', true);
  } else {
    localStorage.removeItem('theme-alt');
  }
});
