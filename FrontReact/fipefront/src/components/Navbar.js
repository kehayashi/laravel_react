import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const NavBarComponent = () => {
  return (
    <div>  
        <Navbar bg="dark" data-bs-theme="dark" className="bg-body-tertiary p-4">
            <Container>
                <Navbar.Brand>Fipe API | Consulta de veículos</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
  )
}

export default NavBarComponent