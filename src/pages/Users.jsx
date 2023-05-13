import React, { useState,useEffect,useRef  } from 'react';
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Button, Modal } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { createUser,deleteUser,updateUser,getAllUsers } from 'services/usersService';
import { useSelector } from "react-redux";
import  {userValidationSchema}  from 'utils/JoiValidation';
const User = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [updateData, setUpdateData] = useState(null); 
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const {user} = useSelector(state=>state.auth);

  
useEffect(()=>{
    const loadData = async ()=>{
        try {
            const {data} =await getAllUsers(); 
            setUsers(data)
        } catch (error) {
            console.log(error)
        } 
    };
    loadData();

},[])
  const handleShowAddModal = () => {
    setShowAddModal(true);
  };
  const formikRef = useRef(null);
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };
  const handleCloseModal = () => {
    setShowAddModal(false);
    setSelectedUser(null);
    setShowUpdateModal(false); 
    setUpdateData(null);
  };
  const handleDeleteClick = (userD) => {
    setSelectedUser(userD);
    setIsOpen(true);
  };
  const handleConfirmDelete = async () => {
    try {
      await deleteUser(selectedUser.id);
      const updatedUsers = users.filter((user) => user.id !== selectedUser.id);
      setUsers(updatedUsers);
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateClick = (user) => {
    setSelectedUser(user);
    setUpdateData(user);
    setShowUpdateModal(true); 
  };
  const handleUpdateUser = async () => {
    const values = formikRef.current.values;
      try {
        console.log(values)
      const { data } = await updateUser(selectedUser.id, values);
      const updatedUser = {
      ...selectedUser,
      name: data.name,
      email: data.email,
      role: data.role,
      };
      const updatedUsers = users.map((user) =>
      user.id === selectedUser.id ? updatedUser : user
    );
    
      setUsers(updatedUsers);
      handleCloseModal();
      console.log(data);
      } catch (error) {
      console.log(error);
}
};
  const ConfirmDeleteModal = () => {
    return (
      <Modal show={modalIsOpen} onHide={() => setIsOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation de suppression</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Êtes-vous sûr de vouloir supprimer "{selectedUser && selectedUser.name}" ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Annuler
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  
  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  };

  const handleAddUser = async() => {
    const values = formikRef.current.values;
    try {
      
      const { data } = await createUser(values);
      const newArticle = {
        id:data.id,
        name: data.name,
        email: data.email,
        role: data.role,
      };
      console.log(data);
      setUsers([...users, newArticle]);
      handleCloseModal();
      handleCloseModal();
    } catch (error) {
      console.log(error)
    }
  };
  const filteredUsers = users.filter((user) =>
  user.name.toLowerCase().includes(searchValue.toLowerCase())
  );


  const columns = [
    {
      dataField: "id",
      text: "ID",
      sort: true,
    },
    {
      
      dataField: "name",
      text: "name",
      sort: true,
    },
    {
      dataField: "email",
      text: "email",
      sort: true,
    },
    {
      dataField: "role",
      text: "role",
      sort: true,
    },
    {
      dataField: "actions",
      text: "Actions",
      formatter: (cell, row) => (
        <>
          <Button
            variant="primary"
            size="sm"
            className="mr-2"
            onClick={() => handleUpdateClick(row)}
          >
            Modifier
          </Button>
          <Button variant="danger" size="sm" onClick={() => handleDeleteClick(row)}>
            Supprimer
            </Button>
            </>
            ),}
        ]
  return (
    <div className="mb-5">
        <Button variant="primary" onClick={handleShowAddModal}>
  Ajouter un article
    </Button>
      <div className="my-3">
        <input
          type="text"
          className="form-control w-25"
          placeholder="Rechercher un user ..."
          value={searchValue}
          onChange={handleSearchChange}
        />
      </div>
      <BootstrapTable
        keyField="id"
        data={filteredUsers}
        columns={columns}
        pagination={paginationFactory()}
      />
      <Modal show={showAddModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un articles</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={userValidationSchema}
            innerRef={formikRef}
          >
            <Form>
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="username">Username:</label>
                  <Field type="text" id="username" name="username" className="form-control" />
                  <ErrorMessage name="username" component="div" className="error-message" />
                </div>
                <div className="col">
                  <label htmlFor="email">Email:</label>
                  <Field type="email" id="email" name="email" className="form-control" />
                  <ErrorMessage name="email" component="div" className="error-message" />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="password">Password:</label>
                  <Field type="password" id="password" name="password" className="form-control" />
                  <ErrorMessage name="password" component="div" className="error-message" />
                </div>
                <div className="col">
                  <label htmlFor="confirmPassword">Confirm Password:</label>
                  <Field
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="error-message"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="role">role:</label>
                <Field as="select" id="role" name="role" className="form-control">
                <option value="">Select role</option>
                  {user.role === 'directeur complexe' && (
                    <>
                      <option value="magasinier">Magasinier</option>
                      <option value="directeur etablissement">Directeur d'établissement</option>
                      <option value="directeur complexe">Directeur de complexe</option>
                    </>
                  )}
                  {user.role === 'directeur etablissement' && (
                    <>
                      <option value="directeur etablissement">Directeur d'établissement</option>
                    </>
                  )}
                  {user.role === 'magasinier' && (
                    <>
                      <option value="magasinier">Magasinier</option>
                    </>
                  )}
                </Field>
                <ErrorMessage name="role" component="div" className="error-message" />
              </div> <br />            
            </Form>
          </Formik>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
            Annuler
          </Button>
          <Button variant="primary" onClick={() => {
            formikRef.current.handleSubmit();
            handleAddUser();
            }}>
          Ajouter
        </Button>
        </Modal.Footer>

      </Modal>
      <Modal show={showUpdateModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
        <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
            username: updateData?.name || '',
            email: updateData?.email || '',
            password: '',
            confirmPassword: '',
            role: updateData?.role || '',
            }}
            validationSchema={userValidationSchema}
            innerRef={formikRef}
            >
            <Form>
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="username">Username:</label>
                  <Field
                    type="text"
                    id="username"
                    name="username"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="error-message"
                  />
                </div>
                <div className="col">
                  <label htmlFor="email">Email:</label>
                  <Field
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  />
                  <ErrorMessage
                  name="email"
                  component="div"
                  className="error-message"
                  />
                </div>
             </div>
             <div className="row mb-3">
                <div className="col">
                  <label htmlFor="password">New Password:</label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error-message"
                  />
                 </div>
              <div className="col">
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="form-control"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="error-message"
                />
              </div>
            </div>
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="role">role:</label>
                  <Field as="select" id="role" name="role" className="form-control">
                  <option value="">Select role</option>
                  {user.role === 'directeur complexe' && (
                    <>
                      <option value="magasinier">Magasinier</option>
                      <option value="directeur etablissement">Directeur d'établissement</option>
                      <option value="directeur complexe">Directeur de complexe</option>
                    </>
                  )}
                  {user.role === 'directeur etablissement' && (
                    <>
                      <option value="directeur etablissement">Directeur d'établissement</option>
                    </>
                  )}
                  {user.role === 'magasinier' && (
                    <>
                      <option value="magasinier">Magasinier</option>
                    </>
                  )}
                    </Field>
                    <ErrorMessage name="role" component="div" className="error-message" />
                </div>
              </div>
            </Form>
          </Formik>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Annuler
          </Button>
          <Button variant="primary" type="submit" onClick={handleUpdateUser}>
            Update User
            </Button>
        </Modal.Footer>
      </Modal>
      <ConfirmDeleteModal />

    </div>
  );
};

export default User;
