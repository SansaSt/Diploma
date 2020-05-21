import {
	calc, Data
} from './calc';

const sendForm = () => {
	const errorMessage = 'Что-то пошло не так...',
				loadMessage = 'Загрузка...',
				successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

	const forms = document.querySelectorAll('form'),
				consultQuestion = document.querySelector('.consult-question'),
				inputConsult = document.querySelector('input[name="user_quest"]');

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
			let target = event.target;
			
			if (target.name === 'user_name' || target.name === 'user_quest') {
				target.value = target.value.replace(/[^а-я ]/gi, '');
			}
		});
	});

	forms.forEach(form => {

		form.addEventListener('submit', (event) => {
				event.preventDefault();
				form.appendChild(statusMessage);
				statusMessage.textContent = loadMessage;

				const formData = new FormData(form);

				let body = {};

				formData.forEach((val, key) => {
						body[key] = val;
				});

				if (form.classList.contains('discount-form')) {
					body = Object.assign(body, Data);
				}

				body.userQuest = inputConsult.value;
				inputConsult.value = '';
			
				postData(body)
						.then((response) => {
								if(response.status !== 200){
										throw new Error('status network now 200');
								}
								statusMessage.style.cssText = `font-size: 2rem;
        	  		color: green; `;
								statusMessage.textContent = successMessage;
								removeStatusMessage();
						})
						.catch((error) => {
								statusMessage.style.cssText = `font-size: 2rem;
      	    		color: red; `;
								statusMessage.textContent = errorMessage;
								removeStatusMessage();
								console.err(error);
						});
		
		});
});

};

export default sendForm;





