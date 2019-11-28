import Vue from "vue";
import App from "./App.vue";
import Store from "./Store.vue";

Vue.config.productionTip = false;

new Vue({
  render: h => h(Store)
}).$mount("#app");
