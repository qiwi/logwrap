import index, { Logwrap, mdc } from '../src'

describe('logwrap index', () => {
  it('properly exposes facade', () => {
    expect(index).toBe(Logwrap)
    expect(Logwrap).toEqual(expect.any(Function))
    expect(mdc).toEqual(expect.any(Function))
  })
})
