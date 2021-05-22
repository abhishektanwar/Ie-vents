import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import { getUserProfile } from '../../../app/firestore/firestoreService'
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc'
import { listenToCurrentUserProfile, listenToSelectedUserProfile } from '../profileActions'
import ProfileContent from './ProfileContent'
import ProfileHeader from './ProfileHeader'
import LoadingComponent from '../../../app/layout/LoadingComponent'

function ProfilePage({match}) {
	const dispatch = useDispatch()
	const {selectedUserProfile} = useSelector(state => state.profile)
	const {currentUser} = useSelector(state=>state.auth)
	const {loading} = useSelector(state => state.async)
	console.log("match.params.id",match.params.id)
	useFirestoreDoc({
		query:() => getUserProfile(match.params.id),
		data: profile => dispatch(listenToSelectedUserProfile(profile)),
		dependency: [dispatch,match.params.id],
	})
	console.log("currentUserProfile",selectedUserProfile)

	if ((loading && !selectedUserProfile ) || (!selectedUserProfile)) return <LoadingComponent content="loading profile" />
	return (
		<Grid>
			<Grid.Column width={16}>
				<ProfileHeader profile={selectedUserProfile} isCurrentUser={currentUser.uid === match.params.id} />
				<ProfileContent profile={selectedUserProfile} isCurrentUser={currentUser.uid === match.params.id} />
			</Grid.Column>
		</Grid>
	)
}

export default ProfilePage
