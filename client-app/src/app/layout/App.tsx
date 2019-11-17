import React, { useState, useEffect } from 'react';
import './styles.css';
import http from 'axios';
import {Container} from 'semantic-ui-react'
import {IActivity} from "../models/activity";
import NavBar from "../../features/nav/navbar";
import ActivityDashboard from "../../features/activities/dashboard/activity.dashboard";


const App = () => {

    const [activities, setActivities] = useState<IActivity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
    const [editMode, setEditMode] = useState(false);

    const handleSelectedActivity = (id: string) => {
        setSelectedActivity(activities.filter(a=>a.id === id)[0]);
        setEditMode(false);
    };

    const handleOpenCreateForm = () => {
        setSelectedActivity(null);
        setEditMode(true);
    };

    const handleCreateActivity = (activity: IActivity) => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
    };

    const handleEditActivity = (activity: IActivity) => {
        setActivities([...activities.filter(a=>a.id !== activity.id), activity]);
    };

    const handleDeleteActivity = (activityId: string) => {
        setActivities([...activities.filter(a=>a.id !== activityId)]);
    }

    // useEffect ის ბოლოში, ცარიელი მასივის გადაცემა საჭიროა იმისთვის რომ ყოველ გამოძახებაზე არ იმუშაოს ამ ეფექცტმა
    // და რომ არ ჩაიციკლოს
    useEffect(() => {

          var baseUrl = 'http://localhost:5000/';

          // Getting API
          http.get<IActivity[]>(baseUrl + 'api/activities').then((resp) => {
              let activities: IActivity[] = [];
              resp.data.forEach(activity => {
                  activity.date = activity.date.split('.')[0];
                  activities.push(activity);
              });

             setActivities(activities);
          });

    }, []);
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
                      createActivity={handleCreateActivity}
                      editActivity={handleEditActivity}/>
                  </Container>

              </React.Fragment>
          );

};

export default App;
