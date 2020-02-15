// console.log('Hello world');

document.querySelector('.theme-toggle').addEventListener('click', () => {
  document.documentElement.classList.toggle('theme-dark');
  if (localStorage.getItem('darkTheme') === null) {
    localStorage.setItem('darkTheme', true);
  } else {
    localStorage.removeItem('darkTheme');
  }
});
