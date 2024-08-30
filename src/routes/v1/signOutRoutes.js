
import express from 'express';
const signOutRouter = express.Router();

signOutRouter.post('/signout', (req, res) => {
  // Clear cookies
  res.clearCookie('token', { path: '/' });
  res.clearCookie('refreshToken', { path: '/' });

  // Optionally, handle any server-side session or token invalidation here

  res.status(200).json({ message: 'Signed out successfully' });
});

export default signOutRouter;
