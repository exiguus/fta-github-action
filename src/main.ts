import * as core from '@actions/core'
import * as fta from './fta'
/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const file_path: string = core.getInput('file_path') || '../src/'

    // Debug logs are only output if the `ACTIONS_STEP_DEBUG` secret is true
    core.debug(`Input 'file_path' is: ${file_path}`)

    // Log the current timestamp, wait, then log the new timestamp
    core.debug(new Date().toTimeString())
    const output = await fta.run(file_path)
    core.debug(new Date().toTimeString())

    // Set outputs for other workflow steps to use
    core.setOutput('details', output.details)
    core.setOutput('summary', output.summary)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
