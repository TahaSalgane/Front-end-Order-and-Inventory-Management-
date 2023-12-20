import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import Select from "react-select";
import { getAllOrders, createOrders, updateOrder } from "services/ordersService";
import { getAllArticles } from "services/articlesService";
import { useSelector } from 'react-redux';
import { getStatusColor } from "components/ui/statusColor";
import { toast } from 'react-toastify';
import BreadCrumbs from "components/ui/breadCrumbs";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [articles, setArticles] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedArticles, setSelectedArticles] = useState([]);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    const loadData = async () => {
      try {
        const allArticles = await getAllArticles();
        const { data } = await getAllOrders();
        setOrders(data.orders);
        setArticles(allArticles.data.articles);
      } catch (error) {
        toast.error(error.message, { autoClose: 3000 });
      }
    };
    loadData();
  }, []);

  const handleRowClick = (order) => {
    const updatedOrders = orders.map((o) => {
      if (o.id === order.id) {
        return { ...o, isEditing: true };
      }
      return { ...o, isEditing: false };
    });
    setOrders(updatedOrders);
    setSelectedOrder(order);
  };

  const handleConfirmClick = async () => {
    if (selectedOrder) {
      const updatedOrders = orders.map((order) => {
        if (order.id === selectedOrder.id) {
          return { ...order, isEditing: false };
        }
        return order;
      });
      try {
        const { data } = await updateOrder(selectedOrder.id, { 'status': selectedStatus });
        setOrders(data.orders);
        toast.success("Le status de l'order a été modifié avec succès.", { autoClose: 3000 });

      } catch (error) {
        toast.error(error.message, { autoClose: 3000 });
      }
      setSelectedOrder(null);
    }
  };

  const handleStatusSelectChange = (e, order) => {
    const { value } = e.target;
    const updatedOrders = orders.map((o) => {
      if (o.id === order.id) {
        return { ...o, status: value };
      }
      return o;
    });
    setSelectedStatus(value)
    setOrders(updatedOrders);
  };

  const handleAddOrder = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalConfirm = async () => {
    const title = document.getElementById("orderTitle").value;
    const selectedArticleIds = selectedArticles.map((article) => article.value);
    const selectedArticlesData = articles.filter((article) =>
      selectedArticleIds.includes(article.id)
    );
    if (!title) {
      console.log("Title is required");
      return;
    }

    if (selectedArticleIds.length === 0) {
      console.log("At least one article must be selected");
      return;
    }
    try {
      const { data } = await createOrders({
        titre: title,
        articles: selectedArticleIds, // Pass the array directly
      });
      console.log(data) ;
      console.log(data);
      setOrders(data.orders);
      setShowModal(false);
      toast.success("L'order a été ajoutée avec succès.", { autoClose: 3000 });
    } catch (error) {
      toast.error(error.message, { autoClose: 3000 });
    }
  };

  const handleArticleChange = (selectedOptions) => {
    setSelectedArticles(selectedOptions);
  };

  const columns = [
    {
      dataField: "id",
      text: "Order ID",
      sort: true,
      headerStyle: {
        width: '10%',
      },
      style: {
        maxWidth: '10%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    },
    {
      dataField: "titre",
      text: "Titre",
      sort: true,
    },
    {
      dataField: "article_id",
      text: "Articles",
      sort: true,
      headerStyle: {
        width: '30%',
      },
      style: {
        maxWidth: '30%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      formatter: (cell, row) => (
        <>
          {row.articles.map((article) => (
            <span key={article.id}>-{article.designationArticle}<br /></span>
          ))}
        </>
      ),
    },
    {
      dataField: "etablissement",
      text: "etablissement",
      sort: true,
      hidden: !(user.role === "magasinier" || user.role === "directeur complexe"),
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      formatter: (cell, row) => (
        <>
          {row.isEditing ? (
            <select
              value={row.status}
              onChange={(e) => handleStatusSelectChange(e, row)}
            >
              <option value="sent">sent</option>
              <option value="inProgress">inProgress</option>
              <option value="delivered">delivered</option>
            </select>
          ) : (
            <span style={{ color: getStatusColor(cell) }}>{cell}</span>
          )}
        </>
      ),
    },
    {
      dataField: "actions",
      text: "Actions",
      hidden: !(user.role === "magasinier" || user.role === "directeur complexe"),
      formatter: (cell, row) => (
        <>
          {row.isEditing ? (
            <Button onClick={handleConfirmClick}>Confirm</Button>
          ) : (
            <Button onClick={() => handleRowClick(row)}>Modify</Button>
          )}
        </>
      ),
    },
  ];
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
                  text: 'Orders',
                  active: true,
              },
          ]}
      />
       </div>
    {((user.role === "directeur etablissement") || (user.role === "directeur complexe")) && (
      <Button className="my-4" onClick={handleAddOrder}>Ajouter un order</Button>
    )}
      <BootstrapTable
        keyField="id"
        data={orders}
        columns={columns}
        pagination={paginationFactory()}
      />
      <Modal show={showModal} onHide={handleModalClose} dialogClassName="custom-dialog">
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <label htmlFor="username">Titre:</label>
          <input id="orderTitle" className="mb-3 ms-4 w-75" type="text" placeholder="Entrez le titre" /> <br/>
          <div className="articles-container">
  <label htmlFor="username">Articles:</label>
  <Select
    isMulti
    options={articles.map((article) => ({
      value: article.id,
      label: article.designationArticle,
    }))}
    placeholder="Sélectionnez les articles"
    value={selectedArticles}
    onChange={handleArticleChange}
    className="w-75"
  />
</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleModalConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
  );
};

export default Orders;
