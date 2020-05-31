import express from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import Util from '../helper/util';
import User from '../service/user';
import debug from 'debug';

const log = debug('speedy-im user');

const router = express.Router();

router.get('/info', (req, res) => {
  res.json({
    data: Util.encodePassword('luo1872053'),
  });
});

router.post('/login', async (req, res) => {
  const { mobile, password } = req.body;
  if (!mobile || mobile.length !== 11 || !password) {
    return res.json(Util.fail('用户不存在或密码错误', 401));
  }
  const passwordEncode = Util.encodePassword(password);
  const [err, userInfo] = await User.getUserInfoByPassword(mobile, passwordEncode);
  if (err) {
    log(err);
    return res.json(Util.fail('数据库查询失败', 500));
  }
  if (!userInfo || !userInfo.id) {
    return res.json(Util.fail('用户不存在或密码错误', 401));
  }
  const payload = {
    uid: 1,
  };
  const options = {
    expiresIn: '7d',
  };
  const token = jwt.sign(payload, config.jwt.secret, options);

  delete userInfo.password;
  res.json(Util.success({
    userInfo,
    token,
  }));
});

router.post('/register', (req, res) => {
  res.send('user register');
});

export default router;
