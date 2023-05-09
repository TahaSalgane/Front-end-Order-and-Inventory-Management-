import React from 'react';
import { Nav, Navbar, Dropdown, DropdownButton } from 'react-bootstrap/';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from 'redux/apiCalls/authApiCall';
import Avatar from 'components/shared/AvatarUser';

const Navbars = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  return (
    <Navbar bg="dark" expand="lg" variant="dark" className="px-3 navbarrr">
      <Navbar.Brand as={NavLink} to="/" className="headerbar-200 me-1">
        {user.role}
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll></Nav>
        {user ? (
          <div className="d-flex align-items-center">
            {user.profile_image ? (
              <img height={45} className="rounded-circle" src={`http://127.0.0.1:8000${user.profile_image}`} alt="Profile" />
            ) : (
              <Avatar username={user.username} />
            )}
            <DropdownButton className="mx-2" variant="dark" id="dropdown-item-button" title={user.username}>
              <Link className="text-black text-decoration-none" to="/profile">
                <Dropdown.Item as="button">Profile</Dropdown.Item>
                <Dropdown.Divider />
              </Link>
              <Dropdown.Item as="button" onClick={() => dispatch(logout())}>
                Logout
              </Dropdown.Item>
            </DropdownButton>
          </div>
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
