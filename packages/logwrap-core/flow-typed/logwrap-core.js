// @flow

declare module "@qiwi/logwrap-core" {
  declare export type IAny = any

  declare export type ILogLevel = 'error' | 'warn' | 'info' | 'debug' | 'trace'

  declare export type ILogMethod = (...args: IAny[]) => void
  declare export type ILogger = {
    [ILogLevel]: ILogMethod,
    trace: ILogMethod,
    debug: ILogMethod,
    info: ILogMethod,
    warn: ILogMethod,
    error: ILogMethod
  }

  declare export type ILogEntryMeta = {
    [key: string]: IAny
  }

  declare export type ILogEntry = {
    level: ILogLevel,
    input: IAny[],
    meta: ILogEntryMeta
  }

  declare export type IPipe = (entry: ILogEntry) => ?ILogEntry
  declare export type IPipeline = Array<ILogger | IPipe>
  declare export type INormalizedPipeline = Array<IPipe>

  declare export type ILogwrapOpts = {
    pipeline: IPipeline,
    level: ILogLevel
  }

  declare export interface ILogwrap {
    constructor(opts: ILogwrapOpts): ILogwrap,
    opts: ILogwrapOpts,
    pipeline: INormalizedPipeline,
    level: ILogLevel
  }

  declare export type IUtil = {
    reduce: $PropertyType<$Exports<"lodash-es">, "reduce">;
  }

  declare export var util: IUtil

  declare export var ERROR: 'error'
  declare export var WARN: 'warn'
  declare export var INFO: 'info'
  declare export var DEBUG: 'debug'
  declare export var TRACE: 'trace'

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
