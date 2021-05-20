import React,{useState} from 'react'
import { Header, Segment } from 'semantic-ui-react'
import { Button, Dropdown, Form} from 'semantic-ui-react'
import { updateUserPassword } from '../../app/firestore/firebaseService';
import {useHistory} from 'react-router-dom'
import { signOutUser } from './authActions';


function AccountPage() {
	let initialValue = {
		'newPassword1':'',
		'newPassword2':''
	};
	const history = useHistory()
	const [updatePass,setUpdatePass] = useState(initialValue)
	// console.log("values",values)
	// const dispatch = useDispatch()
	function handleInputChange(e){
		// console.log(e.target.value);
		const {name,value} = e.target
		setUpdatePass({...updatePass,[name]:value})

		// console.log(updatePass)
	}

	async function handleFormSubmit(e){
		if(updatePass.newPassword1.trim()===updatePass.newPassword2.trim()){
			try{
			
				// console.log(values)
				console.log(updatePass)
				await updateUserPassword(updatePass.newPassword1)
				// console.log({...values})
				// dispatch(closeModal())
				signOutUser()
				history.push('/')
			}
			catch (error){
				console.log("pass update error",error)
				// toast.error("Try again")
			}
			
			// setFormOpen(false)
			// history.push('/events')
		}else{
			console.log("incorrect")
		}

		
	}

	return (
		<Segment>
			<Header dividing size="large" content="Account" />
			<div>
				<Header color="teal" sub content="Change Password" />
				<p>Use this form to change your password</p>
			</div>
			<Form className='ui form' onSubmit={handleFormSubmit}>
				<Form.Field>
					<input 
						type="password" 
						placeholder="New Password 1" 
						name="newPassword1"
						required
						// value={values.title} 
						onChange={(e) => {handleInputChange(e)}} 
						/>
				</Form.Field>
				
				<Form.Field>
					<input 
						type="password" 
						placeholder="New Password 2"
						name="newPassword2"
						required
						// value={values.description} 
						onChange={(e) => {handleInputChange(e)}} 
						/>
					
				</Form.Field>
				
				<Button type="submit" positive content='Update Password' />
			</Form>
		</Segment>

	)
}

export default AccountPage
