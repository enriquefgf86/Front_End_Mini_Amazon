<template>
  <v-container>
    <input
      class="input"
      placeholder="write words for search"
      type="text"
      v-model="sendingSelfSearch"
    />
  </v-container>
</template>

<script>
export default {
  name: "SearchBar",
  props: {
    SearchBar: Object,
    Search: String
  },
  // data() {
  //   return {
  //     sendingSelfSearch: ""
  //   };
  // },
  computed: {
    sendingSelfSearch: {
      get() {
        return this.Search;
      },
      set(val) {
        this.$emit("receivingSelfSearch",val);
      }
    }
  }
};
</script>

<style>
.input {
  box-shadow: 2px 3px 0px 1px;
  border-radius: 5px;
  width:300px;
  background-color:white
  }
</style>