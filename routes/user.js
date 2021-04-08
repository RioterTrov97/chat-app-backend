const router = require('express').Router();
const { catchErrors } = require('../handlers/errorHandlers');
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

router.post('/login', catchErrors(userController.login));
router.post('/register', catchErrors(userController.register));
router.get('/me', auth, catchErrors(userController.checkToken));
router.post('/', auth, catchErrors(userController.getUserName));

module.exports = router;
