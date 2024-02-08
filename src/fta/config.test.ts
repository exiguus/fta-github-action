import fs from 'fs'
import path from 'path'
import {
  getConfig,
  writeConfig,
  isActionOptions,
  generateConfigFile
} from './config'
import { ConfigFileOptions, OptionsMap } from './types'

const validConfigMock: ConfigFileOptions = {
  // config options
  output_limit: 10,
  score_cap: 5,
  include_comments: true,
  exclude_under: 5,
  exclude_directories: ['node_modules'],
  exclude_filenames: ['index.js'],
  extensions: ['.js', '.ts']
}

const validOptionsMap: OptionsMap = {
  // options map
  format: 'csv' as const,
  json: false,
  outputLimit: 10,
  scoreCap: 5,
  includeComments: true,
  excludeUnder: 5,
  excludeDirectories: ['node_modules'],
  excludeFilenames: ['index.js'],
  extensions: ['.js', '.ts']
}

describe('getConfig function', () => {
  const validConfigMockPath = 'valid-config.json'
  const invalidConfigMockPath = 'invalid-config.txt'

  it('should return parsed config for a valid JSON file', () => {
    jest
      .spyOn(fs, 'readFileSync')
      .mockReturnValueOnce(JSON.stringify(validConfigMock))

    const result = getConfig(validConfigMockPath)

    expect(result).toEqual(validConfigMock)
  })

  it('should return null for an invalid JSON file', () => {
    jest.spyOn(fs, 'readFileSync').mockImplementationOnce(() => {
      throw new Error()
    })

    try {
      const result = getConfig(invalidConfigMockPath)
      expect(result).toBeNull()
    } catch (error) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error).toBeInstanceOf(Error)
      if (error instanceof Error)
        // eslint-disable-next-line jest/no-conditional-expect
        expect(error?.message).toEqual(
          'Param `config_path` is not a valid json file'
        )
    }
  })
})

describe('writeConfig function', () => {
  const configPath = 'output-config.json'

  it('should write the config to the specified file', () => {
    jest.spyOn(fs, 'writeFileSync').mockImplementationOnce(() => {
      // do nothing
    })

    writeConfig(configPath, validConfigMock)

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      path.join(process.env.GITHUB_WORKSPACE || '', configPath),
      JSON.stringify(validConfigMock, null, 2),
      { encoding: 'utf8' }
    )
  })

  it('should throw an error if there is an issue writing the file', () => {
    jest.spyOn(fs, 'writeFileSync').mockImplementationOnce(() => {
      throw new Error()
    })

    expect(() => writeConfig(configPath, validConfigMock)).toThrow(
      'Error writing config file'
    )
  })
})

describe('isActionOptions function', () => {
  it('should return true for valid ActionOptions', () => {
    const result = isActionOptions(validConfigMock)

    expect(result).toBe(true)
  })

  it('should return false for invalid ActionOptions', () => {
    const invalidOptions = null

    const result = isActionOptions(invalidOptions)

    expect(result).toBe(false)
  })
})

describe('generateConfigFile function', () => {
  it('should generate ConfigFileOptions from OptionsMap', () => {
    const result = generateConfigFile(validOptionsMap)

    // Add assertions based on the expected result
    expect(result).toEqual({
      output_limit: validOptionsMap.outputLimit,
      score_cap: validOptionsMap.scoreCap,
      include_comments: validOptionsMap.includeComments,
      exclude_under: validOptionsMap.excludeUnder,
      exclude_directories: validOptionsMap.excludeDirectories,
      exclude_filenames: validOptionsMap.excludeFilenames,
      extensions: validOptionsMap.extensions
    })
  })
})
