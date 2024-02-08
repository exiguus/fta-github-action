import { ActionInput, ActionOptions, Formats, OptionsMap } from './types'

export const defaultInput: ActionInput = {
  filePath: '../src/',
  configPath: '',
  outputPath: 'output.json',
  format: 'json',
  json: 'false',
  outputLimit: '5000',
  scoreCap: '1000',
  includeComments: 'false',
  excludeUnder: '6',
  excludeDirectories: '/dist, /bin, /build',
  excludeFilenames: '.d.ts, .min.js, .bundle.js',
  extensions: '.js, .jsx, .ts, .tsx'
}
// Use the defaults from FTA
// See: https://github.com/sgb-io/fta-website/blob/main/pages/docs/configuration.mdx
export const defaultOptions: OptionsMap = {
  format: Formats.json,
  json: false,
  outputLimit: 5000,
  scoreCap: 1000,
  includeComments: false,
  excludeUnder: 6,
  excludeDirectories: ['/dist', '/bin', '/build'],
  excludeFilenames: ['.d.ts', '.min.js', '.bundle.js'],
  extensions: ['.js', '.jsx', '.ts', '.tsx']
}

export const mapActionOptions = (
  options: Partial<ActionOptions>
): OptionsMap => ({
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

const isOptionFormat = (value?: string): boolean =>
  typeof value === 'string' && Object.values(Formats).includes(value as Formats)
const isOptionNumber = (value?: string): boolean =>
  typeof value === 'string' && !isNaN(Number(value))
const isOptionBoolean = (value?: string): boolean =>
  typeof value === 'string' && (value === 'true' || value === 'false')
const isOptionArray = (value: string): boolean =>
  typeof value === 'string' && Array.isArray(value.split(','))

export const convertOptionToFormat = (
  key: keyof OptionsMap,
  value?: string
): Formats => {
  if (!value || !isOptionFormat(value)) {
    convertFailLog(key, 'format', value)
    return defaultOptions[key] as Formats
  }
  convertSuccessLog(key, value)
  return value as Formats
}

export const convertOptionToArray = (
  key: keyof OptionsMap,
  value?: string
): string[] => {
  if (!value || !isOptionArray(value)) {
    convertFailLog(key, 'array', value)
    return defaultOptions[key] as string[]
  }
  convertSuccessLog(key, value)
  return value.split(',')
}

export const convertOptionToBoolean = (
  key: keyof OptionsMap,
  value?: string
): boolean => {
  if (!value || !isOptionBoolean(value)) {
    convertFailLog(key, 'boolean', value)
    return defaultOptions[key] as boolean
  }
  convertSuccessLog(key, value)
  return value === 'true'
}

export const convertOptionToNumber = (
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

export const convertFailLog = (
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
      defaultInput[key]
    )}'`
  )
}

export const convertSuccessLog = (
  key: keyof OptionsMap,
  value: string
): void => {
  console.info(
    `Option: '${key}' - Using configured value '${JSON.stringify(value)}'`
  )
}
