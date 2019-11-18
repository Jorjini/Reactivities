import React, {FormEvent, useState} from "react";
import {Button, Form, FormInput, FormTextArea, Segment} from "semantic-ui-react";
import {IActivity} from "../../../app/models/activity";
import {v4 as uuid} from 'uuid';

interface IProps {
    setEditMode: (editMode: boolean) => void;
    activity:  IActivity;
    createActivity: (activity: IActivity) => void;
    editActivity: (activity: IActivity) => void;
    submitting: boolean;
}

const ActivityForm: React.FC<IProps> = ({setEditMode, activity: initialFormState, createActivity, editActivity, submitting}) => {
    const InitForm = () => {
        if(initialFormState) {
            return initialFormState;
        }
        else {
            return {
                id:'',
                title: '',
                category: '',
                description: '',
                city: '',
                venue: '',
                date: ''
            }
        }
    }

    const [activity, setActivity] = useState<IActivity>(InitForm);
    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.currentTarget;
        setActivity({...activity, [name]: value});
    };

    const handleSubmit = () => {
        if(activity.id.length <= 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            };
            createActivity(newActivity);
        } else {
            editActivity(activity);
        }
    };

    return(
        <Segment clearing>
            <Form onSubmit={() => handleSubmit()}>
                <FormInput placeholder='Title' value={activity.title} onChange={handleInputChange} name='title'/>
                <FormTextArea placeholder='Description' value={activity.description} onChange={handleInputChange} name='description'/>
                <FormInput placeholder='Category' value={activity.category} onChange={handleInputChange} name='category'/>
                <FormInput type='datetime-local' placeholder='Date' value={activity.date} onChange={handleInputChange} name='date'/>
                <FormInput placeholder='City' value={activity.city} onChange={handleInputChange} name='city'/>
                <FormInput placeholder='Venue' value={activity.venue} onChange={handleInputChange} name='venue'/>
                <Button floated='right' positive type='submit' content='Submit' loading={submitting}/>
                <Button floated='right' type='button' content='Cancel' onClick={() => setEditMode(false)}/>
            </Form>
        </Segment>
    )
}

export default ActivityForm;
