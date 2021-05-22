import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'
import { Button,Form } from 'semantic-ui-react'
import { updateUserProfile } from '../../../app/firestore/firestoreService'

function ProfileForm({profile,setEditMode,editMode}) {
	let initialValues={
		displayName:profile.displayName,
		description:profile.description || ''
	}
	const history = useHistory()
	const [values,setValues] = useState(initialValues)

	const handleFormSubmit = async (e) =>{
		console.log(values)
		try{
			await updateUserProfile(values)
			setEditMode(!editMode)
			history.push('/events')
		}
		catch (error){
			toast.error(error.message)
		}
	}

	function handleInputChange(e){
		const {name,value} = e.target;
		setValues({...values,[name]:value})
	}

	return (
		<Form onSubmit={handleFormSubmit}>
			<Form.Field>
				<input 
					type="text" 
					placeholder="Display Name" 
					name="displayName"
					required
					value={values.displayName} 
					onChange={(e) => {handleInputChange(e)}} 
					/>
			</Form.Field>
			
			<Form.Field>
				<textarea 
					type="text" 
					placeholder="Description"
					name="description"
					required	
					// value={values.description} 
					onChange={(e) => {handleInputChange(e)}} 
					/>
				
			</Form.Field>
			
			<Button type="submit" floated='right' positive content='Update Profile' />

				
		</Form>
	)
}

export default ProfileForm

