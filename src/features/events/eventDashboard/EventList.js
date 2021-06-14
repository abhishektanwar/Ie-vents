import React from 'react'
import EventListItem from './EventListItem'
import {useSelector} from 'react-redux'
function EventList({events}) {
	// {events && console.log("odii",events[0].id) }

	return (
		<>	
			{
			events && events.map(event =>(
				// console.log("od",event.id)
				event?.id ?
					<EventListItem key={event.id} event={event} /> : "loading"
				
			))}
		</>
	)
}

export default EventList
