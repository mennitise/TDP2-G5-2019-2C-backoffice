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
    lendersRouteInitialize: function(){
        return {
            type: actionTypes.LENDERS_ROUTE_INITIALIZE,
        }
    },
}

export default generalActions
