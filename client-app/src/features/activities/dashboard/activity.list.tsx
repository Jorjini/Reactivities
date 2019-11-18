import React, {SyntheticEvent} from "react";
import {Button, Item, Label, Segment} from "semantic-ui-react";
import {IActivity} from "../../../app/models/activity";

interface IProps {
    activities: IActivity [];
    selectActivity: (id:string) => void;
    deleteActivity: (event: SyntheticEvent<HTMLButtonElement>, activityId: string) => void;
    submitting: boolean;
    target: string
}


const ActivityList: React.FC<IProps> = ({activities, selectActivity, deleteActivity, submitting, target}) => {
    return (
        <Segment clearing>
            <Item.Group divided>
                {activities.map(act => (
                    <Item key={act.id}>
                        <Item.Content>
                            <Item.Header as='a'>{act.title}</Item.Header>
                            <Item.Meta>{act.date}</Item.Meta>
                            <Item.Description>
                                <div>{act.category}</div>
                                <div>{act.city}, {act.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button
                                    onClick={() => selectActivity(act.id)}
                                    floated='right'
                                    content='View'
                                    color='blue'
                                />
                                <Button
                                    onClick={(e)=> deleteActivity(e, act.id)}
                                    floated='right'
                                    content='Delete'
                                    color='red'
                                    loading={target === act.id && submitting}
                                    name={act.id}
                                />
                                <Label basic content={act.category}/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>


    )
};

export default ActivityList;
