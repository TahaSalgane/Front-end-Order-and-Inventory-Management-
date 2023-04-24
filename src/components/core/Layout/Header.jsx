import React from 'react';
import { Nav, Navbar, Dropdown, DropdownButton } from 'react-bootstrap/';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Navbars = () => {
    const {user} = useSelector(state=>state.auth);
    return (
        <Navbar bg='dark' expand="lg" variant="dark" className="px-3">
            <Navbar.Brand as={NavLink} to="/" className='headerbar-200 me-1'>
                Gestion
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll></Nav>
                {user ? (
                    <DropdownButton variant="dark" id="dropdown-item-button" title={user.username}>
                        <Dropdown.Item as="button">profile</Dropdown.Item> <Dropdown.Divider />
                        <Dropdown.Item as="button" onClick={() => console.log("object")}>
                            Logout
                        </Dropdown.Item>
                    </DropdownButton>
                ) : (
                    <>
                        <Nav.Link href="#action1" className="text-white" as={NavLink} to="/login">
                            Login
                        </Nav.Link>
                    </>
                )}
                
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Navbars;
