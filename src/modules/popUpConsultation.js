import modalsOpen from './modalsOpen';

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

  export default popUpConsultation;