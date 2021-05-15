import React,{useState} from 'react'
import ModalWrapper from '../../app/common/modals/ModalWrapper'
import { Button, Dropdown, Form, Header, Segment } from 'semantic-ui-react'
import { useDispatch } from 'react-redux'
import { signInUser } from '../auth/authActions'
import { closeModal } from '../../app/common/modals/modalReducer'
function LoginForm() {
	let initialValue = {
		'email':'',
		'password':''
	};
	const [values,setValues] = useState(initialValue)
	const dispatch = useDispatch()

	function handleInputChange(e){
		const {name,value} = e.target
		setValues({...values,[name]:value})
		// console.log(values)
	}

	function handleFormSubmit(e){

			console.log(values)
			dispatch(signInUser(values))
			console.log({...values})
			dispatch(closeModal())
			// setFormOpen(false)
			// history.push('/events')
	}

	return (
		<ModalWrapper size='mini' header='Sign In to Ie-vents'>
			<Form onSubmit={handleFormSubmit}>
				<Form.Field>
					<input 
						type="email" 
						placeholder="Email Address" 
						name="email"
						// value={values.title} 
						onChange={(e) => {handleInputChange(e)}} 
						/>
				</Form.Field>
				
				<Form.Field>
					<input 
						type="password" 
						placeholder="Password"
						name="password"
						// value={values.description} 
						onChange={(e) => {handleInputChange(e)}} 
						/>
					
				</Form.Field>
				
				<Button type="submit" floated='right' positive content='Login' />

				
			</Form>
		</ModalWrapper>
	)
}

export default LoginForm
