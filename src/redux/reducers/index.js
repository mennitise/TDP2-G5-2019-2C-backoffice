import { combineReducers } from 'redux'

import uiReducer from './uiReducer'
import userReducer from './userReducer'
import lendersReducer from "./lendersReducer";
import specialitiesReducer from './specialitiesReducer'
import zonesReducer from './zonesReducer'
import authorizationsReducer from "./authorizationsReducer"
import metricsReducer from './metricsReducer'

const rootReducer = combineReducers({
	authorizations: authorizationsReducer,
	ui: uiReducer,
	user: userReducer,
	lenders: lendersReducer,
	specialities: specialitiesReducer,
	zones: zonesReducer,
	metrics: metricsReducer,
})

export default rootReducer
