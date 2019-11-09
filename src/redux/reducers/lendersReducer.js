import t from '../actions/actionTypes'

let defaultState = {
    list: [],
    selected: 0,
    filter: {
        name: '',
        speciality: '',
        plan: '',
    }
}

function filterByName(state, action) {
    return {
        ...state,
        filter: {
            ...state.filter,
            name: action.name,
        },
    }
}

function filterBySpeciality(state, action) {
    return {
        ...state,
        filter: {
            ...state.filter,
            speciality: action.speciality,
        },
    }
}

function filterByPlan(state, action) {
    return {
        ...state,
        filter: {
            ...state.filter,
            plan: action.plan,
        },
    }
}

function getLendersData(state, action) {
    return {
        ...state,
        list: action.lenders
    }
}

function clearFilters(state) {
    return {
        ...state,
        filter: {
            name: '',
            speciality: '',
            plan: '',
        }
    }
}

function selectLender(state, action) {
    return {
        ...state,
        selected: action.id,
    }
}

const lendersReducer = (state = defaultState, action) => {
    switch(action.type) {
        case t.LENDERS_GET_LENDERS_SUCCESS:
            return getLendersData(state, action)
        case t.LENDERS_FILTERING_BY_NAME:
            return filterByName(state, action)
        case t.LENDERS_FILTERING_BY_SPECIALITY:
            return filterBySpeciality(state, action)
        case t.LENDERS_FILTERING_BY_PLAN:
            return filterByPlan(state, action)
        case t.LENDERS_ROUTE_INITIALIZE:
            return clearFilters(state)
        case t.LENDERS_MODIFY_LENDER_ROUTE_INITIALIZE:
            return selectLender(state, action)
        default:
            return state
    }
}

export default lendersReducer
