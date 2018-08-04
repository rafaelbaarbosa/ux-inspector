'use strict';

console.log('\'Allo \'Allo! Popup');

var el = document.getElementById('btn'); 
el.addEventListener('click', function() {

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  chrome.tabs.sendMessage(tabs[0].id, {data: 'hallo'}, function(response) {
	    document.querySelector('h1').innerHTML = response.data;
	    console.log('-----------');
	    console.log(response);
	    console.log('success');
	    console.log('-----------');
	  });
	});

});
