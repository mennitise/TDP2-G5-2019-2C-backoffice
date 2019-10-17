import React, {PureComponent} from 'react'

import './lenders.css'
import add from 'assets/images/add.svg'
import search from 'assets/images/search.svg'

import LenderCard from 'components/lenderCard/lenderCard.jsx'
import Paginated from "components/paginated/paginated.jsx"
import { Form } from "react-bootstrap"
import PropTypes from "prop-types"

class Lenders extends PureComponent {

	constructor(props) {
		super(props)
		this.state = {
			pages: [],
			pageSelected: 0,
			numberOfResults: 0,
		}
	}

	chunk = (arr, len) => {
		let chunks = [], i = 0, n = arr.length
		while (i < n) {
			chunks.push(arr.slice(i, i += len));
		}
		return chunks;
	}

	componentDidUpdate() {
		if (this.state.numberOfResults !== this.props.listOfLenders.length) {
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
		this.props.filterBySpeciality(ev.target.value)
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
	}

	nextPageSelected = () => {
		if (this.state.pageSelected < this.state.pages.length) {
			this.setState({
				...this.state,
				pageSelected: this.state.pageSelected + 1,
			})
		}

	}

	prevPageSelected = () => {
		if (this.state.pageSelected > 1) {
			this.setState({
				...this.state,
				pageSelected: this.state.pageSelected - 1,
			})
		}
	}

    render() {
		return(
			<div className='wrapper-lenders'>
				<div className='list'>
					<div className='list-wrapper'>
						<div className='top-title' onClick={this.addLenderHandler}>
							<h2 className='add-lender-left'>Prestadores</h2>
							<div className='add-lender-right'>
								<img className='add-lender-img' src={add}/>
								<h5 className='add-lender-text'>Agregar prestador</h5>
							</div>
						</div>
						<div className='filters'>
							<img className='filters-img' src={search}/>
							<Form.Control required className='filters-name' type="string" onChange={this.onChangeFilterName} placeholder={`Nombre`} />
							<div className='filters-speciality'>
								<Form.Control required as="select" onChange={this.onChangeFilterSpeciality} >
									{this.props.specialities.map((t, i) => {
										if (i===0) return (<option key={`type-${i}`} value='' disabled selected hidden >{t.label}</option>)
										return (<option key={`type-${i}`} value={i}>{t.label}</option>)
									})}
								</Form.Control>
							</div>
							<div className='filters-plan'>
								<Form.Control required as="select" onChange={this.onChangeFilterPlan} >
									{this.props.plans.map((t, i) => {
										if (i===0) return (<option key={`type-${i}`} value='' disabled selected hidden >{t}</option>)
										return (<option key={`type-${i}`} value={i}>{t}</option>)
									})}
								</Form.Control>
							</div>
						</div>
						<div className='list-container'>
							{ (this.state.pageSelected !== 0) && (this.state.pages) && this.state.pages[this.state.pageSelected-1] &&
								this.state.pages[this.state.pageSelected-1].map((lender, index) => {
									return (
										<LenderCard
											key={`lender-${index}`}
											id={index}
											name={lender.name}
											specialities={lender.specialities}
											type={lender.type}
											languages={lender.languages}
											plan={lender.plan}
											location={lender.location}
											email={lender.email}
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
