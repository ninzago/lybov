const Music = {
  init() {
    const audio = document.getElementById('bgMusic');
    const btn = document.getElementById('musicBtn');
    const title = document.getElementById('musicTitle');
    const volume = document.getElementById('musicVolume');
    const player = document.getElementById('musicPlayer');

    // Если элементов нет на странице (например, мы на invite.html), выходим
    if (!audio || !btn) return;

    // Если путь к музыке не указан в конфиге, скрываем плеер
    if (!CONFIG.music.src) {
      if (player) player.style.display = 'none';
      return;
    }

    audio.src = CONFIG.music.src;
    if (title) title.textContent = CONFIG.music.title;
    if (volume) audio.volume = volume.value;

    // Кнопка Play / Pause
    btn.addEventListener('click', () => {
      if (audio.paused) {
        audio.play().catch(e => console.log('Ошибка воспроизведения:', e));
      } else {
        audio.pause();
      }
    });

    // Меняем иконку на паузу, когда играет
    audio.addEventListener('play', () => {
      btn.textContent = '⏸️';
    });

    // Меняем иконку на ноту, когда на паузе
    audio.addEventListener('pause', () => {
      btn.textContent = '🎵';
    });

    // ВАЖНО: Когда музыка заканчивается, сбрасываем кнопку
    audio.addEventListener('ended', () => {
      btn.textContent = '🎵';
      audio.currentTime = 0; // Отматываем в начало для следующего запуска
    });

    // Регулировка громкости
    if (volume) {
      volume.addEventListener('input', (e) => {
        audio.volume = e.target.value;
      });
    }
  },
};