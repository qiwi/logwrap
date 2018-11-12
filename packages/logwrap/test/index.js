import index, { Logwrap } from '../src'

describe('logwrap index', () => {
  it('properly exposes facade', () => {
    expect(index).toBe(Logwrap)
    expect(Logwrap).toEqual(expect.any(Function))
  })
})
