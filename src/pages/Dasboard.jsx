import React,{useEffect,useState} from 'react';
import { Card, Row, Col,Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {FaArrowCircleRight,FaBullhorn,FaBoxOpen,BiEdit,HiUserGroup} from "components/core/Layout/icons";
import CountUp from 'react-countup';
import { getAllArticles } from 'services/articlesService';
import { getAllOrders } from 'services/ordersService';
import { getAllUsers } from 'services/usersService';
import { getAllReclamations } from 'services/reclamationService';
import { getStatusColor } from 'components/ui/statusColor';
import BreadCrumbs from 'components/ui/breadCrumbs';
import PieChart from './PieChart';
const Dashboard = () => {
    const [articles, setArticles] = useState([]);
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [reclamation, setReclamation] = useState([]);
    useEffect(() => {
        const loadData = async () => {
            try {
                const { data } = await getAllUsers();
                setUsers(data);
                const ordersData = await getAllOrders();
                setOrders(ordersData.data.orders);
                const reclamationData = await getAllReclamations();
                setReclamation(reclamationData.data.reclamations);
                const articlesData = await getAllArticles();
                setArticles(articlesData.data.articles);
            } catch (error) {
                console.log(error);
            }
        };
        loadData();
    }, []);
    return (
        <>
            <div className="mt-3" style={{ maxWidth:"100%" }} >
            <div className="mt-4 mx-3">
                <BreadCrumbs
                    data={[
                        {
                            text: 'Dashboard',
                            active: true,
                        },
                    ]}
                />
                 </div>

                <Row>
                    <Col lg="3" sm="6">
                        <Card className="pt-2 card-stats text-white" style={{ backgroundColor:"#17A2B8" }}>
                                <Row>
                                    <Col xs="7" className='px-4'>
                                        <h2><CountUp end={articles.length} duration={3} /></h2>
                                        <h3 className="card-category">Articles</h3>
                                    </Col>
                                    <Col xs="5">
                                        <div className="text-center">
                                            <BiEdit size={80} className="card-icon"/>
                                        </div>
                                    </Col>
                                </Row>
                            <Card.Text className="mt-1 text-end">
                                <Link to="/articles" className="btn w-100" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)'
                                    }}>
                                    <span className='text-white'>plus d'informations <FaArrowCircleRight /></span>
                                </Link>
                            </Card.Text>
                        </Card>
                    </Col>
                    <Col lg="3" sm="6">
                    <Card className="pt-2 card-stats text-white" style={{ backgroundColor:"#28A745" }}>
                                <Row>
                                    <Col xs="7" className='px-4'>
                                    <h2><CountUp end={orders.length} duration={3} /></h2>
                                        <h3 className="card-category">ordres</h3>
                                    </Col>
                                    <Col xs="5">
                                        <div className="text-center">
                                            <FaBoxOpen size={80} className="card-icon"/>
                                        </div>
                                    </Col>
                                </Row>
                            <Card.Text className="mt-1 text-end">
                                <Link to="/ordres" className="btn w-100" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)'
                                         }}>
                                    <span className='text-white'>plus d'informations <FaArrowCircleRight /></span>
                                </Link>
                            </Card.Text>
                        </Card>
                    </Col>
                    <Col lg="3" sm="6">
                    <Card className="pt-2 card-stats text-white" style={{ backgroundColor:"#FFC107" }}>
                                <Row>
                                    <Col xs="7" className='px-4'>
                                    <h2><CountUp end={users.length} duration={3} /></h2>
                                        <h3 className="card-category">Utilisateurs</h3>
                                    </Col>
                                    <Col xs="5">
                                        <div className="text-center">
                                            <HiUserGroup size={80} className="card-icon"/>
                                        </div>
                                    </Col>
                                </Row>
                            <Card.Text className="mt-1 text-end">
                                <Link to="/utilisateurs" className="btn w-100" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)'
                                }}>
                                    <span className='text-white'>plus d'informations <FaArrowCircleRight /></span>
                                </Link>
                            </Card.Text>
                        </Card>
                    </Col>
                    <Col lg="3" sm="6">
                    <Card className="pt-2 card-stats text-white" style={{ backgroundColor:"#DC3545" }}>
                                <Row>
                                    <Col xs="7" className='px-4'>
                                    <h2><CountUp end={reclamation.length} duration={3} /></h2>
                                        <h3 className="card-category">réclamation</h3>
                                    </Col>
                                    <Col xs="5">
                                        <div className="text-center">
                                            <FaBullhorn size={80} style={{ color:"blue" }} className="card-icon"/>
                                        </div>
                                    </Col>
                                </Row>
                            <Card.Text className="mt-1 text-end">
                                <Link to="/réclamation" className="btn w-100" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)'
                                 }}>
                                    <span className='text-white'>plus d'informations <FaArrowCircleRight /></span>
                                </Link>
                            </Card.Text>
                        </Card>
                    </Col>
                </Row>
            <Row className='mt-5'>
          <Col md="8" lg="8" sm="12">
            <Card className="mb-3">
            <Card.Title style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>Latest Orders</Card.Title>
             <Card.Body>
                <Table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>titre</th>
                      <th>etablissement</th>
                      <th>status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 6).map((order, index) => (
                      <tr key={order.id}>
                        <td>{index + 1}</td>
                        <td>{order.titre}</td>
                        <td>{order.etablissement}</td>
                        <td style={{ color: getStatusColor(order.status),textTransform:'uppercase' }}>{order.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
           
          </Col >
            <Col md="4" lg="4" sm="12">
            <Card className="mb-3" style={{ width:"450px" }}>
            <Card.Title style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)'}}>Latest Reclamations</Card.Title>
                <div style={{ width: '200px', height: '200px' ,marginBottom:"20px",marginLeft:"25%" }}>
                  <PieChart orders={orders} />
                </div>
                </Card>
                <div className='mt-5'>
            <Card className="mb-3">
            <Card.Title style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)'}}>Latest Reclamations</Card.Title>
              <Card.Body>
                <Table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>titre</th>
                      <th>description</th>
                      <th>titre l'order</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reclamation.slice(0, 6).map((rec, index) => (
                      <tr key={rec.id}>
                        <td>{index + 1}</td>
                        <td>{rec.titre}</td>
                        <td>{rec.description}</td>
                        <td>{rec.order.titre}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
            </div>
          </Col>
        </Row>
            </div>
        </>
    );
};

export default Dashboard;
