// @flow

declare module "@qiwi/logwrap-mdc" {
  import type { INamespace } from 'cls-hooked'
  import type { ILogEntry, IPipe } from '@qiwi/logwrap-core'

  declare type IMdcOpts = {
    ns?: INamespace | string
  }

  declare export default function factory(opts?: IMdcOpts): IPipe
}
