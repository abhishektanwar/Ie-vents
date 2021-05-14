import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Header, Item, Segment,Image } from 'semantic-ui-react'

function EventDetailedHeader({event}) {
	return (
		<div>
			<Segment.Group>
				<Segment basic attached="top" style={{padding:'0'}}>
					<Image 
						src={`/assets/categoryImages/${event.category}.jpg`} 
						fluid 
						style={{'filter':'brightness(40%)'}}
						/>
					<Segment 
						basic
						style={{
							'position':'absolute',
							'bottom':'5%',
							'left':'5%',
							'width':'100%',
							'height':'auto',
							'color':'white'
						}}
						>
						<Item.Group>
							<Item>
								<Item.Content>
									<Header 
										size='huge'
										content={event.title}
										style={{'color':'white'}} />
										<p>{event.date}</p>
										<p>Hosted By<strong>{event.hostedBy}</strong> </p>
								</Item.Content>
							</Item>
						</Item.Group>
					</Segment>
				</Segment>

				<Segment attached="bottom">
					<Button>Cancel My Place</Button>
					<Button color="teal">JOIN THIS EVENT</Button>
					<Button as={Link} to={`/manage/${event.id}`} color="orange" floated="right">Manage Event</Button>
				</Segment>
			</Segment.Group>
		</div>
	)
}

export default EventDetailedHeader
