import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { ActionOptions, ActionOutput } from './types'
import {
  generateConfigOptions,
  mapActionOptions,
  writeConfigFile
} from './options'

/**
 * Run Fast TypeScript Analysis (FTA) on a file
 * @description wrap the fta-cli package to run the fta command
 * @param file_path - path to the file to analyze
 * @returns {Output} - the output of the fta command
 * @example
 * import { run } from 'fta'
 * const { details, summary } = await run('path/to/file.ts')
 * console.log(details)
 * console.log(summary)
 **/
export async function run(
  file_path: string,
  options?: Partial<ActionOptions>
): Promise<ActionOutput> {
  // throw if path is not a string
  if (!file_path || typeof file_path !== 'string')
    throw new Error('Param `file_path` is required')
  // throw if path does not exist
  if (!fs.existsSync(path.join(__dirname, file_path)))
    throw new Error('Param `file_path` does not exist')

  options = options || {
    scoreCap: '90'
  }
  const mappedOptions = mapActionOptions(options)
  console.log('mappedOptions', mappedOptions)
  const configFileOptions = generateConfigOptions(mappedOptions)
  console.log('configFileOptions', configFileOptions)
  writeConfigFile(configFileOptions)
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
  // Fast TypeScript Analysis (FTA) fta-cli@1.0.0
  // $ fta --help
  // Fast TypeScript Analyzer

  // Usage: fta [OPTIONS] <PROJECT>

  // Arguments:
  //   <PROJECT>  Path to the project to analyze

  // Options:
  //   -c, --config-path <CONFIG_PATH>
  //           Path to config file
  //   -f, --format <FORMAT>
  //           Output format (default: table) [default: table] [possible values: table, csv, json]
  //       --json
  //           Output as JSON.
  //   -o, --output-limit <OUTPUT_LIMIT>
  //           Maximum number of files to include in the table output (only applies when using table output) (default: 5000)
  //   -s, --score-cap <SCORE_CAP>
  //           Maximum FTA score which will cause FTA to throw (default: 1000)
  //   -i, --include-comments <INCLUDE_COMMENTS>
  //           Whether to include code comments when analysing (default: false) [possible values: true, false]
  //   -e, --exclude-under <EXCLUDE_UNDER>
  //           Minimum number of lines of code for files to be included in output (default: 6)
  //   -h, --help
  //           Print help
  //   -V, --version
  //           Print version

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
    )} --json --config-path fta.config.json'`
  ).toString()
  const summary = execSync(
    `npm exec --package=fta-cli -c 'fta ${path.join(
      __dirname,
      file_path
    )} --config-path fta.config.json'`
  ).toString()
  return { details, summary }
}
