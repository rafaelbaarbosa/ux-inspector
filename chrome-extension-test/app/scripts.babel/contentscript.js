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
	const linksCounter = eval(request.linksCounter);
	let promises = [];

	if (request.getTotalLinks) {
		let totalLinks = 0;
		if (funcs.length) {
			for (const func of funcs){
				totalLinks = totalLinks + linksCounter(func);
			}
		} else {
			totalLinks = totalLinks + linksCounter(document);
		}
		sendResponse({data: data, success: true, totalLinks: totalLinks});
	} else {

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
						const helpAndDocReport = helpAndDoc(funcs[i]).report;
						const findAndUndoErrorsReport = findAndUndoErrors(funcs[i]).report;
						const systemStateReport = systemState(funcs[i]).report;
						const preventErrorsReport = preventErrors(funcs[i]).report;
						const flexibilityReport = flexibility(funcs[i]).report;
						const totalAlerts = results[i].alertCounter + helpAndDoc(document).alertCounter + findAndUndoErrors(document).alertCounter + systemState(document).alertCounter + preventErrors(document).alertCounter + flexibility(document).alertCounter;
						const totalInfos = results[i].infoCounter + helpAndDoc(document).infoCounter + findAndUndoErrors(document).infoCounter + systemState(document).infoCounter + preventErrors(document).infoCounter + flexibility(document).infoCounter;
						const infosMsg = `${totalInfos > 0 ? `<i class="material-icons info-icon">info</i>${totalInfos === 1 ? '1 informação' : `${totalInfos} informações`}` : ''}`;
						const alertsMsg = `${totalAlerts > 0 ? `<i class="material-icons alert-icon">warning</i>${totalAlerts === 1 ? '1 alerta' : `${totalAlerts} alertas`}` : ''}`;
						const alertsAndInfosMsg = `<span class="infos-and-alerts">${infosMsg} ${(totalInfos && totalAlerts) ? 'e' : ''} ${alertsMsg}</span>`;
						const report = `
							<h2 class="func-name">Relatório de inspeção da funcionalidade ${funcs[i].getAttribute('uxi-func')}</h2>
							<h3 class="total-alerts-infos">Foram encontradas um total de ${alertsAndInfosMsg}.</h3>
							<section class="reports">
								${helpAndDocReport}
								${findAndUndoErrorsReport}
								${systemStateReport}
								${preventErrorsReport}
								${flexibilityReport}
								${results[i].report}
							</section>
						`;
	
						reports.push(report);
					}
		
					finalReport = `
						<h2>${funcs.length === 1 ? `A funcionalidade ${funcsTitles[0]} foi encontrada e, a seguir, as questões de usabilidade dela serão apresentadas.` : `Foram encontradas as funcionalidades ${funcsTitles.join('/')} e, a seguir, as questões de usabilidade de cada uma delas serão apresentadas.`}</h2>
						${reports.join('\n')}
					`;
					sendResponse({data: data, success: true});
				});
			} else {
				const helpAndDocReport = helpAndDoc(document).report;
				const findAndUndoErrorsReport = findAndUndoErrors(document).report;
				const systemStateReport = systemState(document).report;
				const preventErrorsReport = preventErrors(document).report;
				const flexibilityReport = flexibility(document).report;
		
				let promises = [];
				promises.push(patternsAndFreedom(document));
				Promise.all(promises).then((results) => {
					const totalAlerts = results[0].alertCounter + helpAndDoc(document).alertCounter + findAndUndoErrors(document).alertCounter + systemState(document).alertCounter + preventErrors(document).alertCounter + flexibility(document).alertCounter;
					const totalInfos = results[0].infoCounter + helpAndDoc(document).infoCounter + findAndUndoErrors(document).infoCounter + systemState(document).infoCounter + preventErrors(document).infoCounter + flexibility(document).infoCounter;
					const infosMsg = `${totalInfos > 0 ? `<i class="material-icons info-icon">info</i>${totalInfos === 1 ? '1 informação' : `${totalInfos} informações`}` : ''}`;
					const alertsMsg = `${totalAlerts > 0 ? `<i class="material-icons alert-icon">warning</i>${totalAlerts === 1 ? '1 alerta' : `${totalAlerts} alertas`}` : ''}`;
					const alertsAndInfosMsg = `<span class="infos-and-alerts">${infosMsg} ${(totalInfos && totalAlerts) ? 'e' : ''} ${alertsMsg}</span>`;
					finalReport = `
						<h2>Não foram encontradas funcionalidades na página, portanto todo o código da página foi tratado como uma funcionalidade.</h2>
						<h2 class="func-name">Relatório da página</h2>
						<h3 class="total-alerts-infos">Foram encontradas um total de ${alertsAndInfosMsg}.</h3>
						<section class="reports">
							${helpAndDocReport}
							${findAndUndoErrorsReport}
							${systemStateReport}
							${preventErrorsReport}
							${flexibilityReport}
							${results[0].report}
						</section>
					`;
					sendResponse({data: data, success: true});
				});
			}
	
		} else {
			sendResponse({data: data, success: true, finalReport: finalReport, pageUrl: window.location.href});
		}

	}

	return true;

});
