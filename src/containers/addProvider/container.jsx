import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import bindActionsToDispatch from 'helpers/bindActionsToDispatch'

import providerActions from 'redux/actions/providerActions'
import { providersSelectors } from 'redux/selectors'
import AddProvider from 'views/addProvider/addProvider'


class AddProvidersContainer extends PureComponent {
	render() {
		return(
			<AddProvider
				plans={this.props.plans}
				types={this.props.types}
				languages={this.props.languages}
				specialities={this.props.specialities}
				zones={this.props.zones}
				saveNewProviderSelectedHandler={this.props.actions.saveNewProviderSelected}
			/>
		)
	}
}

function mapStateToProps(state) {
	return providersSelectors.addNewProviderSelector(state)
}

function mapDispatchToProps(dispatch) {
	return bindActionsToDispatch({
		saveNewProviderSelected: providerActions.saveNewProviderSelected,
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProvidersContainer)
