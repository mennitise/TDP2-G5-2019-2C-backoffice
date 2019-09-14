import t from '../actions/actionTypes'

let defaultState = {
    dni: '',
    name: '',
}

function setUserData(state, action) {
    return {
        ...state,
        dni: action.dni,
        name: action.name,
    }
}

const userReducer = (state = defaultState, action) => {
    switch(action.type) {
        case t.LOGIN_SUCCESS:
          return setUserData(state, action)
        default:
            return state
    }
}

export default userReducer
