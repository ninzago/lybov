const Games = {
  init() {
    document.getElementById('gameHeartBtn').addEventListener('click', () => this.startHeartGame());
    document.getElementById('gameQuizBtn').addEventListener('click', () => this.startQuiz());
  },

  startHeartGame() {
    const area = document.getElementById('gameArea');
    area.innerHTML = '<p class="quiz-question">Найди сердечко 💖</p>';
    
    const grid = document.createElement('div');
    grid.className = 'heart-grid';
    
    const randomIndex = Math.floor(Math.random() * 16);
    
    for (let i = 0; i < 16; i++) {
      const cell = document.createElement('div');
      cell.className = 'heart-cell';
      cell.textContent = '❓';
      
      cell.addEventListener('click', () => {
        if (i === randomIndex) {
          cell.textContent = '💖';
          cell.classList.add('opened');
          setTimeout(() => {
            area.innerHTML = '<p class="quiz-result">Ты нашла моё сердечко! Я тебя люблю ❤️</p>';
          }, 500);
        } else {
          cell.textContent = '💔';
          cell.style.opacity = '0.5';
        }
      });
      
      grid.appendChild(cell);
    }
    area.appendChild(grid);
  },

  startQuiz() {
    const area = document.getElementById('gameArea');
    let currentQuestion = 0;
    let score = 0;

    const renderQuestion = () => {
      if (currentQuestion >= CONFIG.quiz.length) {
        area.innerHTML = `<p class="quiz-result">Твой результат: ${score} из ${CONFIG.quiz.length} 💕</p>`;
        return;
      }

      const q = CONFIG.quiz[currentQuestion];
      area.innerHTML = `<p class="quiz-question">${q.question}</p>`;
      
      const optionsContainer = document.createElement('div');
      optionsContainer.className = 'quiz-options';

      q.options.forEach((opt, index) => {
        const btn = document.createElement('div');
        btn.className = 'quiz-option';
        btn.textContent = opt;
        
        btn.addEventListener('click', () => {
          if (index === q.correct) {
            btn.classList.add('correct');
            score++;
          } else {
            btn.classList.add('wrong');
            // Показываем правильный ответ
            optionsContainer.children[q.correct].classList.add('correct');
          }
          
          // Блокируем клики
          Array.from(optionsContainer.children).forEach(c => c.style.pointerEvents = 'none');
          
          setTimeout(() => {
            currentQuestion++;
            renderQuestion();
          }, 1000);
        });
        
        optionsContainer.appendChild(btn);
      });
      
      area.appendChild(optionsContainer);
    };

    renderQuestion();
  },
};