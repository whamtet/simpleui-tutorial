const passSpan = '<span class="test-result" style="color: green; align-self: center; width: 4.5em; margin-left: auto;">🟢 pass</span>';
const failSpan = '<span class="test-result" style="color: red; align-self: center; width: 4.5em; margin-left: auto;">🔴 uh-oh</span>';

let testId = '';
let assertCounter = 0;
let allPass = true;

const assert = test => {
	let resultDiv = document.querySelector(testId + assertCounter);
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

	const codeDiv = document.querySelector(id);
	eval(codeDiv.innerText);
};
