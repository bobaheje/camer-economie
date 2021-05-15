import { Router } from 'express';
import { AuthController } from './controllers/AuthController';
import { LoginController } from './controllers/LoginController';
import { UserController } from './controllers/UserController';
import { UserValidator } from './validators/UserValidator';



const router =Router();

//Login

router.get('/login', LoginController.showLogin);
router.post('/login', AuthController.userAuthenticate);
//User
router.get('/dashboard/user', AuthController.isLoggedIn, UserController.addUser);
router.get('/dashboard/user/pwupdate', AuthController.isLoggedIn, UserController.showUpdateUserPassword);
router.post('/dashboard/user/pwupdate', AuthController.isLoggedIn, UserValidator.getPasswordUpdateValidationRule(), UserValidator.validate, UserController.updateUserPassword);
router.post('/dashboard/user/save', AuthController.isLoggedIn, UserValidator.getValidationRule(), UserValidator.validate, UserController.createUser);


export{router};