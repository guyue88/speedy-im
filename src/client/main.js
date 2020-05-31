import Vue from "vue";
import uView from "uview-ui";
import request from "./helper/request";
import App from "./App";
import store from "./store";

Vue.use(uView);

Vue.prototype.$request = request;
Vue.prototype.$store = store;

Vue.config.productionTip = false;

App.mpType = "app";

const app = new Vue({
  store,
  ...App,
});
app.$mount();
