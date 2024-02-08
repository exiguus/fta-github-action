import fs from 'fs'
import path from 'path'

export const writeOutput = (output_path: string, data: string): void => {
  try {
    // write output file into ../dist
    fs.writeFileSync(path.join(__dirname, '..', output_path), data, {
      encoding: 'utf8'
    })
  } catch (error) {
    throw new Error('Error writing output file')
  }
}
