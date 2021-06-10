import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Header, Segment,Comment } from 'semantic-ui-react'
import { firebaseObjectToArray, getEventChatRef } from '../../../app/firestore/firebaseService';
import { listenToEventChat } from '../eventActions';
import EventDetailedChatForm from './EventDetailedChatForm'
import {Link} from 'react-router-dom'
import { createDataTree } from '../../../app/common/util/util';

function EventDetailedChat({eventId}) {

	const dispatch = useDispatch();
	const {comments} = useSelector(state => state.event);
	const [showReplyForm,setShowReplyForm] = useState({
		open:false,
		commentId:null
	})

	function handleCloseReplyForm () {
		setShowReplyForm({open:false,commentId:null})
	}
	useEffect(()=>{
		getEventChatRef(eventId).on('value',snapshot =>{
			if(!snapshot.exists()) return;
			dispatch(listenToEventChat(firebaseObjectToArray(snapshot.val())))
		})
	},[eventId,dispatch])

	function getDateOfComment(timestamp){
		let date = new Date(timestamp).getDate()
		let month = new Date(timestamp).getMonth()+1
		let year = new Date(timestamp).getFullYear()
		return `${date}/${month}/${year}`
	}

	function closeReplyForm(){
		if(showReplyForm.open){
			setShowReplyForm({...showReplyForm,open:false})
		}
	}
	return (
		<>
			<Segment
				textAlign='center'
				attached="top"
				inverted
				color="teal"
				style={{border:'none'}}
			>
				<Header>Chat about this event</Header>
			</Segment>

			<Segment attached>
				<Comment.Group>
					{createDataTree(comments).map(comment=>(
						<Comment key={comment.id}>
							<Comment.Avatar src={comment.photoURL || 'assets/user.png'} />
								<Comment.Content>
									<Comment.Author>
										{comment.displayName}
									</Comment.Author>
									<Comment.Metadata>
										<div>{getDateOfComment(comment.date)}</div>
									</Comment.Metadata>
									<Comment.Text>{comment.text}</Comment.Text>
									<Comment.Actions>
										<Comment.Action onClick={()=>setShowReplyForm({open:true,commentId:comment.id})}>Reply</Comment.Action>
									{showReplyForm.open && showReplyForm.commentId === comment.id &&
										<EventDetailedChatForm eventId={eventId} parentId={comment.id} closeForm={handleCloseReplyForm}/>	
									}
									</Comment.Actions>
							</Comment.Content>
							<Comment.Group>
								{comment.childNodes.length>0 && (
									comment.childNodes.map(child=>(
										<Comment key={child.id}>
											<Comment.Avatar src={child.photoURL || 'assets/user.png'} />
										<Comment.Content>
											<Comment.Author>
												{child.displayName}
											</Comment.Author>
											<Comment.Metadata>
												<div>{getDateOfComment(child.date)}</div>
											</Comment.Metadata>
											<Comment.Text>{child.text}</Comment.Text>
											<Comment.Actions>
												<Comment.Action onClick={()=>{setShowReplyForm({
													open:true,commentId:child.id}) 
													closeReplyForm()}}>Reply</Comment.Action>
											{showReplyForm.open && showReplyForm.commentId === child.id &&
												<EventDetailedChatForm eventId={eventId} parentId={child.parentId} closeForm={handleCloseReplyForm}/>	
											}
											</Comment.Actions>
										</Comment.Content>
										</Comment>
									))
								)}
							</Comment.Group>
						</Comment>
					))}
					

					
				</Comment.Group>
				<EventDetailedChatForm eventId={eventId} parentId={0} />
			</Segment>
		</>
	)
}

export default EventDetailedChat
