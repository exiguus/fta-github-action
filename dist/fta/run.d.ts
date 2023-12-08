import { ActionOptions, ActionOutput } from './types';
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
export declare function run(file_path?: string, config_path?: string, options?: Partial<ActionOptions> | null): Promise<ActionOutput>;
