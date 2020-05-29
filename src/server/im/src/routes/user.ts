import express from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

const router = express.Router();

router.get('/info', (req, res) => {
  res.json({
    data: (req as any).user,
  });
});

router.post('/login', (req, res) => {
  const payload = {
    uid: 1,
  };
  const options = {
    expiresIn: '7d',
  };
  const token = jwt.sign(payload, config.jwt.secret, options);
  res.json({
    token,
  });
});

router.post('/register', (req, res) => {
  res.send('user register');
});

export default router;
