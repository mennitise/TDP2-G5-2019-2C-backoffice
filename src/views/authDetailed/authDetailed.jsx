import React, { PureComponent, Fragment } from 'react'
import translations from 'helpers/enums/translations'
import Button from "react-bootstrap/Button"
import { Form } from "react-bootstrap"
import authorizationStatus from "helpers/enums/authorizationStatus"

class AuthDetailed extends PureComponent {

	constructor(props){
		super(props)
		this.state = {
			status: this.props.authorization ? this.props.authorization.status : '',
			observations: '',
			initialStatus: this.props.authorization ? this.props.authorization.status : '',
		}
	}

	componentDidMount() {
		window.scrollTo(0, 0)
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.authorization !== this.props.authorization) {
			const initialStatus = this.state.initialStatus ? this.state.initialStatus :this.props.authorization.status
			this.setState({
				...this.state,
				status: this.props.authorization.status,
				initialStatus,
			})
		}
	}

	onChangeStatus = status => {
		this.setState({
			...this.state,
			status: Object.keys(authorizationStatus)[status.target.value],
		})
	}

	onChangeObservations = status => {
		this.setState({
			...this.state,
			observations: status.target.value,
		})
	}

	changeAuthorizationStatusHandler = () => {
		const cases = {}
		cases[Object.keys(authorizationStatus)[0]] = null//authorizationsActions.pendingAuthorization // In case of need return to pending
		cases[Object.keys(authorizationStatus)[1]] = this.props.authorizeAuthorizationHandler
		cases[Object.keys(authorizationStatus)[2]] = this.props.rejectAuthorizationHandler
		cases[Object.keys(authorizationStatus)[3]] = this.props.needMoreInformationHandler
		const neededAction = cases[this.state.status]
		if (neededAction) neededAction(this.props.authorization.id, this.state.observations)
	}

	render() {
		return(
			<div className='wrapper-lenders list list-wrapper'>
				<h2 className='top-title add-lender-left'>Detalles de la Autorización</h2>
				{ this.props.authorization &&
					<div className='card-container'>
						{this.props.authorization.name &&
							<div className='auth-field'>
								<p className='items-title'>Paciente:</p>
								<p className='items-field'>{this.props.authorization.name}</p>
							</div>
						}
						{this.props.authorization.speciality &&
							<div className='auth-field'>
								<p className='items-title'>Especialidad:</p>
								<p className='items-field'>{this.props.authorization.speciality}</p>
							</div>
						}
						{this.props.authorization.plan &&
							<div className='auth-field'>
								<p className='items-title'>Plan de cobertura inicial:</p>
								<p className='items-field'>{this.props.authorization.plan}</p>
							</div>
						}
						{this.props.authorization.imgUrl &&
							<img className='auth-img-detailed' src={this.props.authorization.imgUrl} alt='No se pudo cargar la autorización'/>
						}
						{this.props.authorization.status &&
							<div className='auth-status'>
								<p className='items-title-status'>Estado de la Autorización:</p>
								<div className='items-field-status'>
									<Form.Control required as="select" onChange={this.onChangeStatus} >
										{this.props.statuses.map((t, i) => {
											if (i === 0) return (<option selected hidden key={`type-${i}`} value={i}>{t}</option>)
											if (authorizationStatus[this.state.status] === t) return (<option selected key={`type-${i}`} value={i}>{t}</option>)
											return (<option key={`type-${i}`} value={i}>{t}</option>)
										})}
									</Form.Control>
								</div>
									<Fragment>
										<p className='items-title-status'>Observaciones:</p>
										<div className='items-field-status'>
											{ this.state.initialStatus === Object.keys(authorizationStatus)[0] &&
												<Form.Control
													required
													as="textarea"
													onChange={this.onChangeObservations}
													placeholder={`${translations.SPANISH.enter} observaciones`} />
											}
											{ this.state.initialStatus !== Object.keys(authorizationStatus)[0] &&
												<p>{this.props.authorization.observations}</p>
											}
										</div>
									</Fragment>
							</div>
						}
					</div>
				}
				<div className='card-buttons'>
					<div className='card-buttons-size'>
						<Button className='modify-button-card' variant="primary" onClick={() => { this.changeAuthorizationStatusHandler() }}>Guardar</Button>
					</div>
				</div>
			</div>
		)
	}
}

export default AuthDetailed