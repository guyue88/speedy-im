import Vue from 'vue';
import Router from 'uni-simple-router';
import routes from './routes';
import store from '../store';

declare let uni: any;

Vue.use(Router);

//初始化
const router = new Router({
  routes: [...routes],
});

//全局路由前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  if (!to.auth) {
    return next();
  }
  const { userInfo, token } = store.state.user;
  if (!token || !userInfo || !userInfo.id) {
    // 未登录则尝试自动登录
    await store.dispatch('user/autoLogin');
    const { userInfo: _user } = store.state.user;
    if (!_user || !_user.id) {
      return next({ name: 'userSignIn' });
    } else {
      // 自动登录后，正常跳转
      next();
    }
  }
  next();
});

// 全局路由后置守卫
// router.afterEach((to, from) => {
// });

export default router;
