import { createSelector } from 'reselect'
import userRoles from 'helpers/enums/userRoles'

const getUser = (state) => state.user
const user_main_selector = createSelector(
  [ getUser ],
  (user) => {
  		return ({
			rol: user.rol,
  		})
  }
)

export default user_main_selector
