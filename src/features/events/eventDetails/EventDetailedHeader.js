import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { Button, Header, Item, Segment,Image } from 'semantic-ui-react'
import { addUserAttendance, cancelUserAttendance } from '../../../app/firestore/firestoreService';

function EventDetailedHeader({event,isHost,isGoing}) {
	const [loading,setLoading] = useState(false);

	// user joining event function
	async function handleUserJoinEvent(){
		setLoading(true)
		try{
			await addUserAttendance(event)
		}
		catch (error) {
			toast.error(error.message)
		}
		finally{
			setLoading(false);
		}
	}

	async function handleUserLeaveEvent(){
		setLoading(true)
		try{
			await cancelUserAttendance(event)
		}
		catch (error) {
			toast.error(error.message)
		}
		finally{
			setLoading(false);
		}
	}
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
										<p>Hosted By<strong>
											<Link to={`/profile/${event.hostUid}`}>{event.hostedBy}</Link> 
											</strong> </p>
								</Item.Content>
							</Item>
						</Item.Group>
					</Segment>
				</Segment>

				<Segment attached="bottom" clearing>
					{/* we do not want the host to cancel his place or join the event,host already hoined event */}
					{ !isHost &&
						<>	
							{isGoing ? (
								<Button
								onClick={handleUserLeaveEvent}
								loading={loading}
								>Cancel My Place</Button>
							):(
								<Button 
								color="teal"
								onClick={handleUserJoinEvent}
								loading={loading}
								>JOIN THIS EVENT</Button>
							)}
						</>
					}
					


					{/* we only want the host to manage the event */}
					{ isHost && 
						<Button as={Link} to={`/manage/${event.id}`} color="orange" floated="right">Manage Event</Button>
					}
					
				</Segment>
			</Segment.Group>
		</div>
	)
}

export default EventDetailedHeader
