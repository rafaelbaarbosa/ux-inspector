'use strict';

console.log('\'Allo \'Allo! REPORT CARAIO');

const message = {
	data: 'data',
	getData: true
};

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
		console.log(response);
	});
});
