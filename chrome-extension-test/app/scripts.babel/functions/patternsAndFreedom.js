'use strict';

const patternsAndFreedom = (domToAnalyse) => {

	// Analisa se os elementos com tabindex são conteúdos interativos ou não
	let interactiveContentLi = ``;
	const interactiveContent = domToAnalyse.querySelectorAll('audio, img, input, menu, object, video, a, button, details, embed, iframe, label, select, textarea');
	const interactiveContentWithoutTabIndex = interactiveContent.filter((element) => {
		return !element.getAttribute('tabindex');
	});
	if (interactiveContentWithoutTabIndex.length > 0) {
		const elementsInsideLi = interactiveContentWithoutTabIndex.map((element) => {
			return `<li>${element.outerHTML}</li>`;
		});
		const elementsWithoutTabIndexList = `
			<ul class="more-info-list">
				${elementsInsideLi.join('\n')}
			</ul>
		`;
		interactiveContentLi = `
			<li>
				${elementsInsideLi.length === 1 ? 'Existe 1 elemento interativo sem tabindex na funcionalidade.' : `Existem ${elementsInsideLi.length} elementos interativos sem tabindex na funcionalidade.`}
				${elementsWithoutTabIndexList}
			</li>
		`;
	}

	// Analisa links e se eles estão quebrados ou não
	const urlExists = (url) => {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			let result = 0;
			xhr.onreadystatechange = () => {
				if (xhr.readyState === 4) {
					result = xhr.status < 400 ? 1 : 0;
				}
			};
			xhr.onerror = () => {
				result = -1;
			};
			xhr.onloadend = () => {
				resolve(result);
			};

			setTimeout(() => {
				xhr.open('HEAD', url);
				xhr.send();
			}, 2000);
		});
	}

	let brokenLinks = 0;
	let connectionErrors = 0;
	const links = Array.from(domToAnalyse.querySelectorAll('a'));
	let promises = [];

	for(let i = 0; i < links.length - 1; i++){
		(function(i){
			setTimeout(() => {
				let promise = urlExists(links[i].href);
				promises.push(promise.then(JSON.parse));
			},1000 * i);
		}(i));
	}

	setTimeout(() => {
		Promise.all(promises).then((results) => {
			for (let result of results) {
				switch (result) {
					case -1: // não conseguiu se conectar para obter resposta
						connectionErrors++;
						break;
					case 0: // o link não foi encontrado
						brokenLinks++;
					case 1:
					default:
						break;
				}
			}
			const brokenLinksLi = brokenLinks > 0 ? `${brokenLinks === 1 ? 'Existe 1 link quebrados na funcionalidade.' : `Existem ${brokenLinks} links quebrados na página.`}` : ``;
			const connectionErrorsLi = connectionErrors > 0 ? `${connectionErrors === 1 ? 'Devido a erros de conexão, em 1 link da funcionalidade não foi possível testar se ele leva para alguma página.' : `Devido a erros de conexão, em ${connectionErrors} links da funcionalidade não foi possível testar se eles levam para alguma página.`}` : '';
			return (`
				<h3>Consistência e padronização | Liberdade de controle fácil para o usuário</h3>
				<ul class="alerts-detected">
					${interactiveContentLi}
					${brokenLinksLi}
					${connectionErrorsLi}
				</ul>
			`);
		});
	}, 1001 * links.length);

};