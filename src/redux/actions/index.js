import generalActions from './generalActions'
import loginActions from './loginActions'
import lenderActions from './lenderActions'
import specialitiesActions from './specialitiesActions'

const actions = {
    ...generalActions,
    ...loginActions,
    ...lenderActions,
    ...specialitiesActions,
}

export default actions
