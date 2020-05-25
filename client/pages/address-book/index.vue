<template>
  <view class="container">
		<u-navbar :is-back="false" title="">
			<view class="navbar">
        <view class="app-name">通讯录</view>
        <view class="app-operate">
          <u-icon name="plus-circle" size="50" />
        </view>
      </view>
		</u-navbar>
		<view class="main">

		</view>
	</view>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class AddressBook extends Vue {
  onLoad() {

  }
}
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