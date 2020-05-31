import express, {
  Application, Request, Response, NextFunction,
} from 'express';
import http from 'http';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import socketIO from 'socket.io';
import debug from 'debug';
import path from 'path';
import expressJwt from 'express-jwt';
import config from './config';
import indexRouter from './routes';
import userRouter from './routes/user';

const log = debug('speedy-im');
const isDev = process.env.NODE_ENV === 'development';
const { jwt } = config;

const app: Application = express();
const server: http.Server = new http.Server(app);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const io: socketIO.Server = socketIO(server, {
  pingInterval: 5000,
  pingTimeout: 5000,
});

app.use(cors());
app.use(logger(isDev ? 'dev' : 'combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  expressJwt({
    secret: jwt.secret,
    getToken: (req: Request) => req.body.token || req.query.token || req.headers['x-access-token'],
  })
    .unless({
      path: jwt.routeWhiteList,
    }),
);

app.use('/', indexRouter);
app.use('/user', userRouter);

// catch 404 and forward to error handler
app.use((_req, _res, next) => {
  next(createError(404));
});

// 500 error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: { message: string; status: number; name: string; }, req: Request, res: Response, _: NextFunction) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token');
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: isDev ? err : {},
  });
});

server.listen(8360, () => {
  log('im 服务在 8360端口启动');
});
