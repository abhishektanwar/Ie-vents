import firebase from 'firebase/app'
import { setUserProfileData } from './firestoreService';

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