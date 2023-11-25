const router = () => {
	const currentProblem = location.hash.substring(1) || 'problem1';
	for (const page of document.querySelectorAll('.page')) {
		if (page.id === currentProblem) {
			page.classList.remove('hidden');
			if (page.title) {
				document.title = 'Simple UI - ' + page.title;
			} else {
				document.title = 'Simple UI';
			}
		} else {
			page.classList.add('hidden');
		}
	}
}

if (location.host !== 'localhost:8000') {
	onhashchange = router;
	router();
}
