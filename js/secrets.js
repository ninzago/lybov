const Secrets = {
  init() {
    const container = document.getElementById('secrets');
    
    CONFIG.secretMessages.forEach((msg) => {
      const div = document.createElement('div');
      div.className = 'secret-item';
      div.textContent = '💌';
      
      div.addEventListener('click', () => {
        if (!div.classList.contains('opened')) {
          div.classList.add('opened');
          div.textContent = msg;
        }
      });
      
      container.appendChild(div);
    });
  },
};