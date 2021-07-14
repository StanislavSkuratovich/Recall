import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

// interface Props{
//   activities:Activity[],
//   selectedActivity:Activity,
//   selectActivity(id:string):void
// }

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, selectActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);//base edit state
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {

    agent.Activities.list().then(response => {
      let activities: Activity[] = [];
      response.forEach(activity => {
        activity.datetime = activity.datetime.split('T')[0];
        activities.push(activity);
      })
      setActivities(activities);
      setLoading(false);
      // axios.get<Activity[]>("http://localhost:5000/api/Activities")
      // .then(response=>{      
      //   setActivities(response.data);
    })
  }, [])
  function HandleActivitySelection(id: string) {
    selectActivity(activities.find(i => i.id === id))
  }

  function HandleDeleteActivity(id: string) {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(i => i.id !== id)]);
      setSubmitting(false);
    })

  }

  function HandleActivityCancel() {
    selectActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? HandleActivitySelection(id) : HandleActivityCancel();
    setEditMode(true);
  }

  function HandleEditFormClose() {
    setEditMode(false);
  }

  function CreateOrEditActivity(activity: Activity) {
    setSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(i => i.id !== activity.id), activity])
        selectActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, { ...activity, id: uuid() }]);//if exists update, else add
        selectActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }
    // activity.id
    //   ? setActivities([...activities.filter(i=>i.id !== activity.id), activity])
    //   :setActivities([...activities,activity,]);//if exists update, else add
    // setEditMode(false);
    // selectActivity(activity);
  }

  if (loading) return <LoadingComponent inverted={true} content={'Loading..'} />
  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: '7rem' }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={HandleActivitySelection}
          cancelActivity={HandleActivityCancel}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={HandleEditFormClose}
          createOrEdit={CreateOrEditActivity}
          deleteActivity={HandleDeleteActivity}
          submitting={submitting}
        />



      </Container>
    </>
  );
}

export default App;
