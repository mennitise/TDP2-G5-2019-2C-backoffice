import React, {PureComponent} from 'react'
import { connect } from 'react-redux'

import Login from '../../views/login/login'

class LoginContainer extends PureComponent {
	render() {
		return(
			<Login />
		)
	}
}

export default connect(null, null)(LoginContainer)
