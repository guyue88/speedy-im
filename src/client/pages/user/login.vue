<template>
  <view class="container">
    <view class="logo">
      <div class="image"></div>
    </view>
    <view class="welcome">
      欢迎使用快聊
    </view>
    <view class="form">
      <view class="form-item">
        <view class="title">手机号码</view>
        <view class="input">
          <input type="number" placeholder="请输入手机号码" maxlength="11" />
        </view>
      </view>
      <view class="form-item">
        <view class="title">密码</view>
        <view class="input">
          <input type="password" :password="true" placeholder="请输入密码" />
        </view>
      </view>
      <view class="submit">
        <view class="button disabled">
          登录
        </view>
      </view>
      <view class="help">
        <view class="register">注册账号</view>
      </view>
    </view>
  </view>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'Login',
});
</script>

<style scopede lang="scss">
@import '../../helpers/styles/color.scss';
.container {
  padding: 0 80rpx 0 80rpx;
  padding-top: calc(var(--window-top) + var(--status-bar-height));

  .logo {
    margin-top: 100rpx;
    .image {
      width: 80rpx;
      height: 80rpx;
      background-color: $gray;
      border-radius: 50%;
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
      // .register {
      //   text-align: right;
      // }
    }
  }
}
</style>