import express from 'express';
import { createUser, deleteUser, getUser, loginUser, logOutUser } from '../authcontroller/userAuth.js';

const router = express.Router();

router.post('/create', createUser);

router.post('/login', loginUser);

router.post('/logout', logOutUser)

router.get('/get', getUser);

router.delete('/delete/:id', deleteUser);

export default router;