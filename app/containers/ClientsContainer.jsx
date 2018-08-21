import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Clients from '../views/Clients'
import { reinitActiveClient } from '../actions/clients'
import { setFilters, resetFilers } from '../actions/filters'
import { get } from 'lodash'

class ClientsContainer extends Component{
  componentDidMount(){
    this.props.reinitActiveClient()
    this.props.resetFilers()
  }
  componentWillReceiveProps(nextProps, nextState) {
    this.setState({
      searchField: get(nextProps, 'filter'),
    })
  }
  state = {
    searchField: '',
  }
  changeField = (ev) => {
    this.props.setFilters(ev.target.value)
    this.setState({
      searchField: ev.target.value
    })
  }
  render() {
    return (
      <Fragment>
        { !this.props.clients || this.props.loading &&
          <h2>loading</h2>
        }
        { this.props.clients && !this.props.loading &&
          <Clients
            searchField = { this.state.searchField }
            clients={this.props.clients}
            changeField={this.changeField}
          />
        }
      </Fragment>
    )
  }
}

export default connect((state) => {

  let clients =  {...state.clients}
  let filters = state.filters.searchField
  let newData = [ ...state.clients.data ]
  if(filters){
    newData = clients.data.filter( client => {
      return (
        client.name.toLowerCase().indexOf(filters) !== -1
        ||  client.surname.toLowerCase().indexOf(filters) !== -1
        ||  client.second_name.toLowerCase().indexOf(filters) !== -1
    )})
  }
  console.log(clients.data)
  return ({ clients:{
    ...clients,
    data: newData,
    filter: filters,
  } })
}, { reinitActiveClient, setFilters, resetFilers })(ClientsContainer)