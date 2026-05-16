const THEME_KEY = 'onjongil_theme';

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'dark') {
    document.body.classList.add('dark');
  }
  // 저장값 없으면 기본 라이트(핑크)
}

function toggleTheme() {
  const isDark = document.body.classList.toggle('dark');
  localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
}
