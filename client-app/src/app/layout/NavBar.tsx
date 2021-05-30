import { Button, Container, Menu } from 'semantic-ui-react';
interface Props{
  openForm:()=>void;
}

export default function NavBar(props:Props){
  return(
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item header>
          <img src="/asserts/logo.png" alt="logo" style={{marginRight: '10px'}} />
          Recall
        </Menu.Item>
        <Menu.Item name='Activities'/>
        <Menu.Item>
          <Button positive content='Create activity'
          onClick={props.openForm}/>
        </Menu.Item>
      </Container>
    </Menu>
  )
}