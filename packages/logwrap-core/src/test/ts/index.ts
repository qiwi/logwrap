import index, { Logwrap } from '../../main/ts'

describe('logwrap-core/index', () => {
  it('properly exposes facade', () => {
    expect(index).toBe(Logwrap)
    expect(Logwrap).toEqual(expect.any(Function))
  })
})
