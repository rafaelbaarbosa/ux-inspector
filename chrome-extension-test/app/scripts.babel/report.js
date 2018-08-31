'use strict';

const message = {
	data: 'data',
	getReport: true
};

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
		document.getElementById('pfvr-vai').innerHTML = response.finalReport;

		const moreInfoObjects = document.querySelectorAll('.more-info-list li *');
		for (let element of moreInfoObjects) {
			element.parentElement.innerText = element.outerHTML;
		}
	});
});
