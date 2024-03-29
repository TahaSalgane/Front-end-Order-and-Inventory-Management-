import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from 'components/core/Layout/Header';
import Sidebar from 'components/core/Layout/Sidebar';
import Footer from 'components/core/Layout/Footer';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';

// const MyGridContainer = styled.div`
//     display: grid;
//     grid-template-columns: 200px 1fr;
//     // grid-gap: 20px;

//     .my-sidebar {
//         height: 100vh;
//         position: sticky;
//         top: 40px;
//     }

//     .my-content {
//         margin: 2px 0px 0px 2px;
//         box-shadow: 1px 1px 5px black inset;
//         width: 99%;
//     }
// `;

const Index= () => {
    const {user} = useSelector(state=>state.auth);
    console.log(user)
    return (
        <div>
            <div style={{ position: 'sticky', top: '0', zIndex: '999' }}>
                <Header/>
            </div>
            {user?.role ? (
              //  <div className="containerss">
              //    <div className="-sidmyebars">
              //      <Sidebar/>
              //    </div>
              //    <div className="-contmyents">
              //      <Container fluid className="unContainer">
              //        <Outlet />
              //      </Container>
              //    </div>
              //  </div>
              <section className='admin-dashboard'>
                <div className='admin-sidebar'>
                  <Sidebar/>
                </div>
                <div className='admin-main'>
                <Outlet />
                </div>
              </section>
            ) : (
                <Container fluid className="unContainer">
                    <Outlet />
                </Container>
            )}
            <div className="page-footer pt-4">
                <Footer />
            </div>
        </div>
    );
};
export default Index;
