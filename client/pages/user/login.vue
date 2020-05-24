<template>
  <view>aa</view>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component';
import io from '@hyoga/uni-socket.io';
const socket = io('http://localhost:8360/chat', {
  query: {
    room: 'default',
  },
  transports: ['websocket'],
});
console.log(11, socket);

@Component({})
export default class Login extends Vue {
  onLoad() {

  }
}
</script>

<style>

</style>