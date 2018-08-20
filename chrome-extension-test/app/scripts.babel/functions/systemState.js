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

	// Verifica elementos para finalizar ação
	const finishingActionElements = domToAnalyse.querySelectorAll('[uxi-finishing-action]').length;
	console.log(`Existem ${finishingActionElements} elementos que permitem ao usuário finalizar a tarefa principal da funcionalidade em questão.`);

	// Verifica elementos de ação primária
	const primaryActionElements = domToAnalyse.querySelectorAll('[uxi-primary-action]').length;
	console.log(`Existem ${primaryActionElements} elementos de ação primária na funcionalidade em questão.`);

	// Verifica elementos de cancelamento
	const cancelActionElements = domToAnalyse.querySelectorAll('[uxi-cancel-action]').length;
	console.log(`Existem ${cancelActionElements} elementos de que permitem o usuário cancelar uma ação que ele tenha feito na funcionalidade em questão.`);

	// Verifica elementos de ação permanente
	const permanentActionElements = domToAnalyse.querySelectorAll('[uxi-permanent-action]').length;
	console.log(`Existem ${permanentActionElements} elementos de que permitem o usuário realizar uma ação permanent na funcionalidade em questão.`);
};