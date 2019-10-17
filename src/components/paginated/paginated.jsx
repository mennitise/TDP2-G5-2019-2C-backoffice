import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'

import arrowLeft from 'assets/images/arrow-point-to-left.svg'
import arrowRight from 'assets/images/arrow-point-to-right.svg'

import './paginated.css'

class Paginated extends PureComponent {

	render() {
		const pages = Array.from(Array(this.props.pages).keys())
		return (
			<Fragment>
				{ (this.props.pages !== 0) &&
					<div className='wrapper-paginated'>
						<img className='arrow' src={arrowLeft} onClick={this.props.prevPageSelected}/>
						{pages.map((page) => {
							const pageNumber = page + 1
							const styles = `number ${(pageNumber === this.props.selected)? 'number-selected' : ''}`
							return (<p className={styles} onClick={() => this.props.pageSelected(pageNumber)}>{pageNumber}</p>)
						})}
						<img className='arrow' src={arrowRight} onClick={this.props.nextPageSelected}/>
					</div>
				}
			</Fragment>
		)
	}
}

Paginated.defaultProps = {
	pages: 0,
	selected: 0
}

Paginated.propTypes = {
	pages: PropTypes.number,
	selected: PropTypes.number,
	pageSelected: PropTypes.func.isRequired,
	nextPageSelected: PropTypes.func.isRequired,
	prevPageSelected: PropTypes.func.isRequired,
}

export default Paginated
