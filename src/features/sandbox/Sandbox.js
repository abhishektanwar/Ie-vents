import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { DECREMENT_COUNTER, INCREMENT_COUNTER } from './testReducer'

function Sandbox() {
	const dispatch = useDispatch()
	const data = useSelector(state => state.test.data)
	return (
		<>
			<h1>testing 123</h1>
			<h3>Data is :{data}</h3>
			<Button content='increment' color='green' onClick={()=>dispatch({type:INCREMENT_COUNTER})} />
			<Button content='decrement' color='red' onClick={()=>dispatch({type:DECREMENT_COUNTER})} />
		</>
	)
}

export default Sandbox
