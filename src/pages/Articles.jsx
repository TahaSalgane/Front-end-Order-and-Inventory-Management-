import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { Button, Modal } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

const productsGenerator = (quantity) => {
  const items = [];
  for (let i = 0; i < quantity; i++) {
    items.push({ Id: i, Name: `Article name ${i}`, Total: 2100 + i });
  }
  return items;
};

const Articels = () => {
  const [searchValue, setSearchValue] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [newArticleName, setNewArticleName] = useState("");
  const [updateArticleName, setUpdateArticleName] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [products, setProducts] = useState(productsGenerator(100));

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleShowUpdateModal = () => {
    setShowUpdateModal(true);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.Name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleCloseModal = () => {
    setShowAddModal(false);
    setShowUpdateModal(false);
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

  const handleAddArticle = () => {
    const newArticle = {
      Id: products.length,
      Name: newArticleName,
      Total: 2100 + products.length,
    };

    setProducts([...products, newArticle]);
    handleCloseModal();
  };

  const handleUpdateArticle = () => {
    if (selectedArticle) {
      const updatedProducts = products.map((product) =>
        product.Id === selectedArticle.Id
          ? { ...product, Name: updateArticleName }
          : product
      );

      setProducts(updatedProducts);
      handleCloseModal();
    }
  };

  const handleEditClick = (article) => {
    setSelectedArticle(article);
    setUpdateArticleName(article.Name);
    handleShowUpdateModal();
  };

  const handleDeleteClick = (article) => {
    const updatedProducts = products.filter(
      (product) => product.Id !== article.Id
    );

    setProducts(updatedProducts);
  };

  const columns = [
    {
      dataField: "Id",
      text: "Article ID",
      sort: true,
    },
    {
      dataField: "Name",
      text: "Article Name",
      sort: true,
    },
    {
      dataField: "Total",
      text: "Total Article",
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
        data={filteredProducts}
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

    </div>
  );
  
};

export default Articels;
