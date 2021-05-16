import express from 'express';
import { registerUser } from '../controllers/auth.controller.js';

const authRoute = express.Router();

authRoute.route('/register').post(registerUser);

export default authRoute;
