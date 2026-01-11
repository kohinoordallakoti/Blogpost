import express from 'express';
import { createUser, getUser, loginUser, logOutUser } from '../authcontroller/userAuth.js';

const router = express.Router();

router.post('/create', createUser);

router.post('/login', loginUser);

router.post('/logout', logOutUser)

router.get('/get', getUser);

export default router;