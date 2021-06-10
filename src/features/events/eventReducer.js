import { sampleData } from '../../app/api/sampleData'
import { CREATE_EVENT, DELETE_EVENT, FETCH_EVENT, LISTEN_TO_EVENT_CHAT, UPDATE_EVENT } from './eventConstants'

const initialState = {
	events:[],
	comments:[]
}


export default function eventReducer(state = initialState,{type,payload}){
	switch (type){
		case CREATE_EVENT:
			return {
				...state,
				events:[...state.events,payload]
			}
		case UPDATE_EVENT:
			return {
				...state,
				events: [...state.events.filter(event => event.id !== payload.id),payload]
			}
		case DELETE_EVENT:
			return {
				...state,
				events:[...state.events.filter(event => event.id !== payload)]
			}
		case FETCH_EVENT:
			return {
				...state,
				events:payload
			}
		case  LISTEN_TO_EVENT_CHAT:
			return{
				...state,
				comments:payload
			}
		default :
		return state;
	}
}