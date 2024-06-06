import Table from "@/components/common/Table";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

const OrderDetails = () => {
  const router = useRouter();
  // Sample data
  const order = {
    id: "12345",
    date: "2023-06-05",
    status: "Shipped",
    items: [
      {
        name: "Product 1",
        quantity: 2,
        price: 29.99,
        image: "https://via.placeholder.com/150",
        category: "Electronics",
        weight: "1.5 kg",
      },
      {
        name: "Product 2",
        quantity: 1,
        price: 49.99,
        image: "https://via.placeholder.com/150",
        category: "Clothing",
        weight: "0.8 kg",
      },
    ],
    total: 109.97,
  };

  const columns = [
    { title: "IMAGE", key: "image" },
    { title: "NAME", key: "name" },
    { title: "CATEGORY", key: "category" },
    { title: "QUANTITY", key: "quantity" },
    { title: "PRICE", key: "price" },
  ];

  return (
    <div className="bg-white p-8">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Order Details</h1>
        <div>
          <Button
            onClick={() => {
              router.push("/orders");
            }}
            size="small"
            variant="contained"
          >
            Back
          </Button>
        </div>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Order ID: {order.id}</h2>
        <p className="text-gray-700">Date: {order.date}</p>
        <p className="text-gray-700">
          Status:{" "}
          <span
            className={`font-semibold ${
              order.status === "Shipped" ? "text-green-600" : "text-red-600"
            }`}
          >
            {order.status}
          </span>
        </p>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Items</h3>
        <Table rows={order.items} columns={columns} />
      </div>
      <div className="mt-4 flex justify-end">
        <div className="text-lg font-semibold">Total:</div>
        <div className="text-lg font-semibold ml-4">
          ${order.total.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
