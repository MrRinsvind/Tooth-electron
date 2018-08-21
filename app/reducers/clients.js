// @flow
import moment from 'moment'
import { EDIT_TEETH, ADD_NEW_HOSTORY, REINIT_ACTIVE_CLIENTS, GET_ACTIVE_CLIENT, EDIT_CLIENT_BY_ID, GET_INITIAL_CLIENTS, LOADING_CLIENTS, ADD_NEW_CLIENT } from '../actions/clients'

export type counterStateType = {
  +counter: number
};

type actionType = {
  +type: string
}
const initialState = {
  loading: false,
  currentClient: null,
  init: false,
  data: [],
  activeClient: null,
  reinit: false,
}
export default function clients(state = initialState, action) {
  switch (action.type) {
    case REINIT_ACTIVE_CLIENTS:
      return (
        {
          ...state, reinit: true,
        }
      )
    case LOADING_CLIENTS:
      return (
        {
          ...state, loading: true, init: true,
        }
      )
    case GET_INITIAL_CLIENTS:
      return (
        {
          ...state, data: action.payload.data, loading: false,
        }
      )
    case ADD_NEW_CLIENT:
      return (
        {
          ...state, data: [...state.data, action.payload.data], loading: false,
        }
      )
    case GET_ACTIVE_CLIENT:
      return (
        {
          ...state, activeClient: action.payload.client, loading: false, reinit: false,
        }
      )
    case EDIT_CLIENT_BY_ID:
      const clients = state.data.map((client) => {
        if(client.id === action.payload.id){
          return ({
            ...client, ...action.payload.body,
          })
        }
        return client
      })
      return (
        {
          ...state, data: clients, reinit: true,
        }
      )
    case ADD_NEW_HOSTORY:
      const clients_history = state.data.map((client) => {
        if(client.id === action.payload.id){
          return ({
            ...client, updated: action.payload.history.date.format(), regular:  action.payload.regular, history:[
              ...client.history, action.payload.history,
            ],
          })
        }
        return client
      })
      return (
        {
          ...state, data: clients_history, reinit: true,
        }
      )
    case EDIT_TEETH:
      const clients_teeth = state.data.map((client) => {
        if(client.id === action.payload.id){
          return ({
            ...client, teeth: action.payload.teeth,
          })
        }
        return client
      })
      return (
        {
          ...state, data: clients_teeth, reinit: true,
        }
      )
    default:
      return state
  }
}
