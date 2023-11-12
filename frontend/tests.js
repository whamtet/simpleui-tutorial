const passSpan = '<span class="test-result" style="color: green; align-self: center; width: 4.5em; margin-left: auto;">🟢 pass</span>';
const failSpan = '<span class="test-result" style="color: red; align-self: center; width: 4.5em; margin-left: auto;">🔴 uh-oh</span>';

let testId = '';
let assertCounter = 0;
let allPass = true;

const $ = x => document.querySelector(x);

const assert = test => {
	let resultDiv = $(testId + assertCounter);
	resultDiv.innerHTML = test ? passSpan : failSpan;
	assertCounter++;
	allPass &= test;
};
const exists = x => x !== null;

const evalDiv = id => {
	testId = id;
	assertCounter = 0;
	allPass = true;

	for (el of document.querySelectorAll('.test-result')) {
		el.outerHTML = '';
	}

	const codeDiv = $(id);
	eval(`(async () => {${codeDiv.innerText}})()`);

	if (allPass) {
		$(id + '-run').classList.add('hidden');
		$(id + '-finish').classList.remove('hidden');
	}
};
