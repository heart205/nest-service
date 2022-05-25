interface pageNationRequest {
  pageSize: number
  offset: number
}

export type pageNationMerge<T extends Record<string | number, unknown>> = {
  [k in keyof T | keyof pageNationRequest]: k extends keyof pageNationRequest
    ? pageNationRequest[k]
    : T[k]
}

type a = pageNationMerge<articleBodyParams>

type dateMergeTotal<T, U extends number = number> = {
  list: T
  total: U
}

type mergeObj<
  T extends Record<Extract<keyof any, string>, unknown>,
  U extends Record<Extract<keyof any, string>, unknown>,
> = {
  [k in keyof T | keyof U]: k extends keyof T
    ? T[k]
    : k extends keyof U
    ? U[k]
    : never
}
