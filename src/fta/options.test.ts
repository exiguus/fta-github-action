import {
  defaultOptions,
  mapActionOptions,
  convertOptionToFormat,
  convertOptionToArray,
  convertOptionToBoolean,
  convertOptionToNumber
} from './options'
import { ActionOptions, Formats } from './types'

describe('mapActionOptions function', () => {
  it('should map partial ActionOptions to OptionsMap using default values for missing options', () => {
    const partialOptions: Partial<ActionOptions> = {
      format: 'csv',
      json: 'true',
      outputLimit: '10000'
    }

    const result = mapActionOptions(partialOptions)

    expect(result).toEqual({
      format: Formats.csv,
      json: true,
      outputLimit: 10000,
      scoreCap: defaultOptions.scoreCap,
      includeComments: defaultOptions.includeComments,
      excludeUnder: defaultOptions.excludeUnder,
      excludeDirectories: defaultOptions.excludeDirectories,
      excludeFilenames: defaultOptions.excludeFilenames,
      extensions: defaultOptions.extensions
    })
  })
})

describe('convertOptionToFormat function', () => {
  it('should convert string value to Formats or use default', () => {
    const validFormat = 'csv'
    const invalidFormat = 'invalid'

    const spyConsoleInfo = jest.spyOn(console, 'info')

    const result = convertOptionToFormat('format', validFormat)
    const defaultResult = convertOptionToFormat('format', invalidFormat)

    expect(spyConsoleInfo).not.toHaveBeenCalledWith(
      // eslint-disable-next-line no-useless-escape
      `"Option: 'format' - Using configured value '\"csv\"'" "Option: 'format' - Using configured value '\"json\"'"`
    )

    expect(result).toEqual(Formats.csv)
    expect(defaultResult).toEqual(defaultOptions.format)
  })
})

describe('convertOptionToArray function', () => {
  it('should convert string value to array or use default', () => {
    const validArray = 'item1,item2,item3'
    const invalidArray = 'invalid'

    const result = convertOptionToArray('extensions', validArray)
    const defaultResult = convertOptionToArray('extensions', invalidArray)

    expect(result).toEqual(['item1', 'item2', 'item3'])
    expect(defaultResult).toEqual(['invalid'])
  })
})

describe('convertOptionToBoolean function', () => {
  it('should convert string value to boolean or use default', () => {
    const validBoolean = 'true'
    const invalidBoolean = 'invalid'

    const result = convertOptionToBoolean('json', validBoolean)
    const defaultResult = convertOptionToBoolean('json', invalidBoolean)

    expect(result).toEqual(true)
    expect(defaultResult).toEqual(defaultOptions.json)
  })
})

describe('convertOptionToNumber function', () => {
  it('should convert string value to number or use default', () => {
    const validNumber = '12345'
    const invalidNumber = 'invalid'

    const result = convertOptionToNumber('outputLimit', validNumber)
    const defaultResult = convertOptionToNumber('outputLimit', invalidNumber)

    expect(result).toEqual(12345)
    expect(defaultResult).toEqual(defaultOptions.outputLimit)
  })
})
