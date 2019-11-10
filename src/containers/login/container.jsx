import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import bindActionsToDispatch from 'helpers/bindActionsToDispatch'

import { userSelectors } from 'redux/selectors'
import loginActions from 'redux/actions/loginActions'

import Login from 'views/login/login'

class LoginContainer extends PureComponent {
	render() {
		return(
			<Login
				onLogin={this.props.actions.onLogin}
				validated={this.props.validated}
			/>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionsToDispatch({
		onLogin: loginActions.loginButtonClicked,
	}, dispatch)
}

function mapStateToProps(state) {
	return userSelectors.userLoginSelector(state)
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
