export default class Util {

  public static isPhoneNumber(number: number) {
    return /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57]|19[0-9])[0-9]{8}$/.test('' + number);
  }

  public static encryptPhoneNumber (number: number) {
    return (number + '').replace(/^(\d{3})(\d{4})(\d{4})/, '$1****$2');
  }
}
