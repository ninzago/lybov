const Counter = {
  startDate: null,

  init() {
    this.startDate = new Date(CONFIG.startDate);
    this.update();
    setInterval(() => this.update(), 1000);
  },

  update() {
    const now = new Date();
    const diff = now - this.startDate;

    if (diff < 0) {
      document.getElementById('daysCounter').textContent = '0';
      document.getElementById('detailCounter').textContent = 'Скоро начнём! 💕';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById('daysCounter').textContent = days;
    document.getElementById('detailCounter').textContent =
      `${hours} ч ${minutes} мин ${seconds} сек — и каждая секунда бесценна`;
  },
};