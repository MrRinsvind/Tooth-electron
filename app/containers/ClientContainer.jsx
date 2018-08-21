import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { getSingleClient, editClient, editTeeth } from '../actions/clients'
import Client from '../views/Client'
import { get } from 'lodash'
import { toast } from 'react-toastify'
class ClientContainer extends Component{
  constructor(props){
    super(props)
    this.state = {
      updated: moment(),
      name: '',
      surname: '',
      second_name: '',
      born: moment(),
      phone: '',
      address: '',
      error: {},
      diagnosis: '',
      editInfo: false,
      editTeeth: false,
      history:[]
    }
  }
  componentWillReceiveProps(nextProps, nextState) {
    this.setState({
      name: get(nextProps, 'client.name'),
      surname: get(nextProps, 'client.surname'),
      second_name: get(nextProps, 'client.second_name'),
      phone: get(nextProps, 'client.phone'),
      diagnosis: get(nextProps, 'client.diagnosis'),
      born: moment(get(nextProps, 'client.born')),
      address: get(nextProps, 'client.address'),
      teeth: get(nextProps, 'client.teeth'),
      history: get(nextProps, 'client.history'),
    })
  }
  componentDidMount(){
    this.props.getSingleClient(this.props.match.params.id)
  }
  inputChange = (type) => (ev) => {
    this.setState({
      [type]: ev.target.value,
    })
  }
  teethChange= (type) => (ev) => {
    this.setState({
      teeth: {
        ...this.state.teeth,
        [type]: ev.target.value
      },
    })
  }
  toggleEdit = () => {
    this.setState({ editInfo: !this.state.editInfo })
  }
  toggleEditTeeth = () => {
    this.setState({ editTeeth: !this.state.editTeeth })
  }
  getClasses = (type) =>{
    if(this.state.error[type]){
      return "is-invalid"
    }
    return ''
  }
  dateChange = (type) => (date) => {
    this.setState({
      [type]: date,
    })
  }
  submitEditTeeth = async () =>{
    const { teeth } = this.state
    await this.props.editTeeth(teeth, this.props.match.params.id)
    toast.success('Зубы отредактированы', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      draggablePercent: 80,
    })
    await this.props.getSingleClient(this.props.match.params.id)

    this.setState({
      editTeeth: false,
    })
  }
  submitEdit = async () =>{
    let error = {}
    const { name, surname, second_name, phone, born, diagnosis } = this.state
    if(name === '') {
      error.name = true
    }
    if(surname === '') {
      error.surname = true
    }
    if(second_name === '') {
      error.second_name = true
    }
    if(phone === '') {
      error.phone = true
    }
    if(diagnosis === '') {
      error.diagnosis = true
    }
    if(born === '') {
      error.born = true
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
      await this.props.editClient({
        name, surname, second_name, phone, born, diagnosis, update: moment(),
      }, this.props.match.params.id)
      toast.success('Клиент отредактирован', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        draggablePercent: 80,
      })
      await this.props.getSingleClient(this.props.match.params.id)

      this.setState({
        editInfo: false,
      })
    }
  }
  render(){
    return(
      <div>
        { this.props.client &&
          <Client
            submitEditTeeth={this.submitEditTeeth}
            toggleEditTeeth={this.toggleEditTeeth}
            teethChange={this.teethChange}
            state={this.state}
            inputChange={this.inputChange}
            getClasses={this.getClasses}
            client={this.props.client}
            dateChange={this.dateChange}
            toggleEdit={this.toggleEdit}
            submitEdit={this.submitEdit}
            match={this.props.match}
            getSingleClient={this.props.getSingleClient}
          />
        }
      </div>
    )
  }
}

export default connect((store)=>({client:store.clients.activeClient, reinit:store.clients.reinit}),({ getSingleClient, editClient, editTeeth }))(ClientContainer)