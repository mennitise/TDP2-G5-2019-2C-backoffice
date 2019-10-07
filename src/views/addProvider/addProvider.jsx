import React, {PureComponent} from 'react'
import {Button, Form} from "react-bootstrap";
import translations from 'helpers/enums/translations'
import add from 'assets/images/add.svg'
import Select from 'react-select';

class AddProvider extends PureComponent {

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

	addEmail = ev => {
		const emails = [...this.state.emails]
		emails.push(null)

		this.setState({
			...this.state,
			emails,
		})
	}

	addAddress = ev => {
		const addresses = [...this.state.addresses]
		addresses.push({address: null, phone: null})
		this.setState({
			...this.state,
			addresses,
		})
	}

	saveProviderHandler = () => {
		this.props.saveNewProviderSelectedHandler(
			this.state
		)
	}

	render() {
		const handleSubmit = event => {
			event.preventDefault();
			event.stopPropagation();
			const form = event.currentTarget

			if (form.checkValidity()) {
				this.saveProviderHandler()
			}

			this.setState({
				...this.state,
				validated: true,
			})
		}
		return(
			<div className='wrapper-add-provider'>
				<Form noValidate validated={this.state.validated} className='add-provider-form' onSubmit={handleSubmit}>
					<h2 className='new-provider'>Alta de Prestador</h2>


					<Form.Group className='form-group' controlId="formName">
						<Form.Label>Nombre</Form.Label>
						<Form.Control required type="string" onChange={this.onNameChange} placeholder={`${translations.SPANISH.enter} nombre`} />
						<Form.Control.Feedback className='error-message' type="invalid"> Por favor, ingrese el Nombre. </Form.Control.Feedback>
					</Form.Group>


					<Form.Group className='form-group' controlId="formSpecialities">
						<Form.Label>Especialidades</Form.Label>
						<div className='add-provider-specialities'>
							<Select
								required
								defaultValue={[]}
								isMulti
								name="colors"
								onChange={this. onSpecialitiesChange}
								options={this.props.specialities}
								className="basic-multi-select"
								classNamePrefix="select"
								placeholder='Selecciona las especialidades'
							/>
							{(this.state.validated && this.state.specialities.length <= 0) &&
								<p className='error-message'>Por favor seleccione como mínimo una especialidad</p>
							}
						</div>
					</Form.Group>


					<Form.Group className='form-group' controlId="formTypes">
						<Form.Label>Tipo</Form.Label>
						<Form.Control required as="select" onChange={this.onTypeChange} >
							{this.props.types.map((t, i) => {
								if (i===0) return (<option key={`type-${i}`} value='' disabled selected hidden >{t}</option>)
								return (<option key={`type-${i}`} value={i}>{t}</option>)
							})}
						</Form.Control>
						<Form.Control.Feedback className='error-message' type="invalid"> Por favor, seleccione un tipo. </Form.Control.Feedback>
					</Form.Group>


					<Form.Group className='form-group' controlId="formPlan">
						<Form.Label>Plan de cobertura inicial</Form.Label>
						<Form.Control required as="select" value={this.state.plan} onChange={this.onPlanChange} >
							{ this.props.plans.map((p, i) => {
								if (i===0) return (<option key={`plan-${i}`} value='' disabled selected hidden >{p}</option>)
								return (<option key={`plan-${i}`} value={i}>{p}</option>)
							})}
						</Form.Control>
						<Form.Control.Feedback className='error-message' type="invalid"> Por favor, seleccione un plan. </Form.Control.Feedback>
					</Form.Group>


					<Form.Group className='form-group' controlId='formLanguages'>
						<Form.Label>Idiomas</Form.Label>
						<div className='add-provider-languages'>
							<Select
								required
								defaultValue={[]}
								isMulti
								name="colors"
								onChange={this.onLanguagesChange}
								options={this.props.languages}
								className="basic-multi-select"
								classNamePrefix="select"
								placeholder='Selecciona los lenguajes'
							/>
						</div>
						{(this.state.validated && this.state.languages.length <= 0) &&
							<p className='error-message'>Por favor seleccione como mínimo un lenguaje</p>
						}
					</Form.Group>


					<Form.Group className='form-group' controlId='formEmails'>
						<div className='email-wrapper' onClick={this.addProviderHandler}>
							<Form.Label className='add-email-left'>Emails</Form.Label>
							<div className='add-email-right' onClick={this.addEmail}>
								<img className='add-email-img' src={add}/>
								<h5 className='add-email-text'>Agregar Email</h5>
							</div>
						</div>
						{this.state.emails.map((email, i) => (
							<div key={`email-${i}`} className='multiple-fields'>
								<Form.Control
									required={i===0}
									onChange={ev => { this.onEmailsChange(ev, i) }}
									type="email"
									placeholder={`${translations.SPANISH.enter} un email`}/>
								<Form.Control.Feedback className='error-message' type="invalid"> Por favor, ingrese el email. </Form.Control.Feedback>
							</div>
						))}
					</Form.Group>


					<Form.Group className='form-group' controlId='formLocation'>
						<div className='email-wrapper' onClick={this.addProviderHandler}>
							<Form.Label  className='add-email-left'>Direcciones y Telefonos</Form.Label>
							<div className='add-email-right' onClick={this.addAddress}>
								<img className='add-email-img' src={add}/>
								<h5 className='add-email-text'>Agregar Dirección</h5>
							</div>
						</div>
						{ this.state.addresses.map((address, i) => (
							<div className='address' key={`address-${i}`}>
								{ (i > 0) &&
									<hr className='hr-addr'/>
								}
								<div className='form-address multiple-fields'>
									<div className='form-address-left'>
										<Form.Control
											required={ i === 0 }
											type="string"
											onChange={ev => { this.onAddressChange(ev.target.value, i) }}
											placeholder={`${translations.SPANISH.enter} dirección`} />
										<Form.Control.Feedback className='error-message' type="invalid"> Por favor, ingrese la direccion. </Form.Control.Feedback>
									</div>
									<div className='form-address-right'>
										<Form.Control
											type="string"
											onChange={ev => { this.onPhoneChange(ev.target.value, i) }}
											placeholder={`${translations.SPANISH.enter} teléfono`} />
									</div>
								</div>
								<div className='form-address multiple-fields'>
									<div className='form-address-lat-left'>
										<Form.Control
											required={ i === 0 }
											as="select"
											onChange={ev => { this.onZoneChange(ev.target.value, i)}} >
											{this.props.zones.map((p, i) => {
												if (i===0) return (<option key={`zones-${i}`} value={p.id} disabled selected hidden>{p.name}</option>)
												return (<option key={`zones-${i}`} value={p.id}>{p.name}</option>)
											})}
										</Form.Control>
										<Form.Control.Feedback className='error-message' type="invalid"> Por favor, ingrese una zona. </Form.Control.Feedback>
									</div>
									<div className='form-address-lat-middle'>
										<Form.Control
											required={ i === 0 }
											type="number"
											step='.000001'
											onChange={ev => { this.onLatitudeChange(ev.target.value, i) }}
											placeholder={`${translations.SPANISH.enter} Latitud`} />
										<Form.Control.Feedback className='error-message' type="invalid"> Por favor, ingrese latitud. </Form.Control.Feedback>
									</div>
									<div className='form-address-lat-right'>
										<Form.Control
											required={ i === 0 }
											type="number"
											step='.000001'
											onChange={ev => { this.onLongitudeChange(ev.target.value, i)}}
											placeholder={`${translations.SPANISH.enter} Longitud`} />
										<Form.Control.Feedback className='error-message' type="invalid"> Por favor, ingrese longitud. </Form.Control.Feedback>
									</div>
								</div>

							</div>
						))}
					</Form.Group>


					<div className='form-login-submit' >
						<Button className='button-submit' variant="primary" type="submit">
							Guardar
						</Button>
					</div>
				</Form>
			</div>
		)
	}
}

export default AddProvider
