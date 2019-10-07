import { createSelector } from 'reselect'

const getProviders = state => state.providers
const getSpecialities = state => state.specialities.list
const getZones = state => state.zones.list

const add_new_provider_selector = createSelector(
	[ getProviders, getSpecialities, getZones ],
	(providers, specialities, zones) => {

		const plans = ['Selecciona un plan', 'A110', 'A210', 'A310']
		const types = ['Selecciona un tipo', 'Profesional', 'Sanatorio/Clínica']
		const languages = [
			{label: 'Español', value: 1},
			{label: 'Inglés', value: 2}
		]
		const specialitiesToShow = specialities.map(sp => ({value: sp.id, label: sp.name}))
		const zonesToShow = [{name: 'Selecciona una localidad', id:''}, ...zones]


		return {
			plans,
			types,
			languages,
			specialities: specialitiesToShow,
			zones: zonesToShow,
		}
	}
)

export default add_new_provider_selector
