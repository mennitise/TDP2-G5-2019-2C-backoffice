import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import bindActionsToDispatch from 'helpers/bindActionsToDispatch'

import providerActions from 'redux/actions/providerActions'
import { providersSelectors } from 'redux/selectors'
import Providers from 'views/providers/providers'
import generalActions from "../../redux/actions/generalActions";

class ProvidersContainer extends PureComponent {

    componentDidMount() {
        this.props.actions.initializeRoute()
    }

    render() {
        return(
            <Providers
                listOfProviders={this.props.providers}
                addNewProviderSelectedAction={this.props.actions.addNewProviderSelected}
            />
        )
    }
}

function mapStateToProps(state) {
    return providersSelectors.listOfProvidersSelector(state)
}

function mapDispatchToProps(dispatch) {
    return bindActionsToDispatch({
        addNewProviderSelected: providerActions.addNewProviderSelected,
        initializeRoute: generalActions.providersRouteInitialize,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProvidersContainer)
