<template>
  <view class="container">
    <view class="logo">
      <div class="image">
        <image src="~@/static/page/logo.png" class="icon"/>
      </div>
    </view>
    <view class="welcome">
      欢迎使用快聊
    </view>
    <view class="form">
      <view class="form-item">
        <view class="title">手机号码</view>
        <view class="input">
          <input type="number" v-model="mobile" placeholder="请输入手机号码" maxlength="11" />
        </view>
      </view>
      <view class="form-item">
        <view class="title">密码</view>
        <view class="input">
          <input type="password" :password="true" minlength="5" maxlength="20" v-model="password" placeholder="请输入5-20位密码" />
        </view>
      </view>
      <view class="submit">
        <view class="button" :class="{ disabled }" @click="login">
          登录
        </view>
      </view>
      <view class="help">
        <navigator url="/pages/user/signUp" class="signUp">注册账号</navigator>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from 'vue';
import Util from '../../helper/util';

declare let uni: any;

export default Vue.extend({
  name: 'SignIn',
  data() {
    return {
      mobile: '',
      password: '',
    }
  },
  computed: {
    disabled() {
      const isMobile = Util.isPhoneNumber(+this.mobile);
      const passwordOk = this.password.length < 5 || this.password.length > 20;
      return !isMobile && !passwordOk;
    }
  },
  methods: {
    async login() {
      if (!Util.isPhoneNumber(+this.mobile)) {
        uni.showToast({
          title: '手机号码不正确',
          icon: 'none',
        });
      } else if (this.password.length < 5 || this.password.length > 20) {
        uni.showToast({
          title: '密码应为5-20个字符',
          icon: 'none',
        });
      } else {
        const res = await this.$store.dispatch('user/login', {
          mobile: this.mobile,
          password: this.password,
        });
        if (res.errno !== 200) {
          uni.showToast({
            title: res.errmsg,
            icon: 'none',
          });
        } else {
          let { redirect = '/pages/chat/list', tab = '1', replace = '0'} = this.$Route.query;
          redirect = decodeURIComponent(redirect);
          this.$Router[!!+tab ? 'pushTab' : (!!+replace ? 'replace' : 'push')]({ path: redirect });
        }
      }
    },
  }
});
</script>

<style scoped lang="scss">
@import '../../helper/styles/color.scss';
.container {
  padding: 0 80rpx 0 80rpx;
  padding-top: calc(var(--window-top) + var(--status-bar-height));

  .logo {
    margin-top: 100rpx;
    .image {
      width: 96rpx;
      height: 96rpx;
      border: 1rpx solid #EAEAEA;
      border-radius: 50%;
      overflow: hidden;
      .icon {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }
  .welcome {
    margin-top: 40rpx;
    font-size: 40rpx;
    color: #333;
  }
  .form {
    margin-top: 50rpx;
    .form-item {
      margin-top: 20rpx;
      .title {
        color: #444;
        font-size: 26rpx;
      }
      .input {
        margin-top: 12rpx;
        input {
          border: none;
          border-bottom: 1rpx solid #eaeaea;
          height: 78rpx;
          line-height: 78rpx;
          font-size: 30rpx;
          background-color: transparent;
          text-indent: 16rpx;
        }
      }
    }
    .submit {
      margin-top: 30rpx;
      .button {
        background-color: $lightBlue;
        color: #fff;
        text-align: center;
        font-size: 32rpx;
        height: 90rpx;
        line-height: 90rpx;
        border-radius: 12rpx;
        &.disabled {
          opacity: .4;
        }
        &:active {
          opacity: .6;
        }
      }
    }
    .help {
      display: flex;
      justify-content: flex-end;
      margin-top: 18rpx;
      color: $lightGray;
      font-size: 26rpx;
    }
  }
}
</style>