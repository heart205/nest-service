/**
 * getArticleList 获取参数
 */
export type articleBodyParams = {
  userId: number
  status?: number
}

export interface articleDetailsInfo {
  userId: number
  content: string
  title: string
}

export interface articleDetailInfo {
  id: number
}

export interface responseArticleDetail {
  data: HArticleDetails[]
  total: SelectQueryBuilder<HArticleDetails>
}

export type updateArticleInfo = {
  [k in
    | keyof articleDetailInfo
    | keyof articleDetailsInfo]: k extends keyof articleDetailInfo
    ? articleDetailInfo[k]
    : articleDetailsInfo[k]
}
