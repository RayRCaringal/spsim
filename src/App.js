import { Col, Container, Form, Navbar, Row, Button, Image } from 'react-bootstrap'
import Grid from './components/Grid'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className = "App">
      
          <Navbar bg = "dark" variant = "dark">
            <Container>
              <Navbar.Brand> Shortest Path Simulator</Navbar.Brand>
            </Container>
            <Button className = "mx-auto">Start</Button>

          </Navbar>
    

               <Container fluid = "sm" className = "p-1">
                 <Grid></Grid>
               </Container>


 

    </div>
  );
}

export default App;
