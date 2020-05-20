const modalsClose = () => {
  const popUp = document.querySelectorAll('.popup');

  popUp.forEach(item => item.addEventListener('click', event => {
    const inputs = item.querySelectorAll('input');
    const target = event.target;

    if (target.classList.contains('popup') || target.classList.contains('popup-close')) {
      if (target.classList.contains('popup-close')) {
        event.preventDefault();
      }
      
      document.body.style.overflow = 'auto';
      item.style.display = 'none';
      inputs.forEach(input => {
        input.value = '';
      });
    }
  }));

};

export default modalsClose;