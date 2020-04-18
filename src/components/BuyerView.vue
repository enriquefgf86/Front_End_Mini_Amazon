<template>
  <v-container>
    <video style="z-index;-1" autoplay muted loop id="video">
      <source src="../assets/shopcard.mp4" type="video/mp4" />
    </video>
    <v-container
      width="400"
      class="d-flex flex-row"
      id="containerPurch"
      v-for="(allPurchs,index) in getUserBoardPurch.all_user_purchases"
      :key="index"
    >
      <v-card id="cardColor" width="300">
        <h3 id="letInvoice" class="ml-3">Invoice #: {{allPurchs.purchase_id}}</h3>
        <v-container class="d-flex flex-row">
          <h3 id="letDate" class="ml-3">Date:{{allPurchs.purchase_date.slice(0,10)}}</h3>

          <v-card-actions>
            <router-link :to="'/myboard/buyerView/purchase/'+allPurchs.purchase_id">
              <v-btn small class="ml-3 lime lighten-2 font-weight-black">Details</v-btn>
            </router-link>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-container>
  </v-container>
</template>

<script>
//en este componente simplemente se refleja el resumen de coompras que tiene el usuario en su vista
//personal de compras, se establece un router link sobre un props a la pagina que daria la compra selecionada

import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "BuyerView",
  props: {
    BuyerView: Object //se determina como objeto para poder acceder e iterar sobre el
  },
  methods: {
    ...mapActions(["fetchingAllPurchasesViewBoardUser"])
  },
  computed: {
    ...mapGetters(["getAllProducts", "getUserBoardPurch"])
  },
  created() {
    this.fetchingAllPurchasesViewBoardUser();
  } //vease que es necesario en este created llamAR A LA ACCION DEL VUEX QUE HACE posible que se obtenga
  //el array de compras con sus respectivos productos realizados por el usuario.
};
</script>

<style>
#cardColor {
  background-color: rgba(255, 255, 255, 0.4);
}
#letInvoice {
  background-color: rgba(175, 180, 43, 0.3);
  width: 120px;
  padding-left: 10px;
}
#letDate {
  background-color: rgba(175, 180, 43, 0.3);
  width: 220px;
}
</style>