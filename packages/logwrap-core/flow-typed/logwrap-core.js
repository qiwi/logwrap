// @flow

declare module "@qiwi/logwrap-core" {
  declare type IAny = any

  declare type ILogLevel = 'error' | 'warn' | 'info' | 'debug' | 'trace'

  declare type ILogMethod = (...args: IAny[]) => void
  declare type ILogger = {
    [ILogLevel]: ILogMethod,
    trace: ILogMethod,
    debug: ILogMethod,
    info: ILogMethod,
    warn: ILogMethod,
    error: ILogMethod
  }

  declare type ILogEntryMeta = {
    [key: string]: IAny
  }

  declare type ILogEntry = {
    level: ILogLevel,
    input: IAny[],
    meta: ILogEntryMeta
  }

  declare type IPipe = (entry: ILogEntry) => ?ILogEntry
  declare type IPipeline = Array<ILogger | IPipe>
  declare type INormalizedPipeline = Array<IPipe>

  declare type ILogwrapOpts = {
    pipeline: IPipeline,
    level: ILogLevel
  }

  declare interface ILogwrap {
    constructor(opts: ILogwrapOpts): ILogwrap,
    opts: ILogwrapOpts,
    pipeline: INormalizedPipeline,
    level: ILogLevel
  }

  declare type IUtil = {
    reduce: $PropertyType<$Exports<"lodash-es">, "reduce">;
  }

  declare export var util: IUtil

  declare export class Logwrap {
    $key: ILogLevel,
    $value: ILogMethod,
    opts: ILogwrapOpts,
    pipeline: INormalizedPipeline,
    level: ILogLevel,
    constructor (opts: ILogwrapOpts): ILogwrap
  }

  declare export default Logwrap
}
