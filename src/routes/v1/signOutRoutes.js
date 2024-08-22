// server/routes/auth.js

import express from 'express';
const signOutRouter = express.Router();

signOutRouter.post('/signout', (req, res) => {
  // Clear cookies
  res.clearCookie('token');
  res.clearCookie('refreshToken');

  // Respond with success
  res.status(200).json({ message: 'Sign out successful' });
});

export default signOutRouter;
