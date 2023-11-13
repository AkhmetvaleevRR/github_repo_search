import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useResponseStore = defineStore('responseStore', {
  state: () => {
    return {
      //Данные для хранения запроса и всего с ним связанного
      response: ref({}),
      keyWords: ref(''),
      page: ref(1),
      rorder: ref('desc'),
      loaded: ref(true),
      query: ref({})
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
        const request = new Request(url)
        if ('caches' in window) {
          //если браузер поддерживает кэширование
          const cashe = await caches.open('my-cache')
          const matched_cache = await cashe.match(url)
          if (matched_cache) {
            try {
              const resp_pr = await matched_cache.json()
              this.response = resp_pr
            } finally {
              this.loaded = true //Переменная для окончания загрузки
            }
          } else {
            //если запроса нет в кэше
            try {
              const fetched_data = await fetch(request)
              const fetched_data_2 = fetched_data.clone()
              cashe.put(url, fetched_data)

              if (fetched_data) {
                const resp_prom = await fetched_data_2.json()
                this.response = resp_prom
              }
            } catch (error) {
              console.error('Error adding data to cache:', error)
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
            .catch((error) => console.log(error)) //отлавливаем ошибки и выводим в консоль
            .finally(() => {
              this.loaded = true //Переменная для окончания загрузки
            })
        }
      }
    }
  }
})
