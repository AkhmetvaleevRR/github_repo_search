describe('import vue components', () => {
  test('normal imports as expected', async () => {
    const cmp = await import('../components/SearchForm.vue')
    expect(cmp).toBeDefined()
  })

  test('template string imports as expected', async () => {
    const cmp = await import(`../components/ResultTable.vue`)
    expect(cmp).toBeDefined()
  })

  test('dynamic imports as expected', async () => {
    const name = 'ResultTable'
    const cmp = await import(`../components/${name}.vue`)
    expect(cmp).toBeDefined()
  })
})
