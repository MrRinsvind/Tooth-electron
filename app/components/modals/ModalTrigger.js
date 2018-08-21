import PropTypes from 'prop-types'
import React, { PureComponent, Children, cloneElement } from 'react'

import ModalWrapper from './ModalWrapper'

const propTypes = {
  children: PropTypes.object,
}

export default class ModalTrigger extends PureComponent {
  state = {
    toggled: false,
  }

  open = (e) => {
    e.stopPropagation()
    e.preventDefault()
    this.setState({ toggled: true })
  }

  close = () =>{
    this.setState({ toggled: false })
  }
  render() {
    const { children, ...restProps } = this.props

    // ensure that we have only one child (control element)
    let child = cloneElement(Children.only(children), { onClick: this.open, key: 'modal-control' })
    return [
      child,
      <ModalWrapper {...restProps} show={this.state.toggled} onHide={this.close} key='modal-dialog' />,
    ]
  }
}

ModalTrigger.propTypes = propTypes
