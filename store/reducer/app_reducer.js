const INITIAL_STATE = {
  SELL: {},
  GET_PROJECTS_DATA: [],
  SET_KEY:"",
  SETCONDITION:true

}
export default (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case "SETSELLDATA":
      return ({
        ...state,
        SELL: action.data
      })

    case "GET_PROJECTS_DATA":
      return ({
        ...state,
        GET_PROJECTS_DATA: action.data
      })
    case "SETCURRENTKEY":
      return ({
        ...state,
        SET_KEY: action.data
      })
  }
  return state;
}