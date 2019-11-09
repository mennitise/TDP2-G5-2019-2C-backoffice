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
	modifyLender: function(id) {
		return {
			type: actionTypes.LENDER_MODIFY_LENDER,
			id,
		}
	},
	modifyLenderSave: function(lenderData) {
		return {
			type: actionTypes.LENDER_MODIFY_LENDER_SAVE,
			lenderData,
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
	deleteLender: function(id) {
		return {
			type: actionTypes.LENDER_DELETE_LENDER,
			id,
		}
	},
	deleteLenderSuccessful: function() {
		return {
			type: actionTypes.LENDER_DELETE_LENDER_SUCCESS,
		}
	}
}

export default lenderActions
