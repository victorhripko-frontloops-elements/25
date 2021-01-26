import './style.scss';

(() => {
  let API = 'https://swapi.dev/api/people/';

  const loadBtn = document.querySelector('.load-cards');
  const wrapper = document.querySelector('.cards');

  loadBtn.addEventListener('click', () => {
    loadBtn.disabled = true;
    loadBtn.classList.add('btn--loading');

    getCards(() => {
      loadBtn.disabled = false;
      loadBtn.classList.remove('btn--loading');
    });
  });


  function getCards(callback) {
    fetch(API)
      .then(res => res.json())
      .then(data => {
        data.next ? API = data.next : loadBtn.style.display = 'none';
        renderCards(data.results);
      })
      .finally(callback);
  };

  function renderCards(items) {
    items.forEach((el, idx) => {
      wrapper.insertAdjacentHTML('beforeend', `<div class="card-item" style="animation-delay: ${idx * 10}ms">${el.name}</div>`)
    });

    wrapper.style.height = wrapper.scrollHeight + 'px';
  };


})();
