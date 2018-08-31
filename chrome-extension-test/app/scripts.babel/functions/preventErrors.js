'use strict';

const preventErrors = (domToAnalyse) => {

	// Verifica quantidade de elementos de alerta | avisa caso possua ações irreversíveis
	const alertElements = domToAnalyse.querySelectorAll('[uxi-alert]').length;
	const permanentActions = domToAnalyse.querySelectorAll('[uxi-permanent-action]').length;

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
	const formsWithoutSubmitLi = formsWithoutSubmit ? `<li>${formsWithoutSubmit === 1 ? 'Existe' : 'Existem'} ${formsWithoutSubmit} ${formsWithoutSubmit === 1 ? 'formulário' : 'formulários'} sem nenhum elemento com type="submit".</li>` : '';
	const formsWithoutRequiredInputsLi = formsWithoutRequiredInputs ? `<li>${formsWithoutRequiredInputs === 1 ? 'Existe' : 'Existem'} ${formsWithoutRequiredInputs} ${formsWithoutRequiredInputs === 1 ? 'formulário' : 'formulários'} sem nenhum elemento obrigatório.</li>` : '';
	const inputsWithoutTypeLi = inputsWithoutType ? `<li>${inputsWithoutType === 1 ? 'Existe' : 'Existem'} ${inputsWithoutType} ${inputsWithoutType === 1 ? 'input' : 'inputs'} sem type atribuído.</li>` : '';

	return (`
		<h3>Prevenção de erros</h3>
		<ul class="alerts-detected">
			<li>${alertElements === 1 ? 'Existe' : 'Existem'} ${alertElements} ${alertElements === 1 ? 'elemento' : 'elementos'} de alerta na página${permanentActions ? `, além disso ${permanentActions > 1 ? `existem ${permanentActions} ações permanentes.` : `existe ${permanentActions} ação permanente.`}` : '.'}</li>
			${formsWithoutSubmitLi}
			${formsWithoutRequiredInputsLi}
			${inputsWithoutTypeLi}
		</ul>
	`);

};