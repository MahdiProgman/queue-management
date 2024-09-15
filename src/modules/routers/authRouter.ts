import express from 'express';
import userValidation from '../validators/userValidation.js';
import controller from '../controllers/authCtrl.js';
import refreshToken from '../../middlewares/refreshToken.js';

const router: express.Router = express.Router();

router.post(
    '/register',
    userValidation.registerValidation(),
    controller.validate,
    controller.register
);
router.post(
    '/login',
    userValidation.loginValidation(),
    controller.validate,
    controller.login
);

router.post(
    '/refresh-token',
    refreshToken,
    controller.refreshToken
);

export default router;
