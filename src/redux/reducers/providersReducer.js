import t from '../actions/actionTypes'

let defaultState = {
    list: [],
}

function addProvider(state, action) {
    return {
        ...state,
    }
}

function getProvidersData(state, action) {
    return {
        ...state,
        list: action.providers
    }
}

const providersReducer = (state = defaultState, action) => {
    switch(action.type) {
        case t.PROVIDERS_GET_PROVIDERS_SUCCESS:
            return getProvidersData(state, action)
        default:
            return state
    }
}

export default providersReducer
