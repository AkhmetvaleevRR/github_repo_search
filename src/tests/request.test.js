import { beforeEach, expect } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import ResultTable from '../components/ResultTable.vue'
import { useResponseStore } from '../store.js'
import { describe, it } from 'vitest'
describe('Testing request', () => {
  let wrapper = null
  let store = null
  beforeEach(() => {
    wrapper = mount(ResultTable, {
      global: {
        plugins: [createTestingPinia()]
      }
    })
  })
  it('check function', () => {
    store = useResponseStore()
    store.getRepos('asd')
    expect(store.getRepos).toHaveBeenCalledTimes(1)
    expect(store.getRepos).toHaveBeenLastCalledWith('asd')
  })
})
