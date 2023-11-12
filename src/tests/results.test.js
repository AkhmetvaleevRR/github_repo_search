import { mount } from '@vue/test-utils'
import ResultTable from '../components/ResultTable.vue'
import { expect } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { useStore } from '../store.js'

test('SearchForm test', async () => {
  expect(ResultTable).toBeTruthy()
  //mock store.loaded
  const wrapper = mount(ResultTable, {
    global: {
      plugins: [createTestingPinia()]
    }
  })

  const store = useStore()
  store.loaded = true
  console.log(wrapper.text())
  expect(wrapper.text()).toContain('You searching for  repofind repo')
})
