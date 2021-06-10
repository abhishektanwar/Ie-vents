import firebase from 'firebase/app'
import { setUserProfileData } from './firestoreService';

export function firebaseObjectToArray(snapshot){
	if(snapshot){
		return Object.entries(snapshot).map(e=>Object.assign({},e[1],{id:e[0]}))
	}
}

export async function registerInFirestore(creds){
	try{
		const result = await firebase.auth().createUserWithEmailAndPassword(creds.email,creds.password);
		await result.user.updateProfile({
			displayName:creds.displayName
		})
		await setUserProfileData(result.user)
		
	}
	catch (error){
		throw error
	}
}

export function signInWithEmail(creds){
	return firebase.auth().signInWithEmailAndPassword(creds.email,creds.password);
}

export function updateUserPassword(creds){
	const user = firebase.auth().currentUser;
	console.log(creds)
	return user.updatePassword(creds)
}

// img uppload from PhotoWidget
export function uploadToFirebaseStorage(file,filename){
	const user = firebase.auth().currentUser
	const storageRef = firebase.storage().ref();
	// uploading to firestore storage here
	return storageRef.child(`${user.uid}/user_images/${filename}`).put(file);
	// this will return download url 
}

// delete photo from storage
export function deleteFromFirebaseStorage(filename){
	const userUid = firebase.auth().currentUser.uid;
	const storageRef = firebase.storage().ref();
	const photoRef = storageRef.child(`${userUid}/user_images/${filename}`);
	return photoRef.delete()
}

export function addEventChatComment(eventId,values){
	const user = firebase.auth().currentUser;
	const newComment = {
		displayName:user.displayName,
		photoURL:user.photoURL,
		uid:user.uid,
		text:values.comment,
		date: Date.now(),
		parentId:values.parentId
	}

	return firebase.database().ref(`chat/${eventId}`).push(newComment);
}

export function getEventChatRef(eventId){
	return firebase.database().ref(`chat/${eventId}`).orderByKey()
}

