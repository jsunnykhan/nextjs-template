import { Router } from 'express';
import { loginResponse } from '../responses/auth-response.ts';

const router = Router();

router.get('/login', (req, res) => res.status(201).json(loginResponse));

export default router;
