import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import router from "../router/index.js";
const url = "https://secure-castle-82044.herokuapp.com/";

Vue.use(Vuex);
export default new Vuex.Store({
  plugins: [
    createPersistedState({
      paths: ["userBoard", "userBoardPurch"],
    }),
  ],
  state: {
    user: null,
    allProducts: {},
    loader: false,
    userBoard: {},
    arrayProductsToBuy: [],
    userBoardPurch: {},
    State: false,
    Loader: false,
    edit: false,
    editProd: {},
    purchaseSelected: {},
  },
  /////////////////////////////////mutations//////////////////////////////////////////
  mutations: {
    setAllProducts(state, payload) {
      state.allProducts = payload;
    },
    //-----------------------------------------------------
    setUserAuth(state, payload) {
      state.user = payload;
    },
    //-----------------------------------------------------
    settingLoader(state, payload) {
      state.loader = payload;
    },
    //-----------------------------------------------------
    settingUserBoard(state, id) {
      state.userBoard = id;
    },
    //-----------------------------------------------------
    settingDelPurch(state, key) {
      // console.log(key);
      let prodIndex;
      for (let i = 0; i < state.userBoard.details_of_purchase.length; i++) {
        if (state.userBoard.details_of_purchase[i].product_name == key) {
          prodIndex = i;
          break;
        }
      }
      state.userBoard.details_of_purchase.splice(prodIndex, 1);
      //en este caso se establece el metodo para borrar elementos especificos dentro de un array de objetos
    },
    //-----------------------------------------------------
    settingAddPurch(state, link) {
      state.userBoard.details_of_purchase = link;
      // console.log(state.userBoard.details_of_purchase);
    },
    //-----------------------------------------------------
    settingProductSale(state, currentProduct) {
      state.allProducts.products.push(currentProduct);
    },
    //-----------------------------------------------------
    setProductToBuyinCard(state, payload) {
      state.arrayProductsToBuy.push(payload);
    },
    //-----------------------------------------------------
    settingUserBoardPurch(state, payload) {
      state.userBoardPurch = payload;
    },
    //-----------------------------------------------------
    setState(state, payload) {
      state.State = payload;
    },
    //-----------------------------------------------------
    setLoader(state, payload) {
      state.Loader = payload;
    },
    //-----------------------------------------------------
    setEditProd(state, payload) {
      state.editProd = payload;
    },
    //-----------------------------------------------------
    edition(state, payload) {
      state.edit = payload;
      // console.log(state.edit);
    },
    //-----------------------------------------------------
    setDelProd(state, payload) {
      state.editProd = payload;
    },
    //-----------------------------------------------------
  },
  //////////////////////////////////////////getters////////////////////////////////////
  getters: {
    getAllProducts: (state) => state.allProducts,
    getUserAuth: (state) => state.user,
    getLoader: (state) => state.loader,
    getUserBoard: (state) => state.userBoard,
    getUpDatedBoard: (state) => state.userBoard,
    getarrayProductsToBuy: (state) => state.arrayProductsToBuy,
    getUserBoardPurch: (state) => state.userBoardPurch,
    getState: (state) => state.State,
    getLoader: (state) => state.Loader,
    getProdToEdit: (state) => state.editProd,
    getProdToDelete: (state) => state.editProd,
    getEditState: (state) => state.edit,
    getPurchaseSelected: (state) => (purchaseSelected) => {
      // console.log(state.userBoardPurch.all_user_purchases, purchaseSelected);
      return state.userBoardPurch.all_user_purchases.find(
        (purch) => purch.purchase_id == purchaseSelected
      );
    },
  },
  ///////////////////////////////////ACTIONS////////////////////////////////////////////////////
  actions: {
    //-----------------OBTENIENDO TODOS LOS PRODUCTOS DEL JSON------------------------
    fetchAllProducts({ commit }) {
      fetch(url+"mini/all_products/user", {
        credentials: "include",
        method: "GET",
      })
        .then((response) => {
          // commit("settingLoader", true);
          return response.json();
        })
        .then((response1) => {
          // console.log(response1);
          response1;
          commit("setAllProducts", response1);
          // commit("settingLoader", false)
        })
        .catch((error) => {
          //console.log(error);
          error;
        }); //haciendose el fetch a todos los productos disponibles para la venta
    },

    //------------------alamcenaNdo array de arrays de posibles compras----------------------------
    productsToBuyInCard({ commit }, payload) {
      commit("setProductToBuyinCard", payload);
      //se establece un mutation para mandar esta matriz a una variable global en el state
    },

    //----------haciendo el empuje final de productos al board del usuario----------------------------
    addPurchase({ commit }, link) {
      // console.log(link);
      commit("settingAddPurch", link);
      commit("setLoader", true);
      setTimeout(() => {
        commit("setLoader", false);
      }, 500);
    }, //se procede entonces a hacer un push de la matriz final de productos al dashboard del usuario , para
    //entonces desde ahi proceder a modificar el bakc end con la compra hecha

    //------------eliminando los productos en el card antes de enviar al bakend-----------------------------
    deletePurchase({ commit }, key) {
      commit("settingDelPurch", key);
      // call price calculation
      commit("setState", true);
      setTimeout(() => {
        commit("setState", false);
      }, 3000);
    },

    //--------------update rate of products and people voting--------------------------------------------/
    rateUpdater({ dispatch }, { product_id, ratePack, providers }) {
      fetch(url+"mini/all_products/user/product_rated/" +
          product_id +
          "/" +
          providers,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(ratePack),
          // body: ratePack.productRate,
        }
      )
        .then((newData) => {
          // console.log("data sent :", JSON.stringify(newData));
          return newData.json();
        })
        .then((data) => {
          if (data.Error) {
            data.Error;
          } else {
            data;
            dispatch("fetchAllProducts");
          }
        })
        .catch((error) => {
          alert("Request on Rate: ", error);
        });
    },

    //------------metodo se supone almacene las posibles compras del usuario en su dashboard---------
    addProdToBuy({ dispatch }, { purchases }) {
      fetch(url+"mini/all_products/allpurchase_view", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(purchases),
      })
        .then((newData) => {
          // console.log("data sent :", JSON.stringify(newData));
          return newData.json();
        })
        .then((data) => {
          if (data.Error) {
            alert("Error on Buy Purchase", data.Error);
          } else {
            // alert("Successful", data);
            data;
            dispatch("fetchAllProducts");
            dispatch("fetchingAllPurchasesViewBoardUser");
          }
        })
        .catch((error) => {
          console.log("Request failure: ", error);
        });
    },

    //----------adding products from provider vue tpo the generl products on sale-------------------
    addProductSale({ dispatch }, { currentProduct }) {
      fetch(url+"mini/all_products/provider/product_added", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(currentProduct),
      })
        .then((newData) => {
          // console.log("data sent :", JSON.stringify(newData));
          return newData.json();
        })
        .then((data) => {
          if (data.Error) {
            // alert("Error on Add Product on Sale", data.Error);
            data.Error;
          } else {
            // alert("Successful", data);
            data;
            dispatch("fetchAllProducts");
          }
        })
        .catch((error) => {
          alert("Error on Add Product on Sale: ", error);
        });
    },
    //-------------------------editing product--------------------------------------
    editProductSale({ dispatch }, { currentEditProduct, productId }) {
      // console.log(currentEditProduct, productId);

      fetch(url+"mini/all_products/provider/product_edited/" + productId, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(currentEditProduct),
      })
        .then((newData) => {
          // console.log("data sent :", JSON.stringify(newData));
          return newData.json();
        })
        .then((data) => {
          if (data.Error) {
            // alert("Error", data.Error);
            data.Error;
          } else {
            // alert("Successful Editing", data);
            data;
            dispatch("fetchAllProducts");
          }
        })
        .catch((error) => {
          alert("Error on Edit Product: ", error);
        });
    },

    //-----------------------delete product-------------------------------
    deleteProviderProduct({ dispatch }, { currentDelProd, productId }) {
      // console.log(currentDelProd, productId);
      fetch(url+"mini/all_products/delete/" + productId, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(currentDelProd),
      })
        .then((newData) => {
          // console.log("data sent :", JSON.stringify(newData));
          return newData.json();
        })
        .then((data) => {
          if (data.Error) {
            // alert("Error", data.Error);
            data.Error;
          } else {
            // alert("Successful", data);
            data;
            dispatch("fetchAllProducts");
          }
        })
        .catch((error) => {
          alert("Error on Delete Product: ", error);
        });
    },

    //---------------recibiendo del componente product el producto para su edicion--------
    passEdit({ commit }, payload) {
      // console.log(payload);
      commit("edition", true);
      commit("setEditProd", payload);
    },
    //vease que en este caso  se recibe el producto completo desde el componente, y se hace un commit del mismo
    //a una mutation (setEditProduct)encargada de almacenar dicho producto para su posterior edicion , y ademas
    //se establece otra mutation (edition) a manera de demarcar el status de la misma (true o flase), para cerrar
    //y abrir el cuadro de dialogo desde el home en la vista general

    //------------------Recibiendo del componente product el producto para su edicion---------------------
    passDelete({ commit }, payload) {
      // console.log(payload);
      commit("setDelProd", payload);
    },
    //vease que en este caso  se recibe el producto completo desde el componente, y se hace un commit del mismo
    //a una mutation (setEditProduct)encargada de almacenar dicho producto para su posterior edicion , y ademas
    //se establece otra mutation (edition) a manera de demarcar el status de la misma (true o flase), para cerrar
    //y abrir el cuadro de dialogo desde el home en la vista general

    //------devolviendo el status de edicion de neuvo a false para cerrar la v-dialog de edicion-------------
    passBackEdit({ commit }) {
      commit("edition", false);
    },

    //---------------all user products dashboard-------------------------------------------
    fetchUserIdProducts({ commit, getters }) {
      let userId = getters.getAllProducts.user.user_id;
      fetch(url+"mini/all_products/one_selected/purchase_view/" + userId, {
        credentials: "include",
        method: "GET",
      })
        .then((response) => {
          // console.log(response);
          return response.json();
        })
        .then((response) => {
          // console.log(response);
          commit("settingUserBoard", response);
        })
        .catch((err) => {
          // console.log(err);
          alert("Error on Fetching id Product", err);
        });
    },

    //----------------------------vista Final del Board de compras hechas por el usuario-----------------
    fetchingAllPurchasesViewBoardUser({ commit }) {
      // console.log("fetchingAllPurchasesViewBoardUser");
      
      fetch(url+"mini/all_products/user_dashboard/final_view", {
        credentials: "include",
        method: "GET",
      })
        .then((response) => {
          // console.log(response);
          return response.json();
        })
        .then((response) => {
          // console.log(response);
          commit("settingUserBoardPurch", response);
        })
        .catch((err) => {
          //console.log(err);
          // alert("Error on fetchingAllPurchasesViewBoardUser ", err);
          err;
        });
    },

    //------------------------------login user-----------------------------------
    getUserLogIn({ commit, dispatch }, payload) {
      fetch(url+"api/login", {
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "POST",
        body: getBody({
          name: payload.userName,
          password: payload.userPassword,
        }),
      })
        .then((userData) => {
          if (userData.Error) {
            // alert("not user", userData);
            userData;
            commit("setUserAuth", false);
          } else {
            // alert("Success", userData);
            userData;
            commit("setUserAuth", true);
            router.push("/"), dispatch("fetchAllProducts");
          }
        })
        .catch((error) => {
          //console.log(error);
          alert("Error on user Login", error);
        });
      function getBody(json) {
        var body = [];
        for (var key in json) {
          var encKey = encodeURIComponent(key);
          var encVal = encodeURIComponent(json[key]);
          body.push(encKey + "=" + encVal);
        }
        return body.join("&");
      }
    },

    //----------------------------get user registered---------------------------------
    getUserSignedUp({ commit, dispatch }, payload) {
      // console.log(payload);

      fetch(url+"mini/all_product/registering", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(payload),
      })
        .then((userData) => {
          console.log("data sent :", JSON.stringify(userData));
          return userData.json();
        })
        .then((userData1) => {
          if (userData1.Error) {
            // alert("fail on register", userData1);
            userData1;
            commit("setUserAuth", false);
          } else {
            // alert("Success", userData1);
            userData1;
            dispatch("getUserLogIn", payload);
            commit("setUserAuth", true);
            // router.push("/")
          }
        })
        .catch((error) => {
          //console.log(error);
          alert("Error on SignUp", error);
        });
    },

    //-----------------------get user logged out------------------------------------------
    getuserLogOut({ commit }) {
      fetch(url+"api/logout", {
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          // "mode":"Access-Control-Allow-Origin"
        },
        method: "POST",
      })
        .then((userData) => {
          // alert("Request success: ", userData);
          userData;
          commit("setUserAuth", false);
          router.push("/logIn");
          // setTimeout(() => {
          //   location.reload();
          // }, 0.1);
        })
        .catch((error) => {
          alert("Error on Log Out: ", error);
        });
    },
  },
});
