import React, { Component, Fragment } from 'react'
import { ModalHeader, ModalBody, FormGroup, Col, Label, Input } from 'reactstrap'


export default class ModalNewPrice extends Component{


  constructor(props) {
    super(props)
    this.state = {
      price: props.item.price,
      q: '',
      label: '',
      error: {},
    }
  }
  inputChange = (type) => (ev) => {
    this.setState({
      [type]: ev.target.value,
    })
  }
  getClasses = (type) =>{
    if(this.state.error[type]){
      return "is-invalid"
    }
    return ''
  }
 render(){
   console.log('state', this.state)
    return(
      <Fragment>
        <ModalHeader toggle={this.props.onHide} >Изменить прайслист</ModalHeader>
        <ModalBody>
          <FormGroup row className="mt-2 mb-1">
            <Col xs="12">
              <Label>Заголовок:</Label>
              <Input type="text" name="label" onChange={this.inputChange('label')} value={this.state.label} className={this.getClasses('label')}/>
            </Col>
            <Col xs="12">
              <Label>Еденица измерения:</Label>
              <Input type="text" name="q" onChange={this.inputChange('q')} value={this.state.q} className={this.getClasses('q')}/>
            </Col>
            <Col xs="12">
              <Label>Цена за еденицу измерения:</Label>
              <Input type="text" name="label" onChange={this.inputChange('price')} value={this.state.price} className={this.getClasses('price')}/>
            </Col>
          </FormGroup>
        </ModalBody>
      </Fragment>
    )
  }
}

