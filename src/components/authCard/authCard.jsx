import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import {Card} from "react-bootstrap"
import Button from "react-bootstrap/Button"
import placeholder from 'assets/images/placeholder.jpg'

class AuthCard extends PureComponent {
	render() {
		return (
			<div className='list-lender'>
				<Card>
					<Card.Header as='h4'><b>{this.props.name}</b></Card.Header>
					<Card.Body>
						<div className='card-container'>
							<div className='auth-field'>
								<p className='items-title'>Especialidad:</p>
								<p className='items-field'>{ this.props.speciality }</p>
							</div>
							<div className='auth-field'>
								<p className='items-title'>Plan de cobertura inicial:</p>
								<p className='items-field'>{this.props.plan}</p>
							</div>
							<img className='auth-img' src={this.props.imgUrl} />
							<div className='auth-field'>
								<p className='items-title'>Estado de la Autorización:</p>
								<p className='items-field'>{this.props.status}</p>
							</div>
						</div>
						<div className='card-buttons'>
							<div className='card-buttons-size'>
								<Button className='modify-button-card' variant="primary" onClick={() => { this.props.authSelectedHandler(this.props.authId) }}>Modificar estado</Button>
							</div>
						</div>
					</Card.Body>
				</Card>
			</div>
		)

	}
}

AuthCard.defaultProps = {
	authId: '0',
	name: '',
	speciality: [],
	type: '',
	plan: '',
	status: '',
	imgUrl: '',
}

AuthCard.propTypes = {
	authId: PropTypes.string,
	name: PropTypes.string,
	speciality: PropTypes.string,
	type: PropTypes.string,
	plan: PropTypes.string,
	status: PropTypes.string,
	imgUrl: PropTypes.string,
}

export default AuthCard
