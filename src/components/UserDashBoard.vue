<template>
  <v-container id="loop" class="d-flex flex-row flex-wrap" v-if="getAllProducts">
    <v-container id="containerCard" v-for="(item,key,index) in  groupProds " :key="index">
      <v-card color="lime lighten-2" id="card">
        <v-layout>
          <v-flex class="ml-3" xs6 sm6 align-left>
            <h4>{{item[0].product_name}}</h4>
          </v-flex>
        </v-layout>

        <v-layout>
          <v-flex xs6 sm6 align-center>
            <img id="imgSize" :src="item[0].product_image[0]" />
          </v-flex>
          <v-flex xs6 sm6 align-center>
            <h3>Price:</h3>
            <h3 id="price">${{item[0].product_price}}</h3>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex width="100" class="ml-3" xs6 sm6 align-left>
            <v-btn x-small @click="deletePurch(key)">Delete</v-btn>
          </v-flex>
          <h4
            id="counter "
            class="mr-3"
            xs6
            sm6
            align-rigth
          >{{item.length}} {{item.length>1?"unities":"unit"}}</h4>
        </v-layout>
      </v-card>
    </v-container>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "UserDashBoard",
  props: ["userId", "id"],
  data() {
    return {
      rating: 4.5,
      link: null
    };
  },
  ////////////////////////////////////////////////////////////////////////////////
  methods: {
    ...mapActions([
      "fetchUserIdProducts",
      "fetchAllProducts",
      "deletePurchase"
    ]),
    //-----------------------------------------------------
    deletePurch(key) {
      this.deletePurchase(key);
      location.reload();
    },
    //-----------------------------------------------------
    toHome() {
      this.$router.push("/");
    }
  },
  ////////////////////////////////////////////////////////////////////////////////
  computed: {
    ...mapGetters([
      "getAllProducts",
      "getLoader",
      "getUserBoard",
      "getUpDatedBoard"
    ]),
    //-----------------------------------------------------
    getUserBoardUpdated() {
      return this.$store.getters.getUserBoard;
      console.log(this.$store.getters.getUserBoard);
    },
    //-----------------------------------------------------
    groupProds() {
      return this.getUserBoard.details_of_purchase.reduce(function(r, a) {
        r[a.product_name] = r[a.product_name] || [];
        r[a.product_name].push(a);
        return r;
      }, Object.create(null));
    }//en este metodo se conforma un objeto que agrupa en arrays de objetos varios objetos que cpomparten igual
    //caracteristicas, en este caso el  mismo nombre , para entonces sobre ese array de objetos loopear en el html
    //tag
  },
  /////////////////////////////////////////////////////////////////////////////////
  created() {
    console.log(this.groupProds, this.getUserBoard.details_of_purchase.length);
  }
};
</script>

<style>
#card {
  width: 200px;
  height: 140px;
}
#containerCard {
  width: 180px;
  margin-right: auto;
  margin-left: auto;
  margin-top: -10rem;
}
#prodsCount {
  position: absolute;
  margin-top: 90px;
  margin-left: 80px;
}
#imgSize {
  width: 60px;
  height: 60px;
  margin-left: 10px;
}
</style>