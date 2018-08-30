'use strict';

const systemState = (domToAnalyse) => {
	// Verifica elementos para visuaizar estado do sistema
	const systemStateElements = domToAnalyse.querySelectorAll('[uxi-state]').length;
	
	// Verifica se página possui title
	let pageTitleLi = ``;
	if (!document.querySelectorAll('title').length)
		pageTitleLi = `<li>Essa página não possui title.</li>`
	
	// Verifica quantos elementos de feedback existem em comparação com o número de ações
	const numberOfActions = domToAnalyse.querySelectorAll('[uxi-primary-action], [uxi-finishing-action], [uxi-cancel-action], [uxi-permanent-action]').length;
	const feedbackElements = domToAnalyse.querySelectorAll('[uxi-feedback]').length;

	// Verifica elementos para finalizar ação
	const finishingActionElements = domToAnalyse.querySelectorAll('[uxi-finishing-action]').length;

	// Verifica elementos de ação primária
	const primaryActionElements = domToAnalyse.querySelectorAll('[uxi-primary-action]').length;

	// Verifica elementos de cancelamento
	const cancelActionElements = domToAnalyse.querySelectorAll('[uxi-cancel-action]').length;

	// Verifica elementos de ação permanente
	const permanentActionElements = domToAnalyse.querySelectorAll('[uxi-permanent-action]').length;

	return (`
		<h3>Ajuda e documentação</h3>
		<ul class="alerts-detected">
			<li>${systemStateElements === 1 ? 'Existe' : 'Existem'} ${systemStateElements} ${systemStateElements === 1 ? 'elemento' : 'elementos'} de visualiazação do estado do sistema.</li>
			${pageTitleLi}
			<li>${feedbackElements === 1 ? 'Existe' : 'Existem'} ${feedbackElements} ${feedbackElements === 1 ? 'elemento' : 'elementos'} para dar feedback.</li>
			<li>${finishingActionElements === 1 ? 'Existe' : 'Existem'} ${finishingActionElements} ${finishingActionElements === 1 ? 'elemento' : 'elementos'} que permitem ao usuário finalizar a tarefa principal da funcionalidade em questão.</li>
			<li>${primaryActionElements === 1 ? 'Existe' : 'Existem'} ${primaryActionElements} ${primaryActionElements === 1 ? 'elemento' : 'elementos'} de ação primária na funcionalidade em questão.</li>
			<li>${cancelActionElements === 1 ? 'Existe' : 'Existem'} ${cancelActionElements} ${cancelActionElements === 1 ? 'elemento' : 'elementos'} de cancelar uma ação que o usuário tenha feito na funcionalidade em questão.</li>
			<li>${permanentActionElements === 1 ? 'Existe' : 'Existem'} ${permanentActionElements} ${permanentActionElements === 1 ? 'elemento' : 'elementos'} de ação permanente na funcionalidade em questão.</li>
		</ul>
	`);

};