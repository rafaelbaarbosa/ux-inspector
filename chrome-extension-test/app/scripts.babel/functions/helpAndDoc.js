'use strict';

const helpAndDoc = (domToAnalyse) => {
	let infoCounter = 0;
	let alertCounter = 0;

	const inputsArray = Array.from(domToAnalyse.querySelectorAll('input'));

	// Verifica se existe nav
	const navsCollection = domToAnalyse.getElementsByTagName('nav');
	let navsLi = ``;
	if (!navsCollection.length){
		navsLi = `<li class="collection-item"><span class="description"><i class="material-icons alert-icon">warning</i>Essa funcionalidade não possui nenhum elemento nav.</span></li>`;
		alertCounter++;
	}

	// Verifica se existem inputs sem placeholder
	const inputsWithoutPlaceholderCounter = domToAnalyse.querySelectorAll('input').length - domToAnalyse.querySelectorAll('input[placeholder]').length;
	let inputsWithoutPlaceholderLi = ``;
	if (inputsWithoutPlaceholderCounter){
		const filteredInputs = inputsArray.filter((element) => {
			return !element.getAttribute('placeholder');
		});
		const filteredInputsWithLi = filteredInputs.map((element) => {
			return `<li class="collection-item">${element.outerHTML}</li>`;
		});
		const inputsWithoutPlaceholderList = `
			<ul class="collection more-info-list">
				${filteredInputsWithLi.join('\n')}
			</ul>
		`;

		inputsWithoutPlaceholderLi = `
			<li class="collection-item">
				<span class="description"><i class="material-icons alert-icon">warning</i>${inputsWithoutPlaceholderCounter === 1 ? 'Existe 1 input sem placeholder na funcionalidade.' : `Existem ${inputsWithoutPlaceholderCounter} inputs sem placeholder na funcionalidade.`}</span>
				<button class="btn waves-effect waves-light toggle-more-info" type="button" name="action"><i class="material-icons">expand_more</i><i class="material-icons hide">expand_less</i></button>
				${inputsWithoutPlaceholderList}
			</li>
		`;

		alertCounter++;
	}

	// Verifica se existem inputs sem label
	const inputsWithoutLabel = inputsArray.filter((element) => {
		return (!element.getAttribute('id') || ( element.getAttribute('id') && (domToAnalyse.querySelectorAll('label[for="' + element.getAttribute('id') + '"]').length <= 0) ));
	});
	let inputsWithoutLabelLi = ``;
	if (inputsWithoutLabel.length > 0) {
		const inputElementsInsideLi = inputsWithoutLabel.map((element) => {
			return `<li class="collection-item">${element.outerHTML}</li>`;
		});
		const inputElementsList = `
			<ul class="collection more-info-list">
				${inputElementsInsideLi.join('\n')}
			</ul>
		`;
		inputsWithoutLabelLi = `
			<li class="collection-item">
				<span class="description"><i class="material-icons alert-icon">warning</i>${inputsWithoutLabel.length === 1 ? 'Existe 1 input sem label na funcionalidade.' : `Existem ${inputsWithoutLabel.length} inputs sem label na funcionalidade.`}</span>
				<button class="btn waves-effect waves-light toggle-more-info" type="button" name="action"><i class="material-icons">expand_more</i><i class="material-icons hide">expand_less</i></button>
				${inputElementsList}
			</li>
		`;

		alertCounter++;
	}

	// Verifica se existem elementos de ajuda
	const helpElements = domToAnalyse.querySelectorAll('[uxi-help]').length + domToAnalyse.querySelectorAll('[rel="help"]').length;
	let helpElementsLi = ``;
	if (helpElements === 0) {
		alertCounter++;
		helpElementsLi = `<li class="collection-item"><span class="description"><i class="material-icons alert-icon">warning</i>Essa funcionalidade não possui nenhum elemento de ajuda.</span></li>`;
	} else {
		infoCounter++;
		helpElementsLi = `<li class="collection-item"><span class="description"><i class="material-icons info-icon">info</i>${helpElements === 1 ? 'Existe' : 'Existem'} ${helpElements} ${helpElements === 1 ? 'elemento' : 'elementos'} de ajuda na funcionalidade.</span></li>`;
	}

	// Verifica se imagens possuem alt
	const imgsArray = Array.from(domToAnalyse.querySelectorAll('img'));
	const imgsWithoutAlt = imgsArray.filter((element) => {
		return (!element.getAttribute('alt') || ( element.getAttribute('alt') && (element.getAttribute('alt') === '') ))
	});

	let imgsWithoutAltLi = ``;
	if (imgsWithoutAlt.length > 0) {
		const imgElementsInsideLi = imgsWithoutAlt.map((element) => {
			return `<li class="collection-item">${element.outerHTML}</li>`;
		});
		const imgElementsList = `
			<ul class="collection more-info-list">
				${imgElementsInsideLi.join('\n')}
			</ul>
		`;
		imgsWithoutAltLi = `
			<li class="collection-item">
				<span class="description"><i class="material-icons alert-icon">warning</i>De ${imgsArray.length} ${imgsArray.length > 1 ? 'imagens utilizadas' : 'imagem utilizada'} na funcionalidade ${imgsWithoutAlt.length} não ${imgsWithoutAlt.length > 1 ? 'possuem' : 'possui'} texto alternativo.</span>
				<button class="btn waves-effect waves-light toggle-more-info" type="button" name="action"><i class="material-icons">expand_more</i><i class="material-icons hide">expand_less</i></button>
				${imgElementsList}
			</li>
		`;

		alertCounter++;
	}

	const infosMsg = `${infoCounter > 0 ? `<i class="material-icons info-icon">info</i>${infoCounter === 1 ? '1 informação' : `${infoCounter} informações`}` : ''}`;
	const alertsMsg = `${alertCounter > 0 ? `<i class="material-icons alert-icon">warning</i>${alertCounter === 1 ? '1 alerta' : `${alertCounter} alertas`}` : ''}`;
	const alertsAndInfosMsg = `<span class="infos-and-alerts">${infosMsg} ${(infoCounter && alertCounter) ? 'e' : ''} ${alertsMsg}</span>`;
	const report = `
		<ul class="collection with-header alerts-detected">
			<li class="collection-header">
				<h3>Ajuda e documentação // ${alertsAndInfosMsg}</h3>
			</li>
			${navsLi}
			${inputsWithoutPlaceholderLi}
			${inputsWithoutLabelLi}
			${helpElementsLi}
			${imgsWithoutAltLi}
		</ul>
	`;
	const result = {report: report, alertCounter: alertCounter, infoCounter: infoCounter};

	return result;

};