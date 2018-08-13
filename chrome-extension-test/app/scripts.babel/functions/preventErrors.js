'use strict';

const preventErrors = (domToAnalyse) => {

	// Verifica quantidade de elementos de alerta | avisa caso possua ações irreversíveis
	const alertElements = domToAnalyse.querySelectorAll('[uxi-alert]').length;
	const permanentActions = domToAnalyse.querySelectorAll('[uxi-permanent-action]').length;
	console.log(`Existem ${alertElements} elementos de alerta na página${permanentActions ? `, além disso existem ${permanentActions} ações permanentes.` : '.'}`);

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
	console.log(`Existem ${formsWithoutSubmit} forms sem nenhum elemento com type="submit".`);
	console.log(`Existem ${formsWithoutRequiredInputs} forms sem nenhum elemento required.`);
	console.log(`Existem ${inputsWithoutType} inputs sem type atribuído.`);

};