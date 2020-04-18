<template>
  <v-container>
    <video autoplay muted loop id="video">
      <source src="../assets/shopcard.mp4" type="video/mp4" />
    </video>

    <v-layout row wrap>
      <v-flex class="d-flex justify-center">
        <v-card dark width="400" height="450" id="card">
          <h2 class="d-flex align-center  ml-5 mt-3">Log In Form</h2>
          <v-card-text>
            <v-container>
              <v-form @submit.prevent="signUserIn">
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
                <v-layout row class="d-flex justify-center">
               
                  <v-flex xs8>
                    <v-container class="d-flex justify-center">
                      <v-btn
                        type="submit"
                        class="lime lighten black--text"
                        :disabled="!validator"
                      >Sign In</v-btn>
                    </v-container>

                    <v-container
                      v-if="!validator"
                      class="d-flex flex-column justify-center align-center"
                    >
                      <h2 class="d-flex justify-center mb-3">Aren't you a user?</h2>
                      <v-spacer></v-spacer>
                      <router-link to="/signUp">
                        <v-btn class="lime lighten black--text">Register</v-btn>
                      </router-link>
                    </v-container>
                  </v-flex>
                </v-layout>
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
  name: "LogIn",
  data() {
    return {
      name: "",
      password: "",
      email: ""
    };
  },
  ////////////////////////////////////////////////////////////////////////////////////////////////
  methods: {
    ...mapActions(["getUserLogIn"]),
    signUserIn() {
      return this.$store.dispatch("getUserLogIn", {
        userName: this.name,
        userPassword: this.password
      });
    }
  },
  ///////////////////////////////////////////////////////////////////////////////////////////////
  computed: {
    validator() {
      return this.name !== "" && this.password !== "" && this.email !== "";
    }
  },
};
</script>

<style>
#card {
  margin-top: 150px;
  background-color: rgba(175, 180, 43, 0.7);
  border-radius:7px;
  width:300px;
}
</style>