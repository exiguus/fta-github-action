import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { ActionOptions, ActionOutput } from './types'
import { defaultInput, defaultOptions, mapActionOptions } from './options'
import {
  TMP_CONFIG_FILE,
  generateConfigFile,
  getConfig,
  writeConfig
} from './config'
import { writeOutput } from './output'

/**
 * Run Fast TypeScript Analysis (FTA) on a file
 * @description wrap the fta-cli package to run the fta command
 * @param {string} file_path - path to the file to analyze
 * @param {string} config_path - path to the config file
 * @param {string} output_path - path to the output file
 * @param {Partial<ActionOptions>} options - options to override the config file
 * @returns {Promise<ActionOutput>} - the output of the fta command
 **/
export async function run(
  file_path?: string,
  config_path?: string,
  output_path?: string,
  options: Partial<ActionOptions> | null = null
): Promise<ActionOutput> {
  if (!file_path) {
    file_path = defaultInput.filePath
  }
  if (!config_path) {
    config_path = defaultInput.configPath
  }
  if (!output_path) {
    output_path = defaultInput.outputPath
  }

  if (!fs.existsSync(path.join(__dirname, file_path)))
    throw new Error('Param `file_path` does not exist')

  // use --format over --json shorthand fta cli cmd
  if (options?.json && options?.format !== 'json') {
    options.format = 'json'
    options.json = 'false'
  }

  // map options from github action, config_path and defaults
  // if config_path is provided, use it and override with options
  //  if not, use options or defaultOptions
  let mappedOptions
  if (config_path.length > 0) {
    // throw if config path does not exist
    try {
      fs.existsSync(path.join(__dirname, config_path))
    } catch (error) {
      throw new Error('Param `config_path` does not exist')
    }
    // throw if config path is not a json file
    try {
      path.extname(config_path) !== '.json'
    } catch (error) {
      throw new Error('Param `config_path` is not a json file')
    }
    // throw if config path is not a file
    try {
      if (path.extname(config_path) !== '.json')
        throw new Error('Param `config_path` is not a json file')
    } catch (error) {
      throw new Error('Param `config_path` is not a json file')
    }
    try {
      if (!fs.lstatSync(path.join(__dirname, config_path)).isFile())
        throw new Error('Param `config_path` is not a file')
    } catch (error) {
      throw new Error('Param `config_path` is not a file')
    }

    const config = getConfig(config_path)
    mappedOptions = mapActionOptions({
      // options have priority over config (like in the cli)
      ...config,
      ...options
    })
  } else {
    mappedOptions = options ? mapActionOptions(options) : defaultOptions
  }

  const configFileOptions = generateConfigFile(mappedOptions)
  writeConfig(TMP_CONFIG_FILE, configFileOptions)
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

  // output
  // details is the output of the fta command with the format option
  //  details are also saved to a file in the github action
  const configFile = path.join(__dirname, TMP_CONFIG_FILE)
  const filePath = path.join(__dirname, file_path)
  const details = execSync(
    `npm exec --package=fta-cli -c 'fta ${filePath} --config-path ${configFile} --format ${mappedOptions.format}'`
  ).toString()
  // summary is the output of the fta command with the table format option
  //  to have a quick look at the results
  const summary = execSync(
    `npm exec --package=fta-cli -c 'fta ${filePath} --config-path ${configFile} --format table'`
  ).toString()

  if (output_path) {
    writeOutput(output_path, details)
  }

  return { details, summary }
}
