import React, {PureComponent} from 'react'

import './lenders.css'
import add from 'assets/images/add.svg'
import search from 'assets/images/search.svg'

import LenderCard from 'components/lenderCard/lenderCard.jsx'
import Paginated from "components/paginated/paginated.jsx"
import { Form } from "react-bootstrap"
import ModalCustom from "components/modal/modal"

class Lenders extends PureComponent {

	constructor(props) {
		super(props)
		this.state = {
			pages: [],
			pageSelected: 0,
			numberOfResults: 0,
			modalShow: false,
			lenderIdToDelete: 0,
		}
	}

	chunk = (arr, len) => {
		let chunks = [], i = 0, n = arr.length
		while (i < n) {
			chunks.push(arr.slice(i, i += len));
		}
		return chunks;
	}

	componentDidMount() {
		window.scrollTo(0, 0)
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.listOfLenders && prevProps.listOfLenders !== this.props.listOfLenders) {
			const pages = this.chunk(this.props.listOfLenders, 6)
			const pageSelected = (pages.length > 0) ? 1 : 0
			this.setState({
				pages,
				pageSelected,
				numberOfResults: this.props.listOfLenders.length,
			})
		}
	}

	onChangeFilterName = ev => {
		this.props.filterByName(ev.target.value)
	}

	onChangeFilterSpeciality = ev => {
		let filter = ''
		if (ev.target.value !== 'ALL') filter = ev.target.value
		this.props.filterBySpeciality(filter)
	}

	onChangeFilterPlan = ev => {
		this.props.filterByPlan(ev.target.value)
	}

	addLenderHandler = () => {
		this.props.addNewLenderSelectedAction()
	}

	pageSelected = (page) => {
		this.setState({
			...this.state,
			pageSelected: page,
		})
		window.scrollTo(0, 0)
	}

	nextPageSelected = () => {
		if (this.state.pageSelected < this.state.pages.length) {
			this.setState({
				...this.state,
				pageSelected: this.state.pageSelected + 1,
			})
		}
		window.scrollTo(0, 0)
	}

	prevPageSelected = () => {
		if (this.state.pageSelected > 1) {
			this.setState({
				...this.state,
				pageSelected: this.state.pageSelected - 1,
			})
		}
		window.scrollTo(0, 0)
	}

	handleClose = () => this.setState({...this.state, modalShow: false, lenderIdToDelete: 0})
	handleShow = (id) => this.setState({...this.state, modalShow: true, lenderIdToDelete: id})

	handleDeleteLender = () => {
		this.props.deleteLenderHandler(this.state.lenderIdToDelete)
		this.handleClose()
		window.scrollTo(0, 0)
	}

    render() {
		return(
			<div className='wrapper-lenders'>
				<ModalCustom
					title='Eliminación de Prestador'
					message='¿Estas seguro de eliminar este prestador?'
					show={this.state.modalShow}
					handleClose={this.handleClose}
					handleAccept={this.handleDeleteLender}
				/>
				<div className='list'>
					<div className='list-wrapper'>
						<div className='top-title' onClick={this.addLenderHandler}>
							<h2 className='add-lender-left'>Prestadores</h2>
							<div className='add-lender-right'>
								<img className='add-lender-img' src={add} alt='+'/>
								<h5 className='add-lender-text'>Agregar prestador</h5>
							</div>
						</div>
						<div className='filters'>
							<img className='filters-img' src={search} alt='Search'/>
							<Form.Control required className='filters-name' type="string" onChange={this.onChangeFilterName} placeholder={`Nombre`} />
							<div className='filters-speciality'>
								<Form.Control required as="select" onChange={this.onChangeFilterSpeciality} >
									<option key='placeholder' value='-1' hidden>Especialidad</option>
									<option key='placeholder' value='ALL'>TODAS</option>
									{this.props.specialities.map((t, i) => (<option key={`type-${i+1}`} value={i+1}>{t.label}</option>))}
								</Form.Control>
							</div>
							<div className='filters-plan'>
								<Form.Control required as="select" onChange={this.onChangeFilterPlan} >
									<option key='placeholder' value='-1' hidden>Plan</option>
									{this.props.plans.map((t, i) => (<option key={`type-${i}`} value={i}>{t}</option>))}
								</Form.Control>
							</div>
						</div>
						<div className='list-container'>
							{ (this.state.pageSelected !== 0) && (this.state.pages) && this.state.pages[this.state.pageSelected-1] &&
								this.state.pages[this.state.pageSelected-1].map((lender, index) => {
									return (
										<LenderCard
											key={`lender-${index}`}
											id={lender.id}
											name={lender.name}
											specialities={lender.specialities}
											type={lender.type}
											languages={lender.languages}
											plan={lender.plan}
											location={lender.location}
											email={lender.email}
											deleteHandler={this.handleShow}
										/>
									)
								})
							}
						</div>
					</div>
				</div>
				<Paginated
					pages={this.state.pages.length}
					selected={this.state.pageSelected}
					pageSelected={this.pageSelected}
					nextPageSelected={this.nextPageSelected}
					prevPageSelected={this.prevPageSelected} />
			</div>
        )
    }
}

export default Lenders
