import React, { useState,useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Modal } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { createUser,deleteUser,updateUser,getAllUsers } from 'services/usersService';
const User = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [newArticleName, setNewArticleName] = useState("");
  const [updateArticleName, setUpdateArticleName] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
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

  const handleShowUpdateModal = () => {
    setShowUpdateModal(true);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };
  const handleCloseModal = () => {
    setShowAddModal(false);
    setShowUpdateModal(false);
    setNewArticleName("");
    setUpdateArticleName("");
    setSelectedUser(null);
  };

  const handleNewArticleNameChange = (e) => {
    setNewArticleName(e.target.value);
  };

  const handleUpdateArticleNameChange = (e) => {
    setUpdateArticleName(e.target.value);
  };

  const handleUpdateArticle = () => {
    if (selectedUser) {
      const updatedusers = users.map((product) =>
        product.Id === selectedUser.Id
          ? { ...product, Name: updateArticleName }
          : product
      );

      setUsers(updatedusers);
      handleCloseModal();
    }
  };

  const handleEditClick = (article) => {
    setSelectedUser(article);
    setUpdateArticleName(article.Name);
    handleShowUpdateModal();
  };

  const handleDeleteClick = (article) => {
    const updatedusers = users.filter(
      (product) => product.Id !== article.Id
    );

    setUsers(updatedusers);
  };
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    genre: '',
  };
  const handleSubmit = async(values) => {
    const {data} = await createUser(values);
    const newArticle = {
      name: data.name,
      email: data.email,
      role: data.role,
    };
    console.log(data)
    setUsers([...users, newArticle]);
    handleCloseModal();
  };
  const filteredUsers = users.filter((user) =>
  user.name.toLowerCase().includes(searchValue.toLowerCase())
);
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    genre: Yup.string().required('Genre is required'),
  });

  const columns = [
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
            onClick={() => handleEditClick(row)}
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
        keyField="Id"
        data={filteredUsers}
        columns={columns}
        pagination={paginationFactory()}
      />
      <Modal show={showAddModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un article</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
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
                <label htmlFor="type">type:</label>
                <Field as="select" id="type" name="type" className="form-control">
                  <option value="">Select type</option>
                  <option value="magasinier">Magasinier</option>
                  <option value="directeur_etablissemnt">Directeur d'établissement</option>
                  <option value="directeur_complexe">Directeur de complexe</option>
                </Field>
                <ErrorMessage name="type" component="div" className="error-message" />
              </div> <br />
              <Button className='mx-1' variant="secondary" onClick={handleCloseModal}>
                  Annuler
                 </Button>
             <Button type='submit' variant="primary">
               Ajouter
            </Button>            </Form>
          </Formik>
        </Modal.Body>
      </Modal>
      <Modal show={showUpdateModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier l'article</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control"
            placeholder="Nom de l'article"
            value={updateArticleName}
            onChange={handleUpdateArticleNameChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleUpdateArticle}>
            Modifier
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default User;
