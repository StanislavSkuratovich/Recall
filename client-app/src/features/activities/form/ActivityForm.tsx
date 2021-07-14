import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
  activity: Activity | undefined;
  closeForm: () => void;
  createOrEdit: (activity: Activity) => void;
  submitting: boolean;
}

//export default function ActivityForm({activity}:Props){
// export default function ActivityForm(props:Props){
export default function ActivityForm({ activity: selectedActivity, closeForm, createOrEdit, submitting }: Props) {
  const initualState = selectedActivity ?? {
    id: '',
    title: '',
    category: '',
    datetime: '',
    description: '',
    city: '',
    venue: ''
  }
  const [activity, setActivity] = useState(initualState);
  function handleSubmit() {
    //console.log(activity);
    createOrEdit(activity);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} >
        <Form.Input placeholder='title' onChange={handleInputChange} value={activity.title} name='title' />
        <Form.TextArea placeholder='description' onChange={handleInputChange} value={activity.description} name='description' />
        <Form.Input placeholder='category' onChange={handleInputChange} value={activity.category} name='category' />
        <Form.Input type='date' placeholder='date' onChange={handleInputChange} value={activity.datetime} name='datetime' />
        <Form.Input placeholder='city' onChange={handleInputChange} value={activity.city} name='city' />
        <Form.Input placeholder='venue' onChange={handleInputChange} value={activity.venue} name='venue' />

        <Button loading={submitting} floated='right' positive type='submit' content='Submit' />
        <Button floated='right' type='button' content='Cancel' onClick={closeForm} />

      </Form>
    </Segment>
  )
}



