const Theme = {
  themes: ['default', 'theme-night', 'theme-lavender', 'theme-peach'],
  icons: ['🌙', '☀️', '🌸', '🍑'],
  currentIndex: 0,

  init() {
    const btn = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('vasilisa_theme');
    
    if (savedTheme) {
      this.currentIndex = parseInt(savedTheme);
      this.applyTheme(this.currentIndex, btn);
    }

    btn.addEventListener('click', () => {
      this.currentIndex = (this.currentIndex + 1) % this.themes.length;
      this.applyTheme(this.currentIndex, btn);
      localStorage.setItem('vasilisa_theme', this.currentIndex);
    });
  },

  applyTheme(index, btn) {
    document.body.className = ''; // Сбрасываем все классы тела
    if (this.themes[index] !== 'default') {
      document.body.classList.add(this.themes[index]);
    }
    btn.textContent = this.icons[index];
  },
};