import modalsOpen from './modalsOpen';
const popUpDiscount = () => {
  const discountBtn = document.querySelectorAll('.discount-btn'),
        popUpD = document.querySelector('.popup-discount'),
        submit = document.getElementsByName('submit');

        discountBtn.forEach(item => {
          item.addEventListener('click', event => {
            event.preventDefault();
    
            modalsOpen(popUpD);
        });
      });
};

export default popUpDiscount;