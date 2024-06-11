// src/components/OrdersPage.js
import Pagination from "@/components/common/Pagination";
import Table from "@/components/common/Table";
import React, { useEffect, useState } from "react";

 
const OrdersPage = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [orders, setOrders] = useState([])
  const ordersPerPage = 5;

   
  const filteredOrders = orders.filter((order) =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(()=>{

    const fetchApi = async()=>{
     const res = await fetch('/api/getOrders')
     const data = await res.json()
    
     const line_items = data.results.map((item) => {
       
      
      const {
        id,
        nofitems,
        quantity,
        totalPrice,
        orderState,
        createdAt,
      } = item;
      return {
        id,
        nofitems:item.lineItems.reduce((a,b)=>a+b.quantity,0),
        quantity:item.lineItems.length,
        totalPrice:'$ '+totalPrice.centAmount / 100  ,
        orderState,
        createdAt:new Date(createdAt).toDateString()
      };
    });
     
     
     setOrders(line_items)
    
    }
    fetchApi()
  }
  ,[])

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const columns = [
    { title: "ORDER ID", key: "id" },
    { title: "No. of order items", key: "quantity" },
    { title: "Total quantity of items", key: "nofitems" },
    { title: "Total Price", key: "totalPrice" },
    { title: "Order status", key: "orderState" },
    { title: "Date Created", key: "createdAt" },
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
