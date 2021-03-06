'use strict';

const patternsAndFreedom = (domToAnalyse) => {
	let infoCounter = 0;
	let alertCounter = 0;

	// Analisa se os elementos conteúdos interativos possuem tabindex ou não
	let interactiveContentLi = ``;
	const interactiveContent = Array.from(domToAnalyse.querySelectorAll('audio, img, input, menu, object, video, a, button, details, embed, iframe, label, select, textarea'));
	const interactiveContentWithoutTabIndex = interactiveContent.filter((element) => {
		return !element.getAttribute('tabindex');
	});
	if (interactiveContentWithoutTabIndex.length > 0) {
		const elementsInsideLi = interactiveContentWithoutTabIndex.map((element) => {
			return `<li class="collection-item">${element.outerHTML}</li>`;
		});
		const elementsWithoutTabIndexList = `
			<ul class="collection more-info-list">
				${elementsInsideLi.join('\n')}
			</ul>
		`;
		interactiveContentLi = `
			<li class="collection-item">
				<span class="description"><i class="material-icons alert-icon">warning</i>${elementsInsideLi.length === 1 ? 'Existe 1 elemento <b>interativo</b> sem <code>tabindex</code> na funcionalidade.' : `Existem ${elementsInsideLi.length} elementos <b>interativos</b> sem <code>tabindex</code> na funcionalidade.`}</span>
				<button class="btn waves-effect waves-light toggle-more-info" type="button" name="action"><i class="material-icons">expand_more</i><i class="material-icons hide">expand_less</i></button>
				${elementsWithoutTabIndexList}
			</li>
		`;

		alertCounter++;
	}

	// Analisa links e se eles estão quebrados ou não
	const urlExists = (url) => {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			let result = 0;
			xhr.onreadystatechange = () => {
				if (xhr.readyState === 4) {
					result = xhr.status === 404 ? 0 : 1;
				}
			};
			xhr.onerror = () => {
				result = -1;
			};
			xhr.onloadend = () => {
				resolve(result);
			};

			xhr.open('HEAD', url);
			xhr.send();
		});
	}

	let brokenLinks = 0;
	let connectionErrors = 0;
	const links = Array.from(domToAnalyse.querySelectorAll('a'));
	let promises = [];

	return new Promise((resolve, reject) => {
		for(let i = 0; i < links.length; i++){
			(function(i){
				setTimeout(() => {
					let promise = urlExists(links[i].href);
					promises.push(promise.then(JSON.parse));
				}, 1000 * i);
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

				let brokenLinksLi = ``;
				if (brokenLinks) {
					alertCounter++;
					brokenLinksLi = `<li class="collection-item"><span class="description"><i class="material-icons alert-icon">warning</i>${brokenLinks === 1 ? 'Existe 1 <b>link quebrado</b> na funcionalidade.' : `Existem ${brokenLinks} <b>links quebrados</b> na funcionalidade.`}</span></li>`;
				}

				let connectionErrorsLi = ``;
				if (connectionErrors) {
					infoCounter++;
					connectionErrorsLi = `<li class="collection-item"><span class="description"><i class="material-icons info-icon">info</i>${connectionErrors === 1 ? 'Devido a erros de conexão, em 1 <b>link</b> da funcionalidade não foi possível testar se ele leva para alguma página.' : `Devido a erros de conexão, em ${connectionErrors} <b>links</b> da funcionalidade não foi possível testar se eles levam para alguma página.`}</span></li>`;
				}

				const infosMsg = `${infoCounter > 0 ? `<i class="material-icons info-icon">info</i>${infoCounter === 1 ? '1 informação' : `${infoCounter} informações`}` : ''}`;
				const alertsMsg = `${alertCounter > 0 ? `<i class="material-icons alert-icon">warning</i>${alertCounter === 1 ? '1 alerta' : `${alertCounter} alertas`}` : ''}`;
				const alertsAndInfosMsg = `<span class="infos-and-alerts">${infosMsg} ${(infoCounter && alertCounter) ? 'e' : ''} ${alertsMsg}</span>`;
				const report = `
					<ul class="collection with-header alerts-detected">
						<li class="collection-header">
							<h3>Consistência e padronização | Liberdade de controle fácil para o usuário // ${alertsAndInfosMsg}</h3>
							<a class="wiki-link" href="https://github.com/rafaelbaarbosa/ux-inspector/wiki" target="_blank">saiba mais sobre estes princípios<i class="material-icons">open_in_new</i></a>
						</li>
						${interactiveContentLi}
						${brokenLinksLi}
						${connectionErrorsLi}
					</ul>
				`;
				const result = {report: report, alertCounter: alertCounter, infoCounter: infoCounter};

				resolve(result);
			});
		}, 1001 * links.length);
	
		
	});

};