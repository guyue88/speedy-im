import dayjs from 'dayjs';

export default class Util {

  static isPhoneNumber(number: number) {
    return /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57]|19[0-9])[0-9]{8}$/.test('' + number);
  }

  static encryptPhoneNumber (number: number) {
    return (number + '').replace(/^(\d{3})(\d{4})(\d{4})/, '$1****$2');
  }

  static formatTime (dateNumber?: number | Date | string): string {
    if (!dateNumber) {
      return '';
    }
    const now = Date.now();
    const timer = dateNumber ? +dayjs(dateNumber) : now;
    const date = new Date(timer);
    const interval = Math.floor((now - timer) / 1000);// 秒
    const current = new Date();
    if (interval < 60) {
      return '刚刚';
    } else if (interval < 3600) {
      return `${Math.floor(interval / 60)}分钟前`;
    } else if (interval < 86400) {
      return `${Math.floor(interval / 3600)}小时前`;
    } else if (interval < 3 * 86400) {
      return `${Math.floor(interval / 86400)}天前`;
    } else if (current.getFullYear() === date.getFullYear()) {
      return dayjs(date).format('MM-DD');
    } else {
      return dayjs(date).format('YYYY-MM-DD');
    }
  }
}
