const Calendar = {
  init() {
    const container = document.getElementById('datesList');
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    CONFIG.importantDates.forEach((item) => {
      const li = document.createElement('li');
      
      // Если дата пустая (как у первого свидания)
      if (!item.date) {
        li.innerHTML = `
          <div>
            <div class="date-label">${item.icon} ${item.name}</div>
            <div class="date-value">Дата пока не выбрана</div>
          </div>
          <div class="date-days" style="background: #aaa;">Ожидается</div>
        `;
        container.appendChild(li);
        return;
      }

      const targetDate = new Date(item.date);
      targetDate.setHours(0, 0, 0, 0);
      
      const diffTime = targetDate - now;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      let daysLabel = '';
      if (diffDays === 0) {
        daysLabel = 'Сегодня! 🎉';
      } else if (diffDays > 0) {
        daysLabel = `Через ${diffDays} д.`;
      } else {
        daysLabel = `Было ${Math.abs(diffDays)} д. назад`;
      }

      li.innerHTML = `
        <div>
          <div class="date-label">${item.icon} ${item.name}</div>
          <div class="date-value">${targetDate.toLocaleDateString('ru-RU')}</div>
        </div>
        <div class="date-days">${daysLabel}</div>
      `;
      container.appendChild(li);
    });
  },
};