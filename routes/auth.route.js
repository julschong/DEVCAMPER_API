import express from 'express';
import { login, registerUser } from '../controllers/auth.controller.js';

const authRoute = express.Router();

authRoute.route('/register').post(registerUser);
authRoute.route('/login').post(login);

export default authRoute;
