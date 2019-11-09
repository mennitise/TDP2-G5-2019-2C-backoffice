import React, {PureComponent} from 'react'
import LenderForm from 'components/lenderForm/lenderForm'


class ModifyLender extends PureComponent {

	constructor(props) {
		super(props)
		this.state = {
			id: props.id,
			name: '',
			specialities: null,
			type: null,
			plan: '',
			languages: null,
			emails: [],
			addresses: [],
			validated: false,
			loaded: false,
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {

		if (!this.state.loaded) {

			let specialitiesSelected = null
			let languageSelected = null
			let typeSelected = null

			if (!this.state.specialties && this.props.selected && this.props.selected.specialties && this.props.specialities) {
				specialitiesSelected = this.props.specialities
					.filter(sp => this.props.selected.specialties.includes(sp.label))
					.map(sp => sp.value)
			}

			if (!this.state.languages && this.props.selected && this.props.selected.languages && this.props.languages) {
				languageSelected = this.props.languages
					.filter(l => this.props.selected.languages.includes(l.label))
					.map(l => l.value)
			}

			if (!this.state.type && this.props.selected && this.props.selected.type) {
				typeSelected = (this.props.selected.type === 'PROFESIONAL') ? '1' : '2'
			}

			const plans = ['Selecciona un plan', 'A110', 'A210', 'A310']
			const planSelected = plans.indexOf(this.props.selected.plan)

			if (!this.state.name && this.props.selected.name) {
				this.setState({
					...this.state,
					name: this.props.selected.name,
					specialities: specialitiesSelected,
					type: typeSelected,
					plan: planSelected,
					languages: languageSelected,
					emails: this.props.selected.emails,
					addresses: this.props.selected.offices.map(address => ({
						...address,
						latitude: address.lat,
						longitude: address.lon,
					})),
				})
			}
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
			specialities: (sps && sps.length) ? sps.map(s => s.value) : [],
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

	modifyLenderHandler = () => {
		this.props.modifyLenderSelectedHandler(this.state)
	}

	render() {
		return(
			<div className='wrapper-add-lender'>
				<LenderForm
					title={'Modificación de prestador'}
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

					saveLenderHandler={this.modifyLenderHandler}
					addAddress={this.addAddress}
					addEmail={this.addEmail}
				/>
			</div>
		)
	}
}

export default ModifyLender
