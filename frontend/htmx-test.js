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

let currentEditor;
let waiting;

const waitResponse = new Promise(resolve => waiting = resolve);

htmx.defineExtension('htmx-test', {
	encodeParameters : function(xhr, parameters, elt) {
		const editorKey = elt.getAttribute('hx-editor');
		if (editorKey) {
			currentEditor = editors[editorKey];
		} // else it was set at the start of the test

		return urlEncode({...parameters, code: currentEditor.getValue()});
	},
	onEvent : function(name, evt) {
		if (name === 'htmx:afterSettle') {
			const originalTrigger = evt.detail.requestConfig.elt;
			const after = originalTrigger.getAttribute('hx-after');
			if (after) {
				evalDiv(after);
			} else if (waiting) {
				waiting();
			}
		}
	}
});
