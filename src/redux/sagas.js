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
		const languages = ['Español', 'Ingles']
		const plans = ['A110', 'A210', 'A310']
		const data = {
			type: (action.providerData.type === '1') ? 'PROFESIONAL' : 'SANATORIO',
			name: action.providerData.name,
			languages: action.providerData.languages.map(idLang => languages[idLang - 1]),
			specialties: action.providerData.specialities,
			plan: plans[action.providerData.plan - 1],
			emails: action.providerData.emails,
			offices: action.providerData.addresses.map(office => {
				return {
					address: office.address,
					zone_id: office.zone - 1,
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
		yield put(providerActions.saveNewProviderSuccessful())
	} catch (error) {
		console.log(error)
	}
}

// Redirections

function* redirectToAddNewProvider(action) {
	yield browserHistory.push('/main/providers/add')
}

function* backToProviders() {
	yield browserHistory.push('/main/providers')
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
		yield takeEvery(actionTypes.PROVIDER_SAVE_NEW_PROVIDER_SUCCESSFUL, backToProviders)
    ])
}
