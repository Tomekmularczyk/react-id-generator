import React from 'react'
import Types from 'prop-types'

let globalPrefix = 'id'
let lastId = 0
export default function nextId(localPrefix) {
  lastId++
  return `${localPrefix || globalPrefix}${lastId}`
}

/*
  put it on root of the app to reset id on each app render.
  (otherwise server would keep increasing it with each request
  and cause client-server markup mismatch)
*/
export const ResetHtmlIdGenerator = class extends React.Component {
  constructor(props) {
    super(props)
    lastId = 0
    if (this.props.prefix) {
      globalPrefix = this.props.prefix
    }
  }

  render() {
    return null
  }
}

ResetHtmlIdGenerator.propTypes = {
  prefix: Types.string
}

ResetHtmlIdGenerator.defaultProps = {
  prefix: null
}
