import fs from 'fs'
import path from 'path'

export const writeOutput = (output_path: string, data: string): void => {
  try {
    fs.writeFileSync(
      path.join(process.env.GITHUB_WORKSPACE || '', output_path),
      data,
      {
        encoding: 'utf8'
      }
    )
  } catch (error) {
    throw new Error('Error writing output file')
  }
}
