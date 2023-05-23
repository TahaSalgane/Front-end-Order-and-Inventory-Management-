// import React, { useState, useEffect } from "react";
// import { Button, Modal } from "react-bootstrap";
// import BootstrapTable from "react-bootstrap-table-next";
// import paginationFactory from "react-bootstrap-table2-paginator";
// import { useParams } from "react-router-dom";
// import { getClasseArticles, handleUpdateArticle,addNewArticle, deleteArticle } from "services/classeArticlesService";

// const ClasseArticles = () => {
//   const { classeId } = useParams();
//   const [articles, setArticles] = useState([]);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showUpdateModal, setShowUpdateModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [newDesignation, setNewDesignation] = useState("");
//   const [newQuantity, setNewQuantity] = useState("");
//   const [updateDesignation, setUpdateDesignation] = useState("");
//   const [updateQuantity, setUpdateQuantity] = useState("");
//   const [selectedArticle, setSelectedArticle] = useState(null);
//   const [avaliableArticles, setAvaliableArticles] = useState([]) ;

//   const {etablissement,id} = useParams() ;

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const { data } = await getClasseArticles(id);
//         console.log(data)
//         setAvaliableArticles(data.avaliableArticles)
//         // setArticles(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     loadData();
//   }, [classeId]);

//   const handleShowAddModal = () => {
//     setShowAddModal(true);
//   };

//   const handleShowUpdateModal = (article) => {
//     setSelectedArticle(article);
//     setUpdateDesignation(article.designation);
//     setUpdateQuantity(article.quantity);
//     setShowUpdateModal(true);
//   };

//   const handleShowDeleteModal = (article) => {
//     setSelectedArticle(article);
//     setShowDeleteModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowAddModal(false);
//     setShowUpdateModal(false);
//     setShowDeleteModal(false);
//     setNewDesignation("");
//     setNewQuantity("");
//     setUpdateDesignation("");
//     setUpdateQuantity("");
//     setSelectedArticle(null);
//   };

//   const handleNewDesignationChange = (e) => {
//     setNewDesignation(e.target.value);
//   };

//   const handleNewQuantityChange = (e) => {
//     setNewQuantity(e.target.value);
//   };

//   const handleUpdateDesignationChange = (e) => {
//     setUpdateDesignation(e.target.value);
//   };

//   const handleUpdateQuantityChange = (e) => {
//     setUpdateQuantity(e.target.value);
//   };


//   const handleDeleteArticle = async () => {
//     try {
//       await deleteArticle(selectedArticle.id);
//       const updatedArticles = articles.filter(
//         (article) => article.id !== selectedArticle.id
//       );
//       setArticles(updatedArticles);
//       handleCloseModal();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleAddArticle = async () => {
//     try {
//       const newArticle = {
//         classeId: classeId,
//         designation: newDesignation,
//         quantity: newQuantity,
//       };
//       const { data } = await addNewArticle(newArticle);
//       setArticles([...articles, data.article]);
//       handleCloseModal();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const columns = [
//     {
//       dataField: "id",
//       text: "ID",
//       sort: true,
//     },
//     {
//       dataField: "designation",
//       text: "Designation",
//       sort: true,
//     },
//     {
//       dataField: "quantity",
//       text: "Quantity",
//       sort: true,
//     },
//     {
//       dataField: "actions",
//       text: "Actions",
//       formatter: (cell, article) => (
//         <>
//           <Button
//             variant="primary"
//             size="sm"
//             className="mr-2"
//             onClick={() => handleShowUpdateModal(article)}
//           >
//             Update
//           </Button>
//           <Button
//             variant="danger"
//             size="sm"
//             onClick={() => handleShowDeleteModal(article)}
//           >
//             Delete
//           </Button>
//         </>
//       ),
//     },
//   ];

//   return (
//     <div className="mb-5">
//       <Button variant="primary" onClick={handleShowAddModal}>
//         Add Article
//       </Button>
//       <BootstrapTable
//         keyField="id"
//         data={articles}
//         columns={columns}
//         pagination={paginationFactory()}
//       />
//       <Modal show={showAddModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add Article</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Designation"
//             value={newDesignation}
//             onChange={handleNewDesignationChange}
//           />
//           <input
//             type="number"
//             className="form-control mt-2"
//             placeholder="Quantity"
//             value={newQuantity}
//             onChange={handleNewQuantityChange}
//           />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseModal}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={handleAddArticle}>
//             Add
//           </Button>
//         </Modal.Footer>
//       </Modal>
//       <Modal show={showUpdateModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Update Article</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Designation"
//             value={updateDesignation}
//             onChange={handleUpdateDesignationChange}
//           />
//           <input
//             type="text"
//             className="form-control mt-2"
//             placeholder="Quantity"
//             value={updateQuantity}
//             onChange={handleUpdateQuantityChange}
//           />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseModal}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={handleUpdateArticle}>
//             Update
//           </Button>
//         </Modal.Footer>
//       </Modal>
//       <Modal show={showDeleteModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Delete Article</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>
//             Are you sure you want to delete the article{" "}
//             {selectedArticle && selectedArticle.designation}?
//           </p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseModal}>
//             Cancel
//           </Button>
//           <Button variant="danger" onClick={handleDeleteArticle}>
//             Delete
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default ClasseArticles;

import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useParams } from "react-router-dom";
import { getClasseArticles, updateArticle, addNewArticle, deleteArticle } from "services/classeArticlesService";

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
  const { classId } = useParams();


  useEffect(() => {
    const loadData = async () => {
      try {
        const { data } = await getClasseArticles(classId);
        console.log(data)
        setAvailableArticles(data.avaliableArticles);
        setArticles(data.articles[0]?data.articles[0]:[]);
      } catch (error) {
        console.log(error);
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
    } catch (error) {
      console.log(error);
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
    } catch (error) {
      console.log(error);
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
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      dataField: "id",
      text: "ID",
      sort: true,
    },
    {
      dataField: "designation",
      text: "Designation",
      sort: true,
    },
    {
      dataField: "qte",
      text: "Quantity",
      sort: true,
    },
    {
      dataField: "actions",
      text: "Actions",
      formatter: (cell, article) => (
        <>
          <Button
            variant="primary"
            size="sm"
            className="mr-2"
            onClick={() => handleShowUpdateModal(article)}
          >
            Update
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => handleShowDeleteModal(article)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="mb-5">
      <Button variant="primary" onClick={handleShowAddModal}>
        Add Article
      </Button>
      <BootstrapTable
        keyField="id"
        data={articles}
        columns={columns}
        pagination={paginationFactory()}
      />
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
