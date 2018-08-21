import { Component } from 'react'
import ReactDOM from 'react-dom'

import Column from './Column'


export default class ColumnSelect extends Component {
  componentDidMount() {
    this.update(this.props.list.selectedAll)
  }

  componentWillReceiveProps(props) {
    this.update(props.list.selectedAll)
  }

  update(selectedAll) {
    if(this.checkboxRef) {
      ReactDOM.findDOMNode(this.checkboxRef).indeterminate =
        selectedAll === 'indeterminate'
    }
  }

  render() {
    let { list, isTitle, ...props } = this.props

    let title
    if(isTitle) {
      title = (
        <label className={"form-checkbox " + (list.selectedAll === 'indeterminate' ? 'form-checkbox-indeterminate' : '')}>
          <input
            ref={(ref)=>this.checkboxRef = ref}
            type="checkbox"
            checked={list.selectedAll}
            onChange={list.toggleSelectAll}
          />
          <span/>
        </label>
      )
    }

    return (
      <Column
        {...props}
        isTitle={isTitle}
        title={title}
        align="center"
        width="70px"
        format={(value, item)=>(
          <label className="form-checkbox">
            <input
              type="checkbox"
              checked={item.selected}
              onChange={item.toggleSelect}
            />
            <span/>
          </label>
        )}
      />
    )
  }
}
