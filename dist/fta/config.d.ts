import { ActionOptions, ConfigFileOptions, OptionsMap } from './types';
export declare const getConfig: (config_path: string) => Partial<ActionOptions> | null;
export declare const writeConfig: (options: ConfigFileOptions) => void;
export declare const isActionOptions: (options: unknown) => options is ActionOptions;
export declare const generateConfigFile: (options: OptionsMap) => ConfigFileOptions;
