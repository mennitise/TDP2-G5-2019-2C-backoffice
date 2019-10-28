import { createSelector } from 'reselect'
import status from 'helpers/enums/authorizationStatus'

const getAuthorizations = (state) => state.authorizations
const getSpecialities = (state) => state.specialities.list

const sortByDate = (a, b) => {
	const x = a.createdAt.toLowerCase()
	const y = b.createdAt.toLowerCase()
	if (x < y) {return -1}
	if (x > y) {return 1}
	return 0
}

const list_of_authorizations_selector = createSelector(
	[ getAuthorizations, getSpecialities ],
	(authorizations, specialities) => {

		let authorizationsToShow = authorizations.list.map(auth => ({
			id: auth.id,
			name: `${auth.affiliate.firstname} ${auth.affiliate.lastname}`,
			speciality: auth.specialty.name,
			specialityId: auth.specialtyId,
			plan: auth.plan,
			status: auth.status,
			imgUrl: auth.url,
			createdAt: auth.createdAt,
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
			authorizationsToShow = authorizationsToShow.filter(auth => auth.status === Object.keys(status)[authorizations.filter.status - 1]).sort(sortByDate)
		} else {
			authorizationsToShow = [
				...authorizationsToShow.filter(auth => auth.status === Object.keys(status)[0]).sort(sortByDate),
				...authorizationsToShow.filter(auth => {
						return (
							auth.status !== Object.keys(status)[0] &&
							Object.keys(status).includes(auth.status)
						)
					}
				),
			]
		}

		return {
			authorizations: authorizationsToShow,
			specialities: specialitiesList,
			status: Object.values(status),
		}
	}
)

export default list_of_authorizations_selector
