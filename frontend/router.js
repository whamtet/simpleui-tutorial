const router = () => {
	const currentProblem = location.hash.substring(1) || 'problem1';
	for (const el of document.querySelectorAll('.page')) {
		if (el.id === currentProblem) {
			el.classList.remove('hidden');
		} else {
			el.classList.add('hidden');
		}
	}
}

onhashchange = router;
router();
