// @flow

import { reduce } from './util'

import type {
  IAny,
  ILogLevel,
  ILogPipeline,
  ILogwrap,
  ILogwrapOpts
} from './interface'

const SEVERITY_ORDER = ['error', 'warn', 'info', 'debug', 'trace']

export default class Logwrap implements ILogwrap {
  opts: ILogwrapOpts
  pipeline: ILogPipeline
  level: ILogLevel
  constructor (opts: ILogwrapOpts): ILogwrap {
    this.opts = opts
    this.pipeline = opts.pipeline
    this.level = opts.level

    return this
  }

  trace (...args: IAny[]): void {}
  debug (...args: IAny[]): void {}
  info (...args: IAny[]): void {}
  warn (...args: IAny[]): void {}
  error (...args: IAny[]): void {}

  static perform (treshold: ILogLevel, level: ILogLevel, pipeline: ILogPipeline, args: IAny[]): IAny {
    if (!this.validateLevel(treshold, level)) {
      return
    }

    return reduce(
      pipeline,
      (memo, pipe) => {
        return pipe[level](...args)
      },
      args
    )
  }

  // TODO optimize
  static validateLevel (treshold: ILogLevel, level: ILogLevel) {
    return SEVERITY_ORDER.indexOf(treshold) >= SEVERITY_ORDER.indexOf(level)
  }
}
