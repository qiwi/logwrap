// @FLOW

export type IAny = any

export type ILogLevel = 'error' | 'warn' | 'info' | 'debug' | 'trace'

export type ILogMethod = (...args: IAny[]) => void
export type ILogger = {
  [ILogLevel]: ILogMethod,
  trace: ILogMethod,
  debug: ILogMethod,
  info: ILogMethod,
  warn: ILogMethod,
  error: ILogMethod
}

export type ILogEntryMeta = {
  [key: string]: IAny
}

export type ILogEntry = {
  level: ILogLevel,
  input: IAny[],
  meta: ILogEntryMeta
}

export type IPipe = (entry: ILogEntry) => ?ILogEntry
export type IPipeline = Array<ILogger | IPipe>
export type INormalizedPipeline = Array<IPipe>

export type ILogwrapOpts = {
  pipeline: IPipeline,
  level: ILogLevel
}

export interface ILogwrap extends ILogger {
  constructor(opts: ILogwrapOpts): ILogwrap,
  opts: ILogwrapOpts,
  pipeline: INormalizedPipeline,
  level: ILogLevel
}
