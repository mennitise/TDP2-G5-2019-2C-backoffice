import { combineReducers } from 'redux'

import uiReducer from './uiReducer'
import userReducer from './userReducer'
import providersReducer from "./providersReducer";
import specialitiesReducer from './specialitiesReducer'
import zonesReducer from './zonesReducer'

const rootReducer = combineReducers({
	ui: uiReducer,
	user: userReducer,
	providers: providersReducer,
	specialities: specialitiesReducer,
	zones: zonesReducer,
})

export default rootReducer
