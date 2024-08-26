
import express from 'express';
const signOutRouter = express.Router();

signOutRouter.post('/signout', (req, res) => {
  
  res.clearCookie('token');
  res.clearCookie('refreshToken');

  
  res.status(200).json({ message: 'Sign out successful' });
});

export default signOutRouter;
