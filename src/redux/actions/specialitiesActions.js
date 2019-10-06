import actionTypes from './actionTypes'

const specialitiesActions = {
	getSpecialitiesSuccess: function(specialities) {
		return {
			type: actionTypes.SPECIALITIES_GET_SUCCESS,
			specialities,
		}
	},
}

export default specialitiesActions
