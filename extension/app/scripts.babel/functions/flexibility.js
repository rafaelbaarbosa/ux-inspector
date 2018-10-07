'use strict';

const flexibility = (domToAnalyse) => {

	let infoCounter = 0;
	let alertCounter = 0;
	const pathElements = Array.from(domToAnalyse.querySelectorAll('[uxi-path]'));
	let pathsObject = {};
	let pathsMsg = ``;

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
		pathLiArray.push(`<li class="collection-item"><span class="description"><i class="material-icons info-icon">info</i>O <b>caminho</b> ${key} precisa de ${pathsObject[key]} ${pathsObject[key] === 1 ? '<b>passo</b>' : '<b>passos</b>'} para ser finalizado.</span></li>`);
		numberOfPaths++;
		infoCounter++;
	}

	if (pathLiArray.length === 0) {
		alertCounter++;
		pathsMsg = `<span class="description"><i class="material-icons alert-icon">warning</i>Essa funcionalidade não possui <b>caminho</b> para ser finalizada.</span>`;
	} else {
		infoCounter++;
		pathsMsg = `<span class="description"><i class="material-icons info-icon">info</i>Essa funcionalidade possui ${numberOfPaths} ${numberOfPaths === 1 ? '<b>caminho</b> possível' : '<b>caminhos</b> possíveis'} para ser finalizada.</span>`;
	}

	const infosMsg = `${infoCounter > 0 ? `<i class="material-icons info-icon">info</i>${infoCounter === 1 ? '1 informação' : `${infoCounter} informações`}` : ''}`;
	const alertsMsg = `${alertCounter > 0 ? `<i class="material-icons alert-icon">warning</i>${alertCounter === 1 ? '1 alerta' : `${alertCounter} alertas`}` : ''}`;
	const alertsAndInfosMsg = `<span class="infos-and-alerts">${infosMsg} ${(infoCounter && alertCounter) ? 'e' : ''} ${alertsMsg}</span>`;
	const report = `
		<ul class="collection with-header alerts-detected">
			<li class="collection-header">
				<h3>Flexibilidade e eficiência do uso // ${alertsAndInfosMsg}</h3>
				<a class="wiki-link" href="https://github.com/rafaelbaarbosa/ux-inspector/wiki" target="_blank">saiba mais sobre este princípio<i class="material-icons">open_in_new</i></a>
			</li>
			<li class="collection-item">${pathsMsg}</li>
			${pathLiArray.join('\n')}
		</ul>
	`;
	const result = {report: report, alertCounter: alertCounter, infoCounter: infoCounter};

	return result;

};