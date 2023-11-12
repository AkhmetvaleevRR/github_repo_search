<!-- search form for github repos -->
<template>
  <div class="search_form">
    <label>You searching for {{ query }} repo</label>
    <input type="text" v-model="query" placeholder="Search title.." />
    <button
      class="search_button"
      :class="{ spinable: !store.loaded }"
      @click="checkForm();store.getRepos(query)"
    >
      <span>find repo</span>
    </button>    
    <span v-if="emptyVal">type something in the input above</span>
  </div>
</template>


<script setup>
  import { useStore } from "../store.js"
  import { ref } from "vue"
  let store = useStore()
  let emptyVal = ref(false)
  const query = ref("")
  function checkForm() {
    query._value==''?this.emptyVal=true: this.emptyVal=false;    
    }
</script>