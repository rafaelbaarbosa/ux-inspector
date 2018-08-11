'use strict';

console.log('\'Allo \'Allo! Content script');

var flag = true;

const helpAndDoc = (domToAnalyse) => {

	// Verifica se existe nav
	const navsCollection = domToAnalyse.getElementsByTagName('nav');
	if (navsCollection.length) {
		console.log('Página possui NAV.');
	} else {
		console.log('Página não possui NAV.');
	}

	// Verifica se existem inputs sem placeholder
	const inputsWithoutPlaceholder = domToAnalyse.querySelectorAll('input').length - domToAnalyse.querySelectorAll('input[placeholder]').length;
	console.log('Existem ' + inputsWithoutPlaceholder + ' inputs sem placeholder na página.');

	// Verifica se existem inputs sem label
	let inputsWithoutLabel = 0;
	const inputsArray = Array.from(domToAnalyse.querySelectorAll('input'));
	for (let item of inputsArray) {
		if(item.getAttribute('id')) {

			if(domToAnalyse.querySelectorAll('label[for="' + item.getAttribute('id') + '"]').length <= 0) {
				inputsWithoutLabel++;
			}

		} else {
			inputsWithoutLabel++;
		}
	}
	console.log('Existem ' + inputsWithoutLabel + ' inputs sem label na página.');

	// Verifica se existem elementos de ajuda
	const helpElements = domToAnalyse.querySelectorAll('[uxi-help]').length + domToAnalyse.querySelectorAll('[rel="help"]').length;
	console.log('Existem ' + helpElements + ' elementos de ajuda na página.');

	// Verifica se imagens possuem alt
	let imgsWithoutAlt = 0;
	const imgsArray = Array.from(domToAnalyse.querySelectorAll('img'));
	for (let item of imgsArray) {
		if (item.getAttribute('alt')) {

			if (item.getAttribute('alt') === '') {
				imgsWithoutAlt++;
			}

		} else {
			imgsWithoutAlt++;
		}
	}
	console.log('Das ' + imgsArray.length + ' imagens da página ' + imgsWithoutAlt + ' não possuem texto alternativo');

};


chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
	// console.log('-----------');
 //  console.log("something happening from the extension");
 //  console.log(request.data);
 //  console.log('-----------');
 //  var data = request.data + 'bye' || {};

  // var htmlCollection = document.getElementsByTagName('nav');

  // console.log(htmlCollection[1].querySelectorAll('[href]'));

	// var arr = Array.from(htmlCollection);

	// arr.forEach(logAttributes);

	helpAndDoc(document);

	var data = flag ? 'Todas as imagens possuem ALT.' : 'Essa página possui uma ou mais imagens sem ALT.';

  sendResponse({data: data, success: true});
});
