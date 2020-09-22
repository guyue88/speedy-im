import Mysql from '@hyoga/mysql';
import config from '../config';

export default new Mysql(config.mysql);
