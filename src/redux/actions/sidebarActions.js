import actionTypes from './actionTypes'

const sidebarActions = {
    dashboardSelected: function() {
		return {
			type: actionTypes.SIDEBAR_DASHBOARD_SELECTED,
		}
	},
	usersSelected: function() {
		return {
			type: actionTypes.SIDEBAR_USERS_SELECTED,
		}
	},
	lendersSelected: function() {
		return {
			type: actionTypes.SIDEBAR_LENDERS_SELECTED,
		}
	},
	autorizationsSelected: function() {
		return {
			type: actionTypes.SIDEBAR_AUTHORIZATIONS_SELECTED,
		}
	},
}

export default sidebarActions
