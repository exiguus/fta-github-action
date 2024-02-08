import fs from 'fs'
import path from 'path'
import {
  ActionOptions,
  ConfigFileOptions,
  FTA_ConfigFileOptions,
  OptionsMap
} from './types'

export const TMP_CONFIG_FILE = 'tmp-config-file.json'

/**
 * getConfig from a json file and validate it
 * @param {string} config_path
 * @returns {Partial<ActionOptions> | null}
 */
export const getConfig = (
  config_path: string
): Partial<ActionOptions> | null => {
  try {
    const config = JSON.parse(
      fs.readFileSync(
        path.join(process.env.GITHUB_WORKSPACE || '', config_path),
        'utf8'
      )
    )
    return isActionOptions(config) ? config : null
  } catch (error) {
    throw new Error('Param `config_path` is not a valid json file')
  }
}

/**
 * writeConfig to a json file
 * @param {string} config_path
 * @param {ConfigFileOptions} options
 * @returns {void}
 */
export const writeConfig = (
  config_path: string,
  options: ConfigFileOptions
): void => {
  try {
    fs.writeFileSync(
      path.join(process.env.GITHUB_WORKSPACE || '', config_path),
      JSON.stringify(options, null, 2),
      { encoding: 'utf8' }
    )
  } catch (error) {
    throw new Error('Error writing config file')
  }
}

// ConfigFileOptions is a subset of ActionOptions
export const isActionOptions = (options: unknown): options is ActionOptions => {
  if (typeof options !== 'object' || options === null) return false
  const actionOptions = Object.values(FTA_ConfigFileOptions)
  return actionOptions.every(option => option in options)
}

export const generateConfigFile = (options: OptionsMap): ConfigFileOptions => ({
  output_limit: options.outputLimit,
  score_cap: options.scoreCap,
  include_comments: options.includeComments,
  exclude_under: options.excludeUnder,
  exclude_directories: options.excludeDirectories,
  exclude_filenames: options.excludeFilenames,
  extensions: options.extensions
})
