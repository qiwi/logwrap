// @flow

import { reduce } from './util'

import type {
  IAny,
  ILogEntry,
  ILogEntryMeta,
  ILogger,
  ILogLevel,
  IPipe,
  ILogwrap,
  ILogwrapOpts,
  INormalizedPipeline
} from './interface'

export const SEVERITY_ORDER = ['error', 'warn', 'info', 'debug', 'trace']

export default class Logwrap implements ILogwrap {
  opts: ILogwrapOpts
  pipeline: INormalizedPipeline
  level: ILogLevel
  constructor (opts: ILogwrapOpts): ILogwrap {
    this.opts = opts
    this.pipeline = opts.pipeline.map(this.constructor.normalizePipe)
    this.level = opts.level

    return this
  }

  trace (...args: IAny[]): void {}
  debug (...args: IAny[]): void {}
  info (...args: IAny[]): void {}
  warn (...args: IAny[]): void {}
  error (...args: IAny[]): void {}

  static perform (treshold: ILogLevel, level: ILogLevel, pipeline: INormalizedPipeline, input: IAny[]): IAny {
    if (!this.validateLevel(treshold, level)) {
      return
    }

    const entry = this.normalizeEntry(level, input, {})

    return reduce(
      pipeline,
      (memo, pipe) => pipe(memo) || memo,
      entry
    )
  }

  static normalizePipe (pipe: IPipe | ILogger): IPipe {
    switch (typeof pipe) {
      case 'function':
        return pipe

      case 'object':
        return (entry: ILogEntry) => pipe[entry.level](...entry.input)

      default:
        throw new Error(`Unsupported pipe type: ${typeof pipe}`)
    }
  }

  static normalizeEntry (level: ILogLevel, input: IAny, meta: ILogEntryMeta): ILogEntry {
    return {
      level,
      input,
      meta: { ...meta }
    }
  }

  // TODO optimize
  static validateLevel (treshold: ILogLevel, level: ILogLevel) {
    return SEVERITY_ORDER.indexOf(treshold) >= SEVERITY_ORDER.indexOf(level)
  }
}
