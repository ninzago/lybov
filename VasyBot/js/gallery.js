const Gallery = {
  init() {
    const container = document.getElementById('gallery');
    const modal = document.getElementById('galleryModal');
    const modalImg = document.getElementById('modalImg');
    const modalClose = document.getElementById('modalClose');

    // Рендер галереи
    CONFIG.photos.forEach((photo) => {
      const item = document.createElement('div');
      item.className = 'gallery-item';
      
      if (photo.src) {
        item.innerHTML = `<img src="${photo.src}" alt="Наше фото">`;
      } else {
        item.textContent = photo.emoji;
      }
      
      // Открытие модалки по клику
      item.addEventListener('click', () => {
        if (photo.src) {
          modalImg.src = photo.src;
          modal.classList.add('active');
        }
      });

      container.appendChild(item);
    });

    // Закрытие модалки
    modalClose.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  },
};