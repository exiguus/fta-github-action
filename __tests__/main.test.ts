// Import necessary modules
import * as core from '@actions/core'
import * as fta from '../src/fta'
import { run } from '../src/main'

// Mock the @actions/core module
jest.mock('@actions/core', () => ({
  getInput: jest.fn(),
  setOutput: jest.fn(),
  setFailed: jest.fn(),
  debug: jest.fn()
}))

// Mock the ./fta module
jest.mock('../src/fta', () => ({
  run: jest.fn()
}))

describe('run function', () => {
  beforeEach(() => {
    // Clear the mock calls before each test
    jest.clearAllMocks()
  })

  it('should run successfully with default values', async () => {
    // Set mock inputs
    jest
      .spyOn(core, 'getInput')
      .mockReturnValueOnce('/path/to/file')
      .mockReturnValueOnce('')
      .mockReturnValueOnce('output.json')
      .mockReturnValueOnce('table')
      .mockReturnValueOnce('false')
      .mockReturnValueOnce('5000')
      .mockReturnValueOnce('1000')
      .mockReturnValueOnce('false')
      .mockReturnValueOnce('6')
      .mockReturnValueOnce('/dist, /bin, /build')
      .mockReturnValueOnce('.d.ts, .min.js, .bundle.js')
      .mockReturnValueOnce('.js, .jsx, .ts, .tsx')

    // Set mock run result
    const mockRunResult = {
      details: 'mock details',
      summary: 'mock summary'
    }
    // Set fta.run to return the mock run result
    jest.spyOn(fta, 'run').mockResolvedValueOnce(mockRunResult)

    // Run the function
    await run()

    // Expectations
    expect(core.getInput).toHaveBeenCalledTimes(12) // Adjust the count based on your actual number of inputs
    expect(fta.run).toHaveBeenCalledWith('/path/to/file', '', 'output.json', {
      format: 'table',
      json: 'false',
      outputLimit: '5000',
      scoreCap: '1000',
      includeComments: 'false',
      excludeUnder: '6',
      excludeDirectories: '/dist, /bin, /build',
      excludeFilenames: '.d.ts, .min.js, .bundle.js',
      extensions: '.js, .jsx, .ts, .tsx'
    })

    expect(core.setOutput).toHaveBeenCalledWith('details', 'mock details')
    expect(core.setOutput).toHaveBeenCalledWith('summary', 'mock summary')
  })

  it('should handle errors and setFailed', async () => {
    // Set mock inputs to simulate an error
    jest.spyOn(core, 'getInput').mockImplementationOnce(() => {
      throw new Error('Mocked error')
    })

    // Run the function
    await run()

    // Expectations
    expect(core.setFailed).toHaveBeenCalledWith('Mocked error')
  })

  it('should show debug logs', async () => {
    // Set the debug secret to true
    process.env.ACTIONS_STEP_DEBUG = 'true'

    // Set mock inputs
    jest
      .spyOn(core, 'getInput')
      .mockReturnValueOnce('/path/to/file')
      .mockReturnValueOnce('')
      .mockReturnValueOnce('output.json')
      .mockReturnValueOnce('table')
      .mockReturnValueOnce('false')
      .mockReturnValueOnce('5000')
      .mockReturnValueOnce('1000')
      .mockReturnValueOnce('false')
      .mockReturnValueOnce('6')
      .mockReturnValueOnce('/dist, /bin, /build')
      .mockReturnValueOnce('.d.ts, .min.js, .bundle.js')
      .mockReturnValueOnce('.js, .jsx, .ts, .tsx')

    // Set mock run result
    const mockRunResult = {
      details: 'mock details',
      summary: 'mock summary'
    }
    jest.fn().mockResolvedValueOnce(mockRunResult)

    // Run the function
    await run()

    // Expectations
    expect(core.debug).toHaveBeenCalledTimes(14) // Adjust the count based on your actual number of debug logs
  })
})
