import React, { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { Col, Button, Row, Card, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';

import { loginSchema } from 'utils/JoiValidation';
import { useDispatch } from 'react-redux';
import { loginUser } from 'redux/apiCalls/authApiCall';
import ofpptLogo from '../assets/images/login/ofpptLogo.jpg'   ;
import { findByText } from '@testing-library/react';
import { toast } from 'react-toastify';

const Login = () => {
    // Set the intial value of the recaptcha state from the localStorate (tries)
    
    const [recaptcha,setRecaptcha] = useState(parseInt(localStorage.getItem('tries')))
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const submitForm = async (values) => {
        try {
            const {email,password} = values;            
            await dispatch(loginUser({email,password}));
            navigation("/dashboard") 
        } catch (excep) {
            window.location.reload(true)
        }
    };
    // console.log(recaptcha)
    async function  onChangeRecaptcha(value) {
        localStorage.setItem('tries',parseInt(1))
        await setTimeout(() => {
            setRecaptcha(null)
          }, 1.2 * 1000);
      }

    return (
        <Formik
            validationSchema={loginSchema}
            onSubmit={submitForm}
            initialValues={{
                email: '',
                password: '',
            }}
        >
            {({ handleSubmit, handleChange, values, touched, errors, handleBlur }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Row className="vh-100 d-flex justify-content-center pt-5">
                        <Col md={10} lg={6} xs={12}>
                            <div className="border border-2 border-primary"></div>
                             <section className="text-center text-lg-start">
                                <div className="card mb-3">
                                    <div className="row g-0 d-flex align-items-center">
                                    <div className="col-lg-4 d-none d-lg-flex">
                                        <img
                                        src={ofpptLogo}
                                        alt="ofppt"
                                        className="rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5"
                                        />
                                    </div>
                                    <div className="col-lg-8">
                                        <div className="card-body py-5 px-md-5">
                                        <h2 className="fw-bold mb-2 text-center text-uppercase">Sign in</h2>
                                            <div className="mb-3">
                                                <Form.Group className="mb-3" controlId="validationFormik02">
                                                    <Form.Label>Email</Form.Label>
                                                    <Form.Control
                                                        type="email"
                                                        name="email"
                                                        placeholder="Enter Your email"
                                                        value={values.email}
                                                        onChange={handleChange}
                                                        isValid={touched.email && !errors.email}
                                                        isInvalid={!!errors.email && touched.email}
                                                        onBlur={handleBlur}
                                                    />
                                                    <Form.Text className="text-danger">
                                                        {touched.email && errors.email ? (
                                                            <div className="text-danger">{errors.email}</div>
                                                        ) : null}
                                                    </Form.Text>
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="validationFormik03">
                                                    <Form.Label>Password</Form.Label>
                                                    <Form.Control
                                                        type="password"
                                                        name="password"
                                                        placeholder="Enter Your password"
                                                        value={values.password}
                                                        onChange={handleChange}
                                                        isValid={touched.password && !errors.password}
                                                        isInvalid={!!errors.password && touched.password}
                                                        onBlur={handleBlur}
                                                    />
                                                    <Form.Text className="text-danger">
                                                        {touched.password && errors.password ? (
                                                            <div className="text-danger">{errors.password}</div>
                                                        ) : null}
                                                    </Form.Text>
                                                </Form.Group>
                                                {
                                                    parseInt(localStorage.getItem('tries'))>=3 && (
                                                        <div className='d-flex justify-content-center'>
                                                            <ReCAPTCHA
                                                            sitekey="6LeA9MklAAAAAMc__aId3hOZ1u8EAbAPLUqQjyG4"
                                                            onChange={onChangeRecaptcha}
                                                            />
                                                        </div>
                                                        ) 
                                                    
                                                    
                                                }  
                                                    <div className="d-grid">
                                                        <Button type="submit" disabled={recaptcha>=3?true:false}>Login</Button>
                                                    </div>      
                                                
                                                {
                                                    localStorage.getItem('errMessage') ? ( 
                                                        <div className="text-center p-2">
                                                            <div className="text-danger">{localStorage.getItem('errMessage')}</div>
                                                        </div>
                                                    ) : null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </section>
                        </Col>
                    </Row>
                </Form>
            )}
        </Formik>
    );
};
export default Login;