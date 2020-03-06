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
  INormalizedPipeline,
  ILogMethod
} from './interface'

export const SEVERITY_ORDER = ['error', 'warn', 'info', 'debug', 'trace']

export default class Logwrap implements ILogwrap {
  $key: ILogLevel

  $value: ILogMethod

  opts: ILogwrapOpts

  pipeline: INormalizedPipeline

  level: ILogLevel

  trace: ILogMethod

  debug: ILogMethod

  info: ILogMethod

  warn: ILogMethod

  error: ILogMethod

  constructor (opts: ILogwrapOpts): ILogwrap {
    this.opts = opts
    this.pipeline = opts.pipeline.map(this.constructor.normalizePipe)
    this.level = opts.level

    this.error = this.constructor.initLogMethod('error', this.level, this.pipeline)
    this.warn = this.constructor.initLogMethod('warn', this.level, this.pipeline)
    this.debug = this.constructor.initLogMethod('debug', this.level, this.pipeline)
    this.info = this.constructor.initLogMethod('info', this.level, this.pipeline)
    this.trace = this.constructor.initLogMethod('trace', this.level, this.pipeline)

    // $FlowFixMe
    this.log = this.info // NOTE console.log legacy

    return this
  }

  static initLogMethod (method: ILogLevel, level: ILogLevel, pipeline: INormalizedPipeline): ILogMethod {
    return (...args: IAny): void => {
      const entry = this.normalizeEntry(method, args, {})
      return this.perform(level, pipeline, entry)
    }
  }

  static perform (treshold: ILogLevel, pipeline: INormalizedPipeline, entry: ILogEntry): IAny {
    if (!this.validateLevel(treshold, entry.level)) {
      return
    }

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
        // $FlowFixMe
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
