declare module 'fta-cli' {
  export interface IConfig {
    json?: boolean
  }
  export function runFta(path: string, config?: IConfig): string
}
