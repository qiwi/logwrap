import index, {
  Logwrap,
  mdc,
  ERROR,
  WARN,
  INFO,
  DEBUG,
  TRACE
} from '../src'

describe('logwrap index', () => {
  it('properly exposes facade', () => {
    expect(index).toBe(Logwrap)
    expect(Logwrap).toEqual(expect.any(Function))
    expect(mdc).toEqual(expect.any(Function))
  })

  it('exposes standard log level constants', () => {
    ([ERROR, WARN, INFO, DEBUG, TRACE]).forEach(value => expect(value).toEqual(expect.any(String)))
  })
})
