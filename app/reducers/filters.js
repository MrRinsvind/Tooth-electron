import { SET_FILTERS, RESET_FILTERS } from '../actions/filters'
const initialState = {
  searchField: ''
}


export default function price(state = initialState, action) {
  switch (action.type) {
    case SET_FILTERS:
      return (
        {
          ...state, searchField: action.payload.searchField,
        }
      )
    case RESET_FILTERS:
      return(
        initialState
      )
    default:
      return state
  }

}