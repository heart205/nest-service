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
