// @flow

import { createNamespace, getNamespace } from 'cls-hooked'
import type { INamespace } from 'cls-hooked'
import type { IAny } from '../../../../logwrap-core/src/main/js/interface'

export const DEFAULT_SPACE_ID = 'mdc'
export const DEFAULT_NS = getNamespace(DEFAULT_SPACE_ID) || createNamespace(DEFAULT_SPACE_ID)
export const TRACE_KEY = 'trace'

export type IOpts = {
  ns?: string
}

export default class Mdc {
  ns: INamespace

  constructor ({ ns }: IOpts): Mdc {
    this.ns = this.constructor.getNamespace(ns)

    return this
  }

  get () {
    return this.ns.get(TRACE_KEY)
  }

  static getNamespace (ns: IAny) {
    switch (typeof ns) {
      case 'string':
        return getNamespace(ns) || createNamespace(ns)

      case 'object':
        return ns

      default:
        return DEFAULT_NS
    }
  }
}
