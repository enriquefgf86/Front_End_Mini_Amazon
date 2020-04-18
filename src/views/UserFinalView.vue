<template>
  <v-container id="colorback">
    <v-container class="d-flex justify-center">
      <img id="clicker" @click="toHome" src="../assets/casa.png" alt="casa" />
    </v-container>

    <BuyerView></BuyerView>
  </v-container>
</template>

<script>
export default {
  name: "UserFinalView",
  methods: {
    toHome() {
      this.$router.push("/");
      setTimeout(() => {
        location.reload();
      }, 0.01);
    }
  }
};
</script>

<style>
#clicker{
  z-index: 1;
  cursor: pointer;
  outline: none;
}
#clicker:active {
  transform: translateY(6px);
}
</style>