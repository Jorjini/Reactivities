import React, {useContext} from "react";
import {Button, Item, Label, Segment} from "semantic-ui-react";
import {observer} from "mobx-react-lite";
import ActivityStore from "../../../app/stores/activity-store";

const ActivityList: React.FC = () => {

    const activityStore = useContext(ActivityStore);
    const {activitiesByDate, selectActivity, deleteActivity, submitting, target} = activityStore;

    return (
        <Segment clearing>
            <Item.Group divided>
                {activitiesByDate.map(act => (
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

export default observer(ActivityList);
