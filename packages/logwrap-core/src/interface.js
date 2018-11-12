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

export type ILogPipeline = Array<ILogger>

export type ILogwrapOpts = {
  pipeline: ILogPipeline,
  level: ILogLevel
}

export interface ILogwrap extends ILogger {
  constructor(opts: ILogwrapOpts): ILogwrap,
  opts: ILogwrapOpts,
  pipeline: ILogPipeline,
  level: ILogLevel
}
