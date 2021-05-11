import React from 'react'
import { Grid, GridColumn } from 'semantic-ui-react'
import EventList from './EventList'

function EventDashboard() {
	return (
		<Grid>
			<GridColumn width={10} >
				<EventList />
			</GridColumn>
			<GridColumn width={6} >
				<h2>Right Grid</h2>
			</GridColumn>
		</Grid>

	)
}

export default EventDashboard
