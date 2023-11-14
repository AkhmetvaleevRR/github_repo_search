import { beforeEach, expect } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { useResponseStore } from '../store.js'
import { shallowMount } from '@vue/test-utils'
import ResultTable from '../components/ResultTable.vue'
import { describe, it } from 'vitest'

describe('Testing results', () => {
  let wrapper = null
  let store = null
  beforeEach(() => {
    wrapper = shallowMount(ResultTable, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              responseStore: {
                response: {
                  total_count: 310,
                  incomplete_results: false,
                  items: [
                    {
                      id: 717503956,
                      language: 'js',
                      name: 'test_name',
                      html_url: 'test_link',
                      description: 'test',
                      stargazers_count: 1,
                      updated_at: '2022-01-01T00:00:00Z'
                    }
                  ]
                }
              }
            }
          })
        ]
      }
    })

    store = useResponseStore()
  })
  it('card have link with provided test data', () => {
    console.log(store.response)
    expect(wrapper.html()).toContain(`<a class="card" href="test_link">
      <h2 class="tooltip">test_name
        <!--v-if-->
      </h2><span><b>language:</b> js</span><span><b>stars:</b> 1</span><span><b>last modified:</b> 01/01/2022</span><span class="tooltip"><b>description:</b> test <!--v-if--></span>
    </a>`)
  })
})
