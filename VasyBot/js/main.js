document.addEventListener('DOMContentLoaded', () => {
  // Инициализация всех модулей
  Counter.init();
  Compliments.init();
  Gallery.init();
  Music.init();
  Calendar.init();
  Achievements.init();
  Games.init();
  Memories.init();
  Secrets.init();
  Theme.init();

  // Рендер списка причин любви
  const loveList = document.getElementById('loveList');
  if (loveList && CONFIG.loveReasons) {
    CONFIG.loveReasons.forEach(reason => {
      const li = document.createElement('li');
      li.textContent = reason;
      loveList.appendChild(li);
    });
  }

  // Кнопки сюрпризов
  const actionBox = document.getElementById('actionBox');
  if (document.getElementById('loveBtn')) {
    document.getElementById('loveBtn').addEventListener('click', () => {
      actionBox.textContent = "Я люблю тебя больше всего на свете! ❤️❤️❤️";
    });
  }
  if (document.getElementById('hugBtn')) {
    document.getElementById('hugBtn').addEventListener('click', () => {
      actionBox.textContent = "🤗 *крепко-крепко обнимаю тебя* Ты лучшая!";
    });
  }
  if (document.getElementById('kissBtn')) {
    document.getElementById('kissBtn').addEventListener('click', () => {
      actionBox.textContent = "😘 *нежно целую в щёчку* Ты моё солнышко!";
    });
  }

  // Фон с сердечками
  const heartsContainer = document.getElementById('heartsBg');
  if (heartsContainer) {
    const heartSymbols = ['💗', '💕', '💖', '🌸', '💞', '🌷'];
    for (let i = 0; i < 15; i++) {
      const span = document.createElement('span');
      span.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
      span.style.left = Math.random() * 100 + '%';
      span.style.fontSize = (16 + Math.random() * 20) + 'px';
      span.style.animationDuration = (10 + Math.random() * 10) + 's';
      span.style.animationDelay = (Math.random() * 10) + 's';
      heartsContainer.appendChild(span);
    }
  }
});

// ==========================================
// СИСТЕМА ПАРОЛЯ (ЗАКРЫТАЯ ВЕРСИЯ)
// ==========================================
const Auth = {
  password: 'vasilisa2026', // <-- ПАРОЛЬ ЗДЕСЬ

  check() {
    // Если мы на странице invite.html, не блокируем её
    if (window.location.pathname.includes('invite.html')) return;

    if (localStorage.getItem('site_auth') === 'true') return;

    document.body.innerHTML = `
      <div style="display:flex; align-items:center; justify-content:center; min-height:100vh; background: #ffe0ec; font-family: 'Segoe UI', sans-serif; padding: 20px;">
        <div style="background: white; padding: 40px; border-radius: 24px; text-align: center; box-shadow: 0 10px 30px rgba(214, 51, 108, 0.2); max-width: 400px; width: 100%;">
          <h2 style="color: #d6336c; margin-bottom: 20px;">🔒 Вход только для своих</h2>
          <p style="color: #a04a6b; margin-bottom: 20px;">Введи пароль, чтобы открыть наше секретное место 💕</p>
          <input type="password" id="authPass" placeholder="Пароль" style="width: 100%; padding: 15px; border-radius: 30px; border: 2px solid #ffb3d1; font-size: 1.1rem; margin-bottom: 15px; outline: none; text-align: center;">
          <button id="authBtn" style="width: 100%; padding: 15px; border-radius: 30px; border: none; background: linear-gradient(135deg, #ff6ba3, #d6336c); color: white; font-size: 1.1rem; font-weight: bold; cursor: pointer; transition: transform 0.2s;">Войти</button>
          <p id="authError" style="color: red; margin-top: 15px; font-size: 0.9rem; display: none;">Неверный пароль!</p>
        </div>
      </div>
    `;

    document.getElementById('authBtn').addEventListener('click', () => {
      const input = document.getElementById('authPass').value;
      if (input === this.password) {
        localStorage.setItem('site_auth', 'true');
        window.location.reload();
      } else {
        document.getElementById('authError').style.display = 'block';
        document.getElementById('authPass').value = '';
      }
    });

    document.getElementById('authPass').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') document.getElementById('authBtn').click();
    });
  }
};

Auth.check();