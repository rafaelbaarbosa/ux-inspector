'use strict';

console.log('\'Allo \'Allo! Content script');

let flag = 0;
let finalReport = ``;

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  var data = request.data + 'bye' || {};

	const funcs = document.querySelectorAll('[uxi-func]');

	const helpAndDoc = eval(request.helpAndDoc);
	const findAndUndoErrors = eval(request.findAndUndoErrors);
	const systemState = eval(request.systemState);
	const preventErrors = eval(request.preventErrors);
	const patternsAndFreedom = eval(request.patternsAndFreedom);
	const flexibility = eval(request.flexibility);
	let promises = [];

	if (!request.getReport) {

		if (funcs.length) {
			let reports = [];
			let funcsTitles = [];
			for (const func of funcs){
				promises.push(patternsAndFreedom(func));
				funcsTitles.push(func.getAttribute('uxi-func'));
			}
	
			Promise.all(promises).then((results) => {
	
				for (let i = 0; i < results.length; i++) {
					const helpAndDocReport = helpAndDoc(funcs[i]);
					const findAndUndoErrorsReport = findAndUndoErrors(funcs[i]);
					const systemStateReport = systemState(funcs[i]);
					const preventErrorsReport = preventErrors(funcs[i]);
					const flexibilityReport = flexibility(funcs[i]);
					const report = `
						<h2>Relatório de inspeção da funcionalidade ${funcs[i].getAttribute('uxi-func')}</h2>
						<section class="reports">
							${helpAndDocReport}
							${findAndUndoErrorsReport}
							${systemStateReport}
							${preventErrorsReport}
							${flexibilityReport}
							${results[i]}
						</section>
					`;
					reports.push(report);
				}
	
				finalReport = `
					<h2>${funcs.length === 1 ? `A funcionalidade ${funcsTitles[0]} foi encontrada e a seguir as questões de usabilidade dela serão apresentadas.` : `Foram encontradas as funcionalidades ${funcsTitles.join(', ')} e a seguir as questões de usabilidade de cada uma delas serão apresentadas.`}</h2>
					${reports.join('\n')}
				`;
				sendResponse({data: data, success: true});
			});
		} else {
			const helpAndDocReport = helpAndDoc(document);
			const findAndUndoErrorsReport = findAndUndoErrors(document);
			const systemStateReport = systemState(document);
			const preventErrorsReport = preventErrors(document);
			const flexibilityReport = flexibility(document);
	
			let promises = [];
			promises.push(patternsAndFreedom(document));
			Promise.all(promises).then((results) => {
				finalReport = `
					<h2>Não foram encontradas funcionalidades na página, portanto todo o código da página foi tratado como uma funcionalidade.</h2>
					<h2>Relatório da página</h2>
					<section class="reports">
						${helpAndDocReport}
						${findAndUndoErrorsReport}
						${systemStateReport}
						${preventErrorsReport}
						${flexibilityReport}
						${results[0]}
					</section>
				`;
				sendResponse({data: data, success: true});
			});
		}

	} else {
		sendResponse({data: data, success: true, finalReport: finalReport});
	}

	return true;

});
