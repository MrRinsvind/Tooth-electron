import PropTypes from 'prop-types'
import React from 'react'
import { Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap'

const propTypes = {
  modalClassName: PropTypes.string,
  title: PropTypes.string,
  show: PropTypes.bool,
  onHide: PropTypes.func,
  ModalComponent: PropTypes.element,
}

export default function ModalWrapper(props) {
  const {
    modalClassName,
    title,
    show,
    onHide,
    component: ModalComponent,
  } = props
  return (
    <Modal isOpen={show} toggle={onHide} className={modalClassName}>
      <ModalComponent {...props} />
    </Modal>
  )
}

ModalWrapper.propTypes = propTypes
