import { combineReducers } from 'redux'

import uiReducer from './uiReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({
	ui: uiReducer,
	user: userReducer,
})

export default rootReducer
