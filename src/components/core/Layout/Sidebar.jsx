import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
const Sidebar = () => {
    return (
        <div
            className="bg-dark text-white d-flex flex-column flex-shrink-0 p-3 border-top rounded shadow-lg"
            style={{ width: '100%', height: '100vh' }}
        >
            <Nav variant="pills" defaultActiveKey="link-0" className="flex-column">
                <NavLink to="/Dashboard" className="nav-link text-white" end>
                 Dashboard
                </NavLink>
                <NavLink to="/users" className="nav-link text-white" end>
                    Users{' '}
                </NavLink>
                <NavLink to="/classs" className="nav-link text-white" end>
                    classs{' '}
                </NavLink>
                <NavLink to="/Matériel" className="nav-link text-white" end>
                    Matériel{' '}
                </NavLink>
            </Nav>
        </div>
    );
};
export default Sidebar;
