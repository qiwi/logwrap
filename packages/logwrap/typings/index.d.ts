declare module '@qiwi/logwrap/es5/index' {
  import { ILogger, ILoggerMethod } from '@qiwi/substrate'

  type IAny = any

  export type ILogLevel = 'error' | 'warn' | 'info' | 'log' | 'debug' | 'trace'

  export type ILogEntryMeta = {
    [key: string]: IAny
  }

  export type ILogEntry = {
    level: ILogLevel,
    input: IAny[],
    meta: ILogEntryMeta
  }

  export type ILogwrapOpts = {
    pipeline: IPipeline,
    level: ILogLevel
  }

  export type IPipe = (entry: ILogEntry) => ILogEntry
  export type IPipeline = Array<ILogger | IPipe>

  export class Logwrap implements ILogger {
    constructor(opts: ILogwrapOpts)
    trace: ILoggerMethod;
    debug: ILoggerMethod;
    info: ILoggerMethod;
    log: ILoggerMethod;
    warn: ILoggerMethod;
    error: ILoggerMethod;
    fatal?: ILoggerMethod;
    [key: string]: any;
    [key: number]: any;
  }

  export type IPipeFactoryOpts = {
    [key: string]: IAny
  }

  export type IPipeFactory = (opts?: IPipeFactoryOpts) => IPipe

  export const mdc: IPipeFactory
}

declare module '@qiwi/logwrap' {
  export * from '@qiwi/logwrap/es5/index'
}
