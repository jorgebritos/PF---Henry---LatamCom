
const initialState={

}

export default function createReducer(state=initialState, action){

  switch(action.type){
    case CREATE_PRODUCT:
      return action.payload
  case CREATE_COMMENT:
      return action.payload
  case CREATE_PURCHASE:
      return action.payload
  default:
    return state
  }
}