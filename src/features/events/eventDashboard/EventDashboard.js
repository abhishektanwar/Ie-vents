import React,{ useState } from 'react'
import { Grid, GridColumn } from 'semantic-ui-react'
import EventList from './EventList'
import { sampleData } from '../../../app/api/sampleData'
import { useSelector } from 'react-redux'
function EventDashboard() {
	// const [events,setEvents] = useState(sampleData)
	const {events} = useSelector(state => state.event)
	// function handleCreateEvent(event){
	// 	setEvents([...events,event])
	// }

	// function handleUpdateEvent(updatedEvent){
	// 	setEvents(events.map(event => (event.id === updatedEvent.id ? updatedEvent : event)))

	// }

	function handleDeleteEvent(eventId){
		// setEvents(events.filter(event => {
		// 	return (event.id !== eventId)
		// }))
	}

	return (
		<Grid>
			<GridColumn width={10} >
				<EventList events={events} 
					deleteEvent={handleDeleteEvent}
				/>
			</GridColumn>
			<GridColumn width={6} >
				<h2>Event Filters</h2>
				
			</GridColumn>
		</Grid>

	)
}

export default EventDashboard
