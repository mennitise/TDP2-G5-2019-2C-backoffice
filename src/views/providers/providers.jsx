import React, {PureComponent} from 'react'

import './providers.css'
import add from 'assets/images/add.svg'

import ProviderCard from 'components/providerCard/providerCard.jsx'

class Providers extends PureComponent {

	addProviderHandler = () => {
		this.props.addNewProviderSelectedAction()
	}

    render() {
		return(
			<div className='wrapper-providers'>
				<div className='list'>
					<div className='list-wrapper'>
						<div className='top-title' onClick={this.addProviderHandler}>
							<h2 className='add-provider-left'>Prestadores</h2>
							<div className='add-provider-right'>
								<img className='add-provider-img' src={add}/>
								<h5 className='add-provider-text'>Agregar prestador</h5>
							</div>
						</div>
						<div className='list-container'>
							{ this.props.listOfProviders &&
								this.props.listOfProviders.map((provider, index) => {
									return (
										<ProviderCard
											key={`provider-${index}`}
											id={index}
											name={provider.name}
											specialities={provider.specialities}
											type={provider.type}
											languages={provider.languages}
											plan={provider.plan}
											location={provider.location}
											email={provider.email}
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

export default Providers
