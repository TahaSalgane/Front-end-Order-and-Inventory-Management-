import React, { useState } from "react";
import { Button } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

const ordersData = [
  { id: 1, user: 'John', order: 'Item A', status: 'Pending', isEditing: false },
  { id: 2, user: 'Jane', order: 'Item B', status: 'Processing', isEditing: false },
  { id: 3, user: 'Mike', order: 'Item C', status: 'Delivered', isEditing: false },
];

const Orders = () => {
  const [orders, setOrders] = useState(ordersData);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleRowClick = (order) => {
    const updatedOrders = orders.map((o) => {
      if (o.id === order.id) {
        return { ...o, isEditing: true };
      }
      return o;
    });
    setOrders(updatedOrders);
    setSelectedOrder(order);
  };

  const handleConfirmClick = () => {
    const updatedOrders = orders.map((order) => {
      if (order.id === selectedOrder.id) {
        return { ...order, isEditing: false, status: selectedOrder.status };
      }
      return order;
    });
    setOrders(updatedOrders);
    setSelectedOrder(null);
  };

  const handleStatusSelectChange = (e) => {
    const { value } = e.target;
    setSelectedOrder((prevSelectedOrder) => ({
      ...prevSelectedOrder,
      status: value,
    }));
  };

  const columns = [
    {
      dataField: "id",
      text: "Order ID",
      sort: true,
    },
    {
      dataField: "user",
      text: "User",
      sort: true,
    },
    {
      dataField: "order",
      text: "Order",
      sort: true,
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      formatter: (cell, row) => (
        <>
          {row.isEditing ? (
            <select
              value={selectedOrder ? selectedOrder.status : ""}
              onChange={handleStatusSelectChange}
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
      <BootstrapTable
        keyField="id"
        data={orders}
        columns={columns}
        pagination={paginationFactory()}
      />
    </div>
  );
};

export default Orders;
