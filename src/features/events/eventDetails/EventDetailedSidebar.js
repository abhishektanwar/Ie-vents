import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Item, Segment } from 'semantic-ui-react'

function EventDetailedSidebar({attendees,hostUid}) {
	return (
		<>
			<Segment
				textAlign="center"
				style={{border:'none'}}
				attached="top"
				secondary
				inverted
				color="teal"
			>
				{attendees.length} {attendees.length > 1 ? 'person' : 'people'} going
			</Segment>

			<Segment attached>
				<Item.Group relaxed divided>
					{attendees.map(attendee => {
						return <Item  
									as={Link} to={`/profile/${attendee.id}`}
									key={attendee.id}
									style={{position:'relative',
											display:'flex',
											justifyContent:'space-between'
							}}>
							
						<div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
						<Item.Image size="tiny" src={attendee.photoURL || "/assets/user.png"} />
						<Item.Content verticalAlign="middle">
							<Item.Header as = "h3">
								<span style={{marginLeft:'5px'}}>{attendee.displayName}</span>
							</Item.Header>
						</Item.Content>
						{hostUid === attendee.id && (
								<div
									style={{backgroundColor:'orange',color:'white',height:'30px',borderRadius:'5px',textAlign:'center',paddingTop:'5px',paddingLeft:'5px',paddingRight:'5px',
									marginLeft:'10px',
									position:'absolute',
									width:'40px',
									left:'80%'
								}}
								>
									<span style={{fontWeight:'bold'}}>Host</span>
								</div>
							)}
						</div>
						
					</Item>
					})}
					
				</Item.Group>
			</Segment>
			
		</>
	)
}

export default EventDetailedSidebar
