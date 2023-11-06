const Router = require('itty-router').Router;
const handler = require('./cljs/main.js').simpleui.app.handler;
// Create a new router
const router = Router();

/*
Our index route, a simple hello world.
*/
router.post('/', handler);

export default {
	fetch: router.handle,
};
