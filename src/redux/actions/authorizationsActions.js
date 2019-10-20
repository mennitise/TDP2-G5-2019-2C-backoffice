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
	filteringByPlan: function(plan) {
		return {
			type: actionTypes.AUTHORIZATIONS_FILTERING_BY_PLAN,
			plan,
		}
	},
	filteringBySpeciality: function(speciality) {
		return {
			type: actionTypes.AUTHORIZATIONS_FILTERING_BY_SPECIALITY,
			speciality,
		}
	},
}

export default authorizationsActions
