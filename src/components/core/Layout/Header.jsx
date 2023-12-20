import React, { useEffect ,useState} from 'react';
import './Notification/Notification.css'

import { Nav, Navbar, Dropdown, DropdownButton } from 'react-bootstrap/';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from 'redux/apiCalls/authApiCall';
import { FaBell } from "components/core/Layout/icons";
import Avatar from 'components/shared/AvatarUser';
import { LinkContainer } from 'react-router-bootstrap';
import { getNotifications ,markOneAsRead } from 'services/notificationsService';



const Navbars = () => {
  const[notifications,setNotifications] = useState([]) ;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const {data} = await getNotifications();
        setNotifications(data?.notificationsList);
      
      } catch (error) {
        console.log(error);
      }
    };
    loadNotifications();
  }, []);
  // const notifications = [
  //   {
  //     image: 'https://cdn.pixabay.com/photo/2013/07/12/16/51/internet-151384_1280.png',
  //     title: 'Une commande a ete ajouter ',
  //     message: "Lorem Ipsum is simply dummy text o of Lorem Ipsum." ,
  //     owner : 'syba' ,
  //     path : '/' ,
  //     clickHandleBackMethod : 'method'
  //   },
  //   {
  //     image: 'https://cdn.pixabay.com/photo/2013/07/12/16/51/internet-151384_1280.png',
  //     title: 'Une commande a ete ajouter ',
  //     message: "Lorem Ipsum is simply dummy text o of Lorem Ipsum." ,
  //     owner : 'syba'
  //   },
  //   {
  //     image: 'https://cdn.pixabay.com/photo/2013/07/12/16/51/internet-151384_1280.png',
  //     title: 'Une commande a ete ajouter ',
  //     message: "Lorem Ipsum is simply dummy text o of Lorem Ipsum." ,
  //     owner : 'syba'
  //   },
  //   {
  //     image: 'https://example.com/notification-image.png',
  //     title: 'Notification Title',
  //     message: 'Notification Message',
  //   },
  //   {
  //     image: 'https://example.com/notification-image.png',
  //     title: 'Notification Title',
  //     message: 'Notification Message',
  //   },
  // ];
  const handleNotificationClick =async (id) => {
    const{data} = await markOneAsRead(id)
    console.log(data)
    window.location.reload(false);
    // Add your logic here to handle the click event
  };


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
            <Dropdown>
                  <Dropdown.Toggle
                    variant="success"
                    className={`mydropdown btnNotif`}
                    style={{ border: 'none', backgroundColor: 'transparent' ,fontSize:'18px'}}
                  >
                  <FaBell/>
                  {notifications.length > 0 && <span className="notification-count">{notifications.length}</span>}                  </Dropdown.Toggle>
                  <Dropdown.Menu style={{ right: 0, left: 'auto', marginLeft: 'auto', marginRight: '0' }}>
                    <div className="dropdown-header d-flex justify-content-between align-items-center">
                      <h6 className="mb-0">Notifications</h6>
                      {
                        notifications.length ?
                          <button className="mark-all-button" onClick={() => console.log('Mark all as read')}>
                            Marquer comme lu
                          </button> : ''
                      }
                    </div>
                    <Dropdown.Divider />
                    {notifications.length ? 
                      notifications.map((notification,key)=>(
                        <LinkContainer to={`/${notification.data.toPage}`} isActive={() => false} key={key}>
                          <Dropdown.Item onClick={()=>handleNotificationClick(notification.id)}>
                          <div className="notification-item">
                            <img src={notification.data.imagePath} alt="Notification" className="notification-image" />
                            <div className="notification-content">
                              <h5 className="notification-title">{notification.data.title}</h5>
                              <p className="notification-message">{notification.data.body} <strong>"{notification.data.maker}"</strong> </p>
                              <p className="notification-click">Click pour detail</p>
                            </div>
                          </div>
                        </Dropdown.Item>
                        </LinkContainer>
                      ))
                    :
                    <div className="notification-item">
                      <h3 className="ps-5">Vous n'avez pas des notifications</h3>
                    </div>
                    }
                  </Dropdown.Menu>
            </Dropdown>
            <DropdownButton className="mx-2" variant="dark" id="dropdown-item-button" title={user.username.charAt(0).toUpperCase() + user.username.slice(1)}>
              <Link className="text-black text-decoration-none" to="/profile">
                <Dropdown.Item as="button">Profile</Dropdown.Item>
                <Dropdown.Divider />
              </Link>
              <Dropdown.Item as="button" onClick={() => dispatch(logout())}>
                Logout
              </Dropdown.Item>
            </DropdownButton>
            {user.profile_image ? (
              <img height={50} width={50} className="rounded-circle" src={`http://127.0.0.1:8000${user.profile_image}`} alt="Profile" />
              ) : (
                <Avatar username={user.username} />
              )}
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



