import React, {PureComponent} from 'react'
import { Pie, Line } from 'react-chartjs-2'

import './dashboard.css'

class Dashboard extends PureComponent {
	render() {

		const affiliates = this.props.affiliates
		const authorizations = this.props.authorizations

		const data = {
			labels: affiliates.plans,
			datasets: [{
				data: affiliates.values,
				backgroundColor: [
					'#FF6384',
					'#36A2EB',
					'#FFCE56'
				],
				hoverBackgroundColor: [
					'#FF6384',
					'#36A2EB',
					'#FFCE56'
				]
			}],
		}

		const option = {
			tooltips: {
				callbacks: {
					label: function(tooltipItem, data) {
						const dataset = data.datasets[tooltipItem.datasetIndex]
						const meta = dataset._meta[Object.keys(dataset._meta)[0]]
						const total = meta.total
						const currentValue = dataset.data[tooltipItem.index]
						const percentage = parseFloat((currentValue/total*100).toFixed(1))
						const currentAppValue = affiliates.appValues[tooltipItem.index]
						const percentageApp = parseFloat((currentAppValue/total*100).toFixed(1))
						return `Total: ${currentValue} (${percentage}%)\n Total App: ${currentAppValue} (${percentageApp}%)`
					},
					title: function(tooltipItem, data) {
						return data.labels[tooltipItem[0].index]
					}
				}
			}
		}

		const dataLine = {
			labels: authorizations.dates,
			datasets: [
				{
					data: authorizations.approvedByDate,
					label: 'Aprobados',
					fill: false,
					lineTension: 0.1,
					backgroundColor: 'rgba(28,209,0,0.52)',
					borderColor: 'rgba(28,209,0,1)',
				},
				{
					data: authorizations.rejectedByDate,
					label: 'Rechazados',
					fill: false,
					lineTension: 0.1,
					backgroundColor: 'rgba(192,0,16,0.52)',
					borderColor: 'rgba(192,0,16,1)',
				}
			]
		}

		const totalAuthorizations = this.props.authorizations.manualAmount + this.props.authorizations.automaticAmount
		const manualPercentage = parseFloat((this.props.authorizations.manualAmount/totalAuthorizations*100).toFixed(1))
		const automaticPercentage = parseFloat((this.props.authorizations.automaticAmount/totalAuthorizations*100).toFixed(1))

		const sidebar = 0.2
		const paddingWrapper = 0.1
		const paddingDash = 0.1
		const width = (this.props.width * (1 - (sidebar + paddingWrapper + paddingDash))) * 0.4
		const height = (this.props.height) * 0.4

		return (
			<div className='dash list-wrapper'>
				<h2 className='top-title add-lender-left'>Dashboard</h2>
				<div className='graphs'>
					<div className='graphs-lines'>
						<div className='graphs-t'>
							<span className='graphs-title'>Autorizaciones </span>
							<span className='graphs-separator'></span>
							<span className='graphs-subtitle'>Ultimos 30 días</span>
						</div>
						<div className='graph'>
							<Line
								width={width}
								height={height}
								data={dataLine}/>
						</div>
						<div className='graphs-p'>
							<span className='graphs-p-title'>Automáticas: </span>
							<span className='graphs-p-number'>{this.props.authorizations.automaticAmount} </span>
							<span className='graphs-p-number'>{automaticPercentage}%</span>
						</div>
						<div className='graphs-p'>
							<span className='graphs-p-title'>Manuales: </span>
							<span className='graphs-p-number'>{this.props.authorizations.manualAmount} </span>
							<span className='graphs-p-number'>{manualPercentage}%</span>
						</div>
						<div className='graphs-p'>
							<span className='graphs-p-title'>Total: </span>
							<span className='graphs-p-number'>{totalAuthorizations} </span>
						</div>
					</div>
					<div className='graphs-pie'>
						<h2 className='graphs-title'>Afiliados</h2>
						<div className='graph'>
							<Pie
								width={width}
								height={height}
								data={data}
								options={option} />
						</div>
						<div className='graphs-p'>
							<span className='graphs-p-title'>Total: </span>
							<span className='graphs-p-number'>{affiliates.values.reduce((a, b) => a + b, 0)}</span>
						</div>
						<div className='graphs-p'>
							<span className='graphs-p-title'>Total App: </span>
							<span className='graphs-p-number'>{affiliates.appValues.reduce((a, b) => a + b, 0)}</span>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Dashboard