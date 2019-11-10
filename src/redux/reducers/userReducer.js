import t from '../actions/actionTypes'

let defaultState = {
    rol: '',
    email: '',
    validated: false,
}

function setUserData(state, action) {
    return {
        ...state,
        rol: action.user.role,
        email: action.user.email,
        validated: true,
    }
}

function setValidated(state) {
    return {
        ...state,
        validated: true,
    }
}

const userReducer = (state = defaultState, action) => {
    switch(action.type) {
        case t.LOGIN_SUCCESS:
          return setUserData(state, action)
        case t.LOGIN_FAILED:
            return setValidated(state)
        default:
            return state
    }
}

export default userReducer
