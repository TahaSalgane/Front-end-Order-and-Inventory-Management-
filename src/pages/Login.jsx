import React, { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { Col, Button, Row, Card, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';

import { loginSchema } from 'utils/JoiValidation';
import { useDispatch } from 'react-redux';
import { loginUser } from 'redux/apiCalls/authApiCall';

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
        // let initialNum = parseInt(0,10)
        const num = parseInt(localStorage.getItem('tries'))
        localStorage.setItem('tries',num+1)
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
                    <Row className="vh-100 d-flex justify-content-center pt-3">
                        <Col md={8} lg={6} xs={12}>
                            <div className="border border-2 border-primary"></div>
                            <Card className="shadow px-4 text-white bg-dark">
                                <Card.Body>
                                    <div className="mb-3 mt-md-4">
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
                                            <div className="mt-3">
                                                <p className="mb-0 text-center">
                                                    Forgot
                                                    <Link
                                                        to="/forgotpassword"
                                                        className="text-primary fw-bold d-inline-block ms-1"
                                                    >
                                                        Password ?
                                                    </Link>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Form>
            )}
        </Formik>
    );
};
export default Login;