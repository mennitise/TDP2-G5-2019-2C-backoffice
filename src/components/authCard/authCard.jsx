import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import authorizationStatus from "helpers/enums/authorizationStatus"

import {Card} from "react-bootstrap"

class AuthCard extends PureComponent {
	render() {
		return (
			<div className='list-auth' onClick={() => { this.props.authSelectedHandler(this.props.authId) }}>
				<Card className='list-auth-card'>
					<Card.Header as='h4'><b>{this.props.name}</b></Card.Header>
					<Card.Body>
						<div className='card-container'>
							<div className='auth-field'>
								<p className='items-title'>Especialidad:</p>
								<p className='items-field'>{this.props.speciality}</p>
							</div>
							<div className='auth-field'>
								<p className='items-title'>Plan de cobertura inicial:</p>
								<p className='items-field'>{this.props.plan}</p>
							</div>
							<img className='auth-img' src={this.props.imgUrl} alt=''/>
							<div className='auth-field'>
								<p className='items-title'>Estado de la Autorización:</p>
								<p className='items-field'>{authorizationStatus[this.props.status]}</p>
							</div>
						</div>
					</Card.Body>
				</Card>
			</div>
		)

	}
}

AuthCard.defaultProps = {
	authId: 0,
	name: '',
	speciality: [],
	type: '',
	plan: '',
	status: '',
	imgUrl: '',
}

AuthCard.propTypes = {
	authId: PropTypes.number,
	name: PropTypes.string,
	speciality: PropTypes.string,
	type: PropTypes.string,
	plan: PropTypes.string,
	status: PropTypes.string,
	imgUrl: PropTypes.string,
}

export default AuthCard
