import generalActions from './generalActions'
import loginActions from './loginActions'
import providerActions from './providerActions'
import specialitiesActions from './specialitiesActions'

const actions = {
    ...generalActions,
    ...loginActions,
    ...providerActions,
    ...specialitiesActions,
}

export default actions
