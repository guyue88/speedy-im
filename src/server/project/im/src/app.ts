import express, { Application, NextFunction, Request, Response } from 'express';
import http from 'http';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import socketIO from 'socket.io';
import indexRouter from './routes/index';

const isDev = process.env.NODE_ENV === 'development';

const app: Application = express();
const server: http.Server = new http.Server(app);
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
app.use(function(req, res, next) {
  next(createError(404));
});

// 500 error handler
app.use(function(err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

server.listen(8360, ()=>{
  console.log("im 服务在 8360端口启动");
});
