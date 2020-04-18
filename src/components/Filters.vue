<template>
  <v-container>
    <div class="generalContainer">
      <div class="mainFilters">
        <div>
          <select
            @change="gettingCategories()"
            class="cat"
            placeholder="Categories"
            v-model="dropDownCategory"
          >
            <option disable selected="true">
              <h2>Categories</h2>
            </option>
            <option
              v-for="(category, index) in categoriesSet"
              v-bind:key="index"
              v-bind:value="category"
            >{{ category }}</option>
          </select>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
    name:'Filters',
    props:['categoriesSet'],
    data(){
        return {
            dropDownCategory:'Category',
        }
    },methods:{
        gettingCategories(){
            this.$emit("receivingCategoriesFilter",this.dropDownCategory)
        }
    },
};
</script>

<style>
.cat{
    box-shadow:2px 3px 0px 1px;
    border-radius:5px;
    width:180px;
    background-color:white
}
</style>