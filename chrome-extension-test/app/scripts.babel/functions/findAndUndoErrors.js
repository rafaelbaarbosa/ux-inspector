'use strict';

const findAndUndoErrors = (domToAnalyse) => {
	const errorElements = domToAnalyse.querySelectorAll('[uxi-error]').length;
	console.log(`Existem ${errorElements} mensagens de erro na página.`);

	const undoErrorsElements = domToAnalyse.querySelectorAll('[uxi-undo-error]').length;
	console.log(`Existem ${undoErrorsElements} elementos que permitem a recuperação de erros na página.`);
};