export interface DictionaryInterface {
  dictionaryName: string
  dictionaryCode: string
  describe: string
  userId: number | string
}

export type SearchInterface = {
  userId?: number | string
}
