import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Icon, Item, Segment,List,Button, Label } from 'semantic-ui-react'
import { deleteEventInFIrestore } from '../../../app/firestore/firestoreService'
import { deleteEvent } from '../eventActions'
import EventListAttendee from './EventListAttendee'

function EventListItem({event}) {
	const dispatch = useDispatch()
	return (
		<div>
			<Segment.Group style={{marginBottom:'30px'}}>
				<Segment>
					<Item.Group>
						<Item>
							<Item.Image size='tiny' circular src={event.hostPhotoURL} />
							<Item.Content>
								<Item.Header content={event.title} />
								<Item.Description style={{display:'flex',justifyContent:'space-between'}}>
									Hosted by {event.hostedBy}
									{event.isCancelled && (
										<div style={{backgroundColor:'red',maxWidth:'250px' ,color:'white',height:'30px',borderRadius:'5px',textAlign:'center',paddingTop:'5px',paddingLeft:'5px',paddingRight:'5px'}} >
											<span>This event has been cancelled </span>
										</div>
									)}
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
								deleteEventInFIrestore(event.id)
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
