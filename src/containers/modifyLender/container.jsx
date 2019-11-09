import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import bindActionsToDispatch from 'helpers/bindActionsToDispatch'

import lenderActions from 'redux/actions/lenderActions'
import { lendersSelectors } from 'redux/selectors'
import ModifyLender from 'views/modifyLender/modifyLender'
import generalActions from "../../redux/actions/generalActions"


class ModifyLendersContainer extends PureComponent {

	componentDidMount() {
		this.props.actions.initializeRoute(this.props.match.params.id)
		window.scrollTo(0, 0)
	}

	render() {
		return(
			<ModifyLender
				id={this.props.match.params.id}
				selected={this.props.selected}
				plans={this.props.plans}
				types={this.props.types}
				languages={this.props.languages}
				specialities={this.props.specialities}
				zones={this.props.zones}
				modifyLenderSelectedHandler={this.props.actions.modifyLenderSave}
				mapWidth={this.props.mapWidth}
				mapHeight={this.props.mapHeight}
			/>
		)
	}
}

function mapStateToProps(state) {
	return lendersSelectors.modifyLenderSelector(state)
}

function mapDispatchToProps(dispatch) {
	return bindActionsToDispatch({
		modifyLenderSave: lenderActions.modifyLenderSave,
		initializeRoute: generalActions.modifyLenderInitialize,
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ModifyLendersContainer)
