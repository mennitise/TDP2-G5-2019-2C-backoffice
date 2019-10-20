import t from '../actions/actionTypes'
import authorizationsActions from "../actions/authorizationsActions"

let defaultState = {
	list: [],
	selected: '0',
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

function getAuthorizationsData(state, action) {
	return {
		...state,
		list: action.authorizations
	}
}

function authorizationSelected(state, action) {
	return {
		...state,
		selected: action.id,
	}
}

function authorizationDetailedInitialized(state, action) {
	return {
		...state,
		selected: action.id,
	}
}

const lendersReducer = (state = defaultState, action) => {
	switch(action.type) {
		case t.AUTHORIZATIONS_GET_AUTHORIZATIONS_SUCCESS:
			return getAuthorizationsData(state, action)
		case t.AUTHORIZATIONS_FILTERING_BY_NAME:
			return filterByName(state, action)
		case t.AUTHORIZATIONS_FILTERING_BY_SPECIALITY:
			return filterBySpeciality(state, action)
		case t.AUTHORIZATIONS_FILTERING_BY_PLAN:
			return filterByPlan(state, action)
		case t.AUTHORIZATIONS_AUTHORIZATION_SELECTED:
			return authorizationSelected(state, action)
		case t.AUTHORIZATIONS_AUTHORIZATION_DETAILS_ROUTE_INITIALIZE:
			return authorizationDetailedInitialized(state, action)
		default:
			return state
	}
}

export default lendersReducer
