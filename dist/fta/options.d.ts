import { ActionOptions, ConfigFileOptions, OptionsMap } from './types';
export declare const defaultOptions: OptionsMap;
export declare const generateConfigOptions: (options: OptionsMap) => ConfigFileOptions;
export declare const writeConfigFile: (options: ConfigFileOptions) => void;
export declare const mapActionOptions: (options: Partial<ActionOptions>) => OptionsMap;
