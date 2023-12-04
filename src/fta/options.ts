import fs from 'fs'
import { ActionOptions, ConfigFileOptions, Formats, OptionsMap } from './types'

// Use the defaults from FTA
// See: https://github.com/sgb-io/fta-website/blob/main/pages/docs/configuration.mdx
export const defaultOptions: OptionsMap = {
  configPath: '',
  format: Formats.table,
  json: false,
  outputLimit: 5000,
  scoreCap: 1000,
  includeComments: false,
  excludeUnder: 6,
  excludeDirectories: ['/dist', '/bin', '/build'],
  excludeFilenames: ['.d.ts', '.min.js', '.bundle.js'],
  extensions: ['.js', '.jsx', '.ts', '.tsx']
}

export const generateConfigOptions = (
  options: OptionsMap
): ConfigFileOptions => ({
  output_limit: options.outputLimit,
  score_cap: options.scoreCap,
  include_comments: options.includeComments,
  exclude_under: options.excludeUnder,
  exclude_directories: options.excludeDirectories,
  exclude_filenames: options.excludeFilenames,
  extensions: options.extensions
})

export const writeConfigFile = (options: ConfigFileOptions): void => {
  fs.writeFileSync('fta.config.json', JSON.stringify(options, null, 2))
}

export const mapActionOptions = (
  options: Partial<ActionOptions>
): OptionsMap => ({
  configPath: convertOptionToString('configPath', options.configPath),
  format: convertOptionToFormat('format', options.format),
  json: convertOptionToBoolean('json', options.json),
  outputLimit: convertOptionToNumber('outputLimit', options.outputLimit),
  scoreCap: convertOptionToNumber('scoreCap', options.scoreCap),
  includeComments: convertOptionToBoolean(
    'includeComments',
    options.includeComments
  ),
  excludeUnder: convertOptionToNumber('excludeUnder', options.excludeUnder),
  excludeDirectories: convertOptionToArray(
    'excludeDirectories',
    options.excludeDirectories
  ),
  excludeFilenames: convertOptionToArray(
    'excludeFilenames',
    options.excludeFilenames
  ),
  extensions: convertOptionToArray('extensions', options.extensions)
})

const isOptionString = (value?: string): boolean => typeof value === 'string'
const isOptionFormat = (value?: string): boolean =>
  typeof value === 'string' && Object.values(Formats).includes(value as Formats)
const isOptionNumber = (value?: string): boolean =>
  typeof value === 'string' && !isNaN(Number(value))
const isOptionBoolean = (value?: string): boolean =>
  typeof value === 'string' && (value === 'true' || value === 'false')
const isOptionArray = (value: string): boolean =>
  typeof value === 'string' && Array.isArray(value.split(','))

const convertOptionToString = (
  key: keyof OptionsMap,
  value?: string
): string => {
  if (!value || !isOptionString(value)) {
    convertFailLog(key, 'string', value)
    return defaultOptions[key] as string
  }
  return value
}

const convertOptionToFormat = (
  key: keyof OptionsMap,
  value?: string
): Formats => {
  if (!value || !isOptionFormat(value)) {
    convertFailLog(key, 'format', value)
    return defaultOptions[key] as Formats
  }
  return value as Formats
}

const convertOptionToArray = (
  key: keyof OptionsMap,
  value?: string
): string[] => {
  if (!value || !isOptionArray(value)) {
    convertFailLog(key, 'array', value)
    return defaultOptions[key] as string[]
  }
  return value.split(',')
}

const convertOptionToBoolean = (
  key: keyof OptionsMap,
  value?: string
): boolean => {
  if (!value || !isOptionBoolean(value)) {
    convertFailLog(key, 'boolean', value)
    return defaultOptions[key] as boolean
  }
  return value === 'true'
}

const convertOptionToNumber = (
  key: keyof OptionsMap,
  value?: string
): number => {
  if (!value || !isOptionNumber(value)) {
    convertFailLog(key, 'number', value)
    return defaultOptions[key] as number
  }
  convertSuccessLog(key, value)
  return Number(value)
}

const convertFailLog = (
  key: keyof OptionsMap,
  expect: 'boolean' | 'number' | 'array' | 'string' | 'format',
  value?: string
): void => {
  if (value)
    console.warn(
      `Option: '${key}' - Expected a ${expect} but received '${value}'`
    )
  console.info(
    `Option: '${key}' - Using default value '${JSON.stringify(
      defaultOptions[key]
    )}'`
  )
}

const convertSuccessLog = (key: keyof OptionsMap, value: string): void => {
  console.info(
    `Option: '${key}' - Using configured value '${JSON.stringify(value)}'`
  )
}
