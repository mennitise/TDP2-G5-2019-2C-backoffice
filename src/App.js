import React, { Component } from 'react'
import { connect } from 'react-redux';
import generalActions from './redux/actions/generalActions'
import { Route, Redirect, Switch } from 'react-router-dom'

import LoginContainer from './containers/login/container'

import './App.css'

class App extends Component {

	constructor(props) {
		super(props)
		window.addEventListener('resize', ()=>this.props.dispatch(generalActions.windowResize(window.innerWidth, window.innerHeight)))
		this.props.dispatch(generalActions.appInitialize(window.innerWidth, window.innerHeight/*, platform, window.top !== window.self*/))

	}

	render() {
		return (
			<div className='app'>
				<Switch>
					<Route path={'/login'} component={LoginContainer}/>
					<Route path={'/init'} component={null} />
					<Route path={'/dash'} component={null} />
					<Redirect to="/login" />
				</Switch>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return state
}

export default connect(mapStateToProps, null)(App)
