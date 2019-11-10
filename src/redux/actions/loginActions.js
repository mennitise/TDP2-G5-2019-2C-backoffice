import actionTypes from './actionTypes'

const loginActions = {
	loginButtonClicked: function(username, pass) {
		return {
			type: actionTypes.LOGIN_BUTTON_CLICKED,
			username,
			pass,
		}
	},
	loginSuccess: function(user) {
		return {
			type: actionTypes.LOGIN_SUCCESS,
			user,
		}
	},
	loginFailed: function() {
		return {
			type: actionTypes.LOGIN_FAILED,
		}
	},
}

export default loginActions
