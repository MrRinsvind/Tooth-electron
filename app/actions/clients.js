import { get } from 'lodash'
import { push } from 'react-router-redux'
import moment from 'moment'
export const GET_CLIENTS = 'GET_CLIENTS'
export const START = 'START'
export const FINISH = 'FINISH'
export const LOADING_CLIENTS = 'LOADING_CLIENTS'
export const GET_INITIAL_CLIENTS = 'GET_INITIAL_CLIENTS'
export const ADD_NEW_CLIENT = 'ADD_NEW_CLIENT'
export const GET_ACTIVE_CLIENT = 'GET_ACTIVE_CLIENT'
export const EDIT_CLIENT_BY_ID = 'EDIT_CLIENT_BY_ID'
export const REINIT_ACTIVE_CLIENTS = 'REINIT_ACTIVE_CLIENTS'
export const ADD_NEW_HOSTORY = 'ADD_NEW_HOSTORY'
export const EDIT_TEETH = 'EDIT_TEETH'
// export function getAllClients() {
//   return {
//     type: GET_CLIENTS,
//   }
// }
function loadingClients(){
  return {
    type: LOADING_CLIENTS,
  }
}


function getInitialClients(data){
  return {
    type: GET_INITIAL_CLIENTS,
    payload: {
      data,
    },
  }
}
function addClient(data){
  return {
    type: ADD_NEW_CLIENT,
    payload: {
      data,
    },
  }
}
function getActiveClient(client){
  return {
    type: GET_ACTIVE_CLIENT,
    payload: {
      client,
    },
  }
}

function editClientById(body, id){
  return {
    type: EDIT_CLIENT_BY_ID,
    payload: {
      body,
      id,
    },
  }
}
function addNewHistoryById(history, id, regular){
  return {
    type: ADD_NEW_HOSTORY,
    payload: {
      history,
      id,
      regular,
    },
  }
}

function editTeethById(teeth, id){
  return {
    type: EDIT_TEETH,
    payload: {
      teeth,
      id,
    },
  }
}
export function reinitActiveClient(){
  return {
    type: REINIT_ACTIVE_CLIENTS,
  }
}
export function getAllClients() {
  return (dispatch, getState) => {
    dispatch(loadingClients())
    const { clients } = getState()
    const clientsFromStorage = localStorage.clients
    if(!clientsFromStorage){
      localStorage.clients = JSON.stringify(clients.data)
      return dispatch(getInitialClients([]))
    }
    return dispatch(getInitialClients(JSON.parse(clientsFromStorage)))
  }
}
export function addNewClient(data){
  return (dispatch, getState) => {
    dispatch(loadingClients())
    const clients = getState().clients.data
    const id = 'z' + clients.length
    const new_client = {
      ...data,
      id,
    }
    localStorage.clients = JSON.stringify([...clients, new_client])
    dispatch(addClient(new_client))
    dispatch(push(`/clients/${id}`))
  }
}

export function getSingleClient(id){
  return (dispatch, getState) => {
    const { clients } = getState()
    if(clients && !clients.loading && clients.init){
      const actualClientId = get(clients, 'activeClient.id')
      if(actualClientId !== id || clients.reinit){
        dispatch(getActiveClient(clients.data.find((client)=> client.id === id)))
      }
    }

  }
}

export function editClient(body, id){
  return (dispatch, getState) => {
    const clients = getState().clients.data.map(client=>{
      if(client.id === id){
        return ({
          ...client, ...body,
        })
      }
      return client
    })
    localStorage.clients = JSON.stringify(clients)
    dispatch(editClientById(body,id))
  }
}

export function addNewHistory(history, id){
  return (dispatch, getState) => {
    let regular
    const clients = getState().clients.data.map(client=>{
      if(client.id === id){
        regular  = client.history.length > 0
        return ({
          ...client, regular, updated: history.date.format(), history: [
            ...client.history, history,
          ],
        })
      }
      return client
    })
    localStorage.clients = JSON.stringify(clients)
    dispatch(addNewHistoryById(history, id, regular))
  }
}

export function editTeeth(teeth, id){
  return (dispatch, getState) => {
    const clients = getState().clients.data.map(client=>{
      if(client.id === id){
        return ({
          ...client, teeth: teeth,
        })
      }
      return client
    })
    localStorage.clients = JSON.stringify(clients)
    dispatch(editTeethById(teeth, id))
  }
}