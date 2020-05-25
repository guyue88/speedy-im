<template>
  <view class="container">
		<u-navbar :is-back="false" title="">
			<view class="navbar">
				<view class="app-name">快聊</view>
				<view class="app-operate">
					<u-icon name="plus-circle" size="50"></u-icon>
				</view>
			</view>
		</u-navbar>
		<view class="main">
			<u-search height="70" :show-action="false" :disabled="true"></u-search>
			<view class="list">
				<view class="list-item" v-for="(item, index) in list" :key="index">
					<view class="avatar">
						<image :src="item.userInfo.avatar" class="image">
						<u-badge type="error" count="7" :offset="[-6, -6]" />
					</view>
					<view class="content">
						<view class="name">{{item.userInfo.name}}</view>
						<view class="message">{{item.message.text}}</view>
					</view>
					<view class="time">{{item.message.time}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class Me extends Vue {
	list = [{
		message: {
			text: '嗯嗯，好的，知道了~',
			time: '12:36'
		},
		userInfo: {
			avatar: 'https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/5.jpg',
			name: '小白杨',
		}
	}, {
		message: {
			text: '快回家快回家快回家快回家快回家快回家快回家快回家快回家快回家',
			time: '10:00'
		},
		userInfo: {
			avatar: 'https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/4.jpg',
			name: '楠宝宝',
		}
	}];

  onLoad() {

  }
}
</script>

<style lang="scss" scoped>
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
		font-size: 36rpx;
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
			.list-item {
				display: flex;
				align-items: center;
				margin-top: 24rpx;
				.avatar {
					position: relative;
					width: 84rpx;
					height: 84rpx;
					margin-right: 24rpx;
					.image {
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}
				.content {
					flex: 1;
					.name {
						font-size: 30rpx;
						color: #333;
					}
					.message {
						@extend .line-1;
						color: #999;
					}
				}
				.time {
					color: #999;
					margin-left: 24rpx;
				}
			}
		}
	}
}
</style>