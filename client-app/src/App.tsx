import React, {Component} from 'react';
import './App.css';
import http from 'axios';
import { Header, List } from 'semantic-ui-react'

class App extends Component{
      state = { values: [] };
      componentDidMount(): void {
          var baseUrl = 'http://localhost:5000/';

          // Getting API
          http.get(baseUrl + 'api/values').then((resp) => {
              this.setState(
                  {values: resp.data});
          });


      }

    render() {
          return (
              <div>
                  <Header as='h2' icon='users' content='Reactivities' />
                  <List>
                      {
                          this.state.values.map((value: any) => (
                              <List.Item key={value.id}>{value.name}</List.Item>
                          ))
                      }

                  </List>
              </div>
          );
      }
};

export default App;
