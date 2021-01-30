import { Col, Container, Form, Navbar, Row, Button, Image, Jumbotron } from 'react-bootstrap'
import Grid from './components/Grid'
import './style/App.scss'
//import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className = "App">
      <Navbar bg = "dark" variant = "dark">
        <Container>
          <Navbar.Brand> Shortest Path Simulator</Navbar.Brand>
        </Container>
        <Button className = "mx-auto">Start</Button>
      </Navbar>
      <Jumbotron className = "p-1">
        <Grid></Grid>
      </Jumbotron>
    </div>
  );
}

export default App;
