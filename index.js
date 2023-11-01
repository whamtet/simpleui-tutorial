const Router = require('itty-router').Router;
// Create a new router
const router = Router();

/*
Our index route, a simple hello world.
*/
router.get('/', () => {
	return new Response('Hello, world! This is the root page of your Worker template.');
});

export default {
	fetch: router.handle,
};
