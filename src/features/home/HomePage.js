import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Header, Icon, Image, Segment } from 'semantic-ui-react'

function HomePage() {
	return (
		<Segment inverted textAlign='center' vertical className='masthead'>
			<Container>
				<Header as='h1' inverted>
					<Image size='massive' src='/assets/logo.png' style={{'marginBottom':'12px'}} />
					Ie-vents
				</Header>
				<Button as={Link} to='/events' size='huge' inverted>
					Get Started
					<Icon name='right arrow' inverted/>
				</Button>
			</Container>
		</Segment>
	)
}

export default HomePage
{/* <Menu.Item as={NavLink} exact to='/' header > */}