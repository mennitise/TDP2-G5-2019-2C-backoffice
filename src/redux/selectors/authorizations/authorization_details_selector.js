import { createSelector } from 'reselect'

import authorizationStatus from "helpers/enums/authorizationStatus"

const getAuthorizations = (state) => state.authorizations

const authorization_details_selector = createSelector(
	[ getAuthorizations ],
	(authorizations) => {

		const authorizationToShow = authorizations.list.filter(auth => auth.id == authorizations.selected)[0]
		const statuses = [...Object.values(authorizationStatus)]

		return {
			authorization: authorizationToShow,
			statuses,
		}
	}
)

export default authorization_details_selector
