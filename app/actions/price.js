import {get} from 'lodash'
import { push } from 'react-router-redux'


export const LOADING_PRICE = 'LOADING_PRICE'
export const GET_INITIAL_PRICE = 'GET_INITIAL_PRICE'
export const EDIT_PRICE_BY_ID ='EDIT_PRICE_BY_ID'


function loadingPrice(){
  return {
    type: LOADING_PRICE,
  }
}

function getInitialPrice(data){
  return {
    type: GET_INITIAL_PRICE,
    payload: {
      data,
    },
  }
}

function editPriceById(body, id){
  return {
    type: EDIT_PRICE_BY_ID,
    payload: {
      body,
      id,
    },
  }
}

export function getAllPrice() {
  return (dispatch, getState) => {
    dispatch(loadingPrice())
    const { price } = getState()
    const priceFromStorage = localStorage.price
    if(!priceFromStorage){
      localStorage.price = JSON.stringify(price.data)
      return dispatch(getInitialPrice(price.data))
    }
    return dispatch(getInitialPrice(JSON.parse(priceFromStorage)))
  }
}

export function editPrice(body, id) {
  return (dispatch, getState) => {
    const price = getState().price.data.map(pr=>{
      if(pr.id === id){
        return ({
          ...pr, ...body,
        })
      }
      return pr
    })
    localStorage.price = JSON.stringify(price)
    dispatch(editPriceById(body,id))
  }
}