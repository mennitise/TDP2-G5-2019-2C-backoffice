import t from '../actions/actionTypes'

let defaultState = {
	list: [],
}

function loadZones(state, action) {
	return {
		...state,
		list: action.zones,
	}
}

const zonesReducer = (state = defaultState, action) => {
	switch(action.type) {
		case t.ZONES_GET_SUCCESS:
			return loadZones(state, action)
		default:
			return state
	}
}

export default zonesReducer
