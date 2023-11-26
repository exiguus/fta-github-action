import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

export type Output = {
  details: string
  summary: string
}

export async function run(file_path: string): Promise<Output> {
  // throw if path is not a string
  if (!file_path || typeof file_path !== 'string')
    throw new Error('Param `file_path` is required')
  // throw if path does not exist
  if (!fs.existsSync(path.join(__dirname, file_path)))
    throw new Error('Param `file_path` does not exist')

  // fta
  // Exec the cli fta command instead of the run function from the package
  // because the run function does not support all the options
  // See: https://github.com/sgb-io/fta/issues/50 and https://github.com/sgb-io/fta/issues/63

  // Also the run function does not have a TS definition like:
  // declare module 'fta-cli' {
  //   export interface IConfig {
  //     json?: boolean
  //   }
  //   export function runFta(path: string, config?: IConfig): string
  // }

  // Available options:
  // --output-limit <number>        Default 5000  How many files to include in the output table format.
  // --score-cap <number>           Default 1000  The maximum score to allow before throwing an error.
  // --include-comments <boolean>   Default false Include comments in the analysis.
  // --exclude-under <number>       Default 6     Exclude files with a line count under this number.
  // --exclude-directories <string> Default ''    Exclude directories with this name.
  // --exclude-filenames <string>   Default ''    Exclude files with this name.
  // --exclude-extensions <string>  Default ''    Exclude files with this extension.
  // --json <boolean>               Default false Output the results in JSON format.
  // Config File Example:
  // {
  //   "output_limit": 250,
  //   "score_cap": 90,
  //   "exclude_directories": ["__fixtures__"],
  //   "exclude_filenames": ["*.test.{ts,tsx}"],
  //   "extensions": [".cjs"],
  //   "include_comments": false,
  //   "exclude_under": 10
  // }
  // See: https://ftaproject.dev/docs/configuration#configuration-options

  // const output = await runFta(file_path, { json: true })
  const details = execSync(
    `npm exec --package=fta-cli -c 'fta ${path.join(
      __dirname,
      file_path
    )} --json'`
  ).toString()
  const summary = execSync(
    `npm exec --package=fta-cli -c 'fta ${path.join(__dirname, file_path)}'`
  ).toString()
  return { details, summary }
}
