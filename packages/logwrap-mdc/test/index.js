import factory from '../src'
import { DEFAULT_NS as ns, TRACE_KEY } from '../src/Mdc'

describe('logwrap-mdc/index', () => {
  it('factory returns a pipe', () => {
    expect(factory()).toEqual(expect.any(Function))
  })

  it('pipe attaches trace getter to log entry meta', done => {
    const pipe = factory()
    const meta = {}
    const level = 'debug'
    const input = ['foo']
    const trace = { foo: 'bar' }

    const entry = { input, meta, level }
    const setTrace = () => ns.set(TRACE_KEY, trace)
    const getTrace = () => {
      expect(entry.meta.trace).toEqual(trace)
      done()
    }

    pipe(entry)

    expect(entry.meta.trace).toBeUndefined()
    ns.run(() => setTrace() && getTrace())
    expect(entry.meta.trace).toBeUndefined()
  })
})
