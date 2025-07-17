import { Router } from 'express';
import { addPoints, getAllUsers, addNewUser } from '../controllers/user.controller.js';

const router = Router();

// POST /api/users/:userId/add-points
router.post('/:userId/add-points', addPoints);

// GET /api/users/
router.get('/', getAllUsers);

router.post('/', addNewUser);

// GET /api/users/leaderboard (example additional endpoint)


export default router;