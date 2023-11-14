import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useResponseStore = defineStore('responseStore', {
  state: () => {
    return {
      //Данные для хранения запроса и всего с ним связанного
      response: reactive({}),
      keyWords: ref(''),
      page: ref(1),
      rorder: ref('desc'),
      loaded: ref(true),
      query: ref({}),
      fetchError: ref(false)
    }
  },
  getters: {
    pageCounter: (state) => Math.ceil(state.response.total_count / 30) //Считаем страницы для блокировки пагинации
  },
  actions: {
    async getRepos(keyWords, page = 1, order = 'desc') {
      //Запрос получения данных запрашиваем по параметрам и записываем их в переменные
      if (keyWords) {
        this.loaded = false
        this.page = page
        this.order = order
        this.keyWords = keyWords
        this.query = { keyWords, page, order }
        const url = `https://api.github.com/search/repositories?q=${keyWords}&page=${page}&order=${order}&sort=updated`
        if ('caches' in window) {
          //если браузер поддерживает кэширование
          const cache = await caches.open('my-cache')
          const matchedCache = await cache.match(url)
          if (matchedCache) {
            try {
              const respPr = await matchedCache.json()
              this.response = respPr
            } finally {
              this.loaded = true //Переменная для окончания загрузки
            }
          } else {
            //если запроса нет в кэше
            try {
              const fetchedData = await fetch(url)
              const fetchedData2 = fetchedData.clone()
              cache.put(url, fetchedData)

              if (fetchedData) {
                const respProm = await fetchedData2.json()
                this.response = respProm
              }
            } catch (error) {
              console.error('Error adding data to cache:', error)
              if (error.message.includes('Failed to fetch')) {
                this.fetchError = true
              }
            } finally {
              this.loaded = true //Переменная для окончания загрузки
            }
          }
          this.loaded = true //Переменная для окончания загрузки
        } else {
          // если браузер не умеет в кэширование
          fetch(url, {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            method: 'GET'
          })
            .then((res) => res.json().then((x) => (this.response = x))) //преобразуем ответ в json и сохраняем в переменную
            .catch((error) =>
              error.message.includes('Failed to fetch')
                ? (this.fetchError = true)
                : console.log(error)
            ) //отлавливаем ошибки и выводим в консоль
            .finally(() => {
              this.loaded = true //Переменная для окончания загрузки
            })
        }
      }
    }
  }
})
