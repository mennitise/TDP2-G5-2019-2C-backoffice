import React, {PureComponent} from 'react'

import './authorizations.css'
import search from 'assets/images/search.svg'

import Paginated from "components/paginated/paginated.jsx"
import { Form } from "react-bootstrap"
import AuthCard from 'components/authCard/authCard'

class Authorizations extends PureComponent {

	constructor(props) {
		super(props)
		this.state = {
			pages: [],
			pageSelected: 0,
			numberOfResults: 0,
		}
	}

	updatePages() {
		if (this.props.listOfAuthorizations) {
			const pages = this.chunk(this.props.listOfAuthorizations, 6)
			const pageSelected = (pages.length > 0) ? 1 : 0
			this.setState({
				pages,
				pageSelected,
				numberOfResults: this.props.listOfAuthorizations.length,
			})
		}
	}

	componentDidMount() {
		window.scrollTo(0, 0)
		this.updatePages()
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.listOfAuthorizations && prevProps.listOfAuthorizations !== this.props.listOfAuthorizations) {
			this.updatePages()
		}
	}

	chunk = (arr, len) => {
		let chunks = [], i = 0, n = arr.length
		while (i < n) {
			chunks.push(arr.slice(i, i += len));
		}
		return chunks;
	}

	onChangeFilterName = ev => {
		this.props.filterByName(ev.target.value)
	}

	onChangeFilterSpeciality = ev => {
		this.props.filterBySpeciality(ev.target.value)
	}

	onChangeFilterStatus = ev => {
		this.props.filterByStatus(ev.target.value)
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

	render() {
		return(
			<div className='wrapper-lenders'>
				<div className='list'>
					<div className='list-wrapper'>
						<h2 className='top-title add-lender-left'>Autorizaciones</h2>
						<div className='filters'>
							<img className='filters-img' src={search} alt='Search'/>
							<Form.Control required className='filters-name' type="string" onChange={this.onChangeFilterName} placeholder={`Nombre`} />
							<div className='filters-speciality'>
								<Form.Control required as="select" onChange={this.onChangeFilterSpeciality} >
									<option key='placeholder' value='-1' hidden >Especialidad</option>
									{this.props.specialities.map((t, i) => (<option key={`type-${i+1}`} value={i+1}>{t.label}</option>))}
								</Form.Control>
							</div>
							<div className='filters-plan'>
								<Form.Control required as="select" onChange={this.onChangeFilterStatus} >
									{this.props.status.map((t, i) => (<option key={`type-${i+1}`} value={i+1}>{t}</option>))}
								</Form.Control>
							</div>
						</div>
						<div className='list-container'>
							{ (this.state.pageSelected !== 0) && (this.state.pages) && this.state.pages[this.state.pageSelected-1] &&
								this.state.pages[this.state.pageSelected-1].map((auth, index) => {
									return (
										<div key={auth.id} className='auth-card'>
											<AuthCard
												authId={auth.id}
												authSelectedHandler={this.props.authSelectedHandler}
												name={auth.name}
												speciality={auth.speciality}
												plan={auth.plan}
												status={auth.status}
												imgUrl={auth.imgUrl}
											/>
										</div>
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

export default Authorizations