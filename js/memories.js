const Memories = {
  storageKey: 'vasilisa_memories',

  init() {
    const input = document.getElementById('memoryInput');
    const addBtn = document.getElementById('memoryAddBtn');
    
    this.render();

    addBtn.addEventListener('click', () => {
      const text = input.value.trim();
      if (text) {
        this.add(text);
        input.value = '';
      }
    });

    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') addBtn.click();
    });
  },

  getMemories() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  },

  add(text) {
    const memories = this.getMemories();
    memories.push(text);
    localStorage.setItem(this.storageKey, JSON.stringify(memories));
    this.render();
  },

  remove(index) {
    const memories = this.getMemories();
    memories.splice(index, 1);
    localStorage.setItem(this.storageKey, JSON.stringify(memories));
    this.render();
  },

  render() {
    const container = document.getElementById('memoryWall');
    const memories = this.getMemories();
    
    container.innerHTML = '';
    
    if (memories.length === 0) {
      container.innerHTML = '<div class="memory-empty">Пока нет воспоминаний. Добавь первое! 💕</div>';
      return;
    }

    memories.forEach((text, index) => {
      const div = document.createElement('div');
      div.className = 'memory-item';
      div.innerHTML = `
        <div class="memory-text">${text}</div>
        <button class="memory-delete" title="Удалить">×</button>
      `;
      
      div.querySelector('.memory-delete').addEventListener('click', () => this.remove(index));
      container.appendChild(div);
    });
  },
};