import { shallowMount } from '@vue/test-utils'
import SearchForm from '../components/SearchForm.vue'
import { expect } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { useResponseStore } from '../store.js'

describe('Searchform test', () => {
  let wrapper = null
  let store = null
  beforeEach(() => {
    wrapper = shallowMount(SearchForm, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              store: {
                loaded: false
              }
            }
          })
        ]
      }
    })

    store = useResponseStore()
  })
  it('SearchForm have loader and valid text', async () => {
    expect(SearchForm).toBeTruthy()
    expect(wrapper.html()).toContain('><button class="search_button spinable">')
    expect(wrapper.html()).toContain('<label>You looking for repo</label>')
  })
})
