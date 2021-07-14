import React, { SyntheticEvent } from 'react';
import { useState } from 'react';
import { Interface } from 'readline';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
  activities: Activity[];
  selectActivity: (id: string) => void;
  deleteActivity: (id: string) => void;
  submitting: boolean;
}

export default function ActivityList(props: Props) {
  const [target, setTarget] = useState('');
  function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    props.deleteActivity(id);
  }
  return (
    <Segment>
      <Item.Group divided>
        {props.activities.map(activity => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as='a'>{activity.title}</Item.Header>
              <Item.Meta>{activity.datetime}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>{activity.venue}, {activity.city}</div>
              </Item.Description>
              <Item.Extra>
                <Button name={activity.id}
                  floated='right' content='Delete' color='red'
                  loading={props.submitting && target === activity.id}
                  onClick={(e) => handleActivityDelete(e, activity.id)} />

                <Button floated='right' content='View' color='blue'
                  onClick={() => props.selectActivity(activity.id)} />

                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  )
}