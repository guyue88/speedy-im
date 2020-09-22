import config from '../config';

declare let uni: any;

export default async function request(params: any) {
  const token = uni.getStorageSync('token');
  if (token) {
    params.data = params.data || {};
    params.data.token = token;
  }

  const { baseUrl } = config;
  const url = params.url;
  delete params.url;
  const defaultHeader = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  if (!params.data) {
    params.data = {};
  }
  // cors插件不支持这个请求头
  // params.data.token && (defaultHeader['x-token'] = params.data.token);
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
