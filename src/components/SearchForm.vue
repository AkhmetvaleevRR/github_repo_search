<!-- search form for github repos -->
<template>
  <div class="search_form">
    <label>You looking for {{ query }} repo</label>
    <input type="text" v-model="query" placeholder="Search title.." />
    <button
      class="search_button"
      :class="{ spinable: !store.loaded }"
      @click="checkForm();store.getRepos(query);"
    >
      <span>find repo </span>
    </button>
    <span v-if="emptyVal">type something in the input above</span>
    <span v-if="store.fetchError" class="danger">Something went wrong</span>
  </div>
</template>

<script setup>
  import { useResponseStore } from "../store.js"
  import { ref } from "vue"
  const store = useResponseStore()
  let emptyVal = ref(false)
  const query = ref("")
  function checkForm() {
    query.value===''?this.emptyVal=true: this.emptyVal=false;    
  }
</script>