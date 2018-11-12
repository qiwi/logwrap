import Logwrap, { SEVERITY_ORDER } from '../src/logwrap'
import { reduce } from '../src/util'

const {
  validateLevel,
  normalizeEntry,
  normalizePipe
} = Logwrap

const perform = Logwrap.perform.bind(Logwrap)

describe('logwrap-core/logwrap', () => {
  beforeEach(jest.resetAllMocks)

  describe('constructor', () => {
    it('returns proper instance', () => {
      const pipeline = [console]
      const opts = {
        level: 'warn',
        pipeline
      }
      const logwrap = new Logwrap(opts)

      expect(logwrap).toBeInstanceOf(Logwrap)
      expect(logwrap.opts).toBe(opts)
    })
  })

  describe('proto', () => {
    describe('exposes ILogger methods', () => {
      const fakeLogger = reduce(
        SEVERITY_ORDER,
        (memo, method) => {
          memo[method] = jest.fn()

          return memo
        },
        {}
      )
      const echo = jest.fn(data => data)
      const logwrap = new Logwrap({
        level: 'trace',
        pipeline: [fakeLogger, echo]
      })

      SEVERITY_ORDER.forEach(method => {
        it(method, () => {
          const input = [Math.random()]

          expect(logwrap[method](...input)).toEqual({
            level: method,
            input: input,
            meta: {}
          })

          expect(fakeLogger[method]).toHaveBeenCalledWith(...input)
          expect(echo).toHaveBeenCalledWith({
            input,
            level: method,
            meta: {}
          })
        })
      })
    })
  })

  describe('static', () => {
    describe('validateLevel', () => {
      it('returns true if target level is below or equal the threshold', () => {
        expect(validateLevel('error', 'error')).toBeTruthy()
        expect(validateLevel('warn', 'error')).toBeTruthy()
      })

      it('returns false otherwise', () => {
        expect(validateLevel('error', 'warn')).toBeFalsy()
      })
    })

    describe('normalizeEntry', () => {
      it('returns log entry "DTO"', () => {
        const level = 'debug'
        const input = ['foo', 'bar']
        const meta = { baz: 'qux' }

        expect(normalizeEntry(level, input, meta)).toEqual({ level, input, meta })
      })
    })

    describe('normalizePipe', () => {
      const input = ['foo', 'bar']
      const entry = {
        level: 'error',
        input
      }

      it('wraps ILogger instance', () => {
        const onError = jest.fn()
        const pipe = normalizePipe({ error: onError })

        expect(pipe(entry)).toBeUndefined()
        expect(onError).toHaveBeenCalledWith(...input)
      })

      it('uses IPipe as is', () => {
        const pipe = normalizePipe(data => data)

        expect(pipe(entry)).toBe(entry)
      })

      it('throws error otherwize', () => {
        expect(() => normalizePipe()).toThrowError('Unsupported pipe type: undefined')
      })
    })

    describe('perform', () => {
      const warn = jest.fn()
      const reqularPipe = jest.fn(data => data)
      const pipeline = [{ warn }, reqularPipe].map(normalizePipe)
      const input = ['foo', 'bar']

      it('does nothing on log level mismatch', () => {
        expect(perform('error', 'warn')).toBeUndefined()
      })

      it('processes data though the pipeline', () => {
        expect(perform('debug', 'warn', pipeline, input)).toEqual({
          level: 'warn',
          input,
          meta: {}
        })
      })
    })
  })
})
