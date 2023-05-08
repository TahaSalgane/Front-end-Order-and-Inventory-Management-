import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {FaArrowCircleRight,FaBullhorn,FaBoxOpen,BiEdit,HiUserGroup} from "components/core/Layout/icons";

const Dashboard = () => {
    return (
        <>
            <div className="mt-5" style={{ maxWidth:"100%" }}>
                <Row>
                {/* fqsfqsffffffffffffffffqsfqsffffffffffffffffqsfqsffffffffffffffffqsfqsffffffffffffffffqsfqsffffffffffffffffqsfqsffffffffffffffffqsfqsffffffffffffffffqsfqsffffffffffffffffqsfqsffffffffffffffffqsfqsffffffffffffffffqsfqsfffffffffffffff */}
                    <Col lg="3" sm="6">
                        <Card className="pt-2 card-stats text-white" style={{ backgroundColor:"#17A2B8" }}>
                                <Row>
                                    <Col xs="7" className='px-4'>
                                        <h2>51</h2>
                                        <h3 className="card-category">Articles</h3>
                                    </Col>
                                    <Col xs="5">
                                        <div className="text-center">
                                            <BiEdit size={80} className="card-icon"/>
                                        </div>
                                    </Col>
                                </Row>
                            <Card.Text className="mt-1 text-end">
                                <Link to="/admin/users" className="btn w-100" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)'
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
                                        <h2>51</h2>
                                        <h3 className="card-category">ordres</h3>
                                    </Col>
                                    <Col xs="5">
                                        <div className="text-center">
                                            <FaBoxOpen size={80} className="card-icon"/>
                                        </div>
                                    </Col>
                                </Row>
                            <Card.Text className="mt-1 text-end">
                                <Link to="/admin/users" className="btn w-100" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)'
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
                                        <h2>51</h2>
                                        <h3 className="card-category">Utilisateurs</h3>
                                    </Col>
                                    <Col xs="5">
                                        <div className="text-center">
                                            <HiUserGroup size={80} className="card-icon"/>
                                        </div>
                                    </Col>
                                </Row>
                            <Card.Text className="mt-1 text-end">
                                <Link to="/admin/users" className="btn w-100" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)'
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
                                        <h2>51</h2>
                                        <h3 className="card-category">réclamation</h3>
                                    </Col>
                                    <Col xs="5">
                                        <div className="text-center">
                                            <FaBullhorn size={80} style={{ color:"blue" }} className="card-icon"/>
                                        </div>
                                    </Col>
                                </Row>
                            <Card.Text className="mt-1 text-end">
                                <Link to="/admin/users" className="btn w-100" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)'
                                 }}>
                                    <span className='text-white'>plus d'informations <FaArrowCircleRight /></span>
                                </Link>
                            </Card.Text>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md="10"  lg="11" sm="12">
                    <p></p>
                    </Col>
                    <Col md="1" lg="1" sm="10">
                    
                                 </Col>
                 </Row>
            </div>
        </>
    );
};

export default Dashboard;
