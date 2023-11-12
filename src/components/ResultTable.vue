<template>
    <div class="result_repos" v-if ="store.response.total_count > 0">
      <h4>Result repos</h4>
      <small>Total: {{store.response.total_count}}</small>
      <small> on page: {{store.response.items.length}}</small>
      <button class="sort_order_button" @click="changeOrder(); store.getRepos(store.keyWords, store.page, store.order); ">sort by updated: {{store.order}}</button>
      <hr>
      <div id="list_of_repos" >
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
          <span v-if="repository.description"><b>description:</b> {{repository.description}} </span>
        </a>
      </div>
      <div class="navigation">
        <button  v-if = "store.response.items.length > 0 " class="page-" 
          @click="store.getRepos(store.keyWords, store.page-(1))"        
          :disabled = "store.page <= 1"
          :class = "{ 'spinable': !store.loaded}"><span>prev page</span></button>   
          <span class="page_counter">{{store.page}}</span>     
        <button  v-if = "store.response.items.length > 0" class="page+" 
          @click="store.getRepos(store.keyWords, store.page+(1))"            
          :disabled = "store.page == store.pageCounter"  
          :class = "{ 'spinable': !store.loaded }"><span>next page</span></button>
      </div>
    </div>
  <div v-if = "store.response.total_count == 0">Nothing found</div>
</template>

<script setup>
  import { useStore } from '../store.js';
  import { ref } from 'vue'
  const changeOrder = () => store.order === 'desc'? store.order = 'asc': store.order = 'desc'; //переключатель сортировки
  let store = useStore(); //Обращение к стору
  let tooltip = ref(false) //Переменная для подсказок
  const formatDate = (s) => new Date(s).toLocaleDateString('en-GB')
  function truncateString (s, w) {  //функция для обрезания длинных названий
    if (s.length > w) {
      tooltip = true;
      return s.slice(0, w).trim() + '...'
    }else {      
      tooltip = false;
      return s;
    }
  }
</script>