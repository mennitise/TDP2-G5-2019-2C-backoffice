import actionTypes from './actionTypes'

const loginActions = {
	loginButtonClicked: function(username, pass) {
		return {
			type: actionTypes.LOGIN_BUTTON_CLICKED,
			username,
			pass,
		}
	},
	loginSuccess: function(rol) {
		return {
			type: actionTypes.LOGIN_SUCCESS,
			rol,
		}
	}
}

export default loginActions
