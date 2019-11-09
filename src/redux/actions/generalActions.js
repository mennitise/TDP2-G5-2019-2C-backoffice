import actionTypes from './actionTypes'

const generalActions = {
    appInitialize: function(width, height) {
        return {
            type: actionTypes.APP_INITIALIZE,
            width, 
            height,
        }
    },
    windowResize: function(width, height) {
        return {
            type: actionTypes.WINDOW_RESIZE,
            width, 
            height,
        }
    },
    lendersRouteInitialize: function() {
        return {
            type: actionTypes.LENDERS_ROUTE_INITIALIZE,
        }
    },
    authorizationsRouteInitialize: function() {
        return {
            type: actionTypes.AUTHORIZATIONS_ROUTE_INITIALIZE,
        }
    },
    authorizationDetailsRouteInitialize: function(id) {
        return {
            type: actionTypes.AUTHORIZATIONS_AUTHORIZATION_DETAILS_ROUTE_INITIALIZE,
            id,
        }
    },
    modifyLenderInitialize: function(id) {
        return {
            type: actionTypes.LENDERS_MODIFY_LENDER_ROUTE_INITIALIZE,
            id,
        }
    }
}

export default generalActions
