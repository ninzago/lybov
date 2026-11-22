const Achievements = {
  init() {
    const container = document.getElementById('achievements');

    CONFIG.achievements.forEach((item) => {
      const div = document.createElement('div');
      const isUnlocked = item.unlock !== null;
      
      div.className = `achievement ${isUnlocked ? 'unlocked' : 'locked'}`;
      
      div.innerHTML = `
        <div class="icon">${isUnlocked ? item.icon : '🔒'}</div>
        <div class="name">${item.name}</div>
        <div class="desc">${item.desc}</div>
      `;
      
      container.appendChild(div);
    });
  },
};