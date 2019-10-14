import actionTypes from './actionTypes'

const lenderActions = {
	addNewLenderSelected: function() {
		return {
			type: actionTypes.LENDER_ADD_NEW_LENDER_SELECTED,
		}
	},
	saveNewLenderSelected: function(lenderData) {
		return {
			type: actionTypes.LENDER_SAVE_NEW_LENDER_SELECTED,
			lenderData
		}
	},
	getLendersSuccess: function (lenders) {
		return {
			type: actionTypes.LENDERS_GET_LENDERS_SUCCESS,
			lenders
		}

	},
	saveNewLenderSuccessful: function () {
		return {
			type: actionTypes.LENDER_SAVE_NEW_LENDER_SUCCESSFUL,
		}
	},
	filteringByName: function(name) {
		return {
			type: actionTypes.LENDERS_FILTERING_BY_NAME,
			name,
		}
	},
	filteringByPlan: function(plan) {
		return {
			type: actionTypes.LENDERS_FILTERING_BY_PLAN,
			plan,
		}
	},
	filteringBySpeciality: function(speciality) {
		return {
			type: actionTypes.LENDERS_FILTERING_BY_SPECIALITY,
			speciality,
		}
	},
}

export default lenderActions
