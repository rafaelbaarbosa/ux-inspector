'use strict';

const patternsAndFreedom = (domToAnalyse) => {

	// Analisa se os elementos com tabindex são conteúdos interativos ou não
	const interactiveContent = ['audio', 'img', 'input', 'menu', 'object', 'video', 'a', 'button', 'details', 'embed', 'iframe', 'label', 'select', 'textarea'];
	const elementsWithTabindex = domToAnalyse.querySelectorAll('[tabindex]');
	let nonInteractiveContentWithTabIndex = 0;

	for (let element of elementsWithTabindex) {
		if (!interactiveContent.includes(element.localName))
			nonInteractiveContentWithTabIndex++;
	}

	console.log(`Existe ${nonInteractiveContentWithTabIndex} dos ${elementsWithTabindex.length} elementos utilizando tab index que são conteúdos não interativos.`)

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

	const delay = (amount = number) => {
		return new Promise((resolve) => {
			setTimeout(resolve, amount);
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
			console.log(`Existem ${brokenLinks} links quebrados na página.`);
			console.log(`Devido a erros de conexão, em ${connectionErrors} links não foi possível testar se ele leva para alguma página.`);
		});
	}, 1001 * links.length);

};