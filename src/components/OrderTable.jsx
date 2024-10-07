import { useState } from 'react';
import { FaRegEye, FaCheckCircle } from 'react-icons/fa';

const OrdersTable = ({ orders, onUpdateCompleted }) => {
  const [localOrders, setLocalOrders] = useState(orders);

  const handleCheckboxChange = (orderId) => {
    const updatedOrders = localOrders.map(order => {
      if (order.id === orderId) {
        order.status = order.status === 'Completed' ? 'Processing' : 'Completed';
      }
      return order;
    });

    setLocalOrders(updatedOrders);

    // Update the completed count
    const completedCount = updatedOrders.filter(order => order.status === 'Completed').length;
    onUpdateCompleted(updatedOrders);
  };

  return (
    <div className="overflow-x-auto"> 
        <h2 className='text-2xl font-bold mb-4'>All orders</h2>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-4"> 
              <input className="h-5 w-5 border-2 border-gray-500 rounded" type="checkbox" />
            </th>
            <th className="px-6 py-6 text-sm md:text-base">Order number</th>
            <th className="px-6 py-6 text-sm md:text-base hidden sm:table-cell">Order date</th>
            <th className="px-6 py-6 text-sm md:text-base">Seller</th>
            <th className="px-6 py-6 text-sm md:text-base hidden lg:table-cell">Price</th>
            <th className="px-6 py-6 text-sm md:text-base">Order status</th>
            <th className="px-6 py-6 text-sm md:text-base">Actions</th>
          </tr>
        </thead>
        <tbody>
          {localOrders.map(order => (
            <tr key={order.id} className="border-b border-slate-100">
              <td className="px-4 py-4">
                <input
                  type="checkbox"
                  className="h-5 w-5 border-2 border-gray-500 rounded"
                  checked={order.status === 'Completed'}
                  onChange={() => handleCheckboxChange(order.id)}
                />
              </td>
              <td className="px-6 py-6 text-sm md:text-base">{order.orderNumber}</td>
              <td className="px-6 py-6 text-sm md:text-base hidden sm:table-cell">{order.orderDate}</td>
              <td className="px-6 py-6 text-sm md:text-base">{order.seller}</td>
              <td className="px-6 py-6 text-sm md:text-base hidden lg:table-cell">{order.price}</td>
              <td className="px-6 py-6 text-sm md:text-base">
                {order.status === 'Completed' ? <FaCheckCircle className="text-green-500" /> : <span>{order.status}</span>}
              </td>
              <td className="px-10 py-6">
                <FaRegEye className='text-green-500 '/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
