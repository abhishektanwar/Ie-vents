import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Dropdown, Menu, Image } from 'semantic-ui-react'

function SignedInMenu({setAuthenticated}) {
	const history = useHistory()
	return (
		<Menu.Item position="right">
			<Image avatar spaced='right' src='/assets/user.png' />
			<Dropdown pointing='top left' text = 'bob'>
				<Dropdown.Menu>
					<Dropdown.Item as={Link} to='createEvent' text='Create Event' icon='plus' />
					<Dropdown.Item text='My Profile' icon='link' />
					<Dropdown.Item onClick={()=>{
						setAuthenticated(false)
						history.push('/')
						}} text='Signout' icon='power' />
				</Dropdown.Menu>
			</Dropdown>	
		</Menu.Item>
	)
}

export default SignedInMenu
