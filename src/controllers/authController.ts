import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userModel from '../models/user';

const router = express.Router();
const secretKey = process.env.SECRET_KEY || "";

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find the user in the database
    const user = await userModel.findOne({ email });

    // If the user doesn't exist, return an error
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the provided password with the stored password
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If the passwords don't match, return an error
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, secretKey);

    // Return the token to the client
    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/session', async (req: Request, res: Response) => {
  // Check if the token exists in the request headers
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    // Verify the token
    const decoded: any = jwt.verify(token, secretKey);

    // Find the user in the database based on the decoded token
    const user = await userModel.findOne({ _id: decoded.id });

    // If the user doesn't exist, return an error
    if (!user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Return the user's information to the client
    res.json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Invalid token' });
  }
});

export default router;
