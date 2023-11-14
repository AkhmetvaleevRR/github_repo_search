<template>	
	<div class="navigation">
		<button  v-if = "store.response.items.length > 0 " class="page-" 
		@click="store.getRepos(store.keyWords, store.page-(1))"        
		:disabled = "store.page <= 1"
		:class = "{ 'spinable': !store.loaded}"><span>prev page</span></button>   
		<span class="page_counter">{{store.page}}</span>     
		<button  v-if = "store.response.items.length > 0" class="page+" 
		@click="store.getRepos(store.keyWords, store.page+(1))"            
		:disabled = "store.page === store.pageCounter"  
		:class = "{ 'spinable': !store.loaded }"><span>next page</span></button>
	</div>  
</template>

<script setup>
	import { useResponseStore } from '../store.js';
	const store = useResponseStore(); //Обращение к стору
</script>