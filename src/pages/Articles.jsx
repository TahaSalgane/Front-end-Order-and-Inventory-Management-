import React, { useState,useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { createArticle,getAllArticles,updateArticle,deleteArticle } from "services/articlesService";
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
      setArticles([...articles, data.articles]);
      handleCloseModal();
      handleCloseModal();
      handleCloseModal();
    } catch (error) {
      console.log(error)
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
      handleCloseModal();
    }
    catch (error) {
    console.log(error);
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
      handleCloseModal();
    } catch (error) {
      console.log(error);
    }
  };
  
  
  // const handleDeleteClick = (article) => {
  //   const updatedProducts = articles.filter(
  //     (article) => articles.Id !== article.Id
  //   );

  //   setArticles(updatedProducts);
  // };

  const columns = [
    {
      dataField: "id",
      text: "Article ID",
      sort: true,
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
            ),}]
return (
    <div className="mb-5">
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
      <BootstrapTable
        keyField="Id"
        data={filteredArticles}
        columns={columns}
        pagination={paginationFactory()}
      />
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
