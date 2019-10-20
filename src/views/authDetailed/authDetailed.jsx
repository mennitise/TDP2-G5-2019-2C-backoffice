import React, { PureComponent } from 'react'
import Button from "react-bootstrap/Button"
import {Form} from "react-bootstrap"

class AuthDetailed extends PureComponent {

	constructor(props){
		super(props)
		this.state = {
			status: this.props.authorization ? this.props.authorization.status : ''
		}
	}

	componentDidMount() {
		window.scrollTo(0, 0)
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.authorization !== this.props.authorization) {
			this.setState({
				...this.state,
				status: this.props.authorization.status
			})
		}
	}

	onChangeStatus = status => {
		this.setState({
			...this.state,
			status: status.target.value
		})
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
						<img className='auth-img' src={this.props.authorization.imgUrl}/>
						}
						{this.props.authorization.status &&
						<div className='auth-field'>
							<p className='items-title'>Estado de la Autorización:</p>
							<div className='items-field'>
								<Form.Control required as="select" onChange={this.onChangeStatus} >
									{this.props.statuses.map((t, i) => {
										if (this.state.status === t) return (<option selected key={`type-${i}`} value={i}>{t}</option>)
										return (<option key={`type-${i}`} value={i}>{t}</option>)
									})}
								</Form.Control>
							</div>
						</div>
						}
					</div>
				}
				<div className='card-buttons'>
					<div className='card-buttons-size'>
					<Button className='modify-button-card' variant="primary" onClick={() => { console.log(`Autorización ${this.props.authorization.id} se guarda en estado: ${this.state.status}`, this.state.status) }}>Guardar</Button>
					</div>
				</div>
			</div>
		)
	}
}

export default AuthDetailed