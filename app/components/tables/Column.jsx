import React, { Component } from 'react'
import { get } from 'lodash'
// import { Icon } from 'shared/widgets'


export default function Column(props) {
  let {
    isTitle,
    title,
    orderable,
    format,
    field,
    orderingField = field,
    item,
    index,
    align = 'left',
    width,
    list,
    className,
  } = props

  className = `${className || ''} text-${align}`
  let style = {width}

  if(isTitle) {
    let order
    let orderBy
    let direction = 'asc'

    if(orderable) { // TODO optimization
      orderBy = list.filters.data.ordering || 'index'
      if(orderBy[0] == '-') {
        direction = 'desc'
        orderBy = orderBy.substr(1)
      }
      if(orderBy === orderingField) {
        order = (
          <i className={`icon-order-by-${direction}`} />
        )
      }

      className += ' orderable'
    }

    function reorder() {
      if(orderable && list.filters.orderBy) {
        let prefix = orderable === 'desc' ? '-' : ''
        if(orderBy === orderingField) {
          prefix = direction === 'asc' ? '-' : ''
        }
        list.filters.orderBy(`${prefix}${orderingField}`)
      }
    }

    return (
      <th style={style} className={className + ' th--sort'} onClick={reorder}>
        {title}
        {order}
        <i className="table-filter"/>
      </th>
    )
  }

  if(!format) {
    format = (value) => value
  }

  let printedValue = get(item, field)

  if(format.prototype instanceof Component) {
    const FormatTag = format;
    printedValue = <FormatTag>{printedValue}</FormatTag>
  } else {
    printedValue = format(printedValue, item, {index, field})
  }

  return (
    <td className={className + ''}>
      {printedValue}
    </td>
  )
}
