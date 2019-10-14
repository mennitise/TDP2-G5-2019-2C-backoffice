import actionTypes from './actions/actionTypes'
import { all, call, put, get, takeEvery, takeLatest } from 'redux-saga/effects'
import browserHistory from 'helpers/history'
import loginActions from "./actions/loginActions"
import zonesActions from './actions/zonesActions'
import lenderActions from "./actions/lenderActions"
import specialitiesActions from "./actions/specialitiesActions"

const baseURL = 'https://tdp2-crmedical-api.herokuapp.com/'

// API calls

export function* login(action) {
	try {
		const endpoint = 'https://gist.githubusercontent.com/brunokrebs/f1cacbacd53be83940e1e85860b6c65b/raw/to-do-items.json'
		const response = yield call(fetch, endpoint)
        const data = yield response.json()
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
		const response = yield call(fetch, endpoint)
		const data = yield response.json()
		yield put(lenderActions.getLendersSuccess(data))
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
		const response = yield fetch(baseURL + 'lenders', {
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

// Redirections

function* redirectToAddNewLender(action) {
	yield browserHistory.push('/main/lenders/add')
}

function* backToLenders() {
	yield browserHistory.push('/main/lenders')
}

export default function* rootSaga() {
    yield all([
		// Redirections
		yield takeLatest(actionTypes.APP_INITIALIZE, getSpecialities),
		yield takeLatest(actionTypes.APP_INITIALIZE, getZones),
		yield takeEvery(actionTypes.LENDERS_ROUTE_INITIALIZE, getLenders),
		yield takeEvery(actionTypes.LENDER_ADD_NEW_LENDER_SELECTED, redirectToAddNewLender),
        yield takeEvery(actionTypes.LENDER_SAVE_NEW_LENDER_SELECTED, saveNewLender),

        // Sync
    	yield takeEvery(actionTypes.LOGIN_DATA_ENTERED, login),
		yield takeEvery(actionTypes.LENDER_SAVE_NEW_LENDER_SUCCESSFUL, backToLenders)
    ])
}
