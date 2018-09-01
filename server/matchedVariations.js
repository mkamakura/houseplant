import { get, isArray, isObjectLike, isEmpty } from 'lodash/fp'
import isSubset from './isSubset'

const { entries } = Object

function requestParams(ctx) {
  const params = get('request.body')(ctx)
  return isObjectLike(params) && !isEmpty(params) ? params : ctx.query
}

function matchedHeaders(ctx) {
  return ([key, val]) => isSubset(val, get(`headers.${key.toLowerCase()}`)(ctx))
}

function matchedParams(ctx) {
  return ([key, val]) => isSubset(val, get(key)(requestParams(ctx)))
}

function hasMatchedVariations(variations, ctx) {
  return variations.filter(({ matcher }) => {
    if (!matcher) return false

    const headers = get('headers')(matcher) || {}
    if (entries(headers).some(matchedHeaders(ctx))) return true

    const params = get('params')(matcher) || {}
    if (entries(params).some(matchedParams(ctx))) return true
    return false
  })
}

export default (variations = [], ctx) =>
  hasMatchedVariations(variations, ctx).shift()
