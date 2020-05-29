import express, {
  Application, Request, Response,
} from 'express';
import http from 'http';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import socketIO from 'socket.io';
import debug from 'debug';
import indexRouter from './routes/index';

const log = debug('speedy-im: ');
const isDev = process.env.NODE_ENV === 'development';

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
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((_req, _res, next) => {
  next(createError(404));
});

// 500 error handler
app.use((err: { message: string; status: number; }, req: Request, res: Response) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

server.listen(8360, () => {
  log('im 服务在 8360端口启动');
});
