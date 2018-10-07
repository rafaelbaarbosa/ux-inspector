'use strict';

const linksCounter = (domToAnalyse) => {
	const links = Array.from(domToAnalyse.querySelectorAll('a'));	
	return links.length;
};