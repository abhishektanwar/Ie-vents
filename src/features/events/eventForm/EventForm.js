import cuid from 'cuid';
import React,{ useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Button, Form, Header, Segment } from 'semantic-ui-react'
import { createEvent, updateEvent } from '../eventActions';

function EventForm({match}) {

	const selectedEvent = useSelector(state => state.event.events.find(e => e.id === match.params.id))
	const dispatch = useDispatch()
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

	function handleFormSubmit(){
		// selectedEvent and values both are objects, here in updateEvent 
		// make a copy of selectedEvent and update fields with values object
		// values object is a subset of selectedEvent object					 
		selectedEvent ? 
			dispatch(updateEvent({...selectedEvent,...values}))
			: 
			dispatch(createEvent({...values,id:cuid(),attendees:[],hostedBy:'bob the builder',hostPhotoURL:"/assets/user.png"}))
			console.log({...values})
			// setFormOpen(false)
			history.push('/events')
	}

	function handleInputChange(e){
		const {name,value} = e.target
		setValues({...values,[name]:value})
		// console.log(values)
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
				<Form.Field>
					<input 
						type="text" 
						placeholder="Category"
						name="category"
						value={values.category} 
						onChange={(e) => {handleInputChange(e)}} />
				</Form.Field>
				<Form.Field>
					<input 
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
				
			</Form>
		</Segment>
	)
}

export default EventForm
