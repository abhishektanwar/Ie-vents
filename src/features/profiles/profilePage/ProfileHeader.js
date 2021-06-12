import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Divider, Grid, Header, Item, Reveal, Segment, Statistic } from 'semantic-ui-react'
import { followUser, getFollowingDoc, unfollowUser } from '../../../app/firestore/firestoreService';
import { clearFollowings, setFollowUser, setUnfollowUser } from '../profileActions';

function ProfileHeader({profile ,isCurrentUser}) {
	const [loading,setLoading] = useState(false);
	const {followingUser} = useSelector(state => state.profile)
	const dispatch = useDispatch()
	useEffect(()=>{
		if(isCurrentUser) return;
		setLoading(true);
		async function fetchFollowingDoc(){
			try{
				const followingDoc = await getFollowingDoc(profile.id);
				if(followingDoc && followingDoc.exists){
					dispatch(setFollowUser())
				}
			}
			catch(error){
				toast(error.message)
			}
		}

		fetchFollowingDoc().then(()=>{
			setLoading(false)
		})
		return ()=> {
			dispatch(clearFollowings())
		}
	},[dispatch,profile.id,isCurrentUser])

	async function handleFollowUser(profile){
		setLoading(true)
		try{
			await followUser(profile)
			dispatch(setFollowUser())
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
			dispatch(setUnfollowUser())
		}
		catch(error){
			console.log("pl")
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
						<Statistic label='followers' value={profile.followerCount || 0} />
						<Statistic label='following' value={profile.followingCount || 0} />
					</Statistic.Group>
					<Divider />
					{!isCurrentUser &&
					<>
						<Reveal animated='move'>
							<Reveal.Content visible style={{width:'100%'}}>
								<Button fluid color='teal' content={followingUser ? 'Following':'Not Following'} />
							</Reveal.Content>
							<Reveal.Content hidden style={{width:'100%'}}>
								<Button 
									onClick={followingUser ? () => handleUnfollowUser(profile) : () => handleFollowUser(profile)}
									basic 
									fluid 
									loading={loading}
									color={followingUser ? 'red' : 'green'} 
									content={followingUser ? 'UnFollow' : 'Follow'} />
							</Reveal.Content>
						</Reveal>
					</>
					}
				</Grid.Column>
			</Grid>
		</Segment>
	)
}

export default ProfileHeader
