import React from 'react'
import { Link } from 'react-router-dom'
import { Icon, Item, Segment,List,Button } from 'semantic-ui-react'
import EventListAttendee from './EventListAttendee'

function EventListItem({event,selectEvent,deleteEvent}) {
	return (
		<div>
			<Segment.Group style={{marginBottom:'30px'}}>
				<Segment>
					<Item.Group>
						<Item>
							<Item.Image size='tiny' circular src={event.hostPhotoURL} />
							<Item.Content>
								<Item.Header content={event.title} />
								<Item.Description>
									Hosted by {event.hostedBy}
								</Item.Description>
							</Item.Content>
							</Item>
					</Item.Group>
				</Segment>
				<Segment>
					<span>
						<Icon name='clock'/> {event.date}
						<Icon name='marker'/> {event.venue}
					</span>
				</Segment>
				<Segment secondary>
					<List horizontal >
						{
							event.attendees.map(attendee => (
								<EventListAttendee key={attendee.id} attendee={attendee} />
							))
						}

					</List>
				</Segment>
				<Segment >
					<div style={{display:'flex'}}>
						<div style={{display:'block'}} >{event.description}
						</div>
						<div style={{'display':'flex','flexDirection':'column','justifyContent':'center'}}>
							<Button 
								as={Link} to={`/events/${event.id}`}
								// console.log(event)
								style={{maxHeight:'50px','marginBottom':'10px'}} floated='right' color='teal'>View</Button>
							<Button onClick={()=>{
								deleteEvent(event.id)
								console.log(event)
								}} style={{maxHeight:'50px','background':'red','color':'white'}} floated='right' >Delete</Button>	
						</div>
						
					</div>
					
				</Segment>
			</Segment.Group>
			
		</div>
	)
}

export default EventListItem
