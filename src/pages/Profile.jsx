import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import request from "utils/request";

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');
 const info = JSON.parse(localStorage.getItem("userInfo"))
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('image', image);
      console.log(image)
      const { data } = await request.post('/updateProfile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${info.token}` // Assuming the token is stored in localStorage
        }
      });
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  };

  // const handleImageChange = (event) => {
  //   const imageFile = event.target.files[0];
  //   console.log('Selected file:', imageFile);
  //   const reader = new FileReader();
  //   reader.readAsDataURL(imageFile);
  //   reader.onload = () => {
  //     setImage(reader.result);
  //   };
  // };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };
  return (
    <Container fluid className="my-5">
      <Row className="justify-content-center">
        <Col md={4} className="text-center">
          <div className="mb-4">
            <img src={image || "profile-image.jpg"} height="140px" alt="Profile Image" className="rounded-circle shadow w-75 mb-3" />
            <Form.Group controlId="formBasicImage">
              <Form.Control name="image" type="file" onChange={handleImageChange} className="form-control-file text-center" />
            </Form.Group>
          </div>
        </Col>
        <Col md={6}>
          <h3 className="mb-4">Profile Information</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" value={name} onChange={(event) => setName(event.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(event) => setEmail(event.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit">Update Profile</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;