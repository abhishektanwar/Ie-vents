import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Grid } from 'semantic-ui-react'
import EventDetailedChat from './EventDetailedChat'
import EventDetailedHeader from './EventDetailedHeader'
import EventDetailedInfo from './EventDetailedInfo'
import EventDetailedSidebar from './EventDetailedSidebar'

function EventDetailedPage({match}) {
	console.log(match)
	// let {id} = useParams()
	// console.log("id",id)
	const event = useSelector(state => state.event.events.find(e => e.id === match.params.id))
	console.log("event",event)
	return (
		<Grid>
			<Grid.Column width={10}>
				<EventDetailedHeader event={event}/>
				<EventDetailedInfo event={event}/>
				<EventDetailedChat />
			</Grid.Column>
			<Grid.Column width={6}>
				<EventDetailedSidebar attendees={event.attendees}/>
			</Grid.Column>
		</Grid>
	)
}

export default EventDetailedPage
