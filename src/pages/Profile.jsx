import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "redux/slices/authSlice";
import { updateProfile } from "services/usersService";
import BreadCrumbs from "components/ui/breadCrumbs";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [name, setName] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [telephone, setTelephone] = useState(user.telephone);
  const [adresse, setAdresse] = useState(user.adresse);
  const [codePostale, setCodePostale] = useState(user.codePostale);
  const [genre, setGenre] = useState(user.genre);
  const [password, setPassword] = useState("");
  const [uploadedImage, setUploadedImage] = useState(user.profile_image);
  const [image, setImage] = useState();

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const dataRequest = new FormData();
      dataRequest.append("name", name);
      dataRequest.append("email", email);
      dataRequest.append("password", password);
      dataRequest.append("telephone", telephone);
      dataRequest.append("adresse", adresse);
      dataRequest.append("codePostale", codePostale);
      dataRequest.append("genre", genre);
      dataRequest.append("image", uploadedImage);
      // const token = JSON.parse(localStorage.getItem("userInfo"))?.token;

      const { data } = await updateProfile(dataRequest);
      console.log(data);
      let newUserData = data.newUserInfo;
      // recuperer le valeure du token depuis le UserController (updateProfile)
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const token = userInfo.token;
      newUserData.token = token;

      localStorage.setItem("userInfo", JSON.stringify(newUserData));
      dispatch(authActions.login(newUserData));
      setPassword("");
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  const handleImageChange = (event) => {
    setUploadedImage(event.target.files[0]);
    const imageFile = event.target.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = () => {
        setImage(reader.result);
      };
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
                      text: 'Profil',
                      active: true,
                  },
              ]}
          />
          </div>
    <Container className="bg-white ">
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Row>
          <Col md={3} className="border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <Form.Group controlId="formBasicImage">
                <Form.Control
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  className="form-control-file text-center mt-5"
                />
              </Form.Group>
              <img
                src={image || `http://127.0.0.1:8000${uploadedImage}`}
                height="150px"
                alt="Profile"
                className="rounded rounded-circle shadow w-75 mt-3 mb-2"
              />
              <span className="font-weight-bold">{user.username}</span>
              <span className="text-black-50">{user.email}</span>
            </div>
          </Col>
          <Col md={5} className="border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="text-right">Profile Settings</h3>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="labels">Nom-prenom</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Nom et Prenom"
                    onChange={(event) => setName(event.target.value)}
                    value={name}
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels">Genre</label>
                  <select
                    className="form-control"
                    name="genre"
                    value={genre}
                    onChange={(event) => setGenre(event.target.value)}
                  >
                    <option value="homme">Homme</option>
                    <option value="femme">Femme</option>
                  </select>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="labels">Adresse email</label>
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    placeholder="Entrer votre adresse email"
                    onChange={(event) => setEmail(event.target.value)}
                    value={email}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Numero de telephone</label>
                  <input
                    type="text"
                    name="telephone"
                    onChange={(event) => setTelephone(event.target.value)}
                    className="form-control"
                    placeholder="Entrer votre numero de telephone"
                    value={telephone}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Adresse actuelle</label>
                  <input
                    type="text"
                    name="adresse"
                    className="form-control"
                    onChange={(event) => setAdresse(event.target.value)}
                    placeholder="Entrer votre adresse actuelle"
                    value={adresse}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Code postale</label>
                  <input
                    type="text"
                    name="codePostale"
                    className="form-control"
                    onChange={(event) => setCodePostale(event.target.value)}
                    placeholder="Entrer votre code"
                    value={codePostale}
                  />
                </div>
                <br />
                <br />
                <br />
                <br />
                <div className="col-md-12">
                  <label className="labels">
                    <strong>*</strong> Entrer le mot de pass pour{" "}
                    <strong>valider les modifications</strong>
                  </label>
                  <input
                    type="password"
                    name="password"
                    required
                    className="form-control"
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter le mot de pass "
                    value={password}
                  />
                </div>
              </div>
              <div className="mt-5 text-center">
                <button
                  className="btn btn-primary profile-button"
                  type="submit"
                >
                  Modifier le profile
                </button>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center experience">
                <h5>Autres Informations</h5>
              </div>
              <br />
              <div className="col-md-12">
                <label className="labels">Etablissement Actuelle</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="experience"
                  disabled
                  value={user.etablissement}
                />
              </div>
              <br />
              <div className="col-md-12">
                <label className="labels">Role d'utilisateur</label>
                <input
                  type="text"
                  disabled
                  className="form-control"
                  placeholder="additional details"
                  value={user.role}
                />
              </div>
              <br />
              <div className="col-md-12">
                <label className="labels">Region</label>
                <input
                  type="text"
                  disabled
                  className="form-control"
                  placeholder="additional details"
                  value="Marrakech-Safi"
                />
              </div>
              <br />
              <div className="col-md-12">
                <label className="labels">Ville</label>
                <input
                  type="text"
                  disabled
                  className="form-control"
                  placeholder="additional details"
                  value="Marrakech"
                />
              </div>
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
    </div>
  );
};
export default Profile;
