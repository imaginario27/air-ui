export interface HeaderConfig {
    field: string
    callback?: (value: any) => string
}

export type Headers = Record<string, string | HeaderConfig>