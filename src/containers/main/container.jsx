import React, {PureComponent} from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import bindActionsToDispatch from 'helpers/bindActionsToDispatch'

import RegisterContainer from "containers/register/container"
import LendersContainer from "containers/lenders/container"
import AddLenderContainer from "containers/addLender/container"

import sidebarActions from "redux/actions/sidebarActions"

import logo from "assets/images/login_logo.png"
import dashLogo from 'assets/images/dash.svg'
import docLogo from 'assets/images/doctor.svg'

class MainContainer extends PureComponent {
	render() {
		return (
			<div className='wrapper'>
				<div className='sidebar'>
					<div className='sidebar-logo'>
						<img src={logo} className='sidebar-logo-img' alt="logo" />
					</div>
					<ul className='list-options'>
						<li key='dash'>
							<img src={dashLogo} className='sidebar-logo-option' alt="logo" />
							<label>Dashboard</label>
						</li>
						<li key='lenders'>
							<img src={docLogo} className='sidebar-logo-option' alt="logo" />
							<label>Prestadores</label>
						</li>
						<li key='orders'>
							<img src={dashLogo} className='sidebar-logo-option' alt="logo" />
							<label>Autorizaciones</label>
						</li>
					</ul>
				</div>
				<div className='content'>
					<Switch>
						<Route path={`${this.props.match.path}/register`} component={RegisterContainer}/>
						<Route path={`${this.props.match.path}/lenders/add`} component={AddLenderContainer}/>
						<Route path={`${this.props.match.path}/lenders`} component={LendersContainer}/>
						<Route path={`${this.props.match.path}/dash`} component={null} />
						<Redirect to="/login" />
					</Switch>
				</div>
			</div>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionsToDispatch({
		dashboardSelected: sidebarActions.dashboardSelected,
		lendersSelected: sidebarActions.lendersSelected,
		autorizationsSelected: sidebarActions.autorizationsSelected,
	}, dispatch)
}

export default connect(null, mapDispatchToProps)(MainContainer)
