<script>
export default {
  name: "App",
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
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
