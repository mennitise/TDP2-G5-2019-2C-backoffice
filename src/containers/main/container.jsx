import React, {PureComponent} from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import bindActionsToDispatch from 'helpers/bindActionsToDispatch'

import UsersContainer from "containers/users/container"
import LendersContainer from "containers/lenders/container"
import AddLenderContainer from "containers/addLender/container"
import ModifyLenderContainer from 'containers/modifyLender/container'
import AuthorizationsContainer from 'containers/authorizations/container'
import AuthorizationDetailedContainer from 'containers/authDetailed/container'

import sidebarActions from "redux/actions/sidebarActions"
import { userSelectors } from 'redux/selectors'
import userRoles from 'helpers/enums/userRoles'

import logo from "assets/images/login_logo.png"
import dashLogo from 'assets/images/dash.svg'
import usersLogo from 'assets/images/users.svg'
import docLogo from 'assets/images/doctor.svg'
import authLogo from 'assets/images/authorizations.svg'

class MainContainer extends PureComponent {

	dashboardHandler = () => {
		return this.props.actions.dashboardSelected()
	}

	lendersHandler = () => {
		return this.props.actions.lendersSelected()
	}

	ordersHandler = () => {
		return this.props.actions.autorizationsSelected()
	}

	usersHandler = () => {
		return this.props.actions.usersSelected()
	}

	render() {
		return (
			<div className='wrapper'>
				<div className='sidebar'>
					<div className='sidebar-logo'>
						<img src={logo} className='sidebar-logo-img' alt="logo" />
					</div>
					<ul className='list-options'>
						<li onClick={this.dashboardHandler}>
							<div className='sidebar-logo-list'>
								<img src={dashLogo} className='sidebar-logo-option' alt="logo" />
								<label className='sidebar-logo-label'>Dashboard</label>
							</div>
						</li>
						{ this.props.rol === userRoles.ADMIN &&
							<li onClick={this.lendersHandler}>
								<div className='sidebar-logo-list'>
									<img src={docLogo} className='sidebar-logo-option' alt="logo" />
									<label className='sidebar-logo-label'>Prestadores</label>
								</div>
							</li>
						}
						{ this.props.rol === userRoles.AUDITOR &&
							<li onClick={this.ordersHandler}>
								<div className='sidebar-logo-list'>
									<img src={authLogo} className='sidebar-logo-option' alt="logo"/>
									<p className='sidebar-logo-label'>Autorizaciones</p>
								</div>
							</li>
						}
					</ul>
				</div>
				<div className='content'>
					<Switch>
						<Route path={`${this.props.match.path}/lenders/modify/:id`} component={ModifyLenderContainer}/>
						<Route path={`${this.props.match.path}/lenders/add`} component={AddLenderContainer}/>
						<Route path={`${this.props.match.path}/lenders`} component={LendersContainer}/>
						<Route path={`${this.props.match.path}/authorization/:id`} component={AuthorizationDetailedContainer}/>
						<Route path={`${this.props.match.path}/authorizations`} component={AuthorizationsContainer}/>
						<Route path={`${this.props.match.path}/dash`} component={null} />
						<Redirect to="/login" />
					</Switch>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return userSelectors.userMainSelector(state)
}

function mapDispatchToProps(dispatch) {
	return bindActionsToDispatch({
		dashboardSelected: sidebarActions.dashboardSelected,
		usersSelected: sidebarActions.usersSelected,
		lendersSelected: sidebarActions.lendersSelected,
		autorizationsSelected: sidebarActions.autorizationsSelected,
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)
