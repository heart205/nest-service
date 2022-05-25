export interface DictionaryInterface {
  dictionaryName: string
  dictionaryCode: string
  describe: string
  userId: number | string
}

// 判断是谁创建的字典
export type SearchInterface = {
  userId?: number | string
}

export type dictionaryDetail = {
  id: number
}
