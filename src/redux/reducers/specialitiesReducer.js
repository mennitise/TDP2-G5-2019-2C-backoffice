import t from '../actions/actionTypes'

let defaultState = {
	list: [],
}

function loadSpecialities(state, action) {
	return {
		...state,
		list: action.specialities,
	}
}

const specialitiesReducer = (state = defaultState, action) => {
	switch(action.type) {
		case t.SPECIALITIES_GET_SUCCESS:
			return loadSpecialities(state, action)
		default:
			return state
	}
}

export default specialitiesReducer
