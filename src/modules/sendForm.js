import {
	calc, Data
} from './calc';

const sendForm = () => {
	const errorMessage = 'Что-то пошло не так...',
		loadMessage = 'Загрузка...',
		successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

	const forms = document.querySelectorAll('form'),
		    bodyHtml = document.querySelector('body');

	const statusMessage = document.createElement('div');
	      statusMessage.classList.add('status-message');
	      statusMessage.style.cssText = 'font-size: 2rem;';

	const removeStatusMessage = () => {
		const status = document.querySelector('.status-message');
		if (!status) return;
		setTimeout(() => {
			status.remove();
		}, 5000);
	};

		const postData = body => {
			return fetch('./server.php', {
					method: 'POST',
					mode: 'cors',
					credentials: 'same-origin',
					headers: {
							'Content-Type': 'application/json'
					},
					body: JSON.stringify(body)
			});
	};

	forms.forEach(form => {
		form.addEventListener('input', event => {
      const target = event.target;
      
			if (target.name === 'user_name') {
				target.value = target.value.replace(/[^а-я ]/gi, '');
			}
		});

		form.addEventListener('submit', event => {
      event.preventDefault();
      
				statusMessage.textContent = loadMessage;

        const formData = new FormData(form);
        const formInputs = form.querySelectorAll('input');
        
        let body = {};
        
        formInputs.forEach(input => {
          body[input.id.match(/^[a-z]*/)] = input.value;
        });
  
        if (form.classList.contains('capture-form')) {
            body = Object.assign(body, Data);
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
			
		});
	});
};


export default sendForm;





