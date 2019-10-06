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

        const listOfProviders = [
            // {name: '', type: '', languages: [], specialities:[], plan: '', location: [{address: '', phone: ''}], email: ['']},
            {id: '1', name: 'Lorem Ipsum', type: 'Prestador', languages: ['Español'], specialities:['Pediatra'], plan: 'A210', location: [{address: 'Paseo Colon 850', phone: '0303-456'}], email: ['lorem.ipsum@gmail.com']},
            {id: '2', name: 'Clinica CRM', type: 'Clinica/Sanatorio', languages: ['Español', 'Ingles'], specialities:['Clínico', 'Pediatría', 'Obstetricia', 'Ginecología'], plan: 'A310', location: [{address: 'Calle Falsa 123', phone: '1234-5678'}], email: ['mail.falso@example.com']},
			{id: '3', name: 'Clinica CRM', type: 'Clinica/Sanatorio', languages: ['Español', 'Ingles'], specialities:['Clínico', 'Pediatría', 'Obstetricia', 'Ginecología'], plan: 'A310', location: [{address: 'Calle Falsa 123', phone: '1234-5678'}], email: ['mail.falso@example.com']},
        ]
        console.log(providers)

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
