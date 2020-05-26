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

		</view>
	</view>
</template>

<script lang="ts">
import Vue from 'vue';

declare let uni: any;

export default Vue.extend({
  name: 'ChatList',
	data() {
		return {

		}
	},
	methods: {
		showMenu() {
			const subNVue = uni.getSubNVueById('menu');
			subNVue.show('fade-in', 300, function(){});
			uni.$once('menu-hide', () => {
				subNVue.hide('fade-out', 300);
			});
		}
	}
});
</script>

<style lang="scss">
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
}
</style>