import {Container, Navbar, Jumbotron, Form } from 'react-bootstrap'
import Grid from './components/Grid'
import StartButton from './components/StartButton'
import './style/App.scss'
import GridProvider from './components/Store'

//import 'bootstrap/dist/css/bootstrap.min.css';




function App() {
  return (
    
  
      <GridProvider>
        <div className = "App">
          <Navbar bg = "dark" variant = "dark">
            <Container>
              <Navbar.Brand> Shortest Path Simulator</Navbar.Brand>
            </Container>
            <StartButton/>
          </Navbar>
          <Jumbotron className = "p-1">
            <Grid></Grid>
          </Jumbotron>
        </div>
      </GridProvider>

  );
}

export default App;
