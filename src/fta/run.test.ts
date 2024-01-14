import fs from 'fs'
import { execSync } from 'child_process'
import { run } from './run'
import { defaultInput } from './options'
import { TMP_CONFIG_FILE } from './config'
import path from 'path'

jest.mock('fs')
jest.mock('child_process')

describe('run function', () => {
  const mockFsExistsSync = jest.spyOn(fs, 'existsSync')
  // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
  const mockWriteConfig = jest.spyOn(require('./config'), 'writeConfig')
  // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
  const mockWriteOutput = jest.spyOn(require('./output'), 'writeOutput')
  const mockExecSync = jest.spyOn({ execSync }, 'execSync')

  beforeEach(() => {
    // Reset mock calls before each test
    jest.clearAllMocks()
  })

  it('should run successfully with default values', async () => {
    mockFsExistsSync.mockReturnValueOnce(true)
    mockExecSync.mockImplementation(() => 'mocked execSync')

    const result = await run()

    // Check if fs.existsSync and other functions were called with the expected arguments
    expect(mockFsExistsSync).toHaveBeenCalledWith(
      expect.stringContaining(path.join(__dirname, defaultInput.filePath))
    )
    expect(mockFsExistsSync).toHaveBeenCalledWith(
      expect.stringContaining(defaultInput.configPath)
    )
    expect(mockFsExistsSync).toHaveBeenCalledWith(
      expect.stringContaining(path.join(__dirname, defaultInput.filePath))
    )

    expect(mockWriteConfig).toHaveBeenCalledWith(
      expect.stringContaining(TMP_CONFIG_FILE),
      expect.any(Object)
    )

    expect(mockExecSync).toHaveBeenCalledTimes(2)

    expect(mockExecSync).toHaveBeenCalledWith(
      expect.stringMatching(
        /npm exec --package=fta-cli -c 'fta .* --config-path .* --format table'/
      )
    )

    expect(mockExecSync).toHaveBeenCalledWith(
      expect.stringMatching(
        /npm exec --package=fta-cli -c 'fta .* --config-path .* --format json'/
      )
    )

    expect(mockWriteOutput).toHaveBeenCalledWith(
      expect.stringContaining(defaultInput.outputPath),
      expect.any(String)
    )

    // Check the result structure
    expect(result).toHaveProperty('details')
    expect(result).toHaveProperty('summary')
  })

  it('should throw an error if file_path does not exist', async () => {
    mockFsExistsSync.mockReturnValueOnce(false)

    await expect(run()).rejects.toThrow('Param `file_path` does not exist')
  })

  it('should throw an error if config_path does not exist', async () => {
    mockFsExistsSync.mockReturnValueOnce(true)
    mockFsExistsSync.mockReturnValueOnce(false)

    await expect(run('test-file', 'nonexistent-config.json')).rejects.toThrow(
      'Param `config_path` is not a file'
    )
  })

  afterAll(() => {
    // Restore original implementations after all tests are done
    mockFsExistsSync.mockRestore()
    mockWriteConfig.mockRestore()
    mockWriteOutput.mockRestore()
    mockExecSync.mockRestore()
  })
})
