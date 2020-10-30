<script lang="ts">
import Storage from './helper/storage';

export default {
  name: "Root",
  async onLaunch() {
    console.log("App Launch");
    await Storage.contacts.recover();
    await Storage.message.recover();
  },
  onShow() {
    console.log("App Show");
  },
  onHide() {
    console.log("App Hide");
  }
};
</script>

<style lang="scss">
/*  #ifndef APP-PLUS-NVUE */
/*每个页面公共css */
page {
  height: 100%;
}
@import "uview-ui/index.scss";
/*  #endif  */
</style>
