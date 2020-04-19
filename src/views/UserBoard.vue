<template>
  <v-container>
    <video style="z-index;-1" autoplay muted loop id="video">
      <source src="../assets/shopcard.mp4" type="video/mp4" />
    </video>
    <v-app>
      <v-container id="normal">
        <v-container class="d-flex justify-center">
          <img id="clicker" @click="toHome" src="../assets/casa.png" alt="casa" />
        </v-container>

        <v-container v-if="loading">
          <v-layout>
            <v-flex xs12 class="primary--text">
              <v-progress-circular indeterminate :width="7" :size="70" color="primary"></v-progress-circular>
            </v-flex>
          </v-layout>
        </v-container>

        <v-container v-else>
          <!-- <v-btn v-scroll="onScroll" v-show="fab" fab fixed bottom right @click="toTop">
            <img src="../assets/goTop.png" />
          </v-btn>-->

          <v-btn
            v-if="details==false"
            @click="details=!details"
            small
            color="lime lighten-2 mb-3 "
            class="hidden-md-and-up"
          >
            <img id="morDetails" src="../assets/seemore.png" />
          </v-btn>

          <v-btn
            v-if="details==false"
            small
            class="hidden-sm-and-up"
            color="lime lighten-2 mb-3 ml-10"
            @click="confirmPurch=true"
          >Purchase</v-btn>

          <h3 class="hidden-sm-and-up" v-if="details==false">Pre-Purchase Log</h3>

          <v-container id="mdUp" class="hidden-sm-and-down">
            <v-container id="containerDisc">
              <v-container class="d-flex align-center" id="tot" v-if="totalDiscount>0">
                <h3 style="font-size:20px">Disccount:</h3>
                <h3 style="font-size:40px">${{totalDiscount.toFixed(2)}}</h3>
              </v-container>
            </v-container>

            <v-btn small color="lime lighten-2 mb-3 " @click="confirmPurch=true">Purchase</v-btn>

            <h3 id="yourShop">Your Pre-Purchase Shopping Cart</h3>

            <div id="logProd" v-for="(products,index) in filteringArray" :key="index">
              <h4 id="letterType">
                Product: {{products.product_name}}
                Counting: {{products.count}} unities
              </h4>
            </div>

            <v-container id="containerDet1" class="d-flex align-center flex-wrap">
              <v-card id="cardCss" class="mb-3">
                <h4 id="letter">Buying 4 of same type getting 1 free</h4>
                <h3 id="letter">For this concept a disccount of $ {{totalDiscEquals[0].toFixed(2)}}</h3>
              </v-card>

              <v-card id="cardCss" class="mb-3">
                <v-card-actions>
                  <v-btn icon large color="deep-orange" @click="show = !show">
                    <v-icon
                      class="ml-7"
                    >{{ show ? 'mdi-chevron-up-circle-outline' : 'mdi-chevron-down-circle-outline' }}</v-icon>Details
                  </v-btn>
                </v-card-actions>

                <v-expand-transition>
                  <div v-show="show">
                    <v-divider></v-divider>

                    <v-container v-for="(details,index) in finalDiscEquals[0]" :key="index">
                      <h5>
                        * Product: {{details.product_name}}
                        * Free :{{details.product_free}}
                        * Disccount: {{details.product_free_discount}}
                      </h5>
                    </v-container>
                  </div>
                </v-expand-transition>
              </v-card>

              <v-card id="cardCss">
                <h4 id="letter">Buying more than 5 products getting 10% discount</h4>
                <h3 id="letter">For this concept a disccount of $ {{discountP5.toFixed(2)}}</h3>
              </v-card>
            </v-container>
          </v-container>

          <v-container id="smDown">
            <v-navigation-drawer
              class="hidden-md-and-up mt-1"
              absolute
              height="750px"
              width="600"
              v-model="details"
              id="drawPrePurch"
            >
              <v-container
                v-if="details!=false"
                style="cursor:pointer"
                @click="details=!details"
                small
                class="hidden-md-and-up mt-5 mr-1"
              >
                <img id="arrowlefti" src="../assets/leftArrow.png" />
              </v-container>

              <v-container id="containerDisc">
                <v-container class="d-flex align-center" id="tot1" v-if="totalDiscount>0">
                  <h3 id="styleDisc">Disccount:</h3>
                  <h3 id="styleNumDisc">${{totalDiscount.toFixed(2)}}</h3>
                </v-container>
              </v-container>

              <h3 id="yourShop">Your Pre-Purchase Shopping Cart</h3>

              <div id="logProd" v-for="(products,index) in filteringArray" :key="index">
                <h4 id="letterType">
                  Product: {{products.product_name}}
                  Counting: {{products.count}} unities
                </h4>
              </div>

              <v-container id="containerDet" class="d-flex align-center flex-wrap">
                <v-card id="cardCss" class="mb-3">
                  <h4 id="letter">Buying 4 of same type getting 1 free</h4>
                  <h3
                    id="letter"
                  >For this concept a disccount of $ {{totalDiscEquals[0].toFixed(2)}}</h3>
                </v-card>

                <v-card id="cardCss" class="mb-3">
                  <v-card-actions>
                    <v-btn icon large color="deep-orange" @click="show = !show">
                      <v-icon
                        class="ml-7"
                      >{{ show ? 'mdi-chevron-up-circle-outline' : 'mdi-chevron-down-circle-outline' }}</v-icon>Details
                    </v-btn>
                  </v-card-actions>

                  <v-expand-transition>
                    <div v-show="show">
                      <v-divider></v-divider>

                      <v-container v-for="(details,index) in finalDiscEquals[0]" :key="index">
                        <h5>
                          * Product: {{details.product_name}}
                          * Free :{{details.product_free}}
                          * Disccount: {{details.product_free_discount}}
                        </h5>
                      </v-container>
                    </div>
                  </v-expand-transition>
                </v-card>

                <v-card id="cardCss">
                  <h4 id="letter">Buying more than 5 products getting 10% discount</h4>
                  <h3 id="letter">For this concept a disccount of $ {{discountP5.toFixed(2)}}</h3>
                </v-card>
              </v-container>
            </v-navigation-drawer>
          </v-container>

          <v-container id="prePurch">
            <UserDashBoard></UserDashBoard>
          </v-container>
        </v-container>

        <v-dialog v-model="confirmPurch" width="300">
          <v-card width="300" color="rgb(255, 255,255, 0.7)">
            <h3 id="confirm">Are you sure about this operation?</h3>

            <v-btn
              class="lime lighten-2 ml-8 mt-10 mb-8"
              @click="finalBuy(),confirmPurch=false"
            >Yes,go!!!</v-btn>

            <v-btn class="lime lighten-2 ml-8 mt-10 mb-8" @click="confirmPurch=false">Cancel</v-btn>
          </v-card>
        </v-dialog>
      </v-container>
    </v-app>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import UserDashBoard from "../components/UserDashBoard.vue";
export default {
  name: "UserBoard",
  data() {
    return {
      confirmPurch: false,

      //todo lo referente a variables globales de descuento
      show: false,
      fab: false,
      details: false,
      allPrices: [],
      discountP5: 0,

      //todo lo referente a variables globales para el loop de descuentos repetidos antes de fusionar
      productFreeGlob: [],
      dicountProductFreeGlob: [],

      //todo lo referente a objetos  globales de para loopear sobre productos con descuento
      createElement: [],
      finalDiscEquals: [],
      totalDiscEquals: []
    };
  },
  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  methods: {
    ...mapActions(["fetchAllProducts", "addProductSale", "addProdToBuy"]),

//---------------------------router to home-----------------------------
    toHome() {
      this.$router.push("/");
      setTimeout(() => {
        location.reload();
      }, 0.000001);
    },

//---------------------------accion final para enviar la compra de productos al backend----------------
    finalBuy() {
      let idProds = this.getBoardUpdated.details_of_purchase.map(
        object => object.product_id
      );
      this.$store.dispatch("addProdToBuy", { purchases: idProds });
      this.$router.push("/myboard/buyerView");
      setTimeout(() => {
        location.reload();
      }, 0.000001);
    }
  },
  //en este paso ya en la vista del usario todos los productos listos[para adicionar entonces se procede
  //a hacer el dispatch que modificaria el backend mediante metodo post desde vuex

////////////////////////////////////////////////////////////////////////////////////////////////////////
  computed: {
    ...mapGetters([
      "getAllProducts",
      " getarrayProductsToBuy",
      "getUserBoard",
      "getUpDatedBoard",
      "getState",
      "getLoader"
    ]),
    //---------------------------------------Loader para cargar-------------------------------------------
    loading() {
      // console.log(this.getLoader);

      return this.$store.getters.getLoader;
    },
    //--------------------------------------para obtener el json user board actualizado-------------------
    getBoardUpdated() {
      // console.log(this.$store.getters.getUserBoard);
      return this.$store.getters.getUserBoard;
    },
    //---------------------metodo  que determina un objeto repetido por valores y key------------------
    filteringArray() {
      let objectRepeated = {};
      for (let i in this.getUserBoard.details_of_purchase) {
        let key = this.getUserBoard.details_of_purchase[i].product_id;
        objectRepeated[key] = {
          product_id: key,
          count:
            objectRepeated[key] && objectRepeated[key].count
              ? objectRepeated[key].count + 1
              : 1,
          product_name: this.getUserBoard.details_of_purchase[i].product_name
        };
      }
      return Object.values(objectRepeated);
      // console.log(ojectRepeated);
    },

    //-----------metodo que determina los descuentos por productos iguales mayores que 4 unidades-------------------------------------------
    discountEquals() {
      let productFree;
      let discountProductFree;
      let objectCreated = {};

      for (let i in this.filteringArray) {
        for (let j in this.getUserBoard.details_of_purchase) {
          if (
            this.filteringArray[i].product_id ==
              this.getUserBoard.details_of_purchase[j].product_id &&
            this.filteringArray[i].count >= 4
          ) {
            productFree = Math.floor(this.filteringArray[i].count / 4);
            discountProductFree =
              productFree *
              this.getUserBoard.details_of_purchase[j].product_price;
            this.createElement.push(
              (objectCreated = {
                product_name: this.getUserBoard.details_of_purchase[j]
                  .product_name,
                product_free: productFree,
                product_free_discount: discountProductFree,
                product_id: this.getUserBoard.details_of_purchase[j].product_id
              })
            );
            this.productFreeGlob.push(productFree),
              this.dicountProductFreeGlob.push(discountProductFree);
            // console.log(
            //   this.getUserBoard.details_of_purchase[j].product_name,
            //   productFree,
            //   discountProductFree.toFixed(2)
            // );
          }
        }
      }

      return Object.values(objectCreated);
      // console.log(Object.values(objectCreated));
    },

    //--------metodo que determina un objeto unico para cada producto determiando su nombre y tipo de descuento
    //--------ademas de cuantos productos free corresponderian-------------------------------------------------
    objectUnique() {
      let unique = [];

      this.createElement.map(x =>
        unique.filter(a => a.product_id == x.product_id).length > 0
          ? null
          : unique.push(x)
      );
      // this.createElement = [];
      this.productFreeGlob = [];
      this.dicountProductFreeGlob = [];

      return (
        unique,
        this.finalDiscEquals.push(unique),
        (this.totalDiscEquals = []),
        this.totalDiscEquals.push(
          unique.reduce((a, b) => a + b.product_free_discount, 0)
        )
      );
    },

    //---metodo pra determinar el descuento del 10% sobre la compra de mas de 5 productos -------------
    discountMore5() {
      let sum = null;
      let discountPlus5 = null;
      let finalPrice = null;

      if (this.getUserBoard.details_of_purchase.length > 5) {
        for (let i = 0; i < this.getUserBoard.details_of_purchase.length; i++) {
          let pricePurch = this.getUserBoard.details_of_purchase[i]
            .product_price;

          sum = sum + pricePurch;
          // console.log(pricePurch);
        }
        discountPlus5 = sum * 0.1;
        finalPrice = (sum - discountPlus5).toFixed(2);
        (this.allPrices = []), this.allPrices.push(sum);

        this.discountP5 = 0;
        this.discountP5 = discountPlus5;
      }
    },
    //------------------------metodo para determinar la suma de los dos descuentos --------------------
    totalDiscount() {
      return this.discountP5 + this.totalDiscEquals[0];
    },
    //---------------------------Router to Home------------------------------------------
    getUserBoardroute() {
      if (this.getUserBoard.details_of_purchase.length == 0) {
        this.$router.push("/");
      }
    }
  },

//////////////////////////////////////////////////////////////////////////////////////
  created() {
    this.filteringArray;
    this.discountMore5;
    this.discountEquals;
    this.objectUnique;
    this.totalDiscObUnique;
    this.getUserBoardroute;
  },

//////////////////////////////////////////////////////////////////////////////////////////////////
  watch: {
    getState() {
      if (this.getState == true) {
        this.discountEquals, this.totalDiscount;
      }
      // console.log(
      //   this.getState,
      //   this.discountEquals,
      //   this.objectUnique,
      //   this.totalDiscEquals,
      //   this.totalDiscount
      // );
    }
  }
};
</script>

<style>
#tot,
#tot1 {
  width: 15rem;
  flex-direction: column;
  flex-wrap: wrap;
  z-index: 1;
}
#tot {
  margin-top: -3rem;
  background: rgba(175, 180, 43, 0.3);
}
#tot1 {
  margin-top: 3rem;
  background: rgba(255, 255, 255, 0.6);
}
#styleDisc {
  font-size: 20px;
}

#styleNumDisc {
  font-size: 40px;
}
#morDetails {
  width: 20px;
  height: 20px;
}
#drawPrePurch {
  background-color: rgba(175, 180, 43, 0.7);
  position: absolute;
  margin-left: -0.7rem;
  border-radius: 10px;
}
#confirm {
  background-color: rgba(200, 250, 20, 0.3);
  font-weight: bold;
  font-size: 18px;
  padding-left: 10px;
}
#clicker {
  z-index: 1;
  cursor: pointer;
  outline: none;
}
#clicker:active {
  transform: translateY(6px);
}
#containerC {
  width: 100%;
  margin-right: 180px;
  margin-left: auto;
  margin-top: -200px;
}
#normal {
  background: rgba(175, 180, 43, 0.3);
}
#yourShop,
#logProd {
  background: rgba(175, 180, 43, 0.3);
  padding-right: 5px;
  padding-left: 7px;
}
#yourShop {
  width: 300px;
}
#logProd {
  width: 350px;
  padding-right: 7px;
  padding-left: 7px;
  width: 19rem;
}
#letterType {
  font-weight: bold;
}
#letter {
  margin-left: 0.7rem;
}
#cardCss {
  background-color: rgba(255, 255, 255, 0.8);
  width: 30rem;
}
#containerDet1 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#containerDisc {
  width: 100%;
  padding: 12px;
  margin-right: auto;
  margin-left: auto;
}
#prePurch {
  height: 700px;
  overflow: scroll;
}
#prePurch::-webkit-scrollbar {
  width: 20px;
}
#prePurch::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

#prePurch::-webkit-scrollbar-thumb {
  background: rgb(197, 240, 4);
  border-radius: 10px;
}

#prePurch::-webkit-scrollbar-thumb:hover {
  background: rgb(197, 240, 4);
}

#arrowlefti {
  width: 34.5px;
  height: 35.5px;
}

@media screen and (orientation: landscape) {
  #arrowlefti {
    margin-left: 500px !important;
  }
  #tot1 {
    margin-top: -5rem;
  }
  #styleDisc {
    font-size: 10px;
  }

  #styleNumDisc {
    font-size: 20px;
  }

  #containerDet {
    width: 300px;
    position: absolute;
    margin-top: -5rem;
    margin-left: 18rem;
  }
}
</style>