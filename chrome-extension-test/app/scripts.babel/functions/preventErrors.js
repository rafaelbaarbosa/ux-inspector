'use strict';

const preventErrors = (domToAnalyse) => {
	let infoCounter = 0;
	let alertCounter = 0;

	// Verifica quantidade de elementos de alerta | avisa caso possua ações irreversíveis
	const alertElements = domToAnalyse.querySelectorAll('[uxi-alert]').length;
	const permanentActions = domToAnalyse.querySelectorAll('[uxi-permanent-action]').length;
	let alertMsg = ``;
	if (alertElements === 0) {
		alertCounter++;
		alertMsg = `<span class="description"><i class="material-icons alert-icon">warning</i>Essa funcionalidade não possui elemento de mensagem de alerta.</span>`;
	} else {
		infoCounter++;
		alertMsg = `<span class="description"><i class="material-icons info-icon">info</i>${alertElements === 1 ? 'Existe' : 'Existem'} ${alertElements} ${alertElements === 1 ? 'elemento' : 'elementos'} de alerta na página${permanentActions ? `, além disso ${permanentActions > 1 ? `existem ${permanentActions} ações permanentes.` : `existe ${permanentActions} ação permanente.`}` : '.'}</span>`;
	}

	// Verifica forms sem elemento para input, sem inputs required e inputs sem type.
	const forms = domToAnalyse.querySelectorAll('form');
	let formsWithoutSubmit = 0;
	let formsWithoutRequiredInputs = 0;
	let inputsWithoutType = 0;
	for (let form of forms) {
		if ( !form.querySelectorAll('[type="submit"]').length )
			formsWithoutSubmit++;

		if ( !form.querySelectorAll('[required]').length )
			formsWithoutRequiredInputs++;

		inputsWithoutType = inputsWithoutType + (form.querySelectorAll('input').length - form.querySelectorAll('input[type]').length);
	}

	let formsWithoutSubmitLi = ``;
	if (formsWithoutSubmit) {
		alertCounter++;
		formsWithoutSubmitLi = `<li class="collection-item"><span class="description"><i class="material-icons alert-icon">warning</i>${formsWithoutSubmit === 1 ? 'Existe' : 'Existem'} ${formsWithoutSubmit} ${formsWithoutSubmit === 1 ? 'formulário' : 'formulários'} sem nenhum elemento com type="submit".</span></li>`;
	}

	let formsWithoutRequiredInputsLi = ``;
	if (formsWithoutRequiredInputs) {
		alertCounter++;
		formsWithoutRequiredInputsLi = `<li class="collection-item"><span class="description"><i class="material-icons alert-icon">warning</i>${formsWithoutRequiredInputs === 1 ? 'Existe' : 'Existem'} ${formsWithoutRequiredInputs} ${formsWithoutRequiredInputs === 1 ? 'formulário' : 'formulários'} sem nenhum elemento obrigatório.</span></li>`;
	}

	let inputsWithoutTypeLi = ``;
	if (inputsWithoutType) {
		alertCounter++;
		inputsWithoutTypeLi = `<li class="collection-item"><span class="description"><i class="material-icons alert-icon">warning</i>${inputsWithoutType === 1 ? 'Existe' : 'Existem'} ${inputsWithoutType} ${inputsWithoutType === 1 ? 'input' : 'inputs'} sem type atribuído.</span></li>`;
	}

	const infosMsg = `${infoCounter > 0 ? `<i class="material-icons info-icon">info</i>${infoCounter === 1 ? '1 informação' : `${infoCounter} informações`}` : ''}`;
	const alertsMsg = `${alertCounter > 0 ? `<i class="material-icons alert-icon">warning</i>${alertCounter === 1 ? '1 alerta' : `${alertCounter} alertas`}` : ''}`;
	const alertsAndInfosMsg = `<span class="infos-and-alerts">${infosMsg} ${(infoCounter && alertCounter) ? 'e' : ''} ${alertsMsg}</span>`;
	const report = `
		<ul class="collection with-header alerts-detected">
			<li class="collection-header">
				<h3>Prevenção de erros // ${alertsAndInfosMsg}</h3>
				<a class="wiki-link" href="https://github.com/rafaelbaarbosa/ux-inspector/wiki" target="_blank">saiba mais sobre este princípio<i class="material-icons">open_in_new</i></a>
			</li>
			<li class="collection-item">${alertMsg}</li>
			${formsWithoutSubmitLi}
			${formsWithoutRequiredInputsLi}
			${inputsWithoutTypeLi}
		</ul>
	`;
	const result = {report: report, alertCounter: alertCounter, infoCounter: infoCounter};

	return result;

};