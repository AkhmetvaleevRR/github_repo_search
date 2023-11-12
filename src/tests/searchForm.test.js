import { mount } from '@vue/test-utils'
import SearchForm from '../components/SearchForm.vue'
import { expect } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { useStore } from '../store.js'

test('SearchForm test', async () => {
  expect(SearchForm).toBeTruthy()
  const wrapper = mount(SearchForm, {
    global: {
      plugins: [createTestingPinia()]
    }
  })

  const store = useStore()
  store.loaded = true
  console.log(wrapper.text())
  expect(wrapper.text()).toContain('You searching for  repofind repo')
})
