<template>
  <v-app id="app"  >
    
    
      <router-view></router-view>
     
   <v-btn v-scroll="onScroll" v-show="fab" fab fixed bottom right @click="toTop">
          <img src="./assets/goTop.png" />
        </v-btn>
  </v-app>
</template>

<script>
import Home from './views/Home.vue';
import { mapGetters, mapActions } from "vuex";
export default {
  name: "App",

  components: {
    Home,
  },

  data(){
    return{
     fab:false,
    }
  },
  methods:{
     onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 20;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
  }
};
</script>
<style>
#app{
  background-color:rgba(175, 180, 43, 0.3);
  z-index:1
}
</style>
