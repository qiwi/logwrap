import Logwrap from '../src/logwrap'

describe('logwrap-core/logwrap', () => {
  describe('constructor', () => {
    it('returns proper instance', () => {
      const opts = {
        level: 'warn',
        provider: [console]
      }
      const logwrap = new Logwrap(opts)

      expect(logwrap).toBeInstanceOf(Logwrap)
      expect(logwrap.opts).toBe(opts)
    })
  })

  describe('proto', () => {

  })

  describe('static', () => {

  })
})
