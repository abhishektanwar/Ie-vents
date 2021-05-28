import React,{ useState,useEffect } from 'react'
import { Grid, GridColumn } from 'semantic-ui-react'
import EventList from './EventList'
import { sampleData } from '../../../app/api/sampleData'
import { useDispatch, useSelector } from 'react-redux'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import EventListItemPlaceholder from './EventListItemPlaceholder'
import EventFilter from './EventFilter'
import { dataFromSnapshot, getEventsFromFirestore,listenToEventsFromFirestore,useFirestore } from '../../../app/firestore/firestoreService'
import { listenToEvents } from '../eventActions'
import firebase from 'firebase/app'
import { asyncActionError, asyncActionFinish, asyncActionStart } from '../../../app/async/asyncReducer'
import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection'
const db = firebase.firestore();

function EventDashboard() {
	const {events} = useSelector(state => state.event)
	const {loading} = useSelector(state => state.async)
	const dispatch = useDispatch()
	// useEffect(()=>{
	// 	// fix this approach
	// 	// let documents=[]
	// 	// setTimeout(()=>{
	// 	// 	console.log(documents)
	// 	// 	dispatch(listenToEvents(documents))
	// 	// },5000)
	// 	// const unsubscribe = db.collection('events').onSnapshot(snap=>{
	// 	// 	snap.docs.map(d=>{
	// 	// 		documents.push({
	// 	// 			...d.data(),
	// 	// 			id:d.id
	// 	// 		})
	// 	// 	})
	// 	// }).then(()=>{
	// 	// 	console.log(documents)
	// 	// 	dispatch(listenToEvents(documents))
	// 	// })
		
	// 	const unsubscribe = getEventsFromFirestore({
	// 		next:snapshot => {
	// 			dispatch(asyncActionStart())
	// 			dispatch(listenToEvents(snapshot.docs.map(docSnapshot => dataFromSnapshot(docSnapshot))))
	// 			dispatch(asyncActionFinish())
	// 		},
	// 		error:error => dispatch(asyncActionError(error))
	// 	})
		
	// 	// console.log(unsubscribe)
	// 	return unsubscribe
	// },[])
	function dataa(events){
		dispatch(listenToEvents(events))
	}
	useFirestoreCollection({
		query: ()=> listenToEventsFromFirestore(),
		data : (events)=> dispatch(listenToEvents(events)),
		dependency:[dispatch]
	})
	


	return (
		<Grid>
			{events && console.log(events)}
			<GridColumn width={10} >
				{loading && 
					<>
						<EventListItemPlaceholder />
						<EventListItemPlaceholder />
					</>
				}
				{events &&
				<EventList events={events} />
			}
			</GridColumn>
			<GridColumn width={6} >
				<EventFilter />
			</GridColumn>
		</Grid>

	)
}

export default EventDashboard
