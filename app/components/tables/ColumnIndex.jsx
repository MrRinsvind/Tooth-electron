import Column from './Column'
import { get } from 'lodash'
import React from 'react'

export default function ColumnIndex(props) {
  let startFrom = Number(get(props, 'list.filters.data.offset', 0))

  return <Column
    {...props}
    title="#"
    width="70px"
    format={()=> startFrom + Number(props.index) + 1}
  />
}
