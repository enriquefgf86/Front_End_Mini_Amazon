<template>
  <v-container class="content" v-if="getAllProducts.products">
    <v-card
      width="200"
      class="ml-12"
      v-if="getAllProducts.user.user_name==ProductCard.product_provider"
    >
      <v-container id="editor" width="200" v-if="ProductCard.product_stock>0">
        <v-btn class="ml-2 lime lighten-2" x-small @click="deletProd()">Delete</v-btn>
        <v-btn class="ml-12 lime lighten-2" x-small @click="editProd">Edit</v-btn>
      </v-container>
    </v-card>

    <v-card
      xs12
      class="ml-12"
      color="lime lighten-2"
      fluid
      height="320"
      width="200"
      v-if="ProductCard.product_stock>0"
    >
      <v-layout row wrap>
        <v-flex xs6 sm6 align-left>
          <v-card-title>
            <h3 style="font-size:14px;margin-left:10px;">{{ProductCard.product_name}}</h3>
          </v-card-title>
        </v-flex>
        <v-flex xs6 sm6 class="mt-4">
          <v-img @click.stop="description=true" src="../assets/seemore.png" class="description" />
        </v-flex>
      </v-layout>

      <v-layout row wrap fluid align-center>
        <v-flex xs6 sm6 align-center>
          <v-card-text width="50%">
            <h3 style="font-size:14px;margin-left:10px;">Price:</h3>
            <h3 id="price" style="font-size:14px;margin-left:10px;">${{ProductCard.product_price}}</h3>
          </v-card-text>
        </v-flex>

        <v-flex xs6 sm6 align-center>
          <v-card-text width="50%">
            <h3 style="font-size:14px">Stock:</h3>
            <h3 style="font-size:14px">{{ProductCard.product_stock}} U</h3>
          </v-card-text>
        </v-flex>
      </v-layout>

      <v-layout>
        <v-flex width="100" xs12 sm12 align-center>
          <h3 style="margin-left:60px;margin-top:-15px">Rated({{ProductCard.rate.toFixed(1)}})</h3>
          <h6 style="margin-left:70px;">Votes:{{ProductCard.people_voting_in_rate}}</h6>
          <v-container @click="pollView=true" style="margin-top:-1.5rem;z-index:1">
            <div>
              <v-rating
                style="margin-left:-1rem;z-index:-1"
                fluid
                width="50"
                v-model="rating"
                color="yellow darken-3"
                background-color="grey darken-1"
                empty-icon="$ratingFull"
                half-increments
              ></v-rating>
            </div>
          </v-container>
        </v-flex>
      </v-layout>

      <v-layout>
        <v-flex>
          <v-carousel fluid cycle height="110" hide-delimiter-background show-arrows-on-hover>
            <v-carousel-item
              class="mt-1 ml-8"
              v-for="(slide, i) in ProductCard.product_image"
              :key="i"
            >
              <v-img :src="slide" height="100" width="100" />
            </v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>
    </v-card>

    <v-dialog
      v-if="getAllProducts.user.user_name!=ProductCard.product_provider"
      v-model="description"
      width="250"
    >
      <v-card v-if="getAllProducts.products">
        <v-container>
          <div class="purch">
            <h3 style="font-size:15px;width:200px;position:absolute">Purch.Price $</h3>
            <input
              type="number"
              id="from_amount"
              name="to_amount"
              :value="(ProductCard.product_price*unities).toFixed(2)"
              style="width:100px;margin-left:95px"
            />
          </div>

          <v-card-actions>
            <v-img @click="description = false" src="../assets/close.png" class="details" />
          </v-card-actions>

          <v-img src="../assets/cart.png" @click="addCard(),description=false" class="cart" />

          <div class="numCont">
            <img src="../assets/add.png" id="rest" @click="unities++" class="add" />

            <input
              type="number"
              id="quantity"
              name="unities"
              v-model="unities"
              style="color:black;margin-left:204px;margin-top:1px;width:35px; height:30px"
            />

            <img src="../assets/rest.png" id="rest" @click="unities--" class="rest" />
          </div>

          <v-img
            style="width:150px;height:150px;margin-top:-200px"
            :src="ProductCard.product_image[1]"
          ></v-img>
          <h4>Provider:</h4>
          <h3 style="font-size:14px;margin-left:10px;">{{ProductCard.product_provider}}</h3>
          <h4>Description:</h4>
          <h3 style="font-size:14px;margin-left:10px;">{{ProductCard.product_description}}</h3>
        </v-container>
      </v-card>
    </v-dialog>
    <v-dialog
      v-if="getAllProducts.user.user_name==ProductCard.product_provider"
      v-model="description"
      width="250"
    >
      <v-card v-if="getAllProducts.products" height="250">
        <v-container>
          <v-card-actions>
            <v-img @click="description = false" src="../assets/close.png" class="details" />
          </v-card-actions>

          <v-img
            style="width:110px;height:110px;margin-top:-20px"
            :src="ProductCard.product_image[1]"
          ></v-img>You are the provider, so can't buy this product.Perhaps want to Edit?
          <v-btn @click="editProd();description = false" class="ml-10 lime lighten-2" x-small>Edit</v-btn>
        </v-container>
      </v-card>
    </v-dialog>
    <v-dialog width="250" height="300" v-model="pollView">
      <v-card width="250" height="300">
        <v-card-actions>
          <v-img @click="pollView = false" src="../assets/close.png" class="details" />
        </v-card-actions>

        <v-container class="d-flex flex-row">
          <img id="poll" src="../assets/poll.png" alt="poll" />

          <div id="pollVote">
            <v-btn
              class="mb-3 lime lighten-2"
              width="40"
              x-small
              v-for="(vote,index) in pollComposer"
              :id="vote.poll"
              @click="scorer(vote)"
              :key="index"
            >{{ vote.pts }} pts</v-btn>
          </div>
        </v-container>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "ProductCard",
  props: {
    ProductCard: Object
  },
  data() {
    return {
      //determinandose los valores v-models para rating y people rating
      rating: this.ProductCard.rate,
      peopleVoting: this.ProductCard.people_voting_in_rate,

      //-----------------------------------------------------    
      pollView: false,//v-model del v-dialog para rating de productos show true show false

      //-----------------------------------------------------   
      // Array de objetos creado para determinar que puntuacion se vota y cuantas veces, creo que este paso es
      //innecesario
      pollComposer: [
        {
          idProd: this.ProductCard.product_id,
          poll: "5pts",
          timesVoted: 0.0,
          pts: 5.0
        },
        {
          idProd: this.ProductCard.product_id,
          poll: "4pts",
          timesVoted: 0.0,
          pts: 4.0
        },
        {
          idProd: this.ProductCard.product_id,
          poll: "3pts",
          timesVoted: 0.0,
          pts: 3.0
        },
        {
          idProd: this.ProductCard.product_id,
          poll: "2pts",
          timesVoted: 0.0,
          pts: 2.0
        },
        {
          idProd: this.ProductCard.product_id,
          poll: "1pts",
          timesVoted: 0.0,
          pts: 1.0
        }
      ],
      //-----------------------------------------------------    
      leverage: [
        [[], 5.0],
        [[], 4.0],
        [[], 3.0],
        [[], 2.0],
        [[], 1.0]
      ], //array elaborado para determinar cuantos votantes de a uno votan en cada puntuacion, seria una continuacion
      //del objeto anterior

      //-----------------------------------------------------     
      description: false,//otro v-model para mostrar ocultar v-dialogues
      
      //-----------------------------------------------------    
      unities: "",//counter de productos anadidos a la cesta de compra desde la vista del comprador

      link: null,
      allPrices: [],
      toBuy: [] //array created to push the onclick buys per product
    };
  },
  ////////////////////////////////////////////////////////////////////////////////////////////////
  methods: {
    ...mapActions([
      "fetchAllProducts",
      "addPurchase",
      "fetchUserIdProducts",
      "addProductSale",
      "addPurchaseBought",
      "productsToBuyInCard",
      "passEdit",
      "deleteProviderProduct",
      "rateUpdater"
    ]),
    ...mapMutations(["settingAddPurch"]),
    //
    //--------------------------------conforming the object leverage per user click--------------------------
    scorer(vote) {
      this.pollView = false;
      this.ProductCard.rate
      vote.timesVoted++;

      let reducer = (r, a) => r.map((b, i) => a[i] + b);

      for (let i = 0; i < this.leverage.length; i++) {
        let pts = this.leverage[i][1];
        let newVote = [];

        if (vote.pts == pts) {
          newVote.push(1);
          newVote.push(pts);

          this.$store.dispatch("rateUpdater", {
            ratePack: {
              productRate: newVote[1],
              // peopleRating: newVote[0],
              
            },
            product_id: this.ProductCard.product_id,
            providers:this.ProductCard.product_provider
            
          });
          // console.log(newVote);
        }
      }
    },

    //-----------------------------------------------------------------------------------------------
    sendTEdit() {
      return this.editProd;
    },

    //-------------------------------adicion al carro de compras sin aun confirmar compras-----------------------------------------
    addCard() {
      if (this.ProductCard.product_stock < this.unities) {
        alert("sorry you want to buy too much");
        this.unities = 0;
      } else if (!this.ProductCard.product_stock < 1) {
        for (let call = 0; call < this.unities; call++) {
          this.toBuy.push(this.ProductCard); ///setting them all in a local global Variable toBuy
          this.ProductCard.product_stock--; //resting products of stock
        }

        this.unities = 0; //getting todas la unidades a cero para empezar el ciclo de nuevo
      } else {
        alert("sorry no products available");
        this.unities = 0;
        this.getUserBoard;
      }
      // console.log(this.toBuy);
      this.$store.dispatch("productsToBuyInCard", this.toBuy); //mandandose a vuex para su posterior proceso
    },

    //--------------------------------------metodo para borrar producto-------------------------------------
    deletProd() {
      this.$store.dispatch("deleteProviderProduct", {
        currentDelProd: {
          productStock: 0
        },
        productId: this.ProductCard.product_id
      });
    },

    //--------------------------------------metodo para editar producto-------------------------------------
    editProd() {
      this.$store.dispatch("passEdit", this.ProductCard);
    }
    //vease que al ser un componente y la accion es referida al producto de manera general, es necesario
    //pasar dicho producto de manera global al Vuex , para enonces desde ahi almacenado en una variable
    //local y tomando su id se procederia entonces a la consiguiente operacion

    //-------------------------------------------------------------------------------------------------------------------
  },
  /////////////////////////////////////////////////////////////////////////////////////////////////
  computed: {
    ...mapGetters(["getAllProducts", "getUserBoard"]),

    allProducts() {
      return this.getAllProducts;
    }
  },
  //////////////////////////////////////////////////////////////////////////////////////////////
  created() {
    // this.addProductSale();
    this.fetchAllProducts();
    
    // this.fetchUserIdProducts();
    // console.log(this.getAllProducts);
    // console.log(this.ProductCard.rate,this.ProductCard.people_voting_in_rate);
    // console.log(this.rating);
    
    


    //vease que se crea aqui el fecht al board del usuario pues desde esta vista se
    //actualizan los valores que el usuario adiciona a su boar personal una vez
    //agregado el producto

    // console.log(this.pollComposer);
  },
  ///////////////////////////////////////////////////////////////////////////////////////////////
  watch: {
    unities: function(val) {
      if (val < 0) {
        this.unities = 0;
      }
    },
    //-----------------------------------------------------    
    ProductCard() {
      if (this.ProductCard.rate > 5.0) {
        return (this.ProductCard.rate = 5.0);
      }

      this.rating=this.ProductCard.rate
    },
  }
};
</script>

<style>
.class {
  display: none;
}
.content {
  padding-right: -13px;
  padding-left: -13px;
  padding-bottom: 2px;
  margin-right: auto;
  margin-left: auto;
  width: 250px;
}
.cart {
  margin-left: 195px;
  margin-top: 20px;
  width: 30px;
  height: 30px;
}
.details {
  margin-left: 195px;
  width: 30px;
  height: 30px;
}
.rest {
  margin-left: 200px;
  margin-top: 10px;
  width: 25px;
  height: 25px;
}
.add {
  margin-left: 200px;
  margin-top: 10px;
  width: 27px;
  height: 27px;
}
.description {
  margin-left: 65px;
  width: 30px;
  height: 30px;
}
.details,
.cart,
.add,
.rest,
.description {
  z-index: 1;
  cursor: pointer;
  outline: none;
}
.details:active,
.cart:active,
.add:active,
.rest:active,
.description:active {
  transform: translateY(6px);
}
#poll {
  width: 180px;
  height: 180px;
}
#pollVote {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}
#editor{
  background-color:rgba(175, 180, 43, 0.3);
}
</style>