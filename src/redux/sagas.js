import actionTypes from './actions/actionTypes'
import { all, call, put, get, takeEvery, takeLatest } from 'redux-saga/effects'
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

function* getAuthorizations() {
	try {
		const endpoint = baseURL + 'authorizations'
		const response = yield call(fetch, endpoint)
		let data = yield response.json()
		data = [
			{
				id: 1,
				name: 'Juan Carlos',
				speciality: 'Pediatría',
				plan: 'A220',
				status: 'Pendiente',
				imgUrl: 'https://fccid.io/png.php?id=3136256&page=0',
			},
			{
				id: 2,
				name: 'Juan Carlos',
				speciality: 'Pediatría',
				plan: 'A220',
				status: 'Rechazada',
				imgUrl: 'https://fccid.io/png.php?id=3063323&page=0',
			},
			{
				id: 3,
				name: 'Juan Carlos',
				speciality: 'Pediatría',
				plan: 'A220',
				status: 'Requiere más información',
				imgUrl: 'https://qph.fs.quoracdn.net/main-qimg-a5276249f498ca124b3914479d7968ad.webp',
			},
			{
				id: 4,
				name: 'Juan Carlos',
				speciality: 'Pediatría',
				plan: 'A220',
				status: 'Autorizada',
				imgUrl: 'https://i.pinimg.com/originals/ed/dc/10/eddc104ac28661aea6ff97b44a9b71b7.png',
			},
			{
				id: 5,
				name: 'Juan Carlos',
				speciality: 'Pediatría',
				plan: 'A220',
				status: 'Pendiente',
				imgUrl: 'https://www.club-pescadores.com.ar/media/k2/items/cache/d7f952e4236afc03a202fc64913dc353_L.jpg',
			},
			{
				id: 6,
				name: 'Juan Carlos',
				speciality: 'Pediatría',
				plan: 'A220',
				status: 'Pendiente',
				imgUrl: 'http://www.guadianalisis.es/images/CERTIFICADOS/iso_9001.jpg',
			},
			{
				id: 7,
				name: 'Juan Carlos',
				speciality: 'Pediatría',
				plan: 'A220',
				status: 'Autorizada',
				imgUrl: 'http://www.guadianalisis.es/images/CERTIFICADOS/certificado_junta.jpg',
			},
		]
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

function* goToDashboard(){
	yield browserHistory.push('/main/dash')
}

function* goToLenders(){
	yield browserHistory.push('/main/lenders')
}

function* goToAuthorizations(){
	yield browserHistory.push('/main/authorizations')
}

function* goToAuthorizationDetails(action){
	yield browserHistory.push(`/main/authorization/${action.id}`)
}

export default function* rootSaga() {
    yield all([
		// Redirections
		yield takeEvery(actionTypes.LENDER_ADD_NEW_LENDER_SELECTED, redirectToAddNewLender),
        yield takeEvery(actionTypes.SIDEBAR_DASHBOARD_SELECTED, goToDashboard),
		yield takeEvery([actionTypes.SIDEBAR_LENDERS_SELECTED, actionTypes.LENDER_SAVE_NEW_LENDER_SUCCESSFUL], goToLenders),
		yield takeEvery(actionTypes.SIDEBAR_AUTHORIZATIONS_SELECTED, goToAuthorizations),
        yield takeEvery(actionTypes.AUTHORIZATIONS_AUTHORIZATION_SELECTED, goToAuthorizationDetails),

        // Sync
    	yield takeEvery(actionTypes.LOGIN_DATA_ENTERED, login),
		yield takeLatest(actionTypes.APP_INITIALIZE, getSpecialities),
		yield takeLatest(actionTypes.APP_INITIALIZE, getZones),
		yield takeEvery(actionTypes.LENDERS_ROUTE_INITIALIZE, getLenders),
		yield takeEvery([actionTypes.AUTHORIZATIONS_ROUTE_INITIALIZE, actionTypes.AUTHORIZATIONS_AUTHORIZATION_DETAILS_ROUTE_INITIALIZE], getAuthorizations),
		yield takeEvery(actionTypes.LENDER_SAVE_NEW_LENDER_SELECTED, saveNewLender),
    ])
}
