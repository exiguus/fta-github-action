import * as core from '@actions/core'
import * as fta from './fta'
/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const project_path: string = core.getInput('project_path')
    const config_path: string = core.getInput('config_path')
    const output_path: string = core.getInput('output_path')
    // fta options
    const format: string = core.getInput('format')
    const json: string = core.getInput('json')
    const output_limit: string = core.getInput('output_limit')
    const score_cap: string = core.getInput('score_cap')
    const include_comments: string = core.getInput('include_comments')
    const exclude_under: string = core.getInput('exclude_under')
    const exclude_directories: string = core.getInput('exclude_directories')
    const exclude_filenames: string = core.getInput('exclude_filenames')
    const extensions: string = core.getInput('extensions')

    // Debug logs are only output if the `ACTIONS_STEP_DEBUG` secret is true
    if (process.env.ACTIONS_STEP_DEBUG === 'true') {
      core.debug(`Input 'project_path' is: ${project_path}`)
      core.debug(`Input 'config_path' is: ${config_path}`)
      core.debug(`Input 'output_path' is: ${output_path}`)
      // fta options
      core.debug(`Input 'format' is: ${format}`)
      core.debug(`Input 'json' is: ${json}`)
      core.debug(`Input 'output_limit' is: ${output_limit}`)
      core.debug(`Input 'score_cap' is: ${score_cap}`)
      core.debug(`Input 'include_comments' is: ${include_comments}`)
      core.debug(`Input 'exclude_under' is: ${exclude_under}`)
      core.debug(`Input 'exclude_directories' is: ${exclude_directories}`)
      core.debug(`Input 'exclude_filenames' is: ${exclude_filenames}`)
      core.debug(`Input 'extensions' is: ${extensions}`)
      // Log the current timestamp, wait, then log the new timestamp
      core.debug(new Date().toTimeString())
    }
    const output = await fta.run(project_path, config_path, output_path, {
      format,
      json,
      outputLimit: output_limit,
      scoreCap: score_cap,
      includeComments: include_comments,
      excludeUnder: exclude_under,
      excludeDirectories: exclude_directories,
      excludeFilenames: exclude_filenames,
      extensions
    })
    if (process.env.ACTIONS_STEP_DEBUG === 'true') {
      core.debug(new Date().toTimeString())
    }

    // Set outputs for other workflow steps to use
    core.setOutput('details', output.details)
    core.setOutput('summary', output.summary)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
