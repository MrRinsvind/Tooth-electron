import React, { Component, Fragment } from 'react'
import { ModalHeader, ModalBody, FormGroup, Col, Label, ModalFooter, Button, Input } from 'reactstrap'
import DatePicker from 'react-datepicker'
import { toast } from 'react-toastify'
import moment from 'moment'
import NumberFormat from 'react-number-format'
import { connect } from 'react-redux'
import { addNewClient } from '../actions/clients'


class ModalNewClientsContainer extends Component{
  state = {
    updated: moment(),
    name: '',
    surname: '',
    second_name: '',
    born: moment(),
    phone: '',
    address: '',
    error: {},
  }
  inputChange = (type) => (ev) => {
    this.setState({
      [type]: ev.target.value,
    })
  }
  dateChange = (type) => (date) => {
    this.setState({
      [type]: date,
    })
  }
  onSubmit = () => {
    let error = {}
    if(this.state.name === '') {
      error.name = true
    }
    if(this.state.surname === '') {
      error.surname = true
    }
    if(this.state.second_name === '') {
      error.second_name = true
    }
    if(this.state.phone === '') {
      error.phone = true
    }
    if(Object.keys(error).length > 0) {
      toast.error('Заполнены не все поля!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        draggablePercent: 80,
      })
      this.setState({ error })
    } else {
      this.props.addNewClient({...this.state, history:[], regular: false, teeth:{
        tr8: null,
        tr7: null,
        tr6: null,
        tr5: null,
        tr4: null,
        tr3: null,
        tr2: null,
        tr1: null,
        tl1: null,
        tl2: null,
        tl3: null,
        tl4: null,
        tl5: null,
        tl6: null,
        tl7: null,
        tl8: null,
        br8: null,
        br7: null,
        br6: null,
        br5: null,
        br4: null,
        br3: null,
        br2: null,
        br1: null,
        bl1: null,
        bl2: null,
        bl3: null,
        bl4: null,
        bl5: null,
        bl6: null,
        bl7: null,
        bl8: null,
      },})
      toast.success('Клиент успешно добавлен!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        draggablePercent: 80,
      })
      this.props.onHide()
    }
  }
  getClasses = (type) =>{
    if(this.state.error[type]){
      return "is-invalid"
    }
    return ''
  }
  render(){
    return(
      <Fragment>
        <ModalHeader toggle={this.props.onHide} >Добавить клиента</ModalHeader>
        <ModalBody>
          <FormGroup row className="mt-2 mb-1">
            <Col xs="6">
              <Label>Имя:</Label>
              <Input type="text" name="name" onChange={this.inputChange('name')} value={this.state.name} className={this.getClasses('name')}/>
            </Col>
            <Col xs="6">
              <Label>Фамилия:</Label>
              <Input type="text" name="surname" onChange={this.inputChange('surname')} value={this.state.surname} className={this.getClasses('surname')}/>
            </Col>
          </FormGroup>
          <FormGroup row className="mt-2 mb-1">
            <Col xs="6">
              <Label>Отчество:</Label>
              <Input type="text" name="second_name" onChange={this.inputChange('second_name')} value={this.state.second_name} className={this.getClasses('second_name')}/>
            </Col>
            <Col xs="6">
              <Label>Телефон:</Label>
              <NumberFormat
                name="phone"
                customInput={Input}
                format="(###) ### ####"
                type="tel"
                onChange={this.inputChange('phone')}
                className={this.getClasses('phone')}
              />
            </Col>
          </FormGroup>
          <FormGroup row className="mt-2 mb-1">
            <Col xs="6">
              <Label>Дата Рождения:</Label>
              <DatePicker
                selected={this.state.born}
                onChange={this.dateChange('born')}
                className={'input-custom form-control w-100'}
                dateFormat="DD/MM/YYYY"
              />
            </Col>
            <Col xs="6">
              <Label>Дата Прийома:</Label>
              <DatePicker
                selected={this.state.updated}
                onChange={this.dateChange('updated')}
                className={'input-custom form-control w-100'}
                dateFormat="DD/MM/YYYY"
              />
            </Col>
          </FormGroup>
          <FormGroup row className="mt-2 mb-1">
            <Col xs="12">
              <Label>Адрес:</Label>
              <Input type="text" name="address" onChange={this.inputChange('address')} value={this.state.address}/>
            </Col>
          </FormGroup>
        </ModalBody>
        <ModalFooter className="border-0">
          <Button onClick={this.props.onHide}>Отмена</Button>
          <Button color='primary' onClick={this.onSubmit}>Добавить клиента</Button>
        </ModalFooter>

      </Fragment>
    )
  }
}

export default connect(null, ({ addNewClient }))(ModalNewClientsContainer)
