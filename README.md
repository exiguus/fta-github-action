# GitHub Action for FTA (Fast TypeScript Analyzer)

[![GitHub Super-Linter](https://github.com/exiguus/fta-github-action/actions/workflows/linter.yml/badge.svg)](https://github.com/super-linter/super-linter)
![CI](https://github.com/exiguus/fta-github-action/actions/workflows/ci.yml/badge.svg)
[![Check dist/](https://github.com/exiguus/fta-github-action//actions/workflows/check-dist.yml/badge.svg)](https://github.com/exiguus/fta-github-action/actions/workflows/check-dist.yml)
[![CodeQL](https://github.com/exiguus/fta-github-action//actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/exiguus/fta-github-action/actions/workflows/codeql-analysis.yml)
[![Coverage](./badges/coverage.svg)](./badges/coverage.svg)

This action runs FTA (Fast TypeScript Analyzer) on your TypeScript project. It
provides a summary and detailed output of the analysis.

All FTA options are available. Supplying Options from the CLI as well as
Configuration Options from the config file are available as inputs.

## Features

- **Score Cap**: Set a score cap to fail the action if the score is too high
- **Artifact**: Upload the output file as an artifact
- **Excludes**: Exclude directories and filenames from the analysis. Also it is
  possible to exclude files with less than a certain number of lines of code
- **Extensions**: Specify which file extensions to include in the analysis
- **Output Format**: Specify the output format (table, csv, json).
- **Output Limit**: Specify the maximum number of files to include in the table
  output.

## FTA

[FTA (Fast TypeScript Analyzer)](https://ftaproject.dev/) is a super-fast
TypeScript static analysis tool written in Rust. It captures static information
about TypeScript code and generates easy-to-understand analytics that tell you
about complexity and maintainability issues that you may want to address.

## Usage

```yaml
name: Continuous Integration

on:
  pull_request:
  push:
    branches:
      - main
      - 'releases/*'

permissions:
  contents: read

jobs:
  test-typescript:
    name: TypeScript Tests
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        id: checkout
        uses: actions/checkout@v4

      - name: FTA GitHub Action
        id: fta-action
        uses: exiguus/fta-github-action@v0.1.1
        with:
          config_path: fta.config.json

      - name: Print Output Summary
        id: output-summary
        run: echo -e "\nSummary:\n${{ steps.test-action.outputs.summary }}"

      - name: Print Output Details
        id: output-details
        run: echo -e "\nDetails:\n${{ steps.test-action.outputs.details }}"

      - name: Upload Output Summary
        id: upload-output
        uses: actions/upload-artifact@v4
        with:
          name: output
          path: output.json
```

## Inputs

### project_path

Path to the project to analyze

**required**: false

**default**: "src/"

### config_path

Path to config file

**required**: false

### output_path

Path to output file

**required**: false

**default**: "output.json"

### format

Output format (**default**: table) [**default**: table] [possible values: table,
csv, json]

**required**: false

**default**: "table"

### json

Output as JSON

**required**: false

**default**: "false"

### output_limit

Maximum number of files to include in the table output (only applies when using
table output) (**default**: 5000)

**required**: false

**default**: "5000"

### score_cap

Maximum FTA score which will cause FTA to throw (**default**: 1000)

**required**: false

**default**: "1000"

### include_comments

Whether to include code comments when analysing (**default**: false) [possible
values: true, false]

**required**: false

**default**: "false"

### exclude_under

Minimum number of lines of code for files to be included in output
(**default**: 6)

**required**: false

**default**: "6"

### exclude_directories

List of directory paths separated by comma. Representing directories to exclude
from the analysis. Files within any of these directories will be ignored. Paths
can be specified as relative to the project root. The **default**s are always
used; any supplied values are added to the exclusions list.

**required**: false

**default**: "/dist, /bin, /build"

### exclude_filenames

List of glob patterns separated by comma. Representing filenames to exclude from
the analysis. Files matching any of these patterns will be ignored. Globs can
include wildcards and brace expansions. The **default**s are always used; any
supplied values are added to the exclusions list. Exclusions will override
inclusions.

**required**: false

**default**: ".d.ts, .min.js, .bundle.js"

### extensions

List of file extensions separated by comma. Identify files that should be
analyzed. JavaScript files are also accepted. The **default**s are always used;
any supplied values are added to the inclusions list.

**required**: false

**default**: ".js, .jsx, .ts, .tsx"

## Outputs

### summary

Summary of the analysis in table format (also shown in the logs)

Example:

```plaintext
Summary:
┌─────────────────────┬────────────┬─────────────────────────────┬───────────────────┐
│ File                ┆ Num. lines ┆ FTA Score (Lower is better) ┆ Assessment        │
╞═════════════════════╪════════════╪═════════════════════════════╪═══════════════════╡
│ fta/config.test.ts  ┆ 101        ┆ 61.07                       ┆ Needs improvement │
├╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┤
│ fta/options.ts      ┆ 123        ┆ 56.59                       ┆ Could be better   │
├╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┤
│ fta/run.ts          ┆ 80         ┆ 50.91                       ┆ Could be better   │
├╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┤
│ main.ts             ┆ 51         ┆ 50.73                       ┆ Could be better   │
├╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┤
│ fta/config.ts       ┆ 49         ┆ 47.49                       ┆ OK                │
├╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┤
│ fta/run.test.ts     ┆ 106        ┆ 18.86                       ┆ OK                │
├╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┤
│ fta/options.test.ts ┆ 74         ┆ 17.39                       ┆ OK                │
├╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┤
│ fta/output.test.ts  ┆ 26         ┆ 14.05                       ┆ OK                │
├╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┤
│ fta/types.ts        ┆ 64         ┆ 14.05                       ┆ OK                │
├╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┤
│ fta/output.ts       ┆ 11         ┆ 10.81                       ┆ OK                │
└─────────────────────┴────────────┴─────────────────────────────┴───────────────────┘
10 files analyzed in 0.0134s.

```

### details

Details of the analysis in the passed format (also written to the output file)

Example:

```plaintext
Details:
[{file_name:fta/config.test.ts,cyclo:3,halstead:{uniq_operators:10,uniq_operands:80,total_operators:165,total_operands:188,program_length:90,vocabulary_size:353,volume:761.7171935944062,difficulty:34.8936170212766,effort:26579.068031804814,time:1476.614890655823,bugs:0.2539057311981354},line_count:101,fta_score:61.07427570847429,assessment:Needs improvement},{file_name:fta/options.ts,cyclo:15,halstead:{uniq_operators:19,uniq_operands:72,total_operators:194,total_operands:233,program_length:91,vocabulary_size:427,volume:795.1663956254646,difficulty:29.974248927038627,effort:23834.515480893755,time:1324.139748938542,bugs:0.2650554652084882},line_count:123,fta_score:56.58699143860198,assessment:Could be better},{file_name:fta/run.ts,cyclo:16,halstead:{uniq_operators:19,uniq_operands:48,total_operators:123,total_operands:137,program_length:67,vocabulary_size:260,volume:537.4986434729065,difficulty:21.37226277372263,effort:11487.562248822409,time:638.197902712356,bugs:0.1791662144909688},line_count:80,fta_score:50.91457112647857,assessment:Could be better},{file_name:main.ts,cyclo:5,halstead:{uniq_operators:14,uniq_operands:38,total_operators:155,total_operands:142,program_length:52,vocabulary_size:297,volume:427.14459428163985,difficulty:20.6056338028169,effort:8801.585090620269,time:488.9769494789038,bugs:0.1423815314272133},line_count:51,fta_score:50.727278039537374,assessment:Could be better},{file_name:fta/config.ts,cyclo:6,halstead:{uniq_operators:18,uniq_operands:50,total_operators:70,total_operands:85,program_length:68,vocabulary_size:155,volume:494.7764595586481,difficulty:20.58823529411765,effort:10186.574167383933,time:565.9207870768852,bugs:0.16492548651954939},line_count:49,fta_score:47.488590952452135,assessment:OK},{file_name:fta/run.test.ts,cyclo:1,halstead:{uniq_operators:8,uniq_operands:71,total_operators:242,total_operands:231,program_length:79,vocabulary_size:473,volume:701.9700134938122,difficulty:37.19047619047619,effort:26106.59907326987,time:1450.3666151816594,bugs:0.2339900044979374},line_count:106,fta_score:18.86391580126201,assessment:OK},{file_name:fta/options.test.ts,cyclo:1,halstead:{uniq_operators:8,uniq_operands:58,total_operators:130,total_operands:161,program_length:66,vocabulary_size:291,volume:540.2017726319467,difficulty:23.41614906832298,effort:12649.445234921981,time:702.7469574956656,bugs:0.18006725754398223},line_count:74,fta_score:17.386714028825594,assessment:OK},{file_name:fta/output.test.ts,cyclo:1,halstead:{uniq_operators:8,uniq_operands:29,total_operators:49,total_operands:48,program_length:37,vocabulary_size:97,volume:244.19677516092372,difficulty:14.5,effort:3540.853239833394,time:196.714068879633,bugs:0.08139892505364124},line_count:26,fta_score:14.0459047299518,assessment:OK},{file_name:fta/types.ts,cyclo:1,halstead:{uniq_operators:4,uniq_operands:38,total_operators:18,total_operands:79,program_length:42,vocabulary_size:97,volume:277.1963393718594,difficulty:4.329113924050633,effort:1200.0145324705811,time:66.6674740261434,bugs:0.09239877979061979},line_count:64,fta_score:14.0459047299518,assessment:OK},{file_name:fta/output.ts,cyclo:2,halstead:{uniq_operators:9,uniq_operands:14,total_operators:14,total_operands:18,program_length:23,vocabulary_size:32,volume:115.0,difficulty:5.444444444444445,effort:626.1111111111111,time:34.78395061728395,bugs:0.03833333333333333},line_count:11,fta_score:10.80808578629157,assessment:OK}]
```

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available,
see the
[tags on this repository](https://github.com/exiguus/fta-github-action/tags).

## License

The scripts and documentation in this project are released under the
[MIT License](LICENSE)

## References

- [FTA (Fast TypeScript Analyzer)](https://ftaproject.dev/)
- [Create a GitHub Action Using TypeScript](https://github.com/actions/typescript-action)

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of
conduct, and the process for submitting pull requests to us.
