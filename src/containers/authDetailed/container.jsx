import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import bindActionsToDispatch from 'helpers/bindActionsToDispatch'

import generalActions from "redux/actions/generalActions"
import authorizationsActions from "redux/actions/authorizationsActions"

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
				authorizeAuthorizationHandler={this.props.actions.authorizeAuthorizationHandler}
				rejectAuthorizationHandler={this.props.actions.rejectAuthorizationHandler}
				needMoreInformationHandler={this.props.actions.needMoreInformationHandler}
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
		rejectAuthorizationHandler: authorizationsActions.rejectAuthorization,
		authorizeAuthorizationHandler: authorizationsActions.authorizeAuthorization,
		needMoreInformationHandler: authorizationsActions.needMoreInformationAuthorization,
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationDetailedContainer)