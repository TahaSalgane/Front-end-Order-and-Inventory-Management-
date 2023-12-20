import React, { useState,useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { createArticle,getAllArticles,updateArticle,deleteArticle } from "services/articlesService";
import { toast } from 'react-toastify';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BreadCrumbs from "components/ui/breadCrumbs";
const Articels = () => {
  const [searchValue, setSearchValue] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newArticleName, setNewArticleName] = useState("");
  const [updateArticleName, setUpdateArticleName] = useState("");
  const [deleteArticleName, setDeleteArticleName] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articles, setArticles] = useState([]);
  useEffect(()=>{
    const loadData = async ()=>{
        try {
            const {data} =await getAllArticles(); 
            console.log(data.articles)
            setArticles(data.articles)
        } catch (error) {
          toast.error(error.message, { autoClose: 3000 });
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
  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const filteredArticles = articles.filter((article) =>
  article.designationArticle.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleCloseModal = () => {
    setShowAddModal(false);
    setShowUpdateModal(false);
    setShowDeleteModal(false);
    setNewArticleName("");
    setUpdateArticleName("");
    setSelectedArticle(null);
  };

  const handleNewArticleNameChange = (e) => {
    setNewArticleName(e.target.value);
  };

  const handleUpdateArticleNameChange = (e) => {
    setUpdateArticleName(e.target.value);
  };

  const handleAddArticle = async() => {
    try {
      const newArticle = {
        id: articles.length,
        designationArticle: newArticleName,
      };
      const { data } = await createArticle(newArticle);
      toast.success("l'article a été créé", { autoClose: 1000 });
      setArticles([...articles, data.articles]);
      handleCloseModal();
    } catch (error) {
      toast.error(error.message, { autoClose: 3000 });
    }
  
  };

  const handleUpdateArticle = async() => {
    if (selectedArticle) {
      try {
      const updatedArticles = articles.map((article) =>
      article.id === selectedArticle.id
        ? { ...article, designationArticle: updateArticleName }
        : article
    );
      await updateArticle({"id":selectedArticle.id,"designationArticle":updateArticleName});
      handleCloseModal();  
      setArticles(updatedArticles);
      toast.success("L'article a été modifié avec succès.", { autoClose: 3000 });
      handleCloseModal();
    }
    catch (error) {
      toast.error(error.message, { autoClose: 3000 });
    }
  };
  }
  const handleEditClick = (article) => {
    setSelectedArticle(article);
    setUpdateArticleName(article.designationArticle);
    handleShowUpdateModal();
  };
  const handleDeleteClick = (article) => {
    setSelectedArticle(article);
    setDeleteArticleName(article.name)
    handleShowDeleteModal();
  };
  const handleConfirmDelete = async () => {
    try {
      await deleteArticle(selectedArticle.id);
      const updatedArticles = articles.filter((article) => article.id !== selectedArticle.id);
      setArticles(updatedArticles);
      toast.success("L'article a été supprimé avec succès.", { autoClose: 3000 });
      handleCloseModal();
    } catch (error) {
      toast.error(error.message, { autoClose: 3000 });
    }
  };
  const columns = [
    {
      dataField: "id",
      text: "Article ID",
      sort: true,
      headerStyle: {
        width: '15%',
      },
      style: {
        maxWidth: '15%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    },
    {
      dataField: "designationArticle",
      text: "article",
      sort: true,
    },
    {
      dataField: "actions",
      text: "Actions",
      formatter: (cell, row) => (
        <>
            <FontAwesomeIcon
                onClick={() => handleEditClick(row)}
                style={{
                    borderRadius: '15px',
                    cursor: 'pointer',
                    padding: '5px',
                    color: 'white',
                    background: 'rgb(23, 180, 23)',
                    marginLeft: '20px',
                }}
                size="lg"
                className="me-1"
                icon={faPenToSquare}
            />
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
      ),
      headerStyle: {
        width: '20%', 
      },
      style: {
        maxWidth: '20%',
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
                            text: 'articles',
                            active: true,
                        },
                    ]}
                />
                 </div>
        <Button variant="primary" onClick={handleShowAddModal}>
  Ajouter un article
</Button>
      <div className="my-3">
        <input
          type="text"
          className="form-control w-25"
          placeholder="Rechercher un article..."
          value={searchValue}
          onChange={handleSearchChange}
        />
      </div>
      <div style={{ width: "60%" }}>
      <BootstrapTable
        keyField="id"
        data={filteredArticles}
        columns={columns}
        pagination={paginationFactory()}
      />
    </div>
      <Modal show={showAddModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un article</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control"
            placeholder="Nom de l'article"
            value={newArticleName}
            onChange={handleNewArticleNameChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleAddArticle}>
            Ajouter
          </Button>
        </Modal.Footer>
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
      <Modal show={showDeleteModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Supprimer l'article</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Are you sure you wanna delete {deleteArticleName}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleConfirmDelete}>
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
  
};

export default Articels;
