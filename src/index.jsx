import React from 'react'

let globalPrefix = 'id'
let lastId = 0
export default function nextId (localPrefix) {
  lastId++
  return `${localPrefix || globalPrefix}${lastId}`
}

/*
  put it on root of the app to reset id on each app render.
  (otherwise server would keep increasing it with each request
  and cause client-server markup mismatch)
*/
export const ResetHtmlIdGenerator = class extends React.Component {
  constructor (props) {
    super(props)
    lastId = 0
    if (props.prefix) {
      if (typeof props.prefix !== 'string') throw new Error('prefix should be of string type')
      globalPrefix = props.prefix
    }
  }

  render () {
    return null
  }
}
