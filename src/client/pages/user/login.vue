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
          <input type="password" :password="true" minlength="7" maxlength="20" v-model="password" placeholder="请输入密码" />
        </view>
      </view>
      <view class="submit">
        <view class="button disabled" @click="login">
          登录
        </view>
      </view>
      <view class="help">
        <navigator url="/pages/user/register" class="register">注册账号</navigator>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from 'vue';
import util from '../../helper/util';

declare let uni: any;

export default Vue.extend({
  name: 'Login',
  data() {
    return {
      mobile: '',
      password: '',
    }
  },
  methods: {
    login() {
      if (!util.isPhoneNumber(+this.mobile)) {
        uni.showToast({
          title: '手机号码不正确',
          mask: 'none',
        });
      } else if (this.password.length < 7 || this.password.length > 20) {
        uni.showToast({
          title: '密码应为7-20个字符',
          mask: 'none',
        });
      } else {
        // this.$store.
      }
    }
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
          font-size: 30rpx;
          background-color: transparent;
        }
      }
    }
    .submit {
      margin-top: 30rpx;
      .button {
        background-color: $blue-1;
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