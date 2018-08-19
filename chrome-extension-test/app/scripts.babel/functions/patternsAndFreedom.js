'use strict';

const patternsAndFreedom = (domToAnalyse) => {

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
			xhr.open('HEAD', url);
			xhr.send();
		});
	}

	let brokenLinks = 0;
	let connectionErrors = 0;
	const links = Array.from(domToAnalyse.querySelectorAll('a'));

	console.log(links.length);

	const promises = links.map((link) => {
		let promise = urlExists(link.href);
		return promise.then(JSON.parse);
	});

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
		console.log(`Devido a erros de conexão, em ${connectionErrors} links não foi possível testar se ele leva a alguma página.`);
	});

};