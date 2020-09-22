<template>
  <view class="layer" v-if="show" :style="{ opacity: opacity }" @click="hideLayer">
    <view class="menu" @click.stop="">
      扫一扫
    </view>
  </view>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'PopupMenu',
  props: {
    visible: {
      type: Boolean,
      default: false,
    }
  },
	data() {
		return {
			show: false,
			opacity: 0,
		}
  },
  watch: {
    visible(val: boolean, old: boolean) {
      if (val) {
        this.show = true;
        setTimeout(() => {
          this.opacity = 1;
        }, 50);
      } else {
        this.opacity = 0;
        setTimeout(() => {
          this.show = false;
        }, 250);
      }
    }
  },
	methods: {
		hideLayer() {
      this.$emit('onHide');
    }
	}
});
</script>

<style scoped lang="scss">
.layer {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0;
  transition: opacity .2s linear;
  background: rgba(0, 0, 0, .2);
  z-index: 1000;
  .menu {
    position: absolute;
    top: calc(var(--status-bar-height) + 55px);
    right: 20rpx;
    background-color: #1d1919;
    padding: 24rpx;
    border-radius: 12rpx;
    font-size: 26rpx;
    color: #fff;
    transition: all .2s;

    &::before {
      content: " ";
      position: absolute;
      top: -38rpx;
      right: 14rpx;
      border: 20rpx solid transparent;
      border-bottom: 20rpx solid #1d1919;
      width: 0;
      height: 0;
    }
  }
}
</style>