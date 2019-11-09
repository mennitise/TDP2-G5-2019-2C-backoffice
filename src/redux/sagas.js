import actionTypes from './actions/actionTypes'
import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import browserHistory from 'helpers/history'
import loginActions from "./actions/loginActions"
import zonesActions from './actions/zonesActions'
import lenderActions from "./actions/lenderActions"
import specialitiesActions from "./actions/specialitiesActions"
import authorizationsActions from "./actions/authorizationsActions"

const baseURL = 'https://tdp2-crmedical-api.herokuapp.com/'

// API calls

export function* login(action) {
	try {
		const endpoint = 'https://gist.githubusercontent.com/brunokrebs/f1cacbacd53be83940e1e85860b6c65b/raw/to-do-items.json'
		const response = yield call(fetch, endpoint)
        yield response.json()
		yield put(loginActions.loginSuccess('36073333', 'Sebastian Menniti'))
	} catch(error) {
		console.log(error)
	}
}

export function* getSpecialities() {
	try {
		const endpoint = baseURL + 'specialties'
		const response = yield call(fetch, endpoint)
		const data = yield response.json()
		yield put(specialitiesActions.getSpecialitiesSuccess(data))
	} catch (error) {
		console.log(error)
	}
}

export function* getZones() {
	try {
		const endpoint = baseURL + 'zones'
		const response = yield call(fetch, endpoint)
		const data = yield response.json()
		yield put(zonesActions.getZonesSuccess(data))
	} catch (error) {
		console.log(error)
	}
}

function* getLenders() {
	try {
		const endpoint = baseURL + 'lenders'
		const options = {
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers' : 'Origin, Content-Type,  X-Requested-With, Accept'
			}
		}
		const response = yield call(fetch, endpoint, options)
		const data = yield response.json()
		yield put(lenderActions.getLendersSuccess(data))
	} catch (error) {
		console.log(error)
	}
}

function* getAuthorizations() {
	try {
		const endpoint = baseURL + 'authorizations'
		const options = {
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers' : 'Origin, Content-Type,  X-Requested-With, Accept'
			}
		}
		const response = yield call(fetch, endpoint, options)
		let data = yield response.json()
		yield put(authorizationsActions.getAuthorizationsSuccess(data))
	} catch (error) {
		console.log(error)
	}
}

export function* saveNewLender(action) {
	try {
		const languages = ['Español', 'Ingles']
		const plans = ['A110', 'A210', 'A310']
		const data = {
			type: (action.lenderData.type === '1') ? 'PROFESIONAL' : 'SANATORIO',
			name: action.lenderData.name,
			languages: action.lenderData.languages.map(idLang => languages[idLang - 1]),
			specialties: action.lenderData.specialities,
			plan: plans[action.lenderData.plan - 1],
			emails: action.lenderData.emails,
			offices: action.lenderData.addresses.map(office => {
				return {
					address: office.address,
					zone_id: office.zone,
					phone: office.phone,
					lat: office.latitude,
					lon: office.longitude,
				}
			}),
		}
		yield fetch(baseURL + 'lenders', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		})
		yield put(lenderActions.saveNewLenderSuccessful())
	} catch (error) {
		console.log(error)
	}
}

export function* modifyLender(action) {
	try {
		const languages = ['Español', 'Ingles']
		const plans = ['A110', 'A210', 'A310']
		const data = {
			type: (action.lenderData.type === '1') ? 'PROFESIONAL' : 'SANATORIO',
			name: action.lenderData.name,
			languages: action.lenderData.languages.map(idLang => languages[idLang - 1]),
			specialties: action.lenderData.specialities,
			plan: plans[action.lenderData.plan - 1],
			emails: action.lenderData.emails,
			offices: action.lenderData.addresses.map(office => {
				return {
					address: office.address,
					zone_id: office.zone,
					phone: office.phone,
					lat: office.latitude,
					lon: office.longitude,
				}
			}),
		}
		yield fetch(`${baseURL}lenders/${action.lenderData.id}` , {
			method: 'PUT',
			body: JSON.stringify(data),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		})
		yield put(lenderActions.saveNewLenderSuccessful())
	} catch (error) {
		console.log(error)
	}
}

function* deleteLender(action) {
	try {
		yield fetch(`${baseURL}lenders/${action.id}`, {
			method: 'DELETE',
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		})
		yield put(lenderActions.deleteLenderSuccessful())
	} catch (error) {
		console.log(error)
	}
}

function* authorizeAuthorization(action) {
	try {
		const data = {
			observations: action.observations,
		}
		yield fetch(baseURL + 'authorizations/authorize/' + action.id, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		})
		yield put(authorizationsActions.authorizeAuthorizationSuccessful(action.id))
	} catch (error) {
		console.log(error)
	}
}

function* rejectAuthorization(action) {
	try {
		const data = {
			observations: action.observations,
		}
		yield fetch(baseURL + 'authorizations/reject/' + action.id, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		})
		yield put(authorizationsActions.rejectAuthorizationSuccessful(action.id))
	} catch (error) {
		console.log(error)
	}
}

function* needMoreInformationAuthorization(action) {
	try {
		const data = {
			observations: action.observations,
		}
		yield fetch(baseURL + 'authorizations/need-information/' + action.id, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		})
		yield put(authorizationsActions.needMoreInformationAuthorizationSuccessful(action.id))
	} catch (error) {
		console.log(error)
	}
}

// Redirections

function* redirectToAddNewLender(action) {
	yield browserHistory.push('/main/lenders/add')
}

function* goToDashboard(){
	yield browserHistory.push('/main/dash')
}

function* goToLenders(){
	yield browserHistory.push('/main/lenders')
}

function* goToAuthorizations(){
	yield browserHistory.push('/main/authorizations')
}

function* goToAuthorizationDetails(action) {
	yield browserHistory.push(`/main/authorization/${action.id}`)
}

function* goToModifyLender(action) {
	yield browserHistory.push(`/main/lenders/modify/${action.id}`)
}

function* goToUsers() {
	yield browserHistory.push('/main/users')
}

export default function* rootSaga() {
    yield all([
		// Redirections
		yield takeEvery(actionTypes.LENDER_ADD_NEW_LENDER_SELECTED, redirectToAddNewLender),
        yield takeEvery(actionTypes.SIDEBAR_DASHBOARD_SELECTED, goToDashboard),
		yield takeEvery(actionTypes.SIDEBAR_USERS_SELECTED, goToUsers),
		yield takeEvery([actionTypes.SIDEBAR_LENDERS_SELECTED, actionTypes.LENDER_SAVE_NEW_LENDER_SUCCESSFUL], goToLenders),
		yield takeEvery([
			actionTypes.SIDEBAR_AUTHORIZATIONS_SELECTED,
			actionTypes.AUTHORIZATIONS_AUTHORIZATION_AUTHORIZED_SUCCESSFUL,
			actionTypes.AUTHORIZATIONS_AUTHORIZATION_REJECTED_SUCCESSFUL,
			actionTypes.AUTHORIZATIONS_AUTHORIZATION_NEED_MORE_INFORMATION_SUCCESSFUL,
		], goToAuthorizations),
        yield takeEvery(actionTypes.AUTHORIZATIONS_AUTHORIZATION_SELECTED, goToAuthorizationDetails),
        yield takeLatest(actionTypes.LENDER_MODIFY_LENDER, goToModifyLender),

        // Sync
    	yield takeEvery(actionTypes.LOGIN_DATA_ENTERED, login),
		yield takeLatest(actionTypes.APP_INITIALIZE, getSpecialities),
		yield takeLatest(actionTypes.APP_INITIALIZE, getZones),
		yield takeEvery([
			actionTypes.LENDERS_ROUTE_INITIALIZE,
			actionTypes.LENDER_DELETE_LENDER_SUCCESS,
			actionTypes.LENDERS_MODIFY_LENDER_ROUTE_INITIALIZE,
		], getLenders),
		yield takeEvery([
			actionTypes.AUTHORIZATIONS_ROUTE_INITIALIZE,
			actionTypes.AUTHORIZATIONS_AUTHORIZATION_DETAILS_ROUTE_INITIALIZE,
		], getAuthorizations),
		yield takeEvery(actionTypes.LENDER_SAVE_NEW_LENDER_SELECTED, saveNewLender),
		yield takeEvery(actionTypes.LENDER_MODIFY_LENDER_SAVE, modifyLender),
		yield takeLatest(actionTypes.LENDER_DELETE_LENDER, deleteLender),
		yield takeLatest(actionTypes.AUTHORIZATIONS_AUTHORIZATION_AUTHORIZED, authorizeAuthorization),
		yield takeLatest(actionTypes.AUTHORIZATIONS_AUTHORIZATION_REJECTED, rejectAuthorization),
		yield takeLatest(actionTypes.AUTHORIZATIONS_AUTHORIZATION_NEED_MORE_INFORMATION, needMoreInformationAuthorization),
	])
}
