import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import Select from "react-select";
import { getAllOrders,createOrders } from "services/ordersService";
import { getAllArticles } from "services/articlesService";
import { useSelector } from 'react-redux';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [articles, setArticles] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedArticles, setSelectedArticles] = useState([]);
  const {user} = useSelector(state=>state.auth);
  useEffect(() => {
    const loadData = async () => {
      try {
        const { data } = await getAllOrders();
        const allArticles = await getAllArticles();
        setOrders(data.orders);
        setArticles(allArticles.data.articles);
        console.log(data)
      } catch (error) {
        console.log(error);
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

  const handleConfirmClick = () => {
    if (selectedOrder) {
      const updatedOrders = orders.map((order) => {
        if (order.id === selectedOrder.id) {
          return { ...order, isEditing: false };
        }
        return order;
      });
      setOrders(updatedOrders);
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
    const selectedArticlesData = articles.filter((article) => selectedArticleIds.includes(article.id));
    if (!title) {
      console.log("Title is required");
      return; // Exit the function if the title is null
    }
  
    if (selectedArticleIds.length === 0) {
      console.log("At least one article must be selected");
      return; // Exit the function if no articles are selected
    }
  
    try {
      await createOrders({ "titre": title, "articles": selectedArticleIds });
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  
    console.log("Title:", title);
    console.log("Selected Articles:", selectedArticleIds);
  };
  

  const handleArticleChange = (selectedOptions) => {
    setSelectedArticles(selectedOptions);
  };

  const columns = [
    {
      dataField: "id",
      text: "Order ID",
      sort: true,
    },
    {
      dataField: "titre",
      text: "Titre",
      sort: true,
    },
    {
      dataField: "articles",
      text: "Articles",
      sort: true,
      formatter: (cell, row) => (
        <>
          {row.articles.map((article) => (
            <span key={article.id}>{article.designationArticle}</span>
          ))}
        </>
      ),
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
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Delivered">Delivered</option>
            </select>
          ) : (
            cell
          )}
        </>
      ),
    },
    {
      dataField: "actions",
      text: "Actions",
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
    <div className="mb-5">
      <Button onClick={handleAddOrder}>Add Order</Button>

      <BootstrapTable
        keyField="id"
        data={orders}
        columns={columns}
        pagination={paginationFactory()}
      />

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input  id="orderTitle"  type="text" placeholder="Enter the title" />

          {/* Select for articles */}
          <Select
            isMulti
            options={articles.map((article) => ({
              value: article.id,
              label: article.designationArticle,
            }))}
            value={selectedArticles}
            onChange={handleArticleChange}
          />
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
