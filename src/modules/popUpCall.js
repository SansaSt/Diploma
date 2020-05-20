import modalsOpen from './modalsOpen';

const popUpCall = () => {
  const callBtns = document.querySelectorAll('.call-btn'),
        popUpCall = document.querySelector('.popup-call ');

        callBtns.forEach(item => {
          item.addEventListener('click', event => {
            event.preventDefault();

            modalsOpen(popUpCall);

          });

        });
        

};

export default popUpCall;