import { createSelector } from 'reselect'
import userRoles from 'helpers/enums/userRoles'

const getUser = (state) => state.user
const user_login_selector = createSelector(
	[ getUser ],
	(user) => {
		return ({
			validated: user.validated,
		})
	}
)

export default user_login_selector
