export type SearchTerm = {
  term?: string | string[]
}

export type SearchObjectsArg = {
  url: string,
  params: {
    term: string
    page?: number
  }
}
