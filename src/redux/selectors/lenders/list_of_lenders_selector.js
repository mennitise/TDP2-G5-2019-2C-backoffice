import { createSelector } from 'reselect'
import plans from 'helpers/enums/plans'

const getLenders = (state) => state.lenders
const getSpecialities = (state) => state.specialities.list

const list_of_lenders_selector = createSelector(
    [ getLenders, getSpecialities ],
    (lenders, specialities) => {
        /*
        * Nombre
		* Tipo (profesional o clinica/sanatorio)
		* Idiomas
		* Especialidades (Usar genericas - tomar de la base de datos)
		* Plan
		* Direccion (1 o mas) - Cada direccion puede tener o no telefono (Puede ser mas de uno)
		* Mail (Puede ser mas de uno)
        * */

        let lendersToShow = lenders.list.map(p => {
            return {
                ...p,
                specialities: p.specialties,
                location: p.offices,
                email: p.emails,
                type: (p.type === 'PROFESIONAL') ? 'Profesional' : 'Clinica/Sanatorio'
            }
        })

        const specialitiesList = specialities.map(sp => ({value: sp.id, label: sp.name}))
        const plansList = Object.values(plans)

        if (lenders.filter.name) {
            lendersToShow = lendersToShow.filter(lender => lender.name.toLowerCase().includes(lenders.filter.name.toLowerCase()))
        }

        if (lenders.filter.speciality) {
            const specialityFiltered = specialities.filter(sp => sp.id.toString() === lenders.filter.speciality)[0].name
            lendersToShow = lendersToShow.filter(lender => lender.specialities.indexOf(specialityFiltered) >= 0)
        }

        if (lenders.filter.plan) {
            lendersToShow = lendersToShow.filter(lender => lender.plan === plansList[lenders.filter.plan])
        }

        return {
            lenders: lendersToShow,
            specialities: specialitiesList,
            plans: plansList,
        }
    }
)

export default list_of_lenders_selector
