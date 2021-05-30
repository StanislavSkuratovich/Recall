import React, {useEffect, useState } from 'react';
import axios from 'axios';
import { Container} from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';

// interface Props{
//   activities:Activity[],
//   selectedActivity:Activity,
//   selectActivity(id:string):void
// }

function App() {
  const[activities, setActivities] = useState<Activity[]>([]);
  const[selectedActivity, selectActivity]= useState<Activity| undefined>(undefined);
  const[editMode, setEditMode] = useState(false);//base edit state
  useEffect(() => {
    axios.get<Activity[]>("http://localhost:5000/api/Activities")
    .then(response=>{      
      setActivities(response.data);
    })
    },[]) 
function HandleActivitySelection(id:string){
  selectActivity(activities.find(i=>i.id === id))
}

function HandleDeleteActivity(id:string){
  setActivities([...activities.filter(i=>i.id !==id)])
}

function HandleActivityCancel(){
  selectActivity(undefined);
}

function handleFormOpen(id?:string) {
  id ? HandleActivitySelection(id) : HandleActivityCancel();
  setEditMode(true);
}

function HandleEditFormClose(){
  setEditMode(false);
}

function CreateOrEditActivity(activity:Activity){
  activity.id? setActivities([...activities.filter(i=>i.id !== activity.id), activity])
  :setActivities([...activities, {...activity, id:uuid()}]);//if exists update, else add
  setEditMode(false);
  selectActivity(activity);
}
  return (
    <>
<NavBar openForm={handleFormOpen}/>
<Container style={{marginTop:'7rem'}}>
<ActivityDashboard 
activities={activities} 
selectedActivity={selectedActivity} 
selectActivity = {HandleActivitySelection} 
cancelActivity = {HandleActivityCancel}
editMode = {editMode}
openForm = {handleFormOpen}
closeForm = {HandleEditFormClose}
createOrEdit = {CreateOrEditActivity}
deleteActivity = {HandleDeleteActivity}

/>

  

</Container>
    </>
  );
}

export default App;
