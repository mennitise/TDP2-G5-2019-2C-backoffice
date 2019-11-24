import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import bindActionsToDispatch from 'helpers/bindActionsToDispatch'

import Dashboard from 'views/dashboard/dashboard'
import generalActions from "redux/actions/generalActions"
import { dashboardSelectors } from 'redux/selectors'


class DashboardContainer extends PureComponent {
	componentDidMount() {
		this.props.actions.initializeRoute()
	}

	render() {
		return(
			<Dashboard
				width={this.props.width}
				height={this.props.height}
				authorizations={this.props.authData}
				affiliates={this.props.affiliatesData}
			/>
		)
	}
}

function mapStateToProps(state) {
	return dashboardSelectors.dashboardDataSelector(state)
}

function mapDispatchToProps(dispatch) {
	return bindActionsToDispatch({
		initializeRoute: generalActions.dashboardRouteInitialize,
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer)
