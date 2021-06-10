import React,{useState} from 'react';
import { toast } from 'react-toastify';
import { Form, Button } from 'semantic-ui-react'
import { addEventChatComment } from '../../../app/firestore/firebaseService';
export default function EventDetailedChatForm({eventId,parentId,closeForm}) {

    const [isSubmitting, setSubmitting] = useState(false)
    const initialValue = {
        comment:'',
    }

    const [values,setValues] = useState(initialValue)

    const handleFormSubmit =async () => {
        try{
            setSubmitting(true)
            await addEventChatComment(eventId,{...values,parentId})
            setValues(initialValue);

        }
        catch (error){
            toast.error(error.message)
        }
        finally{
            setSubmitting(false)
            closeForm({open:false,commentId:null})
        }
        
    }

    function handleInputChange (e){
        const {name,value} = e.target
        setValues({...values,[name]:value})
    }

    return (
        <Form onSubmit={handleFormSubmit}>
            
						<Form.TextArea 
                            type="text"
                            placeholder="Please enter your comment here"
                            name="comment"
                            value={values.comment}
                            onChange={(e) => handleInputChange(e)}
                        />
						<Button
                            type="submit"
							content="Add Reply"
							labelPosition="left"
							icon="edit"
							primary
						></Button>
					</Form>
    )
}