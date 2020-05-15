window.addEventListener('DOMContentLoaded', function(){  // фукнция запускается после загрузки DOM
  'use strict';

  // Modals 

  const modalsOpen = selector => {
    selector.style.display = 'block';
    document.body.style.overflow = 'hidden';
  };

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

  modalsClose();

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

  popUpCall();

  // Accordion

  const accordionTwo = () => {

    document.querySelectorAll('.panel-heading').forEach((acc, i, all) => {
      acc.addEventListener('click', () => {
        hideOthers(acc);
        acc.classList.toggle('in');
        const panelStyle = acc.nextElementSibling.style;
        panelStyle.display = panelStyle.display === 'block' ? 'none' : 'block';
      });
    
      const hideOthers = (me) => {
        all.forEach(acc => {
          if (acc !== me) {
            acc.classList.remove('in');
            acc.nextElementSibling.classList.remove('in');
            acc.nextElementSibling.style.display = 'none';
          }
        });
      };
    });
  };

    accordionTwo();



});