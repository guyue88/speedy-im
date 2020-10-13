import express from 'express';
import jwt from 'jsonwebtoken';
import debug from 'debug';
import pinyin from 'pinyin';
import config from '../config';
import Util from '../helper/util';
import User from '../service/user';
import Message from '../service/message';
import { Message as MessageData, FriendInfo } from '../interface/entity';
import BlackList from '../helper/jwt.blacklist';

const log = debug('speedy-im user');

const router = express.Router();

/**
 * 从token获取用户信息
 *
 * @method GET
 * @param {token} string
 */
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

/**
 * 登录
 *
 * @method POST
 * @param {number} mobile 手机号
 * @param {string} password 密码
 * @param {'android' | 'ios' | 'web'} platform 登陆平台
 */
router.put('/signIn', async (req, res) => {
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

/**
 * 注册
 *
 * @method POST
 * @param {number} mobile 手机号
 * @param {string} password 密码
 */
router.post('/signUp', async (req, res) => {
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

/**
 * 注销登录
 */
router.put('/signOut', async (req, res) => {
  const { user } = req as any;
  const { uid } = user || {};
  const token = Util.getToken(req);
  const payload = jwt.decode(token);
  if (Object.prototype.toString.call(payload) === '[object Object]') {
    const exp: number = payload && (payload as any).exp;
    BlackList.add(token, exp);
  }
  await User.updateUserToken(uid, { token: '', platform: '' });
  return res.json(Util.success('ok'));
});

/**
 * 获取好友列表
 *
 * @method GET
 * @param {token} string
 */
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
  data.forEach((item: FriendInfo) => {
    const name = item.remark || item.nickname;
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

/**
 * 获取群组
 *
 * @method GET
 * @param {token} string
 */
router.get('/groups', async (req, res) => {
  const { user } = req as any;
  const { uid } = user || {};
  const [err, list] = await User.getUserGroup(uid);
  if (err) {
    log(err);
    return res.json(Util.fail('数据库查询失败', 500));
  }
  return res.json(Util.success(list));
});

/**
 * 获取未读消息
 *
 * @method GET
 * @param {token} string
 */
router.get('/unreadMessage', async (req, res) => {
  const { user } = req as any;
  const { uid } = user || {};
  // TODO，分页
  const [err, list] = await Message.getUnreadMessage(uid);
  if (err) {
    log(err);
    return res.json(Util.fail('数据库查询失败', 500));
  }
  const tmp: number[] = [];

  const result = list.map((item: MessageData) => {
    tmp.push(item.id as number);
    return {
      ...item,
      is_owner: uid === item.user_id,
    };
  });
  if (tmp.length) {
    Message.updateMultipleMessage(tmp, { is_sent: 1 });
  }
  return res.json(Util.success(result));
});

export default router;
