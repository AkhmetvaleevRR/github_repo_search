import { describe, it, expect } from 'vitest'

describe('import vue components SearchForm', () => {
  it('normal imports as expected', async () => {
    const cmp = await import('../components/SearchForm.vue')
    expect(cmp).toBeDefined()
  })

  it('import vue components ResultTable', async () => {
    const cmp = await import(`../components/ResultTable.vue`)
    expect(cmp).toBeDefined()
  })

  it('dynamic imports as expected', async () => {
    const name = 'ResultTable'
    const cmp = await import(`../components/${name}.vue`)
    expect(cmp).toBeDefined()
  })
})
