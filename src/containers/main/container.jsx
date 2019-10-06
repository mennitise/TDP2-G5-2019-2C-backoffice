import React, {PureComponent} from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import RegisterContainer from "containers/register/container"
import ProvidersContainer from "containers/providers/container"
import AddProviderContainer from "containers/addProvider/container"
import logo from "assets/images/login_logo.png"

class MainContainer extends PureComponent {
	render() {
		return (
			<div className='wrapper'>
				<div className='sidebar'>
					<div className='sidebar-logo'>
						<img src={logo} className='sidebar-logo-img' alt="logo" />
					</div>
					<ul className='list-options'>
						<li key='dash'>Dashboard</li>
						<li key='providers'>Prestadores</li>
						<li key='orders'>Autorizaciones</li>
					</ul>
				</div>
				<div className='content'>
					<Switch>
						<Route path={`${this.props.match.path}/register`} component={RegisterContainer}/>
						<Route path={`${this.props.match.path}/providers/add`} component={AddProviderContainer}/>
						<Route path={`${this.props.match.path}/providers`} component={ProvidersContainer}/>
						<Route path={`${this.props.match.path}/dash`} component={null} />
						<Redirect to="/login" />
					</Switch>
				</div>
			</div>
		)
	}
}

export default (MainContainer)
