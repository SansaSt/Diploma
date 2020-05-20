const moreBtn = () => {
  const btn = document.querySelector('.add-sentence-btn'),
        products = document.querySelectorAll('.product'),
        hidden = document.querySelectorAll('.hidden');


  btn.addEventListener('click', () => {
    for (let i = 3; i < products.length; i++) {
      products[i].classList.remove('hidden');
    }
    btn.style.display = 'none';

    hidden.forEach(e => {
      e.classList.remove('hidden');
    });
  });

};

export default moreBtn;