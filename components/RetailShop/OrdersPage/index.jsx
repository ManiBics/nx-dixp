// src/components/OrdersPage.js
import Pagination from "@/components/common/Pagination";
import Table from "@/components/common/Table";
import React, { useState } from "react";

const orders = [
  { id: 1, product: "Product 1", status: "Shipped", date: "2024-06-01" },
  { id: 2, product: "Product 2", status: "Processing", date: "2024-06-03" },
  { id: 3, product: "Product 3", status: "Delivered", date: "2024-06-02" },
  { id: 4, product: "Product 3", status: "Delivered", date: "2024-06-02" },
  { id: 5, product: "Product 3", status: "Delivered", date: "2024-06-02" },
  { id: 6, product: "Product 3", status: "Delivered", date: "2024-06-02" },
  // Add more orders as needed
];

const OrdersPage = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  const filteredOrders = orders.filter((order) =>
    order.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const columns = [
    { title: "ORDER ID", key: "id" },
    { title: "PRODUCT", key: "product" },
    { title: "STATUS", key: "status" },
    { title: "DATE", key: "date" },
  ];

  return (
    <div className=" bg-white p-4">
      <div className=" mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <input
            type="text"
            placeholder="Search orders"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>

        <Table rows={currentOrders} columns={columns} />

        <Pagination
          productsPerPage={ordersPerPage}
          totalProducts={filteredOrders.length}
          setPaginate={handlePageChange}
          currentPage={currentPage}
          PreviousText={props.paginationPrevious || "Previous"}
          NextText={props.paginationNext || "Next"}
        />
      </div>
    </div>
  );
};

export default OrdersPage;
