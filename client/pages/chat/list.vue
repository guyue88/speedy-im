<template>
  <view class="container">
		<u-navbar :is-back="false" title="" :background="{ backgroundColor: '#F8F8F8' }">
			<view class="navbar">
				<view class="app-name">快聊</view>
				<view class="app-operate">
					<u-icon name="plus-circle" size="50" @click="showMenu" />
				</view>
			</view>
		</u-navbar>
		<view class="main">
			<u-search height="70" :show-action="false" :disabled="true" />
			<view class="list">
				<view class="list-item" v-for="(item, index) in list" :key="index" @click="chat2user(item.friend_info.friend_id)">
					<view class="avatar">
						<image :src="item.friend_info.avatar" class="image">
						<u-badge type="error" :count="item.unread_number" :offset="[-10, -10]" />
					</view>
					<view class="wrap">
						<view class="content">
							<view class="name">{{item.friend_info.nickname}}</view>
							<view class="message">{{item.last_message.content}}</view>
						</view>
						<view class="time">{{item.last_message.time}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import Util from '../../helper/util';
import { State as MessageState } from '../../store/modules/message';
import { State as UserState } from '../../store/modules/user';

declare let uni: any;

export default Vue.extend({
  name: 'ChatList',
	data() {
		return {};
	},
  computed: {
    ...mapState({
			friends_map: (state: { user: UserState }) => state.user.friends_map,
			recent_contacts: (state: { user: UserState }) => state.user.recent_contacts,
			messages: (state: { message: MessageState }) => state.message.list,
		}),
		list() {
			return this.recent_contacts.map(friend_id => {
				const res = {
					friend_info: this.friends_map[friend_id],
					last_message: {},
					unread_number: 0,
				};
				const message = this.messages[friend_id];
				if (message && message.length) {
					let last_message: any = {};
					let unread_number = 0;
					message.forEach(msg => {
						if (!msg.is_read) {
							unread_number += 1;
						}
						last_message = msg;
					});
					last_message.time = Util.formatTime(last_message.create_time);
					res.last_message = last_message;
					res.unread_number = unread_number;
				}
				return res;
			});
		}
	},
	async onShow() {
		await this.$store.dispatch('user/getFriendsList');
		await this.$store.dispatch('message/getUnreadMessage');
	},
	methods: {
		showMenu() {
			const subNVue = uni.getSubNVueById('menu');
			subNVue.show('fade-in', 300, function(){});
			uni.$once('menu-hide', () => {
				subNVue.hide('fade-out', 300);
			});
		},
		chat2user(uid: number) {
			uni.navigateTo({
				url: `/pages/chat/chat?uid=${uid}`,
			});
		},
	}
});
</script>

<style lang="scss" scoped>
@import '@/helper/styles/color.scss';

.line-1 {
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 1;
	display: -webkit-box;
	overflow: hidden;
	white-space: normal;
	text-overflow: ellipsis;
}
.container {
	.navbar {
		display: flex;
		align-items: center;
		flex: 1;
		padding: 0 30rpx;
		font-size: 32rpx;
		& > view {
			flex: 1;
			&.app-name {
				font-weight: bold;
			}
			&.app-operate {
				text-align: right;
			}
		}
	}
	.main {
		padding: 30rpx;
		.list {
			margin-top: 10rpx;
			.list-item {
				display: flex;
				align-items: center;
				.avatar {
					position: relative;
					width: 84rpx;
					height: 84rpx;
					margin-right: 24rpx;
					.image {
						width: 100%;
						height: 100%;
						border-radius: 10%;
					}
				}
				.wrap {
					flex: 1;
					display: flex;
					align-items: center;
					padding: 20rpx 0;
					.content {
						flex: 1;
						.name {
							font-size: 32rpx;
							color: #333;
						}
						.message {
							@extend .line-1;
							font-size: 26rpx;
							color: #999;
						}
					}
					.time {
						color: #999;
						margin-left: 26rpx;
					}
				}
			}
			.list-item + .list-item {
				.wrap {
					border-top: 1rpx solid $borderColor;
				}
			}
		}
	}
}
</style>