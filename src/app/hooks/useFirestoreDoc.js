import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncActionError, asyncActionFinish, asyncActionStart } from '../async/asyncReducer'
import { dataFromSnapshot } from '../firestore/firestoreService'

function useFirestoreDoc({query,data,dependency,execute=true}) {
	const dispatch = useDispatch()
	useEffect(() => {
		if (!execute) return;
		dispatch(asyncActionStart())
		const unsubscribe = query().onSnapshot(snap =>{
			// if(!snap.exists){
			// 	dispatch(asyncActionError({
			// 		code:'not-found',
			// 		message:'could not find document'
			// 	}))
			// 	return;
			// }
			
			data(dataFromSnapshot(snap))
			dispatch(asyncActionFinish())
		},
		error => dispatch(asyncActionError(error))
		)
		return () => {
			unsubscribe()
		}
	}, dependency)
	return (
		<div>
			
		</div>
	)
}

export default useFirestoreDoc
