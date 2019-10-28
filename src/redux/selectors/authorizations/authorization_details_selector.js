import { createSelector } from 'reselect'

import authorizationStatus from "helpers/enums/authorizationStatus"

const getAuthorizations = (state) => state.authorizations

const authorization_details_selector = createSelector(
	[ getAuthorizations ],
	(authorizations) => {
		const authorizationSelected = authorizations.list.filter(auth => auth.id.toString() === authorizations.selected)[0]
		let authorizationToShow
		if (authorizationSelected) {
			authorizationToShow = {
				id: authorizationSelected.id,
				name: `${authorizationSelected.affiliate.firstname} ${authorizationSelected.affiliate.lastname}`,
				speciality: authorizationSelected.specialty.name,
				specialityId: authorizationSelected.specialtyId,
				plan: authorizationSelected.affiliate.plan,
				status: authorizationSelected.status,
				imgUrl: authorizationSelected.url,
			}
		}

		const statuses = [...Object.values(authorizationStatus)]

		return {
			authorization: authorizationToShow,
			statuses,
		}
	}
)

export default authorization_details_selector
