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

        if ( data.next ) {
          let next = data.next;
          if ( next.startsWith('http:') ) next = 'https' + data.next.slice(4);
          API = next;
        } else {
          loadBtn.style.display = 'none'
        };

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
