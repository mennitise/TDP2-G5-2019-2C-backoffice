import actionTypes from './actionTypes'

const authorizationsActions = {
	getAuthorizationsSuccess: function (authorizations) {
		return {
			type: actionTypes.AUTHORIZATIONS_GET_AUTHORIZATIONS_SUCCESS,
			authorizations
		}

	},
	authorizationSelected: function(id) {
		return {
			type: actionTypes.AUTHORIZATIONS_AUTHORIZATION_SELECTED,
			id,
		}
	},
	filteringByName: function(name) {
		return {
			type: actionTypes.AUTHORIZATIONS_FILTERING_BY_NAME,
			name,
		}
	},
	filteringByStatus: function(status) {
		return {
			type: actionTypes.AUTHORIZATIONS_FILTERING_BY_STATUS,
			status,
		}
	},
	filteringBySpeciality: function(speciality) {
		return {
			type: actionTypes.AUTHORIZATIONS_FILTERING_BY_SPECIALITY,
			speciality,
		}
	},
	authorizeAuthorization: function(id) {
		return {
			type: actionTypes.AUTHORIZATIONS_AUTHORIZATION_AUTHORIZED,
			id,
		}
	},
	authorizeAuthorizationSuccessful: function(id) {
		return {
			type: actionTypes.AUTHORIZATIONS_AUTHORIZATION_AUTHORIZED_SUCCESSFUL,
			id,
		}
	},
	rejectAuthorization: function(id) {
		return {
			type: actionTypes.AUTHORIZATIONS_AUTHORIZATION_REJECTED,
			id
		}
	},
	rejectAuthorizationSuccessful: function(id) {
		return {
			type: actionTypes.AUTHORIZATIONS_AUTHORIZATION_REJECTED_SUCCESSFUL,
			id
		}
	},
	needMoreInformationAuthorization: function(id) {
		return {
			type: actionTypes.AUTHORIZATIONS_AUTHORIZATION_NEED_MORE_INFORMATION,
			id
		}
	},
	needMoreInformationAuthorizationSuccessful: function(id) {
		return {
			type: actionTypes.AUTHORIZATIONS_AUTHORIZATION_NEED_MORE_INFORMATION_SUCCESSFUL,
			id
		}
	}
}

export default authorizationsActions
