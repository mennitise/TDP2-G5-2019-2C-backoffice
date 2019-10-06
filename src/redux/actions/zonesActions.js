import actionTypes from './actionTypes'

const zonesActions = {
	getZonesSuccess: function(zones) {
		return {
			type: actionTypes.ZONES_GET_SUCCESS,
			zones,
		}
	},
}

export default zonesActions
