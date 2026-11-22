const DatesPlanner = {
  storageKey: 'vasilisa_planned_dates',

  init() {
    const btn = document.getElementById('addDateBtn');
    if (!btn) {
      console.error("Ошибка: Кнопка 'Запланировать' не найдена в HTML!");
      return;
    }
    
    // Убираем старые обработчики, чтобы не было дублей
    btn.onclick = null; 
    btn.addEventListener('click', (e) => {
      e.preventDefault(); // Чтобы страница не перезагружалась
      this.addDate();
    });
    
    this.render();
    console.log("Планировщик успешно загружен! 💕");
  },

  getDates() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  },

  addDate() {
    const type = document.getElementById('dateType').value;
    const title = document.getElementById('dateTitle').value.trim();
    const date = document.getElementById('dateDateTime').value;
    const notes = document.getElementById('dateNotes').value.trim();

    if (!title || !date) {
      alert('Пожалуйста, заполни название и выбери дату! 💕');
      return;
    }

    const icons = {
      'romantic': '🌹 Свидание', 'walk': '🚶‍♀️ Прогулка', 'movie': '🍿 Кино',
      'cafe': '☕ Кафе', 'surprise': '🎁 Сюрприз', 'other': '✨ Другое'
    };

    const newDate = {
      id: Date.now(),
      type: type,
      typeLabel: icons[type],
      title: title,
      date: date,
      notes: notes
    };

    const dates = this.getDates();
    dates.push(newDate);
    dates.sort((a, b) => new Date(a.date) - new Date(b.date));
    localStorage.setItem(this.storageKey, JSON.stringify(dates));
    
    // Очищаем форму
    document.getElementById('dateTitle').value = '';
    document.getElementById('dateDateTime').value = '';
    document.getElementById('dateNotes').value = '';
    
    this.render();

    // Формируем ссылку для перехода
    const params = new URLSearchParams({
      type: newDate.typeLabel,
      title: newDate.title,
      date: newDate.date,
      notes: newDate.notes
    });
    
    // Переходим на страницу приглашения
    window.location.href = `invite.html?${params.toString()}`;
  },

  removeDate(id) {
    if(confirm('Удалить это мероприятие?')) {
      let dates = this.getDates();
      dates = dates.filter(d => d.id !== id);
      localStorage.setItem(this.storageKey, JSON.stringify(dates));
      this.render();
    }
  },

  render() {
    const container = document.getElementById('plannedDatesList');
    if (!container) return;

    const dates = this.getDates();
    container.innerHTML = '';

    if (dates.length === 0) {
      container.innerHTML = '<div class="memory-empty">Пока ничего не запланировано. Добавь наше первое свидание! 💕</div>';
      return;
    }

    dates.forEach(d => {
      const eventDate = new Date(d.date);
      const dateString = eventDate.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' });

      const div = document.createElement('div');
      div.className = 'planned-date-card';
      div.innerHTML = `
        <div class="planned-date-header">
          <span class="planned-date-type">${d.typeLabel}</span>
          <button class="memory-delete" onclick="DatesPlanner.removeDate(${d.id})" title="Удалить">×</button>
        </div>
        <div class="planned-date-title">${d.title}</div>
        <div class="planned-date-time">📅 ${dateString}</div>
        ${d.notes ? `<div class="planned-date-notes">📝 ${d.notes}</div>` : ''}
      `;
      container.appendChild(div);
    });
  }
};

// Автоматически запускаем при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  DatesPlanner.init();
});