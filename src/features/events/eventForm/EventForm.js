import cuid from 'cuid';
import React,{ useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Dropdown, Form, Header, Segment } from 'semantic-ui-react'
import { addEventToFirestore, cancelEventToggle, listenToEventFromFirestore, updateEventInFirestore } from '../../../app/firestore/firestoreService';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { createEvent, listenToEvents, updateEvent } from '../eventActions';

function EventForm({match}) {
	const dispatch = useDispatch()
	// const selectedEvent = useSelector(state => state.event.events.find(e => e.id === match.params.id))
	// const {selectedEvent} = useSelector(state=>state.event)
	// using useSelector conditionally
	const selectedEvent = useSelector(state =>{
		if(match.params.id){
			return state.event.events.find(e => e.id === match.params.id)
		}
		else{
			return null;
		}
	})
	const {loading} = useSelector(state => state.async)
	const history = useHistory()
	// selectedEvent ?? => if selectedEvent == null , set right of ?? to initialvalues else set selectedEvent to initialValues
	// console.log(selectedEvent,"from")
	let initialValue = selectedEvent ?? {
		'title':'',
		'category':'',
		'description':'',
		'city':'',
		'venue':'',
		'date':''
	};
	const [values,setValues] = useState(initialValue)
	const [title,setTitle] = useState('')
	const [val,setVal] = useState('tikki')
	async function handleFormSubmit(e){
		// e.preventDefault()
		// selectedEvent and values both are objects, here in updateEvent 
		// make a copy of selectedEvent and update fields with values object
		// values object is a subset of selectedEvent object					 
		 
		try{
			selectedEvent ?
			// dispatch(updateEvent({...selectedEvent,...values}))
			await updateEventInFirestore(values)
			: 
			await addEventToFirestore(values)
			// dispatch(createEvent({...values,id:cuid(),attendees:[],hostedBy:'bob the builder',hostPhotoURL:"/assets/user.png"}))
			// await 
			// console.log({...values})
			// setFormOpen(false)
			history.push('/events')
		}
		catch(error) {
			toast.error(error.message)
		}
	
			// selectedEvent ?
			// dispatch(updateEvent({...selectedEvent,...values}))
			// // await updateEventInFirestore(values)
			// : 
			// // await addEventToFirestore(values)
			// dispatch(createEvent({...values,id:cuid(),attendees:[],hostedBy:'bob the builder',hostPhotoURL:"/assets/user.png"}))
			// // await 
			// // console.log({...values})
			// // setFormOpen(false)
			// history.push('/events')

	}

	function handleInputChange(e){
		const {name,value} = e.target
		setValues({...values,[name]:value})
		// console.log(values)
	}

	function handleSelect(e){
		console.log(e.target.value);
	}
	useEffect(()=>{
		// {...initialValue,'title':'abcm'}
		initialValue = selectedEvent ?? {
			'title':'',
			'category':'',
			'description':'',
			'city':'',
			'venue':'',
			'date':''
		};
		setValues(initialValue)
	},[selectedEvent])

	// const travelCategoryOptions = [
	// 	{
	// 		key:'travel',
	// 		text:'travel',
	// 		value:'travel'
	// 	},
	// 	{
	// 		key:'party',
	// 		text:'party',
	// 		value:'party'
	// 	}
	// ]

	useFirestoreDoc({
		shouldExecute:!!match.params.id,
		query:()=>listenToEventFromFirestore(match.params.id),
		data:(event)=>dispatch(listenToEvents([event])),
		dependency:[match.params.id,dispatch]

	})

	if (loading) return <LoadingComponent content="loading ..." />
	return (
		<Segment style={{paddingBottom:'50px'}}>
			<Header content={selectedEvent ? "Edit Event" : "Create new event"} />
			<Form onSubmit={handleFormSubmit}>
				<Form.Field>
					<input 
						type="text" 
						placeholder="Event title" 
						name="title"
						value={values.title} 
						onChange={(e) => {handleInputChange(e)}} />
				</Form.Field>
				{/* <Form.Field>

					<input 
						type="text" 
						placeholder="Category"
						name="category"
						value={values.category} 
						onChange={(e) => {handleInputChange(e)}} />
						
				</Form.Field> */}
				<Form.Field>

					<select 
						placeholder="lele" 
						// defaultValue={''} 
						name="category" 
						onChange={(e) => {handleInputChange(e)}} >
							<option value="">Select Category</option>
							<option value="culture">Culture</option>
							<option value="travel">Travel</option>
							<option value="film">Film</option>
							<option value="food">Food</option>
							<option value="music">Music</option>
							{/* <option value="travel">Radish</option> */}
					</select>	
						
				</Form.Field>
				<Form.Field>
					<textarea 
						type="text" 
						placeholder="Description"
						name="description"
						value={values.description} 
						onChange={(e) => {handleInputChange(e)}} />
					
				</Form.Field>
				<Form.Field>
					<input 
						type="text" 
						placeholder="City"
						name="city"
						value={values.city} 
						onChange={(e) => {handleInputChange(e)}} />
				</Form.Field>
				<Form.Field>
					<input 
						type="text" 
						placeholder="Venue"
						name="venue"
						value={values.venue} 
						onChange={(e) => {handleInputChange(e)}} />
				</Form.Field>
				<Form.Field>
					<input 
						type="date" 
						placeholder="Date"
						name="date"
						value={values.date} 
						onChange={(e) => {handleInputChange(e)}} />
				</Form.Field>
				<Button type="submit" floated='right' positive content={selectedEvent ? 'Update' : 'Create'} />
				<Button as={Link} to='/events' type="submit" floated='right' content='Cancel' />
				{selectedEvent ? <Button 
					type="button" 
					floated='lefta' 
					color={selectedEvent.isCancelled ? 'green' : 'red'}
					content={selectedEvent.isCancelled ? 'Reactivate Event' : 'Cancel Event'} 
					onClick={()=>{cancelEventToggle(selectedEvent)}}
					/>
				:
				null}
				
				
			</Form>
		</Segment>
	)
}

export default EventForm
