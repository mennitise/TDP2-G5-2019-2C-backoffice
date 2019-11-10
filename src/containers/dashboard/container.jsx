import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import bindActionsToDispatch from 'helpers/bindActionsToDispatch'

import generalActions from 'redux/actions/generalActions'


class DashboardContainer extends PureComponent {
	componentDidMount() {
		this.props.actions.initializeRoute()
	}

	render() {
		return(
			<div className='wrapper-lenders list list-wrapper'>
				<h2 className='top-title add-lender-left'>Dashboard</h2>
			</div>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionsToDispatch({
		initializeRoute: generalActions.dashboardRouteInitialize,
	}, dispatch)
}

export default connect(null, mapDispatchToProps)(DashboardContainer)
