import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Dropdown, Menu, Image } from 'semantic-ui-react'
import { signOutUser } from '../auth/authActions'

function SignedInMenu({setAuthenticated}) {
	const dispatch = useDispatch()
	const history = useHistory()
	const {currentUser} = useSelector(state => state.auth)
	const {currentUserProfile} = useSelector(state => state.profile)
	console.log("uid",currentUser)
	console.log("const {currentUserProfile} = useSelector(state => state.profile)",currentUserProfile);
	return (
		<Menu.Item position="right">
			<Image avatar spaced='right' src={currentUser.photoURL || 'assets/user.png' } />
			<Dropdown pointing='top left' text = {currentUser.displayName}>
				
				<Dropdown.Menu>
					<Dropdown.Item as={Link} to='createEvent' text='Create Event' icon='plus' />
					<Dropdown.Item as={Link} to={`/profile/${currentUser.uid}`} text='My Profile' icon='user' />
					<Dropdown.Item as={Link} to='account' text='My Account' icon='edit' />
					<Dropdown.Item onClick={()=>{
						// dispatch(signOutUser())
						signOutUser()
						history.push('/')
					}
					} text='Signout' icon='power' />
				</Dropdown.Menu>
			</Dropdown>
		</Menu.Item>
	)
}

export default SignedInMenu
