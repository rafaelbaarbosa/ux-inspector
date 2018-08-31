'use strict';

console.log('\'Allo \'Allo! Popup');

const helpAndDocFunc = chrome.extension.getBackgroundPage().helpAndDoc;
const stringifiedHelpAndDocFunc = `(${helpAndDocFunc})`;

const findAndUndoErrorsFunc = chrome.extension.getBackgroundPage().findAndUndoErrors;
const stringifiedfindAndUndoErrorsFunc = `(${findAndUndoErrorsFunc})`;

const systemStateFunc = chrome.extension.getBackgroundPage().systemState;
const stringifiedSystemStateFunc = `(${systemStateFunc})`;

const preventErrorsFunc = chrome.extension.getBackgroundPage().preventErrors;
const stringifiedPreventErrorsFunc = `(${preventErrorsFunc})`;

const patternsAndFreedomFunc = chrome.extension.getBackgroundPage().patternsAndFreedom;
const stringifiedPatternsAndFreedomFunc = `(${patternsAndFreedomFunc})`;

const flexibilityFunc = chrome.extension.getBackgroundPage().flexibility;
const stringifiedFlexibilityFunc = `(${flexibilityFunc})`;

const createReport = () => {
	chrome.tabs.create({url: '../report.html', active: false});
};

const message = {
	data: 'data',
	helpAndDoc: stringifiedHelpAndDocFunc,
	findAndUndoErrors: stringifiedfindAndUndoErrorsFunc,
	systemState: stringifiedSystemStateFunc,
	preventErrors: stringifiedPreventErrorsFunc,
	patternsAndFreedom: stringifiedPatternsAndFreedomFunc,
	flexibility: stringifiedFlexibilityFunc,
	getReport: false
};

var el = document.getElementById('btn'); 
el.addEventListener('click', function() {

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
	    document.querySelector('h1').innerHTML = response.data;
	    console.log('-----------');
	    console.log(response);
	    console.log('success');
			console.log('-----------');

			createReport();

	  });
	});

});
