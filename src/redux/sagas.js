import actionTypes from './actions/actionTypes'
import loginActions from './actions/loginActions'
import { all, call, put, takeEvery } from 'redux-saga/effects';

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

export default function* rootSaga() {
    yield all([
        yield takeEvery(actionTypes.LOGIN_DATA_ENTERED, login),
    ])
}
