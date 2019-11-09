import { createSelector } from 'reselect'
import add_new_lender_selector from "./add_new_lender_selector"

const getLenders = state => state.lenders

const modify_lender_selector = createSelector(
	[ getLenders, add_new_lender_selector ],
	(lenders, lendersForm) => {

		let selectedLender = lenders.list.filter(lender => lender.id.toString() === lenders.selected)[0]

		if (!selectedLender) {
			selectedLender = {
				name: null,
				offices: [],
				type: null,
				specialities: [],
				plan: null,
				emails: [],
				languages: [],
			}
		} else {
			const plan = lendersForm.plans.indexOf(selectedLender.plan)
			const type = (selectedLender.type === 'PROFESIONAL') ? '1' : '2'
			const languages = lendersForm.languages
				.filter(l => selectedLender.languages.includes(l.label))
				.map(l => l.value)
			const specialities = lendersForm.specialities
				.filter(sp => selectedLender.specialties.includes(sp.label))
				.map(sp => sp.value)
			const offices = selectedLender.offices.map(address => ({
				...address,
				latitude: address.lat,
				longitude: address.lon,
				zone: lendersForm.zones.filter(zone => zone.name === address.zone)[0].id,
			}))

			selectedLender = {
				...selectedLender,
				offices,
				specialities,
				languages,
				type,
				plan,
			}
		}

		return {
			...lendersForm,
			selected: {
				...selectedLender,
			},
		}
	}
)

export default modify_lender_selector
