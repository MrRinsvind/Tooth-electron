import { price as initPrice } from '../utils/data'
import { LOADING_PRICE, GET_INITIAL_PRICE, EDIT_PRICE_BY_ID} from '../actions/price'
const initialState = {
  loading: false,
  init: false,
  data: initPrice,
  reinit: false,
}


export default function price(state = initialState, action) {
  switch (action.type) {
    case LOADING_PRICE:
      return (
        {
          ...state, loading: true, init: true,
        }
      )
    case GET_INITIAL_PRICE:
      return (
        {
          ...state, data: action.payload.data, loading: false,
        }
      )
    case EDIT_PRICE_BY_ID:
      const priceList = state.data.map((pr) => {
        if(pr.id === action.payload.id){
          return ({
            ...pr, ...action.payload.body,
          })
        }
        return pr
      })
      return (
        {
          ...state, data: priceList, reinit: true,
        }
      )
    default:
      return state
  }

}