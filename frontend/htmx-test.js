function appendParam(returnStr, name, realValue) {
	if (returnStr !== "") {
		returnStr += "&";
	}
	if (String(realValue) === "[object Object]") {
		realValue = JSON.stringify(realValue);
	}
	var s = encodeURIComponent(realValue);
	returnStr += encodeURIComponent(name) + "=" + s;
	return returnStr;
}

function urlEncode(values) {
	var returnStr = "";
	for (var name in values) {
		if (values.hasOwnProperty(name)) {
			var value = values[name];
			if (Array.isArray(value)) {
				forEach(value, function(v) {
					returnStr = appendParam(returnStr, name, v);
				});
			} else {
				returnStr = appendParam(returnStr, name, value);
			}
		}
	}
	return returnStr;
}

let waiting;

const response = () => new Promise(resolve => waiting = resolve);
const click = el => {
	el.click();
	return response();
};

const getOutputParent = e => (e && e.id && e.id.startsWith('output')) ? e : e && getOutputParent(e.parentElement);

htmx.defineExtension('htmx-test', {
	encodeParameters: function(xhr, parameters, elt) {
		const hxTarget = elt.getAttribute('hx-target');
		const target = hxTarget ? document.querySelector(hxTarget) : elt;
		const editorParent = getOutputParent(target);
		const editorKey = editorParent.id.replace('output', 'editor');
		return urlEncode({...parameters, code: editors[editorKey].getValue()});
	},
	onEvent: function(name, evt) {
		if (name === 'htmx:configRequest') {
			const backend = location.host === 'localhost:8000' ? 'http://localhost:8787/' : "https://simpleui.simpleui.workers.dev/"
			evt.detail.path = backend + evt.detail.path;
		} else if (name === 'htmx:afterSettle') {
			const originalTrigger = evt.detail.requestConfig.elt;
			let hxAfter = originalTrigger.getAttribute('hx-after');
			if (!hxAfter && (!originalTrigger.id || !originalTrigger.id.endsWith('-run'))) {
				const outputParent = getOutputParent(evt.detail.elt);
				if (outputParent) {
					hxAfter = outputParent.getAttribute('hx-after');
				}
			}

			if (hxAfter) {
				evalDiv(hxAfter);
			} else if (waiting) {
				waiting();
			}
		}
	}
});

htmx.config.defaultSwapStyle = 'outerHTML';
htmx.config.defaultSettleDelay = 0;
