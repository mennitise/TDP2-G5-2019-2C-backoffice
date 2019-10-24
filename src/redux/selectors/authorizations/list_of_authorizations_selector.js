import { createSelector } from 'reselect'
import status from 'helpers/enums/authorizationStatus'

const getAuthorizations = (state) => state.authorizations
const getSpecialities = (state) => state.specialities.list

const list_of_authorizations_selector = createSelector(
	[ getAuthorizations, getSpecialities ],
	(authorizations, specialities) => {

		let authorizationsToShow = authorizations.list.map(auth => ({
			id: auth.id,
			name: `${auth.affiliate.firstname} ${auth.affiliate.lastname}`,
			speciality: auth.specialty.name,
			specialityId: auth.specialtyId,
			plan: 'A210',
			status: auth.status,
			imgUrl: auth.url,
		}))

		const specialitiesList = specialities.map(sp => ({value: sp.id, label: sp.name}))

		if (authorizations.filter.name) {
			authorizationsToShow = authorizationsToShow.filter(auth => auth.name.toLowerCase().includes(authorizations.filter.name.toLowerCase()))
		}

		if (authorizations.filter.speciality) {
			const specialityFiltered = specialities.filter(sp => sp.id.toString() === authorizations.filter.speciality)[0].name
			authorizationsToShow = authorizationsToShow.filter(auth => auth.speciality === specialityFiltered)
		}

		if (authorizations.filter.status) {
			authorizationsToShow = authorizationsToShow.filter(auth => auth.status === Object.keys(status)[authorizations.filter.status - 1])
		}

		return {
			authorizations: authorizationsToShow,
			specialities: specialitiesList,
			status: Object.values(status),
		}
	}
)

export default list_of_authorizations_selector
