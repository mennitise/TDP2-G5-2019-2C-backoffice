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
