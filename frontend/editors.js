const editors = {};
for (const el of document.querySelectorAll('.editor')) {
	const editor = ace.edit(el.id);
	editor.session.setMode('ace/mode/clojure');
	editors[el.id] = editor;
}
