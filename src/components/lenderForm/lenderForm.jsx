import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import translations from 'helpers/enums/translations'
import './lenderForm.css'
import {Button, Form} from "react-bootstrap"
import Select from "react-select"
import add from 'assets/images/add.svg'

class LenderForm extends PureComponent {

	constructor(props) {
		super(props)
		this.state = {
			validated: false,
		}
	}

	render() {
		const handleSubmit = event => {
			event.preventDefault();
			event.stopPropagation();
			const form = event.currentTarget

			if (form.checkValidity()) {
				this.props.saveLenderHandler()
			}

			this.setState({
				...this.state,
				validated: true,
			})
		}

		return (
			<Form noValidate validated={this.state.validated} className='add-lender-form' onSubmit={handleSubmit}>
				<h2 className='new-lender'>Alta de Prestador</h2>


				<Form.Group className='form-group' controlId="formName">
					<Form.Label>Nombre</Form.Label>
					<Form.Control required type="string" onChange={this.props.onNameChange} placeholder={`${translations.SPANISH.enter} nombre`} />
					<Form.Control.Feedback className='error-message' type="invalid"> Nombre inválido </Form.Control.Feedback>
				</Form.Group>


				<Form.Group className='form-group' controlId="formSpecialities">
					<Form.Label>Especialidades</Form.Label>
					<div className='add-lender-specialities'>
						<Select
							required
							defaultValue={[]}
							isMulti
							name="colors"
							onChange={this.props.onSpecialitiesChange}
							options={this.props.specialities}
							className="basic-multi-select"
							classNamePrefix="select"
							placeholder='Selecciona las especialidades'
						/>
						{(this.state.validated && this.props.specialitiesSelected.length <= 0) &&
						<p className='error-message custom-error-message'>Especialidad inválida</p>
						}
					</div>
				</Form.Group>


				<Form.Group className='form-group' controlId="formTypes">
					<Form.Label>Tipo</Form.Label>
					<Form.Control required as="select" onChange={this.props.onTypeChange} >
						{this.props.types.map((t, i) => {
							if (i===0) return (<option key={`type-${i}`} value='' disabled selected hidden >{t}</option>)
							return (<option key={`type-${i}`} value={i}>{t}</option>)
						})}
					</Form.Control>
					<Form.Control.Feedback className='error-message' type="invalid">Tipo inválido</Form.Control.Feedback>
				</Form.Group>


				<Form.Group className='form-group' controlId="formPlan">
					<Form.Label>Plan de cobertura inicial</Form.Label>
					<Form.Control required as="select" value={this.props.planSelected} onChange={this.props.onPlanChange} >
						{ this.props.plans.map((p, i) => {
							if (i===0) return (<option key={`plan-${i}`} value='' disabled selected hidden >{p}</option>)
							return (<option key={`plan-${i}`} value={i}>{p}</option>)
						})}
					</Form.Control>
					<Form.Control.Feedback className='error-message' type="invalid">Plan inválido</Form.Control.Feedback>
				</Form.Group>


				<Form.Group className='form-group' controlId='formLanguages'>
					<Form.Label>Idiomas</Form.Label>
					<div className='add-lender-languages'>
						<Select
							required
							defaultValue={[]}
							isMulti
							name="colors"
							onChange={this.props.onLanguagesChange}
							options={this.props.languages}
							className="basic-multi-select"
							classNamePrefix="select"
							placeholder='Selecciona los idiomas'
						/>
					</div>
					{(this.state.validated && this.props.languagesSelected.length <= 0) &&
					<p className='error-message custom-error-message'>Idioma inválido</p>
					}
				</Form.Group>


				<Form.Group className='form-group' controlId='formEmails'>
					<div className='email-wrapper' onClick={this.props.addLenderHandler}>
						<Form.Label className='add-email-left'>Emails</Form.Label>
						<div className='add-email-right' onClick={this.props.addEmail}>
							<img className='add-email-img' src={add}/>
							<h5 className='add-email-text'>Agregar email</h5>
						</div>
					</div>
					{this.props.emailsSelected.map((email, i) => (
						<div key={`email-${i}`} className='multiple-fields'>
							<Form.Control
								required={i===0}
								onChange={ev => { this.props.onEmailsChange(ev, i) }}
								type="email"
								placeholder={`${translations.SPANISH.enter} un email`}/>
							<Form.Control.Feedback className='error-message' type="invalid">Email inválido</Form.Control.Feedback>
						</div>
					))}
				</Form.Group>


				<Form.Group className='form-group' controlId='formLocation'>
					<div className='email-wrapper' onClick={this.props.addLenderHandler}>
						<Form.Label  className='add-email-left'>Direcciones y teléfonos</Form.Label>
						<div className='add-email-right' onClick={this.props.addAddress}>
							<img className='add-email-img' src={add}/>
							<h5 className='add-email-text'>Agregar dirección</h5>
						</div>
					</div>
					{ this.props.addressesSelected.map((address, i) => (
						<div className='address' key={`address-${i}`}>
							{ (i > 0) &&
							<hr className='hr-addr'/>
							}
							<div className='form-address multiple-fields'>
								<div className='form-address-left'>
									<Form.Control
										required={ i === 0 }
										type="string"
										onChange={ev => { this.props.onAddressChange(ev.target.value, i) }}
										placeholder={`${translations.SPANISH.enter} dirección`} />
									<Form.Control.Feedback className='error-message' type="invalid">Dirección inválida</Form.Control.Feedback>
								</div>
								<div className='form-address-right'>
									<Form.Control
										type="string"
										onChange={ev => { this.props.onPhoneChange(ev.target.value, i) }}
										placeholder={`${translations.SPANISH.enter} teléfono`} />
								</div>
							</div>
							<div className='form-address multiple-fields'>
								<div className='form-address-lat-left'>
									<Form.Control
										required={ i === 0 }
										as="select"
										onChange={ev => { this.props.onZoneChange(ev.target.value, i)}} >
										{this.props.zones.map((p, i) => {
											if (i===0) return (<option key={`zones-${i}`} value={p.id} disabled selected hidden>{p.name}</option>)
											return (<option key={`zones-${i}`} value={p.id}>{p.name}</option>)
										})}
									</Form.Control>
									<Form.Control.Feedback className='error-message' type="invalid">Localidad inválida</Form.Control.Feedback>
								</div>
								<div className='form-address-lat-middle'>
									<Form.Control
										required={ i === 0 }
										type="number"
										step='.000001'
										onChange={ev => { this.props.onLatitudeChange(ev.target.value, i) }}
										placeholder={`${translations.SPANISH.enter} latitud`} />
									<Form.Control.Feedback className='error-message' type="invalid">Latitud inválida</Form.Control.Feedback>
								</div>
								<div className='form-address-lat-right'>
									<Form.Control
										required={ i === 0 }
										type="number"
										step='.000001'
										onChange={ev => { this.props.onLongitudeChange(ev.target.value, i)}}
										placeholder={`${translations.SPANISH.enter} longitud`} />
									<Form.Control.Feedback className='error-message' type="invalid">Longitud inválida</Form.Control.Feedback>
								</div>
							</div>
							{address.latitude && address.longitude &&
							<div className="mapouter">
								<div className="gmap_canvas">
									<iframe
										width={this.props.mapWidth}
										height={this.props.mapHeight}
										id="gmap_canvas"
										src={`https://maps.google.com/maps?q=${address.latitude},${address.longitude}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
										frameBorder="0"
										scrolling="no"
										marginHeight="0"
										marginWidth="0">
									</iframe>
								</div>
							</div>
							}
						</div>
					))}
				</Form.Group>


				<div className='form-login-submit' >
					<Button className='button-submit' variant="primary" type="submit">
						Guardar
					</Button>
				</div>
			</Form>
		)

	}
}

export default LenderForm
