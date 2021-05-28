import React from 'react'
import EventListItem from './EventListItem'

function EventList({events}) {
	// {events && console.log("odii",events[0].id) }
	
	return (
		<>	
			{events.map(event =>(
				// console.log("od",event.id)}
				<EventListItem key={event.id} event={event} />
			))}
		</>
	)
}

export default EventList
