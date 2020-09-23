import config from '../config';

declare let uni: any;

export default async function request(params: any) {
  const { baseUrl } = config;
  const url = params.url;
  delete params.url;

  const token = uni.getStorageSync('token');
  const defaultHeader = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'x-access-token': token,
  };
  params.data = params.data || {};
  const options = {
    url: /^http/.test(url) ? url : `${baseUrl}${url}`,
    header: defaultHeader,
    ...params,
  };

  const { success, fail, complete } = options;
  delete options.success;
  delete options.fail;
  delete options.complete;

  const [error, res ] = await uni.request(options);

  if (res && res.statusCode === 200 ){
    success && success(res.data);
    complete && complete(res.data);
    return [null, res.data];
  } else {
    fail && fail(error);
    complete && complete(error);
    return [error || new Error('网络错误'), null];
  }
}
