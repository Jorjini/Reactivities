import React, {FormEvent, useContext, useState} from "react";
import {Button, Form, FormInput, FormTextArea, Segment} from "semantic-ui-react";
import {IActivity} from "../../../app/models/activity";
import {v4 as uuid} from 'uuid';
import ActivityStore from "../../../app/stores/activity-store";
import {observer} from "mobx-react-lite";

interface IProps {
    activity:  IActivity;
}

const ActivityForm: React.FC<IProps> = ({activity: initialFormState}) => {
    const activityStore = useContext(ActivityStore);
    const {createActivity, editActivity, submitting, cancelFormOpen} = activityStore;

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
                <Button floated='right' type='button' content='Cancel' onClick={cancelFormOpen}/>
            </Form>
        </Segment>
    )
}

export default observer(ActivityForm);
