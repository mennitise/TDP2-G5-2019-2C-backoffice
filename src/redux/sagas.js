import actionTypes from './actions/actionTypes'
import { all, call, put, get, takeEvery, takeLatest } from 'redux-saga/effects'
import browserHistory from 'helpers/history'
import loginActions from "./actions/loginActions"
import zonesActions from './actions/zonesActions'
import providerActions from "./actions/providerActions"
import specialitiesActions from "./actions/specialitiesActions"

const baseURL = 'https://tdp2-crmedical-api.herokuapp.com/'

// API calls

export function* login(action) {
	try {
		const endpoint = 'https://gist.githubusercontent.com/brunokrebs/f1cacbacd53be83940e1e85860b6c65b/raw/to-do-items.json'
		const response = yield call(fetch, endpoint)
        const data = yield response.json()
        console.log(data)
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

function* getProviders() {
	try {
		const endpoint = baseURL + 'lenders'
		const response = yield call(fetch, endpoint)
		const data = yield response.json()
		yield put(providerActions.getProvidersSuccess(data))
	} catch (error) {
		console.log(error)
	}
}

export function* saveNewProvider(action) {
	try {
		//const response = yield call(fetch, baseURL + '')
		yield put(providerActions.saveNewProviderSuccessful())
	} catch (error) {
		console.log(error)
	}
}

// Redirections

function* redirectToAddNewProvider(action) {
	yield browserHistory.push('/main/providers/add')
}

export default function* rootSaga() {
    yield all([
		// Redirections
		yield takeLatest(actionTypes.APP_INITIALIZE, getSpecialities),
		yield takeLatest(actionTypes.APP_INITIALIZE, getZones),
		yield takeEvery(actionTypes.PROVIDERS_ROUTE_INITIALIZE, getProviders),
		yield takeEvery(actionTypes.PROVIDER_ADD_NEW_PROVIDER_SELECTED, redirectToAddNewProvider),
        yield takeEvery(actionTypes.PROVIDER_SAVE_NEW_PROVIDER_SELECTED, saveNewProvider),

        // Sync
    	yield takeEvery(actionTypes.LOGIN_DATA_ENTERED, login),
    ])
}
