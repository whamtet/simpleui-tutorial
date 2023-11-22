const editors = {};
for (const el of document.querySelectorAll('.editor')) {
	const editor = ace.edit(el.id);
	editor.session.setMode('ace/mode/clojure');
	if (el.hasAttribute('watch')) {
		const trigger = document.getElementById(el.id.replace('editor', 'tests') + '-run');
		editor.session.on('change', () => trigger.click())
	}

	editors[el.id] = editor;
}
