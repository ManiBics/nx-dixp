// src/components/OrdersPage.js
import Pagination from "@/components/common/Pagination";
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
        <div className="bg-white shadow overflow-hidden sm:rounded-lg ">
          <table className="min-w-full divide-y divide-gray-200 ">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                >
                  Order ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                >
                  Product
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                >
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentOrders.length > 0 ? (
                currentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm ">
                      {order.product}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm ">
                      {order.status}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm ">
                      {order.date}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-4 whitespace-nowrap text-sm  text-center"
                  >
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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
