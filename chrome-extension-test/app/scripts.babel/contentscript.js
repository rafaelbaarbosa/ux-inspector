'use strict';

console.log('\'Allo \'Allo! Content script');

var flag = true;

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
 //  var data = request.data + 'bye' || {};

  // var htmlCollection = document.getElementsByTagName('nav');

  // console.log(htmlCollection[1].querySelectorAll('[href]'));

	// var arr = Array.from(htmlCollection);

	// arr.forEach(logAttributes);


	const helpAndDoc = eval(request.helpAndDoc);
	const findAndUndoErrors = eval(request.findAndUndoErrors);

	helpAndDoc(document);
	console.log('-------');
	findAndUndoErrors(document);

	var data = flag ? 'Todas as imagens possuem ALT.' : 'Essa página possui uma ou mais imagens sem ALT.';

  sendResponse({data: data, success: true});
});
