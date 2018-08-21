import React, { Component } from 'react'
import { Table as BSTable } from 'reactstrap'


export default class Table extends Component {
  constructor(props) {
    super(props)

    this.state = {
      columns: this.configure(props.children),
    }
  }

  // TODO this allows to reconfigure table on the fly
  componentWillReceiveProps(nextProps) {
    this.setState({
      columns: this.configure(nextProps.children)
    })
  }

  configure(children) {
    let columns = children.map(child => {
      return {
        type: child.type,
        ...child.props,
      }
    })

    return columns
  }

  makeTitles() {
    let columns = this.state.columns

    return columns.map(({type: Type, ...props}, index) => (
      <Type
        key={index}
        isTitle={true}
        list={this.props.list}
        {...props}
      />
    ))
  }

  makeRow = (item, index) => {
    let columns = this.state.columns
    let rowClassName = this.props.rowClassName || function() { return ''}

    return (
      <tr key={index} className={rowClassName(item)}>
        {columns.map(({type: Type, ...props}, i) => (
          <Type
            key={i}
            item={item}
            index={index}
            list={this.props.list}
            {...props}
          />
        ))}
      </tr>
    )
  }

  render() {
    let { list, rowClassName, ...restProps } = this.props
    let titles = this.makeTitles()
    return (
      <BSTable {...restProps}  style={{tableLayout: 'fixed', minWidth:700}}>
        <thead>
          <tr>
            { titles }
          </tr>
        </thead>
        <tbody className={'td-hidden'}>
          {list.results.map(this.makeRow)}
        </tbody>
      </BSTable>
    )
  }
}
