import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import bindActionsToDispatch from 'helpers/bindActionsToDispatch'

import loginActions from 'redux/actions/loginActions'

import Login from 'views/login/login'

class LoginContainer extends PureComponent {
	render() {
		return(
			<Login
				onLogin={this.props.actions.onLogin}
			/>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionsToDispatch({
		onLogin: loginActions.loginDataEntered,
	}, dispatch)
}

export default connect(null, mapDispatchToProps)(LoginContainer)
