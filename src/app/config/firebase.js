import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
	apiKey: "AIzaSyCj_JXQhyF1ubpOe5zynJKXcn3ZvuI4H8o",
	authDomain: "ievents-a5bac.firebaseapp.com",
	projectId: "ievents-a5bac",
	storageBucket: "ievents-a5bac.appspot.com",
	messagingSenderId: "783447957295",
	appId: "1:783447957295:web:edded3f52639196c934bda"
};
firebase.initializeApp(firebaseConfig)
firebase.firestore();

export default firebase