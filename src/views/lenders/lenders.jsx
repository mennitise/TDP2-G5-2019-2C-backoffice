import React, {PureComponent} from 'react'

import './lenders.css'
import add from 'assets/images/add.svg'
import search from 'assets/images/search.svg'

import LenderCard from 'components/lenderCard/lenderCard.jsx'
import { Form } from "react-bootstrap"

class Lenders extends PureComponent {

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

    render() {
		console.log(this.state)
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
							{ this.props.listOfLenders &&
								this.props.listOfLenders.map((lender, index) => {
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
			</div>
        )
    }
}

export default Lenders
