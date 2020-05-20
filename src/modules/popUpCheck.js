import modalsOpen from './modalsOpen';

  const popUpCheck = () => {
    const popUpCheck = document.querySelector('.popup-check'),
          checkBtn = document.querySelector('.check-btn');

    checkBtn.addEventListener('click', event => {
      event.preventDefault();
      modalsOpen(popUpCheck);
    });
  };

  export default popUpCheck;