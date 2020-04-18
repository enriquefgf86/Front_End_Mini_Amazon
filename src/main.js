import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Products_tag from './components/Products.vue'
import ProductCard_tag from './components/ProductCard.vue'
import UserDashBoard_tag from './components/UserDashBoard.vue'
import SearchBar_tag from './components/SearchBar.vue'
import Filters_tag from './components/Filters.vue'
import FilterRate_tag from './components/FilterRate.vue'
import BuyerView_tag from './components/BuyerView.vue'


Vue.config.productionTip = false
Vue.component('Products',Products_tag);
Vue.component("ProductCard", ProductCard_tag);
Vue.component("UserDashBoard", UserDashBoard_tag);
Vue.component("SearchBar",SearchBar_tag);
Vue.component("Filters",Filters_tag);
Vue.component("FilterRate",FilterRate_tag);
Vue.component("BuyerView",BuyerView_tag);
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created(){
    store.dispatch('fetchAllProducts');
  }
}).$mount('#app')
