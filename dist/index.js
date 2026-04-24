/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 6947:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateConfigFile = exports.isActionOptions = exports.writeConfig = exports.getConfig = exports.TMP_CONFIG_FILE = void 0;
const fs_1 = __importDefault(__nccwpck_require__(9896));
const path_1 = __importDefault(__nccwpck_require__(6928));
const types_1 = __nccwpck_require__(9820);
exports.TMP_CONFIG_FILE = 'tmp-config-file.json';
/**
 * getConfig from a json file and validate it
 * @param {string} config_path
 * @returns {Partial<ActionOptions> | null}
 */
const getConfig = (config_path) => {
    try {
        const config = JSON.parse(fs_1.default.readFileSync(path_1.default.join(process.env.GITHUB_WORKSPACE || '', config_path), 'utf8'));
        return (0, exports.isActionOptions)(config) ? config : null;
    }
    catch (error) {
        throw new Error('Param `config_path` is not a valid json file');
    }
};
exports.getConfig = getConfig;
/**
 * writeConfig to a json file
 * @param {string} config_path
 * @param {ConfigFileOptions} options
 * @returns {void}
 */
const writeConfig = (config_path, options) => {
    try {
        fs_1.default.writeFileSync(path_1.default.join(process.env.GITHUB_WORKSPACE || '', config_path), JSON.stringify(options, null, 2), { encoding: 'utf8' });
    }
    catch (error) {
        throw new Error('Error writing config file');
    }
};
exports.writeConfig = writeConfig;
// ConfigFileOptions is a subset of ActionOptions
const isActionOptions = (options) => {
    if (typeof options !== 'object' || options === null)
        return false;
    const actionOptions = Object.values(types_1.FTA_ConfigFileOptions);
    return actionOptions.every(option => option in options);
};
exports.isActionOptions = isActionOptions;
const generateConfigFile = (options) => ({
    output_limit: options.outputLimit,
    score_cap: options.scoreCap,
    include_comments: options.includeComments,
    exclude_under: options.excludeUnder,
    exclude_directories: options.excludeDirectories,
    exclude_filenames: options.excludeFilenames,
    extensions: options.extensions
});
exports.generateConfigFile = generateConfigFile;


/***/ }),

/***/ 5145:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__nccwpck_require__(5392), exports);


/***/ }),

/***/ 4699:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.convertSuccessLog = exports.convertFailLog = exports.convertOptionToNumber = exports.convertOptionToBoolean = exports.convertOptionToArray = exports.convertOptionToFormat = exports.mapActionOptions = exports.defaultOptions = exports.defaultInput = void 0;
const types_1 = __nccwpck_require__(9820);
exports.defaultInput = {
    projectPath: '/src/',
    configPath: '',
    outputPath: 'output.json',
    format: 'json',
    json: 'false',
    outputLimit: '5000',
    scoreCap: '1000',
    includeComments: 'false',
    excludeUnder: '6',
    excludeDirectories: '/dist, /bin, /build',
    excludeFilenames: '.d.ts, .min.js, .bundle.js',
    extensions: '.js, .jsx, .ts, .tsx'
};
// Use the defaults from FTA
// See: https://github.com/sgb-io/fta-website/blob/main/pages/docs/configuration.mdx
exports.defaultOptions = {
    format: types_1.Formats.json,
    json: false,
    outputLimit: 5000,
    scoreCap: 1000,
    includeComments: false,
    excludeUnder: 6,
    excludeDirectories: ['/dist', '/bin', '/build'],
    excludeFilenames: ['.d.ts', '.min.js', '.bundle.js'],
    extensions: ['.js', '.jsx', '.ts', '.tsx']
};
const mapActionOptions = (options) => ({
    format: (0, exports.convertOptionToFormat)('format', options.format),
    json: (0, exports.convertOptionToBoolean)('json', options.json),
    outputLimit: (0, exports.convertOptionToNumber)('outputLimit', options.outputLimit),
    scoreCap: (0, exports.convertOptionToNumber)('scoreCap', options.scoreCap),
    includeComments: (0, exports.convertOptionToBoolean)('includeComments', options.includeComments),
    excludeUnder: (0, exports.convertOptionToNumber)('excludeUnder', options.excludeUnder),
    excludeDirectories: (0, exports.convertOptionToArray)('excludeDirectories', options.excludeDirectories),
    excludeFilenames: (0, exports.convertOptionToArray)('excludeFilenames', options.excludeFilenames),
    extensions: (0, exports.convertOptionToArray)('extensions', options.extensions)
});
exports.mapActionOptions = mapActionOptions;
const isOptionFormat = (value) => typeof value === 'string' && Object.values(types_1.Formats).includes(value);
const isOptionNumber = (value) => typeof value === 'string' && !isNaN(Number(value));
const isOptionBoolean = (value) => typeof value === 'string' && (value === 'true' || value === 'false');
const isOptionArray = (value) => typeof value === 'string' && Array.isArray(value.split(','));
const convertOptionToFormat = (key, value) => {
    if (!value || !isOptionFormat(value)) {
        (0, exports.convertFailLog)(key, 'format', value);
        return exports.defaultOptions[key];
    }
    (0, exports.convertSuccessLog)(key, value);
    return value;
};
exports.convertOptionToFormat = convertOptionToFormat;
const convertOptionToArray = (key, value) => {
    if (!value || !isOptionArray(value)) {
        (0, exports.convertFailLog)(key, 'array', value);
        return exports.defaultOptions[key];
    }
    (0, exports.convertSuccessLog)(key, value);
    return value.split(',');
};
exports.convertOptionToArray = convertOptionToArray;
const convertOptionToBoolean = (key, value) => {
    if (!value || !isOptionBoolean(value)) {
        (0, exports.convertFailLog)(key, 'boolean', value);
        return exports.defaultOptions[key];
    }
    (0, exports.convertSuccessLog)(key, value);
    return value === 'true';
};
exports.convertOptionToBoolean = convertOptionToBoolean;
const convertOptionToNumber = (key, value) => {
    if (!value || !isOptionNumber(value)) {
        (0, exports.convertFailLog)(key, 'number', value);
        return exports.defaultOptions[key];
    }
    (0, exports.convertSuccessLog)(key, value);
    return Number(value);
};
exports.convertOptionToNumber = convertOptionToNumber;
const convertFailLog = (key, expect, value) => {
    if (value)
        console.warn(`Option: '${key}' - Expected a ${expect} but received '${value}'`);
    console.info(`Option: '${key}' - Using default value '${JSON.stringify(exports.defaultInput[key])}'`);
};
exports.convertFailLog = convertFailLog;
const convertSuccessLog = (key, value) => {
    console.info(`Option: '${key}' - Using configured value '${JSON.stringify(value)}'`);
};
exports.convertSuccessLog = convertSuccessLog;


/***/ }),

/***/ 5336:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.writeOutput = void 0;
const fs_1 = __importDefault(__nccwpck_require__(9896));
const path_1 = __importDefault(__nccwpck_require__(6928));
const writeOutput = (output_path, data) => {
    try {
        fs_1.default.writeFileSync(path_1.default.join(process.env.GITHUB_WORKSPACE || '', output_path), data, {
            encoding: 'utf8'
        });
    }
    catch (error) {
        throw new Error('Error writing output file');
    }
};
exports.writeOutput = writeOutput;


/***/ }),

/***/ 5392:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.run = run;
const fs_1 = __importDefault(__nccwpck_require__(9896));
const path_1 = __importDefault(__nccwpck_require__(6928));
const child_process_1 = __nccwpck_require__(5317);
const options_1 = __nccwpck_require__(4699);
const config_1 = __nccwpck_require__(6947);
const output_1 = __nccwpck_require__(5336);
/**
 * Run Fast TypeScript Analysis (FTA) on a file
 * @description wrap the fta-cli package to run the fta command
 * @param {string} project_path - path to the file to analyze
 * @param {string} config_path - path to the config file
 * @param {string} output_path - path to the output file
 * @param {Partial<ActionOptions>} options - options to override the config file
 * @returns {Promise<ActionOutput>} - the output of the fta command
 **/
async function run(project_path, config_path, output_path, options = null) {
    if (!project_path) {
        project_path = options_1.defaultInput.projectPath;
    }
    if (!config_path) {
        config_path = options_1.defaultInput.configPath;
    }
    if (!output_path) {
        output_path = options_1.defaultInput.outputPath;
    }
    if (!fs_1.default.existsSync(path_1.default.join(process.env.GITHUB_WORKSPACE || '', project_path)))
        throw new Error('Param `project_path` does not exist');
    // use --format over --json shorthand fta cli cmd
    if (options?.json && options?.format !== 'json') {
        options.format = 'json';
        options.json = 'false';
    }
    // map options from github action, config_path and defaults
    // if config_path is provided, use it and override with options
    //  if not, use options or defaultOptions
    let mappedOptions;
    if (config_path.length > 0) {
        // throw if config path does not exist
        try {
            fs_1.default.existsSync(path_1.default.join(process.env.GITHUB_WORKSPACE || '', config_path));
        }
        catch (error) {
            throw new Error('Param `config_path` does not exist');
        }
        // throw if config path is not a file
        try {
            if (path_1.default.extname(config_path) !== '.json')
                throw new Error('Param `config_path` is not a json file');
        }
        catch (error) {
            throw new Error('Param `config_path` is not a json file');
        }
        try {
            if (!fs_1.default
                .lstatSync(path_1.default.join(process.env.GITHUB_WORKSPACE || '', config_path))
                .isFile())
                throw new Error('Param `config_path` is not a file');
        }
        catch (error) {
            throw new Error('Param `config_path` is not a file');
        }
        const config = (0, config_1.getConfig)(config_path);
        mappedOptions = (0, options_1.mapActionOptions)({
            // options have priority over config (like in the cli)
            ...config,
            ...options
        });
    }
    else {
        mappedOptions = options ? (0, options_1.mapActionOptions)(options) : options_1.defaultOptions;
    }
    const configFileOptions = (0, config_1.generateConfigFile)(mappedOptions);
    (0, config_1.writeConfig)(config_1.TMP_CONFIG_FILE, configFileOptions);
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
    const configFile = path_1.default.join(process.env.GITHUB_WORKSPACE || '', config_1.TMP_CONFIG_FILE);
    const projectPath = path_1.default.join(process.env.GITHUB_WORKSPACE || '', project_path);
    const details = (0, child_process_1.execSync)(`npm exec --package=fta-cli -c 'fta ${projectPath} --config-path ${configFile} --format ${mappedOptions.format}'`).toString();
    // summary is the output of the fta command with the table format option
    //  to have a quick look at the results
    const summary = (0, child_process_1.execSync)(`npm exec --package=fta-cli -c 'fta ${projectPath} --config-path ${configFile} --format table'`).toString();
    if (output_path) {
        (0, output_1.writeOutput)(output_path, details);
    }
    return { details, summary };
}


/***/ }),

/***/ 9820:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Formats = exports.FTA_ConfigFileOptions = void 0;
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
var _FTA_CLIOptions;
(function (_FTA_CLIOptions) {
    _FTA_CLIOptions["configPath"] = "config-path";
    _FTA_CLIOptions["format"] = "format";
    _FTA_CLIOptions["json"] = "json";
    _FTA_CLIOptions["outputLimit"] = "output-limit";
    _FTA_CLIOptions["scoreCap"] = "score-cap";
    _FTA_CLIOptions["includeComments"] = "include-comments";
    _FTA_CLIOptions["excludeUnder"] = "exclude-under";
})(_FTA_CLIOptions || (_FTA_CLIOptions = {}));
var FTA_ConfigFileOptions;
(function (FTA_ConfigFileOptions) {
    FTA_ConfigFileOptions["outputLimit"] = "output_limit";
    FTA_ConfigFileOptions["scoreCap"] = "score_cap";
    FTA_ConfigFileOptions["includeComments"] = "include_comments";
    FTA_ConfigFileOptions["excludeUnder"] = "exclude_under";
    FTA_ConfigFileOptions["excludeDirectories"] = "exclude_directories";
    FTA_ConfigFileOptions["excludeFilenames"] = "exclude_filenames";
    FTA_ConfigFileOptions["extensions"] = "extensions";
})(FTA_ConfigFileOptions || (exports.FTA_ConfigFileOptions = FTA_ConfigFileOptions = {}));
var Formats;
(function (Formats) {
    Formats["table"] = "table";
    Formats["csv"] = "csv";
    Formats["json"] = "json";
})(Formats || (exports.Formats = Formats = {}));


/***/ }),

/***/ 1730:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.run = run;
const fta = __importStar(__nccwpck_require__(5145));
/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
    const core = await __nccwpck_require__.e(/* import() */ 421).then(__nccwpck_require__.bind(__nccwpck_require__, 6421));
    try {
        const project_path = core.getInput('project_path');
        const config_path = core.getInput('config_path');
        const output_path = core.getInput('output_path');
        // fta options
        const format = core.getInput('format');
        const json = core.getInput('json');
        const output_limit = core.getInput('output_limit');
        const score_cap = core.getInput('score_cap');
        const include_comments = core.getInput('include_comments');
        const exclude_under = core.getInput('exclude_under');
        const exclude_directories = core.getInput('exclude_directories');
        const exclude_filenames = core.getInput('exclude_filenames');
        const extensions = core.getInput('extensions');
        // Debug logs are only output if the `ACTIONS_STEP_DEBUG` secret is true
        if (process.env.ACTIONS_STEP_DEBUG === 'true') {
            core.debug(`Input 'project_path' is: ${project_path}`);
            core.debug(`Input 'config_path' is: ${config_path}`);
            core.debug(`Input 'output_path' is: ${output_path}`);
            // fta options
            core.debug(`Input 'format' is: ${format}`);
            core.debug(`Input 'json' is: ${json}`);
            core.debug(`Input 'output_limit' is: ${output_limit}`);
            core.debug(`Input 'score_cap' is: ${score_cap}`);
            core.debug(`Input 'include_comments' is: ${include_comments}`);
            core.debug(`Input 'exclude_under' is: ${exclude_under}`);
            core.debug(`Input 'exclude_directories' is: ${exclude_directories}`);
            core.debug(`Input 'exclude_filenames' is: ${exclude_filenames}`);
            core.debug(`Input 'extensions' is: ${extensions}`);
            // Log the current timestamp, wait, then log the new timestamp
            core.debug(new Date().toTimeString());
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
        });
        if (process.env.ACTIONS_STEP_DEBUG === 'true') {
            core.debug(new Date().toTimeString());
        }
        // Set outputs for other workflow steps to use
        core.setOutput('details', output.details);
        core.setOutput('summary', output.summary);
    }
    catch (error) {
        // Fail the workflow run if an error occurs
        if (error instanceof Error)
            core.setFailed(error.message);
    }
}


/***/ }),

/***/ 2613:
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ 5317:
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),

/***/ 6982:
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ 4434:
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ 9896:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 8611:
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ 5692:
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ 9278:
/***/ ((module) => {

module.exports = require("net");

/***/ }),

/***/ 4589:
/***/ ((module) => {

module.exports = require("node:assert");

/***/ }),

/***/ 6698:
/***/ ((module) => {

module.exports = require("node:async_hooks");

/***/ }),

/***/ 4573:
/***/ ((module) => {

module.exports = require("node:buffer");

/***/ }),

/***/ 7540:
/***/ ((module) => {

module.exports = require("node:console");

/***/ }),

/***/ 7598:
/***/ ((module) => {

module.exports = require("node:crypto");

/***/ }),

/***/ 3053:
/***/ ((module) => {

module.exports = require("node:diagnostics_channel");

/***/ }),

/***/ 610:
/***/ ((module) => {

module.exports = require("node:dns");

/***/ }),

/***/ 8474:
/***/ ((module) => {

module.exports = require("node:events");

/***/ }),

/***/ 7067:
/***/ ((module) => {

module.exports = require("node:http");

/***/ }),

/***/ 2467:
/***/ ((module) => {

module.exports = require("node:http2");

/***/ }),

/***/ 7030:
/***/ ((module) => {

module.exports = require("node:net");

/***/ }),

/***/ 643:
/***/ ((module) => {

module.exports = require("node:perf_hooks");

/***/ }),

/***/ 1792:
/***/ ((module) => {

module.exports = require("node:querystring");

/***/ }),

/***/ 7075:
/***/ ((module) => {

module.exports = require("node:stream");

/***/ }),

/***/ 1692:
/***/ ((module) => {

module.exports = require("node:tls");

/***/ }),

/***/ 3136:
/***/ ((module) => {

module.exports = require("node:url");

/***/ }),

/***/ 7975:
/***/ ((module) => {

module.exports = require("node:util");

/***/ }),

/***/ 3429:
/***/ ((module) => {

module.exports = require("node:util/types");

/***/ }),

/***/ 5919:
/***/ ((module) => {

module.exports = require("node:worker_threads");

/***/ }),

/***/ 8522:
/***/ ((module) => {

module.exports = require("node:zlib");

/***/ }),

/***/ 857:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 6928:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 3193:
/***/ ((module) => {

module.exports = require("string_decoder");

/***/ }),

/***/ 3557:
/***/ ((module) => {

module.exports = require("timers");

/***/ }),

/***/ 4756:
/***/ ((module) => {

module.exports = require("tls");

/***/ }),

/***/ 9023:
/***/ ((module) => {

module.exports = require("util");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__nccwpck_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__nccwpck_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__nccwpck_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__nccwpck_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__nccwpck_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__nccwpck_require__.o(definition, key) && !__nccwpck_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__nccwpck_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__nccwpck_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__nccwpck_require__.f).reduce((promises, key) => {
/******/ 				__nccwpck_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__nccwpck_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".index.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__nccwpck_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__nccwpck_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/******/ 	/* webpack/runtime/require chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "loaded", otherwise not loaded yet
/******/ 		var installedChunks = {
/******/ 			792: 1
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		var installChunk = (chunk) => {
/******/ 			var moreModules = chunk.modules, chunkIds = chunk.ids, runtime = chunk.runtime;
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__nccwpck_require__.o(moreModules, moduleId)) {
/******/ 					__nccwpck_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__nccwpck_require__);
/******/ 			for(var i = 0; i < chunkIds.length; i++)
/******/ 				installedChunks[chunkIds[i]] = 1;
/******/ 		
/******/ 		};
/******/ 		
/******/ 		// require() chunk loading for javascript
/******/ 		__nccwpck_require__.f.require = (chunkId, promises) => {
/******/ 			// "1" is the signal for "already loaded"
/******/ 			if(!installedChunks[chunkId]) {
/******/ 				if(true) { // all chunks have JS
/******/ 					installChunk(require("./" + __nccwpck_require__.u(chunkId)));
/******/ 				} else installedChunks[chunkId] = 1;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		// no external install chunk
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * The entrypoint for the action.
 */
const main_1 = __nccwpck_require__(1730);
(0, main_1.run)();

})();

module.exports = __webpack_exports__;
/******/ })()
;