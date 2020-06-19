<template>
  <view class="container">
		<u-navbar :is-back="false" title="" :background="{ backgroundColor: '#F8F8F8' }">
			<view class="navbar">
        <view class="app-name">通讯录</view>
        <view class="app-operate">
          <u-icon name="plus-circle" size="50" @click="showMenu" />
        </view>
      </view>
		</u-navbar>
		<view class="main">
			<view class="groups">
				<view class="apply">
					<view class="image">
						<image src="@/static/page/apply.png" class="icon" />
					</view>
					<view class="text">好友申请</view>
				</view>
				<view class="group">
					<view class="image">
						<image src="@/static/page/group.png" class="icon" />
					</view>
					<view class="text">我的群组</view>
				</view>
			</view>
			<view class="contact">
				<view class="area" v-for="item in friends" :key="item.key">
					<view class="key">{{item.key}}</view>
					<view class="list">
						<view class="list-item" v-for="(fid, index) in item.list" :key="index" @click="chat2user(fid)">
							<view class="avatar">
								<image :src="allFriendsMap[fid].friend_avatar" class="image" />
							</view>
							<view class="name">{{allFriendsMap[fid].remark || allFriendsMap[fid].friend_name}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';

declare let uni: any;

export default Vue.extend({
  name: 'AddressBook',
	data() {
		return {}
	},
	computed: {
		...mapState({
			friends: (state: any) => state.user.friends,
			allFriendsMap: (state: any) => state.user.allFriendsMap,
    }),
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

<style scoped lang="scss">
@import '@/helper/styles/color.scss';

.card {
	background-color: #fff;
	border-top: 1rpx solid #eaeaea;
	border-bottom: 1rpx solid #eaeaea;
}
.container {
	height: 100%;
	background-color: $background;
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
	.groups {
		@extend .card;
		border-top: none;
		& > view {
			display: flex;
			align-items: center;
			padding: 24rpx 30rpx;
			font-size: 32rpx;
			border-top: 1rpx solid #eaeaea;
			&:first-child {
				border-top: none;
			}
			.image {
				width: 40rpx;
				height: 40rpx;
				margin-right: 30rpx;
				background-color: #ecbe45;
				border-radius: 8rpx;
				box-sizing: content-box;
				padding: 10rpx;
				.icon {
					width: 100%;
					height: 100%;
					border-radius: 8rpx;
				}
			}
			.text {
				height: 44rpx;
				line-height: 44rpx;
			}
		}
		.group {
			.image {
				background-color: #27e2e2;
			}
		}
	}
	.contact {
		.key {
			height: 80rpx;
			line-height: 80rpx;
			padding-left: 30rpx;
		}
		.list {
			@extend .card;
			.list-item {
				display: flex;
				align-items: center;
				padding-left: 30rpx;
				& + .list-item {
					.name {
						border-top: 1rpx solid #eaeaea;
					}
				}
				.avatar, .name {
					padding: 16rpx 0;
					box-sizing: content-box;
				}
				.avatar {
					width: 84rpx;
					height: 84rpx;
					margin-right: 24rpx;
					border-radius: 10%;
					.image {
						width: 100%;
						height: 100%;
						border-radius: 10%;
					}
				}
				.name {
					flex: 1;
					height: 84rpx;
					line-height: 84rpx;
					padding-right: 30rpx;
					font-size: 30rpx;
				}
			}
		}
	}
}
</style>