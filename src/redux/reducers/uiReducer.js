import t from '../actions/actionTypes'

let defaultState = {
	width: 0,
	height: 0,
}

function setWindowSize(state, action) {
	return {
		...state,
		width: action.width,
		height: action.height,
	}
}

const uiReducer = (state = defaultState, action) => {
	switch(action.type) {
		case t.APP_INITIALIZE:
		case t.WINDOW_RESIZE:
			return setWindowSize(state, action)
		default:
			return state
	}
}

export default uiReducer
