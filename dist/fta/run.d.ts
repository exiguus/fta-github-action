import { ActionOptions, ActionOutput } from './types';
/**
 * Run Fast TypeScript Analysis (FTA) on a file
 * @description wrap the fta-cli package to run the fta command
 * @param {string} project_path - path to the file to analyze
 * @param {string} config_path - path to the config file
 * @param {string} output_path - path to the output file
 * @param {Partial<ActionOptions>} options - options to override the config file
 * @returns {Promise<ActionOutput>} - the output of the fta command
 **/
export declare function run(project_path?: string, config_path?: string, output_path?: string, options?: Partial<ActionOptions> | null): Promise<ActionOutput>;
