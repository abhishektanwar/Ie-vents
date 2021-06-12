import React,{useState} from 'react'
import { toast } from 'react-toastify';
import { Button, Divider, Grid, Header, Item, Reveal, Segment, Statistic } from 'semantic-ui-react'
import { followUser, unfollowUser } from '../../../app/firestore/firestoreService';

function ProfileHeader({profile ,isCurrentUser}) {
	const [loading,setLoading] = useState(false);

	async function handleFollowUser(profile){
		setLoading(true)
		try{
			await followUser(profile)
		}
		catch(error){
			toast(error.message)
		}
		finally{
			setLoading(false)
		}
	}

	async function handleUnfollowUser(profile){
		setLoading(true)
		try{
			await unfollowUser(profile)
		}
		catch(error){
			toast(error.message)
		}
		finally{
			setLoading(false)
		}
	}
	
	return (
		<Segment>
			<Grid>
				<Grid.Column width={12}>
					<Item.Group>
						<Item>
							<Item.Image avatar size='small' src={profile.photoURL || `/assets/user.png`} />
							<Item.Content verticalAlign='bottom'>
								<Header as='h1' style={{display:'block',marginBottom:10}} content={profile.displayName} />
							</Item.Content>
						</Item>
					</Item.Group>
				</Grid.Column>
				<Grid.Column width={4}>
					<Statistic.Group>
						<Statistic label='followers' value={10} />
						<Statistic label='following' value={5} />
					</Statistic.Group>
					<Divider />
					{!isCurrentUser &&
					<>
						<Reveal animated='move'>
							<Reveal.Content visible style={{width:'100%'}}>
								<Button fluid color='teal' content='Following' />
							</Reveal.Content>
							<Reveal.Content hidden style={{width:'100%'}}>
								<Button 
									onClick={()=>handleFollowUser(profile)}
									basic 
									fluid 
									loading={loading}
									color='green' 
									content='Follow' />
							</Reveal.Content>
						</Reveal>
						<Button 
							onClick={()=>handleUnfollowUser(profile)}
							basic 
							fluid 
							color='red' 
							content='UnFollow' />
					</>
					}
				</Grid.Column>
			</Grid>
		</Segment>
	)
}

export default ProfileHeader
