'use strict';

const findAndUndoErrors = (domToAnalyse) => {
	const errorElements = domToAnalyse.querySelectorAll('[uxi-error]').length;
	const undoErrorsElements = domToAnalyse.querySelectorAll('[uxi-undo-error]').length;
	let errorMsg = '';
	let undoErrorsMsg = '';
	let infoCounter = 0;
	let alertCounter = 0;

	if (errorElements === 0) {
		alertCounter++;
		errorMsg = `<span class="description"><i class="material-icons alert-icon">warning</i>Essa funcionalidade não possui nenhum elemento de mensagem de erro.</span>`;
	} else {
		infoCounter++;
		errorMsg = `<span class="description"><i class="material-icons info-icon">info</i>${errorElements === 1 ? 'Existe' : 'Existem'} ${errorElements} ${errorElements === 1 ? 'mensagem' : 'mensagens'} de erro na funcionalidade.</span>`;
	}

	if (undoErrorsElements === 0) {
		alertCounter++;
		undoErrorsMsg = `<span class="description"><i class="material-icons alert-icon">warning</i>Essa funcionalidade não possui nenhum elemento de recuperação de erros.</span>`;
	} else {
		infoCounter++;
		undoErrorsMsg = `<span class="description"><i class="material-icons info-icon">info</i>${undoErrorsElements === 1 ? 'Existe' : 'Existem'} ${undoErrorsElements} ${undoErrorsElements === 1 ? 'elemento' : 'elementos'} de recuperação de erros na funcionalidade.</span>`;
	}

	const infosMsg = `${infoCounter > 0 ? `<i class="material-icons info-icon">info</i>${infoCounter === 1 ? '1 informação' : `${infoCounter} informações`}` : ''}`;
	const alertsMsg = `${alertCounter > 0 ? `<i class="material-icons alert-icon">warning</i>${alertCounter === 1 ? '1 alerta' : `${alertCounter} alertas`}` : ''}`;
	const alertsAndInfosMsg = `<span class="infos-and-alerts">${infosMsg} ${(infoCounter && alertCounter) ? 'e' : ''} ${alertsMsg}</span>`;

	return (`
		<ul class="collection with-header alerts-detected">
			<li class="collection-header"><h3>Encontrar e se recuperar de erros // ${alertsAndInfosMsg}</h3></li>
			<li class="collection-item">${errorMsg}</li>
			<li class="collection-item">${undoErrorsMsg}</li>
		</ul>
	`);
};