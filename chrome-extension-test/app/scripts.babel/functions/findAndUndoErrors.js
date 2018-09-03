'use strict';

const findAndUndoErrors = (domToAnalyse) => {
	const errorElements = domToAnalyse.querySelectorAll('[uxi-error]').length;
	const undoErrorsElements = domToAnalyse.querySelectorAll('[uxi-undo-error]').length;

	return (`
		<ul class="collection with-header alerts-detected">
			<li class="collection-header"><h3>Encontrar e se recuperar de erros</h3></li>
			<li class="collection-item">${errorElements === 1 ? 'Existe' : 'Existem'} ${errorElements} ${errorElements === 1 ? 'mensagem' : 'mensagens'} de erro na funcionalidade.</li>
			<li class="collection-item">${undoErrorsElements === 1 ? 'Existe' : 'Existem'} ${undoErrorsElements} ${undoErrorsElements === 1 ? 'elemento' : 'elementos'} de recuperação de erros na funcionalidade.</li>
		</ul>
	`);
};