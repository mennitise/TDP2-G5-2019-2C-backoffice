import t from '../actions/actionTypes'

let defaultState = {
	authorizations: {
		dates: [],
		approvedByDate: [],
		rejectedByDate: [],
		manualAmount: 0,
		automaticAmount: 0,
	},
	affiliates: {
		plans: [],
		values: [],
		appValues: [],
	}
}

function setAuthorizations(state, action) {
	return {
		...state,
		authorizations: action.data,
	}
}

function setAffiliates(state, action) {
	return {
		...state,
		affiliates: action.data,
	}
}

const uiReducer = (state = defaultState, action) => {
	switch(action.type) {
		case t.METRICS_GET_AFFILIATES_SUCCESS:
			return setAffiliates(state, action)
		case t.METRICS_GET_AUTHORIZATIONS_SUCCESS:
			return setAuthorizations(state, action)
		default:
			return state
	}
}

export default uiReducer
