import { Router } from 'express';
import { LoginController } from './controllers/LoginController';



const router =Router();

//Login

router.get('/login', LoginController.showLogin);


export{router};