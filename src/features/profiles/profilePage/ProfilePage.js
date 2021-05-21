import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import { getUserProfile } from '../../../app/firestore/firestoreService'
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc'
import { listenToCurrentUserProfile } from '../profileActions'
import ProfileContent from './ProfileContent'
import ProfileHeader from './ProfileHeader'
import LoadingComponent from '../../../app/layout/LoadingComponent'

function ProfilePage({match}) {
	const dispatch = useDispatch()
	const {currentUserProfile} = useSelector(state => state.profile)
	const {loading} = useSelector(state => state.async)
	console.log("match.params.id",match.params.id)
	useFirestoreDoc({
		query:() => getUserProfile(match.params.id),
		data: profile => dispatch(listenToCurrentUserProfile(profile)),
		dependency: [dispatch,match.params.id],
	})
	console.log("currentUserProfile",currentUserProfile)

	if ((loading && !currentUserProfile ) || (!currentUserProfile)) return <LoadingComponent content="loading profile" />
	return (
		<Grid>
			<Grid.Column width={16}>
				<ProfileHeader profile={currentUserProfile} />
				<ProfileContent profile={currentUserProfile} />
			</Grid.Column>
		</Grid>
	)
}

export default ProfilePage
