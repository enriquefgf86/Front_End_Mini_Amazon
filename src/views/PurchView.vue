<template>
  <v-container id="colorback">
    <video style="z-index;-1" autoplay muted loop id="video">
      <source src="../assets/shopcard.mp4" type="video/mp4" />
    </video>

    <v-container class="d-flex justify-center">
      <img id="clicker" @click="toHome" src="../assets/casa.png" alt="casa" />
    </v-container>
    
<v-card id="cardColor" >
  <router-link to="/myboard/buyerView">
          <img id="arrowLefti2" src="../assets/leftArrow.png" />

    </router-link>
<v-card-title>Total Cost: ${{selectedPurch.purchase_price.toFixed(2)}} {{selectedPurch.purchase_disccount==0?"":"With A Disccount Of $" +""+ selectedPurch.purchase_disccount.toFixed(2)}}</v-card-title>
    <v-container id="cardContainer">
      <v-container class="containerEl" v-for="(item,key ,index) in PurchView" :key="index">
        <h3>{{item.length}} {{item.length>1?"unities":"unit"}}</h3>
        <v-card id ="cardSize" width="200" height="120" color="lime lighten-1">
          <v-card-title>{{item[0].product_name}}</v-card-title>
          <v-img id="imgcard" :src="item[0].product_imgs[0]"></v-img>
          <h3>Price:${{item[0].product_price.toFixed(2)}}</h3>
        </v-card>
      </v-container>
    </v-container>
</v-card>
    
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "PurchView",
  props: ["purchaseSelected"],

  data() {
    return {};
  },
  ///////////////////////////////////////////////////////////////////////////
  methods: {
    ...mapActions(["fetchingAllPurchasesViewBoardUser"]),
//-------------------------------------------hom router----------------------------------
    toHome() {
      this.$router.push("/");
      setTimeout(() => {
        location.reload()
      }, 0.0);
    }
  },
////////////////////////////////////////////////////////////////////////////////////////
  computed: {
    ...mapGetters(["getPurchaseSelected", "getUserBoardPurch"]),

//---------------------------Compra seleccionada segun props del router----------------
    selectedPurch() {
      return this.getPurchaseSelected(this.purchaseSelected);
    },

  //---------------------------Objeto creado con objetos de igual caractyeristicas agrupados----------------
    PurchView() {
      return this.selectedPurch.products_in_purchase.reduce(function(r, a) {
        r[a.product_name] = r[a.product_name] || [];
        r[a.product_name].push(a);
        return r;
      }, Object.create(null));
    }//en este metodo se conforma un objeto que agrupa en arrays de objetos varios objetos que cpomparten igual
    //caracteristicas, en este caso el  mismo nombre , para entonces sobre ese array de objetos loopear en el html
    //tag
  },
  //////////////////////////////////////////////////////////////////////
  created() {
    // console.log(this.PurchView);
  },
};
</script>

<style>
#imgcard {
  width: 30px;
  height: 30px;
}
/* #card {
  ;
  
} */
#cardContainer {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}
.containerEl {
  width: 200px;
}
#clicker {
  z-index: 1;
  cursor: pointer;
  outline: none;
}
#clicker:active {
  transform: translateY(6px);
}
/* #cardColor{
   background-color:rgba(175, 180, 43, 0.3);
} */
#cardSize{
  width: 200px;
}
#arrowlefti2{
  width: 34.5px;
  height:35.5px;
  margin-top:1rem;
  margin-left:1px
}
</style>