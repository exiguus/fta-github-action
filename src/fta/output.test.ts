import fs from 'fs'
import path from 'path'
import { writeOutput } from './output'

describe('writeOutput function', () => {
  const outputFilePath = './dist/test-output.json'
  const testData = '{"key": "value"}'

  it('should write data to the specified output file', () => {
    const spyWriteFileSync = jest.spyOn(fs, 'writeFileSync')

    // Call the function
    writeOutput(outputFilePath, testData)

    // Check if fs.writeFileSync was called with the expected arguments
    expect(spyWriteFileSync).toHaveBeenCalledWith(
      path.join(process.env.GITHUB_WORKSPACE || '', outputFilePath),
      testData,
      { encoding: 'utf8' }
    )

    // Clean up the spy
    spyWriteFileSync.mockRestore()
  })

  it('should throw an error if there is an issue writing the file', () => {
    // Mock fs.writeFileSync to throw an error
    jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {
      throw new Error()
    })

    // Expect the function to throw an error
    expect(() => writeOutput(outputFilePath, testData)).toThrow(
      'Error writing output file'
    )

    // Clean up the mock
    jest.restoreAllMocks()
  })
})
