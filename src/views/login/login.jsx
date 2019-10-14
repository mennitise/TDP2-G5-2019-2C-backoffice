import React, {PureComponent} from 'react'
import Form from 'react-bootstrap/Form'

import translations from 'helpers/enums/translations'
import { Button } from 'react-bootstrap'
import browserHistory from 'helpers/history'

import logo from 'assets/images/login_logo.png'
import './login.css'

class Login extends PureComponent {

	handleSubmit = event => {
		event.preventDefault()
		event.stopPropagation()
		this.props.onLogin()
		browserHistory.push('/main/lenders')
	}

	render() {
		return(
			<div className='login'>
				<img src={logo} className='login-logo' alt="logo" />				
				<Form className='login-form' onSubmit={this.handleSubmit}>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>{translations.SPANISH.username}</Form.Label>
						<Form.Control type="string" placeholder={`${translations.SPANISH.enter} ${translations.SPANISH.username}`} />
					</Form.Group>
					<Form.Group controlId="formBasicPassword">
						<Form.Label>{translations.SPANISH.password}</Form.Label>
						<Form.Control type="password" placeholder={`${translations.SPANISH.enter} ${translations.SPANISH.password}`} />
					</Form.Group>
					<div className='form-login-submit' >
						<Button variant="primary" type="submit">
							{translations.SPANISH.signin}
						</Button>
						<Button variant="secondary" type="submit">
							{translations.SPANISH.signup}
						</Button>
					</div>
				</Form>
			</div>
		)
	}
}

export default Login
