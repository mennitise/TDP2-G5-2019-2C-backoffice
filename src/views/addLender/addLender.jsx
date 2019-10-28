import React, {PureComponent} from 'react'
import LenderForm from 'components/lenderForm/lenderForm'

class AddLender extends PureComponent {

	constructor(props) {
		super(props)
		this.state = {
			name: '',
			specialities: [],
			type: null,
			plan: null,
			languages: [],
			emails: [null],
			addresses: [{address: null, phone: null, zone: null, latitude: null, longitude: null}],
			validated: false,
		}
	}

	onNameChange = ev => {
		this.setState({
			...this.state,
			name: ev.target.value,
		})
	}

	onSpecialitiesChange = sps => {
		this.setState({
			...this.state,
			specialities: (sps && sps.length) ? sps.map(s => {return s.value}) : [],
		})
	}

	onTypeChange = ev => {
		this.setState({
			...this.state,
			type: ev.target.value,
		})
	}

	onPlanChange = ev => {
		this.setState({
			...this.state,
			plan: ev.target.value,
		})
	}

	onLanguagesChange = lg => {
		this.setState({
			...this.state,
			languages: (lg && lg.length) ? lg.map(s => {return s.value}) : [],
		})
	}

	onEmailsChange = (ev, i) => {
		const emails = [...this.state.emails]
		emails[i] = ev.target.value
		this.setState({
			...this.state,
			emails
		})
	}

	onAddressChange = (v, i) => {
		const addresses = this.state.addresses.map((address, position) => {
			if(i === position) {
				return {
					...address,
					address: v,
				}
			}
			return address
		})
		this.setState({
			...this.state,
			addresses,
		})
	}

	onPhoneChange = (v, i) => {
		const addresses = this.state.addresses.map((address, position) => {
			if(i === position) {
				return {
					...address,
					phone: v,
				}
			}
			return address
		})
		this.setState({
			...this.state,
			addresses,
		})
	}

	onLatitudeChange = (v, i) => {
		const addresses = this.state.addresses.map((address, position) => {
			if(i === position) {
				return {
					...address,
					latitude: v,
				}
			}
			return address
		})
		this.setState({
			...this.state,
			addresses,
		})
	}

	onLongitudeChange = (v, i) => {
		const addresses = this.state.addresses.map((address, position) => {
			if(i === position) {
				return {
					...address,
					longitude: v,
				}
			}
			return address
		})
		this.setState({
			...this.state,
			addresses,
		})
	}

	onZoneChange = (v, i) => {
		const addresses = this.state.addresses.map((address, position) => {
			if(i === position) {
				return {
					...address,
					zone: v,
				}
			}
			return address
		})
		this.setState({
			...this.state,
			addresses,
		})
	}

	addEmail = () => {
		const emails = [...this.state.emails]
		emails.push(null)

		this.setState({
			...this.state,
			emails,
		})
	}

	addAddress = () => {
		const addresses = [...this.state.addresses]
		addresses.push({address: null, phone: null})
		this.setState({
			...this.state,
			addresses,
		})
	}

	saveLenderHandler = () => {
		this.props.saveNewLenderSelectedHandler(
			this.state
		)
	}

	render() {

		return(
			<div className='wrapper-add-lender'>
				<LenderForm
					name={this.state.name}
					onNameChange={this.onNameChange}

					specialities={this.props.specialities}
					specialitiesSelected={this.state.specialities}
					onSpecialitiesChange={this.onSpecialitiesChange}

					types={this.props.types}
					typeSelected={this.state.type}
					onTypeChange={this.onTypeChange}

					plans={this.props.plans}
					planSelected={this.state.plan}
					onPlanChange={this.onPlanChange}

					languages={this.props.languages}
					languagesSelected={this.state.languages}
					onLanguagesChange={this.onLanguagesChange}

					emailsSelected={this.state.emails}
					onEmailsChange={this.onEmailsChange}

					zones={this.props.zones}
					addressesSelected={this.state.addresses}
					onAddressChange={this.onAddressChange}
					onPhoneChange={this.onPhoneChange}
					onZoneChange={this.onZoneChange}
					onLatitudeChange={this.onLatitudeChange}
					onLongitudeChange={this.onLongitudeChange}
					mapWidth={this.props.mapWidth}
					mapHeight={this.props.mapHeight}

					saveLenderHandler={this.saveLenderHandler}
					addAddress={this.addAddress}
					addEmail={this.addEmail}
				/>
			</div>
		)
	}
}

export default AddLender
