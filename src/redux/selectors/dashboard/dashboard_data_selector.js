import { createSelector } from 'reselect'

const getUI = state => state.ui
const getMetrics = state => state.metrics

const dashboard_data_selector = createSelector(
	[ getUI, getMetrics ],
	(ui, metrics) => {

		return ({
			width: ui.width,
			height: ui.height,
			authData: metrics.authorizations,
			affiliatesData: metrics.affiliates,
		})
	}
)

export default dashboard_data_selector
