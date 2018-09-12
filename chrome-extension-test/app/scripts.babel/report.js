'use strict';

const message = {
	data: 'data',
	getReport: true
};

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
		document.getElementById('pfvr-vai').innerHTML = response.finalReport;

		const date = new Date();
		const monthNames = [
			'Janeiro', 'Fevereiro', 'Março',
			'Abril', 'Maio', 'Junho', 'Julho',
			'Agosto', 'Setembro', 'Outubro',
			'Novembro', 'Dezembro'
		];
	
		const day = date.getDate();
		const monthIndex = date.getMonth();
		const year = date.getFullYear();
		const hours = date.getHours();
		const minutes = date.getMinutes();

		document.getElementById('subtitle-date').innerHTML = `Resultados da inspeção feita na página <span class="url">${response.pageUrl}</span> em ${day} de ${monthNames[monthIndex]} de ${year} às ${hours < 10 ? `0${hours}` : `${hours}`}:${minutes < 10 ? `0${minutes}` : `${minutes}`}`;

		const moreInfoObjects = document.querySelectorAll('.more-info-list li');
		for (let element of moreInfoObjects) {
			const insideElementString = element.innerHTML;
			element.innerText = `${insideElementString}`;
		}

		const toggleBtns = Array.from(document.querySelectorAll('.toggle-more-info'));
		for (let btn of toggleBtns) {
			btn.addEventListener('click', (event) => {
				console.log(event.target);
				if (event.target.nextSibling.nextSibling.classList.contains('openned')) {
					event.target.nextSibling.nextSibling.classList.remove('openned');
					event.target.querySelector('i:first-child').classList.remove('hide');
					event.target.querySelector('i:last-child').classList.add('hide');
				} else {
					event.target.nextSibling.nextSibling.classList.add('openned');
					event.target.querySelector('i:first-child').classList.add('hide');
					event.target.querySelector('i:last-child').classList.remove('hide');
				}
			});
		}
	});
});
