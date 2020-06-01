import express from 'express';
import jwt from 'jsonwebtoken';
import debug from 'debug';
import config from '../config';
import Util from '../helper/util';
import User from '../service/user';

const log = debug('speedy-im user');

const router = express.Router();

router.get('/info', async (req, res) => {
  const { user } = req as any;
  const { uid } = user || {};
  if (!uid) {
    return res.json(Util.fail('用户不存在', 401));
  }
  const [err, info] = await User.getUserInfoById(+uid);
  if (err) {
    log(err);
    return res.json(Util.fail('内部服务器错误', 500));
  }
  if (!info) {
    return res.json(Util.success('用户不存在', 401));
  }
  delete info.password;
  return res.json(Util.success(info));
});

router.post('/sign-in', async (req, res) => {
  const { mobile, password } = req.body;
  if (!mobile || mobile.length !== 11 || !password) {
    return res.json(Util.fail('用户不存在或密码错误', 0));
  }
  const passwordEncode = Util.encodePassword(password);
  const [err, userInfo] = await User.getUserInfoByPassword(mobile, passwordEncode);
  if (err) {
    log(err);
    return res.json(Util.fail('数据库查询失败', 500));
  }
  if (!userInfo || !userInfo.id) {
    return res.json(Util.fail('用户不存在或密码错误', 0));
  }
  const payload = {
    uid: userInfo.id,
  };
  const options = {
    expiresIn: '7d',
  };
  const token = jwt.sign(payload, config.jwt.secret, options);

  delete userInfo.password;
  return res.json(Util.success({
    userInfo,
    token,
  }));
});

router.post('/sign-up', async (req, res) => {
  let { mobile, password = '' } = req.body;
  password = password.trim();

  if (!mobile || mobile.length !== 11) {
    return res.json(Util.fail('手机号不正确', 0));
  }
  if (!password) {
    return res.json(Util.fail('密码不能为空', 0));
  }
  mobile = +mobile;
  const [err, _user] = await User.getUserInfoByMobile(mobile);
  if (err) {
    log(err);
    return res.json(Util.fail('数据库操作失败', 500));
  }
  if (_user) {
    return res.json(Util.fail('手机号已存在', 0));
  }
  const passwordEncode = Util.encodePassword(password);
  const [err2, info] = await User.createUser({ mobile, password: passwordEncode });
  if (err2) {
    log(err);
    return res.json(Util.fail('数据库操作失败', 500));
  }
  const { insertId } = info;
  if (!insertId) {
    return res.json(Util.fail('数据库操作失败', 500));
  }
  return res.json(Util.success(true));
});

export default router;
