export default [
  {
    path: '/pages/user/signIn',
    aliasPath:'/',  //对于h5端你必须在首页加上aliasPath并设置为/
    name: 'userSignIn',
    meta: {
      title: '用户登录',
    },
  }, {
    path: '/pages/chat/list',
    name: 'chatList',
    meta: {
      title: '消息',
    },
    auth: true,
  }, {
    path: '/pages/chat/chat',
    name: 'chatMain',
    meta: {
      title: '聊天',
    },
    auth: true,
  }, {
    path: '/pages/user/signUp',
    name: 'userSignUp',
    meta: {
      title: '用户注册',
    },
  }, {
    path: '/pages/user/me',
    name: 'userMain',
    meta: {
      title: '个人中心',
    },
    auth: true,
  }, {
    path: '/pages/addressBook/index',
    name: 'addressBookMain',
    meta: {
      title: '通讯录',
    },
    auth: true,
  }
];
