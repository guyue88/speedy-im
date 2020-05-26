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
			<view class="contact">
				<view class="card" v-for="item in list" :key="item.key">
					<view class="key">{{item.key}}</view>
					<view class="list">
						<view class="list-item" v-for="(cld, index) in item.list" :key="index" @click="chat2user(cld.id)">
							<view class="avatar">
								<image :src="cld.avatar" class="image" />
							</view>
							<view class="name">{{cld.name}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
import Vue from 'vue';

declare let uni: any;

export default Vue.extend({
  name: 'AddressBook',
	data() {
		return {
			list: [
				{
					key: 'A',
					list: [{
						id: 1,
						name: '小白杨',
						avatar: 'https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/5.jpg',
					}, {
						id: 2,
						name: '楠宝宝',
						avatar: 'https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/4.jpg',
					}],
				}, {
					key: 'B',
					list: [{
						id: 3,
						name: '小白杨',
						avatar: 'https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/1.jpg',
					}, {
						id: 4,
						name: '楠宝宝',
						avatar: 'https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/2.jpg',
					}],
				}, {
					key: 'C',
					list: [{
						id: 5,
						name: '小白杨',
						avatar: 'https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/3.jpg',
					}, {
						id: 6,
						name: '楠宝宝',
						avatar: 'https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/4.jpg',
					}],
				}
			]
		}
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
.container {
	height: 100%;
	background-color: #f5f5f5;
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
	.contact {
		.key {
			height: 80rpx;
			line-height: 80rpx;
			padding-left: 30rpx;
		}
		.list {
			background-color: #fff;
			border-top: 1rpx solid #eaeaea;
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
				}
			}
		}
	}
}
</style>