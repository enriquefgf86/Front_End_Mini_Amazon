<template>
  <v-container>
    <video style="z-index;-1" autoplay muted loop id="video">
      <source src="../assets/shopcard.mp4" type="video/mp4" />
    </video>
    <v-app>
      <div
        v-if="drawer==false"
        style="cursor:pointer;position:absolute"
        @click="drawer=!drawer"
        small
        class="hidden-md-and-up mt-5 mr-1"
      >
        <img id="imgDrawer" src="../assets/rightArrow.png" />
      </div>
      <v-container id="normal" v-if="getAllProducts.user!=null">
        <v-navigation-drawer
          id="navDrawer"
          class="hidden-md-and-up mt-1"
          absolute
          height="350px"
          v-model="drawer"
        >
          <v-container
            v-if="drawer!=false"
            style="cursor:pointer"
            @click="drawer=!drawer"
            small
            class="hidden-md-and-up mt-5 mr-1"
          >
            <img id="arrowLeft" style="width: 34.5px;heigh:35.5px" src="../assets/leftArrow.png" />
          </v-container>

          <v-container class="d-flex flex-column">
            <v-container class="d-flex flex-column justify-center">
              <h3 class="mb-2" id="drawerUser">Welcome:{{getAllProducts.user.user_name}}</h3>
              <h4 id="drawerStatus">{{getAllProducts.user.user_role.toUpperCase()}}</h4>
            </v-container>

            <router-link to="/myboard/buyerView">
              <v-btn
                id="purchDrawer"
                color="lime lighten-2 mb-5 ml-3"
                x-small
                v-if="getUserBoardPurch.all_user_purchases.length>0"
              >
                Purchases
                <img id="imgView" src="../assets/view.png" alt="view" />
              </v-btn>
            </router-link>

            <v-btn
              style="width:140px"
              color="lime lighten-2 mb-5 ml-3"
              x-small
              v-if="getAllProducts.user.user_role=='seller'"
              @click.stop="viewProvider=!viewProvider"
              @click="drawer=!drawer"
            >
              {{getAllProducts.user.user_role=='seller'&&viewProvider==false?"To Provider View":"To Client View"}}
              <img
                src="../assets/switchView.png"
              />
            </v-btn>

            <v-btn
              id="logOut"
              style="width:90px"
              x-small
              v-if="getAllProducts.user!=null"
              color="lime lighten-2 mb-5 ml-3"
              @click="logOut"
            >
              Log Out
              <img src="../assets/logOut.png" />
            </v-btn>
          </v-container>
        </v-navigation-drawer>

        <v-container class="d-flex flex-row justify-end">
          <h3 class="hidden-sm-and-down" id="welcomeUser">Welcome:{{getAllProducts.user.user_name}}</h3>

          <router-link to="/myboard/buyerView">
            <v-btn
              v-if="getUserBoardPurch.all_user_purchases.length>0"
              class="hidden-sm-and-down"
              style="width:135px"
              id="bottomYourPurch"
              color="lime lighten-2 "
              small
            >
              My Purchases
              <img id="imgView" src="../assets/view.png" alt="view" />
            </v-btn>
          </router-link>
        </v-container>

        <h4
          id="userStatus"
          class="hidden-sm-and-down"
        >User Type: {{getAllProducts.user.user_role.toUpperCase()}}</h4>

        <h4
          id="stockProv"
          class="hidden-sm-and-down"
          v-if="getAllProducts.user.user_role=='seller'"
        >Products on the Store: {{prov}} products</h4>
        <v-container class="d-flex flex-row justify-space-around">
          <v-btn
            style="width:150px"
            color="lime lighten-2 "
            small
            class="hidden-sm-and-down"
            v-if="getAllProducts.user.user_role=='seller'"
            @click.stop="viewProvider=!viewProvider"
          >{{getAllProducts.user.user_role=='seller'&&viewProvider==false?" go To Provider View":" Go To Client View"}}</v-btn>
          <h2
            id="viewClient"
            class="hidden-sm-and-down"
            v-if="getAllProducts.user.user_role=='seller'"
          >User {{getAllProducts.user.user_name}} at {{getAllProducts.user.user_role=='seller'&&viewProvider==false?" Client View":" Provider View"}}</h2>
          <h2
            id="viewClient"
            class="hidden-sm-and-down"
            v-else
          >User {{getAllProducts.user.user_name}} at Client View</h2>
        </v-container>

        <v-container class="d-flex flex-row justify-end">
          <v-btn
            class="hidden-sm-and-down"
            style="width:60px"
            id="logOut"
            small
            v-if="getAllProducts.user!=null"
            color="lime lighten-2 "
            @click="logOut"
          >Log Out</v-btn>
        </v-container>
        <v-flex row>
          <div
            v-if="productsToBuyCard.length>0&&getAllProducts.user.user_role=='buyer'
          ||productsToBuyCard.length>0&&getAllProducts.user.user_role=='seller'&&viewProvider==false"
          >
            <router-link to="/myboard">
              <v-btn
                small
                color="lime lighten-2 "
                @click="AddAllProdCard()"
              >Add?({{productsToBuyCard.length}})</v-btn>
            </router-link>
          </div>

          <div v-else>
            <h3
              id="instructions"
              class="ml-5"
              v-if="getAllProducts.user.user_role=='seller'&&viewProvider==false||getAllProducts.user.user_role=='buyer'"
            >
              Click on card
              <img id="imgIcons" src="../assets/seemore.png" /> to add to the
              <img s id="imgIcons" src="../assets/cart.png" />
            </h3>
          </div>

          <v-btn
            id="postProd"
            small
            color="lime lighten-2 "
            v-if="getAllProducts.user.user_role==='seller'&&viewProvider!=false"
            class="ml-7"
            @click.stop="addingProduct=true"
          >Post New Product</v-btn>
          <v-dialog v-model="addingProduct" width="250">
            <v-card>
              <v-container>
                <v-layout row wrap>
                  <v-flex xs12 sm12 lg12 xl12>
                    <v-card-actions>
                      <img @click="addingProduct = false" id="details" src="../assets/close.png" />
                    </v-card-actions>

                    <v-card>
                      <v-card-text>
                        <v-container>
                          <v-form @submit.prevent="addProductOnSale(thisCurrent)">
                            <v-layout row>
                              <v-flex xs12>
                                <v-text-field
                                  name="name of product"
                                  label="name of product"
                                  id="name"
                                  v-model="ProductAdded.name"
                                  type="name"
                                  required
                                ></v-text-field>
                              </v-flex>
                            </v-layout>
                            <v-layout
                              v-for="(option,index) in ProductAdded.Categories"
                              :key="index"
                            >
                              <v-flex xs12>
                                <div>
                                  <input
                                    name="id of product"
                                    label="id of product"
                                    type="checkbox"
                                    @click="option.selected = !option.selected"
                                  />
                                  <label>{{ option.value }}</label>
                                </div>
                              </v-flex>
                            </v-layout>
                            <v-layout row>
                              <v-flex xs12>
                                <v-text-field
                                  name="price of product"
                                  label="price of product"
                                  id="price"
                                  v-model="ProductAdded.price"
                                  type="number"
                                  required
                                ></v-text-field>
                              </v-flex>
                            </v-layout>
                            <v-layout row>
                              <v-flex xs12>
                                <v-text-field
                                  name="unities"
                                  label="unities"
                                  id="u"
                                  v-model="ProductAdded.unities"
                                  type="number"
                                  required
                                ></v-text-field>
                                <v-text-field
                                  name="upload_image 1"
                                  label="1rst image url"
                                  id="image"
                                  v-model="ProductAdded.upload_image1"
                                  type="text"
                                  required
                                ></v-text-field>
                                <v-text-field
                                  name="upload_image 2"
                                  label="2nd image url"
                                  id="image"
                                  v-model="ProductAdded.upload_image2"
                                  type="text"
                                  required
                                ></v-text-field>
                                <v-text-field
                                  name="upload_image 3"
                                  label="3rd image url"
                                  id="image"
                                  v-model="ProductAdded.upload_image3"
                                  type="text"
                                  required
                                ></v-text-field>
                                <v-text-field
                                  name="description"
                                  label="description"
                                  id="bla_bla"
                                  v-model="ProductAdded.description"
                                  type="text"
                                  required
                                ></v-text-field>
                              </v-flex>
                            </v-layout>
                            <v-layout row>
                              <v-flex xs8>
                                <router-link to="/">
                                  <v-btn
                                    type="submit"
                                    class="lime lighten"
                                    :disabled="!validator"
                                    id="buttonAdd"
                                    @click.stop="addingProduct=false"
                                  >Add product</v-btn>
                                </router-link>
                              </v-flex>
                            </v-layout>
                          </v-form>
                        </v-container>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-dialog>

          <v-dialog v-model="editingProduct" width="250">
            <v-card>
              <v-container>
                <v-layout row wrap>
                  <v-flex xs12 sm12 lg12 xl12>
                    <v-card-actions>
                      <img
                        @click="editingProduct = editState()"
                        id="details"
                        src="../assets/close.png"
                      />
                    </v-card-actions>

                    <v-card>
                      <v-card-text>
                        <v-container>
                          <v-form @submit.prevent="editProductOnSale()">
                            <v-layout row>
                              <v-flex xs12>
                                <v-text-field
                                  name="unitiesEdit"
                                  label="unitiesEdit"
                                  id="u"
                                  v-model="ProductEdited.unities"
                                  type="number"
                                  required
                                ></v-text-field>
                                <v-text-field
                                  name="upload_image_1_Edit"
                                  label="1rst image url"
                                  id="image"
                                  v-model="ProductEdited.upload_image1"
                                  type="text"
                                  required
                                ></v-text-field>
                                <v-text-field
                                  name="upload_image 2 Edit"
                                  label="2nd image url"
                                  id="image"
                                  v-model="ProductEdited.upload_image2"
                                  type="text"
                                  required
                                ></v-text-field>
                                <v-text-field
                                  name="upload_image 3 Edit"
                                  label="3rd image url"
                                  id="image"
                                  v-model="ProductEdited.upload_image3"
                                  type="text"
                                  required
                                ></v-text-field>
                                <v-text-field
                                  name="descriptionEdit"
                                  label="description"
                                  id="bla_bla"
                                  v-model="ProductEdited.description"
                                  type="text"
                                  required
                                ></v-text-field>
                              </v-flex>
                            </v-layout>
                            <v-layout row>
                              <v-flex xs8>
                                <router-link to="/">
                                  <v-btn
                                    type="submit"
                                    class="lime lighten"
                                    :disabled="!validatorEdit"
                                    id="buttonAdd"
                                    @click.stop="editingProduct=editState()"
                                  >Edit product</v-btn>
                                </router-link>
                              </v-flex>
                            </v-layout>
                          </v-form>
                        </v-container>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-dialog>
          <v-container id="filters" class="d-flex flex-row flex-wrap justify-space-around">
            <SearchBar
              v-if="getAllProducts.user.user_role=='seller'&&viewProvider==false||getAllProducts.user.user_role=='buyer'"
              id="searchBar"
              @receivingSelfSearch="autoSearch"
              v-bind:val="Search"
            ></SearchBar>
            <Filters
              id="catFilter"
              v-if="getAllProducts.user.user_role=='seller'&&viewProvider==false||getAllProducts.user.user_role=='buyer'"
              @receivingCategoriesFilter="filterSearch"
              v-bind:categoriesSet="computedCategories"
            ></Filters>

            <FilterRate
              v-if="getAllProducts.user.user_role=='seller'&&viewProvider==false||getAllProducts.user.user_role=='buyer'"
              id="rateFilter"
              @receivingRatesFilter="rateSearch"
              v-bind:rateSet="computedRates"
            ></FilterRate>
          </v-container>
          <v-container v-if="getAllProducts.user.user_role=='seller'">
            <div
              v-if="getAllProducts.user.user_role=='seller'&&this.viewProvider==false
            ||getAllProducts.user.user_role=='buyer'"
              id="wrapper"
            >
              <ProductCard v-for="(card, index) in allProducts" :key="index" :ProductCard="card"></ProductCard>
            </div>

            <div id="wrapper" v-else>
              <ProductCard
                v-for="(card, index) in allProductsProvider"
                :key="index"
                :ProductCard="card"
              ></ProductCard>
            </div>
          </v-container>

          <v-container v-if="getAllProducts.user.user_role=='buyer'">
            <div id="wrapper">
              <ProductCard v-for="(card, index) in allProducts" :key="index" :ProductCard="card"></ProductCard>
            </div>
          </v-container>
        </v-flex>
      </v-container>

      <v-container v-else class="d-flex justify-center flex-wrap">
        <video autoplay muted loop id="video">
          <source src="../assets/shopcard.mp4" type="video/mp4" />
        </video>

        <v-container id="content">
          <h1>You Sell It...You Got It!!!</h1>
          <p>Online Store</p>
        </v-container>

        <v-container class="d-flex justify-center" id="in">
          <h1 id="user">Are you User?</h1>
          <v-container class="d-flex flex-row justify-space-between">
            <router-link to="/logIn">
              <v-btn class="ml-3 lime lighten-2 font-weight-black">Yes</v-btn>
            </router-link>

            <router-link to="/signUp">
              <v-btn class="ml-7 lime lighten-2 font-weight-black">No</v-btn>
            </router-link>
          </v-container>
        </v-container>
      </v-container>
    </v-app>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      drawer: false,
      fab: false,

      viewProvider: true,

      addingProduct: false,
      editingProduct: this.state,
      thisCurrent: null,
      //variables de busqueda//
      Search: "",
      CategoriesDropDown: "",
      RateDropDown: "",
      //Array de objetos sobre el cual se loopea para el dropdown de rates
      rateScale: [
        { Points: 5, kind: "stars", src: require("../assets/5stars.png") },
        { Points: 4, kind: "stars", src: require("../assets/4stars.png") },
        { Points: 3, kind: "stars", src: require("../assets/3stars.png") },
        { Points: 2, kind: "stars", src: require("../assets/2stars.png") },
        { Points: 1, kind: "stars", src: require("../assets/1stars.png") }
      ],

      //Objeto V-model creado para adicionar productos desde la vista del usuario
      ProductAdded: {
        description: "",
        upload_image3: "",
        upload_image2: "",
        upload_image1: "",
        unities: null,
        price: null,
        name: "",
        Categories: [
          { id: 1, value: "Miscellaneous", selected: false },
          { id: 2, value: "Homer", selected: false },
          { id: 3, value: "Electronic", selected: false },
          { id: 4, value: "Internet", selected: false },
          { id: 5, value: "Kids", selected: false },
          { id: 6, value: "Donas", selected: false },
          { id: 7, value: "Sports", selected: false },
          { id: 8, value: "Horror", selected: false }
        ]
      },
      selected: false, //sentinela que determina que categoria y su dentro del objeto creado fue seleccionada

      //objeto creado para enviar al backend productsos editados
      ProductEdited: {
        description: "",
        upload_image3: "",
        upload_image2: "",
        upload_image1: "",
        unities: null,
        price: null
      }
    };
  },
  ////////////////////////////////////////////////////////////////////////////////////////////
  methods: {
    ...mapActions([
      "fetchAllProducts",
      "addProductSale",
      "addProdToBuy",
      "addPurchase",
      "editProductSale",
      "passBackEdit",
      "getuserLogOut"
    ]),
    //------------------------------metodo para hacer el vido backgound play constantemente---------------
    player() {
      return this.play();
    },
    //----------------------------logOut metho----------------------------------------------------
    logOut() {
      return this.$store.dispatch("getuserLogOut");
    },

    //---------------------edicion que muestra o cierra el v-dialog seguun state true or false------
    editState() {
      this.$store.dispatch("passBackEdit");
      // console.log(this.state);
    },

    //-----metodo creado para evitar la repeticion de arrays de objects en el computed productsToBuyCard------
    uniqueObjectCommited(array, key) {
      let newObject = {};
      return array.filter(function(item) {
        let k = key(item);
        return newObject.hasOwnProperty(k) ? false : (newObject[k] = true);
      });
    },

    //--------------------------------methods for searching and filtering---------------------------
    autoSearch(text) {
      this.Search = text;
      //simplemente este metodo hace visble y trabajable la vbarra de busqueda importada desde
    },

    //----------------------------Categories filter------------------------------------------------------
    filterSearch(selectedCategory) {
      this.CategoriesDropDown = selectedCategory;
    },

    //----------------------------rate filter------------------------------------------------------
    rateSearch(selectedRatePlus) {
      this.RateDropDown = selectedRatePlus;
    },

    ///////////          Methods for adding and deleting products            //////////////
    //-------------------------accion para adicionar productos siendo proveedeor-------------------------
    addProductOnSale(thisCurrent) {
      this.$store.dispatch("addProductSale", {
        currentProduct: {
          productRate: 0,
          imgURLList: [
            this.ProductAdded.upload_image3,
            this.ProductAdded.upload_image2,
            this.ProductAdded.upload_image1
          ],
          productPrice: Number(this.ProductAdded.price),
          productStock: Number(this.ProductAdded.unities),
          productDescription: this.ProductAdded.description,
          productName: this.ProductAdded.name,
          categorySet: this.ProductAdded.Categories.filter(
            option => option.selected
          ).map(option => {
            return { productCategory: option.value };
          })
        } //A pesar de que el objeto que se obtien del back end
      });
    },
    //vease que en este caso simplemente  se hace uun dispatch al store del metodo que mandaria
    //el objeto previamente creado mediante los v-models arraigados a la data en this.ProductAdded

    //------------------------anadiendose la parte del producto a editar-------------------------
    editProductOnSale() {
      this.$store.dispatch("editProductSale", {
        currentEditProduct: {
          imgURLList: [
            this.ProductAdded.upload_image3,
            this.ProductAdded.upload_image2,
            this.ProductAdded.upload_image1
          ],

          productPrice: Number(this.ProductEdited.price),
          productStock: Number(this.ProductEdited.unities),
          productDescription: this.ProductEdited.description
        },
        productId: this.getProdToEdit.product_id
      });
    },
    prov(){
      if(this.allProductsProvider!=null||this.allProductsProvider!=undefined){
        return this.allProductsProvider.length
      }
      else return 0
    },

    //----------------------------accion para modificar backend--------------------------
    AddAllProdCard() {
      // console.log(this.productsToBuyCard);
      this.$store.dispatch("addPurchase", this.productsToBuyCard);
    } //se hace un dispatch sobre una accion del getter y se le pasa como payload el computed
    //encargado de fusionar en un solo array toda la matriz de arrays de productos seleccionados
    //desde el productcard,almacenados en una variable en Vuex, y luego extraido mediante
    //este computed que los fusiona todos(this.productsToBuyCard)
  },

  /////////////////////////////////////////////////////////////////////////////////////////////
  computed: {
    ...mapGetters([
      "getAllProducts",
      " getarrayProductsToBuy",
      "getProdToEdit",
      "getEditState",
      "getUserAuth",
      "getProdToDelete",
      "getUserBoardPurch"
    ]),

    //-----------------------------set de categorias disponibles segun los productos-----------------------------
    computedCategories() {
      let setNew = new Set();
      this.getAllProducts.products.forEach(element => {
        element.product_category.map(category => {
          setNew.add(category.categories_of_product);
        });
      });
      return Array.from(setNew);
    },
    //-----------------------------------------set de rates---------------------------------------------
    computedRates() {
      let setRate = new Set();
      this.rateScale.forEach(element => {
        setRate.add(element.Points);
      });
      return Array.from(setRate);
    },

    //------------------------------------------get user-----------------------------------------------
    getUser() {
      return this.getUserAuth;
    },

    //----------------------------------------get state  true or false---------------
    state() {
      // console.log(this.getEditState);

      return this.getEditState;
    },

    //--------if user is also provider detrmining how many products he has on sale------------------------
    allProductsProvider() {
      if (this.getAllProducts.products != null) {
        return this.getAllProducts.products.filter(product => {
          return (
            product.product_provider === this.getAllProducts.user.user_name
          );
        });
      }
    },

    


    //---------------function to get all products from vuex------------------------------------/
    allProducts() {
      // console.log(this.getAllProducts, this.Search);
      if (this.Search != 0) {
        return this.getAllProducts.products.filter(element => {
          return (
            (element.product_name
              .toUpperCase()
              .includes(this.Search.toUpperCase()) &&
              element.product_provider != this.getAllProducts.user.user_name) ||
            (element.product_provider
              .toUpperCase()
              .includes(this.Search.toUpperCase()) &&
              element.product_provider != this.getAllProducts.user.user_name) ||
            (element.product_id
              .toString()
              .toUpperCase()
              .includes(this.Search.toUpperCase()) &&
              element.product_provider != this.getAllProducts.user.user_name) ||
            (element.product_price
              .toString()
              .toUpperCase()
              .includes(this.Search.toUpperCase()) &&
              element.product_provider != this.getAllProducts.user.user_name) ||
            (element.product_description
              .toUpperCase()
              .includes(this.Search.toUpperCase()) &&
              element.product_provider != this.getAllProducts.user.user_name)
          );
        });
      } else if (
        this.CategoriesDropDown &&
        this.CategoriesDropDown !== "Categories"
      ) {
        return this.getAllProducts.products.filter(categories => {
          return categories.product_category.some(string => {
            return (
              string.categories_of_product.toUpperCase() ===
                this.CategoriesDropDown.toUpperCase() &&
              categories.product_provider != this.getAllProducts.user.user_name
            );
          });
        });
      } else if (this.RateDropDown && this.RateDropDown !== "Rate") {
        return this.getAllProducts.products.filter(rateStars => {
          return (
            rateStars.rate.toFixed(1) >= this.RateDropDown &&
            rateStars.product_provider != this.getAllProducts.user.user_name
          );
        });
      } else {
        return this.getAllProducts.products.filter(product => {
          return product.product_provider != this.getAllProducts.user.user_name;
        });
      }
    }, //getter para obtener todos los productos desde vuex
    //--------------------------------------------------------------------------------------------------------
    productsToBuyCard() {
      // console.log(this.$store.getters.getarrayProductsToBuy);

      let commiter = this.$store.getters.getarrayProductsToBuy; //se iguala a una variable para poder firtrarlo

      let notRepeatedArrays = this.uniqueObjectCommited(
        commiter,
        JSON.stringify
      ); //se crea la variable a la cual se le asignara
      // el nuevo array de arrays no repetidos sobre el que se mediante la aplicacion del metodo uniqueObjectCommited previa
      //mente desarrollado en methods, para posteriormente utilizar esta variable en los pasos de fusion en un solo
      //array de objetos mediante un doble for each,  anadiendose despues a otra variable creada llamada
      //allInOne, la cual seria el resultado final de la funcion.

      const allInOne = [];
      notRepeatedArrays.forEach(array => {
        array.forEach(merger => allInOne.push(merger));
      });
      // console.log(allInOne);

      return allInOne;
    },
    //despues de haber hecho el push al array toBuy en el producto individualmente y haberse exportado a vuex, se importa
    //dicha matriz de arrays al home en donde se fusiona en uno solo para entonces hacer el dispatch accion que
    // adicionaria todos los id de productos en un solo array al card del usuario

    //---------------------------------------validador del producto creado------------------------------------
    validator() {
      return (
        this.ProductAdded.name !== "" &&
        this.ProductAdded.description !== "" &&
        this.ProductAdded.price !== "" &&
        this.ProductAdded.unities !== "" &&
        this.ProductAdded.upload_image1 !== "" &&
        this.ProductAdded.upload_image2 !== "" &&
        this.ProductAdded.upload_image3 !== ""
      );
    }, //validador del form para crear productos haciendo que se cumplimenten todos los fieds antes de validar

    //------------------------------------------validador del producto editado---------------------------
    validatorEdit() {
      return (
        this.ProductEdited.description !== "" &&
        this.ProductEdited.price !== "" &&
        this.ProductEdited.unities !== "" &&
        this.ProductEdited.upload_image1 !== "" &&
        this.ProductEdited.upload_image2 !== "" &&
        this.ProductEdited.upload_image3 !== ""
      );
    } //
  },

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  created() {
    this.editState();
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  watch: {
    state(value) {
      if (value == true) {
        this.editingProduct = true;
      }
    }
  }
};
</script>
<style>
#normal {
  background: rgba(175, 180, 43, 0.3);
}

#details {
  margin-left: 195px;
  width: 30px;
  height: 30px;
  position: absolute;
  z-index: 1;
}
#details,
#buttonAdd {
  z-index: 1;
  cursor: pointer;
  outline: none;
}

#details:active,
#buttonAdd:active {
  transform: translateY(6px);
}

#postProd {
  width: 139px;
  position: absolute;
  margin-left: 400px;
}

/* -------scroll css-------------- */
#wrapper {
  overflow-x: scroll;
  overflow-y: scroll;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 900x;
  height: 800px;
}
#wrapper::-webkit-scrollbar {
  width: 20px;
}
#wrapper::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

#wrapper::-webkit-scrollbar-thumb {
  background: rgb(197, 240, 4);
  border-radius: 10px;
}

#wrapper::-webkit-scrollbar-thumb:hover {
  background: rgb(197, 240, 4);
}
/* --------------------------------- */
#imgIcons {
  width: 20px;
  height: 20px;
}
#img {
  width: 120px;
  height: 120px;
  position: absolute;
  margin-left: 400px;
  margin-top: 40px;
}
#searchBar {
  width: 300px;
}
#catFilter {
  width: 150px;
}
#rateFilter {
  width: 100px;
}
#video {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 300%;
  min-height: 300%;
}

#content,
#in {
  background: rgba(0, 0, 0, 0.8);
  color: #f1f1f1;
}

#content {
  position: relative;
  top: 350px;
  width: 700px;
  padding: 20px;
  flex-wrap: wrap;
}
#in {
  position: absolute;
  top: 150px;
  width: 400px;
  padding: 20px;
  flex-wrap: wrap;
}
#content h1 {
  margin-left: 20px;
  font-size: 3.5rem;
  color: #afb42b;
}
#content p {
  margin-left: 250px;
  font-size: 1.5rem;
  color: #afb42b;
}
#user {
  color: #afb42b;
}
#imgView {
  width: 20px;
  height: 20px;
}
#welcomeUser,
#bottomYourPurch {
  display: flex;
  justify-content: flex-end;
}
#arrowLeft {
  position: absolute;
  margin-left: 200px;
  margin-top: -20px;
}

#drawerUser {
  background-color: rgba(175, 180, 43, 0.3);
  padding-left: 0.3rem;
  padding-right: 0.3rem;
}
#drawerStatus {
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: rgba(175, 180, 43, 0.3);
  width: 100px;
  margin-left: 4rem;
}
#navDrawer {
  background-color: rgba(175, 180, 43, 0.9);
  position: absolute;
  margin-left: -0.7rem;
  border-radius: 10px;
}
#instructions,
#viewClient,
#welcomeUser,
#userStatus,
#stockProv {
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: rgba(175, 180, 43, 0.3);
}
#userStatus,
#stockProv {
  width: 180px;
}
#stockProv {
  width: 280px;
}
@media screen and (orientation: portrait) and (max-device-width: 409px) {
  #postProd {
    position: absolute;
    margin-left: 250px !important;
  }

  #wrapper {
    height: 863px;
  }
}
@media screen and (orientation: landscape) and (max-device-width: 863px) {
  #postProd {
    position: absolute;
    margin-left: 650px !important;
  }
}
</style>
