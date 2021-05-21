import { SIGN_IN_USER, SIGN_OUT_USER } from "./authConstants";
import firebase from 'firebase/app'

// export function signInUser(creds){
// 	return async function(dispatch){
// 		try{
// 			const result = await firebase.auth().signInWithEmailAndPassword(creds.email,creds.password)
// 			console.log("result",result)
// 			dispatch({type:SIGN_IN_USER,payload:result.user})
// 		}
// 		catch (error){
// 			throw error;
// 		}
// 	}
// }

export function signInUser(user){
	return{
		type:SIGN_IN_USER,
		payload:user
	}
}

// retainint the user on refreshes , onAuthStateChange
export function verifyAuth(){
	return function(dispatch){
		return firebase.auth().onAuthStateChanged(user =>{
			if (user){
				dispatch(signInUser(user))
				// dispatch({type:SIGN_IN_USER,payload:user})
			}
			else{
				// dispatch(signOutUser())
				dispatch({type:SIGN_OUT_USER})
			}
		})
	}
}

export function signOutUser(){
	return firebase.auth().signOut()
	// return {
	// 	type:SIGN_OUT_USER
	// }
}