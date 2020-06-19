import express from 'express';
import jwt from 'jsonwebtoken';
import debug from 'debug';
import pinyin from 'pinyin';
import config from '../config';
import Util from '../helper/util';
import User from '../service/user';
import Message, { MessageData } from '../service/message';
// import db from '../lib/db';

const log = debug('speedy-im user');

const router = express.Router();

router.get('/info', async (req, res) => {
  const { user } = req as any;
  const { uid } = user || {};
  const [err, info] = await User.getUserInfoById(+uid);
  if (err) {
    log(err);
    return res.json(Util.fail('内部服务器错误', 500));
  }
  if (!info) {
    return res.json(Util.success('用户不存在', 401));
  }
  delete info.password;
  delete info.client_id;
  delete info.create_time;
  return res.json(Util.success(info));
});

// 登录
router.put('/sign-in', async (req, res) => {
  const { mobile, password, platform = 'android' } = req.body;
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
  const [err2] = await User.updateUserToken(userInfo.id, { token, platform });
  if (err2) {
    log(err2);
    return res.json(Util.fail('数据库写入失败', 500));
  }

  delete userInfo.password;
  return res.json(Util.success({
    ...userInfo,
    token,
  }));
});

// 注册
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
    log(err2);
    return res.json(Util.fail('数据库操作失败', 500));
  }
  const { insertId } = info;
  if (!insertId) {
    return res.json(Util.fail('数据库操作失败', 500));
  }
  return res.json(Util.success(true));
});

// 注销登录
router.put('/sign-out', async (req, res) => res.send('退出登录'));

// 获取好友列表
router.get('/friends', async (req, res) => {
  const { user } = req as any;
  const { uid } = user || {};
  const [err, data] = await User.getRelationByUid(uid);
  if (err) {
    log(err);
    return res.json(Util.fail('数据库查询失败', 500));
  }
  let final: { key: string; list: any[] }[] = [];
  const obj: any = {};
  const others: any = [];
  data.forEach((item: any) => {
    const name = item.remark || item.friend_name;
    const p = pinyin(name, {
      style: pinyin.STYLE_FIRST_LETTER,
    });
    const firstLetter: string = p && p[0] && p[0][0] || '';
    if (firstLetter) {
      const letter = firstLetter.toLocaleUpperCase();
      if (!obj[letter]) {
        obj[letter] = [];
      }
      obj[letter].push(item);
    } else {
      others.push(item);
    }
  });
  Object.keys(obj).forEach((key) => {
    final.push({
      key,
      list: obj[key],
    });
  });
  final = final.sort((a, b) => (a.key > b.key ? 1 : -1));
  if (others.length) {
    final.push({
      key: '#',
      list: others,
    });
  }
  return res.json(Util.success(final));
});

// 获取群组
router.get('/groups', async (req, res) => res.send('获取群组'));

router.get('/unread-message', async (req, res) => {
  const { user } = req as any;
  const { uid } = user || {};
  const [err, list] = await Message.getUnreadMessage(uid);
  if (err) {
    log(err);
    return res.json(Util.fail('数据库查询失败', 500));
  }
  const tmp: any = [];

  const result = list.map((item: MessageData) => {
    tmp.push({
      id: item.id,
      is_sent: 1,
    });
    return {
      ...item,
      is_owner: uid === item.user_id,
    };
  });
  if (tmp.length) {
    Message.updateMultipleMessage(tmp);
  }
  return res.json(Util.success(result));
});

export default router;
