'use strict';

const findAndUndoErrors = (domToAnalyse) => {
	const errorElements = domToAnalyse.querySelectorAll('[uxi-error]').length;
	const undoErrorsElements = domToAnalyse.querySelectorAll('[uxi-undo-error]').length;

	return (`
		<h3>Encontrar e se recuperar de erros</h3>
		<ul class="alerts-detected">
			<li>Existem ${errorElements} mensagens de erro na funcionalidade.</li>
			<li>Existem ${undoErrorsElements} elementos que permitem a recuperação de erros na funcionalidade.</li>
		</ul>
	`);
};