import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useParams,useNavigate} from "react-router-dom";
import { getClasseArticles, updateArticle, addNewArticle, deleteArticle } from "services/classeArticlesService";
import { toast } from 'react-toastify';
import BreadCrumbs from "components/ui/breadCrumbs";
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ClasseArticles = () => {
  // const { classeId } = useParams();
  const [articles, setArticles] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newId, setNewId] = useState("");
  const [newDesignation, setNewDesignation] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [updateQuantity, setUpdateQuantity] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [availableArticles, setAvailableArticles] = useState([]);
  const { classId ,etablissement} = useParams();
  const navigate = useNavigate();



  useEffect(() => {
    const loadData = async () => {
      try {
        const { data } = await getClasseArticles(classId,etablissement);
        if(data.back){
          navigate(-1)
        }else{
          setAvailableArticles(data.avaliableArticles);
          setArticles(data.articles[0]?data.articles[0]:[]);
        }
      } catch (error) {
        toast.error(error.message, { autoClose: 3000 });
      }
    };
    loadData();
  }, [classId]);

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleShowUpdateModal = (article) => {
    setSelectedArticle(article);
    setUpdateQuantity(article.qte);
    setShowUpdateModal(true);
  };

  const handleShowDeleteModal = (article) => {
    setSelectedArticle(article);
    setShowDeleteModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setShowUpdateModal(false);
    setShowDeleteModal(false);
    setNewDesignation("");
    setNewQuantity("");
    setUpdateQuantity("");
    setSelectedArticle(null);
  };

  const handleNewDesignationChange = (e) => {
    setNewDesignation(e.target.value);
    setNewId(e.target.options.selectedIndex)
  };

  const handleNewQuantityChange = (e) => {
    setNewQuantity(e.target.value);
  };

  const handleUpdateQuantityChange = (e) => {
    setUpdateQuantity(e.target.value);
  };

  const handleDeleteArticle = async () => {
    try {
      const {data} = await deleteArticle(classId,selectedArticle.id);
      console.log(data)
      const updatedArticles = articles.filter(
        (article) => article.id !== selectedArticle.id
      );
      setArticles(updatedArticles);
      handleCloseModal();
      toast.success("L'article de la classe a été supprimé avec succès.", { autoClose: 3000 });

    } catch (error) {
      toast.error(error.message, { autoClose: 3000 });
    }
  };

  const handleAddArticle = async () => {
    try {
      const newArticle = {
        classe_id: classId,
        article : {
          id : newId ,
          designation: newDesignation,
          qte: newQuantity,
        } ,
      };
      const { data } = await addNewArticle(newArticle);
      console.log(data)
      setArticles([...articles, data.article]);
      handleCloseModal();
      toast.success("L'article a été supprimé avec succès.", { autoClose: 3000 });
    } catch (error) {
      toast.error(error.message, { autoClose: 3000 });
    }
  };

  const handleUpdateArticle = async () => {
    try {
      const updatedArticle = {
        article : {
          id: selectedArticle.id,
          qte: updateQuantity,
        } ,
        classe_id : classId
      };
      const {data} = await updateArticle(updatedArticle);
      console.log(data) ;
      const updatedArticles = articles.map((article) =>
        article.id === selectedArticle.id ? { ...article, qte: updateQuantity } : article
      );
      setArticles(updatedArticles);
      handleCloseModal();
      toast.success("L'article a été modifié avec succès.", { autoClose: 3000 });

    } catch (error) {
      toast.error(error.message, { autoClose: 3000 });
    }
  };

  const columns = [
    {
      dataField: "designation",
      text: "Designation",
      sort: true,
    },
    {
      dataField: "qte",
      text: "Quantity",
      sort: true,
      headerStyle: {
        width: '220px', 
      },
      style: {
        maxWidth: '220px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    },
    {
      dataField: "actions",
      text: "Actions",
      formatter: (cell, row) => (
        <>
            <FontAwesomeIcon
                onClick={() => handleShowUpdateModal(row)}
                style={{
                    borderRadius: '15px',
                    cursor: 'pointer',
                    padding: '5px',
                    color: 'white',
                    background: 'rgb(23, 180, 23)',
                    marginLeft: '8px',
                }}
                size="lg"
                className="me-1"
                icon={faPenToSquare}
            />
            <FontAwesomeIcon
                onClick={() => handleShowDeleteModal(row)}
                style={{
                    borderRadius: '15px',
                    cursor: 'pointer',
                    padding: '5px',
                    color: 'white',
                    background: 'red',
                    marginLeft: '8px',
                }}
                size="lg"
                className="me-1"
                icon={faTrash}
            />
        </>
      ),
      headerStyle: {
        width: '120px', 
      },
      style: {
        maxWidth: '120px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    },
  ];

  return (
    <div className="mb-5">
    <div className="mt-4 mx-3">
      <BreadCrumbs
          data={[
              {
                  text: 'Dashboard',
                  path: '/dashboard',
              },
              {
                text: etablissement,
                path: '/classes/'+etablissement,
            },
              {
                  text: classId,
                  active: true,
              },
          ]}
      />
       </div>
      <Button variant="primary" onClick={handleShowAddModal}>
        Add Article
      </Button>
      <div style={{ width: "50%" ,marginTop:"25px" }}>
      <BootstrapTable
        keyField="id"
        data={articles}
        columns={columns}
        pagination={paginationFactory()}
      />
      </div>
      <Modal show={showAddModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Article</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <select
            className="form-control"
            value={newDesignation}
            onChange={handleNewDesignationChange}
          >
            <option value="">Select Designation</option>
            {availableArticles.map((article) => (
              <option key={article.id} value={article.designationArticle}>
                {article.designationArticle}
              </option>
            ))}
          </select>
          <input
            type="number"
            className="form-control mt-2"
            placeholder="Quantity"
            value={newQuantity}
            onChange={handleNewQuantityChange}
          />
          <input
            type="hidden"
            className="form-control mt-2"
            placeholder="Quantity"
            value={newQuantity}
            onChange={handleNewQuantityChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddArticle}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showUpdateModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Article</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Designation: {selectedArticle && selectedArticle.designation}</p>
          <input
            type="number"
            className="form-control mt-2"
            placeholder="Quantity"
            value={updateQuantity}
            onChange={handleUpdateQuantityChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateArticle}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showDeleteModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Article</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete the article{" "}
            {selectedArticle && selectedArticle.designation}?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteArticle}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ClasseArticles;
