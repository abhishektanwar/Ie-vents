import firebase from '../config/firebase'
import { useDispatch, useSelector } from 'react-redux'
import { listenToEvents } from '../../features/events/eventActions';
import cuid from 'cuid';
const db = firebase.firestore();
export function dataFromSnapshot(snapshot) {
	if (!snapshot.exists) return undefined;
	const data = snapshot.data();
  
	for (const prop in data) {
	  if (data.hasOwnProperty(prop)) {
		if (data[prop] instanceof firebase.firestore.Timestamp) {
		  data[prop] = data[prop].toDate();
		}
	  }
	}
  
	return {
	  ...data,
	  id: snapshot.id,
	};
  }
export function getEventsFromFirestore(observer){
	// getting data`
	// db.collection('events').onSnapshot(snap=>{
	// 	snap.docs.map(d=>{
	// 		console.log(d.data())
	// 	})
	// })
	return db.collection('events').onSnapshot(observer)
}

export function listenToEventsFromFirestore(){
	return db.collection('events');
}

export function listenToEventFromFirestore(eventId){
	return db.collection('events').doc(eventId);
}

export function addEventToFirestore(event){
	return db.collection('events').add({
		...event,
		hostedBy:'diana',
		isCancelled:false,
		hostPhotoURL:'https://randomuser.me/api/portraits/women/20.jpg',
		attendees:firebase.firestore.FieldValue.arrayUnion({
			id:cuid(),
			displayName:'Diana',
			photoURL:'https://randomuser.me/api/portraits/men/20.jpg'
		})
	})
}

export function updateEventInFirestore(event){
	return db.collection('events').doc(event.id).update(event)
}

export function deleteEventInFIrestore(eventId){
	return db.collection('events').doc(eventId).delete()
}

export function cancelEventToggle(event){
	return db.collection('events').doc(event.id).update({
		isCancelled:!event.isCancelled
	})
}

export function setUserProfileData(user){
	return db.collection('users').doc(user.uid).set({
		displayName:user.displayName,
		email:user.email,
		createdAt:firebase.firestore.FieldValue.serverTimestamp()
	})
}
// useEffect(()=>{
// 	const unsubscribe = getEventsFromFirestore({
// 		next:snapshot => dispatch(listenToEvents(snapshot.docs.map(docSnapshot => dataFromSnapshot(docSnapshot)))),
// 		// next:snapshot => dispatch(listenToEvents(snapshot.docs.map(docSnapshot => docSnapshot.data()))),
// 		error:error => console.log(error)
// 	})
// })