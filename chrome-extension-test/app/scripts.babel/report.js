'use strict';

const message = {
	data: 'data',
	getReport: true
};

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
		document.getElementById('pfvr-vai').innerHTML = response.finalReport;

		const moreInfoObjects = document.querySelectorAll('.more-info-list li');
		for (let element of moreInfoObjects) {
			const insideElementString = element.innerHTML;
			element.innerText = `${insideElementString}`;
		}

		const toggleBtns = Array.from(document.querySelectorAll('.toggle-more-info'));
		for (let btn of toggleBtns) {
			btn.addEventListener('click', (event) => {
				if (event.target.nextSibling.nextSibling.classList.contains('openned')) {
					event.target.nextSibling.nextSibling.classList.remove('openned');
				} else {
					event.target.nextSibling.nextSibling.classList.add('openned');
				}
			});
		}
	});
});
