const Router = require('koa-router');
const router = new Router();
const mainController = require('../controller/main');

router.get('/', mainController.sayHello);
router.get('/translate/', mainController.infoResponse);
router.get('/translate/:number', mainController.answerer);

module.exports = router.routes();