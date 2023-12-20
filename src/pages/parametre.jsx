import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from "redux/slices/authSlice";
import { updatePasword } from 'services/passwordService';
import BreadCrumbs from "components/ui/breadCrumbs";

const Parametre = () => {
  const { user } = useSelector(state => state.auth);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas !");
      return;
    }

    try {
      const dataRequest = {
        oldPassword,
        newPassword,
      };

      const { data } = await updatePasword(dataRequest);
      if(data.message){
        alert(data.message)
      }
      // Reset the form fields and error field
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');

      setError('');
    } catch (error) {
      console.log(error.response.data.error);
      setError(error.response.data.error);
    }
  };

  return (
    <div>
      <div className="mt-4 mx-3">
        <BreadCrumbs
            data={[
                {
                    text: 'Dashboard',
                    path: '/dashboard',
                },
                {
                    text: 'Paramètres',
                    active: true,
                },
            ]}
        />
     </div>
    <Container className="rounded bg-white mt-5 mb-5">
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={12} className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="text-right">Changer le mot de pass</h3>
            </div>
            
            <div className="row mt-2">
              <div className="col-md-12">
                <label className="labels">Old Password</label>
                <input
                  type="password"
                  name="oldPassword"
                  required
                  className="form-control"
                  onChange={(event) => setOldPassword(event.target.value)}
                  value={oldPassword}
                />
              </div>
              <div className="col-md-12">
                <label className="labels">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  required
                  className="form-control"
                  onChange={(event) => setNewPassword(event.target.value)}
                  value={newPassword}
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  className="form-control"
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  value={confirmPassword}
                />
              </div>
            </div>
            {error && <div className="text-danger mb-3">{error}</div>}
            <div className="mt-5 text-center">
              <button className="btn btn-primary profile-button" type="submit">
                    Modifier     
              </button>
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
    </div>
  );
};

export default Parametre;
