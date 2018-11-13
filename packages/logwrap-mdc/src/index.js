// @flow

import Mdc from './Mdc'
import type { IPipeFactory, ILogEntry } from '../../logwrap-core/src/interface'
import type { IMdcOpts } from './interface'

export default ((opts?: IMdcOpts) => {
  const _opts = opts || {}
  const mdc = new Mdc(_opts)

  return (entry: ILogEntry) => {
    // $FlowFixMe
    Object.defineProperty(entry.meta, 'trace', {
      get () {
        return mdc.get()
      },
      set () {}
    })

    return entry
  }
}: IPipeFactory)

export { Mdc }
