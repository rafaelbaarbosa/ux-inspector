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
	let pathLiArray = [];
	for (const key in pathsObject) {
		pathLiArray.push(`<li>O caminho ${key} precisa de ${pathsObject[key]} passos para ser finalizado.</li>`);
		numberOfPaths++;
	}

	return (`
		<h3>Flexibilidade e eficiência do uso</h3>
		<ul class="alerts-detected">
			<li>Essa funcionalidade possui ${numberOfPaths} ${numberOfPaths === 1 ? 'caminho possível' : 'caminhos possíveis'} para ser finalizada.</li>
			${pathLiArray.join('\n')}
		</ul>
	`);

};