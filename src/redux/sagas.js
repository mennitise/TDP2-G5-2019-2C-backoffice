import actionTypes from './actions/actionTypes'
import { all, call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import browserHistory from 'helpers/history'
import loginActions from "./actions/loginActions"
import zonesActions from './actions/zonesActions'
import lenderActions from "./actions/lenderActions"
import specialitiesActions from "./actions/specialitiesActions"
import authorizationsActions from "./actions/authorizationsActions"
import userRoles from "helpers/enums/userRoles"
import metricsActions from "./actions/metricsActions"

const baseURL = 'https://tdp2-crmedical-api.herokuapp.com/'

// API calls

const hardcodedLogin = (username, pass) => {
	switch (username) {
		case userRoles.ADMIN:
			return pass === '123456'
		case userRoles.AUDITOR:
			return pass === 'asdf1234'
		default:
			return false
	}
}

export function* login(action) {
	try {
		const data = {
			email: action.username,
			password: action.pass,
		}
		const response = yield fetch(baseURL + 'auth/bo/login', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers' : 'Origin, Content-Type,  X-Requested-With, Accept'
			}
		})
		const responseJSON = yield response.json()
		if (response.status === 200) {
			yield put(loginActions.loginSuccess(responseJSON.user))
		} else {
			yield put(loginActions.loginFailed())
		}
	} catch(error) {
		yield put(loginActions.loginFailed())
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

function* getAuthorizationsMetrics() {
	try {
		const endpointAuthorized = baseURL + 'dashboards/auth/authorized'
		const endpointRejected = baseURL + 'dashboards/auth/rejected'
		const endpointSummary = baseURL + 'dashboards/auth/summary'

		const responseAuthorized = yield call(fetch, endpointAuthorized)
		const responseRejected = yield call(fetch, endpointRejected)
		const responseSummary = yield call(fetch, endpointSummary)

		const dataAuthorized = yield responseAuthorized.json()
		const dataRejected = yield responseRejected.json()
		const dataSummary = yield responseSummary.json()

		let totalData = {}

		Date.prototype.addDays = function(days) {
			let dat = new Date(this.valueOf())
			dat.setDate(dat.getDate() + days);
			return dat;
		}

		Date.prototype.deductDays = function(days) {
			let dat = new Date(this.valueOf())
			dat.setDate(dat.getDate() - days)
			return dat;
		}

		const getDates = (startDate, stopDate) => {
			let dateArray = []
			let currentDate = startDate
			while (currentDate <= stopDate) {
				dateArray.push( new Date (currentDate) )
				currentDate = currentDate.addDays(1)
			}
			return dateArray;
		}

		const dateArray = getDates((new Date()).deductDays(30), new Date())
		dateArray.forEach(date => {
			const dateString = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
			totalData[dateString] = {}
		})

		dataAuthorized.forEach(auth => {
			const key = auth.okdate.substring(0, 10)
			totalData = {
				...totalData,
				[key]: {
					authorized: auth.count,
				},
			}
		})

		dataRejected.forEach(auth => {
			const key = auth.okdate.substring(0, 10)
			totalData = {
				...totalData,
				[key]: {
					...totalData[key],
					rejected: auth.count,
				},
			}
		})

		const dates = Object.keys(totalData)

		const approvedByDate = dates.map(date => {
			return totalData[date].authorized || 0
		})
		const rejectedByDate = dates.map(date => {
			return totalData[date].rejected || 0
		})

		const automaticAmount = parseInt(dataSummary.filter(data => data.status === 'AUTORIZADO AUTOMATICAMENTE')[0].count)
		const manualAmount = parseInt(dataSummary.filter(data => data.status === 'AUTORIZADO')[0].count)

		const data = {
			dates,
			approvedByDate,
			rejectedByDate,
			manualAmount,
			automaticAmount,
		}

		yield put(metricsActions.getAuthorizationsSuccess(data))
	} catch (error) {
		console.log(error)
	}
}

function* getAffiliatesMetrics() {
	try {
		const endpointActive = baseURL + 'dashboards/affiliates/active'
		const endpointAll = baseURL + 'dashboards/affiliates/all'
		const responseActive = yield call(fetch, endpointActive)
		const responseAll = yield call(fetch, endpointAll)
		const dataActive = yield responseActive.json()
		const dataAll = yield responseAll.json()

		const plans = dataAll.map(amount => amount.plan)
		const values = dataAll.map(amount => parseInt(amount.count))
		const appValues = dataActive.map(amount => parseInt(amount.count))

		const data = {
			plans,
			values,
			appValues,
		}

		yield put(metricsActions.getAffiliatesSuccess(data))
	} catch (error) {
		console.log(error)
	}
}

function* getMetrics(action) {
	yield getAuthorizationsMetrics()
	yield getAffiliatesMetrics()
}

// Redirections

function* loginSuccesed() {
	yield browserHistory.push('/main/dash')
}

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

function* manageLogin(action) {
	const getUserRol = (state) => state.user.rol
	const rol = yield select(getUserRol);

	switch (rol) {
		case userRoles.AUDITOR:
			if (
				action.type === actionTypes.LENDERS_ROUTE_INITIALIZE ||
				action.type === actionTypes.LENDER_ADD_LENDER_INITIALIZE ||
				action.type === actionTypes.LENDERS_MODIFY_LENDER_ROUTE_INITIALIZE
			) {
				goToAuthorizations()
			}
			break
		case userRoles.ADMIN:
			if (
				action.type === actionTypes.AUTHORIZATIONS_ROUTE_INITIALIZE ||
				action.type === actionTypes.AUTHORIZATIONS_AUTHORIZATION_DETAILS_ROUTE_INITIALIZE
			) {
				goToLenders()
			}
			break
		default:
			browserHistory.push('/login')
	}

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
        yield takeLatest(actionTypes.LOGIN_SUCCESS, loginSuccesed),
        yield takeEvery([
        	actionTypes.LENDERS_ROUTE_INITIALIZE,
        	actionTypes.LENDER_ADD_LENDER_INITIALIZE,
        	actionTypes.LENDERS_MODIFY_LENDER_ROUTE_INITIALIZE,
			actionTypes.AUTHORIZATIONS_ROUTE_INITIALIZE,
			actionTypes.AUTHORIZATIONS_AUTHORIZATION_DETAILS_ROUTE_INITIALIZE,
			actionTypes.DASHBOARD_ROUTE_INITIALIZE,
		], manageLogin),

        // Sync
    	yield takeEvery(actionTypes.LOGIN_BUTTON_CLICKED, login),
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
			actionTypes.SIDEBAR_AUTHORIZATIONS_SELECTED,
		], getAuthorizations),
		yield takeEvery(actionTypes.LENDER_SAVE_NEW_LENDER_SELECTED, saveNewLender),
		yield takeEvery(actionTypes.LENDER_MODIFY_LENDER_SAVE, modifyLender),
		yield takeLatest(actionTypes.LENDER_DELETE_LENDER, deleteLender),
		yield takeLatest(actionTypes.AUTHORIZATIONS_AUTHORIZATION_AUTHORIZED, authorizeAuthorization),
		yield takeLatest(actionTypes.AUTHORIZATIONS_AUTHORIZATION_REJECTED, rejectAuthorization),
		yield takeLatest(actionTypes.AUTHORIZATIONS_AUTHORIZATION_NEED_MORE_INFORMATION, needMoreInformationAuthorization),
		yield takeLatest(actionTypes.DASHBOARD_ROUTE_INITIALIZE, getMetrics),
	])
}
