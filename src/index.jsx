import React from 'react'

let lastId = 0
export default function nextId () {
  lastId += 1
  return `id-${lastId}`
}

/*
  put it on root of the app to reset id on each app render.
  (otherwise server would keep increasing it with each request
  and cause client-server markup mismatch)
*/
export const ResetHtmlIdGenerator = class extends React.Component {
  componentWillMount () {
    lastId = 0
  }

  render () {
    return null
  }
}
