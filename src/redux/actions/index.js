import generalActions from './generalActions'
import loginActions from './loginActions'
import lenderActions from './lenderActions'
import authorizationsActions from './authorizationsActions'
import specialitiesActions from './specialitiesActions'
import metricsActions from './metricsActions'

const actions = {
    ...authorizationsActions,
    ...generalActions,
    ...loginActions,
    ...lenderActions,
    ...specialitiesActions,
    ...metricsActions,
}

export default actions
