import React,{ useState } from 'react'
import { Grid, GridColumn } from 'semantic-ui-react'
import EventForm from '../eventForm/EventForm'
import EventList from './EventList'
import { sampleData } from '../../../app/api/sampleData'
function EventDashboard({formOpen,setFormOpen,selectedEvent,selectEvent}) {
	const [events,setEvents] = useState(sampleData)
	
	function handleCreateEvent(event){
		setEvents([...events,event])
	}

	function handleUpdateEvent(updatedEvent){
		setEvents(events.map(event => (event.id === updatedEvent.id ? updatedEvent : event)))
		selectEvent(null)
		setFormOpen(false)
	}

	function handleDeleteEvent(eventId){
		setEvents(events.filter(event => {
			return (event.id !== eventId)
		}))
	}

	return (
		<Grid>
			<GridColumn width={10} >
				<EventList events={events} selectEvent={selectEvent}
					deleteEvent={handleDeleteEvent}
				/>
			</GridColumn>
			<GridColumn width={6} >
				{ formOpen && 
					<EventForm 
						selectedEvent={selectedEvent} 
						setFormOpen={setFormOpen} 
						setEvents={setEvents}
						updateEvent={handleUpdateEvent} 
						createEvent={handleCreateEvent}/> }
				
			</GridColumn>
		</Grid>

	)
}

export default EventDashboard
