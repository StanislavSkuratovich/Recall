import React, { useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import axios from 'axios';
import { Header, Icon, List } from 'semantic-ui-react'

function App() {
  const[activities, setActivities] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/api/Activities")
    .then(response=>{
      console.log(response);
      setActivities(response.data);
    })
    },[])
  

  return (
    <div>
       <Header as='h2' icon>
    <Icon name='users' />
    Reactivities
  </Header>
    <List>
    <List.Item>
          {activities.map((activity:any)=>(
            <li key= {activity.id}>
             {activity.title}
            </li>
          ))}
        </List.Item>
    </List>

       
    </div>
  );
}

export default App;
