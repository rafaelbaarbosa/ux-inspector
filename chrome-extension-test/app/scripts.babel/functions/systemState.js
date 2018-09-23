'use strict';

const systemState = (domToAnalyse) => {
	let infoCounter = 0;
	let alertCounter = 0;

	// Verifica elementos para visuaizar estado do sistema
	const systemStateElements = domToAnalyse.querySelectorAll('[uxi-state]').length;
	let systemStateMsg = ``;
	if (systemStateElements === 0) {
		alertCounter++;
		systemStateMsg = `<span class="description"><i class="material-icons alert-icon">warning</i>Essa funcionalidade não possui elemento de visualização de estado do sistema.</span>`;
	} else {
		infoCounter++;
		systemStateMsg = `<span class="description"><i class="material-icons info-icon">info</i>${systemStateElements === 1 ? 'Existe' : 'Existem'} ${systemStateElements} ${systemStateElements === 1 ? 'elemento' : 'elementos'} de visualização do estado do sistema na funcionalidade.</span>`;
	}
	
	// Verifica se página possui title
	let pageTitleLi = ``;
	if (!document.querySelectorAll('title').length) {
		alertCounter++;
		pageTitleLi = `<li class="collection-item"><span class="description"><i class="material-icons alert-icon">warning</i>Essa página não possui title.</span></li>`
	}
	
	// Verifica quantos elementos de feedback existem
	const numberOfActions = domToAnalyse.querySelectorAll('[uxi-primary-action], [uxi-finishing-action], [uxi-cancel-action], [uxi-permanent-action]').length;
	const feedbackElements = domToAnalyse.querySelectorAll('[uxi-feedback]').length;
	let feedbackMsg = ``;
	if (feedbackElements === 0) {
		alertCounter++;
		feedbackMsg = `<span class="description"><i class="material-icons alert-icon">warning</i>Essa funcionalidade não possui elemento para apresentar feedback.</span>`;
	} else {
		infoCounter++;
		feedbackMsg = `<span class="description"><i class="material-icons info-icon">info</i>${feedbackElements === 1 ? 'Existe' : 'Existem'} ${feedbackElements} ${feedbackElements === 1 ? 'elemento' : 'elementos'} para apresentar feedback na funcionalidade.</span>`;
	}

	// Verifica elementos para finalizar ação
	const finishingActionElements = domToAnalyse.querySelectorAll('[uxi-finishing-action]').length;
	let finishingActionMsg = ``;
	if (finishingActionElements === 0) {
		alertCounter++;
		finishingActionMsg = `<span class="description"><i class="material-icons alert-icon">warning</i>Essa funcionalidade não possui elemento que permite ao usuário finalizar a sua tarefa principal.</span>`;
	} else {
		infoCounter++;
		finishingActionMsg = `<span class="description"><i class="material-icons info-icon">info</i>${finishingActionElements === 1 ? 'Existe' : 'Existem'} ${finishingActionElements} ${finishingActionElements === 1 ? 'elemento' : 'elementos'} que permitem ao usuário finalizar a tarefa principal da funcionalidade.</span>`;
	}

	// Verifica elementos de ação primária
	const primaryActionElements = domToAnalyse.querySelectorAll('[uxi-primary-action]').length;
	let primaryActionMsg = ``;
	if (primaryActionElements === 0) {
		alertCounter++;
		primaryActionMsg = `<span class="description"><i class="material-icons alert-icon">warning</i>Essa funcionalidade não possui elemento de ação primária.</span>`;
	} else {
		infoCounter++;
		primaryActionMsg = `<span class="description"><i class="material-icons info-icon">info</i>${primaryActionElements === 1 ? 'Existe' : 'Existem'} ${primaryActionElements} ${primaryActionElements === 1 ? 'elemento' : 'elementos'} de ação primária na funcionalidade.</span>`;
	}

	// Verifica elementos de cancelamento
	const cancelActionElements = domToAnalyse.querySelectorAll('[uxi-cancel-action]').length;
	let cancelActionMsg = ``;
	if (cancelActionElements === 0) {
		alertCounter++;
		cancelActionMsg = `<span class="description"><i class="material-icons alert-icon">warning</i>Essa funcionalidade não possui elemento de cancelar uma ação que o usuário tenha feito.</span>`;
	} else {
		infoCounter++;
		cancelActionMsg = `<span class="description"><i class="material-icons info-icon">info</i>${cancelActionElements === 1 ? 'Existe' : 'Existem'} ${cancelActionElements} ${cancelActionElements === 1 ? 'elemento' : 'elementos'} de cancelar uma ação que o usuário tenha feito na funcionalidade.</span>`;
	}

	// Verifica elementos de ação permanente
	const permanentActionElements = domToAnalyse.querySelectorAll('[uxi-permanent-action]').length;
	let permanentActionMsg = ``;
	if (permanentActionElements === 0) {
		infoCounter++;
		permanentActionMsg = `<span class="description"><i class="material-icons info-icon">info</i>Essa funcionalidade não possui elemento de ação permanente.</span>`;
	} else {
		infoCounter++;
		permanentActionMsg = `<span class="description"><i class="material-icons info-icon">info</i>${permanentActionElements === 1 ? 'Existe' : 'Existem'} ${permanentActionElements} ${permanentActionElements === 1 ? 'elemento' : 'elementos'} de ação permanente na funcionalidade.</span>`;
	}

	const infosMsg = `${infoCounter > 0 ? `<i class="material-icons info-icon">info</i>${infoCounter === 1 ? '1 informação' : `${infoCounter} informações`}` : ''}`;
	const alertsMsg = `${alertCounter > 0 ? `<i class="material-icons alert-icon">warning</i>${alertCounter === 1 ? '1 alerta' : `${alertCounter} alertas`}` : ''}`;
	const alertsAndInfosMsg = `<span class="infos-and-alerts">${infosMsg} ${(infoCounter && alertCounter) ? 'e' : ''} ${alertsMsg}</span>`;
	const report = `
		<ul class="collection with-header alerts-detected">
			<li class="collection-header">
				<h3>Visibilidade do estado do sistema // ${alertsAndInfosMsg}</h3>
				<a class="wiki-link" href="https://github.com/rafaelbaarbosa/ux-inspector/wiki" target="_blank">saiba mais sobre este princípio<i class="material-icons">open_in_new</i></a>
			</li>
			<li class="collection-item">${systemStateMsg}</li>
			${pageTitleLi}
			<li class="collection-item">${feedbackMsg}</li>
			<li class="collection-item">${finishingActionMsg}</li>
			<li class="collection-item">${primaryActionMsg}</li>
			<li class="collection-item">${cancelActionMsg}</li>
			<li class="collection-item">${permanentActionMsg}</li>
		</ul>
	`;

	const result = {report: report, alertCounter: alertCounter, infoCounter: infoCounter};

	return result;

};