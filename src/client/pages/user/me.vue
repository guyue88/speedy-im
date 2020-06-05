<template>
  <view class="container">
    <div class="info">
      <view class="avatar">
        <image :src="`${userInfo.avatar}?imageView2/1/w/150/h/150/format/jpg/interlace/1/q/75`" class="image" />
      </view>
      <view class="content">
        <view class="name">{{userInfo.nickname}}</view>
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
import { mapState } from 'vuex';

declare let uni: any;
export default Vue.extend({
  name: 'Me',
  data() {
    return {
      setting: [
        {
          name: '钱包',
          url: 'https://im.wangcai.me/speedy_wallet.svg',
        }, {
          name: '收藏',
          url: 'https://im.wangcai.me/speedy_collect.svg',
        }, {
          name: '隐私',
          url: 'https://im.wangcai.me/speedy_privacy.svg',
        }, {
          name: '设置',
          url: 'https://im.wangcai.me/speedy_setting.svg',
        }, {
          name: '联系客服',
          url: 'https://im.wangcai.me/speedy_service.svg',
        }
      ]
    }
  },
  computed: {
    ...mapState({
      userInfo: (state: any) => state.user.userInfo,
    }),
  },
});
</script>

<style scoped lang="scss">
@import '../../helper/styles/color.scss';
.container {
  padding-top: calc(var(--window-top) + var(--status-bar-height));
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
    font-size: 30rpx;
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