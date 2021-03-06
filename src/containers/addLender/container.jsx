import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import bindActionsToDispatch from 'helpers/bindActionsToDispatch'

import lenderActions from 'redux/actions/lenderActions'
import { lendersSelectors } from 'redux/selectors'
import AddLender from 'views/addLender/addLender'
import generalActions from "../../redux/actions/generalActions"


class AddLendersContainer extends PureComponent {
	componentDidMount() {
		this.props.actions.initializeRoute()
		window.scrollTo(0, 0)
	}

	render() {
		return(
			<AddLender
				plans={this.props.plans}
				types={this.props.types}
				languages={this.props.languages}
				specialities={this.props.specialities}
				zones={this.props.zones}
				saveNewLenderSelectedHandler={this.props.actions.saveNewLenderSelected}
				mapWidth={this.props.mapWidth}
				mapHeight={this.props.mapHeight}
			/>
		)
	}
}

function mapStateToProps(state) {
	return lendersSelectors.addNewLenderSelector(state)
}

function mapDispatchToProps(dispatch) {
	return bindActionsToDispatch({
		saveNewLenderSelected: lenderActions.saveNewLenderSelected,
		initializeRoute: generalActions.addLendersInitializeRoute,
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddLendersContainer)
