(function() {
  init();
})();

function init() {
  const colorScheme = window.localStorage.getItem('color-scheme');
  if (colorScheme !== null) {
    document.documentElement.setAttribute('data-color-scheme', colorScheme);
  }

  const toggle = document.querySelector('.color-scheme-toggle');
  toggle.addEventListener('click', function() {
    toggleColorScheme();
  });
}

function toggleColorScheme() {
  const colorScheme = getColorScheme();
  if (colorScheme === 'light') {
    setColorScheme('dark');
  } else {
    setColorScheme('light');
  }
}

function getColorScheme() {
  const colorScheme = document.documentElement.getAttribute('data-color-scheme', colorScheme);
  if (colorScheme !== null) {
    return colorScheme;
  }
  const colorSchemePreference = getSystemPreference();
  if (colorSchemePreference !== null) {
    return colorSchemePreference;
  }
  return 'light';
}

function setColorScheme(colorScheme) {
  document.documentElement.setAttribute('data-color-scheme', colorScheme);
  window.localStorage.setItem('color-scheme', colorScheme);
}

function getSystemPreference() {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light';
  }
  return null;
}
