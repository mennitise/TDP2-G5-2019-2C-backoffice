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
    providersRouteInitialize: function(){
        return {
            type: actionTypes.PROVIDERS_ROUTE_INITIALIZE,
        }
    },
}

export default generalActions
