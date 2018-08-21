import { Component } from 'react'
import { Badge } from 'reactstrap'

export default function OrderStatusBadge(props){
  return(
    <Badge color={props.color}>{props.status}</Badge>
  )
}
