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

export default accordionTwo;