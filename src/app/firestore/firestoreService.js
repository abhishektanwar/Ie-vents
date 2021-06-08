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
	const user = firebase.auth().currentUser;

	return db.collection('events').orderBy('date');
	// switch (predicate.get('filter')){
	// 	case 'isGoing':
	// 		console.log("isGoing")
	// 		return eventRef.where('attendeeIds','array-contains',user.uid).where('date','>=',predicate.get('startDate'))
	// 	case 'isHosting':
	// 		console.log("isHost")
	// 		return eventRef.where('hostUid','==',user.uid).where('date','>=',predicate.get('startDate'))
	// 	default:
	// 		console.log("isdef",eventRef.where('date','>=',predicate.get('startDate')))
			
	// 		return eventRef.where('date','>=',predicate.get('startDate'))
	// }
}

export function listenToEventFromFirestore(eventId){
	return db.collection('events').doc(eventId);
}

export function addEventToFirestore(event){
	// console.log("hostedBy:",firebase.auth().currentUser.displayName)
	// console.log("hostPhotoURL:",firebase.auth().currentUser.photoURL)
	// ref to currently loggedin user
	const user = firebase.auth().currentUser
	return db.collection('events').add({
		...event,
		hostUid:user.uid,
		hostedBy:user.displayName,
		isCancelled:false,
		hostPhotoURL:user.photoURL || null,
		attendees:firebase.firestore.FieldValue.arrayUnion({
			id:user.uid,
			displayName:user.displayName,
			photoURL:user.photoURL || null
		}),
		// with attendeeIds we are going to be able to query to find out which events a user with that specific UID is going to
		attendeeIds: firebase.firestore.FieldValue.arrayUnion(user.uid)
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

// get current user profile
export function getUserProfile(userId){
	console.log("db.collection('users').doc(userId)",db.collection('users').doc(userId));
	return db.collection('users').doc(userId);
}

// updating user profile : if current user != profile display name
// update profile in firebase & update profile fully in user collection as well
export async function updateUserProfile(profile){
	// updating profile in auth,doesnt update profile in collection and firestore
	const user = firebase.auth().currentUser;
	try{
		if (user.displayName !== profile.displayName){
			await user.updateProfile({
				displayName:profile.displayName
			})
			
		}
		return await db.collection('users').doc(user.uid).update(profile)
	}
	catch (error){
		throw error
	}
} 

export async function updateUserProfilePhoto(downloadURL,filename){
	const user = firebase.auth().currentUser
	console.log("user112",user)
	const userDocRef = db.collection('users').doc(user.uid);
	try{
		const userDoc = await userDocRef.get();
		// if user doesnt have photoURL set ,
		// setting photo url also update photoURL in auth 
		if(!userDoc.data().photoURL){
			await db.collection('users').doc(user.uid).update({
				photoURL:downloadURL
			});
			await user.updateProfile({
				photoURL:downloadURL
			})
		}
		// addinf photo to photos collection to thus user's collection
		return await db.collection('users').doc(user.uid).collection('photos').add({
			name:filename,
			url:downloadURL
		})
	}
	catch (error){
		throw error;
	}

}


export function getUserPhotos(userUid){
	console.log("db.collection('users').doc(userUid).collection('photos')",
	db.collection('users').doc(userUid).collection('photos')
	.onSnapshot(snap=>{
		snap.docs.map(doc=>console.log("docdoc",doc.data()))
	})
	)
	return db.collection('users').doc(userUid).collection('photos')
}

// set main photo
export async function setMainPhoto(photo){
	const user = firebase.auth().currentUser
	try{
		await db.collection('users').doc(user.uid).update({
			photoURL:photo.url
		})
		return await user.updateProfile({
			photoURL:photo.url
		})
	}
	catch (error){
		throw error;
	}
}

// delete photo from firestore
export function deletePhotoFromCollection(photoId){
	const userUid = firebase.auth().currentUser.uid
	return db.collection('users').doc(userUid).collection('photos').doc(photoId).delete()
}

export function addUserAttendance(event){
	const user = firebase.auth().currentUser;
	return db.collection('events').doc(event.id).update({
		attendees:firebase.firestore.FieldValue.arrayUnion({
			id:user.uid,
			displayName:user.displayName,
			photoURL:user.photoURL || null
		}),
		// with attendeeIds we are going to be able to query to find out which events a user with that specific UID is going to
		attendeeIds: firebase.firestore.FieldValue.arrayUnion(user.uid)
	})
}

export async function cancelUserAttendance(event){
	const user = firebase.auth().currentUser;
	
	try{
		const eventDoc = await db.collection('events').doc(event.id).get();
		return db.collection('events').doc(event.id).update({
			attendeeIds:firebase.firestore.FieldValue.arrayRemove(user.uid),
			attendees:eventDoc.data().attendees.filter(attendee => attendee.id !==user.uid)

		})
	}
	catch (error){
		throw error;
	}
}
// useEffect(()=>{
// 	const unsubscribe = getEventsFromFirestore({
// 		next:snapshot => dispatch(listenToEvents(snapshot.docs.map(docSnapshot => dataFromSnapshot(docSnapshot)))),
// 		// next:snapshot => dispatch(listenToEvents(snapshot.docs.map(docSnapshot => docSnapshot.data()))),
// 		error:error => console.log(error)
// 	})
// })