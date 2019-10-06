import { createSelector } from 'reselect'

const getproviders = (state) => state.providers.list

const list_of_providers_selector = createSelector(
    [ getproviders ],
    (providers) => {
        /*
        * Nombre
		* Tipo (prestador o clinica/sanatorio)
		* Idiomas
		* Especialidades (Usar genericas - tomar de la base de datos)
		* Plan
		* Direccion (1 o mas) - Cada direccion puede tener o no telefono (Puede ser mas de uno)
		* Mail (Puede ser mas de uno)
        * */

        const providersToShow = providers.map(p => {
            return {
                ...p,
                specialities: p.specialties,
                location: p.offices,
                email: p.emails,
                type: (p.type === 'PROFESIONAL') ? 'Prestador' : 'Clinica/Sanatorio'
            }
        })

        return {
            providers: providersToShow,
        }
    }
)

export default list_of_providers_selector
