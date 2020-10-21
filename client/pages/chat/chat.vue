<template>
  <view class="container">
    <scroll-view
      class="chat-main"
      :scroll-y="true"
      :scroll-with-animation="true"
      :enable-back-to-top="true"
      :show-scrollbar="false"
    >
      <view
        v-for="(item, index) in messages"
        :key="item.id"
        class="chat-wrap"
        :class="[index === 0 ? 'chat-first-wrap' : '']"
        :id="`message_${item.id}`"
      >
        <view
          :class="[item.is_owner ? 'chat-mine' : 'chat-friend']"
          v-if="item.message_type !== 1"
        >
          <view class="chat-message-avatar" :class="[item.is_owner ? 'chat-mine-message-avatar' : '']">
            <image :src="item.is_owner ? user_info.avatar : friend_info.avatar" class="chat-message-avatar-image" />
          </view>
          <view class="chat-message-text-wrap" :class="[item.is_owner ? 'chat-mine-message-text-wrap' : '']">
            <view class="chat-message-name">
              <text class="chat-message-name-text">{{ item.is_owner ? user_info.nickname : friend_info.nickname }}</text>
            </view>
            <view class="chat-message-content" :class="[item.is_owner ? 'chat-mine-message-content' : '']">
              <text class="chat-message-content-text" :class="[item.is_owner ? 'chat-mine-message-content-text' : '']">{{item.content}}</text>
              <view :class="[item.is_owner ? 'chat-mine-message-content-text-bubble' : 'chat-message-content-text-bubble']"></view>
            </view>
          </view>
        </view>
        <!-- <view class="chat-system" v-if="item.message_type === 1">
          <text class="chat-system-text">{{item.content}}</text>
        </view> -->
      </view>
    </scroll-view>

    <view class="chat-footer">
      <view class="chat-send-wrap">
        <input
          type="text"
          class="chat-send-input"
          v-model="message"
          confirm-type="send"
          :confirm-hold="true"
          :cursor-spacing="56"
          :hold-keyboard="true"
          :adjust-position="false"
          @confirm="send"
        />
        <view class="chat-tool-icons">
          <image src="@/static/nvue/emoji.png" class="chat-tool-icon" />
          <image src="@/static/nvue/plus.png" class="chat-tool-icon" />
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { mapState } from 'vuex';
import Chat from '../../socket/chat';

export default {
  name: 'Chat',
  data() {
    return {
      message: '',
      friend_id: '',
    }
  },
  computed: {
    ...mapState({
      user_info: (state: any) => state.user.user_info,
      friend_info(state: any) {
        return state.user.friends_map[this.friend_id];
      },
			messages(state: any) {
        const { list } = state.message;
        return list[this.friend_id] || null;
      },
		}),
  },
  onLoad(params) {
    const { uid } = params;
    this.friend_id = uid;
  },
  methods: {
    send() {
      const message = this.message.trim();
      if (!message) return;
      Chat.sendMessage(message, {
        user_info: this.user_info,
        friend_info: this.friend_info,
        is_group: false,
      });
      this.message = '';
    }
  }
};
</script>

<style lang="scss">
@import '@/helper/styles/color.scss';
view, scroll-view {
  display: flex;
}
.container {
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  border-top-width: 1rpx;
  border-top-style: solid;
  border-top-color: #eaeaea;
  background-color: #f2f2f2;
}
.chat-main {
  flex: 1;
  height: 100%;
  flex-direction: column;
}
.chat-wrap {
  padding: 0 30rpx;
  margin-bottom: 40rpx;
}
.chat-first-wrap {
  margin-top: 40rpx;
}
.chat-friend, .chat-mine {
  flex: 1;
  position: relative;
  padding-right: 84rpx;
}
.chat-message-avatar {
  margin-right: 30rpx;
}
.chat-message-avatar-image {
  width: 84rpx;
  height: 84rpx;
  border-radius: 8rpx;
}
.chat-message-text-wrap {
  flex-direction: column;
  align-items: flex-start;
}
.chat-message-name {
  line-height: 48rpx;
}
.chat-message-name-text {
  font-size: 26rpx;
  color: $gray;
}
.chat-message-content {
  position: relative;
  line-height: 44rpx;
  margin-top: 10rpx;
  padding: 16rpx 30rpx;
  background-color: #fff;
  border-radius: 8rpx;
  /*  #ifndef APP-PLUS-NVUE */
  word-break: break-all;
  /*  #endif  */
}
.chat-message-content-text {
  color: #333;
  font-size: 32rpx;
}
.chat-message-content-text-bubble {
  position: absolute;
  left: -20rpx;
  top: 26rpx;
  width: 0;
  height: 0;
  border-width: 20rpx;
  border-style: solid;
  border-color: #fff;
  border-left-color: transparent;
  border-bottom-color: transparent;
  overflow: hidden;
}
.chat-mine-message-content-text-bubble {
  position: absolute;
  top: 26rpx;
  right: -20rpx;
  width: 0;
  height: 0;
  border-width: 20rpx;
  border-style: solid;
  border-color: rgb(18, 183, 245);
  border-right-color: transparent;
  border-bottom-color: transparent;
  overflow: hidden;
}
.chat-message-text {
  font-size: 30rpx;
}
.chat-mine {
  flex-direction: row-reverse;
  padding-left: 80rpx;
  padding-right: 0;
}
.chat-mine-message-avatar {
  margin-left: 30rpx;
  margin-right: 0;
}
.chat-mine-message-text-wrap {
  text-align: right;
  align-items: flex-end;
}
.chat-mine-message-content {
  text-align: left;
  background-color: rgb(18, 183, 245);
}
.chat-mine-message-content-text {
  color: #fff;
}
.chat-system {
  flex: 1;
  margin: 40rpx 0 10rpx;
  padding: 0;
  justify-content: center;
}
.chat-system-text {
  line-height: 60rpx;
  padding: 0 30rpx;
  border-radius: 10rpx;
  background-color: #ddd;
  color: #fff;
  font-size: 28rpx;
}

/* 底部 */
.chat-footer {
  padding: 20rpx;
  background-color: #f5f5f5;
  border-top-width: 1rpx;
  border-top-style: solid;
  border-top-color: #eaeaea;
  justify-content: center;
  flex-direction: column;
}
.chat-send-wrap {
  flex: 1;
}
.chat-send-input {
  flex: 1;
  height: 70rpx;
  border-width: 0;
  background-color: #fff;
  border-radius: 10rpx;
  font-size: 28rpx;
  padding: 0 16rpx;
}
.chat-tool-icons {
  align-items: center;
}
.chat-tool-icon {
  width: 60rpx;
  height: 60rpx;
  margin-left: 14rpx;
}
</style>