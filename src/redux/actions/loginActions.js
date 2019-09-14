import actionTypes from './actionTypes'

const loginActions = {
	loginDataEntered: function() {
		return {
			type: actionTypes.LOGIN_DATA_ENTERED,
		}
	},
	loginSuccess: function(dni, name) {
		return {
			type: actionTypes.LOGIN_SUCCESS,
			dni,
			name,
		}
	}
}

export default loginActions
