import React from 'react'
import { Button, ButtonGroup, Card, Icon, Image } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'

interface Props{
  activity:Activity;
  cancelActivity:()=>void;
  openForm:(id:string)=>void;
}

const ActivityDetails = (props:Props) => (
  <Card fluid>
    <Image src={`/asserts/categoryImages/${props.activity.category}.jpg`}/>
    <Card.Content>
      <Card.Header>{props.activity.title}</Card.Header>
      <Card.Meta>
        <span className='date'>{props.activity.datetime}</span>
      </Card.Meta>
      <Card.Description>
        {props.activity.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <ButtonGroup widths='2'>
<Button basic color='blue' content='Edit'onClick={()=>props.openForm(props.activity.id)}/>
<Button color='grey' content='Delete' onClick={props.cancelActivity}/>
      </ButtonGroup>
    </Card.Content>
  </Card>
)

export default ActivityDetails