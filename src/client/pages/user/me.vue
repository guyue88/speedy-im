<template>
  <view class="container">
    <div class="info">
      <view class="avatar">
        <image :src="userInfo.avatar" class="image" />
      </view>
      <view class="content">
        <view class="name">{{userInfo.name}}</view>
        <view class="id">快聊ID: {{userInfo.id}}</view>
      </view>
      <view class="more">
        <u-icon name="arrow-right" size="36" />
      </view>
    </div>
    <div class="setting">
      <div class="item" v-for="(item, index) in setting" :key="index">
        <image :src="item.url" class="image" />
        <div class="text">{{item.name}}</div>
        <view class="more">
          <u-icon name="arrow-right" size="30" />
        </view>
      </div>
    </div>
  </view>
</template>

<script lang="ts">
import Vue from 'vue';
import wallet from '../../static/page/wallet.svg';
import collect from '../../static/page/collect.svg';
import privacy from '../../static/page/privacy.svg';
import setting from '../../static/page/setting.svg';
import service from '../../static/page/service.svg';

declare let uni: any;
export default Vue.extend({
  name: 'Me',
  data() {
    return {
      userInfo: {
        avatar: 'https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/5.jpg',
        name: '小白杨',
        id: 1000,
      },
      setting: [
        {
          name: '钱包',
          url: wallet,
        }, {
          name: '收藏',
          url: collect,
        }, {
          name: '隐私',
          url: privacy,
        }, {
          name: '设置',
          url: setting,
        }, {
          name: '联系客服',
          url: service,
        }
      ]
    }
  }
});
</script>

<style scoped lang="scss">
@import '../../helper/styles/color.scss';
.container {
  .info {
    display: flex;
    align-items: center;
    padding: 40rpx 20rpx 40rpx 40rpx;
    .avatar {
      width: 120rpx;
      height: 120rpx;
      margin-right: 30rpx;
      .image {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .content {
      flex: 1;
      .name {
        font-size: 36rpx;
      }
      .id {
        font-size: 26rpx;
        color: $lightGray;
        margin-top: 12rpx;
      }
    }
    .more {
      width: 60rpx;
    }
  }
  .setting {
    margin-top: 30rpx;
    .item {
      display: flex;
      align-items: center;
      padding: 30rpx;
      border-top: 1rpx solid #f8f8f8;
      .image {
        width: 50rpx;
        height: 50rpx;
      }
      .text {
        margin: 0 20rpx;
        flex: 1;
      }
    }
  }
}
</style>