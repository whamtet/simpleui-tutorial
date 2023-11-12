const passSpan = '<span class="test-result" style="color: green; align-self: center; width: 4.5em; margin-left: auto;">🟢 pass</span>';
const failSpan = '<span class="test-result" style="color: red; align-self: center; width: 4.5em; margin-left: auto;">🔴 uh-oh</span>';

let testId = '';
let assertCounter = 0;

const $ = x => document.querySelector(x);

const assert = test => {
	let resultDiv = $(testId + assertCounter);
	resultDiv.innerHTML = test ? passSpan : failSpan;
	assertCounter++;
	if (!test) {
		throw 'uh oh';
	}
};
const exists = x => x !== null;

const evalDiv = async id => {
	testId = id;
	assertCounter = 0;

	const codeDiv = $(id);
	for (el of codeDiv.querySelectorAll('.test-result')) {
		el.outerHTML = '';
	}

	try {
		await eval(`(async () => {${codeDiv.innerText}})()`);
		$(id + '-run').classList.add('hidden');
		$(id + '-finish').classList.remove('hidden');
	} catch (e) {
		if (e !== 'uh oh') {
			throw e;
		}
	}
};
