import actionTypes from './actionTypes'

const providerActions = {
	addNewProviderSelected: function() {
		return {
			type: actionTypes.PROVIDER_ADD_NEW_PROVIDER_SELECTED,
		}
	},
	saveNewProviderSelected: function(providerData) {
		return {
			type: actionTypes.PROVIDER_SAVE_NEW_PROVIDER_SELECTED,
			providerData
		}
	},
	getProvidersSuccess: function (providers) {
		return {
			type: actionTypes.PROVIDERS_GET_PROVIDERS_SUCCESS,
			providers
		}

	},
	saveNewProviderSuccessful: function () {
		return {
			type: actionTypes.PROVIDER_SAVE_NEW_PROVIDER_SUCCESSFUL,
		}
	}
}

export default providerActions
