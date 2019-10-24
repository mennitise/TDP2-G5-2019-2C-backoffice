import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import {Card} from "react-bootstrap"
import Button from "react-bootstrap/Button"

import './lenderCard.css'

class LenderCard extends PureComponent {
	render() {
		return (
			<div className='list-lender'>
				<Card>
					<Card.Header as='h4'><b>{this.props.name}</b></Card.Header>
					<Card.Body>
						<div className='card-container'>
							<p className='items-title'>{`Tipo: ${this.props.type}`}</p>
							<p className='items-title'>{`Plan de cobertura inicial: ${this.props.plan}`}</p>
							<p className='items-title'>Especialidades:</p>
							<p className='items'>
								{this.props.specialities.join(', ')}
							</p>
							<p className='items-title'>Direcciones:</p>
							{this.props.location.map((loc, idx) => {
								let text = `${loc.address} - ${loc.zone}`
								if (loc.phone) {
									text += ' - Teléfono: ' + loc.phone
								}

								text = `${text} - Latitud: ${loc.lat}; Longitud: ${loc.lon}`

								return(
									<p key={`location-${idx}`} className='items'>
										{text}
									</p>
								)
							})}
							<p className='items-title'>Emails:</p>
							{this.props.email.map((email, index) => {
								return (
									<p key={`email-${index}`} className='items'>
										{email}
									</p>
								)
							})}
							<p className='items-title'>Idiomas:</p>
							<p className='items'>
								{this.props.languages.join(', ')}
							</p>
						</div>
						<div className='card-buttons'>
							<div className='card-buttons-size'>
								<Button className='modify-button-card' variant="primary">Modificar</Button>
								<Button className='button-card' variant="secondary" onClick={() => {this.props.deleteHandler(this.props.id)} } >Borrar</Button>
							</div>
						</div>
					</Card.Body>
				</Card>
			</div>
		)

	}
}

LenderCard.defaultProps = {
	specialities: [],
	type: '',
	languages: [],
	plan: '',
	location: [{address: '', phone: ''}],
	email: [''],
}

LenderCard.propTypes = {
	name: PropTypes.string.isRequired,
	specialities: PropTypes.arrayOf(PropTypes.string),
	type: PropTypes.string,
	languages: PropTypes.arrayOf(PropTypes.string),
	plan: PropTypes.string,
	location: PropTypes.arrayOf(PropTypes.shape({
		address: PropTypes.string,
		phone: PropTypes.string
	})),
	email: PropTypes.arrayOf(PropTypes.string),
	deleteHandler: PropTypes.func.isRequired,
}

export default LenderCard
