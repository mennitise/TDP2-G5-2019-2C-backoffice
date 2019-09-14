import { createSelector } from 'reselect'

const getUser = (state) => state.user
const user_name_selector = createSelector(
  [ getUser ],
  (user) => user.name
)

export default user_name_selector
