import express from 'express';
import debug from 'debug';
import Util from '../helper/util';

import Message from '../service/message';

const log = debug('speedy-im message');

const router = express.Router();

/**
 * 更新消息状态
 *
 * @method GET
 * @param {token} string
 * @param {number[]} ids
 * @param {string} is_received
 */
router.put('/status', async (req, res) => {
  const { ids = [], columns = {} } = req.body;
  const allowColumns = ['is_received', 'is_read'];
  const data: Record<string, number> = {};
  allowColumns.forEach((key) => {
    const item = columns[key];
    // eslint-disable-next-line no-restricted-globals
    if (item !== undefined && !isNaN(item) && (+item === 0 || +item === 1)) {
      data[key] = item;
    }
  });
  if (!Object.keys(data).length) {
    return res.json(Util.fail('参数不合法', 0));
  }
  const [err] = await Message.updateMultipleMessage(ids, data);
  if (err) {
    log(err);
    return res.json(Util.fail('数据库查询失败', 500));
  }
  return res.json(Util.success(null));
});

export default router;
