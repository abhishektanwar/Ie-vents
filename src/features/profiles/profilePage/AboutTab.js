import React, { useState } from 'react'
import { Grid, Header, Tab,Button,Form } from 'semantic-ui-react'
import ProfileForm from './ProfileForm'

function AboutTab({profile ,isCurrentUser}) {
	// current lggedin user can edit his/her profile
	// other users can visit only profile of other people
	const [editMode , setEditMode] = useState(false)
	return (
		<Tab.Pane>
		<Grid>
			<Grid.Column width={16}>
				<Header floated='left' icon='user' content={`About ${profile.displayName}`} />
				{ isCurrentUser && 
					<Button onClick = {()=>setEditMode(!editMode)
					} floated='right' basic content={editMode ? 'Cancel' : 'Edit'} />
				}
				</Grid.Column>
			<Grid.Column width={16}>
				{editMode ? (
					<ProfileForm profile={profile} setEditMode={setEditMode} editMode={editMode} />
				):
				(
					<>
						<div style={{marginBottom:10}}>
							<strong>
								{/* Member since:{profile.createdAt} */}
							</strong>
							<div>{ profile.description || null }</div>
						</div>
					</>
				)}
			</Grid.Column>
		</Grid>
		</Tab.Pane>
	)
}

export default AboutTab
