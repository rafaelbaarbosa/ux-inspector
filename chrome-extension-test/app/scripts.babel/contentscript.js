'use strict';

console.log('\'Allo \'Allo! Content script');

var flag = true;

function logAttributes(element, index, array) {
	if (!element.attributes.getNamedItem('alt')) {
		flag = false;
	}
};


chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
	// console.log('-----------');
 //  console.log("something happening from the extension");
 //  console.log(request.data);
 //  console.log('-----------');
 //  var data = request.data + 'bye' || {};

  var htmlCollection = document.getElementsByTagName('nav');

  console.log(htmlCollection[1].querySelectorAll('[href]'));

	// var arr = Array.from(htmlCollection);

	// arr.forEach(logAttributes);

	var data = flag ? 'Todas as imagens possuem ALT.' : 'Essa página possui uma ou mais imagens sem ALT.';

  sendResponse({data: data, success: true});
});
