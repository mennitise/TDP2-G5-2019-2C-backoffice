import { createSelector } from 'reselect'

const getLenders = state => state.lenders
const getSpecialities = state => state.specialities.list
const getZones = state => state.zones.list
const getUI = state => state.ui

const add_new_lender_selector = createSelector(
	[ getLenders, getSpecialities, getZones, getUI ],
	(lenders, specialities, zones, ui) => {

		const plans = ['Selecciona un plan', 'A110', 'A210', 'A310']
		const types = ['Selecciona un tipo', 'Profesional', 'Sanatorio/Clínica']
		const languages = [
			{label: 'Español', value: 1},
			{label: 'Ingles', value: 2}
		]
		const specialitiesToShow = specialities.map(sp => ({value: sp.id, label: sp.name}))
		const zonesToShow = [{name: 'Selecciona una localidad', id:''}, ...zones]


		return {
			plans,
			types,
			languages,
			specialities: specialitiesToShow,
			zones: zonesToShow,
			mapWidth: (ui.width * 0.65),
			mapHeight: (ui.height * 0.5),
		}
	}
)

export default add_new_lender_selector
