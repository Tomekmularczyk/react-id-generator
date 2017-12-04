import React from 'react'
import Types from 'prop-types'

let globalPrefix = 'id'
let lastId = 0
export default function nextId (prefix) {
  lastId++
  return `${prefix || globalPrefix}${lastId}`
}

/*
  put it on root of the app to reset id on each app render.
  (otherwise server would keep increasing it with each request
  and cause client-server markup mismatch)
*/
export const ResetHtmlIdGenerator = class extends React.Component {
  componentWillMount () {
    lastId = 0
    if (this.props.globalPrefix) {
      globalPrefix = this.props.globalPrefix
    }
  }

  render () {
    return null
  }
}

ResetHtmlIdGenerator.propTypes = {
  globalPrefix: Types.string
}

ResetHtmlIdGenerator.defaultProps = {
  globalPrefix: null
}
