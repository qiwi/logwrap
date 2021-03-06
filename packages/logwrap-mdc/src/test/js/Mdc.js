import Mdc, { DEFAULT_NS, DEFAULT_SPACE_ID, TRACE_KEY } from '../../main/js/Mdc'

describe('logwrap-mdc/Mdc', () => {
  const span_id = '1234567890abcdef'  // eslint-disable-line
  const trace_id = 'abcdef1234567890' // eslint-disable-line
  const trace = { trace_id, span_id }
  const bindEmitter = jest.fn()
  const get = jest.fn()
  const set = jest.fn()
  const run = cb => cb()
  const ns = {
    bindEmitter,
    get,
    set,
    run
  }
  const mdc = new Mdc({ ns })

  beforeEach(() => jest.resetAllMocks())

  describe('constructor', () => {
    it('returns proper instance', () => {
      expect(mdc).toBeInstanceOf(Mdc)
      expect(mdc.ns).not.toBeUndefined()
    })
  })

  describe('proto', () => {
    it('`get` returns stores vars', done => {
      const mdc = new Mdc({})
      const setTrace = () => mdc.ns.set(TRACE_KEY, trace)
      const getTrace = () => {
        expect(mdc.get()).toEqual(trace)
        done()
      }

      mdc.ns.run(() => setTrace() && (() => getTrace())())

      expect(mdc.get()).toBeUndefined()
    })
  })

  describe('static', () => {
    it('`getNamespace` returns CLS namespace', () => {
      expect(Mdc.getNamespace(DEFAULT_SPACE_ID)).toBe(DEFAULT_NS)
      expect(Mdc.getNamespace()).toBe(DEFAULT_NS)
      expect(Mdc.getNamespace('foo')).not.toBe(DEFAULT_NS)
      expect(Mdc.getNamespace({})).toEqual({})
    })
  })
})
