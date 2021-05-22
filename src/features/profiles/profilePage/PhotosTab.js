import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Header, Tab,Button,Form, Card, Image } from 'semantic-ui-react'
import PhotoUploadWidget from '../../../app/common/photos/PhotoUploadWidget'
import { getUserPhotos } from '../../../app/firestore/firestoreService'
import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection'
import ProfileForm from './ProfileForm'
import {chill, listenToUserPhotos} from '../profileActions'

function PhotosTab({profile ,isCurrentUser}) {
	const [editMode , setEditMode] = useState(false)
	const dispatch = useDispatch()
	const {loading} = useSelector(state=>state.async)
	const {photos} = useSelector(state=>state.profile)

	useFirestoreCollection({
		query: () => getUserPhotos(profile.id),
		data : photos => dispatch(listenToUserPhotos(photos)),
		dependency:[profile.id,dispatch]
	})

	useEffect(() => {
		console.log("photos13132",photos)
		return () => {
			// cleanup
		}
	}, [photos])
	return (
		<Tab.Pane>
		<Grid>
			<Grid.Column width={16}>
				<Header floated='left' icon='user' content={`photos`} />
				{ isCurrentUser && 
					<Button onClick = {()=>setEditMode(!editMode)
					} floated='right' basic content={editMode ? 'Cancel' : 'Add photo'} />
				}
				</Grid.Column>
			<Grid.Column width={16}>
				{editMode ? (
					<PhotoUploadWidget setEditMode={setEditMode} />
				):
				(
					<Card.Group itemsPerRow={5}>
						{photos.map(photo => {
							return (
								<Card key={photo.id}>
							<Image src={photo.url} />
							<Button.Group fluid width=
							{2}>
								<Button basic color='green' content='Main' />
								<Button basic color='red' icon='trash' />
							</Button.Group>
						</Card>
							)
							
						})}
						
					</Card.Group>
				)}
			</Grid.Column>
		</Grid>
		</Tab.Pane>
	)
}

export default PhotosTab
