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
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  Image
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  Category
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  Quantity
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  Weight
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {order.items.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-10 w-10 rounded object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {item.weight}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
