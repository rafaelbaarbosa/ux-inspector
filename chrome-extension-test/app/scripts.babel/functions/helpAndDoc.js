'use strict';

const helpAndDoc = (domToAnalyse) => {

	const inputsArray = Array.from(domToAnalyse.querySelectorAll('input'));

	// Verifica se existe nav
	const navsCollection = domToAnalyse.getElementsByTagName('nav');
	let navsLi = ``;
	if (!navsCollection.length)
		navsLi = `<li>Funcionalidade não possui nenhum elemento NAV.</li>`;

	// Verifica se existem inputs sem placeholder
	const inputsWithoutPlaceholderCounter = domToAnalyse.querySelectorAll('input').length - domToAnalyse.querySelectorAll('input[placeholder]').length;
	let inputsWithoutPlaceholderLi = ``;
	if (inputsWithoutPlaceholderCounter){
		const filteredInputs = inputsArray.filter((element) => {
			return !element.getAttribute('placeholder');
		});
		const filteredInputsWithLi = filteredInputs.map((element) => {
			return `<li>${element.outerHTML}</li>`;
		});
		const inputsWithoutPlaceholderList = `
			<ul class="more-info-list">
				${filteredInputsWithLi.join('\n')}
			</ul>
		`;

		inputsWithoutPlaceholderLi = `
			<li>
				${inputsWithoutPlaceholderCounter === 1 ? 'Existe 1 input sem placeholder na funcionalidade.' : `Existem ${inputsWithoutPlaceholderCounter} inputs sem placeholder na funcionalidade.`}
				${inputsWithoutPlaceholderList}
			</li>
		`;

	}

	// Verifica se existem inputs sem label
	const inputsWithoutLabel = inputsArray.filter((element) => {
		return (!element.getAttribute('id') || ( element.getAttribute('id') && (domToAnalyse.querySelectorAll('label[for="' + element.getAttribute('id') + '"]').length <= 0) ));
	});
	let inputsWithoutLabelLi = ``;
	if (inputsWithoutLabel.length > 0) {
		const inputElementsInsideLi = inputsWithoutLabel.map((element) => {
			return `<li>${element.outerHTML}</li>`;
		});
		const inputElementsList = `
			<ul class="more-info-list">
				${inputElementsInsideLi.join('\n')}
			</ul>
		`;
		inputsWithoutLabelLi = `
			<li>
				${inputsWithoutLabel.length === 1 ? 'Existe 1 input sem label na funcionalidade.' : `Existem ${inputsWithoutLabel.length} inputs sem label na funcionalidade.`}
				${inputElementsList}
			</li>
		`;
	}

	// Verifica se existem elementos de ajuda
	const helpElements = domToAnalyse.querySelectorAll('[uxi-help]').length + domToAnalyse.querySelectorAll('[rel="help"]').length;
	const helpElementsLi = `<li>Existem ${helpElements} elementos de ajuda na página.</li>`;

	// Verifica se imagens possuem alt
	const imgsArray = Array.from(domToAnalyse.querySelectorAll('img'));
	const imgsWithoutAlt = imgsArray.filter((element) => {
		return (!element.getAttribute('alt') || ( element.getAttribute('alt') && (element.getAttribute('alt') === '') ))
	});

	let imgsWithoutAltLi = ``;
	if (imgsWithoutAlt.length > 0) {
		const imgElementsInsideLi = imgsWithoutAlt.map((element) => {
			return `<li>${element.outerHTML}</li>`;
		});
		const imgElementsList = `
			<ul class="more-info-list">
				${imgElementsInsideLi.join('\n')}
			</ul>
		`;
		imgsWithoutAltLi = `
			<li>
				De ${imgsArray.length} ${imgsArray.length > 1 ? 'imagens utilizadas' : 'imagem utilizada'} na funcionalidade ${imgsWithoutAlt.length} não ${imgsWithoutAlt.length > 1 ? 'possuem' : 'possui'} texto alternativo.
				${imgElementsList}
			</li>
		`;
	}

	return (`
		<h3>Ajuda e documentação</h3>
		<ul class="alerts-detected">
			${navsLi}
			${inputsWithoutPlaceholderLi}
			${inputsWithoutLabelLi}
			${helpElementsLi}
			${imgsWithoutAltLi}
		</ul>
	`);

};