import t from '../actions/actionTypes'

let defaultState = {
    rol: ''
}

function setUserData(state, action) {
    return {
        ...state,
        rol: action.rol,
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
