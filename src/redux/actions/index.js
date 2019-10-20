import generalActions from './generalActions'
import loginActions from './loginActions'
import lenderActions from './lenderActions'
import authorizationsActions from './authorizationsActions'
import specialitiesActions from './specialitiesActions'

const actions = {
    ...authorizationsActions,
    ...generalActions,
    ...loginActions,
    ...lenderActions,
    ...specialitiesActions,
}

export default actions
