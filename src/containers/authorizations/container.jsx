import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import bindActionsToDispatch from 'helpers/bindActionsToDispatch'

import authorizationsActions from 'redux/actions/authorizationsActions'
import { authorizationsSelectors } from 'redux/selectors'
import Authorizations from 'views/authorizations/authorizations'
import generalActions from "redux/actions/generalActions"

class AuthorizationsContainer extends PureComponent {

	componentDidMount() {
		this.props.actions.initializeRoute()
	}

	render() {
		return(
			<Authorizations
				listOfAuthorizations={this.props.authorizations}
				specialities={this.props.specialities}
				status={this.props.status}
				filterByName={this.props.actions.filteringByName}
				filterBySpeciality={this.props.actions.filteringBySpeciality}
				filterByStatus={this.props.actions.filteringByStatus}
				authSelectedHandler={this.props.actions.authSelectedHandler}
			/>
		)
	}
}

function mapStateToProps(state) {
	return authorizationsSelectors.listOfAuthorizationsSelector(state)
}

function mapDispatchToProps(dispatch) {
	return bindActionsToDispatch({
		initializeRoute: generalActions.authorizationsRouteInitialize,
		authSelectedHandler: authorizationsActions.authorizationSelected,
		filteringByName: authorizationsActions.filteringByName,
		filteringByStatus: authorizationsActions.filteringByStatus,
		filteringBySpeciality: authorizationsActions.filteringBySpeciality,
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationsContainer)
