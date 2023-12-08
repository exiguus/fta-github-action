import { ActionOptions, ConfigFileOptions, OptionsMap } from './types';
export declare const TMP_CONFIG_FILE = "tmp-config-file.json";
/**
 * getConfig from a json file and validate it
 * @param {string} config_path
 * @returns {Partial<ActionOptions> | null}
 */
export declare const getConfig: (config_path: string) => Partial<ActionOptions> | null;
/**
 * writeConfig to a json file
 * @param {string} config_path
 * @param {ConfigFileOptions} options
 * @returns {void}
 */
export declare const writeConfig: (config_path: string, options: ConfigFileOptions) => void;
export declare const isActionOptions: (options: unknown) => options is ActionOptions;
export declare const generateConfigFile: (options: OptionsMap) => ConfigFileOptions;
