import React, {useState, useEffect, SyntheticEvent} from 'react';
import './styles.css';
import {Container} from 'semantic-ui-react'
import {IActivity} from "../models/activity";
import NavBar from "../../features/nav/navbar";
import ActivityDashboard from "../../features/activities/dashboard/activity.dashboard";
import agent from "../api/agent";
import LoadingComponent from "./lading-component";


const App = () => {

    const [activities, setActivities] = useState<IActivity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [target, setTarget] = useState('');

    const handleSelectedActivity = (id: string) => {
        setSelectedActivity(activities.filter(a=>a.id === id)[0]);
        setEditMode(false);
    };

    const handleOpenCreateForm = () => {
        setSelectedActivity(null);
        setEditMode(true);
    };

    const handleCreateActivity = (activity: IActivity) => {
        setSubmitting(true);
        agent.Activities.create(activity).then(() => {
            setActivities([...activities, activity]);
            setSelectedActivity(activity);
            setEditMode(false);
        }).then(() => setSubmitting(false));
    };

    const handleEditActivity = (activity: IActivity) => {
        setSubmitting(true);
        agent.Activities.update(activity).then(()=> {
            setActivities([...activities.filter(a=>a.id !== activity.id), activity]);
            setSelectedActivity(activity);
            setEditMode(false);
        }).then(() => setSubmitting(false));

    };

    const handleDeleteActivity = (event: SyntheticEvent<HTMLButtonElement>, activityId: string) => {
        setSubmitting(true);
        setTarget(event.currentTarget.name);
        agent.Activities.delete(activityId).then(() => {
            setActivities([...activities.filter(a=>a.id !== activityId)]);
        }).then(() => setSubmitting(false));
    };

    // useEffect ის ბოლოში, ცარიელი მასივის გადაცემა საჭიროა იმისთვის რომ ყოველ გამოძახებაზე არ იმუშაოს ამ ეფექცტმა
    // და რომ არ ჩაიციკლოს
    useEffect(() => {
        agent.Activities.list()
            .then((resp) => {
              let activities: IActivity[] = [];
              resp.forEach((activity) => {
                  activity.date = activity.date.split('.')[0];
                  activities.push(activity);
              });

             setActivities(activities);
          }).then(() => setLoading(false));

    }, []);

    if(loading) return <LoadingComponent content='Loading Activities...'  />

          return (
              // eslint-disable-next-line react/jsx-no-undef
              <React.Fragment>
                  <NavBar openCreateActivityForm={handleOpenCreateForm}/>
                  {/*<Header as='h2' icon='users' content='Reactivities' />*/}
                  <Container style={{marginTop: '7em'}}>
                      <ActivityDashboard
                          activities={activities}
                          selectActivity={handleSelectedActivity}
                          selectedActivity={selectedActivity}
                          editMode={editMode}
                          setEditMode={setEditMode}
                          setSelectedActivity={setSelectedActivity}
                          deleteActivity={handleDeleteActivity}
                          target={target}
                      createActivity={handleCreateActivity}
                      editActivity={handleEditActivity}
                      submitting={submitting}/>
                  </Container>

              </React.Fragment>
          );

};

export default App;
