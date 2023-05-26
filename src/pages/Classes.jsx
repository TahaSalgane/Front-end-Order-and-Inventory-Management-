import React, { useState,useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useParams ,Link ,useNavigate} from "react-router-dom";
import { createClass,getAllClasses,updateClass,deleteClass } from "services/classesServices";
const Classes = () => {
    const [searchValue, setSearchValue] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [newNomSalle, setNewNomSalle] = useState("");
    const [newType, setNewType] = useState("");
    const [updateNomSalle, setUpdateNomSalle] = useState("");
    const [updateType, setUpdateType] = useState("");
    const [selectedClass, setSelectedClass] = useState(null);
    const [classes, setClasses] = useState([]);
    const {etablissement} = useParams() ;
    const navigate = useNavigate();

useEffect(()=>{
  const loadData = async ()=>{
      try {
          const {data} =await getAllClasses(etablissement); 
          if(data.back){
            navigate(-1)
          }else{
            setClasses(data.classes)
          }
      } catch (error) {
          console.log(error)
      } 
  };
  loadData();
  
},[etablissement])
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

const filteredClasses = classes.filter(
  (classItem) =>
    classItem.nomSalle.toLowerCase().includes(searchValue.toLowerCase()) ||
    classItem.type.toLowerCase().includes(searchValue.toLowerCase())
);

const handleCloseModal = () => {
  setShowAddModal(false);
  setShowUpdateModal(false);
  setShowDeleteModal(false);
  setNewNomSalle("");
  setNewType("");
  setSelectedClass(null);
};

const handleNewNomSalleChange = (e) => {
  setNewNomSalle(e.target.value);
};

const handleNewTypeChange = (e) => {
  setNewType(e.target.value);
};

const handleAddClass = async () => {
  try {
    const newClass = {
      nomSalle: newNomSalle,
      type: newType,
      etablissement : etablissement
    };
    const { data } = await createClass(newClass);
    setClasses([...classes, data.classe]);
    handleCloseModal();
  } catch (error) {
    console.log(error);
  }
};

const handleUpdateClass = async () => {
  if (selectedClass) {
    try {
      const updatedClasses = classes.map((classItem) =>
        classItem.id === selectedClass.id
          ? { ...classItem, nomSalle: updateNomSalle, type: updateType }
          : classItem
      );
      const {data} = await updateClass({id :selectedClass.id,  nomSalle: updateNomSalle, type: updateType });
      console.log(data.message)
      setClasses(updatedClasses);
      handleCloseModal();
    } catch (error) {
      console.log(error);
    }
  }
};

const handleEditClick = (classItem) => {
  setSelectedClass(classItem);
  setUpdateNomSalle(classItem.nomSalle);
  setUpdateType(classItem.type);
  handleShowUpdateModal();
};

const handleDeleteClick = async (classItem) => {
  setSelectedClass(classItem);
  handleShowDeleteModal();
};

const handleConfirmDelete = async () => {
  try {
    const {data} = await deleteClass(selectedClass.id);
    console.log(data.message)
    const updatedClasses = classes.filter((classItem) => classItem.id !== selectedClass.id);
    setClasses(updatedClasses);
    handleCloseModal();
  } catch (error) {
    console.log(error);
  }
};

const columns = [
  {
    dataField: "id",
    text: "Class ID",
    sort: true,
  },
  {
    dataField: "nomSalle",
    text: "Nom de la salle",
    sort: true,
  },
  {
    dataField: "type",
    text: "Type",
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
    ),
  },
  {
      dataField: "articles",
      text: "Articles",
      formatter: (cell, row) => (
            <>
            <Link
                  to={`/classes/${etablissement}/${row.id}`}
                  className="btn btn-secondary btn-sm mr-2"
                      >
                  Voir les articles du classe {'>>'}
              </Link>
          </>
        ),
  }
];
return (
  <div className="mb-5">
    <Button variant="primary" onClick={handleShowAddModal}>
      Ajouter une classe
    </Button>
    <div className="my-3">
      <input
        type="text"
        className="form-control w-25"
        placeholder="Rechercher une classe..."
        value={searchValue}
        onChange={handleSearchChange}
      />
    </div>
    <BootstrapTable
      keyField="id"
      data={filteredClasses}
      columns={columns}
      pagination={paginationFactory()}
    />
    <Modal show={showAddModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Ajouter une classe</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="text"
          className="form-control"
          placeholder="Nom de la salle"
          value={newNomSalle}
          onChange={handleNewNomSalleChange}
        />
        <input
          type="text"
          className="form-control mt-2"
          placeholder="Type"
          value={newType}
          onChange={handleNewTypeChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Annuler
        </Button>
        <Button variant="primary" onClick={handleAddClass}>
          Ajouter
        </Button>
      </Modal.Footer>
    </Modal>
    <Modal show={showUpdateModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Modifier la classe</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="text"
          className="form-control"
          placeholder="Nom de la salle"
          value={updateNomSalle}
          onChange={(e) => setUpdateNomSalle(e.target.value)}
        />
        <input
          type="text"
          className="form-control mt-2"
          placeholder="Type"
          value={updateType}
          onChange={(e) => setUpdateType(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Annuler
        </Button>
        <Button variant="primary" onClick={handleUpdateClass}>
          Modifier
        </Button>
      </Modal.Footer>
    </Modal>
    <Modal show={showDeleteModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Supprimer la classe</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Êtes-vous sûr de vouloir supprimer la classe {selectedClass && selectedClass.nomSalle} ?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Annuler
        </Button>
        <Button variant="danger" onClick={handleConfirmDelete}>
          Supprimer
        </Button>
      </Modal.Footer>
    </Modal>
  </div>
);
};

export default Classes;