import React,{ useState } from 'react'
import { Grid, GridColumn } from 'semantic-ui-react'
import EventList from './EventList'
import { sampleData } from '../../../app/api/sampleData'
import { useSelector } from 'react-redux'
function EventDashboard() {
	const {events} = useSelector(state => state.event)

	return (
		<Grid>
			<GridColumn width={10} >
				<EventList events={events} />
			</GridColumn>
			<GridColumn width={6} >
				<h2>Event Filters</h2>
				
			</GridColumn>
		</Grid>

	)
}

export default EventDashboard
