import React, {PureComponent} from 'react'
import Form from 'react-bootstrap/Form'

import translations from 'helpers/enums/translations'
import { Button } from 'react-bootstrap'
import browserHistory from 'helpers/history'

import logo from 'assets/images/login_logo.png'
import './login.css'

class Login extends PureComponent {

	constructor(props) {
		super(props)
		this.state = {
			username: '',
			pass: '',
		}
	}

	handleSubmit = event => {
		event.preventDefault()
		event.stopPropagation()
		this.props.onLogin(this.state.username, this.state.pass)
	}

	onUsernameChange = ev => {
		this.setState({
			...this.state,
			username: ev.target.value,
		})
	}

	onPassChange = ev => {
		this.setState({
			...this.state,
			pass: ev.target.value,
		})
	}

	render() {
		console.log(this.state)
		return(
			<div className='login'>
				<img src={logo} className='login-logo' alt="logo" />				
				<Form className='login-form' onSubmit={this.handleSubmit}>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>{translations.SPANISH.username}</Form.Label>
						<Form.Control
							type="string"
							onChange={this.onUsernameChange}
							placeholder={`${translations.SPANISH.enter} ${translations.SPANISH.username}`} />
					</Form.Group>
					<Form.Group controlId="formBasicPassword">
						<Form.Label>{translations.SPANISH.password}</Form.Label>
						<Form.Control
							type="password"
							onChange={this.onPassChange}
							placeholder={`${translations.SPANISH.enter} ${translations.SPANISH.password}`} />
					</Form.Group>
					<div className='form-login-submit' >
						<Button variant="primary" type="submit">
							{translations.SPANISH.signin}
						</Button>
					</div>
				</Form>
			</div>
		)
	}
}

export default Login
