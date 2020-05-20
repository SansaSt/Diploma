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
          popUpC = document.querySelector('.popup-consultation'),
          consultQuestion = document.querySelector('.consult-question'),
          directorForm = document.querySelector('.director-form');

    const message = document.createElement('div');
          message.classList.add('message');
          message.textContent = 'Пожалуйста, введите свой вопрос';
          message.style.cssText = `font-size: 2rem;
          color: red;`;

    consultationBtn.addEventListener('click', event => {
      event.preventDefault();
      if (consultQuestion.value) {
        modalsOpen(popUpC);
      } else { 
        directorForm.appendChild(message);

        setTimeout(() => {
          message.remove();
        }, 5000);
      }
    });
  };

  popUpConsultation();

  // Accordion

  const accordionTwo = () => {

    const questions = document.querySelector('.questions');

    questions.querySelectorAll('.panel-heading').forEach((acc, i, all) => {
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

  const data = {};

  const calc = () => {
    const calcBlock = document.getElementById('accordion'),
      checkBoxDiv = document.querySelectorAll('.onoffswitch'),
      checkBoxes = document.querySelectorAll('.onoffswitch-checkbox'),
      panels = document.querySelectorAll('.panel-collapse'),
      panelsHead = document.querySelectorAll('.panel-heading'),
      titleText = document.querySelectorAll('.title-text')[1],
      selectBox = document.querySelectorAll('.select-box'),
      calcResult = document.getElementById('calc-result'),
      distance = document.getElementById('distance');


    const countSum = () => {
      const calcType = document.querySelectorAll('.form-control');
      const typeValues = [];
      for (let i = 0; i < 4; i++) {
        typeValues.push(parseFloat(calcType[i].options[calcType[i].selectedIndex].value));
      }

      calcBlock.addEventListener('input', event => {
        const target = event.target;
        if (target.id === 'distance') {
          target.value = target.value.replace(/[^+\d]/g, '');
        }
      });

      const checkBox1Checked = () => {
        if (typeValues[0] === 2) {
          data.total *= 1.2;
        }
        data.diameter1 = typeValues[0];


        switch (true) {
        case (typeValues[1] === 2):
          data.total *= 1.3;
          break;
        case (typeValues[1] === 3):
          data.total *= 1.5;
          break;
        }
        data.numberRings1 = typeValues[1];
      };

      if (checkBoxes[0].checked) {
        titleText.style.display = 'none';
        selectBox[2].style.display = 'none';
        selectBox[3].style.display = 'none';

        data.total = 10000;

        checkBox1Checked();

        if (checkBoxes[1].checked) {
          data.total += 1000;
          data.bottom = 'yes, +1000';
        }

      } else if (!checkBoxes[0].checked) {
        titleText.style.display = '';
        selectBox[2].style.display = '';
        selectBox[3].style.display = '';

        data.total = 15000;

        checkBox1Checked();

        if (typeValues[2] === 2) {
          data.total *= 1.2;
        }
        data.diameter2 = typeValues[2];

        switch (true) {
        case (typeValues[3] === 2):
          data.total *= 1.3;
          break;
        case (typeValues[3] === 3):
          data.total *= 1.5;
          break;
        }
        data.numberRings2 = typeValues[3];

        if (checkBoxes[1].checked) {
          data.total += 2000;
          data.bottom = 'yes, 2000';
        }
      }
      calcResult.placeholder = `Примерная стоимость: ${data.total} руб.`;
    };

    for (let i = 0; i < checkBoxDiv.length; i++) {
      checkBoxDiv[i].addEventListener('click', () => {
        if (checkBoxes[i].checked) {
          checkBoxes[i].removeAttribute('checked');
        } else {
          checkBoxes[i].setAttribute('checked', 'checked');
        }
      });
    }

    const togglePanels = index => {
      countSum();
      for (let i = 0; i < panels.length; i++) {
        if (index === i) {
          panels[i].classList.add('in');
        } else {
          panels[i].classList.remove('in');
        }
      }
    };

    calcBlock.addEventListener('click', event => {
      event.preventDefault();
      let target = event.target;

      if (target.classList.contains('onoffswitch-inner')) {
        countSum();
      }

      if (target.classList.contains('construct-btn')  && !target.classList.contains('discount-btn')) {
        countSum();
        switch (true) {
        case (target.getAttribute('href') === '#collapseTwo'):
          panels[0].classList.remove('in');
          panels[1].classList.add('in');
          break;
        case (target.getAttribute('href') === '#collapseThree'):
          panels[1].classList.remove('in');
          panels[2].classList.add('in');
          break;
        case (target.getAttribute('href') === '#collapseFour'):
          panels[2].classList.remove('in');
          panels[3].classList.add('in');
          break;
        }
      }

      target = target.closest('.panel-heading');
      if (target) {
        panelsHead.forEach((item, i) => {
          if (item === target) {
            togglePanels(i);
          }
        });
      }
    });

    calcBlock.addEventListener('change', event => {
      const target = event.target;

      if (target.matches('select') || target.closest('.onoffswitch-checkbox')) {
        countSum();
      }
    });

};

calc();
  
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
          forms = document.querySelectorAll('form'),
          consultQuestion = document.querySelector('.consult-question');

    const statusMessage = document.createElement('div');
          statusMessage.classList.add('status-message');
          statusMessage.style.cssText = 'font-size: 2rem';

         

    const removeStatusMessage = () => {
      const status = document.querySelector('.status-message');
      if (!status) {
        return;
      }
        setTimeout(() => {
        status.remove();
      }, 5000);
    };

    const postData = body => fetch('./server.php', {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    forms.forEach(form => {
      form.addEventListener('input', (evt) => {
        let target = evt.target;

        if (target.name === 'user_name' || target.name === 'user_quest') {
          target.value = target.value.replace(/[^а-я ]/gi, '');
        }
      });
      
      form.addEventListener('submit', event => {
        event.preventDefault();
  
        if (!form.classList.contains('director-form')) {
          form.insertAdjacentElement('beforeend', statusMessage);
          statusMessage.textContent = loadMessage;
  
          const formData = new FormData(form);
          let body = {};
          for (const val of formData.entries()) {
            body[val[0]] = val[1];
            if (form.classList.contains('consultation-form')) {
              body.userQuest = consultQuestion.value;
              consultQuestion.value = '';
            } else if (form.classList.contains('discount-form')) {
              body = Object.assign(body, data);
            }
          }
  
          const outputData = response => {
            if (response.status !== 200) {
              throw new Error('status network not 200');
            }
            removeStatusMessage();
            statusMessage.style.cssText = `font-size: 2rem;
        	  color: green; `;
            statusMessage.textContent = successMessage;
            
            form.reset();
          };
  
          const error = error => {
            removeStatusMessage();
            statusMessage.style.cssText = `font-size: 2rem;
      	    color: red; `;
            statusMessage.textContent = errorMessage;
            console.error(error);
          };
  
          postData(body)
            .then(outputData)
            .catch(error);
        }
      });
    });
  };

  sendForm();

});

