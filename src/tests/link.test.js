import { mount } from '@vue/test-utils'
import ResultTable from '../components/ResultTable.vue'
import { expect } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { useStore } from '../store.js'

test('link redirect test', async () => {
  expect(ResultTable).toBeTruthy()

  const wrapper = mount(ResultTable, {
    global: {
      plugins: [createTestingPinia()]
    }
  })
  const store = useStore()
  store.$patch({
    response: {
      total_count: 275,
      items: [
        {
          id: 669121579,
          name: 'test_repo',
          html_url: 'its a test url',
          description: 'testing data',
          updated_at: '2023-07-21T11:50:05Z',
          language: 'test_language',
          score: 1.0,
          length: 30
        }
      ]
    }
  })

  console.log(store.response)
  console.log(wrapper.html())
  expect(wrapper.html()).toContain('<a class="card" href="its a test url">')
})
