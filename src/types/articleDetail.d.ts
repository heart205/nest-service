/**
 * getArticleList 获取参数
 */
export interface articleBodyParams {
  userId: number
}

export interface articleDetailsInfo {
  userId: number
  content: string
  title: string
}

export interface articleDetailInfo {
  id: number
}

export type updateArticleInfo = {
  [k in
    | keyof articleDetailInfo
    | keyof articleDetailsInfo]: k extends keyof articleDetailInfo
    ? articleDetailInfo[k]
    : articleDetailsInfo[k]
}
