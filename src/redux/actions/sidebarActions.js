import actionTypes from './actionTypes'

const sidebarActions = {
    dashboardSelected: function() {
		return {
			type: actionTypes.SIDEBAR_DASHBOARD_SELECTED,
		}
	},
    lendersSelected: function() {
		return {
			type: actionTypes.SIDEBAR_LENDERS_SELECTED,
		}
	},
    autorizationsSelected: function() {
		return {
			type: actionTypes.SIDEBAR_AUTORIZATIONS_SELECTED,
		}
	},
}

export default sidebarActions
