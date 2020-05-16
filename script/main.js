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

  // PopUpDiscount

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

  popUpDiscount();

  // PopUpCheck

  const popUpCheck = () => {
    const popUpCheck = document.querySelector('.popup-check'),
          checkBtn = document.querySelector('.check-btn');

    checkBtn.addEventListener('click', event => {
      event.preventDefault();
      modalsOpen(popUpCheck);
    });
  };

  popUpCheck();

  // PopUp Consultation

  const popUpConsultation = () => {
    const consultationBtn = document.querySelector('.consultation-btn'),
          popUpC = document.querySelector('.popup-consultation');

    consultationBtn.addEventListener('click', event => {
      event.preventDefault();
      modalsOpen(popUpC);
    });
  };

  popUpConsultation();

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

  // Phone mask


  function maskPhone(masked = '+7 (___) ___-__-__') {
    const elem = document.querySelectorAll('input[name="user_phone"]');
  
    function mask(event) {
      const keyCode = event.keyCode;
      const template = masked,
        def = template.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, "");
      let i = 0,
        newValue = template.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
        });
      i = newValue.indexOf("_");
      if (i != -1) {
        newValue = newValue.slice(0, i);
      }
      let reg = template.substr(0, this.value.length).replace(/_+/g,
        function (a) {
          return "\\d{1," + a.length + "}";
        }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
        this.value = newValue;
      }
      if (event.type == "blur" && this.value.length < 5) {
        this.value = "";
      }
  
    }
  
      elem.forEach(item => {
          item.addEventListener("input", mask);
          item.addEventListener("focus", mask);
        item.addEventListener("blur", mask);
      });
  }

  maskPhone();

  // More

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
  
  moreBtn();  

  // Send Form + Input Validation

  const sendForm = () => {
    const errorMessage = 'Что-то пошло не так',
          loadMessage = 'Загрузка...',
          successMessage = 'Спасибо, мы скоро с вами свяжемся!',
          forms = document.querySelectorAll('form');
    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'fort-size: 2rem';

    const postData = (body, outputData, errorData) => {
      const request = new XMLHttpRequest();

      request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) {
          return;
        }
        if (request.status === 200) {
          outputData();
        } else {
          errorData(request.status);

        }
      });
      request.open('POST', './server.php');
      request.setRequestHeader('Content-Type', 'application/json');

      request.send(JSON.stringify(body));
    };
    forms.forEach(form => {
      form.addEventListener('input', (evt) => {
        let target = evt.target;

        if (target.name === 'user_name' || target.name === 'user_quest') {
          target.value = target.value.replace(/[^а-я ]/gi, '');
        }
      });
      

      form.addEventListener('submit', (event) => {
        event.preventDefault();
        form.appendChild(statusMessage);
        statusMessage.style.cssText = `font-size: 2rem;
              color: #000; `;
        const formData = new FormData(form);
        statusMessage.textContent = loadMessage;

       
        let body = {};
        for (let val of formData.entries()) {
          body[val[0]] = val[1];
        }
        postData(body,
          () => {
            statusMessage.style.cssText = `font-size: 2rem;
              color: green; `;
            statusMessage.textContent = successMessage;
            form.reset();
          },
          (error) => {
            statusMessage.style.cssText = `font-size: 2rem;
              color: red; `;
            statusMessage.textContent = errorMessage;
          });
      });
    });
  };

  sendForm();

});



