export const SET_FILTERS = 'SET_FILTERS'
export const RESET_FILTERS = 'RESET_FILTERS'


function setFiltersAction(search){
  return {
    type: SET_FILTERS,
    payload:{
      searchField: search,
    }
  }
}

export function setFilters(search) {
  return (dispatch, getState) => {
    dispatch(setFiltersAction(search))
  }
}

export function resetFilers(){
  return(
    {
      type: RESET_FILTERS,
    }
  )
}