import React, { Component, Fragment } from 'react'
import { ModalHeader, ModalBody, FormGroup, Col, Label, ModalFooter, Button, Input } from 'reactstrap'
import DatePicker from 'react-datepicker'
import { toast } from 'react-toastify'
import moment from 'moment'
import { connect } from 'react-redux'
import { addNewHistory } from '../actions/clients'
import Select from 'react-select'



class ModalNewHistoryContainer extends Component{
  state = {
    date: moment(),
    heading: '',
    priceText:'',
    text: '',
    price: '',
    error: {},
    select:'',
    priceSave: []
  }
  selectChange = (ev) => {

    this.setState({
      price: +this.state.price + +ev.price,
      priceText: this.state.priceText +`${ev.label}(${ev.q}) - ${ev.price}грн.\n`,
      priceSave: [...this.state.priceSave, ev]
    })
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
  onSubmit = async () => {
    let error = {}
    const { date, heading, text, price } = this.state
    if(date === '') {
      error.date = true
    }
    if(heading === '') {
      error.heading = true
    }
    if(text === '') {
      error.text = true
    }
    if(price === '') {
      error.price = true
    }
    if(Object.keys(error).length > 0) {
      await toast.error('Заполнены не все поля!', {
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
      console.log(this.props)
      await this.props.addNewHistory({ date, heading, text, price, priceText: this.state.priceSave }, this.props.match.params.id)
      await toast.success('Запись успешно добавлена в историю!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        draggablePercent: 80,
      })
      await this.props.getSingleClient(this.props.match.params.id)
      await this.props.onHide()
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
        <ModalHeader toggle={this.props.onHide} >Добавить запись в историю посещений</ModalHeader>
        <ModalBody>
          <FormGroup row className="mt-2 mb-1">
            <Col xs="12">
              <Label>Прайслист:</Label>
              <Select
                name="form-field-name"
                value={this.state.select}
                onChange={this.selectChange}
                options={this.props.price}
                labelKey="label"
                placeholder={'Выберите из прайслиста услугу'}
              />
            </Col>
          </FormGroup>
          <FormGroup row className="mt-2 mb-1">
            <Col xs="12">
              <Label>Заголовок(Диагноз):</Label>
              <Input type="text" name="heading" onChange={this.inputChange('heading')} value={this.state.heading} className={this.getClasses('heading')}/>
            </Col>
          </FormGroup>
          <FormGroup row className="mt-2 mb-1">
            <Col xs="6">
              <Label>Дата Посещения:</Label>
              <DatePicker
                selected={this.state.date}
                onChange={this.dateChange('date')}
                className={'input-custom form-control w-100'}
                dateFormat="DD/MM/YYYY"
              />
            </Col>
            <Col xs="6">
              <Label>Уплачено(грн):</Label>
              <Input type="number" name="price" onChange={this.inputChange('price')} value={this.state.price} className={this.getClasses('price')}/>
            </Col>
          </FormGroup>
          <FormGroup row className="mt-2 mb-1">
            <Col xs="12">
              <Label>Коментарий:</Label>
              <Input
                type="textarea"
                rows="3"
                name="text"
                onChange={this.inputChange('text')}
                value={this.state.text}
                className={this.getClasses('text')}
              />
            </Col>
          </FormGroup>
          <FormGroup row className="mt-2 mb-1">
            <Col xs="12">
              <Label>Итог:</Label>
              <Input
                type="textarea"
                rows="9"
                name="text"
                onChange={()=>{}}
                value={ `По Прайслисту:\n${this.state.priceText}\nКоментарий:\n${this.state.text}`}
                className={this.getClasses('text')}
              />
            </Col>
          </FormGroup>

        </ModalBody>
        <ModalFooter className="border-0">
          <Button onClick={this.props.onHide}>Отмена</Button>
          <Button color='primary' onClick={this.onSubmit}>Добавить запись</Button>
        </ModalFooter>

      </Fragment>
    )
  }
}

export default connect((state)=>({price: state.price.data}), ({ addNewHistory }))(ModalNewHistoryContainer)
