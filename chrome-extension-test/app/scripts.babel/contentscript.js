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

	// for (const func of funcs){
	// 	console.log(`-------------- Análise da funcionalidade: ${func.getAttribute('uxi-func')}`);
	// 	console.log('------- Ajuda e documentação -------');
	// 	helpAndDoc(func);
	// 	console.log('------- Encontrar e se recuperar de erros -------');
	// 	findAndUndoErrors(func);
	// 	console.log('------- Visibilidade do estado do sistema -------');
	// 	systemState(func);
	// 	console.log('------- Prevenção de erros -------');
	// 	preventErrors(func);
	// 	console.log('------- Flexibilidade e eficiência do uso -------');
	// 	flexibility(func);
	// 	console.log('------- Consistência e padronização | Liberdade de controle fácil para o usuário -------');
	// 	patternsAndFreedom(func);
	// }

	if (!request.getReport) {
		// console.log('------- Ajuda e documentação -------');
		const helpAndDocReport = helpAndDoc(document);
		// console.log('------- Encontrar e se recuperar de erros -------');
		const findAndUndoErrorsReport = findAndUndoErrors(document);
		// console.log('------- Visibilidade do estado do sistema -------');
		const systemStateReport = systemState(document);
		// console.log('------- Prevenção de erros -------');
		const preventErrorsReport = preventErrors(document);
		// console.log('------- Flexibilidade e eficiência do uso -------');
		const flexibilityReport = flexibility(document);
		// console.log('------- Consistência e padronização | Liberdade de controle fácil para o usuário -------');
		// patternsAndFreedom(document);
		finalReport = `
			<h2>Relaório de teste :D</h2>
			<ul class="report">
				${helpAndDocReport}
				${findAndUndoErrorsReport}
				${systemStateReport}
				${preventErrorsReport}
				${flexibilityReport}
			</ul>
		`;
		sendResponse({data: data, success: true});
	} else {
		sendResponse({data: data, success: true, finalReport: finalReport});
	}

	// let data = flag ? 'Todas as imagens possuem ALT.' : 'Essa página possui uma ou mais imagens sem ALT.';

	// if (!request.getData) {
	// 	flag++;
	// }
});
