import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import bindActionsToDispatch from 'helpers/bindActionsToDispatch'

import generalActions from "redux/actions/generalActions"
import AuthDetailed from 'views/authDetailed/authDetailed'

import { authorizationsSelectors } from 'redux/selectors'

class AuthorizationDetailedContainer extends PureComponent {

	componentDidMount() {
		this.props.actions.initializeRoute(this.props.match.params.id)
		window.scrollTo(0, 0)
	}

	render() {
		return (
			<AuthDetailed
				authorization={this.props.authorization}
				statuses={this.props.statuses}
			/>
		)
	}
}

function mapStateToProps(state) {
	return authorizationsSelectors.authorizationDetailsSelector(state)
}

function mapDispatchToProps(dispatch) {
	return bindActionsToDispatch({
		initializeRoute: generalActions.authorizationDetailsRouteInitialize,
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationDetailedContainer)