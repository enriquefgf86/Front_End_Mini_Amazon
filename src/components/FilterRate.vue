<template>
  <v-container>
    <div class="generalContainer">
      <div class="rateFilters">
        <div>
          <select
            @change="gettingRates()"
            class="rate"
            placeholder="rate"
            v-model="dropDownRate"
          >
            <option disable selected="true">
              <h2>Rate</h2>
            </option>
            <option
              v-for="(rate, index) in rateSet"
              v-bind:key="index"
              v-bind:value="rate"
            >{{ rate }}</option>
          </select>
        </div>
      </div>
    </div>
  </v-container>
</template>
<script>
export default {
    name:'FilterRate',
    props:['rateSet'],
    data(){
        return {
            dropDownRate:'Rate',
        }
    },methods:{
        gettingRates(){
            this.$emit("receivingRatesFilter",this.dropDownRate)
        }
    },
};
</script>

<style>
.rate{
    box-shadow:2px 3px 0px 1px;
    border-radius:5px;
    width:80px;
    background-color:white
}
</style>