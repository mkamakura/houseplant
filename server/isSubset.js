import { isArray, isObjectLike } from 'lodash/fp'
const { entries } = Object

export default function isSubset(target, universalSet) {
  if (isArray(target) && isArray(universalSet))
    return (
      target.filter(val => universalSet.find(rv => isSubset(val, rv)))
        .length === target.length
    )
  if (isObjectLike(target) && isObjectLike(universalSet))
    return isSubset(entries(target), entries(universalSet))
  return target === universalSet
}
