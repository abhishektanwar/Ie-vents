import React,{ useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Button, Container, Menu } from 'semantic-ui-react'
import SignedInMenu from './SignedInMenu'
import SignedOutMenu from './SignedOutMenu'

function NavBar({setFormOpen}) {

	const [authenticated,setAuthenticated] = useState(false)

	function handleFormOpen(){
		// setFormOpen(prevSt => !prevSt)
		setFormOpen(true)
	}
	return (
		<Menu inverted fixed='top'>
			<Container>
				<Menu.Item as={NavLink} exact to='/' header >
					<img src="/assets/logo.png" alt="logo" style={{marginRight:'10px'}} />
					Ie-vents
				</Menu.Item>
				<Menu.Item  as={NavLink} to='/events' name='Events' />
				<Menu.Item  as={NavLink} to='/sandbox' name='Sandbox' />
				{authenticated && 
				<Menu.Item as={NavLink} to='/createEvent'>
					<Button positive inverted content='Create Event' />
				</Menu.Item>
				}
				{authenticated ? <SignedInMenu setAuthenticated={setAuthenticated}/> : <SignedOutMenu setAuthenticated={setAuthenticated} /> }
				
				
			</Container>
		</Menu>
	)
}

export default NavBar
