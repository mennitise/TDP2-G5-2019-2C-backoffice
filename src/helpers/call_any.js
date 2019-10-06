import { call } from 'redux-saga/effects'

function *callAny(...args){
	let response, error, serverError
	try {
		response = yield call.apply(null, args)
	} catch(err) {
		serverError = err
	}

	if (response && "errorCode" in response) {
		response.error_code = response.errorCode
	}

	//In case there is an unhandled error
	if(!response && (!serverError || !serverError.error_code)) {
		serverError = {error_code: -1}
	}

	//Only for old API that returns errors as a resolve
	if(response && response.error_code !== 0) {
		serverError = response
	}

	if(serverError) {
		error = new Error('Server Error')
		error.serverError = serverError
		throw error
	}

	return response
}

export default callAny
