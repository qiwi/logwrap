import { createNamespace, getNamespace, Namespace } from 'cls-hooked'
import { IAny } from '@qiwi/logwrap-core/target/es5/interface'

export const DEFAULT_SPACE_ID = 'mdc'
export const DEFAULT_NS = getNamespace(DEFAULT_SPACE_ID) || createNamespace(DEFAULT_SPACE_ID)
export const TRACE_KEY = 'trace'

export type IOpts = {
  ns?: string | Namespace
}

export default class Mdc {
  ns: Namespace

  constructor ({ ns }: IOpts) {
    this.ns = (this.constructor as any).getNamespace(ns)

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
