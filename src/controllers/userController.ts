import express, { Request, Response, Router } from 'express';
import * as userModel from '../models/user';

const router: Router = express.Router();

// Get all users
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await userModel.getUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a user by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const user = await userModel.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new user
router.post('/', async (req: Request, res: Response) => {
  try {
    const newUser = await userModel.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a user by ID
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedCount = await userModel.updateUser(req.params.id, req.body);
    if (updatedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a user by ID
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deletedCount = await userModel.deleteUser(req.params.id);
    if (deletedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
