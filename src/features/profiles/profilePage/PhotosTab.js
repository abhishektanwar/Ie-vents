import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Header, Tab,Button,Form, Card, Image } from 'semantic-ui-react'
import PhotoUploadWidget from '../../../app/common/photos/PhotoUploadWidget'
import { deletePhotoFromCollection, getUserPhotos, setMainPhoto } from '../../../app/firestore/firestoreService'
import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection'
import ProfileForm from './ProfileForm'
import {listenToUserPhotos} from '../profileActions'
import { toast } from 'react-toastify'
import {deleteFromFirebaseStorage} from '../../../app/firestore/firebaseService'

function PhotosTab({profile ,isCurrentUser}) {
	const [editMode , setEditMode] = useState(false)
	const dispatch = useDispatch()
	const {loading} = useSelector(state=>state.async)
	const {photos} = useSelector(state=>state.profile)
	const [updating,setUpdating] = useState({isUpdating:false,target:null})
	const [deleting,setDeleting] = useState({isDeleting:false,target:null})

	useFirestoreCollection({
		query: () => getUserPhotos(profile.id),
		data : photos => dispatch(listenToUserPhotos(photos)),
		dependency:[profile.id,dispatch]
	})

	async function handleSetMainPhoto(photo,target){
		setUpdating({isUpdating:true,target:target})
		try{
			await setMainPhoto(photo)
		}catch(error){
			toast.error(error.message)
		}
		finally{
			setUpdating({isUpdating:false,target:null})
		}
	}

	async function handleDeletePhoto(photo,target){
		setDeleting({isDeleting:true,target:target})
		try{
			await deleteFromFirebaseStorage(photo.name)
			await deletePhotoFromCollection(photo.id)
		}catch(error){
			toast.error(error.message)
		}
		finally{
			setDeleting({isDeleting:false,target:null})
		}
	}

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
							<Image style={{height:'100px'}} src={photo.url} />
							<Button.Group fluid width=
							{2}>
								<Button name={photo.id} 
								loading={updating.isUpdating && updating.target===photo.id}
								onClick={(e)=>handleSetMainPhoto(photo,e.target.name)}
								disabled={photo.url === profile.photoURL}
								basic color='green' content='Main' />
								<Button 
								name={photo.id} 
								onClick={(e)=>handleDeletePhoto(photo,e.target.name)}
								loading={deleting.isDeleting && deleting.target === photo.id}
								disabled={photo.url===profile.photoURL}
								basic color='red' icon='trash' />
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
