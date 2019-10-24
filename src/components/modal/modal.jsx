import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal } from "react-bootstrap"

import './modal.css'

class ModalCustom extends PureComponent {

	render() {
		const handleClose = this.props.handleClose
		const handleAccept = this.props.handleAccept
		const show = this.props.show

		return (
			<>
				<Modal show={show} onHide={handleClose} animation={false}>
					<Modal.Header closeButton>
						<Modal.Title>{this.props.title}</Modal.Title>
					</Modal.Header>
					<Modal.Body>{this.props.message}</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							No
						</Button>
						<Button className='modify-button-card' variant="primary" onClick={handleAccept}>
							Si
						</Button>
					</Modal.Footer>
				</Modal>
			</>
		)
	}
}

ModalCustom.defaultProps = {
	title: '',
	message: '',
	show: false,
}

ModalCustom.propTypes = {
	title: PropTypes.string,
	message: PropTypes.string,
	show: PropTypes.bool,
	handleClose: PropTypes.func.isRequired,
	handleAccept: PropTypes.func.isRequired,
}

export default ModalCustom
