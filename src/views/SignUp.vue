<template>
  <v-container>
    <video autoplay muted loop id="video">
      <source src="../assets/shopcard.mp4" type="video/mp4" />
    </video>
    <v-layout row wrap>
      <v-flex class="d-flex justify-center">
        <v-card dark width="400" height="450" id="card">
          <h2 class="d-flex align-center  ml-5 mt-3">Sign Up Form</h2>
          <v-card-text>
            <v-container>
              <v-form @submit.prevent="signUpUser">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="name"
                      label="name"
                      id="name"
                      v-model="name"
                      type="name"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="email"
                      id="email"
                      v-model="email"
                      type="email"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="password"
                      label="password"
                      id="password"
                      v-model="password"
                      type="password"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="confirmPassword"
                      label="confirm password"
                      id="confirmPassword"
                      v-model="confirmPassword"
                      type="password"
                      v-bind:rules="[passwwordComparison]"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-container class="d-flex justify-center">
                  <div id="allradios" >
                    <div  id="radios">
                      <h3>Seller</h3>
                      <input type="radio" value="seller" v-model="statementIsTrue" checked />
                    </div>
                    <div class="ml-5" id="radios">
                      <h3>Buyer</h3>
                      <input type="radio" value="buyer" v-model="statementIsTrue" checked />
                    </div>
                  </div>

                  <v-container class="d-flex justify-center">

                    <v-layout row>
                      <v-flex xs8 class="d-flex justify-center">
                        <v-btn
                          type="submit"
                          class="lime lighten black--text"
                          :disabled="!validator"
                        >Sign Up</v-btn>
                      </v-flex>
                    </v-layout>
                  </v-container>

                </v-container>
              </v-form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "SignUp",
  data() {
    return {
      name: "",
      password: "",
      email: "",
      confirmPassword: "",

      UserType: [
        { value: "buyer", checked: false },
        { value: "seller", ched: false }
      ],
      selected: false,
      statementIsTrue: "seller"
    };
  },
  /////////////////////////////////////////////////////////////////////////////////////////////
  methods: {
    ...mapActions(["getUserSignedUp"]),
    //---------------------------------------------------------------------------------------
    signUpUser() {
      console.log(this.statementIsTrue);

      return this.$store.dispatch("getUserSignedUp", {
        userName: this.name,
        userPassword: this.password,
        userEmail: this.name,
        userRole: this.statementIsTrue
      });
    }
  },

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  computed: {
    ...mapGetters(["getUserAuth"]),

//---------------------------comparador de contrasena y confirmacion de contrasena----------------
    passwwordComparison() {
      if (this.password != this.confirmPassword) {
        return "These Passwords do not match";
      } else {
        return "";
      }
    },

    //---------------------------validador de sign up form----------------
    validator() {
      return this.name !== "" && this.password !== "" && this.email !== "";
    }
  },

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  created() {
    console.log(this.statementIsTrue);
  },
};
</script>

<style>
#allradios {
  display: flex;
  flex-direction: row;
  width: 12rem;
  justify-content: space-between;
}
#radios {
  display: flex;
  flex-direction: row;
  width: 4rem;
  justify-content: space-between;
  align-items: baseline;
}
</style>