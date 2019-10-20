import { combineReducers } from 'redux'

import uiReducer from './uiReducer'
import userReducer from './userReducer'
import lendersReducer from "./lendersReducer";
import specialitiesReducer from './specialitiesReducer'
import zonesReducer from './zonesReducer'
import authorizationsReducer from "./authorizationsReducer"

const rootReducer = combineReducers({
	authorizations: authorizationsReducer,
	ui: uiReducer,
	user: userReducer,
	lenders: lendersReducer,
	specialities: specialitiesReducer,
	zones: zonesReducer,
})

export default rootReducer
