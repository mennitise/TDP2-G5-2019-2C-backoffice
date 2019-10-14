import { combineReducers } from 'redux'

import uiReducer from './uiReducer'
import userReducer from './userReducer'
import lendersReducer from "./lendersReducer";
import specialitiesReducer from './specialitiesReducer'
import zonesReducer from './zonesReducer'

const rootReducer = combineReducers({
	ui: uiReducer,
	user: userReducer,
	lenders: lendersReducer,
	specialities: specialitiesReducer,
	zones: zonesReducer,
})

export default rootReducer
