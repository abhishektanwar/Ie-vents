import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { openModal } from '../../app/common/modals/modalReducer'
import { DECREMENT_COUNTER, INCREMENT_COUNTER } from './testReducer'
import { increment,decrement } from '../sandbox/testReducer';

function Sandbox() {
	const dispatch = useDispatch()
	const data = useSelector(state => state.test.data)
	const {loading} = useSelector(state => state.async)
	const [target,setTarget] = useState(null)
	return (
		<>
			<h1>testing 123</h1>
			<h3>Data is :{data}</h3>
			<Button 
				loading = {loading && target==="increment"}
				content='increment' 
				name="increment"
				color='green' 
				onClick={(e)=>{
					dispatch(decrement(10))
					setTarget(e.target.name)
				}} />
			<Button 
				loading = {loading && target==="decrement"} 
				name="decrement"
				content='decrement' color='red' 
				onClick={(e)=>{
					dispatch(decrement(10))
					setTarget(e.target.name)
				}} />
			<Button content='Open Modal' color='teal' onClick={()=>dispatch(openModal({modalType:'TestModal',modalProps:{data}}))} />
		</>
	)
}

export default Sandbox
