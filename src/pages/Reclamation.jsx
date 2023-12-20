import React, { useState, useEffect,useRef} from "react";
import { Button, Modal } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { getAllReclamations,deleteReclamation,createReclamations} from "services/reclamationService";
import { getAllOrders} from "services/ordersService";
import { useSelector } from 'react-redux';
import { Formik, Field, ErrorMessage } from "formik";
import { Form } from "react-bootstrap";
import  {reclamationValidationSchema}  from 'utils/JoiValidation';
import { toast } from 'react-toastify';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BreadCrumbs from "components/ui/breadCrumbs";

const Reclamation = () => {
  const [reclamations, setReclamations] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { user } = useSelector(state => state.auth);
  const [selectedReclamation, setSelectedReclamation] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const formikRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const allReclamation = await getAllReclamations();
        const reclamationsData = allReclamation.data.reclamations;
        const { data } = await getAllOrders();
        setOrders(data.orders);

        const updatedReclamations = reclamationsData.map((reclamation) => {
          const order = data.orders.find((order) => order.id === reclamation.order_id);
          return {
            ...reclamation,
            order_id: order ? order.titre : '',
          };
        });

        setReclamations(updatedReclamations);
      } catch (error) {
        toast.error(error.message, { autoClose: 3000 });
      }
    };

    loadData();
  }, []);
  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };
  const handleDeleteClick = (reclamation) => {
    setSelectedReclamation(reclamation);
    handleShowDeleteModal();
  };
  const handleConfirmDelete = async () => {
    try {
      console.log("first")
      await deleteReclamation(selectedReclamation.id);
      const updatedArticles = reclamations.filter((reclamation) => reclamation.id !== selectedReclamation.id);
      setReclamations(updatedArticles);
      handleModalClose();
      toast.success("La réclamation a été supprimée avec succès.", { autoClose: 3000 });
    } catch (error) {
      toast.error(error.message, { autoClose: 3000 });
    }
  };
    const handleAddOrder = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setShowDeleteModal(false);

  };

  const handleModalConfirm = async () => {
    const values = formikRef.current.values;
    values.order_id = parseInt(values.order_id);
    console.log(values);
    try {
      const { data } = await createReclamations(values);
  
      const order = orders.find((order) => order.id === values.order_id);
      const updatedReclamation = {
        ...data.reclamation,
        order_id: order ? order.titre : '',
      };
  
      setReclamations([...reclamations, updatedReclamation]);
      toast.success("La réclamation a été ajoutée avec succès.", { autoClose: 3000 });
      setShowModal(false);
    } catch (error) {
      toast.error(error.message, { autoClose: 3000 });
    }
  };
  
  const columns = [
    {
      dataField: "id",
      text: "Réclamation ID",
      sort: true,
      headerStyle: {
        width: '150px',
      },
      style: {
        maxWidth: '150px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    },
    {
      dataField: "titre",
      text: "Titre",
      sort: true,
      headerStyle: {
        width: '230px',
      },
      style: {
        maxWidth: '230px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    },
    {
      dataField: "description",
      text: "Description",
      sort: true,
    },
    {
      dataField: "order_id",
      text: "Order Réclamé",
      sort: true,
    },
    {
      dataField: "actions",
      text: "Actions",
      hidden: !(user.role === "magasinier" || user.role === "directeur complexe"),
      formatter: (cell, row) => (
        <>
          <FontAwesomeIcon
            onClick={() => handleDeleteClick(row)}
            style={{
                borderRadius: '15px',
                cursor: 'pointer',
                padding: '5px',
                color: 'white',
                background: 'red',
                marginLeft: '20px',
            }}
            size="lg"
            className="me-1"
            icon={faTrash}
         />
        </>
            ),}
  ];
  const initialValues = {
    titre: '',
    description: '',
    order_id: ''
  };
  return (
    <div className="mb-5 container-modal">
        <div className="mt-4 mx-3">
        <BreadCrumbs
            data={[
                {
                    text: 'Dashboard',
                    path: '/dashboard',
                },
                {
                    text: 'Réclamation',
                    active: true,
                },
            ]}
        />
          </div>
    {((user.role === "directeur etablissement") || (user.role === "directeur complexe")) && (
      <Button className="my-4" onClick={handleAddOrder}>Fait une reclamation</Button>
    )}
      <BootstrapTable
        keyField="id"
        data={reclamations}
        columns={columns}
        pagination={paginationFactory()}
      />
      <Modal show={showDeleteModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Supprimer l'article</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Are you sure you wanna delete {selectedReclamation.id}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleConfirmDelete}>
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showModal} onHide={handleModalClose} dialogClassName="custom-dialog">
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un utilisateur</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={reclamationValidationSchema}
            innerRef={formikRef}
          >
<Form>
  <div className="row mb-3">
    <div className="col">
      <label htmlFor="titre">Titre:</label>
      <Field type="text" id="titre" name="titre" className="form-control" />
      <ErrorMessage name="titre" component="div" className="error-message" />
    </div>
    <div className="col">
      <label htmlFor="description">Description:</label>
      <Field as="textarea" id="description" name="description" className="form-control" />
      <ErrorMessage name="description" component="div" className="error-message" />
    </div>
  </div>
  <div className="col">
      <Form.Group controlId="order_id">
        <Form.Label>Order:</Form.Label>
        <Field
  as="select"
  name="order_id"
  className="form-control"
  component="select"
>
  <option value="">Select Your Order</option>
  {orders.map((option, index) => (
    <option key={index} value={option.id}>
      {option.titre}
    </option>
  ))}
</Field>
        <ErrorMessage
          name="order_id"
          component="div"
          className="error-message"
        />
      </Form.Group>
    </div>
  <br />
</Form>
          </Formik>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose}>
            Annuler
          </Button>
          <Button variant="primary" onClick={() => {
            formikRef.current.handleSubmit();
            handleModalConfirm();
            }}>
          Ajouter
        </Button>
        </Modal.Footer>

      </Modal>
      </div>
  );
};

export default Reclamation;
