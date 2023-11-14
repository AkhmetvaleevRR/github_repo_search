<template>
    <div class="result_repos" v-if ="store.response.total_count > 0">
      <h4>Result repos</h4>
      <small>Total: {{store.response.total_count}}</small>
      <small> on page: {{store.response.items.length}}</small>
      <button class="sort_order_button" @click="changeOrder(); store.getRepos(store.keyWords, store.page, store.order); ">sort by updated: {{store.order}}</button>
      <hr>
      <div class="list_of_repos" >
        <a class="card" v-for="repository in store.response.items" 
          :key="repository.id" 
          :href="repository.html_url">
          <h2 class="tooltip">
            {{truncateString(repository.name, 20)}}
            <span v-if="tooltip" class="tooltip-text">{{repository.name}}</span>  
          </h2>      
          <span v-if="repository.language"><b>language:</b> {{repository.language}}</span>
          <span><b>stars:</b> {{repository.stargazers_count}}</span>
          <span v-if="repository.updated_at"><b>last modified:</b> {{formatDate(repository.updated_at)}}</span>
          <span class = "tooltip" v-if = "repository.description"><b>description:</b> {{truncateString(repository.description, 20)}}          
            <span v-if="tooltip" class="tooltip-text tooltip-text_desc ">{{repository.description}}</span> </span>
        </a>
      </div>
      <Navigation/>
    </div>
  <div v-if = "store.response.total_count === 0">Nothing found</div>
</template>

<script setup>
  import { ref } from 'vue'  
  import { useResponseStore } from '../store.js';
  import Navigation from './NavigationPanel.vue';
  const changeOrder = () => store.order === 'desc'? store.order = 'asc': store.order = 'desc'; //переключатель сортировки
  const store = useResponseStore(); //Обращение к стору
  let tooltip = ref(false) //Переменная для подсказок
  const formatDate = (s) => new Date(s).toLocaleDateString('en-GB')
  function truncateString (s, w) {  //функция для обрезания длинных названий
    if (s.length > w) {
      tooltip.value = true;
      return s.slice(0, w).trim() + '...';
    }
    else {      
      tooltip.value = false;
      return s;
    }
  }
</script>