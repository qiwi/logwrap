import factory from '../../main/ts'
import { DEFAULT_NS as ns, TRACE_KEY } from '../../main/ts/Mdc'

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
      // @ts-ignore
      expect(entry.meta.trace).toEqual(trace)
      done()
    }

    // @ts-ignore
    pipe(entry)

    // @ts-ignore
    expect(entry.meta.trace).toBeUndefined()
    ns.run(() => setTrace() && getTrace())
    // @ts-ignore
    expect(entry.meta.trace).toBeUndefined()
  })
})
