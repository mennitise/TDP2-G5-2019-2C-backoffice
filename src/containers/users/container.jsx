import React, {PureComponent} from 'react'
import { connect } from 'react-redux'

import Users from 'views/users/users'

class UsersContainer extends PureComponent {
	render() {
		return(
			<Users />
		)
	}
}

export default connect(null, null)(UsersContainer)
