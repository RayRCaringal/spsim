import {Container, Navbar, Jumbotron, Form } from 'react-bootstrap'
import Grid from './components/Grid'
import StartButton from './components/StartButton'
import './style/App.scss'
import NodeProvider from './components/NodeProvider'
//import 'bootstrap/dist/css/bootstrap.min.css';




function App() {
  return (
        <div className = "App">
          <NodeProvider>
            <Navbar bg = "dark" variant = "dark">
              <Container>
                <Navbar.Brand> Shortest Path Simulator</Navbar.Brand>
              </Container>
              <StartButton/>
            </Navbar>
            <Jumbotron className = "p-1">
              <Grid></Grid>
            </Jumbotron>
          </NodeProvider>
        </div>

  );
}

export default App;
