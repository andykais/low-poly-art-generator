import { fromJS } from 'immutable'

// constants
const LOCATION_CHANGE = '@@router/LOCATION_CHANGE'

// initial routing state
const initialState = fromJS({
  locationBeforeTransitions: null
})

export default function routeReducer(state = initialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return state.set('locationBeforeTransitions', fromJS(action.payload))
    default:
      return state
  }
}

// actions
export function changeLocation(location) {
  return {
    type: LOCATION_CHANGE,
    payload: location
  }
}
