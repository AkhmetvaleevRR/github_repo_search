import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  state: () => {
    return {
      //Данные для хранения запроса и всего с ним связанного
      response: reactive({}),
      keyWords: ref(''),
      page: ref(1),
      order: ref('desc'),
      loaded: ref(true),
      query: ref({})
    }
  },
  getters: {
    pageCounter: (state) => Math.ceil(state.response.total_count / 30) //Считаем страницы для блокировки пагинации
  },
  actions: {
    getRepos(keyWords, page = 1, order = 'desc') {
      //Запрос получения данных запрашиваем по параметрам и записываем их в переменные
      console.log(keyWords, page, order)
      if (keyWords) {
        this.loaded = false
        this.page = page
        this.order = order
        this.keyWords = keyWords
        this.query = { keyWords, page, order }
        const url = `https://api.github.com/search/repositories?q=${keyWords}&page=${page}&order=${order}&sort=updated`
        const request = new Request(url)
        // if ('caches' in window) {
        //   //если браузер поддерживает кэширование
        //   caches.open('my-cache').then((cache) => {
        //     cache
        //       .match(url) //ищем в кэше наш запрос
        //       .then((res) => {
        //         if (res) {
        //           res.json().then((x) => (this.response = x)) //записываем в переменную найденный в кэше запрос
        //         } else {
        //           //если запроса нет в кэше
        //           caches
        //             .open('my-cache')
        //             .then((cache) => {
        //               fetch(request).then((res) => {
        //                 const res2 = res.clone()
        //                 cache
        //                   .put(url, res) //записываем запрос в кэш
        //                   .then(() => console.log(`${url} added to cache.`))
        //                   .then(() => res2.json().then((x) => (this.response = x)))
        //                   .catch((error) => console.error('Error adding data to cache:', error))
        //                   .finally(() => {
        //                     this.loaded = true //Переменная для окончания загрузки
        //                   })
        //               })
        //             })
        //             .catch((error) => console.error('Error fetching data:', error))
        //         }
        //       })
        //       .finally(() => {
        //         this.loaded = true //Переменная для окончания загрузки
        //       })
        //   })
        // } //сохраняем запрос если есть поддержка кэша
        // else {
        //если браузер не умеет в кэширование
        fetch(url, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'GET'
        })
          .then((response) => response.json().then((x) => (this.response = x))) //преобразуем ответ в json и сохраняем в переменную
          .catch((error) => console.log(error)) //отлавливаем ошибки и выводим в консоль
          .finally(() => {
            this.loaded = true //Переменная для окончания загрузки
          })
        // }
      }
    }
  }
})
