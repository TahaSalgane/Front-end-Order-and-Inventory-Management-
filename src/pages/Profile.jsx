import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import request from "utils/request";
import { useSelector,useDispatch  } from 'react-redux';
import { authActions } from "redux/slices/authSlice";

const Profile = ()=>{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [uploadedImage, setUploadedImage] = useState('');
    const [image,setImage] = useState() ;

    const {user} = useSelector(state=>state.auth);

    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const dataRequest = new FormData() ;
        dataRequest.append("name",name) ;
        dataRequest.append("email",email) ;
        dataRequest.append("password",password) ;
        dataRequest.append("image",uploadedImage) ;
        // console.log(uploadedImage)
        const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
        const {data} = await request.post('/updateProfile',dataRequest ,{headers :{'Authorization' : `Bearer ${token}`}});
        console.log(data.profile_image) ;
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        userInfo.profile_image = data.profile_image;
        localStorage.setItem('userInfo', JSON.stringify(userInfo));

        dispatch(authActions.login(userInfo));

      } catch (error) {
        console.log(error.response.data.error)
      }
    }
  
    const handleImageChange = (event) => {
      setUploadedImage(event.target.files[0])
      const imageFile = event.target.files[0];
      if(imageFile){
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onload = () => {
          setImage(reader.result);
        }
      }
    }
    return (
        <Container fluid className="my-5">
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
                <Row className="justify-content-center">
                <Col md={4} className="text-center">
                    <div className="mb-4">
                    <img src={image || `http://127.0.0.1:8000${user.profile_image}`} height="140px" alt="Profile Image" className="rounded shadow w-75 mb-3" />
                    <Form.Group controlId="formBasicImage">
                        <Form.Control type="file" name='image' onChange={handleImageChange} className="form-control-file text-center" />
                    </Form.Group>
                    </div>
                </Col>
                <Col md={6}>
                        <h3 className="mb-4">Profile Information</h3>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" placeholder="Enter your name" value={name} onChange={(event) => setName(event.target.value)} />
                    </Form.Group>
        
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Enter email" value={email} onChange={(event) => setEmail(event.target.value)} />
                    </Form.Group>
        
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
                    </Form.Group>
        
                    <Button variant="primary" type="submit">Update Profile</Button>
                </Col>
            </Row>
        </Form>
      </Container>
    );
  }
export default Profile