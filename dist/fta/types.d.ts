/**
 * CLI Options
 * Configuration Options, set via `fta.json`
 * See: v1.0.0 https://github.com/sgb-io/fta-website/commit/01e8e0bcef53db1629c62e45159b0ae918093bfe
 * See: general https://ftaproject.dev/docs/configuration#configuration-options
 * | Option                | Equivalent CLI argument |
 * | --------------------- | ----------------------- |
 * | `output_limit`        | `--output-limit`        |
 * | `score_cap`           | `--score-cap`           |
 * | `include_comments`    | `--include-comments`    |
 * | `exclude_under`       | `--exclude-under`       |
 * | `extensions`          | N/A                     |
 * | `exclude_filenames`   | N/A                     |
 * | `exclude_directories` | N/A                     |
 **/
declare enum FTA_CLIOptions {
    configPath = "config-path",
    format = "format",
    json = "json",
    outputLimit = "output-limit",
    scoreCap = "score-cap",
    includeComments = "include-comments",
    excludeUnder = "exclude-under"
}
export declare enum FTA_ConfigFileOptions {
    outputLimit = "output_limit",
    scoreCap = "score_cap",
    includeComments = "include_comments",
    excludeUnder = "exclude_under",
    excludeDirectories = "exclude_directories",
    excludeFilenames = "exclude_filenames",
    extensions = "extensions"
}
/**
 * Action
 **/
export type ActionOptions = Record<keyof typeof FTA_CLIOptions | keyof typeof FTA_ConfigFileOptions, string | undefined>;
export type ActionInput = {
    filePath: string;
    configPath: string;
    outputPath: string;
} & Record<keyof typeof FTA_CLIOptions | keyof typeof FTA_ConfigFileOptions, string>;
export type ActionOutput = {
    details: string;
    summary: string;
};
export declare enum Formats {
    table = "table",
    csv = "csv",
    json = "json"
}
export type OptionsMap = {
    format: keyof typeof Formats;
    json: boolean;
    outputLimit: number;
    scoreCap: number;
    includeComments: boolean;
    excludeUnder: number;
    excludeDirectories: string[];
    excludeFilenames: string[];
    extensions: string[];
};
export type Options = Record<keyof OptionsMap, OptionsMap[keyof OptionsMap]>;
export type CLIOptions = {
    configPath: string;
    format: Formats;
};
export type ConfigFileOptions = {
    output_limit: number;
    score_cap: number;
    include_comments: boolean;
    exclude_under: number;
    exclude_directories: string[];
    exclude_filenames: string[];
    extensions: string[];
};
export {};
