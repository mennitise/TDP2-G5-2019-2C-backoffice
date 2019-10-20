import { createSelector } from 'reselect'
import plans from 'helpers/enums/plans'

const getAuthorizations = (state) => state.authorizations
const getSpecialities = (state) => state.specialities.list

const list_of_authorizations_selector = createSelector(
	[ getAuthorizations, getSpecialities ],
	(authorizations, specialities) => {

		let authorizationsToShow = authorizations.list.map(p => {
			return {
				...p,
				specialities: p.specialties,
				location: p.offices,
				email: p.emails,
				type: (p.type === 'PROFESIONAL') ? 'Profesional' : 'Clinica/Sanatorio'
			}
		})

		const specialitiesList = [{value:0, label:'Especialidad'}, ...specialities.map(sp => ({value: sp.id, label: sp.name}))]

		const plansList = ['Plan', ...Object.values(plans)]

		if (authorizations.filter.name) {
			authorizationsToShow = authorizationsToShow.filter(auth => auth.name.toLowerCase().includes(authorizations.filter.name.toLowerCase()))
		}

		if (authorizations.filter.speciality) {
			const specialityFiltered = specialities.filter(sp => sp.id == authorizations.filter.speciality)[0].name
			authorizationsToShow = authorizationsToShow.filter(auth => auth.specialities.indexOf(specialityFiltered) >= 0)
		}

		if (authorizations.filter.plan) {
			authorizationsToShow = authorizationsToShow.filter(auth => auth.plan === plansList[authorizations.filter.plan])
		}

		return {
			authorizations: authorizationsToShow,
			specialities: specialitiesList,
			plans: plansList,
		}
	}
)

export default list_of_authorizations_selector
