import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Grid } from 'semantic-ui-react'
import { listenToEventFromFirestore } from '../../../app/firestore/firestoreService'
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { listenToEvents } from '../eventActions'
import EventDetailedChat from './EventDetailedChat'
import EventDetailedHeader from './EventDetailedHeader'
import EventDetailedInfo from './EventDetailedInfo'
import EventDetailedSidebar from './EventDetailedSidebar'

function EventDetailedPage({match}) {
	const dispatch = useDispatch()
	const {loading} = useSelector((state)=>state.async)

	console.log(match)
	// let {id} = useParams()
	// console.log("id",id)
	const event = useSelector(state => state.event.events.find(e => e.id === match.params.id))
	console.log("event",event)

	useFirestoreDoc({
		query:()=>listenToEventFromFirestore(match.params.id),
		data:event=>dispatch(listenToEvents([event])),
		dependency:[match.params.id,dispatch]
	})

	if (loading || !event) return <LoadingComponent content = "loading event ..." />
	return (
		<Grid>
			<Grid.Column width={10}>
				<EventDetailedHeader event={event}/>
				<EventDetailedInfo event={event}/>
				<EventDetailedChat />
			</Grid.Column>
			<Grid.Column width={6}>
				<EventDetailedSidebar attendees={event.attendees}/>
			</Grid.Column>
		</Grid>
	)
}

export default EventDetailedPage
