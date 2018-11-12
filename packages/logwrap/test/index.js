import index from '../src'

describe('logwrap-core/index', () => {
  it('properly exposes facade', () => {
    expect(index).not.toBeUndefined()
  })
})
