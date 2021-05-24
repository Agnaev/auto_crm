import { deepClone } from './deepClone.js'

export const indexer = (list, id = '_id') => list
  ?.reduce(
    (res, item) => Object.assign(res, {
      [item[id]]: deepClone(item)
    }),
    {}
  )
