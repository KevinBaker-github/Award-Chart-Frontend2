import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ProfileMenu from './ProfileMenu';
import useAuthUser from '../hooks/useAuthUser';
import { useOktaAuth } from "@okta/okta-react";


const AppNavbar = () => {
    const userInfo = useAuthUser();
    const { oktaAuth, authState } = useOktaAuth();

    const loggingIn = async () => oktaAuth.signInWithRedirect({ originalUri: "/" });
	const loggingOut = async () => oktaAuth.signOut();

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand href="#" className='me-5'>Dynamic Pricing</Navbar.Brand>

                    <Navbar.Toggle aria-controls="navbarMenu" />

                    <Navbar.Collapse id="navbarMenu">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }} >
                                    <NavDropdown title="Actions" id="menu1Dropdown">
                                        <NavDropdown.Item href="/awardChart">Award Chart</NavDropdown.Item>
                                        <NavDropdown.Item href="/awardChart">Prop Category</NavDropdown.Item>
                                        <NavDropdown.Item href="/awardChart">System Defaults</NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown title="Reports" id="menu1Dropdown">
                                        <NavDropdown.Item href="/awardChart">Award Chart</NavDropdown.Item>
                                        <NavDropdown.Item href="/awardChart">Prop Category</NavDropdown.Item>
                                        <NavDropdown.Item href="/awardChart">System Defaults</NavDropdown.Item>
                                    </NavDropdown>
                        </Nav>

                        <Container>
                            {
                                            authState?.isAuthenticated ? (
                                                <ProfileMenu logOutHandler={loggingOut} userId={userInfo?.name}/>
                                            ) : (
                                                <Button variant="dark" onClick={loggingIn}>Sign In</Button>
                                            )
                            }
                        </Container>

                    </Navbar.Collapse>

                </Container>
            </Navbar>
        </>
    )
}


export default AppNavbar;