'use strict';

const systemState = (domToAnalyse) => {
	// Verifica elementos para visuaizar estado do sistema
	const systemStateElements = domToAnalyse.querySelectorAll('[uxi-state]').length;
	console.log(`Existem ${systemStateElements} elementos que permitem a visualiazação do estado do sistema.`);
	
	// Verifica se página possui title
	if (!document.querySelectorAll('title').length)
		console.log('Página não possui title.');
	
	// Verifica quantos elementos de feedback existem em comparação com o número de ações
	const numberOfActions = domToAnalyse.querySelectorAll('[uxi-primary-action], [uxi-finishing-action], [uxi-cancel-action], [uxi-permanent-action]').length;
	const feedbackElements = domToAnalyse.querySelectorAll('[uxi-feedback]').length;
	console.log(`Existem ${numberOfActions} ações e ${feedbackElements} elementos para dar feedback.`);
};