import React, {useEffect, useContext} from 'react';
import './styles.css';
import {Container} from 'semantic-ui-react'
import NavBar from "../../features/nav/navbar";
import ActivityDashboard from "../../features/activities/dashboard/activity.dashboard";
import LoadingComponent from "./lading-component";
import ActivityStore from '../stores/activity-store';
import {observer} from "mobx-react-lite";


const App = () => {

    const activityStore = useContext(ActivityStore);

    // useEffect ის ბოლოში, ცარიელი მასივის გადაცემა საჭიროა იმისთვის რომ ყოველ გამოძახებაზე არ იმუშაოს ამ ეფექცტმა
    // და რომ არ ჩაიციკლოს
    useEffect(() => {
        activityStore.loadActivities();
    }, [activityStore]);

    if(activityStore.loadingInitial) return <LoadingComponent content='Loading Activities...'  />

          return (
              // eslint-disable-next-line react/jsx-no-undef
              <React.Fragment>
                  <NavBar/>
                  {/*<Header as='h2' icon='users' content='Reactivities' />*/}
                  <Container style={{marginTop: '7em'}}>
                      <ActivityDashboard />
                  </Container>

              </React.Fragment>
          );

};

export default observer(App)
