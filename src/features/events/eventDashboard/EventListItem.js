import React from 'react'
import { Icon, Item, Segment,List,Button } from 'semantic-ui-react'
import EventListAttendee from './EventListAttendee'

function EventListItem() {
	return (
		<div>
			<Segment.Group style={{marginBottom:'30px'}}>
				<Segment>
					<Item.Group>
						<Item>
							<Item.Image size='tiny' circular src='/assets/user.png' />
							<Item.Content>
								<Item.Header content="title" />
								<Item.Description>
									Hosted by bob
								</Item.Description>
							</Item.Content>
							</Item>
					</Item.Group>
				</Segment>
				<Segment>
					<span>
						<Icon name='clock'/> Date
						<Icon name='market'/> Venue
					</span>
				</Segment>
				<Segment secondary>
					<List horizontal >
						<EventListAttendee />
						<EventListAttendee />
						<EventListAttendee />
					</List>
				</Segment>
				<Segment >
					<div>Description of event</div>
					<Button style={{marginTop:'-27px'}} floated='right' color='teal'>View</Button>
				</Segment>
			</Segment.Group>
			
		</div>
	)
}

export default EventListItem
