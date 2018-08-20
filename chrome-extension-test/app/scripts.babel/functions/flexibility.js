'use strict';

const flexibility = (domToAnalyse) => {

	const pathElements = Array.from(domToAnalyse.querySelectorAll('[uxi-path]'));
	let pathsObject = {};

	for (const element of pathElements) {
		let numbersArray = [];
		const splittedString = element.getAttribute('uxi-path').split(',');

		for (const stringNumber of splittedString) {
			if (parseInt(stringNumber))
				numbersArray.push(parseInt(stringNumber));
		}

		for (const number of numbersArray) {
			pathsObject[number] = 1 + (pathsObject[number] || 0);
		}
	}

	let numberOfPaths = 0;
	for (const key in pathsObject) {
		console.log(`O caminho ${key} precisa de ${pathsObject[key]} passos para ser finalizado.`);
		numberOfPaths++;
	}
	console.log(`Essa funcionalidade possui ${numberOfPaths} caminhos possíveis para ser finalizada.`);

};