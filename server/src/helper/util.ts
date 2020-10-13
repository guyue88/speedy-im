import { Request } from 'express';
import crypto from 'crypto';
import config from '../config';

export default class Util {
  public static getToken = (req: Request): string => req.headers['x-access-token'] || req.body.token || req.query.token;

  public static success(data: any, errno = 200, errmsg = '') {
    return {
      data,
      errno,
      errmsg,
    };
  }

  public static fail(errmsg: string, errno = 500) {
    return {
      data: null,
      errno,
      errmsg,
    };
  }

  public static encodePassword(password: string): string {
    return crypto.createHmac('sha1', config.passwordSecret).update(password).digest('hex');
  }

  public static isPhoneNumber(number: number): boolean {
    return /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57]|19[0-9])[0-9]{8}$/.test(`${number}`);
  }

  public static encryptPhoneNumber(number: number): string {
    return (`${number}`).replace(/^(\d{3})(\d{4})(\d{4})/, '$1****$2');
  }
}
