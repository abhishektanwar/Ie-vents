import cuid from 'cuid'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Button, Grid, Header } from 'semantic-ui-react'
import { uploadToFirebaseStorage } from '../../firestore/firebaseService'
import { updateUserProfilePhoto } from '../../firestore/firestoreService'
import PhotoWidgetCropper from './PhotoWidgetCropper'
import PhotoWidgetDropzone from './PhotoWidgetDropzone'

function PhotoUploadWidget({setEditMode}) {
	const [files,setFiles] = useState([])
	const [image,setImage] = useState(null)
	const [loading,setLoading] = useState(false)

	function handleUploadImage(){
		setLoading(true);
		const filename= cuid() + '.' + files[0].name ;
		const uploadTask = uploadToFirebaseStorage(files[0],filename)
		uploadTask.on('state_changed',snapshot => {
			const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
			console.log('upload is' + progress + '% done')
		},error => {
			toast.error(error.message)
		},()=>{
			uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
				updateUserProfilePhoto(downloadURL,filename).then(()=>{
					setLoading(false)
					setEditMode(false)
				}).catch(error =>{
					toast.error(error.message)
					setLoading(false)
				})
			})
		})
	}
	return (
		<Grid>
			<Grid.Column width = {1} />
			<Grid.Column width={14} >
				<Header color='teal' content = 'Add photo' />
				<PhotoWidgetDropzone setFiles={setFiles} />
				<Button loading={loading} style={{width:100}} positive icon='check' onClick={handleUploadImage} />
				<Button style={{width:100}} icon='close' />
			</Grid.Column>
			<Grid.Column width = {1} />

			{/* <Grid.Column width={4} >
				<Header color='teal' content = 'Step 2: Resize' />
				{files.length > 0 &&
				<PhotoWidgetCropper setImage={setImage} imagePreview = {files[0].preview} />
				}
			</Grid.Column>
			<Grid.Column width = {1} /> */}

			{/* <Grid.Column width={4} >
				<Header color='teal' content = 'Step 3: Preview & Upload' />
				{files.length > 0 &&
					<>
						<div className="img-preview"
							style={{minHeight:200,minWidth:200,overflow:'hidden'}}
						/>
						
					</>
				}

			</Grid.Column> */}
		</Grid>
	)
}

export default PhotoUploadWidget
