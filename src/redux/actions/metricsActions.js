import actionTypes from './actionTypes'

const metricsActions = {
	getAffiliatesSuccess: function(data) {
		return {
			type: actionTypes.METRICS_GET_AFFILIATES_SUCCESS,
			data,
		}
	},
	getAuthorizationsSuccess: function(data) {
		return {
			type: actionTypes.METRICS_GET_AUTHORIZATIONS_SUCCESS,
			data,
		}
	},
}

export default metricsActions
