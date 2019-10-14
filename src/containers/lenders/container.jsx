import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import bindActionsToDispatch from 'helpers/bindActionsToDispatch'

import lenderActions from 'redux/actions/lenderActions'
import { lendersSelectors } from 'redux/selectors'
import Lenders from 'views/lenders/lenders'
import generalActions from "redux/actions/generalActions"

class LendersContainer extends PureComponent {

    componentDidMount() {
        this.props.actions.initializeRoute()
    }

    render() {
        return(
            <Lenders
                listOfLenders={this.props.lenders}
                addNewLenderSelectedAction={this.props.actions.addNewLenderSelected}
                specialities={this.props.specialities}
                plans={this.props.plans}
                filterByName={this.props.actions.filteringByName}
                filterBySpeciality={this.props.actions.filteringBySpeciality}
                filterByPlan={this.props.actions.filteringByPlan}
            />
        )
    }
}

function mapStateToProps(state) {
    return lendersSelectors.listOfLendersSelector(state)
}

function mapDispatchToProps(dispatch) {
    return bindActionsToDispatch({
        addNewLenderSelected: lenderActions.addNewLenderSelected,
        initializeRoute: generalActions.lendersRouteInitialize,
        filteringByName: lenderActions.filteringByName,
        filteringByPlan: lenderActions.filteringByPlan,
        filteringBySpeciality: lenderActions.filteringBySpeciality,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LendersContainer)
